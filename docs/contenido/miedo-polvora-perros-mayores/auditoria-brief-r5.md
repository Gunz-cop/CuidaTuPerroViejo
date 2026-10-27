# Auditoría independiente del brief LA-01 · Ronda R5

- **Documento auditado:** `briefings/briefing-miedo-polvora-perros-mayores.md` (v6 del 2026-10-27), commit `8297305`, blob `e77b0406c616fb02931c721ad998ef8a06b2b2e8`.
- **Rama:** `claude/brief-miedo-polvora-perros-mayores-latam`.
- **Ronda:** R5. El propietario autorizó R4–R6 el 2026-10-27. Después de esta ronda queda una (R6).
- **Fecha:** 2026-10-27.
- **Método:** skill `auditar-briefing-contenido` (con `references/formato-informe.md`). Como norma uso `calidad-editorial-adsense.md`, `guia-voz-tono.md`, `direccion-visual-editorial.md`, `apoyos-visuales-responsive.md` y `generar-briefing-contenido`. No generé ni corregí este brief y no hice las rondas anteriores. Solo he escrito este informe.
- **Alcance:**
  - **Cambios desde la v5.1:** diff `08600dd..8297305` del brief, de `direccion-visual-editorial.md` y de `TODO.md`.
  - **Hallazgos de la R4:** comprobé cada uno en el texto. No me basé en lo que dice `correccion-r4.md`.
  - **Testimonios:** comparé lo que cambió con `docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md` y con el `.mdx` de España.
  - **Foto original:** la abrí y comparé el alt con lo que se ve.
  - **Tarjeta:** leí `TarjetaRelacionada.astro` en `origin/claude/tarjeta-relacionada` (`be7fe56`) y el diff de `miedo-petardos-perros-mayores.mdx` en esa rama. Leí también `src/utils/image.ts` (`mobileImageFor`), `src/pages/[pilar]/[slug].astro` (`getStaticPaths`), `content.config.ts` (`status` por defecto) y la proyección Markdown (`scripts/agent-readiness/projection.mjs`, que parte del HTML compilado).
  - **Controles mecánicos con Python:** metadatos, suma de targets, H3 por H2, matriz fuente→H2 en cuatro sitios, enlaces internos y n-gramas de 6 y de 5 palabras frente a España.

## Veredicto

**NO APTO** (no válido para redacción). **El motivo:** el pie borrador de la foto real añade un hecho sobre Dakota que no consta en el archivo de testimonios («Ellas también conocen los temblores»). Además, contradice la regla que la v6 acaba de fijar: Dakota aparece «sin ningún hecho».

Todo lo demás está a nivel de reserva. La corrección es corta y no toca fuentes ni estructura, así que la R6 puede ser una comprobación breve.

Recuento: **0 P0 · 1 P1 · 3 P2 · 7 P3.**

## Comprobación de los hallazgos de la R4

