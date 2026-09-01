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

## Correcciones solicitadas por el revisor-coordinador

- `src/pages/index.astro` vuelve a adaptar cada entrada para `HomeRecentPosts` con `slug: post.id`. La comprobación posterior al build no encontró `/undefined`; las tres tarjetas recientes conservaron URLs con slug válido.
- `src/components/HomeRecentPosts.astro` no fue modificado.
- `src/pages/[pilar].astro` ordena explícitamente `filteredPosts` por `post.id` ascendente. La comparación de los artefactos de base y F2 mostró que el orden de base no es `datePublished` descendente: en `salud-mental-emocional-perros`, base fue `agresividad-tardia-perros-mayores-dolor`, `ansiedad-separacion-perros-senior`, `disfuncion-cognitiva-canina`, mientras F2 fue `agresividad-tardia-perros-mayores-dolor`, `disfuncion-cognitiva-canina`, `ansiedad-separacion-perros-senior`; en `higiene-hogar-perros-senior`, base fue `incontinencia-fecal-perros-senior`, `incontinencia-urinaria-perros-mayores`, mientras F2 invirtió esos dos. El orden explícito por ID reproduce el de base.
- La verificación independiente sigue sin ejecutarse en esta sesión; no se declara aprobada.
