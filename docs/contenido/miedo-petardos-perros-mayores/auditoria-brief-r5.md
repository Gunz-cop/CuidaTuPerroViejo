# Informe de auditoría R5 del brief `briefings/briefing-miedo-petardos-perros-mayores.md` (v5)

Auditor: agente independiente (sesión distinta de las anteriores). Fecha: 2026-10-25. Brief auditado: v5, commit 1cf629a. Informe transcrito sin cambios de contenido. **Veredicto: APTO con reservas (0 P0, 0 P1, 6 P2, 14 P3).** Nota del corrector: el auditor cita el art. 115 del RD para el etiquetado de fuegos artificiales; el artículo correcto es el 114.1.B (letras f, g y j), que es el que usa el brief (el 115 trata de artículos pirotécnicos para vehículos).


Rama `claude/brief-miedo-petardos-perros-mayores`, HEAD `1cf629a`. Fecha: 2026-10-25. No he modificado ningún archivo del repositorio. Los temporales están en `/tmp/claude-0/-home-user-CuidaTuPerroViejo/eca6bf97-2eb5-5d3e-8ec3-082c2fd5e029/scratchpad/auditor5/`. Las descargas van en carpetas separadas `dl_*` y el Python se ejecutó con `-I`.

## Veredicto: APTO con reservas

No hay P0 ni P1. Las 11 fuentes son reales y sus cifras coinciden con los documentos. El P1 de R4 (el mes inventado) está cerrado. Quedan 6 P2 y 14 P3, todos locales y corregibles sin tocar la estructura, el volumen ni las fuentes. Tres P2 cambian lo que el redactor escribiría, así que deben aplicarse antes de redactar (con el texto exacto de §3).

## 1. Estado de los hallazgos de R4

| R4 | Estado | Evidencia |
|---|---|---|
| **F-1 (P1)** «El último diciembre» | **Resuelto** | `grep` de «diciembre»: solo aparece en el calendario de Nochevieja (l. 93, 280, 446, 468) y en la casilla que lo prohíbe (l. 517). En l. 212, 245, 259 y 516 dice «el año pasado (2025)», igual que el archivo (l. 14 y 35). Pasada palabra por palabra de Luna, Dakota y la perra vecina: ver §4. Quedan dos frases sobre lo que sabe el propietario que el archivo no contiene (N-1). |
| F-2 Conteos de §1 | Resuelto | 44 y 154 en la tabla (l. 21 y 25), en l. 35 y en §10. Los medí con Python: 44 y 154. |
| F-3 Duplicación en Dakota | Resuelto | L. 245 ya solo tiene sobrepeso, displasia inicial, columna sin nombre y «se cansa mucho al caminar». El episodio de 2025 y la aclaración de Costa Rica están solo en H2-2. |
| F-4 «Tranquilas en casa» y «películas» | Resuelto | L. 212, 259 y 516 coinciden y usan el plural «películas puestas». |
| F-5 Mano de la imagen 1 | Resuelto, con un matiz | Ver §6. |
| F-6 FAQ 2 | Resuelto | «No lo fuerces a salir del refugio ni lo muevas; si se acerca, quédate a su lado…». Matiz en P3-11. |
| F-7 FAQ 6 | Resuelto | «…a la distancia de seguridad en F1, F2 y F3». |
| F-8 Encías pálidas | Resuelto | L. 298 y la ficha de S7 (l. 138) recogen la nota 1 del apartado 3.6 de la ficha: palidez transitoria «at the application site». |
| F-9 Tabla 1 | Resuelto | Plazos por fila en l. 280, marcados como criterio editorial. |
| F-10 Volumen | **Parcial** | H3 de H2-1 reequilibrados (220/230/80). Pero l. 206 remite a «§9.1» para el objetivo 5.500–5.800 y la regla «si supera 6.000, recortar», y §9.1 (l. 486) no los contiene (P3-1). |
| F-11 Residuos léxicos | Resuelto | No quedan «lavadero», «cuneta», «por dicha» ni «portón» fuera de listas de evitar. Queda «sus dos perras beagle» en l. 221 (P3-6). |
| P3-1 Cabecera de la tabla 2 | No resuelto | L. 347: «cómo la valoraron los dueños» (P3-2). El FAQ 4 sí se corrigió. |
| P3-2, 3, 4, 7, 9 | Resueltos | Pie 3 («la veterinaria», «preparar la noche»), sombras de farola y collar de nailon en la imagen 2, «en este perro,» literal, pies fuera del conteo y nota de producción de feromonas. |
| P3-5 «Casi me muerde la cara» | **Cerrado editando el archivo de testimonios sin confirmación** | Ver N-2. |
| P3-6 «S6 insiste en que el perro pueda elegir» | No resuelto del todo | Ver N-3. |
| P3-8 Tres salvedades en el primer H3 de H2-1 | No resuelto | Ver P3-3. |

