# Formato del informe

El informe se lee para decidir una cosa: **si este brief está listo para
alimentar una redacción o qué se corrige antes**. Y, si el artículo ya fue
redactado desde este brief, qué hallazgos del brief se propagaron al `.mdx`.
Todo lo que no ayude a esas dos decisiones sobra.

Estructura:

```markdown
## Veredicto
[Válido / Válido con reservas / No válido para redacción] + el motivo en UNA frase.

## Hallazgos
Agrupados por P0 / P1 / P2, cada uno con ubicación exacta y evidencia.

## Verificación de fuentes
Tabla: fuente → identificador → resultado de la comprobación (verificada /
URL no verificada marcada / inválida / no corresponde al tema).

## Efecto cascada
Qué documentos heredan los fallos: el artículo ya redactado (si existe), otros
briefs que citen las mismas fuentes, el inventario.

## Lo que sí funciona
Qué decisiones del brief no hay que romper al corregir.

## Qué corregir, en orden
Instrucciones accionables para otra sesión. No edites el brief aquí.
```

La sección **Verificación de fuentes** es obligatoria en esta skill — es la que
más valor aporta y la única cuyo resultado el usuario no puede comprobar sin
repetir todo el trabajo. Una fila por fuente, sin excepción.

---

## El veredicto

Una palabra y una frase. Sin hedging. Si es "no válido para redacción", la frase
nombra **el** motivo, no cinco.

Distingue siempre estos dos planos y no los mezcles:

- **Lo mecánico**: conteos de caracteres, suma de targets, presencia de secciones,
  enum del `pilar`. Se cierra con comandos.
- **Lo verificable a mano**: fuentes abiertas, identificadores resueltos,
  enlazado contra inventario. Ningún comando lo cierra.

Si no abriste todas las fuentes, **el veredicto está incompleto y hay que decirlo
así**, listando cuáles quedaron sin abrir.

---

## Los hallazgos

Prioridades adaptadas al brief:

- **P0** — invalida el contrato: identificador bibliográfico inventado o mal
  asignado, dato clave que la fuente no contiene, enlace interno inexistente,
  hecho alterado de la historia real.
- **P1** — degrada el contrato y se propagará a la redacción: fuente decorativa
  sin H2, arco narrativo sin cierre, excepción aplicada en silencio, prosa final
  en vez de instrucciones, presupuesto roto.
- **P2** — degrada calidad; se corrige cuando se toque el archivo: prompts de
  imagen genéricos, metadatos al límite, estado desactualizado en el inventario.

Cada hallazgo lleva:

1. **Ubicación exacta**: sección y fuente/H2 concretos ("Sección 3, Fuente 4" o
   "Sección 6, H2 de tratamiento"). "Las fuentes están flojas" no es accionable.
2. **La evidencia, no la impresión.** Si es un identificador: lo que dice la
   búsqueda frente a lo que le atribuye el brief, lado a lado. Si es un conteo:
   el número.
3. **Por qué es un problema real**, no solo mejorable. Si no puedes completar esa
   frase, probablemente no era un hallazgo.

Usa tablas para los contrastes: la de verificación de fuentes y la de
trazabilidad fuente→H2 se leen de un vistazo.

**No infles la lista.** Cinco hallazgos ubicados y verificados valen más que
quince genéricos.

---

## Efecto cascada

Es la sección que diferencia auditar un brief de auditar un artículo. Un fallo
de brief no vive solo:

- **El artículo ya redactado** hereda literalmente cada error del contrato —
  incluido el caso real donde el redactor rellenó honestamente un hueco que el
  brief dejó, fabricando una autoría.
- **Otros briefs pendientes** pueden citar la misma fuente errónea. Búscalos en
  `/briefings/` antes de cerrar el informe.
- **La skill de auditoría de artículos** auditó contra este brief: si su veredicto
  fue "APTO", el fallo del brief estaba fuera de su alcance o nació después.
  No culpes a esa auditoría por obedecer un contrato defectuoso.

---

## Lo que sí funciona

Sección obligatoria, y no por cortesía. Una auditoría que solo lista defectos
lleva a rehacer decisiones que ya estaban bien — y en un brief las decisiones
buenas suelen ser omisiones deliberadas: el apellido que no se escribió porque
no estaba verificado, el spoke marcado `Pendiente` en vez de inventado.

Sé tan específico como en los hallazgos: qué fuente, qué marca, qué decisión.

---

## Qué corregir, en orden

Prioriza por gravedad, no por facilidad. Orden típico obligatorio: primero las
fuentes (porque pueden reorganizar la estructura entera), luego trazabilidad y
estructura, luego metadatos y cosmética — corregir metadatos antes de saber qué
fuentes sobreviven es tiempo perdido.

Recuerda el límite del rol: **aquí escribes la instrucción, no el arreglo.**
Si el usuario quiere que otra sesión corrija el brief, dale instrucciones cerradas
y autosuficientes, con los números, las URLs y las ubicaciones dentro, para que
no tenga que reconstruir el contexto de esta auditoría.

---

## Tono

Escribe como un revisor externo: directo, verificable, sin adornos ni
condescendencia. Nada de "podría considerarse que quizás". Si algo está mal,
está mal; si está bien, dilo sin hedging.

Y si en el curso de la auditoría mides algo que contradice una crítica que ya
hiciste —tuya, de una sesión anterior o de este mismo informe— corrígela de
forma explícita y sigue.
