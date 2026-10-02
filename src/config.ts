export type Account = {
  name: string;
  apiToken: string;
  tokenFile: string;
  userId: string;
  teamId: string;
};
export type Config = {
  accounts: Account[];
  defaultAccount: string;
  readOnly: boolean;
  allowDestructive: boolean;
  auditPath: string;
  timeoutMs: number;
  maxRetries: number;
  minIntervalMs: number;
};
function integer(
  v: string | undefined,
  defaultValue: number,
  min: number,
  max: number,
): number {
  const n = v ? Number(v) : defaultValue;
  if (!Number.isInteger(n) || n < min || n > max)
    throw new Error("Invalid request timeout, retry or pacing settings.");
  return n;
}
export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  let entries: Record<string, unknown>[] = [];
  if (env.GUMLOOP_ACCOUNTS)
    try {
      const x = JSON.parse(env.GUMLOOP_ACCOUNTS);
      if (!Array.isArray(x)) throw new Error();
      entries = x;
    } catch {
      throw new Error(
        "GUMLOOP_ACCOUNTS must be a private JSON array of named accounts.",
      );
    }
  else if (env.GUMLOOP_API_KEY || env.GUMLOOP_TOKEN_FILE)
    entries = [
      {
        name: "default",
        api_key: env.GUMLOOP_API_KEY,
        token_file: env.GUMLOOP_TOKEN_FILE,
        user_id: env.GUMLOOP_USER_ID,
        team_id: env.GUMLOOP_TEAM_ID,
      },
    ];
  const accounts = entries.map((x) => {
    if (!x || typeof x !== "object" || typeof x.name !== "string" || !x.name.trim())
      throw new Error("Every Gumloop account requires a unique nonempty name.");
    for(const k of ["user_id","team_id"])if(x[k]!==undefined && (typeof x[k]!=="string"||/[\r\n]/.test(x[k] as string)))throw new Error("Private profile identifiers must be strings without line breaks.");
    return {
      name: x.name.trim(),
      userId: typeof x.user_id === "string" ? x.user_id : "",
      teamId: typeof x.team_id === "string" ? x.team_id : "",
      apiToken: typeof x.api_key === "string" ? x.api_key : "",
      tokenFile: typeof x.token_file === "string" ? x.token_file : "",
    };
  });
  if (new Set(accounts.map((a) => a.name)).size !== accounts.length)
    throw new Error("Gumloop account names must be unique.");
  return {
    accounts,
    defaultAccount: env.GUMLOOP_DEFAULT_ACCOUNT ?? accounts[0]?.name ?? "",
    readOnly: /^(1|true)$/i.test(env.GUMLOOP_READ_ONLY ?? ""),
    allowDestructive: !/^(0|false)$/i.test(env.GUMLOOP_ALLOW_DESTRUCTIVE ?? ""),
    auditPath: env.GUMLOOP_AUDIT_LOG ?? "",
    timeoutMs: integer(env.GUMLOOP_REQUEST_TIMEOUT_MS, 30000, 100, 300000),
    maxRetries: integer(env.GUMLOOP_MAX_RETRIES, 2, 0, 5),
    minIntervalMs: integer(env.GUMLOOP_MIN_REQUEST_INTERVAL_MS, 150, 0, 10000),
  };
}
export function selectAccount(config: Config, hint?: string): Account {
  const account = config.accounts.find(
    (a) => a.name === (hint ?? config.defaultAccount),
  );
  if (!account)
    throw new Error(
      config.accounts.length
        ? "Unknown account. Run list_accounts and use its exact name."
        : "No credentials configured. Set GUMLOOP_API_KEY or GUMLOOP_TOKEN_FILE privately; run gumloop-cli login.",
    );
  return account;
}
