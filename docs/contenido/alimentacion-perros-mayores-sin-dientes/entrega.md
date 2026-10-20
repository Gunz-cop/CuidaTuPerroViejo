# Alimentación para perros mayores sin dientes

Entrega limitada a este artículo. Rama: `contenido/alimentacion-perros-mayores-sin-dientes`. Base: `c9af722dd5cf27d8d37878ba01c4df339f0b6f76`. Producto completo preparado en `c386535d0e9b2c1a48596574555cf50e89fdc507`. No se ha fusionado ni desplegado.

El plan mencionado como adjunto no llegó a la sesión. Se solicitó su ruta y se ejecutaron la instrucción explícita y el tema pendiente del inventario. Esa limitación se conserva en los informes; no se afirma haber leído el adjunto.

## Estado de auditoría

- Brief: **APTO, ronda 3/3**, [informe final](auditoria-brief-r3.md). La tercera ronda resolvió una incompatibilidad real del estado técnico con el catálogo; no se reinició el contador.
- Artículo completo y recursos: **pendiente de cierre de la ronda 1/3**. El auditor es distinto de creación y corrección.
- [Roles, alcance e historial](coordinacion.md).

## Contenido y recursos

Guía sin caso clínico personal, basada en seis documentos identificados y verificados. Distingue boca cicatrizada, extracción reciente y dificultad para tragar. No ofrece recetas completas universales, proporciones de agua, días posoperatorios ni resultados clínicos inventados.

Se entregan tres escenas coherentes de un beagle senior, declaradas visiblemente como ilustraciones generadas con IA; nueve WebP responsive y sus originales. El artículo integra matriz de situaciones, comparación accesible de presentaciones, secuencia de tres pasos y registro editable e imprimible, sin envío de los campos. Los recursos funcionan localmente y conservan alternativas sin JavaScript.

- [Artículo MDX](../../../src/content/blog/alimentacion-perros-mayores-sin-dientes.mdx).
- [Brief aprobado](../../../briefings/briefing-alimentacion-perros-mayores-sin-dientes.md).
- [Informe de creación, tabla por H2 y fuentes](informe-creacion-articulo.md).
- [Producción y continuidad visual](produccion-visual.md).

## Comprobaciones locales

Build completo: **33 documentos**. `astro check`: **0 errores, 0 advertencias, 62 hints preexistentes**. Las **107 pruebas generales** y las pruebas offline de agent-readiness pasaron. Inventario, descubrimiento, proyección Markdown, API, routing, crecimiento y correspondencia semántica también pasaron. Los registros están en [verificacion](verificacion/).

La comprobación técnica de coordinación con axe no detectó infracciones automáticas en el artículo completo a 390 y 1366 px, claro y oscuro. Se confirmó decodificación de las tres imágenes y ausencia de anclas rotas. La validación propia cubre además 375/320 px, foco/teclado, pausa, reproducción finita, repetición, movimiento reducido y lectura de todos los pasos sin JavaScript y en impresión. No se presenta una prueba automática como certificación completa de accesibilidad.

El registro normal y el rellenado hasta sus máximos caben en una A4 a 10 pt, conservando los valores. Los resultados y límites de esas pruebas están en [impresion-final.json](impresion-final.json) y en el informe de creación. Las pruebas usan Chromium local y no certifican un despliegue ni todos los navegadores.

`status: Publicado` es el valor técnico requerido por el catálogo de este repositorio; no acredita publicación pública. El inventario mantiene el artículo en curso. La autorización termina en rama y PR.

## Capturas y recursos de revisión

- [Página móvil en oscuro](capturas-creacion/390-dark-pagina.png).
- [Página de escritorio](capturas-creacion/1366-light-pagina.png).
- [Detalle móvil de la secuencia](capturas-creacion/390-dark-paso-2.png).
- [Matriz en escritorio](capturas-creacion/1366-light-matriz.png).
- [Registro rellenado: PDF de comprobación](capturas-creacion/registro-relleno.pdf).
- [Registro al máximo: PDF de comprobación](capturas-creacion/registro-maximo.pdf).

Las capturas de página conservan navegación y asistente. Las de detalle separan temporalmente esos overlays para mostrar el recurso completo; el informe de creación declara esa diferencia. Los PDF son evidencias locales de impresión, no descargas prometidas dentro del artículo.
