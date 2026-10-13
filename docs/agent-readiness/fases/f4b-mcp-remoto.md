# F4B — MCP remoto: SDD para auditoría

**Estado: especificada; pendiente de auditoría independiente, ratificación y congelado. No programar antes de PASS y ratificación.** Fecha 2026-10-13. Autor Sol/high; auditor solicitado GPT-6.1 Sol/high independiente. Máximo2revisiones SDD, mismo auditor; segunda FAIL→STOP. Esta SDD sustituye las propuestas de preparación para el nuevo encargo, conservándolas como antecedentes; no cambia contratos ni evidencia F4A.

## 1. Admisión y excepción de desarrollo paralelo

El propietario autorizó desarrollar F4B en paralelo mientras se cierra la publicación F4A, sobre código final verificado. Esto sustituye **sólo para este encargo** la prohibición previa de solapamiento de implementación F4A→F4B. **Integración/publicación F4B siguen bloqueadas hasta cierre F4A aceptado y evidencia accesible.** Presencia de código en main no es cierre de producción.

| Base/autoridad | Identidad fija |
|---|---|
| Código técnico final F4A-3 observado en main | `cb8e10f1ead55ef0dafc666672cd3003252afc59` |
| Tree de esa base | `2727f993981f3cbbd144b802b08f13d072d11773` |
| Captura documental adicional F4A | `01ec8f879197b7dd21aa3344726fb0731477c127` de `agent-ready/f4a-seguimiento` |
| Aceptación técnica F4A-1 / F4A-2 | Cierres de #81/#82, PASS1/5 ambos; código `dad30d81…` / `35e2c158…` |
| Aceptación técnica F4A-3 | `evidencia/f4a/seguimiento/cierre.md` en la captura documental: código `cb8e10f…`, PASS1/5 de implementación |
| Base histórica F3 | producto `aad2a6624c24d7425c5ad5329b82c77a8a86b619`; documentos `eff4ce13a1f4b996f3d9b523799012bc668da318` |
| Arquitectura preparada | [paquete previo](../preparacion/f4b/README.md), preservado por commit `d3dd25e28479fe2677b12143e0e25fc8fc404fdb`; copia en esta rama `016e1ed` |
| Rama/worktree propios | `agent-ready/f4b-sdd`; `/workspace/ctpv-f4b-desarrollo` |
| Cierre final F4A / base de publicación F4B | **PENDIENTES** del SHA documental final confirmado por propietario y del cotejo de integración |

Se leyeron AGENTS, plan/método SDD, contratos F3/F4A y SDD seguimiento D33–35. Gana seguimiento cuando sustituye F4A: **good exige score>50; acceptable exige score>35; score≤35 compromised**, suma0..70 y thresholds50/35 sin cambiar. La captura documental adicional difiere de main sólo en docs (63archivos); no se incorporó automáticamente. Los informes F4A fueron emitidos por un auditor anterior distinto; se conservan su atribución/modelo real, no se reclasifican como auditorías Sol de F4B.

Antes de integrar: recibir cierre F4A final, verificar SHA/tree/ancestry y diff contra base técnica y captura documental; detener/corregir contrato si cambia módulo de cálculo, schemas, input WebMCP, errores, metodología, corpus/proyección, build/routing, discovery o requisitos de evidencia. Cambios sólo documentales también pueden cambiar HTML/CSS del build por Tailwind: receipt/hash del build final no se heredan. No polling continuo ni merge/rebase automático.

## 2. Resultado, alcance y ownership

Servidor MCP público real para las cuatro tools F4A, sin efectos, auth, comercio, modelo, administración ni URLs arbitrarias. Mantiene `search=yes, ai-input=yes, ai-train=no`. Recorrido: discovery→conexión→lista→buscar→leer íntegro/citar; evaluar HHHHHMM y recomendar movilidad con paridad API/UI/WebMCP. No scores prometidos:73general es estimación histórica.

Un issue de implementación de fase completa, sobre SHA ratificado real, con auditor independiente fijo máximo5revisiones. Una entrega única evita publicar descriptors antes de runtime. La promoción se tramita separadamente después de gates y autorización; no queda autorizada por la implementación.

Ownership autorizado posterior al congelado:

