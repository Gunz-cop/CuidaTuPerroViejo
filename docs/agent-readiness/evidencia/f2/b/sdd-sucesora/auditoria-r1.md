# Auditoría independiente SDD sucesora F2B — R1/2

**FAIL por un único bloqueante de ejecutabilidad. Lista cerrada.** El contrato exige revalidar ETag HTML anunciado por codificación, pero limita las muestras codificadas a ocho solicitudes que sólo cubren GET/HEAD 200. Queda un único ciclo de corrección del arquitecto y revisión R2; FAIL2 implica STOP. La SDD original conserva PASS2/2 y sus bytes. Auditoría formal de implementación B continúa **0/5**; esta revisión no consume sus intentos.

## Fuente congelada

- Local: `/workspace/ctpv-f2b-sdd-sucesora`, SHA `15579edd5ab40cff30ef51513e6d741e7d3cf036`.
- Tree verificado localmente: `d8c1a9a2c9048a25688f41bc8faa9f6e1a59e7b6`.
- Único cambio frente a base `39ffb4cc7484da7b1145be40e9c19766c12b5bbf`: `docs/agent-readiness/fases/f2b-contrato-sucesor.md`.
- SHA-256 de ese documento: `085cdfcfe90540b1e675879dbb6ae977e5575c4b64ed9569191f1d4b9baf2e62`.
- Publicación equivalente aportada por coordinación: `073df76d0a9a9b89d545c4ee1b8bd79e9f699e25`, mismo tree, PR63. El juicio recae sobre los bytes locales congelados; no se consultaron remotos.

## B01 — límite de ocho casos incompatible con la revalidación codificada

**Ubicación:** sucesora §3/línea31, §4/líneas48–59, §5/línea67, B09/línea82 y P01/P02/línea86.

§3 exige: «Si se anuncia, exigir coherencia GET/HEAD y revalidación propia con el tag realmente observado». §4 exige evidencia de la misma ruta/Accept-Encoding y: «Si se observa un tag, todas las filas correspondientes se prueban». §5, en cambio, ordena «Añadir únicamente ocho casos de codificación HTML: home y Cushing, GET/HEAD, Accept-Encoding: gzip y Accept-Encoding: br».

Caso permitido por la propia SDD: una home codificada anuncia ETag nativo en sus respuestas 200. Los ocho casos enumerados se consumen exactamente con dos rutas × dos codificaciones × GET/HEAD, sin ningún If-None-Match. Para acreditar la revalidación propia hace falta al menos otra solicitud con el tag observado y la misma codificación; la matriz completa requiere más. El ejecutor debe entonces exceder «únicamente ocho» o dejar incumplida §3/§4. No puede resolverlo con N/A: hay un tag anunciado. B09 y P01/P02 heredan la contradicción.

**Corrección mínima propuesta al arquitecto:** definir explícitamente esos ocho como muestras 200 iniciales y añadir los casos condicionales codificados exigidos, con una matriz finita y máximo anticipado que cuente las ramas con/sin tag y sus N/A. Alinear §4, §5, B09 y P01/P02 con ese conteo. Debe conservarse revalidación de todo ETag anunciado; no ocultarlo, fabricar tokens ni eximirlo para mantener ocho. Esta es una corrección de contrato/conteo, no de producto ni un nuevo experimento.

## Comprobaciones restantes

| Dimensión | Resultado normativo |
| --- | --- |
| Precedencia y bases | La sucesora identifica excepciones, conserva contratos/editorial/F2A/F1 y fija la nueva rama/base de B tras PASS. Los diagnósticos no se incorporan al producto. |
| HTTP y condicionales | Markdown exige validador nativo; HTML puede no anunciarlo. Selección previa a condición, comparación débil, comas dentro del opaque-tag, límite de vacíos e invalidez del campo completo están definidos. Wildcard comprueba existencia aun sin ETag, ausencia/errores mantienen503 y304/HEAD no llevan cuerpo. |
| HEAD y compresión | No confirmo un bloqueante adicional: «coherentes» y «si anuncia gzip/br» no obligan a presencia idéntica de todos los campos. Las omisiones HEAD permitidas por HTTP no justifican metadatos anunciados falsos. No-transform/compresión propia están prohibidos y gzip/br efectivos no se prometen. |
| Pruebas locales/públicas | Matriz local completa con/sin ETag, Markdown sin tag→503, condición inválida no reenviada y304 inesperado están cubiertos. N/A público sólo por evidencia del mismo candidato/ruta/codificación y sólo para filas dependientes de tag HTML. El único impedimento es B01. |
| Ownership y runtime real | Los cambios necesarios caben en `src/lib/agent-content/`, pruebas/evidencia B ya reservadas. El runtime previo requiere reparar wildcard sin ETag, matching parcial de campos inválidos y ETag Markdown ausente; §4/§7 los convierten en obligaciones de implementación. No se evalúa aquí su cumplimiento como entrega. |
| CI, evidencia, promoción/rollback | SHA/receipt/preview propios, evidencia cruda con hashes y omisiones explícitas, aislamiento local, STOP ante fallos, separación aceptación/main y reversión conjunta B→A permanecen ejecutables. El alcance sucesor no inventa capacidades de blog, puntuación o reparación de plataforma. |

## Método y límites

Lecturas: AGENTS, SDD/contratos F2 completos, sucesora completa, D06–D10, cierre F2A, ownership Assistant y source congelado `src/worker.ts`, `src/lib/agent-content/runtime.ts`, pruebas de negociación/CI y evidencia del bloqueo previo. Se contrastaron las obligaciones con las APIs/flujo existentes, sin implementar ni ejecutar pruebas.

Comandos de verificación: `git status --short`, `git rev-parse HEAD HEAD^{tree}`, `git diff --name-status 39ffb4c… HEAD`, `sha256sum`, `cat`, `nl -ba`, `sed`, `rg`. Checkout limpio. No builds/tests/probes/HTTP, código/spec editados, evaluador, merge, despliegue o acceso a main. Se escribió exclusivamente este informe fuera del worktree. No se añade ninguna observación opcional ni bloqueante de implementación a esta lista.
