# Evidencia de la auditoría textual R1

Versión del artículo: `ae9386811b75610d394992f1b41a181a744b21ea`. Véase el informe principal para alcance, hallazgos, fuentes y límites.

- `metricas-script-original.txt`: ejecución del script oficial; sus falsos positivos se explican en el informe.
- `tono.txt`: ejecución de tono.py; sus exclusiones difieren del conteo del contrato.
- `comprobaciones-independientes.json`: conteo de texto visible por sección y coincidencias de ocho palabras, tanto brutas como depuradas.
- `comprobar-snapshot.py`: reproduce la medición desde el repositorio; no modifica el artículo ni el brief. Escribe `comprobaciones.json` en la raíz al ejecutarlo. Retirar ese archivo de salida si no se necesita conservar.

```bash
python3 docs/contenido/miedo-polvora-perros-mayores/auditoria-articulo-r1-evidencias/comprobar-snapshot.py
node .agents/skills/auditar-articulo-blog/scripts/metricas.mjs miedo-polvora-perros-mayores
python3 .agents/skills/references/scripts/tono.py src/content/blog/miedo-polvora-perros-mayores.mdx
```

Las referencias externas se abrieron durante la auditoría. Los documentos descargados y respuestas completas de acceso están en `/workspace/scratch/polvora-fuentes/` en este entorno, sin incorporarlos al repositorio. No se ejecutó build ni validación visual o publicación pública. No se envió formulario ni mensaje externo.
