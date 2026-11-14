# Arquitectura del artículo: fuente de verdad y límites

Referencia revisada el 2026-11-14 contra el código del repositorio. Si el stack cambia, comprobar los archivos indicados antes de copiar estos patrones. El corpus antiguo documenta historia, no reglas vigentes.

## Lo que genera el sitio

`src/pages/[pilar]/[slug].astro` usa `getCollection` y `render`; genera H1 desde `title`, hero desde frontmatter, BlogPosting/BreadcrumbList, `ArticleByline` y `AuthorNote`. El autor visible es Gonzalo desde el componente, no una firma manual del equipo. No añadir H1, hero repetida, autoría, fecha ni JSON-LD al cuerpo.

`PostReader.astro` construye TOC de H2/H3 y navegación; no duplicar índice. `SiloNavigation.astro` aporta relacionados; el cuerpo sí requiere los enlaces contextuales previstos. `<FAQ items={[{question,answer}]} />` aporta su encabezado/acordeón: no duplicar un H2 de FAQ y dejarla plegada por defecto. Si el contrato pacta cero, omitirla sin importar FAQ.

## Frontmatter

Fuente única: `src/content.config.ts`, schema `blog` estricto. Campos actuales: `title`, `seoTitle`, `metaDescription` (máximo 160), `pilar`, `keywordPrincipal`, `heroImage`, `heroImageAlt`, `heroImageCaption`, `legacyUrl`, `status`, `datePublished`, `dateModified`, `perros`. Verificar tipos y enum en ese archivo. No añadir autor, contrato, auditoría o herramientas como campos inventados.

Publicación nueva: fecha real de guardado. Revisión: conservar fecha original y registrar modificación real. `perros` solo para experiencia documentada de Luna/Dakota. No confiar en `status: Borrador`: getStaticPaths no lo usa como filtro de publicación.

## Componentes y recursos

Importar los componentes usados desde `../../components/`. AlertBox recibe `type` y `title`; FAQ usa `items`. Cantidades de cuerpo pactadas en brief 2.0, sin cuota universal; bibliografía final aparte. Nunca dejar marcadores de plantilla en contenido publicable.

Hero solo en frontmatter. Patrón de imagen de cuerpo: Markdown `![Alt fiel](/images/blog/<slug>/<archivo>.webp)` y pie en cursiva. Revisar su entrega real, responsive, dimensiones y proyección; no editar estilos globales para integrar un recurso puntual.

El pipeline actual en `astro.config.mjs` usa Satteri y `externalLinks`/`secureExternalLinksIntegration` desde `scripts/satteri-external-links.mjs`. No copiar instrucciones del antiguo rehype ni modificar configuración como parte de redacción; confirmar transformación de enlaces en HTML cuando se integre.

## Ejemplos y visuales

`examples/analisis_corpus.md` es histórico: su firma, conteo de artículos y estilo antiguo no gobiernan la entrega actual. Para visuales usar experiencias-visuales y la dirección compartida con la preferencia vigente de AGENTS sobre ilustraciones. Probar recursos reales; el build solo no demuestra uso, contraste o impresión.
