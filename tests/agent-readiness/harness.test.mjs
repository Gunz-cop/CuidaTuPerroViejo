import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { main, compareSummaries, PROFILES, sha256, flattenResponse } from '../../scripts/agent-readiness/index.mjs';
import { sourceState } from '../../scripts/agent-readiness/shared.mjs';

const baseline = join(process.cwd(), 'docs/agent-readiness/evidencia');

async function withTemp(t, callback) {
  const root = await mkdtemp(join(tmpdir(), 'ctpv-f0-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return callback(root);
}

function check(category, id, status = 'pass', counted = status !== 'neutral') {
  return { category, id, status, message: `${id} ${status}`, counted };
}

function summary(overrides = {}) {
  const profile = overrides.profile ?? 'content';
  const enabledChecks = Object.hasOwn(overrides, 'enabledChecks') ? overrides.enabledChecks : [...PROFILES[profile]];
  const checks = overrides.checks ?? enabledChecks.map((id, i) =>
    check('discoverability', id, i === 0 ? 'pass' : i === 1 ? 'fail' : 'neutral', i < 2));
  const counted = checks.filter((item) => item.counted);
  const counts = overrides.counts ?? {
    pass: counted.filter((item) => item.status === 'pass').length,
    fail: counted.filter((item) => item.status === 'fail').length,
    neutral: checks.filter((item) => item.status === 'neutral').length,
    scoredTotal: counted.length,
  };
  const value = {
    schemaVersion: 'agent-readiness-run/1',
    scoringRuleId: 'pass-over-counted-round/1',
    mode: 'replay',
    profile,
    requestedUrl: 'https://cuidatuperroviejo.com',
    targetUrl: 'https://cuidatuperroviejo.com',
    enabledChecks,
    sourceCommit: '6a1a317fe4d27154bff2a29ce12e2cdd74987315',
    deploymentCommit: null,
    dirtySource: false,
    recordedAt: '2026-10-04T00:00:00.000Z',
    scannedAt: '2026-10-01T00:00:00.000Z',
    state: 'complete',
    score: Math.round(100 * counts.pass / counts.scoredTotal),
    level: 1,
    levelName: 'Basic Web Presence',
    isCommerce: false,
    counts,
    checks,
    checkUniverseHash: 'a'.repeat(64),
    requestSha256: 'b'.repeat(64),
    responseSha256: 'c'.repeat(64),
    nextLevel: { level: 2, name: 'original from service' },
    errors: [],
    ...overrides,
  };
  value.checkUniverseHash = sha256(Buffer.from(JSON.stringify(value.checks
    .map(({ category, id }) => [category, id])
    .sort((a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0)), 'utf8'));
  return value;
}

test('replay verifica bytes originales y reproduce 43/20/19 con levels y nextLevel', async (t) => {
  await withTemp(t, async (root) => {
    const out = join(root, 'replay');
    assert.equal(await main(['replay', '--baseline-dir', baseline, '--out-dir', out]), 0);
    const expected = new Map([
      ['content', [43, 3, 4, 15, 1]],
      ['all-ui', [20, 3, 12, 7, 1]],
      ['api-unconfigured', [19, 3, 13, 6, 1]],
    ]);
    for (const [profile, [score, pass, fail, neutral, level]] of expected) {
      const dir = join(out, profile);
      const run = JSON.parse(await readFile(join(dir, 'summary.json'), 'utf8'));
      const originalName = profile === 'api-unconfigured' ? 'scan-all.json' : profile === 'all-ui' ? 'scan-ui-default.json' : 'scan-content.json';
      const original = await readFile(join(baseline, originalName));
      assert.deepEqual(await readFile(join(dir, 'response.raw.json')), original);
      assert.equal(run.state, 'complete');
      assert.equal(run.score, score);
      assert.deepEqual(run.counts, { pass, fail, neutral, scoredTotal: pass + fail });
      assert.equal(run.level, level);
      assert.deepEqual(run.nextLevel, JSON.parse(original).nextLevel);
      assert.equal(run.deploymentCommit, null);
      assert.equal(run.responseSha256, sha256(original));
      assert.equal(typeof run.dirtySource, 'boolean');
      const metadata = JSON.parse(await readFile(join(dir, 'response-metadata.json'), 'utf8'));
      assert.deepEqual(metadata, {
        schemaVersion: 'agent-readiness-http/1', requestSource: 'reconstructed',
        httpStatus: null, contentType: null, transportError: null,
      });
    }
    const manifest = JSON.parse(await readFile(join(out, 'manifest.json'), 'utf8'));
    assert.equal(manifest.schemaVersion, 'agent-readiness-evidence/1');
    assert.ok(manifest.files.every((file) => /^[a-f0-9]{64}$/.test(file.sha256) && file.bytes > 0));
    assert.ok(!manifest.files.some((file) => file.path === 'manifest.json'));
  });
});

test('replay rechaza deriva de hashes y nunca cambia los originales', async (t) => {
  await withTemp(t, async (root) => {
    const copy = join(root, 'baseline');
    await mkdir(copy);
    for (const name of ['scan-requests.json', 'scan-content.json', 'scan-ui-default.json', 'scan-all.json']) {
      await writeFile(join(copy, name), await readFile(join(baseline, name)));
    }
    const originalHash = sha256(await readFile(join(copy, 'scan-content.json')));
    await writeFile(join(copy, 'scan-content.json'), '{"changed":true}');
    const changedHash = sha256(await readFile(join(copy, 'scan-content.json')));
    const out = join(root, 'out');
    assert.equal(await main(['replay', '--baseline-dir', copy, '--out-dir', out]), 3);
    assert.notEqual(originalHash, changedHash);
    const error = JSON.parse(await readFile(join(out, 'replay-error.json'), 'utf8'));
    assert.match(error.message, /BASELINE_HASH_MISMATCH/);
    await assert.rejects(readFile(join(out, 'content', 'summary.json')), { code: 'ENOENT' });
    assert.deepEqual(await readFile(join(copy, 'scan-ui-default.json')), await readFile(join(baseline, 'scan-ui-default.json')));
  });
});

test('compare bloquea perfiles y denominadores distintos, y permite fail→pass', () => {
  const a = summary();
  const updatedChecks = a.checks.map((item) => item.id === 'sitemap' ? check('discoverability', 'sitemap', 'pass') : item);
  const b = summary({ checks: updatedChecks, counts: { pass: 2, fail: 0, neutral: 5, scoredTotal: 2 }, score: 100 });
  const compatible = compareSummaries(a, b);
  assert.equal(compatible.comparable, true);
  assert.equal(compatible.scoreDelta, 50);
  assert.deepEqual(compatible.checkChanges, [{ category: 'discoverability', id: 'sitemap', beforeStatus: 'fail', afterStatus: 'pass' }]);

  const reorderedChecks = compareSummaries(a, summary({
    enabledChecks: [...a.enabledChecks].reverse(), checks: a.checks, counts: a.counts, score: a.score,
  }));
  assert.equal(reorderedChecks.comparable, true);
  assert.equal(reorderedChecks.scoreDelta, 0);
  assert.ok(!reorderedChecks.reasons.includes('ENABLED_CHECKS_CHANGED'));

  const profileDrift = compareSummaries(a, summary({ profile: 'all-ui' }));
  assert.equal(profileDrift.comparable, false);
  assert.equal(profileDrift.scoreDelta, null);
  assert.ok(profileDrift.reasons.includes('PROFILE_CHANGED'));
  assert.ok(profileDrift.reasons.includes('ENABLED_CHECKS_CHANGED'));

  const apiVsUi = compareSummaries(
    summary({ profile: 'all-ui' }),
    summary({ profile: 'api-unconfigured', enabledChecks: null, checks: a.checks }),
  );
  assert.equal(apiVsUi.comparable, false);
  assert.equal(apiVsUi.scoreDelta, null);
  assert.ok(apiVsUi.reasons.includes('PROFILE_CHANGED'));
  assert.ok(apiVsUi.reasons.includes('ENABLED_CHECKS_CHANGED'));

  const neutralChecks = a.checks.map((item) => item.id === 'sitemap' ? check('discoverability', 'sitemap', 'neutral', false) : item);
  const neutral = summary({ counts: { pass: 1, fail: 0, neutral: 6, scoredTotal: 1 }, score: 100, checks: neutralChecks });
  const neutralToPass = compareSummaries(neutral, b);
  assert.equal(neutralToPass.comparable, false);
  assert.ok(neutralToPass.reasons.includes('DENOMINATOR_CHANGED'));
});

test('compare detects ID universe and scoring rule changes, and uses Math.round semantics', () => {
  const before = summary();
  const after = summary({
    scoringRuleId: 'future-rule/2',
    checks: [...before.checks, check('discovery', 'newCheck', 'neutral', false)],
  });
  const result = compareSummaries(before, after);
  assert.equal(result.comparable, false);
  assert.equal(result.scoreDelta, null);
  assert.ok(result.reasons.includes('SCORING_CHANGED'));
  assert.ok(result.reasons.includes('CHECK_UNIVERSE_CHANGED'));
  const oneOfEight = flattenResponse({
    targetUrl: 'https://cuidatuperroviejo.com', scannedAt: '2026-10-04T00:00:00.000Z',
    level: 1, levelName: 'Basic Web Presence', isCommerce: false,
    checks: { discoverability: Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`check${i}`, { status: i === 0 ? 'pass' : 'fail' }])) },
  }, Array.from({ length: 8 }, (_, i) => `check${i}`), 'content');
  assert.equal(oneOfEight.score, 13);
});

