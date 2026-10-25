# Prompt para la sesión que corrige los recursos visuales (tras la auditoría R3)

Pegar tal cual en la otra sesión.

---

Trabaja en el repositorio Gunz-cop/CuidaTuPerroViejo, en la rama `codex/leishmaniosis-articulo-revision` (parte del commit `8806f61`). No toques `main`, no abras PR, no despliegues. Lee primero `AGENTS.md`, `.agents/skills/references/direccion-visual-editorial.md` (sobre todo «Requisito senior verificable») y `.agents/skills/crear-animaciones-articulo-blog/SKILL.md`. La auditoría independiente R3 dio NO APTO y está en `docs/contenido/leishmaniosis-perros-mayores/auditoria-articulo-r3-visual.md` (rama `claude/senior-dog-requirement-leishmaniosis-brief`); léela entera, sus hallazgos P0-1, P1-1, P1-2 y la sección «Qué corregir, en orden» son tu encargo. El brief es `briefings/briefing-leishmaniosis-perros-mayores.md` (§8 y §9.7).

## Qué falló y por qué importa

El recorte transparente del perro se ve, a 390 px, como un adulto en forma con la cara canosa: línea dorsal recta, muslos llenos, cabeza erguida. Es el mismo fallo que motivó que el repositorio exija el perro senior de forma verificable, y la animación entera se apoya en ese recorte. Tu alt decía «menor volumen muscular» y la entrega «ligera depresión tras la cruz»: ninguna de las dos cosas se veía. **Describe en alts e informe solo lo que ves.**

Los generadores de imagen tienden a dibujar un perro joven y atlético aunque el prompt diga «senior». Un prompt largo no basta: hay que forzar la anatomía con exigencias medibles, generar varios candidatos y elegir comparando con criterio, no con el primero que valga.

## Orden obligatorio (el recorte cambia los marcadores de la animación)

### 1. Recorte → `mestizo-senior-recorte-perfil-v3` (nombre nuevo por la caché de 30 días)

Referencia de identidad: `mestizo-senior-colocacion-collar-v1.webp` (portada). El recorte v2 solo vale como referencia de pose de perfil. Mismo perro: mestizo de tipo pastor-mastín, hembra de 12–13 años, pelo corto atigrado **marrón casi negro** (más oscuro que el v2: luminancia media del costado ≈ 55–70 en lugar de ≈ 82, para que case con las escenas), pecho y calcetines blancos, orejas semicaídas oscuras, cola larga con la punta blanca.

Copia **íntegro** el bloque de edad visible de la §8 del brief y añade estas exigencias medibles:
- **Línea dorsal visiblemente hundida tras la cruz** (que se note al trazar una recta de la cruz a la grupa).
- **Muslos y cuartos traseros delgados**, con cadera y pelvis marcadas; hombros con menos masa; costillas discretamente visibles.
- **Cabeza y cuello bajos**: nariz por debajo de la línea de la cruz, cuello sin arco alerta; apoyos algo cerrados y prudentes.
- Canas abundantes en cejas y en el borde de los párpados, además del hocico.
- Perfil lateral estricto mirando a la derecha, cuatro patas separadas y distinguibles, sin collar, fondo transparente real, sin sombra, bordes sin halo.
- Termina el prompt con: «Rechazar si a 390 px parece un adulto en forma».

Proceso: genera **al menos cuatro candidatos**, descarta los que muestren lomo recto o muslos llenos y quédate con el que cumpla. Compón el elegido sobre `#ffffff` y `#1a1a1a`, redúcelo a 390 px de ancho y anota **uno a uno** los cinco rasgos (canas en hocico/cejas/párpados; ojos hundidos; lomo y musculatura; postura; sin enfermedad inventada), con sí/no. Haz también la prueba de la recta cruz–grupa sobre la imagen. Si el lomo o la musculatura siguen en «no», regenera. Si tu herramienta no consigue el resultado tras varios intentos, **dilo con claridad** y entrega los candidatos y lo que falla; no lo presentes como aprobado.

Genera las variantes 800 y 400 px, comprueba alfa y halo y actualiza: la constante `image` en `src/components/article/LeishmaniosisRevision.astro:3`; el alt de `:21` (solo lo que se ve); las elipses `data-zone` de `:25-28` según la nueva pose (orejas, ojo y hocico, uñas, cuerpo); `visuales/archivos.json`; `visuales/prompts.md`; la fila del recorte en `visuales/entrega-visuales.md` y los SHA-256. Conserva los PNG originales y versiona los descartados.

### 2. Consulta → `mestizo-senior-analisis-sangre-consulta-v3`

Mantén escena, veterinaria a la izquierda, tutora a la derecha, collar gris visible, perra mirando a la tutora, alfombrilla azul, tres apoyos con una pata delantera levemente levantada. Corrige la punción: la veterinaria sostiene con la izquierda la pata delantera extendida y ocluye la vena con el pulgar; con la derecha sujeta una **jeringa pequeña con la aguja ya introducida bajo la piel del antebrazo**, en ángulo bajo (unos 15–30°), con un poco de sangre solo dentro del cuerpo de la jeringa, **sin tubo de extracción lleno ni aguja al aire**, sin sangre fuera de la jeringa. **Uñas cortas y romas**. Lomo ligeramente hundido tras la cruz y cuartos traseros con menos masa (en la v2 era la perra más robusta de las tres escenas: debe coincidir con el recorte v3). Mismo bloque de edad visible íntegro y la línea «Rechazar si a 390 px no se entiende que la aguja entra en la vena o si la perra parece un adulto en forma». Mismos candidatos y misma anotación rasgo a rasgo a 390 px. Actualiza el nombre en `src/content/blog/leishmaniosis-perros-mayores.mdx` (línea ~179: `src` y `srcset`), variantes, alt, `archivos.json`, `prompts.md` y entrega.

### 3. Portada (sin regenerar)

En `leishmaniosis-perros-mayores.mdx:8` pon el alt del brief: «Ilustración de una cuidadora ajustando un collar al cuello de una perra mestiza senior de hocico oscuro canoso, sentada en el recibidor de un piso». Hoy afirma «comprobando la holgura» y esa comprobación no se ve. Revisa que el pie visible diga lo mismo que se ve.

### 4. P2 al pasar por los archivos

- Calendario (`LeishmaniosisCalendario.astro`, leyenda de la primera tarjeta, `index === 0`): añadir «Abril y noviembre: actividad variable».
- Abreviaturas de mes: «ene, feb, mar, abr, may, jun, jul, ago, sep, oct, nov, dic».
- En la entrega, corregir el contraste mínimo: 4,50:1 incluyendo cabeceras de tabla (no 5,87:1).

## Reglas

- **No reescribas el texto aprobado** (R2, SHA-256 `fb0c77099efe30c3d6b3b677807dcca0e982427b61098bfbad7adfd3f2e63a2b`): solo cambian imágenes, alts, componente y entrega.
- No te autoapruebes: no escribas «APTO» ni «aprobado visualmente». Entrega evidencia (capturas de recorte sobre claro/oscuro a 390 px, la prueba de la recta, la tabla rasgo a rasgo) y deja la decisión estética al propietario.
- Tras los cambios: `npx astro build` (si el entorno no permite el build, dilo), capturas a 390 y 1366 px, claro y oscuro, de la animación y de la consulta; `scrollWidth` igual al ancho de ventana; animación sin autoplay y con teclado, movimiento reducido e impresión como antes.
- Sube a la misma rama con commits claros y dime el commit. La revisión posterior la hará el propietario con el auditor; esto ya no cuenta como ronda de auditoría.
