# Corrección editorial y móvil del 20 de octubre de 2026

Entrega preparada para revisión del propietario; esta corrección no se ha fusionado ni desplegado. La PR #123 ya se fusionó en `main` antes de este encargo. Los cambios recibidos en la PR #124 se conservan y se integran en esta entrega sin cerrar ni modificar esa PR.

## Lectura

- [Artículo completo en PDF](revision/articulo-completo.pdf): 19 páginas, etiquetado y con marcadores; FAQ y alternativas de las secuencias desplegadas. Es una representación estática con maquetación de impresión.
- [Lectura interactiva autocontenida](revision/lectura-interactiva.html): incluye las cinco imágenes, estilos y código real de las dos secuencias y del registro. Descargar y abrir para interactuar. Omite navegación general, asistente y anuncios; utiliza fuentes locales. Los enlaces a otros artículos y fuentes requieren Internet. En el entorno de prueba se verificó por una ruta local interceptada: Chromium bloquea `file://` por política, por lo que no se afirma haber abierto directamente ese protocolo.
- [Captura móvil](revision/390-lectura.png), [escritorio](revision/1366-lectura.png), [secuencia de base](revision/390-animacion-base.png) y [secuencia de registro](revision/390-animacion-ingesta.png).

## Cambios

El bloque inicial «Qué puede comer» presenta las cuatro opciones con su condición. Se reescribió el AlertBox inicial, se retiraron salvedades repetidas, se explicaron la textura indicada y el plato llano/ancho/estable como facilidad doméstica y se condensó la conservación de preparaciones blandas y humedecidas. Se mantienen aspiración, urgencias, alimentación voluntaria, alta quirúrgica, individualización y guía sin caso.

Se conservan las cinco imágenes, dos secuencias y registro. Los cambios responsive recibidos apilan las tres tablas, acercan los controles al dibujo y pliegan las notas y los diez campos del registro en móvil. El autocontrol previo al auditor corrigió impresión del registro plegado, contraste de desplegables en oscuro, exceso de altura y adaptación al cambiar de ancho. [Informe técnico](informe-tecnico.md).

El recuento DOM es **5.288 palabras editoriales**, frente a 5.858: 570 menos. Incluye las tres tablas y las ocho FAQ una vez; excluye bibliografía, pies, controles y recursos. La reducción frente al contrato histórico se justificó antes de editar según el nuevo encargo de utilidad, sin añadir relleno ni fijar un mínimo sustitutivo. [Informe editorial con fuentes, tabla por H2 y desviaciones](../correccion-editorial-2026-10-20.md), [recuento reproducido](conteo-editorial-dom.json).

## Verificación

- Build completo con 33 proyecciones, Astro check con cero errores/cero avisos y 62 hints preexistentes, proyección reproducida y guarda semántica de los 33 documentos sin pérdidas. Logs en [verificacion](verificacion/).
- Autocontroles propios separados del dictamen independiente: móvil/escritorio, claro/oscuro, imágenes, teclado, objetivos táctiles, anclas, todos los pasos, ausencia de autoplay, movimiento reducido, alternativas sin JavaScript, impresión nativa y conservación de los diez valores máximos del registro.
- Alturas iniciales móviles a 390 px: base 836 px, ingesta 861 px, registro 638 px; tablas 602/688/825 px. [Resultados técnicos](verificacion-tecnica.json) y capturas aisladas en esta carpeta. Los overlays fijos se ocultan solo al capturar esos recursos; la prueba funcional conserva la página real.
- El primer intento del control de coordinación sin JavaScript a 375 px falló antes de esperar estabilidad de carga. No se reprodujo en las comprobaciones posteriores a `networkidle`; se añadió esa espera y la de fuentes al harness, conservando el [log inicial](verificacion/navegador-ejecucion-inicial.log). El control final pasa. No se atribuye el resultado transitorio a un fallo de producto no reproducido.
- Los logs se conservan con los mismos mensajes y cifras; solo se normalizaron espacios al final de línea y líneas vacías finales para la comprobación de formato Git.
- [Versiones congeladas](versiones-congeladas.json), [validación de lectura privada](revision/verificacion-lectura.json), [encargo y roles](encargo.md).

Las comprobaciones del navegador se ejecutaron con Chromium. No se probó Safari ni un iPhone físico; las dimensiones del iPhone son emuladas. No se promete una apariencia idéntica en el dispositivo real ni una certificación de accesibilidad por pasar axe.

## Auditoría independiente

**APTO en R3/3 con una observación P2**, sin P0/P1 pendientes. [Dictamen independiente](../reinicio-v2/auditoria-articulo-r3.md), SHA256 `fc41b8845873d57c4b13e75b9381774fba313800097cccfc2f10d97385b31d81`. No quedan rondas disponibles de esta serie.

El auditor reabrió las 14 fuentes, confirmó las 5.288 palabras y siete hashes congelados, y ejecutó 98 controles principales y 28 de lectura privada. Comprobó seis vistas 390/393/1366 px en claro/oscuro, todas las secuencias y la impresión, sin errores axe. Sus wrappers completos de tablas miden 666/752/889 px en móvil: incluyen 64 px de márgenes, por eso difieren de la medida de las tablas aisladas del autocontrol técnico. [Evidencia independiente](auditor/).

**Observación conservada:** al imprimir solo el registro, Chromium añade el rótulo automático «Details» en inglés. Es un detalle cosmético; los diez campos y valores máximos se mantienen completos en una A4. No se ha corregido el producto después de la auditoría ni se ha abierto una reevaluación oculta. El PDF de lectura completa es otro archivo.

El servidor Python de pruebas devuelve un listado al abrir el pilar por una colisión carpeta/archivo. El auditor comprobó el archivo compilado y la ruta Astro; no presentó ese HTTP200 como navegación válida ni atribuyó esa limitación local al sitio publicado.

La corrección permanece para revisión, sin fusionar ni desplegar; los resultados locales y la aprobación editorial no equivalen a autorización de publicación.
