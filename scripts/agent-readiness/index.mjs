#!/usr/bin/env node
import { readFile, stat } from 'node:fs/promises';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { inventory as runInventoryCommand } from './inventory.mjs';
import { exclusiveDir, exclusiveFile, jsonBytes, manifestFor, saveJson, sha256, sourceState } from './shared.mjs';
export { sha256 };

const SCORING_RULE = 'pass-over-counted-round/1';
const RUN_SCHEMA = 'agent-readiness-run/1';
const HTTP_SCHEMA = 'agent-readiness-http/1';
const EVIDENCE_SCHEMA = 'agent-readiness-evidence/1';
const COMPARISON_SCHEMA = 'agent-readiness-comparison/1';
const KNOWN_CATEGORIES = new Set([
  'discoverability', 'contentAccessibility', 'botAccessControl', 'discovery', 'commerce',
]);
export const PROFILES = Object.freeze({
  content: Object.freeze([
    'robotsTxt', 'sitemap', 'linkHeaders', 'dnsAid', 'markdownNegotiation',
    'robotsTxtAiRules', 'contentSignals',
  ]),
  'all-ui': Object.freeze([
    'robotsTxt', 'sitemap', 'linkHeaders', 'dnsAid', 'markdownNegotiation',
    'robotsTxtAiRules', 'contentSignals', 'webBotAuth', 'apiCatalog', 'oauthDiscovery',
    'oauthProtectedResource', 'authMd', 'mcpServerCard', 'agentSkills', 'webMcp', 'ard',
    'x402', 'mpp', 'ucp', 'acp',
  ]),
});
const PROFILE_BASELINES = Object.freeze({
  content: 'scan-content.json',
  'all-ui': 'scan-ui-default.json',
  'api-unconfigured': 'scan-all.json',
});

