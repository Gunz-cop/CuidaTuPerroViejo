# Contratos normativos F4A v1

> **Modificado por el [seguimiento F4A](f4a-seguimiento.md) (D33, 2026-10-13):** las franjas de calidad de vida pasan a mínimos exclusivos (`score > 50` good, `score > 35` acceptable), con vectores de frontera nuevos, OpenAPI `1.2.0` y el ejemplo normativo de todo 5 regenerado (`compromised`). Las reglas `>=` de §1.2 y §2 de este documento quedan sustituidas por las de esa SDD.

Complemento obligatorio de la [SDD F4A](f4a-herramientas-webmcp.md). Todos los nombres, campos, textos y órdenes de este archivo son exactos. Constantes heredadas de [contratos F3](f3-contratos.md): `SITE=https://cuidatuperroviejo.com`, UTF-8 sin BOM, LF final, JSON emitido `JSON.stringify(value,null,2)+'\n'`, orden de campos igual al de la tabla correspondiente. Lo que este archivo no modifica de F3 sigue vigente sin cambios.

## 1. Fuente de verdad de las dos herramientas

Las únicas herramientas del programa son las dos páginas del inventario F2 de tipo `tool`. La base `eff4ce13a1f4b996f3d9b523799012bc668da318` contiene su lógica en el `<script is:inline>` de cada página; esos bytes son la **fuente legada** y el oráculo de paridad. El widget de edad humana de la home (`HomeAgeCalculator.astro`) no es una herramienta del inventario y queda fuera de F4A.

| documentId | Página | Lógica legada (base) |
|---|---|---|
| `tool--calidad-vida` | `/herramientas/calculadora-calidad-vida-perros` | `CRITERIA`, `MAX`, umbrales y textos de `showResult()` |
| `tool--movilidad` | `/herramientas/selector-movilidad-perros-mayores` | `OPT1`, `OPT2`, `RES`, clave `a1+a2`, alerta estática `#m5alert` |

### 1.1 Calculadora HHHHHMM (`calidad-vida`)

Siete criterios en este orden, cada uno entero 0..10 (chips 0–10 de la UI). Claves API y etiquetas visibles (`label` de `CRITERIA`):

| key | label | name UI |
|---|---|---|
| `hurt` | `Dolor` | `Hurt (Dolor)` |
| `hunger` | `Apetito` | `Hunger (Apetito)` |
| `hydration` | `Hidratación` | `Hydration (Hidratación)` |
| `hygiene` | `Higiene` | `Hygiene (Higiene)` |
| `happiness` | `Felicidad` | `Happiness (Felicidad)` |
| `mobility` | `Movilidad` | `Mobility (Movilidad)` |
| `moreGoodDays` | `Balance` | `More Good Days (Balance)` |

Fórmula legada sin cambios: `score = suma de los siete valores`, `maxScore = 70`. Franja: `score >= 50` → `good`; `score >= 35` → `acceptable`; resto → `compromised`. La UI exige los siete valores para llegar al resultado; la API y WebMCP también. La FAQ de la página dice «superior a 35» mientras el código trata 35 como aceptable: se conserva el comportamiento del código (no se cambian fórmulas ni textos), y la discrepancia editorial se registra como observación para el propietario.

Textos por franja (iguales al `textContent` legado, espacios colapsados):

| band | interpretation | message | recommendation | guide.label |
|---|---|---|---|---|
| `good` | `✅ Calidad de Vida BUENA.` | `Tu perro aún disfruta momentos importantes contigo.` | `💡 Sigue así: Mantén los cuidados actuales y visita al veterinario en los controles rutinarios. Tu perro está respondiendo bien.` | — (`guide:null`) |
| `acceptable` | `⚠️ Calidad de Vida ACEPTABLE.` | `Estás en un punto donde observar y acompañar es clave.` | `💡 Atención: Hay áreas que merecen seguimiento. Consulta a tu veterinario pronto para ajustar el plan de cuidados.` | `📖 Cómo mejorar la calidad de vida de tu perro` |
| `compromised` | `🛑 Calidad de Vida COMPROMETIDA.` | `Es un momento difícil. Buscar claridad ahora también es una forma de cuidar de él.` | `💡 Importante: El puntaje indica sufrimiento significativo. Consulta a tu veterinario lo antes posible para evaluar opciones paliativas.` | `📖 Entender los cuidados paliativos y las opciones disponibles` |

