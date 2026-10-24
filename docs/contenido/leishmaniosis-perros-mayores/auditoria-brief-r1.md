# Auditoría independiente del brief de leishmaniosis en perros mayores. Ronda R1 de 3

| Campo | Valor |
|---|---|
| Documento auditado | `briefings/briefing-leishmaniosis-perros-mayores.md` (rama `claude/senior-dog-requirement-leishmaniosis-brief`, commit `72af12e`) |
| Versión (SHA-256) | `7379d1f81e445d91808fbda79ae3e699f78d8abf7c889746c7ba04a6afdc2a84` (535 líneas, 75.682 bytes; hash recalculado al cerrar el informe: sin cambios) |
| Fecha de la auditoría | 2026-10-24 |
| Ronda | R1 de un máximo de 3 |
| Alcance | Skill `auditar-briefing-contenido` + `calidad-editorial-adsense.md`, `guia-voz-tono.md` (excepción serie España), `direccion-visual-editorial.md` (requisito senior verificable, raza), `apoyos-visuales-responsive.md`, skill y plantilla generadoras. Alcance extra del propietario: (a) español de España, (b) fuentes españolas, (c) cinco rasgos de edad prompt por prompt y raza distinta, (d) ficha visual completa, (e) apoyos y animaciones con recorte senior |
| Rol | Solo evaluación. No se ha modificado el brief ni ningún otro archivo del repositorio |
| Validación | Local y documental. No se ha ejecutado `npm run build` ni se ha generado ninguna imagen (no existen) |

## Veredicto

**Válido con reservas.** Las diez fuentes existen, sus identificadores resuelven al tema correcto y la gran mayoría de cifras y citas está donde el brief dice; no hay P0. Pero cuatro P1 se propagarían a la redacción tal como están escritos en el contrato bloqueante (§9.6), en el FAQ y en un prompt de imagen: (1) «suelen seguir infectados» y (2) «anual o cada dos años» son afirmaciones más fuertes que sus fuentes, (3) la frase sobre el alopurinol contradice la propia regla «sin pautas de fármacos», y (4) el prompt de la Imagen 3 no incluye íntegros los rasgos de postura senior. **Redacción bloqueada hasta corregir los cuatro P1 y repasar los P2** (R2 de verificación, no reabre las fuentes).

Lo mecánico queda cerrado y correcto (caracteres, suma de targets, enlaces internos, enum, estado en inventario). Lo verificable a mano queda cerrado salvo lo listado en «Qué quedó sin abrir».

## Hallazgos

### P0

Ninguno. Ningún PMID/DOI inventado ni mal asignado, ningún enlace interno inexistente, ninguna cifra renal ni dosis en el texto planificado.

### P1

**P1-1. «Suelen seguir infectados» no está en la fuente (S2) y se fija como bloqueante.**
- Ubicación: §3 S2, línea 112 (`«a menudo siguen infectados»` entre comillas); §6 FAQ pregunta 1, línea 373 («los tratados suelen seguir infectados»); §9.6, línea 486 («suelen seguir infectados»); §6 H2-4, línea 334.
- Evidencia: PMC3125381, apartado Treatment/Prognosis: «Therapy with antileishmanial drugs often leads to clinical cure [54] although treated dogs **may** continue to harbour the parasite and be infectious to sand flies, but to a lesser extent than pre-treatment». «Often» califica la mejoría clínica, no la persistencia del parásito; la persistencia es «may» (pueden). ESCCAP p. 10 dice «reservorio potencial». No existe frase equivalente a «a menudo siguen infectados».
- Por qué importa: una cita entrecomillada que la fuente no contiene, convertida en criterio bloqueante del contrato y repetida en el FAQ. El redactor la copiará y el artículo atribuirá a S2 una frecuencia que no da.

**P1-2. «Anual o bianual» se interpreta como «cada dos años» en el FAQ.**
- Ubicación: §6 FAQ pregunta 4, línea 376 («pruebas anuales o cada dos años»); apoyo en §6 H2-3, línea 319 y §3 S1, línea 96.
- Evidencia: S1 p. 4 dice «con una periodicidad anual o bianual en función del nivel de riesgo». En español «bianual» es «dos veces al año» y «bienal» «cada dos años»; el texto de S1 es ambiguo y no precisa. S2 (PMC3125381, Figure 14 / criterios de cribado) dice «at least every 12 months» para el cribado de perros sanos a petición del tutor. Con la lectura «cada dos años» el FAQ contradiría a S2 y a una de las dos lecturas posibles de S1.
- Por qué importa: es una pauta de frecuencia diagnóstica para el lector, inventada al parafrasear una palabra ambigua.

