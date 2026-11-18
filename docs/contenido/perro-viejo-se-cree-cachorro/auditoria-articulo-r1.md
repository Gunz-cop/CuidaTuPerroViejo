# Auditoría del artículo «Mi perro viejo se cree cachorro», ronda R1

- **Documento auditado:** `src/content/blog/perro-viejo-se-cree-cachorro.mdx`, commit `c353c9b`, blob `79f3683cdffcdd9d82e18a6faa25d02c25e346dd`.
- **Contrato:** `briefings/briefing-perro-viejo-se-cree-cachorro.md` v4.1, blob `38b31e620affd1ebf15b71cf8636220f76a10f6b`.
- **Expediente:** `docs/experiencias/luna-mente-joven-cuerpo-viejo-2026-11-18/README.md`, con la aclaración del dueño sobre la «reverencia».
- **Ronda:** **R1 de 3** del artículo. El contador del brief (R1–R3) es independiente.
- **Fecha:** 2026-11-18.
- **Rol:** revisor externo, desde una sesión distinta a la autora (la autora es la `…KP5um27…` y esta auditoría la hace la `…KP3wLDB…`). No he modificado el artículo, el brief ni el expediente.
- **Método:**
  - Ejecuté `metricas.mjs` y `tono.py`, conté las palabras por H2 con un script propio y compilé con `npx astro build`.
  - Resolví los 13 PMID con NCBI E-utilities y los 6 DOI sin PMID con Crossref.
  - Leí los resúmenes y el texto completo en PMC (BioC) de Salt, McMillan y Belshaw, el gráfico WSAVA (PDF) y la tabla 2 de la AAHA (PDF).
  - Miré cada imagen a 390 px y a resolución completa, extraje 6 fotogramas del video y amplié las placas de los collares.
  - Rendericé la página construida con Playwright a 390 y 1366 px, en modo claro y oscuro.
  - Comparé cada momento narrativo, frase por frase, con el expediente.

## Veredicto

**NO APTO.** El artículo añade a la experiencia real hechos que el expediente no recoge, y uno lo contradice (Dakota «adoptada ya mayor y con kilos de más», cuando llegó más delgada). También presenta como hábitos de la familia unas rutinas de juego que nadie ha documentado. Es el mismo tipo de fallo que bloqueó el brief en la R3 (R3-1).

Fuera del artículo hay además un bloqueo de privacidad que debe resolver el propietario. El original `luna-01.jpg` del expediente muestra **los teléfonos de la placa perfectamente legibles**, y está subido a un repositorio de GitHub **público**.

Lo mecánico está bien:
- El build compila.
- El tono da 0,4 muletillas por cada 1.000 palabras.
- Las 15 fuentes están citadas por su nombre en su H2, con identificadores correctos.
- Se cumplen las nueve correcciones R3.
- Las fotos publicadas no dejan leer ninguna placa.

El bloqueo es de procedencia narrativa, no bibliográfico.

## Comprobación de las correcciones R3 (opción 1 del propietario)

| Instrucción | Dónde se comprueba | Resultado |
|---|---|---|
| R3-1 «lo que la familia lleva anotado» | Artículo L320 («Lo que hemos visto en casa…») y L333 («Anota lo que ves», dirigido al lector) | ✔ Cumplida. No se dice que la familia lleve un registro |
| R3-2 Reverencia | H3 renombrada (L56), distinción explícita entre juego y echarse (L62–70), FAQ 3 (L394) | ✔ Cumplida, y además con la aclaración v4.1. Queda la ambigüedad de la hero (H-4) |
| R3-3 Duplicación del peso | Laflamme solo en «El peso» (L242–244). Kealy desarrollado solo en «Por qué dos perros» (L99–101; en L153 solo se nombra la cohorte). Mlacnik en una frase en «Moverse» (L277) | ✔ Cumplida. Aparece otra repetición distinta (H-9) |
| R3-4 Historial | Brief §11 | ✔ R1, R2 y R3 están recogidas (la v4.1 se anota antes que la v4, un detalle menor) |
| R3-5 §3 del brief | Las líneas *H2* de las fuentes 1–7 y el límite de la fuente 3 | ✔ |
| R3-6 Matices | Bradshaw «carnívoros» (L50) ✔; Salt «el beagle entre ellas» (L95) ✔; Yarborough 1,4 % con una edad media de 6,9 años (L275) ✔; Mlacnik (L232) ✔; FAQ 8 como asociación ✔ | ✔ en el artículo. En el brief, la §6 (línea 224) aún dice «algo raro entre animales domésticos» (residuo del brief, sin efecto en el texto) |
| R3-7 «cama de al lado» y «persiguiendo» | L21 y L86 | ✔ Retiradas |
| R3-8 Justificación de la extensión | Brief §1 | ✔ |
| R3-9 8 fotos | Las 8 están publicadas y asignadas (luna-02 → intro, dakota-01 → «Por qué dos», luna-04 → «Por dentro», luna-01 → «Señales», dakota-02 → «Peso», dakota-03 → «Moverse», dakota-04 → «Cuándo», luna-03 → cierre) | ✔ |

