# F4 — Astro 6 → 7 · la única con mapa

**Proyecto:** [`README.md`](README.md) de esta carpeta — manda sobre esta spec.
**Rama base:** `migracion/astro-7` · **Depende de:** F3
**Método:** skill `upgrade-astro-cloudflare`. Leé `references/saltos.md`
(sección «Astro 6 → 7») **antes de empezar**.

> **Empezá leyendo los seis commits del PR #27 de `DescargasIA`**:
> `c3bd27a`, `3cc0c7e`, `adfe1b0`, `d76fd42`, `3e19ee2`, `84fc310`.
> No es documentación general: es este mismo salto, hecho por el mismo autor, con
> lo que se comprobó en cada paso y una corrección explícita de un motivo mal
> escrito. Es la única fase de esta migración con precedente.

## Objetivo

Astro 7 con el adaptador 14, la base normalizada completa, y el sitio idéntico
al de antes de la migración.

## Contrato de entrada

- Fase 3 fusionada: bindings ya en `cloudflare:workers`, Tailwind 4, wrangler sin
  pin.
- `astro.config.mjs` declara `rehype-external-links` con
  `target: '_blank'` y `rel: ['noopener','noreferrer']`. **Es el único plugin del
  proyecto** y es lo que protege los enlaces a fuentes científicas de los 23
  artículos.
- **7 usos de `backdrop-blur`** en `src/`: la barra de navegación fija, el widget
  del asistente, las dos barras `sticky` de la calculadora y del selector de
  movilidad, el diálogo de cookies y dos más.
- `@astrojs/check` está en `^0.9.10`, cuyo peer es `typescript ^5 || ^6`.

## Contrato de salida

- `astro@^7`, `@astrojs/cloudflare@^14`, `@astrojs/mdx@^7` con
  `@astrojs/markdown-satteri`.
- `main` en `wrangler.jsonc` apuntando a
  `@astrojs/cloudflare/entrypoints/server`.
- Los enlaces externos de los artículos conservan `rel="noopener noreferrer"`.
- `engines.node` declarado.

## Archivos que posee

- `package.json`, `package-lock.json`
- `astro.config.mjs`
- `scripts/satteri-external-links.mjs` (nuevo, si se elige esa vía)
- `src/components/*.astro` y `src/pages/*.astro` — **solo** los espacios inline y
  el prefijo `-webkit`
- `wrangler.jsonc`, `worker-configuration.d.ts`
- `docs/migracion-stack/fase-4-evidencia.md` (nuevo — el reporte)

## PROTEGIDOS

- `.github/workflows/`
- `tests/`
- `docs/migracion-stack/` salvo el fichero de evidencia propio
- `public/_redirects`, `public/_headers`
- `src/data/internal-links.ts`
- `src/content/blog/`, `src/content/pilares/` — **el contenido no se toca**

## Instrucciones

Un commit por motivo, siguiendo el orden del precedente.

### 1. Astro 7 y Vite 8

Quitá los flags experimentales que Astro 7 retira si los hubiera
(`rustCompiler`, `queuedRendering`, `advancedRouting`, `cache`, `logger`). En
este repo no hay ninguno hoy, pero comprobalo.

**No hay bloque `overrides` en `package.json`** — verificado. Si aparece uno que
fije `vite`, quitalo: Astro 7 depende de `vite ^8` y el pin hace el árbol
irresoluble.

El compilador Rust es más estricto: las etiquetas sin cerrar pasan a ser error.
Los 40 `.astro` y 23 `.mdx` se validan solos al compilar; no hace falta
auditarlos antes.

### 2. Sätteri y los enlaces externos

Astro 7 renderiza `.md` y `.mdx` con **Sätteri**, su pipeline nativo.
`rehype-external-links` **deja de aplicarse en silencio**: ninguna build falla, y
los enlaces a PubMed y DOIs de los 23 artículos pierden
`rel="noopener noreferrer"`.

