import { readFile, readdir } from 'node:fs/promises';
import { basename, dirname, extname, join, relative, resolve, sep } from 'node:path';
import { parse as parseHtml } from 'parse5';
import { XMLParser } from 'fast-xml-parser';
import { exclusiveDir, exclusiveFile, manifestFor, saveJson, sha256, sourceState } from './shared.mjs';

const SITE = 'https://cuidatuperroviejo.com';
const xmlParser = new XMLParser({
  ignoreAttributes: false,
  processEntities: false,
  trimValues: true,
  parseTagValue: false,
  parseAttributeValue: false,
});

const PILLARS = [
  'alimentacion-perros-senior', 'cuidados-paliativos-perros', 'herramientas',
  'higiene-hogar-perros-senior', 'movilidad-dolor-perros-mayores',
  'salud-mental-emocional-perros', 'salud-perros-mayores',
];
const DOCUMENT_ONLY_ROUTES = new Map([
  ['/gracias', ['excluded', 'thanks/confirmation page is excluded from public content projection']],
]);
const DISCOVERY_ONLY_ROUTES = new Map([
  ['/asistente-ia', 'Interactive assistant page; no widgets or prompts are projected.'],
  ['/contacto', 'Contact page; no form or submitted data is projected.'],
  ['/politica-de-cookies', 'Utility/legal page is discoverable but not an editorial document.'],
  ['/politica-de-privacidad', 'Utility/legal page is discoverable but not an editorial document.'],
]);
const EDITORIAL_ROUTES = new Map([
  ['/acerca-de', 'acerca-de'],
  ['/politica-editorial', 'politica-editorial'],
]);
const TOOL_ROUTES = new Map([
  ['/herramientas/calculadora-calidad-vida-perros', ['tool--calidad-vida', 'calidad-vida']],
  ['/herramientas/selector-movilidad-perros-mayores', ['tool--movilidad', 'movilidad']],
]);

const ascii = (a, b) => a < b ? -1 : a > b ? 1 : 0;

async function walkFiles(root, directory = root) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walkFiles(root, path));
    else if (entry.isFile()) files.push(path);
  }
  return files.sort((a, b) => ascii(relative(root, a).split(sep).join('/'), relative(root, b).split(sep).join('/')));
}

function hasRel(children, tagName, predicate = () => true) {
  const attr = children.filter((node) => node.tagName === tagName)
    .flatMap((node) => node.attrs ?? []);
  return attr.find(predicate);
}

function allNodes(root, predicate = () => true) {
  const found = [];
  const visit = (node) => {
    if (predicate(node)) found.push(node);
    for (const child of node.childNodes ?? []) visit(child);
    if (node.content) visit(node.content);
  };
  visit(root);
  return found;
}

function nodeText(node) {
  let value = '';
  const visit = (current) => {
    if (current.nodeName === '#text') value += current.value;
    for (const child of current.childNodes ?? []) visit(child);
    if (current.content) visit(current.content);
  };
  visit(node);
  return normalize(value);
}

export function normalize(value) {
  return String(value ?? '').replace(/\s+/gu, ' ').trim();
}

function attrs(node) {
  return Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name.toLowerCase(), value]));
}

function inferHtmlPath(htmlFile) {
  const clean = htmlFile.replace(/\\/g, '/');
  if (clean === 'index.html') return '/';
  if (clean.endsWith('/index.html')) return `/${clean.slice(0, -'/index.html'.length)}`;
  return `/${clean.replace(/\.html$/i, '')}`;
}