## 2. Fuentes (abiertas hoy)

| Fuente | Qué abrí | Resultado |
|---|---|---|
| S1 Salonen 2020 | Texto completo (Europe PMC, PMC7058607) | Verificada. DOI 10.1038/s41598-020-59837-z y PMID 32139728 correctos. «13,715 responses in 264 breeds». 32 % «highly fearful of at least one noise». «Fear of fireworks… most common subtrait… 26%». «Prevalence of noise sensitivity increased with age, especially fear of thunder». |
| S2 Blackwell 2013 | Resumen en Bristol; Crossref | Verificada, salvo el texto completo (limitación de acceso, ya declarada). n = 3.897 y 383, casi la mitad frente a una cuarta parte, riesgo creciente con la edad. Fuegos, disparos y truenos co-ocurren y no con separación. «Less than a third sought professional advice». Volumen 145(1–2):15–25. |
| S3 Gähwiler 2020 | Texto completo (PMC7525486); Crossref | Verificada. 36 perros (17 mestizos, 19 de 15 razas). Orejas d = 0,68 en el texto (el resumen dice 0,69), movimiento 0,54, jadeo 0,45. Lamerse los labios y bostezar no aumentan. Se codifican los 3 primeros minutos. Los perros con pérdida de oído quedan excluidos. |
| S4 Lopes Fagundes 2018 | Texto completo (PMC5816950); Europe PMC | Verificada. DOI y PMID correctos. Tabla 2: edad media de inicio de 2 años y 8 meses frente a 6 años y 6 meses. Generalización en 8 de 10 frente a 2 de 10. «No attempt should be made to ascribe any statistical significance». |
| S5 Riemer 2020 | Resumen en Europe PMC; Crossref del DOI publicado | Verificada en el resumen. DOI 10.1016/j.jveb.2020.04.005, *J Vet Behav* 37:61–70. N = 1.225. Solo Feed/Play asociado a mejoría. Medicación 69 % (N = 202); 27–35 % «not higher than… placebo»; chaleco 44 % (N = 300); contracondicionamiento > 70 % (N = 694); relajación 69 % (N = 433); CD 55 % (N = 377). Texto publicado no leído (limitación de acceso). |
| S6 ESVCE | PDF completo (`pdftotext`) | Verificada. No acepromazina («lacks anxiolytic properties»), coincide con AVEC y AVEPA-GRETCA. Zona segura «previously positively conditioned… free to come and go». Fármacos «individualised according to comorbidities». Derivación al especialista. **No dice nada sobre que el perro elija acercarse a la persona** (N-3). |
| S7 Ficha de Sileo | SPC británico (VMD, marzo de 2026); ficha del registro europeo | Verificada. 3.2, 3.3 (cardiovascular grave; ASA III–IV; sedación previa), 3.5 («dogs over 17 years… has not been studied»), 3.6 (emesis, sedación, incontinencia urinaria y mucosas pálidas, «common»). La nota 1 limita la palidez al punto de aplicación. El registro europeo muestra el medicamento «Autorizado» y «Disponible» en España. Ficha española no leída (gate declarado). |
| S8 Ley 7/2023 | BOE, texto íntegro | Verificada. 24.2.b, c, f, g («cuarenta y ocho horas»), h, 51.2 y 65.7 con el texto citado. «Pirot» aparece una sola vez; «petard» y «fuegos artificiales» no aparecen. |
| S9 RD 989/2015 | BOE, texto íntegro | Verificada. Art. 8.3 (F3 y F4 «no perjudicial para la salud humana»). Art. 121 (12/16/18). Art. 141.2. DA sexta (8 y 10 años). En la ITC 2, 2.5.A, el máximo de 120 dB(A, imp) se mide «a la distancia de seguridad», y F1 no incluye petardos. Dos matices en P3-9. |
| S10 El Español | Artículo | Verificada. Ventanas y persianas, refugio accesible, música o televisión, «si el contacto con la persona le tranquiliza, debe permitirse», no medicar, revisar microchip y placa. Guía original no localizada (declarado). |
| S11 Riemer 2019 | Texto completo (Europe PMC); Crossref | Verificada. N = 1.225 (527 en inglés y 699 en alemán; entre los países figura España; grupos de Facebook). 52 %. Sanos: sube hasta los 10 y baja desde los 11. Con problemas de salud: sube hasta los 8 y baja desde los 9. La pérdida de oído es una hipótesis de la autora. Recuperación: casi tres cuartas partes a la mañana siguiente, 10 % hasta un día, 12 % hasta una semana, más del 3 % semanas o meses. |

