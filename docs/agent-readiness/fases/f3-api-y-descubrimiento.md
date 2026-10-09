# SDD F3 — API pública de contenido y descubrimiento

Estado: **especificada, pendiente de auditoría independiente y ratificación técnica**. Fecha: 2026-10-09. Autor: coordinador arquitectónico, GPT-6.1 Sol/high. Este paquete es documental; no acredita endpoints publicados, no autoriza issues de implementación ni programación todavía.

Normativa de ejecución: este documento, [contratos F3](f3-contratos.md), [traspaso y partición](f3-traspaso.md) y [schemas/OpenAPI documentales](../evidencia/f3/contratos/README.md). [Decisiones y fuentes](../evidencia/f3/decisiones.md) justifican las elecciones. Si una regla de este paquete contradice otro documento F3, STOP de SDD; el ejecutor no elige entre ambos.

## 1. Problema y resultado observable

F2 ya permite leer el corpus editorial íntegro en Markdown y conservar canónicas, fuentes, avisos y fechas reales. Falta una interfaz pública para descubrir sus operaciones, encontrar una guía por texto y recuperar documento con metadata verificable. El catálogo del asistente V1 usa extractos de hasta 4000 caracteres y no es fuente adecuada para lectura ni búsqueda íntegra.

Después de F3 un cliente puede GET `/.well-known/api-catalog`, seguir OpenAPI, buscar `cushing`, seleccionar un `documentId` del resultado, leer su Markdown completo y citar la canónica y los enlaces originales. Una skill pública enseña ese recorrido. ARD anuncia esa skill y la API de lectura que realmente existen. La búsqueda es léxica y determinista; no ofrece respuestas veterinarias generadas, diagnóstico, ranking clínico ni inferencias de autoridad.

Los controles objetivo son API Catalog, Agent Skills y ARD. Sus passes requieren funcionamiento y evidencia; el escáner no sustituye las llamadas funcionales. No se promete subir de nivel: el **nivel general ya es 4**. Una previsión de 60/100 general sólo corresponde a tres nuevos passes sobre 15 controles puntuables, si selección y denominador siguen comparables.

## 2. Base y autoridad

| Concepto | Identidad/autoridad |
|---|---|
| Base documental fija | `67dacfec405935567f71b403cd80a56f5aebe952`, tree `d024a161e85b32c1cc783e1db9886c7ffa1e6d76` |
| Rama de esta SDD | `agent-ready/f3-sdd`; no cambiar main ni la rama durante autoría |
| Producto desplegado de F2 | `d2bd342050811d41ee212730cb11fe07783994bd` |
| Cierre F2 | [resultado y auditoría archivados](../evidencia/f2/b/bug71-native-baseline-auditoria/produccion-cierre/resultado.md): P01–P03 PASS, F2 aceptada/publicada, bugs70/71 cerrados, 86 contenido, 40 general, nivel 4 general |
| Fuente normativa de proyección | [F2 contratos](f2-contratos.md), [decisiones D06–D10](../evidencia/f2/decisiones.md) y sucesoras [F2B](f2b-contrato-sucesor.md), [integridad exterior](f2-produccion-integridad-exterior.md), [baseline nativo](f2-produccion-baseline-nativo.md) |
| Gobernanza | `AGENTS.md`, [método SDD](../sdd.md), [arquitectura](../arquitectura.md), [plan](../plan.md) |

F2 se consume como dependencia aceptada; esta autoría no repite sus pruebas, scans ni matrices remotas. El diff documental entre main y la base no demuestra igualdad de HTML/CSS de builds: Tailwind puede escanear documentación. Cada entrega futura congela **build real del SHA final**; nunca copia hashes de una preview histórica o reconstruye bytes faltantes para acreditar producción.

Después del PASS de SDD, el coordinador ratifica sobre un SHA documental completo y publica el paquete en su rama. Ese SHA final aún no existe al redactar; se registra en la ratificación y **se copia completo en el primer issue antes de abrirlo**. No es una elección del implementador. Las bases siguientes se fijan con los cierres completos de sus predecesoras. Una base no fijada impide lanzar el issue, sin suponer main ni inventar un SHA.

La ratificación técnica corresponde al coordinador: la sucesora F2B §7 «Desarrollo, auditorías y autorización» exige explícitamente PASS y ratificación del coordinador. La autorización de promoción a main corresponde al propietario y es un gate separado, pues despliega. No pedir otra autorización del propietario para convertir un PASS en ratificación técnica dentro del encargo de SDD.

