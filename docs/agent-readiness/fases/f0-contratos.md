# Contratos normativos de F0

Este documento forma parte de [la SDD F0](f0-medicion-y-contratos.md). Sus nombres, límites y ejemplos son el contrato del tooling; el ejecutor no los sustituye por otro formato. Versiones iniciales: `agent-readiness-run/1`, `agent-content-inventory/1`, `agent-content/1`.

## 1. CLI

Entrada: `node scripts/agent-readiness/index.mjs <command> <flags>`. Sin efectos de red salvo `scan`. Flags desconocidos, repetidos o valores inválidos son error; no elegir un perfil implícito.

| Comando | Flags obligatorios | Resultado |
|---|---|---|
| `replay` | `--baseline-dir`, `--out-dir` | Verifica hashes de scan-requests.json y resume los tres originales |
| `scan` | `--url`, `--profile content\|all-ui`, `--out-dir` | POST explícito al evaluador; raw/request/summary de un perfil |
| `compare` | `--before`, `--after`, `--out` | JSON con comparabilidad, motivos y delta solo cuando es válido |
| `inventory` | `--build-dir`, `--out-dir` | Inventario local y cotejo de rutas del build |

Rutas relativas se resuelven contra cwd. Input y output no pueden coincidir; los inputs no se modifican. Un out-dir/out existente es error, incluso si está vacío. Crear el destino con operación exclusiva para evitar sobrescrituras. En errors dejar un reporte de fallo si ya se creó el directorio; no escribir un éxito parcial.

Exit codes: `0` ejecución completa y válida; `1` fallo de transporte/I/O; `2` comparación no comparable; `3` contrato/input/hash/inventario inválido. En `compare` una ejecución correcta que detecta incompatibilidad termina en 2, no 0. Un score 0/100 es un resultado válido y termina en 0. No confundirlo con no poder calcular score.

`--url` es URL de origen http/https sin userinfo, query, fragment ni path distinto de `/`. La petición al escáner siempre usa HTTPS en el endpoint fijo `https://isitagentready.com/api/scan`. El target se conserva en request y summary; no se siguen redirects del endpoint del escáner.

## 2. Perfiles congelados

`content`: IDs en este orden:

```json
["robotsTxt","sitemap","linkHeaders","dnsAid","markdownNegotiation","robotsTxtAiRules","contentSignals"]
```

`all-ui`: IDs en este orden:

```json
["robotsTxt","sitemap","linkHeaders","dnsAid","markdownNegotiation","robotsTxtAiRules","contentSignals","webBotAuth","apiCatalog","oauthDiscovery","oauthProtectedResource","authMd","mcpServerCard","agentSkills","webMcp","ard","x402","mpp","ucp","acp"]
```

`api-unconfigured` solo existe en replay para el POST histórico sin `enabledChecks`; no puede seleccionarse en scan. En replay las solicitudes son las de `scan-requests.json`. En scan el body es `{"url":<target>,"enabledChecks":<array explícito>}` con MIME JSON. Conservar bytes exactos del body enviado en `request.json` y calcular el hash sobre esos bytes.

## 3. Envelope de ejecución

Cada ejecución de scan escribe `request.json`, `response.raw.json` si hay body recibido, `response-metadata.json`, `summary.json` y `manifest.json`. Replay escribe un subdirectorio por perfil con request reconstruido a partir del objeto histórico y copia exacta de response original; no modifica los originales. Los bytes de request.json en replay son una reconstrucción determinista (`JSON.stringify` del body registrado, sin espacios ni newline), no una captura del POST histórico. Su hash identifica la reconstrucción, no bytes históricos no conservados.

`response-metadata.json` tiene, sin extras: `schemaVersion` literal `agent-readiness-http/1`, `requestSource` (`captured` en live; `reconstructed` en replay), `httpStatus` (integer 100–599 o null), `contentType` (string original o null), `transportError` (null o `{code,message}`). En replay status/MIME son null: los originales no conservaron esa metadata. En live sin respuesta HTTP son null y transportError registra el fallo; con respuesta, transportError=null incluso si el status es un error HTTP. No almacenar otros headers. Incluir este archivo en el manifest. Estos valores nunca se deducen del body.

