# Auditoría independiente de SDD F4B — R3 adicional autorizada

Fecha: 2026-10-13. Dictamen: **PASS documental, sin bloqueantes en B5 ni en el delta autorizado**. Esta es la única revisión adicional autorizada expresamente por el propietario; conserva los dos FAIL anteriores y el contador histórico, sin nuevo ciclo ni reset. El PASS permite archivar el dictamen y someter el snapshot a ratificación/congelado; no autoriza por sí solo programación previa a esa ratificación, integración, promoción ni producción.

## Identidad, historial y excepción

- Auditor independiente: misma sesión/agente `/root/f4b_auditor`, configuración asignada explícitamente **GPT-6.1 Sol / high** (`gpt-6.1-sol`, `high`), distinto del autor/corrector Sol/high.
- R1/2: **FAIL B1–B4**, snapshot `d45c76e1da40b0465022f455b9edf7efba2785db`, tree `a445586d013c0843e4f03a729bfc17ade9b32c85`. Informe16614bytes, SHA-256 `636ebb6a670782ecd95d7e5bec47b0ee060e7e95137e595cf147d2538c898e5b`.
- R2/2 final del presupuesto original: **FAIL B5 nuevo**, con B1–B4 resueltos; snapshot `84e983abe3650b54f30a1e4367711ce8cd340225`, tree `564d20ab045f8750462182b705113e021cb0e8a5`. Informe9542bytes, SHA-256 `004c609abe33365c3062a2308e131620d3d79aa577f79d9c05c63771394f73db`.
- Después del STOP original, el propietario respondió **«Autorizo»** a la propuesta de corregir sólo B5, añadir petición válida sin clientInfo y admitir **una única revisión adicional del mismo auditor**. La instrucción explícita fue transmitida por coordinación y registrada en `docs/agent-readiness/evidencia/f4b/excepcion-sdd-r3.md`. No se infirió permiso de los informes previos.
- Intento actual: **R3 adicional bajo esa excepción**, tercero histórico, único adicional. No se renombra como R1 ni se inicia otro presupuesto de dos intentos. La excepción mantiene que un R3FAIL implicaría STOP sin corrección o revisión adicional.

## Snapshot y alcance

| Identidad | Valor comprobado |
|---|---|
| SnapshotR3 | `d5b57df26d6242572a29901f8dfb94468b95da6a` |
| TreeR3 | `25689e34f67afe9d18a1d3507f9ea7e3e820aa97` |
| Base técnica aceptada | `cb8e10f1ead55ef0dafc666672cd3003252afc59` |
| Tree base | `2727f993981f3cbbd144b802b08f13d072d11773` |
| Captura documental F4A adicional | `01ec8f879197b7dd21aa3344726fb0731477c127` |
| Worktree auditor | `/workspace/ctpv-f4b-auditoria`, **DETACHED**, limpio |

Se actualizó únicamente el worktree propio; no se modificó el del autor. Se revisó sólo la resoluciónB5 y la ausencia de contradicción material nueva en el deltaR2→R3. El diff tiene cinco archivos documentales: SDD, fixture de negociación, copia literal del informeR2, STOP histórico y excepciónR3. El único cambio de contrato es opcionalidad de clientInfo; el resto es archivo/estado/gobernanza.

No se corrigió SDD ni producto. No se ejecutaron instalaciones, SDK, builds, suites/tests del producto, clienteMCP, llamadas al sitio, preview, scanner, deploys ni mutaciones externas. No se usaron subagentes, sesiones nuevas, main, push, PR o issues. Las comprobaciones consistieron en lecturas de fuentes/Git, parseo JSON documental, comparación de casos y hashes.

## Fuentes y verificaciones

Se conserva la lectura de AGENTS, plan/método, contratos F3/F4A y seguimientoD33, cierres técnicos, preparaciónF4B y primarias fijadas de R1/R2. Para esta revisión se leyó íntegramente el delta de SDD y fixture, excepciónR3 y STOP histórico.

Primarias relevantes para la corrección:

1. `evidencia/f4b/referencias/mcp-basic.txt`, sección Per-request protocol fields, tabla que marca protocolVersion y clientCapabilities **Required: Yes** y clientInfo **Required: No**, con SHOULD y excepción por configuración del cliente. Original24001bytes, SHA-256 `67a62de95bdc816ff96e8d5c69b0fc19237191f42805846e2ec8f8d7063e123e`.
2. `preparacion/f4b/fuentes/sdk-schema.txt`, RequestMetaObject con `"io.modelcontextprotocol/clientInfo"?: Implementation`.
3. SDK oficialserver2.3.1 ya obtenido en R1 en lectura, integritySHA512 coincidente,1537977bytes, SHA-256 `96bc3fe00cbc9a72093a3f91c531387a5f988ea34d09e6c34a9a6b77dd0dc518`. Inspección en `/tmp/f4b-auditor-sdk231/package`: esquema2026 `ImplementationSchema.optional()`, REQUIRED_ENVELOPE_KEYS sin clientInfo y aceptación explícita de su ausencia. `_ondiscover`/codec confirman supportedVersions sólo modernas, capabilities y serverInfo en metadata de resultado.

