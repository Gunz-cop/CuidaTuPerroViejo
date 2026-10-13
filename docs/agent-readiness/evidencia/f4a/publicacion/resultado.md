# F4A — Resultado de la publicación

Fecha 2026-10-12. Estado: **publicado en producción; gates P4A-01 a P4A-03 en PASS según el autor; pendiente de auditoría independiente de la publicación.**

## Qué se publicó

- **Autorización:** el propietario respondió «Pushea a main» a la solicitud de [propuesta.md](propuesta.md), pasos 1–4.
- **Promoción:** `main` `aad2a66` → **`35e2c1583f197cb0f5e7a878a5227f39897740b7`** (tree `93678188…`), fast-forward sin force a las 22:51:18Z. Antes del push se comprobó que `main` seguía en `aad2a66` y que era ancestro del candidato ([recibo](recibo-produccion.json)).
- **Deploy:** Workers Builds `86bbb0d9`. El check de GitHub del build de `main` sigue `in_progress`, igual que en F3, así que no se usa como prueba. La prueba es la identidad por contenido: producción sirve el `openapi.json` de F4A desde 22:52:32Z y los 22 archivos del manifest son byte-idénticos.

## Gates

Cada gate se ejecutó una sola vez, sin reintentos, contra `https://cuidatuperroviejo.com`.

| Gate | Resultado | Evidencia |
|---|---|---|
| P4A-01 identidad | PASS | 22/22 archivos del [build-manifest](../2/build-manifest.json) de `35e2c15` servidos byte a byte (OpenAPI 1.1.0, `query-index`, API Catalog, ARD, skills, `llms.txt`, índice F2, Markdown de las dos tools, páginas y los 8 assets `_astro`) ([identidad](produccion-identidad.json), [verificador](verificar-produccion-f4a.mjs)) |
| P4A-01 ejemplos normativos | PASS | Las dos respuestas 200 son byte a byte iguales a [`ejemplo-calidad-vida-200.json`](../contratos/ejemplo-calidad-vida-200.json) y [`ejemplo-movilidad-200.json`](../contratos/ejemplo-movilidad-200.json), con `application/json; charset=utf-8` y `private, no-store` |
| P4A-01 política F1 | PASS | `robots.txt` byte-idéntico a la fuente, con la única señal `Content-Signal: search=yes, ai-input=yes, ai-train=no` |
| P4A-01 matriz HTTP | PASS | 28/28 casos de [`http-matrix.mjs`](../1/http-matrix.mjs): cálculo 200/400/404/405/HEAD/OPTIONS; F3 búsqueda `cushing` → lectura con `markdownSha256` correcto; descriptores y páginas ([matriz](http-matrix-produccion.json)) |
| P4A-02 con WebMCP | PASS | Chrome for Testing 155.0.8059.39 + `WebMCPTesting`, field trials desactivados: 81/81 (registro de las 4 tools en 4 páginas, llamadas iguales a la API, cancelación, errores, sin efectos) ([json](webmcp-prod-chrome155-webmcp.json)) |
| P4A-02 sin WebMCP | PASS | Chrome 155 sin flag: 16/16 ([json](webmcp-prod-chrome155-sin-api.json)). Chromium 141.0.7390.37: 16/16 ([json](webmcp-prod-chromium141.json)) |
| P4A-02 calculadoras | PASS | UI completada por clics e igual a la API, 34/34 casos en Chrome 155 sin API ([json](ui-parity-prod-chrome155-sin-api.json)) y en Chromium 141 ([json](ui-parity-prod-chromium141.json)) |
| P4A-03 scans | PASS | Un scan por perfil con la CLI congelada de F3 (`index.mjs` `e2ea8f3d…`, `shared.mjs` `89581c2a…`, sin cambios desde F3) |

## Puntuación comparable (P4A-03)

| Perfil | F3 | F4A | Δ | Cambios | Comparable |
|---|---|---|---|---|---|
| content | 86 (nivel 5), 6 pass / 1 fail / 15 neutrales, denominador 7 | **86** (nivel 5), 6 / 1 / 15, denominador 7 | 0 | ninguno | sí, mismo `requestSha256` `94daf42c…` |
| all-ui | 60 (nivel 4), 9 pass / 6 fail / 7 neutrales, denominador 15 | **67** (nivel 4), 10 / 5 / 7, denominador 15 | **+7** | `webMcp` fail → **pass** | sí, mismo `requestSha256` `d7533cff…` |

- **Verificación real de WebMCP:** el evaluador reporta «Found 4 WebMCP tools via document.modelContext: search_guides, read_guide, evaluate_quality_of_life, recommend_mobility_aids». No hay polyfill ni API simulada.
- **Previsión:** el 67 coincide con la previsión de la propuesta, que no era criterio de aceptación.
- **Fails restantes en all-ui:** `dnsAid` (F5), `oauthDiscovery`, `oauthProtectedResource` y `authMd` (F6), y `mcpServerCard` (F4B). Están fuera del alcance de F4A.
- **Commits que registran los summaries:**
  - `sourceCommit`: `2d8dfdc`, el checkout local de documentación. Su código (`src`, `public`, `scripts`) es idéntico a `35e2c15`.
  - `deploymentCommit`: `null`, porque la CLI no lo obtiene. La identidad del deploy la prueba P4A-01.
- **Archivos:** [summary content](live-content/summary.json), [summary all-ui](live-all-ui/summary.json), [comparación content](comparacion-content.json) y [comparación all-ui](comparacion-all-ui.json).

## Originales

`response.raw.json` de ambos scans y las salidas completas quedan en privado, en el contenedor de la sesión coordinadora. Su referencia durable es el [índice SHA-256](indice-originales.json). Las copias publicadas aquí son las curadas: `summary`, `manifest`, `request` y `response-metadata`.

## Rollback

Según [propuesta.md](propuesta.md#rollback), con autorización separada:

1. PR de reversión que quite la línea del layout y `src/scripts/agent-tools.ts`. WebMCP desaparece y las calculadoras y la API siguen.
2. Si hace falta, revertir también F4A-1, restaurando los scripts legados. En ningún momento quedan dos algoritmos.

El estado anterior publicado es `aad2a66`.
