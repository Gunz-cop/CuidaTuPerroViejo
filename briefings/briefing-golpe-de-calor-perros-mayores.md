# BRIEF DE CONTENIDOS: Golpe de calor en perros mayores: señales de alarma y plan para las olas de calor en España

**Sitio:** cuidatuperroviejo.com | **Pilar:** Salud de Perros Mayores | **Tipo:** Artículo spoke Astro/MDX | **Prioridad:** P1-01 (serie España, inventario)

**Estado al crear:** brief elaborado el 2026-10-24 por la sesión generadora. Redacción bloqueada hasta APTO de un auditor independiente. Quien genera no audita y quien audita no corrige; máximo tres rondas de brief sin reiniciar el contador. No fusionar ni desplegar.

## 1. DATOS, METADATOS Y FRONTMATTER MDX

| Campo | Valor |
|---|---|
| Título H1 | Golpe de calor en perros mayores: señales de alarma y plan para las olas de calor en España |
| Título SEO | Golpe de calor en perros mayores: señales y qué hacer |
| Caracteres SEO | **53**, medidos con Python `len()` |
| Keyword principal | golpe de calor en perros mayores |
| Keywords secundarias | golpe de calor perro síntomas; qué hacer si mi perro tiene golpe de calor; ola de calor perros mayores; perro viejo jadea mucho calor; cómo enfriar a un perro con golpe de calor |
| Slug | `golpe-de-calor-perros-mayores` (sin colisión: no hay MDX, brief ni rama con ese nombre) |
| Meta descripción | Cómo reconocer el golpe de calor en un perro mayor, qué hacer en los primeros minutos y cómo prepararte para las olas de calor en España. |
| Caracteres meta | **137**, medidos con Python `len()` |
| Ruta relativa | `/salud-perros-mayores/golpe-de-calor-perros-mayores` |
| Pilar / enum | Salud de Perros Mayores / `salud-perros-mayores` (enum vigente en `src/content.config.ts`) |
| Ruta pilar | `/salud-perros-mayores` |
| Intención principal | Urgente e informacional: reconocer un golpe de calor en un perro mayor y saber qué hacer ahora |
| Intención secundaria | Preventiva: planificar paseos, casa y coche para las olas de calor en España |
| Objetivo global | **4.500 palabras** del cuerpo editorial (incluye FAQ, excluye listado bibliográfico). Extensión justificada por cinco decisiones distintas (§6); no es una cifra de AdSense |
| Fecha brief | 2026-10-24 |

```yaml
---
title: "Golpe de calor en perros mayores: señales de alarma y plan para las olas de calor en España"
seoTitle: "Golpe de calor en perros mayores: señales y qué hacer"
metaDescription: "Cómo reconocer el golpe de calor en un perro mayor, qué hacer en los primeros minutos y cómo prepararte para las olas de calor en España."
pilar: "salud-perros-mayores"
keywordPrincipal: "golpe de calor en perros mayores"
heroImage: "/images/blog/golpe-de-calor-perros-mayores/podenco-senior-paseo-amanecer-v1.webp"
heroImageAlt: "Ilustración de un podenco senior de hocico canoso paseando con su cuidadora por una calle en sombra al amanecer"
datePublished: "2026-10-24"
---
```

La fecha será la real de guardado del artículo si cambia el día. Omitir `status` (el schema aplica el default `Publicado`, igual que en el brief de mal aliento); el estado editorial real se lleva en inventario y expediente. No añadir `legacyUrl`, `dateModified` ni revisión veterinaria que no existan.

## 2. PROCEDENCIA DEL MATERIAL Y VALOR PROPIO

**Tipo:** guía sin caso. El encargo no aporta paciente ni experiencia propia. Prohibido inventar un perro, una visita, una conversación o una recuperación. **No usar Luna/Dakota** (reserva personal del inventario). La apertura debe decir en una frase que es una guía de observación y decisiones basada en estudios veterinarios, no un caso.

**Pregunta del lector:** «Mi perro viejo jadea muchísimo y está raro por el calor: ¿es golpe de calor y qué hago ahora?» (secundaria: «¿cómo evito que le pase en verano?»).

**Respuesta práctica:** (1) sacarlo del calor y llamar al veterinario ya; (2) enfriarlo con un método apoyado por las guías mientras se organiza el traslado; (3) trasladarlo; (4) entender por qué un perro mayor tiene más riesgo y cómo organizar la casa, los paseos y el coche en España.

**Aportación propia:** (a) síntesis de los porcentajes de mortalidad por edad y por gravedad de un estudio de 856 episodios, expresados en lenguaje de tutor; (b) escalera de signos leve→moderado→grave adaptada del sistema de gradación VetCompass, con la acción asociada a cada peldaño; (c) corrección razonada de un consejo muy repetido en prensa y protectoras españolas («no enfriar de golpe») frente a lo que dicen las guías y los estudios; (d) tabla de plan de verano (antes / durante / después) con tres reglas legales y oficiales españolas. Son ayudas editoriales de organización, no una escala clínica validada para uso doméstico.

**Diferenciación comprobada:** no existe artículo publicado sobre golpe de calor (revisado `src/content/blog/`, `briefings/`, `docs/contenido/` y ramas remotas). Temas vecinos del inventario que **no** se invaden: P1-08 asfalto caliente y almohadillas (no desarrollar quemaduras de patas, solo mencionar que el suelo quema y remitir cuando exista), P1-12 hidratación en ola de calor (no desarrollar agua/comida húmeda; una frase), P1-07 conservación del pienso (no tocar), P1-25 ferias y terrazas (no tocar). Este artículo es el hub clínico de urgencia al que P1-08 y P1-12 enlazarán después.

**Voz:** [guía vigente](../.agents/skills/references/guia-voz-tono.md): de tú, español neutro, primero lo afirmativo, empatía breve una vez, ≤3 muletillas/1.000 palabras medidas con `tono.py`. Las advertencias de urgencia **no cuentan** como salvedad pero se concentran en los `AlertBox`. Frases cortas en la sección de primeros pasos: el lector la leerá con prisa.

## 3. FUENTES CIENTÍFICAS DE AUTORIDAD (SOURCE-FIRST)

