# BRIEF DE CONTENIDOS: Leishmaniosis en perros mayores en España: síntomas, pruebas y prevención

**Sitio:** cuidatuperroviejo.com | **Pilar:** Salud de Perros Mayores | **Tipo:** Artículo spoke Astro/MDX | **Prioridad:** P1-02 (serie España, inventario)

**Estado:** versión inicial (R0), 2026-10-24. Pendiente de la auditoría independiente de brief (máximo tres rondas). Redacción bloqueada hasta APTO. No fusionar ni desplegar.

**Dos decisiones de esta versión que el propietario debe conocer:**

1. **El título deja de prometer «durante todo el año».** El inventario titula el tema «…prevención durante todo el año». Las fuentes no lo respaldan por igual (ver §3, laguna 3): la fuente entomológica con datos de Madrid no encuentra riesgo de transmisión de diciembre a marzo, ESCCAP sitúa la temporada entre abril y octubre o noviembre y solo la Organización Colegial Veterinaria (OCV) aconseja proteger «durante todo el año». El artículo cuenta las tres posturas y deja la decisión de calendario a la clínica de cada zona. El título H1 no afirma nada que el cuerpo no pueda sostener.
2. **Raza del perro de las imágenes: mestizo, no podenco.** Justificación y comprobación de razas recientes en §8.

## 1. DATOS, METADATOS Y FRONTMATTER MDX

| Campo | Valor |
|---|---|
| Título H1 | Leishmaniosis en perros mayores en España: síntomas, pruebas y prevención |
| Título SEO | Leishmaniosis en perros mayores: síntomas y prevención |
| Caracteres SEO | **54**, medidos con Python `len()` |
| Keyword principal | leishmaniosis en perros mayores |
| Keywords secundarias | leishmaniosis canina síntomas; test de leishmania en perros; perro viejo positivo en leishmania; prevención de la leishmaniosis en perros; flebotomos y perros en España |
| Slug | `leishmaniosis-perros-mayores` (sin colisión: ni `src/content/blog/` ni `briefings/` contienen ese slug) |
| Meta descripción | Cómo reconocer la leishmaniosis en tu perro mayor, qué pruebas se hacen, qué significa un positivo sin síntomas y cómo protegerlo de los flebotomos en España. |
| Caracteres meta | **158**, medidos con Python `len()` |
| Ruta relativa | `/salud-perros-mayores/leishmaniosis-perros-mayores` |
| Pilar / enum | Salud de Perros Mayores / `salud-perros-mayores` (enum vigente en `src/content.config.ts`; mismo pilar que golpe de calor) |
| Ruta pilar | `/salud-perros-mayores` |
| Público | Tutores de perros mayores **residentes en España** (Península, Baleares y Canarias) |
| Intención principal | Informacional clínica local: «mi perro mayor tiene leishmania o puede tenerla: ¿qué miro, qué pruebas pido y qué hago?» |
| Intención secundaria | Preventiva: proteger de los flebotomos a un perro que ya es mayor, con collar, pipeta, horarios y, según el caso, vacuna |
| Objetivo global | **4.550 palabras** del cuerpo editorial (incluye FAQ, excluye listado bibliográfico). Justificado por seis decisiones distintas (§6); no es una cifra de AdSense |
| Fecha brief | 2026-10-24 |

```yaml
---
title: "Leishmaniosis en perros mayores en España: síntomas, pruebas y prevención"
seoTitle: "Leishmaniosis en perros mayores: síntomas y prevención"
metaDescription: "Cómo reconocer la leishmaniosis en tu perro mayor, qué pruebas se hacen, qué significa un positivo sin síntomas y cómo protegerlo de los flebotomos en España."
pilar: "salud-perros-mayores"
keywordPrincipal: "leishmaniosis en perros mayores"
heroImage: "/images/blog/leishmaniosis-perros-mayores/mestizo-senior-colocacion-collar-v1.webp"
heroImageAlt: "Ilustración de una cuidadora ajustando un collar al cuello de una perra mestiza senior de máscara negra canosa, sentada en el recibidor de un piso"
datePublished: "2026-10-24"
---
```

La fecha será la real de guardado del artículo si cambia el día. Omitir `status` (el schema aplica el default `Publicado`); el estado editorial real se lleva en inventario y expediente. No añadir `legacyUrl`, `dateModified` ni revisión veterinaria inexistentes. Si las imágenes no se producen, retirar `heroImage` y `heroImageAlt` antes de publicar (§11).

## 2. PROCEDENCIA DEL MATERIAL Y VALOR PROPIO

**Tipo:** guía sin caso. Sin paciente, visita, conversación ni recuperación inventados. **No usar Luna/Dakota** (reserva personal del inventario). La apertura dice en una frase que es una guía basada en la guía clínica oficial española de 2026 y en estudios veterinarios.

**Pregunta del lector:** «Mi perro mayor da positivo en leishmania, o tiene síntomas que podrían serlo: ¿está enfermo, qué pruebas faltan y qué pasa ahora?» Secundaria: «¿Cómo lo protejo de aquí en adelante, siendo ya mayor?»

**Respuesta práctica:** (1) un positivo no es lo mismo que estar enfermo: infección y enfermedad se distinguen; (2) qué señales mirar en casa, sabiendo que en un perro mayor la piel no siempre es la primera; (3) qué pruebas confirman y qué estadio tiene; (4) qué esperar del tratamiento y del seguimiento, con los riñones como eje; (5) cómo protegerlo (collar o pipeta, casa al anochecer, mosquiteras, vacuna según prueba previa) y qué dicen las fuentes del calendario.

**Aportación propia:**
- (a) **Infección frente a enfermedad**, tal como la fija la guía oficial AEMPS/MAPA de 2026 (S1): un perro puede estar infectado y clínicamente sano, y entonces no necesita tratamiento específico. Es la duda más angustiosa de quien recibe un positivo, explicada paso a paso.
- (b) **Por qué la edad cambia el cuadro.** Dos series españolas (S4 y S5) y el patrón bimodal: segundo pico a partir de los 7–8 años; en la serie de Cataluña, los mayores muestran más proteinuria y algo de azotemia, más signos sistémicos y menos dermatológicos que los jóvenes. Conclusión práctica: no esperar a ver lesiones en la piel.
- (c) **Tabla «Qué ves / Qué puede significar / Qué haces»** con las señales descritas en S1 y S2, como ayuda editorial de organización, no como escala diagnóstica.
- (d) **Calendario honesto de la temporada de riesgo.** Tres fuentes con tres respuestas (S3, S6 y S8), contadas sin esconder el desacuerdo y con la conclusión útil: la decisión de cuándo empezar y terminar la protección depende de la zona y es de la clínica.
- (e) **Revisión doméstica de cinco puntos** (animación con el perro) que ordena qué mirar y qué anotar para llevar a la consulta.
- (f) **Aviso de seguridad con gatos en casa**: la permetrina de muchos antiflebotomos es muy tóxica para los gatos (S9).

**Diferenciación comprobada (2026-10-24):** `vacunas-desparasitacion-perros-senior.mdx` menciona la leishmaniosis en una frase («se valoran según región, vectores, viajes y productos autorizados»); este artículo es el desarrollo clínico y no repite el calendario vacunal. `chequeo-geriatrico-canino` se enlaza para las analíticas, sin duplicarlo. Temas vecinos que **no** se invaden: P1-09 dirofilariosis (una frase de remisión cuando exista; ambos comparten coinfecciones y prevención, pero esa es otra enfermedad), P1-08 asfalto caliente y P1-12 hidratación. Sin canibalización con ningún artículo ni brief.

### Variante lingüística: español de España (obligatorio en la serie P1)

Regla vigente en la [guía de voz y tono](.agents/skills/references/guia-voz-tono.md) (excepción «serie España»), decisión del propietario del 2026-10-24. Prevalece sobre el «español neutro» para esta serie; el resto de la guía (afirmativo primero, ≤3 muletillas/1.000 palabras con `tono.py`, una salvedad por H3, empatía breve) sigue vigente.

- **Tratamiento:** tú; en plural, vosotros («si vivís con un gato…»). Nunca usted, ustedes ni voseo.
- **Vocabulario peninsular:** piso, terraza, persiana, mosquitera, ventana, recibidor, coche, móvil, pienso, clínica veterinaria, urgencias veterinarias 24 horas, pipeta, analítica, protectora. Evitar carro, auto, celular, departamento, manejar, alberca, ventanilla de tela, mosquitero.
- **Referencias españolas en el cuerpo:** la guía de la AEMPS y el MAPA (julio de 2026), el estudio de la Complutense en Valdeorras (Ourense), los hospitales clínicos de Barcelona y Cataluña, el área de Madrid (Fuenlabrada), la OCV, las fichas técnicas de la AEMPS, ESCCAP adaptada al castellano. Lugares solo como contexto, sin inventar datos regionales: no hay en este brief una tabla de prevalencia por comunidades verificada (laguna 1).
- **Formato:** coma decimal, punto de millar, «30 °C» con espacio, fechas «24 de octubre».
- **Fuentes extranjeras:** LeishVet (consenso internacional con autores españoles) y el estudio multipaís de flebotomos se citan porque son la mejor evidencia disponible; decir una vez que el consenso es internacional y que la guía española lo adapta.
- **Lenguaje de tutor:** «infección» y «enfermedad» definidos en la primera aparición; «flebotomo» con su explicación («el mosquito pequeño que transmite el parásito»), «serología» como «análisis de sangre que mide anticuerpos».

## 3. FUENTES CIENTÍFICAS Y OFICIALES (SOURCE-FIRST)

**Verificación del autor: 2026-10-24.** Cada fuente se abrió con herramienta de lectura; para los PDF se extrajo el texto con `pdftotext` y se contrastó la afirmación por separado de la identidad. PMID y DOI resueltos contra PubMed/Europe PMC. Las citas en inglés entre comillas en español son **traducción libre**. No hay en este brief ninguna cifra de prevalencia nacional; las cifras clínicas proceden de Cataluña (S4, S5) y Ourense (S7) y no se presentan como representativas de toda España.

