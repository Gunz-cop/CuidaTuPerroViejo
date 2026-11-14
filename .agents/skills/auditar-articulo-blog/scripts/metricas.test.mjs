import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseEditorialContract } from './contrato.mjs';

const script = fileURLToPath(new URL('./metricas.mjs', import.meta.url));
const fixture = name => fs.readFileSync(new URL('./fixtures/' + name, import.meta.url), 'utf8');
const article = fixture('articulo.txt');
const brief = fixture('brief.txt');
const slug = 'prueba-contrato';
const v2 = (boxes='info=1; danger=1; warning=1', faq=1) => `Contrato editorial: 2.0\nComponentes de cuerpo: ${boxes}\nFAQ: ${faq} preguntas.\n`;
async function audit(transformBrief=x=>x, transformArticle=x=>x, removeImage=false) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ctpv-metricas-'));
  try {
    for (const folder of ['src/content/blog','briefings','public/images/blog/'+slug]) fs.mkdirSync(path.join(dir, folder), {recursive:true});
    fs.writeFileSync(path.join(dir,'src/content/blog',slug+'.mdx'), transformArticle(article));
    fs.writeFileSync(path.join(dir,'briefings','briefing-'+slug+'.md'), transformBrief(brief));
    if (!removeImage) fs.writeFileSync(path.join(dir,'public/images/blog',slug,'fixture.webp'),'');
    const old={cwd:process.cwd(),argv:process.argv,exitCode:process.exitCode,log:console.log}; let stdout='';
    try {
      process.chdir(dir);process.argv=[process.execPath,script,slug,'--strict'];process.exitCode=0;console.log=x=>{stdout+=String(x)+'\n';};
      await import(pathToFileURL(script).href+'?case='+encodeURIComponent(dir));return {status:process.exitCode,stdout};
    } finally {process.chdir(old.cwd);process.argv=old.argv;process.exitCode=old.exitCode;console.log=old.log;}
  } finally {fs.rmSync(dir,{recursive:true,force:true});}
}

test('contrato legado estable aprueba controles mecánicos y deja pendientes manuales',async()=>{const r=await audit();assert.equal(r.status,0,r.stdout);assert.match(r.stdout,/PENDIENTES MANUALES/);});
test('rango ausente bloquea sin aprobar controles omitidos',async()=>{const r=await audit(x=>x.replace(/intervalo .+ palabras/,'intervalo pendiente'));assert.equal(r.status,1);assert.match(r.stdout,/rango del contrato ausente/);});
test('fuentes ausentes bloquean',async()=>{const r=await audit(x=>x.replace(/^\| 1 \|.*$/m,''));assert.equal(r.status,1);assert.match(r.stdout,/tabla de fuentes ausente/);});
test('imagen referenciada inexistente bloquea',async()=>{const r=await audit(x=>x,x=>x,true);assert.equal(r.status,1);assert.match(r.stdout,/imagen inexistente: fixture.webp/);});
test('contrato 2.0 válido conserva control y cantidades exactas',async()=>{const r=await audit(x=>v2()+x);assert.equal(r.status,0,r.stdout);});
test('cero cajas de cuerpo y FAQ explícita cero son válidos',async()=>{
  const r=await audit(x=>v2('info=0; danger=0; warning=0',0)+x,x=>x.replace(/<AlertBox type="(?:info|danger|warning)" title="(?:Orientación|Precaución|Manejo)">.*?<\/AlertBox>/g,'').replace(/<FAQ items=\{\[[\s\S]*?\]\} \/>/,''));
  assert.equal(r.status,0,r.stdout);
});
test('cantidad de caja incumplida bloquea',async()=>{const r=await audit(x=>v2('info=0; danger=1; warning=1')+x);assert.equal(r.status,1);assert.match(r.stdout,/AlertBox info: 1, contrato 0/);});
test('FAQ añadida contra contrato cero bloquea',async()=>{const r=await audit(x=>v2('info=1; danger=1; warning=1',0)+x);assert.equal(r.status,1);assert.match(r.stdout,/FAQ con 1 preguntas, el brief define 0/);});
for(const [name,header] of [
  ['versión futura','Contrato editorial: 3.0\n'],
  ['cabecera duplicada',v2()+'Contrato editorial: 2.0\n'],
  ['componentes ausentes','Contrato editorial: 2.0\nFAQ: 1 preguntas.\n'],
  ['componentes duplicados',v2()+'Componentes de cuerpo: info=1; danger=1; warning=1\n'],
  ['negativo',v2('info=-1; danger=1; warning=1')],
  ['decimal',v2('info=0.5; danger=1; warning=1')],
  ['FAQ ausente','Contrato editorial: 2.0\nComponentes de cuerpo: info=1; danger=1; warning=1\n'],
  ['FAQ duplicada',v2()+'FAQ: 1 preguntas.\n'],
]) test(name+' bloquea y no cae a legado',async()=>{const r=await audit(x=>header+x);assert.equal(r.status,1,r.stdout);});
test('parser diferencia legado y cero sin inventar valores',()=>{assert.equal(parseEditorialContract('texto').version,'legacy');assert.deepEqual(parseEditorialContract(v2('info=0; danger=0; warning=0',0)).boxes,{info:0,danger:0,warning:0});});

test('rango legado Entre conserva compatibilidad',async()=>{const r=await audit(x=>x.replace(/intervalo (\d+)–(\d+) palabras/,'Entre $1 y $2 palabras'));assert.equal(r.status,0,r.stdout);});
test('fuente diez conserva ficha y trazabilidad',async()=>{const r=await audit(x=>x+"\n10. **Fuente 10 (Prueba):** *Referencia de InstitutoDiez 2026* `https://example.invalid/diez`\n| 10 | InstitutoDiez (2026) | H2-1 | ☐ |\n",x=>x.replace('EquipoPrueba (2026) identifica','InstitutoDiez (2026) y EquipoPrueba (2026) identifica'));assert.equal(r.status,0,r.stdout);assert.match(r.stdout,/\[10\] InstitutoDiez/);});
test('srcset inexistente también bloquea',async()=>{const r=await audit(x=>x,x=>x.replace('![Referencia sintética](/images/blog/prueba-contrato/fixture.webp)','<img src="/images/blog/prueba-contrato/fixture.webp" srcset="/images/blog/prueba-contrato/fixture.webp 1200w, /images/blog/prueba-contrato/missing.webp 400w" />'));assert.equal(r.status,1);assert.match(r.stdout,/imagen inexistente: missing.webp/);});
test('atributos de caja reordenados no eluden conteo',async()=>{const r=await audit(x=>v2()+x,x=>x.replace('<AlertBox type="danger" title="Precaución">',"<AlertBox title='Precaución' type='danger'>"));assert.equal(r.status,0,r.stdout);});

for (const [name, header] of [
 ['versión futura indentada',' Contrato editorial: 3.0\n'],
 ['separador de versión mal formado','Contrato editorial : 3.0\n'],
 ['versión sin separador','Contrato editorial 3.0\n'],
 ['versión duplicada indentada',v2()+' Contrato editorial: 3.0\n'],
 ['componentes duplicados indentados',v2()+' Componentes de cuerpo: info=0; danger=0; warning=0\n'],
 ['FAQ duplicada indentada',v2()+' FAQ: 0 preguntas.\n'],
]) test(name+' no elude validación',async()=>{const r=await audit(x=>header+x);assert.equal(r.status,1,r.stdout);});