function stableAscii(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function checkPairs(checks) {
  return checks.map(({ category, id }) => [category, id])
    .sort((a, b) => stableAscii(a[0], b[0]) || stableAscii(a[1], b[1]));
}

const SUMMARY_KEYS = [
  'schemaVersion', 'scoringRuleId', 'mode', 'profile', 'requestedUrl', 'targetUrl',
  'enabledChecks', 'sourceCommit', 'deploymentCommit', 'dirtySource', 'recordedAt',
  'scannedAt', 'state', 'score', 'level', 'levelName', 'isCommerce', 'counts',
  'checks', 'checkUniverseHash', 'requestSha256', 'responseSha256', 'nextLevel', 'errors',
];

function isHash(value) {
  return typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
}

function validateSummary(summary) {
  const invalid = (message) => { throw new CliError(`Envelope inválido: ${message}`, 3); };
  if (!summary || typeof summary !== 'object' || Array.isArray(summary)) invalid('debe ser un objeto.');
  if (JSON.stringify(Object.keys(summary).sort(stableAscii)) !== JSON.stringify([...SUMMARY_KEYS].sort(stableAscii))) {
    invalid('campos ausentes o adicionales.');
  }
  if (summary.schemaVersion !== RUN_SCHEMA || typeof summary.scoringRuleId !== 'string' || !summary.scoringRuleId ||
      !['live', 'replay'].includes(summary.mode) ||
      !['content', 'all-ui', 'api-unconfigured'].includes(summary.profile) ||
      !['complete', 'incomplete'].includes(summary.state)) invalid('version, modo, perfil o estado desconocido.');
  if (typeof summary.requestedUrl !== 'string' ||
      !(summary.targetUrl === null || typeof summary.targetUrl === 'string') ||
      !(summary.scannedAt === null || typeof summary.scannedAt === 'string') ||
      !(summary.levelName === null || typeof summary.levelName === 'string') ||
      !(summary.isCommerce === null || typeof summary.isCommerce === 'boolean') ||
      !(summary.level === null || Number.isInteger(summary.level) && summary.level >= 0 && summary.level <= 5) ||
      !(summary.score === null || Number.isInteger(summary.score) && summary.score >= 0 && summary.score <= 100) ||
      typeof summary.dirtySource !== 'boolean' ||
      !/^[0-9a-f]{40}$/.test(summary.sourceCommit) ||
      !(summary.deploymentCommit === null || /^[0-9a-f]{40}$/.test(summary.deploymentCommit)) ||
      typeof summary.recordedAt !== 'string' || Number.isNaN(Date.parse(summary.recordedAt)) ||
      !isHash(summary.requestSha256) || !(summary.responseSha256 === null || isHash(summary.responseSha256))) {
    invalid('tipo o formato de campo incorrecto.');
  }
  try { validateTargetUrl(summary.requestedUrl); }
  catch { invalid('requestedUrl debe ser origen http/https sin credenciales, query o fragment.'); }
  if (summary.profile === 'api-unconfigured') {
    if (summary.mode !== 'replay' || summary.enabledChecks !== null) invalid('api-unconfigured solo admite replay sin enabledChecks.');
  } else {
    const expectedChecks = PROFILES[summary.profile];
    if (!Array.isArray(summary.enabledChecks) ||
        summary.enabledChecks.length !== expectedChecks.length ||
        new Set(summary.enabledChecks).size !== summary.enabledChecks.length ||
        JSON.stringify([...summary.enabledChecks].sort(stableAscii)) !== JSON.stringify([...expectedChecks].sort(stableAscii))) {
      invalid('enabledChecks no coincide con el perfil congelado.');
    }
  }
  const counts = summary.counts;
  if (!counts || typeof counts !== 'object' || Array.isArray(counts) ||
      JSON.stringify(Object.keys(counts).sort(stableAscii)) !== JSON.stringify(['fail', 'neutral', 'pass', 'scoredTotal']) ||
      !['pass', 'fail', 'neutral', 'scoredTotal'].every((key) => Number.isInteger(counts[key]) && counts[key] >= 0) ||
      counts.scoredTotal !== counts.pass + counts.fail) invalid('counts incoherentes.');
  if (!Array.isArray(summary.checks) || !Array.isArray(summary.errors) ||
      summary.errors.some((error) => !error || typeof error !== 'object' || Array.isArray(error) ||
        JSON.stringify(Object.keys(error).sort(stableAscii)) !== JSON.stringify(['code', 'message']) ||
        typeof error.code !== 'string' || typeof error.message !== 'string')) invalid('checks o errors inválidos.');
  const ids = new Set();
  for (const item of summary.checks) {
    if (!item || typeof item !== 'object' || Array.isArray(item) ||
        JSON.stringify(Object.keys(item).sort(stableAscii)) !== JSON.stringify(['category', 'counted', 'id', 'message', 'status']) ||
        typeof item.category !== 'string' || typeof item.id !== 'string' || (!item.id && summary.state === 'complete') ||
        !(typeof item.message === 'string' || item.message === null) || typeof item.counted !== 'boolean') {
      invalid('check con forma incorrecta.');
    }
    if (ids.has(item.id) && summary.state === 'complete') invalid(`ID repetido ${item.id}.`);
    ids.add(item.id);
    const shouldCount = (item.status === 'pass' || item.status === 'fail') &&
      !(item.category === 'commerce' && summary.isCommerce === false);
    if (item.counted !== shouldCount) invalid(`counted incoherente para ${item.id}.`);
  }
  const tally = { pass: 0, fail: 0, neutral: 0, scoredTotal: 0 };
  for (const item of summary.checks) {
    if (item.status === 'neutral') tally.neutral += 1;
    if (item.counted && item.status === 'pass') tally.pass += 1;
    if (item.counted && item.status === 'fail') tally.fail += 1;
  }
  tally.scoredTotal = tally.pass + tally.fail;
  if (['pass', 'fail', 'neutral', 'scoredTotal'].some((key) => tally[key] !== counts[key])) {
    invalid('counts no corresponden con checks.');
  }
  const expectedUniverseHash = summary.checks.length ? sha256(Buffer.from(JSON.stringify(checkPairs(summary.checks)), 'utf8')) : null;
  if (summary.checkUniverseHash !== expectedUniverseHash) invalid('checkUniverseHash no corresponde con IDs y categorías.');
  if (summary.state === 'complete') {
    const semanticError = summary.errors.length > 0 || summary.targetUrl === null ||
      typeof summary.isCommerce !== 'boolean' || summary.counts.scoredTotal === 0 ||
      summary.responseSha256 === null ||
      (summary.scoringRuleId === SCORING_RULE && summary.score !== Math.round(100 * counts.pass / counts.scoredTotal)) ||
      summary.level === null || summary.levelName === null || summary.scannedAt === null ||
      summary.checks.some(({ category, status, id }) => !id || !KNOWN_CATEGORIES.has(category) ||
        !['pass', 'fail', 'neutral'].includes(status)) ||
      summary.enabledChecks?.some((id) => !summary.checks.some((check) => check.id === id));
    if (semanticError) invalid('un estado complete contiene datos incompletos o incoherentes.');
  } else if (summary.score !== null || summary.errors.length === 0) {
    invalid('un estado incomplete debe tener score null y al menos un error.');
  }
  return summary;
}

export function flattenResponse(payload, enabledChecks, profile) {
  const errors = [];
  const addError = (code, message) => errors.push({ code, message });
  const checks = [];
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { errors: [{ code: 'SCAN_SCHEMA_ERROR', message: 'La respuesta no es un objeto JSON.' }], checks };
  }
  if ('error' in payload || 'siteError' in payload) {
    addError('SCAN_SCHEMA_ERROR', 'La respuesta contiene un error del evaluador.');
  }
  if (!payload.checks || typeof payload.checks !== 'object' || Array.isArray(payload.checks)) {
    addError('SCAN_SCHEMA_ERROR', 'Falta el objeto checks.');
  } else {
    const seen = new Set();
    for (const [category, categoryChecks] of Object.entries(payload.checks)) {
      if (!KNOWN_CATEGORIES.has(category)) addError('SCAN_SCHEMA_ERROR', `Categoría desconocida: ${category}.`);
      if (!categoryChecks || typeof categoryChecks !== 'object' || Array.isArray(categoryChecks)) {
        addError('SCAN_SCHEMA_ERROR', `La categoría ${category} no es un objeto.`);
        continue;
      }
      for (const [id, value] of Object.entries(categoryChecks)) {
        const status = value && typeof value === 'object' ? value.status : undefined;
        const key = `${category}\0${id}`;
        if (!id) addError('SCAN_SCHEMA_ERROR', `ID vacío en ${category}.`);
        if (seen.has(key)) addError('SCAN_SCHEMA_ERROR', `ID duplicado: ${id}.`);
        seen.add(key);
        if (checks.some((check) => check.id === id && check.category !== category)) {
          addError('SCAN_SCHEMA_ERROR', `El ID ${id} aparece en más de una categoría.`);
        }
        const validStatus = status === 'pass' || status === 'fail' || status === 'neutral';
        if (!validStatus) addError('SCAN_SCHEMA_ERROR', `Status desconocido para ${id}: ${String(status)}.`);
        checks.push({
          category,
          id,
          status: status ?? null,
          message: typeof value?.message === 'string' ? value.message : null,
          counted: validStatus && (status === 'pass' || status === 'fail') && !(category === 'commerce' && payload.isCommerce === false),
        });
      }
    }
  }
  if (!Array.isArray(enabledChecks) && profile !== 'api-unconfigured') {
    addError('SCAN_SCHEMA_ERROR', 'El perfil requiere una lista explícita enabledChecks.');
  } else if (Array.isArray(enabledChecks)) {
    const present = new Set(checks.map((check) => check.id));
    for (const id of enabledChecks) {
      if (!present.has(id)) addError('SCAN_SCHEMA_ERROR', `Falta el control habilitado ${id}.`);
    }
  }
  if (typeof payload.isCommerce !== 'boolean') addError('SCAN_SCHEMA_ERROR', 'isCommerce debe ser boolean.');
  if (!Number.isInteger(payload.level) || payload.level < 0 || payload.level > 5) {
    addError('SCAN_SCHEMA_ERROR', 'level debe ser un entero entre 0 y 5.');
  }
  if (typeof payload.levelName !== 'string') addError('SCAN_SCHEMA_ERROR', 'Falta levelName original.');
  if (typeof payload.targetUrl !== 'string') addError('SCAN_SCHEMA_ERROR', 'Falta targetUrl.');

  const counts = { pass: 0, fail: 0, neutral: 0, scoredTotal: 0 };
  for (const check of checks) {
    if (check.status === 'neutral') counts.neutral += 1;
    if (check.counted && check.status === 'pass') counts.pass += 1;
    if (check.counted && check.status === 'fail') counts.fail += 1;
  }
  counts.scoredTotal = counts.pass + counts.fail;
  const valid = errors.length === 0 && counts.scoredTotal > 0;
  if (counts.scoredTotal === 0) addError('SCAN_SCHEMA_ERROR', 'No hay controles puntuables.');
  return {
    errors,
    checks,
    counts,
    state: valid ? 'complete' : 'incomplete',
    score: valid ? Math.round(100 * counts.pass / counts.scoredTotal) : null,
    checkUniverseHash: checks.length ? sha256(Buffer.from(JSON.stringify(checkPairs(checks)), 'utf8')) : null,
  };
}

