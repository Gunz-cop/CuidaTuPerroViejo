---
name: Generar Briefing de Contenido - Cuida Tu Perro Viejo
description: Diseña un briefing técnico estructurado para artículos de blog MDX en el stack de Astro, adaptado a la audiencia y directrices de cuidatuperroviejo.com.
---

# Habilidad: Generador de Briefings de Contenido Técnico (Astro/MDX)

Esta habilidad automatiza y estandariza la creación de briefings de contenido altamente técnicos para el sitio [cuidatuperroviejo.com](https://www.cuidatuperroviejo.com). Sigue una estrategia **Source-First** (Basada en Fuentes), donde el esqueleto y desarrollo científico del artículo se estructuran en función de la investigación médica y veterinaria previa, y no al revés.

> [!IMPORTANT]
> **Principio de no-omisión (para cualquier agente que ejecute esta skill, sea cual sea el modelo):** Ningún paso marcado como obligatorio en este documento es opcional a criterio del agente, sin importar que en el razonamiento interno parezca "poco relevante para este caso concreto" o que omitirlo permita entregar el brief más rápido. Si un paso genuinamente no aplica (ej. el usuario no tiene historia real, o el tema no tiene 6 fuentes de autoridad), la skill ya define explícitamente qué hacer en esa excepción (ver Fase 1.2 y Fase 2.5) — la salida correcta siempre es seguir la excepción documentada o preguntar al usuario, nunca decidir en silencio que el paso "no aplica" y seguir de largo. Ante la duda entre "cumplir la letra de la regla" y "usar criterio propio para ir más rápido", cumple la letra de la regla.

---

## 📂 Recursos de la Habilidad

Esta habilidad sigue la estructura avanzada de división de responsabilidades:
*   [SKILL.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/SKILL.md): Directrices de flujo de trabajo y reglas de ejecución (este archivo).
*   [template_briefing.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/resources/template_briefing.md): Plantilla estructural en Markdown limpia con las fuentes al inicio.
*   [ejemplo_briefing_cushing.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/examples/ejemplo_briefing_cushing.md): Ejemplo de referencia real (few-shot) con 6 fuentes detalladas y analizadas al comienzo.
*   [astro_components.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/references/astro_components.md): Guía de referencia técnica sobre componentes interactivos MDX autorizados.
*   `/briefings/`: Carpeta local (ignorada por Git) donde se guardan los briefings finales generados, uno por artículo, con el nombre `briefing-{{slug}}.md`.

---

## 🧭 Flujo de Ejecución (5 Fases)

### Fase 1: Recepción de Datos y Control de E-E-A-T (Gatillo)
1.  **Entrada:** El usuario proporciona el **Título del post**, **Keyword principal** y el **Slug propuesto**.
2.  **Validación de Caso Real (Filtro E-E-A-T):**
    > [!CAUTION]
    > Si el usuario no proporciona una historia o experiencia real en su mensaje, detén la ejecución de inmediato y responde exactamente:
    > *"Para cumplir con el E-E-A-T en este artículo de 6.000 palabras, necesito una experiencia real. Por favor, cuéntame un caso real (tuyo o cercano) relacionado con este tema."*
    > **No comiences a investigar ni a generar el briefing hasta recibir esta entrada.**
3.  **Chequeo de Canibalización SEO:** Antes de investigar, busca en [INVENTARIO_CONTENIDO.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/INVENTARIO_CONTENIDO.md) si la keyword principal o un slug muy similar ya está cubierto por un artículo existente (publicado o en curso).
    > [!WARNING]
    > Si detectas solapamiento claro, no generes el briefing todavía: avisa al usuario del artículo existente y pregunta si quiere diferenciar el ángulo, fusionar el contenido o continuar de todas formas.
4.  **Limpieza de la Transcripción Real (Control de Calidad E-E-A-T):** Antes de copiar la historia real a la Sección 2 del briefing, revísala por errores propios de dictado/transcripción por voz: nombres propios intercambiados o repetidos (ej. "Luna entra en el plato de Luna" cuando el sujeto correcto es otro perro), frases truncadas o sin sentido, y muletillas excesivas ("eh", "pues", "este"). Corrige estos errores manteniendo el sentido y los hechos originales intactos — **nunca inventes ni añadas datos que el usuario no dio**, solo depura la forma. Si una frase es ambigua y no puedes inferir con seguridad qué quiso decir el usuario, pregúntale antes de asumir.

### Fase 2: Investigación Científica (Source-First) - *Mínimo 6 Fuentes*
1.  **Búsqueda y Selección:** Busca y verifica **mínimo 6 fuentes fuertes y de alta autoridad científica** (estudios indexados en PubMed, guías clínicas de la WSAVA, comunicados oficiales de la FDA, la AVMA, estudios de facultades de medicina veterinaria de universidades prestigiosas o reportes científicos).
2.  **Análisis Previo:** Extrae los hechos clínicos, los mecanismos fisiopatológicos, los rangos de dosis o parámetros clave y las advertencias de seguridad de estas fuentes.
3.  **Documentación Inicial:** Declara y enlaza estas fuentes en la sección inicial del briefing. **Toda la estructura posterior del artículo H2/H3 debe estar justificada por la información de estas fuentes.**
4.  > [!WARNING]
    > **Regla Anti-Alucinación de Fuentes:** Cada fuente debe enlazar al documento, estudio o página específica citada (URL profunda), nunca a la homepage genérica de la institución (ej. evita `https://wsava.org/` a secas). Si no puedes verificar la URL exacta del documento, no la inventes: cita el nombre completo del estudio/guía y el autor/institución en texto plano, y marca el dato como `[URL no verificada — confirmar antes de publicar]` en vez de un enlace.
    >
    > **Prohibición explícita de identificadores inventados (PMID/DOI):** Un PMID o DOI que no fue confirmado por una búsqueda real es indistinguible, a simple vista, de uno auténtico — y un número con formato correcto pero equivocado es peor que no poner ninguno, porque aparenta estar verificado sin estarlo (caso real detectado: un PMID de un estudio de obstetricia humana fue presentado como cita de un libro de endocrinología veterinaria canina). Por eso:
    > - Si tienes herramienta de búsqueda web disponible, úsala para cada fuente y confirma que el identificador (PMID/DOI/URL) corresponde **al tema exacto** que le estás atribuyendo — no solo que el formato "parece" correcto.
    > - Si NO tienes herramienta de búsqueda web disponible en esta sesión, **no generes ningún PMID, DOI ni URL de memoria**. En su lugar, cita solo autor/año/título/revista en texto plano y marca la fuente completa como `[Cita bibliográfica sin verificar — el redactor o el usuario debe confirmar el identificador antes de publicar]`. Una fuente sin número es honesta; una fuente con un número inventado es una alucinación disfrazada de rigor.
    > - Antes de cerrar el brief, para cada fuente pregúntate explícitamente: *"¿Verifiqué que este identificador apunta al estudio que digo que apunta, o simplemente 'sonaba plausible'?"* Si la respuesta es la segunda, retíralo.
5.  **Si no existen 6 fuentes de esa autoridad** (temas muy nicho, razas raras, condiciones poco documentadas): no rellenes con enlaces débiles para completar el número. Documenta las fuentes fuertes que sí encontraste, indica explícitamente cuántas son y por qué el tema tiene disponibilidad limitada de literatura, y pregunta al usuario si acepta continuar con fuentes secundarias (libros de texto veterinarios reconocidos, posturas de colegios veterinarios nacionales) marcadas como tales.
6.  **Trazabilidad obligatoria (fuente → sección):** Ninguna fuente puede quedar solo listada en la Sección 3 sin uso real. Cada una de las fuentes declaradas debe aparecer citada por su nombre en al menos un `*Sustentado en:*` de algún H2 del brief (Sección 6), y el H2/H3 correspondiente debe desarrollar explícitamente el dato clave de esa fuente, no solo mencionarla de pasada. Antes de cerrar el brief, recorre la lista de 6 fuentes una por una y confirma que cada una tiene al menos un H2 que la use — si sobra alguna sin sección asignada, o bien asígnale una, o bien elimínala de la lista y ajusta el conteo mínimo de fuentes en consecuencia.

### Fase 3: Mapeo de Enlazado Interno (Interlinking)
1.  **Consulta de Inventario:** Lee [INVENTARIO_CONTENIDO.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/INVENTARIO_CONTENIDO.md) para extraer las URLs reales publicadas del mismo pilar. Consulta también [config.ts](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/src/content/config.ts) para confirmar el enum válido del campo `pilar`.
2.  **Mapeo de Enlaces:**
    *   Identifica la URL del pilar correspondiente.
    *   Selecciona mínimo 2 artículos marcados como publicados (`[x]`) de la misma sección y apunta sus URLs.
    *   Si el tema es de Salud o Cuidados Paliativos, incluye obligatoriamente el enlace a la calculadora: `/herramientas/calculadora-calidad-vida-perros`.
    *   > [!WARNING]
        > **Regla Anti-Alucinación:** No inventes slugs ni enlaces de artículos no publicados.
3.  **Contingencia — Pilar nuevo o sin suficientes spokes:** Si el pilar aún no existe en el inventario, o existen menos de 2 artículos publicados en esa sección, no inventes spokes para completar la tabla. Deja el campo explícito como `Pendiente — aún no hay 2 artículos publicados en este pilar` y enlaza únicamente al pilar (si existe) y a la calculadora cuando aplique.

### Fase 4: Estructuración y Salida
1.  Utiliza la estructura definida en [template_briefing.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/resources/template_briefing.md) para redactar el briefing. Las fuentes van al inicio, actuando como cimiento científico de las secciones de desarrollo.
2.  **Variedad mínima de AlertBox:** Indica cómo usar los componentes interactivos (`AlertBox` y `FAQ`) detallados en [astro_components.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/references/astro_components.md). El brief debe planificar **los 3 tipos de `AlertBox`, al menos una vez cada uno**, distribuidos así (igual que `ejemplo_briefing_cushing.md`):
    *   `info`: en la Introducción, como nota de acompañamiento empático.
    *   `danger`: en la sección clínica de síntomas/diagnóstico, como señales de alarma que requieren veterinario inmediato.
    *   `warning`: en la sección de tratamiento/manejo doméstico, como advertencia de seguridad (dosis, medicación, riesgos de manejo incorrecto).
    Un brief con menos de estos 3 tipos, o que repita el mismo tipo en vez de cubrir los 3, no pasa la Validación Final.
3.  Sigue el nivel de detalle y estructura del caso resuelto en [ejemplo_briefing_cushing.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/examples/ejemplo_briefing_cushing.md).
4.  **Arco narrativo obligatorio del caso real (3 momentos, no solo 3 menciones):** La historia real debe planificarse en exactamente estos 3 momentos del brief, tal como lo hace `ejemplo_briefing_cushing.md` (Intro / H2-2 / H2-5):
    *   **Apertura (Introducción):** el gancho emocional o momento de crisis/duda inicial.
    *   **Desarrollo (un H2 intermedio):** el detalle práctico del problema conectado con la ciencia de esa sección.
    *   **Cierre (el último H2 antes de Conclusión/FAQ):** el desenlace o estado actual del caso, ofreciendo esperanza realista. Este cierre es de inclusión obligatoria — un brief sin un H2 final dedicado a resolver la historia real (o al menos a retomarla explícitamente como cierre) está incompleto, sin importar que la historia ya se haya mencionado antes en otras secciones.
    *   Si la historia involucra más de un sujeto (ej. dos perros con problemas distintos), decide y declara explícitamente en el brief cuál es el **hilo narrativo principal** que se cierra al final; los sujetos secundarios pueden aportar contraste, pero no deben repartir el cierre entre varios desenlaces.
5.  **Prompts de imagen robustos y con sujeto consistente (Sección 8 del template):** Ninguno de los 3 prompts de imagen puede sonar a banco de imágenes genérico. Cada uno debe especificar tipo de plano, escenario realista, iluminación natural, profundidad de campo y un estilo fotoperiodístico/cinematográfico concreto — no una escena vacía de "perro feliz en parque".
    > [!IMPORTANT]
    > **Consistencia de sujeto obligatoria:** los 3 prompts deben nombrar explícitamente la **misma raza** (y, si aplica, el mismo perro con sus rasgos distintivos — edad, color, tamaño) del protagonista de la historia real de la Sección 2, en los 3 prompts sin excepción. Nunca generalices a "a senior dog" en un prompt si en otro sí nombraste la raza — eso rompe la continuidad visual del artículo cuando el usuario genere las 3 imágenes. Si la historia tiene más de un perro (ej. dos perras con roles distintos), indica en cada prompt cuál de los dos aparece, con su raza propia.
6.  > [!IMPORTANT]
    > **Límite Brief vs. Redacción:** Este skill entrega un briefing de planificación, no prosa casi final. Para cada bloque (introducción, H2/H3, AlertBox, FAQ) escribe **instrucciones y puntos clave para el redactor** (qué debe explicar, qué fuente usar, qué dato de la historia real conectar), no el texto terminado. Excepción: los `items` de `FAQ` y el `title`/tipo de cada `AlertBox` sí pueden anticiparse como borrador corto, porque son datos estructurados que el redactor ajustará, no párrafos de desarrollo.
7.  **Genera el Contrato de Entrega (Sección 9 del template):** Completa la tabla de trazabilidad de fuentes (fuente → H2 asignado → casilla de verificación) y el checklist de "no negociables" (volumen mínimo real, componentes estructurales, arco narrativo). Este contrato existe porque briefs anteriores fueron ignorados parcialmente en redacción (fuentes asignadas que nunca se citaron, AlertBox y enlaces planificados que no llegaron al artículo, conteos de palabras muy por debajo del target). El contrato no evita eso por sí solo, pero deja un criterio de auditoría explícito y verificable contra el `.mdx` final — tanto para revisión humana como para la skill [redactar-articulo-blog](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/redactar-articulo-blog/SKILL.md), que toma este brief y valida el artículo final contra él.

### Fase 5: Guardado Local del Briefing
1.  **Ruta de guardado:** Una vez el briefing pase la Validación Final (checklist), guárdalo como archivo en `/briefings/briefing-{{SLUG_DEL_POST}}.md` en la raíz del proyecto (carpeta ignorada por Git — uso exclusivamente local).
2.  **Confirmación:** No guardes el archivo en silencio. Muestra el briefing completo en el chat como respuesta y, a continuación, **pregunta al usuario si quiere que lo guardes** en esa ruta antes de escribir el archivo. Si el usuario confirma, escribe el archivo y avisa la ruta final; si no responde o declina, no lo guardes.
3.  **Colisión de nombres:** Si ya existe un archivo con ese slug en `/briefings/`, no lo sobrescribas en silencio — pregunta al usuario si desea reemplazarlo, versionarlo (`briefing-{{SLUG}}-v2.md`) o cancelar el guardado.
4.  **Marca el estado en `INVENTARIO_CONTENIDO.md`:** una vez escrito el archivo del brief, busca la línea del catálogo (`Catálogo de Artículos por Redactar`) que corresponde a este artículo y cámbiala de `- [ ] *Título*` a `- [~] *Título* (En Briefing — ver \`briefings/briefing-{{SLUG}}.md\`)`. Si el artículo no estaba listado en el catálogo (tema nuevo no previsto), agrégalo bajo el pilar correspondiente con ese mismo formato en vez de omitir la actualización.

---

## 🎯 Validación Final (Checklist)

Antes de entregar el briefing al usuario, asegúrate de validar:
*   [ ] ¿Se verificó que la keyword/slug no canibaliza un artículo ya existente en el inventario?
*   [ ] ¿La cita literal de la historia real fue revisada y depurada de errores de transcripción (nombres cruzados, muletillas, frases truncadas) sin alterar los hechos originales?
*   [ ] ¿El bloque de metadatos YAML está completo y sin errores de formato, y el `pilar` corresponde a un enum válido de `config.ts`?
*   [ ] ¿El `seoTitle` tiene como máximo 55 caracteres y la `metaDescription` como máximo 160 caracteres (cuéntalos, no estimes)?
*   [ ] ¿Se listan **mínimo 6 fuentes científicas de autoridad** (o, si no existen, se documentó explícitamente por qué y se pidió aprobación al usuario)?
*   [ ] ¿Cada fuente enlaza al documento/estudio específico (no a una homepage genérica) o está marcada como `[URL no verificada]` si no se pudo confirmar?
*   [ ] ¿Cada PMID/DOI fue confirmado por una búsqueda real que verificó que el tema del estudio coincide con el dato que se le atribuye (no generado de memoria por "parecer plausible")? Si no había herramienta de búsqueda disponible, ¿se marcaron esas fuentes como `[Cita bibliográfica sin verificar]` en vez de inventar un número?
*   [ ] ¿La estructura del artículo H2/H3 surge y cita directamente las fuentes documentadas?
*   [ ] ¿Cada una de las 6 fuentes (sin excepción) aparece asignada como `*Sustentado en:*` de al menos un H2, y ese H2 realmente desarrolla su dato clave — ninguna fuente quedó "decorativa" solo en la lista inicial?
*   [ ] ¿Se completó la Sección 9 (Contrato de Entrega) con la tabla de trazabilidad de fuentes y el checklist de no negociables (volumen real, componentes, arco narrativo)?
*   [ ] ¿Se planificaron los 3 tipos de `AlertBox` (`info` en Intro, `danger` en síntomas/diagnóstico, `warning` en tratamiento/manejo), al menos uno de cada tipo?
*   [ ] ¿Los 3 prompts de imagen (Sección 8) nombran la misma raza del protagonista real en los 3, sin generalizar a "perro" genérico en ninguno, y evitan estética de banco de imágenes (plano, luz, profundidad de campo y estilo definidos)?
*   [ ] ¿La historia real tiene sus 3 momentos obligatorios planificados (apertura en la Intro, desarrollo en un H2 intermedio, y **cierre explícito en el último H2 antes de Conclusión/FAQ**)? Si hay más de un sujeto en la historia, ¿se declaró cuál es el hilo narrativo principal que se cierra?
*   [ ] ¿Los enlaces internos corresponden a artículos realmente publicados en el inventario, o se marcaron como "Pendiente" si el pilar no tiene aún 2 spokes?
*   [ ] ¿Cada sección del brief da instrucciones y puntos clave para el redactor, en vez de párrafos ya redactados?
*   [ ] ¿La suma de los targets de palabras por sección está entre 6.000 y 6.500 (el conteo real solo se valida en el artículo final, no en el brief)?
*   [ ] ¿Se marcó el artículo como `[~] (En Briefing)` en `INVENTARIO_CONTENIDO.md` tras guardar el archivo del brief?
