# Taxonomía de fallos de brief

Combina casos históricos documentados del sitio con criterios actuales del contrato 2.0. Los casos ayudan a reconocer patrones; los criterios nuevos no se presentan como incidentes observados. Las cantidades de los ejemplos no son cuotas normativas.

El orden es de gravedad, no de frecuencia. La diferencia con la taxonomía de la
skill de artículos ([auditar-articulo-blog](../../auditar-articulo-blog/references/taxonomia-fallos.md)):
aquí los fallos son **previos a la redacción**, así que su daño se mide en cuánto
se propaga — al artículo, a las auditorías del artículo y a los briefs que
reutilizan las mismas fuentes.

---

## P0 — Identificador bibliográfico inventado o mal asignado

Caso real detectado en este proyecto: un brief presentaba un **PMID de un estudio
de obstetricia humana** como cita de un libro de endocrinología veterinaria
canina. El formato del identificador era correcto; el número existía; solo que
apuntaba a otro tema completamente distinto.

Por qué es el peor fallo del flujo:

- Un PMID con formato correcto pero equivocado es **indistinguible a simple vista
  de uno auténtico**, y aparenta estar verificado sin estarlo.
- Sobrevive a la redacción (el redactor lo copia), a veces a la auditoría del
  artículo (que confía en que el brief ya verificó), y queda publicado si nadie
  resuelve el identificador.
- La regla de la skill generadora es explícita: sin herramienta de búsqueda web,
  no se genera ningún PMID/DOI/URL de memoria — se cita autor/año/título en texto
  plano con marca `[Cita bibliográfica sin verificar]`. Un brief que cita números
  "de memoria" violó esa regla.

**Cómo detectarlo:** resolver cada PMID/DOI con búsqueda web y comprobar que el
tema del estudio coincide exactamente con el dato que el brief le atribuye.

Variante relacionada ya vista: atribuir a un estudio una **herramienta de un paper
posterior del mismo equipo** — un brief asignaba la escala CCDR de 13 ítems a
Salvin (2010) cuando corresponde a Salvin et al. (2011). Mismo equipo, tema
parecido, año contiguo: el tipo de error que solo se ve abriendo ambos papers.

---

## P0 — Enlace interno a artículo inexistente

La Fase 3 prohíbe inventar slugs o enlaces de artículos no publicados. El fallo
aparece cuando el generador rellena la tabla de la Sección 5 con slugs plausibles
en vez de copiarlos del inventario.

Consecuencia: el `.mdx` nace con enlaces rotos o hacia páginas que nunca
existirán, y el silo del pilar queda contaminado.

**Cómo detectarlo:** cada URL de la Sección 5 contra `INVENTARIO_CONTENIDO.md`,
una por una. Los spokes marcados `Pendiente` por contingencia documentada son
cumplimiento, no fallo.

---

## P0 — Hecho alterado de la historia real

La depuración de transcripción está permitida (muletillas, frases truncadas,
nombres cruzados). Cambiar un hecho — edad del perro, medicación, desenlace —
no lo está: corrompe el único material E-E-A-T real del sitio.

**Cómo detectarlo:** comparar la historia del brief contra el mensaje original
del usuario cuando esté disponible; si no lo está, buscar contradicciones
internas (el mismo dato con dos valores distintos en Sección 2 vs. Secciones 6 u 8).

---

## P1 — Fuente decorativa

Una fuente listada en la Sección 3 que no aparece como `*Sustentado en:*` en
ningún H2, o cuyo H2 la menciona de pasada sin desarrollar su dato clave.

Es la versión previa a la redacción del fallo "fuente citada solo en el cuadro
de cierre" de los artículos: si el brief ya la dejó sin sección, el redactor no
tiene dónde citarla y el artículo nace incumpliendo su propio contrato.

**Cómo detectarlo:** recorrer la lista de fuentes una a una buscando su nombre
en la Sección 6. También al revés: H2s científicos extensos sin ninguna fuente
asignada sugieren contenido escrito desde memoria general, no source-first.

