# Auditoría: prevención de caídas (reescritura de tono, PR #131)

- **Archivo:** `src/content/blog/prevencion-caidas-perro-mayor.mdx`
- **Versión auditada:** `main` @ `26f9b77`, blob `3bb8dce` (commit de tono `aad9f9b`, frente a `aad9f9b^`)
- **Ronda:** 1 de 3
- **Fecha:** 2026-10-21
- **Auditor:** sesión independiente. No se corrigió nada.
- **Contrato:** no hay brief. Se audita contra la guía de voz, la guía de calidad editorial y la consigna de la reescritura («no cambies afirmaciones clínicas, fuentes, enlaces ni datos»).

## Veredicto

**NO APTO.** La reescritura añadió dos afirmaciones que no estaban: que adaptar la casa «reduce riesgos» (línea 31, pegada a una cita AAHA que no se puede verificar) y que «la densidad de la espuma depende de cada perro» (línea 72), que contradice la guía de camas a la que enlaza.

Plano mecánico: `metricas.mjs` da NO APTO por *sin brief*, *sin AlertBox de fuentes* y *sin tabla de trazabilidad*. Los tres bloqueos son preexistentes, idénticos en la versión anterior. Plano manual: levantado.

## Hallazgos

### P1 (bloquean esta ronda porque rompen la consigna de no cambiar afirmaciones)

**1. Línea 31: beneficio nuevo atribuido de facto a AAHA.**

| Antes | Ahora |
|---|---|
| «Las modificaciones ambientales complementan el manejo del dolor, como describen las guías AAHA… No sustituyen la consulta ni garantizan evitar caídas.» | «Adaptar la casa complementa el manejo del dolor, como describen las guías AAHA… **Reduce riesgos** y va de la mano de la consulta, aunque alguna caída puede ocurrir igualmente.» |

«Reduce riesgos» es una afirmación de eficacia que no estaba. La página AAHA 2022 devuelve 403, así que no se pudo comprobar si la respalda. La AAHA senior habla de identificar peligros en casa, no de una reducción de caídas medida. Es plausible, pero no está verificada y se lee como parte de lo que «describen las guías».
**Corrección:** «Adaptar la casa complementa el manejo del dolor, como describen las guías AAHA…, y va de la mano de la consulta; aun así, alguna caída puede ocurrir.»

**2. Línea 72: densidad «según cada perro».**

| Antes | Ahora |
|---|---|
| «Una cama muy alta o muy blanda **puede complicarlo**; **no se prescribe una densidad mínima** de espuma para todos los perros.» | «Una cama muy alta o muy blanda **lo complica**; la densidad de la espuma **depende de cada perro**.» |

Antes decía que no hay una cifra prescrita. Ahora sugiere que existe una densidad correcta para cada perro, cuando la guía de camas enlazada justo debajo (línea 74 → `cama-ortopedica…`, línea 43) dice que la densidad informa de la composición y que la comodidad y la utilidad se valoran aparte. También se quita el modal («puede complicarlo» pasa a «lo complica»).
**Corrección:** «Una cama muy alta o muy blanda puede complicarlo, y no hay una densidad de espuma que sirva para todos los perros.»

### P1 preexistente

**3. Falta la declaración visible de IA.** La línea 21 dice «Las imágenes son ilustraciones», no que estén generadas con IA (§3 de calidad editorial). El pie visible del hero es su `alt`.

### P2

