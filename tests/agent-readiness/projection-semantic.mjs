import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { parse as parseHtml } from 'parse5';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfm } from 'micromark-extension-gfm';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { inventory } from '../../scripts/agent-readiness/inventory.mjs';

const buildDir = resolve(process.argv[2] ?? 'dist');
const scratch = await mkdtemp(join(tmpdir(), 'ctpv-f2-semantic-'));
const mdOptions = { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] };
const skippedTags = new Set(['nav', 'script', 'style', 'noscript', 'iframe', 'template', 'svg', 'form', 'button', 'input', 'select', 'textarea', 'progress', 'label', 'source']);
const asAttrs = (node) => Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name.toLowerCase(), value]));
const kids = (node) => node.childNodes ?? [];
const visit = (root, callback) => {
  const result = [];
  const walk = (node) => { if (callback(node)) result.push(node); for (const child of kids(node)) walk(child); if (node.content) walk(node.content); };
  walk(root);
  return result;
};
const textHtml = (node) => {
  let result = '';
  const walk = (current) => {
    if (excluded(current)) return;
    if (current.nodeName === '#text') result += current.value;
    for (const child of kids(current)) walk(child);
    if (current.content) walk(current.content);
  };
  walk(node);
  return result.replace(/\s+/gu, ' ').trim();
};
const textMd = (node) => {
  if (node.type === 'image') return node.alt ?? '';
  if (['text', 'inlineCode', 'code'].includes(node.type)) return node.value;
  return (node.children ?? []).map(textMd).join('');
};
const semanticText = (value) => value.normalize('NFC').replace(/\s+/gu, '');
const hasClass = (node, ...names) => {
  const classes = new Set((asAttrs(node).class ?? '').split(/\s+/u).filter(Boolean));
  return names.every((name) => classes.has(name));
};
const nodeById = (root, id, tag = null) => visit(root, (node) => (tag === null || node.tagName === tag) && asAttrs(node).id === id);
const exactOne = (items, page, selector) => {
  assert.equal(items.length, 1, `${page.documentId}: expected one ${selector}, got ${items.length}`);
  return items[0];
};

function selectedRoots(document, page) {
  const allH1 = visit(document, (node) => node.tagName === 'h1');
  const h1 = exactOne(allH1, page, 'h1');
  if (page.documentId === 'home') return [exactOne(nodeById(document, 'main-content', 'main'), page, 'main#main-content')];
  if (page.kind === 'article') {
    const article = exactOne(visit(document, (node) => node.tagName === 'article'), page, 'article');
    const header = exactOne(kids(article).filter((node) => node.tagName === 'header'), page, 'article > header');
    const body = exactOne(visit(article, (node) => node.tagName === 'div' && hasClass(node, 'content-body', 'prose')), page, 'article .content-body.prose');
    return [header, body];
  }
  if (page.documentId === 'pillar--herramientas') {
    const heroParagraphs = kids(h1.parentNode).filter((node) => node.tagName === 'p');
    return [h1, ...heroParagraphs, exactOne(visit(document, (node) => node.tagName === 'main' && hasClass(node, 'mx-auto', 'w-full', 'max-w-4xl')), page, 'tools main')];
  }
  if (page.documentId === 'page--acerca-de') return [h1.parentNode, exactOne(nodeById(document, 'about-us', 'article'), page, 'article#about-us')];
  if (page.documentId === 'page--politica-editorial') return [h1.parentNode, exactOne(visit(document, (node) => node.tagName === 'main' && hasClass(node, 'max-w-3xl')), page, 'main.max-w-3xl')];
  if (page.kind === 'tool') return [exactOne(visit(document, (node) => node.tagName === 'main' && hasClass(node, 'max-w-3xl')), page, 'main.max-w-3xl')];
  if (page.kind === 'pillar') {
    const heroH1 = exactOne(nodeById(document, 'health-title', 'h1'), page, 'h1#health-title');
    const heroParagraphs = kids(heroH1.parentNode).filter((node) => node.tagName === 'p');
    const body = exactOne(visit(document, (node) => node.tagName === 'article' && hasClass(node, 'content-body', 'health-content', 'prose')), page, 'pillar body');
    const source = exactOne(visit(document, (node) => node.tagName === 'p' && hasClass(node.parentNode ?? {}, 'health-toc__source')), page, 'pillar sources');
    return [heroH1, ...heroParagraphs, body, source];
  }
  throw new Error(`unknown semantic profile ${page.documentId}`);
}

function excluded(node) {
  if (!node.tagName) return false;
  const attrs = asAttrs(node);
  const classes = (attrs.class ?? '').split(/\s+/u);
  return skippedTags.has(node.tagName) || attrs['aria-hidden'] === 'true' || attrs.role === 'progressbar' ||
    (node.tagName === 'span' && attrs.id === 'localized-emergency-text') ||
    (node.tagName === 'div' && classes.includes('ad-slot') && Object.hasOwn(attrs, 'data-ad-pending')) ||
    ['back-btn', 'breadcrumb', 'breadcrumbs', 'health-toc__nav'].some((name) => classes.includes(name));
}

