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
| **Objetivo Global** | {{TARGET_JUSTIFICADO}} palabras; alcance según utilidad, no requisito de AdSense |
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

## 2. PROCEDENCIA DEL MATERIAL Y VALOR PROPIO

**Tipo:** {{EXPERIENCIA_APORTADA / CASO_PUBLICADO / VINETA_DECLARADA / GUIA_SIN_CASO}}
**Procedencia:** {{AUTOR_O_FUENTE_Y_LOCALIZACION; DATOS_CONOCIDOS_Y_LIMITES}}
**Declaración para el lector:** {{COMO_SE_IDENTIFICARA_EL_TIPO_DE_MATERIAL}}
**Pregunta del lector y respuesta práctica:** {{DECISIONES_QUE_RESOLVERA}}
**Aportación propia:** {{REGISTRO_COMPARATIVA_SINTESIS_CRITICA_O_ADAPTACION; DIFERENCIA_CON_OTROS_ARTICULOS}}

Si se usa arco narrativo, planificar apertura, desarrollo y cierre solo con hechos documentados. Si no hay desenlace conocido, cerrar con límites. Una guía sin caso no requiere paciente ni recuperación inventados.

---

## 3. FUENTES CIENTÍFICAS DE AUTORIDAD (SOURCE-FIRST)

> [!IMPORTANT]
> A continuación se detallan las **fuentes suficientes y pertinentes** científicas o veterinarias. Toda la base médica, datos fisiopatológicos y recomendaciones de seguridad de este artículo se originan directamente de este listado.
> Cada enlace debe apuntar al documento/estudio específico citado, no a la homepage genérica de la institución. Si no puedes verificar la URL exacta, no la inventes: escribe el nombre completo del estudio/institución y marca `[URL no verificada — confirmar antes de publicar]`. Documenta la cobertura y los límites; no rellenes una cuota con enlaces débiles.

1.  **Fuente 1 (Estudio/Directriz):** [Nombre del estudio/entidad y URL profunda en texto plano, o `[URL no verificada]` si no se pudo confirmar]
    *   *Dato clave:* [Mecanismo fisiológico, estadísticas o pauta médica extraída]
2.  **Fuente 2 (Estudio/Directriz):** [Detalles]
3.  **Fuente 3 (Estudio/Directriz):** [Detalles]
4.  **Fuente 4 (Estudio/Directriz):** [Detalles]
5.  **Fuente 5 (Estudio/Directriz):** [Detalles]
6.  **Fuente 6 (Estudio/Directriz):** [Detalles]

---

Para cada fuente: título, autor/institución, año, PMID/DOI/URL comprobados, fecha, afirmación respaldada, apartado/tabla/pasaje, H2 asignado y límites. Añadir/eliminar filas según necesidad.

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

> [!NOTE]
> Si el pilar es nuevo o el inventario tiene menos de 2 artículos publicados en esta sección, no inventes filas: sustituye la fila del spoke faltante por `Pendiente — aún no hay artículo publicado en este pilar` y deja solo el pilar y/o la calculadora como enlaces reales.

---

## 6. ESTRUCTURA DETALLADA Y PRESUPUESTO DE PALABRAS

> **Target total: {{TARGET_TOTAL}} palabras, justificado por la cobertura necesaria.**
> El redactor debe respetar el presupuesto asignado por sección con una desviación máxima de ±15%.

### INTRODUCCIÓN — Target: ~{{TARGET_SECCION}} palabras

**Objetivo:** Conectar emocionalmente con la lectora preocupada usando el gancho E-E-A-T.

*   **Párrafo 1 — Respuesta y contexto:** [Contestar la necesidad o introducir material atribuido sin dramatización innecesaria]
*   **Párrafo 2 — Diagnóstico latente e incertidumbre:** [Explicar la conexión del caso con el problema general]
*   **Párrafo 3 — La promesa del artículo:** [Describir lo que aprenderá en la guía]
*   **Componente AlertBox:**
    ```mdx
    <AlertBox type="info" title="Nota de Acompañamiento">
      [Texto de soporte y validación para el tutor]
    </AlertBox>
    ```

---

### [H2 - {{TITULO_DEL_TEMA_FISIOLOGICO_1}}] — Target: ~{{TARGET_SECCION}} palabras
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

### [H2 - {{TITULO_DE_SINTOMAS_Y_DIAGNOSTICO_2}}] — Target: ~{{TARGET_SECCION}} palabras
*   *Sustentado en:* [Fuentes que respaldan]
*   *Objetivo:* Enseñar al tutor a identificar los síntomas clínicos y de comportamiento en casa.