## Hallazgos

### P0

**H-1. Hechos añadidos a la experiencia real, uno de ellos contradictorio.**

Es una experiencia propia que el artículo declara como «lo que vemos en casa» (L21). `calidad-editorial-adsense.md` §3 prohíbe añadir datos que no estén en la fuente. Comparé el texto frase por frase con el expediente:

| Línea | Artículo | Expediente | Tipo |
|---|---|---|---|
| L347 | «En el de Dakota, que la adoptamos **ya mayor y con kilos de más**» | «Al llegar era **algo más delgada**… Con el aumento de peso y la edad…». El propio artículo lo dice en L86 | **Contradicción** |
| L281–283 | «**Preferimos** juegos en el suelo: buscar premios escondidos, tirar un juguete a poca distancia, olfatear. **Evitamos** los juegos que la hacen frenar en seco…» | Los cambios documentados son tres: quitar los paseos largos, poner camas ortopédicas y no subirlas a los sillones. No hay nada sobre los juegos | Práctica familiar inventada |
| L161 y L347 | «**Sí tiene** algunos problemas en el cuello» y «tiene **molestias** en el cuello» | «*No consta diagnóstico veterinario de la cervical…*: se cuenta como **sospecha del dueño**». En ningún sitio dice «molestias» | Sospecha presentada como hecho, con un síntoma añadido |
| L121 | «Al acariciarla **noto la cadera y las escápulas más de lo que las notaba antes**» | «se le ven los músculos y los huesos». No hay ninguna palpación ni comparación en el tiempo | Observación clínica añadida |
| L82 | «Para ella siempre tendré la misma voz y la misma cocina. **Siempre va a tener 5 meses**, la edad con la que llegó» | La reflexión es «el paso del tiempo debe de ser distinto; solo vive cerca de uno» | Reflexión atribuida al dueño en primera persona |
| L19 | «A los 5 ya era así de activa. Siempre lo ha sido» | No consta | Añadido |
| L111 | «de sus primeros ocho años **sabemos poco**: qué comía, cuánto se movía, qué golpes se llevó» | Solo consta la fecha de nacimiento «según los antiguos dueños» | Añadido |
| L254 | «Dakota **come con ganas**» | No consta nada sobre el apetito de Dakota | Añadido |
| L287 | «Luna correría hasta caerse si la dejáramos» | No consta | Añadido |

Por qué es P0: se lee como experiencia verificada y nadie puede contrastarla desde fuera. La línea L347 contradice al propio artículo, y la L281–283 convierte en «lo que hacemos» un consejo genérico. El mecanismo es el mismo que el de R3-1, que bloqueó el brief. El brief no originó estos añadidos: su §6 no los pide.

**H-2. Privacidad: el original `luna-01.jpg` con los teléfonos legibles está en un repositorio público.**

- `docs/experiencias/luna-mente-joven-cuerpo-viejo-2026-11-18/luna-01.jpg` (2576×1932, commit `a1ecedd`). Al ampliar la placa roja con forma de hueso, los dos números de teléfono se leen enteros. También hay una placa QR. **No los transcribo en este informe.**
- `luna-04.jpg` (original) deja leer parte de los dígitos.
- `list_repos` informa de que `Gunz-cop/CuidaTuPerroViejo` tiene visibilidad **public**. El commit solo está en `origin/claude/old-dogs-article-fallai-4kt7q1` y aún no ha llegado a `main`.
- Las versiones publicadas (`luna-tumbada-baldosa.webp`, con la placa difuminada, `luna-cara-blanca-frente`, `luna-mirando-camara` y `luna-lomo-desde-arriba`) **no** son legibles ni con ampliación. El artículo cumple el no negociable §9.5. El fallo está en el expediente.
- No es un defecto del texto, pero bloquea el merge: si la rama se fusiona tal cual, el original queda en el historial de `main`.

