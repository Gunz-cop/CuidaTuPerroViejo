// C4A-16 sobre dos builds: textos de la página (HTML y JSON-LD), proyección F2
// (sólo cambia tool--calidad-vida) y descripciones/versión de OpenAPI.
// Uso: node verificar-c4a16.mjs <dist-candidato> <dist-base 9c96847> <out.json>
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const [candidate, base, out] = process.argv.slice(2);
const read = (root, path) => readFile(join(root, 'client', path));
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');
const checks = [];
const check = (name, ok, detail) => checks.push({ name, ok: Boolean(ok), ...(detail === undefined ? {} : { detail }) });

const PAGE = 'herramientas/calculadora-calidad-vida-perros.html';
const NEW = [
  'Con 35 o menos, la calidad de vida está comprometida y se recomienda consultar al veterinario.',
  'Un puntaje de 35 o menos indica que la calidad de vida está gravemente comprometida y es imperativo hablar con el veterinario sobre opciones para evitar el sufrimiento.',
  'Un puntaje bajo (35 o menos) no significa que debas tomar una decisión apresurada tú solo.',
  '</span> &gt; 50 Buena</span>', '</span> 36–50 Aceptable</span>', '</span> ≤ 35 Comprometida</span>',
];
const OLD = ['Por debajo de 35', 'inferior a 35', '(menor a 35)', '≥ 50 Buena', '35–49 Aceptable', '&lt; 35 Comprometida'];
const html = (await read(candidate, PAGE)).toString('utf8');
const baseHtml = (await read(base, PAGE)).toString('utf8');
for (const text of NEW) check(`HTML contiene «${text}» exactamente una vez`, html.split(text).length === 2);
for (const text of OLD) check(`HTML ya no contiene «${text}» (la base sí)`, !html.includes(text) && baseHtml.includes(text));
const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gu)].map((m) => m[1]).join('\n');
check('JSON-LD FAQPage con la frase nueva', jsonLd.includes(NEW[0]) && !jsonLd.includes('Por debajo de 35'));

const index = JSON.parse(await read(candidate, 'agent-content/v1/index.json'));
const baseIndex = JSON.parse(await read(base, 'agent-content/v1/index.json'));
check('28 documentos en ambos índices, mismos IDs', index.documents.length === 28 && JSON.stringify(index.documents.map((d) => d.documentId)) === JSON.stringify(baseIndex.documents.map((d) => d.documentId)));
const changed = [];
for (const doc of baseIndex.documents) {
  const path = `agent-content/v1/documents/${doc.documentId}.md`;
  const [a, b] = [await read(candidate, path), await read(base, path)];
  const entry = index.documents.find((d) => d.documentId === doc.documentId);
  if (!a.equals(b) || entry.markdownSha256 !== doc.markdownSha256) changed.push(doc.documentId);
  if (doc.documentId !== 'tool--calidad-vida') check(`${doc.documentId}: Markdown y markdownSha256 byte-idénticos a la base`, a.equals(b) && entry.markdownSha256 === doc.markdownSha256 && entry.markdownSha256 === sha(a));
}
check('el único Markdown que cambia es tool--calidad-vida', JSON.stringify(changed) === JSON.stringify(['tool--calidad-vida']), changed);
const toolMd = (await read(candidate, 'agent-content/v1/documents/tool--calidad-vida.md')).toString('utf8');
check('Markdown de la herramienta con FAQ y chips nuevos', toolMd.includes('\\> 50 Buena 36–50 Aceptable ≤ 35 Comprometida') && toolMd.includes(NEW[1]) && toolMd.includes(NEW[2]) && !OLD.some((t) => toolMd.includes(t.replace('&lt;', '\\<'))));
check('corpusSha256 cambia respecto a la base', index.corpusSha256 !== baseIndex.corpusSha256, { base: baseIndex.corpusSha256, candidate: index.corpusSha256 });

const openapi = JSON.parse(await read(candidate, 'agent-api/v1/openapi.json'));
check('OpenAPI info.version 1.2.0', openapi.info.version === '1.2.0');
const quality = openapi.components.schemas.QualityOfLifeResult.properties;
check('descripción de band con «>» y «usar band»', /score > 50/u.test(quality.band.description) && /score > 35/u.test(quality.band.description) && /en lugar de recalcular/u.test(quality.band.description));
check('descripción de thresholds con mínimos exclusivos', /score > umbral/u.test(quality.thresholds.description));
const ops = JSON.stringify(openapi.paths['/api/agent/v1/tools/calidad-vida']);
check('descripción de la operación con «>50» y «>35», sin «>=»', ops.includes('good si >50, acceptable si >35') && !/>=(50|35)/u.test(ops));
check('thresholds conserva los const {50,35}', quality.thresholds.properties.good.const === 50 && quality.thresholds.properties.acceptable.const === 35);

const pass = checks.every((c) => c.ok);
await writeFile(out, `${JSON.stringify({ schemaVersion: 'f4a-seguimiento-c4a16/1', criterion: 'C4A-16', candidate, base, pass, passed: checks.filter((c) => c.ok).length, total: checks.length, checks }, null, 2)}\n`);
process.stdout.write(`${pass ? 'PASS' : 'FAIL'} C4A-16 ${checks.filter((c) => c.ok).length}/${checks.length}\n`);
process.exitCode = pass ? 0 : 2;
