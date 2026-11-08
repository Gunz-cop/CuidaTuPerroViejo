# Auditoría independiente del brief LA-01 · Ronda R6

- **Documento auditado:** `briefings/briefing-miedo-polvora-perros-mayores.md` (v6.1 del 2026-10-27), commit `f8faaa1`, blob `c148a35ba4fb918e0b773e40df6ddf2e9a119db1`.
- **Rama:** `claude/brief-miedo-polvora-perros-mayores-latam`.
- **Ronda:** R6, la última de las autorizadas por el propietario el 2026-10-27 (R4–R6).
- **Fecha:** 2026-10-27.
- **Método:** skill `auditar-briefing-contenido` (con `references/formato-informe.md`). Como norma uso `calidad-editorial-adsense.md`, `guia-voz-tono.md`, `direccion-visual-editorial.md`, `apoyos-visuales-responsive.md` y `generar-briefing-contenido`. No generé ni corregí este brief, y no hice las rondas anteriores. Solo he escrito este informe.
- **Alcance:**
  - **Cambios desde la v6:** diff `8297305..f8faaa1` del brief, de `direccion-visual-editorial.md` y de `TODO.md`.
  - **Hallazgos de la R5:** comprobé en el texto cada P1, P2 y P3, sin fiarme de lo que dice `correccion-r5.md`.
  - **Norma visual:** comparé `direccion-visual-editorial.md` con `git show 4c8b3a2:` (la versión anterior a la v6).
  - **Tarjeta:** comparé el §5.2 con `git show origin/claude/tarjeta-relacionada:src/components/article/TarjetaRelacionada.astro` (`be7fe56`) y con el `.mdx` de España de esa rama.
  - **Testimonios:** comparé cada hecho del §2, del §6, del §8 y del §9.4 con `docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md`.
  - **Controles mecánicos con Python:** metadatos, suma de targets, H3 por H2, matriz fuente→H2 en cuatro sitios, enlaces internos y n-gramas de 6 y de 5 palabras frente a España.

## Veredicto

**APTO con reservas** (válido con reservas para redacción). **El motivo:** la v6.1 corrige el P1 y los tres P2 de la R5, y ninguna de las reservas que quedan afecta a fuentes, testimonios, enlaces ni seguridad. Son cuatro restos de redacción o de coherencia que se arreglan en minutos. Dos de ellos, en la imagen 4 rehecha.

Recuento: **0 P0 · 0 P1 · 0 P2 · 4 P3.**

Como no hay P0 ni P1, no hace falta parar y revisar con el propietario. Las P3 se pueden corregir sin otra ronda: la sesión que redacte o la que corrija las aplica, y el auditor del artículo comprueba que se hicieron.

## Comprobación de los hallazgos de la R5