`guide.url` = `SITE+/cuidados-paliativos-perros`. `notices` exactos y en este orden: `💛 Esta herramienta es una guía. Tu amor y criterio siempre son lo más importante.`, `Esta herramienta no toma decisiones por ti. Solo te ayuda a ver con más claridad lo que ya estás sintiendo.`

### 1.2 Selector de movilidad (`movilidad`)

Entradas API y su equivalente UI exacto:

| param | valor API | código UI | opción visible |
|---|---|---|---|
| `level` | `light` | `L` | `Nivel Ligero` — `Camina pero resbala o tiene miedo al suelo` |
| `level` | `moderate` | `M` | `Nivel Moderado` — `Se fatiga rápido, debilidad trasera o le cuestan las escaleras` |
| `level` | `severe` | `S` | `Nivel Severo` — `Ya no puede levantarse solo o perdió el uso de las patas traseras` |
| `handling` | `calm` | `A` | `Se deja manipular con calma` — `Tolera que le toquen las patas y el cuerpo` |
| `handling` | `stressed` | `B` | `Se estresa o reacciona mal` — `Intenta morder, huye o gruñe cuando le tocan` |

`resultKey = códigoNivel + códigoManejo` (`LA`, `LB`, `MA`, `MB`, `SA`, `SB`), tabla `RES` legada sin cambios. Salida por resultado: `icon` (`ico`), `badge`, `title` (`tit`), `description` (`desc`) y `plan` = `prods` en orden, cada `{name, why}`. **Las URLs de afiliado (`url`) no se exponen** en API ni WebMCP: la UI las oculta (`SHOW_AFFILIATE_LINKS=false`) y F4A excluye comercio. Siguen disponibles para la UI en un módulo separado (ver abajo), con el flag intacto.

`palliativeAlert` sólo cuando `level=severe` (la UI muestra `#m5alert` sólo para `a1==='S'`); en otro caso `null`. Contenido igual al HTML estático de la base:

```json
{
  "title": "⚠️ Cuidado paliativo importante",
  "items": [
    { "text": "⚠️ Para la higiene: considera pañales caninos y empapadores absorbentes bajo su zona de descanso. Cámbialos con frecuencia para evitar dermatitis.", "link": null },
    { "text": "⚠️ Cambia su posición cada 4 horas si no puede moverse solo, para prevenir úlceras de decúbito.", "link": { "label": "Cómo hacerlo sin causarle dolor →", "url": "https://cuidatuperroviejo.com/cuidados-paliativos-perros/ulceras-presion-perros" } },
    { "text": "⚠️ Evalúa si hay dolor controlado con nuestra", "link": { "label": "Calculadora HHHHHMM →", "url": "https://cuidatuperroviejo.com/herramientas/calculadora-calidad-vida-perros" } }
  ]
}
```

Regla de derivación exacta (función `alertItemText(li)`), usada igual por el test contra el HTML construido y por la comparación con el DOM visible de C4A-04: `collapse(span.textContent) + " " + collapse(resto)`, donde `span` es el primer hijo elemento `<span>` del `<li>` (el icono ⚠️, posicionado de forma absoluta), `resto` es la concatenación del `textContent` de los demás nodos hijos del `<li>` **excluyendo** ese `<span>` y el `<a>`, y `collapse(s)` reemplaza `\s+` por un espacio y hace trim. El HTML construido no tiene espacio literal entre `</span>` y el texto (Astro `compressHTML`); el espacio de la regla es la separación visual del icono absoluto, igual que la proyección Markdown F2. `title` = `collapse(textContent)` del `<div>` de título (ahí el espacio es literal). `link.label` = `collapse(a.textContent)`, `link.url` = `new URL(a.href, SITE).href`. El marcado estático de la alerta **no se reescribe**: el módulo compartido contiene este dato y un test obligatorio lo compara, mediante esta regla, contra el HTML construido. Es la única réplica textual permitida y existe para no alterar bytes de la proyección F2.

Las URLs de afiliado de `RES` viven en un módulo separado (`src/lib/agent-tools/movilidad-afiliados.ts`) que sólo importa la página del selector; el dato que importan API y WebMCP no las contiene, de modo que no viajan en el bundle de todas las páginas. `guide` = `{label:"📖 Leer la guía completa de movilidad y dolor →", url: SITE+"/movilidad-dolor-perros-mayores"}`. `notices` = `["Esta recomendación es una guía de apoyo. Ante dudas, consulta siempre a tu veterinario."]`.

