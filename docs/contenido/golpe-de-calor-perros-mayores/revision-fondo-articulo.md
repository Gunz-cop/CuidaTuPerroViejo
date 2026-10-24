# Revisión de fondo del artículo, las imágenes y los apoyos visuales

| Campo | Valor |
|---|---|
| Documento revisado | `src/content/blog/golpe-de-calor-perros-mayores.mdx` en `codex/articulo-golpe-calor-imagenes` (commit `5cad4e2`) |
| Fecha | 2026-10-24 |
| Revisor | Sesión de Claude que generó el brief (no redactó el artículo) |
| Encargo del propietario | Auditoría de fondo, revisión de la corrección visual, ajustes y creación de apoyos visuales |
| Rama de los cambios | `claude/golpe-calor-revision` (sobre `5cad4e2`) |

## Veredicto

El artículo es **sólido y cumple el brief aprobado (R2)**: responde primero a la urgencia y separa las muertes espontáneas de las eutanasias. No compara el índice WBGT con temperaturas del aire, no da criterio casero para dejar de enfriar ni recomienda fármacos. Está escrito en español de España (tú y vosotros, sin americanismos) y cita las fuentes españolas comprometidas. `tono.py`: 0 muletillas por cada 1.000 palabras. El recuento de la entrega (4.264 palabras con su método) está dentro del contrato.

Había **un fallo de fuente** (H1) y varios detalles menores. Corregí todos en la rama de revisión. Las imágenes son de muy buena calidad. Dos de ellas tienen una incoherencia con el texto que conviene regenerar (§ Imágenes).

## Hallazgos y estado

| # | Severidad | Hallazgo | Estado |
|---|---|---|---|
| H1 | Mayor | «Qué hará el veterinario» atribuía a Bruchim 2017 el control de temperatura, la sueroterapia y la vigilancia de órganos. Bruchim no tiene apartado de tratamiento ni habla de sueroterapia (verificado sobre PMC5800390); la frase está en Hall et al. 2021, Discusión: «early temperature management, fluid therapy and supportive management of body systems affected». | **Corregido**: atribuido a Hall 2021 y añadida la frase verificada de Bruchim (Conclusiones: tratamiento y vigilancia «intensivos y prolongados»). |
| H2 | Menor | Los anclajes del BOE `#a24` y `#a60` no existen en la página consolidada: el lector llegaba al principio de la ley. Los anclajes reales son `#a2-6` (art. 24) y `#a6-2` (art. 60). | **Corregido**. |
| H3 | Menor | «Si estás solo… el cuidado del perro durante la marcha corresponde a un acompañante» se contradecía: si vas solo, no hay acompañante. | **Corregido**: enfriar antes de salir y, al volante, conducir con el aire puesto, sin atenderlo en marcha. |
| H4 | Menor | Alt de la escena de enfriamiento: decía «mojando el pecho», pero la imagen muestra agua vertida sobre el lomo que cae por el pecho. | **Corregido** en el alt. |
| H5 | Menor | Pie de la escena de casa: decía «Persianas bajadas», pero en la imagen entra sol directo al suelo por la persiana medio bajada. | **Corregido el pie**; recomendado regenerar la imagen (prompt abajo). |
| H6 | Observación | El recuento de olas de 2025 aparece en la Introducción y en H2-5. Es útil en ambos sitios y no se repite la cifra completa. | Sin cambio. |

## Imágenes

Las tres escenas consiguen lo que pedías: ambientación española creíble (cal, rejas, terracota, baldosa, azulejo, persiana de lamas), luz natural sin el tono cálido genérico y el mismo podenco en las tres. La portada v2 ya es coherente: perro y cuidadora avanzan juntos, con la correa floja de la mano al collar.

| Imagen | Valoración | Mejora recomendada |
|---|---|---|
| Portada v2 | Muy buena. Acción coherente y escena reconocible. | Opcional: reforzar la edad del perro (cejas y párpados canosos, lomo algo más hundido). A tamaño móvil puede leerse como adulto. |
| Enfriamiento | Muy buena: gesto claro, agua visible y teléfono y llaves preparados. | **Regenerar**: el ventilador eléctrico está en el suelo mojado, con el agua extendiéndose hacia él y el cable a la vista. Contradice el propio criterio de la adenda («elementos eléctricos fuera del agua») y enseña un riesgo real. |
| Casa fresca | Muy buena: vivienda reconocible y perro protagonista. | **Regenerar o aceptar el pie corregido**: aunque la persiana está medio bajada, entran rectángulos de sol directo sobre el suelo. Para el mensaje del artículo, conviene luz tamizada en franjas finas. |

### Prompts para ChatGPT

**1. Enfriamiento, corregido (sustituye a `podenco-senior-enfriamiento-evaporativo-v1`; guardar como `-v2`).**

```text
Usa exactamente el mismo perro y la misma cuidadora de la imagen de referencia adjunta (podenco andaluz macho de 12–13 años, pelo corto canela con pecho y hocico blancos, hocico y cejas canosos, orejas grandes erguidas, constitución delgada; mujer de unos 40 años, pelo castaño recogido, camisa verde salvia y vaqueros).
Mismo patio andaluz en sombra con azulejos, macetas de terracota y banco de obra.
La cuidadora, arrodillada al lado del perro, vierte agua fresca con una jarra sobre el lomo y el pecho; el pelo está mojado hasta la piel y el agua cae al suelo.
El ventilador está ENCIMA DEL BANCO DE OBRA, seco, a un metro del perro, apuntando hacia él; el cable sube por la pared, lejos del agua. El suelo bajo el ventilador y el banco está seco. Móvil y llaves en el banco, junto al ventilador.
Perro de pie, apoyos firmes, lengua algo fuera, mirada atenta; sin colapso ni dramatismo.
Cámara a la altura del perro, plano medio; luz de tarde en sombra, sombras suaves coherentes; texturas de pelo mojado, azulejo y barro cocido; profundidad de campo que deje leer manos, agua y ventilador.
Fotografía editorial documental, sin pose publicitaria. Evitar: ventilador o cables en el suelo mojado, hielo, toallas envolventes, agua en la cara.
```

