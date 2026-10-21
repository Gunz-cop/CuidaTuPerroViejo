# Auditoría de tono — `incontinencia-urinaria-perros-mayores.mdx`

- **Ronda:** 1 de 3
- **Fecha:** 2026-10-21
- **Versión auditada:** `main` @ `26f9b77`, blob `a46109f27552` (commit de la reescritura `e23a22a`, PR #128)
- **Versión de comparación:** `e23a22a^` (estado tras `872517c`, 2026-10-16)
- **Brief:** no existe. Se audita contra la guía de voz y tono, la guía de calidad editorial y la consigna de la reescritura.
- **Producción:** `/higiene-hogar-perros-senior/incontinencia-urinaria-perros-mayores` responde 200 y ya sirve esta versión (contiene «Esta guía no respalda»).

## Veredicto

**NO APTO (Publicable con una corrección de una línea).** La reescritura mantuvo casi todo el sentido clínico, pero en L125 convirtió una salvedad propia del artículo («no se demuestra aquí») en una postura atribuible a la guía de UC Davis, que no se pudo leer (403).

Plano mecánico: `tono.py` 0,0/1000 (antes 1,6). Plano manual: diff, fuentes e imágenes revisados; captura responsive **no realizada**.

## Hallazgos

### P0 — Atribución a una fuente (bloqueante)

| # | Línea | Antes | Ahora | Qué cambió |
|---|---|---|---|---|
| B1 | 125 | «No se demuestra **aquí** que vitaminas, antioxidantes o acupuntura recuperen el control vesical.» | «**Esta guía** no respalda que vitaminas, antioxidantes o acupuntura recuperen el control vesical.» | La lista cuelga de «La [guía UC Davis de incontinencia] describe…» (L121). «Esta guía» se lee como la de UC Davis: se le atribuye una postura sobre acupuntura y vitaminas. Su URL devuelve 403 y no se pudo comprobar. Existe literatura veterinaria sobre acupuntura en incontinencia (serie retrospectiva de Lane y Hill, *Open Vet J* 2022), así que la atribución no es inocua. Cambia la relación fuente→afirmación, que la consigna prohibía tocar. |

### P2 — Cambios menores de alcance

- **L95:** «No apliques productos perfumados, antisépticos ni cremas por tu cuenta» → «espera a esa indicación antes de aplicar productos perfumados, antisépticos o cremas». Da a entender que el plan veterinario podría indicar productos perfumados. Conviene sacarlos de la frase.
- **L121:** «Bajo ninguna circunstancia debes resignarte a pensar que […] no hay nada que hacer» → «**hay mucho que se puede hacer**». Pasa de exhortación a promesa general de eficacia.
- **L57:** «no demuestra por sí solo fallo del esfínter» → «aunque **es distinto** de un fallo del esfínter». Correcto en el contexto (la misma frase dice que pueden coexistir), pero menos preciso.

El resto del diff conserva el alcance: L18 (agua y sin castigos), L89 (limpiar y secar no impide la dermatitis), L104, L139 y el `AlertBox` de amoníaco (L81, texto idéntico al anterior).

### P1/P2 — Hallazgos previos a la reescritura (no los causó el PR #128)

- **P1. Ningún enlace interno en el cuerpo.** El artículo habla de disfunción cognitiva (L37), camas ortopédicas (L75), caídas (L79) y Cushing (L136) sin enlazar nada. `src/data/internal-links.ts` lo incluye en el silo, así que `SiloNavigation` añade enlaces al pie; aun así no hay ningún enlace contextual.
- **P2. MSD «Disorders of Micturition» (L149)** solo aparece en «Fuentes consultadas», no en el cuerpo: no cuenta como citada.
- **P2. Afirmaciones sin fuente en el cuerpo:** L24 «puedes evitar que le quite calidad de vida» (promesa), L51 «Muchos perros senior sufren espondilosis, hernia discal o síndrome de cauda equina», L82 el mecanismo del amoníaco.
- **P2. Imagen `higiene-perro-senior.webp` (L91):** muestra una clínica, con personal uniformado («Sarah», logotipo «ANIMAL CARE»), en un H2 de higiene en casa. El `alt` es correcto pero incompleto y el pie dice «Ilustración».
- **P2. Densidad de párrafo** media 43 (spec 30–40), 13 % > 50 palabras.
- **P2.** «Fuentes consultadas» es un H2 con lista, no el `AlertBox` de cierre del resto del sitio (el script lo marca como bloqueante por convención, sin brief).

## Fuentes: fuente → afirmación → comprobación

| Fuente | Afirmación | Comprobación (2026-10-21) |
|---|---|---|
| ACVIM consensus, Kendall A, Byron JK, Westropp JL et al., *J Vet Intern Med* 2024;38(2):878-903, PMID 38217372, DOI 10.1111/jvim.16975 | Evaluación, diagnósticos diferenciales, IMEU | **Verificada** (E-utilities): identidad, año y revista correctos. El resumen cubre diagnóstico y tratamiento de trastornos de almacenamiento; la mención de hembras esterilizadas no está en el resumen (texto completo no revisado en esta ronda). |
| Merck, Pharmacotherapeutics in Urinary Incontinence (Dowling, rev. nov. 2023) | La PPA aumenta el tono uretral; estrógenos; efectos secundarios | **Verificada**: «increase urethral tone and maximal urethral closure pressure»; los efectos adversos están descritos. No menciona acupuntura. |
| UC Davis, Urinary Incontinence in the Dog | Evaluación y opciones médicas | **403: limitación de acceso.** No se pudo comprobar el contenido, ni por tanto B1. |
| Merck Dog Owners, Infectious Diseases of the Urinary System | Signos de ITU | 200; afirmación por concepto, sin cambios. |
| MSD, Disorders of Micturition | — | 200; solo en la lista final (ver P2). |

## Recursos prometidos

Ninguno (sin descargas, vídeos ni herramientas).

## Métricas

| Métrica | Antes | Ahora |
|---|---|---|
| `tono.py` | 1,6 (3 en 1871) | **0,0** (0 en 1764) |
| Densidad de párrafo | — | 43 / 44 / 13 % |
| Relleno SEO («Es vital entender», «A continuación, analizamos») | 2 | 0 |

Voz: de tú, afirmativa y con empatía breve al abrir (L24). Cumple la guía.

## Lo que sí funciona

- L32 aplica el ejemplo literal de la guía («Tu perro **no decide orinarse en casa**…»).
- La FAQ del agua (L136) conserva la advertencia en negrita sin ablandarla.
- L89 reformula el «no garantizan» sin perder el límite: «aunque la dermatitis o la infección pueden aparecer igualmente». Es el modelo que deberían seguir las otras dos reescrituras.

## Qué corregir, en orden

> En `src/content/blog/incontinencia-urinaria-perros-mayores.mdx` (rama nueva desde `main`):
> 1. L125: «Esta guía no respalda que vitaminas, antioxidantes o acupuntura recuperen el control vesical.» → «En este artículo no recomendamos vitaminas, antioxidantes ni acupuntura para recuperar el control vesical: pregunta a tu veterinario qué evidencia hay para su caso.»
> 2. (P2) L95: «…y espera a esa indicación antes de aplicar productos perfumados, antisépticos o cremas.» → «…Evita los productos perfumados y espera a esa indicación antes de usar antisépticos o cremas.»
> 3. (P2) L121: «hay mucho que se puede hacer» → «muchas causas tienen tratamiento».
> 4. (P1, aparte de la voz) Añade enlaces contextuales a los artículos de disfunción cognitiva, cama ortopédica y Cushing; sigue la skill `enlazado-interno-sitio`.
> Mide con `tono.py`, ejecuta `npx astro build` y no hagas push a `main`.
