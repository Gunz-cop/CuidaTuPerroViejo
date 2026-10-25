# Auditoría visual del artículo — Leishmaniosis en perros mayores (R3 de 3, recursos visuales e integración)

- **Fecha:** 2026-10-25 · **Ronda:** R3 de máximo 3 (la última) · **Rol:** auditor externo; no se corrigió ni regeneró nada. Único archivo escrito en el repositorio: este informe. Mis capturas y mediciones están en el scratchpad (`.../scratchpad/aud/caps/`).
- **Material:** rama `codex/leishmaniosis-articulo-revision`, commit `8806f61`, worktree de solo lectura `.../scratchpad/wt-r3`. Contrato: `briefings/briefing-leishmaniosis-perros-mayores.md` (§8, §9.7, §11). Guías aplicadas: dirección visual editorial (requisito senior verificable y regla de raza), apoyos visuales responsive, skill de animaciones (§7).
- **Validación:** local. Copia del worktree en el scratchpad, `npx astro build` con código 0 (36 documentos de proyección), servidor estático sobre `dist/client` y Playwright propio (Chromium) a 390, 375 y 1366 px, claro y oscuro. No hay publicación ni despliegue real que comprobar.

## Veredicto

**NO APTO para publicar.** El recorte transparente, base de la animación, no cumple el requisito senior a 390 px (lomo y musculatura de adulto en forma, cabeza alerta; solo se sostiene por el hocico canoso), y el §9.7 del brief lo declara bloqueante. Además la escena de consulta tiene una aguja físicamente incoherente y el collar de la portada no enseña la comprobación de holgura que su alt afirma. El texto, la animación, el calendario y la integración técnica están bien.

Como esta es la tercera ronda, la skill obliga a detenerse y revisarlo con el usuario antes de abrir una R4. Las correcciones son acotadas y solo tocan imágenes (ver "Qué corregir").

## Identidad de lo auditado (SHA-256 recalculados)

| Archivo | SHA-256 |
|---|---|
| `src/content/blog/leishmaniosis-perros-mayores.mdx` (integrado) | `36cfbcc0739e1f0e0a3ac77741cd89a83146eee3268354f92faef3662a221439` (igual que `articulo-borrador.mdx`) |
| `visuales/texto-aprobado-r2.mdx` | `fb0c77099efe30c3d6b3b677807dcca0e982427b61098bfbad7adfd3f2e63a2b` (coincide con R2) |
| `mestizo-senior-colocacion-collar-v1.webp` | `95bc1f6c9b747c770a1ea09419880fd3ed73a669fd362213a8d6b35ad2e24f6b` |
| `...-colocacion-collar-v1-800.webp` | `be17d5bdcb149907b050001e9b6bfdcc95990fade775ce7c465e900c42f7b500` |
| `...-colocacion-collar-v1-400.webp` | `239ae8ad42ccb91db6c241a8c46581d18ef1d43599e221580930f66527907387` |
| `mestizo-senior-anochecer-mosquitera-v1.webp` | `eae9dbc55d94acb08d28171db61eadb8b9003fc7d452f8acebffcf3087b95900` |
| `...-anochecer-mosquitera-v1-800.webp` | `c5e38732c9a4722c6c3a4de910d419070ac4cebcd092950222e04b2ae2387e1c` |
| `...-anochecer-mosquitera-v1-400.webp` | `608516140fe58da07b439ced3ee83650ff31613cdc19522a45fd91e099630362` |
| `mestizo-senior-analisis-sangre-consulta-v2.webp` | `5178c9ec2659da8b393abe1e17584f202bbf40227ab009efbcb894e4c55ef22e` |
| `...-consulta-v2-800.webp` | `fd810be74b0dfc0a91b32d7fd9030aff1a4037b4c76ea7cf778b7b4ae92e7ead` |
| `...-consulta-v2-400.webp` | `3e88526948787b2c28f9d183f96cc66d32d4211fa5c3e512f1f967cd05ebc8cd` |
| `mestizo-senior-recorte-perfil-v2.webp` | `50508843293d9bb2c073136c816bec7496cc60bac6cad434052912c83effe61d` |
| `...-recorte-perfil-v2-800.webp` | `52447eff7328aed934ff2c33043b527d3cbe59d33ae4d75b4b2e7bce0ec7fb21` |
| `...-recorte-perfil-v2-400.webp` | `02dae71c94aa3eb3c6dfb5bce6864efb156213fd9bebbe277f5ac84edfec4a09` |

