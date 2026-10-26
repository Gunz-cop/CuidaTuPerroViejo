# Auditoría independiente del brief LA-01 · Ronda R3 (última)

- **Documento auditado:** `briefings/briefing-miedo-polvora-perros-mayores.md` (v3 del 2026-10-26), commit `b6f743d`, blob `f445102e047932658a0c6669248f9c4c903025d6`.
- **Rama:** `claude/brief-miedo-polvora-perros-mayores-latam`.
- **Ronda:** R3 de un máximo de 3. Es la última ronda.
- **Fecha:** 2026-10-26.
- **Método:** skill `auditar-briefing-contenido` (con `references/formato-informe.md`), aplicando como norma `calidad-editorial-adsense.md`, `guia-voz-tono.md`, `direccion-visual-editorial.md`, `apoyos-visuales-responsive.md` y `generar-briefing-contenido`. No generé este brief ni lo corregí, y tampoco hice la R1 ni la R2. No he modificado nada salvo este informe.
- **Alcance:**
  - **Fuentes:** volví a abrir S7–S14 con `curl` a través del proxy, sin desactivar TLS. Las ocho respondieron 200. Extraje el texto y busqué en él cada afirmación.
  - **Laguna 2:** reproduje las dos búsquedas de PubMed con E-utilities.
  - **Testimonios:** los contrasté línea a línea con `docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md` y con `src/content/blog/miedo-petardos-perros-mayores.mdx`.
  - **Canibalización:** busqué n-gramas de 6 y 5 palabras frente a ese `.mdx`, en todo el brief, en el §6 y en el texto que leerá el lector (FAQ, avisos y títulos de H3). Además, comparé a mano los 35 H3 y las 8 FAQ.
  - **Conteos con Python:** metadatos, presupuesto, H3 por H2, palabras de la FAQ y la matriz fuente→H2 en el §3, la línea de matriz, los `*Sustentado en:*`, el §9.2 y el uso real.
  - **Enlaces:** comprobé los 14 en `src/content/blog/` y `src/pages/`.
  - **Imágenes:** revisé los prompts frente a `public/images/blog/`, los `heroImageAlt` y los alt del cuerpo.
  - **Voz:** pasé `tono.py` sobre la FAQ y los avisos.

## Veredicto

**APTO con reservas** (válido con reservas para redacción): no hay ningún P0 ni P1. El P1 de la R2 (seguridad del H2-4) está corregido de verdad, y las 14 fuentes dicen lo que el brief les atribuye.

Recuento: **0 P0 · 0 P1 · 2 P2 · 8 P3.**

Las reservas (P2) se pueden corregir sin otra ronda de auditoría: las aplica la sesión que corrige y las comprueba el auditor del artículo, que debe recibir este informe. Las decisiones pendientes del propietario (raza como excepción, tarjeta A/B/C y testimonio del compañero) siguen abiertas y el brief las presenta como pendientes. No son defectos.

## Comprobación de los hallazgos de la R2

