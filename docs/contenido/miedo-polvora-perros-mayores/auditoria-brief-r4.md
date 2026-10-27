# Auditoría independiente del brief LA-01 · Ronda R4

- **Documento auditado:** `briefings/briefing-miedo-polvora-perros-mayores.md` (v5.1 del 2026-10-27), commit `08600dd`, blob `2ad31c4b107ad12c2e1c06ec19d70ffba9b89ea7`.
- **Rama:** `claude/brief-miedo-polvora-perros-mayores-latam`.
- **Ronda:** R4. El propietario autorizó el 2026-10-27 tres rondas más (R4–R6) después de la R3. La numeración sigue la misma serie; no se reinicia.
- **Fecha:** 2026-10-27.
- **Método:** skill `auditar-briefing-contenido` (con `references/formato-informe.md`). Como norma uso `calidad-editorial-adsense.md`, `guia-voz-tono.md`, `direccion-visual-editorial.md`, `apoyos-visuales-responsive.md` y `generar-briefing-contenido`. No generé ni corregí este brief y no hice las rondas R1 a R3. Solo he escrito este informe.
- **Alcance:**
  - **Cambios desde la v4:** diff `f34b9de..08600dd` del brief, del archivo de testimonios, de `direccion-visual-editorial.md` y de `TODO.md`.
  - **Testimonios:** comparé cada hecho nuevo, línea a línea, con `docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md` y con `src/content/blog/miedo-petardos-perros-mayores.mdx`.
  - **Fotografías originales:** las abrí y las miré. Comprobé el EXIF con PIL (0 etiquetas en las dos), las dimensiones y el contenido.
  - **Imágenes ya publicadas:** revisé los alt y los `heroImageAlt` de `src/content/blog/` y abrí la portada de vacunas.
  - **Firma y política editorial:** leí `ArticleByline.astro` y `politica-editorial.astro`.
  - **Conteos con Python:** metadatos, suma de targets, H3 por H2 y matriz fuente→H2. Enlaces internos comprobados contra `src/content/blog/` y `src/pages/`.
  - **Coincidencias con España:** n-gramas de 6 y de 5 palabras entre los alt y pies nuevos y el `.mdx` de España.
  - **Fuentes:** reabrí solo S9, porque la imagen 3 y la anécdota del H2-3 se apoyan en ella. S1–S8 y S10–S14 no tienen afirmaciones cambiadas desde la R3; el diff lo confirma.

## Veredicto

**APTO con reservas** (válido con reservas para redacción): no hay P0 ni P1. Los hechos nuevos coinciden con el archivo de testimonios. Las reservas son cinco P2, todos internos del brief, que se corrigen sin abrir fuentes: contradicciones del contrato sobre Dakota y el H2-4, una identificación de la foto que se da por confirmada sin estarlo, la imagen 4, la geometría de la imagen 5 y el orden de publicación de la tarjeta.

Recuento: **0 P0 · 0 P1 · 5 P2 · 8 P3.**

## Comprobación de las reservas de la R3

