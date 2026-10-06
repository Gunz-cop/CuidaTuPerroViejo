# Auditoría independiente de SDD F1 — revisión 1/2

**Veredicto: FAIL. Un único bloqueante: B01.**

Fecha: 2026-10-05. Auditor: sesión independiente `auditoria_f0_implementacion`. Este informe evalúa la especificación antes de implementar F1; no certifica resultados de una implementación futura. La interrupción anterior no emitió veredicto ni consumió otra revisión. Queda una revisión adicional de SDD F1, 2/2. El cierre de implementación F0 permanece **PASS, revisión 3/5**, sin reabrir sus gates.

## Entrega auditada

| Identidad | Valor |
|---|---|
| Worktree de lectura | `/workspace/ctpv-f1-sdd` |
| SHA local fijo | `6246e412b3dc8607c78c26f6170a789f586202b8` |
| SHA publicado equivalente | `09c5950cc61e9bb518b63751ed95273eb8f77ada` |
| Árbol local y publicado, verificado con Git | `3b65c11197c8341d7cec78525f40e94d2aeddd81` |
| Base de producto/tooling F0 aceptada | `6c74dbc5a61decee96465b5b6ab2c10a2ddb094c` |
| Árbol de la base F0 | `505eff7447cd7f637cd0f700a5c07cfd9e7a35fc` |
| Documento principal | `docs/agent-readiness/fases/f1-politica-y-descubrimiento.md` |
| Cierre arquitectónico contrastado | `docs/agent-readiness/evidencia/f0/cierre-arquitectonico.md` |

Se leyeron `AGENTS.md`, README, arquitectura, plan, SDD general, fase F1 y cierre arquitectónico F0, y se contrastaron el inventario, configuración Astro, middleware, ruta geo, CI y código instalado pertinente. El diff de la entrega contiene siete archivos documentales; no cambia producto, tooling, dependencias ni lock. `git status --short` y `git diff --check` no produjeron incidencias. Los dos commits de entrega tienen el mismo árbol.

## Revisión del diseño

PASS en esta tabla significa que el contrato es coherente y ejecutable; no que su implementación haya pasado anticipadamente.

| Área | Resultado | Evidencia y conclusión |
|---|---|---|
| Cierre F0 y trazabilidad | PASS | D01–D05 conservan las decisiones y los límites ya auditados: ASSETS y Worker son caminos distintos; no se inventa un HIT de Cache API ni verificación CDN. El informe R3 se preserva y la base técnica aceptada es explícita. No se altera retrospectivamente la normativa F0 ni se atribuye el LIVE a un deployment no verificado. |
| Alcance, ownership y ejecutabilidad | PASS | Cambios permitidos y prohibidos, shared files, rama/base, responsable arquitecto, implementador Luna 6 alto y auditor separado quedan definidos. La especificación fija entradas, salidas, comandos, errores, límites y criterios suficientes para implementar sin nuevas decisiones de arquitectura. |
| Política y contenido discovery | PASS | Robots, Content-Signal, MIME, UTF-8/LF, tamaño, orden y texto del recurso son concretos. H1, description y canonical proceden del inventario construido. Faltantes fallan; no se inventan capacidades, revisión clínica, API ni negociación Markdown para el blog. |
| Metadata y serialización | PASS | Orden ASCII por canonicalPath, descripción normalizada no vacía, escaping de texto/labels y URLs canónicas seguras están especificados. No hay timestamp ni datos técnicos que introduzcan variación. Las fixtures y negativos exigidos cubren los riesgos relevantes. |
| Hook, sitemap y salida | PASS | `astro:config:done` y `astro:build:done`, integración después de sitemap y `fileURLToPath(config.build.client)` concuerdan con Astro 7.2.10, adapter 14.2.6 y sitemap 3.7.4 instalados. Los hooks build:done se esperan secuencialmente; el sitemap escribe antes de generar llms. Inventory scratch exclusivo, limpieza y escritura final tras validar evitan publicar inventarios privados o un recurso parcial. No revive postbuild/indexación. |
| Crecimiento del inventario | PASS | Se reemplaza el literal 28 por correspondencia exacta de IDs/rutas de home, pilares, catálogo, herramientas y editoriales; no basta una suma. Se conservan controles existentes, se rechazan duplicados/faltantes/no clasificados y el artículo adicional concordante produce 29. Discovery no se convierte en documento editorial. |
| Contrato de headers ASSETS/Worker | PASS | §4.3 exige Link en `_headers` y en `withSecurityHeaders`, conserva otros Link y cuatro headers de seguridad, y prohíbe cambiar caché, autenticación, body/status o routing. La separación de ambos caminos es correcta. |
| Acreditación de headers del middleware | **FAIL — B01** | I07 y el texto de preview eligen una ruta inexistente. En el stack instalado su 404 puede obtener todos los headers de ASSETS y retornar antes del middleware. Falta un caso obligatorio que ejecute una ruta dinámica real. |
| Preview local y ausencia de remotos | PASS | Copia del config compilado, paths absolutos al build real, retirada explícita de AI y otros bindings remotos, SESSION local, verificaciones, loopback, cierre de procesos y STOP ante bindings desconocidos son ejecutables. La excepción de preview remota es específica de F1 y conserva el gate público F2. Corregir B01 no requiere remoto ni una API con efectos. |
| CI y aceptación | PASS salvo B01 | Tests, build, negativos del hook, CLI de comprobación sin reescritura, tipos Worker, empaquetado y checks del último SHA remoto están definidos. No se exige obtener verdes de implementación para aprobar esta SDD. La cobertura de middleware debe corregirse antes de su implementación. |
| Implementación y promoción | PASS | PR draft y aceptación local/CI preceden a promoción autorizada. Medición pública posterior tiene perfiles, originales, límites y STOP explícitos; no exige subir score ni consumir scans ahora. Rollback y cadena de integración están separados de deploy. |

