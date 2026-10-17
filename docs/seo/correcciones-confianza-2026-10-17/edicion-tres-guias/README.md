# Edición práctica de baño, ojos/oídos y callosidades

Fecha:2026-10-17. Rama `fix/calidad-confianza-adsense`, PR120. Base de esta ampliación:1a8489a. El propietario autoriza editar y entregar las tres páginas en preview, NO fusionar ni solicitar AdSense. Publicidad definitiva sigue pendiente y no se modificó su integración.

## Qué se eliminó y qué se conservó

| Página | Eliminado o fusionado | Conservado |
|---|---|---|
| Baño | Apertura y cierre sobre doce pacientes; porcentajes/p-valores de Camps; desarrollo sobre hidratación de Lee que no estudiaba rutinas de baño; transiciones/reiteraciones; diagrama estático «ruta» que duplicaba la secuencia «espacio». | Instrucciones, pausa y retirada de champú, urgencias, no medicación para terminar, límites de productos/secador/tijeras, registros;3animaciones, mapa de decisión, todas las imágenes y destinos internos. |
| Ojos/oídos | Apertura y desarrollo estadístico de Fefer, infografía «audicion», pruebas diagnósticas comparadas de Nascimento y análisis de formulación de Moog; reiteraciones sobre límites de la higiene. Ninguno sostiene una recomendación superviviente ni se usa como fuente decorativa. | Contorno exterior suave, urgencias oculares, muestras antes de limpiar cuando se investiga otitis, seguridad timpánica, pautas individuales, no bastoncillos/boquilla sellada/presión/remedios, parada ante dolor; mapa de decisión, secuencia interactiva, imágenes y enlaces. |
| Callosidades/higromas | Relato del San Bernardo joven y desenlaces de ambos codos; series/detalles de drenajes, cirugía y ondas de choque; explicaciones repetidas de lo que no prueban los estudios y cierre narrativo. | Diferenciar sin autodiagnosticar, atención por cambios, descanso y descarga, riesgos de protectores/coaptación, no pinchar/exprimir/inyectar, antimicrobianos según evaluación, registro;3animaciones y todas las imágenes/enlaces. |

Las consultas se reservan para cambios, alarmas, tratamientos o maniobras que superan el cuidado sencillo. Las aperturas permiten limpiar suciedad superficial o retirar secreción exterior sin pedir permiso para cada acción. Las condiciones y señales de parar permanecen junto a cada maniobra, no solo al final.

La retirada de estudios no altera las correcciones históricas: no reaparecen cifras falsas ni casos inventados. Ojos/oídos conserva el historialR3; la autorización nueva sustituye la estructura/extensión y permite retirar un desarrollo estadístico innecesario. Adenda, criterios y límiteE1–E3 en [alcance-autorizado.md](alcance-autorizado.md).

## Seguridad y trazabilidad

| Advertencia | Localización actual |
|---|---|
| Baño: colapso/respiración/encías anormales; dolor/incapacidad para sostenerse | Primer apartado, cuadro «Suspende el baño…», junto a la decisión baño/aseo. |
| No forzar postura, patas, inmovilización ni productos/medicación | Preparación y aplicación; advertencia antes de pausa. |
| Parar ante tensión/agresión sin castigo; resolver champú sin forzar ni neutralizar | Paso «Si se tensa…» y párrafo «Si todavía queda champú». |
| Secado sin calor alto y aseo localizado sin tijeras ocultas ni fricción de lesión | Secado y alternativa localizada, junto a esas acciones. |
| Ojo cerrado/dolor/opacidad/cambio visual | Apertura y H3 «Cuándo dejar de limpiar». |
| Paño externo, no presión/arrancar/forzar ni mezclar envases | Lista ocular y párrafos contiguos. |
| Muestras antes de limpieza, no suspender prescripción por consejo general | H3 «Antes de limpiar, puede ser necesario tomar muestras». |
| Tímpano/producto, no boquilla encajada/presión/calentar/diluir, no bastoncillos/alcohol/peróxido | Preparación del oído y secuencia con warning contiguo. |
| Callos: no diagnóstico visual ni pinchazo; dolor/supuración/piel abierta/peor apoyo | Apertura y primer apartado; urgencias diferenciadas. |
| Protector que roza/aprieta; almohadilla circular en ulceración/reconstrucción | Apartado propio «Protectores…» con warning y citaMontoya/Tobias. |
| Antimicrobianos/pruebas según lesión y profundidad, no reiniciar por parecido | Apartado de valoración veterinaria, junto a citasMerck/ISCAID. |

Doce fuentes únicas aplicables contrastadas por el auditor, con ubicación y límites en [auditoria-edicion-e1.md](auditoria-edicion-e1.md). Las bibliografías quedan en4/4/5 entradas (una AAHA compartida entre baño y callosidades); las referencias se mantienen también junto a sus recomendaciones. Las retiradas siguen trazables en baseline e informes históricos. Un bloqueo de una ruta no se interpreta como falsedad: el auditor leyó la variante oficial accesible de Merck higroma y registró la limitación del canal.

