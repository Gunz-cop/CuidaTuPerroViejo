# Entrega de redacción: miedo a las visitas

| Campo | Valor |
|---|---|
| Brief | `briefings/briefing-perro-mayor-miedo-visitas-casa.md` (rama en `56bd4e3`) |
| Borrador | `borradores/perro-mayor-miedo-visitas-casa.mdx` (**no** está en `src/content/blog/`) |
| Fecha | 2026-11-23 |
| Rol | Redactor. No generó ni auditó el brief y no auditará el artículo |
| Skill | `redactar-articulo-blog`, con `guia-voz-tono.md`, `calidad-editorial-adsense.md`, `crear-animaciones-articulo-blog` y `apoyos-visuales-responsive.md` |
| Lecturas previas | AGENTS.md, `docs/metodologia-agentes.md`, informes R1 y R2 de esta carpeta, adenda de Jaspe (`docs/experiencias/agata-jaspe-convivencia-2026-11-23/README.md`) |

## Qué se entrega

| Archivo | Qué es |
|---|---|
| `borradores/perro-mayor-miedo-visitas-casa.mdx` | Borrador completo con el frontmatter literal del brief |
| `src/components/article/PlanVisitaRecursos.astro` | Plan interactivo antes/durante/después y descarga de la hoja. No contiene nada del caso |
| `scripts/generar-hoja-registro-visitas.ts` | Genera el PDF (patrón de `generar-hoja-calidad-vida.ts`) |
| `public/descargas/registro-visitas-perro-mayor.pdf` | Hoja A4 apaisada de una página, «CID TrueType» (`pdffonts`) |
| `public/images/blog/perro-mayor-miedo-visitas-casa/` | 3 ilustraciones WebP de 1200×675 y su variante `-400` |
| `docs/contenido/perro-mayor-miedo-visitas-casa/originales/` | Originales a 1600 px y las dos versiones rechazadas de la imagen 3 |
| `docs/contenido/perro-mayor-miedo-visitas-casa/capturas/` | Capturas de móvil (390 px) y de escritorio (1366 px), en claro y oscuro, y una sin JavaScript |

**Prueba de build:** el `.mdx` se copió de forma temporal a `src/content/blog/`. Ahí se ejecutó `npx astro build`, que terminó con salida 0, incluida la proyección Markdown (`agent-content/v1/documents/article--perro-mayor-miedo-visitas-casa.md`). Con el build se sacaron las capturas y, después, se borró la copia. `git status src/content/blog/` queda vacío. No se ejecutó `npx astro check`.

## Recuento (Fase 4)

Contado con `split()` de Python sobre el cuerpo, sin frontmatter ni `import`. Por H2: desde cada `## ` hasta el siguiente.

| H2 | Palabras reales | Target (Sección 6) | Desviación |
|---|---|---|---|
| Introducción (con AlertBox info) | 222 | ~250 | −11 % |
| Cómo saber que tu perro lo está pasando mal | 322 | ~350 | −8 % |
| Por qué a algunos perros mayores les cuesta tanto que entre gente | 487 | ~450 | +8 % |
| Antes, durante y después: el plan para cuando entra gente | 693 | ~650 | +7 % |
| Cuando tiene que entrar un profesional | 377 | ~350 | +8 % |
| Cuando el miedo también es un asunto de salud (último H2 práctico) | 511 | ~450 | +14 % |
| Conclusión («Un plan para los dos») + FAQ | 124 + 289 = 413 | ~400 | +3 % |
| Cuadro de fuentes (fuera del presupuesto por sección) | 236 | — | — |
| **Total del cuerpo** (`wc -w`, todo incluido) | **3.265** | 2.465–3.335 | dentro del rango |