| R3 | Estado en v5.1 | Evidencia |
|---|---|---|
| P2-1 Paralelos de H3 con España | **Sigue corregido** | Siguen en el brief `El cuarto sin ventana a la calle`, `Si este diciembre es el primero que lo pasa mal`, «Sin «comer antes»» (H2-6), los acuerdos de familia y visitas, y `Enero…` con el calendario del lector. Las seis filas están en §9.5. |
| P2-2 Cronología de las imágenes | **Sigue corregido** | La imagen 7 (portón) es a las 3:30 y la portada (entrada) a las 5:00, las dos del 24. En la portada el portón ya tiene el candado puesto, así que el orden es coherente. |
| P3-1 «Comer antes» | Corregido | H2-6. |
| P3-2 Lagunas | Corregido | Lagunas 1–9: CBD es la 8 y el H2-10 remite a la «laguna 8». |
| P3-3 Luna | Corregido | «Busca a la familia», como mucho media frase. |
| P3-4 H2-4 y FAQ 3 | Corregido | El traslado se hace una sola vez y de día, y los cambios de postura siguen la pauta. La FAQ 3 dice «poca agua», «con él incorporado de pecho» y «si tose, para». |
| P3-5 Aviso `warning` | Corregido | Ya no dice «cualquier fármaco». |
| P3-6 Manos, portón y mirada | Corregido y adaptado | Las imágenes 1, 2, 4 y 7 piden «mano anatómica, cinco dedos». El punto de vista del portón está precisado. «Mirada atenta, algo tensa» pasó a la imagen 3 (miedo), y la portada, ahora una entrada tranquila, lleva «mirada serena». Es coherente con cada escena. |
| P3-7 Fecha de la leishmaniosis | Corregido | 2026-10-24 en el §8 y en el registro. |
| P3-8 Tarjeta «pendiente» | Superado | El propietario decidió el 2026-10-27. |

## Hallazgos

### P0 / P1

Ninguno.

### P2. Corregir antes de redactar

**P2-1. El contrato se contradice sobre Dakota y sobre el caso del H2-4.**
- *Ubicación:*
  - Dakota: decisión 3 (l. 11, «**Dakota no aparece**»), §2 (l. 57 y 63, «No se usan: Dakota»), §9.4 (l. 614, «Dakota… no aparecen») frente a §8, imagen 6, y §9.3 (l. 604), que exigen su foto con el pie «…y Dakota, junto al sillón…».
  - H2-4: decisión 4 (l. 12, «Si un compañero… autoriza contar el caso de su perro, entra como testimonio aportado»), H2-4 *Origen* (l. 324) y §9.4 (l. 615, «H2-4 sin caso salvo testimonio autorizado y dictado») frente a §2 (l. 65, «Ese perro **no aparece en el artículo, ni anónimo**») y §11 («[x] H2-4 sin caso»).
- *Evidencia:* el auditor del artículo tendrá que marcar como incumplida la casilla del §9.4 sobre Dakota o la del §9.3. En el H2-4 hay dos reglas vigentes a la vez. Además, ahora existe otro testimonio autorizado del mismo compañero, el de su perra bajo el escritorio, y la cláusula «salvo testimonio autorizado» puede leerse como permiso para relacionarlo con el H2-4. El archivo lo prohíbe expresamente (l. 111).
- *Corrección:*
  1. Decisión 3, §2 y §9.4: «Dakota aparece **solo en la fotografía y en su pie, sin ningún hecho**; sus hechos ya están publicados en España».
  2. Decisión 4, H2-4 *Origen* y §9.4: «H2-4 sin caso (decisión del 2026-10-26). La perra del compañero va solo en el H2-3 y no se relaciona con el H2-4».

**P2-2. La identificación de Luna y Dakota en la foto se marca como hecha, pero es una deducción pendiente de confirmar.**
- *Ubicación:* §11, «[x] Identificación de Luna y Dakota en la foto (2026-10-27)»; §8, imagen 6, «**Luna es** la tricolor echada en la cama…»; §8, l. 516, «beagles tricolores».
- *Evidencia:*
  - El archivo de testimonios (l. 29) dice: «por esa descripción, Luna **sería** la tricolor… quien prepare la imagen lo confirma con el propietario si duda». `TODO.md` mantiene abierta la tarea «[ ] Confirmar cuál de las beagles de la foto es Luna y cuál Dakota».
  - La foto deja la duda: la beagle de la cama es la más tricolor, pero enroscada parece la más voluminosa. La del suelo es blanca con manchas negras y la cabeza de un tostado pálido.
  - El criterio del propietario es «Luna es la de tres colores». Si el §8 llama «tricolores» a las dos, se anula el único rasgo que las distingue.
  - Un nombre cambiado en el pie sería un hecho alterado en una fotografía real.
