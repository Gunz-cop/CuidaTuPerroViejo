# F4A seguimiento — Ratificación de la SDD

Fecha 2026-10-13. La [SDD del seguimiento](../../../fases/f4a-seguimiento.md) queda **ratificada y congelada** tal como se auditó: snapshot `78f4d120cfdbce5260fe2dc54c6849a73474172a`, tree `de78460ecd0d7dda69c09df10bef24262a5aaf87`.

| Revisión | Dictamen | Informe |
|---|---|---|
| R1/2 | FAIL: B1 (chips de `#qol-intro`), B2 (C4A-17 incumplible en la calculadora), B3 (propiedad de ficheros incompleta) | [seguimiento-sdd-r1.md](../auditoria/seguimiento-sdd-r1.md), 10693 bytes, `6b36064d…`; el auditor confirmó con `cmp` que es idéntico al original |
| R2/2 | **PASS**, sin bloqueantes | [seguimiento-sdd-r2.md](../auditoria/seguimiento-sdd-r2.md) |

El auditor SDD es la sesión independiente de F4A (`claude-opus-5-5`/high, homologado de Sol/high).

## Cambios posteriores al snapshot auditado

- **Línea «Estado» de la SDD.** Se actualiza a «ratificada y congelada». No se cambia nada más del texto normativo.

## Aclaraciones de ejecución

Recogen las observaciones no bloqueantes de R2 y no modifican la SDD:

1. **§2.1, texto del JSON-LD.** Dice «segunda pregunta», pero el `FAQPage` de la página tiene una sola pregunta. El texto a sustituir se identifica por la frase completa «Por debajo de 35 indica que la calidad de vida está comprometida y se recomienda consultar al veterinario.», que aparece una sola vez en el fuente.
2. **§2, aserción de `projection.test.mjs` sobre los chips.** Se toma tal como la serializa el fixture regenerado por la herramienta de proyección, incluido el escape de `>` al inicio de línea si lo hay.

## Issue

F4A-3 se abre como un único issue para D33, D34 y D35, con la propiedad de §5 y los criterios C4A-15 a C4A-20.
