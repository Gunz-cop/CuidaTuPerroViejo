import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cp, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfm } from 'micromark-extension-gfm';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { buildArtifacts, checkArtifacts, extractMarkdownLinks, writeArtifacts } from '../../scripts/agent-readiness/agent-api.mjs';

const fixture = 'tests/agent-readiness/fixtures/f3/build';
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const temp = async () => mkdtemp(join(tmpdir(), 'ctpv-f3-generation-'));

test('query-index preserves the complete F2 identity and indexes GFM after character 4000', async () => {
  const result = await buildArtifacts(fixture);
  const index = JSON.parse(await readFile(join(fixture, 'client/agent-content/v1/index.json'), 'utf8'));
  const markdown = await readFile(join(fixture, 'client/agent-content/v1/documents/article--f3-fixture.md'));
  const query = result.source.queryIndex;

  assert.equal(query.schemaVersion, 'agent-query/1');
  assert.equal(query.corpusSha256, index.corpusSha256);
  assert.deepEqual(query.documents.map(({ documentId, markdownSha256 }) => ({ documentId, markdownSha256 })), index.documents.map(({ documentId, markdownSha256 }) => ({ documentId, markdownSha256 })));
  assert.equal(index.documents[0].markdownBytes, markdown.length);
  assert.equal(index.documents[0].markdownSha256, hash(markdown));
  assert.equal(index.documents[0].title, 'Guía de prueba para Cushing en perros mayores');

  const doc = query.documents[0];
  const oracle = parseOracle(markdown.toString('utf8'), index.documents[0]);
  assert.deepEqual(doc.titleTokens, oracle.titleTokens);
  assert.deepEqual(doc.descriptionTokens, oracle.descriptionTokens);
  assert.deepEqual(doc.bodyTokens, oracle.bodyTokens);
  assert.deepEqual(doc.links, oracle.links);
  assert.ok(doc.bodyTokens.includes('posterior'));
  assert.ok(doc.bodyTokens.includes('movilidad'));
  assert.ok(doc.bodyTokens.includes('codigo'));
  assert.deepEqual(doc.bodyTokens, [...new Set(doc.bodyTokens)].sort());
  assert.deepEqual(doc.links, [
    { label: 'Fuente posterior', url: 'https://example.org/fuente?artrosis=senior#evidencia' },
    { label: 'contacto', url: 'mailto:equipo@example.org' },
    { label: 'teléfono', url: 'tel:+34123456789' },
  ]);
  assert.ok(Buffer.from(markdown).indexOf(Buffer.from('Fuente posterior')) > 4000);
});

test('F2 integrity, missing documents, invalid references, and malformed source fail closed', async (t) => {
  const directory = await temp();
  t.after(() => rm(directory, { recursive: true, force: true }));
  const build = join(directory, 'build');
  await cp(fixture, build, { recursive: true });
  const indexPath = join(build, 'client/agent-content/v1/index.json');
  const mdPath = join(build, 'client/agent-content/v1/documents/article--f3-fixture.md');
  const originalIndex = JSON.parse(await readFile(indexPath, 'utf8'));
  const originalMarkdown = await readFile(mdPath);

  const wrongCorpus = structuredClone(originalIndex);
  wrongCorpus.corpusSha256 = '0'.repeat(64);
  await writeFile(indexPath, `${JSON.stringify(wrongCorpus, null, 2)}\n`);
  await assert.rejects(buildArtifacts(build), /F2_CORPUS_HASH_MISMATCH/u);

  await writeFile(indexPath, `${JSON.stringify(originalIndex, null, 2)}\n`);
  await writeFile(mdPath, Buffer.concat([originalMarkdown, Buffer.from('cambio') ]));
  await assert.rejects(buildArtifacts(build), /F2_DOCUMENT_INTEGRITY/u);

  const unresolvedAst = { type: 'root', children: [{ type: 'linkReference', identifier: 'ausente', children: [{ type: 'text', value: 'Fuente sin destino' }] }] };
  assert.throws(() => extractMarkdownLinks(unresolvedAst, originalIndex.documents[0].canonicalUrl, 'article--f3-fixture'), /MARKDOWN_LINK_UNRESOLVED/u);

  const unsafe = Buffer.from('# Prueba\n\n[Fuente][ref]\n\n[ref]: javascript:alert(1)\n');
  const changed = structuredClone(originalIndex);
  changed.documents[0].markdownSha256 = hash(unsafe);
  changed.documents[0].markdownBytes = unsafe.length;
  changed.corpusSha256 = hash(Buffer.from(JSON.stringify(changed.documents.map((doc) => [doc.documentId, doc.canonicalPath, doc.markdownSha256]))));
  await writeFile(indexPath, `${JSON.stringify(changed, null, 2)}\n`);
  await writeFile(mdPath, unsafe);
  await assert.rejects(buildArtifacts(build), /MARKDOWN_LINK_SCHEME_INVALID/u);

  await rm(mdPath);
  await assert.rejects(buildArtifacts(build), /F2_DOCUMENT_UNAVAILABLE/u);
});

