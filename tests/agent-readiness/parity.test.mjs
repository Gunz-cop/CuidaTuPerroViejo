import test from 'node:test';
import assert from 'node:assert/strict';
import { buildParityManifest } from '../../scripts/agent-readiness/parity.mjs';

test('siete fixtures DOM conservan identidad editorial, avisos, FAQ completas y fuentes', async () => {
  const manifest = await buildParityManifest({ sourceCommit: '4dced4155788af926ef7b4e3d2d7e8259e1978be' });
  assert.equal(manifest.schemaVersion, 'agent-content-parity/1');
  assert.equal(manifest.fixtures.length, 7);
  assert.deepEqual(manifest.fixtures.map(({ path }) => path), [
    '/', '/salud-perros-mayores', '/herramientas',
    '/salud-perros-mayores/sindrome-cushing-perros-mayores',
    '/higiene-hogar-perros-senior/incontinencia-fecal-perros-senior',
    '/herramientas/calculadora-calidad-vida-perros',
    '/herramientas/selector-movilidad-perros-mayores',
  ]);
  for (const fixture of manifest.fixtures) {
    assert.match(fixture.sha256, /^[a-f0-9]{64}$/);
    assert.ok(fixture.h1);
    assert.equal(fixture.orderedHeadings[0].tag, 'h1');
    assert.ok(fixture.excludedNodes.some(({ selector }) => selector.includes('aside')));
  }

  const cushing = manifest.fixtures.find(({ path }) => path.endsWith('/sindrome-cushing-perros-mayores'));
  for (const title of [
    'Señales de Alarma Médica Inmediata',
    'Seguridad de Medicación y Riesgo de Crisis Addisoniana',
  ]) assert.ok(cushing.warningTexts.some((warning) => warning.title === title && warning.body.length > 40));
  assert.ok(cushing.faqPairs.length >= 2);
  assert.ok(cushing.sourceUrls.includes('https://pubmed.ncbi.nlm.nih.gov/24118359/'));

  const incontinence = manifest.fixtures.find(({ path }) => path.endsWith('/incontinencia-fecal-perros-senior'));
  for (const title of ['Señales de alarma', 'Seguridad de manejo y medicación']) {
    assert.ok(incontinence.warningTexts.some((warning) => warning.title === title && warning.body.length > 40));
  }
  assert.ok(incontinence.faqPairs.length >= 2);
  assert.ok(incontinence.sourceUrls.includes('https://onlinelibrary.wiley.com/doi/10.1002/9781119187240.ch16'));

  const selector = manifest.fixtures.find(({ path }) => path.endsWith('/selector-movilidad-perros-mayores'));
  assert.equal(selector.h1, 'Cuidar a un perro que ya no se mueve bien es un acto de amor enorme. Hay ayudas concretas.');
  assert.ok(selector.warningTexts.some(({ title }) => title.includes('Cuidado paliativo importante')));
  const calculator = manifest.fixtures.find(({ path }) => path.endsWith('/calculadora-calidad-vida-perros'));
  assert.ok(calculator.faqPairs.some(({ question, answer }) => question.includes('puntaje') && answer.length > 80));
  assert.ok(calculator.sourceUrls.some((url) => url.includes('?usp=drive_link')));
});
