#!/usr/bin/env node
/**
 * Métricas objetivas para auditar artículos de blog de cuidatuperroviejo.com
 * contra el brief que los encargó.
 *
 * Uso:
 *   node .agents/skills/auditar-articulo-blog/scripts/metricas.mjs <slug> [slug2 ...]
 *   node .agents/skills/auditar-articulo-blog/scripts/metricas.mjs --todos
 *
 * Banderas:
 *   --todos     audita todos los .mdx que tengan brief correspondiente
 *   --strict    código de salida 1 si hay bloqueantes (para lazos automáticos)
 *
 * Termina con un bloque `# VEREDICTO` por artículo. Ojo con qué significa:
 * APTO es "no quedan defectos mecánicos", NO "el artículo es bueno". Lo que de
 * verdad hunde un artículo —un autor inventado, una cifra que la fuente no
 * dice, una imagen que contradice su pie— no lo detecta ningún script. Por eso
 * cada artículo que pasa imprime PENDIENTES MANUALES: si nadie los levanta, el
 * veredicto está incompleto y hay que decirlo así en el informe.
 *
 * Umbrales y cómo leer cada número: references/metricas.md
 */

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const TODOS = args.includes('--todos');
const STRICT = args.includes('--strict');
const slugsArg = args.filter((a) => !a.startsWith('--'));

// ---------- localizar el repo ----------
function repoRoot() {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(dir, 'src', 'content', 'blog'))) return dir;
    dir = path.dirname(dir);
  }
  throw new Error('No encuentro la raíz del repo (src/content/blog).');
}
const ROOT = repoRoot();
const BLOG = path.join(ROOT, 'src', 'content', 'blog');
const BRIEFS = path.join(ROOT, 'briefings');
const IMGS = path.join(ROOT, 'public', 'images', 'blog');

const out = [];
const p = (s = '') => out.push(s);
const pct = (real, target) => Math.round(((real - target) / target) * 100);
const sign = (n) => (n > 0 ? `+${n}` : `${n}`);

// ---------- utilidades de texto ----------
const norm = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** Cuerpo real: todo tras el segundo `---`, sin líneas import. Es el método
 *  que usa el contrato de entrega; cualquier otro conteo da un número distinto
 *  y no es comparable. */
function cuerpo(raw) {
  const lines = raw.split(/\r?\n/);
  let dashes = 0;
  let start = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/^---\s*$/.test(lines[i])) {
      dashes++;
      if (dashes === 2) {
        start = i + 1;
        break;
      }
    }
  }
  // Se descartan también los `---` sueltos del cuerpo: el método del contrato
  // los salta, y contarlos desplaza el total unas palabras hacia arriba.
  return lines.slice(start).filter((l) => !/^import\s/.test(l) && !/^---\s*$/.test(l));
}

function frontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const mm = line.match(/^(\w+):\s*"?(.*?)"?\s*$/);
    if (mm) fm[mm[1]] = mm[2];
  }
  return fm;
}

/** ¿Es una línea de prosa? Excluye títulos, imágenes, pies en cursiva, JSX,
 *  listas y líneas de código. Sobre estas se mide la densidad. */