**Verificación realizada: 2026-10-24.** Identidad (título, autores, revista, año, PMID/DOI) comprobada contra PubMed (E-utilities `esummary`/`efetch`) y, por separado, el contenido contra el texto abierto indicado. Dónde solo se leyó el resumen, está marcado como **verificación parcial**. Las localizaciones son apartados/tablas, no números de línea. Toda la población de los estudios clínicos es de perros del Reino Unido (VetCompass) o israelíes (revisión); ninguna cifra de este brief es de España y el artículo no debe presentarla como tal.

**Cobertura y lagunas (honestas):**
- Bien cubierto: relación edad–gravedad–mortalidad, signos por gravedad, método de enfriamiento recomendado y su adherencia, contexto climático y legal español.
- **Laguna 1:** no se localizó un estudio que compare resultados según el método de enfriamiento (lo dice la propia fuente S5). No afirmar que un método «salva más vidas».
- **Laguna 2:** la fuente primaria de las recomendaciones de enfriamiento (Hanel et al. 2016, Vet-COT, PMID 26994496) está identificada pero **no se abrió su texto**: solo se cita a través de S5. El redactor no puede atribuirle nada que no abra.
- **Laguna 3:** no hay fuente abierta que fije una temperatura rectal para dejar de enfriar ni un tiempo de enfriamiento. **No inventar ninguna cifra de «parar a 39,x °C» ni minutos.**
- **Laguna 4:** no se verificó texto de Bruchim 2017 más allá de ~100.000 de 132.000 caracteres; afirmaciones sobre complicaciones tardías o su duración se mantienen fuera salvo que el redactor las verifique.

### S1. Hall et al. 2022 — Factores de riesgo de HRI grave y mortal (VetCompass)

- **Cita:** Hall EJ, Carter AJ, Chico G, Bradbury J, Gentle LK, Barfield D, O'Neill DG. *Risk Factors for Severe and Fatal Heat-Related Illness in UK Dogs—A VetCompass Study.* Vet Sci 2022;9(5):231. **PMID 35622759 · DOI 10.3390/vetsci9050231 · PMC9144152.**
- **URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC9144152/
- **Comprobada:** 2026-10-24 (resumen en PubMed + texto completo PMC, ~94 % leído).
- **Localización y datos:** Resultados, Tablas 5 y 6. Muertes por grupo de edad (n = 856 episodios): <2 años 5,04 % (7/139); 6–<8 años 11,76 %; 8–<10 años 11,84 %; 10–<12 años 16,92 % (11/65); **≥12 años 27,38 % (23/84)**; OR de muerte ≥12 vs <2: 8,87 (IC 95 % 2,87–27,41). Enfermedad grave: ≥12 años 26,51 % (22/83), OR 5,89. Por grado clínico al llegar: mal leve 2,21 % de muertes, moderado 5,46 %, **grave 56,76 %** (OR 64,92). Confinamiento en vehículo: OR 3,03 de enfermedad grave frente a esfuerzo (35 perros). Mediana de temperatura ambiente el día de los episodios: **16,9 °C**; la mayoría desencadenados por esfuerzo. Discusión: la edad se atribuye a «la menor capacidad de termorregulación» de los perros mayores.
- **Afirmación que respalda:** los perros mayores mueren con más frecuencia por golpe de calor; el grado clínico al llegar predice la mortalidad; el coche es un desencadenante de enfermedad grave; no hace falta una ola de calor para que ocurra.
- **H2:** 1, 2, 4, 5.
- **Límites:** observacional, registros de clínicas del Reino Unido; ORs con IC amplios (p. ej. 2,87–27,41); la edad en años es una medida débil de etapa de vida (los perros grandes envejecen antes; lo reconocen los autores); asociación, no causalidad; las Conclusiones dicen «más de 10 años» mientras las Tablas muestran 10–<12 y ≥12, con la señal más fuerte en ≥12. **El artículo debe decir «a partir de los 10–12 años» y no «>10».** Clima del Reino Unido ≠ clima español: usar 16,9 °C solo como prueba de que el riesgo existe con temperaturas moderadas y esfuerzo, sin trasladarlo a umbrales para España.

### S2. Hall y Carter 2020 — Incidencia y factores de riesgo de HRI (Scientific Reports)

- **Cita:** Hall EJ, Carter AJ, O'Neill DG. *Incidence and risk factors for heat-related illness (heatstroke) in UK dogs under primary veterinary care in 2016.* Sci Rep 2020;10:9128. **PMID 32555323 · DOI 10.1038/s41598-020-66015-8 · PMC7303136.**
- **URL:** https://doi.org/10.1038/s41598-020-66015-8
- **Comprobada:** 2026-10-24. **Verificación parcial: solo resumen.**
- **Localización y datos:** Resumen. 905.543 perros, 395 episodios confirmados; incidencia estimada 0,04 %; letalidad del episodio **14,18 %** (IC 95 % 11,08–17,96). Factores: razas (Chow Chow, Bulldog, Bulldog francés), peso por encima de la media de raza/sexo, edad >2 años, cráneo braquicéfalo, >50 kg.
- **Afirmación que respalda:** el golpe de calor es poco frecuente en la población general pero mortal en uno de cada siete episodios; el riesgo no es exclusivo de los mayores.
- **H2:** 1.
- **Límites:** solo resumen leído; no se pueden citar cifras de tablas ni ORs de edad de este artículo. Incidencia del Reino Unido en 2016, no de España. No presentar 0,04 % como «riesgo bajo, no te preocupes».

### S3. Bruchim, Horowitz y Aroch 2017 — Fisiopatología del golpe de calor en perros

- **Cita:** Bruchim Y, Horowitz M, Aroch I. *Pathophysiology of heatstroke in dogs – revisited.* Temperature (Austin) 2017;4(4):356–370. **PMID 29435477 · DOI 10.1080/23328940.2017.1367457 · PMC5800390.**
- **URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC5800390/
- **Comprobada:** 2026-10-24 (~76 % del texto leído; ver laguna 4).
- **Localización y datos:** Resumen; Epidemiología › Factores predisponentes; Signos clínicos; Pronóstico. Definición: fallo para eliminar el calor acumulado con temperatura central >41 °C y disfunción del sistema nervioso central. Factores: ambiente caluroso y húmedo, ejercicio excesivo, obesidad, peso >15 kg, Labrador/Golden y braquicéfalos, **obstrucción de la vía aérea superior** (narinas estenóticas, paladar blando alargado, tráquea hipoplásica, edema laríngeo), crisis prolongadas, falta de aclimatación y de forma física. Signos: colapso agudo, taquipnea, sangrado espontáneo, shock; alteración mental (depresión, desorientación, convulsiones, estupor, coma). Mortalidad ~**50 %** pese a enfriamiento precoz y cuidados intensivos. Conclusiones: importancia del enfriamiento rápido de todo el cuerpo por los tutores.
- **Afirmación que respalda:** qué es el golpe de calor, por qué el jadeo deja de bastar, factores de riesgo comunes en perros mayores (peso, obesidad, vía aérea), cuadro clínico y pronóstico reservado.
- **H2:** 1, 2, 4.
- **Límites:** la fuente **no** lista la edad ni la parálisis laríngea como factores; no atribuirle esas afirmaciones. La cifra del 50 % es de series hospitalarias (casos que llegan a la clínica), no incidencia. La fuente no da temperatura del agua, uso de hielo ni duración del enfriamiento.

