# Guía visual dental — cierre independiente R2

17 de octubre de 2026. **APTO para presentar al usuario, con aprobación visual del usuario pendiente antes de main.** La R1 permanece NO APTO; esta R2 comprueba la corrección de impresión y contraste y completa verificaciones focales del componente nuevo. Se reutilizan explícitamente la inspección anatómica, continuidad, procedencia y coherencia con VCA de R1; no se reaudita la clínica del artículo anterior.

## Correcciones comprobadas

- Impresión: los paneles usan `data-active`, sin atributo `hidden` que compita con preflight. En cuatro casos de navegador (1440/390 px × claro/oscuro), el medio print muestra los cuatro pasos y oculta controles. Se comprobó visibilidad, no la paginación de un PDF exportado.
- Pestaña activa en hover: colores calculados `rgb(255,254,246)` sobre `rgb(40,77,59)`, contraste **9,37:1**, suficiente para texto normal. El fallo inicial había sido detectado por el corrector; esta comprobación es independiente.
- Pasos manuales, ampliación, play/pausa, repetición desde el final y desactivación del play por movimiento reducido funcionan en esos cuatro casos. Objetivos visibles ≥44×44 px, sin desbordamiento de página ni errores JS capturados. El cambio de preferencia es asíncrono: la prueba espera la actualización, no presupone que sea inmediata.
- Sin JavaScript: cuatro pasos visibles y cero controles inoperantes visibles. Imágenes decodificadas al mostrar cada uno de los cuatro pasos, tanto en móvil como escritorio. Las imágenes de paneles ocultos pueden permanecer sin decodificar hasta mostrarlas por su carga lazy; no se confunde ese estado con un fallo del recurso.

## Límites y evidencia

`auditoria-r2-evidencia.json` conserva resultados, colores, URLs elegidas por srcset y hashes. `auditoria-r2-snapshot/manifest.json` congela el componente, el MDX y las nueve variantes WebP; el código se conserva con extensión `.txt` para no incorporarlo al typecheck. La integración del MDX es importación, sustitución de una foto por el componente y actualización de las dos fechas al 17 de octubre; no cambia las recomendaciones clínicas previas.

Las capturas `auditor-r2-*` muestran el paso de labio ampliado. La captura de elemento mantiene las capas globales fijas del sitio (cabecera, asistente y publicidad), por lo que esas capturas no constituyen una maqueta limpia del recurso ni una auditoría nueva de dichas capas. No se certifica anatomía odontológica completa, presión del cepillado ni gesto corporal continuo: es una secuencia ilustrada, etiquetada IA. La ampliación CSS de una imagen móvil puede perder nitidez; no se propone como mapa dental.

Esta pasada no repite toda la batería del repositorio ni el avance temporizado de 36 segundos, la pausa al ocultar pestaña o toda la navegación de teclado. La implementación de esos controles se leyó en R1; las pruebas integrales, capturas adicionales y build/check del corrector deben acompañar la entrega y no se atribuyen a este auditor. No se ha publicado ni modificado producto. **La decisión de aprobación visual y el paso a main siguen reservados al usuario.**