## 3. Alcance y exclusiones

Se entregan tres operaciones públicas de contenido, índice léxico derivado de F2, OpenAPI 3.1.1, Linkset RFC 9727, discovery skills0.2.0, una skill de producto y dos fuentes ARD compatibles. No se modifica la edición editorial, la proyección Markdown F2 ni el schema `agent-content/1`.

Se preservan `search=yes`, `ai-input=yes`, `ai-train=no`, robots F1, canónicas sin slash final salvo `/`, redirects, sitemap editorial, avisos, fuentes y fechas. Se mantienen los contratos de `/api/assistant-catalog.json` y `/api/ask`; no se invocan para alimentar F3. No publicar `.agents/skills/`, datos del asistente, admin/contacto/feedback, secrets o información de formularios.

Quedan fuera auth/OAuth/auth.md, comercio, calculadoras invocables, WebMCP, MCP, A2A, DNS, asistente generativo, Vectorize/D1/KV nuevos, modelos, crawls remotos y cambio de stack. La metodología educativa de herramientas puede encontrarse y leerse porque pertenece a F2; esto no anuncia ejecución de cálculos. No se cambia infraestructura de tracking ni se amplían las excepciones de integridad exterior de F2.

## 4. Diseño cerrado

1. **Fuente única:** índice F2 y todos los Markdown validados del mismo build. Parsear Markdown como GFM, construir tokens y enlaces sin truncamiento. No volver a MDX/HTML para recuperar contenido ni usar extractos del asistente. Copiar metadata exactamente del índice, sin fechas de build, resúmenes nuevos o atribución clínica.
2. **Build:** mantener integraciones actuales en orden; añadir `agentApiIntegration()` de `scripts/agent-readiness/agent-api.mjs` **después de `projectionIntegration()`** en `astro.config.mjs`. Hook `astro:build:done`, root `config.build.client`, sin `postbuild`. Genera de forma determinista assets F3 y valida referencias contra el mismo root antes de empaquetar. Una falta/duplicación/límite/digest inválido falla build; no produce un manifest parcial.
3. **Runtime:** módulo nuevo `src/lib/agent-api/runtime.ts`, compuesto en `src/worker.ts` antes de `createAgentContentWorker(astroHandler)`. Sólo intercepta namespace `/api/agent/v1` y descendientes; lo demás delega intacto a F2. La regla existente `/api/*` ya ejecuta Worker primero; no sumar reglas por documento ni habilitar routing global. Descriptors/skills son assets, servidos mediante ASSETS y `_headers`; no endpoints Astro SSR ni middleware de caché para la API nueva.
4. **Datos en runtime:** reutilizar `loadAgentIndex`/`validateAgentIndex` F2 sin alterar su aceptación. Leer el índice léxico con ASSETS Request interno sin query, auth, cookies ni headers condicionales externos. Validar schema, corpus, orden/IDs/hashes y límites antes de usarlo; una promesa fallida se elimina para no perpetuar 503. Caché en memoria únicamente por binding ASSETS/build, sin Cache API ni caché exterior. No descargar corpus a un host externo. Lectura de documento usa su ruta validada del índice, comprueba bytes/hash de entidad y UTF-8 antes de formar JSON. No leer todos los Markdown en cada búsqueda.
5. **Registro común:** `src/agent-api/capabilities.json` fija las tres operationIds, paths/métodos, URL OpenAPI y skill nombre/descripción/URL/URN. El generador valida ese registro contra contratos y produce discovery desde él. `src/agent-api/schema.json` y `openapi.template.json` materializan los anexos normativos; docs no se leen como configuración del producto. No permitir capabilities adicionales o propuestas en el registro publicado.
6. **Dependencias:** elevar a devDependencies directas **las versiones ya presentes en lockfile**: `mdast-util-from-markdown` 2.0.3, `micromark-extension-gfm` 3.0.0, `mdast-util-gfm` 3.1.0 y `ajv` 8.20.0. Sólo se usan en generación/verificación offline; el Worker no importa parser ni Ajv. No hacer upgrade transitivo ni sumar framework/SDK de servicio. Ajv2020 valida los schemas documentados y el ARD archivado, sin fetch de `$ref` remotos. OpenAPI comparte el mismo schema; validación de estructura y correspondencia paths/operationIds/respuestas se comprueba offline, además de contratos funcionales.
7. **Descubrimiento posterior a generación:** expandir el Link F1 al conjunto exacto de §6 de contratos, tanto en `_headers`, middleware Astro y respuestas F2/errores como API F3. Preservar links ajenos y los cuatro headers de seguridad. Evolucionar checks F1 que exigían un único Link al nuevo conjunto; conservar snapshots y contratos históricos. Añadir sección de interfaces a llms sólo en hook F3, una vez existen destinos; no cambiar prefacio/listado editorial F1. No tocar HTML head: Link HTTP cubre ambos medios y evita una edición global de layout.

