# Informe de auditoría R6 del brief `briefings/briefing-miedo-petardos-perros-mayores.md` (v6, commit 0d6dc99)

Auditor: agente independiente (sesión distinta de las anteriores). Fecha: 2026-10-25. Brief auditado: v6, commit 0d6dc99. Informe transcrito sin cambios de contenido. **Veredicto: APTO con reservas (0 P0, 0 P1, 2 P2, 15 P3). Última ronda autorizada por el propietario.**


Rama `claude/brief-miedo-petardos-perros-mayores`, 2026-10-25. No modifiqué ningún archivo del repositorio. Los temporales están en `/tmp/claude-0/-home-user-CuidaTuPerroViejo/eca6bf97-2eb5-5d3e-8ec3-082c2fd5e029/scratchpad/auditor6/`. Cada descarga va en su carpeta `dl_*` y todo el Python se ejecutó con `-I`.

## Veredicto: APTO con reservas

No hay P0 ni P1. Quedan 2 P2 anotables, que cambian lo que el redactor escribiría, y 15 P3 de pulido. Las 11 fuentes son reales y sus cifras coinciden con los documentos. La mecánica del contrato está limpia: volumen, matrices, conteos, enlaces y componentes. Los P2 son dos frases acotadas que se corrigen sin tocar estructura ni volumen. Recomiendo comprobarlos con `grep` y no abrir una R7; eso lo decide el propietario.

## 1. Estado de los hallazgos de R5

| R5 | Estado | Evidencia |
|---|---|---|
| N-1 (frases en boca del propietario) | **Resuelto** | L.246: «Si le duele o no, lo valora el veterinario (frase editorial, no del propietario)». L.339 termina en «Con Luna lo hago porque ella me busca. Es lo que vivimos con ella, no una explicación de por qué es tan tranquila». No quedan «no sabemos si le duele» ni «no atribuimos». |
| N-2 (archivo de testimonios editado sin confirmación) | **No resuelto** (P2-1) | R5 pidió confirmar con el propietario y no volver a editar el archivo. v6 lo editó otra vez (`git diff 1cf629a HEAD`) para añadir la cita «Era una vez casi me muerde la cara por andarla alzando», sin confirmación. |
| N-3 (S6 citada para lo que no dice) | **Resuelto**, con un residuo (P3-1) | L.322, 337 y 339 atribuyen a S10 lo de acercarse o esconderse y a S6 solo la zona segura de entrada y salida libres. La ficha de S10 (l.153) lleva la frase. Falta corregir §9.6.6 (l.535). |
| N-4 (`TablaApilable`) | **Resuelto** | Import en l.177 y regla en l.182. Casilla en l.511 y §11 (l.578). El componente existe (`src/components/article/TablaApilable.astro`, prop `label`). Uso real con `data-label` en `golpe-de-calor-perros-mayores.mdx` l.125 y 283. Ruta del import idéntica a la de ese artículo. |
| N-5 (promesa de artículos inexistentes) | **Resuelto** | L.82, 84 y 350 condicionan el enlace a que el artículo esté publicado. No queda «próximamente» ni «cuando exista». |
| N-6 (encuadre de la imagen 2) | **Resuelto en lo esencial** (P3-6) | Ficha y prompt coinciden: cámara a ≈45 cm, tutor cortado por el pecho. Sin barba, pelo ni «62 años». Quedan la bufanda, la focal y una frase de aceptación (P3-6). |

**R5, P3 por P3:**

