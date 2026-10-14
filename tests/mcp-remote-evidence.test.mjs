import test from 'node:test';
import assert from 'node:assert/strict';
import {createPreviewEvidence} from '../scripts/agent-readiness/mcp-remote-evidence.mjs';
const base='https://1234abcd-cuidatuperroviejo.g1721m.workers.dev';
const original=globalThis.fetch;
test('capture wrapper focal: real bytes/status, no redirects, lifecycle and scope',{concurrency:false},async t=>{
 await t.test('request and response bytes preserved',async()=>{
  let request;
  globalThis.fetch=async r=>{request=r; assert.equal(r.redirect,'manual'); assert.equal(await r.text(),'real-upload'); return new Response('real-response',{status:413,headers:{'Cf-Ray':'abc-MAD'}});};
  const e=createPreviewEvidence(base);const r=await e.fetch(base+'/api/mcp',{method:'POST',headers:{'X-Probe':'yes'},body:'real-upload'});
  assert.equal(r.status,413);assert.equal(await r.text(),'real-response');assert.equal(request.headers.get('X-Probe'),'yes');assert.equal(request.headers.get('Content-Length'),null);
  assert.equal(e.records[0].body,'real-response');assert.equal(e.records[0].terminal,'end');assert.equal(e.active(),0);
 });
 await t.test('abort propagates original reason to pending body read',async()=>{
  globalThis.fetch=async()=>new Response(new ReadableStream({start(c){c.enqueue(new Uint8Array([1]));}}));
  const e=createPreviewEvidence(base);const a=new AbortController();const r=await e.fetch(base+'/api/mcp',{signal:a.signal});const reader=r.body.getReader();await reader.read();const pending=reader.read();const reason=new Error('after-headers');a.abort(reason);
  await assert.rejects(pending,error=>error===reason);assert.equal(e.records[0].terminal,'error');assert.match(e.records[0].error,/after-headers/);assert.equal(e.active(),0);
 });
 await t.test('consumer cancel has one terminal and propagates cancellation',async()=>{
  let cancelled;
  globalThis.fetch=async()=>new Response(new ReadableStream({cancel(reason){cancelled=reason;}}));
  const e=createPreviewEvidence(base);const r=await e.fetch(base+'/api/mcp');await r.body.cancel('consumer-cancel');
  assert.equal(cancelled,'consumer-cancel');assert.equal(e.records[0].terminal,'cancel');assert.equal(e.active(),0);
 });
 await t.test('unsafe route/method denied and redirect never followed',async()=>{
  let calls=0;globalThis.fetch=async()=>{calls++;return new Response(null,{status:302,headers:{Location:'https://cuidatuperroviejo.com/'}});};
  const e=createPreviewEvidence(base);
  await assert.rejects(e.fetch(base+'/contacto'));await assert.rejects(e.fetch(base+'/api/agent/v1/x',{method:'DELETE'}));assert.equal(calls,0);
  await assert.rejects(e.fetch(base+'/api/mcp'),/Redirect not followed/);assert.equal(calls,1);assert.equal(e.active(),0);
 });
}).finally(()=>{globalThis.fetch=original;});
