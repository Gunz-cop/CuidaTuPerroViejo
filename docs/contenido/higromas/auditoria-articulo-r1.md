## Veredicto

**Publicable**: el artículo preserva el caso real, utiliza las ocho fuentes en sus secciones y entrega recursos visuales coherentes sin convertirlos en diagnóstico o tutorial.

Auditoría clínica, editorial y visual independiente, 15 de octubre de 2026. Archivo auditado: `src/content/blog/callosidades-higromas-codos-perros-senior.mdx`, idéntico a `scratch/higromas/articulo.mdx` al congelarse. SHA256 inicial **4ce6483969dc350f603254e6172e17ec8034c95a95f27c77db8574e2e6e05d6d**. Contrato: brief canónico adaptado a San Bernardo y ampliación de tres fotos, infografía y tres animaciones.

No se corrigió artículo, brief, inventario, componentes o imágenes durante la auditoría. El coordinador ejecuta build, navegador y accesibilidad por separado; este dictamen no presenta esos controles como propios ni autoriza un despliegue.

## Hallazgos

### P0 y P1

**Ninguno detectado en el cuerpo y los recursos revisados.** Los pendientes manuales de lectura integral, autoría/datos, trazabilidad, visuales, alt y restricciones se levantaron expresamente.

La narrativa contiene cautelas sobre el alcance del resumen y los datos no documentados (líneas 183 y 405). Se revisaron como posible fuga del brief: son explicaciones dirigidas al lector sobre límites del caso, no instrucciones para un redactor. No se clasifican como P0 por mencionar esos límites.

### P2 / alcance técnico

El parser de la métrica oficial no reconoce el formato actual del brief (targets sin “Target:” y tabla F1–F8). También informa dos imágenes interiores como “sin referenciar”, pese a sus etiquetas HTML presentes y válidas. Estos son límites del instrumento, no omisiones del artículo. No se atribuye valor de validación al “APTO CON AVISOS” automático.

La fuente MDX contiene `status: "Borrador"` al congelarse. La ruta Astro se construye igualmente, pero `src/lib/assistant/catalog.ts`, línea 24, sí filtra el catálogo por `Publicado`. El coordinador identificó esa incoherencia con el control de descubrimiento y prepara únicamente el cambio de status. La documentación antigua de la skill sobre status no puede extrapolarse al catálogo actual. Un cambio aislado de ese campo no altera esta evaluación del cuerpo ni implica publicación externa; debe registrarse su nuevo hash y resultado técnico.

## Comprobaciones mecánicas

Comandos ejecutados: script oficial `metricas.mjs`, contador visible `scratch/higromas/contar.py` después de leer su implementación, SHA256 y comprobación independiente de párrafos HTML de FAQ.

| Sección | Palabras visibles MDX | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 609 | 600 | +1,5 % |
| Callo, higroma y otros bultos | 1.079 | 1.100 | −1,9 % |
| Presión repetida / caso bilateral | 838 | 900 | −6,9 % |
| Preparar el descanso | 961 | 1.000 | −3,9 % |
| Tratamiento según lesión | 1.259 | 1.300 | −3,2 % |
| Cierre del caso | 627 | 600 | +4,5 % |
| Conclusión y siete FAQ | 841 | 800 | +5,1 % |
| **Total MDX visible** | **6.214** | **6.300** | **−1,4 %** |

Todas las secciones quedan dentro de ±15 %. El contador excluye frontmatter, imports, URLs, atributos, alt, código y bibliografía; convierte FAQ en preguntas/respuestas visibles. Incluye encabezados. Al excluir también encabezados arroja **5.971**; no incluye los textos encapsulados en las animaciones. Estos deben sumarse en el DOM y no estimarse como cero. El coordinador aportará el conteo final renderizado que cierre el intervalo global 6.000–6.500.

Los **6.621** de la métrica oficial son tokens de fuente bruta: incluyen código/URLs/bibliografía y no son comparables con la prosa contratada. Se descarta esa cifra como prueba de exceso de volumen.

| Densidad / estructura | Resultado |
|---|---|
| Prosa MDX según script oficial | 169 párrafos; media 31; mediana 37; máximo 42 palabras |
| Párrafos >50 palabras | 0 % |
| FAQ, comprobación adicional | 18 párrafos HTML; media 35,17; mediana 37; máximo 41; 0 % >50 |
| Fragmentos <12 palabras | Dos; énfasis legible, sin citas partidas ni frases truncadas |
| H2 / H3 | 6 / 37; cadencia global aproximada 179 palabras/H3 |
| Metadatos | seoTitle 43; metaDescription 141; pilar válido |
| Fecha / byline | 2026-10-15 en ambos |
| Rutas editoriales | Siete destinos obligatorios presentes en contexto |
| H1 / automatismos | Sin H1, TOC o JSON-LD insertados manualmente |

