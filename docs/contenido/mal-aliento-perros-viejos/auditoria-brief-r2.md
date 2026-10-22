# Auditoría independiente del brief — ronda 2 de 3

- Fecha: 2026-10-22.
- Auditor: `/root/auditor_brief`; autor/corrector: `/root/autor_brief`. Roles separados; el auditor no modifica producción.
- Documento: `briefings/briefing-mal-aliento-perros-viejos.md`.
- SHA-256 auditado: `60a2a79ab94344c766e15fbbf2e598723a431d9b7e357d245c208e033f9f9d0d`.
- Antecedente: [ronda 1](auditoria-brief-r1.md), NO APTO; un hallazgo P1, sin P0.
- Alcance: versión completa del contrato y comprobación de la corrección; recursos todavía planificados, no auditoría del artículo final.

## Veredicto

**APTO — Válido para redacción:** se ha retirado la definición clínica sin fuente asignada y el contrato conserva cobertura, diferenciación y recursos verificables.

Dos rondas consumidas del mismo brief; no se ha reiniciado el contador. Esta aprobación cubre únicamente el hash indicado. No acredita revisión veterinaria, generación de recursos, validación de navegador ni publicación.

## Hallazgos y cierre

**P1 de ronda 1: cerrado.** §6/H2 4, línea 278, ahora pide describir episodios y cuándo ocurren, sin clasificar regurgitación frente a vómito. Asigna explícitamente F1 a posibles orígenes digestivos y F7 al vómito como signo acompañante. Las páginas abiertas personalmente en ronda 1 contienen esos puntos. No se ha añadido diagnóstico ni tratamiento digestivo ni una nueva fuente.

**P0/P1/P2 nuevos: ninguno confirmado.**

La otra modificación es documental: encabezado y casilla APTO remiten al informe vigente, evitando alterar después el contrato solo para actualizar estado. No cambia requisitos ni anticipa una aprobación inexistente.

## Comprobación de integridad y métricas

Se leyó el archivo real y `correcciones-brief.md`. El brief es nuevo y aún no está versionado en HEAD, por lo que un `git diff` vacío no serviría para comparar rondas. Para comprobar la totalidad del cambio, reconstruí **en memoria**, sin escribir el archivo, la versión anterior al revertir exactamente tres segmentos: encabezado de estado, instrucción del H3 digestivo y casilla de dictamen. Su SHA-256 resultante es `1e341cafd22815a226cec888d5e75212cffe3f5535cc82071581ebba69bef982`, idéntico al auditado en ronda 1. Así queda comprobado que no hay cambios adicionales ocultos.

| Control repetido | Resultado |
|---|---|
| `seoTitle`, Python `len()` | 55 caracteres |
| `metaDescription`, Python `len()` | 148 caracteres |
| Targets por bloque | 200, 650, 450, 900, 800, 650, 800, 600, 400, 550 |
| Suma calculada | 6.000 palabras útiles; rango 5.100–6.900, cada bloque ±15% |
| Fuentes declaradas | 12, sin cambio |
| Prompts con ficha completa repetida | 3, sin cambio |
| Contrato editorial/visual | Mismos R1–R7, enlaces, FAQ siete y cajas requeridas |

El total excluye bibliografía/sintaxis; el contrato conserva además el conteo bruto MDX y el de componentes por separado. La aprobación no permite usar el límite inferior como objetivo ni añadir relleno para alcanzar cifras.

## Verificación de fuentes y trazabilidad

