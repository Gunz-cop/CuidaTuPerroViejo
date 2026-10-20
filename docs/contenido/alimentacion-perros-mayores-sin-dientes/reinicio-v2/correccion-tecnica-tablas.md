# Corrección técnica localizada de tablas antes del cierre integrado

Fecha: 2026-10-20. Rol: corrector separado de creación y auditoría. Autocontrol comunicado por coordinación antes de la auditoría R2 del conjunto; no constituye una ronda nueva ni un APTO.

Fuente recibida: `src/content/blog/alimentacion-perros-mayores-sin-dientes.mdx`, SHA-256 `ca8a606a825162025ba19c9daa3c2f0c814d9e9a4eb2b02ff4ef214b87d51058`.

## Problema comunicado

La comprobación de coordinación detectó `scrollable-region-focusable` en tablas móviles. El contenedor exterior tenía `tabindex`, pero el CSS vigente convierte la propia tabla en la región desplazable a anchuras móviles. Enfocar el contenedor no proporciona foco a ese desplazamiento real.

## Cambio

En las tres tablas editoriales se trasladó `tabindex="0"` del envoltorio a la tabla. Cada tabla recibe `aria-labelledby` asociado a su caption, con ID único:

- `alimentacion-v2-situaciones-caption`.
- `alimentacion-v2-etiquetas-caption`.
- `alimentacion-v2-presentaciones-caption`.

Se añadieron utilidades locales de foco visible con contorno sólido de 2 px y desplazamiento hacia dentro, para evitar recortarlo con el `overflow` exterior. No se modificaron estilos globales, captions, filas, prosa ni fuentes. El cambio solo afecta atributos HTML y clases; el conteo editorial permanece sin cambio.

Se sincronizó `articulo-v2-en-revision.mdx` con el archivo fuente. No se alteró el snapshot editorial R1 ni los informes de auditoría o el brief.

## Autocontrol efectuado

Se comprobó en los archivos que las tres tablas tienen foco, que cada `aria-labelledby` resuelve a un caption único y que ningún envoltorio de región conserva `tabindex`. Este control no sustituye la recompilación ni la prueba real en navegador: quedan a cargo de coordinación y auditoría independiente. No ejecuté build, commit, push ni despliegue.

SHA-256 final idéntico en source y scratch: `8600c7a8ec6a8fb9d58c3ad35d77770a8233ca8684bd38c694f486ef6d314be2`.