function esProsa(l) {
  const t = l.trim();
  if (t.length === 0) return false;
  if (/^(#{1,6}\s|!\[|\*|<|>|-\s|\d+\.\s|\]|```|\|)/.test(t)) return false;
  if (/^\{/.test(t)) return false;
  return t.split(/\s+/).length > 5;
}

// ---------- parseo del brief ----------
/**
 * Del brief sacamos lo que el contrato promete, no lo que el artículo hizo:
 *  - targets por sección (Sección 6)
 *  - rango de palabras (Sección 9, punto 1)
 *  - fuentes y su H2 asignado (Sección 9, tabla de trazabilidad)
 *  - enlaces internos obligatorios (Sección 5)
 *  - nº de preguntas del FAQ
 */
function parseBrief(raw) {
  const b = { targets: [], fuentes: [], enlaces: [], min: null, max: null, faq: null };

  // Targets por sección, en orden de aparición.
  const reTarget = /^###\s+(?:\[)?(.+?)(?:\])?\s*[—-]\s*Target:\s*~?([\d.,]+)\s*palabras/gim;
  let m;
  while ((m = reTarget.exec(raw)) !== null) {
    const titulo = m[1].replace(/^\[|\]$/g, '').trim();
    const target = parseInt(m[2].replace(/[.,]/g, ''), 10);
    b.targets.push({ titulo, target });
  }

  // Rango de palabras del contrato.
  const rango = raw.match(/Entre\s+\*{0,2}([\d.]+)\s*y\s*([\d.]+)\s*palabras/i);
  if (rango) {
    b.min = parseInt(rango[1].replace(/\./g, ''), 10);
    b.max = parseInt(rango[2].replace(/\./g, ''), 10);
  }

  // Sección 3: la ficha completa de cada fuente (título real + URL). La tabla de
  // trazabilidad de la Sección 9 a veces trae una paráfrasis en español que no
  // casa con nada del cuerpo; el título de aquí sí.
  const s3 = new Map();
  const reS3 = /^\s*(\d)\.\s+\*\*Fuente \1[^*]*\*\*\s*(.+?)\s*$/gim;
  while ((m = reS3.exec(raw)) !== null) {
    const linea = m[2];
    const titulo = (linea.match(/\*([^*]{12,})\*/) || [])[1] || linea.replace(/`[^`]*`/g, '').trim();
    const url = (linea.match(/`(https?:\/\/[^`]+)`/) || [])[1] || null;
    s3.set(m[1], { titulo: titulo.trim(), url });
  }

  // Tabla de trazabilidad: | 1 | Fuente | H2 asignado | ☐ |
  const reFuente = /^\|\s*(\d)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*[☐☑x ]*\|/gim;
  while ((m = reFuente.exec(raw)) !== null) {
    const extra = s3.get(m[1]) || {};
    b.fuentes.push({
      n: m[1],
      etiqueta: m[2].trim(),
      asignado: m[3].trim(),
      titulo: extra.titulo || null,
      url: extra.url || null,
    });
  }

  // Enlaces internos obligatorios de la Sección 5 (solo los que tienen URL real).
  const reEnlace = /\|\s*\*\*(Pilar|Spoke 1|Spoke 2|Calculadora)\*\*\s*\|\s*(.+?)\s*\|\s*`?(\/[^`|\s]*)`?\s*\|/gi;
  while ((m = reEnlace.exec(raw)) !== null) {
    if (m[3] && m[3].startsWith('/')) b.enlaces.push({ tipo: m[1], url: m[3] });
  }

  // Nº de preguntas del FAQ definidas en el brief.
  const faqBlock = raw.match(/<FAQ items=\{\[([\s\S]*?)\]\}\s*\/>/);
  if (faqBlock) b.faq = (faqBlock[1].match(/\{\s*question:/g) || []).length;

  return b;
}

// ---------- secciones del artículo ----------
function seccionar(lines) {
  const secs = [{ titulo: 'INTRODUCCIÓN', desde: 0, lineas: [] }];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^##\s+(.+)/);
    if (m && !/^###/.test(lines[i])) {
      secs.push({ titulo: m[1].trim(), desde: i, lineas: [] });
    } else {
      secs[secs.length - 1].lineas.push(lines[i]);
    }
  }
  for (const s of secs) {
    s.palabras = s.lineas.join('\n').split(/\s+/).filter(Boolean).length;
  }
  return secs;
}

/** Rango de líneas del AlertBox de fuentes: citar ahí NO cuenta como citar. */
function rangoCuadroFuentes(lines) {
  const ini = lines.findIndex((l) => /AlertBox type="info" title="Fuentes/.test(l));
  if (ini < 0) return null;
  let fin = lines.findIndex((l, i) => i > ini && /<\/AlertBox>/.test(l));
  if (fin < 0) fin = lines.length - 1;
  return [ini, fin];
}

/**
 * Palabras distintivas de una etiqueta de fuente, para buscarla en el cuerpo.
 * El stoplist es largo a propósito: sin él, "Veterinary" casa con media docena
 * de fuentes distintas y el chequeo se llena de falsos positivos que dan por
 * citada una fuente que no está.
 */
const STOP = new Set(
  [
    'Fuente', 'Caso', 'Revisión', 'Guía', 'Serie', 'Estudio', 'Clínico', 'Ensayo',
    'Journal', 'Review', 'Veterinary', 'Veterinaria', 'Science', 'Sciences', 'Medicine',
    'Animals', 'Frontiers', 'PubMed', 'Wiley', 'Evidence', 'Knowledge', 'Summary',
    'Signs', 'Medical', 'Conditions', 'Cognitive', 'Decline', 'Senior', 'Dogs', 'Cats',
    'Current', 'Practices', 'Recent', 'Advances', 'Relationship', 'Between',
    'The', 'And', 'For', 'With', 'From', 'Application', 'Treatment', 'Management',
    'University', 'Health', 'Center', 'Internal', 'Research', 'Pathology',
  ].map(norm)
);

function agujas(etiqueta) {
  const limpio = etiqueta.replace(/\*/g, '');
  const fuertes = [];
  const debiles = [];
  // Un apellido seguido de "et al." o de "(año)" es la aguja más fiable.
  for (const m of limpio.matchAll(/([A-ZÁÉÍÓÚÑ][\wáéíóúñ'-]{2,})\s*(?:et al\.|\(\d{4}\))/g)) {
    fuertes.push(m[1]);
  }
  for (const w of limpio.match(/[A-ZÁÉÍÓÚÑ][\wáéíóúñ'-]{3,}/g) || []) {
    if (!STOP.has(norm(w)) && !fuertes.includes(w)) debiles.push(w);
  }
  // Respaldo por frase: hay fuentes cuya etiqueta es solo un título en inglés
  // y el stoplist se lleva todas sus palabras por separado. La frase completa
  // sigue siendo inconfundible, y así se citan de hecho en el cuerpo.
  const soloTitulo = limpio.replace(/^.*?:\s*/, '').replace(/\(.*?\)/g, '').trim();
  const palabras = soloTitulo.split(/[\s,—–-]+/).filter(Boolean);
  const frase = palabras.length >= 4 ? palabras.slice(0, 5).join(' ') : null;
  return { fuertes, frase, todas: [...new Set([...fuertes, ...debiles])].slice(0, 8) };
}

/**
 * Traduce el H2 asignado del brief ("Intro · H2-1 · H2-5 · FAQ") a índices de
 * sección del artículo. 0 = introducción, n = H2-n, última = Conclusión/FAQ.
 */
function indicesAsignados(asignado, nSecs) {
  const idx = new Set();
  if (/intro/i.test(asignado)) idx.add(0);
  if (/(conclus|faq)/i.test(asignado)) idx.add(nSecs - 1);
  for (const m of asignado.matchAll(/H2-(\d+)/gi)) {
    const n = parseInt(m[1], 10);
    if (n >= 1 && n <= nSecs - 1) idx.add(n);
  }
  return [...idx];
}

// ---------- auditoría de un artículo ----------
function auditar(slug) {
  const fileMdx = path.join(BLOG, `${slug}.mdx`);
  const fileBrief = path.join(BRIEFS, `briefing-${slug}.md`);
  const v = { bloqueantes: [], avisos: [], manuales: [] };

  if (!fs.existsSync(fileMdx)) {
    p(`## ${slug}`);
    p(`  ERROR: no existe ${path.relative(ROOT, fileMdx)}`);
    return { v: { bloqueantes: ['artículo inexistente'], avisos: [], manuales: [] } };
  }

  const raw = fs.readFileSync(fileMdx, 'utf8');
  const fm = frontmatter(raw);
  const lines = cuerpo(raw);
  const total = lines.join('\n').split(/\s+/).filter(Boolean).length;
  const secs = seccionar(lines);
  const brief = fs.existsSync(fileBrief) ? parseBrief(fs.readFileSync(fileBrief, 'utf8')) : null;

  p(`# ${slug}`);
  p();

  // ----- 1. VOLUMEN Y DISTRIBUCIÓN -----
  p(`## 1. Volumen y distribución`);
  if (!brief) {
    p(`  AVISO: no existe briefings/briefing-${slug}.md — sin contrato contra el que medir.`);
    v.avisos.push('sin brief: volumen no verificable contra contrato');
    p(`  Total: ${total} palabras`);
  } else {
    const dentro = brief.min && total >= brief.min && total <= brief.max;
    p(`  Total: ${total} palabras (contrato ${brief.min}–${brief.max})  ${dentro ? 'OK' : 'FUERA'}`);
    if (brief.min && total < brief.min) v.bloqueantes.push(`volumen ${total} < mínimo ${brief.min} (faltan ${brief.min - total})`);
    if (brief.max && total > brief.max) v.bloqueantes.push(`volumen ${total} > máximo ${brief.max} (sobran ${total - brief.max})`);
    p();

    // Emparejamiento posicional: el brief define N secciones en orden.
    p(`  | # | Sección del artículo | Real | Target | Desv. |`);
    p(`  |---|---|---|---|---|`);
    const n = Math.max(secs.length, brief.targets.length);
    for (let i = 0; i < n; i++) {
      const s = secs[i];
      const t = brief.targets[i];
      if (!s) {
        p(`  | ${i + 1} | — (falta) | — | ${t.target} | — |`);
        v.bloqueantes.push(`falta la sección "${t.titulo}" del brief`);
        continue;
      }
      if (!t) {
        p(`  | ${i + 1} | ${s.titulo.slice(0, 40)} | ${s.palabras} | — (no en brief) | — |`);
        v.avisos.push(`sección extra no prevista en el brief: "${s.titulo}"`);
        continue;
      }
      const d = pct(s.palabras, t.target);
      const fuera = Math.abs(d) > 15;
      p(`  | ${i + 1} | ${s.titulo.slice(0, 40)} | ${s.palabras} | ${t.target} | ${sign(d)}%${fuera ? ' FUERA' : ''} |`);
      if (fuera) v.bloqueantes.push(`sección "${s.titulo.slice(0, 40)}" ${s.palabras}/${t.target} (${sign(d)}%)`);
    }
    p();
    p(`  Emparejamiento posicional brief↔artículo. Si los títulos de una fila no`);
    p(`  se corresponden, el artículo reordenó o fusionó secciones: revisalo a mano.`);
  }
  p();

  // ----- 2. DENSIDAD -----
  p(`## 2. Densidad de párrafo`);
  const parr = lines.filter(esProsa).map((l) => l.trim().split(/\s+/).length).sort((a, b) => a - b);
  if (parr.length) {
    const media = Math.round(parr.reduce((a, b) => a + b, 0) / parr.length);
    const mediana = parr[Math.floor(parr.length / 2)];
    const gordos = parr.filter((x) => x > 50).length;
    const pctG = Math.round((gordos * 100) / parr.length);
    // Barrido aparte y con el listón más bajo que `esProsa`: el peor resto de
    // partir párrafos es una cita cortada por el punto de "et al.", que son
    // dos o tres palabras y se colaría por debajo del filtro de prosa.
    const sueltos = lines.filter((l) => {
      const t = l.trim();
      if (!t || /^(#{1,6}\s|!\[|\*|<|>|-\s|\d+\.\s|\]|```|\||\{)/.test(t)) return false;
      return t.split(/\s+/).length < 12;
    });
    const huerfanos = sueltos.length;
    p(`  párrafos: ${parr.length} | media: ${media} | mediana: ${mediana} | >50 palabras: ${pctG}% | máx: ${parr[parr.length - 1]}`);
    // El otro extremo: partir párrafos a lo bruto para bajar la media deja
    // fragmentos sueltos, y a veces parte una cita por el punto de "et al.".
    p(`  fragmentos sueltos (<12 palabras): ${huerfanos}`);
    if (huerfanos > 2) {
      v.avisos.push(`${huerfanos} fragmentos sueltos de <12 palabras: revisar si son énfasis o restos de partir párrafos`);
      p(`  Revisar a mano: un artículo bien aireado de este blog tiene 0.`);
      for (const l of sueltos) p(`      (${l.trim().split(/\s+/).length}) ${l.trim()}`);
    }
    p(`  spec mobile-first: 30–40 palabras.`);
    if (media > 45) {
      v.bloqueantes.push(`densidad media ${media} palabras/párrafo (spec 30–40)`);
      p(`  FUERA — al doble de densidad. Si además falta volumen: PARTIR antes de ampliar.`);
    } else if (media > 40) {
      v.avisos.push(`densidad media ${media} palabras/párrafo (spec 30–40)`);
      p(`  Alta.`);
    } else {
      p(`  OK.`);
    }
  }
  const h2 = secs.length - 1;
  const h3 = lines.filter((l) => /^###\s/.test(l)).length;
  p(`  H2: ${h2} | H3: ${h3} | ~${h3 ? Math.round(total / h3) : '∞'} palabras por H3 (spec 150–200)`);
  if (h3 && total / h3 > 260) v.avisos.push(`cadencia de H3 baja: 1 cada ~${Math.round(total / h3)} palabras`);
  p();

  // ----- 3. FUENTES -----
  p(`## 3. Fuentes citadas por nombre, dentro de su H2`);
  const cuadro = rangoCuadroFuentes(lines);
  if (!cuadro) {
    v.bloqueantes.push('falta el AlertBox "Fuentes científicas y de autoridad"');
    p(`  BLOQUEA: no existe el cuadro de fuentes de cierre.`);
  }
  if (brief && brief.fuentes.length) {
    for (const f of brief.fuentes) {
      // Se buscan las agujas de la etiqueta de trazabilidad y las del título
      // real de la Sección 3: cualquiera de las dos vale como cita.
      const a1 = agujas(f.etiqueta);
      const a2 = f.titulo ? agujas(f.titulo) : { fuertes: [], frase: null, todas: [] };
      const ag = {
        fuertes: [...a1.fuertes, ...a2.fuertes],
        frase: a1.frase,
        frase2: a2.frase,
        todas: [...new Set([...a1.todas, ...a2.todas])],
      };
      const hits = new Map(); // índice de sección -> aguja que la encontró
      for (let i = 0; i < lines.length; i++) {
        if (cuadro && i >= cuadro[0] && i <= cuadro[1]) continue; // el cuadro no cuenta
        let a = ag.todas.find((x) => lines[i].includes(x));
        for (const fr of [ag.frase, ag.frase2]) {
          if (!a && fr && norm(lines[i]).includes(norm(fr))) a = `«${fr}…»`;
        }
        if (!a) continue;
        const si = secs.map((s, k) => (s.desde <= i ? k : -1)).filter((k) => k >= 0).pop();
        if (si !== undefined && !hits.has(si)) hits.set(si, a);
      }
      const etq = f.etiqueta.replace(/\*/g, '').slice(0, 46);
      const esperados = indicesAsignados(f.asignado, secs.length);
      p(`  [${f.n}] ${etq}`);
      p(`      asignada a: ${f.asignado}  ->  secciones ${esperados.join(', ') || '?'}`);
      if (!hits.size) {
        p(`      BLOQUEA: no aparece en el cuerpo (solo en el cuadro de cierre, o ausente).`);
        p(`      agujas buscadas: ${ag.todas.join(', ') || '(ninguna)'}`);
        v.bloqueantes.push(`fuente ${f.n} (${etq}) no citada en el cuerpo`);
      } else {
        for (const [si, a] of [...hits].sort((x, y) => x[0] - y[0])) {
          const ok = esperados.includes(si);
          p(`      ${ok ? 'OK ' : '·  '} sec ${si} ${secs[si].titulo.slice(0, 34)}  (aguja "${a}")`);
        }
        const cubre = esperados.length ? esperados.some((e) => hits.has(e)) : true;
        if (!cubre) {
          p(`      BLOQUEA: aparece en el cuerpo pero NO en la sección que le asignó el brief.`);
          v.bloqueantes.push(`fuente ${f.n} (${etq}) citada fuera de su H2 asignado (${f.asignado})`);
        }
        if (ag.fuertes.length === 0)
          p(`      (agujas débiles: sin apellido+año en la etiqueta, verificá a mano que el match sea real)`);
        v.manuales.push(`fuente ${f.n}: abrir la URL y confirmar que respalda la afirmación exacta, y que autoría/año/revista coincidan con la fuente real`);
      }
    }
  } else {
    p(`  (sin tabla de trazabilidad en el brief)`);
  }
  p();

  // ----- 4. ENLACES INTERNOS -----
  p(`## 4. Enlaces internos`);
  const enlaces = [...raw.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]).filter((u) => !u.startsWith('/images/'));
  p(`  presentes: ${enlaces.length ? [...new Set(enlaces)].join(', ') : '(ninguno)'}`);
  if (brief && brief.enlaces.length) {
    for (const e of brief.enlaces) {
      const ok = enlaces.some((u) => u === e.url);
      p(`  ${ok ? 'OK  ' : 'FALTA'} ${e.tipo}: ${e.url}`);
      if (!ok) v.bloqueantes.push(`falta enlace obligatorio ${e.tipo}: ${e.url}`);
    }
  }
  p();

  // ----- 5. COMPONENTES -----
  p(`## 5. Componentes`);
  const boxes = [...raw.matchAll(/AlertBox type="(\w+)" title="([^"]*)"/g)].map((m) => ({ tipo: m[1], titulo: m[2] }));
  const cuerpoBoxes = boxes.filter((b) => !/^Fuentes/.test(b.titulo));
  p(`  AlertBox de cuerpo: ${cuerpoBoxes.length} (${cuerpoBoxes.map((b) => b.tipo).join(', ') || '—'}) + cuadro de fuentes: ${boxes.length - cuerpoBoxes.length}`);
  for (const t of ['info', 'danger', 'warning']) {
    if (!cuerpoBoxes.some((b) => b.tipo === t)) v.bloqueantes.push(`falta AlertBox type="${t}" en el cuerpo`);
  }
  const faqN = (raw.match(/\{\s*question:/g) || []).length;
  p(`  FAQ: ${faqN} preguntas${brief && brief.faq ? ` (brief: ${brief.faq})` : ''}`);
  if (brief && brief.faq && faqN !== brief.faq) v.bloqueantes.push(`FAQ con ${faqN} preguntas, el brief define ${brief.faq}`);
  if (/^#\s/m.test(lines.join('\n'))) v.bloqueantes.push('H1 `#` en el cuerpo (el layout ya lo genera)');
  for (const imp of ['AlertBox', 'FAQ']) {
    if (raw.includes(`<${imp}`) && !new RegExp(`import ${imp} from`).test(raw)) v.bloqueantes.push(`falta el import de ${imp}`);
  }
  p();

  // ----- 6. IMÁGENES -----
  p(`## 6. Imágenes`);
  const refs = new Set();
  if (fm.heroImage) refs.add(fm.heroImage);
  for (const m of raw.matchAll(/\((\/images\/blog\/[^)]+)\)/g)) refs.add(m[1]);
  const dir = path.join(IMGS, slug);
  const existen = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  for (const r of refs) {
    const base = path.basename(r);
    const ok = existen.includes(base);
    const esHero = fm.heroImage === r;
    p(`  ${ok ? 'OK   ' : 'FALTA'} ${base}${esHero ? '  (hero — se olvida al contar, cuéntala)' : ''}`);
    if (!ok) v.bloqueantes.push(`imagen inexistente: ${base}${esHero ? ' (hero)' : ''}`);
  }
  if (/[^\x00-\x7F]/.test([...refs].join(''))) v.avisos.push('nombre de archivo de imagen con carácter no ASCII (tilde/ñ en la URL)');
  const huerfanas = existen.filter((f) => ![...refs].some((r) => path.basename(r) === f));
  if (huerfanas.length) p(`  (en disco sin referenciar: ${huerfanas.join(', ')})`);
  v.manuales.push('abrir cada imagen y verificar: sujeto fijo del brief (raza/edad), restricciones visuales de la Sección 8, y que el alt describa lo que de verdad se ve');
  p();

  // ----- 7. FRONTMATTER -----
  p(`## 7. Frontmatter y fechas`);
  p(`  status: ${fm.status} | datePublished: ${fm.datePublished} | metaDescription: ${(fm.metaDescription || '').length} car.`);
  if ((fm.metaDescription || '').length > 160) v.bloqueantes.push(`metaDescription ${fm.metaDescription.length} car. (máx 160, lo rechaza el schema)`);
  const byline = raw.match(/\*\*Actualizado:\*\*\s*(.+?)\s*$/m);
  if (byline) {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const bm = byline[1].match(/(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/i);
    if (bm) {
      const iso = `${bm[3]}-${String(meses.indexOf(norm(bm[2])) + 1).padStart(2, '0')}-${String(bm[1]).padStart(2, '0')}`;
      p(`  byline: ${byline[1].trim()}  ->  ${iso}`);
      if (fm.datePublished && iso !== fm.datePublished) v.avisos.push(`datePublished ${fm.datePublished} != byline ${iso} (si no es reescritura declarada, desincronizadas)`);
    }
  } else {
    v.bloqueantes.push('falta el byline **Autoría:** / **Actualizado:**');
  }
  p();

  return { v, total, slug };
}

// ---------- ejecución ----------
let targets = slugsArg;
if (TODOS) {
  targets = fs
    .readdirSync(BLOG)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
    .filter((s) => fs.existsSync(path.join(BRIEFS, `briefing-${s}.md`)));
}
if (!targets.length) {
  console.error('Uso: metricas.mjs <slug> [slug2 ...] | --todos   [--strict]');
  process.exit(2);
}

const veredictos = new Map();
for (const slug of targets) {
  const r = auditar(slug);
  veredictos.set(slug, r.v);
  p('---');
  p();
}

p(`# VEREDICTO`);
p();
let totalBloq = 0;
for (const slug of targets) {
  const v = veredictos.get(slug);
  totalBloq += v.bloqueantes.length;
  const estado = v.bloqueantes.length
    ? `NO APTO (${v.bloqueantes.length} bloqueante(s))`
    : v.avisos.length
      ? 'APTO CON AVISOS'
      : 'APTO';
  p(`## ${slug}: ${estado}`);
  for (const m of v.bloqueantes) p(`  BLOQUEA  ${m}`);
  for (const m of v.avisos) p(`  aviso    ${m}`);
  p();
  p(`  PENDIENTES MANUALES (sin esto el veredicto está incompleto):`);
  for (const m of [...new Set(v.manuales)]) p(`    - ${m}`);
  p(`    - leer el artículo entero buscando instrucciones del brief filtradas al texto`);
  p();
}
p(`Resumen: ${targets.length} artículo(s), ${totalBloq} bloqueante(s).`);
p();
p(`APTO significa "no quedan defectos mecánicos", no "el artículo es bueno".`);
p(`Un autor inventado, una cifra que la fuente no dice o una imagen que`);
p(`contradice su pie pasan este script sin despeinarse.`);

console.log(out.join('\n'));

if (STRICT && totalBloq > 0) process.exit(1);
