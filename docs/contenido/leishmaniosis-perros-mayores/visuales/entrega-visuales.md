# Producción visual v4 — decisión del propietario, 2026-10-25

**Estado: dos propuestas v4 integradas, con límites documentados para la decisión estética del propietario.** Siete candidatos de recorte y siete de consulta, catorce generaciones en modo edición. Esta producción parte de `903b786`, en `codex/leishmaniosis-articulo-revision`. No se abre otra ronda de auditoría, no se modifica `main`, no se abre PR ni se despliega.

Encargo: [prompt-correccion-visual-v4.md](../prompt-correccion-visual-v4.md). La portada y casa se mantienen sanas y mayores; consulta/recorte añaden las señales secas y superficiales autorizadas. La delgadez v3 se conserva como referencia corporal aceptada. La excepción se documenta, con fecha y alcance exclusivo de este artículo, en el [brief §8](../../../../briefings/briefing-leishmaniosis-perros-mayores.md) y la [dirección visual](../../../../.agents/skills/references/direccion-visual-editorial.md). No cambia los requisitos de otros artículos.

## Lo que puedes revisar

- **[Tabla de rasgos a 390 y al 100 %, candidato por candidato y límites](correccion-v4/inspeccion-candidatos.md)**. Es inspección del productor, no una auditoría independiente.
- Recorte final: [blanco a 390](correccion-v4/capturas/recorte-claro-390.png), [oscuro a 390](correccion-v4/capturas/recorte-oscuro-390.png), [recta cruz–grupa a 390](correccion-v4/capturas/recorte-recta-390.png) y [a 1200](correccion-v4/capturas/recorte-recta-1200.png).
- Zonas de recorte al 100 %, 300×300 del WebP final: [ojo](correccion-v4/capturas/recorte-ojo-100.png), [oreja](correccion-v4/capturas/recorte-oreja-100.png), [trufa](correccion-v4/capturas/recorte-trufa-100.png), [pelaje](correccion-v4/capturas/recorte-pelaje-100.png), [uñas](correccion-v4/capturas/recorte-unas-100.png).
- Zonas de consulta al 100 %: [ojo](correccion-v4/capturas/consulta-ojo-100.png), [oreja](correccion-v4/capturas/consulta-oreja-100.png), [trufa](correccion-v4/capturas/consulta-trufa-100.png), [pelaje](correccion-v4/capturas/consulta-pelaje-100.png), [uñas](correccion-v4/capturas/consulta-unas-100.png), [punción](correccion-v4/capturas/consulta-puncion-100.png).
- Consulta integrada: [390 claro](correccion-v4/capturas/390-claro-consulta.png), [390 oscuro](correccion-v4/capturas/390-oscuro-consulta.png), [1366 claro](correccion-v4/capturas/1366-claro-consulta.png), [1366 oscuro](correccion-v4/capturas/1366-oscuro-consulta.png).
- Animación: [390 claro](correccion-v4/capturas/390-claro-revision-1.png), [390 oscuro](correccion-v4/capturas/390-oscuro-revision-1.png), [1366 claro](correccion-v4/capturas/1366-claro-revision-1.png), [1366 oscuro](correccion-v4/capturas/1366-oscuro-revision-1.png). Se conservan capturas de los seis pasos en cada modo.

**No quedan acreditados todos los detalles del prompt.** En el recorte no distingo una costra marrón separada de las escamas de la punta de la oreja. En ambas imágenes las fisuras finas de la trufa no se resuelven inequívocamente. La propuesta conserva aro periocular, escamas, parches claros de trufa, caspa y uñas; el alt no atribuye costra ni fisuras no confirmadas. La alternativa si se exige ese detalle exacto es una edición focal de punta y trufa por un ilustrador, manteniendo la escena. La consulta 4 se conserva como alternativa con costra de punta especialmente legible.