*   `### {{Subtema_H3_1}}`
    *   [Puntos clave y síntomas a observar]
*   `### {{Subtema_H3_2}}`
    *   [Puntos clave, pruebas o tests caseros]
*   **Lista / Checklist:** [Detallar el checklist con formato markdown standard]

---

### [H2 - {{TITULO_DE_TRATAMIENTOS_Y_CUIDADOS_3}}] — Target: ~{{TARGET_SECCION}} palabras
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

### [H2 - {{TITULO_DE_CALIDAD_DE_VIDA_4}}] — Target: ~{{TARGET_SECCION}} palabras
*   *Sustentado en:* [Fuentes que respaldan]
*   *Objetivo:* Abordaje de calidad de vida y confort.

*   `### {{Subtema_H3_1}}`
    *   [Enfoque paliativo o soporte físico]
*   *Enlace de Conversión:* [Punto exacto para inyectar el enlace a la Calculadora/App]

---

### [H2 - {{TITULO_DE_CASO_REAL_Y_RESULTADOS_5}}] — Target: ~{{TARGET_SECCION}} palabras
> [!IMPORTANT]
> **Solo si el material y su utilidad lo justifican.** Retomar lo documentado sin fabricar recuperación. Si se omite, ajustar estructura y presupuesto explícitamente.

*   *Objetivo:* Cierre narrativo y emocional uniendo el desenlace de la historia real con la esperanza práctica.

*   [Desenlace documentado o límites de lo conocido, sin fabricar recuperación]
*   [Mensaje de empoderamiento al tutor para tomar el control del bienestar de su compañero]

---

### CONCLUSIÓN Y PREGUNTAS FRECUENTES — Target: ~{{TARGET_SECCION}} palabras
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

Aplicar [dirección visual editorial](../../references/direccion-visual-editorial.md). Completar para **cada imagen**, antes de escribir el prompt:

| Decisión | Contenido específico de esta escena |
|---|---|
| Función y sección | {{Qué enseña y dónde se inserta}} |
| Público, contexto y entorno | {{Espacio plausible; sin país/vivienda estadounidense por defecto}} |
| Materiales y detalles visibles | {{3–5 detalles pertinentes; sin acumulación decorativa}} |
| Sujeto y referencia | {{Identidad y archivo de referencia que se inspeccionará}} |
| Edad visible (los 5 rasgos) | {{Canas en hocico, cejas y párpados; ojos algo hundidos; lomo y musculatura de perro mayor; postura natural; sin enfermedad inventada — con detalle propio del sujeto}} |
| Acción y relaciones espaciales | {{Posición, orientación, dirección de marcha, manos, contacto de herramientas y correa}} |
| Cámara, luz y texturas | {{Plano, márgenes, fuente/dirección de luz, sombras y profundidad de campo apropiada}} |
| Exclusiones y aceptación | {{Errores concretos que se rechazan y comprobaciones a tamaño grande/móvil, incluida «parece senior a 390 px: sí/no por rasgo»}} |

Los tres prompts deben poder generar escenas detalladas y naturales con la calidad de casa/enfriamiento de golpe de calor. No trasladar automáticamente su país, raza, decoración o luz a otros temas. Si la persona pasea con el perro, definir una dirección de avance compartida y físicamente coherente. Las palabras «hermosa», «cinematográfica» o «no genérica» no sustituyen esta ficha.

