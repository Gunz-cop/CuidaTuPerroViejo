# Lo que realmente rompe al migrar Astro 4 a Astro 7 sobre Cloudflare Workers

**Borrador — no publicado.** Caso de estudio propio sobre `cuidatuperroviejo.com`.

---

"El build pasa en verde" fue la frase que más veces tuve que desconfiar de mí mismo durante esta migración. Porque es verdad, y no dice nada sobre lo que importa.

Llevaba un sitio en Astro 4.16.19 —literalmente el dist-tag `legacy` en npm— con `@astrojs/cloudflare` 11 y `wrangler` clavado a mano en `~4.107.0` porque era la única forma de que `npm ci` resolviera. Cuatro majors de distancia del estándar actual, desplegado como Cloudflare Worker pero comportándose como si fuera Pages. La migración terminó en Astro `^7.2.10` con el adaptador `@astrojs/cloudflare` `^14`, `output: 'static'`, Tailwind 4 y bindings sobre `cloudflare:workers`. En el medio hubo cuatro fases de versión, dos ramas, y bastante evidencia de que "compila" y "funciona igual que antes" son afirmaciones distintas.

## El orden importa más que la velocidad

La primera decisión fue no migrar versiones y plataforma en paralelo. La plataforma —cabeceras, rate limiting, tamaño del Worker— fue primero, porque esos arreglos son válidos en Astro 4 y sobreviven intactos a los cuatro saltos siguientes. Hacerlos antes reduce el riesgo de los que vienen después, no al revés.

La segunda fue: un major por PR. Si algo se rompe con dos majors mezclados, no hay forma de saber cuál lo trajo. Astro 4→5, 5→6 y 6→7 fueron tres PRs separados, cada uno contra una rama de integración (`migracion/astro-7`) creada específicamente para que un Astro a medio migrar no llegara nunca a producción.

Eso generó una regla menos obvia: cuando una rama de integración necesita traer cambios de `main` (porque otro trabajo de plataforma se fusionó mientras tanto), el orden es fusionar primero, verificar el merge por separado, y recién ahí seguir con la siguiente fase de versión. Si fusionás `main` en la rama de integración mientras la verificación de la fase anterior está pendiente, el verificador ve simultáneamente cabeceras nuevas, middleware distinto y otro bundle — y no puede atribuir ningún cambio a su causa. Que Git no reporte conflictos textuales al fusionar dos ramas no prueba que el resultado funcione.

## Content Layer no es solo un rename

El salto de Astro 4 a 5 trajo la Content Layer API, y con ella el cambio de `entry.slug` a `entry.id` en todas las colecciones. Suena mecánico hasta que aparece un componente que nadie tiene asignado en ninguna fase: `HomeRecentPosts.astro` seguía leyendo `post.slug`, pero no estaba en la lista de archivos de la fase que hacía la migración ni de ninguna otra. Tocarlo desde ahí habría roto el paralelismo con el trabajo de plataforma que corría al mismo tiempo sobre otros archivos.

La solución correcta no fue "totoquémoslo igual, es una línea": fue un shim documentado en el único archivo que sí era propio (`.map((entry) => ({ ...entry, slug: entry.id }))` en `index.astro`) y un issue abierto explicando por qué no se corrigió en el lugar correcto. Se cerró más tarde, cuando la fase que sí era dueña de ese componente pudo tocarlo sin pisar a nadie. El shim vivió dos semanas documentado como deuda conocida, no como parche silencioso.

## Tailwind 4 rompe cosas que ningún test detecta

El salto de Astro 5 a 6 vino con Tailwind 4, y ahí aparecieron dos roturas que ni el build ni el typecheck detectan porque están un nivel por debajo: la sintaxis `/ <alpha-value>` para opacidad configurable, que Tailwind 3 soportaba y Tailwind 4 no, y un cambio silencioso en cómo se resuelve `line-height` en las variantes responsive (`sm:`, `md:`, `lg:text-*`).

El segundo fue el más caro de encontrar: en un breakpoint concreto, un texto que medía 64px de alto en línea pasó a medir 80px — una diferencia de más de un millón de píxeles distintos en una comparación de captura completa de la página. Nada de eso falla un `astro build`. Se detecta comparando capturas reales, en un navegador real, contra la versión anterior.

## Lo que no se pudo verificar, y decirlo

Acá está la parte que normalmente no se cuenta: en ninguna de las tres fases de versión hubo una herramienta de regresión visual estable disponible. En una fase, la API del navegador no permitió desactivar animaciones para hacer la comparación determinista. En otra, el navegador bloqueó directamente el acceso a los servidores locales con `net::ERR_BLOCKED_BY_CLIENT`, en todos los intentos, con distintas URLs. En la última, sí se lograron capturas, pero el control de determinismo —comparar la base contra sí misma— no dio cero, así que la comparación contra la versión nueva no se pudo declarar concluyente. Safari 16.4–17 específicamente quedó sin verificar, pese a que una de las correcciones (un prefijo `-webkit-` para `backdrop-filter`) apuntaba justo a ese rango de versiones.

Ninguna de esas fases resolvió el bloqueo inventando un resultado. Cada evidencia dice explícitamente qué se verificó, qué se aceptó como diferencia esperada, y qué quedó sin verificar y por qué. Es más barato decir "no sé" con precisión que descubrir en producción que algo se veía distinto en Safari.

## El riesgo real no está en el código, está en el dashboard

El hallazgo que más me sorprendió no fue de Astro: fue un hook `postbuild` en `package.json` que disparaba una llamada a APIs de indexación externas después de cada build. Nada en el repo decía si ese hook corría realmente en producción, ni con qué comando exacto. La única forma de saberlo fue entrar al dashboard de Cloudflare Workers Builds y leer el build command configurado ahí — que no solo confirmó que el hook corría, sino que lo estaba duplicando: el log mostraba el runner de indexación ejecutándose dos veces por cada build.

Ese es el patrón que más generaliza de toda la migración: un side effect de producción nunca se verifica leyendo el código. Se verifica contra el sistema real que lo ejecuta.

## Fuentes y referencias

Este artículo describe una migración real sobre [`cuidatuperroviejo.com`](https://cuidatuperroviejo.com), documentada en el propio repositorio:

- `docs/migracion-stack/README.md` — spec de producto, orden de fases y decisiones cerradas con su motivo.
- `docs/migracion-stack/fase-2-evidencia.md`, `fase-3-evidencia.md`, `fase-4-evidencia.md` — evidencia de verificación de cada salto de versión, incluidas las limitaciones visuales citadas arriba.
- `docs/migracion-stack/postmortem-astro-4-a-7.md` — reconstrucción completa con SHAs y PRs citados.
- PRs [#26](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/26), [#30](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/30), [#32](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/32), [#33](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/33), [#36](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/36), [#38](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/38).

El método reutilizable de esta migración (qué rompe en cada salto, cómo verificarlo) vive en una skill separada que uso en varios proyectos con la misma base de stack, incluido [`fuenteai.com`](https://fuenteai.com), donde surgió parte del patrón de extracción de catálogo estático que menciono en el segundo artículo de esta serie.