### P1

**H-3. La animación no se lee como una perra senior.**

En los fotogramas a 390 px, la beagle plana tiene la cara canela con la lista blanca típica de cualquier beagle. No tiene canas en las cejas ni en los párpados, ni el hocico gris, y los ojos no están hundidos. El lomo y los muslos se ven normales. El brief (§8, prompt del video) exige «white face, white eyebrows and eyelids, grey muzzle, slightly sunken calm eyes» y «Reject if at mobile size the dog looks young». La skill trata esto como un hallazgo que **obliga a regenerar**, no a cambiar el pie.

El resto del video está bien:
- La secuencia coincide con el pie (L148): postura con la cadera alta y el globo con el cachorro, resaltado ámbar a lo largo de la columna, resaltado tenue en la cadera y después la perra tumbada dormida.
- Dura 8 s, está en H.264 a 1280×720 y no lleva pista de audio.
- Se reproduce con `muted playsinline` y el póster.
- La figura mide 491 px a 390 de ancho, sin scroll horizontal, y el pie se lee en modo oscuro.
- Falta el rótulo final «Mente de cachorro, cuerpo de 11 años» de la §8 (ver H-11).

**H-4. Hero: la edad senior solo se sostiene por la cara, y la postura se lee como una reverencia de juego.**

`beagle-senior-estirandose-al-echarse.webp` cumple solo una parte de los rasgos senior:
- ✔ A 390 px se leen la cara, la frente y las cejas blancas, y los párpados algo caídos. La postura es natural y no muestra ninguna enfermedad.
- ✘ El cuerpo es atlético, con los cuartos traseros llenos y el pelo brillante. No se ve el relieve de la cadera ni de las escápulas.

El criterio de aceptación del brief (§8, ficha 1) dice: «A 390 px se leen la cara blanca **y la cadera marcada**». La cadera no se lee.

Además, la perra tiene la cabeza alta, las orejas atentas y la mirada fija fuera del encuadre. Es justo la «reverencia de juego» que el artículo describe en L68 («mira a su compañero»), mientras que el alt dice «a medio echarse». El artículo dedica una H3 a enseñar a distinguir las dos posturas, y la portada muestra la ambigua. Hay que regenerarla o que el propietario la acepte de forma explícita.

**H-5. Distribución: todos los H2 por debajo de su target, y el total queda justo encima del mínimo. Al corregir H-1 se perderá volumen.**

| Sección | Real | Target §6 | Desv. |
|---|---|---|---|
| Introducción | 408 | 500 | −18 % |
| Por qué tu perro mayor juega… | 674 | 750 | −10 % |
| Por qué dos perros… | 504 | 550 | −8 % |
| Lo que cambia por dentro… | 676 | 800 | −16 % |
| Señales que solemos confundir… | 648 | 800 | −19 % |
| El peso, en las dos direcciones | 666 | 800 | −17 % |
| Moverse sigue siendo medicina… | 722 | 900 | −20 % |
| Cuándo llevarlo al veterinario | 375 | 450 | −17 % |
| Conclusión + FAQ | 125 + 406 = 531 | 450 | +18 % |
| **Total (sin el cuadro de fuentes)** | **5.204** | 6.000 | −13 % |

- Cómo conté: el texto visible, con los H3 y los pies, sin el frontmatter, los imports, los alt ni el cuadro de fuentes. `tono.py` da 5.219. `metricas.mjs` da 5.833 porque incluye el cuadro de fuentes y los alt. El brief declara 5.814.
- El total cumple el rango de 5.100 a 6.900 con un margen de unas 100 palabras. Seis H2 quedan fuera del ±15 %.
- La §6 dice «si una sección no llega a su target… se informa y se ajusta». La entrega no lo informó.
- Al retirar los añadidos de H-1 (unas 150–200 palabras) el total bajará de 5.100.
- **No se debe rellenar** (`calidad-editorial-adsense.md` §1).
- `metricas.mjs` no logra leer el rango ni los targets del brief v4 («rango del contrato ausente»): el formato de la §9 no es el que espera el script. Por eso los conteos de esta tabla son propios.

