import test from 'node:test';
import assert from 'node:assert/strict';
import type { QualityInput } from '../src/lib/agent-tools/calidad-vida';
import {
  HISTORY_LIMIT, NOTE_MAX_LENGTH, addRecord, buildShareText, changeLabel, compareAnswers, createRecord,
  parseHistory, previousRecord, removeRecord, sumAnswers, updateNote,
} from '../src/lib/quality-history';

const answers = (value: number, overrides: Partial<QualityInput> = {}): QualityInput => ({
  hurt: value, hunger: value, hydration: value, hygiene: value, happiness: value, mobility: value, moreGoodDays: value, ...overrides,
});
const day = (n: number) => new Date(Date.UTC(2026, 10, n, 12));

test('createRecord suma las siete respuestas y recorta la nota', () => {
  const record = createRecord(answers(5, { hurt: 0 }), day(1), 'a', 'x'.repeat(NOTE_MAX_LENGTH + 50));
  assert.equal(record.score, 30);
  assert.equal(record.at, '2026-11-01T12:00:00.000Z');
  assert.equal(record.note.length, NOTE_MAX_LENGTH);
  assert.equal(sumAnswers(answers(10)), 70);
});

test('parseHistory descarta datos corruptos, duplicados y recalcula la suma', () => {
  assert.deepEqual(parseHistory(null), []);
  assert.deepEqual(parseHistory('no es json'), []);
  assert.deepEqual(parseHistory('{"a":1}'), []);
  const good = createRecord(answers(4), day(2), 'ok');
  const raw = JSON.stringify([
    { ...good, score: 999 },
    { ...good },
    { id: 'sin-fecha', at: 'ayer', answers: answers(3) },
    { id: 'fuera-de-rango', at: day(3).toISOString(), answers: answers(11) },
    { id: 'decimal', at: day(3).toISOString(), answers: answers(2, { hurt: 2.5 }) },
    { id: 'incompleto', at: day(3).toISOString(), answers: { hurt: 1 } },
    null,
  ]);
  const parsed = parseHistory(raw);
  assert.equal(parsed.length, 1);
  assert.equal(parsed[0].id, 'ok');
  assert.equal(parsed[0].score, 28);
});

test('addRecord ordena del más reciente al más antiguo y aplica el tope', () => {
  let history = [createRecord(answers(5), day(1), 'viejo')];
  history = addRecord(history, createRecord(answers(6), day(5), 'nuevo'));
  history = addRecord(history, createRecord(answers(7), day(3), 'medio'));
  assert.deepEqual(history.map((r) => r.id), ['nuevo', 'medio', 'viejo']);
  for (let i = 0; i < HISTORY_LIMIT + 5; i += 1) {
    history = addRecord(history, createRecord(answers(1), new Date(Date.UTC(2027, 0, 1, 0, i)), `r${i}`));
  }
  assert.equal(history.length, HISTORY_LIMIT);
  assert.equal(history[0].id, `r${HISTORY_LIMIT + 4}`);
  assert.ok(!history.some((r) => r.id === 'viejo'));
});

test('previousRecord, removeRecord y updateNote', () => {
  const history = [createRecord(answers(6), day(5), 'b'), createRecord(answers(5), day(1), 'a')];
  assert.equal(previousRecord(history, 'b')?.id, 'a');
  assert.equal(previousRecord(history, 'a'), null);
  assert.equal(previousRecord(history, 'no-existe'), null);
  assert.deepEqual(removeRecord(history, 'b').map((r) => r.id), ['a']);
  assert.equal(updateNote(history, 'a', 'Cambió la medicación')[1].note, 'Cambió la medicación');
  assert.equal(history[1].note, '');
});

test('compareAnswers describe el cambio por criterio sin interpretar la suma', () => {
  const changes = compareAnswers(answers(5, { hurt: 3, mobility: 8 }), answers(5));
  assert.equal(changes.length, 7);
  assert.deepEqual(changes[0], { criterion: 'hurt', label: 'Dolor', from: 5, to: 3, delta: -2 });
  assert.equal(changes.find((c) => c.criterion === 'mobility')?.delta, 3);
  assert.equal(changeLabel(changes[0]), 'antes 5');
  assert.equal(changeLabel(changes[1]), 'sin cambio');
});

test('buildShareText incluye fecha, desglose, nota, cambios y avisos', () => {
  const previous = createRecord(answers(5), day(1), 'a');
  const record = createRecord(answers(5, { hurt: 0 }), day(8), 'b', 'Jadea por la noche');
  const text = buildShareText({
    record, previous, message: 'MENSAJE', warnings: ['AVISO DOLOR'], recommendation: 'RECOMENDACION', notices: ['N1', 'N2'],
    url: 'https://example.test/x', timeZone: 'UTC',
  });
  assert.match(text, /Registro HHHHHMM del 8 nov 2026/u);
  assert.match(text, /Suma: 30\/70/u);
  assert.match(text, /• Dolor: 0\/10/u);
  assert.match(text, /Nota: Jadea por la noche/u);
  assert.match(text, /Cambios desde el registro del 1 nov 2026 \(35\/70\):\n {2}• Dolor: 5 → 0/u);
  assert.match(text, /MENSAJE\nAVISO DOLOR\nRECOMENDACION\nN1 N2\n🔗 https:\/\/example\.test\/x$/u);

  const same = buildShareText({ record: previous, previous, message: '', warnings: [], recommendation: '', notices: [], url: 'u', timeZone: 'UTC' });
  assert.match(same, /Mismas respuestas en las siete áreas/u);
  const first = buildShareText({ record, previous: null, message: '', warnings: [], recommendation: '', notices: [], url: 'u', timeZone: 'UTC' });
  assert.doesNotMatch(first, /Cambios desde/u);
});
