import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { localDay, archiveEligible, closedMonths, type AudienceEnv, type Settings } from '../src/lib/admin/audience';
import { archive, archiveRecentDays, recoverDays, recentDays, dayWindow, dayRange, writeDays, runArchiveSchedule as scheduled, DAY_QUERY_VERSION, MAX_DAY_REQUESTS } from '../src/lib/admin/audience-archive';
import { handleRecovery } from '../src/lib/admin/audience-recovery';
const now=new Date('2026-11-12T08:00:00Z');
const DAY=86400000;

function database(includeDays=true) {
  const dir=mkdtempSync(join(tmpdir(),'audience-days-'));
  const path=join(dir,'data.db');
  const execute=(statements:{sql:string;values?:unknown[]}[],script=false)=>JSON.parse(execFileSync('python3',['-c',`
import sqlite3,json,sys
x=json.load(sys.stdin);db=sqlite3.connect(x['path']);db.row_factory=sqlite3.Row
out=[]
with db:
 for s in x['statements']:
  if x['script']: db.executescript(s['sql']);out.append({})
  else:
   c=db.execute(s['sql'],s.get('values',[]));out.append({'results':[dict(r) for r in c.fetchall()],'meta':{'changes':max(0,c.rowcount)}})
print(json.dumps(out))
`],{input:JSON.stringify({path,statements,script}),encoding:'utf8',stdio:['pipe','pipe','pipe']}));
  execute([{sql:readFileSync('migrations/0005_audience_months.sql','utf8')}],true);
  if(includeDays) execute([{sql:readFileSync('migrations/0006_audience_days.sql','utf8')}],true);
  type Statement={sql:string;values:unknown[];bind(...values:unknown[]):Statement;all():Promise<unknown>;run():Promise<unknown>};
  const db={
    prepare(sql:string):Statement {return {sql,values:[],bind(...values:unknown[]){this.values=values;return this;},async all(){return execute([this])[0];},async run(){return execute([this])[0];}};},
    async batch(statements:Statement[]) {return execute(statements);},
  } as unknown as D1Database;
  return {db,sql:(sql:string)=>execute([{sql}])[0],dispose:()=>rmSync(dir,{recursive:true,force:true})};
}
const configured=(db:D1Database):AudienceEnv=>({CONTACT_DB:db,CONTACT_KV:{} as KVNamespace,CF_ANALYTICS_TOKEN:'fixture',CF_ANALYTICS_ACCOUNT_ID:'account',CF_ANALYTICS_SITE_TAG:'site'});
function api(options:{maxPageSize?:number;maxDuration?:number;retention?:number;empty?:string;zero?:string;mismatch?:boolean;dailyMismatch?:boolean;failDay?:string;invalidHour?:boolean;sample?:number;coarseBatch?:boolean}={}) {
  const requests:Record<string,any>[]=[];
  const settings:Settings={enabled:true,notOlderThan:options.retention??184*86400,maxDuration:options.maxDuration??93*86400,maxPageSize:options.maxPageSize??10000};
  const hours=(f:{datetime_geq:string;datetime_lt:string})=>{
    const rows=[];
    for(let t=Date.parse(f.datetime_geq);t<Date.parse(f.datetime_lt);t+=3600000) {
      const day=localDay(new Date(t));
      if(day===options.empty) continue;
      const factor=options.coarseBatch&&Date.parse(f.datetime_lt)-Date.parse(f.datetime_geq)>DAY?2:1;
      rows.push({count:day===options.zero?0:3*factor,sum:{visits:day===options.zero?0:factor},dimensions:{datetimeHour:new Date(t).toISOString()}});
    }
    return rows;
  };
  const total=(rows:ReturnType<typeof hours>)=>({count:rows.reduce((s,r)=>s+r.count,0),sum:{visits:rows.reduce((s,r)=>s+r.sum.visits,0)}});
  const transport:typeof fetch=async(_url,init)=>{
    const b=JSON.parse(String(init!.body));requests.push(b);
    if(b.query.includes('settings')) return Response.json({data:{viewer:{accounts:[{settings:{rumPageloadEventsAdaptiveGroups:settings}}]}}});
    assert.equal(b.variables.filter.bot,0);assert.deepEqual(b.variables.filter.requestHost_in,['cuidatuperroviejo.com','www.cuidatuperroviejo.com']);
    if(options.failDay&&localDay(new Date(b.variables.filter.datetime_geq))===options.failDay) throw Error('private transport failure');
    if(!b.query.includes('hours:')) return Response.json({data:{viewer:{accounts:[{total:[{count:72,sum:{visits:24},avg:{sampleInterval:2}}],pages:[],countries:[],refs:[]}]}}});
    assert.ok(Date.parse(b.variables.filter.datetime_lt)-Date.parse(b.variables.filter.datetime_geq)<=settings.maxDuration*1000);
    assert.ok(b.variables.limit<=settings.maxPageSize!);
    const all=hours(b.variables.filter),t=total(all);
    if(options.mismatch) t.count++;
    const selected=all.slice(0,b.variables.limit);
    if(options.invalidHour&&selected.length) selected[0].dimensions.datetimeHour='2020-01-01T00:00:00Z';
    const a:Record<string,unknown>={hours:selected,total:[t]};
    for(const [key,f] of Object.entries(b.variables)) if(/^d\d+$/.test(key)) {
      const rows=hours(f as any),t=total(rows);
      if(options.dailyMismatch) t.count++;
      a[key]=rows.length?[{...t,avg:{sampleInterval:options.sample??(localDay(new Date((f as any).datetime_geq)).endsWith('08')?2.5:1)}}]:[];
    }
    return Response.json({data:{viewer:{accounts:[a]}}});
  };
  return {requests,transport};
}

