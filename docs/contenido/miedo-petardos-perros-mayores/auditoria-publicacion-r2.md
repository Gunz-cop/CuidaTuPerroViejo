# Auditoría independiente del ajuste de publicación — R2

## Veredicto

**APTO el ajuste documental R2: 0 P0, 0 P1 y 0 P2 nuevos. S2/S7 quedan resueltos para las atribuciones y fuentes elegidas; no acredita publicación.**

Fecha: 2026-10-26. Segunda ronda de este expediente de publicación, máximo tres. Base R1: `1d1c389e0f39257bfc52b46fcb7ae3beefa32095`. Versión congelada revisada: **`e35073e204e6d3f46b74db498fb747724981f512`**. MDX SHA-256: **`876247f430552cdef962da67d64e3ff5ddd0af0a19801dcf5212a6a7b0a6857c`**.

Auditor independiente del productor, sin corregir producción. Alcance: cuatro líneas del MDX, su fidelidad a Blackwell, respaldo británico de S7, autorización de esa elección, integridad y recuentos afectados. Se conserva el método de AGENTS/CLAUDE y la skill de auditoría ya aplicada en R1. No se reabren el brief, la auditoría clínica ni la visual R3.

## Hallazgos

**P0: ninguno. P1: ninguno. P2: ninguno** en el ajuste revisado. No se requiere una R3 por esta versión.

## Comprobaciones propias del cambio

Git confirma **exactamente cuatro sustituciones**, en las líneas **52, 82, 99 y 488** de `src/content/blog/miedo-petardos-perros-mayores.mdx`. El resto del archivo es idéntico, incluidos frontmatter, fecha, fármacos, recomendaciones, cifras, FAQ y testimonios. Ningún otro archivo de `src/` o `public/` cambia entre base y HEAD.

Se contrastaron los nueve hashes de `publicacion/producto-verificado.json` con los archivos reales y los blobs Git. Código compartido, mapa de enlaces y cuatro WebP activos conservan sus bytes. Siguen retenidos solo tres PNG finales. Brief, testimonios, visuales, informe R1 y sus evidencias permanecen íntegros; no se modifican retrospectivamente sus conclusiones. [Integridad propia](publicacion/auditoria-r2/integridad-diff.json), [cuatro reemplazos exactos](publicacion/auditoria-r2/mdx-diff.md).

El manifiesto actual distingue correctamente las precisiones de atribución del contenido anterior: no presenta el traslado como literal después de este cambio ni declara que toda la prosa clínica permaneció inalterada. La entrega identifica la corroboración como posterior a R1. TODO mantiene pendiente la revisión/fusión y el inventario conserva NO publicado.

### Recuento de las secciones afectadas

Ejecución propia del método contractual original, con títulos incluidos y bibliografía excluida: **5.659 palabras**, frente a 5.653 en la base; rango 5.300–6.000. Los tres H3 continúan dentro de ±10 %:

| H3 | Real / target | Desviación |
|---|---:|---:|
| El miedo al ruido es frecuente, pero con la edad los datos no son uniformes | 238 / 220 | +8,18 % |
| No confundir con la ansiedad por separación | 82 / 80 | +2,50 % |
| Qué midió el análisis de vídeo | 170 / 170 | 0 % |

H2 afectados: 551/540 (+2,0 %) y 555/560 (−0,9 %). Targets del brief, líneas 239, 248 y 256. [Recuento propio](publicacion/auditoria-r2/recuento-propio.json).

## S2: fuente → atribución → contraste

Se reutiliza de forma explícita **mi investigación documental previa en esta misma sesión**: apertura de Bristol y lectura del texto publicado mediante la transcripción pública enlazada, con métodos, resultados, discusión y tablas. No se finge una nueva lectura. El JSON integrado por el productor es semánticamente idéntico al resultado que entregué. [Registro propio de R2](publicacion/auditoria-r2/s2-contraste-propio.json).

| Línea revisada | Pasaje del estudio leído | Resultado |
|---|---|---|
| 52: cuarta parte «en el conjunto de participantes» | §3.2, p19; §4.2, pp22–23 | Distingue correctamente el conjunto combinado y la entrevista estructurada. |
| 82: «no solían presentarse junto con» conductas de separación | §3.2, p19; §4.3, p23 | Conserva coexistencia infrecuente y permite que los problemas convivan; elimina una generalización más fuerte. |
| 99: señales reconocidas sin identificarlas como miedo | §3.4/tabla 5, p20; §§4.1–4.2, pp22–23 | Describe la diferencia entre conducta observada e interpretación del propietario. |
| 488: repositorio y copia pública publicada | Encabezados pp15–25, identidad contra Bristol/Crossref | Declara el soporte real de consulta. No lo presenta como PDF editorial descargado. |