function invalidCanonicalHref(raw) {
  if (!raw || /[?#]/.test(raw)) return true;
  const rawPath = raw.match(/^https?:\/\/[^/]+([^?#]*)/i)?.[1] ?? raw;
  const decodedSegments = rawPath.split('/');
  if (decodedSegments.includes('.') || decodedSegments.includes('..')) return true;
  return /%(?:2f|5c)/i.test(rawPath) || /\.html?$/i.test(rawPath);
}

function canonicalFrom(document, htmlFile) {
  const html = allNodes(document, (node) => node.tagName === 'html')[0];
  const links = allNodes(document, (node) => node.tagName === 'link' &&
    (attrs(node).rel ?? '').toLowerCase().split(/\s+/).includes('canonical'));
  if (links.length !== 1) return { href: null, path: null, error: `Expected one canonical link, found ${links.length}.` };
  const raw = attrs(links[0]).href;
  if (invalidCanonicalHref(raw)) return { href: raw || null, path: null, error: 'Canonical is empty or contains forbidden query, fragment, path segment, separator, or HTML suffix.' };
  let url;
  try { url = new URL(raw); } catch { return { href: raw || null, path: null, error: 'Canonical is not an absolute URL.' }; }
  if (url.origin !== SITE || url.username || url.password || url.pathname === '' || url.pathname !== '/' && url.pathname.endsWith('/')) {
    return { href: raw, path: null, error: 'Canonical must use the published origin and a normalized absolute path.' };
  }
  if (url.search || url.hash || !url.pathname.startsWith('/')) {
    return { href: raw, path: null, error: 'Canonical contains a query, fragment, or unsafe path.' };
  }
  return { href: url.href, path: url.pathname, error: null, language: attrs(html ?? {}).lang?.toLowerCase().split('-')[0] ?? null };
}

function makePage({ htmlFile, canonicalPath, canonicalUrl, title, description, language, kind, disposition, documentId, inSitemap, publicationEvidence, reason }) {
  return { htmlFile, canonicalPath, canonicalUrl, title, description, language, kind, disposition, documentId, inSitemap, publicationEvidence, reason };
}

async function loadCatalogue(assetDirectory) {
  const path = join(assetDirectory, 'api', 'assistant-catalog.json');
  const content = await readFile(path, 'utf8');
  const data = JSON.parse(content);
  if (!Array.isArray(data)) throw new Error('El catálogo construido no es un array.');
  return data;
}

async function findAssetDirectory(buildDir, files) {
  const sitemapNames = new Set(['sitemap.xml', 'sitemap-index.xml']);
  const directories = new Set(files.map((file) => dirname(file)));
  const candidates = [];
  for (const dir of directories) {
    const dirFiles = new Set(files.filter((file) => dirname(file) === dir).map((file) => basename(file)));
    if (!dirFiles.has('index.html') || ![...sitemapNames].some((name) => dirFiles.has(name))) continue;
    if (!files.includes(join(dir, 'api', 'assistant-catalog.json'))) continue;
    candidates.push(dir);
  }
  if (candidates.length !== 1) {
    return { path: null, error: {
      code: candidates.length ? 'ASSET_DIRECTORY_AMBIGUOUS' : 'BUILD_ARTIFACT_MISSING',
      message: candidates.length ? `Se encontraron ${candidates.length} directorios de assets candidatos.` : 'No se encontró un directorio que contenga home, sitemap y catálogo publicado.',
      htmlFile: null,
    } };
  }
  const candidate = candidates[0];
  const rel = relative(process.cwd(), candidate).split(sep).join('/');
  if (rel === '..' || rel.startsWith('../')) {
    return { path: candidate, error: { code: 'BUILD_ARTIFACT_MISSING', message: 'El directorio de assets debe estar dentro del repositorio.', htmlFile: null } };
  }
  return { path: candidate, relative: rel };
}

function extractSitemapPaths(xmlText, xmlFile, assetDirectory, errors) {
  const parsed = xmlParser.parse(xmlText);
  if (parsed.sitemapindex) {
    const entries = parsed.sitemapindex.sitemap ?? [];
    const rows = Array.isArray(entries) ? entries : [entries];
    const locations = rows.map((entry) => entry.loc).filter((loc) => typeof loc === 'string');
    if (locations.length !== rows.length) {
      errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: `Sitemap index ${xmlFile} contiene una referencia sin loc.`, htmlFile: null });
    }
    return { type: 'index', locations };
  }
  if (parsed.urlset) {
    const entries = parsed.urlset.url ?? [];
    const rows = Array.isArray(entries) ? entries : [entries];
    const urls = rows.map((entry) => entry.loc).filter((loc) => typeof loc === 'string');
    if (urls.length !== rows.length) errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: `Sitemap ${xmlFile} contiene una URL sin loc.`, htmlFile: null });
    return { type: 'urls', locations: urls };
  }
  errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: `Sitemap XML no reconocido: ${xmlFile}.`, htmlFile: null });
  return { type: 'invalid', locations: [] };
}