test('compare exits with contract error for inconsistent summary envelopes', async (t) => {
  await withTemp(t, async (root) => {
    const good = summary();
    const reordered = { ...good, enabledChecks: [...good.enabledChecks].reverse() };
    const before = join(root, 'permuted-before.json');
    const after = join(root, 'permuted-after.json');
    const out = join(root, 'permuted-comparison.json');
    await writeFile(before, JSON.stringify(good));
    await writeFile(after, JSON.stringify(reordered));
    assert.equal(await main(['compare', '--before', before, '--after', after, '--out', out]), 0);
    const orderResult = JSON.parse(await readFile(out, 'utf8'));
    assert.equal(orderResult.comparable, true);
    assert.equal(orderResult.scoreDelta, 0);

    const futureRule = { ...good, scoringRuleId: 'future-rule/2', score: 99 };
    await writeFile(after, JSON.stringify(futureRule));
    const futureOut = join(root, 'future-rule-comparison.json');
    assert.equal(await main(['compare', '--before', before, '--after', after, '--out', futureOut]), 2);
    const futureResult = JSON.parse(await readFile(futureOut, 'utf8'));
    assert.equal(futureResult.comparable, false);
    assert.equal(futureResult.scoreDelta, null);
    assert.ok(futureResult.reasons.includes('SCORING_CHANGED'));

    const cases = [
      ['hash', { ...good, checkUniverseHash: 'f'.repeat(64) }],
      ['counts', { ...good, counts: { ...good.counts, pass: good.counts.pass + 1 } }],
      ['duplicate-id', { ...good, checks: [...good.checks, good.checks[0]] }],
      ['missing-field', Object.fromEntries(Object.entries(good).filter(([key]) => key !== 'deploymentCommit'))],
    ];
    for (const [name, malformed] of cases) {
      const before = join(root, `${name}-before.json`);
      const after = join(root, `${name}-after.json`);
      const out = join(root, `${name}-comparison.json`);
      await writeFile(before, JSON.stringify(malformed));
      await writeFile(after, JSON.stringify(good));
      assert.equal(await main(['compare', '--before', before, '--after', after, '--out', out]), 3, name);
      await assert.rejects(readFile(out), { code: 'ENOENT' });
    }
  });
});

