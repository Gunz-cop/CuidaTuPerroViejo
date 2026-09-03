# Microblogging — migración Astro 4 → 7

**Borrador — no publicado.** Material corto derivado de los dos artículos largos
(`01-migrar-astro-4-a-7-sobre-cloudflare-workers.md`,
`02-de-worker-monolitico-a-runtime-aislado.md`) y del
`postmortem-astro-4-a-7.md`. Ninguna cifra ni incidente aquí está inventado:
todo remite a un archivo o PR citado en el postmortem.

---

## 10 posts cortos para LinkedIn

Rotar el gancho; no repetir la misma frase de apertura ni el mismo cierre en
dos posts seguidos.

1. "El build pasa en verde" no dice nada sobre si el sitio se ve igual que
   antes. Lo aprendí migrando un sitio real de Astro 4 a Astro 7 sobre
   Cloudflare Workers: el bug que más me costó encontrar vivía un nivel por
   debajo del compilador, en cómo Tailwind 4 resuelve `line-height` en
   variantes responsive.

2. Un Worker de 2.6 MB para servir un sitio de contenido estático. La causa:
   un endpoint importaba la colección completa del blog —cuerpo de cada
   artículo incluido— solo para poder responder preguntas sobre el contenido.
   La solución no fue optimizar el import: fue prerenderizarlo y servirlo
   como asset.

3. El hallazgo de seguridad más serio de mi última migración no estaba en el
   código de autenticación. Estaba en el middleware de caché: una respuesta
   sin `Cache-Control` explícito podía quedar guardada en una caché
   compartida entre visitantes, saltándose la verificación de credenciales.

4. Migrar KV a D1 para un contador de feedback no fue por rendimiento: fue
   porque KV admite del orden de una escritura por segundo por clave, y dos
   votos simultáneos se pisaban entre sí. Un UPSERT atómico resolvió eso y la
   deduplicación a la vez.

5. Nunca verifiques un side effect de producción leyendo el código. Un hook
   `postbuild` en `package.json` disparaba llamadas a APIs de indexación
   externas — la única forma de saber si corría de verdad, y con qué
   comando, fue leer el dashboard del proveedor de hosting.

6. En tres fases de una migración de versiones, tres bloqueos distintos para
   verificar visualmente: una API que no dejaba desactivar animaciones, un
   navegador que bloqueaba el acceso a los servidores locales, y un control
   de determinismo que no daba cero. Ninguna fase inventó un resultado para
   compensar.

7. Un major por PR. No por dogma: porque si dos majors se rompen a la vez, no
   hay forma de saber cuál lo trajo. La regla más simple de toda la migración
   fue también la más barata de justificar cuando algo salió mal.

8. Content Layer API cambió `entry.slug` por `entry.id` en toda la colección
   de contenido. Un componente se quedó leyendo el nombre viejo porque no
   era propiedad de la fase que hacía el cambio. La solución correcta no fue
   tocarlo igual: fue un shim documentado y un issue abierto, cerrado dos
   semanas después por quien sí era dueño del archivo.

9. Paralelizar dos fases de una migración no salió de que las tareas fueran
   independientes en teoría. Salió de tres decisiones de diseño explícitas
   sobre qué archivo toca cada fase, verificadas con `git diff --name-only`
   contra una lista, no con buena voluntad.

10. Safari 16.4–17 quedó sin verificar visualmente en la última fase de mi
    migración de Astro, pese a que una de las correcciones apuntaba
    justamente a ese rango de versiones. Lo documenté como limitación, no
    como "probablemente está bien". Ese "probablemente" es el que después
    aparece como ticket de soporte.

## 10 posts cortos para Mastodon / X

Formato más breve, tono más directo, uno o dos por tema.

1. "El build pasa" ≠ "se ve igual que antes". Aprendido migrando Astro 4→7
   sobre Cloudflare Workers, un salto a la vez.

2. Worker de 2.6MB porque un endpoint importaba el blog completo para
   responder preguntas sobre su contenido. Prerenderizar el catálogo lo
   bajó a menos de 500KB.

3. El bug de seguridad más serio no estaba en el auth: estaba en el
   middleware de caché cacheando una respuesta que nunca debió cachearse.

4. KV: una escritura por segundo por clave. Dos votos simultáneos se pisan.
   D1 + UPSERT atómico + dedup por hash de IP lo resolvió.

5. Nunca confirmes un side effect de build leyendo el package.json. Confirmalo
   contra el dashboard del proveedor. Un hook duplicaba una llamada externa
   y nadie lo veía en el repo.

6. Tres intentos de verificación visual, tres bloqueos distintos, cero
   resultados inventados para compensar.

7. Un major por PR. Si se rompe con dos adentro, no sabés cuál fue.

8. Content Layer cambió slug por id. Un componente ajeno a la fase se quedó
   atrás. Shim + issue documentado > tocar lo que no es tuyo.

9. El paralelismo entre dos fases de una migración se verifica con
   `git diff --name-only` contra una lista de archivos, no con confianza.

10. Safari 16.4–17 sin verificar en la última fase. Lo dije en el informe. Es
    más barato decir "no sé" que fingir que sí.

## 3 esquemas de hilo técnico

### Hilo A — "El bundle de 2.6MB"
1. El síntoma: `dist/_worker.js` pesaba 2.6MB en 189 chunks.
2. La causa: un import de `astro:content` alcanzable desde una ruta que
   corre en runtime, trayendo el cuerpo completo de 16 artículos.
