import { VERSION, HOSTS, windows, liveSettings, configError, settings, closedMonths, coveredMonth, monthWindow, localDay, midnight, live, fetchReport, type AudienceEnv, type Report, type Settings } from './audience';
export type Month = {period:string; completeness:string; covered_days:number; covered_start_utc:string; covered_end_utc:string; fetched_at:string; report:Report};
export async function history(env:AudienceEnv):Promise<Month[]> {
  if(!env.CONTACT_DB) throw Error('No configurado: falta CONTACT_DB.');
  const rows=await env.CONTACT_DB.prepare('SELECT * FROM audience_months WHERE query_version = ? ORDER BY period').bind(VERSION).all<Omit<Month,'report'> & {report_json:string}>();
  return rows.results.map(row=>({...row,report:JSON.parse(row.report_json)}));
}
export async function archive(env:AudienceEnv, now=new Date(), transport:typeof fetch=fetch) {
  const error=configError(env);if(error) throw Error(error);
  const saved=await history(env);const s=await settings(env,transport);
  const wallStart=Date.now();
  const candidates=closedMonths(now,s.notOlderThan);const failures:string[]=[];const inserted:string[]=[];
  for(const period of candidates) {
    if(saved.some(row=>row.period===period)) continue;
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
export async function scheduled(controller: Pick<ScheduledController,'scheduledTime'>, env:AudienceEnv) {
  try {console.log(JSON.stringify({event:'audience_archive',...await archive(env,new Date(controller.scheduledTime))}));}
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
