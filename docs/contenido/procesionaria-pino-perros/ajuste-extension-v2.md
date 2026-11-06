# Ajuste de extensión autorizado — v2

Fecha: 2026-11-06. El propietario fija un rango de 5.500–6.000 palabras para el artículo y aclara: «Solo ajusta el brief y espera». Se modifica únicamente la planificación; la redacción queda pendiente de un nuevo encargo.

## Contrato vigente

- Objetivo: 5.750 palabras de cuerpo visible; mínimo 5.500 y máximo 6.000.
- Inclusiones: encabezados, listas, AlertBox y preguntas/respuestas FAQ.
- Exclusiones: frontmatter, imports, alt, pies y bibliografía.
- La tolerancia orientativa por bloque no amplía el rango global.
- Distribución: introducción 150; cinco H2 de 800, 1.100, 900, 1.000 y 1.100; conclusión 100; FAQ 600. Total: 5.750.

La sección 6 desglosa cada H2 en preguntas prácticas de 180–200 palabras. La ampliación desarrolla organización del traslado y consulta, registro del alta y prevención del paseo. No añade fuentes, tratamientos, pacientes ni afirmaciones clínicas. La actuación urgente permanece en las primeras frases. La organización editorial se identifica como tal, sin atribuir eficacia clínica a listas y registros.

## Versiones y evidencia

V1: SHA-256 `9468d4165fb05d1154b4e8941355654afd607a32a477ec98ddc211363c27ff41`; objetivo anterior 2.200 y rango 1.870–2.530. Su aprobación se conserva en `auditoria-brief-r1.md` como evidencia histórica, no como aprobación del presupuesto nuevo. Los conteos de esa versión en `fuentes-verificadas.md` son también históricos.

V2: SHA-256 `b31810de41f8452d801f6e03e1bf305756647070e866e6a2497eb4195c33ddf0`. Modifica versión, objetivo, estructura/presupuestos, contrato y checklist; conserva metadatos, registro de fuentes y límites, enlaces, sujeto visual y prompts. Las sumas por H3/H2 y global se han comprobado con Python; los bloques 3–5 y 7–8 se han comparado literalmente contra v1 y permanecen iguales.

Revisión solicitada a la misma sesión auditora como R2/5, limitada a ajustes y bloqueantes derivados. Su resultado y hash se registran en `auditoria-brief-r2.md`. No se reinicia la numeración ni se repite la auditoría completa de fuentes.

El brief es planificación: este rango corresponde al artículo futuro, no a la longitud del archivo de instrucciones. No se ha escrito el artículo ni producido imágenes ni ejecutado un build de código por este ajuste documental.
