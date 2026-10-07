const SITE_ORIGIN = 'https://cuidatuperroviejo.com';
const INDEX_PATH = '/agent-content/v1/index.json';
const MAX_INDEX_BYTES = 512 * 1024;
const MAX_DOCUMENTS = 98;
const MAX_DOCUMENT_BYTES = 512 * 1024;
const MAX_CORPUS_BYTES = 16 * 1024 * 1024;
const ID_PATTERN = /^(home|(?:pillar|article|page)--[a-z0-9]+(?:-[a-z0-9]+)*|tool--(?:calidad-vida|movilidad))$/u;
const CANONICAL_SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const HASH_PATTERN = /^[a-f0-9]{64}$/u;
const ROOT_KEYS = ['schemaVersion', 'siteOrigin', 'language', 'corpusSha256', 'documents'];
const DOCUMENT_KEYS = [
  'documentId', 'kind', 'title', 'description', 'canonicalPath', 'canonicalUrl',
  'markdownPath', 'language', 'datePublished', 'dateModified', 'htmlSha256',
  'markdownSha256', 'markdownBytes',
];
const LINK_VALUE = '<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"';
const SECURITY_HEADERS = [
  ['X-Content-Type-Options', 'nosniff'],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  ['Permissions-Policy', 'geolocation=(), microphone=(), camera=()'],
  ['Strict-Transport-Security', 'max-age=31536000; includeSubDomains'],
] as const;

export interface AgentDocument {
  documentId: string;
  kind: 'home' | 'pillar' | 'article' | 'tool' | 'editorial';
  title: string;
  description: string;
  canonicalPath: string;
  canonicalUrl: string;
  markdownPath: string;
  language: 'es';
  datePublished: string | null;
  dateModified: string | null;
  htmlSha256: string;
  markdownSha256: string;
  markdownBytes: number;
}

export interface AgentIndex {
  schemaVersion: 'agent-content/1';
  siteOrigin: typeof SITE_ORIGIN;
  language: 'es';
  corpusSha256: string;
  documents: AgentDocument[];
}

interface RuntimeIndex {
  index: AgentIndex;
  byCanonicalPath: Map<string, AgentDocument>;
}

export interface AgentEnv {
  ASSETS: Fetcher;
}

export type AstroHandler<Env extends AgentEnv = AgentEnv> = (
  request: Request,
  env: Env,
  context: ExecutionContext,
) => Promise<Response>;

export type Negotiation =
  | { ok: true; representation: 'html' | 'markdown' }
  | { ok: false; status: 400 | 406 };

const ascii = (a: string, b: string): number => a < b ? -1 : a > b ? 1 : 0;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  const actual = Object.keys(value);
  return actual.length === keys.length && keys.every((key) => Object.hasOwn(value, key));
}

