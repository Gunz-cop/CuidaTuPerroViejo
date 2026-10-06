import {readFile,writeFile} from 'node:fs/promises';
import {parse} from '/workspace/ctpv-f2a-audit-r1/node_modules/parse5/dist/index.js';
import {fromMarkdown} from '/workspace/ctpv-f2a-audit-r1/node_modules/mdast-util-from-markdown/index.js';
const base='/workspace/ctpv-f2a-audit-r1/dist/client';
const index=JSON.parse(await readFile(base+'/agent-content/v1/index.json','utf8'));
const attr=n=>Object.fromEntries((n.attrs??[]).map(a=>[a.name,a.value]));
const cls=(n,...c)=>c.every(x=>(attr(n).class??'').split(/\s+/).includes(x));
const walk=(n,f)=>{f(n);for(const c of n.childNodes??n.children??[])walk(c,f)};
const find=(n,f)=>{const a=[];walk(n,x=>{if(f(x))a.push(x)});return a};
const excluded=new Set(['nav','script','style','noscript','iframe','template','svg','form','button','input','select','textarea','progress']);
const skip=n=>excluded.has(n.tagName)||attr(n)['aria-hidden']==='true'||attr(n).role==='progressbar'||cls(n,'back-btn')||(n.tagName==='div'&&cls(n,'ad-slot')&&'data-ad-pending' in attr(n));
const norm=s=>s.replace(/\s+/g,' ').trim();
const txt=n=>{let s='';const go=x=>{if(skip(x))return;if(x.nodeName==='#text')s+=x.value;for(const c of x.childNodes??[])go(c)};go(n);return norm(s)};
const rows=[];
for(const d of index.documents){
 const dom=parse(await readFile(base+(d.canonicalPath==='/'?'/index.html':d.canonicalPath+'.html'),'utf8'));
 const h1=find(dom,n=>n.tagName==='h1')[0];
 let roots=[];
 const query=f=>find(dom,f);
 if(d.kind==='home')roots=query(n=>n.tagName==='main'&&attr(n).id==='main-content');
 else if(d.kind==='article') {const a=query(n=>n.tagName==='article')[0];roots=[...(a.childNodes??[]).filter(n=>n.tagName==='header'),...find(a,n=>cls(n,'content-body','prose'))];}
 else if(d.kind==='pillar'&&d.documentId!=='pillar--herramientas')roots=[h1,...(h1.parentNode.childNodes??[]).filter(n=>n.tagName==='p'),...query(n=>n.tagName==='article'&&cls(n,'content-body','health-content','prose')),...query(n=>n.tagName==='p'&&cls(n.parentNode??{},'health-toc__source'))];
 else if(d.documentId==='pillar--herramientas')roots=[h1,...h1.parentNode.childNodes.filter(n=>n.tagName==='p'),...query(n=>n.tagName==='main'&&cls(n,'mx-auto','w-full','max-w-4xl'))];
 else if(d.kind==='tool')roots=query(n=>n.tagName==='main'&&cls(n,'max-w-3xl'));
 else roots=[h1,...h1.parentNode.childNodes.filter(n=>n.tagName==='p'),...query(n=>d.documentId==='page--acerca-de'?n.tagName==='article'&&attr(n).id==='about-us':n.tagName==='main'&&cls(n,'max-w-3xl'))];
 const links=[],headings=[],blocks=[];
 const go=n=>{
  if(skip(n)||n===h1)return;
  if(attr(n).id==='qol-widget') {
   for(const x of find(n,x=>attr(x).id==='qol-intro'||x.tagName==='p'&&cls(x,'mt-4','text-xs','font-light')&&attr(x.parentNode??{}).id==='qol-result-box'||cls(x,'qol-anti-guilt')&&attr(x.parentNode??{}).id==='qol-result'))go(x);return;
  }
  if(attr(n).id==='m5widget') {
   for(const id of ['m5s0','m5alert'])for(const x of find(n,x=>attr(x).id===id))go(x);
   const s=find(n,x=>attr(x).id==='m5s3')[0];const p=s.childNodes.filter(x=>x.tagName==='p');go(p.at(-1));return;
  }
  if(n.tagName==='a'&&attr(n).href)links.push({label:txt(n),url:new URL(attr(n).href,d.canonicalUrl).href});
  if(/^h[2-6]$/.test(n.tagName??''))headings.push({level:Number(n.tagName[1]),text:txt(n)});
  if(['p','summary','td','th','figcaption'].includes(n.tagName))blocks.push({tag:n.tagName,text:txt(n)});
  for(const c of n.childNodes??[])go(c);
 };
 for(const root of roots)go(root);
 const md=await readFile(base+d.markdownPath,'utf8'); const ast=fromMarkdown(md);
 const mdlinks=find(ast,n=>n.type==='link').map(n=>n.url);
 const mdheadings=find(ast,n=>n.type==='heading'&&n.depth!==1).map(n=>({level:n.depth,text:find(n,x=>x.type==='text'||x.type==='inlineCode').map(x=>x.value).join('')}));
 const rendered=norm(find(ast,n=>['text','inlineCode','code'].includes(n.type)).map(n=>n.value).join(' '));
 const missingLinks=links.filter(x=>!mdlinks.includes(x.url));
 const missingHeadings=headings.filter(x=>!mdheadings.some(y=>x.level===y.level&&x.text===y.text));
 // Content comparison independent of serializer, normalized AST text. False
 // positives from inline boundaries are kept for manual source inspection.
 const missingBlocks=blocks.filter(x=>x.text&&!rendered.replace(/\s/g,'').includes(x.text.replace(/\s/g,'')));
 rows.push({documentId:d.documentId,sourceLinks:links.length,markdownLinks:mdlinks.length,missingLinks,sourceHeadings:headings.length,markdownHeadings:mdheadings.length,missingHeadings,missingBlocks});
}
await writeFile('/workspace/ctpv-sdd-correcciones/f2a-auditoria-r1-evidencia/corpus-probe.json',JSON.stringify(rows,null,2)+'\n');
console.log(JSON.stringify({documents:rows.length,missingLinks:rows.filter(x=>x.missingLinks.length),missingHeadings:rows.filter(x=>x.missingHeadings.length),blockCandidates:rows.filter(x=>x.missingBlocks.length).map(x=>({id:x.documentId,count:x.missingBlocks.length,first:x.missingBlocks.slice(0,2)}))},null,2));
