# Propuesta concreta tras el bloqueo #66

Estado: propuesta del arquitecto pendiente de decisión del dueño. No habilita programación, recapturas, R2 ni main. Continúa el mismo bug #65 y su contador **1/5**; [#66](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/66) describe el déficit descubierto en R1.

## Entrega autorizable

1. Conservar intactos el candidato R1, sus originales HTTP y los informes. Corregir sólo los bloqueantes R1-B01–B06 del registrador/plan: Date permitido; URL de ejecución vinculada al source/allowlist congelados; expectativas delegadas según B08; dependencia del suplemento; representación/MIME/ETag desde el formato esperado; estabilidad ETag y CDN no-store aplicables. No editar runtime de producto, stack, configuración fuente, contenido o SDD.
2. Verificar offline el verdadero pipeline mediante transporte sintético, sin sustituir la función que valida las respuestas. Cubrir los 1.284 IDs, dependencias GET/HEAD, formatos, codificaciones, filas N/A y STOP con parciales/restantes. Inyectar los defectos observados para demostrar que se detectan; todo resultado de esa simulación se etiqueta como TEST.
3. Preparar dos fixtures en un archivo privado fuera del directorio que borra el build. Antes de Workerd, guardar los bytes reales del índice malformado y un manifiesto de todo el árbol que pruebe la ausencia del índice en el otro fixture. Conservar configuración efectiva aislada, hashes del bundle y del árbol de assets; ligar las rutas de ASSETS a esos insumos preservados. Leer los archivos reales para calcular los hashes, sin derivarlos del error503 esperado.
4. Ejecutar una **nueva lista finita de ocho capturas locales**, índice ausente/malformado × HTML/Markdown × GET/HEAD, con dos isolates separados y sólo ASSETS/SESSION local. Esta serie adicional sería independiente de las ocho respuestas anteriores; no las reemplaza ni completa retrospectivamente. Guardar solicitud, timestamp, status/header block CRLF, output curl, métricas y cuerpo antes de validar. HEAD conserva su prueba de entidad ausente separada del output de cabeceras.
5. Verificar el mismo manifiesto de insumos después de las capturas y de cualquier build posterior; el directorio retenido debe sobrevivir al rebuild. Ante un fallo aplicable, detenerse, conservar parciales y registrar el bug; no repetir para obtener verde.
6. Congelar helper, plan propuesto, insumos, respuestas, resultados e índices de omisiones. Comparar nuevamente los 57 artefactos del corpus. El mismo auditor independiente revisa **R2/5** sobre commit/tree fijos; máximo cinco revisiones totales, sin reinicio. La ausencia de datos necesarios vuelve a detener la ejecución.

## Continuidad después de PASS

Root publicará sólo el diff literal propio y comprobará tree local/remoto. Antes de cualquier solicitud pública obtendrá CI/Workers y Commit Preview oficial del propio PR64 y del mismo HEAD. El programador preparará fuera de Git una copia de ejecución que vincule esa URL/source/checks sin añadir IDs, endpoints o solicitudes.

El límite público sigue siendo el plan finito de 1.284 posibilidades, incluido el suplemento máximo144. Sólo GET/HEAD estáticos; sin acciones de formularios, APIs/admin/Assistant, evaluator, JS, POST, retries, redirecciones seguidas ni calibraciones. N/A únicamente para las filas dependientes de un ETag HTML anunciado con prueba de ausencia GET/HEAD de su mismo contexto. Ante el primer fallo público: bug y STOP.

La entrega F2B completa requerirá después su primera auditoría formal B **R1/5**. Su aceptación técnica no autoriza main. La promoción F2A+B se presentará al dueño con commits, checks, PASS y rollback concretos.
