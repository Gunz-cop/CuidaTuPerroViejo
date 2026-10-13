// P4A-01: identidad del build, ejemplos normativos y política F1 en producción. Un intento por petición, sin retries.
// Uso: node verificar-produccion-f4a.mjs <base> <build-manifest.json> <contratos-dir> <robots-local> <out.json>
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const [base, manifestPath, contratos, robotsLocal, out] = process.argv.slice(2);
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');
const urlPath = (path) => (path === 'index.html' ? '/' : path.endsWith('.html') ? `/${path.slice(0, -5)}` : `/${path}`);
async function get(path) {
  try {
    const response = await fetch(base + path, { redirect: 'manual' });
    const body = Buffer.from(await response.arrayBuffer());
    return { status: response.status, contentType: response.headers.get('content-type'), cacheControl: response.headers.get('cache-control'), bytes: body.length, sha256: sha(body), body };
  } catch (error) { return { status: 0, error: String(error?.cause ?? error) }; }
}
const identity = [];
for (const file of manifest.files) {
  const r = await get(urlPath(file.path));
  identity.push({ path: file.path, url: urlPath(file.path), status: r.status, bytes: r.bytes, sha256: r.sha256, expectedSha256: file.sha256, ok: r.status === 200 && r.sha256 === file.sha256, error: r.error });
}
const five = 'hurt=5&hunger=5&hydration=5&hygiene=5&happiness=5&mobility=5&moreGoodDays=5';
const examples = [];
for (const [file, path] of [['ejemplo-calidad-vida-200.json', `/api/agent/v1/tools/calidad-vida?${five}`], ['ejemplo-movilidad-200.json', '/api/agent/v1/tools/movilidad?level=severe&handling=stressed']]) {
  const expected = readFileSync(join(contratos, file));
  const r = await get(path);
  examples.push({ file, path, status: r.status, contentType: r.contentType, cacheControl: r.cacheControl, sha256: r.sha256, expectedSha256: sha(expected), ok: r.status === 200 && r.sha256 === sha(expected) && r.contentType === 'application/json; charset=utf-8' && r.cacheControl === 'private, no-store', error: r.error });
}
const robots = await get('/robots.txt');
const text = robots.body?.toString('utf8') ?? '';
const signals = text.split('\n').filter((line) => /^content-signal:/iu.test(line)).map((line) => line.trim());
const policy = { status: robots.status, sha256: robots.sha256, expectedSha256: sha(readFileSync(robotsLocal)), signals, ok: robots.status === 200 && signals.length > 0 && signals.every((s) => s === 'Content-Signal: search=yes, ai-input=yes, ai-train=no') };
policy.byteIdentical = policy.sha256 === policy.expectedSha256;
const pass = identity.every((e) => e.ok) && examples.every((e) => e.ok) && policy.ok;
writeFileSync(out, `${JSON.stringify({ schemaVersion: 'f4a-produccion/1', base, commit: manifest.commit, recordedAt: new Date().toISOString(), pass, identity: { total: identity.length, ok: identity.filter((e) => e.ok).length, files: identity }, examples, policy }, null, 2)}\n`);
console.log(pass ? 'PASS' : 'FAIL', `identity ${identity.filter((e) => e.ok).length}/${identity.length}`, `examples ${examples.filter((e) => e.ok).length}/2`, `policy ${policy.ok} byteIdentical ${policy.byteIdentical}`);
process.exitCode = pass ? 0 : 1;
