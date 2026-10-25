# Producción e integración visual — 25 de octubre de 2026

**Estado:** recursos producidos, integrados y comprobados por su productor. Pendiente revisión visual independiente R3; **sin publicación ni despliegue**. No es una auditoría ni un APTO emitido por quien produjo.

Rama: `codex/leishmaniosis-articulo-revision`. Artículo integrado: [`src/content/blog/leishmaniosis-perros-mayores.mdx`](../../../../src/content/blog/leishmaniosis-perros-mayores.mdx). La copia de revisión `../articulo-borrador.mdx` tiene los mismos bytes. El inventario conserva `[~]` y se añadió al brief una nota de ejecución, sin alterar su contrato científico o visual. No se modifica `main` ni se abre PR.

## Texto aprobado y versión integrada

- R2 textual: `fb0c77099efe30c3d6b3b677807dcca0e982427b61098bfbad7adfd3f2e63a2b`, conservado en [texto-aprobado-r2.mdx](texto-aprobado-r2.mdx).
- MDX integrado: `36cfbcc0739e1f0e0a3ac77741cd89a83146eee3268354f92faef3662a221439`.
- [Comparación](integracion.diff) y [comprobación de integridad](integracion-texto.json): **cero líneas del MDX aprobado eliminadas o reescritas**. Solo se añaden frontmatter de portada, imports, envoltorios visuales de tablas, imágenes/pies, la referencia a la animación y los componentes.
- La versión de lectura se regenera desde la proyección real del build. Sus imágenes usan rutas relativas a los archivos de esta rama para que se puedan ver en GitHub. La proyección original se conserva en [proyeccion-markdown.md](proyeccion-markdown.md); su URL canónica no implica que el artículo esté publicado.

## Recursos entregados

| Recurso | Función y ubicación | Archivos reales / referencia |
|---|---|---|
| Portada: collar | Prevención; comprobación de holgura en un recibidor | `mestizo-senior-colocacion-collar-v1.webp`; primera referencia inspeccionada para el resto |
| Casa al anochecer | Cama dentro de casa y mosquitera visible; H2 de prevención | `mestizo-senior-anochecer-mosquitera-v1.webp`; derivada de la portada |
| Consulta y sangre | Extracción por una veterinaria, sujeción suave; H2 de pruebas | `mestizo-senior-analisis-sangre-consulta-v2.webp`; v1 descartada por collar tapado |
| Recorte transparente | Base común de los seis estados del recorrido | `mestizo-senior-recorte-perfil-v2.webp`; v1 descartada por cabeza demasiado alta |
| Revisión de cinco puntos | Orejas → ojos/hocico → uñas → cuerpo → rutina → consulta | [`LeishmaniosisRevision.astro`](../../../../src/components/article/LeishmaniosisRevision.astro) |
| Calendario de riesgo | Tres fuentes separadas por alcance; sin perro | [`LeishmaniosisCalendario.astro`](../../../../src/components/article/LeishmaniosisCalendario.astro) |
| Tablas adaptadas a móvil | Conservan íntegros los datos aprobados; etiquetas visuales abreviadas | [`LeishmaniosisTabla.astro`](../../../../src/components/article/LeishmaniosisTabla.astro), envoltorio de las dos `TablaApilable` |

Las doce variantes WebP están en `public/images/blog/leishmaniosis-perros-mayores/`: **1200×675, 800×450 y 400×225** para cada recurso. Total: **1.029.630 bytes**. Las escenas son opacas; las tres variantes del recorte conservan alfa real, con valores de 0 a 255. Dimensiones, tamaños y SHA-256: [archivos.json](archivos.json).

Los seis originales PNG se conservan en `originales/`, también las dos versiones descartadas. Los [prompts y adendas](prompts.md) documentan el ambiente, gesto, luz, continuidad y bloque senior de cada generación. La consulta tiene tres apoyos y una pata ligeramente levantada para hacer físicamente coherente la extracción. El recorte v2 baja la cabeza; la consulta v2 deja visible el collar gris.

## Inspección senior y coherencia a 390 px

Inspección visual propia sobre los WebP finales reducidos a 390 px, **no aprobación del usuario ni auditoría independiente**. Misma perra ilustrativa pastor-mastín atigrada oscura, pecho y calcetines blancos, orejas semicaídas y punta de cola blanca. El collar gris se conserva en las tres escenas y se omite en el recorte. Ninguna imagen representa un paciente o un resultado clínico.