| R4 | Estado en v6 | Evidencia |
|---|---|---|
| P2-1 Dakota y H2-4 | **Corregido**, con un resto (P3-1) y un hallazgo nuevo (P1-1) | La decisión 3 (l. 11), el §2 (l. 63) y el §9.4 (l. 621) dicen «solo en la fotografía y su pie, sin hechos». La decisión 4 (l. 12), el *Origen* del H2-4 (l. 327) y el §9.4 (l. 622) dicen «sin caso; la perra del compañero solo en H2-3». El resto: la l. 57 sigue diciendo «Dakota y Jaspe no se usan». El hallazgo nuevo: el pie de la foto le atribuye un hecho (P1-1). |
| P2-2 Identificación de la foto | **Corregido** | En el §8, «Luna **sería**…» y «Es una deducción: **gate**». En el §11 la casilla está sin marcar. En el §8, l. 520, ya no dice «tricolores». `TODO.md` la mantiene abierta. |
| P2-3 Imagen 4 = portada de vacunas | **Corregido**, con efecto secundario (P2-2) | Ya no hay consultorio: la escena es la tutora escribiendo en la cocina, y vacunas está añadida a los conceptos usados (l. 489). Sin embargo, la escena nueva repite dentro del artículo la luz y la composición de las imágenes 2 y 3 (P2-2), y la línea de paleta sigue nombrando el consultorio (P3-3). |
| P2-4 Geometría de Baltor | **Corregido** | La cámara es baja, en el rincón, detrás y a un lado de Baltor. Lomo y melena en primer término; puerta del cuarto y, al fondo del pasillo, puerta del apartamento. El prompt, el alt («visto desde atrás… que mira la puerta abierta y el pasillo») y la aceptación describen la misma geometría, que es posible: el perro y las dos puertas están en la misma dirección. «Mira» se deduce de la orientación de la cabeza, y eso basta. |
| P2-5 Orden de la tarjeta | **Corregido en lo esencial** (ver la sección de la tarjeta) | No queda ningún camino que lleve a un enlace roto. La v6 rechaza que el build falle, como pedía la R4, y lo justifica: avisa en consola para que la tarjeta pueda quedar preparada. Es una decisión documentada y razonable; no la cuento como hallazgo. La descripción del componente en el §5.2 tiene inexactitudes (P2-3). |
| P3-1 Estado e historial | Corregido | Estado v6, fecha (v6), título del §8 «7 IMÁGENES», §10, §11 y fila R4 en el historial. |
| P3-2 Aceptación de las imágenes 1 y 7 | Corregido | Las dos fichas (l. 528 y 578) coinciden con su prompt. En la 1: perro de frente, tutor de espaldas en tres cuartos, sin correa, cinco dedos. En la 7: candado cerrándose, placa visible, nadie toca al perro, manga lila y anillo. |
| P3-3 Pie y posición de la imagen 3 | Corregido | «Algunos perros buscan solos un hueco…». La posición, separada de la frase del compañero, está escrita (l. 544). |
| P3-4 Alt y pie de la foto | Alt corregido; **el pie nuevo introduce el P1-1** | El alt («cama gruesa», sin gato) coincide con la foto: comprobado al abrirla. El pie ya no parafrasea España (0 n-gramas de 5), pero añade el hecho del P1-1. |
| P3-5 Continuidad de las personas | Corregido | La misma tutora (55 años, pelo negro con canas, blusa lila, anillo) en las imágenes 4 y 7, y el tutor de 35 años en la 1 (l. 493, 550, 575, 553, 578). |
| P3-6 Excepción de edad en la norma | **Llevada a la norma, pero la edición rompió el párrafo de leishmaniosis** | Ver P2-1. |
| P3-7 Importación de la tarjeta | Corregido | §4, condicionada. |
| P3-8 Aviso al compañero | Corregido | Tarea nueva en `TODO.md`. |

## Hallazgos

### P0

Ninguno.

### P1. Bloquea la redacción

**P1-1. El pie de la foto real atribuye a Dakota un hecho que no está en el archivo.**
- *Ubicación:* §8, imagen 6, «**Pie (borrador, tras el gate):** Fotografía de la familia: Luna, en la cama, y Dakota, junto al sillón. **Ellas también conocen los temblores.**» (l. 568).
- *Evidencia:*
  - El archivo de testimonios atribuye los temblores solo a Luna, l. 18: «En los momentos en que ha perdido el control o se ha asustado, y no solo con pólvora sino con temblores, terremotos y choques, **ella** busca a la familia».
  - En la sección de Dakota (l. 31–48) no hay nada sobre temblores. El único matiz compartido por las dos perras (l. 14 y 48) habla de la **pólvora** de 2025 («algo nerviosas y muy alerta»).
  - El propio brief prohíbe atribuir hechos a Dakota: decisión 3 (l. 11, «**sin ningún hecho**»), §2 (l. 63) y §9.4 (l. 621, «Dakota aparece solo en la fotografía y su pie, sin hechos»). Es la regla que la v6 escribió para cerrar el P2-1 de la R4.
  - Además, «también» va justo detrás de `### Luna y los temblores`. El lector entenderá que a las dos les asustan los temblores.