No hay fallos confirmados de fuentes. Las limitaciones de acceso (S2 completo, S5 publicada, S7 en español, guía del Colegio) están declaradas y bloqueadas por gate. Cascada: S5 y S11 comparten muestra y el brief lo dice. Si se corrigiera algún dato de S5, habría que revisar el brief de feromonas.

## 3. Hallazgos nuevos

### P0 y P1

Ninguno.

### P2 (aplicar antes de redactar)

**N-1. Dos frases atribuyen al propietario un saber que el archivo no contiene.**
- Ubicación: l. 245 («**No sabemos si le duele: eso lo dice el veterinario.**») y l. 338 («Con Luna lo hago porque ella me busca; no atribuimos su calma a eso.»).
- Evidencia:
  - El archivo no dice que la familia ignore si Dakota siente dolor, ni dice si hubo tratamiento. Solo da los hechos de salud (l. 38).
  - En el archivo, la hipótesis sobre alzar a Luna y su calma es del propietario: «Solo que el propietario lo piensa así» (l. 23). Decir «no atribuimos» le asigna la postura contraria, y contradice la frase anterior del mismo bullet («…y se calma»).
  - Es el mismo tipo de fallo que motivó F-1 y N-1 de R3: poner en boca del propietario lo que él no dijo. Esta vez es una cautela y no un hecho, por eso es P2. Si el propietario objeta, pasaría a P1.
- Corrección, con palabras del archivo o voz editorial:
  - L. 245: borrar la frase y poner «Si le duele o no, lo valora el veterinario» como frase editorial sin sujeto. Mantener «sin afirmar que le duela» en §9.4.
  - L. 338: borrar «; no atribuimos su calma a eso» y terminar en «Con Luna lo hago porque ella me busca». Si se quiere cautela: «Es lo que vivimos con ella, no una explicación de por qué es tan tranquila» (voz editorial, sin atribuir una postura).

**N-2. El archivo de testimonios se editó en el mismo commit que el brief, sin confirmación del propietario.**
- Ubicación: `testimonios-propietario.md` l. 34. El diff `ac9b62b..1cf629a` cambia «casi le muerde la cara al alzarla» por «casi le muerde la cara al propietario al alzarla (dicho por él: «casi me muerde la cara»)». `correccion-r4.md` l. 18 lo describe como «se precisa».
- Evidencia: R4 (P3-5) pidió *confirmar con el propietario* si fue su propia cara. En su lugar se reescribió la fuente única para que coincida con el brief y con una cita textual que ningún auditor puede comprobar. El archivo declara que «no se añadió ningún dato». No digo que sea falso: la edad del dictado original no está en el repositorio. Digo que no hay trazabilidad.
- Corrección: pedir al propietario que confirme en una línea que fue su cara. Si lo confirma, registrar en el archivo «confirmado por el propietario el AAAA-MM-DD». Si no, restaurar la redacción anterior del archivo y escribir en l. 338 «una vez casi acabó en mordisco al levantarla», que es la fórmula del límite del propio archivo (l. 41). No volver a editar el archivo de testimonios para acomodarlo al brief.

