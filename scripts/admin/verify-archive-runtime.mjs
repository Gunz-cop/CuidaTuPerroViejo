// Solo workerd/D1 locales con fixtures. Usa esbuild y Miniflare del lock de Wrangler.
import { build } from 'esbuild';
import { createRequire } from 'node:module';
const { Miniflare, convertV4MiniflareOptions } = createRequire(import.meta.resolve('wrangler/package.json'))('miniflare');
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const source = `
import { scheduled, recoverDays } from './src/lib/admin/audience-archive';
const now=new Date('2026-11-12T08:00:00Z');
const transport=async (_url,init)=>{
 const {query,variables:v}=JSON.parse(init.body);
 if(query.includes('settings')) return Response.json({data:{viewer:{accounts:[{settings:{rumPageloadEventsAdaptiveGroups:{enabled:true,notOlderThan:15897600,maxDuration:8035200,maxPageSize:10000}}}]}}});
 const f=v.filter,hours=[];
 for(let t=Date.parse(f.datetime_geq);t<Date.parse(f.datetime_lt);t+=3600000) hours.push({count:3,sum:{visits:1},dimensions:{datetimeHour:new Date(t).toISOString()}});
 const a={hours,total:[{count:hours.length*3,sum:{visits:hours.length},avg:{sampleInterval:1}}],pages:[],countries:[],refs:[]};
 for(const key of Object.keys(v).filter(k=>/^d\\d+$/.test(k))) a[key]=[{count:72,sum:{visits:24},avg:{sampleInterval:1}}];
 return Response.json({data:{viewer:{accounts:[a]}}});
};
export default {async fetch(request,env,ctx) {
 globalThis.fetch=transport;
 if(new URL(request.url).pathname==='/recover') return Response.json(await recoverDays(env,'2026-10-01','2026-10-02',now,transport));
 // La llamada de plataforma tiene ExecutionContext real como tercer argumento.
 await scheduled({scheduledTime:+now},env,ctx);
 let days=null;try {days=(await env.CONTACT_DB.prepare('SELECT * FROM audience_days ORDER BY day').all()).results;} catch {}
 return Response.json({days,months:(await env.CONTACT_DB.prepare('SELECT * FROM audience_months').all()).results});
}};`;
const result=await build({stdin:{contents:source,resolveDir:process.cwd(),sourcefile:'archive-runtime-fixture.ts',loader:'ts'},bundle:true,write:false,format:'esm',platform:'browser'});
const mf=new Miniflare(convertV4MiniflareOptions({workers:[{name:'archive-fixture',modules:true,script:result.outputFiles[0].text,compatibilityDate:'2026-05-23',d1Databases:['CONTACT_DB'],bindings:{CF_ANALYTICS_TOKEN:'fixture',CF_ANALYTICS_ACCOUNT_ID:'fixture',CF_ANALYTICS_SITE_TAG:'fixture',CONTACT_KV:{}}}]}));
try {
 const db=await mf.getD1Database('CONTACT_DB');
 for(const name of ['0005_audience_months.sql','0006_audience_days.sql']) {
  const sql=await readFile(`migrations/${name}`,'utf8');
  await db.prepare(sql.slice(0,sql.indexOf(';')+1)).run();
  await db.prepare(sql.slice(sql.indexOf('CREATE TRIGGER'))).run();
 }
 const first=await (await mf.dispatchFetch('http://fixture/run')).json();
 assert.equal(first.days.length,7);assert.equal(first.months.length,1);
 assert.deepEqual(first.days.map(r=>r.day),['2026-11-03','2026-11-04','2026-11-05','2026-11-06','2026-11-07','2026-11-08','2026-11-09']);
 assert.ok(first.days.every(r=>r.visits===24&&r.pageviews===72&&r.sample_interval===1&&r.estimated===0));
 const second=await (await mf.dispatchFetch('http://fixture/run')).json();
 assert.deepEqual(second.days,first.days);
 assert.deepEqual(second.months.find(r=>r.period===first.months[0].period),first.months[0]);
 const recovery=await (await mf.dispatchFetch('http://fixture/recover')).json();
 assert.ok(recovery.coverage.every(r=>r.status==='archivado'));
 const days=(await db.prepare('SELECT * FROM audience_days ORDER BY day').all()).results;
 await mf.dispatchFetch('http://fixture/recover');
 assert.deepEqual((await db.prepare('SELECT * FROM audience_days ORDER BY day').all()).results,days);
 await assert.rejects(db.prepare('UPDATE audience_days SET pageviews=1').run(),/Explicit recalculation/);
 // D1 real de workerd: fallar la segunda sentencia revierte la primera.
 await assert.rejects(db.batch([
  db.prepare("INSERT INTO audience_days SELECT '2026-09-01',query_version,timezone,start_utc,end_utc,visits,pageviews,sample_interval,estimated,fetched_at,source,filter_json,updated_at,update_reason FROM audience_days LIMIT 1"),
  db.prepare('UPDATE audience_days SET pageviews=1'),
 ]));
 assert.equal((await db.prepare("SELECT day FROM audience_days WHERE day='2026-09-01'").all()).results.length,0);
 await db.prepare('DROP TABLE audience_days').run();
 const missing=await mf.dispatchFetch('http://fixture/run');
 assert.equal(missing.status,200);assert.equal((await missing.json()).days,null);
 assert.equal((await db.prepare('SELECT * FROM audience_months').all()).results.length,3);
 console.log('PASS workerd: cron con ExecutionContext, siete días, mensual aislado, recuperación, idempotencia, trigger y rollback D1.');
} finally {await mf.dispose();}
