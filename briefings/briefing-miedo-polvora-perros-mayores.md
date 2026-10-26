# BRIEF DE CONTENIDOS: Miedo a la pólvora en perros mayores: cómo cuidarlo el 24 y el 31 de diciembre

**Sitio:** cuidatuperroviejo.com | **Pilar:** Salud Mental y Emocional | **Tipo:** Artículo spoke Astro/MDX | **Serie:** versión latinoamericana de P1-03 (código propuesto **LA-01**)

**Estado:** v1 del 2026-10-26, pendiente de auditoría independiente (R1). No redactar hasta que una auditoría salga APTO o APTO con reservas. No fusionar ni desplegar sin orden del propietario.

**Cinco decisiones de esta versión que el propietario debe conocer:**

1. **No es una traducción del artículo de España, es otro artículo.** El publicado (`/salud-mental-emocional-perros/miedo-petardos-perros-mayores`) responde a «petardos, Nochevieja, Fallas y San Juan en un piso español». Este responde a **«pólvora en el barrio el 24 y el 31, en una casa con patio, en un país donde la ley y las veterinarias de guardia cambian»**. Comparten el núcleo de evidencia internacional, pero cada H2 resuelve otra decisión (tabla de diferenciación en §2). El control anticanibalización entra en el contrato (§9.5).
2. **Keyword «pólvora», no «petardos».** «Pólvora» es la palabra del lector en Centroamérica, Colombia y Venezuela (y la de los testimonios del propietario). «Cohetes» (México) y «pirotecnia» (Cono Sur) van como secundarias. «Petardos» no se usa en el título, el slug, el seoTitle ni la meta, para no competir con el artículo de España.
3. **Los testimonios reservados entran aquí.** Osa (perra de patio en El Salvador que buscaba entrar a la casa) y Baltor (perro de apartamento que no salía de los cuartos) se reservaron para esta versión (decisión del propietario, 2026-10-25). De Luna y Dakota se usan **solo hechos que el artículo de España no contó**: los temblores y terremotos de Luna y la aclaración de Dakota sobre cuánta pólvora hay en Costa Rica, contada aquí con otro fin.
4. **Enlace entre las dos versiones: propuesta, no decisión.** El §5.2 propone una tarjeta «Esta guía tiene dos versiones» en los dos artículos, más un enlace en contexto en el H2 legal. La tarjeta es código y va en un PR aparte; **el propietario elige** (opciones A, B y C en §5.2). El brief funciona con cualquiera de ellas: el enlace en contexto no depende del componente.
5. **Raza de las imágenes: mestizo criollo canela de máscara negra (repetición de categoría «mestizo» con motivo).** Es el perro más reconocible en un patio latinoamericano; la leishmaniosis usó un mestizo de otro tipo (pastor-mastín atigrado, grande). Justificación en §8.

## 1. DATOS, METADATOS Y FRONTMATTER MDX

| Campo | Valor |
|---|---|
| Título H1 | Miedo a la pólvora en perros mayores: cómo cuidarlo el 24 y el 31 de diciembre |
| Título SEO (seoTitle) | Miedo a la pólvora en perros mayores: plan de diciembre (55 caracteres) |
| Keyword principal | miedo a la pólvora en perros mayores |
| Keywords secundarias | perro con miedo a la pólvora · qué hacer con mi perro en Navidad y Año Nuevo · perro con miedo a los cohetes · perro asustado por la pirotecnia · perro de patio con pólvora |
| Slug | `miedo-polvora-perros-mayores` |
| Meta descripción (máx. 160) | Tu perro mayor sufre con la pólvora del 24 y el 31. Cómo pasarlo del patio a un refugio, qué preguntar al veterinario y qué hacer si se escapa en el barrio. (156 caracteres) |
| Ruta relativa | `/salud-mental-emocional-perros/miedo-polvora-perros-mayores` |
| Pilar | Salud Mental y Emocional |
| Ruta pilar | `/salud-mental-emocional-perros` |
| Intención principal | Informacional y urgente-estacional: «se viene diciembre, mi perro mayor sufre con la pólvora; ¿dónde lo pongo, qué le pido a la veterinaria y qué hago esas dos noches?» |
| Intención secundaria | Práctica y local: qué dice la ley en mi país, qué hago si se escapa en el barrio y qué consejos de diciembre sirven |
| Objetivo global | **5.700 palabras** (suelo 5.300, techo 6.000), por la preferencia del propietario (2026-10-25) de 5.000–6.000 y por diez decisiones distintas (§6) |
| Fecha brief | 2026-10-26 |
| Ventana editorial | Idealmente publicar antes del **20 de noviembre de 2026**: deja al lector unas dos semanas para la consulta veterinaria antes de que empiece la pólvora de diciembre (en Bogotá, el formulario de reportes de 2025 se abrió el 7 de diciembre, S8) y antes de que las clínicas reduzcan horarios por las fiestas (criterio editorial). Si sale más tarde, el redactor cambia «en noviembre» por «cuanto antes» |

Conteos: seoTitle = 55 caracteres; meta = 156 (contados con Python el 2026-10-26). El H1 (78 caracteres) no tiene límite.

### Bloque de frontmatter MDX

```yaml
---
title: "Miedo a la pólvora en perros mayores: cómo cuidarlo el 24 y el 31 de diciembre"
seoTitle: "Miedo a la pólvora en perros mayores: plan de diciembre"
metaDescription: "Tu perro mayor sufre con la pólvora del 24 y el 31. Cómo pasarlo del patio a un refugio, qué preguntar al veterinario y qué hacer si se escapa en el barrio."
pilar: "salud-mental-emocional-perros"
keywordPrincipal: "miedo a la pólvora en perros mayores"
heroImage: "/images/blog/miedo-polvora-perros-mayores/mestizo-senior-cueva-bajo-mesa-nochebuena-v1.webp"
heroImageAlt: "Ilustración de un perro mestizo senior de color canela echado en un refugio hecho con una sábana bajo la mesa del comedor, en una casa iluminada por luces de Navidad; una mujer sentada lo acompaña a distancia."
heroImageCaption: "Un refugio dentro de la casa, preparado antes de la noche: oscuro, conocido y con la salida libre."
status: "Publicado"
datePublished: "{{FECHA_DE_PUBLICACION_AAAA-MM-DD}}"
---
```

`heroImageCaption` existe en el esquema (`src/content.config.ts`, opcional; comprobado el 2026-10-26). `datePublished` lo fija el propietario al publicar (**gate:** sustituir el marcador antes del commit del `.mdx`). Sin `dateModified` hasta que haya una revisión real.

## 2. PROCEDENCIA, VALOR PROPIO Y CONTROL DE CANIBALIZACIÓN

**Tipo:** **experiencia propia aportada (a) + guía.** Los estudios, las normas y las guías colegiales sostienen las afirmaciones; los testimonios ilustran lo que se ve en una casa latinoamericana. Son **vivencia y observación, no casos clínicos**, y nunca prueban que un método funcione. Reserva Luna/Dakota activada por el propietario para este tema (2026-10-25); Jaspe no se usa.

**Testimonios (único origen permitido: `docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md`):**
- **Osa** (El Salvador, perra de la familia de un tío del propietario): perros de patio; con la pólvora del 24 y el 31 buscaban entrar; bajo la cama, en el armario, bajo la mesa del comedor durante una cena; la familia los jalaba, los regañaba y alguna vez les echó agua; lloraban; en el patio se metían bajo la pila; Osa era brava; al abrir el portón a veces salían disparados y se escondían; nunca se lastimaron. **Sin edad ni desenlace: no se presenta como perra mayor.**
- **Baltor** (El Salvador, perro de un vecino del apartamento de arriba): vivía dentro; el día de pólvora no salía de los cuartos aunque le abrieran la puerta; una vez se orinó o se defecó (el propietario no recuerda cuál) por el miedo; una chow chow muy enérgica que llegó después también se escondía esos días. La duda de si el piso de arriba se oía más es del propietario.
- **Perra de unos vecinos** (El Salvador): aullaba y ladraba; cuando era demasiado, buscaba la casa. Ya contada en el artículo de España: aquí, **como mucho una frase** y con otras palabras (§9.5).
- **Luna** (beagle, 2015, Costa Rica): ante sustos que no son la pólvora —**temblores, terremotos y choques**— busca a la familia y la recogen. El archivo dice que «temblores y terremotos» corresponde al país del propietario y que en España solo podía ir como «otros sustos»: **aquí sí se nombra.**
- **Dakota** (beagle, 2014, Costa Rica): la aclaración del propietario: en Costa Rica no se acostumbra reventar mucha pólvora; se da en lugares concretos y es más un tema de luces. Aquí sirve para decir que **diciembre no suena igual en todos los países ni en todos los barrios**.

**Declaración para el lector (introducción):** una o dos frases: la guía reúne estudios y recomendaciones de colegios y universidades veterinarias de la región, y lo que vimos en casa en Costa Rica y en El Salvador con perros de la familia y de vecinos: recuerdos, no casos clínicos.

**Pregunta del lector:** «Diciembre ya viene, mi perro mayor sufre con la pólvora (vive en el patio, o se esconde y no sale). ¿Dónde lo pongo, qué le pido a la veterinaria, qué hago esas dos noches y qué hago si se escapa?»

**Aportación propia (lo que no hace el artículo de España ni otro del sitio):**
- (a) **Del patio a la casa:** cómo y cuándo hacer entrar a un perro que vive en el patio, sin jalarlo ni mojarlo (S10, S11; testimonio de Osa).
- (b) **Datos de reportes ciudadanos de Bogotá** (S7, S8): qué efectos reportó la gente en animales durante la pólvora, con sus límites (encuesta, no censo).
- (c) **Dos guías colegiales de Costa Rica y una de la UNAM** (S9, S10, S11): consejos de la región, contrastados con la evidencia internacional; incluye el «nunca acepromazina» del Colegio de Médicos Veterinarios de Costa Rica.
- (d) **El perro que no se mueve:** el miedo que se queda quieto en un cuarto y se orina (Baltor) frente al que intenta entrar (Osa); qué mirar en cada uno (S2).
- (e) **El calor de diciembre:** refugio cerrado pero fresco, porque en el Cono Sur diciembre es verano y en buena parte del trópico hace calor (criterio editorial; enlace a golpe de calor).
- (f) **La ley cambia por país:** dos normas verificadas (Chile, Colombia) y cómo averiguar la del propio país sin inventar.
- (g) **Consejos que circulan en diciembre** (CBD, esencias florales, «que se acostumbre», amarrarlo en el patio): cuáles tienen respaldo y cuáles no.

**Hilo narrativo:** sin hilo principal que cerrar. **Osa** abre el H2 del patio y **Baltor** el de las señales; son ilustraciones sueltas. La guía cierra con límites y decisiones.

### Control de canibalización con el artículo de España (comprobado el 2026-10-26)

Se leyeron los H2 y la FAQ del `.mdx` publicado (`src/content/blog/miedo-petardos-perros-mayores.mdx`) y su brief v7.