| P3 de R5 | Estado |
|---|---|
| 1 (objetivo 5.500–5.800 en §9.1) | Resuelto (l.487). |
| 2 (cabecera de la tabla 2) | Resuelto (l.348). |
| 3 (salvedades en el primer H3 de H2-1) | Parcial. Aún hay dos: otros países (l.242) y oído más muestras pequeñas (l.241). La tercera pasó al segundo H3. |
| 4 (conteos de FAQ) | Parcial. La cabecera de la conclusión (l.388) y la nota de l.403 están bien: 450 palabras, 42–56 por respuesta. L.390 sigue diciendo «40–55 palabras… ≈440» (P3-2). |
| 5 (Luna «siempre calmada») | Resuelto (l.260). |
| 6 (voz) | Parcial: «nuestras dos perras» en l.222, pero «yo» y «recuerdo» siguen (P3-7). |
| 7 («la primera vez») | Resuelto (l.94, 516). |
| 8 («ante un susto cualquiera») | Resuelto (l.339). |
| 9 (S9: 114.1.B f/g/j; «mínimas») | Resuelto. |
| 10 (frase de los 17 años) | Resuelto (l.299). |
| 11 (FAQ 2 sin «ni lo muevas») | Resuelto. |
| 12 (imágenes) | Resuelto, salvo no aplicar lo de «la misma casa» y un alt de 190 caracteres. Ambos están declarados en `correccion-r5.md`. |
| 13 (estiramiento de H3) | No aplicado a propósito. Persiste, ver P3-12 y P3-13. |
| 14 (FAQ 6 abre con «Depende») | No aplicado a propósito, aceptable. |

**Testimonios, palabra por palabra contra `testimonios-propietario.md`:**

- **Luna** (beagle, 2015, desde los 5 meses): coincide.
- **Dakota** (beagle, 2014, desde los 8–9 años): coincide.
  - Salud (l.246): coincide con el archivo, l.38. No pone nombre al problema de columna.
  - «Con la pirotecnia ha sido muy tranquila, según nosotros»: coincide con l.33 y 36 del archivo.
- **«Luna ha sido siempre muy calmada ante la pirotecnia y otros ruidos» (l.260):** coincide con l.14 del archivo.
- **2025 (l.260):** coincide con l.14 y 35 del archivo, incluida la reunión familiar. «Algo nerviosas y muy alerta, pero tranquilas en casa con la familia, con películas puestas y la gente hablando» sale de dos entradas del archivo. Sin mes.
- **Perra vecina (l.261):** coincide con l.74–78 del archivo.
- **Luna se asusta (l.339):** «ante un susto cualquiera» respeta el límite del archivo (l.25). Coincide con l.18–19. Lo de «se calma» es percepción del propietario (l.19, «según él»).
- **Dakota alzar y voz (l.339):** coincide con l.34 y 36 del archivo. La cita «casi me muerde la cara» es P2-1.
- **Reparto:** cada hecho aparece en un solo H2.
  - Dakota (salud) solo en H2-1.
  - El episodio de 2025 y la perra vecina solo en H2-2.
  - Alzar y elevar la voz solo en H2-6.
  - Osa y Baltor no aparecen; «portón», «pólvora» y «alzar» solo en listas de evitar.
- **Entre H2-1, H2-2 y H2-6** no hay contradicción dura. Hay una tensión leve (P3-3).

## 2. Verificación de fuentes (abiertas hoy)