| R2 | Estado en v3 | Evidencia |
|---|---|---|
| **P1-1** Seguridad del H2-4 | **Corregido** | `### Lo que no puede hacer por sí mismo`: agua y comida «incorporado de pecho, nunca tumbado de lado», en poca cantidad, con alguien al lado, según lo que indicó la veterinaria; «si tose o le cuesta tragar, parar»; «nunca a la fuerza»; sin masticables nuevos y con el motivo (S4 es de perros que se mueven). `### Tú eliges el sitio por él`: moverlo como enseñó la veterinaria o pedir una demostración, entre dos personas o con manta firme, sin arrastrarlo, con riesgo de mordisco y de día. Las pautas se declaran «pauta clínica general, no evidencia sobre ruido». Regla 9 del §9.7 con la excepción; regla 13 ampliada. El enlace a `alimentacion-perros-mayores-sin-dientes` está en el §5.1 y el §9.3: el artículo existe, está publicado y cita el Manual Merck sobre aspiración (l. 73 y 224) y un `AlertBox` «No introduzcas comida o agua a la fuerza» (l. 226). El de úlceras contiene la pauta de movilización (l. 44-48). Quedan dos matices menores en P3-4. |
| **P2-1** Paráfrasis | **Corregido** en las cinco filas señaladas | `Dónde buscar el decreto de tu alcaldía o municipalidad`; `Si el 2 de enero sigue escondido` (remisión sin las cuatro cifras); `La ruta del portón al lote baldío`, con la prohibición expresa de la secuencia de España; los dos `AlertBox` reescritos. N-gramas de 6 en FAQ, avisos y títulos de H3: **0**. En todo el §6: 3, todos inocuos (un slug, «con problemas de salud hasta los» de S6 y «entre el 27 y el 35» de S4). La comparación manual encuentra otros paralelos que la R2 no señaló → **P2-1** de esta ronda. |
| **P2-2** Atribución del CBD | **Corregido** | El §3, el H2-5, el H2-10, la FAQ y la regla 3 coinciden: «solo con indicación» corresponde al COLVET, y «recurso» y «no recomendable con problemas de hígado» al Dr. Meza. La FAQ dice «no recomendable». Se añade la laguna sobre la regulación del CBD. Ver la nota de S9 en la tabla de fuentes. |
| **P2-3** Geometría de la portada | **Corregido** | La sábana cuelga solo por la derecha y por detrás; el frente y el lado izquierdo quedan abiertos. El perro mira a la mujer por la abertura izquierda y la lámpara está a la izquierda, sin tela de por medio. La aceptación se ajustó. |
| **P2-4** Imagen 3 repetida | **Corregido** | El concepto nuevo (candado del portón, placa ya puesta, «nadie toca el collar») no coincide con ninguna imagen publicada: busqué portón, candado, patio, placa y puerta en `public/images/blog/` y en todos los alt. La portada de ansiedad por separación (cocker frente a una puerta de piso) es otro concepto. Leishmaniosis figura como publicada en el §8 y en el registro. **Pero el nuevo concepto choca en la cronología con la imagen 2 → P2-2.** |
| P3-1 Fecha de S7 | Corregido | La página muestra «7·DIC·2024». |
| P3-2 Art. 4 de la Ley 670 | Corregido | Exequible (C-790-02). |
| P3-3 Base de S8 | Corregido | El H2-1 dice «según la nota». |
| P3-4 «No es una denuncia» | Corregido | Se atribuye al IDPYBA en 2024. |
| P3-5 Presupuesto interno | Corregido | Ver comprobaciones mecánicas. |
| P3-6 Zonas altas | Corregido | Aparece en el H2-3, el H2-4 y la FAQ del ventilador. |
| P3-7 Osa «muy brava» | Corregido | Literal del archivo (l. 66). |
| P3-8 Luna con contexto | Corregido | «Aunque suele estar tranquila». |
| P3-9 Búsqueda de la laguna 2 | Corregido y **reproducido** | La primera consulta de PubMed devuelve 1 resultado (PMID 20712614, «Suspected acute meperidine toxicity in a dog», *Vet Anaesth Analg* 2010). La segunda devuelve 0. |
| P3-10 a P3-13 | Corregidos | «Texto, letras o marcas» en los tres prompts; mano izquierda en la imagen 2, con la geometría correcta (tutor de espaldas a la derecha: su mano izquierda queda hacia el centro, donde está el perro); «No son mañas»; la tabla de H3 y FAQ queda para el auditor del artículo. |

`correccion-r2.md` rectifica expresamente la afirmación falsa de `correccion-r1.md`. Sus declaraciones coinciden con lo que he medido, salvo en lo que señalo abajo.

## Hallazgos

### P0 / P1

Ninguno.

### P2. Bajan la calidad; corregir antes de redactar

**P2-1. Quedan cuatro paralelos de H3 con el artículo de España que el brief no declara. Dos de ellos tienen además el título parafraseado.**
- *Ubicación:* §6, H2-3 `### El cuarto donde menos se oye` y `### Una mesa, una sábana y su frazada`; H2-5 `### Un miedo que aparece de mayor`; H2-6 `### Antes de que lleguen los invitados` y `### Seis acuerdos para la familia`; H2-10 `### Enero tiene once meses por delante`. También la tabla manual del §9.5.
- *Evidencia (comparación manual; los n-gramas de 6 no detectan nada de esto):*

| Brief v3 | España (`miedo-petardos-perros-mayores.mdx`) | Veredicto |
|---|---|---|
| `### El cuarto donde menos se oye` | `### Dónde: la habitación más silenciosa, lejos de la ventana` (l. 237) | **Paráfrasis de título.** El contenido tiene un ángulo propio (cuarto interior, techo de concreto, celosía). |
| `### Una mesa, una sábana y su frazada`: «Agua y un juguete conocido; sin amarrarlo ni cerrar el transportín» | `### Qué poner y qué no` (l. 253, 265): «cama conocida, agua… juguete relleno… Evita cajas cerradas, atarlo» | Repite una frase de contenido. La mesa con sábana sí es propia. |
| `### Un miedo que aparece de mayor`: S3 en 2-3 frases + `chequeo-geriatrico-canino` + `disfuncion-cognitiva-canina` | `### Si el miedo es nuevo: lo que conviene descartar` (l. 62-74): Lopes Fagundes + disfunción cognitiva (y chequeo geriátrico en l. 192) | **Paráfrasis de título** y la misma cadena fuente → enlaces. El §2 declara «dolor en la consulta, 2–3 frases», pero no el título. |
| `### Antes de que lleguen los invitados`: paseo con olfateo → **comer antes** → portón cerrado → placa | `### Por la tarde: paseo, comida y puertas` (l. 290-304): paseo → «adelanta la cena» → cerrar puertas → identificación | Misma secuencia. Lo propio es la visita de la familia y la entrada desde el patio. Además, «comer antes» se atribuye a S9 y no está en S9 (P3-1). |
| `### Seis acuerdos para la familia`: lista numerada con música o TV, masticable si lo acepta (S4), presencia tranquila y remisión a «tocarlo no se asoció» | `### Por la noche: qué hacer mientras suenan` (lista de 7 pasos, l. 312-320) + `### Consolar…` (l. 324) | Mismo formato (lista numerada) y tres de sus seis puntos. Los acuerdos de la puerta y los invitados son propios. |
| `### Enero tiene once meses por delante`: «sonido muy bajo asociado a algo que le gusta; subir solo si está tranquilo», «veterinaria con formación en comportamiento» | `### Qué es y cómo funciona` + `### Si empiezas ahora, para marzo` + `### Cuándo pedir ayuda…` (l. 390-420): «grabación tenue acompañada de algo agradable… ajustar la dificultad cuando sigue relajado», «derivación a un veterinario especializado en comportamiento» | Misma definición y el mismo enfoque de horizonte temporal. Es inevitable en parte (es la definición de la ESVCE), pero el H3 no aporta nada propio. |

  El resto de H3 y las 8 FAQ son distintos o tienen solapamientos ya declarados en la tabla del §2 (edad con S1/S6, cifras de Riemer en otro formato, urgencias). La tabla completa está en el anexo.
