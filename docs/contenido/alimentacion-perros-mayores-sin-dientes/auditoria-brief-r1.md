# Auditoría independiente del brief — ronda 1 de 3

Fecha: 2026-10-19. Documento: `briefings/briefing-alimentacion-perros-mayores-sin-dientes.md`. SHA256 auditado: `58bac779494d5afda4734261241b75ebb54892341afa72bde59ed67d7b02328d`.

Rol: auditor independiente; no he creado ni corregido brief, artículo o recursos. Esta es la primera ronda del brief. No constituye auditoría parcial del artículo ni consume una ronda de ese documento. Plan adjunto no disponible: alcance contrastado con instrucción del usuario e inventario; no se certifica cumplimiento de un adjunto no leído.

## Veredicto

**NO APTO / No válido para redacción:** el contrato contiene requisitos de componentes y secuencia incompatibles con las skills obligatorias y debe resolverse antes de redactar.

## Hallazgos

### P0

Ninguno confirmado. Las seis fuentes existen, corresponden al tema atribuido y contienen los pasajes relevantes; sus límites de extrapolación están documentados.

### P1

1. **Sección 9.3, línea 189; sección 6, conclusión:** exige «Exactamente 3 AlertBox» y solo pide bibliografía, mientras `redactar-articulo-blog/SKILL.md`, Fase 3, exige además el cuarto cuadro `info` titulado «Fuentes científicas y de autoridad» antes del FAQ. `auditar-articulo-blog/references/metricas.md` distingue expresamente tres cajas de cuerpo más la de fuentes. El redactor no puede cumplir simultáneamente ambos contratos. Corregir a **tres cajas de cuerpo (info, danger, warning) y una cuarta de bibliografía**, con seis entradas, títulos reales enlazados y nota de responsabilidad, situada antes del FAQ final. No cambiar las tres cajas clínicas.

2. **Sección 6 H2 3; sección 8, línea 183; sección 11, línea 205:** la secuencia se contrata como manual, con controles sin especificar y solo «estado inicial útil sin JS». Las skills visual y de redacción exigen anterior/siguiente, reproducir/pausar/repetir, reproducción finita, pausa efectiva, objetivos de 44 px, limpieza al ocultar/navegar y lectura de **todos** los pasos sin JS e impresos incluso con JS. El texto actual permite una entrega que ocultaría pasos y omitiría controles exigidos. Especificar esos criterios en guion y gate (sin autoplay); reduced motion debe conservar consulta manual. No añadir movimiento corporal del perro ni vídeo. Si se quiere sustituir por un recurso exclusivamente estático/manual, resolver y justificar explícitamente el cambio de formato antes de convertirlo en contrato, sin presentar una transición decorativa como animación didáctica.

### P2

3. **Sección 1 `heroImageAlt`, sección 8 imagen 1:** el pie debe declarar IA, pero el único campo para el pie del hero es actualmente `heroImageAlt`, y su valor no lo declara. Comprobado en `src/pages/[pilar]/[slug].astro`: `figcaption` imprime ese mismo valor. El requisito general visible es correcto; falta fijar un mecanismo concreto que el redactor pueda implementar sin duplicar el hero o inventar un campo del schema. Incluir la declaración en el valor que llega al pie o indicar expresamente una nota visible adyacente desde el artículo. No basta con asumir que el layout agrega IA por sí mismo.

## Verificación de fuentes

Abrí independientemente las seis URL profundas con solicitudes nuevas; descargué PDFs y convertí su contenido a texto, y leí HTML de las otras páginas. No usé los extractos del creador como prueba sustitutiva. Evidencia propia, localizadores y hashes en `verificacion/auditor-fuentes-brief-r1.md`. HTTP 200 fue control de acceso, no criterio de aprobación científica.

| Fuente / identificador | Afirmación y localización leída | H2 / resultado y límite |
|---|---|---|
| F1 WSAVA, Guidelines on Selecting Pet Foods, actualización 10 marzo 2021; URL profunda del brief | «What to look for on a label»: completo frente a complementario; calorías por gramo/ración | H2 2: verificada; no producto o dieta senior universal |
| F2 Freeman y equipo WSAVA, Nutritional Assessment Guidelines, JSAP junio 2011; PDF del brief | «Extended Evaluation / Animal factors»: amount eaten, chewing, swallowing, vomiting, regurgitation; «Evaluate homemade foods»: preparación/sustituciones y nutricionista; «MONITORING»: ingesta, condición, signos GI y actividad | H2 2/3/5: verificada; no demuestra proporciones ni procedimiento universal; secuencia declarada síntesis editorial condicionada |
| F3 Niemiec y colaboradores, Guías Dentales WSAVA, español, año no afirmado; PDF del brief | Sección 2, tabla 1: preferencia duro→blando, masticar por un lado, hipersalivación, sangre en alimento/agua; párrafo previo no reduce dolor a falta de apetito | H2 1: verificada; signos posibles, no diagnóstico ni prueba de desdentamiento |
| F4 Barnes, Hunter y Downing, VCA Megaesophagus, actualización 28 mayo 2024; URL del brief | «How is megaesophagus treated?»: consistencia según paciente, más líquido puede aumentar aspiración; diagnóstico: tos, fiebre y respiración rápida | H2 1/3: verificada; restringir extrapolación a advertencia contra «más líquido siempre seguro», sin equiparar desdentamiento a megaesófago |
| F5 Weir, Hunter y Barnette, VCA Post-Operative Instructions in Dogs, actualización 18 septiembre 2025; URL del brief | «When can I feed my dog?» y párrafo sobre instrucciones detalladas individuales | H2 1: verificada; cirugía general, sin importar cantidades/plazos a extracción dental |
| F6 FDA, Tips for Safe Handling of Pet Food and Treats, actualizado 23 mayo 2024; URL del brief | «Tips for Preparing Pet Food»: manos, platos, cucharas; «Tips for Storing Pet Food»: refrigerar pronto o desechar húmedo sobrante y tapar | H2 4: verificada; sin vida útil universal de papilla/pienso mojado |

