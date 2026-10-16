# Experiencias visuales como parte del artículo

Actualizado: 2026-10-16. Criterio editorial solicitado por el propietario después de la ampliación de ojos y oídos. Para artículos completos, seleccionar e integrar apoyos útiles durante la redacción; en encargos expresamente solo de texto, documentar el plan sin ampliar el alcance. La ejecución se rige por [crear-animaciones-articulo-blog](../../crear-animaciones-articulo-blog/SKILL.md).

## Elegir formato y cantidad

| Necesidad del lector | Recurso posible | Qué debe aportar |
|---|---|---|
| Entender cuándo observar, parar o consultar | Mapa/infografía de decisiones | Diferenciar situaciones y enlazar la explicación; no diagnosticar ni esconder urgencias |
| Seguir un procedimiento ya indicado | Secuencia controlable | Mostrar preparación, acción, cambio y siguiente decisión; conservar límites clínicos |
| Comparar alternativas | Infografía comparativa | Criterios, diferencias y límites con texto, no solo color |
| Interpretar un estudio | Infografía de datos con detalle opcional | Población, denominadores y resultados correctos; asociación distinta de causalidad |
| Ver una postura o escena concreta | Ilustración editorial o referencia desplegable | Anatomía, zona y gesto fieles al texto; sujeto ilustrativo identificado |

Elegir el menor conjunto que cubra preguntas diferentes. No imponer cuota, animaciones por H2 ni una estructura idéntica para todo artículo. Una tabla o imagen estática es preferible cuando el movimiento no explica nada adicional. No repetir íntegramente los párrafos ni introducir datos nuevos sin respaldo para llenar una tarjeta.

## Plan mínimo antes de integrar

| Recurso | Pregunta y utilidad | H2/párrafo | Fuente y límites | Interacción/alternativa | Archivo/componente | Evidencia de aceptación |
|---|---|---|---|---|---|---|
| Nombre y formato | Qué entenderá o decidirá el lector | Ubicación concreta | Documento y afirmación que lo sostiene | Manual, reduced-motion, sin JavaScript, impresión | Ruta real o pendiente identificado | Captura, prueba y resultado |

Registrar la cantidad elegida y por qué no duplica otros recursos. Si se adapta un brief aprobado, documentar la adenda sin inventar una historia ni alterar su contrato científico. Ningún recurso pendiente puede convertirse en una promesa pública de contenido disponible.

## Referencia implementada: ojos y oídos

El artículo incorpora **dos infografías y una secuencia de cuatro pasos**, elegidas por tres necesidades distintas, no como cantidad obligatoria:

1. **Decisión temprana:** mapa junto a la introducción para distinguir urgencias, cambios a consultar y observación de un oído sano; enlaces a los apartados de desarrollo.
2. **Orden de cuidado:** preparación → aplicación según pauta → masaje suave indicado → sacudida y retirada exterior. El cocker permanece estático y cambian herramientas/marcadores; no es un vídeo ni una demostración para cualquier oído. Las señales de parar siguen visibles.
3. **Lectura de evidencia:**39 participantes en grupos 19/12/8, con desglose5+2+1 del último grupo. Desplegable nativo para profundizar, sin sonidos ni pruebas domésticas de audición. No traslada asociación a prevención.

Rutas de referencia:

- [Componente de las tres experiencias](../../../../src/components/article/OjosOidosVisual.astro).
- [Artículo integrado](../../../../src/content/blog/limpieza-ojos-oidos-perros-ancianos.mdx).
- [Plan de la ampliación](../../../../docs/contenido/limpieza-ojos-oidos-perros-ancianos/experiencias-visuales/plan.md).
- [Auditoría visual final](../../../../docs/contenido/limpieza-ojos-oidos-perros-ancianos/experiencias-visuales/auditoria-visual-r2.md).
- [Pruebas de navegador](../../../../docs/contenido/limpieza-ojos-oidos-perros-ancianos/experiencias-visuales/navegador.json).
- [Captura móvil del paso de masaje](../../../../docs/contenido/limpieza-ojos-oidos-perros-ancianos/experiencias-visuales/390-oscuro-paso-3.png).
- [Publicación comprobada](../../../../docs/contenido/limpieza-ojos-oidos-perros-ancianos/experiencias-visuales/publicacion.json).

Reutilizar el patrón cuando encaje; no copiar raza, cifras, anatomía señalada o maniobras a otro tema. Leer el componente actual antes de importarlo: las variantes de este ejemplo contienen información específica de ojos/oídos.

## Lecciones que deben pasar a la siguiente entrega

- **Marcadores:** probar posición sobre la imagen final y legibilidad a escala móvil. En este ejemplo se corrigió un círculo situado demasiado bajo y poco visible sobre pelo canela mediante recolocación y doble borde. No copiar sus coordenadas a otro recorte.
- **Modo oscuro:** comprobar todos los textos, no solo títulos. Los estilos globales `details`/`summary` con `!important` pueden cambiar el fondo y volver ilegible una nota. Limitar cualquier corrección al componente; no alterar estilos globales para resolver una tarjeta.
- **Impresión:** un panel oculto con `hidden` puede seguir oculto por reglas de cascada aunque exista `@media print`. Probar los pasos con JavaScript activado y desactivado. La implementación actual usa estado CSS para poder mostrarlos todos al imprimir.
- **Estados reales:** comprobar no autoplay, anterior/siguiente, pausa estable, finalización, repetir, movimiento reducido y limpieza de temporizadores. Un icono de pausa sin detener avance/movimiento no cumple.
- **Capturas:** terminar transiciones antes de fotografiar cada estado. Si se ocultan overlays ajenos al recurso para mostrarlo limpio, declararlo; no usar esa captura como prueba de que la página no tiene superposiciones.
- **Proyección:** confirmar que las explicaciones y enlaces siguen siendo útiles en Markdown. El contador del MDX no incluye necesariamente el texto de los componentes; ese texto requiere revisión igual.
- **Entrega honesta:** diferencias entre build local, push y despliegue; qué archivos se decodificaron y qué pruebas se hicieron. No declarar una mejora de permanencia sin datos de uso.

## Cierre de la redacción

Entregar la tabla del plan con estado y evidencia finales, los recursos integrados, las capturas y los pendientes reales. Si se produjo una ampliación visual, encargar su revisión independiente conforme a AGENTS y conservar el máximo de tres rondas del alcance auditado. No publicar un recurso defectuoso por haber pasado antes la auditoría textual.

Para una modificación exclusivamente documental de esta skill, comprobar enlaces, coherencia y formato; no repetir builds o pruebas de producto sin cambios de código.