- *Por qué importa:* la diferenciación fue el P1-3 de la R1 y el P2-1 de la R2. Cada ronda ha encontrado paráfrasis que la anterior no vio, porque la prueba automática no las detecta. El §9.5 deja la tabla manual al auditor del artículo, pero el brief ordena escribir estos H3 así. Si no se cambian ahora, la paráfrasis nacerá en la redacción y obligará a reescribir.
- *Corrección:*
  1. Renombrar `El cuarto donde menos se oye` desde lo local, por ejemplo «El cuarto sin ventana a la calle» o «Bajo techo de concreto, lejos de la calle».
  2. Renombrar `Un miedo que aparece de mayor` con un título ligado a la consulta de noviembre, por ejemplo «Si este diciembre es el primero que lo pasa mal». No repetir allí el enlace a `disfuncion-cognitiva-canina` si ya basta con el chequeo; si se mantiene, que sea en otra frase.
  3. En `Una mesa, una sábana…`, quitar la enumeración «agua, juguete, sin amarrar, sin caja cerrada» o apoyarla en S9 o S10 con otras palabras («su frazada y su traste de agua; la salida, siempre libre»).
  4. En `Antes de que lleguen los invitados`, quitar «comer antes» (no tiene fuente) y abrir con lo propio: entrarlo del patio antes de que llegue la primera visita y acordar quién abre el portón.
  5. Convertir `Seis acuerdos` en acuerdos **de la familia y las visitas**: puerta, portón, nadie revienta pólvora en el patio, quién lo visita, niños. Que la música y el masticable sean un solo punto breve.
  6. En `Enero tiene once meses`, partir del calendario latinoamericano (enero, Semana Santa, fiestas patronales y partidos, si se verifican; si no, «las fiestas de tu barrio») y remitir la definición de desensibilización a una frase.
  7. Añadir estas seis filas como ejemplos en la tabla manual del §9.5.

**P2-2. La cronología de las imágenes 2 y 3 contradice el mensaje del H2-2.**
- *Ubicación:* §8, prompts y ficha de las imágenes 2 («a las 5 de la tarde del 24 de diciembre», el perro **entra** a la casa) y 3 («a las 5:30 de la tarde del 24 de diciembre», el perro **sentado en el patio** junto al portón); pie de la imagen 3 («Antes de que oscurezca…»).
- *Evidencia:* la imagen 2 muestra que el perro se entra a las 5:00, antes del ruido. Media hora después, en la imagen 3, está otra vez en el patio, al atardecer del 24. El H2-1 dice que la pólvora de barrio «a menudo empieza días antes», y el H2-6 ordena el día así: entrarlo del patio, portón cerrado y placa puesta. La dirección visual exige que imagen, pie y texto digan lo mismo y que la escena no muestre lo que el artículo desaconseja. Un perro de patio sentado fuera al anochecer del 24 es justo la situación de la que trata el H2-2.
- *Por qué importa:* el lector ve las dos imágenes en orden (H2-2 → H2-8), y la segunda desmiente la primera. Es barato de arreglar ahora; con las imágenes ya generadas, hay que regenerarlas.
- *Corrección:* adelantar la imagen 3 a una hora anterior a la de la imagen 2 (por ejemplo, «las 3:30 de la tarde del 24», con luz lateral alta y cálida en lugar de atardecer naranja) y ajustar la ficha («Cámara y luz»), el prompt y el pie («Por la tarde, antes de entrarlo: portón con candado y placa puesta»). Otra opción: situarla el 23 («la víspera»). Mantener «nadie toca el collar».

### P3. Menores

