# Auditoría delta R1: corrección LEI-A-101, LEI-A-102 y LEI-A-103

- **Fecha:** 2026-10-27.
- **Ronda:** delta R1 de un máximo de 3.
- **Rol:** auditor independiente. No participé ni en los hallazgos ni en la corrección. No he editado el artículo ni el expediente: este informe es el único archivo que escribo.
- **Documento:** `src/content/blog/leishmaniosis-perros-mayores.mdx`, rama `claude/leishmaniosis-precauciones-fichas` (commit `ae54db9`, PR #152 en borrador).
- **SHA-256 de partida (`origin/main`):** `f449151f705f33b2493ccaa9816e9ce4ba78bfbf9b533ff1dffbab603ebb0220`. Lo he recalculado y coincide con el indicado.
- **SHA-256 auditado:** `98573cf2f474082a2fd7197a41aef21f40d911678be72b32716176708a0b4698`. Lo he recalculado y coincide con el que declara el expediente.
- **Hallazgos y criterios de cierre:** `docs/proceso-editorial/propuesta-2026-10-26/pruebas/leishmaniosis-articulo.yaml`, rama `claude/propuesta-proceso-editorial`.
- **Expediente del corrector** (`correccion-fichas-2026-10-27.md`): lo he leído como hipótesis. Todas las citas de este informe salen de mi propia descarga.

**Fuentes primarias:** las he descargado yo el 2026-10-27 en una carpeta aislada (HTTP 200, `application/pdf`) y las he extraído con `pdftotext -layout`. Los números de línea corresponden a esa extracción.

| Ficha | SHA-256 del PDF | Revisión del RCM |
|---|---|---|
| 3212 ESP, spot-on con permetrina | `4346656d7bcd78887fdf1bd7409228481aae8cd3cda19257a0bd363847e1bf48` | 09/2026 |
| 1326 ESP, collar con deltametrina (para perros de razas pequeñas) | `a934544570ce4f864eecc7515d752ba4a0b2892d69c16a14e2b8d19372fa3318` | 05/2025 |

Los hashes coinciden con los del expediente.

**Lo que no he comprobado:**
- No he hecho una auditoría completa del artículo. Fuera del H2 «Protegerlo de los flebotomos» y de la FAQ, no he revisado nada más.
- No he verificado la URL pública en producción: el cambio no está fusionado. Solo he validado en local (build y `dist/`).
- No he revisado fichas de otros collares o pipetas del mercado. Las generalizaciones del texto («las fichas de estos productos», «los collares con deltametrina») las he contrastado únicamente con las dos fichas citadas.
- No he revisado imágenes, porque el diff no las toca.

## Veredicto

**APROBADO.** Los tres hallazgos están cerrados, no hay regresiones y ninguna línea cambiada abre un P0 o un P1. Dejo anotados tres P2 que no bloquean y varios diferidos para que el propietario decida.

## Hallazgos de origen: criterio de cierre

| ID | Criterio de cierre | Evidencia (texto auditado) | Estado |
|---|---|---|---|
| LEI-A-101 (P2) | El aviso de gatos nombra la permetrina y la deltametrina | Líneas 306–307. Título: «Antiparasitarios para perros: precaución con los gatos». Cuerpo: «La permetrina presente en productos antiflebotomos para perros es muy tóxica para los gatos. Los collares con deltametrina tampoco se usan en gatos.» | **Cerrado** |
| LEI-A-102 (P1) | Un grep de «niños» en el H2 de prevención devuelve la frase, atribuida a las fichas | Entre las líneas 241 y 313, `grep -c niños` da 1 línea, la 247: «Las fichas de estos productos traen también precauciones para las personas de casa: que los niños no jueguen con el collar y que el perro no duerma con vosotros el día de aplicar la pipeta, sobre todo con los niños.» | **Cerrado** |
| LEI-A-103 (P2) | La precaución ambiental aparece remitida a la ficha | Línea 253: «…las fichas piden además evitar que se bañe en ríos o estanques tras la pipeta o con el collar puesto, porque dañan a los peces, y cada una indica los días concretos.» | **Cerrado** (con el P2 R1-02 de abajo, que no bloquea) |

## Cada línea cambiada frente a la ficha

| Línea (auditada) | Frase nueva | Texto de la ficha | Resultado |
|---|---|---|---|
| 247 | «que los niños no jueguen con el collar» | 1326 §3.5, l. 98–99: «No se debe permitir que los niños jueguen con el collar o lo introduzcan en su boca.» | Fiel. Omite «o lo introduzcan en su boca», pero la remisión a la ficha lo cubre. No afirma más que la ficha. |
| 247 | «que el perro no duerma con vosotros el día de aplicar la pipeta, sobre todo con los niños» | 3212 §3.5, l. 95–96: «Los animales tratados no deben dormir con sus propietarios el día del tratamiento, especialmente con los niños.» | Fiel, casi literal. |
| 247 | «Las fichas de estos productos traen también precauciones para las personas de casa» / «Síguelas tal como las indique la ficha de tu producto concreto.» | Las dos fichas tienen en §3.5 un apartado de «Precauciones específicas que debe tomar la persona que administre…» | Fiel. La generalización a «estos productos» queda acotada por la remisión a la ficha concreta. |
| 253 | «evitar que se bañe en ríos o estanques tras la pipeta» | 3212 §3.5, l. 101–102: «Los perros no deben bañarse en cursos de agua durante los 2 días siguientes a la aplicación.» | Fiel en lo esencial. «Estanques» no aparece en la 3212 («cursos de agua»), pero la 1326 abarca cualquier baño o nado. No amplía la obligación. Ver P2 R1-01. |
| 253 | «o con el collar puesto» (desviación declarada) | 1326 §3.5, l. 111–113: el collar «debe retirarse siempre antes de que el perro nade o se bañe […] Debe evitarse que los perros naden o se bañen durante los 5 primeros días de llevar puesto el collar.» | **Fiel.** «Con el collar puesto» no dice más que la ficha. Recoge el «siempre» con más precisión que «recién puesto», que habría limitado la precaución a cinco días. La desviación respecto de la instrucción está justificada. Ver la ambigüedad residual en P2 R1-02. |
| 253 | «porque dañan a los peces» | 1326 l. 112–113: «peligrosa para peces y otros organismos acuáticos»; 3212 §3.5 l. 101: «puede tener efectos adversos en los organismos acuáticos»; 3212 §5.5 l. 243: «peligrosa para los peces y otros organismos acuáticos». | Fiel en el fondo: las dos fichas nombran a los peces. «Dañan» es algo más categórico que «puede tener efectos adversos». Es un P2 de matiz y no bloquea. |
| 253 | «y cada una indica los días concretos» | 3212: 2 días; 1326: 5 días | Fiel. Remite a la ficha sin trasladar las cifras al texto, como se pidió. |
| 306 | Título «Antiparasitarios para perros: precaución con los gatos» | — | Correcto. Amplía el alcance sin afirmar nada nuevo. |
| 307 | «Los collares con deltametrina tampoco se usan en gatos.» | 1326 §3.3, l. 71: «No usar en gatos.» | Fiel. No atribuye a la deltametrina una toxicidad que la ficha no describe. Es la contraindicación, formulada en tono descriptivo. |
| 331 | Bibliografía: «Resumen de las características de un medicamento veterinario: collar con deltametrina para perros». Nota: «Contraindicación en gatos y precauciones para personas y medio ambiente.» | PDF: «RESUMEN DE LAS CARACTERÍSTICAS DEL MEDICAMENTO», «… collar para perros de razas pequeñas» | La URL abre (200, PDF). El título descriptivo es correcto y sin marca, con el mismo patrón que la entrada 3212. La nota coincide con §3.3 y §3.5. Ver P2 R1-03. |

## Regresiones

Ninguna.

- **Marcas, dosis y duraciones:** dentro del H2, un grep de marcas comerciales y de `[0-9]+ (días|mg|ml|semanas|meses)` no da resultados. La única aparición de «días» es «los días concretos», sin cifra. Ni el 2 ni el 5 de las fichas pasan al texto.
- **Aviso de gatos, lavado y consulta:** la línea 312 se mantiene sin cambios: «la ficha indica lavarlo con champú o jabón y consultar inmediatamente con un veterinario». También se mantienen el párrafo del lamido (línea 310) y la indicación de llamar con el envase a mano.
- **FAQ 6:** no se ha modificado y sigue siendo coherente con el aviso. «No utilices en el gato un producto para perros» cubre también el collar, y la consulta inmediata ante una exposición sigue ahí. No hay contradicción.
- **Español de España:** «vosotros» en la línea 247 y tuteo («Síguelas»), en línea con el resto del artículo («convivís», «vuestra zona»). No hay «usted» ni voseo, y no he visto americanismos en las líneas nuevas.
- **Ámbito del diff:** `git diff origin/main...HEAD --stat` toca solo dos archivos: el MDX (+6/−3) y `docs/contenido/leishmaniosis-perros-mayores/correccion-fichas-2026-10-27.md` (+140).

## Hallazgos nuevos (todos P2, no bloquean)

- **R1-01 (P2). «Ríos o estanques».** Línea 253. La 3212 dice «cursos de agua»; la 1326, «nade o se bañe», sin ceñirlo a un lugar. Los ejemplos se entienden y no amplían la obligación. Si se retoca, una opción más fiel es «en ríos, embalses u otras aguas».
- **R1-02 (P2). Alcance temporal del collar.** Línea 253. La cláusula «cada una indica los días concretos» puede leerse como si la restricción del collar durase solo unos días. La ficha 1326 pide retirarlo **siempre** antes del baño o del nado, y además evitar el baño los cinco primeros días. «Con el collar puesto» ya es correcto. La ambigüedad tiene consecuencias ambientales, no para la salud del perro ni de las personas, así que no llega a P1. Retoque posible: «…tras la pipeta los días que indique su ficha, y quitarle el collar antes de que se bañe…».
- **R1-03 (P2). Formato bibliográfico.** Línea 331. Lleva dos puntos tras «veterinario» y la entrada 3212 no. El expediente ya lo señala. Es una cuestión de estilo.

## Barrido P0 del H2 «Protegerlo de los flebotomos» y de la FAQ

No hay ningún P0. No aparecen dosis ni pautas, ni marcas, ni datos inventados en las líneas que he contrastado. No se ha borrado ningún aviso: se mantienen el lavado del gato, la consulta inmediata, el lamido y la mención de los gatos en las mosquiteras con piretroides. Las urgencias del gato siguen en el cuerpo y en la FAQ 6.

### Diferidos (sin discusión; texto no modificado o fuera del alcance autorizado)

- La ficha 1326 §3.5 también pide «evitar un contacto prolongado con el collar o con el perro que lleve el collar». Ninguna de las dos fichas trasladadas menciona la hipersensibilidad a piretroides ni la consulta médica si hay síntomas tras la exposición. El corrector dejó fuera lo primero de forma declarada, ajustándose a la corrección autorizada. Bajo el contrato propuesto («cada producto recomendado aporta sus precauciones de ficha») el propietario podría considerarlo una omisión. Es su decisión y no lo abro como hallazgo de esta ronda.
- La FAQ 6 solo nombra la permetrina. No contradice el aviso, pero podría mencionar el collar.
- La línea 245 cita como opciones «collares con deltametrina y pipetas con permetrina», y la ficha 1326 consultada es la presentación para razas pequeñas. No afecta a lo afirmado, pero conviene tenerlo en cuenta si se citan cifras del collar.

## Comprobaciones mecánicas

| Comprobación | Resultado |
|---|---|
| `python3 -I .agents/skills/references/scripts/tono.py src/content/blog/leishmaniosis-perros-mayores.mdx` | 4.015 palabras, 0 muletillas, 0,0/1000 (umbral ≤ 3) |
| `npx astro build` | Código de salida 0, «Complete!» |
| Proyección Markdown `dist/client/agent-content/v1/documents/article--leishmaniosis-perros-mayores.md` | Contiene las frases de las líneas 247 y 253, el título nuevo del aviso, la frase de la deltametrina y el enlace 1326 ESP. El lavado con champú o jabón se mantiene (línea 400 de la proyección). |
| HTML `dist/client/salud-perros-mayores/leishmaniosis-perros-mayores.html` | Contiene «deltametrina tampoco» y `href` a `1326%20ESP/1326%20ESP.pdf` |
| `git diff origin/main...HEAD --stat` | 2 archivos: el MDX y el expediente |

## Lo que sí funciona

- Las cuatro adiciones salen literalmente de las dos fichas oficiales y no traen cifras, marcas ni pautas.
- La desviación «con el collar puesto» es una mejora real: refleja el «siempre» de la ficha, que «recién puesto» habría perdido.
- El aviso de gatos no atribuye a la deltametrina una toxicidad que la ficha no describe: se limita a la contraindicación.
- Cada frase nueva remite a la ficha del producto concreto, así que el lector sabe dónde está el detalle sin que el artículo se convierta en un prospecto.
- El expediente del corrector es trazable: hashes, líneas y citas coinciden con mi propia descarga.

## Pendiente

- Aprobación del propietario antes de fusionar: `main` despliega a producción.
- Tras el despliegue, comprobar la URL pública. No lo he hecho en esta auditoría.
