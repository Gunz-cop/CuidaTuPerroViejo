# Auditoría R1 de la revisión de fondo del artículo de golpe de calor

| Campo | Valor |
|---|---|
| Alcance | Solo los cambios de `git diff 5cad4e2 6e2bcdc`: texto del MDX, componente nuevo `src/components/article/GolpeCalorRecursos.astro` (variantes `primeros-minutos` y `umbrales`), adición a `.agents/skills/references/direccion-visual-editorial.md` y el informe `revision-fondo-articulo.md` con sus evidencias (`recursos-animados/`) |
| Commit auditado | `6e2bcdc` en `claude/golpe-calor-revision` (base `5cad4e2`, `codex/articulo-golpe-calor-imagenes`) |
| Fecha | 2026-10-24 |
| Auditor | Sesión independiente: no generó el brief, no redactó el artículo, no hizo la revisión ni el componente, y no corrige |
| Criterio del propietario | Solo los bloqueantes impiden el APTO; el resto va como observaciones |
| Referencias | `auditar-articulo-blog/SKILL.md`, `calidad-editorial-adsense.md`, `apoyos-visuales-responsive.md`, `crear-animaciones-articulo-blog/SKILL.md` §5 y §7, brief `briefings/briefing-golpe-de-calor-perros-mayores.md` (R2) |

## Veredicto

**APTO.** No hay bloqueantes. Los cambios de texto son fieles a las fuentes y al brief, y no introducen ningún error clínico. El componente no añade cifras ni consejos inseguros y cumple los requisitos de accesibilidad y responsive que medí. Las observaciones de abajo no impiden el APTO. La más importante para el propietario es la O1: la imagen de enfriamiento sigue publicada con el ventilador sobre el suelo mojado.

## Qué comprobé y cómo

### 1. Cambios de texto del MDX

| Cambio | Comprobación | Resultado |
|---|---|---|
| Tratamiento atribuido a Hall et al. 2021 | Texto completo de PMC7994647 (Europe PMC, `fullTextXML`), Discusión: «Clinical management should aim to prevent worsening of the patient's condition through early temperature management, fluid therapy and supportive management of body systems affected». | Fiel. La frase del MDX («evitar que empeore: controlar pronto la temperatura, sueroterapia y apoyo a los órganos afectados») es una traducción correcta. S4 está asignada a H2-4 en el contrato del brief. |
| Bruchim 2017, «intensivos y prolongados» | PMC5800390, Conclusiones: «Treatment and monitoring of heatstroke should be intensive and prolonged, since most of its complications often have delayed onsets». | Fiel. |
| H1 del informe: Bruchim no tiene apartado de tratamiento ni habla de sueroterapia | Encabezados de PMC5800390: Epidemiology, Pathogenesis (con Diagnosis y Prognosis), Biomarkers, Preconditioning, Conclusions. No hay sección de tratamiento. «fluid»/«fluids» no aparece en el texto que leí, sin contar la parte final de referencias. | Cierto. Matiz en O5. |
| Anclajes del BOE | Descargué `act.php?id=BOE-A-2023-7936`: `id="a2-6"` es el artículo 24, con el 24.2 d) «No dejarlos solos dentro de vehículos cerrados, expuestos a condiciones térmicas…». `id="a6-2"` es el artículo 60, con el 60.2 «aireación y la temperatura sean adecuadas». `#a24` y `#a60` no existen. | Correcto. |
| Conductor solo | «Empieza a enfriarlo antes de salir y, al volante, céntrate en conducir con el aire puesto; no intentes atenderlo durante la marcha.» | Sin error clínico. Coincide con «enfriar primero, transportar después» (S5) y con el aire del coche que el brief cuenta como movimiento de aire. Resuelve la contradicción anterior (H3). |
| Alt de enfriamiento y pie de casa | Miré las dos imágenes a 1200 px. | El alt nuevo coincide con la imagen: el agua cae sobre la cruz y el lomo y baja por el pecho. El pie nuevo no afirma nada que la imagen contradiga. |

Volumen tras los cambios: 4.482 tokens de palabra en el cuerpo (antes 4.465) con mi contador, dentro de 3.740–5.060. `tono.py`: 0 muletillas (0,0/1.000).

### 2. Componente `GolpeCalorRecursos.astro`

**Cifras y fuentes.** Todas las cifras están en el brief:

