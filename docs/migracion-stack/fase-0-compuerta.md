# Fase 0 — Compuerta y línea base

<!-- fase-cerrada -->

> **Qué hay en `docs/migracion-stack/`:** la evidencia de *esta* migración —
> estado de partida, decisiones con su motivo, y lo que quedó sin verificar.
> El **método** no vive aquí: vive en la skill compartida
> `upgrade-astro-cloudflare` (`Proyectos/Generalidades`), porque es el mismo para
> los ocho repos Astro pendientes. Si escribís aquí procedimiento, se reescribe
> en cada repo y diverge.

**Fecha:** 2026-08-30 · **Rama:** `chore/fase-0-compuerta` ·
**Informe que la encarga:** auditoría del stack, rev. 4.

Esta fase **no cambia el sitio**. Construye lo que permite demostrar que las
fases siguientes no lo cambiaron.

---

## Línea base

El único paso irreversible del método. Capturada **antes** de tocar nada:

| | |
|---|---|
| Commit | `1e8c3ac` (punta de `content/versionar-briefings`) |
| Ruta | `%LOCALAPPDATA%\Temp\ctpv-verif\base` |
| Contenido | `dist/` completo + `rutas.txt` + `commit.txt` |
| Volumen | 465 archivos, 34 páginas HTML, 17 MB |

La rama de trabajo se creó desde `content/versionar-briefings` y después se
rebasó sobre `main` (`d00cf4f`), para que el PR no arrastrase los 28 briefings
de contenido de `1e8c3ac`, que son trabajo aparte. La línea base sigue valiendo:
ese commit solo toca `briefings/`, `.agents/skills/` y `.gitignore`, nada que
entre en el build. **Comprobado**, no supuesto: reconstruido ya sobre `main`,
salen los mismos 465 archivos y las mismas 33 de 34 páginas idénticas.

Se construyó con `npx astro build`, **no** con `npm run build`: ese script
encadena un hook `postbuild` que envía URLs a la Google Indexing API y a
IndexNow. Mientras ese hook exista, ningún automatismo debe usar `npm run build`
(ver el hallazgo A-6 del informe; se resuelve en la fase 1).

Si la copia se pierde, es regenerable: `git worktree add` en ese commit y volver
a construir. Lo que hay que conservar es el SHA, no el directorio.

## Qué se montó

| Pieza | Detalle |
|---|---|
| `npm run check` | `astro check` — el repo declaraba `astro/tsconfigs/strict` y no lo comprobaba nadie |
| `npm test` | `tsx --test "tests/**/*.test.ts"` |
| `worker-configuration.d.ts` | generado con `wrangler types --strict-vars=false` |
| `.github/workflows/ci.yml` | ocho pasos, uno por criterio, en cada pull request |

**Dependencias añadidas:** `@astrojs/check@^0.9.10` y `typescript@^5.9.3`, ambas
declaradas y no transitivas. Toda herramienta que use un criterio va en
`package.json`, y todo paso de CI usa `npx --no-install`.

**No se añadió vitest.** El test existente es un script con asserts de nivel
superior, que es exactamente la forma que `node --test` / `tsx --test` ejecuta
sin envoltorio. `DescargasIA` ya usa ese mismo runner: cero dependencias nuevas y
los dos repos convergen.

## Lo que apareció al encender la compuerta

**19 errores de tipos ya fusionados en `main`**, en un repositorio que llevaba
meses declarándose `strict`. Es la lección esperada, comprobada aquí: sin
compuerta, quien declara cumplido un criterio es quien escribió el código.

| Clase | N.º | Qué era |
|---|---|---|
| `ts(18046)` `data` es `unknown` | 9 | `await res.json()` sin tipar, y luego acceso a propiedades |
| `ts(2339)` `dataset` no existe en `Element` | 6 | `querySelectorAll` sin parámetro de tipo |
| `ts(2345)` no asignable | 2 | colisión de tipos, ver abajo |
| `ts(2322)` unión de pilares | 1 | tipo copiado a mano que había divergido |
| `ts(7006)` parámetro `any` implícito | 1 | |

Todos estaban en scripts de cliente salvo el de la unión de pilares. Se comprobó
que **ninguno cae en un bloque `is:inline`** antes de añadir sintaxis
TypeScript: Astro no procesa esos bloques y la anotación habría roto en tiempo
de ejecución.

