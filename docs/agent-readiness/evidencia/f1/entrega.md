# Entrega de implementación F1

Issue: [#50](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/50). PR draft: [#51](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/51), destino `docs/agent-readiness-f1`. Esta entrega acredita implementación local; no afirma promoción ni mediciones públicas.

## Identidad y procedencia

| Objeto | SHA | Tree | Estado |
|---|---|---|---|
| Base de arranque auditada | `0b7c0e127fc3beac099ff577a570db9c75d56441` | `e2622f5d73fdc8fa2d890480353197623a6ab9e2` | SHA exacto fijado por el issue |
| Source usado en las mediciones finales | `252e4df137492c6c74562480584acc8b7a09d811` | `dad7d9e54d744517bfdce5379cb73d4c23669a51` | `dirtySource=false`, comprobado con Git real |
| Entrega local final | `dee1b1f4712b3776111cb494348ed68e37ee026f` | `dad7d9e54d744517bfdce5379cb73d4c23669a51` | tree idéntico al source medido |
| Source inicial publicado | `fb6f7801260f3327b6657c1d88e5961e106e9315` | `dad7d9e54d744517bfdce5379cb73d4c23669a51` | Equivalente GitHub verificado; primer commit de implementación antes de separar rollback |
| B — revert append-only de ese commit | local `b509af905923cdee5009ba0c51538273c03b3830`; remoto `f1d2d6f600883d6b2c9c9c08126015f4478fb102` | `e2622f5d73fdc8fa2d890480353197623a6ab9e2` | Restituye el tree de base |
| C — política robots independiente | local `f78873717e3d16cda7c386e3307a631adfb16bc4`; remoto `644f50225e2f00969bf70fa499e566153668d497` | `671a95f2e89f77442955541df23bd4d080013fb7` | Solo `public/robots.txt` frente a base |
| D — descubrimiento independiente | local `dee1b1f4712b3776111cb494348ed68e37ee026f`; remoto `dc304c73044fd19976f98300334f75739ba2a8ea` | `dad7d9e54d744517bfdce5379cb73d4c23669a51` | Tree final; D revierte limpiamente a C |

La historia es append-only: se conserva el commit inicial publicado y se neutraliza con B, luego C entrega la preferencia y D entrega descubrimiento. El ref del PR se actualizará en un solo fast-forward con el tree D y esta evidencia. Los resultados de runtime se ejecutaron realmente con source `252e4df`; el tree final D coincide byte por byte, verificado por Git. No se reemplazó `sourceCommit` con un alias.

El rollback solicitado queda probado por topología: el padre de D es C; `git revert D` deja exactamente tree `671a95f2…`, que contiene únicamente la política F1 sobre la base. La política se puede retirar aparte revirtiendo C. Ningún reset o force-push forma parte de esta secuencia.

El diff final de base a D toca solo nueve rutas autorizadas: `public/robots.txt`, `public/_headers`, `src/middleware.ts`, `astro.config.mjs`, `scripts/agent-readiness/{discovery,inventory}.mjs`, `tests/agent-readiness/{discovery,inventory}.test.mjs` y `.github/workflows/ci.yml`. `package.json`, lockfile, `wrangler.jsonc`, tipos Worker, layout, rutas, MDX y Assistant quedan fuera del diff.

## Resultado local

La política robots usa exactamente `search=yes, ai-input=yes, ai-train=no`. El módulo `discovery.mjs` serializa `/llms.txt` desde el inventario del HTML construido, limita el artefacto a 64 KiB y rechaza entradas sin H1/description/canonical válido. La integración se ejecuta después de sitemap, escribe exclusivamente en el asset root y falla el build ante errores. El CLI `check --build-dir` valida bytes, robots y reglas fuente de Link/MIME sin reescribir assets. El inventario comprueba IDs y canonical paths esperados; permite crecimiento concordante del catálogo. Middleware conserva los Link existentes y añade `describedby` una sola vez junto con los cuatro headers de seguridad actuales.

## Validación y evidencia

Todas las mediciones siguientes usan el commit limpio `252e4df…`; D comparte exactamente el mismo tree. Se guardaron resúmenes y hashes, no logs con IDs de recursos ni dumps de configuración original.

| Comprobación | Resultado |
|---|---|
| `npm ci --offline --no-audit --no-fund` con lock existente | PASS, 469 paquetes; Node `v24.19.0`, npm `11.9.0` |
| `npx --no-install astro sync` y `astro check` | PASS; 0 errores, 0 warnings, 45 hints existentes |
| `npm test` | PASS, 1/1 |
| `node --test tests/agent-readiness/*.test.mjs` | PASS, 20/20 |
| Tests del generador | Orden ASCII, escaping Markdown, español/URLs, descripción y canonical inválidos, tamaño, determinismo, check válido/no válido y hook fallido sin sitemap; scratch eliminado y sin `llms.txt` parcial |
| Growth del inventario | PASS: 28 y 29 documentos válidos; fallan faltantes de home/pilar/artículo/herramienta/editorial, ID/canonical duplicados y rutas sin clasificación |
| Dos `astro build` limpios | PASS; hook informa generación después de `sitemap-index.xml`, 3,516 bytes ambos builds, SHA-256 idéntico `aab7bc91ce8f5229579f403443403eb2f3850397eee4741eaf53dec2b3a1133e` |
| Inventory real | PASS, sourceCommit `252e4df…`, `state=valid`, 0 errores, 34 HTML/28 documentos. Cuatro rutas sitemap-only son las exclusiones discovery-only justificadas existentes (`/asistente-ia`, `/contacto`, `/politica-de-cookies`, `/politica-de-privacidad`). |
| CLI `discovery.mjs check --build-dir dist` | PASS; mismo contenido byte por byte; también se probaron llms alterado/ausente, flags adicionales y que check no modifica assets |
| `wrangler types --env-file wrangler-types.env --strict-vars=false` + comparación | PASS, sin diff en `worker-configuration.d.ts` |
| Wrangler dry-run con config compilada | PASS: `npx --no-install wrangler deploy --dry-run --config dist/server/wrangler.json --outdir /tmp/ctpv-f1-package-252e4df-final`; Wrangler `4.128.0`, bundle 671.18 KiB (164.93 KiB gzip), sin upload |
| Preview workerd local | PASS, detalles abajo; proceso local cerrado y ausencia de proceso comprobada |
| Git source durante evidencia | `git status --porcelain=v1` vacío; `dirtySource=false` |

Preview se inició con `wrangler dev --local` sobre la **configuración compilada** `dist/server/wrangler.json`. Una copia temporal quitó `AI`, `EMAIL`, D1, rate limits y `CONTACT_KV`; dejó únicamente `SESSION` local sin id/preview_id/remote; mantuvo el main/assets como paths absolutos al bundle real, `run_worker_first` `/api/*` y `/admin/*`, compatibilidad y flags; apagó observability solo para esta copia. Ver [preview-config-diff.json](preview-config-diff.json): incluye hashes de ambas configuraciones, versión y diff sanitizado; no hay `remote:true`, servicios remotos ni rutas de deploy en la copia. La ruta temporal fue `/tmp/ctpv-f1-preview-wrangler-final.json`.

Las solicitudes locales verificadas devolvieron: home GET/HEAD 200; robots y llms GET/HEAD 200, MIME `text/plain; charset=utf-8`, body HEAD vacío y Link/seguridad; los 11 destinos del llms GET 200; sitemap 200. GET `/api/geo` con `cf-ipcountry: ES` devolvió `200`, `{"country":"ES"}`, `application/json`, `Cache-Control: private, max-age=3600`, Link y los cuatro headers de seguridad. La probe inventada `/api/agent-readiness-f1-probe` mantuvo 404 y se registró separada del middleware dinámico; una ruta aleatoria también dio 404; `/p/acerca-de.html` mantuvo 301 a `/acerca-de`. No se usó `--remote`, autenticación, APIs con efectos ni servicios reales.

Checksums principales:

| Artefacto | SHA-256 |
|---|---|
| `public/robots.txt` y `dist/client/robots.txt` | `1804644940a3594aa6b1b52db1b5905a995c7364fbc7174b0909b9fa8e1511f5` |
| `dist/client/llms.txt` | `aab7bc91ce8f5229579f403443403eb2f3850397eee4741eaf53dec2b3a1133e` |
| `dist/server/wrangler.json` compilado | `952f31ddee6c111afd0373832c5e967aefa96cbf6f2ecee6f0a42dd823d32de1` |
| Configuración workerd local aislada | `9473ebb5e15f86ff7c16e0ede7b93f100d815956fbece2fa88e78f09a3b3513d` |

## Criterios

| Criterio | Estado |
|---|---|
| I01 | PASS local: base y ownership exactos; stack, bindings, dependencias y lock sin cambio |
| I02 | PASS |
| I03 | PASS |
| I04 | PASS |
| I05 | PASS |
| I06 | PASS |
| I07 | PASS en workerd local sobre el bundle compilado |
| I08 | PASS local para check/tests/build/inventory/CLI/types/dry-run. CI de GitHub y Workers Builds deben confirmarse sobre el último HEAD remoto después de publicar este documento. |
| I09 | En curso: PR #51 draft abierto; falta auditoría independiente PASS sobre SHA fijo dentro del máximo de cinco revisiones. No se ejecutaron scans públicos ni se afirma promoción. |
| P01 | Pendiente de promoción autorizada |
| P02 | Pendiente de promoción y P01; no se ejecutaron scans |
| P03 | Pendiente de P02; no se atribuye puntuación ni nivel |

## Reversión

- Revertir el commit D `dee1b1f…` retira generador, headers de middleware, integración, evolución del inventario y check CI en conjunto; el tree resultante es C `671a95f…` y preserva la preferencia robots aprobada.
- Revertir C `f788737…` por separado retira la política si se solicita expresamente.
- Conservar A y su revert B en el historial. La promoción a `main` requiere autorización separada.

Referencias Wrangler consultadas para esta verificación: [Wrangler commands index](https://developers.cloudflare.com/workers/wrangler/commands/index.md) y [Workers local development](https://developers.cloudflare.com/workers/local-development/). Los flags usados también se contrastaron con `wrangler dev --help` y `wrangler deploy --help` del Wrangler fijado 4.128.0. La referencia antigua directa a las páginas de `dev`/`deploy` devolvió 404; el índice vigente y el help local dieron los comandos aplicables.
