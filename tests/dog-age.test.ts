import test from 'node:test';
import assert from 'node:assert/strict';
import { dogAge, seniorAge, HUMAN_MAX, type DogSize } from '../src/lib/dog-age';

test('casos de referencia de la auditoría', () => {
  const cases: [DogSize, number, number, number, string][] = [
    ['small', 1, 0, 15, 'young'],
    ['medium', 8, 0, 55, 'mature'],
    ['medium', 12, 0, 76, 'senior'],
    ['large', 9, 0, 65, 'senior'],
    ['giant', 10, 0, 83, 'longevous'],
    ['medium', 0, 4, 5, 'puppy'],
    ['medium', 1, 6, 20, 'young'],
  ];
  for (const [size, years, months, human, stage] of cases) {
    const r = dogAge(size, years, months);
    assert.equal(r.humanYears, human, `${size} ${years}a ${months}m`);
    assert.equal(r.stage, stage, `${size} ${years}a ${months}m`);
  }
});

test('la equivalencia humana nunca supera HUMAN_MAX ni retrocede', () => {
  for (const size of ['small', 'medium', 'large', 'giant'] as DogSize[]) {
    let previous = -1;
    for (let years = 0; years <= 20; years += 0.5) {
      const { humanYears } = dogAge(size, years);
      assert.ok(humanYears <= HUMAN_MAX, `${size} ${years} = ${humanYears}`);
      assert.ok(humanYears >= previous, `${size} ${years} no decrece`);
      previous = humanYears;
    }
  }
  assert.ok(dogAge('small', 20).humanYears <= 100);
  assert.ok(dogAge('giant', 20).humanYears <= 100);
});

test('la posición en la línea cae dentro de la columna de su etapa', () => {
  const order = ['puppy', 'young', 'mature', 'senior', 'longevous'];
  for (const size of ['small', 'medium', 'large', 'giant'] as DogSize[]) {
    for (let years = 0; years <= 20; years += 0.25) {
      const r = dogAge(size, years);
      const column = Math.floor(r.stagePosition * 5);
      assert.equal(order[column], r.stage, `${size} ${years}`);
    }
  }
});

test('Wang solo dentro de su rango de calibración (1–16 años)', () => {
  assert.equal(dogAge('medium', 0, 6).epigeneticYears, null);
  assert.equal(dogAge('medium', 8).epigeneticYears, 64);
  assert.equal(dogAge('small', 17).epigeneticYears, null);
});

test('etapa senior AAHA (último 25 %) sobre Montoya 2023', () => {
  assert.deepEqual(
    (['small', 'medium', 'large', 'giant'] as DogSize[]).map(seniorAge),
    [10, 9.5, 8.5, 7],
  );
});
