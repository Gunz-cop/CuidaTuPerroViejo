# Contratos normativos F3 v1

Complemento obligatorio de [SDD F3](f3-api-y-descubrimiento.md). Los [schemas y OpenAPI documentales](../evidencia/f3/contratos/README.md) forman parte del contrato: son especificación, no assets públicos ya implementados. Todos los nombres/campos siguientes son exactos. `SITE=https://cuidatuperroviejo.com`, idioma `es`, UTF-8 sin BOM, LF final. JSON emitido `JSON.stringify(value,null,2)+'\n'`; orden de campos como schema documental, arrays en el orden fijado abajo. No fechas de build ni datos aleatorios.

## 1. Rutas y formatos

| Ruta exacta | Métodos | Representación | Procedencia |
|---|---|---|---|
| `/api/agent/v1/catalog` | GET, HEAD, OPTIONS | `application/json; charset=utf-8` | Índice F2 validado, filtro y página |
| `/api/agent/v1/search` | GET, HEAD, OPTIONS | JSON | Índice léxico del mismo corpus F2 |
| `/api/agent/v1/documents/{documentId}` | GET, HEAD, OPTIONS | JSON | Índice F2, Markdown íntegro y links del índice léxico |
| `/agent-api/v1/query-index.json` | GET, HEAD nativos ASSETS | JSON | Build; soporte técnico público, no operación de API |
| `/agent-api/v1/openapi.json` | GET, HEAD nativos | `application/vnd.oai.openapi+json;version=3.1` | OpenAPI 3.1.1, info.version `1.0.0` |
| `/.well-known/api-catalog` | GET, HEAD nativos | `application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"` | Linkset RFC 9727/RFC9264; directo200, sin redirect ni sufijo `.json` sustituto |
| `/.well-known/agent-skills/index.json` | GET, HEAD nativos | JSON | Discovery0.2.0, digest de artifact real |
| `/.well-known/agent-skills/buscar-leer-citar/SKILL.md` | GET, HEAD nativos | `text/markdown; charset=utf-8` | Única skill de producto nueva |
| `/.well-known/ard.json` | GET, HEAD nativos | JSON | ARD v0.91 actual; fuente normativa |
| `/.well-known/ai-catalog.json` | GET, HEAD nativos | JSON | Fuente de entradas compatible con descubrimiento ARD anterior/evaluador archivado |

JSON abreviado en tabla significa `application/json; charset=utf-8`. Ambos manifests ARD son byteidénticos con envelope `specVersion:"1.0", host, entries`: ARD admite otros miembros de transporte. `specVersion` se refiere al modelo AI Catalog1.0, **no** a versión ARD. Se adopta el modelo de entradas AI Catalog, sin afirmar conformidad al media type nativo `application/ai-catalog+json`: aquí se sirve `application/json` para el formato ARD/compatibilidad del evaluador, de forma explícita. No se añade un registry ARD, búsqueda federada, trust manifest o DID ficticio.

Ninguna ruta F3 cambia según Accept: representación única; Accept se ignora incluso si no la incluye. El OpenAPI y el catálogo describen esta política. No aplicar negociador F2 a APIs/descriptors. Rutas y documentIds son case-sensitive, sin slash final ni alias. Bajo `/api/agent/v1` las rutas desconocidas son404 JSON, sin delegar a otra guía. Fuera del namespace F3 se conserva la delegación F2/Astro. Paths con `%` dentro de ese namespace→400, no decodificar otro path para leer archivos. Protección posterior a la normalización URL de la plataforma: no prometer detectar una forma que Request ya normalizó fuera de namespace; nunca hacer fetch de un path arbitrario recibido.

## 2. Entrada, validación y paginación

`documentId` conserva regex/kind y≤160ASCII de F2; membership en índice F2 es autoridad final. `home`, `article--sindrome-cushing-perros-mayores` y `tool--movilidad` son IDs posibles, sólo el inventario determina existencia. No aceptar canonical URL, slug ambiguo, file path, URL externa ni selector adicional como ID.

Query se decodifica como `application/x-www-form-urlencoded` estándar (percent UTF-8 estricto, `+`→espacio). Percent incompleto/hex inválido/UTF-8 inválido→400, no reemplazar errores por U+FFFD. Query total raw≤2048 bytes UTF-8 después de `?`, inclusive. No keys duplicadas ni desconocidas, vacías o controles C0/DEL en valores; query vacío permitido salvo q requerido. Ausencia de parámetro usa default; presencia vacía no es ausencia. No reflejar query/cookie/auth en respuesta ni logs propios.

