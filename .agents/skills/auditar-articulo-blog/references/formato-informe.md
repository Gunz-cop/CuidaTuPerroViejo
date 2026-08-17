# Formato del informe

El informe se lee para decidir una cosa: **si esto se publica o qué se toca
antes**. Y, cuando quedan briefs por redactar, si el fallo es de este artículo o
del proceso. Todo lo que no ayude a esas dos decisiones sobra.

Estructura:

```markdown
## Veredicto
[Publicable / Publicable con reservas / No publicable] + el motivo en UNA frase.

## Hallazgos
Agrupados por P0 / P1 / P2, cada uno con ubicación exacta y evidencia.

## Lo que sí funciona
Qué no hay que romper al corregir.

## Qué corregir, en orden
Instrucciones accionables. Si procede, el prompt para otra sesión.
```

Añade una sección **Patrón** solo si el fallo se va a repetir en los briefs
pendientes. Si es específico de este artículo, no la incluyas.

---

## El veredicto

Una palabra y una frase. Sin hedging, sin resumen tibio. Si es "no publicable",
la frase nombra **el** motivo, no cinco.

Distingue siempre estos dos planos y no los mezcles:

- **Lo mecánico**, que el script cierra.
- **Lo verificable a mano** — fuentes, imágenes, no negociables— que ningún
  script cierra.

Si no levantaste los pendientes manuales, **el veredicto está incompleto y hay
que decirlo así**. Un "APTO" del script presentado como aprobación es
exactamente el error que esta skill existe para evitar.

---

## Los hallazgos

Prioridades:

- **P0** — bloquea la publicación por sí solo: datos inventados, un no
  negociable ablandado, una fuga del contrato al texto.
- **P1** — un lector atento o un revisor lo nota y baja la confianza: fuente
  fuera de su H2, distribución rota, densidad al doble, enlaces o imágenes que
  faltan.
- **P2** — degrada calidad; se corrige cuando se toque el archivo.

Cada hallazgo lleva:

1. **Ubicación exacta**: `archivo:línea` o la sección con su nombre. "El
   artículo es genérico" no es accionable; "línea 269, `Bae et al.` frente a
   Kim, Nam, Kim y Yoon (2023)" sí.
2. **La evidencia, no la impresión.** Si es medible, el número. Si es una cita,
   el texto de la fuente junto al del artículo, para que el contraste se vea sin
   abrir nada.
3. **Por qué es un problema real**, no solo mejorable. Si no puedes completar esa
   frase, probablemente no era un hallazgo.

Usa tablas para los contrastes: la de secciones (real / target / desviación) y
la de densidad se leen de un vistazo y ahorran párrafos.

**No infles la lista.** Cinco hallazgos ubicados y verificados valen más que
quince genéricos.

---

## Lo que sí funciona

Sección obligatoria, y no por cortesía. Una auditoría que solo lista defectos
lleva a que se rehaga algo que estaba bien — y en este sitio el riesgo concreto
es que, al reescribir para ganar palabras, se ablande el pasaje que mantenía la
honestidad editorial.

Sé tan específico como en los hallazgos: qué sección, qué decisión, qué línea.

---

## Qué corregir, en orden

Prioriza por gravedad, no por facilidad. Y cuando la corrección tenga un orden
obligatorio, dilo: si falta volumen **y** la densidad está alta, **partir antes
de ampliar**, porque hacerlo al revés arregla el número y estropea la lectura.

Recuerda el límite del rol: **aquí escribes la instrucción, no el arreglo.** Si
el usuario quiere que otra sesión lo corrija, dale el prompt cerrado y
autosuficiente, con los números y las ubicaciones dentro, para que no tenga que
reconstruir el contexto de esta auditoría.

---

## Tono

Escribe como un revisor externo: directo, verificable, sin adornos ni
condescendencia. Nada de "podría considerarse que quizás". Si algo está mal,
está mal; si está bien, dilo sin hedging.

Y si en el curso de la auditoría mides algo que contradice una crítica que ya
hiciste —tuya, de una sesión anterior o de este mismo informe— corrígela de
forma explícita y sigue. Sostener una impresión contra un dato propio es la
forma más rápida de que el informe deje de servir.
