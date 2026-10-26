# Auditoría visual independiente R1 — miedo a los petardos

Fecha: 2026-10-26. Rama: `claude/imagenes-miedo-petardos-perros-mayores`. HEAD: `e186e0e967b3837452245b3141c8ceff6d986ea8`.

## Veredicto

**NO APTO el conjunto visual para cerrar el gate de publicación:** la portada no representa las franjas rojas y amarillas sobre la pared exigidas por §8 y afirmadas por su alt.

**El paseo final NO tiene tres pies humanos.** Se ven dos zapatos y dos perneras, también en el PNG v8 seleccionado. **Sí hay tres zapatos en el descarte v6**; no se puede afirmar que fuera la imagen que vio el propietario sin disponer de su captura. El defecto confirmado del descarte no se atribuye al WebP final.

| Imagen realmente inspeccionada | Original seleccionado | Veredicto visual | Motivo |
|---|---|---|---|
| `bodeguero-senior-refugio-dormitorio-nochevieja-v1.webp`, incluida variante `-400.webp` | `imagen-1-v9.png` | **NO APTO** | Falta la proyección de franjas rojas y amarillas sobre la pared; el alt declara esa ubicación. Anatomía sin anomalía bloqueante encontrada. |
| `bodeguero-senior-paseo-antes-de-nochevieja-v1.webp` | `imagen-2-v8.png` | **APTO** | Dos piernas/dos zapatos humanos, cuatro patas caninas y doble sujeción físicamente trazable. |
| `bodeguero-senior-revision-dolor-consulta-v1.webp` | `imagen-3-v1.png` | **APTO** | Cuatro patas, cuatro manos humanas relacionadas con sus brazos y exploración/sujeción coherentes. |

APTO se limita al recurso visual y la versión registrada: no aprueba el artículo, no equivale a aprobación del propietario ni acredita publicación. El build anterior que pasó no resuelve el defecto de portada ni los pendientes de integración.

## Alcance, contrato y pruebas

Auditor independiente del productor; rol exclusivo de evaluación. Ronda **R1 visual**, distinta de la R1 textual. Se leyeron AGENTS/CLAUDE, la skill `auditar-articulo-blog`, formato de informe, calidad editorial, voz, dirección visual y apoyos responsive. Contrato visual: **solo §8 y §11 del brief**, más las autorizaciones transmitidas por el propietario.

La postura extendida, apoyada en los codos y con mentón levantado de la portada v9 está autorizada. **No se rechaza por apartarse de la postura original** ni se propone volver a ocultar el dorso. Las adendas autorizadas del paseo v5–v8 y la guía auxiliar de topología tampoco constituyen un fallo.

Pruebas propias: apertura individual de los tres WebP a 1200×675 y los tres PNG a 1672×941; reducciones independientes de cada uno a 390×219 abiertas a su tamaño real; revisión de la variante hero 400×225 reducida a 390; recortes nativos de pies, manos, troncos, correa y pared. Además se buscaron zapatos extra en los descartes de paseo v1–v7 para contrastar la observación del propietario. No se regeneró ni corrigió ningún recurso.

Se abrieron las **12 capturas anteriores de imágenes** de `integracion-completa/capturas/` (tres imágenes × 390/1366 × claro/oscuro), y las capturas móviles de calendario claro y encuesta oscuro. Se consultaron JSON de navegador/contraste/dimensiones como evidencia previa identificada. **No se ejecutó de nuevo navegador, build ni contraste**. Las pruebas propias de tamaño son redimensionado de binarios y lectura de dimensiones de PNG, no una nueva ejecución de la integración.

Fuentes, coordenadas y transformaciones de las evidencias propias: [auditoria-r1/README.md](auditoria-r1/README.md). Versiones exactas, bytes y **SHA-256 completos**: [versiones-inspeccionadas.json](auditoria-r1/versiones-inspeccionadas.json). El MDX sigue en `docs/contenido/.../articulo-borrador.mdx`; no se copió a `src`.

## Hallazgos

### P0

**Ninguno confirmado en las tres selecciones finales.** No se encontró un miembro humano adicional, una pata canina duplicada ni una escena de manejo peligrosa. Esto no elimina los requisitos visuales pendientes siguientes.

