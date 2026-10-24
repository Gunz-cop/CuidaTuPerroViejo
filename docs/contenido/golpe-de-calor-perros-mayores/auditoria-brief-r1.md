# Auditoría independiente del brief — Golpe de calor en perros mayores

| Campo | Valor |
|---|---|
| Documento auditado | `briefings/briefing-golpe-de-calor-perros-mayores.md` |
| SHA-256 | `69c2ea4ca18eaf04163c865de3875bd8edac67cd67ad3a7fcf3e685cff43aeb3` |
| Fecha | 2026-10-24 |
| Ronda | **1 de 3** |
| Rol | Auditor independiente. No se modificó el brief ni ningún otro archivo; solo se creó este informe. |
| Reglas aplicadas | `.agents/skills/auditar-briefing-contenido/SKILL.md` (+ `references/formato-informe.md`), `.agents/skills/references/calidad-editorial-adsense.md`, `.agents/skills/generar-briefing-contenido/SKILL.md` (norma), `.agents/skills/references/guia-voz-tono.md`, `.agents/skills/references/apoyos-visuales-responsive.md`, `AGENTS.md`, `INVENTARIO_CONTENIDO.md`, `src/content.config.ts`, `src/pages/politica-editorial.astro` |

## Alcance y método

Se comprobó por separado, para cada fuente S1–S9, (a) la **identidad** (título, autores, revista, año, PMID/DOI) y (b) que el **contenido citado** está en la fuente. No se dio por buena ninguna marca del propio brief (§3 «Comprobada», §10 casillas).

- Identidad: `curl` a `eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi` (PMID 35622759, 32555323, 29435477, 33767275, 37505869, 3972696, 26994496) y `efetch` de resumen (3972696, 29435477).
- Contenido: texto completo de PMC por `efetch db=pmc` (PMC9144152, PMC7303136, PMC7994647, PMC10385239; tablas y discusión leídas con búsqueda de cadenas); PMC5800390 (Bruchim) por WebFetch; PDF de la guía con `curl` + `pdftotext`/`pdfinfo`; AEMET por `curl` de la noticia; BOE por `curl` del texto consolidado de `act.php?id=BOE-A-2023-7936`; emisor de la guía por WebSearch.
- Mecánico: `python3 -I` para caracteres y sumas; `grep` sobre `src/content/blog`, `INVENTARIO_CONTENIDO.md`, `briefings/`.
- Scratch de la verificación (no versionado): directorio del scratchpad de la sesión.

## Veredicto

**NO APTO (ronda 1).** Los identificadores y la identidad de las nueve fuentes son correctos y no hay invención, pero el brief caracteriza mal tres datos que ordena usar en el artículo: la mediana de 16,9 °C de S1 es un índice WBGT, no «temperatura ambiente»; los porcentajes de «muertes» de S1/S4 incluyen eutanasias sin decirlo; y la corrección del «mito» de no enfriar de golpe se apoya en una afirmación sobre «prensa y protectoras españolas» que el propio brief declara no haber podido atribuir. Los tres arreglos son pequeños y ninguno exige reabrir la estructura; pasar a ronda 2 es barato.

Lo mecánico y las fuentes quedan cerradas; el veredicto no está incompleto salvo por las limitaciones de acceso listadas abajo (Bruchim, últimos ~32.000 caracteres; S2 y S6 leídos solo hasta donde se indica).

## Hallazgos

Severidades: **bloqueante** (invalida el contrato), **mayor** (degrada el contrato y se propagará al artículo), **menor** (calidad, se corrige al tocar el archivo). No hay hallazgos bloqueantes.

### Mayores

**H-01 (mayor) — La cifra de 16,9 °C es un índice WBGT, no «temperatura ambiente».**
- Ubicación: §3 S1 «Localización y datos» («Mediana de temperatura ambiente el día de los episodios: 16,9 °C»), «Límites» («usar 16,9 °C solo como prueba…») y §6 H2-1 `### No hace falta una ola de calor`.
- Evidencia: Hall 2022, Resultados 3.2 «Ambient Temperature»: «The maximum daily **WBGT** recorded on days of HRI events ranged from 3.3 to 23.1 °C (median 16.9 °C, IQR 14.8–18.9 °C)». La Discusión repite «median WBGT of 16.9 °C». WBGT (Wet Bulb Globe Temperature) es un índice compuesto de temperatura, humedad y radiación; no es la temperatura del aire que el lector compara con los 30/32 °C de la guía oficial (S8).
- Por qué importa: el redactor escribirá «a 16,9 °C» junto a «30 °C ya es peligroso» y el lector verá una contradicción de 14 grados que no existe; es un dato clave presentado con la magnitud equivocada.
- Reproducir: `efetch db=pmc id=9144152`, buscar «WBGT» y «16.9».