| Tema | España (publicado) | Esta versión | Cómo se evita el solapamiento |
|---|---|---|---|
| Palabra clave | petardos, Nochevieja, Fallas, San Juan | pólvora, 24 y 31 de diciembre | Ninguna palabra clave compartida en título, slug, seoTitle ni meta |
| Escenario | Piso con persiana, terraza y ascensor | Casa con patio, portón y techo de lámina; apartamento con ventanas de celosía | H2 propios: patio→casa (H2-2) y refugio con calor (H2-5) |
| Por qué asusta | Edad, dolor y oído (H2 propio) | Cómo suena diciembre en un barrio: dos noches, pólvora cercana y difícil de predecir (S7, S8) | El dolor va a H2-4 (consulta) en 2–3 frases, sin repetir el desarrollo de España |
| Señales | Lista de Gähwiler | El perro que se esconde, el que aúlla y el que se queda quieto (Baltor, Osa) | Gähwiler se usa para «esconderse no se confirmó»: otro ángulo |
| Ley | BOE: Ley 7/2023 y RD 989/2015 | Chile (Ley 21.310) y Colombia (Ley 670 de 2001), más «cómo averiguarlo» | Normas distintas; enlace en contexto a la versión de España |
| Productos | Tabla de la encuesta de Riemer | Lista «consejos que circulan en diciembre» (H2-9) con COLVET y Bogotá | Sin tabla de Riemer; solo dos cifras agregadas, redactadas de nuevo |
| Fármacos | Ficha de dexmedetomidina | Sin fichas ni nombres de fármacos aprobados; disponibilidad por país no verificada; acepromazina (COLVET + ESVCE); CBD (COLVET) | Otra fuente regional y otro foco |
| Escape | Ley 7/2023: aviso en 48 h | Búsqueda en el barrio, placa con teléfono, reporte en Bogotá | Sin plazos legales españoles |
| FAQ | 8 preguntas (§ arriba) | 8 preguntas **distintas** (§6) | Ninguna pregunta repetida ni parafraseada |
| Testimonios | Luna/Dakota 2025, alzar, voz; perra vecina | Osa, Baltor, temblores de Luna, pólvora en Costa Rica | Ningún hecho contado dos veces, salvo una frase opcional de la perra vecina |

**Riesgo residual:** las dos páginas pueden aparecer para búsquedas genéricas («perro miedo fuegos artificiales»). Mitigación: palabras clave distintas, enlace recíproco que dice a cada lector cuál es su versión (§5.2) y, opcionalmente, `hreflang` (opción C del §5.2), que es la señal estándar para versiones regionales.

**Otros temas vecinos que no se invaden:** P1-14 (tormentas), P1-29 (ruido urbano crónico), P1-15 (alimentos navideños: no abrir ese tema aunque la cena del 24 lo sugiera; una línea de remisión solo si existe URL publicada), el brief de feromonas (`[~]`, sin publicar: el artículo no emite veredicto sobre ensayos de feromonas) y `ansiedad-separacion-perros-senior` (publicado: no contradecir su frase sobre feromonas).

### Variante lingüística: español neutro para Latinoamérica

Regla 1 de la [guía de voz y tono](../.agents/skills/references/guia-voz-tono.md): **de tú, en español neutro**. Esta versión **no** es de la serie España.

- **Tratamiento:** tú; en plural, **ustedes** («si en casa son varios…»). Nunca vosotros ni voseo («vos tenés», «mirá»), aunque se hable de Costa Rica o El Salvador.
- **Vocabulario:** pólvora (la palabra del título), cohetes, pirotecnia, reventar pólvora, patio, portón, pila o lavadero, cuarto, casa de una planta, apartamento o departamento (usar «apartamento» y glosar una vez «o departamento»), techo de lámina, ventanas de celosía (glosar: «de paletas de vidrio»), veterinaria o clínica veterinaria, croquetas, placa con nombre y teléfono, correa, arnés, alzar o cargar en brazos. Evitar españolismos: piso, persiana (salvo «cortina o persiana»), coger, vosotros, pienso, chapa, petardo como palabra clave.
- **Testimonios:** se respetan las palabras del propietario («pólvora», «jalar», «alzar», «la pila»), glosando la pila una vez («el lavadero de cemento»).
- **Formato:** coma decimal y espacio antes de «%» y «°C», como el resto del sitio.
- **Países:** nombrar el país de cada fuente y de cada testimonio la primera vez. Nunca «en Latinoamérica» para un dato de una sola ciudad (Bogotá) o de un solo país.

## 3. FUENTES CIENTÍFICAS Y OFICIALES (SOURCE-FIRST)

> [!IMPORTANT]
> S1–S6 se leyeron el 2026-10-25 para el brief de España (allí constan qué partes se leyeron y sus límites); se reutilizan aquí con esas fichas. S7–S13 se abrieron el **2026-10-26** para esta versión. Ningún identificador sale de memoria.

### Registro fuente → afirmación → localización → H2 → límites

**S1. Salonen M y cols. «Prevalence, comorbidity, and breed differences in canine anxiety in 13,700 Finnish pet dogs». *Scientific Reports* 2020;10:2962.** DOI 10.1038/s41598-020-59837-z · PMID 32139728 · https://pmc.ncbi.nlm.nih.gov/articles/PMC7058607/
- *Afirmaciones:* el 32 % mostraba mucho miedo a algún ruido; el miedo a los fuegos artificiales fue el subrasgo más frecuente (26 %); la sensibilidad al ruido aumentó con la edad (Resultados).
- *H2:* 1. *Límites:* encuesta finlandesa; sin datos por raza. **Una sola frase** (el desarrollo ya está en el artículo de España).

**S2. Gähwiler S, Bremhorst A, Tóth K, Riemer S. «Fear expressions of dogs during New Year fireworks: a video analysis». *Scientific Reports* 2020;10:16035.** DOI 10.1038/s41598-020-72841-7 · https://pmc.ncbi.nlm.nih.gov/articles/PMC7525486
- *Afirmaciones:* 36 perros en Suiza grabados en Año Nuevo y en otra noche; aumentaron las orejas hacia atrás, el movimiento y el jadeo; vocalizar, parpadear y esconderse subieron pero **no superaron la corrección estadística**; en los tres minutos codificados la mayoría ni se escondía ni vocalizaba.
- *H2:* 3. *Límites:* muestra pequeña de conveniencia; diferencias de grupo. Aquí se usa para una idea concreta: **un perro quieto también puede tener miedo** (el artículo de España usa la lista de señales; no repetirla).

**S3. Lopes Fagundes AL y cols. «Noise Sensitivities in Dogs: An Exploration of Signs in Dogs with and without Musculoskeletal Pain…». *Frontiers in Veterinary Science* 2018;5:17.** DOI 10.3389/fvets.2018.00017 · PMID 29487858
- *Afirmaciones:* serie de 20 perros; los que tenían dolor musculoesquelético empezaron con el miedo al ruido más tarde (media 6 años y 6 meses frente a 2 años y 8 meses); 8 de 10 con dolor generalizaron el miedo a lugares asociados; los autores piden valorar el dolor, sobre todo si el miedo aparece tarde.
- *H2:* 4 y 10. *Límites:* serie cualitativa de una clínica; no afirmar que el dolor cause el miedo.

**S4. Riemer S. «Effectiveness of treatments for firework fears in dogs». *Journal of Veterinary Behavior* 2020;37:61–70.** DOI 10.1016/j.jveb.2020.04.005 (preprint: DOI 10.1101/663294; se leyó el resumen del preprint en Europe PMC, **verificación parcial**).
- *Afirmaciones:* encuesta a 1.225 dueños; dar masticables, juego y comida durante los fuegos fue lo único del manejo asociado con mejoría; tocar y hablar al perro no se asoció; contracondicionamiento, más del 70 % de dueños lo vio eficaz; feromonas, herbales, aceites esenciales, homeopatía y flores de Bach, entre el 27 % y el 35 %, «no superior a lo esperable por efecto placebo» según la autora.
- *H2:* 6, 9 y 10. *Límites:* percepción de dueños sin grupo control; misma muestra que S6.

**S5. ESVCE. «Position statement on the use of medications to manage acute noise sensitivities in dogs as an alternative to acepromazine» (v2.1, junio de 2026).** https://esvce.org/wp-content/uploads/2026/06/ESVCE-position-statement-on-the-use-of-medications-to-manage-acute-phobic-states-in-dogs-as-an-alternative-to-acepromazine-2.1-ESVCE-def.pdf
- *Afirmaciones:* no usar acepromazina para el miedo al ruido (suprime la respuesta motora sin cambiar la emoción; puede aumentar la sensibilización); zona segura condicionada de antemano de la que el perro pueda entrar y salir; plan de fondo con desensibilización y contracondicionamiento; la elección del fármaco se individualiza según comorbilidades y medicación.
- *H2:* 2, 4, 5 y 9. *Límites:* sociedad europea; **no copiar dosis ni nombres de fármacos** (la disponibilidad en cada país latinoamericano no se verificó).

**S6. Riemer S. «Not a one-way road — Severity, progression and prevention of firework fears in dogs». *PLOS ONE* 2019;14(9):e0218150.** DOI 10.1371/journal.pone.0218150 · PMID 31490926 · https://pmc.ncbi.nlm.nih.gov/articles/PMC6730926/
- *Afirmaciones:* el 52 % estaba al menos en parte afectado; el miedo suele empezar en los primeros años; casi tres cuartas partes se recuperaban a la mañana siguiente, el 10 % tardaba hasta un día, el 12 % hasta una semana y más del 3 % semanas o meses; en la Discusión, la prevalencia sube con la edad hasta los 10 años en perros sanos y baja desde los 11 (hasta 8 y desde 9 con problemas de salud), lo que la autora atribuye, como hipótesis, a la pérdida de oído.
- *H2:* 1 y 10. *Límites:* encuesta internacional (527 respuestas en inglés y 699 en alemán) cuya lista de países incluye México y España; **no presentar sus datos como latinoamericanos**.

**S7. Instituto Distrital de Protección y Bienestar Animal (IDPYBA), Alcaldía de Bogotá. «En Bogotá van 1.900 animales atendidos por afectaciones con pólvora» (7 de diciembre de 2024).** https://bogota.gov.co/mi-ciudad/ambiente/en-bogota-van-1900-animales-atendidos-por-afectaciones-con-polvora
- *Leído:* la página completa (2026-10-26).
- *Afirmaciones:* entre noviembre de 2022 y noviembre de 2024 se registraron 1.901 animales presuntamente afectados por pólvora en Bogotá (702 de compañía y 1.199 silvestres), a partir de **reportes ciudadanos en una encuesta que «no constituye una denuncia»**. Recomendaciones del IDPYBA: refugio en casa, cortinas cerradas, música, juguetes, actividad física antes, puertas, ventanas y balcones cerrados, correa y arnés.
- *H2:* 1 y 9. *Límites:* **el titular dice «atendidos», el texto habla de reportes**: usar «reportados» o «presuntamente afectados». Bogotá no es Latinoamérica. La página menciona picos del 24 y el 31 de diciembre de 2024 aunque se publicó el 7 de diciembre: **no usar esa frase**. También recomienda feromonas y esencias florales: en H2-9 se contrasta con S4, sin descalificar al IDPYBA.

