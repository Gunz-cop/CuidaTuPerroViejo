# Diseño preliminar F4B

**Propuesta no ratificada. Toda integración de F4A está PENDIENTE.** Los valores numéricos propios de F4B en este documento son candidatos para auditoría y presupuesto, no contratos aceptados. Las rutas citadas de F3 sí pertenecen al contrato vigente. No se adjudican nombres, rutas o schemas a cálculos futuros.

## 1. Resultado y opción recomendada

Permitir a un cliente remoto descubrir el servidor, buscar guías, leerlas completas y ejecutar los cálculos puros aceptados en F4A, con las mismas reglas y resultados que API/UI. La lectura editorial no usa un modelo, ni el asistente generativo, ni contenido alternativo.

**Recomendación preliminar:** adaptar el SDK oficial `@modelcontextprotocol/server@2.3.1` con `createMcpHandler` y una fábrica de servidor por petición al entrypoint Worker existente. Usar su transporte web estándar, sin framework HTTP nuevo, sin Durable Objects, KV de sesiones, base de datos ni cookies. Una instancia MCP no se comparte entre peticiones. Los datos/editorial caches validados sí pueden reutilizarse según los contratos existentes; nunca estado del cliente.

| Opción | Ventajas | Costes y límites | Decisión preliminar |
|---|---|---|---|
| SDK oficial v2 directo, handler fetch | Compatibilidad web estándar documentada, soporte moderno/legacy en un endpoint, dependencia de transporte menor | F4B debe aplicar dispatch exacto, CORS, Host/Origin, límites y errores sanitizados | **Recomendada**, condicionada a prueba workerd y congelado |
| `agents@0.28.0`, wrapper `agents/mcp/server` | Configuración Workers de ruta/CORS/Origin y fábrica integrada | Mayor superficie/dependencias; peers MCP 2.0.0; matching de Origin por hostname no equivale a política exacta de origen | Alternativa si evidencia posterior demuestra beneficio; no combinación supuesta con SDK 2.3.1 |
| SDK legacy v1 / transporte con sesiones / McpAgent | Sirve clientes que requieren estado, push o replay | Correlación, aislamiento, TTL, almacenamiento, coste; API McpAgent documentada como deprecated | No justificada para lectura y cálculos breves; requiere necesidad real y otra decisión |
| JSON-RPC implementado a mano | Control directo | Negociación, metadata, errores, cancelación y compatibilidad a mantener por el sitio | No recomendado |

El SDK publicado incluye un proveedor `CfWorkerJsonSchemaValidator`, adecuado para evitar basar la validación runtime en generación dinámica de código de Ajv. Ajv del repo es una herramienta de build y no acredita compatibilidad runtime. Propuesta: reutilizar schemas de dominio aceptados vía Standard Schema / proveedor Workers, sin compilar schemas suministrados por usuarios ni resolver `$ref` remotos. Fijar versión/export/constructor del proveedor y biblioteca de schemas en el contrato final. **Compatibilidad bundle/startup/runtime con la configuración real: PENDIENTE, G03.** No cambiar `compatibility_date`, flags o stack para darla por resuelta.

## 2. Protocolo, inicialización y transporte

Protocolo moderno objetivo **`2026-07-28`**; compatibilidad objetivo **`2025-11-25`** para el requisito del plan de inicialización y clientes legacy. Las revisiones anteriores que soporte el SDK por defecto no se convierten automáticamente en compromiso del producto: congelar lista permitida, negociación y listado real después de la prueba. No declarar conforme al protocolo moderno un endpoint que sólo responda `initialize`.