**H-02 (mayor) — Las cifras de «muertes/mortalidad» de S1 y S4 incluyen eutanasias y el brief no lo dice.**
- Ubicación: §3 S1 («Muertes por grupo de edad…», «mal leve 2,21 % de muertes… grave 56,76 %»), S4 («Mortalidad: leve 2,21 %…»); §6 H2-1 (5 % / ~17 % / ~27 %) y H2-4 (`### Qué dice el pronóstico`: 2 % / 5 % / 57 %).
- Evidencia: Hall 2022, Métodos: el desenlace es «“death” from any mechanisms (unassisted, **euthanasia** and unknown)». Hall 2021 (S4) separa los dos: «fatality rate (death overall)… 2.21 % mild, 5.46 % moderate, 56.76 % severe. The **unassisted death** fatality rate increased from 0.32 % in mild events, to 2.19 % in moderate events, and 23.42 % in severe events».
- Por qué importa: «57 % de los perros graves mueren» y «un 23 % muere sin asistencia, el resto incluye eutanasia» comunican un pronóstico distinto a un tutor angustiado. Es la cifra más sensible del artículo y está pedida en lenguaje de tutor.
- No es error de cifra: **todos los números del brief coinciden con las tablas** (ver registro). El fallo es la etiqueta.

**H-03 (mayor) — Aportación propia (c) apoyada en una afirmación sin fuente.**
- Ubicación: §2 «Aportación propia» (c): «consejo muy repetido en prensa y protectoras españolas («no enfriar de golpe»)»; §3 «Descartadas»: «prensa regional y nacional… (no se pudo atribuir a una institución)… Una de ellas repetía que “no hay que enfriar bruscamente”».
- Evidencia: el brief descarta esas fuentes en §3 y a la vez las usa como premisa del valor añadido en §2. La única base verificable de que el consejo circula es S5: «textos antiguos aconsejan agua “tibia” y evitar baños de hielo» (Introducción de Hall 2023). No hay base para «protectoras españolas».
- Por qué importa: afirmación clave sin respaldo (calidad editorial §2 y §6 «bloquean: afirmación clave sin respaldo»). El redactor la copiaría a H2-3 y a la FAQ 4 («Es un consejo muy repetido…»).
- Complemento (H-12): el mismo H3 debe contar lo que S5 sí documenta en contra (ver abajo).

### Menores

**H-04 — Falta decir al redactor qué escribir donde las fuentes no dan criterio de parada del enfriamiento.** §3 laguna 3 y §9 prohíben inventar cifra, correcto y bien hecho, pero §6 H2-3 y el AlertBox `danger` («sigues enfriándolo») no indican qué sustituye a la cifra. Instrucción: decir que no hay criterio doméstico de parada en las fuentes, pedir al tutor que lo consulte por teléfono con la clínica al llamar, y que el veterinario retoma el enfriamiento. S3 sí contiene cifras (43 °C durante 40 min, >42 °C) que **no** deben pasar al artículo; conviene decirlo expresamente.

**H-05 — La cifra de 41 °C se usa como definición y como umbral práctico.** §6 H2-1 «por encima de ~41 °C y con alteración neurológica es una urgencia». Hall 2021 (S4), Discusión: «The previously proposed critical body temperature threshold of > 41 °C… can therefore no longer be considered appropriate. Any dog with a temperature **approaching** 41 °C should be actively cooled as a matter of urgency, but clinical signs should be used to then determine the severity». Instrucción: citar 41 °C solo como definición clásica de S3, indicar que S4 la considera insuficiente como criterio y no invitar a tomar temperatura en casa (coherente con H2-3 punto 4). Además, la frase de §3 S4 entre comillas es traducción, no cita literal: marcarla como «traducción libre».

**H-06 — Trazabilidad fuente→H2 inconsistente entre bloques.** Cada fuente aparece en ≥1 `*Sustentado en:*` (ninguna es decorativa por ausencia de H2). Pero: S1 se declara para H2-2 (§3 y tabla §9) y no figura en el `*Sustentado en:*` de H2-2 (solo se cita «S1/S3» en una viñeta); S3 se asigna a H2-1, 2 y 4 en §3/§9 pero §6 también la usa en H2-3. Armonizar las tres vistas.