1. **«Comer antes» no está en S9.** El H2-6 dice «S9: paseo corto con olfateo; comer antes». El texto de El Delfino solo recomienda pasearlo, jugar, hacer actividad física y dejarlo olfatear «antes de las horas en que puede presentarse el pico de actividad pirotécnica». No dice nada de la comida. Además, «paseo corto» es una adaptación del brief (la nota dice «llévelos al parque… haga actividad física»). Marcar ambas cosas como criterio editorial o quitarlas (ver P2-1).
2. **Lagunas numeradas 1-7, 9 y 10.** Falta la 8. En Markdown renderizado, la «9. CBD» aparece como 8 y la «10. Descartadas» como 9, así que la remisión «laguna 9» del H2-10 apunta a otra laguna. Renumerar (CBD = 8, descartadas = 9) y actualizar la remisión del H2-10.
3. **Luna: «busca a la familia» ya está publicado.** El artículo de España dice «ante un susto cualquiera, Luna nos busca» (l. 328). Lo único nuevo es «temblores, terremotos y choques». La decisión 3 y el §2 dicen que es «lo único que el artículo de España no contó», y no es del todo exacto. Dejar «busca a la familia» como media frase de contexto y apoyar la lectura del H3 en los temblores.
4. **H2-4, dos matices de seguridad.**
   - (a) «Moverlo una vez, de día, y no durante la pólvora» puede leerse como «no tocarlo en toda la noche», lo que chocaría con los cambios de postura que la propia sección pide. Escribir: «trasladarlo de sitio una sola vez, de día; los cambios de postura en su sitio siguen la pauta de la veterinaria».
   - (b) La FAQ 3 dice «Cámbialo de postura y ofrécele agua incorporado de pecho, nunca de lado». Le faltan «como te indicó la veterinaria», «poca cantidad» y «si tose, para», y además «incorporado» puede referirse al lector. Se puede reescribir dentro de las 55 palabras, por ejemplo: «… cámbialo de postura como te indicó la veterinaria y ofrécele poca agua con él incorporado de pecho, nunca de lado; si tose, para».
5. **`AlertBox` warning: «en un perro mayor cualquier fármaco puede afectar al corazón, al riñón o al hígado».** Es una generalización sin fuente («cualquier»). S5 dice que la elección es individual según las comorbilidades y la medicación. Escribir, por ejemplo: «en un perro mayor, la veterinaria revisa su corazón, riñón e hígado y lo que ya toma antes de elegir». No debe parecerse a la frase de España «puede tener enfermedades y tratamientos que cambien la seguridad» (comprobar los 6-gramas).
6. **Imágenes: manos y geometría del portón.**
   - (a) Ningún prompt pide de forma expresa la anatomía de la mano. La regla «manos con cinco dedos» del §8 está en los criterios generales, no en los prompts que se copian al generador. En la imagen 3, la mano en primer plano cerrando un candado es el error más probable. Añadir al prompt 3 «mano anatómica, cinco dedos; el pulgar empuja el arco del candado» y a «Evitar» «dedos de más o fundidos». Hacer lo mismo con la mano del tutor en el prompt 2.
   - (b) En la imagen 3 no se dice desde dónde mira la cámara. Si mira al portón, «la pila al fondo» queda fuera de la casa. Precisar: «el portón ocupa el borde derecho, visto en perspectiva; la cámara, dentro del patio, mira a lo largo del portón hacia la casa; al fondo, la pila».
   - (c) En la portada, el bloque de edad pide «mirada serena», y la ficha pide miedo moderado. Para esa imagen, sustituir la frase por «mirada atenta, algo tensa» y mantener intactos los otros cuatro rasgos.
7. **Fecha de leishmaniosis.** El §8 y el registro de `direccion-visual-editorial.md` dicen «publicado el 2026-10-25». El `.mdx` tiene `datePublished: "2026-10-24"`. Usar la fecha del frontmatter o escribir «publicado» sin fecha.
8. **Decisión 5 y título del §5.2: «decisión del propietario».** Puede leerse como una decisión ya tomada, cuando el §11 la deja pendiente («[ ] Decisión del propietario: tarjeta (A/B/C)») y `VersionRegional.astro` no existe. Escribir «**pendiente de decisión del propietario**» en la decisión 5 y en el título del §5.2. La opción B (enlace en contexto) puede seguir como obligatoria.

## Verificación de fuentes

