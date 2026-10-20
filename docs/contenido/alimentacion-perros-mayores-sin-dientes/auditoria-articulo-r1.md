# Auditoría independiente del artículo completo — ronda 1 de 3

Fecha: 2026-10-20 UTC. Auditor independiente; no participé en creación ni corrección del brief, artículo o recursos. Único documento auditado: artículo completo con imágenes, matriz, comparación, secuencia y registro. No se separa la auditoría de recursos ni se abren rondas suplementarias.

## Veredicto

**APTO / Publicable:** el artículo conserva los límites clínicos y las fuentes del brief aprobado y sus recursos funcionan en las pruebas locales independientes descritas abajo.

Esta aprobación permite entregar la rama y el PR para revisión. **No acredita publicación pública ni autoriza fusionar o desplegar.** No existe aprobación visual del usuario. El plan adjunto continúa ausente; el alcance se contrasta con el tema explícito del usuario y el inventario, sin afirmar que se haya leído aquel adjunto.

## Alcance y versión

Producto estable recibido en commit `c386535d0e9b2c1a48596574555cf50e89fdc507`. Hashes recalculados antes y después de las comprobaciones:

| Archivo | SHA256 |
|---|---|
| `src/content/blog/alimentacion-perros-mayores-sin-dientes.mdx` | `3b367d2c834bf6de90bef10527f4aedf3ad8d08184f2864717151d5676f3d413` |
| `src/components/article/AlimentacionSinDientesVisual.astro` | `ca8677e53187535bd6fe9516a1fb63a203a37d8c27d51cde50ebc39decb55306` |
| `src/components/PostReader.astro` | `5ff31e567aec7ca2cda748e9b394f9a46628f968e9f38d2fd0f4ca344870a7cd` |
| Brief cerrado APTO R3 de 3 | `fb110f500fc009ac86263bd8ca817e361f3f073be6413ae3c5e57d92ec5af0fa` |
| HTML de `dist/client` servido y probado | `73434055953689b9dd2cefc88d1e2dcdf1e36771ad0600cd155459b762255451` |
| Proyección Markdown | `87f25b3df860d51fe39b1c571529be771660706f3a93a2aeca5bfd21c77f2bd2` |

Registro completo, incluidas las nueve WebP: `verificacion/auditor-version-articulo-r1.json`. URL probada: `http://127.0.0.1:8766/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes`; servidor estático de `dist/client`, sin ejecutar Worker ni producción.

## Hallazgos

Sin P0, P1 ni P2 pendientes en el producto auditado. Los resultados automáticos que requieren interpretación se detallan a continuación; no se presenta el veredicto del contador como aprobación editorial.

### Métricas y límites del parser

Ejecuté la herramienta obligatoria `node .agents/skills/auditar-articulo-blog/scripts/metricas.mjs alimentacion-perros-mayores-sin-dientes`. Salida íntegra: `verificacion/auditor-metricas-articulo-r1.txt`.

El script imprime NO APTO porque no interpreta la sintaxis del brief para rango, targets, tabla de enlaces/trazabilidad y porque busca la antigua firma manual. Comprobé **cada control** en archivos reales: rango 1.870–2.530 presente, targets y trazabilidad presentes, tres destinos reales presentes y firma central `ArticleByline` renderizada. No son omisiones del producto ni justifican reabrir el brief cerrado. No se modificó el script para obtener un resultado favorable.

Total propio de la herramienta: **2.231 palabras**, dentro del rango y +1,4 % del target 2.200. Incluye sintaxis MDX/JSX según el método contractual; no equivale a palabras de prosa visible. No sumé texto de componentes para inflar el total.

| Sección | Conteo de `metricas.mjs`, sin encabezado H2 | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 159 | 150 | +6,0 % |
| Antes de cambiar el plato | 324 | 350 | −7,4 % |
| Qué comida elegir | 334 | 400 | −16,5 % |
| Cómo adaptar la textura | 403 | 400 | +0,8 % |
| Preparación y sobras | 253 | 250 | +1,2 % |
| Cómo saber si ayuda | 309 | 300 | +3,0 % |
| Conclusión, bibliografía y FAQ | 398 | 350 | +13,7 % |

