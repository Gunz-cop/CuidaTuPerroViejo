# Verificación técnica local final

Ejecutada el 22 de octubre de 2026 contra `http://127.0.0.1:4321/salud-perros-mayores/mal-aliento-perros-viejos`, servido desde `dist/client` por el servidor estático local. Resultado final: **103 de 103 comprobaciones correctas**, sin errores JavaScript ni fallos de recursos locales. La suite de aceptación de los recursos y la navegación está correcta; axe de la página completa conserva la limitación compartida descrita abajo. Este informe técnico no emite un APTO editorial ni consume una ronda de auditoría.

Versiones comprobadas: MDX SHA-256 `6913314b0400dd6d071296c682a2d724775cdecb03008ff1b0b4839349634deb`; componente `e065d8b69ae45cd9609f8d3ca9f4e41d7231ce2b9873b401ad5eedc619d9c6fc`; brief `24e9a3003c54d91350918eb7891635b6767c0c81afa1179448dc1e737cb57f9f`. Los hashes de las nueve imágenes están en [el resultado bruto final](navegador.json).

Entorno real: Node v24.19.0, Playwright 1.64.1, Chromium 154.0.8037.57, `@axe-core/playwright` y axe-core 4.14.0. Las solicitudes externas del navegador se bloquearon; no se enviaron formularios ni datos. No se modificaron archivos de producto. Las capturas no ocultan el lanzador del asistente del sitio y no implican aprobación del usuario.

## Corrección comprobada

El creador corrigió las dos anclas de R4 detectadas en el primer intento para que coincidan con los IDs Unicode reales del artículo. Tras recompilar, la suite completa comprueba que ambos enlaces resuelven y conserva el mismo MDX; cambió únicamente el componente. El historial técnico se conserva en [el primer informe](revision-tecnica-intento-1.md) y [su JSON](navegador-intento-1.json). Estos intentos de pruebas no se presentan como rondas editoriales.

## Comprobaciones correctas

- Ventanas de 375, 390 y 1366 px, en claro y oscuro: sin desbordamiento del documento; desplegables cerrados al cargar.
- Los nueve WebP (tres escenas × 400/800/1200) devuelven HTTP 200, tipo `image/webp` y se decodifican individualmente a 400×225, 800×450 y 1200×675. Imágenes del artículo decodificadas, alt presentes, rutas reales y dimensiones registradas. Imágenes de cuerpo: variante 400 en móvil y 800 en escritorio. El hero sirve la versión 1200 en ambas vistas.
- Capturas aisladas de cada apoyo y de los cuatro pasos de la secuencia a 390/1366 px, claro/oscuro, tras esperar 1,3 segundos; capturas de página completa y de impresión.
- Contraste mínimo calculado del texto visible de los apoyos: **4,50:1 claro y 5,52:1 oscuro** (el mínimo claro, calculado sin redondear para `rgb(69,99,79)` sobre `rgb(253,203,155)`, es 4,50449:1), también con sus desplegables abiertos. Botones y resúmenes táctiles de al menos 44×44 px.
- Secuencia sin autoplay, avance y retroceso por teclado, foco visible de 3 px, pausa estable sin animaciones activas, final finito y repetición. La doble inicialización no duplica manejadores.
- Cambio a movimiento reducido: reproducción deshabilitada y recorrido manual operativo sin animaciones activas. Sin JavaScript se leen los cuatro pasos y se ocultan los controles inertes.
- Los eventos de ocultación y navegación se simularon expresamente (`document.hidden` + `visibilitychange`; `astro:before-swap`): detienen el avance y eliminan temporizadores. No se afirma una navegación de producción.
- Registro: ocho campos editables con etiquetas, ocho valores de prueba conservados en impresión general y en impresión aislada; el botón imprime solo el registro. `afterprint` restaura el plegado y conserva valores. Sin JavaScript, las ocho etiquetas/campos y valores son imprimibles incluso con el registro cerrado. La impresión general conserva los cuatro pasos.

## Alturas reales

| Recurso inicial | 375 px | 390 px | 1366 px |
|---|---:|---:|---:|
| R4 prioridades | 699 px | 699 px | 670 px |
| R5 proceso | 690 px | 697 px | 812 px |
| R7 registro plegado | 493 px | 493 px | 416 px |
| R6 tabla apilable | 730 px | 730 px | 304 px |

Mismas alturas en claro y oscuro. Cada uno de los cuatro pasos mide 697 px a 390 px y 812 px a 1366 px. A 390 px, gráfico, controles y explicación activa ocupan juntos unos 388 px; los controles están a unos 10 px del gráfico. Ningún apoyo inicial supera 900 px en móvil.

## Limitaciones preexistentes

Axe sobre la página completa detecta en claro una infracción de contraste en el botón compartido **«No del todo»**, fuera de los recursos nuevos: razón 1,35:1 (`#fdcb9b` sobre `#f8f5ee`). La clase y el texto proceden de `src/components/FeedbackWidget.astro`, que no cambia en este encargo. En oscuro axe no detectó infracciones. Los apoyos nuevos no presentan infracciones axe.

El layout anuncia únicamente `1200w` en el `srcset` del hero, aunque los archivos `-400` y `-800` existen. Se observa el mismo comportamiento en los artículos dental y de alimentación sin dientes, cuyos thumbnails también existen. La [prueba suplementaria de referencias preexistentes](limitaciones-preexistentes.json), repetible con `verificar-limitaciones.mjs`, confirmó en ambas páginas el thumbnail HTTP 200, el hero con un solo candidato y la misma infracción de FeedbackWidget. Es una limitación compartida previa; las tres imágenes nuevas cargan y las dos de cuerpo sí anuncian 400/800/1200. No se alteró el layout.

No se probaron el backend de feedback, servicios externos, despliegue ni producción. La verificación clínica y editorial corresponde al auditor independiente. Las capturas actuales corresponden al componente corregido; el JSON del primer intento se conserva. No hay pendientes nuevos de funcionamiento en el alcance probado.

## Evidencia visual de la versión final

- [Prioridades, móvil oscuro](capturas/390-dark-recurso-0.png).
- [Proceso, móvil claro, paso 3](capturas/390-light-proceso-paso-3.png).
- [Proceso, escritorio oscuro, paso 4](capturas/1366-dark-proceso-paso-4.png).
- [Tabla apilada, móvil oscuro](capturas/390-dark-recurso-3.png).
- [Registro aislado con los ocho valores impresos](capturas/390-registro-impresion-js.png) y [PDF de prueba real de una página A4](capturas/registro-prueba-js.pdf), evidencia de prueba; no es una descarga prometida al lector.
- [Registro en impresión general con JavaScript](capturas/390-registro-impresion-general-js.png) y [sin JavaScript](capturas/390-light-registro-impresion-sin-js.png).
- [Movimiento reducido, móvil oscuro](capturas/390-dark-reduced.png).
- [Página completa, móvil claro](capturas/390-light-pagina.png) y [escritorio oscuro](capturas/1366-dark-pagina.png).
- [Botón compartido de bajo contraste en artículo preexistente](capturas/limitacion-feedback-preexistente.png).

La carpeta de capturas incluye cada apoyo aislado y los cuatro pasos en las cuatro combinaciones 390/1366 y claro/oscuro. Se inspeccionaron visualmente prioridad móvil, proceso móvil/escritorio, tabla apilada y registro impreso: texto legible y recursos completos en las capturas. La continuidad y anatomía de las ilustraciones requieren además la inspección de producción visual y del auditor editorial; esta suite técnica verifica su entrega y carga.
