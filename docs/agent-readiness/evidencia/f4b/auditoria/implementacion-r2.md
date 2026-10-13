# Auditoría independiente de implementación F4B — issue #90, R2/5

Fecha: 2026-10-13. **Dictamen: FAIL / STOP esencial en C08.** El harness de SDK real en workerd local falla con HTTP500 en lugar del413 contractual y el entorno termina con `Network connection lost`. El PASS de142intercambios de preview y los unitarios positivos no sustituyen ese gate local requerido. No se acepta, integra ni publica la implementación.

## Identidades, normas y contador

| Dato | Valor comprobado |
|---|---|
| Revisión de implementación | **R2/5**, mismo issue90, sin reset ni revisión adicional por continuaciones técnicas |
| Auditor independiente | Misma sesión/agente `/root/f4b_auditor`, configuración explícita **gpt-6.1-sol / high**, distinto del autor/corrector Sol/high |
| Producto fijo | `192dcdd52d2790652ef2dbcb6d23a0f5006ade43` |
| Tree fijo | `960be17582b35a2f5287d90a369ab10883c55821` |
| Base ratificada de desarrollo | `8669d9d6dd4b03685500d67a9332786ad474ff6b` |
| Base técnica F4A final | `cb8e10f1ead55ef0dafc666672cd3003252afc59` |
| Documentación final F4A confirmada | `a42a18522b7cf4143aff56d11d4632dc3c1050da` |
| Adenda1 normativa | `6dcbfa50ae3fd6ac080e4725eea9466cb63e3d0d`, tree `189faed48d73007db3d218ae82855bfaae5acaef` |
| Ratificación adenda | Commit `b204442`, posterior a **A1-R1/2 PASS**, informe11848bytes/hash `db9684f3fc49c4b1fbf86c6244827d1280ffdf06e6ac151526fb879e7b335065` |
| Worktree propio | `/workspace/ctpv-f4b-auditoria`, **DETACHED** sobre192dcdd, limpio |

Normas vigentes: SDD histórica intacta + adenda1 ratificada para pingmoderno e identidadrestringida de contacto + admisión discovery91. No se convierte en PASS el resultado de implementaciónR1 ni el antiguo comparador80/81FAIL.

Historial conservado: SDD R1FAIL/R2FAIL/STOP/excepción autorizadaR3PASS; adendaA1-R1/2PASS, contador exclusivo propio; implementación **R1/5FAIL → R2/5FAIL**. La siguiente eventual revisión de implementación sería R3/5 del mismo auditor, después de resolver el bloqueo y entregar nuevo snapshot/evidencia. Máximo5 por issue, quintaFAIL→STOP; un bloqueo esencial detiene antes de agotar intentos. No renumeración ni cambio de auditor para eludirlo.

## Alcance y procedencia de evidencia

Se revisó la entrega fija, los cambios de código respecto aR1, la ratificación de adenda y los originales privados R2. Se verificaron fuenteSDD, sourceguard de contacto, copia literalR1 y los **385originales** del índice preparado: todos coinciden en bytes/SHA-256, sin diferencias. Los142intercambios de preview también coinciden con sus digests internos.

La curación de `docs/agent-readiness/evidencia/f4b/implementacion/r2/` en el worktree del autor es **posterior y aún fuera del snapshot de producto**; se leyó como evidencia de entrega, sin atribuir esos archivos al tree192dcdd. Sus referencias a head/tree se cotejaron con los originales. El auditor no modificó el autor ni completó su curación.

HashSDD preservado: `8ccf7da5d77ef89e0e8ff82183e589e56ee9552485c3f6e2ebe01b72b4d9ed63`. Hashcontacto preservado: `d8b0712f96d2e5556e527e3d024561a8b15e0ab5344bdb2d59a038a98f0ee672`. InformeimplementaciónR1 literal preservado: `a4d2ad29efeb3a82c260003d5bd47fdea77523b11dc602b3b8866e9f569da7a1`.

