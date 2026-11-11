import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanResultUrl,
  excerptParts,
  isSearchable,
  normalizeQuery,
  resultSummary,
  singularize,
  stepIndex,
  toIndexQuery,
  toSearchItem,
  MAX_QUERY_LENGTH,
} from '../src/lib/site-search';

test('normalizeQuery colapsa espacios y acota la longitud', () => {
  assert.equal(normalizeQuery('  cama   ortopédica \n'), 'cama ortopédica');
  assert.equal(normalizeQuery('a'.repeat(200)).length, MAX_QUERY_LENGTH);
  assert.equal(isSearchable(normalizeQuery(' c ')), false);
  assert.equal(isSearchable(normalizeQuery('ca')), true);
});

test('singularize quita el plural sin tocar palabras que no lo son', () => {
  const cases: [string, string][] = [
    ['camas', 'cama'],
    ['perros', 'perro'],
    ['dientes', 'diente'],
    ['ortopédicas', 'ortopédica'],
    ['collares', 'collar'],
    ['articulaciones', 'articulacion'],
    ['mayores', 'mayor'],
    ['úlceras', 'úlcera'],
    ['artrosis', 'artrosis'],
    ['leishmaniosis', 'leishmaniosis'],
    ['virus', 'virus'],
    ['tos', 'tos'],
    ['cama', 'cama'],
    ['Cushing', 'Cushing'],
  ];
  for (const [word, expected] of cases) assert.equal(singularize(word), expected, word);
});

test('toIndexQuery descarta palabras vacías, singulariza y respeta las comillas', () => {
  assert.equal(toIndexQuery('camas para perros mayores'), 'cama perro mayor');
  assert.equal(toIndexQuery('mi perro no come'), 'perro no come');
  assert.equal(toIndexQuery('de la'), 'de la');
  assert.equal(toIndexQuery('"camas ortopédicas"'), '"camas ortopédicas"');
  assert.equal(toIndexQuery('artrosis'), 'artrosis');
});

test('cleanResultUrl devuelve la URL canónica sin .html ni barra final', () => {
  assert.equal(cleanResultUrl('/movilidad-dolor-perros-mayores/cama-ortopedica.html'), '/movilidad-dolor-perros-mayores/cama-ortopedica');
  assert.equal(cleanResultUrl('/herramientas.html'), '/herramientas');
  assert.equal(cleanResultUrl('/index.html'), '/');
  assert.equal(cleanResultUrl('/salud-perros-mayores/'), '/salud-perros-mayores');
  assert.equal(cleanResultUrl('/pilar/guia.html#que-cama-elegir'), '/pilar/guia#que-cama-elegir');
  assert.equal(cleanResultUrl('/'), '/');
});

test('excerptParts separa las coincidencias y nunca deja HTML', () => {
  assert.deepEqual(excerptParts('Una <mark>cama</mark> firme &amp; baja'), [
    { text: 'Una ', mark: false },
    { text: 'cama', mark: true },
    { text: ' firme & baja', mark: false },
  ]);
  const hostile = excerptParts('&lt;script&gt;alert(1)&lt;/script&gt; <img src=x onerror=1><mark>ca<b>ma</b></mark>');
  assert.deepEqual(hostile, [
    { text: '<script>alert(1)</script> ', mark: false },
    { text: 'cama', mark: true },
  ]);
  assert.deepEqual(excerptParts(''), []);
});

test('toSearchItem limpia URLs, descarta la sección raíz y limita las secciones', () => {
  const item = toSearchItem({
    url: '/movilidad-dolor-perros-mayores/cama.html',
    excerpt: 'La <mark>cama</mark> ideal',
    meta: { title: ' Cama ortopédica  para perros mayores ', tipo: 'Guía', seccion: 'Movilidad y Dolor', image: '/images/cama.webp' },
    sub_results: [
      { title: 'Cama ortopédica para perros mayores', url: '/movilidad-dolor-perros-mayores/cama.html', excerpt: 'x' },
      { title: 'Qué espuma elegir', url: '/movilidad-dolor-perros-mayores/cama.html#que-espuma-elegir', excerpt: 'La <mark>cama</mark> viscoelástica' },
      { title: 'Altura', url: '/movilidad-dolor-perros-mayores/cama.html#altura', excerpt: 'y' },
      { title: 'Limpieza', url: '/movilidad-dolor-perros-mayores/cama.html#limpieza', excerpt: 'z' },
    ],
  });
  assert.equal(item.url, '/movilidad-dolor-perros-mayores/cama');
  assert.equal(item.title, 'Cama ortopédica para perros mayores');
  assert.equal(item.tipo, 'Guía');
  assert.equal(item.seccion, 'Movilidad y Dolor');
  assert.deepEqual(item.sections.map((s) => s.url), [
    '/movilidad-dolor-perros-mayores/cama#que-espuma-elegir',
    '/movilidad-dolor-perros-mayores/cama#altura',
  ]);
  assert.deepEqual(item.sections[0]?.excerpt[1], { text: 'cama', mark: true });
});

test('toSearchItem tolera resultados sin metadatos', () => {
  const item = toSearchItem({ url: '/herramientas.html', excerpt: '' });
  assert.equal(item.title, '/herramientas');
  assert.equal(item.tipo, 'Guía');
  assert.deepEqual(item.sections, []);
});

test('resultSummary concuerda en número', () => {
  assert.equal(resultSummary(0, 'xyz'), 'Sin resultados para «xyz»');
  assert.equal(resultSummary(1, 'cama'), '1 resultado para «cama»');
  assert.equal(resultSummary(7, 'cama'), '7 resultados para «cama»');
});

test('stepIndex da la vuelta en los extremos', () => {
  assert.equal(stepIndex(-1, 1, 3), 0);
  assert.equal(stepIndex(-1, -1, 3), 2);
  assert.equal(stepIndex(2, 1, 3), 0);
  assert.equal(stepIndex(0, -1, 3), 2);
  assert.equal(stepIndex(0, 1, 0), -1);
});
