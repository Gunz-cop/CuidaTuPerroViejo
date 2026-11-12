import { VERSION, HOSTS, windows, liveSettings, configError, settings, closedMonths, coveredMonth, monthWindow, localDay, midnight, live, fetchReport, graphql, filter, archiveEligible, ARCHIVE_CLOSE_DELAY_HOURS, type AudienceEnv, type Report, type Settings, type Window } from './audience';
export type Month = {period:string; completeness:string; covered_days:number; covered_start_utc:string; covered_end_utc:string; fetched_at:string; report:Report};
export async function history(env:AudienceEnv):Promise<Month[]> {
  if(!env.CONTACT_DB) throw Error('No configurado: falta CONTACT_DB.');
  const rows=await env.CONTACT_DB.prepare('SELECT * FROM audience_months WHERE query_version = ? ORDER BY period').bind(VERSION).all<Omit<Month,'report'> & {report_json:string}>();
  return rows.results.map(row=>({...row,report:JSON.parse(row.report_json)}));
}
export async function archive(env:AudienceEnv, now=new Date(), transport:typeof fetch=fetch, maxMonths=1) {
  const error=configError(env);if(error) throw Error(error);
  const saved=await history(env);const s=await settings(env,transport);
  const wallStart=Date.now();
  const candidates=closedMonths(now,s.notOlderThan);const failures:string[]=[];const inserted:string[]=[];
  for(const period of candidates.filter(period=>!saved.some(row=>row.period===period)).slice(0,maxMonths)) {
    try {
      // Releer el reloj: la retención avanza mientras se recuperan los meses.
      const oldest=now.getTime()+Date.now()-wallStart-s.notOlderThan*1000;
      const coverage=coveredMonth(period,oldest);if(!coverage.coveredDays) continue;
      if(Date.parse(coverage.end)-Date.parse(coverage.start)>s.maxDuration*1000) throw Error('Rango superior al límite Cloudflare');
      const report=await fetchReport(env,coverage,true,transport);const full=monthWindow(period);
      const result=await env.CONTACT_DB!.prepare(`INSERT INTO audience_months
        (period,query_version,timezone,start_utc,end_utc,covered_start_utc,covered_end_utc,covered_days,completeness,fetched_at,source,filter_json,sample_interval,estimated,report_json)
        VALUES (?,?,'America/Costa_Rica',?,?,?,?,?,?,?,'cloudflare_rum',?,?,?,?) ON CONFLICT(period,query_version) DO NOTHING`)
        .bind(period,VERSION,full.start,full.end,coverage.start,coverage.end,coverage.coveredDays,coverage.completeness,new Date().toISOString(),JSON.stringify({bot:0,hosts:HOSTS,siteTag:env.CF_ANALYTICS_SITE_TAG}),report.sampleInterval,Number(report.estimated),JSON.stringify(report)).run();
      if(result.meta.changes) inserted.push(period);
    } catch {failures.push(period);}
  }
  return {inserted,failures};
}
// Cloudflare pasa ExecutionContext como tercer argumento; nunca es un transport.
export async function scheduled(controller: Pick<ScheduledController,'scheduledTime'>, env:AudienceEnv) {
  return runArchiveSchedule(controller,env);
}
export async function runArchiveSchedule(controller: Pick<ScheduledController,'scheduledTime'>, env:AudienceEnv, transport:typeof fetch=fetch) {
  const now=new Date(controller.scheduledTime);
  // Fallos independientes: 0006 ausente nunca impide continuar con 0005.
  try {console.log(JSON.stringify({event:'audience_days_archive',...await archiveRecentDays(env,now,transport)}));}
  catch {console.warn(JSON.stringify({event:'audience_days_archive_unavailable',reason:'Comprobar migración 0006, Cloudflare y bindings.'}));}
  try {console.log(JSON.stringify({event:'audience_archive',...await archive(env,now,transport)}));}
  catch(error) {console.warn(JSON.stringify({event:'audience_archive_unavailable',reason:error instanceof Error&&error.message.startsWith('No configurado')?error.message:'No disponible: comprobar migración 0005, Cloudflare y bindings.'}));}
}
export async function loadAudience(env:AudienceEnv, now=new Date(), transport:typeof fetch=fetch) {
  const error=configError(env);
  let months:Month[]=[];let historyError:string|null=null;let s:Settings|null=null;let settingsError:string|null=null;
  try {months=await history(env);} catch {historyError='No disponible: histórico D1. Revisa CONTACT_DB y migración 0005.';}
  if(!error) {try{s=await liveSettings(env,now,transport);} catch {settingsError='No disponible: no se pudo leer la retención de Cloudflare.';}}
  const w7=windows(7,now),w30=windows(30,now);
  const period=localDay(now).slice(0,7);const provisionalWindow={start:monthWindow(period).start,end:midnight(localDay(now))};
  const ranges=[w7.current,w7.previous,w30.current,w30.previous,provisionalWindow];
  const results=await Promise.all(ranges.map((range,i)=>s&&(Date.parse(range.start)<now.getTime()-s.notOlderThan*1000||Date.parse(range.end)-Date.parse(range.start)>s.maxDuration*1000) ? Promise.resolve({data:null,error:'No disponible: la retención o el límite de Cloudflare no cubre todo el periodo.',fetchedAt:null,stale:false}) : live(env,range,i===2,now,transport)));
  return {error,historyError,settingsError,months,pending:s?closedMonths(now,s.notOlderThan).filter(p=>!months.some(m=>m.period===p)):null,w7,w30,days7:results[0],previous7:results[1],days30:results[2],previous30:results[3],provisional:results[4],period};
}