| Fuente | Identificador / URL | Resultado (2026-10-26) | Afirmación del brief frente al documento |
|---|---|---|---|
| S1 Salonen 2020 | DOI 10.1038/s41598-020-59837-z · PMID 32139728 | Verificada en R1/R2; afirmaciones sin cambios | 32 %, 26 % y aumento con la edad: correcto. |
| S2 Gähwiler 2020 | PMC7525486 | Verificada en R1/R2; sin cambios | En el H2-4 solo se usan orejas, jadeo y movimiento. No usa «la mayoría ni se escondía». |
| S3 Lopes Fagundes 2018 | DOI 10.3389/fvets.2018.00017 · PMID 29487858 | Verificada en R1/R2; sin cambios | Coincide con el `.mdx` de España (l. 64-68), que se basa en el mismo texto. |
| S4 Riemer 2020 | DOI 10.1016/j.jveb.2020.04.005 (verificación parcial, marcada) | Verificada en R1/R2; sin cambios | 70 % (N = 694) del contracondicionamiento y 55 % (N = 377) de los CD, separados. En el H2-4 se usa ahora solo para **no** extrapolarla: correcto. |
| S5 ESVCE 2026 | PDF v2.1 | Verificada en R1/R2; sin cambios | Zona segura de la que el perro pueda entrar y salir, acepromazina, plan de fondo. |
| S6 Riemer 2019 | PMC6730926 | Verificada en R2 (matiz de edad literal); sin cambios | Correcto. |
| S7 IDPYBA 2024 | bogota.gov.co/…/en-bogota-van-1900-… | **Verificada hoy** | «7·DIC·2024» bajo el titular; «1.901 animales presuntamente afectados… 702 de compañía y 1.199 silvestres»; «este reporte no constituye una denuncia»; las seis recomendaciones (refugio, cortinas, música y juguetes, feromonas o esencias florales, actividad física antes, puertas, ventanas y balcones, correa y arnés): literal. La frase del «pico… el 24 y 31 de diciembre de 2024», en una nota fechada el 7 de diciembre, está bien excluida. |
| S8 Bogotá 2025 | bogota.gov.co/en/node/282673 | **Verificada hoy** | «25·DEC·2025»; «115 reportes ciudadanos» del 24 y 25; 74 % perros; 23 % gatos y aves silvestres; 31 % miedo o estrés; 21 % huida o desorientación; 18 % contaminación; formulario abierto «desde el 7 de diciembre de 2025»; 730 respuestas; «La Pólvora Explota Mis Sentidos»: literal. El título dice «casos» y el cuerpo «respuestas»: la ambigüedad está bien tratada. |
| S9 COLVET / El Delfino | delfino.cr/2024/12/… | **Verificada hoy, una afirmación sin respaldo** | Publicada el 10-12-2024. Paseo, juego y olfato antes del pico, cueva («debajo de una cama, escritorio, mesa o sillón»), frazadas aislantes ante «ruidos, luces y destellos», música, «plaquita con el nombre y teléfono», consulta según «edad, temperamento, enfermedades preexistentes» (Dra. Coto): literal. CBD: «solo deben ser administrados bajo indicación de un médico veterinario» (voz de la nota del COLVET); «excelente recurso… para tranquilizaciones, siempre y cuando sea recetado» (Dr. Meza); «El uso de CBD no es recomendable en pacientes con problemas hepáticos» (frase sin «según» propio, entre dos párrafos del Dr. Meza; atribuirla a él es una lectura razonable, y «en la misma nota» también sería correcto); «en el país aún no hay suficiente regulación» (Dr. Meza). **«Comer antes» (H2-6) no aparece** → P3-1. |
| S10 COLVET / Teletica | teletica.com/…_325734 | **Verificada hoy** | 17-12-2022; «diciembre e inicios de enero»; «pánico que puede generar problemas cardíacos, en control de esfínteres o actitudes agresivas»; cueva; cortinas, puertas y ventanas; «masticables con cartílagos deshidratados»; música; «Reconforte y vigile»; «No dar en ninguna circunstancia "acepromaciona"… solo actúa sobre la función motora»; collar; horarios: literal. «Cardíacos» e «infartos» bien excluidos. |
| S11 FMVZ-UNAM / N+ | nmas.com.mx/… | **Verificada hoy** | La FMVZ-UNAM «emitió una lista de consejos»: «nunca lo dejes en áreas abiertas como terrazas o patios», música, «No fomentes el uso de fuegos artificiales», «algunos perros podrían querer jugar con pirotecnia», pedir asesoría: literal. |
| S12 Chile, Ley 21.310 | Diario Oficial 42.871 (PDF) | **Verificada hoy** | Título: «…sancionar penalmente la fabricación, importación, comercialización, distribución, venta… y el uso de fuegos artificiales»; art. 9 (poseyeren o tuvieren sin autorización); art. 10 (fabricaren… distribuyeren); art. 14 E («sin la competente autorización, accionare, activare o disparare»); deroga el art. 2 de la Ley 19.680: literal. |
| S13 Colombia, Ley 670/2001 | secretariasenado…/ley_0670_2001.html | **Verificada hoy** | Art. 4 «podrán permitir… estableciendo las condiciones de seguridad… autoridades o cuerpos de bomberos»; art. 7 (menores y personas en estado de embriaguez); art. 15 «modificado por el artículo 8 de la Ley 2224 de 2022»: literal. |
| S14 Colombia, Ley 2224/2022 | secretariasenado…/ley_2224_2022.html | **Verificada hoy** | 30 de junio de 2022; art. 1 (objeto: derechos de los habitantes, en especial de los niños, mediante la regulación del uso, la fabricación… la venta y la compra); art. 2 (reglamentación en seis meses; «entre uno (1) y doscientos (200)» SMMLV); art. 8 (nuevo art. 15 de la Ley 670); art. 9 («los impactos negativos… sobre los seres humanos, sobre los animales y el medio ambiente»): literal. |