La revisión cerró el FAIL esencial sin lanzar builds, variantes de conexión, nuevas matrices, agentes, instalaciones, correcciones, mutaciones externas, main, integración, producción ni scans. Las pruebas y perfiles descritos son originales del autor examinados, no nuevas ejecuciones atribuidas al auditor. No se agotaron verificaciones adicionales para forzar PASS tras el bloqueo.

## Correcciones de los cuatro hallazgos de R1

| Hallazgo histórico | ResultadoR2 del objeto original | Evidencia/límite |
|---|---|---|
| I-B1/C05:20 de28IDs | **PASS** | Harness pagina20+8 con guardcorpus, total/offset/nextOffset, IDs únicos y metadata exactos contra índice28. Los originales nuevos de preview y la parte exitosa local demuestran28lecturas, comparación íntegra con API, hash/bytes. El resultadoR120 permanece parcial e histórico. |
| I-B2/C09:deadlineoutput sinconsumo | **PASS del caso corregido** | Helper `boundedResponse` aborta proactivamente la salida encolada, cancela reader y libera lease sólo tras cierre/settle; jobsresiduales siguen retenidos por lease. Prueba registrada de dos respuestas sinconsumo: tercero429antes del plazo, a10,3s lecturas tardíasrechazadas y caprecuperado. Se conserva prueba de residualF3. No se afirma que ello haga pasar C08local. |
| I-B3/C12:comparador80/81FAIL | **PASS conforme nueva norma**, sin reetiquetarR1 | Checkerconstructivo preserva81artifacts, receipt/head, sourceguard y cuerpos/hashes originales.80byteexactos + contacto con equivalenciarestringidaPASS. P/V13ASCII/S únicos y prefijos/sufijos byteexactos; no normalizaciónHTMLgeneral ni81byteexactos. |
| I-B4/C03/C07:pingmoderno incompatible | **PASS conforme adenda** | Allowlistmoderna retira ping antes del SDK; moderno404/-32601, legacy200/result{}. SDK2.3.1 intacto. Nueva evidencia de preview incluye ambos resultados. El FAILR1 del contrato anterior no cambia. |

El nuevo Content-Length excesivo permite prerechazo413 sin abrir/cancelar upload; longitud reducida o ausente **no** elimina el contadorstreaming. El cambio que absorbe un rechazo de `reader.cancel()` preserva el413 conocido en el testunitario. Esas defensas no demuestran por sí mismas que Miniflare/workerd local complete la secuencia HTTPreal sin500.

## Bloqueante R2-B1 — C08 local falla; STOP del entorno/gate esencial

**FAIL confirmado en originales del producto192dcdd.** `r2/workerd-192dcdd-client/result.json` conserva ambas eras y28lecturas/cálculos positivos, pero concluye globalmente **FAIL**:

```text
500 !== 413
scripts/agent-readiness/mcp-client.mjs:112
```

El original `r2/overflow-workerd-192.json` separa los casos:

- Upload no streaming: HTTP413, errorJSON-RPCgenérico, PASS.
- Upload streaming: HTTP500, `Error: Network connection lost`, origen mostrado en Miniflare `entry.worker.js:5201`; FAIL.

El log `workerd-192-final.log` muestra las operaciones previas exitosas, la excepción y finalización deWrangler. **Esperado:** body excedido32768bytes devuelve413 con el error contractual y la composición local permite continuar con las siguientes peticiones válidas/negativas, sin caída del entorno ni sustitución por500. **Observado:** no se completa esa garantía ni la matriz local.

El único experimento preservado con `Connection: close` no es una solución adoptada: `workerd-192-close-client/result.json` también termina **FAIL**, ahora `500 !== 400` en el batchJSON siguiente. Cambiar el punto del fallo no valida el transporte ni justifica quitar comprobaciones. No se hacen más variantes o retries en esta revisión.

La previewnative192dcdd sí devuelve413 para la prueba observada y su harness completo da142intercambiosPASS. Se conserva como evidencia positiva de preview, con su alcance: los intermediarios pueden asignar Content-Length y no se probó identidad exacta de condiciones de ingreso. **No sustituye el gate de workerdlocal** que la SDD exige además del SDKin-process y preview. Tampoco los unitarios con stream/cancelPromise sintéticos convierten el500 local en413.

