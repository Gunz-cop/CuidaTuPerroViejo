# Verificador externo propuesto — no ejecutado

Preparado para revisión del propietario: sólo prueba deadline pendiente, no cambia producto, SDK, protocolos, configuración del repo, rutas ni criterios. Node24.19.0 / Undici7.29.0, SDKcliente2.3.1 exacto y lock propio de13paquetes transitivos extraídos del lock del snapshot384f520. Nunca editar el package.json del producto.

Necesita un runner fuera de este entorno administrado, con salidaHTTPS autorizada y acceso nativo al Commit Preview. **No quitar el proxy ni intentar eludir el sidecar de este entorno**. No existe ruta general directa aquí. No atribuir causalidad al proxy por el solo cambio de runner.

Antes de ejecutar, el propietario debe admitir este cambio de entorno de prueba y aportar acceso a un runner adecuado. Un único intento, máximo6requests, cero retries/redirects, sólo /api/mcp del previewinmutable927916b4, UAidentificado. Descontar del presupuesto global320: las solicitudes ya ejecutadas constan en budget.json externo. Detener ante cualquier error, conservar resultados/originales; no variantes sucesivas.

```sh
node --version
npm ci --ignore-scripts --no-audit --no-fund
node deadline.mjs https://927916b4-cuidatuperroviejo.g1721m.workers.dev ./evidencia-deadline
```

El script exige Nodev24.19.0 y Undici7.29.0. Usa Client y StreamableHTTPClientTransport reales para conexión/listado moderno, luego el mismo upload32768 abierto sin Content-Length del caso anterior y Nodefetchreal. Captura cuerpo/status/headers/Cf-Ray/tiempo antes de aserciones. Timeoutcliente16s sólo limita espera de fallo; no altera el gate de10–12s. 500JSONRPC exacto y recuperación inmediatamente posterior son obligatorios; si falla plazo/status/cuerpo no hay petición posterior. Cierre/abort y originales siempre se conservan.

Si pasa, acredita este gate en ese entorno admitido/preview real; **no acredita que Envoy haya causado el fallo anterior ni que se haya arreglado la interacción anterior**. Si falla, STOP con evidencia completa, sin nuevosentornos/variantes.

Sin producción/main/scans/contacto/escrituras, sin publicar ni habilitarR3 por sí solo. C09noDet exige decisión posterior del propietario; R3/5 continúa pendiente. Instalar sólo en directorio propio fuera del repo, preservando proxy/CA que exija ese runner.