**Cobertura y lagunas:**
- Bien cubierto: distinción infección/enfermedad; estadios y pronóstico; pruebas diagnósticas; comorbilidades; qué esperar del seguimiento; edad y presentación clínica en España; medidas de protección; toxicidad para gatos; existencia de una vacuna autorizada.
- **Laguna 1 — geografía:** no se verificó una fuente actual que reparta el riesgo por comunidades. ESCCAP (2012) dice «endémica en el sur de Europa». El artículo no enumera comunidades «de riesgo»; usa los ejemplos con datos (Fuenlabrada, Valdeorras, Cataluña) como lo que son, y manda al lector a su clínica.
- **Laguna 2 — edad y tratamiento:** ninguna fuente abierta ofrece resultados de tratamiento o de vacunación específicos para perros de más de 10 años. No afirmar que «a su edad responde peor» ni mejor.
- **Laguna 3 — «todo el año» (conflicto declarado):** S6 (datos de 2011–2013, Fuenlabrada incluida): «aparentemente no hubo riesgo de transmisión de diciembre a marzo»; riesgo máximo de junio a octubre; en más del 99 % de los valores, exposición entre principios de mayo y finales de octubre. S3 (ESCCAP 2012): estación de riesgo de abril a noviembre en p. 16 y «entre abril y octubre» en p. 18. S8 (OCV, 2024, vía Europa Press): flebotomos «activos casi todo el año» y «es preciso proteger a los animales de compañía durante todo el año». **No resolver el desacuerdo en el artículo**: contarlo y decir que S6 es un estudio de campo de 2011–2013 y S8 una recomendación profesional reciente.
- **Laguna 4 — vacuna:** el PDF de la ficha técnica de Letifend en la EMA no era legible con las herramientas de la sesión y la web solo identifica el producto. No se verificaron edad mínima, pauta, prueba previa ni eficacia. ESCCAP (2012) describe otra vacuna; sus datos de pauta no se trasladan. **El artículo no da pauta, eficacia ni requisitos de la vacuna**: dice que existe, que va dirigida a perros no infectados (S3) y que la decisión y la prueba previa son de la clínica.
- **Laguna 5:** S6 se leyó hasta el ~74 % del texto (100.000 de 135.198 caracteres); S2 hasta el ~81 % (100.000 de 123.470). En S6 solo hay un punto español (Fuenlabrada, Madrid): no extrapolar al sur, Baleares ni Canarias.
- **Laguna 6:** S4 se verificó por su resumen (verificación parcial, ver ficha). La web de AEMPS no sirve directamente la guía: el PDF oficial lo aloja el PRAN (`resistenciaantibioticos.es`, sitio de la AEMPS). Abrirlo de nuevo antes de publicar.
- **Laguna 7 — cifras renales:** las guías citan creatininas en mg/dl con puntos de corte distintos (LeishVet 2011 y AEMPS 2026 difieren en el estadio IRIS 3 por la actualización de IRIS). **Ninguna cifra de creatinina ni de UPC pasa al artículo.**

### S1. AEMPS/MAPA (PRAN) 2026 — Guías para el manejo clínico de la leishmaniosis canina y felina

- **Cita:** Agencia Española de Medicamentos y Productos Sanitarios. *Leishmaniosis canina y felina. Guías para el manejo clínico.* Julio de 2026, NIPO 134-26-005-7. Coordinación: Guadalupe Miró Corrales (UCM) y equipo PRAN. Recomendación consensuada en el marco del Plan Nacional frente a la Resistencia a los Antibióticos, basada en los consensos de LeishVet y adaptada a la normativa y a los medicamentos autorizados en España.
- **URL:** https://resistenciaantibioticos.es/sites/default/files/2026-07/Gu%C3%ADas%20para%20el%20manejo%20cl%C3%ADnico%20de%20la%20leishmaniosis%20canina%20y%20felina_0.pdf (PDF oficial; texto extraído con `pdftotext` y leída la parte canina, pp. 3–7; del anexo I solo se consultó el encabezado de la tabla 2 y las notas sobre vigilancia de efectos adversos).
- **Localización y datos:**
  - p. 4, Diagnóstico: todo animal que viva o proceda de zona endémica debe someterse a pruebas «con una periodicidad anual o bianual en función del nivel de riesgo» (hábitat, actividad, tiempo de exposición al vector). «No se debería instaurar ningún tratamiento específico hasta confirmar el diagnóstico y clasificar al paciente.» Dos situaciones: **leishmaniosis subclínica** (infectado y clínicamente sano, con hemograma, bioquímica y urianálisis rutinarios sin alteraciones compatibles) y **clínica**. «Se recomienda descartar siempre otros diagnósticos diferenciales» antes del tratamiento específico.
  - p. 5, Figura 1 y Clasificación: serología cuantitativa; los test rápidos «no se recomiendan en perros que presentan un cuadro clínico compatible». Los subclínicos «no necesitan tratamiento», aunque pueden recibir inmunomoduladores a criterio del veterinario.
  - p. 6, Tabla 1: cuatro estadios (leve, moderado, grave, muy grave) con pronóstico bueno → reservado → desfavorable; en estadios III–IV hay que seguir estrictamente las recomendaciones IRIS para enfermedad renal crónica.
  - p. 7: coinfecciones frecuentes (ehrlichiosis/anaplasmosis, dirofilariosis, babesiosis); **comorbilidades más prevalentes** (endocrinopatías como hipotiroidismo y diabetes, neoplasias, dermatitis atópica, demodicosis, enfermedades inmunomediadas). Eje del tratamiento: combinación de un leishmanicida (antimoniato de meglumina, miltefosina) y alopurinol; «el alopurinol no debe utilizarse sin interrupción en ningún caso»; tratamientos iniciales de 6–12 meses y luego valorar suspensión; vigilar efectos adversos con análisis del sedimento urinario y ecografía abdominal. El alopurinol está autorizado en medicina humana y su uso veterinario se justifica por la evidencia y el interés de salud pública.
- **Afirmaciones que respalda:** infección ≠ enfermedad; subclínicos sin tratamiento; analítica y pruebas periódicas según riesgo; descartar otras causas; estadios; riñón; comorbilidades; el tratamiento lo pauta el clínico y se vigila.
- **H2:** Introducción, 2, 3, 4.
- **Límites:** guía para veterinarios, no para tutores. **Sin dosis, sin duración personalizada y sin nombres comerciales en el artículo**; los «6–12 meses» y las cifras renales no pasan al texto (laguna 7). Para felinos no se usa nada.

### S2. LeishVet 2011 — Directrices para el manejo práctico de la leishmaniosis canina

- **Cita:** Solano-Gallego L, Miró G, Koutinas A, Cardoso L, Pennisi MG, Ferrer L, Bourdeau P, Oliva G, Baneth G. *LeishVet guidelines for the practical management of canine leishmaniosis.* Parasit Vectors 2011;4:86. **PMID 21599936 · DOI 10.1186/1756-3305-4-86 · PMC3125381.**
- **URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC3125381/
- **Localización y datos:** Tabla 4 (estadios); apartados Clinical signs, Diagnosis, Treatment, Prognosis, Follow-up, Prevention.
  - Signos: linfadenomegalia, pérdida de peso, letargo, esplenomegalia, fiebre, poliuria/polidipsia, vómitos, diarrea; dermatitis exfoliativa, ulcerativa, nodular, papular, pustular y **onicogriposis**; blefaritis, conjuntivitis, uveítis; epistaxis; cojera/poliartritis. Analítica: anemia no regenerativa, hiperglobulinemia, hipoalbuminemia, proteinuria.
  - «La enfermedad renal es la principal causa de mortalidad relacionada con la leishmaniosis y puede ser la única manifestación clínica.»
  - Diagnóstico: la serología cuantitativa (IFAT o ELISA) es la preferida; los tests rápidos son cualitativos y pueden dar falsos negativos; títulos altos con signos compatibles son concluyentes; una PCR positiva confirma infección pero no enfermedad.
  - Pronóstico: bueno en estadios I–II, reservado a malo en III–IV. Los perros tratados «a menudo siguen infectados» y pueden infectar flebotomos, aunque menos que antes.
  - Seguimiento: control tras el primer mes y luego cada 3–4 meses el primer año; a los 6 meses del inicio, serología; perros sanos seropositivos cada 3–6 meses; en zonas endémicas, cribado de perros sanos al menos cada 12 meses si el tutor lo pide.
  - Prevención: collares de deltametrina (unos 5–6 meses) y spot-on de permetrina/imidacloprid (unas 3 semanas), aplicados con antelación suficiente; estación de flebotomos en la cuenca mediterránea «de abril a noviembre»; mantener a los perros dentro de casa del anochecer al amanecer; recomienda combinar la vacuna con insecticidas tópicos.
- **Afirmaciones que respalda:** signos y su orden; el riñón; qué prueba confirma qué; que el tratamiento controla pero no siempre elimina; calendario de revisiones; combinar medidas.
- **H2:** 2, 3, 4, 5.
- **Límites:** consenso de 2011; la guía española de 2026 (S1) lo actualiza y prevalece donde difieren. Las cifras de creatinina, UPC y los tiempos de tratamiento no pasan al artículo. Mezcla evidencia y opinión de expertos: decir «consenso de expertos» una vez.

### S3. ESCCAP 2012 (adaptación al castellano) — Guía nº 5: control de enfermedades transmitidas por vectores en perros y gatos