**P1-3. La regla del alopurinol es una pauta de duración/suspensión y choca con la política y con el propio contrato.**
- Ubicación: §6 H2-4 `### Qué esperar del tratamiento`, línea 333 («el alopurinol no se usa sin interrupción», S1). Contrato: §9.6 línea 482 («Sin dosis, ni duración de tratamiento, ni pautas de fármacos», bloqueante); §3 S1 líneas 99 y 102 («los “6–12 meses” … no pasan al texto»).
- Evidencia: S1 p. 7: «El alopurinol no debe utilizarse sin interrupción en ningún caso. Se deben aplicar tratamientos iniciales de 6-12 meses y después valorar su suspensión». La frase que se deja pasar es la mitad de esa pauta de duración, y la otra mitad se excluye. `src/pages/politica-editorial.astro` línea 55: «no prescribimos fármacos ni dosis»; `calidad-editorial-adsense.md` §4: sin pautas de inicio, ajuste o suspensión.
- Por qué importa: el brief declara bloqueante algo que su propia línea 333 incumple. Aplicar el contrato literal o el H2 literal produce un artículo que o bien contradice la política o bien contradice el brief.

**P1-4. La Imagen 3 no lleva íntegro el rasgo 4 (postura) del requisito senior.**
- Ubicación: §8 Imagen 3, línea 437 («postura natural de perro mayor, apoyos firmes sobre la mesa, sin poses atléticas»). El bloque de línea 406 y las líneas 400 y 507 afirman que el bloque «se copia ÍNTEGRO en cada prompt».
- Evidencia (comparación de cláusulas por programa, bloque frente a cada prompt):

| Cláusula del bloque | Img 1 | Img 2 | Img 3 | Recorte |
|---|---|---|---|---|
| Canas en máscara, cejas y párpados | sí | sí | sí | sí |
| Ojos hundidos, párpados caídos, mirada serena, sin velo ni catarata | sí | sí | sí | sí |
| Lomo hundido tras la cruz, menos masa en hombros y cuartos, cadera marcada | sí | sí | sí | sí |
| «apoyos prudentes» | sí | sí | **no** («firmes») | sí |
| «cabeza a la altura del lomo» (o algo baja) | sí | variante «cabeza alzada a la altura del lomo» | **no** | sí |
| «sin poses atléticas» | sí | sí | sí | sí |
| Sin enfermedad inventada (cojera, heridas, costras, calvas, uñas largas, ojos rojos) | sí | sí | sí, pero añade «pequeño parche rasurado en el antebrazo» (choca con «sin calvas») | sí |
| «ni sufrimiento» | no | no | solo en exclusiones | no |
| Cierre «Rechazar si a tamaño móvil parece un adulto joven» | sí | sí | sí | sí |

- Por qué importa: es la única imagen con el perro de pie sobre una mesa, la postura donde más fácil se cuela una pose de adulto joven. El requisito senior exige los cinco rasgos a la vez y su origen es precisamente un recorte regenerado por edad. Corrección de una línea, pero la skill la clasifica como P1 porque obliga a tocar el brief.

### P2

**P2-1. Las imágenes cumplen la ficha, pero hay fallos de coherencia física y de pie/alt.**
- Imagen 1 (línea 425): la mano derecha pasa la banda por detrás del cuello, la izquierda sujeta la hebilla bajo la barbilla «y su índice comprueba la holgura»: ambas manos están ocupadas, no hay mano libre para el dedo de holgura. Definir una secuencia (collar abrochado, dos dedos entre collar y cuello) o cambiar el gesto. El pie (línea 427) habla de «collares y pipetas» y la escena solo muestra un collar liso sin marca, que no se distingue de un collar normal; el pie y la ficha (línea 421) además difieren en la redacción («según su ficha» frente a «según la ficha de cada producto»).
- Imagen 3 (línea 437 y ficha 417): no se fija hacia dónde mira la perra. Con la tutora «a la derecha del encuadre» sujetando la cabeza, la perra mira a la derecha, y la veterinaria «a la izquierda» queda hacia los cuartos traseros cuando debe alcanzar la pata delantera; definir la orientación. El pie (línea 439 y ficha 421) dice «análisis de sangre **y orina**»; la imagen solo muestra sangre.
- Sujeto: la ficha del sujeto (línea 402) dice «collar gris liso en las demás», pero los prompts de las imágenes 2 y 3 no mencionan collar. Decidir si lleva collar o no y escribirlo.
- Escena segura: no hay fila de «escena físicamente segura» en la ficha (línea 410-421) aunque la revisión de golpe de calor la añadió como comprobación (`direccion-visual-editorial.md`, sección «Revisión de la imagen generada»). En esta escena los riesgos son la aguja, la perra de pie en una mesa y la ventana abierta; añadir la fila y la comprobación.
- Animación (línea 507, §10): la casilla dice que «la animación» incluye los cinco rasgos y la línea de rechazo, pero no hay prompt de animación; hereda el recorte. Correcto según la skill, pero declararlo («la animación no genera fotogramas del perro; si un paso necesita otra pose, requiere prompt propio con el bloque íntegro») y corregir la casilla.

