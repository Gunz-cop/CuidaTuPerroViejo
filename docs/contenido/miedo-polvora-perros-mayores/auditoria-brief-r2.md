# Auditoría independiente del brief LA-01 · Ronda R2

- **Documento auditado:** `briefings/briefing-miedo-polvora-perros-mayores.md` (v2 del 2026-10-26), commit `c43279a`, blob `be53704e7b90405ada29009f5e4bc9af67091053`.
- **Rama:** `claude/brief-miedo-polvora-perros-mayores-latam`.
- **Ronda:** R2 de un máximo de 3. **Si la R3 falla, hay que detenerse y revisar el bloqueo con el propietario.**
- **Fecha:** 2026-10-26.
- **Método:** skill `auditar-briefing-contenido` (con `references/formato-informe.md`), aplicando como norma `calidad-editorial-adsense.md`, `guia-voz-tono.md`, `direccion-visual-editorial.md`, `apoyos-visuales-responsive.md` y `generar-briefing-contenido`. No generé ni corregí este brief, ni la R1. Solo he escrito este informe.
- **Alcance:** volví a abrir S7–S14 con `curl` a través del proxy, sin desactivar TLS (todas respondieron 200). También abrí las notas de vigencia de las leyes colombianas, que se cargan con JavaScript (`js/ley_0670_2001.js` y `js/ley_2224_2022.js`), y el texto de S6 en PMC para comprobar su matiz de edad. Contrasté los testimonios con `docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md` y con `src/content/blog/miedo-petardos-perros-mayores.mdx`. Busqué paráfrasis con n-gramas de 5, 6 y 8 palabras y con una comparación manual de H3 y FAQ. Conté metadatos, presupuesto y FAQ con Python. Comprobé los 13 enlaces en `src/content/blog/` y `src/pages/herramientas/`, y la matriz fuente→H2 con un script en §3, §6 y §9.2. Revisé el registro de razas frente a `heroImageAlt` y `public/images/blog/`.

## Veredicto

**NO APTO** (no válido para redacción). El H2-4 nuevo, sobre el perro que ya no se levanta, no tiene fuentes y manda dar agua, comida y masticables a un perro postrado sin indicar la postura ni la vigilancia que evitan la aspiración. Además, obliga a moverlo pero el contrato prohíbe recomendar «alzar» y no dice cómo hacerlo con seguridad.

Recuento: **0 P0 · 1 P1 · 4 P2 · 13 P3.**

La R1 queda corregida en lo esencial: 4 de sus 5 P1 están resueltos del todo y el P1-3 queda casi resuelto (el resto pasa aquí como P2-1). Las fuentes nuevas, incluida S14, existen y dicen lo que el brief les atribuye, con los matices que señalo más abajo.

## Comprobación de los hallazgos de la R1