**H-07 — §6 H2-5 pide «OR de vehículo» mientras H2-1 dice «No usar ORs en el cuerpo».** Hall 2022: confinamiento en vehículo OR 3,03 (IC 95 % 1,28–7,15; 35 perros) de enfermedad **grave** frente a esfuerzo, ajustado. «≈3 veces más enfermedad grave» (§6 H2-5) convierte un odds ratio en un riesgo relativo. Instrucción: «más probabilidad de acabar con un cuadro grave que los casos por esfuerzo», sin «veces», e indicar el IC o el tamaño pequeño del grupo.

**H-08 — Límite brief vs. redacción: cuerpos de AlertBox y frase de S6 redactados casi finales.** La skill solo exceptúa `items` de FAQ y `title`/tipo de AlertBox. Los cuerpos de los AlertBox `danger` y `warning` (§6 H2-2, H2-3) y la frase entre comillas de §3 S6 («una vía aérea que no deja pasar bien el aire es un factor de riesgo reconocido; si tu perro respira con ruido…») son prosa terminada. Es legítimo mantener la lista de contenidos de seguridad (qué debe aparecer), pero convertirla en lista de puntos y no en frases listas para pegar.

**H-09 — S6 (Gaber 1985) es la fuente más débil y su aporte es una frase.** Identidad y resumen verificados (ver registro), pero el estudio no trata el golpe de calor y el brief reconoce que el vínculo es inferencia editorial. Hall 2022, Introducción ya sostiene la inferencia: «Dogs with impaired thermoregulation from altered anatomy (such as brachycephaly), obesity or underlying health conditions affecting the respiratory or circulatory systems, are at increased risk of developing severe HRI at relatively low ambient temperatures». Instrucción: o bien respaldar esa frase con S1/S3 y retirar S6, o mantener S6 solo para «la parálisis laríngea afecta sobre todo a perros mayores grandes» sin que figure como sustento del riesgo. No es fuente decorativa por trazabilidad, sí débil por relevancia.

**H-10 — Tabla de plan de 3 columnas sin plan móvil explícito.** §6 H2-5 `### Tabla: antes, durante y después` y §11 («Legible a 375–390 px») no aplican `apoyos-visuales-responsive.md`: tablas de 3+ columnas deben usar `TablaApilable` con `data-label` y celdas de una frase; las celdas planificadas son listas de varios ítems. La tabla de 2 columnas de H2-2 sí tiene regla móvil. Instrucción: nombrar `TablaApilable`, o sustituir por tres listas bajo H3.

**H-11 — FAQ: las respuestas borrador miden 19–40 palabras; el brief declara 50–70.** Medido con Python: 40, 31, 29, 32, 24, 30, 19. Con 50–70 palabras la sección «Conclusión y FAQ» da 470–610 frente a un target de 600 (±15 % = 510–690). Aclarar si los borradores se amplían o se corrige el rango.

**H-12 — H3 «mito» debe incluir la cautela documentada por S5.** Hall 2023, Introducción: un estudio experimental (Magazanik 1980) halló que «some dogs died immediately upon immersion into ice-cold water» y que 15–16 °C enfrió más rápido a perros conscientes; el brief solo recoge las «muertes tras inmersión en agua helada» en §3 y ordena no recomendar hielo, pero el H3 se llama «mito». Instrucción: presentar que el miedo nació de una observación real con agua helada, que S4/S5 sostienen que la hipotermia a la llegada no aumentó la mortalidad y que no se recomienda hielo ni agua helada. Además, «abdomen e ingles y cambiándola» (§6 H2-3) no está en S5 (que dice «abdomen or inner thigh»; la sustitución de la toalla no figura): ceñirse al texto.

