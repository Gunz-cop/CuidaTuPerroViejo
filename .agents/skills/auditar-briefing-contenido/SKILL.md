---
name: Auditar Briefing de Contenido - Cuida Tu Perro Viejo
description: Audita un briefing ya generado contra las reglas de la skill generar-briefing-contenido, como lo haría un revisor externo — fuentes verificadas una a una (PMID/DOI/URL profunda), trazabilidad fuente→H2 sin fuentes decorativas, metadatos contados, enlazado interno contra el inventario, componentes, arco narrativo, prompts de imagen y límite brief vs. redacción. Úsala cuando el usuario pida revisar, auditar o validar un brief o un briefing; cuando sospeche que un fallo del artículo nació en el brief; o antes de redactar desde un brief que otra sesión generó. Es una skill de EVALUACIÓN: produce un veredicto y hallazgos ubicados, no corrige el brief salvo que el usuario lo pida aparte.
---

# Habilidad: Auditoría de Briefings de Contenido

Tu papel aquí es el de un revisor externo del brief, no el de quien lo generó.
Sé escéptico por defecto: busca motivos de rechazo, no de aprobación. El brief es
el **contrato** del que nace el artículo: un error aquí no corrompe un documento,
corrompe todo lo que se escriba después. Ya ocurrió: un brief atribuyó la escala
CCDR de 13 ítems al estudio equivocado del mismo equipo (Salvin 2010 en vez de
Salvin et al., 2011), el artículo obedeció, y el error estaba además propagado a
otros briefs sin redactar.

Dos consecuencias prácticas de ese papel:

- **No des por bueno nada que puedas comprobar.** Si hay un PMID, búscalo. Si
  hay un DOI, resuélvelo. Si hay un enlace interno, compruébalo contra el
  inventario. Si hay un conteo de caracteres, cuéntalo tú.
- **No confíes en el checklist del propio brief.** Que la Sección 10 tenga sus
  casillas marcadas no significa nada: las marcas las puso quien generó el
  brief, que es justo la parte interesada que esta skill existe para sustituir.

## Separación de roles: auditas, no corriges

Esta skill **no** modifica el brief, ni el inventario, ni ningún otro archivo.
Entrega un veredicto y una lista de hallazgos ubicados, y ahí termina.

No es una formalidad. Quien corrige adquiere interés en que su corrección sea la
buena y deja de poder evaluarla. Si el usuario pide además la corrección,
propón hacerla en una sesión aparte a partir de las instrucciones del informe —
el informe debe traer esas instrucciones listas.

Lo que sí debes entregar cuando el hallazgo lo permita: **la instrucción exacta**
para que otra sesión corrija el brief. Eso es auditoría; abrir el archivo y
editarlo, no.

## Referencia normativa

La regla con la que se audita es la propia [generar-briefing-contenido](../generar-briefing-contenido/SKILL.md):
su flujo de 5 fases y su Validación Final son el estándar. Tenlos a mano durante
toda la auditoría. El ejemplo de referencia es
[ejemplo_briefing_cushing.md](../generar-briefing-contenido/examples/ejemplo_briefing_cushing.md).

Si el brief documenta una excepción prevista por la skill generadora (Fase 2.5:
menos de 6 fuentes fuertes, con aprobación del usuario; Fase 3.3: pilar sin dos
spokes publicados), **eso no es un fallo**: es una decisión ya tomada y
justificada. Auditar contra ella es ruido. Lo que sí verificas es que la
excepción esté *documentada*, no silenciosa — la omisión decidida en silencio sí
es hallazgo.

## Orden de trabajo

El orden importa: los pasos 1 y 2 son mecánicos y rápidos, el paso 3 es donde se
concentran los hallazgos graves, y los pasos 4 a 7 comprueban que el contrato
esté completo antes de gastar horas de redacción en él.

### 1. Entradas y canibalización

- ¿El brief declara título, keyword principal y slug?
- Comprueba contra `INVENTARIO_CONTENIDO.md` si la keyword o un slug muy similar
  ya están cubiertos por otro artículo (publicado o en curso). Si hay solapamiento
  y el brief no lo menciona ni justifica el ángulo diferencial, es hallazgo P1.
- Si el brief incluye historia real: verifica que esté presente y depurada
  (nombres cruzados, frases truncadas, muletillas) **sin hechos alterados**. La
  depuración de forma es correcta; cambiar un hecho es P0.

