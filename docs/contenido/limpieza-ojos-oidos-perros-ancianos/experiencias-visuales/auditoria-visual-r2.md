# Auditoría independiente de la ampliación visual — ronda 2

Fecha: 2026-10-16. **Resultado: APTO para integrar/publicar esta ampliación visual. Sin bloqueantes abiertos.** No equivale a aprobación visual del usuario ni a aprobación de AdSense.

## Versión y alcance

- Componente `src/components/article/OjosOidosVisual.astro`, SHA-256 `4738cad3f7407972a4f635000f75bc681fd6c387db21ea055e576235f57b66ba`.
- Artículo `src/content/blog/limpieza-ojos-oidos-perros-ancianos.mdx`, SHA-256 `7981ebf9e7586c71942314aa4e13c1710d200f4e444fd6b2cdc95dd8c60fd147`.
- Los hashes se calcularon personalmente sobre los archivos finales. Se leyó la implementación corregida y se revisó su build servido localmente en el puerto 8766.
- Segunda ronda de un máximo de tres del nuevo encargo visual. No constituye una cuarta ronda editorial ni reabre el brief o la aprobación anterior del artículo. El auditor no modificó el producto.

## Resolución de los tres hallazgos de R1

1. **Marcador ótico: resuelto.** Centro corregido a `(386,154)`, en la región externa proximal, con doble borde claro/verde que se distingue del pelo. Se inspeccionó `390-oscuro-paso-3.png`: la zona es perceptible en móvil, conserva carácter orientativo y no indica introducir objetos en el conducto.
2. **Contraste del detalle auditivo: resuelto.** Capturas `390-oscuro-audicion.png` y `1440-oscuro-audicion.png` inspeccionadas personalmente. Fondo y texto locales permanecen claros/legibles en modo oscuro; el desglose y la aclaración 5 + 2 + 1 se leen completos. El barrido del implementador registra mínimo 5,91:1 para el texto activo de los recursos y 8,79:1 para la aclaración del detalle auditivo.
3. **Impresión con JavaScript: resuelto.** Los paneles se ocultan por estado CSS, sin el atributo `hidden` que impedía recuperar los pasos. Prueba independiente Playwright/Chromium sobre el build final: cuatro paneles visibles y controles ocultos al emular impresión, tanto con JavaScript como sin él.

## Comprobaciones independientes de navegador

Pruebas propias, además de leer la evidencia del implementador:

- En móvil 390 px no hay desbordamiento horizontal.
- Con JavaScript se muestra un paso; sin JavaScript permanecen los cuatro y desaparecen los controles.
- En movimiento reducido, reproducir queda deshabilitado y el lector puede avanzar manualmente.
- Teclado: enfocar siguiente y pulsar Enter avanza al segundo paso.
- Pausa: después de reproducir y pausar, el paso permanece estable durante 6,7 segundos.
- Reproducción finita: tras reiniciar desde el último paso y esperar 27 segundos, termina en el paso 4, `data-playing=false` y botón «Repetir».
- No se recibieron errores JavaScript durante esa prueba.
- Se inspeccionaron las capturas finales del mapa de decisión a 375 px, los estados 2/3/4 en móvil oscuro, la secuencia de escritorio claro y las infografías auditivas de móvil/escritorio oscuro. El mapa y los textos se leen; los recursos no deforman al perro ni pretenden representar movimiento corporal.

## Evidencia complementaria del implementador

Se leyó `navegador-parcial.json`, que ya contiene las cuatro combinaciones: 375 claro, 390 oscuro, 1440 claro y 1440 oscuro. En todas registra las cuatro etapas, tres anclas válidas, controles de al menos 44 px, ausencia de autoplay y desbordamiento, pausa estable, finalización, recorte decodificado, desplegable manejable con teclado, impresión con cuatro pasos y movimiento reducido manual. Mínimo de contraste registrado: 5,91:1. La prueba de visibilidad es sintética; no se presenta como prueba de comportamiento de todos los navegadores al cambiar de pestaña.

`regresion.log` registra cinco pruebas aprobadas. Build y check correctos fueron comunicados por el implementador; el auditor no repitió esos comandos. La evidencia integral definitiva de ejecución puede completar el JSON parcial sin alterar los hashes auditados.

## Utilidad y límites conservados

Se mantienen tres funciones distintas y proporcionadas al texto: mapa para decidir antes de intervenir, secuencia guiada de cuidado indicado y exploración de la cohorte. La fidelidad clínica revisada en R1 permanece: no hay dosis, diagnóstico doméstico ni promesa de prevenir deterioro mediante limpieza. La cohorte sigue siendo 39 = 19 + 12 + 8, con 8 = 5 + 2 + 1, según la fuente comprobada en la auditoría editorial R2 anterior.

El recorte senior y sus variantes mantienen identidad y transparencia editorial; no se presentan como paciente real ni vídeo. La secuencia utiliza cambios de marcadores y material, sin deformar anatomía. La retención es una finalidad de diseño pendiente de medir con uso real; no se atribuye una mejora cuantitativa.

Esta aprobación corresponde al build local y a los hashes anteriores. Push, despliegue público, decodificación de recursos en producción y aprobación expresa del usuario son estados posteriores que debe comunicar y verificar el implementador por separado.
