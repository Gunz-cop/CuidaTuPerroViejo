# Plan de verificación técnica local

Estado: ejecutado sobre el build final corregido el 22 de octubre de 2026: 103/103 comprobaciones correctas. Véanse [informe técnico final](revision-tecnica.md) y [resultados brutos](navegador.json). Este documento no es una auditoría editorial ni consume una ronda.

El comprobador `verificar-navegador.mjs` usa Chromium con Playwright y axe; lee la URL local por argumento. Sus dependencias se mantienen fuera del manifiesto y lockfile del sitio. En este entorno están en `/tmp/mal-aliento-browser/node_modules`; puede cambiarse con `QA_NODE_MODULES`.

```bash
node docs/contenido/mal-aliento-perros-viejos/qa/verificar-navegador.mjs http://127.0.0.1:4321
```

Cobertura ejecutada:

- Ventanas de 375 y 390 px y escritorio de 1366 px, temas claro y oscuro, dimensiones de recursos y ausencia de desbordamiento.
- Capturas de página y recursos aislados; imágenes realmente decodificadas, `currentSrc`, `srcset`, dimensiones y alt.
- Enlaces locales, descargas y anclas; el contenido clínico de fuentes externas corresponde al auditor editorial.
- axe sobre la página y contraste calculado del texto visible de los apoyos; objetivos táctiles y foco de teclado.
- No reproducción automática; anterior/siguiente, reproducción finita, pausa estable, repetición; suspensión al ocultar y limpiar al navegar.
- Movimiento reducido con avance manual; todos los pasos disponibles sin JavaScript; controles inertes ocultos.
- Impresión con y sin JavaScript: todos los pasos visibles.
- Registro de errores JavaScript y fallos de recursos locales.

Los resultados se guardaron con hashes de los archivos de entrega y la fecha de ejecución. Una prueba mecánica correcta no sustituye inspección visual de anatomía, continuidad del perro, legibilidad o afirmaciones veterinarias. Las capturas serán locales, sin despliegue. Las solicitudes externas del navegador se bloquean para evitar llamadas de analítica o formularios; se declarará esa condición en el informe.
