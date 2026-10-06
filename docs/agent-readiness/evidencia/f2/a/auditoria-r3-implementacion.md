# Auditoría independiente F2A — intento 3/5

2026-10-06. Issue #55, PR draft #57. **PASS: cero bloqueantes.** R2-B01 está resuelto; lista cerrada. Esta revisión consume el tercer intento de implementación: quedan dos, sin reiniciar los contadores SDD/F0/F1. Aceptación técnica de A; F2 completa y su promoción requieren B y autorización específica.

## Identidad y límites

- Base exacta: `cac7ee039607ee9923a403a4e2f299437ff94af2`, tree `fcb639ddc7680ec69b5fb862731ab9174ee37a8a`.
- Público fijo auditado: `644cd3d8ace36ac69fee4938a115d22c158e5e63`.
- Local equivalente: `99f4616268276ad6dee4ac56fb6ff1a845da0c49`.
- Tree público/local, comprobado independientemente: `03f49e2a67d8fa028b6c174a7329412caa7ad2f9`.
- Worktree propio detached: `/workspace/ctpv-f2a-audit-r3`; dependencias propias, lock congelado, caché aislada, sin upgrades ni copiar node_modules. Checkout limpio.

Lecturas: AGENTS, SDD F2 y contratos completos, D06–D10, ownership, expediente del candidato, R1/R2 definitivos e instrucciones de activación. Skills de runtime y Wrangler oficial aplicadas. Sin correcciones de producto/spec/goldens, evaluator, producción, API/admin público, JS de navegador, AI explícita, merge o deploy. Probes en memoria/copias del auditor. La preparación previa no consumió revisión.

## A01–A08

| Gate | Resultado | Evidencia independiente |
|---|---|---|
| A01 | PASS | Desde R2 sólo cambian renderList y su prueba, más evidencia propia. Norma, stack/lock, fuente editorial/JSON-LD, F0/F1, robots/llms/redirects/bindings intactos.28 HTML documentales idénticos a R2 y su baseline acreditado. Cierre644 frente a810f:188 paths exclusivamente de evidencia. |
| A02 | PASS | Dos builds Astro reales completan sitemap → F1 discovery → proyección después del adapter; índice+28MD antes del packaging. Dry-run de copia compilada aislada y checks del HEAD644 exitosos. |
| A03 | PASS | Closed schema, identidad, hashes/bytes y correspondencia exacta verificados por CLI/tests. Crecimiento concordante29 PASS,99 rechazado por cap98; path100 aceptado y101/115 rechazados sin salida parcial. |
| A04 | PASS | Golden fijos y guard DOM/Markdown/GFM independiente28/28; probe adicional del auditor sin enlaces/headings/bloques faltantes. Lista original UL de tres niveles y caso mixto UL→OL start4→UL preservan estructura sin code accidental. Las11 listas reales del artículo de medicación conservan tipos/start, jerarquía, texto y URLs en orden. |
| A05 | PASS | Placeholder geográfico excluido quirúrgicamente; aviso de urgencias y fallback preservados. Herramientas conservan aviso condicional/límites, sin UI/estado calculado. Negativas de aviso/FAQ/celda/fuente/autor pasan. |
| A06 | PASS | Dos builds con57 hashes idénticos:29 artefactos F2+28 HTML. Staging, ausencia/duplicación/cardinalidad/huérfano/límites cubiertos por regresiones. Respecto a R2 sólo cambian el Markdown de medicación y el índice, con HTML intacto. |
| A07 | PASS | Workerd propio8803:60/60; Commit Preview exacto644:60/60. GET/HEAD index+28MD y home; MIME, Link, cuatro headers de seguridad, bytes/hash y HEAD vacío correctos. Home Accept Markdown sigue HTML. |
| A08 | PASS | CI112304086619 y Workers112304454923 completed/success, ambos HEAD644 completo, corroborados por snapshot raw. CLI proyección/discovery, checks y entrega completa PASS; rollback documentado y ninguna negociación activa/anunciada en A. |

## Cierre R1/R2

R1 B01–B05 siguen resueltos: enlaces recientes y cards home, límites inclusivos, exclusión del span dinámico, escapes/literal pre/code/celdas GFM y traspaso durable de evidencia. Goldens históricos F0 y los F2 no cambian desde R2. Probes propios confirman que los prefijos `#`, `1.` y `-` permanecen párrafos, el bloque código conserva LF internos/finales y `A | B` conserva una celda.

