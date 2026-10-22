# Verificación técnica local — intento 1

Ejecutada el 22 de octubre de 2026 contra `http://127.0.0.1:4321/salud-perros-mayores/mal-aliento-perros-viejos`, servido desde `dist/client` por el servidor estático local. Resultado: **101 de 102 comprobaciones correctas; dos anclas nuevas pendientes de corrección**. Este informe técnico no emite un APTO editorial ni consume una ronda de auditoría.

Versiones comprobadas: MDX SHA-256 `6913314b0400dd6d071296c682a2d724775cdecb03008ff1b0b4839349634deb`; componente `839783b4d8dc7fac2fdeb0c6a5acc8830e67925a9594caf2fa15863e2ac1ddcd`; brief `24e9a3003c54d91350918eb7891635b6767c0c81afa1179448dc1e737cb57f9f`. Los hashes de las nueve imágenes están en [el resultado bruto](navegador-intento-1.json).

Entorno real: Node v24.19.0, Playwright 1.64.1, Chromium 154.0.8037.57, `@axe-core/playwright` y axe-core 4.14.0. Las solicitudes externas del navegador se bloquearon; no se enviaron formularios ni datos. No se modificaron archivos de producto. Las capturas no ocultan el lanzador del asistente del sitio y no implican aprobación del usuario.

## Hallazgo nuevo

Las dos primeras tarjetas de R4 apuntan a fragmentos sin tilde. El HTML generado conserva tildes en los IDs:

| Fragmento del recurso | ID real que debe enlazarse |
|---|---|
| `#urgencias-importa-como-respira-y-como-se-encuentra` | `#urgencias-importa-cómo-respira-y-cómo-se-encuentra` |
| `#llama-hoy-si-cambia-su-forma-de-comer-o-esta-enfermo` | `#llama-hoy-si-cambia-su-forma-de-comer-o-está-enfermo` |

Los demás enlaces locales y las anclas comprobadas resuelven. Debe corregir el creador y volver a ejecutar la suite sobre el build actualizado.

## Comprobaciones correctas

- Ventanas de 375, 390 y 1366 px, en claro y oscuro: sin desbordamiento del documento; desplegables cerrados al cargar.
- Imágenes del artículo decodificadas, alt presentes, rutas reales y dimensiones registradas. Imágenes de cuerpo: variante 400 en móvil y 800 en escritorio. El hero sirve la versión 1200 en ambas vistas.
- Capturas aisladas de cada apoyo y de los cuatro pasos de la secuencia a 390/1366 px, claro/oscuro, tras esperar 1,3 segundos; capturas de página completa y de impresión.
- Contraste mínimo calculado del texto visible de los apoyos: **4,50:1 claro y 5,52:1 oscuro**, también con sus desplegables abiertos. Botones y resúmenes táctiles de al menos 44×44 px.
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

El layout anuncia únicamente `1200w` en el `srcset` del hero, aunque los archivos `-400` y `-800` existen. Se observa el mismo comportamiento en los artículos dental y de alimentación sin dientes, cuyos thumbnails también existen. Es una limitación compartida previa; las tres imágenes nuevas cargan y las dos de cuerpo sí anuncian 400/800/1200. No se alteró el layout.

No se probaron el backend de feedback, servicios externos, despliegue ni producción. La verificación clínica y editorial corresponde al auditor independiente. Las capturas de este intento podrán sobrescribirse con las de la versión corregida; el JSON de este intento se conserva.
