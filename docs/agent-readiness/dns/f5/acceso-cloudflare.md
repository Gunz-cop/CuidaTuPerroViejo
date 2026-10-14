# F5 — Acceso Cloudflare recuperado, dependencia pública pendiente

2026-10-14, posterior al STOP107 inicial. El propietario conectó MCPCloudflare y pidió probar de nuevo. El conector autenticado funciona sin necesidad de copiar tokens al entorno. No se alteró configuración de Cloud Environment ni credenciales.

## Evidencia actual de control plane

Lecturas GET realizadas entre20:09:55 y20:11:25UTC por MCPCloudflare. Main revalidado7e389a83c87cd5f14537f4b07f0cd783ca572251; rama F5 conserva esa base, no se usa F4 histórica.

| Elemento | Resultado observado |
|---|---|
|Zona|cuidatuperroviejo.com, active/full, pausedfalse|
|ID zona|a31efda75e3253df2961f4266897e5dd|
|Cuenta|972ab3666747a93c084965dd4585d4cc|
|Plan reportado por zona|Free Website, legacy_idfree, sin suscripción|
|NS configurados|eric.ns.cloudflare.com, lola.ns.cloudflare.com|
|DNS|18registros, página1/1, total_count18; no nombres _agents ni tiposSVCB/HTTPS en inventario configurado|
|TTL API|17registros ttl1(Auto), uno ttl3600; no confundir1 con un segundo ni atribuirlo a TTL wire|
|DNSSEC API|statusdisabled; algoritmo/DS/digestnull. No modificado, no equivale a consulta pública de DS|
|Apex|AAAA administrado porWorker, proxiedtrue; no modificar|
|API SVCB/HTTPS|OpenAPI admite tipos y data.priority/target/value; soporte efectivo de parámetrosDNS-AID aún no acreditado sin patch/contrato ni ensayo autorizado|

No hay bloqueo de credenciales para esas lecturas. La lista permissions del API incluye DNSedit y WAFedit, campo deprecated/informativo; acceso técnico no es autorización de aplicar patch. No hubo mutación ni intento de prueba de escritura. No se solicitan tokens adicionales para estas lecturas.

## Inspección de acceso acotada

- Lista de rulesets de zona: Normalization6, ManagedFree74, DDoSL7versión3454 y una entrada de redirección dinámica. Lista de cuenta: ManagedFree74. No aparecen rulesets personalizados firewall o rate limiting en estas listas; no se interpreta como ausencia de toda protección.
- Redirección exacta de zona: hostwww a https://cuidatuperroviejo.com +uri.path,301, preserve_query_stringfalse; enabledtrue. No se modifica.
- IP AccessRules de zona: lista vacía, total_count0. PageRules: vacía.
- Settings: browser_checkon, security_levelmedium, challenge_ttl1800; sslstrict; http2/http3on. El setting legacy wafoff no demuestra ausencia de ManagedFree/DDoS. Ningún ajuste cambiado.
- BotManagement: enable_jsfalse,fight_modefalse,ai_bots_protectiondisabled; is_robots_txt_managedfalse. Estos settings no acreditan por sí solos acceso HTTP sin challenges ni cambian la política publicada.
- Se consultó el endpoint legacy firewall/rules que la OpenAPI aún enumera. API devuelve error10020/firewallrules.api.deprecated y remite a RulesetsAPI. No es fallo del sitio ni motivo para alterar protecciones; no se reintenta el endpoint obsoleto. Otras lecturas se capturaron aparte; no se simulan respuestas perdidas del primer Promise.all.
- No se ejecutaron ni consultaron contenidos privados de contacto/admin, pruebas de carga, deadline102 o mitigación103. Revisar protección de producto permanece pendiente junto con HTTPfuncional.

Originales completos de controlplane se conservan **privados**, fuera de git, en /workspace/f5-originales/cloudflare-lectura/; incluyen inventario completo, settings, errores y timestamps. Esta proyección no publica registros de correo/verificación ni configuración ajena innecesaria.

## Dependencia residual #107

CloudEnvironment reporta revisión4 running/connected, redunrestricted/enforced, observaciones actuales, sin secrets/identidades configurados. Eso no bloquea el conectorOAuth deCloudflare; son mecanismos separados.

La prueba solicitada de HTTPpúblico sigue fallando: curl--max-time15 -I https://cuidatuperroviejo.com → exit7, Failed to connect to proxy port8080 after0ms. Política local mantiene proxyobligatorio y ninguna concesiónTCP adicional. No se elude el proxy. El fallo se produce antes de HTTP y no acredita challenge, resolución o error de producto.

Por tanto #107 se resuelve **parcialmente**: ya hay acceso a zona/plan/DNSSEC/settings, pero siguen faltando guía vigente recuperable del evaluador, compatibilidad exacta de parámetros y consultas/verificación pública/SDK/CLI desde entorno funcional. Los NXDOMAIN archivados17:23UTC continúan históricos. El controlplane no sustituye autoritativos/resolvers.

SDD aún0/2, no presentada/ratificada; implementación0/5. Ningún registro aplicado ni patch aplicable inventado. No mutacionesDNSSEC/NS/proxy/WAF/plan/producto. Política search=yes,ai-input=yes,ai-train=no preservada. #102/#103 mantienen alcance y limitaciones. No F6.

Reanudación restante: restablecer conectividad del entorno mediante mecanismo soportado para recuperar fuentes y realizar verificaciones públicas con originales; después concretar SDD/patch/rollback, auditoría y autorización del patch si falta. El permiso de conectar MCP no se extrapola a modificar zona.

Rollback de esta entrega: eliminar sólo este documento; no hay cambio de plataforma que revertir.
