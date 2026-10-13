# F4A-3 (seguimiento) — Aceptación de la implementación

Fecha 2026-10-13. **Implementación aceptada; publicación pendiente de autorización del propietario.**

| Paso | Referencia | Resultado |
|---|---|---|
| SDD | [f4a-seguimiento.md](../../../fases/f4a-seguimiento.md): [R1 FAIL](../auditoria/seguimiento-sdd-r1.md) y [R2/2 PASS](../auditoria/seguimiento-sdd-r2.md), con [ratificación](ratificacion-sdd.md) | Congelada |
| Código | `cb8e10f1ead55ef0dafc666672cd3003252afc59`, tree `2727f993981f3cbbd144b802b08f13d072d11773` | Entregado |
| Evidencia del autor | `43cb4c3` ([README](README.md)) | C4A-15 a C4A-20 PASS |
| CI y Workers Builds | PR #87, en `cb8e10f` y `43cb4c3` | success |
| Preview | `70ec48bf` ([recibo](recibo-preview.json)), byte a byte | PASS |
| Auditoría de implementación | [R1/5 PASS](../auditoria/f4a-3-r1.md), sin bloqueantes | Aceptada |

**Auditor independiente:** el mismo de F4A-1, F4A-2 y la publicación F4A (`claude-opus-5-5`/high, homologado de Sol/high).

**Archivo del informe R1/5:** 11040 bytes, SHA-256 `c9f38e74a849f9922fc47711dd540bdd0a588956d16ee4a793add0d2203289fa`. Coincide con el hash declarado por el auditor.

## Observaciones de la auditoría y su tratamiento

1. **Recibo del bot editado en sitio.** El recibo de `cb8e10f` → `70ec48bf` estaba archivado antes de la edición, y ambas previews sirven el mismo build.
2. **Cita de sección errónea.** La nota de [contratos F4A](../../../fases/f4a-contratos.md) citaba §1.2. Se corrige en documentación a «§1.1 (franja) y los ejemplos de §2». La SDD ratificada repite el error en el texto «contratos F4A §1.2»; no se toca, porque está congelada, y la regla sustituida se cita literalmente, así que no hay ambigüedad.
3. **Hash del JS en el harness del autor.** El harness vuelve a pedir cada JS al servidor para hashearlo. El auditor lo comprobó con el cuerpo recibido por el navegador y obtuvo el mismo resultado.
4. **Consola en los 4xx transmitidos.** Es la misma situación que en F4A-2 (contratos §5.3.2).
5. **`AGENTS.md`.** Sigue diciendo «migración en curso». Por la SDD §4 queda fuera del alcance y es decisión del propietario.

## Pendiente

La promoción a producción requiere autorización explícita del propietario. Ver la [propuesta](propuesta.md).
