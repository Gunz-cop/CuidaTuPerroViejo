# Auditoría del brief «Mi perro viejo se cree cachorro», ronda R1

- **Documento auditado:** `briefings/briefing-perro-viejo-se-cree-cachorro.md`
- **Versión:** commit `7f9a981`, blob `f8be4db9c681b399ed18effcb6ab96efd5e4e7cd`
- **Ronda:** R1 de un máximo de 3
- **Fecha:** 2026-11-18
- **Rol:** revisor externo con la skill `auditar-briefing-contenido`. Este informe no corrige el brief.
- **Método:** identificadores resueltos con NCBI E-utilities (esummary/efetch) y búsqueda web. Texto completo leído en PMC para PMC7291569 y PMC7755036. Gráfico MCS descargado y leído. Conteos hechos con Python.

## Veredicto

**NO APTO.** La afirmación clave de la Fuente 7 está asignada al estudio equivocado: las frases citadas existen en ese artículo, pero describen otra cosa. Además, la H3 «Por qué se nota primero atrás» no tiene respaldo y contradice la Fuente 2. Las dos correcciones son concretas, pero hay que hacerlas antes de redactar y pasar una R2.

Verificación de fuentes completa: se abrieron las 7. La guía AAHA (Fuente 3) solo se verificó de forma parcial, porque aaha.org devuelve 403. Se confirmó a través del registro de PubMed y del extracto del buscador.

## Hallazgos

### P0

**H1. Sección 3, Fuente 7: dato clave atribuido al estudio equivocado.**

| | Lo que dice el brief | Lo que dice la fuente |
|---|---|---|
| Identificador | PMC7291569, «título a confirmar» | PMID 32527313 · DOI 10.1186/s12917-020-02404-5 · *«You can be blind because of loving them so much»: the impact on owners in the United Kingdom of living with a dog with osteoarthritis*. BMC Vet Res 2020;16:190 |
| Dato | «Los dueños atribuían a menudo las primeras señales a la vejez» | En el apartado *Finding out about the diagnosis*, las frases «I just thought…», «I just assumed…» y «Arthritis is just part of old age» expresan la idea previa del dueño **cuando ya tenía el diagnóstico**: la artrosis como algo inevitable y menor de la vejez. No hablan de no reconocer las primeras señales. |

La afirmación que el brief necesita para la H3 «Señales que solemos confundir con "es la edad"» está en **otro** estudio del mismo equipo, que he leído en PMC:

> Belshaw Z, Dean R, Asher L. *Could it be osteoarthritis? How dog owners and veterinary surgeons describe identifying canine osteoarthritis in a general practice setting.* Prev Vet Med. 2020;185:105198. PMID 33227581 · PMC7755036 · DOI 10.1016/j.prevetmed.2020.105198.
> Texto: «Less experienced owners typically assumed that subtle changes they saw in older dogs were part of normal ageing. Phrases such as "I just assumed it was old age…" and "I just thought it was normal to slow down…" were used by many to describe their prior beliefs.» El resumen añade que pocos dueños atribuían esos cambios a la artrosis y que algunos tardaron meses en consultar.

Es un caso de manual de lo que esta skill debe atrapar: el mismo equipo, el mismo año y frases casi idénticas. El autor del brief marcó el título como pendiente, y eso lo honra. Aun así, el dato se presentó como si lo respaldara ese PMC.

**H2. Sección 6, H2 «Lo que cambia por dentro», H3 «Por qué se nota primero atrás», y Sección 8, video («donde se pierde músculo primero»): afirmación sin respaldo que contradice la Fuente 2.**

- La H3 se apoya en la Fuente 1. El resumen de Freeman 2012 (PMID 22111652) no dice en qué región se pierde antes el músculo.
- El gráfico MCS de WSAVA/Tufts (Fuente 2) dice literalmente: «Muscle loss is typically first noted in the **epaxial muscles on each side of the spine**; muscle loss at other sites can be more variable.»
- El video resalta en ámbar los cuartos traseros, los muslos y el lomo bajo el rótulo «donde se pierde músculo primero». Eso enseña al lector algo distinto de lo que dice la fuente que el propio brief cita. Además, la «reverencia» de Luna no prueba nada: el expediente solo dice que a veces le cuesta.

