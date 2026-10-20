# Auditoría independiente del artículo v2 — R3/3

Fecha: 2026-10-20. Auditor: `/root/auditor_v2`, separado de los correctores editorial y técnico. Última ronda de la misma serie: R1 editorial provisional, R2 integrado y esta R3 de la corrección posterior. No se reinicia el contador ni se altera el brief APTO R2. No he corregido producto, hecho commit, push, fusión ni despliegue.

## Veredicto

**APTO — Publicable con una observación P2 de impresión:** la corrección responde antes a la intención, reduce salvedades repetidas y conserva seguridad, fuentes y recursos funcionales; el rótulo automático «Details» del registro impreso no impide leer ni conservar sus diez campos.

Este dictamen evalúa el conjunto local congelado, no autoriza publicación ni acredita comprobación pública de esta corrección. La autorización anterior de publicación no se extiende a este encargo.

## Versiones y contrato aplicado

Leídos AGENTS.md, control editorial compartido, skills de auditoría/redacción/visuales y referencia responsive, instrucciones del 20 de octubre, `correccion-2026-10-20/encargo.md`, adenda `correccion-editorial-2026-10-20.md`, brief v2 y política editorial. La adenda registra **antes de editar** que quitar repeticiones y condensar conservación puede dejar el artículo fuera del presupuesto histórico; no establece un mínimo oportunista nuevo. La cobertura útil y la seguridad prevalecen sobre reponer esas palabras.

SHA256 comprobados por mí; los siete coinciden con el manifiesto congelado:

| Archivo | SHA256 |
|---|---|
| `src/content/blog/alimentacion-perros-mayores-sin-dientes.mdx` | `fd1033851fb70cd61c040ce1c4f0c83fba6952e53541fd4e2113a531de5df376` |
| `src/components/article/AlimentacionSinDientesRecursosV2.astro` | `315146723f2ea05d62244a52725b1d89233dff95b66d9dd5481fef46b1720026` |
| `src/components/article/TablaApilable.astro` | `c640a373a219e89ec5c6c2736671a016982bec15810d1d373086e8fa0dfdc564` |
| Brief v2 | `aad66c2635a0aa719a777db3f588318ff6ddba79c4b0ec50659342eb624dd208` |
| `dist/client/alimentacion-perros-senior/alimentacion-perros-mayores-sin-dientes.html` | `a488c783b6f3d3c553a5481feba9c4d7ab54b8b368194ba5b847d2bc4f95a2db` |
| `correccion-2026-10-20/revision/lectura-interactiva.html` | `b95435d1008c9ba962c20515b969954d92ee7eb9261a2f18c4644358f93520f4` |
| `correccion-2026-10-20/revision/articulo-completo.pdf` | `a1c4830ebf08a98e3b557dc6d587a46c08287824cd8375ab786dffd97fbb42ab` |

## Hallazgos

No se detectan P0 ni P1 pendientes.

**P2 — rótulo automático en inglés en la impresión del registro.** En `AlimentacionSinDientesRecursosV2.astro:146` el clon conserva el elemento `details` abierto y elimina su `summary`. Chromium genera entonces el encabezado predeterminado «Details». Se ve en `../correccion-2026-10-20/auditor/capturas/registro-maximo-render.png`, bajo la introducción del registro. Afecta al acabado y al idioma del impreso; no oculta etiquetas, valores ni advertencias. Mi PDF máximo conserva diez valores completos, sin cortes, en una sola A4. La observación no bloquea esta entrega. No se ha aplicado ninguna corrección durante la auditoría.

## Lectura editorial, utilidad y seguridad

Leí el artículo completo, incluidas tablas, bibliografía y ocho FAQ. La apertura responde tras dos párrafos con cuatro opciones y condiciones: húmedo completo, pienso de tamaño adecuado, alimento adaptado autorizado y receta formulada. El AlertBox inicial orienta una acción comprensible; desaparece la frase sobre «acertar una receta mediante ensayos».