- **Cita:** ESCCAP (Consejo Europeo para el Control de las Parasitosis de los Animales de Compañía). *Control de enfermedades transmitidas por vectores en perros y gatos. Guía ESCCAP nº 5.* Adaptación al castellano, septiembre de 2012.
- **URL:** https://www.esccap.es/wp-content/uploads/2016/06/guia5_P31620-FINAL.pdf (descargada; texto extraído con `pdftotext`).
- **Localización y datos:** apartado 2.1.1 Leishmaniosis.
  - pp. 12–13, Diagnóstico: la serología es la técnica de elección; detecta anticuerpos «a partir de las 8–12 semanas» tras la infección y, en las subclínicas, el periodo puede alargarse «varios años»; los tests rápidos son razonables en casos clínicos «pero no para detectar una infección subclínica»; precaución al interpretar serologías en perros vacunados.
  - p. 16, Estrategias de control: collares impregnados, pipetas y/o aerosoles son «la estrategia más prometedora»; la dinámica estacional «empieza en abril y termina en noviembre»; los collares con deltametrina al 4 % repelen desde una semana tras la colocación y durante seis meses, con descenso muy significativo de la incidencia en Italia y España en dos o tres años; las pipetas de permetrina protegen a las 24 horas y durante tres o cuatro semanas; mantener los perros dentro de casa en la estación de riesgo, sobre todo del anochecer al amanecer; mosquiteras tratadas con piretroides; retirar basura y materia orgánica cercana. «No se ha descrito resistencia de los flebotomos a los piretroides.»
  - pp. 16–17, vacunación: se había registrado en varios países de la UE una vacuna «para uso exclusivo en animales no infectados»; los resultados debían confirmarse con un uso más amplio.
  - p. 18, Salud pública: leishmaniosis humana zoonósica en el sur de Europa transmitida por vectores; «la mayoría de las personas inmunocompetentes están protegidas y no desarrollan la enfermedad»; insecticidas para todos los perros en riesgo y «especialmente» los infectados tras tratamiento, durante toda la estación de riesgo, que «entre los meses de abril y octubre» en el sur de Europa; los perros infectados no deberían viajar a zonas no endémicas con flebotomos.
- **Afirmaciones que respalda:** los medios de protección, la prevención nocturna, la serología tardía en subclínicos, la zoonosis en tono sereno, la vacuna solo en no infectados, la estación abril–octubre/noviembre.
- **H2:** 1, 3, 5.
- **Límites:** documento de 2012: la vacuna que describe y su pauta no se trasladan; la dinámica estacional «cambia de un año a otro y entre regiones» según el propio texto. Las cifras de prevalencia («hasta un 75 %») proceden de poblaciones expuestas de Europa y **no se usan**. Inconsistencia interna abril–noviembre (p. 16) frente a abril–octubre (p. 18): decir «de abril a octubre o noviembre».

### S4. Miranda et al. 2008 — Sexo, edad y raza en perros con leishmaniosis

- **Cita:** Miranda S, Roura X, Picado A, Ferrer L, Ramis A. *Characterization of sex, age, and breed for a population of canine leishmaniosis diseased dogs.* Res Vet Sci 2008;85(1):35-38. **PMID 17942128 · DOI 10.1016/j.rvsc.2007.09.003.**
- **URL:** https://doi.org/10.1016/j.rvsc.2007.09.003
- **Verificación parcial: solo resumen** (vía PubMed/Europe PMC; texto completo no abierto).
- **Localización y datos:** Resumen. 390 perros con leishmaniosis sintomática del Hospital Clínic Veterinari de la UAB (Barcelona). Distribución por edad bimodal: pico principal a los 2–4 años y secundario a partir de los siete años. Machos 61 % frente a 53 % de la población de referencia. Sobrerrepresentación de pastor alemán, rottweiler y bóxer; infrarrepresentación de yorkshire y caniche.
- **Afirmación que respalda:** el segundo pico de casos clínicos ocurre en perros de siete años o más; la raza no es un salvoconducto.
- **H2:** 1.
- **Límites:** hospital de referencia, no población general. No comentar sexo ni razas en el artículo: una lista de razas «de riesgo» invita a la falsa tranquilidad de las demás. Sin cifras de tablas.

### S5. Cabré et al. 2021 — ¿Se asocia el signalment con los hallazgos clinicopatológicos?

- **Cita:** Cabré M, Planellas M, Ordeix L, Solano-Gallego L. *Is signalment associated with clinicopathological findings in dogs with leishmaniosis?* Vet Rec 2021;189(10):e451. **PMID 33993495 · DOI 10.1002/vetr.451.**
- **URL:** https://doi.org/10.1002/vetr.451 (texto completo de acceso abierto, abierto y leído; copia en `https://ddd.uab.cat/pub/artpub/2021/249132/VetR_a2021p451.pdf`).
- **Localización y datos:** Resumen, Métodos, Resultados.
  - n = 123 perros diagnosticados entre 2000 y 2017 en tres centros de Cataluña. Grupos: jóvenes (<3 años, 38 perros), adultos (3–8 años, 60) y **mayores (>8 años, 25)**.
  - Los jóvenes presentan menos signos sistémicos (p = 0,0046), anomalías renales (p = 0,0019) y hematológicas (p = 0,0275); los signos dermatológicos son más frecuentes en jóvenes y adultos que en mayores (p = 0,0451). Los jóvenes tienen proteinuria con menos frecuencia que adultos y mayores (p = 0,0029); «los jóvenes no presentaron azotemia renal, mientras que los mayores la mostraron ocasionalmente» (p = 0,0478). Los jóvenes se clasifican sobre todo en estadios leves-moderados y rara vez en graves o muy graves, a diferencia de adultos y mayores (p = 0,0457).
  - Introducción: la azotemia renal «no es un hallazgo clinicopatológico común porque aparece cuando el daño es suficientemente extenso»; segundo pico de casos clínicos tras los 8 años, que puede deberse a que otros perros, más resistentes al principio, desarrollan la enfermedad cuando su sistema inmunitario decae o por una enfermedad concomitante (explicación de los autores, no resultado del estudio).
- **Afirmaciones que respalda:** en perros mayores el cuadro tiende a ser más sistémico y renal y menos de piel; hay que mirar el riñón aunque no haya lesiones visibles.
- **H2:** 1, 2, 4.
- **Límites:** retrospectivo, 123 perros de Cataluña, solo 25 mayores de 8 años; asociación, no causalidad; sin resultados de tratamiento. **No convertir los p-valores en porcentajes ni «veces más».** Los porcentajes de la serie completa (p. ej., proteinuria 20,2 %) no se trasladan a perros mayores.

### S6. Alten et al. 2016 — Dinámica estacional de los flebotomos vectores de L. infantum

- **Cita:** Alten B, Maia C, Afonso MO, et al. *Seasonal Dynamics of Phlebotomine Sand Fly Species Proven Vectors of Mediterranean Leishmaniasis Caused by Leishmania infantum.* PLoS Negl Trop Dis 2016;10(2):e0004458. **PMID 26900688 · DOI 10.1371/journal.pntd.0004458 · PMC4762948.**
- **URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC4762948/
- **Localización y datos:** Resumen, Resultados («Phenology by species and site», «General overview»).
  - Estudio de campo de 2011–2013 en ocho países mediterráneos con trampas mensuales; ~99.000 flebotomos. Primera aparición entre principios de abril y mediados de junio; actividad hasta mediados de septiembre–noviembre.
  - «Aparentemente no hubo riesgo de transmisión de leishmaniosis de diciembre a marzo en los años considerados»; mayor riesgo potencial de junio a octubre; en más del 99 % de los valores, la exposición cayó entre principios de mayo y finales de octubre. Hembras más activas entre las 23:00 y las 02:00.
  - **Único punto español: Fuenlabrada (Comunidad de Madrid)**, 2012–2013; en 2012 tuvo la mayor densidad del estudio (≈1.000 *P. perniciosus* por trampa de luz); primeras capturas a primeros-mediados de mayo.
- **Afirmaciones que respalda:** los flebotomos pican de noche; la temporada de mayor riesgo; el área metropolitana de Madrid también tiene transmisión; los tramos de actividad cambian con la latitud.
- **H2:** 1, 5.
- **Límites:** una trampa por mes en pocos sitios, 2011–2013; el propio estudio no recomienda una duración de protección (cualquier calendario sería una inferencia). Con un solo punto español, no extrapolar al sur, a Baleares ni a Canarias. Lectura parcial (laguna 5).

### S7. Olmeda et al. 2024 — Evolución de 20 años de la infección en Valdeorras

- **Cita:** Olmeda P, Díaz-Regañón D, Villaescusa A, Amusategui I, García A, Herrero F, Tesouro MA, Rodríguez-Franco F, García-Sancho M, Martín-Fraile D, Sainz Á. *Twenty-year evolution of Leishmania infantum infection in dogs in Valdeorras (Galicia, Northwestern Spain): implication of climatic factors and preventive measures.* Parasit Vectors 2024;17:281. **PMID 38951858 · DOI 10.1186/s13071-024-06357-8 · PMC11218365.**
- **URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC11218365/
- **Localización y datos:** Resumen, Resultados, Conclusiones.
  - 2.909 perros, 3.785 pruebas IFAT entre mayo de 2003 y abril de 2023 en una clínica de O Barco de Valdeorras (Ourense). Porcentaje medio de nuevos casos seropositivos 21,65 %; por periodos de cinco años: 35,3 %, 17,9 %, 18,8 % y 12,9 %; tendencia lineal decreciente.
  - Las ventas de ectoparasiticidas (rs = −0,56) y la vacunación (rs = −0,52, desde 2012) se correlacionaron negativamente con los casos nuevos; los autores concluyen que las medidas preventivas fueron más relevantes que el clima en este contexto. Valdeorras es «un área de alto riesgo».
- **Afirmaciones que respalda:** hay transmisión incluso en el noroeste de España, donde no se espera; la prevención mantenida va con menos casos nuevos.
- **H2:** 1, 5.
- **Límites:** una clínica, retrospectivo, correlaciones sobre 20 datos anuales sin análisis multivariante significativo; ventas de la clínica, no uso real; excluye vacunados. **No dice nada de la edad de los perros.** No escribir «la prevención redujo los casos»: «los años con más prevención tuvieron menos casos nuevos».

### S8. OCV 2024 — Recomendaciones frente a la leishmaniosis (vía Europa Press)

