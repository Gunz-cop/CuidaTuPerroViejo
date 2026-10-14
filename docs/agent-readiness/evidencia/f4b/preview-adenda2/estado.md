# Gate pendiente en Commit Preview — intento1 STOP

## Identidad y alcance

2026-10-14T05:27:36.109Z–05:27:55.040Z. SHA servido **e21374cd8650ec8482aa23fdb97320bd83cfbed9**, tree declarado en receipt.json; BuildID **e6785124-9a00-40b0-99f2-d06c5f8abc8e**, VersionID **40fed98d-6d03-4175-ac02-9601d63ad620**, URL **https://40fed98d-cuidatuperroviejo.g1721m.workers.dev**. Receipt del bot PR93 y check WorkersBuilds: éxito; CI «Criterios de aceptación»: éxito. Producto192dcdd sin cambios src/public/package/lock/configuración. No se atribuye C12 del preview anterior a este nuevo build.

Node24.19.0/Undici7.29.0, SDK2.3.1 instalado. Cliente de matriz preparado con Client/StreamableHTTPClientTransport reales y Nodefetch; **el STOP ocurrió antes de llegar a la fase de llamadas con Client**, no se declara ejecutada una nueva integraciónSDK. Se conserva la integración SDK previa sobre su propia identidad. Focales del capturador:4subtestsPASS, una prueba padrePASS; fixtures sólo validan bytes/ciclo de vida/guardias, no MCPremoto.

20solicitudes, todas a /api/mcp del preview inmutable; cero a producción/rutas de escritura, sin retries/redirects. 300delpresupuesto quedan sin gastar; no se autoriza usarlos para ignorar STOP. Una sola ejecución de matriz; no se hicieron variantes posteriores.

## Resultado observado

- C07: Accept406; cancellegacy202; pingmodern404/-32601; pinglegacy200; preflight204.
- C08: batch400, JSONmalformado400; uploadstream32768→200,32769→413, inmediatamente ping200 y batch400; depth16→200/17→400; metadata8192→200/8193→400. PASS de esos controles precisos, no de todo C08 histórico.
- C09cap: dos uploads abiertos observados por fetch, tercera petición200; resultado **no determinable en plataforma**, noFAIL/PASS ni garantía global. Los dos uploads se abortaron, ambos sources cancelados y petición posterior200. Sin headers/status de los uploads abortados, no inventar colo ni afirmar recepción porWorker. Tercero Cf-Ray a4a42d16dd8f8e1c-ORD; recuperación a4a42d19a89df85a-ORD. Mismo colo no demuestra mismoisolate.
- Deadline: petición20, a05:27:40.002Z, headers a05:27:55.035Z. Duración medida **15033.70219ms**; status **503**, cuerpo completo85bytes texto: `upstream connect error or disconnect/reset before headers. reset reason: remote reset`. Headers server:envoy, Content-Type:text/plain; **sin Cf-Ray**. No coincide con el 500JSONRPC exacto, ni plazo10–12s. **STOP directo según precisión del propietario**. No se envió petición posterior ni se intentó demostrar recuperación tras ese fallo.
- Cuotas90/91 y120/121, ventana nueva y recuperacióncuota: **no ejecutadas** porSTOP. No determinabilidad del cap no sustituye estos gates.

## Interpretación y conservación

El 503 tiene firma de un proxyEnvoy, no el cuerpo sanitizado del runtimeMCP. **No se acredita dónde ocurrió el reset, si esta petición alcanzó alWorker, ni la causa nativa**. No es la página52xHTMLCloudflare con Cf-Ray descrita por el propietario. No se atribuye al producto ni aCloudflare sin evidencia adicional, y tampoco se convierte enPASS/limitaciónadmitida. La salida porproxy de este entorno está activa para Nodefetch; esto es contexto, no prueba causal delreset.

Deadline-503.txt y deadline-headers.json conservan cuerpo/headers íntegros de eseerror. Originals privados completos, requests/responsesbase64/hashes/terminales en indice-originales.json. La proyeccióncurada declara bytes observados porfetch, no byteswire/recibidos porWorker. Originales deR1/R2/locales y susFAILs intactos.

La captura sirve para comparar incidentes futuros por UTC/SHA/BuildID/VersionID/status/bodyhash/headers/Cf-Ray cuando exista; no crear alertas, modificarproducto ni diagnosticarproducción ahora. Ver guía histórica consumo-control/guia-incidente.md.

A2admitida no equivale aPASS deejecución. **R3/5 no solicitada ni consumida. R1/5 yR2/5 siguenFAIL.** Bug100 no se cierra: C08pendiente pasó enpreview, pero entrega siguebloqueada pordeadlineC09. No main/integración/publicación/scans/score. Rollbackd6f4bdd sigue referencia pendiente de revisión de cobertura final.
