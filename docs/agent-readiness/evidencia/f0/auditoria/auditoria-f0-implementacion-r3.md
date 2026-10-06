# Auditoría independiente F0 — intento 3/5

**Veredicto: PASS. Cero bloqueantes; C01–C12 satisfechos con los límites de entorno declarados.** La corrección de R2-B01 y sus regresiones relacionadas pasan. Las correcciones B01–B05 de R1 permanecen válidas. No se modificaron implementación, normativa ni ramas remotas durante la auditoría.

Fecha: 2026-10-05 UTC. Auditor: sesión independiente `/root/auditoria_f0_implementacion`, la misma de R1/R2 y distinta del implementador. Contador formal: 3/5, sin reiniciar los informes anteriores ni contar las auditorías históricas de SDD/prerrequisitos. El PASS no autoriza merge/deploy ni sustituye la ratificación arquitectónica del coordinador.

## Versiones y alcance comprobado

- Base normativa y de producto: `4dced4155788af926ef7b4e3d2d7e8259e1978be`.
- Entrega local congelada: `2c30a7ec8f3f104dfe1d664d659e55e998f5dfa7`.
- Publicación equivalente: `6c74dbc5a61decee96465b5b6ab2c10a2ddb094c`.
- Tree de ambos, verificado independientemente con Git: `505eff7447cd7f637cd0f700a5c07cfd9e7a35fc`.
- Tooling con la guarda corregida: `ade9e255d9f24f07d226b67f0a8183eb5bc0f331`; scripts/tests/package/CI idénticos a la entrega.
- Evidencia reproducible de replay/inventory/paridad: sourceCommit `4d3ab0e5df1e09e3b36115a305e639e87d5aea27`.
- Capturas LIVE originales: sourceCommit `35e767647a05034baa3b4e371bee4f7a3849545d`, dirtySource=false y deploymentCommit=null. Sin nuevas solicitudes.
- Spike corregido: `926f3c0e2929ac9ad6caaca8d16c88b301f446b7`; runtime probado en workerd: `4d0863c67e147027cf734e8333f978be5bcbe285`, idéntico salvo metadata de identidad P4.
- [PR draft #48](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/48), destino `docs/f0-reanudacion-canonical`.

La revisión usó el worktree independiente `/workspace/ctpv-f0-audit-r3`, detached en 2c30a7e y limpio al terminar. Node 24.19 y lockfile existente, sin upgrade. Observación runtime actual: red enforced y sin secrets/outbound identities. Los permisos mínimos para IPC/childGit fueron los ya autorizados.

El delta desde R2 tiene exactamente cuatro paths: index.mjs, harness.test.mjs, entrega.md y copia del informe R2. El cambio de código es una condición adicional `summary.score === null` para todo complete. R2 está preservado byte por byte con SHA256 `f437a7a5556a74716c0ae2552000c21be70d6c0572c4a3b347106c7576e20ef2`. Producto, inventario, paridad, fixtures, scans, stack, CI y runtime no cambiaron; se mantienen sus verificaciones R1/R2 y provenance original.

## C01–C12

| ID | Resultado | Evidencia y límites |
|---|---|---|
| C01 | PASS, verificado | Base fija; diff permanente dentro del ownership autorizado. Dos devDependencies exactas y dos pasos offline de CI conservados; sin cambios nuevos de producto/normativa/stack. Tooling y evidencia separados. Árbol publicado igual al local; spike permanece aislado y reproducible. |
| C02 | PASS, verificado | Replay offline conserva 43/20/19, niveles originales, neutrales, nextLevel y bytes/hashes. Verificado independientemente en R1/R2 y nuevamente por la suite R3. Evidencia de 4d3ab0e conservada sin atribuirle el SHA posterior. |
| C03 | PASS, verificado | R3-B01 resuelto: score null en complete produce exit3 y no crea comparación para reglas conocidas y desconocidas. Regla futura con score99 produce exit2/SCORING_CHANGED/delta null. Orden enabledChecks irrelevante, fail→pass válido, perfiles/universo/denominadores/regla incompatibles bloqueados; score conocido incoherente rechaza exit3. Incomplete con score null sigue admitido como evidencia y bloquea delta. |
| C04 | PASS, verificado | Tests offline de transporte/schema/oversize/hash conservados y verdes. Originales íntegros, salidas exclusivas, metadata correcta, incomplete/score null y un fetch sin retry. CLI y Git real conservan las comprobaciones de R1/R2. |
| C05 | PASS, verificado por evidencia | Solo dos capturas LIVE autorizadas, content/all-ui HTTP200 completos, 43/20. Request arrays explícitos, hashes, sourceCommit35e limpio y deploymentCommit=null. Fallo previo a fetch/rechazo previo a CreateProcess y su resolución conservados. No nuevos scans ni inferencia de commit desplegado. |
| C06 | PASS, verificado | Inventario vigente valid/errors[], 34 HTML/28 documentos, assets resueltos y catálogo/sitemap cotejados; cuatro discovery-only justificadas. Negativos de H1/canonical/duplicados/unclassified y rechazo de output solapado pasan. Código inventory/build/producto sin cambio desde la evidencia verificada. |
| C07 | PASS, verificado | Siete fixtures originales, títulos fuera de main cuando corresponde, avisos clínicos, FAQ cerradas completas y URLs de fuentes conservados. Manifest nuevo excluye scripts/ads sin quitar todos los aside; B04 resuelto. Identidad de incontinencia coincide con canonical real; B05 resuelto. Negativo sin H1 verde. |
| C08 | PASS, verificado | Handler del adaptador vigente, Worker-first limitado y delegación funcional demostrados en workerd independiente R1. Runtime/config/bindings sin cambios; 40 checks originales conservados con SHA probado. Sin bindings remotos ni credenciales en el spike. |
| C09 | PASS, verificado | Build positivo, fallo negativo del hook exit1 y empaquetado de assets demostrados en R1; mecanismo sin cambios. Evidencia de build positivo del spike corregido926f conserva el SHA exacto. Sin postbuild ni indexación. |
| C10 | PASS con límite | Matriz Accept, GET/HEAD, errores, redirects, alternancias y validadores propios/cruzados verificada en workerd R1; runtime idéntico. Assets separan representaciones mediante rutas y ETags. Cache API no ejercida como HIT/MISS por estas páginas estáticas; CDN no verificado, permitido en F0/P3 y pendiente para F2. No HIT fabricado. |
| C11 | PASS, verificado | Cinco propuestas con alternativas, evidencia reproducible, límites y criterio F2. No ratificación del implementador; decisión final del coordinador. No se amplía F0 a F1/F2, auth, MCP o nivel5. |
| C12 | PASS, verificado | CI del último HEAD remoto6c74 completed/success: run37333440890, job111842082025. Todos los pasos success, incluidos tests offline F0, inventory, tipos y empaquetado. Workers Builds111842606233 success sobre el mismo HEAD, confirmado por root mediante check-runs. Local: npm ci offline y 14/14 tests, sin nuevos efectos externos. No se atribuye el CI previo de af28355 a este HEAD. |

## Regresiones relacionadas con R2-B01

Ejecutadas independientemente mediante CLI contra summaries derivados del Content original, con destinos nuevos bajo `/tmp/ctpv-f0-audit-r3-regresiones`:

| Caso | Resultado observado y esperado |
|---|---|
| Complete, regla conocida, score null, self-compare | Exit3; sin archivo de comparación. |
| Complete, future-rule/2, score null, self-compare | Exit3; sin archivo de comparación. La reproducción exacta de R2 ya no produce comparable=true/delta0. |
| Complete, future-rule/2, score99 contra original | Exit2; comparable=false, SCORING_CHANGED, scoreDelta=null. |
| Complete, enabledChecks permutados contra original | Exit0; comparable=true, scoreDelta=0. |
| Complete, regla conocida, score99 incoherente | Exit3; sin archivo de comparación. |
| Incomplete, score null y error explícito, self-compare | Exit2; comparable=false, INCOMPLETE_RUN, scoreDelta=null. |

La fórmula local permanece restringida a la regla conocida. La nueva guarda solo exige una puntuación válida en complete; no calcula una fórmula ajena ni impide conservar evidencia incomplete.

## Comandos y checks

Desde `/workspace/ctpv-f0-audit-r3`:

```sh
npm ci --offline --no-audit --no-fund
node --test tests/agent-readiness/*.test.mjs
git diff --name-only 9e3320258f43a0e2896778515d340194a1a2b649 2c30a7ec8f3f104dfe1d664d659e55e998f5dfa7
git diff --quiet ade9e255d9f24f07d226b67f0a8183eb5bc0f331 2c30a7ec8f3f104dfe1d664d659e55e998f5dfa7 -- scripts tests package.json package-lock.json .github/workflows/ci.yml
git rev-parse 2c30a7ec8f3f104dfe1d664d659e55e998f5dfa7^{tree} 6c74dbc5a61decee96465b5b6ab2c10a2ddb094c^{tree}
git status --short
```

npm usa `ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f0-audit-config npm_config_cache=/tmp/ctpv-f0-npm-cache`. Suite: `/tmp/ctpv-f0-audit-r3-tests.log`, 14PASS. Regresiones anteriores ejecutadas con main del CLI, verificando exit codes y ausencia de output tras exit3. Se volvieron a verificar 55 entradas de manifests por bytes/tamaño/SHA256, sin errores. No se repitieron build amplio, scan o preview porque sus inputs/runtime permanecen idénticos.

CI verificado directamente por el auditor con `github_fetch_commit_workflow_runs` sobre6c74 y `github_fetch_workflow_run_jobs`: [run63](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/37333440890), [job](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/37333440890/job/111842082025). [Workers Builds](https://github.com/Gunz-cop/CuidaTuPerroViejo/runs/111842606233) success comunicado por root tras consultar los check-runs del mismo SHA.

## Disposición

La entrega fijada pasa la auditoría técnica independiente de F0. El coordinador puede ratificar las cinco decisiones y registrar el cierre del alcance. Los límites de CDN, Cache API no ejercida en rutas estáticas y provenance separada de source/deployment continúan vigentes. Merge, despliegue y trabajo de las fases siguientes requieren su propia autorización/spec; este PASS no los ejecuta ni los autoriza.
