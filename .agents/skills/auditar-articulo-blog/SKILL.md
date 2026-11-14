---
name: Auditar Artículo de Blog - Cuida Tu Perro Viejo
description: Revisa independientemente un MDX contra su brief, fuentes, tareas y recursos reales; separa métricas mecánicas de la evaluación clínica/editorial. No corrige.
---

# Auditar un artículo

Leer brief/adendas y auditoría de brief, [redacción](../redactar-articulo-blog/SKILL.md), [contrato 2.0](../references/contrato-utilidad-editorial.md), [calidad](../references/calidad-editorial-adsense.md) y [voz](../references/guia-voz-tono.md). Verificar la misma versión/hash del artículo, recursos y contrato. No atribuirle normas que cambiaron después de producirse; registrar transición.

## Independencia e iteraciones

Quien creó o corrigió la pieza no emite su auditoría independiente. Auditar no autoriza corregir: escribir hallazgos y una instrucción autocontenida para otra sesión. Cinco rondas como máximo por unidad, deteniendo al aprobar o si falla R5. Correcciones mantienen contador; siguiente unidad distinta comienza en R1. No reiniciar por renombrar, cambiar auditor o ampliar informalmente alcance. Registrar unidad, ronda y hashes.

## 1. Intención y contrato

Leer el contrato antes que el artículo. Comprobar E01–E08, pregunta principal, público, aportación distinta, orden de tareas y qué se conserva en revisión. Recorrer la página: respuesta y acción pronto; precauciones pertinentes visibles; explicación donde ayuda. No imponer un índice de fisiología/diagnóstico/medicación ni concluir que todo usuario de calidad de vida busca eutanasia.

Cada H2 debe aportar algo distinto. Presupuesto/rango y cantidades de recursos son los pactados; no rechazar brevedad por sí sola ni aprobar relleno por cumplir conteo. Un cambio justificado de alcance necesita adenda identificada antes de aprobar.

## 2. Métricas y técnica

Ejecutar `node .agents/skills/auditar-articulo-blog/scripts/metricas.mjs <slug> --strict`, leer [métricas](references/metricas.md) y levantar pendientes manuales. El script no valida fuentes, utilidad ni imágenes. Si falta contrato o su sintaxis no es interpretable, no declarar controles omitidos como aprobados.

En 2.0 verificar cantidades explícitas de cajas de cuerpo y FAQ, incluidos ceros justificados; bibliografía separada. En contratos anteriores conservar su regla hasta adenda. Revisar ubicación y función, no solo cantidad. FAQ plegada si existe; urgencias siempre visibles. Sin H1, hero, firma, índice o JSON-LD duplicados. Frontmatter contra schema vigente, fechas reales; status Borrador no bloquea build.

Tabla de real/target/desviación por sección y densidad media/mediana/%>50. Revisar emparejamiento de secciones; un cambio de título no es por sí solo fallo, una función omitida sí. No partir citas/frases ni añadir subtítulos decorativos para bajar métricas. Medir voz con `python3 .agents/skills/references/scripts/tono.py <archivo>`; ≤3 muletillas/1000, sin borrar seguridad para pasar.

## 3. Fuentes, afirmaciones y procedencia

Abrir cada fuente y contrastar calidad/autoridad/aplicabilidad, autoría/año/título/identificador y afirmación exacta con pasaje. Una URL que abre o apellido en H2 no verifica el dato. Comprobar especie, muestra, grupo/individuo, asociación/causalidad, vigencia y límites de extrapolación. No usar competencia/calculadora ajena como evidencia clínica primaria.

Cada fuente asignada debe desarrollar su aporte en la sección; la bibliografía sola no cumple. No aceptar datos extraídos de memoria, marcas internas filtradas, interpretación clínica sin respaldo, experiencia doméstica usada como prueba o medicación para el lector. Contrastar política editorial vigente.

Si el error viene del brief, identificarlo y su posible propagación; encargar revisión del brief con la skill correspondiente, sin corregirlo en esta auditoría. Ante bloqueo de acceso buscar alternativa oficial, registrar lo leído y lo no comprobado; ninguna reserva oculta afirmación central no verificada.

Historia/caso: comprobar procedencia y hechos contra expediente, declaración al lector, hilo principal y cierre integrado. Guía sin caso es válida. No exigir un H2 narrativo ni inventar recuperación. Viñeta compuesta se declara; ilustración no es paciente real.

## 4. Recursos, imágenes y recorrido real

Inventariar y probar cada recurso prometido: ruta/tipo/contenido real, tarea, estado, responsable, interacción y resultado. Un 200, build o captura aislada no acreditan una descarga o procedimiento. Si la entrega es solo texto, conservar pendientes honestos y gate de publicación; no aprobar una promesa pública sin recurso.

Abrir todas las imágenes, hero y recortes incluidos; misma identidad/continuidad y edad senior comprobable a 390 px con los cinco rasgos de dirección visual, salvo excepción documentada. Anatomía y acción seguras, alts/pies fieles, razas justificadas. No marcar imagen correcta por nombre de archivo ni arreglar edad cambiando el pie.

Aplicar apoyos responsive: móvil y escritorio, claro/oscuro, contraste, teclado/foco, movimiento reducido, pausa real y no autoplay, controles cercanos, impresión con/sin JS y alternativas. Revisar texto clínico dentro de componentes aunque el contador no lo incluya. Distinguir pruebas propias, evidencia recibida y limitaciones.

Enlaces reales y pertinentes: pilar, puentes y herramientas según tarea, no cuotas. No enviar al chequeo preventivo ante una urgencia. Comprobar recursos afiliados con su guía si existen; no ablandar límites por vender.

## 5. Veredicto

Usar [formato](references/formato-informe.md) y [taxonomía](references/taxonomia-fallos.md). Publicable / Publicable con reservas / No publicable, con razón y P0/P1/P2 ubicados. Reservas solo para cuestiones no bloqueantes; falsedad, fuente central sin verificar, riesgo o prueba indispensable pendiente impiden aprobar.

Entregar tablas E01–E08, fuentes, secciones y recursos con comprobación o motivo de no aplicabilidad; qué conservar; instrucciones ordenadas y efecto cascada si nace en proceso. No editar los objetos auditados ni el inventario. Una discrepancia que refute una crítica propia se corrige explícitamente. No marcar Publicado por pruebas locales: exige verificación pública tras despliegue autorizado.
