# Auditoría independiente de imágenes e integración

Fecha: 2026-10-15. Rama inspeccionada: `contenido/limpieza-ojos-oidos-senior`, en `/workspace/CuidaTuPerroViejo-completo`.

## Veredicto

**Apto visualmente y en integración local**: las tres escenas conservan el cocker senior, representan cuidados externos adecuados y se integran correctamente en las vistas comprobadas.

No hay defectos visuales bloqueantes. Esta aprobación independiente no equivale a aprobación visual del usuario ni a autorización de publicación. Build, check, proyección Markdown y navegador cuentan con evidencia revisada. Las pruebas se realizaron en la copia local; no demuestran despliegue remoto. No se abre otra ronda de auditoría del brief.

## Alcance y método

Se leyeron `AGENTS.md`, la skill `crear-animaciones-articulo-blog` y su referencia del baño senior. Se evaluaron exclusivamente los tres recursos nuevos, sus variantes y las diferencias de integración respecto del artículo textual aprobado. No se editaron archivos de producto ni se instalaron dependencias.

Las tres imágenes principales se **abrieron realmente con `view_image`** a1200×675. Los nueve WebP se abrieron y decodificaron además con Pillow para comprobar formato/tamaño, sin modificarlos. La inspección visual de las escenas se hizo sobre principales; las variantes no se presentan como revisadas en navegador.

## Inspección por escena

| Recurso | Inspección independiente | Alt y leyenda |
|---|---|---|
| `limpieza-ojos-cocker-senior.webp` | Cocker canela, orejas largas onduladas, cejas y hocico marcadamente blancos, expresión madura. Paño suave apoyado sobre piel debajo del ojo; la córnea permanece libre. Mano que sostiene bajo mandíbula sin agarre ostensiblemente forzado. Ojo sin lesión visible, no hay pus ni exudado. | Alt describe mujer, paño, piel bajo ojo y ausencia de contacto ocular; es fiel. Declara ilustración generada con IA y el layout lo muestra también como figcaption. No finge fotografía del estudio. |
| `masaje-base-oreja-limpiador-otico.webp` | Coinciden identidad facial, canela, blanco y orejas con hero. Mano en base externa de oreja, contacto suave verosímil; otra mano sostiene pecho. Frasco sin marca visible al fondo, sin boquilla introducida ni líquido a presión. La imagen estática ilustra posición de masaje, no demuestra movimiento. | Alt y caption corresponden a la posición visible. La leyenda limita la maniobra al cuidado indicado y obliga a parar ante dolor; incluye disclosure IA. No presenta el frasco como producto probado ni promete resultado. |
| `revision-semanal-oidos-perro-senior.webp` | Mismo sujeto, edad visible mediante blanco facial y postura reposada. Dos patas delanteras apoyadas, proporciones plausibles y cuerpo sobre superficie mullida; no se aprecian extremidades sobrantes. Mujer levanta pabellón sin instrumento. Piel rosada compatible con aspecto sano, sin pus, lesión ni enrojecimiento patológico evidente. | Alt describe inspección de pabellón en salón; fiel a escena. Caption precisa observación externa, sin garantía diagnóstica y sin obligación de limpieza. Disclosure IA presente. |

La edad exacta de13 años es la ficha ilustrativa, no un dato clínico deducible de una imagen. Las escenas muestran un perro reconociblemente mayor sin recurrir a cataratas o enfermedad artificial para aparentarlo. No identifican a un participante de Fefer o Moog. La continuidad visual se aprecia en frente, ojos, proporción del hocico, nariz, orejas y distribución del blanco facial; la variación de encuadre no cambia la identidad aparente.

## Anatomía, continuidad y composición

No se detectan deformidades claras de cara, orejas, apoyos o manos. Los dedos visibles mantienen articulaciones y agarres plausibles; los dedos parcialmente ocultos no se cuentan como ausentes. La tercera escena permite verificar patas/apoyos, mientras los encuadres próximos no pretenden mostrar cuerpo entero.

Las escenas usan interior doméstico coherente, la misma mujer/ropa de punto, luz natural y fondo suave. El gesto de cuidado se entiende a escala del recurso. No se añaden animaciones, infografías ni marcas comerciales fuera del encargo. No hay representación de oído infectado, secreción, úlcera, manipulación profunda o instrumento junto a la córnea.

## Archivos y marcado

Carpeta: `public/images/blog/limpieza-ojos-oidos-perros-ancianos/`.

| Serie | Principal | Variante800 | Variante400 |
|---|---|---|---|
| Ojos |1200×675,100.910 bytes|800×450,59.294 bytes|400×225,21.306 bytes|
| Masaje |1200×675,139.732 bytes|800×450,78.822 bytes|400×225,26.064 bytes|
| Revisión |1200×675,142.692 bytes|800×450,79.588 bytes|400×225,26.426 bytes|

Los nueve archivos existen, se decodifican y conservan proporción16:9. Rutas ASCII coherentes con referencias del artículo. No son sustituciones de imágenes publicadas previamente de este slug.

- Hero referenciada solo en frontmatter, sin duplicado de cuerpo. El layout existente `src/pages/[pilar]/[slug].astro` aporta1200×675, eager, async, prioridad alta, alt/figcaption y `srcset`.
- El helper existente `src/utils/image.ts` produce400w/1200w para hero: ambos archivos existen. La variante800 de hero está creada pero **no se selecciona mediante ese helper**; no se afirma que el hero sirva tres tamaños. No se propone cambiar el helper global para este artículo.
- Los dos recursos de cuerpo, líneas276 y349 del MDX, declaran1200×675, lazy, async, `srcset`400/800/1200 y `sizes`; todos los candidatos existen. Se resuelve la ausencia de dimensiones detectada en la auditoría textual.
- Los recursos de imagen no añaden CSS, etiquetas personalizadas ni componentes nuevos. La corrección de CSS scoped del encabezado FAQ se documenta al final. Las imágenes informativas tienen alt y no dependen de movimiento. No procede probar controles, pausa, temporizadores o reduced-motion de una animación porque el encargo contiene solo imágenes estáticas.

