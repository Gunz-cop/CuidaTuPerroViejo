# Adenda de navegación: anclas y foco — R1 técnica

Fecha:2026-10-17. Base de comparación: commit `872517c`. **APTO para esta adenda técnica de navegación.** Se conservan los cierres editoriales previos; no es otra ronda clínica ni un nuevo ciclo para documentos cerrados en R3. El auditor no corrigió producto.

## Alcance y comparación exacta

Se compararon los15archivos modificados contra la base indicada. Los cambios permitidos son:

- Añadir `id="main-content"` y `tabindex="-1"` a aperturas `main` sin destino para el enlace de salto existente.
- Añadir solo `tabindex="-1"` donde el ID ya existía: portada, asistente, calculadora de edad y rama moderna del pilar.
- Convertir siete encabezados Markdown del pilar de alimentación a `h2` con ID explícito, conservando literalmente cada texto: `que-cambia`, `que-dar`, `racion`, `casera`, `apetito`, `senales`, `preguntas`.

Una comprobación programática reconstruyó los archivos nuevos aplicando únicamente esas transformaciones a la base y exigió igualdad completa. No se cambiaron textos clínicos, cifras, fuentes, opciones, lógica ni respuestas. No se modificó ningún MDX de artículo de blog. La plantilla puede afectar el envoltorio de artículos aprobados, incluido ojos/oídos; su contenido y auditoría R3 permanecen intactos.

Durante esta R1 en curso el corrector detectó que los destinos con ID preexistente dejaban el foco en body; añadió `tabindex=-1` antes del cierre de esta revisión. El cambio se incluye explícitamente en el alcance comparado. No se había emitido un veredicto anterior que ahora se reinicie.

## Pruebas ejecutadas por este auditor

1. **Fuente:**15archivos con diferencias limitadas a lo indicado, hashes y copias conservados. Script `evidencias/auditor-comprobar-anclas.py`.
2. **HTML final:** se analizaron38HTML del build que incluyen enlace a `#main-content`. Todos tienen exactamente un destino con ese ID, sobre etiqueta `main`, con `tabindex=-1`. Se comprobaron los siete destinos de nutrición como `h2` únicos y texto idéntico al encabezado original. Evidencia y hashesHTML en `evidencias/auditor-anclas-html.json`.
3. **Teclado real:** Chromium sobre preview local del build final,15rutas en1440y390px (30recorridos). En cada página se pulsó Tab desde la carga inicial, se confirmó foco en el enlace de salto, se pulsó Enter y se exigió que `document.activeElement` fuera el único `MAIN#main-content` con `tabindex=-1`. También se exigió un único main por página. Todos pasaron. Incluye portada,404,gracias,contacto,acerca,las tres políticas,asistente,tres herramientas,un artículo y dos pilares. Script `evidencias/auditor-comprobar-teclado.py`, resultado `evidencias/auditor-anclas-teclado.json`.

La semántica mantiene landmarks `main` y niveles `h2`. El tabindex negativo permite transferir foco al contenido mediante el enlace sin añadir un paso al orden normal de tabulación. No se añadió tabindex positivo ni se convirtió un encabezado en texto sin semántica. No se detectaron IDs duplicados del destino de salto o de los siete encabezados evaluados.

Los recorridos bloquearon recursos de terceros para aislar navegación local. No enviaron formularios, preguntas al asistente ni mensajes. Su objetivo es foco y destinos, no consentimiento/publicidad ni rendimiento. El30/30 describe esta prueba propia, no los14recorridos separados del corrector.

## Versiones

Los snapshots están guardados como `.astro.txt`/`.mdx.txt`; no vuelven a incluirse como código en Astrocheck. Conservan bytes exactos del candidato. `path` es producto; `snapshot_path` es copia documental; los hashes previos son los de `872517c`. Se mantiene el manifiesto editorial anterior sin sobrescribirlo.