### P2

**H-6. Fidelidad a las fuentes, matices.**
- **Bekoff** (L60): el artículo dice «un mordisco suave, un empujón». El resumen dice «biting accompanied by rapid side-to-side shaking of the head». No es «suave», y el empujón no aparece en el resumen.
- **WSAVA** (L250): el artículo dice «el gráfico muscular toma como referencia **una escala de nueve puntos**». El gráfico solo dice «body condition score > 5» y «< 4», sin nombrar la escala de 9 puntos.
- **Mlacnik**: en «Moverse» (L277) el artículo habla de «actividad supervisada». El estudio compara fisioterapia en casa con fisioterapia intensiva con TENS, así que no es actividad ni juego. La FAQ 6 dice «fisioterapia» sin «intensiva».
- **Brief (origen, no afecta al texto):** la fuente 3 se atribuye a «Quimby J, et al.». PubMed 36584321 da como autores a **Dhaliwal R**, Boynton E, Carrera-Justiz S, Cruise N, Gardner M, Huntingford J, Lobprise H y Rozanski E. Quimby no figura. El artículo cita «AAHA (2023)» sin autor, así que el texto está bien. Las R1–R3 del brief no lo detectaron.

**H-7. Pies que afirman lo que la foto no muestra o el expediente no dice.**
- L126 (`luna-lomo-desde-arriba`): «Desde arriba se adivina lo que se nota al tacto: menos músculo sobre el lomo y la cadera». La foto es frontal y algo cenital, y la cadera no aparece. Además se apoya en la palpación inventada de L121.
- L170: «En la baldosa lisa es donde **más** se le abren las patas». El expediente no hace esa comparación.

**H-8. Imágenes: atributos y altura.**
- Las 9 imágenes del cuerpo usan sintaxis Markdown y salen sin `width`, `height` ni `loading="lazy"`, lo que provoca desplazamientos de diseño (CLS). El brief §4 exige los atributos.
- Las 6 fotos verticales miden 915 px de alto a 1366 px de ancho, por encima del umbral de unos 900 px de `apoyos-visuales-responsive.md`. En móvil miden 477 px, que está bien.
- `luna-02` y `luna-03` son casi la misma toma, y `dakota-03` y `dakota-04` también. Se repite la misma imagen dos veces por perra.

**H-9. Repeticiones nuevas.**
El consejo «pésalo, palpa y anótalo» aparece cuatro veces (L217, L252, L260 y L333–343). «Grasa y músculo se miden por separado» aparece en L134, L248 y en la FAQ 4. «Cómo pesa el peso» (L34) y «el peso pesa» (L97) son un juego de palabras repetido. Va contra la §1 del control editorial: cada H2 aporta una decisión distinta.

**H-10. Afirmación conductual sin fuente.**
En L68–70 el artículo afirma que la reverencia de juego es «rápida y elástica», que el estiramiento al echarse es «lento» y que, si el perro se queda en medio, «no está invitando a nadie. Está resolviendo una maniobra que le cuesta». Es razonable, pero se presenta como hecho sin respaldo y describe el estado del perro del lector a partir de su aspecto. Basta con matizarlo como observación.

**H-11. Recursos prometidos que no se entregaron, sin actualizar el brief.**
- La **imagen 3** («dos cuerpos», §8 y §11) no existe y el artículo no la usa.
- El rótulo final del video tampoco está.
- La §1 del brief (heroImage y alt de «reverencia de juego, invitando a jugar») y las fichas de hero y video de la §8 siguen describiendo una reverencia de juego que el artículo ya no usa.

**H-12. Peso del repositorio.**
`docs/contenido/perro-viejo-se-cree-cachorro/originales/` suma 17,6 MB en tres PNG (hero-v1, palpar-v1 y video-frame-v1) subidos al repositorio público.

## Registro fuente → afirmación → comprobación