function isCanonicalPath(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > 100) return false;
  if (value === '/') return true;
  if (!value.startsWith('/') || value.endsWith('/') || value.includes('//') || /[%?#\\]/u.test(value)) return false;
  return value.slice(1).split('/').every((part) => part !== '.' && part !== '..' && CANONICAL_SEGMENT.test(part));
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string'
    && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/u.test(value)
    && !Number.isNaN(Date.parse(value));
}

function expectedKind(documentId: string): AgentDocument['kind'] {
  if (documentId === 'home') return 'home';
  if (documentId.startsWith('pillar--')) return 'pillar';
  if (documentId.startsWith('article--')) return 'article';
  if (documentId.startsWith('tool--')) return 'tool';
  return 'editorial';
}

async function sha256(bytes: Uint8Array): Promise<string> {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const digest = await crypto.subtle.digest('SHA-256', copy.buffer);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function validateAgentIndex(value: unknown): Promise<AgentIndex> {
  if (!isRecord(value) || !hasExactKeys(value, ROOT_KEYS)) throw new Error('INDEX_SCHEMA');
  if (value.schemaVersion !== 'agent-content/1' || value.siteOrigin !== SITE_ORIGIN || value.language !== 'es') throw new Error('INDEX_IDENTITY');
  if (typeof value.corpusSha256 !== 'string' || !HASH_PATTERN.test(value.corpusSha256)) throw new Error('INDEX_CORPUS_HASH');
  if (!Array.isArray(value.documents) || value.documents.length === 0 || value.documents.length > MAX_DOCUMENTS) throw new Error('INDEX_DOCUMENT_COUNT');

  const ids = new Set<string>();
  const paths = new Set<string>();
  const markdownPaths = new Set<string>();
  let previousId = '';
  let corpusBytes = 0;
  for (const raw of value.documents) {
    if (!isRecord(raw) || !hasExactKeys(raw, DOCUMENT_KEYS)) throw new Error('DOCUMENT_SCHEMA');
    const doc = raw as unknown as AgentDocument;
    if (typeof doc.documentId !== 'string' || doc.documentId.length > 160 || !ID_PATTERN.test(doc.documentId) || ids.has(doc.documentId)) throw new Error('DOCUMENT_ID');
    if (previousId && ascii(previousId, doc.documentId) >= 0) throw new Error('DOCUMENT_ORDER');
    if (!['home', 'pillar', 'article', 'tool', 'editorial'].includes(doc.kind) || expectedKind(doc.documentId) !== doc.kind) throw new Error('DOCUMENT_KIND');
    if (typeof doc.title !== 'string' || !doc.title || doc.title !== doc.title.replace(/\s+/gu, ' ').trim()) throw new Error('DOCUMENT_TITLE');
    if (typeof doc.description !== 'string' || !doc.description || doc.description !== doc.description.replace(/\s+/gu, ' ').trim()) throw new Error('DOCUMENT_DESCRIPTION');
    if (doc.language !== 'es' || !isCanonicalPath(doc.canonicalPath) || paths.has(doc.canonicalPath)) throw new Error('DOCUMENT_CANONICAL_PATH');
    if (doc.canonicalUrl !== `${SITE_ORIGIN}${doc.canonicalPath}`) throw new Error('DOCUMENT_CANONICAL_URL');
    const expectedMarkdownPath = `/agent-content/v1/documents/${doc.documentId}.md`;
    if (doc.markdownPath !== expectedMarkdownPath || markdownPaths.has(doc.markdownPath)) throw new Error('DOCUMENT_MARKDOWN_PATH');
    if (doc.datePublished !== null && !isIsoDate(doc.datePublished)) throw new Error('DOCUMENT_DATE_PUBLISHED');
    if (doc.dateModified !== null && !isIsoDate(doc.dateModified)) throw new Error('DOCUMENT_DATE_MODIFIED');
    if (!HASH_PATTERN.test(doc.htmlSha256) || !HASH_PATTERN.test(doc.markdownSha256)) throw new Error('DOCUMENT_HASH');
    if (!Number.isInteger(doc.markdownBytes) || doc.markdownBytes < 1 || doc.markdownBytes > MAX_DOCUMENT_BYTES) throw new Error('DOCUMENT_SIZE');
    corpusBytes += doc.markdownBytes;
    if (corpusBytes > MAX_CORPUS_BYTES) throw new Error('DOCUMENT_CORPUS_SIZE');
    ids.add(doc.documentId);
    paths.add(doc.canonicalPath);
    markdownPaths.add(doc.markdownPath);
    previousId = doc.documentId;
  }
  const rows = value.documents.map((doc) => [doc.documentId, doc.canonicalPath, doc.markdownSha256]);
  const corpus = await sha256(new TextEncoder().encode(JSON.stringify(rows)));
  if (corpus !== value.corpusSha256) throw new Error('INDEX_CORPUS_MISMATCH');
  return value as unknown as AgentIndex;
}

const TCHARS = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/u;

function splitQuoted(value: string): { parts: string[]; invalid: boolean } {
  const parts: string[] = [];
  let start = 0;
  let quoted = false;
  let escaped = false;
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index]!;
    if (escaped) { escaped = false; continue; }
    if (quoted && char === '\\') { escaped = true; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === ',' && !quoted) { parts.push(value.slice(start, index)); start = index + 1; }
  }
  parts.push(value.slice(start));
  return { parts, invalid: quoted || escaped };
}

function splitParameters(member: string): string[] | undefined {
  const pieces: string[] = [];
  let start = 0;
  let quoted = false;
  let escaped = false;
  for (let index = 0; index < member.length; index += 1) {
    const char = member[index]!;
    if (escaped) { escaped = false; continue; }
    if (quoted && char === '\\') { escaped = true; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === ';' && !quoted) { pieces.push(member.slice(start, index)); start = index + 1; }
  }
  if (quoted || escaped) return undefined;
  pieces.push(member.slice(start));
  return pieces;
}