A 390 se distinguen el aro de piel con pelo ralo y las uñas largas/curvas. El borde escamoso, la caspa fina y los parches de trufa se documentan al 100 %; no se dan por identificables individualmente a 390. Las canas del hocico y cejas se leen, pero los pelos finos del borde palpebral no se separan a esa escala. Todos estos «sí/no» constan en la tabla.

## Recursos y coherencia

| Recurso | Actual | Cambios |
|---|---|---|
| Portada y casa | `mestizo-senior-colocacion-collar-v1`, `mestizo-senior-anochecer-mosquitera-v1` | Archivos, alts y pies sin cambios respecto de 903b786. |
| Recorte | `mestizo-senior-recorte-perfil-v4` | Candidato 7; perfil derecho, cabeza baja, lomo cóncavo, muslos estrechos, cuatro patas y alfa. Aro periocular y uñas visibles a 390. |
| Consulta | `mestizo-senior-analisis-sangre-consulta-v4` | Candidato 7; misma escena, tutora/veterinaria, collar gris, mesa/alfombrilla y jeringa. Aro, escamas y uñas añadidos. |
| Animación | [LeishmaniosisRevision.astro](../../../../src/components/article/LeishmaniosisRevision.astro) | Imagen v4, marcadores recolocados por la pequeña variación de escala del recorte, alt, introducción, seis pasos y nota metodológica adaptados. Mecánica conservada. |
| Calendario y dos tablas | Componentes anteriores | Sin cambios. Contraste incluye cabeceras. |

Solo para consulta/recorte, las señales autorizadas sustituyen la exclusión anterior de enfermedad. No se ilustra un paciente real, no se diagnostica por aspecto y no se asigna un estadio clínico por la imagen. Introducción y alt del recorrido, pie/alt de consulta y pasos recuerdan que **son señales posibles y muchos perros infectados se ven normales**. La nota esencial y el último paso aclaran que **la ausencia de lesiones no descarta infección**. Se elimina la afirmación anterior de que la ilustración no representaba lesiones.

La jeringa conserva cilindro transparente, émbolo, poco rojo dentro y un tramo de aguja que termina en el antebrazo, sin sangre exterior. El pulgar de sujeción está proximal. La imagen no permite acreditar el interior de una vena ni medir un ángulo anatómico tridimensional. Se ven el apoyo delantero opuesto y un apoyo trasero; el otro apoyo trasero queda oculto por los brazos y el pie muestreado está parcialmente tapado. No se promete que puedan contarse los cuatro pies o verificarse todas sus uñas.

Las seis variantes nuevas son **1200×675, 800×450 y 400×225**. Recorte con alfa real 0–255 en los tres tamaños, consulta opaca. Doce WebP activos: **1.077.380 bytes**; doce variantes v2/v3 históricas se conservan, total veinticuatro archivos y **2.130.922 bytes**. [Archivos y SHA-256](archivos.json), [medidas de las variantes nuevas](correccion-v4/mediciones-imagenes.json), [SHA de originales y capturas](correccion-v4/evidencias-sha256.json).

Los catorce PNG originales, descartes y setenta recortes nativos de 300×300 por región se conservan en [candidatos/](correccion-v4/candidatos/). [Prompts ingleses completos](prompts.md), [las catorce ediciones con adendas](correccion-v4/prompts-generaciones.md), [referencias y selección](correccion-v4/generaciones.json). Los candidatos 1–6 editan cada v3 con portada v1 como identidad; el séptimo edita el sexto para distinguir mejor el aro, manteniendo esa referencia de identidad.

Recta del recorte: grupa `(370,85)`, cruz `(760,74)`, contorno dorsal `(550,136)`. Separación vertical: **56,1 px a 1200; 18,2 px a 390**. Nariz por debajo de la cruz. Son puntos manuales de silueta, no un clasificador de edad. No percibo halo a 390 sobre blanco ni `#1a1a1a`. [Método reproducible](correccion-v4/diagnosticos.cjs).

## Texto de R2 conservado