## Recursos mantenidos

| Recurso | Qué explica / ubicación | Estado |
|---|---|---|
| Baño: decisión | Aseo localizado, baño tolerable o parar / primerapartado | Conservado. |
| Baño: espacio, pausa y zonas | Acceso; retirada de presión; limpieza externa / preparación, procedimiento y alternativa | Conservados; controles manuales, reproducción/pausa, teclado, reduced-motion e impresión probados localmente. |
| Baño: hero, secado y pata | Mismo dogo senior, escenas ilustrativas junto al cuidado | Conservadas, cargadas y decodificadas. Pie de animación actualizado para no aludir a estudio retirado. |
| Ojos: decisión y secuencia | Distinguir alarma/cuidado; limpieza indicada | Conservados; sus tres anclas apuntan a secciones reales y secuencia operativa. |
| Ojos: hero, revisión y masaje, recorte cocker | Contorno/observación exterior y masaje orientativo | Conservados, incluidas variantes responsive. Pie de secuencia aclaraIA sin aludir a estudio retirado. |
| Callos: presión, acolchado y seguimiento | Apoyo y registro; no tratamiento garantizado | Conservados; botones de reproducción/pausa y movimiento reducido probados. |
| Callos: hero, infografía, acceso y observación | Distinguir conceptos, llegar a cama y observar sin manipular | Conservados; ampliación de infografía funcional. Alt del hero ya no remite a un caso retirado. |

## Pruebas locales

- Build Astro completo y generación de32documentos: correcto.
- `astro check`:0errores,0advertencias;60sugerencias.
- `npm test`:107/107; pruebasMJS:77/77. Resultados finales en `evidencias/test.log` y `agent-tests.log`.
- Guard semántico de proyección:32documentos, PASS.
- Inventario estático: cero imágenes MDX/hero perdidas; cero destinos internos previos perdidos.7/5/7 destinos editoriales únicos, más enlace de ampliación de imagen en callos. Existencia de todos los destinos y archivos comprobada.
- Chromium local:18recorridos (390/820/1366px × claro/oscuro ×3páginas), imágenes/variantes cargadas, anclas, sin desbordamiento horizontal, controles, teclado, reduced-motion e impresión de pasos.3recorridos adicionales sinJS: instrucciones disponibles. Terceros bloqueados: no es prueba de publicidad/consentimiento.
- Un primer intento de prueba leyó el estado de reduced-motion antes de que llegara el evento del navegador; se corrigió el oráculo para esperar la propiedaddisabled. La revisión independiente de evidencias detectó además que el selector de baño omitía sus animaciones. Se corrigió al selector real y se añadieron conteos obligatorios de3/1/3 recursos y12/4 paneles sinJS. Los errores del oráculo se corrigieron en la prueba. Con el selector correcto se detectó un defecto real: los pasos inactivos del baño no se imprimían. Se sustituyó el estado `hidden` por `data-active` con CSS local para pantalla/impresión, conservando todos los pasos sin JavaScript. Se repitió la matriz completa antes de usarla como cierre.
- Capturas locales inspeccionadas, logs e inventario reproducibles en `evidencias/`.

[Tabla porH2 y densidad](metricas.md): palabras de fuenteMDX, cuerpo sinfrontmatter/imports, incluidos FAQ/atributos y sin el texto adicional de componentes. Misma operación antes/después: baño6367→1691, ojos6201→1558, callos6623→1443. No es una medición de palabras visiblesHTML ni una condiciónAdSense. Los targets históricos están sustituidos por la autorización de esta edición; no se simula cumplirlos.

## Auditoría y publicación

Revisión independienteE1: publicable editorialmente en hashes registrados, sin bloqueantes clínicos/editoriales; la compuerta técnica de impresión no pasó. [E2 técnica](auditoria-tecnica-e2.md) aprueba el parche de impresión y sus seis casos independientes sobre las tres variantes, con y sin JavaScript. No se atribuye al auditor la ejecución de la matriz completa del corrector. MáximoE3 si aparecen defectos. La adenda no certifica exactitud clínica universal ni una revisión veterinaria profesional.

El push actualiza solo la rama delPR120 y genera preview mediante Workers Builds. Las tres URL son:

- https://fix-calidad-confianza-adsense-cuidatuperroviejo.g1721m.workers.dev/higiene-hogar-perros-senior/banar-perro-viejo-movilidad-reducida
- https://fix-calidad-confianza-adsense-cuidatuperroviejo.g1721m.workers.dev/higiene-hogar-perros-senior/limpieza-ojos-oidos-perros-ancianos
- https://fix-calidad-confianza-adsense-cuidatuperroviejo.g1721m.workers.dev/higiene-hogar-perros-senior/callosidades-higromas-codos-perros-senior

La verificación posterior al build de preview se registra en elPR con elcommit y recibo de despliegue, sin confundir esta compilación local con páginas públicas. Producción/main no se modifican; quedan pendientes de autorización de fusión y de las comprobaciones públicas tras esa publicación. Configuración publicitaria final y solicitudAdSense permanecen pendientes.
