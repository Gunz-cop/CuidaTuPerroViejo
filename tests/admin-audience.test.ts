import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { displayReferralGroups, fetchReport, windows, coveredMonth, monthWindow, closedMonths, referrerLabel, referralGroups, live, VERSION, type AudienceEnv } from '../src/lib/admin/audience';
import { archive, loadAudience, scheduled, history } from '../src/lib/admin/audience-archive';
const now=new Date('2026-11-12T03:00:00Z');
test('ventanas equivalentes de Costa Rica: medianoche, año y febrero bisiesto',()=>{
 for(const date of ['2026-11-12T05:59:59Z','2026-01-01T01:00:00Z','2024-03-01T07:00:00Z']) for(const days of [7,30]) {
  const {current,previous}=windows(days,new Date(date));
  assert.equal(Date.parse(current.end)-Date.parse(current.start),days*86400000);
  assert.equal(Date.parse(previous.end)-Date.parse(previous.start),days*86400000);
  assert.equal(previous.end,current.start);assert.match(current.end,/T06:00:00/);
 }
 assert.equal(windows(7,now).current.end,'2026-11-11T06:00:00.000Z');
 assert.equal(windows(7,now).previous.start,'2026-10-28T06:00:00.000Z');
});
test('Google oficial, países, subdominios y directo; no confunde imitaciones',()=>{
 for(const host of ['google.com','www.google.co.cr','WWW.GOOGLE.COM.MX.','news.google.es']) assert.equal(referrerLabel(host),'Google');
 assert.equal(referrerLabel(''),'Directo o sin referente');
 for(const host of ['google.com.evil.org','notgoogle.com','google.invalid']) assert.equal(referrerLabel(host),host);
});
test('referidos: denominador visitas, Otros medido y diferencia sin repartir',()=>{
 const r=referralGroups(100,[{label:'www.google.com',value:40},{label:'google.es',value:20},{label:'',value:10}],10,4);
 assert.deepEqual(r.groups,[{label:'Google',value:60},{label:'Directo o sin referente',value:10},{label:'Otros',value:10}]);
 assert.equal(r.difference,20);assert.equal(r.differencePercent,20);assert.match(r.note!,/80.*muestreo/);
 assert.equal(referralGroups(100,[{label:'a',value:101}]).difference,-1);
 assert.equal(referralGroups(0,[]).differencePercent,null);
});
test('mes completo frente a parcial: solo días locales cerrados',()=>{
 assert.equal(coveredMonth('2026-10',Date.parse('2026-09-01')).completeness,'completo');
 const partial=coveredMonth('2026-10',Date.parse('2026-10-12T12:00:00Z'));
 assert.equal(partial.start,'2026-10-13T06:00:00.000Z');assert.equal(partial.coveredDays,19);assert.equal(partial.completeness,'parcial');
 assert.equal(coveredMonth('2026-10',Date.parse('2026-11-02')).coveredDays,0);
 assert.equal(monthWindow('2026-12').end,'2027-01-01T06:00:00.000Z');
 assert.deepEqual(closedMonths(now,45*86400),['2026-09','2026-10']);
});
const row={count:120,sum:{visits:100},avg:{sampleInterval:2}};
const requests:Record<string,unknown>[]=[];
const transport:typeof fetch=async(_url,init)=>{
 const body=JSON.parse(init!.body as string); requests.push(body);
 if(body.query.includes('settings'))return Response.json({data:{viewer:{accounts:[{settings:{rumPageloadEventsAdaptiveGroups:{enabled:true,notOlderThan:45*86400,maxDuration:93*86400}}}]}},errors:null});
 return Response.json({data:{viewer:{accounts:[{total:[row],pages:[{...row,dimensions:{requestPath:'/'}}],countries:[{...row,dimensions:{countryName:'Costa Rica'}}],refs:[{...row,dimensions:{refererHost:'google.com'}}]}]}},errors:null});
};
function kv() {const map=new Map<string,string>();return {async get(k:string){return map.has(k)?JSON.parse(map.get(k)!):null;},async put(k:string,v:string){map.set(k,v);}} as unknown as KVNamespace;}
const configured=()=>({CF_ANALYTICS_TOKEN:'fixture',CF_ANALYTICS_ACCOUNT_ID:'account',CF_ANALYTICS_SITE_TAG:'site',CONTACT_KV:kv()});
test('cada dependencia ausente, caché de 15 minutos y último dato fechado',async()=>{
 for(const key of ['CF_ANALYTICS_TOKEN','CF_ANALYTICS_ACCOUNT_ID','CF_ANALYTICS_SITE_TAG','CONTACT_KV'] as const){const env:AudienceEnv=configured();delete env[key];const result=await live(env,windows(7,now).current,true,now,transport);assert.equal(result.data,null);assert.match(result.error!,/No configurado/);await scheduled({scheduledTime:+now},env);}
 const env=configured(),w=windows(7,now).current;const first=await live(env,w,true,now,transport);assert.equal(first.data?.estimated,true);
 const fail:typeof fetch=async()=>{throw Error('private token');};
 assert.equal((await live(env,w,true,new Date(+now+1000),fail)).stale,false);
 const stale=await live(env,w,true,new Date(+now+901000),fail);assert.equal(stale.stale,true);assert.equal(stale.data?.visits,100);assert.equal(stale.fetchedAt,now.toISOString());assert.doesNotMatch(stale.error!,/private token/);
 assert.equal((await live(configured(),w,true,now,fail)).data,null);
 assert.equal((await live(env,w,true,new Date(+now+86400001),fail)).data,null);
});
test('archivo en SQLite: recuperación, idempotencia, bloqueo de sobrescritura y provisional',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'audience-')); const path=join(dir,'test.db');
 const execute=(sql:string,values:unknown[]=[],script=false)=>JSON.parse(execFileSync('python3',['-c',`import sqlite3,json,sys
x=json.load(sys.stdin);db=sqlite3.connect(x['path']);db.row_factory=sqlite3.Row
if x['script']: db.executescript(x['sql']); result={}
else:
 c=db.execute(x['sql'],x['values']); result={'results':[dict(r) for r in c.fetchall()],'meta':{'changes':max(0,c.rowcount)}}
db.commit();print(json.dumps(result))`,],{input:JSON.stringify({path,sql,values,script}),encoding:'utf8'}));
 const db={prepare(sql:string){let values:unknown[]=[]; const statement={bind(...v:unknown[]){values=v;return statement;},async all(){return execute(sql,values);},async run(){return execute(sql,values);}};return statement;}} as unknown as D1Database;
 try {
 execute(readFileSync('migrations/0005_audience_months.sql','utf8'),[],true);
 const env={...configured(),CONTACT_DB:db};
 const interrupted:typeof fetch=async(url,init)=>{const body=JSON.parse(init!.body as string);if(body.variables?.filter?.datetime_geq?.startsWith('2026-09')) throw Error('Cloudflare down');return transport(url,init);};
 const first=await archive(env,now,interrupted,2);assert.deepEqual(first.failures,['2026-09']);assert.deepEqual(first.inserted,['2026-10']);
 assert.deepEqual((await loadAudience(env,now,transport)).pending,['2026-09']);
 assert.deepEqual((await archive(env,now,transport)).inserted,['2026-09']);
 assert.equal((await history(env)).length,2);assert.equal((await history(env))[0].completeness,'parcial');
 const before=await history(env);assert.deepEqual(await archive(env,now,transport),{inserted:[],failures:[]});assert.deepEqual(await history(env),before);
 await assert.rejects(db.prepare("UPDATE audience_months SET report_json = '{}' WHERE period='2026-10'").run(),/Explicit recalculation/);
 await db.prepare("UPDATE audience_months SET updated_at='2026-11-12T04:00:00Z',update_reason='Corrección explícita de prueba' WHERE period='2026-10'").run();
 const fail:typeof fetch=async()=>{throw Error('Cloudflare down');};
 await assert.rejects(archive(env,now,fail));
 const unavailable=await loadAudience({...env,CONTACT_KV:kv()},now,fail);assert.equal(unavailable.days7.data,null);assert.match(unavailable.settingsError!,/retención/);
 const a=await loadAudience(env,now,transport);assert.deepEqual(a.pending,[]);assert.equal(a.period,'2026-11');assert.ok(a.provisional.data);assert.equal((await history(env)).length,2);
 const missing=await loadAudience({...env,CONTACT_DB:undefined},now,transport);assert.match(missing.historyError!,/0005/);assert.ok(missing.days7.data);
 await db.prepare('DROP TABLE audience_months').run();await scheduled({scheduledTime:+now},env);
 const broken=await loadAudience(env,now,transport);assert.match(broken.historyError!,/0005/);assert.deepEqual(broken.pending,['2026-09','2026-10']);
 } finally{rmSync(dir,{recursive:true,force:true});}
});
test('el handler conserva fetch y scheduled, el histórico usa versión única',()=>{
 assert.match(readFileSync('src/worker.ts','utf8'),/export default \{ fetch, scheduled \}/);
 assert.match(readFileSync('migrations/0005_audience_months.sql','utf8'),/PRIMARY KEY \(period, query_version\)/);
 assert.equal(VERSION,'rum-v1');
});

