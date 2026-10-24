# Artículo e imágenes para revisión en GitHub

Rama de entrega: `codex/articulo-golpe-calor-imagenes`. Trabajo solicitado por el propietario: redacción del artículo, tres imágenes, corrección de la portada y mejora de las instrucciones de futuros briefs e imágenes. No se fusiona con `main` ni se solicita un despliegue de producción.

## Qué revisar

- [Artículo final MDX](../../../src/content/blog/golpe-de-calor-perros-mayores.mdx).
- [Versión de lectura Markdown](articulo-lectura.md).
- [Portada corregida v2](../../../public/images/blog/golpe-de-calor-perros-mayores/podenco-senior-paseo-amanecer-v2.webp): cuidadora y perro avanzan juntos hacia la cámara.
- [Escena de enfriamiento](../../../public/images/blog/golpe-de-calor-perros-mayores/podenco-senior-enfriamiento-evaporativo-v1.webp).
- [Escena de casa fresca](../../../public/images/blog/golpe-de-calor-perros-mayores/podenco-senior-zona-fresca-casa-v1.webp).
- [Brief con la adenda visual](../../../briefings/briefing-golpe-de-calor-perros-mayores.md).
- [Criterio compartido para próximas imágenes](../../../.agents/skills/references/direccion-visual-editorial.md), enlazado desde AGENTS, las skills y la plantilla de futuros briefs.

## Evidencia y estado

El artículo, las imágenes optimizadas y sus variantes están preparados para integrar. Los originales, la portada v1 rechazada y las capturas anteriores se conservan como historial; el artículo referencia la portada v2.

- [Entrega y verificaciones editoriales](entrega-redaccion.md).
- [Corrección visual v2](correccion-visual-v2.md).
- [Resultado del navegador para la portada final](portada-v2-navegador.json).
- [Resultado del navegador para tablas, imágenes y FAQ](navegador-astro.json).
- [Compilación con portada v2](build-v2.log): correcta, incluida la proyección Markdown.
- [Comprobación Astro](astro-check.log): cero errores y cero advertencias.

Los informes de las entregas iniciales dicen «sin commit/push» porque registran el estado de esas comprobaciones, antes de la autorización posterior para subir esta rama. La entrega actual es para revisión en GitHub; no acredita publicación ni auditoría independiente del artículo.

`vista-previa.html` es una vista autónoma con imágenes incrustadas para descargar y abrir en un navegador. El diseño real se comprueba con `npm ci` y `npm run dev`; las capturas `astro-*` corresponden al sitio compilado. No ejecutar scripts de despliegue para revisar.
