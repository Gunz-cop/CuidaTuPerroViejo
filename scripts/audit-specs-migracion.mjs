#!/usr/bin/env node
/**
 * Comprueba la coherencia interna de las specs de docs/migracion-stack/.
 *
 * Existe porque dos sesiones ejecutoras seguidas se detuvieron por fallos de
 * spec que un script detecta en un segundo:
 *
 *   - La spec de F1A declaraba `src/middleware.ts` como fichero nuevo. Existía
 *     desde hacía meses, y era justo el fichero donde estaba el problema.
 *   - La spec de F1B decía "tres trabajos" y enumeraba cuatro, con tres
 *     referencias cruzadas apuntando a los números viejos.
 *
 * Ninguno de los dos lo habría detectado una lectura por encima, y los dos
 * costaron una sesión entera. La regla del método es que un criterio es un
 * comando que sale 0 o 1: esto lo convierte en eso.
 *
 * Una spec de una fase ya cerrada se salta las comprobaciones que miran el
 * árbol de ficheros: sus `(nuevo)` ya existen y sus `(borrar)` ya no están.
 * Se marcan con `<!-- fase-cerrada -->`.
 */

import fs from 'node:fs';
import path from 'node:path';

const DIR = 'docs/migracion-stack';
const raiz = process.cwd();
const fallos = [];
const err = (spec, msg) => fallos.push(`${spec}: ${msg}`);

const specs = fs
  .readdirSync(path.join(raiz, DIR))
  .filter((f) => f.endsWith('.md') && f !== 'README.md' && !f.includes('-evidencia'));

for (const nombre of specs) {
  const rel = path.posix.join(DIR, nombre);
  const texto = fs.readFileSync(path.join(raiz, rel), 'utf8').split('\r\n').join('\n');
  const cerrada = texto.includes('<!-- fase-cerrada -->');

  // A. El número de trabajos declarado coincide con los que hay.
  const titulos = [...texto.matchAll(/^### (\d+)\. /gm)].map((m) => Number(m[1]));
  const PALABRAS = { un: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8 };
  const declarado = texto.match(/^(Un|Dos|Tres|Cuatro|Cinco|Seis|Siete|Ocho|\d+) trabajos?/mi);
  if (declarado && titulos.length) {
    const clave = declarado[1].toLowerCase();
    const n = PALABRAS[clave] ?? Number(clave);
    if (n !== titulos.length) {
      err(rel, `declara "${declarado[1]} trabajos" pero enumera ${titulos.length}`);
    }
  }

  // B. Numeración correlativa desde 1, sin saltos ni repetidos.
  titulos.forEach((n, i) => {
    if (n !== i + 1) err(rel, `los trabajos no van correlativos: encontrado ${n} en la posición ${i + 1}`);
  });

  // C. Toda referencia "trabajo N" apunta a un trabajo que existe.
  for (const m of texto.matchAll(/trabajo (\d+)/g)) {
    const n = Number(m[1]);
    if (titulos.length && !titulos.includes(n)) {
      err(rel, `referencia al "trabajo ${n}", que no existe (hay ${titulos.length})`);
    }
  }

  // D. Los enlaces internos a otras specs resuelven.
  for (const m of texto.matchAll(/\]\(([A-Za-z0-9._-]+\.md)\)/g)) {
    if (!fs.existsSync(path.join(raiz, DIR, m[1]))) err(rel, `enlace roto a ${m[1]}`);
  }

  // E. Los ficheros de "Archivos que posee" dicen la verdad sobre el árbol.
  //    Es la comprobación que habría cazado el `middleware.ts (nuevo)`.
  if (!cerrada) {
    const bloque = texto.split('## Archivos que posee')[1]?.split('\n## ')[0] ?? '';
    for (const m of bloque.matchAll(/^- `([^`]+)` \((nuevo|editar|regenerar|borrar)/gm)) {
      const [, fichero, verbo] = m;
      const existe = fs.existsSync(path.join(raiz, fichero));
      if (verbo === 'nuevo' && existe) {
        err(rel, `declara \`${fichero}\` como (nuevo) pero YA EXISTE — la fase no lo va a crear, lo va a editar`);
      }
      if (verbo !== 'nuevo' && !existe) {
        err(rel, `declara \`${fichero}\` como (${verbo}) pero NO EXISTE`);
      }
    }
  }

  // F. Ningún fichero que la fase deba escribir puede estar en PROTEGIDOS.
  //    Es la lección 1 del proyecto anterior: una spec sin salida legal produce
  //    código deshonesto, no un reporte.
  const posee = (texto.split('## Archivos que posee')[1]?.split('\n## ')[0] ?? '')
    .matchAll(/^- `([^`]+)`/gm);
  const protegidos = (texto.split('## PROTEGIDOS')[1]?.split('\n## ')[0] ?? '')
    .matchAll(/^- `([^`]+)`/gm);
  const listaProtegidos = [...protegidos].map((m) => m[1]);
  for (const m of posee) {
    const f = m[1];
    for (const p of listaProtegidos) {
      const patron = p.replace(/\*\*/g, '').replace(/\*/g, '');
      if (f === p || (patron.endsWith('/') && f.startsWith(patron))) {
        err(rel, `\`${f}\` está a la vez en "Archivos que posee" y en PROTEGIDOS: la fase no tiene salida legal`);
      }
    }
  }
}

if (fallos.length) {
  console.error(`\n✘ ${fallos.length} problema(s) de coherencia en las specs:\n`);
  for (const f of fallos) console.error(`  · ${f}`);
  console.error('');
  process.exit(1);
}

console.log(`✓ ${specs.length} specs coherentes`);