| R1 | Estado en v2 | Evidencia |
|---|---|---|
| P1-1 Luna/Dakota ya publicados | **Corregido** | Dakota, la perra de unos vecinos y la hipótesis del «lugar menos ruidoso» solo aparecen como exclusiones (§2, H2-1, §9.4). De Luna queda «temblores, terremotos y choques; busca a la familia» (H2-7), que es justo lo que proponía la R1. |
| P1-2 Osa/Baltor alterados | **Corregido** (queda un matiz, P3-7) | Osa: «no recuerda con seguridad si se escapaban; cree que…», cena sin fecha, sin edad. Baltor: «no salía de las habitaciones», «una vez», sin «quieto». Todo coincide con las líneas 51-71 y 84-88 del archivo. |
| P1-3 Diferenciación no real | **Casi corregido** | El esqueleto es otro, las dos FAQ parafraseadas se sustituyeron, Gähwiler se usa solo para el perro inmóvil y la escena de consuelo de España queda en una remisión. Pero `### Cómo averiguarlo donde vives` sigue igual, aunque `correccion-r1.md` dice que «los ocho H3 señalados se renombraron o desaparecieron», y quedan paráfrasis de contenido → **P2-1**. |
| P1-4 70 % mal asignado | **Corregido** | En §3 (S4), H2-10 y la regla 4 del §9.7 aparecen ya separados el 55 % (N = 377) y el más del 70 % (N = 694), con la definición de contracondicionamiento. |
| P1-5 Falta la Ley 2224 | **Corregido** | S14 está añadida y verificada (ver tabla de fuentes). Se quitó «no por los animales». |
| P2-1 Dakota como dato del país | Corregido | Dakota eliminada. |
| P2-2 Portada junto a la ventana | Corregido, pero aparece un fallo nuevo de geometría | Ver **P2-3**. |
| P2-3 Conceptos repetidos de España | Corregido para España | La imagen 3 repite ahora el concepto de la portada publicada de leishmaniosis → **P2-4**. |
| P2-4 Fuentes fuera de matriz | **Corregido** | El script confirma que §3, la línea de matriz del §6, los `*Sustentado en:*` y §9.2 coinciden para S1–S14, y que cada H2 usa en su cuerpo exactamente las fuentes que tiene asignadas. |
| P3 1-8 | Corregidos 1-4 y 6-8 | P3-5 (fecha de S7): **la R1 se equivocó.** La página sí muestra «7·DIC·2024» (comprobado hoy), así que el brief hereda una afirmación falsa → P3-1. |

## Hallazgos

### P1. Degrada el contrato y pasaría al artículo

**P1-1. El H2-4 da cuidados clínicos a un perro postrado sin fuente y sin las precauciones mínimas, y choca con la regla 9 del contrato.**
- *Ubicación:* §6, H2-4, `### Tú eliges el sitio por él` y `### Lo que no puede hacer por sí mismo`; §9.7, reglas 9 y 13; FAQ «Mi perro ya no se levanta…».
- *Evidencia:*
  1. El H3 manda «llegar al agua (ofrecérsela)» y «S4: si come, un masticable o comida durante el ruido». S4 es una encuesta sobre perros que se mueven, y el propio brief reconoce (laguna 2) que no hay estudios sobre perros que no caminan. No hay ninguna instrucción sobre cómo darle agua o comida a un perro echado: ni incorporarlo de pecho, ni nunca de lado, ni poca cantidad, ni alguien al lado mientras mastica. El sitio ya publica ese riesgo: `alimentacion-perros-mayores-sin-dientes.mdx` (l. 73 y 224) cita el Manual Merck sobre neumonía por aspiración y avisa de que no se dé comida ni agua a la fuerza. La FAQ borrador repite «ofrécele agua» sin ninguna condición.
  2. El H2-4 exige elegir el sitio «antes del ruido» y moverlo allí. Un perro que no se levanta solo se puede mover cargándolo. Sin embargo, la regla 9 del §9.7 dice «No recomendar alzar, jalar…», y el brief no da ninguna pauta segura: no dice que lo hagan dos personas, ni que usen una manta firme como camilla, ni que no lo arrastren, ni que pidan una demostración a la veterinaria, ni que avisen del riesgo de mordisco en un perro con dolor o asustado. El artículo de úlceras (l. 44-48) ya tiene esa pauta: «Pide que te hagan una demostración… Puede hacer falta otra persona… Muévelo sin arrastrarlo».
