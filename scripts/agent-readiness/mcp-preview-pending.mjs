#!/usr/bin/env node
// Adenda 2: only pending gates, immutable preview, real SDK and native Node fetch.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { createPreviewEvidence } from './mcp-remote-evidence.mjs';
import { consumeControlResponse } from './mcp-control-response.mjs';
const [base, output] = process.argv.slice(2);
if (!base || !output) throw new Error('Usage: mcp-preview-pending.mjs <immutable-preview> <private-output>');
const evidence = createPreviewEvidence(base); const endpoint = new URL('/api/mcp', evidence.root);
const results = []; const started = new Date().toISOString();
const h = { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'MCP-Protocol-Version': '2026-07-28', 'Mcp-Method': 'server/discover' };
const lh = { 'Content-Type': h['Content-Type'], Accept: h.Accept, 'MCP-Protocol-Version': '2025-11-25' };
const discover = { jsonrpc: '2.0', id: 900, method: 'server/discover', params: { _meta: { 'io.modelcontextprotocol/protocolVersion': '2026-07-28', 'io.modelcontextprotocol/clientCapabilities': {} } } };
const ping = { jsonrpc: '2.0', id: 901, method: 'ping', params: {} };
const control = async (body, headers = h, extra = {}, deadline = false) => {
  const response = await evidence.fetch(endpoint, { method: 'POST', headers, body: typeof body === 'string' || body instanceof ReadableStream ? body : JSON.stringify(body), ...extra });
  const consumed = await consumeControlResponse(response);
  if (consumed.status >= 500 && !deadline) throw new Error(`STOP unexpected HTTP ${consumed.status}; full original captured`);
  return consumed;
};
const status = async (label, body, expected, headers = h, extra = {}) => {
  const response = await control(body, headers, extra); assert.equal(response.status, expected, label);
  results.push({ label, status: 'PASS', http: response.status, sequence: evidence.count() }); return response;
};
const nap = ms => new Promise(r => setTimeout(r, ms));
const window = async label => { const count = evidence.count(); for (const ms of [20000,20000,20000,1200]) { console.log(`WINDOW ${label}: ${ms}ms, zero requests`); await nap(ms); assert.equal(evidence.count(), count); } };
const stream = text => new ReadableStream({ start(c) { c.enqueue(Buffer.from(text)); c.close(); } });
const options = { fetch: evidence.fetch, redirectPolicy: 'follow', requestInit: { redirect: 'manual' }, reconnectionOptions: { maxRetries: 0, initialReconnectionDelay: 1000, maxReconnectionDelay: 1000, reconnectionDelayGrowFactor: 1 } };
let failure;
await mkdir(resolve(output), { recursive: true });
try {
  await status('C07 Accept', discover, 406, { ...h, Accept: 'application/json' });
  await status('C08 batch', [discover], 400);
  await status('C08 malformed', '{', 400);
  const cancelled = await status('legacy cancelled', { jsonrpc:'2.0', method:'notifications/cancelled', params:{requestId:900,reason:'evidence'} },202,lh); assert.equal(await cancelled.text(),'');
  const modernPing = await status('modern ping', {...discover,method:'ping'},404,{...h,'Mcp-Method':'ping'});
  assert.deepEqual(await modernPing.json(),{jsonrpc:'2.0',id:900,error:{code:-32601,message:'Method not found.'}});
  const legacyPing = await status('legacy ping',ping,200,lh); assert.match(await legacyPing.text(), /"result":\{\}/u);
  const preflight = await consumeControlResponse(await evidence.fetch(endpoint,{method:'OPTIONS',headers:{Origin:evidence.root.origin,'Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'mcp-protocol-version,mcp-method,mcp-name,content-type'}}));
  assert.equal(preflight.status,204); results.push({label:'preflight',status:'PASS',http:204});
  const text = JSON.stringify(discover); const atLimit = text+' '.repeat(32768-Buffer.byteLength(text));
  assert.equal(Buffer.byteLength(atLimit),32768);
  await status('stream32768',stream(atLimit),200,h,{duplex:'half'});
  await status('stream32769',stream('x'.repeat(32769)),413,h,{duplex:'half'});
  await status('immediate ping after413',ping,200,lh);
  await status('immediate batch after ping', [discover],400);
  const nested = n => { let probe='x'; while(n--) probe=[probe]; return {...discover,params:{_meta:{...discover.params._meta,probe}}}; };
  await status('depth16',nested(13),200); await status('depth17',nested(14),400);
  const meta={...discover.params._meta,padding:''}; meta.padding='x'.repeat(8192-Buffer.byteLength(JSON.stringify(meta)));
  assert.equal(Buffer.byteLength(JSON.stringify(meta)),8192); await status('meta8192',{...discover,params:{_meta:meta}},200);
  meta.padding+='x'; await status('meta8193',{...discover,params:{_meta:meta}},400);
  console.log('C07/C08 completed');
  const aborts=[new AbortController(),new AbortController()], sourceCancelled=[false,false];
  const pending=aborts.map((a,i)=>control(new ReadableStream({start(c){c.enqueue(Buffer.from(atLimit));},cancel(){sourceCancelled[i]=true;}}),h,{duplex:'half',signal:a.signal}).then(r=>({status:r.status}),e=>({error:String(e)})));
  await nap(500); const third=await control(discover);
  if (![200,429].includes(third.status)) throw new Error(`cap third unexpected ${third.status}`);
  aborts.forEach(a=>a.abort(new Error('matrix-cancel'))); const aborted=await Promise.all(pending);
  assert.ok(aborted.every(x=>x.error)); assert.deepEqual(sourceCancelled,[true,true]);
  await nap(300); await status('cap recovery',discover,200);
  results.push({label:'C09 cap2/3',status:third.status===429?'PASS':'no determinable en plataforma',third:third.status,aborted,sourceCancelled});
  let stopped=false;
  const timed=new ReadableStream({start(c){c.enqueue(Buffer.from(atLimit));},cancel(){stopped=true;}});
  const start=performance.now(); const deadline=await control(timed,h,{duplex:'half'},true); const elapsed=performance.now()-start;
  // A platform page or non-contractual failure is STOP before further traffic.
  if(deadline.status!==500 || elapsed<10000 || elapsed>12000) throw new Error(`STOP deadline status/time ${deadline.status}/${elapsed}ms`);
  assert.deepEqual(await deadline.json(),{jsonrpc:'2.0',id:null,error:{code:-32603,message:'Internal error.'}});
  // Recovery is immediately next request, never a retry.
  const recovery=await control(discover);
  results.push({label:'deadline observation',http:deadline.status,elapsedMs:elapsed,body:await deadline.text(),recovery:recovery.status,uploadCancelled:stopped});
  assert.equal(deadline.status,500); assert.ok(elapsed>=10000 && elapsed<=12000,`deadline ${elapsed}ms`);
  assert.deepEqual(await deadline.json(),{jsonrpc:'2.0',id:null,error:{code:-32603,message:'Internal error.'}});
  assert.equal(recovery.status,200); assert.equal(stopped,true); assert.equal(evidence.active(),0);
  results.push({label:'C09 deadline',status:'PASS'}); console.log('C09 abort/deadline completed');
  await window('new quota window'); const begin=evidence.records.length;
  const client=new Client({name:'ctpv-independent-f4b-rate',version:'1.0.0'},{versionNegotiation:{mode:{pin:'2026-07-28'}}});
  const transport=new StreamableHTTPClientTransport(endpoint,options); const calls=[];
  try {
    await client.connect(transport);
    for(let n=1;n<=91;n++) {
      const before=evidence.records.length;
      try { const value=await client.callTool({name:'recommend_mobility_aids',arguments:{level:'light',handling:'calm'}}); assert.equal(value.isError,false); }
      catch(error) { if(error.status!==429) throw error; }
      const post=evidence.records.slice(before).filter(r=>r.method==='POST');
      assert.equal(post.length,1,'one request per call, no retries'); const r=post[0];
      if(r.status>=500) throw new Error(`STOP quota product/server ${r.status}`);
      calls.push({call:n,status:r.status,cfRay:r.cfRay,colo:r.coloInferredFromRay});
    }
  } finally { await client.close(); }
  const callPass=calls.slice(0,90).every(r=>r.status===200)&&calls[90].status===429;
  results.push({label:'C09 calls90/91',status:callPass?'PASS':'no determinable en plataforma',calls});
  const posts=()=>evidence.records.slice(begin).filter(r=>r.method==='POST'); assert.ok(posts().length<=120);
  while(posts().length<121) { const r=await control(discover); if(![200,429].includes(r.status)) throw new Error(`Unexpected quota ${r.status}`); }
  const postStatuses=posts().map((r,i)=>({post:i+1,status:r.status,cfRay:r.cfRay,colo:r.coloInferredFromRay}));
  const postPass=postStatuses.slice(0,120).every(r=>r.status===200)&&postStatuses[120].status===429;
  results.push({label:'C09 posts120/121',status:postPass?'PASS':'no determinable en plataforma',posts:postStatuses});
  assert.equal(evidence.active(),0); await window('quota recovery'); await status('quota recovery',discover,200); assert.equal(evidence.active(),0);
  console.log(`Completed ${evidence.count()} requests; no retries/redirects`);
} catch(error) { failure={message:String(error),stack:error.stack}; console.error(error); }
finally {
  await evidence.close(); await evidence.save(output);
  await writeFile(resolve(output,'result.json'),JSON.stringify({started,ended:new Date().toISOString(),base,product:'192dcdd52d2790652ef2dbcb6d23a0f5006ade43',harnessCommit:process.env.F4B_HARNESS_COMMIT,node:process.version,undici:process.versions.undici,sdk:'2.3.1',transport:'Node fetch',requests:evidence.count(),budget:320,status:failure?'STOP':results.some(r=>r.status==='no determinable en plataforma')?'OWNER_DECISION_PENDING':'PASS',results,failure},null,2)+'\n');
}
if(failure) process.exitCode=1;
