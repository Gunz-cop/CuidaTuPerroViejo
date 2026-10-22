# Auditoría independiente del artículo integrado — ronda 2 de 3

- Fecha: 2026-10-22.
- Auditor: `/root/auditor_articulo`, separado de autor, corrector, productor de imágenes/componentes y verificador técnico. No he corregido producción.
- Antecedente: [ronda 1](auditoria-articulo-r1.md), NO APTO provisional; contador único de texto y recursos, sin ronda visual aparte.

| Archivo contractual o de producto | SHA-256 comprobado personalmente |
|---|---|
| `briefings/briefing-mal-aliento-perros-viejos.md` | `24e9a3003c54d91350918eb7891635b6767c0c81afa1179448dc1e737cb57f9f` |
| `src/content/blog/mal-aliento-perros-viejos.mdx` | `6913314b0400dd6d071296c682a2d724775cdecb03008ff1b0b4839349634deb` |
| `src/components/article/HalitosisRecursos.astro` | `e065d8b69ae45cd9609f8d3ca9f4e41d7231ce2b9873b401ad5eedc619d9c6fc` |

El brief tiene APTO en su [tercera y última ronda](auditoria-brief-r3.md). Se han contrastado además los doce archivos de imágenes —tres originales PNG y nueve WebP— contra los bytes y hashes de `imagenes.json`: todos coinciden. El borrador de R1 se conserva como evidencia histórica y no es el MDX vigente.

## Veredicto

**APTO con avisos preexistentes — artículo completo y R1–R7 aptos para revisión en PR:** las correcciones están resueltas y el conjunto integrado entrega sus recursos, con dos limitaciones del layout compartido explícitamente documentadas.

Se cierra en la **ronda 2 de 3 del artículo**, sin reinicio del contador. No hace falta una tercera ronda sobre esta versión. Este APTO editorial/técnico local no acredita revisión veterinaria ni autoriza fusión, publicación o despliegue; tampoco declara accesibilidad perfecta de componentes compartidos.

## Cierre de hallazgos anteriores

| Hallazgo R1 | Comprobación del auditor | Estado |
|---|---|---|
| P1, dolor intenso/constante | Diff completo frente al borrador histórico: la caja `danger` ahora dice «dolor intenso **o** constante». La tarjeta R4 mantiene la misma disyunción. Coincide con F6, abierta y contrastada personalmente en R1. | Cerrado |
| P1, `status` incompatible | El MDX omite el campo conforme al brief R3. El default técnico permite catalogar la ruta; no se ha cambiado el catálogo global. Los logs posteriores de build y proyección son correctos. Inventario/expediente mantienen «no publicado». | Cerrado |
| P2, reiteraciones del registro | El diff elimina las dos reiteraciones del H3 de fotos/vídeos; la libreta compartida y los datos desconocidos se concentran en el registro. El H2 sigue dentro de su presupuesto. | Cerrado |
| Anclas detectadas por QA | Leí el componente final y comprobé en navegador sus tres destinos: los fragmentos Unicode resuelven a IDs reales. | Cerrado |

No se han encontrado nuevos P0 o P1 del artículo o recursos. El diff completo del MDX frente al auditado en R1 contiene únicamente la omisión de `status`, la conjunción y el recorte descrito: no introduce fuentes, hechos clínicos ni cambios de enfoque sin revisar.

## Métricas finales repetidas

He ejecutado el contador sobre el MDX vigente y un conteo independiente que elimina frontmatter/imports, bibliografía, sintaxis y URL, conserva texto de enlaces/encabezados/pies/listas y extrae preguntas/respuestas FAQ. Ambos producen **5.862 palabras editoriales útiles y 6.265 brutas**. Los componentes externos no se usan para llegar al objetivo.