| Imagen final | Canas: hocico, cejas y párpados | Ojos algo hundidos | Lomo y musculatura | Postura natural | Sin patología inventada |
|---|---|---|---|---|---|
| Collar | Canas claras sobre cara oscura | Órbita sombreada y párpado relajado | Dorso suavizado y cadera de menor relieve muscular | Sentada, apoyos estables | Sin lesiones, velo ocular ni sufrimiento |
| Casa | Canas de cara y bordes oculares visibles | Mirada serena y párpado relajado | Hombros y cadera visibles sobre la cama | Echada, cuello relajado | Sin signos clínicos añadidos |
| Consulta v2 | Canas de cara, cejas y párpados | Ojo marrón sereno, algo hundido | Dorso suavizado, hombro y cadera visibles | Tres apoyos estables durante la toma | Sin lesiones inventadas ni dramatismo |
| Recorte v2 | Canas de hocico, cejas y contorno ocular | Ojo hundido y párpado relajado | Ligera depresión tras la cruz y menor masa muscular | Cabeza baja, cuatro patas distinguibles | Sin cojera, emaciación, heridas ni cataratas |

Evidencia: [collar](capturas/senior-collar-390.png), [casa](capturas/senior-casa-390.png), [consulta](capturas/senior-consulta-390.png), [recorte sobre blanco](capturas/senior-recorte-claro-390.png) y [recorte sobre gris oscuro](capturas/senior-recorte-oscuro-390.png). En los dos fondos se comprobaron alfa y bordes; sin halo perceptible a esta escala. La animación reutiliza ese recorte estático: no genera nuevas poses ni simula movimiento del cuerpo.

## Qué explican los componentes y de dónde sale

La revisión traduce las señales ya aprobadas de AEMPS/MAPA y LeishVet a zonas visibles; el quinto punto recuerda la rutina y el sexto conduce a consulta. Es una organización editorial, no una escala diagnóstica. Las señales de urgencia permanecen visibles debajo, fuera de la interacción.

El calendario conserva las tres atribuciones del texto: Alten 2016 (datos de 2011–2013), ESCCAP 2012 y OCV vía Europa Press 2024. Distingue exposición y máximo potencial del estudio de la recomendación de protección. Las celdas claras o rayadas tienen explicación textual y nombres accesibles por mes; las filas se apilan por fuente. El límite de Fuenlabrada y la decisión de la clínica se conservan. Es HTML, por lo que no requiere `title`/`desc` de SVG; la secuencia sí incluye título y descripción del esquema SVG.

No se añaden dosis, marcas de productos, eficacia vacunal, porcentajes de riesgo ni decisiones clínicas nuevas. Los pies y alt describen lo que muestran las escenas. Se mantienen 3 avisos, 2 tablas y 7 FAQ. Portada y `og:image` ya apuntan a una ilustración real de este artículo; la firma global de IA concuerda con los recursos.

## Pruebas del productor

**Build y tipos:** `npx astro build` termina con código 0 y genera 36 documentos de proyección; `npx astro check`: 0 errores, 0 warnings y 65 hints del proyecto. Registros: [build.log](build.log), [astro-check.log](astro-check.log). Las rutas de imagen se decodificaron en el navegador y las explicaciones siguen presentes en Markdown.

**Navegador:** Chromium con el build real servido desde `dist/client`, a 390 y 1366 px, claro y oscuro. Comprobación adicional de desbordamiento y objetivos táctiles a 375 px. [Resultados completos](verificacion-navegador.json), [375 px](estrecho-375.json), [script reproducible](verificar.cjs). Sin errores JavaScript.

| Recurso | Máximo a 390 px, claro/oscuro | 1366 px, claro/oscuro |
|---|---:|---:|
| Revisión, entre los seis estados | 713,9 px | 822,2 px |
| Calendario, notas cerradas | 865,8 px | 782,7 px |
| Tabla de señales | 876,3 px | 695,9 px |
| Tabla de pruebas | 754,3 px | 625,3 px |

Todos quedan por debajo de 900 px en su estado inicial a 390 px. La alternativa sin JavaScript mide 819,4 px y muestra todos los pasos como texto; en móvil omite el dibujo repetido y compacta la tipografía. En impresión, con y sin JavaScript, se muestran los seis pasos y se ocultan los controles.

