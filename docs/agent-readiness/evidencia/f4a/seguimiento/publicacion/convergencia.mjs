// Sondeo de convergencia del deploy: los 22 archivos del manifest deben coincidir en N sondeos seguidos.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
const [base, manifestPath, out, need = '3', gapSec = '60', maxRounds = '30'] = process.argv.slice(2);
const files = JSON.parse(readFileSync(manifestPath, 'utf8')).files;
const urlPath = (p) => (p === 'index.html' ? '/' : p.endsWith('.html') ? `/${p.slice(0, -5)}` : `/${p}`);
const rounds = [];
let streak = 0;
for (let r = 0; r < Number(maxRounds) && streak < Number(need); r += 1) {
  if (r) await new Promise((ok) => setTimeout(ok, Number(gapSec) * 1000));
  let okCount = 0; const bad = [];
  for (const f of files) {
    const res = await fetch(base + urlPath(f.path), { redirect: 'manual' });
    const sha = createHash('sha256').update(Buffer.from(await res.arrayBuffer())).digest('hex');
    if (res.status === 200 && sha === f.sha256) okCount += 1; else bad.push(`${res.status} ${f.path}`);
  }
  streak = okCount === files.length ? streak + 1 : 0;
  rounds.push({ at: new Date().toISOString(), ok: okCount, total: files.length, bad });
  console.log(rounds.at(-1).at, `${okCount}/${files.length}`, `racha=${streak}`);
}
writeFileSync(out, `${JSON.stringify({ schemaVersion: 'f4a-convergencia/1', base, need: Number(need), gapSec: Number(gapSec), converged: streak >= Number(need), rounds }, null, 2)}\n`);
process.exitCode = streak >= Number(need) ? 0 : 2;
