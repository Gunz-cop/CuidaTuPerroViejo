# Reinicio editorial autorizado por el propietario

Fecha: 2026-10-20. Tema único: alimentación para perros mayores sin dientes.

El propietario rechazó expresamente la entrega completa, incluido el brief de 2.200 palabras y el artículo anterior. Su instrucción posterior fue empezar desde el inicio: brief, auditoría, redacción, auditoría, animaciones y dos imágenes adicionales. Permite reutilizar imágenes anteriores si sirven. El contexto establece artículos de alrededor de 6.000 palabras; no autoriza ampliar el texto rechazado para alcanzar esa cifra.

## Antecedentes que se conservan

La serie anterior conserva sus informes: brief R1 NO APTO, R2 APTO, R3 APTO; artículo completo R1 APTO técnico/editorial, posteriormente rechazado por el propietario. Esos veredictos no aprueban el nuevo encargo. El artículo anterior se conserva literalmente en `articulo-v1-rechazado.mdx.txt`; el brief y sus informes siguen en sus rutas originales y en el historial Git. La fuente del nuevo documento no será ese texto.

El nuevo encargo se registra como versión v2 por el reinicio explícito del propietario, no como una cuarta corrección del brief agotado. Máximo tres rondas de auditoría del nuevo brief y tres del nuevo artículo, incluyendo el cierre integrado sobre sus recursos. Si falla la tercera de un documento, detenerse y presentar el bloqueo. No abrir contadores separados para texto, animaciones o imágenes.

## Secuencia y roles

1. Creación de brief v2 desde investigación comprobable y preguntas del lector; presupuesto de unas 6.000 palabras de contenido visible, desglosado sin sumar código ni etiquetas.
2. Auditor independiente evalúa el brief; una persona/agente distinto aplica correcciones si procede.
3. Redactor distinto de auditor escribe desde el brief APTO, sin ampliar el artículo rechazado.
4. Auditor revisa el texto; la comprobación editorial inicial y su cierre con recursos pertenecen a la misma serie, con versiones y límites explícitos.
5. Producción e integración de animaciones didácticas y dos imágenes nuevas, además de recursos anteriores pertinentes.
6. Auditoría final del conjunto y pruebas en navegador, accesibilidad y build/check. Entrega legible y visual para revisión del propietario.

## Publicación

Se conserva la rama `contenido/alimentacion-perros-mayores-sin-dientes` y la PR #123, devuelta a borrador al iniciar este encargo. Esta rama ya está excluida del disparador automático de versiones de prueba de Cloudflare. No crear otra rama remota que active ese disparador. No fusionar ni desplegar. El incidente automático previo se conserva documentado en `../incidencia-preview-automatica.md`.

## Registro v2

| Documento | Ronda | Versión | Resultado |
|---|---|---|---|
| Brief v2 | 1/3 | SHA256 `cc0a17cb8d7073424ebf3b72dd1877243e03a73ff187161bc2108f0bf044c91e` | NO APTO: exclusión bibliográfica incoherente en el contrato; corrección separada asignada. Informe `auditoria-brief-r1.md` |
| Brief v2 | 2/3 | SHA256 `aad66c2635a0aa719a777db3f588318ff6ddba79c4b0ec50659342eb624dd208` | APTO para redacción; informe `auditoria-brief-r2.md`. No equivale a recursos terminados ni aprobación del artículo |
| Artículo v2 y recursos | 1/3 | Scratch SHA256 `05ffebd06f2adf79a29495907b339bba5edf1f28dda15e09ebce0957172ee9f8` | APTO EDITORIAL PROVISIONAL; informe `auditoria-articulo-r1.md`. 5.844 palabras AST. No publicable aún: recursos y cierre integrado pendientes; producción visual autorizada tras el veredicto |
| Artículo v2 y recursos | 2/3 | MDX `8600c7a8ec6a8fb9d58c3ad35d77770a8233ca8684bd38c694f486ef6d314be2`; componente `f06a38f052eb430e9b701a671607e93753709dade29905d2bc8749f39a92d899` | APTO / Publicable para entrega y revisión del propietario; conjunto completo verificado en `auditoria-articulo-r2.md`. 5.858 palabras DOM, recursos y lectura privada funcionando. No autoriza publicación |

Brief y artículo conservan una tercera ronda disponible; no se consumió ni se abrió una serie separada para los recursos. Los cambios posteriores a este cierre se limitan al índice de entrega, inventario, metadatos de PR y evidencia de CI/no despliegue; no alteran los documentos ni recursos aprobados.
