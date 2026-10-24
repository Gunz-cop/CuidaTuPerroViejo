# Imágenes solicitadas en la revisión de fondo

Entrega del 24 de octubre de 2026. Rama `codex/golpe-calor-imagenes-revision`, basada en `00d6050` de `claude/golpe-calor-revision`. Se conservan las correcciones clínicas, de enlaces y de redacción y los dos recursos interactivos de esa rama.

## Recursos entregados

| Recurso | Archivo y vista | Corrección / uso |
|---|---|---|
| Enfriamiento v2 | [WebP 1200 px](../../../public/images/blog/golpe-de-calor-perros-mayores/podenco-senior-enfriamiento-evaporativo-v2.webp) | Ventilador sobre banco seco, lejos de la zona mojada; cable hacia enchufe alto, sin tocar el suelo. Integrado en «Mójalo y dale aire». |
| Casa fresca v2 | [WebP 1200 px](../../../public/images/blog/golpe-de-calor-perros-mayores/podenco-senior-zona-fresca-casa-v2.webp) | Persiana medio bajada y visillo que difumina la luz; suelo y perro en sombra, sin rectángulos de sol. Integrado en «Paseos y casa». |
| Recorte de perfil | [PNG transparente](../../../public/images/blog/golpe-de-calor-perros-mayores/podenco-senior-perfil-transparente-v1.png) · [WebP con alfa](../../../public/images/blog/golpe-de-calor-perros-mayores/podenco-senior-perfil-transparente-v1.webp) | Mismo podenco de pie mirando a la derecha, cuatro patas visibles, sin collar ni correa. Preparado para la integración opcional en la animación descrita por la revisión. |

Las dos escenas usan la versión anterior correspondiente como referencia; mantienen la identidad del podenco y la ambientación, con edad visible de forma natural. El recorte se deriva de la escena de casa. La portada v2 se conserva: la revisión la valoraba como coherente y su ajuste de edad era opcional.

## Detalle de los archivos

- Escenas: 1200 × 800 WebP, con variantes de 800 y 400 píxeles. Enfriamiento: 212.400 bytes; casa: 123.774 bytes en los archivos base. El artículo mantiene el patrón Markdown del sitio, por lo que el navegador selecciona los archivos base de 1200 px para el cuerpo; la existencia de las variantes no implica que el sitio las anuncie.
- Recorte: PNG RGBA de **1586 × 992**, 1.062.926 bytes; dimensiones reales producidas por la herramienta, próximas a las 1600 × 1000 propuestas. Se conserva sin deformar. WebP con transparencia de 1200 × 751 y variantes de 800 y 400 px.
- PNG y WebP del recorte tienen canal alfa real con rango 0–255. Se comprobaron sobre fondo claro y verde oscuro: [captura](imagenes-revision/recorte-claro-oscuro.png). El recorte no contiene un fondo blanco ni un damero impreso.
- Originales aceptados conservados en `originales/`. Las escenas v1 siguen como historial; el artículo referencia las v2.
- Inventario de dimensiones, bytes y alfa: [imagenes-revision-archivos.json](imagenes-revision-archivos.json). Huellas: [sha256.json](sha256.json).

## Integración y alcance

Actualizados el artículo final, su copia de entrega, la vista de lectura, las referencias de imágenes del brief, sus prompts vigentes, alt y pies, y los enlaces de la dirección visual compartida. El alt de enfriamiento describe el vertido sobre lomo y pecho y la posición elevada del ventilador; el de casa incluye persiana y visillo.

Se incluye el recorte opcional como archivo preparado para el autor de la secuencia. No se ha modificado `GolpeCalorRecursos.astro` ni se afirma que el perro ya aparezca en su animación. Se mantiene la secuencia revisada y su lógica, sin deformar una imagen estática para fingir movimiento corporal.

La vista autónoma `vista-previa.html` presenta texto e imágenes. Los componentes interactivos se comprueban en el sitio compilado; la vista de lectura los omite para evitar etiquetas Astro inertes. El informe `revision-fondo-articulo.md` se conserva intacto como procedencia de la petición; este documento registra la entrega posterior, no una nueva auditoría independiente.

## Comprobaciones propias

- `npx astro build` correcto, incluida proyección Markdown: [log](imagenes-revision-build.log).
- `npx astro check`: 0 errores, 0 advertencias, 64 hints del proyecto: [log](imagenes-revision-check.log).
- Chromium sobre el HTML real compilado: carga y decodificación de las tres imágenes del artículo, referencias a v2 para las dos escenas, sin desbordamiento horizontal a 375/390/1366 px en claro y oscuro. [Resultados](imagenes-revision-navegador.json) y [script reproducible](comprobar_imagenes_revision.py).
- Capturas de las dos escenas en [imagenes-revision/](imagenes-revision/); el PNG opcional se comprueba por separado, ya que no está insertado en el artículo.
- Revisión visual propia de anatomía, identidad, gesto del agua, separación de electricidad, sombras y correspondencia imagen/alt/pie. No se declara aprobación visual del propietario para estas versiones finales.

Entrega en rama de revisión. Sin cambios en `main` ni despliegue de producción.
