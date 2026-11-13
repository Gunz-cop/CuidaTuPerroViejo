# Contraste de los análisis de Claude y Codex

Fecha: 2026-11-13 (UTC). Autor: Codex. Estado: síntesis de investigación para decidir con el propietario; no encarga implementación, publicación ni contacto con terceros.

## Documentos comparados y método

- [Análisis inicial de Codex](analisis-miperromayor-2026-11-13.md).
- [Análisis de Claude](analisis-claude-competencia-2026-11-13.md), incorporado al PR #180 antes de este contraste.
- Rama examinada: `docs/analisis-miperromayor-2026-11-13`; documento de Claude observado con blob `df033a9b8c2e7a185559034c75ebfca22704f33b`.
- Comprobaciones adicionales: páginas públicas de PetMetric, Puppy House, chequeo geriátrico y calculadora propia; cadenas HTTP de dos rutas antiguas con y sin `www`; código actual de HHHHHMM, catálogo de enlaces, redirecciones y briefing de juegos de olfato.
- Se aplicó [la skill de enlazado interno](../../.agents/skills/enlazado-interno-sitio/SKILL.md) para valorar A02/A03. Se conserva la selección contextual de destinos y la jerarquía de pilares.
- El export y las capturas originales de Search Console citados por Claude no se examinaron en esta sesión. Sus cantidades se conservan como datos reportados por Claude a partir del material del propietario, no como comprobación independiente. No se accedió a datos privados de tráfico.
- No se ejecutaron el bot de Telegram, el envío de informes a veterinarios ni el flujo interactivo completo de la calculadora propia. En PetMetric se verificó lo que sus páginas anuncian; en nuestra herramienta se contrastaron HTML publicado y código.

## Qué cambia al unir los dos análisis

Los documentos son complementarios. Codex identifica preguntas concretas del cuidador y recursos asociados; Claude añade la perspectiva de seguimiento continuado, contenidos que reciben enlaces y preparación de la consulta. La línea de trabajo conjunta es: pregunta observable → guía útil → registro del cambio → información que se lleva al veterinario.

Esto no es un embudo obligatorio. Una urgencia requiere atención inmediata, y cada enlace debe continuar la necesidad concreta del lector.

Las tres aportaciones que más cambian la planificación son:

1. **Seguimiento HHHHHMM:** aprovechar lo que ya existe y estudiar un informe de varias fechas. Buena parte de R05 ya está implementada.
2. **Estimulación mental:** incorporar C12 a la primera selección, retomando el briefing existente en vez de encargar otro desde cero.
3. **Chequeo geriátrico:** estudiar una ficha práctica de preparación y seguimiento en la URL existente. Su fecha original y extensión no demuestran que esté desactualizada.

## Matriz de contraste y decisiones propuestas