Los generadores escriben archivos nuevos con detección de colisiones y manifiesto propio. No editar dist para hacer pasar checks ni copiar `public/.well-known` de terceros. Rebuild limpio elimina outputs anteriores; check read-only detecta assets F3 huérfanos dentro de sus rutas reservadas.

## 5. Entregas, ownership y orden

Se implementa en tres issues **consecutivos**, descritos en [traspaso](f3-traspaso.md). No abrirlos hasta PASS+ratificación de esta SDD. El coordinador es propietario de integración y del paquete normativo; cada implementador Luna6/high y su auditor Sol/high son sesiones diferentes. El auditor de implementación es distinto del autor/corrector y de quien haga falta mantener independencia.

| Entrega | Propiedad exclusiva | Condición de inicio y frontera |
|---|---|---|
| F3A — Generación y contratos | `scripts/agent-readiness/agent-api.mjs`, `src/agent-api/**`, `src/agent-skills/buscar-leer-citar/SKILL.md`, fixtures/tests F3 de generación; acotado `astro.config.mjs`, package/lock, `.github/workflows/ci.yml` | Base SDD ratificada fija; produce assets y check offline. No anuncia Link/llms ni construye runtime público |
| F3B — API Worker | `src/lib/agent-api/**`, `src/worker.ts`, tests F3 de runtime y evidencia B | Base A aceptada exacta; usa A sin regenerar contratos o cambiar proyección. No altera routing/documental F2 ni API asistente |
| F3C — Integración de descubrimiento | `_headers`, `src/middleware.ts`, `src/lib/agent-content/runtime.ts` **sólo composición de Link**, evolución acotada `scripts/agent-readiness/discovery.mjs`, hook F3/checks/test headers, CI, evidencia C | Base B aceptada exacta; añade discovery a surfaces servidas y llms; aceptación de fase en preview exacta |

Evidencia autor/aceptación: `docs/agent-readiness/evidencia/f3/{a,b,c,publicacion}/`. Informes de auditores sólo por auditor bajo `.../auditoria/`. Ninguna sesión pisa evidencia anterior ni archivos simultáneamente. Si un archivo compartido exige otro cambio, bug de SDD/STOP, no extensión unilateral. `wrangler.jsonc`, tipos Worker, layout y estilos no necesitan cambios con este diseño; si un binding/tipo/config esencial nuevo aparece, STOP para resolver arquitectura. Leer spec de migración antes de los ajustes acotados de package/config, conservar stack/runtime F2 aceptado.

## 6. Aceptación y validación

Cada criterio tiene resultado PASS/FAIL y evidencia identificable; N/A sólo para condicionales nativos que la plataforma no ofrece, con motivo. Ningún criterio funcional queda N/A. Es inventario finito propio F3, no reinicio de pruebas F2 históricas.