async function loadSitemaps(assetDirectory, files, errors) {
  const xmlFiles = files.filter((file) => extname(file).toLowerCase() === '.xml' && basename(file).startsWith('sitemap'));
  if (!xmlFiles.length) {
    errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: 'No se encontró sitemap en los assets.', htmlFile: null });
    return new Set();
  }
  const rootIndex = xmlFiles.find((file) => basename(file) === 'sitemap-index.xml');
  const rootMap = rootIndex ?? xmlFiles.find((file) => basename(file) === 'sitemap.xml');
  if (!rootMap) {
    errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: 'No hay sitemap-index.xml ni sitemap.xml en assets.', htmlFile: null });
    return new Set();
  }
  const rootResult = extractSitemapPaths(await readFile(rootMap, 'utf8'), relative(assetDirectory, rootMap), assetDirectory, errors);
  const children = rootResult.type === 'index' ? rootResult.locations : [rootMap];
  const sitemapPaths = new Set();
  for (const child of children) {
    let childPath;
    if (rootResult.type === 'index') {
      let url;
      try { url = new URL(child); } catch {
        errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: `Sitemap child inválido en ${relative(assetDirectory, rootMap)}.`, htmlFile: null });
        continue;
      }
      if (url.origin !== SITE || url.search || url.hash) {
        errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: `Sitemap child fuera del origen local esperado: ${url.href}.`, htmlFile: null });
        continue;
      }
      childPath = resolve(assetDirectory, `.${url.pathname}`);
    } else childPath = rootMap;
    if (!childPath.startsWith(`${assetDirectory}${sep}`) && childPath !== assetDirectory) {
      errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: 'La ruta de sitemap child sale del directorio de assets.', htmlFile: null });
      continue;
    }
    try {
      const result = extractSitemapPaths(await readFile(childPath, 'utf8'), relative(assetDirectory, childPath), assetDirectory, errors);
      for (const loc of result.locations) {
        let url;
        try { url = new URL(loc); } catch {
          errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: `URL de sitemap inválida: ${loc}.`, htmlFile: null });
          continue;
        }
        if (url.origin !== SITE || url.search || url.hash) {
          errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: `URL de sitemap fuera del origen esperado: ${url.href}.`, htmlFile: null });
          continue;
        }
        sitemapPaths.add(url.pathname);
      }
    } catch {
      errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: `No se pudo leer sitemap child ${relative(assetDirectory, childPath)}.`, htmlFile: null });
    }
  }
  return sitemapPaths;
}

