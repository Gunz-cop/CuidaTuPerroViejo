# Auditoría del brief «Mi perro viejo se cree cachorro», ronda R2

- **Documento auditado:** `briefings/briefing-perro-viejo-se-cree-cachorro.md`, versión v2.
- **Versión:** commit `63d7774`, blob `069cd9817cc2d0b8f1a44aed73c3c612626882d1`.
- **Ronda:** R2 de un máximo de 3. Base de comparación: [R1](auditoria-brief-r1.md), blob `f8be4db`.
- **Fecha:** 2026-11-18.
- **Rol:** revisor externo. No he corregido el brief. Lo audita la misma sesión que hizo la R1, a petición transmitida por la sesión autora, y no la que corrigió.
- **Método:** releí la v2 completa y comprobé cada hallazgo de la R1 contra el texto nuevo. Recalculé la suma de targets y contrasté las afirmaciones nuevas con el chequeo geriátrico del sitio, la guía de voz y el registro de la guía AAHA. Las fuentes verificadas en la R1 (PubMed, PMC7755036 y el gráfico MCS) no se volvieron a descargar: el texto que cita la v2 coincide literalmente con lo leído en la R1.

## Veredicto

**APTO CON CAMBIOS.** Los dos fallos que bloqueaban en la R1 están resueltos con la fuente correcta, y las correcciones no introducen invenciones ni enlaces rotos. Solo quedan dos ajustes P2 de coherencia interna. Puede aplicarlos el redactor al convertir el brief en artículo y no exigen una R3.

## Seguimiento de los hallazgos de la R1

| Hallazgo | Estado | Evidencia en la v2 |
|---|---|---|
| H1. Fuente 7 mal asignada (P0) | ✔ Resuelto | §3, Fuente 7: ahora es *Could it be osteoarthritis?*, Prev Vet Med 2020;185:105198, PMID 33227581, PMC7755036. El dato y las frases citadas coinciden literalmente con el texto que leí en la R1. PMC7291569 se retira con su motivo. La §9 está actualizada. |
| H2. «Se nota primero atrás» (P0) | ✔ Resuelto | La H3 se llama ahora «Dónde se nota la pérdida de músculo» y usa los músculos epaxiales (Fuente 2). La reverencia queda como «lo que vemos», no como prueba. En el video, el resaltado principal va en la columna, el secundario es más tenue y no lleva rótulo de «primero». |
| H3. «Peso estable» en Freeman (P1) | ✔ Resuelto | El dato de la Fuente 1 se limita al resumen. Lo del sobrepeso pasa a la Fuente 2 con la cita del gráfico (BCS > 5). |
| H4. Falta el H2 de consulta (P1) | ✔ Resuelto | Nuevo H2 «Cuándo llevarlo al veterinario», apoyado en la Fuente 3 y en el chequeo geriátrico. Incluye el enlace al chequeo y el AlertBox danger. |
| H5. Presupuesto (P1) | ✔ Resuelto | 300 + 300 + 350 + 400 + 450 + 400 + 250 + 150 = **2.600**, recalculado. El rango del contrato (2.210–2.990) es ±15 % ✔. |
| H6. Prompt 3, sujeto B (P1) | ✔ Resuelto | Pide «white muzzle, eyebrows and eyelids» y «softened topline and reduced thigh muscle under the extra weight». La ficha recoge los 5 rasgos de B. |
| H7. PMC7291569 decorativo (P2) | ✔ Resuelto | Retirado. |
| H8. Fidelidad al expediente (P2) | ✔ Resuelto | Dice «como cuando tenía 1 o 2 años». En la Conclusión separa la cita del dueño de la línea editorial. |
| H9. Lista de alarma sin fuente (P2) | ✔ Resuelto | Se presenta como criterio editorial y se quita el umbral numérico. Contrasté la lista con `chequeo-geriatrico-canino.mdx:27`. Pérdida de peso, menos apetito, dolor intenso y colapso están ahí. «Arrastra las patas traseras» y «no apoya una pata» no aparecen literalmente, pero son señales generales razonables y no se atribuyen a ninguna fuente. Lo acepto. |
| H10. Razas recientes (P2) | ✔ Resuelto | La lista está completa y hay un párrafo que diferencia esta portada de la de picadura de abeja: reverencia de mañana en un pasillo frente a perra tumbada en su cama. |
| H11. Prompt del video (P2) | ✔ Resuelto | Ahora dice «Reject if at mobile size the dog looks young». |
| H12. Guía de voz (P2) | ✔ Resuelto | Hay una sección «Voz y tono» que remite a `guia-voz-tono.md`. Lo que resume (de tú, español neutro, ≤ 3 muletillas/1000) coincide con las reglas 1 y 4 de la guía. |
| H13. Límites de Smith e Impellizeri (P2) | ✔ Resuelto | Smith tiene PMID 16948575 y el límite de una sola raza, con el 15/67 como prevalencia global. Impellizeri tiene PMID y DOI, Iams Co., el 60 % de calorías y la nota «no es una pauta». |
| H14. Canibalización con «Dieta para senior con sobrepeso» (P2) | ✔ Resuelto | Declarada en la §2, con la frontera clara: aquí se explica por qué importa el peso y no hay pautas de dieta. |

