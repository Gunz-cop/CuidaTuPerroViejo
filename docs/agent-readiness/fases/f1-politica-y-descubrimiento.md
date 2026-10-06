# F1 — Política y descubrimiento básico

**Estado: lista; SDD aprobada por auditoría independiente PASS 2/2, sin bloqueantes.** Revisión: 2026-10-05. [Informe final](../evidencia/f1/auditoria/auditoria-sdd-f1-r2.md) sobre local `0623dd23eaf422414262c4c7c738ea74b1e9a5e3`, publicado equivalente `173a6afcd817a4beac909dac0c7ee9e4033ae168`. El issue fija la base de arranque publicada que añade solo este estado y el informe preservado. Arquitecto/coordinador: sesión principal. Implementador: Luna 6, razonamiento alto; auditor: sesión distinta. El PASS de SDD y el SHA exacto de arranque se registran en el issue antes de empezar.

## 1. Problema y resultado

Hoy un agente puede leer HTML y sitemap, pero no descubre una descripción propia para agentes ni la preferencia de uso del contenido. F1 entrega robots con `search=yes, ai-input=yes, ai-train=no`, `/llms.txt` generado desde el inventario del build y Link HTTP a ese recurso real. El visitante sigue leyendo las mismas páginas; no se altera contenido editorial.

La implementación se acepta con tests/build/workerd/CI y auditoría independiente. **Publicada** exige promoción autorizada y verificaciones públicas posteriores. El resultado previsto 71 contenido/33 general/nivel 2 es una hipótesis; no es un criterio para fabricar un PASS ni un resultado obtenido.

## 2. Base, dependencias y autoridad

- Producto/tooling aceptado: `6c74dbc5a61decee96465b5b6ab2c10a2ddb094c`, tree `505eff7447cd7f637cd0f700a5c07cfd9e7a35fc`, PR #48. [Cierre F0](../evidencia/f0/cierre-arquitectonico.md), PASS 3/5.
- Base de arranque: SHA completo del commit publicado de **esta SDD auditada** que fija el issue. Ese commit debe descender del anterior y cambiar solo documentación de agent-readiness. No resolver un HEAD móvil ni usar la rama histórica de migración.
- Destino del PR: `docs/agent-readiness-f1`; trabajo: `agent-ready/f1-politica-descubrimiento`. PR draft apilado; sin merge/deploy automático.
- Leer AGENTS.md, README/arquitectura/plan/sdd del programa, esta spec, cierre F0, `docs/migracion-stack/README.md`, `docs/migracion-stack/postmortem-astro-4-a-7.md`, `docs/asistente-ia/FILE-OWNERSHIP.md` y skill oficial Wrangler suministrada por el coordinador. La migración está terminada según postmortem/código; no se ejecuta upgrade.
- D02/D05 del cierre concretan A02/A04. Este contrato sustituye el endpoint prerenderizado propuesto en el plan: el HTML y sitemap del mismo build solo están completos en el hook final. No hay dependencia circular.

## 3. Ownership y límites

La sesión de plataforma F1 tiene ownership temporal, exclusivo y secuencial de:

| Archivos | Cambio permitido |
|---|---|
| `public/robots.txt` | Una directiva Content-Signal dentro del grupo existente. |
| `public/_headers` | Link y MIME definidos abajo, conservando reglas actuales. |
| `src/middleware.ts` | Añadir descubrimiento HTTP a su envoltorio de headers; no modificar algoritmos de caché/rate limits. |
| `astro.config.mjs` | Importar la integración F1 y colocarla después de sitemap; ningún otro ajuste. |
| `scripts/agent-readiness/discovery.mjs` | Integración de build, serialización llms y comprobación determinista de artefacto. |
| `scripts/agent-readiness/inventory.mjs` | Evolución acotada de cardinalidad descrita en §5; mantener CLI/schema y demás validaciones. |
| `tests/agent-readiness/discovery.test.mjs`, `tests/agent-readiness/inventory.test.mjs`, `tests/agent-readiness/fixtures/f1/` | Regresiones/growth y fixtures de F1; no debilitar tests existentes. |
| `.github/workflows/ci.yml` | Un check offline del llms construido, después del build; preservar pasos anteriores. |
| `docs/agent-readiness/evidencia/f1/` | Informes, hashes, entrega, reproducción, diff de configuración local aislada y auditorías. |

El coordinador reserva los archivos compartidos para esta sesión. Assistant V2 y sesiones de migración no los editan simultáneamente. Configuración/ownership diferentes requieren coordinación y bug si impiden avanzar.

