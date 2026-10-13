# Auditoría independiente de SDD F4B — R1/2

Fecha: 2026-10-13. Dictamen: **FAIL por cuatro bloqueantes**. No autoriza programación, congelado ni ratificación de esta SDD. Queda una revisión disponible, R2/2, con este mismo auditor; un segundo FAIL implica STOP, sin tercera revisión ni reinicio de contador.

## Identidad, independencia y alcance

- Intento: **1 de 2** del encargo de auditoría SDD F4B.
- Auditor: agente independiente `/root/f4b_auditor`; configuración asignada explícitamente **GPT-6.1 Sol / high** (`gpt-6.1-sol`, `high`). Distinto del autor/corrector Sol/high. No se homologaron retrospectivamente los modelos de informes F4A.
- Snapshot auditado: `d45c76e1da40b0465022f455b9edf7efba2785db`.
- Tree comprobado: `a445586d013c0843e4f03a729bfc17ade9b32c85`.
- Worktree del auditor: `/workspace/ctpv-f4b-auditoria`, **DETACHED**, creado sobre ese snapshot.
- Base técnica: `cb8e10f1ead55ef0dafc666672cd3003252afc59`, tree `2727f993981f3cbbd144b802b08f13d072d11773`.
- Captura documental F4A adicional: `01ec8f879197b7dd21aa3344726fb0731477c127`, consultada con `git show`, sin incorporarla al worktree ni atribuirle cierre de producción final.
- Fuente evaluada: `docs/agent-readiness/fases/f4b-mcp-remoto.md` y sus referencias fijadas. La preparación anterior se leyó como antecedente expresamente sustituido, no como autorización vigente de implementación.

Se evaluó exclusivamente la ejecutabilidad y coherencia normativa de la SDD, con bloqueantes materiales. No se corrigió SDD ni producto. No se ejecutaron builds, suites del producto, tools del sitio, despliegues, sesiones adicionales, main, push, PR, issues ni mutaciones externas. Se descargó en lectura el paquete oficial para inspeccionar sus bytes y exports; eso no fue una prueba del producto.

## Fuentes y evidencia consultadas

1. `AGENTS.md`, `docs/agent-readiness/plan.md` y `sdd.md`; contratos F3, contratos F4A y SDD F4A-seguimiento D33–D35; cierres técnicos F4A-1/F4A-2 y cierre técnico de seguimiento en la captura `01ec8f…`.
2. Paquete `docs/agent-readiness/preparacion/f4b/`: README, dependencias, diseño preliminar, ownership, checklist, verificación y referencias primarias archivadas.
3. Manifest y fuentes de `docs/agent-readiness/evidencia/f4b/referencias/`: versioning, MCP basic actual, SEP-2127, Server Card README/discovery/schema, metadata npm server/client y extractos de SDK. Los **ocho originales con archivo en el manifest** coinciden en bytes y SHA-256. Los 404 registrados no se convirtieron en fuentes válidas ficticias.
4. Código real: `src/scripts/agent-tools.ts`, módulos puros calidad-vida/movilidad/contrato, `src/lib/agent-api/runtime.ts`, `src/agent-api/schema.json`, capabilities, generador agent-api, `src/worker.ts`, package/lock, Wrangler y CI existente.
5. Tarball oficial `https://registry.npmjs.org/@modelcontextprotocol/server/-/server-2.3.1.tgz`, lectura el 2026-10-13: **1 537 977 bytes**, SHA-256 `96bc3fe00cbc9a72093a3f91c531387a5f988ea34d09e6c34a9a6b77dd0dc518`, integrity SHA-512 **coincidente** con metadata npm archivada. Extraído en `/tmp/f4b-auditor-sdk231/package`; inspección estática de package exports, handler, proveedor Workers, McpServer, conversión Standard Schema y codecs modernos/legacy.

Reproducciones de lectura realizadas: parseo del manifest y hashes; lectura del mapa `exports`; aplicación del patrón archivado ServerCard al nombre contractual. No se instaló ni ejecutó el SDK.

También se consultó en lectura la fuente primaria vigente `https://modelcontextprotocol.io/specification/2026-07-28/schema.md`: 701 659 bytes, SHA-256 `c877bcbc6a26793d48a0c20cb3e7d4ef1cbb2d41cb194b3b73127ac561809bc3`, conservada en `/tmp/f4b-auditor-mcp-schema.md`. Confirma el contrato UnsupportedProtocolVersionError de la fuente primaria archivada `preparacion/f4b/fuentes/sdk-schema.txt`.

