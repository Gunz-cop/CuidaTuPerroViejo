# Verificación de implementación del PR 2a

25/11/2026. Registro actualizado tras la auditoría del PR #187. Base del cambio `docs/brief-cushing-fase-2` en `e4f4882ee38368de7dd7510668d53a1dea5059aa`. Verificaciones realizadas por la sesión implementadora sobre `astro preview` local de la compilación Cloudflare. La auditoría independiente está pendiente.

## Contenido y paridad

- [Pasajes, fecha y trazabilidad clínica](fuentes-pr-2a.md). MSD enumera «Excessive water consumption» en la columna de 24 horas. Se mantuvo el plazo con la condición de que no haya señales de mayor urgencia.
- Una sola tabla con las tres ilustraciones 2D generadas por ChatGPT ImageGen sirve de infografía. Las acciones son texto HTML. Los tres recortes WebP con alfa son ornamentales y el texto representa la misma información en Markdown. La instrucción de trilostano coincide literalmente con el PDF.
- HTML, Markdown negociado con `Accept: text/markdown` y `/agent-content/v1/documents/article--sindrome-cushing-perros-mayores.md` devolvieron HTTP 200. Las dos respuestas Markdown coincidieron byte por byte con el archivo en `dist/client`. Se cotejaron orden, encabezados nuevos, tres filas, siete preguntas, enlaces y alts significativos. Los iconos ornamentales y la reserva para fase 3 quedan fuera de la proyección.
- En la vista previa, todas las anclas nuevas resuelven con la grafía real de los encabezados. Paliativos, calculadora HHHHHMM, chequeo geriátrico, incontinencia, alimentación y pilar de salud devolvieron 200. La URL directa de PubMed mostró un desafío de cookies y Wiley devolvió 403 a la prueba HTTP automatizada. El resumen de F8 se cotejó en el registro de MEDLINE de Europe PMC y la sección «Clinical Presentation» de Wiley en su versión indexada.
- `npx astro build` completado con 42 documentos proyectados. `npx astro check` en 273 archivos dio 0 errores, 0 avisos y 82 sugerencias. `projection.mjs check --build-dir dist` reprodujo el índice y Markdown byte por byte. La suite de proyección pasó 24 de 24 pruebas. `tono.py` registró 1888 palabras y 0 muletillas.

## Vista y accesibilidad

| Ventana | Ancho de documento, claro y oscuro | Ancho × alto del triaje, claro y oscuro | Capturas |
| --- | ---: | ---: | --- |
| 320 px | 320 px | 288 × 659 px | [Claro](capturas-pr-2a/triaje-320-light.png) · [Oscuro](capturas-pr-2a/triaje-320-dark.png) |
| 390 px | 390 px | 358 × 545 px | [Claro](capturas-pr-2a/triaje-390-light.png) · [Oscuro](capturas-pr-2a/triaje-390-dark.png) |
| 1366 px | 1366 px | 686 × 351 px | [Claro](capturas-pr-2a/triaje-1366-light.png) · [Oscuro](capturas-pr-2a/triaje-1366-dark.png) |

- FAQ cerrada al cargar y operable con Enter, Tab, Shift+Tab y Espacio en los seis escenarios. Mínimo del control nativo de 52 px. Contraste calculado a 390 px entre texto de triaje y fondo de al menos 6,32:1 en claro y 10,91:1 en oscuro. El contorno de foco de la pregunta probada midió 6,05:1 en claro y 9,92:1 en oscuro.
- Axe-core, reglas WCAG 2.0 y 2.1 A/AA, dio 0 infracciones en el cuerpo del artículo en las seis combinaciones. Se comprobó la lectura de columnas y filas en el árbol accesible de Chromium en [claro](capturas-pr-2a/arbol-accesible-light.yml) y [oscuro](capturas-pr-2a/arbol-accesible-dark.yml). El árbol accesible complementa la prueba con Orca descrita más abajo.
- Se amplió el texto del cuerpo al 200 % por CSS sin ensanchar la ventana ni producir desplazamiento horizontal interno en el triaje. En vista de impresión a 390 px y con JavaScript desactivado permanecen visibles sus tres acciones. Las pruebas de movimiento reducido se hicieron desde el arranque, con el apoyo estático.
- FAQ abierta de ejemplo a 390 px en [claro](capturas-pr-2a/faq-390-light.png) y [oscuro](capturas-pr-2a/faq-390-dark.png). H3 de final de vida a 390 px en [claro](capturas-pr-2a/final-de-vida-390-light.png) y [oscuro](capturas-pr-2a/final-de-vida-390-dark.png).
- Los tres WebP de 120 × 120 px pesan 7.924 bytes en disco. En Chromium con caché desactivada sumaron 11.317 bytes transferidos incluyendo cabeceras, tanto a 390 como a 1366 px. Los tres decodificaron al acercarse a la tabla. La espera de `img.decode()`, con carga incluida, fue de 24–36 ms a 390 px y 27–112 ms en escritorio. El bloque CSS local emitido ocupa 316 bytes con gzip y se añadió cero JavaScript.

## Prueba con lector de pantalla tras la auditoría

- Orca 48.1 con AT-SPI2 2.56.2, Chromium 156 y Speech Dispatcher con eSpeak NG. Se usó el registro de mensajes emitidos por Orca, con salida de voz comprobada en un monitor de audio virtual.
- A 390 y 1366 px, se usó `T` para entrar en la tabla y flecha abajo para leer por orden. Orca anunció cuatro filas, contando la cabecera, dos columnas con sus nombres y las tres acciones completas. El rótulo visual móvil y los iconos ornamentales quedaron fuera de la lectura.
- Desde el encabezado de la FAQ, Tab enfocó la primera pregunta. Enter abrió la respuesta, Tab enfocó su enlace y Shift+Tab devolvió el foco a la pregunta. Espacio cerró la respuesta. Al abrirla de nuevo, Enter sobre el enlace llevó al encabezado de origen. Orca anunció la pregunta, los estados abierto y cerrado y el enlace. [Registro a 390 px](capturas-pr-2a/orca-390.txt) · [Registro a 1366 px](capturas-pr-2a/orca-1366.txt).

## Descarga e impresión

- `/descargas/hoja-registro-cushing-perros.pdf` devolvió 200 y `application/pdf`. `public/_headers` admite los valores actuales del servidor para la descarga. El enlace guardó el PDF con su nombre y bytes originales. La carga inicial del artículo nunca solicitó el PDF.
- Archivo de 35.979 bytes. A4 de una página, texto seleccionable, idioma `es`, tabla etiquetada con ámbitos de fila y columna y casillas para escritura en papel. Poppler abrió el archivo descargado, extrajo el texto completo y renderizó la página. El aviso y los siete días quedan en una página.
- Se inspeccionaron las pruebas monocromas [A4](capturas-pr-2a/impresion-A4.png) y [Carta](capturas-pr-2a/impresion-Carta.png) generadas desde el PDF entregado. La salida Carta se centró al 100 % y conservó el texto y los márgenes. Las pruebas fueron digitales, sin impresión física.

Actualiza `dateModified` en el commit final con la fecha real de publicación. La publicación requiere cerrar las cuatro semanas del PR #186 con Search Console filtrada por la URL canónica, respetar el 23/12/2026 como fecha mínima y recibir la autorización explícita del propietario.
