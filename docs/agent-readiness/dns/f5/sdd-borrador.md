# F5 — SDD: puntero DNS-AID al catálogo publicado

**Borrador concreto. No presentado a auditoría ni ratificado: falta la decisión del propietario sobre #108.** Fecha: 2026-10-14. [Payload propuesto](patch-propuesto.json). Ningún registro aplicado.

## Alcance y ownership

Base de producto y main verificada: `7e389a83c87cd5f14537f4b07f0cd783ca572251`, tree `6a2c50cc3e28c30389668bd70070b8cb545c36bd`. Los cierres finales F4A/F4B/MCP104 y la baseline se documentan en [estado.md](estado.md). Rama propia: `agent-ready/f5-dns-aid`. El fallo del clone local no se presenta como un checkout realizado.

Ownership: `docs/agent-readiness/dns/f5/` y, después de los gates y autorización, exclusivamente el nuevo registro descrito aquí. No modifica producto, CLI, SDK, indexación, DNSSEC, nameservers, proxy, WAF, plan o facturación. No inicia F6, autenticación o comercio.

Autor y coordinador: Sol/high. Auditor independiente fijo: `/root/auditor_f5`, creado explícitamente con `gpt-6.1-sol/high`. SDD: máximo dos revisiones; primera FAIL permite un ciclo correctivo y segunda FAIL exige STOP. Implementación: máximo cinco por issue; quinta FAIL exige bug y STOP. Consultas de investigación no cuentan como dictámenes. Estado actual: SDD 0/2, implementación 0/5.

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

El payload completo está en `patch-propuesto.json`. No se modifica el AAAA del apex administrado por Workers ni ninguno de los otros registros.

A las 20:19 UTC, Browser Rendering con JavaScript deshabilitado obtuvo 200 para `/.well-known/ai-catalog.json` y `/api/mcp/server-card`, con URL final idéntica y JSON pertinente. El catálogo tiene tres entradas y la card apunta a `/api/mcp`. Es evidencia para ese cliente remoto, no una prueba SDK, negociación h2, ausencia universal de challenges o recorrido completo.

## Decisión esencial pendiente: DNSSEC

La guía pide: “Sign public DNS for AI Discovery (DNS-AID) discovery zones with DNSSEC so validating resolvers return authenticated data”.

La zona está sin firma y el encargo prohíbe cambiar DNSSEC. Un registro sin firma puede ser funcional conforme a la flexibilidad del draft, pero no satisface ese requisito de la guía. No conocemos todo el parser privado: no se anticipa PASS o FAIL del scan. Incluso un PASS observado no acreditaría una firma inexistente.

