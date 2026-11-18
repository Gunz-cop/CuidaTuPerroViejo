# Auditoría del brief «Mi perro viejo se cree cachorro», ronda R3 (última)

- **Documento auditado:** `briefings/briefing-perro-viejo-se-cree-cachorro.md`, v3 (cambio de alcance a 6.000 palabras y 15 fuentes).
- **Versión:** commit `703855b` (fusionado en `426695f`), blob `1689af986a247a782b4b3dbc76247dea9eaff535`.
- **Ronda:** **R3 de 3.** La numeración sigue a la R1 (v1, NO APTO, [informe](auditoria-brief-r1.md)) y a la R2 (v2, APTO CON CAMBIOS, [informe](auditoria-brief-r2.md)). El historial de la §11 de la v3 anuncia una «R2 completa sobre v3», pero esa R2 ya se hizo sobre la v2. `calidad-editorial-adsense.md` §6 prohíbe reiniciar la numeración, así que esta auditoría es la R3.
- **Fecha:** 2026-11-18.
- **Rol:** revisor externo. No he corregido el brief.
- **Método:**
  - Resolví los 8 identificadores nuevos con NCBI E-utilities (esearch por DOI y esummary). Para Bekoff usé Crossref.
  - Leí los 7 resúmenes en PubMed y el texto completo en PMC de Yarborough (PMC9411588), Salt (PMC6335446), Enomoto (PMC10838335) y McMillan (PMC10834484), además de las fe de erratas de Yarborough y McMillan.
  - Para Bekoff, Brill devuelve 403. Usé Crossref y el resumen recogido por terceros.
  - Comparé cada momento de la §6 con el expediente `docs/experiencias/luna-mente-joven-cuerpo-viejo-2026-11-18/README.md`.

## Veredicto

**NO APTO.** El H2 «Cuándo llevarlo al veterinario» se apoya en un hecho que no está en el expediente: «lo que la familia lleva anotado». Además, la «reverencia» de Luna se convierte en una invitación al juego, cuando el dueño la describe como su forma de agacharse cuando le cuesta.

Las 15 fuentes son reales y respaldan, en lo esencial, lo que se les atribuye. El bloqueo es narrativo y de estructura, no bibliográfico.

Al ser la tercera ronda, `calidad-editorial-adsense.md` §6 obliga a **detener la corrección del brief y consultar al propietario**. Las correcciones son pocas y concretas (ver el final), pero el propietario tiene que decidir cómo seguir.

## Hallazgos

### P0

**R3-1. §6, H2 «Cuándo llevarlo al veterinario», *Momento*: hecho añadido.**

| | Lo que dice el brief | Lo que dice el expediente |
|---|---|---|
| Momento | «lo que la familia lleva anotado (resbalones, reverencia, pesos de las dos) es justo lo que sirve en la consulta» | No hay ningún registro escrito. El dueño conoce los pesos, pero no consta que anote resbalones ni reverencias. Además, el expediente dice que el dueño «no tiene a mano las notas veterinarias». |

La regla de que cada H2 lleve un momento real generó aquí un momento que no existe. Publicado como «lo que llevamos anotado», sería una experiencia fabricada en un artículo que se presenta como «lo que vemos en casa». Es justo lo que prohíben `calidad-editorial-adsense.md` §3 («No añadir… medidas… ausentes de la fuente») y la taxonomía de la skill (hecho alterado de la historia real = P0).

### P1

**R3-2. §6, H2 «Por qué tu perro mayor juega…», H3 «La reverencia: una invitación, no un capricho» (Bekoff 1995), y §6, H2 «Lo que cambia por dentro»: la postura de Luna se reinterpreta.**

- El expediente dice: «Cuando **se inclina**, a veces **le cuesta agacharse**: estira las patas delanteras hacia adelante y deja la parte de atrás levantada, "**como si hiciera una reverencia**". A veces lo hace rápido y a veces le cuesta un poco».
- Es la descripción de cómo baja el cuerpo, con un símil del dueño. No dice que invite a jugar.
- La v3 lo enlaza con la señal de juego de Bekoff («Conectar con la "reverencia" de Luna»). Así, una posible señal de dificultad pasa a leerse como un gesto de juego, y la ciencia «confirma» algo que el expediente no dice.

**Corrijo aquí mis propias rondas anteriores.** Esta lectura ya estaba en la v1 («estiramiento natural (postura de invitación al juego)») y no la señalé ni en la R1 ni en la R2. Con Bekoff convertido en fuente, la omisión deja de ser una cuestión de matiz y pasa a ser una afirmación con respaldo aparente.

