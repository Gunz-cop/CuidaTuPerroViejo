# Auditoría independiente del brief LA-01 · Ronda R1

- **Documento auditado:** `briefings/briefing-miedo-polvora-perros-mayores.md` (v1 del 2026-10-26), commit `97f0e0e`, blob `b5317e92c714eacc945ff68d00bce2675d630ec1`.
- **Rama:** `claude/brief-miedo-polvora-perros-mayores-latam`.
- **Ronda:** R1 de un máximo de 3.
- **Fecha:** 2026-10-26.
- **Método:** skill `auditar-briefing-contenido`, con `calidad-editorial-adsense.md`, `guia-voz-tono.md`, `direccion-visual-editorial.md` y `generar-briefing-contenido` como norma. El auditor no generó ni corrigió este brief. No modifiqué ningún archivo salvo este informe.
- **Alcance de la verificación:** abrí las siete fuentes nuevas (S7–S13) con `curl` a través del proxy, sin desactivar TLS. Todas respondieron 200. Leí el texto completo de S2 (PMC7525486) y el resumen de S4 en Europe PMC para comprobar dos afirmaciones nuevas. Comparé S1–S6 con el §3 del brief de España. Contrasté los testimonios con `docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md` y con el `.mdx` publicado de España. También abrí la Ley 2224 de 2022 de Colombia, porque la página de S13 enlaza a ella.

## Veredicto

**NO APTO** (no válido para redacción). El brief promete que no repetirá hechos ni enfoques del artículo de España, pero luego ordena repetirlos. Además, dos instrucciones del §6 harían que el artículo afirmara cosas que sus fuentes no dicen: atribuye el 70 % a las grabaciones y presenta la ley colombiana sin su reforma de 2022.

Recuento: **0 P0 · 5 P1 · 4 P2 · 8 P3.**

## Hallazgos

### P1. Degradan el contrato y pasarían al artículo

**P1-1. Los testimonios «nuevos» de Luna y Dakota ya están en el artículo de España.**
- *Ubicación:* decisión 3 del encabezado; §2, bullets de Luna y Dakota; tabla de canibalización del §2, fila «Testimonios»; §6, H2-1 `### Cerca, sin aviso y durante horas` y H2-6 `### Si busca tus brazos`; §9.4.
- *Evidencia:* el brief dice: «De Luna y Dakota se usan **solo hechos que el artículo de España no contó**: los temblores y terremotos de Luna y la aclaración de Dakota sobre cuánta pólvora hay en Costa Rica». En la tabla añade: «Ningún hecho contado dos veces, salvo una frase opcional de la perra vecina». Sin embargo, el `.mdx` publicado ya contiene esto:
  - línea 104: «En Costa Rica, por nuestra experiencia, no se acostumbra a tirar muchos petardos: la pirotecnia suele ser más de luces.» Es la misma aclaración de Dakota.
  - línea 328: «En casa, ante un susto cualquiera, Luna nos busca y yo la cojo en brazos […] se calma y se relaja conmigo.» El H2-6 del brief manda contar «nos busca y la recogemos» y «el archivo dice que se calma con él».
  - línea 107: «Mi impresión es que, ante demasiada pirotecnia, los perros buscan un lugar menos ruidoso.» Es la misma hipótesis que el H2-2 permite repetir con la perra vecina.
- *Por qué importa:* el redactor tiene dos instrucciones incompatibles. El §9.4 dice «nada de lo contado en el artículo de España», pero el §6 le manda contarlo. De Luna, lo único nuevo es nombrar «temblores, terremotos y choques». De Dakota no queda nada nuevo.
- *Corrección:* en el H2-1, quitar el testimonio de Dakota o reducirlo a una remisión sin el hecho. En el H2-6, dejar de Luna solo «con temblores, terremotos y choques nos busca». Quitar «la recogemos» y «se calma con él», o declararlos como repetición aceptada y pedir aprobación al propietario. Corregir la decisión 3, la fila «Testimonios» y el §9.4 para que digan lo mismo que el §6.