- *Por qué es P1 y no P0:* es una frase de un pie marcado como borrador. «Conocen» admite la lectura trivial de «los han vivido». Aun así, es un hecho sin procedencia sobre un perro real, en el sitio donde el lector más confía en lo que lee: el pie de una fotografía real. El redactor lo copiará tal cual porque el §9.3 exige «7 imágenes con alt y pie del §8». El gate del §11 solo cubre la identificación, no esta frase. `calidad-editorial-adsense.md` pide procedencia para cada caso. Si se lee como un hecho alterado, sería P0, con el mismo veredicto.
- *Corrección:* borrar la segunda frase. Si el pie necesita un vínculo con el H3, que hable solo de Luna. Por ejemplo: «Fotografía de la familia: Luna, en la cama, y Dakota, junto al sillón». O bien: «…En casa, Luna también se asusta con los temblores», siempre que la frase no repita palabra por palabra el H3 de Luna. No atribuir nada a Dakota.

### P2. Corregir antes de redactar

**P2-1. La excepción de edad añadida a la norma se llevó la salvaguarda de la leishmaniosis.**
- *Ubicación:* `.agents/skills/references/direccion-visual-editorial.md`, l. 54–56 (diff `08600dd..8297305`).
- *Evidencia:*
  - Antes de la v6, el párrafo de la leishmaniosis terminaba así: «Esta excepción no se aplica a otros artículos… **No se representa un paciente real ni se diagnostica por aspecto: alts, pies y animación deben decir que son señales posibles, que muchos perros infectados se ven normales y que la ausencia de lesiones no descarta infección. Encargo y prompts: [prompt-correccion-visual-v4.md]…**».
  - La edición cortó esa parte y la pegó al final del párrafo nuevo de LA-01. Ahora la excepción de Osa y Baltor exige decir que «muchos perros **infectados** se ven normales» y enlaza el encargo visual de la leishmaniosis.
  - El párrafo de la leishmaniosis se quedó sin su regla sobre alts, pies y diagnóstico.
- *Por qué importa:* es un archivo normativo compartido por todos los artículos. El auditor de LA-01 encontrará una obligación absurda. El de una futura revisión de leishmaniosis no verá su salvaguarda en el sitio que le corresponde. El §10 del brief marca «[x] excepción… declarada aquí y en la dirección visual» sobre un texto defectuoso.
- *Corrección (en otra sesión):* devolver la frase «No se representa un paciente real… Encargo y prompts: […]» al final del párrafo de la leishmaniosis, antes de «Esta excepción no se aplica a otros artículos…». Dejar el párrafo de LA-01 terminado en «…consta en el archivo de testimonios.».

**P2-2. La imagen 4 nueva repite, dentro del mismo artículo, la escena de las imágenes 2 y 3.**
- *Ubicación:* §8, imágenes 2, 3 y 4.
- *Evidencia:*
  - **Imagen 2:** de noche, «mesa… con mantel de plástico», «bombillo colgado sobre la mesa», perra echada bajo la mesa, piso de cerámica, ISO 3200.
  - **Imagen 3:** de noche, lámpara cálida, perro echado bajo un mueble, en penumbra, ISO 3200.
  - **Imagen 4:** de noche, «mesa con mantel de plástico de cuadros», «lámpara colgante cálida sobre la mesa», perro echado en el piso de cerámica junto a la pata de la silla, ISO 2500.
  - Las tres van seguidas en el texto (H2-2, H2-3 y H2-5), a una distancia de unas 1.000 palabras. A 390 px se leerán como la misma foto: perro echado junto a un mueble, con luz cálida de noche.
  - La lista de «Paleta propia por escena» (l. 490) se escribió para la imagen 4 del consultorio («luz de ventana y fluorescente»), que ya no existe.
