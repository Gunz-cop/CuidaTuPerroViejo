// C4A-17(c): compara por SHA-256 de contenido los /_astro/*.js pedidos en la home y
// la política editorial entre el build de referencia aad2a66 (anterior a F4A) y el
// candidato, con el mismo navegador sin WebMCP. Lee las salidas de webmcp-browser.mjs
// (campo `scripts`); en el build de referencia sus checks de plantilla no aplican.
// Uso: node comparar-js-base.mjs <referencia.json> <candidato.json> <out.json>
import { readFile, writeFile } from 'node:fs/promises';
import { isDeepStrictEqual } from 'node:util';

const [referencePath, candidatePath, out] = process.argv.slice(2);
const reference = JSON.parse(await readFile(referencePath, 'utf8'));
const candidate = JSON.parse(await readFile(candidatePath, 'utf8'));
const hashes = (run, page) => (run.scripts?.[page]?.requested ?? []).map((r) => r.sha256).sort();
const pages = ['/', '/politica-editorial'].map((page) => ({
  page, reference: hashes(reference, page), candidate: hashes(candidate, page),
  ok: reference.scripts?.[page] !== undefined && isDeepStrictEqual(hashes(reference, page), hashes(candidate, page)),
}));
const sameBrowser = reference.browser === candidate.browser && reference.mode === 'unsupported' && candidate.mode === 'unsupported';
const pass = sameBrowser && pages.every((p) => p.ok);
await writeFile(out, `${JSON.stringify({ schemaVersion: 'f4a-seguimiento-js-base/1', criterion: 'C4A-17(c)', browser: candidate.browser, reference: { file: referencePath, commit: reference.commit, baseUrl: reference.baseUrl }, candidate: { file: candidatePath, commit: candidate.commit, baseUrl: candidate.baseUrl }, sameBrowser, pass, pages }, null, 2)}\n`);
process.stdout.write(`${pass ? 'PASS' : 'FAIL'} C4A-17(c) ${candidate.browser}\n`);
process.exitCode = pass ? 0 : 2;