function replaceToolWidget(root, page, walk) {
  const widgetId = page.documentId === 'tool--calidad-vida' ? 'qol-widget' : page.documentId === 'tool--movilidad' ? 'm5widget' : null;
  if (!widgetId) return false;
  const attrs = asAttrs(root);
  if (attrs.id === widgetId) {
    let selected = [];
    if (widgetId === 'qol-widget') {
      selected = [
        ...nodeById(root, 'qol-intro'),
        ...visit(root, (node) => node.tagName === 'p' && hasClass(node, 'mt-4', 'text-xs', 'font-light') && asAttrs(node.parentNode ?? {}).id === 'qol-result-box'),
        ...visit(root, (node) => hasClass(node, 'qol-anti-guilt') && asAttrs(node.parentNode ?? {}).id === 'qol-result'),
      ];
    } else {
      const s3 = exactOne(nodeById(root, 'm5s3'), page, '#m5s3');
      selected = [
        ...nodeById(root, 'm5s0'),
        ...visit(root, (node) => asAttrs(node).id === 'm5alert' && asAttrs(node).role === 'alert'),
        ...kids(s3).filter((node) => node.tagName === 'p').slice(-1),
      ];
    }
    selected.forEach(walk);
    return true;
  }
  return false;
}

function sourceFacts(roots, page) {
  const headings = [];
  const paragraphs = [];
  const links = [];
  const images = [];
  const tables = [];
  const visited = new Set();
  const walk = (node) => {
    if (visited.has(node)) return;
    visited.add(node);
    if (excluded(node)) return;
    if (replaceToolWidget(node, page, walk)) return;
    if (node.tagName === 'h1' || /^h[2-6]$/u.test(node.tagName ?? '')) headings.push(textHtml(node));
    let inArticleHeader = false;
    if (page.kind === 'article') for (let parent = node.parentNode; parent; parent = parent.parentNode) {
      if (parent.tagName === 'header') { inArticleHeader = true; break; }
    }
    if ((node.tagName === 'p' || node.tagName === 'summary') && !inArticleHeader) paragraphs.push(textHtml(node));
    if (node.tagName === 'a') {
      const href = asAttrs(node).href;
      if (href) links.push(new URL(href, page.canonicalUrl).href);
    }
    if (node.tagName === 'img') images.push({ alt: asAttrs(node).alt ?? '', url: new URL(asAttrs(node).src, page.canonicalUrl).href });
    if (node.tagName === 'table') {
      tables.push(visit(node, (child) => child.tagName === 'tr').map((row) => kids(row).filter((cell) => cell.tagName === 'th' || cell.tagName === 'td').map(textHtml)));
    }
    for (const child of kids(node)) walk(child);
    if (node.content) walk(node.content);
  };
  roots.forEach(walk);
  return { headings, paragraphs: paragraphs.filter(Boolean), links, images, tables };
}

function markdownFacts(markdown, canonicalUrl) {
  const tree = fromMarkdown(markdown, mdOptions);
  const headings = [];
  const paragraphs = [];
  const links = [];
  const images = [];
  const tables = [];
  const code = [];
  const walk = (node) => {
    if (/^heading$/u.test(node.type)) headings.push(textMd(node));
    if (node.type === 'paragraph' || node.type === 'heading') paragraphs.push(node.type === 'paragraph' ? textMd(node) : '');
    if (node.type === 'link') links.push(new URL(node.url, canonicalUrl).href);
    if (node.type === 'image') images.push({ alt: node.alt ?? '', url: new URL(node.url, canonicalUrl).href });
    if (node.type === 'table') tables.push(node.children.map((row) => row.children.map(textMd)));
    if (node.type === 'code') code.push(node.value);
    for (const child of node.children ?? []) walk(child);
  };
  walk(tree);
  return { headings, paragraphs: paragraphs.filter(Boolean), links, images, tables, code, allText: textMd(tree) };
}

function assertOrderedSubset(expected, actual, label, documentId) {
  let cursor = 0;
  for (const value of expected) {
    const found = actual.findIndex((candidate, index) => index >= cursor && candidate === value);
    assert.notEqual(found, -1, `${documentId}: missing/reordered ${label}: ${value.slice(0, 120)}; observed=${actual.slice(Math.max(0, cursor - 2), cursor + 4).map((item) => item.slice(0, 120)).join(' || ')}`);
    cursor = found + 1;
  }
}