### P1

**H3. Sección 3, Fuente 1: «puede ocurrir con peso estable o incluso con sobrepeso» no está en lo que se pudo leer de Freeman.** El resumen dice que la sarcopenia es pérdida de masa magra con la edad y en ausencia de enfermedad, y que se asocia a más morbilidad y mortalidad (✔). El texto completo en Wiley devuelve 403. La parte del sobrepeso **sí** está en la Fuente 2: «animals can have significant muscle loss if they are overweight (body condition score > 5)». «Peso estable» no aparece en ninguna de las dos.

**H4. Sección 3, Fuente 3, y Sección 9: la fuente está asignada a un H2 que no existe.** Se asigna a «Cuándo consultar», pero la Sección 6 no tiene ese H2. Sin embargo, la Sección 1 justifica las 2.600 palabras con «cinco decisiones», y la quinta es «cuándo consultar». La Sección 2 la incluye como paso 4. Hoy esa decisión solo vive en el AlertBox danger, y el enlace al chequeo geriátrico de la Sección 5 no tiene H2 asignado. La AAHA queda con media fuente: el dato del 25 %, sin el principio de revisión periódica.

**H5. Sección 6: el presupuesto no cuadra.** La suma de los targets es 300 + 350 + 450 + 500 + 500 + 400 + 300 = **2.800**, pero el target declarado es **2.600**. Cae dentro del rango del contrato (2.210–2.990), pero la skill exige que la suma coincida con el target. Hay que decidir cuál vale. Lo coherente con H4 es añadir el H2 de consulta y recortar donde sobre, no inflar.

**H6. Sección 8, prompt 3, sujeto B («Dakota ilustrativa»): faltan dos de los cinco rasgos senior.** El prompt pide «white muzzle and eyebrows» y «slightly sunken drooping eyes». Faltan:
- Las canas en los **párpados**.
- El lomo y la musculatura de perro mayor. Solo dice «soft rounded body».

El sujeto A y el video sí cumplen los cinco rasgos. Según la skill, esto obliga a corregir el brief.

### P2

**H7. Sección 3, Fuente 7, y Sección 9: si se conserva PMC7291569, solo sirve para el impacto en el dueño.** Ningún H2 lo usa así, así que lo más limpio es sustituirlo por PMID 33227581 (ver H1) en lugar de añadir una fuente decorativa.

**H8. Fidelidad al expediente:**
- Introducción: «jugando como a los 2 años». El expediente dice «como cuando tenía **1 o 2** años».
- Conclusión: la frase de cierre aparece entre comillas como si fuera una sola cita. «Al cuerpo no lo ha perdonado el tiempo, pero su mente no lo sabe» es del dueño. «Nos toca a nosotros saberlo» es una línea editorial. El brief debe indicar que no se presente como cita del dueño.

El resto de los hechos coincide con el expediente: los pesos de Luna (13 kg → ~15) y de Dakota (23 → ~20), la displasia diagnosticada, el hallazgo en la columna sin nombre, los paseos, las camas desde hace ~2 años, los sillones con sus dos motivos, la reverencia, los resbalones y que Dakota nunca se haya parado en dos patas. No hay datos añadidos de peso.

**H9. Sección 6, AlertBox danger: lista de alarma sin fuente asignada.** Incluye el umbral «deja de comer más de un día», y la Sección 3 declara que no hay fuente sobre el apetito. El brief debe indicar de dónde sale la lista: AAHA o el artículo interno de chequeo geriátrico. Si no, el redactor debe quitar el umbral numérico.