**2. Casa fresca, corregida (sustituye a `podenco-senior-zona-fresca-casa-v1`; guardar como `-v2`).**

```text
Usa exactamente el mismo perro de la imagen de referencia adjunta (podenco andaluz senior, canela y blanco, hocico y cejas canosos).
Mismo salón de piso español: baldosa clara, mueble de madera, sofá con manta, cuenco cerámico con agua, ventilador de pie encendido.
La persiana de lamas de la puerta de la terraza está MEDIO BAJADA: entra luz tamizada en franjas finas, sin rectángulos de sol directo en el suelo; el perro descansa en la zona en sombra.
Perro tumbado de lado sobre la baldosa, relajado, con postura natural de perro mayor (lomo algo hundido, músculo de las patas traseras más fino).
Cámara ligeramente elevada, plano general; sombras coherentes con la persiana; texturas de pelo, cerámica y baldosa.
Fotografía editorial documental, sin catálogo ni marcas. Evitar: sol directo sobre el suelo o el perro, persiana subida.
```

**3. Opcional, para la animación: recorte del perro con fondo transparente.** Si quieres que el perro aparezca en la secuencia animada (pasos 2 y 3), pídelo así y lo integro yo:

```text
Usa exactamente el mismo perro de la imagen de referencia adjunta (podenco andaluz macho de 12–13 años, canela y blanco, hocico y cejas canosos, orejas erguidas, delgado).
Recorte realista de cuerpo entero con FONDO TRANSPARENTE (PNG), de pie, de perfil mirando a la derecha, cuatro patas apoyadas y visibles, cola y orejas completas, sin collar ni correa.
Pelo seco, luz neutra suave sin sombra proyectada, bordes limpios. Edad visible en cara y lomo.
Formato horizontal 1600×1000 con margen alrededor del perro.
```

## Origen del fallo H1

La atribución errónea nació en el brief aprobado, que asignaba a S3 (Bruchim) el apartado «Qué hará el veterinario». El brief no se reabre por esto; queda registrado aquí para futuras actualizaciones.

## Corrección del criterio visual compartido

`direccion-visual-editorial.md` está muy bien planteado: obliga a decidir escena, materiales, gesto y geometría antes de escribir el prompt, y adopta el cuidado de la escena sin convertir España ni el podenco en plantilla. Añadí tres comprobaciones a «Revisión de la imagen generada», que salen de esta revisión:

1. **Escena físicamente segura**: nada eléctrico sobre suelo mojado ni objetos que el artículo desaconseja.
2. **Imagen, pie y alt dicen lo mismo**.
3. **Edad visible sin buscarla**: no basta con el hocico canoso.

## Apoyos visuales creados

El artículo tenía dos tablas apilables y tres imágenes, pero ninguna animación ni infografía. Añadí `src/components/article/GolpeCalorRecursos.astro`, con dos variantes y sin dibujar el perro:

| Recurso | Sección | Qué enseña | Altura en móvil (390 px) | Altura en escritorio (1366 px) |
|---|---|---|---|---|
| `primeros-minutos` | Al empezar «Qué hacer en los primeros minutos» | Secuencia de 4 pasos: sombra y llamada; agua hasta la piel (el agua atraviesa el pelo); aire en movimiento sobre el pelo mojado (ventilador girando, vapor); traslado con el aire puesto hasta la clínica | 498–518 px según el paso | 635 px |
| `umbrales` | «No esperes al aviso amarillo» | Escala de temperatura del aire con los 30 y 32 °C de la guía del Ministerio y el aviso amarillo de la AEMET; tres zonas de ejemplo (34, 36 y 38 °C) que el lector elige, y la distancia en grados respecto a la referencia del Ministerio | 790 px | 646 px |

Comprobado en navegador (Playwright, `verificacion-navegador.json`, capturas en `recursos-animados/`):

- Sin reproducción al cargar. Botones anterior, reproducir/pausar, siguiente y repetir; avance cada 5,5 s y parada en el último paso. La pausa congela el paso (comprobado durante 6 s). Funciona con teclado y todos los objetivos táctiles miden al menos 44 px.
- Con movimiento reducido, «Reproducir» queda desactivado y se avanza con las flechas.
- Sin JavaScript se ven los cuatro pasos como texto, la escala con la franja de 34–38 °C y la leyenda; los controles quedan ocultos.
- Sin desbordamiento horizontal a 390 y 1366 px, en claro y en oscuro. La tarjeta mantiene sus propios colores en modo oscuro y los detalles empiezan plegados.
- Error de consola único: `404 /api/feedback`, propio del servidor estático de prueba (la API vive en el Worker), ajeno a estos componentes.
- `npx astro build` correcto, incluida la proyección Markdown; `npx astro check` con 0 errores y 0 advertencias. Comprobación local, sin publicar.

Fuentes que sostienen los recursos: Hall et al. 2023 y COLVEMA (secuencia), guía del Ministerio de 2024 y anexo de umbrales Meteoalerta de la AEMET (escala). No añaden cifras nuevas al artículo.