| Bloque | Palabras útiles | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 210 | 200 | +5,0% |
| Cuándo consultar | 641 | 650 | −1,4% |
| Qué puede decirte el olor | 437 | 450 | −2,9% |
| Causas en boca, dientes y labios | 896 | 900 | −0,4% |
| Otras causas y acompañantes | 785 | 800 | −1,9% |
| Qué observar y anotar | 580 | 650 | −10,8% |
| Cómo busca la causa el veterinario | 786 | 800 | −1,7% |
| Mientras llega la consulta | 589 | 600 | −1,8% |
| Evolución después de la consulta | 398 | 400 | −0,5% |
| Conclusión y FAQ | 540 | 550 | −1,8% |
| **Total** | **5.862** | **6.000** | **−2,3%** |

Todos los bloques cumplen ±15%. El contador editorial identifica 133 párrafos, media 37,2, mediana 37, 0% por encima de 50, máximo 50; 34 H3, ningún tramo superior a 200 palabras. `tono.py` repetido por el auditor: dos muletillas y **0,4/1.000**, usando sus exclusiones propias (5.602 palabras). SEO 55 caracteres y meta 148; estructura: tres cajas narrativas más bibliografía, FAQ de siete preguntas y cuatro enlaces internos comprometidos.

También ejecuté el [script vigente sin modificar, con `--strict`](auditoria-articulo-r2-metricas.txt): devuelve código 1 por los cuatro desacuerdos de parser/método ya explicados en R1 —rango, tabla F1–F12, bibliografía incluida en el cierre y byline manual—. Se han levantado manualmente: rango 5.100–6.900 explícito; tabla completa y fuentes verificadas; cierre editorial 540/550; firma/IA reales de `ArticleByline`, comprobadas en navegador. No se declara que el script haya pasado ni se modifica el contrato para adaptarlo a su regex.

## Fuentes, utilidad y límites clínicos

