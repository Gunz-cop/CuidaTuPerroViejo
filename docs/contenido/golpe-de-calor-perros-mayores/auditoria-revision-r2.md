# Auditoría R2 de la revisión del artículo de golpe de calor

| Campo | Valor |
|---|---|
| Alcance | Solo `git diff aa96bbb 5389a41`: componente `src/components/article/GolpeCalorRecursos.astro`, sección «Ajustes tras las imágenes v2 (2026-10-24)» de `revision-fondo-articulo.md` y sus evidencias (`recursos-animados/*.png`, `verificacion-navegador.json`) |
| Commit auditado | `5389a41` en `claude/golpe-calor-revision` (base `aa96bbb`, también en `codex/golpe-calor-imagenes-revision`) |
| Fecha | 2026-10-24 |
| Auditor | Sesión independiente: no hizo el componente ni el informe, y no corrige |
| Criterio del propietario | Solo los bloqueantes impiden el APTO; el resto va como observaciones |
| Referencias | `crear-animaciones-articulo-blog/SKILL.md` §4, §5 y §7, `apoyos-visuales-responsive.md`, `direccion-visual-editorial.md`, auditoría previa `auditoria-revision-r1.md` (APTO) |

## Veredicto

**APTO.** No encontré bloqueantes. El recorte se carga sin deformarse y no se anima. Lo que muestran los pasos 2 y 3 coincide con el artículo y es seguro. La escala ya no calcula diferencias y solo usa cifras con fuente. Los títulos nuevos no repiten los H3. Además, la nota del informe es cierta en todo lo que comprobé.

## Qué comprobé y cómo

Hice `npx astro build` en `5389a41` (correcto, con la proyección Markdown) y `npx astro check` (190 archivos, 0 errores y 0 advertencias). Serví `dist/client` en 127.0.0.1:8787 y lo recorrí con Playwright Chromium: 390 y 1366 px, claro y oscuro (`html.dark`), con y sin movimiento reducido, y sin JavaScript. Miré las capturas de los cuatro pasos (en reposo y reproduciéndose), las tres zonas de la escala y la versión sin JS. Al terminar paré el servidor.

### 1. Recorte del podenco y contenido de la animación

| Comprobación | Medido | Resultado |
|---|---|---|
| Carga dentro del SVG | Hay dos `<image href=".../podenco-senior-perfil-transparente-v1-800.webp">`, en los pasos 2 y 3. Las dos decodifican a 800×500 y el archivo está en `dist/client`. En el servidor no hay ningún 404 de imágenes; el único es `/api/feedback`, propio del servidor estático. | Cumple |
| Transparencia real | El archivo es RGBA 800×500. Tiene alfa 0 en el 73,3 % de los píxeles, incluidas las cuatro esquinas, y un borde suavizado. El cuerpo tiene alfa 250–255. En las capturas, el fondo verde del lienzo se ve alrededor del perro sin halo ni caja. | Cumple (ver O5) |
| Sin deformación | Proporción del archivo 1,600. Caja SVG 330×206 (1,602) con `preserveAspectRatio="xMidYMid meet"`. `getBBox` 330×206. | Cumple |
| Sin movimiento corporal | Durante la reproducción, el `<image>` tiene `animation-name: none` y `transform: none` en los pasos 2 y 3. Solo se animan `.gc-drops`, `.gc-blades`, `.gc-air` y `.gc-vapor`. El `desc` lo llama «podenco senior ilustrativo». | Cumple §4 |
| Agua sobre el lomo | Las gotas salen de una alcachofa (x 492–550) y bajan hasta y≈128–170. Con la geometría del recorte, el lomo está en y≈152–156 en esas columnas. La cabeza empieza en x≈600, fuera del recorrido del agua. | Coherente con «lejos de la cara» |
| Ampliación «hasta la piel» | El círculo muestra pelo y piel, con una flecha que baja hasta la piel y agua en la base del pelo. Una línea discontinua lo une al lomo. | Coherente con «Que no se quede en la superficie del pelo» y con el H3 «2. Mójalo y dale aire» |
| Ventilador y vapor | El ventilador está a la izquierda y lejos del perro. No hay agua, charco ni cable en esa escena. El aire llega a los cuartos traseros y el vapor sube del lomo. | Coherente con «Ventilador o corriente mientras sigue mojado». Sin riesgo eléctrico |
| Hielo | No aparece en ningún paso. El texto del paso 2 conserva «Nada de hielo». | Cumple |

### 2. Escala de umbrales

- El script ya no calcula grados. El texto del lector ahora es `${name}: el aviso amarillo empieza a ${threshold} °C. La guía del Ministerio ya habla de peligro para perros de edad avanzada en torno a 30 °C.` Lo leí en el navegador para las tres zonas: 34 °C Sierra de Madrid, 38 °C Campiña sevillana y 36 °C Metropolitana y Henares.
- Todas las cifras visibles tienen fuente en el artículo (líneas 248–250) y en el brief: 30 °C y 32 °C de la guía del Ministerio, y 34/36/38 °C con las tres zonas del anexo Meteoalerta. El 32 °C no lo cambió este diff y también viene del Ministerio.
- El recuadro discontinuo de 30 °C al umbral se mantiene (`--gc-gap`). Marca la distancia en la barra, pero no da ninguna cifra (ver O3).

### 3. Títulos de la secuencia frente a los H3

Los H3 de «Qué hacer en los primeros minutos» son «1. Sácalo del calor y llama», «2. Mójalo y dale aire» y «3. Trasládalo». Los títulos nuevos son «Sombra y llamada», «Agua hasta la piel», «Aire en movimiento» y «Rumbo a la clínica», y no repiten ninguno. El primer título anterior sí coincidía con el H3. Los `h4` del componente no entran en el índice y el `h3` lleva `data-toc-exclude`.