- *Corrección:* en el §11, desmarcar la casilla y convertirla en gate: «Identificación de Luna y Dakota confirmada **por el propietario** antes de publicar el pie». En el §8, escribir «según la descripción del propietario, Luna **sería**…» y sustituir «beagles tricolores» por «beagles de la familia (Luna, la tricolor y más delgada; Dakota, la más gordita)».

**P2-3. La imagen 4 repite el concepto de una portada publicada.**
- *Ubicación:* §8, imagen 4, «La lista para la consulta», y el párrafo «Conceptos distintos de España… y de la portada de leishmaniosis».
- *Evidencia:* la portada de `vacunas-desparasitacion-perros-senior` (`vacunacion-perro-senior-veterinario.webp`, alt «Ilustración de una veterinaria conversando con el cuidador de un perro senior») muestra a un mestizo senior sentado junto a una tutora de unos 55-60 años con jersey celeste y a una veterinaria que sostiene un cuadernillo, en una conversación sin exploración. El prompt 4 pide un mestizo senior sentado, una tutora de unos 50 años con blusa **celeste** que lee una libreta y una veterinaria que escucha, también sin exploración. Es la misma composición y la misma paleta. La lista de conceptos que el brief declara como ya usados no incluye esta portada.
- *Por qué importa:* la dirección visual pide no repetir conceptos publicados. El brief justificó la imagen 4 como «distinta de la consulta de España», pero no la comparó con las demás portadas.
- *Corrección:* añadir la portada de vacunas a la lista de conceptos usados y cambiar la escena. Por ejemplo, en casa, la noche de noviembre antes de la consulta: la tutora escribe la lista en la mesa de la cocina con el perro echado a sus pies, o el plano detalle de la libreta en la sala de espera con el perro junto a la silla. Si se mantiene el consultorio, cambiar la composición: veterinaria en primer término, de espaldas, tutora sin el celeste y el perro de perfil. Ajustar alt, pie y aceptación.

**P2-4. Imagen 5 (Baltor): la cámara no puede ver a la vez lo que piden el prompt, el alt y la aceptación.**
- *Ubicación:* §8, imagen 5, prompt («Cámara a la altura del perro desde el lado de la puerta, plano medio que encuadra la puerta abierta en el borde del cuadro y a Baltor al fondo»), alt («al fondo, la puerta del apartamento también abierta hacia la escalera») y aceptación («se ven la puerta de la habitación abierta, la del apartamento abierta al fondo y el perro en el rincón opuesto»).
- *Evidencia:* si la cámara está junto a la puerta y mira hacia el rincón, el pasillo y la puerta del apartamento quedan detrás o al costado de la cámara, nunca «al fondo». «Al fondo» sería, a la vez, el rincón de Baltor y el final del pasillo, que están en direcciones opuestas. Es el mismo tipo de fallo de geometría que se corrigió en la R2 (P2-3) y que llevó a rechazar la portada v1 de golpe de calor.
- *Corrección:* elegir una sola geometría y aplicarla al prompt, al alt y a la aceptación. Por ejemplo: «Cámara baja en el rincón opuesto, detrás y a un lado de Baltor (se ven su lomo, la melena y la oreja en primer término, nítidos); al otro lado de la habitación, la puerta abierta y, a través de ella, el pasillo iluminado que termina en la puerta del apartamento, abierta al rellano de la escalera». Con esa geometría el perro mira hacia la salida y no se mueve, que es el mensaje. Alt: «…echado en el rincón de una habitación, de espaldas a la cámara, mirando la puerta abierta; al fondo del pasillo, la puerta del apartamento también abierta».

