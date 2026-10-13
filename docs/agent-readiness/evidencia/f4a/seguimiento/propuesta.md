# F4A-3 — Propuesta de promoción a producción

Fecha 2026-10-13. Estado: **autorizada y ejecutada** (ver [resultado](publicacion/resultado.md)). Texto original conservado: «propuesta preparada y revisable; pendiente de autorización del propietario. Nada de esta propuesta se ha ejecutado contra `main` ni contra producción.»

## Candidato congelado

- **Producto:** `cb8e10f1ead55ef0dafc666672cd3003252afc59`, tree `2727f993981f3cbbd144b802b08f13d072d11773`. Es el código aceptado con [R1/5 PASS](../auditoria/f4a-3-r1.md).
- **`main` observado:** `35e2c1583f197cb0f5e7a878a5227f39897740b7` (F4A publicada). Es ancestro directo del candidato, así que la promoción es un **fast-forward sin force**. Entre ambos, además del código F4A-3, solo hay documentación: el cierre de F4A, la SDD del seguimiento y su ratificación.
- **Rama de release:** `release/f4a3-cb8e10f1`, en el mismo SHA, con un PR draft a `main` que solo sirve para pasar CI contra `main`.

## Pasos tras la autorización

1. **Comprobaciones previas.** Volver a comprobar que `main` = `35e2c15` y que el candidato no ha cambiado. Si `main` ha avanzado: STOP.
2. **Promoción.** Fast-forward de `main` a `cb8e10f`, sin force. Esperar a que producción sirva el build y archivar el recibo.
3. **P4A3-01, HTTP en producción.** Solo GET/HEAD/OPTIONS y sin reintentos.
   - Identidad: los 22 archivos de [build-manifest.json](build-manifest.json) se sirven byte a byte.
   - Ejemplos normativos 2/2.
   - Política F1: `search=yes, ai-input=yes, ai-train=no`.
   - Matriz HTTP de F4A-1 sin los casos POST/DELETE.
   - C4A-16 en la página servida: HTML, JSON-LD, Markdown de la herramienta y OpenAPI 1.2.0.
4. **P4A3-02, navegador en producción.**
   - Con WebMCP: Chrome 155 + flag, `webmcp-browser.mjs` supported.
   - Sin WebMCP: Chrome 155 sin flag y Chromium 141, en modo unsupported, más C4A-17(c) contra la referencia `aad2a66` ya medida.
   - `tools-ui-parity.mjs` en los dos navegadores sin soporte.
5. **P4A3-03, scans.** Exactamente un scan *content* y uno *all-ui* con la CLI congelada, comparados con el cierre F4A (86 / 67).
   - Se espera que la puntuación no cambie; no es criterio de aceptación.
   - `webMcp` debe seguir en pass.
   - Si el evaluador falla: STOP, sin reintentos.
6. **Cierre.** Evidencia curada y auditoría independiente de la publicación.

## Rollback

Ver la SDD, §7. Partes independientes:

- **D34:** volver a la línea `<script>` de F4A.
- **D33:** restaurar `>=`, los textos, las descripciones y OpenAPI 1.1.0, y el ejemplo anterior.
- **D35:** es solo documental.

El estado publicado anterior es `35e2c15`.

## Autorización solicitada

Se pide autorización para:

- el fast-forward de `main` a `cb8e10f1ead55ef0dafc666672cd3003252afc59`;
- los pushes de evidencia;
- P4A3-01 a P4A3-03 contra producción (lecturas y dos scans);
- la auditoría de la publicación.