## Bloqueantes

### B1 — Import obligatorio no exportado por el SDK fijado

**FAIL — C02; afecta C04/C08.** SDD §3, línea 41, exige `CfWorkerJsonSchemaValidator` desde **`@modelcontextprotocol/server/validators/cfWorker`** y afirma firmas verificadas.

El `package.json` real de server **2.3.1** exporta el subpath **`./validators/cf-worker`**, cuyo target import es `./dist/validators/cfWorker.mjs`. **No exporta `./validators/cfWorker`**. Un nombre de archivo interno no es un subpath público del paquete. El archivo `sdk-api-observada.txt` no acredita ese import incorrecto.

Reproducción sin ejecución: leer `package.exports` del tarball fijado y comprobar pertenencia de ambas keys. Resultado observado: `./validators/cfWorker` = false; `./validators/cf-worker` = true. La implementación literal incumple resolución de exports y no puede empaquetar/arrancar con el contrato fijado.

**Criterio de resolución:** la SDD debe fijar un import público que exista en ese paquete exacto, coherente con constructor/proveedor/fromJsonSchema y con la evidencia estática. El auditor no altera la SDD ni sustituye unilateralmente la dependencia. **STOP del lanzamiento de implementación hasta corregir y reauditar.**

### B2 — Nombre de servidor incompatible con el schema Server Card elegido

**FAIL — C10; afecta identidad C03.** SDD §3, línea 45, fija identidad runtime/card **`name: cuidatuperroviejo`**. §7 exige generar y validar la card con `$defs.ServerCard` del snapshot archivado y que su identidad coincida con runtime.

El schema seleccionado, `referencias/card-schema.txt`, fija para `ServerCard.properties.name`:

```json
{"pattern":"^[a-zA-Z0-9.-]+/[a-zA-Z0-9._-]+$","minLength":3,"maxLength":200,"type":"string"}
```

La fuente describe explícitamente un namespace en formato reverse-DNS y exactamente una barra que lo separa del nombre. El nombre contractual carece de esa barra. Reproducción: aplicar ese patrón a `cuidatuperroviejo` devuelve **false**. La descripción contractual tiene 76 caracteres y sí cabe en su límite100; el fallo identificado es el nombre, no una preferencia de redacción.

El build que aplica la validación real exigida por la propia SDD debe rechazar la card. Saltar ese patrón, validar la raíz vacía o declarar una identidad distinta en runtime para pasar contradice los requisitos de C10.

**Criterio de resolución:** arquitectura debe fijar una identidad única aceptada por el schema elegido y coherente en runtime, card y registro, o una decisión explícita distinta sobre el contrato de card. El auditor no inventa el nombre ni otro formato. **STOP del alcance dependiente de identidad/card y del lanzamiento hasta reauditoría.**

### B3 — La admisión previa al slot contradice el límite duro durante la lectura del body

**FAIL — C09; afecta C08.** SDD §5, líneas 97/101, fija lectura streaming, deadline desde el comienzo de la lectura del body y **«2 intercambios activos por isolate»**, con retención del slot hasta que body y trabajo residual hayan terminado. La misma línea101 exige **«Entrada malformed rechazada antes de slot/cálculo»**.

Una entrada cuyo JSON/envelope/UTF-8 es malformed sólo puede reconocerse leyendo el body. Si la lectura/validación se hace antes de adquirir slot para cumplir esa frase, la concurrencia de lecturas de body queda fuera del cap2. El rate ledger permite múltiples POST simultáneos durante la misma ventana y no impone una cota de lecturas activas igual a2. Body32KiB y deadline10s acotan cada petición, pero no restauran la garantía de dos intercambios.

**Reproducción contractual:** tres POST simultáneos con host/origin/MIME/Accept válidos, dentro de la cuota, entregan cada uno el prefijo `{` y mantienen abierto el resto del body menos de10s. La validez/malformed aún no puede decidirse. Admitir tres readers antes de slot viola el límite duro; adquirir slot antes de leer contradice la prohibición literal para las entradas que luego resulten malformed. Este es un conflicto de contrato, no un fallo observado de un producto aún no implementado.