**P2-2. Raza distinta en nombre, parecida en aspecto.** La raza declarada es nueva y la lista de razas recientes (línea 396) es completa: comprobada contra `public/images/blog/` (nombres de archivo), los 21 `heroImageAlt` de `src/content/blog/` y los `Sujeto fijo` de los 19 briefs; incluye el bulldog francés (briefing empapadores) que el registro de la dirección visual no lista. Pero tres sujetos recientes ya son de pelo corto leonado o canela: podenco (golpe de calor, publicado), galgo español («leonado claro y corto», depresión) y bóxer («atigrado leonado» con máscara, letargo). El mestizo propuesto es «leonado arena con máscara negra y pelo corto»: mismo arquetipo cromático que el bóxer y el galgo. Si el objetivo del propietario es evitar la sensación de repetición, conviene cambiar el pelaje (por ejemplo tricolor o atigrado oscuro con canas muy visibles). Además, el motivo (1) «en España es el perro más habitual en protectoras» (línea 398) no tiene fuente; retirarlo o respaldarlo. No es defecto de la raza.

**P2-3. S2, línea 110: cita sintetizada entre comillas.** «La enfermedad renal es la principal causa de mortalidad … y puede ser la única manifestación clínica» une dos frases distintas: «Renal disease may be the sole clinical manifestation of CanL» y «Chronic renal failure is … the main cause of mortality due to CanL». Presentarla como paráfrasis (y distinguir «enfermedad renal» de «insuficiencia renal crónica»).

**P2-4. S2, línea 356 (vacuna).** «S2 recomienda combinarla con insecticidas tópicos»: S2 (2011) dice que «el futuro del control debería ser un enfoque integrado» con vacuna e insecticidas y menciona otras vacunas (la de Brasil y «una vacuna europea basada en antígenos excretados/secretados»). Reformular como «propone un enfoque integrado» y datarlo en 2011.

**P2-5. S6 y Fuenlabrada (línea 277).** «Dónde hay transmisión con datos: área metropolitana de Madrid (S6, Fuenlabrada)»: S6 (apartado de sitios) la describe como foco de un brote humano desde 2009 con liebres y conejos como reservorio inusual y «baja prevalencia de leishmaniosis canina». Es transmisión del parásito, no un dato canino. Escribirlo como «transmisión del parásito, incluida una zona urbana de Madrid» y añadir el límite al registro de la fuente.

**P2-6. S7: patrocinio y explicación alternativa.** El artículo está «patrocinado por Elanco Animal Health» (Acknowledgements) y los autores atribuyen parte del 35,3 % inicial a menor concienciación y menos pruebas, no solo a la prevención. El registro de límites (línea 175) no lo incluye. Añadirlo.

**P2-7. S10: fecha y estado.** La página EPAR de Letifend (fetch por mí) muestra el resumen del dictamen positivo publicado el 19/02/2016 y la reunión del CVMP del 16-18/02/2016; el brief escribe «dictamen positivo del CVMP, 19/02/2016» (línea 200): es la fecha de publicación, no del dictamen. Además el texto leído no indica el estado «autorizado»; una búsqueda web (resumen del buscador, sin abrir el documento) apunta a que sí lo está y a que la ficha técnica EN existe. La laguna 4 (línea 86) sigue abierta y bien tratada: cerrarla con la ficha oficial es opcional, pero el brief puede referirla como pista.

**P2-8. S3, localización.** La frase «No se ha descrito resistencia de los flebotomos a los piretroides» está en p. 17 (apartado «Resistencia frente a repelentes e insecticidas»), no en p. 16 (línea 125).

**P2-9. Estructura declarada incoherente.** Línea 240 («Seis H2 más introducción y cierre») y línea 30 («seis decisiones distintas») frente a la tabla de §6: cinco H2 más introducción y conclusión/FAQ. La regla de §4 (H3 cada 150–200 palabras) no se cumple en la planificación de H2-1 (650 palabras, 2 H3 ≈ 325 palabras cada uno) ni H2-2 (700 palabras, 3 H3 más una tabla).

**P2-10. Voz y reglas de la guía.** La instrucción de la Introducción (línea 261) pide la salvedad «no sustituye a la consulta», muletilla de la lista prohibida (`tono.py` sobre el brief: 3 muletillas, 0,4/1000; no es el umbral del artículo, pero la instrucción induce la frase). La apertura de línea 259 («un positivo … no significa que tu perro esté enfermo») es absoluta y podría tranquilizar de más a quien tiene un perro con síntomas: S2 dice que títulos altos con signos compatibles son concluyentes. Sugerencia: «no siempre significa». La tercera muletilla de `tono.py` no es localizable con la lista, anotada como pendiente de la redacción.

**P2-11. Utilidad pendiente de zona.** El lector no puede saber si «vive en zona endémica» (condición de S1 para la prueba anual): la laguna 1 reconoce que no hay fuente por comunidades. Es una decisión honesta, pero deja sin respuesta la pregunta práctica nº 1 del apartado de pruebas. Plantear una remisión concreta (clínica o colegio veterinario de la zona) en el texto, o buscar una fuente española de distribución antes de redactar.

