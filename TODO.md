# Pendientes

Lista viva de ideas y tareas que el dueño del sitio menciona en las sesiones. Los agentes añaden aquí lo que quede pendiente y marcan con `[x]` lo terminado (con fecha y PR).

Cuando el dueño mencione una idea o algo que no quiere olvidar, regístrala aquí.

## AdSense: tercer rechazo por «contenido de bajo valor» (anotado: 2026-10-28)

Diagnóstico con el export de Search Console del 18-jul al 17-oct (2.269 clics, 91.000 impresiones, ~25 clics/día y subiendo) y el sitio publicado: lo técnico de AdSense está bien (`ads.txt`, código, rastreo con 200); lo que falta es valor propio visible y un poco más de tráfico. La cantidad de artículos no es el problema: la calculadora (25 % de los clics) y la comida casera con la receta de Luna (18 %) se llevan casi la mitad; los artículos que resumen guías apenas reciben visitas.

- [x] **Redirecciones `.html` y barra final de 307 a 301.** El 41 % de los clics caía en URLs `.html`; Cloudflare Assets las resolvía con un 307 temporal y Google conservaba las dos versiones. Reglas al final de `public/_redirects` y `scripts/audit-seo.mjs` las trata como fallo. 2026-10-28, [PR #156](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/156) (`0871a19`): en producción, las 80 variantes `.html` y `/` de las 41 URLs del sitemap dan un 301 de un salto a la canónica; `npm run audit:seo` solo marca el http→https pendiente de abajo.
- [ ] **«Always Use HTTPS» en Cloudflare.** `http://cuidatuperroviejo.com/…` responde 200 sin redirigir a https (lo detecta `audit:seo`). Es un ajuste del panel de Cloudflare, no del repo.
- [ ] **Enviar a Search Console capturas de Indexación → Páginas y de Acciones manuales** para descartar otros problemas.
- [ ] **Poner cara al sitio:** firma «Gonzalo» con foto y biografía corta en los artículos en vez de «Equipo Cuida a tu Perro Viejo»; agrupar los avisos de IA y «sin caso clínico» en un pie discreto al final; quitar «sin revisión veterinaria individual acreditada» de la primera pantalla de la portada.
- [ ] **Fotos reales de Luna y Dakota** en portada, Acerca de y artículos donde encajen (cama ortopédica, comida casera, poliquezia). Requiere material del dueño.
- [ ] **Sección «En casa con Luna y Dakota»** solo donde haya experiencia real y documentada (enlaza con «Recuperar la experiencia propia» más abajo).
- [ ] **Escala HHHHHMM imprimible en PDF real** desde la calculadora: se busca «escala hhhhhmm pdf» (74 impresiones, 13 clics en 3 meses).
- [ ] **Publicar con ritmo constante** (1–2 artículos por semana) en vez de ráfagas y reescrituras en bloque.
- [ ] **No volver a solicitar la revisión** hasta que las URLs `.html` desaparezcan de Search Console y los clics sigan subiendo; estimación propia de 4–6 semanas como mínimo, no un plazo de Google.

## Contenido

- [x] **Preparar P1-03 para publicación.** Traslado mecánico, recursos activos, limpieza y pruebas completados el 2026-10-26; [código #148](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/148) y [artículo #149](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/149), preparados originalmente como draft; fusionados después por orden del propietario, ver cierre de producción.
- [x] **Ajuste bibliográfico y auditoría independiente de publicación P1-03.** Referencia primaria de Málaga incorporada; R1 del diff de integración APTO, 0 P0/P1/P2 nuevos. 2026-10-26, [artículo #149](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/149); informe `docs/contenido/miedo-petardos-perros-mayores/auditoria-publicacion-r1.md`. Los límites S2/S7 de aquella versión se documentan en la corroboración posterior.
- [x] **Corroborar Blackwell y la ficha del medicamento de P1-03.** 2026-10-26, [artículo #149](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/149). Texto publicado contrastado en transcripción de copia pública; tres atribuciones precisadas. Ficha británica primaria corroborada y conservada por decisión delegada del propietario, sin afirmar lectura de la española. Expediente: `docs/contenido/miedo-petardos-perros-mayores/publicacion/corroboracion-s2-s7.md`; revisión independiente R2 del ajuste APTO, sin bloqueantes nuevos (`auditoria-publicacion-r2.md`).
- [x] **Fusionar y verificar P1-03 en producción.** 2026-10-26: [código #148](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/148) → [artículo #149](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/149), ambos en main; commit del artículo `589548a`. CI correcto tras actualizar base, URL pública HTTP200, recursos, tablas, FAQ, enlaces, JSON-LD, sitemap y catálogo comprobados. P1-03 marcado Publicado solo después de verificar. Evidencia en `docs/contenido/miedo-petardos-perros-mayores/publicacion/produccion/`.
- [ ] **Volumen de las skills: criterio de 5.000–6.000 palabras.** Pendiente de decisión/editorial y ajuste de las skills sin relleno; no se modifican en esta integración. El contrato particular de petardos sigue siendo 5.300–6.000. (2026-10-26)
- [ ] **Base ES-06 del inventario: enlace roto.** Sustituir la referencia de Barcelona declarada 404 por una fuente vigente; no se inventa ni cambia en este PR. (2026-10-26)
- [ ] **Reconciliar al redactar el brief de feromonas.** La comprobación de integración de 2026-10-26 no encuentra contradicción entre tabla 2/FAQ 4 de petardos (percepciones de encuesta) y «moderada solo en miedo a tormentas» en ansiedad por separación y el brief; queda pendiente trasladar esa distinción a la futura redacción de feromonas, sin modificar ahora su brief.
- [ ] **Versión latinoamericana de petardos con Osa y Baltor.** Planificación y procedencia por concretar; fuera del artículo español. (2026-10-26)

- [ ] **Golpe de calor: menores aceptados al publicar (2026-10-24, `main` e22dd89).** Ninguno bloquea; retomar si se rehace el artículo o su animación. Detalle en `docs/contenido/golpe-de-calor-perros-mayores/auditoria-revision-r2.md`.
  - [ ] Recorte del podenco (`podenco-senior-perfil-transparente-v1`): no se ve senior (lomo y músculo de adulto) y aparece con el pelo seco en los pasos de mojarlo. Regenerar con edad visible y pelo mojado si se mejora la secuencia. Su alfa interior es 250–254, no 255 (no se nota).
  - [ ] Escala de avisos (`GolpeCalorRecursos`, variante `umbrales`): el recuadro discontinuo sigue marcando la distancia entre 30 °C y el umbral de la zona, aunque ya sin cifra. Valorar quitarlo.
  - [ ] Rótulos del dibujo de la secuencia: ~11,6 px en móvil, en el límite de legibilidad. Agrandarlos o confiar en el texto del paso.
  - [ ] Unificar la descripción de la persiana de la imagen de casa: el alt dice «medio bajada» y el informe de revisión dice «bajada».

- [x] **Crear las imágenes pedidas en la revisión de fondo de golpe de calor.** Enfriamiento con ventilador elevado en seco, casa sin sol directo y recorte transparente opcional; escenas integradas y recorte listo para el autor de la animación. 2026-10-24, rama `codex/golpe-calor-imagenes-revision`, sin publicación. Ver `docs/contenido/golpe-de-calor-perros-mayores/imagenes-revision-entrega.md`.

- [x] **Fijar el nivel de detalle y belleza de las imágenes de golpe de calor como criterio para próximos artículos.** Dirección visual compartida, skills de brief/redacción/producción y plantilla actualizadas; portada corregida para que perro y cuidadora avancen juntos. Preferencia registrada el 2026-10-24; entrega en la rama de revisión `codex/articulo-golpe-calor-imagenes`, sin publicación. Referencia: `.agents/skills/references/direccion-visual-editorial.md`.

- [ ] **Alinear la firma automática y el parser de métricas de las skills editoriales con el sitio.** La skill `redactar-articulo-blog` pide una firma manual que duplicaría `ArticleByline`; el script no reconoce el rango/tabla del brief y suma bibliografía al cierre. Abordar en otra sesión, conservando las exclusiones y desacuerdos documentados, sin adaptar el contrato para aprobarlo. Hallazgo de la [auditoría R3 de mal aliento](docs/contenido/mal-aliento-perros-viejos/auditoria-articulo-r3.md), PR #145 (anotado: 2026-10-22).

- [x] **Alinear el tono de todos los artículos con la [guía de voz y tono](.agents/skills/references/guia-voz-tono.md).** Prompt listo en [docs/contenido/prompt-revision-tono.md](docs/contenido/prompt-revision-tono.md). Prioridad por clics: comida casera → incontinencia urinaria → úlceras → resto. (Anotado: 2026-10-21)
  - [x] Reescritos los 12 artículos, todos a 0,0 muletillas/1000 en `tono.py` y con `npx astro build` OK (2026-10-21). Un PR por artículo, abiertos y pendientes de tu visto bueno: comida casera #127, incontinencia urinaria #128, úlceras #129, cama ortopédica #130, prevención de caídas #131, poliquezia #132, incontinencia fecal #133, Cushing #134, disfunción cognitiva #135, insuficiencia pancreática #136, limpieza de ojos y oídos #137, salud dental #138.
  - [x] Auditoría de los 12 artículos en sesiones aparte (2026-10-21). Ronda 1: 11 NO APTO por frases cuyo alcance clínico cambió la reescritura; salud dental APTO con reservas. Corregido en PR #141; ronda 2: los 11 APTO. PR #141 fusionado (2026-10-21). Informes en las ramas `claude/auditoria-tono-a`, `-b` y `-d` (la `-c` sigue local en su sesión, pendiente de que el dueño confirme el push).
  - [x] Hallazgos menores resueltos o decididos (2026-10-21): infografía dental corregida y aviso de IA global en la firma y la política editorial — PR #142. IPE línea 82: el dueño decide dejarla como está (cambiaría contenido clínico). Informes de auditoría: el dueño decide no conservarlos.
  - [x] Imagen principal de úlceras sin la marca «COZY PAWS»: nueva imagen aportada por el dueño — PR #143 (2026-10-21).
  - [x] PR #127–#139 fusionados con visto bueno del dueño (2026-10-21).
  - [ ] Pilares: los 7 a 0,0/1000 en `tono.py` — PR de pilares abierto (2026-10-21).
- [ ] **Recuperar la experiencia propia con Luna y Dakota** con procedencia documentada (fechas, fotos, qué pasó). Las versiones de agosto en git (`cbfa55c`) sirven de punto de partida; requiere material del dueño. (Anotado: 2026-10-21)
  - [x] **Comida casera:** experiencia de Luna (rechazaba las croquetas; comida casera con receta de internet como complemento), aportada el 2026-10-21 y auditada — PR #143.
  - [x] **Cama ortopédica:** una cama para cada una, más de un año en perfecto estado, aportada el 2026-10-21 y auditada — PR #143.
  - [ ] **Poliquezia** (#132): ya usa la experiencia aportada de Dakota y Luna, ahora en primera persona del plural (aprobado 2026-10-21). Si ya sabes la causa de las deposiciones, aporta diagnóstico o desenlace con fecha.

## Mejoras del sitio

- [ ] **API de valoraciones caída (menor, lo arregla el dueño en otra sesión):** `GET /api/feedback?slug=…` devuelve 500 «Error interno del servidor» en producción para todos los artículos; el dueño lo vio fallar desde hace uno o dos días. No tumba el sitio y hoy no se usa como métrica: los votos «útil / no útil» se guardan como contadores en D1 (`feedback_counts`, `src/pages/api/feedback.ts`), pero solo los muestra el propio widget y no hay panel que los lea. Primera pista: comprobar que la tabla existe en la D1 de producción y revisar el log del Worker. (Anotado: 2026-10-24) Reconfirmado el 2026-10-26 tras #149: HTTP500 también en petardos, golpe de calor y leishmaniosis; mismo cuerpo de error, sin cambios en la API en estos PR. Evidencia: `docs/contenido/miedo-petardos-perros-mayores/publicacion/produccion/feedback-comparacion.json`.
- [ ] **Botón flotante de opiniones:** a 390 px tapa la esquina inferior derecha de tarjetas y recursos (visto en golpe de calor, pasa en todo el sitio). Valorar desplazarlo o reducirlo en móvil. (Anotado: 2026-10-24)

## Limpieza del repositorio

- [x] Borrados 288 PDF y capturas de `docs/` que no usaba nada (se conservan las 3 que enlazan las skills) — PR #142 (2026-10-21).

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
