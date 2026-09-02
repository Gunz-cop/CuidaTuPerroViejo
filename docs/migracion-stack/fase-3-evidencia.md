# Fase 3 — Evidencia de ejecución

## Línea base

- Rama base: `migracion/astro-7`
- Commit base: `59d11ec`
- Rama ejecutora: `codex/f3-astro6-v2`
- Worktree: `../CuidaTuPerroViejo-f3-astro6-v2`
- La línea base se regeneró desde `59d11ec` con `npx --no-install astro build`.

## Corrección Tailwind 4

- `src/styles/global.css` conserva los 11 tokens `brand-*` y elimina los 11 usos de `/ <alpha-value>`.
- Regresión reportada por la revisión de PR #32: en Edge real, modo oscuro y viewport 1280×900, `HomeHero` calculaba 64 px de line-height en la base y 80 px en F3 para `lg:text-[4rem]`; la comparación reportada fue 617.883/1.124.585 píxeles distintos.
- Corrección aplicada únicamente en `src/styles/global.css`: en `min-width: 64rem`, el selector generado por `lg:text-[4rem]` fuerza `line-height: 1.03`. `src/components/HomeHero.astro` no fue modificado.
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

### Idéntico

- No verificado: no se obtuvieron capturas válidas.

### Diferencia aceptada

- Ninguna diferencia visual fue aceptada en esta ejecución.

### No verificado

- La verificación independiente solicitada se intentó con Edge externo, viewport 1280×900, contra `http://127.0.0.1:4331/index.html` (base) y `http://127.0.0.1:4332/index.html` (F3); ambos accesos fueron bloqueados por el navegador con `net::ERR_BLOCKED_BY_CLIENT`.
- Se reintentó con `http://localhost:4331/index.html` y `http://localhost:4332/index.html`; ambos fueron bloqueados con el mismo error.
- Por el bloqueo no se capturaron imágenes ni hashes, no se pudo ejecutar honestamente el control base/base, la comparación por píxeles base/F3, las rutas representativas de las plantillas, ni los viewports adicionales.
- Por el mismo motivo no se pudo interactuar con ThemeToggle ni verificar modo oscuro, persistencia tras recarga, ausencia de destello blanco o consola sin errores.
- No se sustituye esta prueba por inspección visual integrada, HTML o métricas inventadas.

### Hallazgos

- El bloqueo del acceso a servidores locales en el Edge externo es el único bloqueo de esta verificación; no implica un fallo del sitio ni una regresión adicional comprobada.
- Rutas, viewport, hashes y porcentajes: sin valores porque no hubo capturas.

## Diferencias aceptadas

- El CSS compilado cambia por la migración a Tailwind 4 y emite `color-mix()` para utilidades con opacidad; es el efecto esperado de reemplazar `<alpha-value>` y no una ruta o contenido nuevo.
- `astro check` mantiene 38 hints preexistentes, principalmente de Zod, scripts inline y código no utilizado; no hay errores ni warnings.

## Estado

La corrección y las verificaciones locales de esta sesión están documentadas. La evidencia no declara F3 aprobada: queda pendiente la revisión final independiente y el estado final de CI de GitHub. El PR no se fusiona.
