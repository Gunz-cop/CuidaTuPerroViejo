# Alimentación para perros mayores sin dientes

Encargo: 19 de octubre de 2026. Alcance exclusivo: el artículo de alimentación para perros mayores sin dientes, su brief, fuentes, recursos visuales, comprobaciones y auditoría independiente. Entrega en rama y PR; no fusionar ni desplegar.

## Entrada y alcance

El mensaje del usuario menciona un plan adjunto, pero no se recibió un archivo ni una referencia descargable en esta sesión. Se buscaron archivos en las carpetas de adjuntos del entorno y el plan en el repositorio, y se solicitó su ruta, enlace o instrucciones mediante una pregunta pendiente. No se acredita haber leído ese adjunto. Se avanza con la instrucción explícita y la entrada pendiente del inventario: «Cómo alimentar a un perro senior sin dientes: recetas blandas y papillas caseras».

El ángulo propuesto distingue adaptación de textura, boca cicatrizada, posoperatorio y dificultades para tragar. No presupone que una receta o papilla casera constituya una dieta completa. Se evita duplicar los artículos de comida casera y salud dental.

## Responsabilidades

| Rol | Sesión | Responsabilidad |
|---|---|---|
| Coordinación y entrega | `/root` | Rama, entorno, alcance, verificación técnica y PR. |
| Creación del brief e investigación | `/root/creacion_brief` | Fuentes, estructura, contrato y registro de afirmaciones. No audita. |
| Creación de artículo y recursos | `/root/creacion_articulo_visuales` | Redacción tras APTO del brief, imágenes y componentes funcionales. No audita. |
| Auditoría independiente | `/root/auditoria_independiente` | Comprueba documentos estables y fuentes por sí mismo. No corrige. |
| Corrección | `/root/correccion` | Sesión distinta de creación y auditoría; solo interviene a partir de hallazgos del informe. No audita. |

## Reglas de cierre

- Brief: máximo tres rondas, sin redactar hasta APTO.
- Artículo: máximo tres rondas, incluyendo sus recursos completos; no reiniciar el contador por imágenes o por fallos técnicos.
- Si la tercera ronda de un documento falla, detener ese documento y presentar el bloqueo al usuario.
- La comprobación propia del creador y las pruebas técnicas no sustituyen una auditoría independiente.
- Capturas y resultados deberán identificar la versión comprobada y distinguir validación local de publicación.
- El inventario no se marcará como Publicado: la entrega no autoriza fusión ni despliegue.

## Entorno inicial

Base: `c9af722dd5cf27d8d37878ba01c4df339f0b6f76` de `main`. Rama: `contenido/alimentacion-perros-mayores-sin-dientes`.

Se leyeron `AGENTS.md` y las skills editoriales correspondientes. Se instaló el lockfile sin modificar dependencias. El build inicial, sin cambios de producto, finalizó correctamente y generó 32 documentos de proyección. La configuración y caché de las herramientas se sitúan en `/tmp` para respetar los permisos del entorno. Los registros finales y las capturas se incorporarán al expediente al finalizar las comprobaciones.

`astro check` inicial: 0 errores, 0 advertencias y 62 hints preexistentes. Registros de base en `verificacion/base-build.log` y `verificacion/base-check.log`.

## Registro de rondas

| Documento | Ronda | Resultado y evidencia |
|---|---|---|
| Brief | 1/3 | NO APTO: contrato de bibliografía y de controles de la secuencia; declaración visible de IA del hero. Fuentes verificadas. Ver `auditoria-brief-r1.md`. |
| Brief | Corrección tras R1 | Rol de corrección separado; registro y hashes en `correcciones-brief-r1.md`. No es una auditoría adicional. |
| Brief | 2/3 | **APTO para redacción**, sin pendientes. Ver `auditoria-brief-r2.md`; hash `accdd752038ed26bd5d30971bfecefe8237c26562c9262f23196fa449e8cf79c`. No se consume R3. |
| Brief | 3/3 | **APTO** tras corregir la incompatibilidad técnica detectada en el build. Ver `auditoria-brief-r3.md`; hash `fb110f500fc009ac86263bd8ca817e361f3f073be6413ae3c5e57d92ec5af0fa`. No queda cuarta ronda disponible. |
| Artículo completo con recursos | — | Sin rondas iniciadas; redacción y producción activadas tras APTO del brief. |

### Incidencia técnica posterior al APTO de R2

El primer build del artículo encontró una contradicción nueva del contrato: `status: Borrador` permite generar la ruta y el sitemap, pero `src/lib/assistant/catalog.ts` solo admite `Publicado` o ausencia de estado. El inventario de agent-readiness depende de ese catálogo y falla con `UNCLASSIFIED_PAGE` y `SITEMAP_UNEXPLAINED_DIFFERENCE`. Evidencia: `verificacion/build-inicial-borrador.log`.

Se envió al rol de corrección el ajuste del estado técnico conforme a la skill de redacción, manteniendo el inventario en curso y la prohibición de fusionar/desplegar. No se cambia el catálogo ni se introduce una excepción de clasificación. Este fallo nuevo requiere reabrir el brief en su **tercera y última ronda**, sin reiniciar el contador ni alterar el contrato clínico. La auditoría del artículo todavía no ha comenzado.

La corrección quedó documentada en `correcciones-brief-integracion.md` y aprobada independientemente en `auditoria-brief-r3.md`. `Publicado` es el valor técnico de completitud requerido por el catálogo; no acredita que el artículo esté en producción. El control real de esta entrega sigue siendo la rama y el PR, sin fusión ni despliegue.
