# F4B — admisión independiente de adenda 3

Fecha: 2026-10-14. **Resultado: ADMITIDA, sin bloqueantes de fondo/coherencia en el alcance documental examinado.** La decisión expresa del propietario difiere la prueba externa del deadline como requisito previo. Esa prueba sigue **pendiente, no bloqueante, no deuda y sin PASS**. La admisión no acepta la implementación ni consume R3/5.

## Identidad, fuentes y contadores

- Auditor independiente: misma sesión/agente `/root/f4b_auditor`, configuración explícita **gpt-6.1-sol / high**, distinto del autor/corrector.
- Consulta: **adenda 3, primera de un máximo de dos consultas**, primera y único ciclo correctivo si fuera necesario. No inicia una auditoría de implementación ni reinicia otros presupuestos.
- Snapshot: `03db1f952eb2a340b425489e25758b8fe3786359`.
- Tree comprobado: `2d3ea747a683de4c53c84066325a67b52da5414c`.
- Worktree propio: `/workspace/ctpv-f4b-auditoria`, DETACHED sobre ese snapshot, limpio.
- Documento evaluado: `docs/agent-readiness/evidencia/f4b/adenda-3/decision-y-alcance.md`, SHA-256 `ee331aa17ac3a60e0c3399501d278efce545f78c9fb0dd420470e6389c344982`.

Se leyó íntegramente la adenda y se contrastó con la decisión sobre384f520, el índice preparatorio deR3, la norma conjunta SDD/adendas1/2 y los dictámenes anteriores. La frase del propietario se conserva literalmente:

> Que la hago después. La prueba no la considero bloqueante. Continúa sin eso.

Historial intacto: SDD R1FAIL/R2FAIL/STOP/excepciónR3PASS; adenda1 A1-R1/2PASS y ratificación; adenda2 admitida con precisiones y decisiones posteriores; implementación **R1/5FAIL/R2/5FAIL**, siguiente eventual **R3/5 del mismo auditor**. QuintaFAIL de implementación imponeSTOP. La presente consulta no consume R3/5, renumera FAILs ni sustituye auditor.

No se ejecutó HTTP, código, builds, instalaciones, matrices, pruebas de producto, agentes, mutaciones externas, integración, main, producción ni scans. La revisión del diff confirma que fuente/configuración/dependencias del producto permanecen iguales a192dcdd en las rutas de producto relevantes. SDD histórica conserva hash `8ccf7da5d77ef89e0e8ff82183e589e56ee9552485c3f6e2ebe01b72b4d9ed63`; contacto conserva sourceguard `d8b0712f96d2e5556e527e3d024561a8b15e0ab5344bdb2d59a038a98f0ee672`.

## Sustitución admitida

**PASS de acotación y coherencia normativa.** La adenda identifica expresamente las precondiciones afectadas: evidencia remota del deadline en SDD§8 y referencias derivadas deC09/C13; encargoA2§2.4/§6.1 y obligatoriedad previa del caso exceptuado de500; decisión384 punto4 e instrucciones preparatorias que impedían remitirR3 antes de recibir el resultado externo.

Se sustituye exclusivamente esa obligatoriedad y el orden de trabajo. **R3 puede iniciarse sin la prueba externa**, siempre que su ausencia y esta decisión se incorporen a la entrega. Los documentos anteriores permanecen históricos; no se requiere editarlos para hacer desaparecer una precondición que estuvo vigente en su fecha.

El propietario puede modificar ese gate de aceptación bajo su autoridad expresa. La nueva regla no cambia el deadline funcional de10s, cancelación proactiva de salida, cuotas/cap, residualF3, SDK, protocolo ni código; tampoco convierte un resultado desconocido en éxito. No se exige otra autorización para la excepción ya concedida.

## Estados y condiciones que permanecen

1. **Deadline externo:** pendiente de ejecución por el propietario, no bloqueante y no deuda por esta decisión; **NO PASS**. El perfil/caso local conserva sus propios límites y no se presenta como ejecución externa.
2. **Verificador futuro:** si el propietario lo ejecuta, rige una sola ejecución≤6requests, paquete fijo SHA-256 `2ab84cd380f9bde3fb3bbfcac75d5ae2b583884cf5fddd49640e6b1b1a50673a`, contra el preview admitido y con criterios existentes:500RPC completo exacto entre10–12s y recuperación inmediata. FAIL→STOP sin variantes en ese encargo. Esta admisión no inspecciona ni ejecuta el paquete, no cambia aserciones y no anticipa su resultado.
3. **C09 en plataforma:** cuotas90/91,120/121 ycap2/3 permanecen **no determinables con limitación aceptada expresamente por el propietario**, noPASS. La decisión de aceptación y los originales deben acompañarR3; no se promete protección global/distribuida ni se implementa la mitigación WAF del issue103 dentro deF4B.
4. **503 previo:** conservar respuestaEnvoy de15,033s sinCf-Ray y su clasificación por el propietario como corte del proxy del entorno. No es un nuevoPASS, no se repite desde ese entorno y no se transforma esa decisión en causalidad nativa independiente probada por este auditor.
5. **C12:** la decisión existente deC12PASS mantiene su identidad y alcance propios de384f520/927916b4. No se transfiere a otroSHA/preview por igualdad de fuente ni se declara81byteexactos. R3 deberá cotejar el snapshot final y la evidencia correspondiente.
6. **Resto de gates:** quedan vigentes y sujetos al dictamenR3 y a sus evidencias; sólo se difiere este caso remoto del deadline. La admisión no cubre nuevos fallos de producto ni dispensa controles no nombrados.

La clasificación futura de un resultado del verificador sigue su encargo específico; no se usa esta adenda como excepción general ante errores inesperados o como permiso para corregir producto fuera de alcance.

## Entrega R3, integración y publicación

Puede prepararse y solicitarse **R3/5** con snapshot/tree reales fijos, índices/originales accesibles y norma conjunta incluida, declarando explícitamente el deadline externo pendiente y las limitaciones C09 aceptadas. Esa preparación no es un PASS de implementación ni una ejecución deR3 mediante esta consulta.

R3 deberá evaluar la suficiencia de los alcances de evidencia, identidades deCI/build/preview, diferencias aplicables y demás criterios pendientes. Los informesR1/R2FAIL y las ejecuciones locales negativas permanecen literales e históricos. La entrega no debe atribuir cuerpos, receipts, matrices o ensayos de unSHA a otro.

Las condiciones de integración/publicación cambian únicamente en no exigir esta prueba externa diferida como gate previo. **Todos los demás gates, R3PASS, revisión de base/identidad/revert y autorización aplicable permanecen.** No main, merge o producción por este dictamen. La referencia de rollback actual debe cotejarse contra elSHA que efectivamente se integre; no se acepta ni se fabrica un ensayo nuevo del revert mediante esta revisión documental. Sin scans/score; F5/F6 fuera; política search=yes/ai-input=yes/ai-train=no preservada.

## Disposición

**Adenda 3 admitida, primera consulta, sin bloqueantes documentales identificados.** Registrar su vigencia prospectiva y archivar literalmente este informe junto con el texto del propietario. No hacen falta un ciclo correctivo o una nueva autorización para el cambio ya expresamente decidido.

La prueba externa sigue **pendiente y sin PASS**; C09 aceptado con limitación sigue **no determinable**, noPASS. Esta admisión no acepta implementación, C08/C09 globales, integración, producción ni resultados todavía inexistentes. **R3/5 queda disponible y aún no consumida por esta consulta.**

Informe literal externo: `/workspace/f4b-adenda3-admision.md`.
