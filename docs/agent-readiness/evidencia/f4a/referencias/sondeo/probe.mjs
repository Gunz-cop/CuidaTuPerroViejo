import { createRequire } from 'node:module';
import http from 'node:http';
const require = createRequire('/opt/node22/lib/node_modules/');
const { chromium } = require('playwright');
const html = `<!doctype html><title>p</title><script>
window.__r = (async () => {
  const out = { doc: typeof document.modelContext, nav: typeof navigator.modelContext };
  const mc = document.modelContext || navigator.modelContext;
  if (!mc) return out;
  out.proto = Object.getOwnPropertyNames(Object.getPrototypeOf(mc));
  try {
    await mc.registerTool({ name: 'echo', description: 'Echo', inputSchema: {type:'object',properties:{x:{type:'number'}},required:['x']}, annotations:{readOnlyHint:true}, execute: async (i) => ({ y: i.x * 2 }) });
    out.registered = true;
  } catch (e) { out.regErr = e.name + ': ' + e.message; }
  try { out.tools = (await mc.getTools()).map(t => t.name); } catch (e) { out.getErr = e.name + ': ' + e.message; }
  try { const t = (await mc.getTools())[0]; out.exec = await mc.executeTool(t, { x: 21 }); } catch (e) { out.execErr = e.name + ': ' + e.message; }
  return out;
})();
</script>`;
const srv = http.createServer((q, s) => { s.writeHead(200, { 'content-type': 'text/html' }); s.end(html); }).listen(0);
const port = srv.address().port;
for (const args of [[], ['--enable-features=WebMCPTesting'], ['--enable-features=WebMCP,WebMCPTesting']]) {
  const b = await chromium.launch({ executablePath: process.argv[2], args });
  const p = await b.newPage();
  await p.goto(`http://localhost:${port}/`);
  console.log(JSON.stringify(args), JSON.stringify(await p.evaluate(() => window.__r)));
  await b.close();
}
srv.close();
