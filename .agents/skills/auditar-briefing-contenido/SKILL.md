---
name: Auditar Briefing de Contenido - Cuida Tu Perro Viejo
description: Evalúa un brief con revisión independiente de fuentes, utilidad, recursos, arquitectura y contrato antes de redactar. Entrega hallazgos; no corrige.
---

# Auditar un briefing

Leer el [generador](../generar-briefing-contenido/SKILL.md), el [contrato 2.0](../references/contrato-utilidad-editorial.md), [calidad editorial](../references/calidad-editorial-adsense.md) y [voz](../references/guia-voz-tono.md). La versión declarada y sus adendas identifican el contrato que se audita. No aplicar cuotas históricas de fuentes, cajas, enlaces, imágenes o palabras a un contrato 2.0.

## Rol y alcance

Revisor distinto de quien generó o corrigió el brief. No modificar brief, inventario ni otros objetos evaluados. Escribir informe con instrucciones para otra sesión, sin ejecutar sus correcciones. Una comprobación propia del autor no es auditoría independiente.

Antes de R1 registrar unidad, archivos, versión/hash y alcance. Hasta cinco rondas por unidad: se termina al aprobar; las correcciones mantienen contador y un fallo en R5 detiene la unidad y sus dependientes. La siguiente unidad de alcance diferente empieza en R1. No reiniciar renombrando archivo, cambiando auditor o abriendo una falsa ampliación. Conservar los informes previos y distinguir verificaciones propias de evidencia recibida.

## 1. Intención y correspondencia con el sitio

Comprobar pregunta/situación observable, público/variante, decisión principal, propuesta de apertura y aportación frente a páginas existentes. Contrastar keyword/slug/tema con `INVENTARIO_CONTENIDO.md`, contenido y briefs; una etiqueta Publicado no basta para acreditar una URL pública.

Validar la alternativa elegida ante solapamiento y si está dentro del encargo. Search Console solo se atribuye cuando se consultó; su ausencia no invalida el brief si la hipótesis queda declarada. No pedir historia personal o un desenlace que el tema no necesita.

## 2. Metadatos y contrato técnico

Contar SEO ≤55 y descripción ≤160, no estimar. Validar YAML contra `src/content.config.ts`, enum, rutas e imágenes. La versión E01–E08 va en la cabecera del brief, no en campos inventados de frontmatter. Revisiones conservan publicación original y distinguen fecha de modificación. Verificar que existe un bloque de metadatos concreto listo para el redactor.

## 3. Cada fuente, identidad y afirmación

Por cada ficha abrir el documento y verificar:

1. Calidad, autoridad y pertinencia: guías veterinarias vigentes, estudios revisados por pares o secundaria clínica identificada cuando proceda. Prestigio, indexación o cantidad no reemplazan diseño y aplicabilidad.
2. Título, autor/institución, año, PMID/DOI/URL profunda reales. Un identificador de otro tema o rellenado de memoria bloquea.
3. La afirmación exacta está en el pasaje/tabla declarado. Distinguir especie, población, grupo/individuo, asociación/causalidad y extrapolación.
4. Estado verificado/parcial y límites honestos. Ante 403 buscar versión oficial alternativa o resumen identificable; no llamar falsa a una referencia solo por bloqueo. Tampoco afirmar datos no leídos.
5. Trazabilidad directa e inversa: fuente→H2 que desarrolla su aporte y cada H2 científico→respaldo. Bibliografía decorativa es hallazgo.
6. Coherencia con política editorial vigente y límites clínicos compartidos. No diagnosticar por observación ni planificar dosis/ajustes para el lector. Una dosis histórica requiere justificación de estudio y compatibilidad con la política.

No fijar mínimo de fuentes. Una laguna declarada puede justificar enfoque limitado; una afirmación central sin respaldo impide validar el brief. Abrir enlaces no basta para dar por comprobado su contenido.

## 4. Recorrido, utilidad y componentes

Evaluar E01–E08 uno por uno con ubicación y prueba futura factible. La persona debe encontrar respuesta y acción pronto; las precauciones pertinentes quedan visibles. El orden depende de sus tareas, no de una plantilla de fisiología→diagnóstico→tratamiento.

Cada H2 responde algo distinto y tiene fuentes/presupuesto útiles. Sumar targets y comparar rango; ±15% por sección según el contrato, sin aprobar desvíos silenciosos ni pedir relleno. Una adenda justificada cambia un contrato, no un conteo inventado.

En 2.0 verificar declaración exacta de cantidades de cuerpo (`info`, `danger`, `warning`) y motivos, incluido cero. Bibliografía final fuera de ese conteo. No rechazar por omitir una caja innecesaria; sí por omitir un riesgo pertinente o no declarar cantidades. FAQ: cantidad explícita y preguntas no redundantes; cero con motivo es válido. Si hay items, comprobar formato FAQ real y respuestas borrador.

El brief da instrucciones, no desarrollo casi terminado; títulos de cajas y FAQ breves pueden anticiparse. Caso/historia solo con procedencia; momentos en H2 prácticos, cierre integrado, sin H2 narrativo dedicado ni recuperación inventada. Una guía sin caso es una opción válida.

## 5. Recursos, enlaces y plan visual

Inventariar cada PDF, vídeo, plantilla, componente o herramienta anunciados: tarea, ruta/pendiente, responsable, estado y prueba real antes de publicar. En el brief un recurso puede estar pendiente si es gate explícito o se retirará su promesa; no fingir que fue probado. Puede justificarse no crear recurso nuevo.

Comprobar cada enlace contra inventario/ruta publicada y motivo contextual, con pilar correcto. Sin cuotas de spokes ni calculadora universal. Una URL pendiente no se publica como enlace; revisión, urgencia y seguimiento tienen destinos distintos. Aplicar skill de enlazado.

Aplicar dirección visual y apoyos responsive: cantidad por función, hero incluida, ficha/escena/acción/luz/anatomía/alt, continuidad y cinco rasgos senior en cada prompt y recorte, aceptación a 390 px, razas de trabajos recientes y motivo si se repiten. Respetar excepciones documentadas del sujeto real y preferencia de AGENTS contra dibujos propios de perros/personas en SVG/CSS. Verificar viabilidad móvil, claro/oscuro, accesibilidad y alternativas; no exigir tres prompts por costumbre ni aceptar un plan genérico.

## Informe y decisión

Usar [formato](references/formato-informe.md) y [taxonomía](references/taxonomia-fallos.md). Veredicto Válido / Válido con reservas / No válido para redacción con razón concreta. Una reserva no puede esconder fuente central sin comprobar, recurso imposible, falsedad, riesgo o prueba indispensable pendiente.

Por hallazgo: prioridad, ubicación, evidencia y corrección exacta. Registrar qué se preserva, tabla de cada fuente y tabla E01–E08/recurso con resultado o no aplicabilidad justificada. Si el fallo ya se propagó, identificar artículos y briefs que lo heredan sin modificarlos. El estado del inventario se reporta al implementador; no se cambia en esta auditoría.

Señalar comprobaciones no ejecutadas. No confundir aprobación de un checklist con verificación de fuentes y utilidad. Una crítica refutada por un dato propio se corrige en el informe.