**H-13 — Fuente S8: título y emisor.** El PDF dice «GUÍA PARA CUIDAR A TU ANIMAL DE COMPAÑÍA EN UNA OLA DE CALOR» (metadato «Guía ola de calor animales de compañía»); el brief la titula «Cuida a tu animal de compañía en una ola de calor». Emisor, que el brief deja pendiente: la nota de prensa «Derechos Sociales publica una guía para proteger a los animales de compañía ante las olas de calor» (https://www.dsca.gob.es/es/comunicacion/notas-prensa/derechos-sociales-publica-guia-proteger-animales-compania-olas-calor), 19/07/2024, atribuye el documento al Ministerio de Derechos Sociales, Consumo y Agenda 2030, elaborado por la Dirección General de Derechos de los Animales (verificado por búsqueda; no abrí la nota de prensa completa, solo el resultado del buscador).

**H-14 — Detalles de registro.** (i) Hall 2022: «las Conclusiones dicen “más de 10 años”» (§3 S1 Límites): la formulación «over 10 years» está en el **Resumen**, no en la sección Conclusiones; la Discusión usa «aged over 12 years». La instrucción del brief («decir “a partir de los 10–12 años”») sigue siendo correcta. (ii) S1 y S2 comparten cohorte parcial (los 395 episodios de 2016 están en los 856 de 2016–2018): no presentarlos como corroboración independiente. (iii) §2 afirma «sin colisión: no hay… rama con ese nombre»; existe `origin/claude/brief-golpe-de-calor-perros-mayores` (la rama de este mismo trabajo, no una colisión ajena). (iv) Nombres de imagen: solo la hero lleva `-v1`; la imagen 2 no declara sección de inserción en §8 (sí en §11). (v) En §6 H2-4 y la intro, 600 y 300 palabras son altos para el contenido verificable disponible (laguna 4 prohíbe secuelas/duraciones): vigilar relleno.

### Observaciones fuera del brief (no son defectos del documento auditado)

- `INVENTARIO_CONTENIDO.md` ES-01 resume «cinco olas de calor» frente a la fuente AEMET (cuatro distintas); el brief lo detecta y corrige correctamente. El inventario sigue con el recuento erróneo (instrucción para sesión aparte).
- `git log` muestra «Publica guía sobre mal aliento en perros viejos (#145)» mientras el inventario mantiene esa pieza como `[~]` (línea 230). El brief hace bien en no enlazarla; conviene actualizar el inventario en otra sesión antes de añadir ese enlace.

## Verificación de fuentes (registro fuente → afirmación → localización → comprobación)

Leyenda: **Identidad** = metadatos contra PubMed `esummary`; **Contenido** = dato localizado en el texto.

| Fuente | Identidad | Afirmación del brief | Localización comprobada | Resultado |
|---|---|---|---|---|
| **S1** Hall 2022, Vet Sci 9(5):231, PMID 35622759, DOI 10.3390/vetsci9050231, PMC9144152 | Coincide (7 autores, Vet Sci 2022 May 11;9(5)) | Mortalidad por edad: <2 a. 5,04 % (7/139); 6–<8 11,76 %; 8–<10 11,84 %; 10–<12 16,92 % (11/65); ≥12 27,38 % (23/84); OR ≥12 vs <2 8,87 (2,87–27,41) | Tabla 6 («risk factors associated with a fatal outcome», n = 856; la cabecera de columna dice por error «Severe Cases (%)») y texto de Resultados | **Verificado** cifra a cifra. Falla la etiqueta de «muertes» (H-02) |
| | | Enfermedad grave ≥12 a.: 22/83 = 26,51 %, OR 5,89 | Tabla 5 y texto | **Verificado** |
| | | Mortalidad por grado: leve 2,21 %, moderado 5,46 %, grave 56,76 %, OR 64,92 | Tabla 6 «VetCompass Clinical Grade» (317/366/111) | **Verificado**; incluye eutanasia (H-02) |
| | | Vehículo OR 3,03 (35 perros) de enfermedad grave frente a esfuerzo | Tabla 5, «Vehicular 35, 9 (25,71) 3,03 1,28–7,15» y texto | **Verificado** (IC 1,28–7,15; H-07) |
| | | «Mediana de temperatura ambiente 16,9 °C» | Resultados 3.2 | **Parcial: es WBGT, rango 3,3–23,1 °C** (H-01) |
| | | Edad atribuida a «menor capacidad de termorregulación» | Discusión: «diminished capacity of older dogs to thermoregulate» | **Verificado** |
| | | Edad en años medida débil de etapa de vida | Discusión: «age (measured in years) is a relatively poor measure of life stage in dogs» | **Verificado** |
| **S2** Hall y Carter 2020, Sci Rep 10:9128, PMID 32555323, DOI 10.1038/s41598-020-66015-8, PMC7303136 | Coincide (3 autores) | 905.543 perros, 395 episodios, incidencia 0,04 %, letalidad 14,18 % (IC 11,08–17,96); razas, >2 años, braquicéfalos, >50 kg | Resumen | **Verificado en el resumen**; no se citó nada de tablas, límite del brief respetado |
| **S3** Bruchim, Horowitz y Aroch 2017, Temperature 4(4):356–370, PMID 29435477, DOI 10.1080/23328940.2017.1367457, PMC5800390 | Coincide (3 autores) | Definición >41 °C + disfunción SNC; factores (calor húmedo, ejercicio, obesidad, >15 kg, Labrador/braquicéfalos, obstrucción vía aérea superior, crisis prolongadas, falta de aclimatación); signos; mortalidad ~50 %; no lista edad ni parálisis laríngea | Resumen (`efetch` texto) y texto vía WebFetch | **Verificado**. Edad no aparece como factor; «laryngeal paralysis» no aparece; Conclusiones: «prompt whole body cooling by dog owners and caregivers are important for survival». Sin temperatura de parada. **Limitación de acceso: leído 0–100.000 de 132.137 caracteres** (laguna 4 del brief coincide) |
| **S4** Hall et al. 2021, Sci Rep 11:6828, PMID 33767275, DOI 10.1038/s41598-021-86235-w, PMC7994647 | Coincide (5 autores) | Tabla 5 de grados (leve: letargo/rigidez, jadeo intenso/dificultad respiratoria, sin alteración de consciencia; moderado: vómito/diarrea sin sangre, hipersalivación, colapso intermitente, una crisis) | Tabla 5 del artículo | **Verificado** (el apartado grave incluye alteración mental, petequias, hemorragia GI, según Resultados) |
| | | 39,92 / 46,10 / 13,98 % (793 episodios) | Resultados | **Verificado** |
| | | Mortalidad 2,21 / 5,46 / 56,76 % | Resultados | **Verificado**; incluye eutanasia, no dicho (H-02). Sin decir: no asistida 0,32 / 2,19 / 23,42 % |
| | | «Temperatura cercana a 41 °C… enfriarse activamente con urgencia» | Discusión («approaching 41 °C should be actively cooled as a matter of urgency») | **Verificado**, es traducción; el mismo párrafo descarta 41 °C como criterio diagnóstico (H-05) |
| | | Hipotermia <37,2 °C no asociada a más riesgo de muerte; textos cautelosos; riesgo de ahogamiento | Discusión: «hypothermia on presentation was not associated with an increased risk of death overall or unassisted death»; «drowning is a risk to any HRI patient undergoing water immersion… head remains above the water» | **Verificado** |
| **S5** Hall et al. 2023, Vet Sci 10(7):465, PMID 37505869, DOI 10.3390/vetsci10070465, PMC10385239 | Coincide (7 autores) | Vet-COT 2016: inmersión para jóvenes/sanos; evaporativo (agua en piel y pelaje + movimiento de aire) para geriátricos/comorbilidades; «cool first, transport second» | Introducción | **Verificado** textual |
| | | 341 con enfriamiento, 74 (21,70 %) antes del traslado, 23,97 % con método recomendado, toallas 51,31 %; 45,26 % sin registro | Resumen/Resultados | **Verificado** |
| | | Toallas menos eficaces en humanos, ineficaces en caballos, faltan datos en perros; abdomen/cara interna del muslo | Discusión | **Verificado** («abdomen or inner thigh»); «ingles» y «cambiándola» no están (H-12) |
| | | No mide resultados por método | Métodos: «not appropriate to carry out an analysis of potential relationships between cooling methods and HRI severity or outcome» | **Verificado** |
| | | Estudio de 1980; agua tibia/evitar hielo | Introducción (Magazanik 1980; «some dogs died immediately upon immersion into ice-cold water») | **Verificado**; el brief omite el matiz (H-12) |
| **S6** Gaber, Amis y LeCouteur 1985, JAVMA 186(4):377–380, PMID 3972696 (sin DOI) | Coincide | 23 perros; mayormente mayores de razas grandes/gigantes; 7 meses–14 años; signos; más en machos, sobre todo castrados | Resumen | **Verificado en el resumen** (verificación parcial). Sin mención de golpe de calor, como declara el brief (H-09) |
| **S7** AEMET, resumen anual 2025, 14/01/2026 | Coincide (fecha y título) | 15,0 °C peninsular, +1,1 °C, 3.er año más cálido empatado con 2024; últimos 4 años más cálidos | Página, apartados Temperaturas | **Verificado** |
| | | Tres olas en Península/Baleares (18 jun–4 jul; 15–18 jul; 3–18 ago) y dos en Canarias (15–18 jul compartida; 17–20 sep) | «tres olas de calor en el ámbito de la Península y Baleares y dos en Canarias»; «La segunda ola de calor afectó toda España, incluida Canarias, entre el 15 y 18 de julio»; «Entre el 17 y 20 de septiembre hubo otra ola de calor en Canarias» | **Verificado: 4 olas distintas**. El inventario («cinco») es erróneo; el brief acierta. ~17 y ~16 días y 45,8 °C (Jerez, día 17) verificados |
| **S8** Guía ola de calor animales de compañía, PDF 6 pp., NIPO 233-24-054-4, creado 19/07/2024 | PDF: 6 páginas, metadato «Guía ola de calor animales de compañía», creación 2024-07-19 | «temperaturas superiores en torno a 30 °C ya pueden ser peligrosas para perros grandes, de avanzada edad o braquicéfalos… a partir de 32 °C todos los perros están expuestos a un alto riesgo de golpe de calor» | `pdftotext`, punto 2 | **Verificado textual** (el original usa «30ºC» y «32ºC») |
| | | Puntos 1, 3, 4, 8, 9, 10; zonas frescas a animales de «avanzada edad»; bozal de cesta; peluquero canino | `pdftotext` | **Verificado** |
| | | Emisor no nombrado en el texto | Nota de prensa del 19/07/2024 | **Resuelto por búsqueda**: Ministerio de Derechos Sociales, Consumo y Agenda 2030 (DG Derechos de los Animales) (H-13) |
| **S9** Ley 7/2023, BOE-A-2023-7936 | Texto consolidado, «Última actualización, publicada el 29/03/2023» | Art. 24.2 d): «No dejarlos solos dentro de vehículos cerrados, expuestos a condiciones térmicas o de cualquier otra índole que puedan poner su vida en peligro.» | Art. 24 | **Verificado textual** |
| | | Art. 60.2: «Cuando los animales de compañía deban permanecer en vehículos estacionados, se adoptarán las medidas pertinentes para que la aireación y la temperatura sean adecuadas.» | Art. 60 | **Verificado textual** |
| | | Art. 27 e): «Mantener de forma habitual a perros y gatos en terrazas, balcones, azoteas, trasteros, sótanos, patios y similares o vehículos.» | Art. 27 | **Verificado** (el brief resume «terrazas, balcones, azoteas… o vehículos»; correcto) |
| **Hanel 2016** (no usada como cita) | JVECC 26(2):166–233, PMID 26994496, DOI 10.1111/vec.12455 | Identificada, no abierta | `esummary` | **Identidad verificada**; solo puede citarse a través de S5, como dice el brief |

