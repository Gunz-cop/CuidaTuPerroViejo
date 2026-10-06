# Auditoría independiente de implementación F2A — intento 1/5

Fecha: 2026-10-06. Issue #55, PR draft #57. **FAIL**, exclusivamente por B01–B05. Lista cerrada para una corrección integral del implementador; no hay hueco SDD confirmado ni STOP de entorno.

## Identidad y límites

- Base exacta: `cac7ee039607ee9923a403a4e2f299437ff94af2`, tree `fcb639ddc7680ec69b5fb862731ab9174ee37a8a`.
- Candidato público fijo auditado: `d628f371b32cd7c4bb698ba906b2648c4cd6178a`.
- Local equivalente comunicado: `be5a335d5ef9a90785b309711209a52a71ac6d4f`.
- Tree auditado: `279a754c5ed26d53958baa556d0584db40b1ad89`.
- Worktree propio detached: `/workspace/ctpv-f2a-audit-r1`, HEAD público verificado, limpio antes y después de las pruebas. Base es ancestro del candidato.

Se aplicaron AGENTS, SDD F2 completa y contratos de la base exacta, D06–D10, cierres F0/F1, postmortem de migración y ownership Assistant. Se leyeron las skills de runtime del entorno y Wrangler oficial suministrada, usando versión del lock y configuración compilada. No se corrigieron producto, fixtures ni norma; no hubo evaluador, API/admin público, JS de navegador, AI, merge o deploy. Las mutaciones se hicieron en copias temporales o memoria del auditor. Este contador es independiente de SDD F2 PASS 2/2, F0 PASS 3/5 y F1.

## Matriz A01–A08

| Criterio | Resultado | Evidencia y límite |
|---|---|---|
| A01 | PASS | Diff de 38 archivos dentro de la proyección, integración, headers, CI, pruebas/evidencia; fuente editorial/JSON-LD, redirects, stack, bindings y F1 intactos. Los 28 hashes HTML del build propio coinciden con el baseline real de producto. |
| A02 | PASS | Dos builds Astro reales: sitemap → discovery → proyección, 28 MD e índice antes de terminar. Packaging dry-run de copia compilada aislada PASS; CI y Workers del mismo HEAD exitosos. |
| A03 | FAIL — B02 | Índice real cerrado de 28 documentos y crecimiento concordante a 29 pasan. Falta imponer el límite normativo de longitud del canonicalPath: se acepta 115. |
| A04 | FAIL — B01/B04 | Prosa, headings, FAQ, avisos y URLs se contrastaron sobre 28 DOM reales; home pierde tres destinos y altera orden/multiplicidad. Los goldens y guards actuales no detectan esas pérdidas. Serialización de texto/código/tablas también viola el contrato. |
| A05 | FAIL — B03 | Selecciones de herramientas conservan aviso condicional/límites y excluyen resultados calculados. Home publica un placeholder dinámico de geolocalización. |
| A06 | FAIL — B02 | Dos builds propios producen los mismos 29 archivos byte por byte. Negativas de cardinalidad, ausencia/huérfano, crecimiento99 y staging pasan; canonicalPath demasiado largo produce artefactos entregables en vez de fallar. |
| A07 | PASS de runtime | Workerd: 58 GET/HEAD a índice+28 MD, más GET/HEAD home, PASS. Preview fijo: los mismos 58 recursos explícitos PASS; home conserva HTML y bytes. Véanse límites del cliente público y traspaso B05. |
| A08 | FAIL — B05 | CI y Workers final PASS, home Accept MD aún HTML; rollback documentado. La entrega congelada mantiene preview pendiente y no conserva su bundle público completo en la evidencia durable del PR. |

El PASS de CI no sustituye los fallos independientes siguientes.

## B01 — Pérdida de enlaces, orden y multiplicidad; golden home no acredita paridad

**Contrato:** A04 y SDD §7 exigen todos los bloques y URLs, orden/multiplicidad y cobertura semántica independiente del output. Contratos §4 exige conservar label/href y bloques de cards/listas.

**Ubicación:** `projection-dom.mjs:252–285` (`renderLinkedBlocks`) y `298–332` (`renderList`); golden `tests/agent-readiness/fixtures/f2/home.md:32` y tarjetas recientes desde línea 137; comparación de goldens en `projection.test.mjs:26–34`.

