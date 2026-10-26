# Auditoría visual independiente R2 — miedo a los petardos

Fecha: 2026-10-26. Rama: `claude/imagenes-miedo-petardos-perros-mayores`. Commit de producción auditado: **`f388b85e934ebf17a2454370992ef1727559e5f5`**. Auditor separado del productor; sin edición de producción. R1 queda intacta. R2 no es una auditoría clínica ni reabre el brief.

## Veredicto

**NO APTO el conjunto de integración:** las etiquetas móviles claras de las tablas dan **4,4976501495:1**, por debajo de 4,5:1 sin redondear. **Las tres imágenes finales son APTO**, y los tres hallazgos de R1 están corregidos.

| Recurso actual | Veredicto | Comprobación |
|---|---|---|
| Portada PNG `imagen-1-v10.png`, WebP `…refugio-dormitorio-nochevieja-v2.webp` y `-v2-400.webp` | **APTO** | Franjas rojas **y** amarillas en pared interior, legibles a 390; anatomía y cinco rasgos senior conservados. |
| Paseo PNG v8 / WebP v1 | **APTO** | SHA-256 idénticos a R1; reducción propia actual inspeccionada. Dos zapatos humanos, cuatro patas y doble sujeción. No se reutiliza v6. |
| Consulta PNG v1 / WebP v1 | **APTO** | SHA-256 idénticos a R1; reducción propia actual inspeccionada. Anatomía y gesto de consulta conservados. |
| Tablas: alturas, contenido y apilado | **APTO** | Medición propia 777,53125 / 889,921875 px a 390, sin desbordamiento horizontal. |
| Pie hero y campo opcional con fallback | **APTO** | Pie literal del brief visible; alt independiente y schema coherente; fallback de otro artículo comprobado. |
| Contraste de etiquetas compactas a 390 claro | **NO APTO** | 22 etiquetas de 12 px y opacidad 0,75: contraste exacto 4,4976501495:1. |

APTO visual no aprueba el contenido clínico ni acredita publicación. No hace falta generar otra imagen para subsanar el único bloqueo de R2.

## Pruebas y versiones

Contrato: §8 y §11, autorizaciones de postura/encuadre y correcciones de R1. Se mantiene la skill y referencias ya leídas en R1. Se abrió **cada archivo nuevo real**: PNG 1672×941, WebP 1200×675 y variante 400×225, luego sus tres reducciones propias a 390×219. Se revisaron recortes nativos de franjas y mano; no se retocó ni corrigió la imagen.

Se abrieron ocho capturas reales del productor en `correccion-r1/capturas/`: portada en cuatro combinaciones 390/1366 claro/oscuro, calendario 390 claro/1366 claro, encuesta 390 oscuro/1366 oscuro. Además se ejecutó **Playwright propio** sobre el build local ya servido en `127.0.0.1:4466`, Chromium del sistema, viewport 390/1366 y claro/oscuro. Se midieron cajas, estilos de etiquetas, caption, alt, schema, imágenes decodificadas, overflow y fallback; se produjeron **12 capturas nuevas** de portada y dos tablas. Se abrieron capturas propias para contrastar pie, franjas y etiquetas. **No se volvió a compilar**; el build previo correcto sigue siendo evidencia del productor. No se desplegó.

Las fuentes de la página principal se sirvieron desde la caché local preexistente, sin descargar red externa. Una URL de Outfit solicitada al abrir el artículo testigo no estaba en esa caché y se bloqueó: no invalida la igualdad caption/alt o la presencia/ausencia de `data-compacta`, pero limita la prueba tipográfica del testigo. No se usa ese testigo para certificar métricas de tipografía. Cero errores JavaScript observados. CLS y los avisos conservan la prueba del productor; no se afirma haber vuelto a medir su CLS ni haber inspeccionado las 32 capturas completas.

Evidencia propia y método: [README](auditoria-r2/README.md), [script](auditoria-r2/verificar-independiente.cjs), [resultados navegador](auditoria-r2/verificacion-propia.json), [contraste confirmado](auditoria-r2/contraste-etiquetas-confirmado.json), [schema extraído del HTML real](auditoria-r2/schema-html-comprobado.json). **Hashes completos, bytes y dimensiones actuales**: [versiones-inspeccionadas.json](auditoria-r2/versiones-inspeccionadas.json). La integridad se verificó por cuenta propia, no aceptando únicamente `correccion-r1/integridad.json`: [integridad-propia.json](auditoria-r2/integridad-propia.json).