**S8. Alcaldía de Bogotá. Balance de reportes de afectación de animales por pólvora del 24 y 25 de diciembre de 2025 (publicado el 25 de diciembre de 2025).** https://bogota.gov.co/en/node/282673
- *Leído:* la página completa (2026-10-26).
- *Afirmaciones:* 115 reportes ciudadanos el 24 y 25 de diciembre de 2025; perros, 74 %; gatos y aves, 23 %; efectos reportados: miedo y estrés 31 %, huida y desorientación 21 %, contaminación 18 %; el formulario estaba abierto desde el 7 de diciembre y sumaba 730 respuestas; campaña «La Pólvora Explota Mis Sentidos».
- *H2:* 1, 7 y 8. *Límites:* reportes voluntarios de una ciudad, sin verificación clínica; los porcentajes son de los reportes, no de los perros de Bogotá. No usar las cifras de dignatarios ni de la campaña salvo el nombre.

**S9. Colegio de Médicos Veterinarios de Costa Rica (COLVET), recomendaciones para la pirotecnia de Navidad y fin de año, según El Delfino (10 de diciembre de 2024).** https://delfino.cr/2024/12/recomendaciones-para-tranquilizar-a-sus-mascotas-durante-la-pirotecnia-de-navidad-y-fin-de-ano
- *Leído:* el artículo de prensa (2026-10-26). Fuente secundaria: «el COLVET recomienda, según la prensa».
- *Afirmaciones (atribuidas):* pasear y dejar olfatear antes; refugio tipo «cueva» dentro de la casa, con cama o transportín y frazadas; música; placa con nombre y teléfono; consultar a la veterinaria según edad, temperamento y enfermedades previas (Dra. Silvia Coto, presidenta). **El CBD, solo con receta veterinaria y no en animales con problemas de hígado** (Dr. Daniel Meza, en la misma nota).
- *H2:* 4, 5, 6, 8 y 9. *Límites:* nota de prensa; no hay documento colegial enlazado. No ampliar lo del CBD más allá de esas dos condiciones.

**S10. Colegio de Médicos Veterinarios de Costa Rica, consejos ante el ruido de la pólvora, según Teletica (17 de diciembre de 2022).** https://www.teletica.com/mascoticas/consejos-para-calmar-a-su-mascota-ante-el-ruido-de-la-polvora_325734
- *Leído:* el artículo (2026-10-26).
- *Afirmaciones (atribuidas):* espacio oscuro tipo «cueva»; cerrar cortinas, puertas y ventanas; masticables; música; acompañar y vigilar; **nunca acepromazina**, porque «solo actúa sobre la función motora» y el animal sigue oyendo y sintiendo miedo; identificación en el collar; averiguar los horarios de la pólvora en la zona.
- *H2:* 4, 5 y 6. *Límites:* prensa; coincide con S5 en la acepromazina, lo que da dos fuentes independientes para ese aviso.

**S11. Facultad de Medicina Veterinaria y Zootecnia de la UNAM (México), recomendaciones ante la pirotecnia, según N+ (14 de diciembre de 2024).** https://www.nmas.com.mx/tendencias/por-que-perros-gatos-se-asustan-con-pirotecnia-consejos-mascotas-cuetes-diciembre-2024/
- *Leído:* el artículo (2026-10-26). **El boletín original de la UNAM no está enlazado** (verificación parcial: citar «según N+»).
- *Afirmaciones (atribuidas):* no dejar al animal en áreas abiertas como terrazas o patios; música o televisión; mantener la calma; no fomentar la pirotecnia; algunos perros pueden jugar con la pirotecnia; consultar al veterinario.
- *H2:* 2 y 6. *Límites:* **no usar** las cifras de audición («100 veces», «4 veces») ni el «20 % de perros perdidos» atribuido a otra universidad: no tienen fuente primaria.

**S12. Chile. Ley 21.310, que modifica la Ley 17.798 sobre Control de Armas en materia de fuegos artificiales (Diario Oficial núm. 42.871, 3 de febrero de 2021).** https://www.diariooficial.interior.gob.cl/publicaciones/2021/02/03/42871/01/1890803.pdf
- *Leído:* el PDF completo extraído con `pdftotext` (2026-10-26).
- *Afirmaciones:* sanciona la tenencia sin autorización, la fabricación y el comercio de fuegos artificiales, y añade un art. 14 E que sanciona a quien «sin la competente autorización, accionare, activare o disparare» esos elementos; deroga el art. 2 de la Ley 19.680.
- *H2:* 7. *Límites:* no interpretar penas ni cuantías; no afirmar «en Chile está prohibido todo»: hay espectáculos autorizados. La Ley 19.680 solo se vio en una copia no oficial: no citarla aparte.

**S13. Colombia. Ley 670 de 2001 (protección de los niños frente a artículos pirotécnicos), texto de la Secretaría del Senado.** http://www.secretariasenado.gov.co/senado/basedoc/ley_0670_2001.html
- *Leído:* el texto completo (2026-10-26).
- *Afirmaciones:* art. 4: los alcaldes municipales y distritales **pueden permitir** el uso y la distribución de pirotecnia con las condiciones de seguridad que fijen las autoridades o los bomberos, en tres categorías de riesgo; art. 7: se prohíbe la venta de pirotecnia a menores de edad y a personas en estado de embriaguez.
- *H2:* 7. *Límites:* la ley protege a los niños; **no menciona a los animales**. La página señala jurisprudencia y vigencia en el art. 4 que no se revisaron: decir que **cada alcaldía decide** y no detallar las categorías.

### Cobertura, lagunas y límites

1. **No hay estudios latinoamericanos de prevalencia** del miedo a la pólvora. Lo regional son reportes ciudadanos de Bogotá (S7, S8) y recomendaciones de colegios y universidades (S9–S11). Decirlo una vez.
2. **Leyes:** solo Chile y Colombia verificadas. **México, Costa Rica, El Salvador, Argentina, Perú y el resto no se verificaron**: el artículo no dice nada sobre ellos y explica cómo averiguarlo (alcaldía, municipalidad o bomberos).
3. **Fármacos:** la disponibilidad por país no se verificó; el artículo no nombra fármacos aprobados (solo «hay medicamentos aprobados para el miedo al ruido en algunos países; tu veterinaria sabe cuáles hay donde vives») y solo advierte contra la acepromazina y los calmantes de personas.
4. **Microchip:** no se verificó en qué países es obligatorio. El artículo pone la placa con teléfono como mínimo (S9, S10) y el microchip como recomendable, sin afirmar obligación.
5. **Calor en diciembre:** criterio editorial (estaciones), sin cifras de temperatura.
6. **Techo de lámina y ruido:** que una lámina metálica amplifique el estruendo no se verificó: no afirmarlo. Se puede decir que, si en casa hay un cuarto con techo de concreto o con cielorraso, suele ser más silencioso, como sugerencia que el lector comprueba («escucha dónde se oye menos»).
7. **Descartadas:** cifras de audición de prensa; «20 % de perros perdidos»; datos de feromonas o esencias florales de prensa generalista; la Ley 19.680 (Chile) por copia no oficial.

## 4. REQUISITOS TÉCNICOS DE ASTRO Y MDX

- **Importaciones** (primera línea del cuerpo):
  ```mdx
  import AlertBox from '../../components/AlertBox.astro';
  import FAQ from '../../components/FAQ.astro';
  import TablaApilable from '../../components/article/TablaApilable.astro';
  ```
- El cuerpo no empieza con `#`. Párrafos de 3 líneas como máximo en móvil. H3 cada 150–200 palabras de media.
- **Imágenes:** `<img src="/images/blog/miedo-polvora-perros-mayores/{{NOMBRE}}.webp" alt="{{ALT}}" width="1200" height="675" loading="lazy" decoding="async" />`. Portada en `heroImage` con `heroImageCaption`; las otras dos donde indica el §8.
- **Una tabla** (H2-7, leyes), dentro de `<TablaApilable label="…" compacta>` con `data-label` en cada `<td>`; tres columnas, celdas de una frase. El resto, en listas.
- **Tarjeta de versiones (§5.2):** si el propietario aprueba la opción A y el componente ya existe en `main` al redactar, el redactor la importa y la coloca tras la introducción. Si no existe, **no se escribe en HTML a mano**: queda solo el enlace en contexto de H2-7.
- Sin animaciones ni recortes.

## 5. ENLAZADO INTERNO

### 5.1 Enlaces obligatorios

Comprobado el 2026-10-26 contra `INVENTARIO_CONTENIDO.md` y `src/content/blog/`.

| Tipo | Texto ancla sugerido | URL | Dónde |
|---|---|---|---|
| Pilar | salud mental y emocional de tu perro | `/salud-mental-emocional-perros` | Conclusión |
| Versión hermana | guía para quien vive en España | `/salud-mental-emocional-perros/miedo-petardos-perros-mayores` | H2-7, frase de cierre (y tarjeta, si se aprueba) |
| Spoke | ansiedad por separación en perros senior | `/salud-mental-emocional-perros/ansiedad-separacion-perros-senior` | H2-3, para distinguir el miedo que aparece con el ruido del que aparece cuando el perro se queda solo |
| Spoke | agresividad tardía y dolor | `/salud-mental-emocional-perros/agresividad-tardia-perros-mayores-dolor` | H2-2 (un perro asustado que muerde al jalarlo; dolor) |
| Spoke | disfunción cognitiva canina | `/salud-mental-emocional-perros/disfuncion-cognitiva-canina` | H2-4 |
| Cruzado | incontinencia urinaria en perros mayores | `/higiene-hogar-perros-senior/incontinencia-urinaria-perros-mayores` | H2-3 (Baltor) o H2-10 |
| Cruzado | golpe de calor en perros mayores | `/salud-perros-mayores/golpe-de-calor-perros-mayores` | H2-5, `### Cerrado, pero fresco` |
| Cruzado | chequeo geriátrico | `/salud-perros-mayores/chequeo-geriatrico-canino` | H2-4 |
| Cruzado | cómo dar medicación a tu perro | `/cuidados-paliativos-perros/como-dar-medicacion-perro` | H2-4, junto al aviso |
| Cruzado | cama ortopédica | `/movilidad-dolor-perros-mayores/cama-ortopedica-perros-mayores-displasia-artrosis` | H2-5 |
| Calculadora | — | — | **No se enlaza**: el pilar no es Salud ni Paliativos y no responde a la pregunta |

`prevencion-caidas-perro-mayor` no se enlaza aquí (lo usa la versión de España; reduce la coincidencia de enlaces salientes). **Pendientes sin URL:** feromonas (`[~]`), P1-14, P1-15. El texto no los enlaza ni dice «próximamente».

`src/data/internal-links.ts`: la sesión de publicación añade la entrada `'miedo-polvora-perros-mayores'` con dos destinos cruzados (`golpe-de-calor-perros-mayores`, `incontinencia-urinaria-perros-mayores`), siguiendo la skill `enlazado-interno-sitio`. La relación entre las dos versiones no va en `CROSS_PILLAR_LINKS` (mismo pilar): va en la tarjeta o en el texto.

### 5.2 Cómo enlazar las dos versiones (decisión del propietario)

El objetivo: que cada lector sepa en dos segundos si está en «su» versión, sin que parezca un enlace metido para SEO. Tres opciones, combinables:

**A. Tarjeta «Esta guía tiene dos versiones» (recomendada).** Un componente nuevo, `src/components/article/VersionRegional.astro`, que va en los dos artículos justo después de la introducción (antes del primer H2). Diseño:

```
┌──────────────────────────────────────────────────────────┐
│  📍 Esta guía tiene dos versiones                         │
│                                                          │
│  [● Latinoamérica · estás aquí]   [ España → ]            │
│   Pólvora el 24 y el 31,           Petardos en Nochevieja, │
│   casa con patio, ley por país     Fallas y San Juan       │
└──────────────────────────────────────────────────────────┘
```

