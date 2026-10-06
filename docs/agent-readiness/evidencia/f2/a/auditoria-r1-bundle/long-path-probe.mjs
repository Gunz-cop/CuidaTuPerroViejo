import {cp,mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {writeProjection,runProjectionCheck} from '/workspace/ctpv-f2a-audit-r1/scripts/agent-readiness/projection.mjs';
import {inventory} from '/workspace/ctpv-f2a-audit-r1/scripts/agent-readiness/inventory.mjs';
const repo='/workspace/ctpv-f2a-audit-r1';
const temp=await mkdtemp(join(repo,'tests/agent-readiness/.audit-long-path-'));
let report;
try{
 await cp(join(repo,'dist/client'),join(temp,'client'),{recursive:true});
 await rm(join(temp,'client/agent-content'),{recursive:true});
 const slug='f2-'+ 'a'.repeat(90),path='/salud-perros-mayores/'+slug,url='https://cuidatuperroviejo.com'+path;
 const catalogPath=join(temp,'client/api/assistant-catalog.json');
 const catalog=JSON.parse(await readFile(catalogPath,'utf8'));
 const source=catalog.find(x=>x.slug==='chequeo-geriatrico-canino');
 const title='Prueba concordante de longitud de ruta F2';
 const description='Documento sintético para verificar el límite de longitud de ruta antes de empaquetar.';
 catalog.push({...source,slug,href:path,title,description});await writeFile(catalogPath,JSON.stringify(catalog));
 const sitemapPath=join(temp,'client/sitemap-0.xml');
 const sitemap=await readFile(sitemapPath,'utf8');await writeFile(sitemapPath,sitemap.replace('</urlset>',`<url><loc>${url}</loc></url></urlset>`));
 let html=await readFile(join(temp,'client/salud-perros-mayores/chequeo-geriatrico-canino.html'),'utf8');
 html=html.replaceAll('https://cuidatuperroviejo.com/salud-perros-mayores/chequeo-geriatrico-canino',url).replaceAll(source.title,title).replaceAll(source.description,description);
 await writeFile(join(temp,'client'+path+'.html'),html);
 const invCode=await inventory(temp,join(temp,'inventory'));
 const result=await writeProjection(temp);
 const checkCode=await runProjectionCheck(['check','--build-dir',temp]);
 report={canonicalPath:path,canonicalPathLength:path.length,documentIdLength:('article--'+slug).length,inventoryExit:invCode,documents:result.index.documents.length,projectionAccepted:true,checkExit:checkCode};
}catch(e){report={error:e.message,projectionAccepted:false}}finally{await rm(temp,{recursive:true,force:true})}
await writeFile('/workspace/ctpv-sdd-correcciones/f2a-auditoria-r1-evidencia/long-path-probe.json',JSON.stringify(report,null,2)+'\n');console.log(report);
