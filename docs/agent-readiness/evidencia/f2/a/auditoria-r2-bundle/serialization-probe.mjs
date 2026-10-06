import {readFile,writeFile} from 'node:fs/promises';
import {projectDocument} from '/workspace/ctpv-f2a-audit-r2/scripts/agent-readiness/projection-dom.mjs';
import {fromMarkdown} from '/workspace/ctpv-f2a-audit-r2/node_modules/mdast-util-from-markdown/index.js';
import {gfm} from '/workspace/ctpv-f2a-audit-r2/node_modules/micromark-extension-gfm/index.js';
import {gfmFromMarkdown} from '/workspace/ctpv-f2a-audit-r2/node_modules/mdast-util-gfm/index.js';
const f='/workspace/ctpv-f2a-audit-r2/tests/agent-readiness/fixtures/f2/';
const manifest=JSON.parse(await readFile(f+'manifest.json','utf8'));
const walk=(n,f)=>{f(n);for(const c of n.children??[])walk(c,f)};
const nodes=(n,f)=>{let a=[];walk(n,x=>{if(f(x))a.push(x)});return a};
const mdText=n=>n.value??(n.children??[]).map(mdText).join('');
const options={extensions:[gfm()],mdastExtensions:[gfmFromMarkdown()]};
const page=manifest.documents.find(x=>x.documentId==='home');const html=await readFile(f+page.htmlFile,'utf8');
const code='línea A\n\n\nlínea B\n\n';
const add='<p># Texto literal editorial</p><p>1. No es lista</p><p>- No es lista tampoco</p>'+
`<pre><code>${code}</code></pre>`+
'<ul><li>Primer nivel<ul><li>Segundo nivel<ul><li>Tercer nivel</li></ul></li></ul></li></ul>';
const md=projectDocument({...page},Buffer.from(html.replace('</main>',add+'</main>'))).markdown.toString();
const ast=fromMarkdown(md,options);const report={
 h1Count:nodes(ast,n=>n.type==='heading'&&n.depth===1).length,
 literalParagraphs:nodes(ast,n=>n.type==='paragraph'&&['# Texto literal editorial','1. No es lista','- No es lista tampoco'].includes(mdText(n))).map(mdText),
 codeValue:nodes(ast,n=>n.type==='code'&&n.value.includes('línea A'))[0]?.value,
 codeExpected:code,
 nestedListTree:ast.children.find(n=>n.type==='list'&&JSON.stringify(n).includes('Primer nivel')),
 nestedListExcerpt:md.slice(md.indexOf('- Primer nivel')),
};
const food=manifest.documents.find(x=>x.documentId==='article--comida-casera-perros-mayores');
const foodHtml=await readFile(f+food.htmlFile,'utf8');
const foodMD=projectDocument({...food},Buffer.from(foodHtml.replace(/(<td\b[^>]*>)[\s\S]*?(<\/td>)/,'$1A | B$2'))).markdown.toString();
const foodAst=fromMarkdown(foodMD,options);
report.pipeCells=nodes(foodAst,n=>n.type==='tableCell'&&mdText(n).includes('A')).map(mdText);
report.pipeExact=report.pipeCells.includes('A | B');
await writeFile('/workspace/ctpv-sdd-correcciones/f2a-auditoria-r2-evidencia/serialization-probe.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,nestedListTree:undefined},null,2));
