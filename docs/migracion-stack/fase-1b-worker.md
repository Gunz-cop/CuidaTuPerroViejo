# F1B — Worker: tamaño, abuso y datos

**Proyecto:** [`README.md`](README.md) de esta carpeta — manda sobre esta spec.
**Rama base:** `main` · **Depende de:** F1A
**Método:** skill `upgrade-astro-cloudflare` (`~/.claude/skills/`)

> **Se ejecuta en paralelo con F2.** Las dos fases no comparten un solo fichero:
> esta posee `src/pages/api/` y `src/pages/admin/`, F2 posee la configuración, las
> colecciones y las páginas de contenido. Comprobalo con el criterio de
> propiedad antes de abrir el PR.

## Objetivo

Cerrar del todo la exposición del panel de administración por la caché de borde,
que el Worker deje de cargar el blog entero, que el endpoint de IA no se pueda
abusar, y que el contador de feedback deje de perder votos.

## Contrato de entrada

**F1A fusionada.** De ella dependen:

- Los bindings `ASK_LIMIT` y `ADMIN_LIMIT` declarados en `wrangler.jsonc`. Esta
  fase los **usa**; no los declara ni toca ese fichero.
- `run_worker_first` incluyendo `/api/*` y `/admin/*`.

Además ya existe:

- `src/lib/contact/security.ts` con `hashIp(ip, salt)` y la variable
  `CONTACT_IP_HASH_SALT`. **Reutilizalo**, no escribas otro hash.
- `migrations/0001_contact_messages.sql` como ejemplo del formato.
- `src/lib/assistant/catalog.ts` con `getArticleCatalog()`. **No hay que
  editarlo**: se importa tal cual.

## Contrato de salida

- `dist/api/assistant-catalog.json` generado en build, con las 23 entradas.
- `/api/ask` sin ningún import de `astro:content`, leyendo el catálogo desde
  `env.ASSETS`.
- Tabla D1 `feedback_counts` y `/api/feedback` operando contra ella, con
  deduplicación.
- El panel de administración no se puede cachear **aunque alguien quite `/admin/`
  de la lista de prefijos del middleware**.

## Archivos que posee

- `src/pages/api/assistant-catalog.json.ts` (nuevo)
- `src/pages/api/ask.ts` (editar)
- `src/pages/api/feedback.ts` (editar)
- `src/pages/api/admin/contact-messages/[id].ts` (editar — solo el rate limit)
- `src/pages/admin/contact-messages.astro` (editar — solo el rate limit)
- `migrations/0002_feedback_counts.sql` (nuevo)
- `src/middleware.ts` (editar — **solo** el trabajo 1)

**Nada más.** En particular: ni `wrangler.jsonc`, ni `package.json`, ni
`src/lib/assistant/catalog.ts`. Si creés que necesitás alguno, el bug es de la
spec: reportalo.

## PROTEGIDOS

- `.github/workflows/`
- `tests/`
- `docs/migracion-stack/`
- `public/_redirects`, `public/_headers` (son de F1A)
- `wrangler.jsonc`, `worker-configuration.d.ts` (son de F1A)
- `package.json` (es de F1A y F2)
- Todo `src/pages/` que no esté en la lista de arriba (es de F2)

## Instrucciones

Cuatro trabajos, **en este orden**: el primero cierra un problema de seguridad
en producción y por eso va delante. **Un commit por trabajo.**

### 1. Endurecer la caché de borde del panel de administración

**Sale de una revisión de F1A y va primero porque cierra un problema de seguridad
que hoy está en producción.**

El middleware cachea respuestas en la Cache API de Cloudflare, que es
**compartida entre visitantes**. Hasta F1A, `/admin/contact-messages` entraba en
ese camino: es `prerender = false`, devolvía 200 `text/html` sin `Cache-Control`,
así que el middleware le ponía `public, s-maxage=86400` y la guardaba. Una
petición posterior **sin `Authorization`** encontraba esa entrada y recibía el
panel entero —nombres, correos, mensajes, hashes de IP— sin que
`hasValidBasicAuth` llegara a ejecutarse.

F1A lo cerró añadiendo `/admin/` a la lista de rutas que no se cachean. Eso
basta hoy, pero **depende de una lista de prefijos**: la próxima ruta
autenticada que alguien añada vuelve a abrirlo. Añadí dos defensas más:

1. **En `src/pages/admin/contact-messages.astro`**, devolvé
   `Cache-Control: no-store` también en la respuesta autenticada, no solo en el
   401. Así la página se protege sola aunque el middleware cambie.
2. **En `src/middleware.ts`**, no guardes en caché ninguna respuesta a una
   petición que traiga cabecera `Authorization`, sea cual sea su ruta. Es la
   regla que no depende de acordarse de nada.

**Probalo saboteando:** quitá temporalmente `/admin/` de la lista de prefijos y
comprobá que, con las dos defensas puestas, la página **sigue sin cachearse**. Si
se cachea, la defensa no vale.

### 2. Sacar el blog del bundle del Worker

**El de más impacto.** `dist/_worker.js` pesa 2,6 MB en 189 chunks, y los
mayores son artículos completos. La causa: `src/lib/assistant/catalog.ts` llama
a `getCollection('blog')` y lee `article.body`, y `/api/ask` lo importa. Como
`/api/ask` corre en el Worker, el bundler mete el cuerpo MDX de los 23 artículos
dentro.

El sitio es estático: nada de eso hace falta en runtime.