- *Por qué importa:* es la única sección sin estudios, en un tema de salud (YMYL), y el encargo pide expresamente comprobar que sea segura. El redactor tiene dos salidas y las dos son malas: incumplir la regla 9 sin pauta, o dejar al lector sin saber cómo moverlo. Y el consejo del masticable, trasladado de perros que se mueven a uno postrado, puede producir un atragantamiento o una aspiración.
- *Corrección:* (a) En `### Lo que no puede hacer por sí mismo`, ofrecer agua y comida **solo con el perro incorporado de pecho, nunca tumbado de lado**, en poca cantidad, con alguien a su lado y según lo que ya haya indicado la veterinaria. Si tose o le cuesta tragar, parar. Enlazar `alimentacion-perros-mayores-sin-dientes` como apoyo y añadirlo al §5.1. Quitar el «masticable» para este perro, o limitarlo a lo que ya come habitualmente en esa postura y siempre vigilado. (b) En `### Tú eliges el sitio por él`, moverlo como enseñó la veterinaria (remitiendo al H2 «Cambios de postura» del artículo de úlceras): con otra persona o una manta firme, sin arrastrarlo, y con cuidado si se queja o intenta morder. (c) En la regla 9 del §9.7, añadir la excepción «salvo mover al perro que no se levanta, con la técnica que haya enseñado la veterinaria». (d) Declarar en el H2-4 que esas pautas son criterio clínico general, no evidencia sobre miedo al ruido, y ajustar la FAQ 3 («ofrécele agua, incorporado de pecho»).

### P2. Bajan la calidad

**P2-1. Quedan paráfrasis del artículo de España en H3 y contenidos, aunque la corrección dice que se eliminaron.**
- *Ubicación:* H2-9 `### Cómo averiguarlo donde vives`; H2-10 `### Los días después`; H2-8 `### Dónde buscar en el barrio`; `AlertBox` danger (H2-7) y warning (H2-5).
- *Evidencia:*

| Brief v2 | España (`miedo-petardos-perros-mayores.mdx`) | Veredicto |
|---|---|---|
| `### Cómo averiguarlo donde vives` | `### Cómo averiguar las normas de tu ayuntamiento` (l. 175) | Título sin cambiar; la R1 ya lo señaló. |
| `### Los días después`: recuperación según S6 (tres cuartas partes, 10 %, 12 %, más del 3 %) + veterinaria si no come, tiene escapes o rehúye sitios (S3, generalización) | `### Lo esperable` + `### Lo que debe mirar el veterinario` (l. 450-470): las mismas cifras de S6, «deja de comer… incontinencia nueva… rehúye lugares asociados» y Lopes Fagundes | Paráfrasis de contenido completo. Solo cambia el título, y apenas («Los días siguientes» → «Los días después»). |
| `### Dónde buscar en el barrio`: «patios vecinos, bajo vehículos… llevar su comida y su frazada; no perseguirlo si corre» | `### Las primeras horas` (l. 427): «Mira bajo coches y pregunta por patios de vecinos. Lleva un premio y su manta; si corre al verte, evita perseguirlo» | Paráfrasis frase a frase. |
| `danger`: «Le cuesta respirar o el jadeo no cede…, tiene las encías muy pálidas o azuladas, se desmaya o se queda desorientado» | l. 119: «Llama si le cuesta respirar o el jadeo persiste…, tiene encías muy pálidas o azuladas, se cae, se desmaya o queda desorientado» | Coinciden 6 palabras seguidas en dos tramos («le cuesta respirar o el jadeo», «encías muy pálidas o azuladas se»). |
| `warning`: «No le des calmantes de personas, restos de otros tratamientos…» | FAQ (l. 507): «No le des calmantes de personas ni reutilices restos de otro tratamiento» | Coinciden 6 palabras seguidas; es la misma idea. |

  No hay coincidencias de 8 palabras en el texto destinado al lector. Pasa la prueba automática del §9.5, pero es justo el tipo de paráfrasis que esa prueba no detecta (R1, P1-3).
- *Por qué importa:* las listas clínicas de urgencia pueden parecerse por fuerza, pero `Los días después` y `Dónde buscar` son secciones enteras que repiten las de España. Además, `correccion-r1.md` declara corregido algo que no lo está.
- *Corrección:* renombrar `Cómo averiguarlo donde vives` con un enfoque local (por ejemplo, «Dónde buscar el decreto de tu alcaldía o municipalidad»). Reducir `Los días después` a una remisión de una o dos frases a las cifras de S6 y dedicar el espacio a algo propio: enero con calor, visitas que se van o el perro que no se levanta. En `Dónde buscar en el barrio`, partir de lo que no tiene España: el portón, la pila, los lotes baldíos, el grupo de WhatsApp del barrio, las veterinarias del barrio y la hora en que baja la pólvora. Quitar la secuencia «coches / patios / premio y manta / no perseguir». Volver a redactar los dos `AlertBox` para que no compartan 6 palabras seguidas con España. Añadir esas cinco filas como ejemplo en la tabla manual del §9.5.