Las diferencias con la tabla del creador se explican porque esta sí incluye los encabezados H2. En nutrición el conteo del script queda **seis palabras** bajo el límite orientativo de 340; la tabla comparativa del componente aporta **66 palabras reales de HTML** pertinentes a esa misma decisión, omitidas por el contador MDX. Leí esa tabla y comprobé su proyección. No hay una omisión útil que reparar ni motivo para añadir seis palabras de relleno o reabrir el contrato: el brief exige resolver diferencias por utilidad y presenta esta tolerancia como orientativa. Se conserva el dato medido, sin falsear el conteo.

| Densidad/cadencia propia del script | Resultado |
|---|---|
| Párrafos de prosa | 42 |
| Media / mediana | 38 / 39 palabras |
| Porcentaje >50 palabras / máximo | 0 % / 43 |
| H2 / H3 | 6 / 13 |
| Palabras por H3 | Aproximadamente 172 |

El único fragmento corto señalado es la introducción de la bibliografía, no una cita partida. La lectura móvil presenta párrafos separados y subtítulos; no se afirma que cada párrafo ocupe literalmente tres líneas en toda configuración de fuente.

## Fuentes: afirmación, localización y límites

Releí el artículo y el componente enteros y contrasté las afirmaciones con **mis propios documentos originales descargados y abiertos independientemente el 19 de octubre en la R1 del brief**, releídos ahora el 20. No afirmo nuevas solicitudes de red en esta ronda. Identidades, autores, fechas, URL profundas completas, hashes y extractos mínimos de aquella lectura: `verificacion/auditor-fuentes-brief-r1.md`. La trazabilidad conserva los seis documentos aprobados, sin identificadores añadidos de memoria.

| Fuente e identificador del brief | Afirmación real del artículo / localización | Pasaje contrastado y resultado |
|---|---|---|
| F1 WSAVA Global Nutrition Committee, Guidelines on Selecting Pet Foods, 10-03-2021; PDF Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf | H2 «Qué comida elegir»: completo frente a complementario, adecuación e información energética | «What to look for on a label», puntos 1–2. Verificada; no atribuye marca, producto senior universal ni equivalencia por peso |
| F2 Freeman/equipo WSAVA, Nutritional Assessment Guidelines, JSAP junio 2011; PDF WSAVA-Nutrition-Assessment-Guidelines-2011-JSAP.pdf | H2 nutrición: formulación profesional; H2 adaptación: cantidad, masticación, deglución, vómito/regurgitación; H2 seguimiento: ingesta, condición, signos GI/actividad | «Evaluate homemade foods», «Extended Evaluation / Animal factors», «MONITORING». Verificadas y citadas nominalmente en los tres H2; sin ratio, calorías objetivo ni seguimiento universal |
| F3 Niemiec/equipo WSAVA, Guías Dentales, traducción española sin año afirmado; PDF WSAVA-Dental-Guidelines-Spanish.pdf | H2 inicial: cambios de preferencia, masticación unilateral, salivación/sangre como posibles signos; comer no descarta dolor | Sección 2, tabla 1 y párrafo previo. Verificada; no diagnostica ni atribuye pérdida dental a vejez |
| F4 Barnes/Hunter/Downing, VCA Megaesophagus, 28-05-2024; /know-your-pet/megaesophagus | H2 inicial y adaptación: la consistencia depende del paciente y licuar puede aumentar aspiración en ese contexto | «How is megaesophagus treated?». Verificada; el artículo niega explícitamente equivalencia entre falta de dientes y megaesófago y no enseña postura terapéutica |
| F5 Weir/Hunter/Barnette, VCA Post-Operative Instructions in Dogs, 18-09-2025; /know-your-pet/post-operative-instructions-in-dogs | H2 inicial: instrucciones posoperatorias individuales; no días/porciones de extracción dental | Apartados alimentación e instrucciones detalladas posoperatorias. Verificada con límite de cirugía general conservado; no importa su pauta de porciones/plazos |
| F6 FDA, Tips for Safe Handling of Pet Food and Treats, 23-05-2024; /animal-veterinary/animal-health-literacy/tips-safe-handling-pet-food-and-treats | H2 higiene: manos/platos/utensilios; refrigerar pronto o desechar húmedo sobrante y mantener tapado | «Tips for Preparing Pet Food» y «Tips for Storing Pet Food». Verificada; no traslada una duración universal a pienso mojado/papilla |