### Los dos que eran bugs de verdad

Al tipar las respuestas de red apareció que `data.answer` puede llegar sin
valor en una respuesta 200. El código lo pasaba tal cual a la interfaz, así que
**el chat y la página del asistente pintaban `undefined`** en ese caso. Ahora
hay un texto de repuesto.

### La colisión de `Element`

`src/env.d.ts` referencia `@cloudflare/workers-types` globalmente, y ese paquete
declara su propio `interface Element` —el de HTMLRewriter, con
`append(content: string)`— que se fusiona con el del DOM. El resultado es que
`element.append(unNodo)` no compila en código de cliente.

Se resolvió usando `appendChild`, que HTMLRewriter no declara, con el motivo
escrito en el código. **El arreglo estructural** —separar los tipos de runtime
de los de cliente, como hace `DescargasIA` con un `tsconfig` por proyecto— no se
puede aplicar igual aquí, porque en un `.astro` el código de servidor y el de
cliente comparten fichero. Revisar en la fase 3, cuando el adaptador cambie y
`@cloudflare/workers-types` desaparezca del árbol.

### La unión de pilares que había divergido

`SiloNavigation.astro` declaraba su prop `currentPilar` copiando a mano la lista
de pilares. Le faltaba `herramientas` y arrastraba
`guia-para-cuidar-tu-perro-senior`, que ya no existe en el esquema. Ahora se
deriva de la colección (`CollectionEntry<'blog'>['data']['pilar']`) y no puede
volver a divergir.

## Que la compuerta puede fallar

Un criterio que solo se ha visto pasar no se ha visto funcionar. Los tres se
probaron **saboteando el dato**:

| Criterio | Sabotaje | Resultado |
|---|---|---|
| `astro check` | un `const x: number = "texto"` | `ts(2322)`, exit 1 |
| `npm test` | un `assert.equal(1, 2)` | `fail 1`, exit 1 |
| `wrangler types --check` | renombrar un binding en `wrangler.jsonc` | «Types are out of date», exit distinto de 0 |

En Windows, el fallo de `wrangler types --check` sale con 127 por una aserción
de libuv posterior al mensaje de error. El mensaje y el fallo son correctos; en
el runner de Linux sale 1.

## Lo que solo se vio al leer el check de GitHub

La compuerta pasaba entera en local y **falló en el primer PR**, en 40 segundos,
en el paso de los tipos del Worker. Y volvió a fallar en el segundo. Es la razón
exacta por la que el criterio se verifica leyendo el check y no corriendo el
comando a mano: `worker-configuration.d.ts` resultó depender de **dos** cosas de
la máquina, y ninguna se ve desde local.

### Causa 1: el `.env` del desarrollador

`wrangler types` carga el `.env` local del desarrollador y mete sus claves en el
`Env` generado. El fichero commiteado traía seis entradas que no están en
`wrangler.jsonc`: `INDEXNOW_KEY`, `INDEXNOW_HOST`, `GOOGLE_CLIENT_EMAIL`,
`GOOGLE_PRIVATE_KEY`, `SDI_SITE_URL` y `CONTACT_DESTINATION_EMAIL`.

Dos problemas, no uno:

1. El fichero dependía de la máquina, así que `--check` no podía pasar nunca en
   CI, donde `.env` no existe porque está gitignoreado.
2. Publicaba en el repositorio **los nombres de los secretos locales**. Los
   valores no, pero los nombres tampoco tienen por qué estar.

Se resuelve con `--env-file wrangler-types.env`, un fichero vacío a propósito y
documentado en su propia cabecera. La ruta va **relativa**: `wrangler types`
escribe el comando completo en la cabecera del fichero generado, así que una
ruta absoluta vuelve a hacerlo dependiente de la máquina.

El `Env` resultante describe lo que declara `wrangler.jsonc` —`CONTACT_KV`,
`CONTACT_DB`, `EMAIL`, `AI`, `ASSETS`— y nada más, que es lo que debía describir
desde el principio.

### Causa 2: el fichero depende del build

Con el `.env` fuera, el paso siguió fallando. El `--check` de wrangler solo dice
que los ficheros no coinciden, no en qué, así que se sustituyó por regenerar y
comparar con `git diff --exit-code`. Eso puso el diff en el log del PR:

```diff
 declare namespace Cloudflare {
-	interface GlobalProps {
-		mainModule: typeof import("./dist/_worker.js/index");
-	}
 	interface Env extends __BaseEnv_Env {}
 }
```

Wrangler emite el bloque `GlobalProps` **solo cuando `main` resuelve a un fichero
que existe**. En una máquina que ya había compilado, existe; en un checkout
limpio, no. El paso estaba colocado antes del build, así que pasaba siempre en
local y fallaba siempre en CI.

La corrección es de orden, no de contenido: **el paso va después del build**.
Reproducido en local para confirmarlo — borrando `dist/` el fichero generado
pierde esas cuatro líneas; reconstruyendo, el diff vuelve a ser vacío.

Generaliza a una regla: *cualquier fichero generado que se versione y se
compruebe en CI hay que generarlo en las mismas condiciones en las que se
comprueba*. Si depende de artefactos de build, su comprobación va después del
build.

Se comparan además los contenidos con `git diff` y no con `--check`, porque
cuando falla hay que poder arreglarlo sin adivinar. `npm run types:worker` deja
el comando de regeneración, con sus banderas, en un solo sitio.

## Verificación contra la línea base

Los arreglos de tipos tocan código de cliente, así que hay que demostrar que el
sitio no cambió.

**Peldaño 1 — rutas.** 465 archivos antes y después. Las 34 páginas HTML son
exactamente las mismas. Las únicas diferencias son cinco bundles `hoisted.*.js`
renombrados —los cinco scripts de cliente que se tocaron—, un chunk de contenido
y el manifiesto. No se filtró `_astro/` de la comparación: es justo donde se ve
que el JS cambió.

**Peldaño 2 — pipeline.** Desde un `npm ci` limpio: `astro sync`, `astro check`
(0 errores sobre 306 ficheros), `npm test` (1 pass), `wrangler types --check`,
`astro build`, `wrangler deploy --dry-run` con los cinco bindings resueltos.

**Peldaño 3 — HTML renderizado.** 33 de 34 páginas byte a byte idénticas tras
normalizar el hash de los bundles. La única que difiere es `contacto.html`, en
el valor `startedAt` del formulario: es `Date.now()` del build. Se comprobó que
el script de cliente lo sobrescribe con la hora real de carga, así que no es una
regresión ni un bug latente.

**`npm ci` funciona.** Era la comprobación que faltaba cuando hubo que fijar
wrangler en `~4.107.0` a mano, y ahora corre en cada PR.

## No verificado

- **Peldaños 4 y 5** (diff de píxeles e interacción real). No se corrieron: los
  cambios son de tipos y el HTML salió idéntico. Pero este repositorio tiene
  **20 bloques de script inline en 12 archivos** —calculadora, selector de
  movilidad, chat de IA, widget de feedback, menú móvil, diálogo de cookies— y
  ninguna prueba automática los ejercita. Desde la fase 2 en adelante, cuando
  cambie el bundler, esos dos peldaños son **obligatorios**.
- **El check de GitHub.** Hasta que el workflow no corra en un PR real, lo único
  demostrado es que los comandos pasan en esta máquina. Una máquina con residuo
  de corridas anteriores no es un checkout limpio.
- **`@astrojs/check` con TypeScript 7.** Su peer es `^5 || ^6`. Al llegar a la
  fase 4 hay que comprobar si admite TS 7 o si hay que sustituirlo.

## Decisiones tomadas

| Decisión | Motivo |
|---|---|
| `tsx --test` en vez de vitest | El test ya tiene esa forma; converge con `DescargasIA`; cero dependencias nuevas |
| Arreglar los 19 errores en esta fase | Una compuerta que nace en rojo no la mira nadie. Es el modo de fallo que se quería evitar |
| Generar `worker-configuration.d.ts` pero **no** desinstalar `@cloudflare/workers-types` | `wrangler` lo recomienda, pero quitarlo ahora cambia los tipos de todo el código de cliente. Va en la fase 3, con el adaptador |
| CI llama a `astro build`, no a `npm run build` | Evita el hook `postbuild` con efectos externos, sin adelantar trabajo de la fase 1 |
| Versiones de las actions y Node 24 | Las mismas que `DescargasIA` ya tiene en verde |
