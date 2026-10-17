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

## Personaje del selector: base y seis variantes

Archivos en `public/images/herramientas/movilidad-perro/`. Se conservan siete
másteres PNG RGBA de 1024 × 1024: `base`, `la`, `lb`, `ma`, `mb`,
`sa` y `sb`. Cada uno tiene WebP de 640, 400 y 240 px, sin recorte entre
estados, con calidad 80 y transparencia.

Exportación con Sharp/libwebp: reducción Lanczos3, `quality: 80`,
`alphaQuality: 60`, `effort: 6`, `smartSubsample: true`. La calidad del color
permanece en 80; la compresión del canal alfa permite mantener las siete
versiones de 640 px por debajo de 40 000 bytes. Los PNG conservan el alfa
original sin esta compresión.

| Estado | WebP 640 px (bytes) |
| --- | ---: |
| base | 23248 |
| la | 22930 |
| lb | 29210 |
| ma | 25156 |
| mb | 35296 |
| sa | 26038 |
| sb | 39106 |

Verificación: los 28 archivos tienen las dimensiones declaradas y canal
alfa; las esquinas son transparentes. La búsqueda de desplazamiento de la
cabeza en ±5 px devolvió (0, 0) en los seis estados frente a la base.
También se revisó visualmente la serie exportada sobre fondo crema.

La base se generó editando la referencia `movilidad-hero.webp`. El generador
devolvió un lienzo de 1254 × 1254: se encuadró su contenido en el máster
1024 × 1024, con el perro de 600 px de ancho y la sombra en la línea y=720.
Ese PNG fue la referencia de todas las variantes iniciales. Las salidas se
redujeron al mismo lienzo 1024 × 1024, sin encuadrarlas individualmente.
Se revisaron cabeza, lomo y patas; la búsqueda de desplazamiento de la
cabeza sirve como control de alineación, sin alterar la pose por software.
La primera `sa` se descartó por cambiar la cola. La `sb` final se editó
desde la `sa` corregida para conservar también el diseño de la silla.

### Prompts usados (texto literal)

Base, referencia: `public/images/herramientas/movilidad-hero.webp`.

> Using the attached hero as exact character reference, create ONE square 1024x1024 transparent PNG watercolor illustration of that same senior tricolor beagle. Same warm modern digital watercolor, clean drawing, soft paper texture within the painted subject, sage cream soft terracotta honey palette. Same black saddle, honey brown ears and flanks, white grey muzzle, white grey eyebrows, white chest and lower legs, dignified happy calm older face. Full body strict side profile facing LEFT, standing calmly on all four paws, relaxed tail, no harness or accessories. Center dog within x=210..810 and y=350..720 leaving generous transparent margins for later accessories and a bed. Ground contact at y=720. Very subtle soft translucent contact shadow only. No background, no floor, no furniture, no people, no objects, no text, logos, watermark. Transparent alpha background. This is the immutable base for seven aligned animation states: make a clear stable silhouette.

Variantes iniciales, referencia: `movilidad-perro/base.png`. Cada prompt
se compone del prefijo común siguiente más el texto específico del estado.

> Edit the attached transparent 1024x1024 base PNG IN PLACE. It is an animation state, so preserve the exact dog's contour, pose, anatomy, coat markings, expression, painted texture, size and pixel coordinates. Dog occupies x=212..812 y=308..720; paws baseline y=715. Do NOT zoom, recenter, rotate, redraw or move the dog or change its face. Keep canvas square with generous empty transparent margins and tiny existing shadow. Same warm watercolor sage cream terracotta honey palette. Add ONLY the described accessory. Background truly transparent alpha. No letters, text, logos, humans or additional objects. Output 1024x1024 transparent PNG. Accessory:

**la:**

> Four sage green non-slip socks, one on EACH of the four paws, fitted over the feet only. All four socks clearly visible.

**lb:**

> A long cream non-slip runner rug underneath all four paws, extending a little left and right of dog. Absolutely nothing worn by or placed on the dog.

**ma:**

> A padded soft terracotta REAR support harness fitted around the pelvis and upper hind legs, with a short dorsal carrying handle above the rump. No human hands, no front chest harness, paws remain in exactly their original places.

**mb:**

> A low light wood ramp BEHIND the dog, visible above or behind its back and off to the right, and a cream non-slip runner rug underneath the paws. Dog stands on the rug, not on the ramp, dog wears nothing.

**sa:**

> A lightweight rear canine wheelchair: two modest wheels flanking the rear legs, slender warm grey frame, sage padded rear support sling. Keep original happy relaxed face and ALL four legs in exactly the original positions; support rear body without lifting or changing pose. No extra objects.

**sb:**

> A lightweight rear canine wheelchair with two modest wheels flanking the rear legs, slender warm grey frame, sage padded rear support sling; AND a sage orthopedic dog bed with raised bolster edges, beside the dog, in the empty foreground below and to the right, within canvas margins. Keep original happy face and ALL four legs in exactly original positions; do not change dog's pose or silhouette.


Reintento **sa**, referencia: `base.png`; se usó el prompt completo de
`sa` anterior más esta corrección:

> Precision correction: the tail MUST retain the exact original silhouette and coordinates from the base: relaxed diagonal down toward the right, white tip ending at x=812,y=590 in the 1024 canvas. Do not lift or extend the tail. Keep the entire dog and every paw exactly registered to the base. The frame and wheels may occlude legs but cannot reposition them.

Reintento **sb** (entregado), referencia: PNG generado en el reintento
`sa`:

> Edit this transparent PNG IN PLACE, preserving the entire dog AND its wheelchair unchanged: exact same pixels, pose, silhouette including tail, paws, face, coat markings, equipment design, size and coordinates. Do not move, scale, redraw or recenter anything. Add ONLY one sage green orthopedic dog bed with raised bolster edges and cream cushion in empty transparent foreground below and to the right of dog. Bed around x=550..1180 y=900..1140 on this 1254x1254 canvas. Do not cover paws or wheels. Same warm watercolor style and sage cream terracotta honey palette. Keep transparent alpha background, same square canvas, subtle shadow. No text logos or additional objects.
