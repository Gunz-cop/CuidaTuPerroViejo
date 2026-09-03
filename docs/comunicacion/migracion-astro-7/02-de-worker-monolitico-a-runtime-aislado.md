# De Worker monolítico a runtime aislado: lo que aprendí sacando un catálogo del bundle

**Borrador — no publicado.** Caso de estudio propio sobre `cuidatuperroviejo.com`.

---

`dist/_worker.js` pesaba 2.6 MB repartidos en 189 chunks. Para un sitio de contenido —16 artículos, sin backend propio de verdad— es un número que no debería existir. La causa no era exótica: un endpoint de asistente por IA (`/api/ask`) importaba una función de catálogo que a su vez leía la colección completa del blog, cuerpo de cada artículo incluido, para poder responder preguntas sobre el contenido. Como ese endpoint corre en el Worker, el bundler metía los 16 artículos completos —MDX, cuerpo, todo— dentro del bundle que se ejecuta en cada request.

El sitio es estático. Nada de ese contenido hace falta en runtime para responder una petición HTTP.

## Prerenderizar el catálogo en vez de leerlo en caliente

La solución fue extraer el catálogo a un endpoint prerenderizado (`export const prerender = true`) que genera un JSON estático en build, y hacer que `/api/ask` lo lea desde `env.ASSETS.fetch(...)` en vez de importar la función original. Una sola fuente de verdad —el JSON sale de la misma colección que genera el HTML del sitio—, pero dos momentos de ejecución completamente distintos: build time para generar el contenido, runtime para servirlo como asset estático.

El criterio de aceptación no fue "el build pasa": fue un número concreto, `du -sk dist/_worker.js` por debajo de 500 KB, y una comprobación de que ningún import de `astro:content` seguía siendo alcanzable desde una ruta que corre en el Worker. Esa distinción importa: el import puede seguir vivo por otra ruta y el sitio compilar igual. El criterio que dice si el trabajo salió bien es el tamaño del bundle, no el exit code del build.

## KV a D1: cuando "eventualmente consistente" deja de alcanzar

El sistema de feedback de artículos (útil/no útil) vivía en KV: `get` → `parseInt + 1` → `put`. Funciona hasta que dos votos llegan casi al mismo tiempo — KV admite del orden de una escritura por segundo por clave, y dos escrituras simultáneas se pisan entre sí. Tampoco había deduplicación: el mismo navegador podía incrementar el contador sin límite.

Migrar a D1 resolvió las dos cosas a la vez con una tabla y un UPSERT atómico:

```sql
INSERT INTO feedback_counts (slug, kind, n) VALUES (?, ?, 1)
ON CONFLICT(slug, kind) DO UPDATE SET n = n + 1;
```

La deduplicación se hizo con el mismo hash de IP que ya existía para otro propósito en el proyecto (no un hash nuevo, reutilizar el existente). Lo que no se hizo, y quedó explícito en el PR, fue migrar los votos que ya estaban acumulados en KV: no había acceso a la cuenta para leerlos en ese momento. Los contadores nuevos empezaron en cero, documentado como decisión aceptada, no como omisión escondida. A veces la respuesta correcta a un dato inaccesible es decir "empieza en cero" en voz alta, no inventar un número de migración plausible.

## El panel de admin y la caché que no debería existir

El hallazgo de seguridad más serio de todo el proceso: el panel de administración devolvía una respuesta 200 sin `Cache-Control`, y el middleware, sin saberlo, la guardaba en la Cache API de Cloudflare —compartida entre todos los visitantes— con `public, s-maxage=86400`. Una petición posterior sin credenciales podía recibir el panel completo desde caché, sin que la validación de autenticación llegara siquiera a ejecutarse.

El arreglo real no fue una sola línea, fueron dos defensas independientes: la página autenticada devuelve `no-store` explícitamente en su propia respuesta, y el middleware, por separado, no cachea ninguna petición que traiga cabecera `Authorization`, sea cual sea la ruta. La segunda defensa es deliberadamente redundante con la primera: no depende de que alguien recuerde mantener actualizada una lista de rutas sensibles. Se probó saboteando: quitar la ruta de la lista de exclusión y confirmar que, con las dos defensas puestas, la respuesta autenticada seguía sin cachearse.

## Indexación explícita en vez de un hook escondido

El último cambio de esta serie fue el menos técnico y el más revelador: un hook `postbuild` en `package.json` disparaba llamadas a APIs de indexación externas después de cada build, sin que nada en el repo dijera si eso corría de verdad en producción ni con qué frecuencia. La respuesta estaba en el dashboard de Cloudflare Workers Builds, no en el código: el build command real duplicaba la llamada, ejecutando el runner de indexación dos veces por build.

Se cambió el build command en el dashboard antes de tocar el código —`npx astro build && npm run sdi:run`, un paso explícito en vez de un side effect oculto en un hook npm— y solo después de confirmar ese cambio se retiró `postbuild` del `package.json`. El orden importa: cambiar el código primero habría dejado una ventana sin saber si la indexación seguía corriendo en algún lado.

## El patrón común

Ningún cambio de esta serie es realmente sobre versiones de Astro. Es sobre runtime aislado: que lo que solo hace falta en build time no viaje al Worker, que lo que necesita consistencia fuerte no viva en almacenamiento eventualmente consistente, que una respuesta autenticada no dependa de una sola capa de defensa, y que un efecto en un sistema externo se verifique contra ese sistema, no contra el repo que lo dispara.

## Fuentes y referencias

Caso de estudio real sobre [`cuidatuperroviejo.com`](https://cuidatuperroviejo.com), documentado en:

- `docs/migracion-stack/fase-1b-worker.md` — spec de los cuatro trabajos descritos aquí, con sus criterios de aceptación exactos.
- `docs/migracion-stack/postmortem-astro-4-a-7.md` — reconstrucción completa con SHAs.
- PR [#26](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/26) (caché admin, catálogo estático, rate limit, D1) y PR [#36](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/36) (retiro del hook `postbuild`).

El patrón de separar un catálogo de contenido en un endpoint estático servido por `ASSETS` en vez de importarlo en runtime lo tomé de un proyecto anterior propio, [`fuenteai.com`](https://fuenteai.com), donde resolví el mismo problema sin adaptador de Astro.
