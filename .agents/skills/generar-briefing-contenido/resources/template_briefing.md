# 📋 BRIEF DE CONTENIDOS TÉCNICO: {{TÍTULO_DEL_ARTÍCULO}}
**Sitio:** cuidatuperroviejo.com | **Pilar:** {{NOMBRE_PILAR}} | **Tipo:** Artículo spoke (Astro/MDX)

---

## 1. DATOS, METADATOS Y FRONTMATTER MDX

| Campo | Valor |
|---|---|
| **Título H1** | {{TITULO_H1_LEGIBLE_Y_DIRECTO}} |
| **Título SEO (seoTitle)** | {{TITULO_SEO_OPTIMIZADO_MAX_55_CARACTERES}} |
| **Keyword Principal** | {{KEYWORD_PRINCIPAL}} |
| **Keywords Secundarias** | {{KEYWORD_SECUNDARIA_1}} · {{KEYWORD_SECUNDARIA_2}} · {{KEYWORD_SECUNDARIA_3}} · {{KEYWORD_SECUNDARIA_4}} · {{KEYWORD_SECUNDARIA_5}} |
| **Slug** | `{{SLUG_DEL_POST}}` |
| **Meta descripción (Máx. 160 car.)** | {{META_DESCRIPCION_EMOCIONAL_Y_TECNICA_MAX_160_CARACTERES}} |
| **Ruta Relativa** | `/{{SLUG_DEL_PILAR}}/{{SLUG_DEL_POST}}` |
| **Pilar** | {{NOMBRE_PILAR}} |
| **Ruta Pilar** | `/{{SLUG_DEL_PILAR}}` |
| **Intención Principal** | Informacional — el dueño necesita entender... |
| **Intención Secundaria** | Práctica / Resolutiva / Comercial — el dueño busca... |
| **Objetivo Global** | 6.000 – 6.500 palabras (Skyscraper Content) |
| **Fecha brief** | {{FECHA_DE_HOY}} |

### Bloque de Frontmatter MDX
El redactor debe iniciar el archivo `.mdx` copiando exactamente este bloque de metadatos:

```yaml
---
title: "{{TITULO_H1_LEGIBLE_Y_DIRECTO}}"
seoTitle: "{{TITULO_SEO_OPTIMIZADO_MAX_55_CARACTERES}}"
metaDescription: "{{META_DESCRIPCION_EMOCIONAL_Y_TECNICA_MAX_160_CARACTERES}}"
pilar: "{{ENUM_DEL_PILAR_SEGUN_CONFIG_TS}}"
keywordPrincipal: "{{KEYWORD_PRINCIPAL}}"
heroImage: "/images/blog/{{SLUG_DEL_POST}}/{{NOMBRE_IMAGEN_PRINCIPAL}}.webp"
heroImageAlt: "{{ALT_DESCRIPTIVO_DE_LA_IMAGEN_PRINCIPAL}}"
status: "Publicado"
datePublished: "{{FECHA_PUBLICACION_AÑO_MES_DIA}}"
---
```

---

## 2. EXPERIENCIA REAL — MATERIAL E-E-A-T (FUENTE LITERAL)

> *Texto íntegro tal como lo proporcionó el autor:*
>
> "{{HISTORIA_REAL_DEL_USUARIO}}"

**Instrucciones de uso para el redactor:**
La experiencia real debe integrarse como el hilo narrativo del artículo. No es un bloque aislado. Debe aparecer en al menos 3 momentos clave:
1.  **Introducción** — Gancho emocional: el momento de crisis o el síntoma inicial.
2.  **Desarrollo (H2)** — Ejemplo práctico de la dificultad (el suelo resbaladizo, la cama hundida, etc.) y la improvisación inicial.
3.  **Cierre o H2 Final** — El estado de recuperación actual, ofreciendo esperanza realista al lector.

---

## 3. FUENTES CIENTÍFICAS DE AUTORIDAD (SOURCE-FIRST)

> [!IMPORTANT]
> A continuación se detallan las **mínimo 6 fuentes de alta autoridad** científicas o veterinarias. Toda la base médica, datos fisiopatológicos y recomendaciones de seguridad de este artículo se originan directamente de este listado.

1.  **Fuente 1 (Estudio/Directriz):** [Nombre del estudio/entidad y URL en texto plano]
    *   *Dato clave:* [Mecanismo fisiológico, estadísticas o pauta médica extraída]
2.  **Fuente 2 (Estudio/Directriz):** [Detalles]
3.  **Fuente 3 (Estudio/Directriz):** [Detalles]
4.  **Fuente 4 (Estudio/Directriz):** [Detalles]
5.  **Fuente 5 (Estudio/Directriz):** [Detalles]
6.  **Fuente 6 (Estudio/Directriz):** [Detalles]

