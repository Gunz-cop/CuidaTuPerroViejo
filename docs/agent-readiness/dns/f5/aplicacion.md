# F5 — Configuración aplicada; aceptación pública pendiente

Estado 2026-10-14: **SVCB creado y DNSSEC activado, sin cierre de F5 ni puntuación nueva**. [Recibo curado](aplicado.json), [resolución pública inicial](publico-inicial.json), [continuación](continuacion.json) e [índice de originales privados](indice-originales.json).

## Contrato, autorización y auditoría

El propietario autorizó avanzar sobre la prohibición DNSSEC después de recibir el patch concreto. [Autorización](autorizacion.md). Mismo auditor independiente `/root/auditor_f5`, gpt-6.1-sol/high: **SDD R1/2 FAIL → R2/2 PASS**, sin reset. [R1](auditoria-sdd-r1.md), [R2](auditoria-sdd-r2.md).

Contrato aceptado: c0a65c666827387ac19a2aef7bf9fe88a4d6857b/tree62fc3797ff216a32baaea3b785ecbebad9291736. Ratificación y congelación **anteriores a las mutaciones**, commit2df6ab0e168246b13c05537601507d966c5e1fff. Sólo [sdd.md](sdd.md) y [patch.json](patch.json) son normativos; los borradores se conservan históricos.

La implementación de #109 todavía no se presenta a auditoría completa: **0/5**, pendiente de los gates. El PASS de SDD no se convierte en PASS de implementación.

## Cambios aplicados

Antes: 18 registros configurados, owner vacío, DNSSEC disabled sin claves informadas, Cloudflare Registrar sin DS. Main revalidado7e389a83c87cd5f14537f4b07f0cd783ca572251; no se modificó producto/main.

1. POST SVCB a las **20:41:23.866 UTC**, creado por Cloudflare20:41:24.047561:
   `_index._agents.cuidatuperroviejo.com. 300 IN SVCB 1 cuidatuperroviejo.com. mandatory=alpn,port alpn="h2" port=443`.
   IDreal **2446932a54da14312104127108a4fa3e**. GET por ID coincide en nombre, tipo, prioridad, target, parámetros y TTL. Cloudflare normaliza comillas sin cambiar semántica. No proxiable, proxiedfalse.
2. PATCH DNSSEC `{"status":"active"}` a las **20:41:53.321 UTC** y GET a las20:42:08.304. Algoritmo13/ECDSAP256SHA256, flags257, digestSHA256, keytag**2371**; estado **pending**.

DS generado:
```dns
cuidatuperroviejo.com. 3600 IN DS 2371 13 2 5E6137DBCC6A4F83ABF5F05D1ECD953C8F640DF80B8F6C8CEC4ED591EB3FE166
```
El 3600 pertenece a la presentación generada por API; **no es un TTL del DS padre observado**. El DS todavía no está publicado en .com. Se recalcularon localmente digest y keytag desde el DNSKEY público generado y ambos coinciden; esto comprueba consistencia del recibo, no la cadena pública.