function validParamValue(value: string): boolean {
  if (TCHARS.test(value)) return true;
  if (value.length < 2 || value[0] !== '"' || value.at(-1) !== '"') return false;
  for (let index = 1; index < value.length - 1; index += 1) {
    const code = value.charCodeAt(index);
    const char = value[index]!;
    if (char === '\\') {
      index += 1;
      if (index >= value.length - 1) return false;
      const escaped = value.charCodeAt(index);
      if (!(escaped === 9 || escaped === 32 || (escaped >= 33 && escaped <= 126) || escaped >= 128)) return false;
    } else if (!(code === 9 || code === 32 || code === 33 || (code >= 35 && code <= 91) || (code >= 93 && code <= 126) || code >= 128)) {
      return false;
    }
  }
  return true;
}

interface AcceptMember { type: string; subtype: string; quality: number; mediaParameters: number }

function parseMember(raw: string): AcceptMember | undefined {
  const pieces = splitParameters(raw.trim());
  if (!pieces) return undefined;
  const media = pieces.shift()!.trim().toLowerCase();
  const slash = media.indexOf('/');
  if (slash <= 0 || slash !== media.lastIndexOf('/') || slash === media.length - 1) return undefined;
  const type = media.slice(0, slash);
  const subtype = media.slice(slash + 1);
  if (type === '*' ? subtype !== '*' : !TCHARS.test(type)) return undefined;
  if (subtype === '*') {
    if (type === '*') { /* valid global wildcard */ }
    else if (!TCHARS.test(type)) return undefined;
  } else if (!TCHARS.test(subtype) || type === '*') return undefined;

  let quality = 1;
  let foundQuality = false;
  let afterQuality = false;
  let mediaParameters = 0;
  for (const rawParam of pieces) {
    const param = rawParam.trim();
    if (!param) return undefined;
    const equal = param.indexOf('=');
    const name = (equal < 0 ? param : param.slice(0, equal)).trim().toLowerCase();
    const rawValue = equal < 0 ? undefined : param.slice(equal + 1).trim();
    if (!TCHARS.test(name)) return undefined;
    if (name === 'q') {
      if (foundQuality || rawValue === undefined) return undefined;
      const q = rawValue;
      if (!/^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/u.test(q)) return undefined;
      quality = Number(q);
      foundQuality = true;
      afterQuality = true;
    } else {
      if (afterQuality) {
        if (rawValue !== undefined && !validParamValue(rawValue)) return undefined;
        continue;
      }
      if (rawValue === undefined || !validParamValue(rawValue)) return undefined;
      mediaParameters += 1;
    }
  }
  return { type, subtype, quality, mediaParameters };
}

export function negotiateAccept(header: string | null | undefined): Negotiation {
  if (header === null || header === undefined || header.trim() === '') return { ok: true, representation: 'html' };
  if (new TextEncoder().encode(header).length > 8192 || /[^\x00-\x7f]/u.test(header)) return { ok: false, status: 400 };
  const { parts, invalid } = splitQuoted(header);
  const members = parts.map(parseMember).filter((member): member is AcceptMember => member !== undefined);
  if (members.length === 0) return { ok: false, status: 400 };
  // An unmatched quote poisons only the unfinished member. Earlier comma-separated
  // members remain independently parseable, as required for invalid-member handling.
  void invalid;

  const qualityFor = (representation: 'html' | 'markdown'): { specificity: number; quality: number } => {
    const wanted = representation === 'html' ? 'html' : 'markdown';
    let specificity = 0;
    let quality = 0;
    for (const member of members) {
      let matchSpecificity = 0;
      if (member.type === 'text' && member.subtype === wanted) matchSpecificity = 3;
      else if (member.type === 'text' && member.subtype === '*') matchSpecificity = 2;
      else if (member.type === '*' && member.subtype === '*') matchSpecificity = 1;
      if (member.mediaParameters > 0 || matchSpecificity === 0) continue;
      if (matchSpecificity > specificity) { specificity = matchSpecificity; quality = member.quality; }
      else if (matchSpecificity === specificity) quality = Math.max(quality, member.quality);
    }
    return { specificity, quality };
  };
  const html = qualityFor('html');
  const markdown = qualityFor('markdown');
  if (html.quality <= 0 && markdown.quality <= 0) return { ok: false, status: 406 };
  return markdown.quality > html.quality
    ? { ok: true, representation: 'markdown' }
    : { ok: true, representation: 'html' };
}

async function readBounded(response: Response, limit: number): Promise<Uint8Array> {
  const length = response.headers.get('content-length');
  if (length && /^\d+$/u.test(length) && Number(length) > limit) throw new Error('BODY_TOO_LARGE');
  if (!response.body) return new Uint8Array();
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new Error('BODY_TOO_LARGE');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return bytes;
}