| Afirmación o propuesta | Resultado del contraste | Decisión propuesta |
| --- | --- | --- |
| «Nadie enlaza artículos» | Es una generalización que la muestra no permite. El chequeo geriátrico está en `src/content/blog/chequeo-geriatrico-canino.mdx`: es un artículo usado como referencia. | Reformular: en los enlaces reportados destacan guías de referencia y pilares. No deducir que los artículos no reciben enlaces ni asignarles solo una función de captación. |
| PetMetric tiene 8 páginas que nos enlazan | Claude las identifica como versiones lingüísticas del mismo recurso en un dominio; aquí se confirmó directamente el enlace en español. | No contar ocho recomendaciones independientes ni interpretar su cantidad como tráfico o autoridad demostrados. |
| miperromayor tiene 3 orígenes al chequeo y 1 a higiene según Search Console | El inventario directo de Codex recuperó un origen para cada destino. La diferencia con Search Console sigue sin resolver: faltan sus URLs exactas, fechas de rastreo y capturas para compararlas. | Conservar ambos datos con su procedencia. Search Console puede reflejar un estado distinto al contenido actual; no elegir una explicación sin evidencia. |
| Atribución a una URL nueva en Search Console demuestra que una ruta vieja funciona hoy | La atribución del informe no sustituye una solicitud HTTP actual. | Usar las comprobaciones directas de esta sesión para afirmar funcionamiento. |
| A01: auditar y conservar redirecciones de Blogger | Las dos rutas concretas funcionan; sin `www` usan un 301, con `www` usan dos 301. El repo ya incluye redirecciones explícitas y un antecedente de revisión en PR #156. | Mantenerlas y registrar la posible mejora de los dos saltos con `www`; no presentar una migración rota ni rehacer toda la auditoría como primer proyecto. |
| C11: chequeo corto y antiguo | Publicado en 2025, pero revisado el 16-10-2026. Ya explica frecuencia según estado/riesgo, pruebas según indicación, qué llevar y qué preguntar al salir. | Revisar utilidad concreta, no longitud. Buen candidato: ficha imprimible previa/posterior a la consulta y explicación de pruebas cuando aporte valor. Evitar un calendario universal de edad/tamaño y una batería de pruebas para todos. |
| A02: enlazar chequeo desde cada «consulta al veterinario» | Puede llevar a una guía preventiva cuando la necesidad real es una urgencia o una consulta específica. La skill pide destinos naturales y seleccionados. | Enlazar el chequeo cuando ayude a preparar una revisión; usar orientación urgente o específica cuando corresponda. No automatizar el mismo enlace para toda mención al veterinario. |
| C12: estimulación mental como contenido nuevo | No aparece una guía específica publicada en el sitemap revisado, pero existe `briefings/briefing-juegos-olfato-estimulacion-cognitiva-perros-mayores.md`. | Subirlo de prioridad como trabajo a retomar. Auditar el brief antes de redactar: tiene fecha de agosto y lenguaje como «frenar el deterioro» que requiere respaldo preciso. No asumir aprobación ni publicación por su frontmatter. |
| R05: historial local, PDF y recordatorio como HHHHHMM v2 | Historial, comparación por área con el registro anterior, notas, copia, WhatsApp, impresión/PDF y recordatorio ya aparecen en HTML y código. Hay además una hoja PDF para siete fechas. | Acotar el trabajo nuevo a visualización longitudinal e informe conjunto de varias fechas; comprobar necesidad y facilidad de uso antes de desarrollarlo. |
| R04: calendario bueno/difícil | Es una observación diaria adicional a los siete valores, no simplemente otro gráfico de la suma. | Estudiarlo integrado con R05 y notas del cuidador; no lanzar una herramienta separada por defecto ni equiparar automáticamente una marca diaria con el criterio M. |
| Validación HHHHHMM y bandas 35/50 de PetMetric | Existe Testoni et al. (2023), DOI `10.3390/ani13061049`: validación en contexto italiano, 314 participantes, ajuste del modelo parcialmente adecuado. No valida nuestra adaptación web ni las bandas del competidor. Nuestra página ya explica esa distinción. | Conservar el método y límites propios. No importar los cortes 35/50 ni presentar la suma como veredicto clínico. |
| A03: conectar enfermedad crónica con calidad de vida | Es una continuación útil donde el artículo trata confort o seguimiento. El mapa propio ya incluye algunos enlaces a herramientas. | Revisar cada caso y evitar cajas idénticas en todas las enfermedades. No exigir una guía nueva por enfermedad. |
| C14: recursos por país atraen enlaces de las instituciones listadas | El directorio de PetMetric y nuestro enlace existen. No se ha demostrado que listar instituciones produzca enlaces recíprocos. | Empezar solo con una necesidad concreta y recursos verificables. Evaluar mantenimiento, cobertura y fecha de revisión; no priorizar un directorio amplio por una expectativa de backlinks. |
| R06: test cognitivo | Requiere selección y licencia de escala, población aplicable y evidencia. DISHA organiza signos y no equivale por sí solo a un cuestionario validado como CCDR. | Mantener como investigación posterior; no transformarlo en una suma editorial improvisada. |
| «En lo observado no citan fuentes» | En el inventario hay enlaces externos en 22 de los 68 artículos, incluyendo MSD y AVMA; higiene enlaza Santevet. No se revisó que cada fuente respalde su afirmación. | No usar ausencia global de fuentes como conclusión. Separar existencia de enlaces, calidad de las citas y revisión veterinaria acreditada. |
| «Unos 11 enlaces internos por artículo» | Puede describir una muestra, no el conjunto: en los 68 cuerpos HTML recuperados la media es 6,38 enlaces al dominio propio, contando repeticiones. No incluye menú ni pie. | No establecer una cuota de enlaces. La documentación propia propone selección útil, aproximadamente 2–5 contextuales además de navegación. |
| A04: contactar PetMetric y negocios locales | Es una propuesta, no una acción autorizada. La relación entre nuestro recurso y su directorio sí está comprobada. | Dejarlo como opción posterior, cuando tengamos definido el recurso y un motivo concreto. No se enviaron mensajes. |