| Aspecto | Moderno 2026-07-28 | Legacy objetivo 2025-11-25 |
|---|---|---|
| Inicio | Cada petición es independiente; `server/discover` obligatorio en servidor, opcional para cliente | `initialize`, resultado negociado, después `notifications/initialized` |
| Identidad/capacidades/versionado | `_meta` por petición; versión también en HTTP | Handshake y header de versión en peticiones posteriores |
| Tools | `tools/list`, `tools/call`; resultados incluyen `resultType: complete` | Mismos métodos, envelope de la revisión legacy |
| Sesión | Sin sesión de protocolo | Session ID opcional; propuesta: no emitirlo, fábrica stateless |
| Cancelación HTTP | Cierre del stream SSE cancela **esa petición** | Desconexión no debe interpretarse por sí sola como cancelación; notificación explícita, correlación pendiente |
| GET/DELETE | No proponer stream independiente ni gestión de sesión | 405 compatible si no se ofrecen SSE independiente/eliminación de sesión |

Un único endpoint exacto de transporte; `/mcp` aparece **como propuesta del plan, no ruta congelada**. No crear aliases ni adivinar subrutas. Dispatch anterior a negociación editorial/F3/Astro sólo para la ruta finalmente acordada; el handler upstream atiende cualquier path si no se restringe delante. `run_worker_first` final debe incluir el transporte, incluso cuando ASSETS respondería antes; comprobar también su card. La base actual tiene `/api/*` y `/admin/*`, y F2 genera reglas adicionales: no activar `run_worker_first: true` ni reemplazar la lista sin revisar la composición real después de F4A.

POST recibe una petición o notificación JSON-RPC UTF-8 por intercambio, no batch. `Content-Type: application/json`; cliente declara Accept con JSON y SSE. Propuesta **SSE acotado por petición** (`responseMode: sse`) para conservar la señal de cancelación moderna; no progress/logging remoto ni suscripciones largas. Preparar el resultado y verificar su tamaño **antes** de entregar el evento final. Cliente compatible debe aceptar también respuestas JSON de discovery/error/legacy. `X-Accel-Buffering: no` en SSE según recomendación normativa. No anunciar replay/Last-Event-ID.

Headers modernos obligatorios: `MCP-Protocol-Version`, `Mcp-Method`, y `Mcp-Name` para `tools/call`; validar coincidencia con cuerpo, incluida codificación sentinel Base64 cuando corresponda. `_meta` incluye versión, clientInfo y clientCapabilities conforme al schema MCP. No trasladar `q`, datos de cálculo o IDs editoriales a headers mediante `x-mcp-header`: no existe necesidad de routing por esos datos. Header–body mismatch → HTTP400/error `-32020`; versión moderna no soportada → HTTP400/error `-32022`; método MCP moderno desconocido → HTTP404/error `-32601`. Revisión legacy usa sus propias reglas; un `initialize` sin header no se rechaza aplicando reglas modernas indiscriminadamente.

Sólo anunciar tools y mecanismos básicos realmente soportados. No habilitar resources/prompts, roots, sampling, elicitation, tareas, Code Mode, MCP Apps o subscriptions por comodidad del SDK. Un método de extensión no anunciado no debe abrir trabajo/streams. Congelar política para `ping`, notificaciones y métodos no expuestos. SDK no autoriza por sí mismo la superficie deseada.

## 3. Reutilización F3 y punto de integración F4A

Hecho de la base: `src/lib/agent-api/runtime.ts` exporta **`createAgentApiWorker`**. La carga de índices, lectura y ranking son funciones privadas. `src/worker.ts` compone ese wrapper con contenido F2 y handler Astro. **No hay export público de búsqueda/lectura independiente que este borrador pueda asumir.**

La autoridad editorial sigue siendo F2/F3: búsqueda AND léxica determinista, pesos 8/3/1 y desempate por ID; lectura íntegra de Markdown/metadata/links; sin snippets alternativos. El corpus activo y pertenencia del ID se validan antes de lectura. API reales:

- `GET /api/agent/v1/search` con `q`, `kind`, `limit`, `offset`, `corpus` según F3.
- `GET /api/agent/v1/documents/{documentId}` con `corpus` según F3.

