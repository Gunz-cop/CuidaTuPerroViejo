// F4A-1 — paridad de la lógica compartida con la UI legada (C4A-02, C4A-03).
// Oráculo independiente: los scripts de la base eff4ce1 copiados byte a byte en
// fixtures/f4a/legacy (identidad comprobada por id de blob git) para textos,
// criterios y suma, y la regla de franja declarada aquí. La franja es la del
// seguimiento D33 («>50 good; >35 acceptable»), que difiere de la legada
// («>=50; >=35») sólo en las sumas 35 y 50. No se usa la implementación para
// construir las expectativas.
//
// Movilidad 1.1 (2026-10-17): las opciones siguen siendo las legadas, pero la
// tabla de resultados y el aviso de nivel severo se revisaron contra fuentes
// (src/lib/mobility-sources.ts). Su oráculo es ahora la tabla congelada
// fixtures/f4a/movilidad-v1.1.json, revisada a mano; las URLs de afiliado se
// siguen comparando con la base legada.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { BANDS, CRITERIA, MAX_SCORE, QUALITY_KEYS, QUALITY_NOTICES, THRESHOLDS, evaluateQualityOfLife } from '../../src/lib/agent-tools/calidad-vida.ts';
import { HANDLING, LEVELS, PALLIATIVE_ALERT, RESULTS, recommendMobilityAids } from '../../src/lib/agent-tools/movilidad.ts';
import { AFFILIATE_URLS } from '../../src/lib/agent-tools/movilidad-afiliados.ts';
import { ToolInputError } from '../../src/lib/agent-tools/contract.ts';

