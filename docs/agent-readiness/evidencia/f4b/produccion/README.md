# Producción F4B — verificada el 2026-10-14

SHA real de main: **b2ab1082c02799dab4306a7c167a6114c0163a90**; tree **59dd444439b4f78018eba4a010b25840c4bdd87b**. La promoción fue fast-forward del mismo SHA auditado, sin force ni cambios de fuente. Base técnica final F4A `cb8e10f`, cierre documental aceptado `a42a185`. R3/5 PASS y autorización condicionada del propietario, junto con C09 aceptado y adenda3, preceden a la promoción.

Cloudflare confirmó el build **c4d174a4-0e9d-450c-ac85-ae76fd331057** y la versión **c687a397-dff5-4821-84e6-a7ed2a8788c9**. Check `115836404116`, completed/success a las `2026-10-14T11:50:13Z`, asociado al SHA exacto. El receipt de producción no incluye Preview URL y es distinto del build de preview `0294af69`/versión `5a43d748`. Los originales de checks, push y refs sustentan esta identidad; preview no se presenta como producción.

Smoke real: Node 24.19.0, Undici 7.29.0, SDK 2.3.1, Client/StreamableHTTPClientTransport y Node fetch; User-Agent `ctpv-independent-f4b-production/1.0`. **14 peticiones, PASS**, sin retries ni redirects. Terminó a las 11:51:54 UTC. Cubre listado en ambas eras, cuatro llamadas modernas, lectura íntegra por ID y hash, QoL35/compromised, movilidadSB, card/ARD, Content-Signal de robots y Origin:null403. Statuses: once200, initialized202, GET automáticoSDK405 y Origin403.

Doce capturas terminan por EOF; dos conservan AbortError intencional al cerrar Client después de recibir y validar un mensaje SSE completo. No son errores del producto ni catorce EOF; se conservan sin repetir para ocultarlos. Requests, cuerpos, headers, digests y Cf-Ray permanecen privados e indexados; exchanges-curados.json declara la proyección y esas observaciones.

Política real: **search=yes, ai-input=yes, ai-train=no**. No contacto, admin, AI, escrituras, URLs arbitrarias, scans o score. Deadline externo sigue pendiente/no bloqueante/no deuda/NO PASS. Cuotas/cap no determinables con limitación aceptada no acreditan protección efectiva; WAF103 sigue como propuesta separada, sin implementar.

El revert `14e3bed` estaba preparado y ensayado localmente antes de promover. **No se ejecutó ni publicó en producción**, porque el smoke pasó. Conserva la base F4A y todos los documentos/historiales. Revisar el SHA si se usa después de cambios concurrentes.

Originales completos bajo la raíz declarada en indice-originales.json, con bytes y SHA256. Los JSON públicos son curación; no reemplazan originales ni reportan EOF inexistente. La rama documental propia archiva el cierre sin alterar main ni transferirle la identidad de este despliegue.