**Reproducción:** el build de home contiene enlaces editoriales hacia estos tres artículos, ausentes de su Markdown y del golden esperado:

- `/salud-mental-emocional-perros/ansiedad-separacion-perros-senior`.
- `/higiene-hogar-perros-senior/incontinencia-fecal-perros-senior`.
- `/salud-mental-emocional-perros/agresividad-tardia-perros-mayores-dolor`.

Además, una card de pilar tiene H3 «Salud y prevención», seguido del párrafo «Chequeos, síntomas y decisiones a tiempo.» y CTA. El Markdown emite primero `- Salud y prevención Chequeos, síntomas y decisiones a tiempo. Ver guía`, y después repite el H3 enlazado. Hay reordenación y duplicación, no diferencia visual aceptable.

El probe DOM/AST del auditor recorrió los 28 documentos sin llamar al serializador para definir el contenido esperado: los destinos faltantes aparecen en home. Todos los headings y bloques de texto contrastados permanecen fuera de esos defectos, normalizando whitespace y verificando los candidatos contra fuente. El check del autor reconstruye con el mismo `projectDocument`; la igualdad contra sus propios bytes no es el guard semántico independiente exigido. No hay tabla/guard independiente 28/28 en la entrega y el golden home ya fija el resultado defectuoso. No se presume cómo se creó el golden; su contenido demuestra que necesita revisión.

**Corrección mínima:** conservar enlaces y el orden real de hijos, emitiendo cada bloque una vez. Revisar expected Markdown contra HTML/inventario independiente y actualizar hashes con trazabilidad, sin regenerarlo automáticamente desde el serializador como oráculo. Añadir la cobertura semántica por corpus exigida que detecte pérdida/reordenación/duplicación y preserve multiplicidad de URLs/bloques; mantener los goldens F0 intactos.

## B02 — CanonicalPath excedido no falla antes de empaquetar

**Contrato:** contratos §1: el límite más estricto de patrones Wrangler prevalece y falla build antes del packaging; máximo 100 caracteres. A03/A06 y D07.

**Ubicación:** `projection.mjs:25–35` valida gramática, pero no longitud de canonicalPath; `expectedArtifacts` solo limita número de documentos.

**Reproducción independiente:** `long-path-probe.mjs` añade a una copia del build un artículo concordante en HTML, catálogo y sitemap. CanonicalPath `/salud-perros-mayores/f2-` más 90 letras `a`: **115 caracteres**, ID 102 dentro del tope160. Inventario exit0, generación de 29 documentos exit exitoso y CLI check exit0. Se publica el directorio de proyección; `long-path-probe.json` conserva el resultado.

**Corrección mínima:** validar la longitud inclusiva100 antes de escribir cualquier artefacto y en el check correspondiente. Mantener aceptación del límite válido y rechazo explícito del exceso sin salida entregable; no esperar a F2B, introducir globs o ampliar límites.

## B03 — Placeholder de estado UI publicado como contenido editorial

**Contrato:** A05 prohíbe placeholders/estado calculado/UI; no autoriza eliminar avisos editoriales ni todos los hidden.

**Ubicación:** `src/components/EmergencyGeoWidget.astro:8` identifica el estado `span#localized-emergency-text`, dentro del aviso de urgencias de home. `home.md:122` publica «Detectando tu ubicación para sugerirte centros cercanos...». El golden también lo conserva.

**Reproducción:** revisar DOM real y Markdown: es texto dinámico que el script sustituye tras detectar país, no una afirmación editorial sobre el contenido. La proyección estática presenta esa detección inexistente al lector Markdown.

**Corrección mínima:** excluir específicamente este estado UI en la proyección y probarlo; preservar el aside de urgencias, señales educativas y anchor estático útil. No modificar DOM de producto ni excluir aside/hidden globalmente. Es cumplimiento de A05, no una capacidad nueva o cambio de norma.

## B04 — Escape de texto, literal de código y celda GFM incumplidos

**Contrato:** contratos §4 requiere escapar texto para impedir headings/listas falsos, pre/code literal y tablas GFM sin pérdida de celdas.

