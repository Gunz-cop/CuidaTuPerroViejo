# Producción de componentes visuales

Fecha: 2026-10-22. Autor: agente `/root/productor_visuales`, rol de creación. **Este documento no es una auditoría independiente ni un APTO.** Se implementó después del APTO de brief en ronda 2.

Archivo: `src/components/article/HalitosisRecursos.astro`.
SHA-256 de la entrega inicial: `fc30fb2f4f855a7c1b1bb5d6d8c6fa4e1b68bba971f22778ecb8792cd0fff2c1`.

SHA-256 tras las correcciones de producción del 2026-10-22: `839783b4d8dc7fac2fdeb0c6a5acc8830e67925a9594caf2fa15863e2ac1ddcd`. Versión intermedia entregada al primer QA integrado.

## Contrato de integración

```mdx
import HalitosisRecursos from '../../components/article/HalitosisRecursos.astro';

<HalitosisRecursos variant="prioridad" />
<HalitosisRecursos variant="proceso" />
<HalitosisRecursos variant="registro" />
```

La prop opcional `anchors` admite `{ urgencias, hoy, cita }`, cada valor con su `#ancla`. Los valores por defecto corresponden a los H3 del brief: `#urgencias-importa-cómo-respira-y-cómo-se-encuentra`, `#llama-hoy-si-cambia-su-forma-de-comer-o-está-enfermo` y `#pide-cita-aunque-siga-activo`. Confirmarlos en el artículo renderizado antes del cierre.

| Recurso | Función implementada | Fuentes del brief y límites |
|---|---|---|
| R4, `prioridad` | Tres tarjetas numeradas con signos, acción y enlace; urgencias siempre visibles. | F3 PDSA y F6 Merck. Síntesis editorial para contactar; no puntuación o triaje validado ni diagnóstico por olor. |
| R5, `proceso` | SVG conceptual en cuatro vistas: película superficial, margen gingival, inflamación y ampliación de raíz/soporte. Cambian posición y presencia de biofilm, tejido destacado, foco y detalle ampliado. | F2 Merck y F5 Cornell. Anatomía simplificada en corte; sin estadios, duración de enfermedad ni progresión inevitable. La raíz ampliada no representa una lesión concreta. |
| R7, `registro` | Ocho áreas de texto etiquetadas, sin formulario/envío ni almacenamiento; registro plegado y botón de impresión. | F5 Cornell y F9 AAHA. Organiza observaciones espontáneas para consulta; no provoca maniobras ni devuelve evaluación clínica. |

## Interacción y alternativas implementadas

- `data-editorial-visual` y `data-reader-atomic` delimitan cada recurso. La secuencia usa `data-halitosis-sequence` con `data-step`, `data-playing`, `data-enhanced`; sus paneles usan `data-panel` y `data-active`.
- Botones de la secuencia: `data-action="prev|play|next|restart"`. Sin autoplay; reproducción finita de cuatro vistas, seis segundos por vista para lectura, pausa, avance manual y reinicio sin reproducción automática.
- La preferencia de movimiento reducido deshabilita reproducción y conserva avance manual; su cambio detiene reproducción. CSS retira transiciones. Ocultación, `pagehide` y navegación Astro detienen temporizadores; mapa de instancias evita duplicación.
- El registro usa `data-halitosis-registro`, ocho `textarea` con etiquetas/ayudas y límite individual de 240 caracteres, y botón `data-action="print"`. No escribe en almacenamiento ni realiza solicitudes.
- El botón «Imprimir el registro» crea una copia temporal exclusiva de R7, con sus ocho valores y sus avisos, y oculta el resto del documento únicamente durante esa impresión. `afterprint` retira la copia. La impresión normal desde el navegador conserva el artículo completo, todos los pasos y el registro.
- `beforeprint` conserva estados de desplegables, los abre y prepara valores textuales; `afterprint` restaura plegado y preserva los campos. La impresión normal del navegador sigue disponible sin JavaScript. CSS `::details-content` expone contenido de acordeones cerrados al imprimir.
- Sin JavaScript, los cuatro pasos permanecen como lista y no se muestran controles inertes. El registro nativo puede rellenarse. La impresión incluye todos los pasos y campos.
- IDs únicos por instancia; SVG con título/descripción. Controles de al menos 44 px y foco visible. Notas secundarias plegadas. Paneles de color fijo claro con colores locales, incluidos los `details`, para conservar legibilidad en ambos temas.