- **Cita:** «La OCV insta a la colaboración entre médicos y veterinarios como factor clave en la lucha frente a la leishmaniosis.» Europa Press / *Redacción Médica*, 31 de mayo de 2024.
- **URL:** https://www.redaccionmedica.com/ultimas-noticias/20240531/la-ocv-insta-la-colaboracion-entre-medicos-veterinarios-como-factor-clave-en-lucha-frente-leishmaniosis/118548_0.html
- **Localización y datos:** texto de la nota. La OCV recomienda «evitar paseos nocturnos durante los meses más cálidos y el uso de mosquiteras», explica que el flebotomo tiene su mayor actividad nocturna en las épocas cálidas y que el cambio climático hace que estén «activos casi todo el año», y afirma que «es preciso proteger a los animales de compañía durante todo el año» y que la prevención es la única medida eficaz de control.
- **Afirmaciones que respalda:** paseos nocturnos y mosquiteras; la postura de proteger todo el año.
- **H2:** 5.
- **Límites:** **fuente secundaria**: nota de prensa de la Organización Colegial Veterinaria difundida por una agencia, no el documento primario de la OCV (no localizado). Atribuir a la OCV «según una nota de 2024». No usarla para ninguna cifra.

### S9. AEMPS (CIMAVet) — Ficha técnica de un spot-on con permetrina para perros

- **Cita:** AEMPS, CIMAVet. *Resumen de las características del medicamento veterinario: Piretrón 715 mg solución spot-on para perros* (ficha técnica; primera autorización 08/04/2015).
- **URL:** https://cimavet.aemps.es/cimavet/pdfs/es/ft/3212%20ESP/3212_ESP_ft.pdf (descargada; texto extraído).
- **Localización y datos:** apartados 3.2, 3.3, 3.4 y «Precauciones especiales para una utilización segura».
  - «Un tratamiento proporciona efecto repelente durante dos semanas y efecto insecticida durante una semana frente a flebotomos (*Phlebotomus perniciosus*).» El periodo de protección frente a pulgas y garrapatas es de cuatro semanas.
  - «No usar en gatos. La administración a gatos puede provocar acontecimientos adversos graves e incluso la muerte.» «Extremadamente tóxico para los gatos… incapaz de metabolizar la permetrina»; si hay exposición cutánea, lavar al gato con champú o jabón y consultar a un veterinario inmediatamente; evitar que los gatos laman el lugar de aplicación en los perros tratados.
  - Advertencia 3.4: no se puede descartar completamente la transmisión de enfermedades por flebotomos si las condiciones son desfavorables.
- **Afirmaciones que respalda:** la protección de cada producto tiene su propia duración y **hay que leer la ficha**; la permetrina es muy tóxica para los gatos; ningún producto protege al 100 %.
- **H2:** 5.
- **Límites:** es **la ficha de un producto concreto**, usada como ejemplo de lo que dice una ficha, no como recomendación de ese producto ni de las duraciones (2+1 semanas contra flebotomos) como regla general. En el artículo no se nombra la marca: «la ficha técnica de un spot-on con permetrina autorizado en España». El plazo de separación de los gatos varía por producto: «lo que diga la ficha del tuyo».

### S10. EMA — Letifend (vacuna frente a la leishmaniosis canina), página EPAR

- **Cita:** European Medicines Agency. *Letifend* (vacuna frente a la leishmaniosis canina, proteína recombinante). Número de producto EMEA/V/C/003865; dictamen positivo del CVMP, 19/02/2016.
- **URL:** https://www.ema.europa.eu/en/medicines/veterinary/EPAR/letifend
- **Localización y datos:** página del producto: nombre, sustancia activa (proteína Q recombinante de *Leishmania infantum* MON-1), número de producto y fechas del procedimiento.
- **Afirmación que respalda:** existe al menos una vacuna frente a la leishmaniosis canina autorizada en la Unión Europea. **Nada más** (laguna 4).
- **H2:** 5.
- **Límites:** verificación parcial: no se abrió la ficha técnica. Edad mínima, pauta, prueba previa y eficacia quedan fuera del artículo hasta que alguien abra la ficha oficial. No nombrar el producto en el cuerpo; escribir «una vacuna autorizada en la UE».

## 4. REQUISITOS TÉCNICOS DE ASTRO Y MDX

*   **Importaciones obligatorias** (primera línea del cuerpo): `AlertBox` y `FAQ`, más `TablaApilable` y los componentes de recursos (§11).
    ```mdx
    import AlertBox from '../../components/AlertBox.astro';
    import FAQ from '../../components/FAQ.astro';
    import TablaApilable from '../../components/article/TablaApilable.astro';
    ```
*   **Formatos semánticos:** el cuerpo no inicia con H1; párrafos de 3 líneas máximo en móvil; H3 cada 150–200 palabras.
*   **Imágenes anti-CLS:** `<img src="/images/blog/leishmaniosis-perros-mayores/{{NOMBRE}}.webp" alt="{{ALT}}" width="1200" height="675" loading="lazy" decoding="async" />`.
*   **Layout automático:** el TOC lo monta `PostReader.astro`; no incluir índice. No repetir la `heroImage` en el cuerpo.
*   **Proyector Markdown:** solo HTML estándar en componentes (`div` con `data-*`), nada de etiquetas personalizadas (rompen el build).

## 5. ENLAZADO INTERNO OBLIGATORIO (INTERLINKING)

Comprobado el 2026-10-24 contra `src/content/blog/` (los cuatro `.mdx` existen) e `INVENTARIO_CONTENIDO.md` (casilla `[x]`).

| Tipo | Texto ancla | URL | Estado en inventario | Dónde |
|---|---|---|---|---|
| **Pilar** | Salud de perros mayores | `/salud-perros-mayores` | ✅ Publicado | Introducción |
| **Spoke 1** | Chequeo geriátrico canino | `/salud-perros-mayores/chequeo-geriatrico-canino` | ✅ Publicado | H2-3 (analítica de sangre y orina periódica) |
| **Spoke 2** | Vacunas y desparasitación en perros senior | `/salud-perros-mayores/vacunas-desparasitacion-perros-senior` | ✅ Publicado | H2-5 (antiparasitarios y vacunas) |
| **Spoke 3** | Síndrome de Cushing en perros mayores | `/salud-perros-mayores/sindrome-cushing-perros-mayores` | ✅ Publicado | H2-4 (comorbilidades endocrinas que complican el cuadro) |
| **Calculadora** | Calculadora de Calidad de Vida Canina | `/herramientas/calculadora-calidad-vida-perros` | ✅ Publicado | H2-4 |

**Pendientes, sin enlazar:** P1-09 dirofilariosis (coinfección; una frase sin enlace hasta que exista), P1-08 asfalto caliente, P1-12 hidratación. **No inventar slugs.**

Validar con `npm run build` y [docs/seo/enlazado-interno.md](../docs/seo/enlazado-interno.md); no tocar `src/data/internal-links.ts` sin necesidad.

**Enlaces externos españoles recomendados en el cuerpo:** la guía de la AEMPS (S1), la ficha técnica de CIMAVet (S9), el estudio de Valdeorras (S7) y la nota de la OCV (S8). Abrir cada URL antes de publicar.

## 6. ESTRUCTURA DETALLADA Y PRESUPUESTO DE PALABRAS

> **Target total: 4.550 palabras.** Desviación máxima ±15 % por sección. Seis H2 más introducción y cierre; cada H2 resuelve una decisión distinta.

| Sección | Target |
|---|---|
| Introducción | 250 |
| H2-1 Qué es y por qué un perro mayor merece atención especial | 650 |
| H2-2 Qué mirar en casa: señales y cuándo llamar | 700 |
| H2-3 Pruebas: infectado no es lo mismo que enfermo | 800 |
| H2-4 Estadios, tratamiento y seguimiento con los riñones en el centro | 700 |
| H2-5 Protegerlo de los flebotomos: medidas, calendario y gatos en casa | 900 |
| Conclusión y FAQ | 550 |
| **Total** | **4.550** |

---

### INTRODUCCIÓN — ~250 palabras

**Objetivo:** responder en las primeras líneas la duda del positivo y declarar el tipo de material.

*   **Párrafo 1 — Respuesta:** un positivo en leishmania no significa que tu perro esté enfermo; infección y enfermedad son cosas distintas y la guía oficial española de 2026 (S1) las separa. Qué vas a encontrar: qué mirar, qué pruebas, qué esperar y cómo protegerlo.
*   **Párrafo 2 — Por qué en perros mayores:** segundo pico de casos a partir de los 7–8 años (S4, S5) y el riñón como protagonista; no esperar a ver lesiones en la piel.
*   **Párrafo 3 — Declaración de procedencia:** guía basada en la guía clínica oficial de la AEMPS, en el consenso LeishVet y en estudios de hospitales españoles; no sustituye a la consulta; sin caso inventado.
*   **Componente AlertBox:**
    ```mdx
    <AlertBox type="info" title="Si tu perro ha dado positivo">
      Empieza por el apartado de pruebas: un positivo es el principio de una conversación con tu veterinario, no un diagnóstico cerrado.
    </AlertBox>
    ```

---

### H2-1 — Qué es y por qué un perro mayor merece atención especial — ~650 palabras
*   *Sustentado en:* S3, S4, S5, S6, S7.
*   *Objetivo:* explicar de qué enfermedad se habla, cómo se transmite, que existe en España también fuera del Mediterráneo clásico y por qué la edad cambia lo que se ve.

*   `### Un parásito, un mosquito pequeño y un perro como reservorio`
    *   El flebotomo transmite el parásito al picar de noche (S6: más activo entre las 23:00 y las 02:00; S3). Los perros son el principal reservorio (S3). Tono sereno sobre la zoonosis: la mayoría de las personas sanas están protegidas (S3, p. 18). Una frase; sin alarma.
    *   Dónde hay transmisión con datos: área metropolitana de Madrid (S6, Fuenlabrada) y Valdeorras en Ourense, «un área de alto riesgo» (S7). Dejar claro que no es «cosa del Mediterráneo y la playa». No listar comunidades (laguna 1).