**N-3. S6 se cita para algo que no dice.**
- Ubicación: l. 321 («Permitir que se acerque o no a la persona (S6)»), l. 336 («sin forzar (S10, S6)») y l. 338 («S6 insiste en que el perro pueda elegir»).
- Evidencia: S6 pide una zona segura previamente condicionada «where the dog has the choice to freely come and go» (entrar y salir del refugio). No habla de que el perro elija acercarse a la persona. Eso lo dice S10: «si el contacto con la persona le tranquiliza, debe permitirse; si prefiere esconderse, conviene respetar su espacio». «Insiste» además exagera una sola viñeta. Es la parte de R4 P3-6 que no se cerró.
- Corrección:
  - L. 321: «Si el contacto con la persona le tranquiliza, se permite; si prefiere esconderse, se respeta su espacio (S10)».
  - L. 336: «(S10; S6 para la zona segura de entrada y salida libres)».
  - L. 338: «S6 pide una zona segura de la que el perro pueda entrar y salir libremente, y S10 que se respete su espacio».
  - Añadir esa frase de S10 a su ficha en §3.

**N-4. Falta el componente de tabla apilable en el contrato.**
- Ubicación: §4 (l. 173–177 y 181), §9.3 (l. 510) y §11.
- Evidencia: la regla compartida `apoyos-visuales-responsive.md` dice «usa `TablaApilable`» para tablas de 3 o más columnas. Los briefs de golpe de calor y leishmaniosis lo importan expresamente. Este brief solo dice «diseñadas para apilarse» y sus dos tablas tienen 3 columnas. Un redactor que escriba tablas Markdown normales incumple la regla sin saberlo. El componente existe (`src/components/article/TablaApilable.astro`, con la prop `label`).
- Corrección: añadir a las importaciones de §4 `import TablaApilable from '../../components/article/TablaApilable.astro';`. Pedir que las dos tablas (H2-3 y H2-7) vayan dentro de `<TablaApilable label="…">` con `data-label` en cada `<td>`. Reflejarlo en la casilla de tablas de §9.3.

**N-5. Remisión a un artículo de feromonas que no existe.**
- Ubicación: l. 349 («se tratan en un artículo propio del sitio (enlazarlo cuando se publique; hoy no existe URL)»), l. 82 y l. 84.
- Evidencia: el brief de feromonas está en `[~]`. Si no está publicado al redactar, la frase promete un recurso inexistente (`calidad-editorial` §5) y choca con la regla de §5 («el redactor no escribe “próximamente”»). L. 84 pide «una frase de remisión “cuando exista”» para tormentas, con el mismo problema. §11 no lista ese artículo como recurso prometido.
- Corrección: en l. 349 decir «es otra pregunta que este artículo no responde» y añadir el enlace solo si en el momento de redactar el artículo de feromonas ya figura `[x]` en el inventario. En l. 84, igual: sin remisión salvo URL publicada. Si se quiere una remisión hoy, el artículo publicado de ansiedad por separación ya tiene un H3 de feromonas (l. 340), y ya está en §5.

**N-6. Imagen 2: el encuadre excluye lo que el prompt describe.**
- Ubicación: ficha (l. 452) y prompt 2 (l. 468).
- Evidencia:
  - El prompt describe al tutor con «pelo gris corto, barba canosa recortada, parka verde oliva y bufanda gris… miradas orientadas hacia delante».
  - El plano «recorta al tutor por la cintura», con cámara «a la altura de la cadera», sin decir de quién. Si es la cadera de la perra (unos 35 cm), el borde superior del encuadre queda en la cintura del tutor y no se ven cabeza, barba, bufanda ni hombros. Si es la del tutor, la perra no cabe entera.
  - La dirección de marcha, que fue el motivo de rechazo de la portada de golpe de calor, solo se apoya entonces en caderas y pasos.
