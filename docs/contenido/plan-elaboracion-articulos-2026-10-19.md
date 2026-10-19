# Plan de elaboración de artículos — 2026-10-19

## Encargo y estado

Preparar artículos nuevos mientras se espera la respuesta de AdSense. Este archivo organiza el trabajo futuro: no es un briefing ni autoriza a iniciar artículos en la sesión que lo crea.

Primera sesión de desarrollo: completar el artículo de alimentación para perros mayores sin dientes, desde la investigación y brief hasta artículo, recursos visuales y validación final. El siguiente artículo será mal aliento. No desarrollar toda la cola a la vez.

La producción se hará en una rama de trabajo con PR revisable. No fusionar ni desplegar por este encargo. No marcar Publicado sin verificar producción. No prometer aceptación de AdSense.

## Datos de rendimiento

Los informes de Search Console se conservan fuera del repositorio. El propietario los adjuntará cuando solicite un nuevo análisis de rendimiento. No incorporar ZIP, CSV, consultas exportadas, métricas ni capturas de esos informes a Git o a un PR.

Este plan conserva únicamente las decisiones editoriales y el flujo de producción. Puede ejecutarse sin volver a adjuntar el informe. La cola es complementaria y no modifica silenciosamente las prioridades P1 de la serie España.

## Cola propuesta

### 1. Alimentación para perros mayores sin dientes — primer desarrollo

- Título de trabajo: **Cómo alimentar a un perro mayor sin dientes: texturas, opciones y señales de alarma**.
- Slug propuesto: `alimentar-perro-mayor-sin-dientes`; confirmar rutas y ausencia de colisiones antes de fijarlo.
- Pilar: Alimentación de Perros Senior; verificar el enum vigente del schema.
- Tema ya previsto en inventario: “Cómo alimentar a un perro senior sin dientes: recetas blandas y papillas caseras”.
- Pregunta: cómo ofrecer una alimentación adecuada y tolerable cuando faltan dientes, y cuándo la dificultad para comer necesita evaluación veterinaria.
- Aportación propia prevista: criterios claros para elegir textura y formato, comparación de opciones y registro sencillo de ingesta/tolerancia. Confirmar con fuentes qué aporta cada recurso.
- Diferenciación: guía específica de adaptación de textura y elección del alimento. No repetir la guía general de comida casera ni convertirla en otra colección de recetas.
- Revisar especialmente el artículo `src/content/blog/comida-casera-perros-mayores.mdx`, la página del pilar, briefs, ramas y PR en curso. Si hay solapamiento material sin diferenciación viable, documentar y consultar antes de duplicar.
- No prometer que una receta doméstica es completa sin formulación y respaldo aplicables; no inventar proporciones o suplementos. No recomendar alimentación forzada ni maniobras de deglución sin soporte.
- Modalidad narrativa predeterminada: guía sin caso. No inventar pacientes ni usar Luna/Dakota.
- Recursos candidatos: imágenes coherentes de un perro senior; infografía legible de opciones/texturas; secuencia didáctica de preparación o decisión solo si la evidencia y el concepto lo justifican. Definir cantidades y acciones concretas en el brief.

### 2. Mal aliento en perros viejos — siguiente sesión/artículo

- Título de trabajo: **Mal aliento en perros viejos: causas y cuándo consultar al veterinario**.
- Slug propuesto: `mal-aliento-perros-viejos`.
- Pilar: Salud de Perros Mayores.
- Diferenciar de `src/content/blog/salud-dental-perros-mayores.mdx`: evaluación del síntoma, señales acompañantes y decisiones, sin repetir la guía de higiene dental.
- No diagnosticar por el olor ni recomendar productos para ocultar una causa pendiente de evaluación.
- Repetir todo el flujo de investigación, auditorías y recursos; no reutilizar automáticamente fuentes o contrato del primer artículo.

### 3–5. Temas para sesiones posteriores