**P2-12. Apoyos visuales.** La infografía de calendario (línea 519) pide celdas ≥ 24 px en 12 meses a 390 px: 12 × 24 = 288 px más etiqueta de fila y gutter de 16 px por lado = 358 px útiles, no sobra. Prever diseño apilado por fuente en móvil con el texto de cada fila. La tabla «Qué ves / Qué puede significar / Qué haces» (línea 293) es el recurso con más riesgo de diagnóstico por aspecto: la columna «Qué puede significar» debe listar causas alternativas, no «leishmaniosis». `TablaApilable` exige la prop `label` (`src/components/article/TablaApilable.astro`), no recogida en el contrato.

## Verificación de fuentes

Verificación hecha por el auditor el 2026-10-24. Textos extraídos con `pdftotext` de PDF descargados en una carpeta aislada, con Python `-I`, y búsquedas de cada cita en el texto completo.

| Fuente | Identificador | Resultado | Afirmación comprobada y localización | Límite o desviación |
|---|---|---|---|---|
| S1 AEMPS/MAPA (PRAN) 2026 | NIPO 134-26-005-7; URL profunda | **Verificada.** PDF de 16 páginas, creado 30/07/2026, «julio 2026», coordinación G. Miró Corrales (UCM). URL ábrela con WebFetch; un `curl` directo devuelve 403 | p. 4: «anual o bianual en función del nivel de riesgo», «No se debería instaurar ningún tratamiento específico hasta confirmar el diagnóstico y clasificar al paciente», definición subclínica/clínica, «otros diagnósticos diferenciales»; p. 5 Fig. 1: tests rápidos «no se recomiendan» con cuadro compatible, subclínicos «no necesitan tratamiento»; p. 6 Tabla 1: cuatro estadios con pronóstico bueno → reservado → desfavorable; p. 7: coinfecciones, comorbilidades, alopurinol sin interrupción y 6-12 meses | «bianual» ambiguo (P1-2). Estadio I: «insuficientes evidencias» y «monitorización sin tratamiento» posible: «casi siempre una combinación» (línea 333) debe acotarse a la enfermedad clínica moderada o más. Anexo I (pp. 9-16) no leído |
| S2 LeishVet 2011 | PMID 21599936; DOI 10.1186/1756-3305-4-86; PMC3125381 | **Verificada** (Europe PMC: título, autores, Parasit Vectors 2011;4:86) | Signos y analítica (tabla); «Renal disease may be the sole clinical manifestation»; «Chronic renal failure … main cause of mortality»; serología cuantitativa preferida, tests rápidos «risk of false negatives»; PCR positiva no es enfermedad; «vast majority … improvement within the first month»; seguimiento «after the first month and then every 3-4 months during the first year», serología «not before 6 months»; sanos seropositivos cada 3-6 meses; «at least every 12 months» si lo pide el tutor; collares 5-6 meses, permetrina/imidacloprid 3 semanas; «April-November» | **«A menudo siguen infectados» no está (P1-1)**; cita renal sintetizada (P2-3); «recomienda combinar» (P2-4) |
| S3 ESCCAP guía nº 5, 2012 | URL profunda (PDF de 60 páginas, descargado) | **Verificada** | p. 13: serología «a partir de las 8-12 semanas», subclínicas «varios años», tests rápidos «no para detectar una infección subclínica»; p. 16: «estrategia más prometedora», «empieza en abril y termina en noviembre», deltametrina 4 % «durante seis meses», pipeta permetrina «24 horas … tres o cuatro semanas», casa «desde el anochecer hasta el amanecer», mosquiteras, retirar basura; pp. 16-17: vacuna «para uso exclusivo en animales no infectados»; p. 18: «abril y octubre», inmunocompetentes protegidos, perros infectados no deben viajar | La frase sobre resistencia está en p. 17 (P2-8). Contiene dosis (tabla 4, p. 14) y «hasta un 75 %» (p. 11) que el brief excluye correctamente |
| S4 Miranda et al. 2008 | PMID 17942128; DOI 10.1016/j.rvsc.2007.09.003 | **Verificada solo resumen** (Europe PMC: Res Vet Sci 85(1):35-38) | 390 perros, Hospital Clínic Veterinari (UAB), distribución bimodal, pico 2-4 años y secundario ≥7 años; machos 61 % frente a 53 %; razas sobre- e infrarrepresentadas | Texto completo no abierto, como declara el brief; la afirmación usada (pico ≥7 años) está en el resumen |
| S5 Cabré et al. 2021 | PMID 33993495; DOI 10.1002/vetr.451 | **Verificada** (resumen y PDF de acceso abierto en ddd.uab.cat) | n = 123, Cataluña, 2000-2017; grupos <3 (38), 3-8 (60), >8 (25); todos los p-valores citados; «renal azotaemia … occasionally» en mayores; Introducción: segundo pico >8 años, hipótesis de inmunidad que decae, azotemia «appears when the damage is extensive enough» | Correcto. Solo 25 perros >8 años, como declara el brief |
| S6 Alten et al. 2016 | PMID 26900688; DOI 10.1371/journal.pntd.0004458; PMC4762948 | **Verificada** | ~99.000 flebotomos, 8 países, 2011-2013; «Apparently no risk … from December through March»; pico julio-septiembre; «early May to late October for more than 99 % of values»; mayor riesgo junio-octubre (97 %); hembras 23:00-02:00; único punto español Fuenlabrada (Madrid), ~1000 *P. perniciosus*/trampa en 2012; primeras capturas en España y Portugal a principios-mediados de mayo | Fuenlabrada es un foco atípico (P2-5). Cifras mediterráneas agregadas, no españolas |
| S7 Olmeda et al. 2024 | PMID 38951858; DOI 10.1186/s13071-024-06357-8; PMC11218365 | **Verificada** | 2.909 perros, 3.785 IFAT, mayo 2003-abril 2023, 21,65 %; periodos 35,3 / 17,9 / 18,8 / 12,9 %; rs = −0,56 (ectoparasiticidas, P = 0,010) y rs = −0,52 (vacunación, P = 0,018); vacunados excluidos; la vacunación empezó en 2012; «climatic conditions … not as relevant … as the use of ectoparasiticides and vaccines» | Patrocinado por Elanco; explicación alternativa de los autores (P2-6). El brief acierta con el verbo «acompaña» |
| S8 OCV 2024 vía Redacción Médica/Europa Press | URL profunda; fecha 31/05/2024 | **Verificada vía WebFetch** (resumen de la herramienta, no volcado literal) | «evitar paseos nocturnos durante los meses más cálidos», mosquiteras, «activos casi todo el año», «proteger a los animales de compañía durante todo el año», «la prevención la única medida eficaz» | Confirmado como nota de agencia, no documento primario OCV; el brief lo declara |
| S9 Ficha técnica Piretrón 715 mg spot-on (CIMAVet) | URL profunda; primera autorización 08/04/2015 | **Verificada** (PDF descargado y leído completo) | 3.2: repelente 2 semanas e insecticida 1 semana frente a flebotomos; 3.3: «No usar en gatos … incluso la muerte»; 3.4: no se descarta transmisión; 3.5: «extremadamente tóxico para los gatos», lavar con champú o jabón, mantener alejados hasta que seque el punto, evitar el lamido | Correcta y bien acotada (ejemplo de ficha, sin marca en el cuerpo) |
| S10 EMA, EPAR de Letifend | URL profunda; EMEA/V/C/003865 | **Verificada parcialmente** | Nombre, sustancia activa (proteína Q recombinante de *L. infantum* MON-1) y número de producto: sí. Fecha del dictamen: la página muestra publicación 19/02/2016 y reunión 16-18/02/2016 (P2-7). Edad, pauta y prueba previa: no en la página | La ficha técnica EN no la pude leer (PDF comprimido); una búsqueda web da un resumen (primera autorización 20/04/2016, 6 meses, prueba previa, 28 días, 1 año) que **no he verificado** y que no se debe usar sin abrir el documento |

