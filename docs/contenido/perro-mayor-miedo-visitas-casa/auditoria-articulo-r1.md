# Auditoría del artículo — R1

| Campo | Valor |
|---|---|
| Documento | `borradores/perro-mayor-miedo-visitas-casa.mdx` (263 líneas) |
| Versión auditada | `origin/claude/happy-ride-8leguk` en `098422e` (borrador, componente, PDF e ilustraciones) |
| Contrato | `briefings/briefing-perro-mayor-miedo-visitas-casa.md` (brief en `56bd4e3`, R2 del brief: APTO con observaciones) |
| Ronda | **R1 de 3** de la auditoría del artículo |
| Fecha | 2026-11-24 |
| Método | skill `auditar-articulo-blog`, `calidad-editorial-adsense.md`, `guia-voz-tono.md`, AGENTS.md, `docs/metodologia-agentes.md`; informes R1 y R2 del brief; `entrega-redaccion.md` como hipótesis del redactor |
| Rol | Auditor independiente. No generó ni auditó el brief, no redactó el artículo y no modifica el borrador, el componente ni el brief |

> **Nota de privacidad.** Este archivo está en un repositorio público. No copia texto del borrador ni datos del caso: los hallazgos remiten a H2/H3 y líneas del `.mdx`.

## Veredicto

**APTO con observaciones.**

El texto cumple el contrato de la Sección 9: volumen, distribución por H2, las seis fuentes citadas por nombre en su H2 y verificadas contra el texto original, componentes, enlaces, arco documentado y anonimato. La voz está limpia (0 muletillas). El componente y el PDF funcionan.

Antes del visto bueno del propietario queda **un P1**: la edad de la perra en la imagen hero apenas se lee a 390 px. Hay además seis P2 de precisión y formato. Ninguno exige reescribir el texto ni una nueva ronda completa. Si solo se corrigen los P2 de una línea y se regenera la imagen, basta con una comprobación puntual de esos cambios (R2 corta).

**Fuera del artículo, y sigue bloqueando la publicación:** el P0-1 de la R2 del brief (la versión v1 del brief accesible por su SHA en GitHub). No es del redactor ni de esta auditoría. Tampoco se ha cumplido todavía la doble aprobación de la Sección 9.5 (propietario → lectora → propietario).

## Métricas medidas

`node .agents/skills/auditar-articulo-blog/scripts/metricas.mjs perro-mayor-miedo-visitas-casa`, con el `.mdx` copiado de forma temporal a `src/content/blog/`. El script devolvió **NO APTO con 2 bloqueantes, y los dos son falsos positivos**:

| Bloqueante del script | Comprobación propia | Resultado |
|---|---|---|
| «Un plan para los dos» 647/400 (+62 %) | La sección incluye el cuadro de fuentes (238 palabras). Sin él: 415 palabras, +4 % | Falso positivo |
| Falta el enlace a petardos | El enlace va por `TarjetaRelacionada` (línea 122), como pide la Sección 5 del brief. En el HTML compilado hay 2 `href` a `/salud-mental-emocional-perros/miedo-petardos-perros-mayores`, y la proyección Markdown también lo enlaza | Falso positivo |

Recuento propio por H2 (`split()` de Python, cabeceras incluidas):

| H2 | Real | Target | Desv. |
|---|---|---|---|
| Introducción | 222 | 250 | −11 % |
| Cómo saber… | 322 | 350 | −8 % |
| Por qué… | 487 | 450 | +8 % |
| Antes, durante y después | 693 | 650 | +7 % |
| Cuando tiene que entrar un profesional | 377 | 350 | +8 % |
| Cuando el miedo también es un asunto de salud | 511 | 450 | +14 % |
| Conclusión + FAQ (sin el cuadro de fuentes) | 415 | 400 | +4 % |
| **Total del cuerpo** | **3.265** (3.027 sin el cuadro de fuentes) | 2.465–3.335 | Dentro del rango en los dos casos |