3. Por qué el build no lo detectaba: compilar no es lo mismo que respetar un
   presupuesto de tamaño de bundle.
4. La solución: endpoint prerenderizado + `env.ASSETS.fetch()` con URL
   absoluta.
5. El criterio de "listo": un número (`du -sk` < 500KB), no un exit code.
6. Cierre: link al artículo 2 y al PR real.

### Hilo B — "Lo que no se pudo verificar"
1. Planteo: en una migración de tres saltos de versión, ¿qué tan seguido
   falla la verificación visual, y qué se hace cuando falla?
2. Fase 1: bloqueo de la API del navegador para desactivar animaciones.
3. Fase 2: bloqueo total de red (`ERR_BLOCKED_BY_CLIENT`) contra servidores
   locales, en todos los intentos.
4. Fase 3: capturas obtenidas, pero el control de determinismo no dio cero —
   resultado no concluyente, no negativo.
5. La regla que se mantuvo las tres veces: nunca sustituir la prueba fallida
   por una inspección de HTML o un número inventado.
6. Cierre: por qué "no verificado, documentado" es mejor dato que un check
   verde falso.

### Hilo C — "Un fast-forward no es un merge"
1. El problema: dos ramas activas (main y una rama de integración), cuatro
   fases de versión, y la necesidad de saber exactamente qué se fusionó
   dónde y cuándo.
2. El error común: confundir el SHA que reporta la API de PRs con un commit
   de merge real.
3. Cómo distinguirlos: `git log -1 --format='%P'` sobre ese SHA — un padre
   es fast-forward, dos son merge real.
4. Por qué importa: reconstruir la topología real es la única forma de saber
   qué cambio pertenece a qué fase cuando algo se rompe después.
5. Cierre: la regla que se llevó a una skill reutilizable para la próxima
   migración.

## 2 borradores de envío a Menéame

Deben declarar afiliación desde la primera línea y llevar la lección técnica
por delante, no la intención de traer tráfico.

### Envío 1

**Título propuesto:** Lo que rompe migrar un sitio Astro 4 a Astro 7 sobre
Cloudflare Workers (y lo que no se pudo verificar)

**Texto de envío:**
Aviso de entrada: soy el autor del sitio y del artículo, así que hay interés
directo — lo dejo dicho antes que nada. Es un caso de estudio técnico sobre
una migración real de cuatro saltos de versión de Astro (4→5→6→7) sobre
Cloudflare Workers, con foco en lo que un `build` en verde no garantiza:
compatibilidad de CSS entre versiones de Tailwind, tamaño de bundle de un
Worker, y verificación visual real cuando las herramientas disponibles
fallan de tres formas distintas en tres fases distintas. El artículo cita
PRs y commits concretos del repositorio, incluidas las partes que quedaron
sin verificar (Safari 16.4–17, por ejemplo) en vez de dar por buena una
migración a medias.

### Envío 2

**Título propuesto:** Un hook de build oculto duplicaba llamadas a una API
externa, y solo el dashboard del proveedor lo mostraba

**Texto de envío:**
Aviso de entrada: es mi propio proyecto y mi propio artículo, lo digo antes
de nada. La nota parte de un hallazgo concreto durante una migración de
stack: un hook `postbuild` en `package.json` disparaba indexación en APIs
externas después de cada build, y nada en el repositorio decía si eso corría
realmente en producción, cuántas veces, ni con qué configuración exacta. La
respuesta solo estaba en el dashboard del proveedor de hosting, que además
reveló que el hook se estaba ejecutando duplicado. Es un caso concreto de por
qué un side effect de producción no se puede confirmar leyendo únicamente el
código.

## Bio corta del autor

Desarrollo y mantengo `cuidatuperroviejo.com`, un sitio de contenido sobre
cuidado de perros mayores, y `fuenteai.com`, un proyecto propio de
herramientas con IA. Este es un caso de estudio técnico sobre mi propia
migración de stack, no un servicio que ofrezco a terceros.

## Divulgación corta

`cuidatuperroviejo.com` es el proyecto de caso de estudio de esta serie: es
mío, lo mantengo yo, y los commits, PRs e issues citados en los artículos son
públicos y verificables en su repositorio. No hay cliente ni tercero
involucrado en esta migración.

## Ubicación sugerida de enlaces

- **`cuidatuperroviejo.com`** — un enlace contextual por artículo largo,
  cuando se menciona el sitio migrado por primera vez (ya colocado en la
  sección "Fuentes y referencias" de ambos artículos, además de la mención
  natural en el cuerpo). No repetir el enlace dentro del mismo artículo.
- **`fuenteai.com`** — un enlace contextual, únicamente como referencia de
  autoría/proyecto propio (de dónde viene el patrón de catálogo estático en
  el artículo 2, y en la bio de este documento). No usarlo como link de
  autoridad ni repetirlo en más de un lugar por pieza.
- En los posts cortos de LinkedIn/Mastodon/X: sin enlace en el cuerpo del
  post salvo que la plataforma lo pida explícitamente; el enlace va en el
  primer comentario o en la bio, nunca como parámetro de tracking.
- En los envíos a Menéame: el enlace de destino es el artículo publicado (no
  la home de ninguno de los dos dominios), y la divulgación de afiliación va
  en el cuerpo del envío, no solo en el perfil.