| R5 | Estado en v6.1 | Evidencia |
|---|---|---|
| **P1-1** Pie de la foto con un hecho de Dakota | **Corregido** | Pie (l. 569): «Fotografía de la familia: Luna, en la cama, y Dakota, junto al sillón.». Ya no dice nada de temblores. A Dakota no se le atribuye ningún hecho en ningún sitio: lo comprobé en la decisión 3, el §2 (l. 57 y 63), el §8 y el §9.4. |
| **P2-1** Salvaguarda de leishmaniosis desplazada | **Corregido** | El `diff` entre `4c8b3a2` y el archivo actual solo **añade** el párrafo de LA-01 (l. 56). El párrafo de la leishmaniosis, incluida la frase «No se representa un paciente real… Encargo y prompts: [prompt-correccion-visual-v4.md]…», es **idéntico byte a byte** al de antes. El párrafo de LA-01 está completo y no se mezcla con el de la leishmaniosis. Dice quién (Osa y Baltor), por qué (maduros, todavía no senior, según el propietario), qué piden los prompts, la línea de rechazo, que el pie dice «recuerdo», que el mestizo cumple el requisito completo y a qué se limita: solo perros reales de testimonios cuya edad conste en el archivo. Esa edad consta en las l. 75 y 96 del archivo. El párrafo coincide con el §8 (l. 517). |
| **P2-2** Imagen 4 repetía las imágenes 2 y 3 | **Corregido**, con dos restos (P3-1 y P3-2) | Ahora la escena es «una tarde de noviembre», con «luz natural de día desde la ventana de la izquierda… sin lámparas encendidas» e ISO 800. El perro está **sentado** «a plena luz», no echado bajo un mueble. El prompt, el alt («de día», «sentado a su lado») y la aceptación («no una escena nocturna») dicen lo mismo. La línea de paleta (l. 491) está reescrita imagen por imagen y ya no menciona el consultorio. Lo comprobé: solo las imágenes 2, 3 y 5 son nocturnas, y cada una tiene otra fuente de luz (bombillo, lámpara de escritorio, pasillo). |
| **P2-3** §5.2 frente al componente | **Corregido** | Lo detallo en la sección de la tarjeta. Cada dato de las l. 246–247 coincide con `be7fe56`. |
| P3-1 Dakota en la l. 57 | Corregido | «Dakota solo en la fotografía, sin hechos; Jaspe no se usa». |
| P3-2 Pie de la imagen 4 frente al H2-10 | Corregido en el pie; **queda un resto en la l. 490 (P3-1)**, y la redacción que yo mismo propuse en la R5 trae un problema nuevo (P3-2) | Pie: «Antes de la consulta, pasar a limpio lo que anotaste en enero…». |
| P3-3 Línea de paleta | Corregido | l. 491. |
| P3-4 Posición de la tarjeta | Corregido | §5.2 (l. 233): «después del `AlertBox` `info` y antes del primer H2 (igual que en España)». §6 (l. 279): ya va detrás del `AlertBox`. En España (`be7fe56`, l. 43) está detrás del `AlertBox`, antes de `## Por qué los petardos…`. |
| P3-5 Tarjeta de LA-01 que se pierde | Corregido, con una tensión menor (P3-4) | Hay un gate nuevo en el §11 (l. 686). |
| P3-6 Posición de la imagen 6 | Corregido | Coinciden la l. 486, el encabezado de la imagen 6 (l. 564) y la tabla (l. 483). |
| P3-7 `TODO.md` | Corregido, con un resto (P3-3) | La decisión A/B/C está cerrada con fecha, y la tarea del PR menciona la rama `claude/tarjeta-relacionada`. Pero la cabecera de la tarea LA-01 sigue diciendo «Brief v4… R3». |

## Hallazgos

### P0

Ninguno.

### P1

Ninguno.

### P2

Ninguno.

### P3. Menores (corregir sin otra ronda)

**P3-1. La l. 490 sigue situando la imagen 4 «la noche antes de la consulta».**
- *Ubicación:* §8, *Criterio anti-«IA genérica»*, primera viñeta: «…la imagen 4 muestra la lista escrita en casa, **la noche antes de la consulta**».
- *Evidencia:* el prompt rehecho dice «una tarde de noviembre» y «luz natural de día», y la aceptación dice «no una escena nocturna». `correccion-r5.md` declara «pie de la imagen 4 sin “la noche antes”». El pie se corrigió, pero esta línea no.
- *Por qué importa poco:* quien genera la imagen trabaja con el prompt, y el prompt no tiene ambigüedad. Aun así, es la única contradicción interna nueva del §8.
- *Corrección:* «…la imagen 4 muestra, de día, la lista para la consulta pasada a limpio en casa».

**P3-2. El pie de la imagen 4 da por hecho que el lector tomó notas en enero.** La redacción la propuse yo en la R5, y me corrijo aquí.
- *Ubicación:* §8, imagen 4: Función, Prompt y Pie (l. 550–553). Afecta también al §6, H2-5, `### La lista para la consulta` (l. 350).
- *Evidencia:*
  - El artículo sale en noviembre (§1, ventana editorial). Quien lo lea este año casi nunca habrá anotado nada en enero, porque el consejo de anotar en enero solo aparece en el H2-10 (l. 443), cinco H2 después de la imagen.
  - Mientras tanto, el H2-5 le pide reconstruir de memoria «qué hizo el diciembre pasado» (l. 350).
  - El pie dice «dónde se metió, **cuánto duró** y si comió». El H2-10 dice «dónde se metió, **a qué hora empezó**, si comió». Es una diferencia pequeña entre dos listas que deberían ser la misma.