test('sourceState consulta Git real para clean, tracked, staged, untracked e ignored', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'ctpv-git-state-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const git = (args) => execFileSync('git', args, { cwd: root, stdio: 'ignore' });
  git(['init', '--quiet']);
  git(['config', 'user.name', 'F0 test']);
  git(['config', 'user.email', 'f0-test@example.invalid']);
  await writeFile(join(root, '.gitignore'), 'ignored.tmp\n');
  await writeFile(join(root, 'tracked.txt'), 'committed\n');
  git(['add', '.']);
  git(['commit', '--quiet', '-m', 'fixture']);

  assert.deepEqual(await sourceState(root), {
    sourceCommit: execFileSync('git', ['rev-parse', '--verify', 'HEAD^{commit}'], { cwd: root, encoding: 'utf8' }).trim(),
    dirtySource: false,
  });
  await writeFile(join(root, 'tracked.txt'), 'modified\n');
  assert.equal((await sourceState(root)).dirtySource, true);
  git(['checkout', '--', 'tracked.txt']);
  await writeFile(join(root, 'tracked.txt'), 'staged\n');
  git(['add', 'tracked.txt']);
  assert.equal((await sourceState(root)).dirtySource, true);
  git(['reset', '--hard', '--quiet', 'HEAD']);
  await writeFile(join(root, 'untracked.txt'), 'new\n');
  assert.equal((await sourceState(root)).dirtySource, true);
  await rm(join(root, 'untracked.txt'));
  await writeFile(join(root, 'ignored.tmp'), 'ignored\n');
  assert.equal((await sourceState(root)).dirtySource, false);
});

test('sourceState falla explícitamente fuera de un checkout Git', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'ctpv-no-git-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await assert.rejects(sourceState(root), /No se pudo inspeccionar el estado real de Git/);
});