- Nuevos `src/lib/agent-mcp/` (runtime, adaptador, seguridad/limits y metadata propios); tests `tests/agent-readiness/f4b-*.test.{ts,mjs}`; harness `scripts/agent-readiness/mcp-client.mjs` y evidencia `docs/agent-readiness/evidencia/f4b/`.
- Compartidos en una sola integración: `src/worker.ts` (wrapper exterior), `src/agent-api/capabilities.json` (miembro MCP), `scripts/agent-readiness/agent-api.mjs` (generación/check card, ARD y llms), `src/agent-api/schema.json` **sólo ArdCompatibilityManifest/def de entry para admitir entrada MCP**; `public/_headers` (Link/card); package/lock (deps exactas); CI/tipos sólo si necesarios. Tests de contratos/generación/discovery existentes: sólo expectativas del delta MCP, sin quitar comprobaciones F4A/F3.
- Documentos nuevos F4B y actualización de estado del programa después de aceptar; no editar SDD, contratos ni evidencia ratificados F4A.

No tocar UI/scripts WebMCP/domino F4A, metodología, OpenAPI1.2.0 ni sus10componentes, skill, proyección/routing F2, middleware o headers internos F3, config Wrangler, bindings sensibles o flags/stack. La elección `/api/mcp` evita modificar reglas F2. Si otro archivo resulta esencial, bug/STOP y decisión explícita antes de cambiarlo. Shared files se integran después de cierre F4A mediante diff mínimo revisado, sin sustituirlos por versiones F3.

## 3. Versiones, SDK, transporte y sesiones

Fuentes primarias del 2026-10-13 en [manifest](../evidencia/f4b/referencias/manifest.json), además de [referencias preparadas](../preparacion/f4b/referencias.md). Protocolo actual **2026-07-28**, compatibilidad legacy **2025-11-25**. SDK oficial directo, runtime dependency **`@modelcontextprotocol/server: "2.3.1"`**, devDependency cliente **`@modelcontextprotocol/client: "2.3.1"`**. npm metadata/integrity observadas; lockfile congela transitivas. No `agents`, framework HTTP, auth library ni upgrade de dependencias existentes. Usar `McpServer`, `createMcpHandler`, `fromJsonSchema` de server y `CfWorkerJsonSchemaValidator` de `@modelcontextprotocol/server/validators/cfWorker`; éste se pasa tanto a servidor como a `fromJsonSchema`, sin Ajv runtime/eval/ref remotos. Firmas verificadas estáticamente en [SDK observado](../evidencia/f4b/referencias/sdk-api-observada.txt).

Fábrica fresca por petición, handler construido una vez por wrapper, `legacy: stateless`, `responseMode: sse`, `maxRequestBodySize:32768`; servidor con supportedProtocolVersions `[2026-07-28,2025-11-25]`, tools sin listChanged, sin resources/prompts/tasks/elicitation/sampling/roots/subscriptions/logging/progress. El SDK filtra discover a modernas: supportedVersions `[2026-07-28]`; legacy negotiate por initialize a2025-11-25 (si pide otra revisión antigua, ofrecer2025-11-25 conforme a su handshake). Moderno unsupported→400/-32022. Se filtran métodos fuera de la tabla antes de handler, sin abrir suscripciones aunque el SDK traiga soporte.

Identity runtime/card `name: cuidatuperroviejo`, `version: 1.0.0`, `title: Cuida tu Perro Viejo`, `description: Servidor MCP público de guías y herramientas educativas para perros mayores.` La versión1.0.0 es **versión nueva del servidor MCP definida por esta SDD**, no versión del SDK ni metodología. No sesión persistente: nunca MCP-Session-Id, cookies, KV, SESSION, Durable Objects, auth ni replay; header de sesión recibido se rechaza400/-32600. No compartir McpServer ni estado/requestIds entre peticiones. Caché editorial F3 por binding se conserva.

| Ruta | Métodos/resultado exacto | Routing |
|---|---|---|
| `/api/mcp` | POST JSON-RPC; OPTIONS204; GET/HEAD/DELETE/otros405, `Allow: POST, OPTIONS`; HEAD sin cuerpo | Wrapper exterior antes de F3/F2/Astro, ya cubierto `/api/*` |
| `/api/mcp/server-card` | GET200/HEAD equivalente sin cuerpo/OPTIONS204; otros405 con `Allow: GET, HEAD, OPTIONS` | Asset generado del build, ASSETS a path fijo, sin negotiate editorial |
| Descendientes restantes de `/api/mcp/` | 404 JSON sanitizado; percent en namespace400; no aliases/trailing slash | Nunca fetch de ruta arbitraria |