`summary.json` tiene los siguientes campos, sin extras:

| Campo | Tipo y regla |
|---|---|
| `schemaVersion` | Literal `agent-readiness-run/1` |
| `scoringRuleId` | Literal `pass-over-counted-round/1`; no identifica la versión interna del evaluador |
| `mode` | `live` o `replay` |
| `profile` | `content`, `all-ui` o `api-unconfigured` |
| `requestedUrl` | URL enviada al escáner |
| `targetUrl` | URL devuelta, string o null si respuesta incompleta |
| `enabledChecks` | Array explícito; null solo para api-unconfigured |
| `sourceCommit` | SHA-1 Git completo del árbol inspeccionado |
| `deploymentCommit` | SHA Git completo o null; F0 deja null sin evidencia independiente del deploy |
| `dirtySource` | Boolean del estado de trabajo al ejecutar; no se acepta evidencia final con dirtySource=true |
| `recordedAt` | Timestamp UTC del harness |
| `scannedAt` | Valor original del evaluador o null |
| `state` | `complete` o `incomplete` |
| `score` | Integer 0–100; null si incomplete o denominador 0 |
| `level` | Integer 0–5 original, o null |
| `levelName` | String original, o null |
| `isCommerce` | Boolean original, o null si incomplete |
| `counts` | Objeto con integers no negativos `pass`, `fail`, `neutral`, `scoredTotal` |
| `checks` | Array ordenado de `{category,id,status,message,counted}` de todos los controles devueltos |
| `checkUniverseHash` | SHA-256 de la estructura de IDs/categorías descrita abajo, o null |
| `requestSha256` | Hash SHA-256 de bytes request.json |
| `responseSha256` | Hash SHA-256 del body original o null |
| `nextLevel` | JSON original o null; no se calcula localmente |
| `errors` | Array de `{code,message}`; vacío solo si complete |

Categorías conocidas: `discoverability`, `contentAccessibility`, `botAccessControl`, `discovery`, `commerce`. Status puntuables: `pass`, `fail`; conocido no puntuable: `neutral`. Otro status, categoría desconocida, ausencia de un ID habilitado, ID duplicado entre categorías, respuesta siteError, nivel inválido o body de error produce `incomplete` y score null. Conservar el status original en `checks`; no cambiarlo para satisfacer el contrato.

Un control habilitado neutral es válido si el escáner lo reporta así; nunca inferir neutral para un control ausente. Los IDs adicionales no habilitados pueden aparecer como neutrales y se conservan. IDs nuevos o desapariciones cambian el universo de controles y por tanto bloquean comparar con una ejecución anterior.

`counted=true` solo si status es pass/fail y no pertenece a commerce con isCommerce=false. Counts pass/fail son los contados; neutral incluye todos los neutrales de la respuesta. `scoredTotal=pass+fail`. Score usa **Math.round**, no banker’s rounding: `Math.round(100 * pass / scoredTotal)`. Level/nextLevel son independientes de score.

`checkUniverseHash` se calcula sobre UTF-8 de `JSON.stringify` de pares `[category,id]`, ordenados por category/id con comparación ASCII, sin espacios. No incluye status/messages, que legítimamente cambian al mejorar el sitio. La comparabilidad comprueba además el conjunto de IDs counted para detectar cambios de neutral a puntuable sin ocultar la variación del denominador.

`manifest.json` tiene schemaVersion `agent-readiness-evidence/1`, sourceCommit, recordedAt y `files`: array ordenado de `{path,sha256,bytes}`. Paths relativos, sin traversal. No incluir el propio manifest en su lista de hashes, para evitar una referencia circular. Hash hexadecimal minúsculo sobre bytes realmente escritos. Nunca almacenar Authorization, cookies, `.env`, secrets ni cuerpos de formularios.

### Ejemplo de cálculo válido

Content Site original: pass=3, fail=4, scoredTotal=7, score=43, level=1, state=complete. All UI: 3/12, total=15, score=20. API histórica: 3/13, total=16, score=19. Manifest y summary no pueden usar el SHA del checkout como deploymentCommit.