const SITE = 'https://cuidatuperroviejo.com';
const FIXTURES = new URL('./fixtures/f4a/', import.meta.url);
const LEGACY = {
  quality: { file: 'legacy/calculadora-calidad-vida-perros.astro.txt', blob: '3ea5ef224f84affc83e2ae63aa36632b53ebe421' },
  mobility: { file: 'legacy/selector-movilidad-perros-mayores.astro.txt', blob: '196c066140bfdb25654eccccf9be6775c82a4de6' },
};
const serialize = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`;

function legacySource(kind: keyof typeof LEGACY): string {
  const bytes = readFileSync(new URL(LEGACY[kind].file, FIXTURES));
  const blob = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
  assert.equal(blob, LEGACY[kind].blob, `${kind}: el fixture legado debe ser el blob de la base eff4ce1`);
  return bytes.toString('utf8');
}

// Evalúa sólo las declaraciones de datos del script legado (antes de «Estado»).
function legacyData(source: string, names: string[]): Record<string, any> {
  const body = source.slice(source.indexOf('<script is:inline>'), source.lastIndexOf('</script>'));
  const data = body.slice(body.indexOf("'use strict';") + 13, body.indexOf('/* ── Estado ── */'));
  const context: Record<string, any> = {};
  vm.runInNewContext(`${data};__out={${names.join(',')}}`, context);
  return JSON.parse(JSON.stringify(context.__out));
}

const qualitySource = legacySource('quality');
const mobilitySource = legacySource('mobility');
const legacyQuality = legacyData(qualitySource, ['CRITERIA', 'MAX']);
const legacyMobility = legacyData(mobilitySource, ['OPT1', 'OPT2', 'RES', 'SHOW_AFFILIATE_LINKS']);
const mobilityV11 = JSON.parse(readFileSync(new URL('movilidad-v1.1.json', FIXTURES), 'utf8'));

const stripTags = (html: string) => html.replace(/<[^>]+>/gu, '');
function legacyBandTexts() {
  const block = qualitySource.slice(qualitySource.indexOf('    if (total >= 50) {'), qualitySource.indexOf('    go(D.question, D.result);'));
  const branches = block.split(/\n    \} else (?:if \(total >= 35\) )?\{/u);
  assert.equal(branches.length, 3);
  assert.match(block, /if \(total >= 50\)/u);
  assert.match(block, /else if \(total >= 35\)/u);
  return branches.map((branch) => ({
    interpretation: stripTags(/D\.interp\.innerHTML = '([^']*)'/u.exec(branch)![1]!),
    message: /D\.humanMsg\.textContent = '([^']*)'/u.exec(branch)![1]!,
    recommendation: stripTags(/D\.recBox\.innerHTML = '([^']*)'/u.exec(branch)![1]!),
    guideLabel: /querySelector\('a'\)\.textContent = '([^']*)'/u.exec(branch)?.[1] ?? null,
  }));
}

const KEYS = ['hurt', 'hunger', 'hydration', 'hygiene', 'happiness', 'mobility', 'moreGoodDays'];
const BAND_NAMES = ['good', 'acceptable', 'compromised'] as const;
const legacyBand = (score: number) => (score >= 50 ? 'good' : score >= 35 ? 'acceptable' : 'compromised');
const oracleBand = (score: number) => (score > 50 ? 'good' : score > 35 ? 'acceptable' : 'compromised');

function oracleQuality(values: number[]) {
  const texts = legacyBandTexts();
  const score = values.reduce((a, b) => a + b, 0);
  const band = oracleBand(score);
  const text = texts[BAND_NAMES.indexOf(band)]!;
  return {
    schemaVersion: 'agent-api/1',
    tool: { toolId: 'calidad-vida', documentId: 'tool--calidad-vida', name: 'Calculadora de Calidad de Vida Canina HHHHHMM', canonicalUrl: `${SITE}/herramientas/calculadora-calidad-vida-perros`, softwareVersion: '2.0', lastReviewed: '2026-07-21' },
    input: Object.fromEntries(KEYS.map((key, i) => [key, values[i]])),
    score, maxScore: 70, band, thresholds: { good: 50, acceptable: 35 },
    breakdown: KEYS.map((key, i) => ({ criterion: key, label: legacyQuality.CRITERIA[i].label, value: values[i], max: 10 })),
    interpretation: text.interpretation, message: text.message, recommendation: text.recommendation,
    guide: text.guideLabel === null ? null : { label: text.guideLabel, url: `${SITE}/cuidados-paliativos-perros` },
    notices: ['💛 Esta herramienta es una guía. Tu amor y criterio siempre son lo más importante.', 'Esta herramienta no toma decisiones por ti. Solo te ayuda a ver con más claridad lo que ya estás sintiendo.'],
  };
}

const LEVEL_CODES = { light: 'L', moderate: 'M', severe: 'S' } as const;
const HANDLING_CODES = { calm: 'A', stressed: 'B' } as const;
function oracleMobility(level: keyof typeof LEVEL_CODES, handling: keyof typeof HANDLING_CODES) {
  const key = LEVEL_CODES[level] + HANDLING_CODES[handling];
  const r = mobilityV11.results[key];
  return {
    schemaVersion: 'agent-api/1',
    tool: { toolId: 'movilidad', documentId: 'tool--movilidad', name: 'Selector de Ayudas de Movilidad para Perros Mayores', canonicalUrl: `${SITE}/herramientas/selector-movilidad-perros-mayores`, softwareVersion: '1.1', lastReviewed: '2026-10-17' },
    input: { level, handling }, resultKey: key, icon: r.icon, badge: r.badge, title: r.title, description: r.description,
    plan: r.plan.map((p: { name: string; why: string }) => ({ name: p.name, why: p.why })),
    palliativeAlert: level === 'severe' ? mobilityV11.palliativeAlert : null,
    guide: { label: '📖 Leer la guía completa de movilidad y dolor →', url: `${SITE}/movilidad-dolor-perros-mayores` },
    notices: ['Esta recomendación es una guía de apoyo. Ante dudas, consulta siempre a tu veterinario.'],
  };
}

test('C4A-02: datos compartidos = literales legados de la base', () => {
  assert.deepEqual(CRITERIA.map(({ key: _key, ...rest }) => rest), legacyQuality.CRITERIA);
  assert.deepEqual(CRITERIA.map((c) => c.key), KEYS);
  assert.deepEqual([...QUALITY_KEYS], KEYS);
  assert.equal(MAX_SCORE, legacyQuality.MAX);
  assert.deepEqual(THRESHOLDS, { good: 50, acceptable: 35 });
  assert.deepEqual(BAND_NAMES.map((band) => ({
    interpretation: BANDS[band].interpretation, message: BANDS[band].message,
    recommendation: BANDS[band].recommendation.lead + BANDS[band].recommendation.strong + BANDS[band].recommendation.rest,
    guideLabel: BANDS[band].guideLabel,
  })), legacyBandTexts());
  // El HTML estático de los avisos sigue en la página; se compara con el build en `agent-api.mjs check`.
  assert.equal(QUALITY_NOTICES.length, 2);
  assert.deepEqual(LEVELS.map((o) => ({ ico: o.icon, tx: o.title, sub: o.subtitle, v: o.code, lvl: o.code })), legacyMobility.OPT1);
  assert.deepEqual(HANDLING.map((o) => ({ ico: o.icon, tx: o.title, sub: o.subtitle, v: o.code, lvl: '' })), legacyMobility.OPT2);
  assert.deepEqual(JSON.parse(JSON.stringify(RESULTS)), mobilityV11.results);
  assert.deepEqual(JSON.parse(JSON.stringify(PALLIATIVE_ALERT)), mobilityV11.palliativeAlert);
  // Mismas claves y mismo número de pasos que la base: las URLs de afiliado siguen alineadas por índice.
  for (const [key, r] of Object.entries(RESULTS)) {
    assert.equal(r.plan.length, legacyMobility.RES[key].prods.length, key);
    assert.deepEqual([...(AFFILIATE_URLS as Record<string, readonly string[]>)[key]!], legacyMobility.RES[key].prods.map((p: { url: string }) => p.url), key);
  }
  assert.equal(legacyMobility.SHOW_AFFILIATE_LINKS, false);
  assert.equal(PALLIATIVE_ALERT.items.length, 3);
});

test('C4A-02: la API/WebMCP no reciben URLs de afiliado', () => {
  for (const level of LEVELS) for (const handling of HANDLING) {
    const body = JSON.stringify(recommendMobilityAids({ level: level.value, handling: handling.value }));
    assert.doesNotMatch(body, /aliexpress|s\.click/u);
  }
  assert.doesNotMatch(readFileSync(new URL('../../src/lib/agent-tools/movilidad.ts', import.meta.url), 'utf8'), /aliexpress/u);
});

test('C4A-03/C4A-15: dominio completo 11^7 de calidad de vida (score y franja D33)', () => {
  const values = [0, 0, 0, 0, 0, 0, 0];
  let count = 0;
  const differFromLegacy = new Set<number>();
  const input: Record<string, number> = {};
  for (let n = 0; n < 11 ** 7; n += 1) {
    let rest = n;
    let sum = 0;
    for (let i = 0; i < 7; i += 1) { values[i] = rest % 11; rest = Math.floor(rest / 11); input[KEYS[i]!] = values[i]!; sum += values[i]!; }
    const result = evaluateQualityOfLife(input);
    if (result.score !== sum || result.band !== oracleBand(sum)) assert.fail(`n=${n} score=${result.score} band=${result.band}`);
    if (result.band !== legacyBand(sum)) differFromLegacy.add(sum);
    count += 1;
  }
  assert.equal(count, 19487171);
  assert.deepEqual([...differFromLegacy].sort((a, b) => a - b), [35, 50]);
});

test('C4A-15: vectores de frontera D33', () => {
  const sums = [34, 35, 36, 49, 50, 51, 0, 70];
  const expected = ['compromised', 'compromised', 'acceptable', 'acceptable', 'acceptable', 'good', 'compromised', 'good'];
  const legacy = ['compromised', 'acceptable', 'acceptable', 'acceptable', 'good', 'good', 'compromised', 'good'];
  const vector = (sum: number) => Object.fromEntries(KEYS.map((key, i) => [key, Math.min(10, Math.max(0, sum - 10 * i))]));
  assert.deepEqual(sums.map((sum) => evaluateQualityOfLife(vector(sum)).score), sums);
  assert.deepEqual(sums.map((sum) => evaluateQualityOfLife(vector(sum)).band), expected);
  assert.deepEqual(sums.map(legacyBand), legacy);
});

test('C4A-03: cuerpos completos en umbrales, extremos y ejemplos normativos', () => {
  const vectors: number[][] = [
    [0, 0, 0, 0, 0, 0, 0], [10, 10, 10, 10, 10, 10, 10],
    [4, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5], [6, 5, 5, 5, 5, 5, 5], [10, 10, 10, 10, 9, 0, 0], [10, 10, 10, 10, 10, 0, 0],
    [10, 10, 10, 10, 10, 1, 0], [0, 0, 0, 0, 0, 0, 10], [10, 0, 10, 0, 10, 0, 10],
  ];
  assert.deepEqual(vectors.map((v) => v.reduce((a, b) => a + b, 0)), [0, 70, 34, 35, 36, 49, 50, 51, 10, 40]);
  for (const v of vectors) {
    const input = Object.fromEntries(KEYS.map((key, i) => [key, v[i]]));
    assert.equal(serialize(evaluateQualityOfLife(input)), serialize(oracleQuality(v)), JSON.stringify(v));
  }
  for (const level of Object.keys(LEVEL_CODES) as Array<keyof typeof LEVEL_CODES>) for (const handling of Object.keys(HANDLING_CODES) as Array<keyof typeof HANDLING_CODES>) {
    assert.equal(serialize(recommendMobilityAids({ level, handling })), serialize(oracleMobility(level, handling)), `${level}/${handling}`);
  }
  const annex = (name: string) => readFileSync(new URL(`../../docs/agent-readiness/evidencia/f4a/contratos/${name}`, import.meta.url), 'utf8');
  assert.equal(serialize(evaluateQualityOfLife(Object.fromEntries(KEYS.map((key) => [key, 5])))), annex('ejemplo-calidad-vida-200.json'));
  assert.equal(serialize(recommendMobilityAids({ level: 'severe', handling: 'stressed' })), annex('ejemplo-movilidad-200.json'));
});

test('validación estructurada común a API y WebMCP', () => {
  const valid = Object.fromEntries(KEYS.map((key) => [key, 5]));
  const invalidQuality: unknown[] = [
    null, [], 'x', 5, { ...valid, hurt: 11 }, { ...valid, hurt: -1 }, { ...valid, hurt: 1.5 }, { ...valid, hurt: '5' },
    { ...valid, hurt: Number.NaN }, { ...valid, extra: 1 }, Object.fromEntries(KEYS.slice(1).map((key) => [key, 5])),
    Object.assign(Object.create({ inherited: 1 }), valid), { ...valid, hurt: null }, { ...valid, hurt: true },
  ];
  for (const input of invalidQuality) assert.throws(() => evaluateQualityOfLife(input), ToolInputError, JSON.stringify(input));
  const invalidMobility: unknown[] = [
    {}, { level: 'severe' }, { level: 'Severe', handling: 'calm' }, { level: 'S', handling: 'A' }, { level: 'severe', handling: 'calm', x: 1 },
    { level: ['severe'], handling: 'calm' }, { level: 'severe', handling: null },
  ];
  for (const input of invalidMobility) assert.throws(() => recommendMobilityAids(input), ToolInputError, JSON.stringify(input));
  assert.equal(evaluateQualityOfLife({ ...valid, hurt: 10 }).score, 40);
  assert.equal(evaluateQualityOfLife(Object.assign(Object.create(null), valid)).score, 35);
});
