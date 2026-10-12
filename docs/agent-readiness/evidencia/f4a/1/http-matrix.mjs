// Matriz HTTP F4A-1 en workerd: status, MIME, hash del cuerpo. Uso: node http-matrix.mjs <base> <out>
import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
const [base, out] = process.argv.slice(2);
const Q = '/api/agent/v1/tools/calidad-vida', M = '/api/agent/v1/tools/movilidad';
const five = 'hurt=5&hunger=5&hydration=5&hygiene=5&happiness=5&mobility=5&moreGoodDays=5';
const cases = [
  ['GET', `${Q}?${five}`, 200], ['HEAD', `${Q}?${five}`, 200], ['OPTIONS', Q, 204], ['POST', `${Q}?${five}`, 405],
  ['GET', `${Q}?${five.replace('hurt=5', 'hurt=11')}`, 400], ['GET', `${Q}?${five.replace('hurt=5', 'hurt=05')}`, 400], ['GET', `${Q}?${five}&hurt=5`, 400], ['GET', `${Q}?${five}&x=1`, 400], ['GET', Q, 400], ['GET', `${Q}?${five.replace('hurt=5', 'hurt=%C3')}`, 400],
  ['GET', `${M}?level=severe&handling=stressed`, 200], ['GET', `${M}?level=light&handling=calm`, 200], ['GET', `${M}?level=Severe&handling=calm`, 400], ['HEAD', `${M}?level=S&handling=A`, 400], ['DELETE', M, 405],
  ['GET', '/api/agent/v1/tools/otra', 404], ['GET', '/api/agent/v1/tools/calidad%2Dvida', 400],
  ['GET', '/api/agent/v1/search?q=cushing', 200], ['GET', '/api/agent/v1/documents/tool--calidad-vida', 200], ['GET', '/api/agent/v1/catalog?kind=tool', 200],
  ['GET', '/agent-api/v1/openapi.json', 200], ['GET', '/.well-known/api-catalog', 200], ['GET', '/.well-known/ard.json', 200], ['GET', '/.well-known/agent-skills/index.json', 200], ['GET', '/llms.txt', 200],
  ['GET', '/herramientas/calculadora-calidad-vida-perros', 200], ['GET', '/herramientas/selector-movilidad-perros-mayores', 200], ['GET', '/', 200],
];
const results = [];
for (const [method, path, expected] of cases) {
  const response = await fetch(base + path, { method, redirect: 'manual' });
  const body = new Uint8Array(await response.arrayBuffer());
  results.push({ method, path, expected, status: response.status, contentType: response.headers.get('content-type'), cacheControl: response.headers.get('cache-control'), bytes: body.length, sha256: createHash('sha256').update(body).digest('hex'), ok: response.status === expected });
}
const search = await (await fetch(`${base}/api/agent/v1/search?q=cushing`)).json();
const read = await (await fetch(`${base}/api/agent/v1/documents/${search.results[0].document.documentId}?corpus=${search.corpusSha256}`)).json();
const readOk = createHash('sha256').update(read.markdown, 'utf8').digest('hex') === read.document.markdownSha256;
const pass = results.every((r) => r.ok) && readOk;
await writeFile(out, `${JSON.stringify({ schemaVersion: 'f4a-http-matrix/1', base, pass, f3SearchReadHashOk: readOk, firstResult: search.results[0].document.documentId, total: search.total, results }, null, 2)}\n`);
console.log(pass ? 'PASS' : 'FAIL', results.filter((r) => !r.ok));
