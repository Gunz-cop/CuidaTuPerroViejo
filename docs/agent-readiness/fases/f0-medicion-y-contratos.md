# F0 — Medición reproducible y contratos de entrega

**Estado: especificada; pendiente de auditoría de bloqueantes y publicación fijada por SHA en el issue.** Revisión: 2026-10-04.
El issue de lanzamiento registra el veredicto, la versión auditada y su base exacta; solo entonces puede empezar la implementación.
Responsable de arquitectura y aceptación: coordinador del programa.
Implementador y verificador: sesiones distintas; todavía no asignadas.

## 1. Resultado de la fase

Antes: hay tres mediciones guardadas y una arquitectura propuesta, pero ningún comando reproduce la puntuación, inventaría el build o demuestra cómo interceptar páginas estáticas sin mezclar HTML y Markdown.

Después: una sesión puede reproducir **43/20/19**, detectar una comparación de perfiles inválida, inventariar el contenido público desde un build y repetir una prueba mínima de routing/build/caché. El coordinador recibe cinco decisiones respaldadas por evidencia para concretar F1/F2.

F0 **no aumenta la puntuación** ni publica Markdown, API, skills, MCP, DNS o Content Signals. Implementa tooling y prueba la viabilidad técnica en un entorno aislado. El plan aceptado por el propietario sigue siendo [plan.md](../plan.md); los contratos de esta SDD están en [f0-contratos.md](f0-contratos.md).

## 2. Base y ramas

| Dato | Valor |
|---|---|
| Base de producto | `cdb0adece5d629f6b2473be7ea6e30c0b372ef1c` |
| Commit del plan | `493f82e93cdfca3ea804dcea656ad8bdd2151212` |
| Rama documental | `docs/agent-readiness-plan`, PR #42 |
| Rama implementadora | `agent-ready/f0-medicion` |
| Rama/worktree del spike | `agent-ready/f0-spike` desde la base de arranque de F0 |
| Destino inicial del PR F0 | `docs/agent-readiness-plan`, mientras #42 no esté fusionado |

La **base de arranque** es el SHA completo publicado y auditado que el coordinador fija en el issue de lanzamiento. Traer ese commit exacto, no resolver el último HEAD de una rama móvil. El issue debe enlazar el informe PASS y los documentos normativos de ese SHA. Sin esos datos, detenerse y registrar un bug de SDD.

Desde la base de producto solo se permiten documentación en `docs/agent-readiness/` y la corrección H1 autorizada por el propietario: en `src/pages/herramientas/selector-movilidad-perros-mayores.astro`, cambiar únicamente la apertura/cierre del primer título editorial de `h2` a `h1`. SHA-256 del archivo corregido: `8c11028f8a8afc50fce0a7df19b0236421eb68191d5e16eedeedc29d05c0767a`. Comparar el diff y ese hash al preparar F0. La corrección pertenece al coordinador y ya debe estar incluida en la base publicada; F0 no puede modificar la página. Cualquier otro cambio de producto bloquea la preparación.

No usar la rama histórica de migración. Si #42 se fusiona antes de empezar, el coordinador fija la base de arranque y destino nuevos conservando esta base de producto como comparación; el ejecutor no resuelve esa transición por su cuenta. El PR no se fusiona automáticamente: `main` publica producción.

## 3. Lecturas obligatorias y decisiones aplicables

Leer `AGENTS.md`, [arquitectura](../arquitectura.md), [diagnóstico](../diagnostico.md), [método SDD](../sdd.md), `docs/migracion-stack/README.md` y su postmortem, y `docs/asistente-ia/FILE-OWNERSHIP.md` antes de tocar archivos compartidos.

La migración terminó según el postmortem y el código actual. No se ejecuta una actualización de stack. A01–A06 siguen vigentes: Astro/adaptador, proyección única, negociación antes de assets, descubrimiento de capacidades reales, consultas deterministas y adaptadores compartidos.

