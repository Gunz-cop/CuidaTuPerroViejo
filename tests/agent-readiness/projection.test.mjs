import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectDocument } from '../../scripts/agent-readiness/projection-dom.mjs';
import { makeIndex } from '../../scripts/agent-readiness/projection.mjs';
import { parse as parseHtml } from 'parse5';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfm } from 'micromark-extension-gfm';
import { gfmFromMarkdown } from 'mdast-util-gfm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), 'fixtures/f2');
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const manifest = JSON.parse(await readFile(join(ROOT, 'manifest.json'), 'utf8'));

function pageFor(document) {
  return {
    documentId: document.documentId,
    kind: document.kind,
    canonicalPath: document.canonicalPath,
    canonicalUrl: document.canonicalUrl,
    title: document.title,
    description: document.description,
    language: document.language,
  };
}

function parseGfm(markdown) {
  return fromMarkdown(markdown, { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] });
}

function mdText(node) {
  if (node.type === 'text' || node.type === 'inlineCode' || node.type === 'code') return node.value;
  return (node.children ?? []).map(mdText).join('');
}

for (const golden of manifest.documents) {
  test(`golden F2 ${golden.documentId} conserva el documento completo`, async () => {
    const html = await readFile(join(ROOT, golden.htmlFile));
    const expected = await readFile(join(ROOT, golden.markdownFile));
    assert.equal(sha256(html), golden.sourceSha256, 'HTML canónico de base');
    assert.equal(sha256(expected), golden.expectedSha256, 'Markdown esperado fijo');
    assert.equal(expected.length, golden.expectedBytes);
    const actual = projectDocument(pageFor(golden), html).markdown;
    assert.deepEqual(actual, expected);
    assert.equal(actual.at(-1), 0x0a, 'un LF final');
    assert.notDeepEqual(actual.subarray(0, 3), Buffer.from([0xef, 0xbb, 0xbf]), 'sin BOM UTF-8');
  });
}

