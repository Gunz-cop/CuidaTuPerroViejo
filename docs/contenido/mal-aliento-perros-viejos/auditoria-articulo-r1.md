# Auditoría independiente del artículo — ronda 1 de 3

- Fecha: 2026-10-22.
- Auditor: `/root/auditor_articulo`. No he creado ni corregido brief, texto, imágenes o componentes.
- Documento leído íntegramente: `docs/contenido/mal-aliento-perros-viejos/borrador-articulo.mdx`; copia idéntica incorporada después a `src/content/blog/mal-aliento-perros-viejos.mdx` por la coordinación para probar la integración.
- SHA-256 del texto: `b54e772218e4609c4bb50037a2e410e36a995dc4de865b3520648f5bca3b30b3`.
- Contrato: `briefings/briefing-mal-aliento-perros-viejos.md`, SHA-256 `60a2a79ab94344c766e15fbbf2e598723a431d9b7e357d245c208e033f9f9d0d`, aprobado en la ronda 2 del brief.
- Alcance: revisión editorial provisional, afirmaciones y fuentes, utilidad, diferenciación, métricas, estructura e inspección de las tres ilustraciones. Las pruebas de integración, navegador y proyección están pendientes; este informe no cierra el artículo completo.

## Veredicto

**NO APTO provisional:** hay que corregir el resumen de urgencias y el `status` heredado del brief que rompe el catálogo/proyección antes del cierre integrado.

Una ronda consumida del contador único del artículo completo. Quedan como máximo dos; no se inicia un contador visual aparte. No hay aprobación final ni revisión veterinaria acreditada.

## Hallazgos

### P1 — El resumen estrecha una indicación de atención inmediata

**Ubicación:** MDX, línea 43, caja `danger`; `src/components/article/HalitosisRecursos.astro`, línea 13, tarjeta de urgencias.

