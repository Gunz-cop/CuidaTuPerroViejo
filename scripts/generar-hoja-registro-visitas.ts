/**
 * Genera la hoja imprimible «Registro de visitas» del artículo sobre el perro mayor
 * que se estresa con las visitas: public/descargas/registro-visitas-perro-mayor.pdf
 *
 * Una página A4 apaisada con las columnas que pide el brief: fecha, quién entró,
 * cuánto tiempo, dónde estaba el perro, señales, cuánto tardó en calmarse, si jadea
 * también sin visitas y notas para el veterinario. Las señales son las de la Tabla 1
 * de la guía AAHA 2015 que cita el artículo; no añade datos clínicos.
 *
 * Uso: npx tsx scripts/generar-hoja-registro-visitas.ts
 * Necesita Playwright con Chromium (preinstalado en el entorno de los agentes; no es
 * dependencia del proyecto porque el build no lo usa). Igual que la hoja HHHHHMM, usa
 * fuentes TrueType estáticas del sistema (Carlito, Caladea; DejaVu de reserva) para
 * que el PDF incruste «CID TrueType» y no Type 3: compruébalo con `pdffonts`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const OUTPUT = path.resolve('public/descargas/registro-visitas-perro-mayor.pdf');
const ARTICLE_URL = 'cuidatuperroviejo.com/salud-mental-emocional-perros/perro-mayor-miedo-visitas-casa';
const VERSION = 'Versión de noviembre de 2026';
const ROWS = 6;

const SIGNS = ['Jadeo', 'Ladridos', 'Temblor', 'Se lame labios o nariz', 'Babea', 'Se sobresalta'];

const signCell = `<td class="signs"><div class="grid">${SIGNS.map((s) => `<span><span class="box"></span>${s}</span>`).join('')}</div><span><span class="box"></span>Otra: ____________</span></td>`;

const row = () => `
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    ${signCell}
    <td></td>
    <td class="yn"><span class="box"></span>Sí &nbsp;<span class="box"></span>No<br><span class="box"></span>No lo sé</td>
    <td></td>
  </tr>`;

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Registro de visitas de tu perro mayor</title>
<style>
  @page { size: A4 landscape; margin: 10mm 11mm 10mm; }
  :root {
    --text: rgb(27 28 25); --muted: rgb(66 72 67); --primary: rgb(69 99 79);
    --accent: rgb(124 87 48); --border: rgb(190 192 185); --soft: rgb(241 244 239);
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Carlito, 'DejaVu Sans', sans-serif; color: var(--text); font-size: 9pt; line-height: 1.3; }
  h1 { font-family: Caladea, 'DejaVu Serif', serif; color: var(--primary); margin: 0; font-size: 16pt; line-height: 1.15; }
  .top { display: flex; justify-content: space-between; align-items: flex-end; gap: 8mm; margin-bottom: 2.5mm; }
  .kicker { font-size: 7pt; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin: 0 0 1mm; }
  .lead { color: var(--muted); margin: 1.5mm 0 0; max-width: 165mm; }
  .fields { display: grid; grid-template-columns: 50mm 30mm 60mm; gap: 2mm 5mm; }
  .field { border-bottom: 0.8pt solid var(--border); font-size: 7.5pt; color: var(--muted); height: 7mm; display: flex; align-items: flex-end; padding-bottom: .8mm; }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  th, td { border: 0.8pt solid var(--border); vertical-align: top; }
  thead th { background: var(--soft); font-size: 7.8pt; font-weight: 700; color: var(--primary); padding: 1.3mm 1.5mm; text-align: left; line-height: 1.2; }
  thead th small { display: block; font-weight: 400; color: var(--muted); font-size: 6.8pt; }
  tbody td { height: 21mm; padding: 1mm 1.4mm; font-size: 6.9pt; color: var(--muted); }
  td.signs, td.yn { line-height: 1.35; }
  td.signs .grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 1.5mm; }
  .box { display: inline-block; width: 2.3mm; height: 2.3mm; border: 0.7pt solid var(--muted); border-radius: .4mm; margin-right: 1mm; vertical-align: -0.3mm; }
  .bottom { display: grid; grid-template-columns: 1.15fr 1fr; gap: 6mm; margin-top: 2.5mm; font-size: 7.6pt; color: var(--muted); }
  .alert { border: 1pt solid var(--accent); border-radius: 2mm; padding: 1.6mm 2.5mm; background: rgb(250 245 238); color: var(--text); }
  .alert strong { color: var(--accent); }
  footer { margin-top: 1.5mm; font-size: 6.8pt; color: var(--muted); }
  footer .url { white-space: nowrap; }
</style>
</head>
<body>
  <div class="top">
    <div>
      <p class="kicker">Cuida tu Perro Viejo · Hoja para imprimir</p>
      <h1>Registro de visitas de tu perro mayor</h1>
      <p class="lead">Rellena una fila después de cada visita, mientras lo recuerdas: técnicos, familia, cualquier persona de fuera. Con varias filas, tu veterinario ve qué le dispara el miedo, cuánto le dura y si jadea también sin visitas.</p>
    </div>
    <div class="fields">
      <div class="field">Nombre del perro</div>
      <div class="field">Edad</div>
      <div class="field">Veterinario y teléfono</div>
    </div>
  </div>

  <table>
    <colgroup>
      <col style="width:7%"><col style="width:12%"><col style="width:8%"><col style="width:12%">
      <col style="width:21%"><col style="width:10%"><col style="width:9%"><col style="width:21%">
    </colgroup>
    <thead>
      <tr>
        <th scope="col">Fecha</th>
        <th scope="col">Quién entró<small>y qué lo disparó: timbre, voces, herramientas…</small></th>
        <th scope="col">Cuánto tiempo</th>
        <th scope="col">Dónde estaba el perro<small>y con quién</small></th>
        <th scope="col">Señales<small>marca las que viste</small></th>
        <th scope="col">Cuánto tardó en calmarse</th>
        <th scope="col">¿Jadea también sin visitas?</th>
        <th scope="col">Notas para el veterinario<small>medicación, crisis, si orinó, si comió</small></th>
      </tr>
    </thead>
    <tbody>${Array.from({ length: ROWS }, row).join('')}
    </tbody>
  </table>

  <div class="bottom">
    <div class="alert"><strong>No esperes a rellenarla</strong> si convulsiona 5 minutos o más, tiene tres crisis en 24 horas (o antes, si tu veterinario te dio otra pauta), le cuesta respirar, tiene las encías azuladas o pálidas, o se desmaya: llama al veterinario ya. Si jadea también tumbado y tranquilo, coméntalo en la próxima consulta.</div>
    <div>Las señales de la columna son señales de ansiedad recogidas por la guía de comportamiento de la AAHA (2015). La hoja ordena lo que ves en casa para enseñárselo al veterinario; el diagnóstico es suyo. No cambies ni retires ninguna medicación por lo que anotes.
      <footer>${VERSION}. Guía completa y fuentes:<br><span class="url">${ARTICLE_URL}</span></footer>
    </div>
  </div>
</body>
</html>`;

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: OUTPUT, printBackground: true, preferCSSPageSize: true });
} finally {
  await browser.close();
}
console.log(`PDF generado: ${path.relative(process.cwd(), OUTPUT)}`);
