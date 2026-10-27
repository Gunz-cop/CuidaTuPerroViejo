# BRIEF DE CONTENIDOS: Miedo a la pólvora en perros mayores: cómo cuidarlo el 24 y el 31 de diciembre

**Sitio:** cuidatuperroviejo.com | **Pilar:** Salud Mental y Emocional | **Tipo:** Artículo spoke Astro/MDX | **Serie:** versión latinoamericana de P1-03 (código **LA-01**)

**Estado:** v6.1 del 2026-10-27 (corrige la R5, NO APTO por un P1). v6 del 2026-10-27. Rondas R1 y R2 **NO APTO**; R3 y **R4 APTO con reservas** (R4: 0 P0, 0 P1, 5 P2, 8 P3; `docs/contenido/miedo-polvora-perros-mayores/auditoria-brief-r4.md`), corregidas en esta v6 (`correccion-r4.md`). El propietario autorizó el 2026-10-27 tres rondas más (R4–R6); queda margen para R5 y R6. Decisiones del propietario cerradas: raza del mestizo, testimonio del compañero (anónimo, H2-3), aspecto, edad y vivienda de Osa y Baltor, plan de 7 imágenes con foto real de Luna y Dakota y tarjeta horizontal entre versiones. **Pendiente del propietario:** confirmar qué beagle es Luna y cuál Dakota en la foto. No fusionar ni desplegar sin orden del propietario.

**Seis decisiones de esta versión que el propietario debe conocer:**

1. **Es otro artículo, no una traducción.** El de España (`/salud-mental-emocional-perros/miedo-petardos-perros-mayores`) responde a «petardos en un piso español». Este responde a **«pólvora en el barrio el 24 y el 31, en una casa con patio, con la familia de visita y una ley que cambia por país»**. En la v2 el esqueleto también es distinto: los H2 siguen el recorrido de la casa (barrio → patio → cuarto → perro que no se levanta → consulta → noches → cuartos donde se esconden → portón → ley → enero), no el del artículo de España. Comparación de temas en §2; la tabla de H3 y FAQ frente a España la rellena el auditor del artículo (§9.5).
2. **Keyword «pólvora».** «Petardos» no aparece en H1, slug, seoTitle, meta ni H2.
3. **Testimonios:** Osa y Baltor (reservados para esta versión, decisión del propietario del 2026-10-25). De Luna, el hecho nuevo es que sus sustos incluyen temblores, terremotos y choques; que entonces busca a la familia ya está publicado en España y solo va como media frase de contexto. **Dakota aparece solo en la fotografía y en su pie, sin ningún hecho**: sus hechos ya están publicados en España.
4. **Nuevo H2 a propuesta del propietario (2026-10-26): el perro mayor que ya no puede levantarse.** El propietario señaló que nadie explica qué hacer con un perro inmóvil esas noches. No hay estudios sobre miedo al ruido en perros que no caminan (búsqueda del 2026-10-26): es **guía sin caso**, con criterio editorial declarado. **H2-4 va sin caso** (decisión del 2026-10-26): el propietario no preguntó por ese perro. La perra del compañero que se mete bajo el escritorio va solo en el H2-3 y no se relaciona con el H2-4 (§2).
5. **Enlace entre versiones: decidido por el propietario el 2026-10-27** (§5.2): **tarjeta horizontal con imagen** en los dos artículos (componente reutilizable, PR de código aparte, primer experimento del enlazado con tarjetas que el propietario quiere usar en el sitio), más el enlace en contexto en el H2 legal; `hreflang` se evalúa más adelante.
6. **Imágenes (decisión del propietario, 2026-10-27): siete.** Lo clínico y práctico, y la anécdota del compañero, con el **mestizo criollo canela de máscara negra** (aprobado como excepción a la regla de no repetir categoría). Los testimonios con su perro real: **foto real de Luna y Dakota** (beagles, aportada por el propietario), **ilustración de Osa** (mestiza de pastor alemán) e **ilustración de Baltor** (chow chow café claro). Plan completo en §8.

## 1. DATOS, METADATOS Y FRONTMATTER MDX

| Campo | Valor |
|---|---|
| Título H1 | Miedo a la pólvora en perros mayores: cómo cuidarlo el 24 y el 31 de diciembre |
| Título SEO (seoTitle) | Miedo a la pólvora en perros mayores: plan de diciembre (55 caracteres) |
| Keyword principal | miedo a la pólvora en perros mayores |
| Keywords secundarias | perro con miedo a la pólvora · perro de patio con pólvora · perro mayor que no se puede levantar en Año Nuevo · perro con miedo a los cohetes · perro asustado por la pirotecnia en Navidad |
| Slug | `miedo-polvora-perros-mayores` |
| Meta descripción (máx. 160) | Tu perro mayor sufre con la pólvora del 24 y el 31. Cómo pasarlo del patio a un refugio, qué preguntar al veterinario y qué hacer si se escapa en el barrio. (156 caracteres) |
| Ruta relativa | `/salud-mental-emocional-perros/miedo-polvora-perros-mayores` |
| Pilar / ruta pilar | Salud Mental y Emocional · `/salud-mental-emocional-perros` |
| Intención principal | Urgente-estacional: «se viene diciembre, mi perro mayor sufre con la pólvora; ¿dónde lo pongo, qué le pido a la veterinaria y qué hago esas dos noches?» |
| Intención secundaria | Práctica y local: el perro de patio, el que ya no se levanta, qué dice la ley en mi país, qué hago si se sale por el portón |
| Objetivo global | **5.700 palabras** (suelo 5.300, techo 6.000), preferencia del propietario (2026-10-25) y diez decisiones distintas (§6) |
| Fecha brief | 2026-10-27 (v6) |
| Ventana editorial | Idealmente antes del **20 de noviembre de 2026**, para dejar unas dos semanas para la consulta antes de que empiece la pólvora de diciembre (en Bogotá, el formulario de reportes de 2025 se abrió el 7 de diciembre, S8). Si sale más tarde, «en noviembre» pasa a «cuanto antes» |

Conteos con Python (2026-10-26): seoTitle 55; meta 156.

### Bloque de frontmatter MDX

```yaml
---
title: "Miedo a la pólvora en perros mayores: cómo cuidarlo el 24 y el 31 de diciembre"
seoTitle: "Miedo a la pólvora en perros mayores: plan de diciembre"
metaDescription: "Tu perro mayor sufre con la pólvora del 24 y el 31. Cómo pasarlo del patio a un refugio, qué preguntar al veterinario y qué hacer si se escapa en el barrio."
pilar: "salud-mental-emocional-perros"
keywordPrincipal: "miedo a la pólvora en perros mayores"
heroImage: "/images/blog/miedo-polvora-perros-mayores/mestizo-senior-entra-del-patio-v1.webp"
heroImageAlt: "Ilustración de un perro mestizo senior de color canela que cruza desde el patio la puerta trasera de la casa, hacia un hombre agachado que le ofrece comida en la mano."
heroImageCaption: "Invitarlo a entrar con comida, antes de que empiece la pólvora, es más fácil que sacarlo después de debajo de una cama."
status: "Publicado"
datePublished: "{{FECHA_DE_PUBLICACION_AAAA-MM-DD}}"
---
```

`heroImageCaption` existe en `src/content.config.ts` (opcional). **Gate:** sustituir `datePublished` por la fecha real antes del commit del `.mdx`. Sin `dateModified`.

## 2. PROCEDENCIA, VALOR PROPIO Y CONTROL DE CANIBALIZACIÓN

**Tipo:** **experiencia aportada (a) + guía**, con un H2 de **guía sin caso** (H2-4). Los testimonios son **recuerdos, no casos clínicos**, y nunca prueban que un método funcione. Reserva Luna/Dakota activada por el propietario para este tema (2026-10-25); Dakota solo en la fotografía, sin hechos; Jaspe no se usa.

**Testimonios (único origen: `docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md`), con la incertidumbre del archivo:**
- **Osa** (El Salvador, perra de la familia de un tío del propietario): perros que vivían en el patio («el perro tiene que estar en el patio»); el 24 y el 31 casi no se oía a la gente, solo fiesta y pólvora; buscaban entrar: si se abría la puerta, entraban corriendo, a los cuartos, bajo la cama o al armario, y no se los podía agarrar; para sacarlos había que jalarlos, a veces los regañaban y alguna vez les echaron agua; lloraban. Una noche, **durante una cena (sin fecha)**, alguien abrió la puerta para tirar algo a la basura y Osa se metió bajo la mesa del comedor y no quiso salir: «un miedo terrible». En el patio, al principio ladraban y después se metían bajo la pila (el lavadero) u otro sitio. **No recuerda con seguridad si se escapaban; cree que a veces, al abrir el portón, salían disparados, y que una vez salieron y fueron a esconderse, no a morder.** Nunca se lastimaron. Osa era **muy brava: si salía a la calle podía morder a alguien** (frase del archivo; no dice que mordiera por miedo). **Sin edad ni desenlace: no es «perra mayor».** Impresión del propietario (hipótesis suya): el conjunto de tantos sonidos es lo que los ahuyenta.
- **Baltor** (El Salvador, perro de un vecino del apartamento de arriba): vivía dentro; los días de pólvora **no salía de las habitaciones**; aunque le abrieran la puerta de la casa, no huía, se quedaba dentro; **una vez** se orinó o se defecó (el propietario no recuerda cuál) por el miedo; la chow chow muy enérgica que llegó después solía molestarlo, y aun así los días de pólvora **los dos se escondían**. Duda del propietario: si el piso de arriba se oía más. **No decir que estaba «quieto» ni que se orinara de forma habitual.**
- **Luna** (beagle, 2015, Costa Rica): el hecho nuevo: **sus sustos no son solo la pólvora, también temblores, terremotos y choques**. Que busca a la familia ya está publicado en España («ante un susto cualquiera, Luna nos busca»): solo media frase de contexto. Lo de alzarla y que se calme con él no se repite.
- **No se usan como hechos:** Dakota (todo ya contado en España; aparece solo en la fotografía y su pie, sin hechos), la perra de unos vecinos y la hipótesis «buscan un lugar menos ruidoso» (publicadas en España).

**H2-4 sin caso (decidido el 2026-10-26):** un compañero de trabajo del propietario tiene un perro mayor que ya no puede levantarse, pero el propietario prefirió no preguntarle cómo lo manejan. Ese perro **no aparece en el artículo, ni anónimo**. **Testimonio para H2-3 (uso autorizado por el propietario el 2026-10-27):** el mismo compañero contó por escrito (2026-10-26) que en su casa solo una de sus perras se pone muy nerviosa con la pólvora: la dejan dentro y ella se mete debajo de su escritorio y ahí se queda. Ficha y límites en el archivo de testimonios. Va **anónimo** («la perra de un compañero de trabajo, en Costa Rica»), en una o dos frases en `### Una mesa, una sábana y su frazada`; sin edad, raza ni relación con el H2-4. La consideración de la familia sobre la eutanasia **no se menciona en ningún caso** sin que ellos lo pidan.

**Declaración para el lector (introducción):** una o dos frases: estudios internacionales, reportes de Bogotá y recomendaciones de colegios y universidades veterinarias de la región; además, recuerdos de perros de la familia y de un vecino en El Salvador y de casa, en Costa Rica: recuerdos, no casos clínicos.

**Aportación propia (lo que no hace el artículo de España ni otro del sitio):**
- (a) Del patio a la casa sin jalarlo (S5, S11; Osa).
- (b) **El perro que ya no puede levantarse**: dónde ponerlo, qué cuidados no puede hacer por sí mismo esa noche y cómo leer su miedo si no puede esconderse.
- (c) Reportes ciudadanos de Bogotá (S7, S8) con sus límites.
- (d) Guías de la región: COLVET (Costa Rica) y FMVZ-UNAM (México), contrastadas con la evidencia; «nunca acepromazina» con dos fuentes (S10 y S5).
- (e) Los perros que se meten en los cuartos y no salen (Baltor) y la pérdida de control de esfínteres que cita el COLVET (S10).
- (f) Refugio cerrado pero fresco en el calor de diciembre.
- (g) La ley por país: Chile y Colombia verificados (incluida la Ley 2224 de 2022, que obliga a los municipios a explicar los impactos de la pólvora sobre los animales); cómo averiguarlo en otros.
- (h) Los consejos que circulan en diciembre (CBD, esencias florales, «déjalo afuera»), con lo que dicen las fuentes.

**Hilo narrativo:** sin hilo principal; Osa abre H2-2 y Baltor H2-7. Cierre con límites y decisiones.

### Control de canibalización con el artículo de España (comprobado el 2026-10-26 contra el `.mdx` publicado)

| Tema | España (publicado) | Esta versión |
|---|---|---|
| Palabra clave | petardos, Nochevieja, Fallas, San Juan | pólvora, 24 y 31 de diciembre |
| Orden de los H2 | por qué → señales → calendario y ley → veterinario → refugio → noche → productos → fondo → escape → después | barrio → patio → cueva → perro que no se levanta → consulta → noches con la casa llena → los que se esconden → portón → ley → consejos y enero |
| Escenario | piso, persiana, terraza, ascensor | casa con patio, portón, pila; apartamento con ventanas de celosía; calor |
| Por qué asusta | edad, dolor y oído (H2 propio) | cómo suena diciembre en el barrio y qué reportaron en Bogotá; edad en 2 frases; dolor en la consulta, 2–3 frases |
| Señales | lista de Gähwiler y «la mayoría ni se escondía» | Baltor y esfínteres (S10); Gähwiler solo en H2-4 para el perro que **no puede** esconderse |
| Perro con poca movilidad | H3 «Un refugio accesible para un perro con las articulaciones cansadas» (cama baja, suelo que no resbale) | H2 propio para el perro que **ya no se levanta**: elegir por él, cambios de postura, calor, agua, compañía, calidad de vida |
| Consuelo | H3 de Luna en brazos + Riemer | una frase de remisión a Riemer en H2-6; Luna solo con temblores (H2-7) |
| Ley | BOE | Chile (Ley 21.310) y Colombia (Leyes 670 de 2001 y 2224 de 2022) |
| Productos | tabla de Riemer | lista «lo que oyes → lo que dicen las fuentes»; cifras de Riemer redactadas de nuevo |
| Escape | Ley 7/2023, aviso en 48 h | portón, patios vecinos, grupos del barrio; placa |
| FAQ | 8 preguntas | 8 distintas (§6; tabla de comparación en §9.5) |

