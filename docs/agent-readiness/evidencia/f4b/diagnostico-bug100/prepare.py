from pathlib import Path
import shutil,json,hashlib,difflib
root=Path('/workspace/f4b-originales-privados/bug100-diagnostico');repo=Path('/workspace/ctpv-f4b-desarrollo')
shutil.copytree(repo/'dist/server',root/'app/server')
e=root/'app/server/entry.mjs';s=e.read_text();(root/'entry-original.mjs').write_text(s)
old='''\t\t\tsize += value.byteLength;
\t\t\tif (size > 32768) {
\t\t\t\tawait reader.cancel().catch(() => {});
\t\t\t\tthrow new RangeError("BODY_LIMIT");
\t\t\t}'''
new='''\t\t\tsize += value.byteLength;
            console.log(JSON.stringify({diag:"read",id:request.headers.get("X-Diag-Id"),size,chunk:value.byteLength}));
\t\t\tif (size > 32768) {
                console.log(JSON.stringify({diag:"cancel-start",id:request.headers.get("X-Diag-Id"),size}));
\t\t\t\tawait reader.cancel().then(()=>console.log(JSON.stringify({diag:"cancel-settled",id:request.headers.get("X-Diag-Id")}))).catch(error=>console.log(JSON.stringify({diag:"cancel-rejected",id:request.headers.get("X-Diag-Id"),error:String(error)})));
\t\t\t\tthrow new RangeError("BODY_LIMIT");
\t\t\t}'''
assert s.count(old)==1;s=s.replace(old,new)
old='export { worker_entry_default as default };'
new='''const diagWorker = {async fetch(request,env,ctx){
 console.log(JSON.stringify({diag:"ingress",id:request.headers.get("X-Diag-Id"),headers:Object.fromEntries(request.headers)}));
 try {const response=await worker_entry_default.fetch(request,env,ctx);console.log(JSON.stringify({diag:"decision",id:request.headers.get("X-Diag-Id"),status:response.status}));return response;}
 catch(error){console.log(JSON.stringify({diag:"exception",id:request.headers.get("X-Diag-Id"),error:String(error)}));throw error;}
}};
export {diagWorker as default};'''
assert s.count(old)==1;s=s.replace(old,new);e.write_text(s)
(root/'instrumentation.diff').write_text(''.join(difflib.unified_diff((root/'entry-original.mjs').read_text().splitlines(True),s.splitlines(True),fromfile='entry-original',tofile='entry-diagnostic')))
cfg=json.loads((repo/'dist/server/wrangler.json').read_text());cfg['main']=str(e);cfg['assets']['directory']=str(repo/'dist/client');cfg['name']='f4b-bug100-app-local';cfg['d1_databases'][0]['migrations_dir']=str(repo/'migrations');(root/'app/config.json').write_text(json.dumps(cfg,indent=2))
(root/'minimum-config.json').write_text(json.dumps({'name':'f4b-bug100-minimum-local','main':str(root/'minimum.mjs'),'compatibility_date':'2026-05-23','compatibility_flags':['global_fetch_strictly_public','nodejs_compat']},indent=2))
(root/'provenance.json').write_text(json.dumps({'product':'192dcdd52d2790652ef2dbcb6d23a0f5006ade43','originalEntrySha256':hashlib.sha256((root/'entry-original.mjs').read_bytes()).hexdigest(),'diagnosticEntrySha256':hashlib.sha256(e.read_bytes()).hexdigest(),'wrangler':'4.128.0','miniflare':'5.20260831.0-alpha','workerd':'1.20260831.1','node':'24.19.0','undici':'7.29.0','instrumentation':'logging only; private copy; original dist unchanged'},indent=2))
