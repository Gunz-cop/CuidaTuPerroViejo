import { createMcpHandler, fromJsonSchema, McpServer } from '@modelcontextprotocol/server';
import { CfWorkerJsonSchemaValidator } from '@modelcontextprotocol/server/validators/cf-worker';
import { createAgentApiWorker } from '../agent-api/runtime';
import { evaluateQualityOfLife } from '../agent-tools/calidad-vida';
import { recommendMobilityAids } from '../agent-tools/movilidad';
import { ToolInputError, isPlainObject, SITE } from '../agent-tools/contract';
import { INPUT_SCHEMAS, TOOLS } from '../../scripts/agent-tools';
import capabilities from '../../agent-api/capabilities.json';
import domainSchema from '../../agent-api/schema.json';
import type { AgentEnv, AstroHandler } from '../agent-content/runtime';
import { boundedResponse, readLimited } from './output';

const MCP = capabilities.mcp;
export const MAX_BODY = 32768;
export const MAX_RESULT = 8 * 1024 * 1024;
const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });
const validator = new CfWorkerJsonSchemaValidator();
const identity = { name: MCP.name, version: MCP.version, title: MCP.title, description: MCP.description };
export const MCP_LINK = `<${SITE}${MCP.cardPath}>; rel="service-desc"; type="application/mcp-server-card+json"`;
const DISCOVERY_LINK = [
  ['llms.txt', 'describedby', 'text/plain'],
  ['.well-known/api-catalog', 'api-catalog', 'application/linkset+json'],
  ['agent-api/v1/openapi.json', 'service-desc', 'application/vnd.oai.openapi+json'],
  ['.well-known/ard.json', 'ard', 'application/json'],
  ['.well-known/ai-catalog.json', 'ai-catalog', 'application/json'],
].map(([path, rel, type]) => `<${SITE}/${path}>; rel="${rel}"; type="${type}"`).concat(MCP_LINK).join(', ');
const invalid = { schemaVersion: 'agent-api/1', error: { code: 'INVALID_REQUEST', message: 'Invalid request.' } };
const unavailable = { schemaVersion: 'agent-api/1', error: { code: 'CONTENT_UNAVAILABLE', message: 'Content temporarily unavailable.' } };
const outputNames = ['Search', 'Read', 'QualityOfLifeResult', 'MobilityResult'] as const;
const definitions = domainSchema.$defs;
const inputs = TOOLS.map((tool) => validator.getValidator(INPUT_SCHEMAS[tool.name]));
const outputs = outputNames.map((name) => ({ $schema: domainSchema.$schema, $ref: `#/$defs/${name}`, $defs: definitions }));
const outputChecks = outputs.map((schema) => validator.getValidator(schema));

