# Auditoría independiente del brief — iteración 2 de 3

Fecha: 2026-10-15. Documento: `briefings/briefing-limpieza-ojos-oidos-perros-ancianos.md`, versión correctora local. No se ha modificado el brief.

## Veredicto

**Válido con reservas**: permite iniciar la redacción porque corrige los errores clínicos del contrato y limita expresamente la fuente cuyo texto íntegro no se pudo verificar.

La reserva documental es concreta: **Moog, Fuente 4, continúa sin texto completo accesible de forma estable**. La auditoría íntegra de esa publicación queda incompleta; se verificaron identidad y resumen indexado en la iteración 1. El brief no la presenta como lectura completa y ahora solo encarga describir objeto/población y límites, sin resultados ni cifras. Esa restricción es compatible con avanzar; no autoriza al redactor a rellenar resultados desde memoria. Esta aprobación corresponde al brief, no al futuro artículo ni a su publicación.

## Hallazgos

### P0

Ninguno en la versión corregida. Los errores de grupos BAER y atribuciones Cornell detectados en la iteración 1 se corrigieron en estructura, FAQ y contrato. No se mantiene causalidad ni promesa de prevención auditiva.

### P1

Ninguno que impida redactar. Las siete fuentes tienen uso definido y tabla de trazabilidad. La referencia parcialmente accesible no se usa para afirmar eficacia, seguridad universal ni sustituir indicaciones clínicas.

### P2 — Reservas de producción no bloqueantes

1. **Sección 8, imagen 1, y `heroImageAlt` de Sección 1.** El prompt sigue pidiendo gasa estéril en el ángulo interno mientras H2-2 encarga un paño limpio y limita todo al contorno exterior. La gasa no es por sí misma un error clínico ni se prescribe ya como requisito universal; conviene alinear ilustración/alt con material limpio en piel periocular y dejar expresamente córnea libre de contacto. Revisar la imagen real antes de integrarla. Los recursos aún no existen: no aprobar calidad o seguridad visual solo por leer el prompt.

2. **Sección 6, H2-4, warning; Sección 9.** Se conserva suspensión ante sospecha de lesión timpánica pero ya no se explica por qué algunos productos pueden ser ototóxicos. Es una explicación útil de la precaución, comprobada en Merck en iteración 1; añadirla en redacción sin convertir signos inespecíficos en diagnóstico. La instrucción actual de no iniciar líquidos y consultar ante duda impide que esta omisión haga inseguro el contrato.

No se exige una tercera auditoría por estos ajustes menores. Si se introducen nuevas cifras, conclusiones clínicas o fuentes en lugar de respetar los límites actuales, habrá que revisarlos dentro del máximo de tres rondas.

## Verificación de fuentes

Se mantienen comprobaciones de la iteración 1 para las referencias sin cambios, y se abrieron las nuevas de forma independiente en esta ronda. No se repite una validación completa inexistente de Moog.

