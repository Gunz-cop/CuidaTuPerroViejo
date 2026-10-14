# Evidencia de una caída MCP: guía para publicación autorizada futura

Esta guía conserva el aprendizaje de bug100; **no autoriza publicación, pruebas en producción ni logging nuevo de producto**. Producto192dcdd mantiene observabilidad de plataforma y errores públicos sanitizados, sin registrar inputs/cálculos/reason/clientidentity. No añadir stacks internos a respuestas públicas.

## Error local conservado

Ejecución9449137: controlAcceptapplication/json obtuvo500≠406; Wrangler terminócódigo1. Originalprivado `/workspace/f4b-originales-privados/adaptador-local-reanudacion/workerd.log`, SHA256 `5443c1b701157d18dab3e2ce908a67e51e819c3b1aafd5ce018ad9156dadf6f8`; lognativo `native-wrangler-2026-10-14_03-13-20_149.log`, SHA256 `66391d5990e4f4378d9b45baf1c903c7d33b9b54f111afeec32cd730c4f58930`.

Extracto acreditado del nativo:

```text
Error in ProxyController: Error inside ProxyWorker
cause: name Error, message Network connection lost.
```

El cuerpo500 de aquella respuesta NO fue capturado; no reconstruirlo. Logs y metadata demuestran fallo en capa proxy local y salida del proceso, sin identificar desencadenante. Chunked/keep-alive/respuestas sinconsumo son hipótesis, no causa confirmada. No trasladar automáticamente ese diagnóstico a producción: CloudflareWorkersproducción no utiliza el proxy Miniflare de wranglerdev.

## Cuando un incidente real esté autorizado

Preservar originales privados por incidente, sin sobrescribirlos: fechaUTC, origenlocal/preview/producción, URL base/config/versiones exactas, SHA/tree/receipt/build/Workersversion reales, método/path, versiónMCP/headers aplicables, status/headers/cuerpo originales dentro de límites, cantidad/hashbytes y terminalend/error/cancel. Si hay truncamiento, cancellation o fallo de lectura, marcar evidencia parcial con el error real; nunca fabricar cuerpo ni clasificarlo como completo. Registrar Cf-Ray/requestID proporcionado por plataforma si existe, sin inventarlo; sirve para correlacionar con Workers observability/logs de la misma versión y hora.

Separar: petición prevista/bytes efectivamente enviados; respuesta recibida por cliente/decisión del Worker sólo si hay evidencia; errorHTTP/errorred; shutdown de operador/salida espontánea; parserSDK/errorHTTP/backend/plataforma. No añadir auth ni enviar inputs arbitrarios. Una prueba compatible posterior debe ser acotada y autorizada para producción; no retries ilimitados, scans o cambios de tráfico para diagnosticar.

En controles del harness local, una sola lectura con cap8MiB vigente, sin clone; esperarterminal antesdeassert. En preview/producción se conserva Nodefetch y SDKreal; cualquier cambio de captura remota que aún haga preread de clone requerirá verificación de su límite efectivo antes de usarlo como consumidor de un body potencialmente arbitrario. No afirmar que un cap de copia equivale a un cap de consumo. No reutilizar el adaptadorloopback para remoto ni asumir compatibilidaduniversal.

Revisar eventos de plataforma con correlation/build/time. No exponer tokens/cookies/headerssecretos/inputs o contenidos de usuarios en evidencia pública; publicar únicamente resumen curado (status/code/duration/count/bytes/hash/correlation no sensible). Guardar originalesprivados según contratos y autorización. Si no se dispone de evidencia de proveedor o cuerpo, dejar noverificado; nunca inferir que un500 proviene de producto por su status solamente.

STOP del gate y rollback siguen la SDD vigente y autorización aplicable. Esta guía no modifica gates ni habilita reintentos; un futuroPASS no prueba causalidad de errores históricos.