function headers(origin: string | null, card = false): Headers {
  const h = new Headers({ 'Cache-Control': 'private, no-store', 'CDN-Cache-Control': 'no-store', 'Cloudflare-CDN-Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()', 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Access-Control-Allow-Methods': card ? 'GET, HEAD, OPTIONS' : 'POST, OPTIONS',
    'Access-Control-Allow-Headers': card ? 'Accept, Content-Type, If-None-Match' : 'Accept, Content-Type, MCP-Protocol-Version, Mcp-Method, Mcp-Name',
    'Access-Control-Expose-Headers': 'Link, MCP-Protocol-Version', Link: DISCOVERY_LINK });
  if (card) h.set('Access-Control-Allow-Origin', '*');
  else if (origin !== null) { h.set('Access-Control-Allow-Origin', origin); h.set('Vary', 'Origin'); }
  return h;
}
function rpcError(status: number, code: number, message: string, id: unknown = null, data?: unknown): Response {
  return Response.json({ jsonrpc: '2.0', id, error: { code, message, ...(data === undefined ? {} : { data }) } }, { status });
}
function result(body: Record<string, unknown>, value: unknown, modern: boolean, isError = false): Response {
  return Response.json({ jsonrpc: '2.0', id: body.id, result: {
    ...(modern ? { resultType: 'complete', _meta: { 'io.modelcontextprotocol/serverInfo': identity } } : {}),
    content: [{ type: 'text', text: `${JSON.stringify(value, null, 2)}\n` }], isError,
    ...(!isError ? { structuredContent: value } : {}),
  } });
}
function hostValid(url: URL): boolean {
  return (url.origin === SITE) || (url.protocol === 'https:' && url.port === '' &&
    (url.hostname === 'cuidatuperroviejo.g1721m.workers.dev' || /^[a-f0-9]{8}-cuidatuperroviejo\.g1721m\.workers\.dev$/u.test(url.hostname))) ||
    (url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname));
}
function originValid(request: Request, url: URL): boolean {
  if (!hostValid(url)) return false;
  const host = request.headers.get('Host');
  if (host !== null && host.toLowerCase() !== url.host) return false;
  const origin = request.headers.get('Origin');
  if (origin === null) return true;
  try { return origin === new URL(origin).origin && origin === url.origin; } catch { return false; }
}
function validId(id: unknown): boolean {
  return typeof id === 'number' ? Number.isSafeInteger(id) : typeof id === 'string' && /^[\x20-\x7e]{1,128}$/u.test(id);
}
function depth(value: unknown, level = 0): number {
  if (level > 16) return level;
  if (value === null || typeof value !== 'object') return level;
  return Math.max(level, ...Object.values(value).map((entry) => depth(entry, level + 1)));
}
function hasSurrogate(value: unknown): boolean {
  if (typeof value === 'string') return !value.isWellFormed();
  return value !== null && typeof value === 'object' && Object.entries(value).some(([key, entry]) => !key.isWellFormed() || hasSurrogate(entry));
}
function asciiName(header: string | null): string | null {
  if (header === null) return null;
  if (!header.startsWith('=?base64?') || !header.endsWith('?=')) return header;
  try { return decoder.decode(Uint8Array.from(atob(header.slice(9, -2)), (ch) => ch.charCodeAt(0))); } catch { return null; }
}
function acceptable(value: string | null): boolean {
  const entries = (value ?? '').split(',').map((entry) => entry.trim().toLowerCase());
  return ['application/json', 'text/event-stream'].every((mime) => entries.some((entry) => entry.split(';')[0] === mime && !/;\s*q=0(?:\.0*)?(?:;|$)/u.test(entry)));
}
function sanitizeMessage(value: unknown): unknown {
  if (!isPlainObject(value) || !isPlainObject(value.error)) return value;
  const code = value.error.code;
  const messages: Record<number, string> = { [-32700]: 'Parse error.', [-32600]: 'Invalid request.', [-32601]: 'Method not found.', [-32602]: 'Invalid params.', [-32603]: 'Internal error.', [-32020]: 'Header mismatch.' };
  return { jsonrpc: '2.0', id: validId(value.id) ? value.id : null, error: { code: typeof code === 'number' && Object.hasOwn(messages, code) ? code : -32603,
    message: typeof code === 'number' && Object.hasOwn(messages, code) ? messages[code] : 'Internal error.' } };
}
function sanitizeWire(bytes: Uint8Array, sse: boolean): Uint8Array {
  const text = decoder.decode(bytes);
  return encoder.encode(sse ? text.split('\n').map((line) => line.startsWith('data:') ? `data: ${JSON.stringify(sanitizeMessage(JSON.parse(line.slice(5).trim())))}` : line).join('\n') : JSON.stringify(sanitizeMessage(JSON.parse(text))));
}
async function readBody(request: Request, signal: AbortSignal): Promise<Uint8Array> {
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const cancel = () => { void reader.cancel().catch(() => {}); };
  signal.addEventListener('abort', cancel, { once: true });
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      signal.throwIfAborted();
      const { done, value } = await reader.read();
      signal.throwIfAborted();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) { await reader.cancel().catch(() => {}); throw new RangeError('BODY_LIMIT'); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    return bytes;
  } finally { signal.removeEventListener('abort', cancel); reader.releaseLock(); }
}

