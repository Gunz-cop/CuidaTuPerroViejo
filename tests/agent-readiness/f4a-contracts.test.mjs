// F4A-1 — contratos y descriptores (C4A-06): OpenAPI 1.2.0, schema, registro
// cerrado, Linkset, ARD, skill y llms anuncian sólo lo implementado.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import { buildArtifacts } from '../../scripts/agent-readiness/agent-api.mjs';
import { F3_LLMS_SECTION } from '../../scripts/agent-readiness/discovery.mjs';

const ROOT = process.cwd();
const FIXTURE = 'tests/agent-readiness/fixtures/f3/build';
const SITE = 'https://cuidatuperroviejo.com';
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const loadJson = async (path) => JSON.parse(await readFile(join(ROOT, path), 'utf8'));
const formatAjv = (ajv) => {
  ajv.addFormat('date-time', (value) => !Number.isNaN(Date.parse(value)));
  ajv.addFormat('uri', (value) => { try { return new URL(value).href === value; } catch { return false; } });
  return ajv;
};

test('OpenAPI 1.2.0: cinco paths, quince operationIds, diez componentes y parámetros de cálculo exactos', async () => {
  const result = await buildArtifacts(FIXTURE);
  const openapi = JSON.parse(result.assets.openapi.toString('utf8'));
  assert.equal(openapi.info.version, '1.2.0');
  assert.equal(openapi.info.title, 'API pública de Cuida tu Perro Viejo');
  assert.equal(openapi.info.description, 'Catálogo, búsqueda léxica y lectura íntegra del corpus editorial publicado de Cuida tu Perro Viejo, y cálculo de sus dos herramientas educativas (escala HHHHHMM y selector de ayudas de movilidad), con los mismos resultados que la interfaz del sitio. Los cálculos son orientativos y no constituyen diagnóstico veterinario.');
  assert.deepEqual(Object.keys(openapi.paths), ['/api/agent/v1/catalog', '/api/agent/v1/search', '/api/agent/v1/documents/{documentId}', '/api/agent/v1/tools/calidad-vida', '/api/agent/v1/tools/movilidad']);
  assert.deepEqual(Object.keys(openapi.components.schemas), ['Document', 'Link', 'Result', 'Catalog', 'Search', 'Read', 'Error', 'ToolInfo', 'QualityOfLifeResult', 'MobilityResult']);
  const quality = openapi.paths['/api/agent/v1/tools/calidad-vida'];
  const mobility = openapi.paths['/api/agent/v1/tools/movilidad'];
  assert.deepEqual([quality.get.operationId, quality.head.operationId, quality.options.operationId], ['evaluateQualityOfLife', 'headQualityOfLife', 'optionsQualityOfLife']);
  assert.deepEqual([mobility.get.operationId, mobility.head.operationId, mobility.options.operationId], ['recommendMobilityAids', 'headMobilityAids', 'optionsMobilityAids']);
  for (const path of [quality, mobility]) {
    for (const op of [path.get, path.head, path.options]) assert.deepEqual(op.security, []);
    assert.deepEqual(Object.keys(path.get.responses), ['200', '400', '404', '405', '503']);
    assert.deepEqual(Object.keys(path.head.responses), ['200', '400', '404', '405', '503']);
    assert.deepEqual(Object.keys(path.options.responses), ['204', '404']);
    assert.equal(path.head.responses['200'].content, undefined);
    assert.deepEqual(path.head.parameters, path.get.parameters);
  }
  assert.deepEqual(quality.get.parameters.map((p) => [p.name, p.required, p.schema]), ['hurt', 'hunger', 'hydration', 'hygiene', 'happiness', 'mobility', 'moreGoodDays'].map((name) => [name, true, { type: 'string', pattern: '^(?:[0-9]|10)$' }]));
  assert.deepEqual(mobility.get.parameters.map((p) => [p.name, p.required, p.schema]), [['level', true, { type: 'string', enum: ['light', 'moderate', 'severe'] }], ['handling', true, { type: 'string', enum: ['calm', 'stressed'] }]]);
  const pattern = new RegExp(quality.get.parameters[0].schema.pattern, 'u');
  for (const ok of ['0', '5', '10']) assert.match(ok, pattern);
  for (const bad of ['05', '11', '-1', '+1', '1.0', '', '010']) assert.doesNotMatch(bad, pattern);
  assert.equal(quality.get.responses['200'].content['application/json'].schema.$ref, '#/components/schemas/QualityOfLifeResult');
  assert.equal(mobility.get.responses['200'].content['application/json'].schema.$ref, '#/components/schemas/MobilityResult');
  assert.doesNotMatch(JSON.stringify(openapi), /aliexpress|mcp|oauth|webmcp/iu);
});

