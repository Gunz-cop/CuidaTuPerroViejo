import assert from 'node:assert/strict';
import { test } from 'node:test';
import { countryName } from '../src/lib/admin/country-name';

test('nombres de países en español, solo para presentación', () => {
  for (const [code, expected] of [['ES', 'España'], ['CR', 'Costa Rica'], ['US', 'Estados Unidos'], ['MX', 'México'], ['es', 'España']]) {
    assert.equal(countryName(code), expected);
  }
});

test('país desconocido o inválido conserva el original; vacío es Sin país', () => {
  for (const code of ['XX', 'xx', 'ZZ', 'T1', 'invalido', 'Sin país', ' ']) assert.equal(countryName(code), code);
  assert.equal(countryName(''), 'Sin país');
});

test('el ranking conserva códigos originales, orden y valores', () => {
  const ranking = Object.freeze([
    Object.freeze({ label: 'MX', value: 31 }),
    Object.freeze({ label: 'ES', value: 20 }),
    Object.freeze({ label: 'XX', value: 15 }),
    Object.freeze({ label: 'CR', value: 10 }),
    Object.freeze({ label: '', value: 2 }),
  ]);
  const displayed = ranking.map(row => ({ ...row, label: countryName(row.label) }));
  assert.deepEqual(displayed, [
    { label: 'México', value: 31 }, { label: 'España', value: 20 },
    { label: 'XX', value: 15 }, { label: 'Costa Rica', value: 10 }, { label: 'Sin país', value: 2 },
  ]);
  assert.deepEqual(ranking.map(row => row.label), ['MX', 'ES', 'XX', 'CR', '']);
  assert.deepEqual(displayed.map(row => row.value), ranking.map(row => row.value));
});
