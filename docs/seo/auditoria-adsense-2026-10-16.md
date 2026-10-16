# Evaluación previa a revisión de AdSense — Cuida a tu Perro Viejo

Fecha: 16 de octubre de 2026. Sitio público: https://cuidatuperroviejo.com/.

**Veredicto editorial: no solicitaría todavía la revisión.** Hay una base útil y suficiente para trabajar sobre ella, pero siguen publicados errores verificables de referencias y recursos prometidos que no se entregan. Corregirlos y homogeneizar la fiabilidad tiene prioridad sobre aumentar el número de artículos. Esta conclusión es una evaluación independiente; no identifica los motivos internos exactos del rechazo ni garantiza el resultado posterior. Adsterra queda fuera de la valoración por petición del propietario.

## Alcance y método

Se rastrearon las 35 páginas del sitemap público: portada, 18 artículos, seis pilares, un índice de herramientas, tres herramientas, un asistente y cinco páginas de información/contacto/políticas. Todas respondieron HTTP 200. Se extrajo el contenido de los 18 artículos y se examinaron su estructura, introducciones, recomendaciones, fuentes y ejemplos; se contrastaron referencias seleccionadas, sin realizar una certificación veterinaria exhaustiva de cada afirmación. Se comprobaron otras 101 URL internas enlazadas o de imágenes/archivos, con un único 404, documentado abajo.

Se revisaron en Chromium a 390 px de ancho la portada, el artículo dental, las tres herramientas y el asistente: sin desbordamiento horizontal en esas seis páginas. Se recorrieron las herramientas de calidad de vida y movilidad con entradas de prueba y se comprobó la actualización de edad. Se bloquearon peticiones de terceros para aislar la interfaz del sitio y excluir publicidad; esto no es una medición de rendimiento ni una prueba de consentimiento/publicidad. No se enviaron formularios, consultas al asistente ni mensajes externos. No se modificó el sitio.

El nuevo artículo de ojos y oídos no está publicado y no forma parte de este dictamen. Las páginas legales y el formulario no se califican como contenido de bajo valor por tener menos palabras. Los textos del sitemap son accesibles sin iniciar sesión; esto no acredita su indexación efectiva en Google.

## Criterios oficiales