function classify(path, htmlFile, catalogByHref, pillarSlugs) {
  const inferred = inferHtmlPath(htmlFile);
  const actualPath = path ?? inferred;
  if (actualPath === '/') return { kind: 'home', disposition: 'document', documentId: 'home', publicationEvidence: 'build-route:/' };
  if (pillarSlugs.has(actualPath.slice(1))) {
    const slug = actualPath.slice(1);
    return { kind: 'pillar', disposition: 'document', documentId: `pillar--${slug}`, publicationEvidence: `content-layer:src/content/pilares/${slug}.mdx` };
  }
  const catalogItem = catalogByHref.get(actualPath);
  if (catalogItem) {
    const slug = catalogItem.slug;
    return { kind: 'article', disposition: 'document', documentId: `article--${slug}`, publicationEvidence: `published-catalogue:${slug}` };
  }
  if (TOOL_ROUTES.has(actualPath)) {
    const [documentId, source] = TOOL_ROUTES.get(actualPath);
    return { kind: 'tool', disposition: 'document', documentId, publicationEvidence: `source:src/pages/herramientas/${source === 'calidad-vida' ? 'calculadora-calidad-vida-perros' : 'selector-movilidad-perros-mayores'}.astro` };
  }
  if (EDITORIAL_ROUTES.has(actualPath)) {
    const slug = EDITORIAL_ROUTES.get(actualPath);
    return { kind: 'editorial', disposition: 'document', documentId: `page--${slug}`, publicationEvidence: `build-route:${actualPath}` };
  }
  if (DISCOVERY_ONLY_ROUTES.has(actualPath)) {
    return { kind: 'page', disposition: 'discovery-only', documentId: null, publicationEvidence: `build-route:${actualPath}`, reason: DISCOVERY_ONLY_ROUTES.get(actualPath) };
  }
  if (DOCUMENT_ONLY_ROUTES.has(actualPath)) {
    const [disposition, reason] = DOCUMENT_ONLY_ROUTES.get(actualPath);
    return { kind: 'page', disposition, documentId: null, publicationEvidence: `build-route:${actualPath}`, reason };
  }
  if (actualPath === '/404') return { kind: 'error', disposition: 'excluded', documentId: null, publicationEvidence: 'build-error-page:/404', reason: 'Error document is excluded from editorial projection.' };
  if (actualPath === '/admin' || actualPath.startsWith('/admin/')) return { kind: 'admin', disposition: 'excluded', documentId: null, publicationEvidence: `build-admin:${actualPath}`, reason: 'Administrative route excluded; private content is never inventoried.' };
  return null;
}

async function parsePage(file, assetDirectory, catalogByHref, pillarSlugs, sitemapPaths, errors) {
  const bytes = await readFile(file);
  const htmlFile = relative(assetDirectory, file).split(sep).join('/');
  const document = parseHtml(bytes.toString('utf8'));
  const canonical = canonicalFrom(document, htmlFile);
  const inferredPath = inferHtmlPath(htmlFile);
  const routeForClassification = canonical.error ? inferredPath : canonical.path;
  const classification = classify(routeForClassification, htmlFile, catalogByHref, pillarSlugs);
  let title = null;
  const h1 = allNodes(document, (node) => node.tagName === 'h1')[0];
  if (h1) title = nodeText(h1);
  const descriptionNode = allNodes(document, (node) => node.tagName === 'meta' && attrs(node).name?.toLowerCase() === 'description')[0];
  const description = descriptionNode ? attrs(descriptionNode).content ?? null : null;
  const html = allNodes(document, (node) => node.tagName === 'html')[0];
  const language = attrs(html ?? {}).lang?.toLowerCase().split('-')[0] ?? null;
  if (!classification) {
    errors.push({ code: 'UNCLASSIFIED_PAGE', message: `La ruta ${routeForClassification} no tiene clasificación de proyección.`, htmlFile });
    return makePage({
      htmlFile, canonicalPath: canonical.path, canonicalUrl: canonical.href, title, description, language,
      kind: null, disposition: null, documentId: null, inSitemap: canonical.path ? sitemapPaths.has(canonical.path) : false,
      publicationEvidence: null, reason: 'No existe una clasificación conocida para esta página.',
    });
  }
  if (canonical.error && classification.disposition === 'document') {
    errors.push({ code: 'CANONICAL_INVALID', message: canonical.error, htmlFile });
  }
  if (classification.disposition === 'document' && !title) {
    errors.push({ code: 'DOCUMENT_TITLE_MISSING', message: 'Falta h1 editorial visible; el title del head no se usa como sustituto.', htmlFile });
  }
  if (classification.disposition === 'document' && language !== 'es') {
    errors.push({ code: 'UNCLASSIFIED_PAGE', message: `El documento debe declarar lang es; observado ${language ?? 'null'}.`, htmlFile });
  }
  return makePage({
    htmlFile,
    canonicalPath: canonical.error && !canonical.href ? null : canonical.path,
    canonicalUrl: canonical.href,
    title,
    description,
    language,
    kind: classification.kind,
    disposition: classification.disposition,
    documentId: classification.documentId,
    inSitemap: canonical.path ? sitemapPaths.has(canonical.path) : false,
    publicationEvidence: classification.publicationEvidence,
    reason: classification.reason ?? (canonical.error ? canonical.error : null),
  });
}

