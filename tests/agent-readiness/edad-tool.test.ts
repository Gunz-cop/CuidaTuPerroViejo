import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDogAge, parseDogAgeInput } from '../../src/lib/agent-tools/edad.ts';
import { ToolInputError } from '../../src/lib/agent-tools/contract.ts';
import { SIZE_PROFILES, STAGE_ADVICE, STAGE_LABELS, dogAge, roundToHalf, seniorAge, type DogSize } from '../../src/lib/dog-age.ts';

const SIZES: DogSize[] = ['small', 'medium', 'large', 'giant'];

test('cachorro de 0 años y 1 mes', () => {
  const r = calculateDogAge({ size: 'medium', years: 0, months: 1 });
  assert.equal(r.human_years, dogAge('medium', 0, 1).humanYears);
  assert.deepEqual(r.stage, { id: 'puppy', label: 'Cachorro' });
  assert.equal(r.epigenetic_years, null);
  assert.equal(r.years_to_senior, roundToHalf(seniorAge('medium') - 1 / 12));
  assert.equal(r.recommended_action.url, 'https://cuidatuperroviejo.com/salud-perros-mayores');
  // Igual que la UI: 0 años y 0 meses cuenta como 1 mes.
  assert.deepEqual(calculateDogAge({ size: 'medium', years: 0 }), r);
});

test('Luna: pequeña de 11 años → 68, Senior', () => {
  const r = calculateDogAge({ size: 'small', years: 11, name: 'Luna' });
  assert.equal(r.human_years, 68);
  assert.deepEqual(r.stage, { id: 'senior', label: 'Senior' });
  assert.equal(r.senior_from_years, 10);
  assert.equal(r.life_expectancy_years, 13.5);
  assert.equal(r.years_to_senior, null);
  assert.equal(r.epigenetic_years, 69);
  assert.ok(r.message.startsWith('Luna tiene el equivalente a 68 años humanos. '));
  assert.equal(r.recommended_action.url, 'https://cuidatuperroviejo.com/movilidad-dolor-perros-mayores');
});

test('Dakota: mediana de 12 años', () => {
  const r = calculateDogAge({ size: 'medium', years: 12, name: 'Dakota' });
  assert.equal(r.human_years, 76);
  assert.equal(r.stage.id, 'senior');
  assert.equal(r.senior_from_years, 9.5);
  assert.equal(r.years_to_senior, null);
  assert.equal(r.message, `Dakota tiene el equivalente a 76 años humanos. ${STAGE_ADVICE.senior}`);
});

test('gigante de 10 años → 83, longevo, guía de movilidad', () => {
  const r = calculateDogAge({ size: 'giant', years: 10 });
  assert.equal(r.human_years, 83);
  assert.deepEqual(r.stage, { id: 'longevous', label: 'Senior longevo' });
  assert.equal(r.recommended_action.url, 'https://cuidatuperroviejo.com/movilidad-dolor-perros-mayores');
  assert.ok(r.message.startsWith('Tu perro tiene el equivalente a 83 años humanos.'));
});

test('epigenetic_years sólo entre 1 y 16 años', () => {
  assert.equal(calculateDogAge({ size: 'small', years: 0, months: 11 }).epigenetic_years, null);
  assert.equal(calculateDogAge({ size: 'small', years: 1 }).epigenetic_years, 31);
  assert.equal(calculateDogAge({ size: 'small', years: 16 }).epigenetic_years, dogAge('small', 16).epigeneticYears);
  assert.equal(calculateDogAge({ size: 'small', years: 17 }).epigenetic_years, null);
});

test('paridad con dogAge() en todo el dominio y sin datos de cuenta atrás', () => {
  for (const size of SIZES) for (let years = 0; years <= 25; years += 1) for (let months = 0; months <= 11; months += 1) {
    const r = calculateDogAge({ size, years, months });
    const m = years >= 2 ? 0 : years === 0 && months === 0 ? 1 : months;
    const ref = dogAge(size, years, m);
    assert.deepEqual(r.input, { size, years, months: m, name: null });
    assert.equal(r.human_years, ref.humanYears);
    assert.deepEqual(r.stage, { id: ref.stage, label: STAGE_LABELS[ref.stage] });
    assert.equal(r.senior_from_years, ref.seniorFrom);
    assert.equal(r.life_expectancy_years, SIZE_PROFILES[size].lifeExpectancy);
    assert.equal(r.epigenetic_years, ref.epigeneticYears);
    assert.equal(r.years_to_senior, ref.yearsToSenior > 0 ? roundToHalf(ref.yearsToSenior) : null);
    const text = JSON.stringify(r);
    assert.doesNotMatch(text, /le quedan|vida vivida|yearsToSenior|stagePosition|"-[0-9]/u);
  }
});

test('salida estática: aviso, nota de ajuste propio, URLs y fuentes con DOI', () => {
  const r = calculateDogAge({ size: 'large', years: 5 });
  assert.equal(r.schemaVersion, 'agent-api/1');
  assert.equal(r.tool.url, 'https://cuidatuperroviejo.com/herramientas/calculadora-edad-perro');
  assert.equal(r.tool.method_url, 'https://cuidatuperroviejo.com/herramientas/calculadora-edad-perro#metodo');
  assert.match(r.notices[0]!, /No sustituye una valoración veterinaria/u);
  assert.match(r.human_equivalence_note, /ajuste propio/u);
  assert.deepEqual(r.sources.map((s) => [s.id, s.doi]), [
    ['montoya', '10.3389/fvets.2023.1082102'], ['aaha', '10.5326/JAAHA-MS-6999'], ['wang', '10.1016/j.cels.2020.06.006']]);
  for (const s of r.sources) assert.equal(s.url, `https://doi.org/${s.doi}`);
});

test('nombre: se recorta y vacío equivale a sin nombre', () => {
  assert.equal(parseDogAgeInput({ size: 'small', years: 3, name: '  Jaspe ' }).name, 'Jaspe');
  assert.equal(parseDogAgeInput({ size: 'small', years: 3, name: '   ' }).name, null);
  assert.equal(parseDogAgeInput({ size: 'small', years: 3, name: 'x'.repeat(20) }).name, 'x'.repeat(20));
});

test('entradas inválidas → ToolInputError', () => {
  const bad: unknown[] = [
    null, [], 'texto', {}, { size: 'small' }, { years: 3 },
    { size: 'tiny', years: 3 }, { size: 'Small', years: 3 }, { size: 1, years: 3 },
    { size: 'small', years: -1 }, { size: 'small', years: 26 }, { size: 'small', years: 2.5 }, { size: 'small', years: '3' },
    { size: 'small', years: 1, months: 12 }, { size: 'small', years: 1, months: -1 }, { size: 'small', years: 1, months: 0.5 },
    { size: 'small', years: 1, name: 5 }, { size: 'small', years: 1, name: 'x'.repeat(21) }, { size: 'small', years: 1, name: '\uD800' },
    { size: 'small', years: 1, extra: true }, { size: 'small', years: 1, months: null },
  ];
  for (const value of bad) assert.throws(() => calculateDogAge(value), ToolInputError, JSON.stringify(value));
});