## Evidencia de la herramienta actual y alcance real de R05

Fuentes del repositorio:

- [`src/components/tools/QualityOfLifeTool.astro`](../../src/components/tools/QualityOfLifeTool.astro).
- [`src/lib/quality-history.ts`](../../src/lib/quality-history.ts).
- [`src/pages/herramientas/calculadora-calidad-vida-perros.astro`](../../src/pages/herramientas/calculadora-calidad-vida-perros.astro).
- [`scripts/generar-hoja-calidad-vida.ts`](../../scripts/generar-hoja-calidad-vida.ts).
- Página publicada: https://cuidatuperroviejo.com/herramientas/calculadora-calidad-vida-perros.

| Función | Estado observado |
| --- | --- |
| Guardado local con tratamiento de errores de almacenamiento | Existe; `localStorage` dentro de `try/catch`. |
| Historial fechado | Existe; límite actual de 60 registros. |
| Comparación de las siete áreas con el registro anterior | Existe, con desglose y advertencias independientes de la suma. |
| Nota del cuidador, copia y WhatsApp | Existe. |
| Impresión / guardar un resultado en PDF | Existe. |
| Hoja PDF imprimible con siete fechas | Existe. |
| Recordatorio opcional | Existe; agenda de tres días, no pauta clínica ni prueba de notificación automática desde servidor. |
| Gráfico temporal de varias fechas e informe conjunto de 2–4 semanas | No encontrado en HTML/código revisado; candidato concreto a estudiar. |
| Calendario diario bueno/difícil con contexto | No encontrado como recurso específico; candidato a integrar con el seguimiento. |

Las notas antiguas de TODO sobre una página sin componente o sin historial no deben sustituir el estado actual del código. Este contraste no marca cerradas tareas de auditoría o migración que no examinó.

El almacenamiento local puede ser una decisión de privacidad y sencillez. No justificarlo por una supuesta obligación de infraestructura gratuita: TODO ya registra Workers Paid confirmado por el propietario. La decisión sobre servidor, sincronización o recordatorios se toma según la necesidad, no se presupone aquí.

## Redirecciones comprobadas

Comprobación con GET y seguimiento de `Location` el 2026-11-13. Los estados siguientes excluyen la negociación del proxy.

| URL de entrada | Cadena observada | Destino final |
| --- | --- | --- |
| `https://www.cuidatuperroviejo.com/2025/10/revision-veterinaria-perros-mayores.html` | 301 al dominio sin `www` → 301 a la ruta nueva → 200 | `/salud-perros-mayores/chequeo-geriatrico-canino` |
| `https://cuidatuperroviejo.com/2025/10/revision-veterinaria-perros-mayores.html` | 301 → 200 | Mismo destino |
| `https://www.cuidatuperroviejo.com/p/salud-mental-y-emocional-en-perros.html` | 301 al dominio sin `www` → 301 a la ruta nueva → 200 | `/salud-mental-emocional-perros` |
| `https://cuidatuperroviejo.com/p/salud-mental-y-emocional-en-perros.html` | 301 → 200 | Mismo destino |

La oportunidad es acortar la cadena de las variantes `www`, conservando todas las rutas antiguas. No se ha demostrado un perjuicio de tráfico o indexación causado por esos dos saltos. Se trata de una comprobación dirigida, no de una auditoría exhaustiva de cada URL antigua.

Puppy House pudo abrirse en esta sesión con HTTP 200 y contiene el enlace a `/p/salud-mental-y-emocional-en-perros.html`. Esto amplía la evidencia disponible cuando Claude redactó su informe.

## Qué conservar de PetMetric

Sus páginas públicas anuncian recordatorio por Telegram e informes semanales/mensuales al veterinario. También muestran un ejemplo de informe y un recorrido breve de configuración. No se verificó la entrega real del servicio.

La enseñanza de producto es hacer explícito qué obtiene la persona al volver: un resumen de lo que cambió y material para la consulta. Un ejemplo visible de ese informe puede explicar el valor mejor que una lista de funciones.

