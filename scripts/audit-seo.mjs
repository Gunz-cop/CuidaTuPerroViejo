#!/usr/bin/env node
/**
 * Auditoría de consolidación de URLs (Fase 0 de la hoja de ruta).
 *
 * Comprueba tres cosas que el estudio de viabilidad marca como prioridad cero:
 *  1. que toda `legacyUrl` declarada en el contenido tenga su regla en _redirects;
 *  2. que las redirecciones vivas sean 301 de una sola etapa hacia una URL canónica;
 *  3. que el sitemap publicado sólo contenga URLs canónicas que respondan 200.
 *
 * Uso:  node scripts/audit-seo.mjs [--offline]
 * `--offline` salta las comprobaciones de red y sólo audita el repositorio.
 */
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://cuidatuperroviejo.com';
const OFFLINE = process.argv.includes('--offline');
const problems = [];
const flag = (msg) => { problems.push(msg); console.log(`  ✗ ${msg}`); };
const ok = (msg) => console.log(`  ✓ ${msg}`);

function readContentFiles() {
  return ['src/content/blog', 'src/content/pilares'].flatMap((dir) =>
    fs.readdirSync(dir)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => path.join(dir, f)),
  );
}

/** Sigue la cadena de redirecciones a mano para poder contar los saltos. */
async function chain(url, max = 5) {
  const hops = [];
  let current = url;
  for (let i = 0; i < max; i++) {
    const res = await fetch(current, { redirect: 'manual' });
    const location = res.headers.get('location');
    hops.push({ url: current, status: res.status, location });
    if (!location) return hops;
    current = new URL(location, current).href;
  }
  return hops;
}

console.log('\n1. Cobertura de legacyUrl en public/_redirects');
const redirects = fs.readFileSync('public/_redirects', 'utf8');
const sources = new Set(
  redirects
    .split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith('#'))
    .map((l) => l.trim().split(/\s+/)[0]),
);
let legacyCount = 0;
for (const file of readContentFiles()) {
  const match = fs.readFileSync(file, 'utf8').match(/^legacyUrl:\s*"([^"]+)"/m);
  if (!match) continue;
  legacyCount++;
  const pathname = new URL(match[1]).pathname;
  if (!sources.has(pathname)) flag(`${pathname} declarada en ${file} pero sin regla 301`);
}
if (!problems.length) ok(`${legacyCount} legacyUrl con redirección declarada`);

console.log('\n2. Fechas de schema');
for (const file of readContentFiles()) {
  const raw = fs.readFileSync(file, 'utf8');
  const pub = (raw.match(/^datePublished:\s*"?([\d-]+)"?/m) || [])[1];
  const mod = (raw.match(/^dateModified:\s*"?([\d-]+)"?/m) || [])[1];
  if (pub && mod && mod < pub) flag(`${file}: dateModified (${mod}) anterior a datePublished (${pub})`);
}
ok('revisadas fechas de frontmatter');

if (OFFLINE) {
  console.log('\n(--offline: se omiten las comprobaciones de red)');
} else {
  console.log('\n3. Cadenas de redirección en producción');
  const targets = [...sources, '/index.html', '/salud-perros-mayores/'];
  for (const src of targets) {
    const hops = await chain(new URL(src, SITE).href);
    const final = hops[hops.length - 1];
    if (final.status !== 200) {
      flag(`${src} termina en ${final.status} (${final.url})`);
    } else if (hops.length > 2) {
      flag(`${src} encadena ${hops.length - 1} saltos: ${hops.map((h) => h.status).join(' → ')}`);
    } else if (hops.length === 2 && hops[0].status !== 301) {
      flag(`${src} redirige con ${hops[0].status} en vez de 301`);
    }
  }
  const httpHops = await chain(`http://cuidatuperroviejo.com/salud-perros-mayores`);
  if (httpHops[0].status === 200) flag('http:// sirve 200 sin redirigir a https (activar "Always Use HTTPS" en Cloudflare)');

  console.log('\n4. Sitemap publicado');
  const xml = await fetch(`${SITE}/sitemap-0.xml`).then((r) => r.text());
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    const res = await fetch(loc, { redirect: 'manual' });
    if (res.status !== 200) flag(`sitemap incluye ${loc} → ${res.status}`);
  }
  ok(`${locs.length} URLs en el sitemap`);
}

console.log(`\n${problems.length ? `${problems.length} problema(s) detectado(s).` : 'Sin problemas detectados.'}`);
process.exit(problems.length ? 1 : 0);
