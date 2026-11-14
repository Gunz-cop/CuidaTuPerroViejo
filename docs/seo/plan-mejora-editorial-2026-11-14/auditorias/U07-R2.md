# Auditoría independiente de integración del flujo — U07 R2

Fecha: 2026-11-14. Auditor: agente `auditor_u01`, distinto del implementador. Segunda ronda de la misma unidad U07; se conserva `U07-R1.md`. Alcance: cierre de I01 y regresiones del encaje entre los procesos internos aprobados, sin auditar contenido clínico ni herramientas de producto.

## Veredicto

**APTO:** la versión evaluada resuelve I01 sin aceptar destinos desconocidos o ambiguos como cumplimiento, y conserva el encaje del contrato, los roles y los controles mecánicos.

## Versión y alcance

`U07-R2-snapshot.json` une U01-R2, U02-R2, U03-R1, **U04-R5**, U05-R1 y U06-R1. Los **23 hashes SHA-256 coinciden** con los archivos examinados, tanto al inicio como al cierre. No hay conflictos entre snapshots.

Respecto a U07 R1 cambian únicamente tres objetos de U04: referencia de métricas, CLI y tests. Las correcciones de esa unidad continuaron en R3–R5; no se reinició su contador. U04 cerró APTO en su quinta ronda. Esta revisión de integración no concede rondas nuevas a U04 ni autoriza un delta posterior sin el procedimiento correspondiente.

## Cierre de I01

El script ahora resuelve títulos completos normalizados cuando identifican una única sección, conserva selectores explícitos e índices H2-n y bloquea un destino que no pueda interpretar. No convierte `esperados` vacío en cumplimiento.

Los fragmentos se deben reconocer completos: palabras como «Introducción» dentro de un título inexistente no bastan. Los títulos que colisionan al normalizarse requieren un identificador explícito. H2-n tiene prioridad como selector frente al posible título numérico de otra sección. La referencia de métricas documenta esa gramática.

Se conserva además la prioridad de autoría reconocible o frase de título frente a una palabra débil cuando existe esa evidencia más fuerte; una coincidencia mecánica sigue sin verificar la afirmación clínica.

### Reproducciones independientes de R2

Se prepararon cuatro escenarios temporales a partir de los fixtures sintéticos estables, sin escribir en el contenido del sitio. No se contó una palabra genérica del alt de imagen como si fuera la fuente. Los tres casos negativos conservan la cita en una sección que no satisface el contrato o una asignación ambigua.

| Escenario | Resultado observado | Evaluación |
| --- | --- | --- |
| Destino `Tarea de prueba`, fuente solo en introducción | Se interpreta sección 1; exit 1, cita fuera del H2 asignado | I01 original cerrado |
| Destino `Introducción a una sección que no existe`, fuente en introducción | Destino no interpretable; exit 1 | No se acepta una coincidencia parcial con Intro |
| Dos títulos `Tarea de prueba` / `Tarea: de prueba`, asignación por ese título | Destino no interpretable; exit 1 | Ambigüedad normalizada bloqueada |
| Título único `Tarea de prueba`, fuente dentro de esa sección | Se interpreta sección 1; exit 0, APTO mecánico | Se conserva el caso válido del productor |

No se identificaron P0/P1/P2 nuevos confirmados en el delta de integración.

## Encaje conservado

- **E01–E03:** pregunta observable, respuesta/acción pronta y aportación distinta por sección pasan de brief a redacción y a ambas auditorías. No se impone una secuencia de fisiología/diagnóstico/medicación ni un mínimo universal de palabras.
- **E04:** calidad/autoridad/aplicabilidad e identidad de fuentes, afirmación y pasaje, procedencia, límites y política clínica continúan como revisión humana obligatoria. I01 ya no debilita la ubicación mecánica de la cita.
- **E05:** recursos planificados y disponibles se distinguen; las promesas requieren entrega/prueba. Una edición de skill no se presenta como prueba funcional del producto.
- **E06:** siguiente paso por necesidad y destinos publicados, sin cuotas de enlaces ni salida universal hacia HHHHHMM, chequeo o paliativos.
- **E07:** experiencia documentada entretejida o guía sin caso, sin paciente/desenlace inventados, con voz y continuidad visual preservadas.
- **E08:** contrato 2.0 explícito, legado/adenda identificado, cantidades incluidas cero, roles separados, snapshots y hasta cinco rondas por unidad. Las correcciones mantienen el contador y aprobar lo cierra.
- **Herramientas:** creación y auditoría diferencian cálculo, registro y orientación; criterios de fecha/datos/privacidad/exportación para registros y pruebas pertinentes por tipo. Las etapas y mensajes de la calculadora de edad no se imponen a HHHHHMM.

Los ejemplos históricos y recomendaciones experimentales no se trataron como normas nuevas. Una futura pieza se evalúa contra su contrato y sus fuentes; esta aprobación no convierte los ejemplos en evidencia clínica ni prueba que un piloto vaya a mejorar búsquedas.

## Verificaciones ejecutadas

1. Unión de snapshots finales y recálculo de **23/23 hashes**, sin cambios concurrentes al cerrar.
2. `node --test --experimental-test-isolation=none .agents/skills/auditar-articulo-blog/scripts/metricas.test.mjs`: **41/41 casos pasan, 0 fallan**. La ejecución sin aislamiento responde a las restricciones de subprocess de esta máquina; se verificó el número real de casos.
3. Cuatro reproducciones independientes en `/tmp/u07-r2-repro`: resultados de la tabla anterior. Los tests también cubren negativos de versión/declaraciones, cero de cajas/FAQ, legado, destino fuera de rango, selectores y recursos ausentes.
4. `git diff --check`: sin incidencias.
5. **73 enlaces relativos** de los objetos evaluados comprobados contra árbol Git más archivos nuevos del snapshot: ningún destino ausente. No se confundieron rutas no materializadas del checkout disperso con enlaces rotos.
6. Leído el delta de referencia de métricas, resolución de secciones/citas y pruebas contra el contrato/plantilla y los auditores ya revisados.

## Cierre y límites

U07 cierra **APTO en R2** y el flujo interno de esta versión queda aprobado para preparar encargos/pilotos conforme a su alcance. Las aprobaciones finales son U01 R2, U02 R2, U03 R1, U04 R5, U05 R1 y U06 R1.

No se ejecutaron build, navegador, calculadora pública, fuentes clínicas de artículos, Search Console ni operaciones de producción: no forman parte de este cambio de procesos y parser. No se modificó ningún objeto evaluado; solo snapshot e informes. Publicar/merge conserva su autorización propia y esta auditoría no declara ningún despliegue realizado.

Si un archivo aprobado cambia después, la aprobación no se traslada al hash nuevo. U04 agotó R5; un nuevo cambio que la afecte exige conservar el historial y la decisión concreta prevista por el contrato, sin reiniciar otra R1 de oficio.
