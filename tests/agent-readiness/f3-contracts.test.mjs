import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import { assertByteLimit, buildArtifacts, F3_LIMITS } from '../../scripts/agent-readiness/agent-api.mjs';

const ROOT = process.cwd();
const FIXTURE = 'tests/agent-readiness/fixtures/f3/build';
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const loadJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const formatAjv = (ajv) => {
  ajv.addFormat('date-time', (value) => !Number.isNaN(Date.parse(value)));
  ajv.addFormat('uri', (value) => { try { return Boolean(new URL(value)); } catch { return false; } });
  return ajv;
};

test('OpenAPI, Linkset, skills discovery, artifact digest, and both ARD manifests follow the closed registry', async () => {
  const result = await buildArtifacts(FIXTURE);
  const capabilities = await loadJson(join(ROOT, 'src/agent-api/capabilities.json'));
  const template = await loadJson(join(ROOT, 'src/agent-api/openapi.template.json'));
  const openapi = JSON.parse(result.assets.openapi.toString('utf8'));
  const linkset = JSON.parse(result.assets.linkset.toString('utf8'));
  const skillsIndex = JSON.parse(result.assets.skillsIndex.toString('utf8'));
  const ard = JSON.parse(result.assets.ard.toString('utf8'));
  const skill = await readFile(join(ROOT, 'src/agent-skills/buscar-leer-citar/SKILL.md'));

  assert.equal(openapi.info.description, template.info.description.replace(' Documento normativo de diseño; este archivo no prueba publicación.', ''));
  assert.deepEqual(Object.keys(openapi.paths), capabilities.operations.map((entry) => entry.path));
  assert.deepEqual(Object.values(openapi.paths).flatMap((path) => Object.values(path).map((operation) => operation.operationId)), [
    'listAgentDocuments', 'headAgentCatalog', 'optionsAgentCatalog',
    'searchAgentDocuments', 'headAgentSearch', 'optionsAgentSearch',
    'readAgentDocument', 'headAgentDocument', 'optionsAgentDocument',
    'evaluateQualityOfLife', 'headQualityOfLife', 'optionsQualityOfLife',
    'recommendMobilityAids', 'headMobilityAids', 'optionsMobilityAids',
  ]);
  assert.equal(openapi.info.version, '1.1.0');
  assert.equal(openapi.openapi, '3.1.1');
  assert.ok(!JSON.stringify(openapi).match(/\$ref":"https?:/u));
  assert.deepEqual(linkset.linkset[0].item.map((item) => item.href), [
    'https://cuidatuperroviejo.com/api/agent/v1/catalog',
    'https://cuidatuperroviejo.com/api/agent/v1/search?q=cushing',
    'https://cuidatuperroviejo.com/api/agent/v1/documents/home',
    'https://cuidatuperroviejo.com/api/agent/v1/tools/calidad-vida?hurt=5&hunger=5&hydration=5&hygiene=5&happiness=5&mobility=5&moreGoodDays=5',
    'https://cuidatuperroviejo.com/api/agent/v1/tools/movilidad?level=moderate&handling=calm',
  ]);
  assert.equal(linkset.linkset[1]['service-desc'][0].href, 'https://cuidatuperroviejo.com/agent-api/v1/openapi.json');
  assert.equal(skillsIndex.$schema, 'https://schemas.agentskills.io/discovery/0.2.0/schema.json');
  assert.equal(skillsIndex.skills.length, 1);
  assert.deepEqual(skillsIndex.skills[0], {
    name: 'buscar-leer-citar',
    type: 'skill-md',
    description: capabilities.skills[0].description,
    url: 'https://cuidatuperroviejo.com/.well-known/agent-skills/buscar-leer-citar/SKILL.md',
    digest: `sha256:${hash(skill)}`,
  });
  assert.deepEqual(ard.entries.map(({ identifier }) => identifier), [
    'urn:air:cuidatuperroviejo.com:api:contenido',
    'urn:air:cuidatuperroviejo.com:skill:buscar-leer-citar',
  ]);
  assert.deepEqual(ard.entries[1].representativeQueries, capabilities.skills[0].representativeQueries);
  assert.deepEqual(ard.entries[0].representativeQueries, capabilities.ardApiEntry.representativeQueries);
  assert.deepEqual(Object.keys(result.assets), ['queryIndex', 'openapi', 'linkset', 'skillsIndex', 'skill', 'ard']);
  assert.ok(!Object.keys(result.assets).some((key) => key.toLowerCase().includes('llms')));
});

