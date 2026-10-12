# Auditoría independiente F3C — R1/5

**Dictamen: PASS. Cero bloqueantes.** Primera revisión total del issue [#77](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/77), contador **1/5**, mismo auditor `/root/f3c_auditor`, GPT-6.1 Sol/high, independiente del autor `/root`. Fecha: 2026-10-12. No se implementó ni corrigió producto o contrato. La excepción explícita de autoría de C está registrada en el issue y la entrega; no se atribuye implementación a Luna.

Snapshot auditado: commit **`aad2a6624c24d7425c5ad5329b82c77a8a86b619`**, tree **`add06deb2647988846525fcfbeb5bb6b754b7006`**. Base B aceptada: **`ac4c5ada06325056c22f9baab60fcd6e72e5d4a5`**, tree **`018977233fdc3b076bf880bf99d4724f40f3270f`**. Checkout auditor separado `/workspace/f3-c-audit`, detached al SHA indicado, limpio antes y después de las pruebas. El worktree del autor y sus originales se consultaron en lectura únicamente.

Se leyeron AGENTS.md, SDD F3, contratos, traspaso, ratificación PASS R2/2 y anexos normativos, además del issue ejecutable y entrega C. SDD y aceptaciones A/B se consumieron como dependencias; no se reabrieron sus auditorías. La revisión se limita a bloqueantes de coherencia, contrato, ownership y evidencia de C.

## Contrato y ownership

El diff sobre la base B comprende exactamente 11 archivos, 515 inserciones y 22 eliminaciones. `_headers` incorpora las siete reglas F3 de MIME/no-store/CORS y el conjunto Link; middleware y runtime F2 cambian exclusivamente valores/composición Link. `agent-api.mjs` añade únicamente import y hook/check de discovery. `discovery.mjs` conserva el serializer F1 y verifica prefijo/sufijo, límite64 KiB, destinos y headers. `discovery.test.mjs` sólo adapta fixtures del checker; negociación sólo añade el literal Link y sustituye tres expectativas Link. Tests C y evidencia completan el diff. No cambian runtime B, dispatch, corpus/proyección F2, fuentes/schema/registro A, CI, stack, bindings, contenido, robots, redirects o asistente.

Las cinco pruebas C comprueban extensión literal/idempotente/read-only, destino ausente/vacío, prefijo alterado, duplicación, límite completo, política/headers y Link ajeno sin añadir duplicados. El aislamiento TMPDIR pertenece al proceso de tests C; la prueba histórica F1 de limpieza permanece intacta. Política preservada: **search=yes, ai-input=yes, ai-train=no**.

## Criterios

| Criterio C | Resultado | Evidencia evaluada |
|---|---|---|
| C3-04 | PASS | Schemas/registro y checks A conservados; OpenAPI3.1.1 con nueve operaciones, Linkset normativo, skills0.2.0 con artifact y digest real; ambos ARD byteidénticos con dos entries; siete assets con MIME/no-store/CORS y Link exactos. |
| C3-06 | PASS | Capturas finales local/preview y workerd auditor leen los 28 IDs del índice del mismo build. Replay independiente compara metadata completa, Markdown UTF-8 reencodificado, bytes/SHA256 y links con originales F2/query-index verificados. |
| C3-07 | PASS | Ranking de cushing/artrosis recalculado independientemente desde tokens/pesos contractuales, resultados completos concordantes; consulta sin match total0. Fixtures offline de generación/runtime preservan búsqueda y lectura posteriores al carácter4000. |
| C3-08 | PASS | GET/HEAD, errores400/404/409, OPTIONS204, rechazo POST405/Allow, CORS/no-store/seguridad/Link y representación fija comprobados. API sin ETag/Last-Modified; catálogo asset condicional nativo304 observado, sin inventar validador exterior. Defensas503/límites se verifican offline, sin introducir averías en preview. |
| C3-09 | PASS | Ambos recorridos completos, catálogo/OpenAPI→cushing→ID real/corpus→canónica/Markdown y skills/digest→artrosis→lectura. Los destinos de descriptors/ARD resuelven200 sin redirect. Metadata canónica conserva producción; transporte conserva path/query y usa la Commit Preview exacta. |
| C3-10 | PASS | Build real congelado incluye HTML/CSS en manifest de350 archivos. Robots/llms/sitemap/catálogo asistente byteexactos; home HTML/Markdown/HEAD, canónicas y redirect301 representativo esperado; checks CI actuales completos. F1 serializer y restantes aserciones F2 intactos. |
| C3-11 | PASS para esta auditoría | Issue, base y snapshot fijos, independencia, PR draft y evidencia verificadas; contador1/5. Aceptación arquitectónica/cierre corresponde al coordinador después de este PASS. |

C3-03 en su parte de integración queda respaldado por los dos manifests autor idénticos de ocho artefactos F3/llms y un tercer build propio con los ocho hashes iguales. C3-01/02/05 mantienen sus aceptaciones predecesoras, con checks de dependencia ejecutados; no se presenta una nueva auditoría de aquellas entregas. **C3-12/P3-01–03 siguen pendientes de promoción autorizada y gates propios de producción.**

## Comandos y comprobaciones auténticas

El auditor ejecutó `npm ci --cache /tmp/f3c-audit-npm-cache` (exit0), seguido por los comandos siguientes, todos exit0, en el checkout separado, con XDG_CONFIG_HOME temporal y permisos de red/IPC limitados al worktree/evidencia/tmp:

```text
node --test tests/agent-readiness/*.test.mjs                         # 60/60, incluye5 C
node --import tsx --test tests/agent-readiness/negotiation.test.ts   # 41/41
node --import tsx --test tests/agent-readiness/f3-runtime.test.ts    # 12/12
npx --no-install astro build
node scripts/agent-readiness/discovery.mjs check --build-dir dist
node scripts/agent-readiness/agent-api.mjs check --build-dir dist
python3 /workspace/f3c-audit-r1-evidence/replay.py
python3 /workspace/f3c-audit-r1-evidence/verify-manifests.py
```

Scripts auxiliares y logs auténticos se conservan en `/workspace/f3c-audit-r1-evidence`, con `checks.json`, `capture-replay.json` y `manifest-verification.json`. El replay no importa helpers de producto: usa literales contractuales, cuerpos capturados y originales del build, y recalcula ranking por sus pesos. Se rehashearon las420 entradas del índice de originales, los cinco originales del incidente local, los350 archivos del build autor y todos los117 cuerpos por modo: ninguna discrepancia.

Workerd auditor: `npx --no-install wrangler dev --config dist/server/wrangler.json --local --port 8801 --inspector-port 9301 --persist-to /tmp/f3c-audit-persist`, readiness comprobada antes del gate. `node docs/agent-readiness/evidencia/f3/c/verificar-superficies.mjs http://127.0.0.1:8801 /workspace/f3c-audit-r1-evidence/workerd` terminó exit0, PASS117 requests/28 documentos/dos recorridos. No hubo rebuild/reload durante matriz. El grupo propio12236 se detuvo; comprobación final confirma ningún proceso activo y ambos puertos reutilizables. Un diagnóstico inicial sin permisos de red no pudo abrir sockets; se repitió exclusivamente ese diagnóstico con permisos scoped. La comprobación inicial de bind sin SO_REUSEADDR encontró9301 temporalmente no reutilizable; el diagnóstico final confirma ausencia de listeners/procesos activos y bind reutilizable de ambos puertos. No se repitió la matriz por ello.

El autor aporta19 comandos exit0; sus logs y checks se rehashearon. El auditor corroboró mediante GitHub las26 etapas del job114574816468 del run [38174797432](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/38174797432): todas SUCCESS, incluidos checks de tipos/proyección/routing/semántica/growth y empaquetado dry-run. El PR [#78](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/78) continúa draft, base/head exactos antes indicados. El comentario Cloudflare [6113704992](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/78#issuecomment-6113704992) anuncia deployment successful; su HTML enlaza el SHA completo auditado con [Commit Preview](https://dd2a6ab6-cuidatuperroviejo.g1721m.workers.dev), distinto del alias de rama. El comentario muestra Oct11 2026 21:04 UTC; metadata PR actualizada21:04:33Z. `remote-verification.json` conserva estos datos saneados; el receipt original fue rehasheado. No hubo nueva matriz HTTP pública del auditor.

## Integridad y fallos previos preservados

| Original privado | SHA256 |
|---|---|
| evidence-index.json,420 entradas | `1c86bc61df9aa70946361f3826cb01db418648964389a00bbb4705d7fe18858e` |
| workerd-final/manifest-private.json | `41c3b63c20f5eb02699471dba2c6b9b6af93021078f98b5cda87aa8bfae7a317` |
| preview/manifest-private.json | `b1f0cfa55a0e971f8097c2183e5e702fe8d91f98967c08c1be8398c12d564c41` |
| determinism-first.json y second.json | `53cbc2399962641453693ec76924546cbb8b042809aa8044cb47dedfd4a1001a` |
| local-conflict/failure-index.json | `40a9797eb9d1cf753f09346ce43cc29d0c2da5cc54022325e06e0c406b380283` |
| local-conflict/decision.md | `d3e1ad1ad3d3678a99c5d2eb3cffeea26771f377ff660bf3e331af27212567b5` |
| workerd auditor/manifest-private.json | `b8538b4a3490e8a001f7028df71a89fa33fb53532240da1e988c7368c240cec0` |

Corpus verificado: `912082d0a00775bbe30d03270bc55c3cef466dd68dff92b1921a122e197c3b0a`. Skill servida:3350 bytes, SHA256 `0e4b1055e79a7b14e49d44322ee0aaccdb3c9cf248042f9b0ab870577db1888d`. Llms completo:4022 bytes, SHA256 `fbe46b104654f4e0bdb089a6cd7f926dc9ea2d4abdb072dea513ba0ba1b641a5`.

El primer snapshot `1c7c25c9b643544523f9c0c023f91f13fc8c586f` tuvo CI38174586480 FAIL por concurrencia de scratch C/F1. Ese fallo se conserva en attempt-1 y ci-correccion.md; el nuevo snapshot sólo aísla TMPDIR de la suite C, sin relajar F1. No consumió auditoría previa ni se heredan sus hashes/preview.

El primer intento workerd de aad2 conserva FAIL/STOP503 y su manifest SHA256 `08bcb37d7a7d7c08e0ae7b954316225eacfbfe61e1ffe2a4f203a01fb3c201ae`: una instancia anterior sobrevivió al cierre, la nueva falló al ocupar inspector9300 y el gate alcanzó el servidor viejo tras reload de dist. La decisión arquitectónica conservada lo identifica como corrección operativa y admite una ejecución nueva diferenciada después de comprobar proceso/config/readiness/identidad, sin rebuild durante gate. Este informe usa **workerd-final**, no sustituye ni considera PASS aquel fallo. La captura pública única posterior y la comprobación workerd independiente pasan; no queda hueco esencial de entorno sin resolver.

## Límites y efecto del dictamen

Originales privados contienen cuerpos completos y headers exteriores; este informe publica únicamente resultados/digests, sin cuerpos HTML, tracking, secretos o IDs de bindings/dashboard. La identidad global de HTML exterior no se afirma: JSON, descriptors, skill y Markdown se comparan byteexactos; HTML canónico se comprueba funcionalmente con su URL y headers, sin ampliar las excepciones F2. No se descargó el URI opaco del schema skills ni se presenta esa descarga como validación; schemas locales y fuente ARD archivada respaldan checks offline. Las URLs científicas originales se preservan para cita, sin fetch ni evaluación científica remota.

Sin bloqueantes de fondo o incumplimientos de ownership demostrados. **PASS R1/5 habilita la aceptación arquitectónica de C y una propuesta concreta posterior; no autoriza merge, main, deploy ni scans de producción.** No se hicieron commits/push, mutaciones remotas, llamadas a ask/admin/contacto/cálculos, autenticación o scans F2. Si una revisión posterior resultara necesaria, se conserva este auditor y el contador; quinta FAIL exige bugSDD/STOP sin sexta revisión ni reset.