No hace falta replicar Telegram, suscripciones, comisiones a clínicas ni envío automático para aprovechar esa idea. Su portada anuncia gratuidad mientras la página de clínicas menciona comisión por suscripción: el modelo comercial no queda aclarado con estas páginas y no se adopta como referencia.

La página de referencia sobre la escala conecta explicación → calculadora → seguimiento → recursos por país. Ese recorrido es aprovechable si cada paso satisface una necesidad real, sin copiar sus categorías clínicas.

## Primera secuencia sugerida tras el contraste

Es una propuesta para discutir, no una cola de producción autorizada.

| Orden propuesto | Trabajo | Motivo y límite |
| --- | --- | --- |
| 1 | Precisar y mostrar el uso del seguimiento HHHHHMM actual; estudiar R05 acotada con R04 integrado | Ya existe la base. El trabajo diferencial sería entender varias fechas y preparar un informe útil, sin interpretación clínica automática. |
| 2 | C11: recurso práctico alrededor del chequeo existente | Aprovecha una URL ya citada y conecta observaciones con preparación de consulta. No requiere rehacer por completo la guía ni aumentar su longitud por sistema. |
| 3 | C12: retomar el brief de olfato y estimulación | Añade una necesidad concreta de bienestar cotidiano; revisar evidencia y alcance antes de redactar. El enlace entrante observado es una señal de encaje, no una medida de demanda. |
| 4 | C01 + R02: agua y registro; después elegir entre C02, C03 y C05 | Mantiene la línea inicial de preguntas concretas y ayudas prácticas. La selección final depende de búsquedas propias y capacidad editorial. |
| Mantenimiento | A01: conservar rutas viejas y valorar acortar `www`; A02/A03 contextuales | Los enlaces examinados funcionan. Cambiar solo donde haya una mejora clara y seguir las skills cuando se implemente. |
| Investigación posterior | C13, C14, R06 y A04 | Requieren más evidencia, un alcance mantenible o una decisión específica del propietario. |

C04 (tos/jadeo), C06–C10, R01 y R03 se mantienen en el inventario inicial; este orden no los descarta ni implica que hayan sido desarrollados. C15 agrupa síntomas candidatos, sin fijar URLs nuevas.

Antes de ejecutar: contrastar consultas y rendimiento propios, inventario de briefs, evidencia de las propuestas y observaciones del propietario. Los enlaces reportados ayudan a orientar; no demuestran por sí solos qué trabajo traerá más visitas.

## Fuentes adicionales verificadas

- https://petmetric.vet/
- https://petmetric.vet/escala-hhhhhmm/ — enlace directo a nuestro pilar de paliativos y enlaces a sus fuentes.
- https://petmetric.vet/calculadora-hhhhhmm/
- https://petmetric.vet/para-veterinarios/
- https://puppyhousemedellin.com/estimulacion-cognitiva-para-perros-mayores/ — enlace a la ruta antigua comprobado en HTML.
- https://www.mdpi.com/2076-2615/13/6/1049 — Testoni et al., *Validation of the HHHHHMM Scale in the Italian Context: Assessing Pets’ Quality of Life and Qualitatively Exploring Owners’ Grief* (2023).
- https://cuidatuperroviejo.com/salud-perros-mayores/chequeo-geriatrico-canino — fecha de revisión y contenido actuales.
- [`public/_redirects`](../../public/_redirects), [`docs/seo/enlazado-interno.md`](enlazado-interno.md) y [`src/data/internal-links.ts`](../../src/data/internal-links.ts).
- [`briefings/briefing-juegos-olfato-estimulacion-cognitiva-perros-mayores.md`](../../briefings/briefing-juegos-olfato-estimulacion-cognitiva-perros-mayores.md).

## Verificación y límites de esta entrega

Se contrastaron propuestas contra páginas, rutas HTTP y fuentes del repositorio. Solo se añade documentación de investigación. No se hizo una auditoría independiente de la implementación propia, no se cambiaron artículos, herramientas o enlaces y no se ejecutaron build ni tests de producto. Las pruebas interactivas y la auditoría correspondiente se harán si se encarga un cambio funcional.

Pendiente: export/capturas originales y URLs exactas de los tres orígenes al chequeo reportados en Search Console; comprobación de las otras versiones lingüísticas de PetMetric; datos propios de demanda; decisión conjunta de prioridades.
