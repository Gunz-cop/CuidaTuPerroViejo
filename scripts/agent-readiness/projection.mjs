#!/usr/bin/env node
import { mkdtemp, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { inventory as runInventory } from './inventory.mjs';
import { sha256 } from './shared.mjs';
import { projectDocument } from './projection-dom.mjs';

const SITE_ORIGIN = 'https://cuidatuperroviejo.com';
const INDEX_PATH = 'agent-content/v1/index.json';
const DOCUMENTS_DIR = 'agent-content/v1/documents';
const MAX_DOCUMENTS = 98;
const MAX_INDEX_BYTES = 512 * 1024;
const MAX_DOCUMENT_BYTES = 512 * 1024;
const MAX_CORPUS_BYTES = 16 * 1024 * 1024;
const ID_PATTERN = /^(home|(?:pillar|article|page)--[a-z0-9]+(?:-[a-z0-9]+)*|tool--(?:calidad-vida|movilidad))$/u;

const ascii = (a, b) => a < b ? -1 : a > b ? 1 : 0;

class ProjectionError extends Error {
  constructor(message, exitCode = 1) { super(message); this.exitCode = exitCode; }
}

function canonicalPathValid(value) {
  if (value === '/') return true;
  if (typeof value !== 'string' || !value.startsWith('/') || value.endsWith('/') || /[%?#\\]/u.test(value) || value.includes('//')) return false;
  const segments = value.slice(1).split('/');
  return segments.every((part) => part !== '.' && part !== '..' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(part));
}

function entryBase(page, metadata, result) {
  if (typeof page.documentId !== 'string' || page.documentId.length > 160 || !ID_PATTERN.test(page.documentId)) throw new ProjectionError(`PROJECTION_ID_INVALID documentId=${page.documentId ?? ''}`);
  if (!canonicalPathValid(page.canonicalPath) || page.canonicalUrl !== `${SITE_ORIGIN}${page.canonicalPath}`) {
    throw new ProjectionError(`PROJECTION_CANONICAL_INVALID documentId=${page.documentId}`);
  }
  if (!['home', 'pillar', 'article', 'tool', 'editorial'].includes(page.kind)) throw new ProjectionError(`PROJECTION_KIND_INVALID documentId=${page.documentId}`);
  const title = String(page.title ?? '').replace(/\s+/gu, ' ').trim();
  const description = String(page.description ?? '').replace(/\s+/gu, ' ').trim();
  if (!title || !description || page.language !== 'es') throw new ProjectionError(`PROJECTION_METADATA_MISSING documentId=${page.documentId}`);
  const markdownPath = `/agent-content/v1/documents/${page.documentId}.md`;
  const markdownBytes = result.markdown.length;
  if (markdownBytes < 1 || markdownBytes > MAX_DOCUMENT_BYTES) throw new ProjectionError(`PROJECTION_DOCUMENT_LIMIT documentId=${page.documentId} bytes=${markdownBytes}`);
  return {
    documentId: page.documentId,
    kind: page.kind,
    title,
    description,
    canonicalPath: page.canonicalPath,
    canonicalUrl: page.canonicalUrl,
    markdownPath,
    language: 'es',
    datePublished: metadata.datePublished,
    dateModified: metadata.dateModified,
    htmlSha256: page.htmlSha256,
    markdownSha256: sha256(result.markdown),
    markdownBytes,
  };
}

function makeIndex(entries) {
  const documents = [...entries].sort((a, b) => ascii(a.documentId, b.documentId));
  const corpusRows = documents.map((entry) => [entry.documentId, entry.canonicalPath, entry.markdownSha256]);
  return {
    schemaVersion: 'agent-content/1',
    siteOrigin: SITE_ORIGIN,
    language: 'es',
    corpusSha256: sha256(Buffer.from(JSON.stringify(corpusRows), 'utf8')),
    documents,
  };
}

function indexBytes(index) {
  return Buffer.from(`${JSON.stringify(index, null, 2)}\n`, 'utf8');
}

async function walkFiles(root, directory = root) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await walkFiles(root, full));
    else if (entry.isFile()) result.push(full);
    else throw new ProjectionError(`PROJECTION_OUTPUT_SPECIAL_FILE path=${relative(root, full).split(sep).join('/')}`);
  }
  return result.sort((a, b) => ascii(relative(root, a).split(sep).join('/'), relative(root, b).split(sep).join('/')));
}

