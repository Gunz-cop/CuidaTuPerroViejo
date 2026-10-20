/** Conteo preliminar de texto editorial MDX mediante AST; el DOM final es contractual.
 * Uso: node <este-archivo> <ruta-mdx> [ruta-json]
 * No cuenta etiquetas, props técnicas, imports, imágenes/pies, bibliografía ni recursos visuales.
 */
import fs from 'node:fs';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import { parseFragment } from 'parse5';
const [input, output] = process.argv.slice(2);
if (!input) throw new Error('Falta ruta MDX');
const raw = fs.readFileSync(input, 'utf8');
const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
let tree;
await compile(body, { remarkPlugins: [remarkGfm, () => root => { tree = root; }] });
const attrs = n => Object.fromEntries((n.attributes || []).filter(a => a.type === 'mdxJsxAttribute').map(a => [a.name, a.value]));
const htmlText = s => {
 const walk = n => n.nodeName === '#text' ? n.value : (n.childNodes || []).map(walk).join(['p','div','li','br'].includes(n.tagName) ? '\n' : '');
 return walk(parseFragment(s));
};
const literal = n => {
 if (n.type === 'Literal') return n.value;
 if (n.type === 'ArrayExpression') return n.elements.map(literal);
 if (n.type === 'ObjectExpression') return Object.fromEntries(n.properties.map(p => [p.key.name || p.key.value, literal(p.value)]));
 throw new Error('FAQ requiere datos estáticos verificables: ' + n.type);
};
const excluded = [];
function text(n) {
 if (['mdxjsEsm','image','imageReference','definition','code','mdxFlowExpression','mdxTextExpression'].includes(n.type)) return '';
 if (n.type.startsWith('mdxJsx')) {
  const a = attrs(n);
  if (n.name === 'figcaption' || 'data-editorial-bibliography' in a || 'data-editorial-visual' in a || /^[A-Z]/.test(n.name || '') && !['AlertBox','FAQ'].includes(n.name)) {
   excluded.push(n.name);return '';
  }
  if (n.name === 'img') return '';
  if (n.name === 'br') return '\n';
  if (n.name === 'FAQ') {
   const expr = a.items?.data?.estree?.body?.[0]?.expression;
   if (!expr) throw new Error('FAQ items no analizable');
   const items = literal(expr);
   return (typeof a.title === 'string' ? a.title : 'Preguntas frecuentes') + '\n' + items.map(i => i.question+'\n'+htmlText(i.answer)).join('\n');
  }
  return (n.name === 'AlertBox' && typeof a.title === 'string' ? a.title+'\n' : '') + (n.children || []).map(text).join(n.type === 'mdxJsxTextElement' ? '' : '\n');
 }
 if (n.type === 'text' || n.type === 'inlineCode') return n.value;
 const inline = ['paragraph','heading','strong','emphasis','link','linkReference','delete','tableCell'].includes(n.type);
 return (n.children || []).map(text).join(inline ? '' : '\n');
}
const count = s => s.trim().split(/\s+/u).filter(Boolean).length;
let current = {section:'Introducción',text:''};const sections = [current];
for (const n of tree.children) {
 if (n.type === 'heading' && n.depth === 2 || n.name === 'FAQ') {
  current = {section:n.name === 'FAQ' ? 'Preguntas frecuentes' : text(n),text:''};sections.push(current);
 }
 current.text += '\n'+text(n);
}
const paragraphs = [];
function gather(n, excludedParent=false) {
 const a=attrs(n);
 const skip=excludedParent || ['figcaption','FAQ'].includes(n.name) || 'data-editorial-bibliography' in a || 'data-editorial-visual' in a || /^[A-Z]/.test(n.name||'') && n.name !== 'AlertBox';
 if (n.type === 'paragraph' && !skip && count(text(n)) > 0) paragraphs.push(count(text(n)));
 for (const c of n.children || []) gather(c,skip);
}
gather(tree);
const sorted=paragraphs.toSorted((a,b)=>a-b);
const result={method:'AST preliminar: texto visible de MDX/AlertBox/FAQ; DOM final pendiente',input,total:sections.reduce((a,s)=>a+count(s.text),0),sections:sections.map(s=>({section:s.section,words:count(s.text)})),density:{paragraphs:sorted.length,mean:sorted.reduce((a,b)=>a+b,0)/sorted.length,median:sorted.length%2?sorted[Math.floor(sorted.length/2)]:(sorted[sorted.length/2-1]+sorted[sorted.length/2])/2,over50:sorted.filter(n=>n>50).length,max:Math.max(...sorted)},excluded:[...new Set(excluded)]};
if (output) fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
