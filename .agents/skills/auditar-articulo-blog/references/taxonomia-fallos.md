# Taxonomía de fallos reales

Todos los casos de este documento ocurrieron en `cuidatuperroviejo.com`, en los
tres primeros artículos redactados desde brief por agentes distintos. Ninguno es
hipotético. Sirven para dos cosas: reconocer el patrón rápido, y no inventar
hallazgos donde no los hay.

El orden es de gravedad real, no de frecuencia.

---

## P0 — Invención

### Autoría fabricada

Un artículo atribuyó el caso clínico del cocker de 19 años a **"Bae et al."**.
Los autores reales son **Kim, Nam, Kim y Yoon (2023)**, *Veterinary Sciences*.

Lo que hace este fallo particularmente peligroso:

- El brief **no traía apellido**, a propósito, porque no se había verificado. El
  redactor no copió mal: rellenó un hueco vacío.
- El resto de los datos del caso eran correctos —raza, edad, peso, técnica,
  desenlace—, así que nada alrededor levantaba sospecha.
- El enlace abría perfecto.

**Cómo detectarlo:** abrir la fuente y comparar autoría, año y revista. No basta
con que el dato citado esté; el nombre que lo firma también tiene que estar.

**Regla general:** cuando el brief deja un campo vacío, el artículo debe dejarlo
vacío. Un hueco en el brief es una decisión, no un descuido que haya que tapar.

### Cifras atribuidas a una fuente que no las contiene

Todavía no visto en este sitio, porque los briefs marcan las fuentes de
verificación parcial y prohíben expresamente atribuirles números. **Comprueba
que esa prohibición se respetó**: es el no negociable que más fácil se olvida,
porque cumplirlo consiste en *no* escribir algo.

---

## P0 — Fuga del contrato al texto

Un artículo publicó, dentro de un párrafo dirigido a la tutora:

> …describe la dermatitis asociada a humedad e irritantes; **úsalo como
> recordatorio del concepto, no como fuente de porcentajes ni de cifras que el
> estudio no permite confirmar aquí**.

El "úsalo" le habla al redactor. Es una nota interna del contrato de entrega
impresa en la página.

Paradójicamente cumplía el no negociable —no atribuía cifras— pero lo hacía por
escrito y en público.

**Cómo detectarlo:** buscar segunda persona que no sea la lectora, y menciones a
"el brief", "la fuente N", "el redactor", "target", o corchetes de anotación.

**Por qué es P0 y no cosmético:** es el mismo fallo cognitivo que produce la
autoría inventada —no distinguir el nivel del contrato del nivel del texto— y
señala que el resto del artículo merece una revisión más desconfiada.

---

## P0 — No negociable ablandado

Los no negociables de la Sección 9 suelen proteger una conclusión que va **en
contra del interés comercial del sitio**. Por eso son los que se ablandan.

Ejemplos vivos en estos briefs:

- Las feromonas tienen **evidencia débil** para ansiedad general en perros
  maduros. Prohibido presentarlas como tratamiento eficaz — y hay enlaces de
  afiliado de difusores planificados en esa misma sección.
- Cortar las uñas **no mejora la marcha**: el estudio encontró que las uñas
  largas son consecuencia de una marcha alterada, no su causa.
- El perro senior **no produce menos sebo**; lo que cae es la hidratación.

**Cómo auditarlo:** lee el no negociable, luego lee el pasaje correspondiente, y
pregúntate si un lector saldría con la conclusión que la fuente sostiene o con
una versión más vendible.

**Reconoce cuando se cumplió.** Un artículo mantuvo íntegro el bloque de
feromonas con toda su honestidad incómoda. Eso va en la sección "lo que sí
funciona" del informe, con nombre y ubicación, para que nadie lo suavice al
corregir otra cosa.

---

## P1 — Fuente citada solo en el cuadro de cierre

Aparece listada con su enlace en el `AlertBox` de fuentes, y en ninguna parte
del cuerpo. **No cuenta como citada.** El script excluye ese bloque del rastreo
justamente por esto.

Variante más sutil: la fuente sí está en el cuerpo, pero en otro H2 del que le
asignó la tabla de trazabilidad. Suele significar que la sección que debía
apoyarse en ella se escribió sin consultarla.

---

## P1 — Distribución rota entre secciones

El fallo más repetido del sitio, y siempre en la misma sección: **el H2 de
cierre narrativo**, el último antes de la conclusión, donde se remata el caso
clínico.