**Elección final PENDIENTE de F4A (D02/D03).** Preferir las funciones de dominio de búsqueda/lectura que F4A realmente acepte, si las entrega, preservando invariantes F3. Si F4A conserva la interfaz HTTP como autoridad, reutilizar el wrapper F3 **dentro del mismo Worker**, construyendo una petición GET sólo a la operación fija, sin auto-fetch al dominio ni llamadas a la red. El `next` de ese uso no puede delegar a Astro/admin/asistente; toda salida inesperada se rechaza. Esto es una alternativa de diseño, no una extracción implementada ni el anuncio de un export nuevo.

El adaptador valida arguments cerrados, tipos y límites antes de construir query/path; nunca acepta URL, ruta, selector o slug como ID. En la alternativa HTTP, `URLSearchParams` codifica valores previamente validados; el runtime F3 mantiene autoridad para normalización, query total y errores. No tratar una función HTTP privada como contrato compartido sin fijar ownership. Evitar duplicar búsqueda o reimplementar validadores para eludir errores existentes.

Correspondencia conceptual de inputs de contenido, **sin nombres MCP finales**:

| Operación conceptual | Tipos JSON candidatos | Reglas de dominio F3 a preservar |
|---|---|---|
| Buscar | q string; kind enum opcional; limit/offset enteros opcionales; corpus string opcional | NFC/trim de q; 1..200 codepoints y ≤800 bytes **después** de normalizar; 1..12 tokens distintos ≤64 codepoints; no C0/DEL; limit1..20/default20, offset0..98/default0; guard corpus |
| Leer | documentId string; corpus string opcional | Sintaxis F2, ≤160ASCII y membership; corpus64 lowerhex, lectura sin path/fetch arbitrario |

En JSON se rechazan strings con surrogates aislados, números no enteros donde se espera entero, tipos coercionados, null y claves adicionales no contractuales. Los detalles de percent-decoding/query2048bytes de F3 son de la interfaz HTTP, **no** un schema JSON ya aceptado: congelar correspondencia por pares de entradas JSON→GET codificado, incluidas fronteras Unicode. La variante que llama al handler respeta su límite raw2048 y puede rechazar un GET codificado demasiado largo aunque q normalizada quepa; esa diferencia debe documentarse y probarse, no esconderse con normalización anticipada.

En éxito, propuesta `structuredContent` con el objeto exacto F3 y un bloque `content` textual con su serialización íntegra para compatibilidad. No modificar `schemaVersion`, puntuaciones, canónica, avisos, hashes, fechas, links ni newline Markdown. El wrapper MCP añade envelope, no reescribe el documento. Para errores de negocio, `isError: true` y contenido JSON textual sanitizado; no exigirles el outputSchema de éxito.