## Hallazgos nuevos

No hay P0 ni P1.

### P2

**N1. §3, Fuente 2: la H3 está asignada al H2 equivocado.** La línea *H2* dice «Cómo leer el cuerpo de tu perro en casa» y la H3 «Dónde se nota la pérdida de músculo». Pero en la §6 esa H3 cuelga de «Lo que cambia por dentro aunque no se note». La §6 y la tabla de la §9 son correctas («Lo que cambia por dentro / Cómo leer el cuerpo»), así que el contrato no se rompe. El riesgo es que un redactor lea solo la §3 y lleve el dato epaxial a la sección equivocada.

**N2. §3, Fuente 3: el límite contradice el uso.** El límite dice todavía «el redactor solo usa la definición de senior y el principio de revisiones periódicas». Sin embargo, el H2 nuevo le pide afirmar que la AAHA evalúa la «condición corporal y muscular y la movilidad».

Lo he comprobado y la afirmación sí tiene respaldo. La tabla 2 de la guía (*Diagnostic approaches by body system for senior dogs and cats*) pide, en la parte musculoesquelética, palpación general centrada en la columna, las extremidades y las articulaciones, *muscular condition score* y examen del movimiento. El apartado de nutrición también usa las puntuaciones de músculo y de condición corporal para seguir el envejecimiento. Lo confirmé con el extracto del buscador, porque aaha.org sigue devolviendo 403, así que la verificación es parcial.

No es un error de fuente, pero sí una instrucción contradictoria dentro del brief.

Una observación menor, que no es hallazgo: la §2 sigue presentando el cierre como una sola frase entre comillas («su mente no lo sabe; nos toca a nosotros saberlo»). La §6 ya aclara qué parte es cita del dueño y qué parte es editorial, y manda la §6.

## Revisión de errores introducidos por las correcciones

| Control | Resultado |
|---|---|
| Trazabilidad fuente → H2 | Las 7 fuentes tienen un H2 que desarrolla su dato. Fuente 1 → Lo que cambia por dentro. Fuente 2 → Lo que cambia por dentro y Cómo leer. Fuente 3 → Por qué no sabe que es viejo y Cuándo llevarlo. Fuentes 4, 5 y 6 → El peso. Fuente 7 → Cómo leer. Única incoherencia: la etiqueta de N1. |
| Cobertura inversa | Ningún H2 científico se queda sin fuente. «Cómo adaptar el juego» se apoya en artículos internos y en la experiencia propia, declarado así. |
| AlertBox | El info está en la Introducción; el warning, en «Cómo adaptar», junto a la maniobra («parar el juego si cojea o jadea mucho»); el danger, en «Cuándo llevarlo al veterinario», que es la sección diagnóstica. Los tres tipos están en su sitio ✔. |
| Arco | La apertura es de Luna en la Introducción, los momentos se reparten por los H2 y el desenlace queda en la Conclusión, sin H2 de historia ✔. El nuevo H2 de consulta no se inventa ninguna visita al veterinario de Luna o Dakota. «Peso mes a mes» va como consejo al lector, no como algo que haga la familia ✔. |
| Prompts | Los prompts 1, 2 y 3 y el del video tienen los 5 rasgos senior y el rechazo a tamaño móvil ✔. |
| Metadatos y enlaces | No han cambiado desde la R1: `seoTitle` 54, `metaDescription` 153, `pilar` válido, 6 rutas existentes ✔. Las notas «ruta verificada en R1» son correctas. |
| Hechos de la historia | No hay datos nuevos respecto al expediente ✔. |

