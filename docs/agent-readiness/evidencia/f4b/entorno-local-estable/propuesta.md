# Propuesta concreta: herramienta local aislada, pendiente de admisión

2026-10-14. El propietario pide avanzar y terminar F4B. Se prepara solución de entorno antes de incorporar: no otra corrección especulativa de producto/harness ni repetición de matriz sobre la misma herramienta fallida. **Estado: propuesta, no instalación/ejecución ni contrato ratificado.** R2/5FAIL/STOP publicación vigente; R3 no iniciado.

## Evidencia y límites

La ejecución235f666 captura500completoNetworkconnectionlost/ProxyWorker (hasha8a92a...), después de403Originnull y en Originválido, con cuerpos reales/terminalend. Esto acredita capa local fallida, no causa exacta. Los131/132captures completas no hacen pasar C08.

Fuentes primarias consultadas2026-10-14: cloudflare/workers-sdk issues [15203](https://github.com/cloudflare/workers-sdk/issues/15203), [15451](https://github.com/cloudflare/workers-sdk/issues/15451), [15709](https://github.com/cloudflare/workers-sdk/issues/15709). Están abiertos; reportan misma firma en ProxyWorker, POST/cuerpos/aborts/assets y regresión observada con Miniflare5alpha frente a4. Son informes externos, no fix oficial ni prueba causal de nuestro caso. No dar a comentarios/triageautomatizado estatus de respuesta de mantenedor. No afirmar que un soloPASS demuestra versiónarreglada.

Inspección del paquete instalado4.128.0: ProxyWorker.ts forwardfetch rechaza deferredResponse anteerrornetwork y comunicaerror aProxyController; coreentry.worker.js:5201 envuelve service.fetch y catch produce500texto. La capa no es parte del servidor MCP publicado. No se modifica ese código ni se parchea node_modules.

## Cambio exacto propuesto

Crear toolchain local **fuera del repo y del node_modules del producto**, con manifest aislado:

```json
{"private":true,"dependencies":{"wrangler":"4.116.0","miniflare":"4.20260730.0","workerd":"1.20260730.1"}}
```

Pins verificados en metadatosnpmprimarios: wrangler4.116.0 depende exactamenteMiniflare4.20260730.0/workerd1.20260730.1; Miniflare4 mismoWorkerd. Node>=22 permitido, usar24.19.0. Wrangler4.117.0 introduceMiniflare5alpha según referencia externa;4.116.0 es candidato concreto previo, sin probar distintas versiones por tanteo. Instalación, si admitida, en `/workspace/f4b-originales-privados/entorno-local-estable/toolchain`, con package-lock propio/integridades/paquetesplataforma registrados, no scripts de producto ni escrituras de configuración de usuario. No añadir deps/overrides al repo.

Conservar **producto192dcdd**, SDKserver/client2.3.1, package/lock producto, dist192entryhash725177fd..., flags/compatibilitydate2026-05-23/bindings/routing/OpenAPI/SDD/contratos intactos. Usar el mismo `dist/server/wrangler.json` y --local (no remotebindings), con binario externo4.116.0. Mismo Client/StreamableHTTPClientTransport reales, node:http admitido y consumo-control235f666; Nodefetch remoto sigueintacto. No eliminarassets, no drain ilimitado, no cambiar406/413/400 ni suprimir streaming/cancelación.

Un solo arranque, verificación de versión real del binarioWorkerd/SDK y hashentry/config antesdeHTTP, misma matriz320requests sin retries/redirects; startup incompatible→STOP sin degradar flags/config ni elegir otra versión. FAIL→conservarerrorcompleto ySTOPsinsegunda matriz. PASS→evidenciafija yR3/5 mismoauditor; registrar alcance de toolchain diferente frente aproduction/previewactual4.128.0. No reemplazar gateWrangler/workerdreal por mocks ni por preview. No afirmar que cambió/fuearreglado el producto.

## Admisión necesaria antes de incorporación

SDD§2: «No tocar ... config Wrangler, bindings sensibles o flags/stack ... Si otro archivo resulta esencial, bug/STOP y decisión explícita antes de cambiarlo». §8 exigeWranglerlocal/workerdreal, sin pin numérico deCLI. La consulta al mismoauditor debe confirmar si toolchain externo de prueba cumple con autorización explícita del propietario y sin cambiar cláusula normativa; si requiere adenda, indicar sustituciónexacta y detener incorporacióndependiente.

La autorización previa exigió mantener versiones y presentar/admitir cualquier cambio de entorno antes de incorporarlo. Por ello se solicita decisión explícita únicamente sobre **esta herramienta local externa**, no producto/SDK/config/pins deCI/deploy ni gates. Todo está preparado para revisión antesdeinstalar. No main/integración/producción/scans/publicación. Mantener cuerpos/logsoriginales privados y guía-incidente previa, política vigente y F5/F6 aparte.