Los ocho H2 conservan decisiones distintas: identificar la dificultad; adecuación y cantidad; presentación; preparación; recuperación quirúrgica; conservación; enfermedad concurrente/consumo insuficiente; registro y consulta. No se amplía el artículo rechazado ni se añade un caso. La corrección del v2 recorta cierres defensivos y repeticiones de conservación, sin reemplazarlos por párrafos para recuperar volumen. La repetición que queda distingue contextos de seguridad o sirve al resumen FAQ; no domina todos los párrafos.

La textura uniforme queda condicionada a que esa adaptación se haya indicado. No se ofrecen proporciones, remojos, plazos de cicatrización ni una textura universal para disfagia. El plato llano, ancho, estable y antideslizante se explica como acceso doméstico de la lengua y estabilidad: no se inventa un ensayo ni se extrapolan gatos. La dificultad para tragar requiere valoración propia; no se aconseja hacer pruebas con mezclas más líquidas.

Se mantienen aspiración, prohibición de forzar comida/agua, urgencia respiratoria, alta quirúrgica, no manipular heridas y no alterar medicamentos. Los cálculos 100/200 kcal por 100 g y 40−10=30 g están identificados como ficticios y son aritméticamente correctos; no se convierten en raciones. No hay paciente, diálogo, resultado ni revisión veterinaria inventados. La firma real del layout y la responsabilidad editorial son coherentes con la política del sitio.

### Conteo propio y distribución

Método reproducible: `../correccion-2026-10-20/auditor/dom-r3.py`, sobre `.content-body` compilado. Se cuentan encabezados, prosa, tres tablas, AlertBox editoriales y ocho FAQ una vez, desplegadas en un clon. Se excluyen íntegramente `[data-editorial-visual]`, `[data-editorial-bibliography]`, pies, código, controles y campos. Resultado propio: **5.288 palabras**, frente a 5.858 del v2 anterior: **570 menos (−9,73%)**. Queda 412 por debajo del mínimo histórico de 5.700; se declara, no se oculta ni se rellena.

| Sección | DOM real | Target histórico | Desviación |
|---|---:|---:|---:|
| Introducción | 191 | 200 | −4,50% |
| Identificar qué parte de comer cuesta | 536 | 600 | −10,67% |
| Base y ración | 728 | 800 | −9,00% |
| Presentaciones | 548 | 650 | −15,69% |
| Preparación | 620 | 700 | −11,43% |
| Extracción | 491 | 550 | −10,73% |
| Conservación | 285 | 450 | −36,67% |
| Otra enfermedad o menor consumo | 504 | 650 | −22,46% |
| Registro y revisión | 593 | 650 | −8,77% |
| Conclusión | 138 | 150 | −8,00% |
| FAQ | 654 | 600 | +9,00% |
| **Total** | **5288** | **6000** | **−11,87%** |

Densidad propia: 113 párrafos de prosa, media 35,40 palabras, mediana 36, máximo 43, ninguno >50. Lectura física en seis vistas: 128 párrafos >10 palabras, incluidas FAQ; móvil mediana 6 líneas/máximo 8, escritorio mediana 3/máximo 4. No se certifica un máximo ficticio de tres líneas en móvil. Las capturas muestran separación y lectura cómoda.

Se ejecutó además la herramienta heredada de métricas de la skill: su log se conserva. Declara 6.046 palabras y contrato `null–null`, confunde la bibliografía/FAQ/sintaxis y no interpreta el brief vigente. No se usa su veredicto como evidencia de extensión ni aprobación. El dato contractual es el DOM propio anterior.

## Fuentes: contraste independiente

Reabrí las catorce fuentes, comprobando identidad y pasajes, antes del snapshot; después contrasté sus afirmaciones con el artículo congelado. Registro detallado y límites en `../correccion-2026-10-20/verificacion-fuentes-auditor-preparacion.md`. No se exige un ensayo inexistente para una sugerencia doméstica identificada como tal.