Se verificaron ausencia de autoplay, avance temporizado, pausa estable, reproducción finita, repetición, flechas y teclado, foco visible de 3 px, objetivos táctiles de al menos 44 px y navegación manual con movimiento reducido. Las siete FAQ siguen presentes y su apertura/cierre con Enter se comprobó en cada tamaño y tema; todas las anclas internas apuntan a un ID existente. También se comprobaron reinicialización sin listeners duplicados y parada con eventos de navegación/ocultación. Estos últimos se dispararon desde el script; `document.hidden` se simuló para probar el manejador de `visibilitychange`, como consta en el JSON.

La impresión se comprobó además desde ambos temas: revisión y calendario fuerzan tinta `rgb(32, 62, 50)` sobre blanco, incluso con tema oscuro. Se ajustó la prioridad de sus variables locales de impresión para que el tema de pantalla no las impusiera. Evidencia: [impresión desde tema oscuro](capturas/390-oscuro-impresion-revision.png). Esto no cambia los estilos globales del sitio.

Contraste mínimo medido de texto en recursos/tablas y notas abiertas/cerradas: **5,87:1**. Las diferencias se expresan con texto y patrón además del color. Los meses tienen nombres y estados completos para lectores de pantalla. Las FAQ siguen cerradas al cargar. Sin desbordamiento horizontal a 375, 390 o 1366 px.

Las capturas aisladas ocultan **solo durante la captura** la cabecera y otros elementos fijos/flotantes del sitio; no se usan para afirmar que esos elementos no existen en la página. El resto de pruebas conserva su comportamiento. Las fuentes de Google se descargaron mediante `curl` con el proxy y la validación TLS heredados y se sirvieron a Playwright desde caché: se cargaron Lora, Outfit y Plus Jakarta Sans. No se desactivó la verificación TLS. Analítica, anuncios y otros terceros se bloquearon durante estas pruebas locales.

**Variantes realmente elegidas:** en estas pruebas, la portada seleccionó el WebP de 1200 px tanto en móvil como en escritorio; la mera existencia de su variante de 400 px no significa que se haya servido. Las imágenes de cuerpo y el recorte seleccionaron 400 px en móvil y 800 px en escritorio. `naturalWidth` en el JSON es el valor corregido por densidad que devuelve el navegador; las dimensiones físicas del archivo se recogen en `archivos.json`.

Capturas: seis estados por tamaño y tema, calendario, tablas, tres escenas, notas abiertas, movimiento reducido y alternativas sin JavaScript/impresión. Ejemplos: [recorrido móvil](capturas/390-claro-revision-1.png), [ojos y hocico](capturas/390-claro-revision-2.png), [uñas](capturas/390-claro-revision-3.png), [calendario oscuro](capturas/390-oscuro-calendario.png), [consulta de escritorio](capturas/1366-claro-consulta.png), [sin JavaScript](capturas/sin-javascript.png).

## Extensión y límites

El MDX integrado tiene **4.401 palabras** con `medir-texto.py`; la proyección, incluyendo explicaciones de recursos y alternativas textuales, tiene **5.052** al retirar bibliografía, imágenes/alt, metadatos del layout y sintaxis Markdown. Ambos conteos están en 3.868–5.232; el segundo hace explícito el texto generado por componentes. Métodos y distribución: [metricas-texto.json](metricas-texto.json). El texto clínico aprobado permanece intacto. `tono.py`: cero muletillas en el MDX.

Se conserva el alcance parcial de Miranda (resumen) y EMA (página del producto). Esta producción no añade afirmaciones que requieran ampliar esas fuentes. Todas las pruebas son locales: no se ha comprobado publicación pública ni funcionamiento tras desplegar.

## Para la revisión independiente

Revisar como **R3 del artículo, última prevista según el informe R2**, sin corregir: MDX integrado, tres componentes, doce WebP y originales; anatomía y cinco rasgos senior a 390 px; gestos y continuidad; transparencia sobre claro/oscuro; seis estados del recorrido; tres atribuciones del calendario; móvil/escritorio/teclado/impresión y Markdown. Las pruebas aquí descritas son evidencia del productor, no comprobaciones del auditor. La publicación queda pendiente de esa revisión y de la autorización del propietario.