**Riesgo residual:** las dos páginas pueden salir en búsquedas genéricas («perro miedo fuegos artificiales»). Mitigación: palabras clave distintas, enlace que dice a cada lector cuál es su versión (§5.2) y, si hace falta, `hreflang`.

**Temas vecinos que no se invaden:** P1-14 (tormentas), P1-29 (ruido urbano), P1-15 (alimentos navideños), el brief de feromonas (`[~]`) y `ansiedad-separacion-perros-senior` (no contradecir su frase sobre feromonas). H2-4 no invade la eutanasia: remite al pilar de cuidados paliativos y a la calculadora sin abrir esa decisión.

### Variante lingüística: español neutro para Latinoamérica

Regla 1 de la [guía de voz y tono](../.agents/skills/references/guia-voz-tono.md). No es serie España.

- **Tratamiento:** tú; plural «ustedes». Nunca vosotros ni voseo.
- **Vocabulario:** pólvora, cohetes, pirotecnia, reventar pólvora, patio, portón, pila o lavadero (glosar una vez), cuarto, casa de una planta, apartamento (glosar «o departamento» una vez), ventanas de celosía (glosar «de paletas de vidrio»), piso **en el sentido de suelo**, veterinaria o clínica veterinaria, croquetas, placa con nombre y teléfono, alzar o cargar en brazos, colchoneta. **Evitar españolismos:** «piso» en el sentido de vivienda, persiana como única opción («cortina o persiana»), coger, vosotros, pienso, chapa.
- **Testimonios:** palabras del propietario («pólvora», «jalar», «la pila»).
- **Formato:** coma decimal; espacio antes de «%» y «°C».
- **Países:** nombrar el país de cada fuente y testimonio la primera vez; nunca «en Latinoamérica» para un dato de Bogotá.

## 3. FUENTES CIENTÍFICAS Y OFICIALES (SOURCE-FIRST)

> [!IMPORTANT]
> S1–S6 se leyeron el 2026-10-25 para el brief de España (§3 de `briefings/briefing-miedo-petardos-perros-mayores.md`) y la R1 de este brief comprobó que se les atribuye lo mismo. S7–S14 se abrieron el **2026-10-26**. Ningún identificador sale de memoria.

**S1. Salonen M y cols. «Prevalence, comorbidity, and breed differences in canine anxiety in 13,700 Finnish pet dogs». *Scientific Reports* 2020;10:2962.** DOI 10.1038/s41598-020-59837-z · PMID 32139728 · https://pmc.ncbi.nlm.nih.gov/articles/PMC7058607/
- *Afirmaciones:* el 32 % mostraba mucho miedo a algún ruido; el miedo a los fuegos artificiales fue el subrasgo más frecuente (26 %); la sensibilidad al ruido aumentó con la edad.
- *H2:* 1. *Límites:* encuesta finlandesa; una sola frase.

**S2. Gähwiler S, Bremhorst A, Tóth K, Riemer S. «Fear expressions of dogs during New Year fireworks: a video analysis». *Scientific Reports* 2020;10:16035.** DOI 10.1038/s41598-020-72841-7 · https://pmc.ncbi.nlm.nih.gov/articles/PMC7525486
- *Afirmaciones:* 36 perros en Suiza grabados en Año Nuevo y otra noche; aumentaron las orejas hacia atrás (medidas en la base), el movimiento y el jadeo.
- *H2:* 4. *Límites:* muestra pequeña, diferencias de grupo. Aquí **solo** para el perro inmóvil: si no puede moverse ni esconderse, quedan orejas y jadeo como lo que más cambió en el estudio. **No** usar «la mayoría ni se escondía ni vocalizaba» (ya publicado en España).

**S3. Lopes Fagundes AL y cols. «Noise Sensitivities in Dogs: An Exploration of Signs in Dogs with and without Musculoskeletal Pain…». *Frontiers in Veterinary Science* 2018;5:17.** DOI 10.3389/fvets.2018.00017 · PMID 29487858
- *Afirmaciones:* serie de 20 perros; con dolor musculoesquelético, el miedo al ruido empezó más tarde (media 6 años y 6 meses frente a 2 años y 8 meses); 8 de 10 con dolor generalizaron el miedo a lugares; los autores piden valorar el dolor si el miedo aparece tarde.
- *H2:* 5 y 10. *Límites:* serie cualitativa; no afirmar causalidad.

**S4. Riemer S. «Effectiveness of treatments for firework fears in dogs». *Journal of Veterinary Behavior* 2020;37:61–70.** DOI 10.1016/j.jveb.2020.04.005 (preprint DOI 10.1101/663294; resumen leído en Europe PMC, **verificación parcial**).
- *Afirmaciones:* 1.225 dueños; dar masticables, juego y comida durante los fuegos fue lo único del manejo asociado con mejoría; la interacción (tocar, hablar) no se asoció; **contracondicionamiento, definido como dar algo agradable justo después de cada ruido: más del 70 % (N = 694)**; **CD de ruidos: 55 % (N = 377)**; feromonas, herbales, aceites esenciales, homeopatía y flores de Bach: 27–35 %, «no superior a lo esperable por efecto placebo».
- *H2:* 4, 6 y 10. *Límites:* percepción de dueños; misma muestra que S6.

**S5. ESVCE. «Position statement on the use of medications to manage acute noise sensitivities in dogs as an alternative to acepromazine» (v2.1, junio de 2026).** https://esvce.org/wp-content/uploads/2026/06/ESVCE-position-statement-on-the-use-of-medications-to-manage-acute-phobic-states-in-dogs-as-an-alternative-to-acepromazine-2.1-ESVCE-def.pdf
- *Afirmaciones:* no usar acepromazina para el miedo al ruido (suprime la respuesta motora sin cambiar la emoción; puede aumentar la sensibilización); zona segura condicionada de antemano de la que el perro pueda entrar y salir; plan de fondo con desensibilización y contracondicionamiento; elección del fármaco individualizada según comorbilidades y medicación.
- *H2:* 2, 3, 4, 5 y 10. *Límites:* sin dosis ni nombres de fármacos (disponibilidad por país no verificada).

**S6. Riemer S. «Not a one-way road — Severity, progression and prevention of firework fears in dogs». *PLOS ONE* 2019;14(9):e0218150.** DOI 10.1371/journal.pone.0218150 · PMID 31490926 · https://pmc.ncbi.nlm.nih.gov/articles/PMC6730926/
- *Afirmaciones:* el 52 % al menos en parte afectado; casi tres cuartas partes recuperadas a la mañana siguiente, 10 % hasta un día, 12 % hasta una semana, más del 3 % semanas o meses; en la Discusión, la prevalencia sube con la edad **en perros sanos hasta los 10 años y baja desde los 11; en perros con problemas de salud, hasta los 8 y baja desde los 9**; la autora lo atribuye, como hipótesis, a la pérdida de oído.
- *H2:* 1 y 10. *Límites:* encuesta internacional cuya lista de países incluye México y España; no presentarla como latinoamericana. Mantener el matiz sanos/con problemas de salud.

**S7. IDPYBA, Alcaldía de Bogotá. «En Bogotá van 1.900 animales atendidos por afectaciones con pólvora» (7 de diciembre de 2024, fecha visible bajo el titular; la R1 dijo lo contrario por error).** https://bogota.gov.co/mi-ciudad/ambiente/en-bogota-van-1900-animales-atendidos-por-afectaciones-con-polvora
- *Afirmaciones:* 1.901 animales presuntamente afectados por pólvora entre noviembre de 2022 y noviembre de 2024 (702 de compañía y 1.199 silvestres), según **reportes ciudadanos en una encuesta que «no constituye una denuncia»**; recomendaciones: refugio, cortinas cerradas, música, juguetes, actividad física antes, puertas, ventanas y balcones cerrados, correa y arnés; también feromonas y esencias florales.
- *H2:* 1 y 10. *Límites:* titular «atendidos» frente a texto «reportes»: usar «reportados» o «presuntamente afectados». No usar la frase de los picos del 24 y 31 de 2024. Bogotá no es Latinoamérica.

**S8. Alcaldía de Bogotá. Reportes de afectación de animales por pólvora del 24 y 25 de diciembre de 2025 (publicado el 25 de diciembre de 2025).** https://bogota.gov.co/en/node/282673
- *Afirmaciones:* 115 reportes ciudadanos el 24 y 25 de diciembre de 2025; perros 74 %; gatos y aves 23 %; miedo y estrés 31 %, huida y desorientación 21 %, contaminación 18 %; formulario abierto desde el 7 de diciembre, 730 respuestas; campaña «La Pólvora Explota Mis Sentidos».
- *H2:* 1, 8 y 9. *Límites:* reportes voluntarios de una ciudad. La base de los porcentajes es ambigua (el subtítulo los liga a los casos de las dos noches; el cuerpo habla de respuestas acumuladas): escribir «según la nota», sin afirmar que sean de los 115.

**S9. Colegio de Médicos Veterinarios de Costa Rica (COLVET), según El Delfino (10 de diciembre de 2024).** https://delfino.cr/2024/12/recomendaciones-para-tranquilizar-a-sus-mascotas-durante-la-pirotecnia-de-navidad-y-fin-de-ano
- *Afirmaciones (atribuidas):* pasear y dejar olfatear antes; refugio tipo cueva dentro de la casa, con cama o transportín y frazadas que sirvan de aislante ante ruidos, luces y destellos; música; placa con nombre y teléfono; consultar según edad, temperamento y enfermedades previas (Dra. Silvia Coto, presidenta). **CBD:** el comunicado del COLVET pide que los productos a base de cáñamo como el CBD **solo se den con indicación veterinaria**; un veterinario citado en la nota (Dr. Daniel Meza Ramírez, énfasis en analgesia y anestesia) lo describe como un recurso y dice que **no es recomendable en pacientes con problemas hepáticos**. La nota añade que en Costa Rica aún no hay suficiente regulación.
- *H2:* 3, 5, 6, 8 y 10. *Límites:* nota de prensa. **Atribuir bien:** «solo con indicación» = COLVET; «recurso» y «no recomendable con problemas de hígado» = Dr. Meza. No dar a entender que el COLVET lo desaconseja ni que el sitio lo recomienda.

**S10. COLVET, según Teletica (17 de diciembre de 2022).** https://www.teletica.com/mascoticas/consejos-para-calmar-a-su-mascota-ante-el-ruido-de-la-polvora_325734
- *Afirmaciones (atribuidas):* los costarricenses celebran diciembre e inicios de enero con juegos pirotécnicos; el pánico puede generar problemas **en el control de esfínteres** o actitudes agresivas; lugar oscuro y seguro tipo cueva; cerrar cortinas, puertas y ventanas; masticables; música; «reconforte y vigile»; **nunca acepromazina**, porque «solo actúa sobre la función motora»; collar con datos de contacto; averiguar los horarios de la pólvora.
- *H2:* 3, 5, 6 y 7. *Límites:* prensa. **No usar** «problemas cardíacos» ni «infartos» de la misma nota (sin fuente primaria).

**S11. FMVZ-UNAM (México), según N+ (14 de diciembre de 2024).** https://www.nmas.com.mx/tendencias/por-que-perros-gatos-se-asustan-con-pirotecnia-consejos-mascotas-cuetes-diciembre-2024/
- *Afirmaciones (atribuidas):* no dejar al animal en áreas abiertas como terrazas o patios; música o televisión; mantener la calma; no fomentar la pirotecnia; algunos perros podrían querer jugar con pirotecnia; consultar al veterinario.
- *H2:* 2, 6, 7 y 10. *Límites:* boletín original no enlazado (verificación parcial). **No usar** «100 veces», «4 veces», el «20 % de perros perdidos» ni la «parálisis» atribuida a la UAS.

**S12. Chile. Ley 21.310 (Diario Oficial núm. 42.871, 3 de febrero de 2021), que modifica la Ley 17.798 sobre Control de Armas.** https://www.diariooficial.interior.gob.cl/publicaciones/2021/02/03/42871/01/1890803.pdf
- *Afirmaciones:* sanciona la tenencia sin autorización, la fabricación y el comercio de los elementos de la letra f) del art. 2 de la Ley 17.798, y un nuevo art. 14 E sanciona a quien «sin la competente autorización, accionare, activare o disparare» esos elementos; deroga el art. 2 de la Ley 19.680.
- *H2:* 9. *Límites:* la ley remite a la letra f) del art. 2 de la Ley 17.798, que no se leyó; que esos elementos sean los fuegos artificiales lo dice el título de la ley. Que existan espectáculos autorizados es una **inferencia del régimen de autorización**, no una cita: redactarlo así («la ley sanciona usarlos *sin autorización*»). Sin penas ni cuantías.

**S13. Colombia. Ley 670 de 2001, texto de la Secretaría del Senado.** http://www.secretariasenado.gov.co/senado/basedoc/ley_0670_2001.html
- *Afirmaciones:* art. 4: los alcaldes **pueden permitir** el uso y la distribución de pirotecnia con las condiciones de seguridad que fijen las autoridades o los bomberos; art. 7: prohíbe la venta a menores de edad y a personas en estado de embriaguez; el art. 15 fue modificado por la Ley 2224 de 2022.
- *H2:* 9. *Límites:* la Ley 670 protege a los niños y no menciona a los animales; los apartes del art. 4 se declararon exequibles (C-790-02, comprobado por la R2); no detallar categorías, que la Ley 2224 redefine en su art. 4.

**S14. Colombia. Ley 2224 de 2022 (30 de junio de 2022), texto de la Secretaría del Senado.** http://www.secretariasenado.gov.co/senado/basedoc/ley_2224_2022.html
- *Leído:* arts. 1 a 11 (2026-10-26).
- *Afirmaciones:* art. 1: regula el uso, la fabricación, la venta y la compra de pólvora en el territorio nacional; art. 2: el Gobierno debía expedir en seis meses una reglamentación técnica y estipular **sanciones pecuniarias de 1 a 200 salarios mínimos** a quien la incumpla; **art. 9: cada municipio o distrito debe implementar pedagogía sobre el uso responsable de la pólvora que explique «los impactos negativos de los artículos pirotécnicos y de fuegos artificiales sobre los seres humanos, sobre los animales y el medio ambiente»**; art. 8: modifica el art. 15 de la Ley 670 (etiqueta con la prohibición de manipular pólvora a menores y personas en estado de embriaguez).
- *H2:* 9. *Límites:* **no se verificó si la reglamentación técnica del art. 2 se expidió** ni sus categorías: no decir qué está permitido en cada caso; remitir al decreto de la alcaldía. La ley no prohíbe la pólvora por los animales: los menciona en la pedagogía obligatoria.