async function inventoryForBuild(buildDir) {
  const scratch = await mkdtemp(join(tmpdir(), 'ctpv-f2-projection-'));
  try {
    const out = join(scratch, 'inventory');
    const code = await runInventory(buildDir, out);
    const data = JSON.parse(await readFile(join(out, 'inventory.json'), 'utf8'));
    if (code !== 0 || data.state !== 'valid' || !Array.isArray(data.pages) || data.errors?.length) {
      const codes = (data.errors ?? []).map((error) => `${error.code}:${error.message}`).join('; ');
      throw new ProjectionError(`PROJECTION_INVENTORY_INVALID ${codes || 'state is not valid'}`);
    }
    return data;
  } finally {
    await rm(scratch, { recursive: true, force: true });
  }
}

async function expectedArtifacts(buildDir) {
  const inventory = await inventoryForBuild(buildDir);
  const assetRoot = resolve(process.cwd(), inventory.assetDirectory);
  const selected = inventory.pages.filter((page) => page.disposition === 'document')
    .sort((a, b) => ascii(a.documentId, b.documentId));
  if (selected.length > MAX_DOCUMENTS) throw new ProjectionError(`PROJECTION_DOCUMENT_COUNT documents=${selected.length} limit=${MAX_DOCUMENTS}`);
  const ids = new Set();
  const canonicals = new Set();
  const paths = new Set();
  const entries = [];
  const artifacts = new Map();
  let markdownTotal = 0;
  for (const page of selected) {
    if (ids.has(page.documentId)) throw new ProjectionError(`PROJECTION_DUPLICATE_ID documentId=${page.documentId}`);
    if (canonicals.has(page.canonicalPath)) throw new ProjectionError(`PROJECTION_DUPLICATE_CANONICAL path=${page.canonicalPath}`);
    if (!canonicalPathValid(page.canonicalPath)) throw new ProjectionError(`PROJECTION_CANONICAL_INVALID documentId=${page.documentId}`);
    ids.add(page.documentId);
    canonicals.add(page.canonicalPath);
    const htmlPath = resolve(assetRoot, page.htmlFile);
    if (!htmlPath.startsWith(`${assetRoot}${sep}`) && htmlPath !== assetRoot) throw new ProjectionError(`PROJECTION_HTML_PATH_UNSAFE documentId=${page.documentId}`);
    const htmlBytes = await readFile(htmlPath);
    const htmlSha256 = sha256(htmlBytes);
    page.htmlSha256 = htmlSha256;
    const output = projectDocument(page, htmlBytes);
    const entry = entryBase(page, output.metadata, output);
    if (paths.has(entry.markdownPath)) throw new ProjectionError(`PROJECTION_DUPLICATE_MARKDOWN_PATH path=${entry.markdownPath}`);
    paths.add(entry.markdownPath);
    markdownTotal += output.markdown.length;
    if (markdownTotal > MAX_CORPUS_BYTES) throw new ProjectionError(`PROJECTION_CORPUS_LIMIT bytes=${markdownTotal} limit=${MAX_CORPUS_BYTES}`);
    entries.push(entry);
    artifacts.set(entry.markdownPath.slice(1), output.markdown);
  }
  const index = makeIndex(entries);
  const indexBody = indexBytes(index);
  if (indexBody.length > MAX_INDEX_BYTES) throw new ProjectionError(`PROJECTION_INDEX_LIMIT bytes=${indexBody.length} limit=${MAX_INDEX_BYTES}`);
  artifacts.set(INDEX_PATH, indexBody);
  return { inventory, assetRoot, index, artifacts, markdownTotal };
}