Resumen del registro: **9 de 9 fuentes con identidad correcta** (ningún identificador inventado ni mal asignado, ningún PMID de otro tema). **Contenido** verificado en todas, con tres limitaciones declaradas: S2 y S6 solo resumen (como marca el brief), S3 hasta el carácter 100.000 de 132.137. URLs: todas profundas; S2 usa el DOI (válido).

## Comprobaciones pedidas expresamente

| Punto | Resultado |
|---|---|
| Cifras de Hall 2022 por edad y grado | Todas coinciden (ver registro). Reservas: H-01 (WBGT) y H-02 (eutanasia). |
| Frase de la guía oficial 30/32 °C | Correcta, literal y atribuible a la guía (punto 2 del PDF). |
| Arts. 24.2 d) y 60.2 Ley 7/2023 | Textos citados idénticos al BOE consolidado. |
| Recuento AEMET | 3 (Península/Baleares) + 2 (Canarias, una compartida) = **4 olas distintas**. El brief lo cuenta bien; el inventario ES-01 («cinco») no. |
| `seoTitle` | `python3 -I`: **53** caracteres (≤55). Coincide con el brief. |
| `metaDescription` | `python3 -I`: **137** caracteres (≤160). Coincide con el brief. |
| Suma de targets | 300 + 750 + 700 + 850 + 600 + 700 + 600 = **4.500**; rango del contrato 3.825–5.175 = 4.500 ± 15 %. Coincide. |
| Frontmatter / `pilar` | Campos válidos para `z.strictObject` (`title`, `seoTitle`, `metaDescription`, `pilar`, `keywordPrincipal`, `heroImage`, `heroImageAlt`, `datePublished`); `salud-perros-mayores` está en el enum. Slug ↔ ruta ↔ imágenes sin ñ/tildes/espacios. |
| Canibalización | `grep -ril "golpe de calor" src/content briefings docs`: solo el propio brief. P1-08, P1-12, P1-07, P1-25 delimitados. Sin solapamiento. |