- Densidad de párrafo (comando de la Fase 4): media 29, mediana 30, 0 % de párrafos con más de 50 palabras.
- Voz: `tono.py` da 2.782 palabras y **0 muletillas** (0,0/1000).
- Los componentes no cuentan en el `.mdx`. El texto de `PlanVisitaRecursos` (14 pasos) resume acciones que ya están en el artículo y no añade datos clínicos.

## Fuentes citadas por nombre dentro de su H2

| # | Fuente | H2 asignado | Dónde aparece en el borrador | Citada |
|---|---|---|---|---|
| 1 | AAHA (Hammerle y cols., 2015) | Cómo saber…; Por qué…; Antes, durante y después; Profesional; Salud | En los cinco: Tabla 1 (señales, con enlace); *Senior* (vista, oído, señales verbales con gesto o toque); evitación y seguridad como pilares, protección como primer paso y el ejemplo de la parte de atrás de la casa; el mismo principio para el profesional; problemas médicos y de conducta que se agravan entre sí. En el `warning`: no forzar la exposición y oposición a los métodos aversivos | ✅ |
| 2 | Forsgård y cols., 2019 | Salud | H3 «Epilepsia y estrés»: 50 perros, 37 con algún factor, visitas en casa 11/37 (30 %), dicho como asociación que recuerdan los dueños | ✅ |
| 3 | Shihab, Bowen y Volk, 2011 | Salud | H3 «Epilepsia y estrés»: 80 perros, más miedo y ansiedad con o sin medicación | ✅ |
| 4 | Mills y cols., 2020 | Salud | H3 «Dolor y sentidos»: alrededor de un tercio de los derivados, en algunos casos cerca del 80 %; más cauto y ansioso; tratar primero el dolor sospechado | ✅ |
| 5 | Bhatti y cols., 2015 (IVETF) | Salud | H3 «La medicación también cuenta»: sedación, ataxia («falta de coordinación»), polifagia, polidipsia y poliuria; dependen de la dosis y se suavizan en semanas | ✅ |
| 6 | Podell y cols., 2016 (ACVIM) | Salud (`danger` y H3 de medicación) | H3 de medicación (cambios de conducta que pasan en 1–2 semanas) y `AlertBox danger` («umbrales del consenso del ACVIM», «o antes si tu veterinario te ha dado otra pauta») | ✅ |

El cuadro `AlertBox info` «Fuentes científicas y de autoridad» enlaza las seis con su título real. Ninguna estaba marcada como `[URL no verificada]`. Shihab se enlaza a Europe PMC, como en el brief (solo resumen verificado).

## Contrato (Sección 9)

- **Componentes:** 3 `AlertBox` narrativos (`info` en la introducción, `warning` en el plan, `danger` en salud) y el de fuentes; `FAQ` con 6 preguntas; `TarjetaRelacionada` a petardos en el H3 «Antes»; `PlanVisitaRecursos` en el H2 del plan.
- **Enlaces internos:** pilar (introducción); ansiedad por separación (H3 «Lo que cambia con la edad», dentro del H2 «Por qué…»); disfunción cognitiva (mismo H3); petardos (tarjeta en «Antes»); agresividad tardía y chequeo geriátrico (H2 salud); calculadora de calidad de vida (conclusión). Los siete existen en `src/content/blog/` o en `src/pages/herramientas/`.
- **Arco:** apertura con el hecho 5 y solo con él (las reacciones del hecho 2 van en el H2 de señales); hechos 1, 3, 4 y 6 en «Por qué…»; 6 y 10 en el plan; 8 y 9 en «Profesional»; 7 en salud; cierre con 4 y 8 sin desenlace de la planta de arriba («sigue siendo una idea por probar»). El orden temporal entre los operarios y la muerte de la otra perra no se fija. El hecho 7 dice «en los meses que siguieron a aquellas mañanas», que es lo que documenta el brief.
- **Anonimato:** sin nombres de la lectora ni de las perras, sin razas del caso (solo «mestiza»), sin fecha ni forma de la muerte, sin accidente, baja ni humedades («convaleciente», «una reparación»), sin país. Solo hay dos citas literales: «como si fuera una oveja» y «otra perra, para bien». Las frases entre comillas del H3 «Durante» son modelos para que el lector los diga en su puerta, no palabras de la lectora.
- **Adenda de Jaspe:** un párrafo en «Lo que el perro trae de antes», en primera persona del equipo. Dice que es una gata y un solo caso, y cuenta lo del estrés y el hongo como opinión de ese veterinario. **Sin la pupila**, sin Rookie y sin nombrar a la otra gata. Es prescindible: si el auditor o el propietario lo descartan, se borra el párrafo (unas 85 palabras) y el H2 sigue dentro de rango (unas 400 palabras, −11 %).
- **Sin dosis ni pautas:** el fenobarbital solo aparece como los efectos que describen las fuentes; «no cambies la dosis» y «no retires la medicación» van en el `warning`.
- **Afiliación:** ninguna, como manda la Sección 7.