| Artículo | H2 de cierre | Target |
|---|---|---|
| Agresividad tardía | 500 | 700 |
| Incontinencia fecal | 314 | 700 |
| Ansiedad por separación | 272 | 700 |

En el segundo caso el total del artículo **cumplía el rango** mientras el H2 de
higiene iba a +57 % y el cierre a −55 %. Un conteo global no lo habría visto.

**Por qué importa más de lo que parece:** el manejo doméstico lo tiene cualquier
blog; el caso clínico resuelto y citado no. El presupuesto se está gastando en
lo genérico y racaneando en lo diferencial. Y como las secciones prácticas son
las que llevan los enlaces de afiliado, el desequilibrio empuja hacia lo
comercial aunque nadie lo decida.

---

## P1 — Densidad de párrafo al doble

Media de 56 palabras por párrafo frente a un spec de 30–40, con dos tercios de
los párrafos por encima de 50.

**No es solo un problema de formato: enmascara la falta de volumen.** 4.000
palabras en párrafos de 56 ocupan en pantalla lo que 6.000 bien aireadas, así
que el redactor llega al final con sensación de artículo completo y solo el
conteo lo desmiente.

**Consecuencia para el informe:** si hay déficit de palabras **y** densidad
alta, di explícitamente que hay que **partir antes de ampliar**. La corrección
intuitiva —engordar los párrafos existentes— arregla el número y empeora la
lectura móvil.

---

## P1 — Enlazado interno ausente

Un artículo se publicó con 2 de 5 enlaces obligatorios: le faltaban el pilar y
el único spoke publicado del pilar. Hablaba de DISHAA y deterioro cognitivo
durante párrafos enteros sin enlazar ni una vez el artículo de disfunción
cognitiva, que era el enlace más natural del sitio.

Deja el artículo **huérfano dentro de su propio silo**, que es lo contrario de
lo que busca la arquitectura hub-and-spoke.

Los spokes marcados `Pendiente` en el brief **no se exigen**: es la contingencia
de la Fase 3.3 cuando el pilar aún no tiene dos artículos publicados.

---

## P1 — Imágenes

Cuatro fallos distintos, los cuatro vistos:

1. **La `heroImage` no se cuenta.** Tres de tres artículos reportaron "faltan 2
   imágenes" cuando faltaban 3.
2. **La imagen incumple una restricción visual.** Una infografía de reservorio
   frente a esfínter dibujaba materia fecal y zona perianal; su brief prohibía
   expresamente las dos.
3. **El sujeto fijo cambia.** En esa misma infografía el perro salió joven y sin
   hocico blanco, mientras las otras tres imágenes tenían al cocker de 19 años.
4. **El `alt` no describe la imagen.** Normalmente por herencia: la imagen se
   sustituyó y el `alt` se quedó describiendo la versión anterior.

Los cuatro exigen **abrir el archivo y mirarlo**. Ninguno se detecta desde el
nombre.

---

## P2 — Frontmatter y publicación accidental

- `datePublished` con la fecha del brief y byline con la de redacción: dos de
  tres artículos.
- Nombres de archivo con `ñ` o tilde en la ruta pública.
- **`status: "Publicado"` en un borrador reconocido como incompleto.** Y aquí lo
  importante: `status` **no protege nada**. Es `z.string().default('Publicado')`
  en `config.ts` y `getStaticPaths()` no lo mira. Un artículo con
  `status: "Borrador"` se compila a `dist/` igual. El único gate real es que el
  `.mdx` no esté en `src/content/blog/`.

---

## Lo que NO es un hallazgo

- **Cuatro `AlertBox`.** Tres de cuerpo más el cuadro de fuentes es la
  convención del sitio, presente en todos los artículos publicados.
- **Menos de 6 fuentes**, si el brief ya documentó la limitación por Fase 2.5.
- **Una fuente sin cifras**, si el brief la marcó como verificación parcial:
  citarla solo por concepto es cumplimiento, no pereza.
- **Un spoke sin enlazar** marcado `Pendiente` en la Sección 5.
- **Que el título de un H2 no sea literal el del brief.** El brief planifica; el
  redactor titula. Solo importa si cambió el contenido de la sección.
- **Sintaxis Markdown de imagen** en vez del `<img>` anti-CLS que piden algunos
  briefs: el corpus entero del blog usa Markdown y el layout lo resuelve.
  Auditar contra el brief aquí produce un falso positivo.
