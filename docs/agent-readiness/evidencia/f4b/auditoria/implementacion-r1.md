# Auditoría independiente de implementación F4B — issue #90, R1/5

Fecha: 2026-10-13. **Dictamen: FAIL.** Hay dos fallos reparables de implementación/evidencia (cobertura de todos los IDs y deadline de salida), un gate esencial de identidad en FAIL y una contradicción material del contrato de método moderno con el SDK fijado. **STOP del alcance dependiente de los huecos esenciales C12/métodos; no aceptar ni integrar/publicar esta entrega.** No se corrige producto ni SDD en esta auditoría.

## Identidad, independencia y contadores

| Dato | Valor |
|---|---|
| Issue y revisión de implementación | #90, **R1/5**, contador nuevo exclusivo del issue |
| Auditor | Mismo agente/sesión `/root/f4b_auditor`, configuración explícita **gpt-6.1-sol / high**, distinto del autor/corrector Sol/high |
| Commit de producto fijo | `e6897f38fa3c80913d66ab7b044929b003a0abb5` |
| Tree comprobado | `ff2466e4132077a7348b9e7e324fcad5f97a67ee` |
| Base ratificada de desarrollo | `8669d9d6dd4b03685500d67a9332786ad474ff6b` |
| Tree de base ratificada | `0076ca9ed256123f56e2296ed8e5177257015b06` |
| Base técnica F4A | `cb8e10f1ead55ef0dafc666672cd3003252afc59`, tree `2727f993981f3cbbd144b802b08f13d072d11773` |
| Snapshot normativo SDD | `d5b57df26d6242572a29901f8dfb94468b95da6a`, tree `25689e34f67afe9d18a1d3507f9ea7e3e820aa97`, ratificado posteriormente sin delta normativo |
| Worktree propio de auditoría | `/workspace/ctpv-f4b-auditoria`, **DETACHED** sobre producto fijo |

Historial SDD conservado: R1/2 FAIL B1–B4; R2/2 FAIL B5 y STOP; excepción explícita autorizada por el propietario; única R3 adicional del mismo auditor **PASS** y ratificación. Esta revisión de implementación no borra ni renumera ese historial. Implementación admite máximo5auditorías del mismo auditor, incluida ésta; quintaFAIL→STOP. Un hueco esencial exige STOP antes de agotar el presupuesto, sin permiso para que el implementador rellene o cambie unilateralmente el contrato.

No se modificó el worktree del autor ni código/SDD. No hubo builds nuevos, instalación, deploy, main, push, PR/issues externos, scanners, puntuaciones ni agentes/sesiones adicionales del auditor. Se utilizó temporalmente un symlink de node_modules del autor exclusivamente para verificación; se retiró al finalizar. Las reproducciones del auditor viven fuera del repo.

## Fuentes, alcance y pruebas realizadas

Leídos AGENTS, SDD ratificada y admisión específica de `scripts/agent-readiness/discovery.mjs` por bug91; diff completo base→producto; runtime MCP, módulos/schema/registro F3/F4A, generadores, wrapper, headers, lock/deps, tests y harness de cliente; evidencia curada del commit y originales privados disponibles en `/workspace/f4b-originales-privados/`.

El diff de producto consta de21archivos, sin cambios a UI, dominio F4A, OpenAPI, Wrangler, routing/proyección F2, middleware ni contratos/evidencia ratificados F4A. Discovery se limita a los tres deltas admitidos (sexto Link, card/MIME y línea MCP de llms); no elimina checks anteriores. SDKserver/client están fijados a2.3.1. Búsqueda/lectura reutilizan createAgentApiWorker; cálculos reutilizan funciones puras reales.

Verificaciones independientes ejecutadas sobre el snapshot:

- `node --import tsx --test tests/agent-readiness/f4b-runtime.test.ts`: exit0, duración11,4s. Se cotejó además el original del autor `runtime-final-5.log`, con9tests PASS, incluido body lento, cuotas120POST/90calls, deadline de lectura y residual F3.
- `node --test tests/agent-readiness/f4b-generation.test.mjs`: exit0.
- Verificaciones focales con SDK real in-process, sin efectos: metadata/nombres/titles/descriptions/inputSchema/annotations de cuatro tools exactos; Mcp-Name Base64; cálculo puro y toolerror sin structuredContent; metadata8192inclusive y8193rechazada. El script `/workspace/f4b-audit-contracts.mjs` superó esas aserciones y **falló** posteriormente al exigir ping moderno200, documentado abajo. No se presenta ese script como suite globalPASS ni se oculta el fallo.
- Reproducción independiente de deadline de output no consumido: `/workspace/f4b-audit-deadline.mjs`; resultado negativo conservado en `/workspace/f4b-audit-deadline-observado.json` como proyección declarada de stdout.
- Lectura y verificación de bytes/hashes de los122intercambios originales de preview: todos coinciden con sus registros. Los19originales indexados en el commit coinciden con su índice. El manifest330archivos coincide completamente con el build local existente, sin reconstruirlo. Se comprobó el diff local/preview de contacto: únicamente cambia startedAt numérico; no se alteró el FAIL ni sus hashes.
- Cotejo de rollback por tree y originales: commit `a1fa4ef755e650b1536890f4ba60045f83f77a00`, tree igual a base ratificada, ensayo local8/8PASS. No hubo promoción de ese rollback.

## Evidencia real y sus límites

Workers Builds y CI originales `checks-e6897f3.json`/`ci-e6897f3.log` declaran success sobre **head_sha e6897f38…**, PRdraft#93 contra base8669d9d6…, build `c543a5a4-de53-48dc-b8c1-96c9d3c16644`, versión `378d1f4a-f55e-473d-a5f6-74591e74ac3a`, preview real `https://378d1f4a-cuidatuperroviejo.g1721m.workers.dev`. CI incluye82testsTS,66offline, otros checks de regresión/build/inventory/discovery/projection/routing/semántica/tipos/dry-run. No se atribuye preview a producción ni CI a una identidad byteexacta que no pasó.

Originales principales cotejados:

| Original privado | Resultado observado | SHA-256 |
|---|---|---|
| `preview-e6897f3-client-proxy/result.json` | PASS de sus checks, pero C05 sólo20docs | `dae0c59ea4f67bb6072a6d56736532c926b421a3f03a9681d21233310c7e5f60` |
| `preview-e6897f3-client-proxy/http-originals.json` |122intercambios,2710504bytes; digests internos válidos | `f700a26f6f5763c2dc4bfdc4357fc982737e2826b098d53824bbbdcb47d12ff2` |
| `preview-e6897f3-ui-proxy.json` | Chrome155.0.8059.39,36/36PASS | `7373e8ad290000eec666dd0bc7b73f5ede28d0cb485515f28b58f2f64d7c28aa` |
| `preview-e6897f3-webmcp-proxy.json` | Chrome155.0.8059.39,91/91PASS | `1e5d764ca7223e5c598ab8e3c6b4be249186c2cb54f1ea48d55ab7519349b7c4` |
| `build-e6897f3-manifest.json` |330archivos locales cotejados,69290bytes | `2ccf5f849c025390d7b022d3e3caf808f1d9d861c428b73e1c171158d67d21de` |
| `preview-e6897f3-identity.json` |**FAIL**,80/81byteexactos | `9c133801d63591d2528d7278d2a726486ea742125667e9adfa7e4b8dc97389b3` |
| `identity-diagnostico.json` |Diferencia contacto conocida; STOP conservado | `10aa0f817d4fec2224d05ebd6616b463dca4e504876d75bcc49af89d90c5e4e3` |
| `rollback-result.json` |8/8PASS local | `e912972c847f51b9c2bd194520c00470c8458cf36288ddd9dcac53577a483d8c` |

Los primeros fallos de proxy/Node y Chrome154 permanecen originales negativos; los nuevos originales de entorno adecuado no los convierten retrospectivamente en PASS. Coordinación informó un profiling posterior con hot-reload local8787 que produjo F3errors/API503 y detuvo esa instancia (bug97). Ese perfil posterior no es evidencia de CPU/heap de ejecución exitosa F3 y **no** se usa para aceptar C02/C09. Las pruebas remotas consideradas aquí son los originales fijos de la preview identificada; el auditor no utilizó8787 para afirmar paridad de F3.

## Bloqueantes

### I-B1 — C05: el harness no acredita todos los IDs del corpus