**R3-3. §6: dos H2 tratan el mismo tema (peso y condición corporal), con una fuente repetida para el mismo dato.**

| «Por qué dos perros de la misma edad envejecen tan distinto» | «El peso, en las dos direcciones» |
|---|---|
| H3 «El peso cambia el reloj» (Salt, Kealy) | H3 «Kilos de más sobre una cadera con displasia» |
| H3 «Al final de la vida, el riesgo cambia de lado»: Laflamme, muchos geriátricos con condición corporal baja, puente a Luna delgada | H3 «Cuando el problema es comer poco»: Laflamme, muchos geriátricos con condición corporal baja, Luna a 13 kg |

Laflamme sostiene la misma afirmación en las dos secciones, y el giro «en las dos direcciones» se cuenta dos veces. `calidad-editorial-adsense.md` §1 exige que cada H2 aporte una decisión distinta y que se quiten las repeticiones. Con un target de 6.000 palabras, es el punto con más riesgo de relleno. Kealy y Mlacnik también figuran como sustento de H2 que no los desarrollan:
- Kealy aparece en el «Sustentado en» de «El peso» sin desarrollarse ahí.
- Mlacnik aparece en el de «Moverse» sin desarrollarse.

**R3-4. §11, historial: numeración reiniciada.** La v3 escribe «R2: pendiente» y «Requiere R2 completa sobre v3», y omite la R2 ya hecha sobre la v2 (`auditoria-brief-r2.md`, APTO CON CAMBIOS). Eso incumple la §6 del control de calidad («No reiniciar la numeración ni abrir rondas ocultas para eludir el límite»). El historial debe recoger R1, R2 y R3.

### P2

**R3-5. Los dos P2 de la R2 siguen sin aplicarse, y el primero ha empeorado.**
- **N1:** en la §3, la línea *H2* de las fuentes 1–7 conserva nombres de la v2. Tres apuntan a H2 que ya no existen: «Cómo leer el cuerpo de tu perro en casa» (fuentes 2 y 7), «Por qué tu perro viejo no sabe que es viejo» (fuente 3) y «El peso: la diferencia entre Luna y Dakota» (fuentes 4, 5 y 6). Las §6 y §9 sí son coherentes entre sí, y mandan.
- **N2:** el *Límite* de la Fuente 3 sigue diciendo que solo se use la definición y las revisiones, mientras el H2 de consulta le atribuye la evaluación corporal, muscular y de movilidad. La R2 ya confirmó ese respaldo con la tabla 2 de la AAHA.

**R3-6. Matices de fuentes nuevas que el redactor no debe heredar:**
- **Bradshaw 2015:** el brief dice «algo raro entre animales domésticos». El resumen dice que el perro es inusual **entre los carnívoros** («Among the Carnivora… Domestic dogs are unusual in that play is routinely performed by adults»).
- **Salt 2019:** el límite dice «el beagle no se ha comprobado entre las razas estudiadas: no afirmarlo». Lo he comprobado: el **beagle sí está entre las 12 razas** (*Methods*: «American Cocker Spaniel, Beagle, Boxer…»). El resultado de vida media más corta con sobrepeso se dio «in all breeds». Se puede decir, sin usarlo para predecir la vida de Dakota.
- **Yarborough 2022:** el 1,4 % es de toda la cohorte, con una edad media de 6,9 años, y los autores avisan de que en cohortes mayores la prevalencia es más alta. La advertencia sobre causalidad es literal: «this correlation could also exist simply because of dogs exhibiting less activity due to their cognitive decline» ✔. La FAQ 8 («¿Hacer ejercicio protege la mente…?») debe responderse como asociación, no como protección.
- **Conflictos de interés que conviene anotar como límite:**
  - Laflamme es de Nestlé Purina.
  - Mlacnik tiene un coautor de Iams (Tetrick).
  - Enomoto declara consultoría y empleo con Elanco.
- **Mlacnik 2006:** el resumen dice que «mobility… improved after 6 months» y que la mejor evolución fue la del grupo intensivo, que incluía TENS. Según el resumen, el mejor resultado en peso y movilidad lo tuvo el grupo intensivo. Que **ambos** grupos mejoraran la movilidad no está explícito.