### Cobertura, lagunas y límites

1. **No hay estudios latinoamericanos de prevalencia.** Lo regional son reportes de Bogotá y recomendaciones colegiales y universitarias. Decirlo una vez.
2. **No hay estudios sobre miedo al ruido en perros que no pueden caminar.** Búsquedas del 2026-10-26: buscador web general con «non-ambulatory recumbent dog noise phobia fireworks fear management study» (solo estudios de perros que se mueven) y PubMed con `(fireworks OR noise) AND (fear OR phobia OR sensitivity) AND dog* AND (recumbent OR non-ambulatory OR paraplegi* OR immobile)` (1 resultado, sin relación: toxicidad por meperidina, PMID 20712614) y `(fireworks OR noise phobia) AND dog* AND (geriatric OR senior) AND (mobility OR recumbent)` (0 resultados). H2-4 es criterio editorial apoyado en principios generales (S2, S4, S5) y en lo que el sitio ya publica sobre perros postrados (úlceras por presión, cambios de postura) y sobre el riesgo de aspiración al comer (alimentación sin dientes). Decirlo en el H2.
3. **Leyes:** solo Chile y Colombia. México, Costa Rica, El Salvador, Argentina, Perú y el resto **no se verificaron**.
4. **Fármacos:** disponibilidad por país no verificada; no se nombran fármacos aprobados.
5. **Microchip:** obligatoriedad por país no verificada; placa con teléfono como mínimo (S9, S10).
6. **Calor:** criterio editorial (estaciones), sin cifras.
7. **Techo de lámina:** no afirmar que amplifique el ruido; «escucha dónde se oye menos».
8. **CBD:** su legalidad y regulación varían por país y no se verificaron; la propia S9 dice que en Costa Rica aún no hay suficiente regulación.
9. **Descartadas:** cifras de audición y «20 % de perros perdidos» (S11), «parálisis» de la UAS, «problemas cardíacos» e «infartos» (S10), feromonas y esencias florales de prensa generalista, Ley 19.680 (copia no oficial).

## 4. REQUISITOS TÉCNICOS DE ASTRO Y MDX

- **Importaciones:**
  ```mdx
  import AlertBox from '../../components/AlertBox.astro';
  import FAQ from '../../components/FAQ.astro';
  import TablaApilable from '../../components/article/TablaApilable.astro';
  // Solo si TarjetaRelacionada.astro ya está en main (§5.2):
  import TarjetaRelacionada from '../../components/article/TarjetaRelacionada.astro';
  ```
- Cuerpo sin `#`. Párrafos de 3 líneas como máximo en móvil. H3 cada 150–200 palabras de media.
- **Imágenes:** `<img src="/images/blog/miedo-polvora-perros-mayores/{{NOMBRE}}.webp" alt="{{ALT}}" width="1200" height="675" loading="lazy" decoding="async" />` (la foto de Luna y Dakota, con el tamaño real del recorte), con su pie visible; portada en `heroImage` con `heroImageCaption`. Siete en total, ubicadas en el §8.
- **Una tabla** (H2-9, leyes) en `<TablaApilable label="…" compacta>` con `data-label` en cada `<td>`; tres columnas, celdas de una frase.
- **Tarjeta horizontal (§5.2):** `<TarjetaRelacionada slug="miedo-petardos-perros-mayores" etiqueta="Versión para España" />` tras la introducción, solo si el componente ya está en `main` al redactar; si no, se deja fuera y no se escribe HTML a mano (el enlace en contexto de H2-9 va igual).
- Sin animaciones ni recortes.

## 5. ENLAZADO INTERNO

### 5.1 Enlaces obligatorios (comprobados el 2026-10-26)

| Tipo | Texto ancla sugerido | URL | Dónde |
|---|---|---|---|
| Pilar | salud mental y emocional de tu perro | `/salud-mental-emocional-perros` | Conclusión |
| Versión hermana | guía para quien vive en España | `/salud-mental-emocional-perros/miedo-petardos-perros-mayores` | Tarjeta horizontal tras la introducción (si el componente existe) y H2-9, `### Si vives en España` |
| Spoke | agresividad tardía y dolor | `/salud-mental-emocional-perros/agresividad-tardia-perros-mayores-dolor` | H2-2 (perro bravo o que muerde al manipularlo) |
| Spoke | disfunción cognitiva canina | `/salud-mental-emocional-perros/disfuncion-cognitiva-canina` | H2-5 |
| Spoke | ansiedad por separación en perros senior | `/salud-mental-emocional-perros/ansiedad-separacion-perros-senior` | H2-7 (distinguir del miedo al quedarse solo) |
| Cruzado | úlceras por presión | `/cuidados-paliativos-perros/ulceras-presion-perros` | H2-4 |
| Cruzado | cuidados paliativos para perros mayores | `/cuidados-paliativos-perros` | H2-4 |
| Herramienta | calculadora de calidad de vida | `/herramientas/calculadora-calidad-vida-perros` | H2-4: un perro que ya no se levanta y lo pasa mal con el ruido plantea una pregunta de calidad de vida; se ofrece sin abrir la decisión de eutanasia |
| Cruzado | incontinencia urinaria en perros mayores | `/higiene-hogar-perros-senior/incontinencia-urinaria-perros-mayores` | H2-7 |
| Cruzado | golpe de calor en perros mayores | `/salud-perros-mayores/golpe-de-calor-perros-mayores` | H2-3; el ancla o la frase aclaran que es la guía general de golpe de calor (el título del artículo menciona España) |
| Cruzado | chequeo geriátrico | `/salud-perros-mayores/chequeo-geriatrico-canino` | H2-5 |
| Cruzado | cómo dar medicación a tu perro | `/cuidados-paliativos-perros/como-dar-medicacion-perro` | H2-5, junto al aviso |
| Cruzado | cama ortopédica | `/movilidad-dolor-perros-mayores/cama-ortopedica-perros-mayores-displasia-artrosis` | H2-4 (colchoneta del perro que no se levanta) |
| Cruzado | cómo alimentar a un perro mayor sin dientes | `/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes` | H2-4, a propósito de darle agua y comida sin riesgo de aspiración (el artículo cita el Manual Merck y avisa de no dar comida ni agua a la fuerza) |

No se enlaza `prevencion-caidas-perro-mayor` (lo usa España). **Pendientes sin URL:** feromonas (`[~]`), P1-14, P1-15: no se enlazan ni se anuncian.

`src/data/internal-links.ts`: la sesión de publicación añade `'miedo-polvora-perros-mayores'` con `golpe-de-calor-perros-mayores` y `ulceras-presion-perros`, siguiendo la skill `enlazado-interno-sitio`.

### 5.2 Cómo enlazar las dos versiones (decidido por el propietario el 2026-10-27)

El propietario quiere, más adelante, enlazar el sitio con **tarjetas horizontales de contenido sugerido**, «elegantes, bonitas, nada muy vistoso», a veces con imagen, como las que se ven en otros blogs mientras se lee. Estos dos artículos son el primer experimento.

**Decisión: tarjeta horizontal con imagen en los dos artículos + enlace en contexto.**

- **En los dos, no solo en uno.** El enlace recíproco ayuda a cada lector a llegar a su versión y le indica a Google que son dos páginas distintas y relacionadas, cada una para su público. Un enlace en un solo sentido deja al lector de España sin salida hacia esta versión. No es un intercambio artificial de enlaces: son las dos versiones de una misma guía.
- **Dónde:** al final de la introducción, **después del `AlertBox` `info`** y antes del primer H2 (igual que en España), una vez por artículo. En H2-9 va además la frase en contexto («Si vives en España…»), que funciona aunque la tarjeta no exista.
- **Diseño (boceto para el PR de código):**

```
┌─────────────────────────────────────────────────────────────┐
│ ┌──────────┐  VERSIÓN PARA ESPAÑA                            │
│ │  imagen  │  Miedo a los petardos en perros mayores: cómo   │
│ │  16:9    │  protegerlo en Nochevieja, Fallas y San Juan    │
│ │ (portada)│  Tu perro mayor tiembla con los petardos…   →   │
│ └──────────┘                                                │
└─────────────────────────────────────────────────────────────┘
```

  - Componente nuevo y reutilizable: `src/components/article/TarjetaRelacionada.astro`, con props `slug` y `etiqueta` (p. ej., «Versión para España», «Versión para Latinoamérica», «También te puede servir»). **Lee el título, la `metaDescription` y el `heroImage` de la colección** (la miniatura es decorativa, con `alt=""`): nada se copia a mano y la tarjeta se actualiza sola si cambia el artículo.
  - Miniatura a la izquierda, con `loading="lazy"` y esquinas redondeadas: en móvil, 96 px en proporción 4:3, con el título en hasta 3 líneas y la descripción en 1; desde 640 px, 160 px en 16:9, con título y descripción en hasta 2 líneas. A la derecha, la etiqueta en versalitas pequeñas, el título y la descripción, con una flecha discreta (`aria-hidden`). Toda la tarjeta es un único enlace; su nombre accesible es el texto visible (etiqueta, título y descripción), y la miniatura es decorativa (`alt=""`).
  - Estilo sobrio: borde fino y fondo de tarjeta con los tokens del sitio (`brand-card`, `brand-border`), sombra leve al pasar el ratón, sin colores llamativos, **sin banderas**. Modo oscuro con los mismos tokens. En móvil no se apila: miniatura pequeña y texto al lado, sin desbordar a 390 px.
  - No sustituye a `SiloNavigation` (tarjetas sin imagen al final del artículo): es una sugerencia **dentro** del texto.
- **Implementado (2026-10-27)** en la rama `claude/tarjeta-relacionada` (sin PR ni fusión todavía): `TarjetaRelacionada.astro` lee la entrada con `getCollection` filtrando `id === slug` y `status === 'Publicado'`, construye el `href` con `/${data.pilar}/${id}` (como `SiloNavigation.astro`) y usa la miniatura de 400 px si existe. En móvil la miniatura es 4:3 de 96 px y el título admite 3 líneas; en escritorio, 16:9 de 160 px. Comprobado: build, 107 pruebas y `astro check` sin errores; capturas a 390 px en claro y oscuro y a 1280 px.
- **Orden de publicación y por qué no hay enlace roto:** si el destino no existe o no está publicado, **la tarjeta no renderiza nada** (ni enlace ni hueco), y el build emite un aviso en consola con el slug para que un error tipográfico no pase inadvertido. Por eso la tarjeta de España hacia LA-01 puede entrar ya con el componente: hoy no se ve y aparece sola cuando LA-01 se publique. Si el propietario prefiere no tener código «dormido», la alternativa es quitarla de ese PR y añadirla en el mismo PR que publique LA-01. La tarjeta de LA-01 hacia España se añade al redactar LA-01.
- **`hreflang` (más adelante):** evaluar con Search Console unas semanas después de publicar; si las dos páginas se alternan en la misma búsqueda, añadir `hreflang` es-ES / es-419 recíproco.

## 6. ESTRUCTURA DETALLADA Y PRESUPUESTO DE PALABRAS

> **Target total: 5.700 (suelo 5.300; techo 6.000).** Cuentan títulos de H2 y H3, avisos con título, la tabla y el FAQ con preguntas. ±10 % por sección; el suelo global manda. Si no se llega sin relleno, **parar y consultar**; si se pasa, **recortar**.

Suma: 320 + 510 + 560 + 450 + 520 + 520 + 480 + 460 + 360 + 420 + 560 + 540 = **5.700**.

**Matriz fuente → H2 (única; idéntica en §3 y §9.2):** S1: H2-1 · S2: H2-4 · S3: H2-5, H2-10 · S4: H2-4, H2-6, H2-10 · S5: H2-2, H2-3, H2-4, H2-5, H2-10 · S6: H2-1, H2-10 · S7: H2-1, H2-10 · S8: H2-1, H2-8, H2-9 · S9: H2-3, H2-5, H2-6, H2-8, H2-10 · S10: H2-3, H2-5, H2-6, H2-7 · S11: H2-2, H2-6, H2-7, H2-10 · S12: H2-9 · S13: H2-9 · S14: H2-9.

**Reparto de testimonios (cada hecho en un solo H2):** Osa → H2-2 · perra del compañero (bajo el escritorio) → H2-3 · Baltor → H2-7 · Luna (temblores, terremotos y choques; busca a la familia) → H2-7. Aspecto, solo si ayuda a la escena: Osa, mestiza de pastor alemán; Baltor, chow chow café claro (datos del propietario, 2026-10-27). Primera persona para lo que vio el propietario; «nosotros» para su familia; nunca «el propietario» en tercera persona. País la primera vez.

---

### INTRODUCCIÓN — Target: ~320 (párrafos ≈270 + `AlertBox` ≈50)

* **Párrafo 1 — Respuesta (≈100):** en muchos barrios, diciembre trae dos noches de pólvora, el 24 y el 31, y días de ruido alrededor. Para un perro mayor, lo que más lo protege se decide antes: dónde va a estar (dentro, no en el patio), qué revisa la veterinaria en noviembre, cómo es su cueva, cómo se organiza la casa esas noches con visitas y cómo se le encuentra si sale por el portón. Una frase con esas cinco decisiones. Mencionar que hay un apartado para el perro que ya no puede levantarse.
* **Párrafo 2 — Material (≈90):** estudios internacionales (no hay estudios latinoamericanos de prevalencia), reportes de Bogotá, el Colegio de Médicos Veterinarios de Costa Rica y la UNAM; y lo que vi en El Salvador con perros de la familia y de un vecino, y en casa, en Costa Rica: recuerdos, no casos clínicos.
* **Párrafo 3 — Por qué ahora (≈50):** la consulta y la cueva necesitan semanas; en diciembre las clínicas cambian horarios (criterio editorial: «pregunta por las guardias de tu veterinaria»).
* **Párrafo 4 — Promesa (≈30):** una frase.

* **`AlertBox` (`info`):**
    ```mdx
    <AlertBox type="info" title="No son mañas ni falta de carácter">
      Un perro que tiembla, aúlla o se mete bajo la cama con la pólvora tiene miedo de verdad. No se le quita regañándolo ni dejándolo afuera para que «se acostumbre». Se prepara, y esta guía te dice cómo.
    </AlertBox>
    ```
