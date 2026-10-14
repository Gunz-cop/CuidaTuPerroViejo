# STOP de ownership — issue105

Bloqueo: [#105](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/105), separado del correctivo [#104](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/104). **No se admite ampliar ownership ni continuar programación sin decisión explícita del propietario.** Se aplica la regla del contrato §4: archivo/cambio esencial fuera del ownership implica bug/STOP. Este documento conserva resultados y una propuesta revisable; no aplica el parche.

## Snapshot y revisión

Producto correctivo detenido: commit `55dc4e778f7aabfd07287692d3e055d919f98ca2`, tree `95e3b2b906a7877ab39dd1f48c71ee640e05d3c1`; rama propia `agent-ready/mcp-discovery-104`, worktree `/workspace/ctpv-discovery104-author`. Base main verificada: `b2ab1082c02799dab4306a7c167a6114c0163a90`, tree `59dd444439b4f78018eba4a010b25840c4bdd87b`. El commit documental STOP es hijo separado de `55dc4e7`, sin cambios de producto/fixture.

Contrato `d09d63074215a49f648186127a109cab96077833`, tree `8821ad97d9a9e85344a6e4ba14b16065324b7f6a`: **R1/5 PASS** independiente y ratificado; [informe literal](../auditoria/contrato-r1.md), 8134 bytes, SHA-256 `ec9efe39b9cc95c12c28c3e00b7276ddfc4914108191f73389b95e49a9237723`. No existe dictamen de implementación. Siguiente revisión sería **R2/5**, mismo auditor GPT-6.1 Sol/high, contador total máximo cinco incluido contrato, sin reset. El STOP no se etiqueta como FAIL de auditoría ni reinicia el contador.

F4B R1FAIL/R2FAIL/R3PASS permanece intacta y aceptada. C09 no determinable con limitación aceptada sigue sin PASS ni protección efectiva acreditada; deadline externo pendiente/no bloqueante/no deuda/NO PASS. No se cambia ninguno de esos resultados.

## Hallazgo esencial y propuesta

El nuevo artifact está correctamente añadido al generador, manifest, prefijo reservado, `_headers` y `F3_ASSET_TYPES`. El fixture existente `tests/agent-readiness/f3-discovery.test.mjs` construye un conjunto literal `DESTINATIONS` que omite `.well-known/mcp/server-card.json`. Por eso `verifyDiscoveryDestinations` falla con ENOENT al verificar el artifact nuevo; la suite no puede alcanzar las assertions posteriores que dependen de ese fixture. No se debilita ni salta la comprobación del generador/discovery para ocultarlo.

Ese archivo no aparece en el ownership del contrato aprobado. El cambio mínimo necesario es agregar **una entrada literal** al fixture, conservando todos los tests, oracles de suffix/links, assertions y rechazos anteriores. [Parche propuesto como texto](parche-propuesto.patch.txt): una línea modificada, **NO aplicado**. Requiere decisión del propietario para admitir esa ampliación concreta; no una autorización de main/producción. Si se admite, conservar este FAIL, aplicar sólo esa entrada y comprobar la suite afectada y gates pendientes según contrato. Hoy no se ejecuta ese plan.

## Resultados existentes, sin reinterpretación

| Comprobación | Resultado sobre `55dc4e7` |
|---|---|
| Build candidato, `npx --no-install astro build` | **PASS**, exit0; 28 documentos generados. No prueba HTTP local/preview. |
| Specs migración | **PASS**, exit0. |
| Suite TypeScript `npm test` | **PASS**, 88 tests, 0 FAIL, exit0. Incluye checks reales del SDK en fixture del runtime, sin red. |
| Suite offline `node --test tests/agent-readiness/*.test.mjs` | **FAIL**, 77 tests: 74 PASS y 3 FAIL, exit1. Tres fallos del fixture discovery omitido. |
| Wrangler local / smoke / preview correctivo / receipt correctivo / rollback ensayado | **Pendientes, no ejecutados** antes del STOP. |
| Producción correctivo / medición del evaluador | **Pendientes, sin autorización aplicable y NO PASS**. |

Los tres FAIL originales son: `F3 extends the exact generated F1 prefix once, with literal normative suffix; check is read-only`; `missing or empty targets fail before announcing; no fallback and no rewriting mutated prefixes`; `discovery check rejects changed headers and policy without rewriting either`. En el segundo, ENOENT sustituye indebidamente el error de prefijo esperado porque el fixture sigue incompleto. El [log offline íntegro](candidate-tests-offline.log) conserva todos los mensajes y stacks. Build, specs y TS tienen sus logs literales junto a este documento; [índice de originales](indice-originales.json) registra bytes/hashes/rutas sin reemplazar originales privados.

El build de base fue preparado por coordinación sobre `b2ab108` limpio: exit0, manifest completo **357 files**, 76286 bytes, SHA-256 `6203f17ac2315d8089bcb35e28d7a16a4d61f25e4bd2af90d2618650eec73277`. [Manifest literal](base-build-manifest.json). Primer intento falló por ENOENT de cache Astro en `/home/agent/.config/astro`; su log se conserva. Segundo intento pasó con `ASTRO_TELEMETRY_DISABLED=1`, `WRANGLER_SEND_METRICS=false`, `XDG_CONFIG_HOME=/workspace/discovery104-config`, `npm_config_cache=/workspace/npm-cache`. No se atribuye el primer fallo al producto ni se borra por el PASS posterior. No se completó un diff final ni se prepararon expectativas SHA/tree para smoke; no se afirma D06/D07 PASS.

## Observaciones anteriores y CLI

Coordinación capturó GET públicos anteriores a la implementación a las 13:25 UTC del 2026-10-14, sin retries ni redirects: `/api/mcp/server-card` **200**, `/.well-known/mcp/server-card.json` **404**. La card pública nativa coincide con el build base: **559 bytes**, SHA-256 `aeea988a8e92d68085716e88755dae917215708953bbd0002a80ebd576ae1f84`. Se indexan cuerpos/headers/receipt y comparación; son observaciones de producción F4B anterior, no smoke del correctivo ni medición del evaluador.

Baseline histórico F4A archivado desde `a42a18522b7cf4143aff56d11d4632dc3c1050da`: **Content Site 86/100, nivel5 parcial; all-ui 67/100, nivel4 general**. Las summaries históricas declaran `sourceCommit=2b6f41c8ef170b58ea0e1f5914c13081efa7a464` y `deploymentCommit=null`; no se sobrescriben ni se atribuyen a F4B o issue104. Son archivos públicos curados; los raw HTTP históricos referenciados no están disponibles en este workspace nuevo. No hay scan nuevo ni mejora declarada.

CLI actual preservada: `index.mjs` SHA-256 `e2ea8f3db000e241a49628eb62182a018bb17b54b070917e0261c77291cfc438`; `shared.mjs` SHA-256 `89581c2a8750946fb5d972f42e4069f3b55ccc74a419606b5914de0344ad67b2`; perfiles congelados content7/all-ui20. No se modificaron universos/scoring ni se ejecutó la CLI de scan.

Sin cambios adicionales de producto/fixtures, tests, builds, HTTP de preview, scans, merge/main o producción después del STOP. El push autorizado de esta rama publica el artifact revisable y puede activar automatismos CI/Workers; no se ejecuta HTTP contra su imagen ni se atribuyen resultados de otra a ella. No se crea PR a main. La propuesta de ampliar el fixture debe resolverse antes de retomar; **no se pide autorizar promoción con gates incompletos**.
