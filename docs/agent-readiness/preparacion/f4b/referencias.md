# Referencias primarias F4B

**Borrador no ratificado. Consulta: 2026-10-12 UTC.** Las versiones de protocolo, paquete, schema y sitio son identidades diferentes. No se fijan versiones futuras. [Manifest](fuentes/manifest.json) registra URL, fecha/hora, bytes y SHA-256 reales de los documentos recuperados, además de fallos de consulta. Las copias son evidencia de investigación, no assets ni contratos de producto.

## Protocolo y SDK

| ID de fuente | Referencia primaria | Versión/estado observado | Uso |
|---|---|---|---|
| version-current | [Versioning vigente](https://modelcontextprotocol.io/docs/2026-07-28/learn/versioning) | Declara explícitamente **Current: 2026-07-28** | Autoridad de revisión vigente; original archivado |
| versioning | [Versioning and Compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning) | `2026-07-28`; revisión vigente según página de versionado | Peticiones modernas independientes, compatibilidad legacy y errores de versión |
| http | [Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http) | `2026-07-28` | POST, SSE/JSON, headers obligatorios, Origin, validación y cancelación |
| discovery | [Discovery](https://modelcontextprotocol.io/specification/2026-07-28/server/discover) | `2026-07-28` | `server/discover` obligatorio en servidor moderno; opcional para cliente |
| tools | [Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) | `2026-07-28` | `tools/list`, `tools/call`, schemas, errores, límites y seguridad |
| cancel | [Cancellation](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/cancellation) | `2026-07-28` | Cierre SSE cancela la petición HTTP moderna |
| sdk-schema | [Schema fuente](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/schema/2026-07-28/schema.ts) | Schema de la revisión, copia fechada | Envelope moderno, errores y `resultType` |
| legacy-http | [Transport anterior](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) | `2025-11-25`; revisión anterior | Session ID opcional, GET/DELETE 405 permitidos; desconexión no equivale a cancelación |
| legacy-lifecycle | [Lifecycle anterior](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle) | `2025-11-25` | `initialize`, negociación, `notifications/initialized` |
| sdk-readme | [Repositorio SDK oficial](https://github.com/modelcontextprotocol/typescript-sdk) | Línea v2 estable; main declara protocolo `2026-07-28` | Distinguir split packages v2 del paquete legacy `@modelcontextprotocol/sdk` |
| sdk-web / sdk-http | [Web-standard runtimes](https://ts.sdk.modelcontextprotocol.io/v2/serving/web-standard.html), [HTTP](https://ts.sdk.modelcontextprotocol.io/v2/serving/http.html) | Documentación v2 consultada | `createMcpHandler`, fábrica por petición, falta de validación Host/Origin por defecto |
| sdk-legacy / sdk-state | [Legacy clients](https://ts.sdk.modelcontextprotocol.io/v2/serving/legacy-clients.html), [State/scaling](https://ts.sdk.modelcontextprotocol.io/v2/serving/sessions-state-scaling.html) | Documentación v2 consultada | Compatibilidad stateless y frontera de sesiones/correlación |
| sdk-tools / sdk-cancellation | [Tools SDK](https://ts.sdk.modelcontextprotocol.io/v2/servers/tools.html), [Cancellation SDK](https://ts.sdk.modelcontextprotocol.io/v2/servers/logging-progress-cancellation.html) | Documentación v2 consultada | Standard Schema y `ctx.mcpReq.signal` |
| sdk-package / client-package | [npm server](https://registry.npmjs.org/@modelcontextprotocol/server/latest), [npm client](https://registry.npmjs.org/@modelcontextprotocol/client/latest) | Ambos **2.3.1** | Versión candidata concreta; metadata/dist integrity archivadas; no instalación |
| inspector-package | [npm Inspector](https://registry.npmjs.org/@modelcontextprotocol/inspector/latest) | **2.10.1**; usa SDK 2.2.0 según metadata | Cliente de prueba candidato, no prueba ya ejecutada |

El HEAD SDK observado es `b381559edc0dbe25ab8324cada345b49bd1d2fc4`; **no se afirma que HEAD sea el paquete 2.3.1**. La inspección estática del tarball npm 2.3.1 verificó su integrity publicada y encontró `createMcpHandler`, soporte moderno `2026-07-28`, fallback legacy stateless, límite de body configurable y `CfWorkerJsonSchemaValidator`. [Extractos](fuentes/sdk-publicado-extractos.txt) identifican miembros/líneas y digests del original. No se ejecutó ese código.

Recomendación de versionado: candidatos exactos `@modelcontextprotocol/server@2.3.1` y cliente de pruebas `@modelcontextprotocol/client@2.3.1`; revalidarlos al congelar después de F4A. No usar `latest` en encargos, lockfiles ni pruebas aceptadas. Zod u otro proveedor Standard Schema y el validador Workers tendrán que quedar fijados entonces; no se añade ninguna dependencia en esta preparación.

## Server Card: discrepancia esencial

| Fuente | Observación literal relevante | Consecuencia |
|---|---|---|
| [SEP-2127](https://modelcontextprotocol.io/seps/2127-mcp-server-cards) (`card-sep`) | Status `Final`, Extensions Track; remite al repositorio de extensión para wire format | El SEP no basta para fijar campos/versiones |
| [README de extensión](https://github.com/modelcontextprotocol/experimental-ext-server-card/blob/526201bbc80231daa40ffcdecfc9da4e54e5dc93/README.md) (`card-readme`) | `Status: Experimental` y `not an accepted or official MCP extension` | Conflicto de estado con el SEP |
| [Descubrimiento](https://github.com/modelcontextprotocol/experimental-ext-server-card/blob/526201bbc80231daa40ffcdecfc9da4e54e5dc93/docs/discovery.md) (`card-discovery`) | `Protocol Revision: draft` | Contrato candidato, no congelado |
| [Schema JSON](https://github.com/modelcontextprotocol/experimental-ext-server-card/blob/526201bbc80231daa40ffcdecfc9da4e54e5dc93/schema.json) (`card-schema`) | Draft 2020-12; `$defs.ServerCard`; objetos abiertos | No validar el documento contra la raíz vacía de `$defs`; selección del def obligatoria |
| [package.json](https://github.com/modelcontextprotocol/experimental-ext-server-card/blob/526201bbc80231daa40ffcdecfc9da4e54e5dc93/package.json) (`card-package`) | `0.0.0`, private | No presentarlo como versión de extensión publicada |

HEAD de extensión observado: **`526201bbc80231daa40ffcdecfc9da4e54e5dc93`**, coincide con el snapshot histórico citado por SEP-2127. No se infiere una versión graduada. **G02 bloquea el congelado de la card/discovery dependiente.** Se puede estudiar el candidato: `application/mcp-server-card+json`, identidad y remotes, versiones soportadas; no tools/resources/prompts ni capacidades en `_meta`. No se implementa ni se publica mientras falte decisión documentada sobre la fuente normativa vigente y compatibilidad de consumidores.

## Cloudflare y costes

| ID | Primaria | Versión/fecha observada | Uso |
|---|---|---|---|
| cf-handler-raw | [MCP handler APIs](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/) | Docs production consultadas 2026-10-12 | Wrapper Cloudflare, fábrica v2 y configuración Origin/CORS |
| cf-migration-raw | [Migración SDK v2](https://developers.cloudflare.com/agents/model-context-protocol/guides/migrate-to-mcp-sdk-v2/) | Docs production consultadas 2026-10-12 | Alternativa legacy; no elegir sesiones sin necesidad |
| cf-test-raw | [Test Remote MCP](https://developers.cloudflare.com/agents/model-context-protocol/guides/test-remote-mcp-server/) | Docs production consultadas 2026-10-12 | Inspector y conexión funcional remota |
| cf-assets | [Worker script routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/) | Docs production consultadas 2026-10-12 | Dispatch de métodos y rutas antes de ASSETS |
| cf-rate-raw | [Rate Limiting binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/) | API documentada; Wrangler ≥4.36.0 | Periodos 10/60 s, contadores locales/eventualmente consistentes |
| cf-pricing-raw | [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) | Tarifas consultadas 2026-10-12 | Modelo de coste; no factura del sitio |
| cf-limits-raw | [Workers limits](https://developers.cloudflare.com/workers/platform/limits/) | Límites consultados 2026-10-12 | CPU, memoria y cuotas por plan |
| cf-package | [npm agents](https://registry.npmjs.org/agents/latest) | **0.28.0** | Alternativa; peers MCP server/client exactos 2.0.0 en metadata |

Las descargas de páginas Cloudflare `.md` devolvieron 403; se consultó su código documental público en `cloudflare/cloudflare-docs`, rama `production`, y las páginas disponibles mediante lector web. El manifest conserva ambos hechos. HEAD production observado `df52a3c32f7b564bf06a26cdcff308983f3d547f`; no se atribuye despliegue del sitio a ese SHA.

Divergencias registradas: el wrapper Cloudflare aún llama «draft» al modelo moderno, mientras MCP identifica `2026-07-28` como vigente; se usa la spec MCP para semántica del protocolo. Los peers exactos de `agents@0.28.0` no justifican combinarlo sin verificación con SDK 2.3.1. Se prefiere SDK oficial directo por menor dependencia y semántica más próxima a la fuente. Todo soporte en el Worker de este sitio está **pendiente de prueba posterior**, no demostrado por ejemplos documentales.

## Fuentes del repo y alcance de evidencia

Contratos F3 ratificados en la [base documental](https://github.com/Gunz-cop/CuidaTuPerroViejo/tree/eff4ce13a1f4b996f3d9b523799012bc668da318/docs/agent-readiness), schemas `agent-api/1`, OpenAPI 3.1.1 / info 1.0.0, Draft 2020-12, ARD v0.91 y compatibilidad AI Catalog 1.0. Sus [fuentes archivadas F3](../../evidencia/f3/referencias/README.md) mantienen su fecha histórica 2026-10-09; no se les asigna una consulta nueva ficticia. Ampliar ARD en F4B requiere reconsultar fuente/schema vigentes al congelar; preservación de F3 no significa adoptar cambios de drafts automáticamente.

No se obtuvo SDD F4A. No se consultó el sitio para medir nuevas capacidades, no se ejecutó MCP Inspector y no se obtuvo receipt F4B. Las consultas fallidas a URLs documentales candidatas están registradas como fallos, nunca como evidencia positiva ni inexistencia de la capacidad.