test('hora UTC a día de Costa Rica, año y bisiesto; rangos válidos',()=>{
  assert.equal(localDay(new Date('2026-01-01T05:00:00Z')),'2025-12-31');
  assert.equal(localDay(new Date('2026-01-01T06:00:00Z')),'2026-01-01');
  assert.equal(localDay(new Date('2024-03-01T05:00:00Z')),'2024-02-29');
  assert.deepEqual(dayRange('2024-02-28','2024-03-01'),['2024-02-28','2024-02-29','2024-03-01']);
  for(const range of [['2026-02-30','2026-03-01'],['2026-11-03','2026-11-01'],['2025-01-01','2026-01-03']]) assert.throws(()=>dayRange(...range as [string,string]));
});
test('margen único de 48 horas para días y meses, antes/en/después del límite',()=>{
  for(const end of [dayWindow('2026-11-01').end,'2026-11-01T06:00:00.000Z']) {
    const cutoff=Date.parse(end)+2*DAY;
    assert.equal(archiveEligible(end,new Date(cutoff-1)),false);
    assert.equal(archiveEligible(end,new Date(cutoff)),true);
    assert.equal(archiveEligible(end,new Date(cutoff+1)),true);
  }
  assert.ok(!closedMonths(new Date('2026-11-03T05:59:59Z'),184*86400).includes('2026-10'));
  assert.ok(closedMonths(new Date('2026-11-03T06:00:00Z'),184*86400).includes('2026-10'));
  assert.deepEqual(recentDays(now),dayRange('2026-11-03','2026-11-09'));
  for(const date of ['2026-11-12T05:59:59Z','2026-11-12T06:00:00Z']) for(const day of recentDays(new Date(date))) assert.equal(archiveEligible(dayWindow(day).end,new Date(date)),true);
});
test('agrupa horas de dos fechas UTC en días locales; sampleInterval real por día y metadatos',async()=>{
  const d=database();try {
    const env=configured(d.db),a=api();
    const result=await recoverDays(env,'2026-11-08','2026-11-09',now,a.transport);
    assert.deepEqual(result.coverage.map(r=>r.status),['archivado','archivado']);
    const rows=d.sql('SELECT * FROM audience_days ORDER BY day').results;
    assert.deepEqual(rows.map((r:any)=>[r.visits,r.pageviews,r.sample_interval,r.estimated]),[[24,72,2.5,1],[24,72,1,0]]);
    assert.equal(rows[0].start_utc,'2026-11-08T06:00:00.000Z');assert.equal(rows[0].end_utc,'2026-11-09T06:00:00.000Z');
    assert.equal(rows[0].timezone,'America/Costa_Rica');assert.equal(rows[0].source,'cloudflare_rum');assert.equal(rows[0].query_version,DAY_QUERY_VERSION);
    assert.equal(JSON.parse(rows[0].filter_json).bot,0);
  } finally {d.dispose();}
});
test('cron solo reintenta dentro de siete días elegibles; los huecos antiguos no entran',async()=>{
  const d=database();try {
    const env=configured(d.db),fail=api({maxDuration:86400,failDay:'2026-11-05'});
    const first=await archiveRecentDays(env,now,fail.transport);
    assert.equal(first.coverage.find(r=>r.day==='2026-11-05')!.status,'fallido');
    assert.equal(d.sql('SELECT * FROM audience_days').results.length,6);
    const retry=api();await archiveRecentDays(env,now,retry.transport);
    assert.deepEqual(retry.requests.filter(r=>r.variables.filter).map(r=>localDay(new Date(r.variables.filter.datetime_geq))),['2026-11-05']);
    const gone=api();await archiveRecentDays(env,new Date(+now+10*DAY),gone.transport);
    assert.ok(gone.requests.filter(r=>r.variables.filter).every(r=>r.variables.filter.datetime_geq>=dayWindow('2026-11-13').start));
    assert.equal(d.sql("SELECT * FROM audience_days WHERE day='2026-10-01'").results.length,0);
  } finally {d.dispose();}
});
test('recuperación interrumpida y reanudada: lotes independientes, sin duplicados ni cambios',async()=>{
  const d=database();try {
    const env=configured(d.db),fail=api({failDay:'2026-11-08'});
    const first=await recoverDays(env,'2026-11-01','2026-11-08',now,fail.transport);
    assert.equal(first.coverage.at(-1)!.status,'fallido');
    const before=d.sql('SELECT * FROM audience_days ORDER BY day').results;assert.equal(before.length,7);
    const a=api();await recoverDays(env,'2026-11-01','2026-11-08',now,a.transport);
    assert.deepEqual(d.sql("SELECT * FROM audience_days WHERE day<'2026-11-08' ORDER BY day").results,before);
    assert.equal(d.sql('SELECT * FROM audience_days').results.length,8);
    assert.deepEqual(a.requests.filter(r=>r.variables.filter).map(r=>r.variables.filter.datetime_geq),[dayWindow('2026-11-08').start]);
    const noCalls=api();await recoverDays(env,'2026-11-01','2026-11-08',now,noCalls.transport);assert.equal(noCalls.requests.length,0);
  } finally {d.dispose();}
});
test('límite alcanzado divide lotes y horas, incluso con total aparentemente coherente',async()=>{
  const d=database();try {
    const a=api({maxPageSize:4}),env=configured(d.db);
    const r=await recoverDays(env,'2026-11-08','2026-11-09',now,a.transport);
    assert.deepEqual(r.coverage.map(r=>r.status),['archivado','archivado']);
    assert.equal(r.requests,31);assert.ok(r.requests<=MAX_DAY_REQUESTS);
    assert.deepEqual(d.sql('SELECT pageviews FROM audience_days').results.map((r:any)=>r.pageviews),[72,72]);
  } finally {d.dispose();}
});
test('presupuesto agotado deja días pendientes; truncamiento irreducible falla sin insertar',async()=>{
  const d=database();try {
    const a=api({maxPageSize:4});const r=await recoverDays(configured(d.db),'2026-11-01','2026-11-09',now,a.transport);
    assert.ok(r.requests<=MAX_DAY_REQUESTS);assert.ok(r.coverage.some(r=>r.status==='pendiente'));
    const b=api({maxPageSize:1});const failed=await recoverDays(configured(d.db),'2026-10-01','2026-10-01',now,b.transport);
    assert.equal(failed.coverage[0].status,'fallido');assert.equal(d.sql("SELECT * FROM audience_days WHERE day='2026-10-01'").results.length,0);
  } finally {d.dispose();}
});
test('coherencia del lote y del día, horas inválidas: nada del lote se guarda',async()=>{
  for(const options of [{mismatch:true},{dailyMismatch:true},{invalidHour:true}]) {
    const d=database();try {
      const a=api(options);const r=await recoverDays(configured(d.db),'2026-11-08','2026-11-09',now,a.transport);
      assert.ok(r.coverage.every(r=>r.status==='fallido'));assert.deepEqual(d.sql('SELECT * FROM audience_days').results,[]);
    } finally {d.dispose();}
  }
});
test('día vacío o agregado cero no se inventa; los otros días coherentes se guardan',async()=>{
  for(const options of [{empty:'2026-11-08'},{zero:'2026-11-08'}]) {
    const d=database();try {
      const a=api(options);const r=await recoverDays(configured(d.db),'2026-11-08','2026-11-09',now,a.transport);
      assert.equal(r.coverage[0].status,'fallido');assert.equal(r.coverage[1].status,'archivado');
      assert.deepEqual(d.sql('SELECT day FROM audience_days').results,[{day:'2026-11-09'}]);
    } finally {d.dispose();}
  }
});
test('cobertura: archivado, fuera de retención, margen pendiente y maxDuration insuficiente',async()=>{
  const d=database();try {
    const env=configured(d.db),a=api({retention:5*86400});
    await writeDays(env,[{day:'2026-11-01',visits:1,pageviews:2,sampleInterval:1}],now.toISOString());
    const r=await recoverDays(env,'2026-11-01','2026-11-12',now,a.transport);
    assert.equal(r.coverage[0].status,'archivado');assert.equal(r.coverage[1].status,'fuera de retención');
    assert.equal(r.coverage.at(-1)!.status,'pendiente');assert.equal(r.coverage.at(-3)!.status,'pendiente');
    const b=api({maxDuration:3600});const failed=await recoverDays(env,'2026-10-08','2026-10-08',now,b.transport);
    assert.equal(failed.coverage[0].status,'fallido');
  } finally {d.dispose();}
});
test('transacción real, idempotencia concurrente y trigger de sobrescritura',async()=>{
  const d=database();try {
    const env=configured(d.db),value={day:'2026-11-08',visits:1,pageviews:2,sampleInterval:1};
    await assert.rejects(writeDays(env,[value,{...value,day:'2026-11-09',pageviews:0}],now.toISOString()));
    assert.deepEqual(d.sql('SELECT * FROM audience_days').results,[]);
    await Promise.all([writeDays(env,[value],now.toISOString()),writeDays(env,[value],now.toISOString())]);
    const before=d.sql('SELECT * FROM audience_days').results;
    await writeDays(env,[{...value,pageviews:99}],new Date(+now+DAY).toISOString());assert.deepEqual(d.sql('SELECT * FROM audience_days').results,before);
    assert.throws(()=>d.sql("UPDATE audience_days SET pageviews=99"),/Explicit recalculation/);
    d.sql("UPDATE audience_days SET pageviews=99,updated_at='2026-11-13T00:00:00Z',update_reason='Prueba explícita'");
    assert.throws(()=>d.sql("UPDATE audience_days SET pageviews=100"),/Explicit recalculation/);
  } finally {d.dispose();}
});
test('cron conserva meses guardados; falta 0006 no impide el archivo mensual',async()=>{
  const d=database(false);try {
    const env=configured(d.db),a=api();
    await scheduled({scheduledTime:+now},env,a.transport);
    const before=d.sql('SELECT * FROM audience_months').results;assert.equal(before.length,1);
    // Mismo mes, varias ejecuciones: omite el ya guardado y avanza pendientes.
    await archive(env,now,a.transport);
    assert.deepEqual(d.sql(`SELECT * FROM audience_months WHERE period='${before[0].period}'`).results,before);
    assert.equal(d.sql("SELECT name FROM sqlite_schema WHERE name='audience_days'").results.length,0);
    const worker=readFileSync('src/worker.ts','utf8');assert.match(worker,/export default \{ fetch, scheduled \}/);
    const config=JSON.parse(readFileSync('wrangler.jsonc','utf8'));assert.deepEqual(config.triggers.crons,['0 8 * * *']);
    const code=readFileSync('src/lib/admin/audience-archive.ts','utf8');
    const scheduledCode=code.slice(code.indexOf('export async function scheduled'),code.indexOf('export async function loadAudience'));
    assert.doesNotMatch(scheduledCode,/recoverDays/);
  } finally {d.dispose();}
});
test('ruta histórica cerrada por defecto; requiere Basic, secret separado, confirmación y rango acotado',async()=>{
  const bindings={CONTACT_ADMIN_USER:'admin',CONTACT_ADMIN_PASSWORD:'fixture'};
  const request=(body:unknown,headers:Record<string,string>={})=>new Request('https://example.com/api/admin/audience/recover-days',{method:'POST',headers:{Authorization:'Basic '+btoa('admin:fixture'),'Content-Type':'application/json',...headers},body:JSON.stringify(body)});
  const body={from:'2026-11-01',to:'2026-11-07',reason:'Autorización de prueba',confirm:'RECOVER_AUDIENCE_DAYS'};
  let calls=0;
  const recover:typeof recoverDays=async()=>{calls++;return {coverage:[],requests:0};};
  assert.equal((await handleRecovery(request(body),bindings,recover)).status,503);
  const env={...bindings,AUDIENCE_RECOVERY_TOKEN:'separate-fixture'};
  assert.equal((await handleRecovery(request(body),env,recover)).status,403);
  const headers={'X-Audience-Recovery-Token':'separate-fixture'};
  assert.equal((await handleRecovery(request(body,{...headers,Authorization:'wrong'}),env,recover)).status,401);
  assert.equal((await handleRecovery(request({...body,to:'2026-11-08'},headers),env,recover)).status,400);
  assert.equal((await handleRecovery(request({...body,confirm:undefined},headers),env,recover)).status,400);
  assert.equal((await handleRecovery(request(body,{...headers,Origin:'https://evil.example'}),env,recover)).status,403);
  assert.equal((await handleRecovery(request({padding:'x'.repeat(3000)},headers),env,recover)).status,413);
  assert.equal(calls,0);
  const response=await handleRecovery(request(body,headers),env,recover);
  assert.equal(response.status,200);assert.match(response.headers.get('Cache-Control')!,/no-store/);assert.equal(calls,1);
});

