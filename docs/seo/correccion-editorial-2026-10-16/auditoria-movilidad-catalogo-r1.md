# Alcance adicional: coherencia de movilidad y catálogo — R1

Fecha: 2026-10-16. Auditor independiente; no se modifica producto. Leídas las skills `auditar-herramienta-interactiva` y `crear-herramienta-interactiva`, y decisiones del propietario. Este encargo es una reparación de mensajes y catálogo, no un rediseño ni una auditoría completa de la herramienta conforme a todas sus fases. No se reabren artículos R3.

**NO APTO en R1**: persisten garantías/umbrales no acreditados y respuestas estructuradas que contradicen el contenido visible. Se conservó el estado observado en `evidencias/auditor-movilidad-r1/`, con manifiesto SHA256 para seis archivos: selector, módulo y cuatro intents modificados. La comunicación inicial mencionaba seis intents; el diff real muestra cuatro y no se presume otro cambio.

## Hallazgos comunicados

1. `selector-movilidad-perros-mayores.astro`, JSON-LD FAQ: indica silla de ruedas por pérdida motora con apetito/voluntad, mientras la respuesta visible ya exige evaluación individual. Sincronizar con el mensaje prudente.
2. FAQ de rampa, visible y JSON-LD: «mejor para displasia» y «si cojea... empieza con rampa» siguen una indicación automática no acreditada. Reemplazar por ajuste, capacidad, diagnóstico y tolerancia individuales.
3. FAQ de arnés, visible y JSON-LD: sesiones universales de 20–30 minutos no sustentadas por las fuentes revisadas. No ofrece prueba clínica ni justificación de esa duración. Solicitar pauta individual y criterios para detener.
4. Introducción y encabezado siguen prometiendo recomendación/ayuda «exacta» aunque metadatos se corrigieron. La herramienta orienta opciones, no prescribe un dispositivo exacto.
5. Sección SEO: pérdida muscular universal desde 7–8 años, pérdida de 3–5% por semana y presunta evidencia del «WSAVA Rehabilitation Committee» sobre marcadores de estrés no tienen estudio identificable. Retirar cifras y atribuciones o verificar documento/población/medida precisos. La explicación de pérdida propioceptiva no debe diagnosticar por resbalones.
6. Alertas/resultado de pañales todavía dicen «para evitar dermatitis»; matizar reducción de contacto y riesgo sin garantía. La limpieza no elimina todo riesgo de lesión.

## Fuentes y límites

AAHA sobre modificaciones ambientales y Merck sobre presión/heridas se abrieron y revisaron en este expediente: apoyan adaptación y manejo individual, no duraciones de arnés, umbrales de pérdida muscular ni elección universal de dispositivos. Ninguna cifra nueva de cálculo se ha introducido.

Se comprobó por red el footer adicional: la URL antigua WSAVA `global-pain-council-guidelines` redirige a `pain-guidelines`, documento institucional pertinente; no se marca rota. NCSU `Quality-of-Life-Scale.pdf` dio403: acceso parcial, **no prueba de archivo falso ni ausente**. Registro propio en `evidencias/auditor-movilidad-fuentes.json`. Para esta página resulta preferible una referencia leída y atribuible, sin asegurar autor/año de ese PDF inaccesible.

## Qué queda fuera

No se ha certificado selección clínica de las seis combinaciones, algoritmo, diseño completo, tarjeta, accesibilidad ni navegación en esta R1. Deben distinguirse del cambio textual acotado. El corrector debe resolver los hallazgos y el auditor comprobará la versión siguiente como R2 explícita, máximo tres rondas. No se emite LISTA funcional mientras faltan pruebas finales sobre el build correspondiente.

## R2 — corrección clínica y nueva comprobación de navegación

Las correcciones clínicas comunicadas se revisaron y resultaron satisfactorias: desaparecen sesiones de arnés universales, indicaciones automáticas, garantías de piel y cifras/atribuciones sin respaldo. Visible y JSON-LD describen evaluación individual. El método de dos entradas se declara orientativo y AAHA sustenta el marco, no validación clínica del selector.

**NO APTO en R2 por navegación:** al sustituir el footer desapareció `id="cm5-refs"`, pero el índice seguía enlazándolo. La copia anterior a la restauración está conservada en `evidencias/auditor-adicional-r2/src/pages/herramientas/selector-movilidad-perros-mayores.astro.txt`, con su hash en el manifiesto. Se pidió restaurar el destino o corregir el índice. Se indicó también actualizar la fecha de revisión visible/estructurada y del módulo para reflejar el cambio clínico real, sin alterar la fecha de publicación.

Las funciones de cálculo/validación desde `export function resultKey` hasta el final del módulo coinciden exactamente con HEAD; no se cambiaron. Se ejecutaron las seis combinaciones permitidas: light/calm→LA, light/stressed→LB, moderate/calm→MA, moderate/stressed→MB, severe/calm→SA y severe/stressed→SB. Solo severe mostró alerta paliativa. Esto confirma clasificación/reproducción de la lógica existente, no indicación clínica validada de cada dispositivo. Los cuatro intents modificados tienen títulos idénticos al frontmatter de su artículo; rutas y grounding no se alteran en ese diff.

## Componentes de portada y helper — alcance nuevo R1

`HomeCareStory.astro` elimina la cita de uñas/Dakota/Luna sin procedencia y la sustituye por orientación general de observar y detener manipulación dolorosa. Imagen observada antes en el anexo de 63 imágenes (n.º51): dos Beagles sobre cama; pie actual la identifica como ilustración. No se presenta expediente ni recuperación. Resultado editorial de este cambio: satisfactorio en R1.

`HomeRecentPosts.astro` utiliza `mobileImageFor` y solo emite `<source>` cuando hay miniatura real; si no, el `<img>` conserva el original. El helper comparte la comprobación de `public` con `buildSrcset`. No se fabrican imágenes. El auditor ejecutó personalmente el test extendido con `node --import tsx --test tests/image-srcset.test.ts`: un aprobado, cero fallos, duración1115,07ms. Como en la revisión previa, esto no sustituye navegador ni publicación. Se revisaron imports solo en plantillas estáticas; no se observó traslado a cliente/API.

Los nuevos snapshots están en `evidencias/auditor-adicional-r2/` (10archivos: selector,módulo,cuatrointents,doscomponentes,helper,test). El nombre de la carpeta identifica el segundo estado de movilidad; no implica que los componentes nuevos hayan consumido una ronda anterior. La comprobación del helper ampliado es continuación técnica explícita R2 respecto de `auditoria-srcset-r1.md`, no ronda editorial de artículos.


## R3 — comprobación focal de cierre

**APTO para la corrección editorial acotada.** El destino `cm5-refs` existe y los cuatro enlaces de índice resuelven; la etiqueta del método se actualizó. Fecha visible, JSON-LD y `MOBILITY_TOOL.lastReviewed` son 2026-10-16. No se introdujo cálculo nuevo. Evidencia programática propia en `evidencias/auditor-movilidad-comprobacion-final.json`; versiones finales y hashes en `evidencias/auditor-adicional-final/manifest.json`.

No se emite una aprobación funcional integral de la herramienta: faltan navegador y build finales por el corrector. El documento selector/módulo queda cerrado R3 para este alcance. Si aparece un bloqueante que exija otra corrección de ese documento, detener y elevar al propietario; no abrir R4 ni reiniciar numeración.

Formato de copias: véase `formato-evidencia.md`; las extensiones de código llevan sufijo `.txt`, con bytes/hashes originales conservados y campo `snapshot_path` en manifiestos.
