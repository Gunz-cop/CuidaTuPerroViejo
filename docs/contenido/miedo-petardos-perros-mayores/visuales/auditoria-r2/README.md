# Evidencia propia R2

Versión auditada: f388b85e934ebf17a2454370992ef1727559e5f5, 2026-10-26. R1 no cambia.

- `*-390.png`: reducciones propias Lanczos a390×219 de los archivos nombrados; no capturas de navegador ni imágenes generadas nuevas. Portada original=imagen-1-v10.png, final=WebP v2, variante400=WebP v2-400. Paseo/consulta proceden de sus WebP v1 vigentes.
- `portada-original-franjas-nativo.png`: crop(1135,0,1672,490) de PNGv10. `portada-final-franjas-nativo.png`: crop(815,0,1200,350) de WebPv2. `portada-original-mano-nativo.png`: crop(1250,660,1672,900) de PNGv10. Sin escalado ni retoque; origen superior izquierdo, derecha/abajo excluidos.
- `390-*` y `1366-*`: 12 capturas propias de Chromium a viewport indicado, light/dark. Solo se ocultaron elementos fixed/sticky para evitar que taparan el recurso; no se editaron imágenes o tablas. Browser configs/caché en/tmp. Fuentes servidas desde caché previa; no se descargó red externa.
- `verificar-independiente.cjs`: prueba propia ejecutada sobre el build local existente. `verificacion-propia.json`: cajas, estilos, contraste sin redondear, caption/alt/schema, imágenes y fallback. El artículo testigo solicita una URL de Outfit no cacheada; se bloquea y consta como limitación tipográfica. La página principal carga las familias registradas.
- `contraste-etiquetas-confirmado.json`: segunda comprobación independiente de colores, opacidad y cálculo exacto, más predicción para otra sesión (no modificación real).
- `schema-html-comprobado.json`: extracción directa de ImageObject de los HTML reales en dist/client.
- `integridad-propia.json`: comparación de MDX normalizando solo los cambios autorizados contra a9ba533, hashes de fuentes R1 y comparación de testimonios/informe R1.
- `versiones-inspeccionadas.json`: hashesSHA-256 completos de todos los binarios seleccionados y código/contrato actuales.

Las 32 capturas de `../correccion-r1/capturas` y sus métricas son evidencia del productor; las nuevas están aquí. No se repitió el build ni el CLS. No se modificó producción.
