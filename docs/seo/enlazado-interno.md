# Enlazado interno del sitio

Última revisión: 2026-08-18

## Objetivo

El enlazado debe ayudar a una persona a continuar su cuidado y a Google a descubrir y relacionar las páginas. No se busca acumular enlaces ni repetir keywords: cada enlace debe resolver el siguiente paso lógico de lectura.

## Arquitectura actual

```text
Inicio /
├── /salud-perros-mayores
│   └── /salud-perros-mayores/{articulo}
├── /alimentacion-perros-senior
│   └── /alimentacion-perros-senior/{articulo}
├── /movilidad-dolor-perros-mayores
│   └── /movilidad-dolor-perros-mayores/{articulo}
├── /salud-mental-emocional-perros
│   └── /salud-mental-emocional-perros/{articulo}
├── /higiene-hogar-perros-senior
│   └── /higiene-hogar-perros-senior/{articulo}
└── /cuidados-paliativos-perros
    └── /cuidados-paliativos-perros/{articulo}
```

Las herramientas son destinos transversales: `/herramientas`, `/herramientas/calculadora-calidad-vida-perros`, `/herramientas/selector-movilidad-perros-mayores` y `/asistente-ia`.

## Reglas implementadas

1. Todos los artículos enlazan de forma rastreable al inicio, a su pilar y a una selección de artículos relacionados.
2. `SiloNavigation.astro` muestra como máximo cuatro artículos recientes del mismo pilar. Esto conserva la profundidad temática sin imprimir una lista larga y repetitiva.
3. Cada artículo tiene hasta dos puentes editoriales seleccionados en `src/data/internal-links.ts`. Los puentes cruzan pilares solo cuando resuelven una necesidad relacionada.
4. Las tarjetas usan el título real de la página destino como parte visible del anchor. “Leer” solo acompaña al título; no es el único texto que describe el destino.
5. Las herramientas se enlazan desde artículos donde son el siguiente paso natural. Los enlaces son `<a href>` HTML normales y no dependen de JavaScript.
6. Los breadcrumbs siguen la ruta Inicio → pilar → artículo y tienen `BreadcrumbList` JSON-LD. El breadcrumb describe la jerarquía para usuarios y buscadores, pero no sustituye los enlaces contextuales.
7. Los enlaces editoriales dentro del MDX deben ir cerca de la afirmación que amplían, con texto descriptivo. No usar “haz clic aquí”, URLs desnudas ni repetir siempre el mismo anchor exacto.

## Catálogo de puentes

El mapa mantenible está en `src/data/internal-links.ts`:

- `CROSS_PILLAR_LINKS`: relaciones de artículo a artículo entre silos.
- `TOOL_LINKS`: relaciones de artículo a herramienta.
- `PILAR_NAMES`: nombres visibles reutilizados por breadcrumbs y tarjetas.

Cuando se publique un artículo nuevo, se añade primero al contenido normal. Después se comprueba que aparece en su pilar y se decide si merece uno o dos puentes desde artículos existentes. Si el tema es una continuación directa, también se añade su slug a `CROSS_PILLAR_LINKS`.

## Criterios editoriales para nuevos enlaces

- Enlazar porque el usuario necesita el recurso, no para alcanzar una cantidad fija.
- Priorizar: diagnóstico/alerta → manejo práctico → herramienta o calidad de vida.
- Mantener un máximo aproximado de 2–5 enlaces internos contextuales por artículo, además de navegación, breadcrumbs y bloque final.
- Evitar enlazar páginas legales, contacto o herramientas administrativas desde el contenido editorial salvo que sea necesario para la tarea del usuario.
- Si cambia un slug, actualizar el mapa, las referencias MDX, `INVENTARIO_CONTENIDO.md` y cualquier redirect legacy antes de publicar.

## Validación después de cada cambio

```powershell
npm run build
```

Revisar en el HTML generado que cada artículo tiene enlaces a su pilar, que los destinos del catálogo existen y que no aparecen URLs antiguas. El sitemap ayuda al descubrimiento, pero no reemplaza los enlaces internos: debe incluir únicamente las URLs canónicas que se quieren indexar.

## Por qué esta estrategia sigue las recomendaciones de Google

Google explica que descubre muchas páginas mediante enlaces, recomienda enlazar recursos relevantes y usar texto de enlace descriptivo. También indica que una organización lógica ayuda a usuarios y buscadores a entender cómo se relacionan las páginas, y que los breadcrumbs pueden mostrar la posición de una página en la jerarquía. Estas reglas se aplican aquí con enlaces HTML visibles, anchors informativos, silos temáticos y puentes editoriales controlados.

Fuentes oficiales:

- [SEO Starter Guide: enlaces relevantes, anchor text y organización](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
