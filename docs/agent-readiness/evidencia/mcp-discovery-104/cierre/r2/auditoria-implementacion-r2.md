# Auditoría independiente de implementación MCP discovery — issue104 — R2/5

**Dictamen: PASS de la entrega fija R2/5 para los gates de implementación previos a promoción. No se detecta un bloqueante pendiente en ese alcance.** Producción y D08 siguen pendientes de autorización, receipt, smoke y medición reales. Este informe no acredita aceptación del evaluador ni autoriza publicación.

Fecha: 2026-10-14 UTC. Auditor independiente único `/root/discovery_auditor`, GPT-6.1 Sol/high conforme a la configuración de coordinación, distinto del autor/corrector `/root/discovery_author`. La preparación previa y esta revisión completa pertenecen a una sola R2/5. No se delegó, corrigió ni ejecutó HTTP del producto, tests, builds, instalaciones, scans o mutaciones públicas durante la auditoría. Se leyeron fuentes y originales y se recalcularon integridades/comparaciones de archivos y cuerpos archivados.

## Identidades y norma aplicable

| Elemento | Identidad revisada |
|---|---|
| Candidato | `7e389a83c87cd5f14537f4b07f0cd783ca572251` |
| Tree | `6a2c50cc3e28c30389668bd70070b8cb545c36bd` |
| Snapshot del auditor | `/workspace/ctpv-discovery104-audit-r2`, HEAD detached, limpio |
| Base de producto | `b2ab1082c02799dab4306a7c167a6114c0163a90`, tree `59dd444439b4f78018eba4a010b25840c4bdd87b` |
| Contrato fijo R1 | `d09d63074215a49f648186127a109cab96077833`, tree `8821ad97d9a9e85344a6e4ba14b16065324b7f6a` |
| Checkout merge de CI | `b80547611fc5228d2a128ba81a2558a8ba5922f7`, tree idéntico al candidato |
| Workers Build de preview | `b45f8c12-3724-4928-9074-663c4af6f1b5` |
| VersionID | `55ccf415-671c-47f3-8d4f-adec1193eb4b` |
| CommitPreview | `https://55ccf415-cuidatuperroviejo.g1721m.workers.dev` |
| Reversión específica | `0f3c03ef72a5f53d268d354bc7b3210d01e0674a`, tree `2553b9fbe96711e7cc72138174f3a13051476066` |

Se aplicaron AGENTS.md, el contrato `docs/agent-readiness/fases/mcp-discovery-104.md`, su R1/5 PASS y ratificación, y la autorización expresa del propietario «Ok, autorizo» comunicada por coordinación y registrada en `admision105.md`. Esta última admite prospectivamente sólo la entrada literal del fixture `f3-discovery.test.mjs`. El contrato fijo permanece byteexacto; el informe R1 archivado conserva sus 8134 bytes y SHA-256 `ec9efe39b9cc95c12c28c3e00b7276ddfc4914108191f73389b95e49a9237723`.

Contador issue104: **R1/5 contrato PASS → esta R2/5 implementación PASS**, máximo cinco total del mismo auditor, sin reset. STOP105 y los tres FAIL offline del producto55dc4e siguen conservados: la entrada autorizada resuelve el fixture para el candidato posterior y no convierte aquellos originales en PASS. No hubo dictamen separado de adenda ni revisión omitida.

## Integridad y procedencia

| Paquete externo fijo | Bytes | SHA-256 comprobado |
|---|---:|---|
| `/workspace/mcp-discovery104-implementation-r2-entrega.md` | 10364 | `16edfcb46a37977f96d0216996aa1cbe299695f140a315d59e6ba763c54dbc9e` |
| `/workspace/mcp-discovery104-implementation-r2-indice.json` | 43794 | `a7adffe75816e4e4e37c3216b39afb5531e60640318f1b6c909eba75aa6db3aa` |

Los **118 archivos indexados** están accesibles y coinciden en bytes/SHA-256, sin diferencias. Las rutas externas al root principal están declaradas en el índice; no se reinterpretan como originales dentro de otra raíz. Los mapas completos de build se cotejaron además contra sus archivos actuales: **357 archivos base y358 candidato**, conjuntos exactos, tamaños/digests sin discrepancias. Los cuerpos request/response de las40 capturas local/preview y de las8 de rollback coinciden con sus tamaños/digests internos.

Las fuentes públicas archivadas y sus límites mantienen la procedencia revisada en R1. La guía fija exige la ruta well-known, JSON200, serverInfo name/version, endpoint y capabilities, pero no publica un JSON Schema de esa forma. No existe en este paquete código primario del parser privado. El resultado del evaluador permanece no determinado hasta la medición autorizada posterior; no se acepta un schema ficticio ni un PASS inferido.