Comprobé además de forma programática que los 12 SHA-256 de `visuales/archivos.json` coinciden con los archivos del commit (12/12 OK).

## Hallazgos

### P0-1 — El recorte transparente no se ve senior a 390 px; bloquea §9.7 y arrastra a la animación

- **Ubicación:** `public/images/blog/leishmaniosis-perros-mayores/mestizo-senior-recorte-perfil-v2{,-800,-400}.webp`; usado en `src/components/article/LeishmaniosisRevision.astro:3` y `:21` (alt); declarado en `visuales/entrega-visuales.md:39` (fila «Recorte v2»).
- **Evidencia (abrí los tres tamaños con Read y lo reduje a 390 px sobre `#ffffff` y `#1a1a1a`):** a 390 px se lee un perro adulto en buena forma con la cara canosa. Línea dorsal recta y horizontal, sin hundimiento tras la cruz; cuartos traseros con muslos llenos y definidos; hombros y pecho robustos; cabeza erguida y alerta sobre el cuello (la nariz queda a la altura del lomo, pero la cabeza y el cuello suben por encima de él). El prompt v2 pedía «lomo ligeramente hundido tras la cruz», «menor masa muscular de hombros y cuartos traseros» y «cabeza al nivel del lomo». Eso no está en la imagen.
- **Los cinco rasgos en el recorte (390 px):** canas en hocico/cejas/párpados **sí** (hocico claro, ceja y borde ocular con canas; contorno del párpado discreto); ojos algo hundidos **sí, leve**; lomo y musculatura **no**; postura natural de perro mayor **parcial** (apoyos firmes y erguidos; cabeza alta, no baja); sin enfermedad **sí**. La edad se sostiene solo por el hocico: es el caso que la guía de dirección visual obliga a regenerar.
- **El texto que lo acompaña afirma lo que no se ve:** el alt del recorte dice «menor volumen muscular y postura relajada» (`LeishmaniosisRevision.astro:21`) y la entrega dice «ligera depresión tras la cruz y menor masa muscular» (`entrega-visuales.md:39`). Ninguna de las dos cosas es observable.
- **Por qué es un problema real:** §9.7 del brief («en cada imagen, recorte y fotograma, el perro se ve senior a 390 px rasgo por rasgo») es bloqueante, y la animación se titula «Perra senior ilustrativa».
- **Lo que sí está bien en el recorte:** alfa real (valores 0–255, 263.420 píxeles semitransparentes en el 1200; el cuerpo queda en 250–254 por la cuantización de WebP, visualmente opaco), bordes limpios sin halo sobre blanco ni sobre `#1a1a1a` (revisé orejas, pecho, patas y la punta blanca de la cola a 3×), cuatro patas distinguibles, cola entera, cinco dedos legibles en la pata delantera.

### P1-1 — Consulta: la extracción no es físicamente coherente

