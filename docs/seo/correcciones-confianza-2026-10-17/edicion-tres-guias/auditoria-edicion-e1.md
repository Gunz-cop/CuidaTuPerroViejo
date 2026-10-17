# Auditoría independiente de la edición autorizada E1

Fecha: 2026-10-17. Auditor independiente del corrector; no se han editado artículos, componentes, políticas ni briefs. Rama `fix/calidad-confianza-adsense`, base PR120 `1a8489a`. Contrato vigente: `alcance-autorizado.md` y última autorización expresa del propietario. Se leyeron AGENTS, skill de auditoría de artículos, control editorial común, política editorial, propuestas e informes históricos.

## Veredicto

**Publicable editorialmente; pendiente de cerrar las pruebas técnicas y de preview del coordinador.** La nueva estructura permite realizar el cuidado sencillo sin exigir consulta por cada acción, conserva límites clínicos y cita las recomendaciones supervivientes. Este informe no acredita despliegue ni autoriza fusión o solicitud AdSense.

E1 revisa una reestructuración nueva y autorizada; no es una cuarta ronda clínica ni una modificación de la aprobación histórica R3 de ojos/oídos. Máximo tres iteraciones E1/E2/E3 si aparecen defectos nuevos; no se reinician las auditorías anteriores para corregir sus fallos.

## Versión auditada

SHA256 de los archivos finales leídos y comprobados:

| Archivo | SHA256 |
|---|---|
| baño MDX | `8ac149ac64b12e2f7c65105b5175357c8abdd71f130853fb50a8ae621951e71b` |
| ojos/oídos MDX | `0056d6dbb80e09029fbafa70675382c4f3400b590dfe652cb9719e6ea203a75d` |
| callosidades MDX | `d2dee240bac15a50e65b10bb64f56d6716f5cf03f80d1e584cf764dc4c1c8295` |
| BanoAnimation | `e5e0a9c38cc3f88c5060807bec266e14e3e346fc04eb3c2a380d066a36a163c6` |
| OjosOidosVisual | `2ff0701c8b1ec239ae51e3a2ad4bc8c8ddb3a94df7e4d7e3f02adb5781144c61` |

## Hallazgos

### P0 / P1

Ninguno detectado en la lectura editorial/clínica, contraste de fuentes y comparación estática de recursos. No se reemplazan las pruebas de navegador por este dictamen.

### P2 resuelto durante E1

El alt del hero de callosidades todavía decía «del caso publicado» después de retirar el relato. El corrector sustituyó ese remanente por «no es una fotografía clínica». También corrigió el pie de OjosOidosVisual que aludía a «un paciente del estudio». Inspeccionadas las líneas finales (hero línea8, visual línea72) y el pie de baño línea102. No cambiaron cifras, advertencias ni dibujos. Queda cerrado en los hashes anteriores, sin corrección del auditor.

## Lo que sí funciona: controles clínicos conservados

- **Baño:** limpieza localizada para suciedad superficial/piel intacta; acceso y salida estables; no forzar extremidades, postura ni sujeción; parar ante dolor/angustia/debilidad; urgencias respiratorias/colapso/encías anormales; resolver el champú sin forzar ni neutralizar; no improvisar sedación o analgesia; no calor alto, tijeras ocultas bajo nudos ni productos mezclados. Las precauciones están junto a aplicación, pausa, secado y aseo localizado, no relegadas al final.
- **Ojos/oídos:** cuidado ocular exterior sin presión ni costras arrancadas, sin gotas improvisadas; urgencia por ojo doloroso/cerrado/cambio visual; material limpio separado; oído sano sin rutina por edad; muestras antes de limpieza al investigar otitis y no suspensión de prescripciones por ese consejo; integridad timpánica, sin boquilla sellada ni presión; no bastoncillos ni alcohol/peróxido/remedios; parada ante dolor; no pruebas auditivas con ruido fuerte. Eliminar Fefer/Moog/Nascimento elimina desarrollos y cifras que ya no son necesarios, sin restaurar el error estadístico de Fefer ni prometer prevención de sordera/cognición.
- **Callosidades:** no diagnosticar por fotografía/color/consistencia, no pinchar/exprimir, valoración de nuevos bultos y señales de herida/dolor/supuración, urgencia por dolor intenso/mal estado, descanso accesible y piel observable; riesgos de ajuste y almohadillas circulares en ulceración/reconstrucción; decisiones clínicas de muestras y antimicrobianos; sin tasas o plazos de curación y sin prometer que una cama resuelva la lesión.

La retirada de casos y cifras no elimina información necesaria para esas decisiones. No quedan pacientes, conversaciones o recuperaciones sin procedencia; ahora son tres guías sin caso. Las aperturas permiten limpiar una pata, retirar una legaña externa o mejorar una cama sin convertir esas acciones sencillas en consultas obligatorias. La valoración se reserva para síntomas, dudas de seguridad, cambios o tratamientos que la requieren.

## Fuentes → afirmación → ubicación y comprobación