| Fuente | Qué abrí | Resultado |
|---|---|---|
| S1 Salonen 2020 | Texto completo (Europe PMC, PMC7058607) y Crossref | Verificada. «13,715 responses in 264 dog breeds». 32 % «highly fearful of at least one noise». Fuegos artificiales, subrasgo más frecuente, 26 %. «Prevalence of noise sensitivity increased with age, especially fear of thunder». DOI, volumen y artículo 2962 correctos. |
| S11 Riemer 2019 | Texto completo (PMC6730926) y Crossref | Verificada. N = 1225, con «527 English and 699 German» (suman 1.226; ver P3-14). España figura entre los países. Grupos de Facebook. 52 %. Sanos: sube hasta los 10 y baja desde los 11. Con problemas de salud: sube hasta los 8 y baja desde los 9. La pérdida de oído «most likely explains»; el brief dice «hipótesis», que es más prudente. «This effect did not appear to be strong». Recuperación: ≈75 % a la mañana siguiente, 10 % hasta un día, 12 % hasta una semana, >3 % semanas o meses. 45 % de inicio antes del año. |
| S5 Riemer 2020 | Resumen completo (Europe PMC, preprint) y Crossref del DOI 10.1016/j.jveb.2020.04.005 | Verificada en el resumen. Todas las cifras coinciden: N = 1225, solo Feed/Play asociado a mejoría, 69 % con N = 202, 27–35 % «not higher than… placebo», 44 % con N = 300, >70 % con N = 694, 69 % con N = 433, 55 % con N = 377. Además «Environmental modification» incluye refugio, persianas y música; «Interaction» incluye tocar y hablar; ninguno asociado a mejoría. Texto publicado no leído (limitación de acceso). |
| S6 ESVCE | PDF completo, 6 páginas (`pdftotext`; fecha de creación 25/06/2026) | Verificada. «Lacks anxiolytic properties»; el mal uso «can potentially increase sensitisation». Coincide con AVEC y AVEPA-GRETCA. Zona segura «previously positively conditioned, where the dog has the choice to freely come and go from». Tres principios activos con indicación EMA. «Drug choice should be individualised». Derivación al especialista. **Sobre acercarse a la persona: no dice nada.** Eso lo dice S10. El brief ya lo asigna bien, salvo §9.6.6. Contiene dosis y pautas, que el brief prohíbe copiar. |
| S7 Sileo | SPC británico (VMD, marzo de 2026, AN 03168/2024) y registro europeo | Verificada. 3.2 indicación. 3.3 contraindicado en trastornos cardiovasculares graves, ASA III–IV («e.g. end stage renal or liver failure») y sedación previa. 3.5 «over 17 years… has not been studied». 3.6 vómitos, sedación, incontinencia urinaria y mucosas pálidas, con nota 1 limitada al punto de aplicación. Registro: autorizado y disponible en España; autorizado el 10/06/2015. Ficha española no leída (gate declarado). |
| S8 Ley 7/2023 | BOE, texto íntegro (XML) | Verificada. 24.2.b, c, f, g («cuarenta y ocho horas») y h con el texto citado. 51.2 y 65.7 («se prohíbe el uso de animales en romerías y eventos feriados en los que se haga uso de elementos pirotécnicos»). «Pirot» aparece una vez; «petard» y «fuegos artificiales» no aparecen. |
| S9 RD 989/2015 | BOE, texto íntegro (XML) | Verificada. Art. 8.3.a: F3 y F4 «no perjudicial para la salud humana». Art. 121 (12/16/18). Art. 141.2 y 141.5. Art. 114.1.B: f edad mínima, g categoría, j «si procede, la distancia mínima de seguridad». ITC 2, apartado 2.5.A: 120 dB(A, imp) «a la distancia de seguridad», distancias 1/8/15 m con «si procede… inferior». F1 no incluye petardos. DA sexta: 8 y 10 años. |
| S10 El Español | Artículo (HTML) | Verificada. Ventanas y persianas, refugio «tranquilo, seguro y accesible», música o televisión, «si el contacto con la persona le tranquiliza, debe permitirse; si prefiere esconderse, conviene respetar su espacio», microchip y placa, no medicar sin indicación veterinaria. También pide a los ayuntamientos pensar en los animales censados (ver P3-10). La guía original no se localiza (declarado). |
| S2, S3, S4 | S2: ficha del repositorio de Bristol. S3 y S4: texto completo en Europe PMC. Crossref de los tres | Verificadas. S2: n = 3.897 y 383, casi la mitad frente a una cuarta parte, sin co-ocurrencia con separación, edad al alza. S3: 36 perros, puntuación 2 o más, 3 primeros minutos, perros con pérdida de oído excluidos, comité de Berna, d = 0,68 en el texto y 0,69 en el resumen, lamerse y bostezar no aumentan. S4: tabla 2 con 2 años 8 meses frente a 6 años 6 meses, 8 de 10 con generalización, «no attempt should be made to ascribe any statistical significance». |

**ES-06:** el enlace de Barcelona devuelve HTTP 404 hoy, como declara el brief.

