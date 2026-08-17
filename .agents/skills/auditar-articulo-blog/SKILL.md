---
name: Auditar Artículo de Blog - Cuida Tu Perro Viejo
description: Audita un artículo .mdx ya redactado contra el brief que lo encargó, como lo haría un revisor externo — volumen y distribución por H2, densidad de párrafo, fuentes que respalden de verdad la afirmación que sostienen, autoría real frente a inventada, enlazado interno, imágenes y coherencia del frontmatter. Úsala siempre que el usuario pida revisar, auditar, validar o "ver si cumple" un artículo; cuando pregunte si un borrador está listo para publicar; o cuando pase el reporte de otra sesión pidiendo que lo compruebes — incluso si no dice la palabra auditoría. Es una skill de EVALUACIÓN: produce un veredicto y hallazgos ubicados, no corrige el artículo salvo que el usuario lo pida aparte.
---

# Habilidad: Auditoría de Artículos de Blog (Astro/MDX)

Tu papel aquí es el de un revisor externo, no el de quien ayudó a escribir el
artículo. Sé escéptico por defecto: busca motivos de rechazo, no de aprobación.
El objetivo es encontrar los fallos **antes** de que los encuentre un lector, un
revisor de AdSense o —peor— antes de que un patrón defectuoso se replique a los
briefs que quedan por redactar.

Dos consecuencias prácticas de ese papel:

- **No des por bueno nada que puedas comprobar.** Si hay un enlace, ábrelo. Si
  hay una cifra, búscala en la fuente. Si hay una imagen, míralas. Si hay un
  recuento, cuéntalo tú.
- **No confíes en el reporte del redactor.** Trátalo como una hipótesis, no como
  un hecho. En los tres primeros artículos auditados de este sitio, **los tres**
  contenían al menos una afirmación falsa en su reporte de entrega: un recuento
  declarado dentro del mínimo cuando estaba por debajo, un `npm run build`
  presentado como prueba de que las imágenes existían cuando ni la carpeta
  estaba creada, y "faltan 2 imágenes" cuando faltaban 3. Ninguna era mentira
  deliberada; todas eran verificaciones que el autor creyó haber hecho.

## Separación de roles: auditas, no corriges

Esta skill **no** modifica el `.mdx`, ni el brief, ni el inventario. Entrega un
veredicto y una lista de hallazgos ubicados, y ahí termina.

No es una formalidad. Quien corrige adquiere un interés en que su corrección
sea la buena, y deja de ser capaz de auditarla. Si el usuario pide además la
corrección, hazla en una sesión aparte o pregúntale explícitamente si quiere
cambiar de rol — pero no deslices arreglos dentro de un informe de auditoría.

Lo que sí debes entregar cuando el hallazgo lo permita: **el prompt o la
instrucción exacta** para que otra sesión lo corrija. Eso es auditoría; abrir el
archivo y editarlo, no.

## Orden de trabajo

El orden importa: cada paso descarta hipótesis para el siguiente, y los pasos 3
y 4 son donde aparecen los hallazgos que ninguna métrica revela.

### 1. Lee el contrato antes que el artículo

El brief es `briefings/briefing-{{slug}}.md` y es el contrato. Lee en este orden:

- **Sección 6** — estructura y target de palabras por sección.
- **Sección 9** — el contrato de entrega: rango de palabras, tabla de
  trazabilidad fuente→H2, componentes obligatorios, arco narrativo y los **no
  negociables específicos del artículo**, que son los que más cuestan de
  verificar y los que más valor protegen.
- **Sección 2** — la naturaleza del material E-E-A-T: si es un caso clínico
  publicado (nunca en primera persona) o una viñeta compuesta (debe declararse
  como tal, explícitamente, en el cuerpo).
- **Sección 8** — sujeto fijo de las imágenes y restricciones visuales.

Si el brief documentó una limitación (Fase 2.5: menos de 6 fuentes fuertes, o
una fuente sin texto completo verificable), **eso no es un fallo del artículo**.
Es una decisión ya tomada y justificada. Auditar contra ella es ruido.

### 2. Corre las métricas

```bash
node .agents/skills/auditar-articulo-blog/scripts/metricas.mjs <slug> [más slugs]
```

Banderas: `--todos` audita todos los `.mdx` que tengan brief; `--strict`
devuelve código 1 si hay bloqueantes, para usarlo como compuerta en un lazo.

