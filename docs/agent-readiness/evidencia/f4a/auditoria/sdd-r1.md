# Auditoría independiente SDD F4A — revisión 1/2

| Campo | Valor |
|---|---|
| Intento | **1 de 2** |
| Objeto | `docs/agent-readiness/fases/f4a-herramientas-webmcp.md`, `fases/f4a-contratos.md`, `evidencia/f4a/{decisiones.md,contratos/buscar-leer-citar.SKILL.md,referencias/**}`, diff de `plan.md`/`README.md` contra la base |
| Commit auditado | `7cab1946f81ec9cf2c1c826ae58741403c975433` (HEAD verificado; `git ls-remote`: `refs/heads/agent-ready/f4a-sdd` = este SHA) |
| Tree auditado | `403f1ad55d3b8457e7cd6ad85bc44561ef5b5a76` (verificado) |
| Base declarada | `eff4ce13a1f4b996f3d9b523799012bc668da318`, tree `d46f6baf5e4a6eb0bcbc001882488e5944c52513` (verificado); `main` remoto = `aad2a6624c24d7425c5ad5329b82c77a8a86b619`, ancestro de la base; `aad2a66..eff4ce1` = 60 archivos, todos `docs/agent-readiness/**` (D21 verificado) |
| Sesión auditora | `session_011k5uFc2VrmGa3CVCgb2eSm`, creada por `session_01WrWNMhCy51TqDSjjHwBTVS`; distinta del autor |
| Modelo configurado / servido | `claude-opus-5-5` / `claude-opus-5-5` (`get_session`: `configured_model`, `session_context.model` y `external_metadata.last_served_model`), esfuerzo `high`. Sin fallback |
| Fecha | 2026-10-12 (UTC) |
| Alcance | Sólo bloqueantes; observaciones no bloqueantes aparte. No corrijo la SDD, no hago commits, push ni despliegues |

## Verificaciones realizadas