## Enlazado interno

| URL del brief | MDX en `src/content/blog` o página | Inventario |
|---|---|---|
| `/salud-perros-mayores` | `src/content/pilares/salud-perros-mayores.mdx` existe | Pilar publicado |
| `/salud-perros-mayores/chequeo-geriatrico-canino` | `chequeo-geriatrico-canino.mdx` existe | `[x] Publicado` (línea 222) y ruta real (línea 138) |
| `/salud-perros-mayores/sindrome-cushing-perros-mayores` | `sindrome-cushing-perros-mayores.mdx` existe; trata el jadeo en reposo | `[x] Publicado` (línea 226) y ruta real (línea 160) |
| `/herramientas/calculadora-calidad-vida-perros` | `src/pages/herramientas/calculadora-calidad-vida-perros.astro` existe | «Publicado» (línea 114) |

Sin enlaces a no publicados. Los pendientes (P1-08, P1-12, P1-04) están sin slug inventado. El no enlazar `mal-aliento-perros-viejos` es coherente con el inventario (ver observación). Cumple la mínima exigencia de ≥2 spokes publicados más la calculadora.

## Estructura, componentes, voz y seguridad

- **AlertBox:** `info` (Introducción), `danger` (H2-2), `warning` (H2-3). Los tres tipos, uno cada uno, en sus secciones. Tipos válidos según `AlertBox.astro`.
- **FAQ:** 7 preguntas borrador, contrato y §6 coinciden (rangos de palabras: H-11).
- **Procedencia:** «guía sin caso» declarada (§2), sin Luna/Dakota (coherente con la regla de reserva personal del inventario), sin paciente ni recuperación; imágenes ilustrativas; el autor del sitio sin credencial veterinaria ficticia (coherente con `politica-editorial.astro`).
- **Valor propio:** pregunta del lector, respuesta práctica y aportación (a)–(d) definidas; cada H2 responde a una decisión distinta (por qué, reconocer, actuar, qué esperar, prevenir). Reserva en H-03 sobre (c) y en H-14(v) sobre H2-4.
- **Seguridad clínica:** sin dosis ni pauta farmacológica (los fármacos solo aparecen como «no des»), sin hielo/agua helada recomendados, sin cifra de parada ni minutos, sin importes de multas, umbrales 30/32 °C atribuidos, escalera presentada como adaptación editorial, olas de calor correctamente contadas. Cumple la política editorial («no prescribimos fármacos ni dosis»). Reservas H-04, H-05, H-12.
- **Voz y tono:** remite a la guía vigente, pide tú, afirmativo primero, advertencias de urgencia concentradas en AlertBox y ≤3 muletillas/1000 palabras con `tono.py`. No pide voz contraria. `tono.py` no es aplicable al brief (se aplicará al artículo).
- **Prompts de imagen:** los tres nombran el mismo sujeto (podenco andaluz canela y blanco, hocico canoso, 12–13 años), con plano, escenario concreto, luz, profundidad de campo y estilo fotoperiodístico; ninguna escena de banco de imágenes. Un solo perro, un solo sujeto.
- **Recursos prometidos (calidad editorial §5):**

