import { createRequire } from 'node:module';
import http from 'node:http';
const require = createRequire('/opt/node22/lib/node_modules/');
const { chromium } = require('playwright');
const html = `<!doctype html><meta charset="utf-8"><title>p</title><script>
const mk = (n, d) => document.modelContext.registerTool({ name: n, description: 'Busca guías', inputSchema: { type: 'object', properties: { x: { type: 'integer', description: d } } }, execute: async () => ({}) });
window.__done = Promise.all([mk('ascii', 'Hidratacion'), mk('latin1', 'Hidratación'), mk('emoji', 'ok ✅'), mk('mixed', 'Hidratación ✅')]);
</script>`;
const srv = http.createServer((q, s) => { s.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); s.end(html); }).listen(0);
const b = await chromium.launch({ executablePath: process.argv[2], args: ['--enable-features=WebMCPTesting'] });
const p = await b.newPage(); const cdp = await p.context().newCDPSession(p);
const added = []; cdp.on('WebMCP.toolsAdded', (e) => added.push(...e.tools));
await cdp.send('WebMCP.enable');
await p.goto(`http://localhost:${srv.address().port}/`); await p.evaluate(() => window.__done); await p.waitForTimeout(500);
console.log(JSON.stringify(added.map(t => ({ name: t.name, hasSchema: t.inputSchema !== undefined }))));
console.log(JSON.stringify(await p.evaluate(async () => (await document.modelContext.getTools()).map(t => ({ name: t.name, d: t.inputSchema.properties.x.description })))));
await b.close(); srv.close();