### Desviaciones que el auditor debe revisar

1. **El párrafo de la puerta de bebé** dice «bien fijada y sin huecos a los lados». Es seguridad doméstica aplicada a la escalera, sin fuente, y el brief lo pedía («comprobar»).
2. **El cuerpo de los `AlertBox`** se contrastó así. En el `warning`, los dos primeros puntos se atribuyen a la AAHA (*flooding*, métodos aversivos) y los dos últimos siguen la política editorial. En el `danger`, el primer punto se atribuye al ACVIM y los otros dos no se atribuyen a ninguna fuente, como indica el brief.
3. **La FAQ 6** dice «que sea el menor tiempo posible». La 2 remite a un veterinario especialista en comportamiento (AAHA).

## Imágenes

Generadas con fal (`google/nano-banana-2.1`). La imagen 1 se hizo de texto a imagen y después se retocó con `/edit` para marcar la edad. Las imágenes 2 y 3 se derivaron de la imagen 1 con `/edit`, para que fuera el mismo perro. Higgsfield rechazó la generación («Requires basic plan or higher»). Prompts: los del brief, con pequeñas precisiones de geometría (ver abajo).

| Imagen | Archivo | Revisión a tamaño grande y a 390 px | Estado |
|---|---|---|---|
| 1 Hero | `perra-mayor-habitacion-tranquila-visitas.webp` | Puerta de madera cerrada a la vista; persona sentada en el suelo con la mano apoyada cerca, sin abrazo, sin lesión y sin mirar a cámara; no hay gente de fuera. Edad: máscara gris clara en hocico y barbilla, cejas blancas, párpados algo caídos, cuerpo delgado con lomo y muslos poco marcados, postura tranquila. A 390 px la máscara se distingue, pero sobre un pelo crema contrasta poco: **el propietario debe confirmar que se lee como perra mayor**. La primera versión, sin el retoque, salió demasiado joven y no se usó | Aceptada con reserva |
| 2 Zona segura | `zona-segura-perra-mayor-visitas.webp` | Mismo perro; lame un juguete de goma tumbada en su cama; cuenco de agua, radio pequeña, manta doblada sobre una silla, puerta entreabierta al fondo; sin personas, jaula, correa ni marcas. Edad: hocico canoso y ojos entornados; a 390 px parece mayor | Aceptada |
| 3 Planta alta | `perra-mayor-planta-alta-puerta-bebe.webp` | La v3 cumple: barrera blanca cerrada de la pared al poste de la barandilla, escalera que baja, operario borroso abajo (piernas y caja) sin mirar a la perra, y la perra a un metro, sin tocar la barrera. La **v1 se rechazó** porque la escalera subía detrás de la barrera y el operario estaba en el mismo piso. La **v2 se rechazó** porque la barrera no cubría el hueco (quedaba un paso libre a la izquierda). Las dos están en `originales/` | Aceptada |