| Recurso | Ubicación | Ruta/destino | Estado | Prueba previa a publicación | Comprobación en esta ronda |
|---|---|---|---|---|---|
| Tabla «qué ves / qué haces ya» | H2-2 | MDX | Planificado | Legible a 375–390 px, atribuida a S4 | Regla móvil presente (celdas ≤12 palabras o lista apilada). Pendiente de redacción |
| Tabla de plan antes/durante/después | H2-5 | MDX | Planificado | Legible a 375–390 px | Falta decir `TablaApilable` (H-10). Pendiente de redacción |
| 3 imágenes ilustrativas | Hero, H2-5, H2-3 | `public/images/blog/golpe-de-calor-perros-mayores/` | Planificado, **no producido** | Si no se producen, retirar la referencia del MDX | `heroImage` del frontmatter apunta a un archivo inexistente; el gate lo cubre. Correcto no prometerlo como disponible |
| Enlace a calculadora | H2-4 | `/herramientas/calculadora-calidad-vida-perros` | Existente | Abrir antes de publicar | Existe; la prueba de apertura queda para el artículo |
| PDF/vídeo/descarga | — | No se promete | N/A | — | Correcto |

Todo lo anterior es validación **local y documental**; no se verificó ninguna URL pública del sitio ni se hizo `npm run build` (no aplica a un brief).

## Efecto cascada

- No hay artículo redactado: `src/content/blog` no contiene golpe de calor.
- Ningún otro brief ni documento de `docs/` contiene los PMID/DOI de esta lista ni la guía ni la URL del BOE: `grep -rl` solo devuelve este brief. No hay contaminación hacia otros briefs.
- El inventario hereda el recuento erróneo de olas (ES-01), ya señalado.
- Si H-01/H-02 no se corrigen, las dos cifras mal etiquetadas llegarían a H2-1, H2-4 y a la FAQ, y la auditoría del artículo (que audita contra el brief) las daría por buenas.

## Lo que sí funciona (no romper al corregir)

