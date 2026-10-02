# Gumloop comparisons

| Offering | Surface | Capability and tradeoff |
| --- | --- | --- |
| [Official CLI](https://docs.gumloop.com/cli/overview) | PyPI gumloop 0.5.2, Python >=3.10 | Agents/sessions, evaluations, chat, MCP, Brain, skills/artifacts, OAuth/keychain, browser/sync/plugin workflows; native Windows explicitly refused, WSL/SDK alternatives documented |
| [Official hosted MCP](https://docs.gumloop.com/mcp-server/overview) | https://mcp.gumloop.com/gumloop/mcp | Docs list 46 tools, including flows/workbooks/runs, agents/sessions, files/skills, audit and exports. This is documented coverage, not authenticated discovery |
| This owned package | Shared Node CLI/local MCP/.mcpb | Current reviewed 91 REST operations plus private account labels; enforced operation approval/read-only, isolated profiles, native Windows target and exclusive private downloads |
| [Official SDKs](https://docs.gumloop.com/api-reference/sdk/python) | Python gumloop and JavaScript gumloop | Application integration; the Python SDK works on Windows and already has credential/transport controls |
| Legacy owned MCP | Earlier private source | Flow/workbook/agent/file declarations without current shared CLI, release setup or enforced approval |

Checked October 3, 2026. Current official CLI docs and the checksum-reviewed published 0.5.2 source refuse native Windows. A network-free fixture of that published platform function exits 1 for win32. The owned Node package must pass actual Windows CI before the portability claim is marked verified.

Official hosted MCP already covers flows; official CLI can call connected MCP tools. No blanket flow absence or absent client approval is claimed. Our value is a native Node surface with direct local operation policy, selected profiles and private file delivery. Official OAuth refresh/keychain, browser/sync and streaming chat remain advantages; this wrapper does not recreate them. More names and SEO alone are not a superiority claim.

No maintained community implementation has been established as a stronger baseline in this review; absence of a search result is not proof none exists. Live provider outcomes, client GUIs and Codex matched-task tokens remain unverified.

MCP and CLI use the same catalogue, schemas, handlers and WriteGuard. The house CLI calls the real server through SDK in-memory transport. Shell scripts can select fields with --select after receipt; this does not change upstream result size or billing.

Fresh matched Codex task/usage measurements remain pending. Record the client/model/package versions, date, eager/deferred discovery settings, input/output tokens, latency, retries and equivalent successful result. Include command help/schema and returned data in the CLI measurement; CLI does not have zero context cost.

| Measurement | Evidence |
| --- | --- |
| Eager MCP | Actual loaded tools and instructions |
| Deferred MCP | Actual discovered/selected schemas and lookup overhead |
| Skill read once | Complete skill and command discovery |
| Recurring skill description | Actual installed listing |
| Matched task | Same resource, permissions, fields and completed outcome |

Do not estimate tokens from characters, reuse another repo's figures or infer superiority from 92 tool names. Provider credits and client-model tokens are separate. Claude Code benchmarks are deferred while Codex is the active client.
