// Ejecutar desde la raíz del repo. Recorta/reduce evidencia; no retoca la ilustración.
const fs=require('node:fs');
const path=require('node:path');
const sharp=require('sharp');
const crypto=require('node:crypto');
const root=process.cwd(),out=__dirname;
const images=path.join(root,'public/images/blog/leishmaniosis-perros-mayores');
(async()=>{
 const metrics={method:'Puntos de contorno elegidos manualmente en WebP 1200x675; distancia vertical a la recta grupa-cruz. No es una medición clínica ni clasificador de edad.',variants:[],regions:[]};
 const input=path.join(images,'mestizo-senior-recorte-perfil-v4.webp');
 const A={x:370,y:85},B={x:760,y:74},C={x:550,y:136};
 const chordY=A.y+(B.y-A.y)*(C.x-A.x)/(B.x-A.x),gap=C.y-chordY;
 metrics.points={croup:A,withers:B,dorsal:C,nose:{x:1140,y:320}};
 metrics.depression1200=gap;metrics.depression390=gap*390/1200;
 const svg=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="780"><g fill="none" stroke="#007a85" stroke-width="5"><path d="M${A.x} ${A.y}L${B.x} ${B.y}"/><path d="M${C.x} ${chordY}V${C.y}"/></g><g fill="#007a85"><circle cx="${A.x}" cy="${A.y}" r="7"/><circle cx="${B.x}" cy="${B.y}" r="7"/></g><g font-family="sans-serif" font-size="32" fill="#203e32"><text x="280" y="52">Grupa</text><text x="730" y="42">Cruz</text><text x="24" y="708">Depresión: ${gap.toFixed(1)} px a 1200; ${(gap*390/1200).toFixed(1)} px a 390</text><text x="24" y="750">Puntos manuales: comprueba silueta, no diagnostica.</text></g></svg>`);
 const dog=await sharp(input).flatten({background:'#fff'}).toBuffer();
 const diagram=await sharp({create:{width:1200,height:780,channels:3,background:'#fff'}}).composite([{input:dog,left:0,top:0},{input:svg,left:0,top:0}]).png().toBuffer();
 fs.writeFileSync(path.join(out,'capturas/recorte-recta-1200.png'),diagram);
 await sharp(diagram).resize(390).png().toFile(path.join(out,'capturas/recorte-recta-390.png'));
 for(const [theme,bg]of[['claro','#fff'],['oscuro','#1a1a1a']])await sharp(input.replace('.webp','-400.webp')).resize(390).flatten({background:bg}).png().toFile(path.join(out,`capturas/recorte-${theme}-390.png`));
 for(const type of ['recorte','consulta']){
  const file=path.join(images,`mestizo-senior-${type==='recorte'?'recorte-perfil':'analisis-sangre-consulta'}-v4.webp`),m=await sharp(file).metadata();
  const zones=type==='recorte'?[['ojo',.88,.363],['oreja',.779,.379],['trufa',.95,.474],['pelaje',.46,.31],['unas',.637,.90]]:[['ojo',.74,.29],['oreja',.662,.309],['trufa',.812,.372],['pelaje',.46,.30],['unas',.665,.785]];
  for(const[name,x,y]of zones){const left=Math.max(0,Math.min(m.width-300,Math.round(x*m.width)-150)),top=Math.max(0,Math.min(m.height-300,Math.round(y*m.height)-150));await sharp(file).extract({left,top,width:300,height:300}).flatten({background:'#fff'}).png().toFile(path.join(out,`capturas/${type}-${name}-100.png`));metrics.regions.push({type,name,left,top,width:300,height:300,sourceWidth:m.width,sourceHeight:m.height,scale:1});}
  for(const w of [1200,800,400]){const p=file.replace('.webp',(w===1200?'':`-${w}`)+'.webp'),b=fs.readFileSync(p),{data,info}=await sharp(p).raw().toBuffer({resolveWithObject:true});const row={path:path.relative(root,p),bytes:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex'),width:info.width,height:info.height,alpha:info.channels===4};if(row.alpha){let min=255,max=0,zero=0;for(let k=3;k<data.length;k+=4){min=Math.min(min,data[k]);max=Math.max(max,data[k]);if(data[k]===0)zero++;}Object.assign(row,{alphaMin:min,alphaMax:max,fullyTransparentPixels:zero});}metrics.variants.push(row);}
 }
 fs.writeFileSync(path.join(out,'mediciones-imagenes.json'),JSON.stringify(metrics,null,2)+'\n');
 console.log(JSON.stringify({depression1200:gap,depression390:gap*390/1200,variants:metrics.variants},null,2));
})();
