# Ampliación visual encargada el16 de octubre de2026

Nuevo encargo del usuario: añadir experiencias visuales al artículo publicado; decidir cantidad y utilidad. No es una cuarta auditoría editorial ni un reinicio del brief: el texto clínico aprobado en R3 se conserva, salvo inserciones de componentes y presentación de una imagen ya existente. La ampliación tiene su propia revisión visual/técnica independiente, máximo tres iteraciones.

## Tres recursos nuevos, con funciones distintas

1. Infografía de decisión temprana (intro, antes de «Antes del producto»): señales oculares urgentes, cambios que requieren consulta antes de insistir y oído sano sin obligación de limpieza. Enlaces a las explicaciones del artículo; no diagnostica ni pretende incluir todas las urgencias.
2. Secuencia ótica controlada por el lector (H2limpieza, después de la técnica): confirma/prepara → aplicación según pauta → masaje suave indicado → sacudida y retirada externa. Cambian herramientas/marcadores sobre el mismo cocker ilustrativo; no se anima el cuerpo ni se presenta como vídeo. Sin autoplay, reproducción finita, anterior/siguiente, pausa/repetir, reduced-motion, visibilidad y limpieza de temporizadores. Las señales de parar permanecen visibles. La antigua escena de masaje queda disponible en un desplegable, sin ocupar el recorrido principal.
3. Infografía exploratoria de audición (H2cohorte):39 participantes distribuidos19/12/8; desplegable nativo aclara5respuestas a90dB +2 no probados +1 sin respuesta. No se emiten sonidos ni se sugiere prueba doméstica; asociación no equivale a prevención.

## Evidencia y recursos

Fuentes y límites clínicos ya contrastados en `../auditoria-editorial-r2.md`; nuevas síntesis enlazan Cornell KCS, Cornell oído y Fefer (§3.2). No se añaden cifras de tratamiento ni indicaciones nuevas.

Componente: `src/components/article/OjosOidosVisual.astro`, tres variantes; CSS y JS locales, sin librerías nuevas. Recurso nuevo: `cocker-senior-guia-otica-v1.webp` y variantes800/400; nombre nuevo por la caché de imágenes publicada. Referencia: escena existente `masaje-base-oreja-limpiador-otico.webp`. Original IA conservado en `/workspace/generated_images/exec-2ddf62c4-65f7-4449-9084-75b403c8b6ec.png`. Inspeccionado antes de optimizar; RGBA con transparencia real, identidad/edad similares al protagonista ilustrativo. No se trata de paciente identificado.

## Validación pendiente

Build, check, proyección Markdown, carga de recursos, anclas, móvil375/390/escritorio, claro/oscuro, contraste, estados4, autoplay ausente, teclado, pausa/reinicio, finalización, visibilidad, navegación, reduced-motion y sinJavaScript. Capturas y revisión independiente en esta carpeta; no atribuir mejora de retención sin datos analíticos.
