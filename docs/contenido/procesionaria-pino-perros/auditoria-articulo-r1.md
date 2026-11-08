# Auditoría independiente del artículo de procesionaria — R1

Fecha: 2026-11-06. **Ronda del artículo: 1/5**, contador nuevo autorizado por el propietario; no se suma a las dos rondas del brief. Auditor: sesión `auditar_articulo_procesionaria`, separada del autor y de quien corrige. Archivo revisado: `docs/contenido/procesionaria-pino-perros/redaccion/procesionaria-pino-perros.mdx`. SHA-256 comprobado: `e4d5e5bef2483a347188af006730bbd9a801252962915d68c81137684fa58782`.

Contrato: brief v2 aprobado, objetivo 5.750 palabras y rango estricto 5.500–6.000. Alcance encargado: **solo texto**; tres imágenes planificadas pendientes. R1 completa; las siguientes rondas conservarán esta sesión y comprobarán únicamente ajustes y bloqueantes derivados. Máximo cinco intentos; detener si el quinto falla.

## Veredicto

**No apto para cierre de la redacción:** el cuadro bibliográfico sustituye los títulos reales exigidos por paráfrasis, por lo que necesita un ajuste localizado de trazabilidad.

No se ha encontrado una afirmación científica falsa, pauta farmacológica indebida, caso inventado ni incumplimiento del volumen. Este veredicto no pide reescribir el desarrollo ni producir imágenes. La aprobación eventual será del texto, no de una publicación con recursos completos.

## Hallazgos

### P0

Ninguno confirmado.

### P1 — Títulos bibliográficos sustituidos por paráfrasis

**Ubicación:** líneas 388–392, cuadro «Fuentes científicas y de autoridad». Ejemplos: «Niza y colaboradores: 41 casos de contacto con procesionaria en perros, 2012» y «Kaszak, Planellas y Dworecka-Kaszak: revisión del riesgo por contacto con procesionaria en perros, 2015».

Los enlaces apuntan a los documentos correctos y las autorías son correctas, pero estas frases no son sus títulos reales. La skill `redactar-articulo-blog`, Fase 3.4, exige como ancla «el título real del documento citado». Conservar ese título permite identificar el trabajo fuera del enlace y comparar la referencia con el original. No es un fallo clínico ni un DOI erróneo; sí un requisito de trazabilidad pendiente antes del cierre.

**Corrección exacta:** conservar cada URL y sustituir las cinco anclas del cuadro por los cinco títulos registrados en §3 del brief; institución/autor y año pueden quedar fuera del enlace. Para S3 usar *Effects of Pine Processionary Caterpillar Thaumetopoea pityocampa Contact in Dogs: 41 Cases (2002–2006)*; para S4, *Pine processionary caterpillar, Thaumetopoea pityocampa Denis and Schiffermüller, 1775 contact as a health risk for dogs*. No cambiar las citas contextuales del cuerpo, las afirmaciones ni sus límites.

### P2 / observación de maquetación para la fase de publicación

La prueba del coordinador a 390 px registra un máximo de ocho líneas por párrafo y 137/138 párrafos por encima de tres, con fuentes externas bloqueadas y tipografía de sistema. Por tanto, **no se acredita el límite físico literal de tres líneas**. La redacción sí tiene párrafos breves según el indicador editorial: media 35,81 palabras, máximo 45 y 0 % por encima de 50. No se solicita recortar mecánicamente a fragmentos ni cambiar estilos globales en este encargo solo textual; revisar la lectura física al completar la maquetación con tipografía y recursos definitivos. No declarar ese control como aprobado.

## Mediciones repetidas por el auditor

Se comprobó el hash del MDX y su igualdad con la copia compilada en `/tmp/procesionaria-build/src/content/blog/`. Se ejecutó de nuevo el medidor DOM del coordinador tras leer su método, sobre el HTML real generado por Astro; el resultado es reproducible. Se excluyen bibliografía, scripts/estilos, imágenes/alt y pies; se incluyen encabezados, listas, títulos/texto de AlertBox y las preguntas/respuestas FAQ aunque estén plegadas.