La política confirmada es `search=yes, ai-input=yes, ai-train=no`; se implementará en F1, no en F0.

## 4. Ownership: diff permanente y spike

### Archivos que puede entregar el PR F0

| Archivo o ruta | Cambio permitido |
|---|---|
| `scripts/agent-readiness/*.mjs` | CLI, scoring, comparación, inventario y helpers de tooling |
| `tests/agent-readiness/*.test.mjs` | Pruebas Node de los contratos de esta fase |
| `tests/agent-readiness/fixtures/**` | Fixtures sintéticos y HTML público seleccionado |
| `docs/agent-readiness/evidencia/f0/**` | Reportes, manifest de evidencia, inventario y spike reproducible |
| `package.json`, `package-lock.json` | Solo añadir devDependencies directas `parse5@7.3.0` y `fast-xml-parser@5.11.0`; sin otros cambios de dependencias/scripts/engines |
| `.github/workflows/ci.yml` | Añadir test offline del harness y auditoría de inventario tras build; conservar los pasos existentes |

Los dos parsers ya están en el lockfile como dependencias transitivas. Declararlos directamente evita depender del hoisting de Astro. No introducir una librería DOM distinta, framework de pruebas ni dependencia de producción.

Esta fase concede ownership temporal de esos tres archivos compartidos al implementador de F0, en serie y sin otra sesión editándolos. Si están ocupados, terminar primero el trabajo local en la rama y entregar el parche de integración, sin sobrescribir otro trabajo. La lista es una autorización acotada del plan, no ownership de todo el stack.

### Archivos que solo puede modificar el spike aislado

`src/worker.ts`, `src/middleware.ts`, `astro.config.mjs`, `wrangler.jsonc`, una integración local de build y assets de muestra dentro de `public/agent-content/v1/`. No se fusionan al PR permanente como código del sitio. Se entregan como `spike.patch` más comandos de reproducción.

No modificar componentes, contenido MDX, contratos Assistant V2, endpoints existentes, estilos, redirects, SDI ni indexación. El verificador comprueba ambos diffs: permanente y exploratorio.

## 5. Implementación permanente

### T0.1 — Harness de puntuación

Crear un CLI Node ESM con entrada única `scripts/agent-readiness/index.mjs`. Contratos y flags exactos en el documento adjunto. Usar `node:test`, `node:assert/strict`, `node:crypto`, `node:fs` y fetch de Node. No shellar a un servicio para el replay offline.

El replay usa las respuestas originales de `../evidencia/` y reproduce 43 Content Site, 20 All Checks de la UI y 19 API sin opciones. La salida identifica perfil/controles/fórmula y conserva neutros; distingue el commit de código inspeccionado del commit del despliegue, que queda `null` sin prueba.

La comparación bloquea deltas cuando cambien perfil, IDs, universo de controles, categorías, isCommerce o estado de datos. No transforma un timeout ni un control desconocido en neutral. Conserva resultados originales de `nextLevel` sin inferir niveles futuros.

### T0.2 — Medición live explícita

Implementar `scan` con los dos perfiles congelados y las solicitudes del contrato. Una llamada por perfil, sin reintento automático; timeout 60 s, respuesta máxima 2 MiB, sin seguir redirects del endpoint del escáner. Guardar bytes recibidos antes de parsearlos y escribir estado incompleto si falla transporte/schema. No sobrescribir un directorio existente.

Se autorizan dos solicitudes al evaluador sobre el sitio publicado para obtener evidencia fresca. No llamar `/api/ask`, formularios o APIs de escritura del sitio. No se necesitan credenciales Cloudflare. No es un paso de CI: CI se queda offline.

### T0.3 — Inventario del build

Tras `npm ci` y `npx --no-install astro build`, descubrir el directorio de assets **real**, validar que contiene home, sitemap y catálogo estático, e inventariar HTML. No codificar `dist/client` o `dist` por suposición; la salida registra la ubicación relativa resuelta.

