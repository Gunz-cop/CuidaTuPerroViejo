# Prioridades de mejora: Search Console y panel

Fecha: 2026-11-14. Estado: análisis inicial completado, sin cambios al sitio ni al panel. Depende del proceso preparado en PR #181; ese PR aún no está fusionado. La línea base por URL y periodo homogéneo sigue pendiente antes de ejecutar el primer experimento.

## Fuentes y confidencialidad

El propietario aportó el ZIP de Search Console y transcribió las diez filas de páginas más vistas del panel. Los originales, las cifras absolutas, el informe detallado y los CSV cruzados se conservan en un expediente privado fuera de Git. Este documento conserva conclusiones y metodología, sin esas cifras.

Search Console contiene rendimiento Web del 12 de agosto al 11 de noviembre de 2026. La fecha del archivo es 14 de noviembre, pero el gráfico no llega a ese día. La tabla del panel dice 30 días y estimado; no se aportaron sus extremos ni fecha exacta de consulta. No se suponen.

El código main (`src/lib/admin/audience.ts` y `src/components/AdminAudience.astro`) confirma que el top de páginas usa `count` de Cloudflare RUM: páginas vistas, no personas, lectura ni uso completado de la herramienta. El panel emplea días completos en Costa Rica, filtro bot:0 y hosts del sitio; la serie global de visitas usa otra medida. Hay muestreo y caché que deben acompañar los futuros cortes.

El conector Cloudflare no completó autenticación en esta sesión. Las cifras del panel proceden de la transcripción del propietario, no de una lectura independiente del panel o D1. El código sirve para verificar definiciones.

## Tratamiento y límites

- Conservar cada URL original y agrupar variantes .html/barra final de la misma página mediante el mapa conocido. Esto organiza el análisis; no modifica redirecciones o canónicas.
- Separar filas con fragmentos `#…`: sus impresiones no se suman como alcance único. CTR y posición del análisis detallado se refieren a la fila de URL actual; no se recalcula un CTR global inflado por anclas.
- Clics por familia son atribución a las filas exportadas, no personas ni total de propiedad. Totales de gráfico, consultas y páginas se conservan por separado; no se fuerza su igualdad.
- La tabla exportada de consultas es parcial. No representa toda la demanda del mercado ni contiene la relación consulta→página. Se requieren filtros por URL para atribuir una consulta a un destino.
- Comparar fuentes sirve para ordenar hipótesis. Periodos y métricas distintos impiden calcular conversión Google→visita, rebote, retención o causalidad.
- Los títulos pegados del panel se asociaron al catálogo actual. No aparecer en sus diez filas significa fuera de la lista aportada, no ausencia de actividad.
- Las URLs y sus textos tuvieron revisiones dentro del trimestre. El resultado histórico pertenece a la URL durante ese periodo, no demuestra por sí solo el rendimiento de su versión actual.

## Método para priorizar

Dos colas: mejoras pequeñas para probar y páginas a proteger/observar. El orden es una decisión editorial argumentada por demanda orgánica observada, uso reciente aportado, tarea con posible fricción, confianza del cruce y riesgo de intervención. No es un score estadístico, volumen de mercado o promesa de crecimiento.

| Orden | Página | Decisión y primera prueba |
| --- | --- | --- |
| 1 | Calculadora HHHHHMM | Confirmada como prioridad en ambas fuentes. Probar registrar, recuperar y guardar el resultado; cambiar una fricción comprobada, conservando cálculo, advertencias, datos guardados y encaje de búsqueda. |
| 2 | Cuidados paliativos | Mejorar claridad del primer paso y conexión con el registro sin duplicar su método ni reducir la calidad de vida a una decisión de final de vida. |
| 3 | Calculadora de edad | Exposición orgánica y uso reciente con baja respuesta de clics en la fila actual: investigar consultas de esta URL antes de probar un único ajuste de presentación en Google. Conservar fórmula. |
| 4 | Alimentación senior | Revisar entradas a ración, cambio de alimento y comida casera; facilitar destinos publicados y evitar abrir otra página para una necesidad ya cubierta. |
| 5 | Incontinencia urinaria | Importancia orgánica, fuera de las diez filas del panel aportadas. Diagnosticar mezcla de consultas antes de ajustar alcance senior, apertura o recursos. |
| 6 | Comida casera | Página importante en ambas fuentes: proteger y observar como primera decisión. Una reescritura integral no es el primer experimento; solo corregir una necesidad comprobada. |
| 7 | Salud mental | Separar observaciones, ansiedad y deterioro cognitivo y guiar al contenido pertinente, sin diagnóstico por síntoma. |
| 8 | Úlceras por presión | Candidata de artículo para un segundo lote; diferenciar escaras de búsquedas genéricas de lesiones cutáneas antes de ampliar el alcance. |
| 9 | Defeca mucho | Probar visibilidad y utilidad del registro de observaciones; conservar experiencia documentada y sus límites. |
| 10 | Baño adaptado | El panel la destaca frente a un histórico orgánico pequeño. Revisar ventana de publicación, tareas y recursos móviles antes de reescribir o atribuir un canal de entrada. |