| Bloque | Palabras reales DOM | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 133 | 150 | −11,33 % |
| Señales de contacto | 810 | 800 | +1,25 % |
| Antes de llegar | 1.122 | 1.100 | +2,00 % |
| Información y valoración veterinaria | 949 | 900 | +5,44 % |
| Después del alta | 1.038 | 1.000 | +3,80 % |
| Prevención en España | 1.163 | 1.100 | +5,73 % |
| Conclusión | 104 | 100 | +4,00 % |
| FAQ | 618 | 600 | +3,00 % |
| **Total** | **5.937** | **5.750** | **Dentro de 5.500–6.000** |

Densidad DOM: 138 párrafos, media 35,81, mediana 36, máximo 45; 0 % >50. Las 26 subsecciones H3 corresponden al plan de 4/6/5/5/6 y conservan decisiones distintas. Tono, repetido con `tono.py`: tres muletillas, **0,6/1.000**, dentro del umbral ≤3. El denominador de ese script (5.339 palabras) excluye FAQ y cuadros de seguridad: es una medición de tono, no el conteo contractual.

Frontmatter parseado con YAML: `seoTitle` 45 caracteres, meta 143; pilar válido, fecha 2026-11-06 y sin campos extra de credenciales. Sin H1 manual, firma duplicada, instrucciones del brief filtradas, caso propio o experiencia de Luna/Dakota. Tres AlertBox de cuerpo (info/danger/warning) y uno bibliográfico aparte; FAQ de siete elementos cerrados inicialmente. Los cuatro destinos internos obligatorios aparecen en sus contextos.

### Límites del script mecánico del repositorio

Se ejecutó `metricas.mjs` sobre el checkout temporal con la copia exacta del artículo y del brief. Devuelve NO APTO: sus expresiones de parseo no reconocen los targets y la tabla S1–S5 de este brief; su conteo bruto de 6.167 incluye sintaxis/elementos que el contrato excluye y agrupa FAQ/bibliografía en «Conclusión». También marca las tres imágenes inexistentes.

Esos resultados no se ocultan ni se presentan como defectos editoriales confirmados: el contrato, fuentes, enlaces y distribución se comprobaron manualmente y mediante DOM. Las imágenes están pendientes por alcance expreso solo texto. Los fragmentos JSX de FAQ que el script enumera tampoco son párrafos publicados. No se modificó el script para producir un APTO.

## Fuentes abiertas y afirmaciones contrastadas por el auditor

Las cinco se abrieron en esta ronda; identidad y pasaje se contrastaron por separado. No se adoptó el reporte del autor como prueba de lectura. Se mantiene la limitación de S3 al Summary editorial; no se presume texto completo.

| Fuente | Afirmación y localización comprobadas | Uso real y límites |
|---|---|---|
| S1 COLVET/Murcia, 28-02-2026, URL de campaña del brief | «Reacciones inflamatorias», líneas 86–88 de extracción: síntomas, atención inmediata ante sospecha y agua templada sin fricción/manipulación. | Introducción y H2-1/2. El artículo conserva urgencia, arrastre superficial y omisión si resulta inseguro; no promete neutralización o supervivencia. |
| S2 Generalitat Valenciana, 05-03-2021, aviso fitosanitario | Apartados de daños/actuación/prevención, líneas 173–190: protección, evitar vómito, exposición y aviso local. | H2-2/5. No reproduce bicarbonato, poda o retirada doméstica de la fuente antigua; agua templada atribuida a S1. |
| S3 Niza et al., volumen 2012; DOI 10.1111/j.1863-2378.2011.01415.x | Autoría editorial y Summary, líneas 171–174: serie retrospectiva de 41 perros y necrosis también antes de dos horas. | H2-3 y FAQ. Portugal identificado; asociación, sin ventana segura, porcentajes propios o pronóstico por edad. |
| S4 Kaszak, Planellas y Dworecka-Kaszak, 2015; DOI 10.17420/ap6103.02 | Cabecera PDF; Clinical approach/Clinical signs, pp. 160–161: pelos desplazados, afectación oral/ocular, respiración, evolución en días y posible soporte alimentario. | H2-1/3/4. No transcribe tratamientos/dosis históricos ni recetas; distingue revisión de 2015 del plan actual de la clínica. |
| S5 ICOVAL, 23-01-2026, aviso de Alicante | Apertura y recomendaciones 2–4, líneas 28–39: aparición local temprana y valoración de signos incluso leves. | H2-3/5. Ejemplo provincial fechado, no alerta nacional actual ni predicción; sin extrapolación geriátrica. |