**Cálculos: PENDIENTE de F4A.** Sólo integrar funciones puras aceptadas, schemas/versiones, unidades, redondeos, umbrales, recomendaciones, avisos y ejemplos del cierre real. No copiar JS del widget ni adaptar sliders por cuenta propia. La herramienta no diagnostica ni decide eutanasia. La lista final y orden estable derivan del registro aceptado, con nombre/versionado MCP fijados durante congelado. Annotations propuestas `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, `openWorldHint: false` para ejecución sobre corpus/cálculos locales; se verifican contra cada implementación y no sustituyen seguridad.

## 4. Schemas y errores

Schemas de arguments/output en JSON Schema Draft2020-12; objetos de dominio cerrados y `$ref` locales autocontenidos. No cerrar indiscriminadamente envelopes o `_meta` del protocolo que admiten extensiones. Las descripciones no son instrucciones privilegiadas. Schemas de cálculo, nombres tool, mensajes/códigos de cálculo y versión de metodología **PENDIENTES de F4A**.

| Capa | Condición | Respuesta preliminar |
|---|---|---|
| Borde HTTP | Origin/Host inválido | 403 sanitizado antes de ejecutar |
| Borde HTTP | Body excedido / MIME incorrecto / abuso | 413 / 415 / 429; 429 con Retry-After; sin inventar códigos MCP reservados |
| JSON-RPC | JSON inválido / envelope inválido | `-32700` / `-32600`; id null si no es recuperable |
| Protocolo | Estructura tools/call inválida / tool desconocida | `-32602`; nombre recibido no se refleja libremente |
| Moderno | Headers ausentes/mismatch; versión no soportada; método desconocido | 400/`-32020`; 400/`-32022`; 404/`-32601`, según spec vigente |
| Ejecución de búsqueda/lectura | Entrada semántica inválida, ID no existente, corpus cambió, datos no disponibles | Resultado tool `isError: true`, preservando códigos/mensajes F3 `INVALID_REQUEST`, `DOCUMENT_NOT_FOUND`, `CORPUS_CHANGED`, `CONTENT_UNAVAILABLE` |
| Cálculo | Validación/metodología/restricción | **PENDIENTE**; mapear errores reales F4A sin inventar |
| Fallo interno MCP | Exception no prevista | Error genérico `-32603`; no stack/path/binding/input |

`ROUTE_NOT_FOUND` y `METHOD_NOT_ALLOWED` de una llamada interna fija F3 indicarían defecto de integración, no un documento ausente; no devolverlos como éxito ni delegar. Semántica: HTTP200 con `isError: true` no es éxito de negocio; HTTP409 F3 se representa como error de herramienta que conserva `CORPUS_CHANGED`, no como ruptura del transporte MCP. Repetir búsqueda con corpus actual antes de encadenar una nueva lectura; no servir un snapshot anterior ficticio.

Congelar tras F4A ejemplos completos de request/response para **ambas revisiones**, schemas emitidos por SDK y mensajes sanitizados byteexactos. El borrador no fabrica ejemplos de tools/call con nombres no existentes. El SDK puede tratar un fallo del inputSchema como ejecución o error de protocolo: inspeccionar versión fija, ajustar el contrato y comprobar observabilidad antes de ratificar; no declarar ambos indistintamente.

## 5. Límites, abuso y sesiones

Presupuestos candidatos, todos pendientes de medición/congelado:

| Recurso | Propuesta | Evidencia requerida |
|---|---|---|
| Body POST UTF-8 | **32KiB**, inclusive; lectura streaming sin confiar sólo en Content-Length | Exacto/+1, chunked, UTF-8 inválido, batch, body lenta; metadatos reales caben |
| Profundidad JSON / metadata | Profundidad16; metadata agregada≤8KiB, dentro del body | Rechazo antes de ejecutar; no recursión ilimitada ni reflection |
| ID JSON-RPC | String ASCII≤128 o entero seguro; sin null como request ID | Compatibilidad de clientes y coincidencia de ID de respuesta |
| Resultado completo serializado | **8MiB** por intercambio, inclusive; envelope+content+structuredContent+framing | Medir ambas revisiones; comprobar todas lecturas completas, máxima expansión de escaping y cálculos F4A |
| Descriptors / lista tools | Cada artifact/listado≤256KiB | Schema/byte counts; no truncamiento ni anunciar sólo parte para caber |
| Tiempo por intercambio | **10s wall** máximo, incluyendo carga; no ampliarlo por progress | Abortar I/O a plazo; CPU medida aparte; no prometer preempción de cálculo síncrono |
| Rate limit | Candidato60POST/60s por IP observada en borde; 30tools/call/60s; aplicar al transporte exclusivamente | Bindings/namespace reales, claves confiables, exacto/rechazo/recuperación/Retry-After; tolerancia eventual explícita |
| Trabajo de contenido | Preservar F3: ≤98docs, índice512KiB, query-index8MiB, Markdown512KiB, corpus16MiB, respuesta F3≤2MiB | Lectura/cache/carga existentes sin incremento implícito |

F3≤2MiB no garantiza MCP≤2MiB: duplicar el objeto en structuredContent y como JSON textual vuelve a escapar caracteres. 8MiB es margen candidato para esa expansión, no justificación para aumentar corpus o truncar fuentes. Si un resultado real excede el cap, fallar antes de transmitir éxito; no recortar Markdown. Si F4A necesita más, detener contrato de salida hasta definir presupuesto y paridad. Las defensas de timeout no detienen por sí solas un bucle síncrono: cálculos deben ser acotados y medidos.

Rate Limiting binding de Workers es **local a ubicación y eventualmente consistente**, no cuota mundial ni contador contable. No reutilizar `ASK_LIMIT`/`ADMIN_LIMIT` ni sus namespaces: pertenecen a otras capacidades. Nombre/namespace/configuración definitivos **PENDIENTES**, propiedad del integrador posterior. Fuente de IP de plataforma confiable sólo en entrada exterior; no confiar en `clientInfo`, `X-Forwarded-For`, header MCP o arguments como identidad. No guardar cuerpos/IP en logs propios ni usar sessionId como autenticación. Capturas de prueba sintéticas pueden verificar el limiter, sin proclamar cuota global.

Sin sesiones persistentes: no emitir MCP-Session-Id, no token/cookie, no TTL/store/replay a mantener. No usar bindings SESSION/contacto existentes. Requests paralelas de clientes con el mismo id no comparten estado. Guard corpus identifica consistencia editorial, **no** sesión ni identidad. Si un cliente exige GET SSE independiente, sesión, replay o cancelación legacy correlacionada, registrar incompatibilidad y detener esa parte; no añadir persistencia anónima por defecto.

**Cancelación:** moderno cierra SSE y SDK propaga AbortSignal; adaptador comprueba señal antes de carga, ejecución y resultado, y la pasa a I/O donde exista soporte. F3 actual no expone signal para sus lecturas internas: no prometer interrupción total; comprobar liberación del stream y trabajo residual acotado. Legacy `notifications/cancelled` en otra POST llega a una instancia distinta; aceptar202 no demuestra que haya cancelado la llamada anterior. **G04 pendiente**: evidencia sobre funciones F4A e integración, limitación explícita o diseño revisado ratificado. No map global anónimo por requestId. Ninguna prueba propia de esta preparación acredita cancelación.

## 6. Seguridad y descubrimiento

Operaciones públicas de lectura/cálculo sin identidad de usuario. La spec recomienda auth, pero este producto no ha definido operación protegida: documentar acceso público deliberado y compensar con alcance acotado/límites. No añadir OAuth, comercio, Web Bot Auth, cuentas o administración. No registrar `/api/ask`, contacto, feedback, correo, pagos o herramientas de código arbitrario.

Propuesta de Origin para transporte: ausencia permitida para clientes HTTP; si presente, validar origen HTTPS exacto aprobado; producción same-origin `https://cuidatuperroviejo.com`, preview y loopback únicamente en sus entornos de prueba. Rechazar null, malformado, wildcard y orígenes no aprobados con403. Nuevos clientes web requieren una decisión de allowlist verificable, no `*` en transporte. El helper SDK compara hostnames ignorando scheme/port: no basta para una política exacta; validar URL/origen antes de usarlo. Host/origen públicos y de preview exactos **PENDIENTES de congelado/plataforma**.

