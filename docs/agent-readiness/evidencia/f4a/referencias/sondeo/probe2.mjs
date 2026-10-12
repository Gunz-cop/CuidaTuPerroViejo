import { createRequire } from 'node:module';
import http from 'node:http';
const require = createRequire('/opt/node22/lib/node_modules/');
const { chromium } = require('playwright');
const html = `<!doctype html><title>p</title><script>
window.__r = (async () => {
  const mc = document.modelContext, out = {};
  const ac = new AbortController();
  await mc.registerTool({ name: 'slow', title: 'Lento', description: 'Slow', inputSchema: {type:'object',properties:{},additionalProperties:false},
    annotations:{readOnlyHint:true},
    execute: (i, opts) => new Promise((res, rej) => { out.optsKeys = opts ? Object.keys(Object.getPrototypeOf(opts)===Object.prototype?opts:{}).concat(opts && 'signal' in opts ? ['signal'] : []) : null;
      out.hasSignal = !!(opts && opts.signal); const t = setTimeout(() => res({ok:true}), 3000);
      opts?.signal?.addEventListener('abort', () => { out.executeSawAbort = true; clearTimeout(t); rej(opts.signal.reason); }); }) }, { signal: ac.signal });
  await mc.registerTool({ name: 'bad', description: 'x', inputSchema:{type:'object'}, execute: async () => { throw new TypeError('boom'); } });
  await mc.registerTool({ name: 'errobj', description: 'x', inputSchema:{type:'object'}, execute: async () => ({ error: { code: 'INVALID_REQUEST' } }) });
  const tools = await mc.getTools(); out.tools = tools.map(t => ({ name: t.name, title: t.title, annotations: t.annotations, schema: t.inputSchema }));
  const slow = tools.find(t => t.name === 'slow');
  const ex = new AbortController(); setTimeout(() => ex.abort(), 200);
  try { out.slowResult = await mc.executeTool(slow, {}, { signal: ex.signal }); } catch (e) { out.slowErr = e.name + ': ' + e.message; }
  try { out.badResult = await mc.executeTool(tools.find(t=>t.name==='bad'), {}); } catch (e) { out.badErr = e.name + ': ' + e.message; }
  try { out.errobj = await mc.executeTool(tools.find(t=>t.name==='errobj'), {}); } catch (e) { out.errobjErr = e.name; }
  try { out.strInput = await mc.executeTool(tools.find(t=>t.name==='errobj'), 'notobj'); } catch (e) { out.strInputErr = e.name + ': ' + e.message; }
  try { await mc.registerTool({ name: 'slow', description: 'dup', execute: async () => 1 }); out.dup = 'ok'; } catch (e) { out.dupErr = e.name; }
  ac.abort(); await new Promise(r => setTimeout(r, 50));
  out.afterUnregister = (await mc.getTools()).map(t => t.name);
  try { await mc.registerTool({ name: 'bad name!', description: 'x', execute: async () => 1 }); } catch (e) { out.badNameErr = e.name; }
  return out;
})();
</script>`;
const srv = http.createServer((q, s) => { s.writeHead(200, { 'content-type': 'text/html' }); s.end(html); }).listen(0);
const b = await chromium.launch({ executablePath: process.argv[2], args: ['--enable-features=WebMCPTesting'] });
const p = await b.newPage(); await p.goto(`http://localhost:${srv.address().port}/`);
console.log(JSON.stringify(await p.evaluate(() => window.__r), null, 1));
// CDP domains?
const cdp = await p.context().newCDPSession(p);
for (const m of ['WebMCP.enable', 'ModelContext.enable']) { try { console.log(m, JSON.stringify(await cdp.send(m))); } catch (e) { console.log(m, 'ERR', e.message.slice(0, 120)); } }
await b.close(); srv.close();