### 1.3 Identidad de herramienta

`ToolInfo` cerrado, valores copiados del JSON-LD `SoftwareApplication`/`WebPage` de cada página base (comprobados contra el HTML construido; no son fechas de build):

| toolId | documentId | name | canonicalUrl | softwareVersion | lastReviewed |
|---|---|---|---|---|---|
| `calidad-vida` | `tool--calidad-vida` | `Calculadora de Calidad de Vida Canina HHHHHMM` | SITE+`/herramientas/calculadora-calidad-vida-perros` | `2.0` | `2026-07-21` |
| `movilidad` | `tool--movilidad` | `Selector de Ayudas de Movilidad para Perros Mayores` | SITE+`/herramientas/selector-movilidad-perros-mayores` | `1.0` | `2026-05-14` |

La metodología completa, sus fuentes y avisos se leen con `readAgentDocument` sobre `documentId`; la salida de cálculo no duplica referencias ni las resume.

## 2. API HTTP de cálculo

| Ruta exacta | Métodos | operationIds |
|---|---|---|
| `/api/agent/v1/tools/calidad-vida` | GET, HEAD, OPTIONS | `evaluateQualityOfLife`, `headQualityOfLife`, `optionsQualityOfLife` |
| `/api/agent/v1/tools/movilidad` | GET, HEAD, OPTIONS | `recommendMobilityAids`, `headMobilityAids`, `optionsMobilityAids` |

Mismo Worker y namespace que F3 (`createAgentApiWorker`); no se agregan reglas de routing ni bindings. Cualquier otro path bajo `/api/agent/v1/tools` → 404 `ROUTE_NOT_FOUND`. Precedencia F3: path (incluido `%`→400) → método (OPTIONS 204 sin validar query; otros salvo GET/HEAD → 405 con `Allow`) → query → cálculo. No leen ASSETS, corpus ni red; `corpus` no es parámetro válido aquí.

Decodificación y reglas generales de query **idénticas a F3 §2** (form-urlencoded con percent UTF-8 estricto y `+`→espacio, raw ≤2048 bytes, keys únicas y conocidas, sin keys vacías, sin C0/DEL, separadores vacíos ignorados). Todas las keys de cada endpoint son **obligatorias**; falta, sobra, duplicado o valor inválido → 400 `INVALID_REQUEST`.

| Endpoint | Keys obligatorias | Valor |
|---|---|---|
| calidad-vida | `hurt,hunger,hydration,hygiene,happiness,mobility,moreGoodDays` | forma `0` o `[1-9][0-9]*`, rango 0..10 inclusive (`05`, `+1`, `-1`, `1.0`, `11`, vacío → 400) |
| movilidad | `level`, `handling` | enum exacto sensible a mayúsculas: `light|moderate|severe` y `calm|stressed` |

Respuestas 200 (`application/json; charset=utf-8`), orden exacto:

| Respuesta | Campos raíz en orden |
|---|---|
| QualityOfLifeResult | `schemaVersion` (`agent-api/1`), `tool` (ToolInfo), `input` (**objeto** con las siete keys API de §1.1 en ese orden y sus enteros), `score`, `maxScore` (70), `band`, `thresholds` (`{good:50, acceptable:35}`), `breakdown` (7 × `{criterion,label,value,max:10}` en orden §1.1; `criterion` = **key API** p. ej. `hurt`, `label` = columna label), `interpretation`, `message`, `recommendation`, `guide` (objeto `{label,url}` o null), `notices` |
| MobilityResult | `schemaVersion`, `tool`, `input` (**objeto** `{level,handling}` con los **valores API** `light|moderate|severe` y `calm|stressed`, no los códigos UI), `resultKey`, `icon`, `badge`, `title`, `description`, `plan` (`[{name,why}]`), `palliativeAlert` (objeto o null), `guide`, `notices` |

