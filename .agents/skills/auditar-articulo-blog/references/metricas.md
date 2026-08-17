# Cómo leer la salida de `metricas.mjs`

El script compara el `.mdx` contra `briefings/briefing-{{slug}}.md`. Sin brief no
hay contrato y casi nada es medible: lo avisa y sigue con lo poco que puede.

---

## 1. Volumen y distribución

**Método de conteo.** Todo lo que va tras el segundo `---`, sin las líneas
`import` ni los `---` sueltos. Es el método que fija el contrato de entrega. Un
`wc -w` sobre el archivo entero da unas 100 palabras de más (frontmatter e
imports) y **no es comparable**: es justo el margen con el que un artículo por
debajo del mínimo puede parecer que llega.

**La tabla por sección es la parte que importa.** El total puede estar dentro de
rango con la distribución rota. Caso real: un artículo cumplía el total mientras
su H2 de higiene iba a +57 % y el H2 de cierre narrativo a −55 %, compensándose.

**Emparejamiento posicional.** El brief define N secciones en orden
(Introducción, H2-1…H2-n, Conclusión) y el script las empareja por posición, no
por título, porque el redactor casi siempre reformula los títulos. Si los
títulos de una fila no se corresponden, el artículo **fusionó o reordenó
secciones**: eso es un hallazgo en sí mismo y hay que mirarlo a mano.

**Umbral: ±15 %** sobre el target de cada sección. Fuera de ahí, bloqueante.

Presta atención especial a la **penúltima fila**, el H2 de cierre narrativo. Es
donde vive el caso clínico y es el que más se sacrifica cuando el presupuesto se
gastó antes.

---

## 2. Densidad de párrafo

Se mide solo sobre prosa: se excluyen títulos, imágenes, pies en cursiva, JSX,
listas, tablas y bloques de código.

| Métrica | Bien | Alto | Fuera |
|---|---|---|---|
| media | 30–40 | 41–45 | > 45 |
| >50 palabras | < 10 % | 10–30 % | > 30 % |

Referencias reales de este blog: un artículo aprobado da **media 30 / mediana 29
/ 3 %**; uno con el defecto da **media 56 / mediana 57 / 66 %**.

**Lee esta métrica junto con la anterior, no por separado.** Si el artículo va
corto de palabras **y** la densidad está alta, el orden de corrección importa:
**partir los párrafos primero, ampliar después**. Ampliar párrafos ya densos
arregla el número y empeora exactamente lo que el formato móvil existe para
evitar. Dilo en el informe, porque es la corrección que se hace mal por defecto.

**El otro extremo: fragmentos sueltos (<12 palabras).** Partir párrafos a lo
bruto para bajar la media deja frases descolgadas, y la media *mejora* mientras
el texto empeora. Un artículo bien aireado de este blog tiene **0**; uno recién
partido a máquina llegó a **8**.

El peor caso visto: el punto de **"et al."** tomado por final de frase, que dejó
`Salvin et al.` como párrafo y la frase siguiente empezando por `(2010), en…`.
Una cita descuartizada en mitad del bloque E-E-A-T. Por eso el barrido usa un
listón más bajo que el filtro de prosa: tres palabras se colarían por debajo.

No todos son defecto. Una frase corta puede ser énfasis deliberado. El script
los lista para que decidas uno por uno; lo que no puede es no verlos.

**Cadencia de H3:** el spec es uno cada 150–200 palabras. Por encima de 260 el
script avisa. No es bloqueante por sí solo, pero un tramo largo sin subtítulos
suele coincidir con la parte peor estructurada del artículo.

---

## 3. Fuentes

Para cada fila de la tabla de trazabilidad (Sección 9), el script busca la fuente
en el cuerpo y dice **en qué sección** aparece:

- `OK` — aparece en una sección que el brief le asignó.
- `·` — aparece en otra sección. No es un fallo por sí solo; una fuente puede
  citarse más veces de las previstas.
- `BLOQUEA` — no aparece en ninguna, o no aparece en **ninguna** de las
  asignadas.

