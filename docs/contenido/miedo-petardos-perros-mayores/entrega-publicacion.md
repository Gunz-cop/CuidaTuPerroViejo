# Preparación de publicación — miedo a los petardos

Fecha: 2026-10-26. Integración y comprobación técnica; no es auditoría ni aprobación editorial. Sin fusión o despliegue.


## Actualización autorizada — bibliografía y auditoría del diff

El propietario pide «Ok, ajusta y audita» tras los pendientes de publicación. Se sustituye exclusivamente la entrada bibliográfica de Málaga por el comunicado primario, reabierto el 2026-10-26, con su guía gráfica y la cobertura de prensa conservada. El resto del MDX es idéntico. [Prueba exacta del cambio](publicacion/ajuste-bibliografia.json). Los registros de traslado anteriores describen la versión inicial; este ajuste no se oculta como un traslado literal.

Se mantiene la fecha 2026-10-25 y la separación de PR #148/#149. Blackwell completo y PDF español regulatorio siguen como verificaciones parciales declaradas; no se inventan documentos ni una aceptación editorial del propietario. La auditoría independiente de publicación R1 evaluó el diff final de integración y el ajuste bibliográfico, con revisión de los tres archivos compartidos; el resultado y sus límites se registran al final de esta entrega. No reinicia ni reemplaza las auditorías clínicas o visuales anteriores. Las comprobaciones afectadas se han repetido: check sin errores/advertencias, build y proyección correctos. La prueba visual anterior se conserva como evidencia de esos mismos binarios/componentes.

Sin fusión ni despliegue.

## Base elegida, antes de abrir PR

`main`, commit `b79ee0b` (comprobado en origin/main), es la base vigente. La especificación `docs/migracion-stack/README.md` marca la migración Astro 4→7 completada y Astro 7 en producción desde PR #38 (2026-09-03). El tag `migration-astro-7` es histórico. Esta integración editorial no pertenece a una fase de migración y no debe dirigirse a la rama histórica `migracion/astro-7`.

PR de código: `claude/codigo-heroimagecaption-tablaapilable-compacta` → `main`; exactamente tres archivos. PR de artículo: `claude/publica-miedo-petardos-perros-mayores` → rama de código, apilado para mantener el diff editorial separado. Antes de fusionar el artículo, el propietario debe fusionar el código y cambiar su base a main; no se hace ninguna fusión en esta sesión.

## Decisiones usadas

Se plantearon juntas al inicio. Al no recibirse respuesta, se aplican los valores por defecto anunciados: separar código, conservar md/json/scripts y los tres originales PNG finales retirando el resto de PNG/evidencias, mantener datePublished 2026-10-25. Sin dateModified añadido. Ninguna de estas decisiones significa autorización de publicación.

## Estado de preparación

Código 625ef8a listo: HTML de tres artículos publicado idéntico byte a byte antes/después; las reglas compactas solo se emiten al usar la prop. Los ejemplos con animación tienen UUID preexistentes que cambian en cada build, conservados y documentados aparte. Pruebas adicionales y PR se añadirán al terminar la integración.

Texto del artículo trasladado byte a byte desde 717ee60 a src/content/blog/miedo-petardos-perros-mayores.mdx. Brief, testimonios e informes de auditoría copiados íntegros. Se excluyen WebP hero v1 y PNG intermedios del candidato; la rama histórica conserva los originales y las pruebas. Registro de retiradas en publicacion/politica-archivos.json.

Los apartados anteriores registran la elección de base **antes de abrir los PR**. El cierre técnico y sus límites están a continuación; el texto clínico, las cifras, FAQ y testimonios permanecen intactos. La única edición bibliográfica posterior es S10, autorizada y documentada arriba.

## PR y orden de fusión propuesto

