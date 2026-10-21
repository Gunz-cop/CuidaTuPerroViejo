# Auditoría de tono — `ulceras-presion-perros.mdx`

- **Ronda:** 1 de 3
- **Fecha:** 2026-10-21
- **Versión auditada:** `main` @ `26f9b77`, blob `7226b1c58f1b` (commit de la reescritura `d5ced31`, PR #129)
- **Versión de comparación:** `d5ced31^` (estado tras `872517c`, 2026-10-16)
- **Brief:** no existe. Se audita contra la guía de voz y tono, la guía de calidad editorial y la consigna de la reescritura.
- **Producción:** `/cuidados-paliativos-perros/ulceras-presion-perros` responde 200 y ya sirve esta versión (contiene «Cada herida cierra a su ritmo»).

## Veredicto

**NO APTO (Publicable con una corrección de una línea).** L84 sustituye «No se garantiza un plazo de cierre» por «Cada herida cierra a su ritmo», que promete el cierre de toda herida en un artículo del pilar de cuidados paliativos.

Plano mecánico: `tono.py` 0,0/1000 (antes 5,6). Plano manual: diff, fuentes e imagen revisados; captura responsive **no realizada**.

## Hallazgos

### P0 — Cambio de alcance clínico (bloqueante)

| # | Línea | Antes | Ahora | Qué cambió |
|---|---|---|---|---|
| B1 | 84 | «No se garantiza un plazo de cierre: la evolución debe revisarse con el veterinario.» | «**Cada herida cierra a su ritmo**, así que revisa la evolución con tu veterinario.» | Pasa de «no hay plazo garantizado» a presuponer que toda herida cierra. La guía de calidad editorial §4 prohíbe «prometer recuperación sin respaldo». El manual Merck citado dice que las heridas limpias y desbridadas «usually heal», no todas, y el artículo se dirige a perros que no pueden cambiar de postura, a menudo en cuidados paliativos. |

### P2 — Cambios menores de alcance

- **L17:** «no basta con aplicar un cicatrizante» → «eso va **antes de cualquier cicatrizante**». Presupone que después vendrá un cicatrizante, en tensión con el `AlertBox` de L66 («No apliques por tu cuenta…»).
- **L46:** «No existe aquí un intervalo universal que garantice evitar úlceras» → «el bueno es el que se ajusta a tu perro». Se pierde el límite de que ningún intervalo evita las úlceras, y «el bueno» sugiere que un intervalo ajustado sí las evita.
- **L74:** WSAVA «no prescriben un suplemento universal de omega-3» → «apoyan esa valoración individual, **en lugar de** un suplemento universal de omega-3». Da a entender que WSAVA contrapone las dos cosas; la página no menciona el omega-3 (comprobado).

El resto conserva el alcance: L29, L31, L36, L48 (movilización), L50, L54 («ninguno previene todas las lesiones»), L58, L64, L70 y L76.

### P2 — Hallazgos previos a la reescritura (no los causó el PR #129)

- **Imagen hero `perro-senior-cama-ortopedica.webp`:** la cama lleva una etiqueta de marca visible, «COZY PAWS ORTHOPEDIC est. 1995», y la marca de agua de generación con IA. Choca con L54 («no por una marca») y L56 («Estas comprobaciones te dicen más que la etiqueta "ortopédica"»). El `heroImageAlt` dice «viscoelástica», cosa que no se ve.
- **Cadencia de H3:** 1 H3 para 1068 palabras.
- «Fuentes consultadas» es un H2 con lista, no `AlertBox` (convención del sitio).

## Fuentes: fuente → afirmación → comprobación

| Fuente | Afirmación | Comprobación (2026-10-21) |
|---|---|---|
| Moriello y Winkler, Merck, *Hygroma in Dogs* | El traumatismo repetido sobre superficies duras se relaciona con el higroma; el acolchado protege | **Verificada**: «excessive time spent in recumbency on hard surfaces»; «Soft bedding works well for some dogs»; «can wear padding over pressure points». |
| Winkler, Merck, *Initial Wound Management in Small Animals* | El agua oxigenada es tóxica para el tejido sano; hay que valorar antes de decidir el cierre o el manejo abierto | **Verificada**: «is toxic to healthy tissue». La decisión entre cierre y manejo abierto se toma tras inspeccionar, lavar y desbridar. Sobre B1: «usually heal without complication», no un cierre universal. |
| WSAVA Global Nutrition Guidelines | Valoración nutricional individual | **Verificada** por concepto; sin mención al omega-3 ni a heridas (ver P2 de L74). |

URLs y enlaces sin cambios respecto de `d5ced31^`. Enlaces internos (`/movilidad-dolor-perros-mayores/cama-ortopedica-perros-mayores-displasia-artrosis`, `/higiene-hogar-perros-senior/incontinencia-urinaria-perros-mayores`, `/cuidados-paliativos-perros`) resuelven a contenido existente.

## Recursos prometidos

Tabla de registro (L80–82): se entrega en el texto. Sin pendientes.

## Métricas

| Métrica | Antes | Ahora |
|---|---|---|
| `tono.py` | 5,6 (5 en 899) | **0,0** (0 en 958) |
| Densidad de párrafo | — | 40 / 40 / 5 % |

Voz: de tú y afirmativa. L50 («Una alarma en el móvil te recuerda el plan; mirarlo a él te dice cómo va») es un buen ejemplo de lo concreto de la regla 5.

## Lo que sí funciona

- Los `AlertBox` danger (L40) y warning (L66) quedan intactos, incluido el veto a las «donas» y a los productos aplicados por cuenta propia.
- L64 reescribe el uso de la guía profesional de Merck en afirmativo sin perder el límite: las concentraciones y el desbridamiento «las decide y las hace el veterinario».
- L70 adopta la fórmula buena de incontinencia («aunque la infección puede aparecer igualmente»).

## Qué corregir, en orden

> En `src/content/blog/ulceras-presion-perros.mdx` (rama nueva desde `main`):
> 1. L84: «Cada herida cierra a su ritmo, así que revisa la evolución con tu veterinario.» → «No hay un plazo fijo de cierre: revisa la evolución con tu veterinario.»
> 2. (P2) L17: «y eso va antes de cualquier cicatrizante» → «y esa valoración decide qué cura necesita».
> 3. (P2) L46: «Por eso aquí no hay un intervalo universal: el bueno es el que se ajusta a tu perro.» → «Por eso aquí no hay un intervalo universal: pide el que encaje con tu perro y revísalo si aparece una lesión.»
> 4. (P2) L74: «en lugar de un suplemento universal de omega-3 para curar escaras» → «y no recogen un suplemento universal de omega-3 para curar escaras».
> 5. (P2, aparte) Sustituye el hero por una imagen sin etiqueta de marca y ajusta `heroImageAlt` a lo que se ve.
> Mide con `tono.py`, ejecuta `npx astro build` y no hagas push a `main`.