### Ejemplos de error

- Body `{"error":"Scan failed"}` con HTTP 500: incomplete, score=null, error `SCAN_HTTP_ERROR`, exit 1.
- Timeout sin body: incomplete, responseSha256=null, error `SCAN_TIMEOUT`, exit 1.
- JSON válido sin `checks.discoverability.sitemap`: incomplete, error `SCAN_SCHEMA_ERROR`, exit 3.
- Response con un status `unableToCheck`: incomplete, conserva el status, error `SCAN_SCHEMA_ERROR`, exit 3.
- Hash del original no coincide al replay: no calcular score, error `BASELINE_HASH_MISMATCH`, exit 3.
- Error al solicitar el endpoint no se reintenta ni se reemplaza por el último resultado bueno.

## 4. Comparación

Salida de compare: schemaVersion `agent-readiness-comparison/1`, `comparable` boolean, `reasons` array de códigos, `before` y `after` con hashes/sourceCommit/score, `scoreDelta` integer o null, `checkChanges` array de `{category,id,beforeStatus,afterStatus}`. No usar timestamps como prueba de que se publicó un commit.

Para comparable=true deben coincidir requestedUrl/targetUrl, profile, conjunto de enabledChecks (orden no relevante), universo de IDs/categorías, scoringRuleId, isCommerce, conjunto de IDs counted; ambos estados complete y denominador no cero. Cualquier desigualdad devuelve comparable=false y scoreDelta=null, aun cuando se pueda mostrar una diferencia aritmética.

Códigos de reasons: `INCOMPLETE_RUN`, `TARGET_CHANGED`, `PROFILE_CHANGED`, `ENABLED_CHECKS_CHANGED`, `CHECK_UNIVERSE_CHANGED`, `SCORING_CHANGED`, `COMMERCE_CHANGED`, `DENOMINATOR_CHANGED`. Datos malformados son exit 3, no una comparación válida. Tests mínimos: content contra all-ui (bloqueado); all-ui contra API sin opciones (bloqueado); mismo perfil con un fail→pass (delta válido); neutral→pass (denominador cambiado); ID nuevo/ausente; fixture con proporción 1/8 (redondea a 13); mismo envelope con scoringRuleId diferente (SCORING_CHANGED). Compare valida el formato no vacío del identificador y admite otros IDs para detectar incompatibilidad; replay/scan solo emiten la regla fijada. Un ID de regla desconocida no autoriza recalcular sus scores.

## 5. Política de proyección

Inventariar todos los HTML generados, aunque se excluyan de la proyección. No publicar el inventario de auditoría en el sitio.

| Rutas | Disposición | Tipo / ID |
|---|---|---|
| `/` | `document` | `home` / `home` |
| Las 7 rutas de pilares presentes en src/content/pilares | `document` | `pillar` / `pillar--<slug>` |
| Artículos del catálogo publicado, `/<pilar>/<slug>` | `document` | `article` / `article--<slug>` |
| `/herramientas/calculadora-calidad-vida-perros` | `document` | `tool` / `tool--calidad-vida` |
| `/herramientas/selector-movilidad-perros-mayores` | `document` | `tool` / `tool--movilidad` |
| `/acerca-de`, `/politica-editorial` | `document` | `editorial` / `page--<slug>` |
| `/asistente-ia`, `/contacto`, `/politica-de-cookies`, `/politica-de-privacidad` | `discovery-only` | `page`, documentId=null; sin copiar widgets/forms |
| `/gracias`, `/404`, páginas admin | `excluded` | documentId=null, razón explícita |
| Assets, `.well-known`, endpoints API, archivos de verificación/indexación | No son documentos HTML públicos | Inventariar por clase cuando aplique; ningún body privado |

En esta base se esperan 28 documentos (1 home + 7 pilares + 16 artículos + 2 herramientas + 2 editoriales). Es una assertion de esta base, no una constante eterna. Si el build no coincide, reportar el motivo; no modificar los conteos ni la base a escondidas. Las cuatro discovery-only explican páginas del sitemap que no tienen una proyección editorial. `/404` se clasifica por fichero de error y no requiere canonical.