No PMID/DOI ni cifras de ensayo añadidos. No fuentes decorativas: todas se desarrollan en un H2 y cada H2 científico tiene sustento. No hay identificación bibliográfica errónea que rastrear por cascada.

## Contrato, utilidad y pruebas mecánicas

- Conteo propio Python: `seoTitle` **44**, descripción **138** caracteres. Enum válido; slug y rutas de imágenes sin tildes ni espacios; frontmatter permitido por schema.
- Presupuesto: **150 + 350 + 400 + 400 + 250 + 300 + 350 = 2.200**; rango ±15 % **1.870–2.530**. Extensión proporcionada a decisiones diferentes; no mínimo atribuido a AdSense. El conteo del artículo sigue pendiente.
- H2 distintos y útiles: separar situación clínica; elegir dieta adecuada; adaptar presentación; conservar/manipular; observar y registrar. No hay necesidad de paciente ni arco inventado. Los tres prompts nombran mismo beagle senior y definen escena, plano, luz y profundidad.
- Inventario: solo un artículo publicado en Alimentación, `comida-casera-perros-mayores`; segundo spoke expresamente pendiente. Puente dental publicado y rutas físicas existentes. Pilar real. Calculadora no obligatoria en este pilar.
- La firma central `ArticleByline` existe y se renderiza desde el layout. **No es hallazgo omitir la firma manual duplicada**, aunque una referencia histórica aún la pida: el código actual evita divergencias y conserva autoría editorial real. Sin revisión veterinaria inventada.
- Estado inventario `[~] (En Briefing)` correcto. `Borrador` no impide compilar o servir ruta; no es barrera técnica de publicación. La autorización vigente impide fusionar/desplegar y la entrega es rama/PR.

## Recursos prometidos y gate

| Recurso | Destino | Estado que corresponde en brief / prueba exigida |
|---|---|---|
| Hero y dos escenas | Carpeta y nombres sección 8 | Planificados; gate anatomía, edad, continuidad, alt/IA, decodificación y responsive. Resolver mecanismo de pie hero |
| Matriz tres situaciones | H2 1, HTML artículo | Planificada; orden de lectura, móvil y sin JS; no test diagnóstico |
| Secuencia tres pasos | H2 3, componente pendiente | Planificada; completar contrato de controles, todos los pasos sin JS e impresión y limpieza/pausa según P1 |
| Registro imprimible | H2 5, HTML | Planificado; impresión legible y botón real con respaldo HTML, sin envío de datos |
| Tres enlaces internos | Sección 5 | Destinos comprobados contra inventario/archivos; apertura local de rutas finales pendiente del artículo |

Que un recurso esté planificado no es fallo de entrega del brief. No declaro pruebas móviles, de recursos finales, build, publicación o revisión visual final realizadas en esta ronda. Quedan como gate del artículo completo.

## Efecto cascada

No hay artículo autorizado todavía: resolver P1 en el brief evita que redactor/auditor deban elegir entre contratos contradictorios. No se reabre investigación científica ni se añade un caso. El adjunto ausente permanece como limitación explícita. No se certifica despliegue público.

## Lo que sí funciona

Conservar guía sin caso, fuentes profundas verificadas, límites de VCA (especialmente cirugía general y megaesófago), ausencia de recetas universales, prohibición de alimentación forzada, niveles diferenciados de consulta/urgencia y contingencia honesta del segundo spoke. La dieta completa y el alimento base quedan separados de la dilución: protege la utilidad clínica y evita falsa equivalencia de gramos.

## Qué corregir, en orden

1. Resolver el cuarto cuadro de bibliografía en secciones 6 y 9.
2. Cerrar criterios de aceptación de la secuencia en secciones 6, 8, 9 y 11, incluyendo todos los pasos sin JS y en impresión con JS.
3. Fijar cómo se mostrará la declaración IA del hero usando arquitectura real.
4. Entregar versión estable con hash para **ronda 2 de 3 del brief**. No redactar hasta APTO; el auditor no aplica correcciones.
