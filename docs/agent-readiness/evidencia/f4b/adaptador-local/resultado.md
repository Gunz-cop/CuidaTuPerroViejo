# Adaptador HTTP local — FAIL focal, STOP sin matriz ni R3

2026-10-14. Se aplicó el encargo acotado: adaptar transporte del harness, manteniendo producto192dcdd y SDK/versiones/contratos. La admisión independiente del mismo auditor confirmó que no exige adenda normativa; ver [admisión](admision.md). No es dictamen de implementación R3 ni aceptación de la solución.

**Primera y única ejecución focal: 4 tests, 3 PASS, 1 FAIL. STOP.** No se corrigió ni reejecutó tras este fallo, conforme «Si falla esta solución, detente ... no abras otra ronda de variantes». No se consumió presupuesto de matriz local:0/320solicitudes a workerd. No se solicitó R3/5; permanece implementaciónR2/5FAIL y STOP de publicación.

## Cambio preparado, todavía no incorporado al cliente

Nuevo módulo `scripts/agent-readiness/mcp-local-http.mjs`: fetch HTTPloopback basado en node:http real, sin retries ni redirects; streaming sin Content-Length añadido, JSON/SSE sobre Response real, callbacks de observación de bytes realmente escritos/leídos, abort/cancel y close. Tests nuevos `tests/agent-readiness/f4b-local-http.test.mjs`. Ambos son **borradores fallidos** del harness, no código de producto.

El cliente existente `scripts/agent-readiness/mcp-client.mjs` **sigue intacto**: no se inyectó el módulo fallido en StreamableHTTPClientTransport ni se añadió el flag después del fallo focal. Client/StreamableHTTPClientTransport y Node fetch remoto siguen originales. Se mantiene el snapshot producto192dcdd y los originales históricos; no se declara resuelta la interacción bug100 ni compatibilidad universal.

## Evidencia focal

Fixtures servidores node:http controlados, aislados de producto; no mocks que sustituyan funcionalidad MCP:

| Test | Resultado |
|---|---|
| Método/URL/headers, bytes binarios streamed sin Content-Length, SSE y taps iguales al wire | PASS |
| 413 JSON real, HEAD,302 sin follow y ausencia de retry | PASS |
| Abort antes de enviar y durante upload, cancelación de fuente y motivo original | PASS |
| Abort tras headers SSE, cancel/close y error de red | **FAIL en su primera comprobación**; pasos cancel/close/error de red posteriores no ejecutados |

El test esperaba que la lectura pendiente rechazara con el mismo Error `after-headers` suministrado a AbortController. Recibió **Error: HTTP response aborted.** El stack muestra que `fail(reason)` llama a `incoming.destroy(reason)` y el evento `aborted` reentra en `fail()` antes de que se marque terminal/cierre. Ese evento sintetiza otro error y sustituye el motivo observado por el consumidor. El test no se debilita ni cambia su expectativa.

Esto identifica un defecto del **nuevo adaptador de harness**, no una nueva conclusión causal sobre bug100, producto o transporte local. Una eventual corrección necesitaría asegurar un único estado terminal antes de destruir sockets y preservar el primer motivo en el stream. Se registra como propuesta técnica no implementada, sin una nueva ejecución autorizada en este encargo después del FAIL.

Log original [focal.log](focal.log); [índice](indice-originales.json) con hash/tamaño y copias privadas exactas del módulo/tests/admision del momento del fallo. No cuerpos de solicitudes a producto ni resultados SDK nuevos, porque no se ejecutaron.

## Disposición

No continuar integración del adaptador ni matriz SDK, builds, preview, producción, main, scans o puntuación. No solicitar R3 y no reiniciar contadores. C08/deadline/cuotas/recuperación del producto siguen sin nueva acreditación. Los PASS focales no compensan el FAIL ni sustituyen workerd real.

La rama propia conserva el cambio fallido para revisión, con producto servido192dcdd intacto. Issue100 y PR93 permanecen abiertos/bloqueados. Política search=yes, ai-input=yes, ai-train=no intacta; F5/F6 fuera.
