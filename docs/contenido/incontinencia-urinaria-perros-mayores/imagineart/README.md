# Prueba de ImagineArt — 17 de noviembre de 2026

Propuesta en rama, pendiente de revisión independiente y de decisión del propietario. Este informe es la valoración del implementador solicitada por el usuario; no constituye auditoría independiente ni aprobación del propietario.

## Elección y alcance

Se eligió incontinencia urinaria por su combinación de exposición alta y CTR bajo entre las guías del export de Search Console. La adaptación doméstica permite enseñar una acción con límites claros. La calculadora de calidad de vida ya obtiene un CTR bastante mayor; comida casera exige validar ingredientes y equilibrio nutricional antes de convertir una receta en tutorial. Los datos son de búsqueda Web, últimos tres meses: no son rendimiento de Google Imágenes ni prueban que el problema del CTR sean las fotos. No se incorpora el export privado ni cifras absolutas de audiencia a este repositorio público.

Se reemplazan portada e higiene y se añade una preparación de cama con materiales, tres pasos y video descargable. No se cambia el título SEO para conservar una comparación posterior más interpretable. El contenido doméstico añadido desarrolla los consejos existentes de funda, limpieza y recambio; no añade tratamientos, dosis ni promesas clínicas.

## Generaciones y valoración

Modelos: Nano Banana Pro predeterminado, cuatro imágenes 16:9 nominal 1K (archivos 1376×768); LTX 2.3, un clip solicitado a 1080p y 10 segundos (recibido 1920×1080, 10,28 s). Consumo observado de la prueba: 537 créditos; saldo restante 563. No hay recibo por generación, por lo que no se atribuye coste individual. No se comprobó precio de suscripción, conversión a dinero ni licencia comercial del plan de prueba: esos tres datos hacen falta para valorar la compra.

| Recurso | Observación real | Decisión |
| --- | --- | --- |
| Portada v1 | Buen ambiente y cara envejecida; espuma expuesta y extremidades parcialmente ocultas. | Descartada; original conservado. |
| Materiales | Funda, tela y recambios reconocibles; no demuestra la impermeabilidad del material. | Integrada como preparación ilustrativa. |
| Portada v2 | Corrige la espuma, conserva pelaje y cara del sujeto. No adopta la pose de esfinge solicitada. | Integrada para descanso, no para enseñar anatomía. |
| Secado v2 | Identidad coherente, manos plausibles. Toalla sobre cadera/lomo en lugar del muslo solicitado. | Integrada como secado general; alt describe lo que se ve. |
| Clip original | Despliegue y colocación comprensibles; tela cambia algo de forma y el borde cuelga. Aparece más persona que las manos pedidas. | Utilizable para un gesto doméstico sencillo; no para una maniobra clínica. |

Revisión propia de edad a tamaño grande y 390 px: ambas imágenes finales conservan canas en hocico, cejas y bordes de ojos, mirada algo hundida y párpados caídos, cuerpo de menor tono y postura baja de reposo, sin enfermedad añadida. La postura tumbada limita la valoración de la línea dorsal y oculta parcialmente apoyos; no se afirma que se hayan verificado cuatro patas completas. El mestizo dorado es ilustrativo: no es un paciente ni el golden del artículo de úlceras. Se consultó el registro de razas de la dirección visual; se mantiene el sujeto dentro de esta prueba, sin atribuirle caso real.

Valoración orientativa, subjetiva: **imágenes 7/10; video generado 6/10**. La fortaleza es el acabado y la rapidez para obtener ambientes concretos. La debilidad es la obediencia al gesto y a la geometría: un prompt detallado no evita revisar ni corregir. Tres imágenes utilizadas de cuatro intentos no estiman una tasa de éxito general; son una muestra mínima.

**Recomendación:** no contratar un plan anual por esta prueba. Consideraría un mes para producir imágenes de varias guías si el precio, los créditos y la licencia compensan la revisión manual. No pagaría principalmente por estos tutoriales: grabar esta acción con un móvil puede ser más fiel, barato y propio del sitio. Un video generado que parece real no aporta experiencia real.

## Montaje y entrega

El tutorial final dura 18 s, 1280×720, H.264 sin sonido. Son 3 s de imagen inicial, 10 s del clip de ImagineArt y 5 s de fotograma final; los rótulos españoles y la edición se hicieron con FFmpeg. No son 18 s generados por ImagineArt. Los pasos 1 y 3 son indicaciones escritas; el clip demuestra la colocación de la tela del paso 2. Audio original retirado; su calidad no se ha evaluado. El texto completo está junto al reproductor, disponible sin JavaScript y en Markdown.

Archivos optimizados con nombres nuevos para evitar caché de las imágenes antiguas: `public/images/blog/incontinencia-urinaria-perros-mayores/`. Variantes WebP 1200/800/400; originales conservados aquí. Reproductor nativo con controles, `preload="none"`, sin autoplay ni bucle; no hay animación automática y el movimiento solo empieza al pulsar. La foto de materiales empieza plegada. No hay solicitudes a ImagineArt desde la página.

El proyector Markdown antes rechazaba `video`. Se omite el reproductor y sus pistas, conservando pie, pasos y enlace MP4. Prueba de regresión añadida; guardia semántica comprueba los 41 documentos.

Para reproducir el montaje desde la raíz del repo, ver `render.sh` y `montaje.ffmpeg.txt`. Es edición local, no consume más créditos. La ficha de encargo y prompts resumidos están en `encargo.md`.

## Comprobaciones

Build Astro con proyección Markdown correcto; `astro check`: 0 errores, 0 advertencias (82 hints). Proyección: 23 pruebas correctas y guardia semántica de los 41 documentos. Control de tono del MDX: 0 muletillas. Evidencias adjuntas con su alcance local.

Capturas y medidas: `390-light.png`, `390-dark.png`, `1366-light.png`, `1366-dark.png`, `browser-results.json`. Altura inicial del bloque a 390 px: 886,67 px en ambos temas; sin desbordamiento horizontal en 390 ni 1366 px. Cero errores JavaScript en las cuatro vistas; imágenes decodificadas y reproducción comprobada (duración 18 s, avance y pausa, sin error del elemento). Tres pasos y descarga disponibles sin JS. `accessibility.json` confirma apertura del desplegable con teclado, foco del video y ausencia de autoplay con movimiento reducido. Las pruebas del navegador no sustituyen una revisión veterinaria ni la auditoría independiente. No hay prueba de despliegue ni mejora de SEO.

Para medir tras una eventual publicación: comparar ventanas de 28 días para la URL canónica, mismas consultas, países y dispositivos; anotar posición y cambios de demanda. No sumar fragmentos como si fueran búsquedas independientes. No atribuir causalidad al video por una variación de clics; sin métricas de reproducción/interacción no se conoce su utilidad observada.
