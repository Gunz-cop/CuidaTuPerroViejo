# Auditoría independiente del brief de procesionaria — R1

Fecha: 2026-11-06. Ronda **1/5**. Auditor: sesión independiente `auditar_brief`; no ha creado ni corregido el brief. Documento: `briefings/briefing-procesionaria-pino-perros.md`, v1. SHA-256 comprobado: `9468d4165fb05d1154b4e8941355654afd607a32a477ec98ddc211363c27ff41`.

El límite de cinco rondas y el alcance reducido de R2–R5 proceden de la instrucción expresa del propietario en este encargo y prevalecen sobre las tres rondas del repositorio. No se han realizado rondas previas ni auditorías ocultas.

## Veredicto

**Válido para redacción (APTO).** El contrato respalda las acciones urgentes con fuentes específicas comprobadas y mantiene los límites clínicos, de procedencia y de entrega necesarios para redactar.

## Hallazgos

- **P0:** ninguno confirmado.
- **P1:** ninguno confirmado.
- **P2:** ninguno que requiera ajuste del brief.

Las pruebas del artículo, imágenes y navegación siguen pendientes por su fase de producción: son gates explícitos, no promesas presentadas como operativas ni defectos de este brief. Este veredicto aprueba la planificación; no acredita un artículo redactado, imágenes generadas o publicación.

## Alcance y método

Revisión completa conforme a `AGENTS.md`, skill generadora y su plantilla, skill de auditoría y formato/taxonomía, calidad editorial, voz España, dirección visual, apoyos responsive, `src/content.config.ts`, componentes AlertBox/FAQ y política editorial local y pública. La evidencia del generador se inspeccionó como antecedente; las aperturas y mediciones enumeradas abajo las repitió el auditor.

Se abrieron las cinco fuentes contratadas. La URL directa de GVA produjo inicialmente un error de acceso de la herramienta; tras localizarla mediante búsqueda se abrió el mismo documento y se leyeron sus apartados. Por tanto, no queda una fuente contratada sin abrir. Se contrastaron título/autoría/fecha y pasaje por separado; S3 se limita al resumen editorial, como declara el brief. No se verificaron tablas o texto íntegro de S3.

## Verificación de fuentes y trazabilidad

