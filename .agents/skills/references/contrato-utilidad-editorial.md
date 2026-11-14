# Contrato de utilidad editorial — versión 2.0

Decisión del propietario: 2026-11-14. Referencia común para planificar, redactar y auditar. Se aplica a los encargos que declaren `Contrato editorial: 2.0`. Los contratos anteriores conservan su versión; una revisión necesita una adenda explícita, nunca una migración silenciosa para aprobar.

## Criterios verificables

| ID | Qué debe resolver el contrato | Evidencia de cumplimiento |
| --- | --- | --- |
| E01 | Pregunta o situación observable, público y decisión principal | Apertura prevista, intención y diferencia frente a páginas existentes; consulta real si está disponible, sin inventar Search Console |
| E02 | Encontrar pronto respuesta, acción y consulta urgente si corresponde | Orden y ubicación en el recorrido móvil; no obligar a leer fisiología antes de actuar |
| E03 | Una aportación distinta por sección | Pregunta, respuesta, fuentes y presupuesto justificado; sin mínimo universal ni secciones para completar volumen |
| E04 | Distinguir observación, explicación posible y valoración profesional | Fuente→afirmación→localización y límites; ninguna prueba doméstica presentada como diagnóstico |
| E05 | Recursos útiles y reales | Recurso→tarea→ruta→responsable→estado→prueba; puede justificarse que no haga falta un recurso adicional |
| E06 | Continuación adecuada para la necesidad | Enlace→motivo→destino publicado; revisión preventiva, urgencia y seguimiento son tareas diferentes |
| E07 | Voz y experiencia con procedencia | Guía sin caso o hechos documentados entretejidos, sin paciente, diálogos ni desenlace inventados |
| E08 | Mismo contrato de principio a fin | Versión, archivos, hash, alcance, excepciones y requisito→sección/recurso→prueba; autor y auditor distintos |

La investigación es previa a las afirmaciones. El orden de lectura responde a las necesidades de la persona, no al índice de los papers. Una limitación clínica imprescindible permanece junto a la acción; la voz cálida no la elimina.

## Componentes y estructura por función

En versión 2.0 los AlertBox de cuerpo se eligen por función: `info` para orientación útil, `danger` para una señal urgente pertinente y `warning` para un riesgo concreto del manejo. No hay cuota universal de tres ni obligación de incluir medicación o diagnóstico en todo tema. Un tema sin señales urgentes puede llevar cero cajas de cuerpo; justificarlo en el contrato. Un tema con riesgo relevante no puede omitir su aviso para simplificar el diseño.

Declaración mecánica obligatoria en el brief, con enteros de 0 a 9 y una sola línea:

`Componentes de cuerpo: info=0; danger=1; warning=0`

Los números son cantidades pactadas, no índices clínicos. Cada caja tiene tipo, ubicación, función, fuente si es clínica y criterio de aceptación. El cuadro final de fuentes no forma parte de este conteo. Se mantiene separado como bibliografía y complementa las citas próximas a las afirmaciones. FAQ y apoyos visuales tienen cantidad justificada; si se planifican cero FAQ, declararlo expresamente. Los formatos y scripts deben distinguir cero de dato ausente.

Mantener 1–11 como secciones del brief para compatibilidad de referencias. Cada bloque de desarrollo usa `### [H2 - Título] — Target: ~N palabras`; la introducción y cierre tienen target propio. Rango: `intervalo MIN–MAX palabras`, con números reales al cerrar el brief. La tabla de fuentes usa columnas `# | Fuente | H2 asignado | ¿Citada?`.

## Contratos anteriores y transición

Una skill productora actualizada puede preceder a su auditora durante este programa. La auditoría del cambio usa este contrato 2.0 y el encargo explícito, no las cuotas de una skill todavía pendiente de migración. Esa incompatibilidad se registra como dependencia pendiente; no se afirma que el flujo completo esté listo hasta aprobar todas sus unidades y la integración final.

Para un brief antiguo, leer su contrato y adaptar solo mediante adenda con alcance y motivo. Fuentes y seguridad prevalecen sobre un contrato equivocado; una afirmación central sin respaldo se corrige antes de continuar. Los ejemplos históricos son contraejemplos o material no validado, nunca autoridad normativa.

## Auditorías: cinco rondas por unidad de cambio

El propietario autorizó el 2026-11-14 hasta **cinco rondas por unidad de cambio**. Se detiene al aprobar; no se hacen cinco revisiones ceremoniales. Cada unidad declara antes de empezar sus archivos y criterio de cierre. Corregir un hallazgo de esa unidad consume la ronda siguiente; cambiar nombre, archivo o auditor no reinicia el contador. La siguiente unidad con alcance distinto empieza en R1. Si falla R5, detener esa unidad y las dependientes e informar al propietario.

Una unidad aprobada modificada después necesita revisión de su delta y de las dependencias afectadas. No presentar la aprobación de un hash anterior como aprobación del nuevo. Conservar el historial; si cambia sustancialmente el alcance o se agota el presupuesto, pedir una decisión concreta en vez de reiniciar de oficio.

Registrar unidad, ronda, snapshot/hash, autor, auditor independiente, pruebas, hallazgos, instrucciones y resultado. El auditor escribe informes, no corrige los archivos evaluados. La comprobación mecánica del implementador no es auditoría independiente.

## Aceptación y límites

Una entrega pasa cuando satisface E01–E08 aplicables, fuentes, política clínica, recursos y requisitos técnicos, con omisiones justificadas. Documentar no aplicabilidad sin convertirla en dispensa general. Un PDF o herramienta prometidos se prueban; compilación y HTTP 200 solos no acreditan uso real. Contenido incompleto en `src/content/blog/` puede compilar aunque diga Borrador: no se usa `status` como protección.

Consultar [calidad editorial](calidad-editorial-adsense.md), [voz](guia-voz-tono.md), [dirección visual](direccion-visual-editorial.md) y [apoyos responsive](apoyos-visuales-responsive.md). Mantener cinco rasgos senior, continuidad y revisión visual cuando aparecen perros; las excepciones documentadas de sujetos reales conservan su alcance. AGENTS.md prevalece sobre ejemplos que propongan dibujos propios en SVG/CSS.
