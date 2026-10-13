import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { deriveMcpCard } from '../../scripts/agent-readiness/agent-api.mjs';
import { DISCOVERY_LINKS, F3_LLMS_SECTION, F3_ASSET_TYPES } from '../../scripts/agent-readiness/discovery.mjs';

const registry = JSON.parse(await readFile(new URL('../../src/agent-api/capabilities.json', import.meta.url), 'utf8'));
test('card local válida exacta, identidad/protocolos/remotes y anuncios sin primitives', async () => {
  const bytes = await deriveMcpCard(registry); const card = JSON.parse(bytes);
  assert.deepEqual(card, {
    $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
    name: 'cuidatuperroviejo.com/guias-herramientas', version: '1.0.0', title: 'Cuida tu Perro Viejo',
    description: 'Servidor MCP público de guías y herramientas educativas para perros mayores.', websiteUrl: 'https://cuidatuperroviejo.com',
    remotes: [{ type: 'streamable-http', url: 'https://cuidatuperroviejo.com/api/mcp', supportedProtocolVersions: ['2026-07-28', '2025-11-25'] }],
  });
  assert.equal(bytes.at(-1), 10); assert.deepEqual(bytes, await deriveMcpCard(registry));
  assert.equal(DISCOVERY_LINKS.length, 6); assert.equal(F3_ASSET_TYPES.get('/api/mcp/server-card'), 'application/mcp-server-card+json');
  assert.equal(F3_LLMS_SECTION.match(/\[MCP remoto\]/gu)?.length, 1);
});
test('registro no puede anunciar identidad/versiones/tool/card diferentes del contrato', async () => {
  for (const mutate of [
    (r) => { r.mcp.name = 'invalid'; },
    (r) => { r.mcp.protocolVersions.push('1900-01-01'); },
    (r) => { r.mcp.tools.push('write_admin'); },
    (r) => { r.mcp.ardEntry.url = 'https://arbitrary.example/'; },
  ]) { const changed = structuredClone(registry); mutate(changed); await assert.rejects(deriveMcpCard(changed), /MCP_REGISTRY_INVALID/u); }
});
