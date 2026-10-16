#!/usr/bin/env node
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { inventory } from './inventory.mjs';

const SITE = 'https://cuidatuperroviejo.com';
const MAX_BYTES = 64 * 1024;
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ROBOTS = 'User-agent: *\nAllow: /\nContent-Signal: search=yes, ai-input=yes, ai-train=no\n\nSitemap: https://cuidatuperroviejo.com/sitemap-index.xml\n';
export const DISCOVERY_LINKS = [
  '<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"',
  '<https://cuidatuperroviejo.com/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '<https://cuidatuperroviejo.com/agent-api/v1/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '<https://cuidatuperroviejo.com/.well-known/ard.json>; rel="ard"; type="application/json"',
  '<https://cuidatuperroviejo.com/.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/json"',
  '<https://cuidatuperroviejo.com/api/mcp/server-card>; rel="service-desc"; type="application/mcp-server-card+json"',
];
const LINK = `Link: ${DISCOVERY_LINKS.join(', ')}`;
export const F3_ASSET_TYPES = new Map([
  ['/agent-api/v1/query-index.json', 'application/json; charset=utf-8'],
  ['/agent-api/v1/openapi.json', 'application/vnd.oai.openapi+json;version=3.1'],
  ['/.well-known/api-catalog', 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"'],
  ['/.well-known/agent-skills/index.json', 'application/json; charset=utf-8'],
  ['/.well-known/agent-skills/buscar-leer-citar/SKILL.md', 'text/markdown; charset=utf-8'],
  ['/.well-known/ard.json', 'application/json; charset=utf-8'],
  ['/.well-known/ai-catalog.json', 'application/json; charset=utf-8'],
  ['/api/mcp/server-card', 'application/mcp-server-card+json'],
  ['/.well-known/mcp/server-card.json', 'application/json; charset=utf-8'],
]);
export const F3_LLMS_SECTION = '\n## Interfaces públicas de contenido\n\n'
  + '- [API Catalog](https://cuidatuperroviejo.com/.well-known/api-catalog): catálogo de operaciones públicas de lectura.\n'
  + '- [OpenAPI](https://cuidatuperroviejo.com/agent-api/v1/openapi.json): contrato de catálogo, búsqueda, lectura íntegra y cálculos de las dos herramientas.\n'
  + '- [Skills](https://cuidatuperroviejo.com/.well-known/agent-skills/index.json): instrucciones verificables para buscar, leer y citar.\n'
  + '- [ARD](https://cuidatuperroviejo.com/.well-known/ard.json): capacidades públicas activas.\n'
  + '- [MCP remoto](https://cuidatuperroviejo.com/api/mcp/server-card): transporte público para buscar, leer y ejecutar las tres herramientas educativas.\n';

function completeLlms(prefix) {
  const bytes = Buffer.concat([prefix, Buffer.from(F3_LLMS_SECTION, 'utf8')]);
  if (bytes.length > MAX_BYTES) throw Object.assign(new Error('llms.txt completo supera el límite de 64 KiB.'), { exitCode: 3 });
  return bytes;
}

async function verifyDiscoveryDestinations(assetRoot) {
  for (const path of F3_ASSET_TYPES.keys()) {
    const target = await stat(join(assetRoot, path));
    if (!target.isFile() || target.size === 0) throw Object.assign(new Error(`Destino F3 ausente o vacío: ${path}`), { exitCode: 3 });
  }
}

// Invocado por el hook F3 después de generar y validar los artifacts A.
// serializeLlms sigue produciendo el prefijo F1; no se reescribe su contrato.
export async function appendInterfaces(buildDir) {
  const inventoryData = await inspectBuild(buildDir);
  const assetRoot = resolve(process.cwd(), inventoryData.assetDirectory);
  const prefix = serializeLlms(inventoryData);
  const expected = completeLlms(prefix);
  const target = join(assetRoot, 'llms.txt');
  const actual = await readFile(target);
  await verifyDiscoveryDestinations(assetRoot);
  if (actual.equals(expected)) return expected;
  if (!actual.equals(prefix)) throw Object.assign(new Error('Prefijo llms F1 alterado o sección F3 inválida.'), { exitCode: 3 });
  await writeFile(target, expected);
  return expected;
}

function ascii(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function escapeMarkdown(value) {
  return String(value).replace(/[\\\[\]()*_`<>]/gu, '\\$&');
}

function validCanonical(page) {
  if (typeof page.canonicalUrl !== 'string' || typeof page.canonicalPath !== 'string') return false;
  try {
    const url = new URL(page.canonicalUrl);
    return url.origin === SITE && url.pathname === page.canonicalPath && !url.search && !url.hash &&
      !url.username && !url.password && !/[?#\\]/u.test(url.pathname) &&
      !url.pathname.split('/').some((part) => part === '.' || part === '..');
  } catch {
    return false;
  }
}

function entryLine(page) {
  if (typeof page.title !== 'string' || !page.title.trim()) throw new Error(`Falta el H1 de ${page.canonicalPath ?? page.documentId}.`);
  if (typeof page.description !== 'string' || !page.description.trim()) throw new Error(`Falta meta description de ${page.canonicalPath ?? page.documentId}.`);
  if (!validCanonical(page)) throw new Error(`Canonical inseguro o inválido para ${page.documentId}.`);
  const description = page.description.replace(/\s+/gu, ' ').trim();
  return `- [${escapeMarkdown(page.title.trim())}](<${page.canonicalUrl}>): ${escapeMarkdown(description)}`;
}

export function serializeLlms(inventoryData) {
  if (!inventoryData || inventoryData.state !== 'valid' || !Array.isArray(inventoryData.pages)) {
    throw new Error('El inventario construido no es válido.');
  }
  const documents = inventoryData.pages.filter((page) => page.disposition === 'document');
  const homes = documents.filter((page) => page.kind === 'home' && page.documentId === 'home' && page.canonicalPath === '/');
  if (homes.length !== 1) throw new Error(`Se esperaba una home; observadas ${homes.length}.`);
  const home = homes[0];
  if (typeof home.description !== 'string' || !home.description.trim()) throw new Error('Falta meta description de la home.');
  if (!validCanonical(home)) throw new Error('Canonical inseguro o inválido para home.');

  const section = (heading, kind) => {
    const pages = documents.filter((page) => page.kind === kind)
      .sort((a, b) => ascii(a.canonicalPath ?? '', b.canonicalPath ?? ''));
    return [`## ${heading}`, ...pages.map(entryLine)].join('\n');
  };
  const text = [
    '# Cuida a tu Perro Viejo',
    '',
    `> ${escapeMarkdown(home.description.replace(/\s+/gu, ' ').trim())}`,
    '',
    'Guías y herramientas para cuidar a perros senior. La información del sitio no sustituye la evaluación veterinaria.',
    '',
    section('Guías por tema', 'pillar'),
    '',
    section('Herramientas', 'tool'),
    '',
    section('Sobre el sitio y sus criterios editoriales', 'editorial'),
    '',
    '## Uso del contenido',
    '',
    'Búsqueda: permitida. Uso como contexto de IA: permitido. Entrenamiento de modelos: no permitido.',
    '- [Política para agentes](https://cuidatuperroviejo.com/robots.txt)',
    '- [Sitemap](https://cuidatuperroviejo.com/sitemap-index.xml)',
    '',
  ].join('\n');
  const bytes = Buffer.from(text, 'utf8');
  if (bytes.length > MAX_BYTES) throw new Error(`llms.txt supera el límite de 64 KiB (${bytes.length} bytes).`);
  return bytes;
}

async function inspectBuild(buildDir) {
  const scratch = await mkdtemp(join(tmpdir(), 'ctpv-f1-discovery-'));
  try {
    const outDir = join(scratch, 'inventory');
    const exitCode = await inventory(buildDir, outDir);
    const inventoryData = JSON.parse(await readFile(join(outDir, 'inventory.json'), 'utf8'));
    if (exitCode !== 0 || inventoryData.state !== 'valid' || inventoryData.errors.length !== 0) {
      const summary = (inventoryData.errors ?? []).map((error) => `${error.code}: ${error.message}`).join('; ');
      throw Object.assign(new Error(`Inventario inválido: ${summary || 'estado no válido'}.`), { exitCode: exitCode === 1 ? 1 : 3 });
    }
    return inventoryData;
  } finally {
    await rm(scratch, { recursive: true, force: true });
  }
}

export function discoveryIntegration() {
  let config;
  return {
    name: 'agent-readiness-discovery',
    hooks: {
      'astro:config:done': ({ config: resolvedConfig }) => { config = resolvedConfig; },
      'astro:build:done': async ({ logger }) => {
        if (!config?.build?.client) throw new Error('No se resolvió config.build.client para generar llms.txt.');
        const assetRoot = fileURLToPath(config.build.client);
        const inventoryData = await inspectBuild(assetRoot);
        const bytes = serializeLlms(inventoryData);
        const target = join(assetRoot, 'llms.txt');
        const { writeFile } = await import('node:fs/promises');
        await writeFile(target, bytes, { flag: 'wx' });
        logger.info(`llms.txt generado después de sitemap (${bytes.length} bytes).`);
      },
    },
  };
}

function parseCheckArgs(args) {
  if (args[0] !== 'check' || args.length !== 3 || args[1] !== '--build-dir' || !args[2] || args[2].startsWith('-')) {
    throw Object.assign(new Error('Uso: node scripts/agent-readiness/discovery.mjs check --build-dir <directorio>'), { exitCode: 3 });
  }
  return resolve(process.cwd(), args[2]);
}

export async function checkDiscoveryBuild(buildDir) {
  const inventoryData = await inspectBuild(buildDir);
  const expectedLlms = completeLlms(serializeLlms(inventoryData));
  const assetRoot = resolve(process.cwd(), inventoryData.assetDirectory);
  const [actualLlms, builtRobots, sourceRobots, sourceHeaders, builtHeaders] = await Promise.all([
    readFile(join(assetRoot, 'llms.txt')),
    readFile(join(assetRoot, 'robots.txt')),
    readFile(join(ROOT, 'public/robots.txt')),
    readFile(join(ROOT, 'public/_headers'), 'utf8'),
    readFile(join(assetRoot, '_headers'), 'utf8'),
  ]);
  if (!actualLlms.equals(expectedLlms)) throw Object.assign(new Error('llms.txt no conserva el prefijo F1 y la sección F3 byteexactos.'), { exitCode: 3 });
  await verifyDiscoveryDestinations(assetRoot);
  if (!sourceRobots.equals(Buffer.from(ROBOTS, 'utf8')) || !builtRobots.equals(sourceRobots)) {
    throw Object.assign(new Error('robots.txt fuente o construido no coincide con la política aprobada.'), { exitCode: 3 });
  }
  const count = (text, needle) => text.split(needle).length - 1;
  if (count(sourceHeaders, LINK) !== 1 || count(builtHeaders, LINK) !== 1 ||
      !sourceHeaders.includes('/robots.txt\n  Content-Type: text/plain; charset=utf-8') ||
      !sourceHeaders.includes('/llms.txt\n  Content-Type: text/plain; charset=utf-8')) {
    throw Object.assign(new Error('Reglas fuente o construidas de Link/MIME no coinciden con el contrato F1/F3.'), { exitCode: 3 });
  }
  if (builtHeaders !== sourceHeaders) throw Object.assign(new Error('_headers construido difiere de las reglas fuente.'), { exitCode: 3 });
  for (const [path, type] of F3_ASSET_TYPES) {
    const rule = `${path}\n  Content-Type: ${type}\n  Cache-Control: no-store\n  Access-Control-Allow-Origin: *`;
    if (count(sourceHeaders, rule) !== 1) throw Object.assign(new Error(`MIME/cache/CORS F3 inválidos para ${path}.`), { exitCode: 3 });
  }
}

async function main(args) {
  try {
    const buildDir = parseCheckArgs(args);
    await checkDiscoveryBuild(buildDir);
    process.stdout.write('OK: prefijo llms F1, extensión F3, política y Link/MIME/CORS verificados sin modificar assets.\n');
    return 0;
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    return error.exitCode ?? (error.code === 'ENOENT' || error.code === 'EACCES' ? 1 : 3);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  process.exitCode = await main(process.argv.slice(2));
}

export { main as runDiscoveryCheck };