ToolInfo campos en orden: `toolId, documentId, name, canonicalUrl, softwareVersion, lastReviewed`. Cuerpos 200 completos normativos: [calidad-vida, todo 5](../evidencia/f4a/contratos/ejemplo-calidad-vida-200.json) y [movilidad severe/stressed](../evidencia/f4a/contratos/ejemplo-movilidad-200.json), generados desde los literales del script legado de la base. Schemas cerrados (`additionalProperties:false`), todos los campos requeridos, nulos explícitos. Errores con el schema `Error` y la tabla de códigos/mensajes de F3 §3; una excepción interna inesperada → 503 `CONTENT_UNAVAILABLE` sin detalle. Headers de F3 §3 sin cambios (`Cache-Control: private, no-store`, CORS `*` con `GET, HEAD, OPTIONS`/`Accept`/`Link`, Link F3, cuatro de seguridad, sin ETag/Set-Cookie). HEAD calcula igual que GET y omite cuerpo; OPTIONS 204 sin cuerpo. Body entrante nunca se procesa.

Ejemplos normativos (cuerpos completos en los fixtures de F4A-1, generados por el oráculo independiente, no por la implementación):

- `GET /api/agent/v1/tools/calidad-vida?hurt=5&hunger=5&hydration=5&hygiene=5&happiness=5&mobility=5&moreGoodDays=5` → 200, `score:35`, `band:"acceptable"`.
- Sumas 34/35/49/50 → `compromised`/`acceptable`/`acceptable`/`good`; todo 0 → 0 `compromised`; todo 10 → 70 `good`.
- `GET /api/agent/v1/tools/movilidad?level=severe&handling=stressed` → 200, `resultKey:"SB"`, `palliativeAlert` presente.
- `level=Severe`, `hurt=11`, `hurt=05`, key faltante o extra, `corpus=<hash>` → 400. `POST` → 405. `/api/agent/v1/tools/otra` → 404.

## 3. OpenAPI, schema y registro de capacidades

`src/agent-api/openapi.template.json` y `schema.json` evolucionan de forma aditiva: OpenAPI sigue en `3.1.1` y en la misma URL; `info.version` pasa a `1.1.0`; `info.title` = `API pública de Cuida tu Perro Viejo`; `info.description` de la plantilla = `Catálogo, búsqueda léxica y lectura íntegra del corpus editorial publicado de Cuida tu Perro Viejo, y cálculo de sus dos herramientas educativas (escala HHHHHMM y selector de ayudas de movilidad), con los mismos resultados que la interfaz del sitio. Los cálculos son orientativos y no constituyen diagnóstico veterinario. Documento normativo de diseño; este archivo no prueba publicación.` (la frase marcador final la exige y elimina `agent-api.mjs`, como en F3). Paths en orden: los tres F3 y después los dos de §2. Componentes en orden: los siete F3 y después `ToolInfo`, `QualityOfLifeResult`, `MobilityResult`; igualdad con `$defs` del schema tras normalizar refs, como en F3. Parámetros con `required:true`, schema `string` y patrones `^(?:[0-9]|10)$` (calidad-vida) o enum (movilidad); la descripción repite la regla de forma decimal. `security:[]` en cada operación. Respuestas documentadas: 200 (con schema), 400, 404, 405, 503; HEAD 200/400/404/405/503 sin cuerpo; OPTIONS 204/404.

`src/agent-api/capabilities.json` añade al final de `operations`:

```json
{ "operationId": "evaluateQualityOfLife", "path": "/api/agent/v1/tools/calidad-vida", "methods": ["GET", "HEAD", "OPTIONS"], "examplePath": "/api/agent/v1/tools/calidad-vida?hurt=5&hunger=5&hydration=5&hygiene=5&happiness=5&mobility=5&moreGoodDays=5", "title": "Calculadora HHHHHMM de ejemplo; los siete criterios en 5", "type": "application/json" },
{ "operationId": "recommendMobilityAids", "path": "/api/agent/v1/tools/movilidad", "methods": ["GET", "HEAD", "OPTIONS"], "examplePath": "/api/agent/v1/tools/movilidad?level=moderate&handling=calm", "title": "Selector de movilidad de ejemplo; nivel moderado y manejo tranquilo", "type": "application/json" }
```

y `ardApiEntry` cambia sólo `description` a `API pública de catálogo, búsqueda léxica y lectura íntegra del corpus editorial publicado, y cálculo de sus dos herramientas educativas.` y `representativeQueries` añadiendo al final `Calcula la escala HHHHHMM de calidad de vida de un perro mayor.` y `Recomienda ayudas de movilidad para un perro mayor con debilidad trasera.` El generador `agent-api.mjs` valida este conjunto exacto de 5 operaciones/15 operationIds/10 componentes y rechaza cualquier otro.