Lectura independiente del 17/10/2026 mediante lector web público. Confirmación temática e identidad separadas del contenido concreto. Títulos completos y URL profundas permanecen en cada MDX. Se reutilizó como contexto, sin atribuir una nueva ejecución, la trazabilidad histórica de `docs/contenido/banar-perro-viejo-movilidad-reducida/auditoria-brief.md`, `docs/contenido/limpieza-ojos-oidos-perros-ancianos/auditoria-editorial-r3.md` y `docs/contenido/higromas/auditoria-articulo-r1.md`.

| Fuente | Afirmación conservada y ubicación del artículo | Pasaje comprobado / límite |
|---|---|---|
| AAHA, Senior Care Guidelines, Pain Management (2023) | Baño: parar y adaptar dolor/función/entorno. Callos: comunicar cambios de apoyo y descanso. | Apartado Pain Management: reconocimiento de dolor, movimiento y adaptación ambiental (texto público líneas205–211). No valida un protocolo de baño. |
| Rayburn, Everyday Handling for Veterinary Patients (2022), PDF siete páginas | Baño: manejo suave en «Acompaña sin inmovilizar». | Identidad/autora en p1; contacto gradual, menor restricción y reevaluación en p2–3. Docencia clínica, no ensayo doméstico. |
| Nakonechny et al., DOI10.3389/fvets.2025.1634970 (2025, versión corregida2026) | Baño: pausa como adaptación doméstica de manejo clínico. | Introducción/principios de manejo y diseño de encuesta. No se le atribuyen efectos experimentales del baño ni causalidad. La secuencia doméstica aparece expresamente como adaptación, no tratamiento de agresividad. |
| Fortney, dvm360 Proceedings (2010) | Baño: separar piel seca de enfermedades que requieren manejo propio. | Texto público líneas103–116: cuidado de sequedad, menor baño en ese contexto y problemas cutáneos diferentes. No se trasladan dosis ni regímenes farmacológicos antiguos. |
| Cornell / Aly Cohen, How to Clean Your Dog’s Ears (actualizada2025) | Ojos/oídos: indicación y pasos, limpieza excesiva, presión, productos y parada ante dolor. | «How do I clean…», «Did you know?», tipo/frecuencia. Confirma masaje/sacudida/retirada, no bastoncillos y riesgo de sellar con boquilla. No se transforma su frecuencia orientativa en universal. |
| Merck, Otitis Externa in Animals (Hoff/Carnevale, revisión2025, actualización2026) | Ojos/oídos: citología antes de limpieza, exploración, tímpano y ototoxicidad. | Diagnóstico: tomar muestras antes de limpiar (153); tratamiento: tímpano y efectos ototóxicos (227–233). No se trasladan pautas farmacológicas. |
| Cornell, Keratoconjunctivitis sicca in dogs | Ojos/oídos: secreción recurrente no identifica por sí sola causa; exploración y pruebas. | Clinical signs / Diagnosis (110–124). No se convierte secreción espesa en diagnóstico casero. |
| VCA/LifeLearn, KCS or Dry Eye in Dogs (Barnes/Hunter/Ward,2023) | Ojos/oídos: paño húmedo templado en el cuidado exterior. | «How is dry eye treated?» (428). Es cuidado de KCS: la guía doméstica limita la maniobra al exterior y no extrapola frecuencia, estimulación lagrimal o curación a cualquier perro. |
| Merck, Hygroma in Dogs (Moriello/Winkler,2025) | Callos: definición, repetición del trauma, diagnóstico diferencial y pruebas para lesiones atípicas. | Definición/patogenia32–43; diferencial/pruebas84–94. La URL canónica produjo error del lector; la misma página oficial con `?autoredirectid=28724` permitió lectura completa. Limitación de acceso, no referencia falsa. |
| Loeffler et al., ISCAID, DOI10.1111/vde.13342 (2025) | Callos: distinguir callo no infectado de piodermia; citología y tratamiento según profundidad/contexto. | Tabla de callus pyoderma1043 y citología/cultivo692–785. No se publican tratamientos empíricos, dosis ni recetas. |
| Montoya/Tobias, Coaptation Devices for Elbow Hygromas (2021; título web actual Devices for Treating Elbow Hygromas in Canine Patients) | Callos: descarga, ajuste y cautela «donut» en piel ulcerada/reconstruida. | Pasajes45–47: ajuste, movilidad, perfusión y riesgo de presión circunferencial. La guía omite el tutorial de fabricación; no convierte cualquier protector en seguro. |
| AAHA, Nonpharmacologic Modalities for Pain Management (2022) | Callos: entorno/peso; no dieta restrictiva automática por callo. | Weight Optimization y Environmental Modifications (186–217). Sin promesa preventiva universal ni proporciones dietéticas. |

Las fuentes sobreviven junto a sus recomendaciones y en un listado final breve: cuatro para baño, cuatro para ojos/oídos, cinco para callos (AAHA senior compartida). No se desplazaron al cierre los relatos retirados ni una discusión extensa de límites. Ninguna cifra clínica nueva que exija un respaldo diferente.

## Métricas y utilidad por sección