function projectSitemapDifferences(pages, sitemapPaths, errors) {
  const documentPaths = new Set(pages.filter((page) => page.disposition === 'document' && page.canonicalPath).map((page) => page.canonicalPath));
  const differences = [];
  for (const path of [...sitemapPaths].sort(ascii)) {
    if (documentPaths.has(path)) continue;
    const reason = DISCOVERY_ONLY_ROUTES.get(path) ?? `Path ${path} is present in sitemap but has no eligible editorial document.`;
    const disposition = DISCOVERY_ONLY_ROUTES.has(path) ? 'discovery-only' : 'excluded';
    differences.push({ side: 'sitemap-only', path, disposition, reason });
    if (!DISCOVERY_ONLY_ROUTES.has(path)) errors.push({ code: 'SITEMAP_UNEXPLAINED_DIFFERENCE', message: reason, htmlFile: null });
  }
  const allHtmlPaths = new Set(pages.filter((page) => page.canonicalPath).map((page) => page.canonicalPath));
  for (const path of [...documentPaths].sort(ascii)) {
    if (sitemapPaths.has(path)) continue;
    const page = pages.find((entry) => entry.canonicalPath === path);
    const reason = page?.disposition === 'document' ? `Projected document ${path} is not in the sitemap.` : `Page ${path} is intentionally excluded from the sitemap.`;
    const disposition = page?.disposition ?? 'document';
    differences.push({ side: 'document-only', path, disposition, reason });
    if (page?.disposition === 'document') errors.push({ code: 'SITEMAP_UNEXPLAINED_DIFFERENCE', message: reason, htmlFile: page.htmlFile });
  }
  return differences.sort((a, b) => ascii(a.path, b.path) || ascii(a.side, b.side));
}

function assertCatalog(catalog, pages, errors) {
  const articleIds = new Set();
  const articlePaths = new Set();
  for (const item of catalog) {
    if (!item || typeof item.slug !== 'string' || !/^[a-z0-9-]+$/.test(item.slug) || typeof item.href !== 'string') {
      errors.push({ code: 'CATALOG_MISMATCH', message: 'El catálogo contiene una fila sin slug/href seguro.', htmlFile: null });
      continue;
    }
    if (articleIds.has(item.slug) || articlePaths.has(item.href)) {
      errors.push({ code: 'DOCUMENT_ID_COLLISION', message: `El catálogo repite slug o href ${item.slug}.`, htmlFile: null });
    }
    articleIds.add(item.slug);
    articlePaths.add(item.href);
    if (!pages.some((page) => page.disposition === 'document' && page.kind === 'article' && page.canonicalPath === item.href && page.documentId === `article--${item.slug}`)) {
      errors.push({ code: 'CATALOG_MISMATCH', message: `Catálogo publicado sin documento HTML concordante: ${item.href}.`, htmlFile: null });
    }
  }
  for (const page of pages) {
    if (page.kind === 'article' && !catalog.some((item) => item.href === page.canonicalPath && `article--${item.slug}` === page.documentId)) {
      errors.push({ code: 'CATALOG_MISMATCH', message: `Artículo HTML ausente del catálogo: ${page.canonicalPath}.`, htmlFile: page.htmlFile });
    }
  }
}

