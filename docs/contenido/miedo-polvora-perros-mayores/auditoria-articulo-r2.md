# Auditoría del artículo LA-01 — R2: correcciones, voz e integración de testimonios

## Veredicto

**No publicable con el criterio editorial actual: la experiencia de Gonzalo con Luna y Dakota todavía no sostiene el artículo y el recorrido al formulario de Bogotá sigue sin comprobarse.**

La corrección anterior mejora sustancialmente la seguridad y la utilidad. Eso debe conservarse. El trabajo que sigue es una **reescritura de estructura y voz**, con ajustes puntuales de precisión; no otra ampliación de una guía a la que después se añadan anécdotas.

No hay una prueba fiable en esta auditoría de que un párrafo «sea de IA». Sí hay evidencias observables de una voz genérica: experiencia principal ausente, relatos segregados por encabezados, introducción que anuncia un procedimiento de redacción, aperturas institucionales reiteradas y repetición de recomendaciones. Son esos defectos los que evalúo.

### Versión, alcance y autoridad editorial

- Fecha: 2026-11-08. Rama: `claude/gallant-curie-vixi47`.
- Commit auditado: `4a893e9a7c54557ae407e5bf79d44795bf5b17c9`.
- Artículo: `src/content/blog/miedo-polvora-perros-mayores.mdx`, 492 líneas.
- SHA-256: `e09045717489e293d3cbddd087890230ac00721fcb4508ab3820e87db6b2e6ea`.
- Comparación con R1: commit `ee95d800044de7c44acfbf1bacfa2d2e8ebe2c64`; se inspeccionó el diff completo y se leyó el artículo resultante, no solo el informe `correccion-articulo-r1.md`.
- Se aplica `.agents/skills/auditar-articulo-blog/SKILL.md`, el control editorial, la guía de voz y la separación entre autoría y auditoría.
- Ronda **R2 del artículo**. No es R7 del brief. No se han corregido el MDX ni el brief en esta sesión.
- La instrucción actual del propietario pide que sus testimonios, especialmente Luna y Dakota, estén integrados en el desarrollo. **Prevalece sobre el brief v6.2**, que reservaba Dakota solo para la fotografía (§2 y §9.4), limitaba Luna a H2-7 y declaraba «sin hilo principal». No se necesita volver a pedir autorización para levantar esas restricciones narrativas.
- La procedencia sigue siendo el archivo `docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md`. Cambiar la arquitectura no autoriza a añadir experiencias nuevas.
- La decisión de imágenes documentada en `TODO.md` y en la corrección R1 es ahora diez imágenes para los H2 temáticos más portada. No se penaliza aquí el antiguo requisito de siete; tampoco se certifican imágenes que todavía no están insertadas.
- Auditoría textual y de código estático. No se repitió el build ni se probaron visuales, calculadora o teclado. El build correcto figura como **declaración del corrector**, no como prueba ejecutada por esta auditoría.

## Hallazgos

Recuento: **0 P0 nuevos confirmados, 2 P1 y 4 P2**. El rechazo editorial también responde al criterio explícito del propietario; no hace falta inventar un error médico grave para justificarlo.

### P1-1. La vivencia principal sigue fuera de las decisiones del artículo

**Ubicación:** introducción:19–29; H2-6:242–287; H3 «Luna y los temblores»:313–317; ausencia de Dakota en todo el MDX.

**Evidencia verificable:**

| Material | Presencia actual | Qué revela |
|---|---|---|
| Dakota | **0 menciones**, incluso contando encabezados | No se cumple la petición actual de integrarla. |
| Luna | **2 menciones**, una en el H3:313 y otra en el párrafo:315 | Su presencia termina dentro del mismo bloque; no participa en la preparación de la noche o la compañía. |
| Osa | 7 menciones, concentradas en H2-2, más un contraste en H2-7 | Hay experiencia real útil, pero el relato principal sigue separado bajo «Lo que recuerdo de Osa». |
| Baltor | 3 menciones dentro de H2-7 | Se cuenta su historia y luego se pasa a una explicación institucional de esfínteres. |
| Perra del escritorio | Un párrafo integrado en H2-3:137 | Es el mejor ejemplo actual de inserción breve y pertinente. No conviene perderlo. |