| Orden | PR | Base y estado |
|---|---|---|
| 1 | [Código #148](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/148), `claude/codigo-heroimagecaption-tablaapilable-compacta` | `main`; commit `625ef8a`; exactamente tres archivos compartidos; draft. |
| 2 | [Artículo #149](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/149), `claude/publica-miedo-petardos-perros-mayores` | Base apilada en la rama de código para excluir esos tres archivos del diff editorial; draft. |

Revisar primero el código. Tras su fusión **ordenada por el propietario**, cambiar la base del PR editorial a main y actualizar/rebasar la rama si lo requiere la estrategia de fusión; volver a revisar el diff y CI. No se fusiona ninguna rama, no se abre un PR de fusión de las ramas históricas y no se habilita autofusión.

## Archivos movidos, excluidos y añadidos

| Acción | Archivos | Motivo o garantía |
|---|---|---|
| Traslado | `articulo-borrador.mdx` de docs → `src/content/blog/miedo-petardos-perros-mayores.mdx` | Igualdad byte a byte con `717ee60` en el traslado inicial `2894178`; edición posterior autorizada solo de S10. No se duplica el borrador. |
| Conservación íntegra | Brief v7, testimonios, auditorías anteriores y sus JSON | Hashes contrastados con la fuente. Los informes no se reescriben. |
| Conservación de originales | `imagen-1-v10.png`, `imagen-2-v8.png`, `imagen-3-v1.png`, bajo `visuales/originales/` | Solo tres PNG finales, 7.716.999 bytes. |
| Activos públicos | Portada v2 y variante v2-400; paseo v1 y consulta v1 | Binarios auditados, dimensiones y hashes idénticos. |
| Exclusión del candidato | Portada WebP v1/v1-400, capturas, recortes diagnósticos, guía PNG y originales descartados | 226 archivos y 82.281.449 bytes no se trasladan desde la fuente; se mantienen sus hashes históricos. No se reescribe Git ni se borran ramas originales. |
| Mecánico | `comprobaciones/recuento.py` | Solo cambia la ruta de entrada al MDX trasladado; mismo método. |
| Enlazado | `src/data/internal-links.ts`, `docs/seo/enlazado-interno.md` | Dos puentes desde petardos: chequeo geriátrico y prevención de caídas. Pilar y artículos del mismo silo lo descubren automáticamente. Sin editar SiloNavigation ni cuerpos ajenos. |
| Documentación | `INVENTARIO_CONTENIDO.md`, `TODO.md`, esta entrega y `publicacion/` | P1-03 permanece `[~]`, NO publicado; resultados, límites y tareas pendientes. |

[Política y retiradas, archivo por archivo](publicacion/politica-archivos.json). Se añadió una nota a la entrega visual, sin cambiar su veredicto. Los enlaces PNG retirados de los informes son históricos; pueden abrirse en el [commit fuente](https://github.com/Gunz-cop/CuidaTuPerroViejo/tree/717ee60/docs/contenido/miedo-petardos-perros-mayores/visuales). Los JSON antiguos no se presentan como inventarios actuales. Se conservan además scripts y prompts textuales para reproducibilidad. Las capturas nuevas quedan fuera de Git por la política elegida.

## Código compartido: comprobación antes/después

Una copia directa emitía CSS compacto incluso sin activar la prop, cambiando el HTML de artículos existentes. Se ajustó **solo TablaApilable** para emitir esas reglas como estilo inline condicional; el estilo apilable anterior se conserva. No se cambian configuración ni hojas de estilos globales.

- HTML de **ansiedad por separación, agresividad tardía y chequeo geriátrico idéntico byte a byte**. Comparación literal de builds normales, sin normalizar atributos.
- En todo el sitio, **36/42 HTML idénticos**. Cinco guías con animaciones, incluidos los tres ejemplos del encargo, solo cambian UUID aleatorios preexistentes; al sustituir exclusivamente esos identificadores, el resto es igual. Contacto cambia su `startedAt` de build. No se editan esas fuentes.
- Tabla existente de golpe de calor a 390: **449,71875 px**, claro/oscuro, antes/después; mismos estilos y sin overflow. Las capturas PNG son **idénticas byte a byte en ambos temas**. Se abrieron la anterior clara y la posterior oscura.
- Check base: 199 archivos:0 errores / 0 warnings / 73 hints; código: 199 archivos: **0 errores / 0 warnings / 74 hints**. Build correcto antes/después, con proyección. No se ocultan los hints.

[Comparación HTML](publicacion/codigo/comparacion-html.json), [tabla antes](publicacion/codigo/tabla-antes.json), [después](publicacion/codigo/tabla-despues.json), [hashes de capturas externas](publicacion/codigo/capturas-no-incluidas.json). Un intento de preload de UUID reproducibles no alcanzó el crypto del prerender y **no se usa como prueba**; los resultados finales son builds normales.

## Pruebas del candidato editorial

| Prueba | Resultado real |
|---|---|
| `npx astro check` | 211 archivos; **0 errores, 0 warnings, 74 hints**; exit0. |
| `npx astro build` | Exit0; artículo y **37 documentos Markdown** generados. |
| `npm run build` para enlazado | Exit0; sin postbuild. El primer intento sin variables de caché falló al escribir fuera del workspace; se repitió correctamente con telemetría desactivada y cachés bajo /tmp, sin cambiar configuración. |
| Proyección | `projection.mjs check`: exit0. Guarda semántica HTML/GFM: **37 documentos**, exit0. El estilo inline no se filtra al Markdown. |
| Enlaces del cuerpo | **10/10 válidos**: nueve artículos y un pilar, contra fuentes, pilar real e inventario por slug o título; HTTP200 en rutas locales `.html`. |
| Entradas del silo | Pilar, ansiedad por separación y agresividad tardía enlazan al nuevo artículo en el HTML construido. Dos puentes nuevos con destino real. Sin enlaces a artículos de feromonas o tormentas inexistentes. |
| Recuento contractual | **5.653 palabras** con el script original y ruta actualizada; incluye H2/H3/tablas/avisos/FAQ y excluye frontmatter/imports/img/pies/bibliografía. |
| Tono | **0 muletillas, 0,0/1.000**; denominador propio de tono.py:5.167, distinto del contractual. |
| JSON-LD | JSON.parse y comprobación estructural de BlogPosting/ImageObject correctos: fecha 2026-10-25, imagen v2,1200×675 y caption editorial. Sin validador público de Google. FAQ HTML comprobada aparte. |
| Descubrimiento | Artículo en sitemap, índice y documento Markdown. llms mantiene pilar, sitemap e interfaces del catálogo; **no enumera artículos individuales por diseño**. Sin cambiar su generador. |

[Comandos](publicacion/resultados-comandos.json), [integridad del traslado](publicacion/integridad-movimiento.json), [recuento](publicacion/recuento.json), [tono](publicacion/tono.txt), [enlaces](publicacion/enlaces-internos.json), [HTTP local](publicacion/enlaces-http-local.json), [JSON-LD](publicacion/jsonld.json), [descubrimiento local](publicacion/descubrimiento-local.json).

### Navegador y recursos

Playwright/Chromium existentes, sin reinstalar. Build real servido con Python en `127.0.0.1:4468`, ruta `.html`; no una maqueta ni producción. Fuentes web servidas desde caché/proxy; terceros ajenos bloqueados. Elementos fijos/sticky ocultos solo al capturar recursos aislados; mediciones de ancho/estabilidad anteriores a esa ocultación.

| Medida | Móvil 390, claro/oscuro | Escritorio 1366, claro/oscuro |
|---|---:|---:|
| Imágenes decodificadas al recorrer recursos | 3/3 | 3/3 |
| scrollWidth | 390/390 | 1366/1366 |
| CLS observado | 0/0 | 0/0 |
| Calendario, px CSS | 777,53125 | 488,5625 |
| Encuesta, px CSS | 889,921875 | 650,34375 |
| Contraste mínimo, claro/oscuro | 4,504492059318877 /5,516990353269591 | 4,504492059318877 /5,516990353269591 |
| FAQ | 8 cerradas; abrir/cerrar funciona | 8 cerradas; abrir/cerrar funciona |
| Errores JS | 0 | 0 |

Contraste sobre valores continuos **antes de redondear**: textos/rótulos de tablas, avisos y pie; no certifica WCAG de todo el sitio. Los tres avisos se capturaron en todos los modos. La portada muestra el pie editorial y un alt separado. **36 capturas** de imágenes/tablas/avisos/FAQ×cuatro modos. Se abrieron nueve capturas, enumeradas en el manifiesto; no se declara inspección individual de las 36 ni nueva auditoría anatómica.

[Script](publicacion/verificar-navegador.cjs), [mediciones](publicacion/verificacion-navegador.json), [contraste](publicacion/contraste.json), [manifiesto de capturas](publicacion/capturas-no-incluidas.json). Las capturas están en `/tmp/petardos-publicacion/articulo/capturas/` de esta sesión, regenerables con el script; no se prometen como archivos de GitHub.

Único HTTP404 observado: `/api/feedback`, **esperable con el servidor estático sin backend**. No se prueba ni se arregla la API real. No se probaron Safari/Firefox, móvil físico, lector de pantalla, Cloudflare preview o producción. CLS=0 describe esta ejecución, no garantiza Core Web Vitals públicas.

### Pesos y carga inicial móvil

| Activo | Dimensiones | Bytes |
|---|---:|---:|
| Portada v2 | 1200×675 | 194.728 |
| Variante v2-400 | 400×225 | 27.414 |
| Paseo v1 | 1200×675 | 217.344 |
| Consulta v1 | 1200×675 | 182.646 |

Todos <250 KB; no se recomprimen los binarios auditados. El srcset usa la variante 400 existente, aunque Chromium eligió la principal 1200 en esta prueba, con la precarga del sitio.

Sin scroll: **194.728 bytes de cuerpo de imagen del artículo;195.028 transferidos**, solo portada y solo ella con `loading="eager"`. Consulta/paseo siguen `loading="lazy"` y sin descargar en esa fase. Con favicons:200.716 bytes de imágenes transferidos. Después de medirlo se fuerza decodificación de lazy únicamente para capturar todos los recursos: **594.718 bytes de cuerpo;595.618 transferidos** entre las tres. Los 300 bytes por respuesta son sobrecarga HTTP local, no transporte público.

[Resource Timing](publicacion/peso-imagenes.json), [hashes de activos](publicacion/imagenes-activas.json).

## Fuentes y reconciliación

Se abrieron las once referencias con herramienta web, distinta de curl, distinguiendo CAPTCHA, resumen y texto. No se certifican todos los accesos públicos: S1/S3 en PMC y S5 en bioRxiv se bloquean; S3 se leyó en la revista y S5 en copia del documento publicado. [Detalle por fuente y propuestas no aplicadas](publicacion/verificacion-fuentes.md).

- **Blackwell:** texto completo no obtenido; verificación parcial declarada.
- **Riemer publicado:** PDF editorial completo en espejo, identidad DOI y pasajes utilizados contrastados. Acceso directo a editorial/repositorio primario sin certificar.
- **Ficha española:** AEMPS y registro localizados; PDF regulatorio no leído por redirección/formulario. Verificación parcial declarada; atribución británica conservada. La copia del distribuidor no certifica vigencia regulatoria.
- **Málaga:** comunicado y guía gráfica originales localizados y abiertos. Tras la autorización «Ok, ajusta y audita», la entrada bibliográfica enlaza la fuente primaria y conserva la cobertura de prensa. Se retira la nota obsoleta; el cuerpo no cambia.

Tabla 2 y FAQ 4 distinguen encuesta de ensayos y no contradicen «moderada solo en miedo a tormentas» del brief de feromonas y del artículo de ansiedad por separación. [Registro](publicacion/reconciliacion-feromonas.json). La futura redacción conserva su tarea en TODO; no se edita el brief.

## Límites y decisiones antes de fusionar

1. Revisar código y después artículo. **Auditoría independiente breve del diff final completada**, por orden del propietario: traslado mecánico, enlaces, pesos y separación del código. Ver [R1 de publicación](auditoria-publicacion-r1.md) y cierre posterior. La R3 visual previa conserva su alcance propio.
2. El ajuste de Málaga está aplicado. Aceptar documentalmente o completar S2/S7; la propuesta bibliográfica opcional de Riemer queda separada. Estas verificaciones no sustituyen el cierre editorial.
3. Confirmar si se conserva la fecha heredada o se autoriza otra edición mecánica al conocer la fecha real de fusión. No anticiparla ni inventar dateModified.
4. Siguen en TODO: criterio 5.000–6.000 en skills, ES-06 roto, reconciliación futura de feromonas y versión latinoamericana con Osa/Baltor. Firma manual conservada conforme al encargo; su alineación con la automática sigue en la tarea general preexistente.
5. **Fusionar a main despliega producción.** Abrir estos PR no autoriza esa acción. Las pruebas descritas son locales; el estado de CI remoto se añadirá al cierre.

## Checklist POST-FUSIÓN, para otra sesión

- [ ] Orden expresa del propietario para código #148; después reorientar/actualizar el PR editorial a main, revisar diff/CI y obtener orden separada de fusión.
- [ ] Confirmar despliegue del commit autorizado y HTTP200 de `https://cuidatuperroviejo.com/salud-mental-emocional-perros/miedo-petardos-perros-mayores`, sin extensión, con canónico correcto.
- [ ] Abrir tres imágenes públicas, verificar dimensiones/hashes y srcset 400; pie editorial y alt separados.
- [ ] Probar390px claro/oscuro: imágenes estables, dos tablas legibles/apiladas, contraste y ausencia de desbordes; tres avisos visibles.
- [ ] FAQ inicialmente plegada y operativa; enlaces internos y entradas desde pilar/artículos del silo.
- [ ] JSON-LD público con fecha aprobada, imagen v2 y caption correcto; sin dateModified inventado.
- [ ] Sitemap público con URL nueva; llms HTTP 200 y descubrimiento del pilar/catálogo; catálogo y proyección públicos incluyen el artículo.
- [ ] Registrar fecha, commit, HTTP y pruebas vistas. **Solo entonces** marcar P1-03 `[x] Publicado` y cerrar TODO con fecha, commit y PR.


## Cierre de comprobaciones antes de abrir el PR editorial

Código #148: CI remoto **SUCCESS**, commit `625ef8a`, [ejecución 40302973256](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/40302973256). El check final del candidato editorial da 211 archivos, 0 errores, 0 warnings y 74 hints. Se repitieron build, proyección/guarda y navegador tras cerrar los dos puentes entre pilares; las 36 capturas son idénticas a las de la primera ejecución y los valores se mantienen. Se conserva la inspección real de las nueve capturas declaradas por identidad de bytes.

Como main no contenía el borrador, GitHub mostrará el MDX de destino como archivo añadido; la igualdad de hash acredita el traslado desde la rama documental. No se interpreta la ausencia de un rename en el diff como redacción nueva.


## PR abiertos: cierre de esta sesión

Ambos permanecen abiertos y draft, sin fusionar: **#148 código → main; #149 artículo → rama de código**. El primero contiene solo los tres archivos permitidos; el segundo no los incluye en su diff. Primer commit de integración editorial: `2894178` (146 archivos, 9.799.374 bytes físicos de los archivos del candidato, incluidas las modificaciones de documentación). Ese cierre actualizó solo referencias y estados; el ajuste bibliográfico autorizado posterior se describe al comienzo.

CI remoto del código: SUCCESS registrado. El CI del PR editorial se lanza al abrir/sincronizar el PR; consultar su estado vigente en GitHub. No se presenta la ausencia de un estado registrado como prueba superada. La entrega conserva todas las comprobaciones locales y el checklist post-fusión. No hay autorización implícita de publicación.


### Comprobaciones del ajuste bibliográfico

Recuento contractual 5.653; tono 0,0/1.000; `npx astro build` correcto y proyección/guarda semántica de 37 documentos correctas. Se conserva la evidencia visual anterior: no cambia ningún binario, componente, estilo o dimensión. La auditoría independiente evaluó por separado el diff de publicación R1; no se consume otra ronda visual ni se declara una aprobación propia.


## Cierre del ajuste y auditoría independiente — 2026-10-26

El agente independiente entrega **APTO el diff de integración: 0 P0, 0 P1 y 0 P2 nuevos confirmados**, en la primera ronda de publicación. [Informe íntegro](auditoria-publicacion-r1.md) y [métodos y evidencia propia](publicacion/auditoria-r1/README.md). Evalúa `main b79ee0b` → código `625ef8a` → artículo `de55e25`; los commits posteriores de cierre incorporan documentación, sin cambios adicionales de producto. El integrador conserva el informe sin editarlo y no emite un veredicto editorial propio.

La comparación independiente confirma que el MDX solo difiere del original auditado en la entrada bibliográfica S10. Los tres archivos compartidos siguen limitados al PR #148; binarios, clínica, cifras, FAQ, testimonios y fecha permanecen intactos. El auditor ejecutó sus comprobaciones de Git, HTML y navegador; los builds, contraste, CLS y capturas anteriores se identifican como pruebas del productor, no como nuevas pruebas del auditor.

**Calendario:** el auditor descargó y leyó los tres programas municipales originales de 2026: Fallas de Valencia, marzo; Fogueres de Alicante, junio; San Fermín de Pamplona, julio. Queda contrastado el requisito de meses habituales del brief §11. [URLs, páginas, tamaños y hashes](publicacion/auditoria-r1/programas-oficiales.json). No se certifican programas ni horarios de 2027, todas las localidades o cambios futuros; se conserva la indicación del artículo de consultar el programa local. No se modifica el brief ni la tabla del artículo.

**CI del ajuste:** `de55e25`, SUCCESS, [ejecución 40321092610](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/40321092610), consultada por el integrador tras la auditoría. Código #148 mantiene `625ef8a` y su CI SUCCESS. El cierre documental se empuja después y tendrá su propio CI; comprobar el HEAD vigente antes de fusionar.

**Pendiente para publicar:** cierre editorial de S2 (Blackwell completo) y S7 (ficha española del regulador), y orden expresa del propietario. La R1 conserva esos límites; no se inventa su aceptación. No hace falta otra ronda para corregir el diff, pues esta R1 no exige correcciones del producto. Después de la orden correspondiente: código #148 → reorientar/actualizar #149 a main → revisar diff y CI resultantes → orden de fusión del artículo → checklist público. Ambos PR permanecen draft, sin fusión ni despliegue; P1-03 sigue NO publicado.
