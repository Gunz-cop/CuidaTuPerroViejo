# Paridad técnica del aviso web/API — R1 técnica

Fecha:2026-10-16. **APTO para esta sincronización técnica acotada.** No es R4 editorial ni reinicia ninguna ronda. El selector conserva su cierre clínico R3; no se añadieron consejos, afirmaciones ni opciones nuevas.

Se comparó contra la copia editorial aprobada en `evidencias/auditor-adicional-final/`. La única diferencia es un import de `MOBILITY_NOTICES` y sustituir el párrafo web duplicado por `{MOBILITY_NOTICES[0]}`. Se comprobó por programa que reconstruir exactamente esos dos cambios produce el archivo actual, sin otros deltas. El módulo mantiene el mismo hash aprobado y la API entrega `notices: [...MOBILITY_NOTICES]`, por lo que ambas representaciones usan la misma constante.

El texto de esa constante ya fue leído y aprobado en la revisión adicional: opciones para consultar, sin diagnóstico/prescripción y sin forzar ayuda dolorosa. La reparación reemplaza el aviso legado distinto que seguía en HTML. Es un problema nuevo concreto de paridad de representaciones (`TOOLS_NOTICES_MISMATCH` informado por el control técnico), no un nuevo fallo clínico de una tercera ronda.

El import se ejecuta en frontmatter Astro; el módulo contiene datos/funciones compartidos ya usados en la herramienta. No se cambian lógica, niveles, rutas, productos ni puntuación. No se ejecutaron aquí build o navegador; el control API debe repetirse contra el build final y no se da por superado por esta inspección.

## Versiones conservadas

- Selector editorial R3 previo: SHA256 `e09f4c99489d1d617f3c7aa4d26577cf232c74b61ac09ceed46156023ae2044d`; copia original conservada sin sobrescribir.
- Selector tras sincronización técnica R1: SHA256 `2f6e721c946f2d6d1edd8b31e893f7eba639ac45a0d60ccbf28003f59d256b29`; copia en `evidencias/auditor-paridad-aviso-r1/`.
- Módulo clínico aprobado sin cambio: SHA256 `d64f07887640a882d17361b0238b9ab4ea1e09f6e95df81a3729332b7a67fc2f`.

El manifiesto previo de13archivos identifica el estado editorial anterior; este anexo documenta por qué el selector actual difiere únicamente en su enlace técnico a la misma copy aprobada. Los artículos e institucionales aprobados no se reabrieron ni modificaron.

Formato de copias: véase `formato-evidencia.md`; las extensiones de código llevan sufijo `.txt`, con bytes/hashes originales conservados y campo `snapshot_path` en manifiestos.