**P1-2. Hay hechos añadidos o con la incertidumbre borrada en Osa y Baltor.**
- *Ubicación:* §2, bullets de Osa y Baltor, y aportación (d); §6, H2-2 `### Lo que recuerdo de Osa` y `### Si es bravo o muerde cuando tiene miedo`; título del H2-3.
- *Evidencia:*

| Brief | Archivo de testimonios |
|---|---|
| «Al abrir el portón, a veces salían disparados, y una vez salieron y se fueron a esconder» (H2-2); «al abrir el portón a veces salían disparados y se escondían» (§2) | «**no recuerda con seguridad** si se escapó. **Cree** que a veces, al abrir el portón, los perros salían disparados» (l. 67) |
| «el miedo que se queda **quieto** en un cuarto y **se orina** (Baltor)» (§2 d); H2-3 «el que **no se mueve**» | «no salía de las habitaciones […] no huía: se quedaba dentro»; «**una vez** se orinó o se defecó»; «los dos perros se escondían» (l. 86-87). El archivo no dice en ningún sitio que estuviera quieto. |
| H3 «Si es bravo o muerde cuando tiene miedo» + «Osa era brava» | «muy brava: **si salía a la calle** podía morder a alguien» (l. 66). El archivo no dice que mordiera por miedo. |

- *Por qué importa:* la depuración del testimonio solo puede tocar la forma. Convertir «cree que a veces» en un hecho, convertir un episodio único en un patrón («se orina») y atribuir a Baltor una conducta que no consta («quieto») son añadidos. El encargo los clasifica como P1. Si el propietario considera que alteran el relato, el caso del portón podría subir a P0 según la taxonomía.
- *Corrección:* en el §2 y el H2-2, escribir «no recuerda con seguridad si se escapaban; cree que a veces, al abrir el portón, salían disparados, y que una vez salieron y fueron a esconderse». En el §2 (d), poner «el que no sale del cuarto y se esconde, y una vez se orinó o se defecó del miedo». Cambiar el título del H2-3 por uno que no diga «no se mueve», por ejemplo «El que se esconde, el que aúlla y el que no sale del cuarto». La idea de que un perro quieto también puede tener miedo debe apoyarse solo en S2, no en Baltor. En el H3 de Osa, dejar escrito que «brava» se refiere a la calle y que el archivo no dice que mordiera por miedo.

**P1-3. La diferenciación con España no se cumple en señales, consuelo, FAQ y H3, y el §9.5 no permite verificarla.**
- *Ubicación:* tabla de canibalización del §2 (filas «Señales» y «FAQ»); §6, H2-3, H2-6 y FAQ; §9.5.
- *Evidencia:*
  - **Señales.** El §2 dice: «Gähwiler se usa para "esconderse no se confirmó": otro ángulo». El artículo de España ya dice: «La mayoría ni se escondía ni vocalizaba en el fragmento observado. Un perro puede necesitar ayuda aunque permanezca a la vista y calle» (l. 97). Es exactamente la idea que el brief asigna a `### Quieto no quiere decir tranquilo`.
  - **Consuelo.** El H3 de España `### Consolar: qué hacemos nosotros y qué dice la encuesta` combina Luna con S4 («Tocar, hablar y acariciar no se asociaron con mejoría»). El brief combina lo mismo en `### Si busca tus brazos`.
  - **FAQ.** Tanto el §2 como el §9.5 exigen «Ninguna pregunta repetida ni parafraseada». Hay dos paráfrasis claras:
    - «¿Es ilegal reventar pólvora en mi país?» frente a «¿Es legal lanzar petardos cerca de mi perro?»
    - «¿Qué hago si se escapó con la pólvora?» frente a «¿Qué hago si se escapa durante los petardos?»
  - **H3 casi idénticos.** El §9.5 prohíbe repetir títulos, pero el brief propone estos:

| Brief | España |
|---|---|
| Si el miedo es nuevo, que revise dolor | Si el miedo es nuevo: lo que conviene descartar |
| Lo que puede proponer y lo que no conviene | Qué puede proponer el veterinario y por qué se mira con lupa |
| Señales que piden veterinaria de urgencia | Señales que piden veterinario enseguida |
| Por la tarde | Por la tarde: paseo, comida y puertas |
| En las primeras horas | Las primeras horas |
| Ensayarlo con días de margen | Cómo ensayarlo con semanas de antelación |
| Cómo averiguarlo donde vives | Cómo averiguar las normas de tu ayuntamiento |
| Los días siguientes | (H2) Después de la noche: cómo vigilar los días siguientes |

  - **Esqueleto.** Ocho de los diez H2 siguen el mismo orden que España: por qué asusta, señales, consulta, refugio, la noche, ley, escape, productos y después. Lo realmente propio es el H2-2 (patio), las fuentes regionales, la ley por país y el calor.