El marcado reserva proporción correcta; la ausencia real de CLS, la selección de recursos y la ausencia de desbordamiento requieren navegador y no se dan por demostradas solo con estos atributos.

## Comparación con texto aprobado

`diff -u` entre `/workspace/scratch/limpieza-ojos-oidos/articulo.mdx` y el artículo integrado muestra únicamente:

1. Cambio de `heroImageAlt` para describir la escena real y declarar IA.
2. Sustitución de dos imágenes Markdown por `img` con dimensiones y variantes.
3. Actualización de dos captions, con disclosure IA.

El resto del texto clínico y las fuentes permanece intacto. No se reabre su evaluación ni se afirma que una modificación visual cambie los límites de Moog o los datos de Fefer.

## Hallazgos y pendientes

**P0/P1 visuales: ninguno.**

No quedan pendientes técnicos bloqueantes en el alcance comprobado:390px y1440px, claro/oscuro, más funcionamiento nativo sin JavaScript. No se extrapola a todos los tamaños y navegadores posibles.

No se debe escribir «aprobado por el usuario» hasta que lo haya visto y aprobado. Esta auditoría no ejecutó commit, push ni publicación.

## Evidencia técnica recibida y comprobada

La sesión principal comunicó build completo; se inspeccionó `/workspace/scratch/limpieza-ojos-oidos/astro-build.log`: termina `Complete!`, genera sitemap, proyección Markdown31documentos y artefactos de búsqueda. El código0 lo reporta la sesión ejecutora; no se inventa un segundo build independiente.

Se inspeccionó `/workspace/scratch/limpieza-ojos-oidos/astro-check.log`:173archivos,0errores,0warnings y59hints. No se encontraron coincidencias del nuevo slug en ese log.

Se abrió además `dist/client/agent-content/v1/documents/article--limpieza-ojos-oidos-perros-ancianos.md`: conserva las tres imágenes con URL absoluta, alt y disclosureIA; los nuevos `img` no impiden proyectar el artículo. La evidencia final de navegador se describe a continuación.

## Cierre con evidencia de navegador y corrección FAQ

Se leyó `revision-navegador.json`, generado por la sesión ejecutora tras el último build. Contiene cuatro casos: móvil390px y escritorio1440px, claro y oscuro. En todos: HTTP200, un H1, tres imágenes cargadas/decodificadas, siete FAQ, apertura mediante teclado confirmada, cero errores registrados y `scrollWidth` igual a viewport. El breadcrumb tiene desplazamiento interno deliberado y no se interpreta como desbordamiento de página.

Selección real de recursos: móvil utiliza400px en las tres escenas; escritorio usa principal1200 para hero y800 para cuerpo. No quedan imágenes rotas ni se sustituye la existencia de archivo por una presunción de descarga correcta.

Se inspeccionaron con `view_image` las capturas `movil-claro.png`, `movil-oscuro-tecnica.png`, `escritorio-oscuro.png`, `escritorio-claro-tecnica.png` y `movil-sin-javascript-faq.png`. Las vistas revisadas mantienen proporciones, legibilidad y continuidad del sujeto; las escenas de cuerpo encajan sin desbordar. La captura `movil-sin-javascript-faq.png` fue sustituida por una toma con scroll explícito al bloque FAQ y se volvió a abrir con `view_image`: ahora muestra la primera respuesta abierta, texto legible y foco visible en el control. La observación anterior sobre una captura del inicio queda corregida. Esta evidencia visual complementa el caso sin JavaScript del JSON, que declara contenido visible, siete FAQ y teclado correcto.

El JSON informa contraste calculado con composición alfa/canvas para los textos muestreados: mínimo4,77:1 en claro y7,42:1 en oscuro. Ambos superan4,5:1. No es una certificación de contraste de cada píxel o cada texto de todo el sitio.

La sesión principal detectó y corrigió desbordamiento real del título FAQ. Se revisó el diff de `src/components/FAQ.astro`: elimina `whitespace-nowrap`, añade `min-w-0`/centrado y CSS scoped con tamaño0,75rem, line-height1,5 y wrapping. Es una corrección pequeña coherente con el diseño compacto original `text-xs`; restaura que ese encabezado no herede el tamaño grande de los H2 del artículo. Mantiene h2 semántico, preguntas, `details`/`summary` y operación nativa. Aunque el componente es compartido, el selector queda limitado a su encabezado FAQ; no cambia estilos globales ni contenido clínico. No se detectan defectos de esta modificación.

Tras ese ajuste se revisaron nuevamente los finales de logs: build final `Complete!` (23:44:47), proyección31documentos y check173archivos con0errores,0warnings,59hints. Los resultados son evidencia de la ejecución principal inspeccionada por este auditor, no comandos de navegador/build repetidos por el auditor.

**Cierre:** la ausencia de tres imágenes y de dimensiones anotada en la auditoría textual queda resuelta. Texto aprobado y visuales/integración local aprobados; no hay commit, push ni despliegue autorizados o ejecutados por esta auditoría. No se reabre el brief ni se consume una nueva ronda de su límite.
