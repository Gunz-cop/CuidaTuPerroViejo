#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfm } from 'micromark-extension-gfm';
import { gfmFromMarkdown } from 'mdast-util-gfm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const SITE = 'https://cuidatuperroviejo.com';
const F2_INDEX = 'agent-content/v1/index.json';
const MAX_DOCUMENTS = 98;
const MAX_F2_INDEX_BYTES = 512 * 1024;
const MAX_DOCUMENT_BYTES = 512 * 1024;
const MAX_CORPUS_BYTES = 16 * 1024 * 1024;
const MAX_QUERY_INDEX_BYTES = 8 * 1024 * 1024;
const MAX_DESCRIPTOR_BYTES = 256 * 1024;
const MAX_SKILL_BYTES = 32 * 1024;
export const F3_LIMITS = Object.freeze({ f2Index: MAX_F2_INDEX_BYTES, document: MAX_DOCUMENT_BYTES, corpus: MAX_CORPUS_BYTES, queryIndex: MAX_QUERY_INDEX_BYTES, descriptor: MAX_DESCRIPTOR_BYTES, skill: MAX_SKILL_BYTES, documentCount: MAX_DOCUMENTS });
const F2_ROOT_KEYS = ['schemaVersion', 'siteOrigin', 'language', 'corpusSha256', 'documents'];
const F2_DOCUMENT_KEYS = ['documentId', 'kind', 'title', 'description', 'canonicalPath', 'canonicalUrl', 'markdownPath', 'language', 'datePublished', 'dateModified', 'htmlSha256', 'markdownSha256', 'markdownBytes'];
const ID_PATTERN = /^(home|(?:pillar|article|page)--[a-z0-9]+(?:-[a-z0-9]+)*|tool--(?:calidad-vida|movilidad))$/u;
const HASH_PATTERN = /^[a-f0-9]{64}$/u;
const MD_OPTIONS = { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] };
const OPENAPI_DOCUMENTARY_SENTENCE = ' Documento normativo de diseño; este archivo no prueba publicación.';

const ascii = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const jsonBytes = (value) => Buffer.from(`${JSON.stringify(value, null, 2)}\n`, 'utf8');
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

export class AgentApiError extends Error {
  constructor(message, exitCode = 3) { super(message); this.name = 'AgentApiError'; this.exitCode = exitCode; }
}

function fail(message, exitCode = 3) { throw new AgentApiError(message, exitCode); }

function byteLimit(name, bytes, max) {
  if (bytes > max) fail(`${name}_LIMIT bytes=${bytes} limit=${max}`);
}

export const assertByteLimit = byteLimit;

function fatalUtf8(bytes, label) {
  try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
  catch { fail(`${label}_UTF8_INVALID`); }
}

function isoDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/u.test(value) && !Number.isNaN(Date.parse(value));
}

function expectedKind(id) {
  if (id === 'home') return 'home';
  if (id.startsWith('pillar--')) return 'pillar';
  if (id.startsWith('article--')) return 'article';
  if (id.startsWith('tool--')) return 'tool';
  return 'editorial';
}