---

## 4. REQUISITOS TÉCNICOS DE ASTRO Y MDX

*   **Importaciones obligatorias:**
    En la primera línea del cuerpo del archivo `.mdx`, se deben declarar las importaciones de componentes:
    ```mdx
    import AlertBox from '../../components/AlertBox.astro';
    import FAQ from '../../components/FAQ.astro';
    ```
*   **Formatos semánticos:**
    *   El cuerpo no debe iniciar con un encabezado `#` (H1). Se entra directo al texto.
    *   Párrafos: máximo 3 líneas en pantallas móviles (~55-60 caracteres por línea).
    *   Subtítulos `H3` cada 150-200 palabras máximo para mantener legibilidad.
*   **Imágenes Anti-CLS:**
    *   Sintaxis HTML: `<img src="/images/blog/{{SLUG}}/{{NOMBRE}}.webp" alt="{{ALT}}" width="1200" height="675" loading="lazy" decoding="async" />`.
*   **Automatización de Layout:**
    *   **TOC:** No incluir etiquetas ni scripts de índice de contenidos; el layout `PostReader.astro` lo monta automáticamente escaneando los `H2` y `H3`.

---

## 5. ENLAZADO INTERNO OBLIGATORIO (INTERLINKING)

El redactor debe incluir los siguientes enlaces utilizando rutas relativas de Astro:

| Tipo | Texto ancla | URL | Estado en Inventario |
|---|---|---|---|
| **Pilar** | {{NOMBRE_PILAR}} | `/{{SLUG_DEL_PILAR}}` | ✅ Publicado |
| **Spoke 1** | {{TITULO_ARTICULO_1}} | `/{{SLUG_DEL_PILAR}}/{{SLUG_1}}` | ✅ Publicado |
| **Spoke 2** | {{TITULO_ARTICULO_2}} | `/{{SLUG_DEL_PILAR}}/{{SLUG_2}}` | ✅ Publicado |
| **Calculadora** | Calculadora de Calidad de Vida Canina | `/herramientas/calculadora-calidad-vida-perros` | ✅ Publicado |

---

## 6. ESTRUCTURA DETALLADA Y PRESUPUESTO DE PALABRAS

> **Target total: 6.000 – 6.500 palabras.**
> El redactor debe respetar el presupuesto asignado por sección con una desviación máxima de ±15%.

### INTRODUCCIÓN — Target: ~800 palabras

**Objetivo:** Conectar emocionalmente con la lectora preocupada usando el gancho E-E-A-T.

*   **Párrafo 1 — Gancho emocional (Experiencia real):** [Detallar cómo entra la historia de E-E-A-T aquí]
*   **Párrafo 2 — Diagnóstico latente e incertidumbre:** [Explicar la conexión del caso con el problema general]
*   **Párrafo 3 — La promesa del artículo:** [Describir lo que aprenderá en la guía]
*   **Componente AlertBox:**
    ```mdx
    <AlertBox type="info" title="Nota de Acompañamiento">
      [Texto de soporte y validación para el tutor]
    </AlertBox>
    ```

---

### [H2 - {{TITULO_DEL_TEMA_FISIOLOGICO_1}}] — Target: ~1.200 palabras
*   *Sustentado en:* [Fuentes de la sección 3 que respaldan esta sección]
*   *Objetivo:* Explicar los mecanismos biológicos y anatómicos del problema.

*   `### {{Subtema_H3_1}}`
    *   [Puntos clave a desarrollar]
    *   [Mención o enlace a estudios]
*   `### {{Subtema_H3_2}}`
    *   [Puntos clave a desarrollar]
*   **Componente AlertBox:**
    ```mdx
    <AlertBox type="danger" title="Señales de Alarma">
      [Casos críticos que requieren atención veterinaria inmediata]
    </AlertBox>
    ```

---

### [H2 - {{TITULO_DE_SINTOMAS_Y_DIAGNOSTICO_2}}] — Target: ~1.200 palabras
*   *Sustentado en:* [Fuentes que respaldan]
*   *Objetivo:* Enseñar al tutor a identificar los síntomas clínicos y de comportamiento en casa.

*   `### {{Subtema_H3_1}}`
    *   [Puntos clave y síntomas a observar]
*   `### {{Subtema_H3_2}}`
    *   [Puntos clave, pruebas o tests caseros]
*   **Lista / Checklist:** [Detallar el checklist con formato markdown standard]

---