### 2. Metadatos y frontmatter

- Cuenta los caracteres del `seoTitle` (máx. 55) y de la `metaDescription`
  (máx. 160) con un comando, no a ojo.
- Verifica que el bloque YAML del frontmatter está completo según el template y
  que el valor de `pilar` existe en el enum de `src/content/config.ts`.
- Comprueba coherencia slug ↔ ruta relativa ↔ nombres de archivo de imágenes
  (sin `ñ`, tildes ni espacios en rutas públicas).

### 3. Fuentes: el paso crítico

Aquí es donde esta skill más valor aporta. Por cada fuente declarada en la
Sección 3:

1. **¿Es de autoridad?** Estudios indexados en PubMed, guías WSAVA, comunicados
   FDA/AVMA, facultades veterinarias. Fuentes débiles rellenando el número son
   hallazgo, salvo excepción documentada de Fase 2.5.
2. **¿La URL es profunda?** Un enlace a la homepage de la institución viola la
   regla anti-alucinación. Debe apuntar al documento específico o llevar la marca
   `[URL no verificada]`.
3. **¿El PMID/DOI existe y corresponde al tema exacto?** Usa búsqueda web para
   cada identificador: resuélvelo y confirma que el estudio trata lo que el brief
   le atribuye, no solo que el formato "parece correcto". Un PMID real de otro
   tema es peor que ninguno. Caso real ya detectado en este proyecto: un PMID de
   obstetricia humana presentado como cita de endocrinología veterinaria canina.
   Si el brief cita identificadores "de memoria" sin marca de verificación, es P0.
4. **¿El dato clave atribuido está en la fuente?** Abre la URL profunda y busca
   la cifra, el mecanismo o la pauta que el brief dice extraer de esa fuente.
   Que el enlace abra no es verificación.
5. **Trazabilidad:** recorre la lista de fuentes una por una y comprueba que
   cada una aparece como `*Sustentado en:*` de al menos un H2 de la Sección 6,
   y que ese H2 desarrolla su dato clave — no una mención de pasada. Una fuente
   solo listada en la Sección 3, sin H2 asignado, es una fuente decorativa (P1)
   y además incumple la Fase 2.6.
6. **Cobertura inversa:** cada H2 con contenido científico debería apoyarse en
   alguna fuente. Un H2 extenso sin `*Sustentado en:*` sugiere que se escribió
   desde memoria general y no source-first (P1).

Notas de método:

- `WebFetch` puede recibir muros de cookies o 403 en PubMed y ScienceDirect. Si
  falla, prueba el dominio alternativo (`pmc.ncbi.nlm.nih.gov`) o confirma autoría
  y DOI con una búsqueda antes de concluir nada.
- Distingue entre fuente marcada honestamente como no verificada (cumplimiento)
  y fuente presentada como verificada sin estarlo (invención).

### 4. Enlazado interno

- Comprueba cada URL de la tabla de la Sección 5 contra `INVENTARIO_CONTENIDO.md`:
  debe existir y estar marcada como publicada (`[x]`). Un enlace a un artículo no
  publicado es la alucinación típica de esta fase (P0: el artículo nacerá con
  enlaces rotos).
- ¿Está el enlace al pilar correcto? ¿Aparece la calculadora
  `/herramientas/calculadora-calidad-vida-perros` si el tema es Salud o Cuidados
  Paliativos?
- Los spokes marcados `Pendiente` por contingencia (Fase 3.3) son cumplimiento,
  no fallo. Los spokes inventados, no.

### 5. Estructura, componentes y arco narrativo

- **Presupuesto de palabras:** suma los targets por sección de la Sección 6. Debe
  dar entre 6.000 y 6.500. Suma exacta, no estimación.
- **AlertBox:** deben planificarse los 3 tipos, uno mínimo cada uno, en sus
  secciones correctas: `info` en Introducción, `danger` en síntomas/diagnóstico,
  `warning` en tratamiento/manejo. Repetir el mismo tipo o faltar uno no pasa
  validación.