CORS del transporte: OPTIONS204 para origen aprobado, permitir POST y headers Accept/Content-Type/MCP-Protocol-Version/Mcp-Method/Mcp-Name requeridos; completar lista con la versión finalmente elegida. Sin credentials ni Set-Cookie; reflejar sólo Origin validado, `Vary: Origin` si lo selecciona. Errores también conservan CORS aprobado. No cambiar CORS F3 ni otros namespaces. Cache-Control no-store y headers de seguridad F3 preservados en transporte; no filtrar Cookie/Authorization en la petición interna de contenido. No logs de q, arguments, clientInfo, reason de cancelación, IDs elegidos por cliente ni exception strings que contengan esos datos; métricas agregadas de operación/código/latencia/bytes/CPU.

Contenido editorial y consultas son datos no confiables para ejecución. No eval, SQL, shell, regex de usuario, fetch exterior ni resolución arbitraria de URLs. Links externos conservados como texto no se ejecutan ni se descargan. `readOnlyHint` no convierte contenido en instrucciones de sistema ni acredita diagnóstico veterinario.

**Server Card/discovery: parte detenida por G02.** El candidato de extensión utiliza `name`, `version`, `description`, `remotes` con `type/url/supportedProtocolVersions` y `$schema`; no primitives/capabilities ni auth ficticia. Su convención candidata `<URL de transporte>/server-card` **no fija una ruta de producto**. No asumir `/.well-known/mcp.json` ni GET del transporte como card. `application/mcp-server-card+json` es media type candidato observado, sin afirmar registro IANA. AI Catalog/ARD referenciarían la card, no un POST como hyperlink GET.