- **Ubicación:** `mestizo-senior-analisis-sangre-consulta-v2.webp` (inserción en `src/content/blog/leishmaniosis-perros-mayores.mdx:178-181`; alt en :179).
- **Evidencia (recorte ampliado 5× de la zona de manos):** la veterinaria sostiene un tubo morado ya lleno de sangre, con una aguja que sale por el otro extremo en diagonal hacia arriba y termina en el aire sobre el borde de la pata, sin entrar en la piel; no hay jeringa ni portatubos conectados a la aguja. Un tubo lleno con la aguja fuera del vaso es incoherente. El brief (§8, «Escena segura» y «Aceptación visual») pide «aguja en ángulo correcto sobre la vena». A 390 px un lector no clínico entiende «sacan sangre»; el que mire la pata no ve punción.
- **Otros puntos de la escena:** veterinaria a la izquierda, tutora a la derecha, ambas miran a la pata o a la perra, perra mirando a la tutora, collar gris visible, tres apoyos más una pata levantada, sin sangre fuera del tubo, sin carteles con texto, báscula, lavabo y alfombrilla azul correctos. **Uñas:** en la ampliación, las uñas de las patas delanteras se ven largas y curvadas, y el brief excluye expresamente «uñas largas» del bloque de edad. En lomo y musculatura la perra es la más robusta de las tres escenas (rasgo 3: **parcial**).
- **Por qué importa:** es la imagen del H2 de pruebas, y el alt y el pie afirman una extracción que la geometría no sostiene.

### P1-2 — Portada: el gesto de comprobar la holgura no se ve, y el alt/pie lo afirman

- **Ubicación:** `src/content/blog/leishmaniosis-perros-mayores.mdx:8` (`heroImageAlt`), que la plantilla muestra también como pie visible bajo la portada (comprobado en la página real a 390 px).
- **Evidencia:** el collar gris ya está cerrado y de buen tamaño. La mano derecha de la cuidadora toca la garganta por debajo de la barbilla, por debajo de la banda; no hay dos dedos entre banda y cuello. La mano izquierda toca el pecho. El prompt pedía «dos dedos planos bajo la banda»; la imagen no los muestra. El alt aprobado en el brief era «ajustando un collar al cuello»; el integrado dice «comprobando la holgura del collar», y eso no se lee en la imagen.
- **Lo que sí funciona en la portada:** manos con cinco dedos y anatomía plausible, collar liso sin marca ni texto, dirección de miradas coherente (la perra mira hacia la cuidadora), sin gato, frascos ni texto, baldosa hidráulica, puerta balconera con persiana de lamas, percha de hierro con correa, maceta de geranios y estera de esparto: ambientación española concreta.
- **Resolución mínima:** no obliga a regenerar. Basta devolver el alt (y por tanto el pie) a la fórmula del brief, que sí describe lo que se ve. Si se quiere el gesto de holgura, hay que regenerar.

### P2 (se corrigen al tocar los archivos)

- **P2-1 — Tono de pelaje del recorte.** Luminancia media del costado: recorte 82, consulta 68, portada 71, casa 56. El recorte es más claro y cobrizo que las escenas (el brief pide «marrón casi negro con rayas»). La identidad se reconoce por la cara, las marcas blancas y la cola, pero conviene igualarlo al regenerar.
- **P2-2 — Calendario: leyenda de celdas rayadas incompleta en la primera tarjeta.** En la fila de Alten, abril y noviembre aparecen rayadas («actividad variable entre lugares»), pero la leyenda visible solo nombra mayo y junio–octubre; la explicación está en el `<details>` cerrado y en el texto para lectores de pantalla (`LeishmaniosisCalendario.astro`, `lc-key` de `index === 0`). Las abreviaturas «Mr, My, Jn, Jl, Ag, Oc, No, Di» no son convencionales (cada celda lleva `title` y nombre completo oculto). La diferencia no depende solo del color (hay texto, patrón y leyenda), por lo que no es P1.
- **P2-3 — Cifra de contraste de la entrega.** La entrega declara «mínimo 5,87:1». Mi barrido de todo texto en los recursos y las dos tablas da un mínimo de **4,50:1** en claro (cabecera «Qué ves» de `TablaApilable`, componente previo) y 5,52:1 en oscuro, sin ningún elemento por debajo de 4,5 con mi redondeo. Cumple, pero la cifra declarada no abarca las cabeceras.

## Tabla imagen por imagen y recorte (a 390 px; abrí cada archivo y cada variante -400)

Reducciones de referencia: `.../scratchpad/aud/todas-390.png` y ampliaciones `c-*.png`.

