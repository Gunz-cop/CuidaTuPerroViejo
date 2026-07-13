---
name: Generar Briefing de Contenido - Cuida Tu Perro Viejo
description: Diseña un briefing técnico estructurado para artículos de blog MDX en el stack de Astro, adaptado a la audiencia y directrices de cuidatuperroviejo.com.
---

# Habilidad: Generador de Briefings de Contenido Técnico (Astro/MDX)

Esta habilidad automatiza y estandariza la creación de briefings de contenido altamente técnicos para el sitio [cuidatuperroviejo.com](https://www.cuidatuperroviejo.com). Sigue una estrategia **Source-First** (Basada en Fuentes), donde el esqueleto y desarrollo científico del artículo se estructuran en función de la investigación médica y veterinaria previa, y no al revés.

---

## 📂 Recursos de la Habilidad

Esta habilidad sigue la estructura avanzada de división de responsabilidades:
*   [SKILL.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/SKILL.md): Directrices de flujo de trabajo y reglas de ejecución (este archivo).
*   [template_briefing.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/resources/template_briefing.md): Plantilla estructural en Markdown limpia con las fuentes al inicio.
*   [ejemplo_briefing_cushing.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/examples/ejemplo_briefing_cushing.md): Ejemplo de referencia real (few-shot) con 6 fuentes detalladas y analizadas al comienzo.
*   [astro_components.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/references/astro_components.md): Guía de referencia técnica sobre componentes interactivos MDX autorizados.

---

## 🧭 Flujo de Ejecución (4 Fases)

### Fase 1: Recepción de Datos y Control de E-E-A-T (Gatillo)
1.  **Entrada:** El usuario proporciona el **Título del post**, **Keyword principal** y el **Slug propuesto**.
2.  **Validación de Caso Real (Filtro E-E-A-T):**
    > [!CAUTION]
    > Si el usuario no proporciona una historia o experiencia real en su mensaje, detén la ejecución de inmediato y responde exactamente:
    > *"Para cumplir con el E-E-A-T en este artículo de 6.000 palabras, necesito una experiencia real. Por favor, cuéntame un caso real (tuyo o cercano) relacionado con este tema."*
    > **No comiences a investigar ni a generar el briefing hasta recibir esta entrada.**

### Fase 2: Investigación Científica (Source-First) - *Mínimo 6 Fuentes*
1.  **Búsqueda y Selección:** Busca y verifica **mínimo 6 fuentes fuertes y de alta autoridad científica** (estudios indexados en PubMed, guías clínicas de la WSAVA, comunicados oficiales de la FDA, la AVMA, estudios de facultades de medicina veterinaria de universidades prestigiosas o reportes científicos).
2.  **Análisis Previo:** Extrae los hechos clínicos, los mecanismos fisiopatológicos, los rangos de dosis o parámetros clave y las advertencias de seguridad de estas fuentes.
3.  **Documentación Inicial:** Declara y enlaza estas fuentes en la sección inicial del briefing. **Toda la estructura posterior del artículo H2/H3 debe estar justificada por la información de estas fuentes.**

### Fase 3: Mapeo de Enlazado Interno (Interlinking)
1.  **Consulta de Inventario:** Lee [INVENTARIO_CONTENIDO.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/INVENTARIO_CONTENIDO.md) para extraer las URLs reales publicadas del mismo pilar.
2.  **Mapeo de Enlaces:**
    *   Identifica la URL del pilar correspondiente.
    *   Selecciona mínimo 2 artículos marcados como publicados (`[x]`) de la misma sección y apunta sus URLs.
    *   Si el tema es de Salud o Cuidados Paliativos, incluye obligatoriamente el enlace a la calculadora: `/herramientas/calculadora-calidad-vida-perros`.
    *   > [!WARNING]
        > **Regla Anti-Alucinación:** No inventes slugs ni enlaces de artículos no publicados.

### Fase 4: Estructuración y Salida
1.  Utiliza la estructura definida en [template_briefing.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/resources/template_briefing.md) para redactar el briefing. Las fuentes van al inicio, actuando como cimiento científico de las secciones de desarrollo.
2.  Indica cómo usar los componentes interactivos (`AlertBox` y `FAQ`) detallados en [astro_components.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/references/astro_components.md).
3.  Sigue el nivel de detalle y estructura del caso resuelto en [ejemplo_briefing_cushing.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/examples/ejemplo_briefing_cushing.md).

---

## 🎯 Validación Final (Checklist)

Antes de entregar el briefing al usuario, asegúrate de validar:
*   [ ] ¿El bloque de metadatos YAML está completo y sin errores de formato?
*   [ ] ¿El `seoTitle` en el frontmatter tiene como máximo 55 caracteres (para evitar recorte en Bing/Google)?
*   [ ] ¿Se listan y detallan **mínimo 6 fuentes científicas de autoridad** al inicio del briefing?
*   [ ] ¿La estructura del artículo H2/H3 surge y cita directamente las fuentes documentadas?
*   [ ] ¿Se ha planificado la inserción de la historia real en mínimo 3 bloques H2/H3?
*   [ ] ¿Los enlaces internos corresponden a artículos realmente publicados en el inventario?
*   [ ] ¿Las fuentes externas son URLs reales en texto plano?