test('archivo mensual real espera hasta cierre+48h y no altera el mes existente',async()=>{
  const d=database();try {
    const env=configured(d.db),a=api({retention:30*86400});
    const before=await archive(env,new Date('2026-11-03T05:59:59.999Z'),a.transport);
    assert.deepEqual(before.inserted,[]);assert.equal(a.requests.length,1);
    const at=await archive(env,new Date('2026-11-03T06:00:00Z'),a.transport);
    assert.deepEqual(at.inserted,['2026-10']);
    const saved=d.sql('SELECT * FROM audience_months').results;
    await archive(env,new Date('2026-11-10T08:00:00Z'),a.transport);
    assert.deepEqual(d.sql('SELECT * FROM audience_months').results,saved);
  } finally {d.dispose();}
});
test('handler del cron integrado nunca consulta días antiguos, aunque falten todos',async()=>{
  const d=database();try {
    const a=api();await scheduled({scheduledTime:+now},configured(d.db),a.transport);
    const data=a.requests.filter(r=>r.query.includes('hours:'));
    assert.ok(data.length>0);assert.ok(data.every(r=>r.variables.filter.datetime_geq>=dayWindow('2026-11-03').start));
    assert.deepEqual(d.sql('SELECT day FROM audience_days ORDER BY day').results.map((r:any)=>r.day),recentDays(now));
    assert.equal(d.sql("SELECT * FROM audience_days WHERE day<'2026-11-03'").results.length,0);
  } finally {d.dispose();}
});

test('muestreo del lote amplio distinto al de cada día: descarta padre y valida sublotes antes de escribir',async()=>{
  const d=database();try {
    const a=api({coarseBatch:true}),env=configured(d.db);
    const result=await archiveRecentDays(env,now,a.transport);
    assert.ok(result.coverage.every(r=>r.status==='archivado'));
    assert.equal(result.requests,13); // Árbol de siete hojas, sin reintentar transporte.
    const rows=d.sql('SELECT * FROM audience_days ORDER BY day').results;
    assert.equal(rows.length,7);assert.ok(rows.every((r:any)=>r.pageviews===72&&r.visits===24));
    assert.equal(rows.find((r:any)=>r.day==='2026-11-08').sample_interval,2.5);
    const before=rows;
    await archiveRecentDays(env,now,a.transport);
    assert.deepEqual(d.sql('SELECT * FROM audience_days ORDER BY day').results,before);
  } finally {d.dispose();}
});