**FAIL de implementación/evidencia.** `scripts/agent-readiness/mcp-client.mjs`, líneas52–58, obtiene `/api/agent/v1/catalog` sin paginar y recorre sólo `catalog.documents`. El catálogo real devuelve `total:28`, `limit:20`, `nextOffset:20`, documents20. El resultado privado y los resultados locales equivalentes declaran correctamente documents20; la afirmación curada de “todos28IDs” no está sustentada.

Los originales no contienen llamadas read_guide para estos ocho IDs del corpus:

```text
pillar--cuidados-paliativos-perros
pillar--herramientas
pillar--higiene-hogar-perros-senior
pillar--movilidad-dolor-perros-mayores
pillar--salud-mental-emocional-perros
pillar--salud-perros-mayores
tool--calidad-vida
tool--movilidad
```

Reproducción sin nuevas llamadas: parsear la única respuesta de catálogo en los122originales, comparar sus IDs y los argumentos de read_guide con el index de corpus28. Se observaron21IDs distintos llamados porque se agrega un inexistente legal; **no son21IDs válidos del corpus**, ni todos28. Tampoco los36/91casos de navegador sustituyen la lectura MCP íntegra/hash de esos ocho IDs.

**Esperado:** paginación completa con guard de corpus y comprobación de cardinalidad/identidad contra total/index; ejecutar todos28IDs y verificar dominio/hash/bytes, respetando rate/caps. **Disposición:** corregible dentro del encargo de implementación cuando el STOP esencial permita continuar; nueva evidencia sobre SHAfinal, sin borrar originales20 ni presentar ésta como28. Coordinación registró bug96 y corrigió al propietario la afirmación; esa comunicación posterior no cambia el snapshot auditado.

### I-B2 — C09: el deadline no cancela ni libera una salida ya encolada sin consumo

**FAIL de código.** `src/lib/agent-mcp/runtime.ts:224` sólo aborta controller a10s. El ReadableStream de salida (`273–296`) comprueba la señal mientras prepara bytes, pero después de `enqueue(wire)` necesita otro pull/cancel del consumidor para cerrar lease. El abort no cierra proactivamente la salida que ya tiene un frame encolado.

Reproducción exacta sobre SDK real in-process, sin trabajo F3 residual:

1. Crear un wrapper y realizar dos server/discover válidos.
2. Conservar los dos Response sin consumir body.
3. A10,36s realizar un tercer discover.
4. Leer entonces los bodies de las respuestas primeras.

**Observado:** tercera429; las dos primeras todavía entregan SSE con JSON-RPC result exitoso `resultType:complete` después del deadline; sólo tras consumirlas vuelve un discover200. Fuente/resultado conservados en los artifacts externos del auditor. Los tests existentes de deadline sobre lectura lenta y de residual F3 no cubren este caso de output/backpressure.

**Esperado por SDD§5:** deadline wall10s aborte intercambio sin resultado exitoso y libere sus recursos al terminar lectura/callbacks/I/O; retener slot únicamente mientras el trabajo residual siga vivo. Aquí no queda trabajo de dominio y el intercambio puede monopolizar dos slots indefinidamente por falta de consumo.

**Disposición:** fallo reparable de implementación, no hueco de contrato. Se requiere cancelación proactiva de la salida/deadline y prueba negativa de consumo posterior a10s, recuperación cap2 y conservación correcta de residual F3. Auditor no implementa la corrección; esperar resolución del STOP esencial.

### I-B3 — C12: 80/81 y receipt no satisfacen el manifest byteexacto congelado

**FAIL de gate esencial; STOP95 se conserva.** El receipt asocia el build remoto al SHA correcto y80artifacts deterministas coinciden. El artifact observado `/contacto` **no** coincide:35686bytes en ambos, hash local `d800de172cab888d8757137939fa36a98db75806569b1df6fe623a5b178f784c`, remoto `b715631af31ba4abb29686b87b24c29dc8c990f4cff6255d6a155a242a58af83`.

La diferencia está completamente diagnosticada: `src/pages/contacto.astro:134` genera Date.now() durante prerender. LocalstartedAt1791909512198, preview1791909513074; tras sustituir únicamente ese atributo por un marcador, los bytes restantes son iguales. **No hay delta F4B en esa fuente y contacto no pertenece al corpus28.** Esto descarta una alteración arbitraria de contacto atribuible a F4B, pero no establece igualdad byteexacta de ese artifact.