Las fuentes aparecen junto al contenido y en el cuadro final con títulos reales enlazados. La matriz, comparación, secuencia y registro no añaden resultados de estudios ni tratamientos nuevos: son síntesis editoriales con límites. No hay fuentes decorativas, credenciales, porcentajes, dosis, experiencias o desenlaces inventados.

## Procedencia, utilidad y coherencia clínica

La apertura declara guía general sin caso; hero y figuras declaran IA. La autoría central y fecha coinciden con el frontmatter; el 19 de octubre corresponde a creación y el cierre de pruebas el 20 se registra como tal, sin simular revisión clínica. No se inventa revisión veterinaria.

El artículo responde pronto qué considerar hoy: conservar dieta adecuada, adaptar presentación cuando procede y observar tolerancia. Separa boca cicatrizada, extracción reciente y dificultad al tragar. La ausencia de recetas/proporciones universales es una limitación clínica explícita, no una promesa de receta incumplida. Las señales de detener/consultar están junto al manejo y permanecen fuera de desplegables. Dificultad respiratoria se diferencia de consulta por otros cambios. No se enseña jeringa, apertura de boca, postura terapéutica ni ajuste farmacológico.

La matriz orienta una decisión temprana; la comparación ayuda a revisar presentaciones; la secuencia muestra orden y observación; el registro convierte la observación en información para consulta. Son preguntas distintas y no se usa movimiento decorativo para prometer un vídeo. Los tres enlaces contextuales requeridos abren HTML local real con contenido/H1 esperado; no se inventó segundo spoke ni calculadora obligatoria.

## Inspección visual independiente

Abrí las tres WebP finales a tamaño original: mismo beagle tricolor, hocico canoso, orejas/rasgos y cocina continuos, edad senior visible, cuatro apoyos anatómicamente coherentes y sin patología fabricada. Preparación muestra manos/utensilio y perro al fondo; observación muestra perro y libreta, coincidiendo con su alt corregido. No hay cuidador inexistente descrito en ese alt. El hero es ilustración y su plato no se presenta como receta clínica.

Las nueve variantes tienen firma binaria RIFF/WEBP y coinciden byte a byte con `dist/client`. El navegador decodificó las tres imágenes y registró tamaños/URL realmente seleccionados en cada vista; la existencia de una variante no se presenta como prueba de selección. La variante 800 del hero no se anuncia como servida. No duplicación del hero en cuerpo, TOC/schema manuales ni nuevos campos de frontmatter.

## Pruebas propias de navegador y recursos

Script propio: `verificacion/auditor-navegador-articulo-r1.py`. Resultado: `capturas-auditor-r1/navegador.json`. Chromium headless local con Playwright; prueba completada sobre los hashes anteriores. Primer intento de lanzar Chromium en sandbox sin sockets falló antes de abrir el navegador; la ejecución con permisos de red del entorno terminó correctamente. No fue un fallo del producto ni una revisión adicional.