- *Por qué importa:* la v6 sacó la imagen 4 de un concepto ya publicado (vacunas), pero la llevó a un concepto que el propio artículo ya usa dos veces. La dirección visual pide una paleta propia por escena y conceptos que no se repitan.
- *Corrección:* cambiar la luz y la hora de la imagen 4. Una opción es hacerla de día, en noviembre, con luz de ventana lateral, la tutora en la mesa de la cocina o del corredor y el perro sentado o de pie a su lado, no echado bajo la mesa. Otra es un plano detalle de la libreta y las manos, con el perro desenfocado al fondo. Actualizar la línea de paleta (l. 490) con la luz que se elija y quitar «consultorio».

**P2-3. El §5.2 describe dos tarjetas distintas, y la parte de diseño no coincide con el componente.**
- *Ubicación:* §5.2, l. 246–250.

| El brief dice | El componente (`be7fe56`) hace |
|---|---|
| «Lee el título, la `metaDescription`, el `heroImage` **y el `heroImageAlt`**» (l. 246) | No lee `heroImageAlt`: la imagen lleva `alt=""` (que es, por otra parte, lo que pide la l. 247) |
| «Miniatura… proporción 16:9, unos 160 px… y **112 px en móvil**… título (**2 líneas** como máximo)» (l. 247) | En móvil, `width: 6rem` (96 px), `aspect-ratio: 4 / 3` y `-webkit-line-clamp: 3`. Desde 640 px, 10rem (160 px), 16:9 y 2 líneas. Coincide con la l. 250, no con la l. 247 |
| «Toda la tarjeta es un único enlace, **con el título como texto accesible**» (l. 247) | El nombre accesible del `<a>` es la etiqueta, el título y la `metaDescription` concatenados. La flecha va con `aria-hidden`. El título no es el único texto |

- *Por qué importa:* el §11 manda probar la tarjeta en móvil a 390 px y con lector de pantalla. Quien la pruebe tiene dos especificaciones para el móvil y una afirmación de accesibilidad que no se cumple. O dará por mala una implementación que es correcta, o por buena una que no lo es.
- *Corrección:* dejar en el §5.2 una sola especificación, la implementada (96 px 4:3 y 3 líneas en móvil; 160 px 16:9 y 2 líneas desde 640 px). Quitar «y el `heroImageAlt`». Describir el nombre accesible tal como es: «etiqueta, título y descripción». Otra opción es pedir en el PR de código un `aria-label` con el título, o que la descripción quede fuera del nombre accesible, y escribir aquí lo que se decida.

### P3. Menores

1. **Resto de Dakota en el §2.** La l. 57 dice «Dakota y Jaspe no se usan», sin la salvedad de la foto. Escribir: «Dakota solo en la fotografía, sin hechos; Jaspe no se usa».
2. **El pie de la imagen 4 contradice el consejo del H2-10.** El pie dice: «La noche antes de la consulta: anotar dónde se metió el diciembre pasado, cuánto duró y si comió». El H2-10 dice: «anotar en enero, con la memoria fresca, qué pasó cada noche… y llevar esa nota a la consulta de noviembre». La imagen enseña a escribir de memoria once meses después. Proponer: «La noche antes de la consulta: pasar a limpio lo que anotaste en enero…», o bien no fijar el momento.
3. **La línea de paleta (l. 490) nombra un «consultorio con luz de ventana y fluorescente»** que ya no está en ninguna imagen. Se corrige con el P2-2.
4. **Posición de la tarjeta en la introducción.** En el §6 aparece entre la «Promesa» y el `AlertBox` `info`. En el §5.2 va «justo después de la introducción (antes del primer H2)». En España (`be7fe56`) va **después** del `AlertBox`. Fijar una sola posición: después del `AlertBox`, como en España.
5. **La tarjeta de LA-01 puede perderse en silencio.** El §4 y el §9.3 dicen «solo si el componente ya está en `main` al redactar; si no, se deja fuera». No hay ningún paso que la añada si el componente se fusiona después. Añadir al §11 un gate: «antes de publicar LA-01, `TarjetaRelacionada` está en `main` y la tarjeta hacia España está en el `.mdx`», o redactar sobre una rama que ya lo incluya. Si no, la decisión de poner la tarjeta en los dos sentidos puede quedar en uno solo.
6. **Posición de la imagen 6.** La l. 485 («la 6 al final del H2-7, con el aviso `danger` después») y la l. 563 («al final») siguen siendo inexactas, porque `### Cuándo ir a urgencias` está en el mismo H2. Escribir: «entre `### Luna y los temblores` y `### Cuándo ir a urgencias`». Ya se señaló en el cuerpo de la R4.
7. **`TODO.md`:** la tarea «Decidir el enlace entre versiones A/B/C» sigue abierta aunque se decidió el 2026-10-27, y la del PR de código no menciona que la rama `claude/tarjeta-relacionada` ya existe. Ya se señaló en el efecto cascada de la R4. Cerrar la primera con fecha y actualizar la segunda.

