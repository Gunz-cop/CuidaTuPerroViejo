import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

const script = fileURLToPath(new URL('./metricas.mjs', import.meta.url));
const root = path.resolve(path.dirname(script), '../../../..');
const slug = 'limpieza-ojos-oidos-perros-ancianos';
const article = fs.readFileSync(path.join(root, 'src/content/blog', `${slug}.mdx`), 'utf8');
const brief = fs.readFileSync(path.join(root, 'briefings', `briefing-${slug}.md`), 'utf8');

async function audit(transform = x => x, removeImage = false) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ctpv-metricas-'));
  try {
    fs.mkdirSync(path.join(dir, 'src/content/blog'), { recursive: true });
    fs.mkdirSync(path.join(dir, 'briefings'));
    fs.writeFileSync(path.join(dir, 'src/content/blog', `${slug}.mdx`), article);
    fs.writeFileSync(path.join(dir, 'briefings', `briefing-${slug}.md`), transform(brief));
    const images = path.join(dir, 'public/images/blog', slug);
    fs.mkdirSync(images, { recursive: true });
    // Existence is the script's scope; image decoding remains a manual check.
    for (const name of fs.readdirSync(path.join(root, 'public/images/blog', slug))) {
      fs.writeFileSync(path.join(images, name), '');
    }
    if (removeImage) fs.unlinkSync(path.join(images, 'masaje-base-oreja-limpiador-otico-400.webp'));
    const previous = { cwd: process.cwd(), argv: process.argv, exitCode: process.exitCode, log: console.log };
    let stdout = '';
    try {
      process.chdir(dir);
      process.argv = [process.execPath, script, slug, '--strict'];
      process.exitCode = 0;
      console.log = value => { stdout += String(value) + '\n'; };
      await import(pathToFileURL(script).href + '?case=' + encodeURIComponent(dir));
      return { status: process.exitCode, stdout, stderr: '' };
    } finally {
      process.chdir(previous.cwd);
      process.argv = previous.argv;
      process.exitCode = previous.exitCode;
      console.log = previous.log;
    }
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}

test('interpreta el contrato actual, las siete fuentes y las imágenes HTML', async () => {
  const result = await audit();
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /contrato 5440–7360\)\s+OK/);
  assert.match(result.stdout, /\[7\] VCA/);
  assert.match(result.stdout, /OK\s+masaje-base-oreja-limpiador-otico-400.webp/);
});

test('mantiene compatibilidad con el rango y tabla de cuatro columnas anteriores', async () => {
  const result = await audit(x => x.replace('intervalo 5.440–7.360 palabras', 'Entre 5.440 y 7.360 palabras')
    .replace(/^\| (\d+) ([^|]+) \|/gm, '| $1 | $2 |'));
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /\[7\] VCA/);
});

test('un rango no interpretable impide APTO en vez de omitir el control', async () => {
  const result = await audit(x => x.replace('intervalo 5.440–7.360 palabras', 'intervalo por definir'));
  assert.equal(result.status, 1);
  assert.match(result.stdout, /rango del contrato ausente/);
});

test('una tabla de fuentes ausente impide APTO', async () => {
  const result = await audit(x => x.replace(/^\| \d+ [^\n]+\|$/gm, ''));
  assert.equal(result.status, 1);
  assert.match(result.stdout, /tabla de fuentes ausente/);
});

test('una variante srcset de cuerpo inexistente bloquea', async () => {
  const result = await audit(x => x, true);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /imagen inexistente: masaje-base-oreja-limpiador-otico-400.webp/);
});