**Dictamen solicitado explícitamente:** **NO**,80assetsdeterministas byteexactos + receiptSHA no satisfacen el C12 congelado de manifestbyteexacto conservando un81.ºartifact en FAIL/no comparable. Se mantiene PASS parcial de receipt/80, FAIL del comparador y el diagnóstico exacto; no se elimina la comprobación, normaliza para fingir hash remoto ni cambia “byteexacto” por “equivalente salvo timestamp”.

**Disposición:** hueco/bloqueo esencial fuera del ownership de productoF4B; coordinación/propietario deben resolver el contrato de comparabilidad o admitir una solución apropiada antes de continuar la parte dependiente. El auditor no concede una excepción ni toca contacto, cuya modificación no estaba autorizada por esta SDD. No completar C12 ni integrar/publicar mientras siga sin resolución aceptada.

### I-B4 — C03/C07: ping moderno permitido por SDD no puede ejecutarse con el SDK fijado

**FAIL; contradicción material de contrato/SDK, STOP esencial de métodos.** SDD§3 declara ping entre los métodos modernos permitidos. El wrapper lo deja pasar (`runtime.ts:254`), pero el SDK2.3.1 lo rechaza antes de su handler por no pertenecer al registry de requests de la era2026-07-28.

Petición reproducida:

```json
{"jsonrpc":"2.0","id":77,"method":"ping","params":{"_meta":{"io.modelcontextprotocol/protocolVersion":"2026-07-28","io.modelcontextprotocol/clientCapabilities":{}}}}
```

Headers Content-Typeapplication/json, AcceptJSON+SSE, MCP-Protocol-Version2026-07-28 y Mcp-Methodping, hostlocalválido. **Observado:** HTTP404 y `{"jsonrpc":"2.0","id":77,"error":{"code":-32601,"message":"Method not found."}}`. La misma llamada legacy2025-11-25 devuelve200/SSE `result:{}`. El script focal del auditor falla exactamente por404≠200 en este caso moderno; no se basa en el nombre de un cliente ni en mocks de protocolo.

Prueba estática primariaSDK: `dist/src-Cqbh3MYc.mjs` tiene handlerping en Protocolbase, pero las tablas requestSchemas/dispatchRequestSchemas2026 no contienen ping. Por ello no basta añadirlo al array de allowlist ni presumir soporte por existir el handlerlegacy. La lista moderna y el SDK exacto del contrato no producen el comportamiento simultáneo especificado.

**Disposición:** decisión de arquitectura/coordinación sobre el contrato ratificado y compatibilidad, registrada por coordinación como bug98. El implementador no debe quitar ping de la SDD, cambiar SDK, fabricar otro protocolo o declarar el404 correcto sin decisión explícita. Auditor no reaudita ni modifica SDD unilateralmente. Detener parte dependiente hasta resolución/ratificación aplicables.

## Criterios y gates, diferenciados