- [Google AdSense: contenido y experiencia de usuario](https://support.google.com/adsense/answer/10015918?hl=es): contenido original y valioso, aportación sustancial, navegación funcional y entrega efectiva de lo anunciado. El documento menciona expresamente las descargas o contenidos reproducibles anunciados falsamente y los destinos inexistentes.
- [Políticas de spam para editores](https://support.google.com/publisherpolicies/answer/11035931?hl=es): no anunciar contenido o servicios que el sitio no ofrece; cumplir las políticas de spam de Búsqueda.
- [Informe de acciones manuales](https://support.google.com/webmasters/answer/9044175?hl=es#thin-content): explica supuestos de contenido sin valor añadido. El enlace facilitado y las capturas de AdSense no demuestran que este sitio tenga una acción manual en Search Console.

Estas páginas no establecen una cifra universal de artículos, palabras por artículo o visitas que garantice aceptación. Tampoco permiten deducir que un texto largo, una bibliografía extensa o una herramienta basten por sí solos para obtenerla. La autoría institucional y la ausencia de un veterinario firmante no son, por sí solas, infracciones automáticas.

## Hallazgos que resolvería antes de reenviar

### 1. Referencias científicas equivocadas en Cushing — prioridad alta

Página: https://cuidatuperroviejo.com/salud-perros-mayores/sindrome-cushing-perros-mayores

El artículo identifica el PMID 24118359 como el consenso de Behrend sobre hiperadrenocorticismo canino. [Ese PMID](https://pubmed.ncbi.nlm.nih.gov/24118359/) corresponde a *Inhibition of autophagy augments chemotherapy in human salivary adenoid cystic carcinoma*. También atribuye el PMID 16298516 a un trabajo de Sieber-Ruckstuhl sobre trilostano; [el destino real](https://pubmed.ncbi.nlm.nih.gov/16298516/) es *Characterization of latex particles for aqueous polymeric coating by electroacoustic method*.

Son dos errores confirmados, no una discrepancia de estilo. El lector no puede verificar las afirmaciones clínicas con esas referencias. Hay otras referencias pertinentes: el PMID 23701195 sí corresponde a seguimiento de trilostano. Debe verificarse título, autores, DOI/PMID y correspondencia entre la afirmación y el estudio en toda la biblioteca. Los destinos con comprobación antibot no se han considerado incorrectos solo por no poder leerlos.

### 2. Descarga anunciada inexistente — prioridad alta y relación directa con la guía de Google

En https://cuidatuperroviejo.com/cuidados-paliativos-perros/como-dar-medicacion-perro se anuncia una plantilla imprimible de medicación. El botón apunta a https://cuidatuperroviejo.com/descargas/calendario-medicacion-perros.pdf y devuelve **HTTP 404**. Publicar una plantilla útil y comprobar la descarga o retirar la promesa y el botón.

### 3. Vídeo anunciado sin reproductor ni vídeo — prioridad alta y relación directa con la guía de Google

En https://cuidatuperroviejo.com/salud-perros-mayores/salud-dental-perros-mayores el texto afirma haber preparado un vídeo práctico. El bloque solo muestra «ID de contenido: a206dd7bba7b714d». En el HTML público no hay vídeo ni iframe en el contenido; se confirmó en navegador. No se interpreta como intención de engañar, pero la experiencia incumple la promesa. Insertar el recurso real o sustituir la sección por instrucciones/ilustraciones que sí estén disponibles.

### 4. Casos clínicos cuya procedencia no se explica — prioridad alta editorial

Cushing relata la evolución de Bruno y la familia Herrera con datos de pruebas, dosis y controles. Disfunción cognitiva presenta a Duke incluso en un pie de imagen como paciente durante un episodio. Incontinencia urinaria relata a Toby y úlceras a Max como experiencias. En los textos examinados no se explica la procedencia verificable de esos casos ni se identifican claramente como ejemplos ilustrativos.

Esto **no prueba que sean inventados**. La corrección debe ajustarse a la realidad: atribuir el caso publicado con fuente; identificar una experiencia propia real, con límites y autoría; o declarar desde el comienzo que se trata de una viñeta compuesta/ilustrativa. Las imágenes ilustrativas no deben presentarse como fotografías clínicas de un paciente real.

Hay buenos modelos internos: ansiedad por separación declara expresamente su cuadro compuesto; baño distingue la serie publicada de las ilustraciones; callosidades atribuye su caso y explica sus límites. Aplicar ese estándar al archivo anterior.

### 5. Política editorial y contenido clínico incoherentes — prioridad alta editorial

https://cuidatuperroviejo.com/politica-editorial declara que no se prescriben fármacos ni dosis. Cushing incluye una dosis inicial genérica de trilostano de 1–2 mg/kg, además de ajustes específicos en su relato. Aunque advierte que no se cambie la medicación, conviene retirar la pauta utilizable para automedicación o reformular el contenido con revisión clínica y límites coherentes con la política.

Revisaría también las proporciones de la receta de comida casera, sus afirmaciones de absorción/prevención y las recomendaciones prescriptivas de úlceras. No se declara aquí que cada una sea falsa: necesitan un respaldo específico y una formulación individualizada, no solo una referencia general a WSAVA o un aviso final. En Cushing, las promesas de recuperación y supervivencia deben vincularse a evidencia y reflejar incertidumbre.

## Mejoras de confianza y experiencia

- **Responsabilidad editorial:** «equipo editorial» y una página de misión son un inicio. Identificar quién responde por el proyecto, qué experiencia real aporta y cómo se comprueban las fuentes ayudaría a evaluar afirmaciones médicas. No inventar credenciales ni sugerir revisión profesional que no exista.
- **Privacidad actualizada:** https://cuidatuperroviejo.com/politica-de-privacidad aún describe comentarios gestionados por Blogger, aunque el sitio actual no presenta ese sistema. Ajustar el documento al funcionamiento real y comprobar las promesas de gestión de cookies. Esto es mantenimiento documental; no es una auditoría jurídica ni un juicio sobre Adsterra.
- **Acceso rápido a respuestas:** algunos textos de movilidad y digestivo acumulan introducciones largas y reiteraciones. Recortar lo que no aporte observaciones, decisiones o límites. No aumentar palabras para cumplir una cifra editorial. La extensión no constituye una infracción por sí sola.
- **Valor propio:** preservar y reforzar registros, adaptaciones domésticas, comparativas transparentes y herramientas con métodos explicados. La síntesis de literatura puede aportar valor; una paráfrasis extensa sin utilidad adicional es más débil. No se ha completado una auditoría de plagio externa ni se afirma contenido copiado o abuso de contenido a escala.

## Qué ya favorece al sitio

Tema específico y coherente; seis áreas reconocibles; artículos con enlaces relacionados; herramientas reales; páginas de contacto, proyecto y políticas; contenido público servido en HTML; estructura de navegación utilizable; varios artículos recientes con buenas distinciones entre evidencia, ejemplo e ilustración. El diseño móvil muestreado es legible y no mostró desbordamientos horizontales. El problema observado no justifica desechar el sitio ni producir una cantidad arbitraria de artículos adicionales.

## Condiciones para recomendar el reenvío

1. Corregir el PDF roto y el vídeo ausente y volver a probar ambos desde la web pública.
2. Auditar las referencias de los 18 artículos y corregir las afirmaciones que no sostienen sus fuentes; prioridad inmediata a Cushing.
3. Aclarar la procedencia de casos e imágenes clínicas y resolver la incoherencia entre política editorial y pautas de dosis.
4. Revisar alimentación y úlceras, actualizar la información institucional/legal y recortar repeticiones relevantes.
5. Comprobar los cambios publicados, repetir enlaces y recorridos principales y revisar Search Console para conocer indexación y posibles acciones manuales.

Después de esa pasada, consideraría razonable solicitar la revisión sin esperar a una cifra inventada de artículos. El interés real de los usuarios, tráfico, retención, historial e indexación no se pueden acreditar con este rastreo público: no tuve acceso a Analytics, Search Console ni a los detalles internos de AdSense. Tampoco se ha certificado el asistente de extremo a extremo ni el envío del formulario de contacto.

