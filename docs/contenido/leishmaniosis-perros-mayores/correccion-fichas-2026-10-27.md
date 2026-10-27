# Corrección LEI-A-101, LEI-A-102 y LEI-A-103: precauciones de fichas

**Rol: corrección, no auditoría.** Este expediente describe lo cambiado y dónde está la evidencia. El veredicto lo emite una auditoría delta independiente, en otra sesión.

- Fecha: 2026-10-27. Autorización del propietario: 2026-10-27.
- Archivo: `src/content/blog/leishmaniosis-perros-mayores.mdx`.
- SHA-256 de partida (`main`, 65287ab): `f449151f705f33b2493ccaa9816e9ce4ba78bfbf9b533ff1dffbab603ebb0220`. Comprobado antes de editar: coincide.
- SHA-256 resultante: `98573cf2f474082a2fd7197a41aef21f40d911678be72b32716176708a0b4698`.
- Hallazgos de origen: `docs/proceso-editorial/propuesta-2026-10-26/pruebas/leishmaniosis-articulo.yaml`, rama `claude/propuesta-proceso-editorial` (PR #151).
- Alcance: solo el H2 «Protegerlo de los flebotomos» y una entrada bibliográfica. No se han tocado imágenes, componentes, FAQ ni otras fuentes.

## Fuentes primarias consultadas

Descargadas de CIMAVet el 2026-10-27 y extraídas con `pdftotext -layout`. Las líneas indicadas son las de esa extracción.

| Ficha | URL | SHA-256 del PDF | Última revisión del RCM |
|---|---|---|---|
| 3212 ESP, spot-on con permetrina | https://cimavet.aemps.es/cimavet/pdfs/es/ft/3212%20ESP/3212_ESP_ft.pdf | `4346656d7bcd78887fdf1bd7409228481aae8cd3cda19257a0bd363847e1bf48` | 09/2026 |
| 1326 ESP, collar con deltametrina | https://cimavet.aemps.es/cimavet/pdfs/es/ft/1326%20ESP/1326%20ESP.pdf | `a934544570ce4f864eecc7515d752ba4a0b2892d69c16a14e2b8d19372fa3318` | 05/2025 |

Ninguno de los tres hallazgos queda en disputa: las fichas contienen las tres precauciones.

## LEI-A-101 (P2): el aviso de gatos solo nombraba la permetrina

**Líneas:** 304–305 antes; 306–307 después.

**Antes**

```
<AlertBox type="warning" title="Permetrina: precaución especial con los gatos">
La permetrina presente en productos antiflebotomos para perros es muy tóxica para los gatos. No apliques al gato un producto para perros. Antes de usarlo, lee la ficha y consulta una opción compatible con todos los animales de casa.
```

**Después**

```
<AlertBox type="warning" title="Antiparasitarios para perros: precaución con los gatos">
La permetrina presente en productos antiflebotomos para perros es muy tóxica para los gatos. Los collares con deltametrina tampoco se usan en gatos. No apliques al gato un producto para perros. Antes de usarlo, lee la ficha y consulta una opción compatible con todos los animales de casa.
```

**Fuente:** ficha 1326 ESP, §3.3 «Contraindicaciones», página 2 del PDF, línea 71 de la extracción: «No usar en gatos.»

**Lo que se conserva:** el resto del aviso, los dos párrafos siguientes (lamido y lavado con champú o jabón) y la FAQ 6. La FAQ 6 dice «No utilices en el gato un producto para perros. La permetrina es extremadamente tóxica para los gatos…». No contradice el aviso nuevo, así que no se ha modificado.

**Criterio de cierre:** el aviso de gatos nombra la permetrina y la deltametrina.

## LEI-A-102 (P1): faltaban las precauciones de las fichas para las personas de casa

**Líneas:** se insertan las líneas 247–248 (párrafo nuevo y línea en blanco), tras la línea 245, que nombra collares con deltametrina y pipetas con permetrina. Ninguna línea existente cambia.

**Antes:** no existía (búsqueda negativa del registro: «niño», «niña», «dormir con», «jueguen» sin resultados).

**Después** (dos frases)

```
Las fichas de estos productos traen también precauciones para las personas de casa: que los niños no jueguen con el collar y que el perro no duerma con vosotros el día de aplicar la pipeta, sobre todo con los niños. Síguelas tal como las indique la ficha de tu producto concreto.
```

**Fuentes:**

- Ficha 1326 ESP, §3.5 «Precauciones específicas que debe tomar la persona que administre…», página 2, líneas 98–99: «No se debe permitir que los niños jueguen con el collar o lo introduzcan en su boca.»
- Ficha 3212 ESP, §3.5, mismo apartado, líneas 95–96: «Los animales tratados no deben dormir con sus propietarios el día del tratamiento, especialmente con los niños.»

La ficha 1326 ESP incluye también «Evitar un contacto prolongado con el collar o con el perro que lleve el collar» (línea 101). No se ha incluido para respetar el límite de dos frases: queda cubierta por la remisión a la ficha del producto concreto.

**Criterio de cierre:** grep de «niños» en el H2 «Protegerlo de los flebotomos» devuelve la frase atribuida a las fichas. Comprobado: un único resultado, la línea 247.

## LEI-A-103 (P2): faltaba la precaución ambiental sobre el baño en el agua

**Líneas:** 251 antes; 253 después.

**Antes**

```
Ningún producto ofrece protección total. La misma ficha advierte que mojar mucho al perro, por ejemplo al bañarlo con champú, puede reducir la duración de la protección. Para los baños y las reaplicaciones, sigue la ficha de tu producto y la indicación veterinaria.
```

**Después**

```
Ningún producto ofrece protección total. La misma ficha advierte que mojar mucho al perro, por ejemplo al bañarlo con champú, puede reducir la duración de la protección. Para los baños y las reaplicaciones, sigue la ficha de tu producto y la indicación veterinaria; las fichas piden además evitar que se bañe en ríos o estanques tras la pipeta o con el collar puesto, porque dañan a los peces, y cada una indica los días concretos.
```

**Fuentes:**

- Ficha 3212 ESP, §3.5 «Precauciones especiales para la protección del medio ambiente», líneas 101–102: «La permetrina puede tener efectos adversos en los organismos acuáticos. Los perros no deben bañarse en cursos de agua durante los 2 días siguientes a la aplicación.»
- Ficha 1326 ESP, §3.5, mismo apartado, página 2, líneas 111–113: el collar «debe retirarse siempre antes de que el perro nade o se bañe ya que la sustancia activa es peligrosa para peces y otros organismos acuáticos. Debe evitarse que los perros naden o se bañen durante los 5 primeros días de llevar puesto el collar.»

**Ajuste respecto a la instrucción:** la instrucción proponía «con el collar recién puesto». La ficha 1326 pide retirar el collar **siempre** antes de que el perro nade, no solo los primeros días. Por eso el texto dice «con el collar puesto»; los cinco días de la ficha solo cubren lo de «recién puesto». No es una disputa del hallazgo, sino una formulación más fiel a la fuente. Los días (2 y 5) no aparecen en el texto: se remite a cada ficha.

**Criterio de cierre:** la precaución ambiental aparece en el texto y remite a la ficha.

## Bibliografía

**Línea añadida:** 331, justo después de la entrada de la ficha 3212 ESP.

```
- **AEMPS, CIMAVet.** [Resumen de las características de un medicamento veterinario: collar con deltametrina para perros](https://cimavet.aemps.es/cimavet/pdfs/es/ft/1326%20ESP/1326%20ESP.pdf). Contraindicación en gatos y precauciones para personas y medio ambiente.
```

El texto es el que fijó la instrucción, con los dos puntos tras «veterinario». La entrada de la 3212 ESP no los lleva («…medicamento veterinario spot-on con permetrina…»). La auditoría puede decidir si se unifica.

## Límites respetados

- Sin marcas comerciales en el cuerpo. Los nombres comerciales solo aparecen en este expediente y en el registro de origen.
- Sin dosis ni duraciones de tratamiento. Los días de las fichas no pasan al texto.
- Español de España: «vosotros» en LEI-A-102, tuteo en todo el texto, sin «usted» (grep sin resultados).
- Cada adición abre con la información útil; no se añade ninguna salvedad nueva en ningún H3.

## Comprobaciones de autor (no son un veredicto)

| Comprobación | Antes | Después |
|---|---|---|
| `python3 -I .agents/skills/references/scripts/tono.py` | 3.932 palabras, 0 muletillas, 0,0/1000 | 4.015 palabras, 0 muletillas, 0,0/1000 |
| `npx astro build` (tras `npm ci`) | — | Correcto, código de salida 0 |
| Proyección Markdown `dist/client/agent-content/v1/documents/article--leishmaniosis-perros-mayores.md` | — | Contiene las tres adiciones, el título nuevo del aviso y el enlace 1326 ESP |
| HTML `dist/client/salud-perros-mayores/leishmaniosis-perros-mayores.html` | — | Ídem |

## Diff completo

```diff
@@ -246,0 +247,2 @@
+Las fichas de estos productos traen también precauciones para las personas de casa: que los niños no jueguen con el collar y que el perro no duerma con vosotros el día de aplicar la pipeta, sobre todo con los niños. Síguelas tal como las indique la ficha de tu producto concreto.
+
@@ -251 +253 @@
-Ningún producto ofrece protección total. La misma ficha advierte que mojar mucho al perro, por ejemplo al bañarlo con champú, puede reducir la duración de la protección. Para los baños y las reaplicaciones, sigue la ficha de tu producto y la indicación veterinaria.
+Ningún producto ofrece protección total. La misma ficha advierte que mojar mucho al perro, por ejemplo al bañarlo con champú, puede reducir la duración de la protección. Para los baños y las reaplicaciones, sigue la ficha de tu producto y la indicación veterinaria; las fichas piden además evitar que se bañe en ríos o estanques tras la pipeta o con el collar puesto, porque dañan a los peces, y cada una indica los días concretos.
@@ -304,2 +306,2 @@
-<AlertBox type="warning" title="Permetrina: precaución especial con los gatos">
-La permetrina presente en productos antiflebotomos para perros es muy tóxica para los gatos. No apliques al gato un producto para perros. Antes de usarlo, lee la ficha y consulta una opción compatible con todos los animales de casa.
+<AlertBox type="warning" title="Antiparasitarios para perros: precaución con los gatos">
+La permetrina presente en productos antiflebotomos para perros es muy tóxica para los gatos. Los collares con deltametrina tampoco se usan en gatos. No apliques al gato un producto para perros. Antes de usarlo, lee la ficha y consulta una opción compatible con todos los animales de casa.
@@ -328,0 +331 @@
+- **AEMPS, CIMAVet.** [Resumen de las características de un medicamento veterinario: collar con deltametrina para perros](https://cimavet.aemps.es/cimavet/pdfs/es/ft/1326%20ESP/1326%20ESP.pdf). Contraindicación en gatos y precauciones para personas y medio ambiente.
```

## Pendiente

- Auditoría delta independiente de estas cuatro adiciones, en otra sesión.
- Aprobación del propietario. `main` despliega a producción: este cambio no se fusiona sin las dos.