Generación futura desde registro único aceptado; igualdad de identidad/versiones/endpoints con runtime; ninguna capability anunciada antes de funcionar. Preservar entradas ARD/API/skill existentes, su compatibilidad, Link y llms; ampliación exacta sólo después del contrato real F4A y resolución G02. Card pública puede usar CORS `*`; cache corta o no-store necesita decisión explícita y rollback de caché; no copiar sin más el cap/versionado de descriptor F3. No registrar el servidor en un registry externo en esta fase. La card no prueba ejecución ni acredita identidad criptográfica.

## 7. Costes y mantenimiento

No LLM ni API paga por búsqueda/lectura/cálculo; coste de invocación, CPU, bytes procesados, logs y defensa de abuso. Una interacción legacy mínima suele requerir initialize, initialized, listado y llamadas; moderna no necesita handshake, aunque discover/list son útiles. Contar **cada POST**, incluidos errores/notificaciones, no sólo tools/call. La reutilización interna evita auto-fetch público, latencia y una entrada adicional; ASSETS interno conserva límites F3.

Tarifas primarias consultadas: Workers Free 100000requests/día y10msCPU/invocación; Paid mínimo **USD5/mes por cuenta**, incluye10Mrequests y30MCPU-ms/mes; exceso **USD0.30/Mrequests** y **USD0.02/MCPU-ms**. Memoria128MB por isolate, compartida por peticiones concurrentes. Assets estáticos directos son gratuitos; si pasan por Worker deben analizarse según routing/facturación real. El plan/cuotas disponibles de la cuenta del sitio **no se han verificado**.

Ejemplo ilustrativo sin presupuesto existente: 100000recorridos legacy/mes ×5POST (inicio, notificación, lista, búsqueda, lectura)=500000requests; a10msCPU medio son5MCPU-ms. Caben en inclusión Paid si no hubiera otro uso; **no** son CPU medida ni coste incremental cero del sitio. Fórmula para cuenta Standard: `5 + max(0,R-10M)/1M*0.30 + max(0,C-30M)/1M*0.02`, en USD, antes de logs/servicios/extras y sin duplicar el fijo si ya se paga. Pérdida de10msFree o cuotas compartidas puede hacer inviable ese plan aunque el volumen mensual parezca bajo.

Antes de congelar: confirmar plan/cupo compartido, medir cold/warm CPU/bundle/memoria/bytes en Worker real y escenarios legítimo/pico/abuso, fijar presupuesto mensual, alarmas y control de acceso público que no requiera login. El limiter local no garantiza el techo de factura; si hace falta cuota global estricta, detener y diseñar aparte. No suponer que existe kill switch: su owner/mecanismo quedará fijado después de F4A.

Mantenimiento propuesto: revisión mensual de advisories/releases SDK/Inspector, revisión trimestral de protocolo/card/Cloudflare, atención inmediata a vulnerabilidades aplicables. Pin exacto y lockfile; un upgrade vuelve a verificar negociación, schemas, errores, limits y cancelación, y pasa auditoría aplicable. Owners posteriores conservan changelog de contrato, fixtures, evidencia de clientes, métricas sin datos de cálculo y procedimiento de rollback. No actualizar versiones por alcanzar una puntuación.