Query de transporte/card debe estar vacía; si no400. La normalización URL de plataforma limita detección de traversal ya normalizado fuera de namespace; nunca prometer detección que Request no conserva. Otros paths delegan intactos.

POST UTF-8 fatal, objeto único (batch rechazado), JSON-RPC2.0. `Content-Type` essence application/json; Accept debe incluir application/json y text/event-stream (sin q=0 para ninguno). Moderno `_meta` de params con protocolVersion/clientInfo/clientCapabilities conforme schema, MCP-Protocol-Version igual, Mcp-Method igual a method y Mcp-Name igual a params.name cuando tools/call. Verificar sentinel Base64 de Mcp-Name según spec; nunca `x-mcp-header` para datos de guías/cálculo. Legacy initialize no requiere header; peticiones posteriores legacy lo requieren y debe ser2025-11-25. No cerrar envelopes/_meta que el protocolo permite extensibles; sí arguments de dominio.

Métodos permitidos: modernos `server/discover`, `tools/list`, `tools/call`, `ping`; legacy initialize, `tools/list`, `tools/call`, `ping`, notifications/initialized y notifications/cancelled. Notificaciones válidas202sin cuerpo; JSON-RPC response posteada se rechaza400/-32600 en ambas eras, puesto que nunca se pide nada al cliente. Método desconocido moderno404/-32601, legacy200/error-32601. Cursor desconocido en tools/list→-32602; lista sin paginar de4tools, ≤256KiB. Invalid requestId→400/-32600 (string ASCII1..128 o entero seguro, nunca null).

SSE acotado por request para éxitos de listado/ejecución modernos; JSON/SSE que SDK use para handshake/discovery/errores se aceptan según protocolo. Cliente soporta ambos. No eventos persistidos, Last-Event-ID ignorado, GET stream405. En SSE `X-Accel-Buffering:no`; medir/preparar el mensaje final completo antes de emitir su evento de éxito. Body response completo≤8MiB, incluido framing/metadata/content/structuredContent; no truncamiento. Los textos públicos de error del SDK se sanitizan según tabla y no reflejan arguments/names.

## 4. Tools y paridad

Orden/nombres/title/descriptions/inputSchema exactos de exports `TOOLS` e `INPUT_SCHEMAS` en `src/scripts/agent-tools.ts`, iguales al anexo F4A. Importación read-only de estos metadatos en Worker (guard `typeof document` no ejecuta registro); **no llamar execute de navegador** para buscar/leer. Sin editar esos exports ni nuevo algoritmo.

| Tool | Input contractual F4A | Autoridad de ejecución/outputSchema |
|---|---|---|
| search_guides | q string required; kind enum; limit integer1..20; offset integer0..98; corpus lowerhex64; sin adicionales | GET interno F3 `/api/agent/v1/search`, def Search de schema API |
| read_guide | documentId required, patrón F4A/160máx; corpus opcional; sin adicionales | GET interno F3 `/api/agent/v1/documents/{documentId}`, def Read |
| evaluate_quality_of_life |7keys required integer0..10: hurt,hunger,hydration,hygiene,happiness,mobility,moreGoodDays | **evaluateQualityOfLife** de `src/lib/agent-tools/calidad-vida.ts`; def QualityOfLifeResult |
| recommend_mobility_aids |level required light/moderate/severe; handling required calm/stressed; sin adicionales | **recommendMobilityAids** de `src/lib/agent-tools/movilidad.ts`; def MobilityResult |

Schemas emitidos Draft2020-12, derivados exactamente de los objetos aceptados; outputSchema `{ $schema, $ref:#/$defs/<def>, $defs }` autocontenido de schema API aceptado, sin remote refs. No alterar nombres/unidades/score/umbrales/textos/avisos/guías/URLs/fields/output order de F4A. Annotations de cada tool: readOnlyHint true, destructiveHint false, idempotentHint true, openWorldHint false. No URLs de afiliados en resultados de movilidad. Valores de cálculo no se almacenan.

