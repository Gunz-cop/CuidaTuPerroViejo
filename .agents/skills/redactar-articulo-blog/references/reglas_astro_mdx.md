# Referencia Técnica: Qué automatiza el layout (y por qué no debes duplicarlo)

Este documento explica, componente por componente, qué genera automáticamente el sitio al renderizar un post — para que el `.mdx` no repita ese trabajo. Se basa en lectura directa del código fuente, no en suposiciones ni en las instrucciones antiguas del Gem de Blogger.

---

## 1. Título (H1) — `src/pages/[pilar]/[slug].astro`

La página del post renderiza `<h1>{entry.data.title}</h1>` directamente desde el frontmatter, junto con el badge del pilar y el subtítulo (`metaDescription`). **No escribas `# Título` al inicio del cuerpo MDX** — quedaría como un segundo H1 duplicado.

## 2. Hero Image — `[slug].astro`

El `<header>` de la página ya renderiza `heroImage`/`heroImageAlt` del frontmatter como una `<figure>` con `loading="eager"`, `fetchpriority="high"` y `srcset` responsive. Si el cuerpo del MDX vuelve a incluir esa misma imagen, `[slug].astro` inyecta CSS que la oculta (`.content-body img[src="..."] { display: none !important }`) — el resultado visual es un párrafo vacío o un salto raro en el layout. Conclusión: la hero image **solo va en el frontmatter**, nunca repetida en el cuerpo.

## 3. Tabla de Contenidos — `src/components/PostReader.astro`

`PostReader` recibe el HTML ya renderizado del MDX, escanea con regex todos los `<h2>` y `<h3>`, les inyecta un `id` (slugificado si no lo tienen) y construye dos navegaciones: una sidebar sticky en desktop y un `<details>` colapsable en mobile — con scrollspy vía `IntersectionObserver`. Esto ocurre automáticamente para **cualquier** H2/H3 del artículo. Si el redactor agrega su propio `<details>` con una lista de anclas `#seccion-x`, queda una tabla de contenidos duplicada y potencialmente desincronizada con los IDs reales que genera `PostReader`.

## 4. JSON-LD (Schema.org) — `[slug].astro`

`blogPostingSchema` se construye en el frontmatter del componente Astro (no en el MDX) con `BlogPosting` + `BreadcrumbList`, usando `entry.data.*` (título, seoTitle, metaDescription, heroImage, keywordPrincipal, datePublished) y se inyecta en el `<head>` vía `<script slot="head" type="application/ld+json">`. El redactor **nunca** debe pegar un bloque `<script type="application/ld+json">` dentro del cuerpo del MDX: en el mejor caso es redundante, en el peor genera dos schemas `BlogPosting` conflictivos para el mismo `@id`.

## 5. Artículos relacionados / "cluster cards" — `src/components/SiloNavigation.astro`

Tras el `</article>`, `[slug].astro` renderiza `<SiloNavigation currentPilar={...} currentSlug={...} />`, que hace `getCollection('blog')`, filtra los posts del mismo pilar (excluyendo el actual) y pinta un grid de tarjetas "Más guías de {pilar}". Esto sustituye por completo al antiguo snippet `cluster_cards` del Gem de Blogger — **no hace falta escribir ese bloque a mano**. Lo que sí sigue siendo trabajo manual del redactor son los **enlaces contextuales dentro de los párrafos** hacia artículos específicos del pilar (los "spokes" que define el brief), porque esos enlaces aportan anclas de texto relevantes en el punto exacto del argumento, algo que `SiloNavigation` no puede hacer por ser genérico.

## 6. Componentes disponibles en MDX

### `AlertBox.astro`
```
interface Props {
  type?: 'info' | 'warning' | 'danger'; // default: 'info'
  title?: string;
}
```
Úsalo para: notas empáticas (`info`), advertencias de seguridad/medicación (`warning`), señales de alarma clínica (`danger`). Acepta Markdown/HTML básico dentro (negritas, enlaces).

