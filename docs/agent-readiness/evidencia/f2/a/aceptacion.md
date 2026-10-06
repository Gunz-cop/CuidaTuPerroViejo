# F2A: evidencia de proyección editorial

Base auditada: `cac7ee039607ee9923a403a4e2f299437ff94af2` (`fcb639ddc7680ec69b5fb862731ab9174ee37a8a`). El índice completo derivado del build está en [index.json](index.json); su esquema y límites se validaron antes de empaquetar. No se modificaron contenido de producto, esquema JSON-LD, rutas, robots, sitemap, herramientas, worker ni `wrangler.jsonc`.

| Criterio | Evidencia local | Resultado |
| --- | --- | --- |
| A01 | Diff de rama + base indicada | Cambios limitados a integración, generador, `_headers`, check offline, goldens y evidencia F2A. F1/editorial quedan intactos. |
| A02 | Build Astro real y Wrangler dry-run del build; `astro.config.mjs` registra la integración después de discovery (sitemap precede discovery) | PASS. Producción de artefactos en `astro:build:done`; no hook posterior ni artefactos escritos a mano. |
| A03 | `index.json`, `manifest.json`, `projection.mjs check`, pruebas de índice y `projection.test.mjs` | PASS: 28 documentos derivados; SHA/cuerpo/tamaño y set exactos; prueba e2e de crecimiento concordante a 29 (sitemap + catálogo + HTML → inventario + proyección + check) y de límite 98/99 con cero artefactos en exceso. 556,402 bytes Markdown; índice 26,284 bytes; máximo por documento 47,807 bytes, todos dentro de límites. |
| A04 | 11 pares HTML/Markdown fijos en `tests/agent-readiness/fixtures/f2/`; manifest de hashes, headings, tablas, citas, imágenes y URLs; checks por corpus de `projection.mjs check` | PASS local. Los Markdown esperados son fixtures revisadas independientes, no se generan desde el serializador durante tests. Incluyen home, salud y herramientas, Cushing/FAQ, comida/tablas, dental, artículo sin FAQ, páginas editoriales y ambas herramientas. |
| A05 | Goldens y aserciones semánticas y mutaciones de pérdida en `tests/agent-readiness/projection.test.mjs`; selectores exactos en `projection-dom.mjs` | PASS: excluye formas/ads/controles/scripts y placeholder dinámico 35; conserva escalas estáticas, aviso condicional explícito y limitación de movilidad. |
| A06 | Dos builds limpios; `build-1.sha256`, `build-2.sha256`; pruebas negativas de H1 duplicado, selector ausente, tag semántico desconocido, tabla no representable y pérdida de aviso/FAQ/celda/fuente/autor; CLI detecta documento ausente y huérfano | PASS: los 29 archivos (índice y 28 MD) tienen hashes idénticos en ambos builds; los errores estructurales fallan en vez de producir prosa parcial. CLI `check` compara sin escribir. |
| A07 | `workerd-http.json` | PASS local: 58 solicitudes GET/HEAD reales a índice y 28 documentos, 0 fallas. GET coteja hash y bytes, MIME exacto, Link y cabeceras de seguridad; HEAD cuerpo vacío. Content-Length se comprueba si la plataforma lo emite, según contrato. `Accept: text/markdown` a `/` mantiene HTML. |
| A08 | CI incluye `projection.mjs check`; checks locales indicados debajo | PASS local. La negociación de variantes no se integra en F2A. Check público de Commit Preview queda pendiente del PR final, antes de auditoría. |

Comprobaciones ejecutadas sobre el checkout propio:

- `npm run check` — PASS (0 errores; Astro reportó 50 hints).
- `npm test` — PASS.
- `node scripts/audit-specs-migracion.mjs` — PASS.
- `npx --no-install astro build` — PASS, dos builds limpios idénticos.
- `node scripts/agent-readiness/projection.mjs check --build-dir dist` — PASS.
- `node scripts/agent-readiness/discovery.mjs check --build-dir dist` — PASS.
- `node --test tests/agent-readiness/*.test.mjs` — PASS, 37 tests (existing F0/F1 suites, 16 golden/mutation cases and 1 growth e2e); CI vuelve a ejecutar el growth tras build.
- `npx --no-install wrangler deploy --config dist/server/wrangler.json --dry-run --outdir /tmp/ctpv-f2a-dryrun-1661787` — PASS; assets leídos de la config compilada.
- Wrangler 4.128.0 local workerd — PASS con copia temporal aislada de configuración; solo `ASSETS` y `SESSION` locales, sin AI, correo, D1 ni limitadores. No se cambió la configuración de producto.

Los detalles reproducibles, hashes y respuestas HTTP sin credenciales se guardan junto a este documento. Reversión antes de promoción: revertir o cerrar la rama/PR F2A; no afecta producción. La URL fija de Commit Preview, CI público y auditoría independiente se completan al publicar el SHA candidato. No se ejecutó scan de evaluación, main, merge ni deploy.