| Prueba independiente | Resultado |
|---|---|
| 390 y 1366 px, claro/oscuro | Sin desbordamiento global; 3 imágenes decodificadas; capturas propias de cabecera y cuatro recursos en cada vista |
| Axe en `article`, WCAG 2 A/AA y 2.1 AA | Cero infracciones detectadas en las cuatro vistas; no equivale a certificación universal de accesibilidad |
| Contraste calculado en h3/h4, párrafos, etiquetas, botones y celdas de recursos | Mínimo **5,40:1** en las cuatro vistas, incluidos controles deshabilitados; fondos opacos calculados desde DOM |
| Teclado/foco y tamaño de controles | Enter avanza; foco visible; controles 44×44, 220×44, 44×44 px en móvil |
| Tabla comparativa | Foco visible y desplazamiento lateral con ArrowRight, sin romper reflujo de página |
| Reflujo | 375 y 320 px sin desbordamiento global; es viewport CSS efectivo, no simulación de zoom nativo del navegador |
| Autoplay, pausa y finalización | Estado inicial estable 6,8 s; pausa estable 6,8 s sin animación activa; reproducción acaba al comprobar a 20 s y permite repetir desde paso 1 |
| Reduced motion | Reproducción deshabilitada con explicación, navegación manual conservada y transición 0 s |
| Ocultación y salida | Eventos simulados `visibilitychange`/document.hidden y `pagehide` detienen reproducción |
| Navegación Astro/limpieza | Evento simulado `astro:before-swap` elimina avance durante 6,8 s; doble `astro:page-load` no duplica manejadores; lectura de código confirma AbortController y mapas |
| Sin JavaScript | Tres pasos legibles y sin controles inertes; captura propia |
| Impresión normal con y sin JS | Tres pasos disponibles; PDF completo en ambos casos. Ninguna promesa de artículo completo en una página |
| Botón real de impresión del registro | Evento `beforeprint` detectó copia y `afterprint` la limpió; segundo recorrido con diálogo interceptado permitió inspeccionar valores/PDF |
| Registro con valores y con todos los límites llenos | Dos PDF propios de **una página A4** cada uno; copia conserva valores y no inputs. PDF máximo rasterizado e inspeccionado: legible, completo y con advertencia final |
| Enlaces/anclas | Cinco enlaces internos del article con HTML 200 y H1; 49 anclas del documento apuntan a IDs existentes |
| JavaScript | Cero errores capturados |

Las capturas del auditor **no ocultan navegación sticky, asistente ni otros overlays**; al fotografiar regiones más altas que el viewport algunos quedan visibles sobre la captura. No se usan como prueba de ausencia de overlays. El contenido y campos pueden consultarse desplazando la página; las advertencias siguen presentes. Capturas del creador que retiraron overlays se mantienen atribuidas a ese rol y propósito.

Estas pruebas de eventos simulados y un navegador no demuestran todos los posibles desmontajes o navegadores. La lógica observada coincide con los eventos de ciclo de vida implementados; no hay dependencia pesada ni llamadas externas de guardado del registro.

## Markdown, build y otras pruebas técnicas

Leí y comprobé la proyección Markdown real con hash registrado: imágenes/pies IA, tres situaciones, tabla, tres pasos completos, señales de parar y texto para copiar campos del registro se conservan. No publica controles inertes como único acceso a una función ni promete PDF descargable. La impresión del navegador es una función distinta de una descarga preexistente.

**Evidencia ejecutada por otros roles y revisada por mí, sin afirmar que la repetí:**

- `verificacion/build-creacion-final.log`: build final completo del 20 de octubre, sitemap y **33 documentos proyectados**, sin fallo de clasificación anterior. El HTML/Markdown y nueve imágenes servidos en mi prueba coinciden con sus hashes finales.
- `verificacion/final-check.log`: **0 errores, 0 warnings y 62 hints**. El expediente conserva comprobación inicial para distinguir el conflicto DOM/Worker ya resuelto. No se ocultan los hints existentes.
- `verificacion/resultados-tecnicos.json` y logs correspondientes: pruebas npm y agent-readiness, inventario, discovery, proyección, API, routing, crecimiento y semántica con salida 0 según coordinador. No los presento como mis ejecuciones.
- El cambio acotado del encabezado del índice en `PostReader` conserva el componente y el nombre de clase de marca con contraste medido por coordinación en `contraste-indice-final.json`. Mi axe sobre artículo pasa sobre ese producto final.

No repetí builds/checks o suites sin cambio/fallo nuevo: las comprobaciones indispensables de recursos y lectura se repitieron independientemente en navegador sobre el artefacto final identificado.

## Lo que sí funciona

Conservar la separación entre textura y formulación, la advertencia contextual de aspiración, las instrucciones individuales tras extracción y el registro de alimento base separado del agua. Los apoyos funcionan sin esconder las alarmas ni aparentar una demostración clínica. La hoja imprimible es útil y conserva notas reales introducidas por el lector sin transmisión de datos.

## Qué corregir, en orden

Nada bloqueante pendiente ni corrección de producto solicitada por esta ronda. Puede entregarse en rama con PR e informes/capturas. El inventario debe expresar redacción y validación local sin publicación; cualquier comprobación pública nueva queda fuera del encargo sin despliegue. **Artículo aprobado en R1 de 3; no hacen falta rondas adicionales.**
