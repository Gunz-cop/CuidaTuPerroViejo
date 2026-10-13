#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve, relative, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

export const CONTACT_SOURCE_HASH = 'd8b0712f96d2e5556e527e3d024561a8b15e0ab5344bdb2d59a038a98f0ee672';
const P = Buffer.from('<input type="hidden" name="startedAt" value="');
const S = Buffer.from('" data-started-at>');
const digest = (b) => createHash('sha256').update(b).digest('hex');
function splitContact(bytes) {
  const b = Buffer.from(bytes); let at = -1; let count = 0; let from = 0;
  while (true) { const next = b.indexOf(P, from); if (next < 0) break; count++; at = next; from = next + P.length; }
  if (count !== 1) throw new Error('startedAt location is not unique.');
  const start = at + P.length; const end = b.indexOf(S, start);
  if (end < 0) throw new Error('startedAt closing anchor absent.');
  const value = b.subarray(start, end);
  if (value.length !== 13 || !/^[1-9][0-9]{12}$/u.test(value.toString('latin1'))) throw new Error('startedAt format invalid.');
  return { before: b.subarray(0, start), after: b.subarray(end), value: value.toString('ascii'), start, end };
}
export function compareContact(local, remote, sourceHash) {
  const details = { local: { bytes: local.length, sha256: digest(local) }, remote: { bytes: remote.length, sha256: digest(remote) }, sourceHash, mode: 'equivalencia restringida startedAt' };
  try {
    if (sourceHash !== CONTACT_SOURCE_HASH) throw new Error('Contact source changed.');
    const a = splitContact(local); const b = splitContact(remote);
    const beforeEqual = a.before.equals(b.before); const afterEqual = a.after.equals(b.after);
    return { ...details, status: beforeEqual && afterEqual ? 'PASS' : 'FAIL', beforeEqual, afterEqual,
      localPosition: { start: a.start, end: a.end, value: a.value }, remotePosition: { start: b.start, end: b.end, value: b.value } };
  } catch (error) { return { ...details, status: 'FAIL', reason: error.message }; }
}
export function selectIdentity(files) {
  const selected = files.filter((f) => f.path.endsWith('.html') || ['/_astro/', '/agent-content/', '/agent-api/', '/.well-known/'].some((prefix) => f.path.startsWith(prefix)) || ['/robots.txt', '/llms.txt', '/api/mcp/server-card'].includes(f.path))
    .map((f) => ({ ...f, urlPath: f.path === '/index.html' ? '/' : f.path.endsWith('.html') ? f.path.slice(0, -5) : f.path }));
  if (selected.length !== 81 || new Set(selected.map((f) => f.urlPath)).size !== 81 || selected.filter((f) => f.urlPath === '/contacto').length !== 1) throw new Error('Identity inventory differs from 81 unique artifacts.');
  return selected;
}
export function verifyReceipt(receipt, head, base) {
  if (!/^[a-f0-9]{40}$/u.test(head)) throw new Error('Invalid head.');
  const ci = receipt.check_runs.find((c) => c.name === 'Criterios de aceptación' && c.head_sha === head && c.conclusion === 'success');
  const worker = receipt.check_runs.find((c) => c.name === 'Workers Builds: cuidatuperroviejo' && c.head_sha === head && c.conclusion === 'success');
  if (!ci || !worker) throw new Error('CI/Workers receipt is not successful for this SHA.');
  const summary = worker.output.summary;
  const version = /Version ID: ([a-f0-9-]{36})/u.exec(summary)?.[1];
  const preview = /Preview URL: (https:\/\/[^\s]+)/u.exec(summary)?.[1];
  const build = /Build ID: \[([a-f0-9-]{36})\]/u.exec(summary)?.[1];
  if (!version || !preview || !build || new URL(preview).origin !== base || new URL(preview).hostname !== `${version.slice(0, 8)}-cuidatuperroviejo.g1721m.workers.dev`) throw new Error('Receipt identity/preview URL mismatch.');
  return { head, build, version, preview, ciUrl: ci.details_url, workerUrl: worker.details_url };
}
async function manifest(dir) {
  const files = [];
  async function walk(folder) {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const file = join(folder, entry.name);
      if (entry.isSymbolicLink()) throw new Error('Unexpected symlink in build.');
      if (entry.isDirectory()) await walk(file);
      else { const b = await readFile(file); files.push({ path: '/' + relative(dir, file), bytes: b.length, sha256: digest(b) }); }
    }
  }
  await walk(dir); return files.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
}
async function main() {
  const { values } = parseArgs({ options: { 'build-dir': { type: 'string' }, 'base-url': { type: 'string' }, receipt: { type: 'string' }, out: { type: 'string' }, head: { type: 'string' } } });
  for (const key of ['build-dir', 'base-url', 'receipt', 'out', 'head']) if (!values[key]) throw new Error(`Missing ${key}.`);
  const url = new URL(values['base-url']); if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) throw new Error('Preview base must be an HTTPS origin.');
  const head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(); if (head !== values.head) throw new Error('Local checkout differs from requested head.');
  const tree = execFileSync('git', ['rev-parse', 'HEAD^{tree}'], { encoding: 'utf8' }).trim();
  if (execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], { encoding: 'utf8' }).trim()) throw new Error('Tracked source dirty.');
  const receipt = verifyReceipt(JSON.parse(await readFile(values.receipt)), head, url.origin);
  const buildDir = resolve(values['build-dir']); const dir = join(buildDir, 'client'); const out = resolve(values.out);
  if (out === buildDir || out.startsWith(buildDir + '/') || buildDir.startsWith(out + '/')) throw new Error('Build/output overlap.');
  const files = await manifest(dir); const selected = selectIdentity(files);
  const source = await readFile(new URL('../../src/pages/contacto.astro', import.meta.url)); const sourceHash = digest(source);
  if (sourceHash !== CONTACT_SOURCE_HASH) throw new Error('Contact source guard failed.');
  await mkdir(out); await mkdir(join(out, 'bodies'));
  await writeFile(join(out, 'local-manifest.json'), JSON.stringify({ head, tree, receipt, files }, null, 2) + '\n');
  const records = []; let error;
  try {
    for (const f of selected) {
      const local = await readFile(join(dir, f.path.slice(1)));
      const response = await fetch(url.origin + f.urlPath); const bytes = Buffer.from(await response.arrayBuffer());
      const id = digest(Buffer.from(f.urlPath));
      await writeFile(join(out, 'bodies', id + '.local'), local); await writeFile(join(out, 'bodies', id + '.remote'), bytes);
      const contact = f.urlPath === '/contacto' ? compareContact(local, bytes, sourceHash) : undefined;
      const byteExact = local.equals(bytes);
      records.push({ url: url.origin + f.urlPath, localPath: f.path, at: new Date().toISOString(), status: response.status,
        finalUrl: response.url, headers: Object.fromEntries(response.headers), bodyFiles: { local: `bodies/${id}.local`, remote: `bodies/${id}.remote` },
        expected: f, actual: { bytes: bytes.length, sha256: digest(bytes) }, byteExact,
        ...(contact ? { contact } : {}), pass: response.status === 200 && response.url === url.origin + f.urlPath && (contact ? contact.status === 'PASS' : byteExact) });
    }
  } catch (e) { error = String(e); }
  const pass = !error && records.length === 81 && records.every((r) => r.pass);
  const report = { head, tree, receipt, at: new Date().toISOString(), status: pass ? 'PASS' : 'FAIL', deterministicByteExact: records.filter((r) => r.localPath !== '/contacto.html' && r.pass).length,
    contactRestricted: records.find((r) => r.localPath === '/contacto.html')?.contact?.status ?? 'FAIL', label: '80 byteexactos + contacto con equivalencia restringida', ...(error ? { error } : {}), records };
  await writeFile(join(out, 'identity.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`${report.status}: ${report.deterministicByteExact} byteexactos + contacto con equivalencia restringida ${report.contactRestricted}`);
  if (!pass) process.exitCode = 2;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await main();