| Fuente actual | Identificador / documento | Resultado y trazabilidad |
|---|---|---|
| 1 Fefer et al. 2022 | [DOI 10.1111/jvim.16510](https://onlinelibrary.wiley.com/doi/10.1111/jvim.16510) | Texto completo abierto en iteración 1. Sección 2 y H2-3/5 ya distinguen grupo de 8 y 5 respuestas; diseño transversal, sin inferencia causal. Aprobado el uso limitado. |
| 2 Cornell, limpieza ótica | [How to Clean Your Dog’s Ears](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/how-clean-your-dogs-ears) | Abierta completa en esta ronda; autora Aly Cohen, actualización 2025-10-21. Sustenta técnica suave, sacudida, evitar boquilla a presión y bastoncillos, detenerse ante dolor, selección y frecuencia individual. H2-3/4 y apoyo5 coinciden. VIN fue retirado, no queda atribución activa a WSAVA. |
| 3 Merck, otitis | [Otitis Externa in Animals](https://www.merckvetmanual.com/ear-disorders/otitis-externa/otitis-externa-in-animals) | Texto completo verificado en iteración 1. H2-3/4 conserva toma de muestras previa y evaluación diagnóstica; desaparecen «destruye muestra» y calendario general. |
| 4 Moog et al.2022 | [PMC9031221](https://pmc.ncbi.nlm.nih.gov/articles/PMC9031221/), [PubMed35448682](https://pubmed.ncbi.nlm.nih.gov/35448682/), DOI10.3390/vetsci9040185 | Identidad/resumen contrastados en iteración 1; texto íntegro no comprobado. Marca honesta, instrucciones restringidas y uso H2-4. No se concede validación de resultados. |
| 5 Cornell, KCS | [Página específica](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/keratoconjunctivitis-sicca-kcs-dogs) | Abierta íntegra en iteración 1. H2-1 conserva causa/signos/diagnóstico, elimina infradiagnóstico, umbral15 y diagnóstico por recurrencia; H2-2 solo delimita enfermedad/higiene. |
| 6 Nascimento et al.2023 | [PubMed35544927](https://pubmed.ncbi.nlm.nih.gov/35544927/), DOI10.5935/0004-2749.20230057 | Resumen abierto/recuperado en iteración 1; PMC bloqueado. Comparación diagnóstica utilizada H2-1, sin puntos de corte nuevos ni autodiagnóstico. |
| 7 VCA / LifeLearn, KCS | [Keratoconjunctivitis Sicca (KCS) or Dry Eye in Dogs](https://vcahospitals.com/know-your-pet/keratoconjunctivitis-sicca-kcs-or-dry-eye-in-dogs) | Abierta completa en esta ronda. Autoría Courtney Barnes, Tammy Hunter y Ernest Ward; tratamiento describe limpieza suave con paño húmedo templado y asesoría profesional. H2-2 se limita a ese cuidado; no impone técnica estéril ni dirección única. Fuente clínica complementaria claramente distinguida de ensayo. |

## Efecto cascada

La corrección local no ha reparado otros documentos remotos ni autoriza hacerlo dentro de esta auditoría. Búsqueda GitHub `16510` comprobada independientemente en esta ronda en `Gunz-cop/CuidaTuPerroViejo` devuelve:

- `briefings/briefing-ceguera-sordera-perros-mayores-comunicacion.md`: mantiene la simplificación «8 a 90 dB».
- `briefings/briefing-agresividad-tardia-perros-mayores-dolor.md`: mantiene «8 necesitaban90 dB».
- `briefings/briefing-depresion-perros-ancianos.md`: usa la misma fuente y asociación; requiere revisión contextual, pero el fragmento recuperado no prueba el mismo error numérico.
- `src/content/blog/agresividad-tardia-perros-mayores-dolor.mdx` y copias en `docs/agent-readiness/evidencia/` usan la fuente. La sesión principal informa además de frase errónea de los ocho en el artículo y una captura HTML; registrar como revisión separada, sin reescribir evidencias históricas silenciosamente.

El brief remoto de limpieza aún conserva la versión vieja: solo la copia local auditada tiene esta aprobación. No hay artículo del slug según árbol remoto leído por sesión principal. Inventario `[~]` sigue correcto. No marcar publicado por esta aprobación.

## Lo que sí funciona

- Metadatos contados nuevamente con Python: `seoTitle`43, `metaDescription`136; cumplen55/160.
- Suma exacta **6.400**; contrato5.440–7.360 y tolerancia de ±15 % coherentes. No se midió extensión de artículo porque todavía no existe.
- `pilar` válido y campos admitidos por schema local `src/content.config.ts`; `AlertBox` admite info/danger/warning y `FAQ` admite las7 preguntas previstas. No se ejecuta build para auditar un archivo de planificación sin cambios de código.
- Cinco H2 con fuente explícita, cierre independiente en H2-5 y arco en tres momentos sobre cohorte trazable, sin experiencia ficticia.
- Enlaces de Sección5 corresponden a contenido publicado en inventario; segundo spoke fecal confirmado además mediante GitHub `fetch_file`: frontmatter publicado, pilar correcto, fecha2026-08-16. Artículo sensorial queda futuro. Baño/callosidades no se cuentan como publicados solo por existir archivo.
- Introducción y captions ya no normalizan limpieza diaria ni prometen descubrir casi todos los problemas. Secciones7/8 eliminan tijeras perioculares, primacía racial y calendarios universales.
- Tres prompts mantienen sujeto ilustrativo senior, extensiónwebp, entorno/plano/luz/profundidad; no atribuyen cocker a participantes reales.
- AlertBox son instrucciones y FAQ son borradores estructurados, permitidos. Fecha editorial se actualizará al guardar artículo.

## Qué corregir, en orden

1. **Durante redacción:** mantener literalmente los límites de interpretación y acceso documentados; Moog solo como investigación sobre producto/población específicos, sin resultados no comprobados.
2. Alinear hero/alt con cuidado exterior y explicar brevemente el riesgo de producto ante tímpano lesionado. Son ajustes de producción, no nueva ronda obligatoria del brief.
3. Medir distribución real por sección, componentes, fuentes y enlaces al auditar el artículo; no confundir aprobación del encargo con aprobación del resultado.
4. Registrar revisión separada de cascada Fefer. No modificar otros artículos, briefs ni evidencias en esta auditoría.

**Contador:** dos auditorías realizadas de máximo tres. La segunda permite pasar a redacción con las reservas expresas anteriores.
