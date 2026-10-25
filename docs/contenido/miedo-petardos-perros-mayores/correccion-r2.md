# Corrección del brief tras la auditoría R2

Fecha: 2026-10-25. Brief: `briefings/briefing-miedo-petardos-perros-mayores.md` (v2 → v3). Informe de origen: `auditoria-brief-r2.md`. Corrige la sesión generadora por petición expresa del propietario; la valida una auditoría R3 independiente, **la última ronda permitida**.

## Decisiones del propietario aplicadas (2026-10-25)

- **Volumen:** contrato de 5.300 a 6.000 palabras, target 5.700, techo 6.000 (su tope). Los targets cuentan títulos, avisos y FAQ.
- **Testimonios:** Osa y Baltor se reservan para la versión latinoamericana; en España quedan Luna, Dakota y la perra de unos vecinos.

## Hallazgos de R2 y qué se hizo

| Hallazgo | Corrección en v3 |
|---|---|
| **P1-A** S11 mal usada | Leído el texto completo (PMC6730926). La Discusión dice que en perros sanos la prevalencia sube hasta los 10 años y baja desde los 11, y en perros con problemas de salud sube hasta los 8 y baja desde los 9; la autora lo atribuye a la pérdida de oído y concluye que el efecto de la salud «no pareció fuerte». Eliminadas «crece con la edad» (H2-1, AlertBox de la introducción, §2) y la frase de la interacción salud × edad como respaldo; H2-1 pasa a «frecuente, pero con la edad los datos no son uniformes» y añade el oído como posibilidad a descartar. Ficha de S11 reescrita |
| **P1-B** Un testimonio, un H2 | Cada hecho en un solo H2: Dakota (salud) en H2-1; Luna y Dakota (último diciembre) y la perra vecina en H2-2; Luna y Dakota (coger en brazos, elevar la voz) en H2-6. Osa y Baltor fuera. H2-5 sustituye el H3 del patio por «Un refugio accesible para un perro con las articulaciones cansadas» (con enlaces a cama ortopédica y prevención de caídas); H2-9 sin el portón de Osa |
| **P1-C** Fidelidad de los testimonios | Quitados «lo que ayudó…», «parálisis», «perdió el control por el miedo» (para Baltor) y «era la costumbre de esa casa»; la anécdota de diciembre queda solo en H2-2 con lo que dijo el propietario; voz en primera persona («yo la cojo en brazos»), no «el propietario» |
| **P1-D** Volumen | 5.300–6.000, target 5.700; targets con títulos, avisos y FAQ; eliminadas las listas «Si hace falta más»; conclusión sin repetir las cinco decisiones; §9.1 conserva «parar y consultar» |
| P2-1 S5 y medidas ambientales | H2-5 aclara que las medidas ambientales (esconderse, persianas, música) no se asociaron con mejoría en S5 y que el refugio se recomienda por S6 y S10 |
| P2-2 Trazabilidad fina | Matriz única actualizada (S3: H2-2 y H2-4; S8: H2-3, 4, 5, 6, 8, 9; S1 solo H2-1); comprobada por script; ninguna fuente se cita fuera de «Sustentado en» |
| P2-3 Datos sin usar | El 26 % de fuegos artificiales de S1 que cita el auditor **no aparece** en el texto que descargué (no se usa). Añadido S2 en el H3 de separación |
| P2-4 Artículo publicado de ansiedad | Declarado en §2 y §9.8: tiene un H3 de feromonas con «moderada solo en miedo a tormentas» y no debe contradecirse |
| P2-5 H2-3 y FAQ 6 | H3 de categorías condensado a «qué mirar en la etiqueta»; calendario con Hogueras de Alicante y San Fermín (a contrastar con el programa oficial); FAQ 6 abre con «Depende de la fecha, del lugar y de la ordenanza» |
| P2-6 Grupo e individuo | H2-2: «diferencias de grupo»; lo no medido por S3 se lee contra su conducta habitual; el jadeo también puede ser calor |
| P2-7 Atribuciones legales | La chapa y el arnés pasan a criterio editorial (S8 solo exige microchip); 65.7 y 24.2.b formulados como apoyos, no como reglas sobre petardos |
| P2-8 Seguridad menor | Masticable adecuado a la dentadura y vigilado; «no hay estudios de seguridad en >17 años»; «el veterinario puede querer revisar…»; sin el «4–6 semanas» sin razón |
| P2-9 Prompts | Imagen 1: perra de pecho mirando a la derecha, costado derecho a cámara, ventana a la derecha, mano entra por abajo a la izquierda, lámpara a la izquierda; imagen 2: cámara pegada a la fachada, perra del lado de la fachada y tutor del lado de la calzada, plano que deja entera a la perra; imagen 3: perra mirando a la derecha, veterinaria a la izquierda junto a los cuartos traseros, collar gris y rasgos del sujeto completados; pie 1 con «juguete relleno»; alt sin «su tutora» |
| P2-10 Americanismos | «pólvora» y «alzar» añadidos a las listas de evitar y sustituidos por «petardos» y «coger en brazos» |
| P2-11 Repetición de chapa y microchip | La identificación vive en H2-9; H2-6 y H2-7 remiten |
| P2-12 Detalles | Gate para `datePublished`; «no sustituyen» fuera; estado de P1-02 aclarado; «cinco semanas» |

## Comprobaciones por script tras la corrección

- Suma de targets: 5.700; cada H2 coincide con la suma de sus H3.
- Matriz fuente→H2 idéntica en §3, §6 y §9.2 (11 fuentes) y sin citas fuera de «Sustentado en».
- `seoTitle` 44 y `metaDescription` 154 caracteres; alt del frontmatter idéntico al de la imagen 1.
- FAQ: 8 respuestas de 42 a 54 palabras.

## Pendiente

- Auditoría R3 independiente (última ronda; si falla, detener y consultar al propietario).
- Verificaciones parciales por cerrar antes de publicar: S2, S5, S7 y S10.
- Reconciliar con el brief de feromonas y con el artículo publicado de ansiedad por separación (§9.8).