**Criterio de resolución:** cerrar explícitamente el orden de admisión y qué trabajo de lectura/validación queda incluido en una cota finita y comprobable; distinguir rechazos decidibles por headers de los decidibles sólo tras leer body. Debe existir un test slow-body con tres intercambios y un test malformed que permitan cumplir todas las reglas simultáneamente. El implementador no debe resolver la contradicción por interpretación silenciosa. **STOP del diseño dependiente de admisión/bounds y del lanzamiento hasta reauditoría.**

### B4 — Sanitización elimina un campo requerido de UnsupportedProtocolVersionError

**FAIL — C03/C07.** SDD §5, línea88, exige HTTP400/error `-32022` con `data.supported:[2026-07-28]` y **«sin requested reflejado»**.

El schema primario del protocolo2026-07-28 define `UnsupportedProtocolVersionError.error.data` con ambos miembros obligatorios **`supported:string[]` y `requested:string`**, sin marcador opcional. La fuente primaria archivada `sdk-schema.txt`, líneas483–501, y el SDK2.3.1 (`UnsupportedProtocolVersionErrorData`) coinciden. La consulta primaria vigente conserva ese contrato; su ejemplo de revisión no soportada `1900-01-01` devuelve exactamente `requested:"1900-01-01"` dentro de data.

**Reproducción contractual:** una petición moderna con versión declarada y header coincidentes `1900-01-01`, envelope válido y método permitido debe recibir el error de revisión no soportada. El cuerpo exigido por la SDD omite `requested`; no satisface el error reservado del protocolo que dice implementar. Permitir que el SDK lo incluya incumpliría la prohibición de la propia SDD. La sanitización del texto de `message` sí puede seguir genérica; eliminar un campo obligatorio es otra cosa.

**Criterio de resolución:** cerrar una política de versión recibida y validación/acotación que permita emitir el error con sus campos obligatorios, sin reflejar datos arbitrarios ni exceptions. Debe haber fixture completa de versión válida no soportada y de valor malformed, con la precedencia definida. El auditor no impone una nueva gramática ni rellena ese contrato. **STOP del alcance de errores/negociación y del lanzamiento hasta reauditoría.**

## Evaluación documental del resto del alcance

“PASS documental” significa contrato coherente sobre las fuentes inspeccionadas; no acredita implementación, workerd, preview ni producción. Los bloqueantes anteriores siguen determinando el FAIL global.

