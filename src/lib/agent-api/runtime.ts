import { loadAgentIndex, type AgentDocument, type AgentEnv, type AgentIndex, type AstroHandler } from '../agent-content/runtime';

const PREFIX = '/api/agent/v1';
const ID = /^(home|(?:pillar|article|page)--[a-z0-9]+(?:-[a-z0-9]+)*|tool--(?:calidad-vida|movilidad))$/u;
const CONTROL = /[\u0000-\u001f\u007f]/u;
const encoder = new TextEncoder();
// Preserve a BOM, if present, so re-encoding never silently changes entity bytes.
const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });
const METHODS = 'GET, HEAD, OPTIONS';
const MAX_RESPONSE = 2 * 1024 * 1024;
const LINK = [
  ['llms.txt', 'describedby', 'text/plain'],
  ['.well-known/api-catalog', 'api-catalog', 'application/linkset+json'],
  ['agent-api/v1/openapi.json', 'service-desc', 'application/vnd.oai.openapi+json'],
  ['.well-known/ard.json', 'ard', 'application/json'],
  ['.well-known/ai-catalog.json', 'ai-catalog', 'application/json'],
].map(([path, rel, type]) => `<https://cuidatuperroviejo.com/${path}>; rel="${rel}"; type="${type}"`).join(', ');

const ERRORS = {
  INVALID_REQUEST: [400, 'Invalid request.'],
  ROUTE_NOT_FOUND: [404, 'Unknown API route.'],
  DOCUMENT_NOT_FOUND: [404, 'Document not found.'],
  METHOD_NOT_ALLOWED: [405, 'Method not allowed.'],
  CORPUS_CHANGED: [409, 'Content corpus changed; repeat discovery.'],
  CONTENT_UNAVAILABLE: [503, 'Content temporarily unavailable.'],
} as const;

function headers(status: number): Headers {
  const result = new Headers({
    'Cache-Control': 'private, no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': METHODS,
    'Access-Control-Allow-Headers': 'Accept',
    'Access-Control-Expose-Headers': 'Link',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    Link: LINK,
  });
  if (status !== 204) result.set('Content-Type', 'application/json; charset=utf-8');
  if (status === 405) result.set('Allow', METHODS);
  return result;
}

function json(value: unknown, method: string, status = 200): Response {
  const body = encoder.encode(`${JSON.stringify(value, null, 2)}\n`);
  if (body.byteLength > MAX_RESPONSE) return error('CONTENT_UNAVAILABLE', method);
  return new Response(method === 'HEAD' ? null : body, { status, headers: headers(status) });
}

function error(code: keyof typeof ERRORS, method: string): Response {
  const [status, message] = ERRORS[code];
  return json({ schemaVersion: 'agent-api/1', error: { code, message } }, method, status);
}

const normalized = (value: string): string => value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
const tokens = (value: string): string[] => [...new Set(normalized(value).match(/[\p{L}\p{N}]+/gu) ?? [])].sort();

type Route = { name: 'catalog' | 'search' } | { name: 'document'; id: string };
type Query = { kind?: string; corpus?: string; limit: number; offset: number; tokens: string[] };

function parseQuery(raw: string, route: Route): Query {
  if (encoder.encode(raw).byteLength > 2048) throw new Error('QUERY_SIZE');
  const allowed = route.name === 'document' ? ['corpus'] : ['kind', 'limit', 'offset', 'corpus', ...(route.name === 'search' ? ['q'] : [])];
  const values = new Map<string, string>();
  // Like form-urlencoded, empty separators do not define a parameter. An actual
  // empty key ("=value") is rejected, as are malformed percent/UTF-8 sequences.
  for (const part of raw.split('&').filter(Boolean)) {
    const equal = part.indexOf('=');
    const decode = (s: string) => decodeURIComponent(s.replace(/\+/gu, ' '));
    const key = decode(equal < 0 ? part : part.slice(0, equal));
    const value = decode(equal < 0 ? '' : part.slice(equal + 1));
    if (!allowed.includes(key) || values.has(key) || CONTROL.test(value)) throw new Error('QUERY_PARAMETER');
    values.set(key, value);
  }
  const integer = (key: string, fallback: number, min: number, max: number): number => {
    if (!values.has(key)) return fallback;
    const value = values.get(key)!;
    const number = Number(value);
    if (!/^(?:0|[1-9][0-9]*)$/u.test(value) || number < min || number > max) throw new Error('QUERY_INTEGER');
    return number;
  };
  const kind = values.get('kind');
  const corpus = values.get('corpus');
  if (kind !== undefined && !['home', 'pillar', 'article', 'tool', 'editorial'].includes(kind)) throw new Error('QUERY_KIND');
  if (corpus !== undefined && !/^[a-f0-9]{64}$/u.test(corpus)) throw new Error('QUERY_CORPUS');
  let queryTokens: string[] = [];
  if (route.name === 'search') {
    const q = values.get('q')?.normalize('NFC').trim();
    if (!q || [...q].length > 200 || encoder.encode(q).byteLength > 800) throw new Error('QUERY_Q');
    queryTokens = tokens(q);
    if (!queryTokens.length || queryTokens.length > 12 || queryTokens.some((token) => [...token].length > 64)) throw new Error('QUERY_TOKENS');
  }
  return { kind, corpus, limit: integer('limit', 20, 1, 20), offset: integer('offset', 0, 0, 98), tokens: queryTokens };
}

