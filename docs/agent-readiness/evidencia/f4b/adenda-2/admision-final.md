# F4B — admisión final de adenda 2

Fecha: 2026-10-14. **Resultado: ADMITIDA, sin bloqueantes de fondo/coherencia pendientes en el alcance documental examinado.** El suplemento expresa las decisiones del propietario que resuelven A2-H1/A2-H2. Puede ejecutarse el encargo acotado de preview bajo sus condiciones; este dictamen **no acepta C08/C09 ni la implementación y no consume R3/5**.

## Identidad e historial

- Auditor independiente: misma sesión/agente `/root/f4b_auditor`, configuración explícita **gpt-6.1-sol / high**, distinto del autor/corrector.
- Consulta: continuación y cierre de **A2-admisión**, no una auditoría de implementación, nuevo ciclo SDD o ratificación retrospectiva de resultados.
- Snapshot examinado: `297a165a3957fc8e0d87d7a9caacde18bee95d28`.
- Tree comprobado: `ce7d40edb5c9fe6c80fa3ea6abc0fed95e83eeed`.
- Worktree propio: `/workspace/ctpv-f4b-auditoria`, DETACHED sobre ese snapshot, limpio.
- Original A2: `eb8bd3b00fc1de560583f7ac85eb04ebab13ab8d`, tree `68bc43df9c4dbbe8aba9433e56794f26a01e8c86`.
- Informe de admisión **pendiente histórico**: `/workspace/f4b-adenda2-admision.md`,8077bytes, SHA-256 `58cfeb90c5923f0ffe4acf8fe7621f8a4c3db379b786337dee7b0c6a9aa80988`, archivado sin sustitución de su dictamen original.

Historial intacto: SDD R1FAIL/R2FAIL/STOP/excepciónR3PASS; adenda1 A1-R1/2PASS y ratificación; implementación issue90 R1/5FAIL/R2/5FAIL. La siguiente eventual revisión de implementación sigue siendo **R3/5 del mismo auditor**, después de la evidencia y decisiones requeridas. No se reinicia ni renumera ningún presupuesto por esta admisión.

## Fuentes y alcance

Se leyó el suplemento completo `docs/agent-readiness/evidencia/f4b/adenda-2/precision-propietario.md` y su diff, contrastándolo con `decision-propietario.md`, `alcance.md`, el informe pendiente histórico y SDD/adenda1 vigentes. Se revisó también la declaración del rollback preparado como condición futura, sin convertirla en ensayo o promoción.

Sólo lectura y producción de este informe externo. Sin cambios de autor/producto/SDD, builds, instalaciones, HTTP, tráfico local/preview/producción, matrices, agentes, ensayos, mutaciones externas, main, integración o scans. No se verifica un futuro harness mediante esta consulta ni se declara ejecución de controles todavía no obtenidos.

## A2-H1 resuelto — excepción de 500 contractual por deadline

**Admitida en sus términos exactos.** El propietario exceptúa del STOP únicamente el caso de deadline cuando concurren las tres condiciones:

1. El500 llega entre **10 y12s** desde el inicio de la petición; antes de10s no cuenta como deadline.
2. Se captura íntegro antes de evaluar la aserción y es exactamente el errorJSON-RPC sanitizado completo del contrato, `-32603` / `Internal error.`, sin stack, rutas ni detalles internos. No basta encontrar esas palabras/código dentro de un cuerpo distinto.
3. La petición **inmediatamente posterior** responde normalmente; la recuperación observada queda archivada con las mediciones/headers correspondientes, sin atribuir identidad de isolate no observada.

Si falta cualquier condición, **STOP**. La excepción no alcanza otros500 del producto. Una páginaCloudflare52x enHTML conCf-Ray se clasifica como plataforma, pero también imponeSTOP en este encargo; no se convierte en resultado contractual o enPASS de deadline.

El suplemento resuelve la colisión entre ejecutar la expectativa del deadline y la regla deSTOP500. No altera el código, la sanitización, el límite10s o el comportamiento del resto de casos; define la condición precisa para interpretar esa prueba sin una excepción general a los errores del producto.

## A2-H2 resuelto — POST120/121 por isolate y ventana nueva

**Admitida.** El propietario incorpora expresamente120/121 al régimen «no determinable en plataforma», igual que90/91, cuando no se pueda demostrar la frontera por isolate. Statusporpetición, Cf-Ray y colo disponible deben preservarse; no buscar429 mediante reintentos. El resultado **no esFAIL niPASS**, y su aceptación necesita decisión posterior explícita del propietario con la evidencia.