| Fuente | Afirmación y localización del artículo | Resultado y límite comprobado |
|---|---|---|
| UC Davis, servicio dental | Apertura y H2 presentaciones: posibilidad de comer pienso de tamaño adecuado | FAQ coincide; no permiso posoperatorio ni garantía individual. |
| AAHA Dentistry, guía senior 2023, página 2022 | H2 dificultad y registro: examen oral; vídeo espontáneo | Coincide; sin diagnóstico doméstico ni provocar la conducta para grabar. |
| Cline y colaboradores, AAHA Nutrition 2021 | H2 base, preparación, comorbilidad y registro | Historia dietética, plan individual, seguimiento y límites de etiqueta respaldados; sin fórmulas universales. |
| WSAVA, selección de alimento 2021 | H2 base: adecuación y energía por unidad | PDF leído; sin sello de marcas inventado. |
| FEDIAF, necesidades | H2 base: completo/complementario | Terminología respaldada e industria identificada. |
| Defarges, Merck esófago; revisión 2022/actualización 2025 | H2 dificultad y preparación: regurgitación y consistencia individual | Coincide; sin trasladar posturas, medicación ni dieta universal de megaesófago. |
| Kuehn, Merck neumonía; 2018/2024 | H2 dificultad y preparación: aspiración y alimentación forzada | Coincide; tos no se presenta como diagnóstico y síntomas respiratorios cambian la prioridad. |
| Barnes/Hiscox/Bellows, VCA–LifeLearn; actualización 26-04-2024 | H2 extracción: blando y revisiones durante cicatrización | Hecho general atribuido; sin copiar protocolo o fijar duración. |
| FDA, manipulación | H2 conservación: manos/material/servicio limpios | Coincide; no duración universal de papilla. |
| FDA, almacenamiento | H2 conservación: restos húmedos, envase/lote y producto alterado | Coincide; no causalidad clínica por secuencia temporal. |
| Tufts, Nutrition FAQs | H2 base y menor consumo: ingredientes y soporte nutricional | Coincide; sonda como opción veterinaria, sin procedimiento doméstico ni demora pautada. |
| Cornell, alimento senior | H2 presentaciones y comorbilidad: individualización, olor, músculo/condición | Coincide; sin importar suplementos o dosis ajenos al encargo. |
| Collins, Cornell dental | H2 dificultad y extracción: signos y cuidados tras recuperación | Coincide; ausencia de dientes no explica automáticamente todos los cambios. |
| FEDIAF, dietas caseras | H2 presentaciones: formulación profesional | Coincide; sin porcentajes secundarios no verificados ni receta improvisada completa. |

Cero URL enlazadas repetidas dentro del mismo H2; las dos citas FDA son documentos distintos, ambas en conservación. Bibliografía completa aparte; ninguna de las catorce fuentes queda exclusivamente decorativa en el cierre.

## Recursos y pruebas propias

Evidencias y scripts nuevos: `../correccion-2026-10-20/auditor/`. El JSON `navegador-r3.json` registra **98 controles superados, cero fallos**; `privados-r3.json`, 28 controles superados. No son rondas adicionales: son pruebas de esta única R3.

| Recurso | Prueba y resultado propio |
|---|---|
| Cinco escenas WebP y sus quince variantes | Decodificación, dimensiones y revisión visual de continuidad del beagle senior; alt coherentes e IA visible en hero y pies. Las dos escenas nuevas del v2 permanecen integradas. |
| Secuencias base e ingesta | Cuatro pasos distintos, avance por teclado y foco visible; temporizadores simultáneos independientes; pausa real 7 s, final finito y repetición. Controles ≥44 px. |
| Ciclo de vida y alternativas | Eventos simulados `pagehide`, visibilidad y Astro detienen reproducción; reinicialización idempotente. Movimiento reducido desactiva reproducción y permite pasos manuales sin transiciones visibles. Sin JS se leen ocho pasos y se ocultan controles inoperantes. |
| Tres tablas apilables | Seis vistas: tarjetas con `data-label` en móvil, tablas en escritorio, sin desplazamiento horizontal interno ni global. |
| Registro | Diez campos; plegado en móvil y abierto en escritorio/sin JS. Cambio 390→1366→393 conserva el comportamiento. Escribir/imprimir no envía solicitudes ni guarda valores. |
| Impresión | Con details inicialmente cerrado, PDF del sitio JS y sin JS conserva campos y ocho pasos. Registro normal/máximo: diez valores completos, una A4 en ambos casos, inspección visual del máximo; P2 descrito arriba. |
| Accesibilidad | Axe WCAG2A/AA/2.1AA del cuerpo: cero infracciones en seis vistas 390/393/1366, claro/oscuro. Contraste medido del componente mínimo 6,368:1 en ambos temas, incluidos summary. Anclas internas sin destino: cero. |
| Enlaces internos | Tres artículos: 200 y títulos/contenido correctos. Pilar: archivo compilado y ruta Astro comprobados; limitación local detallada abajo. |
| HTML privado final | Siete hashes comprobados; HTML servido mediante interceptación local con toda otra red bloqueada, cero solicitudes/errores, cinco imágenes embebidas, dos secuencias manuales y cambio de tema funcional. Sin desbordamiento a 390. |
| PDF privado final | 19 páginas, etiquetado, ocho pasos, FAQ y registro completos. No equivale a certificar PDF/UA. Las animaciones se leen como pasos estáticos. |