*   `### Qué cambia cuando el perro es mayor`
    *   Dos picos de casos clínicos; el segundo desde los siete u ocho años (S4, S5). Explicación de los autores como hipótesis (inmunidad que decae o enfermedad concomitante), no como resultado.
    *   En la serie de Cataluña (S5), los mayores mostraron más proteinuria y algo de azotemia, y los signos de piel eran menos frecuentes que en los jóvenes. Traducción al lector: no esperar a ver una lesión para sospechar; el análisis de sangre y orina es parte de la historia. Una sola salvedad (n pequeña, Cataluña).
    *   La raza no protege ni condena: no abrir listas de razas (S4, límites).

---

### H2-2 — Qué mirar en casa: señales y cuándo llamar — ~700 palabras
*   *Sustentado en:* S1, S2, S5.
*   *Objetivo:* dar al tutor un mapa de señales ordenado por lo que ve y lo que hace, sin diagnosticar por aspecto.

*   `### Las señales que describe la guía clínica`
    *   Piel y mucosas (descamación, úlceras, nódulos, pérdida de pelo alrededor de ojos u orejas), uñas que crecen y se curvan, ganglios, pérdida de peso y de apetito, decaimiento, ojos enrojecidos o con inflamación, sangrado por la nariz, más sed y más orina, vómitos o diarrea, cojera (S1, S2).
    *   En el perro mayor la piel no siempre es la primera señal (S5); la enfermedad renal puede ser la única manifestación (S2). Cualquiera de estas señales tiene otras causas posibles: la guía manda descartar otros diagnósticos antes de tratar (S1) y recuerda que las comorbilidades son frecuentes (diabetes, hipotiroidismo, tumores).
    *   Enlazar `sindrome-cushing-perros-mayores` en una frase: más sed y más orina tiene más de una causa.
*   **Tabla `TablaApilable` «Qué ves / Qué puede significar / Qué haces»**, 3 columnas, celdas de una frase, `data-label` en cada `<td>`. Siete filas máximo, atribuida a S1 y S2 y presentada como **ayuda editorial de organización, no como escala validada**.
*   `### La revisión de cinco puntos`
    *   Remitir a la animación (§11): orejas y bordes, ojos y hocico, uñas, cuerpo (peso y músculo), día a día. Pedir al lector que anote fecha y foto para la consulta. Una frase: la ausencia de lesiones no descarta nada.
*   `### Cuándo llamar el mismo día`
    *   **Componente AlertBox:**
        ```mdx
        <AlertBox type="danger" title="Llama hoy a tu clínica o a urgencias 24 horas">
          Sangrado por la nariz que se repite, no quiere comer ni beber, vómitos repetidos, muchísima sed y orina de golpe, decaimiento marcado o dificultad para respirar.
        </AlertBox>
        ```
    *   Umbral editorial coherente con la política del sitio («ante la duda, llama»), sin plazos en horas ni causas atribuidas. Las señales proceden de S1 y S2; el umbral de urgencia es criterio editorial.

---

### H2-3 — Pruebas: infectado no es lo mismo que enfermo — ~800 palabras
*   *Sustentado en:* S1, S2, S3.
*   *Objetivo:* traducir al lenguaje del tutor qué pruebas existen, qué dice cada una y qué significa un positivo.

*   `### Infección y enfermedad: la diferencia que importa`
    *   Definiciones de S1: subclínico = infectado y sano en exploración y análisis rutinarios, sin tratamiento específico; clínico = infectado con signos o alteraciones. El veterinario decide si hay inmunomoduladores; el artículo no los nombra por marca ni pauta.
    *   Un perro con síntomas parecidos puede estar infectado y tener otra enfermedad (S1).
*   `### Las pruebas, una por una`
    *   **Tabla `TablaApilable` «Prueba / Para qué sirve / Qué no te dice»**, 3 columnas, cinco filas: serología cuantitativa (anticuerpos; IFI o ELISA), test rápido, citología de ganglio o médula, PCR, analítica completa con orina (hemograma, bioquímica, proteínas en orina) (S1, S2, S3).
    *   Cuándo un positivo es concluyente (título alto con signos compatibles, S1/S2) y cuándo no (títulos bajos exigen más pruebas; S2). Los test rápidos no se recomiendan si hay un cuadro clínico compatible (S1); no detectan bien la infección subclínica (S3). La serología puede tardar en positivar en las subclínicas, incluso años (S3).
    *   Sin cifras de título ni de corte: «varias veces por encima del corte del laboratorio».
*   `### Cada cuánto repetirlas en un perro mayor que vive en zona de riesgo`
    *   S1: pruebas «anuales o bianuales según el riesgo» para quien vive o procede de zona endémica; S2: cribado de perros sanos al menos cada 12 meses si el tutor lo pide. Conectar con el chequeo geriátrico y su analítica periódica (enlace a `chequeo-geriatrico-canino`).
    *   Si la serología es negativa pero hay signos compatibles, la guía contempla otras pruebas (S1, Figura 1); decir «tu veterinario puede pedir otras».
*   `### Qué hacer si tu perro mayor da positivo y está bien`
    *   Subclínico: seguimiento, no tratamiento (S1); en S2, control cada 3–6 meses. Es la parte más tranquilizadora y ya está arriba: mantener el tono. Remitir a H2-5: proteger de nuevas picaduras importa especialmente (S3, p. 18 insecticidas para los perros infectados).

---

### H2-4 — Estadios, tratamiento y seguimiento con los riñones en el centro — ~700 palabras
*   *Sustentado en:* S1, S2, S5.
*   *Objetivo:* que el tutor entienda el mapa de lo que viene sin dar pautas.

*   `### Cuatro estadios, un mismo mapa`
    *   Leve, moderado, grave y muy grave (S1, Tabla 1; S2): lo que cambia es la afectación del riñón y la respuesta inmunitaria. Pronóstico bueno → reservado → desfavorable según el estadio; renal como principal causa de mortalidad (S2). **Sin cifras de creatinina ni de UPC** (laguna 7).
*   `### Qué esperar del tratamiento`
    *   Lo que describe S1 en lenguaje llano: casi siempre una combinación de un fármaco que elimina el parásito y otro que frena su multiplicación; se vigila con análisis de orina y ecografía porque tiene efectos adversos posibles. Un único mensaje de seguridad: la pauta la ajusta el clínico y no se suspende ni se alarga por cuenta propia («el alopurinol no se usa sin interrupción», S1; **sin duración ni dosis**).
    *   En S2: la mayoría mejora el primer mes; los tratados suelen seguir infectados y pueden infectar flebotomos aunque menos. **No prometer curación** (política editorial).
*   `### Revisiones: el primer año es el más intenso`
    *   Control al mes y luego cada pocos meses durante el primer año; serología a los seis meses del inicio (S2). Expresarlo como «lo habitual en un seguimiento» sin imponer calendario.
*   `### Si además tu perro tiene otras enfermedades`
    *   Comorbilidades frecuentes (S1): endocrinopatías como diabetes e hipotiroidismo, tumores, otras. El cuadro se complica y se decide en consulta. Enlazar `sindrome-cushing-perros-mayores` solo si no se enlazó en H2-2 (un enlace por artículo y destino).
    *   Cuando el pronóstico es reservado, la calculadora de calidad de vida ayuda a ordenar decisiones: enlace a `/herramientas/calculadora-calidad-vida-perros`. Sin eutanasia ni desenlaces inventados.

---

### H2-5 — Protegerlo de los flebotomos: medidas, calendario y gatos en casa — ~900 palabras
*   *Sustentado en:* S2, S3, S6, S7, S8, S9, S10.
*   *Objetivo:* que el lector sepa qué medidas existen, cuáles combinan, cuándo aplicarlas con honestidad sobre el calendario y qué cuidado tener con los gatos.

*   `### Collar, pipeta y hábitos: qué dice cada fuente`
    *   Repelentes con piretroides en collar o pipeta, estrategia «más prometedora» (S3); collares de deltametrina y spot-on de permetrina con duraciones distintas por producto (S2, S3). **Sin marcas ni pautas: «cada producto tiene su duración; sigue su ficha y la recomendación de tu clínica».** Ejemplo ilustrativo de qué dice una ficha (S9): repelente y efecto insecticida frente a flebotomos durante semanas concretas, y advertencia de que ningún producto protege al 100 %.
    *   Hábitos: casa desde el anochecer, mosquiteras en ventanas, evitar paseos nocturnos en meses cálidos (S3, S8, S2). Sin dar umbrales horarios propios; S6 aporta que la actividad es nocturna.
    *   La prevención sostenida acompaña a menos casos (S7, con el verbo «acompaña» y su límite: una clínica, correlación).
*   *Inserción de la Imagen 2* (casa al anochecer) tras la subsección anterior; no es un H3.
*   `### ¿Cuándo empiezo y cuándo termino?` (la parte más honesta del artículo)
    *   Exponer sin juzgar: estudio de campo (S6): riesgo máximo de junio a octubre y sin riesgo aparente de diciembre a marzo en los sitios estudiados; ESCCAP (S3): de abril a octubre o noviembre; OCV (S8): proteger todo el año. Remitir al **recurso de calendario** (§11).
    *   Conclusión práctica: la temporada cambia por zona y por año (S3); **la fecha de arranque y de cierre la fija tu clínica según tu zona y las condiciones del año**. Una salvedad, no cinco.
*   `### La vacuna: qué se sabe y qué decide tu clínica`
    *   Existe una vacuna autorizada en la UE (S10). Va dirigida a perros no infectados (S3). La edad, la prueba previa y la pauta las valora tu clínica: el brief no ha podido comprobar los requisitos exactos (laguna 4). S2 recomienda combinarla con insecticidas tópicos. **Sin eficacia, pauta ni edad.** Enlace a `vacunas-desparasitacion-perros-senior`.
