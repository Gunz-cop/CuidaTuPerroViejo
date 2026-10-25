# Dirección visual de las imágenes editoriales

Preferencia expresa del propietario, 24 de octubre de 2026. Se aplica a los próximos briefs y a la producción de imágenes de todos los artículos, además de las reglas de seguridad y continuidad del sujeto.

## Referencia y alcance

El propietario destacó la belleza, el detalle y la ambientación de las escenas de casa y enfriamiento del artículo de [golpe de calor](../../../docs/contenido/golpe-de-calor-perros-mayores/entrega-redaccion.md). Esa calidad debe trasladarse a los demás temas. No equivale a aprobar todo el artículo o todas sus imágenes: **rechazó la portada v1 porque perro y cuidadora parecían caminar en sentidos opuestos**.

Referencias visuales concretas:

- [Casa fresca](../../../public/images/blog/golpe-de-calor-perros-mayores/podenco-senior-zona-fresca-casa-v2.webp): baldosa, persiana, cuenco cerámico, mobiliario y luz que construyen una vivienda reconocible; el perro sigue siendo protagonista.
- [Enfriamiento](../../../public/images/blog/golpe-de-calor-perros-mayores/podenco-senior-enfriamiento-evaporativo-v2.webp): gesto comprensible, pelaje mojado, agua visible, patio con materiales concretos y objetos que explican la preparación del traslado. Contraejemplo en un detalle: el ventilador enchufado sobre el suelo mojado; no copiarlo (pendiente de sustituir por v2).
- [Portada v1 rechazada](../../../docs/contenido/golpe-de-calor-perros-mayores/originales/podenco-senior-paseo-amanecer-v1.png): conservar como contraejemplo de dirección de marcha incoherente; no usarla como referencia compositiva aprobada.

Se adopta el cuidado de la escena, no el podenco, la vivienda española ni el color cálido como valores universales. En la serie España, ambientar para ese público; en otros artículos, seguir la audiencia y el contexto documentados. Evitar casas suburbanas estadounidenses por defecto. Si la ubicación no está definida, elegir un entorno doméstico plausible y describirlo, sin atribuirle un país o una ciudad reales.

## Ficha obligatoria antes del prompt

Para cada imagen, completar estas decisiones con contenido propio de la escena:

1. **Función editorial:** qué acción, preparación o decisión del artículo debe entenderse al verla y en qué sección se inserta.
2. **Sujeto:** identidad, los cinco rasgos del requisito senior verificable, proporciones, postura y apoyos. Referencia inspeccionada para conservar el mismo perro dentro del artículo.
3. **Escenario y contexto:** vivienda, calle o consulta concretas; arquitectura y uso del espacio compatibles con el público. Seleccionar de tres a cinco detalles visibles pertinentes, por ejemplo suelo, persiana, mobiliario, recipiente o vegetación. No amontonar adornos ni copiar esos objetos en todos los artículos.
4. **Acción y geometría:** dónde están perro y persona, hacia dónde miran y se mueven, qué hace cada mano, cómo toca una herramienta y cómo se conecta una correa. Si pasean juntos, cuerpos, caderas y pasos avanzan en la misma dirección; una cabeza girada no debe producir la impresión de que el cuerpo marcha al revés.
5. **Encuadre:** altura de cámara, plano, posiciones y márgenes; anatomía y gesto completos. Mantener visibles los elementos que enseñan el cuidado; el fondo nunca compite con ellos.
6. **Luz y materialidad:** origen y dirección de la luz, hora o iluminación interior, sombras coherentes, texturas del pelaje y de los materiales. Elegir profundidad de campo que permita leer la acción; evitar desenfocar lo que hay que comprender. No imponer atardecer ni luz cálida a todas las escenas.
7. **Acabado y exclusiones específicas:** fotografía editorial documental con composición cuidada y natural, sin pose publicitaria, marcas, lujo de catálogo ni enfermedad inventada. Enumerar los errores probables de esa escena, además de los límites clínicos del brief.
8. **Aceptación visual:** describir qué se comprobará en la imagen real a tamaño grande y móvil. Un prompt completo no acredita una imagen correcta.

## Esqueleto de prompt

