import { googleDomains } from './google-domains';
export const VERSION = 'rum-v1';
export const HOSTS = ['cuidatuperroviejo.com', 'www.cuidatuperroviejo.com'];
const DAY = 86400000;
export interface AudienceEnv {
  CONTACT_DB?: D1Database; CONTACT_KV?: KVNamespace; ASSETS?: Fetcher;
  CF_ANALYTICS_TOKEN?: string; CF_ANALYTICS_ACCOUNT_ID?: string; CF_ANALYTICS_SITE_TAG?: string;
}
export type Window = { start: string; end: string };
export type Group = { label: string; value: number };
type Row = { count: number; sum: { visits: number }; avg: { sampleInterval: number }; dimensions?: Record<string, string> };
export type Report = { visits: number; pageviews: number; sampleInterval: number; estimated: boolean; pages: Group[]; countries: Group[]; referrals: ReturnType<typeof referralGroups> };
export type Settings = { enabled: boolean; notOlderThan: number; maxDuration: number };
export function localDay(now: Date) { return new Date(now.getTime() - 6 * 3600000).toISOString().slice(0,10); }
export function midnight(day: string) { return `${day}T06:00:00.000Z`; }
export function windows(days: number, now = new Date()) {
  const end = Date.parse(midnight(localDay(now)));
  return { current: {start:new Date(end-days*DAY).toISOString(),end:new Date(end).toISOString()}, previous:{start:new Date(end-2*days*DAY).toISOString(),end:new Date(end-days*DAY).toISOString()} };
}
export function monthWindow(period: string): Window {
  const [y,m] = period.split('-').map(Number);
  return {start:midnight(`${period}-01`),end:new Date(Date.UTC(y,m,1,6)).toISOString()};
}
export function coveredMonth(period: string, oldest: number) {
  const full = monthWindow(period);
  // Solo días locales enteros. El día cortado por la retención no se inventa.
  const first = Date.parse(midnight(localDay(new Date(oldest))));
  const start = Math.max(Date.parse(full.start), first < oldest ? first+DAY : first);
  return {...full, start:new Date(Math.min(start,Date.parse(full.end))).toISOString(), completeness:start <= Date.parse(full.start) ? 'completo' : 'parcial', coveredDays:Math.max(0,(Date.parse(full.end)-start)/DAY)};
}
export function closedMonths(now: Date, retention: number) {
  const current = localDay(now).slice(0,7); const oldest=now.getTime()-retention*1000;
  let cursor=localDay(new Date(oldest)).slice(0,7); const months: string[]=[];
  while(cursor<current) { if(coveredMonth(cursor,oldest).coveredDays>0) months.push(cursor); cursor=monthWindow(cursor).end.slice(0,7); }
  return months;
}
export function referrerLabel(raw: string) {
  const host=raw.trim().toLowerCase().replace(/\.$/,'');
  if(!host) return 'Directo o sin referente';
  if([...googleDomains].some(domain=>host===domain||host.endsWith(`.${domain}`))) return 'Google';
  return host;
}
export function referralGroups(total: number, rows: Group[], tail = 0, sampleInterval = 1) {
  const map=new Map<string,number>();
  for(const row of rows) {const key=referrerLabel(row.label);map.set(key,(map.get(key)??0)+row.value);}
  const groups=[...map].map(([label,value])=>({label,value})).sort((a,b)=>b.value-a.value);
  const returnedSum=rows.reduce((n,r)=>n+r.value,0);
  if(tail>0) groups.push({label:'Otros',value:tail});
  const difference=total-returnedSum-tail;
  const pct=total ? (returnedSum+tail)/total*100 : null;
  return {groups,returnedSum,tail,difference,differencePercent:total?difference/total*100:null,note:difference===0?null:`Los grupos suman un ${pct?.toLocaleString('es',{maximumFractionDigits:1}) ?? '—'} % del total; ${sampleInterval>1?'muestreo de Cloudflare':'discrepancia de agregación o redondeo de Cloudflare'}. La diferencia no se reparte.`};
}
// Solo presentación: no modifica los agregados ni el residual de Cloudflare.
export function displayReferralGroups(referrals: { groups: Group[]; tail: number }): Group[] {
  const sources = referrals.groups.filter(group => group.value !== 0 && group.label !== 'Otros');
  const others = referrals.tail + sources.slice(10).reduce((sum, group) => sum + group.value, 0);
  return [...sources.slice(0, 10), ...(others !== 0 ? [{ label: 'Otros', value: others }] : [])];
}
export function growth(current:number, previous:number) { return previous===0 ? (current===0?'Sin cambio':'Sin base de comparación') : `${((current-previous)/previous*100).toLocaleString('es',{maximumFractionDigits:1,signDisplay:'always'})} %`; }
export function configError(env: AudienceEnv) {
  const missing=[!env.CF_ANALYTICS_TOKEN&&'secret CF_ANALYTICS_TOKEN',!env.CF_ANALYTICS_ACCOUNT_ID&&'CF_ANALYTICS_ACCOUNT_ID',!env.CF_ANALYTICS_SITE_TAG&&'CF_ANALYTICS_SITE_TAG',!env.CONTACT_KV&&'CONTACT_KV'].filter(Boolean);
  return missing.length?`No configurado: falta ${missing.join(', ')}.`:null;
}
export async function graphql(env: AudienceEnv, query:string, variables:Record<string,unknown>={}, transport:typeof fetch=fetch) {
  const response=await transport('https://api.cloudflare.com/client/v4/graphql',{method:'POST',headers:{Authorization:`Bearer ${env.CF_ANALYTICS_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify({query,variables}),signal:AbortSignal.timeout(12000)});
  if(!response.ok) throw Error('Cloudflare no disponible (permisos, límite o conexión).');
  const result=await response.json() as {data?:{viewer:{accounts:Record<string,unknown>[]}};errors?:unknown[]};
  if(result.errors?.length||!result.data?.viewer.accounts[0]) throw Error('Cloudflare no devolvió datos válidos.');
  return result.data.viewer.accounts[0];
}
export async function settings(env:AudienceEnv, transport:typeof fetch=fetch) {
  const a=await graphql(env,'query($account: string!) {viewer {accounts(filter:{accountTag:$account}) {settings {rumPageloadEventsAdaptiveGroups {enabled notOlderThan maxDuration}}}}}',{account:env.CF_ANALYTICS_ACCOUNT_ID},transport);
  const s=(a.settings as {rumPageloadEventsAdaptiveGroups:Settings}).rumPageloadEventsAdaptiveGroups;
  if(!s?.enabled||!(s.notOlderThan>0)||!(s.maxDuration>0)) throw Error('RUM no disponible o sin retención consultable.');
  return s;
}
export function reportQuery(tops=true) {
  const fields='count sum {visits} avg {sampleInterval}';
  return `query($account:string!, $filter:AccountRumPageloadEventsAdaptiveGroupsFilter_InputObject!) {viewer {accounts(filter:{accountTag:$account}) {
    total:rumPageloadEventsAdaptiveGroups(limit:1,filter:$filter) {${fields}}
    ${tops?`pages:rumPageloadEventsAdaptiveGroups(limit:10,filter:$filter,orderBy:[count_DESC]) {${fields} dimensions {requestPath}}
    countries:rumPageloadEventsAdaptiveGroups(limit:10,filter:$filter,orderBy:[count_DESC]) {${fields} dimensions {countryName}}
    refs:rumPageloadEventsAdaptiveGroups(limit:1000,filter:$filter,orderBy:[sum_visits_DESC]) {${fields} dimensions {refererHost}}`:''}
  }}}`;
}
export function filter(env:AudienceEnv, window:Window) {return {siteTag:env.CF_ANALYTICS_SITE_TAG,bot:0,requestHost_in:HOSTS,datetime_geq:window.start,datetime_lt:window.end};}
export async function fetchReport(env:AudienceEnv, window:Window, tops=true, transport:typeof fetch=fetch):Promise<Report> {
  if(window.start>=window.end) throw Error('No hay días cerrados en este periodo.');
  const a=await graphql(env,reportQuery(tops),{account:env.CF_ANALYTICS_ACCOUNT_ID,filter:filter(env,window)},transport);
  const t=(a.total as Row[])[0];
  if(!t||![t.count,t.sum?.visits,t.avg?.sampleInterval].every(n=>typeof n==='number'&&Number.isFinite(n)&&n>=0)) throw Error('Cloudflare devolvió un agregado vacío o inválido.');
  const refs=(a.refs??[]) as Row[];let tail=0,tailSample=1;
  if(refs.length===1000) {
    const rest=await graphql(env,reportQuery(false),{account:env.CF_ANALYTICS_ACCOUNT_ID,filter:{...filter(env,window),refererHost_notin:refs.map(r=>r.dimensions!.refererHost)}},transport);
    const row=(rest.total as Row[])[0];if(!row) throw Error('No se pudo comprobar Otros.');tail=row.sum.visits;tailSample=row.avg.sampleInterval;
  }
  const interval=Math.max(t.avg.sampleInterval,tailSample,...refs.map(r=>r.avg.sampleInterval),...((a.pages??[]) as Row[]).map(r=>r.avg.sampleInterval),...((a.countries??[]) as Row[]).map(r=>r.avg.sampleInterval));
  return {visits:t.sum.visits,pageviews:t.count,sampleInterval:interval,estimated:interval>1,pages:((a.pages??[]) as Row[]).map(r=>({label:r.dimensions!.requestPath,value:r.count})),countries:((a.countries??[]) as Row[]).map(r=>({label:r.dimensions!.countryName||'Sin país',value:r.count})),referrals:referralGroups(t.sum.visits,refs.map(r=>({label:r.dimensions!.refererHost,value:r.sum.visits})),tail,interval)};
}
export function liveCacheKey(env:AudienceEnv, window:Window, tops:boolean) {
  return `admin:audience:${VERSION}:${env.CF_ANALYTICS_ACCOUNT_ID}:${env.CF_ANALYTICS_SITE_TAG}:${HOSTS.join(',')}:bot0:${window.start}:${window.end}:${tops}`;
}
export function settingsCacheKey(env:AudienceEnv) {return `admin:audience:${VERSION}:settings:${env.CF_ANALYTICS_ACCOUNT_ID}:${env.CF_ANALYTICS_SITE_TAG}`;}
export async function liveSettings(env:AudienceEnv, now:Date, transport:typeof fetch=fetch) {
  const key=settingsCacheKey(env);
  const cached=await env.CONTACT_KV!.get<{value:Settings;fetchedAt:string}>(key,'json');
  if(cached&&now.getTime()-Date.parse(cached.fetchedAt)<900000) return cached.value;
  const value=await settings(env,transport);
  await env.CONTACT_KV!.put(key,JSON.stringify({value,fetchedAt:now.toISOString()}),{expirationTtl:900});
  return value;
}
export type Live = {data:Report|null;error:string|null;fetchedAt:string|null;stale:boolean};
export async function live(env:AudienceEnv, window:Window, tops=true, now=new Date(), transport:typeof fetch=fetch):Promise<Live> {
  const error=configError(env);if(error) return {data:null,error,fetchedAt:null,stale:false};
  const key=liveCacheKey(env,window,tops);
  let cached:{data:Report;fetchedAt:string}|null=null;
  try {cached=await env.CONTACT_KV!.get(key,'json');} catch {return {data:null,error:'No disponible: falló la caché CONTACT_KV.',fetchedAt:null,stale:false};}
  if(cached&&now.getTime()-Date.parse(cached.fetchedAt)<900000) return {...cached,error:null,stale:false};
  if(cached&&now.getTime()-Date.parse(cached.fetchedAt)>86400000) cached=null;
  try {
    const data=await fetchReport(env,window,tops,transport);const fetchedAt=now.toISOString();
    await env.CONTACT_KV!.put(key,JSON.stringify({data,fetchedAt}),{expirationTtl:86400});
    return {data,fetchedAt,error:null,stale:false};
  } catch {
    return {data:cached?.data??null,fetchedAt:cached?.fetchedAt??null,stale:!!cached,error:'No disponible: Cloudflare o caché falló. Revisa permisos y configuración.'};
  }
}
