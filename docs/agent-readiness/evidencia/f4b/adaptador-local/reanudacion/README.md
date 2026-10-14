# Reanudación — focales PASS, matriz única FAIL, STOP sin R3

Producto `192dcdd52d2790652ef2dbcb6d23a0f5006ade43`, tree `960be17582b35a2f5287d90a369ab10883c55821`, intacto. El arreglo externo entregado por el propietario (`abbae3b`) sólo modifica el módulo local y se incorporó mediante cherry-pick `d877f90`; su autoría queda preservada. Las pruebas externas Node22 no se atribuyen como evidencia de esta sesión.

Una ejecución focal propia Node24.19.0: **4/4 PASS**; [log](focal-node24.log). Tests y aserciones intactos, error terminal único conserva motivo original, cancel/close y error de socket ahora ejecutados. Una ejecución focal pertinente de runtime/output: **15/15 PASS**; [log](runtime-output.log). Conserva caps body/output/list/card, deadline, salida sinconsumo, recuperación y residualF3 como fixtures defensivos, no como integración real. FAIL3/1 anterior, log e índice originales permanecen inmutables. Admisión del auditor sobre SDD§2/§8 vigente; no nueva cláusula ni revisión R3.

## Snapshot y ejecución únicos

Harness `4c1ae6cbce57e1891b73d7bfd0a3f81c4e08680b`, tree `9b151c365437d00b506289de734a28cf5b3bb1f8`. Integra flag --local-http, fetch node:http real en Client/StreamableHTTPClientTransport2.3.1, loopback exclusivo. Captura pasiva de bytes escritos/leídos, sin preread ni respuestasfabricadas, sin retries/redirects; reconexionesSDKlocal0. Nodefetch por defecto para preview/producción intacto, ninguna nueva prueba remota. Versiones y entrada de build guardadas en [metadata](execution.json); hashentry192 inalterado `725177fd10c55cccf9c08986e97c606cd52be484411ac423e8107eceaaf39f95`.

Un único arranque Wrangler4.128.0 --local, Miniflare5.20260831.0-alpha/workerd1.20260831.1, puerto8921, estado nuevo privado, sin hotreload ni rebuild. Una única matriz del SDKreal,135intercambios de un presupuesto320; resultado **FAIL**. No se ejecutó otra variante.

## Fallo concreto y alcance positivo

[Resultado](cliente-local-fail.json), [log de aserción](matrix.log), [resumen de capturas](capturas-resumen.json). En mcp-client.mjs:136, la petición válida server/discover con Accept application/json (falta text/event-stream) obtuvo **HTTP500 en lugar del406 esperado**, inmediatamente después del rechazo Content-Type text/plain415. Se conserva500 real: no lo fabrica ni traduce el adaptador. La última transmisión documenta177bytes y Transfer-Encoding:chunked, sin Content-Length añadido. Wrangler salió con código1 antes de cleanup; metadata distingue esa salida del cierre del coordinador.

Antes del fallo se acreditaron ambaseras/Clientconnect/toolslist/cuatrotools, paridadAPI de búsqueda/lectura/cálculos, corpus paginado20+8, los28readsíntegros/hash/bytes, fronteras de calidad de vida y seis combinaciones de movilidad, casos de búsqueda/errores/corpuschanged, card/ARD y parte de métodos/headers. Es cobertura positiva parcial, no matrizPASS.

Las comprobaciones streaming32768/32769→413, peticiones posteriores/batch, negativosrestantes y añadidos C09 (cap2/abort/deadline/cuotas/recovery) **no llegaron a ejecutarse**. Los unitarios15PASS no sustituyen estos gates reales pendientes. No se reclama C08localPASS ni corrección del bug100.

## Limitaciones de captura y causalidad

El adaptador devuelve la Response al recibir headers, conservando lectura/cancelación real por consumidor; la capturaNodefetch anterior drenaba un clon antes de devolverla. Algunas comprobaciones negativas antiguas sólo inspeccionan status y no consumen body. Sus capturas quedan incompletas y al cerrar el adaptador registran `Adapter closed`; el [resumen](capturas-resumen.json) separa completas/parciales. El cuerpo del último500 no fue consumido antes de saltar la aserción/cierre; no se inventa su texto/stack ni se atribuye una decisión de producto.

Ese detalle es parte de la composición nueva del harness, no prueba suficiente de causa del500 ni permiso para otra variante. Las fronteras nuevas no se omiten intencionadamente ni se cambian expected406/413/400: el FAIL detiene la secuencia antes de alcanzarlas. No añadir Content-Length, drenar sin límites ni eliminar streaming para buscarPASS.

## STOP e identidad documental

Conforme encargo «si falla esta solución, detente», **STOP sin corrección/retry ni R3**. Historial implementaciónR1/R2FAIL intacto, próxima eventualR3/5 mismoauditor sólo tras nueva reanudación sustentada; ningún contador se consume/reinicia por consulta de admisión o focales. Bug100 permanece abierto; bug101tiene evidencia focal de su fix, sin cierre global F4B ni aceptación del adaptador completo. PR93 draft bloqueado.

[Índice de originales](indice-originales.json) conserva fuentes del snapshot, matrizraw, metadata/logs/focales; estado local mutable permanece privado. Código de producto, SDK, dependencias, configuración, contratosF4A, SDD/contacto y originales anteriores intactos. Este cierre documental es posterior al SHA del harness probado; no se presenta como una nueva ejecución sobre su tree. Sin main/integración/producción/scans/score. Política intacta; F5/F6 aparte.