No hay identificadores inventados ni mal asignados. Las verificaciones parciales (S4; S9-S11, que son prensa) están marcadas con honestidad. **Revisé todas las fuentes:** S7-S14 las abrí hoy. S1-S6 no han cambiado de afirmación desde la R2 y no las volví a abrir; S3, S4 y S6 las contrasté con el `.mdx` de España, que cita los mismos pasajes.

### Fuente → afirmación → localización (las que cambiaron en v3)

| Afirmación del brief | Fuente | Localización | Resultado |
|---|---|---|---|
| CBD solo con indicación veterinaria | S9 | Apartado «¿Se puede usar CBD para tranquilizarlos?» | Respaldada |
| CBD «recurso»; «no recomendable» con problemas hepáticos | S9 (Dr. Meza) | Párrafos siguientes del mismo apartado | Respaldada (ver nota) |
| Formulario de Bogotá desde el 7-12-2025 | S8 | Penúltimo párrafo | Respaldada |
| «No constituye una denuncia» (2024) | S7 | Párrafo de la encuesta | Respaldada |
| Art. 4 de la Ley 670 exequible | S13 | Nota de jurisprudencia (comprobada por la R2) | No la volví a comprobar |
| Comer antes de las fiestas | S9 | — | **Sin respaldo** (P3-1) |
| Agua y comida incorporado de pecho; mover entre dos personas | Criterio clínico general declarado + enlaces internos (úlceras l. 44-48; sin dientes l. 73, 224) | — | Declarado como criterio, no como evidencia: aceptable |

## Comprobaciones mecánicas

| Control | Resultado |
|---|---|
| seoTitle | **55** caracteres (Python). Cumple, en el límite. Idéntico en la tabla y en el YAML. |
| metaDescription | **156**. Cumple. |
| `pilar` / `heroImageCaption` | `salud-mental-emocional-perros` está en el enum; `heroImageCaption` es opcional (`content.config.ts`, l. 28). Las rutas no llevan ñ, tildes ni espacios. |
| «Petardos» | No aparece en H1, slug, seoTitle, meta ni H2. |
| Suma de targets | 320 + 510 + 560 + 450 + 520 + 520 + 480 + 460 + 360 + 420 + 560 + 540 = **5.700**. Correcta. |
| H3 frente al H2 | H2-1: 500/510; H2-2: 560; H2-3: 450; H2-4: 520; H2-5: 460 + aviso 60 = 520; H2-6: 480; H2-7: 400 + aviso 60 = 460; H2-8: 360; H2-9: 410/420; H2-10: 560. Todo dentro del ±10 %. |
| FAQ | 8 preguntas; respuestas de **42 a 53** palabras (rango 40-55). Con las preguntas suman **467** palabras, frente a ≈456 en el §6 (conclusión ≈551 frente a 540): dentro del ±10 %. Ninguna equivale a las 8 de España. |
| AlertBox | `info` (introducción), `warning` (H2-5), `danger` (H2-7). Correcto. Contenido de 45, 57 y 56 palabras. |
| Matriz fuente→H2 | Para S1-S14, el §3, la línea de matriz del §6, los `*Sustentado en:*` y el §9.2 son **idénticos**. El uso real de cada S# en el cuerpo de cada H2 coincide con su asignación: no hay fuentes decorativas ni usos fuera de la matriz. |
| Enlaces internos (14) | Existen todos: 11 artículos con `pilar` coherente (9 con `status: "Publicado"` y 2 con el valor por defecto, que es «Publicado»), los pilares por `[pilar].astro` y `src/pages/herramientas/calculadora-calidad-vida-perros.astro`. LA-01 figura como `[~]` en el inventario (l. 284). |
| Componentes | `AlertBox.astro`, `FAQ.astro` y `article/TablaApilable.astro` existen. `VersionRegional.astro` no existe, y el brief condiciona la tarjeta a que esté en `main`: correcto. |
| N-gramas frente a España | 6 palabras: **0** en el texto para el lector y 3 inocuos en el §6. 5 palabras: 0 en el texto para el lector. Los paralelos de contenido están en P2-1. |
| Voz | `tono.py` sobre la FAQ y los avisos: **0 muletillas** en 625 palabras. Tuteo y «ustedes». «Vosotros», «coger», «pienso» y «chapa» solo aparecen en las listas de lo que hay que evitar. Remite a la guía de voz con un enlace relativo correcto. |
| Prompts | Ficha del mestizo en las 3. Bloque de edad **íntegro** con los cinco rasgos (canas en hocico, cejas y párpados; ojos hundidos; lomo y musculatura; postura según la escena; sin enfermedad) en las 3. «Rechazar si a tamaño móvil parece un adulto joven» en las 3. Exclusión de texto, letras y marcas en las 3. Aceptación a 390 px en la ficha. Alt y pie coherentes con cada escena. Seguridad: sin cables, velas ni portón abierto, y sin correa en la 2. Faltan la cronología (P2-2) y las manos y la orientación del portón (P3-6). |
| Raza | El registro del §8 coincide con `direccion-visual-editorial.md` (17 entradas, incluidos el bodeguero y el mestizo de leishmaniosis). En `public/images/blog/` no hay chihuahua. El mestizo canela con máscara negra se distingue del atigrado oscuro. La excepción está declarada y **pendiente**. |
| Tabla (H2-9) | 3 columnas en `TablaApilable compacta` con `data-label`, celdas de una frase: cumple `apoyos-visuales-responsive.md`. |
| Política editorial | «No prescribimos fármacos ni dosis»: el brief prohíbe dosis, marcas y nombres de fármacos aprobados (regla 1). Es coherente. |