No hay fallos confirmados de fuentes. Las limitaciones de acceso declaradas (texto publicado de S5, S2 completo, ficha española de S7, guía del Colegio) están cubiertas por gate. No hay efecto cascada nuevo. S5 y S11 comparten muestra, y el brief lo dice.

## 3. Hallazgos nuevos

### P0 y P1

Ninguno.

### P2

**P2-1. La cita «casi me muerde la cara» sigue sin trazabilidad.**
- **Ubicación:** brief l.339 y l.517 (§9.4); `testimonios-propietario.md` l.34.
- **Evidencia:**
  - La versión original del archivo (commit cca48b9) decía «casi le muerde la cara al alzarla», sin decir a quién.
  - v5 lo cambió a «al propietario… (dicho por él: «casi me muerde la cara»)».
  - v6 lo cambió otra vez, ahora a «(confirmado por el propio dictado… sesión del 2026-10-25: «Era una vez casi me muerde la cara por andarla alzando»)».
  - `correccion-r5.md` admite que «no es una confirmación nueva».
  - La fuente única de los hechos se ha reescrito dos veces para coincidir con el brief, contra la instrucción de R5. El archivo sigue afirmando que «no se añadió ningún dato».
  - El dictado original no está en el repositorio. No puedo decir que sea falso. El artefacto «Era una vez» parece de transcripción por voz, lo que hace verosímil que sea literal. Pero si el propietario no dijo que fue su cara, el artículo publicaría en primera persona un hecho falso.
- **Instrucción:**
  - Conservar la cita tal cual en el archivo, sin volver a editarlo.
  - Añadir a §9.4 y a §11 un gate: «antes de publicar, el propietario confirma con una línea que fue su propia cara».
  - Fórmula neutra si no confirma: «una vez casi acabó en mordisco al levantarla», que ya está en el límite del archivo (l.41). Si confirma, anotar «confirmado el AAAA-MM-DD».
  - No tocar el archivo para acomodarlo al brief.

**P2-2. «No fiable según S3» y «señales que no cuentan» sobrepasan lo que S3 dice.**
- **Ubicación:** brief l.264 («se lame los labios o bosteza (esto último, no fiable según S3)»), el título de H2-2 («señales que sí cuentan y señales que no») y §2 (e), l.74.
- **Evidencia:** S3 solo dice que lamerse los labios y bostezar «no aumentaron» en la noche de fuegos frente a la noche de control, con 36 perros, 3 minutos codificados y diferencias de grupo. No dice que sean señales poco fiables en un perro concreto. Su discusión afirma que los efectos en conductas sutiles «were more inconsistent». Así redactado, un tutor podría ignorar un bostezo o un relamido de su perro. Es el mismo tipo de salto (resultado de grupo a regla individual) que `calidad-editorial` §2 manda evitar. El brief ya dice en l.257 que son «diferencias de grupo».
- **Instrucción:**
  - L.264: sustituir por «(lamerse los labios y bostezar no aumentaron en la noche de fuegos en este estudio; no sirven para descartar miedo en tu perro)».
  - Título de H2-2 y §2 (e): «Cómo se ve el miedo: lo que midió el estudio y lo que no», o similar. Quitar «señales que no cuentan» y «no fiable».
  - Mantener el resto de la frase.

### P3 (pulido; ninguno impide redactar)

1. **P3-1 · §9.6.6 (l.535):** «S6 y S10 piden acompañar sin forzar». S6 no pide eso. Poner «S10 pide acompañar sin forzar; S6 pide una zona segura de entrada y salida libres».
2. **P3-2 · l.390:** cabecera de FAQ obsoleta («40–55 palabras… ≈440»). Medí 42–56 palabras por respuesta, 376 de respuestas más 74 de preguntas, 450 en total. Poner «42–56 palabras; ≈450 con las preguntas», como en l.403.
3. **P3-3 · Dakota, H2-1 (l.246) y H2-6 (l.339):**
   - «Con la pirotecnia ha sido muy tranquila» (H2-1) choca en el mismo artículo con «las dos algo nerviosas» (H2-2) y con «cuando pierde el control» (H2-6).
   - El archivo dice «en general ha sido muy tranquila» (l.36).
   - Instrucción: escribir «en general» en H2-1. En H2-6, decir que el archivo no dice qué provoca ese «perder el control» y no atribuirlo a la pirotecnia.