function emptySummary({ mode, profile, requestedUrl, enabledChecks, sourceCommit, dirtySource, recordedAt }) {
  return {
    schemaVersion: RUN_SCHEMA,
    scoringRuleId: SCORING_RULE,
    mode,
    profile,
    requestedUrl,
    targetUrl: null,
    enabledChecks,
    sourceCommit,
    deploymentCommit: null,
    dirtySource,
    recordedAt,
    scannedAt: null,
    state: 'incomplete',
    score: null,
    level: null,
    levelName: null,
    isCommerce: null,
    counts: { pass: 0, fail: 0, neutral: 0, scoredTotal: 0 },
    checks: [],
    checkUniverseHash: null,
    requestSha256: null,
    responseSha256: null,
    nextLevel: null,
    errors: [],
  };
}

function applyParsed(summary, payload, enabledChecks) {
  const parsed = flattenResponse(payload, enabledChecks, summary.profile);
  summary.targetUrl = typeof payload?.targetUrl === 'string' ? payload.targetUrl : null;
  summary.scannedAt = typeof payload?.scannedAt === 'string' ? payload.scannedAt : null;
  summary.level = Number.isInteger(payload?.level) && payload.level >= 0 && payload.level <= 5 ? payload.level : null;
  summary.levelName = typeof payload?.levelName === 'string' ? payload.levelName : null;
  summary.isCommerce = typeof payload?.isCommerce === 'boolean' ? payload.isCommerce : null;
  summary.nextLevel = payload?.nextLevel ?? null;
  summary.checks = parsed.checks;
  summary.counts = parsed.counts ?? summary.counts;
  summary.state = parsed.state ?? 'incomplete';
  summary.score = parsed.score ?? null;
  summary.checkUniverseHash = parsed.checkUniverseHash ?? null;
  summary.errors = parsed.errors;
  return summary;
}