- **Densidad de párrafo:** 67 párrafos; media 30, mediana 31, máximo 51; 1 % por encima de 50 palabras. Cumple.
- **Voz:** `tono.py` da 2.782 palabras y **0 muletillas** (0,0/1000). Sin usted ni voseo, sin relleno SEO y sin exclamaciones.
- **Componentes:** 3 `AlertBox` de cuerpo (`info` en la introducción, `warning` en el plan, `danger` en salud) más el cuadro de fuentes; `FAQ` con 6 preguntas; `TarjetaRelacionada`; `PlanVisitaRecursos`.
- **Enlaces internos:** los siete de la Sección 5 están, en el H2 que les asigna el brief.
- **Frontmatter:** es copia literal del brief (metaDescription de 147 caracteres). `status: "Publicado"` y `datePublished` provisional son correctos **solo** porque el archivo vive en `borradores/`.
- **Build:** `npx astro build` terminó con código 0, con el `.mdx` copiado de forma temporal; también se generó la proyección `agent-content/v1/documents/article--perro-mayor-miedo-visitas-casa.md`. La copia se borró después y `git status src/content/blog/` queda vacío. Antes hubo que ejecutar `npm ci`, porque el contenedor no tenía `node_modules`.

Lo que dice `entrega-redaccion.md` sobre recuentos, densidad, tono, componentes, enlaces y build **coincide** con lo medido. La única inexactitud es que llama «un párrafo» al pasaje de la adenda, cuando son tres párrafos cortos (líneas 75, 77 y 79). No tiene consecuencias.

## Fuentes: verificación propia contra el texto original

Abrí las seis el 2026-11-24: texto completo de PMC (las cuatro), PDF oficial de la AAHA (17 páginas, extraído con `pdftotext`) y la ficha de Shihab en la API de Europe PMC (solo el resumen, como declara el brief).

| # | Fuente | Afirmación en el artículo | Dónde está en la fuente | Resultado |
|---|---|---|---|---|
| 1 | AAHA 2015 (Hammerle y cols.) | Señales de ansiedad (L38–45) | Tabla de signos de ansiedad: *panting*, *increased respiration and heart rate*, *trembling*, *lip licking*, *nose licking*, *salivation/hypersalivation*, *increased reactivity* | ✅ |
| 1 | AAHA | Pérdida de vista, oído y flexibilidad; señales verbales con gesto o toque (L89–93) | Apartado *Senior Dogs and Cats* («*Many early changes in reactivity… loss of either visual or auditory acuity and physical flexibility… clear verbal signals augmented by either visual or tactile cues*») | ✅ |
| 1 | AAHA | Evitación y seguridad como pilares; la protección como primer paso; apartar al perro a la parte de atrás de la casa (L103–105) | «*Avoidance and safety are the cornerstones of behavioral treatment*»; «*Protection is the first treatment step*»; ejemplo de *sequestering the dog at the back of the* casa, para un perro que ladra a la gente que ve por la ventana | ✅ (el contexto original es la ventana, no una visita; el artículo lo presenta como aplicación del principio, L107) |
| 1 | AAHA | Problemas médicos y de conducta que se agravan entre sí (L197) | «*medical and behavioral conditions can exist concurrently and exacerbate each other*» | ✅ |
| 1 | AAHA | `warning`: no exponer de golpe y oposición a los métodos aversivos (L159–160) | Apartado *Aversive Techniques*: el *flooding* «*should be avoided*»; «*This Task Force opposes training methods that use aversive techniques*» | ✅ |
| 1 | AAHA | FAQ 2: especialista en casos intensos | «*If the behavior is extreme, a veterinary behavior specialist should be consulted*» | ✅ |
| 2 | Forsgård y cols. 2019 | 50 perros con epilepsia idiopática, Finlandia, 37 con algún factor, «visitas en casa» 11/37 (30 %) (L211) | Resultados: 74 % (37/50); en la lista de comprobación, *having visitors at home* 11/37 (30 %), el primero. Los perros se reclutaron en dos hospitales de Helsinki | ✅ (ver P2-2) |
| 3 | Shihab, Bowen y Volk 2011 | 80 perros; más miedo y ansiedad tras el inicio, con o sin medicación (L215) | Resumen: n = 80; *Fear/Anxiety* aumenta en perros sin medicación y sigue aumentando en los medicados | ✅ |
| 4 | Mills y cols. 2020 | Alrededor de un tercio, en algunos casos cerca del 80 %; más cauto y ansioso; tratar primero el dolor sospechado (L201–205) | Resumen («*conservative estimate of around a third of referred cases… nearly 80%*»), sección 2 («*more cautious and potentially anxious*») y recomendación final | ✅ |
| 5 | Bhatti y cols. 2015 (IVETF) | Sedación, ataxia, polifagia, polidipsia y poliuria; al empezar o al subir la dosis, y luego disminuyen (L221–223) | Apartado del fenobarbital y Tabla 1 | ✅ |
| 6 | Podell y cols. 2016 (ACVIM) | Cambios de conducta al inicio que pasan en 1–2 semanas (L223) | Fenobarbital, tipo I: «*hyperexcitability, restlessness, or sedation… typically resolve within 1–2 weeks*» | ✅ |
| 6 | Podell | `danger`: 5 minutos o 3 crisis (L230) | «*ictal event ≥5 minutes or ≥3 or more generalized seizures within a 24-hour period*», dentro de los criterios para iniciar tratamiento | ✅ con matiz (P2-1) |