- Corrección: fijar «cámara a la altura del lomo de la perra (≈45 cm); el encuadre superior corta al tutor por el pecho». Esto incluye mano, correa, cadera y parka, y excluye cara y barba. Retirar «barba» y «pelo gris» del prompt, o subir el encuadre hasta la cabeza y renunciar a «perra entera en primer término». Actualizar la ficha («Cámara, luz y texturas») y la aceptación a 390 px.

### P3 (pulido; ninguno cambia la estructura)

1. **F-10 incompleto.** L. 206 cita «(§9.1)» para el objetivo de redacción 5.500–5.800 y «si supera 6.000, recortar». §9.1 no contiene ninguna de las dos cosas. Copiarlas a l. 486.
2. **Cabecera de la tabla 2** (l. 347): «cómo la valoraron los dueños» es ambigua. Usar «% de dueños que la consideró eficaz».
3. **Tres salvedades en el primer H3 de H2-1** (l. 239–241: otros países, hipótesis de oído, «no pareció fuerte»). La guía de tono pide una por H3. Dejar «no hay estudio español» y mover las otras dos a un segundo plano del segundo H3.
4. **Conteos de FAQ incoherentes.** L. 389 dice «40–55 palabras… ≈440» y l. 402 dice «42–56… 453». Es lo segundo: medí respuestas de 42 a 56 palabras y 453 en total con las preguntas. Además, la cabecera de la conclusión suma 5 + 90 + 453 = 548 y declara 540.
5. **Luna «siempre calmada».** El archivo (l. 44) pide «escribir ambas cosas». El brief recoge la calma de Dakota (H2-1) y el nerviosismo de ambas en 2025 (H2-2), pero no la calma habitual de Luna. Añadir un hecho de Luna a H2-2 sería lo coherente; no es obligatorio.
6. **Voz.** Intro p. 2 (l. 221): «sus dos perras beagle» en tercera persona; el resto usa «nosotros» y «yo». El byline del sitio es «Equipo Cuida a tu Perro Viejo» y la política nombra a Gonzalo como responsable; el «yo» no se identifica en ningún sitio. Decidir si se presenta una vez («Soy Gonzalo…») o si se usa el plural. La guía de voz prefiere el plural (regla 7).
7. **L. 94:** «El país se declara una vez». Pero Costa Rica y El Salvador aparecen en la introducción y de nuevo en H2-2. Cambiar «una vez» por «la primera vez».
8. **L. 338, Luna «se asusta».** El archivo dice que busca a la familia ante sustos que no son solo pirotecnia (terremotos, choques, temblores). Un lector de un artículo de petardos lo leerá como petardos. Escribir «ante un susto».
9. **S9.** (a) L. 282 afirma que «la etiqueta indica la categoría y la edad mínima». Es cierto, art. 115 del reglamento (apartados f y g), pero §3 no lo registra: añadirlo a la ficha de S9. (b) «Distancias mínimas de 1, 8 y 15 m» (l. 148): el texto añade «si procede, podrá ser inferior». Quitar «mínimas».
10. **S7, l. 298:** «(no quiere decir que se hayan estudiado hasta esa edad)» es críptico para el redactor. Sustituir por «lo que no está estudiado es más de 17 años; no afirmar que sí lo esté por debajo».
11. **FAQ 2:** «ni lo muevas» choca con el propio plan, que lleva al perro al refugio antes del primer petardo (l. 336). Mejor: «No lo fuerces a salir del refugio; si se acerca…».
12. **Imágenes.**
    - El alt del hero mide 274 caracteres. El resto del sitio usa alts mucho más cortos; acortar hacia unos 150.
    - El «antebrazo fuera de encuadre» convive con «manga de jersey granate»: dejar «la mano y la muñeca, con el puño de la manga».
    - La mano granate de la imagen 1, el tutor de 62 años de la imagen 2 y la tutora de rebeca gris de la imagen 3 no están identificados como la misma casa. Declararlo o aceptarlo.
    - «Orejas plegadas hacia delante» y «orejas echadas hacia atrás en su base» pueden confundir al generador. Precisar «punta plegada; base hacia atrás».
    - La línea «Sin texto, letras ni marcas» promete aparecer en cada prompt (l. 425). Aparece solo como lista de «Evitar».