### S4. Hall et al. 2021 — Herramienta de gradación VetCompass

- **Cita:** Hall EJ, Carter AJ, Bradbury J, Barfield D, O'Neill DG. *Proposing the VetCompass clinical grading tool for heat-related illness in dogs.* Sci Rep 2021;11:6828. **PMID 33767275 · DOI 10.1038/s41598-021-86235-w · PMC7994647.**
- **URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC7994647
- **Comprobada:** 2026-10-24.
- **Localización y datos:** Tabla 5 y Discusión. Leve: letargo o rigidez y jadeo intenso o dificultad respiratoria, sin alteración de la consciencia. Moderado: vómitos o diarrea sin sangre, hipersalivación, colapso intermitente, una crisis. Grave: afectación del sistema nervioso (ataxia, ≥2 crisis, depresión profunda, falta de respuesta, coma), disfunción hepática/renal por análisis, hemorragia digestiva, alteración de la coagulación. 39,92 % leves, 46,10 % moderados, 13,98 % graves (793 episodios). Mortalidad: leve 2,21 %, moderado 5,46 %, grave 56,76 %. «Cualquier perro con una temperatura cercana a 41 °C debe enfriarse activamente con urgencia.» Hipotermia <37,2 °C al llegar **no** se asoció con más riesgo de muerte; los autores sugieren que la cautela ante la hipotermia inducida por el enfriamiento puede ser menos justificada de lo que dicen algunos textos. Riesgo de ahogamiento con inmersión en perros con afectación neurológica: mantener la cabeza fuera del agua y vigilar.
- **Afirmación que respalda:** escalera de signos y acción; urgencia del enfriamiento; seguridad frente al miedo a «pasarse de frío»; precaución de ahogamiento.
- **H2:** 2, 3, 4.
- **Límites:** es una herramienta de **clasificación clínica en clínica**, no una escala validada para uso doméstico; el artículo debe presentar la escalera como adaptación editorial, sin puntuar ni prometer que un tutor puede «graduar» a su perro. La fuente no da instrucciones para el tutor sobre cuándo ir a urgencias; esa decisión (siempre, ante cualquier sospecha) es una conclusión editorial coherente con la política del sitio. El estudio es de clínicas del Reino Unido.

### S5. Hall et al. 2023 — Métodos de enfriamiento usados en la práctica (VetCompass)

- **Cita:** Hall EJ, Carter AJ, Bradbury J, Beard S, Gilbert S, Barfield D, O'Neill DG. *Cooling Methods Used to Manage Heat-Related Illness in Dogs Presented to Primary Care Veterinary Practices during 2016–2018 in the UK.* Vet Sci 2023;10(7):465. **PMID 37505869 · DOI 10.3390/vetsci10070465 · PMC10385239.**
- **URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC10385239
- **Comprobada:** 2026-10-24.
- **Localización y datos:** Introducción, Resultados, Discusión. Recomendaciones Vet-COT 2016: inmersión en agua fría para animales jóvenes y sanos; **enfriamiento evaporativo («pulverizar piel y pelaje con agua combinado con movimiento de aire») para animales geriátricos o con comorbilidades**; «enfriar primero, transportar después». De 341 perros con enfriamiento registrado, solo 21,70 % (74) se enfrió antes del traslado; 23,97 % usó un método recomendado; el método más registrado fueron toallas mojadas (51,31 %). Las toallas mojadas son menos eficaces que la inmersión en humanos y caballos, pero faltan datos en perros; se aconseja aplicarlas en zonas con poco pelo (abdomen, cara interna del muslo). Textos antiguos aconsejan agua «tibia» y evitar baños de hielo; un estudio de 1980 informó de muertes tras inmersión en agua helada; los autores señalan que las preocupaciones por vasoconstricción y escalofríos persisten «pese a la amplia evidencia en contrario» (en medicina humana).
- **Afirmación que respalda:** el método de enfriamiento que las guías recomiendan según el perro (evaporativo para el geriátrico), el principio «enfriar primero», y que lo habitual en la práctica real (toallas) no es lo mejor.
- **H2:** 3.
- **Límites:** **no mide resultados por método** (lo dicen los autores); no puede citarse como prueba de que un método salva más. Retrospectivo, 45 % sin registro de enfriamiento. No da temperatura de parada. Las recomendaciones citadas son de otro documento (Hanel 2016, no abierto). No prescribir hielo; decir «agua fría» o «fresca» como las fuentes y callar la cifra de grados.

### S6. Gaber, Amis y LeCouteur 1985 — Parálisis laríngea en perros

- **Cita:** Gaber CE, Amis TC, LeCouteur RA. *Laryngeal paralysis in dogs: a review of 23 cases.* J Am Vet Med Assoc 1985;186(4):377–380. **PMID 3972696** (sin DOI).
- **URL:** https://pubmed.ncbi.nlm.nih.gov/3972696/
- **Comprobada:** 2026-10-24 (resumen vía PubMed E-utilities). **Verificación parcial: solo resumen.**
- **Localización y datos:** Resumen. 23 perros; la condición se desarrolló sobre todo en perros mayores de razas grandes o gigantes; edad 7 meses–14 años; signos frecuentes: dificultad respiratoria, intolerancia al ejercicio, respiración ruidosa, ladrido ronco; más frecuente en machos, sobre todo castrados.
- **Afirmación que respalda (única):** la parálisis laríngea afecta sobre todo a perros mayores grandes y se manifiesta con ruido al respirar e intolerancia al ejercicio.
- **H2:** 1.
- **Límites:** serie antigua de casos de 1985 (EE. UU.); **no menciona golpe de calor**. El vínculo parálisis laríngea → riesgo de golpe de calor es una **inferencia editorial** a partir de S3 («la obstrucción de la vía aérea superior predispone») y debe redactarse como tal («una vía aérea que no deja pasar bien el aire es un factor de riesgo reconocido; si tu perro respira con ruido o se cansa al caminar, coméntalo en la consulta antes del verano»), nunca como «la parálisis laríngea causa golpes de calor». No citar la columna ni el caso clínico que aparecen en buscadores sin abrirlos.

