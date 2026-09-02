# Fase 3 — Evidencia de ejecución

## Línea base

- Rama base: `migracion/astro-7`
- Commit base: `59d11ec`
- Rama ejecutora: `codex/f3-astro6-v2`
- Worktree: `../CuidaTuPerroViejo-f3-astro6-v2`
- La línea base se regeneró desde `59d11ec` con `npx --no-install astro build`.

## Corrección Tailwind 4

- `src/styles/global.css` conserva los 11 tokens `brand-*` y elimina los 11 usos de `/ <alpha-value>`.
- `npx --no-install astro build` terminó con exit 0.
- `dist/client` contiene 34 rutas HTML.
- Búsqueda en `dist/client`: 0 ocurrencias de `<alpha-value>`.

## Criterios técnicos

- `npm ci` — exit 0.
- `npx --no-install astro check` — exit 0: 0 errores, 0 warnings, 38 hints.
- `npm test` — exit 0: 1 prueba pasada, 0 fallos.
- `npx --no-install astro build` — exit 0: 34 rutas HTML.
- `npm run types:worker` — exit 0; `git diff --exit-code -- worker-configuration.d.ts` — sin diferencias.
- `npx --no-install wrangler deploy --dry-run` — exit 0; bindings detectados: `SESSION`, `CONTACT_KV`, `EMAIL`, `CONTACT_DB`, `AI`, `ASK_LIMIT`, `ADMIN_LIMIT`, `ASSETS`.
- `npm run audit:migration -- --base origin/migracion/astro-7 --phase 3` — exit 0; 1 spec auditada.
- `locals.runtime` en `src/` — 0 ocurrencias.
- `as any` asociado a `runtime` en `src/pages/` — 0 ocurrencias.
- `@astrojs/tailwind` en `package.json` — 0; `tailwind.config.mjs` — ausente.
- Wrangler sin pin — comprobado; `devDependencies.wrangler` es `^4.128.0`.
- Archivos protegidos modificados en `origin/migracion/astro-7...HEAD` — 0.

## Checks negativos deliberados

- Binding inexistente: se añadió temporalmente `env.F3_NONEXISTENT_BINDING`; `astro check` falló con TS2339 (`Property ... does not exist on type Env`). El sabotaje fue retirado.
- Frontmatter desconocido: se añadió temporalmente `f3UnknownField` a un `.mdx`; la build falló con `Unrecognized key`. El sabotaje fue retirado.

## Rutas y ejecución local

- Línea base `59d11ec` frente a F3: conjuntos de rutas HTML idénticos, 34/34.
- `npm run preview -- --host 127.0.0.1 --port 4322` — build y servidor sobre workerd correctos; HTTP 200.
- `npm run dev -- --host 127.0.0.1 --port 4321` — servidor sobre workerd correcto; HTTP 200.
- El primer arranque concurrente de dev y preview produjo una carrera del optimizador SSR de Vite; se repitió de forma aislada y pasó. No es un fallo del código.
- Los comandos locales muestran el fallback TLS de `Request.cf` y la advertencia de bindings AI remotos; no produjeron errores ni alteraron la build.

## Verificación visual y ThemeToggle

- Navegador local operativo sobre `http://127.0.0.1:4322/`; la home cargó y la inspección visual no mostró regresión evidente.
- ThemeToggle cambió `<html>` de `js` a `js dark`, alternó los iconos y persistió el estado oscuro tras recargar.
- No se observó destello blanco durante la recarga en oscuro.
- Errores de consola después de la interacción: 0.
- No verificado: diferencias en navegadores antiguos, incluido Safari 16.4–17; el navegador disponible fue Chromium del navegador integrado.

## Diferencias aceptadas

- El CSS compilado cambia por la migración a Tailwind 4 y emite `color-mix()` para utilidades con opacidad; es el efecto esperado de reemplazar `<alpha-value>` y no una ruta o contenido nuevo.
- `astro check` mantiene 38 hints preexistentes, principalmente de Zod, scripts inline y código no utilizado; no hay errores ni warnings.

## Estado

La corrección y las verificaciones locales de esta sesión están documentadas. La evidencia no declara F3 aprobada: queda pendiente la revisión final independiente y el estado final de CI de GitHub. El PR no se fusiona.
