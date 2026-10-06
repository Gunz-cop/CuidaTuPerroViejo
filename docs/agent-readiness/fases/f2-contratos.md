# Contratos normativos F2 v1

Complementan [SDD F2](f2-lectura-markdown.md). No son un manifiesto de capacidades ya publicadas. No modificar retrospectivamente F0/F1: las precisiones D06–D10 se registran aparte.

## 1. Rutas, bytes y límites

`SITE = https://cuidatuperroviejo.com`, language `es`. Identidades/disposition del inventario F1 son autoridad. Índice: `/agent-content/v1/index.json`. Documento: `/agent-content/v1/documents/<documentId>.md`. Canónicas existentes se mantienen sin slash final excepto `/`. Representación explícita no es canonical ni aparece como artículo nuevo en sitemap; los enlaces editoriales siguen apuntando a canonical HTML. ID `article--<slug>` sigue único global aunque haya pilares distintos.

GET/HEAD públicos sin autenticación. Query no selecciona documento, no entra en índice/digest y no se refleja en Markdown. IDs/rutas desconocidos explícitos continúan404; nunca sustitución de otro documento. No admitir path/URL suministrado para lectura arbitraria. Métodos distintos GET/HEAD y rutas API/admin no se negocian.

Límites de build/runtime v1: **98 documentos**, índice≤512 KiB UTF-8, cada Markdown≤512 KiB, total Markdown≤16 MiB; valores inclusivos. No truncar. ID≤160 caracteres ASCII, regex `^(home|(?:pillar|article|page)--[a-z0-9]+(?:-[a-z0-9]+)*|tool--(?:calidad-vida|movilidad))$`; además relación exacta kind/ID y mapas editoriales F0. CanonicalPath únicamente `/` o segmentos `[a-z0-9]+(?:-[a-z0-9]+)*`, sin `%`, `.`/`..`, backslash, query/fragment, doble slash; el límite más estricto de patrones Wrangler prevalece y falla build antes de empaquetar. Total reglas≤100. UTF-8 sin BOM, LF y newline final; JSON pretty indent2 con orden de campos abajo. Nunca timestamps de build, tokens o campos privados.

## 2. Índice closed schema

Todos los campos siguientes obligatorios y **sin propiedades adicionales**, ni a nivel raíz ni entrada. `documents` array no vacío, orden ASCII documentId, sin duplicados ID/canonicalPath/markdownPath. title/description nonempty normalizados con whitespace a un espacio; language exactamente `es`; SHA256 lowercase64hex. kind uno de `home|pillar|article|tool|editorial`. dates son null o string ISO8601 validada tal como JSON-LD editorial principal la declara; no fecha de archivo/build. HTMLsha se refiere a los bytes de la página de ese build, Markdownsha a la entidad UTF-8. markdownBytes entero 1..524288.

```json
{
  "schemaVersion": "agent-content/1",
  "siteOrigin": "https://cuidatuperroviejo.com",
  "language": "es",
  "corpusSha256": "<sha256 real definido abajo>",
  "documents": [
    {
      "documentId": "home",
      "kind": "home",
      "title": "<texto H1 real>",
      "description": "<meta description real>",
      "canonicalPath": "/",
      "canonicalUrl": "https://cuidatuperroviejo.com/",
      "markdownPath": "/agent-content/v1/documents/home.md",
      "language": "es",
      "datePublished": null,
      "dateModified": null,
      "htmlSha256": "<sha256 de HTML construido>",
      "markdownSha256": "<sha256 de los bytes Markdown>",
      "markdownBytes": 123
    }
  ]
}
```

Es plantilla con valores derivados, no ejemplo aceptable con hashes ficticios. El ejecutor adjunta un índice **real completo válido** como fixture y evidencia. `canonicalUrl = SITE + canonicalPath`, `markdownPath` exactamente plantilla de documentId. corpusSha256 = SHA256 UTF-8 de `JSON.stringify(documents.map(d => [d.documentId,d.canonicalPath,d.markdownSha256]))`, ordenado como array; sin newline. Ningún cliente elige paths externos aunque index esté corrupto.