- *Por qué importa:* el §9.3 obliga a usar el pie del §8, así que el redactor lo copiará. El primer año, el lector se encuentra con una instrucción que no puede cumplir.
- *Corrección:* elegir una de dos.
  - **(a)** Pie: «Antes de la consulta, anotar lo que recuerdes del diciembre pasado, o pasar a limpio tus notas de enero: dónde se metió, a qué hora empezó y si comió». En el H2-5 (`### La lista para la consulta`), añadir media frase: «si el año pasado tomaste notas, llévalas».
  - **(b)** Quitar «de enero» del pie y de la Función, y dejar «pasar a limpio la lista». El prompt puede seguir mostrando a la tutora copiando de una hoja.
  - En las dos, igualar la lista del pie con la del H2-10.

**P3-3. El estado y el historial no están al día.**
- *Ubicación y evidencia:*
  - **l. 5:** «…queda margen para R5 y R6» y «corregidas en esta v6».
  - **l. 31:** «Fecha brief | 2026-10-27 (v6)».
  - **l. 694:** «R1–R4 hechas; R5 y R6 autorizadas si hacen falta».
  - **`TODO.md`, l. 16:** «Brief v4… R3 APTO con reservas».
- *Corrección:*
  - **Estado:** «v6.1… R5 NO APTO corregida; R6 APTO con reservas; no quedan rondas autorizadas».
  - **Fecha brief:** «(v6.1)».
  - **§11:** «R1–R6 hechas».
  - **Historial:** añadir la fila de la R6.
  - **`TODO.md`:** «Brief v6.1, R6 APTO con reservas».

**P3-4. El §4 y el §9.3 piden el componente «en `main`», y el gate nuevo admite también «la rama de redacción».**
- *Ubicación:* §4 (l. 192 y 198) y §9.3 (l. 613), frente al §11 (l. 686).
- *Evidencia:* si el redactor trabaja en una rama que ya incluye `TarjetaRelacionada.astro` sin que esté en `main`, el §4 le manda dejar la tarjeta fuera, y el gate da por buena esa misma rama.
- *Corrección:* escribir en los tres sitios «en `main` o en la rama de redacción», o quitar esa alternativa del gate.

## Tarjeta horizontal (§5.2): comprobación contra el código (`be7fe56`)

| El brief (l. 246–251) dice | El componente hace | ¿Coincide? |
|---|---|---|
| Lee título, `metaDescription` y `heroImage`; miniatura `alt=""` | `post.data.title`, `post.data.metaDescription` y `mobileImageFor(heroImage) ?? heroImage`; `alt=""` | Sí |
| Móvil: 96 px en 4:3, título hasta 3 líneas, descripción en 1 | `width: 6rem`, `aspect-ratio: 4 / 3`, `-webkit-line-clamp: 3` / `1` | Sí |
| Desde 640 px: 160 px en 16:9, título y descripción hasta 2 líneas | `@media (min-width: 640px)`: `10rem`, `16 / 9`, `line-clamp: 2` / `2` | Sí |
| Flecha discreta con `aria-hidden` | `<span … aria-hidden="true">→</span>` | Sí |
| Un único enlace; nombre accesible = etiqueta, título y descripción | `<a>` que envuelve los tres `<span>` de texto; la imagen no aporta nada, porque tiene `alt=""` | Sí |
| `loading="lazy"`, esquinas redondeadas | `loading="lazy"`, `border-radius: .6rem` | Sí |
| Tokens `brand-card` y `brand-border`, sombra leve al pasar el ratón, sin banderas | `--color-brand-card`, `--color-brand-border` y `box-shadow` en `:hover`; sin banderas | Sí |
| Destino no publicado: no pinta nada y avisa en el build | Filtro `status === 'Publicado'`; `{post && …}`; `console.warn` | Sí |
| `href` `/${pilar}/${id}` | `/${post.data.pilar}/${post.id}` | Sí |

«Versalitas pequeñas» se implementa con `text-transform: uppercase` a `.7rem`. A la vista es lo mismo, así que no lo cuento como hallazgo. El P2-3 de la R5 queda cerrado.

## Verificación de fuentes

El diff `8297305..f8faaa1` del brief no toca **ninguna** afirmación de S1–S14 ni de sus matrices. Solo cambia el estado, el §2 (l. 57), el §5.2, el orden de la introducción, el §8 (imágenes 4 y 6, posición y paleta), el §11 y el historial. El pie nuevo de la imagen 4 no se atribuye a ninguna fuente. Por eso, como pedía el encargo, no reabrí ninguna fuente.

