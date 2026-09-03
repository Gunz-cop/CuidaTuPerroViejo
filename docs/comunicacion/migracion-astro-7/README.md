# Comunicación: migración Astro 4 → 7

Índice de material derivado del postmortem técnico de la migración de
`cuidatuperroviejo.com` de Astro 4 a Astro 7 sobre Cloudflare Workers. Todo el
contenido de esta carpeta son **borradores**. Nada se publicó ni se envió a
ninguna plataforma.

## Artefactos

| Archivo | Qué es | Audiencia |
|---|---|---|
| [`01-migrar-astro-4-a-7-sobre-cloudflare-workers.md`](01-migrar-astro-4-a-7-sobre-cloudflare-workers.md) | Artículo largo para LinkedIn: qué rompe realmente una migración Astro 4→7 sobre Cloudflare Workers (orden de fases, Content Layer, Tailwind 4, riesgo de producción, límites de la verificación) | Desarrolladores Astro/Cloudflare, leads técnicos evaluando una migración similar |
| [`02-de-worker-monolitico-a-runtime-aislado.md`](02-de-worker-monolitico-a-runtime-aislado.md) | Artículo largo para LinkedIn: extracción del catálogo del asistente a un asset estático, migración de feedback KV→D1 con deduplicación, endurecimiento de la caché de admin, indexación explícita en vez de hook oculto | Desarrolladores backend/edge, audiencia interesada en Cloudflare Workers concretamente |
| [`microblogging.md`](microblogging.md) | 10 posts LinkedIn, 10 posts Mastodon/X, 3 esquemas de hilo técnico, 2 borradores de envío a Menéame, bio de autor, divulgación de afiliación, ubicación de enlaces | Reutilización rápida de los dos artículos largos en formato corto |
| Este `README.md` | Índice, mapeo de fuentes, checklist de publicación | Quien decida qué publicar y cuándo |

## Resumen de afirmaciones fácticas verificadas

Todas las cifras y hechos técnicos citados en los artículos y posts remiten a
evidencia concreta en el repositorio, ya documentada en
[`../../migracion-stack/postmortem-astro-4-a-7.md`](../../migracion-stack/postmortem-astro-4-a-7.md).
Resumen de las que se citan en el material de comunicación:

- Punto de partida: Astro 4.16.19 (dist-tag `legacy`), `@astrojs/cloudflare` 11, `wrangler` clavado a `~4.107.0` — `docs/migracion-stack/README.md:13-16`.
- Destino: Astro `^7.2.10`, adaptador `^14.2.6`, `output: 'static'`, Tailwind 4, bindings vía `cloudflare:workers` — `wrangler.jsonc` en `38bdb33`, `fase-3-evidencia.md:33-35`.
- Bundle del Worker de 2.6MB en 189 chunks antes del fix, criterio de aceptación <500KB — `docs/migracion-stack/fase-1b-worker.md:106,187`.
- Vulnerabilidad de caché del panel admin y sus dos defensas — `fase-1b-worker.md:76-103`, PR #26 commit `380372f`.
- Migración de feedback KV→D1 con UPSERT atómico y deduplicación por hash de IP, contadores reiniciados en cero por falta de acceso a los valores legacy — `fase-1b-worker.md:143-165`, PR #26 commit `5b8f63d`.
- Hook `postbuild` verificado como duplicado contra el dashboard real de Cloudflare Workers Builds, antes de retirarlo del código — descripción de PR #36.
- Regresión de line-height de 64px a 80px en `lg:text-[4rem]`, 617.883/1.124.585 píxeles distintos — `fase-3-evidencia.md:14-15`.
- Limitaciones de verificación visual en las tres fases de versión (F2, F3, F4) — `fase-2-evidencia.md:46-49`, `fase-3-evidencia.md:52-73`, `fase-4-evidencia.md:60-70,94-100`.

## Mapeo de fuentes

| Tipo | Referencia |
|---|---|
| Spec de producto | `docs/migracion-stack/README.md` |
| Specs de fase | `docs/migracion-stack/fase-{0,1a,1b,2,3,4}-*.md` |
| Evidencia de ejecución | `docs/migracion-stack/fase-{2,3,4}-evidencia.md` |
| Postmortem técnico completo | `docs/migracion-stack/postmortem-astro-4-a-7.md` |
| Skill de método compartido | `~/.claude/skills/upgrade-astro-cloudflare/SKILL.md` |
| Skill repo-local de postmortem | `.agents/skills/migracion-astro-cloudflare-postmortem/SKILL.md` |
| PRs citados | [#9](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/9), [#19](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/19), [#20](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/20), [#26](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/26), [#30](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/30), [#32](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/32), [#33](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/33), [#34](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/34), [#35](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/35), [#36](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/36), [#38](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/38), [#39](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/39) |
| Tag de release | `migration-astro-7` (apunta a `00ca256`) |
| CI | `.github/workflows/ci.yml` |
| Workers Build | Verificado una vez contra el dashboard real por PR #36 (build command); estado actual del build desplegado no verificado en esta sesión — ver §18 del postmortem |

## Seguimiento sin cerrar

- **Issue [#25](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/25)** — "Quitar el shim de slug en index.astro cuando HomeRecentPosts lea entry.id". Estado: **cerrado**, PR #39, commit `ff745ab`. Se cita en el artículo 1 y en el postmortem §6/§19 como ejemplo de deuda documentada correctamente en vez de improvisada.
- **Issue [#37](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/37)** — "Actualizar referencias documentales tras retirar postbuild". Estado: **cerrado**, PR #39, commit `38bdb33`. Se cita en el artículo 2 y en el postmortem §14/§19.
- **No resuelto por este trabajo:** `docs/migracion-stack/README.md` y `AGENTS.md` siguen describiendo la migración como en curso ("Fases 1 a 4 pendientes", "las fases de versión van contra `migracion/astro-7`, nunca contra `main`") pese a que F4 ya se fusionó a `main` (PR #38). Ver postmortem §18. No se tocó en esta tarea por estar fuera del alcance permitido (specs protegidas); recomendado como sesión aparte con dueño explícito.
- **No verificado:** qué commit exacto está desplegado hoy en `cuidatuperroviejo.com` — no se accedió al dashboard de Cloudflare en esta sesión para confirmarlo contra `38bdb33`. Ver postmortem §18.

## Checklist de publicación

**Nada de esta carpeta se publica sin aprobación humana explícita, artículo
por artículo y post por post.** Antes de publicar cualquier pieza:

- [ ] Un humano leyó el artículo o post completo, no solo este índice.
- [ ] Se confirmó que ninguna cifra fue editada respecto a la fuente citada en
      "Resumen de afirmaciones fácticas verificadas" de este README.
- [ ] Se confirmó que cada enlace a `cuidatuperroviejo.com` y `fuenteai.com`
      aparece como máximo una vez por pieza, sin parámetros de tracking.
- [ ] Se confirmó la divulgación de afiliación en cualquier pieza que vaya a
      un canal de terceros (Menéame en particular).
- [ ] Se decidió explícitamente el orden y el canal de publicación (no se
      asume que "borrador listo" significa "publicar ahora").
- [ ] Ningún archivo de esta carpeta se modificó para agregar métricas,
      incidentes o resultados no documentados en el postmortem técnico.
