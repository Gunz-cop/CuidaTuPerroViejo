# Tres experiencias visuales — entrega local validada

Ampliación solicitada por el usuario el16 de octubre de2026. Cantidad elegida: dos infografías y una secuencia animada, con una función diferente en cada punto del recorrido.

- **Decidir temprano:** mapa en introducción con señales para consultar y accesos al detalle clínico. No es un test ni una herramienta diagnóstica.
- **Entender el orden:** cuatro momentos de una limpieza ótica indicada, con el mismo cocker senior, cambio de marcadores y herramientas, reproducción voluntaria y finita, pausa y navegación manual. No se simula movimiento corporal. La foto de masaje anterior se conserva en desplegable como referencia opcional.
- **Interpretar evidencia:**39participantes, grupos19/12/8 y exploración del desglose5+2+1. No hay estímulos de sonido ni promesas de prevención.

## Validación

`auditoria-visual-r2.md`: ampliación aprobada en segunda ronda, tres problemas deR1 corregidos. No se reabren las tres auditorías editoriales previas ni el brief.

`build.log`: compilación, sitemap y proyección Markdown correctos; las tres experiencias conservan texto y enlaces en el documento proyectado. `check.log`:175archivos,0errores,0warnings,59hints. `regresion.log`:cinco pruebas del script de métricas aprobadas. `metricas.txt`:sin bloqueantes mecánicos; los textos del componente son síntesis visuales adicionales, no se incluyen en el conteo MDX del contrato previo.

`navegador.json`:375claro/390oscuro/1440claro/1440oscuro, sin errores JavaScript o desbordamiento; tres anclas existentes; controles≥44px; imagen SVG decodificada; teclado; no autoplay; pausa estable; finalización y repetición; reduced-motion manual; impresióncuatropasosconysinJS; fallbacksinJSconcuatropasosydetallesnativos. Contraste mínimo5,91:1 del texto activo muestreado. El evento de ocultación se probó sintéticamente y se identifica así; no se presenta como prueba de cambio real de pestaña.

Las capturas finales desactivan transiciones solo para congelar estados nítidos y ocultan nav fija, huecos de publicidad y botón flotante únicamente en la imagen de evidencia. Las pruebas de layout/contraste/controles se realizan sobre el producto. No se obtuvo captura final sinJavaScript por inestabilidad de captura en Chromium; fallbackyprintsecomprobaronconasercionesytambiénporelauditorindependiente. No se declara una imagen inexistente.

No se ha medido una mejora de permanencia: esa hipótesis requiere Analytics tras el despliegue. El objetivo implementado es facilitar decisiones y comprensión, sin bloquear lectura ni forzar interacción.

## Recurso

`cocker-senior-guia-otica-v1.webp` (1200×800) y variantes800/400, alfa conservado. La animación SVG utiliza el principal; las variantes quedan disponibles, no se afirma selección responsive de SVG. La identidad y anatomía se inspeccionaron a partir de la escena publicada de masaje; el sujeto es ilustrativo, no paciente real. El nombrev1evita sustituir imágenes con caché larga.

Los originales se conservan según `plan.md`. Recursos sin dependencias nuevas; CSS/JS limitados al componente. Pendiente registro público después del push autorizado dentro del trabajo del artículo.

## Publicación comprobada

Workers Builds completó con éxito el commit `e89f3354c5673f5757c6ac0c0ad780084948ee9d` enmain. Se comprobó la URL pública HTTP200, las tres variantes visuales en HTML, los cuatro paneles, el desglose5+2+1, los scripts de control y los tres archivos del recorte decodificados conalfa. Evidencia: `publicacion.json`. Las pruebas de interacción y contraste corresponden al mismo build local descrito arriba; no se atribuye una medición pública de retención.
