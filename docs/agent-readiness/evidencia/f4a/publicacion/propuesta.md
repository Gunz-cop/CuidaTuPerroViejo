# F4A — Propuesta de promoción a producción

Fecha 2026-10-12. Estado: **propuesta preparada y revisable; pendiente de autorización del propietario**. Nada de esta propuesta se ha ejecutado contra `main` ni contra producción.

## Candidato congelado

- **Producto:** `35e2c1583f197cb0f5e7a878a5227f39897740b7`, tree `936781880833a8df156cff6b2298427e6d2e5543` (código F4A-2 aceptado; incluye F4A-1 `dad30d8`).
- **`main` observado:** `aad2a6624c24d7425c5ad5329b82c77a8a86b619` (producto F3 publicado). Es ancestro directo del candidato, así que la promoción es un **fast-forward sin force**, conservando el SHA exacto. No se usa merge, squash ni rebase.
- **Alcance frente a `main`:** 26 archivos de producto, tests o scripts (22 de F4A-1 y 4 de F4A-2). El resto es documentación: cierre F3, SDD F4A, auditorías y evidencia y aceptación de F4A-1. Los documentos posteriores (evidencia y aceptación de F4A-2, esta propuesta) quedan en `agent-ready/f4a-2` y no forman parte del candidato.
- **Validación:**
  - SDD: ciclo 1 en STOP, ciclo 2 con PASS R1/2 y ratificación.
  - F4A-1: PASS R1/5. F4A-2: PASS R1/5. Cero bloqueantes; auditor independiente fijo `claude-opus-5-5`/high, homologado de Sol/high.
  - CI y Workers Builds en verde en `35e2c158`.
  - La preview `5a780b04` sirve el build byte a byte; los gates C4A-08 a C4A-13 dan PASS en preview.
  - Rama de release propuesta: `release/f4a-35e2c158` (mismo SHA), con PR draft a `main` sólo para CI contra `main`.

## Pasos tras la autorización

1. Volver a comprobar que `main` = `aad2a66` y que el candidato es el mismo. Si `main` avanzó: STOP, revisar el diff y repetir los gates afectados.
2. Fast-forward de `main` a `35e2c15`, sin force. Esperar el deploy de Workers Builds de `main` y archivar su check run y el recibo de Cloudflare.
3. **P4A-01 (HTTP en producción, sólo GET/HEAD/OPTIONS):**
   - **Identidad:** los 22 archivos de `evidencia/f4a/2/build-manifest.json` deben servirse byte a byte en `https://cuidatuperroviejo.com`.
   - **Matriz `evidencia/f4a/1/http-matrix.mjs`:** cálculo 200/400/404/405/HEAD/OPTIONS, recorrido F3 `cushing` → lectura con hash, OpenAPI/API Catalog/ARD/skills/llms y páginas.
   - **Ejemplos normativos:** byte a byte.
   - **Política F1 intacta:** `search=yes, ai-input=yes, ai-train=no`.
   - Un fallo de transporte o un redirect inesperado se registra como FAIL/STOP, sin retry.
4. **P4A-02 (navegador en producción):**
   - `webmcp-browser.mjs --mode supported` con Chrome for Testing 155 + `WebMCPTesting`, con field trials desactivados.
   - `--mode unsupported` con Chrome 155 sin la API y con Chromium 141.
   - `tools-ui-parity.mjs` en ambos navegadores sin soporte.
   - Terceros bloqueados por el harness.
5. **P4A-03:** exactamente **un** scan content y **uno** all-ui con la CLI congelada:
   - `node scripts/agent-readiness/index.mjs scan --url https://cuidatuperroviejo.com --profile content|all-ui --out-dir <privado>`.
   - Comparación con `index.mjs compare` contra los summaries del cierre F3 (`evidencia/f3/publicacion/cierre/live-*/summary.json`).
   - Se reportan controles, denominadores y neutrales.
   - Si el evaluador cae o falla, STOP sin retries ni puntuación simulada.
   - Si `webMcp` sale en fail con P4A-02 PASS, bug y STOP (posible navegador del evaluador sin API u origin trial), sin polyfill.
6. Archivar la evidencia curada en `evidencia/f4a/publicacion/` y los originales completos (raw del evaluador, cabeceras) en privado con índice SHA-256. Después, auditoría independiente de la publicación y cierre.

Previsión: 67/100 general si pasa `webMcp` y no hay más cambios. **No es criterio de aceptación.**

## Rollback

- **Antes de promover:** no promover y conservar ramas y evidencia.
- **Después:** PR de reversión F4A-2 → F4A-1 sobre el `main` publicado, con autorización separada:
  - Quitar la línea del layout y `src/scripts/agent-tools.ts`. WebMCP desaparece y las calculadoras y la API siguen.
  - Después, si hace falta, quitar endpoints, contratos y la extracción junto con sus adaptadores UI, restaurando los scripts legados.
  - En ningún momento quedan dos algoritmos.
  - Nuevo build y verificación de F3 y de las calculadoras. Conservar la evidencia.

## Autorización solicitada

Autorización para: fast-forward de `main` a `35e2c1583f197cb0f5e7a878a5227f39897740b7` sin force, los pushes necesarios de evidencia de publicación, P4A-01 a P4A-03 contra producción (lecturas y dos scans) y la auditoría de la publicación. La autorización de F3 no cubre esta entrega.
