# Auditoría independiente del artículo — R1

## Veredicto

**APTO con reservas en los temas de fondo del borrador textual: 0 P0 y 0 P1 sustantivos; no requiere correcciones de fondo para superar esta ronda.**

**Publicación: pendiente.** Este veredicto no autoriza publicar: faltan las tres imágenes, su validación y las comprobaciones visuales/documentales que se detallan abajo. Son pendientes conocidos del encargo, no defectos que obliguen a rechazar la redacción ni autorización para generar imágenes.

- Fecha: 2026-10-25. Ronda **1 del artículo**, dentro del máximo de tres autorizado; no es una nueva auditoría del brief.
- Auditor: agente independiente de la sesión redactora; sin correcciones al artículo, al brief ni a la entrega.
- Rama: `claude/redaccion-miedo-petardos-perros-mayores`.
- HEAD comprobado: `64d4ab3ce39c246ef31b209f7829efca0955b05a`.
- Archivo auditado: `docs/contenido/miedo-petardos-perros-mayores/articulo-borrador.mdx`, 512 líneas.
- **SHA-256 exacto:** `f0c0a6e62f4de7f448f53721fac3794e6528c12c19e35682a31096e05bfbddf9`.
- Contrato: brief v7 completo, especialmente §§3, 6 y 9; testimonios originales; decisiones del propietario comunicadas el 2026-10-25 sobre su propia cara y la fecha de hoy. Se aplicaron AGENTS.md, CLAUDE.md, la skill de auditoría y sus referencias de calidad, voz, métricas, taxonomía y formato; la política editorial local y la referencia responsive.
- Alcance: seguridad clínica, procedencia narrativa, respaldo de afirmaciones, utilidad, contradicciones y requisitos contractuales duros. Sin pulido cosmético ni reapertura del brief aprobado.

## Hallazgos

### P0 / P1 sustantivos

**Ninguno confirmado.** Las limitaciones de acceso de S2/S5/S7/S10 ya estaban documentadas y las afirmaciones del artículo se mantienen dentro de lo verificable. No se confunden con errores de las referencias.

### Observación no bloqueante

En las líneas 487, 490 y 495 de la bibliografía visible se menciona «el brief»; en 492 se conserva «contraste español pendiente». Son notas de procedencia y de alcance documental, no instrucciones de redacción dirigidas por error al lector ni datos clínicos inventados. Su eventual adaptación al lenguaje del lector queda fuera del ciclo solicitado de fondo. **No se exige retocarlas ni abrir otra ronda por esta observación.**

## Comprobaciones propias del contrato

### Volumen y distribución

Recuento propio del texto visible, por separación de espacios: cuerpo tras el frontmatter; se eliminan imports, comentario MDX, imágenes, pies y el bloque `data-editorial-bibliography`; se conservan títulos H2/H3, texto de tablas, títulos y cuerpo de AlertBox y preguntas/respuestas extraídas de FAQ; se retiran etiquetas y destinos de enlaces, conservando sus anclas. **Resultado: 5.653 palabras**, frente a 5.300–6.000. Coincide con la entrega tras reproducir el cálculo; no se acepta su cifra por declaración.

| Sección | Real | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 335 | 350 | −4,3 % |
| H2-1, edad y miedo nuevo | 544 | 540 | +0,7 % |
| H2-2, señales y observaciones | 556 | 560 | −0,7 % |
| H2-3, calendario y leyes | 507 | 500 | +1,4 % |
| H2-4, consulta veterinaria | 613 | 640 | −4,2 % |
| H2-5, refugio | 552 | 550 | +0,4 % |
| H2-6, plan de la noche | 607 | 600 | +1,2 % |
| H2-7, compras y encuesta | 419 | 440 | −4,8 % |
| H2-8, aprendizaje | 393 | 400 | −1,8 % |
| H2-9, huida | 290 | 300 | −3,3 % |
| H2-10, recuperación | 276 | 280 | −1,4 % |
| Conclusión y FAQ | 561 | 540 | +3,9 % |

También se contrastaron los **31 H3** con los targets del §6, contando sus títulos y excluyendo los avisos que tienen presupuesto separado: todos dentro del ±10 %. El más próximo al límite es «La acepromazina no es la respuesta»: 90/100, −10 % exacto. La sección de tabla de encuesta da 255/280, −8,9 %; la de ayuda especializada 100/110, −9,1 %. No hay secciones omitidas ni compensación de un H2 insuficiente mediante otro sobredimensionado.

