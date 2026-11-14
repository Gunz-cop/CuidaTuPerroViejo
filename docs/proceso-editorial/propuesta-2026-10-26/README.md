# Auditoría y rediseño del proceso editorial asistido por IA

**Fecha:** 2026-10-26 · **Estado:** propuesta. No modifica ninguna skill, plantilla ni archivo del proceso vigente. Nada de esta carpeta está enlazado desde `AGENTS.md`.

**Material examinado:** las skills `generar-briefing-contenido`, `auditar-briefing-contenido`, `redactar-articulo-blog` y `auditar-articulo-blog` con sus formatos de informe; `calidad-editorial-adsense.md`; el expediente completo de leishmaniosis (`docs/contenido/leishmaniosis-perros-mayores/`, el brief y los 22 commits del PR #146); los seis informes de brief de miedo a los petardos y las correcciones R1 a R6; el reinicio de alimentación sin dientes. También se leyeron dos fichas técnicas oficiales en CIMAVet, la de un spot-on con permetrina (3212 ESP) y la de un collar con deltametrina (1326 ESP).

**Archivos de esta carpeta:**

| Archivo | Contenido |
|---|---|
| `README.md` | Este informe: entregables 1 a 6 y 8 a 10 |
| `plantillas.md` | Entregable 7: plantillas e instrucciones para los agentes |
| `validar_registro.py` | Prototipo que valida el registro de hallazgos y calcula el veredicto |
| `pruebas/*.yaml`, `pruebas/resultado.txt` | Registros de leishmaniosis y petardos, dos controles negativos y la salida real del validador |

---

## Resumen

1. **La hipótesis 1 se confirma en parte, con un matiz.** Los auditores sí detectan omisiones, pero solo dentro del perímetro de las fuentes y del contrato. En el artículo publicado de leishmaniosis lo comprobé con las fichas oficiales: recomienda collares con deltametrina y pipetas con permetrina, pero no recoge las precauciones de esas fichas para niños ni para el medio acuático. El aviso para gatos solo nombra la permetrina. Lo pasaron por alto cinco auditorías, dos sesiones de redacción y dos modelos distintos (Codex redactó y Claude auditó). Ninguna ficha de esos productos, salvo la de la permetrina, estaba entre las fuentes.
2. **La hipótesis 2 se confirma en petardos, no en leishmaniosis.** En petardos hubo seis rondas de brief. Los P1 bajaron de 6 a 0, pero los hallazgos menores siguieron en 9 → 12 → 9 → 19 → 20 → 17. Los identificadores cambiaron en cada ronda y una corrección introdujo un dato inventado («el último diciembre»), que la ronda siguiente no detectó. En leishmaniosis, el texto pasó en dos rondas de brief y dos de artículo. El tiempo se fue en la producción visual: unas 37 generaciones de imagen después de la R3.
3. **El número de rondas que mencionas no coincide con el expediente.** El repositorio registra cinco auditorías formales de leishmaniosis y dos revisiones visuales informales, en unas 26 horas de commits. Las «cinco o seis auditorías de brief» coinciden con petardos (seis). Si hubo más rondas fuera del repositorio, eso también es un hallazgo: `calidad-editorial-adsense.md` §6 prohíbe las «rondas ocultas».
4. **La propuesta no añade agentes ni etapas.** Hace seis cambios dentro de los roles actuales:
   - un mapa de riesgos obligatorio en el brief;
   - una regla de fichas oficiales para todo producto que se nombre;
   - un registro único de hallazgos con identificadores estables;
   - un contrato de severidad con veredicto calculado;
   - rondas 2 y 3 que auditan solo los cambios;
   - un informe de escalamiento con canal de disputa.
5. **Ejecuté las pruebas de regresión que se pueden ejecutar.** El validador rechaza una omisión declarada sobre un aviso que sí existe y rechaza una preferencia de estilo marcada como bloqueante. Con el registro de petardos, se habría detenido en R3 y aprobado en R5. Las demás pruebas se demuestran en la sección 8, sin declararlas superadas por ejecución.

---

## 1. Diagnóstico del flujo actual

### 1.1 Hechos observados (con evidencia)

| # | Hecho | Evidencia |
|---|---|---|
| H1 | **Omisión de seguridad fuera del perímetro del contrato.** El artículo recomienda collares con deltametrina (l. 245) y pipetas con permetrina. Faltan tres precauciones de las fichas: «No usar en gatos» para la deltametrina, niños y contacto con el perro tratado, y cursos de agua. El aviso de gatos (l. 304-310) solo nombra la permetrina, aunque la l. 305 prohíbe en general «aplicar al gato un producto para perros» | Fichas CIMAVet 1326 ESP §3.3 y §3.5 y 3212 ESP §3.5, leídas en PDF. `grep` de «deltametr», «niñ» y «acuát» en los cinco informes de auditoría: 0 resultados sobre seguridad. El brief §9.6 solo pedía «gatos y permetrina»; S9 es la única ficha de producto |
| H2 | **Sí se detectan omisiones dentro del perímetro.** Ejemplos: la zona endémica sin respuesta (brief R1, P2-11), los inmunomoduladores a criterio clínico (artículo R1, P2-5) y la baja prevalencia canina en Fuenlabrada (artículo R1, P2-2) | `auditoria-brief-r1.md` l. 87; `auditoria-articulo-r1.md` l. 72 y 78 |
| H3 | **Los hallazgos menores no convergen.** En petardos, P1 por ronda: 6, 4, 1, 1, 0, 0. Hallazgos menores por ronda: 9, 12, 9, 19 (10 P2 + 9 P3), 20 (6 + 14) y 17 (2 + 15). R6 discute la focal de la cámara (50 mm frente a 28-35 mm) y la bufanda del prompt | `auditoria-brief-r4.md` l. 147; veredictos de R5 y R6; R6 P3-6 |
| H4 | **Identificadores inestables.** «N-1» designa un hallazgo distinto en R3, R4, R5 y R6. P1-1 aparece en R1 y R2 con contenidos distintos. R4 usa el prefijo «F-». No hay forma mecánica de saber si un hallazgo es nuevo, recurrente o una regresión | Extracción de identificadores por ronda (`grep -o`) sobre los seis informes |
| H5 | **Una corrección introdujo un dato inventado y la ronda siguiente no lo vio.** «El último diciembre» entra en `correccion-r2.md` (l. 15-16). R3 audita esa versión y no lo señala. R4 lo marca P1 (F-1) porque el archivo de testimonios dice «el año pasado (2025)» | `correccion-r2.md` l. 15-16; `auditoria-brief-r4.md` l. 51-54 |
| H6 | **Se reabren hallazgos rechazados a propósito sin evidencia nueva.** R6 registra que dos P3 de R5 se dejaron sin aplicar a propósito («estiramiento de H3», «Depende»). Aun así, vuelve a abrir el primero como P3-12 y P3-13 | `auditoria-brief-r6.md`, tabla «R5, P3 por P3», filas 13-14 |
| H7 | **No hay un vocabulario de veredicto común.** Las skills definen tres palabras por formato. Los informes usan al menos siete: «APTO con reservas», «Válido con reservas», «APTO para la parte textual», «APTO EDITORIAL PROVISIONAL», «APTO / Publicable», «NO APTO», «Publicable con reservas». «Con reservas» aparece a veces como bloqueante (brief de leishmaniosis R1: «Redacción bloqueada»; petardos R2: «no está listo… hasta cerrar 4 P1») y a veces no (petardos R5 y R6) | Veredictos citados de cada informe |
| H8 | **Las severidades no coinciden entre documentos.** En `auditar-articulo-blog`, un P1 es «lo nota un lector atento», sin decir si bloquea. `calidad-editorial-adsense.md` §6 tiene su propia lista «Bloquean:». Los informes de petardos crean un P3 que ninguna skill define. La R3 visual de leishmaniosis marca P0 que un recorte parezca joven, la misma severidad que un dato inventado | `formato-informe.md` de las dos skills; `auditoria-articulo-r3-visual.md` l. 36 |
| H9 | **Un juicio subjetivo bloqueó como P0.** El auditor de la R3 visual reconoce que su P0 es «mi lectura… no una medición» | `auditoria-articulo-r3-visual.md` l. 173 |
| H10 | **Hubo texto con contenido clínico que nadie auditó tras la última ronda.** Después de la R3 cambiaron 32 líneas de `LeishmaniosisRevision.astro` (pasos con señales clínicas) y el pie de la consulta. Lo aceptó el propietario con una revisión visual de Claude, sin auditoría | `git diff --stat 8806f61 381b7ac`; cuerpo del PR #146 |
| H11 | **En leishmaniosis, el coste estuvo en lo visual, no en el texto.** Commits del brief R0 al merge: 2026-10-24 13:14 → 2026-10-25 15:24 UTC (≈26 h). El texto quedó cerrado a las 22:50 del primer día. Después llegaron la R3 visual, la v3 (8 recortes y 15 consultas generados) y la v4 (7 candidatos por recurso) | Mensajes de los commits del PR #146 |
| H12 | **El límite de tres rondas se escaló, pero el escalamiento produjo más rondas en vez de una decisión acotada.** El propietario autorizó R4 a R6 en petardos. R5 ya no tenía P0 ni P1 y aun así hubo R6 | `correccion-r3.md` l. 3; veredictos de R5 y R6 |
| H13 | **Una aprobación de la IA no equivale a la del propietario.** En alimentación, el artículo v1 obtuvo «APTO / Publicable» y el propietario lo rechazó entero, lo que obligó a reiniciar | `reinicio-v2/encargo-y-rondas.md` |
| H14 | **El auditor también se equivoca y no hay un canal para discutirlo.** En petardos R5, el corrector anotó en la cabecera que el auditor citaba el art. 115 en lugar del 114.1.B | Cabecera de `auditoria-brief-r5.md` |
| H15 | **Ya hay buenas prácticas que conviene conservar.** Entre ellas: R2 «solo bloqueantes» con la tabla de estado de los P1 anteriores (leishmaniosis), hash de cada versión, fuentes abiertas y citadas por página, «Lo que sí funciona», marcas honestas de verificación parcial y una adenda de contrato por decisión del propietario (brief l. 395) | Informes R2 de brief y de artículo de leishmaniosis |

### 1.2 Hipótesis no demostradas (riesgos)

| Riesgo | Por qué no está demostrado | Indicio |
|---|---|---|
| **Sesgo compartido entre redactor y auditor** | En leishmaniosis, el brief, su corrección y el registro de las auditorías comparten la misma `Claude-Session` en los commits. No se puede saber si la auditoría corrió en un contexto aparte. En petardos, las R2 a R6 usan scratchpads de una sola sesión (`eca6bf97…/auditor2` a `auditor6`): eran contextos nuevos lanzados por un mismo orquestador. | H1 muestra que la diversidad de modelos no ayudó, porque el punto ciego venía del contrato y no del modelo. La independencia de contexto es necesaria, pero no basta |
| **Las fuentes envejecen** | LeishVet 2011 y ESCCAP 2012 sostienen la prevención. La guía AEMPS/MAPA de 2026 cubre la parte clínica. No comprobé si hay actualizaciones de LeishVet o ESCCAP, y el brief no dice haberlo buscado | El contrato propuesto exige declarar esa búsqueda |
| **El conteo de palabras genera relleno** | Hubo relleno real (R1 de artículo, 363 palabras), corregido en una ronda. No sé si nace del target | `auditoria-articulo-r1.md` P1-1 |

### 1.3 Respuesta punto por punto a lo que pedías identificar

| Pregunta | Respuesta |
|---|---|
| ¿Hay auditorías repetidas sobre problemas ya resueltos? | Sí, en petardos (H6). En leishmaniosis no: sus R2 verificaron por identificador |
| ¿Hay criterios de aceptación ambiguos? | Sí: H7 y H8. La ambigüedad está en el veredicto y la severidad, no en los criterios científicos |
| ¿Hay hallazgos subjetivos presentados como bloqueantes? | Sí: H9 y la presión de los P2 y P3 «que conviene cerrar» (H3) |
| ¿Hay correcciones que generan regresiones? | Sí: H5, la regresión confirmada. H10 es contenido nuevo sin auditar, no una regresión demostrada |
| ¿Hay omisiones clínicas que el auditor no busca? | Sí: H1. El auditor busca lo que el contrato enumera |
| ¿Hay fuentes consultadas de forma insuficiente? | Sí, en un punto concreto: falta la ficha de la deltametrina pese a recomendar el collar (H1). Lo demás está bien tratado: Miranda (solo el resumen) y la EMA (solo la página) están declaradas |
| ¿Se distinguen los defectos del brief de los de redacción? | Las skills ya piden comprobar si un fallo nace en el brief. Lo que falta es un procedimiento para corregir el brief durante la redacción. En la práctica se resolvió con una adenda del propietario (H15), sin verificar su impacto en el texto |
| ¿Hay riesgo de sesgo compartido? | Es una hipótesis: ver 1.2 |

---

## 2. Arquitectura editorial propuesta

Se mantienen los mismos actores: generador, auditor de brief, redactor, auditor de artículo, corrector y propietario. Ninguno es nuevo.

```
Brief (generador) ─► Auditoría de brief R1 completa ─► [corrector] ─► R2 delta ─► R3 delta ─► escalamiento
      │                     │
      │  + Mapa de riesgos   │  + Pasada adversarial (misma sesión del auditor)
      ▼                     ▼
Registro de hallazgos único por artículo (IDs estables, estados, historial)  ◄── todos escriben aquí
      ▲                     ▲
Redacción ─► Auditoría de artículo R1 completa ─► [corrector] ─► R2 delta ─► R3 delta ─► escalamiento
      │
      └─ Si aparece un defecto del brief: Adenda de contrato (decide el propietario, verificación acotada)

Visuales: serie propia con su contador (no comparte rondas con el texto clínico)
Puerta final: el propietario firma la publicación con la tabla de riesgos a la vista. La IA no certifica.
```

| Cambio | Problema que ataca | Coste | Por qué no es una etapa nueva |
|---|---|---|---|
| **C1. Mapa de riesgos en el brief** (8 lentes con respuesta específica o «no aplica porque…») | H1 | ≈30-45 min de investigación más en el brief | Es una sección del brief que ya existe en espíritu (§9.6 no negociables), solo que derivada de escenarios y no de la memoria del generador |
| **C2. Regla de fichas** (cada producto, fármaco o clase nombrada aporta las secciones §3.3/§3.5 de su ficha oficial) | H1 | 10-15 min por producto | Es una fuente más, no una etapa |
| **C3. Registro único de hallazgos** (YAML, IDs `AAA-F-NNN`, estados) | H3 a H6 | Los informes se acortan | Sustituye la tabla de hallazgos de cada informe |
| **C4. Contrato de severidad con veredicto calculado** (P0/P1/P2, cinco campos para bloquear) | H7 a H9 | Ninguno | Sustituye definiciones contradictorias |
| **C5. Rondas delta** (R2/R3 = cambios y regresiones, más un barrido acotado a P0) | H3, H5, H6 | Reduce el tiempo de R2/R3 | Cambia el alcance de rondas que ya existen |
| **C6. Escalamiento con decisión acotada y canal de disputa** | H12, H14 | Una página | Sustituye la «cuarta ronda» |
| **C7. Serie visual separada y puerta final firmada** | H9, H10, H11, H13 | Ninguno | Formaliza lo que ya pasa |

**Pasada adversarial.** No es un agente nuevo. Es la última parte de la R1 de cada auditor: intenta añadir filas al mapa de riesgos y plantea las cinco preguntas del encargo (sección 3.3). Usar otro modelo para esta pasada es opcional. H1 demuestra que el punto ciego venía del perímetro y no del modelo: lo que lo corrige es el método (C1 y C2).

---

## 3. Contrato de calidad del brief

### 3.1 Entrada (lo que el generador debe tener antes de empezar)

| Campo | Requisito comprobable |
|---|---|
| Título, keyword y slug | Proporcionados; canibalización comprobada contra `INVENTARIO_CONTENIDO.md` |
| Público e intención | Quién lee (tutor de perro mayor, país), qué busca (informarse, decidir, actuar ya) y en qué estado (asustado, con diagnóstico reciente, preventivo) |
| Alcance clínico | Qué entra (p. ej., «infección, enfermedad, pruebas, prevención») y qué queda fuera de forma explícita (p. ej., «pautas de fármacos, gatos como pacientes») |
| Alcance geográfico | País o región; qué fuentes nacionales se esperan |
| Nivel de riesgo del tema | A: informativo (dieta, enriquecimiento). B: síntomas o decisiones de consulta. C: fármacos, tóxicos, urgencias o enfermedades graves. Leishmaniosis es C. Petardos es B, porque aparecen fármacos y la decisión de medicar queda en la consulta |
| Material narrativo | Experiencia propia con procedencia, caso publicado, viñeta o guía sin caso (regla vigente) |

### 3.2 Salida (secciones nuevas o reforzadas del brief)

1. **Preguntas fundamentales** (5-8): las que el lector necesita resolver. Cada una se asigna a un H2. Una pregunta sin H2, o un H2 sin pregunta, es un defecto.
2. **Matriz de trazabilidad** (abajo): sustituye a las tres tablas que hoy se desincronizan. Ese fue el P1 de petardos R1: «las tres tablas de trazabilidad no coinciden».
3. **Registro de fuentes** (el vigente) con tres columnas nuevas:
   - **actualidad**: fecha, y si se buscó una versión más reciente;
   - **aplicabilidad**: especie, país, población y edad;
   - **fuerza**: guía oficial, consenso, cohorte, serie, caso, nota de prensa o ficha técnica.
4. **Mapa de riesgos** (C1): una fila por riesgo, construida con las ocho lentes de `plantillas.md` §2. Cada lente se responde con filas concretas o con «no aplica porque [razón específica del tema]». Un «no aplica» sin razón específica es defecto. Ahí está el freno a las respuestas genéricas: «no aplica porque es un artículo informativo» no vale; «no aplica porque el artículo no nombra ningún producto» sí, y es comprobable.
5. **Fichas de producto** (C2): por cada producto, fármaco o clase que el artículo vaya a nombrar, la ficha oficial (CIMAVet, EMA o equivalente) con las contraindicaciones (§3.3) y las precauciones para animales, personas y medio ambiente (§3.5) extraídas en una tabla.
6. **Decisiones que requieren criterio veterinario humano**: lista corta de lo que la IA no debe resolver. Ejemplos: «cuándo un perro con proteinuria debe dejar de usar X» o «si recomendar la vacuna a un perro de 12 años». El brief dice cómo se trata cada una en el texto: se remite a la clínica, se excluye o se consulta a un veterinario antes de publicar.
7. **Criterios de aceptación del brief** (3.4).

### 3.3 Matriz de trazabilidad (afirmación → fuente → riesgo → sección)

| ID | Afirmación clave (paráfrasis con la fuerza permitida) | Fuente y localización | Fuerza y límite | Riesgo vinculado | Sección | Cómo se comprueba en el artículo |
|---|---|---|---|---|---|---|
| A-01 | Los perros tratados **pueden** seguir infectados («may», no «often») | S2 PMC3125381, Treatment/Prognosis | Consenso 2011; «may» | R-04 falsa tranquilidad | H2-4, FAQ 1 | `grep «pueden seguir»`; 0 de «suelen» o «a menudo» |
| A-02 | El cribado es «anual o bianual» según el riesgo, sin glosa | S1 p. 4 | Guía oficial 2026; término ambiguo | R-07 frecuencia mal entendida | H2-3, FAQ 4 | Cita literal entre comillas |
| A-03 | Los collares con deltametrina y las pipetas con permetrina son opciones frente a flebotomos | S2 Prevention; S3 p. 16 | Consenso; la duración depende del producto | **R-01, R-02, R-03** | H2-5 | Cada riesgo vinculado tiene su mitigación en la misma sección |

La columna **«Fuerza y límite»** fija el verbo máximo que puede usar el redactor. La columna **«Riesgo vinculado»** obliga a que toda recomendación con riesgo lleve su mitigación en la misma sección. Es la regla que habría conectado A-03 con los gatos, los niños y el agua.

### 3.4 Criterios de aceptación del brief (objetivos)

El brief se aprueba cuando el registro no tiene ningún P0 ni P1 abierto y se cumplen los once puntos siguientes:

1. Cada fuente es real, con su identificador resuelto, y su afirmación está localizada (regla vigente).
2. Cada afirmación de la matriz tiene fuente y localización. Ninguna fuente queda sin afirmación.
3. Cada pregunta fundamental tiene su H2.
4. Las ocho lentes del mapa de riesgos tienen filas o un «no aplica» razonado.
5. Cada producto nombrado tiene su ficha (C2).
6. Cada riesgo tiene una mitigación y una sección.
7. Cada decisión que requiere criterio veterinario tiene su tratamiento declarado.
8. El contrato clínico (§9.6) se deriva del mapa de riesgos y no al revés.
9. Los metadatos, el enlazado y los componentes siguen las reglas vigentes, cerradas por comandos.
10. La adecuación de las fuentes está declarada: actualidad, aplicabilidad y búsqueda de versiones posteriores.
11. Lo visual no forma parte de este veredicto (va en la serie visual, C7).

---

## 4. Contrato de calidad del artículo

| Bloque | Criterio objetivo | Cómo se cierra |
|---|---|---|
| **Fidelidad al brief aprobado** | Cada pregunta fundamental está respondida en su H2. Ninguna afirmación supera la fuerza de su fila (p. ej., «suelen» donde la matriz dice «pueden») | Tabla de preguntas → línea. `grep` de los verbos prohibidos de la matriz |
| **Correspondencia afirmación–fuente** | Las afirmaciones clínicas nuevas, ausentes en la matriz, se verifican en la fuente o se retiran | Tabla fuente → afirmación → localización (vigente) |
| **Exactitud y seguridad clínica** | Cada fila del mapa de riesgos tiene su mitigación en la sección asignada. No hay dosis, pautas ni suspensiones (política vigente) | Tabla de riesgo → línea → texto citado |
| **Omisiones críticas no previstas** | Se hace la pasada adversarial (5 preguntas) sobre el texto final. Sus hallazgos llevan búsqueda negativa | Registro, con `tipo: omision` |
| **Coherencia entre secciones** | Ninguna contradicción entre cuerpo, avisos, tablas, FAQ, pies, alt y componentes. **Los componentes con texto clínico (animaciones, calendarios) entran en el alcance** | Lectura cruzada y `grep` de los términos de riesgo en `src/components/article/<Tema>*.astro` |
| **Claridad para el propietario** | Las acciones están en afirmativo y la señal de alarma aparece junto a la maniobra (regla vigente). Ninguna frase admite una lectura peligrosa | Pregunta adversarial 5 |
| **Sin instrucciones clínicas imprudentes** | Ninguna instrucción que el lector pueda ejecutar con daño sin pasar por la clínica | Pregunta adversarial 2 |
| **Calidad editorial suficiente** | Voz, densidad, volumen, enlazado y componentes según las reglas vigentes. **Se mide y se registra, y solo bloquea si incumple una regla escrita** | Scripts vigentes (`tono.py`, `metricas.mjs`, `medir-texto.py`) |

Queda **fuera** del veredicto del texto: imágenes, recortes y animaciones como dibujo, que van en la serie visual. Sí entran los textos clínicos de esos recursos: alt, pies y pasos.

---

## 5. Severidades, rúbricas y aprobación

### 5.1 Contrato de hallazgos

| Severidad | Definición operativa | Bloquea |
|---|---|---|
| **P0** | Hay una **ruta de daño plausible**: un lector que sigue el texto tal como está escrito puede causar un daño grave a un animal o a una persona. También cuenta la desinformación clínica grave: un dato inventado o una fuente falsa presentados como verificados | Sí |
| **P1** | Uno de cuatro casos: (a) incumplimiento de una regla escrita (contrato, skill o política) con impacto real; (b) afirmación clave con evidencia insuficiente o atribuida a una fuente que no la contiene; (c) ambigüedad que un lector razonable interpretaría de forma relevante para la salud; (d) omisión de una precaución de seguridad explícita en la ficha oficial de algo que el artículo recomienda, que el lector no deduciría | Sí, hasta resolverse |
| **P2** | Estilo, estructura, presentación, precisión sin riesgo, pulido de prompts o mejoras de utilidad | No |

Ya no hay P3: lo que hoy se llama P3 es P2.

**Prueba de la ruta de daño.** Antes de asignar P0 o P1 por seguridad, el auditor escribe en una frase quién hace qué, siguiendo qué línea del texto, y qué daño resulta. Si el texto ya bloquea esa ruta (p. ej., «No apliques al gato un producto para perros»), la severidad baja a la de la imprecisión que queda.

**Un bloqueante (P0/P1) solo se registra como tal si trae los cinco campos:**

1. **Localización**: archivo:línea o sección, y hash.
2. **Evidencia**: el texto del documento junto al de la fuente o la ficha, o la medida obtenida.
3. **Impacto**: la ruta de daño o la regla incumplida, con su cita.
4. **Corrección comprobable**: el texto o la acción exactos.
5. **Criterio de cierre**: qué comando, búsqueda o comprobación lo da por cerrado.

Si falta alguno, el hallazgo entra como `pendiente_verificacion`, que no bloquea. La excepción es un posible P0: ese va a la lista de decisiones del propietario.

**Reglas que impiden el perfeccionismo:**

- **Preferencias.** Un hallazgo cuya regla es «preferencia» o «conviene» no puede ser P1. No se rechaza un documento porque el auditor prefiera otro estilo.
- **P2 nuevos a partir de R2.** En R2 y R3, un P2 nuevo sobre texto no modificado pasa a `diferido`. Se anota para el siguiente artículo o para el propietario y no consume ronda.
- **Criterio estético.** El criterio estético de las imágenes nunca es P0. Si la regla está escrita, como el requisito senior del §9.7, es P1 y la última palabra la tiene el propietario.

### 5.2 Veredicto calculado

El veredicto no lo redacta el auditor: sale del registro.

| Veredicto | Condición |
|---|---|
| **APROBADO** | 0 P0 y 0 P1 en estados `abierto`, `regresion`, `corregido_sin_verificar` o `en_disputa` |
| **APROBADO con P2 abiertos** | Lo mismo, con algún P2 `abierto` o `diferido`. Los P2 no se repasan en otra ronda |
| **NO APROBADO** | Al menos un P0 o P1 bloqueante. El informe enumera los ID |
| **DECISIÓN DEL PROPIETARIO** | Un posible P0 que no se pudo verificar, o un hallazgo `en_disputa` |
| **ESCALADO** | La R3 termina NO APROBADO. Se genera el informe de escalamiento (6.4) |

Desaparecen «con reservas», «provisional» y «para la parte textual». Ninguno de estos veredictos certifica nada desde el punto de vista veterinario: el texto fijo de la plantilla lo dice siempre.

### 5.3 Rúbrica del auditor de brief

| Bloque | Qué comprueba | Señal de defecto |
|---|---|---|
| Fuentes (vigente) | Identidad, afirmación localizada, fuerza y actualidad | Identificador inventado (P0); afirmación ausente en la fuente (P1); afirmación más fuerte que la fuente (P1) |
| Matriz | Afirmación → fuente → sección → verbo máximo | Afirmación clave sin fila (P1); fila sin sección (P2) |
| Mapa de riesgos | Ocho lentes respondidas; mitigación y sección por riesgo | Una lente con «no aplica» genérico (P1 en un tema de nivel C, P2 en uno de nivel A); un producto nombrado sin ficha (P1) |
| Adversarial | Las cinco preguntas, cada una con una respuesta específica o «nada encontrado tras [búsqueda concreta]» | Respuesta genérica = la auditoría está incompleta (se declara, no es un hallazgo del brief) |
| Criterio veterinario | Lista presente y con su tratamiento | Una decisión clínica resuelta por la IA sin marcarla (P1) |
| Mecánica (vigente) | Metadatos, enlaces y componentes | Según las reglas vigentes |

**Las cinco preguntas adversariales.** Cada una exige escribir una respuesta concreta para este brief:

1. ¿Qué información esencial falta? Revisa las preguntas fundamentales frente a lo que preguntaría un lector real: foros, FAQ de clínicas, «la gente también pregunta».
2. ¿Qué recomendación aparentemente inocua podría perjudicar a un animal o a una persona de la casa? Recorre cada verbo de acción del brief.
3. ¿Qué escenario habitual no contempla? Por ejemplo: perro ya positivo, viaje, convivencia con otras especies, sin acceso al veterinario hoy o perro con otra enfermedad.
4. ¿Qué afirmación tiene una evidencia insuficiente para la fuerza con la que se dice?
5. ¿Qué podría interpretar mal un propietario cansado o asustado? Busca la falsa tranquilidad y la falsa alarma.

### 5.4 Rúbrica del auditor de artículo

Se basa en la vigente, con estos cambios:

- Tabla de cumplimiento de la matriz y del mapa de riesgos, línea por línea.
- Pasada adversarial sobre el texto final, con alt, pies y componentes incluidos.
- Búsqueda negativa obligatoria para todo hallazgo de omisión: términos buscados, secciones leídas y por qué el texto presente no basta. Así se evita reportar como ausente un aviso que ya existe.
- Calidad editorial: se mide y solo bloquea por una regla escrita.

---

## 6. Corrección, reauditoría y escalamiento

### 6.1 Registro de hallazgos

- **Un registro por artículo** (`docs/contenido/<slug>/registro-hallazgos.yaml`). Tiene dos fases, `brief` y `articulo`, y una serie visual.
- **Identificadores** `AAA-F-NNN`: AAA es un código del artículo (LEI, PET), F es la fase (B, A o V) y NNN un número que **nunca se reutiliza**.
- **Estados:** `abierto`, `corregido_sin_verificar`, `cerrado`, `regresion`, `pendiente_verificacion`, `en_disputa`, `diferido`, `descartado` y `aceptado_por_propietario`.
- **Quién escribe qué:**
  - El auditor abre, verifica y cierra.
  - El corrector solo pasa a `corregido_sin_verificar` o a `en_disputa`, con evidencia.
  - El propietario decide sobre `aceptado_por_propietario` y sobre las disputas.
- **Historial por hallazgo:** ronda, estado y evidencia.
- **Reapertura:** un hallazgo `cerrado` solo vuelve a `abierto` o `regresion` con `evidencia_nueva` distinta de la anterior. El validador lo comprueba (H6).
- **Ejemplos completos:** `pruebas/leishmaniosis-articulo.yaml` y `pruebas/miedo-petardos-brief.yaml`.

### 6.2 Orden de cada ronda

| Ronda | Alcance |
|---|---|
| **R1 (completa)** | Rúbrica entera, pasada adversarial y registro inicial |
| **R2 y R3 (delta)** | (1) Verificar cada bloqueante abierto por su ID contra su criterio de cierre. (2) `diff` entre el hash anterior y el actual: cada línea cambiada se revisa por regresión (los datos nuevos, contra la fuente). (3) Barrido de integridad global **acotado a P0**: dosis, tóxicos, urgencias, datos inventados y avisos borrados. (4) Un P1 nuevo sobre texto no modificado solo entra con `por_que_no_antes`. (5) Los P2 nuevos sobre texto no modificado pasan a `diferido` |

Este orden habría detectado «el último diciembre» en R3: era una línea cambiada en la corrección de R2, y el paso (2) obliga a contrastarla con el archivo de testimonios.

### 6.3 El corrector y la independencia

- El corrector responde **por ID**, con una de tres salidas: `corregido_sin_verificar` (con las líneas cambiadas), `en_disputa` (con la evidencia, p. ej., la nota del art. 114.1.B, H14) o `no aplicable` (con su razón). No toca nada fuera de los ID abiertos. Si cree que hace falta otro cambio, lo propone como hallazgo nuevo para el siguiente auditor.
- El auditor propone la corrección exacta (campo `correccion`), pero no aplica cambios y no se aprueba a sí mismo. El hallazgo lo cierra el auditor de la ronda siguiente, que es otro contexto.
- **Una disputa no consume ronda.** La resuelve el propietario con una línea en el registro. No hay bucles de réplica entre agentes.
- **Independencia verificable.** El registro guarda, por ronda, el ID de sesión, el modelo y el hash auditado. La sesión que generó o corrigió no puede firmar la auditoría del mismo hash. Un orquestador puede lanzar auditores, pero no transcribe ni resume sus informes: se pega el informe íntegro.

### 6.4 Escalamiento (sustituye a la cuarta ronda)

Cuando la R3 termina NO APROBADO, el auditor de esa ronda redacta el **informe de escalamiento** (`plantillas.md` §8) en una página:

- los bloqueantes que siguen abiertos y su historial (si son recurrentes o regresiones);
- la causa probable: defecto del brief, desacuerdo de criterio, fuente insuficiente o corrección defectuosa;
- **tres salidas cerradas** con su coste:
  - (a) aceptar el riesgo con un texto concreto;
  - (b) aplicar la corrección exacta indicada y verificarla solo por `grep` o por el criterio de cierre, sin ronda completa;
  - (c) cambiar el contrato, retirar la sección o abandonar el tema.

El propietario elige una. «Abrir otra ronda» no es una opción del informe. Si el propietario la quiere de todas formas, la autoriza por escrito con su alcance (solo esos ID), como hizo en petardos.

### 6.5 Defecto del brief descubierto durante la redacción o la auditoría del artículo

1. El auditor del artículo registra el hallazgo con `origen: brief`. No audita el brief.
2. El propietario decide si se hace una **adenda de contrato** (`plantillas.md` §9): qué fila de la matriz o del mapa de riesgos cambia, con su fuente.
3. Un auditor verifica **solo la adenda**: la fuente y la coherencia con el resto del contrato. No reabre la auditoría completa del brief ni consume una ronda del brief.
4. **Análisis de impacto en el texto:** el auditor del artículo localiza por `grep` las secciones afectadas por la adenda. Esas secciones entran en la siguiente ronda delta del artículo como «líneas cambiadas».
5. Si el artículo ya está publicado, el hallazgo va a la lista del propietario con su ruta de daño. Un P0 se corrige antes de cualquier otra cosa.

La adenda visual del propietario del 2026-10-25 (brief l. 395) siguió los pasos 1 y 2. Faltaron el 3 y el 4: los textos clínicos resultantes (H10) no tuvieron verificación.

### 6.6 Puerta final del propietario

Antes de fusionar a `main`, el propietario ve una sola tabla: los riesgos del mapa con su línea en el texto, los P2 diferidos, las decisiones que requieren criterio veterinario y su tratamiento, y lo que no se verificó. Él firma. Para los temas de nivel C, el proceso **recomienda** (no obliga) que un veterinario revise esa tabla. La IA nunca escribe «certificado», «validado clínicamente» ni «revisado por veterinario».

---

## 7. Plantillas e instrucciones reutilizables

Están en [`plantillas.md`](plantillas.md):

1. Sección «Alcance, preguntas y riesgos» para la plantilla del brief.
2. Las ocho lentes del mapa de riesgos.
3. La matriz de trazabilidad.
4. El esquema del registro de hallazgos.
5. El prompt del auditor de brief (R1 y delta).
6. El prompt del auditor de artículo (R1 y delta).
7. El prompt del corrector.
8. El informe de escalamiento.
9. La adenda de contrato.
10. La puerta de publicación.

---

## 8. Ejemplo aplicado a leishmaniosis y pruebas de regresión

### 8.1 Mapa de riesgos que habría producido el brief (extracto)

| ID | Lente | Escenario | Daño | Fuente de seguridad | Mitigación esperada | Sección | ¿En el texto publicado? |
|---|---|---|---|---|---|---|---|
| R-01 | Convivientes, otras especies | Hay un gato en casa y el perro lleva pipeta de permetrina | Intoxicación grave del gato | Ficha 3212 ESP §3.3 y §3.5 | Aviso con lavado y veterinario | H2-5 | **Sí**: l. 302-310 y FAQ 6 |
| R-02 | Productos nombrados | El tutor pone al gato un collar de deltametrina «para protegerlos a todos» | Uso en una especie contraindicada | Ficha 1326 ESP §3.3: «No usar en gatos» | Nombrar la deltametrina en el aviso de gatos | H2-5 | **Parcial**: la l. 305 lo prohíbe en general; el aviso solo nombra la permetrina |
| R-03 | Convivientes, personas | Un niño juega con el collar o duerme con el perro el día de la pipeta | Exposición de un menor; reacción de hipersensibilidad | 1326 ESP §3.5; 3212 ESP §3.5 | Una frase remitiendo a las precauciones para personas de la ficha | H2-5 | **No** (búsqueda de «niño», «dormir con» y «jueguen»: 0) |
| R-04 | Lectura errónea | «Ya está tratado, ya no contagia» | Abandonar la prevención en el perro positivo | S2 Treatment | «Pueden seguir infectados»; mantener la prevención | H2-4, FAQ 1 | **Sí** |
| R-05 | Lectura errónea | «Positivo = enfermo» o «negativo en el test rápido = sano» | Ansiedad o falsa tranquilidad | S1 Fig. 1; S2 Tabla 3 | Infección frente a enfermedad; límites del test rápido | Intro, H2-3 | **Sí** |
| R-06 | Perro senior | Perro con enfermedad renal previa | El tratamiento puede afectar al riñón; los controles son distintos | S1 p. 7; S2 Tabla 5 | Remitir a la clínica, sin pautas | H2-4 | **Sí** (l. 229, «cálculos urinarios», sin nombrar el fármaco) |
| R-07 | Personas | Alguien inmunodeprimido en casa | Zoonosis | ESCCAP | Hablarlo con su médico | H2-1, FAQ | **Sí** (l. 45) |
| R-08 | Medio ambiente | El perro se baña en un río tras la pipeta o con el collar | Daño a organismos acuáticos | 3212 ESP y 1326 ESP §3.5 | Media frase remitiendo a la ficha | H2-5 | **No** |

### 8.2 Registro resultante (salida real del validador)

```
### leishmaniosis-articulo.yaml
AVISO   LEI-A-101: P2 nuevo en texto no modificado durante R3; pasa a diferido
AVISO   LEI-A-103: P2 nuevo en texto no modificado durante R3; pasa a diferido
VEREDICTO articulo: NO APROBADO (LEI-A-102)
```

| ID | Sev. | Hallazgo | Corrección propuesta (sin marcas ni dosis) |
|---|---|---|---|
| LEI-A-101 | P2 | El aviso de gatos solo nombra la permetrina; la vía de daño queda cubierta por la l. 305 | Título «Antiparasitarios para perros: precaución con los gatos» y «los collares con deltametrina tampoco se usan en gatos» |
| LEI-A-102 | **P1** | Faltan las precauciones de ficha para las personas de la casa (niños, collar, dormir con el perro el día de la pipeta) | Una frase en H2-5 atribuida a las fichas |
| LEI-A-103 | P2 | Falta la precaución para cursos de agua | Media frase en la línea del baño |

**Severidad de LEI-A-102.** No es P0, porque el texto no ordena nada peligroso y la l. 308 remite a «las instrucciones de contacto y separación de tu producto». Es P1 por el inciso (d): la ficha recoge una precaución explícita que el lector no deduciría. **El artículo está publicado.** Esta clasificación es mía como auditor de este ejemplo. Según la separación de roles del proyecto, no lo corrijo: la decisión y la corrección corresponden al propietario y a otra sesión.

### 8.3 Pruebas de regresión

| Prueba | Cómo se hizo | Resultado |
|---|---|---|
| **1. Detecta una omisión de seguridad por toxicidad entre especies** | Apliqué a mano las reglas C1 y C2 al texto publicado: inventario de productos nombrados → fichas oficiales descargadas → §3.3 y §3.5 → `grep` en el artículo | **Satisfecha por demostración.** Produce R-02, R-03 y R-08. El proceso vigente no lo detectó en cinco auditorías (H1). Límite: lo apliqué yo, que conocía el caso. La prueba real es aplicarlo a ciegas al próximo artículo (sección 10) |
| **2. No reporta como ausente un aviso que ya está** | `pruebas/control-omision-falsa.yaml`: un auditor declara que falta el aviso de gatos. El validador repite la búsqueda negativa sobre el `.mdx` | **Superada por ejecución.** `ERROR LEI-A-104: se declara ausente, pero 10 líneas contienen ['gato'] (líneas 241, 272, 302, 304, 305, 308, 310, 322)…`, código 1. Límite: la búsqueda es literal. Si el auditor elige mal los términos (sinónimos), no lo detecta; por eso la plantilla exige listar las secciones leídas |
| **3. Distingue una mejora editorial opcional de un error clínico** | (a) `pruebas/control-preferencia-bloqueante.yaml`: un P1 cuya regla es «preferencia de estilo» (R6 P3-11 de petardos). (b) La R3 visual pasa de P0 a P1 (LEI-V-001), porque no hay ruta de daño clínico. (c) LEI-A-101 queda en P2 por la prueba de la ruta de daño | (a) **Superada por ejecución**: `ERROR PET-B-059: una preferencia de estilo no puede bloquear`. (b) y (c) **Demostradas** por la regla de 5.1; dependen del juicio del auditor y la regla lo hace explícito y auditable |
| **4. Detecta fuentes inexistentes, mal interpretadas o insuficientes** | Inexistentes y mal interpretadas: el proceso vigente ya lo hace bien («a menudo siguen infectados» y «bianual» en brief R1) y la propuesta lo conserva entero. Insuficientes: C2 detecta que la deltametrina se recomienda sin su ficha | **Demostrada** sobre el caso real. No inventé un PMID falso para probarlo |
| **5. Detiene una secuencia de auditorías improductivas** | `pruebas/miedo-petardos-brief.yaml` con las seis rondas reales | **Superada por ejecución.** `AVISO R3 NO APROBADO: corresponde informe de escalamiento, no R4 automática`. Con R4 cerrada, R5 da `APROBADO con 1 P2`: la R6 (2 P2 y 15 P3) no habría existido. Las rondas posteriores a R3 sin autorización escrita del propietario dan ERROR (regla comprobada en el código; en petardos la autorización existe) |
| **6. Conserva intacta la calidad científica** | Comparé, control por control, la lista «Bloquean» de `calidad-editorial-adsense.md` §6 y las prioridades de las dos skills de auditoría con la propuesta | **Demostrada por correspondencia** (tabla siguiente). Ningún control se elimina ni baja de bloqueante a no bloqueante |

| Control vigente que bloquea | Dónde queda |
|---|---|
| Identificador erróneo presentado como válido | P0 (desinformación grave) |
| Afirmación clave sin respaldo | P1 (b) |
| Caso real sin procedencia aclarada; dato añadido al testimonio | P1 (a) o P0 si es inventado y se presenta como verificado |
| Ilustración presentada como evidencia clínica | P1 (a) |
| Pauta contraria a la política | P0 si hay ruta de daño; si no, P1 (a) |
| Recurso prometido ausente o roto | P1 (a) |
| Instrucciones editoriales filtradas al texto | P1 (a) |
| Prueba indispensable pendiente | `pendiente_verificacion`; si es un posible P0, decisión del propietario |
| No negociable ablandado | P1 (a), o P0 si es de seguridad |

---

## 9. Comparación entre el proceso actual y el propuesto

| Dimensión | Actual | Propuesto |
|---|---|---|
| **Detección de omisiones** | Solo dentro del contrato (H1, H2) | Contrato más mapa de riesgos y fichas. La pasada adversarial deja rastro escrito |
| **Rondas típicas** | Leishmaniosis: 2 + 2 de texto. Petardos: 6 de brief | Mismo tope de 3. R2 y R3 más cortas (delta). Petardos se habría detenido en R3 o R5 |
| **Esfuerzo del brief** | — | **+30 a 60 min** (mapa de riesgos y fichas). Es una estimación, no una medida |
| **Esfuerzo de auditoría** | La R2 relee mucho y la R1 lista todo, incluido el pulido | R1 similar más ≈20 min de pasada adversarial. R2 y R3 deberían bajar, porque revisan solo lo cambiado. **Por medir** |
| **Informes** | 70 a 240 líneas, con formatos que varían | Registro YAML más un informe corto. El veredicto se calcula |
| **Trazabilidad** | Hash por versión (bueno); IDs inestables | Hash más IDs estables, historial por hallazgo y sesión y modelo por ronda |
| **Perfeccionismo** | Los P2 y P3 crecen por ronda | Los P2 nuevos tras R1 pasan a `diferido`; las preferencias no bloquean |
| **Control humano** | El propietario interviene ad hoc (alimentación, petardos R4-R6, visuales v4) | Puerta final con la tabla de riesgos, salidas cerradas de escalamiento y disputas resueltas por él |
| **Riesgos nuevos** | — | (1) El mapa de riesgos puede convertirse en un formulario de «no aplica»; la mitigación es exigir la razón específica y que la audite el auditor. (2) El diferido puede acumular P2 útiles; la mitigación es revisarlo al publicar. (3) La ronda delta puede pasar por alto un defecto antiguo no cambiado; la mitigación es el barrido P0 obligatorio en cada ronda |
| **Complejidad añadida** | — | Un archivo YAML por artículo, una sección más en el brief y un script de 150 líneas. No hay agentes ni etapas nuevos |

**Lo que la propuesta no consigue.** No sustituye el criterio veterinario. No garantiza que el mapa de riesgos esté completo: solo hace visibles sus huecos. No reduce el coste visual de H11, que depende de la generación de imágenes y de cuánta exigencia estética quiera el propietario. Tres auditorías no dan tres veces más certeza: si comparten el mismo perímetro, comparten el mismo punto ciego (H1).

---

## 10. Plan de adopción gradual

| Paso | Qué | Archivos que se tocarían (solo con tu autorización) | Cómo saber si funcionó |
|---|---|---|---|
| **0. Decisión inmediata** | Decidir LEI-A-101 a 103 sobre el artículo publicado. Si se corrige, en una sesión aparte y con auditoría delta de esas líneas | `src/content/blog/leishmaniosis-perros-mayores.mdx` (rama propia → PR) | El criterio de cierre de cada ID |
| **1. Piloto sin cambiar las skills** | En el próximo artículo, usar `plantillas.md` pegada en los prompts y el validador desde esta carpeta | Ninguno del proceso; solo el expediente del artículo | Rondas por fase, hallazgos por severidad y ronda, regresiones, horas. Comparar con leishmaniosis y petardos |
| **2. Severidad y veredicto** (C4) | Unificar las definiciones P0/P1/P2 y el veredicto calculado | `calidad-editorial-adsense.md` §6 y los dos `formato-informe.md` | Ningún «con reservas» ambiguo |
| **3. Registro y rondas delta** (C3, C5, C6) | Registro YAML, protocolo delta, disputa y escalamiento | Las dos skills de auditoría; `calidad-editorial-adsense.md` §6 | Ningún ID reutilizado; ninguna reapertura sin evidencia |
| **4. Mapa de riesgos y fichas** (C1, C2) | Secciones nuevas del brief | `template_briefing.md`, `generar-briefing-contenido` Fase 2, `auditar-briefing-contenido` paso 3 | La pasada adversarial del auditor no encuentra filas de seguridad que falten en el mapa |
| **5. Validador en el repo** | Mover `validar_registro.py` a `.agents/skills/references/scripts/` con pruebas. Si se quiere, añadirlo como comprobación en CI | Scripts y CI | Código 0 en los registros de los artículos nuevos |
| **6. Revisión tras tres artículos** | Mantener, ajustar o retirar cada cambio según las métricas del paso 1 | Este documento | Si R2 y R3 no se acortan o el mapa se llena de «no aplica», revisar C1 y C5 |

Orden recomendado: 0 y 1 ya; 2 y 3 después del piloto (son cambios de texto en las skills); 4 cuando el piloto demuestre que el mapa no es un formulario vacío. Cada paso es reversible y se puede adoptar por separado.

---

## Anexo: fuentes primarias consultadas en esta auditoría

- AEMPS, CIMAVet. Ficha técnica de un spot-on con permetrina para perros (3212 ESP), §3.3 y §3.5: https://cimavet.aemps.es/cimavet/pdfs/es/ft/3212%20ESP/3212_ESP_ft.pdf
- AEMPS, CIMAVet. Ficha técnica de un collar con deltametrina para perros (1326 ESP), §3.3, §3.4 y §3.5: https://cimavet.aemps.es/cimavet/pdfs/es/ft/1326%20ESP/1326%20ESP.pdf
- Repositorio: los informes, las correcciones y los commits citados en cada fila, con su ruta. Los commits del PR #146 se obtuvieron con `git fetch origin pull/146/head`.

**No verifiqué:** si existen versiones más recientes de LeishVet o ESCCAP; las fichas de otros collares o pipetas del mercado (puede haber diferencias entre productos); el contenido de las sesiones de chat que no dejaron rastro en el repositorio.