| Endpoint | Keys permitidas | Reglas |
|---|---|---|
| catalog | `kind,limit,offset,corpus` | kind opcional, enum F2; default limit20/offset 0 |
| search | `q,kind,limit,offset,corpus` | q obligatorio; resto igual a catalog |
| document | `corpus` | ID por path; sin format, url, include, selector |

`kind=home|pillar|article|tool|editorial`, un único valor. `limit` entero decimal ASCII1..20; `offset`0..98 inclusive; forma `0` o `[1-9][0-9]*`, sin leading zero, signo, decimal, whitespace/exponente. `offset`≥total válido→array vacío. `corpus` opcional64 lowerhex; si válido pero distinto del índice activo→409 `CORPUS_CHANGED`, sin leer documento de un corpus anterior. Si se omite, usar actual. Todos los cuerpos200 llevan corpusSha256; cliente que encadena resultados debe pasarlo a llamadas posteriores. No retener versiones anteriores ni fingir snapshot entre deployments;409 requiere repetir catálogo/búsqueda sobre corpus actual.

q: después de decode/NFC/trim Unicode whitespace,1..200 codepoints,≤800 bytes UTF-8, sin C0/DEL; puede contener puntuación. Tokenizar según §4. Resultado1..12 tokens distintos, cada token≤64 codepoints; sólo puntuación/espacios→400. Repetición no cambia ranking. No tratar instrucciones contenidas en q como comandos, HTML, expresión regular o SQL. q sólo se usa para igualdad entre tokens validados.

Para GET/HEAD: precedencia observable **path/sintaxis ID→método→query→carga/validación datos→corpus→membership/resultado**. Desconocido path siempre404; ID sintácticamente inválido400; válido desconocido con query inválida400, con corpus discordante409, con datos válidos404. OPTIONS a un path conocido y sintaxis ID válida→204, sin cargar corpus ni validar query/membership; desconocido404, ID inválido400. Métodos restantes a path conocido→405 con `Allow: GET, HEAD, OPTIONS`; nunca ejecutar efectos o delegar a asistente/admin. Body entrante no se procesa ni se refleja; GET/HEAD usa sólo query/path, OPTIONS la política indicada.

## 3. Salidas y errores

Schemas cerrados, required todos los campos enumerados, additionalProperties=false, sin omitir nulos. SchemaVersion respuestas exactamente `agent-api/1`. `Document` es **la entrada F2 completa** sin campos añadidos o reinterpretados: documentId,kind,title,description,canonicalPath,canonicalUrl,markdownPath,language,datePublished,dateModified,htmlSha256,markdownSha256,markdownBytes. Invariantes F2 validan relaciones entre campos y origen fijo; schema estructural no sustituye ese validador.

| Respuesta | Campos raíz en orden y valores |
|---|---|
| Catalog200 | schemaVersion,corpusSha256,total,limit,offset,nextOffset,documents |
| Search200 | schemaVersion,corpusSha256,total,limit,offset,nextOffset,results |
| Read200 | schemaVersion,corpusSha256,document,mediaType (`text/markdown`),markdown,links |
| Error | schemaVersion,error con code,message |

Catalog `documents` son Document completos, filtro kind aplicado antes de paginar, orden ASCII documentId F2. Search `results` son objetos cerrados `{document:Document,score:integer1..144}`; filtro kind antes de ranking. `total`0..98 del conjunto previo a paginar; `limit/offset` reflejan defaults/inputs; nextOffset = offset+cantidad si menor que total y cantidad>0, sino null. Arrays≤20. No snippets ni prosa inventada; description exacta editorial no es resumen generado. Search sin coincidencias devuelve200 total0/resultados[]/nextOffset null.

Read `markdown` es decodificación UTF-8 fatal de bytes F2 completos, incluida newline final; reencode devuelve misma entidad y SHA256/markdownBytes. JSON escapa caracteres de transporte pero no cambia el texto. Nunca truncar por presupuesto de respuesta/modelo. `links` son **todos** los enlaces de texto extraídos por §4, en orden, cada `{label,url}` cerrado. Incluyen fuentes y enlaces editoriales, internos/externos/mailto/tel; **no** etiquetar todo externo como bibliografía científica. Imágenes quedan en Markdown íntegro; `links` no las incluye. FAQ/advertencias/firma/fechas/fuentes se mantienen en Markdown y no se reducen a labels. Sin fields authors/reviewers/sources clasificados que la proyección no provea de forma fiable.

