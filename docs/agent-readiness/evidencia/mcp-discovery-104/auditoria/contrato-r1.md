# Auditoría independiente del contrato MCP discovery — issue104 — R1/5

**Dictamen: PASS del contrato fijo. No se detecta un hueco esencial ni un bloqueante de fondo dentro del alcance del correctivo.** Este dictamen admite implementar después de la ratificación aplicable; no acredita implementación, HTTP del producto, resultado del evaluador, integración ni publicación.

Fecha: 2026-10-14 UTC. Auditor independiente designado `/root/discovery_auditor`, GPT-6.1 Sol/high conforme a la configuración de coordinación; distinto del autor `/root/discovery_author`. No se delegó ni se corrigió el contrato o el producto.

## Identidad y contador

| Elemento | Identidad fija revisada |
|---|---|
| Candidato documental | `d09d63074215a49f648186127a109cab96077833` |
| Tree | `8821ad97d9a9e85344a6e4ba14b16065324b7f6a` |
| Base de producto | `b2ab1082c02799dab4306a7c167a6114c0163a90` |
| Tree de la base | `59dd444439b4f78018eba4a010b25840c4bdd87b` |
| Contrato | `docs/agent-readiness/fases/mcp-discovery-104.md` |
| Snapshot del auditor | `/workspace/ctpv-discovery104-audit`, HEAD detached sobre el candidato, limpio |
| Cierre F4B consultado en Git | `93f67404fe24fd38c7c72df17e642507537bb6b6` |

El contador propio del issue104 incluye contrato e implementación, con máximo cinco dictámenes del mismo auditor. Esta es **R1/5 PASS**; la siguiente revisión será R2/5. La precisión se recibió antes de este primer dictamen y coincide con el contrato fijo; la nota inicial que excluía contrato no produjo una revisión anterior, omisión ni reinicio. Hueco esencial o quinta FAIL exige bug/STOP según el encargo. El contador y los FAIL históricos de F4B son independientes y permanecen intactos.

El diff respecto a la base contiene exclusivamente seis archivos documentales nuevos: contrato, manifest y cuatro originales de fuentes públicas. No hay delta de producto, configuración, tests ni harness que se esté aprobando como implementación.

## Método e integridad

Se revisaron AGENTS.md, el contrato completo, las seis adiciones, las autoridades actuales en `capabilities.json` y `runtime.ts`, generación/checks/discovery/headers existentes, schemas MCP congelados pertinentes y la CLI de medición. Se cotejaron el informe F4B R3/5 y el cierre de producción conservados en el commit documental declarado.

Los cuatro originales indexados coinciden exactamente en bytes y SHA-256 con el manifest: guía 844 bytes, headers 368 bytes, UI 58226 bytes y headers UI 372 bytes. La guía primaria se consultó además en lectura HTTP durante la preparación: sus requisitos coinciden con la captura del contrato. No se hizo ningún HTTP de producto, scan, build, instalación ni ejecución SDK durante esta revisión de contrato. Las comprobaciones locales fueron lecturas, consultas Git e integridad de archivos; no son evidencias de ejecución de los criterios futuros.

Los SHA-256 de `index.mjs` y `shared.mjs` coinciden con los fijados en el contrato: `e2ea8f3db000e241a49628eb62182a018bb17b54b070917e0261c77291cfc438` y `89581c2a8750946fb5d972f42e4069f3b55ccc74a419606b5914de0344ad67b2`.

## Fondo del contrato