[Bug #108](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/108) requiere una decisión antes de presentar una SDD ratificable:

- Conservar DNSSEC y admitir una entrega funcional sin firma, con esa limitación y sin declararla F5 completa sólo por puntuación.
- Encargar la preparación separada de DNSSEC, incluyendo registrar, DS, cambio exacto, riesgo, rollback y revisión, sin activarlo ahora.

No se presume elegida ninguna opción. El gate de firma no se retira silenciosamente.

## Aplicación, compatibilidad y propagación

Después de resolver #108: auditoría PASS, ratificación literal y congelación de SHA/hash de SDD y payload. Comprobar la autorización aplicable al POST concreto; permisos del conector no la sustituyen.

Antes de escribir: GET de zona, DNSSEC, settings y registros del owner exacto. Si cambian plan, NS, estado DNSSEC, disponibilidad h2 o el owner deja de estar vacío, STOP. Revalidar main y destinos publicados. Un único POST sin retry automático, seguido de GET por el ID real devuelto. Guardar requests y resultados originales del conector, timestamps y normalizaciones de Cloudflare.

SVCB no crea host o índice y no cambia TLS. El consumidor de índice usa TargetName para conectar y validar certificado; nunca utiliza el nombre con underscores como host TLS. Clientes sin esta convención conservan las vías HTTP existentes. No se fijan IP de CDN ni parámetros experimentales.

TTL positivo propuesto: 300. El SOA histórico tenía minimum 1800; antes del cronograma público se obtendrá el SOA actual. Si los autoritativos son correctos y un resolver conserva NXDOMAIN con TTL negativo vigente, clasificar propagación y programar una única comprobación tras ese TTL + 60 segundos. No polling, cambio de resolver para forzar PASS ni reescritura del registro.

## Matriz, presupuesto y STOP

Preparación anterior a congelación: hasta 14 llamadas GET de control plane iniciadas; una devolvió error de API legacy deprecada y tres respuestas del primer lote no se conservaron. No se inventan esas respuestas. Tres lecturas remotas Browser Rendering: guía, catálogo y card. Búsquedas de schemas y lecturas GitHub se registran aparte.

Presupuesto futuro:

| Grupo | Máximo y uso |
|---|---|
| Control plane | 12 llamadas: prechecks 4, POST 1, readback 1, reserva rollback GET/DELETE/readback 3; las otras 3 no autorizan retries de mutación |
| DNS | 16 consultas: baseline 2 autoritativos SVCB + 2 resolvers SVCB + 2 DS; post 2 autoritativos SVCB + 2 resolvers SVCB + 2 SOA; segunda ronda 2 resolvers tras TTL; reserva rollback 2 |
| Recorrido HTTP | 12 GET/HEAD/OPTIONS a índice, OpenAPI, skill, búsqueda, lectura, Markdown canónico, robots y cards; incluye negativo de ID inválido |
| SDK MCP | Una ejecución del harness publicado, máximo 24 solicitudes, sin pruebas de deadline, cuotas o carga |
| Evaluador | Exactamente dos POST por CLI congelada, uno content y uno all-ui, después de los gates públicos; primer error exige STOP sin retry |

| Gate | Oráculo |
|---|---|
| V00 | Decisión #108, SDD PASS, ratificación y autorización concreta aplicable |
| V01 | Previo vacío; POST devuelve ID y GET coincide en nombre, tipo, prioridad, target, parámetros y TTL |
| V02 | Eric/lola y resolvers Cloudflare/Google: respuestas originales, TTL y timestamps; DS/AD clasificados sin atribuir firma inexistente |
| V03 | TLS y ALPN h2 válidos, catálogo y card útiles sin challenge HTML/JS para el cliente HTTP |
| V04 | DNS → ARD → OpenAPI/skill → search q=cushing → ID del resultado → lectura íntegra cotejada en bytes/hash → cita URL canónica y fuentes contenidas en el documento |
| V05 | Client/StreamableHTTPClientTransport reales SDK 2.3.1: inicialización/listado en ambas eras, cuatro calls modernas, paridad API/cálculos, lectura/hash y Origin negativo pertinente |
| V06 | Política search=yes, ai-input=yes, ai-train=no; cards, Link y lectura sin regresiones |
| V07 | Snapshot fijo, patch aplicado y originales al mismo auditor, máximo cinco revisiones por issue |
| V08 | CLI congelada, DNS-AID PASS observado, ausencia de regresiones y condición de cierre explícita derivada de #108 |

Fallo funcional, propagación y error de herramienta se registran por separado. Hueco esencial, respuesta inesperada, presupuesto agotado o quinta FAIL implican bug y STOP dependiente. No debilitar oráculos. Conservar EOF y AbortError posteriores a frames completos exactamente como los observe el harness, sin convertirlos en fallos de producto o éxitos distintos.

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

## Rollback

El owner estaba vacío. Conservar el ID real devuelto por POST. Antes de borrar: GET por ID y cotejo exacto de tipo/nombre/TTL/prioridad, target normalizado y parámetros semánticamente equivalentes. Si difiere o el ID es incierto, STOP; no borrar a ciegas.

DELETE sólo de ese ID y readback del owner. No restaurar la zona completa ni borrar cambios concurrentes. No hay rollback de DNSSEC, WAF o producto porque no se modifican. Tras retirar el registro puede subsistir caché positiva hasta TTL 300; registrar propagación y verificar dentro del presupuesto.

#102 y #103 mantienen sus estados y limitaciones. Este borrador no reabre las matrices F4 ni declara PASS sus aceptaciones con limitación.