|Archivo|SHA256 antes|SHA256 técnico aprobado|
|---|---|---|
|`src/content/pilares/alimentacion-perros-senior.mdx`|`6eb6473ff280eab649533b7f081f9a0f265455a413d102038d5929a311af4413`|`c4f4a5bc79b9aa0c0795aa883bb0eb1e5dc67e92fc7fcd3bd5375c2275e7ca08`|
|`src/pages/404.astro`|`13400e8f0a9ef7373091487068ce04e59a4b13e9bd09d8d1586db9b4e5f7dc4d`|`2ef6cea2ec00528077c439a7e67b5e6116d8acf605e6ea49ca97fb8adfeaa915`|
|`src/pages/[pilar].astro`|`6f922521eba7398ce6933dd21329c0077c3a7ef04636f84ad3db602d981885ed`|`bb9b19782cbae099da2ac644d0f21b1a2463a6d961abeb0662f69d014dd88561`|
|`src/pages/[pilar]/[slug].astro`|`3e8376e5fa6dc456186f62af9598f9f4433b9472346b5487d7c2d1f3817db43e`|`e9bb6f88647cb1ef053fec5c5e7a42c1eeae1433f4c10ca601c6971c902bb3ea`|
|`src/pages/acerca-de.astro`|`0538d021eac95d56981018caf865843e9de4c109ed353201b2339b98b113e49e`|`0b81a42f1159e3e18064bb9cec83377a1f6ecb877b5970a8dcc9e0a468f3f03f`|
|`src/pages/asistente-ia.astro`|`bf52d2cbb75986907c6fd96daed0fc7a1934a404afcb277e45413f96a2e05db2`|`e3ca43f73667ff99016e4382461bb800ec09ac415381b1aeba0c6cc8919ccfdd`|
|`src/pages/contacto.astro`|`d8b0712f96d2e5556e527e3d024561a8b15e0ab5344bdb2d59a038a98f0ee672`|`74fc9f676942310328d06f5427ed591818dace71c2da6da7fa70b4704109a0e4`|
|`src/pages/gracias.astro`|`b5f3cef59cf57a5c72dd813d2310f6407d35571c1d2d318834be5a0668b89721`|`be54f03abeb7054abb77deb71e947be225cb2ccda9de30b3ffe0dcf99079205c`|
|`src/pages/herramientas/calculadora-calidad-vida-perros.astro`|`88e6305c1270914c9123f20249d23ddc4c5d302a1afde03ae8337c243c7c51fe`|`dc6e2fd92140c14f38ab9c2d56a23f85ce047db32a452bb91b1230de6aba18ab`|
|`src/pages/herramientas/calculadora-edad-perro.astro`|`eb4ba535ecee8a8a9c766f87e5075fd0be31ee99d3bbd0ba7e77ab7d15161228`|`7a5bc804663b4186d0b1b7a79de0c73063aac5cd261bd24163b3583b9d006d02`|
|`src/pages/herramientas/selector-movilidad-perros-mayores.astro`|`2f6e721c946f2d6d1edd8b31e893f7eba639ac45a0d60ccbf28003f59d256b29`|`797b7d21792ad216f486fa6fb636d8f001d427a95e3ef403279ca45cae58e8a5`|
|`src/pages/index.astro`|`2d5c57d2ae0aafe6dfce39bbb0e3da46d40312db9fe202522a7fbb4c7fec8cd7`|`ad3285cad5bfd330435c774be77cd2b6a17e410dd096a063abd2b0ec154d1b0d`|
|`src/pages/politica-de-cookies.astro`|`13c50ae4b013d9bd41a83e7c188c8bf890f45e414ef8eeb5b348a543e5c46343`|`53380f9efec1478e9ac6aa9b17b7d0f783a21692a02fb08107343f09169f5c2a`|
|`src/pages/politica-de-privacidad.astro`|`7d6dc4a35a4f1a86539dd3e81a60fb79a75b84c2c16431b39ab05aa2c4243c94`|`375e144b2593ed2157137530b4f1536e5e731d7a6be57056b3176b44f116d570`|
|`src/pages/politica-editorial.astro`|`7c852b120a54d932079e14c583544a02a2e7a65f47475928a890a04eff2bfacc`|`6223d0adb88eb78a6f8465425336d96770b4bd8984b5324415a579bee9de8240`|

Manifiesto completo con rutas de copias: `evidencias/auditor-anclas-r1/manifest.json`. No había ningún archivo compilable entre estas copias al cerrar la revisión.

## Evidencia del corrector y límites

El corrector informó build satisfactorio,953anclas internas sin roturas ni IDs duplicados y proyección/semántica de32documentos; sus archivos `anclas-despues.json`, `navegacion-anclas-navegador.json` y logs de navegación son evidencia del corrector, no pruebas repetidas aquí. El auditor realizó las comprobaciones propias descritas arriba y no emitió una nueva revisión clínica de esos32documentos.

El veredicto cubre el candidato local y su build. No acredita despliegue, publicación ni rastreo/indexación. No autoriza ni envía una solicitud a AdSense. Si cambia el producto tras estos hashes, habrá que evaluar el delta técnico concreto antes de atribuirle este resultado.