La incidencia primaria `https://github.com/cloudflare/workers-sdk/issues/15709` describe una forma **similar**, abierta, con Wrangler4.129.1 frente a4.128.0 usado aquí. La similitud de overflow/cancelación/peticiónposterior no prueba identidadcausal, resolución disponible ni ausencia de un defecto de integración propio. Este informe **no atribuye causalidad confirmada** ni declara solucionado el bloqueo por citar ese issue.

**Disposición:** bug100 permanece abierto; C08 y su trabajo dependiente quedan enSTOPesencial. Resolver el entorno/composición mediante decisión y encargo explícitos si requieren archivos/dependencias/configuración fuera de ownership; no cambiar stack, SDD, checknegativo, esperado413/400 ni declarar una excepción implícita. Cualquier solución deberá entregar evidencia apropiada sobre snapshotfijo antes de una siguiente auditoría. No se continúa dependiente trasSTOP ni se ejecutan matrices para buscar un subconjunto favorable.

## Evidencia positiva preservada

CI y Workersreceipt corresponden al head192dcdd; runCI `38461648383`,88testsTS/68offline y gates pertinentes success. Buildreal `97c7ec40-3e66-49c6-92af-5ad978197d80`; versión `81e32ad7-e16a-4b12-aba9-81589f0651e3`; preview `https://81e32ad7-cuidatuperroviejo.g1721m.workers.dev`. No usar el aliasmutable como identidad ni presentar esos receipts como producción.

| Original privado bajo `/workspace/f4b-originales-privados/r2/` | Resultado | SHA-256 |
|---|---|---|
| `preview-192dcdd-client/result.json` |PASS;28IDs/ambaseras/4tools | `46348610e2d08ed6a2e4b1ced75a96f785fc05fd20e14d47b1556ae7d39c924b` |
| `preview-192dcdd-client/http-originals.json` |142intercambios,3053001bytes,digests válidos | `2d9fedcc4810524c23bc625bacd61e7f39ad15d719c94151a2a904ff8b89aa99` |
| `preview-192dcdd-identity/identity.json` |80byteexactos + contacto con equivalenciarestringidaPASS | `d33edf1cdb17d153818946589f6c628c8dcc961278c7dc49df23e4b432d72a4a` |
| `checks-192dcdd.json` |CI/Workerssuccess,head correcto | `3eda9228be68ada76e8c2ac3d9ed5dfa5523554feb0ce3aa7866088fcf67d212` |
| `profile-success-192.json` |4tools reales `isError=false`; perfil declarado | `9c0859300b0bf64a32cc0eccad7fe41fea5033f568411889b4d1f5aa587d4105` |
| `workerd-192dcdd-client/result.json` |**FAIL500≠413**;positivos parciales preservados | `85a9704b07832779ebbbc0b68c53365b5765278ec7d8ed03f9d0f23bfbecd357` |
| `overflow-workerd-192.json` |No streaming413;streaming500FAIL | `29b86422b5ee8d41c83c89ebf5c70f2db09187ee0fa08ea62a384435686083a0` |
| `workerd-192-close-client/result.json` |**FAIL500≠400**,experimento único | `1d8927fc804008d17a0fd7e45d2890baaa554cbc6416228b8503497624c2138e` |

CPU/heap: perfil realV8 del producto192 en instancia nueva con4tools exitosas y primera búsqueda editorialfría; heap máximo **observado entre llamadas**18415160bytes; CPUactiva muestreada agregada168899µs e idle/program60716µs. Incluye framework/handshake/inspector. **No** prueba CPUfacturable por petición, picoRSS/memoriatotal del isolate, costo, tráfico ni viabilidadFree. El perfil fallido anterior no se reutiliza como exitoso.