* **Tarjeta horizontal hacia la versión de España (§5.2)**, después del `AlertBox` y antes del primer H2; no cuenta para el total.

---

### H2-1 — Diciembre en el barrio: qué esperar de esas noches — Target: ~510
* *Sustentado en:* S1, S6, S7, S8.
* *Decisión:* **¿qué tan fuerte va a ser y por qué a un perro mayor le pesa?**

* `### Pólvora de vecinos, no de espectáculo` (≈170)
    * Criterio editorial descriptivo: la pólvora de barrio se revienta en la calle, en el patio de al lado o en la azotea, a horas que nadie anuncia, y a menudo empieza días antes. No suena igual en todos los países ni en todos los barrios: el lector mide el suyo (¿cuántos días hubo ruido el diciembre pasado?). Sin testimonio de Dakota.
* `### Lo que reportó la gente en Bogotá` (≈190)
    * S8: el 24 y 25 de diciembre de 2025, 115 reportes ciudadanos de animales afectados; según la nota, 74 % eran perros y lo más reportado fue miedo y estrés (31 %) y huida y desorientación (21 %), sin afirmar que los porcentajes sean de esos 115. S7: 1.901 animales presuntamente afectados entre noviembre de 2022 y noviembre de 2024 (702 de compañía). Límite en la misma frase: reportes voluntarios de una ciudad, no un estudio. Lectura: además del miedo, lo que más preocupa es la huida → H2-2 y H2-8.
* `### La edad, en dos datos` (≈140)
    * S1 (una frase): el miedo a los fuegos artificiales fue el miedo a un ruido más frecuente en 13.700 perros finlandeses y la sensibilidad al ruido aumentó con la edad. S6 (una frase, con su matiz): en perros sanos aumenta hasta los 10 años y baja desde los 11; con problemas de salud, hasta los 8 y baja desde los 9; la autora sospecha la pérdida de oído. Datos de otros países. El dolor va a H2-5.

---

### H2-2 — Del patio a la casa: el cambio que más lo protege — Target: ~560
* *Sustentado en:* S11, S5. Testimonio: Osa.
* *Decisión:* **¿lo dejo en el patio o lo entro, y cómo?**

* `### Lo que recuerdo de Osa` (≈240)
    * Relato en primera persona con los hechos del §2 y **su incertidumbre**: perros de patio; el 24 y el 31 solo se oía pólvora; buscaban entrar, a los cuartos, bajo la cama, al armario; una noche, durante una cena (**sin fechar la cena**), Osa se metió bajo la mesa del comedor y no quiso salir; los jalaban, regañaban y alguna vez los mojaron; lloraban; en el patio, al principio ladraban y después se metían bajo la pila (el lavadero de cemento); no recuerdo con seguridad si se escapaban: creo que a veces, al abrir el portón, salían disparados, y que una vez salieron y fueron a esconderse; nunca se lastimaron. Hipótesis mía, atribuida: tantos sonidos juntos es lo que los ahuyenta.
    * Narrar sin juzgar; no presentarlo como pauta. Osa sin edad: no decir «mayor».
* `### Lo que recomiendan en México` (≈130)
    * S11 (FMVZ-UNAM, según N+): no dejar al animal en áreas abiertas como terrazas o patios. Lectura: lo que Osa buscaba, entrar, es lo que se recomienda.
* `### Cómo hacerlo entrar sin jalarlo` (≈140)
    * S5: zona segura condicionada antes y de la que pueda entrar y salir. Pasos (criterio editorial): días antes, dejarlo entrar a ratos al cuarto elegido con comida o su cama; el día, invitarlo a entrar **antes** del ruido, con comida y sin arrastrarlo (portada); cerrar portón y puerta del patio. Si se metió solo bajo una cama o una mesa, ese es su refugio esa noche: se le deja.
* `### Si es bravo` (≈50)
    * Osa era muy brava: si salía a la calle podía morder a alguien (el archivo no dice que mordiera por miedo). Un perro en pánico puede morder a quien lo saca: entrarlo antes del ruido, no meter la mano bajo la mesa. Si muerde al manipularlo, hablarlo con la veterinaria (dolor): enlace a `agresividad-tardia-perros-mayores-dolor`.

---

### H2-3 — La cueva: un cuarto cerrado, pero fresco — Target: ~450
* *Sustentado en:* S5, S9, S10.
* *Decisión:* **¿en qué cuarto y con qué la armo?**

* `### El cuarto sin ventana a la calle` (≈160)
    * S10: lugar oscuro tipo cueva; cortinas, puertas y ventanas cerradas. El cuarto más interior, sin ventana a la calle; si hay uno con techo de concreto o cielorraso, probar si se oye menos («escucha dónde se oye menos»; laguna 7). Ventanas de celosía: cerrarlas y correr una cortina gruesa.
* `### Una mesa, una sábana y su frazada` (≈150)
    * S9: el COLVET describe la cueva incluso debajo de una mesa, con cama o transportín y frazadas que aíslen de ruidos, luces y destellos; S5: que la conozca de antes y que pueda entrar y salir. Idea propia: una mesa con una sábana solo por un lado y por detrás, y dos salidas abiertas. Su frazada y su traste de agua; la salida, siempre libre. Testimonio en una o dos frases: la perra de un compañero de trabajo, en Costa Rica, es la única de su casa que se pone muy nerviosa; la dejan dentro y se mete debajo de su escritorio y ahí se queda (anónimo; sin edad; la idea de la cueva bajo un mueble la busca el propio perro). **No reproducir** la enumeración del artículo de España (cama, agua, juguete relleno, sin cajas cerradas ni atarlo).
* `### Cerrado no es caliente` (≈140)
    * En el Cono Sur diciembre es verano y en buena parte del trópico hace calor; un cuarto cerrado se calienta. Ventilador de techo, o de pie fuera de su alcance y sin cables por el suelo; agua fresca; si jadea, revisar si es calor. En zonas altas (Bogotá, Ciudad de México, Quito, tierras altas de Centroamérica) las noches de diciembre son frescas: una frazada más. Enlace a golpe de calor aclarando que es la guía general. Criterio editorial.
* *(La cama baja para articulaciones se trata en H2-4; aquí no se repite.)*

---

### H2-4 — Si tu perro ya no puede levantarse — Target: ~520 (guía sin caso)
* *Sustentado en:* S2, S4, S5. **Laguna 2 declarada en el texto:** no hay estudios sobre miedo al ruido en perros que no caminan; lo que sigue es criterio editorial basado en principios generales.
* *Origen:* propuesta del propietario (2026-10-26). **Sin caso** (decisión del 2026-10-26); la perra del compañero va solo en el H2-3 y no se relaciona con este H2.
* *Decisión:* **¿dónde lo pongo y qué tengo que hacer por él esa noche?**

* `### Tú eliges el sitio por él` (≈150)
    * S5 pide una zona segura de la que el perro pueda entrar y salir; un perro que no se levanta no puede elegir ni alejarse: la familia decide por él y **antes** del ruido, porque moverlo en pleno estruendo puede asustarlo más (criterio editorial). Criterio para elegir: el lugar donde suele estar tranquilo, lejos de ventanas a la calle, sin calor acumulado.
    * **Cómo moverlo (pauta clínica general, no evidencia sobre ruido):** como lo haya enseñado la veterinaria; si no lo ha hecho, pedir una demostración en la consulta de noviembre. Entre dos personas o sobre una manta firme usada como camilla, sin arrastrarlo; con cuidado si se queja o intenta morder (un perro con dolor o asustado puede hacerlo). Remitir al apartado de cambios de postura de `ulceras-presion-perros`, que ya da esta pauta. Trasladarlo de sitio una sola vez, de día; los cambios de postura en su sitio siguen la pauta de la veterinaria, también durante la noche.
* `### ¿Con la familia o en un cuarto aparte?` (≈130)
    * No hay una respuesta única (decirlo). Si se calma con su gente, que esté con la familia, en un rincón sin paso de visitas; si el ruido de la cena lo altera, un cuarto tranquilo con alguien que entre a verlo a menudo. Observar cómo reaccionó en otras reuniones. Nunca solo toda la noche.
* `### Lo que no puede hacer por sí mismo` (≈140)
    * Pautas clínicas generales, declaradas como tales (no hay evidencia sobre miedo al ruido en perros postrados): cambiar de postura según lo que ya indicó la veterinaria (enlace a `ulceras-presion-perros`); alejarse del calor (ventilador, sin taparlo de más; en zonas altas, una frazada si refresca); orinar (empapadores; colchoneta firme: enlace a `cama-ortopedica-perros-mayores-displasia-artrosis`).
    * **Agua y comida, solo de forma segura:** con el perro **incorporado de pecho, nunca tumbado de lado**, en poca cantidad, con alguien a su lado y según lo que ya haya indicado la veterinaria; si tose o le cuesta tragar, parar y consultar. Nunca a la fuerza. Enlace a `alimentacion-perros-mayores-sin-dientes` (riesgo de aspiración). **Sin masticables nuevos:** S4 (comida durante los fuegos) es una encuesta de perros que se mueven; en este perro, como mucho, lo que ya come habitualmente en esa postura y siempre vigilado.
* `### Cómo saber si tiene miedo si no puede esconderse` (≈100)
    * S2: en Año Nuevo lo que más cambió fueron las orejas hacia atrás y el jadeo (también el movimiento, que en él no cuenta). Mirar eso, el llanto y si deja de comer; jadear también puede ser calor o dolor → la veterinaria (remisión al aviso de H2-7).
    * Cierre con tacto: si cada diciembre lo pasa peor y ya no se levanta, es momento de hablar de su calidad de vida con la veterinaria; enlace a la calculadora de calidad de vida y al pilar de cuidados paliativos. **Sin abrir la decisión de eutanasia ni mencionar el caso del compañero.**

---

### H2-5 — En noviembre, antes de que lleguen las fiestas — Target: ~520 (con `AlertBox` warning ≈60)
* *Sustentado en:* S3, S5, S9, S10.
* *Decisión:* **¿qué le pido a la veterinaria y qué no le doy por mi cuenta?** Sin dosis, marcas ni nombres de fármacos aprobados.

* `### La lista para la consulta` (≈140)
    * Qué hizo el diciembre pasado (se metió bajo la cama, aulló, se orinó, salió por el portón); desde cuándo; si le pasa con otros ruidos o con temblores; qué come y qué medicamentos toma. S9: el COLVET pide consultar según edad, temperamento y enfermedades previas.
* `### Si este diciembre es el primero que lo pasa mal` (≈120)
    * Enfoque de la consulta de noviembre: si los diciembres anteriores los pasaba bien y este año (o el pasado) empezó a sufrir, decirlo así en la consulta. S3 en una o dos frases propias: en una serie de 20 perros, los que tenían dolor de músculos o articulaciones empezaron con el miedo años más tarde, y los autores piden revisar el dolor. Pedir que lo exploren dentro del chequeo (enlace a `chequeo-geriatrico-canino`). `disfuncion-cognitiva-canina` solo en una frase aparte y si suma (por ejemplo, si también se desorienta en casa); no encadenar fuente → dolor → cognitiva como en España.
* `### Acepromazina y CBD: lo que dicen los colegios` (≈150)
    * S5: plan inmediato y de fondo; en algunos países hay medicamentos aprobados para el miedo al ruido y tu veterinaria sabe cuáles hay donde vives. **Acepromazina:** S10, «nunca», porque solo actúa sobre la función motora y el perro sigue oyendo y sintiendo miedo; S5 dice lo mismo. **CBD:** S9: en un comunicado del COLVET, que pide darlo solo con indicación veterinaria, un veterinario especialista en analgesia lo describe como un recurso y advierte que no es recomendable en perros con problemas de hígado.
* `### Pregunta quién atiende el 24 y el 31` (≈50)
    * Anotar la clínica de guardia de esas noches (criterio editorial). Enlace a `como-dar-medicacion-perro` si le recetan algo.
* **`AlertBox` (`warning`):**
    ```mdx
    <AlertBox type="warning" title="Ni pastillas de la casa ni «algo para que duerma»">
      Nada del botiquín de la familia, ni sobras de tratamientos viejos, ni gotas compradas sin receta. La acepromazina lo deja quieto pero sigue asustado. En un perro mayor, la veterinaria revisa su corazón, riñón e hígado y lo que ya toma antes de elegir nada.
    </AlertBox>
    ```

---

### H2-6 — Nochebuena y Año Nuevo con la casa llena — Target: ~480
* *Sustentado en:* S4, S9, S10, S11.
* *Decisión:* **¿cómo organizo esas dos noches con visitas, cena y niños?**

* `### Antes de que lleguen los invitados` (≈160)
    * Abrir con lo propio: entrarlo del patio antes de que llegue la primera visita (remisión a H2-2) y acordar quién abre y cierra el portón. S10: averiguar con los vecinos a qué horas suele empezar la pólvora en la cuadra. S9: el COLVET recomienda llevarlo a pasear o hacer actividad física y dejarlo olfatear antes de las horas fuertes (la duración del paseo, criterio editorial según su movilidad). **Sin «comer antes»** (no está en S9) y sin la secuencia paseo → cena → puertas del artículo de España; la placa, remisión a H2-8.
* `### Seis acuerdos para la familia` (≈190)
    * Acuerdos **de la familia y las visitas**, no pasos de manejo del perro: (1) quién abre la puerta y el portón y los cierra detrás; (2) los invitados saben que el perro no sale y no lo llaman al patio; (3) nadie revienta pólvora en el patio ni frente a la casa, tampoco los niños (S11: no fomentarla); (4) un turno de quién pasa a verlo, con calma (S10: «reconforte y vigile»; S11: mantener la calma); (5) los niños no entran a su cueva ni lo sacan a ver los cohetes; (6) en su cuarto, música o televisión y, si lo acepta, algo de comer (S10, S11; S4: dar comida durante los fuegos fue lo único del manejo asociado a mejoría según los dueños), en un solo punto breve. Remisión de una frase: tocarlo o hablarle no se asoció con mejoría en la encuesta (S4); si busca a su gente, acompañarlo.
* `### A la mañana siguiente, los restos` (≈130)
    * S11: algunos perros podrían querer jugar con la pirotecnia. Recorrer el patio y la acera antes de sacarlo y recoger restos (criterio editorial); si mordió o tragó restos, al aviso de H2-7.

