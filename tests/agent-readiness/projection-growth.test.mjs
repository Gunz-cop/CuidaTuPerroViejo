import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inventory } from '../../scripts/agent-readiness/inventory.mjs';
import { runProjectionCheck, writeProjection } from '../../scripts/agent-readiness/projection.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

test('sitemap + catálogo + HTML concordantes amplían el build a 29 y pasan projection check', async (t) => {
  const temp = await mkdtemp(join(projectRoot, 'tests/agent-readiness/.projection-growth-'));
  t.after(() => rm(temp, { recursive: true, force: true }));
  await cp(join(projectRoot, 'dist/client'), join(temp, 'client'), { recursive: true });

  const slug = 'f2-crecimiento-fixture';
  const canonicalPath = `/salud-perros-mayores/${slug}`;
  const canonicalUrl = `https://cuidatuperroviejo.com${canonicalPath}`;
  const catalogPath = join(temp, 'client/api/assistant-catalog.json');
  const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
  const source = catalog.find((item) => item.slug === 'chequeo-geriatrico-canino');
  assert.ok(source, 'existe una fila de artículo fuente que se puede extender');
  catalog.push({
    ...source,
    slug,
    title: 'Ficha sintética de crecimiento del catálogo F2',
    description: 'Documento sintético para probar el crecimiento concordante del índice F2.',
    href: canonicalPath,
  });
  await writeFile(catalogPath, `${JSON.stringify(catalog)}\n`);

  const sitemapPath = join(temp, 'client/sitemap-0.xml');
  let sitemap = await readFile(sitemapPath, 'utf8');
  sitemap = sitemap.replace('</urlset>', `<url><loc>${canonicalUrl}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url></urlset>`);
  await writeFile(sitemapPath, sitemap);

  const sourceHtmlPath = join(temp, 'client/salud-perros-mayores/chequeo-geriatrico-canino.html');
  let html = await readFile(sourceHtmlPath, 'utf8');
  const sourceUrl = 'https://cuidatuperroviejo.com/salud-perros-mayores/chequeo-geriatrico-canino';
  const sourceTitle = source.title;
  const sourceDescription = source.description;
  html = html.replaceAll(sourceUrl, canonicalUrl)
    .replaceAll(sourceTitle, 'Ficha sintética de crecimiento del catálogo F2')
    .replaceAll(sourceDescription, 'Documento sintético para probar el crecimiento concordante del índice F2.');
  const htmlPath = join(temp, `client${canonicalPath}.html`);
  await writeFile(htmlPath, html);

  const inventoryDir = join(temp, 'inventory');
  assert.equal(await inventory(temp, inventoryDir), 0, 'inventario derivado del build sintético es válido');
  const inventoryData = JSON.parse(await readFile(join(inventoryDir, 'inventory.json'), 'utf8'));
  assert.equal(inventoryData.pages.filter((page) => page.disposition === 'document').length, 29);
  assert.ok(inventoryData.pages.some((page) => page.documentId === `article--${slug}` && page.canonicalPath === canonicalPath));

  await rm(join(temp, 'client/agent-content'), { recursive: true });
  const projection = await writeProjection(temp);
  assert.equal(projection.index.documents.length, 29);
  assert.ok(projection.index.documents.some((entry) => entry.documentId === `article--${slug}`));
  assert.equal(await runProjectionCheck(['check', '--build-dir', temp]), 0, 'check offline acepta los artefactos completos de 29 documentos');

  const projectedRoot = join(temp, 'client/agent-content');
  const firstDocument = projection.index.documents[0];
  const documentFile = join(projectedRoot, firstDocument.markdownPath.replace('/agent-content/', ''));
  const documentBytes = await readFile(documentFile);
  assert.equal(await runProjectionCheck(['check', '--build-dir', temp]), 0);
  assert.deepEqual(await readFile(documentFile), documentBytes, 'check es estrictamente de solo lectura');

  await rm(documentFile);
  assert.equal(await runProjectionCheck(['check', '--build-dir', temp]), 1, 'documento esperado ausente falla');
  await writeFile(documentFile, documentBytes);
  const orphan = join(projectedRoot, 'v1/documents/orphan.md');
  await writeFile(orphan, '# orphan\n');
  assert.equal(await runProjectionCheck(['check', '--build-dir', temp]), 1, 'documento huérfano falla');
  await rm(orphan);

  await rm(projectedRoot, { recursive: true });
  const additions = [];
  const sourceHtml = await readFile(sourceHtmlPath, 'utf8');
  for (let index = 1; index <= 70; index += 1) {
    const extraSlug = `f2-limit-${String(index).padStart(2, '0')}`;
    const extraPath = `/salud-perros-mayores/${extraSlug}`;
    const extraTitle = `Ficha sintética de límite ${index}`;
    const extraDescription = `Documento de prueba para comprobar el límite máximo del corpus F2, elemento ${index}.`;
    catalog.push({ ...source, slug: extraSlug, title: extraTitle, description: extraDescription, href: extraPath });
    additions.push(`<url><loc>https://cuidatuperroviejo.com${extraPath}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`);
    const extraHtml = sourceHtml.replaceAll(sourceUrl, `https://cuidatuperroviejo.com${extraPath}`)
      .replaceAll(sourceTitle, extraTitle).replaceAll(sourceDescription, extraDescription);
    await writeFile(join(temp, `client${extraPath}.html`), extraHtml);
  }
  await writeFile(catalogPath, `${JSON.stringify(catalog)}\n`);
  sitemap = sitemap.replace('</urlset>', `${additions.join('')}</urlset>`);
  await writeFile(sitemapPath, sitemap);
  const inventory99 = join(temp, 'inventory-99');
  assert.equal(await inventory(temp, inventory99), 0, 'el inventario y las 99 rutas sintéticas siguen concordantes');
  const inventoryData99 = JSON.parse(await readFile(join(inventory99, 'inventory.json'), 'utf8'));
  assert.equal(inventoryData99.pages.filter((page) => page.disposition === 'document').length, 99);
  await assert.rejects(writeProjection(temp), /PROJECTION_DOCUMENT_COUNT documents=99 limit=98/u);
  await assert.rejects(readFile(projectedRoot), { code: 'ENOENT' }, 'no se publica artefacto al superar el límite');
});