Ejecutado por el auditor: script oficial `metricas.mjs` para los tres slugs; salida íntegra en `evidencias/metricas-oficiales-auditor.txt`. Sus 31 bloqueos proceden del contrato antiguo, el emparejamiento posicional de H2, fuentes retiradas expresamente, cuotas de AlertBox y parser de higromas; no son una compuerta válida para la adenda autorizada. No se falsea APTO mecánico ni se cambia un mínimo retrospectivamente. Fechas de publicación distintas de actualización son correctas.

| Guía | Palabras script (no DOM) | Párrafos / media / mediana / máximo | H2/H3 | Target actual |
|---|---:|---|---|---|
| Baño |1691|26 /38 /37 /50|5/7|No aplica: extensión por utilidad.|
| Ojos/oídos |1558|19 /36 /36 /54|5/6|No aplica: extensión por utilidad.|
| Callosidades |1443|23 /36 /40 /51|4/5|No aplica: extensión por utilidad.|

Cada H2 tiene función distinta: baño decide pausa, prepara, ejecuta, ofrece alternativa y registra; ojos/oídos separa urgencia, ojo, decisión ótica, técnica ótica y registro; callos distingue, adapta descanso, alerta de protectores y ordena valoración/seguimiento. No hace falta recuperar cifras, relatos ni cuotas de FAQ para completar esas funciones. Los límites más repetidos son señales de parada junto a acciones distintas, repetición justificada por seguridad.

## Recursos y enlaces

Comprobación estática independiente: cero enlaces internos editoriales perdidos respecto a `baseline.json` y cero imágenes MDX/hero perdidas o ausentes en disco. Se examinó contacto visual de los15 originales disponibles (incluye variantes antiguas no utilizadas); evidencia `contacto-visual-auditor.jpg`. El dogo, cocker y San Bernardo conservan continuidad, pies explicativos y contexto ilustrativo, sin lesiones presentadas como prueba clínica.

| Recurso | Ruta/ubicación | Comprobación de esta auditoría | Estado |
|---|---|---|---|
| Baño, hero+secado+aseo y recorte dogo | `/images/blog/banar-perro-viejo-movilidad-reducida/` | Archivos, contenido visual y alt;3 BanoAnimation+decisión en fuente | Conservados. Interacción/navegador del coordinador pendiente al dictamen. |
| Ojos, hero+revisión+masaje+recorte cocker | `/images/blog/limpieza-ojos-oidos-perros-ancianos/` | Archivos,srcset,contenido y alt; decisión+secuencia conservadas | Audición se retira justificadamente, sin tocar sus cifras en componente histórico. |
| Anclas de decisión ojos | `#cuándo-dejar-de-limpiar`, `#antes-de-limpiar-puede-ser-necesario-tomar-muestras`, `#cómo-limpiar-los-oídos-cuando-está-indicado` | Correspondencia literal de H3/H2 en MDX | En destino lógico. Validación DOM/navegación pendiente coordinador. |
| Callos, hero+infografía+acceso+observación | `/images/blog/callosidades-higromas-codos-perros-senior/` | Archivos,visual,alt y3 HigromaAnimation | Conservados, link ampliar infografía presente. |
| Enlaces internos |7 baño,5 ojos,7 callos destinos únicos editoriales | Comparación independiente contra baseline | Sin pérdidas. HTTP/DOM de preview pendiente coordinador. |
| Registros HTML | Tabla de aseo,tabla ojo/oído,tabla codos | Lectura MDX | Aporte práctico sin promesa de PDF o vídeo. |

## Qué corregir / cerrar, en orden

No se requieren cambios editoriales bloqueantes en estos hashes. El coordinador debe cerrar y conservar evidencia de build/check, recursos HTTP y navegación real, modo móvil/escritorio claro/oscuro, controles de animación, teclado, reduced motion y preview de las tres rutas. No atribuyo esas ejecuciones como propias ni doy por verificadas imágenes solo porque compile.

Esta aprobación editorial no declara preparado el sitio entero para AdSense: publicidad definitiva permanece pendiente por decisión del propietario. Producción y main no se modifican en esta tarea.

## Contraste de la evidencia técnica del coordinador — E1

Se inspeccionaron registros de build (completo), check (0 errores/0 warnings,60hints), pruebas MJS (77/77), semántica (32PASS), navegador-local.json y su script, y captura móvil oscura de ojos/oídos. Son ejecuciones del coordinador, no del auditor.

**Pendiente técnico detectado al contrastar el oráculo:** el script inicial selecciona `[data-bano-animation]`, mientras BanoAnimation usa `[data-bano-sequence]`. Los casos de baño muestran por ello `interactions:[]`: el resultado PASS de18recorridos no prueba sus tres animaciones ni sus paneles sin JavaScript. Se notificó al corrector para corregir el selector y exigir conteos no vacíos (3baño/1ojos/3higromas) antes de repetir. No es un defecto de contenido ni exige cambiar producto o abrir otra ronda editorial. La compuerta de interacción de baño permanece pendiente hasta contrastar el registro nuevo.