function assertSemanticParity(source, markdown, page) {
  assert.deepEqual(markdown.headings, source.headings, `${page.documentId}: ordered headings/multiplicity match source HTML`);
  let textCursor = 0;
  const mdSemanticText = semanticText(markdown.allText);
  for (const paragraph of source.paragraphs) {
    const expected = semanticText(paragraph);
    const found = mdSemanticText.indexOf(expected, textCursor);
    assert.notEqual(found, -1, `${page.documentId}: missing/reordered paragraph text: ${paragraph.slice(0, 120)}`);
    textCursor = found + expected.length;
    const sourceCount = source.paragraphs.filter((value) => semanticText(value) === expected).length;
    const outputCount = mdSemanticText.split(expected).length - 1;
    if (expected.length >= 40) assert.equal(outputCount, sourceCount, `${page.documentId}: paragraph multiplicity for ${paragraph.slice(0, 100)}`);
  }
  assertOrderedSubset(source.links, markdown.links, 'link destination', page.documentId);
  for (const url of new Set(source.links)) {
    const sourceCount = source.links.filter((value) => value === url).length;
    const outputCount = markdown.links.filter((value) => value === url).length;
    assert.ok(outputCount >= sourceCount, `${page.documentId}: link destination multiplicity for ${url}`);
  }
  assert.deepEqual(markdown.images, source.images, `${page.documentId}: image order, alt and source match HTML`);
  assert.deepEqual(markdown.tables, source.tables, `${page.documentId}: table order, rows and cells match source HTML`);
}

try {
  const inventoryRoot = join(scratch, 'inventory');
  assert.equal(await inventory(buildDir, inventoryRoot), 0, 'built corpus inventory is valid');
  const inventoryData = JSON.parse(await readFile(join(inventoryRoot, 'inventory.json'), 'utf8'));
  const assetRoot = resolve(process.cwd(), inventoryData.assetDirectory);
  const index = JSON.parse(await readFile(join(assetRoot, 'agent-content/v1/index.json'), 'utf8'));
  const inventoryDocuments = inventoryData.pages.filter((page) => page.disposition === 'document');
  assert.equal(index.documents.length, inventoryDocuments.length, 'the closed projection and source inventory contain the same number of documents');
  const observed = new Map();
  for (const entry of index.documents) {
    const page = { ...entry };
    const html = parseHtml(await readFile(join(assetRoot, inventoryData.pages.find((candidate) => candidate.documentId === entry.documentId).htmlFile), 'utf8'));
    const roots = selectedRoots(html, page);
    const source = sourceFacts(roots, page);
    const markdown = markdownFacts(await readFile(join(assetRoot, entry.markdownPath.slice(1)), 'utf8'), page.canonicalUrl);
    assertSemanticParity(source, markdown, page);
    observed.set(entry.documentId, { source, markdown, body: await readFile(join(assetRoot, entry.markdownPath.slice(1)), 'utf8'), page });
  }
  const home = observed.get('home');
  assert.ok(home, 'baseline corpus includes home for mutation guards');
  const longParagraph = home.source.paragraphs.find((value) => semanticText(value).length >= 40);
  assert.ok(longParagraph, 'home has an independent source paragraph mutation target');
  const removed = markdownFacts(home.body.replace(longParagraph, ''), home.page.canonicalUrl);
  assert.throws(() => assertSemanticParity(home.source, removed, home.page), /missing\/reordered paragraph/u, 'guard detects content loss');
  const duplicated = markdownFacts(`${home.body}\n\n${longParagraph}\n`, home.page.canonicalUrl);
  assert.throws(() => assertSemanticParity(home.source, duplicated, home.page), /paragraph multiplicity/u, 'guard detects duplicate content');
  const homeHeadings = home.markdown.headings.filter((heading) => heading !== home.page.title);
  assert.ok(homeHeadings.length >= 2, 'home has independent ordered heading mutation targets');
  const firstHeading = `## ${homeHeadings[0]}`;
  const secondHeading = `## ${homeHeadings[1]}`;
  const reorderedBody = home.body.replace(firstHeading, '## __F2_HEADING_ONE__').replace(secondHeading, firstHeading).replace('## __F2_HEADING_ONE__', secondHeading);
  const reordered = markdownFacts(reorderedBody, home.page.canonicalUrl);
  assert.throws(() => assertSemanticParity(home.source, reordered, home.page), /ordered headings/u, 'guard detects reordered blocks');
  const firstLink = home.source.links[0];
  assert.ok(firstLink, 'home has an independent source link mutation target');
  const noLink = markdownFacts(home.body.replaceAll(firstLink, 'https://example.invalid/removed-link'), home.page.canonicalUrl);
  assert.throws(() => assertSemanticParity(home.source, noLink, home.page), /link destination/u, 'guard detects lost URLs');
  process.stdout.write(`PASS: independent Markdown/GFM semantic guard matched all ${index.documents.length} source documents and detected loss, duplication, reordering and link removal.\n`);
} finally {
  await rm(scratch, { recursive: true, force: true });
}