**El patrón está probado en `DescargasIA`** (`src/pages/api/catalog.json.ts` +
`worker/agents/catalog.ts`):

1. `src/pages/api/assistant-catalog.json.ts`, **prerenderizado**
   (`export const prerender = true`), que exporta `GET`, llama a
   `getArticleCatalog()` sin modificarlo y devuelve el resultado como JSON. Se
   emite en build a `dist/api/assistant-catalog.json`.
2. `/api/ask` deja de importar `catalog.ts` y lee el JSON con
   `env.ASSETS.fetch(...)`. **La URL tiene que ser absoluta**: construila desde
   `request.url`, no con una ruta relativa.
3. Comprobá que **no queda ningún import de `astro:content` alcanzable desde una
   ruta con `prerender = false`**. Ese es el criterio que importa, no el fichero
   concreto.

Una sola fuente de verdad: el JSON sale de la misma colección que genera el HTML.

### 3. Rate limit en `/api/ask` y `/admin/*`

Los bindings ya están declarados por F1A. Llamá a `limit({ key })` con el hash
de `cf-connecting-ip` **antes de tocar el binding `AI`**, y devolvé 429 con
`Retry-After`.

Usá `hashIp` de `src/lib/contact/security.ts`: no metas la IP en claro en la
clave del rate limiter.

El límite es local a cada ubicación de Cloudflare y eventualmente consistente:
sirve para frenar abuso, no para contabilidad exacta. No lo documentes como otra
cosa.

### 4. Contador de feedback a D1

`/api/feedback` hace `get` → `parseInt + 1` → `put` sobre KV. KV es
eventualmente consistente y admite del orden de una escritura por segundo y
clave: dos votos simultáneos sobre el mismo artículo se pisan. Y no hay
deduplicación: el contador es incrementable sin límite desde el navegador.

`migrations/0002_feedback_counts.sql` con una tabla
`feedback_counts (slug TEXT, kind TEXT, n INTEGER, PRIMARY KEY (slug, kind))` y
un `UPSERT` atómico:

```sql
INSERT INTO feedback_counts (slug, kind, n) VALUES (?, ?, 1)
ON CONFLICT(slug, kind) DO UPDATE SET n = n + 1;
```

**Añadí deduplicación** con el hash de IP, que hoy no existe.

**Sobre los votos que ya están en KV:** son un número de prueba social, no un
dato de registro. Si tenés acceso a la cuenta, sembrá la tabla con los valores
actuales (`wrangler kv key list --binding CONTACT_KV` y generar los INSERT). **Si
no lo tenés, no lo inventes ni te bloquees:** dejá los contadores empezando en
cero, decilo en el PR, y anotalo como pendiente. Es una salida legal.

## Fuera de alcance

- **Cualquier cambio de versión de dependencia.**
- **Tocar `wrangler.jsonc`.** Los bindings los declara F1A. (De `src/middleware.ts`
  sí sos dueño, pero **solo** para el trabajo 1: no toques la lógica de caché de
  borde por lo demás.)
- **Nada más de F1A.** Si falta uno,
  reportalo en el issue en vez de añadirlo: romperías el paralelismo con F2.
- **Migrar `locals.runtime`.** Es la fase 3, y estos mismos ficheros se vuelven a
  tocar allí. Escribí el código nuevo con el estilo actual del fichero.
- **Retirar el KV de feedback.** Dejá la tabla nueva funcionando; limpiar las
  claves viejas es trabajo aparte.

## Criterios de aceptación

- [ ] `npm ci` sale 0
- [ ] `npx --no-install astro check` sale 0
- [ ] `npm test` sale 0
- [ ] `npx --no-install astro build` sale 0
- [ ] `npx --no-install wrangler deploy --dry-run` sale 0
- [ ] **El bundle del Worker baja de 500 KB:** `du -sk dist/_worker.js` da menos de 500
- [ ] **No queda contenido en el Worker:** `ls dist/_worker.js/chunks/ | wc -l` da menos de 40
- [ ] `test -f dist/api/assistant-catalog.json` y el JSON tiene 23 entradas
- [ ] **Propiedad de ficheros:** `git diff --name-only origin/main...HEAD` está contenido en la lista «Archivos que posee». Cualquier fichero de más rompe el paralelismo con F2
- [ ] `[manual]` Con `wrangler dev`: `/api/ask` responde 200 a una consulta normal y 429 a la petición número 11 dentro del mismo minuto
- [ ] `[manual]` Con `wrangler dev`: dos votos seguidos en `/api/feedback` para el mismo slug dejan el contador en 2, y un tercero desde la misma IP no lo incrementa
- [ ] `[manual]` **Sabotaje de la caché de admin:** quitando `/admin/` de la lista de prefijos del middleware, una carga autenticada de `/admin/contact-messages` **no** queda en caché, y una petición posterior sin `Authorization` recibe 401

## Riesgos conocidos

- **`env.ASSETS.fetch` necesita una URL absoluta.** Construila desde
  `request.url`.
- **El criterio del bundle es el que dice si el trabajo 2 salió bien**, no que la
  build pase: el import puede seguir vivo por otra ruta y el sitio compilar
  igual. Mirá el número.
- **Estos ficheros los vuelve a tocar la fase 3.** No inviertas en refactorizarlos
  más allá de lo que pide la spec: se reescriben para `cloudflare:workers`.
- **Si tocás un fichero fuera de tu lista, F2 tendrá un conflicto.** El criterio
  de propiedad no es burocracia: es lo que permite que las dos corran a la vez.