13. **Estiramiento de H3.** Seis H3 pasan del 2,5× entre notas y target. Los mayores son «Por la noche» (58 → 200), «Lo que debe mirar el veterinario» (48 → 160), «Qué es y cómo funciona» (59 → 160), «Refugio accesible» (43 → 120), «Si empiezas ahora» (43 → 120) y «Cómo comprar con criterio» (58 → 150). Mis recuentos son aproximados porque cuentan símbolos de Markdown. La salida «parar y consultar» (l. 206) está bien puesta.
14. **FAQ 6** («¿Es legal…?») no abre con un sí o no. Es honesto, pero la guía de tono pide abrir afirmando.

## 4. Pasada de testimonios, palabra por palabra

| Afirmación del brief | Archivo | Resultado |
|---|---|---|
| Luna: beagle, 2015, desde los 5 meses (l. 61) | l. 9 y 12 | Coincide |
| Dakota: beagle, 2014, desde los 8–9 años (l. 61, 245) | l. 27 y 30 | Coincide |
| «Sobrepeso, displasia de cadera inicial, columna sin nombre; se cansa mucho al caminar» (l. 245) | l. 38 | Coincide. «No sabemos si le duele»: ver N-1 |
| «Con la pirotecnia ha sido muy tranquila, según nosotros» (l. 245) | l. 33 y 36 | Coincide |
| «El año pasado (2025)… bastante pirotecnia… Costa Rica no se acostumbra a reventar mucha, más bien luces» (l. 259) | l. 33 y 35 | Coincide |
| «Las dos algo nerviosas y muy alerta, pero tranquilas en casa con la familia, con películas puestas y la gente hablando» (l. 259) | l. 14 y 35 | Coincide (combina las dos entradas) |
| Reunión familiar con pirotecnia, los perros «muy tranquilos» (l. 259) | l. 35 | Coincide |
| Perra vecina (El Salvador, adolescente): «aullaba y ladraba… buscaba un lugar donde no se oyera tanto» (l. 260) | l. 74–77 | Coincide |
| «Mi impresión (hipótesis mía)…» (l. 261) | l. 78 | Coincide (parafrasea; omite «empiezan ladrando y aullando») |
| «Luna… nos busca y yo la cojo en brazos, como hago con todos mis animales desde pequeños, y se calma» (l. 338) | l. 18–19 | Coincide. Ver P3-8 |
| «Dakota antes no se dejaba levantar… hoy se deja» (l. 338) | l. 34 | Coincide |
| «Casi me muerde la cara» (l. 338) | l. 34, editado en v5 | Ver N-2 |
| «Cuando pierde el control le elevamos un poco la voz…» (l. 338) | l. 36 | Coincide |

No hay mes, causa, edad ni desenlace inventados, y Osa y Baltor no aparecen. Cada hecho figura en un solo H2: Dakota (salud) en H2-1, el episodio de 2025 y la perra vecina en H2-2, y alzar y elevar la voz en H2-6. «Pólvora» y «alzar» solo aparecen como palabras a evitar.

## 5. Volumen

- Los diez H2 cuadran: H3 + título (≈10) + aviso = target, en todos. La suma de targets es 350 + 540 + 560 + 500 + 640 + 550 + 600 + 440 + 400 + 300 + 280 + 540 = **5.700**.
- **Todo incluido, con lo medido:** 31 H3 con su título dentro 4.605, párrafos de la introducción 300, 10 títulos de H2 98, 3 avisos 143 (44 + 44 + 55), conclusión 547 (título 4, cierre 90, FAQ 453). Total **5.693**. Con los avisos planificados (50, 50 y 55) saldría 5.706. Tres avisos y ocho FAQ, uno de cada tipo y en su sitio.
- 5.700 es alcanzable sin relleno. Las notas suman unos 3.300 palabras frente a 4.605 de H3, una expansión media de 1,4×. El suelo de 5.300 deja 400 de holgura, y el techo de 6.000 queda dentro del rango del propietario (5.000–6.000). El riesgo real es el desbordamiento: golpe de calor y leishmaniosis superaron su target (mi recuento aproximado: +8 % en leishmaniosis), y esa desviación sobre 5.700 rozaría el techo. Por eso conviene dejar el objetivo 5.500–5.800 también en §9.1 (P3-1).

