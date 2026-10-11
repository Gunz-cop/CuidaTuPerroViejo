# Auditoría independiente F3A — R2/5

Fecha: 2026-10-11. Dictamen: **PASS del alcance F3A, cero bloqueantes pendientes**. B3A-01–04 de [R1](f3a-r1.md) quedan cerrados mediante reproducción independiente. Contador del issue #73: **2/5**, mismo auditor; R1 FAIL 1/5 permanece archivado sin reescritura ni reset. Quinta FAIL exigiría bug/STOP, sin sexto intento.

Auditor fijo: `/root/f3a_auditor`, GPT-6.1 Sol/high, distinto del autor Luna6/high `/root/f3a_programador` y del coordinador. El auditor no corrige implementación ni contratos. Informe propio, sin commit.

## Snapshot y frontera

| Identidad | Valor |
|---|---|
| Issue / PR draft | Gunz-cop/CuidaTuPerroViejo #73 / #74, destino `agent-ready/f3-sdd` |
| Entrega fija R2 | `e2b935ddf9d419942bba39c20cbba9f055bc31da` |
| Tree entrega | `ccb2711510c625547055799114e6d252aa8c5379` |
| Base ratificada | `32949d0f8a565eaac7b58520781ab09ccbeba9a5` |
| Tree base | `236a28c11bbe875165b0e8c6bf212e75d87c145b` |
| Snapshot R1 conservado | `df1a121d79f36d507dff0107617e2f9b8bbea20e` |
| SHA256 informe R1 | `49fd165f6becd6eeb81946d19e9be75684b789fb9f18a0c15e9a00262a03f797` |
| Worktree auditor detached | `/workspace/f3-a-audit-r2` |

Se comprobaron SHA/tree/base por Git y el hash de R1. Se conservan los originales del primer intento en `/workspace/f3-a-audit` y `/workspace/f3a-audit-evidence`; R2 usa worktree y logs propios distintos. Se releen AGENTS, traspaso, informe R1 y entrega/addendum; siguen vigentes el issue #73, método SDD, contratos y anexos/ratificación examinados en R1. No hay delta de norma entre entregas.

El delta correctivo del autor frente a R1 está limitado a `agent-api.mjs`, los dos tests F3 y `entrega.md`; el quinto archivo del diff es el informe independiente R1 archivado byteexacto por el coordinador. No cambian package/lock, config/hook, workflow, schema/OpenAPI/skill, fixtures originales, runtime Worker, contenido o proyección F2. El diff completo frente a la base sigue dentro del ownership A y evidencia de auditoría autorizada.

## Cierre de la lista de R1

| Bloqueante | Resultado | Evidencia independiente de cierre |
|---|---|---|
| B3A-01, texto inline | **CERRADO** | El input original `art**rosis** y cu\`sh\`ing` produce exactamente `artrosis,cushing,x,y`; concatena nodos inline y conserva separación de bloques/code blocks. La prueba entregada añade expectativa literal, además del oráculo AST. |
| B3A-02, definitions GFM duplicadas | **CERRADO** | El input original con `/primera` y `/segunda` entrega exactamente `{label:"Fuente",url:"https://example.org/primera"}`. La tabla conserva la primera definición; test con destino explícito. |
| B3A-03, límite Read en build | **CERRADO** | El corpus válido de R1 con Read de 2441005 bytes se rechaza con `READ_RESPONSE_LIMIT`. Dos inputs medidos independientemente producen Read contractual de **2097152** y **2097153** bytes: el primero se acepta y el segundo se rechaza. Se mide el objeto completo, orden/campos exactos y serialización normativa UTF-8, antes de emitir artifacts. |
| B3A-04, resolución de refs OpenAPI | **CERRADO** | Template válido aceptado. Mutaciones de raíz temporal con `#/components/schemas/Missing`, ref HTTPS remoto, escape `~2` y percent `%XX` son rechazadas con errores propios. El recorrido comprueba todos los refs y resuelve JSON Pointer contra el documento; mantiene la restricción de refs locales. |

Los probes del auditor crean únicamente inputs temporales con hashes/corpus declarados para esos inputs. Las expectativas inline/enlace son literales; el Read se construye con campos del contrato y se mide fuera del generador; las mutaciones OpenAPI sólo se realizan en una copia temporal. No se modificó código de producto ni se regeneraron expectativas desde su resultado.

## Criterios y comprobaciones pertinentes

| Criterio A | Dictamen y sustento |
|---|---|
| C3-02 | **PASS**: fuente única F2 íntegra; corpus/IDs/hashes/metadata y fixture largo conservados; tests de corpus/enlaces/token arrays pasan. B3A-01/02 cerrados. |
| C3-03 | **PASS**: par de builds limpios del SHA completo identificado y manifests/llms iguales; build propio reproduce los mismos bytes. Tests de límites inclusivos/+1, integridad, falta, colisión y huérfano pasan; Read/ref fail closed corregidos. |
| C3-04 | **PASS offline A**: schemas, template y skill siguen byteidénticos a anexos; los artifacts actuales son byteidénticos a los ya validados contra schema local y ARD primario archivado en R1, confirmado por los manifests reales de R2 y el build propio. F3 tests validan shape/digest/entries y refs válidos/invalidos. Sin nueva afirmación de registro/descubrimiento HTTP. |
| C3-10, parte A | **PASS**: cambios acotados; hook posterior a projection conservado y observado en build real; checks CI existentes más F3 conservados; CI exacto exitoso. No reabre aceptación ni scans F2. |
| C3-11, parte A | **PASS de auditoría**: PR draft/identidades/evidencia exactos, mismo auditor y contador 2/5. Ratificación y cierre A corresponden al coordinador sobre SHA concreto. |

