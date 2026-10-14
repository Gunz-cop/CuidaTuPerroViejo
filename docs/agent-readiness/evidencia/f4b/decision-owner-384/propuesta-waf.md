## Hallazgo aceptado en F4B; mitigación futura de plataforma

El propietario acepta C09 (90/91,120/121,cap2/3) como **no determinable en plataforma, con limitación**, no PASS. Preview384f520/927916b4: desde la misma IP y coloORD,121POST en6.96s respondieron200, incluyendo91tools/call; ningún429. Tercera petición mientras dos uploads estaban abiertos respondió200 en la ejecución anterior. Cada status/Cf-Ray está archivado. Contadores en memoria porisolate no ofrecen protección efectiva acreditada enCloudflare. Las herramientas son públicas y sólo lectura/cálculo; no efectos. Decisión/evidencia: docs/agent-readiness/evidencia/f4b/decision-owner-384/ y preview-reanudacion/cuotas.json. Relacionado#90; no bloqueaF4B por decisión delpropietario.

**Sólo propuesta. No implementar en F4B ni modificar producto/configuración/plan comercial.** Ownership futuro: propietario de plataformaCloudflare; revisión de interoperabilidad por responsableMCP. No auth/comercio/escrituras.

### Opción recomendada, condicionada al plan real

Regla WAF Rate Limiting de la zona de producción,120requests/60s porIP ycentro de datos, contando **todos** losPOST a/api/mcp, incluidos rechazados. AcciónBlock429, período de mitigación60s si elplan lo admite. No challengeHTML/JS para clienteMCP. Expresión propuesta para unplan que admita Host yMethod (Business/Enterprise):

```text
(http.host eq "cuidatuperroviejo.com" and http.request.uri.path eq "/api/mcp" and http.request.method eq "POST")
```

En API, características `["cf.colo.id", "ip.src"]`; dashboard incorpora cf.colo.id implícitamente. WAF agrega porcentro de datos, independientemente delisolate, pero **Cloudflare no ofrece un contador global de toda la red**. No prometer121exactamente→429 ni confundir bloqueo en edge con erroresRPC de producto. Evaluar respuesta429 legible porSDK, headers ynoHTMLchallenge; cuerpo personalizado sólo si planadmite.

No afirmar que esta configuración sea disponible: verificarplan/entitlements/rules existentes antes de generar patch de plataforma. Free sóloPath/VerifiedBot, ventana10s: no admite esta expresión ni equivalencia120/60; Pro admiteHost/URI/Path pero noMethod según tabla vigente. Un fallback que cuente todos losmétodos o20/10 cambia la política: requiere nueva decisión, no conversión automática. La IPcompartida/NAT puede bloquearclienteslegítimos; valorar explícitamente. Sin comprarplan ni activarregla ahora.

### Alcance y gates futuros

- Inventario de hosts: WAF de la zona no protege automáticamente workers.dev/CommitPreviews. Verificar si existe otro endpoint público que permita bypass; decidir restricción/exposición de plataforma aparte, sin inferirlo ni cambiarF4B.
- No trasladar cap2 odeadline aWAF: la regla es mitigación de frecuencia, no control de concurrencia/CPU/output/global.
- Confirmar configuración ASSETS/subrequests: Cloudflare documenta que subrequestsWorkers a la misma zona pueden contarse aparte. Medir esealcance antes de afirmar paridad con contadorPOST delproducto.
- Preparar configuración revisable y autorización de plataforma; ensayo en staging adecuado a la zona,clienteSDKreal sinchallenge; status/Cf-Ray/ventanas/recuperación capturados. Límites no garantizan un429en el ordinal exacto porpropagación/topología.
- Rollback de plataforma: deshabilitar únicamente regla nueva porIDreal, conservar configuraciónoriginal ymediciones. No publicar cambios deproducto ni alterar contratosF4B.

### Referencias primarias consultadas2026-10-14

- https://developers.cloudflare.com/waf/rate-limiting-rules/ — availability,campos,períodos segúnplan.
- https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/ — características/acciónBlock/status429/parámetros.
- https://developers.cloudflare.com/waf/rate-limiting-rules/request-rate/ — cf.colo.idobligatorio,contadoresporcentro,no globales,subrequests.

Originales de referencia privados con hashes; proyeccionescuradas en documentación. No asumir plan de la cuenta ni consultar/configurarCloudflare en esteencargo.

Issue creado: https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/103 . No implementado en F4B.