function assertExpectedDocuments(catalog, pages, pillarSlugs, errors) {
  const expected = new Map([
    ['home', '/'],
    ...[...pillarSlugs].map((slug) => [`pillar--${slug}`, `/${slug}`]),
    ...catalog.filter((item) => typeof item?.slug === 'string' && typeof item?.href === 'string')
      .map((item) => [`article--${item.slug}`, item.href]),
    ...[...TOOL_ROUTES].map(([path, [documentId]]) => [documentId, path]),
    ...[...EDITORIAL_ROUTES].map(([path, slug]) => [`page--${slug}`, path]),
  ]);
  const idOwners = new Map();
  for (const page of pages.filter((entry) => entry.disposition === 'document')) {
    if (idOwners.has(page.documentId)) {
      errors.push({ code: 'DOCUMENT_ID_COLLISION', message: `documentId repetido ${page.documentId} en ${idOwners.get(page.documentId)} y ${page.htmlFile}.`, htmlFile: page.htmlFile });
    } else idOwners.set(page.documentId, page.htmlFile);
    const expectedPath = expected.get(page.documentId);
    if (expectedPath === undefined) {
      errors.push({ code: 'CATALOG_MISMATCH', message: `Documento público inesperado: ${page.documentId} en ${page.canonicalPath}.`, htmlFile: page.htmlFile });
    } else if (page.canonicalPath !== expectedPath) {
      errors.push({ code: 'CATALOG_MISMATCH', message: `El documento ${page.documentId} debe tener canonical ${expectedPath}; observado ${page.canonicalPath}.`, htmlFile: page.htmlFile });
    }
  }
  for (const [documentId, canonicalPath] of expected) {
    const matches = pages.filter((page) => page.disposition === 'document' && page.documentId === documentId && page.canonicalPath === canonicalPath);
    if (matches.length !== 1) {
      errors.push({ code: 'CATALOG_MISMATCH', message: `Se esperaba exactamente un HTML para ${documentId} (${canonicalPath}); observados ${matches.length}.`, htmlFile: null });
    }
  }
}

async function writeEarlyInvalid(outDir, sourceCommit, errors, assetDirectory = null) {
  const inventory = {
    schemaVersion: 'agent-content-inventory/1', sourceCommit, state: 'invalid', errors,
    assetDirectory, sourceDigest: null, pages: [], sitemapDifferences: [],
  };
  await saveJson(join(outDir, 'inventory.json'), inventory);
  const recordedAt = new Date().toISOString();
  await saveJson(join(outDir, 'manifest.json'), await manifestFor(outDir, sourceCommit, recordedAt));
}

