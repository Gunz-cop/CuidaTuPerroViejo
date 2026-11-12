# Países en español: cambio de presentación

`fix/admin-paises-es`, creada desde main después del PR #170. Sin merge.

Solo cambia el rótulo de cada país al renderizar `AdminAudience.astro` mediante
`countryName()` y `new Intl.DisplayNames(['es'], { type: 'region', fallback: 'none' })`.
El fallback `none` permite conservar el código original cuando no hay un nombre.
Vacío → «Sin país»; XX y códigos inválidos como T1 conservan el original. ZZ,
marcador de región desconocida de CLDR, también conserva el código. Las entradas
que ya tengan «Sin país» pasan sin cambios. La consulta, los valores, el orden,
la caché y las filas históricas no se modifican; no hay cambios de versión de
consulta, cron, GraphQL, migración o bindings.

No se incluye la opción de agrupar la app Android de Google: requiere autorización
adicional del propietario.

## Evidencia local

- `npx tsx --test tests/admin-country-name.test.ts tests/admin-audience.test.ts`:
  14 tests correctos. Incluyen nombres válidos, desconocidos/vacíos y conservación
  de orden, valores y códigos originales.
- `npx astro build`: correcto. `npx astro check`: cero errores y advertencias;
  82 hints anteriores del proyecto.
- Wrangler 4.128.0, adaptador Astro Cloudflare y workerd local, con la misma
  compatibility_date del Worker (2026-05-23). La tarjeta se consultó por HTTP
  autenticado local y se comprobó que el HTML **ya contiene** España, Costa Rica,
  Estados Unidos y México. No es una traducción ejecutada por el navegador.
- Chromium con JavaScript del navegador desactivado: 390×844 móvil y 1440×1000
  escritorio, claro y oscuro; misma secuencia de etiquetas y valores esperados,
  sin desbordamiento horizontal. Capturas de solo la tarjeta en
  `capturas-paises/`; resultados en `paises-runtime-evidencia.json`.
- Las capturas usan fixtures sintéticas, incluidos XX, T1, vacío y ZZ. No son
  cifras reales de audiencia. El preview y la caché de pruebas son locales;
  no se ejecutó archive ni se escribieron datos en D1 de producción.

No se ejecutó esta nueva presentación en el Worker desplegado: solo se entrega
un PR. La aprobación visual previa en Safari corresponde a la fase 2 publicada;
estas capturas nuevas son de Chromium local, no de Safari ni de un iPhone físico.

## Recuperación inicial

El procedimiento separado está en
[recuperacion-inicial-procedimiento.md](recuperacion-inicial-procedimiento.md).
Contiene comprobaciones reales de solo lectura, la cobertura calculada con el
notOlderThan observado y la vía propuesta para invocar el mismo archive() del
cron. Su ejecución requiere la autorización posterior del propietario.