**El cuadro de cierre está excluido del rastreo a propósito.** Una fuente citada
solo ahí no cuenta como citada, por mucho que esté listada con su enlace.

**Las "agujas".** El script busca apellidos y palabras distintivas del título, y
**dice con qué aguja encontró cada match** para que puedas descartar falsos
positivos de un vistazo. Cuando la etiqueta no trae apellido+año avisa de
`agujas débiles`: ahí el match puede ser casual y conviene mirarlo.

Busca en dos sitios del brief: la etiqueta de la tabla de trazabilidad y el
título real de la Sección 3. Hace falta porque algunas tablas traen una
paráfrasis en español ("Caso de transposición de semitendinoso") que no aparece
literal en ningún artículo.

**Lo que el script no puede hacer, y es lo más importante:** decirte si la fuente
**respalda** la afirmación. Que el nombre aparezca en el H2 correcto no dice nada
sobre si la cifra que lo acompaña está en el paper, ni sobre si la autoría es la
real. Eso es el paso 3 de la skill y no hay atajo.

---

## 4. Enlaces internos

Compara contra la Sección 5 del brief. Los spokes marcados `Pendiente` no llevan
URL y no se exigen: es la contingencia de la Fase 3.3, no un olvido.

Faltar el pilar o un spoke publicado es bloqueante: deja el artículo huérfano
dentro de su propio silo, que es lo contrario de lo que busca la arquitectura
hub-and-spoke del sitio.

---

## 5. Componentes

Cuenta los `AlertBox` **de cuerpo** por separado del cuadro de fuentes. La regla
son tres en el cuerpo —`info`, `danger`, `warning`— más el cuadro de cierre, que
es convención del sitio y aparece en todos los artículos publicados. **Cuatro
`AlertBox` en total es lo correcto, no un exceso.**

También comprueba que el número de preguntas del `FAQ` coincida con el del
brief, que no haya un `#` de H1 en el cuerpo (lo genera el layout) y que estén
los `import` de los componentes que se usan.

---

## 6. Imágenes

Contrasta las imágenes referenciadas —**incluida la `heroImage` del
frontmatter**— contra los archivos de `public/images/blog/{{slug}}/`.

El hero se olvida de forma sistemática al reportar imágenes pendientes. Por eso
el script lo marca explícitamente.

Avisa también de nombres con tilde o `ñ`, que se percent-encodean en la URL y
dan problemas de indexación.

Que un archivo exista **no dice nada sobre lo que contiene**. La verificación
visual es manual y no es opcional.

---

## 7. Frontmatter y fechas

- `metaDescription` > 160 caracteres lo rechaza el schema de `config.ts`: es
  bloqueante, no estético.
- Compara `datePublished` con la fecha del byline `**Actualizado:**`. Si
  difieren y no es una reescritura declarada, están desincronizadas.
- **`status` no filtra nada.** En `config.ts` es `z.string().default('Publicado')`
  y `getStaticPaths()` genera una ruta por cada entrada de la colección sin
  mirarlo. Un artículo con `status: "Borrador"` **se compila a `dist/` y se
  sirve igual**. Si el artículo tiene bloqueantes, dilo en el informe: mientras
  el `.mdx` esté en `src/content/blog/`, está a un deploy de publicarse.

---

## El veredicto

- **NO APTO** — hay bloqueantes.
- **APTO CON AVISOS** — sin bloqueantes, con avisos.
- **APTO** — sin defectos mecánicos.

`APTO` **no significa "el artículo es bueno"**. Significa que no queda nada que
un script pueda detectar. Los hallazgos que hunden un artículo —un autor
inventado, una cifra que la fuente no dice, una instrucción del brief filtrada
al texto, una imagen que incumple su restricción— viven fuera de aquí.

Por eso cada artículo imprime **PENDIENTES MANUALES**. Si el informe no dice
explícitamente que se levantaron, el veredicto está incompleto y hay que
escribirlo así.