Se ejecutó el script general `metricas.mjs` desde una copia en `/tmp`, cambiando únicamente su ruta de lectura para apuntar al borrador documental; **no se copió el artículo a la colección publicada**. Su salida bruta «NO APTO, 8 bloqueantes» no aplica tal cual a este contrato: cuenta bibliografía/sintaxis y da 6.340; interpreta como obligatorio el enlace de calculadora expresamente excluido; no interpreta las filas S1–S11; exige el cuarto AlertBox bibliográfico que el §9.3 prohíbe. Las tres ausencias de imágenes sí se confirmaron y se registran como gate. No se modificó el script del repositorio ni se presentó su resultado como aprobación editorial.

### Estructura, enlaces y voz

- Exactamente **3 AlertBox**: info en 37, danger en 124 y warning en 229, en las secciones exigidas.
- **2 tablas / 2 TablaApilable**, en H2-3 y H2-7; tres columnas; **33 td, todos con data-label**. La lista de H2-2 es lista, no tabla.
- **1 FAQ con 8 preguntas contractuales**; respuestas de 46, 48, 49, 49, 48, 49, 51 y 50 palabras: dentro de 42–56. No hay H1 manual. Bibliografía en details sin `open`; el componente FAQ existente usa details cerrados por defecto.
- **9 destinos internos obligatorios y el opcional de golpe de calor**, sin calculadora ni enlaces a artículos pendientes. Se abrieron sus archivos locales y se comprobó su correspondencia de slug/pilar. Los intentos de abrir las diez URL públicas y la política editorial devolvieron **HTTP 403**: no se certifica su funcionamiento público desde esta sesión, y tampoco se afirma que estén rotas.
- Frontmatter: seoTitle 44 caracteres, metaDescription 154, pilar correcto, fecha `2026-10-25` y firma del 25 de octubre de 2026. La fecha procede de la decisión confirmada del propietario, no de una suposición del auditor.
- `tono.py` ejecutado sobre el archivo auditado: 5.167 palabras de su denominador propio, **0 muletillas, 0,0/1.000**. Ese denominador no sustituye al contractual. La prosa da media aproximada 28 y mediana 28, 0 % de párrafos de más de 50 palabras; no hay densidad excesiva. Los fragmentos breves no alteran el fondo y no generan petición de pulido.
- Barrido de vocabulario: sin pólvora, alzar, reventar, manejar, usted, ustedes, Osa, Baltor ni Jaspe. Tuteo y plural peninsular presentes.

## Fuentes → afirmaciones → comprobación independiente

Se abrieron las fuentes mediante solicitudes de red propias el 2026-10-25, se extrajo su texto y se buscaron los pasajes concretos. HTTP 200 se distinguió de acceso real: PMC para S11 entregó CAPTCHA y se usó PLOS. Los resúmenes de buscador no se usaron como prueba. La numeración remite a las identidades completas del §3 del brief; los enlaces siguientes permiten repetir el contraste.