test('los ejemplos normativos 200 validan contra el schema y una propiedad extra no', async () => {
  const schema = await loadJson('src/agent-api/schema.json');
  const ajv = formatAjv(new Ajv2020({ allErrors: true, strict: true }));
  const validatorFor = (name) => ajv.compile({ $schema: schema.$schema, $ref: `#/$defs/${name}`, $defs: schema.$defs });
  for (const [name, file] of [['QualityOfLifeResult', 'ejemplo-calidad-vida-200.json'], ['MobilityResult', 'ejemplo-movilidad-200.json']]) {
    const validate = validatorFor(name);
    const body = await loadJson(`docs/agent-readiness/evidencia/f4a/contratos/${file}`);
    assert.equal(validate(body), true, ajv.errorsText(validate.errors));
    assert.equal(validate({ ...body, extra: true }), false);
    assert.equal(validate({ ...body, tool: { ...body.tool, url: 'x' } }), false);
  }
});

test('API Catalog, ARD, skill y llms anuncian exactamente las operaciones implementadas', async () => {
  const result = await buildArtifacts(FIXTURE);
  const linkset = JSON.parse(result.assets.linkset.toString('utf8'));
  assert.deepEqual(linkset.linkset[0].item.slice(3), [
    { href: `${SITE}/api/agent/v1/tools/calidad-vida?hurt=5&hunger=5&hydration=5&hygiene=5&happiness=5&mobility=5&moreGoodDays=5`, type: 'application/json', title: 'Calculadora HHHHHMM de ejemplo; los siete criterios en 5' },
    { href: `${SITE}/api/agent/v1/tools/movilidad?level=moderate&handling=calm`, type: 'application/json', title: 'Selector de movilidad de ejemplo; nivel moderado y manejo tranquilo' },
  ]);
  assert.equal(linkset.linkset.length, 2);
  const ard = JSON.parse(result.assets.ard.toString('utf8'));
  assert.equal(ard.entries.length, 2);
  assert.equal(ard.entries[0].description, 'API pública de catálogo, búsqueda léxica y lectura íntegra del corpus editorial publicado, y cálculo de sus dos herramientas educativas.');
  assert.deepEqual(ard.entries[0].representativeQueries.slice(3), ['Calcula la escala HHHHHMM de calidad de vida de un perro mayor.', 'Recomienda ayudas de movilidad para un perro mayor con debilidad trasera.']);
  const skill = await readFile(join(ROOT, 'src/agent-skills/buscar-leer-citar/SKILL.md'));
  assert.ok(skill.equals(await readFile(join(ROOT, 'docs/agent-readiness/evidencia/f4a/contratos/buscar-leer-citar.SKILL.md'))), 'skill = anexo normativo F4A');
  assert.ok(skill.length <= 32 * 1024);
  const skills = JSON.parse(result.assets.skillsIndex.toString('utf8'));
  assert.equal(skills.skills[0].digest, `sha256:${hash(skill)}`);
  assert.ok(F3_LLMS_SECTION.includes('- [OpenAPI](https://cuidatuperroviejo.com/agent-api/v1/openapi.json): contrato de catálogo, búsqueda, lectura íntegra y cálculos de las dos herramientas.\n'));
  assert.doesNotMatch(F3_LLMS_SECTION, /webmcp|mcp/iu);
});

test('el registro cerrado rechaza operaciones no implementadas y ejemplos alterados', async (t) => {
  const temporary = await mkdtemp(join(tmpdir(), 'ctpv-f4a-registry-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const root = join(temporary, 'product');
  await mkdir(join(root, 'src/agent-api'), { recursive: true });
  await mkdir(join(root, 'src/agent-skills/buscar-leer-citar'), { recursive: true });
  for (const file of ['schema.json', 'openapi.template.json']) await cp(join(ROOT, 'src/agent-api', file), join(root, 'src/agent-api', file));
  await cp(join(ROOT, 'src/agent-skills/buscar-leer-citar/SKILL.md'), join(root, 'src/agent-skills/buscar-leer-citar/SKILL.md'));
  const original = await loadJson('src/agent-api/capabilities.json');
  const write = (value) => writeFile(join(root, 'src/agent-api/capabilities.json'), `${JSON.stringify(value, null, 2)}\n`);

  const extra = structuredClone(original);
  extra.operations.push({ ...extra.operations[4], operationId: 'futureTool', path: '/api/agent/v1/tools/futura' });
  await write(extra);
  await assert.rejects(buildArtifacts(FIXTURE, root), /CAPABILITIES_OPERATIONS_INVALID/u);

  const altered = structuredClone(original);
  altered.operations[3].examplePath = '/api/agent/v1/tools/calidad-vida?hurt=99';
  await write(altered);
  await assert.rejects(buildArtifacts(FIXTURE, root), /CAPABILITIES_OPERATION_INVALID/u);

  await write(original);
  await assert.doesNotReject(buildArtifacts(FIXTURE, root));
});