test('Draft 2020-12 schemas validate query-index, skill discovery, and both ARD envelope variants', async () => {
  const result = await buildArtifacts(FIXTURE);
  const schema = await loadJson(join(ROOT, 'src/agent-api/schema.json'));
  const ajv = formatAjv(new Ajv2020({ allErrors: true, strict: true }));
  const validatorFor = (name) => ajv.compile({ $schema: schema.$schema, $ref: `#/$defs/${name}`, $defs: schema.$defs });
  const query = JSON.parse(result.assets.queryIndex.toString('utf8'));
  const skills = JSON.parse(result.assets.skillsIndex.toString('utf8'));
  const ard = JSON.parse(result.assets.ard.toString('utf8'));
  const validateQuery = validatorFor('QueryIndex');
  const validateSkills = validatorFor('SkillsIndex');
  const validateArd = validatorFor('ArdCompatibilityManifest');
  assert.equal(validateQuery(query), true, ajv.errorsText(validateQuery.errors));
  assert.equal(validateSkills(skills), true, ajv.errorsText(validateSkills.errors));
  assert.equal(validateArd(ard), true, ajv.errorsText(validateArd.errors));
  assert.equal(validateArd(JSON.parse(result.assets.ard.toString('utf8'))), true);

  const invalidQuery = structuredClone(query);
  invalidQuery.unapproved = true;
  assert.equal(validateQuery(invalidQuery), false);
  const invalidSkills = structuredClone(skills);
  invalidSkills.skills[0].digest = `sha256:${'A'.repeat(64)}`;
  assert.equal(validateSkills(invalidSkills), false);
  const invalidArd = structuredClone(ard);
  invalidArd.entries[0].futureTool = true;
  assert.equal(validateArd(invalidArd), false);
});

test('every byte ceiling is inclusive and rejects exactly one byte over', () => {
  for (const [name, limit] of Object.entries(F3_LIMITS).filter(([name]) => name !== 'documentCount')) {
    assert.doesNotThrow(() => assertByteLimit(name.toUpperCase(), limit, limit), `${name}: the inclusive limit passes`);
    assert.throws(() => assertByteLimit(name.toUpperCase(), limit + 1, limit), new RegExp(`${name.toUpperCase()}_LIMIT`, 'u'), `${name}: limit + 1 fails`);
  }
});

test('OpenAPI resolver accepts local pointers but fails on missing and remote references', async (t) => {
  const temporary = await mkdtemp(join(tmpdir(), 'ctpv-f3-openapi-ref-'));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const root = join(temporary, 'product');
  await mkdir(join(root, 'src/agent-api'), { recursive: true });
  await mkdir(join(root, 'src/agent-skills/buscar-leer-citar'), { recursive: true });
  for (const file of ['schema.json', 'capabilities.json', 'openapi.template.json']) await cp(join(ROOT, 'src/agent-api', file), join(root, 'src/agent-api', file));
  await cp(join(ROOT, 'src/agent-skills/buscar-leer-citar/SKILL.md'), join(root, 'src/agent-skills/buscar-leer-citar/SKILL.md'));
  const templatePath = join(root, 'src/agent-api/openapi.template.json');
  const template = JSON.parse(await readFile(templatePath, 'utf8'));
  const responseSchema = template.paths['/api/agent/v1/catalog'].get.responses['200'].content['application/json'].schema;

  responseSchema.$ref = '#/components/schemas/Missing';
  await writeFile(templatePath, `${JSON.stringify(template, null, 2)}\n`);
  await assert.rejects(buildArtifacts(FIXTURE, root), /OPENAPI_REF_UNRESOLVED/u);

  responseSchema.$ref = 'https://example.org/openapi.json#/components/schemas/Catalog';
  await writeFile(templatePath, `${JSON.stringify(template, null, 2)}\n`);
  await assert.rejects(buildArtifacts(FIXTURE, root), /OPENAPI_REF_REMOTE_FORBIDDEN/u);
});