Los nombres de artículo deben ser únicos globalmente. No resolver una colisión añadiendo sufijos al azar. El ID article--slug permite mover una guía entre pilares manteniendo identidad; el canonicalPath sigue reflejando el silo vigente.

## 6. Inventory JSON

`inventory.json` tiene, sin extras: schemaVersion `agent-content-inventory/1`, sourceCommit, `state` (`valid|invalid`), `errors` (array de `{code,message,htmlFile}`, htmlFile string relativo o null), assetDirectory (relativo a repo o null si no se resolvió), sourceDigest (hash definido debajo o null si no se pudo leer todo el corpus), `pages` y `sitemapDifferences`. state=valid exige errors vacío y todos los documentos válidos. Ante errores semánticos, conservar las páginas inspeccionadas en state=invalid; ante fallo temprano, arrays vacíos y campos no disponibles null. Un documento sin H1 conserva title=null en el informe inválido, nunca se reclasifica como excluded. `manifest.json` usa el envelope de evidencia de §3 y hashea inventory.json: no duplicar el estado en el manifest.

Cada elemento de pages tiene, sin extras: `htmlFile` (ruta relativa a assets), `canonicalPath` (string o null solo para error/excluded sin canonical), `canonicalUrl` (string o null), `title` (h1 editorial, string en documentos válidos; null para excluded o para página sin H1 registrada en inventario inválido), `description` (string o null), `language` (`es` para documents), `kind` (`home|pillar|article|tool|editorial|page|error|admin`), `disposition` (`document|discovery-only|excluded`), `documentId` (string o null), `inSitemap` boolean, `publicationEvidence` (string que identifica catalogue/build metadata) y `reason` (string o null). reason obligatorio para exclusion/discovery-only; null para document válido.

Canonical documents: origen `https://cuidatuperroviejo.com`, path absoluto sin query/fragment, sin slash final salvo `/`, sin segmentos `.`/`..`, sin encoded separators ni archivos .html. El h1 puede estar fuera de main. JSON-LD y byline sirven de evidencia editorial, nunca sustituyen texto inexistente.

Ordenar pages por canonicalPath y luego htmlFile, usando comparación de codepoints; null al final. sourceDigest es SHA-256 sobre JSON UTF-8 de pares `[htmlFile,sha256DelHTML]` ordenados por htmlFile. No incluir fecha de ejecución en el contenido hashable.

sitemapDifferences enumera cada path que está solo en sitemap o solo en documents, con `side` (`sitemap-only|document-only`), `path`, `disposition` y `reason`. Una diferencia sin clasificación/justificación es error. Validate sitemap-index y cada child local dentro de assets; no hacer fetch a URLs remotas para auditar el build.

Errores de inventario: `ASSET_DIRECTORY_AMBIGUOUS`, `BUILD_ARTIFACT_MISSING`, `CANONICAL_INVALID`, `CANONICAL_DUPLICATE`, `DOCUMENT_ID_COLLISION`, `UNCLASSIFIED_PAGE`, `CATALOG_MISMATCH`, `SITEMAP_UNEXPLAINED_DIFFERENCE`, `DOCUMENT_TITLE_MISSING`. Exit 3 ante errores semánticos/input, con state=invalid y errors en inventory.json; fallo de lectura/I/O usa `INVENTORY_IO_ERROR` y exit 1. El inventario inválido es evidencia de diagnóstico y no autoriza entregar un índice público parcial.

## 7. Rutas de representación propuestas y prueba F0

Congelar para el spike y para proponer F2:

- Índice público futuro: `/agent-content/v1/index.json`.
- Representación explícita: `/agent-content/v1/documents/<documentId>.md`.
- Negociación: misma URL canónica HTML.
- MIME Markdown: `text/markdown; charset=utf-8`; GET/HEAD de documentos negociables con `Vary: Accept` en ambas variantes.