Parsear HTML con parse5 y sitemap con fast-xml-parser (sin resolución de entidades externas). El HTML renderizado, su canonical, h1 y descripción son la autoridad para el inventario de páginas. No extraer JSX de MDX con regex. Clasificar todas las páginas y cotejar el conjunto de documentos con el catálogo publicado del build, el sitemap y los slugs editoriales; registrar cualquier diferencia.

La [política de proyección](f0-contratos.md#política-de-proyección) es exhaustiva para la base actual. Una página inesperada, un canonical duplicado, un artículo presente en HTML y ausente del catálogo o un path inseguro produce un error con explicación. No arreglar la generación de páginas en F0. Un descubrimiento de contenido no publicable bloquea su inclusión y se informa al coordinador.

### T0.4 — Fixtures de paridad editorial

Guardar HTML construido de siete rutas: home, pilar salud, pilar herramientas, Cushing, incontinencia fecal, calculadora y selector de movilidad. La última comprueba el H1 corregido; un fixture sintético adicional sin H1 debe producir `DOCUMENT_TITLE_MISSING` y nunca sustituirlo por el title del head. Incluir origen de archivo, SHA del source, hash de HTML y manifest con títulos, textos de aviso, FAQ completas y URLs de fuentes que deben sobrevivir. Estos fixtures están dentro de tests/docs y no se sirven desde `public/`.

Los assertions se obtienen del DOM **renderizado** y se revisan contra contenido visible; no de la conversión candidata. Las FAQs pueden estar en `details` cerrado y sus respuestas contienen HTML. No eliminar esos descendientes. `AlertBox` usa `aside`, igual que algunos elementos de navegación: **prohibido eliminar todos los aside**. El manifest distingue el TOC y los avisos.

El fixture de artículo debe preservar los textos de «Señales de Alarma Médica Inmediata», «Seguridad de Medicación y Riesgo de Crisis Addisoniana» y la sección de fuentes. El de incontinencia debe preservar «Señales de alarma» y «Seguridad de manejo y medicación». No cambiar esos contenidos ni evaluar su validez clínica en esta fase.

## 6. Spike reproducible: prueba, no implementación de F2

Trabajar en otro worktree sin credenciales, sin bindings remotos y sin deploy. El parche debe aplicar sobre la base de arranque, antes de cambios del harness; instalar solo las dependencias de ese lockfile. Si necesita helpers, incluirlos en el parche dentro de la lista exploratoria y declararlos en su manifest.

### P1 — Entrada del Worker y delegación

Usar el mecanismo vigente de `@astrojs/cloudflare/handler`, confirmado mediante tipos/código instalado y documentación primaria. Declarar el entrypoint de prueba en Wrangler, conservando el adaptador. No utilizar `workerEntryPoint` del adaptador antiguo ni importar una API por un ejemplo de otra major.

Habilitar Worker-first solo para `/`, `/salud-perros-mayores/sindrome-cushing-perros-mayores`, `/api/*` y `/admin/*`. La prueba añade un header de diagnóstico exclusivamente local que demuestre qué camino se ejecutó. HTML sigue delegando a assets/handler; solicitudes a `/api/assistant-catalog.json` siguen respondiendo el catálogo. La caché de middleware preexistente no puede recibir una representación equivocada.

Añadir dos assets Markdown deterministas de muestra, generados desde texto ya publicado, en las rutas explícitas congeladas por el contrato. No son una conversión completa del corpus. `Accept` sigue la matriz fijada. Probar en workerd mediante preview local y guardar configuración efectiva, versiones y logs sin secretos.

### P2 — Build y acceso a assets

Probar un hook de integración de Astro que genere un archivo de prueba y su índice tras disponer del HTML renderizado, dentro del directorio de assets resuelto. Demostrar que el artefacto entra en el empaquetado del Worker ejecutando build explícito, sin `postbuild` y sin añadir un comando que Workers Builds no utilice.

Registrar orden efectivo y lista de artefactos. En una ejecución negativa el generador falla: el build debe devolver exit distinto de cero, sin notificar indexación. No basta escribir ficheros después del build y afirmar que Cloudflare los servirá.

Si el hook candidato no cumple, documentar la prueba negativa y la alternativa concreta que se probó. No declarar cerrada esa decisión con solo un plan para probarla después.

### P3 — Caché y validadores

El spike debe demostrar una clave separada por representación para su caché propia, sin reutilizar la clave URL del middleware. Preferencia: servir assets precompilados con sus caches y validators; si añade Cache API, usa una clave interna distinta para HTML y MD, sin queries de visitante ni credenciales. El manifiesto enumera cada capa activa.

Pruebas obligatorias: HTML→MD→HTML y MD→HTML→MD, repetidas; GET y HEAD; sin Accept, `*/*`, preferencias y q=0; URL inexistente; redirect legacy; petición con Authorization ficticia sin persistirla; validación condicional de la misma representación y cruzada. Si no ofrece ETag, documentar su ausencia y demostrar que no produce un 304 heredado del HTML al pedir MD.

Workerd local puede no demostrar caché del CDN o acceso real a la zona. Etiquetar esa capa **no verificada**. Es suficiente para F0 demostrar el aislamiento propio y dejar una prueba precisa de CDN para F2 antes de promoción. No fabricar HIT ni usar una query pública como sustituto de la clave.

### P4 — Selección editorial

Aplicar los selectores propuestos a los siete fixtures y demostrar extracción de los sentinels, links, FAQs y avisos. Esto puede emitir texto estructurado para verificar selección; no debe presentarse como el generador Markdown definitivo. Entregar reglas DOM por tipo de página, exclusiones de ads/nav/scripts y una tabla de casos que justifican conservar/eliminar nodos.

H1 de los pilares y de páginas editoriales puede estar **fuera de main**: la metadata no debe depender solo de `main.textContent`. El pilar herramientas usa el layout anterior y la home compone múltiples componentes. Probar ambos tipos de pilar, no asumir que todos tienen el mismo DOM.

## 7. Entregables del implementador

1. PR de tooling con solo archivos autorizados y commits por motivo: harness, inventario/fixtures, integración de pruebas.
2. Evidencia en `docs/agent-readiness/evidencia/f0/`: replay, mediciones frescas, inventario, manifest de paridad, resultados de pruebas y hashes.
3. `spike.patch`, `spike-manifest.json` y `spike.md` con SHA base, archivos afectados, versiones, comandos exactos y límites de lo demostrado. No depende de una rama mutable o de archivos locales no entregados.
4. `decisiones.md` con cinco filas: entrada/delegación, hook de build, selección editorial, caché/validators, IDs/rutas. Cada fila tiene recomendación, alternativa descartada, evidencia, límite pendiente y criterio para F2.
5. `entrega.md`: commits exactos de permanente/spike, base exacta, criterios C01–C12, comandos, limitaciones y rollback.

El ejecutor propone decisiones; el coordinador las ratifica y actualiza la arquitectura después de la verificación. No modifica esta spec ni los documentos de arquitectura para declarar que pasó.

## 8. Aceptación

| ID | Criterio | Evidencia y entorno |
|---|---|---|
| C01 | Base resuelta, diff dentro de ownership | Git, local; lista de paths permanente/spike |
| C02 | Replay 43/20/19 y niveles originales | summary JSON, offline |
| C03 | Perfiles distintos y deriva del escáner no producen un delta engañoso | tests, offline; fixtures negativos |
| C04 | Fallos de transporte/schema quedan incompletos y los originales no se sobrescriben | tests y run metadata |
| C05 | Dos perfiles live con requests explícitos y source/deployment commits separados | JSON original y hashes; servicio publicado |
| C06 | Inventario exhaustivo; canónicos únicos; catálogo/sitemap cotejados | inventory JSON, build local |
| C07 | IDs/rutas y siete fixtures con advertencias/FAQ/fuentes conservadas | manifest/fixtures revisados |
| C08 | Entrada Worker-first y delegación funcional sin cambiar APIs/rutas excluidas | requests/logs, workerd local |
| C09 | Hook genera artefactos empaquetados y su fallo hace fallar build | build positivo/negativo, local |
| C10 | Preferencias Accept, HEAD, redirects/404 y alternancia de caché correctos | matriz de P3; CDN marcado según evidencia |
| C11 | Cinco decisiones propuestas con pruebas reproducibles y límites | decisiones/spike docs; revisión independiente |
| C12 | CI existente y pasos offline nuevos pasan; sin efectos externos | comandos locales y checks del PR |

Todos son obligatorios. Para C05, una indisponibilidad externa bloquea la sesión: abrir el bug de SDD, entregar el estado/commits y evidencia parcial ya existentes y detenerse. No continuar con trabajo offline después de detectar ese bloqueo, ni marcar F0 aceptada o C05 cumplido. Solo el coordinador puede autorizar la reanudación tras resolverlo. No exigir mejorar score para aceptar F0; sí exigir conservar la comparabilidad.

## 9. Comandos de validación

Tras la implementación, desde raíz y sin secrets locales:

```bash
npm ci
npx --no-install astro sync
node scripts/audit-specs-migracion.mjs
npx --no-install astro check
npm test
node --test tests/agent-readiness/*.test.mjs
npx --no-install astro build
node scripts/agent-readiness/index.mjs replay --baseline-dir docs/agent-readiness/evidencia --out-dir /tmp/ctpv-f0-replay
node scripts/agent-readiness/index.mjs inventory --build-dir dist --out-dir /tmp/ctpv-f0-inventory
```

Los out dirs deben ser nuevos por ejecución. No borrar evidencia previa para reutilizar la ruta; utilizar otra ruta cuando exista. Los tests deben cubrir contratos reales: deriva de perfiles, datos inválidos, inclusión indebida, canonical duplicado y exclusiones editoriales, no solo reimplementar el algoritmo dentro del test.

El spike sigue sus comandos de build/preview/dry-run fijados en `spike.md`; cargar la habilidad Wrangler antes de ejecutar su CLI. No desplegar. CI añade test Node offline antes de build y `inventory --build-dir dist` después, con ruta nueva bajo `${RUNNER_TEMP}`; no añade scan live al workflow ni reemplaza verificaciones existentes.

Para producir evidencia final sin dirtySource, commitear primero tooling/fixtures/config y ejecutar desde ese SHA con out dirs fuera del repo. Copiar luego los outputs a evidencia y crear un commit documental separado. Registrar en entrega el SHA de tooling que se probó y el SHA de entrega que solo añade evidencia; no falsear el estado del checkout para conseguir dirtySource=false.

## 10. Reversión y bloqueos

Reversión de F0: revertir sus commits de tooling/CI/devDependencies como grupo coherente. Eliminar o abandonar el worktree del spike solo después de entregar su patch/evidencia. La producción no debería haber cambiado; si cambió, es una desviación que debe informarse.

Bloqueos previstos: cambio de base con código nuevo; paquetes/parsers incompatibles; servicio de scan caído; workerd no disponible; handler del adaptador que no soporte la delegación probada; contenido que no cumpla la política de publicación. Cada bloqueo debe incluir comando/salida, impacto y propuesta al coordinador en un issue de bug de SDD, enlazado desde el issue implementador, conforme a [sdd.md](../sdd.md#bloqueos-y-bugs-de-sdd). La sesión se detiene sin cambiar la SDD para forzar la aceptación. No cambiar el stack, abrir acceso a APIs privadas ni improvisar configuración de zona para desbloquearlo.

El verificador usa una sesión distinta, ejecuta C01–C12 y no corrige código. El cierre arquitectónico depende de ese informe y de la ratificación de las cinco decisiones por el coordinador. F1/F2 se especifican a partir de ese cierre.
