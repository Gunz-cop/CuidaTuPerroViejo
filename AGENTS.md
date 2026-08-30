# AGENTS.md

Instrucciones compartidas para agentes de código (Claude Code, Codex, Antigravity u otros) que trabajen en este repositorio.

## Enlazado interno del sitio

Cuando el usuario pida revisar, mejorar, reorganizar o documentar el enlazado interno de `cuidatuperroviejo.com`, usa la skill [`.agents/skills/enlazado-interno-sitio/SKILL.md`](.agents/skills/enlazado-interno-sitio/SKILL.md). Esta skill mantiene la arquitectura de silos, los puentes entre artículos y los enlaces a herramientas.

La implementación vive principalmente en [`src/data/internal-links.ts`](src/data/internal-links.ts) y [`src/components/SiloNavigation.astro`](src/components/SiloNavigation.astro). Las reglas y el mapa operativo están documentados en [`docs/seo/enlazado-interno.md`](docs/seo/enlazado-interno.md). Antes de modificar enlaces, revisa esos tres recursos y valida con `npm run build`.

## Redacción de contenido de blog

Antes de generar un briefing o redactar un artículo de blog para `cuidatuperroviejo.com`, consulta primero las skills en `.agents/skills/`:

- [`.agents/skills/generar-briefing-contenido/SKILL.md`](.agents/skills/generar-briefing-contenido/SKILL.md) — genera el briefing de planificación de un artículo (fuentes científicas, estructura H2/H3, enlazado interno, contrato de entrega). Úsalo cuando el usuario pida un brief, un briefing, o planificar un artículo nuevo.
- [`.agents/skills/redactar-articulo-blog/SKILL.md`](.agents/skills/redactar-articulo-blog/SKILL.md) — toma ese briefing y redacta el artículo `.mdx` final en `src/content/blog/`, respetando la arquitectura real del sitio Astro (componentes, layout automático, schema del frontmatter). Úsalo cuando el usuario pida redactar, escribir o convertir un brief en artículo.
- [`.agents/skills/auditar-briefing-contenido/SKILL.md`](.agents/skills/auditar-briefing-contenido/SKILL.md) — audita un briefing ya generado contra las reglas de la skill generadora, como revisor externo: fuentes verificadas una a una (PMID/DOI/URL profunda contra el tema atribuido), trazabilidad fuente→H2 sin fuentes decorativas, metadatos contados, enlazado interno contra el inventario, componentes, arco narrativo, prompts de imagen y límite brief vs. redacción. Úsalo cuando el usuario pida revisar, auditar o validar un brief; antes de redactar desde un brief que otra sesión generó; o cuando una auditoría de artículo descubra un fallo que nació en el brief. **Es una skill de evaluación: no corrige el brief.**
- [`.agents/skills/auditar-articulo-blog/SKILL.md`](.agents/skills/auditar-articulo-blog/SKILL.md) — audita un `.mdx` ya redactado contra el brief que lo encargó, como revisor externo: volumen y distribución por H2, densidad de párrafo, fuentes que respalden de verdad su afirmación, autoría real, enlazado, imágenes y frontmatter. Úsalo cuando el usuario pida revisar, auditar o validar un artículo, o comprobar el reporte de otra sesión. **Es una skill de evaluación: no corrige el artículo.**

> **Separa los roles.** Quien genera no audita, quien redacta no audita, y quien audita no corrige: el que corrige adquiere un interés en que su corrección sea la buena y deja de poder evaluarla. Si hace falta corregir, hazlo en una sesión aparte a partir de las instrucciones del informe.
>
> **Orden recomendado del flujo:** generar brief → auditar brief → redactar artículo → auditar artículo. Auditar el brief antes de redactar es más barato que descubrir el fallo en el artículo: un PMID mal asignado o un enlace inexistente en el contrato se propaga a todo lo que se escriba después. Si una auditoría de artículo encuentra un error de fuente, comprueba si nace en el brief con la skill de auditoría de briefing.

Sigue el flujo descrito en esos archivos en vez de improvisar la estructura del brief o del artículo desde cero.