El desarrollo del MDX (línea 38) reproduce correctamente «dolor intenso **o** constante». La caja y la tarjeta dicen «dolor intenso constante». La fuente [Merck, When to See a Veterinarian](https://www.merckvetmanual.com/multimedia/table/when-to-see-a-veterinarian), columna de atención inmediata, dice “Severe or constant pain”. La conjunción importa: el lector de un resumen puede entender que debe reunir ambas condiciones.

**Instrucción:** otra persona debe escribir «dolor intenso **o** constante» en la caja y la tarjeta, manteniendo esa misma distinción en cualquier resumen del artículo. No ampliar listas de diagnósticos ni cambiar las prioridades. El dato ya está respaldado y expresado correctamente en el desarrollo; no exige nueva fuente ni modificar los objetivos del contrato. La formulación ambigua también aparece en instrucciones resumidas del brief, mientras F6 conserva la disyunción: aplicar su afirmación verificada al producir el resumen.

### P1 — El `status` encargado excluye el artículo del catálogo y rompe el build

**Ubicación:** MDX, línea 9; brief, bloque de frontmatter, línea 36. Origen en el brief aprobado; el artículo lo reproduce fielmente.

La coordinación detectó el fallo durante su primer build integrado. He leído la evidencia guardada en `qa/checks-intento-1/build.log`, líneas 68–72: la ruta HTML se genera, pero el hook de descubrimiento termina con `UNCLASSIFIED_PAGE` y `SITEMAP_UNEXPLAINED_DIFFERENCE` para este artículo. **Ese build lo ejecutó la coordinación, no este auditor.** He contrastado el mecanismo por mi cuenta: `[slug].astro` genera todas las entradas, mientras `src/lib/assistant/catalog.ts:24` acepta únicamente `status` indefinido o exactamente `Publicado`; el schema aplica `Publicado` por defecto cuando se omite el campo. La etiqueta larga del nuevo frontmatter deja la ruta fuera del catálogo que consume la clasificación editorial.

**Instrucción:** el autor/corrector debe corregir el contrato y el MDX para omitir ese campo y usar el default técnico vigente, conservando el estado real no publicado en inventario/expediente y la exclusión de despliegue de la rama. No cambiar el catálogo global como parte de esta pieza. Repetir build/proyección tras el cambio. La ausencia de despliegue se acredita con la operación real y el inventario, no con un valor de frontmatter incompatible con el pipeline.

**Efecto en el brief:** requiere corrección del brief por su autor y su ronda 3 independiente, la última disponible, incluyendo también la conjunción de la instrucción resumida del dolor. El auditor del artículo no corrige ni reabre por su cuenta ese documento. No reiniciar rondas ni continuar si falla la tercera del brief.

### P2 — Dos recordatorios del registro se repiten dentro de la misma sección

**Ubicación:** MDX, H2 «Qué observar y anotar antes de llamar», líneas 253, 265 y 267.

La línea 253 ya propone una libreta y una forma común de describir los hechos. La 265 vuelve a proponer una nota común entre cuidadores. La 247 permite dejar desconocido lo que no se sabe; la 267 lo reitera al final. No son advertencias de seguridad necesarias junto a una maniobra: añaden la misma instrucción de organización.

**Instrucción:** concentrar la nota compartida y los datos desconocidos en «Un registro breve…», y recortar las reiteraciones de «Qué fotos o vídeos sí ayudan». Conservar los ejemplos concretos, documentos que conviene llevar y seguridad al grabar. Volver a contar ese H2; no añadir prosa para compensar un recorte útil. El margen actual permite suprimir esas dos reiteraciones sin salir del ±15%.

### P0

Ninguno confirmado. No se han encontrado fuentes inventadas, diagnóstico por olor, pacientes ficticios presentados como reales, instrucciones del brief filtradas, dosis, falsas credenciales o promesas de curación.

## Métricas repetidas por el auditor

He ejecutado `tono.py`, el contador del autor y, además, un conteo independiente con Python que extrae FAQ, elimina bibliografía/sintaxis/URL y conserva texto de anclas, encabezados, listas y pies. Coinciden en **5.913 palabras editoriales útiles** y **6.316 palabras brutas** de cuerpo sin frontmatter/imports. Los componentes externos no se suman para alcanzar el volumen.

| Bloque | Palabras útiles | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 210 | 200 | +5,0% |
| Cuándo consultar | 640 | 650 | −1,5% |
| Qué puede decirte el olor | 437 | 450 | −2,9% |
| Causas en boca, dientes y labios | 896 | 900 | −0,4% |
| Otras causas y acompañantes | 785 | 800 | −1,9% |
| Qué observar y anotar | 632 | 650 | −2,8% |
| Cómo busca la causa el veterinario | 786 | 800 | −1,7% |
| Mientras llega la consulta | 589 | 600 | −1,8% |
| Evolución después de la consulta | 398 | 400 | −0,5% |
| Conclusión y FAQ | 540 | 550 | −1,8% |
| **Total** | **5.913** | **6.000** | **−1,5%** |

Todos los bloques cumplen el contrato editorial ±15%. El script vigente mide densidad de 138 párrafos: media 37, mediana 37, 0% por encima de 50 y máximo 50; cero fragmentos sueltos inferiores a doce palabras. El contador de autor identifica 135 párrafos por sus exclusiones distintas, con la misma media/mediana/máximo. Se comprobaron 34 H3: el tramo editorial mayor mide 199 palabras (el siguiente, 198).

`tono.py`: 5.654 palabras bajo sus propias exclusiones, dos muletillas, **0,4 por 1.000**. `seoTitle`: 55 caracteres; meta: 148. Hay tres cajas narrativas (`info`, `danger`, `warning`), una caja de fuentes y FAQ de siete preguntas.

### Resultado real del script vigente y límites

Se ejecutó sin modificar `metricas.mjs`, con `--strict`, en un espejo temporal de rutas mediante enlaces simbólicos a los archivos reales; el borrador seguía entonces fuera de la colección. Salida: código 1, cuatro bloqueos mecánicos. No los oculto ni los convierto en un APTO automático:

| Salida | Contraste independiente |
|---|---|
| Rango `null–null` | El brief declara 5.100–6.900; su formulación no coincide con el parser regex del script. |
| Tabla de fuentes no interpretable | Tabla F1–F12 completa en §9; se ha comprobado manualmente cada asignación y cita. |
| Conclusión 763/550 | El script incluye la bibliografía. El contrato aprobado excluye esa lista del texto útil; conclusión/FAQ editorial: 540/550. |
| Byline manual ausente | `ArticleByline.astro` y `[slug].astro` ya automatizan firma, fecha e IA. El contrato vigente indica expresamente no duplicarlos. Pendiente comprobar el resultado renderizado. |

Estos cuatro resultados se explican por el parser/método histórico frente al contrato y código actuales, no por cuatro omisiones del texto. No se ha modificado el script ni el brief para hacerlo aprobar.

## Verificación independiente de fuentes

Abrí personalmente las **doce URL profundas**, comprobando el contenido, no solo el estado HTTP ni el informe anterior del brief. No reutilicé la verificación de otro auditor como propia. La tabla identifica las afirmaciones realmente usadas y su localización; las URL completas están en las citas del MDX y §3 del brief.

| Fuente | Afirmación contrastada y localización en la fuente | Uso comprobado en MDX / resultado |
|---|---|---|
| F1 UC Davis, *Halitosis in Dogs*, John Gardiner, 2019 | Preguntas sobre causas y evaluación: origen oral, biofilm, dientes dañados, piel húmeda, fuentes extraorales y pruebas adicionales (pasajes 51–62). | H2 2/3/4/6. Citas y atribuciones correctas; no traslada su generalización de prevalencia ni diagnostica por olor. |
| F2 Merck, *Periodontal Disease in Small Animals*, Mulherin, revisión 2024/actualización 2025 | Etiology/Pathogenesis, Plaque, Clinical Findings y Diagnosis: biofilm/respuesta, tejidos, sondaje y radiografía. | H2 3 y mención sustantiva en H2 6. Sin etapas ni maniobras domésticas. Esquema conceptual coherente por lectura, pendiente renderizar. |
| F3 PDSA, *Bad breath in dogs*, 2024 | Overview/Causes/When to contact: dieta, cambio y consulta, especialmente dolor, falta de ingesta o malestar. | H2 1/2/8. Sin reproducir mapa olor→enfermedad ni servicios británicos. |
| F4 Merck, *Disorders of the Mouth in Dogs*, Reiter, revisión 2018/actualización 2026 | Oral Inflammatory/Ulcerative Diseases y Lip Disorders: signos, resistencia por dolor, humedad y labios; función de la boca e ingesta. | H2 3/5/7. Se limita a observación y consulta; no copia tratamientos profesionales a casa. |
| F5 Cornell, *Dental disease and home dental care*, Brian Collins, sin fecha editorial atribuida | Signs y Treatment: dificultad de comer, apetito, saliva/sangre/hinchazón, examen y radiografías bajo anestesia, reinicio de cuidados según indicación. | H2 5/6/7. Sin tutorial de cepillado ni garantía de que todo síntoma sea dental. |
| F6 Merck, *When to See a Veterinarian*, tabla sin fecha atribuida | Columna inmediata: respiración, atragantamiento, hemorragia, letargo extremo y dolor intenso **o** constante; columna pronta: otros cambios. | H2 1. Adaptación prudente a llamada hoy; el único desajuste confirmado está en los resúmenes, hallazgo P1. |
| F7 PDSA, *Chronic kidney disease in dogs*, 2023 | Symptoms/Diagnosis: sed/orina, apetito/peso/vómitos/energía, signos graves, sangre/orina y pruebas según caso; fases sin síntomas. | H2 4. Correcto, sin dieta renal por olor, estadios caseros ni definición digestiva eliminada del brief. |
| F8 Merck, *Disorders of the Pancreas in Dogs*, Bruyette, revisión 2018/actualización 2026 | Diabetes Mellitus: signos, glucosa, seguimiento profesional y urgencia de cetoacidosis con debilidad, apetito y respiración (pasajes 42–47). | H2 4. Sin pauta de insulina ni confirmación olfativa. |
| F9 AAHA, *Patient assessment, evaluation, and documentation*, 2019 | History and physical examination: historial sistémico, dieta/masticación/cuidados, exploración integral y pruebas por hallazgos (214–216). | H2 5/6. Registro declarado adaptación editorial, no instrumento validado. |
| F10 AAHA, *2023 AAHA Senior Care Guidelines for Dogs and Cats*, Dhaliwal y equipo | Identidad/DOI del PDF; Anesthetic and Surgical Considerations, Dentistry y planificación/objetivos de cuidado. La edad sola no contraindica anestesia; evaluación, monitorización y decisiones individuales. | H2 6/8. Correcto; no promete riesgo cero ni convierte la calculadora en criterio médico aislado. |
| F11 FDA, *Paws Off! Xylitol is Toxic to Dogs* | Lista de productos (incluye dentífricos/enjuagues/chicles) y llamada urgente ante sospecha de ingestión (61–83). | H2 7. Correcto: algunos productos, sin dosis tóxica ni inducción de vómitos doméstica. |
| F12 Illinois, *Don’t Wait Until It’s Too Late: Oral Tumors in Dogs and Cats*, 2025 | Risk Factors and Signs/Catch Changes Early: sangre en juguetes/agua, bultos/llagas nuevos y evaluación temprana (223–243). | H2 3. Evita precisamente el diagnóstico por olor y afirmaciones de pigmentación de la página; no inventa pronóstico. |

Los títulos reales y enlaces aparecen también en el cuadro final. Cada fuente tiene uso fuera de la bibliografía y en una sección asignada. No se atribuyen cifras ni resultados de estudios que no se hayan leído. Las orientaciones de organización del cuidador son síntesis editorial, no protocolos clínicos validados.

## Utilidad, diferenciación y procedencia

Se ha comparado con `salud-dental-perros-mayores.mdx`. La nueva pieza prioriza cuándo llamar, qué puede causar el síntoma, acompañantes, comunicación, evaluación y seguimiento. Explica la enfermedad periodontal en lo necesario para entender una causa, sin reproducir la demostración de cepillado, catálogo de productos ni pasos de profilaxis.

La apertura declara guía sin caso. No se presentan los perros ilustrados como pacientes; no hay experiencia propia añadida ni nombres prohibidos. La firma y declaración IA se delegan al componente global vigente. Cuatro enlaces internos coinciden con inventario y archivos reales: pilar, salud dental, chequeo geriátrico y calculadora de calidad de vida. Su navegación HTTP final sigue pendiente del navegador.

La prioridad se deriva de respiración, ingesta, dolor y estado general, no de clasificar olores. La consulta y sus pruebas se explican con sus límites. La repetición menor señalada no exige abandonar esa estructura ni rellenar la cifra objetivo.

## Recursos: comprobado y pendiente

| Recurso | Comprobación propia en esta ronda | Pendiente para cierre |
|---|---|---|
| R1 hero/referencia | Abrí el WebP 1200×675: labrador chocolate senior, hocico/cejas canosos, ojos despejados, collar oliva, mancha pectoral, cuatro apoyos plausibles y cuidadora sin manipular. Alt fiel. | Decodificación, `srcset`, móvil y escritorio renderizados. |
| R2 comida | Abrí WebP: misma identidad y cuidadora, cuatro patas apoyadas, cuenco bajo, libreta, sin contacto forzado. Alt/caption corresponden. | Variantes, carga y renderizado. |
| R3 consulta | Abrí WebP: mismo perro senior tumbado de forma plausible; dos personas conversan con una hoja, sin exploración ni credenciales mostradas. Alt fiel. | Variantes, carga y renderizado. |
| R4 prioridades | Leí componente e inserción H2 1. Tres acciones, anclas previstas y texto visible. | Corregir P1; anclas, alturas, legibilidad y contraste reales. |
| R5 proceso | Leí guion y SVG: cambian biofilm, margen, inflamación y ampliación de raíz; no promete progresión inevitable ni vídeo. Controles y alternativas existen en código. | No autoplay/pausa/fin/repetición, teclado, reduced-motion, noJS/impresión y limpieza de temporizadores en navegador. |
| R6 tabla | Cuatro filas, tres columnas breves, `TablaApilable` y `data-label` presentes. | Apilado, alto y ausencia de desbordamiento reales. |
| R7 registro | Ocho campos, `details` cerrado, sin envío, límites y lógica de impresión leídos. | Despliegue/foco, conservación impresa de valores, sinJS, tamaños y contraste reales. |

No he ejecutado builds en paralelo con la coordinación ni he afirmado haber realizado sus checks. El primer build de coordinación falló con el `status` descrito y requiere repetición. Aún faltan el conjunto integrado, capturas 375/390/1366 claro/oscuro, contraste calculado, funcionamiento, proyección Markdown y resultados finales de checks. Un build futuro correcto no sustituye esos controles.

## Lo que sí funciona

Mantener la respuesta temprana, las causas sin equivalencias por olor, los signos acompañantes y las decisiones del cuidador. Conservar las doce atribuciones comprobadas, guía sin caso, continuidad visual y ausencia de terapias domésticas. Los presupuestos editoriales están cerca de sus objetivos y los párrafos están aireados.

## Qué corregir, en orden

1. Autor y productor visual: corregir la conjunción del dolor en los dos resúmenes señalados. El auditor no modifica esos archivos.
2. Autor del brief: corregir `status` y conjunción, y solicitar la tercera y última auditoría del brief; aplicar al MDX el contrato que quede aprobado. No cambiar el catálogo global ni el estado no publicado del inventario.
3. Autor: concentrar las dos reiteraciones del registro señaladas, sin ampliar por compensación ni tocar advertencias necesarias.
4. Coordinación y QA: repetir el build tras corregir el estado, completar integración y pruebas reales, guardar resultados/capturas/manifiesto y congelar hashes.
5. Solicitar ronda 2 del mismo artículo completo para revisar las correcciones y cerrar texto más recursos; máximo tres rondas total. No declarar APTO final a partir de esta revisión provisional ni fusionar/desplegar.