1. **Oráculo de build.** `npx --no-install astro build` de la base (clon local en el scratchpad, `npm ci --ignore-scripts`, exit 0): `corpusSha256` `912082d0a00775bbe30d03270bc55c3cef466dd68dff92b1921a122e197c3b0a`, 28 documentos, `tool--calidad-vida.md` `00028fb42759631a88b4440580b467c6d39b03d9897e04805909230886705db5`, `tool--movilidad.md` `bbde905eaabe6e64b5120ff0177ac19214a186f2faf66007a7f72a67b190bd37`, `query-index.json` `fbb2dda2c984cf1a61011f895bc9eb8311aa1a3907e0b94eb4a2956e4c1b2323`. **Coincide** con SDD §2.
2. **Transcripción de datos** contra `src/pages/herramientas/*.astro` de la base. Coinciden: `CRITERIA` (orden, `label`, `name`), `MAX=70`, umbrales `&gt;=50`/`&gt;=35`, textos de franja (`textContent` de los `innerHTML`), CTA por franja y su `href` `/cuidados-paliativos-perros`, `notices` estáticos, `OPT1`/`OPT2` (`tx`/`sub`/`v`), `RES` (`ico`/`badge`/`tit`/`desc`/`prods{name,why,url}`), `SHOW_AFFILIATE_LINKS=false`, condición `a1==='S'` de `#m5alert`, CTA de guía de movilidad y aviso final. `ToolInfo`: `name`/`softwareVersion` del `SoftwareApplication` y `lastReviewed` del `WebPage` del JSON-LD construido coinciden (`2.0`/`2026-07-21`; `1.0`/`2026-05-14`). La discrepancia FAQ «superior a 35» frente al código queda bien registrada como observación editorial. No hay nombres, entradas, fórmulas ni métodos clínicos inventados, **salvo el defecto B1** en la alerta.
3. **WebMCP contra fuentes primarias** (descargadas el 2026-10-12; `spec.html` sha256 `195f461e…f175`, `chrome.html` sha256 `add249e8…7dab`). Spec: Draft CG Report **9 October 2026**, editores Walderman/Sagar/Farolino, «not a W3C Standard». Coinciden con contratos §5.1 y referencias: IDL de `Document.modelContext` `[SecureContext, SameObject]`, `registerTool(tool, options)`→`Promise&lt;undefined&gt;`, `ModelContextTool{name,title,description,inputSchema,execute,annotations}`, `ToolExecuteCallback(object, {required signal})`, el desregistro por señal que no cancela una ejecución en curso, Permissions Policy `tools` por defecto `'self'` y la tabla de errores. Chrome for Developers (actualizado 2026-10-07): origin trial desde 149, flag `#enable-webmcp-testing`, gate `tools`. No se simula API nativa: sin polyfill, y la detección exige objeto con `registerTool`.
4. **Sondeo propio en navegador real.** Chrome for Testing 155.0.8059.39 (zip sha256 `55672d1f…ea8ea`, igual al registrado), con `--enable-features=WebMCPTesting` y un cliente CDP `WebMCP` (`probe-cdp.mjs` sha256 `36fc1895…e03`, salida `a213d54e…6ad`). `invokeTool` devuelve `output` como objeto, `cancelInvocation` produce `Canceled` y la señal de `execute` recibe `AbortError`, y un rechazo produce `Error` con `exception`. El navegador **no valida** la entrada contra `inputSchema` (`{x:"a",extra:1}` llega a `execute`), lo que confirma que la validación local de §5.3.1 es necesaria. **`WebMCP.toolsAdded` no incluye `title`** (ver B2).
5. **Compatibilidad F3.** Precedencia, decodificador, errores y headers de `src/lib/agent-api/runtime.ts`. `run_worker_first: ["/api/*"]` cubre `/api/agent/v1/tools/*` sin tocar el routing. `Permissions-Policy` F3 no restringe `tools`. No hay CSP. `ArdCompatibilityManifest.representativeQueries` tiene `maxItems:5`, así que 3+2 cabe. Los globs de CI (`npm test` = `tests/**/*.test.ts`; `node --test tests/agent-readiness/*.test.mjs`) recogen los nuevos tests. Ningún test F3 fija `/api/agent/v1/tools`. `f3-contracts.test.mjs` deriva `info.description` de la plantilla, de modo que el nuevo título y descripción no tocan aserciones fuera de §6.3. Admin no usa `BaseLayout`; el resto de páginas sí.
6. **Alcance.** No se adelanta F4B (MCP/card), F5 (DNS) ni F6 (auth). Las URLs de afiliado se excluyen de API y WebMCP. Coherente con `arquitectura.md` A05/A06 y con la exclusión F3 de «calculadoras invocables», que F4A sustituye explícitamente.

## Bloqueantes

### B1 — La alerta paliativa normativa contradice su propia regla de derivación y el HTML construido

- **Ubicación:** `fases/f4a-contratos.md` §1.2, bloque JSON de `palliativeAlert` y la frase «`item.text` es el `textContent` del `&lt;li&gt;` sin el texto de su `&lt;a&gt;`, con espacios colapsados y trim… un test obligatorio lo compara contra el HTML construido». Afecta a C4A-02 y C4A-04.
- **Problema:** el compilador de Astro (`compressHTML`) elimina el salto de línea y la indentación entre `&lt;/span&gt;` y el texto. HTML construido de la base, bytes literales: `&lt;span …&gt;⚠️&lt;/span&gt;Para la higiene: considera &lt;strong…&gt;pañales caninos&lt;/strong&gt;…`. Aplicando la regla del contrato salen `"⚠️Para la higiene: considera pañales caninos y empapadores absorbentes bajo su zona de descanso. Cámbialos con frecuencia para evitar dermatitis."`, `"⚠️Cambia su posición cada 4 horas si no puede moverse solo, para prevenir úlceras de decúbito."` y `"⚠️Evalúa si hay dolor controlado con nuestra"`, todas **sin espacio** tras ⚠️. El literal normativo trae `"⚠️ Para…"`, `"⚠️ Cambia…"` y `"⚠️ Evalúa…"`, que sólo coinciden con la proyección Markdown F2 (que inserta el espacio) y no con el HTML. El título (`"⚠️ Cuidado paliativo importante"`) sí coincide, porque ahí el espacio es literal en la fuente. Extracción: parse5 sobre `dist/client/herramientas/selector-movilidad-perros-mayores.html` de la base (`alert-check.mjs` sha256 `5b6b9485…6518`).
- **Por qué impide ejecutar:** el test obligatorio «dato compartido = HTML construido» falla con el literal normativo, y la paridad de `textContent` visible de C4A-04 tampoco puede coincidir con la API. Para seguir, el implementador tendría que elegir entre cambiar el literal, cambiar la regla de derivación o tocar el marcado (prohibido). La propia SDD declara que una contradicción así es STOP: «el ejecutor no elige».
- **Condición de resolución:** el contrato fija **un** valor coherente para los tres `item.text`, sea el literal sin espacio o una regla de derivación exacta que produzca el literal con espacio (por ejemplo, unir el texto del `&lt;span&gt;` y el resto con un espacio). Además dice explícitamente cómo C4A-04 compara la alerta con el DOM visible.