// Serie independiente del histórico mensual: no cambiar VERSION/rum-v1.
export const DAY_QUERY_VERSION = 'rum-days-v1';
export const RECENT_RETRY_DAYS = 7;
export const DAY_BATCH_SIZE = 7;
export const MAX_DAY_REQUESTS = 32;
const DAY_MS = 86400000;
const HOUR_MS = 3600000;
export type DayStatus = {day:string; status:'archivado'|'pendiente'|'fallido'|'fuera de retención'; reason?:string};
export type DayValue = {day:string; visits:number; pageviews:number; sampleInterval:number};
type Totals = {count:number; sum:{visits:number}};
type Hour = Totals & {dimensions:{datetimeHour:string}};
type DailyTotal = Totals & {avg:{sampleInterval:number}};
type Budget = {requests:number};
class BudgetExhausted extends Error {}
class Truncated extends Error {}

export function dayWindow(day:string):Window {
  const start=midnight(day);
  return {start,end:new Date(Date.parse(start)+DAY_MS).toISOString()};
}
export function dayRange(from:string,to:string):string[] {
  const valid=(day:string)=>/^\d{4}-\d{2}-\d{2}$/.test(day)&&Number.isFinite(Date.parse(day))&&new Date(day).toISOString().slice(0,10)===day;
  if(!valid(from)||!valid(to)||from>to||(Date.parse(to)-Date.parse(from))/DAY_MS>=366) throw Error('Rango local inválido (máximo 366 días, extremos incluidos).');
  const days:string[]=[];
  for(let t=Date.parse(from);t<=Date.parse(to);t+=DAY_MS) days.push(new Date(t).toISOString().slice(0,10));
  return days;
}
export function recentDays(now:Date):string[] {
  // Últimos siete días ELEGIBLES, no siete días contando hoy y el margen.
  const lastEnd=Date.parse(midnight(localDay(new Date(now.getTime()-ARCHIVE_CLOSE_DELAY_HOURS*HOUR_MS))));
  return Array.from({length:RECENT_RETRY_DAYS},(_,i)=>localDay(new Date(lastEnd-(RECENT_RETRY_DAYS-i)*DAY_MS)));
}
function validTotal(row:Totals|undefined):row is Totals {
  return !!row&&[row.count,row.sum?.visits].every(n=>typeof n==='number'&&Number.isFinite(n)&&n>=0);
}
function sameTotal(hours:Totals[],total:Totals) {
  return hours.reduce((sum,row)=>sum+row.count,0)===total.count&&hours.reduce((sum,row)=>sum+row.sum.visits,0)===total.sum.visits;
}

/** Una petición: horas, total del lote y sampleInterval real de cada día local.
 * No se usa el promedio de las horas ni el muestreo del lote como señal diaria.
 */