Autores, año, revista, DOI y enlaces coinciden con la fuente real en las seis. No hay autoría inventada, cifras que la fuente no diga ni fuentes citadas solo en el cuadro de cierre. **Ningún error nace en el brief.**

## Contrato de la Sección 9

- **Arco documentado:** la apertura usa solo el hecho 5 (L18). Los hechos 2, 1, 3, 4, 6, 10, 8, 9 y 7 están cada uno en su H2 y enlazados con explicación y acción. El cierre (L237) usa los hechos 4 y 8 y no inventa un resultado de la planta de arriba. La historia va entretejida, sin un H2 narrativo propio, como pide la guía de voz.
- **Anonimato:** sin nombres de personas ni de las perras del caso, sin razas del caso, sin fecha ni forma de la muerte, sin accidente, baja, humedades ni país del caso. El único país es el del estudio de Forsgård. Solo aparecen las dos citas literales autorizadas (L69 y L71). Las demás comillas son frases modelo para el lector (L137–139, L175), términos (L159, L161) o la etiqueta de la fuente (L211). Sin dosis. La declaración de procedencia es literal (L20).
- **Orden temporal:** el texto no fija si el episodio de los operarios fue antes o después de la muerte de la otra perra. L195 sitúa la primera crisis después de esas mañanas, que es lo que documenta el hecho 7. Ver P2-6.
- **Adenda de Jaspe** (L75–79): en primera persona del equipo, dice que es una gata y un solo caso, y cuenta el estrés y el hongo como lo que dijo ese veterinario. **Sin la pupila, sin Rookie y sin generalizar.** Los P1-1 y P1-2 de la R2 del brief no se han propagado. Puede quedarse.
- **Política clínica:** sin pautas de fármacos. El fenobarbital solo aparece con los efectos que describen las fuentes, y las señales de urgencia están junto a la maniobra.
- **Sin filtraciones del brief:** no hay segunda persona dirigida al redactor, ni menciones al brief, a «la fuente N», corchetes de anotación o marcadores.
- **Sin afiliación**, como manda la Sección 7.

### Desviaciones que pidió revisar el redactor

1. **Barrera «bien fijada y sin huecos a los lados» (L187):** es seguridad doméstica de sentido común, coherente con el «comprobar» del brief, y no se atribuye a ninguna fuente. **Aceptada.**
2. **Cuerpo de los `AlertBox`:** en el `warning`, las dos atribuciones a la AAHA son exactas (*flooding* y métodos aversivos). En el `danger`, la atribución al ACVIM es correcta, con el matiz del P2-1, y los otros dos puntos no se atribuyen a nadie. **Aceptado.**
3. **FAQ 6 y FAQ 2:** la FAQ 6 es consejo práctico sin dato clínico. La FAQ 2 tiene respaldo literal en la AAHA (tabla de arriba). **Aceptadas.**

## Recursos prometidos

| Recurso | Prueba propia | Resultado |
|---|---|---|
| `PlanVisitaRecursos.astro` | Playwright sobre `dist/client` servido en local. Altura del componente: **827 px en móvil a 390** (840 con «Durante» activa) y 728 px a 1366, en claro y en oscuro. `scrollWidth` igual al ancho de la ventana. La flecha derecha mueve el foco de «Antes» a «Durante», el panel cambia y marcar una casilla actualiza el contador a «1 de 14». Los paneles reciben `role="tabpanel"` por JavaScript; sin JavaScript son regiones que se leen enteras. `localStorage` va dentro de `try/catch`. No hay dibujos de perros ni de personas (solo huella, reloj, puerta y lista). El único error de consola es el 404 de `/api/feedback` en el servidor estático, que es esperable | ✅ Cumple ≤ 900 px y no desborda |
| `registro-visitas-perro-mayor.pdf` | Responde 200 `application/pdf` y empieza por `%PDF-`. Una página A4 apaisada con fuentes CID TrueType incrustadas. Tiene las ocho columnas del brief y un recuadro de urgencias coherente con el `danger`. No contiene datos del caso ni instrucciones internas. El script `generar-hoja-registro-visitas.ts` lo genera con Playwright y `page.pdf` | ✅ (ver P2-5) |
| 3 ilustraciones | Revisadas a 1200 px y a 390 px | Ver P1-1 y P2-4 |