function canonicalPathValid(value) {
  return typeof value === 'string' && value.length <= 100 && (value === '/' ||
    (value.startsWith('/') && !value.endsWith('/') && !/[%?#\\]/u.test(value) && !value.includes('//') &&
      value.slice(1).split('/').every((part) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(part) && part !== '.' && part !== '..')));
}

function validateF2Index(index, indexBytes) {
  byteLimit('F2_INDEX', indexBytes.length, MAX_F2_INDEX_BYTES);
  if (!index || typeof index !== 'object' || Array.isArray(index) || JSON.stringify(Object.keys(index)) !== JSON.stringify(F2_ROOT_KEYS)) fail('F2_INDEX_SCHEMA');
  if (index.schemaVersion !== 'agent-content/1' || index.siteOrigin !== SITE || index.language !== 'es' || !HASH_PATTERN.test(index.corpusSha256)) fail('F2_INDEX_IDENTITY');
  if (!Array.isArray(index.documents) || index.documents.length < 1 || index.documents.length > MAX_DOCUMENTS) fail('F2_DOCUMENT_COUNT');
  let totalBytes = 0;
  let previous = '';
  const ids = new Set();
  const paths = new Set();
  for (const doc of index.documents) {
    if (!doc || typeof doc !== 'object' || Array.isArray(doc) || JSON.stringify(Object.keys(doc)) !== JSON.stringify(F2_DOCUMENT_KEYS)) fail('F2_DOCUMENT_SCHEMA');
    if (typeof doc.documentId !== 'string' || doc.documentId.length > 160 || !ID_PATTERN.test(doc.documentId) || ids.has(doc.documentId)) fail('F2_DOCUMENT_ID');
    if (previous && ascii(previous, doc.documentId) >= 0) fail('F2_DOCUMENT_ORDER');
    if (!['home', 'pillar', 'article', 'tool', 'editorial'].includes(doc.kind) || expectedKind(doc.documentId) !== doc.kind) fail(`F2_DOCUMENT_KIND id=${doc.documentId}`);
    if (typeof doc.title !== 'string' || !doc.title || doc.title !== doc.title.replace(/\s+/gu, ' ').trim()) fail(`F2_DOCUMENT_TITLE id=${doc.documentId}`);
    if (typeof doc.description !== 'string' || !doc.description || doc.description !== doc.description.replace(/\s+/gu, ' ').trim()) fail(`F2_DOCUMENT_DESCRIPTION id=${doc.documentId}`);
    if (doc.language !== 'es' || !canonicalPathValid(doc.canonicalPath) || paths.has(doc.canonicalPath) || doc.canonicalUrl !== `${SITE}${doc.canonicalPath}`) fail(`F2_DOCUMENT_CANONICAL id=${doc.documentId}`);
    if (doc.markdownPath !== `/agent-content/v1/documents/${doc.documentId}.md`) fail(`F2_DOCUMENT_PATH id=${doc.documentId}`);
    if (doc.datePublished !== null && !isoDate(doc.datePublished)) fail(`F2_DOCUMENT_PUBLISHED_DATE id=${doc.documentId}`);
    if (doc.dateModified !== null && !isoDate(doc.dateModified)) fail(`F2_DOCUMENT_MODIFIED_DATE id=${doc.documentId}`);
    if (!HASH_PATTERN.test(doc.htmlSha256) || !HASH_PATTERN.test(doc.markdownSha256)) fail(`F2_DOCUMENT_HASH id=${doc.documentId}`);
    if (!Number.isInteger(doc.markdownBytes) || doc.markdownBytes < 1 || doc.markdownBytes > MAX_DOCUMENT_BYTES) fail(`F2_DOCUMENT_SIZE id=${doc.documentId}`);
    totalBytes += doc.markdownBytes;
    if (totalBytes > MAX_CORPUS_BYTES) fail(`F2_CORPUS_LIMIT bytes=${totalBytes} limit=${MAX_CORPUS_BYTES}`);
    ids.add(doc.documentId);
    paths.add(doc.canonicalPath);
    previous = doc.documentId;
  }
  const rows = index.documents.map((doc) => [doc.documentId, doc.canonicalPath, doc.markdownSha256]);
  if (sha256(Buffer.from(JSON.stringify(rows), 'utf8')) !== index.corpusSha256) fail('F2_CORPUS_HASH_MISMATCH');
}

function collectSearchText(node, chunks) {
  if (node.type === 'break') { chunks.push(' '); return; }
  if (node.type === 'text' || node.type === 'inlineCode' || node.type === 'code') {
    chunks.push(node.value);
    if (node.type !== 'text') chunks.push(' ');
    return;
  }
  if (node.type === 'image') { chunks.push(node.alt ?? '', ' '); return; }
  if (node.type === 'html' || node.type === 'definition') return;
  const block = ['root', 'paragraph', 'heading', 'blockquote', 'list', 'listItem', 'table', 'tableRow', 'tableCell'].includes(node.type);
  if (block && chunks.length) chunks.push(' ');
  for (const child of node.children ?? []) collectSearchText(child, chunks);
  if (block) chunks.push(' ');
}

function visibleLabel(node, chunks = []) {
  if (node.type === 'text' || node.type === 'inlineCode' || node.type === 'code') chunks.push(node.value);
  else if (node.type === 'image') chunks.push(node.alt ?? '');
  else if (node.type === 'break') chunks.push(' ');
  else for (const child of node.children ?? []) visibleLabel(child, chunks);
  return chunks.join('');
}

export function extractMarkdownLinks(tree, canonicalUrl, documentId) {
  const definitions = new Map();
  const visitDefinitions = (node) => {
    if (node.type === 'definition') definitions.set(node.identifier, node.url);
    for (const child of node.children ?? []) visitDefinitions(child);
  };
  visitDefinitions(tree);
  const output = [];
  const seen = new Set();
  const walk = (node) => {
    if (node.type === 'link' || node.type === 'linkReference') {
      const destination = node.type === 'link' ? node.url : definitions.get(node.identifier);
      if (typeof destination !== 'string') fail(`MARKDOWN_LINK_UNRESOLVED id=${documentId}`);
      if (/[\u0000-\u001f\u007f]/u.test(destination)) fail(`MARKDOWN_LINK_CONTROL id=${documentId}`);
      let url;
      try { url = new URL(destination, canonicalUrl); }
      catch { fail(`MARKDOWN_LINK_URL_INVALID id=${documentId}`); }
      if (!['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) || url.username || url.password) fail(`MARKDOWN_LINK_SCHEME_INVALID id=${documentId}`);
      const label = visibleLabel(node).replace(/\s+/gu, ' ').trim();
      const item = { label, url: url.href };
      const key = JSON.stringify([item.label, item.url]);
      if (!seen.has(key)) { seen.add(key); output.push(item); }
    }
    for (const child of node.children ?? []) walk(child);
  };
  walk(tree);
  return output;
}

export function tokenize(value) {
  return [...new Set(value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])].sort(ascii);
}

function parseMarkdown(markdown, doc) {
  let tree;
  try { tree = fromMarkdown(markdown, MD_OPTIONS); }
  catch { fail(`MARKDOWN_PARSE_FAILED id=${doc.documentId}`); }
  const chunks = [];
  collectSearchText(tree, chunks);
  return {
    titleTokens: tokenize(doc.title),
    descriptionTokens: tokenize(doc.description),
    bodyTokens: tokenize(chunks.join(' ')),
    links: extractMarkdownLinks(tree, doc.canonicalUrl, doc.documentId),
  };
}

async function resolveBuildRoots(buildDir) {
  const root = resolve(process.cwd(), buildDir);
  for (const candidate of [root, join(root, 'client')]) {
    try {
      if ((await stat(join(candidate, F2_INDEX))).isFile()) {
        const buildRoot = candidate === root && candidate.endsWith(`${sep}client`) ? dirname(candidate) : candidate === root ? root : root;
        return { assetRoot: candidate, buildRoot };
      }
    } catch (error) { if (!['ENOENT', 'ENOTDIR'].includes(error.code)) throw error; }
  }
  return { assetRoot: root, buildRoot: root };
}

async function readF2(buildDir) {
  const { assetRoot, buildRoot } = await resolveBuildRoots(buildDir);
  const indexPath = join(assetRoot, F2_INDEX);
  let rawIndex;
  try { rawIndex = await readFile(indexPath); }
  catch (error) { fail(`F2_INDEX_UNAVAILABLE code=${error.code ?? 'IO'}`, 1); }
  let index;
  try { index = JSON.parse(fatalUtf8(rawIndex, 'F2_INDEX')); }
  catch (error) { if (error instanceof AgentApiError) throw error; fail('F2_INDEX_JSON_INVALID'); }
  validateF2Index(index, rawIndex);
  const documents = [];
  const sourceFiles = [{ path: F2_INDEX, bytes: rawIndex.length, sha256: sha256(rawIndex) }];
  for (const doc of index.documents) {
    const absolute = resolve(assetRoot, `.${doc.markdownPath}`);
    if (!absolute.startsWith(`${resolve(assetRoot, 'agent-content/v1/documents')}${sep}`)) fail(`F2_DOCUMENT_PATH_UNSAFE id=${doc.documentId}`);
    let bytes;
    try { bytes = await readFile(absolute); }
    catch (error) { fail(`F2_DOCUMENT_UNAVAILABLE id=${doc.documentId} code=${error.code ?? 'IO'}`, 1); }
    if (bytes.length !== doc.markdownBytes || bytes.length > MAX_DOCUMENT_BYTES || sha256(bytes) !== doc.markdownSha256) fail(`F2_DOCUMENT_INTEGRITY id=${doc.documentId}`);
    const markdown = fatalUtf8(bytes, `F2_DOCUMENT id=${doc.documentId}`);
    documents.push({ documentId: doc.documentId, ...parseMarkdown(markdown, doc) });
    sourceFiles.push({ path: doc.markdownPath.slice(1), bytes: bytes.length, sha256: sha256(bytes) });
  }
  return { assetRoot, buildRoot, index, documents, sourceFiles };
}

function readJson(path) {
  return readFile(path, 'utf8').then((text) => JSON.parse(text));
}

function addFormats(ajv) {
  ajv.addFormat('date-time', { type: 'string', validate: isoDate });
  ajv.addFormat('uri', { type: 'string', validate: (value) => { try { return new URL(value).href === value; } catch { return false; } } });
  return ajv;
}

function validateSchemaSet(schema, openapi, capabilities) {
  if (schema.$schema !== 'https://json-schema.org/draft/2020-12/schema' || schema.$id !== 'urn:ctp:agent-api:1') fail('SCHEMA_IDENTITY_INVALID');
  if (capabilities.schemaVersion !== 'agent-capabilities/1' || capabilities.siteOrigin !== SITE || capabilities.openapiPath !== '/agent-api/v1/openapi.json' || capabilities.apiCatalogPath !== '/.well-known/api-catalog') fail('CAPABILITIES_IDENTITY_INVALID');
  const operationIds = ['listAgentDocuments', 'searchAgentDocuments', 'readAgentDocument'];
  if (!Array.isArray(capabilities.operations) || capabilities.operations.length !== 3 || JSON.stringify(capabilities.operations.map((entry) => entry.operationId)) !== JSON.stringify(operationIds)) fail('CAPABILITIES_OPERATIONS_INVALID');
  const apiPaths = ['/api/agent/v1/catalog', '/api/agent/v1/search', '/api/agent/v1/documents/{documentId}'];
  for (let i = 0; i < 3; i += 1) {
    const operation = capabilities.operations[i];
    if (operation.path !== apiPaths[i] || JSON.stringify(operation.methods) !== JSON.stringify(['GET', 'HEAD', 'OPTIONS'])) fail(`CAPABILITIES_OPERATION_INVALID id=${operation.operationId}`);
  }
  if (!Array.isArray(capabilities.skills) || capabilities.skills.length !== 1) fail('CAPABILITIES_SKILLS_INVALID');
  const skill = capabilities.skills[0];
  if (skill.name !== 'buscar-leer-citar' || skill.description !== 'Busca guías de Cuida tu Perro Viejo, lee el contenido completo y cita su URL canónica y sus fuentes originales.' || skill.path !== '/.well-known/agent-skills/buscar-leer-citar/SKILL.md' || skill.urn !== 'urn:air:cuidatuperroviejo.com:skill:buscar-leer-citar') fail('CAPABILITIES_SKILL_INVALID');
  const expectedPaths = apiPaths;
  if (openapi.openapi !== '3.1.1' || openapi.info?.version !== '1.0.0' || JSON.stringify(openapi.servers) !== JSON.stringify([{ url: SITE }]) || JSON.stringify(Object.keys(openapi.paths)) !== JSON.stringify(expectedPaths)) fail('OPENAPI_IDENTITY_OR_PATHS_INVALID');
  const methods = ['get', 'head', 'options'];
  const expectedIds = [
    ['listAgentDocuments', 'headAgentCatalog', 'optionsAgentCatalog'],
    ['searchAgentDocuments', 'headAgentSearch', 'optionsAgentSearch'],
    ['readAgentDocument', 'headAgentDocument', 'optionsAgentDocument'],
  ];
  for (let i = 0; i < expectedPaths.length; i += 1) {
    const path = openapi.paths[expectedPaths[i]];
    if (JSON.stringify(Object.keys(path)) !== JSON.stringify(methods)) fail(`OPENAPI_METHOD_SET_INVALID path=${expectedPaths[i]}`);
    for (let j = 0; j < methods.length; j += 1) {
      const operation = path[methods[j]];
      if (!operation || operation.operationId !== expectedIds[i][j] || JSON.stringify(operation.security) !== '[]') fail(`OPENAPI_OPERATION_INVALID path=${expectedPaths[i]} method=${methods[j]}`);
    }
  }
  const componentNames = ['Document', 'Link', 'Result', 'Catalog', 'Search', 'Read', 'Error'];
  if (JSON.stringify(Object.keys(openapi.components?.schemas ?? {})) !== JSON.stringify(componentNames)) fail('OPENAPI_COMPONENT_SET_INVALID');
  const normalizeSchemaRefs = (value) => {
    if (Array.isArray(value)) return value.map(normalizeSchemaRefs);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, normalizeSchemaRefs(entry)]));
    return typeof value === 'string' ? value.replaceAll('#/components/schemas/', '#/$defs/') : value;
  };
  for (const name of componentNames) if (JSON.stringify(normalizeSchemaRefs(openapi.components.schemas[name])) !== JSON.stringify(schema.$defs[name])) fail(`OPENAPI_SCHEMA_DIVERGENCE name=${name}`);
  const serialized = JSON.stringify(openapi);
  for (const ref of serialized.matchAll(/\$ref":"([^"]+)"/gu)) if (!ref[1].startsWith('#/')) fail('OPENAPI_REMOTE_REF_FORBIDDEN');
  const ajv = addFormats(new Ajv2020({ allErrors: true, strict: true, validateFormats: true }));
  try { ajv.compile(schema); }
  catch (error) { fail(`SCHEMA_COMPILE_FAILED ${error.message}`); }
  return ajv;
}

function deriveLinkset(capabilities) {
  const [catalog, search, read] = capabilities.operations;
  return { linkset: [
    { anchor: `${SITE}${capabilities.apiCatalogPath}`, item: [
      { href: `${SITE}${catalog.path}`, type: catalog.type, title: catalog.title },
      { href: `${SITE}${search.path}?q=cushing`, type: search.type, title: search.title },
      { href: `${SITE}${read.examplePath}`, type: read.type, title: read.title },
    ] },
    { anchor: `${SITE}${catalog.path}`, 'service-desc': [
      { href: `${SITE}${capabilities.openapiPath}`, type: 'application/vnd.oai.openapi+json', title: 'API pública de contenido v1' },
    ] },
  ] };
}

function deriveArd(capabilities) {
  const api = capabilities.ardApiEntry;
  const skill = capabilities.skills[0];
  return {
    specVersion: '1.0',
    host: { displayName: 'Cuida tu Perro Viejo', identifier: 'cuidatuperroviejo.com' },
    entries: [
      { ...api, url: `${SITE}${capabilities.openapiPath}` },
      { identifier: skill.urn, displayName: skill.displayName, type: 'text/markdown', url: `${SITE}${skill.path}`, description: skill.description, representativeQueries: skill.representativeQueries },
    ].sort((a, b) => ascii(a.identifier, b.identifier)),
  };
}

function outputPathMap(assets) {
  return new Map([
    ['agent-api/v1/query-index.json', assets.queryIndex],
    ['agent-api/v1/openapi.json', assets.openapi],
    ['.well-known/api-catalog', assets.linkset],
    ['.well-known/agent-skills/index.json', assets.skillsIndex],
    ['.well-known/agent-skills/buscar-leer-citar/SKILL.md', assets.skill],
    ['.well-known/ard.json', assets.ard],
    ['.well-known/ai-catalog.json', assets.ard],
  ]);
}

export async function buildArtifacts(buildDir, root = ROOT) {
  const [f2, schema, openapiTemplate, capabilities, skillBytes] = await Promise.all([
    readF2(buildDir),
    readJson(join(root, 'src/agent-api/schema.json')),
    readJson(join(root, 'src/agent-api/openapi.template.json')),
    readJson(join(root, 'src/agent-api/capabilities.json')),
    readFile(join(root, 'src/agent-skills/buscar-leer-citar/SKILL.md')),
  ]);
  byteLimit('SKILL', skillBytes.length, MAX_SKILL_BYTES);
  const skillText = fatalUtf8(skillBytes, 'SKILL');
  if (!skillText.endsWith('\n') || skillText.includes('\r') || skillText.charCodeAt(0) === 0xfeff) fail('SKILL_LINE_ENDING_INVALID');
  const expectedFrontmatter = `---\nname: buscar-leer-citar\ndescription: ${capabilities.skills[0].description}\n---\n`;
  if (!skillText.startsWith(expectedFrontmatter)) fail('SKILL_FRONTMATTER_INVALID');
  const openapi = structuredClone(openapiTemplate);
  if (typeof openapi.info?.description !== 'string' || !openapi.info.description.includes(OPENAPI_DOCUMENTARY_SENTENCE)) fail('OPENAPI_DOCUMENTARY_MARKER_MISSING');
  openapi.info.description = openapi.info.description.replace(OPENAPI_DOCUMENTARY_SENTENCE, '');
  if (openapi.info.description.includes(OPENAPI_DOCUMENTARY_SENTENCE)) fail('OPENAPI_DOCUMENTARY_MARKER_DUPLICATED');
  validateSchemaSet(schema, openapi, capabilities);
  const docs = new Map(f2.documents.map((doc) => [doc.documentId, doc]));
  const queryIndex = {
    schemaVersion: 'agent-query/1',
    corpusSha256: f2.index.corpusSha256,
    documents: f2.index.documents.map((doc) => {
      const indexed = docs.get(doc.documentId);
      return { documentId: doc.documentId, markdownSha256: doc.markdownSha256, titleTokens: indexed.titleTokens, descriptionTokens: indexed.descriptionTokens, bodyTokens: indexed.bodyTokens, links: indexed.links };
    }),
  };
  const queryBytes = jsonBytes(queryIndex);
  byteLimit('QUERY_INDEX', queryBytes.length, MAX_QUERY_INDEX_BYTES);
  const linksetBytes = jsonBytes(deriveLinkset(capabilities));
  const ardBytes = jsonBytes(deriveArd(capabilities));
  const skillsIndexBytes = jsonBytes({
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [{ name: capabilities.skills[0].name, type: 'skill-md', description: capabilities.skills[0].description, url: `${SITE}${capabilities.skills[0].path}`, digest: `sha256:${sha256(skillBytes)}` }],
  });
  const openapiBytes = jsonBytes(openapi);
  for (const [name, bytes] of [['OPENAPI', openapiBytes], ['LINKSET', linksetBytes], ['ARD', ardBytes], ['SKILLS_INDEX', skillsIndexBytes]]) byteLimit(name, bytes.length, MAX_DESCRIPTOR_BYTES);
  const validator = addFormats(new Ajv2020({ allErrors: true, strict: true, validateFormats: true }));
  const makeValidator = (name) => {
    const target = { $schema: schema.$schema, $ref: `#/$defs/${name}`, $defs: schema.$defs };
    try { return validator.compile(target); }
    catch (error) { fail(`SCHEMA_COMPILE_FAILED name=${name} ${error.message}`); }
  };
  let queryValidator;
  try { queryValidator = makeValidator('QueryIndex'); }
  catch (error) { fail(`SCHEMA_COMPILE_FAILED ${error.message}`); }
  if (!queryValidator(queryIndex)) fail(`QUERY_INDEX_SCHEMA_INVALID ${validator.errorsText(queryValidator.errors)}`);
  const skillValidator = makeValidator('SkillsIndex');
  if (!skillValidator(JSON.parse(skillsIndexBytes.toString('utf8')))) fail(`SKILLS_INDEX_SCHEMA_INVALID ${validator.errorsText(skillValidator.errors)}`);
  const ardValidator = makeValidator('ArdCompatibilityManifest');
  for (const label of ['ARD', 'AI_CATALOG_COMPAT']) if (!ardValidator(JSON.parse(ardBytes.toString('utf8')))) fail(`${label}_SCHEMA_INVALID ${validator.errorsText(ardValidator.errors)}`);
  const assets = { queryIndex: queryBytes, openapi: openapiBytes, linkset: linksetBytes, skillsIndex: skillsIndexBytes, skill: skillBytes, ard: ardBytes };
  const outputFiles = [...outputPathMap(assets)].map(([path, bytes]) => ({ path, bytes: bytes.length, sha256: sha256(bytes) }));
  const manifestBytes = jsonBytes({
    schemaVersion: 'agent-api-build-evidence/1',
    corpusSha256: f2.index.corpusSha256,
    documentCount: f2.index.documents.length,
    sourceFiles: f2.sourceFiles,
    outputs: outputFiles,
  });
  return {
    assetRoot: f2.assetRoot,
    buildRoot: f2.buildRoot,
    source: { corpusSha256: f2.index.corpusSha256, documents: f2.index.documents, queryIndex },
    assets,
    manifestBytes,
  };
}

async function assertDestinationsMissing(assetRoot, paths) {
  for (const path of paths) {
    const target = resolve(assetRoot, path);
    if (!target.startsWith(`${assetRoot}${sep}`)) fail(`OUTPUT_PATH_UNSAFE path=${path}`);
    try { await stat(target); fail(`OUTPUT_COLLISION path=${path}`); }
    catch (error) { if (error instanceof AgentApiError) throw error; if (error.code !== 'ENOENT') fail(`OUTPUT_IO_ERROR path=${path} code=${error.code}`, 1); }
  }
}

export async function writeArtifacts(buildDir, root = ROOT) {
  const result = await buildArtifacts(buildDir, root);
  const outputs = outputPathMap(result.assets);
  const assetRoot = resolve(result.assetRoot);
  await assertDestinationsMissing(assetRoot, [...outputs.keys()]);
  const manifestPath = join(resolve(result.buildRoot), 'agent-api-build-manifest.json');
  try { await stat(manifestPath); fail('OUTPUT_COLLISION path=agent-api-build-manifest.json'); }
  catch (error) { if (error instanceof AgentApiError) throw error; if (error.code !== 'ENOENT') fail(`OUTPUT_IO_ERROR path=agent-api-build-manifest.json code=${error.code}`, 1); }
  const stage = join(resolve(result.buildRoot), `.agent-api-staging-${process.pid}-${Date.now()}`);
  const moved = [];
  try {
    await mkdir(stage, { recursive: false });
    for (const [path, bytes] of outputs) {
      const staged = join(stage, relative(result.buildRoot, join(assetRoot, path)));
      await mkdir(dirname(staged), { recursive: true });
      await writeFile(staged, bytes, { flag: 'wx' });
    }
    await writeFile(join(stage, 'agent-api-build-manifest.json'), result.manifestBytes, { flag: 'wx' });
    for (const path of outputs.keys()) {
      const target = join(assetRoot, path);
      await mkdir(dirname(target), { recursive: true });
      await rename(join(stage, relative(result.buildRoot, target)), target);
      moved.push(target);
    }
    await rename(join(stage, 'agent-api-build-manifest.json'), manifestPath);
    moved.push(manifestPath);
  } catch (error) {
    await Promise.all(moved.map((path) => rm(path, { force: true })));
    throw error;
  } finally { await rm(stage, { recursive: true, force: true }); }
  return result;
}

async function listFiles(directory, baseRoot = directory) {
  const results = [];
  const walk = async (dir) => {
    let entries;
    try { entries = await readdir(dir, { withFileTypes: true }); }
    catch (error) { if (error.code === 'ENOENT') return; throw error; }
    for (const entry of entries) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (entry.isFile()) results.push(relative(baseRoot, path).split(sep).join('/'));
      else fail(`OUTPUT_SPECIAL_FILE path=${relative(baseRoot, path)}`);
    }
  };
  await walk(directory);
  return results.sort(ascii);
}