El recuento excluye bibliografía y FAQ; las posiciones están en `auditoria-articulo-r2-evidencias/integracion-testimonios.json`. Contar nombres no mide por sí solo la calidad: sirve para comprobar una ausencia y una concentración que la lectura confirma.

La escena doméstica más directamente vinculada al H2 «con la casa llena» **ya está documentada y no se usa**: en 2025 Luna y Dakota estuvieron algo nerviosas y alerta, dentro de casa con la familia; había películas y conversaciones, y el testimonio también describe una reunión familiar. La sección actual ofrece seis acuerdos impersonales sin recurrir a esa experiencia.

También se desaprovecha el contexto concreto de Dakota: se fatiga al caminar, tiene displasia de cadera descrita como inicial y vive en una zona de cuestas; cuando salen buscan suelo más nivelado. Eso permite que «ajusta el paseo a su movilidad» sea una decisión comprensible de alguien que cuida a una perra concreta. **No permite decir que Dakota esté postrada ni atribuirle una fobia a la pólvora.**

**Prueba editorial:** si se retiran los párrafos de Luna y el encabezado que los presenta, el plan de la guía casi no cambia. En el artículo que pide el propietario, lo observado en casa debe ayudar a elegir, adaptar o cuestionar una recomendación. No basta con que el relato sea verdadero o agradable.

**Instrucción de corrección:** hacer de Gonzalo con Luna y Dakota el punto de vista recurrente, usando hechos distintos en los lugares donde cambien una decisión. Integrar Osa y Baltor como contrastes concretos, sin capítulos biográficos autónomos. El anexo `auditoria-articulo-r2-plan-narrativo.md` asigna hechos, función y límites por sección. No añadir una anécdota a cada H2 por cuota: medicación, normativa y perro postrado pueden y deben conservar explicaciones sin experiencia propia cuando no la hay.

**Origen y responsabilidad:** el brief anterior pedía esta segregación. No presento la ausencia de Dakota como incumplimiento de una regla que el corrector hubiera tenido que conocer antes: es una **nueva prioridad del propietario que cambia el contrato**. Mi R1 comprobó y valoró la procedencia y la diferenciación regional, pero no examinó con suficiente exigencia la integración narrativa. Que los recuerdos fueran auténticos no resolvía la calidad de su integración.

### P1-2. Bogotá se actualizó de año, pero la promesa de acceso sigue por delante de la comprobación

**Ubicación:** MDX:401–403 y FAQ:490.

El texto dice que el formulario «se encuentra» en los canales del instituto. La FAQ añade que están «enlazados desde animalesbog.gov.co», pero muestra el dominio como **texto plano**, sin enlace. `FAQ.astro` acepta HTML: la falta de enlace no es una limitación del componente.

El corrector declara que no localizó la URL final. En esta ronda abrí la portada del IDPYBA, su noticia de Halloween del 30 de octubre y la de reportes del 3 de noviembre. No localicé allí el enlace final del formulario. La noticia de la Alcaldía sí anuncia el recurso. **Un anuncio oficial de disponibilidad no prueba que se haya completado el recorrido hasta el formulario.** Esto no demuestra que el formulario no exista.

La línea **123** sí coincide con el canal publicado por el IDPYBA. La derivación veterinaria también es pertinente. Esas dos correcciones se conservan.

**Instrucción:** dar enlace directo si puede comprobarse; en su defecto, enlazar la página oficial/anuncio y decir que allí se consulta la campaña o el canal disponible, sin presentar como verificado un formulario que no se encontró. La respuesta debe poder usarse desde el propio acordeón. No enviar datos ni una denuncia como parte de la comprobación.

