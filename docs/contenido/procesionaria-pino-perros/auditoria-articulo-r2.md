# Auditoría independiente del artículo de procesionaria — R2

Fecha: 2026-11-06. **Ronda del artículo: 2/5**. Misma sesión auditora `auditar_articulo_procesionaria` que R1; no ha redactado ni corregido el MDX. Alcance reducido: ajuste solicitado en R1, diff e invariancia de lo aprobado. No se ha repetido la auditoría científica completa ni se reinicia el contador.

Archivo: `docs/contenido/procesionaria-pino-perros/redaccion/procesionaria-pino-perros.mdx`. SHA-256 comprobado: `5422f98483c1ce7fd32d8b340ee750cd3dd6847a053789bea3629de71c5a85ce`. Versión R1 comparada: `/tmp/procesionaria-articulo-r1.mdx`, hash `e4d5e5bef2483a347188af006730bbd9a801252962915d68c81137684fa58782`.

## Veredicto

**APTO para la entrega del texto:** las cinco anclas bibliográficas ya muestran los títulos reales y el resto de la redacción conserva íntegro lo comprobado en R1.

No es una aprobación de publicación: las tres imágenes y la maquetación final conservan los gates documentados. No quedan bloqueantes editoriales del alcance solo texto.

## Hallazgos y ajuste comprobado

- **P0:** ninguno nuevo.
- **P1 de R1, títulos bibliográficos:** resuelto. Se compararon literalmente las cinco anclas de las líneas 388–392 con los cinco títulos de §3 del brief; coinciden. Las cinco URL permanecen iguales.
- **Otros ajustes pendientes del texto:** ninguno.

El diff contiene exactamente cinco sustituciones de anclas dentro del bloque `data-editorial-bibliography`. Se compararon por separado el texto anterior y posterior a ese bloque: ambos son idénticos. Por tanto, no cambian las afirmaciones, referencias contextuales, seguridad, metadatos, estructura ni recursos planificados.

## Verificación limitada de invariancia

El coordinador volvió a compilar la copia exacta en `/tmp/procesionaria-build`; su registro `build-r2.log` termina con «Complete!». El auditor leyó el registro y comprobó que el MDX temporal coincide con el hash auditado; no afirma haber repetido el build.

Sobre ese HTML nuevo, el auditor repitió el conteo DOM y comparó con su resultado R1: secciones, total, densidad, FAQ y estado inicial son idénticos. También leyó las cinco anclas del HTML generado y confirmó los títulos completos.

| Control | Resultado R2 |
|---|---|
| Palabras de cuerpo según contrato | **5.937**, dentro de **5.500–6.000** |
| Distribución por bloques | Idéntica a la tabla de R1; todos dentro de tolerancia por sección. |
| Densidad | 138 párrafos; media 35,81, mediana 36, máximo 45; 0 % >50. |
| FAQ | Siete elementos, cero abiertos inicialmente. |
| Tono | Prosa idéntica: conserva la medición de R1, 0,6 muletillas/1.000. No se presenta como nueva ejecución del script. |
| Fuentes y seguridad | Íntegras respecto a R1; no se reabrieron los cinco documentos ni se atribuye una nueva lectura. |
| Bibliografía | Cinco títulos reales; URL originales; excluida del volumen contractual conforme al brief. |

Se conserva la advertencia de R1 sobre el script mecánico antiguo: su parser del brief y su conteo bruto no sustituyen el contrato visible ni la comprobación manual. No se ha modificado para obtener un resultado favorable.

## Recursos y publicación

Siguen pendientes por alcance expreso solo texto:

1. Hero `perro-aguas-senior-ruta-alternativa-v1.webp`.
2. Imagen de llamada `perro-aguas-senior-preparar-llamada-v1.webp`.
3. Imagen de descanso `perro-aguas-senior-descanso-registro-v1.webp`.

Producir e inspeccionar esas imágenes o retirar coherentemente sus referencias antes de publicar. La lectura final a 390 px debe revisarse con la tipografía y recursos definitivos: no se declara cumplido el límite físico literal de tres líneas a partir del conteo de palabras. Las pruebas de interacción y capturas del coordinador se mantienen como evidencia suya, no repetida por el auditor. No hay despliegue ni comprobación pública del artículo nuevo.

## Lo que sí funciona

La corrección mantiene intactas las prioridades urgentes, el lavado condicionado, los límites de Niza y de la revisión histórica, el tono peninsular y el uso posterior de la calculadora. No se ha alargado el texto ni añadido material clínico para resolver un problema bibliográfico.

## Qué corregir, en orden

**Nada más para cerrar este encargo de redacción.** Entregar texto e informe; mantener la publicación pendiente de recursos y comprobaciones correspondientes. No iniciar R3 por rutina.

Rondas consumidas: **2/5 del artículo**. Auditor no ha editado el MDX, el brief ni el inventario.
