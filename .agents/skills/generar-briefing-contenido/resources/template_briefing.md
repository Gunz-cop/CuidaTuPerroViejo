# Brief: {{TITULO}}

Contrato editorial: 2.0
Unidad de cambio: {{ID}} · Autor: {{AUTOR}} · Fecha: {{FECHA}} · Versión/hash: {{VERSION}}
Tipo: {{NUEVO_O_REVISION}} · Estado: {{PLANIFICADO_VALIDADO_ETC}}

## 1. DATOS, INTENCIÓN Y METADATOS

- Pregunta/situación observable, público y país: {{CONTEXTO}}.
- Decisión principal y respuesta inicial que debe encontrar: {{INSTRUCCIONES_NO_PROSA_FINAL}}.
- Consulta/demanda: {{FUENTE_FECHA_O_HIPOTESIS_SIN_DATOS}}.
- Diferencia con URLs y briefs próximos: {{COMPROBACION_Y_ALCANCE}}.
- Título/SEO ≤55/descripción ≤160/keyword/slug/pilar/ruta: {{VALORES_CONTADOS}}.
- Revisión: URL, fecha original, versión previa y qué conservar: {{DATOS_O_NO_APLICA}}.

Frontmatter solo con campos del schema vigente. Fecha nueva al guardar; en revisión conservar publicación y registrar modificación. La cabecera del contrato no se copia al YAML de Astro. `status` no protege de publicación.

### Frontmatter a entregar al redactor

Completar valores reales y validar contra `src/content.config.ts`; no copiar marcadores a producción. Conservar la fecha original en una revisión y añadir `dateModified` solo cuando corresponda. `perros` y `legacyUrl` solo con su procedencia real; ningún campo del contrato editorial se añade al YAML.

```yaml
---
title: "{{TITULO}}"
seoTitle: "{{SEO_MAX_55}}"
metaDescription: "{{DESCRIPCION_MAX_160}}"
pilar: "{{ENUM_VALIDO}}"
keywordPrincipal: "{{KEYWORD}}"
heroImage: "/images/blog/{{SLUG}}/{{HERO}}.webp"
heroImageAlt: "{{ALT_FIEL}}"
datePublished: "{{FECHA_REAL_O_ORIGINAL}}"
---
```

## 2. PROCEDENCIA Y VALOR PROPIO

Tipo: {{EXPERIENCIA_APORTADA_CASO_PUBLICADO_VINETA_DECLARADA_GUIA_SIN_CASO}}.
Fuente del material, hechos conocidos, límites y declaración al lector: {{DATOS}}.
Aportación práctica y tarea que el lector podrá completar: {{APORTACION}}.
Historia, si existe: momentos por H2 y cierre integrado; sin H2 narrativo aparte.

## 3. FUENTES Y AFIRMACIONES

Repetir ficha solo para fuentes pertinentes, sin cuota:

1. **Fuente 1 (Estudio/Directriz):** *{{TITULO_REAL}}* `{{URL_PROFUNDA_VERIFICADA}}`
   - Autor/institución, año, identificador confirmado, fecha de comprobación: {{DATOS}}.
   - Afirmación respaldada y apartado/tabla/pasaje: {{DATOS}}.
   - Tipo y calidad de evidencia (guía, estudio revisado por pares, secundaria clínica identificada), población, aplicación, límites, vigencia y estado verificada/parcial: {{DATOS}}.
   - H2 asignado y uso concreto: {{DATOS}}.

Si falta verificación, marcarla internamente y restringir el uso a lo comprobado. Una afirmación central sin respaldo impide validar el brief.

## 4. TÉCNICA Y LEGIBILIDAD

Schema estricto y componentes Astro reales. Sin H1, hero repetida, TOC, JSON-LD o tarjetas manuales del layout. Párrafos legibles a 390 px; subtítulos por preguntas distintas. Verificar densidad y tono, sin cortar frases ni añadir H3 decorativos para cumplir cuotas.

## 5. ENLACES Y SIGUIENTE PASO

| Tipo | Texto ancla | URL | Estado y motivo/ubicación |
| --- | --- | --- | --- |
| Pilar | {{TITULO}} | `{{RUTA_PUBLICADA}}` | {{COMPROBACION}} |

Añadir solo destinos publicados pertinentes (Spoke 1, Puente, Herramienta o Calculadora). Para cada uno: qué resuelve y dónde. Si aún no existe, marcar pendiente sin URL enlazable. No hay cuota de dos spokes ni herramienta universal.

## 6. SECCIONES Y PRESUPUESTO

Total target: {{N}} palabras; intervalo justificado en sección 9. Añadir tantos H2 como preguntas diferentes haya, en el orden de lectura necesario. No copiar todos los tipos del ejemplo a cualquier tema.

### INTRODUCCIÓN — Target: ~{{N}} palabras

