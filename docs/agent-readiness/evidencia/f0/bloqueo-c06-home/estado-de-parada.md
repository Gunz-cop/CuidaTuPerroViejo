# HISTÓRICO — bloqueo C06 RESUELTO

> Este archivo describe únicamente el intento anterior a la resolución de #45. No representa el estado actual de F0 ni es evidencia de un fallo vigente. Los snapshots `inventory.json` y `manifest.json` de esta carpeta se conservan byte por byte como registro del diagnóstico histórico.

## Diagnóstico original

- Base examinada entonces: `6a1a317fe4d27154bff2a29ce12e2cdd74987315`.
- Bug asociado: issue #45 (canonical de home), enlazado a issue implementador #43.
- Build original: `dist/client/index.html` emitió canonical `https://cuidatuperroviejo.com/index`; sitemap incluyó `/`.
- Inventario exploratorio: exit 3; 34 HTML y 27/28 documentos. Errores `UNCLASSIFIED_PAGE`, `CATALOG_MISMATCH` y `SITEMAP_UNEXPLAINED_DIFFERENCE` para `/`.
- En ese punto no se modificó producto y no se consideró C06 satisfecho.

El snapshot y el manifest registran exactamente aquella base anterior. No deben usarse como el resultado final de inventario.

## Resolución y evidencia vigente

El fix de canonical #45 se integró en la base exacta de reanudación `4dced4155788af926ef7b4e3d2d7e8259e1978be`. El build explícito y el inventario sobre el tooling limpio `4d3ab0e5df1e09e3b36115a305e639e87d5aea27` produjeron el home canónico `/` y `state=valid`, `errors=[]`, 34 páginas HTML, 28 documentos, catálogo y sitemap consistentes, con home en sitemap.

El resultado actualizado, separado de este snapshot histórico, está en [`../medicion-4d3ab0e5df1e09e3b36115a305e639e87d5aea27/inventory/`](../medicion-4d3ab0e5df1e09e3b36115a305e639e87d5aea27/inventory/). Este cierre es evidencia de implementación, no aceptación independiente de C06 ni de F0.