async function fetchIndex(assets: Fetcher, requestUrl: string): Promise<RuntimeIndex> {
  const url = new URL(INDEX_PATH, requestUrl);
  const internalRequest = new Request(url, { method: 'GET', redirect: 'manual' });
  const response = await assets.fetch(internalRequest);
  if (response.status !== 200) throw new Error('INDEX_STATUS');
  const bytes = await readBounded(response, MAX_INDEX_BYTES);
  const value: unknown = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
  const index = await validateAgentIndex(value);
  return { index, byCanonicalPath: new Map(index.documents.map((document) => [document.canonicalPath, document])) };
}

const successfulIndexes = new WeakMap<Fetcher, Promise<RuntimeIndex>>();

export function loadAgentIndex(assets: Fetcher, requestUrl: string): Promise<RuntimeIndex> {
  const cached = successfulIndexes.get(assets);
  if (cached) return cached;
  const pending = fetchIndex(assets, requestUrl);
  successfulIndexes.set(assets, pending);
  void pending.catch(() => {
    if (successfulIndexes.get(assets) === pending) successfulIndexes.delete(assets);
  });
  return pending;
}

function addVaryAccept(headers: Headers): void {
  const tokens = (headers.get('Vary') ?? '').split(',').map((token) => token.trim()).filter(Boolean);
  const retained: string[] = [];
  for (const token of tokens) {
    if (token.toLowerCase() !== 'accept' && !retained.some((item) => item.toLowerCase() === token.toLowerCase())) retained.push(token);
  }
  retained.push('Accept');
  headers.set('Vary', retained.join(', '));
}

function applySharedHeaders(headers: Headers): void {
  headers.set('Cache-Control', 'private, no-store');
  for (const name of ['CDN-Cache-Control', 'Cloudflare-CDN-Cache-Control']) {
    if (headers.has(name)) headers.set(name, 'no-store');
  }
  addVaryAccept(headers);
  const link = headers.get('Link');
  if (!link?.includes(LINK_VALUE)) headers.set('Link', link ? `${link}, ${LINK_VALUE}` : LINK_VALUE);
  for (const [name, value] of SECURITY_HEADERS) headers.set(name, value);
  headers.delete('Set-Cookie');
  headers.delete('X-Edge-Cache');
}

function errorResponse(status: 400 | 406 | 503, method: string, source?: Headers): Response {
  const text = status === 400 ? 'Invalid Accept header.\n'
    : status === 406 ? 'No acceptable representation.\n'
      : 'Document representation unavailable.\n';
  const headers = new Headers(source);
  headers.set('Content-Type', 'text/plain; charset=utf-8');
  headers.delete('Content-Length');
  headers.delete('Content-Encoding');
  headers.delete('ETag');
  headers.delete('Last-Modified');
  headers.delete('Accept-Ranges');
  headers.delete('X-Edge-Cache');
  applySharedHeaders(headers);
  return new Response(method === 'HEAD' ? null : text, { status, headers });
}

type IfNoneMatchCondition =
  | { kind: 'wildcard'; raw: string }
  | { kind: 'entity-tags'; raw: string; opaqueTags: string[] };

function trimOws(value: string): string {
  return value.replace(/^[ \t]+|[ \t]+$/gu, '');
}

function parseEntityTag(value: string): string | undefined {
  const candidate = trimOws(value);
  const weak = candidate.startsWith('W/');
  const tag = weak ? candidate.slice(2) : candidate;
  if (tag.length < 2 || tag[0] !== '"' || tag.at(-1) !== '"') return undefined;
  for (let index = 1; index < tag.length - 1; index += 1) {
    const code = tag.charCodeAt(index);
    if (!(code === 0x21 || (code >= 0x23 && code <= 0x7e) || (code >= 0x80 && code <= 0xff))) return undefined;
  }
  return tag.slice(1, -1);
}

function parseIfNoneMatch(value: string | null): IfNoneMatchCondition | undefined {
  if (value === null) return undefined;
  const field = trimOws(value);
  if (field === '') return undefined;
  if (field === '*') return { kind: 'wildcard', raw: field };
  return parseIfNoneMatchList(field);
}