**P2-2. Las condiciones del CBD se atribuyen al «Colegio» cuando son de un veterinario citado en la nota, y la FAQ las endurece.**
- *Ubicación:* H2-5 `### Acepromazina y CBD: lo que dicen los colegios`; H2-10 bullet «CBD»; FAQ «¿Le puedo dar CBD…?».
- *Evidencia:* en S9 (El Delfino, 10-12-2024), la nota en voz del COLVET dice: «los medicamentos a base de cáñamo como el CBD, solo deben ser administrados bajo indicación de un médico veterinario». Lo de «excelente recurso… para tranquilizaciones» y «El uso de CBD no es recomendable en pacientes con problemas hepáticos» va detrás de «Según el Dr. Daniel Meza Ramírez, Médico Veterinario con énfasis en Analgesia y Anestesia». El §3 lo atribuye bien («Dr. Daniel Meza»). En cambio, el H2-5 y el H2-10 dicen «el COLVET lo menciona / lo considera un recurso… y no con problemas de hígado», y la FAQ dice: «El Colegio… advierte… que no se dé a perros con problemas de hígado». «No es recomendable» se convierte en «que no se dé».
- *Por qué importa:* es un producto con regulación desigual (la propia nota dice que en Costa Rica «aún no hay suficiente regulación») y la regla 3 del §9.7 exige «solo lo que dice S9».
- *Corrección:* escribir «en un comunicado del COLVET, que pide darlo solo con indicación veterinaria, un veterinario especialista en analgesia lo describe como un recurso y advierte que no es recomendable en perros con problemas de hígado». En la FAQ, cambiar «que no se dé» por «que no es recomendable».

**P2-3. Portada: la sábana tapa justo el lado hacia el que mira el perro.**
- *Ubicación:* §8, ficha (fila «Acción y espacio») y prompt de la imagen 1.
- *Evidencia:* la sábana cuelga «por los lados izquierdo, derecho y trasero» y deja abierto solo el frente, hacia la cámara. Pero el perro está «mirando hacia la izquierda del encuadre, donde está la mujer», y la mujer está «a la izquierda, a más de un metro». Desde dentro de la cueva, el perro miraría la tela, no a la mujer. Además, la lámpara también está a la izquierda, detrás de la tela. La dirección visual exige acciones físicamente coherentes (la portada v1 del sitio ya se rechazó por un fallo de dirección).
- *Corrección:* dejar abiertos el frente y el lado izquierdo, con la sábana solo por la derecha y por detrás; o bien colocar a la mujer en diagonal delante a la izquierda, visible por la abertura del frente, y hacer que el perro mire hacia fuera por esa abertura. Ajustar la ficha y la prueba de aceptación: «se ve la mirada del perro hacia la mujer a través de la abertura».

**P2-4. La imagen 3 repite el concepto de una portada ya publicada con otro mestizo, y el registro de razas del brief está desactualizado.**
- *Ubicación:* §8, `### Razas recientes y elección` e imagen 3.
- *Evidencia:* la portada publicada de `leishmaniosis-perros-mayores.mdx` (publicada el 2026-10-24; `[x]` en el inventario) tiene este alt: «Ilustración de una cuidadora ajustando un collar al cuello de una perra mestiza senior de hocico oscuro canoso…» (`mestizo-senior-colocacion-collar-v1.webp`). La imagen 3 de LA-01 es una mujer que engancha una placa al collar de un mestizo senior con máscara negra canosa. A 390 px es la misma composición: manos de mujer en el cuello de un mestizo de hocico oscuro y canoso. El brief sigue listando la leishmaniosis como «(brief)» y justifica que el mestizo sea distinto por el tipo y el color, pero no detecta que se repite la escena.
- *Corrección:* cambiar el concepto de la imagen 3. Por ejemplo, la placa ya puesta mientras el perro, sentado junto al portón cerrado, recibe la foto del teléfono (de espaldas, sin pantalla visible). O bien una mano que comprueba el candado del portón con el perro detrás, en el patio, al atardecer. Actualizar la fila de leishmaniosis en el §8 a «publicado» y, cuando se cierre el brief, en `direccion-visual-editorial.md`.