**Ubicación:** `projection-dom.mjs:186` (`escapeText`), `350` (segundo escape de pipe), `384–389` (pre) y `557` (colapso global de LF).

**Reproducciones en memoria sobre HTML golden real, sin editar producto:**

1. Añadir `<p># Texto literal editorial</p>`, `<p>1. No es lista</p>` y `<p>- No es lista tampoco</p>` a home produce **dos H1** y dos listas falsas al parsear Markdown, aunque el HTML tiene un único H1 y esos tres párrafos son texto literal.
2. Añadir `<pre><code>línea A\n\n\nlínea B\n\n</code></pre>` pierde LF: el contenido Markdown parseado es `línea A\n\nlínea B`. El colapso global entra dentro del fence y se retiran LF finales.
3. Reemplazar una celda real de comida casera por `A | B` produce un pipe doblemente escapado. El parser GFM obtiene una celda `A` con backslash, en vez de conservar `A | B` en una sola celda; se altera la estructura/dato.

Resultados sellados en `serialization-probe.json` y `table-pipe-probe.json`. Se usaron parsers Markdown/GFM instalados del lock como lectores independientes, no expected derivado del algoritmo evaluado.

**Corrección mínima:** escapes conscientes del contexto de bloque/celda, mantener code/pre fuera de la normalización de prosa y escapar pipe exactamente lo necesario para GFM. Guards permanentes de estas representaciones con expected inspeccionado; sin cambiar contenido editorial, dependencias ni formato del índice.

## B05 — Traspaso incompleto de evidencia pública del candidato

**Contrato:** SDD §6 exige receipt oficial, HEAD/check/URL exactos, registros request/status/headers/hash/bytes, archivo crudo y manifest SHA256; §8 exige entrega completa y revisable. Territorio de evidencia F2A: `docs/agent-readiness/evidencia/f2/a/`.

**Evidencia:** en el candidato fijo, `aceptacion.md` A08 y `manifest.json` siguen declarando el preview pendiente. Solo se versionan ocho archivos locales, sin receipt/bundle público. El bundle recibido existe en `/workspace/ctpv-f2a/dist/f2-preview-evidence-d628/`; summary SHA-256 `97091dd7cf5700b63c25dd103853234f2de460bc92bcd9d1de9f6da037182208`. Sus bodies GET con hash declarado coinciden con los originales; registra 58 recursos explícitos y un GET home adicional. Su manifest tiene una sola entrada, summary, sin sellar todos los raws de headers/bodies. Tener runtime correcto no completa el traspaso durable.

**Corrección mínima:** preservar/versionar el bundle público, snapshot/receipt y manifest completo mediante evidencia documental, conservando el SHA real medido y distinguiendo un cierre posterior de solo docs. No reescribir el origen de capturas ni exigir una SHA autorreferente. En la entrega corregida conservar el nuevo receipt del candidato y metadatos revisables; archivar los resultados originales, incluidos fallos de ensayo, sin declararlos prueba de producción.

## Verificaciones positivas y limitaciones exactas

Instalación congelada en worktree propio: el primer `npm ci --offline` falló por EPERM del postinstall esbuild. Con permiso mínimo de red/IPC, el mismo comando terminó bien. No se alteraron dependencias, credenciales ni sandbox mediante shims.

Pruebas propias: 36 node tests PASS; crecimiento e2e PASS (29 válido, ausencia/huérfano detectados, 99 rechazado sin directorio); `npm test` PASS; `npm run check` 0 errores/0 warnings/50 hints; inventory/discovery/projection del build real PASS. Dos builds: 29 archivos idénticos. Índice propio y del autor idéntico, SHA-256 `d2868aa542def5a6ea7bd2b18956d3a15016b792de8b05b79789d87db9e6df73`, 26.284 bytes; 28 MD, total556.402, máximo47.807. Los 28 hashes HTML son idénticos al baseline real publicado de F1; el diff de producto fuente/editorial es vacío.

Se usó copia de `dist/server/wrangler.json`, solo ASSETS y SESSION local, sin AI/email/D1/limitadores/bindings remotos/vars; diff de campos sanitizado conservado. Wrangler dry-run de esa copia compilada PASS, sin deploy. Workerd propio puerto8797 detenido al terminar. Ninguna llamada local o pública a API/admin, bindings con efectos o calculadoras.