type Lease<Env extends AgentEnv> = { env: Env; context: ExecutionContext; controller: AbortController; jobs: number; closed: boolean; release: () => void };
type Bucket = { until: number; posts: number; calls: number };
export function createAgentMcpWorker<Env extends AgentEnv>(next: AstroHandler<Env>): AstroHandler<Env> {
  const api = createAgentApiWorker<Env>(async () => Response.json(unavailable, { status: 503 }));
  const leases = new WeakMap<Request, Lease<Env>>();
  const buckets = new Map<string, Bucket>(); let active = 0;
  function rate(request: Request, call = false): number {
    const now = Date.now();
    for (const [key, bucket] of buckets) if (bucket.until <= now) buckets.delete(key);
    let key = (request as Request & { cf?: unknown }).cf !== undefined ? request.headers.get('CF-Connecting-IP') ?? 'anonymous' : 'anonymous';
    if (!buckets.has(key) && buckets.size >= 64) key = 'overflow';
    let bucket = buckets.get(key);
    if (!bucket) { bucket = { until: now + 60000, posts: 0, calls: 0 }; buckets.set(key, bucket); }
    if (call ? ++bucket.calls > 90 : ++bucket.posts > 120) return Math.max(1, Math.ceil((bucket.until - now) / 1000));
    return 0;
  }
  const handler = createMcpHandler(({ requestInfo }) => {
    const lease = requestInfo && leases.get(requestInfo);
    if (!lease) throw new Error('CONTEXT_UNAVAILABLE');
    const server = new McpServer(identity, { supportedProtocolVersions: MCP.protocolVersions, jsonSchemaValidator: validator, capabilities: { tools: { listChanged: false } } });
    TOOLS.forEach((tool, index) => server.registerTool(tool.name, {
      title: tool.title, description: tool.description,
      inputSchema: fromJsonSchema(INPUT_SCHEMAS[tool.name], validator), outputSchema: fromJsonSchema(outputs[index]!, validator),
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    }, async (args, ctx) => {
      lease.jobs++;
      try {
        ctx.mcpReq.signal.throwIfAborted(); lease.controller.signal.throwIfAborted();
        let value: unknown;
        if (index === 2) value = evaluateQualityOfLife(args);
        else if (index === 3) value = recommendMobilityAids(args);
        else {
          const input = args as Record<string, unknown>; const query = new URLSearchParams(); let path: string;
          if (index === 0) {
            for (const key of ['q', 'kind', 'limit', 'offset', 'corpus']) if (Object.hasOwn(input, key)) query.append(key, String(input[key]));
            path = `/api/agent/v1/search?${query}`;
          } else {
            if (Object.hasOwn(input, 'corpus')) query.append('corpus', String(input.corpus));
            path = `/api/agent/v1/documents/${input.documentId}${query.size ? `?${query}` : ''}`;
          }
          const response = await api(new Request(`${SITE}${path}`, { headers: { Accept: 'application/json' } }), lease.env, lease.context);
          if (![200, 400, 404, 409, 503].includes(response.status) || response.headers.get('Content-Type')?.split(';')[0] !== 'application/json') throw new Error('CONTENT_UNAVAILABLE');
          value = JSON.parse(decoder.decode(new Uint8Array(await response.arrayBuffer())));
        }
        ctx.mcpReq.signal.throwIfAborted(); lease.controller.signal.throwIfAborted();
        const isError = isPlainObject(value) && Object.hasOwn(value, 'error');
        if (!isError && !outputChecks[index]!(value).valid) throw new Error('CONTENT_UNAVAILABLE');
        const text = `${JSON.stringify(value, null, 2)}\n`;
        if (encoder.encode(JSON.stringify({ content: [{ type: 'text', text }], structuredContent: value })).byteLength > MAX_RESULT - 16384) throw new Error('CONTENT_UNAVAILABLE');
        return { content: [{ type: 'text' as const, text }], isError, ...(!isError ? { structuredContent: value as Record<string, unknown> } : {}) };
      } catch (error) {
        if (ctx.mcpReq.signal.aborted || lease.controller.signal.aborted) throw error;
        return { content: [{ type: 'text' as const, text: `${JSON.stringify(error instanceof ToolInputError ? invalid : unavailable, null, 2)}\n` }], isError: true };
      } finally { lease.jobs--; lease.release(); }
    }));
    server.server.registerCapabilities({ tools: { listChanged: false } });
    return server;
  }, { legacy: 'stateless', responseMode: 'sse', maxRequestBodySize: MAX_BODY });

  return async (request, env, context) => {
    const url = new URL(request.url); const card = url.pathname === MCP.cardPath;
    const own = url.pathname === MCP.endpoint || url.pathname.startsWith(`${MCP.endpoint}/`);
    if (!own) {
      const response = await next(request, env, context); const h = new Headers(response.headers);
      if (!h.get('Link')?.includes(MCP_LINK)) h.set('Link', [h.get('Link'), MCP_LINK].filter(Boolean).join(', '));
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers: h });
    }
    const origin = request.headers.get('Origin'); const safeOrigin = originValid(request, url) ? origin : null;
    const decorate = (response: Response): Response => {
      const h = new Headers(response.headers); const common = headers(safeOrigin, card);
      for (const [key, value] of common) h.set(key, value);
      h.delete('Set-Cookie'); h.delete('Access-Control-Allow-Credentials');
      return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, headers: h });
    };
    if (!originValid(request, url)) return decorate(Response.json({ error: 'Forbidden.' }, { status: 403 }));
    if (url.pathname.includes('%') || url.search) return decorate(rpcError(400, -32600, 'Invalid request.'));
    if (url.pathname !== MCP.endpoint && !card) return decorate(Response.json({ error: 'Not found.' }, { status: 404 }));
    if (request.method === 'OPTIONS') {
      const method = request.headers.get('Access-Control-Request-Method');
      const allowed = card ? ['GET', 'HEAD'] : ['POST'];
      const allowedHeaders = (headers(safeOrigin, card).get('Access-Control-Allow-Headers') ?? '').toLowerCase().split(',').map((part) => part.trim());
      const requested = (request.headers.get('Access-Control-Request-Headers') ?? '').toLowerCase().split(',').map((part) => part.trim()).filter(Boolean);
      if ((method && !allowed.includes(method)) || requested.some((header) => !allowedHeaders.includes(header))) return decorate(Response.json({ error: 'Forbidden.' }, { status: 403 }));
      return decorate(new Response(null, { status: 204 }));
    }
    if (card && ['GET', 'HEAD'].includes(request.method)) {
      const response = await env.ASSETS.fetch(new Request(`${SITE}${MCP.cardPath}`, { method: request.method }));
      const h = new Headers(response.headers); h.set('Content-Type', 'application/mcp-server-card+json');
      try {
        const bytes = await readLimited(response.body, 256 * 1024);
        return decorate(new Response(request.method === 'HEAD' || response.status === 304 ? null : bytes, { status: response.status, headers: h }));
      } catch { return decorate(Response.json(unavailable, { status: 503 })); }
    }
    if (card || request.method !== 'POST') {
      const response = Response.json({ error: 'Method not allowed.' }, { status: 405 }); response.headers.set('Allow', card ? 'GET, HEAD, OPTIONS' : 'POST, OPTIONS'); return decorate(response);
    }
    const retry = rate(request);
    if (retry || active >= 2) { const response = Response.json({ error: 'Too many requests.' }, { status: 429 }); response.headers.set('Retry-After', String(retry || 1)); return decorate(response); }
    if ((request.headers.get('Content-Type') ?? '').split(';')[0]?.trim().toLowerCase() !== 'application/json' || !['', 'identity'].includes(request.headers.get('Content-Encoding') ?? '')) return decorate(Response.json({ error: 'Unsupported media type.' }, { status: 415 }));
    if (!acceptable(request.headers.get('Accept'))) return decorate(Response.json({ error: 'Not acceptable.' }, { status: 406 }));
    // Un tamaño declarado excesivo permite rechazar sin abrir/cancelar el
    // upload. El contador streaming sigue siendo obligatorio: ni ausencia ni
    // Content-Length reducido permiten eludir MAX_BODY.
    const declaredLength = request.headers.get('Content-Length');
    if (declaredLength !== null && /^[0-9]+$/u.test(declaredLength) && Number(declaredLength) > MAX_BODY) return decorate(rpcError(413, -32600, 'Invalid request.'));
    active++; const controller = new AbortController(); let released = false;
    const lease: Lease<Env> = { env, context, controller, jobs: 0, closed: false, release: () => {
      if (lease.closed && lease.jobs === 0 && !released) { released = true; active--; clearTimeout(timer); request.signal.removeEventListener('abort', abort); }
    } };
    const timer = setTimeout(() => controller.abort(new DOMException('Timeout', 'AbortError')), 10000);
    const abort = () => controller.abort();
    if (request.signal.aborted) controller.abort();
    else request.signal.addEventListener('abort', abort, { once: true });
    const finish = (response: Response): Response => { lease.closed = true; lease.release(); return decorate(response); };
    let body: Record<string, unknown>;
    try {
      const bytes = await readBody(request, controller.signal); let text: string;
      try { text = decoder.decode(bytes); } catch { return finish(rpcError(400, -32600, 'Invalid request.')); }
      let parsed: unknown;
      try { parsed = JSON.parse(text); } catch { return finish(rpcError(400, -32700, 'Parse error.')); }
      if (!isPlainObject(parsed) || parsed.jsonrpc !== '2.0' || typeof parsed.method !== 'string' || (Object.hasOwn(parsed, 'id') && !validId(parsed.id))) return finish(rpcError(400, -32600, 'Invalid request.'));
      body = parsed; const id = body.id ?? null;
      if (Object.hasOwn(body, 'id') === (body.method as string).startsWith('notifications/')) return finish(rpcError(400, -32600, 'Invalid request.'));
      if (depth(body) > 16 || hasSurrogate(body)) return finish(rpcError(400, -32600, 'Invalid request.', id));
      const params = body.params === undefined ? {} : body.params;
      if (!isPlainObject(params)) return finish(rpcError(400, -32602, 'Invalid params.', id));
      const meta = params._meta === undefined ? {} : params._meta;
      if (!isPlainObject(meta) || encoder.encode(JSON.stringify(meta)).length > 8192) return finish(rpcError(400, -32600, 'Invalid request.', id));
      const version = meta['io.modelcontextprotocol/protocolVersion']; const modern = version !== undefined;
      if (modern) {
        const info = meta['io.modelcontextprotocol/clientInfo'];
        if (typeof version !== 'string' || !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/u.test(version) || !isPlainObject(meta['io.modelcontextprotocol/clientCapabilities']) ||
          (info !== undefined && (!isPlainObject(info) || typeof info.name !== 'string' || typeof info.version !== 'string'))) return finish(rpcError(400, -32600, 'Invalid request.', id));
        if (request.headers.get('MCP-Protocol-Version') !== version || request.headers.get('Mcp-Method') !== body.method || (body.method === 'tools/call' && asciiName(request.headers.get('Mcp-Name')) !== params.name)) return finish(rpcError(400, -32020, 'Header mismatch.', id));
        if (version !== '2026-07-28') return finish(rpcError(400, -32022, 'Unsupported protocol version.', id, { supported: ['2026-07-28'], requested: version }));
      } else if (body.method === 'initialize') {
        if (typeof params.protocolVersion !== 'string' || !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/u.test(params.protocolVersion)) return finish(rpcError(400, -32602, 'Invalid params.', id));
      } else if (request.headers.get('MCP-Protocol-Version') !== '2025-11-25') return finish(rpcError(400, -32600, 'Invalid request.', id));
      if (request.headers.has('MCP-Session-Id')) return finish(rpcError(400, -32600, 'Invalid request.', id));
      const methods = modern ? ['server/discover', 'tools/list', 'tools/call'] : ['initialize', 'tools/list', 'tools/call', 'ping', 'notifications/initialized', 'notifications/cancelled'];
      if (!methods.includes(body.method as string)) return finish(rpcError(modern ? 404 : 200, -32601, 'Method not found.', id));
      if (body.method === 'tools/list' && Object.hasOwn(params, 'cursor')) return finish(rpcError(modern ? 400 : 200, -32602, 'Invalid params.', id));
      if (body.method === 'tools/call') {
        const index = TOOLS.findIndex((tool) => tool.name === params.name);
        if (index < 0 || !isPlainObject(params.arguments)) return finish(rpcError(modern ? 400 : 200, -32602, 'Invalid params.', id));
        const wait = rate(request, true);
        if (wait) { const response = Response.json({ error: 'Too many requests.' }, { status: 429 }); response.headers.set('Retry-After', String(wait)); return finish(response); }
        if (!inputs[index]!(params.arguments).valid) return finish(result(body, invalid, modern, true));
      }
      const normalized = new Request(request.url, { method: 'POST', headers: request.headers, body: JSON.stringify(body), signal: controller.signal }); leases.set(normalized, lease);
      // El SDK clona el Request legacy si debe releerlo; pasar el cuerpo ya
      // limitado/validado conserva la identidad del contexto por intercambio.
      const response = await handler.fetch(normalized, { parsedBody: body });
      const outputCap = body.method === 'tools/list' ? 256 * 1024 : MAX_RESULT;
      return decorate(boundedResponse(response, lease, outputCap, sanitizeWire));
    } catch (error) { return finish(rpcError(error instanceof RangeError ? 413 : 500, error instanceof RangeError ? -32600 : -32603, error instanceof RangeError ? 'Invalid request.' : 'Internal error.')); }
  };
}