No modificar package/lock, source wrangler, tipos Worker, layout, rutas/páginas MDX, sitemap, redirecciones, lógica de herramientas, Assistant, SDI, puntuación/CLI scan/compare ni evidencia F0. No crear `src/pages/llms.txt.ts` ni `public/llms.txt`: el recurso es generado. No publicar Markdown completo, skills de mantenimiento, API/MCP/OAuth/ARD, llms-full ni DNS. No añadir dependencias.

## 4. Contratos públicos

### 4.1 robots

El archivo resultante es exactamente este texto UTF-8, LF y newline final:

```text
User-agent: *
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=no

Sitemap: https://cuidatuperroviejo.com/sitemap-index.xml
```

GET `/robots.txt` devuelve 200 `text/plain; charset=utf-8`; HEAD mismo status/headers, body vacío. No nuevos grupos de bots ni Disallow. La directiva declara preferencia del propietario, sin garantizar cumplimiento ajeno.

### 4.2 llms

GET `/llms.txt` devuelve 200 `text/plain; charset=utf-8`; HEAD mismos headers/status y body vacío. Sin auth, query no selecciona contenido, no redirects para esta ruta. Texto español, UTF-8 sin BOM, LF/newline final, máximo 64 KiB; superar límite falla build, nunca truncar.

Formato determinista y orden de secciones:

```text
# Cuida a tu Perro Viejo

> <descripción de la home construida>

Guías y herramientas para cuidar a perros senior. La información del sitio no sustituye la evaluación veterinaria.

## Guías por tema

- [<H1 del pilar>](<canonical absoluto>): <meta description del pilar>

## Herramientas

- [<H1 de la herramienta>](<canonical absoluto>): <meta description>

## Sobre el sitio y sus criterios editoriales

- [<H1 de la página editorial>](<canonical absoluto>): <meta description>

## Uso del contenido

Búsqueda: permitida. Uso como contexto de IA: permitido. Entrenamiento de modelos: no permitido.
- [Política para agentes](https://cuidatuperroviejo.com/robots.txt)
- [Sitemap](https://cuidatuperroviejo.com/sitemap-index.xml)
```

Cada sección genera todas las entradas `disposition=document` del tipo pillar/tool/editorial respectivamente; orden ASCII ascendente por canonicalPath. En esta base son 7/2/2. La home aporta la descripción, no otra lista. No listar individualmente todos los artículos ni páginas discovery-only. Las guías enlazan a HTML actual; el contenido no afirma API, negociación Markdown o revisión clínica. La frase veterinaria es una limitación general, no atribución profesional.

Usar H1/description/canonical del inventario real, no frontmatter duplicado, títulos manuales ni extractos Assistant. Description de cada entrada elegida y home debe ser string no vacía tras normalizar whitespace; si falta, build falla y se reporta, no se inventa. En texto/labels escapar backslash y caracteres Markdown `[]()*_\x60<>`; description es texto inline, no HTML ni nuevas líneas. URLs canónicas seguras del inventario sin query/fragment. Serializador puro sin timestamp, sourceCommit ni fecha de build en llms: mismo input genera mismos bytes.

### 4.3 Link, MIME y headers existentes

Valor de descubrimiento exacto:

```text
Link: <https://cuidatuperroviejo.com/llms.txt>; rel="describedby"; type="text/plain"
```

Añadirlo a regla estática `/*` de `_headers` y al envoltorio `withSecurityHeaders` del middleware, para mantener coherencia en respuestas que sí ejecutan Worker. Si ya hay otros valores Link en una respuesta Worker, conservarlos y añadir este una sola vez; no reemplazarlos. No anunciar `api-catalog` ni `service-desc` aún. El destino usa siempre el dominio canónico, también en preview.

Añadir reglas específicas `/robots.txt` y `/llms.txt` con `Content-Type: text/plain; charset=utf-8`. Conservar sin cambio los cuatro headers de seguridad de `/*`, immutable de `/_astro/*` y caché de `/images/*`. No cambiar Cache-Control, Vary, ETag, autenticación ni body/status. F1 no negocia `Accept: text/markdown`; home continúa HTML. El Link visible en admin/API no expone datos de esos recursos: solo enlaza la descripción pública del sitio.

GET/HEAD de assets se verifican en workerd. No añadir un endpoint o worker wrapper para simular MIME o headers. Si el adaptador no conserva estas reglas, es un bloqueo de SDD con reproducción, no permiso para modificar routing.

## 5. Generación y crecimiento del inventario

### 5.1 Cardinalidad derivada

