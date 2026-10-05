# Auditoría independiente de implementación F1 — revisión 1/5

**Veredicto: PASS. I01–I09 satisfechos; cero bloqueantes.**

Fecha: 2026-10-05. Issue [#50](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/50). Auditor: sesión independiente `auditoria_f0_implementacion`; el auditor no corrigió producto ni SDD. Este contador de implementación F1 es nuevo y termina esta revisión en **1/5**. SDD F1 conserva PASS 2/2 y F0 conserva PASS 3/5. **P01–P03 pendientes de promoción autorizada.** No se acredita publicación en producción ni puntuación nueva.

## Identidad, normativa y provenance

| Objeto | Identidad verificada |
|---|---|
| Base exacta normativa y de arranque | `0b7c0e127fc3beac099ff577a570db9c75d56441`, tree `e2622f5d73fdc8fa2d890480353197623a6ab9e2` |
| Entrega local congelada del implementador | `9c0e86f326a9df39b903e68a38ae7610d5eb936a` |
| Entrega publicada auditada | `28749e3e31d9d04adb32561af4e3da4e5870a9e4` |
| Árbol local/publicado idéntico | `4bec1493f49c0009b7499f48bd0cdcfe4affefa6` |
| Worktree propio detached | `/workspace/ctpv-f1-audit-r1`, HEAD `28749e3…`; Git limpio antes y después de verificar |
| Source medido por el implementador | `252e4df137492c6c74562480584acc8b7a09d811`, tree `dad7d9e54d744517bfdce5379cb73d4c23669a51` |
| PR y destino | [#51](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/51), draft/open, no merged; base `docs/agent-readiness-f1` en `0b7c0e…`, head `28749e3…` |
| Stack instalado sin upgrade | Node 24.19.0, npm 11.9.0, Astro 7.2.10, adapter 14.2.6, sitemap 3.7.4, Wrangler 4.128.0 |

Se leyeron AGENTS, SDD general y fase F1 completa, README/arquitectura/plan, cierre F0, informe SDD final, documentos de migración/postmortem/ownership Assistant, skill oficial Wrangler, `entrega.md` y `preview-config-diff.json`. El encargo de coordinación no se utilizó para añadir requisitos a la SDD. Se contrastó el diff, código real y dependencias instaladas con el lock existente.

Git confirma que entre `252e4df…` y la entrega auditada solo se añaden los dos documentos de evidencia F1: su código medido permanece idéntico. Los resultados originales conservan su sourceCommit verdadero; las pruebas de este auditor utilizan `28749e3…`. No se intercambian esas identidades ni se atribuye deploymentCommit. Las configuraciones compiladas incluyen paths del checkout, por lo que sus hashes pueden diferir entre worktrees; cada hash queda vinculado a su configuración real.

## Criterios

| ID | Resultado | Comprobación independiente |
|---|---|---|
| I01 | PASS | Diff de once rutas: nueve de producto/tooling autorizadas y dos de evidencia. Package/lock, wrangler fuente, tipos Worker, rutas/contenido/layout, Assistant, contratos y evidencia F0 sin cambio. Base/trees/Git limpio verificados; el worktree del implementador no se modificó. |
| I02 | PASS | Suite 20/20, incluidos orden ASCII, escaping Markdown, español/URLs, faltantes, canonical inválido, tamaño UTF-8 y determinismo. Regeneración desde inventario real y con orden de páginas invertido produce bytes idénticos. Las entradas y descripciones vienen del HTML, con política y límite veterinario; no se anuncian capacidades futuras. |
| I03 | PASS | Inventario real valid: 34 HTML/28 documentos/0 errores. Fixture independiente derivada de assets reales admite artículo+catálogo+sitemap concordantes y 29 documentos. Faltantes de home/pilar/artículo/herramienta/editorial y UNCLASSIFIED devuelven 3. Un caso con 28 documentos pero editorial ausente y pilar duplicado devuelve 3 con DOCUMENT_ID_COLLISION, CANONICAL_DUPLICATE y CATALOG_MISMATCH: no acepta una suma compensada. Tests F0 conservados. |
| I04 | PASS | Dos builds Astro completos producen llms dentro de `dist/client`, ASSETS del config compilado. Ambos logs muestran sitemap antes del generador. llms 3516 bytes, SHA256 idéntico y `cmp` exit0; robots y sitemap presentes. Escritura exclusiva, sin source manual de llms ni campos técnicos/fecha en el recurso. |
| I05 | PASS | Test entregado ejercita hook real sin sitemap. Reproducción adicional en fixture independiente de assets reales elimina una editorial: proceso que llama al hook real termina 1, no escribe llms y no deja scratch. Con un llms preexistente, el hook termina 1/EEXIST y conserva sus bytes. No se añadieron flags de fallo a producción. |
| I06 | PASS | CLI real `check --build-dir`:0 válido;3 bytes alterados;1 archivo ausente;3 subcomando/valor/flags desconocidos o repetidos inválidos. El caso válido conserva bytes y mtime de llms. Se verifican robots y headers construidos contra fuente y contrato. El paso offline de CI aparece inmediatamente después de inventory/build y pasó en CI. |
| I07 | PASS | Workerd real del bundle propio, copia del config compilado con SESSION/ASSETS exclusivamente locales y sin AI/remotos.25casos HTTP finales PASS: home GET/HEAD y Accept Markdown conservando HTML; robots/llms GET/HEAD con MIME/body/Link/seguridad; query llms sin cambio;11 destinos GET 200; sitemap 200; geo GET con ES y caché privada; probe 404, 404 aleatorio y legacy 301. Proceso cerrado y puerto libre comprobado. |
| I08 | PASS | Independiente: astro sync/check 0 errores/0 warnings (45 hints existentes), npm test 1/1, agent-readiness 20/20, dos builds, inventory/check, tipos Worker sin diff y dry-run del config compilado. GitHub CI y Workers Builds completed/success sobre el HEAD exacto 28749e3, no sobre antecesores. |
| I09 | PASS | PR draft/base/head verificados por API; entrega contiene criterios, provenance, hashes, reproducción y rollback. Historia append-only permite retirar discovery conservando policy. Esta auditoría independiente PASS 1/5 cierra aceptación técnica; no ejecuta scans ni declara producción/CDN. |
| P01 | Pendiente | Requiere aprobación separada de promoción e identificación/verificación pública del despliegue. |
| P02 | Pendiente | Requiere P01; no se consumió ninguna solicitud pública de scan durante esta auditoría. |
| P03 | Pendiente | Requiere medición real P02; no se atribuyen score ni nivel previstos. |

## Headers y preview

El GET `/api/geo` con `cf-ipcountry: ES` produjo status 200, JSON `{"country":"ES"}`, MIME application/json, `Cache-Control: private, max-age=3600`, Link exacto y los cuatro headers de seguridad. Acredita el middleware dinámico real; los 404 se registran como regresiones separadas. No se exige HEAD de geo. Sin header explícito, el runtime local puede proporcionar country en request.cf; ese caso adicional no se utiliza como prueba de geolocalización pública.

Además se importó **el módulo middleware compilado real**, sin reemplazar handler o runtime, para cuatro respuestas con Link ausente, ajeno, existente o combinado. Conserva otros Link, añade el discovery una sola vez y preserva body/status, Cache-Control, Vary y ETag. Es una prueba aislada del middleware compilado, distinta de las solicitudes workerd.

La copia local `/tmp/ctpv-f1-audit-r1-preview.json` mantiene compatibilidad, flags, ASSETS y `run_worker_first` `/api/*`, `/admin/*`, con main/assets absolutos al build propio. Se quitaron AI, EMAIL, CONTACT_DB, ASK_LIMIT, ADMIN_LIMIT, CONTACT_KV, servicios y rutas/triggers de deploy; SESSION quedó únicamente con binding local, sin IDs ni remote. Se comprobó ausencia de bindings inesperados o remote:true; observability se apagó solo en la copia. Wrangler anunció únicamente SESSION y ASSETS en modo local. No hubo auth, API con efectos, escrituras a recursos reales, `--remote`, shim ni identidad inventada.

La primera pasada del script HTTP del auditor asumió UNKNOWN sin header, pero Miniflare proporcionó US en request.cf. Se corrigió esa expectativa del script de auditoría, sin cambio de producto; el caso obligatorio ES ya pasaba. La pasada final de25solicitudes pasó completa. Los headers de caché local no se presentan como prueba CDN.

## CI del HEAD congelado

Verificado por connector de runs/jobs/pasos y por GET público al endpoint GitHub `/commits/28749e3e31d9d04adb32561af4e3da4e5870a9e4/check-runs`:

- [CI run 37372045523/job 111971352731](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/37372045523/job/111971352731):completed/success; todos los pasos success, incluidos inventory, discovery, tipos Worker y empaquetado.
- [Workers Builds 111971558055](https://github.com/Gunz-cop/CuidaTuPerroViejo/runs/111971558055):completed/success.

Ambos check-runs tienen `head_sha=28749e3e31d9d04adb32561af4e3da4e5870a9e4`. La cola inicial se trató como espera; no se tomó CI de un antecesor como sustituto.

## Rollback y ownership

La reparación histórica permanece append-only:

1. `fb6f780…` contenía el cambio inicial mixto; su revert `f1d2d6f600883d6b2c9c9c08126015f4478fb102` devuelve el tree base `e2622f5…`.
2. `644f50225e2f00969bf70fa499e566153668d497` cambia únicamente `public/robots.txt`, tree `671a95f2e89f77442955541df23bd4d080013fb7`.
3. `dc304c73044fd19976f98300334f75739ba2a8ea` tiene a ese commit de policy como padre y añade las otras ocho rutas de implementación, tree `dad7d9e5…`.
4. `28749e3…` añade los dos documentos de evidencia.

El patch discovery admite `git apply --reverse --check` sobre la entrega auditada. Revertir discovery restaura su padre policy sin retirar robots; la evidencia documental posterior permanece histórica. No se ejecutó el revert ni se utilizó reset/force. Promoción y rollback en main siguen requiriendo su autorización propia.

## Artefactos, comandos y hashes

Evidencia independiente durable: `/workspace/ctpv-sdd-correcciones/f1-auditoria-r1-evidencia/`. Su `manifest.json` enumera 16 archivos con scripts de reproducción, 19 comprobaciones adicionales de riesgo, 25 respuestas HTTP, 4 casos middleware, logs y prueba de checks remotos; las pruebas del producto son además 20/20. Los logs CLI preservados tienen IDs de recursos redactados, sin credenciales ni dumps de entorno/config original.

| Artefacto | SHA256 |
|---|---|
| llms de ambos builds y GET workerd | `aab7bc91ce8f5229579f403443403eb2f3850397eee4741eaf53dec2b3a1133e` |
| Robots fuente y construido | `1804644940a3594aa6b1b52db1b5905a995c7364fbc7174b0909b9fa8e1511f5` |
| Config compilado del worktree auditor | `83cf4a73e83b3a04d7d5c9583eae7ffda86051adb00d677361c86f1145072862` |
| Copia local aislada del auditor | `40efb59dd757ec4be03fef3fdd2c58577daa8821d7bccbe034fafbb88a95d588` |
| Manifest final de evidencia independiente | `c3fa3400c5b1e3237069c73ff613012c8c62750527a613e46641f55c178f309b` |

Secuencia principal ejecutada en el worktree detached; permisos mínimos adicionales de red/IPC cuando los necesitó el sandbox, `ASTRO_TELEMETRY_DISABLED=1`, `XDG_CONFIG_HOME=/tmp/ctpv-f1-audit-config`:

```sh
npm ci --offline --no-audit --no-fund --cache /tmp/ctpv-f0-npm-cache
npx --no-install astro sync
npx --no-install astro check
npm test
node --test tests/agent-readiness/*.test.mjs
npx --no-install astro build
node /tmp/ctpv-f1-audit-r1-risk.mjs
npx --no-install astro build
cmp /tmp/ctpv-f1-audit-r1-build1-llms.txt dist/client/llms.txt
node scripts/agent-readiness/index.mjs inventory --build-dir dist --out-dir /tmp/ctpv-f1-audit-r1-inventory
node scripts/agent-readiness/discovery.mjs check --build-dir dist
npx --no-install wrangler types --env-file wrangler-types.env --strict-vars=false
git diff --exit-code -- worker-configuration.d.ts
npx --no-install wrangler deploy --dry-run --config dist/server/wrangler.json --outdir /tmp/ctpv-f1-audit-r1-package
npx --no-install wrangler dev --local --config /tmp/ctpv-f1-audit-r1-preview.json --port 8794 --ip 127.0.0.1
node /tmp/ctpv-f1-audit-r1-http.mjs
git status --short
```

La instalación inicial con sandbox por defecto encontró EPERM al validar esbuild; con los permisos mínimos autorizados terminó correctamente, 469 paquetes, sin cambiar lock. No se usó ese error de permisos como defecto de la SDD o del producto. Se consultaron la skill Wrangler oficial, documentación vigente de comandos/desarrollo local y help del Wrangler fijado; no se actualizó SDK.

**Lista de bloqueantes cerrada: ninguno.** Implementación F1 aceptada técnicamente sobre la identidad indicada, revisión 1/5. Solo se crearon worktree y artefactos de auditoría propios; no se corrigieron código/spec ni se escribieron ramas remotas. No hubo scans, merge o deploy; `deploy --dry-run` solo empaquetó. La aceptación no autoriza promoción ni convierte P01–P03 en PASS.
