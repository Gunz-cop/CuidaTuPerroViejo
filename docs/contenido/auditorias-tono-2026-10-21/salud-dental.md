# Auditoría de tono — salud dental en perros mayores (ronda T1)

- **Archivo:** `src/content/blog/salud-dental-perros-mayores.mdx`
- **Versión auditada:** `main` @ `26f9b77`, SHA-256 `59120fcc84f0246d05a57ef15f3b14c2faa0499950b60049a4d98d218e87a306`
- **Cambio auditado:** commit `2eae88d` (PR #138), reescritura de voz. Consigna: no cambiar afirmaciones clínicas, fuentes, enlaces ni datos.
- **Ronda:** T1 de un máximo de tres. Fecha: 2026-10-21.
- **Brief:** **no existe.** `docs/contenido/salud-dental-perros-mayores/` solo contiene `guia-visual/`, que es la propuesta y la auditoría del componente `DentalBrushingGuide` (PR #118), no un brief de contenido. No hay ningún `briefings/briefing-salud-dental-perros-mayores.md`. Se audita contra la guía de voz y tono y la guía de calidad editorial.

## Veredicto

**Publicable con reservas (APTO para la reescritura de tono):** el PR #138 no cambió el alcance clínico de ninguna frase. Los defectos que quedan **ya existían antes** del PR y se deben corregir en la próxima edición del artículo.

- **Mecánico:** `tono.py` da 0,0/1000 (antes, 3,5). Densidad: media 34, mediana 38, 7 % por encima de 50 palabras. El script da 4 bloqueos: no hay brief, no hay cuadro «Fuentes científicas y de autoridad», no hay tabla de trazabilidad y falta un AlertBox danger. Todos dependen de un contrato que no existe y ninguno viene del PR.
- **Manual:** se revisaron las 15 frases del diff, se abrieron las 2 imágenes y se leyó el artículo entero.

## Contraste antes / después (PR #138)

| Línea | Antes → ahora | Alcance |
|---|---|---|
| 18 | «no sustituye el tratamiento de una enfermedad dental dolorosa» → «si hay una enfermedad dental dolorosa, además necesita tratamiento» | Igual. |
| 32 | «esa asociación no prueba que cause todos ellos ni permite prometer que una limpieza los prevendrá» → «aunque asociación no es causa y una limpieza no viene con la promesa de prevenirlos» | Igual. Le falta el artículo («la asociación»). |
| 49 | «No diagnostiques gingivitis solo por el color» → «El color orienta; la gingivitis la confirma el veterinario» | Igual. |
| 65 | «No garantiza evitar toda enfermedad ni elimina el sarro establecido» → «frena la placa nueva, y el sarro ya formado lo retira el veterinario. Aun con una buena rutina, puede aparecer enfermedad» | **Ampliación pequeña:** «frena la placa nueva» es una afirmación de eficacia nueva en ese punto. Es coherente con la línea 69 (cepillado y Cornell, que ya estaban antes) y Cornell la respalda. Es aceptable. |
| 95 | «Una analítica normal no elimina todo riesgo; ser mayor tampoco descarta automáticamente el procedimiento» → «Ser mayor no excluye el procedimiento, y una analítica normal tampoco deja el riesgo en cero» | Igual. |
| 99-101 | Mitos: «Jamás» → «usa siempre pasta veterinaria»; «no identifica por sí sola una única causa» → «puede tener más de una causa» | Igual. |
| 103-105 | La cita del xilitol (blockquote dentro de una viñeta) pasa a un `AlertBox warning` | El texto es idéntico y la seguridad queda concentrada, como pide la regla 3 de la guía. |
| H2 | Se quitan emojis y mayúsculas («CRÍTICA», «DIARIA») | Solo forma. |

## Hallazgos (todos anteriores al PR #138)

### P1

**1. Infografía con faltas visibles.** El archivo `comparacion-dientes-sanos-periodontitis.webp` (línea 56) muestra «GINGIVTIS», «Encía firmo», «Diente limipio», «Parro y ólosa» y «retraíd». Cualquier lector lo ve y le resta confianza a una página de salud. La esquina inferior derecha lleva además la marca de un generador de imágenes.
*Corrección:* regenerar la imagen o rotular el texto aparte, sobre la ilustración.

**2. El `heroImageAlt` no describe la imagen.** El alt de la línea 8 dice «boca canina con sarro». La imagen muestra a una veterinaria con guantes que levanta el labio de un perro mestizo de pelo duro en la consulta. Esa misma imagen se repite en el cuerpo (línea 41) con otro alt, que esta vez sí es correcto. Incumple el «alt fiel» de la §3.
*Corrección:* usar el alt de la línea 41 también en el hero y no repetir la imagen en el cuerpo.

**3. Imágenes generadas con IA sin declararlo.** La línea 22 dice «Las imágenes son ilustraciones». La §3 pide declarar visiblemente las imágenes generadas con IA.
*Corrección:* «Ilustraciones generadas con IA; no son pacientes ni resultados clínicos de antes y después.»

**4. Merck aparece solo en «Fuentes consultadas».** No se cita junto a ninguna afirmación del cuerpo, así que es una fuente decorativa (§2). Varias afirmaciones de peso no tienen fuente al lado: «la única solución efectiva» (línea 82), las bacterias que «pueden pasar al torrente sanguíneo y viajar a órganos vitales» (línea 30), «Suele ser el primer signo de una infección bacteriana» (línea 48) y la «insuficiencia hepática fulminante» del xilitol (línea 104).
*Corrección:* citar Merck junto a la progresión y los signos (líneas 30-38 y 48), y una fuente toxicológica junto al AlertBox del xilitol. Si no se puede respaldar «la única solución efectiva», matizarla.

### P2

- **Repetición entre H2:** «Los perros son maestros en ocultar el dolor» (línea 33) vuelve a aparecer como «ocultan muy bien el dolor» (línea 46). La introducción gradual al cepillado sale tres veces: en la viñeta de la línea 72, en `DentalBrushingGuide` y en el H2 de la línea 115. Va contra la §1: cada H2 tiene que aportar algo distinto.
- **Restos de la voz anterior:** los H3 conservan «Tu mejor aliado» y «¿Funcionan?» con mayúscula tras los dos puntos (el PR lo corrigió solo en los H2). En la línea 109 queda «Monitorear».
- **Línea 32:** «aunque asociación no es causa» → «aunque la asociación no demuestra causa». Ojo: no se puede usar «no demuestra», que está en la lista de muletillas. Mejor: «aunque asociarse no es lo mismo que causarlas».
- **Frontmatter:** no tiene `status` y no hay bloque de FAQ. Es distinto de los otros dos artículos.
- **Observación sin verificar:** `guia-visual/README.md` dice «no integrar en main sin esa aprobación [del usuario]», y `DentalBrushingGuide` ya está en main (`8ffe74a`). No encontré constancia escrita de esa aprobación. Que lo confirme el dueño.

## Lo que sí funciona

- La reescritura no tocó ningún límite clínico: el riesgo anestésico individual, que la limpieza sin anestesia es cosmética, que la gingivitis la confirma el veterinario y que la asociación sistémica no se presenta como causa.
- Las señales de parada siguen junto a la maniobra («Detente ante dolor o miedo», línea 124), no solo en el cierre.
- Pasar el xilitol a un `AlertBox` mejora el texto. Hay que conservarlo.

## Recursos prometidos

| Recurso | Ruta | Prueba | Resultado |
|---|---|---|---|
| `DentalBrushingGuide` | `src/components/article/DentalBrushingGuide.astro` | El PR no lo tocó. Existe en disco | Sin cambios. Su aprobación de integración está pendiente de confirmar (ver arriba) |
| Enlaces externos (AVMA ×2, Cornell ×3, Merck) | — | Las URL no cambiaron en el diff | Sin cambios |
| Imágenes (2) | hero, comparación | Abiertas | Ver P1-1 y P1-2 |

Build no verificado en esta sesión: el contenedor no tiene `node_modules`. El `AlertBox` nuevo usa un componente que ya estaba importado (línea 15). Solo se comprobó en local.

## Qué corregir, en orden

No hace falta ninguna corrección del PR #138. Para la próxima edición del artículo: P1-1 (infografía), P1-2 y P1-3 (alt y declaración de IA), P1-4 (citas junto a las afirmaciones) y después las P2. Lo ideal es hacerlo con un brief nuevo, porque sin contrato no hay forma de medir la distribución ni la trazabilidad.