### S7. AEMET 2026 — Resumen climático de 2025

- **Cita:** Agencia Estatal de Meteorología. *2025 fue un año extremadamente cálido y con carácter húmedo en cuanto a lluvias.* Noticia de 14/01/2026.
- **URL:** https://www.aemet.es/es/noticias/2026/01/resumen_anual_2025
- **Comprobada:** 2026-10-24.
- **Localización y datos:** Resumen anual. Temperatura media peninsular 15,0 °C, 1,1 °C sobre la normal 1991–2020, tercer año más cálido de la serie desde 1961 (empatado con 2024); los últimos cuatro años son los más cálidos. Olas de calor en Península y Baleares: **tres** (18 jun–4 jul, ~17 días; 15–18 jul, 4 días, afectó también a Canarias; 3–18 ago, ~16 días, con más de 45 °C en el sur y 45,8 °C en Jerez el 17 de agosto). Canarias: **dos** (15–18 jul, compartida, y 17–20 sep).
- **Afirmación que respalda:** el calor extremo es recurrente en España y los episodios duran días, no horas.
- **H2:** 5.
- **Límites:** el inventario resume «cinco olas de calor»; la fuente cuenta tres en Península/Baleares y dos en Canarias **con una compartida**: son **cuatro olas distintas**. Usar el recuento de la fuente, no el del inventario. La noticia no habla de noches tropicales ni de perros.

### S8. Guía «Cuida a tu animal de compañía en una ola de calor» (decálogo, 2024)

- **Cita:** *Guía ola de calor animales de compañía.* PDF de 6 páginas, NIPO en línea 233-24-054-4, creado el 19/07/2024. Publicado en el portal `dsca.gob.es` (Ministerio de Derechos Sociales, Consumo y Agenda 2030 por dominio; **el texto extraído no nombra a la entidad emisora**: el redactor debe confirmarla abriendo el documento antes de atribuirla).
- **URL:** https://dsca.gob.es/sites/default/files/publicaciones/Guia-ola-calor-animales.pdf
- **Comprobada:** 2026-10-24 (texto extraído con `pdftotext`).
- **Localización y datos:** puntos 1, 2, 3, 4, 8, 9 y 10. No dejar al animal en el coche; pasear a primera y última hora; «temperaturas superiores en torno a 30 °C ya pueden ser peligrosas para perros grandes, de avanzada edad o braquicéfalos, y a partir de 32 °C todos los perros están expuestos a un alto riesgo de golpe de calor»; el suelo quema (prueba de la palma de la mano); llevar agua en el paseo; piscinas o esterillas refrescantes; ofrecer zonas frescas en casa a animales de «avanzada edad»; bozal de cesta amplia porque el perro solo termorregula jadeando.
- **Afirmación que respalda:** pautas oficiales divulgativas de prevención, incluidos los umbrales de 30 y 32 °C **como cifras de esta guía**.
- **H2:** 5.
- **Límites:** documento divulgativo sin referencias; los umbrales de 30/32 °C no están respaldados por una cita en el propio texto, por lo que el artículo debe atribuirlos («la guía oficial recomienda…») y no presentarlos como umbral clínico propio. No contradice S1 (que muestra casos con 16,9 °C de mediana): ambas cosas se explican. No usarla para primeros auxilios (el punto 10 solo remite a un enlace). Sobre cortar el pelo, la guía aconseja consultar al peluquero canino: no desarrollar.

### S9. Ley 7/2023 de protección de los derechos y el bienestar de los animales

- **Cita:** Ley 7/2023, de 28 de marzo, de protección de los derechos y el bienestar de los animales. BOE núm. 75, de 29/03/2023; en vigor desde 29/09/2023.
- **URL:** https://www.boe.es/buscar/act.php?id=BOE-A-2023-7936
- **Comprobada:** 2026-10-24, sobre el texto consolidado descargado de boe.es.
- **Localización y datos:** art. 24.2 d): obligación de «no dejarlos solos dentro de vehículos cerrados, expuestos a condiciones térmicas o de cualquier otra índole que puedan poner su vida en peligro»; art. 60.2: cuando los animales deban permanecer en vehículos estacionados, «se adoptarán las medidas pertinentes para que la aireación y la temperatura sean adecuadas»; art. 27 e) prohíbe mantener de forma habitual a perros y gatos en terrazas, balcones, azoteas… «o vehículos».
- **Afirmación que respalda:** dejar al perro solo en un coche cerrado con calor es una obligación incumplida por ley, además de un riesgo clínico (S1: OR 3,03).
- **H2:** 5.
- **Límites:** **no citar importes de multas**: no se leyó el cuadro sancionador (arts. 73–76) y las cifras de la prensa difieren. No asegurar que «cinco minutos» sea legal o ilegal; la norma no fija un tiempo. La ley vincula al propietario; el artículo no es asesoramiento jurídico. Confirmar con el BOE vigente en cada actualización.

**Fuente identificada pero no utilizada como cita:** Hanel RM et al. 2016, *Best practice recommendations for prehospital veterinary care of dogs and cats*, J Vet Emerg Crit Care 26(2):166–233, PMID 26994496, DOI 10.1111/vec.12455. Texto **no abierto**. Solo puede aparecer como «las recomendaciones Vet-COT de 2016, según describe S5» si el redactor no la abre.

**Descartadas tras revisión:** prensa regional y nacional sobre consejos veterinarios (no se pudo atribuir a una institución), páginas comerciales de cuidado animal, la columna sobre parálisis laríngea y golpe de calor. Una de ellas repetía que «no hay que enfriar bruscamente»; ver H3 de mito en H2-3.

## 4. REQUISITOS TÉCNICOS DE ASTRO Y MDX