**P2-5. La tarjeta de España puede enlazar a una página que todavía no existe.**
- *Ubicación:* §5.2, «Coste: un PR de código contra `main` con el componente y su uso en el `.mdx` de España…», y §4/§9.3 («solo si el componente ya está en `main` al redactar»).
- *Evidencia:* el brief da por hecho que el componente llega a `main` antes de redactar LA-01, y en el mismo PR pone la tarjeta en España apuntando a `miedo-polvora-perros-mayores`. `main` despliega a producción (AGENTS.md). Esa tarjeta rompería el build si el componente usa `getEntry` sin la entrada, o publicaría un enlace 404 si no la consulta. Un enlace a un artículo no publicado es el fallo que esta skill trata como P0 en el artículo.
- *Corrección:* escribir en el §5.2 el orden:
  1. El PR del componente solo añade el componente y, si se quiere probar, una tarjeta entre dos artículos ya publicados.
  2. La tarjeta de España hacia LA-01 entra **en el mismo PR que publica LA-01**, o después.
  3. El componente falla el build si `getEntry('blog', slug)` no devuelve una entrada publicada.
  4. Construye el `href` con `/${data.pilar}/${id}`, como hace `SiloNavigation.astro`.

### P3. Menores

1. **Estado y registros desactualizados.**
   - El «Estado» (l. 5) dice «sin R4» y «cuando el propietario resuelva las decisiones pendientes (raza, tarjeta, caso del compañero)», y las tres están resueltas.
   - La fila R3 del historial dice «**Última ronda; no hay R4.**».
   - El §10 dice «Raza… pendiente de aprobación» y «[x] Tres rondas de auditoría agotadas».
   - El título del §8 dice «3 PROMPTS», y son 7.
   - «Fecha brief 2026-10-26 (v4)».
   - Actualizar todo con la autorización R4–R6 y añadir la fila R4.
2. **Faltan fichas de aceptación (390 px) en las imágenes 1 y 7.** Las imágenes 2–5 las tienen. Es más grave en la portada, que muestra a una persona y un perro de frente, justo el tipo de escena del rechazo de golpe de calor. Añadir, por ejemplo: «perro de frente a la cámara, avanzando hacia la mano; tutor mirando al perro; cinco rasgos de edad; sin correa; cinco dedos» y, para la imagen 7: «candado cerrándose, placa visible, nadie toca al perro; cinco rasgos».
3. **Pie de la imagen 3: «Muchos perros eligen solos su cueva».** S9, reabierta hoy, dice «**Destine** una zona dentro de la casa que sirva de refugio o "cueva" (debajo de una cama, escritorio, mesa o sillón)». Es el tutor quien prepara la zona, y la frase no dice que «muchos» perros la elijan. El único apoyo es la anécdota. Escribir: «Algunos perros buscan solos un hueco bajo un mueble; si es dentro de casa y tiene la salida libre, puede ser su cueva». Además, la imagen va junto a la anécdota de una perra de edad desconocida y muestra a un macho senior de 12 años. Colocarla después de la «idea propia» de la mesa y no pegada a la frase del compañero, para que no se lea como un retrato de ella (archivo, l. 111).
4. **Alt y pie de la foto (imagen 6).**
   - «Cama ortopédica» es una afirmación sobre el producto que no está comprobada: el brief dice que la foto no se usa para recomendar esa cama. Escribir «sobre una cama gruesa».
   - El pie «nuestras beagles, en casa, en Costa Rica» parafrasea la l. 26 de España («Luna y Dakota, nuestras dos perras beagle, en Costa Rica»). Reformularlo.
   - En la foto se ve un gatito sobre la segunda cama, no «al fondo»: el alt fiel lo puede omitir, pero no debe contradecirlo.