### 4. Responsive y accesibilidad

| Requisito | Medido | Resultado |
|---|---|---|
| Desbordamiento | `scrollWidth` igual al ancho de la ventana a 390 y a 1366, en cada paso y tras elegir zona. Ningún descendiente se sale de las tarjetas. | Cumple |
| Altura en móvil (tarjeta completa) | Secuencia: 498 px, y 518 px en el paso 2. Escala: 790 px. Sin JS: 741 y 731 px. | Cumple (≤ ~900) |
| Escritorio | Contenido interior: secuencia 590 px y escala 601 px | Correcto |
| Objetivos táctiles | Flechas y repetir 44×44, «Reproducir» 170×44, summaries 296×44 y botones de zona 104×70 (390 px) | Cumple |
| Sin autoplay | El paso sigue en 0 tras 6,5 s sin interacción, en las 8 combinaciones | Cumple |
| Reproducción y pausa | Desde el paso 2 avanza al 3 en unos 5,5 s. Al pausar, `data-playing="false"`, 0 animaciones activas, y el paso no cambia en 6,5 s | Cumple |
| Movimiento reducido | «Reproducir» desactivado, aviso «movimiento reducido: usa las flechas», 0 animaciones y las flechas recorren los 4 pasos | Cumple |
| Sin JavaScript | Controles y zonas ocultos, los 4 pasos visibles como texto, la escena 1 visible y la franja 34–38 °C | Cumple |
| Modo oscuro | Fondo calculado `rgb(255, 253, 246)` y `h4` `rgb(41, 75, 61)`. El círculo de ampliación y el del ventilador tienen relleno propio (`#fffdf6`). En las capturas no se heredan colores del layout | Cumple |
| `<details>` | 0 abiertos al cargar | Cumple |
| Consola | Sin errores JS. Solo el 404 de `/api/feedback` | Cumple |

### 5. Veracidad de la nota «Ajustes tras las imágenes v2»

| Afirmación | Comprobación | Resultado |
|---|---|---|
| Sobre `aa96bbb`, rama `codex/golpe-calor-imagenes-revision` | `git branch -a --contains aa96bbb` incluye `origin/codex/golpe-calor-imagenes-revision` | Cierta |
| Enfriamiento v2: ventilador en el banco seco y cable que sube por la pared | Miré `podenco-senior-enfriamiento-evaporativo-v2-800.webp`: el ventilador está sobre un banco de obra seco, a la derecha, y el cable sube por la pared hasta el enchufe | Cierta |
| Casa v2: persiana bajada, luz tamizada y sin sol directo | Miré `podenco-senior-zona-fresca-casa-v2-800.webp`: la persiana está casi bajada, la parte inferior pasa por un visillo y no hay manchas de sol en el suelo | Cierta (matiz en O4) |
| Recorte con canal alfa real en los pasos 2 y 3. El perro es estático y solo se animan el agua, el aire y el ventilador | Apartado 1 | Cierta |
| Se retira la diferencia calculada. Solo quedan el umbral AEMET y los ~30 °C | Apartado 2 | Cierta |
| Los cuatro títulos nuevos | Apartado 3 | Cierta |
| Alturas en móvil: secuencia 498–518 px y escala 790 px | Medí 498/518 y 790 px | Cierta |
| Sin desbordamiento, objetivos de 44 px, pausa efectiva, `astro build` correcto y `astro check` con 0 errores | Apartados 4 y anteriores | Cierta |
| Observación: la edad del recorte se lee menos | Coincido (O1) | Cierta |

`verificacion-navegador.json` solo cambia el texto `readout38`, y coincide con el que obtuve.

## Bloqueantes

Ninguno.

## Observaciones (no impiden el APTO)

- **O1. Edad poco visible en el recorte.** El propio informe lo dice y coincido. Hay algo de canas en el hocico, pero el lomo, la musculatura y la postura son de un adulto en forma. A 390 px, el perro mide unos 120 px de ancho y no se ve senior sin buscarlo. Si se regenera, aplicar «la edad se ve sin buscarla» de `direccion-visual-editorial.md`.
- **O2. El pelo del recorte se ve seco en los pasos 2 y 3.** Lo «mojado» lo explican la ampliación, las gotas, el vapor y el rótulo «Aire sobre el pelo mojado». Basta para un esquema. Con un recorte mojado, o una capa de brillo sobre el lomo, se entendería sin leer.
- **O3. El recuadro discontinuo de 30 °C al umbral.** Ya no lleva cifra, pero sigue señalando la distancia en la barra. Es coherente con el brief, que pide no convertirla en umbral. Que no vuelva a aparecer como número.
- **O4. Pequeña diferencia de palabras.** El informe dice «la persiana está bajada» y el alt del MDX (fuera de este diff) dice «medio bajada». La imagen muestra una persiana casi bajada con un visillo debajo. Ninguna de las dos descripciones es falsa.
- **O5. Alfa del cuerpo.** Va de 250 a 254 en casi todo el cuerpo, no de 255. Sobre el fondo del lienzo no se nota. Si el recorte se usa algún día sobre fondos oscuros o con contraste fuerte, conviene forzar alfa 255 en el interior.
- **O6. Rótulos del SVG en móvil.** A 390 px, el texto de 26 unidades se ve a unos 11,6 px reales: «Hasta la piel», «Aire sobre el pelo mojado». Está justo por debajo de ~12 px. No incumple, porque el paso activo en HTML nombra lo que se ve, pero se lee con esfuerzo.
- **O7. El botón flotante del sitio (feedback) tapa la esquina inferior derecha de las tarjetas a 390 px.** Pasa en todo el sitio y queda fuera de este diff.