test('límite de referidos: consulta complemento real y conserva residual; vacío no se vuelve cero',async()=>{
 let tailQueried=false;
 const api:typeof fetch=async(_url,init)=>{
  const request=JSON.parse(init!.body as string);
  if(request.variables.filter.refererHost_notin){tailQueried=true;assert.equal(request.variables.filter.refererHost_notin.length,1000);return Response.json({data:{viewer:{accounts:[{total:[{count:60,sum:{visits:50},avg:{sampleInterval:4}}]}]}}});}
  return Response.json({data:{viewer:{accounts:[{total:[{count:1500,sum:{visits:1100},avg:{sampleInterval:1}}],pages:[],countries:[],refs:Array.from({length:1000},(_,i)=>({count:1,sum:{visits:1},avg:{sampleInterval:1},dimensions:{refererHost:`h${i}.test`}}))}]}}});
 };
 const r=await fetchReport(configured(),windows(30,now).current,true,api);
 assert.equal(tailQueried,true);assert.equal(r.referrals.tail,50);assert.equal(r.referrals.difference,50);assert.equal(r.estimated,true);
 await assert.rejects(fetchReport(configured(),windows(7,now).current,true,async()=>Response.json({data:{viewer:{accounts:[{total:[]}]}}})),/vacío/);
 const env=configured();env.CONTACT_KV={async get(){throw Error('KV down');}} as unknown as KVNamespace;
 assert.equal((await live(env,windows(7,now).current,true,now,api)).data,null);
});