3. Decidir el momento de la eutanasia: intención clínica/emocional; diferenciar del tema de requisitos legales en España.
4. Cómo saber si tu perro siente dolor: criterios observacionales y consulta; revisar herramientas existentes para evitar duplicación.
5. Sedación terminal en perros: distinguir sedación, analgesia y eutanasia; no ofrecer protocolos farmacológicos domésticos.

No redactar estos temas durante el primer desarrollo.

## Lecturas obligatorias al iniciar

Leer la versión vigente en la rama/base real, incluidas instrucciones AGENTS aplicables a cada directorio:

1. `AGENTS.md`.
2. `.agents/skills/references/calidad-editorial-adsense.md`.
3. `.agents/skills/generar-briefing-contenido/SKILL.md`, su plantilla y referencias obligatorias.
4. `.agents/skills/auditar-briefing-contenido/SKILL.md`.
5. `.agents/skills/redactar-articulo-blog/SKILL.md`.
6. `.agents/skills/auditar-articulo-blog/SKILL.md`.
7. `.agents/skills/crear-animaciones-articulo-blog/SKILL.md`, incluida su referencia de implementación.
8. `INVENTARIO_CONTENIDO.md`, `src/pages/politica-editorial.astro`, schema y componentes vigentes.
9. Para planificar o modificar enlaces: skill `enlazado-interno-sitio` y recursos que ordena AGENTS.

Esta planificación aplica las guías de brief, calidad editorial y recursos visuales del repo; las fases de producción deben releer sus versiones vigentes.

## Flujo de la sesión de desarrollo

### A. Investigación y brief

- Revisar inventario, artículos, briefs y trabajo abierto. Confirmar la aportación y los límites frente a comida casera.
- Investigar primero; abrir fuentes y comprobar identidad, contenido y afirmaciones por separado. Registrar título, institución/autor, año, URL profunda/DOI/PMID comprobados, fecha, localización, afirmación, límites y H2 asignado.
- Generar el brief con la plantilla vigente: metadatos contados, estructura, fuentes por sección, enlaces reales, componentes y contrato de entrega. Extensión justificada por utilidad.
- Definir el plan visual y la ficha del sujeto ilustrativo, claramente distinto de un paciente real. Planificar los tres prompts editoriales exigidos por la skill y elegir infografías/animaciones por función, sin cuotas arbitrarias.
- Guardar `briefings/briefing-alimentar-perro-mayor-sin-dientes.md` si se confirma el slug. Actualizar el estado de inventario de forma veraz.

### B. Auditoría independiente del brief

- Asignar a otro agente/revisor con contexto de evaluación separado. El creador no audita; el auditor no corrige.
- El auditor debe leer el brief real y verificar fuentes y requisitos por sí mismo. Emitir informe con versión/hash, ronda, hallazgos y APTO/NO APTO.
- Si falla, el autor/corrector trabaja en una sesión o contexto separado del auditor siguiendo su informe; después vuelve a auditoría independiente.
- Máximo tres rondas por documento, sin reiniciar el contador. Si falla la tercera, detener ese documento y consultar con los motivos.
- Redactar únicamente desde el brief aprobado.

### C. Redacción y auditoría editorial

- Redactar el MDX con la skill y el contrato aprobados; conservar procedencia, citas junto a afirmaciones, límites clínicos y enlaces comprobados.
- Otro revisor audita el artículo. Registrar la versión y el estado de los recursos todavía por producir.
- Una revisión del texto con imágenes pendientes es provisional: no declarar el artículo final APTO si faltan recursos comprometidos.
- Evitar consumir rondas sobre un artículo deliberadamente incompleto: coordinar la auditoría editorial y su cierre sobre la versión integrada. No crear contadores separados para eludir el máximo de tres.
- Si aparece un fallo de origen en el brief, documentar el impacto y aplicar su flujo de revisión sin reiniciar rondas.

### D. Producción e integración de recursos