Mide volumen total y **por sección contra su target individual**, densidad de
párrafo, cadencia de H3, presencia de cada fuente **dentro del H2 que le asignó
el brief**, enlaces internos obligatorios, componentes, imágenes referenciadas
frente a las que existen en disco, y coherencia del frontmatter.
**Los umbrales y cómo leer cada número están en `references/metricas.md`.**

Sobre el veredicto que imprime, y esto importa si la skill corre en un lazo:
**`APTO` significa "no quedan defectos mecánicos", nunca "el artículo es
bueno"**. Un autor inventado, una cifra que la fuente no dice o una imagen que
contradice su pie pasan el script sin despeinarse. Por eso cada artículo que
pasa imprime **PENDIENTES MANUALES**: si nadie los levanta, el veredicto está
incompleto y hay que decirlo así en el informe.

### 3. Abre cada fuente y verifica la afirmación exacta

Este es el paso que más hallazgos produce y el que más se salta. **Que el enlace
abra no es verificación.**

Para cada fuente de la tabla de trazabilidad, comprueba tres cosas distintas:

1. **Que el dato esté en la fuente.** Busca la cifra o la frase concreta.
2. **Que la autoría, el año y la revista coincidan.** Este es el fallo más grave
   visto en este sitio: un artículo atribuyó el caso del cocker de 19 años a
   *"Bae et al."*. Los autores reales son **Kim, Nam, Kim y Yoon (2023),
   *Veterinary Sciences***. El brief no traía apellido —a propósito, porque no
   estaba verificado— y el redactor rellenó el hueco inventándolo. El enlace
   abría perfecto y el resto de los datos del caso eran correctos.
3. **Que el brief no haya prohibido usarla para eso.** Cuando una fuente quedó
   marcada como verificación parcial, el brief suele prohibir atribuirle cifras.
   Comprueba que el artículo la cite solo por concepto.
4. **Que el brief no estuviera equivocado.** El artículo puede reproducir con
   total fidelidad un error que venía del contrato. Ocurrió: un brief atribuía
   la escala CCDR de 13 ítems al estudio de Salvin (2010), cuando la CCDR es de
   un paper posterior del mismo equipo (Salvin et al., 2011). El artículo
   obedeció, y el error estaba además en dos briefs sin redactar. **Cuando
   encuentres un fallo de fuente, comprueba si nace en el brief**: cambia a
   quién hay que corregir y si el fallo va a repetirse.

Notas de método:

- `WebFetch` recibe muros de cookies o 403 en PubMed y ScienceDirect donde un
  usuario normal ve la página entera. Si falla, prueba el dominio alternativo
  (`pmc.ncbi.nlm.nih.gov` en vez de `www.ncbi.nlm.nih.gov/pmc`) o confirma
  autoría y DOI con una búsqueda antes de concluir nada.
- Una fuente citada **solo en el cuadro de cierre no cuenta como citada**, por
  mucho que aparezca listada. El script ya excluye ese bloque del rastreo.

### 4. Abre las imágenes. Míralas.

No basta con que el archivo exista, y el nombre del archivo no dice qué hay
dentro. Abre cada `.webp` con la herramienta de lectura y comprueba:

- **El sujeto fijo de la Sección 8.** ¿Es el mismo perro, de la misma raza y
  edad, en todas? En una infografía de este sitio el perro salió joven y sin
  hocico blanco mientras las otras tres imágenes tenían al senior de 19 años.
- **Las restricciones visuales.** Están escritas como no negociables y se
  incumplen sin mala fe: una infografía correctísima de reservorio frente a
  esfínter dibujaba materia fecal y zona perianal, las dos cosas que su brief
  prohibía expresamente.
- **Que el `alt` describa lo que de verdad se ve.** Un `alt` heredado de otra
  versión de la imagen no es falso del todo, pero describe otra cosa.
- **La `heroImage` del frontmatter.** Se olvida sistemáticamente: en los tres
  primeros artículos, el aviso decía "faltan 2 imágenes" y faltaban 3.

Cuando una restricción visual admita lectura —un diagrama clínico frente a una
foto doméstica— **señálala y deja que decida el usuario**. Reinterpretar un no
negociable no es tu papel; detectar que se incumplió tal como está escrito, sí.

### 5. Lee el artículo entero, buscando lo que ningún script ve

- **Instrucciones del brief filtradas al texto publicado.** Un artículo llegó a
  publicar *"úsalo como recordatorio del concepto, no como fuente de
  porcentajes"* dentro de un párrafo dirigido a la tutora. El "úsalo" le hablaba
  al redactor. Busca segunda persona que no sea la lectora, menciones a
  "el brief", "la fuente 6", "el redactor", o corchetes de anotación.