## 6. Prompts de imagen (razonado con coordenadas)

Convención: la cámara mira hacia el interior de la escena. Una perra que mira hacia la derecha del encuadre enseña a la cámara su costado derecho.

- **Imagen 1.** Consistente. La perra de perfil mira a la derecha, con el costado y el ojo del antifaz derechos visibles. La lámpara está a la izquierda y los destellos y la ventana a la derecha, a unos 3 m. La mano entra por el borde inferior derecho, por delante del hocico y del lado de la cámara. El brazo viene de una persona situada fuera de campo, a la derecha y más cerca de la cámara, por el suelo. No cruza el cuerpo, no tapa el costado ni el ojo, y es físicamente posible (F-5 resuelto). Matiz: la muñeca y el puño sí entran en el encuadre, por lo que «antebrazo fuera de encuadre» debe leerse como «el resto del antebrazo» (P3-12).
- **Imagen 2.** Cámara en la fachada mirando a la calzada. Tutor y perra avanzan de izquierda a derecha y la cámara ve su costado derecho. La perra va a la derecha del tutor, en el lado de la fachada y más cerca de la cámara. El tutor va del lado de la calzada, con la correa en la mano derecha, que queda del lado de la perra. Los sentidos de marcha coinciden y la fachada y la calzada son coherentes. El fallo es el encuadre (N-6).
- **Imagen 3.** La perra de perfil mira a la derecha. La tutora está a la derecha, frente a la cabeza, con una mano en el pecho y el premio en la otra. La veterinaria, a la izquierda, queda en el lado de la mesa opuesto a la cámara, detrás de los cuartos traseros, con una mano bajo el vientre y la otra en la zona lumbar. No tapa a la perra. Coherente.
- **Los cinco rasgos de edad.** Verificados con un script en los tres prompts: canas en hocico, cejas y párpados («en este perro,» incluido), ojos algo hundidos, lomo, postura natural y sin enfermedad inventada. La línea «Rechazar si a tamaño móvil parece un adulto joven» está en los tres. La misma raza, el collar de nailon gris liso y la chapa figuran en las tres imágenes.
- **Ficha, alt y pie.** El `heroImageAlt` del frontmatter es idéntico al alt de la imagen 1 (comprobado). Pie, alt, ficha y prompt coinciden en los tres.
- **Registro de razas.** Coincide con los `heroImageAlt` de `src/content/blog/` y con el registro de `direccion-visual-editorial.md` (l. 95). El bodeguero no aparece en ningún otro sitio. Hay motivo documentado para no usar beagle.

## 7. Lo que sí comprobé y está bien