```text
Imagen editorial para [tema y sección]; debe permitir entender [acción/decisión].
Mismo perro de la referencia inspeccionada: [ficha completa]. Edad visible: [canas en hocico, cejas y párpados; ojos algo hundidos; lomo y musculatura de perro mayor; postura natural; sin enfermedad].
Entorno [contexto compatible con el público]: [materiales, distribución y 3–5 detalles pertinentes].
Acción [gesto preciso]. Perro en [posición, orientación y apoyos]; cuidador en
[posición y dirección], manos [acción], herramienta/correa [contacto y recorrido].
Cámara [altura, plano, encuadre y margen]; luz [fuente y dirección], sombras
coherentes, texturas [concretas], profundidad de campo [justificada por la acción].
Acabado documental natural, composición cuidada, sin estética de foto de catálogo.
Evitar [fallos específicos de anatomía, movimiento, seguridad y ambientación].
Ilustración generada; no representa un paciente ni acredita un resultado clínico.
Rechazar si a tamaño móvil parece un adulto joven.
```

«Hermosa», «cinematográfica», «alta calidad», «hogar acogedor» y «no genérica» solos no resuelven la dirección visual. Sustituirlos por decisiones observables antes de generar.

## Requisito senior verificable (obligatorio en todo prompt)

**Excepción limitada a leishmaniosis — decisión del propietario, 2026-10-25.**

En `leishmaniosis-perros-mayores`, la portada y la escena de casa representan a la misma perra sana y mayor; se conservan sin cambios. Solo la consulta y el recorte de la animación representan una ilustración de señales clínicas moderadas: aro periocular de pelo ralo, descamación seca del borde de la oreja y una pequeña costra, trufa seca con parches claros, caspa fina y uñas largas curvadas. Para esas dos imágenes, «sin enfermedad inventada» se sustituye por «con las señales descritas, secas, superficiales y dignas». Se conserva la delgadez de v3 (lomo hundido, musculatura reducida, costillas visibles y cabeza baja), aceptada por el propietario como referencia corporal.

Esta excepción no se aplica a otros artículos ni modifica el resto del requisito senior. No se representa un paciente real ni se diagnostica por aspecto: alts, pies y animación deben decir que son señales posibles, que muchos perros infectados se ven normales y que la ausencia de lesiones no descarta infección. Encargo y prompts: [prompt-correccion-visual-v4.md](../../../docs/contenido/leishmaniosis-perros-mayores/prompt-correccion-visual-v4.md).

Origen: en golpe de calor hubo que regenerar imágenes y el recorte transparente del podenco salió con aspecto de adulto joven, porque los prompts no exigían la edad de forma explícita y comprobable. «Senior», «mayor» o «anciano» como palabra suelta **no cuenta**, y el hocico canoso tampoco basta.

**Aplica a todo prompt de imagen, de recorte transparente y de fotograma o animación que muestre al perro.** Cada prompt incluye, con palabras propias del sujeto, estos rasgos de edad a la vez:

1. **Canas en hocico, cejas y párpados** (adaptadas al color del pelaje: en un perro blanco, aclarado y apagado del pelo, no solo «canas»).
2. **Ojos algo hundidos**, con mirada serena y párpados algo caídos, sin velo ni catarata salvo que sea rasgo del sujeto de referencia.
3. **Lomo y musculatura de perro mayor:** línea dorsal algo hundida o suavizada, menos masa en cuartos traseros y hombros, costillas y relieve óseo discretos; nunca un cuerpo de exposición o de adulto joven.
4. **Postura natural de perro mayor:** apoyos prudentes, cabeza a la altura del lomo o algo baja, sin saltos ni poses atléticas.
5. **Sin enfermedad inventada:** nada de cojera, heridas, ceguera, emaciación ni sufrimiento para «parecer viejo». Edad, no patología.

Cada prompt cierra con una línea de aceptación: «Rechazar si a tamaño móvil parece un adulto joven».

**Recortes transparentes y animaciones.** Es donde más fácil se escapa un perro joven, porque se pide «cuerpo completo, fondo transparente» y se pierde la descripción de edad. El prompt del recorte repite íntegros los cinco rasgos y la ficha del sujeto, y se inspecciona sobre fondo claro y oscuro **a 390 px de ancho** antes de integrarlo. Una animación que reutiliza el recorte hereda su edad: si el recorte no supera la comprobación, no se anima.