### P1-01 — portada: ubicación de la luz incumplida y alt inexacto

**Ubicación:** WebP final portada, zona de pared/persiana `x=815…1200, y=0…350` sobre 1200×675; PNG v9 `x=1135…1672, y=0…490` sobre 1672×941. Alt en `articulo-borrador.mdx:8`. Contrato §8: «líneas finas de destellos rojos y amarillos […] dibujan franjas en la pared» y aceptación a 390 px de esas franjas. Alt: «destellos rojos y amarillos en la pared».

**Evidencia:** [final, recorte nativo](auditoria-r1/portada-final-pared-persiana-nativo.png), [original, recorte nativo](auditoria-r1/portada-original-pared-persiana-nativo.png), [final a 390](auditoria-r1/portada-final-390.png). Las líneas rojas/amarillas intensas están en las rendijas de la persiana. En el plano vertical a su izquierda aparece una mancha rojiza tenue y difusa; no se ve el par de franjas horizontales rojas y amarillas pedido en la pared. El suelo presenta reflejos de color, pero no es la pared. A 390 esta diferencia persiste. La variante de 400 hereda la misma escena.

**Por qué importa:** la ubicación física de esa luz fue parte explícita de la paleta/escena y del criterio de aceptación, y el texto alternativo atribuye a la imagen un detalle que no muestra como se contrató. No es un fallo de anatomía ni de seguridad. **Impide dar APTO a la portada bajo el contrato vigente**; no corresponde relajar el requisito ni cambiar el alt unilateralmente para aprobarla.

### P1-02 — integración anterior: las dos tablas exceden el presupuesto móvil

**Ubicación:** recursos de §11, calendario de H2-3 y encuesta de H2-7. `integracion-completa/verificacion-navegador.json` registra **991 px CSS** y **1291,359375 px CSS** de alto a viewport 390, en ambos temas; presupuesto de referencia ≈900 px. Apertura propia de capturas previas: calendario claro mide **358×992 píxeles de archivo**, encuesta oscura **358×1292**. Las diferencias de redondeo entre captura y caja CSS son normales.

Evidencia previa inspeccionada: [calendario](integracion-completa/capturas/390-claro-tabla-calendario.png), [encuesta](integracion-completa/capturas/390-oscuro-tabla-encuesta.png). Se apilan sin columnas fuera de pantalla, pero siguen ocupando más del presupuesto móvil. **Pendiente de diseño ya conocido**, separado de los tres binarios fotográficos. No se modificó texto ni estilos.

### P2-01 — integración anterior: el pie hero sustituye al pie encargado

`src/pages/[pilar]/[slug].astro:190`–192 imprime `heroImageAlt` en figcaption; las capturas claras y oscuras lo confirman. No muestra el pie del brief: «Un refugio preparado con antelación: lejos de la ventana, persiana bajada, cama conocida, agua y un juguete relleno». Es un pendiente preexistente de integración; además hace visible la inexactitud de luz de P1-01. No requiere alterar los otros dos pies, que sí corresponden a sus imágenes.

## Anatomía humana: recuento y trazado

Coordenadas aproximadas de localización sobre **cada WebP final de 1200×675**, origen superior izquierdo. Se revisaron primero las personas; ningún conteo se dedujo del prompt.