## 4. Descriptores derivados

- **API Catalog** (`/.well-known/api-catalog`): el primer contexto añade, después de los tres items F3, `SITE+examplePath` de cada operación nueva con su `type` y `title`. El contexto `service-desc` no cambia. HEAD/MIME/Link idénticos a F3.
- **ARD** (`ard.json` y `ai-catalog.json` byteidénticos): sigue con 2 entradas; cambia la entrada API según §3. No se añaden entradas para WebMCP ni MCP.
- **Skill** `buscar-leer-citar`: nombre, descripción, URL y URN sin cambios; el cuerpo pasa a ser exactamente el [anexo F4A](../evidencia/f4a/contratos/buscar-leer-citar.SKILL.md). Digest recalculado sobre los bytes servidos. ≤32 KiB.
- **llms.txt**: prefijo F1 byteexacto y sección F3 con una única línea cambiada: `- [OpenAPI](https://cuidatuperroviejo.com/agent-api/v1/openapi.json): contrato de catálogo, búsqueda, lectura íntegra y cálculos de las dos herramientas.` Ninguna otra línea; no se anuncia WebMCP ni MCP en llms.
- **Link HTTP, robots, Content Signals, sitemap, `_headers`**: sin cambios. Política `search=yes, ai-input=yes, ai-train=no`.

## 5. WebMCP

### 5.1 Versión, API y compatibilidad

Referencia normativa: *WebMCP*, Draft Community Group Report, Web Machine Learning CG, **9 de octubre de 2026** (no estándar W3C). API imperativa exclusivamente: `document.modelContext.registerTool(tool, { signal })` → `Promise<undefined>`; `tool = { name, title, description, inputSchema, execute, annotations }`; `execute(input, { signal })` → `Promise<any>`; desregistro por `AbortSignal`. Gate: Permissions Policy `tools` (default `'self'`; el header actual no lo restringe y F4A no lo modifica). Contexto seguro obligatorio. No se usa la API declarativa (`toolname`, `tooldescription`, `toolparamdescription`, `toolautosubmit`): ningún `<form>` del sitio se anota.

Detección: `const mc = document.modelContext ?? navigator.modelContext`; se usa sólo si es objeto con `registerTool` función. `navigator.modelContext` es el nombre previo de builds del origin trial; su resultado se envuelve en `Promise.resolve`. Si `input` llega como string (builds ≤154 según fuentes secundarias), se aplica `JSON.parse` y debe dar objeto; si no, `INVALID_REQUEST`. Sin API: el módulo termina sin efectos, sin polyfill ni objeto simulado, y sin peticiones.

Compatibilidad verificable por F4A: **Google Chrome for Testing 155.0.8059.39** con `--enable-features=WebMCPTesting` (equivalente a `chrome://flags/#enable-webmcp-testing`). Navegadores sin soporte de referencia: el mismo Chrome 155 sin flag y Chromium 141.0.7390.37. Chrome estable sin flag ni token de origin trial **no** expone la API: F4A no añade token de origin trial (requiere registro del propietario; fuera de alcance). Firefox/Safari no se verifican; su camino es el de «sin API».

### 5.2 Superficies y registro

Registro en **todas las páginas renderizadas por `src/layouts/BaseLayout.astro`** mediante un `<script>` procesado por Astro que importa `src/scripts/agent-tools.ts`; se ejecuta al cargar, sin interacción. Admin no usa ese layout y no registra nada. Las cuatro herramientas se registran en el orden de la tabla, cada una con `annotations:{readOnlyHint:true}` y el mismo `AbortSignal`; si cualquier registro rechaza, se aborta el controlador para no dejar un conjunto parcial. Nunca se registran contacto, feedback, asistente `/api/ask`, admin, compartir/copiar/WhatsApp/ICS/imprimir ni navegación.

