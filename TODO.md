# Pendientes

Lista viva de ideas y tareas que el dueño del sitio menciona en las sesiones. Los agentes añaden aquí lo que quede pendiente y marcan con `[x]` lo terminado (con fecha y PR).

Cuando el dueño mencione una idea o algo que no quiere olvidar, regístrala aquí.

## Contenido

- [ ] **Alinear el tono de todos los artículos con la [guía de voz y tono](.agents/skills/references/guia-voz-tono.md).** Prompt listo en [docs/contenido/prompt-revision-tono.md](docs/contenido/prompt-revision-tono.md). Prioridad por clics: comida casera → incontinencia urinaria → úlceras → resto. (Anotado: 2026-10-21)
  - [x] Reescritos los 12 artículos, todos a 0,0 muletillas/1000 en `tono.py` y con `npx astro build` OK (2026-10-21). Un PR por artículo, abiertos y pendientes de tu visto bueno: comida casera #127, incontinencia urinaria #128, úlceras #129, cama ortopédica #130, prevención de caídas #131, poliquezia #132, incontinencia fecal #133, Cushing #134, disfunción cognitiva #135, insuficiencia pancreática #136, limpieza de ojos y oídos #137, salud dental #138.
  - [ ] Auditar cada artículo con [auditar-articulo-blog](.agents/skills/auditar-articulo-blog/SKILL.md) en otra sesión (quien corrige no audita).
  - [ ] Fusionar los PR #127–#138 cuando des el visto bueno y marcar aquí la fecha.
- [ ] **Recuperar la experiencia propia con Luna y Dakota** con procedencia documentada (fechas, fotos, qué pasó). Las versiones de agosto en git (`cbfa55c`) sirven de punto de partida; requiere material del dueño. (Anotado: 2026-10-21)
  - [ ] **Comida casera** (#127): la versión anterior al 16 de octubre (`872517c^`) citaba a Luna y Dakota 24 veces, sin procedencia documentada. Hace falta tu material: qué comían, desde cuándo, quién formuló la receta y qué observaste.
  - [ ] **Cama ortopédica** (#130): la ilustración muestra dos perras descansando juntas y el pie aclara que no son Luna y Dakota. Si tienes fotos o notas de las camas que usan (qué probaste, cómo entran y salen), el artículo ganaría una experiencia propia.
  - [ ] **Poliquezia** (#132): ya usa la experiencia aportada de Dakota y Luna; el PR la pasa a primera persona del plural. Confirma que te parece bien, y si ya sabes la causa de las deposiciones, aporta diagnóstico o desenlace con fecha.

## Limpieza del repositorio

- [ ] Revisar documentación, evidencias e imágenes que no deberían vivir en el repo (por ejemplo, PDFs y capturas de auditorías en `docs/contenido/`). No tocar por ahora; decidir criterio antes. Las evidencias nuevas no se suben a `main`. (Anotado: 2026-10-21)

## Diseño

- [ ] Rediseñar la pantalla del chat de IA en modo oscuro; actualmente se percibe poco pulida y con bajo confort visual.

## Hecho

- [x] Apoyos visuales del artículo de perros sin dientes cómodos en móvil y regla responsive en las skills — PR #124 (2026-10-21).
- [x] Guía de voz y tono + script `tono.py` enlazados a redacción y auditorías — PR #126 (2026-10-21).
