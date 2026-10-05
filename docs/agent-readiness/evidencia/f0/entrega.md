# Entrega F0 corregida para auditoría 2/5

Estado: correcciones de FAIL 1/5 preparadas para revisión del mismo auditor. Esta entrega no declara C01–C12 aceptados ni F0 cerrada.

## Identidad y publicación

- Base exacta de arranque: `4dced4155788af926ef7b4e3d2d7e8259e1978be`.
- Tooling limpio corregido: `4d3ab0e5df1e09e3b36115a305e639e87d5aea27`.
- Evidencia/C05 LIVE histórica: sourceCommit `35e767647a05034baa3b4e371bee4f7a3849545d`, `dirtySource=false`, deploymentCommit `null`; son las dos únicas llamadas autorizadas.
- Spike corregido: `926f3c0e2929ac9ad6caaca8d16c88b301f446b7`, sobre la misma base. Runtime de 40 checks: `4d0863c67e147027cf734e8333f978be5bcbe285`; el spike corregido solo arregla la ruta del fixture P4 y regeneró la evidencia/build, sin volver a ejecutar preview.
- Auditoría formal anterior: [`auditoria-f0-implementacion-r1.md`](auditoria/auditoria-f0-implementacion-r1.md), copia byte por byte del FAIL 1/5. No alterar su veredicto ni sus reproducciones.
- Los commits permanentes congelados antes del FAIL fueron `0c4da50`, `ad93416`, `35e7676`, `6e1639e` y `c2bf4d6`. La corrección limpia es `4d3ab0e`; el commit de entrega actual de esta serie documental será el HEAD que root publique.
- Destino de PR: `docs/f0-reanudacion-canonical`. Root coordina GitHub Contents API y la equivalencia local/remota. No se hizo push directo, merge ni deploy; checks del PR remoto siguen pendientes.

Las mediciones LIVE observaron el sitio público el 2026-10-05 y dieron Content 43, All UI 20, HTTP 200, completos. No identifican un build local ni los PRs sin integrar. El tooling posterior corrigió compare, guardas de inventory y extracción de paridad; las respuestas y `sourceCommit=35e…` se conservan intactos y no se reescanean. API sin configurar solo aparece en replay.

El bloqueo inicial de canonical de home es histórico/resuelto: el snapshot previo a #45 conserva sus bytes en `bloqueo-c06-home/`. El inventory vigente está en `medicion-4d3ab0e5df1e09e3b36115a305e639e87d5aea27/inventory/`. El parity manifest anterior de `medicion-35e…` también queda como histórico: R1 B04 halló scripts/ads dentro de texto de warnings; está supersedido por el manifest filtrado bajo `medicion-4d3ab0e…/parity/`.

## C01–C12: evidencia para la nueva revisión