### Medidas responsive propias

Alturas iniciales redondeadas en CSS px; ambas paletas dan las mismas medidas:

| Caja completa medida | 390 px | 393 px | 1366 px |
|---|---:|---:|---:|
| Wrapper tabla situación | 666 | 666 | 373 |
| Wrapper tabla etiquetas | 752 | 752 | 420 |
| Wrapper tabla presentaciones | 889 | 889 | 466 |
| Secuencia base, sección exterior | 836 | 814 | 993 |
| Secuencia ingesta, sección exterior | 861 | 839 | 972 |
| Registro, sección exterior | 638 | 617 | 1178 |

Las tablas incluyen sus márgenes de 32 px arriba y abajo: por eso mis wrappers miden 64 px más que las tablas aisladas del autocontrol técnico (602/688/825 móvil). No son mediciones contradictorias. Los pasos más altos de las dos secuencias también quedan bajo ~900 px en móvil; dibujo, controles inmediatos y explicación activa permanecen juntos. Las leyendas SVG pequeñas ocultas en móvil tienen explicación textual del paso. El registro largo se abre por decisión del lector. A 320 px tampoco hay overflow global.

## Límites de la verificación y evidencia ajena identificada

- Chromium local; no se afirma prueba en Safari físico ni con una persona usuaria de lector de pantalla. Axe no certifica accesibilidad total.
- La ruta del pilar en el servidor Python devuelve un listado de directorio por colisión carpeta/archivo. **No cuento ese HTTP200 como página válida.** Comprobé `dist/client/alimentacion-perros-senior.html`, título «Alimentación del perro senior: qué dar y cuánto», y su ruta `src/pages/[pilar].astro`; este comportamiento del servidor de archivos no se atribuye al enrutado de Astro/Workers.
- Build y check finales son ejecuciones de coordinación cuyos logs inspeccioné: build completo 21:08:15; check 184 archivos, 0 errores, 0 warnings, 62 hints; proyección de 33 documentos. No los presento como ejecutados por mí ni repito un build que cambiaría un artefacto congelado.
- Las capturas de cabecera son del sitio real. Las capturas de elemento intentan ocultar overlays fijos solo en el DOM de prueba; algunos encabezados sticky pueden aparecer superpuestos en captura extendida. No son elementos del SVG ni alteraciones del producto.
- Se conserva el JSON inicial del harness privado: buscaba el summary «Rellenar el registro» en papel, aunque ese control debe ocultarse. Se sustituyó la expectativa por contenido del campo; eso no fue una corrección de producto. Aparte, el rótulo inglés automático sí se registra como P2 real. El primer intento de Chromium sin permiso de red falló antes de abrir página; se ejecutó después con el permiso de entorno apropiado.

## Lo que sí funciona y qué corregir

Conservar la respuesta temprana, las distinciones boca/deglución/recuperación, los ejemplos honestos, la medición de base frente a mezcla y la separación de dato medido/estimado/desconocido. El recorte mejora utilidad sin sacrificar decisiones ni recursos.

No hay corrección bloqueante pendiente ni se solicita ampliar el texto. El P2 del rótulo impreso queda visible en la entrega; si el propietario decide abordarlo, la instrucción técnica es evitar que el clon genere un summary predeterminado en inglés manteniendo los diez campos y su impresión en A4. Esta auditoría no lo modifica ni abre otra ronda. Publicación y fusión permanecen pendientes de autorización del propietario.