export async function checkArtifacts(buildDir, root = ROOT) {
  const result = await buildArtifacts(buildDir, root);
  const expected = outputPathMap(result.assets);
  const actualPaths = await Promise.all([
    listFiles(join(result.assetRoot, 'agent-api/v1'), result.assetRoot),
    listFiles(join(result.assetRoot, '.well-known'), result.assetRoot),
  ]);
  const allActual = [...actualPaths[0], ...actualPaths[1]];
  const actualReserved = allActual.filter((path) => path.startsWith('agent-api/v1/') || path === '.well-known/api-catalog' || path.startsWith('.well-known/agent-skills/') || path === '.well-known/ard.json' || path === '.well-known/ai-catalog.json').sort(ascii);
  const expectedPaths = [...expected.keys()].sort(ascii);
  if (JSON.stringify(actualReserved) !== JSON.stringify(expectedPaths)) fail('OUTPUT_SET_MISMATCH');
  for (const [path, bytes] of expected) {
    const actual = await readFile(join(result.assetRoot, path));
    if (!actual.equals(bytes)) fail(`OUTPUT_BYTES_MISMATCH path=${path}`);
  }
  let actualManifest;
  try { actualManifest = await readFile(join(result.buildRoot, 'agent-api-build-manifest.json')); }
  catch (error) { if (error.code === 'ENOENT') fail('OUTPUT_MANIFEST_MISSING'); throw error; }
  if (!actualManifest.equals(result.manifestBytes)) fail('OUTPUT_MANIFEST_BYTES_MISMATCH');
  return result;
}