Regresiones: se preservan UI36/36 y WebMCP91/91 de R1 y cinco checksfocales posteriores en `f96c4cc`, sin atribuirlos como nuevos en192dcdd. La comparación finalf96→192 conserva330assets sin drops y sólo varía startedAt de contacto; no hay delta de UI/JS/DOM/dominioF4A. El error anterior de ordenar getToolsChrome como tools/listMCP queda preservado; la comprobación focal usa universo exacto y mantiene el orden obligatorio del listadoMCP. Es evidencia acotada de regresión, no una nueva matrizremota192.

Rollback: el último ensayo sigue **R1 a1fa4ef,8/8local**. No se inventa ni se atribuye un ensayo nuevo sobre192. Una entrega futura deberá declarar exactamente qué ensayo/gates siguen aplicables y cuáles necesitan revalidación.

## Criterios y pendientes

| Criterio | DictamenR2 sobre evidencia revisada |
|---|---|
| C01 admisión/ownership/F4A |PASSde bases/ownership pertinentes;F4Afinalcb8e/a42recibidos. Integración sigue pendiente de revisión/autorización. |
| C02 SDK/bundle/startup |CI/build/previewpositivos; SDK2.3.1intacto y perfil acotado exitoso. Composición local completa no aceptada porC08. |
| C03 negociación/eras/métodos |PASSobservado de4tools/ambaseras y ping conformeadenda; no nueva aceptaciónglobal. |
| C04 schemas/metadata |ContratosF4A/reutilización intactos; metadata/listado/validación preservados. No reabrir preferencias opcionales. |
| C05 corpus28/lectura/hash |PASSnuevo:20+8,universo exacto,28lecturas/hashes/bytes;R120parcial intacto. |
| C06 cálculos/4canales |ParidadAPI/MCP/fronteras/seiscombinacionespositiva; matricesUI/WebMCPprevias conservadas, regresiónfocal/staticdiff declarados. |
| C07 errores/headers/métodos |PreviewpertinentePASS, pingnuevo correcto. Local500es FAILdeC08, no error contractual aceptado. |
| C08 caps/composición |**FAIL/STOPesencialR2-B1**. Unitariosbody32KiB/depth16/meta8KiB/wire8MiB/listcard256KiB/framinginclusive+1/cancelPromise positivos;workerdlocalnegativo falla. |
| C09 rate/deadline/cancel |I-B2casooutput corregido, testsplazo10,3s/recuperación/residualpositivos. No afirmación de cuota distribuida ni aceptaciónlocalglobal. |
| C10 discovery/card |Generación/checks/preview preservados; C12identidad nueva adendaPASS. Sin cambios no autorizados a fuentecontacto. |
| C11 regresión |Evidencia estática/focal pertinente; no se atribuyen matricesprevias aSHA192. Verificaciones no completadas porSTOP quedan pendientes. |
| C12 CI/receipt/identidad |PASSde componentes pertinentes observados bajo adenda:head/buildcorrectos,81artifacts,80byteexactos+contactoequivalenciarestringida. No81byteexactos niPASSretrospectivoR1. |
| C13 aceptación/rollback/entrega |**AceptaciónglobalFAIL**; informeR2emitido, rollbackR1declarado, restoentrega/gatespendientes. |

Los PASSparciales anteriores no compensan C08. Las verificaciones restantes que dependan del entorno local quedan **no verificadas/pendientes**, sin agotarlas para forzar la aprobación. Este informe no presume ausencia de otros defectos en alcance no completado ni abre preferencias para consumir auditorías.

## Disposición final

**Implementación issue90 R2/5FAIL; STOP del gate esencial C08/bug100.** Conservar todo el corpus de originales y los fallos históricos. El autor no está autorizado a continuar el trabajo dependiente, aceptar o integrar la fase mientras siga ese bloqueo; cualquier reanudación exige resolución/admisión apropiada y entrega fija verificable.

No main, merge, integración, publicación, producción, scans ni puntuaciónF4B. La aceptación finalF4A y la adenda ratificada no autorizan esos pasos ni sustituyen el gate pendiente. Si se reanuda legítimamente el mismo issue, siguiente auditoría **R3/5** con el mismo auditor; contadorvigente, quintaFAIL→STOP, sin reset.

Informe íntegro externo: `/workspace/f4b-auditoria-implementacion-r2.md`.
