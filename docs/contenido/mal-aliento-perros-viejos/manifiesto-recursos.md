# Manifiesto de recursos R1–R7

Contrato: [brief aprobado en ronda 3](../../../briefings/briefing-mal-aliento-perros-viejos.md). Las comprobaciones de producción no sustituyen el cierre independiente del artículo completo.

| Recurso | Pregunta que resuelve / ubicación | Archivo real | Fuente o procedencia | Estado de producción |
|---|---|---|---|---|
| R1 Hero | ¿Cómo empezar observando sin forzar? Header | `public/images/blog/mal-aliento-perros-viejos/labrador-senior-observacion-v1.webp` y variantes 800/400 | Ilustración IA; referencia inspeccionada, no paciente | Creado, inspeccionado y decodificado en QA |
| R2 Comida | ¿Qué conducta espontánea anotar? H2 observación | Misma carpeta, `labrador-senior-registro-comida-v1.webp` y variantes | Derivada de R1, mismo perro | Creado, inspeccionado y decodificado en QA |
| R3 Consulta | ¿Cómo acordar un plan? H2 evaluación | Misma carpeta, `labrador-senior-consulta-v1.webp` y variantes | Derivada de R1, conversación ilustrativa | Creado, inspeccionado y decodificado en QA |
| R4 Infografía | ¿Urgencias, llamada hoy o cita? H2 consulta | `src/components/article/HalitosisRecursos.astro`, `variant="prioridad"` | F3 PDSA, F6 Merck; síntesis editorial sin diagnóstico | Integrado; anclas, altura, contraste y teclado verificados |
| R5 Animación | ¿Qué queda visible y bajo la encía? H2 causas orales | Mismo componente, `variant="proceso"` | F2 Merck, F5 Cornell; esquema conceptual sin tiempos de enfermedad | Integrado; controles, fin, pausa, reduced-motion, noJS e impresión verificados |
| R6 Tabla | ¿Qué hacer y qué evitar mientras esperas? H2 manejo | MDX, `TablaApilable`, cuatro filas con `data-label` | F4 Merck, F5 Cornell, F11 FDA | Integrada; apilado, altura, contraste y ausencia de overflow verificados |
| R7 Registro | ¿Qué ocho datos llevar? H2 observación | `HalitosisRecursos.astro`, `variant="registro"` | F5 Cornell, F9 AAHA; organización editorial, sin puntuación | Integrado; plegado inicial, ocho campos/valores e impresión aislada/general verificados |

Los tres originales PNG se conservan en `assets-originales/blog/mal-aliento-perros-viejos/`. [Inventario de imágenes con dimensiones, bytes y hashes](imagenes.json). [Inspección de imágenes del productor](produccion-imagenes.md) y [notas de componentes](produccion-componentes.md).

El cuerpo tiene cuatro apoyos delimitados por `data-editorial-visual`: prioridades, proceso, registro y tabla. La secuencia conserva cuatro explicaciones sin JavaScript; su reproducción es finita, manual al cargar y controlable. El registro no envía ni almacena datos. No se promete vídeo, PDF descargable, diagnóstico ni movimiento corporal del perro.

## Evidencia de aceptación

La [prueba de navegador](qa/revision-tecnica.md) registra **103/103** comprobaciones correctas: decodificación de los nueve WebP, tamaños realmente seleccionados, anclas, alturas, contraste, teclado, reproducción, movimiento reducido, impresión y alternativa sin JavaScript. [JSON y hashes](qa/navegador.json), [capturas](qa/capturas/). Alturas móviles iniciales: R4 699 px, R5 690–697 px, R7 493 px, R6 730 px; ninguna supera 900 px. Contraste mínimo de los apoyos: 4,50:1 claro y 5,52:1 oscuro.

La hero usa 1200w en el layout compartido; sus variantes existen y decodifican, pero no se anuncian como seleccionadas en móvil. Las imágenes de cuerpo usan 400w en móvil y 800w en escritorio. El contraste insuficiente del botón compartido de valoración se documenta como preexistente en [validación](validacion.md); no se oculta ni se presenta como accesibilidad global perfecta.

Versión integrada: MDX `6913314b0400dd6d071296c682a2d724775cdecb03008ff1b0b4839349634deb`; componente `e065d8b69ae45cd9609f8d3ca9f4e41d7231ce2b9873b401ad5eedc619d9c6fc`. Los originales y las nueve imágenes finales conservan los hashes de `imagenes.json`. La [auditoría independiente integrada R2](auditoria-articulo-r2.md) cerró el conjunto como **APTO con avisos preexistentes**, dentro del único contador del artículo.

## Adenda R3

La versión y las 103 comprobaciones anteriores se conservan como evidencia del cierre R2. La [R3 aportada por el usuario](auditoria-articulo-r3.md) aprueba con avisos y agota el contador del artículo. Su [corrección puntual de Illinois](correccion-tras-r3.md) cambia solo prosa del MDX; no cambia el brief, R1–R7, sus componentes ni imágenes. No se presenta esa corrección como una cuarta auditoría ni se trasladan los hashes históricos al nuevo archivo.
