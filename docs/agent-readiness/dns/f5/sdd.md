# F5 — SDD: puntero DNS-AID al catálogo publicado

**Entrega corregida para auditoría SDD R2/2, última revisión. No ratificada ni aplicada. R1/2 FAIL se conserva en auditoria-sdd-r1.md.** Fecha: 2026-10-14. Issue de ejecución: [#109](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/109). [Patch completo](patch.json). El borrador anterior permanece histórico.

## Alcance y ownership

Base de producto y main verificada: `7e389a83c87cd5f14537f4b07f0cd783ca572251`, tree `6a2c50cc3e28c30389668bd70070b8cb545c36bd`. Los cierres finales F4A/F4B/MCP104 y la baseline se documentan en [estado.md](estado.md). Rama propia: `agent-ready/f5-dns-aid`. El fallo del clone local no se presenta como un checkout realizado.

Ownership: `docs/agent-readiness/dns/f5/` y, después de los gates, el nuevo registro y la activación DNSSEC descritos aquí. Añade un SVCB y activa DNSSEC en esta misma zona, con publicación automática de DS por Cloudflare Registrar. No modifica producto, CLI, SDK, indexación, nameservers, proxy, WAF, plan, facturación ni datos de contacto del registrador. No inicia F6, autenticación o comercio.

Autor y coordinador: Sol/high. Auditor independiente fijo: `/root/auditor_f5`, creado explícitamente con `gpt-6.1-sol/high`. SDD: máximo dos revisiones; primera FAIL permite un ciclo correctivo y segunda FAIL exige STOP. Implementación: máximo cinco por issue; quinta FAIL exige bug y STOP. Consultas de investigación no cuentan como dictámenes. Historial: SDD R1/2 FAIL; ésta es R2/2, última revisión. Implementación 0/5.

## Precedencia de artefactos

Sólo `sdd.md` y `patch.json` de este snapshot son normativos para la ejecución. `sdd-borrador.md`, `patch-propuesto.json`, `estado.md` y `acceso-cloudflare.md` conservan propuestas u observaciones históricas; no son payloads alternativos ni precondiciones vigentes. En particular, la antigua condición preserveDnssecStatus=disabled no restringe la activación autorizada. Se preservan sus originales y los snapshots anteriores, sin reescribirlos. Ante cualquier divergencia entre SDD y patch vigentes, STOP; no elegir el artefacto más permisivo.

## Fuentes y contrato anunciado

1. [Guía primaria del evaluador](https://isitagentready.com/.well-known/agent-skills/dns-aid/SKILL.md), recuperada a las 20:17:17 UTC mediante Browser Rendering, HTTP 200, sin JavaScript. Original renderizado y metadata privados; no se presentan como bytes originales del body HTTP.
2. [Draft IETF vigente -02](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/): propone el índice SVCB `_index._agents`, exige TargetName sin underscores y deja el formato del índice fuera de alcance. Recomienda DNSSEC y permite despliegue sin firma con garantías reducidas. Aquí no hay TLSA.
3. [Implementación de referencia fijada](https://github.com/dns-aid/dns-aid-core/blob/c4944f511e85cc58ed606ca186371c33d35478fe/src/dns_aid/core/catalog_pointer.py): resuelve el puntero del índice al TargetName y a `/.well-known/ai-catalog.json` por defecto. Su módulo `http_index.py` reconoce ARD specVersion 1.0 y la entrada MCP. Este contrato de ruta pertenece a esa implementación; no se atribuye al draft.
4. Registro de producto: `src/agent-api/capabilities.json` y `scripts/agent-readiness/agent-api.mjs` del SHA de producto generan ARD y card desde fuentes compartidas.
5. OpenAPI de Cloudflare consultada mediante MCP: SVCB admite `data.priority/target/value`; TTL 1 significa Auto, el rango ordinario es 60–86400 y el mínimo de Enterprise es 30. TTL 300 está dentro del rango Free. Es soporte declarado/documentado; el almacenamiento y servicio reales se verificarán al aplicar.

El puntero anuncia el **catálogo existente**, que contiene API de búsqueda/lectura/cálculos, card MCP y skill buscar-leer-citar. No necesita claves experimentales, TXT, nuevos hosts ni registros A2A. No anuncia `alpn=mcp`: MCP se descubre desde la card; el transporte anunciado es HTTP/2. El setting de zona habilita h2; su negociación real queda pendiente del gate V03.

## Estado anterior y cambio exacto

Inventario API de las 20:10 UTC: zona activa/full en plan Free Website, ID `a31efda75e3253df2961f4266897e5dd`, cuenta `972ab3666747a93c084965dd4585d4cc`; 18 registros, ninguno en el owner propuesto. DNSSEC está disabled. NS: eric.ns.cloudflare.com y lola.ns.cloudflare.com.

| Campo | Valor |
|---|---|
| Nombre | `_index._agents.cuidatuperroviejo.com` |
| Tipo | SVCB, 64 |
| Prioridad | 1, ServiceMode |
| TargetName | `cuidatuperroviejo.com.` |
| Parámetros | `mandatory=alpn,port alpn="h2" port=443` |
| TTL | 300 segundos |
| proxied | false, sólo para este registro no proxiable |
| Estado anterior del owner | Vacío; no hay sustitución |

```dns
_index._agents.cuidatuperroviejo.com. 300 IN SVCB 1 cuidatuperroviejo.com. mandatory=alpn,port alpn="h2" port=443
```

El único payload normativo completo es `patch.json`, para SVCB y DNSSEC. No se modifica el AAAA del apex administrado por Workers ni ninguno de los otros registros.

A las 20:19 UTC, Browser Rendering con JavaScript deshabilitado obtuvo 200 para `/.well-known/ai-catalog.json` y `/api/mcp/server-card`, con URL final idéntica y JSON pertinente. El catálogo tiene tres entradas y la card apunta a `/api/mcp`. Es evidencia para ese cliente remoto, no una prueba SDK, negociación h2, ausencia universal de challenges o recorrido completo.

## DNSSEC y autorización vigente

El propietario respondió literalmente: **«Autorizo para que avances sobre la prohibición.»** Resuelve #108 y autoriza ampliar F5 a DNSSEC tras esta SDD/auditoría. Se conserva la autorización para continuar sin volver a pedirla; no se extrapola a NS, plan, WAF, proxy ni operaciones ajenas.

GET de Cloudflare Registrar a las 20:26:41 UTC: current_registrar=Cloudflare, cloudflare_registration=true, last_known_status=registrationActive, mismos NS y ds_records=[]. El campo cloudflare_dns=false se conserva como dato de API sin reinterpretarlo: la zona activa/full, los NS y los destinos se acreditan aparte. El original contiene datos de contacto y se archiva privado; sólo se publica proyección necesaria.

[Registrar](https://developers.cloudflare.com/registrar/get-started/enable-dnssec/) documenta activación gratuita y envío automático de DS a través de CDS/CDNSKEY, con plazo de uno o dos días. [DNSSEC](https://developers.cloudflare.com/dns/dnssec/) y [estados](https://developers.cloudflare.com/dns/dnssec/dnssec-states/) documentan las transiciones y retirada segura. No se escribe DS manual en la zona hija.

Cambio adicional exacto: PATCH /zones/a31efda75e3253df2961f4266897e5dd/dnssec con {"status":"active"}, sólo una vez. No se cambian multi_signer, presigned, NSEC3 o claves manuales. Cloudflare genera DNSKEY, DS y señales de delegación; sus valores exactos se obtienen del recibo, no se inventan antes de generarlos. Se requiere algoritmo 13 y DS/digest/key_tag consistentes con ese recibo. Si el resultado difiere, STOP sin cambiar parámetros para acomodarlo.

Inicialmente la API informa disabled con todos los campos de claves nulos, equivalente al estado deleted descrito por Cloudflare. Tras el PATCH, pending significa zona firmada aún sin DS en el registrador. Active en dashboard tampoco basta: deben verificarse DS padre coincidente, DNSKEY/RRSIG y AD de los resolvers sobre el SVCB. La guía exige firma; no se rebaja ese gate.

Observación pública previa a las 20:27 UTC: Google DoH DS obtuvo HTTP 200, DNS Status=0, sin Answer DS y AD=false, con SOA/NSEC3 de .com y TTL 900. Se conserva el render original del conector y metadata; no se atribuye autenticación a AD=false. Cloudflare DoH en Browser Rendering obtuvo HTTP 400, con HTML de error truncado por el conector: no es respuesta DNS válida ni fallo del dominio. No se repite esa variante para tantear; la comprobación final por resolver requiere un transporte funcional.

## Aplicación, compatibilidad y propagación

Auditoría PASS → ratificación literal y congelación de SHA/hash de SDD y patch. La autorización vigente del propietario cubre continuar sobre DNSSEC en F5; queda registrada con su alcance. Los permisos técnicos del conector no son su fuente.

Antes de escribir: GET de zona, DNSSEC, settings y registros del owner exacto. Si cambian plan, NS, estado DNSSEC, disponibilidad h2 o el owner deja de estar vacío, STOP. Revalidar main y destinos publicados. Un único POST SVCB sin retry automático, seguido de GET por el ID real devuelto. Si coincide exactamente, ejecutar el PATCH DNSSEC active una vez y GET de DNSSEC. Guardar requests y resultados originales del conector, timestamps, normalizaciones y claves públicas generadas. Si falla creación/readback, no activar DNSSEC; si el PATCH tiene resultado incierto, detener mutaciones y hacer únicamente GET de conciliación dentro del presupuesto, nunca repetir PATCH a ciegas.

SVCB no crea host o índice y no cambia TLS. El consumidor de índice usa TargetName para conectar y validar certificado; nunca utiliza el nombre con underscores como host TLS. Clientes sin esta convención conservan las vías HTTP existentes. No se fijan IP de CDN ni parámetros experimentales.

TTL positivo propuesto: 300. El SOA histórico tenía minimum 1800; antes del cronograma público se obtendrá el SOA actual. Si los autoritativos son correctos y un resolver conserva NXDOMAIN con TTL negativo vigente, clasificar propagación y programar una única comprobación tras ese TTL + 60 segundos. Para DS automático, hacer una observación inicial y dos rondas programadas, a las 24 y 48 horas del PATCH, como máximo. No se mantiene una espera bloqueante ni polling continuo. Si a las 48 horas no existe cadena válida, registrar incidencia y STOP de aceptación; conservar firma para no causar SERVFAIL. Registrar horarios de continuación exactos y no ejecutar scans mientras la delegación esté pendiente. No cambiar de resolver para forzar PASS ni reescribir el registro.

## Matriz, presupuesto y STOP

Preparación anterior a congelación: hasta 14 llamadas GET de control plane iniciadas; una devolvió error de API legacy deprecada y tres respuestas del primer lote no se conservaron. No se inventan esas respuestas. Tres lecturas remotas Browser Rendering: guía, catálogo y card. Búsquedas de schemas y lecturas GitHub se registran aparte.

Presupuesto futuro:

| Grupo | Máximo y uso |
|---|---|
| Control plane | 32 llamadas desde congelación: prechecks 5 (zona, DNSSEC, settings, owner, registrar), POST/readback 2, PATCH/readback 2, tres lecturas de estado inicial/24h/48h con DNSSEC+registrar 6, reserva rollback SVCB 3 y DNSSEC 6; reserva 8 sólo para conciliación de lectura y comprobación final, nunca retries de mutación |
| DNS | 36 consultas desde congelación: baseline 6 (2 SOA autoritativos, 2 SVCB y 2 DS en resolvers), post 12 (SVCB/DNSKEY en ambos autoritativos, SVCB/DNSKEY/DS en ambos resolvers, DS en dos autoridades .com), rondas 24h/48h de 4 cada una (DS/SVCB en dos resolvers), rollback 6 y reserva 4. Las dos observaciones DS de investigación previas están separadas y conservadas |
| Recorrido HTTP | 12 GET/HEAD/OPTIONS a índice, OpenAPI, skill, búsqueda, lectura, Markdown canónico, robots y cards; incluye negativo de ID inválido |
| SDK MCP | Una ejecución del harness publicado, máximo 24 solicitudes, sin pruebas de deadline, cuotas o carga |
| Evaluador | Exactamente dos POST por CLI congelada, uno content y uno all-ui, después de los gates públicos; primer error exige STOP sin retry |

| Gate | Oráculo |
|---|---|
| V00 | Autorización DNSSEC registrada, SDD PASS, ratificación y snapshot congelado |
| V01 | Previo vacío; POST/GET SVCB exactos; PATCH DNSSEC y GET con claves/DS públicos completos y estado clasificado; pending no es PASS de cadena |
| V02 | Eric/lola y padre aportan datos observados; la autenticación se acredita sólo por el contrato DoH/TLS de la sección siguiente en Cloudflare y Google. DS y DNSKEY coinciden con el recibo, y ambos resolvers validadores devuelven SVCB exacto, RRSIG y AD=true. Un AD por UDP o transporte no autenticado, pending o DS ausente no son PASS |
| V03 | TLS y ALPN h2 válidos, catálogo y card útiles sin challenge HTML/JS para el cliente HTTP |
| V04 | DNS → ARD → OpenAPI/skill → search q=cushing → ID del resultado → lectura íntegra cotejada en bytes/hash → cita URL canónica y fuentes contenidas en el documento |
| V05 | Client/StreamableHTTPClientTransport reales SDK 2.3.1: inicialización/listado en ambas eras, cuatro calls modernas, paridad API/cálculos, lectura/hash y Origin negativo pertinente |
| V06 | Política search=yes, ai-input=yes, ai-train=no; cards, Link y lectura sin regresiones |
| V07 | Snapshot fijo, patch aplicado y originales al mismo auditor, máximo cinco revisiones por issue |
| V08 | CLI congelada, DNS-AID PASS observado, ausencia de regresiones y cadena DNSSEC pública demostrada |

Fallo funcional, propagación y error de herramienta se registran por separado. Hueco esencial, respuesta inesperada, presupuesto agotado o quinta FAIL implican bug y STOP dependiente. No debilitar oráculos. Conservar EOF y AbortError posteriores a frames completos exactamente como los observe el harness, sin convertirlos en fallos de producto o éxitos distintos.

### V02: transporte y oráculo de autenticación obligatorios

Se utiliza exclusivamente DNS-over-HTTPS para acreditar AD de los dos resolvers públicos:

- Cloudflare: `https://cloudflare-dns.com/dns-query`, GET, Accept `application/dns-json`.
- Google: `https://dns.google/resolve`, GET, Accept `application/json`.
- Para cada consulta: `name` exacto, `type` SVCB/DS/DNSKEY según la matriz, `do=1`, `cd=0`. No overrides de resolver, modo checking-disabled ni fallback que sustituya una respuesta negativa por una positiva. Los controles programados de propagación siguen siendo los únicos permitidos.

El cliente debe verificar la cadena TLS contra su almacén de confianza vigente y el hostname del endpoint. No se permiten `-k`, `rejectUnauthorized=false`, certificados aceptados manualmente o redirects a otro endpoint. Si existe proxy HTTP, preservar el transporte autorizado y validación TLS; si no puede acreditarse, error de herramienta y STOP de V02. Un navegador/render sólo aporta observación salvo que entregue cuerpo íntegro, resultado DNS, metadata y configuración de TLS verificables según este contrato; un render truncado nunca es PASS. El AD de una consulta UDP/TCP sin autenticar no acredita autenticidad, aunque la dirección corresponda a un resolver conocido.

Cada respuesta que acredite PASS debe tener HTTP 200, MIME JSON pertinente, body completo conservado con bytes/hash, URL final exacta y timestamp UTC. El JSON DNS debe contener Status=0, TC=false, CD=false, AD=true, Question concordante (nombre normalizado y tipo numérico). No Answer, SERVFAIL, truncación o resultado no interpretable no acreditan PASS.

Para SVCB, ambos resolvers deben entregar el mismo RRset semántico: prioridad 1, target cuidatuperroviejo.com., mandatory alpn/port, alpn h2 y puerto 443, sin parámetros o servicios adicionales. TTL debe ser positivo y no mayor que 300 en caché; diferencias por decremento no cambian la identidad. Con DO=1 se conserva también RRSIG que cubra SVCB para esa zona. Los tipos 64 en presentación habitual o RFC 3597 se decodifican según RFC, sin cambiar los bytes originales ni rechazar una codificación válida por conveniencia del parser.

Para DS, el Answer de ambos resolvers sobre cuidatuperroviejo.com debe coincidir en key_tag, algoritmo 13, digest_type 2 y digest con el DS generado y con la delegación observada en .com. Para DNSKEY, el RRset de ambos resolvers debe incluir el KSK (flags 257, protocolo 3, algoritmo 13 y public_key) correspondiente a ese DS. Las firmas del SVCB pueden usar ZSK distinto del KSK: no exigir que su key_tag sea el del DS.

Se elige explícitamente confianza en los resolvers validadores alcanzados por DoH con TLS verificada, coherente con la referencia fijada; no se afirma validación criptográfica local si no se realiza. Las consultas a autoridades sirven para inventario, comparación y TTL, no para confiar en AD sin transporte autenticado. No relajar este método por la falta actual del runner: V02 permanece pendiente hasta que pueda ejecutarse y conservar esa evidencia.

El proxy no impide preparar este cambio. Sigue pendiente un runner funcional para SDK/CLI y DNS autoritativo con originales. Browser Rendering resolvió las lecturas indicadas; no se presenta como sustituto de esos gates.

## Medición y evidencia

Baseline final de MCP104 en d45f2374…: content 6/7 → 86; all-ui 11/15 → 73. Nivel 5 procede del raw, que no tiene score numérico. CLI `pass-over-counted-round/1`: round(pass/scoredTotal*100). Selección content 7/all-ui 20; universo 22/hash `9037cb57950a0c49322aae6ca44c3cfd55c65d4826e88d8c4c2284a93566e99a`.

Antes de ejecutar se cotejarán los SHA-256 de index.mjs `e2ea8f3db000e241a49628eb62182a018bb17b54b070917e0261c77291cfc438` y shared.mjs `89581c2a8750946fb5d972f42e4069f3b55ccc74a419606b5914de0344ad67b2`. Usar fuente limpia del producto publicado para el harness, con expected/receipt de ese mismo SHA; no atribuirle un build de esta rama documental.

```sh
node scripts/agent-readiness/index.mjs scan --url https://cuidatuperroviejo.com --profile content --out-dir /workspace/f5-ejecucion/live-content
node scripts/agent-readiness/index.mjs scan --url https://cuidatuperroviejo.com --profile all-ui --out-dir /workspace/f5-ejecucion/live-all-ui
```

No ejecutados. Comparar contra summaries fijos del cierre mediante compare. Preservar request, metadata, raw, summaries, manifests, controles, denominadores y neutralidad; no simular resultado o alterar selección para 100/80.

Originales privados con bytes/SHA-256; evidencia pública curada sin secretos ni registros ajenos innecesarios. Cierre sólo con alcance y gates acreditados, nunca por configuración del dashboard.

## Rollback SVCB

El owner estaba vacío. Conservar el ID real devuelto por POST. Antes de borrar: GET por ID y cotejo exacto de tipo/nombre/TTL/prioridad, target normalizado y parámetros semánticamente equivalentes. Si difiere o el ID es incierto, STOP; no borrar a ciegas.

DELETE sólo de ese ID y readback del owner. No restaurar la zona completa ni borrar cambios concurrentes. No se modifican WAF o producto. Tras retirar el registro puede subsistir caché positiva hasta TTL 300; registrar propagación y verificar dentro del presupuesto.

#102 y #103 mantienen sus estados y limitaciones. Este borrador no reabre las matrices F4 ni declara PASS sus aceptaciones con limitación.

## Rollback DNSSEC por etapas

1. Antes de revertir, guardar estado actual DNSSEC, DS del registrador y DS observado en padre/resolvers, con TTL y timestamps. Si se ven claves ajenas o cambios concurrentes, STOP y conservar firma.
2. En esta zona registrada en Cloudflare, PATCH {"status":"disabled"} solicita retirada mediante CDS/CDNSKEY cero. Según los estados documentados, Cloudflare sigue sirviendo DNSKEY/RRSIG en pending-disabled y disabled. Este PATCH no elimina las claves ni deja inmediatamente la zona sin firma.
3. Mantener ese firmado durante toda la retirada del DS y hasta que expire por completo el mayor TTL positivo de DS observado en el padre/resolvers desde la última presencia. La ausencia en dashboard no sustituye la ausencia pública. Si el TTL no pudo observarse o la retirada es incierta, **no ejecutar DELETE**: conservar firma y registrar bloqueo para intervención de Registrar/soporte con la misma autorización.
4. Sólo con registrar sin DS, ausencia pública en padre y ambos resolvers, TTL positivo vencido y estado disabled, se permite DELETE /zones/{zone_id}/dnssec una vez para restaurar el estado inicial deleted sin claves. Cloudflare también exige disabled antes de borrar; no usar esa protección como sustituto del gate TTL.
5. Confirmar readback y resolución. Este rollback puede durar más de una sesión; no prometer reversión instantánea. No cambiar NS, regenerar claves, comprar plan ni escribir DS en la zona hija.

El rollback SVCB y el de DNSSEC son independientes: retirar el puntero no exige retirar una cadena DNSSEC sana. Ante fallo de un destino, retirar sólo el SVCB; conservar la firma y documentar DNSSEC como cambio persistente autorizado hasta completar su reversión segura, si procede.