function parseArgs(argv) {
  const command = argv[0];
  if (!['replay', 'scan', 'compare', 'inventory'].includes(command)) {
    throw new CliError('Uso: node scripts/agent-readiness/index.mjs <replay|scan|compare|inventory> <flags>', 3);
  }
  const values = new Map();
  for (let i = 1; i < argv.length; i += 1) {
    const flag = argv[i];
    if (!flag.startsWith('--') || flag.length === 2) throw new CliError(`Flag inválido: ${flag}`, 3);
    if (values.has(flag)) throw new CliError(`Flag repetido: ${flag}`, 3);
    const value = argv[i + 1];
    if (value === undefined || value.startsWith('--')) throw new CliError(`Falta valor para ${flag}.`, 3);
    values.set(flag, value);
    i += 1;
  }
  const required = {
    replay: ['--baseline-dir', '--out-dir'],
    scan: ['--url', '--profile', '--out-dir'],
    compare: ['--before', '--after', '--out'],
    inventory: ['--build-dir', '--out-dir'],
  }[command];
  const allowed = new Set(required);
  for (const flag of values.keys()) if (!allowed.has(flag)) throw new CliError(`Flag desconocido para ${command}: ${flag}`, 3);
  for (const flag of required) if (!values.has(flag)) throw new CliError(`Falta flag obligatorio ${flag}.`, 3);
  return { command, values };
}

export class CliError extends Error {
  constructor(message, exitCode = 3) {
    super(message);
    this.exitCode = exitCode;
  }
}

function getRequestBody(record) {
  const body = record?.body;
  if (!body || typeof body !== 'object' || Array.isArray(body) || typeof body.url !== 'string') {
    throw new CliError('BASELINE_HASH_MISMATCH: body de request inválido.', 3);
  }
  return body;
}