La verificación sustantiva independiente de las doce fuentes se realizó en ronda 1 el mismo día y está documentada con afirmación, localización, identidad y límites en [su tabla completa](auditoria-brief-r1.md#verificación-independiente-de-fuentes). En esta ronda se conserva esa evidencia propia: **no afirmo haber repetido doce aperturas web**. La comparación por hash demuestra que sus URL, atribuciones, afirmaciones y asignaciones no cambiaron. Se revisó específicamente la instrucción corregida contra los pasajes de F1/F7 ya leídos.

| Fuente / identificador | Afirmación/localización verificada en r1 | Resultado vigente / H2 |
|---|---|---|
| F1 UC Davis — `healthtopics.vetmed.ucdavis.edu/health-topics/canine/halitosis-dogs` | Preguntas sobre causas/evaluación: boca, piel húmeda, fuentes extraorales; incluye esófago y estómago. | Verificada; 2/3/4/6. Ahora respalda exactamente la posibilidad digestiva encargada. |
| F2 Merck — `periodontal-disease-in-small-animals` | Etiology/Pathogenesis, Plaque, Clinical Findings y Diagnosis. | Verificada; 3/6; proceso y evaluación, sin estadificación casera. |
| F3 PDSA — `symptoms/bad-breath-in-dogs` | Overview/Causes/When to contact; cambio, dieta, consulta y signos. | Verificada; 1/2/8; sin mapa olor→diagnóstico. |
| F4 Merck — `disorders-of-the-mouth-in-dogs` | Inflamación, labios, lengua, tumores y biopsia. | Verificada; 3/5/7; sin maniobras ni tratamientos domésticos. |
| F5 Cornell — `dental-disease-and-home-dental-care` | Signs y Treatment: acompañantes, examen completo, radiografías y cuidados posteriores. | Verificada; 5/6/7; sin duplicar tutorial dental. |
| F6 Merck — `when-to-see-a-veterinarian` | Tabla de signos urgentes y contacto pronto. | Verificada; 1; adaptación de consulta, no protocolo validado de halitosis. |
| F7 PDSA — `chronic-kidney-disease-in-dogs` | Symptoms incluye vómitos; Diagnosis incluye sangre/orina y pruebas según hallazgos. | Verificada; 4; ahora sin atribuirle definición de regurgitación. |
| F8 Merck — `disorders-of-the-pancreas-in-dogs` | Diabetes Mellitus: signos, evaluación y urgencia de cetoacidosis. | Verificada; 4; sin pautas de insulina ni diagnóstico olfativo. |
| F9 AAHA — `history-and-physical-examination` | History and physical examination: historia oral/sistémica, masticación y valoración integral. | Verificada; 5/6; registro editorial, no validado. |
| F10 AAHA Senior 2023, DOI `10.5326/JAAHA-MS-7343` | Portada/DOI; pp. 4–6 anestesia/odontología y 13–14 objetivos/QOL. | Verificada; 6/8; consenso con evidencia y límites individuales. |
| F11 FDA — `paws-xylitol-toxic-dogs` | Productos y acción urgente ante posible ingestión. | Verificada; 7; sin umbrales ni teléfonos extranjeros universales. |
| F12 Illinois — `oral-tumors-in-dogs-and-cats` | Risk Factors and Signs/Catch Changes Early: sangre, bulto/llaga nueva y evaluación. | Verificada; 3; sin diagnóstico ni riesgo por pigmentación. |

Las URL completas, instituciones, fechas comprobadas y límites siguen en §3 del brief y en r1. Cada referencia mantiene al menos un H2 asignado y cada H2 clínico tiene respaldo. No se incorporó la fuente digestiva propuesta opcionalmente por el auditor: al retirarse la definición, ya no se necesita.

## Recursos prometidos y gate

| Recurso | Ruta prevista | Prueba futura exigida | Resultado de planificación |
|---|---|---|---|
| R1 hero/referencia | `public/images/blog/mal-aliento-perros-viejos/labrador-senior-observacion-v1.webp` | Inspección primera imagen, anatomía/edad, 1200/800/400 y decodificación | Viable; pendiente producir |
| R2 comida | Misma carpeta, `labrador-senior-registro-comida-v1.webp` | Derivación de R1, anatomía, alt/caption/variantes | Viable; pendiente producir |
| R3 consulta | Misma carpeta, `labrador-senior-consulta-v1.webp` | Continuidad e ilustración diferenciada de foto clínica | Viable; pendiente producir |
| R4 prioridad | `HalitosisRecursos.astro`, variante `prioridad` | Acción/anclas, legibilidad, ≤900 px móvil y claro/oscuro | Viable; pendiente implementar |
| R5 proceso | Mismo componente, `proceso` | Cambio de biofilm/zona/detalle, controles, pausa/fin, reduced-motion, noJS/impresión | Viable; pendiente implementar y probar |
| R6 tabla | MDX con `TablaApilable` | Cuatro filas/frases breves, `data-label`, móvil apilado | Viable; pendiente integrar |
| R7 registro | Mismo componente, `registro` | Ocho campos plegados, accesibilidad, valores impresos, sin envío/diagnóstico | Viable; pendiente implementar y probar |

La aprobación del brief permite producir estos recursos, no declararlos terminados. El cierre del artículo exige archivos reales, interacción, capturas y el resto de pruebas del contrato dentro de su contador único de hasta tres rondas.

## Efecto cascada

No había artículo redactado durante la ronda 1, por lo que el defecto no se propagó. La instrucción corregida no afecta a otros briefs, al artículo dental ni al primer artículo del plan. El expediente de correcciones conserva procedencia y contador. La redacción puede comenzar desde este contrato aprobado.

## Lo que sí funciona

Se mantiene la diferenciación frente a higiene dental: prioridades de consulta, causas, acompañantes, comunicación, evaluación y seguimiento. Se conservan la guía sin caso, ausencia de revisión veterinaria ficticia, prohibición de diagnosticar por olor y ayudas sin puntuación clínica. El sujeto senior continuo y las tres escenas tienen funciones distintas; el proceso dental se representa como esquema conceptual y no como fotografía o vídeo clínico.

## Qué corregir, en orden

No quedan correcciones bloqueantes del brief. Continuar con redacción y producción según contrato, y someter el artículo completo integrado a otro auditor independiente. No cambiar el brief aprobado solo para marcar estado: registrar la evolución en el expediente de flujo y los informes.

No se ha editado producción ni se han ejecutado fusión o despliegue. La validación pública del artículo nuevo sigue fuera del alcance autorizado.