- Dos «chips» del mismo tamaño; el actual, relleno y con «estás aquí» (`aria-current="page"`); el otro, contorneado y con flecha. Icono de pin de mapa en SVG; **sin banderas** (una bandera es un país, no una región, y no se lee bien en modo oscuro ni con lector de pantalla).
- Una línea de qué cubre cada versión, para que el lector elija por su situación y no por su pasaporte.
- Responsive: en móvil, chips apilados a lo ancho; modo oscuro con los tokens del sitio; enlace con texto completo para lectores de pantalla («Ver la versión para España: petardos en Nochevieja, Fallas y San Juan»).
- Props: `actual` y `versiones` (lista de `{region, href, resumen}`), para reutilizarlo en otros pares regionales (por ejemplo, golpe de calor).
- Coste: un componente pequeño, un PR de código aparte contra `main`, más una línea en el `.mdx` de España (que ya está publicado: cambiarlo es otra publicación).

**B. Solo enlace en contexto (mínimo, sin código).** En el H2-7 de esta versión: «Si vives en España, tienes una guía con la ley española y el calendario de Nochevieja, Fallas y San Juan» (y la frase recíproca en el H2 legal del artículo de España, cuando se toque). Natural, porque la ley es justo donde las dos versiones se separan. **Va en todos los casos.**

**C. `hreflang` es-ES / es-419 (opcional, más adelante).** Le dice a Google que son versiones regionales de la misma guía y reduce que compitan entre sí en las búsquedas. Requiere un campo opcional en el frontmatter (p. ej., `versionesRegionales`) y soporte en el layout (`<link rel="alternate" hreflang>` recíproco). El sitio no tiene hoy soporte de `hreflang`. Recomendación: **evaluarlo con datos de Search Console** unas semanas después de publicar; si las dos páginas se alternan en la misma búsqueda, implementarlo.

**Recomendación:** A + B ahora; C cuando haya datos. Si el propietario no quiere tocar código, B basta.

## 6. ESTRUCTURA DETALLADA Y PRESUPUESTO DE PALABRAS

> **Target total: 5.700 palabras (suelo 5.300; techo 6.000).** Los targets cuentan todo el texto visible: títulos de H2 y H3, avisos (`AlertBox` con su título), la tabla y, en la conclusión, el FAQ con preguntas y respuestas. Desviación máxima ±10 % por sección; el suelo global manda. Si no se llega a 5.300 sin relleno, **parar y consultar**; si se pasa de 6.000, **recortar**.

Suma: 330 + 560 + 620 + 520 + 560 + 500 + 560 + 430 + 380 + 420 + 320 + 500 = **5.700**.

**Matriz fuente → H2 (única; idéntica en §3 y §9.2):** S1: H2-1 · S2: H2-3 · S3: H2-4, H2-10 · S4: H2-6, H2-9, H2-10 · S5: H2-2, H2-4, H2-5, H2-9 · S6: H2-1, H2-10 · S7: H2-1, H2-9 · S8: H2-1, H2-7, H2-8 · S9: H2-4, H2-5, H2-6, H2-8, H2-9 · S10: H2-4, H2-5, H2-6 · S11: H2-2, H2-6 · S12: H2-7 · S13: H2-7.

**Reparto de testimonios (cada hecho en un solo H2):** Dakota (cuánta pólvora hay en Costa Rica) → H2-1 · Osa (patio, entrar, bajo la mesa, jalar, regañar, agua, la pila, portón, brava) → H2-2 · perra vecina (una frase opcional) → H2-2 · Baltor (no sale del cuarto, se orina o defeca, la chow chow) → H2-3 · Luna (temblores, terremotos y choques: busca a la familia) → H2-6. Voz: primera persona para lo que vio o hace el propietario («recuerdo», «en casa»); «nosotros» para la familia; nunca «el propietario» en tercera persona. Declarar el país la primera vez.

---

### INTRODUCCIÓN — Target: ~330 palabras (párrafos ≈280 + `AlertBox` ≈50)

**Objetivo:** responder en la primera pantalla qué hacer y cuándo, en el lenguaje de quien vive la pólvora en su barrio.

* **Párrafo 1 — Respuesta (≈100):** en muchos barrios de Latinoamérica, diciembre trae dos noches de pólvora (el 24 y el 31) y, a menudo, varios días alrededor. Para un perro mayor, lo que más protege se decide **antes**: dónde va a estar (dentro de la casa, no en el patio), qué revisa la veterinaria en noviembre, cómo es su refugio, qué se hace cada una de las dos noches y cómo se le encuentra si se escapa. Una frase con esas cinco decisiones.
* **Párrafo 2 — Tipo de material (≈90):** guía con experiencia aportada: estudios internacionales (no hay estudios latinoamericanos de prevalencia, decirlo), reportes de Bogotá, colegios veterinarios de Costa Rica y la UNAM; y lo que vi en El Salvador con perros de la familia y de vecinos, y en casa, en Costa Rica: recuerdos, no casos clínicos.
* **Párrafo 3 — Por qué ahora (≈60):** la consulta y el refugio necesitan semanas; en diciembre muchas clínicas cambian horarios por las fiestas (criterio editorial; «pregunta por los horarios de guardia de tu veterinaria»).
* **Párrafo 4 — Promesa (≈30):** una frase: qué encontrará (del patio a la casa, las dos noches hora por hora, la ley de tu país, qué hacer si se escapa).
* **(Si se aprueba la opción A del §5.2) Tarjeta de versiones** justo después del aviso; no cuenta para el total.
* **`AlertBox` (`info`):**
    ```mdx
    <AlertBox type="info" title="No es mañas ni falta de carácter">
      Un perro que tiembla, aúlla o se mete bajo la cama con la pólvora tiene miedo de verdad. No se le quita regañándolo ni dejándolo afuera para que «se acostumbre». Se prepara, y esta guía te dice cómo.
    </AlertBox>
    ```
    *(Borrador; ≤55 palabras; sin culpa.)*

---

### H2-1 — Diciembre en el barrio: por qué esas noches pesan más en un perro mayor — Target: ~560 palabras
* *Sustentado en:* S1, S6, S7, S8. Testimonio: Dakota (aclaración sobre Costa Rica).
* *Decisión:* **¿qué tan mal le va a ir a mi perro y cuándo empieza lo fuerte?**

* `### Cerca, sin aviso y durante horas` (≈200)
    * Contraste con un espectáculo de fuegos: la pólvora de barrio se revienta en la calle, el patio de al lado o la azotea, a horas que nadie anuncia, y suele empezar días antes. Criterio editorial descriptivo, sin cifras.
    * Dakota (Costa Rica): en Costa Rica no se acostumbra reventar mucha pólvora: se da en lugares concretos y es más un tema de luces. Uso: **diciembre no suena igual en todos los países ni en todos los barrios**; el lector mide el suyo (la pista: el año pasado, ¿cuántos días hubo ruido?). No repetir aquí la salud de Dakota ni el episodio de 2025 (ya en España).
* `### Lo que reportaron en Bogotá` (≈190)
    * S8: el 24 y el 25 de diciembre de 2025 llegaron 115 reportes ciudadanos de animales afectados; el 74 % eran perros; lo más reportado: miedo y estrés (31 %), huida y desorientación (21 %). S7: 1.901 animales presuntamente afectados entre noviembre de 2022 y noviembre de 2024 (702 de compañía). **Límite en la misma frase:** reportes voluntarios de una ciudad, no un estudio; los porcentajes son de los reportes.
    * Lectura útil: lo que más se reporta, además del miedo, es **que el animal huya**. Por eso H2-2 (dentro de casa) y H2-8 (búsqueda) importan.
* `### ¿Y la edad?` (≈160)
    * S1, en una frase: el miedo a los fuegos artificiales es el miedo a un ruido más frecuente en una encuesta de 13.700 perros finlandeses y la sensibilidad al ruido aumentó con la edad. S6: en otra encuesta internacional, el miedo aumenta con la edad hasta los 10 años y en los más ancianos puede bajar, quizá por pérdida de oído (hipótesis de la autora). **No desarrollar más**: el dolor como causa a descartar va en H2-4.
    * Una frase de cierre: los datos son de otros países.

---

### H2-2 — Del patio a la casa: el cambio que más lo protege — Target: ~620 palabras
* *Sustentado en:* S11, S5. Testimonios: Osa; perra vecina (opcional).
* *Decisión:* **¿lo dejo en el patio o lo entro, y cómo?**

* `### Lo que recuerdo de Osa` (≈230)
    * Relato en primera persona, solo hechos del archivo: en El Salvador, en casa de un tío, los perros vivían en el patio («el perro tiene que estar en el patio»); el 24 y el 31 casi no se oía a la gente, solo pólvora. Buscaban entrar: si se abría la puerta, entraban corriendo, se metían en los cuartos, bajo la cama o en el armario. Una noche, durante una cena, alguien abrió para sacar la basura y Osa se metió bajo la mesa del comedor y no quiso salir: un miedo terrible. Para sacarlos había que jalarlos; a veces los regañaban y alguna vez les echaron agua; los perros lloraban. En el patio, primero ladraban y luego se metían bajo la pila (glosar: el lavadero de cemento). Al abrir el portón, a veces salían disparados, y una vez salieron y se fueron a esconder. Nunca se lastimaron.
    * **Narrar sin juzgar** (regla de empatía sin culpa): era lo que se hacía; el artículo no lo presenta como algo a imitar. Sin edad ni desenlace: **no decir que Osa era mayor**.
    * Opcional (una frase, redactada de nuevo): la perra de unos vecinos aullaba y ladraba y, cuando era demasiado, buscaba la casa. Hipótesis del propietario, atribuida: empiezan ladrando y, cuando es demasiado, buscan dónde meterse.
* `### Lo que dicen las veterinarias` (≈150)
    * S11 (UNAM, según N+): no dejar al animal en áreas abiertas como terrazas o patios. Lectura: lo que Osa buscaba —entrar— es justo lo que se recomienda. Un perro mayor en el patio, además, tiene menos fuerza para trepar o saltar si entra en pánico, pero también más riesgo de lastimarse si lo intenta (criterio editorial, sin cifras).
* `### Cómo hacer que entre sin jalarlo` (≈170)
    * Pasos de criterio editorial apoyados en S5 (zona segura de entrada y salida libres; condicionada antes): días antes, dejarlo entrar a ratos al cuarto elegido con comida o su cama; el día, entrarlo **antes** de que empiece el ruido, con correa y arnés, caminando y no a rastras; cerrar el portón y la puerta del patio.
    * **Qué no hacer:** jalarlo de debajo de la mesa o de la cama, regañarlo, mojarlo. Si se metió en un sitio dentro de la casa, ese es su refugio esa noche: se le deja ahí, con la puerta de la calle cerrada.
* `### Si es bravo o muerde cuando tiene miedo` (≈60)
    * Osa era brava. Un perro en pánico que puede morder es un riesgo para quien lo saca o lo carga. Entrarlo antes del ruido; no meter la mano bajo la mesa; si muerde al manipularlo, hablarlo con la veterinaria (dolor). Enlace a `agresividad-tardia-perros-mayores-dolor`.
* *Sin AlertBox en este H2.*

---