async function runReplay(values) {
  const baselineDir = resolve(values.get('--baseline-dir'));
  const outDir = resolve(values.get('--out-dir'));
  if (baselineDir === outDir || outDir.startsWith(`${baselineDir}${sep}`) || baselineDir.startsWith(`${outDir}${sep}`)) {
    throw new CliError('Input y output no pueden coincidir ni contenerse.', 3);
  }
  const { sourceCommit, dirtySource } = await sourceState();
  const now = new Date().toISOString();
  await exclusiveDir(outDir);
  let prepared;
  try {
    const requests = JSON.parse(await readFile(join(baselineDir, 'scan-requests.json'), 'utf8'));
    if (!Array.isArray(requests)) throw new CliError('BASELINE_HASH_MISMATCH: scan-requests.json inválido.', 3);
    prepared = [];
    for (const [profile, filename] of Object.entries(PROFILE_BASELINES)) {
      const matching = requests.filter((record) => record?.file === filename);
      if (matching.length !== 1) throw new CliError(`BASELINE_HASH_MISMATCH: se esperaba una solicitud para ${filename}.`, 3);
      const requestRecord = matching[0];
      const body = getRequestBody(requestRecord);
      const responseBytes = await readFile(join(baselineDir, filename));
      if (!isHash(requestRecord.sha256) || sha256(responseBytes) !== requestRecord.sha256) {
        throw new CliError(`BASELINE_HASH_MISMATCH: ${filename} no coincide con scan-requests.json.`, 3);
      }
      if (requestRecord.endpoint !== 'https://isitagentready.com/api/scan' || requestRecord.method !== 'POST') {
        throw new CliError(`BASELINE_HASH_MISMATCH: endpoint/método de ${filename} no coincide.`, 3);
      }
      try { validateTargetUrl(body.url); }
      catch { throw new CliError(`BASELINE_HASH_MISMATCH: target URL inválida en ${filename}.`, 3); }
      const enabledChecks = profile === 'api-unconfigured' ? null : [...PROFILES[profile]];
      if ((profile !== 'api-unconfigured' && JSON.stringify(body.enabledChecks) !== JSON.stringify(enabledChecks)) ||
          (profile === 'api-unconfigured' && Object.hasOwn(body, 'enabledChecks'))) {
        throw new CliError(`BASELINE_HASH_MISMATCH: perfil ${profile} no coincide con su request congelada.`, 3);
      }
      prepared.push({ profile, filename, body, responseBytes, enabledChecks });
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      error = new CliError('BASELINE_HASH_MISMATCH: scan-requests.json no contiene JSON válido.', 3);
    }
    const failure = {
      code: error.code ?? (error.exitCode === 3 ? 'BASELINE_HASH_MISMATCH' : 'BASELINE_IO_ERROR'),
      message: error.message,
    };
    await saveJson(join(outDir, 'replay-error.json'), failure);
    await saveJson(join(outDir, 'manifest.json'), await manifestFor(outDir, sourceCommit, now));
    return error.exitCode ?? 1;
  }
  let exitCode = 0;
  for (const { profile, filename, body, responseBytes, enabledChecks } of prepared) {
      const requestBytes = Buffer.from(JSON.stringify(body), 'utf8');
      const subdir = join(outDir, profile);
      await exclusiveDir(subdir);
      await exclusiveFile(join(subdir, 'request.json'), requestBytes);
      await exclusiveFile(join(subdir, 'response.raw.json'), responseBytes);
      const metadata = {
        schemaVersion: HTTP_SCHEMA,
        requestSource: 'reconstructed',
        httpStatus: null,
        contentType: null,
        transportError: null,
      };
      await saveJson(join(subdir, 'response-metadata.json'), metadata);
      const summary = emptySummary({
        mode: 'replay', profile, requestedUrl: body.url, enabledChecks,
        sourceCommit, dirtySource, recordedAt: now,
      });
      summary.requestSha256 = sha256(requestBytes);
      summary.responseSha256 = sha256(responseBytes);
      try {
        applyParsed(summary, JSON.parse(responseBytes.toString('utf8')), enabledChecks);
      } catch {
        summary.errors = [{ code: 'SCAN_SCHEMA_ERROR', message: 'El original no contiene JSON válido.' }];
      }
      await saveJson(join(subdir, 'summary.json'), summary);
      if (summary.state !== 'complete') exitCode = 3;
  }
  await saveJson(join(outDir, 'manifest.json'), await manifestFor(outDir, sourceCommit, now));
  return exitCode;
}