- Pregunta, respuesta inicial, acción y orientación para consultar si procede: {{INSTRUCCIONES}}.
- Contexto/documentación narrativa: {{DATO_O_GUIA_SIN_CASO}}.

### [H2 - {{PREGUNTA_O_DECISION}}] — Target: ~{{N}} palabras

- Pregunta y respuesta distinta: {{INSTRUCCIONES}}.
- *Sustentado en:* {{FUENTES_Y_AFIRMACIONES}}.
- H3 si aportan navegación; acción, explicación necesaria y límites: {{INSTRUCCIONES}}.
- Momento documentado/recurso/enlace/aviso: {{DETALLE_O_NO_APLICA_CON_MOTIVO}}.

### CIERRE — Target: ~{{N}} palabras

Última decisión útil, cierre documentado si existe, bibliografía final y FAQ si se pactó. No repetir todo el artículo. La posición/denominación del cierre se declara para comparar secciones con el artículo final.

## 7. RECOMENDACIONES Y AFILIACIÓN

{{NO_APLICA_O_ALCANCE}}. Explicar necesidad y alternativas antes de recomendar un producto; evidencia específica y aviso comercial según la guía de afiliación. Sin promesa de eficacia por experiencia aislada.

## 8. PLAN VISUAL

Cantidad justificada; hero y cada imagen/variante/recurso se contabilizan. Por pieza: tarea, sección, fuente, composición, ruta, alt, sujeto/referencia, escena, materiales, luz, geometría, aceptación móvil/oscuro/accesibilidad y responsable. Si hay perro, cada prompt/recorte incluye los cinco rasgos senior y rechazo de adulto joven, continuidad y revisión de razas recientes; conservar excepciones documentadas. Sin dibujos propios SVG/CSS. Declarar lo que no aporta y se omite.

## 9. CONTRATO DE ENTREGA

intervalo {{MIN}}–{{MAX}} palabras

Targets por sección y rango coherentes; ±15% por target salvo adenda justificada antes de aprobar. Ni sobrepasar contrato ni rellenar para alcanzarlo. La bibliografía final es independiente de cajas de cuerpo.

Componentes de cuerpo: info={{N}}; danger={{N}}; warning={{N}}

Reemplazar todos los N por enteros reales. Tabla por caja: tipo, cantidad, función, sección, fuente y prueba. Los ceros llevan motivo; riesgos pertinentes no se omiten. Cuadro final de fuentes presente; no se suma aquí.

FAQ: {{N}} preguntas. Si N=0, justificarlo; si N>0, planificar los items estructurados `<FAQ items={[...]} />` con preguntas específicas y respuestas borrador comprobables.

| # | Fuente | H2 asignado | ¿Citada? |
| --- | --- | --- | --- |
| 1 | {{AUTOR_TITULO}} | {{H2}} | ☐ |

| Requisito | Ubicación y entrega esperada | Evidencia de aceptación |
| --- | --- | --- |
| E01 | {{PREGUNTA_RESPUESTA}} | {{PRUEBA}} |
| E02 | {{RECORRIDO_ACCION}} | {{PRUEBA}} |
| E03 | {{APORTACION_POR_SECCION}} | {{PRUEBA}} |
| E04 | {{OBSERVACION_LIMITES}} | {{PRUEBA}} |
| E05 | {{RECURSO_O_OMISION_JUSTIFICADA}} | {{PRUEBA}} |
| E06 | {{SIGUIENTE_PASO}} | {{PRUEBA}} |
| E07 | {{PROCEDENCIA_Y_VOZ}} | {{PRUEBA}} |
| E08 | {{VERSION_Y_ALCANCE}} | {{PRUEBA}} |

## 10. COMPROBACIÓN Y AUDITORÍAS

Metadatos contados, rutas/schema/inventario, sumas de targets, cada fuente comprobada, E01–E08 y recursos viables. Brief planifica: no declarar pruebas futuras como ejecutadas. Registrar unidad, alcance, autor, auditor independiente, snapshot y R1–R5. Si aprueba se termina; si falla R5 se detiene. Las correcciones mantienen contador. No son cinco rondas obligatorias después de aprobar.

## 11. RECURSOS Y GATE DE PUBLICACIÓN

| Recurso/tarea | Ubicación | Ruta | Estado/responsable | Prueba antes de publicar |
| --- | --- | --- | --- | --- |
| {{RECURSO_O_NO_APLICA}} | {{SECCION}} | {{RUTA_O_PENDIENTE}} | {{DATOS}} | {{PRUEBA_REAL}} |

Fuente central verificada, procedencia clara y cada recurso operativo o promesa retirada. No publicar instrucciones internas ni marcadores. El artículo incompleto no se coloca en `src/content/blog/` por confiar en status Borrador. Marcar Publicado en inventario únicamente tras comprobar la URL pública.
