# Auditoría: cama ortopédica (reescritura de tono, PR #130)

- **Archivo:** `src/content/blog/cama-ortopedica-perros-mayores-displasia-artrosis.mdx`
- **Versión auditada:** `main` @ `26f9b77`, blob `3e8aecf` (commit de tono `96a2893`, frente a `96a2893^` = `872517c`)
- **Ronda:** 1 de 3
- **Fecha:** 2026-10-21
- **Auditor:** sesión independiente de la que reescribió. No se corrigió nada.
- **Contrato:** no hay brief (`briefings/` ni `docs/contenido/`). Se audita contra la guía de voz, la guía de calidad editorial y la consigna de la reescritura (`docs/contenido/prompt-revision-tono.md`: «no cambies afirmaciones clínicas, fuentes, enlaces ni datos»).

## Veredicto

**NO APTO.** La línea 90 cambió «la preferencia no prueba que se haya reducido la inflamación» por una frase que da por posible que la cama baje la inflamación o frene la enfermedad: un límite clínico ablandado justo en el sentido que favorece la venta.

Plano mecánico: `metricas.mjs` da NO APTO por *sin brief*, *sin AlertBox de fuentes* y *sin tabla de trazabilidad*. Los tres bloqueos ya estaban en la versión anterior (`872517c`) y no los introdujo la reescritura. Plano manual: levantado (fuentes, imagen, responsive y lectura completa).

## Hallazgos

### P0

**1. Línea 90: límite clínico ablandado.**

| Antes (`872517c`) | Ahora |
|---|---|
| «La preferencia por una cama indica elección, pero no prueba que se haya reducido la inflamación o frenado una enfermedad. El seguimiento combina observaciones y valoración clínica.» | «Que prefiera una cama te dice que la elige; si la inflamación baja o la enfermedad avanza menos lo valora tu veterinario, con tus observaciones y su exploración.» |

Antes, la frase decía que la preferencia no prueba nada clínico. Ahora le deja al veterinario decidir *si la inflamación baja*, y con eso presupone que la cama puede bajarla. Ninguna de las dos fuentes AAHA atribuye a la cama un efecto antiinflamatorio o de progresión. Además falta una coma antes de «lo valora».

**Corrección propuesta:** «Que prefiera una cama te dice que la elige, no que la inflamación haya bajado: eso lo valora tu veterinario con tus observaciones y su exploración.» (0 muletillas según `tono.py`.)

### P1

**2. Línea 24 (AlertBox info): de posibilidad a efecto.** «Una superficie cómoda **puede facilitar** el descanso, pero no cura displasia, **no garantiza prevenir artrosis**…» pasó a «Una superficie cómoda **le ayuda** a descansar, y el tratamiento… sigue en manos de tu veterinario». Se quita el modal en un beneficio de producto y desaparece del primer bloque visible el límite sobre la prevención de la artrosis (sigue en la FAQ, línea 100).
**Corrección:** «Una superficie cómoda puede ayudarle a descansar; prevenir la artrosis y tratar la displasia y el dolor sigue en manos de tu veterinario.»

**3. El aviso de que la ilustración no muestra a Luna y Dakota no se ve (preexistente).** La imagen del cuerpo (línea 61) es la misma que el hero. El layout la oculta junto con su pie (`display:none`, medido a 390 px). El único pie visible es el `heroImageAlt`: «Dos perras medianas acostadas juntas en una cama ortopédica…». La imagen muestra **dos Beagle**, la raza de Luna y Dakota, y el texto visible no dice que estén generadas con IA: la línea 21 solo dice «ilustraciones». Esto incumple el §3 de calidad editorial (declaración visible de IA en el pie o el hero).
**Corrección:** pasar la declaración a la línea 21 o al alt/pie del hero: «Ilustraciones generadas con IA; no muestran a Luna y Dakota ni una recuperación.»

### P2

| Línea | Antes → ahora | Problema |
|---|---|---|
| 78 | «No se ofrece una vida útil universal…» → «…que **no existen** como regla universal» | Antes decía que el artículo no ofrece una cifra; ahora afirma algo sobre el mundo. Es plausible, pero es una afirmación nueva. |
| 53 | «no todas las espumas o telas admiten la misma temperatura» → «**cada** espuma y **cada** tela admite su propia temperatura» | Generaliza de más. Mejor: «no todas las espumas y telas aguantan la misma temperatura». |
| 31 | Se quitan «universal» (densidad) y «obligatoria» (edad) | Matiz menor: «no fijan una edad para comprar» es más tajante que «no establecen una edad obligatoria». Sin verificación posible (AAHA devuelve 403). |
| 17 | «no demuestran por sí solas» → «**por sí mismas no indican**» | La salvedad sigue ahí con un sinónimo que `tono.py` no detecta. El 0,0/1000 es literal, no de fondo. |
| 55 | «atender la piel» → «revisa su piel» | Reduce un poco el alcance (revisar en vez de atender). |
| 66 | Tabla de 3 columnas | A 390 px mide 835 px de alto y tiene 5 px de scroll interno (`scrollWidth` 363 frente a 358). No hay scroll de página. Aceptable. |

