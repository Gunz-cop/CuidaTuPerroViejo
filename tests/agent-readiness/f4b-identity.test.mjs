import test from 'node:test';
import assert from 'node:assert/strict';
import { compareContact, CONTACT_SOURCE_HASH, selectIdentity, verifyReceipt } from '../../scripts/agent-readiness/mcp-evidence.mjs';
const p = '<input type="hidden" name="startedAt" value="'; const s = '" data-started-at>';
const html = (value = '1791909512198') => Buffer.from(`<!doctype html>antes${p}${value}${s}después`);

test('contacto: una única posición,13dígitos, todo exterior byteexacto; sin normalización', () => {
  const a = html(); const b = html('1791909513074'); const r = compareContact(a, b, CONTACT_SOURCE_HASH);
  assert.equal(r.status, 'PASS'); assert.notEqual(r.local.sha256, r.remote.sha256); assert.equal(r.beforeEqual, true); assert.equal(r.afterEqual, true);
  assert.equal(compareContact(a, a, CONTACT_SOURCE_HASH).status, 'PASS');
  const invalid = ['179190951219', '17919095121980', '0791909512198', '+791909512198', '1.79190951219', '1e79190951219', ' 791909512198', '１７９１９０９５１２１９８', '&#49;791909512'];
  for (const value of invalid) assert.equal(compareContact(a, html(value), CONTACT_SOURCE_HASH).status, 'FAIL', value);
  const mutations = [Buffer.from('sin input'), Buffer.concat([a, a]), Buffer.from(a.toString().replace('data-started-at', 'data-other')), Buffer.from(a.toString().replace('antes', 'AnteS')), Buffer.from(a.toString().replace('después', 'despues'))];
  for (const changed of mutations) assert.equal(compareContact(a, changed, CONTACT_SOURCE_HASH).status, 'FAIL');
  assert.equal(compareContact(a, b, '0'.repeat(64)).status, 'FAIL');
  const highBit = html(); highBit[highBit.indexOf(p) + p.length] = 0xb1; assert.equal(compareContact(a, highBit, CONTACT_SOURCE_HASH).status, 'FAIL');
});

test('inventario no omite contacto ni permite cardinalidad/rutas duplicadas; receiptSHA estricto', async () => {
  const files = [{ path: '/contacto.html' }, ...Array.from({ length: 80 }, (_, i) => ({ path: `/_astro/${i}.js` }))];
  assert.equal(selectIdentity(files).length, 81);
  assert.throws(() => selectIdentity(files.slice(1))); assert.throws(() => selectIdentity([...files, files[1]]));
  assert.throws(() => selectIdentity([{ path: '/contacto.html' }, ...Array(80).fill({ path: '/_astro/x.js' })]));
  const head = '1'.repeat(40); const version = '12345678-aaaa-bbbb-cccc-123456789012'; const base = 'https://12345678-cuidatuperroviejo.g1721m.workers.dev';
  const receipt = { check_runs: [{ name: 'Criterios de aceptación', head_sha: head, conclusion: 'success' }, { name: 'Workers Builds: cuidatuperroviejo', head_sha: head, conclusion: 'success', output: { summary: `Build ID: [aaaaaaaa-bbbb-cccc-dddd-123456789012]\nVersion ID: ${version}\nPreview URL: ${base}\n` } }] };
  assert.equal(verifyReceipt(receipt, head, base).version, version); assert.throws(() => verifyReceipt(receipt, '2'.repeat(40), base)); assert.throws(() => verifyReceipt(receipt, head, 'https://example.com'));
});