**R2-B01:** renderList dejó de emitir indentación absoluta dependiente de profundidad; el padre aplica una sola indentación de continuación al insertar la lista hija. El probe original ahora produce tres nodos list, cero code. El caso mixto preserva UL→OL con start4→UL, texto fijo por nivel y cero code. Se contrastó además el artículo real `article--como-dar-medicacion-perro`, cuyo Markdown cambió: modelos independientes DOM y mdast/GFM coinciden para sus11 listas, incluyendo anidación/texto/URLs. No se usó el serializador para generar el expected.

Fuentes y AST completos en `serialization-probe.{mjs,json}` y `list-probe.{mjs,json}` del bundle; corpus en `corpus-probe.{mjs,json}` y `corpus-summary.json`. Guard semántico del candidato también pasa y detecta pérdida, duplicación, reordenación y retirada de enlaces. No hay bloqueantes nuevos ni hueco SDD confirmado.

## Comandos y procedencia

Worktree propio: `npm ci --offline` desde caché aislada; dos `npx --no-install astro build`; `node --test tests/agent-readiness/*.test.mjs`41/41, `node --test tests/agent-readiness/projection-growth.mjs`2/2; `node tests/agent-readiness/projection-semantic.mjs dist`28/28; `npm test`1/1; `npm run check`0 errores,0 warnings,50 hints; CLI checks de projection/discovery; Wrangler dry-run y dev con copia compilada. Logs completos conservados. Índice SHA256 `fd5e032df2852f0aa3e4cf3bb5ba4d2ff93114a15646652ed485323bf69ab341`;57 hashes idénticos entre builds.

Preview independiente: **https://aa84910a-cuidatuperroviejo.g1721m.workers.dev**, del comentario oficial `cloudflare-workers-and-pages[bot]`, updated2026-10-06T13:52:04Z, Latest644cd3d8. Permalink: https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/57#issuecomment-6010340357. Raw receipt y check-runs archivados. Cliente honesto `ctpv-independent-f2a-auditor/3.0`, sin impersonación;60 solicitudes documentales GET/HEAD, sin otras rutas públicas. No se atribuye acceso universal ni verificación de WAF/CDN de producción.

Las capturas del autor permanecen atribuidas a público810f/previewd40f; sus builds a fuente local97cfa. La igualdad de código con644 queda probada por diff sólo documental. Las nuevas capturas del auditor pertenecen a644/aa84910a.1.596 hashes del expediente coinciden; R1 y R2 copiados conservan sus SHA256 originales `0673b6955f957059f5be752c3b4477f91bd65c5e137aa143f55dc204176f58b0` y `af77239ff58bb28661eedfdc390f3f2b100975435a5a454e7d9780a2c5746a0a`.

Bundle nuevo: `/workspace/ctpv-sdd-correcciones/f2a-auditoria-r3-evidencia/`,282 archivos sellados; manifest `bundle.sha256`, SHA256 **`7d964133ecdc75b4a2e8210906b0a343806afb0cf0dfb213315b226e74133a5e`**, excluyendo su propio hash. Incluye logs, probes, modelos/AST, hashes, raw bodies/headers HTTP, configuración sanitizada, receipt/checks e identidad.

## Limitaciones de instrumentación y seguridad

Runtime propio con copia de config compilada, únicamente ASSETS y SESSION locales; AI/email/D1/rate/remotos retirados, diff sanitizado archivado. Puerto8803 libre comprobado antes del arranque y readiness confirmado antes de HTTP. Se cerraron sólo los PIDs de esta sesión, incluidos wrappers y workerd que sobrevivieron a CtrlC; detalle en shutdown.json. No se usó proceso ajeno.

Instalación inicial esbuild EPERM preservada y retry mínimo autorizado PASS. Un primer astro check omitió variables de configuración/telemetría y falló antes del análisis; corregir esas variables produjo el check válido anterior. Un helper inicialmente trató el manifest R2 de pares como objeto; se corrigió la lectura y normalización de paths. El dry-run inicial no encontró la copia aún no creada por ese helper; el ensayo válido posterior pasó. Logs diagnósticos se conservan separados y no se atribuyen al producto. Avisos reales de binding AI del build preservados; no se hicieron llamadas AI explícitas ni se infiere ejecución de inferencia desde el warning.

No se exige determinismo a archivos fuera del corpus ni se inventa HIT/CDN. F2B y P01–P03 quedan pendientes. **Veredicto definitivo PASS3/5, cero bloqueantes, lista cerrada.**