export async function inventory(buildDir, outDir) {
  const { sourceCommit } = await sourceState();
  await exclusiveDir(outDir);
  const errors = [];
  let buildFiles;
  try { buildFiles = await walkFiles(buildDir); }
  catch {
    errors.push({ code: 'INVENTORY_IO_ERROR', message: 'No se pudo leer el directorio de build.', htmlFile: null });
    await writeEarlyInvalid(outDir, sourceCommit, errors);
    return 1;
  }
  const asset = await findAssetDirectory(buildDir, buildFiles);
  if (asset.error) {
    errors.push(asset.error);
    await writeEarlyInvalid(outDir, sourceCommit, errors);
    return 3;
  }
  const assetDirectory = asset.path;
  const htmlFiles = buildFiles.filter((file) => file.startsWith(`${assetDirectory}${sep}`) && extname(file).toLowerCase() === '.html');
  const xmlFiles = buildFiles.filter((file) => file.startsWith(`${assetDirectory}${sep}`) && extname(file).toLowerCase() === '.xml');
  if (!htmlFiles.some((file) => relative(assetDirectory, file).split(sep).join('/') === 'index.html') || !xmlFiles.length) {
    errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: 'Falta home o sitemap en el directorio real de assets.', htmlFile: null });
    await writeEarlyInvalid(outDir, sourceCommit, errors, asset.relative);
    return 3;
  }
  let catalog;
  try { catalog = await loadCatalogue(assetDirectory); }
  catch (error) {
    errors.push({ code: 'BUILD_ARTIFACT_MISSING', message: `No se pudo leer el catálogo estático publicado: ${error.message}`, htmlFile: null });
    await writeEarlyInvalid(outDir, sourceCommit, errors, asset.relative);
    return 3;
  }
  const sitemapPaths = await loadSitemaps(assetDirectory, buildFiles.filter((file) => file.startsWith(`${assetDirectory}${sep}`)), errors);
  const pillarDir = resolve(process.cwd(), 'src/content/pilares');
  let pillarSlugs = new Set(PILLARS);
  try {
    const local = (await readdir(pillarDir)).filter((file) => /\.(?:md|mdx)$/i.test(file)).map((file) => file.replace(/\.(?:md|mdx)$/i, ''));
    pillarSlugs = new Set(local);
    for (const slug of PILLARS) if (!pillarSlugs.has(slug)) errors.push({ code: 'UNCLASSIFIED_PAGE', message: `Falta el pilar de base ${slug} en src/content/pilares.`, htmlFile: null });
  } catch {
    errors.push({ code: 'INVENTORY_IO_ERROR', message: 'No se pudo leer src/content/pilares.', htmlFile: null });
  }
  const catalogByHref = new Map();
  for (const item of catalog) {
    if (typeof item?.href === 'string') {
      if (catalogByHref.has(item.href)) errors.push({ code: 'DOCUMENT_ID_COLLISION', message: `href duplicado en catálogo: ${item.href}.`, htmlFile: null });
      catalogByHref.set(item.href, item);
    }
  }
  const pages = [];
  for (const file of htmlFiles) {
    try { pages.push(await parsePage(file, assetDirectory, catalogByHref, pillarSlugs, sitemapPaths, errors)); }
    catch (error) { errors.push({ code: 'INVENTORY_IO_ERROR', message: `No se pudo inspeccionar HTML ${relative(assetDirectory, file)}: ${error.message}`, htmlFile: relative(assetDirectory, file).split(sep).join('/') }); }
  }
  const canonicalOwners = new Map();
  for (const page of pages) {
    if (page.disposition !== 'document' || !page.canonicalPath) continue;
    if (canonicalOwners.has(page.canonicalPath)) {
      errors.push({ code: 'CANONICAL_DUPLICATE', message: `Canonical repetido ${page.canonicalPath} en ${canonicalOwners.get(page.canonicalPath)} y ${page.htmlFile}.`, htmlFile: page.htmlFile });
    } else canonicalOwners.set(page.canonicalPath, page.htmlFile);
  }
  assertCatalog(catalog, pages, errors);
  assertExpectedDocuments(catalog, pages, pillarSlugs, errors);
  const sitemapDifferences = projectSitemapDifferences(pages, sitemapPaths, errors);
  const htmlHashes = [];
  for (const file of htmlFiles) htmlHashes.push([relative(assetDirectory, file).split(sep).join('/'), sha256(await readFile(file))]);
  htmlHashes.sort((a, b) => ascii(a[0], b[0]));
  const sourceDigest = sha256(Buffer.from(JSON.stringify(htmlHashes), 'utf8'));
  pages.sort((a, b) => {
    if (a.canonicalPath === null && b.canonicalPath !== null) return 1;
    if (a.canonicalPath !== null && b.canonicalPath === null) return -1;
    return ascii(a.canonicalPath ?? '', b.canonicalPath ?? '') || ascii(a.htmlFile, b.htmlFile);
  });
  const inventoryData = {
    schemaVersion: 'agent-content-inventory/1',
    sourceCommit,
    state: errors.length === 0 ? 'valid' : 'invalid',
    errors,
    assetDirectory: asset.relative,
    sourceDigest,
    pages,
    sitemapDifferences,
  };
  await saveJson(join(outDir, 'inventory.json'), inventoryData);
  const recordedAt = new Date().toISOString();
  await saveJson(join(outDir, 'manifest.json'), await manifestFor(outDir, sourceCommit, recordedAt));
  return errors.length === 0 ? 0 : 3;
}

export { allNodes, attrs, canonicalFrom, inferHtmlPath, nodeText, SITE };