### P3. Menores

1. **Fecha de S7.** El §3 dice «la página no muestra la fecha». La página muestra «7·DIC·2024» bajo el titular, con autor Sergio Grandas Medina. La R1 (P3-5) se equivocó. Escribir «7 de diciembre de 2024».
2. **Ley 670, art. 4.** El §3 (S13) mantiene «notas de jurisprudencia y vigencia que no se revisaron». Las abrí: los apartes del art. 4 se declararon **exequibles** (C-790-02), y la nota general de la ley remite a su modificación por la Ley 2224. No cambia lo que el brief afirma. Sustituir la frase por «declarado exequible (C-790-02); no detallar categorías, que la Ley 2224 redefine en su art. 4».
3. **Base de los porcentajes de S8.** El subtítulo de la nota une el 74 % a «los casos» de las dos noches, pero el cuerpo habla de «respuestas» y de localidades que «siguen siendo… acumulando», y el formulario lleva 730. En H2-1, escribir «según la nota» sin afirmar que los porcentajes sean de los 115.
4. **«No es una denuncia» (FAQ Bogotá).** La frase es de la encuesta de 2024 (S7). Aplicarla al formulario de 2025 es una inferencia. Escribir «el IDPYBA aclaró en 2024 que su encuesta no constituye una denuncia» o comprobar si el formulario de 2026 lo dice.
5. **Presupuesto interno.** Los H3 no suman el objetivo del H2 en H2-3 (420 frente a 450) ni en H2-6 (430 frente a 480). Las 8 FAQ borrador ya suman 452 palabras entre preguntas y respuestas, frente a ≈416 presupuestadas, lo que deja la conclusión en unas 536 frente a 500. Todo está dentro del ±10 %, pero el redactor no sabe dónde van las 50 palabras del H2-6. La suma total de 5.700 es correcta.
6. **Calor generalizado.** El H2-3 y la FAQ del ventilador dicen que «buena parte de la región está en verano o en temporada calurosa». En diciembre, Bogotá (fuente principal del artículo), Ciudad de México, Quito o las tierras altas de Centroamérica tienen noches frescas. Añadir: «en zonas altas, que no pase frío: una frazada más».
7. **«Brava con la gente de la calle».** El archivo dice «muy brava: si salía a la calle podía morder a alguien». El H2-2 y el §9.4 lo reducen a «brava con la gente de la calle». Mantener «muy brava; si salía a la calle podía morder a alguien».
8. **Luna sin contexto.** «Luna no se asusta solo con la pólvora» puede hacer pensar que es una perra miedosa, cuando el archivo dice que «ha sido siempre muy calmada». Añadir media frase («aunque suele estar tranquila») como contexto mínimo, sin repetir la escena de España.
9. **Laguna 2 sin documentar.** «Búsqueda del 2026-10-26» no dice dónde ni con qué términos. Añadir las bases y los términos (por ejemplo, PubMed: «noise fear/fireworks AND recumbent/non-ambulatory dogs»).
10. **Imagen 3, fórmula de exclusión.** El §8 exige que cada prompt incluya «sin texto, letras ni marcas». El de la imagen 3 solo excluye «texto legible». Añadir «letras ni marcas».
11. **Imagen 2, mano del tutor.** El tutor está de espaldas a la derecha del encuadre y extiende la mano **derecha** hacia el perro, que está en el centro. Tendría que cruzar el brazo por delante del cuerpo. Pedir la mano izquierda o colocar al tutor a la izquierda.
12. **«No es mañas» (`AlertBox` info).** Falla la concordancia. Escribir «No son mañas ni falta de carácter».
13. **Afirmaciones de comparación.** La decisión 1 y el §10 dicen que la comparación de H3 y FAQ está «en §2 y §9.5». En realidad, el §9.5 es una tarea para el auditor del artículo, y el §2 compara temas, no H3. Escribir «comparación de temas en §2; tabla de H3 y FAQ pendiente en §9.5». Además, añadir a las lagunas que la legalidad y la regulación del CBD varían por país y no se han verificado.