**H10. Sección 8, «Razas recientes»: la lista está incompleta.** La beagle también aparece en poliquezia (`mi-perro-viejo-defeca-mucho-poliquezia.mdx`), en `como-dar-medicacion-perro.mdx` y, según `direccion-visual-editorial.md`, en juegos de olfato y corte de uñas. Que el caso sea real justifica la repetición. Pero el sujeto A («beagle tricolor senior ilustrativa») es casi el mismo que el de picadura de abeja. Conviene diferenciar el escenario o el encuadre para que no se lea como la misma imagen.

**H11. Sección 8, prompt del video:** el criterio de rechazo dice «Reject if the dog looks young». Le falta «at mobile size», que sí está en los prompts 1–3.

**H12. El brief no remite a la guía de voz y tono** (`.agents/skills/references/guia-voz-tono.md`), como exige la skill generadora en «Voz y tono».

**H13. Límites de las fuentes por completar:**
- Fuente 6 (Impellizeri): la autoría principal es de Iams Co. y el estudio usó una dieta con el 60 % de las calorías de mantenimiento. Conviene anotarlo como límite y no como pauta para el lector.
- Fuente 5 (Smith): «displasia de base genética» no aparece en el resumen. El límite debe decir «una sola raza (labrador), dieta restringida desde las 8 semanas». Además, el 15 % y el 67 % son prevalencias **globales de ambos grupos**, no de un grupo.

**H14. Canibalización:** el brief no menciona el artículo pendiente *Dieta para perros senior con sobrepeso* (`INVENTARIO_CONTENIDO.md:264`), que se solapa con la H3 «Kilos de más». Es un solapamiento menor y pendiente, pero hay que declararlo.

## Verificación de fuentes

| # | Fuente | Identificador comprobado | Afirmación del brief | Localización | Resultado |
|---|---|---|---|---|---|
| 1 | Freeman 2012, JVIM 26(1):3-17 | PMID 22111652 ✔ · DOI 10.1111/j.1939-1676.2011.00838.x ✔ | Sarcopenia = pérdida de músculo con la edad sin enfermedad; más morbilidad | Resumen | **Verificada.** «Con peso estable o sobrepeso»: no está en el resumen y el texto completo da 403 (H3) |
| 2 | WSAVA/Tufts MCS (copia OSU) | URL profunda, PDF 200 ✔ | Columna, escápulas, cráneo, ilion; 4 grados; músculo separado de BCS | Párrafo único del gráfico | **Verificada.** Además contradice «se nota primero atrás» (H2) |
| 3 | AAHA 2023 Senior Care, JAAHA 59(1):1-21 | PMID 36584321 ✔ · DOI 10.5326/JAAHA-MS-7343 | Senior = último 25 % de la esperanza de vida | Apartado *Defining the senior patient*, que cita la guía AAHA de etapas de vida canina de 2019 | **Verificación parcial:** aaha.org da 403. Confirmado con PubMed y extracto del buscador. Al citarlo, decir que la definición procede de la guía de 2019 recogida en la de 2023 |
| 4 | Kealy 2002, JAVMA 220(9):1315-20 | PMID 11991408 ✔ · DOI 10.2460/javma.2002.220.1315 | 48 labradores, −25 % de alimento, mediana de vida más larga, enfermedad crónica más tardía | Resumen | **Verificada.** El límite sobre 13,0 frente a 11,2 está bien puesto: esa cifra sale del comunicado de Purina |
| 5 | Smith 2006, JAVMA 229(5):690-3 | **PMID 16948575** (antes «no verificado») ✔ · DOI 10.2460/javma.229.5.690 ✔ | 15 % a 2 años → 67 % a 14; mediana 6 (control) frente a 12 (restringido) | Resumen, *Results* | **Verificada.** Las cifras son exactas. 15/67 son globales (H13) |
| 6 | Impellizeri, Tetrick, Muir 2000, JAVMA 216(7):1089-91 | **PMID 10754668** ✔ · **DOI 10.2460/javma.2000.216.1089** ✔ | 9 perros, sobrepeso del 11–12 %, perdieron del 11 al 18 %, menos cojera | Resumen | **Verificada.** Ensayo sin cegamiento; autor de Iams Co. (H13) |
| 7 | Belshaw, Dean, Asher 2020, BMC Vet Res 16:190 | PMC7291569 = PMID 32527313 · DOI 10.1186/s12917-020-02404-5 | «Los dueños atribuían las primeras señales a la vejez» | *Results › Finding out about the diagnosis* | **No corresponde a la afirmación** (H1). La correcta es PMID 33227581 / PMC7755036 |