| Área | Evaluación del contrato |
|---|---|
| Problema y fuente del evaluador | **PASS.** El original histórico realmente conserva MCP Server Card fail y las tres rutas well-known declaradas. La guía exige JSON200 en la nueva ruta, serverInfo name/version, endpoint y capabilities. No se inventa un JSON Schema ni se atribuye al backend privado un algoritmo no observado. La UI demuestra perfiles y solicitud de scan, con límite de inferencia explícito. |
| Descriptor y autoridad efectiva | **PASS.** Name/version/endpoint proceden del registro usado por card/runtime actuales. El único anuncio es tools con listChanged false, igual a los dos literales efectivos que se extraen al registro compartido. No hay resources/prompts, auth o primitivas inexistentes. El schema MCP congelado admite tools y listChanged booleano opcionales. |
| Preservación de la card nativa | **PASS.** La nueva forma es un descriptor de compatibilidad separado, sin atribuirle el schema de la card experimental. Card nativa, tipo, ruta, links, protocolos y anuncios deben conservar bytes/comportamiento; la modificación de runtime se limita a sustituir sus dos literales equivalentes. |
| Generación y checks | **PASS.** Se exige generación determinista con formato exacto, staging/collision detection, límite, manifest y comprobación byteexacta; prefijo reservado para detectar extras y ausencia. Registro/capabilities corruptos deben fallar. El ownership permite materializar esos requisitos en los generadores y tests focales indicados. |
| Servicio HTTP | **PASS del diseño.** Asset generado fuera de run_worker_first con bloque exacto de headers; GET200, HEAD200 sin cuerpo, JSON/cache/CORS/nosniff y ausencia de redirecciones son gates explícitos. Wrangler local y CommitPreview real deben probarlos; mocks no sustituyen ese HTTP. No se afirma que hayan pasado todavía. |
| Regresión e identidad de build | **PASS.** Diff completo frente a build de base, originales y SHA/tree fijos impiden transferir receipts. Card/ARD/llms/OpenAPI/UI/contenido quedan preservados; contacto sólo admite la equivalencia restringida ya definida y sourceguard intacto. El inventario histórico C12 no se reetiqueta ni se altera para ocultar la nueva cardinalidad. |
| Smoke acotado y promoción | **PASS.** SDK2.3.1 real y Node fetch, ambas eras/listas, cuatro llamadas modernas, lectura/hash, robots/política y Origin403 cubren el riesgo de extracción del registro. GET/HEAD de ambas cards verifican identidad de artifact. Captura cuerpos/terminal reales, sin normalizar truncamientos, sin retries/redirecciones y cap24 contando tráfico automático. Preview y producción tienen raíces/receipts propios. |
| Medición del evaluador | **PASS del gate.** Content7 y all-ui20 se mantienen con CLI congelada, sin scoring ni universo selectivo. D08 sólo permite declarar mcpServerCard pass ante una respuesta real posterior a publicación; un fail/regresión exige registro y bug/STOP. El contrato no promete incremento de puntuación ni nivel por inferencia. |
| Ownership, historial y reversión | **PASS.** Exclusiones precisas, STOP ante un cambio esencial fuera de ownership, gates/autorización separados y revert específico del correctivo preservando F4B. No se extrapola la autorización de fases previas a publicación nueva. |

El contrato contiene una forma razonable y verificable que satisface los mínimos públicos observados, y declara expresamente que el backend del evaluador sigue sin especificación primaria disponible. Por ello, la revisión documental no demuestra que ese parser privado aceptará la forma. D08 mantiene esa incertidumbre como medición real pendiente; no se sustituye por un schema local ficticio ni un PASS anticipado.

## Historial y límites conservados

F4B conserva **R1 FAIL → R2 FAIL → R3/5 PASS**, con sus snapshots y normas. C09 remoto no determinable con limitación aceptada permanece **sin PASS** y no acredita protección efectiva de Cloudflare. El deadline externo permanece **pendiente/no bloqueante/no deuda/NO PASS**. Este correctivo no exige repetir cuotas/deadline ni convierte esos resultados en éxito.

No se aprueba ningún cambio de SDK, transporte, tools, schemas de dominio, límites, WAF, UI/WebMCP, contenido, routing/configuración o scoring. No se aprobaron silenciosamente cambios esenciales fuera del ownership enumerado. El smoke propuesto no reemplaza esas exclusiones.

## Disposición

**Issue104, contrato d09d630/tree8821ad97: R1/5 PASS; bloqueantes: ninguno.** Puede archivarse literalmente este informe, ratificar el contrato y pasar a implementación y entrega fija para R2/5 del mismo auditor. D01–D08 siguen siendo requisitos futuros con los gates y límites declarados: este PASS documental no los marca como ejecutados ni autoriza publicación.

Informe externo íntegro: `/workspace/mcp-discovery104-contract-r1-audit.md`. Bytes y SHA-256 se comunican fuera del contenido para evitar un hash autorreferente.