Reemplazar únicamente el gate literal `documentCount !== 28` del inventario por comprobación de correspondencia exacta de IDs y rutas esperados:

- home: una `/` con ID home;
- pilares: todos los slugs `.md/.mdx` obtenidos del directorio ya leído `src/content/pilares`, con canonical `/<slug>` e ID `pillar--<slug>`; conservar comprobación de presencia de los siete pilares base;
- artículos: todas las filas del catálogo construido, con su href/slug e ID `article--<slug>`;
- herramientas y editoriales: las dos entradas de cada mapa actual, cada una presente exactamente una vez.

Un set no puede ocultar duplicados: conservar checks actuales de slug/href, canonical, clasificación y añadir detección de documentId repetido entre páginas. Toda entrada esperada tiene exactamente un HTML concordante; entradas inesperadas o faltantes invalidan. La cardinalidad derivada es `1 + pilares + filas catálogo + 2 + 2`, no una comparación aislada con esa suma. Las páginas desconocidas siguen invalidando. No cambiar discovery-only/excluded ni justificaciones de sitemap. CLI inventory, schema `agent-content-inventory/1`, hashes/Git y exit codes permanecen. El inventario base sigue teniendo 28 documentos; añadir una fila artículo con HTML/sitemap concordantes permite 29 sin editar código. Borrar HTML de un documento esperado, duplicar IDs o agregar ruta no clasificada falla.

### 5.2 Integración real

`discovery.mjs` exporta una integración Astro con hook `astro:config:done` para retener config y `astro:build:done` para generar. Incorporarla como último elemento de integrations, inmediatamente después de sitemap. El hook usa `fileURLToPath(config.build.client)` como asset root y llama al inventario ya existente sobre ese root. No asumir `dist` plano ni generar antes de sitemap.

Para no mezclar evidencia con assets: crear un directorio scratch con `mkdtemp` bajo tmpdir y un hijo nuevo `inventory`; llamar `inventory(assetRoot, scratch/inventory)`, leer su inventory.json y exigir exit0/state valid/errors[]. Limpiar scratch en finally incluso ante error. No modificar flags/API del comando ni hacer writes públicos de inventory/manifest. La ruta de assets continúa dentro del checkout como exige el inventario.

Construir llms en memoria, validar tamaño y URLs, escribir `llms.txt` en el asset root **solo tras todas las validaciones**. Escritura exclusiva: si el build ya trae el recurso por otra fuente, fallar en vez de sobrescribirlo. Un nuevo build Astro limpia sus assets normalmente. Al fallar, el hook lanza error y el build sale no cero; no capturar error como warning ni devolver build exitoso. El recurso queda dentro del directorio ASSETS de la configuración compilada, antes de dry-run/deploy. Sin red/fetch/modelos/credenciales/indexación.

Comprobación CLI interna del nuevo módulo, sin ampliar CLI F0:

```sh
node scripts/agent-readiness/discovery.mjs check --build-dir dist
```

Aceptar exactamente subcomando check y flag --build-dir con un valor no vacío, rechazando flags repetidos/desconocidos. Resolver asset root mediante inventario en scratch; regenerar bytes esperados en memoria y comparar byte por byte con llms del build, robots y reglas fuente de headers. Exit0 válido, exit1 I/O, exit3 inputs/contrato inválido; no modificar assets. CI añade este comando después del build. Tests offline anteriores ya incluyen discovery.test.mjs por glob; no otro script npm ni hook postbuild.

## 6. Validación y criterios de implementación

Cada criterio I01–I09 debe quedar PASS para aceptar implementación; P01–P03 permanecen **pendientes de promoción**, nunca simulados como PASS. El auditor de implementación no bloquea por esa espera deliberada, pero comprueba que no se declara publicada la fase.

