# Auditoría independiente de la corrección P2 de antiparasitarios — R2 (delta)

| Campo | Valor |
|---|---|
| Fecha | 28 de octubre de 2026 |
| Ronda | R2 de máximo 3, alcance delta `b868aa7` → `8af705e` (PR #155, rama `claude/leishmaniosis-p2-antiparasitarios`) |
| Rol | **Rol: auditoría independiente delta R2, no corrección.** No participé en el informe R1 ni en la corrección. No he modificado ningún archivo del repositorio; este informe es el único archivo que escribo |
| Documento | `src/content/blog/leishmaniosis-perros-mayores.mdx` |
| Versión de partida | `b868aa7` (= `origin/main`), SHA-256 `871ff7fadc0fa352e9e2cd809fd8dd6c5b0b2fe8ee2310d50cb54ac743788d18` (recalculado con `git show b868aa7:… \| sha256sum`: **coincide**) |
| Versión auditada | `8af705e` (padre `b868aa7`), SHA-256 `7d67b72bb25c17ce323591dc3b2c08cb8599d4083ad5b8ea1c1440509e6a33cb` (recalculado sobre el objeto git y sobre el archivo de trabajo: **coincide con el expediente**) |
| Informe de origen | `docs/contenido/leishmaniosis-perros-mayores/auditoria-correccion-antiparasitarios-r1.md` en `origin/claude/auditoria-leishmaniosis-b868aa7` |
| Expediente del corrector | `docs/contenido/leishmaniosis-perros-mayores/correccion-p2-2026-10-28.md` (tratado como afirmaciones a verificar) |
| Fichas contrastadas | CIMAVet 1326 ESP (collar con deltametrina, 5 páginas), PDF SHA-256 `a934544570ce4f864eecc7515d752ba4a0b2892d69c16a14e2b8d19372fa3318`; CIMAVet 3212 ESP (spot-on con permetrina), PDF SHA-256 `4346656d7bcd78887fdf1bd7409228481aae8cd3cda19257a0bd363847e1bf48`. Descargadas el 2026-10-28 (HTTP 200, `application/pdf`) en una carpeta nueva y vacía, extraídas con `pdftotext -layout` y leídas con `python3 -I`. Ambos hashes son idénticos a los del R1: las fichas no han cambiado desde el 27/10 |
| Método | `auditar-articulo-blog` en modo delta, `calidad-editorial-adsense.md` §4 y §6, guía de voz y tono (excepción serie España) |

**Qué no se ha comprobado:** la URL pública (el PR #155 no está fusionado; `origin/main` sigue en `b868aa7`), la auditoría visual de componentes (el diff solo cambia texto), el brief y su contrato (no se reabren), otras fichas de productos con permetrina o deltametrina distintas de las dos citadas. Este informe no es una revisión veterinaria ni médica.

## Veredicto

**APROBADO con P2 abiertos.** 0 P0 y 0 P1 abiertos, en regresión o sin verificar. Los tres IDs corregidos (LEI-A-104, LEI-A-105 y LEI-A-108) cumplen su criterio de cierre y ninguna frase nueva dice más que su ficha. Siguen abiertos los P2 heredados LEI-A-106 y LEI-A-109, el diferido LEI-A-107, y tres P2 nuevos (LEI-A-110, LEI-A-111 y LEI-A-112) originados por la redacción de LEI-A-105. Ninguno bloquea.

## Criterios de cierre

| ID | Sev. | Criterio de cierre (R1) | Evidencia en `8af705e` | Estado |
|---|---|---|---|---|
| LEI-A-104 | P2 | `grep -n 'title="Antiparasitarios para perros' <mdx>` devuelve la l. 314 | `314:<AlertBox type="warning" title="Antiparasitarios para perros: precaución con los gatos">`. Texto idéntico al propuesto por el R1. El cuerpo del aviso (l. 315 y 317) no cambia y trata permetrina y deltametrina | **cerrado** |
| LEI-A-105 | P2 | `grep -c "alergia conocida a la deltametrina"` = 1 en el H2 de prevención | 1 coincidencia, l. 257, dentro de `## Protegerlo de los flebotomos` (l. 241-322). Frase idéntica a la propuesta por el R1 | **cerrado** (ver LEI-A-110, 111 y 112) |
| LEI-A-108 | P2 | La frase de la l. 259 no contiene «peces» | `259:Protege también a los organismos acuáticos. La ficha del spot-on citado…`. `grep -c peces` en el MDX = 0 | **cerrado** |

Ninguno de los IDs cerrados en R1 (LEI-A-101 a 103) muestra regresión: el aviso de gatos sigue nombrando permetrina y deltametrina, las frases de niños (l. 255 y 257) siguen presentes y atribuidas, y las restricciones de agua de la l. 259 y 261 no cambian salvo la frase introductoria.

## Contraste con las fichas

| Línea | Texto nuevo | Texto de la ficha | Resultado |
|---|---|---|---|
| 257 (2.ª frase) | «Si alguien de casa tiene alergia conocida a la deltametrina, la ficha indica evitar el contacto con el collar y con el perro que lo lleva.» | 1326 §3.5: «Este medicamento veterinario puede causar reacciones de hipersensibilidad (alergia) que, en ocasiones, pueden ser graves. Las personas con hipersensibilidad conocida a la deltametrina deben evitar todo contacto con el medicamento veterinario y el perro tratado.» | **Fiel, no dice más.** «Alergia» es la glosa de la propia ficha. «El collar» = el medicamento; «el perro que lo lleva» = el perro tratado. Omite «todo» y restringe a «alguien de casa»: es algo menos amplia que la ficha, no más. No transmite la gravedad («en ocasiones, pueden ser graves»), lo que no supone afirmar de más. La frase queda en el párrafo enlazado al PDF 1326, así que la atribución es inequívoca |
| 259 (1.ª frase) | «Protege también a los organismos acuáticos.» | 3212 §3.5: «La permetrina puede tener efectos adversos en los organismos acuáticos». 1326 §3.5: «peligrosa para peces y otros organismos acuáticos». (3212 §5 y 1326 §5 también mencionan peces, en el apartado de eliminación) | **Fiel.** Es la forma común a las dos fichas y ya no atribuye a la del spot-on un término que en su §3.5 no aparece |
| 314 (título) | «Antiparasitarios para perros: precaución con los gatos» | 3212 §3.3: «No usar en gatos. La administración a gatos puede provocar acontecimientos adversos graves e incluso la muerte». 1326 §3.3: «No usar en gatos» | **Fiel.** El título no aporta datos; resume el cuerpo y coincide con la primera frase de la FAQ 6 («No utilices en el gato un producto para perros»). No generaliza toxicidad a todos los antiparasitarios: solo pide precaución |

**Ninguna frase nueva dice más que su ficha.** Las afirmaciones del expediente sobre la fuente (§3.5 de 1326, glosa «alergia», sentido menos amplio) son correctas.

## Verificación del expediente del corrector

| Afirmación del expediente | Comprobación | Resultado |
|---|---|---|
| SHA-256 de partida `871ff7fa…88d18` y resultante `7d67b72b…6a33cb` | Recalculados | Correctas |
| Total 5.229 palabras; +1 / +20 / −3 por ID | `metricas.mjs` sobre `8af705e` = 5.229; sobre `b868aa7` (exportado con `git archive` a una raíz aislada) = 5.211. Δ +18 = +1 + 20 − 3; la frase sustituida tiene 6 palabras y la nueva 26 | Correctas. La estimación «+11» del R1 era errónea; el expediente lo señala con razón |
| «Ninguna otra línea modificada» | `git diff --numstat`: 3/3 en el MDX, 3/3 en el borrador, 3/3 en la lectura, +64 en el expediente nuevo; nada fuera de `docs/contenido/leishmaniosis-perros-mayores/` y el MDX. `--word-diff` muestra solo las tres sustituciones | Correcta |
| Borrador idéntico byte a byte | `cmp` sin diferencias; mismo SHA-256 `7d67b72b…` | Correcta |
| Lectura con las mismas tres sustituciones | `--word-diff` del `.md` = mismas tres sustituciones; el título aparece como `### Antiparasitarios para perros: precaución con los gatos` (l. 404) | Correcta |
| `tono.py` 0,0/1000 | Reproducido (4.100 palabras, 0 muletillas) | Correcta |
| Build y proyección con los cambios | Reproducido (ver Mecánica) | Correcta |

## Regresiones

| Comprobación | Resultado |
|---|---|
| Avisos borrados | Ninguno. Lo único eliminado es «Sigue también sus precauciones de contacto.», «los peces y otros» y «Permetrina:…especial» del título. El aviso de toxicidad de la permetrina para gatos (l. 315), la prohibición del collar en gatos (l. 317), el lamido (l. 320) y el lavado con champú y consulta inmediata (l. 322) están intactos. Pero la frase eliminada era una remisión general a las precauciones de contacto: ver LEI-A-112 |
| Severidad del aviso de gatos | El AlertBox sigue siendo `warning`; el título pierde «especial», pero la primera línea del cuerpo («es muy tóxica para los gatos») no cambia. Sin regresión de seguridad |
| Coherencia con la FAQ | La FAQ (l. 348-356) no cambia. El nuevo título es más coherente con la FAQ 6 que el anterior. Ninguna FAQ habla de alergia de personas ni de peces: no hay contradicciones |
| Marcas comerciales | Ninguna en el texto añadido. Única cifra en líneas nuevas: el `1326` de la URL |
| Dosis y pautas | Ninguna cantidad, frecuencia ni inicio/suspensión de tratamiento. La frase de alergia es una precaución de ficha atribuida, no una pauta (misma distinción que el R1 §3a). Compatible con `calidad-editorial-adsense.md` §4 |
| Español de España, tú/vosotros | «alguien de casa», «Protege», sin «usted/ustedes» ni voseo. Sin americanismos |
| Copias congeladas | `visuales/texto-aprobado-r2.mdx` (l. 279) y `visuales/proyeccion-markdown.md` (l. 392) conservan el título antiguo. Son instantáneas anteriores a `b868aa7` (ni siquiera contienen el H3 de precauciones), registradas con su hash en rondas anteriores; no deben sincronizarse. No es hallazgo |
| Otros archivos | `git status` limpio tras el build (solo `dist/`, `.astro/`, `.wrangler/` ignorados) |

## Barrido acotado a P0 (H2 «Protegerlo de los flebotomos» y FAQ)

Dosis, tóxicos, urgencias, datos inventados y avisos borrados en l. 241-322 y 348-356: **ningún P0.** Ninguna cifra nueva; la toxicidad para gatos y la consulta urgente siguen señaladas.

## Hallazgos nuevos

| ID | Sev. | Localización | Hallazgo | Ruta de daño y por qué no llega a P1 |
|---|---|---|---|---|
| LEI-A-110 | P2 | l. 255 y 257 | Al nombrar solo la «alergia conocida a la deltametrina» en el párrafo del collar, el H3 deja sin mencionar la precaución equivalente del spot-on: 3212 §3.5, «Las personas con hipersensibilidad conocida a piretroides deben evitar todo contacto con el medicamento veterinario». La deltametrina es un piretroide, así que la ficha del spot-on también excluye a esa persona | Una persona alérgica a la deltametrina lee la l. 257, descarta el collar y elige el spot-on de permetrina como alternativa «segura». No llega a P1: la alergia es conocida y la ha diagnosticado un médico; la ficha 3212 está enlazada en la l. 249 y la precaución figura en el prospecto. El R1 ya citaba esta parte de la 3212 dentro de LEI-A-105, pero su criterio de cierre solo exigía la deltametrina |
| LEI-A-111 | P2 | l. 257 | El párrafo pasa de 32 a 52 palabras y supera el umbral de 50. `metricas.mjs`: «>50 palabras» sube de 1 % a 2 %. La spec mobile-first es 30-40 palabras y la guía de voz pide como máximo 3 líneas en el móvil | Legibilidad. No afecta a la seguridad |
| LEI-A-112 | P2 | l. 257 | La sustitución elimina «Sigue también sus precauciones de contacto», la única remisión explícita a las precauciones de contacto para personas sin alergia (1326 §3.5: lavarse las manos con agua fría, evitar el contacto prolongado con el collar o con el perro que lo lleva, no fumar, comer ni beber al manipularlo, desechar los restos cortados). El R1 usó esa remisión como mitigación de LEI-A-106 («La l. 257 remite a las precauciones de contacto de la ficha, que las incluyen»); esa mitigación ya no existe en el texto | Un cuidador sin alergia conocida manipula el collar a menudo y no se lava las manos. No llega a P1: el enlace al RCM sigue en la misma frase, son precauciones de higiene generales, y ante síntomas graves cualquier lector busca atención urgente (argumento principal del R1 para LEI-A-106, que sigue en pie) |

**Observación para el propietario (no es hallazgo):** el total queda en 5.229 palabras, a **3** del máximo del contrato (5.232). Cualquier corrección que añada texto, incluidas LEI-A-106, 109 o 110, tendrá que compensarse dentro del artículo.

## Mecánica

| Comprobación | Resultado |
|---|---|
| `metricas.mjs leishmaniosis-perros-mayores` | Total 5.229 (contrato 3.868–5.232): **OK**. H2-6: 1.197 → 1.215. Densidad: media 38, mediana 39, >50 palabras 1 % → 2 % (LEI-A-111). Veredicto del script «NO APTO» por **3 bloqueos**: targets por sección no interpretables, falta el AlertBox «Fuentes científicas y de autoridad» y tabla de fuentes no interpretable. Los mismos 3 bloqueos aparecen al ejecutar el script sobre `b868aa7` exportado a una raíz aislada: son **preexistentes** (desajuste entre el script y el formato del brief, como ya registró el R1). **Ningún bloqueo nuevo.** El `diff` de ambas salidas solo cambia el total, el H2-6, el % >50 y la media de palabras por H3 (200 → 201) |
| `tono.py` | 4.100 palabras, 0 muletillas, **0,0/1000** (≤ 3). En `b868aa7`: 4.083 palabras, 0,0/1000 |
| `npx astro build` | Código 0 («Complete!»). Proyección agent-content/v1: 37 documentos. Solo avisos de entorno (proxy y bindings de IA), ninguno del contenido |
| Proyección Markdown `dist/client/agent-content/v1/documents/article--leishmaniosis-perros-mayores.md` | «alergia conocida a la deltametrina» = 1; «Antiparasitarios para perros: precaución con los gatos» = 1; «Protege también a los organismos acuáticos» = 1; «peces y otros» = 0; «Permetrina: precaución especial» = 0; «Sigue también sus precauciones» = 0 |
| HTML `dist/client/salud-perros-mayores/leishmaniosis-perros-mayores.html` | Frase de alergia = 1, título nuevo = 1, «peces y otros» = 0 |

## Lo que sí funciona

- Las tres sustituciones son exactamente las que proponía el R1, sin añadidos ni efectos colaterales en otras líneas.
- La frase de alergia es fiel y no refuerza la ficha; además añade lo menos deducible para el lector: evitar también al perro que lleva el collar.
- El título del aviso de gatos ya no anuncia un solo principio activo y está alineado con la FAQ 6.
- «Organismos acuáticos» es la formulación común a las dos fichas y elimina la mezcla de fuentes.
- Las tres copias (MDX, borrador y lectura) están sincronizadas, y el expediente es exacto en todas las afirmaciones comprobadas, incluida la corrección de la estimación del R1.

## Correcciones propuestas para otra sesión (P2, no bloquean)

No hay P0 ni P1, así que nada es obligatorio. Si el propietario decide aplicar los P2, en una sesión distinta de esta:

- **LEI-A-111** (l. 257, 0 palabras): partir el párrafo en dos antes de «Si alguien de casa tiene alergia…». Cierre: ningún párrafo del H3 «Precauciones en casa y en el agua» supera 50 palabras, y `metricas.mjs` vuelve a «>50 palabras: 1 %».
- **LEI-A-110** (l. 255, unas +13 palabras; **hay que compensar**, margen 3): añadir al párrafo del spot-on, por ejemplo, «Su ficha pide que quien tenga alergia conocida a los piretroides evite el contacto con el producto.» Fuente: 3212 §3.5. Cierre: `grep -c "alergia conocida a los piretroides"` = 1 en el H2 de prevención y total ≤ 5.232.
- **LEI-A-112** (opcional, junto con LEI-A-106): si se aplica LEI-A-106, redactarla de forma que remita también a la higiene de contacto, por ejemplo «Lávate las manos después de manipularlo y, si notas síntomas, consulta con un médico y muéstrale el prospecto.» (1326 §3.5). Cierre: `grep -c "Lávate las manos"` ≥ 1 en el H2 y total ≤ 5.232.

Cualquier cambio en el texto exige su propia auditoría delta sobre el nuevo hash. Sería la **R3, última ronda** permitida para este documento según `calidad-editorial-adsense.md` §6: si fallara, habría que detenerse y consultar al propietario. Por eso, y porque ninguno de los P2 bloquea, conviene valorar si compensa abrir otra ronda.

## Pendientes

- Tras fusionar el PR #155 y desplegar: verificar la URL pública `https://cuidatuperroviejo.com/salud-perros-mayores/leishmaniosis-perros-mayores` (HTTP 200, título nuevo del aviso, frase de alergia, ausencia de «peces y otros»). En esta auditoría solo se validó en local.
- P2 abiertos: LEI-A-106, 109, 110, 111 y 112. Diferido: LEI-A-107.