Cloudflare Registrar publica el DS automáticamente por CDS/CDNSKEY; su [documentación](https://developers.cloudflare.com/registrar/get-started/enable-dnssec/) contempla uno o dos días. No se escribió un DS en la zona hija. No hubo cambios de NS, WAF, proxy, plan, facturación o registros ajenos.

## Resolución pública inicial demostrada

A las **20:42:57 UTC**, fetch HTTPS en Chromium, validación TLS por defecto sin excepciones de certificado, obtuvo cuatro respuestas completas. Se conservaron configuración de cliente, URL, headers observables, bytes originales de respuesta en base64, metadata y SHA-256. Los cuerpos se decodificaron sin modificación.

| Resolver | Consulta | Resultado |
|---|---|---|
|Cloudflare DoH|SVCB _index._agents|HTTP200, Status0, CDfalse, TTL300, registro exacto y RRSIG; **ADfalse**|
|Google DoH|SVCB _index._agents|HTTP200, Status0, CDfalse, TTL300, registro exacto y RRSIG; **ADfalse**|
|Cloudflare DoH|DS del dominio|HTTP200, Status0, sin AnswerDS, ADfalse; SOA .com TTL900|
|Google DoH|DS del dominio|HTTP200, Status0, sin AnswerDS, ADfalse; SOA .com TTL900|

**El SVCB ya resuelve en dos resolvers públicos. La cadena DNSSEC aún no valida:** RRSIG presente no sustituye DS/ADtrue. No son consultas directas a eric/lola o autoridades .com. V02 sigue pendiente y no se declara PASS por dashboard.

El método anterior de navegación a Cloudflare DoH había devuelto HTTP400/HTML truncado. La captura por fetch con Accept explícito ahora obtiene JSON completo; ambos originales se conservan, sin atribuir la incidencia anterior al dominio.

## Gates restantes y errores de entorno

- V00: SDD aceptada, autorización registrada y contrato congelado.
- V01: operaciones y readbacks de control plane comprobados; pending documentado, sin atribuir cadena activa.
- V02: pendiente DS automático, DNSKEY/cadena validada, ADtrue y consultas autoritativas exigidas.
- V03: catálogo/card existentes respondieron200 en investigación; falta acreditar todos los oráculos finales de TLS/ALPN y acceso.
- V04: **STOP de runner #110**. El intento de descubrimiento/búsqueda produjo un archivo íntegro de238286bytes, gzip20754, superior a lo exportable de forma segura por este conector. El driver devolvió TOOL_ARCHIVE_TOO_LARGE. No se presenta el recorrido como demostrado, ni se inventan resultados de sus fetch. Se cuenta conservadoramente navegación+4fetch=5solicitudes.
- V05: SDK real2.3.1 pendiente; el proxy local sigue inaccesible (#107). No reemplazarlo por RPC manual ni atribuir resultados antiguos.
- V06: comprobaciones finales pertinentes pendientes; política search=yes,ai-input=yes,ai-train=no conservada por alcance, sin nuevo PASS de regresión fabricado.
- V07: auditoría de implementación pendiente0/5, mismo auditor.
- V08: **cero scans nuevos**. La última medición sigue86content/73all-ui del cierreMCP104. Sin puntuaciónF5 simulada ni repetición de evaluador.

El error de archivo del runner se registró como [#110](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/110); se detiene ese recorrido dependiente, sin modificar producto/WAF ni recortar evidencia. [#107](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/107) queda limitado a capacidades de runner, no a preparar o aplicar DNS por MCP. #102/#103 mantienen sus estados y límites F4, sin nuevas pruebas.

## Presupuesto y continuación

Desde congelación: **11/32 llamadas API Cloudflare** (9 de zona/registrador y2 de Browser Rendering), **4/36 consultas DNS**, hasta **5/12 solicitudes HTTP de producto**, **0/24 SDK**, **0/2 scans**. Investigación anterior se conserva separada; los GET adicionales Registrar/DNSSEC y las dos observaciones DS previas no se hacen pasar por ejecución de estos gates.

Controles previstos: **2026-10-15T20:41:53.489Z** y **2026-10-16T20:41:53.489Z**. Son puntos de continuación documentados, **no tareas automáticas creadas**. Máximo dos GET de estado y cuatro consultas DoH por ronda, sin polling continuo. Si a las48h no aparece cadena válida, abrir incidencia de delegación y STOP de aceptación conservando firma. No realizar scans antes de todos los gates públicos.

Para los otros gates hace falta un runner permitido que conserve archivos completos y ejecute el SDK/CLI congelados, dentro del presupuesto restante. No pedir credenciales por chat ni crear infraestructura de otro alcance para sortearlo.

## Rollback disponible, no ejecutado

SVCB: GET del ID2446932a54da14312104127108a4fa3e, cotejar registro exacto y DELETE sólo ese ID. No restaurar zona completa. Caché positiva puede durarTTL300.

DNSSEC: PATCHdisabled solicita retirada por señales cero manteniendo las firmas según los [estados de Cloudflare](https://developers.cloudflare.com/dns/dnssec/dnssec-states/). Conservar claves mientras pueda subsistir DS; sólo después de ausencia pública y expiración completa del mayor TTL positivo observado puede borrarse el material DNSSEC para restaurar deleted. TTL incierto implica no borrar claves. Retirar el SVCB no obliga a retirar una cadena DNSSEC sana.

Originales privados indexados incluyen API y contactos del registrador fuera de git. La proyección pública excluye esos contactos. No se reutiliza receipt de un build de rama documental como producción; producto sigue7e389.