La trazabilidad por H2 está completa; ninguna fuente queda solo en el cuadro final. Los límites conservadores del lavado se sitúan junto a la maniobra y no se atribuyen como ensayo. Organización del traslado, lista de llamada y registro doméstico son propuestas prácticas, no tratamientos validados. No hay dosis, instrucciones de auto-inyección, receta de alimentación, causalidad inventada o recuperación fabricada.

Se abrieron además las cuatro URL públicas internas: pilar Salud, chequeo geriátrico, vacunas/desparasitación y calculadora. Devuelven contenido coherente con sus destinos. La calculadora se presenta después de la atención y nunca decide urgencia o pronóstico. No se ha repetido un recorrido interactivo de la herramienta: su funcionamiento completo sigue como gate técnico de publicación.

## Recursos y evidencia técnica

| Recurso/control | Estado comprobado | Alcance pendiente |
|---|---|---|
| Texto de acciones, lista de llamada y registro | Redactados en sus H2; sin descargas o formularios ficticios. | Ninguno editorial adicional. |
| Hero + dos imágenes de cuerpo | Tres rutas planificadas, sin binarios; no hay duplicación de hero en cuerpo. | Producir/inspeccionar o retirar antes de publicar. No evaluadas visualmente. |
| FAQ | Siete preguntas y respuestas; HTML con siete `details` y cero `open`, comprobado por auditor. | Pruebas de navegador del coordinador leídas como evidencia ajena. |
| Build Astro y proyección Markdown | El coordinador ejecutó `npx astro build` con salida 0 en checkout temporal. Auditor comprobó igualdad del MDX y leyó HTML generado. | No se afirma haber repetido el build ni un despliegue. |
| Móvil/escritorio, claro/oscuro | `redaccion/verificacion/navegador.json` del coordinador: sin desbordes, siete FAQ, apertura/cierre por teclado, sin anclas perdidas ni errores JS. Auditor abrió capturas móviles de bibliografía/FAQ. | No se afirma haber repetido interacción; fuentes externas abortadas y tres imágenes pendientes. Límite literal de tres líneas no acreditado. |

El `status: Publicado` del YAML no filtra el build; el artículo revisado permanece en el expediente y la copia de compilación en un checkout temporal, no en producción. No se ha autorizado ni confirmado publicación.

## Lo que sí funciona

- Respuesta urgente en la primera frase, previa a fisiología o ampliación; el lavado no se convierte en requisito para salir.
- Guía sin caso, autoría real automatizada y separación explícita entre dato observado y diagnóstico.
- Serie portuguesa y revisión histórica atribuidas con límites; ninguna cuota bibliográfica se rellena con fuentes débiles.
- Distribución, tono, enlaces y seguimiento individual coherentes con el brief v2; no tocar estos bloques para corregir las anclas.

## Qué corregir, en orden

1. Sustituir únicamente las anclas bibliográficas de las líneas 388–392 por los títulos reales de §3 del brief, manteniendo URLs, institución/autor y año.
2. Entregar el nuevo hash a esta sesión para R2. Verificar el diff, las cinco anclas y la invariancia del texto/volumen; no repetir auditoría completa de fuentes ni reiniciar contador.
3. Mantener imágenes, tipografía/maquetación final y publicación como gates posteriores; no generar recursos visuales para cerrar esta corrección textual.

Rondas consumidas: **1/5 del artículo**. Auditor no ha corregido el MDX, el brief ni el inventario.