- Importaciones en la primera línea del cuerpo:
  ```mdx
  import AlertBox from '../../components/AlertBox.astro';
  import FAQ from '../../components/FAQ.astro';
  ```
- Sin H1 en el cuerpo. Sin TOC, sin JSON-LD, sin breadcrumbs a mano (los monta el layout).
- Párrafos de máximo 3 líneas en móvil; H3 cada 150–200 palabras. En H2-3 (primeros minutos) preferir listas numeradas cortas.
- Imágenes con la sintaxis anti-CLS de la plantilla (`width="1200" height="675" loading="lazy" decoding="async"`), salvo la hero según el layout vigente.
- El artículo es de urgencia: la **respuesta práctica va en la primera pantalla** (ver Introducción), antes de cualquier explicación fisiológica.

## 5. ENLAZADO INTERNO OBLIGATORIO (INTERLINKING)

Inventario y archivos consultados el 2026-10-24. Solo rutas con MDX existente en `src/content/blog/` y marcadas como publicadas en `INVENTARIO_CONTENIDO.md`.

| Tipo | Texto ancla | URL | Estado en inventario | Dónde |
|---|---|---|---|---|
| **Pilar** | Salud de perros mayores | `/salud-perros-mayores` | ✅ Publicado | Introducción |
| **Spoke 1** | Chequeo geriátrico canino | `/salud-perros-mayores/chequeo-geriatrico-canino` | ✅ Publicado | H2-1 (qué preguntar en el chequeo antes del verano) |
| **Spoke 2** | Síndrome de Cushing en perros mayores | `/salud-perros-mayores/sindrome-cushing-perros-mayores` | ✅ Publicado | H2-2 (el jadeo en reposo ya merece consulta) |
| **Calculadora** | Calculadora de Calidad de Vida Canina | `/herramientas/calculadora-calidad-vida-perros` | ✅ Publicado | H2-4 (registrar cómo queda tras el susto) |

**Pendientes, sin enlazar (no inventar slugs):** P1-08 asfalto caliente y almohadillas; P1-12 hidratación en ola de calor; P1-04 procesionaria. Registrar en el expediente que cuando se publiquen deben enlazar a este artículo.

**No enlazar** `mal-aliento-perros-viejos`: el inventario lo mantiene `[~]` (pendiente de publicación) aunque el MDX esté en el repositorio. Contrastar con el estado real antes de añadir cualquier enlace.

Validar el enlazado con `npm run build` y las reglas de [docs/seo/enlazado-interno.md](../docs/seo/enlazado-interno.md); no tocar `src/data/internal-links.ts` en la redacción salvo instrucción expresa.

## 6. ESTRUCTURA DETALLADA Y PRESUPUESTO DE PALABRAS

> **Target total: 4.500 palabras**, justificado por cinco decisiones distintas (por qué, cómo reconocerlo, qué hacer, qué esperar, cómo prevenir). Desviación máxima ±15 % por sección.

| Sección | Target |
|---|---|
| Introducción | 300 |
| H2-1 Por qué un perro mayor se sobrecalienta antes | 750 |
| H2-2 Cómo reconocer el golpe de calor: de leve a grave | 700 |
| H2-3 Qué hacer en los primeros minutos | 850 |
| H2-4 En la clínica y después del susto | 600 |
| H2-5 Plan para las olas de calor en España | 700 |
| Conclusión y FAQ | 600 |
| **Total** | **4.500** |

### INTRODUCCIÓN — ~300 palabras

**Objetivo:** dar la respuesta de urgencia en la primera pantalla y orientar al que llega con calma.

- **Párrafo 1 — Respuesta inmediata:** si tu perro mayor jadea sin parar, está torpe o desorientado y hace calor, sácalo del sol, empieza a enfriarlo y llama al veterinario ya; los pasos detallados están en el H2-3. Una lista de tres acciones máximo (sacar del calor, llamar, enfriar), sin explicar todavía.
- **Párrafo 2 — Qué es esta guía:** declarar guía sin caso, basada en estudios veterinarios del Reino Unido y en guías oficiales españolas; decir con una frase que el golpe de calor es una urgencia que se atiende en clínica.
- **Párrafo 3 — Promesa:** lo que aprenderá (por qué los mayores corren más riesgo, cómo reconocerlo, qué hacer, qué esperar, cómo preparar el verano). Enlace al pilar.
- **Componente AlertBox:**
  ```mdx
  <AlertBox type="info" title="Si ahora mismo estás en esa situación">
    [Una o dos frases de calma: respira, actúa, no hace falta tener todo claro para llamar. Remitir al apartado «Qué hacer en los primeros minutos».]
  </AlertBox>
  ```

---

### H2-1 — Por qué un perro mayor se sobrecalienta antes — ~750 palabras
*Sustentado en:* S1 (Hall 2022), S2 (Hall y Carter 2020), S3 (Bruchim 2017), S6 (Gaber 1985).
*Objetivo:* que el tutor entienda qué está pasando en el cuerpo y por qué la edad importa, con datos y sin alarmismo.

- `### Qué es un golpe de calor` — definición de S3 en lenguaje llano: el cuerpo acumula más calor del que puede eliminar; el perro solo se enfría jadeando; por encima de ~41 °C y con alteración neurológica es una urgencia. Una frase de empatía breve.
- `### Qué dicen los datos sobre la edad` — S1: mortalidad por edades (5 % en <2 años; ~17 % en 10–<12; ~27 % en ≥12), expresada como proporción de **episodios que llegaron a una clínica en el Reino Unido**, con la advertencia en una frase de que son series de clínica, no de España ni de riesgo individual. Añadir S2: letalidad global del 14 % y que el riesgo no es exclusivo de los mayores. **No usar ORs en el cuerpo del artículo** salvo una mención.
- `### Peso, vía aérea y otras señales de riesgo` — S3: obesidad, peso, obstrucción de vía aérea superior. S6 + inferencia editorial declarada (ver límites de S6): perros mayores grandes con respiración ruidosa o que se cansan al caminar. Enlace a [chequeo geriátrico](/salud-perros-mayores/chequeo-geriatrico-canino) para comentar esto antes del verano.
- `### No hace falta una ola de calor` — S1: mediana de 16,9 °C en los episodios del Reino Unido y mayoría por esfuerzo; el calor ambiental importa, pero el ejercicio y el desenlace en un perro mayor dependen de más cosas. Una frase: no extrapolar a España.

---