### P2-1. La voz explica cómo se hizo el artículo y alterna bloques humanos e institucionales

**Ubicación:** introducción:25; H3:77 y 93; aperturas:123, 133, 205, 258 y 333; párrafo de Riemer:67.

La frase «Gonzalo, el responsable editorial de este sitio, cuenta en primera persona…» parece la presentación de un expediente de autoría. Después se pasa a «un tío mío» y «en casa». La identidad está ahora documentada, pero la voz sigue cambiando entre un tercero que presenta al autor y ese autor que habla.

El ejemplo más claro de la separación solicitada por el usuario es literal: **«Lo que recuerdo de Osa» → «Lo que recomiendan en México»**. No hay encabezado «E-E-A-T» publicado; el problema está en esa alternancia estructural. La experiencia y la fuente se presentan por turnos, cuando podrían desarrollar juntas la decisión de abrirle un lugar dentro de casa.

Un diagnóstico reproducible encuentra **14 de 36 H3** cuyo primer párrafo abre con una institución, un estudio o los reportes, según el patrón explícito conservado en `aperturas-fuentes.json`. No es un umbral de calidad ni una prueba de autoría automática. Sí muestra por qué, junto a los relatos aislados, el texto puede leerse como una sucesión de fichas documentales. Abrir por una fuente es razonable en edad o fármacos; es menos necesario para explicar una placa o preparar una salida al baño.

La corrección también dejó solo el párrafo «Una encuesta internacional de Riemer (2019) añade un matiz» y separó el dato en el siguiente. La división baja el largo del párrafo, pero crea una transición vacía de utilidad. Lo mismo ocurre con «Toca el cuarto»: es concreto en apariencia y poco claro como instrucción.

**Instrucción:** una voz reconocible desde el inicio; decisión o situación primero y respaldo junto a la afirmación que lo necesita. Identificar a Gonzalo de forma natural sin describir el recurso «primera persona». Eliminar títulos que anuncian «ahora viene la anécdota» y transiciones que solo anuncian «ahora viene una fuente». No quitar las citas, convertir experiencias en pruebas ni reemplazar toda explicación por una confesión personal.

### P2-2. La corrección térmica usa señales ambiguas para indicar una frazada

**Ubicación:** MDX:147 y FAQ:491.

«Toca el cuarto y mira a tu perro: si se encoge o busca la frazada, ponle una más; si jadea, ventila» sustituyó una generalización climática por una decisión demasiado simple. En este mismo artículo un perro puede encogerse por miedo y jadear por miedo, calor o dolor. La postura no distingue por sí sola esos estados. Tampoco se entiende qué superficie o condición evalúa «toca el cuarto».

**Instrucción:** hablar de la temperatura y ventilación reales del espacio y de lo habitual en ese perro, dejando accesible la cama/frazada sin añadir abrigo automáticamente por una postura. Conservar que el jadeo persistente o la dificultad respiratoria requieren valoración; no fabricar un umbral de temperatura ni una prueba diagnóstica casera. Ajustar también la FAQ.

### P2-3. Quedan absolutos innecesarios en un apartado que ahora sí reconoce capacidades individuales

**Ubicación:** MDX:163, 185 y 189.

- «El tuyo no puede elegir» confunde no poder desplazarse con no poder expresar preferencia. La familia puede observar dónde tolera mejor estar; el propio apartado pide observar su reacción a reuniones. Formular como ayuda para acceder al sitio, no como incapacidad universal de elegir.
- «No intentes vaciarla tú» protege frente a una maniobra improvisada, pero no distingue al cuidador con una pauta y formación veterinarias previas. Mantener la prohibición de improvisar sin sugerir abandonar cuidados ya prescritos. No enseñar aquí la maniobra.
- «Ese estudio no dice nada de perros postrados» afirma ausencia en todo el estudio cuando la verificación disponible es del resumen publicado. La conclusión defendible es que lo comprobado **no establece una pauta específica para ese paciente**, no que se inspeccionó toda la población y todos los métodos del texto completo.