JSON-LD se lee solo para metadata, no se transcribe como prosa ni se ejecuta. Principal: artículo BlogPosting `url=canonical`, `@id=canonical+#article`; pilares CollectionPage `url=canonical`, `@id=canonical+#webpage`; home WebPage/WebSite, editoriales AboutPage/WebPage, herramientas WebPage. Exigir entidad principal inequívoca: los @id de herramientas pueden ser canonical sin sufijo, como HTML base. Capturar solo `datePublished`/`dateModified` de principal si existen; `lastReviewed` no se convierte a `dateModified`. Organización/Breadcrumb/FAQ/SoftwareApplication no sustituyen principal. Texto visible de firma/fecha se conserva en Markdown aunque índice tenga null; nunca inventar autor/veterinario/revisión clínica a partir de publisher.

## 3. Selección DOM

Parse5 7.3.0; selección estructural mediante recorrido DOM y predicados de tag/id/class, no parser CSS nuevo ni regex de HTML. Las notaciones CSS de esta tabla definen predicados exactos. H1 **único en todo documento**, texto igual a inventory.title; no limitar comprobación a root. Seleccionar H1 una vez para encabezado; omitir ese mismo nodo en cuerpo. Roots y subtrees obligatorios con cardinalidad1 salvo collections explícitas. Si falta/duplica, fail build; no fallback `main`/`body`/MDX.

| Perfil | Subárboles en orden editorial y reglas |
|---|---|
| home | `main#main-content` entero, con H1 excluido de segunda emisión. |
| article | `article > header` (firma, time, hero, caption; sin H1 duplicado), luego `.content-body.prose` única dentro de ese article. TOC y módulos relacionados externos al cuerpo no se añaden. |
| pillar salud (6 slugs F0) | Hero que contiene `h1#health-title`: seleccionar H1 y párrafo(s) hermano(s) editorial(es) en su contenedor inmediato, excluyendo nav/icons; luego `article.content-body.health-content.prose`; al final `aside.health-toc > .health-toc__source > p` único. Nunca todo el nav/TOC. |
| pillar herramientas | H1 global más párrafo(s) editorial(es) del contenedor hero inmediato; luego `main.mx-auto.w-full.max-w-4xl` (ya incluye cuerpo `.content-body.prose`, no serializar ambos dos veces). |
| page--acerca-de | H1 global y párrafo hero inmediato; luego `article#about-us`. |
| page--politica-editorial | H1 global y párrafo hero inmediato si existe; luego `main.max-w-3xl`. |
| tool--calidad-vida | `main.max-w-3xl` entero, sustituyendo `#qol-widget` único por las selecciones descritas abajo. |
| tool--movilidad | `main.max-w-3xl` entero, sustituyendo `#m5widget` único por las selecciones descritas abajo. |

Hero “inmediato” significa padre real del H1, no ancestro body; incluir sus hijos `p` directos en orden. Si p reside en otra estructura nueva, no buscar texto por semejanza: bug de perfil. Imágenes/figuras de héroes fuera de esos roots: artículo ya incluye header; herramientas incluye main; home incluye main. Pilares/editoriales no requieren extraer decoración del hero. Esta elección conserva H1/prosa, no representación visual.

Exclusiones generales **solo dentro de las selecciones**: nav, script, style, noscript, iframe, template, svg, form (incluido labels/datos), button, input, select, textarea, progress, `[role=progressbar]`, nodos `aria-hidden=true` puramente decorativos y `div.ad-slot[data-ad-pending]`. `.back-btn` y navegación breadcrumb/TOC identificada se excluyen. No excluir globalmente `aside`, `.not-prose`, `[hidden]`, `.off`, figure, details o links. Wrapper div/section/span/article transparentes salvo reglas semánticas; alertas aside completas. Si un nodo nuevo puede contener contenido y no tiene regla, fail con tag/ID/perfil; no descartarlo silenciosamente. Comentarios se omiten.

Herramientas: conservar todas las secciones educativas/criterios/FAQ/referencias fuera del widget, header/fecha/firma e imágenes. Widget calculadora se reemplaza por `#qol-intro` (sin button/decoración; conservar “últimos 3 días”, h3 y los tres umbrales), `#qol-result-box > p.mt-4.text-xs.font-light` y `#qol-result > .qol-anti-guilt`, cada uno único. Todo el resto del widget queda fuera, incluyendo placeholder35, estado dinámico, preguntas/progreso/resultados/CTAs/copiar. No excluir números35 reales de umbrales/FAQ. Widget movilidad se reemplaza por `#m5s0` sin controles/decoración, luego literal contextual **“Aviso condicional de la interfaz para nivel severo:”**, contenido completo de `#m5alert[role=alert]` único, y `#m5s3 > p:last-of-type` limitación única. No presentar alerta como diagnóstico/puntaje actual. Resto de widget excluido. No ejecutar JS ni copiar algoritmos/recomendaciones de objetos de script; F4A tiene ese alcance.