Contenido: reutilizar **createAgentApiWorker** con next cerrado que falla genérico si se alcanzara, mismo env/context pero Request GET nuevo de SITE+path fijo, headers sólo Accept JSON, sin cookies/auth/query extra. Reutiliza caches F3; ningún auto-fetch público ni otra búsqueda. Arguments validados por schema y Unicode sin surrogates aislados; mapear present keys en orden q,kind,limit,offset,corpus usando URLSearchParams; lectura con ID validado y corpus codificado. No normalizar q antes de F3: rawquery≤2048 y q NFC/trim/tokenización quedan a autoridad F3, igual que WebMCP. GET codificado puede exceder2048 aunque q normalizada quepa: devolver INVALID_REQUEST, no saltarse límite. Sólo statuses200/400/404/409/503 y MIME JSON; respuesta íntegra limitada2MiB. Toda membership/hash/UTF-8/corpus válida según F3, sin truncar Markdown ni clasificar links como fuentes nuevas.

Éxito: result (SDK adapta era) `content:[{type:text,text:JSON.stringify(resultado,null,2)+newline}]`, `structuredContent:resultado`, `isError:false`; comparar objeto profundo y reencode Markdown. En error de dominio result `isError:true`, sólo content textual del objeto Error F3 exacto, **sin structuredContent de éxito**. outputSchema sólo se valida en éxito. Schema de input inválido se devuelve como tool error INVALID_REQUEST, no como éxito/exception reflejada; estructura externa tools/call inválida sí-32602. La capa previa valida arguments contra schema con proveedor Workers antes de entrar SDK, para garantizar este resultado exacto en vez del texto de validación upstream. Inputs válidos se vuelven a validar por SDK, sin coerción ni defaults introducidos por la capa MCP.

Fixtures contractuales: score34/35 compromised,36/49/50 acceptable,51good,0/70 y todos5→35compromised; seis combinaciones movilidad LA/LB/MA/MB/SA/SB; inputs out-of-range/string/null/unknown/missing/noninteger; search artrosis/cushing/vacío/Unicode/ties/noresult; read todos IDs de **ese** corpus y nonexistent legal; corpus changed. Oracle: API del mismo build + fixtures y reglas D33, no nuevo algoritmo para producir la expectativa. UI/WebMCP equivalentes ya tienen evidencia F4A accesible; F4B coteja metodología con esas fixtures y ejecuta regresión acotada local/preview de las dos herramientas, no repetir matriz histórica completa.

## 5. Errores y límites

| Condición | HTTP / contenido |
|---|---|
| Origin/Host inválido |403 JSON `{error:Forbidden.}` sin detalle |
| MIME / Accept incorrectos |415 /406 JSON genérico |
| Body>32768 / JSONdepth>16 / metadata>8192 / malformed UTF-8 |413 /400 (profundidad/meta/UTF8), JSON-RPC-32600; id null si no validado |
| JSON mal formado / envelope/response/batch inválido |400/-32700 /400/-32600 |
| Header mismatch moderno / versión moderna unsupported |400/-32020 `Header mismatch.` /400/-32022 `Unsupported protocol version.` con data.supported `[2026-07-28]`, sin requested reflejado |
| Unknown method / estructura call/name inválida |Como §3/-32601 `Method not found.`; call-32602 `Invalid params.` (HTTP400 moderno,200legacy) |
| F3/F4A error semántico o ID legal ausente |HTTP200 tool isError, cuerpo Error preservado INVALID_REQUEST / DOCUMENT_NOT_FOUND / CORPUS_CHANGED / CONTENT_UNAVAILABLE |
| Internal exception / integridad output inválida / exceso de output |Genérico CONTENT_UNAVAILABLE antes de éxito; fallo de protocolo no atribuible a tool→500/-32603 `Internal error.` |
| Concurrencia/rate excedidos |429 JSON genérico, Retry-After segundos de recuperación; nunca inventar un código MCP reservado |
| Deadline |Abortar intercambio sin resultado exitoso; cliente observa cancelación/error de transporte; trabajo residual retenido en cap hasta terminar |

Todas las estructuras/mensajes de borde se fijan en fixtures F4B, sin query/cookie/trace/path/binding/clientInfo/reason público. La sintaxis `{error:Forbidden.}` en tabla significa objeto JSON de una propiedad string `error` con valor literal `Forbidden.`. HEAD siempre bodyless, incluido error.

Caps: POST32KiB inclusive, profundidadJSON16inclusive, params._meta8KiBinclusive medidos serializaciónUTF8; requestIdstringASCII1..128 o integer seguro; resultado envelope/SSE8MiB inclusive; list/card256KiBinclusive; deadline wall10s desde comienzo de lectura de body, no se reinicia por progress. Preservar caps F3 (2MiBJSON/512KiBMarkdown/8MiBquery-index/98docs). Lectura streaming con contador y AbortSignal, sin confiar en Content-Length; rechazar body ambiguo/chunked+overflow/UTF8 inválido y cortar reader. No bodydecompress de usuario: Content-Encoding distinto de identity→415.