---

## P1 — Excepción aplicada en silencio

El contrato 2.0 admite cantidades justificadas, incluidas cero cajas o FAQ y guía sin caso. La omisión es dejar sin motivo una decisión de alcance, omitir un riesgo pertinente o fingir disponible un recurso pendiente. No es fallo tener menos de seis fuentes, no tener dos spokes o no añadir una calculadora que no resuelve la tarea.

**Cómo detectarlo:** comprobar intención, evidencia, riesgo y justificación, no aplicar una cuota del ejemplo histórico.
---

## P1 — Arco narrativo sin cierre

Cuando se encargó una historia documentada, sus momentos aparecen en los H2 prácticos pero falta el cierre documentado o sus límites. El cierre va dentro de la última sección útil o conclusión; no se reserva un H2 narrativo propio. La guía sin caso no necesita desenlace.

**Cómo detectarlo:** seguir el hilo principal desde la apertura hasta su cierre integrado y contrastarlo con los hechos disponibles. Si hay varios sujetos, comprobar cuál se declaró principal. No inventar recuperación ni añadir una sección para completar volumen.
---

## P1 — Prosa final dentro del brief

Secciones 6 que traen párrafos desarrollados en vez de instrucciones y puntos
clave. Parece calidad extra; en realidad invita al redactor a copiar texto sin
volver a las fuentes, y difumina qué nivel del documento es contrato y cuál es
texto.

Excepciones legítimas (no son hallazgo): `items` de FAQ y `title`/tipo de
AlertBox anticipados como borrador corto.

---

## P2 — Prompts de imagen genéricos o inconsistentes

- Raza nombrada en dos prompts y generalizada a "a senior dog" en el tercero:
  rompe la continuidad visual entre las tres imágenes.
- Escena de banco de imágenes ("perro feliz en parque") sin plano, luz,
  profundidad de campo ni estilo definidos.

---

## P2 — Metadatos al límite o estado desactualizado

- `seoTitle` en 56-58 caracteres "porque casi": la regla dice máximo 55 contados.
- `pilar` con valor fuera del enum de `config.ts`.
- Artículo no marcado como `[~] (En Briefing)` en el inventario tras guardar.

---

## Lo que NO es un hallazgo

- **Fuentes suficientes en la cantidad justificada**, sin cuota ni aprobación adicional solo por ser menos de seis; una laguna central sin respaldo sigue bloqueando.
- **Destinos pendientes sin URL enlazable**, documentados en la sección de enlaces.
- **Fuentes marcadas `[URL no verificada]` o `[Cita bibliográfica sin verificar]`**:
  es cumplimiento de la regla anti-alucinación, no pereza. El fallo sería lo
  contrario.
- **Historia real depurada de muletillas**: es la limpieza de transcripción permitida,
  siempre que los hechos queden intactos.
- **Títulos de H2 distintos al template**: el brief planifica contenido, no
  literalidad de encabezados.
- **Casillas de la Sección 10 marcadas**: su estado no prueba nada en ningún
  sentido — ni su marcado es mérito ni su vacío es descuido automático. Lo que
  cuenta es la realidad que cada casilla afirma.

## P1 — Contrato formal sin tarea útil

Hay secciones y targets pero la pregunta principal no obtiene respuesta o el lector debe pasar por una explicación extensa antes de saber qué observar/hacer. Localizar la decisión ausente y su efecto; no rechazar por preferencia de estilo.

## P1 — Recurso o siguiente paso improcedentes

PDF que repite el texto sin tarea, CTA de chequeo preventivo ante urgencia, enlace a una herramienta por cuota o promesa sin responsable/prueba. Comprobar el recorrido y pedir una solución específica, incluida omisión justificada si es lo útil.

## Contratos anteriores

Las incidencias históricas se conservan como evidencia; no convierten sus cantidades en reglas actuales. Identificar versión/adenda antes de auditar. La siguiente unidad empieza en R1; correcciones de una unidad mantienen su contador de hasta cinco.