## 4. Serialización Markdown

Encabezado:

```text
# <H1 escapado real>

> URL canónica: [<URL>](<URL>)
> Idioma: es
> Publicación: <datePublished>                  (solo si no null)
> Modificación editorial: <dateModified>        (solo si no null)

<subárboles seleccionados, en orden>
```

Las marcas entre paréntesis no se emiten. No frontmatter, resumen generado, instrucciones para agentes, diagnosis ni explicación de implementación. La firma/fecha visibles no se deduplican por parecer iguales a JSON-LD; tienen funciones distintas y conservan literal fuente.

- Texto: entidades decodificadas por DOM; normalizar whitespace fuera de pre a un espacio, mantener separación de bloques, español/signos/acentos sin traducción. Escape backslash y sintaxis Markdown en texto para que no genere headings/listas/enlaces falsos. Inline strong/b→`**...**`, em/i→`*...*`; code→backticks con fence más largo que secuencias internas. br→hard break; hr→`---`. Texto completo, nunca límites de extracto.
- h2–h6: nivel original `##`…`######`, texto/enlaces íntegros; H1 único ya emitido. p: párrafo separado por blank line. Blockquote y aside/rolealert: conservar todos los bloques; blockquote prefijo`>`, aside conserva encabezado/texto/enlaces en orden, sin exigir icono o clase. No añadir consejo clínico.
- ul/ol/li: listas Markdown, anidación y orden preservados, ol start real; no aplanar li en frase. div/span de cards conservan texto y boundaries de sus hijos. dl/dt/dd si aparece: término bold seguido de definición por bloques; no descartar.
- table: GFM, headers reales de th; sin th primera fila se trata como encabezado de tabla conservando sus valores. Todas las filas/celdas en orden, escapes `|`, saltos internos `<br>` y markup inline preservados; colspan/rowspan distintos de1 o estructura no representable falla explícitamente (no tabla mutilada). Caption si existe se emite antes. No fabricar datos vacíos para ocultar pérdida; tabla rectangular obligatoria.
- details: summary pregunta en bold (incluidos headings internos si existieran, sin duplicación), seguido de **todo** su contenido en bloques, aunque cerrado/hidden. Q&A y links de respuestas no se generan desde JSON-LD ni solo summary. Excluir details bajo nav por regla previa, no confundirlo con FAQ.
- img: `![alt escapado](<URL absoluta>)`, alt real aunque vacío decorativo; imágenes `aria-hidden=true` decorativas excluidas. picture toma solo img, no multiplica srcset/source. figure conserva img y caption real como párrafo; sin inventar caption por filename/title. pre/code fenced, contenido literal y fence más largo que cualquier fence interior; language solo class language-* segura si está presente.
- a: conservar label inline y href, absoluto con `new URL(href, canonicalUrl)` (no preview origin); http/https y mailto/tel permitidos, fragment/query preservados. Imágenes solo http/https. href/src ausente en nodo editorial que lo necesita, esquemas javascript/data/blob/file, credenciales/control chars o URL inválida→error build. No fetch/validación en red ni sustituir PMID/DOI por homepage. No clasificar todo enlace externo como bibliografía científica. Enlaces de recursos conservan su query profunda.

Plain wrappers (`div`, `section`, `span`, `header`, `article`, `main`, `time`, `small`, `mark`, `abbr`, `sup`, `sub`, `u`, `s`, `del`, `ins`, `footer` interior editorial) conservan contenido; `time` conserva texto, no transforma fechas. Sub/sup se emiten `<sub>`/`<sup>` con contenido escapado para no perder significado. Raw HTML restante no se copia como escape genérico. Texto suelto significativo se conserva, espacio al unir inline se determina por texto DOM, sin concatenar palabras. Comentarios/decoración no son fuente editorial.

## 5. Accept canónico (F2B)

Parser de solo dos representaciones: `text/html` y `text/markdown` sin parámetros de media. Headers ausente o vacío→HTML. Máximo 8192 bytes ASCII del header; exceder→400. Tipos/parámetros case-insensitive. Separar miembros por comas respetando quoted-string; cada miembro media-range válido con q opcional. q gramática RFC: `0`, `0.` con0–3 dígitos, `1`, `1.` con0–3 ceros; sin signo/exponente/.8/NaN/1.1. Más de un q invalida ese miembro. Parámetros previos a q válidos se consideran requisitos de media no soportados (no match); extensiones posteriores a q token/quoted válidas se ignoran. Parámetro con sintaxis inválida invalida miembro. Invalidar `*/html`, tipos sin slash y wildcard parcial. Un miembro inválido se ignora; si ninguno válido→400. Header válido sin representación aceptable positiva→406.