*   `### Si en casa hay gatos`
    *   **Componente AlertBox:**
        ```mdx
        <AlertBox type="warning" title="Si convivís con un gato">
          Muchos antiflebotomos para perros llevan permetrina, que es muy tóxica para los gatos. Lee la ficha del producto antes de usarlo y pregunta a tu veterinario por una alternativa segura para todos.
        </AlertBox>
        ```
    *   Detalles de la ficha (S9): no usar en gatos; mantener separados hasta que se seque la zona y evitar que laman el punto de aplicación; si hay contacto, lavar con champú o jabón y avisar al veterinario. Plazo concreto: «el de la ficha de tu producto».

---

### CONCLUSIÓN Y PREGUNTAS FRECUENTES — ~550 palabras
*   *Cierre:* párrafo integrador de 60–80 palabras: un positivo es un punto de partida; en un perro mayor, mirar el riñón; proteger mientras haya flebotomos; la clínica decide el calendario.
*   **Componente FAQ** (7 preguntas, borradores cortos; el redactor ajusta):
    ```mdx
    <FAQ items={[
      { question: '¿Se cura la leishmaniosis en un perro mayor?', answer: 'Se puede controlar y muchos perros mejoran, pero los tratados suelen seguir infectados, así que necesitan revisiones. El pronóstico depende del estadio y, sobre todo, del riñón.' },
      { question: '¿Puede contagiarme mi perro?', answer: 'La vía habitual es la picadura del flebotomo, no convivir con el perro. La mayoría de las personas sanas no desarrollan la enfermedad; si hay alguien inmunodeprimido en casa, coméntalo con tu médico.' },
      { question: 'Ha dado positivo pero está bien: ¿hay que tratarlo?', answer: 'Según la guía de la AEMPS, un perro infectado y sano no necesita tratamiento específico, pero sí seguimiento con analíticas.' },
      { question: '¿Hay que hacer el test cada año?', answer: 'La guía oficial recomienda pruebas anuales o cada dos años en perros que viven o proceden de zonas de riesgo, según su exposición. Tu clínica decide la frecuencia.' },
      { question: '¿Se puede vacunar a un perro ya mayor?', answer: 'La vacuna se dirige a perros no infectados y no hemos encontrado datos por edad en las fuentes consultadas. Es una decisión de tu veterinario, con prueba previa.' },
      { question: '¿Sirve el mismo antiparasitario para mi gato?', answer: 'No. Muchos productos para perros con permetrina son extremadamente tóxicos para los gatos. Lee la ficha y pide una opción adecuada para cada animal.' },
      { question: '¿Hasta cuándo debo protegerlo en España?', answer: 'Depende de tu zona y del año. Los estudios sitúan el riesgo sobre todo entre mayo y octubre; la OCV aconseja proteger todo el año. Pregunta a tu clínica cuándo empezar y cuándo parar.' }
    ]} />
    ```

---

## 7. POTENCIAL DE AFILIADOS / CONVERSIÓN

*   **No se planifica ningún enlace de afiliación.** Las fuentes y la política del sitio impiden recomendar marcas de antiparasitarios (medicamentos veterinarios con prescripción y ficha) y sería un conflicto de interés en un artículo cuyo objetivo es decidir con el veterinario. Posible futuro: mosquiteras o camas, solo con enlace sin marca y tras otro brief.
*   Conversión interna: calculadora de calidad de vida (H2-4) y artículos de chequeo y vacunas.

## 8. GUÍA VISUAL — 3 PROMPTS DE IMAGEN, RECORTE Y ANIMACIÓN

Aplicar la [dirección visual editorial](../.agents/skills/references/direccion-visual-editorial.md), incluido su **requisito senior verificable**. Completar la ficha por imagen, que va abajo. Esta sección planifica; no se ha generado ninguna imagen.

### Raza: razas recientes y elección

**Razas ya usadas en artículos publicados o briefs (comprobado el 2026-10-24 contra `public/images/blog/`, los `heroImageAlt` de `src/content/blog/` y los `Sujeto fijo` de `briefings/`):** podenco (golpe de calor, publicado), labrador (mal aliento, publicado; agresividad, ruido nocturno y bultos, briefs), golden retriever (úlceras por presión, publicado), cocker spaniel (Cushing, ojos y oídos, ansiedad, incontinencia fecal), beagle (sin dientes, poliquezia, olfato, uñas), San Bernardo (callosidades), dogo argentino (baño), pastor alemán (dermatitis por humedad y ceguera/sordera, briefs), bóxer (letargo), bulldog francés, caniche (rutina cognitiva y ocaso), schnauzer (olor a orina), teckel (feromonas), galgo español (depresión), setter gordon (IPE).

**Raza elegida: mestizo de tipo pastor-mastín, ilustrativo.** Ninguna de las razas anteriores, ni como raza pura ni como mestizo. Justificación: (1) en España es el perro más habitual en protectoras y adopciones; (2) pelo corto y leonado con máscara negra: el encanecido del hocico, las cejas y los párpados se ve bien sobre fondo oscuro y la musculatura se lee sin pelo largo que la tape; (3) tamaño medio-grande (≈25 kg), con proporciones fáciles de mantener entre imágenes. **No se eligió por su predisposición**: S4 muestra sobrerrepresentación de ciertas razas y esa asociación no debe transmitirse a la ilustración. Actualizar la tabla de razas de la dirección visual al cerrar el brief.

### Sujeto fijo (ilustrativo, no es un paciente) — nombrado en los 3 prompts y en el recorte

**Mestizo de tipo pastor-mastín, hembra de unos 12–13 años y unos 25 kg: pelo corto leonado arena, máscara negra en el hocico y sobre los ojos, orejas semicaídas oscuras, pecho y patas con calcetines claros, cola larga con la punta oscura.** Sin collar en el recorte; collar gris liso, sin marca ni texto, en las demás. Es la ficha del sujeto; el bloque de edad va aparte.

### Bloque de edad visible (se copia ÍNTEGRO en cada prompt, incluido el recorte)

> **Edad visible, todos estos rasgos a la vez:** canas blancas en la máscara del hocico, en las cejas y en los párpados; ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular y la cadera algo marcada, sin llegar a delgadez extrema; postura natural de perro mayor, con la cabeza a la altura del lomo o algo baja, apoyos prudentes y sin poses atléticas. **Sin enfermedad inventada:** sin cojera, heridas, costras, calvas, uñas largas, ojos rojos ni sufrimiento. **Rechazar si a tamaño móvil parece un adulto joven.**

### Ficha por imagen (completar antes de generar)

| Decisión | Imagen 1 — Hero (preventiva) | Imagen 2 — Casa al anochecer | Imagen 3 — Consulta, análisis de sangre |
|---|---|---|---|
| Función y sección | Prevención: colocar el collar antiflebotomos y entender que se hace con tu clínica. `heroImage`; también ancla la Introducción | H2-5, `### ¿Cuándo empiezo…` justo antes: hábito de estar dentro desde el anochecer con mosquiteras | H2-3, `### Las pruebas, una por una`: el análisis de sangre que confirma y clasifica |
| Público, contexto y entorno | Recibidor de un piso de ciudad mediterránea, a media tarde | Salón de piso a la hora azul, ventana con persiana y mosquitera | Clínica veterinaria de barrio, sala de consulta |
| 3–5 detalles pertinentes | Baldosa hidráulica geométrica; puerta balconera de madera pintada con persiana de lamas medio subida; percha de hierro con la correa colgada; maceta de barro con geranios; estera de esparto | Ventana corredera de aluminio blanco con **malla de mosquitera visible y marco enrasado**; persiana de lamas medio bajada; suelo de terrazo claro; lámpara de pie de luz cálida; sofá de lino | Mesa de exploración de acero con alfombrilla antideslizante azul; bandeja con tubos de extracción de tapón morado; báscula de suelo; armario blanco con cajones; lavabo con grifo de palanca |
| Sujeto y referencia | Mestizo senior fijo; **primera imagen que se genera y se inspecciona; es la referencia de las demás** | Mismo perro; se pasa la imagen 1 como referencia | Mismo perro; imagen 1 como referencia |
| Edad visible (los 5 rasgos) | Bloque de edad íntegro; sentada, cabeza a la altura del lomo, mirada serena | Bloque íntegro; echada sobre la cama, cabeza alzada con ojos entreabiertos para que se vean los rasgos del rostro | Bloque íntegro; de pie sobre la mesa con apoyos firmes o sentada; el perfil de cara y la cadera visibles |
| Acción y relaciones espaciales | La cuidadora (unos 55 años, pelo castaño corto con canas, jersey fino arena y vaqueros) se arrodilla de lado, a la derecha del encuadre; con la mano derecha pasa la banda por detrás del cuello y con la izquierda sujeta la hebilla bajo la barbilla; el índice comprueba la holgura. La perra se sienta de frente a la cámara en tres cuartos, mirándola con calma | La perra está echada en una cama ortopédica de tela gris con manta de punto, orientada a la ventana, con las patas delanteras estiradas y la cabeza alzada; no hay persona en escena. La mosquitera se ve en la ventana abierta a medias, no cubierta por la persiana | Veterinaria con guantes, de pie a la izquierda de la perra, sujeta su pata delantera con la mano izquierda y ocluye la vena con el pulgar; la tutora, a la derecha del encuadre, sujeta con ternura la cabeza por la mejilla y el cuello. Ambas miran hacia la pata; la perra mira a su tutora |
| Cámara, luz y texturas | Plano medio a la altura de los ojos de la perra; luz de media tarde por la balconera a la izquierda, sombras suaves hacia la derecha; textura de pelo corto, lana de punto, baldosa hidráulica y barro | Plano general bajo, a la altura del perro, con margen para el suelo; luz cálida de la lámpara a la izquierda y azul del atardecer en la ventana; sombras suaves; textura de terrazo, tela, malla y madera | Plano medio, ligeramente elevado; luz blanca neutra de techo con relleno lateral de ventana; acero, guante y pelo con brillo mate |
| Acabado y exclusiones | Documental, composición cuidada, sin pose publicitaria. Excluir: gato en escena, frascos o sprays, texto o marcas, collar tenso, más de cinco dedos por mano, manos cruzadas sobre el cuerpo, perro joven | Documental. Excluir: insectos, sprays, ventana abierta sin malla, persona sentada de espaldas, perro con mirada enferma, perro de aspecto joven | Documental, sin dramatismo. Excluir: jeringuilla apuntando fuera de la vena, sangre abundante, bata de colores publicitarios, carteles con texto, perra atada con correa tensa, sufrimiento, perro de aspecto joven |
| Aceptación visual | A 390 px: se entiende el gesto de poner el collar; se ve el dedo de holgura; los cinco rasgos de edad se aprecian uno a uno | A 390 px: la mosquitera se lee como trama; la perra tiene anatomía y apoyos creíbles; los cinco rasgos de edad | A 390 px: se entiende la toma de sangre y que la persona sujeta con suavidad; los cinco rasgos de edad |
| Coherencia imagen–pie–alt | Pie: «Collares y pipetas se eligen con tu clínica y se usan según su ficha.»; alt idéntico en sustancia | Pie: «Los flebotomos pican de noche: desde el anochecer, dentro de casa y con mosquiteras.»; alt con la mosquitera | Pie: «El análisis de sangre y orina es la base para confirmar y clasificar.»; alt con la toma de sangre |