function validateTargetUrl(raw) {
  let url;
  try { url = new URL(raw); } catch { throw new CliError('--url debe ser URL http/https válida.', 3); }
  if (raw !== raw.trim() || !['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new CliError('--url no puede tener userinfo, query, fragment ni path distinto de /.', 3);
  }
  return raw;
}

async function boundedBody(response, limit) {
  const reader = response.body?.getReader();
  if (!reader) return Buffer.alloc(0);
  const chunks = [];
  let total = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > limit) {
      await reader.cancel();
      throw new CliError(`SCAN_RESPONSE_TOO_LARGE: supera ${limit} bytes.`, 1);
    }
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks, total);
}

async function runScan(values) {
  const target = validateTargetUrl(values.get('--url'));
  const profile = values.get('--profile');
  if (!Object.hasOwn(PROFILES, profile)) throw new CliError('--profile debe ser content o all-ui.', 3);
  const outDir = resolve(values.get('--out-dir'));
  const { sourceCommit, dirtySource } = await sourceState();
  const recordedAt = new Date().toISOString();
  await exclusiveDir(outDir);
  const enabledChecks = [...PROFILES[profile]];
  const payload = { url: target, enabledChecks };
  const requestBytes = Buffer.from(JSON.stringify(payload), 'utf8');
  const summary = emptySummary({
    mode: 'live', profile, requestedUrl: target, enabledChecks,
    sourceCommit, dirtySource, recordedAt,
  });
  summary.requestSha256 = sha256(requestBytes);
  const metadata = {
    schemaVersion: HTTP_SCHEMA,
    requestSource: 'captured',
    httpStatus: null,
    contentType: null,
    transportError: null,
  };
  let exitCode = 0;
  await exclusiveFile(join(outDir, 'request.json'), requestBytes);
  try {
    const response = await fetch('https://isitagentready.com/api/scan', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: requestBytes,
      redirect: 'manual',
      signal: AbortSignal.timeout(60_000),
    });
    metadata.httpStatus = response.status;
    metadata.contentType = response.headers.get('content-type');
    let responseBytes;
    try {
      responseBytes = await boundedBody(response, 2 * 1024 * 1024);
    } catch (error) {
      if (error.exitCode !== 1 || !error.message.startsWith('SCAN_RESPONSE_TOO_LARGE:')) throw error;
      summary.errors = [{ code: 'SCAN_RESPONSE_TOO_LARGE', message: 'El body excede el máximo de 2 MiB.' }];
      exitCode = 1;
    }
    if (responseBytes) {
      await exclusiveFile(join(outDir, 'response.raw.json'), responseBytes);
      summary.responseSha256 = sha256(responseBytes);
      if (response.status < 200 || response.status >= 300) {
        summary.errors = [{ code: 'SCAN_HTTP_ERROR', message: `El evaluador respondió HTTP ${response.status}.` }];
        exitCode = 1;
      } else {
        try {
          applyParsed(summary, JSON.parse(responseBytes.toString('utf8')), enabledChecks);
          if (summary.state !== 'complete') exitCode = 3;
        } catch {
          summary.errors = [{ code: 'SCAN_SCHEMA_ERROR', message: 'El body recibido no contiene JSON válido.' }];
          exitCode = 3;
        }
      }
    }
  } catch (error) {
    const timedOut = error?.name === 'TimeoutError' || error?.name === 'AbortError';
    const code = timedOut ? 'SCAN_TIMEOUT' : 'SCAN_TRANSPORT_ERROR';
    const message = timedOut ? 'La solicitud superó el timeout de 60 segundos.' : 'Falló el transporte HTTP del evaluador.';
    metadata.transportError = { code, message };
    summary.errors = [{ code, message }];
    exitCode = 1;
  }
  await saveJson(join(outDir, 'response-metadata.json'), metadata);
  await saveJson(join(outDir, 'summary.json'), summary);
  await saveJson(join(outDir, 'manifest.json'), await manifestFor(outDir, sourceCommit, recordedAt));
  return exitCode;
}