## Cierre de R1 y anatomía de la portada nueva

**P1-01 de R1, cerrado.** Ahora se ven varias franjas finas rojas y amarillas sobre el plano interior opaco junto/alrededor de la parte superior del radiador. Localización original: aproximadamente `x=1160…1290,y=40…155`, sobre 1672×941; final: `x=832…926,y=29…112`, sobre 1200×675. En [recorte nativo PNG](auditoria-r2/portada-original-franjas-nativo.png) y [WebP](auditoria-r2/portada-final-franjas-nativo.png) se distingue ese plano de las rendijas de la persiana. Las líneas siguen una dirección compatible con una proyección y continúan sobre la superficie del radiador; no se ven tubos, letras ni bandas pintadas. El brillo es más intenso que en v9, pero ocupa una zona pequeña y no convierte toda la escena en un baño cálido ni tapa al perro. [Final a 390](auditoria-r2/portada-final-390.png), [variante400 a 390](auditoria-r2/portada-variante400-390.png): ambos colores siguen distinguibles. El alt que dice «en la pared» ya tiene correspondencia visible.

**Anatomía humana nueva:** una sola mano entra por el borde inferior derecho y continúa en muñeca/manga granate; se aprecian pulgar y cuatro dedos con contornos compatibles, sin sexto dedo o fusión imposible. [Recorte nativo](auditoria-r2/portada-original-mano-nativo.png). Cero piernas y cero zapatos humanos visibles, igual que R1. **Anatomía canina:** cuatro patas —dos delanteras extendidas, posterior cercana plegada y posterior lejana con almohadillas visibles—, una cola continua y apoyos plausibles sobre cama. Sin miembro adicional, pata flotante ni nueva deformación discernible. Se conserva la postura autorizada con mentón levantado.

| Rasgo senior comprobado de nuevo | PNG/WebP grandes | Reducciones reales a 390 |
|---|---|---|
| Canas en hocico, cejas y párpados | Hocico moteado gris, aclarado del contorno ocular y cejas fuego apagadas. | Se mantiene la máscara aclarada alrededor de ojo/hocico; no se cuentan pelos. |
| Ojos algo hundidos y párpados caídos, sin velo | Ojo marrón bajo arco palpebral pesado, apertura pequeña y pliegue inferior; efecto leve. | Sigue la forma de ojo pequeño/sereno bajo ceja, sin ojo abierto en exceso ni catarata. |
| Lomo y masa muscular de mayor | Dorso suavizado, muslo/grupa afinados y relieve discreto de cadera, sin emaciación. | Silueta del costado y muslo legible; no se ha convertido en cuerpo atlético. |
| Postura natural de mayor | Tumbada extendida sobre codos, cabeza levantada con calma conforme a autorización. | Gesto tranquilo y apoyos comprensibles. |
| Sin enfermedad inventada | Boca cerrada; sin heridas, calvas, ojos rojos o sufrimiento añadido. | No aparece una señal patológica nueva. |

Identidad conservada: bodeguero tricolor de pelo corto, antifaz derecho aclarado, marcas fuego apagadas, patrón negro dorsal/de grupa, orejas plegadas, cola larga, collar gris y chapa lisa. Habitación, mano sin contacto, cama, agua y juguete siguen coherentes; sin cables, llamas o riesgos nuevos visibles. No se puede medir una distancia real de tres metros ni certificar edad/peso, ISO o Kelvin desde esta ilustración.

**P1-02 de R1, cerrado en alturas.** La medición propia coincide exactamente con la del productor:

| Ancho / tema | Calendario, altura CSS | Encuesta, altura CSS | scrollWidth |
|---|---:|---:|---:|
| 390 claro | 777,53125 | 889,921875 | 390 |
| 390 oscuro | 777,53125 | 889,921875 | 390 |
| 1366 claro | 488,5625 | 650,34375 | 1366 |
| 1366 oscuro | 488,5625 | 650,34375 | 1366 |

Las dos tablas quedan por debajo de ≈900 px en su estado inicial móvil. La primera celda identifica cada tarjeta sin rótulo duplicado; las otras conservan rótulo inline. Se mantienen cinco/seis filas. Las seis celdas de valoración conservan `data-label` largo y tienen `data-label-corto="Según los dueños"`; el contexto de encuesta no desaparece. La comparación exacta del MDX al normalizar solo ruta hero, caption, `compacta` y esos seis atributos da igualdad contra `a9ba533`: texto y cifras no cambiaron. No se evaluó de nuevo su fundamento clínico.