**Instrucción:** conservar la corrección central de R1 —cronicidad, consulta ante deterioro nuevo, micción separada de higiene— y alinear estas tres frases con sus límites reales. No hace falta añadir otro aviso o aumentar el apartado.

### P2-4. Conviene citar el decreto con su alcance exacto, sin acusar una prohibición inventada

**Ubicación:** MDX:381 y 391.

La nota ministerial citada especifica las demostraciones de **categoría tres**. El artículo omite esa delimitación al resumir el permiso para demostraciones públicas y privadas.

En esta ronda accedí además al texto del Decreto 2174 en el INS: el art. **2.2.4.2.8** trata la solicitud para demostraciones de categoría 3; el art. **2.2.4.2.5** contiene una obligación general de autorización territorial. Por tanto, **no sería riguroso declarar falsa la existencia de un requisito de permiso para otros usos** solo porque la nota de prensa mencione categoría 3. La precisión consiste en no confundir ambas disposiciones ni dar a entender que se verificó todo el régimen municipal.

**Instrucción:** citar la norma primaria y distinguir su disposición general del trámite específico que se resuma. Si el detalle técnico no ayuda al cuidador, basta la orientación de consultar a la alcaldía con respaldo correcto. No añadir una lista de categorías o sanciones para aparentar exhaustividad.

## Cierre independiente de los hallazgos de R1

| R1 | Estado en la versión R2 | Evidencia / reserva |
|---|---|---|
| P0-1 Movilidad y micción | **Corregido en lo sustancial** | 155–159 delimita cronicidad y deterioro; 179 reconoce capacidades; 185 separa micción e higiene; FAQ 3 incorpora consulta. Quedan precisiones P2-3, no se reabre el bloqueante original como si no se hubiera trabajado. |
| P0-2 Acepro/«algo parecido» | **Corregido** | 420 elimina la equivalencia y conserva tratamientos individualizados. |
| P1-1 Distancia de fuga | **Corregido** | 343 no predice distancia; 355–365 amplía y mantiene búsqueda y vigilancia del portón. |
| P1-2 Necesidades nocturnas | **Corregido** | 256–266 añade alternativa interior habitual, acompañamiento y correa, coherente con Cornell. |
| P1-3 Bogotá | **Parcial** | Año, campaña y 123 actualizados; sigue sin recorrido al formulario y FAQ sin enlace. P1-2 de esta ronda. |
| P1-4 Reglamentación | **Corregido en existencia y actualización** | Decreto 2174 incorporado, sin multas. Ajustar precisión/cita primaria según P2-4. |
| P1-5 Riemer | **Corregido en el resultado estadístico** | 189 y 277 agrupan comida/masticables/juego; 423–424 mantienen encuesta, seguridad y aprendizaje. Ajuste de alcance pendiente en 189. |
| P2-1 Ansiedad por separación | **Corregido** | 311 dice pista por investigar, sin diagnóstico. |
| P2-2 Ausencia de estudios | **Corregido** | 23 dice «no encontramos». El absoluto nuevo sobre el estudio concreto se trata en P2-3. |
| P2-3 Suficiencia, tiempos, clima | **Parcial** | Retiradas «basta», «dos minutos» y normalización previa a urgencias. Ajustar termorregulación según P2-2. |
| P2-4 Firma manual | **Corregido mecánicamente** | Quitada firma duplicada; identidad declarada. Resolver la naturalidad de esa declaración según P2-1. |
| P2-5 Distribución | **No requiere relleno** | Global dentro de rango; desviaciones explicadas por nuevas funciones. Véase medición y aceptación razonada abajo. |
| P2-6 Publicación/visuales | **Pendiente de fase de entrega** | No es defecto textual que falten imágenes a cargo del propietario. No confundir `Publicado` con verificación de producción. |

## Lo que sí funciona