---

### H2-7 — Los que se esconden en los cuartos y los que buscan a su gente — Target: ~460 (con `AlertBox` danger ≈60)
* *Sustentado en:* S10, S11. Testimonios: Baltor, Luna.
* *Decisión:* **¿qué estoy viendo y cuándo es urgencia?**

* `### Baltor, que no salía de las habitaciones` (≈150)
    * Hechos del §2, sin «quieto» ni patrón: no salía de las habitaciones; aunque le abrieran la puerta de la casa, no huía; una vez se orinó o se defecó (no recuerdo cuál); la chow chow enérgica que llegó después también se escondía esos días. La duda del piso de arriba, como mía. Contraste en una frase con Osa: una buscaba entrar y el otro no quería salir; los dos buscaban un sitio cerrado dentro de la casa.
* `### Cuando se orina o se hace del miedo` (≈110)
    * S10: el COLVET cita problemas en el control de esfínteres y actitudes agresivas entre los efectos del pánico. No regañar; limpiar después. Si los escapes siguen días después o ya los tenía: enlace a `incontinencia-urinaria-perros-mayores`. Si solo pasa cuando se queda solo, es otra cosa: `ansiedad-separacion-perros-senior` (una frase).
* `### Luna y los temblores` (≈80)
    * En casa, en Costa Rica, Luna suele estar tranquila, pero sus sustos no son solo de pólvora: también los temblores, los terremotos y los choques. La lectura se apoya en eso: el miedo de un perro mayor no viene solo de diciembre, y cada susto merece la misma calma. «Busca a la familia», como mucho media frase (ya publicada en España). Sin repetir alzarla ni que se calme.
* `### Cuándo ir a urgencias` (≈60) + **`AlertBox` (`danger`)**:
    ```mdx
    <AlertBox type="danger" title="Busca una veterinaria de urgencia si...">
      Respira con dificultad o sigue jadeando mucho cuando ya paró la pólvora, sus encías se ven blancas o moradas, se desploma o no reconoce dónde está, volvió herido de la calle, o mordisqueó o se tragó restos de cohetes. Ten anotada la veterinaria de guardia del 24 y el 31.
    </AlertBox>
    ```
    *(«Restos de pólvora» se apoya en S11; criterio editorial para la urgencia.)*

---

### H2-8 — Si se sale por el portón — Target: ~360
* *Sustentado en:* S8, S9.
* *Decisión:* **¿qué preparo y dónde lo busco?**

* `### La placa, puesta desde la tarde` (≈120)
    * S9: placa con nombre y teléfono; un número que conteste esas noches; microchip recomendable, sin afirmar obligación (laguna 5); una foto reciente en el teléfono. **Imagen 7 aquí.**
* `### La ruta del portón al lote baldío` (≈170)
    * S8: la huida y la desorientación fueron el segundo efecto más reportado en Bogotá. Partir de lo propio del barrio (criterio editorial): por dónde salió (el portón, la reja), los escondites que un perro de patio conoce (debajo de pilas y escaleras, lotes baldíos, zanjas, la parte trasera de las casas vecinas); mensaje con foto en el grupo de WhatsApp de la cuadra; llamada a las veterinarias del barrio. Si lo ves, agáchate, háblale bajito y deja que venga él. **No reproducir** la secuencia del artículo de España (coches, patios de vecinos, premio y manta, no perseguir).
* `### Cuando baja la pólvora` (≈70)
    * Muchos perros escondidos salen cuando el ruido para: volver a pasar por la ruta a esa hora y al amanecer del 25 o del 1 (criterio editorial).

---

### H2-9 — Qué dice la ley en tu país — Target: ~420
* *Sustentado en:* S8, S12, S13, S14.
* *Decisión:* **¿se puede reventar pólvora junto a mi casa y a quién pregunto?**

* `### Chile y Colombia, en una tabla` (≈220; **tabla**: país / qué dicen las normas leídas / qué significa para ti)
    * Chile (S12): la Ley 21.310 de 2021 sanciona tener, fabricar, vender y usar fuegos artificiales **sin autorización** → el uso particular sin autorización está sancionado; dónde denunciar, «a la policía o la autoridad local» (sin nombrar cuerpos).
    * Colombia (S13, S14): la Ley 670 de 2001 deja a cada alcaldía permitir la pólvora con condiciones y prohíbe venderla a menores; la Ley 2224 de 2022 regula su uso y venta en todo el país, prevé multas en su reglamentación y obliga a cada municipio a hacer pedagogía que explique sus impactos sobre las personas, **los animales** y el ambiente → busca el decreto de tu alcaldía; en Bogotá hay un formulario para reportar animales afectados (S8).
    * «Otros países»: no verificado; municipalidad, alcaldía o bomberos.
* `### Dónde buscar el decreto de tu alcaldía o municipalidad` (≈150)
    * Web de la municipalidad o alcaldía con «pólvora» o «pirotecnia» y el año; bomberos; canales de reporte de animales si existen. No afirmar que ninguna ley no verificada proteja a los perros; de las leídas, solo la Ley 2224 menciona a los animales, y lo hace en la pedagogía obligatoria, no como prohibición.
* `### Si vives en España` (≈40)
    * Enlace en contexto (§5.2 B), sin repetir su contenido.

---

### H2-10 — Lo que te van a recomendar y lo que empieza en enero — Target: ~560
* *Sustentado en:* S3, S4, S5, S6, S7, S9, S11.
* *Decisión:* **¿qué consejos valen la pena, cómo sé si se recuperó y qué empiezo para el próximo diciembre?** Formato de la primera parte: **lista «lo que oyes → lo que dicen las fuentes»**, no tabla.

* `### Lo que oyes en diciembre` (≈280)
    * «Déjalo afuera para que se acostumbre» → S11 pide no dejarlo en patios; S5, zona segura dentro.
    * «Dale algo para que duerma» → remisión a H2-5 (acepromazina).
    * «CBD» → S9: solo con indicación veterinaria (COLVET); el veterinario citado lo ve como recurso pero no recomendable con problemas de hígado. La regulación del CBD varía por país (laguna 8).
    * «Feromonas y esencias florales» (el IDPYBA las menciona, S7) → S4: entre el 27 % y el 35 % de los dueños las vio eficaces, compatible con placebo según la autora; encuesta, no ensayo; pueden acompañar, no sustituyen la cueva ni la veterinaria. **Sin veredicto sobre ensayos de feromonas** (no contradecir `ansiedad-separacion-perros-senior`).
    * «Ponle grabaciones de cohetes» → S4: los CD de ruidos, 55 % según los dueños (N = 377); se hacen con volumen bajo y guiados (fondo, abajo).
    * «Dale algo rico cada vez que suene» → S4: ese contracondicionamiento durante el ruido, más del 70 % (N = 694).
* `### Si el 2 de enero sigue escondido` (≈60)
    * Remisión breve, sin lista: S6 (una frase): la mayoría de los perros de la encuesta se recuperó a la mañana siguiente y una minoría tardó días o más; S3 (una frase): si empieza a evitar el patio o el cuarto donde oyó la pólvora, a la veterinaria. **No repetir** las cuatro cifras ni la lista de signos del artículo de España.
* `### El perro que no se levanta, después de una noche larga` (≈90)
    * Criterio clínico general, propio de esta versión: revisar la piel de los apoyos tras una noche en la misma postura (enlace a úlceras ya dado en H2-4, sin repetirlo), que haya bebido (incorporado de pecho), y anotar cómo reaccionó para la próxima consulta.
* `### Enero tiene once meses por delante` (≈130)
    * Partir del calendario del lector: el ruido no vuelve solo en diciembre (las fiestas de tu barrio o tu pueblo durante el año; sin nombrar fechas no verificadas). S5, en **una** frase: el plan de fondo es desensibilización y contracondicionamiento, guiado por una veterinaria con formación en comportamiento; sin volúmenes, calendarios ni la descripción paso a paso del artículo de España. Propio: anotar en enero, con la memoria fresca, qué pasó cada noche (dónde se metió, a qué hora empezó, si comió) y llevar esa nota a la consulta de noviembre.

---

### CONCLUSIÓN Y PREGUNTAS FRECUENTES — Target: ~540 (título ≈4 + cierre ≈80 + FAQ ≈456, preguntas incluidas)
* *Cierre (≈80):* qué depende de ti (dentro de casa, consulta a tiempo, cueva fresca, placa, portón cerrado) y qué no (la pólvora de los vecinos). Sin promesas. Enlace al pilar.
* **`FAQ` (8 preguntas, ninguna equivalente a las de España; respuestas de 40–55 palabras):**
    ```mdx
    <FAQ items={[
      { question: '¿Puedo dejar a mi perro mayor en el patio el 24 y el 31?', answer: 'Mejor no. La UNAM recomienda no dejar a los animales en patios ni terrazas durante la pirotecnia, y en los reportes de Bogotá la huida es uno de los efectos más frecuentes. Entra a tu perro antes de que empiece la pólvora, a un cuarto que ya conozca.' },
      { question: '¿Qué hago si se mete debajo de la cama y no quiere salir?', answer: 'Déjalo ahí. Si encontró un sitio dentro de la casa, ese es su refugio esa noche. No lo jales, no lo regañes y no metas la mano si está muy asustado: puede morder. Cierra las puertas que dan a la calle y quédate cerca con calma.' },
      { question: 'Mi perro ya no se levanta: ¿dónde lo pongo esas noches?', answer: 'Elige el sitio de día y trasládalo como te enseñó la veterinaria, sin arrastrarlo. Si se calma con la familia, a su lado; si el bullicio lo altera, en un cuarto tranquilo con visitas. Cámbialo de postura según su pauta y ofrécele poca agua con él incorporado de pecho, nunca de lado; si tose, para.' },
      { question: '¿Sirve la acepromazina para la pólvora?', answer: 'No para el miedo. El Colegio de Médicos Veterinarios de Costa Rica y la sociedad europea de etología clínica la desaconsejan: deja al perro quieto, pero sigue oyendo y sintiendo miedo. Si necesita un medicamento, lo decide tu veterinaria después de revisarlo.' },
      { question: '¿Le puedo dar CBD a mi perro para la pólvora?', answer: 'Solo con indicación veterinaria, como pide el Colegio de Médicos Veterinarios de Costa Rica. Un veterinario citado en su comunicado lo considera un recurso, pero no recomendable en perros con problemas de hígado. Su regulación cambia según el país; en un perro mayor, que la veterinaria revise antes sus otros medicamentos.' },
      { question: '¿Por qué mi perro se orinó del miedo?', answer: 'El pánico puede afectar el control de esfínteres, según el Colegio de Médicos Veterinarios de Costa Rica. No lo regañes; limpia después, cuando esté tranquilo. Si los escapes siguen en los días siguientes o ya los tenía, consúltalo, porque en un perro mayor pueden tener otras causas.' },
      { question: '¿Dónde reporto un animal afectado por pólvora en Bogotá?', answer: 'La Alcaldía de Bogotá abrió en diciembre de 2025 un formulario para reportar animales afectados por la pólvora, disponible desde el 7 de diciembre. En 2024, el instituto de protección animal aclaró que su encuesta no constituye una denuncia. Si tu perro está herido o no respira bien, primero ve a una veterinaria.' },
      { question: '¿Hace falta ventilador si lo encierro en un cuarto?', answer: 'Si hace calor, conviene: un cuarto cerrado se calienta. Usa un ventilador fuera de su alcance y sin cables por el suelo, y deja agua fresca; si jadea mucho, revisa la temperatura. En ciudades altas, donde las noches de diciembre son frescas, lo que puede necesitar es una frazada más.' }
    ]} />
    ```
    *(Borradores; el redactor ajusta y vuelve a contar. La respuesta de Bogotá se apoya en S8 (formulario de 2025) y S7 (aclaración de 2024 sobre su encuesta); antes de publicar, comprobar si el formulario de 2026 existe y qué dice, y actualizarla.)*

## 7. POTENCIAL DE AFILIADOS / CONVERSIÓN

* Solo seguridad y cuidado: placa identificativa y arnés (H2-8), empapadores y colchoneta (H2-4), declarados. **Nunca** enlaces junto a CBD, feromonas, esencias florales o «calmantes».

## 8. GUÍA VISUAL — 7 IMÁGENES (6 PROMPTS Y 1 FOTOGRAFÍA)

Aplicar la [dirección visual editorial](../.agents/skills/references/direccion-visual-editorial.md) y su **requisito senior verificable**. No se ha generado ninguna imagen.

### Plan de imágenes (decisión del propietario, 2026-10-27)

El propietario pidió más imágenes para un texto de casi 6.000 palabras («4 o 5 no lo van a saturar») y fijó el criterio: **los testimonios, con su perro real; lo clínico y práctico, y la anécdota del compañero, con el mestizo**. Resultado: siete apoyos, uno cada 800 palabras de media.

| # | Imagen | Sección | Sujeto | Tipo |
|---|---|---|---|---|
| 1 | Del patio a la casa, por su cuenta | Portada (`heroImage`), tema de H2-2 | Mestizo fijo | Ilustración |
| 2 | Osa bajo la mesa del comedor | H2-2, `### Lo que recuerdo de Osa` | Osa (mestiza de pastor alemán) | Ilustración de testimonio |
| 3 | Bajo el escritorio | H2-3, `### Una mesa, una sábana y su frazada` | Mestizo fijo (la anécdota del compañero va anónima) | Ilustración |
| 4 | La lista para la consulta | H2-5, `### La lista para la consulta` | Mestizo fijo | Ilustración |
| 5 | Baltor en la habitación | H2-7, `### Baltor, que no salía de las habitaciones` | Baltor (chow chow café claro) | Ilustración de testimonio |
| 6 | Luna y Dakota en casa | H2-7, después de `### Luna y los temblores` | Luna y Dakota (beagles) | **Fotografía real** |
| 7 | Portón con candado y placa puesta | H2-8, `### La placa, puesta desde la tarde` | Mestizo fijo | Ilustración |

Orden de producción: la imagen 1 se genera primero y es la referencia del mestizo para la 3, la 4 y la 7. Osa y Baltor tienen ficha propia y no se derivan del mestizo. La 5 y la 6 quedan en el mismo H2: la 5 antes de su H3 y la 6 entre `### Luna y los temblores` y `### Cuándo ir a urgencias`, para que no queden pegadas.