El informeR2 archivado coincide byte a byte con el original externo y con su hash `004c609a…`. El STOP se conserva como historial; la nueva excepción y§9 fijan expresamente la autoridad posterior, sin borrar los FAIL.

## B5 y coherencia del delta

**B5 — PASS.** SDD§3, línea57, ahora declara dos veces sin ambigüedad que clientInfo es **opcional**. Sólo se valida conforme Implementation cuando está presente; su ausencia es válida y no cambia admisión, soporte, cuotas ni capacidades. ProtocolVersion/clientCapabilities mantienen sus reglas y no se vuelven opcionales. Desaparece la exigencia incompatible que causó el FAIL de R2.

La fixture añadida `clientInfo-omitido-valido` contiene headersmodernos coincidentes, método `server/discover`, versión2026-07-28 y clientCapabilities `{}`, sin clientInfo. Espera HTTP200, ausencia de errorJSON-RPC y subset de resultado con resultTypecomplete, supportedVersions2026-07-28, tools y serverInfo del nombre/versión fijados. Se etiqueta como contrato documental no ejecutado; no se presenta como evidencia de runtime.

El uso de un **subset** admite los campos adicionales conformes del SDK; `capabilities.tools:{}` en ese subset no elimina ni afirma igualdad exacta contra `listChanged:false`. El subset se corresponde con la estructura moderna observada estáticamente en `_ondiscover` y el codec. No inventa un handshake moderno ni exige clientInfo para descubrir.

Comprobación documental: los dos casos anteriores (`version-fecha-no-soportada` y `version-malformed-sin-reflexion`) permanecen **idénticos como objetos**. Sólo se agrega el caso de B5 y se actualiza la etiqueta del artifact. SHA-256 del JSON nuevo: `190a2de67b07bee3f9800e14542b0312d3f53fae1b94f4ff18dcb8ee85829b94`.

**Delta sin bloqueantes materiales nuevos — PASS.** No cambia SDK/protocolo, funciones/contratosF4A, D33, tools, rutas/identidad/card, límites, cuotas, seguridad, sesiones/cancelación, ownership ni gates de publicación. B1–B4 conservan su resolución documental registrada en R2. El encabezado conserva el presupuesto original y remite de inmediato a la excepción concreta;§9 define el procedimiento adicional. El STOP histórico y el estado actual no constituyen una contradicción ejecutable: documentan cronología y autorización posterior.

## Observaciones y límites, separados del dictamen

- Permanece la observación no bloqueante de R1 sobre proyecciónlegacy de outputSchema/structuredContent: las pruebas futuras compararán el objeto de dominio tras adaptaciónSDK; no se exige wireidéntico entre eras. No se abrió una corrección opcional.
- Este PASS es de **SDD**. No demuestra startup/bundleWorkers, límites/concurrencia/cancelación real, paridad de ejecución, cliente, presupuesto, preview, receipt ni producción. La implementación debe satisfacer sus criterios con evidencia real y auditoría independiente, sin convertir fixtures documentales en resultados ejecutados.
- La autorización de desarrollo paralelo sobre la base técnica aceptada sigue vigente según el encargo, pero **integración/publicación F4B continúan bloqueadas hasta cierre F4A real aceptado y evidencia accesible**, además de los demás gates y autorización de promoción. No se atribuye cierre final a la mera presencia del código en main ni se heredan receiptsF4A como pruebaF4B.

## Disposición

**R1FAIL → R2FAIL/STOP → excepción explícita limitada → R3 adicional PASS.** Historial y contador conservados; no se concede revisión adicional nueva ni se reinicia el proceso.

Coordinación puede archivar literalmente este informe y ratificar/congelar el snapshot con SHA/tree completos y delta documental explícito. Sólo después corresponde iniciar el encargo de implementación autorizado, manteniendo sus límites y auditoría propios. El auditor no ratifica su propio dictamen como implementación ni realiza el trabajo del autor.

Informe externo completo: `/workspace/f4b-auditoria-sdd-r3.md`. Fuente auditada inmutable y worktreeDETACHED limpio.
