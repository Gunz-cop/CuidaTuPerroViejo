# Mal aliento en perros viejos: expediente de entrega

Segundo artículo del plan de elaboración del PR #122. Rama `contenido/mal-aliento-perros-viejos`, base `main`. Artículo completo de **5.862 palabras útiles** (6.265 brutas), con causas, síntomas acompañantes, decisiones y consulta; sin diagnóstico por el olor. Su diferenciación respecto a salud dental se verifica en el brief y las auditorías.

## Documentos revisables

- [Brief final y contrato R1–R7](../../../briefings/briefing-mal-aliento-perros-viejos.md), [investigación y fuentes](investigacion.md).
- Auditorías independientes del brief: [R1](auditoria-brief-r1.md), [R2](auditoria-brief-r2.md), [R3 APTO](auditoria-brief-r3.md).
- [Artículo MDX vigente](../../../src/content/blog/mal-aliento-perros-viejos.mdx), [correcciones y trazabilidad](correcciones-articulo.md).
- Auditorías independientes del artículo: [R1 provisional](auditoria-articulo-r1.md), [R2 final APTO con avisos preexistentes](auditoria-articulo-r2.md).
- [Contadores y separación de roles](flujo-y-rondas.md): brief 3/3; artículo 2/3. Sin reinicios.

## Recursos reales

[Manifiesto de cobertura R1–R7](manifiesto-recursos.md): tres ilustraciones del mismo Labrador senior, infografía de prioridades, proceso SVG animado con controles, tabla y registro imprimible de ocho campos. Las ilustraciones se identifican como tales y no representan pacientes.

- [Nueve WebP y variantes](../../../public/images/blog/mal-aliento-perros-viejos/), [tres originales PNG](../../../assets-originales/blog/mal-aliento-perros-viejos/), [dimensiones y hashes](imagenes.json).
- [Componente interactivo](../../../src/components/article/HalitosisRecursos.astro), [producción de imágenes](produccion-imagenes.md) y [componentes](produccion-componentes.md).
- Animación sin reproducción inicial, con pausa, avance y reinicio; movimiento reducido manual, alternativa sin JavaScript e impresión. Registro sin envío ni persistencia de datos.

## Pruebas y evidencia

[Validación completa](validacion.md), [19/19 checks vigentes con salida 0](qa/checks/resultados.tsv), [recheck tras corregir anclas](qa/recheck-anclas/). Incluyen build, tipos, tests, descubrimiento, proyección Markdown y empaquetado Worker solo con `--dry-run`.

[Navegador: 103/103](qa/revision-tecnica.md), [resultados y versiones](qa/navegador.json), [46 capturas y evidencia de impresión](qa/capturas/). Matriz móvil/escritorio y claro/oscuro; enlaces, imágenes, contraste de apoyos, teclado, controles, pausa, fin, movimiento reducido, sin JavaScript e impresión. [Pruebas propias del auditor](auditoria-articulo-r2-navegador.json). El script editorial estricto conserva cuatro desacuerdos de método levantados manualmente, documentados en R2; no se declara que ese script haya pasado.

Capturas representativas: [móvil oscuro](qa/capturas/390-dark-recurso-1.png), [proceso móvil paso 4](qa/capturas/390-light-proceso-paso-4.png), [escritorio oscuro](qa/capturas/1366-dark-pagina.png), [registro impreso sin JavaScript](qa/capturas/390-light-registro-impresion-sin-js.png).

## Pendientes y límites

No hay bloqueantes nuevos dentro del alcance local. Quedan la revisión humana del PR y dos avisos preexistentes del sitio: contraste 1,35:1 del botón «No del todo» de valoración en claro, y hero compartida que anuncia solo 1200w aunque se entreguen variantes. No se declara conformidad AA global. [Evidencia de ambos en artículos existentes](qa/limitaciones-preexistentes.json).

No se ha fusionado, publicado ni desplegado. [Exclusión de esta rama en Cloudflare Workers Builds](sin-despliegue.md); se mantiene el inventario como pendiente de publicación. No hay métricas ni exportaciones de Search Console.