### Criterio anti-«IA genérica» y diferencia con imágenes publicadas

* **Conceptos distintos de España** (refugio con mano y destellos, paseo con doble correa, consulta con palpación lumbar) **y de las portadas de leishmaniosis** (cuidadora ajustando el collar) **y de vacunas** (veterinaria conversando con el cuidador de un perro senior). Este artículo no tiene escena de consultorio: la imagen 4 muestra la lista escrita en casa, la noche antes de la consulta.
* **Paleta propia por escena:** patio en luz rasante de tarde (1); comedor con bombillo cálido y resplandor lejano (2); cuarto de trabajo en penumbra con lámpara de escritorio (3); cocina de día con luz natural de ventana (4); habitación de apartamento con luz del pasillo (5); portón a media tarde (7). Solo las imágenes 2, 3 y 5 son nocturnas, y cada una con otra fuente de luz.
* **Cámara y grano:** reportaje, 28–50 mm, ISO alto con grano fino, sin viñeteado, sin resplandor suave, sin HDR.
* **Contexto reconocible sin postal:** piso de cerámica, block repellado, silla plástica, pila, portón de lámina, celosías, cortinas de tela. **Sin sombreros, sarapes, piñatas, banderas ni tópicos.**
* **Continuidad de la familia del mestizo:** la misma tutora (mujer de unos 55 años, pelo negro con canas recogido, blusa lila, anillo de casada) en las imágenes 4 y 7, y el mismo tutor (hombre de unos 35 años, camiseta gris) en la 1, presentado como otro miembro de la familia.
* **Personas reales** con edad, ropa y gesto concretos; **manos anatómicas, cinco dedos** escritas en cada prompt donde haya manos.

Las líneas finales de cada prompt son instrucciones para quien genera; no se pintan. Cada prompt incluye «sin texto, letras ni marcas».

### Razas recientes y elección

Comprobado el 2026-10-26: registro de la dirección visual (podenco, labrador chocolate, golden, cocker, beagle, San Bernardo, dogo argentino, pastor alemán, bóxer, caniche miniatura, schnauzer, teckel, galgo español, setter gordon, mestizo pastor-mastín atigrado de la leishmaniosis —**publicado** (`datePublished` 2026-10-24), con portada de una cuidadora ajustando el collar—, bodeguero andaluz).

**Sujeto fijo: mestizo criollo mediano, excepción aprobada por el propietario el 2026-10-27.** Motivo: el perro de patio más reconocible para el lector latinoamericano («zaguate», «aguacatero», «criollo»); tipo, tamaño y color distintos del mestizo de leishmaniosis; la máscara negra hace legibles las canas a tamaño móvil. **Perros de los testimonios:** cada uno con su aspecto real por petición del propietario (motivo admitido por la dirección visual: el caso identifica la raza). Que Osa sea mestiza de pastor alemán no choca con el pastor alemán del registro: es el perro real del testimonio.

### Sujeto fijo (ilustrativo) — imágenes 1, 3, 4 y 7

**Mestizo criollo, macho de unos 12 años y 16 kg, de pelo corto color canela claro (leonado), con máscara negra en el hocico y alrededor de los ojos, una mancha blanca pequeña en el pecho, orejas semierguidas con la punta doblada hacia delante y cola en hoz poco poblada, sin amputar.** Collar de nailon rojo liso con una placa metálica redonda **sin texto legible**.

**Bloque de edad visible (íntegro en las imágenes 1, 3, 4 y 7, con la postura de la escena):**

> **Edad visible, todos estos rasgos a la vez:** canas en el hocico, en las cejas y en los párpados (la máscara negra del hocico y de alrededor de los ojos está muy salpicada de gris plateado, y las cejas se ven claras); ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular, costillas y pelvis discretas, sin delgadez extrema; postura natural de perro mayor **según la escena** (caminando, con la cabeza a la altura del lomo o algo baja; echado, con la cabeza apoyada; sentado, con el cuello relajado), apoyos prudentes y sin poses atléticas. **Sin enfermedad inventada:** sin cojera, heridas, costras, calvas, ojos rojos, jadeo extremo ni sufrimiento. **Rechazar si a tamaño móvil parece un adulto joven.**

En la imagen 3 (miedo moderado), «mirada serena» se sustituye por «mirada atenta, algo tensa»; los otros cuatro rasgos no cambian.

### Perros de los testimonios — imágenes 2, 5 y 6

**Excepción al requisito senior, declarada (petición del propietario, 2026-10-27):** según el propietario, en esa época **Osa y Baltor eran perros maduros, adultos, todavía no senior**, y vivían en El Salvador. El archivo prohíbe presentarlos como perros mayores. Sus ilustraciones piden **«adulto maduro, todavía no senior: sin rasgos de cachorro, sin canas ni rasgos de vejez»** en lugar del bloque de edad, y una línea de rechazo propia: **«Rechazar si parece cachorro o perro viejo.»** No son el sujeto senior del artículo; el pie dice que son ilustraciones de un recuerdo.

- **Osa:** mestiza de pastor alemán, hembra, adulta; manto negro y fuego algo irregular de mestiza, orejas erguidas, hocico largo, tamaño mediano-grande. Escena del archivo: bajo la mesa del comedor durante una cena, **sin fecha** (sin adornos navideños). No se muestra a nadie jalándola, regañándola ni mojándola.
- **Baltor:** chow chow café claro (dato del propietario), adulto; pelo denso y esponjoso, melena alrededor del cuello, orejas pequeñas y redondeadas, cola enroscada sobre el lomo, cuerpo compacto. Escena del archivo: no sale de la habitación aunque la puerta de la casa esté abierta. La chow chow que llegó después no aparece (color desconocido).
- **Luna y Dakota:** beagles de la familia (según el propietario, Luna es la tricolor y más delgada; Dakota, la más gordita). **Fotografía real**, no ilustración (imagen 6).

### Imagen 1 — Portada: del patio a la casa, por su cuenta (`heroImage`)

- **Archivo:** `mestizo-senior-entra-del-patio-v1.webp`.
- **Prompt:** Imagen editorial de portada, para el tema de H2-2; debe dejar ver que al perro se le invita a entrar a la casa antes de la pólvora, con comida y sin jalarlo. **El mismo mestizo criollo, macho de unos 12 años y 16 kg, pelo corto canela claro con máscara negra en el hocico y alrededor de los ojos, mancha blanca pequeña en el pecho, orejas semierguidas con la punta doblada hacia delante, cola en hoz poco poblada, tal como en la imagen de referencia.** Edad visible, todos estos rasgos a la vez: canas en el hocico, en las cejas y en los párpados (la máscara negra del hocico y de alrededor de los ojos está muy salpicada de gris plateado, y las cejas se ven claras); ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular, costillas y pelvis discretas, sin delgadez extrema; postura natural de perro mayor caminando, con la cabeza a la altura del lomo o algo baja, apoyos prudentes y sin poses atléticas; sin cojera, heridas, costras, calvas, ojos rojos, jadeo extremo ni sufrimiento. Collar de nailon rojo liso con placa metálica redonda sin texto legible, sin correa. La cámara está dentro de la cocina de una casa de una planta, a la altura del perro, mirando hacia el patio a través de la puerta trasera de metal con reja, abierta de par en par. Afuera, a las 5 de la tarde del 24 de diciembre, con sol bajo: un patio de cemento con una pila de cemento con lavadero, un tendedero con ropa de colores cuyas sombras largas cruzan el suelo, macetas hechas con latas y, al fondo, un portón de lámina pintado de verde, cerrado con candado. El perro cruza el umbral de la puerta caminando hacia la cámara, a su paso, con las orejas relajadas y la cola en posición neutra, mirando la mano del tutor. En primer término, a la derecha del encuadre, de espaldas en tres cuartos, el tutor, un hombre de unos 35 años con camiseta gris y pantalón de mezclilla, está agachado sobre el piso de cerámica de la cocina, con la mano izquierda, la del lado del perro, extendida hacia él y un trozo de comida en la palma abierta —mano anatómica, cinco dedos—, sin tocarlo; se le ven la espalda, el hombro, el brazo y la mano, no la cara. Objetivo de 28–35 mm, ISO 800, grano fino; interior en sombra suave y patio a contraluz cálido detrás del perro, sombras coherentes; texturas de cemento, lámina, algodón, cerámica y pelo corto. Acabado documental natural, sin viñeteado ni resplandor suave, color de saturación contenida. Evitar correa, dedos de más o fundidos, perro jalado o arrastrado, persona que bloquea la puerta, pólvora o humo, otros animales, texto, letras o marcas dentro de la imagen y perro de aspecto joven. *Instrucciones para quien genera, sin pintarlas:* ilustración generada, no representa a un paciente. **Rechazar si a tamaño móvil parece un adulto joven.**
- **Alt:** Ilustración de un perro mestizo senior de color canela que cruza desde el patio la puerta trasera de la casa, hacia un hombre agachado que le ofrece comida en la mano.
- **Pie:** Invitarlo a entrar con comida, antes de que empiece la pólvora, es más fácil que sacarlo después de debajo de una cama.
- **Aceptación (390 px):** perro de frente a la cámara, avanzando hacia la mano del tutor por la puerta abierta; tutor de espaldas en tres cuartos, sin cara; cinco rasgos de edad; sin correa; mano con cinco dedos.

### Imagen 2 — Osa bajo la mesa del comedor (H2-2, `### Lo que recuerdo de Osa`)
- **Archivo:** `osa-pastor-aleman-mestiza-bajo-mesa-comedor-v1.webp`.
- **Función:** que el lector vea lo que cuenta el recuerdo: una perra de patio que, con la pólvora, entra a la casa y se refugia bajo la mesa.
- **Prompt:** Ilustración editorial de un recuerdo familiar, para un artículo sobre el miedo a la pólvora en los perros. **Osa, una perra mestiza de pastor alemán, adulta madura, todavía no senior: sin rasgos de cachorro, sin canas ni rasgos de vejez; manto negro y fuego algo irregular, de mestiza, orejas erguidas, hocico largo, tamaño mediano-grande, sin collar visible.** Comedor de una casa de una planta en El Salvador, de noche, durante una cena familiar sin adornos navideños: mesa de madera rectangular con mantel de plástico estampado, platos, vasos y una tortillera de tela; sillas de madera alrededor; piso de cerámica; al fondo, una puerta de metal entreabierta que da al patio y una ventana con celosías por la que entra un resplandor lejano y difuso. Osa está echada bajo la mesa, en el centro, entre las patas de las sillas y los pies de la familia, con el cuerpo pegado al suelo, la cola recogida bajo el cuerpo, las orejas echadas hacia atrás y la mirada hacia la puerta. De la familia solo se ven, desde la altura de la mesa hacia abajo, piernas, sandalias y zapatos, y una mano que sostiene un vaso sobre el mantel (mano anatómica, cinco dedos); nadie toca a la perra ni se agacha hacia ella. Cámara a ras del suelo, desde un extremo de la mesa, plano medio que encuadra a Osa entera bajo la mesa con las patas de las sillas en primer término; objetivo de 35 mm, ISO 3200 con grano fino; luz cálida de un bombillo colgado sobre la mesa que deja la zona de abajo en penumbra; sombras coherentes; texturas de madera, plástico, cerámica y pelo. Acabado documental natural, sin pose, sin viñeteado ni resplandor suave, color de saturación contenida. Evitar adornos navideños, árboles o nacimientos, personas jalando, regañando o mojando a la perra, agua derramada, gesto agresivo, dientes a la vista, fuegos artificiales visibles, texto, letras o marcas dentro de la imagen, cachorro y perro viejo. *Instrucciones para quien genera, sin pintarlas:* ilustración de un recuerdo, no es una foto de Osa. **Rechazar si parece cachorro o perro viejo, o si alguien la toca.**
- **Alt:** Ilustración de una perra mestiza de pastor alemán echada bajo la mesa del comedor durante una cena familiar, con las orejas hacia atrás, entre las patas de las sillas.
- **Pie:** Ilustración de un recuerdo: Osa, una perra de patio, se metió bajo la mesa del comedor en plena cena y no quiso salir.
- **Aceptación (390 px):** se lee «perra bajo la mesa, entre pies y sillas»; nadie la toca; sin decoración navideña; orejas hacia atrás; manos con cinco dedos.

