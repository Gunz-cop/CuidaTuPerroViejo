# Pilar de movilidad — recursos visuales

Propuesta local del 17 de noviembre de 2026. Rama `contenido/pilar-movilidad-visual`, basada en `main` tras el PR 183. El propietario eligió Brian, escuchó una muestra y autorizó pasar el pilar a `main` el 17 de noviembre de 2026. Auditoría independiente pendiente. Este informe conserva las verificaciones locales; el PR registra la fusión y el flujo automático gestiona el despliegue.

## Elección y propuesta

Se revisó el export de Search Console de los últimos tres meses. Alimentación ofrece más exposición, pero movilidad permite explicar cambios concretos mediante comparación de escenas, con menor riesgo que una receta o una maniobra clínica. Las rutas principal y `.html` del pilar muestran oportunidad de mejorar la experiencia. El export y las cifras absolutas de audiencia se mantienen fuera del repositorio público. El CTR no identifica una carencia de imágenes ni permite prometer cambios de posición.

El objetivo es que el lector descubra una adaptación útil para su casa. No se fuerza un tiempo de permanencia ni se recoge una puntuación del perro. No hay formularios, diagnósticos, cuentas, temporizadores ni datos personales en los recursos añadidos.

## Identidad y generación

Se revisaron el registro visual, los nombres de assets y los briefs: no aparecía un mestizo de border collie como protagonista. La ficha es negro/blanco, lista blanca asimétrica, oreja izquierda erguida y derecha semicaída, punta de cola blanca. Canas de cara, cejas y párpados, ojos ligeramente hundidos, menor tono corporal y postura prudente hacen visible la edad; no se inventa una enfermedad ni un caso real.

Una referencia de casa se inspeccionó antes de generar el resto. Todas las escenas proceden de esa referencia; la corrección de infografía usa la primera infografía. `prompts.json` conserva el encargo completo. La escena de parque sirve de referencia al video. El perro del pilar no reemplaza a los protagonistas de los artículos satélite que aparecen en las tarjetas relacionadas.

Imágenes: modelo etiquetado por ImagineArt como **GPT Image 2.5 Flare**, 16:9, 1K, calidad medium. Cinco generaciones: referencia/casa adaptada, casa anterior, infografía inicial, parque e infografía corregida. Los originales reales son 1280×720. Las variantes WebP de mayor tamaño se redimensionan para servir el diseño; no se afirma detalle nativo de 1600 px.

La primera infografía no respetaba la cama baja y se conserva como descarte. La segunda reduce correctamente la entrada. Revisión propia a tamaño completo y móvil: el perro de las escenas estáticas conserva rostro, marcas y orejas, patas plausibles y edad reconocible. En las viñetas tumbadas, la postura oculta parte de la anatomía; no se afirma haber verificado todos los apoyos en ellas.

Valoración del implementador, no auditoría independiente: imágenes **8/10** por continuidad y claridad del antes/después. La corrección de la cama fue necesaria. Esta prueba y la anterior usan sujetos, tareas y ajustes distintos; no son un benchmark controlado entre modelos.

## Recursos y mecánicas

- `MobilityRoomExplorer.astro`: tres botones sobre objetos reales de la imagen. Cada uno revela una explicación; se cuentan zonas distintas, sin sumar al repetir. Se puede alternar antes/con apoyos desde el principio y reiniciar. La imagen no se modifica parcialmente con código: se muestran dos imágenes completas generadas.
- `MobilitySupportAtlas.astro`: tres paneles de una infografía generada. Los botones encuadran cada tercio y permiten recuperar la vista completa. El encuadre conserva la proporción de la imagen; no dibuja ni deforma al perro.
- `MobilityWalkPause.astro`: clip generado, controles nativos, sin reproducción automática y con explicación plegada y descarga.
- Narraciones: Brian, elegido por el usuario, con ElevenLabs v3 a través de ImagineArt. Guion, parámetros, hashes y duraciones en `narraciones.json`. Son explicaciones del contenido visible, sin añadir recomendaciones clínicas. La integración tiene pausa al cambiar de viñeta, volver a la vista completa, ocultar la pestaña y navegar. Cada pista requiere pulsar reproducir; `preload="none"`. El texto sirve de transcripción y los enlaces MP3 permanecen en Markdown.

Sin JavaScript, las dos habitaciones y las seis explicaciones quedan disponibles; los botones inertes se ocultan. No se simula movimiento corporal con JS, SVG, canvas o CSS. Tampoco hay música o ladridos automáticos.

## Video y limitaciones

Seedance 2.0 devolvió: “The model is inaccessible in your current plan”. No produjo clip. Se informó al usuario y se usó el modelo LTX 2.3 disponible, 6 s a 1080p. Archivo recibido: 1920×1080, 6,12 s; versión ligera 1280×720 con rótulos editoriales añadidos en FFmpeg y audio original retirado.

