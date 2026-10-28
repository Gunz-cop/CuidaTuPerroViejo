# Auditoría independiente de la corrección de antiparasitarios — R2 (delta)

| Campo | Valor |
|---|---|
| Fecha | 28 de octubre de 2026 |
| Ronda | R2 de máximo 3, alcance delta `b868aa7` → `8af705e` (PR #155, rama `claude/leishmaniosis-p2-antiparasitarios`). Ver «Discrepancias de registro»: la rama ya contiene otro informe R2 sobre el mismo hash |
| Rol | Auditor independiente. No hice la R1, ni la corrección, ni el informe `auditoria-correccion-p2-r2.md`. No corrijo nada: este informe es el único archivo que escribo |
| Documento | `src/content/blog/leishmaniosis-perros-mayores.mdx` |
| Versión de partida | `b868aa7`. SHA-256 recalculado con `git show b868aa7:… \| sha256sum`: `871ff7fadc0fa352e9e2cd809fd8dd6c5b0b2fe8ee2310d50cb54ac743788d18`, **coincide**. `origin/main` (`a3fc5f9`, merge del informe R1) tiene el mismo MDX |
| Versión auditada | `8af705e` (= MDX de `HEAD`). SHA-256 recalculado sobre el objeto git y sobre el archivo de trabajo: `7d67b72bb25c17ce323591dc3b2c08cb8599d4083ad5b8ea1c1440509e6a33cb`, **coincide** con lo declarado |
| Informe de origen | `docs/contenido/leishmaniosis-perros-mayores/auditoria-correccion-antiparasitarios-r1.md` (en `main`) |
| Expediente del corrector | `docs/contenido/leishmaniosis-perros-mayores/correccion-p2-2026-10-28.md`, tratado como hipótesis |
| Fichas | CIMAVet 1326 ESP (collar con deltametrina, 5 págs., ModDate 17/01/2026), PDF SHA-256 `a934544570ce4f864eecc7515d752ba4a0b2892d69c16a14e2b8d19372fa3318`. CIMAVet 3212 ESP (spot-on con permetrina), PDF SHA-256 `4346656d7bcd78887fdf1bd7409228481aae8cd3cda19257a0bd363847e1bf48`. Descargadas el 28/10/2026 (HTTP 200, `application/pdf`), cada una en una carpeta nueva y vacía, extraídas con `pdftotext -layout` y leídas con `python3 -I` desde scripts en otra carpeta. Hashes idénticos a los de la R1 |
| Método | `auditar-articulo-blog` en modo delta; `calidad-editorial-adsense.md` §4 y §6; guía de voz y tono, excepción serie España |

**Qué no se ha comprobado:** la URL pública (el PR no está fusionado), la parte visual (el diff solo cambia texto), el brief y su contrato (no se reabren) y fichas de otros productos. Este informe no es una revisión veterinaria ni médica.

## Veredicto

**APROBADO.** 0 P0 y 0 P1 abiertos, en regresión o sin verificar. LEI-A-104, LEI-A-105 y LEI-A-108 están cerrados. Hay dos P2 nuevos abiertos sobre texto modificado (LEI-A-R2-01 y LEI-A-R2-02) y uno diferido. Ninguno bloquea.

## 1. Alcance del diff

`git diff --stat origin/main...HEAD` (base de fusión `b868aa7`):

| Archivo | Cambio | ¿Esperado? |
|---|---|---|
| `src/content/blog/leishmaniosis-perros-mayores.mdx` | 3 líneas sustituidas (257, 259, 314) | Sí |
| `docs/…/articulo-borrador.mdx` | Las mismas 3 | Sí |
| `docs/…/articulo-lectura.md` | Las mismas 3 sustituciones; el título aparece como `###` | Sí |
| `docs/…/correccion-p2-2026-10-28.md` | Nuevo (64 líneas) | Sí |
| `docs/…/auditoria-correccion-p2-r2.md` | Nuevo (112 líneas), commit `c122bc3` | **No.** Es otro informe R2 sobre el mismo hash. No afecta al sitio. Ver «Discrepancias de registro» |

`git diff --word-diff` confirma que en el contenido solo cambian las tres frases.

## 2. Criterios de cierre

| ID | Criterio (R1) | Evidencia en `8af705e` | Estado |
|---|---|---|---|
| LEI-A-104 | `grep -n 'title="Antiparasitarios para perros' <mdx>` devuelve el AlertBox de gatos | `314:<AlertBox type="warning" title="Antiparasitarios para perros: precaución con los gatos">`, bajo `### Si convivís con un gato`. El cuerpo (l. 315 y 317) no cambia | **cerrado** |
| LEI-A-105 | «alergia conocida a la deltametrina» aparece una vez en el H2 de prevención | Una sola coincidencia en todo el MDX, en la l. 257, dentro de `## Protegerlo de los flebotomos…` (l. 241-323) | **cerrado** |
| LEI-A-108 | La frase de los organismos acuáticos ya no contiene «peces» | `259:Protege también a los organismos acuáticos. …`. «peces» no aparece en el MDX | **cerrado** |

Sin regresión en los cerrados en R1 (LEI-A-101 a 103): las frases de niños (l. 255 y 257), las restricciones de agua (l. 259 y 261) y el aviso de gatos con permetrina y deltametrina (l. 315 y 317) siguen ahí.

## 3. Contraste con la ficha 1326 ESP §3.5

Texto de la ficha extraído (§3.5, persona que administra):

> «Este medicamento veterinario puede causar reacciones de hipersensibilidad (alergia) que, en ocasiones, pueden ser graves. Las personas con hipersensibilidad conocida a la deltametrina deben evitar todo contacto con el medicamento veterinario y el perro tratado.»
> «Manipule el collar con precaución […]. No fumar, comer o beber mientras se maneja el collar. No se debe permitir que los niños jueguen con el collar o lo introduzcan en su boca. Deshacerse de inmediato de cualquier resto o parte cortada del collar. Lávese las manos con agua fría después de manipular el collar. Evitar un contacto prolongado con el collar o con el perro que lleve el collar.»
> Medio ambiente: «la sustancia activa es peligrosa para peces y otros organismos acuáticos».

| Frase nueva | Resultado |
|---|---|
| l. 257: «Si alguien de casa tiene alergia conocida a la deltametrina, la ficha indica evitar el contacto con el collar y con el perro que lo lleva.» | **No afirma más que la ficha.** «Alergia» es la glosa de la propia ficha. «Collar» corresponde al medicamento y «el perro que lo lleva» al perro tratado. Omite «todo» y limita a «alguien de casa», así que dice menos, no más. Está en el párrafo que enlaza el PDF 1326, así que la atribución es inequívoca |
| l. 259: «Protege también a los organismos acuáticos.» | **Fiel.** Introduce el párrafo del spot-on, y 3212 §3.5 dice «La permetrina puede tener efectos adversos en los organismos acuáticos». También es compatible con 1326 §3.5, que dice «peces y otros organismos acuáticos». Ya no presta a la ficha del spot-on un término de la otra |
| l. 314: «Antiparasitarios para perros: precaución con los gatos» | **Fiel.** No aporta datos. Resume el cuerpo, donde 3212 §3.3 y 1326 §3.3 dicen «No usar en gatos». No generaliza la toxicidad a todo antiparasitario: solo pide precaución |

El expediente acierta en todo lo que afirma sobre la fuente.

## 4. Regresiones

| Pregunta | Resultado |
|---|---|
| ¿Se perdió una remisión necesaria al eliminar «Sigue también sus precauciones de contacto»? | **Sí, se perdió la única remisión explícita a las precauciones de contacto para quien no es alérgico:** manipular con precaución, lavarse las manos, no fumar, comer ni beber y evitar el contacto prolongado. La R1 contaba con esa remisión para rebajar LEI-A-106. Además, el párrafo ahora presenta la precaución como si solo afectara a los alérgicos, cuando la ficha avisa de que el producto puede causar reacciones en cualquier persona. **No llega a P1.** El enlace al RCM sigue en la misma frase. El H2 conserva otras cuatro remisiones a la ficha del producto (l. 247, 249, 251 y 261). Son medidas de higiene generales, y ante síntomas graves cualquier lector busca atención urgente (argumento de la R1 para LEI-A-106, que sigue valiendo). Se registra como **LEI-A-R2-01 (P2, abierto)** |
| ¿Se mantienen el lavado con champú o jabón y la consulta inmediata? | Sí, la l. 322 no cambia: «la ficha indica lavarlo con champú o jabón y consultar inmediatamente con un veterinario». Aparece una vez en el HTML y una en la proyección Markdown |
| ¿La FAQ 6 sigue siendo coherente? | Sí. La l. 354 no cambia y empieza con «No utilices en el gato un producto para perros». El título nuevo está más alineado con ella que el anterior. Que la FAQ solo nombre la permetrina sigue siendo LEI-A-107, diferido |
| ¿Hay marcas comerciales o dosis? | No hay marcas en las líneas cambiadas. Las únicas cifras están en la URL (`1326`). No hay cantidades, frecuencias ni inicio o suspensión de tratamiento. Es una precaución de ficha atribuida, compatible con §4 |
| ¿Español de España, tú/vosotros? | Sí: «alguien de casa», «Protege», sin usted, ustedes ni voseo |
| ¿Copias sincronizadas? | `articulo-borrador.mdx`: `cmp` sin diferencias y mismo SHA-256. `articulo-lectura.md`: el `--word-diff` contra `b868aa7` muestra exactamente las tres sustituciones |

## 5. Mecánica

| Comprobación | Resultado |
|---|---|
| `metricas.mjs leishmaniosis-perros-mayores` | **Total 5.229** (contrato 3.868–5.232): OK, a 3 palabras del máximo. Densidad: media 38, mediana 39, máximo 73, >50 palabras **2 %** (la R1 medía 1 %, ver LEI-A-R2-02). «NO APTO» por los mismos 3 bloqueos de formato registrados en la R1 (targets por sección, AlertBox de fuentes y tabla de fuentes no interpretables). Ninguno es nuevo |
| `tono.py` | 4.100 palabras, 0 muletillas, **0,0/1000** (límite 3) |
| `npx astro build` | Código 0, «Complete!». Proyección agent-content: 37 documentos |
| Proyección Markdown (`dist/client/agent-content/v1/documents/article--leishmaniosis-perros-mayores.md`) y HTML | «alergia conocida a la deltametrina» 1/1; título nuevo 1/1; «Protege también a los organismos acuáticos» 1/1; «champú o jabón y consultar inmediatamente» 1/1; «peces y otros» 0/0; «Permetrina: precaución especial» 0/0; «Sigue también sus precauciones» 0/0 |
| `git status` tras el build | Limpio |

## 6. Barrido acotado a P0 (l. 241-323 y FAQ)

No hay dosis. La toxicidad para gatos y la consulta inmediata siguen ahí. No hay datos inventados ni avisos de urgencia borrados. **Ningún P0.**

## 7. Hallazgos nuevos

| ID | Sev. | Localización | Hallazgo y evidencia | Corrección propuesta y cierre |
|---|---|---|---|---|
| LEI-A-R2-01 | P2, abierto (texto modificado) | l. 257 | Se eliminó la remisión «Sigue también sus precauciones de contacto». Ahora el párrafo solo da la precaución para alérgicos, y la ficha 1326 §3.5 da también precauciones para cualquier persona: lavarse las manos con agua fría y evitar el contacto prolongado con el collar o con el perro. Ver §4 | Añadir al final del párrafo: «Lávate las manos después de tocarlo y evita el contacto prolongado.» (+10 palabras). Hay que compensar al menos 7 palabras en el mismo H2 para no pasar de 5.232. Cierre: `grep -c "Lávate las manos"` = 1 en el H2 de prevención y `metricas.mjs` ≤ 5.232. Si se aplica LEI-A-106, puede ir en la misma frase |
| LEI-A-R2-02 | P2, abierto (texto modificado) | l. 257 | El párrafo pasa de 32 a 52 palabras (sin contar la URL) y es el que hace subir «>50 palabras» del 1 % al 2 % | Partir el párrafo antes de «Si alguien de casa…» (0 palabras). Cierre: ningún párrafo del H3 «Precauciones en casa y en el agua» pasa de 50 palabras |

## 8. Diferidos

- **LEI-A-107** (P2, heredado): la FAQ 6 solo nombra la permetrina.
- **LEI-A-R2-03** (P2, texto no modificado, l. 255): al nombrar la alergia a la deltametrina solo en el párrafo del collar, falta la precaución equivalente del spot-on. La ficha 3212 §3.5 dice: «Las personas con hipersensibilidad conocida a piretroides deben evitar todo contacto con el medicamento veterinario». Era la mitad de LEI-A-105 en la R1 que su criterio de cierre no exigía.

Siguen abiertos LEI-A-106 y LEI-A-109 de la R1, que el propietario no autorizó.

## 9. Discrepancias de registro

- **Doble R2.** La rama ya contiene `docs/contenido/leishmaniosis-perros-mayores/auditoria-correccion-p2-r2.md` (commit `c122bc3`, 28/10/2026 06:18 UTC), otro informe R2 sobre el mismo hash `7d67b72b…`. También da APROBADO y sus hallazgos LEI-A-110, 111 y 112 se corresponden con LEI-A-R2-03, R2-02 y R2-01 de este informe. No lo leí antes de hacer mis propias comprobaciones, pero lo vi al revisar el diff. `calidad-editorial-adsense.md` §6 prohíbe «abrir rondas ocultas». Las dos rondas auditan la misma versión y llegan al mismo veredicto. **El propietario debe decidir** si cuentan como una sola R2 o si la siguiente auditoría de este documento es ya la R3, la última.
- **Sección de AGENTS.md.** El encargo pide leer la sección «Cambios en `main`» de `AGENTS.md`. Esa sección no existe ni en `main` (`a3fc5f9`) ni en esta rama. Se aplicaron las reglas que sí existen: `main` despliega a producción y no se toca.
- **Base del expediente.** El expediente cita la R1 en la rama `claude/auditoria-leishmaniosis-b868aa7` (PR #153). Hoy ya está fusionada en `main` (`a3fc5f9`). No afecta al contenido.

## 10. Pendientes

- Tras fusionar y desplegar: comprobar en la URL pública el título nuevo, la frase de alergia y que «peces y otros» no aparece. Aquí solo se ha validado en local.
- Margen de volumen: 3 palabras. Cualquier P2 que añada texto tiene que compensarse.
- Cualquier cambio en el texto necesita su auditoría delta sobre el nuevo hash, y puede ser la última ronda permitida (ver §9).