### Imagen 3 — Bajo el escritorio (H2-3, `### Una mesa, una sábana y su frazada`)
- **Archivo:** `mestizo-senior-bajo-escritorio-v1.webp`.
- **Función:** mostrar que muchos perros eligen solos su cueva bajo un mueble; acompaña la anécdota del compañero sin retratar a su perra (el pie no dice que sea ella).
- **Prompt:** Imagen editorial para un artículo sobre el miedo a la pólvora en perros mayores; debe dejar ver que un perro asustado elige por sí mismo un hueco bajo un mueble, dentro de la casa. **El mismo mestizo criollo, macho de unos 12 años y 16 kg, pelo corto canela claro con máscara negra en el hocico y alrededor de los ojos, mancha blanca pequeña en el pecho, orejas semierguidas con la punta doblada hacia delante, cola en hoz poco poblada, tal como en la imagen de referencia.** Edad visible, todos estos rasgos a la vez: canas en el hocico, en las cejas y en los párpados (la máscara negra del hocico y de alrededor de los ojos está muy salpicada de gris plateado, y las cejas se ven claras); ojos marrones algo hundidos, con párpados algo caídos y mirada atenta, algo tensa (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular, costillas y pelvis discretas, sin delgadez extrema; postura natural de perro mayor echado, con la cabeza apoyada sobre las patas delanteras, apoyos prudentes y sin poses atléticas; sin cojera, heridas, costras, calvas, ojos rojos, jadeo extremo ni sufrimiento. Collar de nailon rojo liso con una placa metálica redonda sin texto legible. Cuarto de trabajo de una casa costarricense, de noche: escritorio de melamina color madera contra la pared, con una computadora portátil cerrada, una lámpara de escritorio encendida y una taza; la silla de oficina apartada a un lado; piso de cerámica; cortina de tela corrida sobre la ventana, sin destellos visibles. El perro está echado debajo del escritorio, al fondo del hueco, sobre una frazada de cuadros que alguien le dejó, con el cuerpo recogido, la base de las orejas algo hacia atrás y la mirada hacia fuera; delante del hueco no hay nada que le cierre la salida. Nadie lo toca; no hay personas en la escena. Cámara a la altura del perro, de frente al hueco del escritorio, plano medio con margen de piso delante; objetivo de 35 mm, ISO 3200 con grano fino; luz cálida de la lámpara desde arriba, que deja el hueco en penumbra suave; sombras coherentes; texturas de melamina, tela, cerámica y pelo corto. Acabado documental natural, sin viñeteado ni resplandor suave, color de saturación contenida. Evitar cables por el suelo a su alcance, enchufes junto al perro, destellos o fuegos, personas, texto, letras o marcas dentro de la imagen (también en la portátil y la taza) y perro de aspecto joven. *Instrucciones para quien genera, sin pintarlas:* ilustración generada, no representa a un paciente. **Rechazar si a tamaño móvil parece un adulto joven.**
- **Alt:** Ilustración de un perro mestizo senior de color canela echado sobre una frazada debajo de un escritorio, en un cuarto en penumbra.
- **Pie:** Algunos perros buscan solos un hueco bajo un mueble; si es dentro de casa y tiene la salida libre, puede ser su cueva.
- **Posición:** después de la «idea propia» de la mesa con sábana y no pegada a la frase de la perra del compañero, para que no se lea como su retrato (es un macho senior ilustrativo; la perra del compañero no tiene edad conocida).
- **Aceptación (390 px):** se lee el perro bajo el escritorio con la salida libre; sin cables a su alcance; cinco rasgos de edad con mirada atenta.

### Imagen 4 — La lista para la consulta, pasada a limpio en casa (H2-5, `### La lista para la consulta`)
- **Archivo:** `mestizo-senior-lista-consulta-cocina-v1.webp`.
- **Función:** mostrar que la consulta de noviembre se prepara en casa, pasando a limpio lo anotado en enero (H2-10). Sin consultorio (la portada de vacunas ya muestra a una veterinaria conversando con un cuidador).
- **Prompt:** Imagen editorial para H2-5; debe dejar ver que, antes de la consulta, la tutora pasa a limpio en una libreta las notas que tomó en enero sobre cómo vivió su perro la pólvora. **El mismo mestizo criollo, macho de unos 12 años y 16 kg, pelo corto canela claro con máscara negra en el hocico y alrededor de los ojos, mancha blanca pequeña en el pecho, orejas semierguidas con la punta doblada hacia delante, cola en hoz poco poblada, tal como en la imagen de referencia.** Edad visible, todos estos rasgos a la vez: canas en el hocico, en las cejas y en los párpados (la máscara negra del hocico y de alrededor de los ojos está muy salpicada de gris plateado, y las cejas se ven claras); ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular, costillas y pelvis discretas, sin delgadez extrema; postura natural de perro mayor sentado, con el cuello relajado, apoyos prudentes y sin poses atléticas; sin cojera, heridas, costras, calvas, ojos rojos, jadeo extremo ni sufrimiento. Collar de nailon rojo liso con una placa metálica redonda sin texto legible. Cocina de una casa de una planta en Centroamérica, una tarde de noviembre: mesa con mantel de plástico de cuadros verdes y blancos, una taza de café y una hoja de papel doblada y algo arrugada junto a la libreta; al fondo, una refrigeradora con imanes de colores sin texto; a la izquierda, una ventana con la cortina abierta por la que entra luz de día. La tutora, mujer de unos 55 años, pelo negro con canas recogido, blusa lila y anillo de casada, está sentada a la mesa y copia con un bolígrafo en una libreta abierta lo que dice la hoja doblada (letra manuscrita ilegible a esta distancia), con la otra mano sujetando la hoja (manos anatómicas, cinco dedos). El perro está sentado en el piso de cerámica junto a su silla, a plena luz, tranquilo, mirándola con el cuello relajado. Cámara a la altura de la mesa, plano medio que encuadra a la tutora de medio cuerpo, la libreta y al perro entero en el suelo; objetivo de 35 mm, ISO 800 con grano fino; luz natural de día desde la ventana de la izquierda, suave y neutra, sin lámparas encendidas; sombras coherentes; texturas de plástico, papel, algodón, cerámica y pelo corto. Acabado documental natural, sin viñeteado ni resplandor suave, color de saturación contenida. Evitar consultorio, bata o uniforme sanitario, teléfonos o pantallas, texto legible en la libreta o en cualquier objeto, letras o marcas dentro de la imagen, dedos de más o fundidos y perro de aspecto joven. *Instrucciones para quien genera, sin pintarlas:* ilustración generada, no representa a un paciente. **Rechazar si a tamaño móvil parece un adulto joven.**
- **Alt:** Ilustración de una mujer que pasa notas a una libreta en la mesa de la cocina, de día, con su perro mestizo senior de color canela sentado a su lado.
- **Pie:** Antes de la consulta, pasar a limpio lo que anotaste en enero: dónde se metió, cuánto duró y si comió.
- **Aceptación (390 px):** se entiende «pasa notas a limpio en casa, de día», no una consulta ni una escena nocturna; texto ilegible; la misma tutora que en la imagen 7; cinco rasgos de edad.

### Imagen 5 — Baltor en la habitación (H2-7, antes de `### Baltor, que no salía de las habitaciones`)
- **Archivo:** `baltor-chow-chow-habitacion-v1.webp`.
- **Función:** que el lector vea al perro que no sale aunque la puerta esté abierta.
- **Prompt:** Ilustración editorial de un recuerdo, para un artículo sobre el miedo a la pólvora en los perros. **Baltor, un chow chow de color café claro, adulto maduro, todavía no senior: sin rasgos de cachorro, sin canas ni rasgos de vejez; pelo denso y esponjoso, melena abundante alrededor del cuello, orejas pequeñas y redondeadas, hocico ancho y corto, cola enroscada sobre el lomo, cuerpo compacto; sin collar visible.** Habitación de un apartamento de segundo piso en El Salvador, en una casa dividida en cuatro apartamentos, de noche: cama individual con colcha de colores, ropero de madera, piso de cerámica clara, una ventana con cortina de tela corrida por la que se cuela un resplandor lejano y difuso. La puerta de la habitación está abierta de par en par; al fondo del pasillo iluminado también está abierta la puerta del apartamento, que da al rellano de una escalera de concreto con baranda de hierro que baja a la calle. Baltor está echado en el rincón más lejano de la puerta, entre la cama y el ropero, con el cuerpo apretado contra la pared, la cabeza baja sobre las patas y la mirada hacia la puerta abierta, sin moverse hacia ella. No hay personas en la habitación. Cámara baja en ese mismo rincón, detrás y a un lado de Baltor: en primer término, nítidos, su lomo, la melena y una oreja; al otro lado de la habitación, la puerta abierta y, a través de ella, el pasillo iluminado que termina en la puerta del apartamento, también abierta al rellano de la escalera. Objetivo de 28 mm, ISO 3200 con grano fino; la luz cálida del pasillo entra por la puerta y deja el rincón en penumbra; sombras coherentes; texturas de pelo denso, tela, madera y cerámica. Acabado documental natural, sin pose, sin viñeteado ni resplandor suave, color de saturación contenida. Evitar charcos u orina visibles, gesto agresivo, lengua azul destacada, fuegos artificiales visibles, otros perros, texto, letras o marcas dentro de la imagen, cachorro y perro viejo. *Instrucciones para quien genera, sin pintarlas:* ilustración de un recuerdo, no es una foto de Baltor. **Rechazar si parece cachorro o perro viejo, o si no se lee que la puerta está abierta.**
- **Alt:** Ilustración de un chow chow de color café claro, visto desde atrás en el rincón de una habitación, que mira la puerta abierta y el pasillo hasta la puerta del apartamento, también abierta.
- **Pie:** Ilustración de un recuerdo: Baltor no salía de la habitación los días de pólvora, aunque le abrieran la puerta.
- **Aceptación (390 px):** se ven, desde detrás de Baltor, la puerta de la habitación abierta y, al fondo del pasillo, la del apartamento abierta; Baltor en primer término; chow chow café claro reconocible; sin charcos; adulto maduro, no senior.

### Imagen 6 — Luna y Dakota en casa (H2-7, entre `### Luna y los temblores` y `### Cuándo ir a urgencias`): **fotografía real**
- **Original:** `docs/contenido/miedo-polvora-perros-mayores/originales/fotos-propietario/luna-dakota-sala-dos-camas-2026-10-27.jpg` (aportada por el propietario el 2026-10-27, guardada **sin metadatos EXIF**, 2576 × 1449). Alternativa de reserva: `beagle-cama-sala-2026-10-27.jpg` (una sola beagle; vertical).
- **Archivo publicado:** `luna-dakota-beagles-en-casa-v1.webp`, 1200 × 675, sin metadatos. Encuadre: la foto ya es casi 16:9; recortar solo lo necesario para que las dos beagles queden enteras. **No retocar con IA ni añadir elementos**; solo recorte, tamaño, exposición y compresión.
- **Identificación (propietario, 2026-10-27):** Luna es la de tres colores, la más delgada; Dakota, la más gordita. En esta foto, por esa descripción, **Luna sería la tricolor echada en la cama, mirando a la cámara, y Dakota la que está en el suelo junto al sillón**. Es una deducción: **gate** — el propietario la confirma antes de publicar el pie (§11). En la foto también hay un gatito sobre la segunda cama; ni el alt ni el pie lo mencionan.
- **Alt (borrador):** Fotografía de dos beagles mayores de la familia en la sala de casa: una echada sobre una cama gruesa mira a la cámara y la otra descansa en el piso junto al sillón.
- **Pie (borrador, tras el gate):** Fotografía de la familia: Luna, en la cama, y Dakota, junto al sillón.
- **Límites:** la foto no ilustra un dato nuevo ni una pauta; no se usa para recomendar la cama que aparece; el gato del fondo no se menciona. La firma global dice «Ilustraciones generadas con IA»: por eso el pie empieza con «Fotografía».

### Imagen 7 — Portón con candado y placa puesta (H2-8, `### La placa, puesta desde la tarde`)

- **Archivo:** `mestizo-senior-porton-candado-placa-v1.webp`.
- **Concepto:** distinto de la portada publicada de leishmaniosis (cuidadora ajustando el collar a una mestiza): aquí nadie toca al perro; la mano cierra el portón y la placa ya está puesta.
- **Prompt:** Imagen editorial para H2-8; debe dejar ver que, antes de la noche, el portón queda cerrado con candado y el perro ya lleva su placa. **El mismo mestizo criollo, macho de unos 12 años y 16 kg, pelo corto canela claro con máscara negra en el hocico y alrededor de los ojos, mancha blanca pequeña en el pecho, orejas semierguidas con la punta doblada hacia delante, cola en hoz poco poblada, tal como en la imagen de referencia.** Edad visible, todos estos rasgos a la vez: canas en el hocico, en las cejas y en los párpados (la máscara negra del hocico y de alrededor de los ojos está muy salpicada de gris plateado, y las cejas se ven claras); ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular, costillas y pelvis discretas, sin delgadez extrema; postura natural de perro mayor sentado, con el cuello relajado, apoyos prudentes y sin poses atléticas; sin cojera, heridas, costras, calvas, ojos rojos, jadeo extremo ni sufrimiento. Collar de nailon rojo liso con una placa metálica redonda, sin texto legible, que cuelga visible sobre el pecho. Patio de cemento de una casa de una planta, a las 3:30 de la tarde del 24 de diciembre, antes de entrar al perro a la casa: un portón de lámina pintado de verde, con la pintura descascarada en el borde inferior, cerrado; al fondo, una pila de cemento; en la reja de una ventana, una serie de luces navideñas apagada. En primer término, a la derecha del encuadre, la mano izquierda y el antebrazo de una mujer de unos 55 años (manga de blusa lila, anillo de casada) —mano anatómica, cinco dedos, el pulgar empujando el arco del candado— cierran un candado de latón sobre la cadena que une las dos hojas del portón; no se le ve la cara. El perro está sentado sobre el cemento a la izquierda del encuadre, a un metro del portón, de tres cuartos y mirando con calma hacia la mano y el candado; nadie toca al perro ni su collar. La cámara está dentro del patio y mira a lo largo del portón hacia la casa: el portón ocupa el borde derecho del encuadre, visto en perspectiva, y al fondo se ve la pila. Objetivo de 50 mm, a la altura de la cadera de la mujer, ISO 1600 con grano fino; luz alta y cálida de media tarde desde la izquierda, con sombras cortas coherentes; texturas de lámina pintada, metal, cemento y pelo corto; profundidad de campo que mantenga nítidos el candado, la placa y la cara del perro. Acabado documental natural, sin viñeteado ni resplandor suave, color de saturación contenida. Evitar manos en el collar o en el perro, dedos de más o fundidos, portón abierto, texto, letras o marcas dentro de la imagen (en la placa, el portón o cualquier objeto), pólvora o humo y perro de aspecto joven. *Instrucciones para quien genera, sin pintarlas:* ilustración generada, no representa a un paciente. **Rechazar si a tamaño móvil parece un adulto joven.**
- **Alt:** Ilustración de una mano que cierra con candado un portón de lámina verde mientras un perro mestizo senior de color canela, sentado en el patio, lleva una placa en su collar rojo.
- **Pie:** Por la tarde, antes de entrarlo: portón con candado y la placa con tu teléfono ya puesta.
- **Aceptación (390 px):** el candado se está cerrando; la placa se ve en el collar; nadie toca al perro; la mano es la de la tutora de la imagen 4 (manga lila, anillo); cinco rasgos de edad.

### Recortes y animaciones
No aplica. El H2-4 (perro que no se levanta) **no lleva imagen**: mostrar al mismo mestizo postrado contradiría las demás imágenes y la regla de no inventar enfermedad; si el propietario quiere una, sería un segundo sujeto con su propia ficha.

## 9. CONTRATO DE ENTREGA — NO NEGOCIABLES

**1. Volumen real:** 5.300–6.000 palabras (target 5.700), contadas con H2, H3, tabla, `AlertBox` con título y FAQ con preguntas; sin frontmatter, imports, `<img>`, pies ni tarjeta de versiones. ±10 % por sección. Si no se llega sin relleno, parar y consultar; si se pasa, recortar.

**2. Fuentes citadas por nombre en su H2:**

| # | Fuente | H2 asignado | ¿Citada? |
|---|---|---|---|
| S1 | Salonen et al. 2020 | H2-1 | ☐ |
| S2 | Gähwiler et al. 2020 | H2-4 | ☐ |
| S3 | Lopes Fagundes et al. 2018 | H2-5, H2-10 | ☐ |
| S4 | Riemer 2020 (encuesta de tratamientos) | H2-4, H2-6, H2-10 | ☐ |
| S5 | ESVCE 2026 | H2-2, H2-3, H2-4, H2-5, H2-10 | ☐ |
| S6 | Riemer 2019, *PLOS ONE* | H2-1, H2-10 | ☐ |
| S7 | IDPYBA Bogotá (7 dic. 2024) | H2-1, H2-10 | ☐ |
| S8 | Alcaldía de Bogotá, reportes del 24–25 dic. 2025 | H2-1, H2-8, H2-9 | ☐ |
| S9 | COLVET según El Delfino (2024) | H2-3, H2-5, H2-6, H2-8, H2-10 | ☐ |
| S10 | COLVET según Teletica (2022) | H2-3, H2-5, H2-6, H2-7 | ☐ |
| S11 | FMVZ-UNAM según N+ (2024) | H2-2, H2-6, H2-7, H2-10 | ☐ |
| S12 | Chile, Ley 21.310 | H2-9 | ☐ |
| S13 | Colombia, Ley 670 de 2001 | H2-9 | ☐ |
| S14 | Colombia, Ley 2224 de 2022 | H2-9 | ☐ |

**3. Componentes:**
- [ ] 3 `AlertBox`: `info` (introducción), `warning` (H2-5), `danger` (H2-7). Ni más ni repetidos.
- [ ] 1 `FAQ` con las 8 preguntas del §6.
- [ ] 1 tabla (H2-9) en `<TablaApilable … compacta>` con `data-label`.
- [ ] Enlaces del §5.1, incluidos el de la versión de España (H2-9), úlceras, alimentación sin dientes, paliativos y la calculadora (H2-4).
- [ ] 7 imágenes con alt y pie del §8, en sus H3: portada (patio), Osa (H2-2), escritorio (H2-3), consulta (H2-5), Baltor y foto de Luna y Dakota (H2-7), portón (H2-8). La foto lleva «Fotografía» en el pie; las ilustraciones de testimonios, «Ilustración».
- [ ] Tarjeta horizontal solo si `TarjetaRelacionada.astro` existe en `main`; el enlace en contexto de H2-9, siempre.

**4. Testimonios** (solo del archivo):
- [ ] Declarados en la introducción como recuerdos, con país.
- [ ] Reparto del §6: Osa (H2-2), Baltor y Luna (H2-7).
- [ ] **Osa:** «no recuerdo con seguridad si se escapaban; creo que a veces…»; cena sin fecha; «muy brava; si salía a la calle podía morder a alguien», sin decir que mordiera por miedo; sin edad ni «mayor»; lo de la familia sin juicio ni pauta.
- [ ] **Baltor:** «no salía de las habitaciones»; «una vez se orinó o se defecó (no recuerdo cuál)»; la chow chow también se escondía; sin «quieto» ni patrón.
- [ ] **Perra del compañero:** anónima, en H2-3, una o dos frases con los tres hechos del archivo (solo una se pone muy nerviosa; la dejan dentro; se mete bajo su escritorio y ahí se queda); sin edad ni relación con el H2-4.
- [ ] **Luna:** solo temblores, terremotos y choques, y que busca a la familia. Sin alzarla ni «se calma».
- [ ] **Dakota aparece solo en la fotografía y su pie, sin hechos; la perra de unos vecinos y la hipótesis del «lugar menos ruidoso» no aparecen.**
- [ ] H2-4 sin caso; la perra del compañero solo en H2-3, sin relacionarla con el H2-4; nunca la eutanasia del perro del compañero.

**5. Anticanibalización con la versión de España (verificable):**
- [ ] «Petardos» no aparece en H1, slug, seoTitle, meta ni H2.
- [ ] **Tabla manual que rellena el auditor del artículo:** cada H3 y cada pregunta de la FAQ de este artículo frente al H3 o la pregunta más parecida del de España, con veredicto «distinto» o «paráfrasis». Cualquier «paráfrasis» se corrige antes de publicar. Títulos de España: `grep -n "^##" src/content/blog/miedo-petardos-perros-mayores.mdx` y sus 8 preguntas.
- [ ] Coincidencia textual: ninguna secuencia de **8 palabras seguidas** compartida con el `.mdx` de España, salvo nombres de estudios y citas literales:
  ```bash
  python3 -c "
  import re,sys
  def w(p): t=open(p,encoding='utf-8').read().split('---',2)[2]; return re.findall(r'\w+',t.lower())
  a,b=w(sys.argv[1]),w(sys.argv[2]); n=8
  s={tuple(b[i:i+n]) for i in range(len(b)-n+1)}
  hits={' '.join(a[i:i+n]) for i in range(len(a)-n+1) if tuple(a[i:i+n]) in s}
  print(len(hits)); [print('-',h) for h in sorted(hits)]
  " src/content/blog/miedo-polvora-perros-mayores.mdx src/content/blog/miedo-petardos-perros-mayores.mdx
  ```
- [ ] Sin la tabla de Riemer; sin «la mayoría ni se escondía ni vocalizaba»; sin el H3 de consuelo con Luna.
- [ ] Tabla manual: incluir como filas de partida los seis paralelos de la R3 (P2-1): «El cuarto sin ventana a la calle» / «Dónde: la habitación más silenciosa…»; «Una mesa, una sábana y su frazada» / «Qué poner y qué no»; «Si este diciembre es el primero que lo pasa mal» / «Si el miedo es nuevo…»; «Antes de que lleguen los invitados» / «Por la tarde: paseo, comida y puertas»; «Seis acuerdos para la familia» / «Por la noche…» y «Consolar…»; «Enero tiene once meses por delante» / «Qué es y cómo funciona» y «Si empiezas ahora, para marzo».
- [ ] Comprobación adicional de **6 palabras seguidas** (cambiar `n=8` por `n=6` en el script) sobre los `AlertBox`, la FAQ y los H3 de H2-8 y H2-10; ejemplos de paráfrasis ya corregidos en el brief (R2, P2-1): «Cómo averiguar las normas de tu ayuntamiento», «Lo esperable / Lo que debe mirar el veterinario», «Las primeras horas» (coches, patios, premio y manta, no perseguir), el `danger` y el `warning` de España.

**6. Español neutro:** tú y ustedes; ni vosotros ni voseo; sin españolismos («piso» solo como suelo).

**7. Seguridad clínica y editorial (13):**
1. Sin dosis, pautas ni calendarios; sin nombres de fármacos aprobados ni marcas.
2. Acepromazina desaconsejada con S10 y S5; no a los calmantes de personas.
3. CBD: solo lo que dice S9, con la atribución correcta (COLVET: solo con indicación; Dr. Meza: recurso, no recomendable con problemas de hígado); sin decir que el COLVET lo desaconseja ni que el sitio lo recomienda.
4. Cifras de S4 y S6 como «según los dueños de la encuesta»; **el 70 % es del contracondicionamiento durante el ruido y el 55 % de los CD de ruidos**.
5. Bogotá: «reportes» o «presuntamente afectados»; nunca «en Latinoamérica».
6. Leyes: solo Chile y Colombia, sin penas concretas ni cuantías (como mucho, el rango de 1 a 200 salarios mínimos que la Ley 2224 manda fijar en su reglamentación); el resto «no verificado».
7. Microchip sin obligatoriedad afirmada.
8. Sin afirmar que la lámina amplifica el ruido.
9. No recomendar alzar, jalar, regañar, mojar ni amarrar. **Excepción:** mover al perro que no se levanta (H2-4), con la técnica que haya enseñado la veterinaria, entre dos personas o con una manta firme y sin arrastrarlo.
10. No prometer que el miedo desaparezca.
11. Señales de urgencia en el `danger` junto a su lista.
12. Sin cifras de audición, «20 % de perros perdidos», «parálisis», «problemas cardíacos» ni «infartos».
13. H2-4: declarado como criterio editorial sin estudios; agua y comida solo incorporado de pecho, en poca cantidad y vigilado; sin masticables nuevos; sin abrir la decisión de eutanasia.

**8. Voz y tono:** `tono.py` ≤3 muletillas por 1.000 (objetivo 0).

## 10. CHECKLIST DEL BRIEF

- [x] Frontmatter completo; `pilar` y `heroImageCaption` válidos.
- [x] seoTitle 55 y meta 156, contados con Python.
- [x] 14 fuentes con URL profunda y fecha; verificaciones parciales marcadas (S4, S9, S10, S11); S14 añadida tras R1; atribución del CBD corregida tras R2.
- [x] Enlaces internos publicados (comprobados en `src/content/blog/` y `src/pages/herramientas/`).
- [x] Canibalización: H2 en otro orden, H3 y FAQ distintos; paráfrasis señaladas por la R2 corregidas; tabla manual de H3 y FAQ pendiente para el auditor del artículo (§9.5).
- [x] Suma de targets = 5.700.
- [x] Matriz fuente→H2 idéntica en §3, §6 y §9.2.
- [x] Raza como excepción aprobada por el propietario (2026-10-27); bloque de edad íntegro con postura; excepción de edad de Osa y Baltor declarada aquí y en la dirección visual.
- [x] Testimonios contrastados con el archivo y con el artículo publicado.

## 11. RECURSOS PROMETIDOS Y GATES

| Recurso | Ubicación | Estado | Prueba previa |
|---|---|---|---|
| Tabla de leyes | H2-9 | Planificada | Ver a 390 px |
| Lista «seis acuerdos» | H2-6 | Planificada | Sin fármacos |
| Lista «lo que oyes» | H2-10 | Planificada | Cada cifra contra S4 |
| 7 imágenes (6 ilustraciones y 1 foto) | Portada, H2-2, H2-3, H2-5, H2-7 (×2), H2-8 | Planificadas | Ver la ficha de aceptación del §8 para cada una; foto sin metadatos y con identificación de Luna y Dakota confirmada por el propietario |
| Tarjeta horizontal | Tras la introducción, en los dos artículos | Decidida (2026-10-27); PR de código aparte | Móvil a 390 px, modo oscuro, teclado, lector de pantalla, `npx astro build` |

- [x] Raza: mestizo aprobado (2026-10-27).
- [x] Enlace entre versiones: tarjeta horizontal con imagen en los dos artículos + enlace en contexto (2026-10-27).
- [ ] **Gate de la tarjeta:** antes de publicar LA-01, `TarjetaRelacionada.astro` está en `main` (o en la rama de redacción) y la tarjeta hacia España está en el `.mdx`; si no, la decisión de enlazar en los dos sentidos queda a medias.
- [ ] **Gate:** el propietario confirma qué beagle de la foto es Luna y cuál Dakota antes de publicar el pie (deducción de su descripción en §8).
- [x] H2-4 sin caso (2026-10-26).
- [x] Perra del compañero bajo el escritorio (H2-3): uso autorizado por el propietario (2026-10-27), anónima.
- [ ] Verificaciones parciales cerradas o limitadas (S4 publicado; originales de S9–S11).
- [ ] Antes de publicar, volver a abrir S12–S14 y comprobar si en Colombia se expidió la reglamentación de la Ley 2224 y si Bogotá abre el formulario en 2026.
- [ ] Tabla manual de paráfrasis (§9.5) y comprobación de 8 palabras.
- [ ] `npx astro build` sin errores.
- [x] R1–R4 hechas; R5 y R6 autorizadas si hacen falta.

## Historial de auditoría

| Ronda | Fecha | Auditor | Veredicto | Hallazgos | Estado |
|---|---|---|---|---|---|
| R1 | 2026-10-26 | Agente independiente (sesión distinta) | **NO APTO** | 0 P0, 5 P1 (testimonios ya publicados; Osa y Baltor alterados; diferenciación no real; 70 % mal asignado; Ley 2224 omitida), 4 P2, 8 P3. Informe: `docs/contenido/miedo-polvora-perros-mayores/auditoria-brief-r1.md` | Corregido el 2026-10-26 en v2 (ver `correccion-r1.md`) |
| R2 | 2026-10-26 | Agente independiente (sesión distinta) | **NO APTO** | 0 P0, 1 P1 (seguridad del H2-4: aspiración y cómo moverlo), 4 P2 (paráfrasis restantes; atribución del CBD; geometría de la portada; imagen 3 repetía la portada de leishmaniosis), 13 P3. Informe: `docs/contenido/miedo-polvora-perros-mayores/auditoria-brief-r2.md` | Corregido el 2026-10-26 en v3 (ver `correccion-r2.md`) |
| R3 | 2026-10-26 | Agente independiente (sesión distinta) | **APTO con reservas** | 0 P0, 0 P1, 2 P2 (paralelos de H3 con España; cronología de las imágenes 2 y 3), 8 P3. Informe: `docs/contenido/miedo-polvora-perros-mayores/auditoria-brief-r3.md` | Corregido el 2026-10-26 en v4 (ver `correccion-r3.md`), comprobado por búsquedas de texto. El auditor del artículo recibe el informe R3 |
| — | 2026-10-27 | Decisiones del propietario (sin ronda de auditoría) | — | Raza aprobada; testimonio del compañero autorizado; aspecto de Osa (mestiza de pastor alemán) y Baltor (chow chow café claro); 7 imágenes con foto real de Luna y Dakota; tarjeta horizontal en los dos artículos | v5. El auditor del artículo comprueba estos puntos |
| R4 | 2026-10-27 | Agente independiente (sesión distinta) | **APTO con reservas** | 0 P0, 0 P1, 5 P2 (Dakota y H2-4 contradictorios; identificación de la foto sin confirmar; imagen 4 repetía la portada de vacunas; geometría de Baltor; orden de la tarjeta), 8 P3. Informe: `docs/contenido/miedo-polvora-perros-mayores/auditoria-brief-r4.md` | Corregido el 2026-10-27 en v6 (ver `correccion-r4.md`) |
| R5 | 2026-10-27 | Agente independiente (sesión distinta) | **NO APTO** | 0 P0, 1 P1 (pie de la foto atribuía los temblores a Dakota), 3 P2 (norma de leishmaniosis desplazada; imagen 4 repetía luz y composición; §5.2 no describía el componente real), 7 P3. Informe: `docs/contenido/miedo-polvora-perros-mayores/auditoria-brief-r5.md` | Corregido el 2026-10-27 en v6.1 (ver `correccion-r5.md`). Queda R6 |
