# F5 — Investigación inicial detenida por dependencia esencial

Fecha: 2026-10-14. Estado: **STOP #107; F5 no implementada ni aceptada**. [Bug y pasos de reanudación](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/107). Rama propia `agent-ready/f5-dns-aid`, creada desde main actual `7e389a83c87cd5f14537f4b07f0cd783ca572251`, tree `6a2c50cc3e28c30389668bd70070b8cb545c36bd`. El clone local falló por proxy; la rama se creó mediante conexión GitHub, sin fingir checkout/worktree.

## Base comprobada

Se leyeron AGENTS.md y docs/agent-readiness/plan.md de main. El plan conserva estado histórico F4A/F4B; los cierres finales viven en ramas documentales separadas y no se confunden con producto.

| Cierre | Fuente fija y aceptación |
|---|---|
| F4A | a42a18522b7cf4143aff56d11d4632dc3c1050da/docs/agent-readiness/evidencia/f4a/publicacion/cierre.md; publicado, auditoría final R2/2 PASS. Producto final usado por F4B cb8e10f1ead55ef0dafc666672cd3003252afc59. |
| F4B | 93f67404fe24fd38c7c72df17e642507537bb6b6/docs/agent-readiness/evidencia/f4b/implementacion/r3/README.md; producto b2ab1082c02799dab4306a7c167a6114c0163a90; mismo auditor R1 FAIL→R2 FAIL→R3/5 PASS; smoke producción14/20 PASS. |
| Correctivo MCP104 | [Cierre final](https://github.com/Gunz-cop/CuidaTuPerroViejo/blob/d45f2374bf1220f8f25b0aaa16b51a5d2e6e7373/docs/agent-readiness/evidencia/mcp-discovery-104/cierre/produccion/resultado.md); producto/main7e389; contrato R1/5 PASS→implementación R2/5 PASS. Build producción8d1bf392-1efb-4a80-b045-2c66d21a45d5, versión4fad00fc-f88e-4abc-878c-f7d50742f069; smoke20/24 PASS. |

Auditor independiente F5 `/root/auditor_f5`, creado explícitamente `gpt-6.1-sol/high`, contrastó refs, PR106 merged, receipt, raw/summaries/comparación y cierre F4B. Esta comprobación no es una nueva auditoría F4 ni dictamen SDD F5. F5: **0/2 SDD, 0/5 implementación por issue**; conservar mismo auditor. No Astra.

La autorización literal archivada «Autorizo» cubría propuesta concreta MCP104/main b2ab108→7e389. No acredita permiso de modificar DNS. El encargo actual permite investigar/preparar; aplicación depende de patch revisable y alcance autorizado verificable.

## Última medición, no estimación

Fuente fija d45f2374…/docs/agent-readiness/evidencia/mcp-discovery-104/cierre/produccion/live-{content,all-ui}/. Originales públicos request,metadata,raw,summary,manifest comprobados por lectura; sin ejecutar scans nuevos.

| Perfil | scannedAt UTC | PASS/FAIL/neutrales | Denominador | Score CLI | Nivel raw |
|---|---|---|---:|---:|---|
| content |2026-10-14T17:21:52.212Z|6/1/15|7|86|5 Agent-Native, selección parcial|
| all-ui |2026-10-14T17:23:02.101Z|11/4/7|15|73|5 Agent-Native|

Fórmula `pass-over-counted-round/1`: round(pass/scoredTotal*100). Raw no contiene score numérico. MCP pasó de FAIL a PASS respecto del cierre F4A; sin regresiones en aquella comparación. DNS-AID sigue FAIL en ambos perfiles. 100/80 sigue previsión, no resultado F5. Universo22, selección content7/all-ui20; hash universo9037cb57950a0c49322aae6ca44c3cfd55c65d4826e88d8c4c2284a93566e99a.
Requests: content94daf42c1ee9ecfce1528d303e4b19d35e7544d8d38b6ac72ff56436708d2c21; all-ui d7533cffd3ab7c60b2e1ef9ac0a5c96cf6a0631192a16d2f5ba76194ab8fff8a. CLI index SHA256e2ea8f3db000e241a49628eb62182a018bb17b54b070917e0261c77291cfc438; shared89581c2a8750946fb5d972f42e4069f3b55ccc74a419606b5914de0344ad67b2 según cierre. Revalidar bytes antes de ejecutar.

## Evaluador observado y fuentes primarias vigentes

La respuesta original all-ui enumera exactamente estas consultas para cuidatuperroviejo.com (se adjunta extracción literal DNS en dnsAid-baseline.json):

| Nombre relativo | Tipos consultados |
|---|---|
|_index._agents|SVCB64, HTTPS65, TXT16|
|_a2a._agents|SVCB64, HTTPS65|
|_mcp._agents|SVCB64, HTTPS65|

Las siete se hicieron por Cloudflare DoH con do=1/Accept:application/dns-json. Respuestas HTTP200, DNS Status3/NXDOMAIN, ADfalse. SOA archivado: eric.ns.cloudflare.com., serial2416598283, TTL1800 y minimum1800. Es evidencia histórica17:23UTC, no inventario de zona, lista completa NS ni prueba actual de DNSSEC deshabilitado. No demuestra condiciones completas de PASS del parser. No extrapolar tipos consultados a anuncios autorizados.

[DNS-AID IETF vigente -02](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/) (27mayo2026, vence28noviembre2026) usa SVCB para endpoint/protocolo y un índice _index._agents. Para índice, TargetName obligatorio sin underscores; aliases de inventario apuntan al owner primario. DNSSEC recomendado; TLSA opcional y, si se usa, debe estar firmado. TXT es fallback; parámetros nuevos tienen asignaciones numéricas pendientes/partes experimentales. Se debe resolver compatibilidad efectiva antes de fijar parámetros. No inventar código numérico, ruta de índice ni tratar HTTPS/TXT arbitrario como equivalente.

[Cloudflare tipos DNS](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/): documenta SVCB/HTTPS y que HTTPS manual en nombres proxied no se sirve como uno DNS-only. [TTL](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/) es referencia para planificación; **plan y soporte real de esta zona no consultados**. Nada autoriza cambiar proxy para lograr puntuación.

La [guía primaria DNS-AID del evaluador](https://isitagentready.com/.well-known/agent-skills/dns-aid/SKILL.md) no pudo recuperarse: herramienta web devolvió unsupported content-type:text/markdown. Home actual sí lista DNS-AID. No sustituir la guía por artículos de terceros ni afirmar requisitos actuales completos.

## Capacidades reales y límites

El cierre publicado acredita MCP público StreamableHTTP /api/mcp, card nativa /api/mcp/server-card y descriptor /.well-known/mcp/server-card.json; cuatro tools: search_guides,read_guide,evaluate_quality_of_life,recommend_mobility_aids. API F3 ofrece búsqueda/lectura íntegra y F4A cálculos; WebMCP requiere navegador compatible. Esto delimita el inventario funcional candidato, **no fija aún registros DNS**. No existe capacidad A2A autorizada por descubrir el evaluador ese nombre. No anunciar auth/comercio/admin/contacto/escrituras.

#102 sigue abierto: deadline externo pendiente/no bloqueante/no deuda/NO PASS; no reintentarlo desde este entorno. C09 cuotas/cap remotos aceptados no determinables con limitación siguen NO PASS. #103 sigue abierto: propuesta WAF aparte no implementada ni autorizada por F5. Puede ser relevante para acceso MCP pero no se admite mitigación de abuso en esta fase. No cargas.

## Dependencia y salida segura

Entorno cloud: observaciones actuales, red unrestricted/enforced, sin secrets/runtime_variables/outbound_identities/capabilities configurados. GitHub funciona; búsqueda de plugin Cloudflare devolvió lista vacía. Proxy obligatorio resuelve pero rechaza puerto8080: git clone exit128 y curl exit7. Web no recupera DoH/descriptor JSON. Fallo de herramientas, sin atribuir fallo a producto/DNS ni al evaluador. No hubo ejecución fallida de scan.

Desconocidos esenciales: zona/IDs, plan/entitlements, soporte efectivo de parámetros y límites, registros anteriores, DNSSEC actual, TTL/NS actuales y reglas WAF/acceso. **Ningún patch DNS preparado como aplicable, ningún registro aplicado, ningún rollback de zona ejecutable inventado. SDD aún no presentada/congelada.**

Reanudación #107: restaurar conectividad por mecanismo soportado y conexión de lectura limitada a zona; no secretos por chat. Inventariar/archivar fuentes, resolver contrato de parámetros, preparar patch mínimo y rollback exacto, matriz/presupuesto/STOP. SDD máximo2 revisiones mismo auditor: primera FAIL→único ciclo correctivo; segunda FAIL→STOP. PASS→ratificación/congelación antes de aplicar. Si falta permiso del patch concreto, solicitarlo al final de esa preparación; escritura ausente puede suplirse con patch completo e instrucciones una vez conocidos datos.

Después de aplicación autorizada: autoritativos y dos resolvers con timestamps/TTL/respuestas, espera sin polling según TTL positivo/negativo, destinos funcionales sin challenge, recorrido descubrir→conectar→buscar→leer íntegro→citar y SDK MCP real cuatro tools; regresiones pertinentes política/lectura/discovery. Auditor implementación mismo, máximo5 por issue; quinta FAIL→bug/STOP. Sólo tras gates públicos: una medición content y una all-ui con CLI/perfiles/fórmula congelados; error evaluador→STOP sin retry; comparar controles/denominadores/neutrales contra baseline anterior. Presupuesto exacto debe fijarse en SDD con inventario real.

Política preservada search=yes,ai-input=yes,ai-train=no. No cambios DNSSEC/NS/plan/facturación/proxy/protecciones generales. No F6. Este commit añade documentación y extracción de evidencia; rollback documental elimina sólo ambos archivos, sin revertir producto ni historial previo.