### H2-3 — El que se esconde, el que aúlla y el que no se mueve — Target: ~520 palabras (con `AlertBox` danger ≈60)
* *Sustentado en:* S2. Testimonio: Baltor.
* *Decisión:* **¿mi perro tiene miedo aunque no haga escándalo, y cuándo es urgencia?**

* `### Baltor, que no salía del cuarto` (≈160)
    * Relato: un vecino del apartamento de arriba, en El Salvador; Baltor vivía dentro; los días de pólvora no salía de los cuartos aunque le abrieran la puerta de la casa; una vez se orinó o se defecó (no recuerdo cuál) del miedo. Después llegó una chow chow muy enérgica que solía molestarlo; los días de pólvora, los dos se escondían. La duda de si arriba se oía más es mía, no un dato.
    * Contraste con Osa en una frase: una buscaba entrar, el otro no quería salir. Mensaje único: **un lugar interior y cerrado es donde buscan refugio**; dentro de casa también se sufre.
* `### Quieto no quiere decir tranquilo` (≈150)
    * S2: en 36 perros grabados en Año Nuevo (Suiza), lo que más aumentó fue llevar las orejas hacia atrás, moverse y jadear; esconderse y vocalizar subieron sin confirmación estadística, y en los tres minutos analizados la mayoría ni se escondía ni vocalizaba. Lectura: un perro que se queda echado en un rincón puede estar asustado; mirar orejas, jadeo y si come o no (jadear también puede ser calor: ver H2-5).
* `### Si se orina o se hace del miedo` (≈90)
    * No regañar ni limpiar delante de él con prisa; limpiar después. Si los escapes siguen días después de la pólvora o ya los tenía, es otra conversación con la veterinaria: enlace a `incontinencia-urinaria-perros-mayores`. Distinguir de la ansiedad cuando se queda solo: enlace a `ansiedad-separacion-perros-senior` (una frase).
* `### Señales que piden veterinaria de urgencia` (≈60) + **`AlertBox` (`danger`)**:
    ```mdx
    <AlertBox type="danger" title="Busca una veterinaria de urgencia si...">
      Le cuesta respirar o el jadeo no cede cuando termina el ruido, tiene las encías muy pálidas o azuladas, se desmaya o se queda desorientado, se lastimó al intentar escapar o mordió o tragó restos de pólvora. Averigua antes del 24 cuál atiende esas noches.
    </AlertBox>
    ```
    *(Borrador. «Mordió o tragó restos de pólvora» se apoya en S11, que dice que algunos perros juegan con la pirotecnia; criterio editorial para la urgencia.)*

---

### H2-4 — La consulta de noviembre: antes de que cambien los horarios — Target: ~560 palabras (con `AlertBox` warning ≈60)
* *Sustentado en:* S3, S5, S9, S10.
* *Decisión:* **¿qué le pido a la veterinaria y qué no le doy por mi cuenta?** Sin dosis, sin marcas, sin nombres de fármacos aprobados.

* `### Qué llevar anotado` (≈150)
    * Desde cuándo le pasa; qué hizo el diciembre pasado (se escondió, aulló, se quedó quieto, se escapó, se orinó); si le pasa con otros ruidos o con los temblores (sin desarrollar); qué come y qué medicamentos toma. S9: el COLVET pide consultar según la edad, el temperamento y las enfermedades previas.
* `### Si el miedo es nuevo, que revise dolor` (≈130)
    * S3, redactado distinto del artículo de España: en una serie de 20 perros, los que tenían dolor de músculos o articulaciones empezaron con el miedo al ruido años más tarde; los autores piden revisar el dolor cuando el miedo aparece de mayor. Pedir una exploración; enlace a `chequeo-geriatrico-canino`. Otras posibilidades por criterio clínico, sin cifras: enlace a `disfuncion-cognitiva-canina`.
* `### Lo que puede proponer y lo que no conviene` (≈160)
    * S5: plan inmediato (a veces un medicamento de acción rápida que decide la veterinaria; refugio) y plan de fondo. Una frase: en algunos países hay medicamentos aprobados para el miedo al ruido; cuáles hay donde vives lo sabe tu veterinaria (laguna 3).
    * **Acepromazina:** S10 (COLVET): «nunca», porque solo actúa sobre el movimiento y el perro sigue oyendo y sintiendo miedo; S5 (ESVCE) dice lo mismo. Dos fuentes independientes, una regional y una europea.
    * **CBD:** S9: solo con receta veterinaria y no si el perro tiene problemas de hígado. Nada más.
* `### Las guardias de diciembre` (≈60)
    * Preguntar en la consulta qué clínica atiende el 24 y el 31 por la noche y anotarla (criterio editorial). Enlace a `como-dar-medicacion-perro` si le recetan algo.
* **`AlertBox` (`warning`):**
    ```mdx
    <AlertBox type="warning" title="Ni pastillas de la casa ni «algo para que duerma»">
      No le des calmantes de personas, restos de otros tratamientos ni gotas compradas sin receta. La acepromazina lo deja quieto pero no le quita el miedo, y en un perro mayor cualquier medicamento puede chocar con el corazón, el riñón o el hígado.
    </AlertBox>
    ```

---

### H2-5 — Un refugio para tu casa (y para el calor de diciembre) — Target: ~500 palabras
* *Sustentado en:* S5, S9, S10.
* *Decisión:* **¿dónde y cómo armo su «cueva»?**

* `### Dónde: el cuarto donde menos se oye` (≈150)
    * S10: un espacio oscuro tipo «cueva», con cortinas, puertas y ventanas cerradas. Cómo elegirlo en una casa de la región: el cuarto más interior, sin ventana a la calle; si hay un cuarto con techo de concreto o con cielorraso, probar si se oye menos (laguna 6: no afirmar que la lámina amplifica; «escucha dónde se oye menos»). Ventanas de celosía (de paletas de vidrio): cerrarlas y correr una cortina gruesa.
* `### Cómo armar la cueva` (≈150)
    * S9: cama o transportín con frazadas; S10: masticables; S5: que pueda entrar y salir y que lo conozca de antes. Idea concreta: una mesa con una sábana que cuelgue por tres lados (como la portada). Agua, un juguete conocido; sin amarrarlo ni encerrarlo en el transportín cerrado. Cama baja y firme para articulaciones cansadas: enlace a `cama-ortopedica-perros-mayores-displasia-artrosis`.
* `### Cerrado, pero fresco` (≈130)
    * En el Cono Sur diciembre es verano y en buena parte del trópico hace calor: un cuarto cerrado puede calentarse. Ventilador de techo o de pie fuera de su alcance y sin cables por el suelo, agua fresca, revisar que no jadee por calor. Enlace a `golpe-de-calor-perros-mayores` (una vez, sin explicar el golpe de calor). Criterio editorial.
* `### Ensayarlo con días de margen` (≈60)
    * S5: zona segura condicionada antes: comida y siestas ahí desde días antes. Si rechaza el sitio, no insistir: que elija otro dentro de la casa.

---

### H2-6 — El 24 y el 31, hora por hora — Target: ~560 palabras
* *Sustentado en:* S4, S9, S10, S11. Testimonio: Luna (temblores).
* *Decisión:* **¿qué hago esas dos noches, con la familia en casa?**

* `### Por la tarde` (≈150)
    * Paseo corto y a su ritmo, dejándolo olfatear (S9: el COLVET recomienda pasear y dejar olfatear antes); comer antes; entrarlo del patio; cerrar portón; placa puesta (remisión a H2-8). S10: averiguar a qué horas suele empezar la pólvora en tu zona (preguntar a vecinos).
* `### Cuando empieza: lista de 6 pasos` (≈150)
    * Lista numerada: ya está en su cueva; puertas y portón cerrados; música o televisión (S10, S11); masticable o comida si los acepta (S4: lo único del manejo asociado a mejoría según los dueños); alguien se queda con él con calma (S10: acompañar y vigilar; S11: mantener la calma); no sacarlo a ver la pólvora ni a la calle.
* `### La cena, las visitas y la puerta` (≈130)
    * Criterio editorial: el 24 y el 31 hay visitas, la puerta se abre y se cierra, los niños salen a reventar. Acordar quién abre; avisar a los invitados de que el perro no sale; que nadie reviente pólvora en el patio ni cerca de la casa (S11: no fomentar la pirotecnia); recoger los restos al día siguiente (S11: algunos perros juegan con ella).
* `### Si busca tus brazos` (≈130)
    * Luna (Costa Rica): con temblores, terremotos y choques, cuando se asusta nos busca y la recogemos (alzarla es lo que hace la familia; el archivo dice que se calma con él). S4: tocar y hablar al perro no se asoció con mejoría, pero tampoco con empeorar. Lectura: si te busca, acompáñalo; si prefiere esconderse, déjalo. **No convertir alzar en consejo:** un perro mayor con dolor puede molestarse y uno asustado puede morder (remisión a Osa, H2-2). No repetir lo de Luna y Dakota que contó el artículo de España (alzarla «desde pequeños», el tono de voz, Dakota boca arriba).

---

### H2-7 — Lo que dice la ley en tu país (y cómo averiguarlo) — Target: ~430 palabras
* *Sustentado en:* S8, S12, S13.
* *Decisión:* **¿se puede reventar pólvora junto a mi casa y a quién llamo?**

* `### Dos ejemplos verificados` (≈220; **tabla**, tres columnas: país / qué dice la norma / qué significa para ti)
    * Chile (S12, Ley 21.310 de 2021): sanciona tener, fabricar, vender y usar fuegos artificiales sin autorización. Lo que significa: los espectáculos autorizados existen; el uso particular sin autorización está sancionado; si pasa junto a tu casa, se puede denunciar (sin detallar a quién: «a la policía o la autoridad local»; no inventar cuerpo policial). 
    * Colombia (S13, Ley 670 de 2001): cada alcaldía decide si permite la pólvora y con qué condiciones; prohibida la venta a menores de edad. Lo que significa: busca el decreto de tu alcaldía de diciembre. En Bogotá, además, hay un formulario para reportar animales afectados (S8).
    * Fila «Otros países»: «No lo hemos verificado; pregunta en tu municipalidad o alcaldía y a los bomberos».
* `### Cómo averiguarlo donde vives` (≈150)
    * Buscar en la web de la municipalidad o alcaldía «pólvora» o «pirotecnia» más el año; preguntar a los bomberos; mirar si la ciudad abre un canal de reportes de animales (como Bogotá). No afirmar que la ley protege a los perros en ningún país no verificado; las dos normas leídas regulan la pólvora por seguridad de las personas (la de Colombia, de los niños), no por los animales.
* `### Si vives en España` (≈40)
    * Una o dos frases con el enlace en contexto a la versión hermana (§5.2 B): ley, calendario y piso con persiana. Sin repetir su contenido.

---

### H2-8 — Si se escapa en el barrio — Target: ~380 palabras
* *Sustentado en:* S8, S9.
* *Decisión:* **¿qué hago antes y en las primeras horas?**

* `### Antes: placa con teléfono` (≈130)
    * S9: placa con nombre y número de teléfono; criterio editorial: un teléfono que conteste esas noches; arnés bien ajustado si sale; microchip recomendable, sin afirmar que sea obligatorio (laguna 4). Una foto reciente en el teléfono.
