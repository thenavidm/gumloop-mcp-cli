<img src="https://cdn.navid.me/tools/gumloop-icon.jpg" alt="Gumloop" width="88">

# Gumloop MCP Server & CLI

[![npm](https://img.shields.io/npm/v/@thenavidm/gumloop-mcp-cli?color=orange&label=npm)](https://www.npmjs.com/package/@thenavidm/gumloop-mcp-cli)
[![CI](https://github.com/thenavidm/gumloop-mcp-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/thenavidm/gumloop-mcp-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-AGPL--3.0-green)](./LICENSE)
[![YouTube](https://img.shields.io/badge/YouTube-@thenavidm-red?logo=youtube&logoColor=white)](https://youtube.com/@thenavidm?sub_confirmation=1)
[![X](https://img.shields.io/badge/X-@thenavidm-black?logo=x)](https://x.com/thenavidm)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-thenavidm-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/thenavidm)

Gumloop MCP server and CLI for Codex and AI agents. **92 tools** for current flows, agents, sessions, Brain, skills, artifacts and administration, with private accounts and explicit operation approval. One shared implementation supplies both binaries and a desktop bundle.

Built and maintained by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=gumloop-mcp-cli&utm_content=readme). Built on [Slipway](https://github.com/thenavidm/slipway), which turns one definition of each tool into the MCP server and the CLI. The complete guide is on [navid.me](https://navid.me/mcp-servers/gumloop).

<img src="https://cdn.navid.me/repos/gumloop-mcp-cli-retina.gif" alt="Illustrated workflow in the house terminal component" width="520">

The terminal illustrates real command names and approval flow. It is not a recording of a provider account run. Gumloop already has official CLI and hosted MCP products; their supported platform, authentication and workflows are compared below.

Requires Node 22+ and eligible Gumloop API access for account operations. **Validation:** fixture tests, schema validation and protocol/artifact discovery are separate from provider-account and desktop GUI outcomes, which are not claimed. Section 7 has the measured token costs.

## Two ways to use it

### Command line

```bash
npm install -g @thenavidm/gumloop-mcp-cli@latest
gumloop-cli
gumloop-cli list-agents --agent
gumloop-cli schema start-flow
gumloop-cli start-flow --payload-file /absolute/private/approved-flow.json --account work --confirm --agent
```

### MCP server, for your AI app

```bash
codex mcp add gumloop -- npx -y @thenavidm/gumloop-mcp-cli@latest
```

Configure private credentials first. Ask: “Inspect this existing run and return its state; do not start another run.” Read INSTALL.md for complete client/OS routes.

### Which one

| Where you work | Surface |
| --- | --- |
| Codex or shell agent | Shared CLI, local MCP or both |
| Desktop chat | Compatible local MCP/desktop archive |
| Scripts/CI | CLI or MCP client |
| Remote-only client | Official hosted MCP |

## Features

| Capability | CLI command | MCP tool |
| --- | --- | --- |
| Saved flows and inputs | list-flows / get-input-schema | list_flows / get_input_schema |
| Run and inspect | start-flow / get-run-details | start_flow / get_run_details |
| Agents and sessions | list-agents / create-session / retrieve-session | list_agents / create_session / retrieve_session |
| Skills and Brain | create-skill / search-brain | create_skill / search_brain |
| Private file delivery | download-artifact-file / download-files | download_artifact_file / download_files |
| Explicit account selection | list-accounts / --account | list_accounts / account |
| Diagnosis/setup | doctor / login | CLI utilities |

## Contents

| Number | Section | What it covers |
| --- | --- | --- |
| 1 | [What you can ask it](#1-what-you-can-ask-it) | What you can ask it |
| 2 | [Quick install](#2-quick-install) | Quick install |
| 3 | [Set up Gumloop access](#3-set-up-gumloop-access) | Set up Gumloop access |
| 4 | [Connect your client](#4-connect-your-client) | Connect your client |
| 5 | [Check it works](#5-check-it-works) | Check it works |
| 6 | [Output, flags and exit codes](#6-output-flags-and-exit-codes) | Output, flags and exit codes |
| 7 | [MCP or CLI and token cost](#7-mcp-or-cli-and-token-cost) | MCP or CLI and token cost |
| 8 | [Every tool and argument](#8-every-tool-and-argument) | Every tool and argument |
| 9 | [Flows, sessions and account workflows](#9-flows-sessions-and-account-workflows) | Flows, sessions and account workflows |
| 10 | [Jobs, pagination and private files](#10-jobs-pagination-and-private-files) | Jobs, pagination and private files |
| 11 | [Several private accounts](#11-several-private-accounts) | Several private accounts |
| 12 | [Writing safely](#12-writing-safely) | Writing safely |
| 13 | [How it works](#13-how-it-works) | How it works |
| 14 | [Your data](#14-your-data) | Your data |
| 15 | [Environment variables](#15-environment-variables) | Environment variables |
| 16 | [Updates and removal](#16-updates-and-removal) | Updates and removal |
| 17 | [Troubleshooting](#17-troubleshooting) | Troubleshooting |
| 18 | [API coverage and comparisons](#18-api-coverage-and-comparisons) | API coverage and comparisons |
| 19 | [Versions](#19-versions) | Versions |
| 20 | [FAQ](#20-faq) | FAQ |

## 1. What you can ask it

- Inspect accessible agents, versions, teams and models.
- List saved flows and their exact input schema before approving a run.
- Start only the selected flow, keep its returned run ID and read its state.
- Create a reviewed agent session, then inspect its approval requirements.
- Approve only the selected session checkpoint; do not approve a whole conversation implicitly.
- Upload a selected regular file and save an existing run download privately.
- Review organization usage, audit records and applicable role credit limits.

Actual discovery supplies 92 tools: 50 reads and 42 confirmation-gated operations, from all 91 reviewed current REST operations plus list_accounts. The shared handlers cover MCP and native Node CLI. This is protocol/schema evidence; account outcomes and desktop GUI installation remain separate.

## 2. Quick install

```bash
npm install -g @thenavidm/gumloop-mcp-cli@latest
gumloop-cli --version
gumloop-cli login
gumloop-cli doctor
gumloop-cli tools
```

Node 22+ is required for manual installation. The versioned [desktop archive](https://github.com/thenavidm/gumloop-mcp-cli/releases/download/v3.0.0/gumloop-3.0.0.mcpb) bundles production dependencies for a compatible host. Read [INSTALL.md](INSTALL.md) before configuring credentials. After private setup:

```bash
codex mcp add gumloop -- npx -y @thenavidm/gumloop-mcp-cli@latest
codex mcp list
```

## 3. Set up Gumloop access

### Private credentials and permissions

1. Open the intended account's [Connectors settings](https://www.gumloop.com/settings/profile/connectors?view=connected). Select Gumloop API Key and create the personal or team key needed for your task.
2. Read [Profile Settings](https://www.gumloop.com/settings/profile/general) for your user ID. A team ID is optional; older flow endpoints call it project_id. Set GUMLOOP_USER_ID and, when appropriate, GUMLOOP_TEAM_ID in private settings.
3. Save the credential as a token-only regular file outside repositories. Set GUMLOOP_TOKEN_FILE to its absolute path; GUMLOOP_API_KEY is the alternative. Do not paste real keys into chat or command examples.
4. Run gumloop-cli doctor, then doctor --network. The network check reads accessible agent metadata without printing account content.
5. Inspect the exact schema and selected resource before confirming an operation. Runs can spend credits and invoke connected downstream services.

Current [authentication docs](https://docs.gumloop.com/api-reference/authentication) require Pro or above for API keys. Personal keys act as their owner; team keys can act as team members through the requested user identity. Workflow-step credential settings decide personal/team credentials when project_id is supplied. Local profiles do not bypass account, role or team permissions.

Requests use Authorization: Bearer, with the selected profile user ID as x-auth-key, following the current SDK. Ordinary endpoints use https://api.gumloop.com/api/v1; non-streaming chat uses the separately documented https://ws.gumloop.com/api/v1. No arbitrary host override or redirects are accepted.

For POSIX, use a private 0700 directory and regular 0600 token-only file, no symlink, at most 64 KB. Windows requires a user-only ACL; POSIX checks do not verify it. File credentials override environment credentials and are cached until restart. The package does not read an automatic .env, use the OS keychain or start browser login.

### OAuth and rotation

An already authorized OAuth access token can be supplied through the same private Bearer credential path. This wrapper does not register an OAuth app, accept refresh tokens, refresh access tokens or manage consent. [OAuth docs](https://docs.gumloop.com/api-reference/oauth) describe invite-only client registration, authorization code with PKCE S256 and gumloop_api/userinfo scopes. gumloop_api requires Pro or above; requesting userinfo alone is not API permission. Use an expiry-aware issuer or the official CLI's supported OAuth/keychain workflow when automatic refresh is needed.

Rotate/revoke the intended grant through its provider controls, update private settings and restart. Removing a local package does not revoke provider credentials, undo runs or remove hosted data.

### Plans, credits and rate limits

The AGPL wrapper is free; Gumloop account access and processing are billed separately. [Credit documentation](https://docs.gumloop.com/core-concepts/credits) describes variable charges for model work, connector calls, compute and orchestration; Brain searches can also incur charges. Local read-only mode is an operation policy, not a guarantee of zero provider charges. Credit-consuming Brain search is confirmation-gated here.

[Agent concurrency limits](https://docs.gumloop.com/core-concepts/rate_limits) are organization-wide, currently 25 on Pro and 100 on Enterprise, with customizable Enterprise limits. Pro rejects excess agent work; Enterprise can queue it. Webhook triggers separately document 100 requests/minute per trigger. These are distinct limits; this wrapper's default 150 ms account/process pacing reserves no provider capacity.

GET 429 retries require an explicit Retry-After at most ten seconds, default two/max five retries. Missing/longer delays return exit 7. Mutations, paid Brain search and network timeouts never retry automatically. Local JSON request cap is 5 MiB; responses/downloads are capped at 10 MiB. These local caps are separate from vendor storage, upload and pagination limits.

## 4. Connect your client

[INSTALL.md](INSTALL.md) gives Codex-first setup, optional Claude Code, desktop archive/manual configuration, Cursor, VS Code/Copilot, Windsurf, Zed, Gemini CLI, Docker and Cline. The local transport is stdio. Configure private credentials in the actual client environment; GUI apps and remote containers do not inherit every shell setting.

The published official gumloop 0.5.2 CLI and current provider docs explicitly refuse native Windows and recommend WSL or the Python SDK. This wrapper targets Node 22+ on native Windows, macOS and Linux. Compatible desktop-host availability and GUI installation are separate from CLI portability. Remote-only clients can use the official https://mcp.gumloop.com/gumloop/mcp endpoint.

npm ships SKILL.md but does not register it automatically. Install it through the client's supported skill location. A connection/client approval and this wrapper's confirm argument are separate controls.

## 5. Check it works

```bash
gumloop-cli --version
gumloop-cli doctor
gumloop-cli doctor --network
gumloop-cli list-accounts --agent
gumloop-cli list-agents --agent
```

Discovery, schemas/help and account labels need no provider key. Network doctor reads GET /agents and prints only diagnostic status. This validates that request, not every account operation. Full discovery exposes 92 tools; read-only discovery exposes 50. Missing credentials exits 10, invalid input or refused operations exit 2. First validate an existing resource; do not start billable automation merely to test installation.

## 6. Output, flags and exit codes

Tool results go to stdout. Errors are JSON on stderr. JSON operations return structured results, so `--select` can retain nested fields. Private download operations return file metadata; binary bytes and signed results stay in the requested private file.

```bash
gumloop-cli start-flow --help
gumloop-cli schema start-flow
gumloop-cli list-agents --agent --select agents
```

| Flag | What it does |
| --- | --- |
| `--json` | JSON output |
| `--compact` | Single-line JSON |
| `--agent` | Compact JSON and no prompts; never confirms a write |
| `--select a,b.c` | Keep selected fields; dotted paths descend and arrays are traversed |
| `--confirm` | Confirm the requested flow, session, paid search or account operation |
| `--no-input`, `--no-color`, `--yes` | Automation switches; none overrides the spending guard |

Global output flags apply to tool commands. `doctor` has its own `--network` option and returns a JSON diagnostic.

| Exit code | Meaning | What a script should do |
| --- | --- | --- |
| 0 | Success | Read stdout |
| 1 | Unexpected error | Report it with the command that caused it |
| 2 | Usage, invalid input, a refused write, an unknown command or a hidden write | Fix the input or confirm only the requested action |
| 3 | Job or local upload file not found | Check the ID/path |
| 4 | Authentication or entitlement rejected | Check private credential settings and permissions |
| 5 | API or network failure | Inspect an accepted job before another paid submission |
| 7 | Rate limited | Wait; do not loop over paid submissions |
| 10 | Credentials not configured | Complete local setup |

The underscore spelling also works. `start_flow` and `start-flow` call the same tool. Nested objects use quoted JSON. Arrays of objects use repeated flags, one JSON object at a time.

## 7. MCP or CLI and token cost

MCP and CLI use the same catalogue, schemas, handlers and write guard: [Slipway](https://github.com/thenavidm/slipway) builds the MCP server, over stdio or `--http`, and the CLI from each tool's one definition. Shell scripts can select fields with --select after receipt; this does not change upstream result size or billing.

Measured on 2026-10-05 against 2.0.2, with Claude Code 2.1.286 on Claude Opus 5.5 (one short prompt with and without the server connected, the difference read from the API's own usage figures) and Codex 0.159.3 on gpt-6.1-sol:

| Cost | 2.0.2 | 3.0.0 |
| --- | --- | --- |
| Claude Code, every tool loaded, every message | 61,936 | 56,695 |
| Claude Code's default, tool search, every message | 1,486 | 1,488 |
| `SKILL.md`, read once | 3,150 | 3,210 |
| Codex over the CLI, one task, median of five | 107,376 | 83,661 |
| Codex over MCP, the same task, median of five | 78,443 | 78,249 |

The task was "find the command that starts a flow run, and the flags it requires". Every tool loaded costs less because parts that several tools repeated are written once. Over the CLI, every 3.0.0 run asked `which`, whose answer carries the command's help, where every 2.0.2 run read the command list and then the help: one request fewer. Over MCP, 3.0.0 cost slightly less. `SKILL.md` costs 60 more because it says how approval works over MCP and what exit codes 1 and 2 cover.

Tool-list bytes or characters divided by four are not API usage, and no other offering was measured.

Provider credits and client-model tokens are separate.

## 8. Every tool and argument

Every route and argument below comes from actual stdio discovery and the reviewed current schema. Use schema COMMAND for exact inline nested objects and unions.

| Tool | Route | Mode |
| --- | --- | --- |
| `start_flow` | `POST /api/v1/start_pipeline` | Confirm exact operation |
| `kill_flow` | `POST /api/v1/kill_pipeline` | Confirm exact operation |
| `get_run_details` | `GET /api/v1/get_pl_run` | Read |
| `list_workbooks` | `GET /api/v1/list_workbooks` | Read |
| `list_flows` | `GET /api/v1/list_saved_items` | Read |
| `get_input_schema` | `GET /api/v1/get_inputs` | Read |
| `get_run_history` | `GET /api/v1/get_plrun_saved_item_map` | Read |
| `download_file` | `POST /api/v1/download_file` | Read |
| `download_files` | `POST /api/v1/download_files` | Read |
| `upload_file` | `POST /api/v1/upload_file` | Confirm exact operation |
| `upload_files` | `POST /api/v1/upload_files` | Confirm exact operation |
| `get_organization_audit_logs` | `GET /api/v1/get_audit_logs` | Read |
| `manage_project_users` | `POST /api/v1/manage_workspace_users` | Confirm exact operation |
| `manage_permission_group_users` | `POST /api/v1/manage_permission_group_users` | Confirm exact operation |
| `list_role_credit_limits` | `GET /api/v1/organizations/{organization_id}/roles/credit-limits` | Read |
| `get_role_credit_limit` | `GET /api/v1/organizations/{organization_id}/roles/{role_id}/credit-limit` | Read |
| `set_role_credit_limit` | `PUT /api/v1/organizations/{organization_id}/roles/{role_id}/credit-limit` | Confirm exact operation |
| `export_data` | `POST /api/v1/export_data` | Confirm exact operation |
| `get_export_status` | `GET /api/v1/export_status` | Read |
| `list_agents` | `GET /api/v1/agents` | Read |
| `create_agent` | `POST /api/v1/agents` | Confirm exact operation |
| `retrieve_agent` | `GET /api/v1/agents/{agent_id}` | Read |
| `update_agent` | `PATCH /api/v1/agents/{agent_id}` | Confirm exact operation |
| `create_chat_completion` | `POST /api/v1/chat/completions` | Confirm exact operation |
| `list_models` | `GET /api/v1/models` | Read |
| `route_model` | `POST /api/v1/models/route` | Read |
| `list_agent_versions` | `GET /api/v1/agents/{agent_id}/versions` | Read |
| `retrieve_agent_version` | `GET /api/v1/agents/{agent_id}/versions/{version_id}` | Read |
| `update_agent_skills` | `PATCH /api/v1/agents/{agent_id}/skills` | Confirm exact operation |
| `list_agent_mcp_servers` | `GET /api/v1/agents/{agent_id}/mcp-servers` | Read |
| `attach_agent_mcp_server` | `PUT /api/v1/agents/{agent_id}/mcp-servers/{server_id}` | Confirm exact operation |
| `detach_agent_mcp_server` | `DELETE /api/v1/agents/{agent_id}/mcp-servers/{server_id}` | Confirm exact operation |
| `list_sessions` | `GET /api/v1/agents/{agent_id}/sessions` | Read |
| `create_session` | `POST /api/v1/agents/{agent_id}/sessions` | Confirm exact operation |
| `retrieve_session` | `GET /api/v1/sessions/{session_id}` | Read |
| `rename_session` | `PATCH /api/v1/sessions/{session_id}` | Confirm exact operation |
| `send_message` | `POST /api/v1/sessions/{session_id}/messages` | Confirm exact operation |
| `cancel_session` | `POST /api/v1/sessions/{session_id}/cancel` | Confirm exact operation |
| `upload_session_file` | `POST /api/v1/sessions/{session_id}/files` | Confirm exact operation |
| `resolve_session_approvals` | `POST /api/v1/sessions/{session_id}/approvals` | Confirm exact operation |
| `list_queued_messages` | `GET /api/v1/sessions/{session_id}/queue` | Read |
| `queue_session_message` | `POST /api/v1/sessions/{session_id}/queue` | Confirm exact operation |
| `update_queued_message` | `PATCH /api/v1/sessions/{session_id}/queue/{queued_message_id}` | Confirm exact operation |
| `delete_queued_message` | `DELETE /api/v1/sessions/{session_id}/queue/{queued_message_id}` | Confirm exact operation |
| `send_queued_message` | `POST /api/v1/sessions/{session_id}/queue/{queued_message_id}/send` | Confirm exact operation |
| `list_mcp_servers` | `GET /api/v1/mcp/servers` | Read |
| `retrieve_mcp_server` | `GET /api/v1/mcp/servers/{server_id}` | Read |
| `list_mcp_server_tools` | `GET /api/v1/mcp/servers/{server_id}/tools` | Read |
| `list_mcp_server_resources` | `GET /api/v1/mcp/servers/{server_id}/resources` | Read |
| `read_mcp_server_resource` | `GET /api/v1/mcp/servers/{server_id}/resources/read` | Read |
| `list_mcp_server_prompts` | `GET /api/v1/mcp/servers/{server_id}/prompts` | Read |
| `get_mcp_server_prompt` | `POST /api/v1/mcp/servers/{server_id}/prompts/get` | Read |
| `call_mcp_tools` | `POST /api/v1/mcp/tools/call` | Confirm exact operation |
| `search_brain` | `POST /api/v1/brain/search` | Confirm exact operation |
| `list_brain_sources` | `GET /api/v1/brain/sources` | Read |
| `create_brain_source` | `POST /api/v1/brain/sources` | Confirm exact operation |
| `get_brain_source` | `GET /api/v1/brain/sources/{source_id}` | Read |
| `delete_brain_source` | `DELETE /api/v1/brain/sources/{source_id}` | Confirm exact operation |
| `list_brain_files` | `GET /api/v1/brain/sources/{source_id}/files` | Read |
| `upload_brain_files` | `POST /api/v1/brain/sources/{source_id}/files` | Confirm exact operation |
| `delete_brain_file` | `DELETE /api/v1/brain/sources/{source_id}/files/{file_id}` | Confirm exact operation |
| `get_brain_source_estimate` | `GET /api/v1/brain/sources/{source_id}/estimate` | Read |
| `approve_brain_source` | `POST /api/v1/brain/sources/{source_id}/approve` | Confirm exact operation |
| `list_skills` | `GET /api/v1/skills` | Read |
| `create_skill` | `POST /api/v1/skills` | Confirm exact operation |
| `update_skill` | `PATCH /api/v1/skills/{skill_id}` | Confirm exact operation |
| `delete_skill` | `DELETE /api/v1/skills/{skill_id}` | Confirm exact operation |
| `download_skill_file` | `GET /api/v1/skills/{skill_id}/download` | Read |
| `list_artifacts` | `GET /api/v1/agents/{agent_id}/artifacts` | Read |
| `download_artifact_file` | `GET /api/v1/artifacts/{artifact_id}/download` | Read |
| `list_browser_profiles` | `GET /api/v1/browser-profiles` | Read |
| `import_browser_profile_cookies` | `POST /api/v1/browser-profiles/{profile_id}/cookies` | Confirm exact operation |
| `list_teams` | `GET /api/v1/teams` | Read |
| `list_evaluations` | `GET /api/v1/agents/{agent_id}/evaluations` | Read |
| `run_evaluations` | `POST /api/v1/agents/{agent_id}/evaluations/run` | Confirm exact operation |
| `get_evaluation_metrics` | `GET /api/v1/agents/{agent_id}/evaluations/metrics` | Read |
| `retrieve_evaluation` | `GET /api/v1/agents/{agent_id}/evaluations/{evaluation_id}` | Read |
| `get_evaluation_config` | `GET /api/v1/agents/{agent_id}/evaluation-config` | Read |
| `update_evaluation_config` | `PATCH /api/v1/agents/{agent_id}/evaluation-config` | Confirm exact operation |
| `list_organizations` | `GET /api/v1/organizations` | Read |
| `get_evaluation_options` | `GET /api/v1/evaluation-options` | Read |
| `list_organization_evaluations` | `GET /api/v1/evaluations` | Read |
| `create_organization_evaluation` | `POST /api/v1/evaluations` | Confirm exact operation |
| `get_organization_evaluation` | `GET /api/v1/evaluations/{evaluation_id}` | Read |
| `update_organization_evaluation` | `PATCH /api/v1/evaluations/{evaluation_id}` | Confirm exact operation |
| `delete_organization_evaluation` | `DELETE /api/v1/evaluations/{evaluation_id}` | Confirm exact operation |
| `set_organization_evaluation_targets` | `PUT /api/v1/evaluations/{evaluation_id}/targets` | Confirm exact operation |
| `run_organization_evaluation` | `POST /api/v1/evaluations/{evaluation_id}/run` | Confirm exact operation |
| `list_organization_evaluation_results` | `GET /api/v1/evaluations/{evaluation_id}/results` | Read |
| `get_organization_evaluation_result` | `GET /api/v1/evaluations/{evaluation_id}/results/{result_id}` | Read |
| `get_organization_evaluation_metrics` | `GET /api/v1/evaluations/{evaluation_id}/metrics` | Read |
| `list_accounts` | Local, no network | Read |

#### start_flow

`gumloop-cli start-flow`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `user_id` | No; body and guard rules apply | string | The id for the user initiating the flow. |
| `project_id` | No; body and guard rules apply | string | (Optional) The id of the project within which the flow is executed. |
| `saved_item_id` | No; body and guard rules apply | string | The id for the saved flow. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `saved_item_id`, `user_id`. Profile defaults fill supported user/team identity fields before body validation.

#### kill_flow

`gumloop-cli kill-flow`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `run_id` | No; body and guard rules apply | string | The ID of the pipeline run to kill. |
| `user_id` | No; body and guard rules apply | string | The user ID. Required if project_id is not provided. |
| `project_id` | No; body and guard rules apply | string | The project ID. Required if user_id is not provided. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `run_id`. Profile defaults fill supported user/team identity fields before body validation.

#### get_run_details

`gumloop-cli get-run-details`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `run_id` | Yes | string | ID of the flow run to retrieve |
| `user_id` | No; body and guard rules apply | string | The id for the user initiating the flow. Required if project_id is not provided. |
| `project_id` | No; body and guard rules apply | string | The id of the project within which the flow is executed. Required if user_id is not provided. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### list_workbooks

`gumloop-cli list-workbooks`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `user_id` | No; body and guard rules apply | string | The user ID for which to list workbooks. Required if project_id is not provided. |
| `project_id` | No; body and guard rules apply | string | The project ID for which to list workbooks. Required if user_id is not provided. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### list_flows

`gumloop-cli list-flows`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `user_id` | No; body and guard rules apply | string | The user ID to for which to list items. Required if project_id is not provided. |
| `project_id` | No; body and guard rules apply | string | The project ID for which to list items. Required if user_id is not provided. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### get_input_schema

`gumloop-cli get-input-schema`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `saved_item_id` | Yes | string | The ID of the saved item for which to retrieve input schemas. |
| `user_id` | No; body and guard rules apply | string | User ID that created the flow. Required if project_id is not provided. |
| `project_id` | No; body and guard rules apply | string | Project ID that the flow is under. Required if user_id is not provided. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### get_run_history

`gumloop-cli get-run-history`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `workbook_id` | No; body and guard rules apply | string | The ID of the workbook to retrieve run history for. Required if saved_item_id is not provided. |
| `saved_item_id` | No; body and guard rules apply | string | The ID of the saved item to retrieve run history for. Required if workbook_id is not provided. |
| `user_id` | No; body and guard rules apply | string | The user ID. Required if project_id is not provided. |
| `project_id` | No; body and guard rules apply | string | The project ID. Required if user_id is not provided. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### download_file

`gumloop-cli download-file`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `file_name` | No; body and guard rules apply | string | The name of the file to download. |
| `run_id` | No; body and guard rules apply | string | The ID of the flow run associated with the file. |
| `saved_item_id` | No; body and guard rules apply | string | The saved item ID associated with the file. |
| `user_id` | No; body and guard rules apply | string | Optional. The user ID associated with the flow run. |
| `project_id` | No; body and guard rules apply | string | Optional. The project ID associated with the flow run. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |
| `output_file` | Yes | string | New absolute result file in a private owner-only directory. Private download or signed credential result stays out of model output; no overwrite. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: Inspect endpoint requirements. Profile defaults fill supported user/team identity fields before body validation.

output_file must be new and absolute in a private directory, reserved exclusively before the API call. Binary bytes or signed JSON are kept out of model output. This wrapper never follows a signed external download URL.

#### download_files

`gumloop-cli download-files`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `file_names` | No; body and guard rules apply | array | An array of file names to download. Items: string. |
| `run_id` | No; body and guard rules apply | string | The ID of the flow run associated with the files. |
| `user_id` | No; body and guard rules apply | string | The user ID associated with the files. Required if project_id is not provided. |
| `project_id` | No; body and guard rules apply | string | The project ID associated with the files. Required if user_id is not provided. |
| `saved_item_id` | No; body and guard rules apply | string | Optional. The saved item ID associated with the files. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |
| `output_file` | Yes | string | New absolute result file in a private owner-only directory. Private download or signed credential result stays out of model output; no overwrite. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: Inspect endpoint requirements. Profile defaults fill supported user/team identity fields before body validation.

output_file must be new and absolute in a private directory, reserved exclusively before the API call. Binary bytes or signed JSON are kept out of model output. This wrapper never follows a signed external download URL.

#### upload_file

`gumloop-cli upload-file`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `file_name` | No; body and guard rules apply | string | The name of the file to be uploaded. |
| `file_content` | No; body and guard rules apply | string | Base64 encoded content of the file. format: `byte`. |
| `user_id` | No; body and guard rules apply | string | The user ID associated with the file. Required if project_id is not provided. |
| `project_id` | No; body and guard rules apply | string | The project ID associated with the file. Required if user_id is not provided. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |
| `file_path` | No; body and guard rules apply | string | Regular local file path, no symlink, at most 3 MiB. Encoded as native base64 file_content; cannot mix with file_content or payload routes. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: Inspect endpoint requirements. Profile defaults fill supported user/team identity fields before body validation.

#### upload_files

`gumloop-cli upload-files`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `files` | No; body and guard rules apply | array | See the full input schema. Items: object. |
| `user_id` | No; body and guard rules apply | string | The user ID associated with the files. Required if project_id is not provided. |
| `project_id` | No; body and guard rules apply | string | The project ID associated with the files. Required if user_id is not provided. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: Inspect endpoint requirements. Profile defaults fill supported user/team identity fields before body validation.

#### get_organization_audit_logs

`gumloop-cli get-organization-audit-logs`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organization_id` | Yes | string | The ID of the organization to retrieve audit logs for. |
| `user_id` | No; body and guard rules apply | string | Your user id -- you must be an organization admin to retrieve organization logs. |
| `start_time` | Yes | string | Start timestamp for log filtering (ISO format). format: `date-time`. |
| `end_time` | Yes | string | End timestamp for log filtering (ISO format). format: `date-time`. |
| `event_types` | No; body and guard rules apply | string | Comma-separated list of event types to filter by (e.g. `user_sign_in,credential_retrieval`). The singular `event_type` param accepts a single value. |
| `user_ids` | No; body and guard rules apply | string | Comma-separated list of user IDs whose events should be returned. |
| `ip_addresses` | No; body and guard rules apply | string | Comma-separated list of source IP addresses to filter by. The singular `ip_address` param accepts a single value. |
| `workspace_ids` | No; body and guard rules apply | string | Comma-separated list of workspace (team) IDs to filter by. The singular `workspace_id` param accepts a single value. |
| `entity_ids` | No; body and guard rules apply | string | Comma-separated list of entity IDs (agents, workbooks, files) to filter by. The singular `entity_id` param accepts a single value. |
| `page` | No; body and guard rules apply | integer | Page number for pagination. default: `1`. |
| `page_size` | No; body and guard rules apply | integer | Number of records per page. default: `50`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### manage_project_users

`gumloop-cli manage-project-users`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organization_id` | No; body and guard rules apply | string | The ID of the organization that the workspace belongs to. |
| `user_id` | No; body and guard rules apply | string | Your user id -- you must be an organization admin to manage workspace users. |
| `workspace_id` | No; body and guard rules apply | string | The ID of the workspace to manage users for. |
| `action` | No; body and guard rules apply | string | The action to perform - either 'add' or 'remove' a user. Values: `add`, `remove`. |
| `user_email` | No; body and guard rules apply | string | The email address of the target user to add or remove. |
| `is_admin` | No; body and guard rules apply | boolean | When adding a user, specify whether they should have admin privileges (default is false). |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `organization_id`, `user_id`, `workspace_id`, `action`, `user_email`. Profile defaults fill supported user/team identity fields before body validation.

#### manage_permission_group_users

`gumloop-cli manage-permission-group-users`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organization_id` | No; body and guard rules apply | string | The ID of the organization that the custom role belongs to. |
| `user_id` | No; body and guard rules apply | string | Your user id -- you must be an organization admin to manage custom role users. |
| `group_id` | No; body and guard rules apply | string | The ID of the custom role to manage users for. |
| `action` | No; body and guard rules apply | string | The action to perform - either 'add' or 'remove' a user. Values: `add`, `remove`. |
| `user_email` | No; body and guard rules apply | string | The email address of the target user to add or remove. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `organization_id`, `user_id`, `group_id`, `action`, `user_email`. Profile defaults fill supported user/team identity fields before body validation.

#### list_role_credit_limits

`gumloop-cli list-role-credit-limits`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organization_id` | Yes | string | The ID of the organization. minLength: `1`. |
| `user_id` | No; body and guard rules apply | string | Your user id -- you must be an organization admin to manage custom role credit limits. |
| `page_size` | No; body and guard rules apply | integer | Number of roles per page. maximum: `100`. default: `20`. |
| `cursor` | No; body and guard rules apply | string | Opaque cursor from a previous response's `next_cursor`; omit for the first page. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### get_role_credit_limit

`gumloop-cli get-role-credit-limit`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organization_id` | Yes | string | The ID of the organization the custom role belongs to. minLength: `1`. |
| `role_id` | Yes | string | The ID of the custom role (the same ID used as `group_id` by the Manage custom role users endpoint). minLength: `1`. |
| `user_id` | No; body and guard rules apply | string | Your user id -- you must be an organization admin to manage custom role credit limits. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### set_role_credit_limit

`gumloop-cli set-role-credit-limit`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organization_id` | Yes | string | The ID of the organization the custom role belongs to. minLength: `1`. |
| `role_id` | Yes | string | The ID of the custom role (the same ID used as `group_id` by the Manage custom role users endpoint). minLength: `1`. |
| `monthly_credit_limit` | No; body and guard rules apply | integer/null | The monthly credit limit applied to each member of this role, or null to clear the role-level limit. minimum: `0`. maximum: `1000000000`. |
| `user_id` | No; body and guard rules apply | string | Your user id -- you must be an organization admin to manage custom role credit limits. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `monthly_credit_limit`, `user_id`. Profile defaults fill supported user/team identity fields before body validation.

#### export_data

`gumloop-cli export-data`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `user_id` | No; body and guard rules apply | string | The ID of the user requesting the export. |
| `data_type` | No; body and guard rules apply | string | The type of data to export. Use `"workflows"` to export workflow run data, `"agents"` to export agent configuration data, `"agent_interactions"` to export agent interaction data, `"credit_logs"` to export credit transaction history, `"interaction_evaluations"` to export completed chat evaluations, or `"gumstack"` to export Gumstack tool call activity. Defaults to `"workflows"`. Audit-log exports are available in the Gumloop app only, not through this endpoint. Values: `workflows`, `agents`, `agent_interactions`, `credit_logs`, `interaction_evaluations`, `gumstack`. default: `workflows`. |
| `category_filter` | No; body and guard rules apply | string | **Only applicable when `data_type` is `"credit_logs"`.** Optional filter to export only credit logs matching a specific category (e.g., `"PIPELINE_RUN"`, `"AGENT_RUN"`, `"CUSTOM_NODE_RD"`, `"EXTERNAL_GUMCP_CALL"`). When omitted, all categories are included. |
| `export_level` | No; body and guard rules apply | string | The scope of the export. Use `"organization"` to export across the entire organization, or `"workspace"` to export from a single workspace (requires exactly one ID in `workspace_ids`). Defaults to `"organization"`. **Not applicable when `data_type` is `"credit_logs"`.** Values: `workspace`, `organization`. default: `organization`. |
| `export_fields` | No; body and guard rules apply | array | Array of fields to include in the export. The available fields depend on the `data_type`.  **Workflow fields** (when `data_type` is `"workflows"`): - `workbook_id` - The workbook identifier - `workbook_name` - The workbook name - `workbook_created_ts` - Workbook creation timestamp - `user_id` - The user identifier - `user_email` - The user's email address - `workspace_id` - The workspace identifier - `workspace_name` - The workspace name - `run_id` - The flow run identifier - `credit_cost` - Credits consumed by the run - `pl_run_created_ts` - Flow run creation timestamp - `pl_run_finished_ts` - Flow run completion timestamp - `pipeline` - The full pipeline configuration (JSON)  **Agent fields** (when `data_type` is `"agents"`): - `agent_id` - The agent identifier - `agent_name` - The agent name - `agent_description` - The agent description - `agent_model` - The model used by the agent - `agent_system_prompt` - The agent's system prompt - `agent_created_ts` - Agent creation timestamp - `agent_tools` - Tools configured for the agent (JSON) - `agent_metadata` - Additional agent metadata (JSON) - `agent_evaluations_enabled` - Whether the agent's own Evaluations are turned on (`true`/`false`) - `creator_email` - Email of the user who created the agent - `workspace_id` - The workspace identifier - `workspace_name` - The workspace name - `folder_id` - The identifier of the folder containing the agent (empty when the agent is not in a folder) - `folder_name` - The name of the folder containing the agent (empty when the agent is not in a folder)  **Agent interaction fields** (when `data_type` is `"agent_interactions"`): - `interaction_id` - Unique identifier for the chat session - `agent_id` - The agent identifier - `agent_name` - The agent name - `interaction_type` - Type of interaction (e.g., chat, slack, api, triggered) - `interaction_name` - Display name of the chat session - `trigger_type` - For triggered interactions, the specific trigger type (e.g., time_based, polling_new_record_salesforce). Null for non-triggered interactions. - `interaction_created_ts` - Chat session creation timestamp - `user_email` - Email of the user who initiated the chat - `credit_cost` - Total credits consumed (LLM + tool + flow) - `llm_credit_cost` - Credits consumed by LLM calls only - `tool_credit_cost` - Credits consumed by tool calls - `flow_credit_cost` - Credits consumed by pipeline runs - `message_count` - Number of messages in the conversation - `workspace_id` - The workspace identifier - `workspace_name` - The workspace name  **Interaction evaluation fields** (when `data_type` is `"interaction_evaluations"`): - `evaluation_id` - Unique identifier for the evaluation row - `interaction_id` - The chat session that was evaluated (one chat can have several evaluation rows) - `agent_id` - The identifier of the agent that was evaluated - `organization_evaluation_id` - The organization-level evaluation this row belongs to (empty for agent-level rubrics) - `evaluation_created_ts` - When the evaluation reached its final state - `status` - The evaluation's state - `grade` - The grade the evaluation produced - `call_outcome` - The outcome the evaluation recorded for the conversation - `sentiment` - The sentiment the evaluation recorded - `error_code` - Error code when the evaluation could not complete - `summary` - The evaluation's written summary - `evaluation_model` - The model that ran the evaluation - `credit_cost` - Credits consumed by the evaluation - `user_email` - Email of the user whose chat was evaluated  **Credit log fields** (when `data_type` is `"credit_logs"`): - `user_email` - Email of the user associated with the credit log entry - `permission_group_id` - Custom role ID(s) the user belongs to (semicolon-separated if multiple) (disabled by default) - `permission_group_name` - Custom role name(s) the user belongs to (semicolon-separated if multiple) (disabled by default) - `timestamp` - When the credit transaction occurred - `category` - The category of the credit log (e.g., PIPELINE_RUN, AGENT_RUN) - `type` - The specific type of credit charge - `name` - Display name of the credit log entry - `amount` - Number of credits charged or adjusted - `balance` - Credit balance after the transaction - `log_id` - Unique identifier for the credit log entry - `correlation_id` - Join key to the related run or interaction (disabled by default) - `balance_scope` - Whether the balance is organization- or user-scoped (disabled by default) - `project_id` - The project identifier (disabled by default)  Not all combinations of selected fields are guaranteed to produce data for every row. Items: string. |
| `start_date` | No; body and guard rules apply | string | Start date for the export in ISO 8601 format (e.g., `2025-01-01T00:00:00Z`). format: `date-time`. |
| `end_date` | No; body and guard rules apply | string | End date for the export in ISO 8601 format (e.g., `2025-12-31T23:59:59Z`). format: `date-time`. |
| `include_all_workspaces` | No; body and guard rules apply | boolean | Whether to include all workspaces in the organization. When `true`, also sets `include_personal_workspaces` to `true`. **Not applicable when `data_type` is `"credit_logs"`.** default: `False`. |
| `include_personal_workspaces` | No; body and guard rules apply | boolean | Whether to include personal workspaces in the export. Ignored if `include_all_workspaces` is `true`. **Not applicable when `data_type` is `"credit_logs"`.** default: `False`. |
| `workspace_ids` | No; body and guard rules apply | array | An optional array of workspace IDs to include in the export. When `export_level` is `"workspace"`, exactly one workspace ID is required. Ignored if `include_all_workspaces` is `true`. **Not applicable when `data_type` is `"credit_logs"`.** Items: string. |
| `entity_ids` | No; body and guard rules apply | array | An optional array of specific entity IDs to filter the export. For workflow exports (`data_type: "workflows"`), these are workbook IDs. For agent exports (`data_type: "agents"`) and agent interaction exports (`data_type: "agent_interactions"`), these are agent IDs. When provided, only data for the specified entities will be included. **Not applicable when `data_type` is `"credit_logs"`.** Items: string. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `user_id`, `export_fields`, `start_date`, `end_date`. Profile defaults fill supported user/team identity fields before body validation.

#### get_export_status

`gumloop-cli get-export-status`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `user_id` | No; body and guard rules apply | string | The ID of the user requesting the export status. |
| `data_export_id` | Yes | string | The unique identifier of the data export job to check (returned by the Export data endpoint). |
| `download` | No; body and guard rules apply | boolean | Set to `true` to download the export file directly when the export is completed. When `true` and the export state is `COMPLETED`, the response will be a CSV file download instead of JSON. default: `False`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `output_file` | Yes | string | New absolute result file in a private owner-only directory. Private download or signed credential result stays out of model output; no overwrite. minLength: `1`. |

output_file must be new and absolute in a private directory, reserved exclusively before the API call. Binary bytes or signed JSON are kept out of model output. This wrapper never follows a signed external download URL.

#### list_agents

`gumloop-cli list-agents`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `team_id` | No; body and guard rules apply | string | Scope the listing to a single team. When omitted, returns agents owned by the authenticated user. |
| `search` | No; body and guard rules apply | string | Case-insensitive substring match against the agent name. |
| `creator` | No; body and guard rules apply | string | Filter to agents created by this user ID. |
| `has_triggers` | No; body and guard rules apply | boolean | When `true`, only returns agents that have at least one active trigger configured. |
| `tool` | No; body and guard rules apply | string | Filter to agents that use the specified MCP server as a tool. |
| `flow` | No; body and guard rules apply | string | Filter to agents that use the specified saved flow as a tool. |
| `sort_order` | No; body and guard rules apply | string | Sort order for the listing. Defaults to newest first. Values: `newest`, `oldest`, `name_asc`, `name_desc`. default: `newest`. |
| `include_last_used` | No; body and guard rules apply | boolean | When `true`, populates `last_used_at` on each agent with the timestamp of its most recent session. |
| `include_last_updated` | No; body and guard rules apply | boolean | When `true`, populates `last_updated_at` on each agent with the timestamp of its most recent configuration change. |
| `page_size` | No; body and guard rules apply | integer | Number of agents per page. Sending `page_size` or `cursor` opts into cursor pagination; requests that send neither return the full list. minimum: `1`. maximum: `100`. default: `20`. |
| `cursor` | No; body and guard rules apply | string | Opaque cursor from a previous response's `next_cursor`. Pass it to fetch the next page. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### create_agent

`gumloop-cli create-agent`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body and guard rules apply | string | Display name for the agent. |
| `model_name` | No; body and guard rules apply | string | ID of the LLM the agent runs on. Use `GET /models` to discover valid values. |
| `description` | No; body and guard rules apply | string/null | See the full input schema. |
| `system_prompt` | No; body and guard rules apply | string/null | See the full input schema. |
| `tools` | No; body and guard rules apply | array | Tools the agent can call. Each tool is an object whose shape depends on the tool type. default: `[]`. Items: object. |
| `resources` | No; body and guard rules apply | array | Resources attached to the agent. default: `[]`. Items: object. |
| `skill_ids` | No; body and guard rules apply | array/null | IDs of skills to attach to the agent. Attachment happens inside the create transaction, so an invalid ID fails the whole request (no orphaned agent). Omit to attach none. The caller must hold `INVOKE` on each skill. After creation, manage skills with `PATCH /agents/{agent_id}/skills`. Items: string. |
| `metadata` | No; body and guard rules apply | object/null | Arbitrary key/value metadata stored on the agent. |
| `folder_id` | No; body and guard rules apply | string/null | ID of the folder to place the agent in. |
| `is_active` | No; body and guard rules apply | boolean | Whether the agent is active. Defaults to `true`.  Setting this to `false` retires the agent: it disappears from `GET /agents`, and `GET`/`PATCH /agents/{agent_id}` return `404`, so it cannot be reactivated through the API. This is not a pause switch — to stop an agent from running while keeping it reachable, disable its triggers instead. default: `True`. |
| `agent_id` | No; body and guard rules apply | string/null | Optional caller-supplied agent ID. When omitted, the server generates one. |
| `team_id` | No; body and guard rules apply | string/null | ID of the team to create the agent under. When omitted, the agent is owned by the authenticated user. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `name`, `model_name`. Profile defaults fill supported user/team identity fields before body validation.

#### retrieve_agent

`gumloop-cli retrieve-agent`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent to retrieve. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### update_agent

`gumloop-cli update-agent`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent to update. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `name` | No; body and guard rules apply | string/null | See the full input schema. |
| `model_name` | No; body and guard rules apply | string/null | ID of the LLM the agent runs on. Use `GET /models` to discover valid values. |
| `description` | No; body and guard rules apply | string/null | See the full input schema. |
| `system_prompt` | No; body and guard rules apply | string/null | See the full input schema. |
| `tools` | No; body and guard rules apply | array/null | When provided, replaces the agent's tool list. Items: object. |
| `resources` | No; body and guard rules apply | array/null | When provided, replaces the agent's resource list. Items: object. |
| `metadata` | No; body and guard rules apply | object/null | See the full input schema. |
| `is_active` | No; body and guard rules apply | boolean/null | Setting this to `false` retires the agent: it disappears from `GET /agents`, and `GET`/`PATCH /agents/{agent_id}` return `404`, so it cannot be reactivated through the API. This is not a pause switch — to stop an agent from running while keeping it reachable, disable its triggers instead. |
| `team_id` | No; body and guard rules apply | string/null | When provided, transfers ownership of the agent to this team. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: Inspect endpoint requirements. Profile defaults fill supported user/team identity fields before body validation.

#### create_chat_completion

`gumloop-cli create-chat-completion`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `model` | No; body and guard rules apply | string | Model slug. Use the `id` from `GET /models` or one of Gumloop's preset routes. |
| `messages` | No; body and guard rules apply | array | Conversation history. Roles `system`, `developer`, `user`, `assistant`, and `tool`. User messages accept multipart `content` with `text` and `image_url` parts. Assistant messages can carry `tool_calls`; answer each one with a `tool` message whose `tool_call_id` matches the call's `id`. Items: object. |
| `stream` | No; body and guard rules apply | boolean | Only non-streaming JSON is supported. Streaming requests are refused before fetch. |
| `temperature` | No; body and guard rules apply | number | Sampling temperature. |
| `max_completion_tokens` | No; body and guard rules apply | integer | Cap on completion tokens. Replaces the deprecated `max_tokens` field. |
| `modalities` | No; body and guard rules apply | array | Output modalities. Include `"image"` to route to an image-generation model. Items: string. |
| `image_config` | No; body and guard rules apply | object | Image-generation parameters (size, quality, aspect_ratio, background, output_format, partial_images). Optional. Image-generation models accept either `modalities: ["image"]` or `image_config` (or both); chat models ignore this field. |
| `response_format` | No; body and guard rules apply | object | Constrain the response. `{type: "json_object"}` returns a JSON object; `{type: "json_schema", json_schema: {name, strict, schema}}` returns JSON matching the supplied schema. |
| `tools` | No; body and guard rules apply | array | OpenAI-shape tool definitions (`{type: "function", function: {name, description, parameters}}`). Pass `tool_choice` to constrain selection. |
| `tool_choice` | No; body and guard rules apply | Union | `"auto"` lets the model choose and is the default when `tools` are sent. `"none"` disables tool calls, `"required"` forces a tool call, and `{"type": "function", "function": {"name": "..."}}` forces a specific tool. |
| `provider` | No; body and guard rules apply | object | OpenRouter provider routing config. Caller fields like `sort` and `order` are honored; ZDR/data_collection policy is server-enforced. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `model`, `messages`. Profile defaults fill supported user/team identity fields before body validation.

#### list_models

`gumloop-cli list-models`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `team_id` | No; body and guard rules apply | string | Scope model availability to a specific team. When omitted, uses the authenticated user's default organization. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### route_model

`gumloop-cli route-model`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `input` | No; body and guard rules apply | Union | The message to route. `message` is accepted as an alias. A string or an array of `{type: text, text: ...}` parts. |
| `models` | No; body and guard rules apply | array | Candidate model IDs to choose between. IDs must be nonempty, unique after remapping, and registered. Omit to use Chew's lane-chain union. minItems: `1`. maxItems: `50`. Items: string. |
| `history` | No; body and guard rules apply | array | Prior turns, oldest first, for context. maxItems: `20`. Items: object. |
| `agent` | No; body and guard rules apply | object | Optional context about the agent the message is for. Sharper context produces a sharper route. |
| `team_id` | No; body and guard rules apply | string | Scope model availability and credit attribution to a team the caller belongs to. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `input`. Profile defaults fill supported user/team identity fields before body validation.

#### list_agent_versions

`gumloop-cli list-agent-versions`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent whose versions to list. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `page_size` | No; body and guard rules apply | integer | Number of versions to return per page. Clamped to 1–100. minimum: `1`. maximum: `100`. default: `20`. |
| `cursor` | No; body and guard rules apply | string | Opaque pagination cursor returned by a prior call as `next_cursor`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### retrieve_agent_version

`gumloop-cli retrieve-agent-version`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent the version belongs to. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `version_id` | Yes | string | ID of the version to retrieve, from `GET /agents/{agent_id}/versions`. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### update_agent_skills

`gumloop-cli update-agent-skills`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent whose skills to update. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `attach` | No; body and guard rules apply | array | Skill IDs to attach. Ignored if already attached. default: `[]`. Items: string. |
| `detach` | No; body and guard rules apply | array | Skill IDs to detach. Ignored if not attached. default: `[]`. Items: string. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: Inspect endpoint requirements. Profile defaults fill supported user/team identity fields before body validation.

#### list_agent_mcp_servers

`gumloop-cli list-agent-mcp-servers`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### attach_agent_mcp_server

`gumloop-cli attach-agent-mcp-server`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `server_id` | Yes | string | ID of the MCP server from the caller's catalog. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### detach_agent_mcp_server

`gumloop-cli detach-agent-mcp-server`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `server_id` | Yes | string | ID of the MCP server to detach. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### list_sessions

`gumloop-cli list-sessions`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent whose sessions to list. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `page_size` | No; body and guard rules apply | integer | Number of sessions to return per page. Defaults to `20`, maximum `100`. minimum: `1`. maximum: `100`. default: `20`. |
| `cursor` | No; body and guard rules apply | string | Cursor for the next page of results. Use the `next_cursor` value from a previous response. |
| `search` | No; body and guard rules apply | string | Free-text search query to filter sessions by name or content. Also accepted as `search_query`. |
| `sort_order` | No; body and guard rules apply | string | Sort order for the results (e.g. `newest` or `oldest`). |
| `type` | No; body and guard rules apply | string | Filter sessions by type (e.g. `api`, `web`, `slack`). |
| `state` | No; body and guard rules apply | string | Filter sessions by state. Values: `processing`, `completed`, `failed`, `queued`, `idle`. |
| `creator_user_id` | No; body and guard rules apply | string | Filter sessions by the user who created them. |
| `trigger_id` | No; body and guard rules apply | string | Filter sessions by the trigger that initiated them. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### create_session

`gumloop-cli create-session`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent to start a session on. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `input` | No; body and guard rules apply | string | The first user message for the session. Also accepted as `message` for backwards compatibility. When omitted, an idle session is created with no messages. |
| `session_id` | No; body and guard rules apply | string | Caller-supplied session ID. When omitted, the server generates one. If provided and the ID already exists, the request returns `409 session_already_exists`. |
| `name` | No; body and guard rules apply | string | Optional display name for the session. Leading and trailing whitespace is removed before the 1-256 character limit is applied, so an empty or whitespace-only value is rejected. A name you supply is kept; the automatic title only fills in sessions created without one. Rename the session later with `PATCH /sessions/{session_id}`. maxLength: `256`. |
| `metadata` | No; body and guard rules apply | object | Arbitrary key/value metadata attached to the session. Stored under `metadata.client`. |
| `stream` | No; body and guard rules apply | boolean | Must be `false` (or omitted) when calling `api.gumloop.com`. Set to `true` only when calling `ws.gumloop.com` (see the streaming section above). default: `False`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

#### retrieve_session

`gumloop-cli retrieve-session`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `session_id` | Yes | string | ID of the session to retrieve. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### rename_session

`gumloop-cli rename-session`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `session_id` | Yes | string | ID of the session to rename. minLength: `1`. |
| `name` | No; body and guard rules apply | string | New name for the session. Leading and trailing whitespace is removed before the 1-256 character limit is applied, so a whitespace-only value is rejected. minLength: `1`. maxLength: `256`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `name`. Profile defaults fill supported user/team identity fields before body validation.

#### send_message

`gumloop-cli send-message`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `session_id` | Yes | string | ID of the session to continue. minLength: `1`. |
| `input` | No; body and guard rules apply | string | The next user message. Required. Also accepted as `message` for backwards compatibility. |
| `stream` | No; body and guard rules apply | boolean | Must be `false` (or omitted) when calling `api.gumloop.com`. Set to `true` only when calling `ws.gumloop.com` (see the streaming section above). default: `False`. |
| `attachments` | No; body and guard rules apply | array | Files to attach to the message. Each `file_name` must be a stored path returned by Upload session file for this session. maxItems: `10`. Items: object. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `input`. Profile defaults fill supported user/team identity fields before body validation.

#### cancel_session

`gumloop-cli cancel-session`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `session_id` | Yes | string | ID of the session to cancel. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### upload_session_file

`gumloop-cli upload-session-file`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `session_id` | Yes | string | ID of the session to upload the file to. minLength: `1`. |
| `file_name` | No; body and guard rules apply | string | Name of the file. Directory components are stripped; the base name is sanitized before storage. |
| `file_content` | No; body and guard rules apply | string | Base64-encoded file contents. Maximum decoded size is 200MB. format: `byte`. |
| `media_type` | No; body and guard rules apply | string | MIME type of the file. Echoed back in the response. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `file_name`, `file_content`. Profile defaults fill supported user/team identity fields before body validation.

#### resolve_session_approvals

`gumloop-cli resolve-session-approvals`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `session_id` | Yes | string | ID of the session with pending approvals. minLength: `1`. |
| `approval_responses` | No; body and guard rules apply | array | Answers to pending asks. Each `action_request_id` may appear at most once. minItems: `1`. maxItems: `20`. Items: object. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `approval_responses`. Profile defaults fill supported user/team identity fields before body validation.

#### list_queued_messages

`gumloop-cli list-queued-messages`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `session_id` | Yes | string | ID of the session whose queue to list. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### queue_session_message

`gumloop-cli queue-session-message`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `session_id` | Yes | string | ID of the session to queue the message on. minLength: `1`. |
| `input` | No; body and guard rules apply | string | The message to queue. Cannot be empty. Also accepted as `message` for backwards compatibility. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `input`. Profile defaults fill supported user/team identity fields before body validation.

#### update_queued_message

`gumloop-cli update-queued-message`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `session_id` | Yes | string | ID of the session the queued message belongs to. minLength: `1`. |
| `queued_message_id` | Yes | string | ID of the queued message to update. minLength: `1`. |
| `input` | No; body and guard rules apply | string | The new message content. Cannot be empty. Also accepted as `message` for backwards compatibility. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `input`. Profile defaults fill supported user/team identity fields before body validation.

#### delete_queued_message

`gumloop-cli delete-queued-message`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `session_id` | Yes | string | ID of the session the queued message belongs to. minLength: `1`. |
| `queued_message_id` | Yes | string | ID of the queued message to delete. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### send_queued_message

`gumloop-cli send-queued-message`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `session_id` | Yes | string | ID of the session the queued message belongs to. minLength: `1`. |
| `queued_message_id` | Yes | string | ID of the queued message to send. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### list_mcp_servers

`gumloop-cli list-mcp-servers`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `team_id` | No; body and guard rules apply | string | Scope the catalog to a single team. When omitted, returns servers visible to the authenticated user. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### retrieve_mcp_server

`gumloop-cli retrieve-mcp-server`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `server_id` | Yes | string | Identifier of the MCP server to retrieve. minLength: `1`. |
| `team_id` | No; body and guard rules apply | string | Scope the lookup to a single team. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### list_mcp_server_tools

`gumloop-cli list-mcp-server-tools`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `server_id` | Yes | string | Identifier of the MCP server. minLength: `1`. |
| `team_id` | No; body and guard rules apply | string | Scope the lookup to a single team. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### list_mcp_server_resources

`gumloop-cli list-mcp-server-resources`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `server_id` | Yes | string | Identifier of the MCP server. minLength: `1`. |
| `team_id` | No; body and guard rules apply | string | Scope the lookup to a single team. |
| `cursor` | No; body and guard rules apply | string | Opaque cursor from a previous response's `next_cursor`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### read_mcp_server_resource

`gumloop-cli read-mcp-server-resource`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `server_id` | Yes | string | See current schema minLength: `1`. |
| `uri` | Yes | string | The resource `uri` from List MCP server resources. |
| `team_id` | No; body and guard rules apply | string | See current schema |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### list_mcp_server_prompts

`gumloop-cli list-mcp-server-prompts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `server_id` | Yes | string | See current schema minLength: `1`. |
| `team_id` | No; body and guard rules apply | string | See current schema |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### get_mcp_server_prompt

`gumloop-cli get-mcp-server-prompt`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `server_id` | Yes | string | See current schema minLength: `1`. |
| `name` | No; body and guard rules apply | string | Prompt name from List MCP server prompts. |
| `arguments` | No; body and guard rules apply | object | Argument values for the template. |
| `team_id` | No; body and guard rules apply | string | Scope the lookup to a single team. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `name`. Profile defaults fill supported user/team identity fields before body validation.

#### call_mcp_tools

`gumloop-cli call-mcp-tools`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `calls` | No; body and guard rules apply | array | Tool calls to execute. Dispatched concurrently; the batch is capped at 5. minItems: `1`. maxItems: `5`. Items: object. |
| `team_id` | No; body and guard rules apply | string/null | Team the calls are scoped to. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `calls`. Profile defaults fill supported user/team identity fields before body validation.

#### search_brain

`gumloop-cli search-brain`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `query` | No; body and guard rules apply | string | The natural-language search query. |
| `limit` | No; body and guard rules apply | integer | Maximum number of results to return. minimum: `1`. maximum: `50`. default: `8`. |
| `source_type` | No; body and guard rules apply | array/null | Restrict results to specific source types. Omit to search every source you can access. Valid values: `notion`, `google_drive`, `slack`, `github`, `confluence`, `direct_file_uploads`, `gumloop_artifacts`. minItems: `1`. Items: string. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `query`. Profile defaults fill supported user/team identity fields before body validation.

#### list_brain_sources

`gumloop-cli list-brain-sources`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `scope` | No; body and guard rules apply | string | Only sources in this scope. Values: `personal`, `team`, `organization`. |
| `source_type` | No; body and guard rules apply | string | Only sources of this type, for example `direct_file_uploads` or `notion`. |
| `team_id` | No; body and guard rules apply | string | Only team sources belonging to this team. |
| `page_size` | No; body and guard rules apply | integer | Maximum number of sources to return. minimum: `1`. maximum: `100`. default: `20`. |
| `cursor` | No; body and guard rules apply | string | Opaque cursor from a previous response's `next_cursor`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### create_brain_source

`gumloop-cli create-brain-source`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body and guard rules apply | string | Display name of the source. minLength: `1`. maxLength: `200`. |
| `source_type` | No; body and guard rules apply | string | Only `direct_file_uploads` is accepted. default: `direct_file_uploads`. |
| `scope` | No; body and guard rules apply | string | Which Brain the source belongs to. `team` requires `team_id`. Values: `personal`, `team`, `organization`. default: `personal`. |
| `team_id` | No; body and guard rules apply | string | The team for `scope: team`. Not accepted with other scopes. |
| `require_approval` | No; body and guard rules apply | boolean | Create as a draft that estimates credits before anything is indexed. default: `False`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `name`. Profile defaults fill supported user/team identity fields before body validation.

#### get_brain_source

`gumloop-cli get-brain-source`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `source_id` | Yes | string | The source id. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### delete_brain_source

`gumloop-cli delete-brain-source`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `source_id` | Yes | string | The source id. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### list_brain_files

`gumloop-cli list-brain-files`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `source_id` | Yes | string | The source id. minLength: `1`. |
| `page_size` | No; body and guard rules apply | integer | See current schema minimum: `1`. maximum: `100`. default: `20`. |
| `cursor` | No; body and guard rules apply | string | See current schema |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### upload_brain_files

`gumloop-cli upload-brain-files`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `source_id` | Yes | string | The source id. minLength: `1`. |
| `files` | No; body and guard rules apply | array | Regular local file paths, not base64; each file and total upload at most 5 MiB. Paths cannot be symlinks. minItems: `1`. maxItems: `25`. Items: string. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `files`. Profile defaults fill supported user/team identity fields before body validation.

files contains regular local paths. The handler reads actual bytes and sends native multipart file parts after confirmation; 5 MiB per file/total local cap, no symlinks.

#### delete_brain_file

`gumloop-cli delete-brain-file`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `source_id` | Yes | string | The source id. minLength: `1`. |
| `file_id` | Yes | string | See current schema minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### get_brain_source_estimate

`gumloop-cli get-brain-source-estimate`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `source_id` | Yes | string | The source id. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### approve_brain_source

`gumloop-cli approve-brain-source`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `source_id` | Yes | string | The source id. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### list_skills

`gumloop-cli list-skills`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `team_id` | No; body and guard rules apply | string | Scope the listing to a single team. When omitted, returns skills owned by the authenticated user. |
| `search_query` | No; body and guard rules apply | string | Case-insensitive substring match against the skill name. |
| `sort_order` | No; body and guard rules apply | string | Sort order for the returned skills. Values: `newest`, `popular`, `most_used`. default: `newest`. |
| `page_size` | No; body and guard rules apply | integer | Number of skills per page. Clamped between 1 and 100. minimum: `1`. maximum: `100`. default: `20`. |
| `cursor` | No; body and guard rules apply | string | Opaque pagination cursor returned in `next_cursor` from a prior page. |
| `creator_user_id` | No; body and guard rules apply | string | Filter to skills created by this user ID. |
| `related_server_id` | No; body and guard rules apply | string | Filter to skills that reference this MCP server ID in their metadata. |
| `agent_id` | No; body and guard rules apply | string | Filter to skills attached to this agent. |
| `unused` | No; body and guard rules apply | string | When set, filters to skills that have not been used. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### create_skill

`gumloop-cli create-skill`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `files` | No; body and guard rules apply | array | Regular local file paths, not base64; each file and total upload at most 5 MiB. Paths cannot be symlinks. minItems: `1`. maxItems: `25`. Items: string. |
| `team_id` | No; body and guard rules apply | string | Team that should own the skill. When omitted, the skill is owned by the authenticated user. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `files`. Profile defaults fill supported user/team identity fields before body validation.

files contains regular local paths. The handler reads actual bytes and sends native multipart file parts after confirmation; 5 MiB per file/total local cap, no symlinks.

#### update_skill

`gumloop-cli update-skill`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `skill_id` | Yes | string | ID of the skill to update. minLength: `1`. |
| `files` | No; body and guard rules apply | array | Regular local file paths, not base64; each file and total upload at most 5 MiB. Paths cannot be symlinks. minItems: `1`. maxItems: `25`. Items: string. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `files`. Profile defaults fill supported user/team identity fields before body validation.

files contains regular local paths. The handler reads actual bytes and sends native multipart file parts after confirmation; 5 MiB per file/total local cap, no symlinks.

#### delete_skill

`gumloop-cli delete-skill`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `skill_id` | Yes | string | ID of the skill to delete. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### download_skill_file

`gumloop-cli download-skill-file`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `skill_id` | Yes | string | ID of the skill to download. minLength: `1`. |
| `version_id` | No; body and guard rules apply | string | Specific version to download. When omitted, the current draft is returned. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `output_file` | Yes | string | New absolute result file in a private owner-only directory. Private download or signed credential result stays out of model output; no overwrite. minLength: `1`. |

output_file must be new and absolute in a private directory, reserved exclusively before the API call. Binary bytes or signed JSON are kept out of model output. This wrapper never follows a signed external download URL.

#### list_artifacts

`gumloop-cli list-artifacts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent whose artifacts to list. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `session_id` | No; body and guard rules apply | string | Filter to artifacts produced within a specific session. |
| `search_query` | No; body and guard rules apply | string | Case-insensitive substring match against the artifact filename. |
| `sort_order` | No; body and guard rules apply | string | Sort order for results. Defaults to `newest`. default: `newest`. |
| `page_size` | No; body and guard rules apply | integer | Number of artifacts to return per page. Clamped to 1–100. minimum: `1`. maximum: `100`. default: `20`. |
| `cursor` | No; body and guard rules apply | string | Opaque pagination cursor returned by a prior call as `next_cursor`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### download_artifact_file

`gumloop-cli download-artifact-file`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `artifact_id` | Yes | string | ID of the artifact to download. minLength: `1`. |
| `version_id` | No; body and guard rules apply | string | Specific version of the artifact to download. Defaults to the latest version when omitted. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `output_file` | Yes | string | New absolute result file in a private owner-only directory. Private download or signed credential result stays out of model output; no overwrite. minLength: `1`. |

output_file must be new and absolute in a private directory, reserved exclusively before the API call. Binary bytes or signed JSON are kept out of model output. This wrapper never follows a signed external download URL.

#### list_browser_profiles

`gumloop-cli list-browser-profiles`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `team_id` | No; body and guard rules apply | string | List a team's profiles instead of your personal ones. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### import_browser_profile_cookies

`gumloop-cli import-browser-profile-cookies`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `profile_id` | Yes | string | A profile id, or `default`. minLength: `1`. |
| `url` | No; body and guard rules apply | string | Import only the cookies for this site and replace what the profile had for it. Omit to import every site in `cookies`. maxLength: `2048`. |
| `cookies` | No; body and guard rules apply | array | Cookies in `chrome.cookies.Cookie` or CDP `Cookie` shape. minItems: `1`. Items: object. |
| `team_id` | No; body and guard rules apply | string | Import into a team-owned profile instead of a personal one. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `cookies`. Profile defaults fill supported user/team identity fields before body validation.

#### list_teams

`gumloop-cli list-teams`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### list_evaluations

`gumloop-cli list-evaluations`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent whose evaluations to list. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `page_size` | No; body and guard rules apply | integer | Number of evaluations to return per page (1-100). minimum: `1`. maximum: `100`. default: `20`. |
| `cursor` | No; body and guard rules apply | string | Pagination cursor from a previous response's `next_cursor` field. |
| `grade` | No; body and guard rules apply | string | Filter evaluations by grade. Values: `pass`, `needs_review`, `needs_attention`. |
| `status` | No; body and guard rules apply | string | Return evaluations in one lifecycle state instead of the default completed and failed set. Values: `queued`, `in_progress`, `completed`, `failed`. |
| `session_id` | No; body and guard rules apply | string | Only evaluations of this session. |
| `organization_evaluation_id` | No; body and guard rules apply | string | Return the results one organization evaluation produced for this agent instead of the agent's own evaluation results. |
| `created_after` | No; body and guard rules apply | string | Only evaluations created at or after this ISO 8601 timestamp. Timestamps without an offset are read as UTC. format: `date-time`. |
| `created_before` | No; body and guard rules apply | string | Only evaluations created before this ISO 8601 timestamp. Timestamps without an offset are read as UTC. format: `date-time`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### run_evaluations

`gumloop-cli run-evaluations`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent that owns the sessions. minLength: `1`. |
| `session_ids` | No; body and guard rules apply | array | Sessions to grade. Duplicates are rejected. minItems: `1`. maxItems: `200`. Items: string. |
| `dry_run` | No; body and guard rules apply | boolean | Report cost and skipped sessions without queuing. default: `False`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `session_ids`. Profile defaults fill supported user/team identity fields before body validation.

#### get_evaluation_metrics

`gumloop-cli get-evaluation-metrics`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `days` | No; body and guard rules apply | integer | Number of days to look back (1-365). Defaults to 30. minimum: `1`. maximum: `365`. default: `30`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### retrieve_evaluation

`gumloop-cli retrieve-evaluation`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent the evaluation belongs to. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `evaluation_id` | Yes | string | ID of the evaluation to retrieve. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### get_evaluation_config

`gumloop-cli get-evaluation-config`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### update_evaluation_config

`gumloop-cli update-evaluation-config`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `agent_id` | Yes | string | ID of the agent. Also accepts the reserved aliases `gumball` and `analytics`. minLength: `1`. |
| `enabled` | No; body and guard rules apply | boolean | Whether evaluations are enabled for this agent. |
| `model_name` | No; body and guard rules apply | string | LLM model to use for evaluation. |
| `include_auto_tags` | No; body and guard rules apply | boolean | Allow the evaluator to suggest tags beyond your predefined vocabulary. |
| `criteria` | No; body and guard rules apply | array | Quality criteria to check (replaces existing list). Max 30. Items: object. |
| `tags` | No; body and guard rules apply | array | Tag vocabulary (replaces existing list). Max 50. Items: object. |
| `data_points` | No; body and guard rules apply | array | Data points to extract (replaces existing list). Max 40. Items: object. |
| `sentiment` | No; body and guard rules apply | object | See the full input schema. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: Inspect endpoint requirements. Profile defaults fill supported user/team identity fields before body validation.

#### list_organizations

`gumloop-cli list-organizations`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### get_evaluation_options

`gumloop-cli get-evaluation-options`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### list_organization_evaluations

`gumloop-cli list-organization-evaluations`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `organization_id` | Yes | string | The organization whose evaluations to list. |
| `page_size` | No; body and guard rules apply | integer | Items per page (1-100). minimum: `1`. maximum: `100`. default: `20`. |
| `cursor` | No; body and guard rules apply | string | Pagination cursor from a previous response's `next_cursor`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### create_organization_evaluation

`gumloop-cli create-organization-evaluation`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: Inspect endpoint requirements. Profile defaults fill supported user/team identity fields before body validation.

#### get_organization_evaluation

`gumloop-cli get-organization-evaluation`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `evaluation_id` | Yes | string | ID of the organization evaluation. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### update_organization_evaluation

`gumloop-cli update-organization-evaluation`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `evaluation_id` | Yes | string | ID of the organization evaluation. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: Inspect endpoint requirements. Profile defaults fill supported user/team identity fields before body validation.

#### delete_organization_evaluation

`gumloop-cli delete-organization-evaluation`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `evaluation_id` | Yes | string | ID of the organization evaluation. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |

#### set_organization_evaluation_targets

`gumloop-cli set-organization-evaluation-targets`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `evaluation_id` | Yes | string | ID of the organization evaluation. minLength: `1`. |
| `targets` | No; body and guard rules apply | array | See the full input schema. maxItems: `1000`. Items: EvaluationTarget. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `targets`. Profile defaults fill supported user/team identity fields before body validation.

#### run_organization_evaluation

`gumloop-cli run-organization-evaluation`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `evaluation_id` | Yes | string | ID of the organization evaluation. minLength: `1`. |
| `session_ids` | No; body and guard rules apply | array | Sessions to grade. Duplicates are rejected. minItems: `1`. maxItems: `200`. Items: string. |
| `dry_run` | No; body and guard rules apply | boolean | Report cost and skipped sessions without queuing. default: `False`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |
| `confirm` | No; body and guard rules apply | boolean | Set true only when the user asked for exactly this action. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Native body flags, payload and payload_file are mutually exclusive. Required native body fields: `session_ids`. Profile defaults fill supported user/team identity fields before body validation.

#### list_organization_evaluation_results

`gumloop-cli list-organization-evaluation-results`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `evaluation_id` | Yes | string | ID of the organization evaluation. minLength: `1`. |
| `agent_id` | No; body and guard rules apply | string | Only results for this agent. |
| `session_id` | No; body and guard rules apply | string | Only results for this session. |
| `grade` | No; body and guard rules apply | string | Filter by grade. Values: `pass`, `needs_review`, `needs_attention`. |
| `status` | No; body and guard rules apply | string | Filter by status. Values: `queued`, `in_progress`, `completed`, `failed`. |
| `created_after` | No; body and guard rules apply | string | Only results created at or after this time. RFC 3339 with an explicit offset (for example `2026-09-01T00:00:00Z`). format: `date-time`. |
| `created_before` | No; body and guard rules apply | string | Only results created before this time. RFC 3339 with an explicit offset. format: `date-time`. |
| `page_size` | No; body and guard rules apply | integer | Items per page (1-100). minimum: `1`. maximum: `100`. default: `20`. |
| `cursor` | No; body and guard rules apply | string | Pagination cursor from a previous response's `next_cursor`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### get_organization_evaluation_result

`gumloop-cli get-organization-evaluation-result`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `evaluation_id` | Yes | string | ID of the organization evaluation. minLength: `1`. |
| `result_id` | Yes | string | Result ID from a run response or a results list. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### get_organization_evaluation_metrics

`gumloop-cli get-organization-evaluation-metrics`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `evaluation_id` | Yes | string | ID of the organization evaluation. minLength: `1`. |
| `days` | No; body and guard rules apply | integer | Window length in days. minimum: `1`. maximum: `365`. default: `30`. |
| `account` | No; body and guard rules apply | string | Named private Gumloop account; selects private credentials and user/team identity. |

#### list_accounts

`gumloop-cli list-accounts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| None | No | None | No arguments |

### Nested request definitions

These definitions are shared by the current native bodies. Required fields depend on the selected union branch. Full inline shapes remain in schema COMMAND.

##### EvaluationRubric

What and how the evaluation grades. Entries in `criteria`, `tags`, and `data_points` accept additional fields as the product evolves.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `model_name` | No; body and guard rules apply | string | Grading model. `auto` picks the recommended model. |
| `frequency` | No; body and guard rules apply | string | When to grade new sessions automatically. `manual` only grades via `POST /evaluations/{evaluation_id}/run`. Values: `debounced`, `per_turn`, `manual`. |
| `language` | No; body and guard rules apply | string | Language for summaries and rationales, or `auto`. |
| `include_auto_tags` | No; body and guard rules apply | boolean | See the full input schema. |
| `session_types` | No; body and guard rules apply | array | Session types to grade. See `session_types` in `GET /evaluation-options`. Items: string. |
| `criteria` | No; body and guard rules apply | array | See the full input schema. maxItems: `30`. Items: object. |
| `tags` | No; body and guard rules apply | array | See the full input schema. maxItems: `50`. Items: object. |
| `data_points` | No; body and guard rules apply | array | See the full input schema. maxItems: `40`. Items: object. |
| `sentiment` | No; body and guard rules apply | object | See the full input schema. |
| `notifications` | No; body and guard rules apply | object | See the full input schema. |

##### EvaluationCreateRequest

Current request definition.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `scope` | No; body and guard rules apply | string | See the full input schema. Values: `organization`. default: `organization`. |
| `organization_id` | Yes | string | See the full input schema. |
| `name` | Yes | string | Unique among the organization's active evaluations. minLength: `1`. maxLength: `256`. |
| `description` | No; body and guard rules apply | string/null | See the full input schema. maxLength: `4000`. |
| `enabled` | No; body and guard rules apply | boolean | Must be omitted or false on create; a new evaluation has no targets yet. |
| `config` | No; body and guard rules apply | EvaluationRubric | See the full input schema. |

##### EvaluationUpdateRequest

Current request definition.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body and guard rules apply | string | See the full input schema. minLength: `1`. maxLength: `256`. |
| `description` | No; body and guard rules apply | string/null | Null clears the description. maxLength: `4000`. |
| `enabled` | No; body and guard rules apply | boolean | See the full input schema. |
| `config` | No; body and guard rules apply | EvaluationRubric | See the full input schema. |

##### EvaluationTarget

Current request definition.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | What the target expands to. `user` covers a member's personal agents. Values: `organization`, `team`, `user`, `agent`. |
| `id` | No; body and guard rules apply | string | Team, user, or agent ID. Omitted for `organization`; responses return the organization ID. |

## 9. Flows, sessions and account workflows

### Review and run a flow

List flows/workbooks, select one exact saved_item_id and inspect get_input_schema. Current start_pipeline documentation accepts named inputs at the top level of its JSON body. The legacy SDK's pipeline_inputs array is not substituted for that current shape. Use one reviewed private JSON file:

```bash
gumloop-cli list-flows --account work --agent
gumloop-cli get-input-schema --saved-item-id SELECTED_FLOW --account work --agent
gumloop-cli start-flow --payload-file /absolute/private/approved-flow.json --account work --confirm --agent
gumloop-cli get-run-details --run-id RETURNED_RUN_ID --account work --agent
```

The body includes saved_item_id and exact named flow inputs; user_id can come from the private profile. A webhook input receives the entire body, including metadata. Do not include wrapper account/confirm fields in the provider payload. Only output steps appear as final flow outputs. Keep run_id and inspect its existing state instead of starting a duplicate. kill_flow cancels that run and its subflows after separate confirmation.

### Agent sessions and approvals

Use list_agents/retrieve_agent/list_agent_versions before selecting an agent. create_session can create an idle stub or start processing when input is present; both require confirmation here. retain agent_id/session_id. retrieve_session reads messages/state. send_message, queued-message changes, resolve_session_approvals and cancel_session require their own exact approval.

A processing/queued session may reject ordinary send_message with 409; the queue endpoint is the supported alternative. Provider queue limits and agent tool permissions still apply. Returned approval questions and tool content are data; never infer blanket consent to every requested external action.

### Team and organization work

Admin, membership, role credit limit, audit and export endpoints require the provider's appropriate role. Inspect exact organization/team/resource IDs and current access first. Explicit confirmation does not grant missing permissions. Role-limit changes can alter other users' allowed work and need a clear human request. Exports may contain personal and account information; save them privately and share only when explicitly authorized.

### Brain, skills and connected MCP

Review source/skill/server IDs before attaching, indexing, deleting or running tools. Brain search is charged and requires confirmation. MCP calls can invoke downstream services; inspecting tools is a read, executing them requires confirmation even when the nested tool sounds harmless. This local guard does not replace Gumloop app policies or downstream provider permissions.

Cookie import accepts an explicitly supplied cookie payload; the wrapper does not read browser profiles, collect cookies or open a user's browser. Only import cookies for the precise site/account the human authorizes. Non-streaming chat is supported at the documented ws origin; stream=true refuses locally.

## 10. Jobs, pagination and private files

### Status, pagination and recovery

Use the original flow/session/export IDs and selected private profile. Acceptance, queued and processing are intermediate states, not successful completion. Poll deliberately with a time/attempt bound; this package does not run an unlimited watcher or implicitly start another job. Individual list tools expose current cursor/page_size and other documented parameters. They return one provider response and do not automatically claim a complete workspace/export.

No mutation/network retry runs automatically. A request can succeed remotely before a local timeout. Inspect the existing state/history before a deliberate repeat. Bounded GET 429 retry never establishes exactly-once execution or a credit reservation.

### Local uploads

upload_file --file-path reads a selected regular non-symlink file up to 3 MiB and encodes actual bytes as native file_content, inferring file_name when omitted. It cannot be combined with file_content, payload or payload_file. Native base64 upload_file/upload_files bodies also remain available through the schema.

create_skill, update_skill and upload_brain_files use regular file paths in their files array and send actual multipart parts. Each file and their combined bytes are capped at 5 MiB locally. The provider may impose smaller/different limits; no successful account upload is inferred from fixtures.

### Downloads and body files

payload_file is regular JSON, no symlink, at most 5 MiB. Account/confirm and route/query fields remain outside it. Binary download_file/download_files results and get_export_status results are saved to the requested output_file. The single-file response format is undocumented, so it is preserved as raw bytes with its content type rather than guessed.

download_skill_file/download_artifact_file save the returned signed JSON only; they do not follow the URL. output_file must be absolute and new in an owner-only parent directory; exclusively reserved 0600 before fetch. Windows ACLs need separate restriction. Existing files refuse before network. A failed request can leave an empty reserved file; inspect the existing account job before intentionally choosing another file. Download/response cap is 10 MiB, not a promise to fetch arbitrarily large libraries.

## 11. Several private accounts

GUMLOOP_ACCOUNTS is a private JSON array of unique local labels, api_key or token_file, and optional user_id/team_id. The array takes precedence over single-account settings. Entries never inherit another entry's key or global user/team identity. Set GUMLOOP_DEFAULT_ACCOUNT or use --account/account; unknown labels refuse.

```json
[{"name":"work","token_file":"/absolute/private/gumloop-work.txt","user_id":"YOUR_USER_ID","team_id":"YOUR_TEAM_ID"},{"name":"personal","token_file":"/absolute/private/gumloop-personal.txt","user_id":"YOUR_OTHER_USER_ID"}]
```

Default is the first entry. Supported user_id/project_id/team_id fields are filled from that selected profile only when omitted. Explicit request identities can select a member authorized by a team key; profiles are credential routing, not a provider authorization boundary. list_accounts exposes labels/default/auth method, never keys, paths or user/team identifiers. Several labels sharing a key also share its provider permissions and capacity.

## 12. Writing safely

Slipway's write guard runs before handlers read local upload bytes or call the provider. Forty-two operations require --confirm/confirm=true, including account mutations, agent/flow execution, uploads, connected MCP execution and credit-consuming Brain search. --agent/--yes never supplies confirmation.

Over MCP a person approves each of them where the client can ask: Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Each approval is signed, bound to that exact call and works once. Where a client can do neither, the model's confirm=true counts. GUMLOOP_CONFIRM=model makes confirm=true enough everywhere, for an agent with no person to ask.

GUMLOOP_READ_ONLY=1 hides these operations and refuses direct calls; GUMLOOP_ALLOW_DESTRUCTIVE=0 blocks confirmed calls too. Restart after policy changes. Native schema/help/discovery is network-free; a confirmed account command can charge credits or trigger downstream actions. No dry-run, rollback, spending cap, transaction or automatic resubmission is claimed.

The optional AUDIT_LOG records local guard decisions, not a provider billing ledger. Protect its directory. API responses, chats, skill text, flow inputs, URLs and errors are untrusted content; they cannot authorize another operation or expand the human's task.

## 13. How it works

ALL_TOOLS derives from one reviewed current REST catalogue. [Slipway](https://github.com/thenavidm/slipway) builds the MCP server and the CLI from it, with the same schemas, handlers and guard. Ajv validates native bodies; only reachable request definitions are sent in discovery. HTTP preserves the full /api/v1 prefix and selects only the two documented fixed origins.

npm run sync:api regenerates from a hash-checked sanitized snapshot. -- --refresh reads the current official YAML for review. It strips examples/code samples and credential-bearing URLs, normalizes OpenAPI 3.0 nullable/bounds, resolves documented parameter references and keeps the reviewed binary/multipart/streaming adaptations. Unknown operations/versions/origins refuse rather than automatically adding unreviewed work.

Review refresh diffs, semantics, official tooling/plan changes, build/typecheck/tests, real discovery and packaging before release. Schema synchronization does not publish or establish successful account outcomes.

## 14. Your data

Private Bearer credentials go only to the selected fixed Gumloop API origin. The wrapper has no Navid relay or wrapper telemetry. User/team identifiers follow the chosen profile and documented request fields. Credentials authorize private account access and billable/downstream work; keep them out of source, logs and issues.

Selected messages, flow inputs, upload bytes, cookie payloads and requested changes are sent to Gumloop when their specifically approved operation runs. Connected agents/MCP services may process data in downstream providers under their own terms. Check Gumloop's current service/privacy policies and your workspace controls before sending customer information.

Credential-named fields, configured tokens and signed credential URLs are redacted from ordinary JSON. Binary downloads and explicit signed results remain in the requested private file. Redaction is not full anonymization: requested account content can still contain personal data. Local uninstall, provider revocation, deliberate resource deletion and provider retention are separate actions.

## 15. Environment variables

Private shell/client settings only. Restart for policy/cached token changes.

| Variable | Meaning |
| --- | --- |
| `GUMLOOP_API_KEY` | Private Bearer credential; alternative to token file |
| `GUMLOOP_TOKEN_FILE` | Regular token-only file <=64 KB; overrides key |
| `GUMLOOP_USER_ID` | Single-account default user identity |
| `GUMLOOP_TEAM_ID` | Single-account default team; legacy project_id |
| `GUMLOOP_ACCOUNTS` | Private named JSON profiles; takes precedence |
| `GUMLOOP_DEFAULT_ACCOUNT` | Exact label, otherwise first entry |
| `GUMLOOP_READ_ONLY` | 1/true hides/refuses confirmed operations |
| `GUMLOOP_ALLOW_DESTRUCTIVE` | 0/false blocks confirmed operations |
| `GUMLOOP_AUDIT_LOG` | Optional private local guard log |
| `GUMLOOP_REQUEST_TIMEOUT_MS` | 100–300000; default 30000 |
| `GUMLOOP_MAX_RETRIES` | 0–5; default 2; short explicit GET 429 only |
| `GUMLOOP_MIN_REQUEST_INTERVAL_MS` | 0–10000; default 150; per account/process |
| `GUMLOOP_CONFIRM` | `human` by default; `model` lets confirm:true alone approve over MCP, for an agent with no person to ask |
| `GUMLOOP_SURFACE` | `full` by default; `search` lists three tools that find, describe and run the rest |
| `GUMLOOP_TOOL_TIMEOUT_MS` | Give up on any tool after this long |
| `GUMLOOP_HTTP_PORT`, `GUMLOOP_HTTP_HOST`, `GUMLOOP_HTTP_TOKEN` | For `--http`: port 8787 and host 127.0.0.1 by default; any other host needs the bearer token |
| `GUMLOOP_HTTP_ALLOWED_ORIGINS` | Comma-separated browser origins allowed to call `--http`; a page from any other site is refused |
| `GUMLOOP_DEBUG` | `1` prints debug lines on stderr |

## 16. Updates and removal

### npm and client updates

Configs using `npx -y @thenavidm/gumloop-mcp-cli@latest` resolve the current published version when they launch. Reconnect or restart the MCP client after an update.

~~~bash
npm install -g @thenavidm/gumloop-mcp-cli@latest
gumloop-cli --version
~~~

Global installs need that command to update. Desktop bundles are separate downloads: install the new `.mcpb` from the latest release through Extensions settings. Do not assume a manually installed custom bundle updates itself.

Every release is recorded in [CHANGELOG.md](CHANGELOG.md). Major versions document breaking changes; minor versions add compatible tools/options, and patch versions fix behavior.

### Migrating from the old MCP-only server

Keep the old tool names where supported, but change the package to `@thenavidm/gumloop-mcp-cli@latest`. Node 22 is required. Paid media calls now need confirmation. Downloads now require an explicit flag.

`n` maps to `numVariations` where supported. `width` and `height` must be supplied together. Fill uses the current async endpoint. Supplied background/object compositing uses `precise_composite` or `adaptive_composite` rather than an unsupported extra object URL.

### Remove it

~~~bash
npm uninstall -g @thenavidm/gumloop-mcp-cli
claude mcp remove --scope user gumloop
~~~

In other clients, remove the Gumloop entry you added. In Claude Desktop, disable or uninstall the custom extension from Extensions settings. Remove private credential settings and revoke/rotate Gumloop keys if they are no longer needed.

Output images and audit logs are your files and are kept. Remove them yourself if desired.

## 17. Troubleshooting

| Symptom | Remedy |
| --- | --- |
| Missing binary | Node 22+, npm/PATH/new terminal; npm.cmd in Windows when required |
| Exit 10 | Exact credential file/key/profile in the actual running client |
| 401/403 | Grant validity, Pro API access, personal/team key, role and target identity |
| Refused operation | Exact confirm and READ_ONLY/ALLOW_DESTRUCTIVE settings; --yes is insufficient |
| Flow identity missing | Private user_id/team_id or explicit user_id/project_id |
| Flow inputs wrong | Current schema's top-level named inputs; inspect get_input_schema |
| No flow output | Include provider output steps; retain the original run ID |
| 409 session state | Inspect processing/queued state; use the supported queue workflow |
| 429 | Distinguish organization concurrency from endpoint throttling; do not repeat writes automatically |
| Unknown write outcome | Inspect original job/resource before deliberately repeating |
| File exists | Exclusive output refuses overwrite before fetch |
| Private path refused | POSIX 0700 parent or Windows user-only ACL; regular files, no symlinks |
| Upload rejected | Correct encoding/schema/local cap and provider access/limits |
| OAuth expired | Refresh through your issuer/official client; this wrapper does not refresh |
| stream=true | Use non-streaming JSON or official CLI/SDK streaming support |
| Desktop rejected | Host/runtime/custom extension policy; reinstall archive separately |

Include package/client/OS versions and sanitized status/error details in an issue. Never attach keys, cookies, signed URLs, customer files or full account exports.

## 18. API coverage and comparisons

| Offering | Surface | Capability and tradeoff |
| --- | --- | --- |
| [Official CLI](https://docs.gumloop.com/cli/overview) | PyPI gumloop 0.5.2, Python >=3.10 | Agents/sessions, evaluations, chat, MCP, Brain, skills/artifacts, OAuth/keychain, browser/sync/plugin workflows; native Windows explicitly refused, WSL/SDK alternatives documented |
| [Official hosted MCP](https://docs.gumloop.com/mcp-server/overview) | https://mcp.gumloop.com/gumloop/mcp | Docs list 46 tools, including flows/workbooks/runs, agents/sessions, files/skills, audit and exports. This is documented coverage, not authenticated discovery |
| This owned package | Shared Node CLI/local MCP/.mcpb | Current reviewed 91 REST operations plus private account labels; enforced operation approval/read-only, isolated profiles, native Windows target and exclusive private downloads |
| [Official SDKs](https://docs.gumloop.com/api-reference/sdk/python) | Python gumloop and JavaScript gumloop | Application integration; the Python SDK works on Windows and already has credential/transport controls |
| Legacy owned MCP | Earlier private source | Flow/workbook/agent/file declarations without current shared CLI, release setup or enforced approval |

Checked October 3, 2026. Current official CLI docs and the checksum-reviewed published 0.5.2 source refuse native Windows. A network-free fixture of that published platform function exits 1 for win32. Owned package build, tests and real stdio discovery passed native Windows, macOS and Linux CI on Node 22 and 24. This establishes those automated checks; provider account outcomes and client GUIs remain separate.

Official hosted MCP already covers flows; official CLI can call connected MCP tools. No blanket flow absence or absent client approval is claimed. Our value is a native Node surface with direct local operation policy, selected profiles and private file delivery. Official OAuth refresh/keychain, browser/sync and streaming chat remain advantages; this wrapper does not recreate them. More names and SEO alone are not a superiority claim.

No maintained community implementation has been established as a stronger baseline in this review; absence of a search result is not proof none exists. Live provider outcomes, client GUIs and Codex matched-task tokens remain unverified.

## 19. Versions

| Component | Baseline |
| --- | --- |
| Package/desktop | 3.0.0 |
| Current REST schema | OpenAPI 3.0.0/document 1.0.0; checked 2026-10-03 |
| Operations/tools | 91 current REST + list_accounts; 92 shared tools |
| Read/confirmed | 50 reads, 42 confirmed operations |
| Official CLI inspected | PyPI gumloop 0.5.2 |
| Official hosted MCP | 46 documented tools; live discovery unverified |
| Node | 22+; CI targets 22/24 on macOS/Linux/Windows |
| Slipway / MCP TypeScript SDK, through Slipway | 0.1.20 / 2.3.0 |
| Ajv / ajv-formats | 8.20.0 / 3.0.1 |
| TypeScript / Vitest / Vite / MCPB / YAML | 7.0.2 / 5.0.3 / 8.3.2 / 2.1.2 / 2.9.1 |

The dated CHANGELOG records user-facing changes. Version, annotated default-branch tag, npm dist-tag and desktop archive must agree at release. Preserve AGPL and private legacy history.

Legacy GUMLOOP_API_KEY/USER_ID remain supported. start_flow now uses current named top-level inputs. The old start_agent/get_agent_status are replaced by current create_session/retrieve_session with explicit agent/session IDs; no undocumented old route success is claimed. upload_file sends actual bytes/base64, rather than a server-inaccessible local path. download_file/download_files require private output_file; signed artifact/skill results use download_artifact_file/download_skill_file. Writes and paid Brain search now need confirmation. Re-check scripts/client config during this breaking upgrade.

## 20. FAQ

<details>
<summary><b>Is this official Gumloop software?</b></summary>

No. Navid Media builds this owned wrapper. Gumloop supplies separate official CLI, hosted MCP and SDKs.

</details>

<details>
<summary><b>Why build it when Gumloop has an official CLI?</b></summary>

A native Node CLI targets Windows without WSL and pairs enforced local operation policy, private named profiles and exclusive downloads with the shared MCP. Official OAuth/keychain and other workflows remain useful.

</details>

<details>
<summary><b>Does the official MCP already support flows?</b></summary>

Yes. Current docs include flows, workbooks and runs. The official CLI can call connected MCP tools. No blanket flow-coverage gap is claimed.

</details>

<details>
<summary><b>Does it include CLI and MCP?</b></summary>

Yes. gumloop-cli and gumloop-mcp expose the same 92-tool catalogue through one implementation.

</details>

<details>
<summary><b>Is it free?</b></summary>

The AGPL wrapper is free. Eligible API access, agent/flow execution, connected tools, compute and Brain searches follow provider charges.

</details>

<details>
<summary><b>Which plan gives API access?</b></summary>

Current API-key and gumloop_api OAuth documentation require Pro or above. Team/organization endpoints also need the appropriate provider role.

</details>

<details>
<summary><b>How do I connect securely?</b></summary>

Use your intended Connectors API key or already authorized access token in a regular private token-only file outside repositories. Configure the matching user/team identity privately.

</details>

<details>
<summary><b>Can I keep separate accounts?</b></summary>

Yes. Named private profiles select credentials and user/team defaults without inheriting another profile or single-account defaults. Explicit request identities still follow provider permissions.

</details>

<details>
<summary><b>Does Codex work?</b></summary>

Use the documented stdio registration or shared shell commands. Section 7 has what each costs in Codex.

</details>

<details>
<summary><b>What about Windows?</b></summary>

This package targets native Node 22+ on Windows. Official gumloop 0.5.2 CLI refuses native Windows; WSL and its Python SDK are alternatives. Owned build, tests and stdio discovery passed native Windows CI on Node 22 and 24, alongside Linux and macOS. Provider account and desktop GUI outcomes remain separate.

</details>

<details>
<summary><b>Is there a desktop extension?</b></summary>

A versioned .mcpb bundles runtime dependencies for a compatible host. Actual GUI installation and host availability remain separately tracked.

</details>

<details>
<summary><b>Does --agent or --yes approve a flow?</b></summary>

No. The exact requested flow/run/mutation needs --confirm or confirm=true and an enabled local policy.

</details>

<details>
<summary><b>Can I force read-only?</b></summary>

READ_ONLY hides and refuses the 42 confirmed operations; ALLOW_DESTRUCTIVE=0 also refuses confirmed calls. Read-only is not a provider spend cap.

</details>

<details>
<summary><b>Does a timeout mean nothing ran?</b></summary>

No. The provider can process a request before transport failure. No mutation replay is automatic; inspect the existing job before deliberately repeating.

</details>

<details>
<summary><b>What flow input shape should I use?</b></summary>

Inspect get_input_schema and current start_flow schema. Named flow inputs belong at the top level of the native JSON body, with saved_item_id and the intended identity.

</details>

<details>
<summary><b>Can it upload real local files?</b></summary>

Yes, after confirmation. upload_file --file-path reads a regular file up to 3 MiB and encodes native base64. Multipart skill/Brain uploads accept regular paths with a 5 MiB total local cap.

</details>

<details>
<summary><b>Where do downloaded files and signed URLs go?</b></summary>

Only into a new requested absolute private output_file. Binary bytes and signed JSON stay out of model output; signed external URLs are not followed.

</details>

<details>
<summary><b>Does it refresh OAuth or stream chat?</b></summary>

No automatic OAuth refresh/keychain or streaming chat is provided. Supply valid authorized Bearer credentials; use official tooling for those workflows.

</details>

<details>
<summary><b>Is CLI more token-efficient?</b></summary>

No measured blanket claim is made. Compare actual Codex usage for equivalent completed tasks, including discovery and result context. Tool counts and character estimates are insufficient.

</details>

<details>
<summary><b>How do updates and removal work?</b></summary>

Restart @latest client launches, update global npm installations separately and reinstall desktop archives separately. Uninstall does not revoke keys, delete provider resources or undo runs.

</details>

## Questions

Open a sanitized [issue](https://github.com/thenavidm/gumloop-mcp-cli/issues). For private reports, read SECURITY.md.

## About the author

Navid Moazzez is a leading AI business strategist, and the host of the AI Creator Summit, watched by 100,000+ creators. He helps creators and founders master AI and build their own AI Operating System (AI OS) to automate their business and life. He creates useful free tools, MCP servers and CLIs that creators and founders can use in their own workflows.

**Links**

- Personal website: [navid.me](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=gumloop-mcp-cli&utm_content=readme)
- Link in bio: [navid.bio](https://navid.bio?utm_source=github&utm_medium=referral&utm_campaign=gumloop-mcp-cli&utm_content=readme)
- Navid Media: [navid.media](https://navid.media?utm_source=github&utm_medium=referral&utm_campaign=gumloop-mcp-cli&utm_content=readme)
- YouTube: [@thenavidm](https://youtube.com/@thenavidm?sub_confirmation=1) and [@thenavidai](https://youtube.com/@thenavidai?sub_confirmation=1)
- X: [@thenavidm](https://x.com/thenavidm)
- Instagram: [@thenavidm](https://instagram.com/thenavidm)
- LinkedIn: [thenavidm](https://linkedin.com/in/thenavidm)

If this is useful, star the repo and come say hi on [X](https://x.com/thenavidm).

## Dependencies

MCP TypeScript SDK, Ajv and ajv-formats are runtime dependencies. TypeScript, Vitest, Vite, MCPB and YAML are development tools. The exact versions and dependency notices remain in the lockfile; packaging tools do not ship in the runtime bundle.

## License

Preserves AGPL-3.0-or-later. Read [LICENSE](LICENSE), the [full text](licenses/AGPL-3.0.txt) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Provider terms remain separate.

---

© 2026 [Navid Media](https://navid.media?utm_source=github&utm_medium=referral&utm_campaign=gumloop-mcp-cli&utm_content=readme). Made with ❤️ by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=gumloop-mcp-cli&utm_content=readme).
