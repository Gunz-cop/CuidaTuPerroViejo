import { readFile } from 'node:fs/promises';
import { parse as parseHtml } from 'parse5';
import { allNodes, attrs, nodeText, normalize, SITE } from './inventory.mjs';
import { sha256 } from './shared.mjs';

export const PARITY_FIXTURES = Object.freeze([
  { path: '/', inputHtml: 'tests/agent-readiness/fixtures/home.html', sourceHtml: 'dist/client/index.html', kind: 'home' },
  { path: '/salud-perros-mayores', inputHtml: 'tests/agent-readiness/fixtures/pillar-salud.html', sourceHtml: 'dist/client/salud-perros-mayores.html', kind: 'pillar' },
  { path: '/herramientas', inputHtml: 'tests/agent-readiness/fixtures/pillar-herramientas.html', sourceHtml: 'dist/client/herramientas.html', kind: 'pillar' },
  { path: '/salud-perros-mayores/sindrome-cushing-perros-mayores', inputHtml: 'tests/agent-readiness/fixtures/article-cushing.html', sourceHtml: 'dist/client/salud-perros-mayores/sindrome-cushing-perros-mayores.html', kind: 'article' },
  { path: '/higiene-hogar-perros-senior/incontinencia-fecal-perros-senior', inputHtml: 'tests/agent-readiness/fixtures/article-incontinencia-fecal.html', sourceHtml: 'dist/client/higiene-hogar-perros-senior/incontinencia-fecal-perros-senior.html', kind: 'article' },
  { path: '/herramientas/calculadora-calidad-vida-perros', inputHtml: 'tests/agent-readiness/fixtures/tool-calidad-vida.html', sourceHtml: 'dist/client/herramientas/calculadora-calidad-vida-perros.html', kind: 'tool' },
  { path: '/herramientas/selector-movilidad-perros-mayores', inputHtml: 'tests/agent-readiness/fixtures/tool-movilidad.html', sourceHtml: 'dist/client/herramientas/selector-movilidad-perros-mayores.html', kind: 'tool' },
]);

const isHeading = (node) => /^h[1-6]$/.test(node.tagName ?? '');

function textWithout(node, excluded) {
  let value = '';
  const visit = (current) => {
    if (!current || current === excluded) return;
    if (current.nodeName === '#text') value += current.value;
    for (const child of current.childNodes ?? []) visit(child);
    if (current.content) visit(current.content);
  };
  visit(node);
  return normalize(value);
}

function warningTexts(document) {
  const candidates = new Set([
    ...allNodes(document, (node) => node.tagName === 'aside'),
    ...allNodes(document, (node) => node.tagName === 'div' && attrs(node).role === 'alert'),
  ]);
  return [...candidates].flatMap((node) => {
    const heading = allNodes(node, isHeading)[0];
    const alertTitle = attrs(node).role === 'alert'
      ? (node.childNodes ?? []).find((child) => child.tagName)
      : null;
    const titleNode = heading ?? alertTitle;
    const title = titleNode ? nodeText(titleNode) : '';
    if (!title || /^(contenido del artículo|contenido de esta página|fuentes científicas|fuentes veterinarias|referencias médicas)$/iu.test(title)) return [];
    const body = textWithout(node, titleNode);
    return body ? [{ title, body }] : [];
  });
}

function faqPairs(document) {
  return allNodes(document, (node) => node.tagName === 'details').flatMap((details) => {
    const summary = allNodes(details, (node) => node.tagName === 'summary')[0];
    const question = summary ? nodeText(summary) : '';
    if (!question.endsWith('?')) return [];
    const answer = textWithout(details, summary);
    return answer ? [{ question, answer }] : [];
  });
}

function sourceUrls(document) {
  const urls = allNodes(document, (node) => node.tagName === 'a').flatMap((node) => {
    const href = attrs(node).href;
    try {
      const url = new URL(href);
      if (!['http:', 'https:'].includes(url.protocol) || url.origin === SITE ||
          url.hostname === 'google.com' || url.hostname === 'www.google.com') return [];
      return [url.href];
    } catch { return []; }
  });
  return [...new Set(urls)];
}

const EXCLUDED_NODES = Object.freeze([
  { selector: 'header, nav, footer', reason: 'Global navigation and site chrome are repeated around editorial content.' },
  { selector: 'script, style, noscript', reason: 'Executable code and presentation rules are not editorial content.' },
  { selector: 'form, input, textarea, select, button', reason: 'Interactive controls and submitted user data are excluded.' },
  { selector: '[data-ad], .adsbygoogle', reason: 'Advertising blocks are not part of the document.' },
  { selector: 'aside.hidden.lg\\:block', reason: 'The sticky table of contents is excluded; warning and source asides are retained.' },
]);

export async function buildParityManifest({ sourceCommit, root = process.cwd() }) {
  const fixtures = [];
  for (const fixture of PARITY_FIXTURES) {
    const bytes = await readFile(`${root}/${fixture.inputHtml}`);
    const document = parseHtml(bytes.toString('utf8'));
    const headings = allNodes(document, isHeading).map((node) => ({ tag: node.tagName, text: nodeText(node) }));
    const h1 = headings.find((heading) => heading.tag === 'h1')?.text ?? null;
    fixtures.push({
      ...fixture,
      sha256: sha256(bytes),
      h1,
      orderedHeadings: headings,
      warningTexts: warningTexts(document),
      faqPairs: faqPairs(document),
      sourceUrls: sourceUrls(document),
      excludedNodes: EXCLUDED_NODES,
    });
  }
  return { schemaVersion: 'agent-content-parity/1', sourceCommit, fixtures };
}
