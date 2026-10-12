# F4A — STOP tras SDD R2 FAIL

Fecha 2026-10-12. Regla del encargo y de la SDD §8: máximo dos revisiones del mismo auditor; **FAIL en la segunda → STOP, sin más ajustes**. No hay ratificación, congelación, issues, implementación, preview, promoción ni medición de F4A.

| Dato | Valor |
|---|---|
| Snapshot auditado R2 | `7eceeca162d97d8ab5ae11ce7726c05d123a9ef2`, tree `6f3002b980eff6ae50aef990a6f1ddb66bbec8ae` |
| Informes | [R1 FAIL](../auditoria/sdd-r1.md) (B1–B3), [R2 FAIL](../auditoria/sdd-r2.md) (B1–B3 resueltos, B4 nuevo) |
| Auditor | `session_011k5uFc2VrmGa3CVCgb2eSm`, `claude-opus-5-5`/high servido, homologado de Sol/high |
| Procedencia de R2 | El envío de la auditora quedó pendiente de aprobación de permiso en su sesión; el texto se archiva copiado del argumento literal de esa llamada en su transcripción (evento `3f75ab7d-4408-4136-b11e-97ba73a15933`). Después, la auditora informó del SHA-256 de su original (8680 bytes, `bd0ba3c4c8f9cff60e27251d8b41d0f6a11c330ff70f4ff4971e7be2f52f474b`). La copia archivada coincide byte a byte |
| Producto | Sin cambios: ningún archivo fuera de `docs/agent-readiness/**` modificado desde la base `eff4ce1`; `main` sigue en `aad2a66` |

## B4 y reproducción independiente del autor

Chrome for Testing 155.0.8059.39 + `WebMCPTesting` omite `inputSchema` en `WebMCP.toolsAdded` cuando alguna cadena del schema sólo usa caracteres no ASCII del rango Latin-1 (p. ej. «Hidratación»); con ASCII o con un carácter fuera de Latin-1 en la misma cadena (emoji) sí lo envía; `getTools()` en la página siempre devuelve el schema completo. [Script](probe-b4.mjs) y [salida](probe-b4.out.txt). Los cuatro schemas del anexo F4A tienen descripciones en español con acentos, de modo que C4A-08/P4A-02 tal como están escritos no pueden pasar. Además es un riesgo de interoperabilidad: no se sabe si el canal del navegador hacia su agente comparte esa serialización.

## Resolución

2026-10-12: el propietario eligió la opción recomendada (a) y autorizó continuar. Se abre un [ciclo 2 de SDD](../ciclo2/README.md) con presupuesto propio de dos revisiones del mismo auditor; este STOP y sus informes se conservan sin cambios.

## Decisión pendiente del propietario (histórico)

El auditor propone dos salidas documentales, ambas pequeñas: (a) cadenas de `inputSchema` sin caracteres Latin-1 no ASCII (ASCII o sin `description`) y registrar la restricción de Chrome 155; (b) verificar `inputSchema` vía `getTools()` y registrar la omisión CDP como riesgo. La opción (a) también mitiga el riesgo de interoperabilidad. Reanudar requiere decisión expresa del propietario sobre cómo continuar (nuevo ciclo de SDD con nuevo presupuesto de revisión o excepción explícita); este STOP no la presupone.