test('writer fails on a reserved-path collision without replacing the existing asset', async (t) => {
  const directory = await temp();
  t.after(() => rm(directory, { recursive: true, force: true }));
  const build = join(directory, 'build');
  await cp(fixture, build, { recursive: true });
  const target = join(build, 'client/agent-api/v1/query-index.json');
  await (await import('node:fs/promises')).mkdir(join(build, 'client/agent-api/v1'), { recursive: true });
  await writeFile(target, 'existing sentinel');

  await assert.rejects(writeArtifacts(build), /OUTPUT_COLLISION/u);
  assert.equal(await readFile(target, 'utf8'), 'existing sentinel');
  assert.deepEqual((await readdir(join(build, 'client/.well-known')).catch(() => [])), []);
});

test('read-only check accepts generated bytes, detects orphan files, and leaves the build unchanged', async (t) => {
  const directory = await temp();
  t.after(() => rm(directory, { recursive: true, force: true }));
  const build = join(directory, 'build');
  await cp(fixture, build, { recursive: true });
  await writeArtifacts(build);
  assert.deepEqual(await readFile(join(build, 'client/.well-known/ard.json')), await readFile(join(build, 'client/.well-known/ai-catalog.json')));
  assert.ok((await readFile(join(build, 'agent-api-build-manifest.json'), 'utf8')).includes('agent-api-build-evidence/1'));
  await assert.rejects(readFile(join(build, 'client/agent-api-build-manifest.json')), { code: 'ENOENT' });
  const before = await treeDigest(build);
  await checkArtifacts(build);
  assert.deepEqual(await treeDigest(build), before);

  await writeFile(join(build, 'client/agent-api/v1/orphan.json'), '{}\n');
  await assert.rejects(checkArtifacts(build), /OUTPUT_SET_MISMATCH/u);
});

async function treeDigest(root) {
  const result = [];
  const walk = async (directory) => {
    for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await walk(path);
      else result.push([path.slice(root.length + 1), hash(await readFile(path))]);
    }
  };
  await walk(root);
  return result;
}

function parseOracle(markdown, metadata) {
  const tree = fromMarkdown(markdown, { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] });
  const body = [];
  const definitions = new Map();
  const links = [];
  const pairs = new Set();
  const text = (node, chunks) => {
    if (node.type === 'text' || node.type === 'inlineCode' || node.type === 'code') chunks.push(node.value);
    else if (node.type === 'image') chunks.push(node.alt ?? '', ' ');
    else if (node.type === 'break') chunks.push(' ');
    else if (node.type !== 'html' && node.type !== 'definition') {
      if (['root', 'paragraph', 'heading', 'blockquote', 'list', 'listItem', 'table', 'tableRow', 'tableCell'].includes(node.type)) chunks.push(' ');
      for (const child of node.children ?? []) text(child, chunks);
      if (['root', 'paragraph', 'heading', 'blockquote', 'list', 'listItem', 'table', 'tableRow', 'tableCell'].includes(node.type)) chunks.push(' ');
    }
  };
  const label = (node) => {
    if (node.type === 'text' || node.type === 'inlineCode' || node.type === 'code') return node.value;
    if (node.type === 'image') return node.alt ?? '';
    if (node.type === 'break') return ' ';
    return (node.children ?? []).map(label).join('');
  };
  const visitDefinitions = (node) => {
    if (node.type === 'definition') definitions.set(node.identifier, node.url);
    for (const child of node.children ?? []) visitDefinitions(child);
  };
  const visitLinks = (node) => {
    if (node.type === 'link' || node.type === 'linkReference') {
      const destination = node.type === 'link' ? node.url : definitions.get(node.identifier);
      const url = new URL(destination, metadata.canonicalUrl);
      const item = { label: label(node).replace(/\s+/gu, ' ').trim(), url: url.href };
      const key = JSON.stringify([item.label, item.url]);
      if (!pairs.has(key)) { pairs.add(key); links.push(item); }
    }
    for (const child of node.children ?? []) visitLinks(child);
  };
  const tokens = (value) => [...new Set(value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])].sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  text(tree, body);
  visitDefinitions(tree);
  visitLinks(tree);
  return {
    titleTokens: tokens(metadata.title),
    descriptionTokens: tokens(metadata.description),
    bodyTokens: tokens(body.join(' ')),
    links,
  };
}