Los conteos de párrafos no prueban el límite de tres líneas en todos los dispositivos; la comprobación de navegador móvil pertenece al coordinador.

## Componentes y recursos

| Elemento | Comprobación |
|---|---|
| AlertBox narrativos | info línea 53; danger línea 129; warning línea 379 |
| Cuadro de fuentes | Cuarto AlertBox info línea 465; correcto, no exceso de cajas |
| FAQ | Siete preguntas finales, respuestas como párrafos separados |
| Animación presión | H2-2, línea 153; no inevitable lesión ni anatomía exacta |
| Animación acolchado | H2-3, línea 223; no medida de presión ni garantía de curación |
| Animación seguimiento | H2-4, línea 391; observación/consulta/reevaluación, sin diagnóstico o técnica invasiva |
| Hero | WebP San Bernardo en cama; frontmatter/alt coinciden |
| Foto acceso | Línea 235; San Bernardo hacia cama por corredor; alt coherente |
| Foto observación | Línea 437; cuidadora observa sin manipular; alt coherente |
| Infografía | Línea 137; 1600×1000, alt, resumen textual y enlace para ampliar |

**Inspección visual efectiva:** abrí las cuatro WebP mediante view_image. Las tres fotografías muestran un San Bernardo de pelaje blanco/castaño, máscara negra y orejas caídas, con continuidad de sujeto y entorno doméstico. No hay otro perro/raza, heridas, supuración, agujas o escenas de antes/después. La edad de las ilustraciones no pretende documentar al paciente publicado.

La infografía ilustra piel engrosada frente a cavidad con líquido y valoración veterinaria; incluye aviso de que el esquema no permite diagnosticar por fotografía. No contiene lesiones fotográficas ni afirma diagnóstico por parecido.

Se leyó íntegro `HigromaAnimation.astro`: dibujos no anatómicos, mensajes clínicos acotados y fuentes específicas. No enseña aspiración, drenaje, vendaje o dosificación. Las controles de reproducción/pausa, estado inicial detenido, versión estática y reduced motion están implementados; su ejecución efectiva y accesibilidad se prueban en navegador por el coordinador, no se deducen solamente de esa lectura.

## Verificación clínica y fuentes

Se reutiliza la evidencia web comprobada en las auditorías R1/R2 de este mismo hilo. No se afirma nueva lectura de los ocho documentos en esta auditoría de artículo. Las afirmaciones específicas del MDX se compararon con los pasajes ya leídos; no aparecieron nuevas cifras, autorías o recomendaciones clínicas que exigieran ampliar aquella verificación.

| Fuente | Uso comprobado fuera del cuadro final | Afirmación / límite preservado |
|---|---|---|
| Pavletic y Brum, PMID 25640711 | Introducción, H2-2, H2-5 | San Bernardo macho castrado de un año, bilateral; izquierdo drenaje cerrado tres semanas y cama blanda; sin recidiva izquierda durante 18 meses; derecho no operado algo mayor. Sin emociones, nombre o evolución posterior inventados. |
| Verhoeven, Huels y Harms, PMID 37567180 | H2-4, FAQ7 | Cuatro lesiones/tres perros; evidencia pequeña sin superioridad universal o garantía. Cifra visible en resumen previamente verificado. |
| Angelou et al., PMID 32043576 | H2-4, FAQ6 | Veintiún higromas/diecinueve perros, retrospectivo, recidivas Penrose/rescate. Se distingue de drenaje cerrado del caso F1. |
| Loeffler et al./ISCAID 2025 | H2-1, H2-4, FAQ1/5 | Callo no infectado frente a piodermia, citología, profundidad, clorhexidina sin pauta autónoma. |
| AAHA Pain Management 2022 | H2-3 | Peso y adaptación ambiental como manejo general; no ensayo de curación de higromas. |
| AAHA Senior Care 2023 | H2-2, H2-3, H2-5 | Vídeos, movilidad, confort, accesos y camas. |
| Merck, Hygroma in Dogs | H2-1, H2-2, H2-4, FAQ | Definición, mayores con artrosis, diferenciales, aspiración clínica, cultivo/biopsia y riesgo corticoides intrahigroma correctamente atribuidos. |
| Montoya y Tobias | H2-3, H2-4 | Descarga, ajuste y riesgo almohadilla circular en ulceración/reconstrucción. Sin tutorial doméstico. |