- *Por qué importa:* el §9.5 solo comprueba títulos literales y secuencias de 8 palabras. Las paráfrasis de arriba lo pasan sin problema y siguen compitiendo por las mismas búsquedas. El propio borrador de FAQ ya incumple la regla que el contrato impone.
- *Corrección:* sustituir las dos preguntas de FAQ parafraseadas por otras que solo tengan sentido en esta versión. Por ejemplo: «¿Dónde reporto un animal afectado por pólvora en Bogotá?» y «¿Mi perro mayor puede dormir en el patio el resto de diciembre?». Renombrar los ocho H3 de la tabla con un enfoque regional. En el H2-3, apoyar el ángulo propio en algo que España no usa: S10 cita la pérdida de control de esfínteres, y S11 recoge que a algunos perros la tensión «puede paralizar por completo», aunque esto último lo atribuye a la UAS y habría que añadirlo como fuente con su límite. En el H2-6, dejar el «si te busca» en una remisión de una frase. En el §9.5, añadir una comprobación manual de paráfrasis: una tabla de los H3 y las preguntas de FAQ frente a los de España, que el auditor del artículo debe rellenar.

**P1-4. Una cifra de S4 queda atribuida a otra intervención: «más del 70 %» no corresponde a las grabaciones.**
- *Ubicación:* §6, H2-9, bullet «"Acostumbrarlo con grabaciones": S4: más del 70 % de los dueños vio útil el contracondicionamiento».
- *Evidencia:* el resumen de S4 en Europe PMC dice: «Counterconditioning (**providing desirable stimuli after the occurrence of noises**) […] over 70%. […] **noise CDs (N=377) were effective in 55%**». Es decir, el 70 % es del contracondicionamiento improvisado durante el ruido, y las grabaciones se quedan en el 55 %. El brief de España (S5) y el artículo publicado (tabla, l. 359 y 361) sí las separan.
- *Por qué importa:* el artículo diría que el 70 % de los dueños vio útil acostumbrar al perro con grabaciones, y eso no está en la fuente.
- *Corrección:* en el bullet de grabaciones, escribir «las grabaciones de ruidos, 55 % según los dueños (N = 377); dar algo agradable justo después de cada estallido, más del 70 % (N = 694)». En el §3 (S4), añadir la cifra del 55 % y la definición de contracondicionamiento que da la autora.

**P1-5. La ley de Colombia está incompleta: falta la Ley 2224 de 2022, que la propia página de S13 enlaza.**
- *Ubicación:* §3, S13 (límites); §6, H2-7 (tabla y `### Cómo averiguarlo donde vives`); FAQ «¿Es ilegal reventar pólvora en mi país?»; §3, laguna 2.
- *Evidencia:* en la página de S13, el art. 15 de la Ley 670 dice «<Artículo modificado por el artículo 8 de la Ley 2224 de 2022>» y enlaza a `ley_2224_2022.html`. Esa ley (Diario Oficial 52.081, 30-VI-2022) establece una regulación nacional del uso, la venta y la compra de pólvora, con sanciones de 1 a 200 SMMLV (art. 2). Su art. 9 obliga a cada municipio a hacer pedagogía que explique «los impactos negativos de los artículos pirotécnicos […] sobre los seres humanos, **sobre los animales** y el medio ambiente». El brief reconoce que «la página señala jurisprudencia y vigencia en el art. 4 que no se revisaron». Aun así, en el H2-7 pide decir que las normas leídas regulan «por seguridad de las personas […], no por los animales», y en la FAQ, «en Colombia, cada alcaldía decide».
- *Por qué importa:* es la única sección legal del artículo. La regla 6 de seguridad del §9.7 la limita a Chile y Colombia, y para Colombia se apoya en una norma de 2001 cuya vigencia no se revisó y cuya reforma de 2022 ya estaba enlazada en la fuente. El gate «volver a abrir S12 y S13 por si hubo reformas en 2026» no detecta una reforma de 2022.
- *Corrección:* abrir la Ley 2224 de 2022 (`http://www.secretariasenado.gov.co/senado/basedoc/ley_2224_2022.html`) y las notas de vigencia del art. 4 de la Ley 670. Añadir la Ley 2224 como S14, o limitar expresamente el dato de Colombia. Quitar la frase «no por los animales» aplicada a Colombia, o restringirla de forma literal a la Ley 670. Volver a redactar la fila de Colombia de la tabla y la respuesta de la FAQ a partir de lo que digan las dos leyes. Si la revisión no se completa, sustituir Colombia por «no verificado», igual que el resto de países.