* `### En las primeras horas` (≈180)
    * S8: la huida y la desorientación fueron el segundo efecto más reportado en Bogotá. Buscar cerca: patios vecinos, bajo vehículos, lotes baldíos, debajo de pilas y escaleras (los perros de Osa se fueron a esconder, no a morder: remisión, sin repetir el relato). Avisar en el grupo de vecinos; llevar su comida y su frazada; no perseguirlo si corre. Preguntar en las veterinarias del barrio.
* `### Al día siguiente` (≈70)
    * Publicar con foto en grupos locales; volver a pasar por donde se perdió al amanecer, cuando hay menos ruido (criterio editorial).

---

### H2-9 — Los consejos que circulan en diciembre — Target: ~420 palabras
* *Sustentado en:* S4, S5, S7, S9.
* *Decisión:* **¿qué de lo que me recomiendan vale la pena?** Formato: **lista «lo que oyes → lo que sabemos»**, no tabla, para no repetir la tabla del artículo de España.

* `### Lo que oyes y lo que sabemos` (≈320)
    * «Déjalo afuera para que se acostumbre»: no; S11 y S5 piden lo contrario (dentro y con zona segura). *(S11 ya va en H2-2; aquí solo remisión.)*
    * «Dale algo para que duerma»: la acepromazina no quita el miedo (remisión a H2-4).
    * «CBD»: S9: solo con receta y no con problemas de hígado.
    * «Feromonas y esencias florales» (el IDPYBA de Bogotá las menciona, S7): en la encuesta de Riemer (S4), entre el 27 % y el 35 % de los dueños las consideró eficaces, que la autora ve compatible con el placebo; es una encuesta, no un ensayo. Pueden acompañar, no sustituyen al refugio ni a la veterinaria. **No contradecir** el artículo publicado de ansiedad por separación ni emitir veredicto sobre ensayos.
    * «Acostumbrarlo con grabaciones»: S4: más del 70 % de los dueños vio útil el contracondicionamiento; S5: desensibilización y contracondicionamiento como plan de fondo; se empieza meses antes y mejor guiado (H2-10).
    * «Que no lo consueles»: S4 (remisión a H2-6).
* `### Antes de comprar` (≈100)
    * Tres preguntas (¿quién lo recomienda y con qué estudio?, ¿es seguro con sus enfermedades?, ¿lo aprobó la veterinaria?). Lo único que no puede faltar no se vende como calmante: placa, arnés y una puerta cerrada.

---

### H2-10 — Después de las fiestas: los días siguientes y el próximo diciembre — Target: ~320 palabras
* *Sustentado en:* S3, S4, S6.
* *Decisión:* **¿se le pasa solo y qué empiezo en enero?**

* `### Los días siguientes` (≈150)
    * S6: casi tres cuartas partes se recuperan a la mañana siguiente; en el 10 % tarda hasta un día, en el 12 % hasta una semana y en más del 3 % semanas o meses (encuesta de dueños). Volver a la veterinaria si sigue escondido, no come, tiene escapes nuevos (enlace a incontinencia si no se usó en H2-3) o rehúye lugares donde oyó la pólvora (S3: generalización en 8 de 10 con dolor).
* `### Enero, para el próximo diciembre` (≈160)
    * S4 y S5: el trabajo de fondo (asociar sonidos bajos con algo que le gusta, subir solo si está tranquilo) lleva meses; enero deja once. Sin volúmenes ni calendarios; mejor con una veterinaria con formación en comportamiento. Anotar qué funcionó esta vez para la consulta del próximo noviembre.

---

### CONCLUSIÓN Y PREGUNTAS FRECUENTES — Target: ~500 palabras (título ≈4 + cierre ≈80 + FAQ ≈416)
* *Cierre (≈80):* qué depende de ti (dentro de casa, consulta a tiempo, cueva, placa y puerta cerrada) y qué no (que los vecinos revienten pólvora). Sin prometer que el miedo desaparezca. Enlace al pilar.
* **`FAQ` (8 preguntas, distintas de las de España; respuestas de 40–55 palabras):**
    ```mdx
    <FAQ items={[
      { question: '¿Puedo dejar a mi perro mayor en el patio el 24 y el 31?', answer: 'Mejor no. La UNAM recomienda no dejar a los animales en patios ni terrazas durante la pirotecnia, y los reportes de Bogotá muestran que la huida es uno de los efectos más frecuentes. Entra a tu perro antes de que empiece el ruido, a un cuarto que ya conozca.' },
      { question: '¿Qué hago si se mete debajo de la cama y no quiere salir?', answer: 'Déjalo ahí. Si encontró un sitio dentro de la casa, ese es su refugio esa noche. No lo jales, no lo regañes y no metas la mano si está muy asustado: puede morder. Cierra las puertas que dan a la calle y quédate cerca con calma.' },
      { question: '¿Sirve la acepromazina para la pólvora?', answer: 'No para el miedo. El Colegio de Médicos Veterinarios de Costa Rica y la sociedad europea de etología clínica la desaconsejan: deja al perro quieto, pero sigue oyendo y sintiendo miedo. Si necesita un medicamento, lo decide tu veterinaria después de revisarlo.' },
      { question: '¿Le puedo dar CBD a mi perro para la pólvora?', answer: 'Solo con receta veterinaria. El Colegio de Médicos Veterinarios de Costa Rica advierte que no se use sin indicación y que no se dé a perros con problemas de hígado. En un perro mayor, que la veterinaria revise antes qué otros medicamentos toma.' },
      { question: '¿Por qué mi perro se orinó del miedo?', answer: 'El miedo intenso puede provocar escapes de orina o de heces. No lo regañes; limpia después, cuando esté tranquilo. Si los escapes siguen en los días siguientes o ya los tenía antes, consúltalo con tu veterinaria, porque en un perro mayor pueden tener otras causas.' },
      { question: '¿Hace falta ventilador si lo encierro en un cuarto?', answer: 'Si hace calor, sí conviene. En diciembre, buena parte de la región está en verano o en temporada calurosa, y un cuarto cerrado se calienta. Usa un ventilador fuera de su alcance, sin cables por el suelo, y deja agua fresca. Si jadea mucho, revisa la temperatura.' },
      { question: '¿Es ilegal reventar pólvora en mi país?', answer: 'Depende del país y de la ciudad. En Chile, usar fuegos artificiales sin autorización está sancionado; en Colombia, cada alcaldía decide si los permite. Para otros países no lo hemos verificado: pregunta en tu municipalidad o alcaldía, o a los bomberos.' },
      { question: '¿Qué hago si se escapó con la pólvora?', answer: 'Búscalo cerca: patios vecinos, bajo vehículos y en rincones oscuros. Avisa en el grupo de vecinos y en las veterinarias del barrio, lleva su comida y no lo persigas si corre. Por eso la placa con tu teléfono debe estar puesta antes de la noche.' }
    ]} />
    ```
    *(Borradores; el redactor ajusta sin añadir dosis ni promesas y vuelve a contar.)*

## 7. POTENCIAL DE AFILIADOS / CONVERSIÓN

* Solo seguridad: placa identificativa y arnés ajustable (H2-8, H2-6), declarados. **Nunca** enlaces junto a CBD, feromonas, esencias florales o «calmantes» (H2-9).

## 8. GUÍA VISUAL — 3 PROMPTS DE IMAGEN

Aplicar la [dirección visual editorial](../.agents/skills/references/direccion-visual-editorial.md) y su **requisito senior verificable**. No se ha generado ninguna imagen.

### Criterio anti-«IA genérica» (preferencia del propietario, 2026-10-25)

* **Paleta propia por escena:** la portada con la luz de colores de las series navideñas y destellos verdes, blancos y violetas de pólvora lejana sobre paredes verde agua; el patio en luz rasante de tarde, cemento y lámina; la cocina con luz de fluorescente cálido y mantel de plástico. Sin dorado de catálogo.
* **Cámara y grano:** reportaje, 28–50 mm, ISO alto con grano fino visible, sin viñeteado, sin resplandor suave, sin HDR.
* **Contexto latinoamericano reconocible sin postal ni bandera:** piso de cerámica, block repellado y pintado, ventana de celosías, silla plástica, nacimiento con musgo y serie de luces, pila de cemento, portón de lámina, tendedero, macetas en latas. **Sin sombreros, sarapes, piñatas ni tópicos.**
* **Imperfecciones de uso:** desconchado en la pintura, una chancleta suelta, una mancha de humedad.
* **Personas reales:** edad, ropa y gesto concretos; manos con cinco dedos.

Las dos líneas finales de cada prompt son instrucciones para quien genera y no se pintan. Cada prompt añade «sin texto, letras ni marcas».

### Razas recientes y elección

**Comprobado el 2026-10-26:** registro de la dirección visual (podenco, labrador chocolate, golden, cocker, beagle, San Bernardo, dogo argentino, pastor alemán, bóxer, caniche miniatura, schnauzer, teckel, galgo español, setter gordon, mestizo pastor-mastín atigrado) y el artículo publicado de petardos (**bodeguero andaluz**, que falta en la tabla del registro: se añade con este brief).

**Elección: mestizo criollo mediano, ilustrativo.** Motivo para repetir la categoría «mestizo» (la leishmaniosis usó un mestizo pastor-mastín atigrado, grande y oscuro): (1) el perro de patio más reconocible para el lector latinoamericano, el «zaguate», «aguacatero» o «criollo», es un mestizo mediano de pelo corto, y la escena del patio no es creíble con un perro de raza pequeña de apartamento; (2) el tipo, el tamaño y el color son distintos (canela claro con máscara negra frente a atigrado oscuro); (3) la máscara negra hace que las canas del hocico se lean a tamaño móvil. No se usa beagle (Luna y Dakota): el sujeto es ilustrativo y el propietario no pidió retratarlas.

### Sujeto fijo (ilustrativo) — nombrado en los 3 prompts

**Mestizo criollo, macho de unos 12 años y 16 kg, de pelo corto color canela claro (leonado), con máscara negra en el hocico y alrededor de los ojos, una mancha blanca pequeña en el pecho, orejas semierguidas con la punta doblada hacia delante, cola en hoz poco poblada, sin amputar.** Collar de nailon rojo liso con una placa metálica redonda **sin texto legible**.

### Bloque de edad visible (se copia ÍNTEGRO en cada prompt)

> **Edad visible, todos estos rasgos a la vez:** canas en el hocico, en las cejas y en los párpados (la máscara negra del hocico y de alrededor de los ojos está muy salpicada de gris plateado, y las cejas se ven claras); ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular, costillas y pelvis discretas, sin delgadez extrema; postura natural de perro mayor, con la cabeza a la altura del lomo o algo baja, apoyos prudentes y sin poses atléticas. **Sin enfermedad inventada:** sin cojera, heridas, costras, calvas, ojos rojos, jadeo extremo ni sufrimiento. **Rechazar si a tamaño móvil parece un adulto joven.**

### Ficha por imagen

