const log=(diag,request,fields={})=>console.log(JSON.stringify({diag,id:request.headers.get('X-Diag-Id'),...fields}));
const error=status=>Response.json({jsonrpc:'2.0',id:null,error:{code:-32600,message:'Invalid request.'}},{status});
export default {async fetch(request){
 log('ingress',request,{headers:Object.fromEntries(request.headers)});
 const decision=response=>{log('decision',request,{status:response.status});return response;};
 if(request.headers.get('Content-Type')!=='application/json') return decision(error(415));
 if(request.headers.get('Accept')!=='application/json, text/event-stream') return decision(error(406));
 const length=request.headers.get('Content-Length');
 if(length!==null&&/^[0-9]+$/.test(length)&&Number(length)>32768)return decision(error(413));
 const reader=request.body?.getReader();if(!reader)return decision(error(400));
 let size=0;const chunks=[];const controller=new AbortController();
 const cancel=()=>{void reader.cancel().catch(()=>{});};controller.signal.addEventListener('abort',cancel,{once:true});
 const timer=setTimeout(()=>controller.abort(),10000);
 try{
  while(true){controller.signal.throwIfAborted();const {done,value}=await reader.read();controller.signal.throwIfAborted();if(done)break;size+=value.byteLength;log('read',request,{size,chunk:value.byteLength});
   if(size>32768){log('cancel-start',request,{size});await reader.cancel().then(()=>log('cancel-settled',request)).catch(e=>log('cancel-rejected',request,{error:String(e)}));throw new RangeError('BODY_LIMIT');}chunks.push(value);
  }
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  let body;try{body=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}catch{return decision(error(400));}
  if(Array.isArray(body))return decision(error(400));
  return decision(Response.json({jsonrpc:'2.0',id:body.id,result:{}},{status:200}));
 }catch(e){log('exception',request,{error:String(e)});return decision(error(e instanceof RangeError?413:500));}
 finally{clearTimeout(timer);controller.signal.removeEventListener('abort',cancel);reader.releaseLock();}
}};
