# Auditoría independiente del brief de leishmaniosis en perros mayores. Ronda R2 de 3 (solo bloqueantes)

| Campo | Valor |
|---|---|
| Documento auditado | `briefings/briefing-leishmaniosis-perros-mayores.md` (rama `claude/senior-dog-requirement-leishmaniosis-brief`, commit `4722759`) |
| Versión (SHA-256) | `f93bcd8cb902146630b62736d1ddc9374ead3585e39c86eeb291034bc3b84924` (550 líneas, 79.938 bytes; recalculado al cerrar el informe: sin cambios) |
| Fecha | 2026-10-24 |
| Ronda | R2 de un máximo de 3. Alcance: verificar los 4 P1 de R1 y buscar bloqueantes nuevos; no se reabren los P2 |
| Rol | Solo evaluación. No se ha modificado el brief ni ningún otro archivo salvo este informe |
| Validación | Local y documental; no se ejecutó `npm run build` ni existen imágenes |

## Veredicto

**APTO para redacción.** Los cuatro P1 de R1 están resueltos en todas sus apariciones y las correcciones no introdujeron ningún bloqueante nuevo.

## Resolución de los P1 de R1 (comprobada leyendo el brief actual)

| P1 | Dónde se comprobó | Resultado |
|---|---|---|
| P1-1 «suelen seguir infectados» | `grep` de «suelen», «a menudo»: solo quedan en instrucciones de no usarlas (§3 S2 línea 112; H2-4 línea 335). Aparece «pueden seguir» en S2 (112), H2-4 (335), FAQ 1 (374) y §9.6 (488). Ya no hay cita entrecomillada de «a menudo» | **Resuelto** |
| P1-2 «anual o bianual» | FAQ 4 (línea 377): «anual o bianual» literal entre comillas, sin glosa, más LeishVet «al menos una al año». H2-3 (línea 320): cita literal y «no glosar “bianual”». §3 S1 (96) literal. «cada dos años» no aparece en ningún sitio | **Resuelto** |
| P1-3 alopurinol | H2-4 (línea 334): solo «la clínica decide cuánto dura la pauta y cuándo se revisa: no la suspendas ni la alargues por tu cuenta», con la orden expresa de no citar la regla de interrupción, duración ni dosis. S1 (líneas 99 y 102) declara que la pauta de duración, la regla de interrupción y los «6–12 meses» no pasan al artículo. Ninguna pauta de duración o suspensión de fármaco pasa al texto. «Tratamiento corto» del estadio I está en S1 (nota de la Tabla 1: «tratamiento a corto plazo» en estadio I; comprobado en el PDF) y es una descripción, no una pauta | **Resuelto** |
| P1-4 Imagen 3 y pelaje | Imagen 3 (línea 439) copia literal el bloque de edad (línea 407): canas en hocico, cejas y párpados; ojos hundidos con párpados caídos y mirada serena; lomo hundido tras la cruz, menos masa en hombros y cuartos, cadera marcada; «postura natural de perro mayor, con la cabeza a la altura del lomo o algo baja, apoyos prudentes y sin poses atléticas»; «sin cojera… ni sufrimiento»; cierra con «Rechazar si a tamaño móvil parece un adulto joven». «Parche rasurado» sustituido por «sin zona rasurada visible» | **Resuelto** |
| Pelaje nuevo (atigrado oscuro, pecho y calcetines blancos) | Coherente en: raza elegida (399), sujeto fijo (403), prompts de Imagen 1, 2, 3 y recorte (427, 433, 439, 446), alt del frontmatter (41) y de Imagen 1 (428), y fila del registro en `.agents/skills/references/direccion-visual-editorial.md` línea 88 («Mestizo de tipo pastor-mastín, atigrado oscuro»). «Leonado» solo queda en la justificación y el historial como el arquetipo evitado; ningún prompt describe pelaje leonado ni «máscara negra» | **Resuelto** |

Comprobación de los cinco rasgos en los cuatro prompts (imagen 1, 2, 3 y recorte): los cinco rasgos están presentes en todos, cada uno cierra con la línea de rechazo a tamaño móvil y la ficha de aceptación (líneas 417 y 421) los exige a 390 px.

## Bloqueantes restantes

**Ninguno.** No hay P0 ni P1 en esta versión.

## Búsqueda de bloqueantes nuevos introducidos por las correcciones