**La vía barata, y la que usa el precedente:** un plugin **hast** propio pasado a
Sätteri, del tipo `processor: satteri({ hastPlugins: [enlacesExternos] })`. Mirá
`DescargasIA/scripts/satteri-guide-links.mjs` como referencia: son unas pocas
líneas y evita instalar `@astrojs/markdown-remark` con `processor: unified()`
solo por un plugin.

**Esto necesita un criterio automático**, porque el fallo es silencioso: contá
sobre el HTML construido que todo `<a>` con `href` externo lleva el `rel`.

### 3. `compressHTML: 'jsx'`

Astro 7 cambia el default de `true` a `'jsx'`: el espacio entre elementos inline
que venía de un salto de línea en el fuente **deja de conservarse**. En el
precedente salió como texto pegado al separador en 150 fichas y en tres
`sr-only`.

Dónde mirar en este repo, por orden: `src/components/ArticleByline.astro`,
`src/components/Breadcrumbs.astro`, y cualquier `<p>` o `<li>` con dos elementos
inline seguidos.

- En contenedores **flex con `gap`** no pasa nada: la separación la da el gap.
- En un `<p>`, `<h2>` o `<li>` normal es un **defecto real**.
- En `sr-only` no se ve, pero un lector de pantalla pierde la pausa. Cuenta.

Arreglo: espacio explícito con la expresión JSX correspondiente. **No fijes
`compressHTML: true`**, que renuncia al HTML más pequeño del nuevo default.

El peldaño 3 de la verificación existe exactamente por esto.

### 4. El prefijo `-webkit-backdrop-filter`

Vite 8 trae Lightning CSS, que deja de emitirlo. Sus targets llegan a Safari
16.4, pero `backdrop-filter` sin prefijar no existió hasta Safari 18: **en iOS
16.4 a 17 se pierde el desenfoque** en los siete elementos listados en el
contrato de entrada. Cuatro son elementos flotantes sobre contenido en móvil, en
un sitio pensado para leerse en el teléfono.

**La forma del arreglo importa, y está verificada en el precedente:**

- Dentro del mismo bloque que `backdrop-filter`, Lightning CSS borra el prefijo
  por redundante.
- En una regla aparte con el mismo selector, fusiona las dos y descarta **la que
  no lleva prefijo**, dejando a Firefox sin desenfoque.
- Lo único que sobrevive es una **utilidad de Tailwind con propiedad
  arbitraria** —`[-webkit-backdrop-filter:blur(12px)]`— que se emite en su
  propia regla.

Después del arreglo: `grep` sobre `dist/_astro/*.css` y **contar**. Lightning
CSS reescribe lo que escribís.

### 5. Adaptador 14 y `main`

`@astrojs/cloudflare@^14`, peer `wrangler ^4.125`. En `wrangler.jsonc`, `main`
pasa de `dist/_worker.js/index.js` a `@astrojs/cloudflare/entrypoints/server`.

`dist/_worker.js/index.js` es la ruta de la era de Cloudflare **Pages**, y la
v14 abandona el soporte oficial de Pages en favor de Workers. Si el adaptador
sigue emitiendo `_routes.json`, se queda en `.assetsignore` como está.

> **Este cambio afecta al despliegue.** Cloudflare Workers Builds construye desde
> `main`. Antes de fusionar la rama de integración, comprobá el
> `wrangler deploy --dry-run` y avisá en el PR de que el `main` del Worker cambió.

### 6. Lockfile y avisos

Si `npm audit` reporta algo, comprobá primero si viene de una dependencia
**transitiva** cuyo parche ya existe: en el precedente se arreglaba refrescando
el lockfile, no subiendo la dependencia directa que lo arrastraba.

### 7. TypeScript 7, en su propio commit

Opcional en este tren, pero **si se hace, va en un commit aparte** para poder
revertirlo sin arrastrar el trabajo de Astro. Es el port nativo en Go: lo que
rompe es la configuración, no el chequeo de tipos.