Se pidieron dos pasos y cámara fija; el resultado hace más pasos y la cámara acompaña al perro. Se revisó la secuencia temporal: la identidad se reconoce, pero las proporciones y el movimiento tienen variaciones. Valoración propia **6/10**: admisible como ilustración de paseo, insuficiente para enseñar o evaluar marcha, técnica o rehabilitación. La nota invita a grabar al perro real para la consulta. El sonido del clip original no se ha evaluado.

Consumo observado antes de narrar: 305 créditos entre imágenes y video; saldo 153. No se dispone de recibos individuales ni se ha confirmado la licencia comercial o el precio del plan. Estos valores son saldo/uso de la prueba, no coste monetario ni una estimación de rentabilidad.

## Verificación y pendientes

Las primeras verificaciones visuales y de interacción pasaron a 390 y 1366 px, en claro y oscuro. Se comprobaron comparación, tres zonas, conteo sin duplicados, reinicio, enfoque de las tres viñetas sin distorsión, teclado, decodificación de imágenes, reproducción del video, ausencia de autoplay y movimiento reducido. La prueba sin JS conservó ambos antes/después y todas las notas. Las capturas y `browser-results.json` se actualizan con los controles de audio. `audio-results.json` registra específicamente reproducción, cambio de panel y pausas.

La guardia semántica detectó una nota perdida por estar dentro de `figure`; se movió fuera y la comprobación de los 41 documentos pasó. Para audio se amplió la omisión de elementos multimedia y se añadió una regresión que exige conservar transcripción y enlace, sin duplicar el fallback. Las pruebas automáticas no constituyen auditoría editorial ni prueba de mejora de permanencia.

Registro de respaldo: `fuentes.md`. No se ha reescrito ni revalidado todo el contenido clínico heredado. La atribución de IA y la ausencia de credenciales veterinarias ficticias siguen la política editorial del sitio.

Vista local: `http://127.0.0.1:4321/movilidad-dolor-perros-mayores.html#casa`. Abrir en el navegador del entorno. Capturas para revisión en esta carpeta; `browser-check.cjs` puede ejecutarse con Playwright instalado externamente usando `NODE_PATH`.

## Narraciones con Brian — actualización

El usuario eligió Brian el 17 de noviembre de 2026. Se generaron las tres pistas a partir de los mismos textos visibles, sin instrucciones médicas nuevas: agarre 8,44 s, acceso 7,97 s y paso libre 7,71 s. MP3 mono a 44,1 kHz; los tres archivos suman aproximadamente 386 kB. Consumo observado: 43 créditos para narraciones, saldo 110; acumulado observado del trabajo del pilar 348 créditos. Sin recibo individual por pista.

Se verificó la decodificación completa de los archivos y sus metadatos. Este entorno no ofrece entrada auditiva: no se ha podido escuchar ni valorar pronunciación, acento, naturalidad o correspondencia palabra por palabra. El guion guardado es el texto enviado al generador, no una transcripción comprobada por reconocimiento de voz. La calidad perceptual queda pendiente de escucha del propietario; no se asigna una puntuación sonora inventada.

La pausa se exige al cambiar de viñeta, volver a la imagen completa y navegar. La evidencia de visibilidad ejercita el manejador con una notificación simulada; no se declara una prueba real de cambio de pestaña. No hay autoplay ni pistas superpuestas. Los enlaces MP3 y las explicaciones permanecen en Markdown y la reproducción nativa funciona sin JavaScript.

El guard temporal de existencia de archivos se retiró al completar las tres pistas: la comprobación con `fs.existsSync` dentro del prerender de Cloudflare ocultaba los reproductores incluso con archivos en `public`. La versión final referencia los tres MP3 reales, probados por HTTP; no modifica configuración ni dependencias.

## Verificación final con audio

Build correcto; Astro check sin errores ni advertencias, con 82 hints. Pasan 24 pruebas de proyección y la guardia semántica de los 41 documentos. La revisión en Chromium pasa a 390 y 1366 px en claro y oscuro, sin errores JS ni desbordamiento. A 390 px, explorador 595.22 px e infografía con reproductor 878.59 px.

`audio-results.json` acredita reproducción de las tres pistas, avance del tiempo y ausencia de error del elemento; pausa y reinicio de la anterior al cambiar panel, ausencia de autoplay de la siguiente, parada al ver la lámina completa y al evento de navegación. La visibilidad se prueba mediante evento simulado. La prueba sin JS pulsa el control nativo y comprueba avance de reproducción. Las tres descargas responden 200 con tipo audio/mpeg. Ninguna pista se solicitó antes de la interacción.

`audio-signal.json` registra señal audible técnicamente (no silencio) y picos inferiores a 0 dBFS. No es una valoración auditiva. La pronunciación, naturalidad y acento siguen pendientes de escucha humana. El propietario ha autorizado el paso a `main`. Las verificaciones de este informe son locales; no acreditan por sí mismas la publicación o el funcionamiento en producción.
