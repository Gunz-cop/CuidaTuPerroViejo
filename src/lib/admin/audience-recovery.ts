import { requireAdmin, privateHeaders } from './access';
import { timingSafeEqual } from '../contact/security';
import { recoverDays, dayRange, DAY_BATCH_SIZE } from './audience-archive';
import type { AudienceEnv } from './audience';

type RecoveryEnv = AudienceEnv & Partial<Pick<Cloudflare.Env,
  'ADMIN_LIMIT'|'CONTACT_ADMIN_USER'|'CONTACT_ADMIN_PASSWORD'|'CONTACT_IP_HASH_SALT'|'AUDIENCE_RECOVERY_TOKEN'>>;
const reply=(value:unknown,status=200)=>Response.json(value,{status,headers:privateHeaders});

/** Sin secret independiente no existe vía de ejecución histórica HTTP. */
export async function handleRecovery(request:Request,env:RecoveryEnv,recover:typeof recoverDays=recoverDays) {
  const denied=await requireAdmin(request,env);
  if(denied) return denied;
  if(!env.AUDIENCE_RECOVERY_TOKEN) return reply({error:'Recuperación deshabilitada.'},503);
  if(!timingSafeEqual(request.headers.get('X-Audience-Recovery-Token')??'',env.AUDIENCE_RECOVERY_TOKEN)) return reply({error:'No autorizado.'},403);
  if(request.method!=='POST'||!request.headers.get('Content-Type')?.startsWith('application/json')) return reply({error:'Se requiere POST JSON.'},400);
  const origin=request.headers.get('Origin');
  if(origin&&origin!==new URL(request.url).origin) return reply({error:'Origen no autorizado.'},403);
  // No aceptar un cuerpo arbitrario en una ruta administrativa.
  const reader=request.body?.getReader();
  if(!reader) return reply({error:'Falta el cuerpo.'},400);
  let text='',size=0;
  const decoder=new TextDecoder();
  while(true) {
    const {value,done}=await reader.read();
    if(done) break;
    size+=value.byteLength;
    if(size>2048) {await reader.cancel();return reply({error:'Cuerpo demasiado grande.'},413);}
    text+=decoder.decode(value,{stream:true});
  }
  text+=decoder.decode();
  let from:string,to:string,reason:string;
  try {
    const body=JSON.parse(text);
    ({from,to,reason}=body);
    if(typeof from!=='string'||typeof to!=='string'||typeof reason!=='string'||!reason.trim()||reason.length>200||body.confirm!=='RECOVER_AUDIENCE_DAYS'||dayRange(from,to).length>DAY_BATCH_SIZE) throw Error('invalid');
  } catch {return reply({error:'Rango o confirmación inválidos; máximo siete días por petición.'},400);}
  const operation=crypto.randomUUID();
  console.log(JSON.stringify({event:'audience_days_recovery_started',operation,from,to,reason}));
  try {
    const result=await recover(env,from,to);
    console.log(JSON.stringify({event:'audience_days_recovery_finished',operation,...result}));
    return reply({operation,...result});
  } catch {
    console.warn(JSON.stringify({event:'audience_days_recovery_unavailable',operation}));
    return reply({operation,error:'Recuperación no disponible. Revisar bindings, migración y Cloudflare.'},503);
  }
}