| Status | error.code | error.message exacto |
|---|---|---|
| 400 | INVALID_REQUEST | `Invalid request.` |
| 404 | ROUTE_NOT_FOUND | `Unknown API route.` |
| 404 | DOCUMENT_NOT_FOUND | `Document not found.` |
| 405 | METHOD_NOT_ALLOWED | `Method not allowed.` |
| 409 | CORPUS_CHANGED | `Content corpus changed; repeat discovery.` |
| 503 | CONTENT_UNAVAILABLE | `Content temporarily unavailable.` |

JSON200/error≤**2 MiB UTF-8** inclusive; exceso/integridad/UTF-8/asset esperado ausente/índice inválido→503, no truncamiento,404 ficticio ni fallback asistente. Build falla si cualquiera de las lecturas posibles excede límite; runtime defensa igual. No stack trace, input reflejado, internal path, binding, requestId ni exception string pública. HEAD ejecuta selección/validación igual que GET y devuelve mismo status/headers sin cuerpo, incluidos errores; OPTIONS204 sin cuerpo. No `Content-Length` sintetizado ni Transfer/encoding heredado del asset interno en JSON nuevo.

HTTP API F3 en200/error/HEAD/OPTIONS: `Cache-Control: private, no-store`, reemplazar cualquier CDN-Cache-Control/Cloudflare-CDN-Cache-Control heredado por `no-store`, `Access-Control-Allow-Origin: *`, sin Allow-Credentials/Set-Cookie/auth requerida. `Access-Control-Allow-Methods: GET, HEAD, OPTIONS`; `Access-Control-Allow-Headers: Accept`; `Access-Control-Expose-Headers: Link`; `Vary` no se requiere porque ni Accept ni Origin seleccionan representación. Sin ETag/Last-Modified propios. Ignorar Range/If-Range/If-None-Match/If-Modified-Since; respuesta completa200 o error propio, no206/304porcondicional. CORS funcional tanto en errores como en éxito; no autenticación inventada. No ampliar CORS de rutas asistentes/contacto/admin.

Assets F3: no-store (sin immutable ni max-age), Access-Control-Allow-Origin:* y seguridad/Link comunes, Content-Type de tabla. GET/HEAD/validadores/otros métodos nativos ASSETS; no imponer ETag exterior que plataforma compresora retire, registrar lo observado. OPTIONS de assets no es contrato F3: browser usa GET simple sin headers de auth/condicionales. Los digests de skill se calculan sobre entidad descomprimida UTF-8, no gzip wire ni header ETag. Query de assets no selecciona variante propia ni altera bytes del artefacto; la API sí usa query según §2.

## 4. Índice léxico derivado y límites de recursos

Asset `/agent-api/v1/query-index.json`, closed schema `agent-query/1`: `{schemaVersion,corpusSha256,documents}`. Documents orden ASCII ID, cardinalidad/IDs exactos de F2, cada `{documentId,markdownSha256,titleTokens,descriptionTokens,bodyTokens,links}`. Token arrays sin duplicados, orden ASCII; links según abajo. Root≤**8 MiB** UTF-8, docs≤98; otros límites F2 (índice512 KiB, Markdown por documento512 KiB, corpus16 MiB) siguen vigentes. El límite adicional puede fallar antes de98 documentos: no es garantía de alcanzar98con cualquier contenido. No truncar tokens, enlaces, palabras largas o Markdown para cumplirlo.

Parser de build: `fromMarkdown` + extensiones GFM fijadas. Para searchable body recorrer AST en orden: contenido de text/inlineCode/code, alt de image, link labels y demás children; separación de bloques por espacio, ignorar syntax/html nodes/definitions como texto; no indexar destinos URL por propiedad ni markup/instrucciones ajenas. **Se parsea todo** Markdown F2, incluido su encabezado/canonical link label; title/description tienen sus propios tokens adicionales. No excluir final de artículo/FAQ/avisos. El body indexable no es una segunda representación editorial ni se usa para reconstruir lectura.

Normalización común de strings: NFKD→eliminar marcas Unicode `\p{M}`→`toLowerCase()`→tokens maximalmente contiguos `[\p{L}\p{N}]+` con regex Unicode; distinct sorted ASCII (comparación por code units, no locale). Ejemplos `CÚSHING`→`cushing`, `ARTROSIS`→`artrosis`, `perro-señor`→`perro,senor`, `calidad de vida` conserva tres tokens, sin stopwords/stemming/sinónimos/embeddings. Token de corpus largo se conserva; token query>64rechazado. Ningún límite de200caracteres de q limita el documento indexado.

