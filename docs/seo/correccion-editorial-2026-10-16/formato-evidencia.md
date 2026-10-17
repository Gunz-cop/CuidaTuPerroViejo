# Formato documental de las copias de auditoría

Fecha:2026-10-16. Las copias de producto guardadas bajo `evidencias/auditor-*` se conservan como texto: `.astro.txt`, `.ts.txt` y `.mdx.txt`. Sus bytes y SHA256 son idénticos a los archivos auditados. El sufijo impide que Astro/TypeScript intenten compilar las copias de evidencia con imports relativos ajenos a su ubicación original.

El primer empaquetado mantuvo extensiones ejecutables, lo que provocó que `astro check` incluyera copias y reportara imports inválidos. Se renombraron40copias y se comprobaron sus40hashes, sin editar su contenido. Registro completo antes/después en `evidencias/auditor-reempaquetado-snapshots.json`.

Los manifiestos conservan `path` como ruta original del producto y `sha256` como identidad del contenido auditado. El campo `snapshot_path` identifica la ubicación de la copia documental. En el manifiesto de paridad se conservan también `sha256_before`/`sha256_after`. Las referencias directas en informes se actualizaron. Las fuentes capturadas y archivosJSON/Markdown permanecen con su formato documental.

Este cambio de embalaje no modifica producto, tests ni configuración, ni consume otra ronda editorial o técnica del contenido. Los manifiestos R1/R2/R3 anteriores conservan sus hashes de origen y pueden contrastarse con las copias renombradas.
