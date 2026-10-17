# Verificación local del corrector

17 de octubre de 2026. Build estático sobre la rama de propuesta; no es comprobación pública ni aprobación visual del usuario.

- Astro build aprobado; proyección de 32 documentos.
- Astro check: 0 errores, 0 advertencias y 59 hints.
- Proyección Markdown reproducida byte a byte y guardia semántica independiente aprobadas.
- Playwright: seis escenarios aprobados. Cuatro combinaciones de escritorio/móvil y claro/oscuro recorren los cuatro pasos, ampliación, teclado, objetivos táctiles de 44px, reproducción/pausa/repetición, fin de secuencia, pausa al ocultar página, ausencia de desbordamiento y errores JS. Contraste del botón seleccionado, incluido hover, comprobado >=4,5:1. Los otros dos escenarios comprueban movimiento reducido, impresión de los cuatro pasos y alternativa completa sin JavaScript.
- Las imágenes usadas se decodificaron en navegador. Sus 9 variantes están en rutas nuevas v1; el conjunto comprimido ocupa unos 660KiB.

Script y resultados: `verificar-navegador.py`, `navegador-local.json` y `*.log`. La prueba bloquea solicitudes a terceros y no envía mensajes ni formularios. Las capturas `guia-*` mantienen los componentes globales del sitio. Las dos capturas `propuesta-*` ocultan únicamente las superposiciones flotantes de publicidad/asistente para aislar visualmente esta guía; no se modificó su configuración en el producto. Las pruebas funcionales se ejecutaron con esas superposiciones presentes.

Se detectó y corrigió el contraste del hover durante la verificación. La primera aserción de movimiento reducido esperaba 0s exactos: el CSS global fija 1e-05s con transition-property:none; se ajustó la prueba a ausencia real de transición. El auditor encontró además el fallo de impresión de paneles hidden causado por la prioridad de la capa preflight. Se corrigió mediante estado CSS data-active, manteniendo los paneles inaccesibles en pantalla cuando no corresponden, y todos visibles al imprimir. El registro final corresponde a la versión corregida.

La revisión independiente se conserva en su informe propio. La aprobación estética del usuario y la integración en main continúan pendientes.