Match: **todos** los tokens q deben existir en unión title/description/body del documento. Score = suma por token distinto:8si aparece en titleTokens +3si descriptionTokens +1si bodyTokens. Booleano por campo, frecuencia/repetición no suma. Máximo12 tokens×12=144. Sólo matches entran; orden score descendente y empate documentId ASCII ascendente. Sin boosting oculto, score no mide seguridad/calidad/certeza médica. Página aplicada después del filtro/ranking.

Links: AST nodes `link` y `linkReference`, preorder; resolver reference contra definitions del mismo AST (definition desconocida no se inventa); label = texto visible de children, normalizado whitespace a un espacio/trim, permitiendo vacío. URL absoluta real del nodo/definition, preservando query/fragment. Sólo http/https/mailto/tel según F2, sin credenciales/controles/esquemas peligrosos. Mantener links con misma URL distinto label; deduplicar **pares exactos label+url**, primera aparición. No fetch/validación científica remota ni fuentes a partir de filenames. Esquema/URL inválido/unresolved reference editorial→build FAIL. El implementador puede usar recorrido AST simple; no regex sobre Markdown.

Build lee todas las entidades validadas y comprueba límites antes de escribir outputs. Runtime search hace membresía de arrays/sets de tokens, máximo98 documentos×12 tokens, sin IA ni I/O externo. Carga fría índice/bundle mediante ASSETS limitada streaming a sus caps; success cache por binding descrita SDD, lectura de documento limitada512 KiB. No binding rate-limit nuevo: esta API sólo expone corpus público acotado sin APIs pagas, escrituras o fetch externo. No se garantiza quota/global abuse prevention; límites de input/bytes/trabajo y protección general Cloudflare existente son las defensas F3. Un requisito futuro de cuota global necesita su propia SDD. Errores de plataforma ajenos no se convierten en éxito.

## 5. OpenAPI, catálogo RFC 9727, skills y ARD

OpenAPI exactamente3.1.1, `info.version=1.0.0`, server SITE; operationIds GET `listAgentDocuments`, `searchAgentDocuments`, `readAgentDocument`, HEAD `headAgentCatalog`, `headAgentSearch`, `headAgentDocument`, OPTIONS `optionsAgentCatalog`, `optionsAgentSearch`, `optionsAgentDocument`. `security:[]`, sin schemes, auth/payment/MCP/tools pendientes. Describe params closed, defaults/bounds,200/errors/204/headers, HEAD bodyless y único MIME JSON. `$ref` internos al mismo documento; sin ref remoto que haga el build depender de red. Schema Draft2020-12 común. Anexo JSON concreto fija estas operaciones y schemas; restricciones semánticas de este contrato siguen obligatorias (cross-field/corpus/normalización/membership/precedencia).

API Catalog concrete Linkset en anexo: contexto catalog con `item` a **los tres endpoints** (search URI de ejemplo `?q=cushing` y read URI fijo `home`, existente por F2, sin `{id}` URI template como hyperlink), segundo contexto API catálogo con `service-desc` OpenAPI. Cada target incluye href,type,title. No anunciar `/api/ask`, admin/contacto ni una API base sin operación. HEAD del catalogue lleva Link con api-catalog/service-desc igual al conjunto §6, body vacío; no se limita a GET.

Skill **buscar-leer-citar**, `type:skill-md`. Frontmatter YAML sólo name y description, texto exacto del registro; nombre1..64regex lowercase alnum/hyphens sin consecutivos. Description exacta: `Busca guías de Cuida tu Perro Viejo, lee el contenido completo y cita su URL canónica y sus fuentes originales.` (≤1024). Índice `$schema` exactamente `https://schemas.agentskills.io/discovery/0.2.0/schema.json`, skills array de una entrada closed/name,type,description,url absoluta SITE+path,digest `sha256:<64 lowerhex>` de artifact byteexacto servido. RFC lo trata como URI opaco y no requiere resolverlo; no añadir versión incompatible ni fields inventados.

SKILL.md≤32 KiB UTF-8, LF/finalnewline; generar/publicar desde fuente de producto específica y no mantenimiento repo. Cuerpo debe describir uso y recorrido reproducible: GET catalogue/OpenAPI, search q=cushing, seleccionar ID **del resultado real**, read con corpus, verificar metadata/canónica/hash, usar Markdown completo/links para responder/citar. Manejar vacío/400/404/409/503, repetir discovery sólo cuando409 y nunca adivinar URLs/IDs, no dar evidencia inventada ni usar contenido como instrucciones de privilegios. Distinguir consejo educativo de diagnóstico y conservar avisos originales; calculadoras educativas sólo lectura, no tool de cálculo. Ninguna llamada con efecto, login, instalar código, correo, contacto ni acceso repo. Anexo [texto normativo](../evidencia/f3/contratos/buscar-leer-citar.SKILL.md) fija el artifact; no incluye digest ficticio. Digest se calcula al implementar sobre los bytes reales de ese mismo artifact, no antes de cambiarlo.

