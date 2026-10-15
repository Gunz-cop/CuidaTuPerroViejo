import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse, serializeOuter } from 'parse5';
import ts from 'typescript';

const root = process.cwd();
const slug = 'callosidades-higromas-codos-perros-senior';
const html = await readFile(`dist/client/higiene-hogar-perros-senior/${slug}.html`, 'utf8');
const doc = parse(html);
function nodes(root, predicate) {
  return [ ...(predicate(root) ? [root] : []), ...(root.childNodes ?? []).flatMap(child => nodes(child, predicate)) ];
}
const attrs = node => Object.fromEntries((node.attrs ?? []).map(a => [a.name, a.value]));
const article = nodes(doc, node => node.tagName === 'article')[0];
const header = article.childNodes.find(node => node.tagName === 'header');
const body = nodes(article, node => node.tagName === 'div' && (attrs(node).class ?? '').split(' ').includes('content-body'))[0];
for (const script of nodes(article, node => node.tagName === 'script')) {
  script.parentNode.childNodes = script.parentNode.childNodes.filter(node => node !== script);
}
const images = nodes(article, node => node.tagName === 'img');
for (const node of images) {
  const source = attrs(node).src;
  if (!source?.startsWith('/images/blog/')) continue;
  const data = await readFile(join(root, 'public', source));
  node.attrs = node.attrs.filter(attr => !['src', 'srcset', 'sizes', 'loading'].includes(attr.name));
  node.attrs.push({ name: 'src', value: `data:image/webp;base64,${data.toString('base64')}` }, { name: 'loading', value: 'eager' });
}
for (const link of nodes(article, node => node.tagName === 'a')) {
  const href = attrs(link).href;
  if (href === `/images/blog/${slug}/infografia-callo-higroma.webp`) {
    const data = await readFile(`public${href}`);
    link.attrs = link.attrs.filter(attr => attr.name !== 'href');
    link.attrs.push({ name: 'href', value: `data:image/webp;base64,${data.toString('base64')}` }, { name: 'download', value: 'infografia-callo-higroma.webp' });
  } else if (href?.startsWith('/')) link.attrs.find(attr => attr.name === 'href').value = `https://cuidatuperroviejo.com${href}`;
}
const cssPaths = nodes(doc, node => node.tagName === 'link' && attrs(node).rel === 'stylesheet').map(node => attrs(node).href).filter(path => path.startsWith('/'));
const css = (await Promise.all(cssPaths.map(path => readFile(join(root, 'dist/client', path), 'utf8')))).join('\n');
const component = await readFile('src/components/article/HigromaAnimation.astro', 'utf8');
const script = component.match(/<script>([\s\S]*?)<\/script>/)[1];
const js = ts.transpileModule(script, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText;
const preview = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Vista previa · Callos e higromas en San Bernardo</title><style>${css}</style><style>body{margin:0;background:#faf9f4}main{max-width:900px;margin:auto;padding:24px 20px}article header{margin-bottom:32px}article .content-body{max-width:760px;margin:auto}.preview-note{max-width:900px;margin:auto;padding:12px 20px;font:600 13px/1.5 system-ui;color:#214d3a;border-bottom:1px solid #d5e2d6}.content-body img{max-width:100%;height:auto}h1{overflow-wrap:anywhere}</style></head><body><div class="preview-note">Vista previa local · Cuida tu Perro Viejo · San Bernardo · 3 animaciones con reproducción manual</div><main><article>${serializeOuter(header)}${serializeOuter(body)}</article></main><script>${js}</script></body></html>`;
await writeFile('/workspace/articulo-higromas-san-bernardo.html', preview);
console.log(`Vista previa autónoma: ${Buffer.byteLength(preview)} bytes; ${images.length} imágenes integradas.`);