**Abuso definido sin bindings nuevos:** ledger acotado por isolate, máximo64keys IP, TTL60s;120POST y90tools/call/60s por key (sin auth), overflow keys usan bucket global de reserva limitado igual, sin evicción que permita reset de cuota. IP sólo CF-Connecting-IP de ingreso de plataforma; fuera de Workers sin esa identidad usar key compartida anonymous, nunca clientInfo/XFF/arguments. Contadores de operación consultan cuerpo validado, no Mcp-Name sin validar. No guardar IP en logs ni persistencia. No es cuota global ni prevención distribuida/contabilidad/cap monetario. Requisito de cuota global estricta→otro diseño; no añadir auth para simularlo.

Concurrencia dura **2intercambios activos por isolate**, sin cola,429/Retry-After1 al exceder. Slot se retiene hasta que cuerpo terminó/canceló **y** callbacks/I/O iniciados acabaron; no liberar por deadline/desconexión si queda trabajo F3 interno. No añadir map de requestId ni acumular sesiones. Entrada malformed rechazada antes de slot/cálculo, pero cuenta POST para abuso. Ledger y slots se testean con tiempo/señales controlados en unitarios; cliente real/workerd demuestra composición, no equivalencia distribuida. Los2slots y output8MiB reducen expansión máxima; memoria/CPU del build se miden, sin afirmar Free viable por documentación.

**Cancelación acordada:** moderno cierra SSE y SDK AbortSignal se propaga; comprobar antes/después de cálculo y de I/O; no emitir mensajes después del cancel. Legacy explícita notifications/cancelled202 es aceptada pero no correlacionada entre POST en stateless; cliente aborta su espera, ejecución pura termina acotada. **No se promete interrupción cross-POST legacy ni preempción de cálculo síncrono.** F3 interno no tiene signal: puede finalizar carga/lectura después de cancel; conservar slot hasta settle y no devolver resultado. Prueba de residual/aislamiento obligatoria; si no puede mantener cap2 o deadline con fuente real, bug/STOP, no añadir sesiones silenciosamente.

## 6. Origin, CORS, headers y seguridad

Producción origin exacto `https://cuidatuperroviejo.com`; ausencia Origin permitida. Rechazar null, malformed, noHTTP(S), hostname distinto o scheme/port discrepantes403. Host válido: producción; preview Worker **del mismo sitio** bajo sufijo `-cuidatuperroviejo.g1721m.workers.dev` (hex prefix8, observado en recibos F4A) y hostname principal `cuidatuperroviejo.g1721m.workers.dev`; local127.0.0.1/localhost sólo requests HTTP de esos hosts. Origin presente sólo same-origin de URL validada; no confiar en header Host arbitrario, validar URL y Host si presente; preview desconocida→actualizar contrato con identidad real antes de verificar, no wildcard workers.dev. Los helpers SDK por hostname no sustituyen validación exacta URL.

Transporte CORS para Origin aprobado: ACAO ese Origin, Vary Origin; sin Origin no ACAO; sin credentials/Set-Cookie. Allow methods POST, OPTIONS; allow headers Accept, Content-Type, MCP-Protocol-Version, Mcp-Method, Mcp-Name; expose Link, MCP-Protocol-Version; OPTIONS valida origen y requested-method/headers antes204. Card CORS `*`, métodosGET/HEAD/OPTIONS, Allow-Headers Accept, Content-Type, If-None-Match; sin cookies. No-store exterior en ambos y CDN no-store, sin ETag sintetizado; no condicionales propias, native ASSETS observados no se simulan. Preservar nosniff, ReferrerPolicy strict-origin-when-cross-origin, PermissionsPolicy geolocation/microphone/camera vacíos y HSTS31536000includeSubDomains. Errores con CORS sólo cuando Origin aprobado y los mismos headers seguros; no ampliar CORS F3 ni admin/contacto.

Todo q/Markdown/links/cálculo es dato, nunca instrucciones privilegiadas; no eval/model/SQL/shell/fetch externo. Logs propios sólo contadores/code/duration/bytes, sin valores/client identity/reason. Observable platform existente se conserva sin prometer ausencia de logs de proveedor.

