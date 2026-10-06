# Auditoría independiente de implementación F0 — intento 1/5

**Veredicto: FAIL. Cinco bloqueantes de código/evidencia, reparables dentro del alcance.** No se modificaron implementación, fixtures, normativa ni ramas remotas. Las auditorías históricas de SDD, fix y reanudación no consumen este contador. No hay un bug de SDD ni un bloqueo de entorno nuevo.

Fecha: 2026-10-05 UTC. Auditor independiente: sesión `/root/auditoria_f0_implementacion`, distinta de la implementadora. Autoridad: issue #43 vigente y documentos normativos en la base exacta indicada abajo; encargo `instrucciones-auditoria-f0.md`.

## Versiones y aislamiento

- Base: `4dced4155788af926ef7b4e3d2d7e8259e1978be`.
- Entrega auditada, congelada: `c2bf4d689185ebf4464f562d5da025534878d31b`.
- Tooling limpio medido: `35e767647a05034baa3b4e371bee4f7a3849545d`; los archivos de tooling/tests/package/CI son idénticos a los de entrega.
- Commit posterior de evidencia: `6e1639e4f0ff662cc9752d0d8f69deb38a4decb5`.
- Spike: `4d0863c67e147027cf734e8333f978be5bcbe285`.
- Worktree independiente de entrega: `/workspace/ctpv-f0-audit-r1`, detached en c2bf, limpio al finalizar los checks.
- Worktree independiente del spike: `/workspace/ctpv-f0-audit-r1-spike`, detached en la base, con `spike.patch` aplicado tras `git apply --check`. Los seis archivos resultantes coinciden byte por byte con los hashes de `spike-manifest.json`.
- Node 24.19; Astro 7.2.10; adapter 14.2.6; Wrangler 4.128.0, instalados desde lockfile, sin upgrade.
- PR/checks remotos: publicación de la entrega aún coordinada por root al emitir este informe. C12 no tiene PASS definitivo. Esta espera no se cuenta como sexto bloqueante ni sustituye los cinco fallos reproducidos.

Se leyeron AGENTS, README/postmortem de migración, FILE-OWNERSHIP de Assistant V2, README/diagnóstico/arquitectura/plan/SDD del programa, los cuatro documentos F0 y el issue vigente. Se leyeron las skills de runtime y Wrangler antes de su CLI. La observación del entorno confirmó red enforced y ausencia de secrets/outbound identities. Los comandos que necesitan IPC/red local se ejecutaron con `additional_permissions.network.enabled=true`; no se alteraron credenciales ni configuración de zona.

## C01–C12