### `FAQ.astro`
```
interface FAQItem { question: string; answer: string; } // answer acepta HTML básico: <strong>, <a>
interface Props { items: FAQItem[]; title?: string; } // title default: 'Preguntas frecuentes'
```
El componente ya renderiza su propio encabezado de sección — no le antepongas un `## Preguntas frecuentes` manual.

## 7. Imágenes de cuerpo (no-hero)

En los 11 artículos publicados actualmente, el patrón consistente es Markdown simple:
```mdx
![Alt descriptivo](/images/blog/{slug}/{archivo}.webp)
*Pie de foto en cursiva.*
```
Ninguno usa `width`/`height`/`loading` explícitos en las imágenes de cuerpo (a diferencia de lo que pedían las instrucciones antiguas de Blogger). Sigue el patrón real del sitio: Markdown simple. Si en el futuro se decide reforzar anti-CLS, se puede usar `<img>` HTML con esos atributos, pero eso es una decisión de estilo a validar con el usuario, no el default actual.

## 8. Enlaces externos — `astro.config.mjs`

El proyecto usa el plugin `rehype-external-links` (`astro.config.mjs:5,63-68`), configurado con `target: '_blank'` y `rel: ['noopener', 'noreferrer']`. Esto significa que **todo enlace externo escrito en Markdown simple** (`[texto](https://...)`) recibe automáticamente esos atributos en el HTML final del build — verificado inspeccionando el DOM en producción (`prevencion-caidas-perro-mayor`, cuadro de fuentes). El redactor nunca debe añadir `target="_blank"` ni `rel="noopener"` a mano: es trabajo redundante que el pipeline ya hace por cualquier enlace que apunte fuera de `cuidatuperroviejo.com`.

## 9. Frontmatter — `src/content/config.ts`

El schema de la colección `blog` usa `.strict()`, lo que significa que **cualquier clave no declarada rompe el build**. Campos válidos:

| Campo | Tipo | Notas |
|---|---|---|
| `title` | string | Se renderiza como H1 |
| `seoTitle` | string | Usado en `<title>` y schema `headline` |
| `metaDescription` | string | Máx. 160 caracteres (validado por Zod) |
| `pilar` | enum | Ver lista exacta en `config.ts` — 7 valores válidos |
| `keywordPrincipal` | string (opcional) | Usado en meta keywords y schema |
| `heroImage` | string (opcional) | Ruta absoluta `/images/blog/...` |
| `heroImageAlt` | string (opcional) | Cae a `title` si falta |
| `legacyUrl` | string (opcional) | Solo para migraciones de contenido antiguo |
| `status` | string | Default `"Publicado"` |
| `datePublished` | string | Default `"2025-10-01"` — siempre poner la fecha real |

No agregues `author`, `publisher`, `tono`, `jsonld` ni ningún otro campo del viejo `schema_defaults.json` de Blogger: esos datos ahora están hardcodeados en `[slug].astro` (autor "Equipo Cuida a tu Perro Viejo", publisher "Cuida tu Perro Viejo") y no se leen del frontmatter.

## 10. Byline de autoría en el cuerpo (`Autoría` / `Actualizado`)

El frontmatter no tiene un campo de autor visible al lector (el JSON-LD lo resuelve solo, ver § 9), pero **8 de los 11 artículos publicados** incluyen una línea de autoría manual justo después del primer párrafo — confirmado por barrido completo del corpus en [analisis_corpus.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/redactar-articulo-blog/examples/analisis_corpus.md). El problema detectado ahí: el nombre está escrito de 5 formas distintas entre esos 8 artículos. El texto definitivo para artículos nuevos debe coincidir exactamente con el nombre que `[slug].astro:76` ya usa en el JSON-LD real:

```mdx
**Autoría:** Equipo Cuida a tu Perro Viejo · **Actualizado:** {{fecha en español}}
```