Registro fuente → afirmación → H2 (trazabilidad): S1 (Intro, H2-2, H2-3, H2-4), S2 (H2-2 a H2-5), S3 (H2-1, H2-3, H2-5), S4 (H2-1), S5 (H2-1, H2-2, H2-4), S6 (H2-1, H2-5), S7 (H2-1, H2-5), S8 (H2-5), S9 (H2-5), S10 (H2-5). Comprobadas contra §3, `*Sustentado en:*` de §6 y la tabla de §9: coinciden. Ninguna fuente decorativa; S4 y S10 sostienen cada una un solo dato, pero ese dato es real y está desarrollado. Cobertura inversa: todos los H2 científicos tienen fuente.

## Comprobaciones mecánicas

| Comprobación | Resultado |
|---|---|
| `seoTitle` | 54 caracteres (Python `len()`), ≤ 55 correcto |
| `metaDescription` | 158 caracteres, ≤ 160 correcto; `content.config.ts` la limita a 160 |
| Frontmatter | Idéntico a la sección 1 (título SEO y meta incluidos en el YAML). `pilar: salud-perros-mayores` válido en el enum. `status` omitido: el schema aplica `Publicado` por defecto, decisión correcta (el brief la explica). `z.strictObject`: no hay claves fuera del schema |
| Suma de targets | 250 + 650 + 700 + 800 + 700 + 900 + 550 = **4.550**, igual al contrato. Rango ±15 % = 3.867,5 a 5.232,5; el brief escribe 3.868-5.232 (redondeo aceptable) |
| Slug y rutas | `leishmaniosis-perros-mayores` sin colisión en `src/content/blog/` ni `briefings/`; sin ñ, tildes ni espacios en rutas de imágenes |
| Enlaces internos | Pilar `/salud-perros-mayores` (existe `src/content/pilares/salud-perros-mayores.mdx`); `chequeo-geriatrico-canino`, `vacunas-desparasitacion-perros-senior`, `sindrome-cushing-perros-mayores` (los tres `.mdx` existen y `[x]` en `INVENTARIO_CONTENIDO.md`, líneas 228, 230, 232); calculadora (existe `src/pages/herramientas/calculadora-calidad-vida-perros.astro`, Publicado). Pendientes P1-08, P1-09, P1-12 sin enlazar y con id correcto |
| Canibalización | `INVENTARIO_CONTENIDO.md` línea 59: P1-02 ya figura como `[~] (En Briefing)` con enlace al brief y nota sobre «todo el año». `vacunas-desparasitacion-perros-senior.mdx` línea 55 solo menciona la leishmaniosis en una frase: sin solapamiento. Ningún otro brief ni artículo trata el tema |
| AlertBox y FAQ | 3 tipos, uno cada uno: `info` en Introducción, `danger` en H2-2 (síntomas), `warning` en H2-5 (manejo/gatos). FAQ con 7 preguntas |
| Arco narrativo | Guía sin caso declarada (§2, §9.4), sin Luna ni Dakota. No se exige H2 de cierre narrativo; correcto |
| Límite brief/redacción | Sin prosa final de desarrollo; solo FAQ y AlertBox como borrador, permitido |
| Estado en el inventario | `[~]` con enlace, correcto. Registro de razas de la dirección visual ya incluye la fila de este brief (línea 88) |
| Muletillas | `tono.py` sobre el brief: 3 en 6.781 palabras (0,4/1000) |

