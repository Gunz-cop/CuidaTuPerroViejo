# Pendientes

Lista viva de ideas y tareas que el dueño del sitio menciona en las sesiones. Los agentes añaden aquí lo que quede pendiente y marcan con `[x]` lo terminado (con fecha y PR).

Cuando el dueño mencione una idea o algo que no quiere olvidar, regístrala aquí.

## Contenido

- [x] **Alinear el tono de todos los artículos con la [guía de voz y tono](.agents/skills/references/guia-voz-tono.md).** Prompt listo en [docs/contenido/prompt-revision-tono.md](docs/contenido/prompt-revision-tono.md). Prioridad por clics: comida casera → incontinencia urinaria → úlceras → resto. (Anotado: 2026-10-21)
  - [x] Reescritos los 12 artículos, todos a 0,0 muletillas/1000 en `tono.py` y con `npx astro build` OK (2026-10-21). Un PR por artículo, abiertos y pendientes de tu visto bueno: comida casera #127, incontinencia urinaria #128, úlceras #129, cama ortopédica #130, prevención de caídas #131, poliquezia #132, incontinencia fecal #133, Cushing #134, disfunción cognitiva #135, insuficiencia pancreática #136, limpieza de ojos y oídos #137, salud dental #138.
  - [x] Auditoría de los 12 artículos en sesiones aparte (2026-10-21). Ronda 1: 11 NO APTO por frases cuyo alcance clínico cambió la reescritura; salud dental APTO con reservas. Corregido en PR #141; ronda 2: los 11 APTO. PR #141 fusionado (2026-10-21). Informes en las ramas `claude/auditoria-tono-a`, `-b` y `-d` (la `-c` sigue local en su sesión, pendiente de que el dueño confirme el push).
  - [ ] Hallazgos menores de las auditorías (no bloqueantes): infografía dental con faltas («GINGIVTIS», «Encía firmo», «Diente limipio»); imágenes sin declarar que son de IA; etiqueta «COZY PAWS» en el hero de úlceras; ojos y oídos línea 65 («sigue con él mientras tanto»); IPE línea 82 (Merck desaconseja restringir grasa: requiere edición de contenido aprobada); briefs antiguos de poliquezia, incontinencia fecal y Cushing desalineados con la guía de calidad editorial.
  - [x] PR #127–#139 fusionados con visto bueno del dueño (2026-10-21).
  - [ ] Pilares: los 7 a 0,0/1000 en `tono.py` — PR de pilares abierto (2026-10-21).
- [ ] **Recuperar la experiencia propia con Luna y Dakota** con procedencia documentada (fechas, fotos, qué pasó). Las versiones de agosto en git (`cbfa55c`) sirven de punto de partida; requiere material del dueño. (Anotado: 2026-10-21)
  - [ ] **Comida casera** (#127): la versión anterior al 16 de octubre (`872517c^`) citaba a Luna y Dakota 24 veces, sin procedencia documentada. Hace falta tu material: qué comían, desde cuándo, quién formuló la receta y qué observaste.
  - [ ] **Cama ortopédica** (#130): la ilustración muestra dos perras descansando juntas y el pie aclara que no son Luna y Dakota. Si tienes fotos o notas de las camas que usan (qué probaste, cómo entran y salen), el artículo ganaría una experiencia propia.
  - [ ] **Poliquezia** (#132): ya usa la experiencia aportada de Dakota y Luna, ahora en primera persona del plural (aprobado 2026-10-21). Si ya sabes la causa de las deposiciones, aporta diagnóstico o desenlace con fecha.

## Limpieza del repositorio

- [ ] Revisar documentación, evidencias e imágenes que no deberían vivir en el repo (por ejemplo, PDFs y capturas de auditorías en `docs/contenido/`). No tocar por ahora; decidir criterio antes. Las evidencias nuevas no se suben a `main`. (Anotado: 2026-10-21)

## Herramientas (en cola: rediseño del dueño)

El dueño está rediseñando estas piezas; van **en cola** y se retoman cuando él lo indique. No tocarlas antes.

- [ ] **Calculadora de calidad de vida (HHHHHMM):** llevarla al estándar de la calculadora de edad. Hoy su lógica de interfaz vive en una página de 812 líneas, sin componente en `src/components/tools/` ni tests. Pasarla por `crear-herramienta-interactiva` (componente, `src/lib/`, tarjeta, imagen hero, responsive 390/820/1366) y auditarla en otra sesión. Antes, el dueño decide si muestra tramos por el total o sigue sin clasificarlo, y se registra en `docs/herramientas/decisiones-del-propietario.md`. (Anotado: 2026-10-21)
- [ ] **Asistente IA (chat):** rediseño, incluida la pantalla en modo oscuro, que hoy se percibe poco pulida y con bajo confort visual.
- [ ] **Aplicación de IA:** rediseño en cola junto con el asistente. (Anotado: 2026-10-21)
- [ ] **Tests de lógica para movilidad y calidad de vida:** solo `dog-age` tiene tests (`tests/dog-age.test.ts`). (Anotado: 2026-10-21)
- [x] Pilar `/herramientas` alineado con la calculadora: el total HHHHHMM no se clasifica por tramos; se retiran «la más usada» (sin dato) y se precisa qué se envía y qué no — PR #140 (2026-10-21).

## Hecho

- [x] Apoyos visuales del artículo de perros sin dientes cómodos en móvil y regla responsive en las skills — PR #124 (2026-10-21).
- [x] Guía de voz y tono + script `tono.py` enlazados a redacción y auditorías — PR #126 (2026-10-21).