4. **P3-4 · «el año pasado (2025)» (l.259–260, 517):** el artículo es perenne y se leerá en 2027. Pedir «en 2025» en el texto. El archivo conserva «el año pasado (2025)» como dato de origen.
5. **P3-5 · l.76 (§2 (g)):** «una casa que se prepara» atribuye a la familia una preparación que el propietario no cuenta. Poner «una casa tranquila», como en l.57.
6. **P3-6 · Imagen 2:**
   - Focal 50 mm, cámara a 45 cm y tutor cortado por el pecho. Con la cámara pegada a la fachada y la perra a menos de 1 m, un 50 mm horizontal no llega al pecho. Con un objetivo de 28–35 mm y un ligero picado hacia arriba sí.
   - La bufanda se pide visible pero va en el cuello, por encima del corte. Poner «los extremos de la bufanda sobre el pecho» o quitarla.
   - La aceptación (l.455) dice «dos ramales que parten de la mano». El cabo parte de la mano y se bifurca cerca de la perra. Poner «un cabo que sale de la mano y se bifurca en dos ramales».
7. **P3-7 · Voz (l.213, 222, 261, 339):** «nuestras dos perras» y «recuerdo» en la misma frase, más «yo la cojo». Los tres artículos publicados con Luna y Dakota usan «nuestras» y declaran «aportada por el propietario del sitio» (`comida-casera`, `cama-ortopedica`). Pero §9.4 prohíbe «el propietario» en tercera persona. Decidir una convención, p. ej. declarar una vez la autoría de la anécdota y mantener «yo» solo para lo personal.
8. **P3-8 · «reventar» (l.260, 518):** «no se acostumbra a reventar mucha», «se revienta poco». Es uso centroamericano. Añadir «reventar» a la lista de evitar (l.92) y pedir «tirar» o «lanzar» petardos. En l.322, «manejar al animal» fuera de comillas choca con la propia lista de evitar «manejar». Entrecomillar la ley o usar «tratar».
9. **P3-9 · Historial:**
   - El encabezado (l.5) dice que «los P3 se corrigieron». Tres no se aplicaron (declarado en `correccion-r5.md`) y otros quedaron parciales. Decir «los P3 aplicables».
   - La línea 83 de `INVENTARIO_CONTENIDO.md` omite que R3 y R4 fueron NO APTO. El historial del brief sí está completo y es veraz.
10. **P3-10 · S10:** la ficha (l.153) no lista «pide a los ayuntamientos pensar en los animales censados», que H2-3 (l.287) sí usa. El artículo lo respalda de forma institucional, pero conviene añadirlo a la ficha. La FAQ 5 (l.397) debería decir «según la prensa» al atribuir al Colegio.
11. **P3-11 · «Consolar» (H2-6):** el H3 tiene target 140 y 212 palabras de notas, con 3 fuentes, 2 anécdotas y 3 avisos de «no es pauta». Pasar a ≈190 y quitar 50 a «Por la noche» (200, con 66 palabras de notas). Los totales de H2-6 se mantienen.
12. **P3-12 · H3 con poco material:** «Qué es y cómo funciona» (160 sobre 58 palabras de notas), «Si empiezas ahora» (120/42), «Un refugio accesible» (120/42), «Lo que debe mirar el veterinario» (160/48) y «Por la noche» (200/66). Dar 2–3 puntos concretos a cada uno o confiar en la salida «parar y consultar» (l.207). Con las notas actuales, el riesgo es el relleno.
13. **P3-13 · Primer H3 de H2-1:** aún contiene dos salvedades (l.241–242). Dejar «no hay estudio español» y pasar lo del oído y las muestras pequeñas al segundo H3.
14. **P3-14 · S11 (l.96, 159):** 527 + 699 = 1.226, frente a N = 1.225 de la propia fuente. No citar ambas cifras en el cuerpo; no hacen falta.
15. **P3-15 · Alt:** el alt de la portada mide 190 caracteres (frontmatter y §8, idénticos). Es más largo que lo habitual del sitio, pero es aceptable. Anotar solo si se quiere acortar.

