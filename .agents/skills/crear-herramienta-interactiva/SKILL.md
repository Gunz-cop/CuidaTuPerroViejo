---
name: Crear Herramienta Interactiva - Cuida Tu Perro Viejo
description: Diseña o mejora cálculos, registros y ayudas de decisión con evidencia, tareas reales, datos y recursos verificados. Respeta decisiones del propietario y separa revisión independiente.
---

# Crear o mejorar una herramienta

Leer AGENTS, metodología, [contrato editorial 2.0](../references/contrato-utilidad-editorial.md), calidad/voz compartidas y [decisiones del propietario](../../../docs/herramientas/decisiones-del-propietario.md). Trabajar en rama propia. No tocar artículos, configuración de migración o producción dentro de este encargo. La revisión de herramientas es una unidad separada de la redacción de blog.

## 1. Especificar la tarea antes de diseñar

Inventariar página, componente, lógica, funciones existentes y datos guardados. Declarar qué falta y qué se conserva; no reconstruir historial/PDF/recordatorio que ya existen. Datos de demanda disponibles ayudan a elegir; no inventar cifras ni bloquear el proceso interno por esperar Search Console.

Definir público, situación, entrada, salida útil, siguiente paso y prueba de tarea. Registrar contrato, alcance/archivos, versión, exclusiones y E01–E08 aplicables a la página. Revisar 2–3 referencias equivalentes si aportan información; documentar acceso limitado y no atribuirles funcionamiento que no se probó. Competencia inspira diseño, no valida clínica.

Clasificar la herramienta:

- **Cálculo:** fórmula, rangos, unidades, redondeo, supuestos y datos de referencia.
- **Registro:** observaciones, fecha/contexto, guardado, comparación descriptiva, exportación y límites del dato.
- **Orientación editorial:** reglas de selección, procedencia y límites; no presentarla como escala diagnóstica validada.

La calculadora de edad (`dog-age.ts`, `DogAgeTool.astro` y su página) muestra patrones técnicos, no etapas, mensajes, ilustración o fórmula obligatorios para todas. HHHHHMM no hereda cuentas de edad, «longevo» o porcentajes de bienestar.

## 2. Evidencia, límites y decisiones

Verificar cada fórmula, cifra o umbral contra publicación revisada por pares o guía veterinaria aplicable: título, autores, año, DOI/URL, pasaje, población, afirmación y límites. No rellenar datos desde memoria ni usar otra calculadora/blog como evidencia primaria. Identificar ajustes propios por separado; verificar la licencia de escalas y cuestionarios antes de adaptarlos.

Un gráfico de registros describe lo anotado; no diagnostica evolución clínica. No introducir bandas/colores por una suma, equivalencias o nuevos umbrales para hacer más atractivo el resultado. Una advertencia crítica no desaparece por total alto. Definir manejo de datos incompletos y frecuencia de recordatorio como agenda, no pauta médica.

Respetar las decisiones del propietario documentadas. Si surge un conflicto nuevo y concreto, explicarlo y proponer una decisión; no deshacerla silenciosamente ni tratarla como fallo antiguo pendiente. Mensajes cálidos y útiles, sin cuenta atrás, años restantes ni pronósticos individuales. El resultado tiene una acción pertinente y un límite comprensible; no saturar con salvedades repetidas ni esconder urgencias.

## 3. Lógica y datos

Funciones puras en `src/lib/`, constantes nombradas y fuente/derivación documentadas; DOM en componente. Reutilizar lógica compartida por web/API/MCP si el alcance afecta resultados, con prueba de paridad. Añadir o cambiar capacidades MCP es encargo específico; no modificar contrato público accidentalmente.

Para registros: definir formato/versionado, límites, orden de fechas y zona horaria, comparación de datos, notas, borrado, exportación y compatibilidad con entradas anteriores. `localStorage` puede fallar: capturar errores, preservar lo recuperable y explicar al usuario cómo conservar su registro si no pudo guardarse. Probar vacío, datos corruptos, múltiples fechas y almacenamiento no disponible. No exponer respuestas, notas, nombre del perro u otros datos personales en telemetría o URLs compartidas. Un almacenamiento local no implica sincronización entre dispositivos ni recordatorio de servidor.

