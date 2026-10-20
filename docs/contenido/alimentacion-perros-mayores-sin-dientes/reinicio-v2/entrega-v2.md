# Entrega v2 para revisión del propietario

Guía nueva sobre alimentación para perros mayores sin dientes, creada desde investigación y brief nuevos tras el rechazo completo de v1. **5.858 palabras editoriales visibles**, medidas en la página compilada y comprobadas por separado por coordinación y auditoría. No se ha ampliado el texto rechazado.

Esta versión no se ha desplegado. Rama `contenido/alimentacion-perros-mayores-sin-dientes`, [PR #123 en borrador](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/123), sin fusionar. La aceptación del propietario sigue pendiente.

## Leer y ver

- [Artículo completo con recursos interactivos, HTML autocontenido](revision/lectura-interactiva.html).
- [Artículo completo en PDF de lectura](revision/articulo-completo.pdf): 20 páginas, etiquetado y con marcadores; FAQ desplegado y ocho pasos completos. Las animaciones se representan estáticamente en PDF.
- [Vista móvil de lectura](revision/390-lectura.png) y [escritorio](revision/1366-lectura.png).
- [Primera animación en móvil](revision/390-animacion-base.png) y [segunda animación](revision/390-animacion-ingesta.png).

El HTML incorpora imágenes, estilos y scripts, y se verificó sin solicitudes externas. Los enlaces a fuentes y otros artículos necesitan Internet. La vista privada omite navegación general, asistente, publicidad y barra fija de progreso; utiliza fuentes locales. El PDF tiene una maquetación compacta para lectura, sin alterar el contenido. Las capturas del sitio real, con sus overlays, se conservan por separado en [verificación](verificacion/) y [auditoría](capturas-auditor-r2/).

Chromium del entorno bloquea `file://`: el autocontenido se probó mediante respuesta local interceptada de Playwright, con los demás accesos HTTP/HTTPS bloqueados. No se afirma haber abierto directamente el archivo mediante ese protocolo en este entorno. [Pruebas de lectura](revision/verificacion-lectura.json).

## Contrato, auditorías e historial

- [Brief v2](../../../../briefings/briefing-alimentacion-perros-mayores-sin-dientes-v2.md): **APTO R2/3**. [R1 NO APTO](auditoria-brief-r1.md), [corrección separada](correccion-brief-r1.md), [R2 APTO](auditoria-brief-r2.md). El archivo contractual conserva el estado que tenía al emitirse su hash; el veredicto está en el informe.
- [Artículo editorial R1](auditoria-articulo-r1.md): APTO EDITORIAL PROVISIONAL, antes de producir recursos; no se presentó como cierre del conjunto.
- [Artículo integrado R2](auditoria-articulo-r2.md): **APTO / Publicable para entrega y revisión del propietario**, sin autorizar publicación. 98 comprobaciones propias sin fallos pendientes; tercera ronda sin consumir.
- [Encargo, roles y rondas](encargo-y-rondas.md). Las series anteriores se conservan como rechazadas; no certifican v2 ni se renumeran. El propietario ordenó expresamente un nuevo inicio.
- [Artículo MDX final](../../../../src/content/blog/alimentacion-perros-mayores-sin-dientes.mdx), [informe de redacción](informe-redaccion-v2.md), [producción visual](produccion-visual-v2.md), [corrección técnica de tablas](correccion-tecnica-tablas.md).

La investigación y la redacción fueron realizadas en roles distintos de auditoría y corrección. Se verificaron catorce fuentes profundas y sus afirmaciones; guía sin caso clínico ni experiencias, credenciales o revisión veterinaria inventadas. [Registro de fuentes](fuentes/verificacion-creador.md).

## Conteo que se entrega

El contrato cuenta prosa, encabezados, tablas editoriales, AlertBox y FAQ una vez. Excluye código, etiquetas, metadatos, navegación, bibliografía, pies de imagen y componentes visuales completos, incluido el registro. Resultado DOM: **5.858**, dentro de 5.700–6.300; todas las secciones dentro de ±15 % de su presupuesto. El AST preliminar dio 5.844: la diferencia procede de separaciones del texto renderizado, no de añadir contenido. No se presenta el contador de sintaxis MDX como palabras leídas.

[Desglose DOM reproducible](conteo-editorial-dom.json), [texto contado](texto-editorial-contado.txt), [conteo propio del auditor](verificacion-dom-extra-auditor-r2.json). Densidad editorial: media 38,33, mediana 39, máximo 43 palabras. En móvil la tipografía vigente produce más de tres líneas por párrafo; se midió la lectura real y no se dedujo de esos promedios un máximo de tres líneas.

## Recursos integrados

| Recurso | Entrega y comprobación |
|---|---|
| Cinco escenas del mismo beagle senior | Tres reutilizadas y dos nuevas: medición de alimento base y conversación sobre registro en consulta. Quince WebP 1200/800/400, decodificados; IA identificada visiblemente. |
| Dos imágenes nuevas | [Medición](../../../../public/images/blog/alimentacion-perros-mayores-sin-dientes/medir-racion-base-beagle-senior-v2.webp), [consulta](../../../../public/images/blog/alimentacion-perros-mayores-sin-dientes/registro-alimentacion-consulta-beagle-senior-v2.webp); originales preservados y [manifiesto](manifiesto-imagenes-nuevas.json). |
| Dos animaciones nuevas | Cuatro estados por proceso: base/presentación y plato/registro. Cambios reales de recipientes, volumen, restos y datos; sin simular movimiento corporal del perro. |
| Controles | Sin autoplay, avance manual, reproducción/pausa, fin y repetición; teclado y objetivos de 44 px. Movimiento reducido, limpieza de temporizadores y alternativas sin JavaScript e impresión. |
| Tres apoyos editoriales | Matriz de situaciones, ficha de etiqueta y comparación de presentaciones. Tablas con caption/nombre y foco en la región que realmente se desplaza. |
| Registro local imprimible | Diez campos sin envío ni almacenamiento. Botón probado con eventos reales de impresión; valores máximos preservados y comprobados en una A4 a 10 pt. |

No se presenta al beagle como paciente real ni la boca cerrada como prueba de ausencia de dientes. El componente v1 rechazado y sin usos se retiró de `src` y se conserva como antecedente en `componente-v1-rechazado.astro.txt`.

## Validación

- Build final correcto, 33 documentos proyectados. `astro check`: 0 errores, 0 advertencias y 62 hints preexistentes.
- 107 pruebas generales y 77 pruebas offline de agent-readiness: todas pasan.
- Inventario, descubrimiento, proyección Markdown, API, routing y semántica compilada: todos con salida 0. [Registros](verificacion/).
- Coordinación comprobó 390/1366 px en claro/oscuro: cinco imágenes decodificadas, dos secuencias manuales, anclas resueltas, sin overflow global ni errores JS y cero infracciones axe en el artículo. Alternativa sin JS a 375 px con ocho pasos.
- Auditoría ejecutó pruebas propias de ambos temas, reflujo 320 px, contraste, teclado, temporizadores, pausa, repetición, movimiento reducido, sin JS, impresión y valores máximos. Las simulaciones de eventos de ciclo de vida y los límites de los harness se identifican como tales en su evidencia.
- El PDF privado está etiquetado; no se declara certificación PDF/UA. Las comprobaciones de navegador son locales en Chromium y no acreditan todos los navegadores ni una revisión clínica.

El primer intento de pruebas generales no pudo abrir el IPC de tsx bajo el sandbox; se repitió con la capacidad de red del entorno y pasó. La primera revisión de accesibilidad sí detectó un problema real de foco en tablas: se corrigió y se recompiló antes del cierre. Los registros previos se conservan, sin presentarlos como éxitos.

En los registros de consola se normalizaron espacios al final de línea; no se cambiaron mensajes, cifras ni resultados.

[Hashes finales de contrato, producto, build y lectura](verificacion/versiones-finales.json). Las pruebas remotas de CI se consultan en la PR; su resultado no sustituye la revisión visual local.

La [CI del commit de producto `0eb000b`](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/39488609213) terminó correctamente, incluida la compuerta completa del repositorio. [Resultado](verificacion/ci-producto.json) y [pasos](verificacion/ci-producto-jobs.json). Las actualizaciones posteriores de este expediente solo añaden esta evidencia y la comprobación remota de no despliegue; los hashes del producto aprobado permanecen iguales. La cabeza de la PR muestra además su propia ejecución vigente en Checks.

## Publicación e incidencia anterior

Se comprobó mediante lectura de la API que esta rama sigue excluida del disparador de versiones de prueba de Cloudflare. Producción conserva el despliegue del 18 de octubre. [Comprobación previa](verificacion/cloudflare-antes.json).

Después de subir el commit de producto, el build más reciente de Cloudflare sigue siendo el de v1 del 20 de octubre a las 01:48 UTC, asociado al commit `05bc868`; no se creó una versión nueva de v2 y producción sigue en la misma versión. [Comprobación posterior al push](verificacion/cloudflare-despues.json).

La versión automática que se creó durante v1 sigue registrada, como documenta la [incidencia anterior](../incidencia-preview-automatica.md). No se reutiliza como vista autorizada de v2. El estado técnico `Publicado` del frontmatter es requerido por el catálogo del repositorio; no acredita ni autoriza publicación pública. Inventario, PR y entrega permanecen pendientes de publicación.