## Verificación de fuentes

| Fuente | Identificador / URL | Resultado (2026-10-26) | Afirmaciones del brief frente al documento |
|---|---|---|---|
| S1 Salonen 2020 | DOI 10.1038/s41598-020-59837-z · PMID 32139728 | Verificada en R1; sin afirmaciones nuevas | Igual que en España. |
| S2 Gähwiler 2020 | PMC7525486 | Verificada en R1 | El H2-4 solo usa orejas, jadeo y movimiento: correcto. Ya no usa «la mayoría ni se escondía». |
| S3 Lopes Fagundes 2018 | DOI 10.3389/fvets.2018.00017 · PMID 29487858 | Verificada en R1 | Sin cambios. |
| S4 Riemer 2020 | DOI 10.1016/j.jveb.2020.04.005 (verificación parcial, marcada) | Verificada en R1 | 70 % (N = 694) y 55 % (N = 377), ya separados. Su uso en el H2-4 es una extrapolación (P1-1). |
| S5 ESVCE 2026 | PDF v2.1 | Verificada en R1 | Sin cambios. |
| S6 Riemer 2019 | PMC6730926 | **Verificada hoy** | «increase… in the healthy dogs until ten years, but a decrease in dogs 11 years or older»; «with health problems… until the age of eight… decreased in dogs nine years and older»; la pérdida de oído como explicación: literal. |
| S7 IDPYBA 2024 | bogota.gov.co/…/en-bogota-van-1900-… | **Verificada** | 1.901 (702 de compañía y 1.199 silvestres), «presuntamente afectados», «no constituye una denuncia», seis recomendaciones (incluidas feromonas y esencias florales): literal. La fecha **sí aparece**: 7·DIC·2024 (P3-1). |
| S8 Bogotá 2025 | bogota.gov.co/en/node/282673 | **Verificada** | 115 reportes, 74 %, 23 % (gatos y aves silvestres), 31 %, 21 %, 18 %, 7 de diciembre, 730, «La Pólvora Explota Mis Sentidos»: literal. La base de los porcentajes es ambigua (P3-3). |
| S9 COLVET / El Delfino | delfino.cr/2024/12/… | **Verificada, con atribución imprecisa** | Paseo y olfato, cueva (que menciona expresamente «debajo de una… mesa»), frazadas aislantes ante «ruidos, luces y destellos», música, placa, consulta según edad y temperamento (Dra. Coto): literal. CBD: «solo… bajo indicación» es de la nota; «recurso» y «no recomendable… hepáticos» son del Dr. Meza (P2-2). La nota no desaconseja el CBD: el brief lo respeta. |
| S10 COLVET / Teletica | teletica.com/…_325734 | **Verificada** | «el pánico que puede generar problemas cardíacos, en control de esfínteres o actitudes agresivas» (cita del Colegio, referida a perros, gatos y equinos): respalda el H2-7 y la FAQ de la orina. «Acepromaciona… solo actúa sobre la función motora», cueva, cortinas, masticables, «Reconforte y vigile», collar y horarios: literal. «Infartos» y «problemas cardíacos» se descartan con razón. |
| S11 FMVZ-UNAM / N+ | nmas.com.mx/… (14-12-2024) | **Verificada** | La lista se atribuye en la nota a la FMVZ-UNAM («emitió una lista de consejos»): «nunca lo dejes en áreas abiertas como terrazas o patios», música o TV, calma, no fomentar, «podrían querer jugar con pirotecnia», consultar: literal. La «parálisis» es de la UAS y se descarta con razón. |
| S12 Chile, Ley 21.310 | Diario Oficial 42.871 | **Verificada** | Art. 14 E («sin la competente autorización, accionare, activare o disparare»), remisión a la letra f) del art. 2 y derogación del art. 2 de la Ley 19.680: literal. El límite sobre la letra f) está bien declarado. |
| S13 Colombia, Ley 670/2001 | secretariasenado…/ley_0670_2001.html | **Verificada** | Art. 4 («podrán permitir»), art. 7 y art. 15 modificado por la Ley 2224: literal. Vigencia del art. 4: exequible (P3-2). |
| S14 Colombia, Ley 2224/2022 | secretariasenado…/ley_2224_2022.html | **Verificada** | Art. 1 (objeto: regulación del uso, la fabricación, la venta y la compra para proteger los derechos de los habitantes, en especial de los niños), art. 2 (reglamentación en seis meses; sanciones de 1 a 200 SMMLV), art. 8 (nuevo art. 15 de la Ley 670) y art. 9 («sobre los seres humanos, sobre los animales y el medio ambiente»): literal. Nota de vigencia del art. 2: la Corte se declaró inhibida (C-166-23), sin efecto. Que la reglamentación no se haya verificado está bien declarado. |