| ID | Resultado exigido | Nivel/evidencia |
|---|---|---|
| C3-01 | SDD PASS en≤2 revisiones totales mismo auditor Sol/high, ratificación coordinador y base SHA/tree fija; ownership del diff | Documental antes de issues |
| C3-02 | Corpus query idéntico por IDs/orden/hashes a F2 del build; texto completo, metadata exacta, todas las referencias enlazadas presentes; sin corpus asistente | A offline, índices y oráculo independiente |
| C3-03 | Dos builds limpios del mismo SHA producen iguales bytes F3/llms; todos límites/collisions/ref checks fallan cerrado | A offline, manifiestos SHA256/bytes, sin timestamps |
| C3-04 | Schemas, registro, OpenAPI, Linkset RFC 9727 y skills0.2.0 válidos; ambos ARD comparten entries y validan `ArdManifest`; digest skill exacto | A/C offline, validación y fixtures positivos/negativos |
| C3-05 | API catalogue/paginación/kind, búsqueda normalizada exacta y ranking, lectura íntegra, corpus guard y todos errores del contrato | B unitario + workerd; fixtures independientes |
| C3-06 | Lectura de **todos** los IDs F2 devuelve Markdown byteexacto UTF-8 en JSON, hashes coincidentes y links reconstruidos; no lectura arbitraria | B workerd; C preview exacta, conjunto derivado de índice del build |
| C3-07 | Búsqueda pública de `cushing`, `artrosis` y consulta sólo presente después del carácter4000 en fixture; selección y normalización documentadas; sin match→total0 | B offline/workerd; C preview ejemplos del corpus real y fixture offline larga |
| C3-08 | GET/HEAD/OPTIONS, CORS/cabeceras/métodos/errores/límites exactos; ningún fetch externo, auth, cookie, prompt o trace reflejado | B workerd/C preview, request/status/headers/body sanitizados |
| C3-09 | Discovery nuevo resoluble sin redirects: catalogue→OpenAPI→search→read→canónica/Markdown, skill digest verificado→recorrido; ARD URLs reales | C preview exacta, todos destinos generados; canónica se comprueba sin reauditar semántica F2 |
| C3-10 | Invariantes F1/F2/assistant preservadas; checks actuales CI obligatorios y F3 nuevos pasan; docs→CSS/HTML del SHA final evaluados | B/C local+CI, diff y build real; fixture negociable representativa en workerd, no matriz histórica remota F2 |
| C3-11 | Auditorías independientes por issue ≤5 intentos, mismo auditor por issue; ratificación/aceptación y PR draft contra rama de integración fija | Entrega SHA/tree/logs/receipt, no merge automático |
| C3-12 | Publicación separada autorizada, identidad build y F3 HTTP público correctos; profiles content/all-ui comparables conservados, tres nuevos controles PASS | Producción sólo tras autorización, P3-01–03 de §7 |

Pruebas de riesgo mínimas: entradas query repetidas/desconocidas/mal codificadas, limites inclusivos y +1, Unicode/acentos/orden/repetición tokens, corpus erróneo, ID legal desconocido, `%2f`/URL externa/path traversal, método mutante, índice/documento ausente o corrupto, hash discordante, enlace con paréntesis/escape/GFM/referencia, FAQ/aviso/fuente a final de documento largo, payload invalid additionalProperties, descriptor huérfano, skill digest mutado. El parser/oráculo de pruebas no llama al generador para construir la expectativa completa: fixtures declaradas y bytes F2 originales son autoridad independiente.

CI conserva comandos existentes; añade `node --test tests/agent-readiness/f3-*.test.mjs`, `node --import tsx --test tests/agent-readiness/f3-runtime.test.ts` y tras build `node scripts/agent-readiness/agent-api.mjs check --build-dir dist`. `generate` sólo ocurre en hook; `check` es read-only. Invocación no válida→exit3, I/O/entorno→exit1, contrato/generación inválida→exit3, éxito→0. Conservar sync/check/tests/build/inventory/projection/routing/semántica F2/tipos/dry-run del CI. Eso comprueba que una nueva entrega no rompe dependencias; no reabre aceptación F2 ni repite sus scans.

Ejecución local de runtime usa workerd mediante Wrangler fijado, configuración **compilada del mismo build**; sólo bindings locales, sin remote bindings/mutaciones. Preview pública usa Version URL/commit preview del mismo SHA y recibo independiente; no desplegar para obtenerla por cuenta propia. Si no existe/acceso falla, falta de entorno esencial→bug y STOP de gate, no declaración de PASS sólo desde astro dev.

## 7. Evidencia, publicación y rollback

Entrega cada issue: PR draft contra base fija, SHA/tree, diff de ownership, comandos/exit codes, matriz criterios, manifest SHA256/bytes de assets F3+F2 usados, URL preview y recibo de commit/build, limitaciones y rollback. Sólo resultado auténtico; no escribir hashes de ejemplo como fixtures reales ni alterar `deploymentCommit=null` del evaluador. Corpus/hash técnico no es fecha editorial ni prueba de publisher clínico.

Guardar originales privados completos cuando contienen tracking, headers sensibles, configuración/binding IDs o JSON del evaluador. Proyección pública declarada, manifests y reporte de cobertura/digests enlazan el original sin reconstruirlo/dividirlo para publicación. Requests de search pueden contener información del usuario: usar sólo queries públicas prefijadas de prueba, no persistir telemetry nueva ni registrar cuerpos/query en logs de aplicación. Observabilidad de plataforma existente no se reconfigura en F3 ni se promete su eliminación.