5. **Continuidad de las personas.** El mismo mestizo aparece con un hombre de 35 años (1), una tutora de 50 con anteojos y blusa celeste (4) y una mujer de 55 con blusa lila y anillo (7). Dos mujeres de edad parecida y aspecto distinto se leerán como una incoherencia. Decidir si la 4 y la 7 son la misma tutora (misma edad, pelo y anteojos) o personas de la familia claramente distintas, y escribirlo en el §8.
6. **La excepción senior de Osa y Baltor está bien argumentada en el brief, pero no se ha llevado a la norma.** `direccion-visual-editorial.md` solo prevé la excepción de la leishmaniosis («no se aplica a otros artículos») y su registro nombra a Osa y Baltor sin decir que no son senior. Para que el auditor del artículo no la marque como P1, añadir a la norma una línea: «LA-01: perros de testimonios ilustrados como adultos maduros por fidelidad al archivo (2026-10-27)». En el brief, el pie podría decir «en esa época, adulta» si el redactor lo considera útil.
7. **§4, importaciones:** falta `import TarjetaRelacionada from '../../components/article/TarjetaRelacionada.astro';`, condicionada como la tarjeta.
8. **Testimonio del compañero:** el archivo dice que «no se le pidió permiso para publicarlo», y el uso lo autoriza el propietario. Va anónimo, sin datos que identifiquen al compañero y con procedencia documentada: cumple `calidad-editorial-adsense.md` §3. Por cortesía, conviene avisar al compañero antes de publicar. No bloquea.

## Fidelidad de los hechos nuevos (2026-10-27)

| Hecho en el brief | Archivo de testimonios | Resultado |
|---|---|---|
| Osa, mestiza de pastor alemán | l. 74 | Fiel |
| Osa, adulta madura, no senior; no «mayor» | l. 75 | Fiel; el prompt pide «sin canas», correcto |
| Escena de Osa: cena de noche, puerta abierta, bajo la mesa del comedor, sin fecha | l. 61 | Fiel; «casa de una planta», «tortillera» y «mantel de plástico» son ambientación, no hechos |
| Baltor, chow chow café claro | l. 95 («se ve como») | Fiel para la ilustración |
| Baltor, adulto maduro, no senior | l. 96 | Fiel |
| Apartamento de segundo piso, casa de cuatro apartamentos, escalera central a la calle; «la puerta de la casa» = la del apartamento | l. 97 | Fiel |
| La chow chow que llegó después no aparece | l. 93 | Correcto (color desconocido) |
| Perra del compañero: solo una se pone muy nerviosa; la dejan dentro; bajo el escritorio y ahí se queda; anónima; sin edad; sin relación con el H2-4 | l. 105-112 | Fiel |
| Identificación de Luna y Dakota en la foto | l. 29 («sería… si duda, se confirma») | **Se da por confirmada sin estarlo** (P2-2) |
| No repetir hechos de España | `.mdx` l. 26, 76, 103, 328-330 | Ningún hecho repetido. El pie de la foto parafrasea la l. 26 (P3-4). 0 n-gramas de 6 y 0 de 5 entre los alt y pies y España |

## Plan visual: revisión de los 7 apoyos

| # | Sujeto y edad | Geometría y manos | Seguridad | Alt/pie | Concepto frente a lo publicado | Resultado |
|---|---|---|---|---|---|---|
| 1 Portada | Mestizo, cinco rasgos, rechazo a 390 px | Tutor de espaldas a la derecha; su mano izquierda queda hacia el centro, donde está el perro. Perro hacia la cámara. Cinco dedos | Sin correa, sin jalar | Coherentes con el `heroImageAlt` y el `heroImageCaption` del YAML | Distinto (España: refugio en dormitorio) | Bien; falta la aceptación (P3-2) |
| 2 Osa | Adulta madura, «rechazar si cachorro o viejo» | Cámara a ras del suelo, Osa entera bajo la mesa, nadie la toca, cinco dedos | Sin jalar, regañar ni mojar | «Ilustración de un recuerdo» | Nuevo | Bien |
| 3 Escritorio | Mestizo, cinco rasgos con «mirada atenta» | De frente al hueco, salida libre | Sin cables a su alcance | Pie con una generalización (P3-3) | Nuevo | Bien con P3 |
| 4 Consulta | Mestizo, cinco rasgos | Correa floja, cinco dedos | Sin exploración | Coherentes | **Repite la portada de vacunas** | P2-3 |
| 5 Baltor | Adulto maduro | **Cámara imposible** | Sin charcos | Alt con la geometría imposible | Nuevo | P2-4 |
| 6 Foto | Real; sin EXIF (comprobado: 0 etiquetas; 2576 × 1449, ya en 16:9) | — | Sin personas | Pie con «Fotografía», como pide la política editorial. Identificación sin confirmar | — | P2-2, P3-4 |
| 7 Portón | Mestizo, cinco rasgos | El pulgar empuja el arco; cámara a lo largo del portón; nadie toca al perro | Portón cerrado | Coherentes | Distinto de la leishmaniosis (nadie toca el collar) | Bien; falta la aceptación (P3-2) |

