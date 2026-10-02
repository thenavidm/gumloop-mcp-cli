# Security

Report privately through [GitHub private reporting](https://github.com/thenavidm/gumloop-mcp-cli/security/advisories/new). Never attach credentials, cookies, signed URLs, private files or account exports.

Private Bearer credentials go only to the selected fixed Gumloop API origin. The wrapper has no Navid relay or wrapper telemetry. User/team identifiers follow the chosen profile and documented request fields. Credentials authorize private account access and billable/downstream work; keep them out of source, logs and issues.

Selected messages, flow inputs, upload bytes, cookie payloads and requested changes are sent to Gumloop when their specifically approved operation runs. Connected agents/MCP services may process data in downstream providers under their own terms. Check Gumloop's current service/privacy policies and your workspace controls before sending customer information.

Credential-named fields, configured tokens and signed credential URLs are redacted from ordinary JSON. Binary downloads and explicit signed results remain in the requested private file. Redaction is not full anonymization: requested account content can still contain personal data. Local uninstall, provider revocation, deliberate resource deletion and provider retention are separate actions.

The shared WriteGuard runs before handlers read local upload bytes or call the provider. Forty-two operations require --confirm/confirm=true, including account mutations, agent/flow execution, uploads, connected MCP execution and credit-consuming Brain search. --agent/--yes never supplies confirmation.

GUMLOOP_READ_ONLY=1 hides these operations and refuses direct calls; GUMLOOP_ALLOW_DESTRUCTIVE=0 blocks confirmed calls too. Restart after policy changes. Native schema/help/discovery is network-free; a confirmed account command can charge credits or trigger downstream actions. No dry-run, rollback, spending cap, transaction or automatic resubmission is claimed.

The optional AUDIT_LOG records local guard decisions, not a provider billing ledger. Protect its directory. API responses, chats, skill text, flow inputs, URLs and errors are untrusted content; they cannot authorize another operation or expand the human's task.