- Los recuerdos de Osa y Baltor mantienen hechos e incertidumbres: no inventan edades senior, lesiones o recuperación. El problema es su ubicación, no su autenticidad.
- La perra del escritorio ya aparece integrada en una decisión concreta sobre el refugio. Es una referencia útil de cómo usar una observación breve.
- Patio, portón, pila, celosías y visitas tienen contexto propio. No es una guía enteramente intercambiable con cualquier país o vivienda.
- Los nuevos párrafos resuelven situaciones que faltaban: micción, salida al baño y búsqueda ampliada. No recortarlos solo para devolver cada H2 a su target anterior.
- Los datos de Bogotá conservan sus límites; la muestra internacional no se vuelve prevalencia regional. Las cifras de Riemer siguen correctamente asignadas.
- Tres avisos, ocho FAQ plegadas, bibliografía plegada, tabla con encabezados, tarjeta recíproca y enlaces internos siguen presentes. La firma global ya es la única firma.
- No se añadieron dosis, medicamentos nuevos con pauta, éxitos terapéuticos ficticios ni credenciales veterinarias.

## Métricas propias

Se reutilizó el **mismo verificador independiente de R1 sobre los bytes nuevos**, no el recuento que declara el corrector. Conserva encabezados, tabla, títulos y texto de avisos y preguntas/respuestas; excluye frontmatter, imports, marcado, comentarios, tarjeta, destinos de enlaces y bibliografía.

**Total: aproximadamente 5.946 palabras**, frente a 5.379 en R1; ambas cifras con el mismo método. El cierre del corrector dice ≈5.890 con un método «parecido»: una diferencia de 56 palabras entre segmentadores no es por sí sola una falsa declaración. Para la siguiente entrega debe usarse un único método reproducible. El techo de 6.000 deja **54 palabras de margen**: insertar testimonios sin reemplazar repeticiones y sin reorganizar no es una solución sostenible.

| Sección | Real | Target antiguo | Desviación |
|---|---:|---:|---:|
| Introducción | 300 | 320 | −6,25 % |
| Barrio | 455 | 510 | −10,78 % |
| Patio | 544 | 560 | −2,86 % |
| Cueva | 430 | 450 | −4,44 % |
| No se levanta | 678 | 520 | +30,38 % |
| Consulta | 480 | 520 | −7,69 % |
| Casa llena | 574 | 480 | +19,58 % |
| Esconderse/familia | 420 | 460 | −8,70 % |
| Portón | 430 | 360 | +19,44 % |
| Ley | 497 | 420 | +18,33 % |
| Consejos/enero | 562 | 560 | +0,36 % |
| Conclusión + FAQ | 576 | 540 | +6,67 % |

Acepto como razonable la redistribución propuesta para contener la seguridad y los recorridos añadidos. No la uso como motivo de rechazo ni exijo dosificar palabras en los H2 cortos. Para la reescritura se debe actualizar el presupuesto conforme a las funciones nuevas, conservando el rango global salvo justificación explícita de utilidad.

`metricas.mjs`: 130 párrafos; media 33, mediana 33, 6 % por encima de 50 palabras, máximo 55; 36 H3. Son medidas sobre Markdown, no altura de párrafos renderizados. El máximo bajó de 86 a 55: eso sí mejoró. Hay tres fragmentos señalados por el script; el de «Si de todos modos tiene que salir» introduce correctamente una lista y no es un defecto. El de Riemer:67 sí es una transición prescindible.

`tono.py`: **0 muletillas por 1.000**, bajo sus exclusiones propias; cuenta 5.473 palabras, no el total contractual. Ese cero acredita el control concreto de muletillas, **no** la integración narrativa ni una voz propia. No se usa como detector de IA.

El script oficial sigue sin reconocer el formato del rango/targets/tabla de fuentes ni la bibliografía `details`. Sus avisos mecánicos se conservan como evidencia, sin convertir esos falsos positivos en defectos nuevos del artículo.

