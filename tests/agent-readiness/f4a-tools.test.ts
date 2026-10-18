// F4A-1: criterios y suma conservados; interpretación editorial corregida el 2026-10-17.
// Los fixtures de la base documentan el comportamiento histórico, no validan
// clínicamente las antiguas bandas D33. Se prueban ceros independientes del total,
// extremos, mismos totales con distribuciones distintas y contrato de salida actual.
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
import { CRITERIA, MAX_SCORE, QUALITY_KEYS, QUALITY_NOTICES, evaluateQualityOfLife } from '../../src/lib/agent-tools/calidad-vida.ts';
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

// Las clasificaciones legadas se retiraron el 2026-10-17: no son un oráculo clínico.
const KEYS = ['hurt', 'hunger', 'hydration', 'hygiene', 'happiness', 'mobility', 'moreGoodDays'];

const LEVEL_CODES = { light: 'L', moderate: 'M', severe: 'S' } as const;
const HANDLING_CODES = { calm: 'A', stressed: 'B' } as const;
function oracleMobility(level: keyof typeof LEVEL_CODES, handling: keyof typeof HANDLING_CODES) {
  const key = LEVEL_CODES[level] + HANDLING_CODES[handling];
  const r = mobilityV11.results[key];
  return {
    schemaVersion: 'agent-api/1',
    tool: { toolId: 'movilidad', documentId: 'tool--movilidad', name: 'Selector de Ayudas de Movilidad para Perros Mayores', canonicalUrl: `${SITE}/herramientas/selector-movilidad-perros-mayores`, softwareVersion: '1.1', lastReviewed: '2026-10-18' },
    input: { level, handling }, resultKey: key, icon: r.icon, badge: r.badge, title: r.title, description: r.description,
    plan: r.plan.map((p: { name: string; why: string }) => ({ name: p.name, why: p.why })),
    palliativeAlert: level === 'severe' ? mobilityV11.palliativeAlert : null,
    guide: { label: '📖 Leer la guía completa de movilidad y dolor →', url: `${SITE}/movilidad-dolor-perros-mayores` },
    notices: mobilityV11.notices,
  };
}

test('C4A-02: datos compartidos = literales legados de la base', () => {
  assert.deepEqual(CRITERIA.map(({ key: _key, ...rest }) => rest), legacyQuality.CRITERIA);
  assert.deepEqual(CRITERIA.map((c) => c.key), KEYS);
  assert.deepEqual([...QUALITY_KEYS], KEYS);
  assert.equal(MAX_SCORE, legacyQuality.MAX);
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

test('HHHHHMM: todos los totales conservan la suma sin inferir bienestar', () => {
  for (let score = 0; score <= 70; score++) {
    const input = Object.fromEntries(KEYS.map((key, i) => [key, Math.min(10, Math.max(0, score - 10 * i))]));
    const r = evaluateQualityOfLife(input);
    assert.equal(r.score, score);
    assert.equal(r.band, 'not-classified');
    assert.equal(r.thresholds, null);
    assert.doesNotMatch(r.interpretation + r.recommendation, /Sigue así|BUENA|ACEPTABLE|sufrimiento significativo/);
  }
});

test('HHHHHMM: extremos, ceros en cada dominio y resultados contradictorios', () => {
  const all = (v: number) => Object.fromEntries(KEYS.map(key => [key, v]));
  const minimum = evaluateQualityOfLife(all(0));
  assert.equal(minimum.score, 0);
  assert.equal(minimum.warnings.length, 7);
  const maximum = evaluateQualityOfLife(all(10));
  assert.equal(maximum.score, 70);
  assert.equal(maximum.warnings.length, 0);
  assert.match(maximum.message, /no garantiza bienestar/);
  for (const key of KEYS) {
    const r = evaluateQualityOfLife({...all(10), [key]: 0});
    assert.equal(r.score, 60);
    assert.deepEqual(r.warnings.map(w => w.criterion), [key]);
    assert.match(r.message, /no garantiza bienestar/);
  }
  const pain = evaluateQualityOfLife({...all(10), hurt: 0});
  assert.match(pain.warnings[0]!.message, /Contacta con tu veterinario cuanto antes/);
  assert.match(pain.warnings[0]!.message, /atención veterinaria inmediata/);
  const one = evaluateQualityOfLife({...all(10), hurt: 1});
  assert.equal(one.score, 61);
  assert.equal(one.warnings.length, 0); // no avisos específicos no implica normalidad
  assert.match(one.message, /ni compensa una dificultad/);
  const equalTotalA = evaluateQualityOfLife(all(5));
  const equalTotalB = evaluateQualityOfLife({hurt: 0,hunger: 10,hydration: 10,hygiene: 10,happiness: 5,mobility: 0,moreGoodDays: 0});
  assert.equal(equalTotalA.score, equalTotalB.score);
  assert.equal(equalTotalA.warnings.length, 0);
  assert.equal(equalTotalB.warnings.length, 3);
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
    const r = evaluateQualityOfLife(input);
    assert.equal(r.score, v.reduce((a,b) => a+b, 0));
    assert.deepEqual(r.warnings.map(w => w.criterion), KEYS.filter((_,i) => v[i] === 0));
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