## Imágenes

| Imagen | Restricciones del brief | Edad a 390 px | Alt |
|---|---|---|---|
| Hero (habitación) | Puerta de madera cerrada a la vista, sin gente de fuera, persona sentada en el suelo sin abrazo ni lesión y sin mirar a cámara. **Desviación:** la perra mira a la persona, no tiene la cabeza ni las orejas hacia la puerta | **Débil.** A tamaño completo se ven hocico y cejas canosos y párpados algo caídos. A 390 px, sobre el pelo crema, el canoso casi desaparece. El cuerpo se ve musculado, sin lomo hundido ni costillas: se lee como una perra adulta de pelo claro | Fiel |
| Zona segura | Sin personas, jaula, correa ni marcas; cuenco, radio, manta y puerta entreabierta | Aceptable: ojos entornados y hocico más claro | Fiel |
| Planta alta | Barrera blanca cerrada que separa la perra del primer peldaño; operario desenfocado abajo (piernas y caja) que no la mira; perra a un metro de la barrera | Aceptable, aunque justa: hocico claro, cuerpo de adulto | Fiel |

Las tres muestran la misma perra (la 2 y la 3 se derivaron de la 1) y ninguna se parece a la del caso.

## Hallazgos

### P0

Ninguno en el artículo. (Sigue abierto el P0-1 de la R2 del brief, externo a esta auditoría, que bloquea la publicación.)

### P1 — Corregir antes del visto bueno del propietario

**P1-1. La edad de la perra de la hero no se lee a tamaño móvil.**
- *Ubicación:* `heroImage` (línea 7) → `public/images/blog/perro-mayor-miedo-visitas-casa/perra-mayor-habitacion-tranquila-visitas.webp` y su variante `-400`.
- *Evidencia:* a 390 px, la edad solo se sostiene por un hocico algo más claro que, sobre el pelo crema, apenas contrasta. No se ven ojos hundidos, lomo hundido, muslos menos marcados ni costillas, que son rasgos del bloque de edad del brief. El criterio de aceptación de la Sección 8 («a 390 px se ven las canas») queda en el límite, y la skill es explícita: si la edad «solo se sostiene por el hocico canoso», hay que regenerar. El propio redactor la dejó «aceptada con reserva». Además, la perra mira a la persona en vez de tener la cabeza y las orejas hacia la puerta, como pide la Sección 8.
- *Instrucción:* regenerar la hero (o retocarla con `/edit` desde el original de `originales/`) con el bloque de edad íntegro y estas precisiones: canas casi blancas en hocico, cejas y alrededor de los ojos, con contraste visible sobre el crema; lomo ligeramente hundido; muslos menos marcados; costillas algo perceptibles; cabeza y orejas orientadas a la puerta cerrada. Exportar de nuevo a 1200×675 y `-400`. Comprobar a 390 px antes de entregar. Si se regenera, revisar si la 2 y la 3, derivadas de ella, siguen pareciendo la misma perra. **Alternativa:** que el propietario la acepte de forma expresa a 390 px y que esa decisión quede registrada.

### P2 — Precisión y formato

**P2-1. El umbral del `danger` dice «en un mismo día» y la fuente dice 24 horas.**
- *Ubicación:* H2 «Cuando el miedo también es un asunto de salud», `AlertBox danger`, línea 230. Lo mismo en el recuadro de urgencias del PDF.
- *Instrucción:* cambiar el periodo del día natural por «en 24 horas» en el `.mdx` y en `scripts/generar-hoja-registro-visitas.ts`, y regenerar el PDF.