| Imagen | Mismo perro (mestizo pastor-mastín atigrado oscuro, pecho y calcetines blancos) | Canas: hocico / cejas / párpados | Ojos algo hundidos | Lomo y musculatura de mayor | Postura natural | Sin enfermedad inventada | Anatomía y escena |
|---|---|---|---|---|---|---|---|
| Portada (collar) | Sí; pecho y calcetines blancos, orejas semicaídas, punta de cola blanca | Sí / sí / sí (flecos blancos en el borde ocular) | Sí, leve | Parcial: sentada, no se ve la línea dorsal; hombros fuertes | Sí (sentada, apoyos estables) | Sí | Cinco dedos por mano, 3 patas visibles y apoyos correctos; falta el gesto de holgura (P1-2) |
| Casa al anochecer | Sí | Sí / sí / sí | Sí | Parcial: echada, dorso suavizado y cadera visible, sin pérdida muscular marcada | Sí (echada, cuello relajado, mira a la ventana) | Sí | Mosquitera legible como malla fina con marco enrasado; persiana de lamas arriba (no «medio bajada», sin consecuencia); lámpara, terrazo, sofá, cama gris y manta; sin enchufes ni insectos; luz cálida a la izquierda y azul en el cristal, coherente |
| Consulta | Sí | Sí / sí / sí | Sí | Parcial: robusta, dorso casi recto | Sí (tres apoyos, pata levantada, mira a la tutora) | Sí en lo corporal; uñas largas y curvadas visibles | Veterinaria a la izquierda, tutora a la derecha; aguja incoherente (P1-1); sin sangre abundante ni carteles |
| Recorte v2 | Sí, aunque más claro y cobrizo (P2-1) | Sí / sí / leve | Sí, leve | **No** | **Parcial** (cabeza alta) | Sí | Cuatro patas, orejas y cola completas; alfa real; sin halo |
| Recorte v2-400 | Igual que el anterior; a 400 px se lee aún más como adulto | Hocico sí, cejas apenas | Apenas | **No** | **Parcial** | Sí | Sin halo visible |

**Raza:** no repite podenco, galgo ni bóxer. Comprobé el aspecto además del nombre: hocico alargado medio, orejas semicaídas oscuras, cola larga con punta blanca, atigrado con pecho y calcetines blancos. Es un mestizo de tipo pastor-mastín distinto de los once sujetos del registro de la dirección visual.

**Coherencia imagen–pie–alt:** casa y consulta, correctos en sustancia (los pies del MDX son más sobrios que los del brief); portada, ver P1-2; recorte, ver P0-1.

## Animación y calendario

| Comprobación (mi Playwright) | Resultado |
|---|---|
| Sin autoplay | Paso 0 tras 6,5 s sin tocar nada; `playing=false` |
| Controles | Anterior, reproducir/pausar, siguiente y repetir; `prev`, `next` y `restart` de 44×44 px, reproducir de 182×44; los dos `summary` de 44 px |
| Teclado | Con foco en los controles, → pasa de 0 a 1 y ← vuelve a 0 |
| Foco visible | 3 px sólido (`rgb(181,99,37)`) en botón y en `summary` |
| Reproducción finita | Avanza un paso cada 5 s; al llegar al último se detiene y el botón pasa a «Repetir» (comprobado hasta `5/false/Repetir`) |
| Pausa | Pausar en el paso 2 y esperar 5,5 s: sigue en el paso 2 |
| `prefers-reduced-motion` | Reproducir deshabilitado, texto «movimiento reducido: usa las flechas»; el avance manual funciona y no avanza solo en 6 s; transición 0,00001 s |
| Sin JavaScript | A 390 px: 6 pasos visibles, sin controles ni dibujo, 819,4 px. A 1366 px: 6 pasos y dibujo, 1.222,9 px (es el respaldo sin JS) |
| Impresión (claro y oscuro) | 6 pasos visibles, controles ocultos, tinta `rgb(32,62,50)` sobre blanco en ambos temas, nota metodológica oculta |
| Errores JavaScript | Ninguno |
| Texto de cada paso y movimiento | Seis pasos con texto propio, sin diagnóstico por aspecto («el diagnóstico se hace en la clínica»); marcadores sobre orejas, ojos y hocico, uñas y cuerpo; la animación no simula movimiento del perro. Cumple §9.6 |
| Calendario | Tres tarjetas (Alten 2016 con datos de 2011–2013, ESCCAP 2012, OCV 2024 vía Europa Press), apiladas en móvil, cada celda con nombre completo de mes y estado, patrón además de color, no afirma «todo el año» como regla (la atribuye a la OCV) y cuenta el desacuerdo y el límite de Fuenlabrada |