### P2. Bajan la calidad

**P2-1. La aclaración de Dakota se presenta como un hecho del país y una fuente del propio brief la contradice.**
- *Ubicación:* §2, Dakota; §6, H2-1.
- *Evidencia:* el brief dice «en Costa Rica no se acostumbra reventar mucha pólvora». S10, del COLVET según Teletica, dice: «Durante el mes de diciembre e inicios de enero, los costarricenses celebran las fiestas con juegos pirotécnicos».
- *Corrección:* si el testimonio sobrevive a P1-1, atribuirlo como experiencia de la zona del propietario («donde vivimos, en Costa Rica, no se revienta tanta») y no como dato del país.

**P2-2. La portada pone el refugio junto a la ventana por la que entran los destellos, al contrario de lo que enseña el H2-5.**
- *Ubicación:* §8, imagen 1 (ficha y prompt); pie `heroImageCaption`.
- *Evidencia:* el H2-5 pide «el cuarto más interior, sin ventana a la calle». S9 recomienda frazadas «que sirvan como aislante ante los ruidos, luces y destellos». En cambio, el prompt sitúa la cueva en el comedor, con «ventana de celosías […] por la que se cuelan destellos intermitentes» y con el perro mirando hacia ella. Además, el pie dice «oscuro», pero la escena tiene una lámpara de pie, la serie de luces del nacimiento y los destellos. La dirección visual exige que imagen, pie y alt digan lo mismo y que la escena no enseñe lo que el texto desaconseja.
- *Corrección:* mover la cueva a un cuarto interior o alejarla de la ventana (con la cortina corrida y sin destellos dentro del refugio), o bien cambiar el pie. Que el perro mire hacia la mujer o hacia la salida abierta, no hacia la ventana.

**P2-3. Dos de las tres imágenes repiten el concepto de las de España.**
- *Ubicación:* §8, imágenes 1 y 2.
- *Evidencia:* la portada de España es un refugio nocturno con destellos y la mano de una persona; la imagen 1 de LA-01 es un refugio nocturno con destellos y una mujer. La imagen de España de la l. 306 es «un hombre y una perra […] caminando juntos […] con la correa floja sujeta al arnés»; el alt de la imagen 2 de LA-01 es «un hombre y un perro […] caminan juntos […] con la correa floja sujeta al arnés». La comprobación de 6 palabras seguidas detecta «con la correa floja sujeta al».
- *Corrección:* mantener la imagen 2 (del patio a la casa) pero cambiar el gesto y el alt, por ejemplo: el perro cruza solo la puerta trasera hacia su cuarto, con la persona dentro, ofreciéndole comida. Volver a redactar el alt.

**P2-4. Varias fuentes se usan en H2 que la matriz no les asigna.**
- *Ubicación:* §6, H2-3 (el `danger` se apoya en S11), H2-9 («S11 y S5 piden lo contrario») y H2-10 («S4 y S5»).
- *Evidencia:* la matriz es idéntica en §3, §6 y §9.2 (lo comprobé fuente por fuente), pero S11 no está asignada ni a H2-3 ni a H2-9, y S5 no está asignada a H2-10.
- *Corrección:* añadir esas asignaciones a la matriz en los tres sitios, o quitar las menciones del cuerpo.

### P3. Menores

