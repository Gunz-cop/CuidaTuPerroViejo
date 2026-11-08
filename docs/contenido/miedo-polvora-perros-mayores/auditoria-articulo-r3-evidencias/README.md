# Evidencia de R3

Commit del artículo auditado: `a7e5173`. SHA-256: `488660fb8051d33fc3d2c164c7cf22243ad17e117ddc27b3b7c2aa99b36c5fd4`.

- `comprobaciones-independientes.json`: verificador de R1 ejecutado sobre los bytes nuevos. Total 5.541; no coincidencias visibles de ocho palabras con España. Los targets antiguos se conservan en esa salida; la aceptación del presupuesto nuevo se razona en el informe.
- `integracion-testimonios.json`: menciones por línea y H2; no es un contador de experiencias diferentes.
- `aperturas-fuentes.json`: patrón descriptivo idéntico al de R2, 7 de 38 H3. No mide autoría humana/IA.
- `medir-narrativa.py`: copia del medidor de R2 para producir salidas en esta carpeta sin alterar la evidencia congelada de R2.
- `metricas-script-original.txt`: ejecución oficial, incluidos los falsos positivos de formato explicados en el informe.
- `tono.txt`: ejecución de tono.py; sus exclusiones difieren del contrato de palabras.
- `enlaces-internos.json`: catorce destinos estáticos comprobados contra archivos y pilares; no pruebas HTTP.

El conteo se reproduce con `auditoria-articulo-r1-evidencias/comprobar-snapshot.py`, que deja `comprobaciones.json` en la raíz. Esta ejecución copió su resultado aquí y retiró esa salida temporal. No se modificó el MDX. No se ejecutó el build ni se enviaron formularios o mensajes externos.