La precisión operativa conserva la ventana contractual de60s y que todos losPOST de esaIP, incluidos pasos anteriores, cuentan. Los **tramos de espera de hasta20s no reducen esa ventana a20s**: el harness debe registrar la espera acumulada suficiente para iniciar una ventana nueva respecto a susPOST anteriores, sin enviar solicitudes durante la espera. La espera no consume solicitudes ni autoriza probes/retries para descubrir el bucket. Sin esa condición, un429anticipado no puede presentarse como una frontera correctamente comprobada.

Se cierra así la omisión señalada en el informe pendiente, sin inferirla del texto original. No se promete cuota global ni se instrumenta/modifica el producto para identificar o fijar isolates. Las condiciones temporales y distribución observada siguen siendo parte de la evidencia para la decisión posterior.

## Límites que siguen vigentes

Las sustituciones admitidas en la consulta anterior conservan su alcance: gate local cerrado como **limitación documentada**, noPASSretrospectivo; controles pendientes trasladados prospectivamente aCommitPreviewreal; producto192dcdd, SDK2.3.1 y Nodefetchremoto reales sin cambios; whitelistdelectura y prohibición de escrituras, followlinks o tráfico aproducción durante el encargo.

El propietario autoriza ahora la matriz pendiente en esos términos: máximo **320solicitudes**, sin retriesautomáticos ni redirects; sólo los intentos correctivos expresamente permitidos, máximo3intentos o2horas por bloqueo, dentro del presupuesto y conservando todos los originales. STOP directo si requiere cambiar producto/SDK/configuración/contratos, hay riesgo de escritura o aparece unerror delproducto/500 no exceptuado. No se rebajan esperados413/400, cobertura, límites, captura completa o identidad para obtenerPASS.

Se mantiene la adenda1 parareceipt/identidad: SHA/build/versión/URL reales y **80byteexactos + contacto con equivalencia restringida**, nunca81byteexactos ni nueva interpretación favorable delFAIL anterior. Si el commit servido cambia por documentación/harness, debe declararse su identidad verdadera y cotejar producto/build; no reutilizar unreceipt de otroSHA como prueba delnuevo.

Los casos C09noDeterminable requieren todavía una decisión del propietario **después** de observarlos. Esta admisión no sustituye esa decisión ni acepta anticipadamente la evidencia futura. La atribución del patrón local aCloudflare permanece como motivo/decisión del propietario y no como causalidad nativa independiente probada por esta revisión.

## Promoción y rollback: condiciones futuras, no aceptación actual

La autorización de la decisión original§6 sigue condicionada a los gates aplicables, decisión posteriorC09 cuando proceda, **R3/5PASS del mismo auditor**, revert preparado y smokeproducción≤20. El suplemento confirma: **sinmain, producción ni scans hasta entonces**. Esta consulta no ejecuta, acepta ni adelanta esos pasos.

Rollbackreferencia: `d6f4bddc6b1325f49aac0736a2fbfd0707a0c918`, tree `6a6f20213fabae745dfc8490b6b75cc748a1280b`, declarado en `rollback-preparado.md`. Antes demerge deben revisarse patch/comando contra laentregafinal y su cobertura de los nuevos archivos deharness; no se inventan unensayoHTTP, receipt de reversión o aceptación de esecommit por esta consulta. El ensayoR1 sigue histórico con su alcance. Si falla elsmoke, rige elrevertinmediato autorizado, sin diagnóstico enproducción.

## Disposición final

**A2-H1/A2-H2 resueltos por decisiones expresas. Adenda2 admitida para el encargo acotado, sin bloqueantes documentales restantes identificados.** Conservar el original, el informependiente y este cierre, sin reescribir FAILs ni contadores. Pueden prepararse/ejecutarse únicamente las acciones del encargo depreview expresamente autorizado, bajo sus presupuestos/STOP y la norma conjunta vigente.

No hayPASS deimplementación, C08/C09, integración, producción o puntuaciones. **R3/5 aún no se ha iniciado ni consumido.** Su eventual dictamen deberá evaluar el snapshot/evidencia fijos reales y las decisionesC09, sin sustituirlos por esta admisión.

Informe literal externo: `/workspace/f4b-adenda2-admision-final.md`.