| Criterio | Resultado de esta revisión | Fundamento/límite |
|---|---|---|
| C01 admisión/ownership/F4A | **PASS de admisión técnica**, integración/publicación pendientes | Base ratificada y técnica correctas; delta dentro de ownership, discovery admitido expresamente por91. SHA documental finalF4A y cotejo de integración aún pendientes del propietario. |
| C02 SDK/Workers bundle/startup | **PASS en SDK/bundle/startup**; CPU/heap de éxito no verificados | SDKexacto/import público correcto; CI/dry-run y preview real ejecutan4tools. No se afirma viabilidadFree ni costo/CPUproducción. Perfil local posterior fallido no se usa como prueba. |
| C03 ambas eras/discover/list/call | **FAIL I-B4** | Initializelegacy y cuatrotools de ambaseras demostrados; moderno ping contractual rechazado. |
| C04 metadata/schemas/nombres/annotations | **PASS del alcance verificado** | Reutilización directaINPUT_SCHEMAS/TOOLS/domainDefs; comprobación independiente de metadata/listado/annotations/inputSchema y validación de dominio, proyecciónlegacy reconocida. |
| C05 F3 todosIDs/hash/corpus | **FAIL I-B1** | Paridad/hashes de primera página20 y corpus/error demostrados; ochoIDs sin lectura MCP requerida. No declarar todos28. |
| C06 cuatrocanales/cálculos | **PASS** | Fronteras34/35/36/49/50/51/0/70 correctas D33, todo5compromised, seiscombinacionesmovilidad; API/MCP y UI/WebMCP36/91 de preview155. Dominio/UI no modificados. |
| C07 errores/métodos/headers | **FAIL I-B4**; defensas restantes verificadas parcialmente | Origin/CORS aprobados, stateless, MIME/Accept, body, dominio, headers y mensajes sanitizados constatados; pingmoderno falla. No convertir la ausencia de una matriz exhaustiva en afirmación de todos los bordesPASS. |
| C08 caps body/output/depth/metadata+1 | **PARCIAL / no verificado completo** | Body32768inclusive/+1, UTF8/batch/depthinválida y metadata8192/+1 comprobados. Código limita wire completo/list/card y preserva F3JSON2MiB; evidencia no demuestra todas las fronteras output8MiB/list256KiB/depth16inclusive/+1. No declarar C08globalPASS sin completar evidencia adecuada. |
| C09 abuso/concurrencia/deadline/cancel | **FAIL I-B2** | Slowbodiescap2/rate120POST/90calls y residualF3 en tests; deadline de salida/backpressure roto. Cuotas por isolate explícitas, no globales. CPU/heap de build en ejecuciónF3exitosa pendiente. |
| C10 card/ARD/Link/llms | **PASS del build/preview observado** | Cardlocal `$defs.ServerCard` valida, MIME/identidad/remotes correctos, ARD/AIcatalog iguales/tresentries, operacionesAPIcinco intactas, Linkseis/llmsunaadición, generación/checks aditivos. |
| C11 regresiónF1–F4A | **PASS de evidencia pertinente observada** | CIsemántica/routing/F3/F4A y navegador155real. Se conservan fallos anteriores de entorno. No usar instancia8787postreloadfallida como la verificaciónworkerdanterior. |
| C12 CI/manifest/previewreceiptSHAfinal | **FAIL I-B3** | CIsuccess y receiptrealSHAcorrecto; manifestlocal330válido; preview80/81, diferenciaDate.nowconocida pero sin excepción normativa. |
| C13 aceptación/auditor/rollback | **Rollback local PASS; aceptación global FAIL** | Revertcommit/treebase iguales,8/8retirada MCP/descriptors/F3/F4A. InformeR1/5independienteemitido; fase no aceptada por bloqueantes/gates. |

C08 parcial y las mediciones no verificadas deben quedar explícitas en entrega futura; no se inventan resultados ni se sustituyen por tamaño de bundle. No se abren preferencias opcionales de refactor, librerías, nombres o features para generar ciclos.

## Integración, publicación y disposición final

P01 **PENDIENTE/BLOQUEADO**: además de corregir fallos y resolverSTOPesencial, requiere cierreF4Areal/SHAfinaldocumental accesible aceptado, diff de integración revisado, entrega/CI/preview/identidadfinal y autorización aplicable. La observación documental de cierreF4A en otra rama no sustituye la identidad final anunciada por el propietario. P02/P03 **NO EJECUTADOS**: no promoción, verificaciónMCPdominio ni scoresF4B. La autorización de desarrollar en paralelo no autoriza main/publicación.

**R1/5 implementación FAIL, sin aceptación.** I-B1/I-B2 son reparables de implementación, pero no continuar su parte dependiente mientras la contradicción de método y el gate esencial de identidad permanezcan sin resolución admisible. Entregar los cuatro hallazgos, fuentes y contador a coordinación, manteniendo informes y originales. No corregir SDD por conveniencia para obtener PASS ni lanzar otro auditor para reiniciar presupuesto. Si el proceso autorizado vuelve a avanzar, la siguiente entrega tendrá nuevoSHA/tree/evidencia y revisiónR2/5 del mismo auditor; quintaFAIL implicaSTOP.

Informe íntegro externo: `/workspace/f4b-auditoria-implementacion-r1.md`. Artifacts de reproducción externos no forman parte del producto. Ninguna conclusión de este informe autoriza publicación ni llamadas a efectos.
