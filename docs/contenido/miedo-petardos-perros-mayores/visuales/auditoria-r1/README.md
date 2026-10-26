# Evidencias propias de R1 visual

Fecha: 2026-10-26. Revisión independiente sobre HEAD e186e0e967b3837452245b3141c8ceff6d986ea8.

Los PNG `*-390.png` son reducciones reales a 390×219 con Pillow/Lanczos, calculadas desde cada fuente nombrada. `portada-variante400-390.png` procede del WebP de 400×225. No son capturas de navegador ni ampliaciones de una miniatura.

Los `*-nativo.png` son recortes sin escalado, retoque, relleno ni corrección. Coordenadas `(izquierda, arriba, derecha, abajo)`, origen superior izquierdo; derecha/abajo excluidos:

| Evidencia | Fuente | Rectángulo |
|---|---|---|
| paseo-final-pies-nativo.png | WebP final paseo, 1200×675 | (235,425,795,620) |
| paseo-original-pies-nativo.png | imagen-2-v8.png, 1672×941 | (325,590,1110,865) |
| paseo-original-correa-nativo.png | imagen-2-v8.png | (365,0,1000,640) |
| portada-original-mano-nativo.png | imagen-1-v9.png | (1250,660,1672,900) |
| consulta-original-manos-nativo.png | imagen-3-v1.png | (350,245,1500,650) |
| portada-final-pared-persiana-nativo.png | WebP final portada, 1200×675 | (815,0,1200,350) |
| portada-original-pared-persiana-nativo.png | imagen-1-v9.png | (1135,0,1672,490) |
| imagen-1-original-tronco-nativo.png | imagen-1-v9.png | (280,320,930,650) |
| imagen-2-original-tronco-nativo.png | imagen-2-v8.png | (300,410,1000,720) |
| imagen-3-original-tronco-nativo.png | imagen-3-v1.png | (340,280,1000,700) |
| paseo-descarte-v1…v7-pies-nativo.png | imagen-2-v1…v7.png, respectivamente | (0,470,1250,941) |

`paseo-v1-v8-contacto-anatomia.png` es un contacto de orientación, con miniaturas a máximo 450×253 y rótulos externos. El hallazgo de tres zapatos de v6 se funda en su recorte nativo, no en este contacto.

`versiones-inspeccionadas.json` registra dimensiones, bytes y SHA-256 de los cuatro WebP públicos, los tres originales seleccionados, el descarte v6 usado como evidencia positiva, el brief y el MDX de docs. Los binarios de producción se conservan intactos.

Las capturas de `../integracion-completa/` son evidencia anterior del productor. La auditoría las abrió e inspeccionó pero no repitió el build, Playwright ni las mediciones de contraste/CLS.
