# F4B — consulta de admisión de adenda 2

Fecha: 2026-10-14. **Resultado: admisión pendiente de dos aclaraciones esenciales.** Las sustituciones expresamente autorizadas son admisibles, pero no debe ejecutarse la parte dependiente del deadline/interpretación de C09 hasta que el propietario resuelva los puntos siguientes. No es un dictamen R3/5 de implementación ni una ratificación de una nueva SDD.

## Identidad y alcance

- Auditor: misma sesión/agente independiente `/root/f4b_auditor`, configuración explícita **gpt-6.1-sol / high**, distinto del autor/corrector.
- Consulta: **A2-admisión**, sin consumo, reset o renumeración del contador de implementación. Historial intacto: SDD R1FAIL/R2FAIL/STOP/excepciónR3PASS; adenda1 A1-R1/2PASS y ratificación; implementación R1/5FAIL/R2/5FAIL, siguiente eventual R3/5.
- Snapshot examinado: `eb8bd3b00fc1de560583f7ac85eb04ebab13ab8d`.
- Tree comprobado: `68bc43df9c4dbbe8aba9433e56794f26a01e8c86`.
- Worktree propio: `/workspace/ctpv-f4b-auditoria`, DETACHED sobre ese snapshot, limpio.
- Textos leídos íntegramente: `docs/agent-readiness/evidencia/f4b/adenda-2/decision-propietario.md` y `alcance.md`, contrastados con las disposiciones aplicables de SDD§5/§8/§9 y el informe de implementación R2. La adenda1 y sus sustituciones siguen vigentes.

Revisión exclusiva de fondo/coherencia y admisión de cambios de gate. Sin programación, correcciones de texto o producto, builds, instalaciones, tráfico local/preview/producción, matrices, agentes, nuevos ensayos, mutaciones externas, integración o scans. Las afirmaciones causales del propietario se conservan como decisión/motivo, sin elevarlas a causa técnica independiente probada por esta consulta.

## Sustituciones admisibles por autorización explícita

1. **Gate local:** el propietario puede sustituir prospectivamente para F4B la exigencia de completar en local esos controles por su verificación en Commit Preview real. Local queda «limitación del entorno local, documentada»; sus FAIL, originales y PASS parciales permanecen. Esto es un cambio de requisito autorizado, no un PASS retrospectivo ni una demostración de causalidad de Miniflare.
2. **Controles y producto:** el traslado conserva ambas eras, SDK2.3.1/Node fetch remoto reales, versiones/contratos y controles C07/C08/C09. Mantiene producto192dcdd y prohíbe cambios de producto/configuración/SDK/contratos o escrituras para acomodar el entorno. No exige drenar antes de los rechazos403/415/406.
3. **C09 en plataforma:** para los casos expresamente nombrados90/91 y2/3, registrar «no determinable en plataforma» sin convertirlo en FAIL/PASS es coherente con límites por isolate. Hace falta la decisión posterior del propietario sobre la evidencia exacta para aceptarlo; la admisión actual no la presume ni concede cuota global.
4. **Intentos del harness:** §5 sustituye explícitamente la prohibición anterior de continuar ante cualquier fallo por un encargo acotado: máximo3intentos o2horas por bloqueo, conservando originales y STOP directo en sus causas enumeradas. No elimina límites de ejecución ni contadores de auditoría. Se interpreta «sin retries» como ausencia de reintentos automáticos para buscar un resultado favorable; los intentos correctivos explícitamente autorizados sólo pueden ocurrir dentro de§5 y del presupuesto total≤320. Agotar cualquiera de esos límites obliga a parar.
5. **Autoridad de promoción:** §6 contiene autorización expresa condicionada a gates, decisiones C09, R3/5PASS del mismo auditor, revert preparado antes de merge y smoke≤20. No habilita main/producción ahora ni antes de esas condiciones; preserva rollback inmediato si falla el smoke. La prohibición de scans/score rige este encargo: no se presentan como ejecutados o aceptados los controles de medición que quedan fuera.

