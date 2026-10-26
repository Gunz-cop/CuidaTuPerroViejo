# Evidencia independiente de publicación R2

Fecha: 2026-10-26. Versión `e35073e204e6d3f46b74db498fb747724981f512`; base `1d1c389e0f39257bfc52b46fcb7ae3beefa32095`. Segunda ronda del mismo expediente, máximo tres.

## Pruebas propias

`verificar-r2.py` compara blobs reales, exige cuatro líneas exactas, contrasta los nueve hashes del manifiesto, comprueba la conservación del brief/testimonios/R1/visuales, ejecuta el recuento contractual y mide los tres H3 afectados. También inspecciona la proyección del build anterior del productor, sin nuevo build ni guarda completa repetida.

```bash
python3 docs/contenido/miedo-petardos-perros-mayores/publicacion/auditoria-r2/verificar-r2.py
```

Ejecutar desde `/workspace/petardos-publica`, con el dist final existente. El script contractual original escribe su salida temporal en `/tmp/petardos-recuento.json`; no modifica producción. Resultados: `integridad-diff.json`, `recuento-propio.json`, `proyeccion-local.json` y `mdx-diff.md`.

`s2-contraste-propio.json` reutiliza la investigación real anterior del mismo auditor: resumen Bristol y transcripción pública del texto publicado abiertos con herramienta web. No se presenta como apertura nueva ni como descarga del PDF original. La copia del registro incorporada por el productor coincide semánticamente con el JSON propio previo. Soporte y límites se mantienen.

`s7-vmd-propia.json` registra apertura web y descarga HTTP propias del PDF oficial VMD con TLS/proxy heredados y permiso de red. Se extrajeron y leyeron páginas 1–3 con `pdftotext`. El PDF de diez páginas y el texto de trabajo permanecen fuera de Git, en `/tmp/auditoria-publicacion-r2-vmd.{pdf,txt}`. No se incorporan fuentes PDF ni PNG a la evidencia versionada.

Se leyó el PDF EMA anterior del productor con `pdftotext`; solo remite al registro. Esta inspección local no se presenta como una descarga española nueva o como lectura de la ficha española.

## Atribución y límites

Check/build/tono, guarda completa de 37 documentos y CI son resultados del productor. No se repiten pruebas amplias ni capturas. La lectura documental de VMD no es otra ronda visual del artículo. No se reabre el contrato del brief ni se convierte esta revisión localizada en auditoría clínica completa.

Solo se escriben el informe R2 y esta carpeta. El estado final se registra en `estado-final.json`. No hay correcciones de producción, informes anteriores, commits o acciones externas.