### Trazabilidad fuente → H2

| Fuente | H2 asignado | ¿Desarrolla el dato? |
|---|---|---|
| 1 | Lo que cambia por dentro | Sí, pero la H3 «primero atrás» no se apoya en ella (H2) |
| 2 | Cómo leer el cuerpo | Sí |
| 3 | «Cuándo consultar» | **El H2 no existe** (H4). Solo el dato del 25 % en «Por qué no sabe que es viejo» |
| 4, 5, 6 | El peso | Sí |
| 7 | Cómo leer el cuerpo | Sí, pero con la fuente equivocada (H1) |

## Comprobaciones mecánicas

| Control | Resultado |
|---|---|
| `seoTitle` | 54 caracteres (máx. 55) ✔ |
| `metaDescription` | 153 caracteres (máx. 160) ✔ |
| `pilar` | `movilidad-dolor-perros-mayores` existe en el enum de `src/content.config.ts` ✔ |
| `perros: ["luna", "dakota"]` | Campo válido en el schema ✔ |
| Slug, ruta e imágenes | Coherentes, sin ñ ni tildes ✔ |
| Suma de targets | 2.800 frente a 2.600 ✘ (H5) |
| AlertBox | info en la Intro, danger en «Cómo leer», warning en «Adaptar» ✔ |
| FAQ | 6 preguntas en borrador ✔ |
| Historia | Entretejida, sin H2 propio. Hilo principal (Luna) declarado y Dakota como contraste ✔ |
| Prosa final en el brief | No. Son instrucciones, salvo los títulos de AlertBox y las FAQ ✔ |
| Inventario | Figura como `[~] (En Briefing)` ✔ |

### Enlazado interno (Sección 5)

| URL | Comprobación | Resultado |
|---|---|---|
| `/movilidad-dolor-perros-mayores` | Pilar del enum | ✔ |
| `/movilidad-dolor-perros-mayores/prevencion-caidas-perro-mayor` | `.mdx` existe, `status: "Publicado"`, inventario | ✔ |
| `/movilidad-dolor-perros-mayores/cama-ortopedica-perros-mayores-displasia-artrosis` | Ídem | ✔ |
| `/salud-perros-mayores/chequeo-geriatrico-canino` | `.mdx` existe, pilar `salud-perros-mayores`, sin `status` (por defecto «Publicado»), inventario | ✔ La ruta es correcta. Ya no hace falta el «comprobar en el build», pero falta asignarle un H2 (H4) |
| `/herramientas/calculadora-edad-perro` | `src/pages/herramientas/calculadora-edad-perro.astro` existe | ✔ La ruta es correcta. Se puede quitar el «comprobar» |
| `/herramientas/calculadora-calidad-vida-perros` | `src/pages/herramientas/calculadora-calidad-vida-perros.astro` | ✔ |

### Recursos prometidos

| Recurso | Ruta | Gate en el contrato | Resultado |
|---|---|---|---|
| Video infográfico | `/videos/blog/perro-viejo-se-cree-cachorro/reverencia-musculo.mp4` | Sí: reproducir en móvil y en modo oscuro, con transcripción | Planificado y bien condicionado. Corregir el contenido (H2) |
| 3 ilustraciones | `/images/blog/perro-viejo-se-cree-cachorro/` | Sí: edad visible a 390 px | Planificadas. Corregir el prompt 3 (H6) |
| 8 fotos reales | Ídem, en webp | Sí: privacidad de `luna-01` | ✔ Coincide con la tabla de fotos del expediente |

