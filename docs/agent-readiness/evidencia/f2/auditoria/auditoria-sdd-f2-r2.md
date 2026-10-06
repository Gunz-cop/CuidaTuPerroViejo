# Auditoría independiente SDD F2 — revisión final 2/2

Fecha: 2026-10-06. **PASS**. B01 y B02 de R1 están resueltos y las correcciones no introducen otro bloqueante confirmado.

## Identidad y alcance

- SHA local fijo: `0a5390dbfa96b05b05cc4ad7df635fca5976f869`.
- SHA publicado: `b9355ea55e718017954a6f9ca0ef3f75f431f605`.
- Árbol de ambos, verificado independientemente con Git: `a2203cae0f7a0f5fe95d7dd8edd3d845ff4a29f2`.
- Base de producto: `28bd92ecd424ff11b31e13e4a2ba499cb196a870`.
- Candidato R1: `77bd611d2d0f816bd8eb3f86b22a90456be0a257`.
- Worktree `/workspace/ctpv-f2-sdd` limpio; diff local/publicado vacío. Frente a R1 cambian exactamente cinco archivos documentales, con cinco líneas reemplazadas.

Se revisaron exclusivamente el cierre de los dos bloqueantes y las regresiones relacionadas. No se modificaron producto ni SDD, ni se ejecutaron nuevos scans, solicitudes públicas, runtime, build, merge o deploy. El informe R1 permanece byte por byte con SHA-256 `ae4ed576de9b3377c2de3257d95b709106623eb7c807cfe5df6dc17e95aa3f56`.

## Cierre de bloqueantes

| Bloqueante | Resultado y evidencia |
|---|---|
| B01 — orden de hooks imposible | **PASS.** `fases/f2-lectura-markdown.md:34` exige proyección después de F1 y reconoce adapter → sitemap → F1 → proyección. `evidencia/f2/decisiones.md:8` y `plataforma.md:7` describen el mismo orden. Se retiró la precedencia imposible antes del adapter. |
| B02 — principal JSON-LD de home ambiguo | **PASS.** `fases/f2-contratos.md:45` exige exclusivamente WebPage con `url=canonical` y `@id=canonical+#webpage`; WebSite es contexto. En el DOM real de la base esta regla encuentra exactamente una entidad principal, con fechas nulas. |

B01 se contrastó de nuevo con las fuentes instaladas: Astro inserta el adapter mediante `integrations.unshift` (`node_modules/astro/dist/integrations/hooks.js:128–129`) y ejecuta los hooks secuencialmente sobre esa lista (460–476). El adapter Cloudflare puede normalizar el directorio de assets en su hook (436–458), que ahora precede a la proyección. Se conserva el contrato de comprobar configuración compilada y dry-run; la corrección no exige reordenar el framework ni editar artefactos manualmente.

B02 se contrastó offline con el resultado DOM independiente de R1. Home tiene HTML SHA-256 `4e33d05483812c0627846b34a841caacd0e9a54d8c22d4b6fab768860e320a8b`; contiene una WebPage `https://cuidatuperroviejo.com/#webpage` y una WebSite `https://cuidatuperroviejo.com/#website`. La nueva condición selecciona solo la primera. Se mantienen las reglas de fechas, metadata y exclusión de JSON-LD como prosa; no se altera HTML del blog.

## Coherencia y procedencia

Los cinco archivos cambiados son `f2-lectura-markdown.md`, `f2-contratos.md`, `decisiones.md`, `plataforma.md` y `manifest.sha256`. Las correcciones coinciden con el único ciclo autorizado; el patch exploratorio y ambos snapshots editoriales conservan sus bytes. Las cuatro entradas del manifest verifican correctamente, incluida la nueva descripción factual de plataforma.

No se conservan las frases contradictorias del orden anterior ni la selección home WebPage/WebSite en los contratos y evidencia F2 vigentes. El resto del contrato queda intacto: F2A → F2B en serie, ownership, corpus completo y goldens, generación determinista, límites de inventario/routing, ASSETS Request, Accept/HEAD/ETag/errores, no-store/Vary sin Cache API, previews, CI por HEAD, promoción y rollback. Se mantienen las conclusiones no bloqueantes de R1, sin ampliar la revisión a recomendaciones opcionales.

Comprobaciones independientes: `git status --short`, `git rev-parse` de HEAD y ambos árboles, `git diff --quiet` local/publicado, `git diff --stat`, `git diff --check` y lectura completa del diff contra R1; `sha256sum -c manifest.sha256`; hash del informe R1; búsqueda de las formulaciones corregidas; lectura de hooks instalados y filtro de la nueva identidad principal sobre el JSON DOM ya producido en R1.

La evidencia DOM reutilizada conserva sus hashes:

- `/tmp/ctpv-f2-sdd-r1-dom.mjs`: `405b22847e375e346766f04660720afc6599ffe87703983e52274d9bf72c5e02`.
- `/tmp/ctpv-f2-sdd-r1-dom.json`: `0553b9a97da7326d14ea4b18fdfa93375e3056129133ea22f41e363e015706b8`.

**Cierre:** SDD F2 PASS 2/2, sin bloqueantes pendientes. Es aprobación del contrato documental, no de una implementación F2, su CI ni su promoción. F0 PASS 3/5 y los cierres F1 no consumen ni cambian revisión. El cierre documental puede preservar ambos informes sin modificar contratos.