- **Metadatos.** `seoTitle` 44 caracteres y `metaDescription` 154, contados con Python. `pilar` válido en el enum de `src/content.config.ts`. Slug y rutas de imagen sin ñ ni espacios.
- **Matriz fuente→H2.** Idéntica en §3, §6 y §9.2 (comprobada fuente por fuente). Cada `*Sustentado en:*` coincide con ella, y las 11 fuentes tienen H2.
- **Enlazado.** Los 9 enlaces internos (pilar, 3 spokes, 5 cruzados y golpe de calor opcional) existen en `src/content/blog/`, tienen `status: "Publicado"` o `datePublished`, y los `pilar` coinciden con las rutas. Están en `INVENTARIO_CONTENIDO.md`. Los dos spokes con fecha (2026-08-17 y 2026-08-15) coinciden con el frontmatter. La calculadora se omite con motivo documentado. No hay canibalización: no existe ningún artículo sobre petardos, tormentas o fobia al ruido. Los briefs vecinos están declarados, y §9.8 pide no contradecir el artículo de ansiedad ni el brief de feromonas.
- **Seguridad clínica.** Sin dosis, plazos de inicio, marcas ni porcentajes por fármaco. Acepromazina y calmantes de personas desaconsejados. La ficha de S7 va atribuida y con gate. La política editorial dice «no prescribimos fármacos ni dosis» (`politica-editorial.astro` l. 55) y el brief la respeta. Las señales de urgencia viven junto a la lista, en el `AlertBox` danger. Los 15 requisitos de §9.6 se reflejan en el cuerpo planificado. Coger en brazos y elevar la voz quedan como vivencia con riesgo dicho, y el FAQ 2 ya no sugiere lo contrario.
- **Español de España.** Sin voseo, usted ni ustedes en instrucciones, FAQ ni AlertBox. Léxico peninsular (pipicán, tarima, estor, rebeca, mosquetón). El voseo («vos», «tenés», «mirá», «leé») y los americanismos solo aparecen en las listas de evitar. Formato con coma decimal y espacio antes de %.
- **Historial.** R1 (0/6/9), R2 (0/4/12), R3 (0/1/9) y R4 (0/1/10/9) coinciden con sus informes. `git log --all` no muestra rondas ocultas. El INVENTARIO está en `[~] (En Briefing)` y menciona R5 pendiente.
- **Límite brief/redacción.** Los H3 dan instrucciones y puntos clave. El único texto terminado son los `items` del FAQ y los borradores de AlertBox, que están permitidos.

## 8. Instrucciones de corrección, en orden

1. N-1 y N-3: sustituir las frases indicadas, usando solo palabras del archivo o voz editorial sin sujeto.
2. N-2: pedir al propietario la confirmación de l. 34 del archivo. Hasta entonces, usar la fórmula neutra «casi acabó en mordisco».
3. N-4: importación y uso de `TablaApilable` con `label` y `data-label`.
4. N-5: retirar las promesas de artículo propio de feromonas y de tormentas.
5. N-6: fijar el encuadre de la imagen 2 y alinear el prompt con él.
6. P3 por orden: los que cuestan una línea (1, 2, 4, 7, 9, 10, 11) primero.

Tras aplicar N-1 a N-6, recomiendo verificarlo con `grep` y no con una ronda nueva, siempre que el corrector use solo el texto indicado. Esa decisión es del propietario. Los comandos de comprobación son: «no sabemos si le duele», «no atribuimos», «S6 insiste» y «Permitir que se acerque» no deben aparecer; «TablaApilable» debe aparecer en §4; «artículo propio del sitio» no debe aparecer.

## 9. Límites de la auditoría

- No pude contrastar los testimonios con el dictado original. Solo con el archivo del repositorio, que se modificó en v5 (N-2).
- No pude verificar la autorización del propietario para R4–R6. Me limito a señalar que el brief la declara (l. 5) y que la regla del proyecto es de tres rondas (`calidad-editorial` §6).
- No leí el texto publicado de S5, el texto completo de S2, la ficha española de S7 ni la guía original del Colegio de Málaga. Son limitaciones de acceso ya declaradas, no fallos del brief.
- No verifiqué ordenanzas, bandos, ni la disponibilidad en España de imepitoína y tasipimidina.
- No generé imágenes: la coherencia espacial es un juicio sobre el texto.
- No ejecuté `tono.py` ni `npm run build`, porque el brief no es un `.mdx`.
- Mis recuentos de palabras por H3 usan separación por espacios e incluyen símbolos de Markdown. Los de artículos hermanos son aproximados.

**Archivos relevantes:**
- `/home/user/CuidaTuPerroViejo/briefings/briefing-miedo-petardos-perros-mayores.md` (l. 82, 84, 94, 206, 221, 245, 298, 321, 336, 338, 349, 389, 452, 468, 486)
- `/home/user/CuidaTuPerroViejo/docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md` (l. 14, 23, 34, 35, 41)
- `/home/user/CuidaTuPerroViejo/docs/contenido/miedo-petardos-perros-mayores/correccion-r4.md` (l. 18)
- `/home/user/CuidaTuPerroViejo/src/components/article/TablaApilable.astro`