| Criterio | Evidencia | Estado para revisión |
|---|---|---|
| C01 Base y ownership | Tooling de `4d3ab0e…`; patch spike final `926f3c0…` aplica sobre base `4dced415…`. Paths permanentes dentro de ownership; spike permanece como patch/evidencia, sin runtime aplicado. Manifiesto registra 6 paths. | Revisar diffs y hashes en 2/5. |
| C02 Replay | `replay/` desde `4d3ab0e…`: Content 43, All UI 20, API histórica 19; complete; `dirtySource=false`; niveles/nextLevel y bytes originales conservados. Response hashes coinciden con baseline. | Evidencia corregida lista. |
| C03 Compare | `node --test tests/agent-readiness/*.test.mjs`: 14/14. Permutación enabledChecks exacta → exit0/comparable; regla `future-rule/2`, score99 → exit2/`SCORING_CHANGED`/delta null; conserva validaciones de perfil, IDs, universo y denominador. | B01/B02 corregidos para 2/5. |
| C04 Transporte/schema/originales | Suite Node: HTTP 500, timeout, schema/oversize, un fetch y sin retry, redirects manuales, errores incompletos y baseline tamper bloqueado. Registro de join pre-fetch/rechazo pre-CreateProcess queda fuera del repo en `/workspace/ctpv-sdd-correcciones/rechazo-scan-content.md`; su resolución y autorización se verificaron en R1. | Revisión y límite de dos llamadas conservados. |
| C05 Dos scans LIVE | Capturas originales `medicion-35e…/live-content` y `live-all-ui`: una por perfil, HTTP 200, complete, 43/20, sourceCommit limpio `35e…`, `deploymentCommit=null`. No se alteraron ni repitieron después de R1. | Evidencia sin cambio; R1 ya la verificó. |
| C06 Inventory | Build explícito de `4d3ab0e…` exit0; `inventory` exit0/valid/errors[], 34 HTML/28 docs, home canonical `/` en sitemap. Nueva regresión de CLI rechaza build/output solapados exit3 sin crear directorio. | B03 corregido; revisar nuevo manifest. |
| C07 Identidad/paridad | Siete fixtures originales intactos; nuevo `parity-manifest.json` desde `4d3ab0e…`. Avisos/FAQ conservan el texto visible; scripts y ads no entran en warning/FAQ. Spike `926f3c0…` corrige la canonical del fixture fecal; su build regeneró índice/manifest P4. | B04/B05 corregidos; runtime de spike no se rerun tras ajuste P4-only. |
| C08 Worker-first/delegación | Patch final conserva el worker de `4d0863c…`; handler actual del adapter, allowlist, catálogo Assistant y preview workerd local. | R1 verificó comportamiento local; confirmar delta del patch final. |
| C09 Hook/empaquetado | Build positivo de spike final `926f3c0…` exit0. Build negativo hook exit1 y dry-run de 329 assets se ejecutaron sobre commits anteriores con hook/config intactos; evidencia marca el SHA exacto. Sin postbuild ni indexación. | Límite documentado; Workers Builds remoto no probado. |
| C10 Negociación/cache | La preview de 40 checks está ligada a runtime SHA `4d0863c…`: Accept, GET/HEAD, 400/406, 404, redirect, alternancias y ETags propios/cruzados. HTML estático sale desde ASSETS antes del middleware; no se afirma HIT/MISS de Cache API. CDN no verificado. | Evidencia local histórica más delta P4 identificado; CDN queda para F2. |
| C11 Decisiones | `decisiones.md` contiene las cinco propuestas con recomendación, alternativa, evidencia, límite y prueba requerida en F2. Ninguna está ratificada por el implementador. | Espera decisión del coordinador. |
| C12 CI/validación | Node tests 14/14, `npm test` 1/1, build/replay/inventory actuales pasan; dos pasos nuevos de CI son offline. R1 verificó sync/audit/check/build/types/package en worktree independiente, pero los checks remotos y equivalencia del tree son gate de root. | Local verificado; PASS definitivo requiere CI remoto/publicación equivalente. |

## Comandos de validación desde tooling corregido

```sh
node --test tests/agent-readiness/*.test.mjs
npm test
ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f0-config npm_config_cache=/tmp/ctpv-f0-npm-cache npx --no-install astro build
node scripts/agent-readiness/index.mjs replay --baseline-dir docs/agent-readiness/evidencia --out-dir /tmp/ctpv-f0-replay-final-4d3ab0e5df1e09e3b36115a305e639e87d5aea27
node scripts/agent-readiness/index.mjs inventory --build-dir dist --out-dir /tmp/ctpv-f0-inventory-final-4d3ab0e5df1e09e3b36115a305e639e87d5aea27
```

Los comandos y outputs completos del spike están en `spike-926f3c0e2929ac9ad6caaca8d16c88b301f446b7/`. No ejecutar más scans: Content y All UI ya consumieron los dos perfiles autorizados.

## Reversión

Si se cancela F0, revertir en grupo commits de tooling/fixtures/deps/CI y evidencia permanente. Los spikes son parches exploratorios adjuntos y nunca se aplicaron al runtime permanente. No hubo cambio de producción ni despliegue.