## Fuente y autoridad efectiva

El diff de producto/checks/harness/tests contiene **once archivos** dentro del ownership original más la entrada expresamente autorizada del fixture105. El runtime cambia exclusivamente sus dos literales `{ tools: { listChanged: false } }` por `MCP.capabilities`; constructor y registerCapabilities mantienen sus posiciones y valores efectivos. SDK2.3.1, transporte, tools, límites, manejo HTTP y dominio no cambian.

`deriveMcpDiscovery` deriva name/version/endpoint/capabilities del registro real compartido, con JSON indentado dos espacios y LF. La validación cerrada del registro rechaza capabilities distintas o añadidas antes de derivar ambas formas. El nuevo archivo entra en outputPathMap, límite de descriptor, staging/collision detection y manifest. `checkArtifacts` reserva el prefijo completo `.well-known/mcp/`, exige el conjunto exacto y compara bytes/manifest; los tests conservan negativos para ausencia, alteración, extra y colisión.

Discovery sólo añade destino/MIME y `_headers` sólo el bloque aprobado. La card nativa mantiene su generador/schema primario, ruta, tipo, links y anuncios. El test SDK real compara identidad/capabilities de ambas eras; no usa esa fixture como sustituto del HTTP real. La adaptación de `f3-discovery.test.mjs` agrega únicamente la entrada literal autorizada, conservando todos los oráculos y rechazos.

## HTTP y MCP reales archivados

Local y preview contienen **20 peticiones por entorno, con cap24**, Node24.19.0 y SDK2.3.1 reales. La fuente del verificador usa Client/StreamableHTTPClientTransport y Node fetch, sin retries y con redirect manual/rechazo; cuenta también tráfico automático. Preview usa el VersionID exacto del receipt, no el alias mutable.

En ambos entornos, GET y HEAD de las dos cards son200, sin Location ni redirecciones. HEAD tiene cero bytes; MIME, no-store, CORS* y nosniff coinciden con el contrato. El descriptor nuevo mide **233bytes**, SHA-256 `efd754491893bb08e2e76456d2f18acb9899694e4c8c4fe0445ee93be284a092`. La card nativa mide **559bytes**, SHA-256 `aeea988a8e92d68085716e88755dae917215708953bbd0002a80ebd576ae1f84`, igual al build base y a su captura previa.

Se cotejaron los cuerpos completos: initialize legacy y server/discover moderno devuelven la identidad real y exactamente tools/listChanged=false; ambos listados contienen los cuatro nombres contractuales en orden. Las cuatro llamadas modernas tienen isError=false, content JSON igual a structuredContent y paridad exacta con sus cuatro respuestas API reales. La lectura conserva el documento local, **32561bytes** de Markdown y hash `621ece8b53f598a4bb6ae04ab9ed7899f4426a43b9620926f5c5fe651ec40dd3`; QoL devuelve35/compromised; movilidad severe/stressed devuelve resultKeySB. Robots conserva search=yes, ai-input=yes, ai-train=no; Origin:null devuelve403.

Por entorno: **17 statuses200, initialized202, GET automático SDK405 y Origin403**. Las capturas conservan **19 EOF y1 AbortError**, no20EOF. La petición8 legacy tools/list contiene un frame SSE terminado completo, id1 coincidente, resultado con las cuatro herramientas y terminador de evento; el AbortError ocurre al cierre del Client después de validar su resultado conforme a la fuente y al contrato. No hay truncación ni request incompleto. Se admite esa observación declarada y se conserva el error terminal; no se normaliza a EOF ni se acepta un fallo de producto como éxito.

## Build, regresión y CI

Los artifacts públicos tienen una sola adición y ninguna baja: `client/.well-known/mcp/server-card.json`. **328 artifacts existentes son byteexactos**. Los dos existentes que difieren son `_headers`, exclusivamente por el bloque nuevo, y contacto, exclusivamente por su startedAt. Se recalculó la equivalencia restringida: una ocurrencia,13 dígitos ASCII positivos, misma posición18256..18269, prefijo/sufijo exteriores iguales y marcador literal correcto. Sourceguard contacto permanece `d8b0712f96d2e5556e527e3d024561a8b15e0ab5344bdb2d59a038a98f0ee672`. Contacto no se declara byteexacto.

El manifest de API, quitando sólo la última entrada nueva con bytes233/hash correcto, es idéntico al de base. Card/ARD/llms/OpenAPI/UI/JS/contenido existentes mantienen sus bytes. No se altera ni reutiliza la etiqueta histórica F4B80/81.

