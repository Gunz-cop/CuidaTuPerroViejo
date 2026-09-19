---
name: trabajar-pilares
description: "Rediseña y mantiene pilares editoriales de Cuida tu Perro Viejo: selecciona oportunidades con datos de búsqueda, reescribe el MDX con evidencia veterinaria, actualiza el layout responsive y genera imágenes centradas antes de validar en local."
---

# Trabajar pilares editoriales

Usa esta skill cuando el usuario pida mejorar, reescribir, rediseñar o continuar un pilar del sitio. No sustituye a `redactar-articulo-blog`: los pilares son páginas hub con layout propio, navegación por intención y enlaces hacia artículos satélite.

## Alcance y reglas

- Lee `AGENTS.md` y, antes de tocar configuración, estilos globales o el stack, `docs/migracion-stack/README.md`.
- Inspecciona `src/content/pilares/`, `src/pages/[pilar].astro`, `src/data/internal-links.ts`, `docs/seo/enlazado-interno.md` y los slugs de artículos relacionados antes de editar.
- Si existe un export de Search Console, úsalo para elegir el siguiente pilar. Registra impresiones, clics y posición de las rutas canónica y legacy; prioriza una oportunidad real y explica el criterio.
- Para afirmaciones de salud, nutrición o conducta, consulta fuentes veterinarias oficiales o literatura primaria. Enlaza las fuentes que respaldan la afirmación, evita diagnosticar y distingue orientación general de consulta veterinaria.
- Mantén el cambio acotado al pilar. No modifiques estilos globales ni archivos de configuración sin leer la spec de migración y justificarlo.

## Arquitectura de contenido

Organiza el pilar para responder primero a la intención principal: hero claro, propuesta de valor, CTA, señales rápidas, índice, secciones accionables, enlaces contextuales a satélites, preguntas frecuentes y bloque de fuentes. Mantén IDs de sección estables y comprueba que el índice coincida con ellos.

El frontmatter debe conservar el esquema real del contenido, incluir `heroImage`, `heroImageAlt`, `dateModified` y la URL legacy cuando exista. Revisa canonical, metadatos, breadcrumbs, enlaces internos y cualquier componente Astro usado por el resto de los pilares.

## Imágenes centradas

La imagen hero es una regla de calidad: la composición debe ser horizontal 16:9, con el sujeto y la información visual importante centrados dentro del 60% central del lienzo. No pongas caras, comederos, objetos ni texto cerca de los bordes. Esto evita que el recorte desktop desplace el contenido aunque el recuadro sea más estrecho; la composición debe seguir viéndose bien en mobile.

- Genera o edita imágenes con la skill `imagegen` y revisa visualmente cada resultado.
- Exporta la hero y las imágenes inline en WebP con variante de 400 px cuando el componente la use.
- Usa alt descriptivo, dimensiones explícitas, `srcset`/lazy loading según el componente y `object-position: center center` para la hero.
- Mantén la misma regla de zona segura para la primera imagen de cada pilar y para las imágenes inline.

## Implementación y verificación

1. Implementa el contenido en `src/content/pilares/<slug>.mdx` y reutiliza o amplía el patrón de `src/pages/[pilar].astro` sin duplicar lógica innecesariamente.
2. Comprueba responsive, contraste, foco de teclado, targets táctiles de al menos 44 px, ausencia de scroll horizontal y legibilidad de tablas, alertas y detalles.
3. Ejecuta `npm run check` y `npx astro build`. Trata los errores como bloqueantes; documenta warnings existentes que no pertenezcan al cambio.
4. Levanta un servidor local (`npx astro dev` o `npx astro preview` después del build), abre la ruta y revisa desktop y mobile. Si Astro dev queda en un estado HMR inconsistente, reinícialo o usa preview del build, y verifica HTTP 200.
5. Entrega la URL local y un resumen de lo que cambió para que el usuario lo revise.

Nunca hagas `git push`, despliegues ni promociones a producción automáticamente. Espera la confirmación explícita del usuario después de la revisión local; solo entonces prepara commit y push según la rama y las reglas del repositorio.
