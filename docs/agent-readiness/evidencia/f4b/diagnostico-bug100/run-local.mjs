import {spawn} from 'node:child_process';
import http from 'node:http';
import {writeFile,createWriteStream} from 'node:fs';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
const save=promisify(writeFile), root='/workspace/f4b-originales-privados/bug100-diagnostico', repo='/workspace/ctpv-f4b-desarrollo';
const ping=JSON.stringify({jsonrpc:'2.0',id:1,method:'ping',params:{}});
const headers={'Content-Type':'application/json',Accept:'application/json, text/event-stream','MCP-Protocol-Version':'2025-11-25'};
const cases=[['ping-before',ping,200,false,{}],['media',ping,415,false,{'Content-Type':'text/plain'}],['accept',ping,406,false,{Accept:'application/json'}],['stream-limit',ping+' '.repeat(32768-Buffer.byteLength(ping)),200,true,{}],['ping-after-limit',ping,200,false,{}],['stream-overflow','x'.repeat(32769),413,true,{}],['ping-after-overflow',ping,200,false,{}],['batch',JSON.stringify([JSON.parse(ping)]),400,false,{}]];
const results={planCommit:'bf4b940',admission:'admision-arranque-local.md',product:'192dcdd52d2790652ef2dbcb6d23a0f5006ade43',at:new Date().toISOString(),budget:32,attempts:0,runs:[]};
results.attempts=8;results.runs=JSON.parse(await (await import('node:fs/promises')).readFile(`${root}/result.json.initial`,'utf8')).runs;
const nap=ms=>new Promise(r=>setTimeout(r,ms));
async function fetched(url,body,h,streamed){
 const bytes=Buffer.from(body);
 const response=await fetch(url,{method:'POST',headers:h,body:streamed?new ReadableStream({start(c){c.enqueue(bytes);c.close();}}):body,...(streamed?{duplex:'half'}:{}),signal:AbortSignal.timeout(12000)});
 const reader=response.body?.getReader();const chunks=[];let n=0;
 while(reader){const {done,value}=await reader.read();if(done)break;n+=value.length;if(n>65536){await reader.cancel().catch(()=>{});throw new Error('DIAGNOSTIC_RESPONSE_CAP');}chunks.push(value);}
 return {status:response.status,headers:Object.fromEntries(response.headers),body:Buffer.concat(chunks).toString('utf8')};
}
function raw(url,body,h,streamed,agent){return new Promise((resolve,reject)=>{
 const bytes=Buffer.from(body);const sendheaders={...h,...(streamed?{'Transfer-Encoding':'chunked'}:{'Content-Length':String(bytes.length)})};
 const request=http.request(url,{method:'POST',headers:sendheaders,agent},response=>{
 const chunks=[];let n=0;response.on('data',c=>{n+=c.length;if(n>65536)response.destroy(new Error('DIAGNOSTIC_RESPONSE_CAP'));else chunks.push(c);});
 response.on('error',reject);response.on('end',()=>resolve({status:response.statusCode,headers:response.headers,body:Buffer.concat(chunks).toString('utf8'),sentWireHeaders:request._header}));
 });request.setTimeout(12000,()=>request.destroy(new Error('CLIENT_TIMEOUT')));request.on('error',reject);request.write(bytes);request.end();
});}
for(const [i,[target,client]] of [['app','fetch'],['minimum','http'],['app','http']].entries()){
 const label=`${i+2}-${target}-${client}`,port=8912+i,config=target==='minimum'?`${root}/minimum-config.json`:`${root}/app/config.json`;
 const log=createWriteStream(`${root}/${label}.log`);let readyText='',startupResolve,exit=null;
 const processWorker=spawn(process.execPath,[`${repo}/node_modules/wrangler/bin/wrangler.js`,'dev','--local','--config',config,'--port',String(port),'--persist-to',`${root}/${label}-state`],{cwd:repo,env:{...process.env,XDG_CONFIG_HOME:'/tmp/f4b-config',ASTRO_TELEMETRY_DISABLED:'1',WRANGLER_SEND_METRICS:'false'},stdio:['ignore','pipe','pipe']});
 const startup=new Promise(r=>startupResolve=r);const consume=data=>{log.write(data);readyText+=data.toString();if(/Ready on http:/.test(readyText))startupResolve(true);};processWorker.stdout.on('data',consume);processWorker.stderr.on('data',consume);
 processWorker.on('exit',(code,signal)=>{exit={code,signal};startupResolve(false);});
 const ready=await Promise.race([startup,nap(30000).then(()=>false)]);const run={label,port,config,pid:processWorker.pid,ready,requests:[]};results.runs.push(run);const agent=new http.Agent({keepAlive:true,maxSockets:1});
 if(ready){for(const [name,body,expected,streamed,override] of cases){
  results.attempts++;if(results.attempts>32)throw new Error('BUDGET');
  const id=`${label}-${name}`,h={...headers,...override,'X-Diag-Id':id};const record={id,name,expected,streamed,bodyBytes:Buffer.byteLength(body),bodySha256:createHash('sha256').update(body).digest('hex'),intendedHeaders:h,processBefore:{exitCode:processWorker.exitCode,signalCode:processWorker.signalCode,exit}};
  try{record.received=await(client==='fetch'?fetched(`http://127.0.0.1:${port}/api/mcp`,body,h,streamed):raw(`http://127.0.0.1:${port}/api/mcp`,body,h,streamed,agent));record.matches=record.received.status===expected;}
  catch(error){record.error={name:error.name,message:error.message,cause:error.cause?String(error.cause):null};record.matches=false;}
  await nap(200);record.processAfter={exitCode:processWorker.exitCode,signalCode:processWorker.signalCode,exit};run.requests.push(record);await save(`${root}/result.json`,JSON.stringify(results,null,2)+'\n');
  console.log(id,record.received?.status??record.error?.message,'expected',expected,'exit',JSON.stringify(exit));
 }}
 run.beforeCleanup={exitCode:processWorker.exitCode,signalCode:processWorker.signalCode,exit};agent.destroy();
 if(exit===null){processWorker.kill('SIGTERM');await Promise.race([new Promise(r=>processWorker.once('exit',r)),nap(2000)]);if(exit===null)processWorker.kill('SIGKILL');}
 run.afterCleanup={exitCode:processWorker.exitCode,signalCode:processWorker.signalCode,exit};log.end();await save(`${root}/result.json`,JSON.stringify(results,null,2)+'\n');
 if(!ready){results.stopped='STARTUP_FAILURE';break;}
}
console.log('DONE',results.attempts);