| Decisión | Imagen 1 — Hero: la cueva bajo la mesa, noche del 24 | Imagen 2 — Del patio a la casa, tarde del 24 | Imagen 3 — La placa antes de la noche |
|---|---|---|---|
| Función y sección | Enseñar un refugio interior y un miedo moderado acompañado sin forzar; `heroImage`, ancla de H2-5 | Enseñar a entrar al perro antes del ruido, caminando y con correa floja; H2-2, `### Cómo hacer que entre sin jalarlo` | Enseñar la placa con teléfono puesta antes de la noche; H2-8, `### Antes: placa con teléfono` |
| Entorno | Comedor de una casa de una planta en un barrio centroamericano | Patio de cemento de la misma casa | Cocina de la misma casa |
| Detalles | Piso de cerámica beige de 30 cm con una junta rota; pared de block repellado verde agua con un desconchado; ventana de celosías de vidrio cerradas con cortina floreada corrida; nacimiento con musgo y serie de luces de colores sobre un mueble al fondo; ventilador de techo | Pila de cemento con lavadero a la izquierda; tendedero con ropa; portón de lámina verde cerrado con candado al fondo; macetas en latas; puerta trasera de metal con reja abierta a la derecha | Mesa con mantel de plástico de cuadros; refrigeradora con imanes (sin texto); silla plástica; olla en la cocina de gas |
| Sujeto | Mestizo fijo; **primera imagen, referencia de las otras dos** | Mismo perro; imagen 1 como referencia | Mismo perro; imagen 1 como referencia |
| Edad visible | Bloque íntegro; echado, cabeza apoyada | Bloque íntegro; caminando con cabeza a la altura del lomo | Bloque íntegro; sentado |
| Miedo | **Sí, moderado:** base de las orejas hacia atrás, cuerpo recogido, mirada atenta hacia la ventana. **No:** temblor, jadeo, ojos desorbitados | Orejas relajadas, cola neutra (aún no hay ruido) | Ninguno: tranquilo, olfatea la mano |
| Acción y espacio | Mesa de comedor de madera con una sábana blanca que cuelga por los lados izquierdo, derecho y trasero; el frente, hacia la cámara, queda abierto; el perro echado de pecho sobre una frazada doblada bajo la mesa, **de frente a la cámara con la cabeza girada hacia la derecha del encuadre**, donde está la ventana; una mujer de unos 60 años, pelo canoso recogido, blusa de algodón estampada, sentada en una silla plástica blanca **a la izquierda del encuadre, a más de un metro**, con las manos en el regazo, mirando al perro, sin tocarlo | **Cámara a la altura del lomo, perpendicular a la marcha:** el tutor (hombre de unos 35 años, camiseta gris, pantalón de mezclilla, sandalias) y el perro avanzan juntos **de izquierda a derecha** hacia la puerta trasera abierta; la cámara ve su costado derecho; **el perro va a la derecha del tutor, más cerca de la cámara**; el tutor lleva el asa de la correa en la **mano derecha** y la correa cae floja en J hasta el arnés | Primer plano medio: la tutora (mujer de unos 55 años, delantal de cocina, anillo de casada) sentada en la silla plástica, inclinada hacia el perro, engancha con las dos manos la placa redonda a la argolla del collar rojo; el perro sentado frente a ella, **de perfil mirando hacia la izquierda del encuadre**, olfatea su muñeca |
| Cámara y luz | 35 mm, a la altura del perro, ISO 3200, grano visible; luz de las series del nacimiento (fondo) y una lámpara de pie cálida a la izquierda; destellos verdes, blancos y violetas que se cuelan por la cortina (derecha) | 28–35 mm, ISO 800; sol bajo de las 5 de la tarde, sombras largas del tendedero sobre el cemento | 50 mm, luz de tubo fluorescente del techo y luz de ventana lateral; grano fino |
| Excluir | Fuegos visibles, humo, persona tocando al perro, cables en el suelo, velas, texto, perro joven | Jalar, correa tensa, perro arrastrado, sentidos de marcha opuestos, pólvora en el patio, texto, perro joven | Texto legible en la placa o en la refrigeradora, teléfono en pantalla, perro joven |
| Aceptación | A 390 px: se lee la cueva con salida libre, la mujer a distancia y los destellos; cinco rasgos de edad | A 390 px: los dos avanzan en la misma dirección hacia la puerta; correa floja; el perro del lado de la cámara | A 390 px: se ve qué hacen las manos con la placa; cinco rasgos |
| Escena segura | Sin cables ni velas a la altura del perro; ventana cerrada | Portón cerrado; nada de pólvora a la vista | Sin cuchillos ni ollas al alcance |
| Imagen–pie–alt | «Refugio bajo la mesa con salida libre» | «Entrarlo antes del ruido, con correa floja» | «Placa con teléfono antes de la noche» |

### Imagen 1 — Hero: la cueva bajo la mesa (inserción: `heroImage`)
- **Archivo:** `mestizo-senior-cueva-bajo-mesa-nochebuena-v1.webp`. Originales en `docs/contenido/miedo-polvora-perros-mayores/originales/`.
- **Prompt:** Imagen editorial para un artículo sobre el miedo a la pólvora en perros mayores en Latinoamérica; debe dejar ver cómo es un refugio interior bien preparado y cómo se acompaña a un perro asustado sin forzarlo. **Mestizo criollo, macho de unos 12 años y 16 kg, de pelo corto color canela claro (leonado), con máscara negra en el hocico y alrededor de los ojos, una mancha blanca pequeña en el pecho, orejas semierguidas con la punta doblada hacia delante y cola en hoz poco poblada, sin amputar.** Edad visible, todos estos rasgos a la vez: canas en el hocico, en las cejas y en los párpados (la máscara negra del hocico y de alrededor de los ojos está muy salpicada de gris plateado, y las cejas se ven claras); ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular, costillas y pelvis discretas, sin delgadez extrema; postura natural de perro mayor, con la cabeza a la altura del lomo o algo baja, apoyos prudentes y sin poses atléticas; sin cojera, heridas, costras, calvas, ojos rojos, jadeo extremo ni sufrimiento. Collar de nailon rojo liso con una placa metálica redonda sin texto legible. Comedor de una casa de una planta en un barrio centroamericano, de noche, el 24 de diciembre: piso de cerámica beige de 30 cm con una junta rota, pared de block repellado pintada verde agua con un desconchado junto al zócalo, ventana de celosías de vidrio cerradas a la derecha del encuadre, cubierta por una cortina de tela floreada corrida, por la que se cuelan destellos intermitentes verdes, blancos y violetas de pólvora lejana; al fondo, sobre un mueble de madera, un nacimiento pequeño con musgo y una serie de luces de colores encendida; un ventilador de techo gira despacio. Una mesa de comedor de madera tiene una sábana blanca de algodón que cuelga hasta el suelo por los lados izquierdo, derecho y trasero, y deja el frente abierto hacia la cámara: es una cueva. Dentro, el perro está echado de pecho sobre una frazada de cuadros doblada, con las patas delanteras estiradas y la cabeza apoyada sobre ellas, de frente a la cámara y con la cabeza girada hacia la derecha del encuadre, hacia la ventana; la base de las orejas algo echada hacia atrás, el cuerpo recogido, la boca cerrada, sin temblor. Junto a él, un traste de agua de acero y un hueso de goma. A la izquierda del encuadre, a más de un metro de la mesa, una mujer de unos 60 años, pelo canoso recogido, blusa de algodón estampada y sandalias, sentada en una silla plástica blanca, con las manos en el regazo, mira al perro con calma, sin tocarlo; se le ve de cuerpo entero sentada, con el rostro de perfil tres cuartos. Cámara a la altura del perro, plano medio-general, objetivo de 35 mm, ISO 3200 con grano fino visible; luz cálida de una lámpara de pie fuera de campo a la izquierda, luz de colores de la serie del nacimiento al fondo y los destellos de la cortina a la derecha; sombras coherentes; texturas de pelo corto, algodón, cerámica y pintura mate; profundidad de campo que mantenga nítidos al perro, la sábana y las manos de la mujer. Acabado documental natural, sin pose publicitaria, sin viñeteado, sin resplandor suave, sin HDR, color de saturación contenida, con pequeñas imperfecciones de uso (una chancleta suelta, el desconchado). Evitar fuegos artificiales visibles, humo, persona que toca o jala al perro, cables por el suelo, velas, bokeh de bombillas, sombreros, banderas o tópicos, texto, letras o marcas dentro de la imagen, y perro de aspecto joven. *Instrucciones para quien genera, sin pintarlas:* ilustración generada, no representa a un paciente. **Rechazar si a tamaño móvil parece un adulto joven.**
- **Alt (idéntico al frontmatter):** Ilustración de un perro mestizo senior de color canela echado en un refugio hecho con una sábana bajo la mesa del comedor, en una casa iluminada por luces de Navidad; una mujer sentada lo acompaña a distancia.
- **Pie (`heroImageCaption`):** Un refugio dentro de la casa, preparado antes de la noche: oscuro, conocido y con la salida libre.

### Imagen 2 — Del patio a la casa (inserción: H2-2, `### Cómo hacer que entre sin jalarlo`)
- **Archivo:** `mestizo-senior-entra-del-patio-v1.webp`.
- **Prompt:** Imagen editorial para H2-2; debe dejar ver que al perro se le entra a la casa antes de la pólvora, caminando y con la correa floja, sin jalarlo. **El mismo mestizo criollo, macho de unos 12 años y 16 kg, pelo corto canela claro con máscara negra en el hocico y alrededor de los ojos, mancha blanca pequeña en el pecho, orejas semierguidas con la punta doblada hacia delante, cola en hoz poco poblada, tal como en la imagen de referencia.** Edad visible, todos estos rasgos a la vez: canas en el hocico, en las cejas y en los párpados (la máscara negra del hocico y de alrededor de los ojos está muy salpicada de gris plateado, y las cejas se ven claras); ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular, costillas y pelvis discretas, sin delgadez extrema; postura natural de perro mayor, con la cabeza a la altura del lomo o algo baja, apoyos prudentes y sin poses atléticas; sin cojera, heridas, costras, calvas, ojos rojos, jadeo extremo ni sufrimiento. Collar de nailon rojo liso con placa metálica redonda sin texto legible y arnés de nailon negro ajustado. Patio de cemento de una casa de una planta, a las 5 de la tarde del 24 de diciembre, sol bajo: a la izquierda, una pila de cemento con lavadero; un tendedero con ropa de colores cuyas sombras largas caen sobre el cemento; al fondo, un portón de lámina pintado de verde, cerrado con candado; macetas hechas con latas con plantas; a la derecha del encuadre, la puerta trasera de la casa, de metal con reja, abierta hacia dentro. La cámara, a la altura del lomo del perro y perpendicular a la marcha, ve el costado derecho de las dos figuras: el tutor, hombre de unos 35 años, camiseta gris, pantalón de mezclilla y sandalias, y el perro avanzan juntos de izquierda a derecha del encuadre hacia la puerta abierta, con hombros, caderas, pasos y la mirada del perro orientados hacia la puerta. El perro camina a la derecha del tutor, más cerca de la cámara, a su paso, con la cabeza a la altura del lomo, las orejas relajadas y la cola en posición neutra, sin tirar ni frenar. El tutor lleva el asa de la correa en la mano derecha y la correa, de nailon negro de 1,2 m y no extensible, cae floja en forma de J hasta la anilla del arnés sobre el lomo. Plano que deja entero al perro y recorta al tutor por el pecho (sin cara), objetivo de 28–35 mm, ISO 800, grano fino; luz rasante cálida de tarde con sombras largas coherentes hacia la izquierda; texturas de cemento, lámina pintada, algodón y pelo corto. Acabado documental natural, sin viñeteado ni resplandor suave, color de saturación contenida. Evitar correa tensa, perro arrastrado o frenando, sentidos de marcha opuestos, pólvora o humo, otros animales, texto, letras o marcas dentro de la imagen y perro de aspecto joven. *Instrucciones para quien genera, sin pintarlas:* ilustración generada, no representa a un paciente. **Rechazar si a tamaño móvil parece un adulto joven.**
- **Alt:** Ilustración de un hombre y un perro mestizo senior de color canela que caminan juntos por un patio de cemento hacia la puerta de la casa, con la correa floja sujeta al arnés.
- **Pie:** Entrarlo antes de que empiece el ruido, caminando y con la correa floja, es más fácil que sacarlo de debajo de una cama después.

