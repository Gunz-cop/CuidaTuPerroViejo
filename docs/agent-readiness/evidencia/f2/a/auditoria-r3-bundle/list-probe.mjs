import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {parse} from '/workspace/ctpv-f2a-audit-r3/node_modules/parse5/dist/index.js';
import {fromMarkdown} from '/workspace/ctpv-f2a-audit-r3/node_modules/mdast-util-from-markdown/index.js';
import {gfm} from '/workspace/ctpv-f2a-audit-r3/node_modules/micromark-extension-gfm/index.js';
import {gfmFromMarkdown} from '/workspace/ctpv-f2a-audit-r3/node_modules/mdast-util-gfm/index.js';
import {projectDocument} from '/workspace/ctpv-f2a-audit-r3/scripts/agent-readiness/projection-dom.mjs';
const root='/workspace/ctpv-f2a-audit-r3';const out='/workspace/ctpv-sdd-correcciones/f2a-auditoria-r3-evidencia';
const gfmOptions={extensions:[gfm()],mdastExtensions:[gfmFromMarkdown()]};
const a=n=>Object.fromEntries((n.attrs??[]).map(x=>[x.name,x.value]));
const isList=n=>['ul','ol'].includes(n.tagName)||n.type==='list';
const children=n=>n.childNodes??n.children??[];
const walk=(n,fn)=>{fn(n);for(const c of children(n))walk(c,fn)};
const find=(n,fn)=>{const r=[];walk(n,x=>{if(fn(x))r.push(x)});return r};
const topLists=n=>{const r=[];const go=x=>{if(isList(x)){r.push(x);return;}for(const c of children(x))go(c)};for(const c of children(n))go(c);return r};
const normalize=s=>s.replace(/\s+/gu,'');
function textWithoutLists(n){if(isList(n))return '';if(n.nodeName==='#text'||['text','inlineCode','code'].includes(n.type))return n.value;return children(n).map(textWithoutLists).join(' ');}
function linksWithoutLists(n,canonical){if(isList(n))return [];const url=n.tagName==='a'&&a(n).href?new URL(a(n).href,canonical).href:n.type==='link'?n.url:null;return [...(url?[url]:[]),...children(n).flatMap(c=>linksWithoutLists(c,canonical))];}
function listModel(n,canonical){const ordered=n.tagName?n.tagName==='ol':n.ordered;return {ordered,start:ordered?(n.tagName?Number(a(n).start??1):n.start??1):null,items:children(n).filter(c=>c.tagName==='li'||c.type==='listItem').map(c=>({text:normalize(textWithoutLists(c)),links:linksWithoutLists(c,canonical),lists:topLists(c).map(x=>listModel(x,canonical))}))};}
const index=JSON.parse(await readFile(root+'/dist/client/agent-content/v1/index.json','utf8'));
const page=index.documents.find(d=>d.documentId==='article--como-dar-medicacion-perro');
const html=await readFile(root+'/dist/client'+page.canonicalPath+'.html','utf8');
const dom=parse(html);const body=find(dom,n=>(a(n).class??'').split(/\s+/u).includes('content-body')&&(a(n).class??'').split(/\s+/u).includes('prose'))[0];
assert.ok(body,'real article body found');
const markdown=await readFile(root+'/dist/client'+page.markdownPath,'utf8');const ast=fromMarkdown(markdown,gfmOptions);
const sourceLists=topLists(body).map(x=>listModel(x,page.canonicalUrl));const markdownLists=topLists(ast).map(x=>listModel(x,page.canonicalUrl));assert.deepEqual(markdownLists,sourceLists,'real article list hierarchy/types/start/text/ordered URLs equal HTML');
const fixtureRoot=root+'/tests/agent-readiness/fixtures/f2/';const manifest=JSON.parse(await readFile(fixtureRoot+'manifest.json','utf8'));const home=manifest.documents.find(x=>x.documentId==='home');const homeHTML=await readFile(fixtureRoot+home.htmlFile,'utf8');
const mixed='<ul><li>Primer nivel<ol start="4"><li>Segundo nivel<ul><li>Tercer nivel</li></ul></li></ol></li></ul>';
const mixedMD=projectDocument({...home},Buffer.from(homeHTML.replace('</main>',mixed+'</main>'))).markdown.toString();const mixedAST=fromMarkdown(mixedMD,gfmOptions);const mixedRoot=mixedAST.children.find(n=>n.type==='list'&&JSON.stringify(n).includes('Primer nivel'));
const expected={ordered:false,start:null,items:[{text:'Primernivel',links:[],lists:[{ordered:true,start:4,items:[{text:'Segundonivel',links:[],lists:[{ordered:false,start:null,items:[{text:'Tercernivel',links:[],lists:[]}]}]}]}]}]};
assert.deepEqual(listModel(mixedRoot,home.canonicalUrl),expected,'mixed UL→OLstart4→UL fixed structure preserved');assert.equal(find(mixedRoot,n=>n.type==='code').length,0);
const prior=JSON.parse(await readFile(out+'/serialization-probe.json','utf8'));const ul=prior.nestedListTree;assert.equal(ul.children[0].children.find(n=>n.type==='list').children[0].children.find(n=>n.type==='list').children[0].children[0].value,undefined);assert.equal(find(ul,n=>n.type==='list').length,3);assert.equal(find(ul,n=>n.type==='code').length,0);
const report={realArticle:{documentId:page.documentId,sourceLists,markdownLists,passed:true},mixed:{html:mixed,expected,actual:listModel(mixedRoot,home.canonicalUrl),markdownExcerpt:mixedMD.slice(mixedMD.indexOf('- Primer nivel')),codeNodes:0,passed:true},originalUL:{listNodes:3,codeNodes:0,passed:true}};
await writeFile(out+'/list-probe.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({articleLists:sourceLists.length,originalUL:true,mixed:true,passed:true}));
