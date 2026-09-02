# F4 — evidencia de verificación independiente

**Fecha:** 2026-09-02
**Base exacta:** `origin/migracion/astro-7@f9f2052`
**Rama:** `codex/f4-astro7`
**Commit F4 independiente:** `bd48e56856d4ea6b43b227bfd4b037d16bc066cf`
**Commit de cierre del ejecutor:** `20112448680d35b090b6a349d331984e5ca8b9fd`

La verificación independiente se ejecutó en un worktree propio, separado del
ejecutor y del worktree del revisor. El commit independiente corresponde al
estado de código equivalente de F4 antes de la reorganización final del
historial; el cierre posterior sólo separó commits, completó documentación,
refrescó el lockfile y mantuvo los cambios de código dentro del alcance F4.

## Procedimiento

Se siguieron los peldaños 1–5 de
`upgrade-astro-cloudflare/references/verificacion.md`, usando como comparación
la base exacta `f9f20524f06753ab6a7e11e56c7e2cd09eeac1bb`. Se construyeron la
base y F4 con `npx astro build`, nunca con `npm run build`. El worktree
independiente fue:

`C:\Users\grcx1\AppData\Local\Temp\ctpv-f4-verificador`

## Peldaño 1 — rutas y artefactos

- Las páginas HTML fueron **34 en la base y 34 en F4**, en las mismas rutas.
- El árbol completo cambió por hashes, chunks y artefactos del pipeline Astro 7;
  esa diferencia se considera esperada y no se filtraron directorios al hacer
  la comparación de archivos.

## Peldaño 2 — pipeline y contratos

- `npm ci`: exit 0; 455 paquetes instalados; 0 vulnerabilidades.
- `npx --no-install astro check`: exit 0; 86 archivos, 0 errores, 0 warnings,
  38 hints existentes.
- `npm test`: exit 0; 1 test pasado, 0 fallos.
- `npx astro build`: exit 0; build estático/server de Cloudflare con 34 rutas.
- `npx --no-install wrangler deploy --dry-run --outdir ...`: exit 0; 279
  archivos de assets, 1275.64 KiB de upload y 362.21 KiB gzip.
- Contrato de stack: Astro `^7.2.10`, Cloudflare `^14.2.6`, MDX `^7.0.8`,
  Sätteri `0.3.8` y `engines.node >=22.12`.
- `wrangler.jsonc` conserva `main` en
  `@astrojs/cloudflare/entrypoints/server`.
- El seguimiento local posterior confirmó que el lockfile regenerado con npm
  10 contiene `@emnapi/core@1.11.3` y `@emnapi/runtime@1.11.3`, y que `npm ci`
  pasa con ese lockfile.

## Peldaño 3 — texto renderizado y espacios JSX

Se tokenizó cada HTML con `split(/(<[^>]+>)/)`, eliminando etiquetas y bloques
`script`, `style` y `template` del texto comparado.

- Las 34 rutas conservaron el mismo texto no espacial: 34/34 fueron diferencias
  sólo de whitespace.
- En 16 rutas de artículos aparece un token espacial adicional en F4,
  consistente con los espacios JSX explícitos.
- No se detectaron diferencias de contenido textual no espacial.

## Peldaño 4 — comparación visual

- Se capturaron páginas en Chromium a 1265×8077 px.
- El control base-contra-sí-misma no fue determinista: el primer diff fue
  0.9468 % de píxeles y, tras recargar y esperar 6 segundos, 0.1015 %.
- La comparación base contra F4 registró 52.6774 %, pero no se considera
  concluyente porque el control de determinismo no fue cero y no se obtuvo una
  muestra válida de las aproximadamente 20 rutas recomendadas.

Por tanto, el peldaño 4 fue ejecutado, pero su resultado visual queda como
limitación y no prueba por sí solo ausencia de regresiones.

## Peldaño 5 — ThemeToggle, modo oscuro y consola

En Chromium conectado:

- El botón `Alternar tema oscuro y claro` contó 1 y estuvo visible.
- El clic real cambió del estado oscuro (`class="js dark"`, fondo
  `rgb(18, 20, 18)`) al claro (`class="js"`, fondo `rgb(250, 249, 244)`) y
  volvió al estado oscuro.
- Se observaron 0 errores de consola.

## Enlaces, CSS y alcance

- Se contaron 145 anchors externos en `dist/client`; 145/145 llevan `rel` con
  `noopener` y `noreferrer`.
- El CSS construido conserva 13 ocurrencias prefijadas de
  `-webkit-backdrop-filter` y 7 sin prefijo en `dist/client/_astro/*.css`.
- No se modificó contenido MDX, CI, tests, redirects, headers, enlaces internos
  ni specs protegidas. `BaseLayout.astro` sólo contiene la utilidad WebKit del
  navbar autorizada excepcionalmente en el PR por formar parte del contrato F4.
- El markup SVG preexistente incompatible con Astro 7 fue corregido eliminando
  únicamente los tres cierres huérfanos posteriores al formulario legítimo.

## Limitaciones y estado

- El diff pixelado se ejecutó en Chromium y no es concluyente por el control de
  determinismo descrito en el peldaño 4.
- **Safari 16.4–17 no queda verificado.** En particular, las capturas no prueban
  el comportamiento del prefijo WebKit en esas versiones de Safari/iOS.
- Este informe documenta evidencia y limitaciones; no declara F4 aprobada.
