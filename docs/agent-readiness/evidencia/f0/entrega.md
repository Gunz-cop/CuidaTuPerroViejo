# Entrega de implementación F0 para auditoría

Estado: preparada para la primera auditoría independiente (1/5). Esta entrega no marca la fase aceptada. El coordinador conserva la autoridad para ratificar las cinco decisiones y publicar el conjunto.

## SHAs y publicación

- Base exacta de arranque: `4dced4155788af926ef7b4e3d2d7e8259e1978be`.
- Tooling limpio medido: `35e767647a05034baa3b4e371bee4f7a3849545d`.
- Evidence-only commit previo: `6e1639e4f0ff662cc9752d0d8f69deb38a4decb5`.
- Spike patch aislado: `4d0863c67e147027cf734e8333f978be5bcbe285`; base verificada `4dced4155788af926ef7b4e3d2d7e8259e1978be`.
- Destino de PR: `docs/f0-reanudacion-canonical`; la publicación GitHub por Contents API y la comprobación de equivalencia remota las coordina root. No se hizo push directo, merge ni deploy. El SHA de entrega final lo fijará el coordinador al cerrar esta serie documental.

El `sourceCommit` de replay, inventory y ambos perfiles live sigue siendo el tooling limpio `35e7676…`; la medición live obtuvo `deploymentCommit=null`. La evidencia LIVE observó el sitio público el 2026-10-05. No valida el build local ni los PRs todavía no integrados. El commit posterior de evidencia/documentación no sustituye al sourceCommit registrado.

La carpeta `bloqueo-c06-home/` conserva el snapshot de la base previa a resolver #45; su nota está rotulada HISTÓRICO/RESUELTO y no es el resultado actual. El inventario vigente está en `medicion-35e767647a05034baa3b4e371bee4f7a3849545d/inventory/`.

## Matriz C01–C12: evidencia entregada, pendiente de auditor

