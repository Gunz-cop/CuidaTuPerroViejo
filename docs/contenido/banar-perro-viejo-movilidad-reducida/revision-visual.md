# Revisión visual solicitada — 15 de octubre de 2026

El usuario señaló dos fallos de la entrega: el perro dibujado en las animaciones no tenía una anatomía convincente y el dogo de las tres escenas no parecía suficientemente senior. Su captura mostró además pérdida de contraste en títulos y destacados al usar modo oscuro.

## Ajustes

- Las tres escenas se regeneran a partir de una misma referencia envejecida: frente más arrugada, belfos caídos, expresión anciana, pelo marfil menos brillante y menor tono muscular. Se conservan orejas naturales y marca sobre el ojo izquierdo. Es un sujeto ilustrativo, no un paciente de los estudios ni una imagen que permita diagnosticar una enfermedad.
- Las escenas tienen nombres `-v2` y sus tamaños 1200/800/400 para evitar que la caché de imágenes (30 días en `_headers`) conserve la apariencia anterior. Las versiones históricas se preservan para enlaces antiguos.
- La silueta dibujada con elipses y trazos se sustituye por un recorte realista con transparencia del mismo dogo senior. Se utiliza en las tres secuencias con las mismas proporciones anatómicas.
- Se rediseñan el entorno, iconos, indicadores de progreso y mapa corporal. Se mantienen las acciones didácticas: detener el agua, retirar el contacto, preparar el espacio y recorrer las zonas externas.
- Se fijan colores locales de títulos y destacados sobre el fondo claro de las tarjetas, también en modo oscuro, sin modificar los estilos globales. La corrección incluye las dos infografías.

## Comprobación

- Inspección visual de las cuatro imágenes generadas y capturas en móvil oscuro y escritorio.
- Chromium a 390×844, modo claro y oscuro: sin desbordamiento horizontal; contraste mínimo 8,18:1 en los títulos/destacados de animaciones e infografías.
- Las tres secuencias conservan avance/retroceso con teclado, reproducción, pausa y avance temporizado.
- Movimiento reducido: sin transiciones; reproducción automática deshabilitada y avance manual disponible.
- Sin JavaScript: doce pasos visibles y controles ocultos.
- Tres imágenes de artículo y recorte de las secuencias cargados correctamente; sin errores JavaScript.
- `npx astro build`: correcto, incluida la proyección Markdown del sitio.
- `npx astro check`: 0 errores, 0 advertencias; hints existentes del proyecto.
- `git diff --check`: correcto.

El contenido clínico y los recursos de Reserva Personal no se modifican. El brief se actualiza para conservar la nueva especificación visual.