1. **Bloque de edad en posturas que no encajan.** Las tres imágenes copian «cabeza a la altura del lomo o algo baja», pero en la imagen 3 el perro está sentado y en la imagen 1, echado con la cabeza sobre las patas. Añadir a cada prompt «según la postura».
2. **Repetición de la categoría «mestizo».** El motivo que da el brief (que sea reconocible para el público) no es ninguno de los tres que admite la dirección visual: que el caso lo identifique, que la raza sea contenido clínico o que lo pida el propietario. La diferencia de tipo y color es real; conviene pedir la aprobación del propietario o documentarla como excepción.
3. **Enlace a golpe de calor.** El artículo enlazado se titula «… plan para las olas de calor en España». Avisar en el anclaje o en el contexto de que es la guía general.
4. **Vocabulario.** El §9.6 prohíbe «piso» como españolismo, pero en Latinoamérica «piso» significa suelo y el propio brief lo usa así en los prompts. Precisar «piso (vivienda)».
5. **Fecha de S7.** La página no muestra la fecha de publicación. «7 de diciembre de 2024» se deduce del tuit incrustado y de la carpeta `2024-12`. Escribir «diciembre de 2024».
6. **Alcance de S12.** Los artículos que obligan remiten a «la letra f) del artículo 2» de la Ley 17.798, que no se leyó; «fuegos artificiales» solo aparece en el título. «Hay espectáculos autorizados» es una inferencia del régimen de autorización, no una cita. Decirlo así.
7. **Matiz de S6.** El aumento hasta los 10 años se observó «en perros sanos»; en perros con problemas de salud fue hasta los 8. Mantener ese matiz en el H2-1.
8. **La cena de Osa.** El archivo no fecha la cena, y la portada («noche del 24, bajo la mesa del comedor») invita a situarla en Nochebuena. Añadir en el H2-2: «no fechar la cena».

## Verificación de fuentes

| Fuente | Identificador / URL | Resultado | Afirmaciones del brief frente al documento |
|---|---|---|---|
| S1 Salonen 2020 | DOI 10.1038/s41598-020-59837-z, PMID 32139728 | Coincide con el §3 de España (S1) | 32 %, 26 % y aumento con la edad: idénticos a lo verificado allí. No añade nada. |
| S2 Gähwiler 2020 | PMC7525486 | **Verificada** (texto completo, 2026-10-26) | Añade «la mayoría ni se escondía ni vocalizaba», que el §3 de España no listaba. Está en el documento: «the majority of subjects not vocalising or hiding at all». Correcta, pero es la misma idea que ya usa España (P1-3). |
| S3 Lopes Fagundes 2018 | DOI 10.3389/fvets.2018.00017, PMID 29487858 | Coincide con el §3 de España (S4) | 6 a 6 m frente a 2 a 8 m; 8 de 10: idénticos. |
| S4 Riemer 2020 | DOI 10.1016/j.jveb.2020.04.005 (preprint 10.1101/663294) | Resumen verificado en Europe PMC (verificación parcial, bien marcada) | «Tocar y hablar no se asoció» se deduce correctamente del componente «Interaction». El >70 % está mal aplicado en el H2-9 (P1-4). |
| S5 ESVCE 2026 | PDF v2.1 | Coincide con el §3 de España (S6) | Acepromazina, zona segura, plan de fondo e individualización: idénticos. Se respeta «sin dosis ni nombres». |
| S6 Riemer 2019 | DOI 10.1371/journal.pone.0218150, PMID 31490926 | Coincide con el §3 de España (S11) | Cifras de recuperación y efecto de la edad idénticas (P3-7). |
| S7 IDPYBA 2024 | bogota.gov.co/…/en-bogota-van-1900-… | **Verificada** | 1.901 (702 de compañía y 1.199 silvestres), «no constituye una denuncia», las seis recomendaciones, el titular «atendidos» y la frase de los «picos del 24 y 31 de diciembre de 2024»: todo literal. Fecha inferida (P3-5). |
| S8 Bogotá 2025 | bogota.gov.co/en/node/282673 | **Verificada** | 115 reportes, 74 %, 23 %, 31 %, 21 %, 18 %, formulario abierto desde el 7 de diciembre, 730 respuestas, «La Pólvora Explota Mis Sentidos»: todo literal. |
| S9 COLVET / El Delfino | delfino.cr/2024/12/… (publicado el 2024-12-10) | **Verificada** | Paseo y olfato, cueva con frazadas, música, placa, consulta según edad (Dra. Silvia Coto, presidenta), CBD solo con indicación y «no es recomendable en pacientes con problemas hepáticos» (Dr. Meza): literal. Nota: la misma pieza describe el CBD como «excelente recurso» y «muy seguro». El brief hace bien en no ampliar, pero el H2-9 no debe dar a entender que el COLVET lo desaconseja. |
| S10 COLVET / Teletica | teletica.com/…_325734 (publicado el 2022-12-17) | **Verificada** | «lugar oscuro y seguro (tipo cueva)», cortinas, puertas y ventanas, masticables, música, «Reconforte y vigile», «acepromaciona […] solo actúa sobre la función motora», collar con datos de contacto, horarios: literal. Contradice el testimonio de Dakota (P2-1). |
| S11 UNAM / N+ | nmas.com.mx/… (2024-12-14) | **Verificada** | «nunca lo dejes en áreas abiertas como terrazas o patios», música o TV, calma, no fomentar, «algunos perros podrían querer jugar con pirotecnia», consultar: literal. Las cifras descartadas (100 veces, 4 veces, 20 %) están en la nota y se descartan con razón. |
| S12 Chile, Ley 21.310 | Diario Oficial 42.871, CVE 1890803 | **Verificada** | Arts. 9 y 10 (tenencia, fabricación y comercio sin autorización), art. 14 E literal, derogación del art. 2 de la Ley 19.680: correcto. Alcance en P3-6. |
| S13 Colombia, Ley 670/2001 | secretariasenado.gov.co/…/ley_0670_2001.html | **Verificada, pero incompleta** | Arts. 4 y 7, literal. «Animal» aparece 0 veces: confirmado. Modificada por la Ley 2224 de 2022, que el brief no recoge (P1-5). |