- **Firma y foto:** `ArticleByline.astro` dice «Ilustraciones generadas con IA», y `politica-editorial.astro` lo explica: «salvo que su pie indique otra cosa, por ejemplo una fotografía aportada por el propietario». `calidad-editorial-adsense.md` (l. 28): «Solo una fotografía real necesita identificarse en su pie como tal». El pie que empieza con «Fotografía:» basta. No hace falta cambiar la firma.
- **Distribución:** las imágenes caen en la portada, el H2-2, el H2-3, el H2-5, el H2-7 (dos) y el H2-8. Entre la 5 y la 6 hay unas 340 palabras, con el `danger` detrás: es aceptable. El H2-9, el H2-10 y la conclusión (unas 1.520 palabras) no llevan imagen, pero la tabla del H2-9 rompe el texto. No lo marco como hallazgo.
- **Ubicación de la imagen 6:** la tabla dice «después de `### Luna y los temblores`» y el encabezado «al final del H2-7». Como `### Cuándo ir a urgencias` va detrás, «al final» es inexacto. Que quede «entre `Luna y los temblores` y `Cuándo ir a urgencias`».
- **Razas:** el mestizo está aprobado y registrado. Osa, Baltor y las beagles tienen el motivo admitido por la norma («el caso identifica la raza»). La excepción a la edad está declarada en el §8 (ver P3-6).

## Tarjeta horizontal (§5.2): valoración

- **Recíproca en los dos artículos:** es razonable. Son dos versiones de una guía para públicos distintos, y una tarjeta en cada sentido le dice a cada lector cuál es la suya. No es un intercambio artificial. Pasar más adelante a `hreflang` es-ES / es-419 es la medida correcta si Search Console muestra que las páginas se alternan.
- **Posición tras la introducción:** se puede defender, porque quien llega a la versión equivocada sale pronto. Tiene un coste de abandono para el lector correcto. El diseño sobrio, sin banderas y con una sola tarjeta lo limita.
- **HTML a mano:** el brief lo prohíbe expresamente (§4: «no se escribe HTML a mano») y el enlace en contexto del H2-9 va siempre. Cumple.
- **Técnico:** los tokens `brand-card` y `brand-border` existen (`src/styles/global.css`). El proyecto ya está en Astro 7 (`package.json`, `content.config.ts` con `glob`), y el `id` de entrada es el nombre del archivo, así que el prop `slug` funciona si se resuelve con `getEntry`. Falta el orden de publicación (P2-5) y la importación (P3-7).

## Verificación de fuentes