## 4. Volumen (recalculado)

**Método:** conteo de tokens separados por espacios, sin símbolos Markdown, con H3 contados dentro de su cifra.

**Suma de targets:** 350 + 540 + 560 + 500 + 640 + 550 + 600 + 440 + 400 + 300 + 280 + 540 = **5.700**.

**Por sección, H3 + título H2 + aviso = target:**

| Sección | H3 | Título H2 | Aviso | Total | Target |
|---|---|---|---|---|---|
| Introducción | — | — | 50 | 300 + 50 | 350 |
| H2-1 | 530 | 10 | — | 540 | 540 |
| H2-2 | 500 | 10 | 50 | 560 | 560 |
| H2-3 | 490 | 10 | — | 500 | 500 |
| H2-4 | 575 | 10 | 55 | 640 | 640 |
| H2-5 | 540 | 10 | — | 550 | 550 |
| H2-6 | 590 | 10 | — | 600 | 600 |
| H2-7 | 430 | 10 | — | 440 | 440 |
| H2-8 | 390 | 10 | — | 400 | 400 |
| H2-9 | 290 | 10 | — | 300 | 300 |
| H2-10 | 270 | 10 | — | 280 | 280 |
| Conclusión | — | 4 | — | 4 + 86 + 450 | 540 |

**«Todo incluido»:** 4.605 (31 H3) + 300 (cuatro párrafos de la introducción) + 98 (los diez títulos H2 miden 98 palabras reales) + avisos + 540 (conclusión) = **5.686** con los borradores de los avisos (44 + 44 + 55 = 143) y **5.698** con los planificados (50 + 50 + 55).

**Lo medido:**
- El FAQ real suma 450 palabras (376 de respuestas más 74 de preguntas) y la conclusión cuadra a 540.
- Las notas de los H3 suman 3.086 palabras frente a 4.605 de target: expansión media 1,5×.
- Cinco H3 pasan de 2,8× (P3-12).

**Valoración:** 5.700 es alcanzable sin relleno en 26 de los 31 H3. Los cinco H3 débiles son ≈670 palabras de target. El suelo de 5.300 deja 400 de colchón y el techo de 6.000 deja 300 de margen. Una desviación del +8 % sobre 5.700 (como en leishmaniosis) rozaría el techo. Por eso el objetivo de redacción 5.500–5.800 en §6 y §9.1 es correcto.

Las cifras de volumen (5.300 / 5.700 / 6.000 / 5.500–5.800) son idénticas en la cabecera, §1, §6, §9.1, §10 y la lista de decisiones.

## 5. Prompts de imagen (coordenadas)

**Convención:** la cámara mira hacia el interior de la escena. Un perro que mira a la derecha del encuadre enseña su costado derecho.

- **Imagen 1.** Consistente.
  - La perra va de perfil mirando a la derecha. Su costado derecho y el ojo del antifaz quedan hacia la cámara.
  - La persiana a ≈3 m, los destellos a la derecha y la lámpara a la izquierda no se contradicen.
  - La mano entra por el borde inferior derecho, por delante del hocico y del lado de la cámara. No cruza el costado ni tapa el ojo. Se ven la mano y la muñeca con el puño, y el resto del antebrazo queda fuera. Es físicamente posible.
