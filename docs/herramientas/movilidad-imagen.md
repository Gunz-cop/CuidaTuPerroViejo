# Imagen del selector de movilidad

Ilustración generada para `herramientas/movilidad-rediseno`: beagle senior en
casa, alfombra antideslizante, arnés trasero acompañado por manos adultas,
rampa y cama con bordes. Acuarela cálida, sin texto ni marcas comerciales.

Los archivos están en `public/images/herramientas/`, en WebP (calidad 84).

| Archivo | Tamaño | Uso |
| --- | --- | --- |
| `movilidad-hero-1536.webp` | 1536 × 864 | Máster horizontal 16:9 / escritorio |
| `movilidad-hero.webp` | 1200 × 675 | Escritorio y tarjeta para compartir |
| `movilidad-hero-800.webp` | 800 × 450 | Variante horizontal |
| `movilidad-hero-400.webp` | 400 × 225 | Miniatura horizontal |
| `movilidad-hero-movil.webp` | 900 × 675 | Móvil y tablet, recorte 4:3 |
| `movilidad-hero-movil-600.webp` | 600 × 450 | Pantallas intermedias |
| `movilidad-hero-movil-400.webp` | 400 × 300 | Móvil |

El `<picture>` de la página sirve el recorte 4:3 por debajo de 64rem y la
composición completa desde 64rem. `srcset` y `sizes="100vw"` permiten elegir
la resolución según el ancho y la densidad de la pantalla. Las dimensiones
declaradas reservan espacio durante la carga. En móvil y tablet el texto va
debajo; en escritorio ocupa el espacio libre de la izquierda. La tarjeta PNG
usa la versión horizontal de 1200 px.

El recorte móvil conserva al perro entero y las manos: sobre la generación
original de 1672 × 941 px se tomó el rectángulo (668, 110, 1672, 863).
El máster se ajustó a 1536 × 864 y las variantes se redujeron con Lanczos.