## Tarjeta horizontal (§5.2): comprobación contra el código

- **El destino no publicado no deja un enlace roto.** `getCollection('blog', ({ id, data }) => id === slug && data.status === 'Publicado')`. Si no hay entrada, el componente no pinta nada, ni `<a>` ni hueco, y escribe un `console.warn` con el slug.
- **No hay página «oculta» a la que apunte.** `getStaticPaths` (`[pilar]/[slug].astro`) genera página para todas las entradas, sin filtrar por estado. `status` tiene «Publicado» por defecto (`content.config.ts`, l. 30), y el YAML de LA-01 lo declara. La tarjeta solo aparece cuando la página existe.
- **La proyección Markdown tampoco tendrá enlace.** Se genera desde el HTML compilado (`projection.mjs`, l. 123–128), así que mientras LA-01 no exista no hay enlace.
- **El `href`** es `/${post.data.pilar}/${post.id}`, igual que en `SiloNavigation`. Lo que dice el brief es exacto.
- **La miniatura** usa `mobileImageFor`, que devuelve la versión `-400.webp` solo si existe en `public/`; si no, usa el `heroImage`. «Usa la miniatura de 400 px si existe» es exacto.
- **España** (`be7fe56`): importación en la l. 17 y `<TarjetaRelacionada slug="miedo-polvora-perros-mayores" etiqueta="Versión para Latinoamérica" />` después del `AlertBox` `info`, antes del primer H2. Coincide con el §5.2, salvo la posición en LA-01 (P3-4).
- **Estilo:** tokens `--color-brand-border`, `--color-brand-card`, `--color-brand-text`, `--color-brand-muted` y `--color-brand-accent`; sombra leve al pasar el ratón; `focus-visible`; `prefers-reduced-motion`; sin banderas. Coincide.
- **Orden de publicación:** la tarjeta de España hacia LA-01 puede entrar ya. Hoy no se ve y aparecerá sola al publicar LA-01. La alternativa, para quien no quiera código dormido, está documentada. **Conclusión: el orden no deja ningún enlace roto.** Quedan sin resolver la exactitud de la descripción (P2-3) y el riesgo de que la tarjeta en sentido contrario no llegue a ponerse (P3-5).

## Verificación de fuentes

Ninguna afirmación de S1–S14 cambió desde la R4: el diff `08600dd..8297305` del brief solo toca el estado, la decisión 3 y la 4, el §2, el §4, el §5.2, el *Origen* del H2-4, el §8, el §9.4, el §10, el §11 y el historial. Por eso, y como pedía el encargo, no reabrí ninguna fuente. El pie nuevo de la imagen 3 no se atribuye a S9: se apoya en la anécdota y dice «algunos», como recomendó la R4 tras reabrir S9.