| # | Fuente (identificador resuelto) | Afirmación en el artículo | Localización en la fuente | Resultado |
|---|---|---|---|---|
| 1 | Freeman 2012, PMID 22111652 ✔ | Sarcopenia sin enfermedad; más morbilidad y mortalidad (L130–132) | Resumen | ✔ |
| 2 | WSAVA/Tufts MCS (PDF de la OSU, 200, application/pdf) | Epaxiales primero; 4 grados; pérdida con BCS > 5 (L134–140, L210) | Texto del gráfico | ✔ salvo los «nueve puntos» (H-6) |
| 3 | AAHA 2023, PMID 36584321 ✔ (primera autora Dhaliwal) | Último 25 % (L74); en la parte musculoesquelética, palpación de columna, extremidades y articulaciones, MCS y examen del movimiento (L327) | Tabla 2, fila *Musculoskeletal* (además: «Encourage clients to video their pets», que respalda L333) | ✔ |
| 4 | Kealy 2002, PMID 11991408 ✔ | 48 labradores en parejas, 25 % menos de comida, más vida y enfermedad crónica más tardía (L99–101) | Resumen | ✔ |
| 5 | Smith 2006, PMID 16948575 ✔ | Del 15 % a los 2 años al 67 % a los 14, proceso continuo (L155); mediana de 12 frente a 6 años (L228) | Resumen («increased linearly») | ✔ |
| 6 | Impellizeri 2000, PMID 10754668 ✔ | 9 perros que pierden del 11 al 18 % y menos cojera (L230) | Resumen | ✔ |
| 7 | Belshaw 2020, PMID 33227581 ✔, PMC7755036 | «I just assumed it was old age…», «…normal to slow down…»; algunos tardaron meses (L174–176) | Resultados y resumen («some waited many months») | ✔ |
| 8 | Yarborough 2022, PMID 36008509 ✔ | 15.019 perros; OR 6,47 ajustada; causalidad inversa; 1,4 % con edad media de 6,9 años (L273–275) | Resumen y discusión (verificado en la R3) | ✔ |
| 9 | Bekoff 1995, DOI 10.1163/156853995X00649 ✔ (Crossref, con resumen) | Reverencia antes o después de acciones malinterpretables (L60) | Resumen | ✔ con el matiz del «empujón» (H-6) |
| 10 | Bradshaw 2015, PMID 25251020 ✔ | Inusual entre carnívoros; competitivo con perros y cooperativo con humanos; seleccionado en la domesticación; vínculo como hipótesis (L50–54) | Resumen | ✔ |
| 11 | Enomoto 2024, PMID 38310147 ✔ | 39,8 % de 123; los dueños notaron ~30 % (L157, L178) | Resumen | ✔ |
| 12 | Salt 2019, PMID 30548336 ✔, PMC6335446 | 50.787 perros, 12 razas con el beagle, más riesgo y vida más corta en todas (L95–97) | Resumen; *Methods* (lista de razas) | ✔ (COI de Mars) |
| 13 | Mlacnik 2006, PMID 17144822 ✔ | Ambos grupos pierden peso; el mejor resultado es el de fisioterapia intensiva (L232) | Resumen | ✔ en L232; matiz en L277 y FAQ 6 (H-6) |
| 14 | Laflamme 2005, PMID 15833567 ✔ | Evaluación nutricional previa; mediana edad con sobrepeso y geriátricos con BCS bajo (L242–244) | Resumen | ✔ |
| 15 | McMillan 2024, PMID 38302530 ✔ | 584.734 perros; 12,5 / 12,7 / 12,0 años (L76); pequeños de hocico largo viven más y medianos braquicéfalos menos (L105) | *Results* (PMC10834484) | ✔ |

Las 15 aparecen citadas por su nombre dentro del H2 que les asigna la §9, no solo en el cuadro final. No hay ningún identificador inventado ni mal asignado.

## Recursos prometidos → prueba

| Recurso | Ruta | Prueba | Resultado |
|---|---|---|---|
| Hero | `beagle-senior-estirandose-al-echarse.webp` (1600×893) | 390 px y resolución completa | La cara es senior, el cuerpo no; postura ambigua (H-4) |
| Imagen de palpación | `palpar-lomo-beagle-senior.webp` | 390 px y resolución completa | ✔ Senior claro (cara gris, ojos hundidos, lomo suavizado). Manos con 5 dedos. El collar no tiene placa. El alt es fiel |
| Imagen 3 «dos cuerpos» | — | — | No existe (H-11) |
| Video | `reverencia-musculo.mp4` y póster | ffprobe, 6 fotogramas, Playwright a 390 y 1366 en claro y oscuro | Funciona; la perra no se ve senior (H-3) |
| 8 fotos reales | `luna-*`, `dakota-*.webp` | Placas ampliadas en las 4 de Luna; alt contra imagen | ✔ No hay ninguna placa legible y los alt son fieles; pies en H-7 |
| Enlaces internos (6) | §5 | `metricas.mjs` y build | ✔ |
| 3 AlertBox y FAQ con 8 preguntas | — | Script y lectura | ✔ La FAQ está en `<FAQ>` |
| Build | `npx astro build` | exit 0 | ✔ La proyección Markdown incluye el pie del video |