### Imagen 3 — La placa antes de la noche (inserción: H2-8, `### Antes: placa con teléfono`)
- **Archivo:** `mestizo-senior-placa-collar-cocina-v1.webp`.
- **Prompt:** Imagen editorial para H2-8; debe dejar ver que la placa con nombre y teléfono se pone antes de la noche. **El mismo mestizo criollo, macho de unos 12 años y 16 kg, pelo corto canela claro con máscara negra en el hocico y alrededor de los ojos, mancha blanca pequeña en el pecho, orejas semierguidas con la punta doblada hacia delante, cola en hoz poco poblada, tal como en la imagen de referencia.** Edad visible, todos estos rasgos a la vez: canas en el hocico, en las cejas y en los párpados (la máscara negra del hocico y de alrededor de los ojos está muy salpicada de gris plateado, y las cejas se ven claras); ojos marrones algo hundidos, con párpados algo caídos y mirada serena (sin velo ni catarata); lomo con la línea dorsal ligeramente hundida tras la cruz, hombros y cuartos traseros con menos masa muscular, costillas y pelvis discretas, sin delgadez extrema; postura natural de perro mayor, con la cabeza a la altura del lomo o algo baja, apoyos prudentes y sin poses atléticas; sin cojera, heridas, costras, calvas, ojos rojos, jadeo extremo ni sufrimiento. Cocina de la misma casa, de tarde: mesa con mantel de plástico de cuadros rojos y blancos, refrigeradora blanca con imanes de colores sin texto, cocina de gas con una olla tapada al fondo, silla plástica blanca, piso de cerámica beige. La tutora, mujer de unos 55 años, pelo negro con canas recogido, delantal de tela sobre una blusa lila y anillo de casada, está sentada en la silla e inclinada hacia el perro, y con las dos manos engancha una placa metálica redonda, sin texto legible, a la argolla del collar de nailon rojo. El perro está sentado frente a ella sobre el piso, de perfil mirando hacia la izquierda del encuadre, con el cuello relajado, y olfatea su muñeca. Primer plano medio que deja ver las manos, la placa y la cabeza del perro, objetivo de 50 mm, ISO 1600, grano fino; luz de un tubo fluorescente del techo de tono cálido y luz de ventana lateral desde la derecha; sombras suaves coherentes; texturas de plástico, metal, algodón y pelo corto. Acabado documental natural, sin viñeteado ni resplandor suave, color de saturación contenida. Evitar texto legible en la placa, en la refrigeradora o en cualquier objeto, teléfono con pantalla, cuchillos al alcance, perro tenso y perro de aspecto joven. *Instrucciones para quien genera, sin pintarlas:* ilustración generada, no representa a un paciente. **Rechazar si a tamaño móvil parece un adulto joven.**
- **Alt:** Ilustración de una mujer que engancha una placa metálica al collar rojo de un perro mestizo senior de color canela, sentado en la cocina.
- **Pie:** La placa con tu teléfono, puesta antes de la noche: si se escapa, es lo primero que mirará quien lo encuentre.

### Recortes y animaciones
No aplica: ningún apoyo requiere al perro y el propietario no pidió animaciones.

## 9. CONTRATO DE ENTREGA — NO NEGOCIABLES

**1. Volumen real:** entre **5.300 y 6.000 palabras** (target 5.700), contadas sobre el `.mdx` con H2, H3, tabla, `AlertBox` con título y FAQ con preguntas; sin frontmatter, imports, `<img>`, pies ni tarjeta de versiones. Por sección, ±10 % del §6. Si no se llega sin relleno, parar y consultar; si se pasa, recortar.

**2. Fuentes citadas por nombre en su H2:**

| # | Fuente | H2 asignado | ¿Citada? |
|---|---|---|---|
| S1 | Salonen et al. 2020 | H2-1 | ☐ |
| S2 | Gähwiler et al. 2020 | H2-3 | ☐ |
| S3 | Lopes Fagundes et al. 2018 | H2-4, H2-10 | ☐ |
| S4 | Riemer 2020 (encuesta de tratamientos) | H2-6, H2-9, H2-10 | ☐ |
| S5 | ESVCE 2026 | H2-2, H2-4, H2-5, H2-9 | ☐ |
| S6 | Riemer 2019, *PLOS ONE* | H2-1, H2-10 | ☐ |
| S7 | IDPYBA Bogotá 2024 | H2-1, H2-9 | ☐ |
| S8 | Alcaldía de Bogotá, reportes del 24–25 dic. 2025 | H2-1, H2-7, H2-8 | ☐ |
| S9 | COLVET según El Delfino (2024) | H2-4, H2-5, H2-6, H2-8, H2-9 | ☐ |
| S10 | COLVET según Teletica (2022) | H2-4, H2-5, H2-6 | ☐ |
| S11 | FMVZ-UNAM según N+ (2024) | H2-2, H2-6 | ☐ |
| S12 | Chile, Ley 21.310 | H2-7 | ☐ |
| S13 | Colombia, Ley 670 de 2001 | H2-7 | ☐ |

**3. Componentes:**
- [ ] 3 `AlertBox`: `info` (introducción), `danger` (H2-3), `warning` (H2-4). Ni más ni repetidos.
- [ ] 1 `FAQ` con las 8 preguntas del §6.
- [ ] 1 tabla (H2-7) en `<TablaApilable … compacta>` con `data-label`.
- [ ] Enlaces del §5.1, incluido el enlace en contexto a la versión de España en H2-7.
- [ ] 3 imágenes con alt y pie del §8 bajo `/images/blog/miedo-polvora-perros-mayores/`.
- [ ] Tarjeta de versiones **solo** si el componente existe en `main` (§5.2 A).

**4. Testimonios** (solo del archivo de testimonios):
- [ ] Declarados en la introducción como recuerdos, con país la primera vez.
- [ ] Cada hecho en un solo H2 (reparto del §6).
- [ ] **Osa:** sin edad, sin «mayor», sin desenlace; lo que hacía la familia (jalar, regañar, mojar) contado sin juicio y sin presentarlo como pauta.
- [ ] **Baltor:** «se orinó o se defecó (no recuerdo cuál)»; la duda del piso de arriba, como duda del propietario.
- [ ] **Luna:** temblores, terremotos y choques; busca a la familia; nada de lo contado en el artículo de España.
- [ ] **Dakota:** solo la aclaración sobre la pólvora en Costa Rica; sin salud ni episodio de 2025.
- [ ] Hipótesis del propietario atribuidas como suyas. Nada fuera del archivo.

**5. Anticanibalización con la versión de España (verificable):**
- [ ] Ninguna pregunta de la FAQ coincide ni parafrasea una de las 8 del artículo de España.
- [ ] Ningún H2 ni H3 repite un título del artículo de España.
- [ ] «Petardos» no aparece en H1, slug, seoTitle, meta ni H2.
- [ ] Coincidencia textual: ninguna secuencia de **8 palabras seguidas** compartida con `miedo-petardos-perros-mayores.mdx`, salvo nombres de estudios y citas literales de fuentes. Comprobar con:
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
- [ ] La tabla de la encuesta de Riemer no se repite; las cifras de S4 en H2-9 van en una lista.

**6. Español neutro:** tú y ustedes; ni vosotros ni voseo; vocabulario del §2; sin españolismos (piso, coger, pienso, chapa, vosotros).

**7. Seguridad clínica y editorial (12):**
1. Sin dosis, pautas ni calendarios de fármacos; sin nombres de fármacos aprobados ni marcas.
2. Acepromazina: desaconsejada con S10 y S5. Calmantes de personas: no.
3. CBD: solo lo que dice S9 (receta; no con problemas de hígado).
4. Cifras de S4 y S6 como «según los dueños de la encuesta».
5. Cifras de Bogotá como reportes de una ciudad, con «presuntamente» o «reportados»; nunca «en Latinoamérica».
6. Leyes: solo Chile y Colombia, sin penas ni cuantías; el resto «no verificado».
7. No afirmar que el microchip sea obligatorio en ningún país.
8. No afirmar que el techo de lámina amplifique el ruido.
9. No recomendar alzar, jalar, regañar, mojar ni amarrar al perro; lo de Osa y Luna es vivencia con su riesgo dicho.
10. No prometer que el miedo desaparezca.
11. Señales de urgencia junto a la lista, en el `danger`.
12. Sin cifras de audición ni el «20 % de perros perdidos».

**8. Voz y tono:** `tono.py` ≤3 muletillas por 1.000 (objetivo 0). Primera persona para lo que vio el propietario; «nosotros» para la familia.

## 10. CHECKLIST DEL BRIEF (antes de redactar)

- [x] Frontmatter completo; `pilar` válido; `heroImageCaption` existe en el esquema.
- [x] seoTitle 55 (≤55) y meta 156 (≤160), contados con Python.
- [x] 13 fuentes con URL profunda y fecha; verificaciones parciales marcadas (S4, S9, S10, S11).
- [x] Enlaces internos publicados; calculadora omitida con motivo.
- [x] Canibalización analizada (§2) y contrato verificable (§9.5).
- [x] Suma de targets = 5.700.
- [x] Matriz fuente→H2 idéntica en §3, §6 y §9.2.
- [x] Raza declarada con motivo; tres prompts con el bloque de edad íntegro y la línea de rechazo.
- [x] Testimonios con procedencia y reparto.

## 11. RECURSOS PROMETIDOS Y GATES

| Recurso | Ubicación | Estado | Prueba previa |
|---|---|---|---|
| Tabla de leyes | H2-7 | Planificada; redactor | Ver a 390 px |
| Lista de 6 pasos | H2-6 | Planificada | Sin fármacos ni horarios de toma |
| Lista «lo que oyes → lo que sabemos» | H2-9 | Planificada | Cada cifra contra S4 |
| 3 imágenes | Portada, H2-2, H2-8 | Planificadas; sesión visual | 390 px, cinco rasgos de edad, dirección de marcha, correa floja, placa sin texto |
| Tarjeta de versiones | Tras la introducción | **Decisión del propietario** (§5.2) | PR de código aparte; móvil, modo oscuro y lector de pantalla |

- [ ] Decisión del propietario sobre la tarjeta (A, B o C del §5.2).
- [ ] Verificaciones parciales cerradas o limitadas (S4 publicado, S9–S11 originales).
- [ ] Antes de publicar, volver a abrir S12 y S13 por si hubo reformas en 2026.
- [ ] Comprobación de coincidencia textual (§9.5) con 0 resultados o solo citas.
- [ ] `npx astro build` sin errores.
- [ ] Máximo tres rondas de auditoría.

## Historial de auditoría

| Ronda | Fecha | Auditor | Veredicto | Hallazgos | Estado |
|---|---|---|---|---|---|
| — | — | — | — | — | Pendiente R1 |