S1–S6: no encontré ninguna afirmación nueva atribuida a estas fuentes fuera de las dos que comprobé arriba (S2, mayoría; S4, «Interaction»). No hay identificadores inventados.

## Comprobaciones mecánicas

| Control | Resultado |
|---|---|
| seoTitle | 55 caracteres (≤ 55). Cumple, en el límite. |
| metaDescription | 156 (≤ 160). Cumple. |
| `pilar` | `salud-mental-emocional-perros` está en el enum de `src/content.config.ts`. |
| `heroImageCaption` | Existe (`z.string().optional()`). |
| Suma de targets | 330 + 560 + 620 + 520 + 560 + 500 + 560 + 430 + 380 + 420 + 320 + 500 = **5.700**. Los H3 de cada H2 suman lo mismo, más el `AlertBox` cuando lo hay. |
| Matriz fuente→H2 | Idéntica en §3, §6 y §9.2 (con las diferencias de uso del P2-4). |
| Enlaces internos | Los 9 destinos existen en `src/content/blog/` con `pilar` coherente y estado publicado. La calculadora se omite con motivo. LA-01 figura como `[~]` en el inventario. |
| AlertBox | `info` (introducción), `danger` (H2-3), `warning` (H2-4). |
| FAQ | 8 preguntas; respuestas de 41 a 49 palabras (rango pedido: 40-55). Dos son paráfrasis de España (P1-3). |
| Variante lingüística | Sin voseo ni «vosotros» en el texto destinado al lector; tuteo y «ustedes». Cumple. |
| Prompts | Misma raza y ficha en los 3. Los cinco rasgos senior y la línea de rechazo, completos en los 3. Geometría de la imagen 2 coherente: si avanzan de izquierda a derecha, la cámara ve su costado derecho; el perro va a la derecha del tutor y la correa en la mano derecha. Imagen 3 coherente. |
| Prosa terminada en vez de instrucciones | No hay párrafos de desarrollo ya redactados. Solo borradores de FAQ y AlertBox, que están permitidos. |

## Recursos prometidos

