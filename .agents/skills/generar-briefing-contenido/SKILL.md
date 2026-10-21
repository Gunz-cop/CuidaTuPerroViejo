---
name: Generar Briefing de Contenido - Cuida Tu Perro Viejo
description: Diseña un briefing técnico estructurado para artículos de blog MDX en el stack de Astro, adaptado a la audiencia y directrices de cuidatuperroviejo.com.
---

# Habilidad: Generador de Briefings de Contenido Técnico (Astro/MDX)

Esta habilidad automatiza y estandariza la creación de briefings de contenido altamente técnicos para el sitio [cuidatuperroviejo.com](https://www.cuidatuperroviejo.com). Sigue una estrategia **Source-First** (Basada en Fuentes), donde el esqueleto y desarrollo científico del artículo se estructuran en función de la investigación médica y veterinaria previa, y no al revés.

> [!IMPORTANT]
> **Principio de no-omisión (para cualquier agente que ejecute esta skill, sea cual sea el modelo):** Ningún paso marcado como obligatorio en este documento es opcional a criterio del agente, sin importar que en el razonamiento interno parezca "poco relevante para este caso concreto" o que omitirlo permita entregar el brief más rápido. Si un paso genuinamente no aplica (ej. el usuario no tiene historia real o la literatura es limitada), la skill ya define explícitamente qué hacer en esa excepción (ver Fase 1.2 y Fase 2.5) — la salida correcta siempre es seguir la excepción documentada o preguntar al usuario, nunca decidir en silencio que el paso "no aplica" y seguir de largo. Ante la duda entre "cumplir la letra de la regla" y "usar criterio propio para ir más rápido", cumple la letra de la regla.

---

## Control obligatorio de calidad editorial (2026-10-16)

Lee y aplica [calidad-editorial-adsense.md](../references/calidad-editorial-adsense.md) antes de ejecutar esta skill. Verifica utilidad propia, correspondencia fuente→afirmación, procedencia narrativa, coherencia con la política editorial y entrega real de cada recurso anunciado. Ni el conteo de palabras ni un APTO mecánico sustituyen esos controles. Máximo tres rondas por documento; al fallar la tercera, detenerse y presentar el bloqueo al usuario.


## 📂 Recursos de la Habilidad

Esta habilidad sigue la estructura avanzada de división de responsabilidades:
*   [SKILL.md](./SKILL.md): Directrices de flujo de trabajo y reglas de ejecución (este archivo).
*   [template_briefing.md](./resources/template_briefing.md): Plantilla estructural en Markdown limpia con las fuentes al inicio.
*   [ejemplo_briefing_cushing.md](./examples/ejemplo_briefing_cushing.md): Ejemplo histórico no validado, conservado solo como advertencia; no copiar casos ni citas.
*   [astro_components.md](./references/astro_components.md): Guía de referencia técnica sobre componentes interactivos MDX autorizados.
*   `/briefings/`: Carpeta versionada en Git donde se guardan los briefings finales generados, uno por artículo, con el nombre `briefing-{{slug}}.md`.

---

## 🧭 Flujo de Ejecución (5 Fases)

### Fase 1: Recepción de Datos y Control de E-E-A-T (Gatillo)
1.  **Entrada:** El usuario proporciona el **Título del post**, **Keyword principal** y el **Slug propuesto**.
2.  **Procedencia narrativa:** Usa una experiencia real ya aportada, un caso/cohorte publicados atribuidos, una viñeta compuesta declarada o una guía sin caso. Documenta cuál y por qué. Si el usuario no dio historia, investiga sin inventar una; solo pregunta si un dato personal es indispensable. No exigir un paciente ni un desenlace para cumplir E-E-A-T.
3.  **Chequeo de Canibalización SEO:** Antes de investigar, busca en [INVENTARIO_CONTENIDO.md](../../../INVENTARIO_CONTENIDO.md) si la keyword principal o un slug muy similar ya está cubierto por un artículo existente (publicado o en curso).
    > [!WARNING]
    > Si detectas solapamiento claro, no generes el briefing todavía: avisa al usuario del artículo existente y pregunta si quiere diferenciar el ángulo, fusionar el contenido o continuar de todas formas.
4.  **Limpieza de la Transcripción Real (Control de Calidad E-E-A-T):** Antes de copiar la historia real a la Sección 2 del briefing, revísala por errores propios de dictado/transcripción por voz: nombres propios intercambiados o repetidos (ej. "Luna entra en el plato de Luna" cuando el sujeto correcto es otro perro), frases truncadas o sin sentido, y muletillas excesivas ("eh", "pues", "este"). Corrige estos errores manteniendo el sentido y los hechos originales intactos — **nunca inventes ni añadas datos que el usuario no dio**, solo depura la forma. Si una frase es ambigua y no puedes inferir con seguridad qué quiso decir el usuario, pregúntale antes de asumir.

### Fase 2: Investigación Científica (Source-First) — cobertura suficiente
1.  **Búsqueda y Selección:** Busca y verifica **fuentes suficientes, fuertes y pertinentes para cubrir las afirmaciones** (estudios indexados en PubMed, guías clínicas de la WSAVA, comunicados oficiales de la FDA, la AVMA, estudios de facultades de medicina veterinaria de universidades prestigiosas o reportes científicos).
2.  **Análisis Previo:** Extrae hechos clínicos, parámetros necesarios y advertencias de seguridad. No planifiques pautas de dosis para el lector; aplica los límites clínicos de la referencia compartida.
3.  **Documentación Inicial:** Declara y enlaza estas fuentes en la sección inicial del briefing. **Toda la estructura posterior del artículo H2/H3 debe estar justificada por la información de estas fuentes.**
4.  > [!WARNING]
    > **Regla Anti-Alucinación de Fuentes:** Cada fuente debe enlazar al documento, estudio o página específica citada (URL profunda), nunca a la homepage genérica de la institución (ej. evita `https://wsava.org/` a secas). Si no puedes verificar la URL exacta del documento, no la inventes: cita el nombre completo del estudio/guía y el autor/institución en texto plano, y marca el dato como `[URL no verificada — confirmar antes de publicar]` en vez de un enlace.
    >
    > **Prohibición explícita de identificadores inventados (PMID/DOI):** Un PMID o DOI que no fue confirmado por una búsqueda real es indistinguible, a simple vista, de uno auténtico — y un número con formato correcto pero equivocado es peor que no poner ninguno, porque aparenta estar verificado sin estarlo (caso real detectado: un PMID de un estudio de obstetricia humana fue presentado como cita de un libro de endocrinología veterinaria canina). Por eso:
    > - Si tienes herramienta de búsqueda web disponible, úsala para cada fuente y confirma que el identificador (PMID/DOI/URL) corresponde **al tema exacto** que le estás atribuyendo — no solo que el formato "parece" correcto.
    > - Si NO tienes herramienta de búsqueda web disponible en esta sesión, **no generes ningún PMID, DOI ni URL de memoria**. En su lugar, cita solo autor/año/título/revista en texto plano y marca la fuente completa como `[Cita bibliográfica sin verificar — el redactor o el usuario debe confirmar el identificador antes de publicar]`. Una fuente sin número es honesta; una fuente con un número inventado es una alucinación disfrazada de rigor.
    > - Antes de cerrar el brief, para cada fuente pregúntate explícitamente: *"¿Verifiqué que este identificador apunta al estudio que digo que apunta, o simplemente 'sonaba plausible'?"* Si la respuesta es la segunda, retíralo.
5.  **Cobertura limitada:** Documenta las fuentes fuertes disponibles y las lagunas; usa referencias clínicas secundarias identificadas como tales cuando sean adecuadas. No rellenes cuotas. Si falta respaldo de una afirmación central, cambia el enfoque o deja el brief no válido; no presentes esa incertidumbre como evidencia.
6.  **Trazabilidad obligatoria (fuente → sección):** Ninguna fuente puede quedar solo listada en la Sección 3 sin uso real. Cada una de las fuentes declaradas debe aparecer citada por su nombre en al menos un `*Sustentado en:*` de algún H2 del brief (Sección 6), y el H2/H3 correspondiente debe desarrollar explícitamente el dato clave de esa fuente, no solo mencionarla de pasada. Antes de cerrar el brief, recorre la lista de fuentes una por una y confirma que cada una tiene al menos un H2 que la use — si sobra alguna sin sección asignada, o bien asígnale una, o bien elimínala de la lista y documenta la cobertura resultante.

### Fase 3: Mapeo de Enlazado Interno (Interlinking)
1.  **Consulta de Inventario:** Lee [INVENTARIO_CONTENIDO.md](../../../INVENTARIO_CONTENIDO.md) para extraer las URLs reales publicadas del mismo pilar. Consulta también [config.ts](../../../src/content.config.ts) para confirmar el enum válido del campo `pilar`.
2.  **Mapeo de Enlaces:**
    *   Identifica la URL del pilar correspondiente.
    *   Selecciona mínimo 2 artículos marcados como publicados (`[x]`) de la misma sección y apunta sus URLs.
    *   Si el tema es de Salud o Cuidados Paliativos, incluye obligatoriamente el enlace a la calculadora: `/herramientas/calculadora-calidad-vida-perros`.
    *   > [!WARNING]
        > **Regla Anti-Alucinación:** No inventes slugs ni enlaces de artículos no publicados.
3.  **Contingencia — Pilar nuevo o sin suficientes spokes:** Si el pilar aún no existe en el inventario, o existen menos de 2 artículos publicados en esa sección, no inventes spokes para completar la tabla. Deja el campo explícito como `Pendiente — aún no hay 2 artículos publicados en este pilar` y enlaza únicamente al pilar (si existe) y a la calculadora cuando aplique.

### Fase 4: Estructuración y Salida
1.  Utiliza la estructura definida en [template_briefing.md](./resources/template_briefing.md) para redactar el briefing. Las fuentes van al inicio, actuando como cimiento científico de las secciones de desarrollo.
2.  **Variedad mínima de AlertBox:** Indica cómo usar los componentes interactivos (`AlertBox` y `FAQ`) detallados en [astro_components.md](./references/astro_components.md). El brief debe planificar **los 3 tipos de `AlertBox`, al menos una vez cada uno**, distribuidos así:
    *   `info`: en la Introducción, como nota de acompañamiento empático.
    *   `danger`: en la sección clínica de síntomas/diagnóstico, como señales de alarma que requieren veterinario inmediato.
    *   `warning`: en la sección de tratamiento/manejo doméstico, como advertencia de seguridad (dosis, medicación, riesgos de manejo incorrecto).
    Un brief con menos de estos 3 tipos, o que repita el mismo tipo en vez de cubrir los 3, no pasa la Validación Final.
3.  Usa la plantilla vigente. El ejemplo de Cushing es histórico y no acredita sus fuentes ni su caso: no copiar su contenido clínico o narrativo.
4.  **Arco narrativo si aporta utilidad:** El material documentado o el ejemplo declarado puede planificarse en estos tres momentos; en una guía sin caso se sustituye por pregunta, decisiones y límites, sin copiar casos del ejemplo histórico de Cushing:
    *   **Apertura (Introducción):** el gancho emocional o momento de crisis/duda inicial.
    *   **Desarrollo (un H2 intermedio):** el detalle práctico del problema conectado con la ciencia de esa sección.
    *   **Cierre (el último H2 antes de Conclusión/FAQ):** el desenlace documentado o los límites de lo conocido, sin inventar recuperación. Solo se exige un H2 narrativo propio si el contrato lo justifica; no crees una sección para fabricar un resultado o ganar palabras.
    *   Si la historia involucra más de un sujeto (ej. dos perros con problemas distintos), decide y declara explícitamente en el brief cuál es el **hilo narrativo principal** que se cierra al final; los sujetos secundarios pueden aportar contraste, pero no deben repartir el cierre entre varios desenlaces.
5.  **Prompts de imagen robustos y con sujeto consistente (Sección 8 del template):** Ninguno de los 3 prompts de imagen puede sonar a banco de imágenes genérico. Cada uno debe especificar tipo de plano, escenario realista, iluminación natural, profundidad de campo y un estilo fotoperiodístico/cinematográfico concreto — no una escena vacía de "perro feliz en parque".
    > [!IMPORTANT]
    > **Consistencia de sujeto obligatoria:** los 3 prompts deben nombrar explícitamente la **misma raza** (y, si aplica, el mismo perro con sus rasgos distintivos — edad, color, tamaño) del sujeto visual declarado en la Sección 2/8, que puede ser ilustrativo, en los 3 prompts sin excepción. Nunca generalices a "a senior dog" en un prompt si en otro sí nombraste la raza — eso rompe la continuidad visual del artículo cuando el usuario genere las 3 imágenes. Si la historia tiene más de un perro (ej. dos perras con roles distintos), indica en cada prompt cuál de los dos aparece, con su raza propia.
6.  > [!IMPORTANT]
    > **Límite Brief vs. Redacción:** Este skill entrega un briefing de planificación, no prosa casi final. Para cada bloque (introducción, H2/H3, AlertBox, FAQ) escribe **instrucciones y puntos clave para el redactor** (qué debe explicar, qué fuente usar, qué dato de la historia real conectar), no el texto terminado. Excepción: los `items` de `FAQ` y el `title`/tipo de cada `AlertBox` sí pueden anticiparse como borrador corto, porque son datos estructurados que el redactor ajustará, no párrafos de desarrollo.
7.  **Genera el Contrato de Entrega (Sección 9 del template):** Completa la tabla de trazabilidad de fuentes (fuente → H2 asignado → casilla de verificación) y el checklist de "no negociables" (volumen mínimo real, componentes estructurales, arco narrativo). Este contrato existe porque briefs anteriores fueron ignorados parcialmente en redacción (fuentes asignadas que nunca se citaron, AlertBox y enlaces planificados que no llegaron al artículo, conteos de palabras muy por debajo del target). El contrato no evita eso por sí solo, pero deja un criterio de auditoría explícito y verificable contra el `.mdx` final — tanto para revisión humana como para la skill [redactar-articulo-blog](../redactar-articulo-blog/SKILL.md), que toma este brief y valida el artículo final contra él.

### Voz y tono

El brief remite a la [guía de voz y tono](../references/guia-voz-tono.md) y no fija otra voz. Si existe experiencia propia del equipo (Luna, Dakota) con procedencia documentada, indica en qué H2 aporta; si no existe, declara «guía sin caso».

### Planificación visual cuando el usuario la solicita

Si el encargo incluye producción de imágenes, infografías o animaciones, la Sección 8 debe enlazar el flujo de [crear-animaciones-articulo-blog](../crear-animaciones-articulo-blog/SKILL.md) y definir:

- La ficha de un sujeto visual senior continuo, diferenciado del paciente real cuando sea ilustrativo. Conservar la raza del caso cuando se haya acordado; si no se conoce, seguir la elección visual del usuario. No convertir la raza del ejemplo en valor universal.
- Una primera imagen de referencia que se inspeccionará antes de derivar el resto. Pedir edad visible mediante rasgos naturales, anatomía correcta y apoyos adecuados, sin imponer enfermedades para aparentar vejez.
- Para cada recurso: sección de inserción, pregunta que responde, composición/acción y texto alternativo. Respetar la cantidad solicitada; no añadir tres animaciones a todo artículo de forma automática.
- Cuando resulte adecuado, recorte realista transparente del mismo perro y secuencia de cambios en herramientas o zonas. No planificar una silueta rudimentaria como sustituto de un sujeto convincente.
- Cada recurso planificado debe poder cumplir [apoyos visuales cómodos en móvil y escritorio](../references/apoyos-visuales-responsive.md): indica cómo se verá en móvil (tabla apilable, pasos con controles, formulario plegado) y descarta tablas de celdas largas.
- Criterios de entrega: imágenes reales, capturas en móvil y modo oscuro, contraste, controles y accesibilidad; compatibilidad con el build y rutas que eviten mostrar imágenes antiguas desde caché.

Esto planifica la producción visual; no inventa un caso clínico ni modifica por sí solo el contrato científico del artículo.

### Fase 5: Guardado Local del Briefing
1.  **Ruta de guardado:** Una vez el briefing pase la Validación Final (checklist), guárdalo como archivo en `/briefings/briefing-{{SLUG_DEL_POST}}.md` en la raíz del proyecto (carpeta versionada en Git: el brief se commitea junto al resto del trabajo).
2.  **Confirmación:** No guardes el archivo en silencio. Guarda el brief cuando el encargo ya lo autoriza y comunica la ruta. Solo solicita confirmación si falta autorización o hay una colisión ajena al alcance encargado.
3.  **Colisión de nombres:** Si ya existe un archivo con ese slug en `/briefings/`, no lo sobrescribas en silencio — pregunta al usuario si desea reemplazarlo, versionarlo (`briefing-{{SLUG}}-v2.md`) o cancelar el guardado.
4.  **Marca el estado en `INVENTARIO_CONTENIDO.md`:** una vez escrito el archivo del brief, busca la línea del catálogo (`Catálogo de Artículos por Redactar`) que corresponde a este artículo y cámbiala de `- [ ] *Título*` a `- [~] *Título* (En Briefing — ver \`briefings/briefing-{{SLUG}}.md\`)`. Si el artículo no estaba listado en el catálogo (tema nuevo no previsto), agrégalo bajo el pilar correspondiente con ese mismo formato en vez de omitir la actualización.

---

## 🎯 Validación Final (Checklist)

Antes de entregar el briefing al usuario, asegúrate de validar:
*   [ ] ¿Se verificó que la keyword/slug no canibaliza un artículo ya existente en el inventario?
*   [ ] ¿La cita literal de la historia real fue revisada y depurada de errores de transcripción (nombres cruzados, muletillas, frases truncadas) sin alterar los hechos originales?
*   [ ] ¿El bloque de metadatos YAML está completo y sin errores de formato, y el `pilar` corresponde a un enum válido de `src/content.config.ts`?
*   [ ] ¿El `seoTitle` tiene como máximo 55 caracteres y la `metaDescription` como máximo 160 caracteres (cuéntalos, no estimes)?
*   [ ] ¿Las fuentes cubren las afirmaciones, con límites y lagunas documentados, sin cuota artificial?
*   [ ] ¿Cada fuente enlaza al documento/estudio específico (no a una homepage genérica) o está marcada como `[URL no verificada]` si no se pudo confirmar?
*   [ ] ¿Cada PMID/DOI fue confirmado por una búsqueda real que verificó que el tema del estudio coincide con el dato que se le atribuye (no generado de memoria por "parecer plausible")? Si no había herramienta de búsqueda disponible, ¿se marcaron esas fuentes como `[Cita bibliográfica sin verificar]` en vez de inventar un número?
*   [ ] ¿La estructura del artículo H2/H3 surge y cita directamente las fuentes documentadas?
*   [ ] ¿Cada una de todas las fuentes (sin excepción) aparece asignada como `*Sustentado en:*` de al menos un H2, y ese H2 realmente desarrolla su dato clave — ninguna fuente quedó "decorativa" solo en la lista inicial?
*   [ ] ¿Se completó la Sección 9 (Contrato de Entrega) con la tabla de trazabilidad de fuentes y el checklist de no negociables (volumen real, componentes, arco narrativo)?
*   [ ] ¿Se planificaron los 3 tipos de `AlertBox` (`info` en Intro, `danger` en síntomas/diagnóstico, `warning` en tratamiento/manejo), al menos uno de cada tipo?
*   [ ] ¿Los 3 prompts de imagen (Sección 8) nombran la misma raza del sujeto visual declarado, que puede ser ilustrativo en los 3, sin generalizar a "perro" genérico en ninguno, y evitan estética de banco de imágenes (plano, luz, profundidad de campo y estilo definidos)?
*   [ ] ¿El material narrativo, si se usa, tiene sus momentos documentados y un cierre sin inventar resultados, o se justificó una guía sin caso? Si hay más de un sujeto en la historia, ¿se declaró cuál es el hilo narrativo principal que se cierra?
*   [ ] ¿Los enlaces internos corresponden a artículos realmente publicados en el inventario, o se marcaron como "Pendiente" si el pilar no tiene aún 2 spokes?
*   [ ] ¿Cada sección del brief da instrucciones y puntos clave para el redactor, en vez de párrafos ya redactados?
*   [ ] ¿La suma de los targets coincide con el total justificado del contrato (el conteo real solo se valida en el artículo final, no en el brief)?
*   [ ] ¿Se marcó el artículo como `[~] (En Briefing)` en `INVENTARIO_CONTENIDO.md` tras guardar el archivo del brief?