### Imagen 1 — Hero, preventiva (inserción: frontmatter `heroImage`)
- **Archivo:** `mestizo-senior-colocacion-collar-v1.webp`. Originales en `docs/contenido/leishmaniosis-perros-mayores/originales/`.
- **Prompt:** Imagen editorial para un artículo sobre leishmaniosis en perros mayores; debe permitir entender que se coloca un collar antiflebotomos con cuidado. **Mestizo de tipo pastor-mastín, hembra de unos 12–13 años y 25 kg, pelo corto leonado arena, máscara negra, orejas semicaídas oscuras, pecho y patas claras, cola larga con la punta oscura.** Edad visible, todos estos rasgos a la vez: canas blancas en la máscara del hocico, en las cejas y en los párpados; ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular y la cadera algo marcada, sin llegar a delgadez extrema; postura natural de perro mayor con la cabeza a la altura del lomo, apoyos prudentes, sin poses atléticas; sin cojera, heridas, costras, calvas, uñas largas ni ojos rojos. Recibidor de un piso mediterráneo a media tarde: baldosa hidráulica geométrica, puerta balconera de madera pintada con persiana de lamas medio subida, percha de hierro con una correa colgada, maceta de barro con geranios y una estera de esparto. La perra está sentada, de frente en tres cuartos, y mira a la cuidadora con calma; la cuidadora, de unos 55 años, pelo castaño corto con canas, jersey fino color arena y vaqueros, está arrodillada de lado a la derecha del encuadre, pasa con la mano derecha una banda gris lisa sin marca por detrás del cuello y sostiene la hebilla con la izquierda bajo la barbilla; su índice comprueba la holgura. Cámara a la altura de los ojos de la perra, plano medio con margen; luz de media tarde desde la balconera a la izquierda, sombras suaves hacia la derecha, textura de pelo corto, lana de punto, baldosa y barro; profundidad de campo que mantenga nítidos manos, collar y cara. Acabado documental natural, composición cuidada, sin pose publicitaria. Evitar gatos, frascos, sprays, texto o marcas, collar tenso, manos deformes, extremidades cruzadas y perro de aspecto joven. Ilustración generada; no representa a un paciente. **Rechazar si a tamaño móvil parece un adulto joven.**
- **Alt:** Ilustración de una cuidadora ajustando un collar al cuello de una perra mestiza senior de máscara negra canosa, sentada en el recibidor de un piso.
- **Pie:** Collares y pipetas se eligen con tu clínica y se usan según la ficha de cada producto.

### Imagen 2 — Educativa, casa al anochecer (inserción: H2-5, antes de `### ¿Cuándo empiezo y cuándo termino?`)
- **Archivo:** `mestizo-senior-anochecer-mosquitera-v1.webp`.
- **Prompt:** Imagen editorial para H2-5; debe permitir entender «dentro de casa desde el anochecer, con mosquiteras». **El mismo mestizo de tipo pastor-mastín, hembra de 12–13 años y 25 kg, leonado arena con máscara negra, orejas semicaídas oscuras, calcetines claros, cola larga con la punta oscura, tal como en la imagen de referencia.** Edad visible, todos estos rasgos a la vez: canas blancas en la máscara del hocico, en las cejas y en los párpados; ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular y la cadera algo marcada, sin llegar a delgadez extrema; postura natural de perro mayor con la cabeza alzada a la altura del lomo, apoyos prudentes, sin poses atléticas; sin cojera, heridas, costras, calvas, uñas largas ni ojos rojos. Salón de un piso español en la hora azul: ventana corredera de aluminio blanco medio abierta con una **malla de mosquitera fina claramente visible como trama y marco enrasado**, persiana de lamas medio bajada, suelo de terrazo claro, lámpara de pie con luz cálida y un sofá de lino. La perra está echada en una cama ortopédica de tela gris con una manta de punto, orientada hacia la ventana, patas delanteras estiradas y cabeza alzada con los ojos entreabiertos; no hay personas. Cámara baja, a la altura del perro, plano general con margen en el suelo; luz cálida de la lámpara desde la izquierda, azul del atardecer en el cristal, sombras suaves coherentes; texturas de terrazo, tela, malla y madera; profundidad de campo que mantenga legibles la mosquitera y la perra. Acabado documental natural, composición cuidada, sin estética de catálogo. Evitar insectos, sprays, ventana sin malla, perro de aspecto joven, mirada enferma y personas de espaldas. Ilustración generada; no representa a un paciente. **Rechazar si a tamaño móvil parece un adulto joven.**
- **Alt:** Ilustración de una perra mestiza senior echada en su cama junto a una ventana con mosquitera, en un salón al anochecer.
- **Pie:** Los flebotomos pican de noche: desde el anochecer, dentro de casa y con mosquiteras.

### Imagen 3 — Resolutiva, el análisis de sangre (inserción: H2-3, `### Las pruebas, una por una`)
- **Archivo:** `mestizo-senior-analisis-sangre-consulta-v1.webp`.
- **Prompt:** Imagen editorial para H2-3; debe permitir entender que la confirmación empieza con un análisis de sangre hecho con calma. **El mismo mestizo de tipo pastor-mastín, hembra de 12–13 años y 25 kg, leonado arena con máscara negra, orejas semicaídas oscuras, calcetines claros, cola con la punta oscura, tal como en la imagen de referencia.** Edad visible, todos estos rasgos a la vez: canas blancas en la máscara del hocico, en las cejas y en los párpados; ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular y la cadera algo marcada, sin llegar a delgadez extrema; postura natural de perro mayor, apoyos firmes sobre la mesa, sin poses atléticas; sin cojera, heridas, costras, calvas, uñas largas ni ojos rojos. Sala de consulta de una clínica veterinaria de barrio: mesa de exploración de acero con alfombrilla antideslizante azul, bandeja con tubos de extracción de tapón morado, báscula de suelo, armario blanco con cajones y lavabo con grifo de palanca. La perra está de pie sobre la mesa con apoyos firmes, con un pequeño parche rasurado en el antebrazo delantero. La veterinaria, con guantes y bata sencilla azul, a la izquierda de la perra, sostiene la pata y ocluye la vena con el pulgar mientras la aguja entra en el ángulo correcto; la tutora, a la derecha del encuadre, sujeta con ternura la cabeza por la mejilla y el cuello. Las dos miran la pata y la perra mira a su tutora. Cámara ligeramente elevada, plano medio con margen; luz blanca neutra de techo con relleno de ventana lateral, sombras suaves, acero y guante con brillo mate y pelo corto con textura; profundidad de campo que mantenga legibles manos, pata y rostro. Acabado documental natural, sin dramatismo. Evitar sangre abundante, jeringas fuera de ángulo, carteles con texto, correa tensa, sufrimiento y perro de aspecto joven. Ilustración generada; no representa a un paciente. **Rechazar si a tamaño móvil parece un adulto joven.**
- **Alt:** Ilustración de una veterinaria extrayendo sangre de la pata de una perra mestiza senior mientras su tutora le sujeta con suavidad la cabeza.
- **Pie:** El análisis de sangre y orina es la base para confirmar la infección y clasificar la enfermedad.

### Recorte transparente para la animación «Revisión de cinco puntos» (planificado)
- **Función:** servir de base realista a la animación de §11 (marcadores sobre orejas, ojos y hocico, uñas y cuerpo). Es el recurso donde más fácil se escapa un perro joven; por eso lleva prompt completo.
- **Archivo:** `mestizo-senior-recorte-perfil.webp` (WebP con canal alfa), más el original PNG en `docs/contenido/leishmaniosis-perros-mayores/originales/`.
- **Prompt:** Recorte editorial de cuerpo completo sobre **fondo transparente**, sin sombra proyectada, de **el mismo mestizo de tipo pastor-mastín, hembra de 12–13 años y 25 kg, pelo corto leonado arena, máscara negra, orejas semicaídas oscuras, pecho y patas claras, cola larga con la punta oscura**, tal como en la imagen de referencia. Edad visible, todos estos rasgos a la vez: canas blancas en la máscara del hocico, en las cejas y en los párpados; ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular y la cadera algo marcada, sin llegar a delgadez extrema; postura natural de perro mayor, de pie con la cabeza a la altura del lomo, apoyos prudentes, sin poses atléticas; sin cojera, heridas, costras, calvas, uñas largas ni ojos rojos. **Pose y encuadre:** perfil lateral estricto mirando a la derecha, de pie con las cuatro patas apoyadas y separadas para que se vean las cuatro uñas, la oreja visible, el ojo visible y toda la trufa; cola relajada. Sin collar, correa, manos ni objetos. Margen suficiente para no cortar patas, cola ni orejas. Iluminación de estudio suave y neutra para que funcione sobre fondo claro y oscuro; bordes limpios con pelo fino de la oreja y del pecho sin halo ni franja de color. Fotográfico, fiel a la anatomía. Evitar un perro de aspecto joven, patas fusionadas, orejas cortadas y fondo de color. Ilustración generada; no representa a un paciente. **Rechazar si a tamaño móvil parece un adulto joven.**
- **Aceptación:** colocar el recorte sobre `#ffffff` y `#1a1a1a` y reducirlo a 390 px de ancho; anotar rasgo a rasgo (canas en hocico/cejas/párpados; ojos hundidos; lomo y musculatura; postura) y comprobar transparencia real (alfa) y bordes. Si no pasa, **regenerar**: no se anima.

