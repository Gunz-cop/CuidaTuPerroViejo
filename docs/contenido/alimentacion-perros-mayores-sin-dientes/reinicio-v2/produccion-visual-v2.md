# Producción visual v2 y autocontroles

Fecha: 2026-10-20. Rol: producción de recursos. Este informe no es una auditoría independiente ni una aprobación del propietario.

La producción empezó después del brief v2 APTO en R2 y de la auditoría editorial provisional R1. No se amplió el componente o el texto rechazado: se creó `src/components/article/AlimentacionSinDientesRecursosV2.astro` para el nuevo contrato. SHA256 del componente probado: `f06a38f052eb430e9b701a671607e93753709dade29905d2bc8749f39a92d899`.

## Dos imágenes adicionales reales

Se inspeccionó el hero existente del beagle senior antes de usarlo como referencia de `image_gen.imagegen`. Se generaron dos escenas distintas y se conservaron sus originales, sin eliminar los originales de la herramienta:

| Imagen | Original conservado | Recurso público principal | Pregunta que explica |
|---|---|---|---|
| I4, medición de la base | `originales/medir-racion-base-beagle-senior-v2.png` | `public/images/blog/alimentacion-perros-mayores-sin-dientes/medir-racion-base-beagle-senior-v2.webp` | Qué se mide antes de cambiar la presentación |
| I5, compartir el registro | `originales/registro-alimentacion-consulta-beagle-senior-v2.png` | `public/images/blog/alimentacion-perros-mayores-sin-dientes/registro-alimentacion-consulta-beagle-senior-v2.webp` | Qué información se lleva a la revisión |

Las dos imágenes nuevas se generaron con la misma referencia, no mediante prompts de perros independientes. Se comprobaron hocico canoso, orejas avellana, lomo negro, proporciones y cuatro apoyos plausibles. I4 muestra báscula y alimento base, sin número de ración legible. I5 muestra cuaderno/envase y conversación en consulta, sin intervención ni diagnóstico inventados. La inspección no acredita ausencia de dientes: no se fabrica una imagen intraoral.

Se produjeron seis WebP con `sharp`: 1200×800, 800×533 y 400×267 por escena, calidad84. Se inspeccionaron también las variantes400. [Manifiesto con dimensiones, bytes y hashes](manifiesto-imagenes-nuevas.json). Los nombres v2 nuevos respetan la caché de imágenes de30días de `public/_headers`.

Se inspeccionaron los tres recursos reutilizados. I3 muestra al perro comiendo por sí mismo; no hay cuidador observando dentro de la imagen. Se comunicó al redactor para que alt/pie no atribuyeran esa persona ni un desenlace clínico. Todas las imágenes siguen siendo ilustraciones IA, no fotografías clínicas.

## Recursos funcionales

| Recurso | Variante | Cambios visuales y propósito |
|---|---|---|
| A1 | `base` | Cuatro símbolos constantes pasan de báscula a recipiente y plato; el agua opcional sube el nivel sin crear más alimento; al final aparece el recordatorio de sobrantes. No hay gramos, ratio ni ración recomendada. |
| A2 | `ingesta` | Se separan alimento ofrecido, sobrante y derrame; aparecen categorías de certeza y los datos pasan al registro. No se calcula consumo exacto ni diagnóstico. |
| R1 | `registro` | Ocho campos de80–120caracteres y dos campos de300/220; copia imprimible local con valores reales, sin envío ni almacenamiento. |

Las secuencias comparten implementación local y tienen cuatro estados cada una. No representan un vídeo ni simulan movimiento corporal del animal; no necesitaban un recorte adicional del perro. Usan SVG para recipientes/herramientas/datos y texto HTML para la explicación. Las etiquetas pequeñas del dibujo se ocultan a≤480px y se sustituyen por leyenda HTML y rótulos de progreso de14px, en dos columnas. Cada estado conserva su explicación completa en el HTML.

Los controles son anterior/reproducir-pausar/siguiente y repetir al final; no hay autoplay. El estado pausado quita transiciones y detiene el temporizador. La reproducción termina; se detiene al ocultar/salir, y se limpian instancias/eventos en navegación Astro. Movimiento reducido deshabilita reproducción y permite avance manual. Sin JS e impresión están los ocho pasos completos y no aparecen controles sin funcionamiento. Los encabezados de apoyo llevan `data-toc-exclude` y el recurso completo `data-editorial-visual`, sin sumar su interfaz al contrato editorial.

## Comprobaciones propias sobre el build integrado

- Compilador Astro aislado y transpilación del script TypeScript: cero diagnósticos; no se crearon rutas de prueba. El build/check global pertenece al coordinador.
- Chromium local,375/390/1366px y ambos temas: tres componentes dentro del ancho; botones de al menos44×44px; leyenda/rótulos móviles14px. [Resultados reproducibles](validacion-creacion/autocontroles-visuales.json).
- No autoplay tras6,75s; avance por teclado y foco visible; ocho estados manuales; pausa sin avance durante6,75s y sin animaciones activas; ambas secuencias terminan tras26,5s y permiten repetir.
- Preferencia de movimiento reducido comprobada tras esperar el evento `matchMedia`; recorrido manual disponible y cero animaciones. La primera ejecución de la prueba consultó `is_disabled` antes del evento asíncrono y falló: se corrigió esa sincronización del script, sin cambiar el producto, y la ejecución completa posterior pasó.
- Ocultación, `pagehide` y navegación Astro se comprobaron mediante eventos simulados y no se presentan como cambios reales de pestaña/navegación. Doble inicialización no duplicó avance.
- Sin JS: ocho pasos visibles, cero controles inertes; impresión con y sin JS conserva los ocho pasos.
- Cero errores JavaScript capturados durante estos recorridos.

Las capturas de componentes conservan navegación y asistente del sitio: no se ocultaron overlays. En algunas capturas altas la barra fija cruza el encabezado; no se interpreta como una alteración del componente. La vista de lectura preparada por coordinación es la referencia para revisar el artículo entero.

## Impresión real y preservación de datos

Se probó el botón con `window.print` real: `beforeprint` encontró la copia y `afterprint` la eliminó. [Eventos nativos](validacion-creacion/impresion-eventos-reales.json).

Para conservar la copia y capturar un PDF, un autocontrol aparte del productor interceptó únicamente el diálogo `window.print` y ejecutó `page.pdf`. Se rellenaron los diez controles hasta su `maxlength` original y se comparó el texto exacto en el DOM clonado: sin recortar valores. El resultado cabe en **una página A4 a10pt**. `pdftotext -raw` confirmó completos los diez valores, normalizando espacios por los saltos de línea. [Comprobación de texto](validacion-creacion/impresion-texto-completo.json), [PDF](validacion-creacion/registro-maximo.pdf), [render del PDF](validacion-creacion/registro-maximo.png). Los finales de palabra incompletos del contenido de prueba proceden de rellenar exactamente el límite de caracteres, no de un recorte al imprimir.

No se ha fusionado, desplegado ni subido una versión desde este rol. Queda el cierre independiente sobre la versión final integrada.