La [tabla de verificación independiente de R1](auditoria-articulo-r1.md#verificación-independiente-de-fuentes) documenta mis aperturas personales de las doce fuentes, título/identidad, afirmación y localización. La comparación exacta del texto confirma que en R2 no han cambiado enlaces, atribuciones o afirmaciones clínicas: conservo esa verificación propia, **sin afirmar que haya vuelto a abrir doce páginas en esta ronda**.

| Grupo y fuentes | Afirmación/localización ya comprobada | Cobertura final conservada |
|---|---|---|
| F1 UC Davis; F3 PDSA halitosis | Causas orales/extraorales, dieta y necesidad de evaluación; preguntas de causas y apartado de consulta. | H2 1–4/6/8 según asignación. Sin mapa olor→diagnóstico. |
| F2 Merck periodontal; F4 Merck trastornos orales; F5 Cornell | Biofilm/respuesta, signos, labios, ingesta, examen completo/radiografía y cuidados según indicación. | H2 3/5/6/7; esquema conceptual y límites fieles. |
| F6 Merck, tabla de consulta | Atención inmediata ante signos graves y dolor intenso **o** constante; contacto pronto ante otros cambios. | H2 1 y resumen R4 corregidos, sin plazos caseros que retrasen atención. |
| F7 PDSA renal; F8 Merck páncreas | Síntomas acompañantes, evaluación renal/metabólica y urgencia del deterioro; Symptoms/Diagnosis y Diabetes Mellitus. | H2 4. Sin función renal deducida del olor, insulina/dieta de prueba ni definición digestiva retirada. |
| F9 AAHA dental; F10 AAHA senior 2023 | History and physical examination; anestesia individual, odontología y objetivos de cuidado. | H2 5/6/8 y registro editorial; no revisión veterinaria ficticia ni escala propia validada. |
| F11 FDA; F12 Illinois | Productos con xilitol y llamada urgente; cambios orales/lesiones/sangre y exploración. | H2 7 y 3, respectivamente; sin dosis tóxicas ni diagnóstico de cáncer por olor. |

Cada una de las doce referencias se utiliza fuera de la bibliografía y dentro de un H2 asignado. La síntesis del componente se leyó junto a sus fuentes y al texto final. Las tres escenas se identifican como ilustraciones; el esquema dental no se presenta como fotografía, vídeo, calendario o progresión inevitable.

La diferenciación frente a salud dental se conserva: causas del síntoma, acompañantes, decisión de consulta, comunicación, evaluación y seguimiento. No se ha añadido tutorial de cepillado, catálogo comercial ni otra explicación de los pasos de profilaxis. El recorte de reiteraciones mejora la utilidad sin alterar el contenido de seguridad.

## Recursos integrados: comprobación final

| Recurso | Evidencia de entrega y revisión | Resultado |
|---|---|---|
| R1 hero/referencia | WebP y originales/variantes con hashes verificados; imagen abierta personalmente en R1 y sin cambio de hash. Labrador chocolate senior reconocible, canas, collar/mancha, anatomía plausible y observación sin manipular. Alt corresponde. | Completo; carga comprobada. Aviso de `srcset` compartido abajo. |
| R2 comida | Mismo sujeto/cuidadora, cuenco bajo y registro sin maniobra dolorosa; archivo inspeccionado, hash conservado, alt/caption fieles y variantes reales. | Completo |
| R3 consulta | Mismo perro senior tumbado, conversación sin procedimiento ni credencial inventada; archivo inspeccionado, hash conservado y alt fiel. | Completo |
| R4 infografía | Tres prioridades visibles, texto además del color, corrección clínica y tres anclas verificadas personalmente en las seis vistas. | Completo |
| R5 proceso | Código/SVG y cuatro vistas leídos; muestra superficie, margen, respuesta y zona oculta. Interacción manual, reinicio, pausa y alternativa reducida/sinJS probados personalmente; pruebas extensivas identificadas de QA. | Completo |
| R6 tabla | Cuatro filas breves con `TablaApilable`/`data-label`; captura móvil oscuro inspeccionada y ancho/altura comprobados personalmente. | Completo |
| R7 registro | Ocho campos plegados al cargar, sin envío/puntuación; impresión de campos sinJS probada personalmente. Inspeccioné captura con los ocho valores; QA prueba además impresión general/aislada y restauración. | Completo |

Inspeccioné las capturas finales de prioridades móvil oscuro, proceso móvil claro vista 3, proceso escritorio oscuro vista 4, tabla móvil oscuro y registro impreso con los ocho valores. Texto legible, avisos visibles, controles junto al dibujo y sin anatomía clínica generada en el esquema. Las tres imágenes del perro ya fueron abiertas visualmente por mí en R1; he comprobado ahora que sus bytes no han cambiado.

## Pruebas propias y evidencia de otros roles

### Repetición propia en navegador

Ejecuté Playwright con Chromium local contra `http://127.0.0.1:4321`, bloqueando solicitudes externas, sin enviar formularios ni datos. [Resultado propio](auditoria-articulo-r2-navegador.json):

- 375, 390 y 1366 px, claro/oscuro: documento sin desbordamiento, desplegables cerrados, firma IA visible, tres imágenes decodificadas, anclas de R4 válidas, sin autoplay.
- Las cuatro vistas manuales y el reinicio funcionan en las seis combinaciones. Pausa estable durante más de seis segundos, sin avance; reproducción desactivada con movimiento reducido y avance manual operativo.
- Sin JavaScript: cuatro explicaciones visibles, ningún control de reproducción inerte visible; ocho campos imprimibles aun con el registro plegado. Cero errores JavaScript en mis contextos.

| Altura inicial medida por mí | 375 px | 390 px | 1366 px |
|---|---:|---:|---:|
| R4 prioridades | 699 | 699 | 670 |
| R5 proceso | 690 | 697 | 812 |
| R7 registro | 493 | 493 | 416 |
| R6 tabla | 730 | 730 | 304 |

Ningún recurso inicial supera 900 px en móvil; alturas iguales en ambos temas. No confundí `naturalWidth` del DOM con dimensiones del archivo: en imágenes con descriptores `w` puede ser una medida corregida por densidad. Los archivos y sus tamaños reales se contrastan con el manifiesto; las URL seleccionadas quedan en la evidencia.

### Evidencia identificada de QA y coordinación

He leído y contrastado el JSON final de QA: **103/103**, cero errores JS y cero fallos locales; sus hashes coinciden con los archivos congelados. QA cubre adicionalmente contraste calculado/axe, teclado y foco, objetivos de 44 px, final finito, doble inicialización, limpieza de temporizadores mediante eventos simulados, ocho valores en impresión general/aislada, restauración tras impresión y PDF A4 de una página. No me atribuyo haber repetido todos esos casos.

Los apoyos nuevos registran contraste mínimo **4,50449:1 claro y 5,52:1 oscuro**, con sus detalles abiertos. Revisé código de controles, gestión de eventos y reglas de impresión junto a esa evidencia. La reproducción muestra cambios didácticos reales, no solo tarjetas de texto ni movimiento ornamental.

He comprobado los [resultados de coordinación](qa/checks/resultados.tsv): 19/19 comandos con salida 0, incluidos Astro check/build, tests, inventario, discovery, proyección/API/routing, crecimiento, semántica y empaquetado `--dry-run`. Los tests solapados no se suman como independientes. Tras las dos anclas corregidas se repitieron tipos/build/discovery/proyección/API/semántica: logs correctos, 34 documentos. **Esos builds y suites los ejecutó coordinación, no el auditor.**

Inspeccioné además la proyección Markdown generada: conserva cuatro explicaciones del proceso, registro de ocho datos, advertencias, fuentes y enlaces. El control semántico independiente de CI informa coincidencia de los 34 documentos y detección de pérdida/duplicación/reordenamiento/eliminación de enlaces. No se usa el volumen del Markdown expandido para inflar el conteo editorial MDX.

## Avisos y pendientes delimitados

1. **Contraste compartido preexistente:** el botón «No del todo» de `FeedbackWidget` tiene 1,35:1 en claro. QA lo reproduce también en salud dental y alimentación sin dientes; está fuera de los recursos nuevos y el componente no se modifica. Por eso el APTO no declara conformidad AA global de toda la página.
2. **Hero compartida:** el layout anuncia un solo candidato 1200w. Las variantes nuevas 400/800 existen y se decodifican, pero no se afirma que se seleccionen para la hero móvil. QA documenta el mismo comportamiento en dos artículos existentes. Las imágenes de cuerpo sí anuncian variantes. No es un archivo roto ni justifica modificar el layout global dentro de este encargo.
3. **Metadato documental menor:** al abrir el manifiesto su primera línea aún decía «brief aprobado en ronda 2». Se ha comunicado a coordinación que debe decir ronda 3. Es una etiqueta de expediente, no cambio de contrato, producto ni motivo para una nueva ronda; los hashes auditados y el informe vigente se identifican aquí sin ambigüedad.
4. **Validación pública:** no realizada y no autorizada por este encargo. Ningún APTO local permite marcar el artículo como publicado. El PR y su revisión humana quedan como siguiente entrega de coordinación.

Las dos limitaciones compartidas no se ocultan ni se atribuyen al artículo; su corrección puede abordarse por separado. No quedan recursos comprometidos ausentes, placeholders, controles rotos o pruebas indispensables pendientes dentro del alcance local del artículo integrado.

## Lo que sí funciona

La pieza responde pronto a la necesidad del cuidador, mantiene fuentes contrastadas y evita interpretar el olor como diagnóstico. Entrega tres escenas coherentes de un senior, mapa de prioridad, proceso con controles, tabla y registro útiles. La distinción entre guía ilustrativa, evidencia clínica y responsabilidades editoriales permanece visible.

## Siguiente paso autorizado

Conservar congelados los hashes de producto auditados y entregar la rama/PR con enlaces a brief R3, auditorías R1/R2, texto, recursos, checks y capturas; indicar los avisos anteriores. No fusionar ni desplegar. Si se modifica después contenido o recursos, esta aprobación no cubre automáticamente la nueva versión.
