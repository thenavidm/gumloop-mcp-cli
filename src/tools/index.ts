import operationsData from "./operations.json" with { type: "json" };
import { type ValidateFunction } from "ajv";
import { Ajv2020 } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readFile, lstat, open } from "node:fs/promises";
import { dirname, basename, isAbsolute } from "node:path";
import type { Json, GumloopClient, QueryParam } from "../api/client.js";
import { UsageError } from "../api/errors.js";
import { selectAccount, type Config } from "../config.js";
import type { Risk } from "../safety.js";
export type Operation = {
  name: string;
  title: string;
  description: string;
  method: string;
  path: string;
  group: string;
  risk: Risk;
  params: {
    name: string;
    key: string;
    in: string;
    required?: boolean;
    schema: Json;
    style?: string;
    explode?: boolean;
  }[];
  bodySchema: Json;
  bodyRequired: boolean;
  paginated: boolean;
  origin: "api" | "chat";
  privateResult: boolean;
  binaryResult: boolean;
  contentType: string;
};
export type ToolSpec = {
  name: string;
  title: string;
  description: string;
  group: string;
  inputSchema: Json;
  risk: Risk;
  handler: (args: Json, client: GumloopClient) => Promise<unknown>;
};
const operations = operationsData as unknown as Operation[];
const ajv = new Ajv2020({ allErrors: true, strict: false });
(addFormats as unknown as (a: typeof ajv) => void)(ajv);
function check(validate: ValidateFunction, args: unknown): void {
  if (!validate(args))
    throw new UsageError(ajv.errorsText(validate.errors, { separator: "; " }));
}
function fieldsFor(op: Operation): Json {
  const properties: Json = Object.fromEntries(
    op.params.map((p) => [p.key, p.schema]),
  );
  Object.assign(properties, op.bodySchema.properties ?? {});
  properties.account = {
    type: "string",
    description:
      "Named private Gumloop account; selects private credentials and user/team identity.",
  };
  if (op.risk !== "read")
    properties.confirm = {
      type: "boolean",
      description: "Must be true for this exact requested account change, agent/flow execution, upload or deletion.",
    };
  if (Object.keys(op.bodySchema.properties ?? {}).length) {
    properties.payload = {
      ...op.bodySchema,
      required: (op.bodySchema.required??[]).filter((k:string)=>k!=="user_id"&&k!=="project_id"&&k!=="team_id"),
      description:
        "Complete JSON request body instead of body flags. Preserves current endpoint fields and values.",
    };
    properties.payload_file = {
      type: "string",
      minLength: 1,
      description:
        "Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload.",
    };
  }
  if(op.name === "upload_file") properties.file_path = {type:"string",minLength:1,description:"Regular local file path, no symlink, at most 3 MiB. Encoded as native base64 file_content; cannot mix with file_content or payload routes."};
  if(op.privateResult) properties.output_file = {type:"string",minLength:1,description:"New absolute result file in a private owner-only directory. Private download or signed credential result stays out of model output; no overwrite."};
  return {
    type: "object",
    $defs: op.bodySchema.$defs,
    properties,
    required: [...op.params.filter((p) => p.required && p.key !== "user_id").map((p) => p.key),...(op.privateResult ? ["output_file"] : [])],
    additionalProperties: false,
  };
}
const bodyValidators = new Map(
  operations.map((op) => [op.name, ajv.compile(op.bodySchema)]),
);
async function execute(
  op: Operation,
  args: Json,
  client: GumloopClient,
): Promise<unknown> {
  const account = selectAccount(client.config,args.account);
  const flat = Object.fromEntries(
    Object.keys(op.bodySchema.properties ?? {})
      .filter((k) => args[k] !== undefined)
      .map((k) => [k, args[k]]),
  );
  if (
    (args.payload !== undefined || args.payload_file !== undefined) &&
    Object.keys(flat).length
  )
    throw new UsageError(
      "Use individual body flags or payload/payload_file without mixing them.",
    );
  if (args.payload !== undefined && args.payload_file !== undefined)
    throw new UsageError("Use payload or payload_file, not both.");
  if (op.bodyRequired && !Object.keys(flat).length && args.payload === undefined && args.payload_file === undefined && !(op.name==="upload_file" && args.file_path)) {
    throw new UsageError('This operation requires a JSON body; inspect schema and provide body flags or payload/payload_file.');
  }
  let body: Json = args.payload ?? flat;
  if (args.payload_file)
    try {
      const stat = await lstat(args.payload_file);
      if (!stat.isFile() || stat.size > 5 * 1024 * 1024) throw new Error();
      body = JSON.parse(await readFile(args.payload_file, "utf8"));
    } catch {
      throw new UsageError(
        "payload_file must be a regular JSON body file, at most 5 MB.",
      );
    }
  if(op.name === "upload_file" && args.file_path) {
    if(args.file_content!==undefined || args.payload!==undefined || args.payload_file!==undefined)throw new UsageError("file_path cannot mix with file_content or payload routes.");
    const source = await lstat(args.file_path);if(!source.isFile()||source.size>3*1024*1024)throw new UsageError("file_path must be a regular non-symlink file at most 3 MiB.");
    const bytes = await readFile(args.file_path);if(bytes.length>3*1024*1024)throw new UsageError("file_path exceeds the 3 MiB local cap.");
    body.file_content=bytes.toString("base64");body.file_name??=basename(args.file_path);
  }
  for(const [key,defaultValue]of ([["user_id",account.userId],["project_id",account.teamId],["team_id",account.teamId]] as [string,string][])) {
    if(body[key]===undefined && defaultValue && op.bodySchema.properties?.[key])body[key]=defaultValue;
    if(args[key]===undefined && defaultValue && op.params.some(p=>p.name===key))args={...args,[key]:defaultValue};
  }
  if(Object.keys(op.bodySchema.properties??{}).includes("user_id") && !body.user_id && !body.project_id)throw new UsageError("This legacy flow/file operation needs a private profile user_id or team_id (project_id), or an explicit request identity.");
  if(op.params.some(p=>p.name==="user_id") && !args.user_id && !args.project_id)throw new UsageError("This flow operation needs user_id or project_id, or a matching private profile.");
  if(op.name==="get_run_history" && !args.saved_item_id && !args.workbook_id)throw new UsageError("Provide saved_item_id or workbook_id.");
  check(bodyValidators.get(op.name)!, body);
  let wireBody: Json | FormData = body;
  if(op.contentType === "multipart/form-data") {
    const form = new FormData();let total=0;
    for(const [key,value]of Object.entries(body)) {
      if(key==="files")for(const file of value as string[]) {
        const stat = await lstat(file);if(!stat.isFile()||stat.size>5*1024*1024)throw new UsageError("Upload paths must be regular non-symlink files, each at most 5 MiB.");
        const bytes=await readFile(file);total+=bytes.length;if(total>5*1024*1024)throw new UsageError("Total upload exceeds the 5 MiB local cap.");
        form.append(key,new Blob([new Uint8Array(bytes)]),basename(file));
      } else form.append(key,String(value));
    }
    wireBody=form;
  }
  if (
    ["PUT", "PATCH"].includes(op.method) &&
    Object.keys(op.bodySchema.properties ?? {}).length &&
    !Object.keys(body).length
  )
    throw new UsageError("Provide at least one field to update.");
  const path = op.params
    .filter((p) => p.in === "path")
    .reduce(
      (path, p) =>
        path.replace(`{${p.name}}`, encodeURIComponent(String(args[p.key]))),
      op.path,
    );
  const query: QueryParam[] = op.params
    .filter((p) => p.in === "query" && args[p.key] !== undefined)
    .map((p) => ({
      name: p.name,
      value: args[p.key],
      style: p.style,
      explode: p.explode,
    }));
  const headers = Object.fromEntries(op.params.filter(p=>p.in === "header" && args[p.key] !== undefined).map(p=>[p.name,String(args[p.key])]));
  let output;
  if(op.privateResult) {
    if(!isAbsolute(args.output_file)) throw new UsageError("output_file must be absolute.");
    const parent = await lstat(dirname(args.output_file));
    if(!parent.isDirectory() || (process.platform !== "win32" && (parent.mode & 0o077))) throw new UsageError("Use a private owner-only output directory.");
    output = await open(args.output_file,"wx",0o600);
  }
  try {
    const result = await client.request(op.method,path,query,op.bodyRequired || Object.keys(body).length ? wireBody : undefined,args.account,op.origin,op.contentType,headers,op.binaryResult);
    if(output) { await output.writeFile(op.binaryResult?result.bytes:JSON.stringify(result)+"\n");return {saved:true,output_file:args.output_file,bytes:op.binaryResult?result.bytes.length:undefined,content_type:op.binaryResult?result.contentType:"application/json",warning:"Keep this file private. Signed download URLs are not fetched by this wrapper."}; }
    return client.sanitize(result);
  } finally { await output?.close(); }
}

export const ALL_TOOLS: ToolSpec[] = operations.map((op) => ({
  name: op.name,
  title: op.title,
  description: op.description,
  group: op.group,
  inputSchema: fieldsFor(op),
  risk: op.risk,
  handler: (args, client) => execute(op, args, client),
}));
ALL_TOOLS.push({
  name: "list_accounts",
  title: "List configured accounts",
  description:
    "List private account labels, default selection and configured token method. No credentials, token paths or account content; no network request.",
  group: "accounts",
  risk: "read",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  handler: async (_args, client) => ({
    accounts: client.config.accounts.map((a) => ({
      name: a.name,

      default: a.name === client.config.defaultAccount,
      auth: a.tokenFile
        ? "token_file"
        : a.apiToken
          ? "api_key"
          : "not_configured",
    })),
  }),
});
const validators = new Map(
  ALL_TOOLS.map((t) => [t.name, ajv.compile(t.inputSchema)]),
);
export function validateArguments(tool: ToolSpec, args: Json): void {
  check(validators.get(tool.name)!, args);
}
export function visibleTools(config: Config): ToolSpec[] {
  return ALL_TOOLS.filter((t) => !config.readOnly || t.risk === "read");
}
