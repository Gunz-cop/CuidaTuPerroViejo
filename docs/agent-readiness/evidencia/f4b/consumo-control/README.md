# Reanudación de consumo — captura corregida, matriz FAIL/STOP

2026-10-14. Autorización del propietario para corregir consumo/captura y conservar el error de cara a un incidente futuro. No autoriza producción. **Focales8/8PASS; única matrizSDKlocalFAIL; noR3.** R1/R2FAIL históricos y originales intactos.

## Cambio y snapshot probado

Harness `235f666594eee569b12573be1bca4dfa6261e9c0`, tree `7cd268b2d0749fe47206a7616fa342bad7dd2851`. Helper de control lee una sola vez sin clone, cuenta consumo hasta8MiB vigente, cancela/FAIL si exceso y espera terminalend/error/cancel antes de aserción. Descriptor de control usa status/headers/bytes reales; nunca se entrega al SDK. Client/StreamableHTTPClientTransport2.3.1 siguen reales y reciben Response del adaptador admitido. No retries/redirects ni Content-Length añadido; uploads siguen chunked. El cuerpo de un error no se reconstruye ni se traduce a otra clasificación.

[Focales](focal.log) ejecutados una vez con Node24.19.0:8/8PASS. Incluyen8MiB/+1 consumo real, terminalnormal/error/cancel, captura de500HTTPreal en fixture y tests intactos de adaptador/SSE/abort/close/networkerror. Son fixtures de transporte y no prueba de MCP. Producto no cambia; runtime/output15/15 anterior sigue documentado sin nueva ejecución/build.

Producto `192dcdd52d2790652ef2dbcb6d23a0f5006ade43`, tree `960be17582b35a2f5287d90a369ab10883c55821`, SDK/config/deps/contratos intactos. Hashentry local725177fd10c55cccf9c08986e97c606cd52be484411ac423e8107eceaaf39f95 preservado. Un proceso workerd Wrangler4.128.0 --local/Miniflare5.20260831.0-alpha/workerd1.20260831.1, puerto8922, estado nuevo privado, sin hotreload/rebuild. [Metadata](execution.json) fija identidades y salidas, budget320, un intento.

## Error completo acreditado

[Captura curada exacta](error-500.json): Origin válidohttp://127.0.0.1:8922 obtuvo **HTTP500**, sin Access-Control-Allow-Origin; la aserción de CORS esperaba ese Origin y encontrónull. Antes, Originliteralnull obtuvo403esperado con su cuerpo íntegro. No llegó a la comprobaciónAccept406 de la ejecución anterior.

El último500 se consumió completamente y quedó registrado en terminal**end**, antes de la aserción.166bytes, SHA256 `a8a92a23c5acab4db617ce50f558cf849703da0a2eb7c33f9f1ba536f0bc676a`. Cuerpo real:

```text
Error: Network connection lost.
    at async Object.fetch (file:///workspace/ctpv-f4b-desarrollo/node_modules/miniflare/dist/src/workers/core/entry.worker.js:5201:22)
```

Lognativooriginal confirma `Error in ProxyController: Error inside ProxyWorker`, causeNetworkconnectionlost. Se conservan stdout y stderr separados, logcombinado, nativo y cuerpo rawprivado. Esto acredita error en la capa proxy local; no determina desencadenante ni supone que esa capa exista en producción. No es una conclusión causal sobre chunked/keep-alive/consumo.

Esta vez `workerBeforeCleanup` no registra exit del padre; tampoco `workerAfterCleanup` alcanzó a registrar eventoexit antes del cierre del coordinador trasTERM/KILL. Una comprobación posterior del PID17016 no encontró proceso. No se afirma salida espontánea code1 deWrangler basándose en metadata de otra ejecución. MatrixExitcode1 corresponde al cliente fallido. Logs/actor/período diferenciados.

## Alcance de la matriz y STOP

[Resultado del cliente](cliente-local-fail.json), [aserción](matrix.log), [resumen](resumen.json):132intercambios,131capturascompletas y1parcial. La parcial queda marcada como tal y no se reconstruye. La caída que detuvo la matriz sí tiene captura completa.

Antes delFAIL se acreditaron ambaseras, listado/cuatrotools, paridadAPI de búsqueda/lectura/cálculos, corpus20+8/todos28reads/hash/bytes, fronteras de cálculos/seismovilidad, búsquedas/errores/corpuschanged, card/ARD y parte de métodos/headers. No es matrizPASS. Negativosrestantes, streaming32768/32769→413/continuidad y añadidosC09deadline/cuotas/recursos **noejecutados**, pendientes. No inventar evidencia ni sustituirlos por los focalesunitarios.

**STOP sin otra matriz/variante/corrección posterior.** Captura ahora completa no equivale a resolver bug100 ni aceptar C08. No solicitarR3 ni consumir contador. R2/5FAIL y STOPpublicación permanecen; próximos pasos requieren una solución/admisión apropiada del fallo de transporte, no debilitar contrato o sustituir gate local por preview. No se presupone que repetir cambiaría el resultado.

## Conservación para futuros incidentes

[Guía de incidente](guia-incidente.md): conserva la firma actual y los errores históricos, y describe identidadbuild/Workersversion/UTC/actor/headers/status/rawbody/bytes/hash/terminal/Cf-Ray cuando exista, correlación con observabilidad de plataforma y curación sin credenciales/inputs de usuarios. No introduce logging de contenido en producto ni autoriza despliegue/scans/tráfico remoto. Nodefetch para preview/producción permanece; limitaciones de captura remota previas se declaran, no se promete instrumentación remota nueva no probada.

[Índice de originales](indice-originales.json): carpetaprivadanueva sin sobrescribir ninguna anterior. Este cierre documental es posterior al snapshot probado; no se atribuye la matriz a su nuevo tree. Sin main/integración/producción/scans/score, PR93draftbloqueado, bug100abierto, política intacta, F5/F6 aparte.