Todo se ha comprobado en local, no en producción.

## Tejido narrativo

- ✔ Cada H2 abre o continúa con un momento real.
- ✔ Ningún H2 está dedicado a las perras ni lleva su nombre.
- ✔ Dakota queda como contraste y el hilo se cierra con Luna.
- ✔ La cita del dueño va separada de la línea editorial «Nos toca a nosotros saberlo» (L360).
- ✔ La reverencia se cuenta tal y como la aclaró el dueño: al echarse, a veces se queda pegada, otras la baja de golpe y rara vez cruje (L123).
- ✘ Momentos con hechos añadidos: ver H-1 y H-7.

## Lo que sí funciona (no tocarlo al corregir)

- **La distinción entre la reverencia de juego y el estiramiento al echarse** (L56–70, FAQ 3). Resuelve R3-2 mejor de lo que pedía la instrucción, y no hay ningún alt ni pie que diga que Luna invita a jugar.
- **L142:** «La "reverencia" atascada de Luna no prueba que haya perdido músculo… eso lo determina una exploración». Es la honestidad que el brief pedía.
- **Yarborough contado como asociación,** con la causalidad inversa y el 1,4 % con su edad media (L275, FAQ 8).
- **Dakota:** «un hallazgo en la columna» sin nombre clínico (L159), como pide el expediente.
- **L240,** la parte de que Luna come poco, es fiel casi palabra por palabra, incluida la duda del dueño sobre la comida grasosa.
- **Los AlertBox** van junto a la maniobra («No pongas a dieta a un perro que ya está perdiendo peso»), sin dosis ni fármacos, de acuerdo con la política editorial.
- **Privacidad:** `luna-tumbada-baldosa.webp` tiene la placa difuminada, y ninguna otra placa publicada es legible.
- **El tono** da 0,4 muletillas por cada 1.000 palabras, sin usted ni voseo y sin instrucciones del brief filtradas al texto.
- **La densidad** tiene media y mediana de 40 palabras por párrafo, y hay unas 180 palabras por cada H3.

## Qué corregir, en orden

1. **Privacidad (H-2), lo decide el propietario y debe ir antes de cualquier merge.**
   - Sustituye `luna-01.jpg` y `luna-04.jpg` del expediente por versiones con la placa difuminada, o retíralas.
   - Como el repositorio es público y el original ya está en el historial de la rama, valorad reescribir el historial de la rama (necesita autorización explícita para un force-push) o fusionar con squash a partir de un árbol limpio y borrar después la rama remota.
   - Si los teléfonos siguen activos, considera que ya han sido expuestos.
2. **H-1, en otra sesión.**
   - Corrige L347: «la adoptamos ya mayor» y quita «con kilos de más».
   - En L161 y L347, presenta la cervical como sospecha del dueño («creo que tiene algo en la cervical») y quita «molestias».
   - Para el resto de filas de la tabla H-1 hay dos opciones:
     - (a) retirarlas;
     - (b) pedir al propietario que las confirme y añadirlas al expediente **antes** de mantenerlas.
   - Para L281–283, si no se confirman, reescribe en segunda persona como consejo («Prefiere juegos en el suelo…»), sin atribuirlo a la familia.
3. **H-5, después de H-1.** Vuelve a contar las palabras. Si el total baja de 5.100, no rellenes. Propón al propietario un ajuste razonado del rango en el brief (`calidad-editorial-adsense.md` §1) o amplía solo con contenido nuevo que tenga fuente. Informa del conteo por H2 frente a la §6.
4. **H-3 y H-4.**
   - Regenera el video con los rasgos senior del prompt de la §8: cejas y párpados blancos, hocico gris, ojos algo hundidos y lomo suavizado. Rechaza la versión si a 390 px la perra parece joven.
   - Regenera la hero para que se vea a medio echarse, con la cabeza baja o relajada, sin mirada de juego, y con el relieve de la cadera y las escápulas visible. La alternativa es que el propietario acepte la actual de forma explícita.
   - Actualiza las fichas de la §8 y el frontmatter de la §1 del brief.