- R2 archivado: `fb0c77099efe30c3d6b3b677807dcca0e982427b61098bfbad7adfd3f2e63a2b`, [archivo intacto](texto-aprobado-r2.mdx).
- MDX actual: `f449151f705f33b2493ccaa9816e9ce4ba78bfbf9b533ff1dffbab603ebb0220`. Copia `../articulo-borrador.mdx` idéntica.
- Frente a 903b786 cambia **solo la figura de consulta**: rutas/srcset, alt y pie. Cero líneas del texto R2 retiradas o reescritas. Los cambios en el texto de pasos pertenecen al componente y están autorizados por el encargo. [Integridad](correccion-v4/integridad-texto.json), [diff desde R2](integracion.diff), [SHA de integración](integracion-texto.json).
- [Proyección Markdown](proyeccion-markdown.md) y [lectura para GitHub](../articulo-lectura.md) regeneradas desde el build. El informe, métricas y capturas de `correccion-r3/` son históricos; no se alteran.

## Verificaciones locales

`npx astro build`: código 0, 36 documentos de proyección. `npx astro check`: **0 errores, 0 warnings y 73 hints** del proyecto. [Build](correccion-v4/build.log), [tipos](correccion-v4/astro-check.log). No cambian configuración, dependencias ni estilos globales.

Chromium sobre el build estático, a anchos 390 y 1366, claro/oscuro. La altura de ventana se inicia en 1200 y se amplía al capturar un recurso más alto, para que entre completo; el ancho permanece fijo. [Resultados](correccion-v4/verificacion-navegador.json), [script reproducible](correccion-v4/verificar.cjs), [registro](correccion-v4/navegador.log).

| Medición | 390 claro / oscuro | 1366 claro / oscuro |
|---|---|---|
| `scrollWidth` | 390 / 390 | 1366 / 1366 |
| Revisión, máximo de seis pasos | 736,4 / 736,4 px | 844,8 / 844,8 px |
| Calendario | 884,8 / 884,8 px | 782,7 / 782,7 px |
| Tabla señales | 876,3 / 876,3 px | 695,9 / 695,9 px |
| Tabla pruebas | 754,3 / 754,3 px | 625,3 / 625,3 px |
| Contraste con cabeceras de tablas | **4,50:1 / 5,52:1** | **4,50:1 / 5,52:1** |

A 375 px: `scrollWidth=375`, controles ≥44×44; calendario 901,1 px, aproximadamente el límite orientativo de 900. [Mediciones](correccion-v4/estrecho-375.json). Imágenes decodificadas: cuerpo/recorte usan variante de 400 en móvil y 800 en escritorio; portada sirve 1200 según el helper existente.

Sin autoplay, avance cada cinco segundos, pausa estable, fin tras seis pasos, repetición, flechas de teclado, foco visible de 3 px y controles/desplegables ≥44 px. Movimiento reducido permite avance manual y deshabilita reproducción. Sin JavaScript muestra los seis pasos sin controles, **878,5 px** en móvil. En impresión desde ambos temas se ven seis pasos sin controles, tinta `rgb(32,62,50)` sobre blanco. [Sin JS](correccion-v4/capturas/sin-javascript.png), [movimiento reducido](correccion-v4/capturas/movimiento-reducido.png), [impresión desde oscuro](correccion-v4/capturas/390-oscuro-impresion-revision.png).

Siete FAQ operables con Enter, anclas internas válidas y cero errores JavaScript. Se prueba reinicialización sin eventos duplicados, `pagehide` y navegación Astro; el manejador de ocultación se comprueba simulando `document.hidden` y disparando `visibilitychange`.

Las capturas aisladas ocultan solo durante la captura elementos fijos/flotantes del sitio. Google Fonts se descarga con `curl`, proxy y confianza TLS heredados, y se sirve al navegador desde caché; otros terceros se bloquean. Lora, Outfit y Plus Jakarta Sans cargadas; TLS no se desactiva. No se han probado Safari/Firefox, móvil físico, lector de pantalla ni papel/PDF: la impresión se emula en navegador. No se comprueba publicación pública ni despliegue.