| Fuente | Identificador | Resultado en R5 |
|---|---|---|
| S1 Salonen 2020 | DOI 10.1038/s41598-020-59837-z · PMID 32139728 | Sin cambios (verificada en R1/R2) |
| S2 Gähwiler 2020 | PMC7525486 | Sin cambios |
| S3 Lopes Fagundes 2018 | DOI 10.3389/fvets.2018.00017 · PMID 29487858 | Sin cambios |
| S4 Riemer 2020 | DOI 10.1016/j.jveb.2020.04.005 (verificación parcial, marcada) | Sin cambios |
| S5 ESVCE 2026 | PDF v2.1 | Sin cambios |
| S6 Riemer 2019 | PMC6730926 | Sin cambios |
| S7 IDPYBA 2024 | bogota.gov.co/… | Sin cambios (R3) |
| S8 Bogotá 2025 | bogota.gov.co/en/node/282673 | Sin cambios (R3) |
| S9 COLVET / El Delfino | delfino.cr/2024/12/… | Sin cambios (reabierta en R4) |
| S10 COLVET / Teletica | teletica.com/…_325734 | Sin cambios |
| S11 FMVZ-UNAM / N+ | nmas.com.mx/… | Sin cambios |
| S12 Ley 21.310 | Diario Oficial 42.871 | Sin cambios |
| S13 Ley 670/2001 | secretariasenado… | Sin cambios |
| S14 Ley 2224/2022 | secretariasenado… | Sin cambios |

**Veredicto de fuentes:** completo para esta ronda. No hay identificadores nuevos.

## Comprobaciones mecánicas (Python)

| Control | Resultado |
|---|---|
| seoTitle | **55** caracteres; idéntico en la tabla y en el YAML |
| metaDescription | **156**; idéntica en la tabla y en el YAML |
| Suma de targets | 320 + 510 + 560 + 450 + 520 + 520 + 480 + 460 + 360 + 420 + 560 + 540 = **5.700** |
| H3 frente al H2 | H2-1 500/510; H2-5 460 + aviso 60; H2-7 400 + aviso 60; H2-9 220 + 150 + 40 = 410/420; el resto, exactos. Todos dentro del ±10 % |
| Matriz fuente→H2 | §3 (`*H2:*`), línea de matriz del §6, `*Sustentado en:*` de cada H2 y §9.2: **idénticos** para S1–S14 |
| Enlaces internos | 12 URL de artículo: 11 existen con `pilar` coherente (9 con `status: "Publicado"` y 2, chequeo y golpe de calor, con el valor por defecto). La que falta es la del propio LA-01. Existen la calculadora y el pilar. LA-01 está en `[~]` en el inventario (l. 284) |
| n-gramas frente al `.mdx` de España | 0 secuencias de 6 y 0 de 5 en los 3 `AlertBox`, las 8 preguntas y respuestas de la FAQ, los títulos de H2 y de H3, y todos los alt y pies del §8 |
| Frontmatter frente al §8 | `heroImage`, `heroImageAlt` y `heroImageCaption` = archivo, alt y pie de la imagen 1 |
| Requisito senior | Imágenes 1, 3, 4 y 7: bloque íntegro con postura y línea de rechazo. Imágenes 2 y 5: excepción declarada («adulto maduro», rechazo «cachorro o perro viejo»). Imagen 6: foto real |
| Foto original | El alt v6 coincide con la imagen: una beagle tricolor echada sobre una cama gruesa mira a la cámara y otra, blanca con manchas, está en el piso junto al sillón. El gatito, sobre la segunda cama, no se menciona |

## Contradicciones internas nuevas buscadas

