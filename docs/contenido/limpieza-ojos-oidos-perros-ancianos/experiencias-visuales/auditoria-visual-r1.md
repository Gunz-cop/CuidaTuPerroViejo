# Auditoría independiente de la ampliación visual — ronda 1

Fecha: 2026-10-16. Alcance: los tres recursos nuevos de `OjosOidosVisual.astro`, su integración y el recorte `cocker-senior-guia-otica-v1.webp`. Esta ronda pertenece al nuevo encargo visual; no reabre el brief ni las tres rondas editoriales anteriores. El auditor no modificó el producto. Se inspeccionó el primer build servido en el puerto 8766, antes de las correcciones que el implementador está realizando durante esta revisión.

**Resultado: NO PUBLICABLE todavía.** Hay tres defectos localizados de presentación/accesibilidad. No se detectó una nueva contradicción clínica en las síntesis.

## Hallazgos que deben corregirse

1. **P1 — Marcador del masaje poco perceptible y demasiado bajo.** En la variante `secuencia`, grupo SVG `.ojv-base`, el centro inicial `(356,194)` señala pelo del pabellón colgante en lugar de situarse claramente en la inserción proximal. El marrón sobre pelo canela hace que círculo y flechas casi desaparezcan a 390 px; destaca principalmente la línea izquierda. Debe recolocarse el marcador según la anatomía del recorte y darle contraste independiente del pelaje, conservando que es una zona exterior orientativa y no el conducto. Se comprobó personalmente en móvil y mediante ampliación del SVG. No es necesario animar el cuerpo ni enseñar la entrada del conducto.
2. **P1 — Contraste insuficiente del detalle auditivo en oscuro.** En la captura `390-oscuro-audicion.png`, el desplegable hereda un fondo oscuro de estilos generales y la frase «5 + 2 + 1 = 8…» conserva color marrón oscuro. Esa explicación deja de ser legible. El fondo y los colores de todas las piezas del desplegable deben quedar acotados al componente y verificarse calculados en modo oscuro. No basta declarar una variable que luego pierde ante estilos globales.
3. **P1 — Impresión con JavaScript pierde tres pasos.** Prueba independiente con Playwright/Chromium: después de cargar con JS y emular `media='print'`, los cuatro paneles tienen `display=[flex,none,none,none]`; los controles desaparecen. El lector obtiene solo el paso activo. La regla de impresión inicial no recupera los paneles con `hidden`. Corregir la estrategia de ocultación o preparar una alternativa estática que efectivamente muestre los cuatro pasos impresos. Sin JS se verificaron cuatro pasos visibles y controles ocultos.

Las tres anclas del mapa de decisión se comprobaron después de la corrección temprana del implementador: todas resuelven un ID existente. Ese problema ya no está abierto y no necesita una ronda separada.

## Aspectos conformes en esta ronda

- Tres recursos con funciones diferentes: decidir antes de intervenir, recorrer una técnica indicada y comprender una cifra potencialmente engañosa. La cantidad resulta defendible por utilidad, no por una cuota ni por una promesa de retención.
- Infografía de decisión sin diagnóstico, con límites explícitos, urgencia ocular y consulta previa cuando se sospecha otitis. La nota aclara que no incluye todas las urgencias.
- Secuencia prudente de cuatro momentos; no añade dosis ni presión de aplicación, mantiene «dolor = parar» y no representa una exploración del conducto.
- Cohorte fiel al resultado ya verificado en `../auditoria-editorial-r2.md`: 39 participantes, 19/12/8 y desglose 5 + 2 + 1. Los grupos no se presentan como evolución longitudinal ni prueba de prevención mediante limpieza. No se emiten sonidos.
- Recorte inspeccionado con `view_image`: el cocker conserva rasgos senior visibles, canela y blanco, orejas y cabeza plausibles, sin añadir enfermedad como requisito de edad. Hay declaración de ilustración IA y separación respecto a pacientes del estudio. El encuadre de cabeza es adecuado al recurso ótico; no pretende representar apoyos corporales.
- Inspección de código: reproducción desactivada al cargar, temporización finita, pausa, repetición, anteriores/siguientes, detención por visibilidad y limpieza al navegar. No hay librería pesada nueva ni deformación corporal.
- Comprobación propia en 390 px: sin desbordamiento horizontal; tres anclas válidas. Con movimiento reducido, reproducción deshabilitada y navegación manual disponible. Sin JavaScript, cuatro pasos disponibles y controles ocultos.
- Build/check comunicados por el implementador correctos; no se ejecutaron nuevamente por el auditor. La aprobación queda pendiente de las correcciones y de su comprobación final en navegador, claro/oscuro, escritorio/móvil y proyección.

## Siguiente ronda

Revisar la versión corregida de esos tres puntos sobre el build final, con sus capturas y resultados reproducibles. Este es el informe 1 de un máximo de 3 de la ampliación visual. No atribuir a estos recursos una mejora de permanencia sin datos posteriores de uso; no declarar aprobación visual del usuario antes de que la vea.