### H2-2 — Cómo reconocer el golpe de calor: de leve a grave — ~700 palabras
*Sustentado en:* S4 (Hall 2021), S3 (Bruchim 2017).
*Objetivo:* convertir los signos en una escalera de decisión con una acción en cada peldaño.

- `### Primeras señales (grado leve en S4)` — letargo o rigidez, jadeo intenso o dificultad para respirar, sin pérdida de consciencia. Acción: sacar del calor, empezar a enfriar y **llamar a la clínica aunque parezca poca cosa**; explicar que reconocerlo aquí es lo que cambia el desenlace.
- `### Cuando ya es moderado` — vómitos o diarrea sin sangre, mucha saliva, colapso intermitente o una crisis. Acción: urgencia, ir ya mientras se enfría.
- `### Cuando es grave` — desorientación o torpeza al andar, varias crisis, falta de respuesta, coma, sangre en vómito o heces, puntos rojos o morados en la piel. Acción: urgencia máxima.
- `### Un perro mayor puede avisar menos` — S1/S3: el jadeo no distingue; un perro con respiración ruidosa o enfermedad crónica puede deteriorarse deprisa; no esperar a que «se le pase». Enlace a [síndrome de Cushing](/salud-perros-mayores/sindrome-cushing-perros-mayores) para el jadeo en reposo (consultar aparte).
- **Lista / Checklist (markdown):** tabla de dos columnas «Qué ves» / «Qué haces ya» con los tres peldaños, **atribuida** como adaptación editorial de la gradación de S4. Móvil: tabla con celdas de máximo ~12 palabras o lista apilada (ver [apoyos visuales responsive](../.agents/skills/references/apoyos-visuales-responsive.md)).
- **Componente AlertBox:**
  ```mdx
  <AlertBox type="danger" title="Ve ya a urgencias veterinarias si ves esto">
    [Colapso, desorientación, convulsiones, vómito o heces con sangre, encías muy rojas o pálidas, no responde. Mientras vas, sigues enfriándolo. No esperes a que baje el jadeo.]
  </AlertBox>
  ```

---

### H2-3 — Qué hacer en los primeros minutos — ~850 palabras
*Sustentado en:* S5 (Hall 2023), S4 (Hall 2021), S3 (Bruchim 2017).
*Objetivo:* guía de acción inmediata, frases cortas, sin dosis, sin medicación.

- `### 1. Sácalo del calor y llama` — sombra, suelo fresco, ventilador o aire acondicionado; llamar a la clínica o urgencias veterinarias de camino; no esperar a «ver cómo evoluciona».
- `### 2. Enfría mientras te organizas` — «enfriar primero, transportar después» (S5, citando Vet-COT 2016). Para un perro **mayor o con otras enfermedades**, el método recomendado es el **evaporativo**: mojar piel y pelaje con agua y mantener el aire en movimiento (ventilador, corriente, coche con aire acondicionado). Agua fría en el cuerpo, no solo en la cabeza. **Sin cifras de grados ni de minutos** (laguna 3).
- `### 3. Lo que sí y lo que no` — toallas mojadas: lo más usado en la práctica real (51 %), pero las guías prefieren evaporativo/inmersión; si usas toalla, en abdomen e ingles y cambiándola. Inmersión en agua fría es la otra opción recomendada para perros jóvenes y sanos; en un perro mayor o con afectación neurológica hay **riesgo de ahogamiento**: cabeza fuera del agua y vigilancia continua (S4). No dar de beber a la fuerza.
- `### El mito de «no enfriarlo de golpe»` — explicar con respeto que es un consejo repetido; lo que dicen S4 y S5: no se asoció la hipotermia al llegar con más riesgo de muerte, y los textos que desaconsejan el agua fría descansan en observaciones antiguas. **Redactar con los límites de la fuente** (no probado con ensayos comparativos en perros; no hay datos de resultados por método, laguna 1). **No convertirlo en consejo de agua helada ni de hielo.**
- `### 4. Trasládalo` — sin dejar de enfriar si es posible; avisar a la clínica; quién conduce y quién cuida (organización práctica, no clínica). Explicar que no hace falta medir la temperatura en casa para decidir ir: medirla no debe retrasar nada.
- **Componente AlertBox:**
  ```mdx
  <AlertBox type="warning" title="Qué no hacer">
    [No des medicación por tu cuenta (antiinflamatorios, antipiréticos humanos): eso lo decide el veterinario. No lo metas en agua si está confuso y no puedes sujetarle la cabeza fuera. No cubras con mantas ni lo dejes en el coche cerrado. No fuerces la boca ni el agua.]
  </AlertBox>
  ```

---

### H2-4 — En la clínica y después del susto — ~600 palabras
*Sustentado en:* S4 (Hall 2021), S1 (Hall 2022), S3 (Bruchim 2017).
*Objetivo:* expectativas realistas, pronóstico honesto, sin falsa tranquilidad ni catastrofismo.

- `### Qué hace el veterinario` — control de la temperatura, líquidos y soporte de órganos; análisis de sangre; en la literatura S3, el cuadro puede afectar a varios órganos y no hay tratamiento específico para la inflamación y la coagulación. Mantener lenguaje no técnico. **No describir pautas de fármacos ni dosis.**
- `### Qué dice el pronóstico` — S4/S1: mortalidad según gravedad al llegar (2 % leve, 5 % moderado, 57 % grave) y S3 (~50 % en series hospitalarias). Decir claro que **llegar pronto y en grado leve cambia las cifras**, sin prometer que lo haga en tu perro.
- `### Cuando el susto ya pasó` — qué anotar y qué preguntar al alta; qué signos tras el alta justifican volver (los que indique la clínica); no retomar ejercicio hasta que la clínica lo autorice. **Evitar afirmar secuelas o duraciones no verificadas** (laguna 4).
- *Enlace de conversión:* mencionar la [calculadora de calidad de vida](/herramientas/calculadora-calidad-vida-perros) como forma de registrar cómo queda el perro en las semanas siguientes, con la salvedad editorial de que es una ayuda de observación y no un veredicto.

---

### H2-5 — Plan para las olas de calor en España — ~700 palabras
*Sustentado en:* S7 (AEMET 2025), S8 (guía oficial 2024), S9 (Ley 7/2023), S1 (OR de vehículo).
*Objetivo:* convertir lo anterior en un plan práctico antes de la próxima ola, con reglas oficiales españolas.