test('los goldens cubren los perfiles editoriales, FAQ, tablas, citas e imágenes solicitados', async () => {
  const get = async (id) => readFile(join(ROOT, `${id}.md`), 'utf8');
  const home = await get('home');
  const health = await get('pillar--salud-perros-mayores');
  const tools = await get('pillar--herramientas');
  const cushing = await get('article--sindrome-cushing-perros-mayores');
  const food = await get('article--comida-casera-perros-mayores');
  const dental = await get('article--salud-dental-perros-mayores');
  const noFaq = await get('article--chequeo-geriatrico-canino');
  const about = await get('page--acerca-de');
  const editorial = await get('page--politica-editorial');
  const qol = await get('tool--calidad-vida');
  const mobility = await get('tool--movilidad');

  assert.match(home, /## Referencias veterinarias consultadas/u);
  assert.match(health, /Información educativa para conversar mejor con tu veterinario/u);
  assert.match(tools, /## Nuestro ecosistema de herramientas interactivas/u);
  assert.match(cushing, /## Preguntas frecuentes[\s\S]*\*\*¿Cuál es la esperanza de vida/u);
  assert.match(cushing, /https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/24118359\//u);
  assert.match(food, /^> /mu);
  assert.match(food, /^\| .* \|$/mu);
  assert.match(food, /figcaption|!\[[^\]]*\]\(<https:\/\//u);
  assert.match(dental, /`[^`]+`/u);
  assert.doesNotMatch(dental, /Publicidad/u);
  assert.doesNotMatch(noFaq, /Preguntas frecuentes/u);
  assert.match(about, /# Sobre/u);
  assert.match(editorial, /## Publicidad y enlaces/u);
  assert.match(qol, /últimos 3 días/u);
  assert.match(qol, /≥ 50 Buena 35–49 Aceptable/u);
  assert.doesNotMatch(qol, /qol-result-score|qol-human-msg|qol-recommendation/u);
  assert.match(mobility, /Aviso condicional de la interfaz para nivel severo:/u);
  assert.match(mobility, /Esta recomendación es una guía de apoyo/u);
  assert.doesNotMatch(mobility, /m5rtit|m5rdesc|WhatsApp|#m5copyok/u);
});

test('selectores fallan cerrados ante H1 duplicado, perfil ausente o tag semántico nuevo', async () => {
  const golden = manifest.documents.find((item) => item.documentId === 'home');
  const html = await readFile(join(ROOT, golden.htmlFile), 'utf8');
  const page = pageFor(golden);
  assert.throws(() => projectDocument(page, Buffer.from(html.replace('</main>', '<h1>Extra</h1></main>'))), /PROJECTION_SELECTOR_CARDINALITY.*document h1/u);
  assert.throws(() => projectDocument(page, Buffer.from(html.replace('id="main-content"', 'id="missing-main"'))), /PROJECTION_SELECTOR_CARDINALITY.*main#main-content/u);
  assert.throws(() => projectDocument(page, Buffer.from(html.replace('</main>', '<medical-card>unclassified</medical-card></main>'))), /PROJECTION_TAG_UNSUPPORTED.*medical-card/u);
});

test('tabla no representable falla en lugar de perder celdas', async () => {
  const golden = manifest.documents.find((item) => item.documentId === 'article--comida-casera-perros-mayores');
  const html = await readFile(join(ROOT, golden.htmlFile), 'utf8');
  const changed = html.replace('<td', '<td colspan="2"');
  assert.notEqual(changed, html, 'fixture incluye tablas');
  assert.throws(() => projectDocument(pageFor(golden), Buffer.from(changed)), /PROJECTION_TABLE_SPAN/u);
});

test('párrafos que empiezan con sintaxis de heading/lista siguen siendo texto literal', async () => {
  const golden = manifest.documents.find((item) => item.documentId === 'home');
  const html = await readFile(join(ROOT, golden.htmlFile), 'utf8');
  const injected = html.replace('</main>', '<p># Texto literal editorial</p><p>1. No es lista</p><p>- Tampoco es lista</p></main>');
  const markdown = projectDocument(pageFor(golden), Buffer.from(injected)).markdown.toString('utf8');
  const baseline = parseGfm(projectDocument(pageFor(golden), Buffer.from(html)).markdown.toString('utf8'));
  const parsed = parseGfm(markdown);
  const count = (tree, type) => {
    let found = 0;
    const visit = (node) => { if (node.type === type) found += 1; for (const child of node.children ?? []) visit(child); };
    visit(tree);
    return found;
  };
  assert.equal(count(parsed, 'heading'), count(baseline, 'heading'));
  assert.equal(count(parsed, 'list'), count(baseline, 'list'));
  assert.ok(parsed.children.some((node) => node.type === 'paragraph' && mdText(node) === '# Texto literal editorial'));
  assert.ok(parsed.children.some((node) => node.type === 'paragraph' && mdText(node) === '1. No es lista'));
  assert.ok(parsed.children.some((node) => node.type === 'paragraph' && mdText(node) === '- Tampoco es lista'));
});

test('listas anidadas de tres niveles conservan AST, tipo y comienzo ordered', async () => {
  const golden = manifest.documents.find((item) => item.documentId === 'home');
  const html = await readFile(join(ROOT, golden.htmlFile), 'utf8');
  const nested = '<ul><li>Primer nivel<ol start="4"><li>Segundo nivel<ul><li>Tercer nivel</li></ul></li></ol></li></ul>';
  const injected = html.replace('</main>', `${nested}</main>`);
  assert.notEqual(injected, html, 'HTML de prueba incorpora una lista revisada de tres niveles');
  const markdown = projectDocument(pageFor(golden), Buffer.from(injected)).markdown.toString('utf8');
  const tree = parseGfm(markdown);
  const text = (node) => mdText(node).replace(/\s+/gu, ' ').trim();
  const nestedList = (node) => (node.children ?? []).find((child) => child.type === 'list');
  const rootList = tree.children.find((node) => node.type === 'list' && node.children.some((item) => text(item).includes('Primer nivel')));
  assert.ok(rootList, 'AST contiene la lista raíz del HTML de prueba');
  assert.equal(rootList.ordered, false);
  assert.equal(rootList.children.length, 1);
  assert.ok(text(rootList.children[0]).includes('Primer nivel'));

  const secondList = nestedList(rootList.children[0]);
  assert.ok(secondList, 'Primer nivel contiene una lista anidada');
  assert.equal(secondList.ordered, true);
  assert.equal(secondList.start, 4, 'el atributo start se conserva desde HTML');
  assert.equal(secondList.children.length, 1);
  assert.ok(text(secondList.children[0]).includes('Segundo nivel'));

  const thirdList = nestedList(secondList.children[0]);
  assert.ok(thirdList, 'Segundo nivel contiene la tercera lista, no un bloque de código');
  assert.equal(thirdList.ordered, false);
  assert.equal(thirdList.children.length, 1);
  assert.ok(text(thirdList.children[0]).includes('Tercer nivel'));
  assert.equal(tree.children.filter((node) => node.type === 'code').length, 0, 'no se crea código accidental');
});

test('pre y code conservan LF internos y finales según el parser CommonMark', async () => {
  const golden = manifest.documents.find((item) => item.documentId === 'home');
  const html = await readFile(join(ROOT, golden.htmlFile), 'utf8');
  const expected = 'línea A\n\n\nlínea B\n\n';
  const injected = html.replace('</main>', `<pre><code>${expected}</code></pre></main>`);
  const markdown = projectDocument(pageFor(golden), Buffer.from(injected)).markdown.toString('utf8');
  const parsed = parseGfm(markdown);
  const code = parsed.children.find((node) => node.type === 'code' && node.value.includes('línea A'));
  assert.ok(code);
  assert.equal(code.value, expected);
});

test('un pipe de texto ocupa una sola celda GFM sin doble escape', async () => {
  const golden = manifest.documents.find((item) => item.documentId === 'article--comida-casera-perros-mayores');
  const html = await readFile(join(ROOT, golden.htmlFile), 'utf8');
  const changed = html.replace(/(<td\b[^>]*>)[\s\S]*?(<\/td>)/u, '$1A | B$2');
  assert.notEqual(changed, html);
  const markdown = projectDocument(pageFor(golden), Buffer.from(changed)).markdown.toString('utf8');
  const parsed = parseGfm(markdown);
  const table = parsed.children.find((node) => node.type === 'table');
  assert.ok(table);
  assert.ok(table.children.some((row) => row.children.some((cell) => mdText(cell) === 'A | B')));
});

test('las seis tarjetas de inicio siguen siendo seis li con heading, texto y enlaces', async () => {
  const golden = manifest.documents.find((item) => item.documentId === 'home');
  const html = await readFile(join(ROOT, golden.htmlFile));
  const markdown = projectDocument(pageFor(golden), html).markdown.toString('utf8');
  const tree = parseGfm(markdown);
  const sourceTree = parseHtml(html.toString('utf8'));
  const htmlNodes = (root, predicate) => {
    const found = [];
    const visit = (node) => {
      if (predicate(node)) found.push(node);
      for (const child of node.childNodes ?? []) visit(child);
      if (node.content) visit(node.content);
    };
    visit(root);
    return found;
  };
  const htmlText = (node) => {
    if (node.nodeName === '#text') return node.value;
    return (node.childNodes ?? []).map(htmlText).join('');
  };
  const sourceHeading = htmlNodes(sourceTree, (node) => node.tagName === 'h3' && htmlText(node).trim() === 'Salud y prevención')[0];
  assert.ok(sourceHeading, 'HTML source contains the first category heading');
  let sourceList = sourceHeading.parentNode;
  while (sourceList && sourceList.tagName !== 'ul') sourceList = sourceList.parentNode;
  assert.ok(sourceList, 'category heading belongs to a source HTML ul');
  const sourceCards = sourceList.childNodes.filter((node) => node.tagName === 'li');
  assert.equal(sourceCards.length, 6, 'the independent HTML source has six card li nodes');
  const sourceFacts = sourceCards.map((item) => {
    const heading = htmlNodes(item, (node) => node.tagName === 'h3')[0];
    const paragraph = htmlNodes(item, (node) => node.tagName === 'p')[0];
    const link = htmlNodes(item, (node) => node.tagName === 'a' && node.attrs.some((attr) => attr.name === 'href'))[0];
    return {
      heading: htmlText(heading).trim(),
      paragraph: htmlText(paragraph).replace(/\s+/gu, ' ').trim(),
      href: new URL(link.attrs.find((attr) => attr.name === 'href').value, golden.canonicalUrl).href,
    };
  });
  const findHeading = (node) => node.type === 'heading' && mdText(node) === sourceFacts[0].heading || (node.children ?? []).some(findHeading);
  const lists = tree.children.filter((node) => node.type === 'list' && findHeading(node));
  assert.equal(lists.length, 1, 'las tarjetas permanecen en una sola lista');
  const cards = lists[0].children;
  assert.equal(cards.length, sourceCards.length, 'una entrada Markdown por li fuente');
  for (const [index, expected] of sourceFacts.entries()) {
    const item = cards[index];
    const headings = [];
    const links = [];
    const visit = (node) => {
      if (node.type === 'heading') headings.push(mdText(node));
      if (node.type === 'link') links.push(node.url);
      for (const child of node.children ?? []) visit(child);
    };
    visit(item);
    assert.deepEqual(headings, [expected.heading], `heading del li ${index + 1}`);
    assert.ok(item.children.some((node) => node.type === 'paragraph' && mdText(node).includes(expected.paragraph)), `descripción fuente de la tarjeta ${index + 1} permanece dentro de li`);
    assert.ok(links.filter((link) => link === expected.href).length >= 3, `heading, descripción y CTA de ${index + 1} conservan el href fuente`);
  }
});

test('mutaciones de aviso, FAQ, celda, fuente y autor se detectan contra los goldens fijos', async () => {
  const read = async (id) => {
    const golden = manifest.documents.find((item) => item.documentId === id);
    assert.ok(golden, `golden ${id}`);
    return {
      golden,
      html: await readFile(join(ROOT, golden.htmlFile), 'utf8'),
      expected: await readFile(join(ROOT, golden.markdownFile)),
    };
  };

  const mobility = await read('tool--movilidad');
  const noAlert = mobility.html.replace('id="m5alert"', 'id="m5alert-removed"');
  assert.notEqual(noAlert, mobility.html);
  assert.throws(() => projectDocument(pageFor(mobility.golden), Buffer.from(noAlert)), /PROJECTION_SELECTOR_CARDINALITY.*#m5alert/u);

  const faq = await read('article--sindrome-cushing-perros-mayores');
  const noQuestion = faq.html.replace(/<details\b[\s\S]*?<\/details>/gu, '');
  assert.notEqual(noQuestion, faq.html);
  assert.notDeepEqual(projectDocument(pageFor(faq.golden), Buffer.from(noQuestion)).markdown, faq.expected);

  const table = await read('article--comida-casera-perros-mayores');
  const noCellContent = table.html.replace(/(<td\b[^>]*>)[\s\S]*?(<\/td>)/u, '$1Celda retirada$2');
  assert.notEqual(noCellContent, table.html);
  assert.notDeepEqual(projectDocument(pageFor(table.golden), Buffer.from(noCellContent)).markdown, table.expected);

  const noSource = table.html.replace('https://wsava.org/global-guidelines/global-nutrition-guidelines/', 'https://wsava.org/global-guidelines/source-removed/');
  assert.notEqual(noSource, table.html);
  assert.notDeepEqual(projectDocument(pageFor(table.golden), Buffer.from(noSource)).markdown, table.expected);

  const author = await read('article--sindrome-cushing-perros-mayores');
  const noAuthor = author.html.replace('Equipo Cuida a tu Perro Viejo', '');
  assert.notEqual(noAuthor, author.html);
  assert.notDeepEqual(projectDocument(pageFor(author.golden), Buffer.from(noAuthor)).markdown, author.expected);
});

test('el índice permite crecimiento derivado a 29 entradas', () => {
  const documents = Array.from({ length: 29 }, (_, index) => ({
    documentId: `article--fixture-${String(index + 1).padStart(2, '0')}`,
    canonicalPath: `/fixture-${String(index + 1).padStart(2, '0')}`,
    markdownSha256: 'a'.repeat(64),
  }));
  const index = makeIndex(documents);
  assert.equal(index.documents.length, 29);
  assert.equal(index.documents[0].documentId, 'article--fixture-01');
  assert.match(index.corpusSha256, /^[a-f0-9]{64}$/u);
});