| ID | Resultado | Evidencia independiente y límites |
|---|---|---|
| C01 | PASS, verificado | Diff permanente dentro del ownership; solo dos devDependencies exactas, cambios de lock limitados a su declaración y dos pasos offline añadidos a CI. Normativa y producto no cambiaron. Hashes del H1 y layout coinciden con la base autorizada. Spike separado, seis paths declarados; integración y su verificador acompañante reproducibles en el patch. Ningún endpoint, MDX, redirect, estilo o Assistant V2 modificado. |
| C02 | PASS, verificado | Replay nuevo exit0: 43/20/19, niveles 1 originales, nextLevel y neutrales preservados; copia byte por byte de originales comprobada por tests y hashes. Metadata replay reconstruida con status/MIME null. |
| C03 | FAIL | Los casos entregados pasan, pero B01 y B02 contradicen el contrato de compare: orden del conjunto enabledChecks y regla desconocida. |
| C04 | PASS, verificado | Tests offline de HTTP500, timeout, schema, oversize, una llamada sin retry y redirect manual; incomplete/score null y metadata/hashes. Tamper de baseline bloqueado antes de resumen parcial; originales sin modificación. El fallo global de input de inventory se registra en C06/B03. |
| C05 | PASS, verificado por evidencia | Exactamente dos solicitudes reales autorizadas ya realizadas: content/all-ui, HTTP200, complete, 43/20. Request capturada con arrays explícitos, metadata y bytes originales hashados. sourceCommit=35e7676…, dirtySource=false; deploymentCommit=null. Revisados registro del fallo join previo a fetch y rechazo previo a CreateProcess, junto con su resolución/autorización; no equivalen a una caída real del evaluador ni a retry HTTP. El auditor no ejecutó scans. |
| C06 | FAIL parcial | Build e inventario independiente exit0, valid/errors[], assets resueltos dist/client, 34 HTML y 28 documents: 1 home, 7 pilares, 16 artículos, 2 tools, 2 editoriales; 4 discovery-only y 2 excluded. Filas y diferencias de sitemap idénticas a evidencia vigente; cuatro sitemap-only justificadas. Negativos de H1/canonical/duplicados/unclassified pasan. B03 incumple el rechazo contractual de output contenido en build. |
| C07 | FAIL | Fixtures originales y sus hashes íntegros; H1/FAQ/avisos clínicos y URLs completas presentes, dos layouts de pilar y negativo sin H1 probados. B04 contamina el manifest de expectativas editoriales con scripts/publicidad. B05 declara una ruta inexistente para el fixture de incontinencia en el spike. No se detectó una eliminación de las advertencias clínicas ni de las fuentes reales. |
| C08 | PASS, verificado | Patch aplicado en base exacta; entrypoint instalado @astrojs/cloudflare/handler, configuración compilada y allowlist fija. Preview workerd independiente 127.0.0.1:8793: home/Cushing y catálogo estático funcionan; redirects y rutas excluidas delegadas. SESSION y ASSETS locales; sin bindings remotos, AI remoto ni credenciales. |
| C09 | PASS, verificado | Build explícito con F0_FAIL_GENERATOR=1 exit1 desde astro:build:done/F0_GENERATOR_FAILURE. Build positivo posterior exit0. Dry-run compilado exit0 lee 329 assets, incluidos los dos MD e índice; sin postbuild ni indexación. |
| C10 | PASS, verificado con límite | Verificador del patch: 40/40 en workerd independiente; matriz Accept/specificity/q=0, GET/HEAD, 400/406, 404, 301/Location, ambas alternancias repetidas, Authorization ficticia, query, ETags propios/cruzados. 304 solo en misma representación; cruces 200. Headers de seguridad observados idénticos en HTML/MD. Cache de Assets usa paths separados; HTML estático retorna antes de middleware, por eso Cache API no se ejerció como HIT/MISS. CDN no verificado; el contrato P3 permite este límite y no exige fabricar un HIT. |
| C11 | PASS, verificado | Cinco propuestas con recomendación, alternativa, evidencia, límites y criterios para F2. El implementador no ratifica arquitectura. El coordinador conserva su decisión; samples=2 y selección=7, como exige F0. |
| C12 | NO VERIFICADO definitivo; local PASS | npm ci offline, sync, auditoría 7 specs, astro check (0 errors/0 warnings), npm test (1/1), suite F0 (13/13), build, inventory, replay, Worker types sin diff y packaging pasan independientemente. Workflow conserva pasos previos y añade solo tests/inventory offline. Checks remotos del PR y equivalencia de tree aún pendientes de root. No es causa adicional del FAIL actual; sigue siendo gate obligatorio antes de un futuro PASS. |

## Bloqueantes y corrección mínima

### B01 — compare trata el orden de enabledChecks como error de schema

Contrato: `f0-contratos.md` §4, «conjunto de enabledChecks (orden no relevante)»; C03.

Código: `scripts/agent-readiness/index.mjs:84`, JSON.stringify del array contra el orden congelado antes de alcanzar la comparación de conjuntos.

Reproducción: copiar el summary Content completo de replay entregado y crear otro idéntico con `enabledChecks.reverse()`. Ejecutar compare entre ambos.

Observado: exit3, `Envelope inválido: enabledChecks no coincide con el perfil congelado.`, sin comparison. Esperado: exit0, comparable=true, scoreDelta=0.

