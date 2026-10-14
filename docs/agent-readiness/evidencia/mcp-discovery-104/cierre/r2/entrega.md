# Entrega fija para auditoría independiente R2/5 — issue104

Autor `/root/discovery_author`, separado del mismo auditor GPT-6.1 Sol/high `/root/discovery_auditor`. No modificar snapshot durante revisión. No delegación ni auditoría propia: los PASS que se enumeran son resultados de comprobaciones, no dictamen de aceptación.

## Identidades y normativa

- Candidato final **7e389a83c87cd5f14537f4b07f0cd783ca572251**, tree **6a2c50cc3e28c30389668bd70070b8cb545c36bd**, rama propia `agent-ready/mcp-discovery-104`, worktree limpio `/workspace/ctpv-discovery104-author`. Publicado en rama propia, draft [PR106](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/106) a main. Main permanece base **b2ab1082c02799dab4306a7c167a6114c0163a90**, tree **59dd444439b4f78018eba4a010b25840c4bdd87b**; sin merge/promoción.
- Contrato fijo **d09d63074215a49f648186127a109cab96077833**, tree **8821ad97d9a9e85344a6e4ba14b16065324b7f6a**, R1/5 PASS y ratificación archivados literalmente en docs del candidato. Máximo cinco dictámenes total incluido contrato; siguiente **R2/5**, sin reset.
- STOP105 documental **d272940a71bf4cf869598c6ea3a2b7b24de2c4dd** conserva los 3 FAIL offline del producto inicial **55dc4e778f7aabfd07287692d3e055d919f98ca2**. El propietario autorizó literalmente «Ok, autorizo» al parche concreto del fixture. `admision105.md` registra admisión prospectiva; sólo se agregó `.well-known/mcp/server-card.json` a DESTINATIONS de `f3-discovery.test.mjs`, sin cambiar oráculos/assertions ni contrato aprobado. No revisión de adenda separada.
- F4B R1FAIL/R2FAIL/R3PASS sigue aceptada; C09 remoto no determinable con limitación aceptada permanece NO PASS y no acredita protección efectiva; deadline externo pendiente/no bloqueante/no deuda/NO PASS. WAF103 fuera de este correctivo.

## Implementación y alcance

La nueva forma de compatibilidad contiene exactamente serverInfo{name,version}, endpoint y capabilities{tools{listChanged:false}}, derivadas del registro real compartido. Sin $schema ni capacidades inexistentes. Las dos asignaciones del runtime reciben el mismo valor desde `mcp.capabilities`; registro/SDK/tools/transporte/límites no cambian. La card nativa conserva exactamente 559 bytes/hash.

Generador/staging/manifest/checks reservan `.well-known/mcp/`, incluyen el artifact y rechazan ausencia/extra/alteración/colisiones. Discovery sólo agrega destino/MIME; headers sólo agrega bloque de nueva ruta. Tests focales negativos y comparación del SDK real mantienen los anteriores. La única ampliación de ownership es el fixture autorizado105. CLI, config, UI, WebMCP, dominios, contenido, llms/ARD/OpenAPI y links intactos.

La guía pública del evaluador está congelada con headers/cuerpo/hash; no publica JSON Schema de esta forma ni se obtuvo código primario del backend. Este paquete valida requisitos observados y comportamiento real, sin atribuir validez de schema ni PASS del evaluador aún no ejecutado.

## Gates locales y build

Resultados originales en `/workspace/discovery104-originals/`; índice fijo acompañante `/workspace/mcp-discovery104-implementation-r2-indice.json`.

| Gate | Resultado y alcance |
|---|---|
| Build final7e389 | PASS exit0, `resumed-build.log`; source limpio y 28 documentos. |
| Offline suite final7e389 | PASS77/77, `resumed-offline.log`. FAIL original74/77 de55dc4e conservado, no reinterpretado. |
| Astro types | PASS0errors/0warnings,58hints, `resumed-types.log`. |
| Inventory, discovery, projection, artifacts, routing, growth, semantic | PASS exit0. Tool-completion íntegro conserva stdout de los primeros comandos; log del último semantic guard. Growth2/2; semantic28documents. |
| Worker types y dry-run | PASS exit0, Worker types sin diff; logs/tool completions y bundle dry-run indexados. No deploy. |
| TS88/specs previos55dc4e | PASS con sus propios logs e identidad. Desde ese snapshot sólo docs/fixtureMJS cambiaron; no se presentan como otra ejecución local en7e389. CI del árbol final ejecuta las suites/gates completos. |
| HTTP local real final7e389 | **PASS20/24** con Wrangler4.128.0, Node24.19.0 y SDK2.3.1, `/local-smoke-7e389/`. |

Build base de coordinación: b2ab limpio, 357files. Primer fallo cache-home y segundoPASS permanecen literales. No otro build base duplicado. Build candidato completo358files: `manifest-diff-7e389.json` conserva ambos mapas íntegros bytes/hash y cada delta.

Public artifacts: 328 existentes byteexactos, sin drops; `_headers` cambia exclusivamente el bloque aprobado; contacto conserva guard fuente d8b0712... y sólo una posición de13ASCIIstartedAt, exterior byteexacto; el descriptor233bytes es la única ruta pública añadida. Native card/ARD/llms/OpenAPI/UI/JS/contenido byteexactos. `public-regression-7e389.json` conserva los detalles. No se reutiliza el rótulo F4B80/81.