test('scan classifica HTTP, timeout, schema e oversize come incomplete, una llamada y sin retry', async (t) => {
  await withTemp(t, async (root) => {
    const realFetch = globalThis.fetch;
    t.after(() => { globalThis.fetch = realFetch; });
    const scenarios = [
      {
        name: 'http', status: 1,
        fetch: async () => new Response('{"error":"Scan failed"}', { status: 500, headers: { 'content-type': 'application/json' } }),
        code: 'SCAN_HTTP_ERROR', httpStatus: 500, raw: true,
      },
      {
        name: 'timeout', status: 1,
        fetch: async () => { const error = new Error('timeout'); error.name = 'TimeoutError'; throw error; },
        code: 'SCAN_TIMEOUT', httpStatus: null, raw: false,
      },
      {
        name: 'schema', status: 3,
        fetch: async () => new Response(JSON.stringify({
          targetUrl: 'https://cuidatuperroviejo.com', scannedAt: '2026-10-04T00:00:00Z',
          level: 1, levelName: 'Basic', isCommerce: false, checks: { discoverability: { robotsTxt: { status: 'pass' } } },
        }), { status: 200, headers: { 'content-type': 'application/json' } }),
        code: 'SCAN_SCHEMA_ERROR', httpStatus: 200, raw: true,
      },
    ];
    for (const scenario of scenarios) {
      let calls = 0;
      let requestOptions;
      globalThis.fetch = async (_url, options) => { calls += 1; requestOptions = options; return scenario.fetch(); };
      const out = join(root, scenario.name);
      assert.equal(await main(['scan', '--url', 'https://cuidatuperroviejo.com', '--profile', 'content', '--out-dir', out]), scenario.status);
      assert.equal(calls, 1, `${scenario.name} no debe reintentar`);
      assert.equal(requestOptions.method, 'POST');
      assert.equal(requestOptions.redirect, 'manual');
      assert.deepEqual(JSON.parse(requestOptions.body.toString('utf8')), {
        url: 'https://cuidatuperroviejo.com', enabledChecks: [...PROFILES.content],
      });
      const run = JSON.parse(await readFile(join(out, 'summary.json'), 'utf8'));
      const metadata = JSON.parse(await readFile(join(out, 'response-metadata.json'), 'utf8'));
      const requestBytes = await readFile(join(out, 'request.json'));
      assert.equal(run.requestSha256, sha256(requestBytes));
      assert.equal(run.state, 'incomplete');
      assert.equal(run.score, null);
      assert.equal(run.errors[0].code, scenario.code);
      assert.equal(metadata.httpStatus, scenario.httpStatus);
      assert.equal(metadata.transportError?.code ?? null, scenario.name === 'timeout' ? 'SCAN_TIMEOUT' : null);
      if (scenario.raw) {
        const rawBytes = await readFile(join(out, 'response.raw.json'));
        assert.ok(rawBytes.length > 0);
        assert.equal(run.responseSha256, sha256(rawBytes));
      }
      else assert.equal(run.responseSha256, null);
    }

    globalThis.fetch = async () => new Response(new Uint8Array(2 * 1024 * 1024 + 1), { status: 200 });
    const largeOut = join(root, 'large');
    assert.equal(await main(['scan', '--url', 'https://cuidatuperroviejo.com', '--profile', 'content', '--out-dir', largeOut]), 1);
    const large = JSON.parse(await readFile(join(largeOut, 'summary.json'), 'utf8'));
    assert.equal(large.errors[0].code, 'SCAN_RESPONSE_TOO_LARGE');
    assert.equal(large.responseSha256, null);
  });
});

test('scan CLI valida flags y target URL sin hacer requests', async (t) => {
  await withTemp(t, async (root) => {
    const out = join(root, 'never-created');
    assert.equal(await main(['scan', '--url', 'https://cuidatuperroviejo.com/path', '--profile', 'content', '--out-dir', out]), 3);
    assert.equal(await main(['replay', '--baseline-dir', baseline, '--out-dir', out, '--extra', 'x']), 3);
    assert.equal(await main(['inventory', '--build-dir', 'dist', '--out-dir', 'dist']), 3);
  });
});

test('inventory CLI rechaza build/output solapados antes de crear output', async (t) => {
  await withTemp(t, async (root) => {
    const build = join(root, 'dist');
    const out = join(build, 'audit-no-create');
    await mkdir(build);
    assert.equal(await main(['inventory', '--build-dir', build, '--out-dir', out]), 3);
    await assert.rejects(readFile(out), { code: 'ENOENT' });
  });
});