| Área / criterios | Resultado | Evidencia y límite |
|---|---|---|
| Base, admisión y F4A — C01 | PASS documental | SHA/tree fijados; diff del snapshot respecto a base sólo docs; cierres técnicos accesibles. Excepción de desarrollo paralelo autorizada por el propietario y gate de cierre F4A final separado. No se asume cierre de producción por presencia del código en main. |
| SDK / Workers — C02 | FAIL B1 | API McpServer/createMcpHandler/fromJsonSchema real; import contractual del proveedor incorrecto. Bundle/startup reales se exigen como gates futuros, sin afirmar que ya pasaron. |
| Versiones y transporte — C03/C07 | FAIL B4; identidad condicionada a B2 | SDK soporta per-request moderno y fallback legacy stateless; discover filtra revisiones modernas. Tabla de métodos, sesión rechazada, headers/metadata, unknown method, response/batch y Accept/MIME están acotados. Sanitización de -32022 omite campo obligatorio. Cliente real debe verificar wire moderno y initialize legacy explícito. |
| Tools y schemas — C04 | PASS documental, condicionado a B1 | Exports INPUT_SCHEMAS/TOOLS existen y los cuatro nombres/orden y módulos puros coinciden; output defs existen. Validator Workers y validación previa evitan convertir input inválido en éxito o reflejar mensajes upstream. Se distingue tool error de estructura externa inválida. |
| Búsqueda/lectura — C05 | PASS documental | createAgentApiWorker existe; caché WeakMap por ASSETS ya es reutilizable. GET interno fijo con next cerrado preserva normalización F3, rawquery2048, corpus, pertenencia, UTF-8/hash y Markdown íntegro. No hay algoritmo de búsqueda duplicado ni autofetch público. |
| Cálculos — C06 | PASS documental | evaluateQualityOfLife/recommendMobilityAids existen. Base real usa >50 y >35; fixtures34/35/36/49/50/51 y todos5→35 compromised son D33 correcto. Se preservan seis combinaciones, outputs/avisos y exclusión de afiliados. |
| Bytes/metadata/tiempo — C08 | PASS documental salvo B3 | Caps inclusivos y +1, UTF-8 fatal, no decompression, output completo/SSE sin truncar y domain schema cerrado están definidos. No se eleva ni modifica F3. Expansión y memoria/CPU deben medirse en implementación. |
| Abuso/concurrencia/cancel — C09 | FAIL B3 | Ledger64keys/TTL60s/reserva y cuotas locales explícitas, sin falsa cuota distribuida. Retención residual/cancelación moderna y limitación cross-POST legacy se declaran; esa limitación aceptada no es bloqueante. Falta coherencia de admisión durante lectura. |
| Origin/CORS/headers — C07/C11 | PASS documental en esta área; error B4 separado | Origin exacto/same-origin, ausencia permitida, host/preview/local acotados, sin wildcard workers.dev; OPTIONS/headers, no-store y seguridad existentes preservados. Runtime real todavía no verificado. |
| Card/discovery — C10 | FAIL B2 | Adoptar draft experimental expresamente es una decisión arquitectónica válida; SEP Final no se confunde con graduación wire. URI remoto404 explícito y validación local $defs son correctos. Registro/generación/ARD/schema/Link/llms están definidos como delta aditivo; nombre impide cumplir schema. |
| Ownership/integración/regresión — C01/C11 | PASS documental | Ownership y shared integration únicos; preservación UI/WebMCP/F3 y OpenAPI1.2.0; STOP ante archivo esencial fuera de alcance. Excepción a reglas anteriores es explícita y no autoriza main. |
| CI/workerd/cliente/preview/evidencia — C12 | PASS documental | Suites pertinentes existentes y tests nuevos alcanzados por globs, build explícito, workerd real sin remoteBindings, cliente real, SHA final/receipt/manifest y originales separados. Mocks/local no sustituyen preview; ausencia esencial exige STOP. No se corrieron estos checks ahora. |
| Auditoría/promoción/rollback — C13/P01–03 | PASS documental | Contadores2/5 y STOP, ratificación por coordinación, gate F4A real, permiso separado de promoción, receipt nuevo y medición posterior comparables; rollback coherente exige preservar F4A y ensayo previo. No se simulan commits de reversión todavía inexistentes. |

## Observaciones no bloqueantes

1. **Proyección legacy de outputSchema:** los output schemas raíz `{ $schema, $ref, $defs }` son typeless. En SDK2.3.1 `standardSchemaToJsonSchema` no sigue `$ref` para demostrar raíz object; el codec legacy envuelve schema bajo `properties.result` y `structuredContent` bajo `{result: resultado}`. Moderno conserva la forma natural. La SDD permite explícitamente que el SDK adapte la era; por ello no se convierte en bloqueante adicional. Las fixtures del cliente deben recoger esta proyección y comparar el objeto de dominio con el oracle, sin asumir wire idéntico entre eras.
2. **Preparación y plan históricos:** conservan reglas sin solapamiento, defaults antiguos y estados previos. La SDD identifica su sustitución y la autorización nueva; no es motivo para exigir editar documentos ratificados F4A ni para revocar el permiso de desarrollo paralelo. El cierre final F4A sigue gate de integración/publicación.
3. **Evidencia por obtener:** esta auditoría no demuestra startup, presupuesto/viabilidad Free, cancelación de red, límites bajo workerd, cliente/evaluador real, preview ni receipt F4B. La SDD los exige al implementador; ausencia hoy, antes de programar, no equivale por sí sola a un FAIL adicional de SDD. Tampoco acredita identidad de proveedor mediante User-Agent ni ejecución MCP mediante la sola card.

## Disposición y continuidad

Devolver B1–B4 al autor/coordinación; este auditor **no corrige**. No iniciar implementación sobre R1 FAIL. Corregir sólo los contratos bloqueantes y entregar otro snapshot SHA/tree fijo para **R2/2 con el mismo auditor**. Se conserva este contador y sesión; no se ha abierto ni ejecutado R2. Si R2 es FAIL, STOP definitivo de este ciclo, sin tercer intento.

El informe se entrega fuera del ownership de producto, en `/workspace/f4b-auditoria-sdd-r1.md`, para su incorporación literal por coordinación al ownership F4B. No se creó un issue externo por la restricción expresa del encargo de auditoría.