No hay identificadores inventados ni mal asignados. Las verificaciones parciales (S4, S9-S11 como prensa) están marcadas con honestidad.

## Comprobaciones mecánicas

| Control | Resultado |
|---|---|
| seoTitle | 55 caracteres (Python). Cumple, en el límite. Idéntico en la tabla y en el YAML. |
| metaDescription | 156 caracteres. Cumple. Idéntica en la tabla y en el YAML. |
| `pilar` / `heroImageCaption` | `salud-mental-emocional-perros` está en el enum; `heroImageCaption` es opcional en `content.config.ts`. |
| «Petardos» | No aparece en H1, slug, seoTitle, meta ni H2. |
| Suma de targets | 320 + 510 + 560 + 450 + 520 + 520 + 480 + 460 + 360 + 420 + 600 + 500 = **5.700**, igual al objetivo. Cuadre interno en P3-5. |
| Matriz fuente→H2 | Idéntica en §3, línea de matriz, `*Sustentado en:*` y §9.2. Uso real en cada H2 = asignación (sin fuentes fuera de matriz ni decorativas). |
| Enlaces internos | Los 13 destinos existen: 10 artículos con `pilar` coherente y estado publicado (por defecto en dos), los pilares de salud mental y de paliativos (`[pilar].astro`) y `calculadora-calidad-vida-perros.astro`. LA-01 figura como `[~]` en el inventario. |
| AlertBox | `info` (introducción), `warning` (H2-5, manejo), `danger` (H2-7, urgencia). Correcto. |
| FAQ | 8 preguntas; respuestas de 42 a 48 palabras (rango 40-55). Ninguna es paráfrasis de las 8 de España. |
| Voz | `tono.py` sobre FAQ y avisos: 0 muletillas en 578 palabras. Tuteo y «ustedes»; sin voseo ni «vosotros». «Piso» solo como suelo o planta. Remite a la guía de voz (enlace relativo correcto). |
| Prompts | Misma ficha de mestizo en las 3; bloque de edad completo con los cinco rasgos y postura según la escena; línea de rechazo a tamaño móvil en las 3; aceptación a 390 px en la ficha. Geometría: P2-3 y P3-11. |
| Prosa terminada | No hay; solo FAQ y avisos en borrador, que están permitidos. |

## H2-4 («Si tu perro ya no puede levantarse»): valoración pedida

