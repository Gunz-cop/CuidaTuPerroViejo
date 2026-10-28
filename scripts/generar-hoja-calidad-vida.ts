/**
 * Genera la hoja de registro imprimible de la escala HHHHHMM adaptada:
 * public/descargas/hoja-registro-calidad-vida-hhhhhmm.pdf
 *
 * Las siete áreas, sus preguntas y los extremos 0/10 salen de CRITERIA
 * (src/lib/agent-tools/calidad-vida.ts), la misma fuente que la calculadora,
 * para que papel y herramienta no puedan divergir. Si cambian los criterios,
 * vuelve a ejecutar este script y sube el PDF.
 *
 * Uso: npx tsx scripts/generar-hoja-calidad-vida.ts
 * Necesita Playwright con Chromium (preinstalado en el entorno de los agentes;
 * no es dependencia del proyecto porque el build no lo usa).
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { CRITERIA, CRITERION_MAX, MAX_SCORE } from '../src/lib/agent-tools/calidad-vida.ts';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const OUTPUT = path.resolve('public/descargas/hoja-registro-calidad-vida-hhhhhmm.pdf');
const TOOL_URL = 'cuidatuperroviejo.com/herramientas/calculadora-calidad-vida-perros';
const VERSION = 'Versión de octubre de 2026';
const COLUMNS = 7;
// Fuentes TrueType estáticas del sistema (Carlito, Caladea; DejaVu de reserva).
// Las fuentes CFF o variables, incluidas las del sitio servidas por Google
// Fonts, Chromium las incrusta como Type 3, y algunos visores pierden los
// espacios entre palabras. Comprueba con `pdffonts` que salen «CID TrueType».

// Qué mirar en cada área: el mismo sentido que la sección «¿Qué significan los
// criterios?» de la calculadora, condensado para que quepa en papel.
const LOOK_FOR: Record<string, string> = {
  hurt: 'Si el dolor está controlado y puede respirar con facilidad.',
  hunger: 'Si come lo suficiente por su cuenta o necesita que le ayudes. Anota lo que deja en el plato.',
  hydration: 'Si bebe lo suficiente. Cualquier cambio en la sed se comenta en consulta.',
  hygiene: 'Si se le puede mantener limpio y seco, y si tiene llagas por estar mucho tiempo tumbado.',
  happiness: 'Si muestra interés por la familia, responde a las caricias y disfruta de pequeños placeres.',
  mobility: 'Si se levanta y camina solo o necesita ayuda, arnés o rampa, y si tiene ganas de moverse.',
  moreGoodDays: 'Si en la semana hubo más días buenos que malos. Marca los días malos en la fila de notas.',
};

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const dateCells = (cls: string) => Array.from({ length: COLUMNS }, () => `<td class="${cls}"></td>`).join('');

const rows = CRITERIA.map((c) => `
  <tr>
    <th scope="row">
      <span class="area">${escape(c.label)}</span>
      <span class="q">${escape(c.question)}</span>
      <span class="ends">0 = ${escape(c.lo)} · ${CRITERION_MAX} = ${escape(c.hi)}</span>
    </th>
    ${dateCells('score')}
  </tr>`).join('');

const lookFor = CRITERIA.map((c) => `
  <li><strong>${escape(c.label)}.</strong> ${escape(LOOK_FOR[c.key])}</li>`).join('');

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Hoja de registro de calidad de vida (HHHHHMM adaptada)</title>
<style>
  @page { size: A4; margin: 14mm 13mm 14mm; }
  :root {
    --text: rgb(27 28 25); --muted: rgb(66 72 67); --primary: rgb(69 99 79);
    --accent: rgb(124 87 48); --border: rgb(190 192 185); --soft: rgb(241 244 239);
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Carlito, 'DejaVu Sans', sans-serif; color: var(--text); font-size: 10.5pt; line-height: 1.35; }
  h1, h2 { font-family: Caladea, 'DejaVu Serif', serif; color: var(--primary); margin: 0; }
  h1 { font-size: 17pt; line-height: 1.2; }
  h2 { font-size: 12pt; margin: 0 0 2mm; }
  .kicker { font-size: 7.5pt; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin: 0 0 1mm; }
  .lead { color: var(--muted); margin: 2mm 0 4mm; }
  .fields { display: grid; grid-template-columns: 1.4fr 1fr 1.4fr; gap: 3mm 6mm; margin-bottom: 4mm; }
  .field { border-bottom: 0.8pt solid var(--border); padding-bottom: 1mm; font-size: 8pt; color: var(--muted); height: 9mm; display: flex; align-items: flex-end; }
  .alert { border: 1pt solid var(--accent); border-radius: 3mm; padding: 2.5mm 3.5mm; margin-bottom: 4mm; background: rgb(250 245 238); }
  .alert strong { color: var(--accent); }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  th, td { border: 0.8pt solid var(--border); }
  thead th { background: var(--soft); font-size: 7.5pt; font-weight: 600; color: var(--muted); padding: 1.5mm; text-align: center; height: 11mm; vertical-align: bottom; }
  thead th.label { text-align: left; width: 38%; }
  tbody th { text-align: left; padding: 1.8mm 2.2mm; font-weight: 400; vertical-align: top; }
  .area { display: block; font-weight: 700; font-size: 10pt; color: var(--primary); }
  .q { display: block; }
  .ends { display: block; font-size: 7.5pt; color: var(--muted); margin-top: .5mm; }
  td.score { height: 17mm; }
  tr.total th, tr.notes th { background: var(--soft); }
  tr.total td { height: 10mm; }
  tr.notes td { height: 28mm; }
  .hint { font-size: 7.5pt; color: var(--muted); display: block; font-weight: 400; }
  .page2 { break-before: page; }
  ol, ul { margin: 0 0 4mm; padding-left: 5mm; }
  li { margin-bottom: 1.5mm; }
  .lines div { border-bottom: 0.8pt solid var(--border); height: 8.5mm; }
  footer { margin-top: 5mm; font-size: 7.5pt; color: var(--muted); border-top: 0.8pt solid var(--border); padding-top: 2mm; }
</style>
</head>
<body>
  <p class="kicker">Cuida tu Perro Viejo · Hoja para imprimir</p>
  <h1>Registro de calidad de vida de tu perro mayor</h1>
  <p class="lead">Adaptación de la escala HHHHHMM de la Dra. Alice Villalobos. Puntúa cada área de 0 a ${CRITERION_MAX} con lo que has visto, a la misma hora del día, y lleva la hoja a la consulta. Lo que más ayuda al veterinario es ver cómo cambia cada fila con el tiempo.</p>

  <div class="fields">
    <div class="field">Nombre del perro</div>
    <div class="field">Edad</div>
    <div class="field">Veterinario y teléfono</div>
  </div>

  <div class="alert"><strong>No esperes a rellenarla</strong> si tiene dificultad para respirar, dolor intenso o se desploma: busca atención veterinaria inmediata. Si marcas 0 en dolor, llama a tu veterinario aunque el resto de las áreas estén bien.</div>

  <table>
    <thead>
      <tr>
        <th class="label" scope="col">Área (0 a ${CRITERION_MAX})</th>
        ${Array.from({ length: COLUMNS }, () => '<th scope="col">Fecha<br>___/___</th>').join('')}
      </tr>
    </thead>
    <tbody>
      ${rows}
      <tr class="total">
        <th scope="row"><span class="area">Suma (0 a ${MAX_SCORE})</span><span class="hint">Orientativa: no es un diagnóstico.</span></th>
        ${dateCells('')}
      </tr>
      <tr class="notes">
        <th scope="row"><span class="area">Notas del día</span><span class="hint">Cambios, medicación, un día malo…</span></th>
        ${dateCells('')}
      </tr>
    </tbody>
  </table>

  <section class="page2">
    <p class="kicker">Cómo usar la hoja</p>
    <h2>Qué mirar en cada área</h2>
    <ul>${lookFor}
    </ul>

    <h2>Cómo leer la suma</h2>
    <ul>
      <li>La suma va de 0 a ${MAX_SCORE}, pero <strong>no es un aprobado ni un suspenso</strong>. Esta adaptación no fija cortes para decidir nada.</li>
      <li>Un 0 o un valor muy bajo en un área importa por sí solo: una suma alta no lo compensa.</li>
      <li>Lo útil es la tendencia: qué filas bajan de una semana a otra y desde cuándo.</li>
      <li>No cambies ni retires un tratamiento por lo que salga en la hoja. Coméntalo en la consulta.</li>
    </ul>

    <h2>Notas para la consulta</h2>
    <div class="lines">${'<div></div>'.repeat(12)}</div>

    <footer>
      La escala HHHHHMM (Hurt, Hunger, Hydration, Hygiene, Happiness, Mobility, More good days than bad) fue desarrollada por la Dra. Alice Villalobos. Esta hoja es una adaptación de Cuida tu Perro Viejo para registrar observaciones en casa: ordena lo que ves y no sustituye la valoración veterinaria. ${VERSION}. Versión interactiva y fuentes: ${TOOL_URL}
    </footer>
  </section>
</body>
</html>`;

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: OUTPUT, format: 'A4', printBackground: true, preferCSSPageSize: true });
} finally {
  await browser.close();
}
console.log(`PDF generado: ${path.relative(process.cwd(), OUTPUT)}`);