export function daysQuery(env:AudienceEnv,window:Window,days:string[],limit:number) {
  const variables:Record<string,unknown>={account:env.CF_ANALYTICS_ACCOUNT_ID,filter:filter(env,window),limit};
  const declarations=days.map((_,i)=>`$d${i}:AccountRumPageloadEventsAdaptiveGroupsFilter_InputObject!`).join(',');
  const daily=days.map((day,i)=>{
    variables[`d${i}`]=filter(env,dayWindow(day));
    return `d${i}:rumPageloadEventsAdaptiveGroups(limit:1,filter:$d${i}) {count sum {visits} avg {sampleInterval}}`;
  }).join('\n');
  return {query:`query($account:string!,$filter:AccountRumPageloadEventsAdaptiveGroupsFilter_InputObject!,$limit:uint32!${declarations?','+declarations:''}) {viewer {accounts(filter:{accountTag:$account}) {
    hours:rumPageloadEventsAdaptiveGroups(limit:$limit,filter:$filter,orderBy:[datetimeHour_ASC]) {count sum {visits} dimensions {datetimeHour}}
    total:rumPageloadEventsAdaptiveGroups(limit:1,filter:$filter) {count sum {visits}}
    ${daily}
  }}}`,variables};
}
async function queryHours(env:AudienceEnv,window:Window,days:string[],s:Settings,budget:Budget,transport:typeof fetch) {
  if(budget.requests>=MAX_DAY_REQUESTS) throw new BudgetExhausted();
  if(typeof s.maxPageSize!=='number'||!Number.isInteger(s.maxPageSize)||s.maxPageSize<1) throw Error('maxPageSize no disponible.');
  if(Date.parse(window.end)-Date.parse(window.start)>s.maxDuration*1000) throw Error('Rango superior a maxDuration.');
  const limit=Math.min(s.maxPageSize,1000);
  const request=daysQuery(env,window,days,limit);
  budget.requests++;
  const a=await graphql(env,request.query,request.variables,transport);
  const hours=a.hours as Hour[];
  const total=(a.total as Totals[]|undefined)?.[0];
  if(!Array.isArray(hours)||!validTotal(total)) throw Error('Agregado vacío o inválido.');
  const seen=new Set<number>();
  for(const row of hours) {
    const t=Date.parse(row.dimensions?.datetimeHour);
    if(!validTotal(row)||!Number.isFinite(t)||t%HOUR_MS!==0||t<Date.parse(window.start)||t>=Date.parse(window.end)||seen.has(t)) throw Error('Hora inválida o duplicada.');
    seen.add(t);
  }
  // La igualdad no demuestra que un resultado al límite esté completo.
  const truncated=hours.length>=limit;
  if(!truncated&&!sameTotal(hours,total)) throw Error('Las horas no coinciden con el total del lote.');
  return {hours,total,truncated,daily:days.map((_,i)=>(a[`d${i}`] as DailyTotal[]|undefined)?.[0])};
}
async function completeHours(env:AudienceEnv,window:Window,s:Settings,budget:Budget,transport:typeof fetch):Promise<Hour[]> {
  const r=await queryHours(env,window,[],s,budget,transport);
  if(!r.truncated) return r.hours;
  const start=Date.parse(window.start),end=Date.parse(window.end);
  if(end-start<=HOUR_MS) throw Error('Truncamiento irreducible de una hora.');
  const middle=new Date(start+Math.floor((end-start)/HOUR_MS/2)*HOUR_MS).toISOString();
  const left=await completeHours(env,{start:window.start,end:middle},s,budget,transport);
  const right=await completeHours(env,{start:middle,end:window.end},s,budget,transport);
  const hours=[...left,...right];
  if(!sameTotal(hours,r.total)) throw Error('Subrangos no coinciden con el total del lote.');
  return hours;
}

/** Consulta común para archivo ordinario y recuperación. Nada se escribe aquí. */
export async function fetchDays(env:AudienceEnv,days:string[],s:Settings,budget:Budget,transport:typeof fetch=fetch) {
  const window={start:dayWindow(days[0]).start,end:dayWindow(days.at(-1)!).end};
  const r=await queryHours(env,window,days,s,budget,transport);
  let hours=r.hours;
  if(r.truncated) {
    if(days.length>1) throw new Truncated();
    // Mantener el sampleInterval del agregado diario original al dividir horas.
    const middle=new Date(Date.parse(window.start)+12*HOUR_MS).toISOString();
    hours=[...await completeHours(env,{start:window.start,end:middle},s,budget,transport),...await completeHours(env,{start:middle,end:window.end},s,budget,transport)];
    if(!sameTotal(hours,r.total)) throw Error('Subrangos no coinciden con el total diario.');
  }
  const values:DayValue[]=[],empty:string[]=[];
  for(const [i,day] of days.entries()) {
    const rows=hours.filter(row=>localDay(new Date(row.dimensions.datetimeHour))===day);
    const daily=r.daily[i];
    if(!rows.length&&!daily) {empty.push(day);continue;}
    if(!validTotal(daily)||!Number.isFinite(daily.avg?.sampleInterval)||daily.avg.sampleInterval<1||!sameTotal(rows,daily)) throw Error('Agregado diario inválido o incoherente.');
    if(!rows.length||daily.count===0) {empty.push(day);continue;}
    values.push({day,visits:daily.sum.visits,pageviews:daily.count,sampleInterval:daily.avg.sampleInterval});
  }
  return {values,empty};
}

