---
name: enlazado-interno-sitio
description: Analiza, ajusta y documenta el enlazado interno de Cuida tu Perro Viejo en Astro, manteniendo los silos temáticos, los puentes entre artículos y los enlaces a herramientas sin romper rutas ni mezclar cambios ajenos.
---

# Enlazado interno del sitio

Usa esta skill cuando el usuario pida revisar, mejorar, reorganizar o documentar el enlazado interno de `cuidatuperroviejo.com`. Es una skill de implementación y mantenimiento: analiza primero, cambia solo lo necesario y verifica el build.

## Arquitectura que debes preservar

- La ruta editorial es `/` → `/pilar` → `/pilar/articulo`.
- Los artículos pertenecen a un pilar mediante `entry.data.pilar` en `src/content/config.ts`.
- Los breadcrumbs se renderizan con `src/components/Breadcrumbs.astro`.
- El bloque final de relaciones de artículos se renderiza con `src/components/SiloNavigation.astro`.
- El catálogo mantenible está en `src/data/internal-links.ts`:
  - `PILAR_NAMES`: nombres visibles de los pilares.
  - `CROSS_PILLAR_LINKS`: puentes editoriales entre artículos de pilares distintos.
  - `TOOL_LINKS`: enlaces desde artículos hacia herramientas interactivas.
- Las reglas y el inventario operativo están en `docs/seo/enlazado-interno.md`.

## Método de trabajo

1. Inspecciona `src/pages/[pilar].astro`, `src/pages/[pilar]/[slug].astro`, `SiloNavigation.astro`, `Breadcrumbs.astro`, `src/data/internal-links.ts` y el inventario de contenido antes de cambiar nada.
2. Comprueba los slugs reales en `src/content/blog/*.mdx`; nunca inventes un destino ni uses un slug legacy como ruta canónica.
3. Mantén enlaces HTML normales con `href`, visibles y rastreables. El texto del enlace debe describir el destino; evita usar solo “haz clic aquí”, “ver más” o “leer artículo”.
4. Conserva la navegación jerárquica al pilar y limita las relaciones automáticas a una selección útil. No conviertas cada artículo en una lista masiva de enlaces.
5. Añade puentes entre pilares solo cuando exista una continuación natural para el lector. Prioriza relaciones como diagnóstico → manejo práctico → herramienta/calidad de vida.
6. Si una relación solo aplica a un artículo, edita `src/data/internal-links.ts` en vez de duplicar lógica en varias plantillas.
7. Para enlaces contextuales dentro de un MDX, colócalos cerca de la afirmación que amplían y usa anchors naturales, variados y precisos.
8. Actualiza `docs/seo/enlazado-interno.md` si cambian las reglas, la arquitectura o el catálogo de destinos.

## Límites y seguridad del cambio

- No cambies slugs, redirects, canonicals o sitemap como parte de una mejora de enlaces salvo que el usuario lo pida expresamente.
- No edites artículos, fuentes, frontmatter o componentes no relacionados para “aprovechar” la tarea.
- Si el árbol de Git contiene cambios previos, sepáralos y no los incluyas en el commit sin autorización explícita.
- No prometas mejoras de ranking: el objetivo es mejorar descubrimiento, contexto temático y experiencia de navegación.

## Validación

Ejecuta `npm run build` después de modificar la estrategia. Revisa que:

- Astro genera todas las rutas sin errores.
- Los destinos de `CROSS_PILLAR_LINKS` existen en `src/content/blog`.
- Las herramientas de `TOOL_LINKS` corresponden a páginas reales.
- No aparecen enlaces a slugs antiguos o inexistentes.

Consulta la documentación oficial de Google sobre [enlaces relevantes y anchor text](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) y [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) cuando debas justificar o revisar la estrategia.
