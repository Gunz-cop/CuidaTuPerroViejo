# Toolchain externa autorizada — matriz única FAIL, STOP

2026-10-14. [Admisión expresa](admision.md): pins externos únicamente, lockfilepropio, un arranque ySTOPsiFAIL. **Se ejecutó un arranque y una matriz;FAIL. No se prueba otra versión ni se solicitaR3.** R2/5FAIL/STOPpublicación permanecen.

## Identidad y aislamiento acreditados

Toolchain externa `/workspace/f4b-originales-privados/entorno-local-estable/toolchain`, Wrangler**4.116.0**, Miniflare**4.20260730.0**, workerd**1.20260730.1**. Instalación sin scripts/audit/fund, cacheprivada, [manifest](toolchain.package.json) y [lockfilepropio](toolchain.package-lock.json). Paquetes exactos y nativo verificados: [Workerd](workerd-version.log) `workerd2026-07-30`, [Wrangler](wrangler-version.log), [preflight](preflight.json) con SHA256 de binario/lock y manifiesto completo del build.

Producto**192dcdd52d2790652ef2dbcb6d23a0f5006ade43**, tree960be17582b35a2f5287d90a369ab10883c55821; SDKclient/server2.3.1, Node24.19.0. Harness fuente235f666; entrega fijada antesdearranque**842577ae15067d35d830cbc90d431371f3230e63**, tree3002c316ae534a786634baa055522d6988e6b4ab (sólo documentos posteriores al harness). Mismo build/localconfig/flags/bindings, --local, persistencia nueva/puerto8923. **357 archivos de build y hashes deconfigfuente/configgenerada/package/lockproducto comprobados iguales antes/después**, no cambios de producto ni dependencias del repo. Hashentry725177fd... completo en metadata.

Compatibilidad no universal: CLI4.116 advirtió campo top-level generado `connect:[]` desconocido; no se editó ni eliminó. Es un valorvacío, pero esta advertencia se conserva y no se declara plena compatibilidad de esquema. El proceso arrancó y ejecutó las herramientas. AImostró `not supported` en modo local, no se probaron operaciones administrativas/AI/contacto. CLI/versión/bindings/advertencias quedan en stdout/stderrprivados separados. No prometer que esa versión anterior es un fix por referenciasexternas.

## Resultado de la única ejecución

[Metadata](execution.json), [resultadoSDK](cliente-local-fail.json), [aserción](matrix.log), [resumen](resumen.json).132intercambios,131capturascompletas/1parcial; misma cobertura y mismosasserts, Client/StreamableHTTPClientTransport reales. No retries/redirects ni versiones alternativas. ArranqueReadytrue; salida del clientecode1.

Como en la ejecución235f666, Originliteralnull obtuvo403esperado y la siguiente petición conOriginválido obtuvo **500** sinheaderAccess-Control-Allow-Origin. La aserciónCORS esperó elOriginválido y encontró null. La [captura500](error-500.json) está **completa, terminalend antesdeassert**,202bytes, SHA256 `a274a5664add682623b3ee8637c5ba83073f4c5bcfae7ac7cde3e90c38d870ae`:

```text
Error: Network connection lost.
    at async Object.fetch (file:///workspace/f4b-originales-privados/entorno-local-estable/toolchain/node_modules/miniflare/dist/src/workers/core/entry.worker.js:4765:22)
```

El path de la respuesta identifica el **Miniflare externo4**, no el Miniflare5 del repo. No confundirlo con error anterior166bytes/pathdistinto. Cuerpo/rawheaders/digests/timestamps y lognativooriginal preservados. ProxyWorker muestra la misma firma de error; no se identifica desencadenante ni se atribuye a producción.

`workerBeforeCleanup` no registra salida del padre; `workerAfterCleanup` registraSIGKILL del coordinador despuésdeTERM/espera. No se afirma salida espontánea del proceso ni se usa code1 del cliente como exit delWorker. Sólo se cerraron procesos propios.

## Qué quedó acreditado y pendiente

AntesdelFAIL: ambaseras, cuatrotools/listado/contratosSDK, corpus20+8 y28lecturasíntegras/hashes/bytes, APIparidadF3/F4A, fronterasQoL/seismovilidad, búsquedas/errores/corpuschanged, card/ARD y parte de métodos/headers. Es cobertura parcial positiva, **noC08/C09PASS ni matrizPASS**.

Streaming32768/32769→413/continuidad, negativosposteriores y añadidosC09deadline/cuotas/recursos noejecutados. Los focales8PASS y runtime/output15PASS anteriores no los sustituyen. CI/preview/receipts/perfil del producto192 conservan su alcance previo; no nueva producción/previewreal/scans/score.

La prueba **descarta que cambiar únicamente a estos pins externos baste para resolver el fallo**. No prueba que sóloMiniflare5cause el problema ni que Miniflare4seauniversalmente defectuoso. ComentariosCloudflare justificaban estudiar el candidato, no eran evidencia de fix. Se conservan informes externosprivados15203/15451, con límites de inferencia.

## Disposición

**STOP conforme autorización, sin segundo arranque/matriz/pin ni R3.** No se consume presupuesto de auditoría de implementación ni se reinicia historial. Bug100abierto/PR93draftbloqueado; normativa/producto/SDK/política/F4A intactos. No alterar gate, drenar requests sinlímites ni sustituirLocal porPreview. Cualquier próximo encargo deberá distinguir hipótesis de correcciónadmitida; esta entrega no presume una solución siguiente.

[Índice de originales](indice-originales.json) conserva configs externos/lock/logs/sourceRunner/rawcliente/versiones/manifiestobuild/fuentesprimarias. Cache/estado mutable y paquetesinstalados quedan privados; integridades/versión/binariodigest fijados. [Guía de incidente](../consumo-control/guia-incidente.md) conserva firma e instrucciones para evidencia futura de producción sin loggingnuevo ni autorización de publicar. Todoslosoriginalesprevios permanecen; esta curación es posterior al snapshot de la ejecución.