/** D1 batch es transaccional: una interrupción no deja medio lote guardado. */
export async function writeDays(env:AudienceEnv,values:DayValue[],fetchedAt:string) {
  if(!env.CONTACT_DB) throw Error('No configurado: falta CONTACT_DB.');
  if(!values.length) return;
  await env.CONTACT_DB.batch(values.map(value=>{
    const w=dayWindow(value.day);
    return env.CONTACT_DB!.prepare(`INSERT INTO audience_days
      (day,query_version,timezone,start_utc,end_utc,visits,pageviews,sample_interval,estimated,fetched_at,source,filter_json)
      VALUES (?,?,'America/Costa_Rica',?,?,?,?,?,?,?,'cloudflare_rum',?)
      ON CONFLICT(day,query_version) DO NOTHING`)
      .bind(value.day,DAY_QUERY_VERSION,w.start,w.end,value.visits,value.pageviews,value.sampleInterval,Number(value.sampleInterval>1),fetchedAt,JSON.stringify({bot:0,hosts:HOSTS,siteTag:env.CF_ANALYTICS_SITE_TAG}));
  }));
}

async function runDays(env:AudienceEnv,days:string[],now:Date,transport:typeof fetch) {
  const wallStart=Date.now();
  if(!env.CONTACT_DB) throw Error('No configurado: falta CONTACT_DB.');
  // Leer solo el rango solicitado, nunca una cola histórica para el cron.
  const saved=await env.CONTACT_DB.prepare('SELECT day FROM audience_days WHERE query_version = ? AND day >= ? AND day <= ?').bind(DAY_QUERY_VERSION,days[0],days.at(-1)).all<{day:string}>();
  const existing=new Set(saved.results.map(row=>row.day));
  const coverage:DayStatus[]=days.map(day=>({day,status:existing.has(day)?'archivado':'pendiente'}));
  const pending=coverage.filter(row=>row.status==='pendiente');
  const budget:Budget={requests:0};
  if(!pending.length) return {coverage,requests:0};
  // El archivo diario no depende de KV; nunca toma datos cacheados.
  if(!env.CF_ANALYTICS_TOKEN||!env.CF_ANALYTICS_ACCOUNT_ID||!env.CF_ANALYTICS_SITE_TAG) throw Error('No configurado: Cloudflare Analytics.');
  const s=await settings(env,transport);
  if(typeof s.maxPageSize!=='number'||!Number.isInteger(s.maxPageSize)||s.maxPageSize<1) throw Error('maxPageSize no disponible.');
  const clock=()=>new Date(now.getTime()+Date.now()-wallStart);
  const eligible=(row:DayStatus)=>{
    const w=dayWindow(row.day);
    if(Date.parse(w.start)<clock().getTime()-s.notOlderThan*1000) {row.status='fuera de retención';return false;}
    if(!archiveEligible(w.end,now)) {row.reason='Margen de cierre pendiente.';return false;}
    return true;
  };
  const candidates=pending.filter(eligible);
  const batchSize=Math.min(DAY_BATCH_SIZE,Math.floor(s.maxDuration*1000/DAY_MS));
  if(batchSize<1) {
    for(const row of candidates) {row.status='fallido';row.reason='maxDuration no cubre un día entero.';}
    return {coverage,requests:budget.requests};
  }
  const process=async(rows:DayStatus[]):Promise<void>=>{
    if(!rows.length||budget.requests>=MAX_DAY_REQUESTS) return;
    // La retención puede avanzar durante una recuperación.
    const retained=rows.filter(eligible);
    if(retained.length!==rows.length) {for(const row of retained) await process([row]);return;}
    try {
      const result=await fetchDays(env,rows.map(row=>row.day),s,budget,transport);
      await writeDays(env,result.values,clock().toISOString());
      for(const row of rows) {
        row.status=result.empty.includes(row.day)?'fallido':'archivado';
        if(row.status==='fallido') row.reason='Día vacío; sigue pendiente de archivo.';
      }
    } catch(error) {
      if(error instanceof Truncated) {
        const middle=Math.floor(rows.length/2);
        await process(rows.slice(0,middle));await process(rows.slice(middle));
      } else if(!(error instanceof BudgetExhausted)) {
        for(const row of rows) {row.status='fallido';row.reason='Lote no guardado: consulta, coherencia o escritura falló.';}
      }
    }
  };
  // No consultar días ya guardados, ni siquiera dentro de un lote con huecos.
  for(let i=0;i<candidates.length;) {
    const batch=[candidates[i++]];
    while(i<candidates.length&&batch.length<batchSize&&dayWindow(batch.at(-1)!.day).end===dayWindow(candidates[i].day).start) batch.push(candidates[i++]);
    await process(batch);
  }
  return {coverage,requests:budget.requests};
}
export async function archiveRecentDays(env:AudienceEnv,now=new Date(),transport:typeof fetch=fetch) {
  return runDays(env,recentDays(now),now,transport);
}
/** Extremos locales incluidos. Entrada explícita; scheduled nunca la llama. */
export async function recoverDays(env:AudienceEnv,from:string,to:string,now=new Date(),transport:typeof fetch=fetch) {
  return runDays(env,dayRange(from,to),now,transport);
}