## Contraste de fuentes y recorridos

Las 14 fuentes originales mantienen las mismas identidades y, salvo los pasajes señalados, las mismas afirmaciones que se verificaron en R1. Para no fingir una segunda descarga de todos los documentos, se distingue entre **evidencia de R1 conservada y releída** y las **páginas reabiertas en esta ronda**. El registro completo original permanece en `auditoria-articulo-r1.md`, sección de fuentes, vinculado a su versión auditada.

| Fuente / versión | Afirmación y ubicación actual | Comprobación de esta ronda |
|---|---|---|
| Salonen 2020, PMC7058607; Riemer 2019, PMC6730926 | Edad y recuperación / 65–71, 430 | Misma afirmación; evidencia de texto completo de R1 conservada. No se presenta como descarga nueva. |
| Gähwiler 2020, PMC7525486; Lopes Fagundes 2018, DOI 10.3389/fvets.2018.00017 | Señales grupales y dolor / 193–195, 220, 432 | Sin cambio sustantivo; cotejo con evidencia de R1. Extrapolación al perro inmóvil sigue declarada. |
| Riemer 2020, DOI 10.1016/j.jveb.2020.04.005; [resumen publicado en AGRIS](https://agris.fao.org/search/en/records/65dec3727c7033e84bebc12e) | Feed/Play y percepciones / 189, 277–279, 422–426 | **Reabierto.** Corresponde el grupo estadístico; no acredita ausencia de toda información sobre movilidad en texto completo. |
| ESVCE v2.1, 2026 | Refugio, acepromazina y plan individual / H2-2, 3, 4, 5, 10 | Mismo PDF y afirmaciones; cotejo de R1. Ya no se equipara todo «algo para dormir» con acepromazina. |
| IDPYBA/Bogotá 2024 y Bogotá 25-12-2025 | Reportes históricos / 53–61, 343 | Sin cambio de cifras ni denominador; evidencia de R1. No se actualizan reportes de 2025 como si fueran de 2026. |
| COLVET según Delfino 2024, Teletica 2022; UNAM según N+ 2024 | Refugio, paseo, esfínteres, CBD y patio | Atribuciones secundarias conservadas. «Con énfasis en analgesia y anestesia» ya no afirma especialidad no comprobada. Los límites de acceso a originales siguen siendo los de R1. |
| Chile Ley 21.310; Colombia Leyes 670 y 2224 | Legislación / H2-9 | Evidencia original de R1; nuevo contraste primario del decreto en la fila siguiente. No certifico todos los decretos municipales. |
| [Decreto 2174 de 2023, copia del INS](https://www.ins.gov.co/Normatividad/Decretos/DECRETO%202174%20DE%202023.pdf) | Alcance de autorización / 381, 391 | **Abierto por primera vez con éxito en esta auditoría.** Leídos art. 2.2.4.2.5 y 2.2.4.2.8; ver P2-4. No implica una revisión exhaustiva de vigencia consolidada al día. |
| [Ministerio del Interior, comunicado de 2023](https://www.mininterior.gov.co/noticias/gobierno-establece-medidas-para-uso-y-manejo-de-polvora-por-temporada-de-%EF%AC%81estas-de-%EF%AC%81n-de-ano-en-el-pais/) | Reglamentación y permiso / 391 | **Reabierto**, pasaje del permiso con categoría tres. |
| [VCA, Pain or Limping](https://vcahospitals.com/urgent-care/health-concerns/pain-or-limping) | Incapacidad nueva de levantarse / 159 y FAQ 3 | **Reabierto**, lista de motivos de urgencia. La corrección de contexto es pertinente. |
| [Merck, Disorders of Micturition](https://www.merckvetmanual.com/urinary-system/noninfectious-diseases-of-the-urinary-system-in-small-animals/disorders-of-micturition-in-dogs-and-cats) | Goteo con retención / 185 | **Reabierto**, almacenamiento/vaciado y rebosamiento. Atribución correcta. |
| [Cornell, Fear of fireworks and thunderstorms](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/fear-fireworks-and-thunderstorms) | Necesidades y correa / 258–264 | **Reabierto**, apartado de preparación; respalda correa incluso en patio cerrado. |
| [Alcaldía, campaña 2026–2027](https://bogota.gov.co/mi-ciudad/ambiente/2026-10/bogota-presenta-campana-de-proteccion-animal-por-el-uso-de-polvora) | Periodo y anuncio de formulario / 401 y FAQ 7 | **Reabierta**; confirma anuncio y fechas, no la finalización del recorrido. |
| [IDPYBA, portada](https://www.animalesbog.gov.co/) y sus noticias de 30-10/3-11-2026 | Canal de atención y acceso / 403 y FAQ 7 | **Abiertos** portada y dos noticias; 123 confirmado, URL final de formulario no localizada. Sin envíos ni contactos externos. |

## Recursos y límites de publicación

| Recurso | Ruta / prueba | Estado |
|---|---|---|
| Tres avisos y ocho FAQ | MDX + inspección `FAQ.astro` | Presentes; enlace de FAQ Bogotá pendiente. |
| Tabla de leyes | H2-9 + `TablaApilable` | Presente; sin nueva prueba responsive; precisión P2-4. |
| Tarjetas | Ambos MDX + componente ya inspeccionado en R1 | Persisten; no se repitió prueba de interacción. |
| 14 enlaces internos de Markdown | Mismos destinos que en R1; inspección estática | Sin cambios de ruta. No se certifican respuestas públicas HTTP en esta ronda. |
| Formulario Bogotá | Anuncio y portada institucional | Parcial: solo anuncio y canal general, no formulario final. |
| Diez imágenes temáticas y portada | Marcadores del MDX; decisión documentada en corrección/TODO | Fase visual pendiente, separada del rechazo de voz. No se evalúan edad/alt de imágenes no entregadas. |
| Calidad de vida | Página de herramienta existente | Destino válido comprobado en R1; no se auditó su lógica/interacción ahora. |
| Build y producción | Reporte del corrector / estado `Publicado` | Build declarado por otra sesión; no reproducido aquí. Sin autorización de despliegue derivada de esta auditoría. |

## Qué corregir, en orden

1. Adoptar el nuevo encargo narrativo y dejar constancia de qué restricciones antiguas quedan superadas: Dakota solo en foto, Luna en un único bloque y ausencia obligatoria de hilo. No inventar testimonios para cumplirlo.
2. Reorganizar por decisiones con la experiencia real insertada donde aporta: escena doméstica y reunión, patio/interior, refugio elegido, paseo adaptado, compañía. Usar el anexo como mapa, no como texto para copiar.
3. Mantener toda la seguridad corregida. H2 del perro inmóvil, normativa y medicación no requieren una vivencia personal que no existe.
4. Resolver el enlace/alcance de Bogotá y las precisiones térmicas, clínicas y legales.
5. Recortar repeticiones para hacer sitio: acepromazina reaparece en explicación, aviso, lista de consejos y FAQ; CBD en explicación, lista y FAQ. La repetición de una advertencia puede ser útil; conservar su función y evitar desarrollar la misma explicación otra vez en cada lugar.
6. Verificar cada hecho personal contra su procedencia y comprobar de nuevo los pasajes clínicos afectados. No alterar España como parte de este encargo.
7. Volver a medir con el mismo método; el objetivo no es aumentar menciones ni palabras, sino que los recuerdos cambien decisiones y que exista una voz coherente.

La siguiente auditoría independiente será **R3 del artículo**, con el nuevo criterio explícito de voz. No se reinicia la numeración al reestructurar. Conviene que la siguiente corrección sea completa y venga acompañada de un cierre de todos los hallazgos, para que R3 no se consuma comprobando otra inserción superficial de testimonios.