- **Imagen 2.** Tras el cambio de encuadre, la geometría sigue cuadrando.
  - La cámara está en la fachada mirando a la calzada. Ambos avanzan de izquierda a derecha, y la cámara ve su costado derecho.
  - La perra va en el lado de la fachada y más cerca de la cámara. El tutor va del lado de la calzada, que es la pauta segura.
  - La mano derecha del tutor queda del lado de la perra, visible por encima de ella. La correa floja en J, la chapa, el arnés y los dos mosquetones entran en el encuadre. La dirección de marcha se apoya en caderas, pasos y la mirada de la perra.
  - No quedan restos de barba, pelo ni edad del tutor. Restos menores: la bufanda, la focal y una frase de aceptación (P3-6).
- **Imagen 3.** Coherente.
  - La perra mira a la derecha. La tutora está frente a su cabeza, con una mano en el pecho y el premio en la otra.
  - La veterinaria está a la izquierda, en el lado de la mesa opuesto a la cámara y por detrás de los cuartos traseros. No tapa a la perra, y la mano bajo el vientre cae al lado lejano.
- **Cinco rasgos de edad y línea de rechazo:** el bloque íntegro aparece en los tres prompts (canas en hocico, cejas y párpados; ojos algo hundidos; lomo; postura natural; sin enfermedad). La línea «Rechazar si a tamaño móvil parece un adulto joven» aparece 5 veces: bloque, §8 y tres prompts. Misma raza, mismo sujeto, collar de nailon gris liso y chapa en las tres.
- **Registro de razas:** coincide con `direccion-visual-editorial.md` l.78–95 y con los `heroImageAlt` de `src/content/blog/`. El bodeguero no aparece en ningún otro sitio (`grep`). El motivo de no usar beagle está documentado.
- **Ficha completa:** las 12 filas están rellenas, con 5 detalles por imagen. Función, escenario, acción, encuadre, luz, exclusiones y aceptación son coherentes con prompt, alt y pie. El alt del frontmatter es idéntico al de la imagen 1 (comparado por script).
- **Escena segura y exclusiones:** correctas.

## 6. Lo que sí comprobé y está bien

- **Metadatos, medidos con Python:** `seoTitle` = 44 caracteres, `metaDescription` = 154, alt de portada = 190.
- **Frontmatter y rutas:**
  - El frontmatter solo usa claves que acepta `z.strictObject`.
  - `pilar` es válido en el enum.
  - Los slugs de imagen no llevan ñ ni espacios.
  - Hay placeholder de fecha con gate.
- **Matrices fuente→H2:**
  - Compré cada «Sustentado en:» con la matriz de §6, las líneas `*H2:*` de §3 y la tabla de §9.2: 11/11 idénticas.
  - Cada fuente aparece citada por su nombre en el cuerpo de sus H2.
- **Enlazado:** los 9 enlaces internos existen en `src/content/blog/`, con su `pilar` y su estado, y figuran en `INVENTARIO_CONTENIDO.md`.
  - Pilar: `/salud-mental-emocional-perros` (existe en `src/content/pilares`).
  - Spokes: ansiedad por separación, disfunción cognitiva y agresividad tardía (publicados).
  - Cruzados: chequeo geriátrico, cómo dar medicación, incontinencia urinaria, cama ortopédica y prevención de caídas (publicados).
  - Opcional: golpe de calor, solo en H2-3.
  - La calculadora se omite con motivo documentado.
  - Sin canibalización: no existe ningún artículo ni brief sobre petardos. Los vecinos (P1-14, P1-29, P1-25, P1-15) están declarados.
  - Coordinación con el brief de feromonas y con el artículo de ansiedad por separación: la frase «moderada solo en miedo a tormentas» está en la l.340 de ese artículo, y la tabla 2 y la FAQ 4 no la contradicen.
- **Componentes:** 3 `AlertBox` (info en la introducción, danger en H2-2, warning en H2-4; 44, 44 y 55 palabras), 1 `FAQ` de 8 preguntas, 2 tablas en `TablaApilable` y 3 imágenes. Todo coincide entre §4, §6, §9.3 y §11.
- **Seguridad clínica y política editorial:**
  - Sin dosis, plazos de inicio, marcas ni porcentajes por fármaco.
  - La política (`politica-editorial.astro` l.55) dice «no prescribimos fármacos ni dosis», y el brief la respeta.
  - Los 15 requisitos de §9.6 están presentes y reflejados en el cuerpo planificado.
  - Coger en brazos y elevar la voz van como vivencia con su riesgo dicho (§9.6.14–15).
  - Las señales de urgencia viven junto a la lista, en el `AlertBox` danger.