### B2 — C4A-08 exige que el cliente CDP reciba el `title`, y el dominio CDP `WebMCP` no lo expone

- **Ubicación:** `fases/f4a-herramientas-webmcp.md` §6.1 C4A-08 («cliente CDP `WebMCP` recibe exactamente las cuatro tools con nombre/título/descripción/schema/`readOnly`») y la descripción del harness en §6.2.
- **Problema:** el tipo `WebMCP.Tool` del propio sondeo archivado (`evidencia/f4a/referencias/sondeo/cdp-webmcp-domain.json`) sólo tiene `name`, `description`, `inputSchema`, `annotations{readOnly,untrustedContent,consequential,autosubmit}`, `frameId`, `backendNodeId` y `stackTrace`. **No tiene `title`.** Lo reproduje en Chrome for Testing 155.0.8059.39 + `WebMCPTesting`: `toolsAdded` llega sin `title`, mientras `document.modelContext.getTools()` en la página sí lo devuelve (`"Calculadora"`). El README de referencias atribuye la conservación del `title` a `probe2`, que lo leyó con `getTools()` en la página, no por CDP.
- **Por qué impide ejecutar:** el criterio de aceptación, tal como está escrito, es imposible de cumplir. El ejecutor tendría que inventar otro método de verificación (por ejemplo `Runtime.evaluate` de `getTools()`) o declarar FAIL/STOP de un gate obligatorio por una limitación del instrumento, no del producto.
- **Condición de resolución:** C4A-08 especifica cómo se verifica `title`. Por ejemplo: «`name`/`description`/`inputSchema`/`annotations.readOnly` vía `WebMCP.toolsAdded`; `title` vía `Runtime.evaluate` de `document.modelContext.getTools()` en el mismo frame». Lo mismo aplica, si procede, a P4A-02.

### B3 — Las salidas 200 de cálculo tienen campos sin valor ni forma definidos

- **Ubicación:** `fases/f4a-contratos.md` §2, tabla «Respuestas 200»; afecta a §3 (schemas/OpenAPI), a los fixtures del «oráculo independiente» (C4A-03) y a C4A-06/C4A-09.
- **Problema:** el archivo se declara exacto («Todos los nombres, campos, textos y órdenes de este archivo son exactos») y los schemas son cerrados, pero:
  - (a) `QualityOfLifeResult.input` = «siete enteros en el orden de §1.1» no dice si es un objeto `{hurt,…,moreGoodDays}` o un array de 7 enteros. `MobilityResult.input` sí se escribe como objeto `{level,handling}`.
  - (b) `breakdown[].criterion` no tiene valor definido: puede ser la key API (`hurt`), el `name` de UI (`Hurt (Dolor)`) o un índice.
  - (c) `MobilityResult.input` no dice si lleva los valores API (`severe`/`stressed`) o los códigos UI (`S`/`B`). La primera lectura es la natural, pero no está fijada.
- **Por qué impide ejecutar:** son campos públicos de un schema cerrado. El implementador y el autor del oráculo independiente pueden producir cuerpos distintos, ambos «conformes», y el auditor de implementación no tiene contra qué decidir. Exige inventar decisiones de contrato público.
- **Condición de resolución:** fijar la forma y el valor de `input` (ambas herramientas) y de `breakdown[].criterion`, idealmente con un cuerpo 200 completo de ejemplo por herramienta en el contrato.

## Observaciones no bloqueantes

