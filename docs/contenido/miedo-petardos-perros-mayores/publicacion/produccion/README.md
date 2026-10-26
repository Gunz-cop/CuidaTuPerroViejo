# Verificación pública después de fusionar

26 de octubre de 2026. Comprobación del integrador, no una auditoría editorial o visual independiente.

El propietario autorizó «Adelante y si todo sale bien Pushealo a main». Se fusionó código #148 (`b0c4aa1`) y después artículo #149 (`589548a`). Antes de fusionar el artículo se cambió su base a main y se integró esa base en `b9e5fd2`: árbol idéntico al auditado `6df8249`, sin conflictos ni modificaciones de archivos. CI de integración **SUCCESS**, ejecución [40358569106](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/40358569106).

## Resultado público

- URL canónica [del artículo](https://cuidatuperroviejo.com/salud-mental-emocional-perros/miedo-petardos-perros-mayores): **HTTP200**.
- Tres imágenes principales y variante 400: HTTP200 y hashes idénticos a los binarios auditados. Tres imágenes decodificadas, dimensiones reservadas y solo portada eager; paseo y consulta lazy.
- Diez destinos internos HTTP200; el pilar, ansiedad por separación y agresividad tardía enlazan al artículo.
- Playwright/Chromium a 390 y 1366, claro y oscuro: sin desbordes ni errores JS, dos tablas con sus etiquetas, tres avisos, ocho FAQ inicialmente cerradas y apertura/cierre correctos.
- Contraste continuo mínimo, sin redondear: **4,504492059318877:1** en claro y **5,516990353269591:1** en oscuro. Alturas móviles de tablas: **777,53125 / 889,921875 px**; escritorio: **488,5625 / 650,34375 px**.
- Pie de portada y `ImageObject.caption` coinciden con el pie editorial. `BlogPosting`/`ImageObject` parseados y contrastados; se conserva `datePublished` 2026-10-25 y el fallback preexistente de `dateModified` a esa misma fecha. Sin validador externo de Google.
- Sitemap público incluye la URL. llms responde200 y conserva el pilar y los puntos de descubrimiento; no lista artículos individuales por diseño. Catálogo público paginado: **37 documentos**, incluido el artículo.
- Proyección Markdown pública, 46.226 bytes, SHA-256 **`d5ad63584c25c02d56bb4e4eb1239f8131af05dfd7af0f7af7bfc3e1802eca94`**, idéntica a la verificada. La API de lectura con corpus fijado devuelve el mismo hash y canónico.

P1-03 se marca Publicado en el inventario únicamente después de estas comprobaciones. La fecha de publicación del frontmatter, elegida antes por el propietario, se mantiene; la verificación del despliegue es del día26.

## Método y límites

Las peticiones HTTP utilizan el proxy y validación TLS del entorno. Chromium no confiaba en la CA de ese proxy: se entregaron al navegador las respuestas **públicas reales** obtenidas con `urllib` y TLS verificado, mediante `route.fulfill`. No se desactivó TLS ni se sustituyó la página por un build local. Se bloquearon terceros ajenos a la página/fuentes web y métodos de escritura. Las fuentes web y recursos de una misma URL se reutilizan en memoria entre los cuatro modos.

La ejecución final observó CLS0 en los cuatro modos y reserva correcta de las tres imágenes; es una observación bajo ese transporte, no una medición de Core Web Vitals en visitantes reales. El primer intento tuvo CLS0,020981416496423284 en escritorio claro; se conserva su límite en `incidencias-instrumental.json`. No se afirma inspección de logs o versiones internas de Cloudflare Workers Builds: la identidad del producto público se contrasta mediante proyección, binarios y DOM. Tampoco se probaron Safari/Firefox, móvil físico o lector de pantalla.

Se generaron36 capturas y se abrieron12, individualizadas en `capturas-no-incluidas.json`: ambas tablas móviles en ambos temas, las tres imágenes a390, portada escritorio oscuro, tres avisos claros y FAQ móvil. Las otras24 no se presentan como inspeccionadas individualmente. Los PNG permanecen en `/tmp`, fuera de Git, según la política elegida; se guardan hashes y un script de reproducción, sin prometer permanencia de ese directorio.

En la medición inicial se corrigió el **instrumento** para interpretar colores OKLab/OKLCH y el array de `ImageObject`. No se cambió el CSS, el schema ni el producto publicado. Véase `incidencias-instrumental.json`.

## Incidencia general que permanece

`GET /api/feedback?slug=…` devuelve **500**, también en golpe de calor y leishmaniosis, con el mismo cuerpo de error. Es el fallo de valoraciones ya registrado en TODO el2026-10-24; estos PR no cambian la API. Se mantiene esa tarea abierta. En producción no se describe este500 como el404 esperable del servidor estático local. No se enviaron votos ni mensajes y no se modificó D1.

## Evidencia y reproducción

`resumen.json`, `http-publico.json`, `navegador-publico.json`, `jsonld-publico.json`, `api-integridad.json`, `descubrimiento-publico.json` y `feedback-comparacion.json` documentan los resultados.

```bash
PETARDOS_PROD_OUT=/tmp/petardos-publicacion-produccion node docs/contenido/miedo-petardos-perros-mayores/publicacion/produccion/verificar-produccion.cjs
```

Requiere Playwright y Chromium ya instalados, red del entorno y proxy/TLS heredados. No instala dependencias, no publica, no cambia contenido y no utiliza formularios de escritura.