async function loadSummary(path) {
  const resolved = resolve(path);
  const info = await stat(resolved);
  const file = info.isDirectory() ? join(resolved, 'summary.json') : resolved;
  try { return validateSummary(JSON.parse(await readFile(file, 'utf8'))); }
  catch (error) {
    if (error instanceof CliError) throw error;
    throw new CliError(`Envelope inválido: ${path}.`, 3);
  }
}

export function compareSummaries(before, after) {
  validateSummary(before);
  validateSummary(after);
  const reasons = [];
  const reason = (code, mismatch) => { if (mismatch && !reasons.includes(code)) reasons.push(code); };
  reason('INCOMPLETE_RUN', before.state !== 'complete' || after.state !== 'complete' || before.counts.scoredTotal === 0 || after.counts.scoredTotal === 0);
  reason('TARGET_CHANGED', before.requestedUrl !== after.requestedUrl || before.targetUrl !== after.targetUrl);
  reason('PROFILE_CHANGED', before.profile !== after.profile);
  reason('ENABLED_CHECKS_CHANGED', JSON.stringify([...(before.enabledChecks ?? [])].sort(stableAscii)) !== JSON.stringify([...(after.enabledChecks ?? [])].sort(stableAscii)));
  reason('CHECK_UNIVERSE_CHANGED', before.checkUniverseHash !== after.checkUniverseHash);
  reason('SCORING_CHANGED', before.scoringRuleId !== after.scoringRuleId);
  reason('COMMERCE_CHANGED', before.isCommerce !== after.isCommerce);
  const countedIds = (summary) => summary.checks.filter((check) => check.counted).map((check) => check.id).sort(stableAscii);
  reason('DENOMINATOR_CHANGED', JSON.stringify(countedIds(before)) !== JSON.stringify(countedIds(after)) || before.counts.scoredTotal !== after.counts.scoredTotal);
  const beforeMap = new Map(before.checks.map((check) => [`${check.category}\0${check.id}`, check.status]));
  const afterMap = new Map(after.checks.map((check) => [`${check.category}\0${check.id}`, check.status]));
  const checkChanges = [...new Set([...beforeMap.keys(), ...afterMap.keys()])].sort(stableAscii).flatMap((key) => {
    const left = beforeMap.get(key) ?? null;
    const right = afterMap.get(key) ?? null;
    if (left === right) return [];
    const [category, id] = key.split('\0');
    return [{ category, id, beforeStatus: left, afterStatus: right }];
  });
  const comparable = reasons.length === 0;
  return {
    schemaVersion: COMPARISON_SCHEMA,
    comparable,
    reasons,
    before: { requestSha256: before.requestSha256 ?? null, responseSha256: before.responseSha256 ?? null, sourceCommit: before.sourceCommit ?? null, score: before.score ?? null },
    after: { requestSha256: after.requestSha256 ?? null, responseSha256: after.responseSha256 ?? null, sourceCommit: after.sourceCommit ?? null, score: after.score ?? null },
    scoreDelta: comparable ? after.score - before.score : null,
    checkChanges,
  };
}

async function runCompare(values) {
  const out = resolve(values.get('--out'));
  const before = await loadSummary(values.get('--before'));
  const after = await loadSummary(values.get('--after'));
  const comparison = compareSummaries(before, after);
  await exclusiveFile(out, jsonBytes(comparison));
  return comparison.comparable ? 0 : 2;
}

function within(root, child) {
  const rel = relative(root, child);
  return rel === '' || (!rel.startsWith(`..${sep}`) && rel !== '..' && !isAbsolute(rel));
}

async function runInventory(values) {
  const buildDir = resolve(values.get('--build-dir'));
  const outDir = resolve(values.get('--out-dir'));
  if (within(buildDir, outDir) || within(outDir, buildDir)) {
    throw new CliError('Build y output no pueden coincidir ni contenerse.', 3);
  }
  return runInventoryCommand(buildDir, outDir);
}

export async function main(argv = process.argv.slice(2)) {
  let parsed;
  try { parsed = parseArgs(argv); }
  catch (error) { process.stderr.write(`${error.message}\n`); return error.exitCode ?? 3; }
  try {
    if (parsed.command === 'replay') return await runReplay(parsed.values);
    if (parsed.command === 'scan') return await runScan(parsed.values);
    if (parsed.command === 'compare') return await runCompare(parsed.values);
    return await runInventory(parsed.values);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    return error.exitCode ?? 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  process.exitCode = await main();
}