- `### Cómo fue 2025` — S7: tres olas de calor en Península/Baleares y dos en Canarias (una compartida); la de agosto, ~16 días y más de 45 °C. El mensaje: son episodios largos, planificables.
- `### Umbrales y horarios que recomienda la guía oficial` — S8: ~30 °C ya peligrosos para perros grandes, de edad avanzada o braquicéfalos; desde 32 °C riesgo alto para todos; primera y última hora; sin ejercicio intenso; llevar agua; zonas frescas en casa. **Atribuir** la cifra a la guía, no al artículo.
- `### Coche, terraza y la ley` — S9 art. 24.2 d) y 60.2; S1 OR de vehículo ≈3 veces más enfermedad grave que por esfuerzo. Sin importes de multas.
- `### Tabla: antes, durante y después de la ola` — antes (chequeo, plan de urgencia con teléfono y ruta, revisar peso), durante (horarios, sombra, casa, agua, ventilador, sin ejercicio intenso, nunca en coche cerrado), después (observar, apetito, jadeo). **No** desarrollar quemaduras de almohadillas (remitir a futuro P1-08), ni hidratación/comida húmeda (P1-12).

---

### CONCLUSIÓN Y PREGUNTAS FRECUENTES — ~600 palabras
- *Cierre (~120 palabras):* integra las tres ideas: reconocer pronto, enfriar y llamar, preparar el verano; sin culpa para el tutor; sin desenlace inventado.
- **FAQ (7 preguntas, respuestas cortas de 50–70 palabras, borrador permitido):**
  ```mdx
  <FAQ items={[
    { question: '¿Cuánto calor hace falta para un golpe de calor en un perro mayor?', answer: 'No hay una cifra única: depende del perro, de la humedad y del esfuerzo. La guía oficial española habla de alrededor de 30 °C como peligrosos para perros de edad avanzada y de 32 °C como riesgo alto para todos.' },
    { question: '¿Cómo sé si mi perro jadea por calor o por otra cosa?', answer: 'Si el jadeo es intenso, no cede en un sitio fresco o va con torpeza, vómitos o desorientación, trátalo como urgencia. El jadeo en reposo y sin calor merece consulta aparte.' },
    { question: '¿Puedo mojarlo con una manguera?', answer: 'Sí, mojar piel y pelaje y mantener el aire en movimiento es el método recomendado para perros mayores. Evita que trague agua y no lo sumerjas si está confuso.' },
    { question: '¿Es verdad que no hay que enfriarlo de golpe?', answer: 'Es un consejo muy repetido, pero los estudios no asocian la hipotermia al llegar a la clínica con más muertes y las guías recomiendan enfriar primero. Si tienes dudas, enfría y llama.' },
    { question: '¿Tengo que llevarlo al veterinario aunque se recupere?', answer: 'Sí. Aunque parezca recuperado, el golpe de calor puede afectar a varios órganos y solo la clínica puede valorarlo. Llama y sigue sus indicaciones.' },
    { question: '¿Puedo dejarlo un momento en el coche con las ventanillas abiertas?', answer: 'La ley prohíbe dejarlo solo en un vehículo cerrado con condiciones que pongan en peligro su vida, y un coche aparcado se calienta rápido. Lo más seguro es no dejarlo.' },
    { question: '¿Cortar el pelo ayuda en verano?', answer: 'La guía oficial recomienda consultarlo con tu peluquero canino antes de cortar, porque el pelo también aísla del calor.' }
  ]} />
  ```
  El redactor ajusta las respuestas a las fuentes; toda cifra o regla de la FAQ debe coincidir con el cuerpo.

## 7. POTENCIAL DE AFILIADOS / CONVERSIÓN

- Sin productos obligatorios. Si el equipo decide añadir enlaces comerciales (esterillas refrescantes, bebedero portátil, termómetro), colocarlos solo en H2-5 (tabla de plan), con una frase de criterio y sin afirmar eficacia clínica. Ningún producto en H2-2/H2-3: el lector está en una urgencia.
- Sin chaleco refrigerante ni «productos para tratar el golpe de calor».

## 8. GUÍA VISUAL — 3 PROMPTS DE IMAGEN

> **Sujeto fijo (ilustrativo, no es paciente ni caso):** **podenco andaluz mediano, macho de unos 12–13 años, pelo corto canela con blanco en pecho y hocico, hocico y cejas canosos, orejas grandes erguidas, constitución delgada.** Nombrado explícitamente en los tres prompts. Se elige por ser un perro frecuente en España y no braquicéfalo ni de la raza de otros artículos recientes (labrador, dogo). Declarado como ilustración generada con IA (la firma global del sitio ya lo indica).
> No se solicitó producción de imágenes en este encargo: la sección planifica; no promete recursos terminados.

### Imagen 1 — Hero emocional/preventiva
- **Nombre de archivo:** `podenco-senior-paseo-amanecer-v1.webp`
- **Prompt visual:** plano medio-general a la altura de los ojos del perro, calle estrecha de un pueblo andaluz con sombra y fachadas blancas al amanecer, una cuidadora de unos 40 años (sin rostro identificable, caminando de espaldas) con correa floja; el **podenco andaluz senior descrito, canela y blanco, hocico canoso, 12–13 años**, caminando tranquilo con la lengua apenas fuera; luz natural cálida y baja; profundidad de campo estrecha, adoquines y macetas desenfocados; textura visible del pelaje corto y la piel fina del lomo; estilo fotoperiodístico cinematográfico, sin pose de banco de imágenes. Sin jadeo extremo.
- **Alt:** Ilustración de un podenco senior de hocico canoso paseando con su cuidadora por una calle en sombra al amanecer.
- **Caption:** Primera hora del día: la guía oficial española recomienda concentrar ahí los paseos largos.

### Imagen 2 — Educativa, en casa
- **Nombre de archivo:** `podenco-senior-zona-fresca-casa.webp`
- **Prompt visual:** plano general ligeramente elevado de un salón con suelo de baldosa clara y persianas bajadas; el **podenco andaluz senior canela y blanco, hocico canoso**, tumbado sobre la baldosa junto a un cuenco grande de agua y un ventilador de pie en segundo plano; luz tamizada a rayas por la persiana; profundidad de campo media, textura de baldosa y pelo; atmósfera calmada; estilo documental, color natural, sin elementos comerciales ni marcas.
- **Alt:** Ilustración de un podenco senior tumbado en el suelo fresco de un salón con un cuenco de agua y un ventilador.
- **Caption:** Una zona fresca y con agua a mano es parte del plan antes de la ola de calor.

