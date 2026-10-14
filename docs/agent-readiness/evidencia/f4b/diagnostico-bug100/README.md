# Bug100 — diagnóstico local cerrado, solución no identificada

2026-10-14. **R2/5 FAIL y STOP C08/publicación permanecen. No solicitar R3.** Se agotó el [plan finito](plan.md): 32 solicitudes, cuatro ejecuciones HTTP, sin repetir casos ni buscar variantes favorables. La [admisión del arranque local](admision-arranque-local.md) registra un intento previo de preparación fallido sin solicitudes y la corrección explícita `--local`.

Producto conservado `192dcdd52d2790652ef2dbcb6d23a0f5006ade43`, tree `960be17582b35a2f5287d90a369ab10883c55821`. No cambió código, configuración ni dependencias del producto. Wrangler4.128.0, Miniflare5.20260831.0-alpha, workerd1.20260831.1, Node24.19.0/Undici7.29.0. La aplicación se ejecutó desde una copia privada de su build completo, instrumentada exclusivamente para registrar ingreso, lectura, cancelación y decisión de respuesta; [diff](instrumentation.diff) y [procedencia](provenance.json). El entry original del build permanece idéntico: SHA-256 `725177fd10c55cccf9c08986e97c606cd52be484411ac423e8107eceaaf39f95`.

## Resultados del contraste

[Resultados completos](resultados.json), con headers, payload lengths/hashes, status y cuerpos recibidos, errores, eventos del Worker y estado observado del proceso.

| Target / cliente | 32768 streaming | Petición posterior | 32769 streaming | Petición posterior / batch |
|---|---|---|---|---|
| Mínimo / Node fetch | Worker200, cliente200 |200 | cancel settled; Worker413, cliente413 |200 /400 |
| Aplicación / Node fetch | cliente500 `Network connection lost`; sin evento de ingreso capturado para esa solicitud |200 | cancel settled; Worker413, cliente413 |ECONNREFUSED /ECONNREFUSED |
| Mínimo / node:http | Worker200, cliente200 |200 | cancel settled; Worker413, cliente413 |200 /400 |
| Aplicación / node:http | Worker200, cliente200 |200 | cancel settled; Worker413, cliente413 |200 /400 |

Ping inicial200, Content-Type inválido415 y Accept inválido406 pasan en las cuatro ejecuciones. Los cuerpos de control conocidos llevan Content-Length52; el batch54. Ambos uploads de prueba carecen de Content-Length y el Worker registra **Transfer-Encoding: chunked** donde hay ingreso capturado. Headers válidos incluyen Content-Type application/json, Accept application/json, text/event-stream y MCP-Protocol-Version2025-11-25; sin Origin, sesión, auth ni Connection: close. Node fetch añade User-Agent node, Sec-Fetch-Mode cors y Accept-Encoding br,gzip; node:http usa el agent keep-alive y el framing capturado en sentWireHeaders. No se afirma equivalencia total de clientes/conexiones.

Para la aplicación/fetch32768, el cliente recibe500 con stack en Miniflare `workers/core/entry.worker.js:5201`. Esa línea instalada ejecuta `await service.fetch(request)` dentro de un try cuyo catch devuelve500. No se capturó decisión del Worker de producto para esa solicitud ni cancelación del reader; no se atribuye el500 a una decisión413 de producto que no consta. La ausencia del log capturado no prueba por sí sola qué actor interno falló.

Para la aplicación/fetch32769, sí constan ingreso chunked, lectura acumulada32769, cancel-start, cancel-settled y decisión413, recibida como413. Los dos intentos posteriores fallan antes de obtener respuesta con ECONNREFUSED127.0.0.1:8912, sin nuevos eventos de ingreso. El proceso padre Wrangler todavía tenía exitCode/signalCode nulos en el registro; esto acredita indisponibilidad del listener, **no** una salida demostrada de todo el proceso. Después se terminó sólo el proceso propio con SIGTERM como cleanup, registrado por separado.

## Interpretación y disposición

El Worker mínimo no reproduce bug100 en estas dos ejecuciones. La aplicación mantiene el límite y devuelve413 al exceso en ambas, pero **no** conserva todos los casos/continuidad con Node fetch. La diferencia apunta a interacción de cliente/conexiones y composición del transporte local de la aplicación (assets/bindings/framework frente al mínimo); no identifica por sí sola cuál es defectuoso. No está probado un defecto de fórmula, SDK MCP, contador de bytes o cancelación del producto. Tampoco está probado que el cliente sea incorrecto ni que cambiar a node:http resuelva el gate compatible exigido.

Cloudflare workers-sdk#15709 sigue siendo sólo una referencia similar: esta secuencia incluso falla en el límite inclusivo antes de tener un evento de cancelación capturado. No se establece identidad causal ni se propone un upgrade por tanteo.

**No se identifica una corrección sustentada dentro del presupuesto. STOP del diagnóstico.** No cambiar producto, stack, configuración, dependencias, expected413/400 ni eliminar streaming/Node fetch. Los éxitos del mínimo y node:http son controles diagnósticos, no PASS C08 ni sustituto del harness real. No se incorpora una solución hipotética y no se pide R3 con esta entrega.

Antes de cualquier R3 deberá identificarse y admitirse una solución concreta, demostrar con evidencia fija el límite inclusivo, exceso streaming413 y peticiones posteriores válidas/negativas, y preservar deadline, cuotas y recursos. Este diagnóstico no vuelve a ejecutar esa matriz completa ni acepta los gates anteriores. Próxima revisión eventual de implementación R3/5, mismo auditor, sin reset; no se ha consumido.

## Originales, limitaciones y publicación documental

[Índice de originales privados](indice-originales.json): 51 archivos de diagnóstico, incluyendo código mínimo, copia de módulos de aplicación, scripts/configs, logs y resultados. Los directorios mutables de estado local quedan privados fuera de este índice. [Worker mínimo](minimum.mjs), [preparación](prepare.py) y scripts inicial/corregido publicados aquí como fuentes diagnósticas, sin pertenecer al producto.

Los **385 originales R2** se comprobaron nuevamente contra su índice: tamaños y hashes intactos. Snapshot, SDD, contacto, dictámenes R1/R2 y sus contadores se conservan; no se convierte ningún FAIL histórico en PASS.

Limitación de retención de este diagnóstico: al corregir el arranque se reutilizó el nombre2-app-fetch.log y se sobrescribió accidentalmente el stdout del intento inicial fallido sin solicitudes. Se conserva su resultado inicial, script inicial, resumen inicial y el **log nativo original de Wrangler** en el índice; ese log es un original diferente, no recuperación byteexacta del stdout perdido. [Registro explícito](retention-limitation.json). Ningún original R1/R2 ni resultado de solicitud de la matriz fue sobrescrito.

Este cierre es documental en la rama propia, posterior al producto192dcdd. Sin integración, main, producción, scans, puntuación ni preview nuevo. El issue100 sigue abierto y PR93 sigue draft bloqueado. Política `search=yes, ai-input=yes, ai-train=no` intacta; F5/F6 fuera.