## Alcance extra del propietario

**(a) Español de España.** Declarado en §2 y verificable en §9.5 (bloqueante). Revisados el brief y sus borradores: sin «usted/ustedes/voseo», vosotros en el AlertBox («Si convivís con un gato»), vocabulario peninsular (piso, recibidor, mosquitera, persiana, pipeta, analítica, vaqueros), coma decimal y punto de millar. Los términos de americanismo aparecen solo en la lista de evitar (línea 71). Correcto.

**(b) Fuentes españolas.** S1 (AEMPS/MAPA), S3 (ESCCAP España), S5 (Cataluña), S4 (Barcelona), S7 (Valdeorras), S8 (OCV), S9 (CIMAVet) son españolas; S2 y S6 son internacionales con autores españoles y se declara (línea 74). Cumple. Dos cautelas: S6 es agregado de ocho países con un solo punto español y la clave de utilidad «zona endémica» queda sin respuesta (P2-11).

**(c) Cinco rasgos en cada prompt y raza.** Imagen 1, Imagen 2 y recorte: completos (ver tabla de P1-4, con variante aceptable en Imagen 2). **Imagen 3: incompleta (P1-4).** Los cuatro prompts terminan en la línea de rechazo a tamaño móvil y la ficha de aceptación contempla los cinco rasgos a 390 px (línea 420). Recorte: pide fondo transparente, perfil estricto, sin collar, comprobación sobre `#ffffff` y `#1a1a1a` a 390 px y no se anima si no pasa; correcto. Raza: no repite ninguna; lista de recientes completa, pero mismo arquetipo cromático (P2-2).

**(d) Ficha visual por escena.** Presentes: función y sección, público y entorno, 3-5 detalles (baldosa hidráulica, balconera con persiana, percha de hierro, maceta de barro, estera de esparto; ventana corredera con mosquitera, terrazo, lámpara de pie; mesa de acero, alfombrilla azul, báscula, armario, lavabo de palanca), sujeto y referencia, edad, acción, cámara y luz, exclusiones, aceptación y coherencia imagen-pie-alt. Ambientación española creíble y no estadounidense. Fallos: acción física del collar (P2-1), orientación de la perra en la Imagen 3, pie con «orina» sin orina, ausencia de fila de escena segura, collar del sujeto no coherente con los prompts 2 y 3.

**(e) Apoyos y animaciones.** Planificados con recorte senior y prompt completo; sin autoplay, controles ≥ 44 px, `prefers-reduced-motion`, alternativa sin JavaScript y altura ≤ ~900 px; infografía «sin perro, no necesita recorte»; tablas con `TablaApilable`. Cumple el espíritu de `apoyos-visuales-responsive.md`, con las salvedades de P2-12.

## Coherencia clínica y el conflicto «todo el año»

- Sin dosis, sin cifras de creatinina ni UPC, sin duración (salvo la frase del alopurinol, P1-3), sin nombres comerciales en el cuerpo, sin promesa de curación («no prometer curación» en H2-4; corregir la frecuencia, P1-1), la vacuna limitada a existencia y «no infectados», advertencia sobre gatos con ficha como fuente, urgencia presentada como criterio editorial. Todo coherente con `politica-editorial.astro` línea 55.
- **El conflicto «todo el año» está contado con honestidad.** El H1 y el título SEO dejaron de prometerlo; el inventario lo documenta; §3 laguna 3 recoge las tres posturas con su fuente y fecha (S6 mayo-octubre y sin riesgo aparente de diciembre a marzo; S3/S2 abril-octubre o noviembre; S8 todo el año) y la infografía las muestra en tres filas; el contrato §9.6 prohíbe afirmar «todo el año» o «solo en verano» como regla. Comprobado contra las fuentes: las tres posturas son exactas. Una precisión: el FAQ 7 (línea 379) dice «Los estudios sitúan el riesgo sobre todo entre mayo y octubre», pero eso es solo S6; S3 y S2 dicen abril-noviembre. Reformular («un estudio de campo … ; ESCCAP y LeishVet de abril a octubre o noviembre; la OCV …»).