| Imagen | Piernas y zapatos | Manos y conexión al cuerpo | Resultado |
|---|---|---|---|
| Portada | **0 piernas y 0 zapatos humanos visibles**. Solo mano y muñeca entrando desde el borde inferior derecho, como exige el encuadre. El objeto oscuro del fondo junto a la persiana es un calcetín, no un pie conectado a una persona. | **1 mano**, `x≈915…1120,y≈495…610`, enlazada a muñeca y manga granate hasta el borde. Pulgar y cuatro dedos discernibles por contornos/nudillos en el original; no hay un sexto dedo ni una segunda mano. Apoya en el suelo sin tocar a la perra. | Sin defecto humano bloqueante encontrado. [Detalle nativo](auditoria-r1/portada-original-mano-nativo.png). |
| Paseo | **2 perneras / 2 zapatos**. Pernera posterior sigue diagonal hacia izquierda, desaparece detrás del cuerpo canino y reaparece sobre el zapato izquierdo `x≈245…420,y≈495…578`. La pernera anterior baja hacia derecha detrás del pecho y llega al zapato derecho `x≈560…790,y≈485…590`. Su talón bajo y puntera levantada están unidos por una suela continua. | **1 mano visible**, derecha del tutor, junto al bucle `x≈275…350,y≈10…90`; muñeca continua con manga de parka. Agarre cerrado con dedos superpuestos: no se ven cinco puntas independientes, pero no hay un dedo adicional ni fusión imposible discernible. Otra mano fuera del encuadre. | **No hay tercer zapato en el final.** [WebP: recorte nativo](auditoria-r1/paseo-final-pies-nativo.png), [PNG v8: recorte nativo](auditoria-r1/paseo-original-pies-nativo.png). |
| Consulta | **0 piernas/pies humanos completos visibles**, encuadre por encima/de detrás de la mesa. No se infiere su anatomía oculta. | **4 manos**: veterinaria sobre lumbar (`x≈310…430,y≈190…235`) y bajo abdomen (`x≈410…490,y≈325…380`); tutora sobre pecho (`x≈685…785,y≈315…420`) y con premio (`x≈920…1035,y≈270…365`). Cada mano tiene continuidad hacia su manga/brazo o un recorrido oculto compatible con el torso y la mesa. Las manos que sujetan tienen dedos parcialmente ocultos por perro/agarre; no se certifican cinco dedos expuestos por mano. Sin dedos extra/fusiones discernibles. | Sin anomalía humana bloqueante encontrada. [Detalle nativo](auditoria-r1/consulta-original-manos-nativo.png). |

**Hallazgo histórico positivo, descarte v6:** `originales/imagen-2-v6.png`, 1672×941, contiene **tres zapatos**: izquierdo aproximadamente `(270,645)…(540,795)`, central extra `(630,650)…(850,800)` y delantero derecho `(820,600)…(1130,810)`. El zapato central tiene empeine, cordones y suela propios; no es sombra ni parte de la suela del derecho. [Recorte nativo v6](auditoria-r1/paseo-descarte-v6-pies-nativo.png). Es un **defecto P0 de anatomía si se intentara publicar ese descarte**, que debe seguir excluido; no un P0 de la selección v8. El contacto [v1–v8](auditoria-r1/paseo-v1-v8-contacto-anatomia.png) sirve solo para localizar versiones. No se identifica retrospectivamente qué archivo vio el usuario.

## Perra: cuatro extremidades e identidad

| Imagen | Recuento realmente visible y apoyos | Identidad y continuidad |
|---|---|---|
| Portada | **4 patas:** dos delanteras extendidas, con pies separados a derecha; posterior cercana plegada con pie a izquierda-centro; posterior lejana plegada con almohadillas visibles entre esta y el abdomen. Una cola continua desde grupa hasta borde izquierdo de cama. Sin quinto pie, extremidad flotante o unión imposible discernible. | Bodeguero tricolor de pelo corto, antifaz derecho negro aclarado, cejas/mejillas fuego apagado, manchas negras dorsales y de grupa, orejas plegadas, collar gris y chapa lisa. |
| Paseo | **4 patas separadas:** dos posteriores en zancada prudente, dos anteriores (una extendida adelante, otra casi vertical). Cada pie se sigue hasta una extremidad del tronco. Cola larga fina, sin duplicación. | Coincide con portada en tipo, patrón de cabeza, distribución general de manchas, orejas y proporciones; arnés adicional gris. No hay contradicción sexual visible en la selección. |
| Consulta | **4 patas:** dos anteriores verticales separadas y dos posteriores, una parcialmente ocluida por la cercana pero con pie propio; todas sobre la alfombrilla. Cola sale de grupa, sin miembro confundible con ella. | Conserva antifaz derecho, marcas fuego apagadas, patrón dorsal general, orejas, cola, collar y chapa. Luz fría aclara el blanco sin convertirla en otro perro. |

La imagen generada no permite certificar raza, sexo, edad cronológica exacta ni peso real; se evalúa la representación contra la ficha. No se encontró un cambio visible de identidad que obligue a sustituir paseo o consulta.

## Los cinco rasgos senior, vistos uno por uno