**R3-7. Detalles añadidos menores en los momentos.**
- Introducción: «en la cama de al lado ronca Dakota». El expediente dice que duerme y ronca, pero no dónde está en esa escena.
- «Por qué dos perros…»: «cruzaba de uno a otro **persiguiendo** al gato». El expediente dice «si veía al gato, cruzaba de un sillón al otro».

Son escenificaciones pequeñas, pero conviene quitarlas en un texto que declara ser experiencia propia.

**R3-8. Justificación de la extensión.** «En línea con el resto del sitio» no justifica las 6.000 palabras. `calidad-editorial-adsense.md` §1 dice literalmente que la extensión no se justifica «por una cifra fija de 6.000 palabras». Lo que sí la justifica son las siete decisiones y las 15 fuentes, y la regla anti-relleno de la §6 es buena. Hay que quitar esa frase y resolver R3-3.

**R3-9. Recursos.** La §11 promete «8 fotos reales repartidas», pero la §6 solo asigna cinco (`luna-02`, `dakota-01`, `luna-04`, `dakota-02`, `luna-03`). Falta decir dónde van `luna-01` (pendiente de difuminar la placa), `dakota-03` y `dakota-04`, o rebajar la promesa a cinco.

## Verificación de fuentes nuevas (8–15)

| # | Fuente | Identificador resuelto | Dato atribuido | Localización | Resultado |
|---|---|---|---|---|---|
| 8 | Yarborough S et al. Sci Rep 2022;12:13316 | **PMID 36008509** (antes «sin verificar») · PMC9411588 · DOI 10.1038/s41598-022-15837-9 ✔ | 15.019 perros; OR 6,47 poco activos frente a muy activos; 1,4 % | Resumen; *Results* (1,4 %); *Discussion* (causalidad inversa) | **Verificada.** La fe de erratas (PMID 37253931) solo corrige la lista del consorcio. Matiz de edad media (R3-6) |
| 9 | Bekoff M. Behaviour 1995;132(5-6):419-429 | DOI 10.1163/156853995X00649 ✔ (Crossref). No está indexado en PubMed | La reverencia aparece justo antes o después de acciones que podrían malinterpretarse y mantiene el juego | Resumen (vía terceros; Brill da 403) | **Verificada en lo esencial.** Hace bien en no usar porcentajes. Ver R3-2 sobre su conexión con Luna |
| 10 | Bradshaw JW, Pullen AJ, Rooney NJ. Behav Processes 2015;110:82-87 | **PMID 25251020** · DOI 10.1016/j.beproc.2014.09.023 ✔ | El perro adulto juega; con humanos el juego es más cooperativo; la frecuencia y la forma podrían reflejar el vínculo | Resumen | **Verificada.** Hay que corregir «entre animales domésticos» por «entre los carnívoros» (R3-6) |
| 11 | Enomoto M et al. Sci Rep 2024;14:2827 | PMID 38310147 ✔ · PMC10838335 | 123 perros de 8 meses a 4 años; 39,8 % con artrosis radiográfica; 16,3–23,6 % con artrosis clínica; los dueños lo notaron en ~30 %; aumenta con la edad | Resumen; *Results* («prevalence of rOA increased with age», p = 0,001) | **Verificada.** Conflicto de interés con Elanco |
| 12 | Salt C et al. J Vet Intern Med 2019;33:89-99 | **PMID 30548336** · PMC6335446 · DOI 10.1111/jvim.15367 ✔ | 50.787 perros, ~900 hospitales; más riesgo de muerte y vida media más corta con sobrepeso en todas las razas | Resumen; *Methods* (12 razas, **incluido el beagle**) | **Verificada.** El límite sobre el beagle es más prudente de lo necesario (R3-6) |
| 13 | Mlacnik E et al. JAVMA 2006;229:1756-60 | PMID 17144822 ✔ · DOI 10.2460/javma.229.11.1756 | 29 perros; ambos grupos pierden peso; mejor movilidad con fisioterapia intensiva | Resumen | **Verificada** con el matiz de R3-6 |
| 14 | Laflamme DP. Vet Clin North Am Small Anim Pract 2005;35:713-42 | PMID 15833567 ✔ · DOI 10.1016/j.cvsm.2004.12.011 | Evaluación nutricional previa; muchos de mediana edad con sobrepeso y muchos geriátricos con BCS bajo | Resumen | **Verificada.** Autora de Nestlé Purina |
| 15 | McMillan KM et al. Sci Rep 2024;14:531 | **PMID 38302530** (antes «sin verificar») · PMC10834484 · DOI 10.1038/s41598-023-50458-w ✔ | 584.734 perros del Reino Unido; mediana de 12,5 años; 12,7 en razas puras; 12,0 en mestizos | *Results* («median survival was estimated at 12.5 years…; pure breeds 12.7…; crossbreds 12.0») | **Verificada.** La fe de erratas (PMID 38627465) solo corrige la leyenda de la figura 3 (teckel miniatura), así que no afecta |