**Marcadores de la animación:** con el recorte actual las elipses caen sobre oreja, hocico, cuatro patas y cuerpo (revisé los pasos 1–4). Si se regenera el recorte, las coordenadas de `LeishmaniosisRevision.astro:25-28` no valdrán.

## Mediciones de altura y desbordamiento

| Recurso | 390 px | 1366 px |
|---|---:|---:|
| Revisión de cinco puntos, estado inicial | 689,8 px (máximo entre los pasos 2, 3, 4 y 6: ≈715 px) | 822,2 px |
| Calendario, notas cerradas | 865,8 px | 782,7 px |
| Tabla de señales | 876,3 px | 695,9 px |
| Tabla de pruebas | 754,3 px | 625,3 px |
| Figuras de cuerpo (casa, consulta) | 302,2 px cada una | 454,3 px |
| Revisión sin JavaScript | 819,4 px | 1.222,9 px |

Todos quedan por debajo de ~900 px a 390 px. `scrollWidth` = ancho de ventana a 375, 390 y 1366 px, en claro y en oscuro. Contraste mínimo medido: 4,50:1 claro y 5,52:1 oscuro, sobre 112 elementos de texto en cada tema; los estilos globales de `.content-body` no rompen los colores locales (títulos y `strong` heredan el color local en el tema oscuro). Detalles abiertos al cargar: 0. Mis alturas coinciden con las de la entrega, por lo que no hay sospecha de medida inflada o desalineada.

## Texto, frontmatter e integración

- **Texto conservado:** `diff texto-aprobado-r2.mdx` frente al MDX integrado devuelve solo líneas añadidas: frontmatter de portada (2), imports (3), envoltorios `LeishmaniosisTabla` (4), una frase de enlace a la animación («Recorre los cinco puntos en esta animación.»), las dos figuras y los dos componentes. Cero líneas eliminadas o reescritas. El SHA del integrado coincide con el declarado.
- **Frontmatter:** `heroImage` y `heroImageAlt` presentes, ruta existente, portada no duplicada en el cuerpo (el `og:image` apunta a ella y la página la pinta una sola vez).
- **Imágenes de cuerpo:** `width`/`height`/`loading="lazy"`/`decoding="async"` y `srcset` 400/800/1200 con archivos existentes, todos WebP del tamaño declarado (400×225, 800×450, 1200×675). En el navegador se eligieron las variantes de 400 px a 390 px y de 800 px a 1366 px.
- **Portada:** su `srcset` contiene solo el WebP de 1200 px en mi build; es el comportamiento del helper `buildSrcset` del sitio y ocurre igual con la portada de golpe de calor, no es un fallo de este artículo. Las variantes -400/-800 de la portada existen pero no se sirven.
- **Nombres versionados y caché:** `-v1`/`-v2` y `/images/*` con caché de 30 días: ningún nombre publicado se sobrescribe.
- **Proyección Markdown:** se genera sin errores, las imágenes salen con su alt y los textos de los componentes (pasos, calendario) se proyectan.
- **Voz:** `tono.py` da 0 muletillas; la página declara «Ilustraciones generadas con IA» en la firma.

## Contrato §9.7 y §11

