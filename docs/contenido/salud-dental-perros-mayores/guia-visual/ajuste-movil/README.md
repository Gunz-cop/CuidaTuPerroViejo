# Ajuste de altura móvil

El usuario aprobó el acabado de las imágenes, pero señaló que el apoyo visual era demasiado alto para consultar imagen, pasos y reproducción sin desplazarse repetidamente. Esta revisión mantiene las imágenes y su procedencia, y corrige la organización. No autoriza main.

## Cambios

- Controles antes de la imagen; no es necesario llegar al final para reproducir o pausar.
- Altura de imagen adaptada a la pantalla, sin deformación; ampliación conservada. En teléfonos muy cortos el encuadre recorta contexto del perro, manteniendo el contacto dental. El auditor registra el límite de superposición del botón de zoom en 320 px sin ocultar labio/dientes.
- Encabezado, espaciados y metadatos compactos en móvil. En la versión mejorada no se repite el número/título del paso debajo: están en los controles. Sin JS e impresión conservan títulos y numeración.
- Consejos y fuente desplegables, fuera del reproductor. Las instrucciones y los avisos de parar siguen visibles.
- Corrección de integración: PostReader insertaba el banner intermedio dentro del primer paso al contar todos sus párrafos. El marcador data-reader-atomic y un helper con parse5 excluyen esos bloques del cálculo, sin reescribir HTML, claves, número ni configuración de anuncios. Los dos slots editoriales quedan fuera. Tres pruebas de regresión cubren anidación, offsets exactos y marcadores literales.

## Altura útil comprobada

Medición del reproductor completo (pestañas, controles, imagen e instrucción), no solo ausencia de overflow horizontal. Se sitúa a 76 px de la parte superior y deja 54 px al pie para la navegación fija y la franja inferior. Las notas opcionales pueden ampliar la página al abrirlas.

|Viewport|Movimiento reducido|Máximo del reproductor|Altura disponible|
|---|---|---|---|
|320×568|No|374.95px|438px|
|375×667|No|359.00px|537px|
|390×844|No|394.41px|714px|
|412×915|No|408.61px|785px|
|320×568|Sí|417.19px|438px|

Diez escenarios propios y cuarenta pasos aprobados, claros/oscuros y movimiento reducido. Capturas de teléfono mantienen cabecera, asistente y franja publicitaria. propuesta-movil-v2.png oculta las superposiciones externas solo para aislar el diseño de la guía.

## Verificación y límites

- Build correcto; tipos: 0 errores, 0 advertencias y 59 hints;107 pruebas de código aprobadas.
- Proyección reproducida y guardia semántica de 32 documentos aprobadas.
- Seis escenarios de regresión de navegador aprobados: selección de pasos, zoom, reproducción/pausa/repetición finita, visibilidad, teclado, 44 px, impresión y sin JS.
- HTML autónomo regenerado del mismo componente y comprobado sin HTTP en 320×568, 390×844 y 1440×1000. Método en offline-pruebas.json; file:// sigue bloqueado por este Chromium administrado y no se presenta como probado.
- CI y Workers Builds de dd0d1a5 aprobados, recibo ci-producto.json. Cloudflare genera nueva URL de rama; el GET de este entorno sigue con 403, no se declara comprobación remota satisfactoria.
- Revisión independiente R3 final en ../auditoria-r3.md. No se abrieron rondas clínicas de artículos previos ni se reiniciaron R1/R2.

Estos resultados corresponden al navegador y tamaños simulados documentados. Falta que el usuario vea esta versión en su teléfono y apruebe su integración. No se fusionó main.
