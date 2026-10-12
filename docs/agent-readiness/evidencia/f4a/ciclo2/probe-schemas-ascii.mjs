// Registra los cuatro inputSchema del anexo F4A tal cual y comprueba que
// WebMCP.toolsAdded (CDP) y getTools() (página) los devuelven íntegros.
// Uso: node probe-schemas-ascii.mjs <chrome> <webmcp-input-schemas.json>
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';
import http from 'node:http';
const require = createRequire('/opt/node22/lib/node_modules/');
const { chromium } = require('playwright');
const schemas = JSON.parse(readFileSync(process.argv[3], 'utf8'));
const html = `<!doctype html><meta charset="utf-8"><title>p</title><script>
const S = ${JSON.stringify(schemas)};
window.__done = Promise.all(Object.entries(S).map(([name, inputSchema]) => document.modelContext.registerTool({ name, title: 'Título ' + name, description: 'Descripción con acentos de ' + name, inputSchema, annotations: { readOnlyHint: true }, execute: async () => ({}) })));
</script>`;
const srv = http.createServer((q, s) => { s.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); s.end(html); }).listen(0);
const b = await chromium.launch({ executablePath: process.argv[2], args: ['--enable-features=WebMCPTesting'] });
const p = await b.newPage(); const cdp = await p.context().newCDPSession(p);
const added = []; cdp.on('WebMCP.toolsAdded', (e) => added.push(...e.tools));
await cdp.send('WebMCP.enable');
await p.goto(`http://localhost:${srv.address().port}/`); await p.evaluate(() => window.__done); await p.waitForTimeout(500);
const page = await p.evaluate(async () => (await document.modelContext.getTools()).map(t => ({ name: t.name, inputSchema: t.inputSchema })));
const out = Object.keys(schemas).map((name) => ({
  name,
  cdpSchemaEqual: isDeepStrictEqual(added.find(t => t.name === name)?.inputSchema, schemas[name]),
  cdpReadOnly: added.find(t => t.name === name)?.annotations?.readOnly === true,
  cdpDescriptionKept: added.find(t => t.name === name)?.description === 'Descripción con acentos de ' + name,
  pageSchemaEqual: isDeepStrictEqual(page.find(t => t.name === name)?.inputSchema, schemas[name]),
}));
console.log(JSON.stringify(out, null, 1));
await b.close(); srv.close();
