# RISKS — Registro de riesgos del asistente IA (arquitectura recomendada)

Escala: probabilidad y impacto Bajo/Medio/Alto.

## Veterinarios y de seguridad

| Riesgo | Prob. | Impacto | Mitigación | Señales de alerta |
|---|---|---|---|---|
| Emergencia real no detectada por el gate (variante léxica nueva) | Media | **Alto** | Gate doble (reglas + prototipos semánticos); recall ≥0,98 en dataset; toda respuesta incluye criterios de urgencia y "cuándo acudir al veterinario"; revisión trimestral de prototipos | Casos con confidence baja + tags de riesgo en telemetría; feedback negativo opt-in |
| El LLM emite consejo inseguro que elude la lista negra (fármaco no listado, eufemismo) | Media | **Alto** | Grounding editorial cerrado; validador con lista mantenida; bake-off con 0 tolerancia; plantillas deterministas como techo de seguridad; muestreo humano mensual | Nueva clase de fallo en muestreo; validación fallando por razones no catalogadas |
| Artículo incorrecto mostrado con autoridad (falso positivo) | Media | Medio-Alto | Documentos de intención sin síntomas secundarios; listas de exclusión; margen top1–top2; zona gris → sin artículo | Caída de precision en CI; desacuerdos v1/v2 en shadow |
| Usuario interpreta la orientación como diagnóstico | Media | Medio | Disclaimer permanente en UI; el validador exige mención del veterinario cuando corresponde | Feedback de usuarios; quejas |

## Técnicos

| Riesgo | Prob. | Impacto | Mitigación | Señales |
|---|---|---|---|---|
| Workers AI cambia/retira un modelo (deprecación) | Media | Medio | Índice regenerable con otro embedding (re-build); generación con fallback de familia distinta vía AI Gateway; ADR-004 define el proceso de recambio (re-bake-off reducido) | Avisos de deprecación de Cloudflare; errores 4xx del modelo |
| Deriva de embeddings (misma entrada, distinto vector tras actualización del proveedor) | Baja | Alto (rompe determinismo y umbrales) | Test canario en CI: embeddings de 5 frases fijas comparados contra los guardados; si cambian → re-build del índice completo y recalibración | Fallo del test canario; caída súbita de accuracy |
| Latencia p95 fuera de objetivo | Media | Medio | Presupuestos por fase; rerank solo en zona gris; caché KV; timeout + plantilla | p95 >4 s en analytics |
| Bug en la fusión/umbrales que degrada silenciosamente | Baja | Medio | Suite de decisión en CI en cada build; repeatability = 1,00 obligatoria | Regresión en CI |

## Privacidad

| Riesgo | Prob. | Impacto | Mitigación | Señales |
|---|---|---|---|---|
| Consulta con PII acaba en logs (mensaje de error del proveedor, log accidental) | Media | Medio-Alto | Logs solo con hashes/códigos; `logError` saneado; retención mínima o logging off en AI Gateway para esta ruta; revisión de código en cada cambio de logging | Auditoría periódica de logs; grep de patrones de nombre |
| Claves de caché o valores exponen consultas | Baja | Medio | Clave = SHA-256 de consulta normalizada; valor sin la consulta | Revisión del esquema KV |
| Reutilización del dataset con consultas reales | Baja | Medio | Regla: los casos se re-redactan editorialmente, nunca se copian | Revisión del dataset |

## Coste

| Riesgo | Prob. | Impacto | Mitigación | Señales |
|---|---|---|---|---|
| Abuso/bots disparan coste de generación | Media | Medio | Rate limiting (AI Gateway o Worker por IP), caché KV, límite de 500 chars, Turnstile como opción si escala | Picos en analytics; ratio consultas/páginas vistas anómalo |
| Coste de generación crece con tráfico legítimo | Baja | Bajo | ~$0,0005/consulta estimado; caché de repetidas; free tier 10k neurons/día cubre tráfico actual | Facturación mensual |

## Dependencia de proveedor

| Riesgo | Prob. | Impacto | Mitigación | Señales |
|---|---|---|---|---|
| Lock-in Cloudflare (Workers AI, KV, Gateway) | Alta (asumida) | Bajo-Medio | El sitio ya vive en Cloudflare; contratos internos (`retrieve/decide/generate`) aíslan proveedores; el índice estático es portable; AI Gateway permite BYO-provider como fallback | Cambios de precios/términos |
| Caída total de Workers AI | Baja | Medio | Camino 100 % determinista sin IA (triage reglas + lexical local + plantillas) → siempre 200 | Alertas de error rate |

## Calidad editorial

| Riesgo | Prob. | Impacto | Mitigación | Señales |
|---|---|---|---|---|
| Documento de intención mal redactado desvía el routing | Media | Medio | Gate de CI con dataset; ≥3 casos nuevos por artículo; revisión editorial separada del implementador (principio AGENTS.md) | Caída de accuracy al publicar |
| Temas externos desactualizados frente a la evidencia veterinaria | Media | Medio | Cada topic cita sus fuentes con fecha; revisión anual programada | Fechas de revisión vencidas |
| Artículo nuevo sin documento de intención | Alta al principio | Medio | El build falla si un `.mdx` publicado no tiene intent (validación del script de índice) | Error de build |

## Operación y crecimiento del catálogo

| Riesgo | Prob. | Impacto | Mitigación | Señales |
|---|---|---|---|---|
| El equipo (una persona) no mantiene dataset/umbrales | Media | Medio | Automatizar todo en CI; calibración solo cuando cambia el índice; documentación en este directorio | STATUS.md sin actualizar; suites desactivadas |
| Catálogo crece >200–500 docs y el índice estático se queda corto | Baja (años) | Bajo | Interfaz `retrieve` abstraída; ADR-001 define el disparador de migración a Vectorize | Tamaño del artefacto; latencia de build |
| Umbrales sobreajustados al dataset (overfitting) | Media | Medio | Split calibración/validación; los casos trampa se renuevan; shadow mode antes de cada recalibración mayor | Buen CI pero malos desacuerdos en shadow |
