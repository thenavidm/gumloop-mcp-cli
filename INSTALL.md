# Install Gumloop MCP Server & CLI

One npm package includes both binaries and all **92 tools**. Requires Node.js 22 or newer for CLI/manual MCP installs. Discovery works before account authentication. Account operations need eligible Gumloop API access; Flow/session execution, Brain search and provider account terms apply.

| Route | Program | Use |
| --- | --- | --- |
| Terminal | gumloop-cli | Scripts and agents with a shell |
| Local MCP | gumloop-mcp | AI clients supporting stdio |
| Desktop archive | gumloop-3.0.0.mcpb | Compatible Claude Desktop custom extensions |
| Gumloop-hosted alternative | https://mcp.gumloop.com/gumloop/mcp | Official remote OAuth/API-key access |

## Contents

[Requirements](#requirements) · [CLI](#cli) · [Private account setup](#private-account-setup) · [Claude Code](#claude-code) · [Codex](#codex) · [Claude Desktop](#claude-desktop) · [Cursor](#cursor) · [VS Code and Copilot](#vs-code-and-copilot) · [Windsurf](#windsurf) · [Zed](#zed) · [Gemini CLI](#gemini-cli) · [Docker](#docker) · [Verify](#verify) · [Multiple accounts](#multiple-accounts) · [Updates and removal](#updates-and-removal) · [Troubleshooting](#troubleshooting) · [Development](#development)

## Requirements

Install Node from [nodejs.org](https://nodejs.org/en/download). Open a new terminal and check `node --version` and `npm --version`. The desktop host needs a compatible Node runtime; dependencies are bundled. A GUI app may not inherit your terminal's environment. Check your account's current API access and balance with Gumloop instead of assuming npm installation provides it.

## CLI

On macOS/Linux, use Terminal. On Windows, use PowerShell or Command Prompt:

```bash
npm install -g @thenavidm/gumloop-mcp-cli@latest
gumloop-cli --version
gumloop-cli
gumloop-cli list-agents --help
gumloop-cli schema start-flow
gumloop-cli login
```

If PowerShell blocks npm.ps1, use npm.cmd or Command Prompt according to your policy. If a binary is missing, check `npm prefix -g`, ensure its executable directory is on PATH and open a new terminal. Avoid sudo as a workaround for PATH problems.

For one command without a global install:

```bash
npx -y --package @thenavidm/gumloop-mcp-cli@latest gumloop-cli tools
```

Make [SKILL.md](./SKILL.md) available in your agent's supported skill location. The installed file is `<npm root -g>/@thenavidm/gumloop-mcp-cli/SKILL.md`. npm does not automatically register client skills. Your agent should read the actual schema and use --agent/--select for compact output.

## Private account setup

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


```bash
export GUMLOOP_TOKEN_FILE='/absolute/private/gumloop.txt'
export GUMLOOP_USER_ID='YOUR_USER_ID'
gumloop-cli doctor --network
```

```powershell
$env:GUMLOOP_TOKEN_FILE = 'C:\Users\YOUR_USER\Private\gumloop.txt'
$env:GUMLOOP_USER_ID = 'YOUR_USER_ID'
gumloop-cli doctor --network
```

### Agent-guided installation

> Help me install Gumloop MCP Server & CLI with INSTALL.md. Check Node and the binary, let me configure my account credentials privately, then run discovery and doctor --network. Do not start flows or mutate accounts during setup.

## Codex

Codex is the current validation priority. Private token paths must exist in the process or remote environment where the server runs.

~~~bash
codex mcp add gumloop -- npx -y @thenavidm/gumloop-mcp-cli@latest
codex mcp list
~~~

Account credentials must reach the server through private environment settings. `codex mcp add --env NAME=value` stores values in your local config, so never commit that config or put secrets in a shared command. In TOML, the equivalent server is:

~~~toml
[mcp_servers.gumloop]
command = "npx"
args = ["-y", "@thenavidm/gumloop-mcp-cli@latest"]
env_vars = ["GUMLOOP_API_KEY", "GUMLOOP_TOKEN_FILE", "GUMLOOP_ACCOUNTS", "GUMLOOP_DEFAULT_ACCOUNT", "GUMLOOP_READ_ONLY", "GUMLOOP_ALLOW_DESTRUCTIVE", "GUMLOOP_USER_ID", "GUMLOOP_TEAM_ID"]
~~~

`env_vars` forwards those names from the environment available to Codex. If that environment does not contain them, configure private env settings locally. Codex can also call the CLI directly with SKILL.md and `--agent` output.

## Claude Code

For a user-scoped connection, after privately configuring credentials:

~~~bash
claude mcp add --scope user gumloop -- npx -y @thenavidm/gumloop-mcp-cli@latest
claude mcp list
~~~

Use the client's private local environment settings for the account variable if they are not inherited. Claude's `-e NAME=value` registration option writes values into its config; only use it locally through your secret manager, with no shared command transcript. Never place credentials in a project .mcp.json. Reconnect and ask Claude to verify credentials.

Alternatively install the CLI, make SKILL.md available to Claude, and use shell commands. Registering both surfaces is optional.

## Claude Desktop

### Install the .mcpb extension

1. Download `gumloop-3.0.0.mcpb` from [GitHub Releases](https://github.com/thenavidm/gumloop-mcp-cli/releases/latest).
2. In a supported Claude Desktop build, open **Settings > Extensions > Advanced settings > Install Extension…** and select it.
3. Enter a private API key in the sensitive setting, or an absolute private token-file path. Leave the unused credential method empty. Requests use Authorization: Bearer, with the configured user ID in x-auth-key when supplied. Enter the intended user ID and optional team ID in the private extension settings.
4. Enable read-only if you want only the 50 read operations. Reconnect and ask for account verification.

The bundle includes production dependencies and no credentials. Use a regular private token-only file if you prefer file-based credentials. The manifest requires Node 22 or newer from a compatible host. Organization policy may restrict custom extensions. Manual bundle updates require installing the new version; no automatic directory updates are promised. GUI installation remains unverified separately from archive/protocol checks.

### Manual config

Open **Settings > Developer > Edit Config**, or use your platform's config file:

| OS | Typical config path |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json`; confirm the location through Edit Config in your installed build |

~~~json
{
  "mcpServers": {
    "gumloop": {
      "command": "npx",
      "args": ["-y", "@thenavidm/gumloop-mcp-cli@latest"],
      "env": {
        "GUMLOOP_API_KEY": "YOUR_PRIVATE_API_KEY",
        "GUMLOOP_TOKEN_FILE": "",
        "GUMLOOP_USER_ID": "YOUR_USER_ID",
        "GUMLOOP_TEAM_ID": ""
      }
    }
  }
}
~~~

Replace the placeholders only in your private file. Merge the server entry into an existing mcpServers object instead of replacing other integrations. Fully quit and reopen Claude Desktop. Do not enable an extension and a manual entry with the same name; choose one route.

If a Windows launcher cannot execute npx directly, use `"command": "cmd"` with `"args": ["/c", "npx", "-y", "@thenavidm/gumloop-mcp-cli@latest"]`. An absolute node executable and installed `dist/index.js` path also avoids launcher/PATH problems.

## Cursor

Use private user settings at `~/.cursor/mcp.json`, or **Settings > Tools & MCP**. [Cursor documents environment interpolation and envFile support](https://cursor.com/docs/mcp).

~~~json
{
  "mcpServers": {
    "gumloop": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/gumloop-mcp-cli@latest"],
      "env": {
        "GUMLOOP_API_KEY": "${env:GUMLOOP_API_KEY}",
        "GUMLOOP_TOKEN_FILE": "${env:GUMLOOP_TOKEN_FILE}",
        "GUMLOOP_USER_ID": "${env:GUMLOOP_USER_ID}",
        "GUMLOOP_TEAM_ID": "${env:GUMLOOP_TEAM_ID}"
      }
    }
  }
}
~~~

The environment values must exist for the Cursor process. If you use envFile, keep that file private and outside version control. A project's .cursor/mcp.json must not contain actual credentials. Reconnect the server after saving.

## VS Code and Copilot

Use **MCP: Open User Configuration**. [VS Code uses servers and secure inputs](https://code.visualstudio.com/docs/agent-customization/mcp-servers), rather than a mcpServers root:

~~~json
{
  "inputs": [
    {"type": "promptString", "id": "gumloop-api-key", "description": "Gumloop API key (leave empty for a private token file)", "password": true},
    {"type": "promptString", "id": "gumloop-token-file", "description": "Optional private token-file path (leave empty for API key)"},
    {"type": "promptString", "id": "gumloop-user-id", "description": "Gumloop user ID from your private profile"},
    {"type": "promptString", "id": "gumloop-team-id", "description": "Optional Gumloop team ID (leave empty for personal access)"}
  ],
  "servers": {
    "gumloop": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/gumloop-mcp-cli@latest"],
      "env": {
        "GUMLOOP_API_KEY": "${input:gumloop-api-key}",
        "GUMLOOP_TOKEN_FILE": "${input:gumloop-token-file}",
        "GUMLOOP_USER_ID": "${input:gumloop-user-id}",
        "GUMLOOP_TEAM_ID": "${input:gumloop-team-id}"
      }
    }
  }
}
~~~

Start Gumloop through the MCP controls, approve trust if prompted, and enter credentials in the private input prompts. Workspace .vscode/mcp.json may contain this placeholder-only structure, but never resolved secret values. Remote development runs the server in the selected remote environment, so local file paths refer to that environment.

## Windsurf

Open Cascade's MCP settings or edit the private user file `~/.codeium/windsurf/mcp_config.json`. Use the Claude Desktop manual mcpServers block above with your locally configured env values. See [Windsurf's current MCP documentation](https://docs.devin.ai/desktop/cascade/mcp). Restart or reconnect Gumloop in Cascade; project files must not contain secrets.

## Zed

Open **Settings > AI > MCP Servers > Add Server > Add Local Server**, or your user settings file. [Zed uses context_servers](https://zed.dev/docs/ai/mcp):

~~~json
{
  "context_servers": {
    "gumloop": {
      "command": "npx",
      "args": ["-y", "@thenavidm/gumloop-mcp-cli@latest"],
      "env": {
        "GUMLOOP_API_KEY": "YOUR_PRIVATE_API_KEY",
        "GUMLOOP_TOKEN_FILE": "",
        "GUMLOOP_USER_ID": "YOUR_USER_ID",
        "GUMLOOP_TEAM_ID": ""
      }
    }
  }
}
~~~

Enter actual values only in private user settings. Check the active-server indicator before prompting. Do not wrap command and args inside a nested command object from older Zed examples.

## Gemini CLI

Merge the Claude Desktop manual mcpServers block into your private `~/.gemini/settings.json`. Configure the private credential values locally, then restart Gemini CLI and inspect `/mcp`. See [Gemini CLI's MCP configuration](https://geminicli.com/docs/tools/mcp-server/). Its project settings must not contain real credentials. You can instead use the CLI from an agent shell.

Other local stdio clients use the same command and arguments, adapted to their config format. A client that only accepts a remote MCP URL cannot connect directly: this package does not ship a public HTTP listener. ChatGPT's remote connector setup is not a substitute for local stdio installation.

## Docker

Build locally from the reviewed source; no prebuilt registry image is claimed:

```bash
git clone https://github.com/thenavidm/gumloop-mcp-cli.git
cd gumloop-mcp-cli
docker build -t gumloop-mcp-cli .
docker run --rm -i -e GUMLOOP_API_KEY gumloop-mcp-cli
```


## Cline and other local MCP clients

Use the client's **Add MCP server** flow with command `npx`, arguments `-y` and `@thenavidm/gumloop-mcp-cli@latest`, stdio transport, and private local GUMLOOP_API_KEY or GUMLOOP_TOKEN_FILE settings. UI names depend on the installed client. Reconnect and discover tools before an account call. Browser-only clients need a remote HTTPS connector; use Gumloop's official server rather than this local stdio command.

## Verify

```bash
gumloop-cli doctor
gumloop-cli doctor --network
gumloop-cli tools
gumloop-cli schema list-flows
gumloop-cli list-accounts --agent
```

The full server discovers 92 tools; read-only discovers 50. Help/schemas/list_accounts are local. The network doctor reads accessible agents without returning account details. A successful account read does not prove every flow/session or account operation.

To try read-only, privately set GUMLOOP_READ_ONLY=1, restart/reconnect and inspect discovery. All 42 confirmed operations must disappear and direct mutation calls must refuse. Remove/disable the setting and reconnect only when you need approved operations. `GUMLOOP_ALLOW_DESTRUCTIVE=0` separately blocks all 42 confirmed operations even when confirmed.

## Multiple accounts

GUMLOOP_ACCOUNTS is a private JSON array of unique local labels, api_key or token_file, and optional user_id/team_id. The array takes precedence over single-account settings. Entries never inherit another entry's key or global user/team identity. Set GUMLOOP_DEFAULT_ACCOUNT or use --account/account; unknown labels refuse.

```json
[{"name":"work","token_file":"/absolute/private/gumloop-work.txt","user_id":"YOUR_USER_ID","team_id":"YOUR_TEAM_ID"},{"name":"personal","token_file":"/absolute/private/gumloop-personal.txt","user_id":"YOUR_OTHER_USER_ID"}]
```

Default is the first entry. Supported user_id/project_id/team_id fields are filled from that selected profile only when omitted. Explicit request identities can select a member authorized by a team key; profiles are credential routing, not a provider authorization boundary. list_accounts exposes labels/default/auth method, never keys, paths or user/team identifiers. Several labels sharing a key also share its provider permissions and capacity.

## Updates and removal

```bash
npm install -g @thenavidm/gumloop-mcp-cli@latest
gumloop-cli --version
claude mcp remove --scope user gumloop
codex mcp remove gumloop
npm uninstall -g @thenavidm/gumloop-mcp-cli
```

Reinstall a newer desktop archive separately and restart affected clients. Remove manual client entries using its own settings. Uninstalling the package does not revoke Gumloop credentials, remove private token files or undo completed runs or account mutations. Revoke the API key in the provider API Keys area when appropriate. Inspect and remove your private settings and files separately.

Pin a reviewed version instead of @latest if your automation requires reproducibility. Check [CHANGELOG.md](./CHANGELOG.md) and [GitHub Releases](https://github.com/thenavidm/gumloop-mcp-cli/releases) before a major update. Do not roll back by blindly publishing an older version over an existing npm version.

## Troubleshooting

| Problem | Check |
| --- | --- |
| Missing command | Node 22+, global prefix and PATH |
| No configured account | Private GUMLOOP_API_KEY or regular GUMLOOP_TOKEN_FILE |
| GUI authentication fails | Actual private GUI environment; shell env is separate |
| 401/403 | Bearer grant, selected user/team identity, provider role and eligible API access |
| Invalid/null body | schema; use payload/payload_file for null and nested data |
| First page only | Current endpoint cursor from its prior response; no automatic all-pages |
| Guard refusal | User-requested --confirm, read-only and operation settings |
| Mutation timeout | Inspect account before repeating; no automatic mutation retries |
| Desktop host rejects extension | Compatible host/runtime and organization custom-extension policy |

See the README for the complete argument table, safety, 20 FAQs and API snapshot corrections. Secrets must never appear in a troubleshooting transcript.

## Development

```bash
git clone https://github.com/thenavidm/gumloop-mcp-cli.git
cd gumloop-mcp-cli
npm ci
npm run typecheck
npm run build
npm test
npm run check:counts
npm run build:mcpb
```

Source mode: configure private env, then register `node /absolute/path/gumloop-mcp-cli/dist/index.js` as the MCP command. Build before registration and after source changes. No local credentials are packaged. [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) cover contributions, disclosures and licensing.