## Verificación de fuentes (estado en la v2)

| # | Fuente | Identificador | Resultado |
|---|---|---|---|
| 1 | Freeman 2012 | PMID 22111652 | Verificada. El dato se limita al resumen. |
| 2 | WSAVA/Tufts MCS | PDF OSU | Verificada. El dato de los epaxiales y el del sobrepeso son literales. |
| 3 | AAHA 2023 | PMID 36584321 | Verificación parcial (aaha.org da 403). Lo del 25 % y lo de la condición muscular y la movilidad están confirmados por el registro y por el extracto. Ver N2. |
| 4 | Kealy 2002 | PMID 11991408 | Verificada. |
| 5 | Smith 2006 | PMID 16948575 | Verificada. Las cifras son exactas. |
| 6 | Impellizeri 2000 | PMID 10754668 · DOI 10.2460/javma.2000.216.1089 | Verificada. |
| 7 | Belshaw 2020, Prev Vet Med | PMID 33227581 · PMC7755036 | Verificada. Leí el texto completo y la cita es literal. |

## Efecto cascada

Todavía no hay un `.mdx` redactado. Ninguna otra parte del repositorio cita las fuentes corregidas, como ya se comprobó en la R1. No hay nada que propagar.

## Lo que sí funciona

- La corrección hizo exactamente lo que se pedía, sin «completar» nada de memoria. La mediana de Kealy sigue aislada como dato no citado y las lagunas declaradas se mantienen.
- El H2 nuevo se queda en revisiones y señales, sin dosis ni pautas, y no fabrica episodios clínicos de las perras.
- El rediseño del video conserva la idea narrativa (mente de cachorro, cuerpo de 11 años) y ahora enseña lo que dice la fuente.

## Qué corregir (sin R3)

La sesión autora puede aplicarlo antes de redactar, o el redactor puede tenerlo en cuenta al redactar:

1. **N1.** En la §3, Fuente 2, cambia la línea *H2* a: «"Lo que cambia por dentro aunque no se note" (H3 "Dónde se nota la pérdida de músculo") y "Cómo leer el cuerpo de tu perro en casa"».
2. **N2.** En la §3, Fuente 3, sustituye el *Límite* por: «Verificación parcial (aaha.org da 403). La definición de senior y la evaluación de la condición muscular, la palpación y el examen del movimiento están confirmadas por el registro de PubMed y por la tabla 2 de la guía (https://www.aaha.org/globalassets/02-guidelines/2023-aaha-senior-care-guidelines-for-dogs-and-cats/resources/table-2-diagnostic-approaches-by-body-system-for-senior-dogs-and-cats.pdf). No atribuirle umbrales, frecuencias de visita ni pruebas concretas sin abrir el PDF».
3. Actualiza el historial de la §11: «R2: APTO CON CAMBIOS, 2026-11-18, `docs/contenido/perro-viejo-se-cree-cachorro/auditoria-brief-r2.md`».

Si se aplican solo estos tres cambios, el brief queda listo para la skill `redactar-articulo-blog`. Si la corrección toca algo más allá de ellos, hace falta una R3, que sería la última ronda.