function parseCheckArgs(args) {
  if (args.length !== 3 || args[0] !== 'check' || args[1] !== '--build-dir' || !args[2] || args[2].startsWith('-')) fail('Uso: node scripts/agent-readiness/agent-api.mjs check --build-dir <directorio>');
  return resolve(process.cwd(), args[2]);
}

export async function runCheck(args) {
  try {
    const buildDir = parseCheckArgs(args);
    const result = await checkArtifacts(buildDir);
    process.stdout.write(`OK: query-index y contratos F3 verificados sin modificar assets (${result.assets.queryIndex.length} bytes de índice).\n`);
    return 0;
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    return error.exitCode ?? (['ENOENT', 'EACCES', 'EPERM'].includes(error.code) ? 1 : 3);
  }
}

export function agentApiIntegration() {
  let config;
  return {
    name: 'agent-readiness-api-generation',
    hooks: {
      'astro:config:done': ({ config: resolvedConfig }) => { config = resolvedConfig; },
      'astro:build:done': async ({ logger }) => {
        if (!config?.build?.client) fail('F3A config.build.client no resuelta.', 1);
        const buildDir = fileURLToPath(config.build.client);
        const result = await writeArtifacts(buildDir);
        if (resolve(result.assetRoot) !== resolve(fileURLToPath(config.build.client))) fail('F3A assets de build no coinciden con config.build.client.', 1);
        logger.info(`Artifacts F3A generados: ${result.source.documents.length} documentos, ${result.assets.queryIndex.length} bytes de query-index.`);
      },
    },
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) process.exitCode = await runCheck(process.argv.slice(2));