test('presentación de referidos: oculta grupos con cero visitas', () => {
  const referrals = referralGroups(7, [
    { label: 'cuidatuperroviejo.com', value: 0 },
    { label: 'www.cuidatuperroviejo.com', value: 0 },
    { label: '', value: 7 },
  ]);
  assert.deepEqual(displayReferralGroups(referrals), [{ label: 'Directo o sin referente', value: 7 }]);
  assert.equal(referrals.groups.length, 3);
  assert.equal(referrals.returnedSum, 7);
  assert.deepEqual(displayReferralGroups(referralGroups(0, [{ label: 'sitio.test', value: 0 }])), []);
});

test('presentación de referidos: diez fuentes agrupadas más Otros, con tail contado una sola vez', () => {
  const referrals = referralGroups(500, [
    { label: 'google.com', value: 50 }, { label: 'www.google.es', value: 20 },
    { label: '', value: 50 },
    ...Array.from({ length: 12 }, (_, i) => ({ label: `fuente${i}.test`, value: 20 - i })),
    { label: 'cuidatuperroviejo.com', value: 0 },
  ], 30, 2);
  const shown = displayReferralGroups(referrals);
  assert.equal(shown.length, 11);
  assert.deepEqual(shown.slice(0, 2), [{ label: 'Google', value: 70 }, { label: 'Directo o sin referente', value: 50 }]);
  assert.deepEqual(shown.at(-1), { label: 'Otros', value: 12 + 11 + 10 + 9 + 30 });
  assert.equal(shown.reduce((sum, group) => sum + group.value, 0), referrals.returnedSum + referrals.tail);
  assert.equal(shown.filter(group => group.label === 'Otros').length, 1);
});

test('presentación de referidos: conserva diferencia, porcentaje y nota sin mutar el informe', () => {
  for (const tail of [0, 30]) {
    const referrals = referralGroups(500, Array.from({ length: 12 }, (_, i) => ({ label: `f${i}.test`, value: 10 })), tail, 2);
    const before = structuredClone(referrals);
    const shown = displayReferralGroups(referrals);
    assert.deepEqual(referrals, before);
    assert.equal(referrals.difference, 500 - 120 - tail);
    assert.equal(500 - shown.reduce((sum, group) => sum + group.value, 0), referrals.difference);
    assert.equal(shown.length, 11);
  }
});