## 7. Card y descubrimiento: decisión D36 explícita

Adoptar **formato candidato experimental** Server Card del snapshot primario `526201bbc80231daa40ffcdecfc9da4e54e5dc93`, schema archivado, no afirmar extensión graduada/certificación. SEP2127 Final es charter/diseño; wire repo sigue Experimental/draft: planos distintos que se declaran, no contrato inexistente que se inventa. Esto resuelve para este encargo la indecisión G02 preparada mediante decisión de arquitectura, no por suponer graduación. URI `$schema` exigido por ese wire format `https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json` es identifier declarado; descarga404 observada y conservada, validación **local seleccionando `$defs.ServerCard`**, nunca raíz vacía ni validación remota fingida. El contrato se fija a bytes/sourceHash del manifest. Si auditor considera que la fuente es insuficiente, G02 vuelve a bloqueo/STOP, sin cambiar formato para pasar.

Card generada mismo build y registro, JSON2espacios/newline: `$schema`, name, version, title, description, websiteUrl SITE, remotes `[{type:streamable-http,url:SITE+/api/mcp,supportedProtocolVersions:[2026-07-28,2025-11-25]}]`. No tools/capabilities/packages/header secrets/_meta ficticia. Content-Type `application/mcp-server-card+json`; cada campo coincide runtime o compatibilidad demostrada: discover reporta sólo revisión moderna por diseño SDK; initialize demuestra legacy, no afirmar ambas en discover. Publicar en `/api/mcp/server-card`, GET/HEAD directo y sinredirect; card no implica ejecución.

Registro `src/agent-api/capabilities.json` añade miembro `mcp` con endpoint/cardPath/name/version/title/description/protocolVersions/tools (cuatro nombres en orden) y `ardEntry` exacta: identifier `urn:air:cuidatuperroviejo.com:mcp:guias-herramientas`, displayName `Guías y herramientas para perros mayores`, type `application/mcp-server-card+json`, url SITE+/api/mcp/server-card, description igual servidor; representativeQueries `Busca guías y lee su contenido completo con fuentes.`, `Evalúa la escala HHHHHMM de calidad de vida de un perro mayor.`, `Recomienda ayudas de movilidad para un perro mayor.` No modificar cinco operacionesAPI/skill/capabilities existentes.

Generador agent-api deriva card y tercera entry ARD/AIcatalog (byteidénticos) del registro, orden URN ASCII; preserva primeros entries por identidad (orden global puede insertar MCP entre API/skill). Schema ARD sólo se amplía para entryMCP, sin cambiar respuesta API/OpenAPI. Catálogo API RFC9727 conserva sus5operaciones HTTPGET, no añadir POST como hyperlink GET. Link existente conserva5valores y añade al final `<https://cuidatuperroviejo.com/api/mcp/server-card>; rel=service-desc; type=application/mcp-server-card+json` (quoting igual headers vigentes). Wrapper exterior aplica delta Link en respuestas del Worker sin modificar runtimeF3/F2; `_headers` lo aplica a assets. llms conserva prefijoF1/secciónF4A y agrega línea final en sección Interfaces públicas: `- [MCP remoto](https://cuidatuperroviejo.com/api/mcp/server-card): transporte público para buscar, leer y ejecutar las dos herramientas educativas.` Rebuild exactamente una línea, no duplicaciones. No modificar skill ni registrar servidor fuera del sitio; DNS/F5 y auth/F6 fuera.

Build falla por esquema/identidad/versiones/tools divergentes, destino/artifact ausente, huérfano/collision/bounds/schema ref remoto. Card≤256KiB; generación/check offline después de proyección, no postbuild/indexación. Checker F3/F4A pasa con expectativas aditivas MCP; no quitar validación de2entriesanteriores.

## 8. Criterios y comandos

C01 admisión/ownership/dependencia F4A; C02 SDK exacto/Workers bundle+startup; C03 initialize/negociación modern discover/list/call; C04 listado/input/output schemas/nombres/annotations; C05 paridad F3 search y todosIDs+hash/corpus; C06 paridad4canales de cálculos con fronterasD33 y6movilidad; C07 errors/methods/headers; C08 body/output/depth/metadata+1; C09 rate/concurrency/deadline/cancel/aislamiento; C10 card/ARD/Link/llms/schema/localref reales; C11 regresiónF1/F2/F3/F4A; C12 CI/buildmanifest/previewreceipt SHAfinal; C13 auditor PASS con contador y rollback/concreteentrega. Cada criterio requiere PASS/FAIL/noverificado separado con originales, no mocks como sustituto real.