- **Dakota:** coherente en la decisión 3, el §2 (l. 63), el §8 y el §9.4. Excepciones: la l. 57 (P3-1) y el pie (P1-1).
- **H2-4:** «sin caso» coincide en la decisión 4, el §2, el *Origen*, el §9.4 y el §11. La perra del compañero solo aparece en el H2-3, en el §2, en el §6 y en la imagen 3, nunca ligada al H2-4. El cierre del H2-4 prohíbe mencionar el caso del compañero.
- **Tutora:** la de las imágenes 4 y 7 es la misma en el prompt, la aceptación y el párrafo de continuidad. El tutor de la imagen 1 está declarado como otro miembro de la familia. Sin contradicción.
- **Cronología:** imagen 4 en noviembre, la noche antes de la consulta; imagen 7 el 24 a las 3:30; portada el 24 a las 5:00, con el candado ya puesto. Coherente. El pie de la imagen 4 choca con el consejo de anotar en enero (P3-2).

## Efecto cascada

- **Artículo:** `src/content/blog/miedo-polvora-perros-mayores.mdx` no existe, así que no se ha propagado nada. Si se redacta antes de corregir el P1-1, el pie de la foto llevaría el hecho inventado.
- **`direccion-visual-editorial.md`:** el P2-1 afecta a la **leishmaniosis**, que ya está publicada. Su salvaguarda de alts y pies quedó bajo el epígrafe de LA-01. Quien revise imágenes de leishmaniosis debe leer la versión corregida.
- **Rama `claude/tarjeta-relacionada`:** no necesita cambios para el orden de publicación. Si se adopta la alternativa del `aria-label` del P2-3, el cambio va en esa rama.
- **Otros briefs:** no hay fuentes nuevas ni corregidas, así que no hay cascada de fuentes.

## Lo que sí funciona (no romper al corregir)

- **Las cinco reservas de la R4 están resueltas en el fondo.** La imagen 5 tiene una geometría posible y coherente en sus tres campos. La identificación de la foto vuelve a ser un gate. El H2-4 queda limpio de casos.
- **La tarjeta no puede producir un enlace roto.** Comprobado en el código, en el enrutado y en la proyección Markdown. La decisión de avisar en lugar de romper el build está razonada.
- **El alt de la foto** es fiel a la imagen y no promociona la cama.
- **Continuidad de la familia del mestizo**, aceptación de las imágenes 1 y 7, y pie prudente en la imagen 3.
- La matriz, el presupuesto, los metadatos, los enlaces y los n-gramas siguen exactos. Las fuentes no se han tocado.

## Qué corregir, en orden (para otra sesión)

1. **P1-1:** en el §8, imagen 6, borrar «Ellas también conocen los temblores.». Si se quiere un vínculo con el H3, que hable solo de Luna. No atribuir nada a Dakota.
2. **P2-1:** en `direccion-visual-editorial.md`, devolver la frase «No se representa un paciente real… Encargo y prompts: [prompt-correccion-visual-v4.md](…)» al párrafo de la leishmaniosis y cerrar el de LA-01 en «…consta en el archivo de testimonios.».
3. **P2-2:** cambiar la luz, la hora o la composición de la imagen 4 para que no repita las imágenes 2 y 3 (de día y con luz de ventana, o un plano detalle de la libreta). Ajustar el alt, el pie, la aceptación y la línea de paleta (l. 490, sin «consultorio»).
4. **P2-3:** en el §5.2, una sola especificación de la tarjeta: la implementada (96 px 4:3 y 3 líneas en móvil; 160 px 16:9 y 2 líneas desde 640 px). Quitar `heroImageAlt` y describir el nombre accesible real, o encargar el `aria-label` al PR de código.
5. **P3-1 a P3-7:** la l. 57 sobre Dakota; el pie de la imagen 4 («pasar a limpio lo que anotaste en enero»); la posición de la tarjeta después del `AlertBox`; el gate de la tarjeta de LA-01 en el §11; la posición de la imagen 6; `TODO.md`.
6. **R6:** basta con comprobar estos cambios con búsquedas de texto, sin reabrir fuentes, si la corrección no toca nada más. Es la última ronda autorizada. Si la R6 falla, hay que detenerse y revisarlo con el propietario.