F0 solo prueba `home.md` y `article--sindrome-cushing-perros-mayores.md`. El índice de prueba no contiene entradas ficticias de todo el sitio ni se confunde con el inventory privado. Los archivos generados pertenecen al spike; el PR permanente no añade esas rutas públicas.

Esta convención es versionada y usa IDs validados, no paths de usuario arbitrarios. El tamaño exacto, schema de índice público y parser final de Markdown se concretarán en F2 con la evidencia F0; no son un encargo de implementación en esta fase.

## 8. Matriz de negociación del spike

Resolver calidad efectiva de cada representación con reglas de media ranges y specificity. No detectar Markdown mediante substring. Para el spike, se elige MD solo si tiene calidad positiva y es mayor que HTML; empate elige HTML. Sin Accept equivale a `*/*`. Tipo case-insensitive; parámetro q en [0,1] con hasta tres decimales. Un miembro inválido se ignora; si quedan miembros válidos pero no admiten ninguna representación, 406. Un header sin ningún miembro válido devuelve 400. ETag, si existe, pertenece a la representación elegida.

| Accept | Resultado para documento público |
|---|---|
| ausente o `*/*` | 200 HTML |
| `text/html` | 200 HTML |
| `text/markdown` | 200 Markdown |
| `text/markdown;q=0, text/html;q=1` | 200 HTML |
| `text/markdown;q=1, text/html;q=0.5` | 200 Markdown |
| `text/markdown;q=0.5, text/html;q=1` | 200 HTML |
| `text/markdown;q=1, text/html;q=1` | 200 HTML |
| `text/*;q=0.8, text/markdown;q=0` | 200 HTML |
| `text/markdown;q=0, */*;q=1` | 200 HTML; q=0 específico excluye MD |
| `text/markdown;q=1, */*;q=0.1` | 200 Markdown |
| `application/json` | 406, sin contenido editorial de otra ruta |
| `text/html;q=0, text/markdown;q=0` | 406 |
| `text/markdown;q=wat` | 400, header inválido |

GET y HEAD tienen status/metadata consistentes y HEAD body vacío. Query sin función editorial no genera un documento diferente ni cambia su ID; el spike puede delegarla como HTML y debe describir ese comportamiento, sin almacenarla como variante pública. Authorization evita caché propia; el token ficticio usado para comprobarlo no se registra.

Rutas inexistentes no se negocian contra el primer documento del índice. Redirects legacy usan status/Location existentes; no seguirlos al probar la respuesta inicial. Conditional request con validador HTML y Accept MD no devuelve 304 del HTML. Preservar cabeceras de seguridad vigentes y no reutilizar Content-Length/Encoding del body HTML para el body Markdown.

## 9. Manifest de paridad y decisiones

`parity-manifest.json`: schemaVersion `agent-content-parity/1`, sourceCommit, `fixtures`: array con path, inputHtml, sha256, kind, h1, orderedHeadings, warningTexts (título y cuerpo), faqPairs (pregunta y respuesta completas), sourceUrls (URLs de fuentes sin perder DOI/PMID/query) y excludedNodes (selector/razón). El dato normativo es el texto DOM decodificado, con whitespace normalizado, no los tokens del HTML.

F0 no requiere que cada artículo tenga FAQs, avisos o todas las clases de contenido; exige conservar los existentes en los fixtures y reportar ausencias reales. Las imágenes repetidas, nav y publicidad se excluyen; las fuentes externas no se borran por ser externas ni se convierten en texto sin href.

`spike-manifest.json`: baseCommit, spikeCommit, adapterVersion, astroVersion, wranglerVersion, changedPaths, runtime (`workerd-local`), activeCacheLayers, evidenceFiles con hashes, previewHost (`127.0.0.1` por defecto), remoteBindings=false y limitationCodes. No se puede usar un resultado de node para afirmar que se probó workerd.

El cierre `decisiones.md` enlaza exactamente las pruebas P1–P4 y documenta qué podrá afirmarse en la futura F2. Debe nombrar la capa CDN pendiente; las pruebas de producción se ejecutan después en una preview pública aprobada para F2, sin convertir F0 en un despliegue.