Tests nuevos unitario/cliente in-process del SDK real y workerd real; legacy wire initialize explícito y cliente SDK StreamableHTTPClientTransport + Client real. Testear modern con `_meta`/headers o cliente2.3.1 sin inferir era del nombre. No scripts de producto antes de ratificación. CI pertinente: npm ci, astro sync/check, npm test; offline `node --test tests/agent-readiness/*.test.mjs`; build único `npx --no-install astro build`; check inventory/discovery/projection/agent-api/check-routing/semántica relevante; types del Worker/dry-run según CI. Nuevo runtimeTS incluido npm test, nuevosgenerationtests en globoffline. Ejecutar cada build/suite una vez por entrega; repetir sólo si cambia fuente/falla relevante. No suites/matriceshistóricas completas remotas.

Workerd del build con Wrangler local sin remoteBindings; cliente harness usa URL local/previews y guarda request/response/wireversion/hashes/statuses,4capabilities,errors/cancel; no llamadas reales a efectos. Preview requiere rama/PR draft propia y Workers Builds receipt + manifestbyteexacto (URLs/artifacts del SHAfinal real). Sin permiso/entorno/receipt esenciales→bugSTOP gate, nunca localhost=preview. Cálculos y todosIDs se ejecutan con límites respetados; no desactivar rate para hacer pasar preview. Pruebasdefensas unitarias usan synthetic source/IP/timer, declaradas aparte de evidencia remota.

Originales privados bajo workspace privado fuera Git; evidencia curada en f4b: índicesbytes/digests/proyeccionesdeclaradas, comandos/versiones/base/head/tree/CI/buildreceipt/URL/time/criterios. Usar datos sintéticos sin PII ni secrets; preservar errores/no retries para borrar fallos. ReceiptsF4A no pruebanF4B.

## 9. Auditoría, integración, publicación y rollback

PASS SDD permite ratificación final por autor/coordinación autorizada tras dictamen distinto, con SHA/tree fijo y delta documental explícito. Máximo2intentos mismo auditorSol/high; segundoFAIL STOPsin tercera. Un issue implementación completo sobre SHA ratificado, propiobranch contra rama SDD/integración propia, nunca main; audiencia auditor fija distinta del autor/corrector, máximo5intentosincluida primera, quintoFAIL bugSTOP. No reset contador por nueva sesión. Hueco esencial/base/funciónreutilizada/entorno→issue `[SDD bug] F4B: ...` con esperado/observado/criterio/base/contador/evidencia; detener parte dependiente inmediatamente.

Para integración/publicación P01: cierreF4Areal y SHAfinal documental accesibles/aceptados, diff revisado contra cb8e10f y captura01ec8f, gates afectados revalidados, entrega auditada/CI/preview/manifestreceipt reales, autorización aplicable a promoción. Ninguna autorización históricaF3/F4A ni nuevoencargo de desarrollo autoriza mainF4B. Solicitar permiso sólo con entrega completa/revisable si falta. Si F4A no cerró, entregar auditada/lista con dependencia y finalizar sin polling.

P02 tras promoción autorizada: receiptidentidad nuevo build/SHA y clienteMCPdominio,4tools, lectura íntegra/paridad, errores/card/descriptors/headers/Origin, sin atribuir preview a producción. P03 sólo después: una medición content y una all-ui con CLI/selección/fórmula congeladas (de cierreF4A real), originales/comparabilidad/neutralidad/nextLevel; si evaluador fallaSTOPsinretry/puntuaciónsimulada.73no promesa. F5DNS/F6identidad separados.

Rollback coherente al build final aceptado F4A con autorización/receipt nuevo: retirar MCPwrapper, deltaLink/card/entryMCP/llms y deps sólo F4B, preservando código/contratos/skill/UI/API/WebMCPF4A y F1–F3. No revertir archivos compartidos íntegros aF3. No-storecard evita TTLpropio pero comprobar cachesexterioresobservadas; guardar evidencia. Ensayo local/preview antesdepublicación: transporte/cardretirados, descriptorssinreferenciasmuertas y F4A/F3operativos. Commits/base exactos de reversión fijados en entrega, nunca inventados aquí.