> **Bloqueo conocido:** `@astrojs/check@0.9.10` declara peer
> `typescript ^5 || ^6`. Comprobá si admite TS 7 o si hay una versión nueva. **Si
> no la hay, no fuerces la instalación**: dejá TypeScript en 5.9, reportalo en el
> issue, y que sea trabajo aparte. Es una salida legal.

Si se hace: comprobá que `tsc --noEmit` **no está pasando de largo**. Meté un
error de tipo a propósito y confirmá que lo detecta; el nuevo default de
`types: []` puede dejar la lista de archivos vacía y dar exit 0 sin mirar nada.

### 8. `engines`

`"engines": { "node": ">=22.12" }` en `package.json`. El CI ya corre en Node 24.

## Fuera de alcance

- **`imageService` y retirar el pipeline manual de imágenes.** Se planifica
  después de esta fase.
- **Sesiones de Astro sobre KV.** Igual.
- **`ClientRouter`.** Igual.
- **Cualquier cambio de contenido.** Los `.mdx` no se tocan; si Sätteri obliga a
  cambiar uno, **paralo y reportalo**: eso es un cambio editorial y tiene su
  propio flujo con las skills de contenido.

## Criterios de aceptación

- [ ] `npm ci` sale 0
- [ ] `npx --no-install astro check` sale 0
- [ ] `npm test` sale 0
- [ ] `npx --no-install astro build` sale 0
- [ ] `npm run types:worker && git diff --exit-code -- worker-configuration.d.ts` sale 0
- [ ] `npx --no-install wrangler deploy --dry-run` sale 0
- [ ] **Los enlaces externos conservan el `rel`.** Sobre `dist/`, todo `<a href="http…">` que apunte fuera de `cuidatuperroviejo.com` lleva `rel` con `noopener`. Cero excepciones
- [ ] **El prefijo sobrevive al build.** `grep -c "webkit-backdrop-filter" dist/_astro/*.css` da al menos 1, y `grep -c "backdrop-filter" dist/_astro/*.css` sigue dando el valor sin prefijar
- [ ] `grep -n '"main"' wrangler.jsonc` da `@astrojs/cloudflare/entrypoints/server`
- [ ] `node -e "process.exit(require('./package.json').engines?.node?0:1)"` sale 0
- [ ] Las mismas 34 páginas HTML en las mismas rutas que la línea base
- [ ] `git diff --name-only origin/migracion/astro-7...HEAD` no toca `src/content/`
- [ ] `[manual]` Peldaños 1 a 5 de `references/verificacion.md`, corridos por **otra sesión**, con el reporte en `docs/migracion-stack/fase-4-evidencia.md`. **Los peldaños 3, 4 y 5 son obligatorios**
- [ ] `[manual]` El reporte declara explícitamente que **Safari 16.4–17 no está
      verificado**: el diff de píxeles corre en Chromium y no dice nada de los
      navegadores donde muerde el prefijo perdido

## Riesgos conocidos

- **El fallo de Sätteri es silencioso.** Ninguna build falla, ningún test
  existente lo cubre, y el daño (enlaces a fuentes sin `rel`) no se ve mirando
  la página. Por eso tiene criterio automático propio.
- **El espacio de `compressHTML` es difícil de ver a ojo** y fácil de confundir
  con un falso positivo en contenedores flex. El peldaño 4 es el árbitro.
- **El prefijo CSS puede desaparecer en el arreglo mismo.** Lightning CSS
  reescribe el CSS propio; la utilidad de Tailwind es lo único que sobrevive, y
  hay que contarlo sobre el CSS construido.
- **Al fusionar `migracion/astro-7` a `main` se despliega todo de golpe.** Es el
  único momento de la migración en que producción cambia de verdad. Que la
  verificación esté completa antes, no después.