- 30 °C para perros «grandes, de avanzada edad o braquicéfalos» y 32 °C para todos los perros: cita literal de S8.
- 34/36/38 °C de aviso amarillo y las tres zonas de ejemplo: S11. Lo comprobé en el PDF vigente del anexo Meteoalerta (aemet.es, 20 páginas): Sierra de Madrid 34/37/40, Metropolitana y Henares 36/39/42 y Campiña sevillana 38/40/44.
- Fechas de las fuentes: guía de 2024 y anexo de 2022, como en el brief.

La única cifra derivada es la diferencia («4, 6 u 8 grados por encima de la referencia del Ministerio»). Ver O3.

**Seguridad.** No hay medicación, cifras de parada, tiempos ni temperaturas corporales. El paso 2 dice «Nada de hielo» y el 3, «Pregunta a la clínica cuándo parar», como pide la laguna 3 del brief. Agua «lejos de la cara». El paso 4 («si vais dos, uno conduce y el otro lo vigila; aunque parezca mejor, que lo valoren») coincide con «3. Trasládalo».

**Navegador.** Usé `npx astro build` en `6e2bcdc` y lo serví en 127.0.0.1:8787 con Playwright Chromium. Probé 390 y 1366 px, en claro y oscuro, con y sin movimiento reducido y con y sin JavaScript. Revisé las capturas de los cuatro pasos y de las tres zonas.

| Requisito | Medido | Resultado |
|---|---|---|
| Sin autoplay | El paso sigue en 0 tras 6,5 s sin interacción | Cumple |
| Reproducción y pausa | Al reproducir, avanza a 1 en 6 s. Al pausar, el paso no cambia en 6,5 s y `animation-name` vuelve a `none`. Para en el paso 4 y el botón pasa a «Reproducir de nuevo» | Cumple |
| Teclado | El botón «siguiente» funciona con Enter y el foco visible está declarado | Cumple |
| Movimiento reducido | «Reproducir» desactivado, aviso visible («movimiento reducido: usa las flechas») y animaciones en `none` | Cumple |
| Sin JavaScript | Controles y zonas ocultos, los 4 pasos visibles como texto, la franja 34–38 °C visible y la leyenda completa | Cumple |
| Objetivos táctiles | Flechas y repetir 44×44, summaries de 44 de alto y botones de zona 104×70 en móvil | Cumple |
| Desbordamiento | `scrollWidth` igual al ancho de la ventana a 390 y 1366, antes y después de interactuar. Ningún hijo se sale de la tarjeta | Cumple |
| Altura en móvil, estado inicial | Secuencia: 498, 518, 498 y 498 px según el paso (741 sin JS). Umbrales: 790 px al cargar y 770 tras elegir zona (731 sin JS) | Cumple (≤ 900) |
| Escritorio | Secuencia 635 px y umbrales 646 px | Coincide con el informe |
| Modo oscuro | Con `html.dark` activo, la tarjeta mantiene fondo `#fffdf6`, texto `#294b3d`/`#36533e`, detalles y summary propios. En las capturas no hay herencia de colores del layout | Cumple |
| Detalles plegados | 0 `<details>` abiertos al cargar | Cumple |
| Contraste (cálculo) | El mínimo es 5,66:1 (botón desactivado); antetítulo y marcas 6,57:1. Todo ≥ 4,5:1 | Cumple |
| Consola | Solo `404 /api/feedback`, propio del servidor estático. Sin errores JS | Cumple |
| Índice y proyección | Los h3 del componente llevan `data-toc-exclude` y no entran en el índice. La proyección Markdown incluye los pasos, la leyenda y las notas como texto | Cumple |

`npx astro check`: 0 errores y 0 advertencias (64 sugerencias, ajenas a este cambio).

### 3. `direccion-visual-editorial.md`

Las tres comprobaciones nuevas (escena físicamente segura; imagen, pie y alt coherentes; edad visible) encajan en «Revisión de la imagen generada». Mantienen su formato y no contradicen la ficha ni el esqueleto de prompt. Desarrollan puntos que ya estaban («límites de seguridad», «el perro parece senior»). Ver O4.

### 4. Veracidad del informe de revisión

Cierto en lo esencial: H1–H4, alturas en escritorio, comportamiento de controles, movimiento reducido, sin JavaScript, desbordamiento, modo oscuro, el 404 único y `astro check`. Las inexactitudes son menores (O5 y O6).

## Bloqueantes

Ninguno.

## Observaciones (no impiden el APTO)

