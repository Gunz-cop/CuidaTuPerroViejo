# Admisión explícita del transporte local de pruebas

2026-10-14. El propietario autoriza adaptar el harness a node:http mediante la opción fetch del **Client/StreamableHTTPClientTransport reales SDK2.3.1**, exclusivamente local, sin alterar producto192dcdd, SDK, versiones ni contratos. Mantener Node fetch para preview/producción y todos los FAIL de esa interacción local. No la declara resuelta ni promete compatibilidad universal.

El mismo auditor independiente `/root/f4b_auditor`, gpt-6.1-sol/high, comprobó esta admisión contra SDD§2/§8: **admisible, sin cláusula normativa que modificar**. Su respuesta de fondo precede pruebas/incorporación. No es R3/5, no consume ni reinicia revisiones; R2/5FAIL permanece. El autor había escrito un borrador no incorporado del módulo durante esa consulta; no se ejecutó antes de recibir el dictamen. Se deja explícita esa cronología, sin atribuir una aprobación anterior a la respuesta.

Ownership admitido por autorización: modificar scripts/agent-readiness/mcp-client.mjs; añadir scripts/agent-readiness/mcp-local-http.mjs y tests/agent-readiness/f4b-local-http.test.mjs. Evidencia en esta carpeta. Ningún src/public/config/package/lock/F4A ni worktree compartido. El nuevo SHA de entrega sólo podrá incluir harness/tests/evidencia; identidad del producto servido sigue192dcdd.

Condiciones del auditor: HTTPloopback exclusivo; SDKreal; sin retries/redirects; no respuestas fabricadas ni traducción de errores de red a413; adaptador no impone caps que sustituyan al servidor. Streaming sin añadir Content-Length. Bytes/headers/señales/cancel/close reales. Evidencia distingue payload previsto de bytes enviados si upload termina anticipadamente. Mantener cobertura y demostrar exceso streaming/continuidad real; Node fetch remoto intacto.

## Plan finito de verificación

Primero una ejecución de pruebas focales del adaptador contra servidores node:http controlados, declarados como fixtures de transporte, no evidencia funcional MCP: métodos/URL/headers/bytes/chunked, JSON/SSE/413 reales,302 sin follow, abort antes/durante upload/response, cancel/close y socketerror sin retry/captura fiel. Si falla esa solución, conservar resultado y STOP sin otra variante.

Después, **un único proceso workerd del build192dcdd y una única matriz SDK local completa**, con --local-http y --local (sin remoteBindings), versiones fijas Wrangler4.128.0/Miniflare5.20260831.0-alpha/workerd1.20260831.1/Node24.19.0/Undici7.29.0. Sin builds de producto ni hotreload ni Node fetch local alternativo. Presupuesto duro adicional de harness: máximo320 solicitudes HTTP reales (la matriz anterior142, fronteras/defensas y cuotas extra), sin retries ni redirects. Se conserva el corpus28/hash íntegro, ambas eras y cuatrotools/API/card/discovery/negativos. Añadir explícitamente body streaming32768válido/32769→413 y posteriores ping200/batch400; metadata8192/+1 y depth16/+1.

Composición C09: dos bodies abiertos, tercer429; abort/cancel y recuperación; deadline10s y petición posterior. Un nuevo intervalo de rate en el mismo proceso, espera en tramos≤20s sin solicitudes, permite medir90calls/91→429 y120POST/121→429 sin confundir caps. Antes y después del siguiente intervalo, comprobar recuperación. No quitar rate del servidor ni variar IP ni reiniciar el isolate para aparentar recuperación. Capturar originales también cuando FAIL.

Tests existentes focales de runtime/output sobre producto intacto acreditan fronteras output/list/card y casos no observables por red (salidas retenidas sin consumo/residualF3) aparte de la integración real, sin atribuir fixtures como cliente real. Una sola ejecución pertinente; no repetir suite global/builds históricos. Publicar evidencia separando producto/harness/fixture/local/preview/producción.

Tras PASS de gates afectados: snapshot fijo del harness y evidencia; solicitar **R3/5** al mismo auditor. Si cualquier paso falla: STOP con resultado concreto, sin R3 ni nuevas variantes. No main/integración/producción/scans. Política vigente intacta.