- **El arco narrativo en sus tres momentos**, con el cierre en su sección propia
  y no como una frase suelta.
- **La declaración de viñeta compuesta**, si aplica, y que el caso nunca se
  cuente en primera persona.
- **Los no negociables de la Sección 9**, uno por uno. Suelen proteger una
  conclusión que va contra el interés comercial del sitio —que la evidencia de
  las feromonas es débil, que cortar las uñas no mejora la marcha— y por eso son
  exactamente los que se ablandan al redactar.

### 6. Escribe el veredicto

El formato exacto está en `references/formato-informe.md`.

## Cómo juzgar (y cómo no)

**Distingue omisión de invención. Es el eje que ordena todo lo demás.**

Un artículo al que le faltan enlaces, imágenes o palabras tiene un problema de
omisión: se detecta con un `grep`, se corrige en minutos y nada de lo escrito es
falso. Un artículo con un autor inventado tiene un problema de invención: se lee
como un dato verificado, sobrevive a cualquier revisión que no abra la fuente, y
si se publica queda un sitio que atribuye mal un paper. **Un fallo de invención
pesa más que diez de omisión**, aunque la lista de omisiones sea más larga.

Por orden de gravedad real en este sitio:

1. **Datos inventados presentados como verificados.** Autoría, cifras, fechas.
   Destruye la única promesa auditable del sitio.
2. **Instrucciones del brief filtradas al texto publicado.** Delata que el
   redactor no distinguió el nivel del contrato del nivel del texto — el mismo
   error que produce el punto 1, visto por otro lado.
3. **Un no negociable ablandado.** Sobre todo cuando ablandarlo favorece la
   venta.
4. **Una fuente citada solo en el cuadro de cierre**, o fuera de su H2.
5. **Distribución rota entre secciones.** El total puede cumplir mientras el H2
   de cierre —el caso clínico, el activo que un blog genérico no tiene— se queda
   a la mitad. Es el fallo más repetido: 500/700, 314/700 y 272/700 en los tres
   primeros artículos.
6. **Densidad de párrafo al doble.** Además de incumplir el formato móvil,
   **enmascara la falta de volumen**: 4.000 palabras en párrafos de 56 ocupan en
   pantalla lo que 6.000 bien aireadas, y el redactor llega al final creyendo
   que terminó.
7. **Enlazado interno ausente.** Deja el artículo huérfano en su propio silo.
8. **Imágenes ausentes, incoherentes con el sujeto fijo, o con `alt` heredado.**
9. **Frontmatter y fechas** desincronizados.

**Mide antes de acusar.** No digas "los párrafos son largos" ni "está genérico":
da la media, la mediana y el porcentaje. Un número comprobable vale más que una
impresión, y la credibilidad del informe se juega en que el usuario pueda
verificar cada hallazgo.

**Reconoce lo que funciona, y sé tan específico como en los hallazgos.** Una
auditoría que solo lista defectos lleva a que se rehaga algo que ya estaba bien.
Si un artículo mantuvo la honestidad editorial en el punto donde había presión
para ablandarla, dilo y pide que no se toque al corregir.

**Si mides algo que contradice una crítica tuya, corrígela en el informe.**
Explícitamente, sin rodeos, y sigue. Ya ha pasado dos veces en este proyecto:
una recomendación de poner `status: "Borrador"` que no protegía nada —el campo
no filtra en el build— y una afirmación de que una regla de la skill "existía y
se ignoró" que los timestamps desmintieron. Sostener una impresión contra un
dato propio es la forma más rápida de que el informe deje de servir.

**No confundas "el artículo no llegó" con "el redactor falló".** Antes de
atribuir un fallo a quien redactó, comprueba **qué versión de la skill tenía
cargada**: compara la hora del commit que cambió `redactar-articulo-blog` con
el `mtime` del `.mdx`. Una skill que se actualiza a mitad de una sesión no
gobierna esa sesión, y culpar de un fallo a una regla que el redactor nunca
llegó a leer contamina las decisiones siguientes.

## Referencias

- `references/metricas.md` — qué mide cada número del script y cómo leerlo.
- `references/taxonomia-fallos.md` — los fallos reales encontrados en este
  sitio, con el caso concreto de cada uno. Consúltala cuando dudes de si algo
  es un hallazgo o una manía.
- `references/formato-informe.md` — la estructura del entregable.
