import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectDocument } from '../../scripts/agent-readiness/projection-dom.mjs';
import { makeIndex } from '../../scripts/agent-readiness/projection.mjs';

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