| ID | Criterio y evidencia obligatoria |
|---|---|
| I01 | Base auditada fija y diff dentro de ownership, shared files reservados, lock/stack/runtime bindings sin cambio. Git limpio en entrega. |
| I02 | Tests unitarios de serialización con fixtures deterministas: orden, escaping, español/URLs, faltantes, tamaño y mismo input/mismos bytes. Política y Link reales sin capacidades futuras. |
| I03 | Inventory base 34 HTML/28 documentos valid. Growth fixture con artículo+catálogo+sitemap permite 29; faltan home/pilar/herramienta/editorial/artículo, duplicate ID/canonical y unclassified fallan. Tests F0 no debilitados. |
| I04 | `npx --no-install astro build` positivo produce llms dentro del ASSETS real; hash/bytes, archivo robots y sitemap presentes. Log demuestra generación después de sitemap. Dos builds limpios del mismo source generan bytes llms idénticos. Sin fecha técnica en contenido ni indexación. |
| I05 | Negativo de hook en fixture independiente del producto: asset root sin sitemap o documento requerido hace rechazar hook/build (exit no cero), no escribe llms y limpia scratch. Ejercitar el hook real con fixture; no flag de producción para saltar/forzar generación. Capturar salida y fuente exacta. |
| I06 | Check CLI válido exit0; llms alterado o ausente y flags inválidos fallan; check no reescribe assets. Paso CI exacto presente. |
| I07 | Preview local workerd del bundle real: home HTML GET/HEAD, robots/llms GET/HEAD con MIME/body correctos, Link y seguridad; llms idéntico al asset, destinos de sus 11 entradas GET200 en preview equivalente, sitemap200. Para ejercitar middleware dinámico, GET `/api/geo` con `cf-ipcountry: ES` devuelve200, JSON `{"country":"ES"}`, MIME application/json, Cache-Control `private, max-age=3600`, Link y los cuatro headers de seguridad actuales. Endpoint existente con prerender=false, lectura pura sin bindings/fetch/efectos; no exigir HEAD de geo ni modificarlo. `/api/agent-readiness-f1-probe` inexistente mantiene404 con Link/seguridad como regresión separada: puede resolverse por ASSETS y no acredita middleware. Legacy 301 y 404 aleatorio preservados respecto a base. |
| I08 | `astro check`, tests del repo y agent-readiness, build, inventory/check, tipos Worker sin diff y empaquetado dry-run pasan sobre entrega. CI y Workers Builds success en último SHA remoto, sin atribuir resultados a SHA diferente. |
| I09 | PR draft, SHA/tree/base/diff, entrega con tabla de criterios, reproducción, rollback y límites; auditoría independiente PASS dentro de 5 revisiones, sin scans no autorizados ni claims de producción/CDN. |

Instalar `npm ci` con lock; compilación explícita. Secuencia ordinaria:

```sh
npx --no-install astro sync
npx --no-install astro check
npm test
node --test tests/agent-readiness/*.test.mjs
npx --no-install astro build
node scripts/agent-readiness/index.mjs inventory --build-dir dist --out-dir /tmp/ctpv-f1-inventory-UNIQUE
node scripts/agent-readiness/discovery.mjs check --build-dir dist
npx --no-install wrangler types --env-file wrangler-types.env --strict-vars=false
git diff --exit-code -- worker-configuration.d.ts
npx --no-install wrangler deploy --dry-run --config dist/server/wrangler.json --outdir /tmp/ctpv-f1-package-UNIQUE
```

UNIQUE se sustituye por un identificador nuevo; no sobrescribir evidencia. La ruta compilada se comprueba tras build; si cambia, registrar la ruta efectiva generada, no pasar source config con entrypoints virtuales sin compilar. Conservar el empaquetado CI existente que resuelve la configuración generada automáticamente.

### Preview aislada y límites

Para workerd local, copiar la configuración **compilada** a scratch y mantener sus paths main/assets como absolutos hacia el build real. Retirar AI, send_email, D1, ratelimits y todos los KV excepto SESSION; para SESSION quitar id/preview_id/remote y dejar binding local. Conservar compatibility_date/flags, assets y routing sin cambio. Desactivar observability solo en esta copia local. Verificar que no quedan remote:true, servicios/remotos, rutas de deploy ni recursos externos; registrar diff/hash/versión Wrangler. AI es siempre remoto incluso con --local, por eso se elimina. No editar wrangler fuente ni reemplazar el handler. Si el config efectivo contiene un tipo no previsto de binding remoto, detenerse y elevar bug.

Ejecutar `wrangler dev --local --config <copia> --port <puerto libre>`, con URL loopback, contra los assets reales. No usar --remote, auth ni operaciones del asistente/contacto/admin. GET `/api/geo` es la lectura dinámica pura obligatoria de I07 y acredita el envoltorio de headers Worker; probar solo assets o la probe404 no satisface ese criterio. El handler/404 prerenderizado pueden devolver ASSETS antes de middleware. Cerrar procesos propios al terminar. Permisos mínimos de red/IPC del entorno no son cambios de producto. Esta preview verifica ASSETS/workerd/middleware, no CDN ni acceso de bots externos. No se requiere desplegar una preview remota para aceptar F1: no cambia negociación/caché. Esta precisión aplica a F1 y no elimina el gate de preview pública de F2.

## 7. Promoción y medición pública