| Recurso prometido | Ruta | Prueba | Resultado |
|---|---|---|---|
| Imagen 1, portada | `mestizo-senior-colocacion-collar-v1.webp` | Abierta, 390 px, ampliada | Existe; gesto de holgura no legible (P1-2) |
| Imagen 2, casa al anochecer | `mestizo-senior-anochecer-mosquitera-v1.webp` | Ídem | Cumple |
| Imagen 3, análisis de sangre | `mestizo-senior-analisis-sangre-consulta-v2.webp` | Ídem | Existe; aguja incoherente (P1-1) |
| Recorte transparente senior | `mestizo-senior-recorte-perfil-v2.webp` | Alfa, blanco y gris oscuro, 390 px | Alfa y bordes bien; **edad no cumple (P0-1)** |
| Animación «Revisión de cinco puntos» | `LeishmaniosisRevision.astro` | Navegador completo | Funciona; hereda la edad del recorte, que es lo que falla |
| Calendario de riesgo | `LeishmaniosisCalendario.astro` | Navegador completo | Cumple (P2-2) |

**Entrega honesta:** `entrega-visuales.md` declara que la inspección senior es propia, «no aprobación del usuario ni auditoría independiente», no usa «aprobado visualmente» en ninguna parte, y llama ilustraciones generadas a los seis recursos. Lo único no honesto, sin mala fe, son las dos descripciones del recorte que la imagen no confirma (P0-1) y el mínimo de contraste de 5,87 (P2-3).

## Lo que sí funciona (no tocar al corregir)

- Todo el texto del artículo: sin una línea reescrita respecto del R2 APTO. No hay que abrirlo.
- Las dos tablas apiladas (`LeishmaniosisTabla`), las alturas y el cero desbordamiento.
- La mecánica de la animación (controles, teclado, pausa, finitud, movimiento reducido, sin JS, impresión) y el contenido de sus seis pasos.
- El calendario: honestidad de las tres posturas y su atribución. Es la parte editorialmente más delicada y está bien.
- La escena de casa al anochecer, entera.
- La portada como escena (salvo el alt) y el ambiente español de las tres imágenes.
- Los nombres versionados, las variantes y los SHA de `archivos.json`.
- La edad del rostro en las tres escenas: las canas en hocico, cejas y párpados se leen a 390 px.

## Qué corregir, en orden

Las tres correcciones van en una sesión aparte de quien audita. Orden obligatorio: primero el recorte (hay que recalcular marcadores), luego la consulta, luego el alt de portada.

1. **Regenerar el recorte (P0-1).** Prompt cerrado para otra sesión:

   > Regenera `mestizo-senior-recorte-perfil` como `mestizo-senior-recorte-perfil-v3` (nombre nuevo, por la caché de 30 días), usando como referencia la portada `mestizo-senior-colocacion-collar-v1.webp` y el recorte v2 solo para la pose de perfil. Mismo mestizo de tipo pastor-mastín hembra de 12–13 años, pelo corto atigrado **marrón casi negro** (más oscuro que el v2: luminancia media del costado ≈ 55–70 en vez de 82), pecho y calcetines blancos, orejas semicaídas oscuras, cola larga con punta blanca. Copia íntegro el bloque de edad visible del brief (§8) y añade estas exigencias medibles: **línea dorsal visiblemente hundida tras la cruz**; **muslos y cuartos traseros delgados**, con la cadera y la pelvis marcadas; hombros con menos masa; costillas discretamente visibles; **cabeza y cuello bajos, con la nariz por debajo de la línea de la cruz y el cuello sin arco alerta**; apoyos algo cerrados y prudentes. Canas abundantes en cejas y bordes de los párpados, además del hocico. Perfil lateral estricto a la derecha, cuatro patas separadas y distinguibles, sin collar, fondo transparente real, sin sombra, bordes sin halo. Rechazar si a 390 px parece un adulto en forma. Después: compón sobre `#ffffff` y `#1a1a1a`, reduce a 390 px y anota los cinco rasgos uno a uno; si el lomo o la musculatura siguen en «no», regenera de nuevo. Genera 800 y 400 px, comprueba alfa y halo, y actualiza: constante `image` en `LeishmaniosisRevision.astro:3`, el alt de `:21` (describir solo lo que se ve), las elipses de `data-zone` en `:25-28` según la nueva pose, `visuales/archivos.json`, `prompts.md`, la fila del recorte en `entrega-visuales.md` y los SHA.

