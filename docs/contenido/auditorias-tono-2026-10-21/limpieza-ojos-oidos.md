# Auditoría de tono — limpieza de ojos y oídos (ronda T1)

- **Archivo:** `src/content/blog/limpieza-ojos-oidos-perros-ancianos.mdx`
- **Versión auditada:** `main` @ `26f9b77`, SHA-256 `08739e8d8b9578ae1c8f281fdc899c7c4a62643b199d290be86ae4a4a59abdaf`
- **Cambio auditado:** commit `3f9b5c9` (PR #137), reescritura de voz. Consigna: no cambiar afirmaciones clínicas, fuentes, enlaces ni datos.
- **Ronda:** T1 de un máximo de tres para la edición de tono. El documento ya tiene un historial: R1-R3 (16-oct, texto original) y E1-E2 (17-oct, edición de simplificación autorizada). Esta numeración T no reinicia ninguna de las dos series: abre la serie de una edición nueva, encargada por el dueño. **Lo tiene que confirmar el dueño** (§6 de calidad editorial).
- **Contrato:** `briefings/briefing-limpieza-ojos-oidos-perros-ancianos.md`, **modificado por la adenda** `docs/seo/correcciones-confianza-2026-10-17/edicion-tres-guias/alcance-autorizado.md`. La adenda sustituye los objetivos de extensión y distribución y retira de forma expresa Fefer, Moog y Nascimento.

## Veredicto

**No publicable (NO APTO):** la reescritura convirtió una prohibición de seguridad junto al ojo («no recortes pelo con tijeras mientras mueve la cabeza») en una instrucción para recortar el pelo.

- **Mecánico:** `tono.py` da 0,0/1000 (antes, 4,3). Densidad: media 38, mediana 36, 21 % por encima de 50 palabras, 0 fragmentos. El script da 12 bloqueos (volumen 1593 frente a 5440-7360, secciones entre −34 % y −88 %, falta el H2 de cierre, fuentes 1, 4 y 6 ausentes, falta un AlertBox info en el cuerpo). **Ninguno es un hallazgo:** todos vienen de la edición del 17-oct (`657b4e3`), que el dueño autorizó de forma expresa y documentó en la adenda. Medir contra el brief original sería auditar contra una decisión ya tomada.
- **Manual:** se revisaron las 21 frases del diff, las 3 imágenes y las FAQ.

## Hallazgos

### P0 — bloqueante

**B1. Línea 49: el recorte de pelo junto al ojo pasa de prohibido a indicado.**

| Antes (`3f9b5c9^`) | Ahora |
|---|---|
| «**Junto al ojo, evita improvisaciones:** **no recortes pelo con tijeras mientras mueve la cabeza**, no utilices remedios para blanquear manchas ni confundas un producto ótico con uno ocular.» | «**Junto al ojo, ve a lo seguro:** **recorta pelo solo con la cabeza quieta**, deja de lado los remedios para blanquear manchas y separa e identifica los envases…» |

El original no recomendaba recortar pelo junto al ojo: solo prohibía hacerlo con tijeras si el perro movía la cabeza. La versión nueva le da a la tutora una maniobra con tijeras junto al globo ocular y pierde la palabra «tijeras». Ninguna fuente del artículo (Cornell KCS, VCA, Cornell ótico, Merck) respalda ese recorte doméstico. La lista ocular de la adenda («contorno exterior sin presión/rascar/forzar») tampoco lo contempla. Es un cambio de alcance clínico que la consigna prohibía, y amplía una conducta de riesgo.

**Corrección propuesta:** «**Junto al ojo, ve a lo seguro:** no acerques tijeras si mueve la cabeza, deja de lado los remedios para blanquear manchas y separa e identifica los envases para no confundir un producto ótico con uno ocular.»

### P2 — menores (cambios de alcance pequeños)

| Línea | Antes → ahora | Efecto | Propuesta |
|---|---|---|---|
| 55 | «El color no identifica por sí solo una infección ni permite escoger gotas.» → «Esos datos ayudan más que el color, que no sirve para saber si hay infección ni para escoger gotas.» | Pasa de «el color solo no basta» a «el color no sirve». Además añade una comparación que ninguna fuente respalda. La FAQ 2 conserva la forma original. | «Esos datos orientan mejor que el color, que solo no identifica una infección ni sirve para elegir gotas.» |
| 65 | «consulta cómo mantenerlo; no lo suspendas por este consejo general» → «consulta cómo mantenerlo y sigue con él mientras tanto» … «deja el oído tranquilo hasta la consulta» | Pasa de no suspender a seguir aplicando el tratamiento. La frase siguiente pide no tocar el oído, y las dos chocan si ya hay gotas pautadas y se investiga una otitis. La adenda protege «no suspender prescripción por un consejo general». | «consulta cómo mantenerlo y no lo suspendas por tu cuenta». |
| 83 | «no inmovilices la cabeza para vencer resistencia» → «sin inmovilizarle la cabeza» | Amplía la prohibición a cualquier sujeción, aunque sea suave. | «sin sujetarle la cabeza para vencer su resistencia». |
| 86 | «No persigas material hacia el interior ni repitas para dejarlo impecable.» → «Con eso basta: no hace falta dejarlo impecable ni buscar más adentro.» | Una prohibición pasa a ser algo opcional. El AlertBox de abajo («No busques más adentro…») sostiene la seguridad, por eso no bloquea. | «Con eso basta: no persigas restos hacia dentro ni repitas para dejarlo impecable.» |
| 32 | «No provoques ruidos fuertes para comprobar la audición.» → «…fíjate en cómo responde en su día a día, sin provocar ruidos fuertes.» | Añade una instrucción de observación inocua. Mantiene la prohibición que exige la adenda. | Aceptable. |
| 126-131 | FAQ sin reescribir | Mantiene la voz anterior: «no permite identificar», «no aumentes». | Pasarlas a la voz nueva sin cambiar su contenido. |

Las otras 15 frases del diff mantienen el alcance: el lead, Cornell ótico, VCA, la sesión difícil, Cornell KCS, la cantidad y frecuencia, las gotas «prescritas para este episodio», los dos pies de imagen, el registro, la calculadora, el cuadro de fuentes y la responsabilidad.

## Lo que sí funciona

- Se conservan todos los puntos de seguridad de la adenda: ojo cerrado, dolor o cambio visual (AlertBox danger, línea 28), muestras antes de limpiar (Merck), seguridad del tímpano y ototoxicidad, nada de bastoncillos, boquilla sellada ni presión, parar ante el dolor, y el oído sano no necesita limpieza por la edad.
- Las fuentes no cambiaron: Cornell ótico, Merck, Cornell KCS y VCA, con los mismos enlaces y en los mismos H2.
- Las imágenes muestran al mismo cocker senior canela de hocico y cejas blancos. El hero lleva el paño en la piel bajo el ojo sin tocarlo, como dice su alt. La revisión del pabellón y el masaje en la base de la oreja coinciden con su alt. Todas declaran «generada con IA».
- El lead abre con la acción y termina con la condición. Así es como la guía de voz pide que se escriba.

## Recursos prometidos

| Recurso | Ruta | Prueba | Resultado |
|---|---|---|---|
| `OjosOidosVisual` decisión y secuencia | `src/components/article/OjosOidosVisual.astro` | Sin cambios en el diff. Componente presente | Sin cambios |
| Enlaces internos (5) | pilar, incontinencia urinaria y fecal, chequeo geriátrico, calculadora | `metricas.mjs`: 5/5 presentes | OK |
| Imágenes (3 + variantes) | `public/images/blog/limpieza-ojos-oidos-perros-ancianos/` | Abiertas y comparadas con su alt | OK |

Build no verificado en esta sesión: el contenedor no tiene `node_modules`. El diff solo cambia prosa dentro de JSX ya existente. Solo se comprobó en local.

## Qué corregir, en orden

1. B1 (línea 49).
2. La línea 65 (no suspender), porque toca un punto protegido por la adenda.
3. Las líneas 55, 83 y 86. Después, las FAQ.

**Prompt para la sesión de corrección:**

> En `src/content/blog/limpieza-ojos-oidos-perros-ancianos.mdx` (main @ 26f9b77) corrige solo estas frases, sin tocar nada más: (1) línea 49: «recorta pelo solo con la cabeza quieta, deja de lado…» → «no acerques tijeras si mueve la cabeza, deja de lado…» (el original prohibía, no indicaba recortar). (2) Línea 65: «y sigue con él mientras tanto» → «y no lo suspendas por tu cuenta». (3) Línea 55: «que no sirve para saber si hay infección ni para escoger gotas» → «que solo no identifica una infección ni sirve para elegir gotas»; «ayudan más» → «orientan mejor». (4) Línea 83: «sin inmovilizarle la cabeza» → «sin sujetarle la cabeza para vencer su resistencia». (5) Línea 86: «no hace falta dejarlo impecable ni buscar más adentro» → «no persigas restos hacia dentro ni repitas para dejarlo impecable». Verifica `tono.py` ≤ 3/1000 (no uses «por sí solo», «no basta» ni otras muletillas de la lista) y `npx astro build`. Rama propia y PR contra main, sin fusionar. Después, auditoría T2 en otra sesión.
