# Guía visual dental — auditoría independiente R1

17 de octubre de 2026. Alcance nuevo: DentalBrushingGuide.astro y sustitución mínima de imagen en el MDX dental. No se reabre la auditoría clínica anterior del artículo. Auditor separado del corrector; no se modifica producto.

**NO APTO en R1 por alternativa de impresión incompleta.** En navegador Chromium, tras emular print y esperar 150 ms, solo aparece un paso de cuatro: los otros tres `li[hidden]` mantienen `display:none`. La regla importante de preflight Tailwind dentro de una capa vence la regla de impresión local sin capa. Deben conservarse los cuatro pasos en impresión. Evidencia: `auditoria-r1-evidencia.json`; inspección independiente de estilos coincidentes. El corrector confirmó la causa y está corrigiendo el estado de paneles; se comprobará en R2 focal, sin borrar este resultado.

El corrector comunicó además un fallo de contraste en hover de la pestaña activa y su corrección. No se atribuye su detección a este auditor; se incluye en la siguiente comprobación focal.

Inspección de los tres originales: mismo beagle senior, canas visibles, orejas y proporciones consistentes; manos y perro realistas generados, sin dibujo por código. El colmillo superior se encuentra hacia la nariz, con los dientes posteriores detrás. No se aprecia inversión dental ni sujeción que fuerce la mandíbula. No se certifica una dentición completa: el encuadre no la muestra, el cepillo oculta parte del contacto y no puede deducirse presión. Los límites del componente son pertinentes: solo contacto externo, no sarro ni limpieza profesional, detenerse ante resistencia y consulta ante dolor/sangrado. La transición reposo→labio→contacto→reposo aporta una diferencia útil, aunque es secuencia de imágenes y no movimiento corporal continuo.

VCA se abrió independientemente: HTTP200, identidad y texto legibles. Se leyeron adaptación, cepillos y técnica: respaldan aproximación gradual, suavidad, elevación del labio y trabajo en superficies externas. No se copia su imagen ni se atribuye revisión veterinaria a la guía. La ilustración IA y el carácter representativo aparecen visibles.

Código leído: identificadores únicos, botones nativos de 44px, foco visible, sin autoplay, reproducción finita, pausa al ocultar página, limpieza al navegar, cambio manual y desactivación de reproducción con movimiento reducido. El fallback sin JS conserva los pasos por marcado. Las pruebas de navegador de R1 se interrumpieron al fallo de impresión; no se declara aprobada toda la matriz ni se certifica contraste calculado en esta pasada. El código cambió durante las pruebas antes de congelar manifiesto: se conservan el fallo observado y los hashes de originales; el cierre R2 fijará los hashes de la versión corregida.

Pendiente: comprobación focal R2, resultados generales del corrector y **aprobación visual expresa del usuario antes de main**. Esta auditoría no equivale a aprobación del usuario ni publicación.
