# Correcciones del autor al brief

Autor/corrector: `/root/autor_brief`. Este registro no emite un dictamen independiente ni modifica los informes del auditor.

## Tras ronda 1 — 2026-10-22

- Informe recibido: `auditoria-brief-r1.md`, NO APTO, ronda 1/3.
- Versión auditada SHA256: `1e341cafd22815a226cec888d5e75212cffe3f5535cc82071581ebba69bef982`.
- Hallazgo P1: la definición de regurgitación frente a vómito encargada en §6/H2 4 no estaba respaldada por las fuentes asignadas.
- Corrección: retiradas esa definición y la instrucción de enseñarla. El H3 se centra en describir lo observado y cuándo ocurre, con F1 para posibles orígenes digestivos y F7 para vómitos como acompañante. Se prohíbe pedir al cuidador clasificar el episodio.
- Sin nueva fuente ni ampliación a diagnóstico o tratamiento digestivo; continúan doce referencias, objetivo de 6.000 palabras útiles, estructura, recursos y diferenciación.
- Ajuste documental de estado: el encabezado y la casilla APTO remiten a los informes numerados vigentes; así no será necesario cambiar el hash del brief aprobado únicamente para reflejar estado posterior.
- No se ha redactado el MDX ni se ha reiniciado el contador. Próxima revisión: ronda 2 del mismo brief.

## Tras hallazgos de artículo R1 — preparación de brief R3, 2026-10-22

- Informe recibido: `auditoria-articulo-r1.md`, NO APTO provisional, artículo ronda 1/3. El brief había consumido dos rondas y estaba APTO R2; esta revisión de origen es su **tercera y última ronda**, sin reiniciar contadores.
- Versión del brief anterior: SHA256 `60a2a79ab94344c766e15fbbf2e598723a431d9b7e357d245c208e033f9f9d0d`.
- Hallazgo P1 heredado del contrato: el `status` largo permitía generar HTML, pero excluía el artículo del catálogo de `src/lib/assistant/catalog.ts`, causando fallos de clasificación/proyección en el build integrado. El autor ha leído el filtro real del catálogo y el informe; no ejecutó aquel build ni lo presenta como prueba propia.
- Corrección: retirado `status` del frontmatter encargado. La explicación técnica ahora ordena omitirlo y usar el default del schema, sin confundir ese default con publicación. El estado real queda en inventario/expediente y se conserva la exclusión de despliegue de la rama. No se modifica código de catálogo global.
- Hallazgo de formulación resumida: donde decía «dolor intenso constante» o «dolor intenso/constante», ahora se exige «dolor intenso **o** constante», de acuerdo con F6 ya verificada. No cambian señales/prioridades ni se añade fuente.
- Permanecen doce fuentes, targets de 6.000 palabras útiles, diferenciación, estructura y recursos R1–R7. Borrador del artículo auditado en R1 se conserva íntegro. Las correcciones del artículo en `src/` se harán únicamente después del dictamen APTO de brief R3.
- Si el brief no pasa R3, detener correcciones y comunicar el bloqueo; no abrir una versión o contador nuevo.