> [!IMPORTANT]
> **Perro senior explícito:** cada prompt (imagen, recorte transparente y animación) incluye el bloque de **edad visible** de la ficha, con los cinco rasgos del [requisito senior verificable](../../references/direccion-visual-editorial.md#requisito-senior-verificable-obligatorio-en-todo-prompt), y termina con «Rechazar si a tamaño móvil parece un adulto joven». «Senior» suelto o solo «hocico canoso» no vale.
>
> **Razas ya usadas en artículos recientes:** {{LISTA_DE_RAZAS_RECIENTES_Y_DONDE_SE_COMPROBÓ}}. **Raza elegida y motivo:** {{RAZA_ELEGIDA_Y_POR_QUÉ_ES_CREÍBLE_PARA_EL_PÚBLICO; SI_REPITE_UNA_RECIENTE, MOTIVO_DOCUMENTADO}}.

> [!IMPORTANT]
> **Sujeto/raza fija en los 3 prompts:** `{{RAZA_Y_RASGOS_DEL_SUJETO_VISUAL; DECLARAR_SI_ES_ILUSTRATIVO}}` (ej. "Beagle senior, pelaje tricolor, complexión robusta") debe aparecer nombrado explícitamente en el prompt de **cada una** de las 3 imágenes — nunca sustituido por "a dog" o "a senior dog" genérico en ninguna. Si la historia tiene más de un perro, indica en cada prompt cuál protagoniza esa imagen específica.

### Recortes transparentes y animaciones que necesitan al perro
*   {{Si no hay ninguno: «No aplica — ningún apoyo requiere al perro». Si hay: por cada recorte, pose/orientación, para qué animación, y su prompt completo con fondo transparente, cuerpo completo y el bloque de edad visible íntegro.}}

### Imagen 1 — [Tipo de Imagen (Educativa / Resolutiva / Emocional)]
*   **Nombre de archivo SEO:** `{{keyword-principal-descriptiva}}.jpg`
*   **Prompt visual:** [Tipo de plano | Escenario realista y concreto (no genérico) | Acción específica | **`{{RAZA_Y_RASGOS_DEL_SUJETO_VISUAL; DECLARAR_SI_ES_ILUSTRATIVO}}`** | Contexto emocional/narrativo ligado a la historia real | Iluminación natural cálida | Profundidad de campo estrecha (shallow DOF) | Detalle de texturas (pelaje, piel, entorno) | Estilo fotoperiodístico/cinematográfico, cero apariencia de banco de imágenes]
*   **Caption (Pie de foto):** [Máximo 2 líneas de texto que aporta valor e información adicional]

### Imagen 2 — [Tipo]
*   **Nombre de archivo SEO:** `{{nombre-archivo-2}}.jpg`
*   **Prompt visual:** [Mismo nivel de detalle que Imagen 1, con **`{{RAZA_Y_RASGOS_DEL_SUJETO_VISUAL; DECLARAR_SI_ES_ILUSTRATIVO}}`** nombrada explícitamente de nuevo — no la des por sobreentendida]
*   **Caption:** [Pie de foto]

### Imagen 3 — [Tipo]
*   **Nombre de archivo SEO:** `{{nombre-archivo-3}}.jpg`
*   **Prompt visual:** [Mismo nivel de detalle, con **`{{RAZA_Y_RASGOS_DEL_SUJETO_VISUAL; DECLARAR_SI_ES_ILUSTRATIVO}}`** nombrada explícitamente una tercera vez]
*   **Caption:** [Pie de foto]

---

## 9. CONTRATO DE ENTREGA — NO NEGOCIABLES

> [!IMPORTANT]
> Esta sección es el contrato mínimo entre el brief y el artículo final. El artículo `.mdx` **no se considera terminado** si incumple cualquiera de estos puntos, sin importar que el texto "se lea bien" o "suene completo". Sirve como checklist de auditoría independiente del brief — para el redactor humano y para la futura skill de redacción automatizada.

**1. Volumen mínimo real (no estimado):**
El artículo final debe medir entre **{{PALABRAS_MIN}} y {{PALABRAS_MAX}} palabras** (tolerancia ±15% sobre el target de la Sección 6), contadas sobre el cuerpo `.mdx` real, no sobre la suma de targets del brief. Si el conteo no cumple el contrato, revisar omisiones útiles o proponer un ajuste justificado; no aprobar el incumplimiento ni añadir relleno.

**2. Fuentes que deben aparecer citadas por nombre en el cuerpo, no solo en el brief:**
Cada una de las fuentes listadas en la Sección 3 debe aparecer **mencionada por su nombre** (autor/institución) en el H2/H3 al que fue asignada en la Sección 6. Lista de control:
| # | Fuente | H2 asignado | ¿Citada en el artículo final? |
|---|---|---|---|
| 1 | {{NOMBRE_FUENTE_1}} | {{H2_ASIGNADO_1}} | ☐ |
| 2 | {{NOMBRE_FUENTE_2}} | {{H2_ASIGNADO_2}} | ☐ |
| 3 | {{NOMBRE_FUENTE_3}} | {{H2_ASIGNADO_3}} | ☐ |
| 4 | {{NOMBRE_FUENTE_4}} | {{H2_ASIGNADO_4}} | ☐ |
| 5 | {{NOMBRE_FUENTE_5}} | {{H2_ASIGNADO_5}} | ☐ |
| 6 | {{NOMBRE_FUENTE_6}} | {{H2_ASIGNADO_6}} | ☐ |
Si una fuente termina sin citar en el artículo final, el H2 correspondiente se considera sin sustento científico y debe corregirse antes de publicar.

**3. Componentes estructurales obligatorios (checklist de conteo exacto):**
- [ ] 3 `AlertBox` presentes, uno de cada tipo (`info`, `danger`, `warning`) — no menos, no repetidos del mismo tipo.
- [ ] 1 `FAQ` con las {{N}} preguntas definidas en la Sección 6.
- [ ] El enlace a la calculadora de calidad de vida presente, si el pilar es Salud o Cuidados Paliativos (ver Sección 5).
- [ ] Los enlaces internos de la Sección 5 (pilar + spokes) presentes tal como se definieron.

**4. Arco documentado, solo si se justificó en el contrato (si no, marcar guía sin caso):**
- [ ] Apertura del caso real en la Introducción.
- [ ] Desarrollo del caso real en el H2 intermedio asignado.
- [ ] **Cierre del caso real en el último H2 antes de Conclusión/FAQ** — este es el punto que más se ha saltado en entregas anteriores; verificar explícitamente que existe como sección propia, no como una frase suelta en la conclusión.

---

## 10. CHECKLIST DE VALIDACIÓN FINAL DEL REDACTOR

**A validar en este briefing (antes de pasar a redacción):**
- [ ] ¿El frontmatter YAML es idéntico al configurado en la Sección 1 y el `pilar` es un enum válido de `config.ts`?
- [ ] ¿El `seoTitle` mide ≤55 caracteres y la `metaDescription` ≤160 caracteres (contados, no estimados)?
- [ ] ¿Se incluyeron todas las fuentes al inicio, cada una con URL profunda verificable (o marcada `[URL no verificada]`)?
- [ ] ¿Los enlaces internos usan rutas reales hacia artículos publicados en el inventario, o están marcados como "Pendiente" si no existen aún?
- [ ] ¿La keyword/slug no canibaliza un artículo ya existente?
- [ ] ¿La suma de los targets de palabras por sección está dentro del rango justificado del contrato?
- [ ] ¿Se completó la tabla de trazabilidad de fuentes de la Sección 9 (todas las fuentes tienen H2 asignado)?

**A validar en el artículo `.mdx` final contra el Contrato de Entrega (Sección 9):**
- [ ] ¿Se importan correctamente AlertBox y FAQ al inicio del MDX?
- [ ] ¿El texto empieza directamente sin título H1 `#`?
- [ ] ¿La procedencia narrativa está declarada y se cumple el arco justificado, o la guía sin caso?
- [ ] ¿Ningún párrafo supera las 3 líneas en pantallas móviles?
- [ ] ¿Los H3 están colocados cada 150-200 palabras?
- [ ] ¿Las imágenes tienen nombres SEO y prompts descriptivos sin estilo publicitario?
- [ ] ¿Todo prompt de imagen, recorte y animación incluye los cinco rasgos de edad y la línea de rechazo a tamaño móvil? ¿Se declararon las razas recientes y se eligió otra (o se justificó la repetición)?
- [ ] ¿El recuento de palabras real del artículo está dentro del rango justificado del contrato (contado sobre el `.mdx`, no estimado)?
- [ ] ¿Todas las fuentes de la tabla de trazabilidad quedaron efectivamente citadas por nombre en el artículo?
- [ ] ¿Los 3 `AlertBox`, el `FAQ` completo y el enlace a la calculadora (si aplica) están presentes en el `.mdx` publicado?

## 11. RECURSOS PROMETIDOS Y GATE EDITORIAL

| Recurso y utilidad | Ubicación | Ruta/destino | Estado y responsable | Prueba previa a publicación |
|---|---|---|---|---|
| {{PDF_VIDEO_PLANTILLA_HERRAMIENTA_O_NO_APLICA}} | {{SECCION}} | {{RUTA_REAL_O_PENDIENTE}} | {{PLANIFICADO_CREADO_VERIFICADO}} | {{ABRIR_REPRODUCIR_COMPLETAR_RECORRIDO}} |

- [ ] Extensión y cada H2 justificados por una respuesta distinta, sin relleno.
- [ ] Registro fuente→afirmación→localización completo; afirmaciones clave verificadas.
- [ ] Procedencia narrativa e imágenes ilustrativas declaradas; sin credenciales ni resultados inventados.
- [ ] Coherencia con política editorial; sin pauta farmacológica para el lector ni recetas universales sin respaldo.
- [ ] Cada recurso prometido quedará operativo o se retirará su promesa antes de publicar; no basta con compilar.
- [ ] Historial de auditoría numerado, máximo tres rondas; detener si falla la tercera.
