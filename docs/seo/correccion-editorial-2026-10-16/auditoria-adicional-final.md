# Cierre independiente del alcance adicional

Fecha:2026-10-16. **APTO editorial y de consistencia para los cambios acotados; validación funcional/publicación pendientes por separado.** No se modificó producto. Los artículos con auditorías R3 permanecen cerrados y no se reabrieron.

## Alcance y rondas

- Selector de movilidad y textos compartidos: R1 NO APTO por pautas/garantías/atribuciones sin respaldo y contradicción visible–JSON-LD; R2 corrección clínica satisfactoria, NO APTO por destino del índice eliminado; R3 comprobación focal satisfactoria del destino y fechas. Detalle en `auditoria-movilidad-catalogo-r1.md`, con snapshots R1/R2/final distintos. No se certifica de nuevo todo el diseño, calibración clínica, accesibilidad o métodos de la herramienta. Se aplicaron las skills de herramienta como referencia de evaluación, limitando la revisión al encargo editorial; sus exigencias de una auditoría integral no se presentan como ya cumplidas.
- Cuatro intents: R1 satisfactorio, títulos comparados con MDX actuales; no son seis. Se mantienen `articleHref`, rutas, exclusiones y grounding del diff. No se certifica recuperación del asistente en vivo.
- HomeCareStory: R1 satisfactorio, narrativa de experiencia real sin procedencia sustituida por orientación general; pie identifica ilustración y no expediente. Esto no declara inventada la observación original.
- HomeRecentPosts: R1 satisfactorio por inspección de su nuevo uso de `mobileImageFor`; no emite source móvil inexistente. Navegador final pendiente.
- Helper responsive y test ampliado: R2 técnico satisfactorio para llamadas actuales estáticas, como continuación de `auditoria-srcset-r1.md`. El estado R1 anterior sigue documentado y no se confunde con el helper final ampliado.
- Oracle/fixture editorial/ejemplo de respuesta: R1 satisfactorio por inspección y comprobación programática contra textos revisados; no se asume aprobación porque un comentario diga que fueron revisados.

## Comprobaciones propias

El test responsive ampliado se ejecutó con `node --import tsx --test tests/image-srcset.test.ts`: un aprobado, cero fallos, duración1115,07ms. Cubre las rutas anunciadas tanto por `buildSrcset` como por `mobileImageFor` para los hero de artículos existentes. No es una prueba de `naturalWidth`/`currentSrc` ni de todas las rutas de imágenes del sitio.

Se reprodujeron las seis entradas de movilidad: light/calm→LA, light/stressed→LB, moderate/calm→MA, moderate/stressed→MB, severe/calm→SA y severe/stressed→SB; alerta solo en severe. Las funciones desde `resultKey` hasta final coinciden con HEAD. Esto comprueba el comportamiento existente, no valida que cada resultado sea una indicación clínica.

Se comparó por programa el fixture nuevo con las seis descriptions, todos los why de productos, notices y fecha del módulo; el ejemploJSON coincide exactamente con la respuesta completa severe/stressed. Se verificaron los cuatro destinos de fragmento y las fechas UI/schema/módulo. Resultado propio guardado en `evidencias/auditor-movilidad-comprobacion-final.json`.

El diff de `f4a-tools.test.ts` preserva el oracle legado para niveles, manejo, claves, iconos, badges, títulos, nombres de productos y URLs. Las excepciones explícitas afectan mensajes why/description/notices y fecha, que fueron leídos y comparados por este auditor. El caso esperado de alerta se obtiene del ejemplo revisado. No se eliminan aserciones de clasificaciones o dominios ni se sustituye su esperado por el resultado actual de la implementación. El fixture editable es una expectativa editorial deliberada, no evidencia científica.

Las fuentes AAHA de dolor/entorno abiertas en este expediente respaldan el marco individual y no se presentan como validación clínica del selector. Se retiraron cifras de músculo, duración de arnés y atribuciones WSAVA sin documento. No quedan garantías de prevenir úlceras ni una indicación «exacta» en el alcance corregido. La nueva fecha refleja revisión material, sin cambiar la fecha de publicación.

## Hashes finales

Copias completas en `evidencias/auditor-adicional-final/`. El manifiesto identifica los13archivos revisados. Los21archivos editoriales anteriores se mantienen en su manifiesto separado.

|Archivo|SHA256|
|---|---|
|`src/lib/agent-tools/movilidad.ts`|`d64f07887640a882d17361b0238b9ab4ea1e09f6e95df81a3729332b7a67fc2f`|
|`src/pages/herramientas/selector-movilidad-perros-mayores.astro`|`e09f4c99489d1d617f3c7aa4d26577cf232c74b61ac09ceed46156023ae2044d`|
|`src/components/HomeCareStory.astro`|`9c8aa74f76178374dd0fb9ca016f5620ff0f1ccd5d30d36371e6ed25d085d88f`|
|`src/components/HomeRecentPosts.astro`|`6e9d74bac5454ae60457acd4d5faaf67efd661cdf6c8d2e99141d298d6bc2151`|
|`src/utils/image.ts`|`e8f1b688dfb04c5c3842d78b57b6f96ca9cd10b6cd6c9d21d2cf6f3aeb33fae4`|
|`tests/image-srcset.test.ts`|`2569bb3c11992f17ca9519ce127daedb5869af5b8477d76a4201eec2f5a4ba14`|
|`tests/agent-readiness/f4a-tools.test.ts`|`b5bba7fe6ed815ff9d6f2d925c9bdd54589261a82e0cf5a210750505492cbb97`|
|`tests/agent-readiness/fixtures/f4a/editorial-2026-10-16.json`|`2ff2b7fbb81d6052696fc98afa651052828d94f5d172b31c5839304d3497ea25`|
|`docs/agent-readiness/evidencia/f4a/contratos/ejemplo-movilidad-200.json`|`e4646dbe3d64bd0af682e0a54cc7850ef9296690cf06150b348860c92528c259`|
|`src/content/assistant/intents/comida-casera-perros-mayores.md`|`7b81dc66ff134b0433dfa81e9a0dc3a28e63bd5217cabb5e727ffb432a387c29`|
|`src/content/assistant/intents/como-dar-medicacion-perro.md`|`befd887ee8e99cdc811812d7dc45eb37adec0ca7fa85b9898c92792ff136b1f7`|
|`src/content/assistant/intents/mi-perro-viejo-defeca-mucho-poliquezia.md`|`017bb2c8fe8772a8702bf878317ed30544e561d570f1ffcadc86f8665e7161a5`|
|`src/content/assistant/intents/ulceras-presion-perros.md`|`25c4767c8d8c57b5f0cfd52cf0ed95e0f1bca7ea23f0ac13bf85a894d2679271`|

## Límites y condición de entrega

Ningún resultado de navegador, build final, pruebas automatizadas o impresión del corrector se atribuye aquí al auditor. Los resultados deben ligarse a estas versiones congeladas. No se declara publicado, desplegado o indexado nada. No se solicitó AdSense. La selección de dispositivos y la lógica existente no se convierten en validadas clínicamente por haber retirado garantías textuales.

Formato de copias: véase `formato-evidencia.md`; las extensiones de código llevan sufijo `.txt`, con bytes/hashes originales conservados y campo `snapshot_path` en manifiestos.
