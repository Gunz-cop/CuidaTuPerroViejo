# Auditoría independiente · Procedimiento de recuperación diaria v2

- **Auditor:** Claude Code. No corrige ni ejecuta nada.
- **Objeto:** [PR #179](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/179), `docs/admin/recuperacion-diaria-procedimiento.md`, de Codex.
- **Fecha:** 2026-11-12.
- **Veredicto:** **APTO con dos ajustes obligatorios antes de ejecutar.** Ninguno cambia código.

## Contra el encargo

| Punto | Resultado |
|---|---|
| Rango dinámico calculado con el `notOlderThan` real, del más antiguo al más reciente, recalculado si la ejecución se alarga, sin la ventana ordinaria | Cumple. Usa `recentDays()` del código auditado. |
| O2: tabla por tramos con el estado de cada fecha, un único reintento R1 solo para el presupuesto agotado y ningún reintento a ciegas | Cumple |
| Días vacíos esperables (fechas de B1), no tratados como fallos sin evidencia | Cumple. Exige confirmarlos y no los etiqueta por suposición. |
| O3: mecanismo exacto del secret | Cumple, y bien razonado: `versions secret put/delete` (que **no** despliega) seguido de `versions deploy <UUID>@100` explícito. Descarta `secret put/delete`, que despliega de inmediato, y el panel. Verifica la versión y los crons antes y después de cada transición (V0 → V+ → V−), con comparación de módulos. |
| Cierre de emergencia que no omite la retirada del secret | Cumple: vuelve a V0 al 100 % y borra el nombre sin desplegar una copia ajena. |
| Operador y credenciales | Cumple. El propietario ejecuta en su equipo: Basic con `getpass` y el secret generado en el proceso y pasado por stdin, sin argumentos, historial ni repositorio. |
| Cliente HTTP sin el 1010 y sin desactivar protecciones | Cumple: User-Agent explícito, 200 y 401 comprobados, y repetición obligatoria desde el equipo del operador. |
| Ventana: merges y pushes congelados; lejos de las 08:00 UTC | Cumple |
| Integridad: igualdad estricta en meses, esquema y filas diarias previas; tablas vivas solo informativas; comprobaciones finales | Cumple |
| Paradas: versión o cron, 403/5xx, filas mensuales, diferencias o verificaciones | Cumple, y la parada no cancela el cierre. |
| Informe saneado posterior en un PR documental | Cumple |

## Ajustes obligatorios antes de ejecutar

1. **Que la última versión subida sea la de `main`: fusionar antes los PR documentales.** Workers Builds sube versiones de vista previa con cada push a una rama con PR. Hoy hay PR abiertos con pushes posteriores al despliegue de `51ebd22` (#174, #175, #177, #178 y #179, incluidos los commits de esta auditoría). Lo más probable es que la última versión sea una vista previa, de modo que el preflight fallaría en «última = V0» y obligaría a una «build controlada» que el procedimiento deja sin definir. **Solución sencilla:**
   - el propietario autoriza fusionar **todos** los PR documentales pendientes (incluido este) **antes** de abrir la ventana;
   - el último merge despliega `main` y deja su versión como la última;
   - se congelan los pushes;
   - se repite el preflight.

   El procedimiento debe indicar este paso explícitamente.
2. **Distinguir «vacío» de «fallido» con el campo `reason`.** El procedimiento dice que la API no separa los vacíos. Es cierto en `status`, pero el código auditado sí los distingue en `coverage[].reason`: «Día vacío; sigue pendiente de archivo.» frente a «Lote no guardado: consulta, coherencia o escritura falló.». Hay que usar ese campo como evidencia principal y reservar la lectura diagnóstica de GraphQL para los casos ambiguos. Así se reducen lecturas y se simplifica la conciliación.

## Observaciones (no bloquean)

- **La carga operativa es alta para el propietario:** Wrangler local con sesión iniciada, un checkout con dependencias instaladas, una sesión de Python y unos 26 tramos. Conviene reservar un bloque de tiempo sin interrupciones (por ejemplo, de 1 a 2 horas) y que Codex actúe como observador de solo lectura en paralelo, como prevé el procedimiento.
- **Ventana antes del 3 de diciembre:** ese día el cron diario archivará noviembre en `audience_months`, lo que rompería la condición de «meses idénticos» si coincide con la ventana. El procedimiento ya pide evitar las 08:00 UTC; basta con no ejecutarlo el día 3.
- Que no exista una petición de prueba es correcto: la primera llamada autorizada ya es el tramo 01 y debe anotarse.
- O1 sigue pendiente. La detección por `pendiente` y `requests` es suficiente mientras tanto.

## Recomendación

1. Codex incorpora los ajustes 1 y 2 en este mismo PR. Yo verifico solo ese cambio.
2. El propietario autoriza fusionar los PR documentales #174, #175, #177, #178 y #179.
3. El propietario autoriza la ventana de recuperación con fecha y hora, y la ejecuta según el procedimiento.
4. Codex entrega el informe saneado y yo audito el resultado.
