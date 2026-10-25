# Correcciones visuales tras R3 — 25 de octubre de 2026

**Estado: propuestas v3 integradas para decisión visual del propietario.** Rama `codex/leishmaniosis-articulo-revision`, desde `8806f61581d21d3f46325bdd64cb6b543a325ce2`. Sin nueva ronda de auditoría, PR, cambio en `main`, publicación ni despliegue.

La [R3 independiente](https://github.com/Gunz-cop/CuidaTuPerroViejo/blob/claude/senior-dog-requirement-leishmaniosis-brief/docs/contenido/leishmaniosis-perros-mayores/auditoria-articulo-r3-visual.md) señaló correctamente que el recorte v2 tenía lomo casi recto, muslos llenos y cabeza alta. **Retiro las descripciones anteriores «ligera depresión tras la cruz» y «menor masa muscular» sobre ese v2.** Tampoco se veía una comprobación de holgura en la portada y la punción de consulta v2 era incoherente. Este informe sustituye esas valoraciones de `8806f61`; versiones y originales anteriores se conservan.

## Evidencia para decidir

- Recorte v3: [blanco a 390 px](correccion-r3/capturas/recorte-v3-claro-390.png), [oscuro a 390 px](correccion-r3/capturas/recorte-v3-oscuro-390.png), [recta cruz–grupa a 390](correccion-r3/capturas/recorte-v3-prueba-recta-390.png) y [a 1200](correccion-r3/capturas/recorte-v3-prueba-recta-1200.png).
- **[Cinco rasgos, candidato por candidato, y límites observables](correccion-r3/inspeccion-candidatos.md).** Ocho recortes y quince consultas; todos los PNG originales y descartes en [candidatos/](correccion-r3/candidatos/).
- Consulta: [móvil claro](correccion-r3/capturas/390-claro-consulta.png), [móvil oscuro](correccion-r3/capturas/390-oscuro-consulta.png), [escritorio claro](correccion-r3/capturas/1366-claro-consulta.png), [escritorio oscuro](correccion-r3/capturas/1366-oscuro-consulta.png), [punción ampliada](correccion-r3/candidatos/consulta-15-puncion-x3.png).
- Animación: [móvil claro](correccion-r3/capturas/390-claro-revision-1.png), [móvil oscuro](correccion-r3/capturas/390-oscuro-revision-1.png), [escritorio claro](correccion-r3/capturas/1366-claro-revision-1.png), [escritorio oscuro](correccion-r3/capturas/1366-oscuro-revision-1.png). Se capturaron los seis pasos en cada tamaño y tema.

Son observaciones y pruebas del productor. La decisión estética queda al propietario; no constituyen una revisión independiente.

## Recursos actuales

| Recurso | Archivo o componente | Cambios y observaciones |
|---|---|---|
| Portada | `mestizo-senior-colocacion-collar-v1.webp` | Sin regenerar. Alt exacto encargado: «Ilustración de una cuidadora ajustando un collar al cuello de una perra mestiza senior de hocico oscuro canoso, sentada en el recibidor de un piso». El pie visible del layout coincide, comprobado en navegador. |
| Casa | `mestizo-senior-anochecer-mosquitera-v1.webp` | Sin cambios. |
| Recorte v3 | `mestizo-senior-recorte-perfil-v3.webp` | Candidato 7. Hocico y cejas canosos, borde ocular claro, órbita sombreada, lomo cóncavo entre cruz y grupa, muslo estrecho y cabeza baja, cuatro patas distinguibles. Propuesta pendiente de decisión visual, con evidencia enlazada arriba. |
| Consulta v3 | `mestizo-senior-analisis-sangre-consulta-v3.webp` | Candidato 15. Jeringa pequeña con émbolo, aguja corta que termina en el antebrazo, poco rojo dentro del cilindro; sin sangre exterior. Sujeción proximal, dorso cóncavo y muslo más plano que v2. Un apoyo trasero queda oculto por los brazos. |
| Animación | [LeishmaniosisRevision.astro](../../../../src/components/article/LeishmaniosisRevision.astro) | Imagen v3, alt que describe la silueta y nuevas coordenadas para oreja, cara, cuatro pies y tronco. Guion y mecánica conservados. |
| Calendario | [LeishmaniosisCalendario.astro](../../../../src/components/article/LeishmaniosisCalendario.astro) | Primera leyenda: «Abril y noviembre: actividad variable». Meses: ene, feb, mar, abr, may, jun, jul, ago, sep, oct, nov, dic. Atribuciones y explicaciones conservadas. |
| Dos tablas | `LeishmaniosisTabla.astro` y datos del MDX | Sin cambios. Las cabeceras se incluyen ahora en la medición de contraste. |

Variantes nuevas de **1200×675, 800×450 y 400×225 px**. Recorte con alfa real 0–255 en los tres tamaños; consulta opaca. Doce WebP activos: **1.086.832 bytes**. Seis variantes históricas v2 conservadas: dieciocho archivos, 1.585.002 bytes. [Dimensiones, bytes y SHA-256](archivos.json). Los seis PNG anteriores siguen en `originales/`; los veintitrés nuevos, en `correccion-r3/candidatos/`. Ninguna URL anterior con caché de 30 días se sobrescribe.

### Recorte: medidas y transparencia

Recta entre grupa `(380,116)` y cruz `(760,103)`, lienzo 1200×675. En el contorno dorsal `(550,164)`, separación vertical de **53,8 px**, equivalente a **17,5 px a 390**. Nariz por debajo de la cruz. Es una prueba de silueta con puntos manuales, no un clasificador de edad.

Costado v3: **57,1/255**, media de `Y′ = 0,2126R + 0,7152G + 0,0722B` sobre ROI `(466,215,180,115)`. Con otra ROI corporal en v2 este método da 66,6; **no reproduce el método/ROI del auditor que obtuvo 82**. [Mediciones y SHA](correccion-r3/mediciones-recorte.json). No percibo halo a 390 px en blanco ni en `#1a1a1a`; [bordes claros ampliados](correccion-r3/capturas/recorte-v3-bordes-claro-x3.png) y [oscuros](correccion-r3/capturas/recorte-v3-bordes-oscuro-x3.png) quedan disponibles para revisar ese juicio.

### Consulta: lo visible y sus límites

Veterinaria a izquierda, tutora a derecha, collar gris, mirada hacia la tutora y alfombrilla azul. La mano de sujeción está por encima de la jeringa, con pulgar proximal. La otra mano sostiene un cilindro transparente con émbolo y aletas, con poca sangre dentro. El tramo de aguja termina en el contorno del antebrazo y no muestra punta libre flotando. Su inclinación es baja respecto de la superficie local. **No se puede acreditar una vena interna ni medir un ángulo anatómico real de 15–30° a partir de esta ilustración**: es una exigencia del prompt, no una medición del resultado.

La pata muestreada se extiende levantada hacia la veterinaria. Se ven el apoyo delantero opuesto y un apoyo trasero; **el otro apoyo trasero queda oculto por los brazos**, por lo que no afirmo que puedan contarse tres contactos visibles con la alfombrilla. Las uñas visibles son cortas; las del pie sujeto quedan parcialmente tapadas. La punta de la cola tampoco puede verificarse en este encuadre. Son límites que el propietario debe tener presentes al decidir. El alt enumera solo jeringa en pata extendida, hocico canoso, lomo cóncavo y sujeción de cabeza.

Primero se generó y seleccionó el recorte; después las consultas. [Prompts completos](correccion-r3/prompts-generaciones.md), [referencias de cada generación](correccion-r3/generaciones.json) y [motivos de descarte](correccion-r3/inspeccion-candidatos.md). Todos los prompts copian íntegro el bloque senior del brief y añaden las exigencias del encargo. No se deformó el cuerpo con código ni se dibujó una silueta sustitutiva.

## Texto preservado

- R2 conservado: [texto-aprobado-r2.mdx](texto-aprobado-r2.mdx), SHA-256 `fb0c77099efe30c3d6b3b677807dcca0e982427b61098bfbad7adfd3f2e63a2b`.
- MDX actual: `533c97656e8215538c2231594c1ef3c11e4c6899c4d9c21b75a302cd764cdd3a`; `../articulo-borrador.mdx` idéntico.
- Frente a `8806f61`, solo cambian dos líneas del MDX: `heroImageAlt` y el `<img>` de consulta (rutas/alt). El resto es idéntico. Frente a R2, cero líneas del texto retiradas. [Comprobación](correccion-r3/integridad-texto.json), [diff](integracion.diff), [SHA de integración](integracion-texto.json).
- [Proyección Markdown](proyeccion-markdown.md) regenerada desde el build y [copia de lectura](../articulo-lectura.md) con rutas de imagen relativas para GitHub. Párrafos clínicos, fuentes, tablas, avisos y FAQ conservados. Las métricas y capturas fuera de `correccion-r3/` son evidencia histórica de `8806f61`.

## Verificación técnica local

`npx astro build`: código 0 y 36 documentos de proyección. `npx astro check`: **0 errores, 0 warnings y 66 hints** del proyecto. [Build](correccion-r3/build.log), [tipos](correccion-r3/astro-check.log). Configuración, dependencias y estilos globales sin cambios.

Chromium sobre el build estático, fuentes Lora, Outfit y Plus Jakarta Sans cargadas. [Resultados completos](correccion-r3/verificacion-navegador.json), [script reproducible](correccion-r3/verificar.cjs), [registro](correccion-r3/navegador.log). Imágenes decodificadas; consulta/recorte eligen 400 px en móvil y 800 en escritorio. La portada sigue sirviendo 1200 px según el helper existente.

| Medición | 390 px claro / oscuro | 1366 px claro / oscuro |
|---|---|---|
| `scrollWidth` | 390 / 390 | 1366 / 1366 |
| Revisión: máximo entre seis pasos | 713,9 / 713,9 px | 822,2 / 822,2 px |
| Calendario, notas cerradas | 884,8 / 884,8 px | 782,7 / 782,7 px |
| Tabla de señales | 876,3 / 876,3 px | 695,9 / 695,9 px |
| Tabla de pruebas | 754,3 / 754,3 px | 625,3 / 625,3 px |
| Contraste mínimo con cabeceras de tabla | **4,50:1 / 5,52:1** | **4,50:1 / 5,52:1** |

El mínimo global documentado es **4,50:1, incluyendo cabeceras de tabla**. Sustituye 5,87:1, cifra anterior que las omitía. El JSON conserva las filas medidas. A 375 px, en ambos temas: `scrollWidth=375`, controles ≥44×44 px y calendario 901,1 px, aproximadamente el límite orientativo de 900. [Mediciones](correccion-r3/estrecho-375.json), [script adicional](correccion-r3/verificar-375.cjs).

Sin autoplay; avance cada cinco segundos, pausa estable, fin al sexto paso, repetición, flechas con teclado, foco de 3 px y controles/desplegables ≥44 px. Movimiento reducido deshabilita reproducción y permite avance manual. Sin JavaScript aparecen seis pasos sin controles (819,4 px en móvil). Impresión desde ambos temas: seis pasos, controles ocultos y tinta `rgb(32,62,50)` sobre blanco. [Movimiento reducido](correccion-r3/capturas/movimiento-reducido.png), [sin JS](correccion-r3/capturas/sin-javascript.png), [impresión desde oscuro](correccion-r3/capturas/390-oscuro-impresion-revision.png).

Siete FAQ operables con Enter, anclas internas válidas y cero errores JavaScript. Se prueba reinicialización sin duplicar eventos, `pagehide` y navegación Astro; la prueba de `visibilitychange` simula `document.hidden`, no una sesión real en segundo plano.

Las capturas aisladas ocultan solo durante la captura los elementos fijos/flotantes del sitio, como indica el script. Se bloquean terceros salvo Google Fonts, descargadas con `curl` mediante proxy y confianza TLS heredados y servidas a Playwright desde caché; TLS no se desactiva. No se han probado Safari/Firefox, lector de pantalla, móvil físico o impresión en papel/PDF: se emula `print`. Todas las comprobaciones son locales; no se afirma publicación real.
