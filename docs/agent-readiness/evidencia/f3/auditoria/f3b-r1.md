# Auditoría independiente F3B — R1/5

Fecha: 2026-10-11. Dictamen: **PASS del alcance F3B, cero bloqueantes**. Issue [#75](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/75), PR draft [#76](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/76), destino `agent-ready/f3-a`. Contador B: **1/5**, mismo auditor fijo para futuras revisiones; esta primera revisión consume un intento. Quinta FAIL exigiría bug/STOP sin sexta revisión ni reset.

Auditor independiente: `/root/f3b_auditor`, GPT-6.1 Sol/high, distinto del autor/corrector `/root`. La excepción de autoría directa del coordinador por petición explícita del usuario está registrada en issue y entrega; no se atribuye esta implementación a Luna. El auditor no corrige implementación ni contratos. Informe propio, sin commit.

## Snapshot, admisión y ownership

| Identidad | Valor |
|---|---|
| Entrega fija examinada | `e1c971fbfe8770c0da27ef38fbeed788470f53d6` |
| Tree de entrega | `22a55b9b3955e3f1b63e18ebb794d48ceea7e6cb` |
| Base aceptada de B | `ce6c491757a165b22973a7bf717fd0d6ed069ac8` |
| Tree base B | `51521631e0e0dc235d46a128b8c7af36bc2fd8c3` |
| Snapshot normativo SDD ratificado | `6dbaf2c97d81dd6433dd7d1f75e0a8d8943bea92` |
| Tree normativo | `ae19b2be649711aa5ebeb405eb8e3eebd09c1ef2` |
| Worktree auditor detached | `/workspace/f3-b-audit` |
| Evidencia original del autor | `/workspace/f3b-evidence` |
| Evidencia propia del auditor | `/workspace/f3b-audit-r1-evidence` |

SHA/tree comprobados con Git. Se leyeron AGENTS, método SDD, SDD F3, contratos, traspaso, ratificación PASS R2/2, auditoría A PASS R2/5, cierre arquitectónico A y entrega B. Los estados históricos de propuesta se interpretan conforme a sus cierres archivados. A es una dependencia aceptada; no se reauditan sus contratos o generadores.

El diff frente a la base contiene exactamente los seis archivos declarados: `src/lib/agent-api/runtime.ts`, composición limitada `src/worker.ts`, `tests/agent-readiness/f3-runtime.test.ts`, el único paso CI runtime nuevo, `evidencia/f3/b/entrega.md` y `verificar-workerd.mjs`. Sin delta en contratos/anexos, generador A, schema/OpenAPI/capabilities, runtime/proyección F2, contenido editorial, configuración del stack o discovery C. El Worker nuevo sólo intercepta `/api/agent/v1` y descendientes y compone antes del handler F2 existente.

## Criterios B y evidencia

Los identificadores siguientes corresponden a la tabla normativa de la SDD F3 §6; catálogo/ranking/lectura se verifican también contra contratos §1–4.

| Criterio | Dictamen y sustento |
|---|---|
| C3-05 | **PASS**: catálogo conserva entradas F2 completas y orden ASCII; filtro antes de página, defaults, límites y offset vacío. Search exige AND y usa pesos 8/3/1 por token distinto, empate ASCII y página posterior al ranking. Guard de corpus y errores/precedencia pasan en fixtures y workerd propio. |
| C3-06 | **PASS**: los 28 IDs reales devuelven metadata exacta, Markdown completo byteidéntico, markdownBytes/SHA256 coincidentes y links del artifact A. Todos se verifican GET/HEAD en workerd propio; nunca acepta path/URL arbitrario. |
| C3-07 | **PASS**: búsquedas CÚSHING, ARTROSIS, consulta AND, repetición y ausencia de resultados contrastadas con oráculo propio sobre arrays estáticos A. Fixture declarada encuentra términos, aviso final y fuente después de 4000 caracteres; no importa helpers de producción para generar expectativas. |
| C3-08 | **PASS**: validación strict percent/UTF-8, keys cerradas/duplicadas, controles, enteros, query raw, q tras NFC/trim y tokenización. GET/HEAD parity, OPTIONS sin datos/query/membership, 405/Allow, errores cerrados, CORS/no-store/Link/seguridad, ausencia de cookies/auth/reflejo y condicionales ignorados. Pruebas inclusivas/+1 de 2048 bytes raw, 200 codepoints q, 12 tokens, token64, índice512 KiB, query-index8 MiB, Markdown512 KiB y JSON2 MiB pasan. |
| C3-10, parte B | **PASS**: consumo ASSETS-only sin headers/query/auth externos; validador/cache F2 reutilizados intactos, schema/invariantes query-index, stream acotado, hash y UTF-8 fatal. Corrupción/falta/exceso→503, recuperación en mismo binding y aislamiento entre bindings pasan; sólo éxitos de índices se conservan y documentos no se cachean. CI conserva los pasos existentes. Build real del SHA entregado y lectura negociada F2 home representativa pasan, sin matriz histórica remota. |
| C3-11, parte B | **PASS de auditoría**: base/entrega fijas, PR draft contra integración, ownership acotado, evidencia original/propia y recibo CI/preview ligados al SHA completo. Auditor independiente y contador 1/5. Aceptación arquitectónica/cierre concreto corresponden al coordinador. |

**Lista de bloqueantes: vacía.** No se reinterpreta ni modifica el contrato para emitir PASS.

## Reproducción independiente

Node v24.19.0. XDG task-specific definido antes de npm/Astro; proxy y CA heredados. Se concedieron permisos de ejecución acotados de red/IPC y escrituras en worktree/evidencia propias y `/tmp`; no hubo rechazo de aprobación ni escalación a main/deploy. La primera instalación sin permiso de red quedó interrumpida y dos invocaciones prematuras sin dependencias fallaron en bootstrap. Se conservan esos logs por separado; no se atribuyen a fallos del snapshot. Una reinstalación limpia del lock con red precede a todos los resultados válidos siguientes.

| Comando/comprobación propia | Resultado |
|---|---|
| `XDG_CONFIG_HOME=/tmp/f3b-audit-xdg npm ci --include=dev --cache /tmp/f3b-audit-npm-cache` | Exit0, 469 paquetes, lock sin modificaciones. |
| `node --import tsx tests/agent-readiness/f3-runtime.test.ts` | Exit0, **12/12**, cero fallos. Ejecución detallada del test entregado, con fixtures declaradas y schemas aprobados. |
| `XDG_CONFIG_HOME=/tmp/f3b-audit-xdg npm_config_cache=/tmp/f3b-audit-npm-cache npx --no-install astro build` | Exit0, proyección28 documentos/índice26284 bytes y generación query-index585422 bytes; build Complete. |
| `node scripts/agent-readiness/agent-api.mjs check --build-dir dist` | Exit0, artifacts del build propio verificados sin modificar assets. |
| `wrangler dev --config dist/server/wrangler.json --local --ip 127.0.0.1 --port 8799 --inspector-port 9299 --persist-to /tmp/f3b-audit-workerd-state` | Servidor propio del build compilado, configuración sin editar. ASSETS/KV/D1/rate-limit locales; AI not supported, sin llamadas a esa binding. |
| Verificador entregado sobre puerto8799 y evidencia propia | Exit0, **97 requests,28 documentos,350 archivos**, manifest con SHA/tree Git exactos. |
| `node /tmp/f3b-audit-probes.mjs` | Exit0, **103 requests,28 documentos**. Sondas propias con captura de bytes/headers/status, oráculo search sobre artifact A, páginas distintas, casos normativos q GET/HEAD, errors/precedencia/OPTIONS/405/condicionales y home Markdown F2 representativa. |
| Integridad de originales del autor | Los **350** archivos reales de su dist coinciden en bytes/hash con su manifest; los **97** cuerpos locales coinciden con sus registros. |

Las sondas propias no importan el runtime para construir expectativas: usan Document del índice aceptado, bytes originales de Markdown, hashes Node crypto y pesos/token arrays normativos. El verificador entregado se ejecutó además en checkout/servidor propios; sus resultados se distinguen de los probes authored por el auditor. Todos los requests son locales; POST sólo se usa para verificar 405 dentro de la API F3. Sin `/api/ask`, contacto/admin o invocaciones con efectos. El servidor propio fue detenido tras capturar evidencia; el servidor del autor no se modificó.

## Build, originales y recibo remoto

Corpus actual: `912082d0a00775bbe30d03270bc55c3cef466dd68dff92b1921a122e197c3b0a`, 28 documentos. El manifest del autor identifica e1c971f completo/tree22a55b9 y conserva97 requests/350 archivos. Índice externo del autor `evidence-index.json` SHA256 **`be40e304e6a08009d5455f9934fe8dab2d479c01ad4b8f3e9de84362fad6507b`**, comprobado en lectura. Sus19 gates registran exit0; logs originales incluyen sync/check, suites, build/checks, tipos sin diff y dry-run. Esta auditoría reprodujo las comprobaciones pertinentes enumeradas arriba, no atribuye todos esos gates a ejecución propia.

Se comparó el build propio con el manifest real del autor: **322/323 archivos client byteidénticos**, incluidos índice/documentos F2, artifacts A y CSS. La única diferencia client es el valor oculto `startedAt` de contacto, generado por `Date.now()` heredado en `src/pages/contacto.astro:134`; ese archivo no tiene delta B. La configuración compilada sólo difiere en configPath/userConfigPath por ubicación de checkout; también cambian nombres de chunks server. Por ello no se afirma identidad global de ambos builds entre paths. Ambos builds se vinculan al mismo SHA fijo y conservan manifests individuales; el build final original se verifica completo contra sus350 hashes. No se deduce igualdad por diff documental.

Recibo curado remoto leído, procedente de consulta independiente del coordinador: `/workspace/f3b-evidence/remote-receipt.json`. Vincula el SHA/tree de entrega a [CI run38147246125](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/38147246125), **completed/success**, y comentario Cloudflare [6110047163](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/76#issuecomment-6110047163), updated2026-10-11T14:28:50Z, **Deployment successful**, con link al commit completo y Commit Preview `https://2ac6e105-cuidatuperroviejo.g1721m.workers.dev`. El recibo registra main remoto observado `d2bd342050811d41ee212730cb11fe07783994bd`. El auditor no repitió la consulta remota ni realizó requests funcionales públicos.

Originales propios persistidos: `/workspace/f3b-audit-r1-evidence/{npm-ci.log,runtime.log,build.log,artifact-check.log,workerd-server.log,workerd-check.log,probes.mjs,probes.log,verification-summary.json}`, cuerpos/manifests en `workerd/` y `probes/`, copia del recibo externo y logs bootstrap separados. Son nuevos archivos de evidencia externos a Git; no corrigen la implementación.

| Original propio | SHA256 |
|---|---|
| `probes.mjs` | `01125898ddc4e02e6a2cb2c0328ec697cde300b9cc4a0101921bab7c8f07f618` |
| `probes.log` | `f205b89a61255ff94efcd27a2524ac89b05ccebcf81021252fcdb5431b858664` |
| `workerd/manifest.json` | `e0ac37f10d67f40bae60bd5f56ec4a262462f4c00907012ec43d64b8636cf38e` |
| `probes/manifest.json` | `7cd776850ddfaa9e740bfeee46121e8a07fc00c7c2d647ddc955e15e7f7f709b` |
| `build.log` | `d154b23fd7ac0b758a4a5dd3efbfb9e043f665ee613e36c68e4aef745c26c398` |
| `runtime.log` | `fa9c0ac68d972add3f6c2ab35b12db009cbc19ea2ef9fbd3d61137f60ec3abd5` |
| Copia `remote-receipt-original.json` | `22c02d7d9d6ef4c9b654c624202e733381f0483e1cf5fcfda347deea1820cc19` |

## Límites y decisión

El PASS acredita exclusivamente los bloqueantes del alcance B sobre el snapshot fijo. Las matrices de corrupción/caché y límites se ejercitan con bindings fixture en las12 pruebas; workerd propio acredita integración del bundle con datos reales y contratos de transporte seleccionados. No todas las corrupciones se inyectan en workerd, ni se prueba abuso/cuotas globales fuera del contrato. No se repitieron suites completas heredadas, sync/check general, Worker types o dry-run del autor: sus resultados se consideran con procedencia original/CI indicada. No hay nuevo scan F2, test público de preview, publicación del conjunto discovery C o aceptación global F3.

Rollback B permanece el autorizado: quitar composición/runtime/tests específicos y el paso CI propio en rama, preservando A/F2 y evidencia. No se ejecutó rollback, commit, merge, deploy, main, indexación o scan. La política `search=yes, ai-input=yes, ai-train=no` no tiene delta.

**PASS R1/5, sólo F3B; cero bloqueantes.** El coordinador puede aceptar/cerrar B y fijar SHA/tree concreto de cierre para admitir C. Este dictamen no autoriza promoción ni acredita funcionamiento público de F3. No se inicia R2 sin una nueva entrega fija. Fin de escrituras tracked: únicamente este informe en el worktree auditor; sin modificación de implementación, contratos o worktree del autor.
