# Corrección del brief tras la auditoría R6

Fecha: 2026-10-25. Brief: `briefings/briefing-miedo-petardos-perros-mayores.md` (v6 → v7). Informe de origen: `auditoria-brief-r6.md` (APTO con reservas: 0 P0, 0 P1, 2 P2, 15 P3). R6 fue la última ronda autorizada por el propietario; **no hay R7**. Las correcciones se verificaron con búsquedas de texto y con los scripts de consistencia, como recomendaba el auditor.

| Hallazgo | Corrección en v7 |
|---|---|
| **P2-1** Cita «casi me muerde la cara» sin trazabilidad | No se vuelve a editar el archivo de testimonios. Gate de publicación en §9.4 y §11: el propietario confirma con una línea que fue su propia cara y se anota la fecha; si no confirma, fórmula neutra «una vez casi acabó en mordisco al levantarla» |
| **P2-2** «No fiable según S3» | Lo que midió el estudio: lamerse los labios y bostezar no aumentaron en la noche de fuegos (diferencias de grupo); «no sirven para descartar miedo en tu perro». Título de H2-2: «lo que midió el estudio y lo que no»; §2 (e) igual |
| P3-1 | §9.6.6: S10 pide acompañar sin forzar; S6, zona segura de entrada y salida libres |
| P3-2 | Cabecera de la FAQ: 42–56 palabras, ≈450 con preguntas |
| P3-3 | Dakota «en general» tranquila; «cuando pierde el control (el propietario no dice qué lo provoca)» |
| P3-4 | «En 2025» en lugar de «el año pasado» (artículo perenne); la casilla de §9.4 lo prescribe |
| P3-5 | «Una casa tranquila» en lugar de «una casa que se prepara» |
| P3-6 | Imagen 2: objetivo gran angular de 28–35 mm algo picado desde el suelo (un 50 mm no llegaba al pecho del tutor), extremos de la bufanda sobre el pecho, «un cabo que sale de la mano y se bifurca en dos ramales» |
| P3-7 | Convención de voz: «nuestras perras»/«en casa» para la familia, «yo» solo para lo que hace el propietario, y declaración de autoría la primera vez |
| P3-8 | «Reventar» a la lista de evitar («tirar» o «lanzar» petardos); «tratar al animal» en lugar de «manejar» fuera de comillas |
| P3-9 | Encabezado e inventario sin afirmar que se aplicaron todos los P3 |
| P3-10 | «Según la prensa» al atribuir al Colegio de Málaga (H2-3 y FAQ 5) |
| P3-11 | H3 de H2-6 rebalanceados: «Consolar» 190, «Por la noche» 150 |
| P3-13 | Una salvedad menos en el primer H3 de H2-1 (las muestras pequeñas se quitan) |
| No aplicado | P3-12 (poco material en cinco H3: queda cubierto por «parar y consultar»), P3-14 (527 + 699: el cuerpo no cita ambas cifras), P3-15 (alt de 190 caracteres: aceptable) |

Comprobaciones: 5.700 de suma de targets; H3 + título H2 + avisos = target; matriz fuente→H2 idéntica en §3, §6 y §9.2; alt del frontmatter idéntico al de la imagen 1; seoTitle 44, meta 154; una sola importación de `TablaApilable`; un solo gate de la cita.
