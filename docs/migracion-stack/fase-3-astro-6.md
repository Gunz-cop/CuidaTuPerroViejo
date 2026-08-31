# F3 — Astro 5 → 6 · la fase dura

**Proyecto:** [`README.md`](README.md) de esta carpeta — manda sobre esta spec.
**Rama base:** `migracion/astro-7` · **Depende de:** F2 **y** F1B
**Método:** skill `upgrade-astro-cloudflare`. Leé `references/saltos.md`
(sección «Astro 5 → 6») y `references/base-2026.md` **antes de empezar**.

> **Sin precedente, y con el 80 % del riesgo de toda la migración.** Aquí se
> reescribe el acceso a bindings, se abandona `@astrojs/tailwind` y muere el pin
> de wrangler. Es la fase que no conviene compartir con ninguna otra.

## Objetivo

Astro 6 con el adaptador 13, los bindings leídos por la API oficial, Tailwind 4,
y el pin de wrangler eliminado.

## Contrato de entrada

- Fase 2 fusionada en `migracion/astro-7`: Content Layer API ya migrada, las 34
  URLs verificadas sin moverse.
- **`main` fusionado en `migracion/astro-7`**, con F1A y F1B dentro. Esta fase
  reescribe los accesos a bindings de los mismos ficheros que F1B modificó: sin
  ese merge migrarías unos ficheros que ya no son los de producción.
  **Comprobalo antes de empezar** —`git log --oneline origin/main ^HEAD` tiene que
  salir vacío— y si falta, hacé el merge en un commit propio antes de tocar nada.
- `src/env.d.ts` todavía declara `App.Locals` a mano, y hay **9 accesos a
  `locals.runtime` en 7 archivos** (`api/ask.ts`, `api/feedback.ts`,
  `api/contact.ts`, `api/geo.ts`, `api/admin/contact-messages/[id].ts`,
  `admin/contact-messages.astro`, `contacto.astro`), cuatro de ellos con
  `as any`.
- `tailwind.config.mjs` con los 12 colores `brand.*` usando `<alpha-value>`, y
  las variables RGB definidas en `src/layouts/BaseLayout.astro`.

## Contrato de salida

- `astro@^6`, `@astrojs/cloudflare@^13`, `@astrojs/mdx@^6`.
- **`@astrojs/tailwind` desinstalado**, `@tailwindcss/vite` + `tailwindcss@^4` en
  su lugar, `tailwind.config.mjs` borrado.
- Cero ocurrencias de `locals.runtime` en `src/`.
- `wrangler` sin pin, `@cloudflare/workers-types` v5 o retirado.

## Archivos que posee

- `package.json`, `package-lock.json`
- `astro.config.mjs`, `tsconfig.json`
- `tailwind.config.mjs` (borrar), y el CSS global donde vaya el bloque `@theme`
- `src/layouts/BaseLayout.astro` (los tokens de color)
- Los 7 archivos con `locals.runtime`, listados arriba
- `src/env.d.ts`
- `src/content.config.ts` (solo el ajuste de Zod 4)
- `wrangler.jsonc`, `worker-configuration.d.ts`
- `docs/migracion-stack/fase-3-evidencia.md` (nuevo — el reporte)

## PROTEGIDOS

- `.github/workflows/`
- `tests/`
- `docs/migracion-stack/` salvo el fichero de evidencia propio
- `public/_redirects`, `public/_headers`
- `src/data/internal-links.ts`

## Instrucciones

**Un commit por motivo, y en este orden.** Si algo se rompe, el orden es lo que
permite saber qué lo trajo.

### 1. Astro 6 + adaptador 13

Con esto entra Vite 7, Shiki 4 y Node ≥ 22.12. `engines` se declara en la fase 4.

### 2. Bindings: de `locals.runtime` a `cloudflare:workers`

El adaptador 13 **eliminó `Astro.locals.runtime`**. La traducción:

| Antes | Después |
|---|---|
| `locals.runtime.env.X` | `env.X`, con `import { env } from 'cloudflare:workers'` |
| `locals.runtime.cf` | `Astro.request.cf` |
| `locals.runtime.ctx` | `Astro.locals.cfContext` |
| `caches` desde runtime | el global `caches` |

**Quitá los cuatro `as any` mientras lo hacés.** Son lo que impide que el
typecheck avise: con ellos puestos, un binding mal leído compila igual.

`contacto.astro` es el que se pasa por alto: no es un endpoint, solo lee
`TURNSTILE_SITE_KEY`. Está en la lista.

Después de esto, `src/env.d.ts` ya no necesita declarar `App.Locals`: el `Env`
sale de `worker-configuration.d.ts`, que CI comprueba.

> **Comprobá que el typecheck no está pasando de largo.** Meté un acceso a un
> binding inexistente a propósito y confirmá que `astro check` lo detecta. Si no
> lo detecta, el criterio no vale y hay que entender por qué antes de seguir.

### 3. Tailwind 4

`@astrojs/tailwind` no soporta Astro 6 en **ninguna** versión: no hay a qué
subir. Se desinstala y entra `@tailwindcss/vite` en `vite.plugins` de
`astro.config.mjs`.

`tailwind.config.mjs` se traduce a un bloque `@theme` en CSS. La traducción es
mecánica porque las variables RGB ya viven en `BaseLayout.astro`, pero hay dos
cosas que revisar de verdad:

- **El modo oscuro por clase** (`darkMode: 'class'`). Tailwind 4 lo configura
  distinto; el sitio tiene un `ThemeToggle` y un script anti-flash en el `<head>`
  que dependen de la clase `dark` en `<html>`.
- **La sintaxis `<alpha-value>`** de los 12 colores `brand.*`, que se usa en todo
  el sitio con opacidad (`bg-brand-primary/10`, `text-brand-muted/70`).

Este trabajo es el que más probablemente produzca diferencias visuales. El
peldaño 4 de la verificación no es opcional aquí.

### 4. Zod 4

Revisado el esquema completo: **la única construcción afectada es `.strict()`**,
que pasa a `z.strictObject`. No hay `.url()`, `.email()`, `.datetime()`,
`.nonempty()` ni `errorMap`.

**Probalo saboteando el dato:** añadí un campo no declarado al frontmatter de un
`.mdx` y confirmá que la build falla. Un `strict` que dejó de ser estricto no da
ningún error: relaja la validación en silencio.

Comprobá además que no aparece un `import { z } from 'zod'` directo en ningún
script: Astro empaqueta su propio zod para `astro:content`, y dos majors
conviviendo validan el mismo contenido con reglas distintas.

### 5. Soltar el pin de wrangler

El adaptador 13 deja de depender de `@cloudflare/workers-types`. Quitá el `~` de
`wrangler` en `package.json` y subí a la última 4.x.

`@cloudflare/workers-types` se puede retirar aquí, y **hay un motivo concreto
para hacerlo**: declara su propio `interface Element` (el de HTMLRewriter) que se
fusiona con el del DOM y rompe código de cliente. La fase 0 lo esquivó con
`appendChild` en `src/pages/asistente-ia.astro`; si el paquete sale, revisá ese
comentario y valorá volver a `append`.

### 6. `astro dev` sobre workerd

Con el adaptador 13, `astro dev` y `astro preview` corren sobre **workerd real**
vía `@cloudflare/vite-plugin`. Los bindings dejan de ser una simulación. Es un
cambio de flujo de trabajo, no solo de versiones: comprobá que el desarrollo
local sigue siendo usable y **actualizá el `README.md`** si el comando o el
comportamiento cambian.

## Fuera de alcance

- **Astro 7, Sätteri y `compressHTML: 'jsx'`.** Es la fase 4.
- **TypeScript 7.** Es la fase 4, en su propio commit.
- **`imageService` y retirar el pipeline manual de imágenes.** Después de la 4.
- **Cualquier cambio de diseño.** Si el peldaño 4 encuentra una diferencia
  visual, se arregla para que **vuelva a ser igual**, no para que quede mejor.

## Criterios de aceptación

- [ ] `npm ci` sale 0
- [ ] `npx --no-install astro check` sale 0
- [ ] `npm test` sale 0
- [ ] `npx --no-install astro build` sale 0
- [ ] `npm run types:worker && git diff --exit-code -- worker-configuration.d.ts` sale 0
- [ ] `npx --no-install wrangler deploy --dry-run` sale 0
- [ ] `grep -rn "locals.runtime" src/` **no devuelve nada**
- [ ] `grep -rn "as any" src/pages/ | grep -i runtime` **no devuelve nada**
- [ ] `grep -c "@astrojs/tailwind" package.json` da 0, y `test ! -f tailwind.config.mjs`
- [ ] `node -e "const p=require('./package.json');process.exit(/^[~=]|^\d/.test(p.devDependencies.wrangler)?1:0)"` sale 0 (wrangler sin pin)
- [ ] Las mismas 34 páginas HTML en las mismas rutas que la línea base
- [ ] `git diff --name-only origin/migracion/astro-7...HEAD` no contiene ningún archivo de PROTEGIDOS
- [ ] `[manual]` Un acceso a un binding inexistente hace fallar `astro check`
- [ ] `[manual]` Un campo no declarado en el frontmatter de un `.mdx` hace fallar la build
- [ ] `[manual]` El modo oscuro funciona: alternar el `ThemeToggle` cambia el tema y no hay destello blanco al recargar en oscuro
- [ ] `[manual]` Peldaños 1 a 5 de `references/verificacion.md`, corridos por **otra sesión**, con el reporte en `docs/migracion-stack/fase-3-evidencia.md`. **El peldaño 4 (píxeles) es obligatorio en esta fase**

## Riesgos conocidos

- **Tailwind 4 cambia el CSS.** Es lo más probable que produzca diferencias
  visuales de toda la migración. Para atribuirlas, construí con Tailwind 3 y con
  4 **sobre el mismo Astro** y difeá esos dos, en vez de comparar contra la línea
  base y mezclar causas.
- **La reescritura de bindings no falla en build, falla en producción.** Un
  binding mal leído da `undefined` y el endpoint degrada en silencio: los
  endpoints de este sitio están escritos para no romperse (`/api/contact`
  devuelve `ok` incluso cuando falla). Los criterios manuales con `wrangler dev`
  son la única red.
- **`astro dev` sobre workerd puede romper el desarrollo local** sin romper la
  build. Si pasa, reportalo: es información, no un fallo tuyo.
- **La fase es grande.** Si al terminar el diff es irrevisable, el orden de los
  commits es lo que la salva. No mezcles trabajos en un commit.
