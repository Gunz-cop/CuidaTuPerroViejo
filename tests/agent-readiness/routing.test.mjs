import test from 'node:test';
import assert from 'node:assert/strict';
import { assertWorkerRouting, expectedWorkerRoutes } from '../../scripts/agent-readiness/projection.mjs';

function indexWith(paths) {
  return { documents: paths.map((canonicalPath) => ({ canonicalPath })) };
}

test('worker-first routing is exact, ordered, and reserves API/admin first', () => {
  const index = indexWith(['/z-last', '/', '/a-first']);
  const expected = ['/api/*', '/admin/*', '/', '/a-first', '/z-last'];
  assert.deepEqual(expectedWorkerRoutes(index), expected);
  const config = { assets: { binding: 'ASSETS', run_worker_first: [...expected] }, main: 'entry.mjs' };
  assert.deepEqual(assertWorkerRouting(config, index), expected);
  assert.equal(config.assets.binding, 'ASSETS');
});

test('routing cap accepts 98 documents and rejects 99', () => {
  const paths = Array.from({ length: 98 }, (_, i) => `/doc-${String(i).padStart(2, '0')}`);
  assert.equal(expectedWorkerRoutes(indexWith(paths)).length, 100);
  assert.throws(() => expectedWorkerRoutes(indexWith([...paths, '/doc-98'])), /ROUTING_DOCUMENT_COUNT/u);
});

test('invalid route, duplicate, removed route, true, and broad glob fail closed', () => {
  const index = indexWith(['/one', '/two']);
  const routes = expectedWorkerRoutes(index);
  assert.throws(() => expectedWorkerRoutes(indexWith(['/one', '/one'])), /DUPLICATE/u);
  assert.throws(() => expectedWorkerRoutes(indexWith(['/bad?query'])), /INVALID/u);
  for (const run_worker_first of [routes.slice(0, -1), true, ['/api/*', '/admin/*', '*']]) {
    assert.throws(() => assertWorkerRouting({ assets: { run_worker_first } }, index), /ROUTING_RULES_MISMATCH/u);
  }
});

test('100-character canonical route is accepted while 101 characters is rejected', () => {
  const path100 = `/${'a'.repeat(99)}`;
  assert.equal(path100.length, 100);
  assert.equal(expectedWorkerRoutes(indexWith([path100])).at(-1), path100);
  assert.throws(() => expectedWorkerRoutes(indexWith([`${path100}a`])), /INVALID/u);
});