| Control | Resultado |
|---|---|
| Contradicciones clínicas con §9.6 | H2-4, FAQ y S1 coinciden con §9.6 (sin dosis, duración ni pautas; «pueden seguir infectados»; calendario con las tres posturas; vacuna solo existencia y «no infectados»). Sin cifras de creatinina, UPC, título ni prevalencia en el texto planificado |
| Afirmaciones atribuidas tocadas por la corrección | S1 estadio I «tratamiento corto o solo vigilancia»: respaldado por la nota de la Tabla 1 de S1 (releído el PDF). S2 enfoque integrado vacuna + insecticida tópico: respaldado por PMC3125381 («Prevention should be an integrated approach including vaccination… and the application of a topical insecticide»). S10 fecha de publicación (19/02/2016), S3 p. 17 y S7 patrocinio: coinciden con lo constatado en R1 |
| Cifras del contrato | Suma de targets 250 + 650 + 700 + 800 + 700 + 900 + 550 = 4.550 = total declarado; rango ±15 % = 3.867,5 a 5.232,5, escrito 3.868–5.232. «Cinco H2» coherente en líneas 30 y 240 |
| Metadatos | `seoTitle` 54 caracteres, `metaDescription` 158 (medidos con Python); `pilar: salud-perros-mayores` válido; frontmatter idéntico a §1 |
| Enlaces internos | Los tres `.mdx` existen en `src/content/blog/` y figuran en `INVENTARIO_CONTENIDO.md`; la calculadora existe en `src/pages/herramientas/calculadora-calidad-vida-perros.astro`; pendientes sin slug inventado |
| Componentes y FAQ | 3 `AlertBox` (info, danger, warning), FAQ con 7 preguntas (contadas), 2 `TablaApilable` |
| Trazabilidad fuente → H2 | S1 a S10 coinciden entre §3, `*Sustentado en:*` de §6 y la tabla de §9.2 |
| Registro de razas | Fila actualizada en la dirección visual; raza no repetida; el arquetipo cromático del bóxer, galgo y podenco queda evitado |
| Historial (§12) | R1 con el hash parcial `7379d1f8…2a84`, que coincide con el SHA-256 completo de la R1; R2 marcada pendiente |
| Voz | `tono.py`: 2 muletillas en 7.010 palabras (0,3/1000) |

## Observaciones que no bloquean (para que la redacción las tenga a mano; no forman parte de la lista de correcciones)

- §8 afirma que el bloque de edad se copia «ÍNTEGRO»; la Imagen 1 y el recorte omiten «ni sufrimiento» y la Imagen 1 omite «o algo baja». Los cinco rasgos están presentes, así que el requisito senior se cumple; solo la palabra «íntegro» es más fuerte que la realidad.
- §3 S2 (línea 114) conserva «recomienda combinar la vacuna con insecticidas tópicos» aunque el historial dice que se parafraseó; es compatible con la fuente y el H2-5 (línea 357) usa «propone un enfoque integrado».
- H2-4 (línea 334) dice «un fármaco que elimina el parásito» mientras §9.6 dice que el tratamiento no «elimina el parásito»; el redactor debe describirlo como «actúa contra el parásito» y mantener «pueden seguir infectados».
- H2-3 (línea 319) menciona «costa mediterránea, el sur o el centro peninsular» como lugares donde preguntar; no es una afirmación de endemicidad y va acompañada de Madrid y Ourense, pero el redactor no debe convertirlo en un mapa.

## Fuentes

No se reabrieron las diez fuentes (R1 las verificó). En R2 solo se releyó S1 (nota de la Tabla 1, estadio I) y S2 (frase de enfoque integrado) por haber sido tocadas por la corrección. Sin cambios en S3 a S10 respecto a la verificación de R1.

## Recursos prometidos

Sin cambios respecto a R1: todo planificado y marcado «no producido» con su prueba previa (§11). Validación local y documental, nada desplegado.

## Efecto cascada

Sin artículo ni imágenes aún. Los briefs futuros P1-09 y P1-10 que citen ESCCAP nº 5 (2012) heredan la cautela de R1 (dosis y prevalencias no pasan).

## Lo que sí funciona (no romper al redactar)

Las marcas honestas de verificación parcial (S4, S10, lagunas 1 a 7); la instrucción explícita de no escribir «suelen» ni «a menudo» (línea 335); la cita literal «anual o bianual» sin glosa; el mensaje de seguridad del tratamiento sin duración; el bloque de edad y la línea de rechazo en cada prompt; el calendario con tres posturas atribuidas.

## Qué corregir, en orden

Nada es obligatorio antes de redactar. Pasar a redacción con la skill `redactar-articulo-blog` sobre la versión con hash `f93bcd8cb902146630b62736d1ddc9374ead3585e39c86eeb291034bc3b84924`.
