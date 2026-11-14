---
name: Auditar Herramienta Interactiva - Cuida Tu Perro Viejo
description: Evalúa una herramienta con evidencia y pruebas según su tipo: cálculo, registro u orientación. Comprueba tareas, datos, privacidad, accesibilidad e integración sin corregirla.
---

# Auditar una herramienta

Leer [creación de herramientas](../crear-herramienta-interactiva/SKILL.md), [contrato 2.0](../references/contrato-utilidad-editorial.md), calidad/voz compartidas, AGENTS y [decisiones del propietario](../../../docs/herramientas/decisiones-del-propietario.md). No auditar un registro con criterios de edad, longevidad, etapas o tarjeta PNG obligatoria.

## Rol, contrato y rondas

Revisor distinto de quien creó/corrigió. No modificar herramienta, fuentes, decisiones o inventarios: escribir informe e instrucciones para otra sesión. Registrar unidad, alcance, archivos/hash, autor, auditor y ronda R1–R5. Corregir no reinicia; aprobar cierra; fallo R5 detiene la unidad y dependientes. La siguiente unidad distinta empieza R1. Evidencia previa se identifica, no se presenta como prueba repetida.

La auditoría de un cambio exclusivamente documental a una skill revisa contenido, enlaces y coherencia, sin fingir que se probó el producto. En herramienta funcional, aplicar las pruebas de abajo según contrato y tipo; no dispensar verificaciones indispensables para declarar LISTA.

Respetar decisiones del propietario documentadas. Una decisión de producto ya aceptada no es un defecto pendiente; si produce un problema nuevo concreto, registrarlo aparte como propuesta con evidencia, sin deshacerla de oficio. Las limitaciones de prueba se declaran y no se disfrazan de aprobación.

## A. Tarea y método

Identificar página, componente, módulos puros y contrato de capacidades compartidas. Confirmar qué ya existía, qué cambió y qué se preserva. Evaluar E01–E08: necesidad, resultado comprensible, acción/siguiente paso, contenido sin relleno, fuentes y recursos reales, voz/procedencia y versión.

Determinar tipo: cálculo, registro u orientación editorial. Revisar que se identifique como tal y sus límites coincidan con lo implementado. No tratar un ajuste editorial como diagnóstico validado, ni un total alto como garantía de bienestar. No suponer que calidad de vida significa exclusivamente final de vida.

## B. Evidencia y lógica

Por fórmula, cifra o umbral: abrir fuente revisada por pares/guía veterinaria, confirmar identidad, cifra/pasaje, población, aplicabilidad, derivación y licencia cuando se adapta una escala. Validar ajustes propios claramente declarados; otra app no es respaldo clínico. Si hay evidencia parcial, comprobar que el resultado se limita a lo leído.

Probar por tipo con entrada/esperado/observado, sin copiar esperado de la misma función:

- **Cálculo:** mínimo, típico, cada frontera relevante, fuera de rango/inválido, unidades y redondeo. Reproducir a mano o con referencia independiente; coherencia entre resultado y tabla/página.
- **Registro:** inicio vacío, respuestas extremas/incompletas, advertencia independiente de total, varias fechas/zonas horarias, orden, comparación descriptiva, notas y datos guardados anteriores. Guardar/recargar/borrar y comprobar exportación fiel.
- **Orientación:** recorrer combinaciones/reglas relevantes, incluyendo casos que exigen consulta o no permiten una recomendación. Confirmar procedencia editorial y que las recomendaciones no aparenten prescripción individual.

La lógica web/API/MCP debe coincidir donde el contrato la comparte. No exigir una API nueva si no se encargó. Si cambió una respuesta pública, comprobar versión y compatibilidad; si no cambió, preservar paridad.

## C. Datos, recursos y privacidad

Revisar versionado, límites y recuperación del almacenamiento; prueba con localStorage no disponible y datos corruptos. Confirmar que no se pierdan registros silenciosamente y que la persona reciba una alternativa para conservarlos. Local no significa sincronizado ni recordatorio automático de servidor.

Notas, respuestas de salud, nombre del perro, correos y otros datos personales no se filtran a telemetría ni URL compartida. Comprobar la impresión/PDF/texto/tarjeta realmente obtenidos: fecha, contenido, límites y legibilidad. Un botón o HTTP 200 no prueba entrega; no realizar envíos externos durante las pruebas.

Cada recurso anunciado debe tener ruta, tarea y prueba. Si el alcance solo planifica un recurso, registrar el gate y no calificarlo disponible. Verificar que las funciones nuevas no dupliquen las que ya funcionan.

## D. Voz, interacción y accesibilidad

Mensajes cálidos, precisos y con siguiente paso útil; sin cuenta atrás, pronóstico individual, años restantes ni bandas clínicas sin respaldo. Precauciones relevantes visibles y separadas del total; no esconderlas para simplificar la interfaz.

Probar 390, 820 y 1366 px, claro/oscuro, objetivos ≥44 px, contraste de texto ≥4,5:1, etiquetas/agrupación, teclado y foco, anuncios accesibles y consola. Formulario/resultado encontrables, sin scroll horizontal ni superposiciones. No imponer dos columnas, barra fija, animación o tarjeta a todo tipo de registro.

Movimiento reducido, controles y pausa real donde haya animación; alternativas de lectura/impresión y recorrido sin JS cuando corresponda. Ilustración según AGENTS y dirección visual, nunca perros/personas dibujados a mano en SVG/CSS. Abrir imágenes y tarjetas; confirmar identidad, edad, anatomía y alt. Una captura recibida no reemplaza pruebas que no se ejecutaron.

## E. Página e integración

H1 y apertura responden la necesidad; método/fuentes en `#metodo`, límites, FAQ y schema coherentes con contenido real (FAQPage solo si corresponde). Bibliografía complementa explicaciones; número de H2/cajas por utilidad y contrato, no mínimo universal.

Destinos pertinentes desde herramienta/pilares/artículos, rutas reales y TOOL_LINKS según necesidad; no CTA universal a paliativos o chequeo. Usar skill de enlazado. Revisar inventario de objetos y clasificación de rutas de agent-readiness; golden/manifest actualizados y delta semántico revisado si cambió HTML contractual. Confirmar proyección útil de texto/enlaces, sin ocultarlos en figure. No regenerar fixtures ciegamente.

Para implementación funcional verificar evidencias y ejecutar los controles pertinentes de la sección 6 de la skill creadora: build explícito, tests de lógica/paridad, agent-readiness/proyección y astro check según alcance. Una omisión necesita razón y no puede ocultar una prueba indispensable. Una edición de instrucciones sin código no requiere build de producto.

## Informe y decisión

- Veredicto LISTA / LISTA CON CAMBIOS MENORES / NO LISTA con motivo. No esconder una fuente central sin comprobar, riesgo, pérdida de datos o prueba indispensable bajo cambios menores.
- Unidad, ronda, versión/hash, alcance y autor/auditor distintos.
- Hallazgos por prioridad con archivo:línea/captura, prueba, efecto y corrección exacta.
- Tablas E01–E08 y fuente→afirmación→pasaje→estado; datos/privacidad y recurso→prueba→resultado.
- Casos reproducidos entrada/esperado/observado; capturas/interacciones/exportaciones propias frente a evidencia recibida; limitaciones claras.
- Qué preservar, instrucciones autocontenidas para corregir y dependencias afectadas.

No cambiar el objeto auditado ni marcarlo publicado. Verificación local no acredita despliegue; merge/producción y comprobación pública siguen la metodología y autorización correspondientes.
