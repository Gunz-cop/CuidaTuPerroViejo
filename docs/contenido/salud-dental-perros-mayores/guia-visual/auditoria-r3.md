# Guía dental — auditoría independiente R3 final

17 de octubre de 2026. Versión: `dd0d1a5e351b4335f72be5720526a170a6fe3519`, rama `contenido/guia-visual-cepillado-dental`. **APTO para presentar la propuesta móvil al usuario. La aprobación visual del usuario y el paso a main siguen pendientes.** No se ha modificado producto ni publicado nada durante la auditoría.

## Alcance y rondas

Tercera y última ronda propia del componente nuevo: requisito adicional del usuario de ver imagen, instrucción y controles juntos en móvil. Se conservan R1 NO APTO por impresión y R2 APTO para la versión anterior. Se reutilizan las comprobaciones de anatomía, identidad y fuente de esas rondas; no se reabre la auditoría clínica del artículo dental ni se añaden nuevas recomendaciones. La integración técnica de protección de inserciones recibe su primera comprobación independiente dentro de esta adenda.

## Resultado independiente

- Navegador Chromium sobre build local en 4321: cuatro escenarios (320×568 claro, 390×844 oscuro, 320×568 oscuro con movimiento reducido y 412×915 claro), dieciséis estados de paso. Tras colocar el reproductor a 76 px de la parte superior, imagen, instrucción y controles caben simultáneamente, dejando al menos 54 px inferiores. Es una comprobación con el reproductor situado en pantalla; la introducción y las notas desplegadas pueden requerir scroll.
- Inspección visual de las capturas de 320 y 390 px: el recorte conserva el labio, los dientes y el contacto externo del cepillo. No se exige ver el cuerpo entero para este gesto. La ampliación llega a escala 1,9 y mantiene la zona dental visible tras completar la transición. En el teléfono estrecho, el botón superpuesto tapa parte inferior de la mano/cepillo y el recurso ampliado pierde nitidez: no impide reconocer labio y dientes, pero tampoco debe usarse para inferir presión o dentición completa.
- Los avisos sobre dolor/sangrado permanecen en la introducción y el cuarto paso muestra directamente «Si aparta la cabeza o se resiste, para», sin depender de abrir las notas. Texto e instrucciones son legibles en las capturas, sin desbordamiento horizontal detectado. No se repitió aquí el cálculo exhaustivo de contraste, ya documentado en R2.
- El resumen nativo de consejos se abre con teclado (Enter) y permite acceder al enlace de fuente. Sin JavaScript: cuatro pasos, cero botones inoperantes visibles y notas desplegables accesibles. Impresión vuelve a mostrar cuatro paneles. Las imágenes se decodifican al mostrar los pasos; cero errores JS capturados en la matriz.

## Protección del contenido interactivo

Leídos `PostReader.astro`, `reader-atomic.ts` y su prueba. `parse5` obtiene offsets del HTML original; el recorrido conserva el rango exterior marcado, incluso con secciones anidadas. El cálculo y reemplazo de párrafos excluyen los mismos rangos, sin reserializar el documento ni desplazar offsets. El diff mantiene constantes publicitarias, claves y condiciones de inserción; cambia la elegibilidad de párrafos interiores del componente.

En la página renderizada se comprobaron cero `.ad-slot` dentro de la guía y exactamente un slot 300×250 y otro 320×50 intermedio fuera. No se evalúan proveedor ni contenido publicitario externo: se bloquearon solicitudes ajenas al servidor local en estas pruebas. No es una auditoría de Adsterra.

Ejecutado por este auditor: `node --import tsx --test tests/reader-atomic.test.ts`, salida 0. La invocación informa un archivo aprobado; contiene casos de anidación, múltiples rangos/Unicode y marcadores literales o atributos similares. No se atribuyen a esta pasada los 107 tests ni build/check/proyección ejecutados por el corrector.

## Evidencia y límites

Resultados: `auditoria-r3-evidencia.json`. Capturas: `auditor-r3-*.png`, tomadas con las capas globales reales de cabecera, publicidad fija y asistente presentes. Código congelado con extensión `.txt` y hashes en `auditoria-r3-snapshot/manifest.json`: componente, PostReader, helper y prueba. Las tres imágenes originales siguen siendo las revisadas anteriormente.

La matriz no equivale a probar cualquier tamaño de fuente, zoom del sistema o dispositivo. Las notas extendidas pueden ocupar más de una pantalla por diseño; la reproducción completa y pausa por visibilidad no se repiten en esta ronda focal. No hay hallazgos bloqueantes nuevos en el alcance revisado. Este cierre no es aprobación del usuario, autorización para main ni constatación de publicación pública.