Nuevas reglas o lógica requieren tests de casos reales de borde; no tests que solo repitan la implementación. Para una edición de instrucciones de esta skill basta comprobar contenido/enlaces/coherencia; no fingir pruebas del producto ni recompilar sin cambio funcional.

## 4. Interfaz, ilustraciones y compartir

Usar componentes Astro y CSS acotado; JS para estado/datos. Sin framework o librería nueva por decoración. Títulos y entradas comprensibles, resultado próximo, formulario progresivo cuando ayude; no imponer dos columnas, barra fija o animación a todos los registros.

390, 820 y 1366 px, claro/oscuro: no scroll horizontal, overlays ni controles tapados. Campos con etiquetas, agrupación semántica, teclado/foco, objetivos ≥44 px, contraste de texto ≥4,5:1 y cambios de resultado anunciados de forma apropiada. Movimiento reducido, sin animación que oculte tareas ni bloquee lectura.

Ilustraciones mediante imagen de referencia/generación según AGENTS; nunca dibujar perros/personas/escenas a mano en SVG/CSS. Iconos geométricos simples sí. Mantener identidad/edad y alternativas de texto; la ilustración no es paciente ni evidencia clínica. Si falta recurso, marcador sobrio identificado, nunca darlo por terminado. Encargo visual con escena, estilo, paleta, fondo, proporción y capas antes de producir.

Compartir responde a una tarea: texto/WhatsApp, impresión/PDF o tarjeta PNG si procede. No exigir tarjeta clínica o un PNG de 1080×1350 cuando el resultado útil es un informe. Comprobar contenido exportado, fecha, límites y privacidad; `navigator.share` con fallback cuando se use. Un clic de imprimir no prueba PDF guardado o enviado. No realizar envíos externos al probar.

## 5. Página y descubrimiento

Página `src/pages/herramientas/<slug>.astro`: respuesta clara a la necesidad, herramienta accesible pronto, explicación breve, método/fuentes `#metodo`, límites y FAQ por dudas reales. Cantidad de H2, cajas y recursos por función, no cuota ni texto SEO de relleno. Schema válido y coherente con lo visible (WebPage, BreadcrumbList, SoftwareApplication y FAQPage solo si corresponde); fuentes declaradas antes del schema que las usa.

Mantener enlaces pertinentes desde pilar de herramientas y otros pilares, `TOOL_LINKS` y tarjetas si existen, siguiendo skill de enlazado. Cada destino corresponde a una tarea; no llevar siempre a paliativos o chequeo. No modificar portada por defecto. Recursos y archivos nuevos se añaden al inventario de objetos.

Clasificar rutas nuevas en `scripts/agent-readiness/inventory.mjs`; no exponer una API por crear una página. Si el HTML contractual cambia, revisar proyección DOM/Markdown, golden fixtures y manifest relacionados. Regenerar no equivale a aprobar: revisar el delta semántico y evitar texto útil dentro de `<figure>` (proyección conserva imagen/figcaption).

## 6. Verificar y entregar

Para cambio funcional, según alcance y CI del repositorio:

```bash
npx astro build
npm test
node --test tests/agent-readiness/*.test.mjs
node --test tests/agent-readiness/projection-growth.mjs
node tests/agent-readiness/projection-semantic.mjs dist
npx astro check
```

Build explícito sin hooks de indexación. Añadir casos del cálculo o registro, paridad si aplica, datos previos/no disponibles, interacción, exportación real, teclado, tres tamaños, ambos temas, reduced-motion y consola. Ajustar comandos solo con motivo documentado y declarar limitaciones; no afirmar que build prueba uso.

Entregar fuente→afirmación, E01–E08/tarea→prueba, archivos/objetos, capturas reales, casos entrada/esperado/observado, exportaciones, versión y límites. Actualizar decisiones nuevas cuando el propietario las adopte e inventarios pertinentes; no marcar publicación con una prueba local.

PR y auditoría independiente con [auditar-herramienta-interactiva](../auditar-herramienta-interactiva/SKILL.md). Cinco rondas máximo por unidad: detener al aprobar o si falla R5; corregir no reinicia. Quien crea/corrige no audita. Merge y operaciones en producción requieren su autorización propia según metodología.
