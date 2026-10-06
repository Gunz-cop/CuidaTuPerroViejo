# F2A: estado de aceptación y evidencia

Base aprobada: `cac7ee039607ee9923a403a4e2f299437ff94af2` (tree `fcb639ddc7680ec69b5fb862731ab9174ee37a8a`). La auditoría R1 encontró B01–B05 en el candidato público `d628f371b32cd7c4bb698ba906b2648c4cd6178a`; el código corregido local se selló en `54e51a2138d90e822e5a6e6c12a0e56345ec1173` (tree `47790c1d300e47ee38db464f7dcec2c6e693baad`). El dueño autorizó explícitamente los builds y la validación del PR el 2026-10-06, aceptando el posible cargo del binding IA. La SDD no cambió. El antecedente del bloqueo de entorno y su resolución constan en [bug #58](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/58).

| Criterio | Estado del trabajo local corregido | Evidencia / límite |
| --- | --- | --- |
| A01 | PASS en revisión local de ownership | Cambios en proyección, integración F1, `_headers`, CI, pruebas, goldens y evidencia F2A. No se editó código de F2B ni archivos de producto fuera de ownership. |
| A02 | PASS local; recibo CI pendiente | Tres builds Astro limpios terminaron con el source code `54e51a2`; la integración de proyección corre en `astro:build:done`, después de F1. `astro check`, discovery, projection check y dry-run de la configuración compilada también pasaron. El aviso real de Wrangler sobre acceso remoto posible del binding AI quedó preservado; no se llamó el binding. |
| A03 | PASS del build actual | Caso growth 29 recorre sitemap + catálogo + HTML + inventario y check concordantes; canonicalPath 100/101/115 se prueba aislado y sin salidas parciales. La proyección del build actual tiene 28 documentos y 29 artefactos exactos; checks de sólo lectura pasaron. |
| A04 | PASS local | 11 pares HTML/Markdown; cuatro goldens fueron corregidos manualmente con revisión del HTML fijo. El guard parse5 + Markdown/GFM independiente cubrió todos los 28 documentos del build actual. Los fixtures esperados no se regeneran desde el serializador. |
| A05 | PASS local | Sólo se excluye `span#localized-emergency-text`; permanecen `aside#urgencias`, su aviso y el enlace estático. Las mutaciones de aviso condicional, FAQ, celda, fuente y autor son detectadas. |
| A06 | PASS del corpus del build actual | Tres builds limpios del mismo source produjeron iguales 29 artefactos F2 y los 28 HTML documentales de entrada coinciden. Los dos hashes que varían en el bundle completo son `dist/client/contacto.html` y `dist/server/chunks/entrypoints_BZDcIFRV.mjs`, fuera del corpus F2 y de su contrato de determinismo. |
| A07 | PASS local Workerd; Commit Preview pendiente | En Worker aislado con sólo ASSETS y SESSION locales: 58 solicitudes GET/HEAD al índice y los 28 Markdown pasaron MIME, bytes, SHA256, Link y headers; HEAD no entregó cuerpo. `/` con `Accept: text/markdown` siguió sirviendo HTML. La evidencia de R1 sigue identificada aparte como captura de `d628f371…`. |
| A08 | En validación | La autorización explícita resolvió el bloqueo #58. Quedan por publicar/actualizar PR draft #57 y capturar CI, Workers y Commit Preview oficial del SHA exacto antes de iniciar R2 independiente. |

## Comprobaciones offline y procedencia

- La suite de agent-readiness pasó 42/42 (`projection-r1-local-harness-recheck.log`); conserva la traza del mismatch previo (`projection-r1-local-hardbreak-mismatch.log`). `npm test` pasó 1/1; `astro check` terminó con 0 errores, 0 warnings y 50 hints.
- Los tres builds limpios Astro del mismo source finalizaron con exit 0. En todos, los 29 hashes de `agent-content/v1` (índice y 28 Markdown) fueron idénticos, al igual que los 28 HTML documentales; los manifests completos conservan dos diferencias ajenas al corpus F2: `contacto.html` y el chunk de servidor `entrypoints_BZDcIFRV.mjs`.
- `discovery.mjs check`, `projection.mjs check` y el guard independiente parse5 + Markdown/GFM pasaron sobre el `dist` actual. El dry-run de Wrangler usó `dist/server/wrangler.json`, terminó sin deploy y preservó el warning de binding AI. Para Workerd se usó una copia aislada en `dist/server` (ignorada), con sólo ASSETS y SESSION locales; no se modificó la configuración de producto ni se solicitaron endpoints AI, API o admin.
- Los requests, headers y cuerpos GET/HEAD del Workerd actual están archivados en `workerd-final-raw/` y sus checks resumidos en `workerd-http-final.json`. Aún faltan la publicación PR, los recibos CI/Workers y la captura HTTP del Commit Preview del mismo HEAD.

Los dos espacios finales que preceden el salto en las tres líneas derivadas de `<br>` en el golden `home.md` son intencionales para preservar el hard line break de HTML. `git diff --check` reporta esas líneas por diseño; se documenta la excepción en [ajustes-r1.md](ajustes-r1.md), no se elimina su semántica.

Los archivos históricos `index.json`, `build-1.sha256`, `build-2.sha256`, `workerd-http.json` y la captura del bot siguen perteneciendo exclusivamente al SHA `d628f371…`. Las nuevas mediciones de build y Workerd se registran por separado para el source code `54e51a2…`; las capturas del Commit Preview aún están pendientes. La procedencia, hashes y límites de evidencia R1 se conservan en [auditoría R1](auditoria-r1-implementacion.md) y [bundle R1](auditoria-r1-bundle/).

Rollback antes de promoción: revertir o cerrar la rama/PR F2A. No se solicitó aceptación final, no se cerró issue #55 y no se realizó merge, promoción a `main` ni deploy.