| ID | Gate posterior a aprobación de promoción |
|---|---|
| P01 | Cadena de PR integrada en orden, CI/build de despliegue identificado; registrar deployment SHA solo si verificable. GET/HEAD públicos de home, robots, llms/sitemap y destinos Link; bytes/headers coherentes con build promovido. Reglas reales del edge no ocultan la política. |
| P02 | Solo después de P01, una solicitud scan content y una all-ui con perfiles F0 explícitos, sin retries: `node --use-env-proxy scripts/agent-readiness/index.mjs scan --url https://cuidatuperroviejo.com --profile <perfil> --out-dir <nuevo-dir>`. Guardar metadata/raw/summary/manifests y comparar con LIVE F0 mediante CLI compare. Los tres passes originales se conservan; Content Signals y Link pasan. llms funciona por HTTP aunque no sea control separado. |
| P03 | Reportar selección, neutrales, denominador, puntuación y nivel por separado. Si universo/regla cambia, no calcular delta y elevar al coordinador. Si evaluator falla realmente, STOP global y evidencia incompleta; no continuar fases offline ni reintentar para conseguir score. |

No ejecutar scans ahora contra producción sin F1 promovida. SourceCommit de medición es checkout limpio de tooling usado; deploymentCommit separado y solo si está verificado, nunca inferido por timestamp o SHA de rama. El coordinador organiza promoción conforme al plan, después de resultados concretos y auditados. Una espera de promoción explícita no es bug de SDD ni autoriza al programador a desplegar.

## 8. Entrega, auditorías, rollback y bloqueos

El implementador entrega `docs/agent-readiness/evidencia/f1/entrega.md`, pruebas/hashes/logs sanitizados con sourceCommit verdadero y dirtySource, criterios I/P separados y configuración local aislada; no guardar secrets ni dumps de env. No incluir node_modules, bundles enteros o tipos SDK gigantes. Congelar commit antes de auditar, abrir PR draft y verificar árbol publicado contra local si la publicación usa API.

Cada issue implementador lanza un auditor independiente. Máximo cinco revisiones totales, contando la primera. Corregir únicamente bloqueantes reparables de código entre intentos; PASS permite cerrar implementación, no promoción. FAIL5: bug SDD enlazado y STOP sin sexta revisión ni más ajustes. Ante falta de contrato/base/ownership/entorno, bug inmediato y STOP, con reproducción y criterio afectado; no inventar ni modificar esta spec. Si GitHub falla guardar bug-sdd-pendiente.md y comunicar bloqueo. La aprobación de esta SDD se audita separadamente: revisión inicial y, si hay bloqueantes, una única revisión tras corrección del arquitecto; un segundo FAIL detiene la especificación para revisión con el propietario.

Rollback de implementación: revertir los commits F1 en orden inverso en rama, conservando evidencia histórica. La retirada de descubrimiento restaura middleware/_headers y elimina integración/generador/check CI juntos. La política de robots se entrega en commit separado: si se revierte solo descubrimiento, se conserva la preferencia aprobada; si hay fallo de robots, corregir sintaxis manteniendo esa preferencia. El gate de crecimiento puede revertirse junto con su integración/tests coherentes. Promoción y rollback en main requieren autorización propia porque despliegan; no usar resets/force push ni editar assets a mano después del build.

## 9. Referencias técnicas verificadas

Leídas por el coordinador el 2026-10-05; HTTP200 y digest igual al índice de skills del evaluador. Son referencias de requisitos, no autorización para ejecutar sus ejemplos de scan.

| Referencia | SHA-256 |
|---|---|
| [Content Signals](https://isitagentready.com/.well-known/agent-skills/content-signals/SKILL.md) | `810108b0171c9c16ead091d5d7e9b5d0c72086b5dc6ef2b4e84fece01d72a91e` |
| [Link headers](https://isitagentready.com/.well-known/agent-skills/link-headers/SKILL.md) | `90e89e75a88634a1f009813095fe5cf89d771c483dec3da074a108a998493d92` |
| [llms.txt](https://isitagentready.com/.well-known/agent-skills/llms-txt/SKILL.md) | `8f2bf0bce629d57d82d81076742e2f94d2b2942aa0b9a844ca69ed054abdd8a6` |

RFC 8288 respalda describedby. Astro instalado ejecuta hooks build:done en orden de integrations (`astro/dist/integrations/hooks.js`); la prueba local de F1 confirma que sitemap existe antes de generar. Wrangler instalado y skill oficial son la autoridad de comandos/config, sin upgrades incidentales.