**P2-01 de R1, cerrado.** El pie visible es literalmente «Un refugio preparado con antelación: lejos de la ventana, persiana bajada, cama conocida, agua y un juguete relleno». El alt conserva su descripción propia. El ImageObject del HTML usa v2 y el pie nuevo. Otro artículo sin `heroImageCaption` conserva caption igual a su alt en navegador y schema.

## Hallazgos nuevos de R2

### P0

Ninguno confirmado.

### P1-R2-01 — contraste móvil claro ligeramente inferior al umbral, oculto por redondeo

**Ubicación:** `src/components/article/TablaApilable.astro:23`, opacidad `0.75` de `td[data-label]::before`, heredada también por la variante compacta de las dos tablas del artículo. En la nueva integración se muestran **22 etiquetas** a viewport 390 claro: diez del calendario y doce de encuesta. Tamaño 12 px; necesitan 4,5:1 como texto normal.

**Evidencia propia:** lectura de `getComputedStyle`, composición alfa y luminancia sRGB sin redondear: texto `rgb(66,72,67)`, fondo efectivo `rgb(250,249,244)`, opacidad 0,75 → color compuesto **(112;116,25;111,25)** → **4,49765014952612:1**. [Datos y cálculo](auditoria-r2/contraste-etiquetas-confirmado.json), [etiquetas en captura propia](auditoria-r2/390-light-encuesta.png). El mínimo propio en oscuro es 5,5169903533; en escritorio claro 4,5044920593.

La diferencia es pequeña y no constituye un riesgo clínico o anatómico. **Sí impide certificar el umbral ≥4,5**: mostrar 4,50 a dos decimales no demuestra alcanzarlo. El resultado previo del productor debe conservarse como evidencia histórica, con esta precisión añadida, sin sustituir el dato original retrospectivamente. La regla de opacidad ya existía antes: es un defecto detectado ahora, no una regresión causada necesariamente por `compacta`.

**Corrección concreta para otra sesión:** elevar el contraste de los pseudorrótulos **solo en las tablas compactas**, por ejemplo `opacity: .8` bajo el selector acotado `.content-body .tabla-apilable[data-compacta] td[data-label]::before`. Con los colores observados, el cálculo prospectivo daría **5,1243417399:1**, margen suficiente; esto es una predicción, no una prueba de código corregido. Repetir medición real tras build a 390/1366 claro/oscuro, sin redondear para decidir el umbral. No hace falta editar texto ni imágenes.

## Alcance global y regresiones

La revisión del diff contra `a9ba533` confirma: `heroImageCaption` es un `z.string().optional()` nuevo; el layout usa `heroImageCaption || heroImageAlt` en figcaption y schema, manteniendo el alt de la imagen. El fallback se verificó en **mal-aliento-perros-viejos**, cuatro combinaciones: caption igual al alt y tabla sin `data-compacta`, cuyo pseudorrótulo móvil sigue en bloque. Es una muestra de regresión y una revisión del selector/fallback, no una certificación de todos los artículos.

Las reglas nuevas de tablas solo actúan bajo `@media(max-width:640px)` y `[data-compacta]`; la prop es opcional y por defecto falsa. Solo los dos wrappers de este MDX usan esa opción. No se encontró cambio ajeno en esos tres archivos de código. Brief, testimonios y selecciones antiguas conservan los hashes; R1 permanece inmutable. No se dejó el borrador en `src/content/blog`.

## Qué corregir y qué conservar

1. Corregir únicamente el contraste descrito, registrar versión y pasar a **R3 visual, última ronda autorizada**. Conservar R1/R2 y los datos exactos de cada prueba.
2. Mantener las tres imágenes actuales; conservar el descarte v6 excluido. Portada, tablas en altura y pie ya pasan sus comprobaciones.
3. Repetir navegador/contraste de la nueva integración y verificar que no suben alturas ni cambia el fallback. No hace falta reabrir la clínica ni regenerar portada por este P1.

El auditor solo añadió informe/evidencias en `auditoria-r2/`; no hizo correcciones, commits, PR, merge o deploy.
