# Protocolo de medición del piloto

Fecha: 2026-11-14. Parte del [plan](README.md). Estado: fuentes recibidas y cruce exploratorio documentado; línea base reciente por URL y periodo homogéneo pendiente.

## Datos de entrada

Del informe de rendimiento web de Search Console: periodo, tipo de búsqueda, consultas y páginas con clics, impresiones, CTR y posición; desglose por país y dispositivo cuando sea viable. Priorizar export de tres meses y una ventana reciente de 28 días completos con comparación anterior equivalente. Conservar filtros y fecha del último día disponible: los datos recientes pueden estar incompletos.

Para relacionar consulta con URL se necesita el desglose correspondiente o export filtrado por página. Las tablas globales separadas de «consultas» y «páginas» no permiten inventar esa relación. Registrar filas omitidas, consultas anonimizadas y otras limitaciones del export.

Los originales y cifras absolutas de audiencia se conservan en el espacio privado que acuerde el propietario; no se suben al repo público. En el repo se documentan método, periodos, decisiones y evidencia sin esos datos. El cruce inicial confirma la importancia de HHHHHMM en las dos fuentes aportadas. Esto no equivale al volumen total de búsqueda del mercado ni demuestra uso completado; ver la adenda de recepción al final.

## Antes de cada publicación

1. Identificar unidad (T01/P01/A01/A02/N01), URL, intención, consultas, país/dispositivo y periodo.
2. Guardar commit/versión previa, captura móvil, lista de tareas y recursos que ya funcionan.
3. Anotar el cambio exacto: título/metadatos, orden, texto, enlaces, recursos o función. Preferir una hipótesis principal por entrega.
4. Capturar 28 días completos previos y, si existe, contexto de tres meses; separar las URLs legacy para interpretar cambios sin duplicar cifras.
5. Elegir al menos una página comparable sin cambio cuando sea razonable. Es una referencia observacional; no equivale a un experimento aleatorizado.
6. Revisar qué mide la instrumentación actual. No registrar «uso» a partir de páginas vistas ni «finalización» a partir de una descarga aislada.

## Preguntas, indicadores y fuentes

| Pregunta | Indicador posible | Fuente y condición |
| --- | --- | --- |
| ¿Responde a lo que buscan? | Consultas por intención y URL; impresiones, clics, CTR y posición por grupo comparable | Search Console con mismos filtros y periodos completos |
| ¿Se descubre el contenido revisado? | Aparición en consultas pertinentes; indexación y destino canónico | Search Console y comprobación pública |
| ¿La persona encuentra lo que necesita? | Completar tareas: localizar siguiente paso, encontrar un registro previo, preparar resumen o llegar a la guía adecuada | Prueba de tareas con observaciones reales; no inventar usuarios ni resultados |
| ¿Usa los recursos? | Inicio/terminación de registro, apertura del historial, acción de imprimir/exportar o enlace contextual | Solo si hay eventos existentes comprobados o instrumentación específicamente encargada |
| ¿Funciona el cambio? | Sin pérdida de registros, PDF legible, contraste, teclado, navegación y recursos operativos | Casos reproducibles y revisión móvil/escritorio |
| ¿Mejoró la utilidad editorial? | Respuesta inicial reconocible, aportación distinta por sección y correspondencia fuente→acción | Auditoría independiente del contrato E01–E08 |

Si se añade telemetría, inventariar archivos y eventos primero. Usar acciones agregadas sin notas clínicas, respuestas de salud, nombre del perro, correo o identificadores personales. Un clic en imprimir significa acción iniciada, no PDF guardado o leído.

CTR agregado se recalcula como clics/impresiones, no como media simple de porcentajes. No promediar posiciones sin ponderación ni mezclar países, dispositivos o consultas diferentes para atribuir un resultado a la escritura.

## Cadencia

- Tras publicar: verificar URL, recursos, canónica, enlaces y tareas esenciales.
- Primera semana: errores y funcionamiento; no declarar éxito o fracaso SEO por unos días.
- A los 28 días completos: primera lectura por unidad e intención, con contexto de posición, impresiones y mezcla de consultas.
- A los 56 días completos: confirmar, ampliar observación o proponer el siguiente lote. Bajo volumen puede exigir esperar más.

Para un artículo nuevo no existe una línea base de esa URL: evaluar indexación, descubrimiento y tareas; no expresar crecimiento porcentual desde cero.

## Decisión

| Resultado | Acción |
| --- | --- |
| Falla una tarea esencial, una referencia o un recurso | Corregir antes de ampliar el lote; documentar causa y versión |
| Mejor utilidad y señales de búsqueda compatibles, con datos suficientes | Proponer lote siguiente de dos o tres artículos |
| Mejora editorial comprobada, búsqueda inconclusa | Mantener y seguir observando; expansión editorial solo con esa limitación explícita |
| Menor CTR con caída de posición o mezcla de consultas distinta | Investigar antes de culpar al texto |
| Fallo repetido que nace en el brief o plantilla | Corregir el proceso y sus auditorías antes de producir más |

El umbral de «datos suficientes» y un cambio relevante se fijarán con la línea base antes del lanzamiento, no después de ver los resultados. No imponer un porcentaje arbitrario de mejora ni garantizar causalidad: estacionalidad, posición, competencia y cambios de mezcla pueden explicar parte del resultado.


## Recepción de fuentes — 2026-11-14

Se recibió el export de rendimiento Web con fechas reales del gráfico del 12 de agosto al 11 de noviembre de 2026 y la transcripción del top de páginas vistas estimadas del panel para 30 días, sin extremos ni fecha exacta de consulta aportados. El nombre del ZIP no convierte el 14 de noviembre en último día medido.

Se contrastaron definiciones con el código de lectura del panel y se documentaron [prioridades y límites](prioridades-search-console-panel-2026-11-14.md), sin publicar cifras absolutas. Los originales y el cruce numérico permanecen privados. El acceso directo al panel/D1 no se completó; su fuente numérica es la transcripción del propietario.

El trimestre sirve para elegir candidatos. Quedan pendientes cortes recientes por URL, consultas filtradas por página y metadatos del próximo corte del panel antes del primer experimento. No se cambiaron las reglas de medición de este protocolo ni se ejecutó un piloto público.
