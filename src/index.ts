#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { buildServer, VERSION } from "./server.js";
import { runCli, exitCodeFor } from "./cli.js";
import { runDoctor } from "./doctor.js";
import { basename } from "node:path";
const HELP = `Gumloop MCP server and CLI ${VERSION}

gumloop-mcp                         Start local stdio MCP
gumloop-cli                         List task commands
gumloop-cli <command> --help        Current arguments
gumloop-cli schema <command>        Full JSON input schema
gumloop-cli doctor [--network]      Local configuration / account read
gumloop-cli login                   Private token setup instructions
gumloop-cli --version               Package version

GUMLOOP_API_KEY                     Private Gumloop Bearer credential
GUMLOOP_TOKEN_FILE                  Regular private token-only file, max 64 KB
GUMLOOP_ACCOUNTS / _DEFAULT_ACCOUNT Named private credentials and user/team identities
GUMLOOP_USER_ID / GUMLOOP_TEAM_ID     Private default user/team identifiers
GUMLOOP_READ_ONLY=1                 Hide/refuse account mutations, agent runs, uploads and account changes
GUMLOOP_ALLOW_DESTRUCTIVE=0         Block confirmed account mutations, agent runs, uploads and account changes
GUMLOOP_AUDIT_LOG                   Private guard-decision log
GUMLOOP_REQUEST_TIMEOUT_MS=30000; GUMLOOP_MAX_RETRIES=2 (read-only GET 429 only)
GUMLOOP_MIN_REQUEST_INTERVAL_MS=150 Conservative per-account process pacing

https://github.com/thenavidm/gumloop-mcp-cli
`;
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];
  if (["--version", "-v"].includes(command ?? "")) {
    console.log(VERSION);
    return;
  }
  if (["--help", "-h", "help"].includes(command ?? "")) {
    process.stdout.write(HELP);
    return;
  }
  if (command === "doctor") {
    if (args.slice(1).some((a) => a !== "--network")) {
      process.exitCode = 2;
      console.error(JSON.stringify({ error: "doctor accepts only --network" }));
      return;
    }
    process.exitCode = await runDoctor(args.includes("--network"));
    return;
  }
  if (command === "login") {
    console.log("Create or retrieve the Gumloop API key in your own account at www.gumloop.com/settings/profile/connectors. Store it privately as GUMLOOP_API_KEY or an owner-only token-only file through GUMLOOP_TOKEN_FILE. login prints instructions; it does not create an account, save keys or perform OAuth. Never send gh auth tokens to the service. See INSTALL.md and doctor.");
    return;
  }
  if (args.length || basename(process.argv[1] ?? "").startsWith("gumloop-cli")) {
    process.exitCode = await runCli(args);
    return;
  }
  const server = buildServer();
  await server.connect(new StdioServerTransport());
  const close = async () => {
    await server.close();
    process.exit(0);
  };
  process.on("SIGTERM", () => void close());
  process.on("SIGINT", () => void close());
}
main().catch((e) => {
  console.error(JSON.stringify({ error: e.message }));
  process.exitCode = exitCodeFor(e.message);
});