Densidad: media 38, mediana 39, >50 palabras: 10 % (antes 5 %). Párrafos de 55 palabras en las líneas 17 y 37. Cadencia de un H3 cada ~242 palabras (antes ~234).

## Fuentes: afirmación → localización → comprobación

| Fuente | Afirmación en el artículo | Comprobación |
|---|---|---|
| AAHA 2022, *Nonpharmacologic Modalities* | Modificaciones del entorno dentro de un manejo multimodal; no fija densidad, grosor ni edad (líneas 29 y 31) | **No verificable hoy:** 403 con WebFetch y con curl. Los resúmenes públicos (AVMA, AAHA) mencionan *environmental modifications* entre las modalidades no farmacológicas. La afirmación negativa no cambió de fondo con la reescritura. Limitación de acceso, no fallo confirmado. |
| AAHA 2023, *Senior care – Pain Management* | Observar función, movilidad y comportamiento; vídeo (líneas 29 y 88) | 403. El extracto indexado habla de modificar el hogar (rampas, alfombras o esterillas) para movilidad y calidad de vida. Coherente. Verificación parcial. |

## Recursos prometidos

| Recurso | Ruta | Prueba | Resultado |
|---|---|---|---|
| Hero | `/images/blog/cama-ortopedica/dos-perras-cama-ortopedica-compartida.webp` | Build local + Playwright | Carga a 390 y 1366 px |
| Enlaces internos (4) | caídas, pilar, úlceras, selector | Rutas presentes en `dist/client` | OK en local |
| Selector de movilidad | `/herramientas/selector-movilidad-perros-mayores` | Ruta compilada | Existe. No se recorrió la herramienta (fuera del alcance del cambio de tono) |

Todo esto es comprobación local (`npx astro build` OK, servidor estático). No se verificó producción.

## Lo que sí funciona

- La tabla «Cómo leer lo que promete el vendedor» conserva intactos los límites comerciales (no cura artrosis, no previene úlceras, no hay firmeza clínica universal). No hay que tocarla.
- Las líneas 74 y 80 quedaron en afirmativo sin perder el sentido: «puedes quedártela aunque cumpla años», «el material es solo una de las posibles causas».
- Los AlertBox de warning y danger (líneas 82 y 92) no se tocaron y siguen concentrando la seguridad.
- Voz: de tú en todo el texto, sin voseo ni usted, sin instrucciones del brief filtradas. `tono.py`: 10,8 → 0,0/1000.

## Qué corregir, en orden

1. Línea 90 (P0), con el texto propuesto.
2. Línea 24 (P1): devolver el modal y el límite de prevención.
3. Declaración visible de IA y de «no son Luna y Dakota» en el hero o en la línea 21 (P1, preexistente).
4. Al tocar el archivo: líneas 78 y 53 (P2).

Prompt para la sesión correctora:

> En `src/content/blog/cama-ortopedica-perros-mayores-displasia-artrosis.mdx` (rama propia, no `main`): (1) sustituye la línea 90 por «Que prefiera una cama te dice que la elige, no que la inflamación haya bajado: eso lo valora tu veterinario con tus observaciones y su exploración.»; (2) en el AlertBox info (línea 24), cambia «le ayuda a descansar, y el tratamiento de la displasia, la artrosis y el dolor sigue en manos de tu veterinario» por «puede ayudarle a descansar; prevenir la artrosis y tratar la displasia y el dolor sigue en manos de tu veterinario»; (3) en la línea 21, cambia la segunda frase por «Las imágenes son ilustraciones generadas con IA: no muestran a Luna y Dakota ni una recuperación.»; (4) línea 53: «no todas las espumas y telas aguantan la misma temperatura»; línea 78: «Esas señales te orientan mejor que una cifra de vida útil o de pérdida de altura, que aquí no damos como regla universal.» No cambies nada más. Comprueba que `tono.py` sigue ≤ 3/1000 y que `npx astro build` pasa.