Server bundles: diez chunks son equivalentes después de reemplazos explícitos de referencias hash y paths de proyecto/dependencias; la symlink de node_modules cambia regioncomments y rutas debug del compilador, sin producto/dependencia alterados. `entry.mjs` sólo presenta las tres diferencias permitidas: propiedad mcp.capabilities y dos lecturas. El código de entrypoints permanece equivalente; su manifest serializado contiene el mismo set266assets en distinto orden y una key generada de Astro distinta por build. `wrangler.json`/middleware sólo cambian paths/referencias. `server-disposition-7e389.json` y análisis/diff privados explican cada diferencia, sin afirmar rawserverbyteigual ni normalizar la comparación de public assets. Una comparación inicial por caracteres fue terminada por coste cuadrático y no produjo un gate/PASS; el análisis posterior por líneas concluyó y se conserva separado.

## CI/receipt/preview reales

CI y Workers exitosos para head7e389: receipt `/workspace/discovery104-originals/receipt-7e389-preview.json`, raw checks y `ci-tree-identity-7e389.json`.

- Workers Build **b45f8c12-3724-4928-9074-663c4af6f1b5**, VersionID **55ccf415-671c-47f3-8d4f-adec1193eb4b**, check115911964128.
- CI check115912325572, workflow run38581514158. GitHub PR checkout merge **b80547611fc5228d2a128ba81a2558a8ba5922f7** tiene exactamente tree6a2c50cc, padresb2ab+7e389. No es main ni se presenta como SHA candidato; identidad de árbol comprobada por coordinación.
- CommitPreview inmutable **https://55ccf415-cuidatuperroviejo.g1721m.workers.dev**. Una ejecución de smoke, **PASS20/24**, sin retries/redirects; `/preview-smoke-7e389/` conserva expected,receipt,http-originals,result completos.

Local y preview comprueban GET200/HEAD200sin cuerpo de ambas cards, MIME/cache/CORS/nosniff y ausencia Location/redirect. Descriptor **233bytes**, SHA256 **efd754491893bb08e2e76456d2f18acb9899694e4c8c4fe0445ee93be284a092**; nativa **559bytes**, SHA256 **aeea988a8e92d68085716e88755dae917215708953bbd0002a80ebd576ae1f84**, igual a base/público previo. Initialize/list ambas eras, discover moderno, identidad/capabilities reales y exactamente cuatro tools; cuatro calls modernas comparadas contra API, lectura completa/hash621ece8..., QoL35/compromised y movilidad severe/stressed; política robots y Origin:null403.

Preview:17statuses200,1initialized202,1GETautomáticoSDK405,1Origin403.19capturasEOF y **1AbortError intencional después de frame de resultado completo/id coincidente** al cerrar Client; no veinteEOF. Requests completos, sin truncación. Se conservan terminal/cuerpo/base64/bytes/hash/headers/Cf-Ray reales. Los resultados locales tienen su propia matriz20, no heredan datos remotos. Servidores locales detenidos y TCP8788/8789 ECONNREFUSED; los workerd terminados esperan reap como zombies, sin listeners.

## Reversión específica ya preparada y ensayada

Commit **0f3c03ef72a5f53d268d354bc7b3210d01e0674a**, tree **2553b9fbe96711e7cc72138174f3a13051476066**, rama propia `agent-ready/mcp-discovery-104-rollback` publicada, worktree limpio `/workspace/ctpv-discovery104-rollback`.

Hijo exacto de7e389, restaura los once archivos de producto/checks/tests a b2ab byteexactos. `git diff b2ab rollback -- src public scripts tests package/config/CI` vacío; documentación idéntica al candidato (`git diff 7e389 rollback -- docs` vacío). No usa revertF4B14e3bed.

BuildrollbackPASS; ensayo Wrangler local real **PASS8/8**, `/rollback-smoke/`: cardnativa200/hashbase; descriptorwellknown404; catálogo28; SDK2.3.1modernodiscover/list/cuatrotools y QoL35/compromised; robots/política; Origin403. Ocho EOF completos, sin redirects. Script pequeño del ensayo, logs, patch, commit y push indexados. No ensayo/deploy de reversión en producción.

## Promoción futura concreta y límites

Comandos reviewables, **no ejecutados**; requieren R2PASS, revisión de base/receipts y autorización aplicable del propietario:

```bash
git fetch origin main agent-ready/mcp-discovery-104 agent-ready/mcp-discovery-104-rollback
# Exigir origin/main=b2ab1082c02799dab4306a7c167a6114c0163a90 y candidato/tree/receipts exactos.
git push origin 7e389a83c87cd5f14537f4b07f0cd783ca572251:refs/heads/main
```

Si la promoción autorizada y su smoke de producción fallan, sin nueva medición, exigir main=7e389sin deriva y aplicar el revert ya ensayado mediante FF:

```bash
git push origin 0f3c03ef72a5f53d268d354bc7b3210d01e0674a:refs/heads/main
```

No force. Si main tiene otro SHA concurrente, STOP/revisar integración y comando; no transferir este ensayo al árbol nuevo. El rollback conserva F4B y todos los documentos. La rama rollback puede activar build automático; no se ejecutó HTTP contra su imagen remota ni se le atribuye el ensayo local.

**D08 pendiente:** no main/merge/producción/scans ni resultado nuevo del evaluador. Después de autorización/promotion y receipt propio, una smokeproducción independiente converificadorcap24; luego perfiles congelados content7/all-ui20 y comparaciones reales. CLI hashes indexe2ea8f.../shared89581c... intactos. Baseline histórico público curado F4A86contenido/nivel5parcial y67all-ui/nivel4general no se atribuye al correctivo ni reemplaza rawhistóricos no accesibles.

Solicito dictamen independiente **R2/5** sólo sobre snapshot/evidencia/normativa conjunta y bloqueantes. Informe fuera del candidato; no editar fuente para archivarlo ni consumir un nuevo SHA de publicación. La auditoría no autoriza promoción por sí sola.