Corrección mínima: compare valida el conjunto exacto, sin duplicados, pero admite su orden distinto. Scan/replay siguen emitiendo el orden congelado. Añadir este negativo contractual sin flexibilizar perfiles.

### B02 — compare impone la fórmula local a scoringRuleId ajeno

Contrato: `f0-contratos.md` §4 permite otros identificadores no vacíos para detectar incompatibilidad; «Un ID de regla desconocida no autoriza recalcular sus scores»; C03.

Código: `scripts/agent-readiness/index.mjs:127`, validación incondicional de score mediante Math.round(pass/total).

Reproducción: summary Content original frente a una copia con `scoringRuleId="future-rule/2"` y `score=99`, conservando todos los demás campos y tipos válidos.

Observado: exit3, `un estado complete contiene datos incompletos o incoherentes`, sin comparison. Esperado: exit2, comparable=false, SCORING_CHANGED, scoreDelta=null; score99 conservado como dato de la otra regla. No procede aplicar la fórmula de pass-over-counted-round/1.

Corrección mínima: verificar aritmética solo cuando la regla es la conocida; conservar validaciones estructurales y detener el delta si cambia la regla. El test actual usa otra regla con score compatible con la fórmula vieja y no cubre este caso.

### B03 — input de inventory produce ReferenceError y exit incorrecto

Contrato: CLI §1, inputs/outputs no pueden coincidir; input/contrato inválido exit3. C06 y contrato global de CLI.

Reproducción desde entrega: `node scripts/agent-readiness/index.mjs inventory --build-dir dist --out-dir dist/audit-no-create`.

Observado: `isAbsolute is not defined`, exit1. No creó el output. `within()` llama isAbsolute sin importarlo. Esperado: rechazo controlado del input con exit3, sin modificar build ni crear output.

Corrección mínima: importar el helper de node:path y comprobar el caso descendiente. El test actual solo prueba build==out, que retorna antes de la llamada faltante.

### B04 — warningTexts contiene código ejecutable y publicidad como texto editorial

Contrato: T0.4 requiere expectativas del DOM renderizado revisadas contra contenido visible; P4 excluye ads/scripts; §9 define texto DOM editorial y excludedNodes. C07.

Reproducción: leer `medicion-35e7676…/parity/parity-manifest.json`, buscar en warningTexts/body de home y Cushing.

Observado: el aviso home «Señales para actuar sin demora» incluye `globalThis.process…`, funciones de geo y event listeners; el aviso Cushing «Señales de Alarma Médica Inmediata» incluye «Publicidad» y `atOptions = …`. `textWithout()` recorre los descendientes script y ads sin aplicar las exclusiones declaradas. Son expectativas falsas de paridad: el candidato que excluye correctamente esos nodos no puede conservar literalmente ese body normativo.

Corrección mínima: recoger texto visible con exclusiones DOM concretas de scripts/ads/widgets identificados, conservando avisos y FAQs cerradas completas. Mantener HTML original; regenerar manifest y sus hashes desde tooling limpio nuevo. No derivar expectativas del candidato ni añadir contenido editorial.

### B05 — el fixture del spike atribuye incontinencia a una ruta pública inexistente

Contrato: C07/P4, identidad/rutas verificables y manifest de fixtures con path del documento real.

Código: `scripts/f0-spike/content-build-integration.mjs:9`, path `/higiene-hogar-perros-senior/incontinencia-fecal-perros-mayores`, mientras html/fixture/inventory/canonical usan `/higiene-hogar-perros-senior/incontinencia-fecal-perros-senior`.

Reproducción: importar `F0_SPIKE_FIXTURES` y comparar la quinta ruta con el canonical de su HTML y el manifest permanente. El manifest del spike repite la ruta incorrecta.

Efecto: evidencia de selección adjudicada a una URL que no corresponde al documento seleccionado. Corrección mínima: corregir esa constante al canonical real; actualizar patch, SHA/manifests y evidencia afectada del spike, sin editar contenido ni ampliar muestras MD.

## Comandos y outputs independientes

