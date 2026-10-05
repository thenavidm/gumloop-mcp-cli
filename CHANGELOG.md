# Changelog

## 3.0.0, 2026-10-05

Built on [Slipway](https://github.com/thenavidm/slipway) 0.1.20. The 92 tools keep their names and arguments, and every difference below was measured against 2.0.2, the last version on npm, before release.

- **A person approves each confirmed operation over MCP.** All 42 still need confirmation. Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Approvals are signed, bound to the exact call and work once. Where a client can do neither, the model's `confirm: true` still counts, and `GUMLOOP_CONFIRM=model` makes it enough everywhere. The refusal and the approval form both say what 2.0 said, that the call may affect account content, media, messages, workflows or billing, and the audit log records who approved each one.
- **`GUMLOOP_ALLOW_DESTRUCTIVE=0` still refuses all 42**, confirmed or not, and `GUMLOOP_READ_ONLY=1` still leaves only the 50 reads.
- **Gumloop's status picks the exit code.** A request Gumloop rejects (400 or 422) exits 2 instead of 5, and a removed resource (410) 3 instead of 5. 401 and 403 still exit 4, 404 3, 429 7, a server error 5, and an unknown profile or nothing configured 10. 1 now means an unexpected error.
- **`which <words>` finds a command**, and `agent-context` describes every command, flag and setting as JSON. In Codex 0.159.3, finding the command that starts a flow run and its flags took a median of 83,661 input tokens over the CLI instead of 107,376 (five runs each): every 2.0.2 run read the general help, the command list, the command's help and its schema. Every 3.0.0 run asked `which`, whose answer carries the command's help, and then read the schema, one request fewer. `start-flow` takes its fields as flags or inside `--payload`, so its help marks none of them required, and both versions read the schema to find out.
- **`install <client>`** adds the server to Claude Code, Codex, Claude Desktop, Cursor, VS Code or Gemini CLI in each one's own format, and **`gumloop-mcp --http`** serves the same tools over Streamable HTTP, on 127.0.0.1:8787 unless told otherwise.
- **A smaller tool list.** Parts that several tools repeated, such as a skill's files, are written once and referred to, so the list is 42,577 o200k tokens instead of 45,660. With every tool loaded, Claude Code 2.1.286 spends 56,695 tokens a message on the list instead of 61,936.
- **Less work to start.** Each input and body schema now compiles on its first use rather than at load, and the entry turns on Node's compile cache. The server spends 197 ms of CPU before its first answer where 2.0.2 spent 387, and answers in 135 ms of wall time instead of 217 (median of 21 runs, taking turns on one Mac). npx installs 10 dependencies instead of 94. A test still compiles every schema.
- **`doctor --network` lists the account's agents**, as 2.0's did.
- **Docs.** README section 7 has the measured Claude Code and Codex costs, where 2.0 said they were pending, and the exit codes include 1.

### Upgrading

Over MCP, expect an approval prompt or form before any confirmed operation; a headless agent that should run them with `confirm: true` alone needs `GUMLOOP_CONFIRM=model`. A script that read exit 5 as a rejected request should read 2, and as a removed resource 3. An error is now one JSON object with `error`, Slipway's `code` (`usage`, `refused`, `auth`, `not_found`, `rate_limited`, `api`, `not_configured`) and a `hint`, plus Gumloop's `status` when it answered; 2.0.2 printed the tool's JSON inside the `error` string. Over MCP, an argument that fails the schema comes back as the MCP SDK's own message, "Input validation error: …", instead of JSON. With `GUMLOOP_READ_ONLY=1`, a client that calls a hidden tool gets "tool not found" instead of a refusal naming `GUMLOOP_READ_ONLY`, and that call is not in the audit log; the CLI still names the setting. The audit log's lines gain `confirmed_by`, and each allowed call is followed by a `done` or `failed` line. A script that pipes JSON-RPC into the server must keep stdin open until it reads the answer: the server now stops when its input ends, as the MCP stdio binding asks. `--http` refuses a page from another site unless `GUMLOOP_HTTP_ALLOWED_ORIGINS` lists it. Some terminal screens grew: the general help by 51 tokens, for `which`, `install`, what each setting is for and the exit codes; the command list by 16; and a missing argument's error by 15, for its code and a hint. `SKILL.md` is 60 tokens longer in Claude Code, because it says how approval works over MCP, and that exit 1 is an unexpected error and 2 also an unknown command or a hidden write.

## 2.0.2, 2026-10-04

- **`npx -y @thenavidm/gumloop-mcp-cli` always starts the MCP server.** npx starts whichever binary the npm registry lists first when they share one file, and the registry does not keep the published order, so an MCP client set up with this README's install line could get `gumloop-cli` and its command list instead of a server. A third binary named after the package now always starts the server, and npx picks it by name.

Use the native terminal capture at 1040 source pixels with lossless GIF optimization, displayed at 520 pixels, matching the Bluesky/Substack reference. Original assets remain available.

## 2.0.1 — 2026-10-03

- Correct author-link tracking to this Gumloop repository and keep package, desktop and setup versions aligned.


## 2.0.0 - 2026-10-03

- Refresh all 91 reviewed REST operations and add the shared CLI/local MCP/desktop framework with 92 tools.
- Require exact approval for 42 account/paid operations and enforce direct-call read-only/disabled-operation policies.
- Isolate private named Bearer/user/team profiles and preserve the full fixed /api/v1 origin.
- Upload actual regular local bytes through reviewed base64/multipart APIs; save binary/signed results only in exclusive private files.
- Use current flow input shapes and session endpoints; reject streaming chat before fetch.
- Add complete house docs, all argument tables, client/OS setup, official comparisons, schema sync and release packaging; preserve AGPL/private legacy history.

| Component | Baseline |
| --- | --- |
| Package/desktop | 2.0.0 |
| Current REST schema | OpenAPI 3.0.0/document 1.0.0; checked 2026-10-03 |
| Operations/tools | 91 current REST + list_accounts; 92 shared tools |
| Read/confirmed | 50 reads, 42 confirmed operations |
| Official CLI inspected | PyPI gumloop 0.5.2 |
| Official hosted MCP | 46 documented tools; live discovery unverified |
| Node | 22+; CI targets 22/24 on macOS/Linux/Windows |
| MCP SDK / Ajv / ajv-formats | 1.32.0 / 8.20.0 / 3.0.1 |
| TypeScript / Vitest / Vite / MCPB / YAML | 7.0.2 / 5.0.3 / 8.3.2 / 2.1.2 / 2.9.1 |

The dated CHANGELOG records user-facing changes. Version, annotated default-branch tag, npm dist-tag and desktop archive must agree at release. Preserve AGPL and private legacy history.

Legacy GUMLOOP_API_KEY/USER_ID remain supported. start_flow now uses current named top-level inputs. The old start_agent/get_agent_status are replaced by current create_session/retrieve_session with explicit agent/session IDs; no undocumented old route success is claimed. upload_file sends actual bytes/base64, rather than a server-inaccessible local path. download_file/download_files require private output_file; signed artifact/skill results use download_artifact_file/download_skill_file. Writes and paid Brain search now need confirmation. Re-check scripts/client config during this breaking upgrade.

## 1.0.0 - legacy source

Earlier private MCP-only source declarations; no verified prior public npm release is assumed.
