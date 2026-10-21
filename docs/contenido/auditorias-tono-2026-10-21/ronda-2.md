# Auditoría de tono — ronda 2 (comida casera, incontinencia urinaria, úlceras)

- **Ronda:** 2 de 3
- **Fecha:** 2026-10-21
- **Versión auditada:** rama `claude/tono-correcciones-r1` @ `227e249` (PR #141), comparada con `main` @ `26f9b77`
- **Blobs:** `comida-casera-perros-mayores.mdx` `05a6000a66e9` · `incontinencia-urinaria-perros-mayores.mdx` `91ebef3b2a94` · `ulceras-presion-perros.mdx` `5989ef188757`
- **Alcance:** comprobar que se resolvieron los bloqueantes de la ronda 1 y que la corrección no introdujo problemas nuevos. Los otros 8 artículos que toca el PR #141 quedan fuera de esta auditoría.
- **Autoría de la corrección:** el commit `227e249` lo firma la misma sesión que hizo la reescritura (`session_01LW3EsTQjV9jeM8sCNNYdrD`), no esta sesión auditora. Se respeta la separación «quien audita no corrige».
- **Producción:** `main` y las URL públicas siguen sirviendo el texto de la ronda 1 hasta que se fusione el PR #141.

## Veredicto

| Artículo | Veredicto | Motivo |
|---|---|---|
| `comida-casera-perros-mayores` | **APTO** | Los 5 bloqueantes (B1–B5) están resueltos y no aparece ningún cambio de alcance nuevo. |
| `incontinencia-urinaria-perros-mayores` | **APTO** | B1 está resuelto: la salvedad vuelve a ser del artículo y deja de atribuirse a UC Davis. |
| `ulceras-presion-perros` | **APTO** | B1 está resuelto: ya no se promete que toda herida cierre. |

Plano mecánico: `tono.py` da 0,0/1000 en los tres (1063, 1775 y 957 palabras). Plano manual: diff de cada frase revisado y contrastado con la versión anterior a la reescritura (`872517c`). No ejecuté `npx astro build` en esta ronda: el diff solo cambia texto de párrafos y un H2, sin JSX, imports ni frontmatter.

## Comprobación de cada bloqueante

### `comida-casera-perros-mayores`

| # | Línea | Ronda 1 | Ahora (rama) | ¿Resuelto? |
|---|---|---|---|---|
| B1 | 39 | «tampoco la previene» | «no hay pruebas de que una mezcla casera húmeda la prevenga» | Sí. Vuelve al alcance original («no garantiza»). |
| B2 | 59 (H2) | «Triturar cambia la textura, no la absorción» | «Triturar cambia la textura; que nutra bien depende de la receta» | Sí. Ya no se afirma nada sobre la absorción. |
| B3 | 57 | «consúltalos antes de añadirlos para «completar» una mezcla» | «Deja […] en manos de la formulación: se valoran dentro del conjunto de la dieta, no para «completar» una mezcla por tu cuenta» | Sí. Recupera la prohibición. |
| B4 | 91 | «Ofrece un alimento nuevo cada vez y deja la medicación fuera de la ración completa» | «Introduce los alimentos nuevos de uno en uno y no escondas la medicación en toda la ración» | Sí. Equivale a «No encadenes ingredientes nuevos ni escondas medicación en toda la ración». |
| B5 | 99 | «tu veterinario ve […] si la dieta está completa» | «son buena señal, pero si la dieta está completa lo dice la formulación, no el aspecto» | Sí. |

### `incontinencia-urinaria-perros-mayores`

| # | Línea | Ronda 1 | Ahora | ¿Resuelto? |
|---|---|---|---|---|
| B1 | 125 | «Esta guía no respalda que…» | «En este artículo no recomendamos vitaminas, antioxidantes ni acupuntura para recuperar el control vesical: pregunta a tu veterinario qué evidencia hay para su caso.» | Sí. La afirmación ya no se atribuye a UC Davis. |

### `ulceras-presion-perros`

| # | Línea | Ronda 1 | Ahora | ¿Resuelto? |
|---|---|---|---|---|
| B1 | 84 | «Cada herida cierra a su ritmo» | «No hay un plazo fijo de cierre: revisa la evolución con tu veterinario.» | Sí. Equivale a «No se garantiza un plazo de cierre». |

## Problemas nuevos introducidos por la corrección

Ninguno bloqueante. Hay tres observaciones:

- **Conflicto de origen del texto (transparencia).** Las siete frases corregidas reproducen al pie de la letra las redacciones que propuso el informe de la ronda 1, así que esta ronda evalúa texto sugerido por el propio auditor. Las comparé contra la versión anterior a la reescritura (`872517c`), no contra mi propuesta, y conservan su alcance. Si el dueño quiere separar del todo los roles, una ronda 3 la puede hacer otra sesión auditora.
- **P2, incontinencia L125:** «no recomendamos» es una postura editorial algo más firme que la original («No se demuestra aquí»). Queda equilibrada por «pregunta a tu veterinario qué evidencia hay para su caso» y no contradice ninguna fuente citada. No bloquea.
- **Ancla del H2 cambiado (comida, L59):** el nuevo slug no lo referencia ningún enlace del sitio. El ancla antigua `#triturar-puede-cambiar-la-textura-no-garantizar-absorción` solo aparece en evidencias históricas (`docs/seo/correccion-editorial-2026-10-16/evidencias/navegador-local.json`) y ya había dejado de existir con la reescritura de la ronda 1. No es un hallazgo.

## Pendientes P2 de la ronda 1 que siguen abiertos (no bloquean)

- **Comida:** L17 «buena opción», L29 «no significa que absorba peor», L45 «cambian» (AAHA), L63 «facilita comer», L101 «la prevención de enfermedades se valora con tu veterinario», `alt` de la imagen del licuado y cadencia de H3.
- **Incontinencia:** L95 productos perfumados, L121 «hay mucho que se puede hacer», ningún enlace interno contextual (P1 anterior a la reescritura), MSD citada solo en la bibliografía y densidad media de 43.
- **Úlceras:** L17 «antes de cualquier cicatrizante», L46 «el bueno es el que se ajusta», L74 «en lugar de» (WSAVA) y la imagen de portada con la etiqueta de marca «COZY PAWS ORTHOPEDIC».

## Lo que sí funciona

La corrección es mínima: 7 frases en estos tres archivos, sin tocar fuentes, enlaces, frontmatter ni componentes, y sin reintroducir muletillas (`tono.py` sigue en 0,0). Se mantiene todo lo señalado como bueno en la ronda 1.

## Siguiente paso

Fusionar el PR #141 lo decide el dueño. Mientras no se fusione, producción sigue mostrando las frases bloqueantes de la ronda 1. Tras el despliegue, conviene comprobar en las URL públicas que aparecen las frases nuevas (por ejemplo, «No hay un plazo fijo de cierre»).