| Fuente / H2 exigidos y líneas del artículo | Afirmación y localización comprobada en la fuente | Resultado y límite |
|---|---|---|
| **S1, Salonen et al. 2020**, H2-1: 47–49 | [PMC7058607](https://pmc.ncbi.nlm.nih.gov/articles/PMC7058607/), Results «Demography», «Prevalence», «Age and sex differences», Discussion: 13.715; 32 %; 26 %; aumento con edad especialmente trueno; clasificación basada principalmente en frecuencia. | Texto íntegro accesible. Autoría, año y cifras coinciden. Encuesta finlandesa identificada; sin trasladar el porcentaje a España ni usar datos de raza. |
| **S2, Blackwell, Bradshaw y Casey 2013**, H2-1: 51–53, 81; H2-2: 98 | [Repositorio Bristol](https://research-information.bris.ac.uk/en/publications/fear-responses-to-noises-in-domestic-dogs-prevalence-risk-factors/), Abstract: n=3.897 / 383, casi mitad frente a cuarta parte, riesgo con edad, fuegos frecuentes, menos de un tercio pidió ayuda y falta de coocurrencia habitual con separación. | Ficha y resumen completos abiertos. El artículo no excede ese resumen. Texto completo de revista no leído; no se atribuye un país ni datos de raza. |
| **S3, Gähwiler et al. 2020**, H2-2: 90–98, 110–114; H2-4: 187 | [PMC7525486](https://pmc.ncbi.nlm.nih.gov/articles/PMC7525486), Abstract, Methods, Results y Discussion: 36 perros, tres minutos, orejas/movimiento/jadeo; vocalización/parpadeo/escondite sin significación tras corrección; lamido/bostezo sin aumento; exclusiones de medicación y pérdida auditiva. | Texto íntegro accesible. Coincide; se conserva la diferencia entre observación de grupo y diagnóstico individual. El artículo acierta al decir que esconderse sí se observó, aunque su aumento no quedó confirmado. |
| **S4, Lopes Fagundes et al. 2018**, H2-1: 63–67; H2-4: 189; H2-8: 415; H2-10: 465 | [Frontiers, DOI 10.3389/fvets.2018.00017](https://www.frontiersin.org/articles/10.3389/fvets.2018.00017/full), selección de veinte casos, Table 2, Results y Discussion: grupos de diez; inicio medio 6 años 6 meses / 2 años 8 meses; generalización; recomendación de valorar dolor. | Texto íntegro accesible. Coinciden autoría y datos; serie pequeña cualitativa, sin causalidad ni diagnóstico doméstico. No se atribuye dolor a Dakota. |
| **S5, Riemer, tratamientos**, H2-4: 215–217; H2-5: 256–262; H2-6: 316, 323; H2-7: 350–372; H2-8: 399 | [Resumen completo de Europe PMC, DOI 10.1101/663294](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1101/663294&format=json&resultType=core): N=1.225; solo Feed/Play asociado a mejoría; interacción/ambiente sin asociación; 69 %/202 medicación, >70 %/694 contracondicionamiento, 69 %/433 relajación, 55 %/377 CD, 44 %/300 chaleco y 27–35 % alternativas. [Crossref de la publicación](https://api.crossref.org/works/10.1016/j.jveb.2020.04.005) confirma Riemer, título, 2020 y revista. | bioRxiv dio **429**, no prueba de referencia falsa. Resumen alternativo leído íntegramente y cifras contrastadas. Versión publicada completa no leída. Todas las cifras van como percepción de dueños, sin porcentajes por fármaco ni prueba de eficacia individual; preprint identificado en bibliografía. |
| **S6, ESVCE**, H2-4: 195, 203–205, 221–223; H2-5: 242, 262, 280; H2-6: 317, 325; H2-8: 391, 417 | [PDF de posicionamiento](https://esvce.org/wp-content/uploads/2026/06/ESVCE-position-statement-on-the-use-of-medications-to-manage-acute-phobic-states-in-dogs-as-an-alternative-to-acepromazine-2.1-ESVCE-def.pdf), «Use of acepromazine», «Alternative medication…», zona segura y derivación: falta de ansiólisis, supresión motora, posible sensibilización, libre entrada/salida y elección individual. | PDF descargado y leído con pdftotext. Coincide. Se han dejado fuera todas sus dosis y plazos de inicio; no se promete disponibilidad española de todas las opciones. |
| **S7, ficha técnica**, H2-4: 207–213 | [PDF VMD británico](https://www.vmd.defra.gov.uk/productinformationdatabase/files/SPC_Documents/SPC_3219375.PDF), §§3.3, 3.5 y 3.6: enfermedad cardiovascular/sistémica grave, seguridad no estudiada >17 años, vómitos/sedación/incontinencia y palidez transitoria en aplicación. [Registro europeo](https://medicines.health.europa.eu/veterinary/es/600000001298) también abierto. | Texto británico leído con pdftotext y atribución explícita correcta. No se afirma seguridad por debajo de 17 ni se recomienda el medicamento. **Contraste español pendiente**, sin presentarlo como hecho completado. |
| **S8, Ley 7/2023**, H2-3: 164–172; H2-4: 195; H2-5: 246, 266; H2-6: 343; H2-8: 417; H2-9: 438–442 | [BOE-A-2023-7936](https://www.boe.es/buscar/act.php?id=BOE-A-2023-7936), arts. 24.2.b/c/f/g/h, 51.2 y 65.7: métodos sin ansiedad/miedo, vigilancia, identificación, pérdida ≤48 h desde que ocurre, veterinario cuando lo requiera y uso de animales en eventos con pirotecnia. | Texto BOE abierto. Coincide; no se convierte en prohibición general de petardos, sanciones o extensión indebida a todo paseo. El plazo de 48 h no se propone como espera. |
| **S9, RD 989/2015**, H2-3: 154–160 | [BOE-A-2015-12054](https://www.boe.es/buscar/act.php?id=BOE-A-2015-12054), arts. 8, 114, 121 e ITC 2: F1–F4, expertos, edades generales de venta 12/16/18 y 120 dB(A, imp) a distancia de seguridad F1–F3, F1 sin petardos. | Texto BOE abierto y pasajes contrastados. Se limita el ruido a lo que regula respecto de personas, sin inferencia sobre daño canino ni edades de uso autonómicas. |
| **S10, Colegio de Málaga según El Español**, H2-3: 176; H2-5: 242, 262–264, 276; H2-6: 301, 317, 323; H2-9: 432 | [Cobertura de El Español, 23-06-2026](https://www.elespanol.com/malaga/20260623/veterinarios-malaga-advierten-fuegos-artificiales-problema-real-bienestar-animal-trt/1003744297125_0.amp.html): refugio accesible, cerrar ventanas/persianas, música/TV, contacto elegido, no castigo, identificación y petición a ayuntamientos. | Artículo completo de prensa abierto. Atribución secundaria explícita en los H2; guía colegial original sin localizar. Sin cifras acústicas de la nota ni prevalencias de prensa. |
| **S11, Riemer 2019**, H2-1: 55–57, 71; H2-10: 453–457 | [PLOS ONE, DOI 10.1371/journal.pone.0218150](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0218150), Abstract, Results y Discussion: 52 %, inicio temprano y pocos casos nuevos después de siete; descenso en los más ancianos y audición como hipótesis; casi 3/4 recuperados a la mañana siguiente, 10 %, 12 % y >3 % en los intervalos resumidos. | **PMC devolvió CAPTCHA pese a HTTP 200; PLOS entregó texto íntegro.** Coinciden autoría, datos y límites de percepción de dueños. La bibliografía declara muestra compartida con S5; no se suman como estudios independientes. |

La matriz completa de citas coincide con los H2 exigidos: ninguna fuente se queda solo en bibliografía, ninguna falta en uno de sus H2 obligatorios y no hay nuevas citas científicas fuera de la matriz. Las FAQ sintetizan sin añadir referencias fuera de ella.

## Procedencia narrativa, seguridad y utilidad

La declaración de líneas 23–27 identifica al propietario y los países, con observaciones diferenciadas de casos clínicos. Se comprobó contra el archivo íntegro de testimonios: salud de Dakota solo en H2-1 (75–77); calma de Luna, ambas nerviosas/alerta **pero tranquilas**, películas y reunión en **2025**, sin mes, en H2-2 (102–106); perra vecina en el mismo H2, sin edad/desenlace; brazos/voz solo en H2-6 (327–337). No hay causas inventadas para la calma, edades añadidas ni casos excluidos. La propia cara está confirmada en el encargo y anotada en 333; no requiere nueva consulta.

Los quince puntos de §9.6 se contrastaron uno a uno:

| Requisito | Resultado |
|---|---|
| 1, sin dosis/plazos de fármacos ni parámetros de grabaciones | Cumple, incluida la exclusión de dosis/plazos presentes en S6. |
| 2, principios activos, decisión veterinaria, sin marcas ni porcentajes individuales | Cumple en 203–217; tampoco se prescribe en FAQ. |
| 3, acepromazina y calmantes humanos desaconsejados | Cumple, 219–230 y FAQ 3. |
| 4, ficha atribuida y contraste español | Atribución británica correcta; contraste español sigue pendiente de publicación. |
| 5, S5/S11 como percepciones | Cumple, tanto en cifras como en evolución/recuperación. |
| 6, acompañar sin reforzar/curar, contacto elegido | Cumple, 242–264, 317–335, FAQ 2. |
| 7, sin promesa de desaparición | Cumple, 405–411 y cierre. |
| 8, sin cifras de S10; límite S9 correctamente acotado | Cumple, 154–160. |
| 9, sin diagnóstico conductual ni causalidad desde S4 | Cumple, 63–77, 187–193, 415, 461–467. |
| 10, urgencias junto a lista | Cumple, 116–126. |
| 11, leyes sin multas/ilegalidad general | Cumple, 154–178, 343 y 438–442. |
| 12, sin horarios ni reglas regionales inventadas | Cumple; calendario condicionado al programa local. |
| 13, datos extranjeros sin porcentaje español | Cumple, 47–59 y 92. |
| 14, brazos como vivencia con riesgos, sin recomendarlo | Cumple, 327–335. No se narra poner boca arriba. |
| 15, sin recomendar castigo, tirar, mojar o elevar voz | Cumple, 264 y 331–335; la práctica familiar queda separada de la pauta de calma. |

La utilidad es distinta por H2: decidir revisión ante cambio; reconocer señales y urgencias; anticipar calendario/normas; preparar consulta; adaptar refugio; ejecutar la noche; valorar compras; organizar aprendizaje; buscar y comunicar una pérdida; vigilar recuperación. No se detecta una contradicción sustantiva entre el refugio recomendado por expertos y la ausencia de asociación observada en encuesta: esa diferencia se explica en 256–262. La tabla de productos y FAQ 4 tampoco convierten los resultados de encuesta en un veredicto contra ensayos de feromonas. Se contrastó el pasaje «moderada solo en miedo a tormentas» del artículo de ansiedad por separación y el alcance correspondiente del brief de feromonas.

## Recursos y estado de publicación

| Recurso / ubicación | Prueba propia | Estado |
|---|---|---|
| Calendario, H2-3, líneas 135–146 | Tabla real, tres columnas, td etiquetadas | Texto entregado; validación 390/1366 px claro/oscuro y altura pendiente. |
| Encuesta, H2-7, líneas 354–366 | Tabla real; todas las cifras contra resumen S5 | Texto entregado; misma validación visual pendiente. |
| Plan de noche, H2-6, 313–319 | Siete pasos sin dosis/horarios farmacológicos | Entregado. |
| Portada `/images/blog/miedo-petardos-perros-mayores/bodeguero-senior-refugio-dormitorio-nochevieja-v1.webp` | Ruta y alt en frontmatter; directorio/binario ausentes | Pendiente autorizado; cuenta como **una de tres**, no se olvida el hero. |
| Paseo `/images/blog/miedo-petardos-perros-mayores/bodeguero-senior-paseo-antes-de-nochevieja-v1.webp` | img/alt/pie del §8 en 305–307; binario ausente | Pendiente autorizado. |
| Consulta `/images/blog/miedo-petardos-perros-mayores/bodeguero-senior-revision-dolor-consulta-v1.webp` | img/alt/pie del §8 en 197–199; binario ausente | Pendiente autorizado. |
| PDF, vídeo, animación, calculadora | No se anuncian ni enlazan | No aplican. |

No se abrieron imágenes inexistentes ni se generó ninguna. La continuidad del sujeto senior, anatomía, alt fiel y legibilidad visual **no están certificados**. El pie previsto para el hero permanece en el brief/entrega y deberá resolverse en la entrega visual; no se exige duplicar ahora la portada dentro del cuerpo.

Antes de publicar siguen pendientes: producción visual tras autorización expresa y validación de las tres imágenes; capturas/pruebas de tablas y recursos a las dimensiones y temas exigidos; contraste español de S7 o resolución editorial documentada de su alcance; comprobación de programas oficiales del calendario. Las verificaciones parciales de S2, S5 y S10 se conservan con sus límites: las afirmaciones aquí utilizadas sí se contrastaron en el resumen o fuente secundaria permitida y no obligan a rechazar el texto. El funcionamiento público de los enlaces no queda certificado por los 403 de esta sesión.

## Lo que sí funciona

- Se mantiene la separación entre sedar y aliviar miedo, con acepromazina desaconsejada y decisiones farmacológicas individualizadas.
- La honestidad de la tabla comercial se conserva sin afirmar ineficacia universal ni introducir afiliación a calmantes.
- El miedo tardío conduce a revisión, no a atribuirlo automáticamente a edad, dolor o cognición.
- Los testimonios conservan los matices que dieron problemas en las rondas del brief: ambas perras, 2025 sin mes, tranquilidad en familia, procedencia geográfica y ausencia de explicación causal.
- La pérdida se trata como actuación inmediata y obligación de comunicación; 48 horas es un máximo legal, nunca una demora aconsejada.

## Qué corregir, en orden

**No hay correcciones de fondo exigidas en R1 ni motivo sustantivo para consumir R2.** Conservad el texto evaluado y los límites anteriores. Completar los gates de publicación cuando corresponda no implica reauditar el brief ni generar ahora las imágenes sin autorización.

## Evidencia propia y evidencia previa

**Propia:** lectura íntegra del borrador/brief/testimonios; hash y HEAD; recuento contractual independiente y reproducción del recuento/H3; ejecución de tono y métricas; inspección de componentes, FAQ, rutas y archivos locales; apertura de once fuentes, alternativas y política/intentos públicos; contraste de los quince requisitos y de feromonas. Descargas y salidas de trabajo en `/tmp/audit-petardos-r1/`; el informe conserva resultados y localizaciones para no depender de ese directorio temporal.

**Previa, no repetida:** los logs de `astro check`/`astro build` y del navegador de la entrega. No se afirman aquí como pruebas ejecutadas por el auditor. La entrega reconoce ausencia de capturas válidas; se mantiene esa limitación. Compilar no acredita imágenes ni uso en móvil.

Se comprobó que el borrador sigue fuera de `src/content/blog/`. No hubo correcciones de contenido, copia permanente a publicación, generación de imágenes, commits, PR, merge ni despliegue.
