# Auditoría visual R2 — procesionaria del pino y perros

Fecha: 2026-11-08. Ronda **2 de 3** del alcance visual. Revisión independiente limitada a V1 de la R1: sustitución de la viñeta derecha del cierre y su integración. El texto permanece cerrado en APTO R4; esta revisión no consume la quinta ronda textual.

## Veredicto

**APTO visual local.** La única corrección pendiente está resuelta. La calle alternativa del panel derecho ya no discurre junto al pinar: muestra un recorrido urbano español despejado, con arquitectura y materiales coherentes con el resto de la serie. Se mantienen los rótulos, la separación entre las dos decisiones y el mensaje de atención veterinaria ante sospecha de contacto. No se introducen afirmaciones clínicas, fechas, distancias ni instrucciones nuevas.

## Comprobación de la corrección

Se abrieron la nueva imagen de 1.200 px y la variante de 400 px. También se inspeccionaron las cuatro capturas de cierre en `verificacion-r2/`: 390 y 1.366 px, claro y oscuro. Todos los rótulos se leen, sin erratas ni recortes: «EL SIGUIENTE PASO», «SI SOSPECHAS CONTACTO», «ATENCIÓN VETERINARIA», «PARA EL PRÓXIMO PASEO» y «ELIGE OTRA RUTA». El panel izquierdo, la paleta y el contraste conservan la función comprobada en R1. Alt y pie siguen siendo fieles.

Las tres variantes se abren y decodifican: 1.200 × 676, 800 × 451 y 400 × 225. El cambio mínimo de proporción por redondeo no produce deformación apreciable ni afecta a la lectura. El nuevo recurso no contiene perros, por lo que no requiere una nueva comprobación senior.

Se comparó el MDX con `/tmp/procesionaria-visuales-mdx-r1.mdx`: solo cambian las rutas `v2` → `v3` de `href`, `src` y `srcset` de cierre. No cambian el alt, el pie ni la prosa. Se comparó el manifest con `/tmp/procesionaria-visuales-recursos-r1.json`: cambia exclusivamente el séptimo objeto, correspondiente al cierre. Los hashes de los otros seis WebP de 1.200 px coinciden con los registrados en R1; no se reauditaron sus imágenes ni sus fuentes.

## Versión revisada

Carpeta pública: `public/images/blog/procesionaria-pino-perros/`.

| Archivo | SHA-256 |
|---|---|
| `infografia-siguiente-paso-v3.webp` | `b9116f84cb036db57be1e296d7e7f37e59dd3359b12a9909d5af370aeaf8c139` |
| `infografia-siguiente-paso-v3-800.webp` | `4ec10c868b426465a83329132c2f7d19bcb39d96659e71e1ffb94fef02dd03f0` |
| `infografia-siguiente-paso-v3-400.webp` | `721bbb6ca05c7e773ca48839b027900c0d0cb89e2fc0da48dbe21aecfcc4768a` |

- MDX: `2c6d9ddadc72add3424f19dcc5e46e8ca1fbca14e1c76b34bbe22fed7bbadd51`.
- `recursos.json`: `1267b110d71dd6117ef8a86e56d4c66159e10d58806cbf697a42560e3ae84138`.
- Nuevo original registrado por producción: `/workspace/generated_images/exec-6f1d5c97-4b60-4df8-9dca-c93b6edf3efa.png`.

## Evidencia de integración

Se inspeccionó `verificacion-r2/navegador.json`, producido por el coordinador: el cierre decodifica en las cuatro configuraciones; sirve `v3-400` en móvil y `v3` en escritorio. Altura del recurso con pie: 334,55 px CSS en móvil y 487,22 px en escritorio. No hay desbordamiento horizontal ni errores JavaScript, y la ampliación con teclado funciona. Las capturas confirman lectura y presentación coherentes en ambos temas.

Se leyó el nuevo log del coordinador `verificacion/build-r2.log`: build completo, incluida proyección Markdown y generación de artefactos. Esta sesión inspeccionó la evidencia; no afirma haber repetido Playwright o build. La cifra contractual comunicada sigue siendo 5.960 palabras, y el diff revisado no modifica texto.

## Cierre del alcance

V1 queda resuelto; **sin bloqueantes visuales pendientes**. La aprobación local cubre los siete recursos combinando R1 y esta revisión limitada. No hace falta una tercera ronda por este ajuste. No equivale a aprobación visual del propietario ni acredita publicación, despliegue o fusión con `main`.
