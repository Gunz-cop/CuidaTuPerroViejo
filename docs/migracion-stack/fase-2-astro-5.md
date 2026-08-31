# F2 — Astro 4 → 5

**Proyecto:** [`README.md`](README.md) de esta carpeta — manda sobre esta spec.
**Rama base:** `migracion/astro-7` · **Depende de:** F1A
**Método:** skill `upgrade-astro-cloudflare`. Leé
`references/saltos.md` (sección «Astro 4 → 5») **antes de empezar**: las rupturas
generales del salto están ahí y no se repiten aquí.

> **Se ejecuta en paralelo con F1B.** Las dos no comparten un solo fichero:
> aquella posee `src/pages/api/` y `src/pages/admin/`, esta posee la
> configuración, las colecciones y las páginas de contenido. **No toques
> `src/pages/api/` ni `src/pages/admin/`**, ni siquiera para un arreglo obvio: se
> pierde el paralelismo y aparece un conflicto.
>
> **Este salto no tiene precedente en ninguno de estos repos.** Presupuestalo
> como territorio nuevo. La guía de Astro dice qué cambia, no qué se rompe aquí.

## Objetivo

Dejar el sitio en Astro 5.x con la Content Layer API, sin que se mueva una sola
URL. El pin de `wrangler@~4.107.0` **sigue puesto** al terminar esta fase: el
adaptador 12 aún arrastra `@cloudflare/workers-types` v4.

## Contrato de entrada

- La compuerta de CI en verde sobre `main`, con `astro check`, `npm test` y los
  tipos del Worker.
- Fase 1A fusionada. **F1B puede estar en curso o ya fusionada**: es indiferente
  para esta fase, porque no comparten ningún fichero.
- Línea base regenerable desde `ac7a9bb` (ver README).

## Contrato de salida

- `astro@^5`, `@astrojs/cloudflare@^12`, `@astrojs/mdx@^4`.
- `src/content.config.ts` con `loader: glob()`, y `src/content/config.ts`
  borrado.
- `output: 'static'`.
- Las mismas 34 páginas HTML, en las mismas URLs.

## Archivos que posee

- `package.json`, `package-lock.json`
- `astro.config.mjs`
- `src/content.config.ts` (nuevo) y `src/content/config.ts` (borrar)
- `src/pages/[pilar].astro`, `src/pages/[pilar]/[slug].astro`
- `src/components/SiloNavigation.astro`
- `src/lib/assistant/catalog.ts`
- `src/pages/index.astro`
- `src/env.d.ts`, `tsconfig.json`
- `worker-configuration.d.ts` (regenerar si cambia `wrangler.jsonc`)
- `docs/migracion-stack/fase-2-evidencia.md` (nuevo — el reporte)

## PROTEGIDOS

- `.github/workflows/`
- `tests/`
- `docs/migracion-stack/` salvo el fichero de evidencia propio
- `public/_redirects`
- `src/data/internal-links.ts`
- `public/_headers`, `src/middleware.ts` (son de la fase 1)

## Instrucciones

**Un commit por motivo.** Nunca dos majors en el mismo PR.

### 1. `output: 'hybrid'` → `'static'`

Astro 5 eliminó `hybrid` y lo convirtió en el comportamiento por defecto de
`static`. Los ocho `export const prerender = false` siguen valiendo igual. El
`prerender = true` de `src/pages/contacto.astro` pasa a ser redundante: quitalo.

### 2. Content Layer API

Es el trabajo de fondo de esta fase. Mové `src/content/config.ts` a
`src/content.config.ts` y añadí `loader: glob()` a las dos colecciones (`blog`,
`pilares`).

**Existe un escape, `legacy.collections`, y esta spec lo prohíbe.** Astro 6 lo
elimina, así que usarlo solo aplaza el trabajo un salto y hace la fase 3 más
grande.

Lo que cambia en el consumo, en los cinco sitios que lo usan:

| Antes | Después |
|---|---|
| `entry.slug` | `entry.id` |
| `await entry.render()` | `await render(entry)`, importando `render` de `astro:content` |