function assertClosedIndex(index, artifacts) {
  const rootKeys = ['schemaVersion', 'siteOrigin', 'language', 'corpusSha256', 'documents'];
  if (JSON.stringify(Object.keys(index)) !== JSON.stringify(rootKeys)) throw new ProjectionError('PROJECTION_INDEX_SCHEMA root keys/order invalid');
  if (index.schemaVersion !== 'agent-content/1' || index.siteOrigin !== SITE_ORIGIN || index.language !== 'es' || !/^[a-f0-9]{64}$/u.test(index.corpusSha256)) {
    throw new ProjectionError('PROJECTION_INDEX_SCHEMA root values invalid');
  }
  const keys = ['documentId', 'kind', 'title', 'description', 'canonicalPath', 'canonicalUrl', 'markdownPath', 'language', 'datePublished', 'dateModified', 'htmlSha256', 'markdownSha256', 'markdownBytes'];
  const ids = new Set(); const canonicals = new Set(); const markdownPaths = new Set();
  for (const entry of index.documents) {
    if (!entry || JSON.stringify(Object.keys(entry)) !== JSON.stringify(keys)) throw new ProjectionError('PROJECTION_INDEX_SCHEMA entry keys/order invalid');
    if (typeof entry.documentId !== 'string' || entry.documentId.length > 160 || !ID_PATTERN.test(entry.documentId)) throw new ProjectionError('PROJECTION_INDEX_ID_INVALID');
    if (ids.has(entry.documentId)) throw new ProjectionError('PROJECTION_INDEX_DUPLICATE_ID');
    if (!canonicalPathValid(entry.canonicalPath) || canonicals.has(entry.canonicalPath) || entry.canonicalUrl !== `${SITE_ORIGIN}${entry.canonicalPath}`) throw new ProjectionError(`PROJECTION_INDEX_CANONICAL documentId=${entry.documentId}`);
    if (entry.markdownPath !== `/agent-content/v1/documents/${entry.documentId}.md` || markdownPaths.has(entry.markdownPath)) throw new ProjectionError(`PROJECTION_INDEX_MARKDOWN_PATH documentId=${entry.documentId}`);
    if (!Number.isInteger(entry.markdownBytes) || entry.markdownBytes < 1 || entry.markdownBytes > MAX_DOCUMENT_BYTES || !/^[a-f0-9]{64}$/u.test(entry.markdownSha256) || !/^[a-f0-9]{64}$/u.test(entry.htmlSha256)) throw new ProjectionError(`PROJECTION_INDEX_HASH_OR_SIZE documentId=${entry.documentId}`);
    if (entry.title !== entry.title.trim() || !entry.title || entry.description !== entry.description.trim() || !entry.description || entry.language !== 'es') throw new ProjectionError(`PROJECTION_INDEX_TEXT documentId=${entry.documentId}`);
    for (const key of ['datePublished', 'dateModified']) if (entry[key] !== null && (typeof entry[key] !== 'string' || Number.isNaN(Date.parse(entry[key])))) throw new ProjectionError(`PROJECTION_INDEX_DATE documentId=${entry.documentId}`);
    const body = artifacts.get(entry.markdownPath.slice(1));
    if (!body || body.length !== entry.markdownBytes || sha256(body) !== entry.markdownSha256) throw new ProjectionError(`PROJECTION_INDEX_BODY_MISMATCH documentId=${entry.documentId}`);
    ids.add(entry.documentId); canonicals.add(entry.canonicalPath); markdownPaths.add(entry.markdownPath);
  }
  const corpus = sha256(Buffer.from(JSON.stringify(index.documents.map((entry) => [entry.documentId, entry.canonicalPath, entry.markdownSha256])), 'utf8'));
  if (corpus !== index.corpusSha256) throw new ProjectionError('PROJECTION_CORPUS_HASH_MISMATCH');
}