**Qué se comprueba en la imagen real (imagen por imagen, también el hero):** se abre el archivo, se reduce a tamaño móvil y se confirma cada rasgo con una nota («cejas canosas: sí; ojos hundidos: sí; lomo: sí…»). Si algún rasgo falta o parece adulto joven, es un defecto que **obliga a regenerar**, no a retocar el pie o el alt.

## Raza: no repetirla sin motivo entre artículos seguidos

El brief declara en su Sección 8 **qué razas o mestizos se usaron en los artículos publicados o en brief más recientes** (mínimo los tres últimos con imágenes de perro, comprobando `public/images/blog/`, los alt y los briefs) y elige una distinta. Solo se repite raza por motivo documentado: el caso publicado la identifica, la raza forma parte del contenido clínico o el propietario lo pide. En ese caso se escribe el motivo. Elegir además una raza o mestizo creíble para el público del artículo (en la serie España, tipos habituales allí) y justificarlo en una línea.

Registro de razas usadas (actualizar al cerrar cada brief):

| Artículo (estado) | Sujeto visual |
|---|---|
| Golpe de calor (publicado) | Podenco |
| Mal aliento (publicado) | Labrador chocolate |
| Úlceras por presión (publicado) | Golden retriever |
| Cushing, limpieza de ojos y oídos, ansiedad por separación, incontinencia fecal | Cocker spaniel |
| Alimentación sin dientes, poliquezia, juegos de olfato, corte de uñas | Beagle |
| Callosidades y codos | San Bernardo |
| Baño senior (ejemplo aprobado) | Dogo argentino |
| Dermatitis por humedad, ceguera y sordera (briefs) | Pastor alemán |
| Letargo (brief) | Bóxer |
| Rutina cognitiva y ocaso (briefs) | Caniche miniatura |
| Olor a orina (brief) | Schnauzer |
| Feromonas (brief) | Teckel |
| Depresión (brief) | Galgo español |
| IPE (brief) | Setter gordon |
| Leishmaniosis (brief, 2026-10-24) | Mestizo de tipo pastor-mastín, atigrado oscuro |

## Revisión de la imagen generada

- Explica la acción del artículo sin tener que justificar después una postura extraña.
- El perro parece senior y conserva identidad, anatomía y apoyos creíbles.
- Persona y animal tienen orientación, mirada y movimiento compatibles; manos, objetos, agua y correa se relacionan físicamente con sentido.
- El entorno tiene detalles específicos y materiales creíbles, compatibles con el público y la escena, sin convertirse en una escenografía turística o de catálogo.
- Luz, sombras, perspectiva y escala concuerdan; el gesto se lee también en móvil.
- La imagen respeta los límites de seguridad y no escenifica una recuperación o un paciente inventados.
Las tres comprobaciones siguientes se añadieron en la revisión de golpe de calor del 2026-10-24 (no son una preferencia expresa del propietario):

- **La escena es físicamente segura:** nada eléctrico enchufado sobre suelo mojado o junto a agua derramada, ningún objeto que el artículo desaconseja (hielo, toallas envolventes, correa tensa). Una escena bonita que enseña un riesgo contradice el texto.
- **Imagen, pie y alt dicen lo mismo:** si el pie habla de persianas bajadas, la persiana está bajada; si el alt dice «moja el pecho», el agua cae en el pecho. Corregir la imagen o, si la diferencia no importa para el mensaje, el pie y el alt.
- **La edad se ve sin buscarla:** cumple el [requisito senior verificable](#requisito-senior-verificable-obligatorio-en-todo-prompt) rasgo por rasgo, a tamaño móvil. Si parece un adulto joven, regenerar.

Corregir cualquier incoherencia antes de entregar, aunque la imagen resulte visualmente atractiva. Registrar qué referencia se usó y qué se corrigió. Mantener originales y versionar las sustituciones; actualizar artículo, brief, variantes y vista previa. Diferenciar preferencia expresada por el propietario, revisión propia y aprobación de cada imagen final.
