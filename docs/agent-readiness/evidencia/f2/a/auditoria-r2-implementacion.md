# Auditoría independiente de implementación F2A — intento 2/5

Fecha: 2026-10-06. Issue #55, PR draft #57. **FAIL**, por un único bloqueante de código: R2-B01, anidación de listas convertida en código Markdown. Lista cerrada. No se confirma hueco SDD ni STOP de entorno. Después de esta revisión quedan tres intentos; F2B sigue bloqueada.

## Identidad y alcance

- Base exacta: `cac7ee039607ee9923a403a4e2f299437ff94af2`, tree `fcb639ddc7680ec69b5fb862731ab9174ee37a8a`.
- Candidato público fijo: `69a212c2d7e7f0f58c2bdd8fb66bf433cd995cca`.
- Local equivalente: `559e79d18b081e662cbdb64ccbd50b53ca5fecc1`.
- Tree público y local, comprobados independientemente: `76c062fcf3533c38bbe5e361d930ebc8d860e6f3`.
- Worktree propio detached: `/workspace/ctpv-f2a-audit-r2`; dependencias propias instaladas desde lock/cache, sin upgrades ni copiar node_modules. Checkout limpio antes y después de las verificaciones.

Se leyeron AGENTS, contrato F2 completo, D06–D10, cierres F0/F1, ownership, expediente de correcciones y R1 definitivo. Se aplicaron las instrucciones del runtime y Wrangler oficial. La preparación previa no consumió intento; esta activación sí es R2/5, independiente de los contadores SDD/F0/F1. No se modificaron producto, norma, goldens ni informe R1. Mutaciones únicamente en memoria o copias aisladas. Sin evaluador, producción, API/admin público, JS de navegador, llamadas AI, merge o deploy.

## Matriz A01–A08

| Criterio | Resultado | Evidencia independiente |
|---|---|---|
| A01 | PASS | Ownership A respetado; norma, fuente editorial/JSON-LD, redirects, robots/llms, F1, bindings y lock sin cambios ajenos. Los 28 HTML documentales coinciden con el baseline real. Cierre frente a `1651d4246efbc991e436f20e9a417e64896a9c79`: 188 paths exclusivamente de evidencia, sin delta de código. |
| A02 | PASS | Dos builds Astro reales con orden adapter → sitemap → discovery → proyección, 28 Markdown e índice antes de empaquetar. Dry-run de copia compilada aislada PASS y checks del HEAD exacto exitosos. |
| A03 | PASS | Índice closed schema, IDs/paths/hashes/bytes contrastados; crecimiento concordante29 y límite98. Longitud100 aceptada;101 y115 rechazadas antes de salida entregable en copias aisladas. |
| A04 | FAIL — R2-B01 | Corpus actual28/28, goldens y guard DOM/Markdown independiente acreditan las reparaciones de enlaces, headings, prosa, tablas, fuentes/autor, FAQ, avisos e imágenes. Una mutación de lista de tres profundidades revela pérdida de la tercera estructura; véase reproducción completa. |
| A05 | PASS | Retirada quirúrgica del span de estado geográfico, conservando urgencias y anchor/fallback. Herramientas sin estado calculado, con aviso condicional y límites. Sin exclusión global de aside/hidden. |
| A06 | PASS | Dos builds: los mismos 29 artefactos F2 y28 HTML documentales, 57 hashes idénticos. Negativas de staging, cardinalidad, ausencia/huérfano, cap99 y path excedido pasan. |
| A07 | PASS | Proceso workerd propio8801:60/60; Commit Preview oficial69a212:60/60. GET/HEAD de índice+28MD y home, MIME/Link/seguridad/bytes correctos, HEAD vacío. Home Accept Markdown sigue HTML. |
| A08 | PASS | CI112274404741 y Workers112274604794 completed/success para69a212, corroborados en snapshot raw. CLI proyección/discovery PASS, entrega y rollback completos, ninguna negociación activa/anunciada en A. Evidencia pública durable y correctamente atribuida. |

El PASS de CI no sustituye A04. A08 acredita los checks y la entrega; no implica aceptación técnica conjunta mientras A04 falle.

## Cierre de los cinco grupos de R1

| Grupo R1 | Resultado R2 |
|---|---|
| B01 | Las tres URLs recientes de home y orden/multiplicidad originales están reparados. Golden revisado contra HTML fijo, guard semántico independiente añadido y corpus28/28 contrastado. El cambio de renderList introduce la regresión R2-B01; cierre de B01 incompleto por ese único defecto. |
| B02 | PASS: límite inclusivo100 y rechazo101/115; crecimiento29/cap98 y ausencia de artefactos parciales verificados. |
| B03 | PASS: placeholder geográfico excluido, aviso editorial y destino estático preservados. |
| B04 | PASS: prefijos literales permanecen párrafos; pre/code conserva `línea A\n\n\nlínea B\n\n`; `A | B` permanece una celda GFM. AST y resultados íntegros archivados. |
| B05 | PASS: raw requests/headers/bodies, receipt/snapshot y manifests durables.807 hashes del expediente coinciden,58 cuerpos documentales del archivo público1651 concuerdan con su resumen. R1 exacto preservado con SHA256 `0673b6955f957059f5be752c3b4477f91bd65c5e137aa143f55dc204176f58b0`. |

## R2-B01 — La tercera profundidad de lista se serializa como código

