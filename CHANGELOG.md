# Changelog

## Unreleased

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