## Verificación propia realizada y pendiente

1. Transformación aislada con `@astrojs/compiler.transform`, sobre el archivo final indicado: **sin diagnósticos**, un script y una hoja de estilos. No se ejecutó build/check en paralelo al coordinador.
2. Prueba técnica aislada de impresión de `details` cerrado con JavaScript deshabilitado en Chromium local: el `textarea`, su valor y su etiqueta resultaron visibles al emular impresión con la misma regla `::details-content`. Es comprobación de ese patrón CSS, **no prueba del artículo integrado**.
3. Pendientes para QA del conjunto: anclas reales, alturas en 375/390 px de cada vista, contraste calculado en claro/oscuro y desplegables abiertos, controles/teclado/pausa/fin/cleanup, impresión con valores sobre el artículo, ausencia de overflow, proyección Markdown y build/check del repositorio. Los resultados definitivos se conservarán en `qa/` y en la auditoría independiente del artículo; no se infieren de esta nota de producción.

Las imágenes R1–R3 y la tabla R6 corresponden a otros creadores y no se modificaron aquí. Tampoco se alteraron brief, artículo, configuración, dependencias, estilos globales, primer artículo del plan o auditorías.

## Correcciones de producción anteriores al cierre integrado

1. Se aclaró el signo urgente como **«dolor intenso o constante»**, conservando la disyunción de la tabla Merck (F6). Esta modificación responde al hallazgo editorial comunicado por el coordinador; el creador no emitió auditoría ni corrigió brief/MDX.
2. Se corrigió el alcance del botón de impresión: ahora imprime únicamente el registro, en lugar de abrir la impresión de las ~6.000 palabras del artículo. La copia conserva los valores actuales y los avisos, elimina IDs duplicados y controles, y se destruye tras imprimir o navegar. No se guarda ni envía información.
3. Compilador Astro sobre esta nueva versión: `diagnostics: []`, un script y una hoja de estilos. Sin build/check en paralelo.
4. Prueba de autor aislada en Chromium con el **script real transpiliado del componente**, su CSS y un DOM mínimo de ocho campos: al pulsar imprimir, artículo de muestra oculto, copia visible, ocho valores visibles y aviso urgente visible. Tras `afterprint`, copia retirada, registro plegado como al inicio y ocho valores originales conservados. Es prueba técnica del comportamiento de impresión; la página integrada y el resto del contrato requieren el QA centralizado.

No se ha abierto un contador de auditoría visual ni se ha emitido APTO. La auditoría independiente posterior utilizará el contador único del artículo.

## Corrección de anclas tras QA integrado

El QA centralizado comunicó 101 de 102 controles correctos y dos destinos de R4 ausentes: el generador vigente conserva las tildes en los IDs de los H3. Se cambiaron exclusivamente los dos valores por defecto a `#urgencias-importa-cómo-respira-y-cómo-se-encuentra` y `#llama-hoy-si-cambia-su-forma-de-comer-o-está-enfermo`. El tercer destino y la prop opcional `anchors` se conservan. El brief y el MDX no se modificaron.

SHA-256 tras esta corrección: `e065d8b69ae45cd9609f8d3ca9f4e41d7231ce2b9873b401ad5eedc619d9c6fc`. La comprobación definitiva del nuevo build y sus enlaces corresponde al QA centralizado; esta nota no declara esa comprobación como realizada por el creador ni emite APTO. No se ejecutó build en paralelo.
