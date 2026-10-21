# Apoyos visuales cómodos en móvil y escritorio

Regla compartida por briefing, redacción, animaciones y auditorías. Todo apoyo visual (tabla, infografía, secuencia animada, formulario o registro imprimible) tiene que **verse y usarse con comodidad** a 390 px y a 1366 px. "No desborda" no basta: un recurso que obliga a hacer scroll de varias pantallas en el móvil no es cómodo.

## Presupuesto en móvil (390 px)

- Un recurso no debería superar **~1,2 alturas de pantalla (≈ 900 px CSS)** en su estado inicial. Si lo supera, se reorganiza; no se acepta "porque cabe".
- En una secuencia, **el dibujo, los controles y el texto del paso activo** caben juntos en una pantalla: los controles van justo debajo del dibujo, nunca después de párrafos largos.
- Lo secundario (límites del esquema, notas metodológicas, ayuda de teclado) va plegado en `<details>` o se oculta en móvil si repite lo que ya dice otro elemento.
- **Todo lo que pueda plegarse empieza plegado** (decisión del dueño, 2026-10-21), en móvil y en escritorio: preguntas frecuentes, notas metodológicas, ayudas y formularios. Es el lector quien lo despliega. Nunca uses `<details open>` ni abras por JavaScript al cargar.
- Formularios de más de 5 campos: plegados tras un `<summary>` que diga cuántos campos hay. La impresión siempre muestra todo.
- Leyendas dentro de un SVG a escala menor de ~12 px reales no se ocultan sin más: el paso activo o un texto HTML debe nombrar lo que se ve.

## Tablas

- Nada de tablas de 3+ columnas con scroll horizontal en móvil. Usa `TablaApilable` (`src/components/article/TablaApilable.astro`) con `data-label` en cada `<td>`: por debajo de 640 px cada fila se vuelve una tarjeta con su encabezado.
- Celdas de una frase. Si una celda necesita un párrafo, el contenido no es una tabla.

## Escritorio (1366 px)

- El recurso no se estira a líneas de más de ~80 caracteres; los controles quedan a la vista junto al dibujo.

## Verificación obligatoria

Capturas con Playwright del recurso aislado (`element.screenshot`) a 390 y 1366 px, claro y oscuro; anota la altura de cada recurso en móvil en el informe de entrega. `document.documentElement.scrollWidth` debe igualar el ancho de la ventana. Objetivos táctiles ≥ 44 px.

Referencia corregida: `AlimentacionSinDientesRecursosV2.astro` (2026-10-20) pasó de 1126/1150/1557 px a 872/897/638 px en móvil al subir los controles, plegar notas y el formulario, y apilar las tablas.
