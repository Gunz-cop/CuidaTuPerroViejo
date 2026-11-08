# Evidencia de R2

Artículo auditado: commit `4a893e9a7c54557ae407e5bf79d44795bf5b17c9`; SHA-256 `e09045717489e293d3cbddd087890230ac00721fcb4508ab3820e87db6b2e6ea`.

- `comprobaciones-independientes.json`: verificador de R1 ejecutado sobre el artículo nuevo; mismo método, 5.946 palabras y comparación literal con España. No se usa su comparación bruta de marcado como prueba de copia.
- `integracion-testimonios.json`: menciones y posición por H2. Líneas reales del MDX; alcance anterior a bibliografía y FAQ, incluyendo encabezados. Contar nombres sirve para comprobar ausencia/concentración, no para medir integración por sí solo.
- `aperturas-fuentes.json`: patrón explícito que localiza 14 aperturas documentales de 36 H3. Es una ayuda a la lectura, no un detector de IA ni una regla de aprobación.
- `metricas-script-original.txt`: salida oficial con las incompatibilidades de formato explicadas en el informe.
- `tono.txt`: salida oficial con sus propias exclusiones; no representa el volumen del contrato.
- `medir-narrativa.py`: reproduce los dos recuentos narrativos; escribir los JSON en esta carpeta actualiza sus resultados con el archivo de ese momento.

El volumen se reproduce con el verificador de R1:

```bash
python3 docs/contenido/miedo-polvora-perros-mayores/auditoria-articulo-r1-evidencias/comprobar-snapshot.py
```

Ese script deja `comprobaciones.json` en la raíz; la ejecución de R2 copió el resultado aquí y retiró su propia salida temporal. No modifica el MDX. Las otras comprobaciones se reproducen con los comandos de la skill y con `medir-narrativa.py`.

La tabla del informe distingue las fuentes reabiertas en R2 de los documentos originales conservados desde R1 en `/workspace/scratch/polvora-fuentes/`. No se afirma haber descargado otra vez esos documentos ni leído un PDF editorial al que no se accedió. No se envió formulario, mensaje o denuncia, ni se ejecutó el build en R2.