Captions y alt: los del brief. El `heroImageAlt` coincide con la imagen generada (se ve «una persona sentada en el suelo»). Las tres son la misma perra ilustrativa, mestiza crema, que no es la del caso.

## Componente y PDF: pruebas propias

Hechas con Playwright sobre `dist/client` servido en local; no se ha probado en una URL pública.

| Prueba | Resultado |
|---|---|
| Altura en móvil (390 px), estado inicial | 827 px; con «Durante» activa, 820 px (presupuesto: ≤900) |
| Altura en escritorio (1366 px) | 728 px |
| Desbordamiento horizontal | `scrollWidth` = ancho de la ventana (390 y 1366) |
| Teclado | Las pestañas siguen el patrón ARIA (`tablist`/`tab`/`tabpanel`) con índice de tabulación móvil; con la flecha derecha el foco pasa de «Antes» a «Durante» |
| Casillas | Marcar dos pasos actualiza el contador («2 de 14 pasos listos») y el de la pestaña; el estado se guarda en `localStorage` dentro de `try/catch` |
| Sin JavaScript | Se ven las 3 fases, sin pestañas ni botones inertes (1.237 px de alto, aceptable como alternativa) |
| Impresión con JavaScript | 3 fases visibles; comprobado también imprimiendo la página a PDF. Primero falló: el `[hidden]` de Tailwind 4 lleva `!important` dentro de una capa y gana a cualquier `!important` sin capa. Se corrigió con `data-active`, el patrón de `PolvoraRecursos` |
| Movimiento reducido | `animation-name: none` |
| Contraste calculado | Claro: título 6,05:1; texto atenuado 8,51:1; pestaña y botón 6,32:1. Oscuro: título y atenuado 9,92:1; texto 16,54:1; pestaña y botón 10,91:1 |
| Objetivos táctiles | Pestañas, casillas (etiqueta completa), botón de descarga y acciones de al menos 44 px |
| Descarga | `/descargas/registro-visitas-perro-mayor.pdf` responde 200 `application/pdf` y empieza por `%PDF-` |
| PDF | 1 página A4 apaisada, fuentes Carlito y Caladea como «CID TrueType». Columnas del brief: fecha, quién entró, cuánto tiempo, dónde estaba, señales (de la Tabla 1 de la AAHA), cuánto tardó en calmarse, si jadea sin visitas y notas para el veterinario. Lleva un recuadro de urgencias con los umbrales del ACVIM y «o antes si tu veterinario te dio otra pauta» |
| Imágenes | Las 3 se decodifican en móvil y en escritorio; la cabecera sirve la variante reducida en móvil |
| Errores de consola | Solo un 404 de `/api/feedback`, un endpoint del Worker que no existe en un servidor estático (pasa igual en el artículo de la pólvora) |

Sin dibujos de perros ni de personas: el componente usa una huella de la marca, un reloj, una puerta y una lista, todos geométricos.

## Pendiente

1. **Auditoría del artículo** (otra sesión, skill `auditar-articulo-blog`). El brief va por R2 de un máximo de R4.
2. **Visto bueno del propietario** al texto auditado y a la edad de la perra de la imagen 1 a 390 px.
3. **PDF para la lectora**, correo aprobado por el propietario y su respuesta. Si no responde, no se publica. Antes hay que confirmar con ella las dos citas literales y el orden temporal.
4. Tras las dos aprobaciones: mover el `.mdx` a `src/content/blog/`, poner la fecha real en `datePublished`, marcar el brief y el inventario, y abrir el PR.
5. El P0-1 de R2 (la v1 del brief accesible por SHA en GitHub) sigue abierto y bloquea la publicación. No es tarea del redactor.
6. `npx astro check` no se ejecutó.
7. El brief no está marcado como «redactado» y `INVENTARIO_CONTENIDO.md` no se tocó. La skill pide hacerlo con el artículo guardado y aprobado, y este sigue en borrador.