| Fuente e identificador | Comprobación independiente, afirmación y localización | H2 / límite de uso |
|---|---|---|
| **S1 COLVET/Murcia, 28-02-2026.** [Campaña de protección frente a procesionaria](https://www.colvet.es/es/1-Noticias-actualidad/19931-El-Gobierno-de-Murcia-y-el-Colegio-de-Veterinarios-promueven-una-campana-para-proteger-a-los-animales-de-compania-frente-a-la-procesionaria.htm) | Verificada. Encabezado/fecha y apartado «Reacciones inflamatorias», párrafos sobre signos y actuación (líneas 73–88 de la extracción). Sostiene sospecha → atención inmediata y agua templada que cae sobre boca/hocico, sin frotar/manipular. | H2-1/2. Campaña profesional, no ensayo ni prueba de neutralización térmica. El brief conserva ese límite. |
| **S2 Generalitat Valenciana, 05-03-2021.** [Aviso fitosanitario: procesionaria y perros](https://www.gva.es/es/web/arees/medi-ambient-i-territori/-/asset_publisher/sCvAJqvRL2o0/content/aviso-fitosanitario-procesionaria-y-perros/20551003?_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_sCvAJqvRL2o0_assetEntryId=173116793) | Verificada tras búsqueda y apertura. Fecha visible «5/03/21»; «Qué daños…», «Qué hago…» y recomendaciones (líneas 160–192). Respalda pelos urticantes, protección, evitar fricción/vómito y zonas afectadas, aviso local. | H2-2/5. El brief excluye expresamente bicarbonato y poda doméstica presentes en esta fuente; la actuación inmediata toma el agua templada de S1. Calendario regional orientativo. |
| **S3 Niza et al., 2012, 41 casos.** [DOI 10.1111/j.1863-2378.2011.01415.x](https://onlinelibrary.wiley.com/doi/10.1111/j.1863-2378.2011.01415.x) | Verificada identidad mediante búsqueda del DOI y apertura editorial: ocho autores, título, volumen 59(1), 35–38, primera publicación electrónica 2011 y volumen febrero 2012. «Summary» (líneas 171–174): serie retrospectiva, 41 perros, relación demora/necrosis; también hubo necrosis entre atendidos antes de dos horas. | H2-3. Uso observacional portugués, sin inferir incidencia española, efecto geriátrico o margen seguro para esperar. Resumen leído, texto completo/tablas no examinados. |
| **S4 Kaszak, Planellas y Dworecka-Kaszak, 2015.** [PDF editorial, DOI 10.17420/ap6103.02](https://annals-parasitology.eu/archive_2001_2022/2015-61-3_159.pdf) | Verificada cabecera, autores, revista/año/páginas y DOI, también localizado por búsqueda. «Clinical approach», «Clinical signs», «Treatment», pp. 160–162: exposición oral/ocular/pelos transportados, edema/dificultad respiratoria, evolución de lesiones en días y eventual soporte alimentario. | H2-1/3/4. Revisión histórica, no protocolo domiciliario actual. El brief excluye dosis, medicamentos, vinagre, agua caliente y destrucción doméstica de nidos; conserva descripción clínica. |
| **S5 ICOVAL, 23-01-2026.** [Aviso de aparición temprana en Alicante](https://www.icoval.org/es/1-Noticias/2223-El-Colegio-Oficial-de-Veterinarios-de-Alicante-ICOVAL-advierte-de-la-aparicion-temprana-de-la-oruga-procesionaria-y-del-grave-riesgo-que-supone-para-los-animales-de-compania.htm) | Verificada. Título/fecha, apertura y recomendaciones 1–4 (líneas 47–60). Confirma aviso provincial de enero, control de exposición, valoración incluso con signos leves y descontaminación/tratamiento en ámbito clínico. | H2-3/5. Ejemplo local fechado, sin convertirlo en alerta actual nacional o predicción para otro invierno. |

Las cinco fuentes tienen uso concreto en §6 y correspondencia en §9; no hay referencias decorativas. Cobertura inversa: síntomas S1/S4; primera ayuda S1/S2; evaluación S3/S4/S5; seguimiento S4; prevención S2/S5. Introducción y FAQ reutilizan fuentes y límites ya asignados. No se exige una sexta fuente para completar una cuota.

## Mediciones y arquitectura

| Control | Resultado reproducido |
|---|---|
| `seoTitle` | **45** caracteres; máximo 55. |
| `metaDescription` | **143** caracteres; máximo 160. |
| YAML | Parseado con PyYAML; nueve campos permitidos, valores de cadena y `pilar: salud-perros-mayores` en enum. |
| Presupuesto | 100 + 320 + 400 + 300 + 250 + 350 + 80 + 400 = **2.200**; ±15 % = **1.870–2.530**. |
| AlertBox | Tres planificados: info/introducción, danger/síntomas y warning/manejo. |
| FAQ | Siete preguntas planificadas; un FAQ final, plegado. |
| Rutas | Slug, ruta del artículo y carpeta de las tres imágenes coherentes; nombres públicos sin tildes/espacios. |
| Formato | Instrucciones/puntos para redactor; no hay párrafos de artículo terminados. Imports válidos; H1, TOC, firma y schema delegados al layout. |

La utilidad distingue cinco decisiones y evita expansión de relleno: reconocer urgencia; preparar traslado/lavado seguro; comunicar y valorar; seguir el alta; prevenir otra exposición. No se pide un caso, recuperación o H2 narrativo ficticios. La atribución de la serie portuguesa queda separada de la guía sin caso y del sujeto visual.

El tono remite a la guía única y su excepción España, con vocabulario y formatos adecuados. El script `tono.py` queda exigido para el futuro MDX; ejecutarlo sobre este documento de instrucciones no mediría el artículo encargado. No se declara un resultado de tono de un artículo inexistente.

## Seguridad y coherencia editorial

Contrastada la [política editorial pública](https://cuidatuperroviejo.com/politica-editorial) con el archivo local. Son coherentes la firma de Gonzalo, ausencia de credenciales/revisión inventadas, uso de ilustraciones y prohibición de pautas farmacológicas al lector.

La apertura y H2-1/2 ordenan atención inmediata ante exposición sospechada. El lavado es superficial y condicionado: se omite ante dificultad respiratoria/deglutoria, resistencia o riesgo de mordedura; sin forzar boca, líquidos hacia garganta, fricción, presión ni demora para preparar agua. Estas condiciones se presentan honestamente como seguridad editorial conservadora, no como resultados de ensayo. No se recomienda ingerir antídotos, provocar vómito o usar un margen de dos horas. El seguimiento conserva tratamiento/alimentación individualizados por la clínica; la calculadora se limita a observación posterior y nunca decide la urgencia.

## Inventario, enlazado y canibalización

Se revisó el inventario local: P1-04 [~] apunta al brief correcto; chequeo geriátrico y vacunas/desparasitación figuran [x] con las dos rutas de §5; el pilar Salud y la herramienta de calidad de vida constan en su arquitectura/inventario. No hay slugs supuestos para P1-13/P1-10 pendientes. Los dos artículos locales de apoyo y el pilar confirman esas rutas de contenido.

Se consultó por conector el árbol recursivo remoto de `main` y no contiene otro archivo de procesionaria. El ángulo de contacto urticante se diferencia de prevención parasitaria general y golpe de calor. La ausencia de PRs coincide con la evidencia previa del coordinador/generador; esa búsqueda de PRs no se presenta como repetida por el auditor.

Existencia documental de los cuatro destinos aprobada; navegación pública y recorrido funcional de la calculadora pendientes de la fase de redacción/publicación, como declara el contrato. No se ha simulado una prueba pública completa.

## Dirección visual

Se contrastaron por conector tres briefs, sus MDX (`heroImageAlt`/alt) y listado de assets remotos: petardos/bodeguero, leishmaniosis/mestizo pastor-mastín y golpe de calor/podenco. El perro de aguas español elegido es distinto y se justifica como elección editorial plausible, sin afirmar prevalencia o susceptibilidad.

Se leyeron los tres prompts individualmente: misma raza/edad/manto/mancha; canas en hocico, cejas y párpados; ojos algo hundidos; lomo y musculatura de mayor; postura/apoyos naturales; exclusión de enfermedad inventada y rechazo a tamaño móvil. La búsqueda literal de «postura» no aparece en el prompt 1, pero este sí especifica «marcha prudente», cabeza a altura del lomo y apoyos naturales: cumple el criterio semántico y no constituye omisión.

Cada ficha concreta función, escenario/materiales, dirección/manos/correa, cámara, luz, textura, exclusiones y aceptación. La primera referencia está declarada pendiente y precede a derivar otras escenas. No hay recorte ni animación que necesite prompt adicional. Se evita ilustrar maniobras orales o lesiones; ninguna imagen se presenta como paciente o desenlace clínico. Capturas y verificación física de imágenes pendientes correctamente explicitadas.

## Recursos y pruebas

| Recurso prometido | Ruta/ubicación | Comprobación actual | Gate pendiente |
|---|---|---|---|
| Acciones, datos para llamada y registro | Cuerpo del futuro MDX, H2-2/3/4 | Planificación con utilidad y responsable; sin descargas fingidas. | Redactar, revisar orden/seguridad y lectura móvil. |
| Tres imágenes | `/images/blog/procesionaria-pino-perros/` | Prompts/rutas/alt y referencia inicial pendientes declarados. | Producir e inspeccionar o retirar coherentemente campos e inserciones. |
| FAQ | FAQ.astro al final | Siete temas, plegado y prueba definidos. | Verificar texto, teclado y móvil en artículo real. |
| Ampliación y herramienta | Cuatro rutas de §5 | Inventario/código, no ensayo público de navegación. | Abrir destinos, completar herramienta y validar límites de uso. |

Plan móvil: listas breves, no tablas largas copiadas del brief, FAQ plegada, imágenes y capturas a 390/1366 px claro/oscuro. No PDF/vídeo/descarga prometidos. El contrato exige build y evidencia del artículo antes de publicación; luego URL e imágenes públicas. No corresponde ejecutar un build de este snapshot parcial sin artículo ni cambios de código.

## Efecto cascada

No se han encontrado errores de fuente/identificador que requieran rastrear otros briefs. No existe un artículo de procesionaria en el árbol remoto consultado; por tanto, no hay MDX que herede un fallo de este contrato. Inventario actualizado solo al estado de briefing. La aprobación no cambia ese estado a Publicado.

## Lo que sí funciona

- Prioridad de salida/atención frente a lavado y explicación fisiológica.
- Límites explícitos al reutilizar revisión de 2015 y aviso GVA: no copiar sus remedios o retirada doméstica.
- Niza atribuido a Portugal y leído como asociación, sin reloj de espera ni pronóstico geriátrico ficticio.
- Guía sin paciente, autoría automática real, continuidad visual senior y recursos pendientes tratados como gates.

## Qué corregir, en orden

**Ninguna corrección necesaria para aprobar el brief.** Puede pasar a redacción cuando se encargue esa fase. No iniciar R2 por rutina: solo si aparece un nuevo cambio o bloqueo que afecte al contrato; conservar esta sesión y revisar entonces únicamente bloqueantes y ajustes. Rondas consumidas: **1 de 5**.
