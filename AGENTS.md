# AGENTS.md

Instrucciones compartidas para agentes de código (Claude Code, Codex, Antigravity u otros) que trabajen en este repositorio.

## Redacción de contenido de blog

Antes de generar un briefing o redactar un artículo de blog para `cuidatuperroviejo.com`, consulta primero las skills en `.agents/skills/`:

- [`.agents/skills/generar-briefing-contenido/SKILL.md`](.agents/skills/generar-briefing-contenido/SKILL.md) — genera el briefing de planificación de un artículo (fuentes científicas, estructura H2/H3, enlazado interno, contrato de entrega). Úsalo cuando el usuario pida un brief, un briefing, o planificar un artículo nuevo.
- [`.agents/skills/redactar-articulo-blog/SKILL.md`](.agents/skills/redactar-articulo-blog/SKILL.md) — toma ese briefing y redacta el artículo `.mdx` final en `src/content/blog/`, respetando la arquitectura real del sitio Astro (componentes, layout automático, schema del frontmatter). Úsalo cuando el usuario pida redactar, escribir o convertir un brief en artículo.

Sigue el flujo descrito en esos archivos en vez de improvisar la estructura del brief o del artículo desde cero.