Las fuentes 1–7 no han cambiado desde la R2 (ver [R2](auditoria-brief-r2.md)). Siguen verificadas, con la AAHA en verificación parcial.

**Ningún identificador inventado ni mal asignado.** Los cuatro PMID que faltaban (Yarborough, Bradshaw, Salt y McMillan) se han resuelto y corresponden al título y al tema.

## Trazabilidad fuente → H2 (según §6 y §9)

| H2 (target) | Fuentes que desarrolla | Momento real | Observación |
|---|---|---|---|
| Introducción (500) | — | Bolsa en la cocina, Luna de 11 años, deseo de verla vieja ✔ | «cama de al lado» (R3-7) |
| Por qué tu perro mayor juega… (750) | 9, 10, 3, 15 | Luna en dos patas; Dakota nunca ✔ | Reverencia (R3-2) |
| Por qué dos perros… (650) | 12, 4, 14, 15 | Dakota llegó más delgada y saltaba ✔ | Duplicación con «El peso» (R3-3); «persiguiendo» (R3-7) |
| Lo que cambia por dentro (800) | 1, 2, 5, 11 | «Se le ven los músculos y los huesos» ✔ | Reverencia descrita «como lo que vemos» ✔ |
| Señales… (800) | 7, 11, 2 | Resbalones de Luna ✔ | ✔ |
| El peso, en las dos direcciones (800) | 5, 6, 13, 14 | Dakota de 23 a ~20 kg; Luna de 13 a ~15 kg ✔ | Kealy aparece en «Sustentado en», pero se desarrolla en otro H2 (R3-3) |
| Moverse sigue siendo medicina (800) | 8 + internos | Paseos, sillones, baldosa, camas ✔ | Mlacnik aparece en «Sustentado en» pero no se desarrolla (R3-3) |
| Cuándo llevarlo al veterinario (450) | 3 + interno | **Inventado** (R3-1) | AlertBox danger ✔ |
| Conclusión y FAQ (450) | — | Cierre de Luna, cita del dueño separada de la frase editorial ✔ | FAQ 8 (R3-6) |

- **Suma:** 500 + 750 + 650 + 800 + 800 + 800 + 800 + 450 + 450 = **6.000** ✔. Rango del contrato 5.100–6.900 (±15 %) ✔.
- **Cobertura:** las 15 fuentes tienen al menos un H2 que desarrolla su dato. No hay fuentes decorativas ✔.
- **Ningún H2 se dedica a las perras ni lleva su nombre en el título** ✔. Así se cumple la preferencia del propietario.
- **AlertBox:** info en la Introducción, warning en «Moverse», junto a la maniobra, y danger en «Cuándo llevarlo» ✔.

## Comprobaciones mecánicas

`seoTitle` 54 y `metaDescription` 153 ✔. El `pilar` es válido ✔. Las 6 rutas internas existen (verificado en la R1, sin cambios) ✔. Los prompts 1–3 y el del video no han cambiado desde la R2 ✔ y cumplen los cinco rasgos senior y el rechazo a tamaño móvil. La imagen 2 se reubica en «Señales…» de forma coherente ✔.

## Efecto cascada

- No hay `.mdx` redactado.
- Ningún otro brief ni artículo cita las fuentes 8–15. Lo comprobé buscando Yarborough, Bekoff, Bradshaw, Enomoto, Salt, Mlacnik, Laflamme y McMillan en `briefings/` y `src/content/`. La única coincidencia es Bradshaw como coautor de otro estudio distinto (Blackwell 2013, sobre ruidos) en el artículo de miedo a los petardos, que no tiene relación.
- **La lectura de la «reverencia» como juego (R3-2) afecta también a la §8.** Las fichas pueden seguir mostrando una reverencia de juego ilustrativa (sujeto A, no Luna), pero ningún alt ni pie debe decir que esa postura es lo que hace Luna.

## Lo que sí funciona