Tras C aceptada, el coordinador propone promoción concreta y obtiene autorización específica antes de main. Admission congela SHA final real, CI, recibo build independiente, manifest de assets real incluyendo corpus F2/HTML/CSS relevante. Cambios concurrentes de main requieren revisar nueva base/diff y gates afectados; no incorporar silenciosamente.

- **P3-01:** build autorizado final y dominio real vinculados; API/descriptor/skill destinos GET/HEAD, CORS, errores y paginación/guard; lectura todos IDs contra bytes de ese build; recorrido búsqueda→lectura→cita y digest skill. No reutilizar hash de build anterior. HTTP fail/transporte/redirect inesperado→gate FAIL/STOP; guardar captura, no retry para borrar un fallo.
- **P3-02:** comprobar header discovery en home HTML/Markdown/HEAD y endpoint/API Catalog, policy F1 intacta, aislamiento/no-store API y canónica representativa, compatibilidad rutas nativas/asistente por pruebas de lectura sin efectos. Mantener excepciones exteriores F2 estrictas existentes; si body exterior impide verificar JSON/skill o añade otro contenido, bug/STOP, no ampliar allowlist. Son gates de regresión del cambio F3, no repetir los1284IDs históricos.
- **P3-03:** exactamente un scan content y uno all-ui con CLI/profiles/selección/fórmula congelados, comparar con F2 archivada. Guardar raw/request/metadata/summaries/manifests originales y controles/denominadores/neutralidad. Nuevos controles API Catalog/skills/ARD PASS, anteriores sin regresión; contenido puede seguir86 y nivel general4. Cambio de selección/denominador impide comparación de score; reportar dato real separado. Caída real/error del evaluador→STOP del cierre, sin fallback/retry ni continuar fase siguiente. Una negativa funcional del control→bug de contrato/entorno o corrección de código dentro de presupuesto según causa, nunca publicar resultado imaginario.

Antes de main, rollback es descartar/revertir entregas propias en rama preservando informes. Después de main, preparar PR de reversión coherente **C→B→A** sobre main publicado, revisar y pedir autorización de promoción del rollback; no ejecutar sin ella. Retirar juntos endpoints, descriptors, skill, query-index, nuevo Link/llms/CI específico y hook; restaurar discovery F1 y módulo F2 previos de una base real conocida, sin tocar Content Signals ni contratos del asistente. Build nuevo detecta references huérfanas; verificar desaparición de rutas F3 y conservación de lectura F2. No purgar/eliminar evidencia, hashes, bugs o historial.

## 8. STOP y presupuestos

Auditor de SDD: **otra sesión Sol/high**, mismo auditor máximo dos revisiones totales, sólo bloqueantes. Primera FAIL permite un ciclo de corrección documental; segunda FAIL→STOP y estudio con propietario, sin tercera revisión. Este autor no se autoaudita. PASS habilita ratificación coordinador; todavía no significa publicado/implementado.

Futuras implementaciones: **Luna6/high**, auditor independiente Sol/high distinto del autor/corrector, mismo auditor por issue, máximo cinco revisiones totales incluida primera. FAIL de código reparable permite corregir mientras quedan intentos; quinta FAIL→bug/STOP, sin sexta revisión, nuevos ajustes o reset de contador. Observaciones opcionales se registran sin abrir ciclos.

Hueco esencial normativo/base/dependencia/datos/entorno o cambio requerido fuera de ownership→`[SDD bug] F3: <bloqueo>` y STOP inmediato del trabajo dependiente. Trabajo independiente documental puede continuar con frontera explícita. Reporte incluye issue padre (o «SDD aún sin issue de implementación»), spec/base SHA completos, criterio afectado, esperado/observado, reproducción sanitizada, evidencias/digests, por qué impide avanzar, contador auditorías e impacto/propuesta al coordinador. Si GitHub inaccesible, guardar `evidencia/f3/bug-sdd-pendiente.md` con el mismo contenido y publicación pendiente. Un URI schema de skills opaco no resoluble no es un hueco normativo: el RFC primario define completamente sus campos; no afirmar haber descargado/validado ese schema remoto.

No quedan decisiones esenciales delegadas al implementador en esta propuesta. SHA ratificado/bases consecutivas y receipt preview son datos de admisión futuros, con quién/cómo/cuándo fijarlos definido; sin ellos no se lanza o acepta la entrega correspondiente.
