/** Solo lectura. Salida con cifras privadas: guardar fuera del repositorio. */
import { readFileSync } from 'node:fs';
import { graphql, localDay, type AudienceEnv } from '../../src/lib/admin/audience';
import { dayRange, dayWindow, daysQuery } from '../../src/lib/admin/audience-archive';

const day=process.argv[2];
if(!day) throw Error('Uso: npx tsx scripts/admin/probe-rum-latency.ts AAAA-MM-DD');
dayRange(day,day);
const config=JSON.parse(readFileSync('wrangler.jsonc','utf8'));
const env:AudienceEnv={
  CF_ANALYTICS_TOKEN:process.env.CF_ANALYTICS_TOKEN,
  CF_ANALYTICS_ACCOUNT_ID:config.vars.CF_ANALYTICS_ACCOUNT_ID,
  CF_ANALYTICS_SITE_TAG:config.vars.CF_ANALYTICS_SITE_TAG,
};
if(!env.CF_ANALYTICS_TOKEN) throw Error('Falta CF_ANALYTICS_TOKEN en el entorno. No escribirlo en argumentos.');
const window=dayWindow(day),observedAt=new Date();
if(Date.parse(window.end)>observedAt.getTime()) throw Error('El día aún está abierto.');
const request=daysQuery(env,window,[day],1000);
const a=await graphql(env,request.query,request.variables);
const hours=a.hours as {count:number;sum:{visits:number};dimensions:{datetimeHour:string}}[];
const total=(a.total as {count:number;sum:{visits:number}}[])[0];
const daily=(a.d0 as {avg:{sampleInterval:number}}[])[0];
console.log(JSON.stringify({day,window,observedAt:observedAt.toISOString(),hoursAfterClose:(observedAt.getTime()-Date.parse(window.end))/3600000,localObservationDay:localDay(observedAt),sampleInterval:daily?.avg.sampleInterval??null,visits:total?.sum.visits??null,pageviews:total?.count??null,coherent:!!total&&hours.reduce((n,r)=>n+r.count,0)===total.count&&hours.reduce((n,r)=>n+r.sum.visits,0)===total.sum.visits,hours},null,2));
