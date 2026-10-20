# Corrección técnica previa a la revisión independiente

Fecha: 2026-10-20. Rol: validación y corrección técnica; este documento **no es una auditoría independiente ni consume una ronda nueva**. El cierre independiente pendiente sigue siendo R3/3 del artículo v2. No se modificó prosa, imágenes ni historia de auditorías; únicamente los dos componentes indicados abajo. No hubo commit, push ni despliegue de esta corrección.

## Defectos confirmados y cambios

1. **Impresión de página completa desde móvil:** con el formulario plegado, el documento imprimible dejaba fuera los diez campos (0 visibles). Se abren los `details` del recurso en `beforeprint` y se restaura cada estado en `afterprint`; la navegación de Astro también limpia esos estados. El botón específico del registro mantiene su copia imprimible con los campos abiertos y valores transformados a texto. La prueba usa eventos nativos de `page.pdf()`, no solo eventos sintéticos.
2. **Contraste de nuevos desplegables:** el estilo global imponía texto blanco en el summary del registro en modo oscuro sobre un fondo verde claro; axe detectó `color-contrast`. Los detalles abiertos heredaban además un fondo global incompatible con los textos verdes. Se fijaron fondo, texto y símbolo de expansión **dentro del componente**, con prioridad suficiente frente a `.content-body`. Se conserva el log del fallo inicial en `fallo-contraste-inicial.log`.
3. **Altura de las notas plegadas:** el margen y padding globales dejaban la secuencia de ingesta en unos 919 px a 390 px. Se acotaron los márgenes y padding locales del detalle secundario. No se redujo la letra ni se escondieron las alertas de seguridad.
4. **Tabla de presentaciones:** una medición antes de compactar las celdas daba unos 979 px en móvil. Se redujo el padding vertical de las tarjetas de `TablaApilable`, conservando tipografía, encabezados `data-label` y texto. El fallo de la afirmación de altura, conservado en `fallo-altura-tabla-inicial.log`, corresponde a un estado intermedio con 915 px; la tabla final mide 825 px.
5. **Cambio de orientación/ancho:** el formulario solo adaptaba su apertura al inicializar. Ahora un listener del mismo breakpoint lo abre al pasar a escritorio y lo pliega al volver al móvil, sin borrar los valores; se elimina con el AbortController de la instancia.

## Pruebas sobre el build final

Chromium local con Playwright; no se probó Safari ni un iPhone físico. Build técnico final terminado a las 21:08:15 UTC, `npx --no-install astro build`, incluida la proyección de 33 documentos. El coordinador conserva y ejecuta los controles generales de build/check y proyección.

| Recurso | Altura inicial a 390 px, claro/oscuro | Comportamiento |
|---|---:|---|
| Secuencia de base | 835,72 px | Dibujo, controles y paso activo en orden; cuatro pasos disponibles |
| Secuencia de ingesta | 860,53 px | Dibujo, controles y paso activo en orden; cuatro pasos disponibles |
| Registro | 638,39 px | Diez campos plegados con summary explícito; apertura manual |
| Tabla de situaciones | 601,64 px | Tarjetas con encabezados, sin desplazamiento horizontal |
| Tabla de etiquetas | 688,20 px | Tarjetas con encabezados, sin desplazamiento horizontal |
| Tabla de presentaciones | 824,98 px | Tarjetas con encabezados, sin desplazamiento horizontal |

- Cuatro vistas: 390 y 1366 px, claro y oscuro. Sin desbordamiento de la página ni de las tablas; cinco imágenes decodificadas. También se comprobó aparte 320 y 375 px sin JavaScript: ancho del documento igual al viewport tras `networkidle`.
- Axe WCAG 2 A/AA y 2.1 AA sobre el artículo: cero infracciones, con los detalles cerrados y también con todos los detalles de los recursos abiertos. Es un control automatizado, no una certificación de accesibilidad.
- Botones de las secuencias de al menos 44 × 44 px, sin autoplay y recorrido manual completo de los cuatro pasos de cada secuencia. En móvil, dibujo, controles y texto activo caben juntos dentro de 900 px en todos los pasos.
- Formulario inicialmente cerrado a 390 y abierto a 1366; el cambio 390 → 1366 → 390 abre y pliega como corresponde. Sin JavaScript está abierto y se leen los ocho pasos de ambas secuencias.
- Movimiento reducido: ambos botones de reproducción deshabilitados, recorrido manual funcional.
- Impresión nativa de página completa iniciada con el formulario móvil cerrado: `beforeprint` observa diez campos disponibles; `afterprint` restaura cerrado. Todos los pasos aparecen en las alternativas de impresión.
- Impresión específica del registro: diez valores con la longitud máxima admitida, íntegros en el PDF al extraer texto con `pdftotext -raw`; sin truncado. `registro-print-ejemplo.pdf` contiene datos sintéticos de prueba, no datos de un paciente.
- Sin errores JavaScript durante estas pruebas. La reproducción temporizada, pausa y limpieza de temporizadores no se reimplementaron en esta corrección; las pruebas históricas R2 siguen identificadas como tales y el auditor R3 podrá verificar su vigencia.

## Evidencia y alcance de las capturas

Script reproducible: `verificar-recursos.py`. Resultados: `verificacion-tecnica.json`. Capturas aisladas de los tres recursos y las tres tablas en los cuatro contextos, nombradas `390-light-*`, `390-dark-*`, `1366-light-*`, `1366-dark-*`. Solo al capturar se ocultan overlays externos con `position:fixed`, y se restaura inmediatamente su visibilidad; la cabecera sticky del sitio puede asomarse en el borde superior de alguna captura. Esa limpieza de presentación no se usa como prueba de ausencia de overlays. No se desactivan componentes en la comprobación funcional.

PDFs de pruebas: `pagina-completa-print-movil.pdf`, `pagina-completa-print-sin-js.pdf`, `registro-print-ejemplo.pdf`. No reemplazan los archivos de lectura para el propietario preparados por coordinación.

Versiones SHA256 finales en `versiones-tecnicas.json`. Los hashes del artículo y de ambos componentes quedaron congelados antes de encargar R3; los recursos revisados pertenecen al build indicado, sin modificaciones de producto posteriores.