| Fuente | Identificador | Resultado en R6 |
|---|---|---|
| S1 Salonen 2020 | DOI 10.1038/s41598-020-59837-z · PMID 32139728 | Sin cambios (verificada en R1/R2) |
| S2 Gähwiler 2020 | PMC7525486 | Sin cambios |
| S3 Lopes Fagundes 2018 | DOI 10.3389/fvets.2018.00017 · PMID 29487858 | Sin cambios |
| S4 Riemer 2020 | DOI 10.1016/j.jveb.2020.04.005 (verificación parcial, marcada) | Sin cambios |
| S5 ESVCE 2026 | PDF v2.1 | Sin cambios |
| S6 Riemer 2019 | PMC6730926 · PMID 31490926 | Sin cambios |
| S7 IDPYBA 2024 | bogota.gov.co/… | Sin cambios (R3) |
| S8 Bogotá 2025 | bogota.gov.co/en/node/282673 | Sin cambios (R3) |
| S9 COLVET / El Delfino | delfino.cr/2024/12/… | Sin cambios (reabierta en R4) |
| S10 COLVET / Teletica | teletica.com/…_325734 | Sin cambios |
| S11 FMVZ-UNAM / N+ | nmas.com.mx/… | Sin cambios |
| S12 Ley 21.310 | Diario Oficial 42.871 | Sin cambios |
| S13 Ley 670/2001 | secretariasenado… | Sin cambios |
| S14 Ley 2224/2022 | secretariasenado… | Sin cambios |

**Veredicto de fuentes:** completo para esta ronda. No hay identificadores nuevos ni afirmaciones cambiadas.

## Comprobaciones mecánicas (Python)

| Control | Resultado |
|---|---|
| seoTitle | **55** caracteres; idéntico en la tabla y en el YAML |
| metaDescription | **156**; idéntica en la tabla y en el YAML |
| Suma de targets | 320 + 510 + 560 + 450 + 520 + 520 + 480 + 460 + 360 + 420 + 560 + 540 = **5.700** |
| H3 frente al H2 | H2-1 500/510; H2-5 460 + aviso 60; H2-7 400 + aviso 60; H2-9 220 + 150 + 40 = 410/420; el resto, exactos |
| Matriz fuente→H2 | §3 (`*H2:*`), línea de matriz del §6, `*Sustentado en:*` de cada H2 y tabla del §9.2: **idénticos** para las 14 fuentes |
| Enlaces internos | 12 URL de artículo, de las que existen 11, todas con `pilar` coherente: 9 con `status: "Publicado"` y 2 (chequeo y golpe de calor) con el valor por defecto, que es «Publicado». La que falta es la del propio LA-01. Los pilares `salud-mental-emocional-perros` y `cuidados-paliativos-perros` están en el enum, y la calculadora existe (`src/pages/herramientas/calculadora-calidad-vida-perros.astro`). LA-01 figura como `[~]` en el inventario (l. 284) |
| n-gramas frente al `.mdx` de España | **0** secuencias de 6 y **0** de 5. Revisé 72 piezas: 3 `AlertBox`, las 8 preguntas y respuestas de la FAQ, los títulos de H2 y de H3, todos los alt y pies del §8, `heroImageAlt` y `heroImageCaption` |
| Frontmatter frente al §8 | `heroImage`, `heroImageAlt` y `heroImageCaption` coinciden con el archivo, el alt y el pie de la imagen 1 |
| Requisito senior | Imágenes 1, 3, 4 y 7: bloque íntegro. En la 4, la postura es ahora «sentado, con el cuello relajado» y hay línea de rechazo. Imágenes 2 y 5: la excepción declarada, que coincide con la norma. Imagen 6: foto real |

## Testimonios frente al archivo

| Hecho en el brief | Archivo | Resultado |
|---|---|---|
| Osa: patio, 24 y 31, entrar, cuartos, cama y armario, jalar, regañar y mojar, llanto, cena sin fecha bajo la mesa, pila, «no recuerda con seguridad si se escapaban», nunca se lastimaron, «muy brava… podía morder», hipótesis de los sonidos | l. 57–61 y 70–76 | Coincide |
| Osa adulta madura, no senior; mestiza de pastor alemán | l. 74–75 | Coincide. El «sin edad» del §2 se refiere a la cifra, igual que la l. 73 del archivo |
| Baltor: dentro, no salía de las habitaciones, no huía, «una vez se orinó o se defecó», la chow chow también se escondía, duda del piso de arriba, chow chow café claro, adulto maduro, segundo piso en una casa de cuatro apartamentos con escalera central | l. 91–97 | Coincide |
| Luna: nacida en 2015, Costa Rica; temblores, terremotos y choques; busca a la familia | l. 9 y 18 | Coincide. No se usa alzarla ni que se calme |
| Dakota: solo foto y pie, sin hechos | — | Coincide (P1-1 de la R5 cerrado) |
| Identificación de la foto como deducción, con gate | l. 29 | Coincide |
| Perra del compañero: solo una se pone nerviosa, la dejan dentro, bajo el escritorio; anónima; sin edad ni relación con el H2-4 | l. 105–112 | Coincide |