## Efecto cascada

- **Artículo:** todavía no existe ningún `.mdx` de este tema, así que no hay nada heredado.
- **Otros briefs y artículos:** busqué en `briefings/` y `src/content/` las cadenas PMC7291569, Belshaw, Impellizeri, 16948575, 22111652 y wsava-mcs-chart. Solo aparecen en este brief. Las únicas otras coincidencias están en evidencias antiguas de `docs/seo/correccion-editorial-2026-10-16/`, que no son contratos vivos.
- **Si se reutiliza «se pierde primero atrás»** en el futuro brief de *Ejercicios terapéuticos… atrofia muscular*, hereda el mismo problema. Usar el dato de la Fuente 2 (epaxiales).

## Lo que sí funciona

- **Procedencia ejemplar:** los límites del expediente están todos trasladados. Por ejemplo, «nunca "espondilosis"», sin dosis y sin desenlace, y la reflexión del dueño se presenta como observación, no como hecho. No hay datos añadidos de peso ni de diagnóstico.
- **Honestidad con lo no verificado:** el PMID de Smith se marcó como no verificado en lugar de inventarlo; la Fuente 6 se marcó como pendiente; la mediana 13,0/11,2 de Kealy se aisló como dato de informes posteriores; y se avisó de las cifras secundarias contradictorias de Smith. Las cifras de Smith resultaron exactas. No hay que «completar» nada de esto de memoria al corregir.
- **Lagunas declaradas:** no hay evidencia sobre cómo percibe el perro su edad ni sobre el apetito senior, y el brief lo dice. Esa declaración debe conservarse.
- **Privacidad:** la placa de `luna-01` con teléfonos figura como gate de publicación.
- Arco entretejido sin H2 de historia, Dakota limitada a contraste, metadatos dentro de límite y prompts 1 y 2 completos con los cinco rasgos senior y el criterio a tamaño móvil.

## Qué corregir, en orden (para otra sesión)

1. **Fuente 7 (H1).** En la Sección 3 y en la tabla de la Sección 9, sustituye la Fuente 7 por: *Belshaw Z, Dean R, Asher L. Could it be osteoarthritis? How dog owners and veterinary surgeons describe identifying canine osteoarthritis in a general practice setting. Prev Vet Med. 2020;185:105198. PMID 33227581 · DOI 10.1016/j.prevetmed.2020.105198 · https://pmc.ncbi.nlm.nih.gov/articles/PMC7755036/*.
   - Dato clave: «Los dueños con menos experiencia asumían que los cambios sutiles de sus perros mayores eran parte del envejecimiento normal ("I just assumed it was old age…", "I just thought it was normal to slow down…"); pocos los atribuyeron a artrosis y algunos tardaron meses en consultar».
   - Límite: cualitativo, Reino Unido, 40 dueños y 26 veterinarios.
   - Retira PMC7291569, o déjalo solo si un H2 lo usa para el impacto en el dueño.
2. **«Se nota primero atrás» (H2).**
   - Renombra la H3, por ejemplo «Dónde se nota la pérdida de músculo». Indica que, según el gráfico MCS (Fuente 2), la pérdida suele notarse primero en la musculatura a ambos lados de la columna, y que en otras zonas es variable.
   - La «reverencia» de Luna se queda como momento de la historia, sin presentarla como prueba de pérdida en los cuartos traseros.
   - En la secuencia del video (Sección 8, paso 2) y en su prompt, cambia el resaltado a los músculos a ambos lados de la columna. Puede añadirse un resaltado secundario y más tenue en cadera y muslos, pero sin el rótulo «donde se pierde músculo primero».
