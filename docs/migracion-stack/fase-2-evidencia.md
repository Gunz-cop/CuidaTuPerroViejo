# Evidencia F2 — Astro 4 → 5

## Línea base

- Rama base: `migracion/astro-7`
- Commit inicial: `ed14710c27d31502120c5be789268754c0a793f5`
- Build base: `npx --no-install astro build`
- Artefactos base: 465 rutas registradas en `C:\Users\grcx1\AppData\Local\Temp\ctpv-f2-baseline-20260831\rutas.txt`
- Copia reproducible de `dist/`: `C:\Users\grcx1\AppData\Local\Temp\ctpv-f2-baseline-20260831\dist`

## Implementado

- Dependencias actualizadas al contrato de F2: Astro 5, adaptador Cloudflare 12 y MDX 4.
- `output` cambiado de `hybrid` a `static`.
- Colecciones migradas a Content Layer con `src/content.config.ts` y loaders `glob` con ids compatibles con los slugs existentes.
- Consumidores actualizados de `entry.slug`/`entry.render()` a `entry.id`/`render(entry)`.

## Comprobaciones locales del ejecutor

- `npm ci`: correcto.
- `npm test`: correcto.
- `npx --no-install astro check`: correcto, 0 errores; quedan hints preexistentes.
- `npx --no-install astro build`: correcto.
- `npm run types:worker`: correcto; `worker-configuration.d.ts` sin cambios de contenido.
- `npx --no-install wrangler deploy --dry-run`: correcto.
- Rutas HTML: 34 en la línea base y 34 después, sin diferencias de ruta.

## Pendiente de verificación independiente

Los peldaños 1–5 de `references/verificacion.md`, incluido el formulario de `/contacto` con `wrangler dev`, deben ser ejecutados y reportados por otra sesión. Este archivo no declara la fase aprobada.