Se revisaron **en el original y WebP grandes y a 390 px reales**. «Sí» describe una señal visual, no una medición clínica. Los detalles de pelos y la profundidad exacta de la órbita no se pueden resolver individualmente a 390; se juzga el conjunto facial/corporal que permanece legible. No se aprobó por la palabra «senior» del nombre ni solo por el hocico blanco.

| Rasgo | Portada v9 → final | Paseo v8 → final | Consulta v1 → final |
|---|---|---|---|
| 1. Canas en hocico, cejas y párpados | **Sí**: gris moteado en hocico y contorno ocular; pelo claro entre negro y ceja fuego apagada. A 390 permanece la máscara aclarada y el contorno, sin poder contar pelos. | **Sí**: hocico gris, aclarado alrededor del ojo y ceja fuego desaturada. A 390 conserva la lectura de cara envejecida. | **Sí**: mismas zonas aclaradas; visibles en grande y conjunto gris alrededor de ojo/hocico a 390. |
| 2. Ojos algo hundidos y párpados caídos, sin velo | **Sí, leve**: ojo marrón bajo arco palpebral pesado, menor apertura y pliegue inferior; mirada serena. A 390 se mantiene el ojo pequeño bajo párpado, no una catarata. | **Sí, leve**: ojo pequeño/retraído bajo ceja y párpado superior bajo. En móvil es el rasgo más sutil, pero conserva esa forma y mirada, sin ojo desorbitado ni velo. | **Sí, leve**: ojo bajo arco superior, párpado inferior algo descendido, marrón limpio. Se mantiene la forma serena a 390. |
| 3. Lomo y menor masa muscular | **Sí**: lomo suavizado, grupa/muslo afinados, relieve discreto en cadera y hombro; no un cuerpo atlético. El encuadre autorizado permite ver el costado y muslo a 390. No hay hundimiento dorsal marcado. | **Sí**: dorso suavizado detrás de cruz, muslos y extremidades posteriores finos y cintura moderada. A 390 se conservan la silueta y reducción de cuartos traseros; el arnés oculta parte del hombro. | **Sí**: dorso suavizado, cadera marcada discretamente y muslos con masa reducida, sin emaciación. A 390 se ve mejor el perfil de grupa/patas que en la portada. |
| 4. Postura natural de mayor | **Sí**: tumbada con apoyos de codos, cabeza levantada de forma tranquila según autorización; sin salto ni pose atlética. Legible a 390. | **Sí**: zancada corta y tranquila, cabeza a altura/bajo cruz, orejas sin tensión y cola neutra; no tira. Legible a 390. | **Sí**: estación prudente, cuatro apoyos sobre mesa, cuello relajado hacia premio; no arqueo de dolor ni postura atlética. Legible a 390. |
| 5. Sin enfermedad inventada | **Sí**: boca cerrada; sin heridas, alopecia, ojos rojos, jadeo extremo ni aspecto de sufrimiento en grande/móvil. | **Sí**: sin lesiones ni cojera representada; no confundir la zancada estática con diagnóstico de marcha. | **Sí**: exploración preventiva con perra estable y sin lesión o dolor evidente; no se representa un diagnóstico confirmado. |

Evidencia propia a tamaño real: [portada final](auditoria-r1/portada-final-390.png) / [original](auditoria-r1/portada-original-390.png), [paseo final](auditoria-r1/paseo-final-390.png) / [original](auditoria-r1/paseo-original-390.png), [consulta final](auditoria-r1/consulta-final-390.png) / [original](auditoria-r1/consulta-original-390.png). Los recortes de tronco, documentados en README, permiten contrastar la masa y anatomía sin retoque.

## Acción, correa, escena y correspondencia editorial