3. **Fuente 1 (H3).** Cambia el dato clave a lo que dice el resumen: pérdida de masa magra con la edad sin enfermedad, asociada a más morbilidad y mortalidad. Mueve «puede haber pérdida de músculo importante aunque el perro tenga sobrepeso» a la Fuente 2, citando el gráfico MCS. Elimina «con peso estable», salvo que alguien abra el texto completo de Freeman y localice el pasaje.
4. **Fuentes 5 y 6: identificadores y límites (H13).**
   - Fuente 5: añade PMID 16948575 y quita la marca de «no verificado». Cambia el límite a «una sola raza (labrador), restricción desde las 8 semanas; 15 % y 67 % son prevalencias globales de los dos grupos».
   - Fuente 6: quita la marca de «sin verificar» y añade PMID 10754668 y DOI 10.2460/javma.2000.216.1089. Añade al límite «autor principal de Iams Co.; dieta al 60 % de las calorías de mantenimiento, bajo control veterinario; no es una pauta para el lector».
   - Actualiza las filas de la Sección 9.
5. **H2 de consulta (H4) y presupuesto (H5).**
   - Añade a la Sección 6 un H2 práctico de consulta, por ejemplo «Cuándo llevarlo al veterinario», sustentado en la Fuente 3. Debe incluir: revisiones periódicas del senior; evaluación de la condición corporal y muscular; el enlace al chequeo geriátrico; y el AlertBox danger, trasladado ahí desde «Cómo leer el cuerpo» o duplicado en forma breve.
   - Haz que la suma de los targets sea exactamente 2.600, recortando por ejemplo «El peso» y «Lo que cambia por dentro», o justifica un nuevo target y recalcula el rango ±15 % de la Sección 9.
   - Actualiza la fila de la Fuente 3 en la Sección 9.
6. **AlertBox danger (H9).** Indica la fuente de la lista, o quita el umbral «más de un día» y deja «deja de comer o come mucho menos de lo habitual».
7. **Prompt 3, sujeto B (H6).** Añade «white eyelids» y un rasgo de musculatura senior, por ejemplo «softened topline, reduced thigh muscle under the extra weight». Mantén el criterio de rechazo.
8. **Prompt del video (H11).** Cambia el final a «Reject if at mobile size the dog looks young».
9. **Expediente (H8).**
   - Introducción: «como cuando tenía 1 o 2 años».
   - Conclusión: indica que «Al cuerpo no lo ha perdonado el tiempo, pero su mente no lo sabe» es del dueño y que «Nos toca a nosotros saberlo» es una frase editorial, no una cita.
10. **Cosmética (H10, H12, H14).**
    - Completa la lista de razas recientes (poliquezia, medicación, juegos de olfato, corte de uñas) y diferencia el encuadre del hero respecto al de picadura de abeja.
    - Añade la remisión a `guia-voz-tono.md`.
    - Menciona en canibalización el pendiente *Dieta para perros senior con sobrepeso*.
    - Quita los «comprobar la ruta» de la Sección 5: las dos rutas son correctas.
11. Actualiza el historial: «R1: NO APTO, 2026-11-18, `docs/contenido/perro-viejo-se-cree-cachorro/auditoria-brief-r1.md`». La R2 debe auditarla una sesión distinta de la que corrija.

## Referencias consultadas

- https://pubmed.ncbi.nlm.nih.gov/22111652/
- https://vmc.vet.osu.edu/sites/default/files/documents/wsava-mcs-chart-dogs-cats.pdf
- https://pubmed.ncbi.nlm.nih.gov/36584321/ · https://www.aaha.org/resources/2023-aaha-senior-care-guidelines-for-dogs-and-cats/defining-the-senior-patient/ (403, solo extracto)
- https://pubmed.ncbi.nlm.nih.gov/11991408/
- https://pubmed.ncbi.nlm.nih.gov/16948575/
- https://pubmed.ncbi.nlm.nih.gov/10754668/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC7291569/ (PMID 32527313)
- https://pmc.ncbi.nlm.nih.gov/articles/PMC7755036/ (PMID 33227581)