## Recursos prometidos

| Recurso | Ruta | Estado | Prueba o gate |
|---|---|---|---|
| Tabla de leyes | H2-9 | Planificada | Ver a 390 px (§11) |
| Lista «seis acuerdos» | H2-6 | Planificada | Sin fármacos; reescribir según P2-1 |
| Lista «lo que oyes» | H2-10 | Planificada | Cada cifra contra S4 |
| 3 imágenes | Portada, H2-2, H2-8 | Planificadas, no generadas | 390 px, cinco rasgos; añadir la cronología (P2-2) |
| Tarjeta de versiones | Tras la introducción | Pendiente del propietario; el componente no existe | Solo si está en `main`; si no, no se anuncia |
| Formulario de Bogotá 2026 | FAQ | Gate: comprobar antes de publicar | Declarado en el §6 y el §11 |
| Reglamentación de la Ley 2224 | H2-9 | Gate: comprobar antes de publicar | Declarado en el §11 |

## H2-4 («Si tu perro ya no puede levantarse»): valoración de seguridad

- **Criterio editorial declarado:** sí, en el H2, en el §3 (laguna 2, con búsquedas reproducibles) y en las reglas 9 y 13.
- **Aspiración:** cubierta. El perro debe estar incorporado de pecho y nunca de lado; poca cantidad, con vigilancia, se para si tose y nunca a la fuerza. Se enlaza el artículo que cita el Manual Merck. La FAQ 3 se queda corta (P3-4b).
- **Moverlo:** cubierto. Técnica de la veterinaria o demostración, dos personas o una manta firme, sin arrastrarlo, riesgo de mordisco, de día. La regla 9 tiene su excepción. Hay que aclarar «una vez» (P3-4a).
- **Calor y frío, orina, compañía y señales:** cubiertos. Jadeo = calor o dolor → veterinaria. «Nunca solo toda la noche».
- **Caso del compañero:** no aparece sin permiso y datos dictados, ni de forma anónima (§2, §6 y §9.4).
- **Eutanasia:** no se abre. Remite a la calidad de vida con la veterinaria, con enlace a la calculadora y al pilar de paliativos.
- **Imagen:** ninguna, con motivo razonado.

**Conclusión:** la sección es segura para redactar.

## Efecto cascada

- El artículo no existe (`src/content/blog/miedo-polvora-perros-mayores.mdx`), así que no se ha propagado nada.
- Ningún otro brief ni artículo cita S8, S9, S10 ni S14 (búsqueda en `briefings/` y `src/content/`).
- Si se corrige la fecha de la leishmaniosis (P3-7), también hay que cambiarla en el registro de `direccion-visual-editorial.md`, que la sesión de corrección ya modificó.
- **Al auditor del artículo:** que reciba este informe y que su tabla manual del §9.5 parta de las seis filas del P2-1 y de las del anexo.

## Lo que sí funciona (no romper al corregir)

- **H2-4:** es la mejor corrección de las tres rondas. Las pautas tienen las precauciones necesarias, se declaran como criterio y se apoyan en dos artículos propios que ya las publican. No hay que añadir estudios que no existen.
- **CBD:** la atribución separa ahora lo que dice el COLVET de lo que dice el Dr. Meza, y no dice que el COLVET lo desaconseje ni que el sitio lo recomiende.
- **Testimonios:** son fieles al archivo, sin hechos alterados. Osa conserva su incertidumbre («no recuerdo con seguridad», «creo que a veces») y aparece sin edad y sin fecha de la cena. Baltor: «una vez», «no recuerdo cuál», sin «quieto». Dakota, la perra de unos vecinos y la hipótesis del «lugar menos ruidoso» no aparecen.
- **Fuentes regionales:** están bien leídas y bien limitadas. «Reportados», nunca «atendidos». Bogotá no se presenta como Latinoamérica. La Ley 2224 menciona a los animales solo en la pedagogía. La reglamentación del art. 2 no se da por expedida. Las exclusiones (infartos, cifras de audición, 20 %, «parálisis») son correctas.
- **Esqueleto propio** (patio, perro postrado, casa llena, portón, ley por país) y **8 FAQ nuevas**: con 0 n-gramas de 6 en el texto para el lector.
- **Matriz fuente→H2** exacta en cuatro sitios.
- **Decisiones del propietario:** raza, tarjeta y caso del compañero se presentan como pendientes. Hay que precisar la redacción de la tarjeta (P3-8), pero no es una decisión tomada en silencio.

## Qué corregir, en orden (para otra sesión; no requiere otra ronda de auditoría del brief)