interface Link { label: string; url: string }
interface QueryDocument {
  documentId: string;
  markdownSha256: string;
  titleTokens: string[];
  descriptionTokens: string[];
  bodyTokens: string[];
  links: Link[];
}
interface Data { index: AgentIndex; query: QueryDocument[] }

function exact(value: unknown, keys: string[]): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    && Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key));
}

function tokenArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((token, i) => typeof token === 'string'
    && /^[\p{L}\p{N}]+$/u.test(token) && normalized(token) === token && (i === 0 || value[i - 1] < token));
}

function validateQueryIndex(value: unknown, index: AgentIndex): QueryDocument[] {
  if (!exact(value, ['schemaVersion', 'corpusSha256', 'documents']) || value.schemaVersion !== 'agent-query/1'
    || value.corpusSha256 !== index.corpusSha256 || !Array.isArray(value.documents)
    || value.documents.length !== index.documents.length) throw new Error('QUERY_INDEX');
  for (const [i, raw] of value.documents.entries()) {
    const doc = index.documents[i]!;
    if (!exact(raw, ['documentId', 'markdownSha256', 'titleTokens', 'descriptionTokens', 'bodyTokens', 'links'])
      || raw.documentId !== doc.documentId || raw.markdownSha256 !== doc.markdownSha256
      || !tokenArray(raw.titleTokens) || !tokenArray(raw.descriptionTokens) || !tokenArray(raw.bodyTokens)
      || !Array.isArray(raw.links)) throw new Error('QUERY_DOCUMENT');
    // Metadata is available without fetching Markdown; verify its token sets too.
    if (JSON.stringify(raw.titleTokens) !== JSON.stringify(tokens(doc.title))
      || JSON.stringify(raw.descriptionTokens) !== JSON.stringify(tokens(doc.description))) throw new Error('QUERY_METADATA');
    const seen = new Set<string>();
    for (const link of raw.links) {
      if (!exact(link, ['label', 'url']) || typeof link.label !== 'string' || typeof link.url !== 'string'
        || link.label !== link.label.replace(/\s+/gu, ' ').trim() || CONTROL.test(link.url)) throw new Error('QUERY_LINK');
      const url = new URL(link.url);
      if (!['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) || url.username || url.password || url.href !== link.url) throw new Error('QUERY_LINK_URL');
      const pair = JSON.stringify([link.label, link.url]);
      if (seen.has(pair)) throw new Error('QUERY_LINK_DUPLICATE');
      seen.add(pair);
    }
  }
  return value.documents as QueryDocument[];
}

async function readAsset(assets: Fetcher, origin: string, path: string, max: number): Promise<Uint8Array> {
  const response = await assets.fetch(new Request(new URL(path, origin), { method: 'GET', redirect: 'manual' }));
  if (response.status !== 200) {
    await response.body?.cancel();
    throw new Error('ASSET_STATUS');
  }
  const declared = response.headers.get('Content-Length');
  if (declared !== null && (!/^\d+$/u.test(declared) || Number(declared) > max)) {
    await response.body?.cancel();
    throw new Error('ASSET_SIZE');
  }
  const reader = response.body?.getReader();
  if (!reader) throw new Error('ASSET_BODY');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > max) { await reader.cancel(); throw new Error('ASSET_SIZE'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return bytes;
}

const cache = new WeakMap<Fetcher, Promise<Data>>();
function load(assets: Fetcher, requestUrl: string): Promise<Data> {
  const cached = cache.get(assets);
  if (cached) return cached;
  const pending = (async () => {
    const { index } = await loadAgentIndex(assets, requestUrl);
    const bytes = await readAsset(assets, requestUrl, '/agent-api/v1/query-index.json', 8 * 1024 * 1024);
    return { index, query: validateQueryIndex(JSON.parse(decoder.decode(bytes)), index) };
  })();
  cache.set(assets, pending);
  void pending.catch(() => { if (cache.get(assets) === pending) cache.delete(assets); });
  return pending;
}

async function readDocument(assets: Fetcher, requestUrl: string, doc: AgentDocument): Promise<string> {
  const bytes = await readAsset(assets, requestUrl, doc.markdownPath, 512 * 1024);
  if (bytes.length !== doc.markdownBytes) throw new Error('DOCUMENT_SIZE');
  const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', new Uint8Array(bytes).buffer))]
    .map((b) => b.toString(16).padStart(2, '0')).join('');
  if (hash !== doc.markdownSha256) throw new Error('DOCUMENT_HASH');
  const markdown = decoder.decode(bytes);
  const encoded = encoder.encode(markdown);
  if (encoded.length !== bytes.length || encoded.some((b, i) => b !== bytes[i])) throw new Error('DOCUMENT_UTF8');
  return markdown;
}

export function createAgentApiWorker<Env extends AgentEnv>(next: AstroHandler<Env>): AstroHandler<Env> {
  return async (request, env, context) => {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path !== PREFIX && !path.startsWith(`${PREFIX}/`)) return next(request, env, context);
    const method = request.method;
    if (path.includes('%')) return error('INVALID_REQUEST', method);
    let route: Route;
    if (path === `${PREFIX}/catalog`) route = { name: 'catalog' };
    else if (path === `${PREFIX}/search`) route = { name: 'search' };
    else if (path.startsWith(`${PREFIX}/documents/`) && !path.slice(`${PREFIX}/documents/`.length).includes('/')) {
      const id = path.slice(`${PREFIX}/documents/`.length);
      if (id.length > 160 || !ID.test(id)) return error('INVALID_REQUEST', method);
      route = { name: 'document', id };
    } else return error('ROUTE_NOT_FOUND', method);
    if (method === 'OPTIONS') return new Response(null, { status: 204, headers: headers(204) });
    if (method !== 'GET' && method !== 'HEAD') return error('METHOD_NOT_ALLOWED', method);
    let query: Query;
    try { query = parseQuery(url.search.slice(1), route); }
    catch { return error('INVALID_REQUEST', method); }
    try {
      const { index, query: queryDocuments } = await load(env.ASSETS, request.url);
      if (query.corpus !== undefined && query.corpus !== index.corpusSha256) return error('CORPUS_CHANGED', method);
      if (route.name === 'document') {
        const position = index.documents.findIndex((doc) => doc.documentId === route.id);
        if (position < 0) return error('DOCUMENT_NOT_FOUND', method);
        const document = index.documents[position]!;
        const markdown = await readDocument(env.ASSETS, request.url, document);
        return json({ schemaVersion: 'agent-api/1', corpusSha256: index.corpusSha256, document, mediaType: 'text/markdown', markdown, links: queryDocuments[position]!.links }, method);
      }
      const candidates = index.documents.map((document, i) => ({ document, queryDocument: queryDocuments[i]! }))
        .filter(({ document }) => query.kind === undefined || document.kind === query.kind);
      let results: Array<{ document: AgentDocument; score: number }> = [];
      if (route.name === 'search') {
        for (const { document, queryDocument: entry } of candidates) {
          let score = 0;
          for (const token of query.tokens) {
            const weight = (entry.titleTokens.includes(token) ? 8 : 0) + (entry.descriptionTokens.includes(token) ? 3 : 0) + (entry.bodyTokens.includes(token) ? 1 : 0);
            if (!weight) { score = 0; break; }
            score += weight;
          }
          if (score) results.push({ document, score });
        }
        results.sort((a, b) => b.score - a.score || (a.document.documentId < b.document.documentId ? -1 : a.document.documentId > b.document.documentId ? 1 : 0));
      }
      const all = route.name === 'catalog' ? candidates.map(({ document }) => document) : results;
      const page = all.slice(query.offset, query.offset + query.limit);
      const nextOffset = page.length > 0 && query.offset + page.length < all.length ? query.offset + page.length : null;
      return json({ schemaVersion: 'agent-api/1', corpusSha256: index.corpusSha256, total: all.length, limit: query.limit, offset: query.offset, nextOffset,
        ...(route.name === 'catalog' ? { documents: page } : { results: page }) }, method);
    } catch { return error('CONTENT_UNAVAILABLE', method); }
  };
}