- **O1. La imagen de enfriamiento sigue publicada con un riesgo eléctrico.** El informe acierta: el ventilador está sobre el suelo de barro mojado, con el cable a la vista. Ahora además incumple la regla que este mismo commit añade a la dirección visual. El fallo viene de `5cad4e2` y queda fuera del diff, pero conviene sustituirla por la v2 antes de publicar.
- **O2. Repetición en «No esperes al aviso amarillo».** La escala aparece justo después de dos párrafos con las mismas cifras y zonas. Sin JavaScript, el texto del recuadro de lectura repite casi literalmente el párrafo del anexo Meteoalerta. Funciona, pero añade unos 790 px en móvil sobre un contenido ya dicho. Se podría acortar el párrafo o el encabezado del componente.
- **O3. Diferencia derivada.** «X grados por encima de la referencia del Ministerio» no es un umbral clínico nuevo, pero es una cifra que no está en ninguna fuente. El brief (S11, límites) pide no convertir la diferencia en umbral propio. Hoy el componente lo respeta, porque la cifra solo mide distancia. Que no se use después como criterio.
- **O4. Tensión interna en `direccion-visual-editorial.md`.** «Referencia y alcance» sigue presentando las imágenes de casa y de enfriamiento como referencias visuales, sin advertir que la segunda incumple la nueva comprobación de seguridad. La primera, según la propia revisión, tiene un desajuste con el pie. Además, el documento abre como «Preferencia expresa del propietario» y las tres reglas nuevas salen de una revisión propia. Conviene anotar su procedencia, como pide el párrafo final del documento. Lo ideal: una nota junto a las referencias («ambiente y detalle sí; el ventilador sobre suelo mojado, no»).
- **O5. Matices del informe en H1.** El fallo de atribución nació en el brief (H2-4, «controlar la temperatura, sueroterapia y vigilar los órganos con análisis (S3)»), no en la redacción. Conviene anotarlo en el brief para que no se repita. Además, Bruchim sí habla de vigilancia seriada en hospitalización («intensive serial monitoring of hemostasis»), así que la frase antigua era inexacta en la sueroterapia, no en todo. Por otra parte, la frase de Hall 2021 es de su Discusión y cita a otros autores (refs. 29 y 30). Es aceptable, pero no es un hallazgo propio del estudio.
- **O6. Pequeñas inexactitudes del informe.**
  - H5 dice que en la escena de casa «la persiana está subida». En la imagen está medio bajada (la mitad superior cerrada) y entra sol en franjas sobre el suelo. El problema real es el sol directo, no la persiana subida. El prompt de regeneración pide justamente una persiana «medio bajada», que ya existe.
  - La altura de la secuencia en móvil no es única: el paso 2 mide 518 px, no 498.
- **O7. Texto del SVG en el límite.** Los rótulos del SVG («Hasta la piel», «Aire puesto») se ven a unos 11,8 px reales a 390 px. Siguen siendo legibles y el paso activo en HTML nombra la escena, como pide `apoyos-visuales-responsive.md`. «Hasta la piel» queda muy pegado al borde derecho del lienzo.
- **O8. Encabezados duplicados en la estructura.** Los h4 del componente («Sácalo del calor y llama»…) repiten los h3 del artículo que vienen justo debajo («1. Sácalo del calor y llama»). No afecta al índice, gracias a `data-toc-exclude`, pero sí al esquema para lectores de pantalla y a la proyección Markdown. Bastaría con usar `<p><strong>` en los pasos.
- **O9. Redacción del componente de umbrales.** «Tu perro mayor va por delante del aviso amarillo» se entiende con esfuerzo: es su riesgo el que llega antes. El antetítulo («Temperatura máxima del aire prevista para el día») y la nota («Las dos referencias son temperaturas del aire») interpretan la guía del Ministerio, que solo habla de «temperaturas superiores en torno a 30 ºC». Es razonable, pero es una lectura editorial.
- **O10. Separación de roles.** La misma sesión revisó, corrigió y creó el componente. El propietario lo encargó así («auditoría de fondo, ajustes y creación»). Esta auditoría independiente cubre esa excepción.
- **O11. Contrato del brief.** El brief fija los componentes con un «conteo exacto» (3 AlertBox, 1 FAQ, TablaApilable) y no prevé este componente. Lo encargó el propietario, así que no es un fallo, pero conviene registrarlo en el brief o en la entrega.

## Evidencias de esta auditoría

En la carpeta de trabajo de la sesión, fuera del repositorio: resultados JSON de Playwright y capturas aisladas de cada paso y zona (390/1366, claro/oscuro, reducido, sin JS). No añadí archivos al repositorio salvo este informe. No hice commit.