Comandos ejecutados por el auditor en Node v24.19.0 y resultados:

| Comando | Resultado |
|---|---|
| `XDG_CONFIG_HOME=/tmp/f3a-audit-r2-xdg npm ci --include=dev --cache /tmp/f3a-audit-r2-npm` | Exit 0, 469 paquetes, lockfile sin modificaciones. |
| `node /workspace/f3a-audit-r2-evidence/probes-r2.mjs` | Exit 0, todas las aserciones independientes de B3A-01–04 pasan. |
| `node --test tests/agent-readiness/f3-*.test.mjs` | Exit 0, **10/10**, cero fallos; incluye fixture >4000, schema/digest, integridad, colisión, huérfano/check read-only y nuevos casos R1. |
| `XDG_CONFIG_HOME=/tmp/f3a-audit-r2-xdg npx --no-install astro build` | Exit 0, proyección de 28 documentos y 26284 bytes de índice F2 seguida de generación F3 de 585422 bytes query-index. |
| `node scripts/agent-readiness/agent-api.mjs check --build-dir dist` | Exit 0, artifacts actuales verificados sin regenerarlos. El test específico también compara treeDigest antes/después. |

Se usaron proxy/CA heredados y permisos acotados de ejecución; XDG task-specific estuvo definido antes de npm/build. No hubo rechazo de aprobación en R2 ni se eludió el rechazo registrado en R1. No se imprimieron secretos.

## Identidad de los builds y recibo remoto

Originales del autor: `/workspace/f3a-r2-evidence/{head-sha.txt,head-tree.txt,build-1.log,build-2.log,manifest-1.json,manifest-2.json,llms-1.sha256,llms-2.sha256}`. Sus archivos de identidad corresponden a **e2b935 completo/tree ccb271**; ambos logs muestran projection→F3→build Complete. Ambos manifests pesan **7151 bytes** y tienen SHA256 **`1b59c7e2ef9c03949ea09ecf958d06cf399f63eac81b722ba9a052d0d1e1c867`**. Ambos registros llms llevan **`aab7bc91ce8f5229579f403443403eb2f3850397eee4741eaf53dec2b3a1133e`**. El manifest y llms del build propio R2 coinciden con ellos. Se inspeccionaron originales de este snapshot; no se infiere identidad de builds por el diff documental ni se reutiliza como prueba el par histórico 480a/df1a.

Manifest actual: 28 documentos, 29 archivos fuente F2; corpus SHA256 `912082d0a00775bbe30d03270bc55c3cef466dd68dff92b1921a122e197c3b0a`; query-index 585422 bytes SHA256 `fbb2dda2c984cf1a61011f895bc9eb8311aa1a3907e0b94eb4a2956e4c1b2323`. OpenAPI, Linkset, skills/digest y ambos ARD son outputs reales del mismo build y están enumerados en cada manifest.

Recibo curado remoto leído: `/workspace/f3a-r2-evidence/remote-receipt.json`, recopilado mediante consulta GitHub independiente del coordinador, vincula e2b935 exacto a **CI run 38110986590 completed/success**. Comentario Cloudflare PR74 **6105139041**, actualizado **2026-10-11T04:15:50Z**, anuncia ese SHA, deployment successful y Commit Preview `https://17963665-cuidatuperroviejo.g1721m.workers.dev`. El auditor no repitió la consulta remota ni llamó la preview. Metadata de build/preview no certifica funcionamiento HTTP F3. El recibo de R1 se conserva sin reescribir.

Originales propios R2, fuera de Git: `/workspace/f3a-audit-r2-evidence/{npm-ci.log,probes-r2.mjs,probes-r2.log,f3-tests.log,build-1.log,manifest-1.json,llms-1.sha256,artifact-check.log}`.

| Original propio | SHA256 |
|---|---|
| `probes-r2.mjs` | `f3d6df203bf2a8876c91faf3e81f29da067a56f13369e1758119c5353187171e` |
| `probes-r2.log` | `48f4b4ab4fc8d0eb6c7d85c10f49c26caf9d1cf097fd6f09a46eecac232c39b5` |
| `manifest-1.json` | `1b59c7e2ef9c03949ea09ecf958d06cf399f63eac81b722ba9a052d0d1e1c867` |

## Límites y decisión

Se reprodujeron sólo comprobaciones pertinentes a la corrección y coherencia de A. No se repitieron todas las suites preexistentes, sync/check general, dry-run Wrangler ni segundo build propio: están cubiertos por CI exacto y/o originales del autor según procedencia declarada, sin atribuirlos a ejecución local de este auditor. El par determinista requerido es el original final R2, contrastado con un build independiente. El schema ARD primario ya validado en R1 no se volvió a descargar ni rastrear; los bytes ARD actuales se comprobaron mediante manifests/build reales. No se verificó ningún comportamiento nuevo de runtime B, discovery integrado C o producción; no se marcó PASS global F3.

Rollback A permanece el definido por issue/traspaso: revertir conjuntamente hook/deps/checks/artefactos propios en rama, conservar F1/F2 y evidencia. No se ejecutó rollback, commit, merge, deploy, HTTP público, main, indexación o scans F2.

**PASS R2/5, sólo F3A; lista de bloqueantes pendientes vacía.** El coordinador puede ratificar/cerrar A y fijar SHA/tree concretos de su cierre como base B. Este PASS no autoriza merge, despliegue o promoción de main, ni lanzamiento B sobre una rama móvil. La SDD PASS R2/2 permanece intacta. Fin de escrituras: únicamente este informe en el worktree auditor y sus originales externos; sin commit.