1. **P2-1:** renombrar `El cuarto donde menos se oye` y `Un miedo que aparece de mayor`. Reescribir las instrucciones de `Una mesa, una sábana y su frazada` (sin la lista agua, juguete, no atar, no caja cerrada), `Antes de que lleguen los invitados` (sin «comer antes»; empezar por entrarlo del patio y por el portón), `Seis acuerdos para la familia` (acuerdos de familia y visitas; música y masticable en un solo punto) y `Enero tiene once meses por delante` (calendario propio; la definición, en una frase). Añadir las seis filas al §9.5.
2. **P2-2:** cambiar la hora de la imagen 3 a antes de la imagen 2 (por ejemplo, 3:30 de la tarde del 24 o la víspera), con su luz, y ajustar la ficha, el prompt y el pie.
3. **P3-1 a P3-8:** atribución de «comer antes»; renumerar las lagunas; el matiz de Luna; los dos matices del H2-4 (FAQ 3 incluida); el aviso warning; las manos y la orientación del portón, y la «mirada serena» de la portada; la fecha de la leishmaniosis; «pendiente de decisión del propietario».
4. Registrar la R3 en el «Historial de auditoría» del brief como **APTO con reservas**. Pedir al propietario las tres decisiones pendientes (raza, tarjeta A/B/C y testimonio del compañero) antes de generar imágenes o redactar el H2-4 con caso.
5. Que la redacción no empiece hasta aplicar los dos P2. Su cumplimiento lo comprueba el auditor del artículo, no una R4, que la norma no permite.

## Anexo: comparación manual de H3 y FAQ con España

| H3 / FAQ de LA-01 | Lo más parecido de España | Veredicto |
|---|---|---|
| Pólvora de vecinos, no de espectáculo | Un año de petardos: cuándo preparar cada fecha | Distinto |
| Lo que reportó la gente en Bogotá | — | Distinto |
| La edad, en dos datos | El miedo al ruido es frecuente, pero con la edad… | Mismos datos (S1, S6), solapamiento declarado en el §2; redactar distinto |
| Lo que recuerdo de Osa · Lo que recomiendan en México · Cómo hacerlo entrar sin jalarlo · Si es bravo | Cómo ensayarlo con semanas de antelación (solo la idea de ensayar antes) | Distinto |
| El cuarto donde menos se oye | Dónde: la habitación más silenciosa… | **Paráfrasis de título** (P2-1) |
| Una mesa, una sábana y su frazada | Qué poner y qué no | Parcial (P2-1) |
| Cerrado no es caliente | — | Distinto |
| Los cuatro H3 del H2-4 | Un refugio accesible para un perro con las articulaciones cansadas | Distinto |
| La lista para la consulta | Qué le cuentas y qué le pides que revise | Misma función, contenido propio; aceptable |
| Un miedo que aparece de mayor | Si el miedo es nuevo: lo que conviene descartar | **Paráfrasis de título y de cadena** (P2-1) |
| Acepromazina y CBD: lo que dicen los colegios | La acepromazina no es la respuesta | Parcial; otra fuente (COLVET) y el CBD es nuevo; aceptable |
| Pregunta quién atiende el 24 y el 31 | — | Distinto |
| Antes de que lleguen los invitados | Por la tarde: paseo, comida y puertas | **Misma secuencia** (P2-1) |
| Seis acuerdos para la familia | Por la noche… (7 pasos) + Consolar | **Parcial** (P2-1) |
| A la mañana siguiente, los restos | — | Distinto |
| Baltor · Cuando se orina · Luna y los temblores | (Luna nos busca, l. 328) | Distinto; P3-3 para Luna |
| Cuándo ir a urgencias + danger | Señales que piden veterinario enseguida + danger | Lista clínica parecida por necesidad; 0 n-gramas de 6; aceptable |
| Los tres H3 del H2-8 | Las primeras horas | Distinto tras la R2 |
| Chile y Colombia, en una tabla · Dónde buscar el decreto… · Si vives en España | Lo que sí y lo que no dice la Ley 7/2023 · Cómo averiguar las normas de tu ayuntamiento | Misma función, título y contenido propios; aceptable |
| Lo que oyes en diciembre | Qué dicen los dueños de la encuesta | Mismas cifras (declaradas), otro formato; aceptable |
| Si el 2 de enero sigue escondido | Lo esperable / Lo que debe mirar el veterinario | Reducido a remisión; aceptable |
| El perro que no se levanta, después de una noche larga | — | Distinto |
| Enero tiene once meses por delante | Qué es y cómo funciona / Si empiezas ahora, para marzo | **Parcial** (P2-1) |
| AlertBox info «No son mañas ni falta de carácter» | «Si tu perro lo pasa mal, no es un capricho» | Misma idea de apertura; anclada en «dejarlo afuera» (patio); aceptable |
| 8 FAQ (patio; bajo la cama; no se levanta; acepromazina; CBD; orina; Bogotá; ventilador) | 8 FAQ de España (miedo nuevo; consolar; calmante mío; feromonas; música; legalidad; escape; cuándo empezar) | Las 8 son distintas |