function parseIfNoneMatchList(field: string): IfNoneMatchCondition | undefined {
  const members: string[] = [];
  let start = 0;
  let quoted = false;
  for (let index = 0; index < field.length; index += 1) {
    const char = field[index]!;
    if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) { members.push(field.slice(start, index)); start = index + 1; }
  }
  members.push(field.slice(start));

  let emptyMembers = 0;
  const opaqueTags: string[] = [];
  for (const rawMember of members) {
    const member = trimOws(rawMember);
    if (member === '') {
      emptyMembers += 1;
      if (emptyMembers > 16) return undefined;
      continue;
    }
    if (member === '*') return undefined;
    const opaqueTag = parseEntityTag(member);
    if (opaqueTag === undefined) return undefined;
    opaqueTags.push(opaqueTag);
  }
  return opaqueTags.length > 0 ? { kind: 'entity-tags', raw: field, opaqueTags } : undefined;
}

function documentRequest(url: URL, path: string, method: 'GET' | 'HEAD', ifNoneMatch: string | null): Request {
  const target = new URL(path, url.origin);
  const headers = new Headers();
  if (ifNoneMatch !== null) headers.set('If-None-Match', ifNoneMatch);
  return new Request(target, { method, headers, redirect: 'manual' });
}

function ifNoneMatchMatches(condition: IfNoneMatchCondition | undefined, etag: string | null): boolean {
  if (!condition) return false;
  if (condition.kind === 'wildcard') return true;
  if (etag === null) return false;
  const selected = parseEntityTag(etag);
  return selected !== undefined && condition.opaqueTags.includes(selected);
}

async function serveRepresentation(
  assets: Fetcher,
  url: URL,
  path: string,
  method: 'GET' | 'HEAD',
  ifNoneMatch: IfNoneMatchCondition | undefined,
  representation: 'html' | 'markdown',
): Promise<Response> {
  const response = await assets.fetch(documentRequest(url, path, method, ifNoneMatch?.raw ?? null));
  if (response.status !== 200 && response.status !== 304) {
    if (response.body) await response.body.cancel();
    return errorResponse(503, method, response.headers);
  }
  const etag = response.headers.get('ETag');
  if (representation === 'markdown' && parseEntityTag(etag ?? '') === undefined) {
    if (response.body) await response.body.cancel();
    return errorResponse(503, method, response.headers);
  }
  if (response.status === 304 && !ifNoneMatchMatches(ifNoneMatch, etag)) {
    if (response.body) await response.body.cancel();
    return errorResponse(503, method, response.headers);
  }
  if (response.status === 200 && method === 'GET' && !response.body) return errorResponse(503, method, response.headers);
  const weakOrListMatch = response.status === 200 && ifNoneMatchMatches(ifNoneMatch, etag);
  if ((response.status === 304 || weakOrListMatch) && response.body) {
    await response.body.cancel();
  }
  const status = weakOrListMatch ? 304 : response.status;
  const headers = new Headers(response.headers);
  headers.set('Content-Type', representation === 'html' ? 'text/html; charset=utf-8' : 'text/markdown; charset=utf-8');
  headers.delete('Accept-Ranges');
  headers.delete('Last-Modified');
  if (status === 304) headers.delete('Content-Length');
  applySharedHeaders(headers);
  return new Response(status === 304 || method === 'HEAD' ? null : response.body, {
    status,
    statusText: response.statusText,
    headers,
  });
}

export function createAgentContentWorker<Env extends AgentEnv = AgentEnv>(astroHandler: AstroHandler<Env>) {
  return async (request: Request, env: Env, context: ExecutionContext): Promise<Response> => {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin/') || (request.method !== 'GET' && request.method !== 'HEAD')) {
      return astroHandler(request, env, context);
    }
    let index: RuntimeIndex;
    try {
      index = await loadAgentIndex(env.ASSETS, request.url);
    } catch {
      return errorResponse(503, request.method);
    }
    const document = index.byCanonicalPath.get(url.pathname);
    if (!document) return astroHandler(request, env, context);

    const selected = negotiateAccept(request.headers.get('Accept'));
    if (!selected.ok) return errorResponse(selected.status, request.method);
    const path = selected.representation === 'markdown' ? document.markdownPath : document.canonicalPath;
    const ifNoneMatch = parseIfNoneMatch(request.headers.get('If-None-Match'));
    try {
      return await serveRepresentation(env.ASSETS, url, path, request.method as 'GET' | 'HEAD', ifNoneMatch, selected.representation);
    } catch {
      return errorResponse(503, request.method);
    }
  };
}

export const agentContentInternals = {
  addVaryAccept,
  isCanonicalPath,
  readBounded,
};