La formulación más fuerte sobre separación ya estaba en el brief §6, línea 249. Esta revisión registra ese origen sin reauditar ni corregir el brief; la precisión actual responde al contraste primario solicitado.

**S2 queda cerrado para las afirmaciones utilizadas.** La limitación anterior «solo abstract» ha sido superada por la lectura textual. Se mantienen los límites comprobados: copia de tercero, columnas intercaladas y artefactos de transcripción, gráficos no inspeccionados, sin acceso editorial directo ni certificación binaria del PDF o autorización de la copia. Las afirmaciones revisadas no dependen de esos gráficos. No se usa el título o resumen de IA de la plataforma como respaldo.

## S7: fuente británica primaria y decisión editorial

Abrí el [PDF oficial del VMD](https://www.vmd.defra.gov.uk/productinformationdatabase/files/SPC_Documents/SPC_3219375.PDF) con herramienta web y lo descargué por mi cuenta: HTTP200, 727.452 bytes, SHA-256 **`845fb79d99da08adf99f6d547f86383156e4a1ed1d3281d8fcb25c9431dbc066`**, coincidente con el expediente. Documento de diez páginas, emitido en marzo de 2026; se contrastaron sus páginas 1–3.

| MDX sin cambios | Fuente | Resultado propio |
|---|---|---|
| 208: contraindicaciones graves cardiovasculares o sistémicas; ejemplos terminales renales/hepáticos | §3.3, p1 | Coincide. |
| 212: seguridad no estudiada por encima de diecisiete años | §3.5, p2 | Coincide; no afirma seguridad por debajo del umbral. |
| 212: vómitos, sedación, incontinencia urinaria y palidez local transitoria | §3.6 y nota 1, p3 | Los cuatro constan en la categoría frecuente; la nota acota la palidez al lugar de aplicación. |

El texto de urgencia de la línea 214 se mantiene separado de ese efecto local; no se atribuye a la ficha una regla general sobre cualquier encía pálida. No se añaden dosis, pautas, marcas o conclusiones farmacológicas. [Evidencia propia VMD](publicacion/auditoria-r2/s7-vmd-propia.json).

**S7 queda resuelto mediante la fuente primaria británica explícitamente elegida por el propietario.** La autorización registrada en `publicacion/corroboracion-s2-s7.json` coincide con el encargo de esta sesión: se permite priorizar esa fuente y prescindir de una mención española ornamental. Sustituye el requisito anterior del brief §9.6.4 para esta entrega; no equivale a haberlo cumplido mediante una lectura española inexistente.

El registro mantiene `pdf_espanol_del_regulador_leido: false`, no declara equivalencia o vigencia española y no convierte la copia del distribuidor en respaldo regulatorio. La limitación de acceso española continúa documentada. Inspeccioné además el PDF EMA previo guardado por el productor: contiene únicamente una remisión al registro, no una ficha técnica. No repetí la búsqueda española completa ni atribuyo a esta R2 nuevas descargas de esa ficha.

## Lo que sí funciona

Las precisiones corrigen el significado sin incorporar datos, intervenciones o conclusiones nuevas. El pasaje de S7 ya identifica el país de la ficha. El expediente distingue lectura del texto publicado, acceso editorial y PDF original; también diferencia la elección autorizada de una fuente de una verificación española no realizada. Conservar esas distinciones y los informes históricos.

## Evidencia propia, previa y límites

**Propia en R2:** diff/blobs/hash, comparación de manifiestos, comprobación de protegidos, recuento y tres H3, lectura y descarga oficial VMD, inspección del artefacto EMA anterior y de la proyección local actual. Los cuatro fragmentos nuevos están en el Markdown construido, cuyo hash coincide con el manifiesto; no se ejecutó otro build. [Proyección](publicacion/auditoria-r2/proyeccion-local.json), [método y reproducción](publicacion/auditoria-r2/README.md).

**Propia anterior, reutilizada:** investigación S2 descrita arriba. **Del productor, no repetida:** check de 212 archivos, 0 errores, 0 advertencias y 74 hints; build/proyección correctos y guarda semántica de 37 documentos; tono 0,0/1.000. El CI remoto `40351805943`, SUCCESS para `e35073e`, fue comunicado por el integrador, no consultado por este auditor. No se repiten capturas, contraste, CLS, revisión anatómica o pruebas públicas.

## Qué completar

**Ninguna corrección exigida para aprobar R2.** Puede registrarse este cierre documental de S2/S7 con sus límites. La revisión no ordena fusionar ni publicar: se mantiene el orden código → artículo, la revisión del diff/CI al cambiar la base y el checklist de despliegue. Solo después de verificar producción corresponde marcar Publicado.

El auditor solo añade este informe y `publicacion/auditoria-r2/`. Sin edición de producto, documentos del productor o informes previos; sin commits, push, reviews, comentarios externos, merge o despliegue.
