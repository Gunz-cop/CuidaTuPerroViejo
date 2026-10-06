# Auditoría independiente F0 — intento 2/5

**Veredicto: FAIL. Un único bloqueante: una regresión de validación en la corrección de B02.** B01–B05 de R1 están resueltos. CI real pasa; no se añaden recomendaciones como bloqueantes ni se modifica código/documentación normativa.

Fecha: 2026-10-05 UTC. Auditor: la misma sesión independiente `/root/auditoria_f0_implementacion`. R1 conserva su veredicto y bytes exactos en `docs/agent-readiness/evidencia/f0/auditoria/auditoria-f0-implementacion-r1.md`. Contador formal de implementación: 2/5; revisiones históricas de SDD/prerrequisitos excluidas.

## Versiones auditadas

- Base normativa/producto: `4dced4155788af926ef7b4e3d2d7e8259e1978be`.
- Entrega local congelada: `9e3320258f43a0e2896778515d340194a1a2b649`.
- Publicación equivalente: `af28355183abdd65ea97d75b3b2871df67ea9666`.
- Tree de ambos, comprobado con Git: `7faca05b0765099fbae3edaff3a8dab7b2f8250c`.
- Tooling corregido limpio: `4d3ab0e5df1e09e3b36115a305e639e87d5aea27`; scripts/tests/package/CI idénticos a entrega.
- Spike corregido: `926f3c0e2929ac9ad6caaca8d16c88b301f446b7`.
- Runtime de spike probado independientemente en R1: `4d0863c67e147027cf734e8333f978be5bcbe285`. Delta del spike: únicamente la constante path del fixture de incontinencia. Worker, caché, negociación, configuración y mecanismo del hook sin cambios.
- C05 conserva las dos capturas originales y sourceCommit observado `35e767647a05034baa3b4e371bee4f7a3849545d`, dirtySource=false, deploymentCommit=null. Sin nuevos scans ni sustitución de su provenance.
- [PR draft #48](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/48), base `docs/f0-reanudacion-canonical`; sin merge/deploy por esta auditoría.

Worktree independiente detached: `/workspace/ctpv-f0-audit-r2`, checkout de 9e33202, limpio al terminar. Lockfile existente, Node 24.19 y las mismas versiones de R1. Observación runtime actual: red enforced, sin secrets/outbound identities. No se cambiaron permisos de zona ni credenciales.

## C01–C12

| ID | Resultado | Evidencia y continuidad |
|---|---|---|
| C01 | PASS | Delta permanente limitado a correcciones de scripts/tests y evidencia autorizada; normativa, producto, fixtures originales, package/lock y CI sin cambios frente a R1. Tooling/evidencia separados; tree remoto exacto. Patch nuevo pasa git apply --check y sus seis paths coinciden con bytes Git/hash declarados. |
| C02 | PASS | Replay independiente nuevo exit0, 43/20/19. Campos semánticos idénticos a evidencia corregida; niveles/nextLevel, neutrales, requests reconstruidas y cuerpos originales preservados. |
| C03 | FAIL | B01/B02 originales pasan: enabledChecks permutados → comparable=true/delta0; future-rule/2 y score99 → SCORING_CHANGED/delta null. Regresión R2-B01 permite complete con score null y produce delta0 desde null-null. |
| C04 | PASS | Suite corregida 14/14 conserva los negativos de transporte/schema/oversize/hash y un fetch sin retry. Código scan y captura sin cambios relevantes; evidencia original y metadata íntegras. |
| C05 | PASS | LIVE de R1 byte por byte sin cambios, requests autorizadas y límites preservados. Histórico de fallo pre-fetch y rechazo pre-CreateProcess se conserva; sin más solicitudes. |
| C06 | PASS | B03 resuelto: output descendiente de build rechaza exit3 antes de crear directorio. Inventario corregido valid/errors[], 34 HTML/28 documents y cuatro diferencias sitemap justificadas. Código inventory sin cambios; build/producto igual a R1. Nueva evidencia proviene del tooling limpio 4d3ab0e…. |
| C07 | PASS | B04 resuelto: manifest regenerado coincide exactamente con ejecución independiente de buildParityManifest, sin globalThis.process ni atOptions en warnings/FAQ; conserva avisos clínicos, respuestas cerradas completas y URLs de fuentes. Counts por fixture conservados: warnings 3/2/0/4/4/0/1 y FAQ 6/4/0/7/7/3/4. B05 resuelto: canonical/fixture/spike path ahora incontinencia-fecal-perros-senior. HTML original intacto. |
| C08 | PASS | Runtime/allowlist/delegación/bindings idénticos al spike verificado en R1. Se conserva la prueba workerd independiente 40/40 de R1; no se repite sin cambio de runtime. |
| C09 | PASS | Hook/config y mecanismo de empaquetado sin cambios; negativo exit1/positivo exit0 y dry-run329 assets de R1 siguen aplicables. Build positivo del spike926f está documentado con SHA exacto y regeneró evidencia P4. No postbuild/indexación añadidos. |
| C10 | PASS con límite | Runtime idéntico: matriz Accept/HEAD/redirects/404/alternancias/ETags propios y cruzados ya verificada en R1. Assets separan paths; Cache API no ejercida como HIT/MISS en rutas estáticas; CDN no verificado, permitido por P3 y pendiente para F2. Ningún resultado nuevo se atribuye a CDN. |
| C11 | PASS | Cinco propuestas mantienen alternativas/evidencia/límites/criterios F2, con SHA de spike corregido y distinción explícita del SHA de runtime. No ratificación del implementador. |
| C12 | PASS | CI real del SHA remoto equivalente completed/success: run 37332307169, job 111838202479. Verificado por el auditor mediante conector: todos los pasos completed/success, incluidos tests offline F0, inventory, tipos Worker y empaquetado. Workers Builds 111838248841 success comunicado por root sobre af28355. Local: npm ci offline, 14 tests F0 y replay pasan. Sin scan live en CI ni nuevos efectos externos. |

## Único bloqueante: R2-B01 — score null aceptado como complete para una regla desconocida

Contrato: `f0-contratos.md` §3 define score como integer 0–100, null solo si incomplete o denominador 0; §4 exige exit 3 para datos malformados y prohíbe deltas engañosos. C03.

Código: `scripts/agent-readiness/index.mjs`, validación de complete en validateSummary. La corrección limitó correctamente la comprobación aritmética a SCORING_RULE, pero dejó de rechazar score=null en complete para cualquier otra regla. La validación de tipos previa admite null para los estados incomplete.

Reproducción offline, desde el checkout 9e33202:

1. Copiar el summary Content completo de `medicion-4d3ab0e…/replay/content/summary.json`.
2. Cambiar únicamente `scoringRuleId` a `future-rule/2` y `score` a null. Mantener state=complete y scoredTotal=7.
3. Comparar el mismo archivo contra sí mismo:

```sh
node scripts/agent-readiness/index.mjs compare --before /tmp/ctpv-f0-audit-r2-negativos/scoring-null.json --after /tmp/ctpv-f0-audit-r2-negativos/scoring-null.json --out /tmp/ctpv-f0-audit-r2-negativos/null-null-comparison.json
```

Observado: **exit0**, archivo comparison emitido, `comparable=true`, `reasons=[]`, before.score y after.score null, **scoreDelta=0**. La resta JavaScript null-null fabrica una igualdad de puntuación aunque no hay puntuaciones válidas.

Esperado: exit3 por envelope malformado, sin comparación válida ni delta. La regla desconocida no necesita una fórmula local para exigir una puntuación integer en un estado complete con denominador positivo.

Corrección mínima: exigir score no-null válido para todo complete, independientemente de scoringRuleId; mantener la validación de la fórmula exclusivamente para la regla conocida. Añadir regresión CLI de una regla ajena con null contra sí misma; conservar B02 original con score99 → exit2/SCORING_CHANGED.

Es una regresión de la corrección, no una ampliación de alcance o cambio de SDD. No exige más scans, un nuevo spike ni repetir pruebas de runtime.

## Verificación de esta revisión

Comandos nuevos, cwd `/workspace/ctpv-f0-audit-r2`:

```sh
npm ci --offline --no-audit --no-fund
node --test tests/agent-readiness/*.test.mjs
node scripts/agent-readiness/index.mjs replay --baseline-dir docs/agent-readiness/evidencia --out-dir /tmp/ctpv-f0-audit-r2-replay
node scripts/agent-readiness/index.mjs inventory --build-dir dist --out-dir dist/audit-no-create
git apply --check docs/agent-readiness/evidencia/f0/spike-926f3c0e2929ac9ad6caaca8d16c88b301f446b7/spike.patch
git rev-parse 9e3320258f43a0e2896778515d340194a1a2b649^{tree} af28355183abdd65ea97d75b3b2871df67ea9666^{tree}
```

npm usó cache `/tmp/ctpv-f0-npm-cache`, `ASTRO_TELEMETRY_DISABLED=1` y XDG_CONFIG_HOME `/tmp/ctpv-f0-audit-config`; IPC/childGit usan permisos mínimos ya autorizados. El comando inventory es el negativo de solapamiento y devuelve3; no es un nuevo build/inventario de producto. Log suite: `/tmp/ctpv-f0-audit-r2-tests.log`, 14PASS. Reproducciones adicionales originales B01/B02 almacenadas en `/tmp/ctpv-f0-audit-r2-negativos/`.

Verificaciones offline adicionales: 55 entradas de manifests generales/spikes coinciden en bytes/tamaño/SHA256; R1 preservado exacto; LIVE y evidencia histórica35e intactas; manifest de paridad nuevo idéntico a su generación desde fixtures originales; hashes de todos los changedPaths del spike nuevo coinciden con Git. Diffs prueban que no cambió producto/runtime/package/CI, por lo que no se repitieron build negativo, preview, caché o SDK ya verificados en R1.

CI real obtenido mediante `github_fetch_commit_workflow_runs` para af28355 y `github_fetch_workflow_job_steps` para 111838202479: [run 62](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/37332307169), [job](https://github.com/Gunz-cop/CuidaTuPerroViejo/actions/runs/37332307169/job/111838202479). El endpoint combined statuses devolvió lista vacía y no se utilizó para inferir el resultado de check-runs.

## Disposición

Corregir exclusivamente R2-B01 y emitir nuevo SHA congelado para revisión3/5 del mismo auditor, conservando los resultados anteriores y scans originales. C12 verde no sustituye la validación de envelope fallida. Ninguna autorización de merge/deploy ni ratificación arquitectónica se deriva de este informe.
