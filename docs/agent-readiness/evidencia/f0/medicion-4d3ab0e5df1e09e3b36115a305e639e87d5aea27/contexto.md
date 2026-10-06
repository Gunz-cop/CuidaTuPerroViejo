# Evidencia offline desde tooling corregido

Replay, build/inventory y manifiesto de paridad se generaron desde el commit limpio `4d3ab0e5df1e09e3b36115a305e639e87d5aea27` el 2026-10-05. `dirtySource=false` en replay; los manifests identifican el sourceCommit y hashes de los ficheros.

- `replay/`: complete 43/20/19 con nextLevel y bytes del baseline conservados.
- `inventory/`: state `valid`, errors vacío, 34 HTML, 28 documentos; home canonical `/` incluida en sitemap.
- `parity/`: siete fixtures con texto de warning/FAQ filtrado de scripts y ads, manteniendo headings, contenido clínico visible, preguntas/respuestas completas, y fuentes. Los fixtures originales no se editaron.

Las capturas LIVE de C05 siguen en [`../medicion-35e767647a05034baa3b4e371bee4f7a3849545d/`](../medicion-35e767647a05034baa3b4e371bee4f7a3849545d/) con `sourceCommit=35e767647a05034baa3b4e371bee4f7a3849545d`, `dirtySource=false`, `deploymentCommit=null`. Son las dos únicas solicitudes autorizadas, una Content y una All UI. No se reejecutaron después de corregir compare/inventory/parity; su SHA y raw responses se conservan.

El manifiesto de paridad anterior bajo `medicion-35e…/parity/` se mantiene como output histórico de la primera implementación. Auditoría R1 B04 identificó que incluía texto de scripts/anuncios en warnings; la manifestación corregida de este directorio lo reemplaza para la revisión actual. No alterar los bytes originales de R1 ni interpretar el artefacto previo como expectativa vigente.