- **Español de España:** sin voseo ni usted. El voseo y los americanismos (`vos`, `tenés`, `carro`, `celular`, `pólvora`, `alzar`, `portón`) solo aparecen en listas de evitar o en la prohibición. Formato con coma decimal y espacio antes de `%`. Residuos: P3-8.
- **Historial:** R1 (0/6/9), R2 (0/4/12), R3 (0/1/9), R4 (0/1/10/9) y R5 (0/0/6/14) coinciden con sus informes. Los commits cuadran: `fa88f47`, `bcf6483`, `32dfe74`, `0d6dc99` y compañía. `git log` no muestra rondas ocultas. El inventario está en `[~] (En Briefing)` y menciona R6 pendiente.
- **Sin texto duplicado:** ninguna corrección se aplicó dos veces. Busqué frases repetidas y líneas duplicadas; solo repiten el bloque de edad por diseño y una cifra de S11 en su ficha y en H2-1.
- **Límite brief vs. redacción:** los H3 dan instrucciones y puntos clave. El único texto terminado son los `items` del FAQ, los borradores de `AlertBox` y la declaración de procedencia.

**Comprobaciones por `grep` tras aplicar las correcciones:**
- «no fiable según S3» y «S6 y S10 piden acompañar» no deben aparecer.
- «≈440» no debe aparecer.
- «una casa que se prepara» no debe aparecer.
- «reventar» solo en listas de evitar.
- «confirmado» o el gate debe estar en §9.4 y §11.

## 7. Límites de la auditoría

- No pude contrastar los testimonios con el dictado original, solo con el archivo del repositorio (P2-1).
- La autorización del propietario para las rondas R4 a R6 es la que declara el brief (l.5). `calidad-editorial` §6 fija máximo tres. No pude verificar esa autorización.
- No leí el texto publicado de S5, el texto completo de S2, la ficha española de S7 (el PDF español del registro europeo es una imagen), ni la guía original del Colegio de Málaga. Son limitaciones de acceso ya declaradas, no fallos del brief.
- No verifiqué ordenanzas ni bandos, ni la disponibilidad en España de imepitoína y tasipimidina.
- No generé imágenes. La coherencia espacial de las tres escenas es un juicio razonado sobre el texto. La imposibilidad de la focal 50 mm es de optica elemental, no de una prueba generativa.
- No ejecuté `tono.py` ni `npm run build`, porque el brief no es un `.mdx`.
- Mis recuentos por H3 y de expansión son aproximados (separación por espacios).
- No verifiqué las cifras de redacción de los artículos de golpe de calor (4.575) y leishmaniosis (5.134) que cita la cabecera. Un recuento rápido mío de ambos `.mdx` sin FAQ ni avisos dio 3.962 y 4.316.

**Archivos relevantes (rutas absolutas):**
- `/home/user/CuidaTuPerroViejo/briefings/briefing-miedo-petardos-perros-mayores.md` (l.5, 74, 76, 92, 94, 153, 213, 222, 241, 246, 260, 264, 287, 322, 339, 390, 397, 455, 469, 517–518, 535)
- `/home/user/CuidaTuPerroViejo/docs/contenido/miedo-petardos-perros-mayores/testimonios-propietario.md` (l.14, 34, 36, 41)
- `/home/user/CuidaTuPerroViejo/docs/contenido/miedo-petardos-perros-mayores/correccion-r5.md` (l.8)
- `/home/user/CuidaTuPerroViejo/INVENTARIO_CONTENIDO.md` (l.83)
- `/home/user/CuidaTuPerroViejo/src/components/article/TablaApilable.astro`