## Recursos prometidos

| Recurso | Ubicación | Ruta | Estado | Prueba previa a publicar | Resultado en esta ronda |
|---|---|---|---|---|---|
| Tabla «Qué ves / Qué puede significar / Qué haces» | H2-2 | MDX con `TablaApilable` | Planificado | 390 px sin desbordamiento; causas alternativas | Viable; añadir `label` (P2-12) |
| Tabla «Prueba / Para qué sirve / Qué no te dice» | H2-3 | MDX con `TablaApilable` | Planificado | 390 px; sin cifras | Viable |
| 3 imágenes ilustrativas | Hero, H2-5, H2-3 | `public/images/blog/leishmaniosis-perros-mayores/` | Planificado, sin producir (comprobado: la carpeta no existe) | Revisión a 390 px, rasgo por rasgo | Gate presente; corregir P1-4 y P2-1 antes de generar |
| Recorte transparente senior | Dentro de la animación | `mestizo-senior-recorte-perfil.webp` | Planificado | Alfa real y 390 px | Gate presente |
| Animación «Revisión de cinco puntos» | H2-2 | Componente nuevo en `src/components/article/` | Planificado (patrones existentes: `BanoAnimation.astro`, `GolpeCalorRecursos.astro`, comprobados) | Controles ≥ 44 px, `prefers-reduced-motion`, sin JS | Gate presente; sin prompt propio (P2-1) |
| Infografía «Calendario de riesgo» | H2-5 | SVG/HTML en componente | Planificado | Texto por fila, celdas ≥ 24 px | Viable con diseño apilado (P2-12) |
| Enlaces externos oficiales | H2-2…H2-5 | URLs de §3 | Planificado | Abrir antes de publicar | S1 devuelve 403 a `curl`, abre con WebFetch: probar en navegador real |
| PDF, vídeo o descarga | — | No se promete | No aplica | — | Correcto |

Validación local y documental; nada de esto está desplegado.

## Efecto cascada

- **Artículo:** no existe `.mdx` ni imágenes; nada que corregir aguas abajo, pero el redactor heredaría P1-1, P1-2 y P1-3 por el contrato bloqueante y el FAQ.
- **Otros briefs:** `grep` de «leishman» en `briefings/` solo devuelve este brief. `vacunas-desparasitacion-perros-senior.mdx` menciona la leishmaniosis en una frase sin cifras: no hereda nada.
- **Briefs futuros del inventario:** P1-09 (dirofilariosis) y P1-10 (garrapatas) citan como base ES-02, la misma guía ESCCAP nº 5 (2012). Heredarán la cautela de este informe: es una guía de 2012 con dosis y prevalencias que no deben pasar, y la guía AEMPS/MAPA de 2026 (S1) cubre solo leishmaniosis.
- **Registro de razas:** la dirección visual ya recoge la fila de este brief. Si se corrige el pelaje (P2-2), actualizar esa fila.
- **Esta auditoría:** R1. Quedan R2 y R3; si R3 no pasa, parar y consultar al propietario.

## Lo que sí funciona (no romper al corregir)

- **Fuentes**: ningún identificador inventado; PMID, DOI y títulos exactos en S2, S4, S5, S6 y S7; PDF oficiales leídos con extracción de texto; verificaciones parciales marcadas honestamente (S4 solo resumen, S10 sin ficha técnica, lagunas 5 y 6). La laguna 4 y el límite «el artículo no da pauta, eficacia ni requisitos de la vacuna» son la decisión correcta: no completarla de memoria.
- **Lagunas documentadas, no calladas**: geografía (1), edad y tratamiento (2), calendario (3), vacuna (4), lectura parcial (5), PDF de AEMPS (6), cifras renales (7). Ninguna excepción silenciosa.
- **Decisiones de seguridad**: ninguna cifra renal ni de título, ni dosis ni duración, ni lista de razas de riesgo (S4), ni marcas; ficha de permetrina usada como ejemplo, sin nombrar el producto.
- **Título honesto** que ya no promete «todo el año», con la decisión explicada al propietario en el encabezado y en el inventario.
- **Trazabilidad completa** y consistente entre §3, §6 y §9; sin fuentes decorativas.
- **Una sola raza nueva** con ficha de sujeto detallada, tres prompts con raza nombrada y recorte con prompt completo.
- **Procedencia**: guía sin caso, sin Luna/Dakota, declarada.
- **Gates**: recursos planificados nunca presentados como disponibles; retirada de `heroImage` si no se producen.

## Qué corregir, en orden

Para una sesión distinta de esta, sin reabrir fuentes:

1. **S2 y FAQ 1 (P1-1).** En §3 S2 (línea 112) sustituir `«a menudo siguen infectados»` por una paráfrasis sin comillas: «los perros tratados pueden seguir albergando el parásito y, aunque menos que antes, infectar flebotomos (LeishVet 2011: “may continue to harbour the parasite … to a lesser extent”)». En §6 FAQ 1 (línea 373) y §9.6 (línea 486) y H2-4 (línea 334) cambiar «suelen seguir infectados» por «pueden seguir infectados». No añadir «a menudo».
2. **FAQ 4 y H2-3 (P1-2).** Quitar «o cada dos años» (línea 376). Redactar: «La guía oficial de la AEMPS pide pruebas con una periodicidad “anual o bianual” según el riesgo; LeishVet cita al menos una al año para el cribado de un perro sano si lo pide el tutor. Tu clínica decide la frecuencia». En H2-3 (línea 319) mantener la cita literal de S1 y añadir «S2: al menos cada 12 meses a petición del tutor». No glosar «bianual».
3. **Alopurinol (P1-3).** En H2-4 (línea 333) sustituir el mensaje del alopurinol por «la clínica decide cuánto dura la pauta y cuándo se revisa: no la suspendas ni la alargues por tu cuenta», sin nombrar la regla de interrupción; mantener «sin duración ni dosis» y revisar §3 S1 límites (líneas 99 y 102) para que coincidan. Acotar «casi siempre una combinación» a los estadios II-IV (S1 Tabla 1, estadio I: tratamiento corto o monitorización sin tratamiento).
4. **Imagen 3 (P1-4 y P2-1).** En la línea 437, copiar literalmente del bloque de línea 406: «postura natural de perro mayor, con la cabeza a la altura del lomo o algo baja, apoyos prudentes y sin poses atléticas» y «sin … ni sufrimiento»; sustituir «parche rasurado» por «sin zona rasurada visible» o excluirlo de «sin calvas» de forma explícita; fijar hacia dónde mira la perra y dónde está la veterinaria respecto a la pata delantera; cambiar el pie por «El análisis de sangre es el primer paso para confirmar la infección y clasificar la enfermedad» (sin «orina») o justificar la orina con otra imagen.
5. **Imagen 1 y sujeto (P2-1).** Resolver el gesto de las manos (la mano libre comprueba la holgura después de abrochar) y unificar el pie con la ficha; decidir el collar del sujeto en las imágenes 2 y 3. Añadir a la ficha la fila «Escena segura» y la comprobación de aceptación. Declarar que la animación no tiene fotogramas del perro y corregir la casilla de línea 507.
6. **Fuentes, límites (P2-3 a P2-8, P2-7).** Reescribir las citas de S2 (renal y vacuna), añadir a S6 el límite de Fuenlabrada, a S7 el patrocinio de Elanco y la explicación alternativa, a S10 la fecha correcta y a S3 la página 17. Mantener la laguna 4 abierta; opcionalmente cerrarla leyendo la ficha técnica oficial (no sustituirla por el resumen del buscador).
7. **Raza y pelaje (P2-2).** Decidir con el propietario si se cambia el pelaje por uno no leonado; retirar o sustentar «el perro más habitual en protectoras». Si se cambia, actualizar el bloque de sujeto, los tres prompts, el recorte, el alt y la fila de la dirección visual.
8. **Coherencia estructural (P2-9, P2-10, P2-11, P2-12).** Corregir «seis H2» a cinco; ajustar el número de H3 por H2 o relajar la regla justificando; cambiar «no sustituye a la consulta» por una formulación afirmativa y «no significa» por «no siempre significa»; reformular el FAQ 7 con las tres posturas; añadir `label` a `TablaApilable` y el diseño apilado de la infografía; decidir cómo se responde en el texto a «¿vivo en zona endémica?».
9. **Cierre.** Actualizar §10 (casilla del 507 y las demás) y §12: registrar la R1 con el SHA-256 de arriba y los hallazgos; la R2 se hará sobre la nueva versión con su propio hash.

## Qué quedó sin abrir

- **S1:** solo leídas las pp. 1-8 (la parte canina completa); el Anexo I (pp. 9-16, tabla 2 de tratamiento y la parte felina) no se leyó. No necesario para el contrato, que excluye pautas.
- **S4:** solo el resumen (Europe PMC); texto completo no abierto, igual que el brief.
- **S8:** leído a través de WebFetch (resumen generado por la herramienta, no volcado literal de la página). Las citas entrecomilladas de §3 se confirmaron por coincidencia con ese resumen.
- **S10:** página EPAR leída; la ficha técnica EN y el resumen público (PDF) no pude leerlos (comprimidos). Las condiciones de la vacuna (edad, prueba previa, pauta) **no se han verificado**; el resumen del buscador no vale como fuente.
- **S2:** leído el texto completo de PMC3125381 por búsqueda de cada cita, no cada figura. **S3:** pp. 12-18 localizadas por búsqueda de cada cita, resto del PDF (60 páginas) no leído. **S6:** localizadas las frases citadas; no se abrió la hoja de datos horarios por sitio.
- **Política editorial:** solo se buscó el texto sobre fármacos y dosis en `src/pages/politica-editorial.astro` (línea 55); no se releyó entera.
- **Imágenes existentes:** las razas de artículos publicados se contrastaron por nombres de archivo y `heroImageAlt`; no se abrió visualmente cada imagen de los 22 directorios. Imágenes de este brief: no existen.
- No se ejecutó `npm run build` ni se probó el montaje de los componentes en móvil.