2. **Regenerar la consulta (P1-1)** como `mestizo-senior-analisis-sangre-consulta-v3`:

   > Mantén escena, veterinaria a la izquierda, tutora a la derecha, collar gris visible, perra mirando a la tutora, alfombrilla azul y tres apoyos con una pata delantera levemente levantada. Corrige la punción: la veterinaria sostiene con la mano izquierda la pata delantera extendida y ocluye la vena con el pulgar; con la derecha sujeta una **jeringa pequeña con la aguja ya introducida bajo la piel del antebrazo** en un ángulo bajo (unos 15–30°), con un poco de sangre solo dentro del cuerpo de la jeringa, **sin tubo de extracción lleno ni aguja al aire**; sin sangre fuera de la jeringa. Uñas cortas y romas, sin curvatura larga. Lomo ligeramente hundido tras la cruz y cuartos traseros con menos masa. Mismo bloque de edad visible íntegro. Rechazar si a 390 px no se entiende que la aguja entra en la vena o si la perra parece un adulto en forma.

   Actualiza el nombre en `leishmaniosis-perros-mayores.mdx:179` (src y srcset), variantes, alt y entrega.

3. **Portada (P1-2).** Opción mínima, sin regenerar: poner en `leishmaniosis-perros-mayores.mdx:8` el alt del brief («Ilustración de una cuidadora ajustando un collar al cuello de una perra mestiza senior de hocico oscuro canoso, sentada en el recibidor de un piso»). Opción completa: regenerar con dos dedos planos metidos entre la banda y el cuello (por debajo de la banda, no en la garganta) y la hebilla visible.

4. **P2 al pasar por los archivos:** añadir a la leyenda de la primera tarjeta del calendario «Abril y noviembre: actividad variable» (`LeishmaniosisCalendario.astro`, `lc-key` de `index === 0`); sustituir las abreviaturas de mes por «ene, feb, mar, abr, may, jun, jul, ago, sep, oct, nov, dic»; corregir en la entrega la cifra de contraste (mínimo 4,50:1 incluyendo cabeceras de tabla).

5. **R4 no es una ronda de la skill.** Con tres rondas gastadas, presentar al usuario el resultado de estas correcciones para su decisión visual propia, en lugar de abrir otra auditoría completa. La skill pide detenerse y revisarlo con el usuario si la tercera falla.

## Limitaciones de mi comprobación (qué quedó sin abrir)

- **No abrí** los PNG originales de `visuales/originales/` (ni las versiones descartadas `consulta-v1` y `recorte-v1`), ni las 69 capturas del productor, ni `verificacion-navegador.json`, `estrecho-375.json` y los logs más allá de lo necesario; la comprobación de arranque es mía. Contrasté de manera independiente los 12 SHA-256 con `archivos.json`.
- **Fuentes web:** bloqueé las peticiones externas, así que Chromium usó tipografías de respaldo y no las Lora, Outfit y Plus Jakarta del sitio. Mis alturas coinciden con las del productor, que sí las cargó, por lo que no creo que cambie el veredicto, pero es una limitación.
- **No comprobé:** Safari, Firefox ni móvil real con pantalla táctil (los 44 px los medí por geometría); lectores de pantalla; impresión a PDF (solo emulación `print`); ni `npx astro check`.
- **Las fuentes científicas** no entran en esta ronda: el texto es el de R2, APTO, intacto.
- **Juicio visual:** la clasificación P0-1 es mi lectura a 390 px y a tamaño completo. Es una lectura firme (línea dorsal recta, muslos llenos, cabeza erguida, comparadas con el bloque de edad del propio prompt), no una medición; quien corrija debe hacer su propia comprobación rasgo a rasgo y el usuario tiene la última palabra sobre el criterio estético.