### [H2 - {{TITULO_DE_TRATAMIENTOS_Y_CUIDADOS_3}}] — Target: ~900 palabras
*   *Sustentado en:* [Fuentes que respaldan]
*   *Objetivo:* Guía práctica de rutinas, adaptaciones domésticas y manejo farmacológico seguro.

*   `### {{Subtema_H3_1}}`
    *   [Puntos clave y cuidados]
*   `### {{Subtema_H3_2}}`
    *   [Puntos clave de medicación]
*   **Componente AlertBox:**
    ```mdx
    <AlertBox type="warning" title="Seguridad de Medicación">
      [Advertencias y precauciones con dosis y efectos secundarios]
    </AlertBox>
    ```

---

### [H2 - {{TITULO_DE_CALIDAD_DE_VIDA_4}}] — Target: ~800 palabras
*   *Sustentado en:* [Fuentes que respaldan]
*   *Objetivo:* Abordaje de calidad de vida y confort.

*   `### {{Subtema_H3_1}}`
    *   [Enfoque paliativo o soporte físico]
*   *Enlace de Conversión:* [Punto exacto para inyectar el enlace a la Calculadora/App]

---

### [H2 - {{TITULO_DE_CASO_REAL_Y_RESULTADOS_5}}] — Target: ~700 palabras
*   *Objetivo:* Cierre narrativo y emocional uniendo el desenlace de la historia real con la esperanza práctica.

*   [Detalles de la recuperación y vida diaria actual del perro de la historia]
*   [Mensaje de empoderamiento al tutor para tomar el control del bienestar de su compañero]

---

### CONCLUSIÓN Y PREGUNTAS FRECUENTES — Target: ~900 palabras
*   *Cierre:* Párrafo integrador de cierre.
*   **Componente FAQ:**
    ```mdx
    <FAQ items={[
      { question: '¿Pregunta 1?', answer: 'Respuesta' },
      { question: '¿Pregunta 2?', answer: 'Respuesta' },
      { question: '¿Pregunta 3?', answer: 'Respuesta' },
      { question: '¿Pregunta 4?', answer: 'Respuesta' },
      { question: '¿Pregunta 5?', answer: 'Respuesta' },
      { question: '¿Pregunta 6?', answer: 'Respuesta' },
      { question: '¿Pregunta 7?', answer: 'Respuesta' }
    ]} />
    ```

---

## 7. POTENCIAL DE AFILIADOS / CONVERSIÓN

*   **Puntos de inserción no intrusivos (Alineación Editorial):**
    *   [Detallar dónde colocar enlaces a productos recomendados sin romper el tono informativo]

---

## 8. GUÍA VISUAL — 3 PROMPTS DE IMAGEN

### Imagen 1 — [Tipo de Imagen (Educativa / Resolutiva / Emocional)]
*   **Nombre de archivo SEO:** `{{keyword-principal-descriptiva}}.jpg`
*   **Prompt visual:** [Tipo de plano | Escenario realista | Acción concreta | Sujeto principal | Contexto emocional | Iluminación natural cálida | Profundidad de campo muy estrecha (shallow DOF) | Detalle de texturas | Estilo fotoperiodismo tipo National Geographic, cero stock]
*   **Caption (Pie de foto):** [Máximo 2 líneas de texto que aporta valor e información adicional]

### Imagen 2 — [Tipo]
*   **Nombre de archivo SEO:** `{{nombre-archivo-2}}.jpg`
*   **Prompt visual:** [Detalles]
*   **Caption:** [Pie de foto]

### Imagen 3 — [Tipo]
*   **Nombre de archivo SEO:** `{{nombre-archivo-3}}.jpg`
*   **Prompt visual:** [Detalles]
*   **Caption:** [Pie de foto]

---

## 9. CHECKLIST DE VALIDACIÓN FINAL DEL REDACTOR
- [ ] ¿El frontmatter YAML es idéntico al configurado en la Sección 1?
- [ ] ¿Se importan correctamente AlertBox y FAQ al inicio del MDX?
- [ ] ¿El texto empieza directamente sin título H1 `#`?
- [ ] ¿Se incluyeron las 6 fuentes al inicio de la guía?
- [ ] ¿Se referencia la historia real en mínimo 3 H2 del cuerpo del texto?
- [ ] ¿Los enlaces internos usan rutas relativas válidas hacia artículos publicados?
- [ ] ¿Ningún párrafo supera las 3 líneas en pantallas móviles?
- [ ] ¿Los H3 están colocados cada 150-200 palabras?
- [ ] ¿Las imágenes tienen nombres SEO y prompts descriptivos sin estilo publicitario?
- [ ] ¿El recuento de palabras totales está entre 6.000 y 6.500 palabras respetando los targets?