**P2-2. Forsgård: el «más señalado» corresponde a la lista de comprobación, no a la pregunta abierta.**
- *Ubicación:* H3 «Epilepsia y estrés», línea 211, y FAQ 4 (línea 260).
- *Evidencia:* con la pregunta abierta, los factores más citados fueron el estrés y la excitación (6/29 cada uno). «Visitas en casa» encabeza la lista de comprobación (11/37). La cifra del artículo es correcta, pero sin el matiz puede leerse como la respuesta espontánea de los dueños.
- *Instrucción:* precisar en L211 que fue al elegir de una lista de posibles factores. En la FAQ 4 basta con «entre los factores de una lista». Ajuste de pocas palabras.

**P2-3. Las imágenes del cuerpo usan sintaxis Markdown y salen sin `width`, `height` ni `loading`.**
- *Ubicación:* líneas 117 y 182.
- *Evidencia:* en el HTML compilado, las dos `<img>` no tienen `width`/`height` (riesgo de CLS) ni `loading="lazy"`. La Sección 4 del brief pide la etiqueta `<img … width="1200" height="675" loading="lazy" decoding="async" />`, que es la que usan los artículos recientes (cachorro y petardos).
- *Instrucción:* sustituir las dos imágenes Markdown por la etiqueta `<img>` del brief, con el mismo `src` y el mismo `alt`. El pie en cursiva va debajo.

**P2-4. El sujeto de las ilustraciones se lee como un mestizo de labrador amarillo.**
- *Ubicación:* las tres imágenes.
- *Evidencia:* la Sección 8 eligió una mestiza crema para no repetir razas recientes, y «labrador» está en esa lista. El resultado es creíble como mestiza, pero el tipo labrador es dominante. No afecta al anonimato.
- *Instrucción:* decisión del propietario. Si se regenera la hero (P1-1), aprovechar para acercarla a «mestiza mediana» (orejas semicaídas más pequeñas y cabeza menos ancha). Si no, aceptarlo y dejarlo registrado.

**P2-5. Cadencia de H3 por encima del rango.**
- *Ubicación:* H3 «Lo que el perro trae de antes» (L65–85, unas 320 palabras) y H3 «La planta de arriba con una puerta de bebé» (L178–191, unas 228). El rango es de 150–200.
- *Instrucción:* opcional. En el primero, un H3 propio para la experiencia del equipo (L75–79) o para la poca costumbre de ver gente (L81–85) lo dejaría en rango sin tocar el texto. El segundo puede quedarse así.
- *Nota menor del PDF:* la URL del pie se parte en el guion. Si se regenera el PDF por el P2-1, conviene que el salto no caiga dentro de la URL.

**P2-6. Confirmar con la lectora quién estaba en la habitación.**
- *Ubicación:* introducción, línea 18.
- *Evidencia:* el texto sigue la lectura que hace la Sección 6 del brief del hecho 5. La redacción original del hecho admite otra lectura, y esa otra lectura fijaría el orden temporal que el brief deja abierto.
- *Instrucción:* añadir este punto a las confirmaciones pendientes con la lectora (junto a las dos citas y el orden temporal). No cambiar el texto mientras tanto.

**Nota sin hallazgo:** en L38, la expansión de la sigla AAHA no es la traducción literal del nombre de la asociación (*American Animal Hospital Association*). Es opcional ajustarla a «Asociación Americana de Hospitales de Animales».

## Lo que funciona y no debe tocarse al corregir

- **Honestidad de la evidencia en el punto de presión:** L107 dice que ningún estudio ha probado un protocolo para visitas, y L213 que Forsgård muestra asociación, no causa. Son las dos frases que más se ablandan al redactar, y aquí están bien.
- **Adenda de Jaspe acotada:** sin la pupila, con el límite dicho una sola vez y sin generalizar (L79).
- **La puerta de bebé sin desenlace** (L185–191 y L237), con el riesgo de la escalera para una perra con crisis puesto junto a la maniobra.
- **Voz:** 0 muletillas, párrafos de 30 palabras de media y empatía breve (L151). El `AlertBox info` de la introducción hace lo que pedía el brief.
- **El componente** se lee entero sin JavaScript, cabe en una pantalla de móvil y la descarga funciona.

## Qué queda para la siguiente ronda

- R2 (corta): comprobar la hero regenerada o la aceptación registrada del propietario (P1-1), y los P2 que se apliquen. No hace falta volver a verificar las fuentes si el texto solo cambia en L211, L230, L260 y en las etiquetas de imagen.
- No verificado aquí: URL públicas (no hay despliegue), `npx astro check`, el PDF para la lectora y la doble aprobación.