Para cada representación: exact match domina `text/*` y este domina `*/*` aunque q sea menor; entre miembros de igual especificidad usar q máximo; no match→q0. Escoger Markdown solo con qMD>qHTML y qMD>0; empate positivo→HTML. q0 nunca elegible. Una exclusión específica q0 domina comodín. No modificar Accept del request delegado.

| Header | Resultado |
|---|---|
| ausente; vacío; `*/*`; `text/*` | HTML200 |
| `text/markdown`; `TEXT/MARKDOWN;q=1` | MD200 |
| `text/html,text/markdown` | HTML200 |
| `text/html;q=0.4,text/markdown;q=0.8` | MD200 |
| `text/html;q=0.9,text/markdown;q=0.2` | HTML200 |
| `text/markdown;q=0,*/*;q=1` | HTML200 |
| `text/html;q=0,*/*;q=1` | MD200 |
| `text/html;q=0,text/markdown;q=0` | 406 |
| `application/json` | 406 |
| `application/json,*/*;q=0.5` | HTML200 |
| `text/markdown;q=1.1` | 400 |
| `text/markdown;q=.8,text/html` | HTML200 |
| `text/markdown;q=0.1234` | 400 |
| `text/markdown;q=0.2;q=1` | 400 |
| `text/markdown;q=0.2,text/markdown;q=0.9,text/html;q=0.5` | MD200 |
| `text/html;q=0.2,text/*;q=0.9` | MD200 |
| `text/markdown;charset=utf-8` | 406 (parámetro de media no ofrecido) |
| `text/markdown;q=1;ext="a,b"` | MD200 |
| `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8` | HTML200 |
| `garbage,text/markdown` | MD200 |

No usar includes('markdown') ni tratar header inválido como permiso universal. Esta matriz se aplica solo a canónicas documentales; `.md` explícito/index son formatos únicos servidos por static assets, independientes de Accept.

## 6. Headers, condicionales y errores

Canónico negociado: HTML `text/html; charset=utf-8`, MD `text/markdown; charset=utf-8`; `Vary` incluye Accept exactamente una vez (mantiene otros tokens); `Cache-Control: private, no-store`. Reemplazar cualquier CDN-Cache-Control/Cloudflare-CDN-Cache-Control heredado con `no-store` si existiera. No Set-Cookie, auth, Content-Location a preview ni header diagnóstico de caché propio. Link F1 y cuatro headers de seguridad de `_headers` exactos, también en304/HEAD/errores; merge Link sin duplicar valor F1.

GET200 contiene asset elegido sin transformación; HEAD200 mismos status/headers de GET correspondiente sin body. ETag ASSETS opaco, distinto HTML/MD, no sintetizar desde índice si body fuese otro. If-None-Match: propio304, cruzado200, weak/list/* correctos por selectedvariant. HEAD304 vacío. Range/If-Range/If-Modified-Since ignorados en estas rutas; no parcial206 ni304porfecha; solo ETag puede generar304. No reutilizar longitud/encoding/validador de otra variante. Preservar encoding del stream elegido; checks usan entidad decodificada.

Errores documentales: 400 cuerpo literal `Invalid Accept header.\n`; 406 `No acceptable representation.\n`; 503 `Document representation unavailable.\n`. MIME `text/plain; charset=utf-8`, no-store/Vary/Link/seguridad, HEAD vacío; sin trazas o rutas filesystem. 304 body vacío; no Content-Length de200 si plataforma exige ausencia. No404 ficticio para un índice/asset esperado ausente. Desconocidos/redirects corresponden a delegado/assets; preservar status/Location y no seguir redirects para fabricar200.

Explícitos: índice `application/json; charset=utf-8`; `.md` `text/markdown; charset=utf-8`; seguridad/Link de `_headers`, política estática ASSETS del stack fijado, GET/HEAD/ETag nativos. Sin Vary Accept obligatorio porque formato único. Header de contenido explícito y negociado debe corresponder a bytes elegidos, no `.md` servido application/octet-stream. No anunciar nuevas relaciones discovery aún.
