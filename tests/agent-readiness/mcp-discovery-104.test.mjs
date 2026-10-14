import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { checkArtifacts, writeArtifacts } from '../../scripts/agent-readiness/agent-api.mjs';

test('descriptor reservado: manifest, ausencia, bytes alterados y alias no generado fallan', async (t) => {
  const temporary = await mkdtemp(join(tmpdir(), 'ctpv-discovery104-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const build = join(temporary, 'build');
  await cp('tests/agent-readiness/fixtures/f3/build', build, { recursive: true });
  await writeArtifacts(build); await checkArtifacts(build);
  const path = join(build, 'client/.well-known/mcp/server-card.json');
  const bytes = await readFile(path);
  const manifest = JSON.parse(await readFile(join(build, 'agent-api-build-manifest.json')));
  assert.equal(manifest.outputs.filter((entry) => entry.path === '.well-known/mcp/server-card.json').length, 1);
  await writeFile(path, Buffer.concat([bytes, Buffer.from(' ')]));
  await assert.rejects(checkArtifacts(build), /OUTPUT_BYTES_MISMATCH/u);
  await rm(path); await assert.rejects(checkArtifacts(build), /OUTPUT_SET_MISMATCH/u);
  await writeFile(path, bytes);
  const extra = join(build, 'client/.well-known/mcp/server-cards.json');
  await writeFile(extra, bytes); await assert.rejects(checkArtifacts(build), /OUTPUT_SET_MISMATCH/u);
  await rm(extra); await checkArtifacts(build);
  await assert.rejects(writeArtifacts(build), /OUTPUT_COLLISION/u);
  assert.deepEqual(await readFile(path), bytes);
});