**El riesgo real está en `getStaticPaths`.** `src/pages/[pilar]/[slug].astro` y
`src/pages/[pilar].astro` construyen las rutas desde `entry.slug`. Con `glob()`,
`id` incluye por defecto la ruta relativa del fichero. Si el `id` no sale
idéntico al `slug` anterior, **cambian todas las URLs del sitio**, que es lo más
caro que puede salir mal aquí. Configurá el `glob()` (con `base` y `generateId`
si hace falta) hasta que coincidan, y comprobalo con el criterio de rutas.

`src/components/SiloNavigation.astro` deriva su prop de
`CollectionEntry<'blog'>['data']['pilar']`; eso sigue funcionando, pero también
usa `post.slug` en el filtro.

### 3. Adaptador 12 y el resto de dependencias

`@astrojs/cloudflare@^12` (peer `astro ^5.7`) y `@astrojs/mdx@^4`.
`@astrojs/tailwind` **se queda como está** en esta fase: soporta Astro 5. Se
sustituye en la fase 3, que es donde deja de haber salida.

`wrangler` no se toca: el pin muere en la fase 3.

### 4. Tipos

Astro 5 mueve los tipos de `src/env.d.ts` a `.astro/types.d.ts`, con `include` y
`exclude` en `tsconfig.json`. `src/env.d.ts` declara hoy `App.Locals` a mano:
**conservá esa declaración** —la migración de bindings es la fase 3— pero
adaptala a la forma que pida Astro 5.

### 5. Lo que hay que revisar aunque no falle

- `security.checkOrigin` pasa a estar **activo por defecto**. El formulario de
  `/contacto` hace POST a `/api/contact`: comprobalo con el criterio manual.
- Los `<script>` ya no se elevan. Hay **20 bloques inline en 12 archivos**;
  ninguno está renderizado condicionalmente, así que no debería cambiar nada,
  pero es lo que el peldaño 5 de la verificación tiene que confirmar.
- Falta `<meta charset>` explícito en el layout si Astro 5 deja de inyectarlo en
  las páginas MDX. `src/layouts/BaseLayout.astro` ya lo tiene.

## Fuera de alcance

- **Tailwind 4 y `@tailwindcss/vite`.** Es la fase 3.
- **Migrar `locals.runtime`.** Es la fase 3.
- **Soltar el pin de wrangler.** No se puede: el adaptador 12 sigue dependiendo
  de `@cloudflare/workers-types` v4.
- **Cualquier cambio de contenido, de estilos o de UX.**

## Criterios de aceptación

- [ ] `npm ci` sale 0
- [ ] `npx --no-install astro check` sale 0
- [ ] `npm test` sale 0
- [ ] `npx --no-install astro build` sale 0
- [ ] `npm run types:worker && git diff --exit-code -- worker-configuration.d.ts` sale 0
- [ ] `npx --no-install wrangler deploy --dry-run` sale 0
- [ ] **Las URLs no se mueven.** Contra la línea base regenerada desde `ac7a9bb`:
      `diff <(cd base/dist && find . -name '*.html' | sort) <(cd dist && find . -name '*.html' | sort)`
      no devuelve nada
- [ ] `grep -rn "legacy" astro.config.mjs` no devuelve `collections`
- [ ] `test ! -f src/content/config.ts`
- [ ] `git diff --name-only origin/migracion/astro-7...HEAD` no contiene ningún archivo de PROTEGIDOS
- [ ] `[manual]` El formulario de `/contacto` envía y redirige a `/gracias` con `wrangler dev`
- [ ] `[manual]` Peldaños 1 a 5 de `references/verificacion.md`, corridos por **otra sesión**, con el reporte en `docs/migracion-stack/fase-2-evidencia.md` separando idéntico / diferencia aceptada / no verificado

## Riesgos conocidos

- **`entry.id` distinto de `entry.slug`** mueve las 34 URLs. Es el riesgo número
  uno y tiene criterio propio. Si no conseguís que coincidan, **paralo y
  reportalo**: no publiques URLs nuevas para salir del paso.
- **`getCollection` con filtros** — `catalog.ts` y `index.astro` filtran por
  `data.status`. La Content Layer API cambia cuándo se evalúan los filtros;
  comprobá que siguen saliendo los mismos 23 artículos.
- **La tentación de `legacy.collections`.** Está prohibido por spec. Si la fase
  no cierra sin él, es un bug de la spec: reportalo.
