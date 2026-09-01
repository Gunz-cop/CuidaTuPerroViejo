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

## Verificación independiente

### Idéntico

- CI de GitHub y Workers Builds estaban verdes para `2b4362638a689e0b2e5d8e3fc2064126ea0213dd`.
- El diff contra `origin/migracion/astro-7` contiene únicamente archivos propios de F2 y esta evidencia; no contiene archivos protegidos.
- Se verificaron las 34 rutas HTML, sin altas, bajas ni slugs cambiados.
- La comparación HTML normalizada produjo texto visible y enlaces idénticos en las 34 páginas.
- No existen `/undefined` ni URLs HTML con `undefined`; los consumidores migrados usan `post.id`/`entry.id`.
- El orden de tarjetas de pilares coincide con la base, incluido salud mental y emocional e higiene y hogar.
- Con claves oficiales de prueba de Turnstile, el formulario aceptó interacción sintética, el POST respondió `200 {"ok":true}` y el navegador redirigió a `/gracias`.

### Diferencia aceptada

- `dist/` cambia en hashes, bundles y estructura interna de `_worker.js`: 465 archivos en la base frente a 340 en F2. Es el resultado esperado del cambio de versión, Content Layer y adaptador Cloudflare.
- Las diferencias de serialización HTML —espacios, comentarios, ubicación de scripts y nombres de assets— no cambian el contenido visible, los enlaces ni las rutas.
- El endpoint devuelve `200 {"ok":true}` para el token dummy, conforme a la lógica existente de rechazo silencioso de Turnstile en `src/pages/api/contact.ts`.

### No verificado

- No se aprobó el diff visual base/F2: la API del navegador no permitió inyectar CSS para desactivar animaciones y transiciones. El control consigo mismo de la base sí fue determinista byte a byte, pero no se interpretó el diff sin cumplir la condición solicitada.
- El iframe de Turnstile no se pudo observar en el navegador y registró el error externo `Invalid or missing type for parameter "sitekey"`. La API oficial sí respondió correctamente al token dummy mediante `curl`; ese resultado no se atribuye al iframe del navegador.

### Hallazgos

- **P2 — configuración local incompleta, preexistente y no introducida por este PR.** `src/pages/contacto.astro:8` no obtiene una sitekey en un checkout normal ni en `wrangler dev` sin configuración adicional. Arreglo exacto: proporcionar `TURNSTILE_SITE_KEY` durante el build/prerender y `TURNSTILE_SECRET_KEY` como secreto del Worker; mantener ambas fuera del commit y no usar las claves de prueba en producción.

## Correcciones solicitadas por el revisor-coordinador

- `src/pages/index.astro` vuelve a adaptar cada entrada para `HomeRecentPosts` con `slug: post.id`. La comprobación posterior al build no encontró `/undefined`; las tres tarjetas recientes conservaron URLs con slug válido.
- `src/components/HomeRecentPosts.astro` no fue modificado.
- `src/pages/[pilar].astro` ordena explícitamente `filteredPosts` por `post.id` ascendente. La comparación de los artefactos de base y F2 mostró que el orden de base no es `datePublished` descendente: en `salud-mental-emocional-perros`, base fue `agresividad-tardia-perros-mayores-dolor`, `ansiedad-separacion-perros-senior`, `disfuncion-cognitiva-canina`, mientras F2 fue `agresividad-tardia-perros-mayores-dolor`, `disfuncion-cognitiva-canina`, `ansiedad-separacion-perros-senior`; en `higiene-hogar-perros-senior`, base fue `incontinencia-fecal-perros-senior`, `incontinencia-urinaria-perros-mayores`, mientras F2 invirtió esos dos. El orden explícito por ID reproduce el de base.
- La verificación independiente sigue sin ejecutarse en esta sesión; no se declara aprobada.
