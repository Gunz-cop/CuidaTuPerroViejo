#!/usr/bin/env node
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { inventory } from './inventory.mjs';

const SITE = 'https://cuidatuperroviejo.com';
const MAX_BYTES = 64 * 1024;
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ROBOTS = 'User-agent: *\nAllow: /\nContent-Signal: search=yes, ai-input=yes, ai-train=no\n\nSitemap: https://cuidatuperroviejo.com/sitemap-index.xml\n';
const LINK = 'Link: <https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"';

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

async function checkBuild(buildDir) {
  const inventoryData = await inspectBuild(buildDir);
  const expectedLlms = serializeLlms(inventoryData);
  const assetRoot = resolve(process.cwd(), inventoryData.assetDirectory);
  const [actualLlms, builtRobots, sourceRobots, sourceHeaders, builtHeaders] = await Promise.all([
    readFile(join(assetRoot, 'llms.txt')),
    readFile(join(assetRoot, 'robots.txt')),
    readFile(join(ROOT, 'public/robots.txt')),
    readFile(join(ROOT, 'public/_headers'), 'utf8'),
    readFile(join(assetRoot, '_headers'), 'utf8'),
  ]);
  if (!actualLlms.equals(expectedLlms)) throw Object.assign(new Error('llms.txt del build no coincide byte por byte con el inventario.'), { exitCode: 3 });
  if (!sourceRobots.equals(Buffer.from(ROBOTS, 'utf8')) || !builtRobots.equals(sourceRobots)) {
    throw Object.assign(new Error('robots.txt fuente o construido no coincide con la política aprobada.'), { exitCode: 3 });
  }
  const count = (text, needle) => text.split(needle).length - 1;
  if (count(sourceHeaders, LINK) !== 1 || count(builtHeaders, LINK) !== 1 ||
      !sourceHeaders.includes('/robots.txt\n  Content-Type: text/plain; charset=utf-8') ||
      !sourceHeaders.includes('/llms.txt\n  Content-Type: text/plain; charset=utf-8')) {
    throw Object.assign(new Error('Reglas fuente o construidas de Link/MIME no coinciden con el contrato F1.'), { exitCode: 3 });
  }
  if (builtHeaders !== sourceHeaders) throw Object.assign(new Error('_headers construido difiere de las reglas fuente.'), { exitCode: 3 });
}

async function main(args) {
  try {
    const buildDir = parseCheckArgs(args);
    await checkBuild(buildDir);
    process.stdout.write('OK: llms.txt, robots.txt y Link/MIME F1 verificados sin modificar assets.\n');
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