| Línea | Antes → ahora | Problema |
|---|---|---|
| 53 | «No cortes a ciegas ni fuerces una pata dolorosa.» → «Corta solo lo que ves bien y con la pata relajada.» | La prohibición pasa a ser una instrucción para cortar, y se pierde «pata dolorosa». La frase siguiente cubre el dolor, pero ahora el párrafo invita a cortar en casa justo después de pedir «valoración y una técnica». Mejor: «Si cortas en casa, corta solo lo que ves bien y nunca sujetes a la fuerza una pata que duele.» |
| 29 | «no permite diagnosticar por sí solo» → «el diagnóstico… **sale de la exploración**» | Reduce el alcance: el diagnóstico de artrosis o de una lesión nerviosa suele necesitar pruebas, además de la exploración. Mejor: «sale de la consulta y sus pruebas». |
| 62 | «No levantes al perro por las patas…» → «ayúdalo **siempre** sin levantarlo…» | Ambiguo: se puede leer como «ayúdalo siempre». La advertencia de seguridad conviene que vuelva a ser una frase propia: «Nunca lo levantes por las patas ni tires del cuello.» |
| 76 | Se quita «una cama por sí sola no elimina ese riesgo» | Queda cubierto a medias por «además de la cama». Aceptable. |
| 45 | «No hace falta cubrir toda la casa si…» → «Con un recorrido… **es suficiente**» | Más tajante, aunque equivalente. Menor. |
| Imagen `pelo-interdigital…` | — | Preexistente: unas tijeras de punta junto a las almohadillas y la pata levantada y sujeta con la mano. Visualmente choca con «cuidado sin forcejeo». El alt («zona interdigital de una pata canina») no menciona la mano ni las tijeras. Que decida el dueño. |
| Tabla «Lista de revisión» | — | A 390 px tiene 29 px de scroll horizontal interno (`scrollWidth` 387 frente a 358), con 675 px de alto. No hay scroll de página. |

Densidad: media 35, mediana 37, 0 % de párrafos de más de 50 palabras. Bien. Un solo H3 en ~1.083 palabras (preexistente).

## Fuentes: afirmación → localización → comprobación

| Fuente | Afirmación | Comprobación |
|---|---|---|
| AAHA 2023 senior, *Pain Management* | Valorar función y movilidad; vídeo espontáneo (línea 29) | 403 directo. El extracto indexado coincide (observación del hogar, rampas, alfombras, peligros). Verificación parcial. |
| AAHA 2022, *Nonpharmacologic Modalities* | Lo ambiental complementa el manejo del dolor (línea 31) | 403. Los resúmenes públicos incluyen *environmental modifications*. **«Reduce riesgos» no se pudo verificar** (hallazgo 1). |

## Recursos prometidos

| Recurso | Ruta | Prueba | Resultado |
|---|---|---|---|
| Hero e imagen de la pata | `/images/blog/prevencion-caidas/…` | Playwright 390/1366 | Cargan (358 px y 686 px de alto) |
| Enlaces internos (4) | selector, camas, úlceras, pilar | Rutas compiladas | OK en local |
| «Puedes copiarla» (tabla) | Tabla en el cuerpo | Render | Presente. No promete descarga |

Comprobación solo local. No se verificó producción.

## Lo que sí funciona

- El AlertBox danger (línea 33) y la prohibición de pruebas caseras de reflejos siguen intactos. No tocarlos.
- Las líneas 39 y 60 están bien resueltas en afirmativo: «Pruébalas en tu suelo», «Una rampa no es siempre mejor que una escalera».
- La línea 88 mejora la utilidad («toca revisar la causa clínica antes de sumar más soluciones») sin cambiar el sentido.
- `tono.py`: 8,5 → 0,0/1000. De tú en todo el texto, frases de 16,4 palabras de media, sin fugas del brief.

## Qué corregir, en orden

1. Línea 31 y línea 72 (P1), con los textos propuestos.
2. Declaración visible de IA en la línea 21 (P1, preexistente).
3. Al tocar el archivo: líneas 53, 62 y 29 (P2).

Prompt para la sesión correctora:

> En `src/content/blog/prevencion-caidas-perro-mayor.mdx` (rama propia, no `main`): (1) línea 31, sustituye la segunda frase por «…y va de la mano de la consulta; aun así, alguna caída puede ocurrir.», quitando «Reduce riesgos»; (2) línea 72: «Una cama muy alta o muy blanda puede complicarlo, y no hay una densidad de espuma que sirva para todos los perros.»; (3) línea 21: «Las imágenes son ilustraciones generadas con IA, no resultados de un paciente.»; (4) línea 53: «Si cortas en casa, corta solo lo que ves bien y nunca sujetes a la fuerza una pata que duele.»; (5) línea 62: separa la advertencia: «Pide una demostración si necesita soporte al levantarse o caminar. Nunca lo levantes por las patas ni tires del cuello.»; (6) línea 29: «sale de la consulta y sus pruebas». No cambies nada más. Comprueba que `tono.py` sigue ≤ 3/1000 y que `npx astro build` pasa.