5. **P2:**
   - H-6: quita «suave» y «un empujón», o di «mordiscos con sacudidas de cabeza»; quita «nueve puntos»; escribe «fisioterapia intensiva» en L277 y en la FAQ 6.
   - H-7: corrige los pies de L126 y L170.
   - H-8: usa `<img width height loading="lazy" decoding="async">` y limita la altura de las fotos verticales en escritorio, o elimina una de cada par casi idéntico.
   - H-9: deja el registro de peso y palpación en un solo sitio («Qué llevar a la consulta») y referencia ahí desde los demás.
   - H-10: matiza «no está invitando a nadie».
   - H-11: produce la imagen 3 o retírala de la §11.
   - H-12: saca los PNG originales del repositorio.
   - En el brief: corrige el autor de la AAHA (Dhaliwal R, et al.) y la línea 224 de la §6.

### Prompt para la sesión correctora

> Corrige `src/content/blog/perro-viejo-se-cree-cachorro.mdx` según `docs/contenido/perro-viejo-se-cree-cachorro/auditoria-articulo-r1.md`. Lee antes AGENTS.md, la skill `redactar-articulo-blog`, `calidad-editorial-adsense.md` y el expediente `docs/experiencias/luna-mente-joven-cuerpo-viejo-2026-11-18/README.md`. Aplica en este orden:
>
> 1. **H-1.**
>    - L347: «la adoptamos ya mayor», sin «con kilos de más» (llegó más delgada).
>    - L161 y L347: la cervical como sospecha del dueño, sin «molestias».
>    - Retira, o deja pendiente de confirmación del propietario y regístralo en el expediente, lo siguiente: L19 «A los 5 ya era así de activa. Siempre lo ha sido»; L82 «Para ella siempre tendré la misma voz… Siempre va a tener 5 meses…»; L111 «de sus primeros ocho años sabemos poco…»; L121 «Al acariciarla noto la cadera y las escápulas más de lo que las notaba antes»; L254 «Dakota come con ganas»; L287 «Luna correría hasta caerse si la dejáramos».
>    - L281–283: pasa «Preferimos…/Evitamos…» a consejos en segunda persona sin atribuirlos a la familia.
> 2. **H-7.** Pie de L126 sin «menos músculo sobre el lomo y la cadera». Pie de L170 sin «donde más».
> 3. **H-6.**
>    - L60: «mordiscos acompañados de sacudidas rápidas de cabeza», sin «suave» ni «empujón».
>    - L250: sin «escala de nueve puntos»; basta con «por encima de 5».
>    - L277 y FAQ 6: «fisioterapia intensiva» en vez de «actividad supervisada» o «fisioterapia».
> 4. **H-9.** Deja el registro peso + palpación solo en «Qué llevar a la consulta». En L217, L252 y L260, una frase que remita ahí.
> 5. **H-10.** Matiza L70 («puede que no esté invitando a jugar, sino resolviendo una maniobra que le cuesta; eso conviene contarlo al veterinario»).
> 6. **H-8.** Convierte las imágenes del cuerpo a `<img src alt width height loading="lazy" decoding="async" />` con sus dimensiones reales (fotos verticales de 900×1200, horizontales de 1200×900, palpación de 1600×893) y el pie en `<em>` o `<figcaption>`.
> 7. **H-5.** Cuenta las palabras por H2 frente a la §6 del brief e informa del total. Si queda por debajo de 5.100, NO rellenes: deja una propuesta de ajuste del rango para el propietario.
> 8. **Build.** Ejecuta `npx astro build` y `python3 .agents/skills/references/scripts/tono.py src/content/blog/perro-viejo-se-cree-cachorro.mdx`.
>
> No toques las secciones que el informe lista en «Lo que sí funciona». La regeneración de la hero y del video (H-3 y H-4) y la privacidad del expediente (H-2) quedan para el propietario o una sesión de imágenes. No audites tu propia corrección: la R2 la hará otra sesión.