**Contrato incumplido:** `f2-contratos.md:87`, §4: «ul/ol/li: listas Markdown, anidación y orden preservados». A04 exige paridad de listas. Es una regresión reparable del serializador, no una ampliación de alcance ni un hueco normativo.

**Ubicación:** `scripts/agent-readiness/projection-dom.mjs:307`, `renderList`, en particular la llamada recursiva con `depth + 1` y la aplicación posterior de `blockIndent`/`indentContinuation`. La recursión ya emite indentación dependiente de profundidad; el padre vuelve a indentar esas líneas y acumula espacios.

**Reproducción independiente:** sobre el HTML fijo de home, insertar en memoria antes de `</main>`:

```html
<ul><li>Primer nivel<ul><li>Segundo nivel<ul><li>Tercer nivel</li></ul></li></ul></li></ul>
```

La salida candidata es:

```text
- Primer nivel

    - Segundo nivel

          - Tercer nivel
```

El parser Markdown/GFM independiente produce lista → item Primer nivel → lista → item Segundo nivel → **code(value="- Tercer nivel")**, en lugar de una tercera lista. La fuente tiene tres listas anidadas; el resultado solo conserva dos y presenta el tercer elemento como código. El check que reconstruye con el mismo serializador no detecta esa pérdida.

Probe y AST completos: `f2a-auditoria-r2-evidencia/serialization-probe.mjs` y `serialization-probe.json`. Se puede reproducir con `node /workspace/ctpv-sdd-correcciones/f2a-auditoria-r2-evidencia/serialization-probe.mjs` mientras el worktree conserva el SHA fijo y sus dependencias. El probe también registra las regresiones B04 reparadas; no altera archivos del candidato.

**Corrección mínima al implementador:** usar una única estrategia de indentación por nivel, preservando jerarquía y orden de listas y los bloques/cards ya reparados. Añadir una regresión semántica fija de tres profundidades cuyo expected derive de la estructura HTML revisada, con AST list en cada profundidad y sin code accidental. No cambiar SDD ni contenido editorial para aprobar.

## Procedencia, comandos y evidencia

Ejecutados en worktree propio: instalación congelada; `npx --no-install astro build` dos veces; `node --test tests/agent-readiness/*.test.mjs` (40/40); `node --test tests/agent-readiness/projection-growth.mjs` (2/2); `node tests/agent-readiness/projection-semantic.mjs dist` (28/28); `npm test`; `npm run check` (0 errores,0 warnings,50 hints); CLI checks de proyección/discovery; dry-run y workerd mediante copia de `dist/server/wrangler.json`. Logs conservados. Dos builds producen índice SHA256 `9a0b0a3d765d4f59110edf30631ccb5fddb30449b129f25fb893f4f19154aa32` y los mismos57 hashes.

Copia compilada aislada con ASSETS y SESSION locales; AI/email/D1/rate limits/remotos retirados. Diff sanitizado y copia archivados. Los avisos AI del build se conservaron; no constituyen evidencia de inferencia ejecutada y no se invocó AI explícitamente.

Preview independiente exacto: `https://1086c00d-cuidatuperroviejo.g1721m.workers.dev`, obtenido del comentario oficial `cloudflare-workers-and-pages[bot]`, actualizado2026-10-06T12:43:21Z, Latest69a212c2. Permalink: https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/57#issuecomment-6010340357. Snapshot raw del comentario y check-runs del HEAD completo archivados. Cliente honesto identificado `ctpv-independent-f2a-auditor/2.0`; este resultado no afirma acceso universal desde otros clientes.

Las capturas versionadas del autor corresponden a1651 y al preview `1ead4aad`, con snapshot durable y source de build54e51a; permanecen así atribuidas. Su código es idéntico al cierre69a212 por diff documental probado. Las capturas nuevas del auditor sí corresponden a69a212/1086c00d. No se relabelaron fuentes ni se inventó SHA autorreferente.

Bundle independiente: `/workspace/ctpv-sdd-correcciones/f2a-auditoria-r2-evidencia/`,399 archivos sellados; `bundle.sha256` excluye su propio hash. SHA256 del manifest: **`198eeba2c31248020d3f257c429959466a6b41522c83fefc685aa369b0f7167f`**. Incluye fuentes de probes, AST, hashes, logs, raws HTTP local/público, receipt/checks, identidad y cierre de procesos.

## Límites y errores de instrumentación conservados

El primer arranque local8798 encontró un puerto ocupado. Su serie alcanzó un proceso preexistente y se conserva como `local-unattributed-8798`, sin usarla para acreditar runtime propio. Se repitió únicamente esa prueba en8801 tras confirmar puerto libre y readiness de mi proceso;60/60PASS. Se apagaron exclusivamente el npm propio70170 y su hijo workerd70234, sin tocar procesos ajenos. El hijo permanecía activo tras SIGTERM y se terminó con SIGKILL al PID propio exacto70234.

Una comparación auxiliar inicial de listas Python contra listas JSON confundió tuples/listas; la comparación por mapa archivo/hash confirmó57/57 idénticos, con manifests originales intactos. Otro helper inicial unió paths repository-relative al directorio de evidencia; corregir la raíz confirmó807/807. Ambos errores de instrumentación quedan descritos en los JSON de prueba y no se atribuyen al candidato.

No se exige determinismo a chunks/contacto fuera del corpus ni HIT/CDN no observado. No se ejecutaron nuevas pruebas de F2B o scans. Lista cerrada: **únicamente R2-B01** vuelve al implementador; no se abren ciclos por observaciones opcionales.