- **FAQ:** planificado con sus preguntas borrador.
- **Arco narrativo en 3 momentos:** apertura en Intro, desarrollo en un H2
  intermedio, y **cierre en el último H2 antes de Conclusión/FAQ** como sección
  propia. Si hay varios sujetos en la historia, debe declararse cuál es el hilo
  narrativo principal. El cierre omitido o fusionado con la conclusión es P1 —
  es el punto que más se salta después en redacción cuando el brief ya lo dejó
  débil.
- **Límite brief vs. redacción:** las secciones deben dar instrucciones y puntos
  clave al redactor, no prosa terminada. Excepción legítima: `items` de FAQ y
  `title`/tipo de AlertBox. Párrafos de desarrollo ya redactados dentro del brief
  son P1: invitan a que el redactor copie texto sin verificar contra fuentes.

### 6. Prompts de imagen

- Los 3 prompts nombran explícitamente la **misma raza** (y rasgos distintivos
  del perro real) en los tres. Un prompt generalizado a "a senior dog" rompe la
  continuidad visual y es hallazgo.
- Cada prompt define plano, escenario concreto, iluminación, profundidad de campo
  y estilo fotoperiodístico. Escenas de banco de imágenes ("perro feliz en
  parque") son hallazgo P2.
- Si la historia tiene más de un perro, cada prompt indica cuál aparece.

### 7. Contrato de Entrega (Sección 9)

- Tabla de trazabilidad completa: las 6 fuentes con H2 asignado.
- Checklist de no negociables presente: volumen mínimo real, componentes
  estructurales, arco narrativo.
- Rango de palabras del contrato coherente con los targets de la Sección 6.
- Estado en `INVENTARIO_CONTENIDO.md`: el artículo debería figurar como
  `[~] (En Briefing)` tras guardarse el brief. Si no, es un pendiente menor (P2),
  no un defecto del documento.

## Cómo juzgar (y cómo no)

**Distingue omisión de invención. Es el eje que ordena todo lo demás.**

Un brief al que le falta un spoke, un tipo de AlertBox o palabras en el
presupuesto tiene un problema de omisión: se detecta con conteos y se corrige en
minutos. Un brief con un PMID inventado o mal asignado tiene un problema de
invención: parece rigor verificado, sobrevive a cualquier revisión que no abra
la fuente, y contamina el artículo, la auditoría del artículo y todos los briefs
que reutilicen la misma fuente. **Una invención pesa más que diez omisiones.**

Por orden de gravedad real en este sitio:

1. **PMID/DOI/autoría inventados o mal asignados**, presentados como verificados.
2. **Enlaces internos a artículos inexistentes o no publicados.**
3. **Datos clave atribuidos a fuentes que no los contienen** (verificado abriendo
   la URL).
4. **Fuentes decorativas** listadas pero sin H2 que las desarrolle.
5. **Excepciones aplicadas en silencio** (menos de 6 fuentes, spokes faltantes)
   sin documentar ni preguntar.
6. **Arco narrativo incompleto**, sobre todo el cierre ausente.
7. **Metadatos fuera de límite** o `pilar` inválido.
8. **Prosa final en vez de instrucciones** para el redactor.
9. **Prompts de imagen genéricos o con raza inconsistente.**

**Mide antes de acusar.** Caracteres contados, no estimados; suma de targets
calculada; identificadores resueltos con búsqueda. La credibilidad del informe
se juega en que el usuario pueda verificar cada hallazgo.

**Reconoce lo que funciona, con la misma especificidad.** Si el brief marcó
honestamente sus fuentes no verificadas en lugar de inventar números, dilo:
esa decisión protege todo el flujo posterior y nadie debe "completarla" al
corregir.

**Si mides algo que contradice una crítica tuya, corrígela en el informe.**
Explícitamente, sin rodeos, y sigue.

## Veredicto

El formato exacto está en `references/formato-informe.md`. En síntesis:
una palabra (Válido / Válido con reservas / No válido para redacción) + el motivo
en una frase + hallazgos agrupados por prioridad con ubicación exacta.

Recuerda el efecto cascada al redactar el informe: si encuentras un error de
fuente, avisa explícitamente de que hay que comprobar si otros briefs citan la
misma fuente, y de que el artículo ya redactado (si existe) hereda el fallo.

## Referencias

- `references/formato-informe.md` — la estructura del entregable.
- `references/taxonomia-fallos.md` — los fallos reales vistos en este proyecto,
  con el caso concreto de cada uno.