1. **Prosa de OpenAPI no literal:** «la descripción menciona catálogo, búsqueda…» no fija el texto, y no recuerda que la plantilla debe seguir conteniendo la frase marcador `" Documento normativo de diseño; este archivo no prueba publicación."`, que `agent-api.mjs` exige y elimina. El generador falla de forma visible si falta; conviene decirlo.
2. **`inputSchema` de WebMCP en prosa (§5.2), pero C4A-08 pide «exactamente».** Faltan orden de propiedades, si se usan `minimum`/`maximum`, `description` por propiedad, etc. Es comparable semánticamente; conviene dar el JSON literal o aclarar que la comparación es semántica.
3. **«Content-Type es `application/json`» (§5.3.2):** la API responde `application/json; charset=utf-8`. Conviene decir «essence MIME `application/json`» para evitar una comparación exacta que rechazaría todo.
4. **Harness de C4A-04 sin ubicación ni driver definidos en F4A-1.** El harness CDP pertenece a F4A-2, no hay Playwright en `package.json` y package/lock son invariantes. Además, cualquier `tests/agent-readiness/f4a-*.test.*` entra en los globs de CI, que corren antes del build y sin navegador. Un lugar viable dentro del ownership es `evidencia/f4a/1/` con CDP nativo de Node 22, pero conviene nombrarlo.
5. **C4A-12 sin «atribuible»:** las páginas cargan scripts de anuncios de terceros que pueden escribir cookies o storage de forma asíncrona. Conviene fijar el criterio a escrituras atribuibles a `execute` (instrumentación con pila) o bloquear terceros durante la medición, para evitar falsos FAIL.
6. **Bundle en todas las páginas:** `src/scripts/agent-tools.ts` importa el módulo compartido, que según §4.1 contiene `RES` con URLs de afiliado. Esas URLs viajarían en el JS de todas las páginas (aunque no se expongan por API/WebMCP). Conviene separar las URLs del dato que importa WebMCP o confirmar que es aceptable.
7. **Duplicación de pasos CI:** los comandos nuevos de §6.2 ya los ejecutan `npm test` y `node --test tests/agent-readiness/*.test.mjs` por glob. No es incorrecto, sólo redundante.
8. **C4A-03 con 11⁷ ≈ 19,5 M combinaciones:** es factible si el oráculo compara puntaje y franja, y los cuerpos completos sólo en umbrales y fixtures. Conviene fijarlo para no disparar el tiempo de CI.
9. **`navigator.modelContext` y entrada string (≤154)** no proceden de la spec ni del doc de Chrome; proceden de la guía del evaluador y de fuentes secundarias, como la SDD ya reconoce. Son inocuos como compatibilidad defensiva.
10. **`docs/migracion-stack/README.md`** dice «fases 1 a 4 pendientes» mientras el producto ya usa Astro 7. Es ajeno a F4A, que no toca config, pero el coordinador debería saberlo antes de la promoción.

## Limitaciones

- No ejecuté la suite completa de CI de la base, ni workerd/`wrangler dev`, ni preview o producción. El build se hizo con `npm ci --ignore-scripts` y pasó.
- El sondeo de navegador fue local (`http://localhost`, Playwright global del entorno con `executablePath` a Chrome for Testing 155), no contra el sitio.
- Las fuentes primarias se leyeron el 2026-10-12. No verifiqué las afirmaciones de fuentes secundarias (fin del origin trial, input string en ≤154).
- `sdd.md`, `arquitectura.md` y la SDD/contratos F3 se revisaron en lo pertinente a F4A, no línea a línea en todo su contenido histórico.
- Los artefactos de esta auditoría (`probe-cdp.mjs`, `probe-cdp.out.txt`, `alert-check.mjs`, `web/*.html`, el clon de la base y el build) quedan en el scratchpad de esta sesión, fuera del repo.

## Dictamen

**FAIL** — 3 bloqueantes (B1, B2, B3). Los tres se resuelven con cambios documentales acotados en `f4a-contratos.md` §1.2/§2 y `f4a-herramientas-webmcp.md` §6.1, sin cambiar el diseño. La segunda y última revisión (R2/2) la haría esta misma sesión sobre el nuevo SHA/tree.