| name | title | description exacta |
|---|---|---|
| `search_guides` | `Buscar guías` | `Busca guías publicadas de Cuida tu Perro Viejo por palabras completas y devuelve documentos con su puntuación léxica. No genera consejo veterinario.` |
| `read_guide` | `Leer guía completa` | `Lee el contenido íntegro en Markdown de una guía por su documentId, con metadata, URL canónica y enlaces originales.` |
| `evaluate_quality_of_life` | `Calculadora HHHHHMM` | `Calcula la escala HHHHHMM de calidad de vida (siete criterios de 0 a 10) igual que la calculadora del sitio. Es orientativa, no un diagnóstico ni una decisión.` |
| `recommend_mobility_aids` | `Selector de movilidad` | `Recomienda ayudas de movilidad según el nivel de movilidad y la tolerancia a la manipulación, igual que el selector del sitio. Orientativo; consulta al veterinario.` |

`inputSchema` de cada tool: **exactamente** el objeto homónimo del anexo [webmcp-input-schemas.json](../evidencia/f4a/contratos/webmcp-input-schemas.json) (igualdad profunda; `type:"object"`, `additionalProperties:false`). **Todas las cadenas de los `inputSchema` son ASCII (U+0000–U+007F)**: Chrome 155 omite `inputSchema` en `WebMCP.toolsAdded` cuando una cadena del schema contiene caracteres Latin-1 no ASCII ([B4](../evidencia/f4a/auditoria/sdd-r2.md), [comprobación](../evidencia/f4a/ciclo2/README.md)); por eso sus descripciones van en español sin tildes. `name`, `title` y `description` de cada tool no tienen esa restricción y conservan las tildes de la tabla. Resumen: `search_guides` `q` (required), `kind`, `limit` 1..20, `offset` 0..98, `corpus`; `read_guide` `documentId` (patrón F3, ≤160, required), `corpus`; `evaluate_quality_of_life` las siete keys integer 0..10 required; `recommend_mobility_aids` `level`/`handling` enums required.

### 5.3 Ejecución, resultados, errores y cancelación

1. **Validación estructural local** (siempre, aunque el navegador valide): objeto plano, keys conocidas, requeridas presentes, tipos JSON correctos, enteros (`Number.isInteger`) dentro de rango, enums exactos, patrones de ID/corpus. Fallo → la promesa **resuelve** con el cuerpo de error F3 exacto `{"schemaVersion":"agent-api/1","error":{"code":"INVALID_REQUEST","message":"Invalid request."}}`, sin red.
2. `search_guides`/`read_guide` **reutilizan la API F3**: un único `fetch` same-origin GET a `/api/agent/v1/search?…` (parámetros presentes en orden `q,kind,limit,offset,corpus`, codificados con `URLSearchParams`) o `/api/agent/v1/documents/<documentId>[?corpus=…]` (ID ya validado por patrón: impide salir del namespace). Opciones: `signal`, `credentials:"omit"`, `cache:"no-store"`, `redirect:"error"`, `headers:{Accept:"application/json"}`. Si el status ∈ {200,400,404,409,503} y la essence MIME del Content-Type (antes de `;`, minúsculas, trim) es `application/json`, resuelve con el JSON del cuerpo **sin modificarlo**. Cualquier otra condición (red, status, MIME, JSON inválido) **rechaza** con `Error("CONTENT_UNAVAILABLE")`. Sin reintentos ni caché propia.
3. Los cálculos ejecutan la **función compartida** localmente, sin red, y resuelven con el mismo objeto que la API 200 para la entrada equivalente (entero JSON `n` ≡ query decimal `n`).
4. **Cancelación:** si `signal` ya está abortada o se aborta antes de resolver, la promesa rechaza con `signal.reason` (AbortError); el `fetch` en curso se aborta. Unregister no cancela una ejecución en curso (spec).
5. Ningún `execute` modifica DOM, almacenamiento, cookies, historial ni estado de la UI; no registra entradas en consola, analytics ni logs.

## 6. Límites y seguridad

Por solicitud HTTP: query ≤2048 bytes, keys fijas, cálculo O(1) sin I/O; respuestas de cálculo < 8 KiB. WebMCP: como máximo un `fetch` same-origin por llamada y ninguno para cálculos. No se añade binding de rate-limit ni cuota global (mantiene D14 F3: API pública sin coste, escritura ni fetch externo; la protección general existente de Cloudflare no se reconfigura). Una necesidad futura de cuota requiere su propia SDD. No hay secretos, cookies, auth ni datos personales en entradas o salidas; las entradas de cálculo no se persisten.