| Fuente | Identificador | Resultado en R4 | Nota |
|---|---|---|---|
| S1 Salonen 2020 | DOI 10.1038/s41598-020-59837-z · PMID 32139728 | Sin cambios desde la R3 (verificada en R1/R2) | Afirmaciones idénticas |
| S2 Gähwiler 2020 | PMC7525486 | Sin cambios | — |
| S3 Lopes Fagundes 2018 | DOI 10.3389/fvets.2018.00017 · PMID 29487858 | Sin cambios | — |
| S4 Riemer 2020 | DOI 10.1016/j.jveb.2020.04.005 (parcial, marcada) | Sin cambios | — |
| S5 ESVCE 2026 | PDF v2.1 | Sin cambios | — |
| S6 Riemer 2019 | PMC6730926 | Sin cambios | — |
| S7 IDPYBA 2024 | bogota.gov.co/… | Sin cambios (verificada en R3) | — |
| S8 Bogotá 2025 | bogota.gov.co/en/node/282673 | Sin cambios (R3) | — |
| S9 COLVET / El Delfino | delfino.cr/2024/12/… | **Reabierta hoy (HTTP 200, proxy con TLS)** | Literal: «Destine una zona dentro de la casa que sirva de refugio o "cueva" (debajo de una cama, escritorio, mesa o sillón)… frazadas que sirvan como aislante ante los ruidos, luces y destellos». Respalda el H2-3 y el «escritorio». No respalda «muchos perros eligen solos» (P3-3) |
| S10 COLVET / Teletica | teletica.com/…_325734 | Sin cambios (R3) | — |
| S11 FMVZ-UNAM / N+ | nmas.com.mx/… | Sin cambios (R3) | — |
| S12 Ley 21.310 | Diario Oficial 42.871 | Sin cambios (R3) | — |
| S13 Ley 670/2001 | secretariasenado… | Sin cambios (R3) | — |
| S14 Ley 2224/2022 | secretariasenado… | Sin cambios (R3) | — |

No hay identificadores nuevos. S1–S8 y S10–S14 no se volvieron a abrir porque ninguna afirmación suya cambió desde la R3, y el diff `f34b9de..08600dd` lo confirma.

## Comprobaciones mecánicas

| Control | Resultado |
|---|---|
| seoTitle | **55** caracteres (Python). Idéntico en la tabla y en el YAML |
| metaDescription | **156** |
| Frontmatter frente al §8 | `heroImage` = archivo de la imagen 1; `heroImageAlt` y `heroImageCaption` idénticos al alt y pie de la imagen 1. `pilar` válido |
| Suma de targets | 320 + 510 + 560 + 450 + 520 + 520 + 480 + 460 + 360 + 420 + 560 + 540 = **5.700** |
| H3 frente al H2 | H2-1 500/510; H2-5 460 + aviso 60; H2-7 400 + aviso 60; H2-9 220 + 150 + 40 = 410/420; el resto, exactos. Todo dentro del ±10 % |
| Matriz fuente→H2 | §3, línea de matriz del §6, `*Sustentado en:*` y §9.2: **idénticos** para S1–S14 |
| Enlaces internos | 11 artículos existen con `pilar` coherente (9 con `status: "Publicado"` y 2 con el valor por defecto); la calculadora existe; el pilar existe. LA-01 en `[~]` en el inventario (l. 284) |
| Componentes | `AlertBox`, `FAQ` y `article/TablaApilable` existen; `TarjetaRelacionada` no existe y está condicionada |
| Español neutro | Tú y ustedes. «Coger», «vosotros», «pienso» y «chapa» solo aparecen en la lista de lo que hay que evitar. «Ratón» y «escritorio» del §5.2 son especificación técnica, no texto para el lector |
| Voz | Alt y pies (335 palabras): sin muletillas a la vista. `tono.py` no admite archivos sin frontmatter; la FAQ y los avisos no cambiaron desde la R3 (0 muletillas) |

## Recursos prometidos

| Recurso | Ruta | Estado | Prueba o gate |
|---|---|---|---|
| 7 imágenes | Portada, H2-2, H2-3, H2-5, H2-7 ×2, H2-8 | Planificadas; la foto original está en el repo | Aceptación a 390 px (falta en la 1 y la 7); identificación de la foto confirmada por el propietario (P2-2) |
| Tarjeta horizontal | Tras la introducción, en los dos artículos | Decidida; el componente no existe | Orden de publicación (P2-5); móvil, modo oscuro, teclado y lector de pantalla; `npx astro build` |
| Tabla de leyes | H2-9 | Planificada | 390 px |
| Formulario de Bogotá 2026 y reglamentación de la Ley 2224 | FAQ y H2-9 | Gates declarados en el §11 | Antes de publicar |