## 9. CONTRATO DE ENTREGA — NO NEGOCIABLES

**1. Volumen:** entre **3.868 y 5.232 palabras** (4.550 ±15 %), sobre el cuerpo `.mdx` real (incluye FAQ; excluye bibliografía y frontmatter). Si no cuadra, revisar omisiones útiles o justificar un ajuste; sin relleno.

**2. Fuentes citadas por nombre en el cuerpo:**

| # | Fuente | H2 asignado | ¿Citada en el artículo final? |
|---|---|---|---|
| S1 | AEMPS/MAPA (PRAN) 2026, guías para el manejo clínico de la leishmaniosis canina y felina | Introducción, H2-2, H2-3, H2-4 | ☐ |
| S2 | LeishVet 2011 (Solano-Gallego et al., Parasit Vectors) | H2-2, H2-3, H2-4, H2-5 | ☐ |
| S3 | ESCCAP, Guía nº 5 (adaptación al castellano, 2012) | H2-1, H2-3, H2-5 | ☐ |
| S4 | Miranda et al. 2008 (Res Vet Sci, Barcelona) | H2-1 | ☐ |
| S5 | Cabré et al. 2021 (Vet Rec, Cataluña) | H2-1, H2-2, H2-4 | ☐ |
| S6 | Alten et al. 2016 (PLoS NTD, dinámica estacional) | H2-1, H2-5 | ☐ |
| S7 | Olmeda et al. 2024 (Parasit Vectors, Valdeorras) | H2-1, H2-5 | ☐ |
| S8 | OCV 2024 (nota de prensa vía Europa Press) | H2-5 | ☐ |
| S9 | AEMPS/CIMAVet, ficha técnica de un spot-on con permetrina | H2-5 | ☐ |
| S10 | EMA, página EPAR de Letifend | H2-5 | ☐ |

**3. Componentes (conteo exacto):**
- [ ] 3 `AlertBox`: `info` (Introducción), `danger` (H2-2), `warning` (H2-5).
- [ ] 1 `FAQ` con **7** preguntas.
- [ ] Enlace a la calculadora (H2-4).
- [ ] Enlaces internos de §5: pilar, chequeo geriátrico, vacunas y desparasitación, Cushing, calculadora.
- [ ] 2 tablas `TablaApilable` (H2-2 y H2-3), 3 columnas, celdas de una frase, `data-label` en cada `<td>`.

**4. Procedencia:** guía sin caso declarada; sin Luna/Dakota, paciente, recuperación ni credencial veterinaria; imágenes ilustrativas.

**5. Español de España (bloqueante si falla):**
- [ ] Tuteo y vosotros; ningún usted, ustedes ni voseo.
- [ ] Sin americanismos de la lista de §2.
- [ ] Al menos estas referencias españolas en el cuerpo: guía de la AEMPS y el MAPA, Valdeorras, los datos de Cataluña, la OCV.
- [ ] Formato numérico español (coma decimal, punto de millar).

**6. Seguridad clínica (bloqueante si falla):**
- [ ] Sin dosis, ni duración de tratamiento, ni pautas de fármacos; sin nombres comerciales de fármacos, productos ni vacunas.
- [ ] Ninguna cifra de creatinina, UPC, título serológico ni prevalencia.
- [ ] «Infección» y «enfermedad» definidos; ningún positivo se presenta como diagnóstico de enfermedad.
- [ ] Los datos de edad (S4, S5) dicen «a partir de los 7–8 años», no se convierten en «veces más» y se atribuyen a series de Barcelona y Cataluña.
- [ ] El tratamiento no promete curación ni elimina el parásito: «suelen seguir infectados».
- [ ] La prevención no promete protección total (S9, advertencia 3.4).
- [ ] El calendario cuenta las tres posturas (S6, S3, S8) y no afirma «todo el año» ni «solo en verano» como regla; atribuye cada fecha.
- [ ] La vacuna: solo existencia y «perros no infectados»; sin edad, pauta ni eficacia.
- [ ] Advertencia sobre gatos y permetrina con la ficha como fuente.
- [ ] Ninguna lista de razas de riesgo.
- [ ] El umbral de urgencia (AlertBox `danger`) presentado como criterio editorial.
- [ ] Ninguna cifra de Cataluña, Barcelona u Ourense presentada como española general.

**7. Recursos visuales (bloqueante si falla):** cumple §11; en cada imagen, recorte y fotograma, el perro **se ve senior a 390 px** rasgo por rasgo; la raza es el mestizo declarado.

## 10. CHECKLIST DE VALIDACIÓN FINAL DEL BRIEF

- [x] Frontmatter idéntico al de §1; `pilar` válido.
- [x] `seoTitle` 54 car. (≤55) y `metaDescription` 158 car. (≤160), contados con Python.
- [x] Fuentes con URL profunda; PMID/DOI comprobados contra PubMed/Europe PMC; documentos oficiales abiertos o leídos con extracción de texto (verificaciones parciales marcadas en S4 y S10).
- [x] Enlaces internos reales (cuatro `.mdx` existen); pendientes sin slugs inventados.
- [x] Sin canibalización (ver §2).
- [x] Suma de targets: 250 + 650 + 700 + 800 + 700 + 900 + 550 = **4.550** = total del contrato.
- [x] Trazabilidad: las diez fuentes (S1–S10) aparecen en §3, en el `*Sustentado en:*` de §6 y en §9 con los mismos H2.
- [x] Los tres tipos de `AlertBox` planificados (info, danger, warning).
- [x] Cada prompt de imagen, el recorte y la animación incluyen los cinco rasgos de edad y la línea de rechazo a tamaño móvil.
- [x] Razas recientes declaradas y raza distinta elegida con justificación.

## 11. RECURSOS PROMETIDOS Y GATE EDITORIAL

| Recurso y utilidad | Ubicación | Ruta/destino | Estado y responsable | Prueba previa a publicación |
|---|---|---|---|---|
| Tabla «Qué ves / Qué puede significar / Qué haces» | H2-2 | En el MDX, `TablaApilable` | Planificado, redactor | 390 px sin desbordamiento; atribuida a S1/S2 como ayuda editorial |
| Tabla «Prueba / Para qué sirve / Qué no te dice» | H2-3 | En el MDX, `TablaApilable` | Planificado, redactor | 390 px; sin cifras de corte |
| 3 imágenes ilustrativas (hero, casa al anochecer, análisis de sangre) | Hero, H2-5, H2-3 | `public/images/blog/leishmaniosis-perros-mayores/` | **Planificado, no producido** | Revisión imagen por imagen a 390 px (§8); si no se producen, retirar `heroImage`/`heroImageAlt` y las referencias |
| **Recorte transparente senior** del mestizo (base de la animación) | Dentro de la animación | `mestizo-senior-recorte-perfil.webp` | **Planificado, no producido**, redactor con la skill `crear-animaciones-articulo-blog` | Alfa real; sobre blanco y gris oscuro a 390 px; edad rasgo por rasgo; si falla, regenerar |
| **Animación «Revisión de cinco puntos»** (orejas y bordes · ojos y hocico · uñas · cuerpo: peso y músculo · día a día) con marcadores sobre el recorte y paso final «Lleva lo que has visto a tu clínica». Responde a «¿qué miro en casa?» | H2-2, `### La revisión de cinco puntos` | Componente nuevo en `src/components/article/` (patrón `BanoAnimation.astro`/`GolpeCalorRecursos.astro`) | **Planificado, no producido**, redactor | Sin autoplay, controles ≥44 px y teclado, `prefers-reduced-motion`, alternativa sin JavaScript y en impresión, ≤~900 px de alto en móvil, claro/oscuro, sin afirmar movimiento del cuerpo; texto del paso sin dar diagnóstico |
| **Infografía «Calendario de riesgo»** (tira de 12 meses en tres filas: S6 mayo–octubre con pico junio–octubre y sin riesgo aparente de diciembre a marzo; S3 abril–octubre/noviembre; S8 todo el año; leyenda «tu clínica decide para tu zona»). Responde a «¿cuándo protejo?» | H2-5, `### ¿Cuándo empiezo y cuándo termino?` | SVG/HTML en componente; **sin perro**, no necesita recorte | **Planificado, no producido**, redactor | Cada fila lleva texto, no depende del color; celdas ≥24 px a 390 px; título/desc en el SVG; atribuciones visibles |
| Enlaces externos oficiales (AEMPS, CIMAVet, Valdeorras, OCV) | H2-2…H2-5 | URLs de §3 | Planificado | Abrir cada uno antes de publicar |
| PDF, vídeo o descarga | — | No se promete | No aplica | — |

- [ ] Cada H2 responde a una decisión distinta, sin relleno.
- [ ] Registro fuente → afirmación → localización completo (§3).
- [ ] Procedencia e imágenes ilustrativas declaradas.
- [ ] Coherencia con la política editorial.
- [ ] Recursos operativos o promesa retirada.
- [ ] Historial de auditoría numerado, máximo tres rondas.

## 12. HISTORIAL DE AUDITORÍA

| Ronda | Fecha | Versión (SHA-256) | Resultado | Notas |
|---|---|---|---|---|
| R1 | pendiente | — | — | Auditor independiente en agente separado |
