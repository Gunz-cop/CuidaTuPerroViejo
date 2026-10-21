# Auditoría de tono — ronda T2 (insuficiencia pancreática y limpieza de ojos y oídos)

- **Fecha:** 2026-10-21. **Ronda:** T2 de un máximo de tres. La sesión correctora confirmó la numeración T1/T2.
- **Versión auditada:** rama `claude/tono-correcciones-r1` @ `227e249` (PR #141), con base `main` @ `26f9b77`.
  - IPE: SHA-256 `eede22e934e5fb7ffc1f0b17033887af24df36a16474f3e4a07e30175e984b9c`
  - Ojos y oídos: SHA-256 `15891e584bde41c8c2f8af35081ef70e4da74fc044ca0b98587f71259a26760f`
- **Alcance:** solo estos dos archivos y los bloqueantes de la T1 (`insuficiencia-pancreatica-exocrina.md` y `limpieza-ojos-oidos.md`). El PR #141 cambia además otros 9 artículos (cama ortopédica, comida casera, disfunción cognitiva, incontinencia fecal y urinaria, poliquezia, prevención de caídas, Cushing y úlceras). **Esos no se auditaron aquí** y necesitan su propia revisión antes de fusionar.
- La sesión correctora es distinta de la auditora. Esta auditoría no edita los artículos.

## Veredictos

| Artículo | Veredicto | Motivo |
|---|---|---|
| Insuficiencia pancreática exocrina | **APTO** | Los dos bloqueantes de la T1 están resueltos y la corrección no introduce ninguna afirmación nueva atribuida a una fuente. |
| Limpieza de ojos y oídos | **APTO** | La instrucción de recortar pelo junto al ojo vuelve a ser una prohibición, con el mismo alcance que el original. |

Mecánico: `tono.py` da 0,0/1000 en los dos. Los bloqueos del script son los mismos que en la T1 y su origen es el mismo: en IPE, la falta de brief y el formato del bloque de fuentes; en ojos y oídos, la adenda de extensión autorizada del 17-oct. La T1 ya los descartó como hallazgos y la corrección no cambió nada en ellos.

## Cierre de bloqueantes de la T1

| Bloqueante T1 | Texto en T2 | Estado | Comprobación |
|---|---|---|---|
| IPE B1, línea 47: «…frente a un diagnóstico basado solo en síntomas» | «Sus resultados apoyan la prueba en esa población; el diagnóstico se apoya en ella y no solo en los síntomas.» | **Resuelto** | Ya no atribuye a Williams y Batt (1988) una comparación con los síntomas que el estudio no hizo. La segunda oración es una afirmación general que coincide con el resumen de Cridge 2024 («EPI is diagnosed by measurement of… trypsin-like immunoreactivity»). |
| IPE B2, línea 82: «…valorar la respuesta: la grasa y la fibra se ajustan a cada perro» | «…valorar la respuesta. No todos los perros necesitan la misma restricción de grasa o fibra.» | **Resuelto** (se restauró el original) | Los dos puntos desaparecen, así que la frase ya no queda atribuida a Merck. Es literalmente el texto anterior a `149daf7`, como pedía la consigna de no cambiar afirmaciones. |
| Ojos y oídos B1, línea 49: «recorta pelo solo con la cabeza quieta» | «no acerques tijeras si mueve la cabeza» | **Resuelto** | Mismo alcance que el original, «no recortes pelo con tijeras mientras mueve la cabeza»: prohíbe y no indica ninguna maniobra. Las tijeras vuelven a nombrarse. |

Un `git diff` de `main...227e249` sobre los dos archivos confirma que el PR solo cambia esas tres líneas. No hay ningún cambio más en estos artículos, así que no hay problemas nuevos.

## Pendientes no bloqueantes (siguen como en la T1)

- **IPE, línea 82 (anterior a la reescritura):** la frase restaurada da a entender que algunos perros necesitan restringir la grasa. Merck desaconseja las dietas bajas en grasa y recomienda poca fibra insoluble. No bloquea porque es el texto aprobado antes del PR #136 y corregirlo cambia el contenido clínico. Le corresponde a una edición de contenido aprobada por el dueño, no a una de tono.
- **IPE:** la línea 65 sigue diciendo «el estudio» donde antes decía «ese resumen». El H3 de cobalamina sigue sin enlazar ninguna fuente. Las FAQ y el pie de imagen siguen con la voz anterior.
- **Ojos y oídos:** siguen sin corregir la línea 65 («sigue con él mientras tanto», que choca con «deja el oído tranquilo»), la 55 (el color «no sirve»), la 83 («sin inmovilizarle») y la 86 («no hace falta… buscar más adentro»), además de las FAQ. Se recomienda corregir primero la línea 65, porque toca un punto que protege la adenda («no suspender prescripción por un consejo general»).
- **Estilo, IPE línea 47:** «apoyan… se apoya» repite el verbo. Es solo forma.

## Lo que sí funciona

- Las correcciones son mínimas y van al punto: tres líneas, sin nada añadido para «mejorar» de paso.
- En el bloqueante B2 se eligió restaurar el original en vez de añadir contenido de Merck. Es la opción que respeta la consigna de la edición de tono.

## Pruebas

Comprobación local: `tono.py` y `metricas.mjs` corridos sobre un worktree de `227e249`. Build no verificado en esta sesión: el contenedor no tiene `node_modules`. URL pública y preview: no comprobadas.
