# F4A-3 — Resultado de la publicación

Fecha 2026-10-13. Estado: **publicado en producción; gates P4A3-01 a P4A3-03 en PASS según el autor**, tras una primera ejecución de P4A3-01 en FAIL por un despliegue que aún no había convergido (ver abajo). Auditoría independiente de la publicación: [R1](../../auditoria/f4a-3-publicacion-r1.md) FAIL sólo por B1 (documental, resuelto en `01ec8f8`) y [R2](../../auditoria/f4a-3-publicacion-r2.md) **PASS**; la segunda ejecución de P4A3-01 se dictaminó como no bloqueante. **F4A-3 cerrada.**

## Qué se publicó

- **Autorización:** el propietario respondió «Push a main y dalo por cerrado si se puede» a la [propuesta](../propuesta.md).
- **Promoción:** `main` pasa de `35e2c15` a **`cb8e10f1ead55ef0dafc666672cd3003252afc59`** (tree `2727f993…`) por fast-forward sin force, a las 13:40:25Z ([recibo](recibo-produccion.json)).
- **Deploy:** Workers Builds `39c2fd8b`, check `115329002239` con `success` a las 13:41:07Z.

## Primera ejecución de P4A3-01: FAIL por despliegue no convergido

- **Arranque prematuro (error del autor).** El sondeo de «en vivo» vio el `openapi.json` nuevo a las 13:41:17Z, y P4A3-01 empezó a las 13:41:30Z. El criterio de una sola respuesta nueva era demasiado débil.
- **Lo que encontró:** producción servía a la vez las dos versiones.
  - Identidad 13/22. Los archivos que diferían eran **byte a byte los de F4A** (`35e2c15`), y había 404 en los tres chunks nuevos.
  - Ejemplo de calidad de vida con el cuerpo de F4A.
  - C4A-16 48/49: `corpusSha256` todavía el de F4A.
  - La matriz segura sí pasó.
  - Archivos: [identidad](run1-produccion-identidad.json), [C4A-16](run1-c4a16-produccion.json), [matriz](run1-http-matrix-produccion.json).
- **Interpretación.** No es un defecto del producto: es la ventana de propagación del despliegue. Aun así, durante esa ventana una página nueva podía referenciar chunks que todavía no se servían.
- **Tratamiento:**
  - La ejecución queda registrada como FAIL.
  - Antes de repetir se exigió convergencia: 22/22 en 3 sondeos seguidos con 60 s de separación ([convergencia](convergencia.json), [script](convergencia.mjs)), que se cumplió a las 13:44:31Z.
  - Después se ejecutó P4A3-01 **una sola vez más**.
  - Los gates del navegador y los scans se lanzaron sólo tras la convergencia.
  - Es una desviación del «sin reintentos» de la propuesta y la valora la auditoría de la publicación.

## Gates sobre el despliegue convergido

Una ejecución cada uno contra `https://cuidatuperroviejo.com`.

| Gate | Resultado | Evidencia |
|---|---|---|
| P4A3-01 identidad | PASS | 22/22 archivos del [build-manifest](../build-manifest.json) de `cb8e10f` byte a byte. Ejemplos normativos 2/2, con el de calidad de vida ya regenerado (`compromised`). `robots.txt` byte-idéntico, con la única señal `search=yes, ai-input=yes, ai-train=no` ([identidad](produccion-identidad.json)) |
| P4A3-01 matriz HTTP | PASS | 26/26, **sólo GET/HEAD/OPTIONS** ([matriz](http-matrix-produccion.json), [script](http-matrix-seguro.mjs)) |
| P4A3-01 C4A-16 | PASS | 49/49 sobre lo servido: HTML y JSON-LD con los textos nuevos, los 27 Markdown iguales a la base y sólo `tool--calidad-vida` cambiado, y OpenAPI 1.2.0 ([C4A-16](c4a16-produccion.json)) |
| P4A3-02 con WebMCP | PASS | Chrome 155 + `WebMCPTesting`, con field trials desactivados: 91/91 ([json](webmcp-prod-chrome155-webmcp.json)) |
| P4A3-02 sin WebMCP | PASS | 28/28 en Chrome 155 sin flag ([json](webmcp-prod-chrome155-sin-api.json)) y en Chromium 141 ([json](webmcp-prod-chromium141.json)): sólo se pide el cierre de imports fuera de la plantilla. C4A-17(c) da el mismo JS que `aad2a66` ([155](c4a17c-prod-chrome155.json), [141](c4a17c-prod-chromium141.json)) |
| P4A3-02 calculadoras | PASS | 36/36 UI = API en Chrome 155 ([json](ui-parity-prod-chrome155-sin-api.json)) y en Chromium 141 ([json](ui-parity-prod-chromium141.json)) |
| P4A3-03 scans | PASS | Un scan por perfil con la CLI congelada (`index.mjs` `e2ea8f3d…`, `shared.mjs` `89581c2a…`) |

## Puntuación comparable

| Perfil | Cierre F4A | F4A-3 | Δ | Cambios | Comparable |
|---|---|---|---|---|---|
| content | 86 (nivel 5) | **86** (nivel 5), 6/1/15 | 0 | ninguno | sí |
| all-ui | 67 (nivel 4) | **67** (nivel 4), 10/5/7 | 0 | ninguno | sí |

- `webMcp` sigue en **pass**: «Found 4 WebMCP tools via document.modelContext…». La carga condicional no afecta al evaluador real.
- Archivos: [summary content](live-content/summary.json), [summary all-ui](live-all-ui/summary.json), [comparación content](comparacion-content.json), [comparación all-ui](comparacion-all-ui.json).
- Originales privados, con su [índice SHA-256](indice-originales.json).

## Rollback

Ver la [propuesta](../propuesta.md#rollback) y la SDD §7. El estado publicado anterior es `35e2c15`.