| Recurso | Ruta | Estado | Prueba pendiente |
|---|---|---|---|
| Tabla de leyes | H2-7 | Planificada | Depende de P1-5 |
| Lista de 6 pasos | H2-6 | Planificada | — |
| Lista «lo que oyes → lo que sabemos» | H2-9 | Planificada | Corregir la cifra de S4 (P1-4) |
| 3 imágenes | `/images/blog/miedo-polvora-perros-mayores/` | Sin generar | 390 px, rasgos senior; P2-2 y P2-3 |
| Tarjeta de versiones | `VersionRegional.astro` | Decisión del propietario | Planificada como gate, sin prometerla como existente. Cumple. |

**Enlace entre versiones (§5.2):** la propuesta es razonable. La opción B (enlace en contexto en el H2 legal) es natural porque la ley es justo donde se separan las dos versiones, y va siempre. La opción A queda bien condicionada: un componente en un PR aparte, y si no existe no se escribe HTML a mano en el MDX (§4 y §9.3). La opción C se pospone hasta tener datos de Search Console, lo cual es prudente. Un apunte: la opción A también modifica el `.mdx` de España ya publicado, y el brief lo dice. No hay hallazgo aquí.

## Efecto cascada

- No hay artículo redactado (`src/content/blog/miedo-polvora-perros-mayores.mdx` no existe). Nada se ha propagado todavía.
- Ningún otro brief ni artículo cita S9–S13 ni la Ley 670.
- El error de S4 (P1-4) es solo de este brief: el artículo de España separa correctamente el 70 % y el 55 %.
- El registro de razas de `direccion-visual-editorial.md` ya incluye el mestizo canela de este brief. Si cambia la raza, hay que actualizar esa fila.

## Lo que sí funciona

- Las siete fuentes nuevas existen, son las que el brief dice y respaldan lo que se les atribuye, salvo lo indicado. Los límites de S7 son precisos: el titular «atendidos» frente a «reportes» y la frase de los picos de 2024 en una página de diciembre.
- Descartar las cifras de audición y el «20 % de perros perdidos» de S11 es correcto. Esas cifras están en la nota y no tienen fuente primaria. No hay que recuperarlas.
- La acepromazina tiene dos fuentes independientes (S10 y S5), y ambas lo dicen de forma literal.
- Las lagunas están bien declaradas: leyes de otros países, disponibilidad de fármacos, microchip y techo de lámina. No hay que rellenarlas.
- Osa sin edad ni desenlace y presentada como no mayor; Baltor con «no recuerdo cuál». Hay que mantenerlo.
- Español neutro bien definido; vocabulario regional con glosas.
- Propuesta de enlazado entre versiones sin código a mano.

## Qué corregir, en orden (para otra sesión)

1. **P1-5:** leer la Ley 2224 de 2022 y la vigencia del art. 4 de la Ley 670. Volver a redactar S13 (o añadir S14), la fila de Colombia del H2-7, la frase «no por los animales» y la respuesta de la FAQ legal. Si no se puede verificar, dejar Colombia como «no verificado».
2. **P1-4:** separar en el H2-9 el contracondicionamiento improvisado (más del 70 %, N = 694) de las grabaciones (55 %, N = 377), y añadir la segunda cifra al §3 (S4).
3. **P1-2:** devolver la incertidumbre a Osa (portón), quitar «quieto» y «se orina» como patrón en Baltor, cambiar el título del H2-3 y precisar el sentido de «brava».
4. **P1-1:** eliminar o reducir a remisión los hechos de Luna y Dakota que ya están en el `.mdx` de España (l. 104, 107 y 328), y hacer que la decisión 3, la tabla del §2 y el §9.4 digan lo mismo que el §6.
5. **P1-3:** sustituir las dos preguntas de FAQ parafraseadas, renombrar los ocho H3 de la tabla, redefinir el ángulo de H2-3 y H2-6, y añadir al §9.5 una tabla manual de comparación de H3 y FAQ.
6. **P2:** testimonio de Dakota atribuido a su zona; portada con la cueva lejos de la ventana o pie corregido; imagen 2 con otro gesto y otro alt; matriz actualizada en los tres sitios.
7. **P3:** los ocho ajustes de la lista.
8. Registrar la R1 en el «Historial de auditoría» del brief y pedir la ronda R2 a otra sesión.
