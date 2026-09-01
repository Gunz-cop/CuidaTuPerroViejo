# Fase 3 — Evidencia de ejecución

## Línea base

- Rama base: `migracion/astro-7`
- Commit base: `59d11ec`
- Rama ejecutora: `codex/f3-astro6-v2`
- Worktree: `../CuidaTuPerroViejo-f3-astro6-v2`
- Build de referencia: 34 rutas HTML.

## Implementado

La rama contiene seis commits, uno por motivo de la fase:

1. Astro 6, `@astrojs/cloudflare` 13 y `@astrojs/mdx` 6.
2. Bindings mediante `cloudflare:workers`, sin `locals.runtime` ni casts `as any` de runtime; `App.Locals` fue eliminado y las seis variables externas quedaron declaradas en `Cloudflare.Env`.
3. Tailwind 4 mediante `@tailwindcss/vite`, con tokens, variante oscura y variables de color conservadas; se eliminaron `@astrojs/tailwind` y `tailwind.config.mjs`.
4. Zod 4 mediante `z.strictObject`.
5. Wrangler sin pin, tipos regenerados y actualización compatible de `@astrojs/sitemap` requerida por Astro 6.
6. `astro dev` y `astro preview` sobre el adaptador Cloudflare/workerd, con bindings locales sin OAuth durante el desarrollo.

## Comprobaciones locales del ejecutor

Ejecutadas en el worktree de la rama:

- `npm ci` — correcto.
- `npx --no-install astro check` — correcto: 0 errores, 0 warnings, 38 hints.
- `npm test` — correcto: 1 suite, 1 prueba.
- `npx --no-install astro build` — correcto: 34 rutas HTML.
- `npm run types:worker && git diff --exit-code -- worker-configuration.d.ts` — correcto.
- `npx --no-install wrangler deploy --dry-run` — correcto.
- `npm run audit:migration -- --base origin/migracion/astro-7 --phase 3` — correcto.
- `npm run preview -- --host 127.0.0.1 --port 4322` — correcto; respuesta HTTP 200.
- `npm run dev -- --host 127.0.0.1 --port 4321` — correcto; respuesta HTTP 200.
- Comparación automatizada contra la línea base — 34/34 rutas HTML, conjuntos idénticos.
- Archivos protegidos modificados — ninguno.

Durante `astro check` y el build local, el plugin informó el fallback de `Request.cf` por la certificación TLS local; no produjo errores ni alteró el resultado del build. También permanecen los hints preexistentes de configuración Markdown.

## Verificación independiente

Pendiente de otra sesión. Esta evidencia no declara la fase aprobada.

Quedan por ejecutar independientemente los peldaños 1–5 de `references/verificacion.md`, incluyendo los checks de fallo deliberado para binding inexistente y frontmatter desconocido, la comprobación de bindings reales, la inspección visual de ThemeToggle/modo oscuro sin destello blanco y la revisión final del diff.

## Estado

Implementación lista para revisión independiente y CI. No se fusiona el PR ni se declara aprobada la fase desde esta sesión.
