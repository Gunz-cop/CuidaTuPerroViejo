# Corrección puntual tras la auditoría R3 recibida

Fecha: 2026-10-22. Corrector: coordinación `/root`; distinto del autor del informe aportado por el usuario. **Comprobación de producción, no auditoría independiente ni cuarta ronda.**

## Versiones y alcance

- [R3 recibida](auditoria-articulo-r3.md): **APTO con tres avisos no bloqueantes**, contador agotado **3/3**. El informe no aporta hash propio; se conserva la versión que estaba entregada cuando llegó.
- MDX antes de corregir: SHA-256 `6913314b0400dd6d071296c682a2d724775cdecb03008ff1b0b4839349634deb`, commit `8c4debde9c91c3c55b1ddc8706f3881681d8593e`.
- MDX corregido: SHA-256 `37b4f669b64bb17fa3e7ad763ab569297f8470a9732b7b2762c115fac74a20e5`.
- Brief, componentes, imágenes, enlaces y demás prosa permanecen sin cambios. El único cambio de producto es el párrafo de Illinois, dividido en dos para conservar la legibilidad. No se presenta el hash corregido como auditado después de la corrección.

## Cambio solicitado y aplicado

Antes: «Una masa, una llaga que persiste…» y «detectar lesiones que pueden permanecer poco visibles en la boca».

Después:

> Una llaga o un bulto nuevo, o sangre en los juguetes, merece valoración.
>
> La facultad veterinaria de Illinois sobre tumores orales destaca esos cambios y la importancia de detectar a tiempo tumores que al principio son pequeños y no causan síntomas.

Se abrió de nuevo la [página oficial de Illinois](https://vetmed.illinois.edu/pet-health-columns/oral-tumors-in-dogs-and-cats/) para aplicar esa precisión, sin convertirlo en una auditoría adicional de las doce referencias. Pasajes leídos:

| Afirmación | Pasaje de la fuente | Localización |
|---|---|---|
| Llaga o bulto nuevo | “a new bump or sore when it first appears in a pet’s mouth” | Catch Changes Early |
| Sangre en los juguetes | “blood in their water bowl or on toys” | Signos, antes de Catch Changes Early |
| Tumores inicialmente pequeños y sin síntomas | “at an early stage, usually small and not yet causing symptoms” | Catch Changes Early, explicación de la exploración veterinaria |

No se usa el olor para identificar cáncer ni se añaden tratamientos, productos o nuevos hechos clínicos.

## Comprobaciones del corrector

[Métricas reproducibles](qa/recheck-r3/metricas.json): **5.863 palabras útiles**, **6.266 brutas**; las diez secciones dentro de ±15 %. El H2 de causas orales pasa de 896 a 897 palabras. Densidad: 134 párrafos, media 36,9, mediana 37, máximo 50; ninguno superior a 50 y ningún tramo H3 superior a 200.

[Resultados de recheck](qa/recheck-r3/resultados.tsv): **7/7 comandos con salida 0**, incluidos tono (5.603 palabras según sus exclusiones, 2 muletillas, 0,4/1.000), Astro check/build, discovery, proyección, API y equivalencia semántica. [Runner y logs](qa/recheck-r3/). No se repiten suites ajenas a una modificación de prosa.

La evidencia extensa de navegador de R2 se conserva con sus hashes originales. La [comprobación puntual de navegador](qa/recheck-r3/navegador.json) pasa las seis combinaciones de 375/390/1366 px y claro/oscuro: nuevo texto y enlace presentes, tema correcto, sin desbordamiento ni errores JavaScript. Se guardan [seis capturas nuevas](qa/recheck-r3/capturas/); coordinación abrió además móvil claro y escritorio oscuro para inspeccionar la legibilidad. No se atribuyen estas pruebas al auditor ni sustituyen una auditoría editorial. No hay fusión, publicación ni despliegue.

## Avisos conservados

UC Davis y AAHA 2019 no fueron abiertas en R3 según su autor; se conserva ese límite, sin atribuirles una nueva verificación en este cierre. Las aperturas de rondas anteriores mantienen su procedencia. La incompatibilidad entre firma manual de la skill y firma automática del sitio, junto con los desacuerdos del parser, queda registrada en `TODO.md` para otra sesión. No se modifica la skill, el script de auditoría ni el brief para hacer desaparecer advertencias.

El contraste de `FeedbackWidget` y la hero de 1200w siguen como limitaciones compartidas preexistentes. La revisión humana del PR continúa pendiente; ninguna comprobación local equivale a publicación ni a revisión veterinaria.