## Efecto cascada

- El artículo `src/content/blog/miedo-polvora-perros-mayores.mdx` no existe: no hay nada propagado.
- **Artículo de España:** si se aplica el P2-5, la tarjeta hacia LA-01 entra con la publicación de LA-01 y no antes.
- **`direccion-visual-editorial.md`:** añadir la línea de la excepción de edad (P3-6). Si se cambia la imagen 4, no hace falta tocar el registro de razas.
- **`TODO.md`:** la tarea de confirmar a Luna y Dakota sigue abierta, y es correcto. La tarea «Decidir el enlace entre versiones A/B/C» sigue abierta aunque ya está decidida; cerrarla con fecha.
- **Auditor del artículo:** recibe este informe junto con el de la R3.

## Lo que sí funciona (no romper al corregir)

- **Fidelidad de los testimonios:** cada dato nuevo (aspecto, edad y vivienda de Osa y Baltor, y el compañero) está registrado con fecha en el archivo, y el brief no añade nada. Osa sigue sin «mayor», y su escena no muestra a nadie jalándola, regañándola ni mojándola.
- **Excepción de edad para Osa y Baltor:** es la decisión correcta. Pintarlos como senior contradiría el archivo («no se presenta como perro mayor»). Además, el brief cambió la línea de rechazo («cachorro o perro viejo») en lugar de saltársela.
- **Foto real:** guardada sin EXIF (comprobado), con la orden de no retocarla con IA, el pie con «Fotografía» y la coherencia con la política editorial.
- **H2-4 sin imagen**, con el motivo: no se inventa enfermedad en el sujeto fijo.
- **Cronología** de la imagen 7 (3:30) y la portada (5:00), con el candado ya puesto en la portada.
- **Tarjeta sin HTML a mano**, que lee los datos de la colección, y el enlace en contexto del H2-9 como garantía.
- Matriz, presupuesto, metadatos y enlaces, exactos.

## Qué corregir, en orden (para otra sesión)

1. **P2-1:** unificar Dakota («solo en la foto y su pie, sin hechos») en la decisión 3, el §2 y el §9.4. Unificar el H2-4 («sin caso; la perra del compañero va solo en el H2-3») en la decisión 4, el *Origen* del H2-4 y el §9.4.
2. **P2-2:** convertir la identificación de la foto en un gate pendiente de confirmar por el propietario (§11). En el §8, escribir «sería» y cambiar «beagles tricolores» como se indica.
3. **P2-3:** rediseñar la imagen 4 (escena en casa escribiendo la lista, o el consultorio con otra composición y otra paleta). Añadir la portada de vacunas a los conceptos usados. Ajustar alt, pie y aceptación.
4. **P2-4:** fijar una geometría posible para la imagen 5 (cámara en el rincón detrás de Baltor, mirando la puerta y el pasillo) y alinear con ella el prompt, el alt y la aceptación.
5. **P2-5:** escribir en el §5.2 el orden de publicación de la tarjeta, el fallo del build si falta la entrada y el `href` con `data.pilar`/`id`.
6. **P3-1 a P3-8:** estado e historial (añadir la fila R4); aceptación de las imágenes 1 y 7; pie de la imagen 3 y su posición; alt y pie de la foto; continuidad de las tutoras; excepción de edad en la norma; importación de la tarjeta; aviso de cortesía al compañero.
7. Corregidos los P2, el brief puede pasar a redacción sin R5, salvo que la corrección cambie fuentes o estructura. El auditor del artículo comprueba estos puntos en el `.mdx` y en las imágenes generadas.