async function writeProjection(buildDir) {
  const { assetRoot, artifacts, index } = await expectedArtifacts(buildDir);
  assertClosedIndex(index, artifacts);
  const target = join(assetRoot, 'agent-content');
  try { await stat(target); throw new ProjectionError('PROJECTION_DESTINATION_EXISTS path=agent-content'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const stage = await mkdtemp(join(assetRoot, '.agent-content-staging-'));
  try {
    for (const [path, bytes] of [...artifacts.entries()].sort((a, b) => ascii(a[0], b[0]))) {
      const stagePath = path.replace(/^agent-content\//u, '');
      const destination = join(stage, stagePath);
      const relativePath = relative(stage, destination);
      if (relativePath.startsWith(`..${sep}`) || relativePath === '..') throw new ProjectionError('PROJECTION_OUTPUT_PATH_UNSAFE');
      const { mkdir } = await import('node:fs/promises');
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, bytes, { flag: 'wx' });
    }
    await rename(stage, target);
  } catch (error) {
    await rm(stage, { recursive: true, force: true });
    throw error;
  }
  return { assetRoot, index, artifacts };
}

export function projectionIntegration() {
  let resolvedConfig;
  return {
    name: 'agent-readiness-markdown-projection',
    hooks: {
      'astro:config:done': ({ config }) => { resolvedConfig = config; },
      'astro:build:done': async ({ logger }) => {
        if (!resolvedConfig?.build?.client) throw new Error('F2A: config.build.client no resuelta.');
        const assetRoot = fileURLToPath(resolvedConfig.build.client);
        const result = await writeProjection(resolve(process.cwd(), 'dist'));
        if (resolve(result.assetRoot) !== resolve(assetRoot)) throw new Error(`F2A: assets del inventario (${result.assetRoot}) no coinciden con config.build.client (${assetRoot}).`);
        logger.info(`Proyección agent-content/v1 generada: ${result.index.documents.length} documentos, ${result.artifacts.get(INDEX_PATH).length} bytes de índice.`);
      },
    },
  };
}

async function listProjectionFiles(root) {
  const absolute = join(root, 'agent-content');
  const result = await walkFiles(absolute);
  return new Set(result.map((file) => relative(root, file).split(sep).join('/')));
}

async function checkBuild(buildDir) {
  let expected;
  try { expected = await expectedArtifacts(buildDir); }
  catch (error) {
    if (error instanceof ProjectionError) throw error;
    if (error.code === 'ENOENT' || error.code === 'EACCES' || error.code === 'EPERM') throw new ProjectionError(`PROJECTION_IO_ERROR ${error.code}`, 3);
    throw new ProjectionError(`PROJECTION_BUILD_ERROR ${error.message}`, 1);
  }
  const target = join(expected.assetRoot, 'agent-content');
  let actualFiles;
  try { actualFiles = await listProjectionFiles(expected.assetRoot); }
  catch (error) {
    if (error.code === 'ENOENT') throw new ProjectionError('PROJECTION_OUTPUT_MISSING', 1);
    throw new ProjectionError(`PROJECTION_IO_ERROR ${error.code ?? ''}`, 3);
  }
  const expectedFiles = new Set(expected.artifacts.keys());
  if (actualFiles.size !== expectedFiles.size || [...expectedFiles].some((path) => !actualFiles.has(path))) throw new ProjectionError('PROJECTION_OUTPUT_SET_MISMATCH', 1);
  assertClosedIndex(expected.index, expected.artifacts);
  const actualIndex = await readFile(join(target, 'v1/index.json'));
  const expectedIndex = expected.artifacts.get(INDEX_PATH);
  if (!actualIndex.equals(expectedIndex)) throw new ProjectionError('PROJECTION_INDEX_BYTES_MISMATCH', 1);
  for (const [path, bytes] of expected.artifacts) {
    if (path === INDEX_PATH) continue;
    const actual = await readFile(join(expected.assetRoot, path));
    if (!actual.equals(bytes)) throw new ProjectionError(`PROJECTION_DOCUMENT_BYTES_MISMATCH path=${path}`, 1);
  }
}

function parseCheckArgs(args) {
  if (args.length !== 3 || args[0] !== 'check' || args[1] !== '--build-dir' || !args[2] || args[2].startsWith('-')) {
    throw new ProjectionError('Uso: node scripts/agent-readiness/projection.mjs check --build-dir <directorio>', 3);
  }
  return resolve(process.cwd(), args[2]);
}

export async function runProjectionCheck(args) {
  try {
    const buildDir = parseCheckArgs(args);
    await checkBuild(buildDir);
    process.stdout.write('OK: índice y Markdown F2 reproducidos byte por byte; conjunto exacto sin modificar assets.\n');
    return 0;
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    return error.exitCode ?? 3;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  process.exitCode = await runProjectionCheck(process.argv.slice(2));
}

export { expectedArtifacts, makeIndex, writeProjection };
