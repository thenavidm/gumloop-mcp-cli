import { readFile, lstat } from "node:fs/promises";
import { selectAccount, type Account, type Config } from "../config.js";
import { GumloopError, UsageError } from "./errors.js";
export type Json = Record<string, any>;
export type QueryParam = {
  name: string;
  value: unknown;
  style?: string;
  explode?: boolean;
};
export class GumloopClient {
  private tokens = new Map<string, string>();
  private schedules = new Map<string, Promise<void>>();
  private nextAt = new Map<string, number>();
  constructor(
    readonly config: Config,
    private readonly fetcher: typeof fetch = fetch,
    private readonly sleep: (ms: number) => Promise<void> = (ms) =>
      new Promise((r) => setTimeout(r, ms)),
  ) {}
  redactText(text: string): string {
    const secrets = [
      ...this.config.accounts.map((a) => a.apiToken),
      ...this.tokens.values(),
    ]
      .filter(Boolean)
      .sort((a, b) => b.length - a.length);
    for (const secret of secrets) text = text.split(secret).join("[redacted]");
    return text;
  }
  sanitize(value: unknown): unknown {
    if (typeof value === "string") return this.redactText(value).replace(/https?:\/\/[^\s"<>]*(?:X-Amz-Signature|[?&](?:token|signature|sig|key|access_token)=)[^\s"<>]*/gi,"[private credential URL]");
    if (Array.isArray(value)) return value.map((v) => this.sanitize(v));
    if (value && typeof value === "object")
      return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [
          k,
          /^(password|secret|signing_secret|api_token|api_key|token|bearer_auth|access_token|refresh_token|cookie|cookies|cookie_value|authorization|storage_state)$/i.test(
            k,
          )
            ? "[redacted]"
            : this.sanitize(v),
        ]),
      );
    return value;
  }
  private async token(account: Account): Promise<string> {
    if (this.tokens.has(account.name)) return this.tokens.get(account.name)!;
    let token = account.apiToken;
    if (account.tokenFile)
      try {
        const stat = await lstat(account.tokenFile);
        if (!stat.isFile() || stat.size > 65536 || (process.platform !== "win32" && (stat.mode & 0o077))) throw new Error();
        token = (await readFile(account.tokenFile, "utf8")).trim();
      } catch {
        throw new GumloopError(
          "Cannot read the private Gumloop token file; use a regular token-only file, at most 64 KB.",
          0,
          "CONFIG",
        );
      }
    if (!token || /[\r\n]/.test(token))
      throw new GumloopError(
        "No valid API token configured for the selected account. Run gumloop-cli login.",
        0,
        "CONFIG",
      );
    this.tokens.set(account.name, token);
    return token;
  }
  private async pace(account: Account): Promise<void> {
    const previous = this.schedules.get(account.name) ?? Promise.resolve();
    const next = previous
      .catch(() => {})
      .then(async () => {
        const delay = Math.max(
          0,
          (this.nextAt.get(account.name) ?? 0) - Date.now(),
        );
        if (delay) await this.sleep(delay);
        this.nextAt.set(account.name, Date.now() + this.config.minIntervalMs);
      });
    this.schedules.set(account.name, next);
    await next;
  }
  async request(
    method: string,
    path: string,
    query: QueryParam[] = [],
    body?: Json | FormData,
    accountHint?: string,
    origin: "api" | "chat" = "api",
    contentType = "application/json",
    extraHeaders: Record<string,string> = {},
    rawResponse = false,
  ): Promise<Json> {
    if (
      !/^\/[a-zA-Z0-9_%./-]*$/.test(path) ||
      path.startsWith("//") ||
      /(?:^|\/)(?:\.|%2e){1,2}(?:\/|$)/i.test(path) ||
      path.includes("..") ||
      /%2f|%5c/i.test(path)
    )
      throw new UsageError("Unsupported Gumloop API path.");
    if (!["api", "chat"].includes(origin)) throw new UsageError("Unsupported Gumloop API origin.");
    if (Object.keys(extraHeaders).some(k => true) || Object.values(extraHeaders).some(v => /[\r\n]/.test(v))) throw new UsageError("Unsupported Gumloop request header.");
    const account = selectAccount(this.config, accountHint);
    const token = await this.token(account);
    const url = new URL(`/api/v1${path}`,origin === "chat" ? "https://ws.gumloop.com" : "https://api.gumloop.com");
    const appendDeep = (key: string, v: unknown): void => {
      if (v === undefined) return;
      if (Array.isArray(v)) {
        for (const item of v) appendDeep(key + "[]", item);
      } else if (v && typeof v === "object") {
        for (const [k, x] of Object.entries(v)) appendDeep(`${key}[${k}]`, x);
      } else url.searchParams.append(key, String(v));
    };
    for (const p of query) {
      const v = p.value;
      if (v === undefined || v === null) continue;
      if (p.style === "deepObject") appendDeep(p.name, v);
      else if (Array.isArray(v)) {
        if (p.explode === false)
          url.searchParams.set(
            p.name,
            v.join(
              p.style === "pipeDelimited"
                ? "|"
                : p.style === "spaceDelimited"
                  ? " "
                  : ",",
            ),
          );
        else for (const x of v) url.searchParams.append(p.name, String(x));
      } else if (typeof v === "object")
        throw new UsageError(
          "Object query parameters require documented deepObject serialization.",
        );
      else url.searchParams.set(p.name, String(v));
    }
    const encoded = body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body);
    if (typeof encoded === "string" && Buffer.byteLength(encoded) > 5 * 1024 * 1024)
      throw new UsageError("Request JSON exceeds the 5 MB local cap.");
    for (let attempt = 0; ; attempt++) {
      await this.pace(account);
      let response: Response;
      try {
        response = await this.fetcher(url, {
          method,
          redirect: "error",
          signal: AbortSignal.timeout(this.config.timeoutMs),
          headers: {
            Authorization: `Bearer ${token}`,
            ...(account.userId ? {"x-auth-key": account.userId} : {}),
            ...extraHeaders,
            Accept: "application/json",
            ...(encoded && contentType !== "multipart/form-data" ? { "Content-Type": contentType } : {}),
          },
          ...(encoded ? { body: encoded } : {}),
        });
      } catch {
        throw new GumloopError(
          "Gumloop request failed or timed out; it may already have consumed credits. No automatic retry. Inspect provider request history before repeating it.",
          0,
          "NETWORK",
        );
      }
      if (
        method === "GET" &&
        response.status === 429 &&
        attempt < this.config.maxRetries
      ) {
        const raw = response.headers.get("retry-after");
        const ms =
          raw === null
            ? NaN
            : Number.isFinite(Number(raw))
              ? Number(raw) * 1000
              : Date.parse(raw) - Date.now();
        if (Number.isFinite(ms) && ms >= 0 && ms <= 10000) {
          await response.body?.cancel();
          await this.sleep(Math.max(ms, 100));
          continue;
        }
      }
      // Bound each response before parsing or accumulating it in a batch.
      const chunks: Uint8Array[] = []; let bytes = 0;
      const reader = response.body?.getReader();
      if (reader) try {
        for (;;) { const part = await reader.read(); if (part.done) break; bytes += part.value.byteLength;
          if (bytes > 10 * 1024 * 1024) { await reader.cancel(); throw new GumloopError("Response exceeds the 10 MiB local cap; the request may already have consumed credits. Do not automatically repeat.",0,"API_ERROR"); }
          chunks.push(part.value);
        }
      } finally { reader.releaseLock(); }
      const bytesResult = Buffer.concat(chunks);
      const text = bytesResult.toString("utf8");
      if (!response.ok) {
        let detail = "";
        try {
          const x = JSON.parse(text);
          detail = JSON.stringify(
            this.sanitize(x.errors ?? x.error ?? x.message ?? ""),
          );
        } catch {}
        throw new GumloopError(
          this.redactText(
            `Gumloop API ${response.status}${detail ? ": " + detail.slice(0, 1000) : ""}`,
          ),
          response.status,
          response.status === 429
            ? "RATE_LIMIT"
            : response.status === 401 || response.status === 403
              ? "AUTH"
              : "API_ERROR",
        );
      }
      if(rawResponse)return {bytes:bytesResult,contentType:response.headers.get("content-type")??"application/octet-stream"};
      if (!text) return { success: true };
      try {
        return JSON.parse(text) as Json;
      } catch {
        throw new GumloopError(
          "Gumloop returned a non-JSON response.",
          0,
          "API_ERROR",
        );
      }
    }
  }
}