### Imagen 3 — Resolutiva (primeros minutos)
- **Nombre de archivo:** `podenco-senior-enfriamiento-evaporativo.webp`
- **Prompt visual:** plano medio en sombra, exterior, un ventilador portátil junto a una cuidadora arrodillada que humedece con agua fresca el pecho y el abdomen del **podenco andaluz senior canela y blanco, hocico canoso**, de pie y apoyado, con la lengua fuera pero con los ojos atentos; manos y agua visibles; llaves del coche y teléfono en el suelo como señal de traslado inminente; luz natural de tarde con sombra; profundidad de campo estrecha; estilo fotoperiodístico sobrio, sin dramatismo ni sangre ni colapso.
- **Alt:** Ilustración de una cuidadora humedeciendo el pecho de un podenco senior junto a un ventilador, antes de llevarlo al veterinario.
- **Caption:** Enfriar con agua y aire en movimiento mientras avisas a la clínica y organizas el traslado.

## 9. CONTRATO DE ENTREGA — NO NEGOCIABLES

**1. Volumen:** el artículo final debe medir entre **3.825 y 5.175 palabras** (4.500 ±15 %), contadas sobre el cuerpo `.mdx` real (incluye FAQ; excluye listado bibliográfico y frontmatter). Si no se cumple, revisar omisiones útiles o proponer un ajuste justificado; no rellenar.

**2. Fuentes que deben aparecer citadas por nombre en el cuerpo:**

| # | Fuente | H2 asignado | ¿Citada en el artículo final? |
|---|---|---|---|
| S1 | Hall et al. 2022 (Vet Sci, VetCompass, factores de riesgo graves y mortales) | H2-1, H2-2, H2-4, H2-5 | ☐ |
| S2 | Hall y Carter 2020 (Sci Rep, incidencia 2016) | H2-1 | ☐ |
| S3 | Bruchim, Horowitz y Aroch 2017 (Temperature) | H2-1, H2-2, H2-4 | ☐ |
| S4 | Hall et al. 2021 (Sci Rep, gradación VetCompass) | H2-2, H2-3, H2-4 | ☐ |
| S5 | Hall et al. 2023 (Vet Sci, métodos de enfriamiento) | H2-3 | ☐ |
| S6 | Gaber, Amis y LeCouteur 1985 (JAVMA, parálisis laríngea) | H2-1 | ☐ |
| S7 | AEMET, resumen climático 2025 | H2-5 | ☐ |
| S8 | Guía oficial «ola de calor, animales de compañía» 2024 (dsca.gob.es) | H2-5 | ☐ |
| S9 | Ley 7/2023, arts. 24.2 d) y 60.2 | H2-5 | ☐ |

**3. Componentes estructurales (conteo exacto):**
- [ ] 3 `AlertBox`, uno de cada tipo: `info` (Introducción), `danger` (H2-2), `warning` (H2-3).
- [ ] 1 `FAQ` con las **7** preguntas de la Sección 6.
- [ ] Enlace a la calculadora (H2-4).
- [ ] Enlaces internos de la Sección 5 presentes: pilar, chequeo geriátrico, Cushing, calculadora.

**4. Procedencia:** guía sin caso declarada en la apertura. Sin Luna/Dakota, sin paciente, sin recuperación, sin credencial veterinaria. Imágenes ilustrativas.

**5. Seguridad clínica (bloqueante si falla):**
- [ ] Ninguna dosis, fármaco ni pauta farmacológica para el lector.
- [ ] Ninguna temperatura de parada, tiempo de enfriamiento ni «hielo»/«agua helada» recomendados.
- [ ] Ninguna cifra de España presentada como cifra de un estudio del Reino Unido, ni a la inversa.
- [ ] Umbrales 30/32 °C atribuidos a la guía oficial.
- [ ] Sin importes de multas.
- [ ] La escalera de signos presentada como adaptación editorial, no como escala validada.
- [ ] Ninguna afirmación sin respaldo sobre secuelas, duración o complicaciones tardías.
- [ ] «Recuento de olas»: tres (Península/Baleares) y dos (Canarias, una compartida), no «cinco» a secas.

## 10. CHECKLIST DE VALIDACIÓN FINAL DEL BRIEF

- [x] Frontmatter idéntico al de la Sección 1; `pilar` es un enum válido.
- [x] `seoTitle` 53 car. (≤55) y `metaDescription` 137 car. (≤160), contados con Python.
- [x] Fuentes con URL profunda verificada; PMID/DOI comprobados contra PubMed.
- [x] Enlaces internos reales (verificados contra MDX e inventario) y pendientes sin inventar slugs.
- [x] Keyword/slug sin canibalización.
- [x] Suma de targets = 4.500 = total del contrato.
- [x] Tabla de trazabilidad completa; las nueve fuentes tienen H2.

## 11. RECURSOS PROMETIDOS Y GATE EDITORIAL

| Recurso y utilidad | Ubicación | Ruta/destino | Estado y responsable | Prueba previa a publicación |
|---|---|---|---|---|
| Tabla «qué ves / qué haces ya» (escalera de signos) | H2-2 | En el propio MDX | Planificado, redactor | Legible a 375–390 px, sin desbordamiento; atribuida a S4 |
| Tabla de plan antes/durante/después | H2-5 | En el propio MDX | Planificado, redactor | Legible a 375–390 px |
| 3 imágenes ilustrativas | Hero, H2-5, H2-3 | `public/images/blog/golpe-de-calor-perros-mayores/` | **Planificado, no producido** (no se solicitó producción) | Si no se producen, retirar la referencia del MDX; no publicar placeholders |
| PDF/vídeo/descarga | — | No se promete ninguno | No aplica | — |

- [ ] Extensión y cada H2 justificados por una respuesta distinta.
- [ ] Registro fuente→afirmación→localización completo (§3).
- [ ] Procedencia narrativa e imágenes ilustrativas declaradas.
- [ ] Coherencia con la política editorial; sin pauta farmacológica.
- [ ] Cada recurso prometido operativo o retirada su promesa antes de publicar.
- [ ] Historial de auditoría numerado, máximo tres rondas; detener si falla la tercera.