- Producir realmente las imágenes con la herramienta disponible: primera referencia inspeccionada y escenas derivadas del mismo perro, edad senior visible, anatomía y apoyos correctos. Declarar visiblemente el uso de IA donde corresponda.
- Crear infografías con texto legible y alternativas accesibles; tablas, checklist u otros apoyos cuando aporten una decisión o acción útil.
- Crear animaciones didácticas pertinentes al contenido, con secuencia comprensible. No confundir un recorte estático con vídeo ni simular movimiento corporal deformando el perro.
- Integrar componentes en las rutas reales del proyecto. Imágenes finales optimizadas en `public/images/blog/{{slug}}/`; componentes en `src/components/article/` cuando corresponda.
- Sin autoplay; controles de pausa, avance y repetición, teclado, foco visible, movimiento reducido y alternativa sin JavaScript. CSS acotado; evitar dependencias pesadas.
- Inventariar cada recurso con propósito, sección, ruta, estado y evidencia de comprobación. No entregar solo prompts en lugar de los archivos comprometidos.
- Si una capacidad no está disponible, registrar el bloqueo y conservar el plan; no afirmar generación o validación inexistentes.

### E. Cierre de auditoría y validación del conjunto

- Auditor independiente revisa la versión final de MDX + recursos y cierra la auditoría dentro del contador vigente. Una aprobación previa no cubre cambios posteriores no revisados.
- Comprobar escritorio y móvil de 375–390 px, modos claro/oscuro, contraste, imágenes decodificadas, legibilidad, controles y ausencia de desbordamiento.
- Verificar rutas, recursos, enlaces, alternativas accesibles y proyección Markdown.
- Ejecutar los checks vigentes apropiados; como referencia actual, `npx astro build` y `npx astro check`. Registrar resultados reales y distinguir errores preexistentes.
- Guardar informes, manifiesto de recursos y capturas en `docs/contenido/{{slug}}/`.
- Entregar PR con archivos, resumen de auditorías, pruebas, preview/capturas y pendientes. No fusionar ni desplegar. No marcar Publicado por haber guardado el MDX.

## Prompt para iniciar la primera sesión

> Trabaja en el repositorio Gunz-cop/CuidaTuPerroViejo. Lee y ejecuta el plan de `docs/contenido/plan-elaboracion-articulos-2026-10-19.md`, empezando únicamente por “Cómo alimentar a un perro mayor sin dientes”. Si el archivo solo está en una rama/PR, localízalo y usa esa versión antes de empezar.
>
> Lee AGENTS.md, las instrucciones de cada directorio y las skills editoriales y visuales indicadas en el plan. Revisa inventario, artículos, briefs y PR abiertos para evitar duplicaciones. No necesitas el informe de Search Console para elaborar este artículo. Si el propietario solicita un nuevo análisis de rendimiento, pídele el informe en esa sesión y mantenlo fuera del repositorio.
>
> Autorizo agentes o sesiones con roles separados para producción, corrección y auditoría independiente. Quien crea o corrige no audita su documento y el auditor no lo corrige. Coordina el trabajo y continúa entre fases sin pedir confirmaciones rutinarias.
>
> Investiga fuentes comprobables, crea y guarda el brief, haz que otro revisor lo audite y corrige los hallazgos en un contexto separado. Solo cuando el brief sea APTO, redacta el MDX y somételo a auditoría independiente. Después produce e integra las imágenes, infografías, animaciones y apoyos visuales pertinentes previstos en el contrato. Cierra la auditoría sobre el conjunto final; una revisión del texto antes de generar los recursos no basta como aprobación final.
>
> Respeta un máximo de tres rondas por documento; si falla la tercera, detente y explícame el bloqueo. No inventes fuentes, casos, experiencias propias ni credenciales. No utilices Luna/Dakota. No presentes prompts, placeholders ni imágenes estáticas como recursos terminados que no son.
>
> Valida móvil, escritorio, modo claro/oscuro, accesibilidad, recursos y build/check conforme al repo. Guarda los informes, capturas y manifiesto de recursos. Trabaja en una rama con PR revisable: no fusiones, no despliegues ni marques el artículo como publicado. Al finalizar, entrega enlaces al brief, auditorías, artículo, recursos y PR, con el resultado real de las pruebas y cualquier pendiente.