- **Criterio editorial declarado:** sí. La laguna 2 está en §3 y debe declararse en el texto; el origen (propuesta del propietario) está en el §2. Falta documentar la búsqueda (P3-9).
- **Caso del compañero:** bien protegido. Sin permiso y sin hechos dictados no aparece, ni de forma anónima (§2, §6 y §9.4).
- **Eutanasia:** no se abre. El cierre remite a hablar de su calidad de vida con la veterinaria, con enlace a la calculadora y al pilar de paliativos, y prohíbe mencionar la decisión. Es correcto y coherente con la skill (calculadora en temas de paliativos).
- **Enlaces:** úlceras (cambios de postura), cama ortopédica, paliativos y calculadora: existen y vienen al caso. Falta `alimentacion-perros-mayores-sin-dientes` para la aspiración (P1-1).
- **Seguridad:** **no suficiente** (P1-1).
- **Imagen:** decidir no poner ninguna está bien razonado (no inventar enfermedad en el sujeto fijo).

## Efecto cascada

- No hay artículo redactado (`src/content/blog/miedo-polvora-perros-mayores.mdx` no existe), así que nada se ha propagado.
- Ningún otro brief ni artículo cita S8, S9, S10 ni S14.
- **Corrección a la R1:** su P3-5 afirmó que S7 no mostraba fecha, y no es cierto. Si otro documento copió esa nota, conviene revisarlo.
- Si cambia la imagen 3 o la raza, hay que actualizar la fila de LA-01 en el registro de `direccion-visual-editorial.md`, y la de leishmaniosis debe figurar como publicada.

## Lo que sí funciona

- S14 está bien leída y bien limitada: menciona a los animales solo en la pedagogía del art. 9, no habla de prohibición y no presenta como expedida una reglamentación que no se ha verificado. No hay que ampliarla.
- Las exclusiones de S10 («infartos», «problemas cardíacos») y de S11 (cifras de audición, 20 %, «parálisis» de la UAS) son correctas. No hay que recuperarlas.
- Los testimonios ya no repiten hechos publicados. Osa y Baltor conservan su incertidumbre. Dakota no aparece.
- El esqueleto propio funciona (patio, perro postrado, casa llena, portón, ley por país), y las 8 FAQ son nuevas de verdad.
- La matriz fuente→H2 es exacta y no hay fuentes decorativas.
- Las excepciones están declaradas (raza, tarjeta de versiones, caso del compañero) y pendientes del propietario, no decididas en silencio.
- El enlace entre versiones (A + B, C con datos) no requiere escribir HTML a mano.

## Qué corregir, en orden (para otra sesión)

1. **P1-1:** reescribir las instrucciones del H2-4 sobre agua y comida (de pecho, poca cantidad, vigilado; sin masticable o solo el habitual) y sobre cómo moverlo (técnica enseñada por la veterinaria, otra persona o manta, sin arrastrarlo, riesgo de mordisco). Añadir la excepción a la regla 9 del §9.7, el enlace a `alimentacion-perros-mayores-sin-dientes` en el §5.1 y ajustar la FAQ 3.
2. **P2-1:** renombrar `Cómo averiguarlo donde vives`. Reducir `Los días después` a una remisión y usar el espacio en algo propio. Reescribir `Dónde buscar en el barrio` y los dos `AlertBox` sin 6 palabras seguidas en común con España. Corregir la afirmación de `correccion-r1.md` en la siguiente nota de corrección.
3. **P2-2:** atribuir las condiciones del CBD al Dr. Meza dentro del comunicado del COLVET, y en la FAQ escribir «no es recomendable».
4. **P2-3:** rehacer la geometría de la portada (abertura hacia la mujer o mujer visible por el frente).
5. **P2-4:** cambiar el concepto de la imagen 3 y poner la leishmaniosis como publicada en el registro.
6. **P3:** los 13 ajustes de la lista.
7. Registrar la R2 en el «Historial de auditoría» del brief y pedir la **R3, que es la última**, a otra sesión. Si falla, detenerse y revisarlo con el propietario.