- Todas las identidades PMID/DOI/volumen/páginas son correctas y están acompañadas de la fecha de comprobación; nada «de memoria».
- Las marcas de **verificación parcial** de S2, S6 y S3 (laguna 4) son honestas y exactas; no hay que «completarlas».
- Lagunas 1–4 documentadas, con la prohibición de inventar temperatura de parada, minutos o complicaciones tardías.
- El recuento de olas de calor se corrige contra el inventario con precisión (4 distintas).
- La atribución de 30/32 °C a la guía oficial y la prohibición de convertirlos en umbral propio.
- Decisión de no enlazar `mal-aliento-perros-viejos`, de no citar multas, de no usar Hanel 2016 sin abrir, y de no desarrollar P1-08/P1-12.
- Escalera de signos como adaptación editorial; riesgo de ahogamiento incluido; sin medicación; sin hielo.
- Sujeto visual único y bien especificado; sin Luna/Dakota; guía sin caso declarada.

## Qué corregir, en orden (instrucciones para una sesión aparte; no se aplican aquí)

1. **S1 §3, «Localización y datos» y «Límites» + §6 H2-1 `### No hace falta una ola de calor` (H-01).** Sustituir «temperatura ambiente» por «índice WBGT (temperatura de bulbo húmedo y globo, que integra humedad y radiación), mediana 16,9 °C, rango 3,3–23,1 °C». Indicar al redactor que no compare ese número con los 30/32 °C de la guía y que lo cuente como «con un día templado y esfuerzo también ocurre».
2. **S1, S4, §6 H2-1 y H2-4 (H-02).** Añadir que el desenlace «fatal» incluye muerte espontánea, eutanasia y causa no registrada; recoger de Hall 2021 las cifras de muerte no asistida (0,32 / 2,19 / 23,42 %) y ordenar redactar «murieron o fueron eutanasiados». Mantener las cifras actuales.
3. **§2 «Aportación propia» (c) y §6 H2-3 H3 «mito», FAQ 4 (H-03, H-12).** Eliminar «prensa y protectoras españolas»; atribuir el origen del consejo solo a S5 («textos veterinarios antiguos»); incluir el origen del miedo (experimento de 1980 con agua helada) y mantener «sin hielo ni agua helada».
4. **§6 H2-3 y AlertBox `danger` (H-04).** Instruir qué decir sobre el criterio de parada: que las fuentes no dan uno doméstico y que se pregunta a la clínica al llamar; prohibir expresamente trasladar al artículo 43 °C/40 min o >42 °C de S3.
5. **S4 / §6 H2-1 `### Qué es un golpe de calor` (H-05).** Reformular los 41 °C como definición clásica y marcar la cita de S4 como traducción libre.
6. **Trazabilidad (H-06):** unificar S1 en H2-2 y S3 en H2-3 entre §3, §6 y §9. **H-07:** quitar «OR de vehículo ≈ 3 veces» de H2-5.
7. **Límite brief/redacción (H-08):** convertir los cuerpos de los AlertBox `danger` y `warning` y la frase de S6 en listas de puntos.
8. **S6 (H-09):** respaldar con S1 (Introducción) y retirar S6, o acotar S6 a la frase sobre razas grandes mayores.
9. **Tabla de plan (H-10), FAQ (H-11), S8 (H-13) y registro (H-14):** nombrar `TablaApilable`, aclarar la longitud de las respuestas FAQ, corregir título de S8 y añadir el emisor verificado, ajustar la nota sobre «Conclusiones» y el solapamiento S1/S2.
10. **Fuera del brief:** actualizar `INVENTARIO_CONTENIDO.md` (ES-01 «cuatro» olas; estado de mal aliento si ya está publicado).

Al cerrar las correcciones, la ronda 2 debe comprobar de nuevo solo lo corregido más hash, caracteres y suma; las nueve identidades no necesitan repetirse salvo que cambien. Rondas restantes: 2 de 3.

## Cómo reproducir

```bash
sha256sum briefings/briefing-golpe-de-calor-perros-mayores.md
python3 -I -c "print(len('Golpe de calor en perros mayores: señales y qué hacer'), len('Cómo reconocer el golpe de calor en un perro mayor, qué hacer en los primeros minutos y cómo prepararte para las olas de calor en España.'))"
curl -sS "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=35622759,32555323,29435477,33767275,37505869,3972696,26994496&retmode=json"
curl -sS "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pmc&id=9144152&retmode=xml"   # buscar WBGT, 16.9, euthanasia, Table 6
curl -sS -L "https://dsca.gob.es/sites/default/files/publicaciones/Guia-ola-calor-animales.pdf" -o g.pdf && pdftotext -layout g.pdf g.txt
curl -sS -L "https://www.aemet.es/es/noticias/2026/01/resumen_anual_2025"                        # «tres olas… dos en Canarias»
curl -sS -L "https://www.boe.es/buscar/act.php?id=BOE-A-2023-7936"                               # arts. 24, 27, 60
```
