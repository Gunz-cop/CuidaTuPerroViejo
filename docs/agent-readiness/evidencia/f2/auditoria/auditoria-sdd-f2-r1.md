# Auditoría independiente SDD F2 — revisión 1/2

Fecha: 2026-10-06. **FAIL**, por los dos bloqueantes B01 y B02. Lista cerrada; no se requieren correcciones opcionales para la segunda revisión.

## Identidad y alcance

- Candidato local auditado: `77bd611d2d0f816bd8eb3f86b22a90456be0a257`.
- Árbol verificado localmente: `c6d414bf7101ce77877e38b75e6d58bdd8b48b14`.
- Base de producto: `28bd92ecd424ff11b31e13e4a2ba499cb196a870`.
- Publicación equivalente comunicada por el coordinador: `9d17168e244dba849540c97fda0a6457973fcd35`, mismo árbol; PR #54 draft. Esta auditoría se fundamenta en el candidato local fijo.
- Worktree `/workspace/ctpv-f2-sdd` limpio. Diff contra base: once archivos documentales; ninguna modificación de producto, dependencias, configuración fuente o CI.

Se leyeron AGENTS, el contexto F0/F1, la fase F2, sus contratos, decisiones y snapshots editorial/plataforma. Se contrastaron los contratos con las fuentes instaladas y el HTML real disponible del build de la base. No se corrigieron documentos ni producto, ni se ejecutaron evaluador, solicitudes públicas, deploy o merge. Esta revisión de SDD no consume revisiones de implementación; F0 PASS 3/5 y los cierres F1 permanecen intactos.

## Resultado por área

| Área | Resultado normativo |
|---|---|
| Secuencia F2A → F2B, ownership, separación de implementación y promoción | PASS |
| Integración y orden real de build | FAIL — B01 |
| Metadata e identidad de la entidad principal | FAIL — B02 |
| Selección DOM y representación editorial del corpus base | PASS fuera de B02 |
| Serialización Markdown, goldens, errores y determinismo exigido | PASS |
| Índice, paths, crecimiento y límites exactos de routing | PASS |
| Accept, GET/HEAD, ETag, errores, ASSETS y ausencia de Cache API | PASS de diseño |
| CI, preview local/público y evidencia por HEAD | PASS de diseño |
| Rollout, rollback y límites de revisión/STOP por bug SDD | PASS |

PASS de diseño expresa ausencia de otro bloqueo contractual confirmado; no certifica una implementación F2 todavía inexistente.

## B01 — Orden exigido de hooks incompatible con Astro instalado

**Ubicación:** `docs/agent-readiness/fases/f2-lectura-markdown.md:34` exige añadir la integración después de F1 y «antes del adapter agregado por Astro». `docs/agent-readiness/evidencia/f2/plataforma.md:7` afirma que el adapter registra su hook después de las integraciones del proyecto.

**Evidencia:** Astro 7.2.10 instalado ejecuta `settings.config.integrations.unshift(settings.config.adapter)` en `node_modules/astro/dist/integrations/hooks.js:128–129`. Su `astro:build:done` recorre secuencialmente ese array en las líneas 460–476. El orden real es adapter, integraciones del proyecto, sitemap, F1 y proyección añadida después de F1. El probe exitoso acredita generación posterior a sitemap/F1; no acredita la precedencia imposible que exige la SDD.

**Bloqueo:** el ejecutor no puede satisfacer simultáneamente el orden contratado y la integración permitida en `astro.config.mjs` sin alterar el orden del framework o incumplir la norma. La afirmación factual del snapshot sostiene el mismo supuesto incorrecto.

**Corrección mínima al arquitecto:** exigir proyección después de F1, reconociendo que el adapter ya ejecutó su hook primero; retirar «antes del adapter». Corregir la descripción factual del snapshot y su manifest conservando la procedencia del probe. Mantener las comprobaciones del config compilado y dry-run. No hace falta cambiar framework, producto, ownership ni el patch exploratorio para resolver este bloqueo.

## B02 — La selección JSON-LD de home admite dos principales

**Ubicación:** `docs/agent-readiness/fases/f2-contratos.md:45` permite «home WebPage/WebSite» y exige una entidad principal inequívoca, sin prioridad ni identidad específica para home.

**Evidencia:** `src/pages/index.astro:52–65` de la base y su `dist/client/index.html` contienen simultáneamente:

| Tipo | @id | url |
|---|---|---|
| WebSite | `https://cuidatuperroviejo.com/#website` | `https://cuidatuperroviejo.com/` |
| WebPage | `https://cuidatuperroviejo.com/#webpage` | `https://cuidatuperroviejo.com/` |

El HTML home contrastado tiene SHA-256 `4e33d05483812c0627846b34a841caacd0e9a54d8c22d4b6fab768860e320a8b`. Ambos candidatos cumplen los tipos permitidos y la URL canónica; ninguno declara fechas.

**Bloqueo:** el generador debe rechazar la ambigüedad o inventar una regla de prioridad no autorizada. Incluso con fechas nulas hoy, la identidad principal queda sin contrato determinista para el corpus obligatorio.

**Corrección mínima al arquitecto:** definir home principal como WebPage con `url=canonical` y `@id=canonical+#webpage`, dejando WebSite como entidad contextual. Una prioridad explícita equivalente también resuelve la ambigüedad. No modificar HTML ni JSON-LD del producto; conservar fechas nulas si la entidad seleccionada carece de ellas.

## Comprobaciones y procedencia

Los cuatro archivos del manifest de F2 coinciden con sus hashes. El inventario editorial original completo del probe tiene SHA-256 `f67346cfd97220832aeaf8cb1523d06547aa478d3d66304b7472303af29dbf56`, coincidente con `originalInventorySha256` del snapshot. El build disponible corresponde a la base indicada, con source digest `9ae2980c719838083bcfd3e0a43b4accc43bb761c0e7b564e497e0be40e2dba3`.

El probe DOM independiente usa parse5 instalado sobre los 28 HTML documentales reales: los 28 tienen exactamente un H1 y una raíz editorial según el perfil; los 16 artículos tienen un header identificable; no hay tablas con colspan/rowspan superior a uno. Se contrastaron también párrafos de hero y subárboles/avisos estáticos de las dos herramientas. La ambigüedad home se reprodujo directamente en ese HTML. No se trasladaron supuestos del spike F0.

Se contrastó el límite con Wrangler instalado: admite hasta 100 reglas y longitud de patrón hasta 100 caracteres. La regla de 98 documentos más `/api/*` y `/admin/*` es ejecutable; la base tiene 28 documentos y longitud máxima 84. Los contratos obligatorios incluyen rechazo por exceso, duplicados e inválidos, y crecimiento válido adicional.

Los contratos de B contemplan Request para ASSETS en documentos, preservación de GET/HEAD y condicionales, ETag por representación, listas/weak/*, no-store exterior y Vary: Accept sin Cache API. Los probes históricos no sustituyen la matriz obligatoria futura ni acreditan por sí solos todas las variantes condicionales o el comportamiento del CDN. Preview, CI por último HEAD, rollback B → A y promoción están separados y no requieren capacidad inventada para el blog.

Comandos reproducibles empleados (lectura/offline):

```sh
git -C /workspace/ctpv-f2-sdd status --short
git -C /workspace/ctpv-f2-sdd rev-parse HEAD 'HEAD^{tree}'
git -C /workspace/ctpv-f2-sdd diff --name-only 28bd92ecd424ff11b31e13e4a2ba499cb196a870 HEAD
git -C /workspace/ctpv-f2-sdd diff --check 28bd92ecd424ff11b31e13e4a2ba499cb196a870 HEAD
# Desde docs/agent-readiness/evidencia/f2:
sha256sum -c manifest.sha256
node /tmp/ctpv-f2-sdd-r1-dom.mjs
sha256sum /tmp/ctpv-f2-sdd-r1-dom.mjs /tmp/ctpv-f2-sdd-r1-dom.json
```

Probe independiente: `/tmp/ctpv-f2-sdd-r1-dom.mjs`, SHA-256 `405b22847e375e346766f04660720afc6599ffe87703983e52274d9bf72c5e02`. Resultado: `/tmp/ctpv-f2-sdd-r1-dom.json`, SHA-256 `0553b9a97da7326d14ea4b18fdfa93375e3056129133ea22f41e363e015706b8`.

**Cierre:** FAIL R1/2 exclusivamente por B01 y B02. Corresponde un único ciclo de corrección del arquitecto y revisión final R2/2; si esa revisión falla, STOP conforme al encargo. No queda otra comprobación bloqueante abierta.