Se usaron destinos nuevos; no se borró/reutilizó evidencia anterior. Todos los comandos Node/Git/build que requieren IPC se ejecutaron con los permisos mínimos autorizados.

Entrega, cwd `/workspace/ctpv-f0-audit-r1`:

```sh
npm ci --offline --no-audit --no-fund
npx --no-install astro sync
node scripts/audit-specs-migracion.mjs
npx --no-install astro check
npm test
node --test tests/agent-readiness/*.test.mjs
npx --no-install astro build
node scripts/agent-readiness/index.mjs replay --baseline-dir docs/agent-readiness/evidencia --out-dir /tmp/ctpv-f0-audit-r1-replay
node scripts/agent-readiness/index.mjs inventory --build-dir dist --out-dir /tmp/ctpv-f0-audit-r1-inventory
npx --no-install wrangler types --env-file wrangler-types.env --strict-vars=false
git diff --exit-code -- worker-configuration.d.ts
npx --no-install wrangler deploy --dry-run --config dist/server/wrangler.json --outdir /tmp/ctpv-f0-audit-r1-worker-dry-run
```

Build/CLI usan `ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f0-audit-config npm_config_cache=/tmp/ctpv-f0-npm-cache`. Logs: `/tmp/ctpv-f0-audit-r1-{tests,build,check,worker-types,worker-dry-run}.log`. `astro check` registró 45 hints; no se presentan como errors/warnings.

Spike, cwd `/workspace/ctpv-f0-audit-r1-spike`:

```sh
git apply --check /workspace/ctpv-f0/docs/agent-readiness/evidencia/f0/spike-4d0863c67e147027cf734e8333f978be5bcbe285/spike.patch
git apply /workspace/ctpv-f0/docs/agent-readiness/evidencia/f0/spike-4d0863c67e147027cf734e8333f978be5bcbe285/spike.patch
npm ci --offline --no-audit --no-fund
F0_FAIL_GENERATOR=1 npx --no-install astro build
F0_SOURCE_COMMIT=4d0863c67e147027cf734e8333f978be5bcbe285 npx --no-install astro build
npx --no-install wrangler deploy --dry-run --config dist/server/wrangler.json --outdir /tmp/ctpv-f0-audit-r1-spike-dry-run
npx --no-install wrangler dev --local --config dist/server/wrangler.json --ip 127.0.0.1 --port 8793 --persist-to /tmp/ctpv-f0-audit-r1-spike-state --show-interactive-dev-session=false
node scripts/f0-spike/verify-preview.mjs --origin http://127.0.0.1:8793 --out /tmp/ctpv-f0-audit-r1-spike-preview.json
```

Los mismos env vars anteriores precedieron cada npx. Logs: `/tmp/ctpv-f0-audit-r1-spike-{negative-build,build,dry-run,preview}.log`. Config compilada inspeccionada; no se utilizó la fuente para empaquetar/servir el entrypoint virtual.

Negativos B01/B02: archivos `/tmp/ctpv-f0-audit-r1-negativos/{good,enabled-order,scoring-other}.json`; compare devuelve 3 en ambos casos. B03 comando documentado arriba. B04/B05 se reproducen offline leyendo bytes entregados.

Se verificaron 32 entradas de manifests de evidencia general/spike contra bytes/tamaño/hash, sin errores. Las páginas del inventario reproducido son idénticas a las entregadas; el sourceDigest del nuevo build difiere por bytes de build y se registra sin exigir determinismo de HTML no contratado. El snapshot inválido anterior continúa rotulado HISTÓRICO/RESUELTO, no cuenta como C06 vigente.

## Disposición

Corregir exclusivamente B01–B05 en sesión implementadora; conservar scans originales y su sourceCommit observado, sin nuevas llamadas HTTP. Entregar nuevo SHA congelado, patch y evidencia afectada para revisión 2/5 con el mismo auditor. Registrar equivalencia remota y checks del PR antes de cualquier PASS definitivo. La ratificación arquitectónica, merge y despliegue permanecen fuera de esta auditoría.