## Contradicciones internas nuevas buscadas

- **Imagen 4 rehecha:**
  - El prompt, el alt, el pie y la aceptación coinciden: de día, perro sentado, tutora copiando de una hoja.
  - La tutora es la misma que en la imagen 7 (55 años, pelo negro con canas, blusa lila, anillo).
  - La imagen 4 no repite la composición de la 7: cocina frente a patio, libreta frente a candado. Comparten la luz de día, pero están a unos dos H2 de distancia y con las imágenes 5 y 6 en medio.
  - Restos: la l. 490 (P3-1) y la premisa del pie (P3-2).
- **§8, resto:**
  - La tabla, el orden de producción y los encabezados coinciden en la posición de las siete imágenes.
  - La paleta coincide con cada prompt.
  - La cronología sigue siendo coherente: noviembre de día (4), el 24 a las 3:30 (7) y el 24 a las 5:00 (1).
- **Tarjeta:**
  - La posición coincide en el §5.2, el §6 y España.
  - Tensión «`main`» frente a «rama de redacción» (P3-4).
- **Dakota y H2-4:** sin contradicciones.

## Efecto cascada

- **Artículo:** `src/content/blog/miedo-polvora-perros-mayores.mdx` no existe, así que no se ha propagado nada. Si se redacta sin aplicar el P3-2, el pie de la imagen 4 saldrá con la premisa de las notas de enero.
- **`direccion-visual-editorial.md`:** la salvaguarda de la leishmaniosis está restaurada, idéntica a la de antes. Quien revise imágenes de leishmaniosis puede usar la versión actual.
- **Rama `claude/tarjeta-relacionada`:** no necesita cambios. El §5.2 describe lo que hay.
- **Otros briefs:** no hay fuentes nuevas ni corregidas, así que no hay cascada de fuentes.

## Lo que sí funciona (no romper al corregir)

- **Las correcciones de la R5 se hicieron sin tocar nada más.** El diff se limita a lo pedido, más el gate de la tarjeta.
- **La foto real ya no dice nada de Dakota.** El gate de la identificación sigue abierto y bien marcado.
- **La imagen 4 tiene ahora identidad propia** dentro del artículo: es la única escena de cocina, de día, con el perro sentado. La línea de paleta deja claro qué es nocturno y con qué luz.
- **El §5.2 es una especificación fiel del componente**, verificable línea a línea.
- **La norma visual está en orden:** cada excepción en su párrafo, con su alcance.
- **Siguen exactos** los metadatos, el presupuesto, la matriz, los enlaces y los n-gramas.

## Qué corregir, en orden (para otra sesión; no requiere ronda nueva)

1. **P3-2:** en el §8, imagen 4, cambiar el pie (y la Función) por la opción (a) o la (b) del hallazgo, e igualar la lista con la del H2-10 («a qué hora empezó»). Si se elige la (a), añadir al H2-5 (`### La lista para la consulta`) media frase: «si el año pasado tomaste notas, llévalas».
2. **P3-1:** en la l. 490, sustituir «la noche antes de la consulta» por «de día, pasada a limpio en casa».
3. **P3-4:** igualar el §4, el §9.3 y el §11 en «en `main` o en la rama de redacción», o quitar esa alternativa del gate.
4. **P3-3:** poner al día el estado (l. 5), la fecha (l. 31), el §11 (l. 694), el historial (fila R6) y la cabecera de LA-01 en `TODO.md`.
5. **Después:** redactar. El auditor del artículo comprueba estas cuatro P3, la tabla manual de paráfrasis (§9.5) y los gates abiertos del §11: identificación de Luna y Dakota, tarjeta, verificaciones parciales y reapertura de S12–S14.