No hay fuente únicamente decorativa o solo presente en bibliografía. Los enlaces profundos son los verificados en el brief. Se distingue claramente la evidencia de resúmenes de los textos completos consultados.

## Lo que sí funciona

El artículo conserva las diferencias entre callo/higroma y evita probabilidades de tumor inventadas, causa artrósica universal, prescripciones preventivas a callos sanos o promesas comerciales de curación.

El caso tiene apertura, desarrollo y cierre propio antes de conclusión. La raza es San Bernardo en narrativa y todos los recursos. La distinción entre paciente de un año e ilustraciones senior está explícita y no es un fallo. La autoría editorial corresponde al equipo y no se inventa una revisión veterinaria firmada o una vivencia personal.

Se preservan las ocho fuentes en contexto, los siete enlaces, la calculadora con sus límites y advertencias proporcionadas. No se han filtrado etiquetas F1/F2, instrucciones al redactor o anotaciones de planificación.

## Qué corregir, en orden

**No hay correcciones clínicas o editoriales bloqueantes.**

1. Registrar el cambio aislado de status/nuevo hash y cerrar comprobaciones del coordinador: conteo DOM con componentes, build/descubrimiento, móvil y controles accesibles.
2. Si cualquiera de esos controles técnicos falla, resolverlo antes de publicar; este dictamen no convierte su estado pendiente en aprobado.
3. No reescribir el caso ni ampliar afirmaciones para acomodar métricas. Conservar los límites de evidencia, el etiquetado ilustrativo y las advertencias.

No se requiere otra ronda clínica por el cambio aislado de status. Cualquier modificación de cuerpo, imágenes o mensajes clínicos posterior a los hashes revisados necesitaría evaluación de su alcance.

## Nota de integración posterior al dictamen

Se comprobó por comando que el MDX actual tiene SHA256 **d0a06783601b8390a754945a888187adced8b216eef9ce734e0d2cc7aab7c5cb** y que su única diferencia con el congelado es `status: "Publicado"`. La evaluación del cuerpo se mantiene.

El coordinador comunica conteo DOM de **6.473 palabras**, excluyendo bibliografía, alt, imports y title/desc accesibles duplicados del SVG; incluye encabezados, FAQ desplegado, textos/etiquetas/controles de componentes. Cierra el intervalo contractual 6.000–6.500 sin usar un estimado de fuente MDX. Es medición del coordinador, no una ejecución del auditor.

Las pruebas de navegador comunicadas de reproducción/pausa en tres animaciones, reduced motion y fallback sin JS pasan. Continúa en revisión técnica la proyección de contenido de un wrapper custom, que se convertirá a div nativo sin alterar textos, y el overflow móvil detectado. **No se declara todavía build o viewport final aprobados.** El veredicto clínico/editorial/visual permanece válido y separado de esa compuerta técnica.

## Adenda final — integración cerrada

**Versión final auditada: SHA256 ec790e6556f30b039dad579440363569770012dbb9fdf08886e4d5ed8b77406d.** Comprobado por comando. Frente al artículo congelado, solo cambia el status a Publicado y el atributo de FAQ `title="Dudas frecuentes"`. No cambian preguntas, respuestas, narrativa, citas o datos clínicos. El título abreviado resuelve el desbordamiento del encabezado predeterminado sin modificar contenido médico.

Se revisó la implementación final del componente: usa div nativo con `data-higroma-animation` y activación por script, conserva figura/SVG/títulos/descripciones/explicaciones/fuentes y controles, además de parada y limpieza al navegar. Los mensajes clínicos revisados siguen iguales; no requiere abrir otra vez las fuentes.

Se leyó el registro final [verificacion-navegador.json](./verificacion-navegador.json): **10 de 10 comprobaciones pasan**, incluyendo cuatro imágenes cargadas, tres animaciones reproducibles/pausables sin autoplay, reduced motion, versión sin JS, único H1, ausencia de excepciones y sin desbordamiento a 375/1280 px. El conteo DOM final registrado es **6.473 palabras**, dentro del contrato. Son pruebas ejecutadas por el coordinador y contrastadas por el auditor mediante su registro, no una segunda ejecución independiente.

El coordinador comunica además build completo con 29 documentos y astro check con cero errores/cero warnings; los 58 hints son previos. Su evidencia técnica se entrega por separado. Esta adenda sustituye los estados técnicos pendientes de la nota anterior.

**Veredicto final: Publicable.** No quedan correcciones clínicas, editoriales o visuales necesarias. La aprobación del entregable no implica publicación, push o despliegue.