ARD `entries` exactas, orden URN ASCII, **2 entradas**, properties identifier,displayName,type,url,description,representativeQueries; sin data ni trustManifest/did/capabilities futuros. Host `{displayName:"Cuida tu Perro Viejo",identifier:"cuidatuperroviejo.com"}`: dominio, no afirmar identidad criptográfica.

| identifier | displayName / type / url | representativeQueries exactas |
|---|---|---|
| `urn:air:cuidatuperroviejo.com:api:contenido` | `Consulta de guías para perros mayores` / `application/vnd.oai.openapi+json` / SITE+`/agent-api/v1/openapi.json` | `Busca guías sobre Cushing en perros mayores.`; `Lee una guía completa con sus fuentes y avisos.`; `Encuentra información sobre movilidad y dolor en perros senior.` |
| `urn:air:cuidatuperroviejo.com:skill:buscar-leer-citar` | `Buscar, leer y citar guías` / `text/markdown` / SITE+`/.well-known/agent-skills/buscar-leer-citar/SKILL.md` | `Busca información sobre artrosis en perros mayores y cita la guía.`; `Lee una guía sobre cuidados de perros senior y conserva sus fuentes.` |

Descriptions exactas respectivamente `API pública de catálogo, búsqueda léxica y lectura íntegra del corpus editorial publicado.` y description de skill arriba. Types son media types reales de artifacts: skill text/markdown cumple discovery RFC; no usar un tipo experimental +md incompatible con bytes servidos. ARD permite tipos de artifact independientes y no obliga registrarse como MCP/agent para poder anunciar API/skill. OpenAPI Content-Type puede llevar parámetro version; entry.type es base media type. Cada URL200y mismo origen sin redirect; entries sólo apuntan a destinos generados. ARD/skills/API Catalog/OpenAPI≤256 KiB **cada uno** (query-index/Markdown tienen sus propios caps). Schemas F3 locales más schema ARD primario archivado `$defs/ArdManifest` validan shape; URI formatos con invariantes locales sin remote fetch. No afirmar certificación de registro/discoverability semántica por existir JSON.

## 6. Link y llms

Conjunto **exacto de nuevos valores** añadidos sin duplicar ni borrar otros valores ajenos; orden aquí; el F1 existente queda primero:

```text
<https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"
<https://cuidatuperroviejo.com/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"
<https://cuidatuperroviejo.com/agent-api/v1/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"
<https://cuidatuperroviejo.com/.well-known/ard.json>; rel="ard"; type="application/json"
<https://cuidatuperroviejo.com/.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/json"
```

Header Link une valores con `, `. rel ard y ai-catalog son mecanismos de drafts; se registran como tales, no se afirman registradas IANA. Las relaciones api-catalog/service-desc/describedby corresponden a RFCs. Todos targets200del build; no Link a skill index con rel inventada. El índice de skills se encuentra por well-known/llms/ARD. Links HTTP comunes se aplican a assets, respuestas Astro, negociadas F2, API F3 y sus errores/HEAD/304 nativos según surfaces; el patch F2 sólo cambia esos valores discovery, no negotiation/bytes.

Cuatro headers de seguridad preservados exactos:

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

llms F1 conserva todo su texto/listado y orden; F3 añade al final sólo:

```markdown
## Interfaces públicas de contenido

- [API Catalog](https://cuidatuperroviejo.com/.well-known/api-catalog): catálogo de operaciones públicas de lectura.
- [OpenAPI](https://cuidatuperroviejo.com/agent-api/v1/openapi.json): contrato de catálogo, búsqueda y lectura íntegra.
- [Skills](https://cuidatuperroviejo.com/.well-known/agent-skills/index.json): instrucciones verificables para buscar, leer y citar.
- [ARD](https://cuidatuperroviejo.com/.well-known/ard.json): capacidades públicas activas.
```

Se añade una blank line entre newline final F1 y sección. Generador F3 valida destinos antes de anexar; check discovery espera prefijo F1 byteexacto y sección exacta, no exige llms entero idéntico al contrato histórico. Rebuild no duplica sección. No publicar llms-full.txt ni anunciar futuros cálculos/auth/MCP. Reversión de C quita sección y valores añadidos conjuntamente con destinos según SDD.