Estos puntos no necesitan que el auditor reescriba la historia ni declare que el código pasó. Para su aplicación debe archivarse el texto íntegro y cualquier respuesta esencial posterior en suplemento separado, con identidad fija y alcance de sustitución. La selección de archivos/descriptores, receipt y equivalencia restringida de contacto de adenda1 no quedan dispensados.

## A2-H1 — 500 esperado por deadline frente a STOP directo por 500

**Aclaración esencial pendiente, ya identificada por coordinación.** SDD vigente§5 prescribe abortar el intercambio a10s sin éxito; el runtime y sus tests registrados usan HTTP500/JSON-RPC-32603 sanitizado para el caso de body que queda abierto y la recuperación posterior. La nueva decisión§5 ordena STOP directo ante un500 del producto en preview, mientras§2.4 exige ejecutar ese deadline.

No se puede ejecutar la expectativa existente y simultáneamente tratar su resultado esperado como STOP no exceptuado sin una decisión del propietario. La pregunta ya pendiente debe resolver si ese **único caso contractual de deadline** queda exceptuado y bajo qué evidencia se identifica, o si se detiene ese control. No interpretar una excepción como permiso para cualquier500 sanitizado, ni cambiar el producto o fabricar otro status. Todo500 inesperado y todo error atribuible al producto mantienen STOP directo.

**Disposición:** no ejecutar la parte dependiente hasta la respuesta. Esta admisión no presupone la excepción ni emite PASS de C09.

## A2-H2 — Cuota POST120/121 no cubierta por la regla explícita «no determinable»

**Otro punto esencial pendiente.** Decisión§2.4 exige cuotas90/91 y **120/121→429 con recuperación**. §4 define «no determinable en plataforma» explícitamente para90/91 y2/3. La cuota POST120/121 también vive por isolate; puede no reproducirse de manera determinista por la misma distribución de peticiones.

Si121 no produce429, el texto actual no fija si ese caso se incorpora a la decisión posterior de C09 no determinable o permanece como incumplimiento que debe parar. Extender la excepción nombrada sólo para90/91 y2/3 sería una decisión normativa por inferencia del ejecutor/auditor.

**Respuesta necesaria del propietario:** definir expresamente el tratamiento de120/121 cuando la plataforma no permita determinar la frontera por isolate, conservando status/Cf-Ray/colo y condiciones temporales exactas; o exigir esa frontera y STOP si no se demuestra. No buscar un429 mediante reintentos ni declararlo PASS por las pruebas unitarias anteriores.

**Disposición:** no ejecutar esa parte dependiente hasta cerrar su interpretación. El resto de datos por isolate y los controles de cuota no se modifican en esta consulta.

## Límites de aplicación y entrega

No se identificaron otros bloqueantes de fondo en el alcance documental leído. No es una revisión del futuro harness ni una afirmación de que su plan operacional o implementación sean correctos. Presupuesto≤320 comprende las solicitudes efectivas del encargo, incluidos handshakes, negativos e intentos permitidos; no se reinicia por bloqueo/colo/cliente. Deben conservarse originales de cada intento y detenerse al límite o ante una causa de STOP directo.

La whitelist excluye contacto/admin/AI/escrituras, followlinks y tráfico al dominio de producción durante preview. SDK/transport reales y UA identificado no acreditan por sí solos identidad de un proveedor. Preview necesita receipt/build/versión/URL/SHA reales del commit servido; si una actualización del harness/documentación genera un nuevo Commit Preview, no atribuirle el receipt anterior ni el SHA192 sin cotejo de producto/build e identidad correspondientes.

**Admisión pendiente de A2-H1/A2-H2.** La preparación documental independiente puede continuar; las pruebas dependientes quedan detenidas. Después de las respuestas expresas, incorporar el suplemento preservando el texto del propietario, confirmar las sustituciones y recién entonces ejecutar el encargo autorizado bajo sus límites. No se consume R3/5 mediante esta consulta ni se acepta la implementación, main o producción.

Informe literal externo: `/workspace/f4b-adenda2-admision.md`.
