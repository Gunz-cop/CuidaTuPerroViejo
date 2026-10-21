# Auditoría de tono, ronda 2: cama ortopédica, caídas y poliquezia

- **Rama auditada:** `claude/tono-correcciones-r1` @ `227e249` (PR #141), frente a `main` @ `26f9b77`
- **Blobs:** cama `eee2e36` · caídas `a9308d5` · poliquezia `87fc1d4`
- **Ronda:** 2 de 3, para los tres documentos
- **Fecha:** 2026-10-21
- **Auditor:** la misma sesión independiente de la ronda 1. No corrigió nada. La corrección la hizo otra sesión.
- **Alcance:** comprobar que se resolvió cada bloqueante de la ronda 1 y que la corrección no introdujo problemas nuevos. El PR #141 también toca otros 8 artículos; quedan fuera de esta auditoría.
- **Pruebas:** diff palabra a palabra de la rama frente a `main`, `tono.py` sobre cada archivo, `npx astro build` de la rama en un worktree aparte (correcto) y comprobación de que las frases corregidas aparecen en el HTML generado. Todo en local; no se verificó producción.

## Veredictos

| Artículo | Veredicto | Motivo |
|---|---|---|
| Cama ortopédica | **APTO** | Los dos bloqueantes están resueltos y el sentido clínico vuelve al original. Queda un detalle de voz (P2). |
| Prevención de caídas | **APTO** | Los dos bloqueantes están resueltos con el texto propuesto y no hay nada nuevo. |
| Poliquezia | **APTO** | El P0 del MSD y los dos P1 están resueltos. La frase sin atribución es general y de bajo riesgo. |

«APTO» se refiere a los bloqueantes de esta auditoría de tono y alcance clínico. Siguen abiertos los P1 y P2 preexistentes de la ronda 1, que no eran bloqueantes (lista al final). Los bloqueos mecánicos de `metricas.mjs` contra un brief inexistente o desfasado tampoco los introdujo la reescritura.

## Bloqueantes de la ronda 1: comprobación

### Cama ortopédica

| # | Ronda 1 | Ahora (rama) | Estado |
|---|---|---|---|
| P0 | L90: «…si la inflamación baja o la enfermedad avanza menos lo valora tu veterinario…» | «Que prefiera una cama te dice que la elige, no que la inflamación haya bajado ni que la enfermedad avance menos: eso lo valora tu veterinario con tus observaciones y su exploración.» | **Resuelto.** Vuelve el límite original («no prueba que se haya reducido la inflamación o frenado una enfermedad») y la coma que faltaba deja de ser necesaria. |
| P1 | L24: «Una superficie cómoda le ayuda a descansar…» | «Una superficie cómoda puede ayudarle a descansar, pero no cura la displasia ni garantiza prevenir la artrosis: tratarlas, y tratar el dolor, sigue en manos de tu veterinario.» | **Resuelto en lo clínico.** Vuelven el modal y los dos límites del texto de antes de la reescritura («no cura», «no garantiza prevenir artrosis»). |

**Nuevo, P2 (voz, no bloquea):** «**ni garantiza**» es la muletilla «no garantiza» con otra conjunción. El patrón de `tono.py` (`\bno (…garantiza…)`) no la detecta, así que el 0,0/1000 no la cuenta. Además «tratarlas» se refiere a displasia y artrosis cuando lo que se acaba de nombrar es *prevenir* la artrosis, y la frase queda con dos incisos. Propuesta para cuando se toque el archivo, que conserva los dos límites: «Una superficie cómoda puede ayudarle a descansar. Curar la displasia, prevenir o tratar la artrosis y controlar el dolor sigue en manos de tu veterinario.»

### Prevención de caídas

| # | Ronda 1 | Ahora | Estado |
|---|---|---|---|
| P1 | L31: «Reduce riesgos y va de la mano de la consulta…» | «Va de la mano de la consulta; aun así, alguna caída puede ocurrir.» | **Resuelto.** Desaparece la afirmación de eficacia que no se podía verificar. El sujeto implícito («Adaptar la casa», frase anterior) se entiende. |
| P1 | L72: «…la densidad de la espuma depende de cada perro.» | «Una cama muy alta o muy blanda puede complicarlo, y no hay una densidad de espuma que sirva para todos los perros.» | **Resuelto.** Vuelven el modal y el sentido original, y queda coherente con la guía de camas. |

Sin problemas nuevos.

### Poliquezia

| # | Ronda 1 | Ahora | Estado |
|---|---|---|---|
| P0 | L56: indiscreción alimentaria atribuida al MSD de colitis, que no lo dice | «Comer sobras, basura o comida de otros animales puede alterar la digestión.» (sin enlace) | **Resuelto.** Ya no se atribuye nada falso a la fuente. Es una afirmación general y de bajo riesgo que lleva a una acción prudente (anotar y evitar). Que no tenga fuente no bloquea. Mejora opcional: citarla cuando aparezca una página que la respalde de verdad. |
| P1 | L42: «…se diagnostican con ese conjunto, no con el número.» | «Con el número solo no se diagnostica tránsito acelerado, colitis ni malabsorción: lo hace tu veterinario con ese conjunto, la exploración y las pruebas.» | **Resuelto.** Ya no contradice la línea 36. |
| P1 | L58: «…espera a conocer la causa antes de añadir fibra, aceites o suplementos.» | «Mantén su alimento completo y añade fibra, aceites o suplementos solo si tu veterinario lo indica.» | **Resuelto.** Ahora coincide con el AlertBox de la línea 81. |

Comprobaciones adicionales:
- El MSD sigue citado en la línea 36 (signos de intestino grueso, verificado en la ronda 1) y en el cierre («Signos y causas posibles»). La página sí enumera causas (infecciosas, traumáticas, urémicas, alérgicas), así que esa descripción sigue siendo correcta.
- La primera persona de Dakota y Luna no se tocó: sigue sin datos, diagnósticos ni desenlaces añadidos.

Sin problemas nuevos.

## Medidas

| Artículo | `tono.py` | Palabras (script) |
|---|---|---|
| Cama | 0,0/1000 (más 1 «ni garantiza» que el script no detecta) | 973 |
| Caídas | 0,0/1000 | 837 |
| Poliquezia | 0,0/1000 | 989 |

## Pendientes abiertos de la ronda 1 (no bloqueantes, sin corregir)

- **Cama:** falta la declaración visible de IA, y el aviso «no son Luna y Dakota» no se ve porque el layout oculta el pie de la imagen repetida (P1). Quedan también los P2 de las líneas 78, 53 y 17.
- **Caídas:** falta la declaración visible de IA (P1). Quedan los P2 de las líneas 53, 62 y 29, y la imagen de las tijeras.
- **Poliquezia:** densidad (17 % de párrafos de más de 50 palabras), «compartían» en la línea 52, mezcla de voz en la línea 26, Weber «no midió», «aplicable a» en la línea 72, Merck «conservado», URL de WSAVA y `TODO.md:16` sin marcar.
- **Proceso:** hay que auditar el brief de poliquezia (atribuciones falsas al MSD y a WSAVA, y un desenlace exigido sin documentar) con `auditar-briefing-contenido` en otra sesión.

Si se corrigen estos pendientes, la ronda 3 es la última disponible para estos tres documentos.
