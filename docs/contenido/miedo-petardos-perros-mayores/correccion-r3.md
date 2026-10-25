# Corrección del brief tras la auditoría R3

Fecha: 2026-10-25. Brief: `briefings/briefing-miedo-petardos-perros-mayores.md` (v3 → v4). Informe de origen: `auditoria-brief-r3.md` (NO APTO, 1 P1). **Autorización del propietario (2026-10-25):** hasta tres rondas más (R4, R5, R6); tras cada resultado no apto se corrige y se vuelve a auditar; solo se detiene o se le consulta si R6 tampoco es apta.

## Hallazgos de R3 y qué se hizo

| Hallazgo | Corrección en v4 |
|---|---|
| **N-1 (P1)** Fidelidad de los testimonios | «Nerviosa y alerta también es miedo» eliminado: el último diciembre se cuenta con «algo nerviosas y muy alerta, **pero se quedaron en casa, con la familia, con películas puestas y la gente hablando**» y la reunión familiar «muy tranquilos»; con «pirotecnia», no «petardos», y con la aclaración del propietario de que en Costa Rica se revienta poco y son más bien luces. Dakota: solo hechos; «no sabemos si le duele: eso lo dice el veterinario». «Ladrido que acaba en búsqueda de un sitio tranquilo» deja de ser patrón y pasa a «mi impresión (hipótesis mía)». Nueva casilla en §9.4 |
| N-2 Elevar la voz | «Ninguna de las dos cosas es una pauta»; se quita «solo»; a un perro asustado se le habla con calma (S10, S6); cómo levantar a un perro con cadera o columna dañadas lo enseña el veterinario; «con Luna lo hago porque ella me busca; no atribuimos su calma a eso» |
| N-3 26 % de S1 | Verificado en el texto completo (Europe PMC XML): «fear of fireworks was the most common subtrait with a prevalence of 26 %». Incorporado a H2-1 y a la ficha de S1; **rectificado el renglón falso de `correccion-r2.md`** (mi descarga HTML estaba truncada) |
| N-4 Aritmética del volumen | Declarado que el título H2 y los avisos cuentan dentro de cada sección y que el target de cada H3 incluye su título; recortados los H3 de la introducción, H2-2 y H2-4 para dejar sitio a los tres `AlertBox`; los H3 de las demás secciones suman su target menos ≈10 (título H2). Total «todo incluido» = 5.700; margen de 300 bajo el techo |
| N-5 Residuos de fuentes | «La mayoría lo desarrolla en el primer año» sustituido por «suele empezar en los primeros años de vida» (la tabla de S11 da 45 %, 28 %, 22 %); el oído: S11 propone que la pérdida de oído puede atenuar el miedo, lo demás es criterio clínico sin fuente; S5/S11: muestra internacional (527 en inglés y 699 en alemán, con España entre los países) reclutada en Facebook; S3: «por encima del mínimo». Enlace opcional a limpieza de ojos y oídos descartado (no trata la audición) |
| N-6 Léxico y restos de Osa | «Portón» y «patios» sustituidos; quitada la referencia a Osa en el requisito 15; quitado el vocabulario regional de hechos que ya no están; voz «en casa/nosotros» y «yo» en §9.7 |
| N-7 Prompts | Imagen 1: la cama queda a unos metros de la ventana (H2-5 lo dice); cabeza «a la altura del lomo o algo baja» (literal) y apoyada algo por debajo de la línea del lomo; brazo fuera de encuadre. Imagen 2: orejas relajadas y cola neutra (coincide con «paseo tranquilo»); aceptación a 390 px = dos ramales, mosquetones y chapa a tamaño grande. Imagen 3: la veterinaria queda del lado opuesto a la cámara, asomando por detrás de los cuartos traseros. Chapa metálica lisa en el collar de las tres |
| N-8 Titular y metadato | H2-7 «Lo que se vende y lo que dicen los dueños»; meta: «Cuándo descartar dolor» (154 caracteres) |
| N-9 Relleno | «Si necesitas medicarle» fundido en el H3 anterior (el aviso y el enlace ya cubren su contenido); párrafo «Promesa» de la introducción a ≈30 palabras. Matiz de las encías pálidas (urgencia frente a efecto adverso transitorio) en H2-4 |
| N-10 Detalles | FAQ: 42–54 palabras, 445 con preguntas; enlaces: «5 cruzados obligatorios, más golpe de calor opcional»; §2 declara que no hay hilo narrativo principal; gate para contrastar fechas de Fallas, Hogueras y San Fermín con los programas oficiales |

## Comprobaciones por script tras la corrección

- Suma de targets: 5.700; H3 + título H2 + avisos = target en cada sección.
- Matriz fuente→H2 idéntica en §3, §6 y §9.2 (11 fuentes); ninguna cita fuera de «Sustentado en».
- `seoTitle` 44 y `metaDescription` 154 caracteres; alt del frontmatter idéntico al de la imagen 1.
- Sin restos de Osa, Baltor, «pólvora» en el cuerpo, «portón», «también es miedo» ni «lo que funciona».

## Pendiente

- Auditoría R4 independiente.