- **Rigor bibliográfico:** las 8 fuentes nuevas son reales, pertinentes y llevan límites honestos. Se marcaron «sin verificar» en vez de inventar PMID, y los cuatro PMID resueltos coinciden. No se citan porcentajes de Bekoff ni la cifra del beagle de McMillan, y la causalidad inversa de Yarborough ya está advertida.
- **El tejido narrativo** responde a la preferencia del propietario sin H2 dedicados a las perras. Seis de los siete momentos coinciden con el expediente.
- La regla «si una sección no llega a su target con contenido sustentado, se informa y se ajusta» es la salvaguarda correcta contra el relleno.
- Se conservan las correcciones de la R1 y la R2: fuente 7 correcta, epaxiales, cita del dueño separada y prompts completos.

## Bloqueo y propuesta para el propietario

Esta es la tercera y última ronda. No se puede abrir una R4 ni reiniciar la numeración. Opciones para que decida el propietario:

1. **Autorizar una corrección cerrada sin nueva auditoría del brief.** Una sesión distinta aplica solo las instrucciones de abajo, y la auditoría del artículo (`auditar-articulo-blog`) comprueba después que se cumplieron. Es la vía más corta, y los puntos son mecánicos.
2. **Abandonar este brief y abrir uno nuevo con el alcance de 6.000 palabras** como documento distinto, con su propio contador de rondas. Solo se justifica si el propietario considera que el cambio de alcance convierte la v3 en otro documento. Debe decidirse de forma explícita y no usarse para eludir el límite.

### Instrucciones de corrección (para la opción 1, en otra sesión)

1. **R3-1.** En la §6, «Cuándo llevarlo al veterinario», sustituye el *Momento* por uno documentado. Por ejemplo: «Lo que hemos visto en casa (los resbalones de Luna, la reverencia que a veces le cuesta, que bajó a 13 kg y que Dakota pasó de 23 a ~20) es lo que conviene contar en la consulta». El consejo de anotar se dirige al lector («anótalo»), no como algo que haga la familia.
2. **R3-2.**
   - En la §2 y en la §6, describe la reverencia como el dueño: «cuando se inclina, a veces le cuesta agacharse: estira las patas delanteras y deja la cadera en alto, como si hiciera una reverencia».
   - En la H3 de Bekoff, explica la reverencia de juego en general y añade que la postura de Luna **se le parece**, sin afirmar que sea una invitación al juego. Indica que, cuando le cuesta, es una observación que conviene contar al veterinario.
   - Renombra la H3 para que no diga «una invitación, no un capricho» aplicado a Luna.
   - Revisa la FAQ 3 con el mismo criterio.
3. **R3-3.**
   - Deja «Por qué dos perros…» en longevidad y variabilidad: Salt, Kealy en su parte de vida y McMillan.
   - Pasa Laflamme solo a «El peso, en las dos direcciones».
   - Quita Kealy del «Sustentado en» de «El peso».
   - En «Moverse», desarrolla Mlacnik en una frase (actividad supervisada junto con la pérdida de peso) o quítalo de su «Sustentado en» y de la §9.
   - Reparte de nuevo los targets sin cambiar el total, o justifica una reducción. No rellenes.
4. **R3-4.** Historial de la §11: «R1: NO APTO (v1) · R2: APTO CON CAMBIOS (v2) · R3: NO APTO (v3), `auditoria-brief-r3.md` · Decisión del propietario: [opción elegida]».
5. **R3-5.**
   - En la §3, actualiza la línea *H2* de las fuentes 1–7 con los nombres de la §6.
   - Sustituye el límite de la Fuente 3 por el texto propuesto en la R2 (N2), con la URL de la tabla 2 de la AAHA.
6. **R3-6.**
   - Bradshaw: «inusual entre los carnívoros».
   - Salt: «el beagle está entre las 12 razas; no usarlo para predecir la vida de un perro concreto».
   - Yarborough: «1,4 % en una cohorte de edad media de 6,9 años».
   - Mlacnik: «mejor resultado con fisioterapia intensiva (incluía TENS)».
   - Añade a los límites los conflictos de interés de Laflamme (Nestlé Purina), Mlacnik (coautor de Iams) y Enomoto (Elanco).
   - FAQ 8: responder como asociación.
7. **R3-7.** Quita «en la cama de al lado» y «persiguiendo».
8. **R3-8.** En la §1, quita «en línea con el resto del sitio» como justificación.
9. **R3-9.** Asigna `luna-01` (difuminada), `dakota-03` y `dakota-04`, o cambia la §11 a «5 fotos reales».