- **Paseo:** perro en primer plano del lado de fachada, tutor detrás hacia calzada; ambos avanzan a derecha por orientación de tronco, caderas, pies y hocico. Hay **un solo cabo** desde el bucle en mano derecha; baja en curva holgada con punto bajo y vuelve a subir a una unión separada. De esa unión salen **dos ramales**, visibles a 390. En grande se ven **dos mosquetones distintos**: izquierdo hacia anilla dorsal del arnés; derecho hacia anilla del collar, separada del arnés. Chapa circular lisa cuelga del collar. No se confunden los ramales con tiras de arnés; no pasan entre patas. [Detalle nativo de topología](auditoria-r1/paseo-original-correa-nativo.png). No se puede medir una longitud real de 1,2 m desde una ilustración en perspectiva. Alt `:305` y pie `:307` del MDX corresponden a marcha conjunta y doble sujeción floja.
- **Portada:** persiana bajada, cama propia junto al mobiliario, agua, juguete relleno y mano cercana sin contacto. No se ven cables, velas ni ventana abierta; distancia de tres metros no medible. Orejas discretamente retraídas, mirada atenta y boca cerrada; no pánico representado. El refugio se entiende en móvil. La discrepancia real es la luz de P1-01; no se exige probar intermitencia temporal mediante una imagen fija.
- **Consulta:** mesa de acero con alfombrilla, cuatro apoyos estables, mano lumbar y apoyo abdominal respetuosos; tutora en pecho y premio frente al hocico. Los brazos parcialmente ocultos no generan miembros adicionales. Escala/perspectiva de mesa, cajones, báscula y ventana coherentes; no jeringas, sangre ni inmovilización forzada. Alt `:197` y pie `:199` corresponden a la exploración y al premio; el pie plantea revisar dolor, no afirma un diagnóstico por imagen.
- **Acabado de las tres:** pelo/tela/suelos con textura, iluminación distinta por escena, sin brillo plástico ni halo dominante; hora azul con farolas y Navidad en paseo, interior nocturno de saturación contenida en portada y consulta fría. Perspectiva doméstica y clínica plausibles; no se encontró texto, marca o logo legible, ni instrucciones de prompt pintadas. No se certifica cámara, focal, ISO o temperatura Kelvin real a partir de píxeles. La suavidad de fondo en calle no impide entender la acción.

## Lo que sí funciona

Conservar la continuidad del bodeguero y su representación senior, la postura de portada expresamente autorizada, las dos suelas correctamente conectadas del paseo v8, la J/U holgada con unión separada y los mosquetones identificables, y los cuatro apoyos de consulta. La corrección de la luz no justifica reemplazar por defecto paseo o consulta ni recuperar un descarte con tres zapatos.

Las capturas previas muestran las imágenes sin recortes anatómicos nuevos al pasar por móvil/escritorio y temas claro/oscuro. Las comprobaciones anteriores de carga, ausencia de scroll horizontal, CLS=0 y contraste mínimo 4,50/5,52 se conservan como **resultados del productor**, no como mediciones repetidas por este auditor ni como garantía en producción.

## Qué corregir, en orden — para otra sesión

1. **Portada:** conservar el prompt original y las autorizaciones de postura/encuadre. Corregir únicamente lo necesario para que la persiana cerrada proyecte **franjas horizontales finas rojas y amarillas distinguibles sobre una pared interior**, no solo en la persiana ni únicamente reflejadas en el suelo. Mantener anatomía, identidad, edad, refugio y mano sin contacto. Volver a abrir PNG/WebP/variante400 grandes y a 390; rechazar si el amarillo no se distingue en la pared o si aparece un defecto de anatomía al regenerar. No ocultar el fallo cambiando unilateralmente el alt; cualquier cambio del requisito debe decidirlo el propietario. Versionar y conservar v9 y todos los descartes.
2. **Integración:** en una sesión autorizada de diseño, reorganizar las dos tablas para que su estado inicial a 390 quede dentro del presupuesto aproximado de 900 px, conservando información clínica y cifras; verificar claro/oscuro a 390/1366 y no añadir scroll horizontal.
3. **Pie hero:** hacer que el pie editorial previsto tenga una vía de integración acordada; no modificar el layout global sin valorar su alcance. Verificar después que alt, pie e imagen coinciden.
4. Volver a auditar las versiones cambiadas como **R2 visual** con hashes nuevos. Mantener el descarte v6 excluido. No hace falta regenerar paseo v8 ni consulta v1 por la observación de «tres pies», porque no se confirmó en esas selecciones.

No se editaron imágenes públicas, originales, artículo, brief, entrega del productor o estilos; solo se añadieron este informe y evidencias de auditoría. Sin commit, PR, merge ni deploy. Los pendientes clínico-documentales del artículo quedan fuera de esta R1 visual y siguen abiertos donde correspondan.
