# Entrega visual — procesionaria del pino y perros

Fecha: 2026-11-08. Alcance autorizado: ampliar el plan original a una imagen por H2 y una portada, con acabado documental y algunas infografías. La [adenda](ajuste-alcance.md) se escribió antes de la primera generación.

**Resultado:** siete recursos (cuatro escenas documentales y tres infografías), con variantes 1.200/800/400. Integrados en el artículo y en sus copias. Revisión visual independiente **APTO local en R2/3**; informes [R1](auditoria-visual-r1.md) y [R2](auditoria-visual-r2.md). Esto no equivale a aprobación visual del propietario.

**Texto cerrado:** base `6d8e476`, aceptada por el propietario en R4/5. Comparación literal de la prosa, encabezados, cuadros y FAQ tras excluir las nuevas figuras y sus pies: idéntica. El cuerpo conserva **5.960 palabras contractuales** sobre el DOM final. No se ha consumido una quinta auditoría de texto.

**Vista conjunta:** [galería](vista-previa.html) · [captura de la galería](vista-previa.jpg). La galería permite abrir cada recurso a mayor tamaño.

| Recurso | Ubicación | Archivo |
|---|---|---|
| portada | hero | `/images/blog/procesionaria-pino-perros/perro-aguas-senior-paseo-editorial-v2.webp` |
| observacion | Señales de contacto: cuándo salir hacia urgencias | `/images/blog/procesionaria-pino-perros/perro-aguas-senior-observacion-editorial-v2.webp` |
| prioridades | Qué hacer antes de llegar: apartarse, llamar y lavar solo si es seguro | `/images/blog/procesionaria-pino-perros/infografia-alejarse-llamar-acudir-v2.webp` |
| consulta | Qué información necesita el veterinario y cómo se valora el daño | `/images/blog/procesionaria-pino-perros/perro-aguas-senior-consulta-editorial-v2.webp` |
| descanso | Después del alta: qué registrar en un perro mayor | `/images/blog/procesionaria-pino-perros/perro-aguas-senior-descanso-editorial-v2.webp` |
| prevencion | Pasear en España: evitar el contacto sin depender de un mes fijo | `/images/blog/procesionaria-pino-perros/infografia-prevencion-ruta-alternativa-v2.webp` |
| cierre | Conclusión | `/images/blog/procesionaria-pino-perros/infografia-siguiente-paso-v3.webp` |

## Calidad y continuidad

Mismo perro de aguas español ilustrativo de 12 años en las cuatro escenas: rizo marrón corto, cara canosa, orejas caídas y pequeño blanco pectoral. Se revisaron los cinco rasgos senior y los apoyos, manos, correa y orientación, a tamaño grande y 400 px. La referencia se inspeccionó antes de derivar las otras escenas. Son ilustraciones, no pacientes ni resultados clínicos; la nota global del autor mantiene la declaración de IA.

Paleta y luz específicas: piedra y terracota con sombras azules en portada; terrazo y puerta petróleo en observación; luz fría y materiales mates en consulta; índigo, lino y reflejos moderadamente cálidos en descanso. Las infografías usan papel marfil y tipografía oscura de alto contraste.

Se corrigieron durante producción el margen de portada, una salida poco clara del pinar y un detalle de nido ambiguo. R1 pidió cambiar solo la viñeta derecha del cierre; v3 muestra una calle alternativa sin pinos. R2 comprobó esa sustitución, sus variantes y referencias, sin reabrir el resto.

No se añadieron tratamientos, dosis, fechas de avisos, síntomas o garantías. Ninguna infografía muestra lavado oral o retirada de nidos.

## Pruebas locales

- `npx astro build`: correcto, incluida proyección Markdown y generación de artefactos. Se repitió sobre el cierre v3; log en `verificacion/build-r2.log`.
- `npx astro check`: 0 errores, 0 warnings, 56 hints del proyecto; log en `verificacion/astro-check.log`. La corrección posterior cambió únicamente la ruta y la imagen del cierre.
- Navegador 390/1.366 px, claro/oscuro: siete imágenes decodificadas, sin desbordamiento ni errores JavaScript. En móvil se sirven variantes de 400 px a DPR1; las figuras de cuerpo usan srcset 400/800/1200 y la portada el srcset real del layout.
- Alturas móviles con pie: portada 259,38; observación 302,16; prioridades 334,55; consulta 334,55; descanso 372,12; prevención 334,55; cierre 334,55 px CSS. Todos por debajo de 900.
- Ampliación de infografías operativa mediante teclado. FAQ: siete elementos cerrados inicialmente. No se añadieron animaciones ni controles.
- Contraste mínimo de pies: 8,89:1 claro y 10,91:1 oscuro. El auditor muestreó los rótulos de las tres infografías: aproximadamente 10,6–11,2:1; lectura a 400 px y en capturas móviles.
- Evidencia actual: `verificacion-r2/navegador.json`, `contraste.json`, `metricas-dom.json` y capturas. Evidencia R1 conservada en `verificacion/`. Las solicitudes externas se bloquearon; estas comprobaciones usan fuentes de sistema y no certifican la tipografía pública definitiva.

Los originales están conservados en la sesión; [trazabilidad](originales/README.md). Los 21 WebP finales y las capturas seleccionadas forman parte de la entrega versionada.

## Estado

Rama de revisión/PR #160, sin fusionar ni desplegar. No se ha publicado ni confirmado una URL de producción. La revisión visual del propietario y la autorización de eventual publicación siguen pendientes; el campo `status: Publicado` no se utiliza como barrera de despliegue.