Receipt oficial verificado independientemente: [comentario6010340357](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/57#issuecomment-6010340357), autor `cloudflare-workers-and-pages[bot]`, latest `d628f371`, Commit Preview exacta `https://a9654c00-cuidatuperroviejo.g1721m.workers.dev`. Checks consultados sobre el SHA completo: CI112132319674 y Workers112132497043, ambos completed/success. No se usaron checks del antecesor ni alias Branch Preview.

HTTP propio local: 60 solicitudes reales (58 recursos + GET/HEAD home), todos checks PASS. HTTP público inicial con User-Agent Python-urllib recibió 60 respuestas403, body `error code: 1010`; se preserva la serie. Una comprobación diagnóstica con User-Agent explícito y honesto `ctpv-independent-f2a-auditor/1.0` recibió200. Con ese cliente se recorrieron 60 solicitudes: los 58 recursos explícitos cumplen status, MIME exacto, hash/bytes, HEAD vacío, Link/seguridad y ausencia de cookie; home conserva HTML/hash y HEAD vacío. No se declara acceso universal ni identidad de proveedor. No se cambió proxy/CA ni se usó impersonación. No fue caída del evaluador y no hubo scans.

El primer harness aplicó por error el requisito de charset de HTML negociado a home F2A público, que responde `text/html`; esa comprobación se corrigió **offline** en `public-assessment.json`, sin nuevas solicitudes. F2A exige home todavía HTML; el contrato de MIME explícito se verificó completo para índice y MD. Capturas/checks iniciales permanecen intactos. Preview no prueba zona/CDN de producción ni gates P01–P03.

## Evidencia y comandos

Directorio independiente: `/workspace/ctpv-sdd-correcciones/f2a-auditoria-r1-evidencia/`. Manifest de 400 archivos, incluidos logs, probes, receipts, capturas de cliente bloqueado y cliente válido: SHA-256 **`a212172c2d1e1ffa22cbf0f2c8111c92b1e17d7ccf2500eadc18b72f570aea6d`**. Las entradas sellan artefactos, no este informe posterior.

Comandos principales, con Node24.19, telemetría deshabilitada y XDG_CONFIG_HOME temporal:

```sh
git worktree add --detach /workspace/ctpv-f2a-audit-r1 d628f371b32cd7c4bb698ba906b2648c4cd6178a
npm ci --offline --cache /tmp/ctpv-f0-npm-cache
node --test tests/agent-readiness/*.test.mjs
node --test tests/agent-readiness/projection-growth.mjs
npm test
npm run check
npx --no-install astro build  # dos veces; hashes comparados
node scripts/agent-readiness/projection.mjs check --build-dir dist
node scripts/agent-readiness/discovery.mjs check --build-dir dist
node /workspace/ctpv-sdd-correcciones/f2a-auditoria-r1-evidencia/corpus-probe.mjs
node /workspace/ctpv-sdd-correcciones/f2a-auditoria-r1-evidencia/long-path-probe.mjs
npx --no-install wrangler deploy --config dist/server/wrangler.f2a-audit.json --dry-run --outdir /tmp/ctpv-f2a-audit-dryrun
npx --no-install wrangler dev --config dist/server/wrangler.f2a-audit.json --local --ip 127.0.0.1 --port 8797 --inspector-port 9297
python /workspace/ctpv-sdd-correcciones/f2a-auditoria-r1-evidencia/http-probe.py local
python /workspace/ctpv-sdd-correcciones/f2a-auditoria-r1-evidencia/http-probe.py public
```

El diff-check detectó whitespace final en fixtures HTML/Markdown conservadas; no se clasifica como bloqueo funcional ni se pide corregirlo. No hay recomendaciones opcionales condicionando el veredicto.

**Cierre:** FAIL implementación F2A **1/5**, solo B01–B05. Correcciones corresponden al implementador en otra sesión; F2B sigue bloqueada. Quedan cuatro intentos como máximo, sin reiniciar contador y sin sexto ciclo. La revisión siguiente evalúa las correcciones y sus regresiones sobre nuevo SHA fijo; no autoriza promoción.