Inicio y agresividad tardía quedan monitorizados. El top del panel no autoriza un cambio del layout global. El chequeo geriátrico conserva utilidad como referencia, pero no desplaza por defecto las prioridades observadas.

## Primera prueba acotada

1. **Ficha HHHHHMM:** contrato, URL/versión, necesidad y una hipótesis; comprobar primero lo que ya funciona y reproducir una tarea de registro/recuperación/exportación. Si no se identifica fricción, conservar y pasar al siguiente candidato.
2. **Línea base:** consultas filtradas por URL y periodos completos comparables; registrar fechas, muestreo y actualización del panel. El trimestre sirve para selección, no sustituye una línea base reciente por URL.
3. **Una entrega:** cambiar una pieza de interfaz o explicación ligada a esa tarea. No mezclar con título/URL, algoritmo, escala, almacenamiento, diseño global y nuevo informe de varias fechas.
4. **Verificación:** rama/PR, auditoría independiente hasta cinco rondas por unidad, cierre al aprobar y parada si falla la quinta. Casos pertinentes, registros anteriores, exportación, fuentes, enlaces, móvil/escritorio, teclado, consola y build/check/proyección si cambia código público.
5. **Publicación y reversión:** seguir autorización y metodología del repo. Verificar la URL y el recorrido reales. Ante pérdida de datos, cálculo incorrecto, recurso roto o navegación bloqueada, detener el lote y aplicar el procedimiento de reversión acordado para esa entrega. No revertir por una oscilación diaria de búsquedas.
6. **Recepción:** revisión técnica temprana; observar a 28 y 56 días completos por intención/URL. Usar páginas sin cambios como referencia observacional, no como A/B causal. Datos insuficientes pueden dar resultado inconcluso.

## Mejora mínima propuesta para el panel

Preparar una ficha de salida de solo lectura «Exportar páginas» antes de construir un nuevo panel o cambiar métricas. Columnas propuestas: ruta, páginas vistas, inicio/fin UTC y local, fecha de consulta, sampleInterval/estimated, fuente y versión. Mantener definiciones actuales y no enviar notas de salud ni identificadores personales.

Valorar una lista ampliada o bloque de URLs del piloto, porque fuera del top diez no equivale a cero. Ampliar límites requiere revisar consulta, cobertura/truncamiento y pruebas; no basta con mostrar más filas. Una serie temporal por página no puede reconstruirse del archivo diario global existente: es una capacidad distinta que debe definirse si hace falta.

Esto es una propuesta para una entrega posterior. Esta sesión no cambió el panel ni ejecutó recuperaciones o escrituras en producción.

## Pendientes para ejecutar

- Confirmar cortes y fecha de actualización del panel en el próximo registro/export.
- Obtener consultas de Search Console filtradas por las URLs del primer lote y ventanas recientes comparables; conservar originales privados.
- Completar la ficha y prueba de tarea antes de redactar un brief o modificar la página.
- Usar el flujo afinado en PR #181 cuando se acuerde su adopción; no afirmar que ya gobierna main.

Entregables privados: informe con cifras y límites, cruce de las diez páginas y cola de prioridades, CSV originales y script de reproducción. Solo este resumen y las tareas se incorporan a Git.