Los hashes raw y diferencias completos del servidor permanecen declarados. Se cotejaron los reemplazos específicos de referencias de chunks y paths de proyecto/dependencias: diez chunks, middleware y configuración compilada resultan equivalentes bajo esos reemplazos documentados. `entry.mjs` sólo presenta la propiedad capabilities del registro y las dos lecturas autorizadas. En entrypoints las diferencias restantes son paths de dependencia y el manifest: mismo set266assets en distinto orden y key generada distinta; fuera de esos campos y paths el manifest coincide. Esta inspección explica diferencias del build; **no afirma igualdad byteexacta raw del servidor ni sustituye igualdad pública por normalización general**.

Los logs finales conservan build exitoso, offline77/77, Astro0errors/0warnings58hints, inventory/discovery/projection/artifacts/routing/growth/semantic pertinentes y Worker types/dry-run exitosos. TS88 y specs locales pertenecen al producto55dc4e: el diff posterior sólo cambia docs/fixtureMJS; no se presentan como repetidos en7e389. Los FAIL anteriores y el primer fallo del build base se conservan separados.

Raw checks y receipt final muestran completed/success para **head7e389 exacto**: CI check115912325572/run38581514158 y Workers check115911964128/buildb45f8c12/version55ccf415. Git confirma que el checkout merge de CI b805476 tiene los padres b2ab+7e389 y el mismo tree6a2c50cc que el candidato. Ese checkout no constituye una integración realizada en main. El smoke del preview pertenece a su receipt propio.

## Reversión y disposición de criterios

La reversión0f3c03e es hija exacta del candidato. Su diff frente a b2ab es vacío en producto, scripts, tests, package/lock, configuraciones y CI; docs son idénticos al candidato. Restaura los once archivos del delta preservando F4B y evidencia, sin usar el revert histórico F4B. Build y ensayo Wrangler local propio completan8/8, con ocho EOF íntegros: card nativa200/hashbase, nuevo descriptor404, catálogo28, MCP moderno discover/list/cuatrotools y QoL35/compromised, robots y Origin403. No se atribuye ese ensayo a producción ni a la imagen remota de rollback.

| Criterio | Estado para esta entrega |
|---|---|
| D01 autoridad/identidad/capabilities/tools | PASS. Registro real, fixture SDK y cuerpos reales de ambas eras concordantes. |
| D02 determinismo/formato/rechazos | PASS. Derivación compartida, forma exacta, negativos y suites pertinentes. |
| D03 manifest/conjunto/preservación | PASS. Prefijo reservado, bytes/checks negativos y manifests íntegros. |
| D04 headers/checker | PASS. Delta exacto, fuente/construido concordantes y HTTP real pertinente. |
| D05 HTTP local | PASS. GET/HEAD, cuerpos/hashes/headers y ausencia de redirects comprobados en originales. |
| D06 build/base/regresión | PASS con equivalencia de contacto y diferencias compiladas expresamente declaradas; no rawserverbyteigual. |
| D07 snapshot/CI/Workers/preview | PASS para candidato/árbol/receipt exactos y smoke acotado real. |
| D08 producción/evaluador | PENDIENTE, sin PASS. Requiere autorización y ejecución reales posteriores. |

F4B conserva **R1FAIL/R2FAIL/R3/5PASS** y sus identidades/normas. C09 remoto no determinable con limitación aceptada sigue **NO PASS**, sin protección efectiva acreditada; deadline externo sigue **pendiente/no bloqueante/no deuda/NO PASS**. No se reabren cuotas/deadline ni se atribuye a este correctivo WAF, score73 o resultado nuevo de scans.

## Dictamen y gates restantes

**Issue104: R2/5 PASS para 7e389a83/tree6a2c50cc y el paquete fijo revisado; bloqueantes: ninguno dentro de los gates previos a promoción.** Puede archivarse literalmente este informe y preparar la decisión concreta de publicación. La auditoría por sí sola no autoriza main/producción.

Antes de una promoción autorizada deben comprobarse base/candidato/receipt y reversión frente al SHA realmente integrado; una deriva no hereda automáticamente este dictamen/receipt. Después se requieren receipt propio de producción, smoke independiente cap24 y las mediciones content7/all-ui20 de la CLI congelada. Los hashes index/shared permanecen fijados. Las curaciones históricas F4A86contenido/nivel5parcial y67all-ui/nivel4general tienen procedencia propia, y sus raw HTTP históricos ausentes no se presentan como accesibles ni como resultado actual. Cualquier fallo debe conservarse con la disposición STOP/reversión aplicable; no ocultarlo con variantes o universos selectivos.

Informe externo íntegro: `/workspace/mcp-discovery104-implementation-r2-audit.md`. Bytes y SHA-256 se comunican fuera del contenido para evitar un hash autorreferente.