## B01 — I07 puede pasar sin ejecutar el middleware que debe añadir Link

**Contrato afectado:** fase F1 §4.3, líneas 99–103; I07, línea 146; preview, línea 171.

§4.3 exige añadir Link al middleware para las respuestas dinámicas además de `_headers`. I07 selecciona `/api/agent-readiness-f1-probe`, una ruta inexistente, para comprobar Worker y headers; el párrafo de preview afirma verificar también middleware. Esa elección no prueba la modificación obligatoria de `withSecurityHeaders`.

**Evidencia del stack y código real:**

1. Astro 7.2.10, `node_modules/astro/dist/core/routing/handler.js:42`: cuando no existe `routeData`, entra en el render de error; el camino normal que invoca middleware está más adelante.
2. `node_modules/astro/dist/core/errors/default-handler.js:36`: para la página de error prerenderizada llama `prerenderedErrorPageFetch`; devuelve la respuesta en la línea 56, antes de `handleMiddleware` en la línea 76.
3. Adapter Cloudflare 14.2.6, `node_modules/@astrojs/cloudflare/dist/utils/cf-helpers.js:18`: `createErrorPageFetch` utiliza `env.ASSETS.fetch`. El sitio tiene `src/pages/404.astro` estático. Los headers de la regla `/*` pueden llegar por ese fetch de ASSETS.
4. `src/middleware.ts:6–25` identifica precisamente la diferencia: `_headers` no se aplica a respuestas dinámicas del Worker; el envoltorio añade la seguridad. La rama `/api/` de una ruta real llama ese envoltorio sin ejecutar caché de edge, líneas 39–45.

Una implementación que agregue correctamente Link a `_headers` pero omita Link del middleware puede satisfacer el caso 404 elegido por I07. El defecto está en el gate de aceptación, no en que la ruta no entre al Worker.

**Reproducción independiente:** se llamó la función nativa `renderDefaultError` de la dependencia instalada, desde `/workspace/ctpv-f0-audit-r3`, con un manifest mínimo de `/404` prerenderizada y un callback de ASSETS que devuelve Link. No se configuró middleware. Resultado, exit0:

```json
{"status":404,"assetReads":1,"link":"<https://cuidatuperroviejo.com/llms.txt>; rel=\"describedby\"; type=\"text/plain\"","body":"404 from static ASSETS"}
```

Esta es una reproducción del camino de error nativo con manifest sintético; no se presenta como preview workerd, prueba de una implementación F1 ni resultado CDN. Es coherente con los retornos del código instalado y demuestra por qué observar 404 + Link no acredita middleware.

**Corrección mínima propuesta al arquitecto:** incorporar en I07 y en las instrucciones de preview una comprobación GET obligatoria de la ruta existente `/api/geo`, con header `cf-ipcountry: ES`. Exigir:

- status 200, Content-Type `application/json`, JSON `{"country":"ES"}`;
- `Cache-Control: private, max-age=3600` conservado;
- Link de descubrimiento exacto presente una sola vez y los cuatro headers de seguridad existentes.

`src/pages/api/geo.ts:3–29` declara `prerender=false`, exporta GET y calcula la respuesta únicamente a partir del request. No utiliza bindings, fetch, credenciales, escritura ni efectos externos. Sin el header, el caso local puede devolver `UNKNOWN` y no debe presumir geolocalización del edge. No se propone exigir HEAD para geo: la ruta exporta solo GET. Mantener la probe404, el 404 aleatorio y el legacy 301 como comprobaciones de regresión separadas; no usarlas como prueba del middleware. No hacen falta un endpoint nuevo, cambios de routing ni ownership adicional.

## Verificación y límites

Comandos de identidad y limpieza ejecutados:

```sh
git -C /workspace/ctpv-f1-sdd status --short
git -C /workspace/ctpv-f1-sdd rev-parse HEAD HEAD^{tree}
git -C /workspace/ctpv-f1-sdd rev-parse 6246e412b3dc8607c78c26f6170a789f586202b8^{tree} 09c5950cc61e9bb518b63751ed95273eb8f77ada^{tree}
git -C /workspace/ctpv-f1-sdd diff --check 6c74dbc5a61decee96465b5b6ab2c10a2ddb094c 6246e412b3dc8607c78c26f6170a789f586202b8
git -C /workspace/ctpv-f1-sdd diff --name-only 6c74dbc5a61decee96465b5b6ab2c10a2ddb094c 6246e412b3dc8607c78c26f6170a789f586202b8
```

Además se contrastó el código fuente y los hooks/caminos de respuesta de las versiones instaladas que fija el mismo lock de la base F0. La revisión de SDD no necesita repetir build, preview, scans ni toda la batería de implementación F0. No se realizó ninguna petición de scan, deploy, merge ni modificación de producto o del worktree auditado. Solo se escribe este informe fuera del worktree.

Lista de bloqueantes cerrada: **B01 solamente**. No se añaden recomendaciones opcionales como condiciones de PASS. La siguiente revisión debe comprobar su corrección documental y las posibles regresiones relacionadas, conservando el contador SDD F1 en 2/2 y F0 en PASS 3/5.