| Criterio | Evidencia y comandos/resultados | Estado para revisión |
|---|---|---|
| C01 Base y ownership | Tooling de `35e7676…`; spike patch de base `4dced415…` con seis paths experimentales; `git apply --check spike.patch` pasó en el checkout permanente sin aplicar el patch. Dos correcciones de producto ya vienen de la base aprobada. | Evidencia lista; auditor debe revisar paths/diffs. |
| C02 Replay 43/20/19 | `node scripts/agent-readiness/index.mjs replay --baseline-dir docs/agent-readiness/evidencia --out-dir /tmp/ctpv-f0-replay-final-35e767647a05034baa3b4e371bee4f7a3849545d`; exit 0; Content 43, All UI 20, API sin configurar 19; estados completos, niveles/nextLevel y bytes originales conservados; dirtySource false. | Evidencia lista; auditor debe comprobar envelopes/hashes. |
| C03 Comparación | `node --test tests/agent-readiness/*.test.mjs`; 13/13. Casos perfil/universo/IDs incompatibles, drift, fail→pass, neutral→pass, regla de score desconocida/malformada y redondeo 1/8→13. | Evidencia lista; auditor debe revisar negativos. |
| C04 Transporte/schema/originales | Mismo Node test suite: timeout/schema/oversize/HTTP/error metadata, un fetch sin retry, redirects manuales, validación baseline previa a escritura parcial, raw bytes y tamper hashes. Rechazo pre-fetch inicial conservado fuera del repo en `/workspace/ctpv-sdd-correcciones/rechazo-scan-content.md`. | Evidencia lista; auditor debe confirmar el reporte previo no es una llamada enviada. |
| C05 Dos scans reales | `node --use-env-proxy scripts/agent-readiness/index.mjs scan --url https://cuidatuperroviejo.com --profile content --out-dir /tmp/ctpv-f0-live-content-35e767647a05034baa3b4e371bee4f7a3849545d` y mismo CLI con `--profile all-ui --out-dir /tmp/ctpv-f0-live-all-ui-35e767647a05034baa3b4e371bee4f7a3849545d`; una petición por perfil, HTTP 200, complete; 43 y 20. `dirtySource=false`; `deploymentCommit=null`. Outputs/hash manifests preservados. | Evidencia lista; auditor independiente debe validar autorización, request y respuesta. Límite de dos llamadas agotado. |
| C06 Inventario | `ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f0-config npm_config_cache=/tmp/ctpv-f0-npm-cache npx --no-install astro build`; exit 0. Luego `node scripts/agent-readiness/index.mjs inventory --build-dir dist --out-dir /tmp/ctpv-f0-inventory-final-35e767647a05034baa3b4e371bee4f7a3849545d`; valid/errors[], `dist/client`, 34 HTML/28 docs, home canonical `/` en sitemap. | Evidencia lista; aceptación sujeta a inspección del inventario completo. |
| C07 IDs y paridad | Siete fixtures HTML y `parity/parity-manifest.json`; H1, headings, avisos, FAQ completas, URLs de fuentes y exclusiones. Negativo sintético sin H1 y negativos de inventario en suite. | Evidencia lista; revisión editorial/contractual pendiente. |
| C08 Worker-first/delegación | Spike exacto; handler `@astrojs/cloudflare/handler`, allowlist, static assistant catalog, worker diagnostic local; preview workerd reporta 40/40 checks. | Evidencia lista; limitada a entorno local sin CDN. |
| C09 Hook/empaquetado | Build explícito positivo en spike, artefactos hashados; dry-run de config compilada; build negativo intencional exit 1 en `astro:build:done`, sin notificación. | Evidencia lista; Workers Builds de cuenta no probado. |
| C10 Negociación/HEAD/404/cache | Preview local 40 checks: q/MIME/Vary, GET/HEAD, legacy redirect, 404, alternancias, ETags propios/cruzados. HTML estático retorna desde ASSETS antes del middleware: la Cache API no tuvo un HIT/MISS de runtime en estas rutas. `edgeCache=null`; CDN no verificado. | Evidencia lista; limitar afirmación a workerd local. |
| C11 Cinco decisiones | `decisiones.md`, propuestas no ratificadas, cada una con evidencia, alternativa, límite y criterio para F2. | Propuesta entregada; root debe ratificar. |
| C12 CI y efectos | `node scripts/audit-specs-migracion.mjs` exit0 (7 specs); `astro sync` exit0; `astro check` exit0 (0 errores/advertencias); `npm test` 1/1; Node tests 13/13; build/inventory/replay pasan. CI incorpora únicamente dos pasos offline. | Evidencia lista; auditor debe validar diff y comandos. |

## Lista de comandos finales desde tooling SHA

```sh
ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f0-config npm_config_cache=/tmp/ctpv-f0-npm-cache npx --no-install astro sync
node scripts/audit-specs-migracion.mjs
ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f0-config npm_config_cache=/tmp/ctpv-f0-npm-cache npx --no-install astro check
npm test
node --test tests/agent-readiness/*.test.mjs
ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f0-config npm_config_cache=/tmp/ctpv-f0-npm-cache npx --no-install astro build
node scripts/agent-readiness/index.mjs replay --baseline-dir docs/agent-readiness/evidencia --out-dir /tmp/ctpv-f0-replay-final-35e767647a05034baa3b4e371bee4f7a3849545d
node scripts/agent-readiness/index.mjs inventory --build-dir dist --out-dir /tmp/ctpv-f0-inventory-final-35e767647a05034baa3b4e371bee4f7a3849545d
```

Para el spike, los comandos explícitos y resultados están en `spike-4d0863c67e147027cf734e8333f978be5bcbe285/spike.md`. No reejecutar scans: ambas llamadas autorizadas ya se consumieron.

## Reversión

Revertir en grupo los commits de harness, inventario/fixtures/deps/CI y evidencia permanente si se decide cancelar F0. El patch aislado se conserva como evidencia y no requiere revert de runtime porque no fue aplicado al producto. No se han cambiado producción ni deploy.
