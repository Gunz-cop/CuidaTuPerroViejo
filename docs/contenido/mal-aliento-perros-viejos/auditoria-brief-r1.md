# Auditoría independiente del brief — ronda 1 de 3

- Fecha: 2026-10-22.
- Revisor: agente `/root/auditor_brief`, distinto del autor `/root/autor_brief`. El revisor no creó ni corrigió el brief.
- Documento: `briefings/briefing-mal-aliento-perros-viejos.md`.
- SHA-256 comprobado: `1e341cafd22815a226cec888d5e75212cffe3f5535cc82071581ebba69bef982`.
- Alcance: contrato de investigación, estructura, diferenciación, metadatos, enlaces y recursos planificados; no aprobación de un artículo ni de recursos producidos.
- Normas: AGENTS.md, plan del PR #122, skills vigentes de generar/auditar briefing y referencias, calidad editorial, voz y tono, visuales/responsive y enlazado.

## Veredicto

**NO APTO — No válido para redacción:** queda una definición clínica encargada sin fuente asignada que la respalde en el contrato.

El defecto es acotado y no obliga a rehacer el enfoque, las doce fuentes ni el plan visual. Esta es la primera ronda, no se ha reiniciado ningún contador.

## Hallazgos

### P0

Ninguno confirmado. Las doce URL corresponden a las fuentes declaradas y las afirmaciones principales se verificaron en su contenido, no solo en resultados del buscador.

### P1 — Cobertura incompleta de una instrucción clínica secundaria

**Ubicación:** §6, H2 4, H3 «Regurgitación, vómitos y cambios digestivos», línea 278 del documento auditado.

El brief manda explicar la diferencia entre retorno de alimento sin esfuerzo y vómito con arcadas. Las fuentes asignadas al H2 son F1, F7 y F8: UC Davis enumera esófago/estómago como posibles orígenes; PDSA renal enumera vómitos; Merck páncreas trata diabetes. Ninguna de esas páginas define esa diferencia. La distinción es correcta, pero su procedencia queda fuera de la tabla fuente→H2 y se trasladaría a una explicación médica sin cita prevista.

**Corrección para el autor, a elegir según utilidad:** retirar la definición y dejar solo la instrucción de comunicar al veterinario lo que ocurre; o añadir y verificar una fuente específica, con localización, límites y H2 4 en §3/§6/§9. El revisor abrió como posible respaldo [Merck, «Vomiting in Dogs»](https://www.merckvetmanual.com/dog-owners/digestive-disorders-of-dogs/vomiting-in-dogs), Craig B. Webb, revisión mayo de 2018 y actualización septiembre de 2024: los dos párrafos iniciales distinguen la expulsión activa y la regurgitación pasiva. Si el autor decide incorporarla, debe limitar el uso a esa definición y no trasladar sus pautas de ayuno/alimentación al lector. No he modificado ni incorporado esa fuente al contrato.

### P2

Ninguno que requiera cambio. F12 tiene una firma de Julia Bellefontaine al final de la página; el brief opta por atribución institucional y no fabrica una autoría. La fecha sin año de Cornell se declara honestamente. Ambas decisiones son válidas.

## Verificación independiente de fuentes

Todas las aperturas se realizaron el 22 de octubre de 2026 con la herramienta web, consultando pasajes sustantivos e identidad. Las localizaciones nombradas son las del documento abierto; no se copian páginas íntegras. No se reutilizó como prueba la declaración de verificación del autor.

| Fuente e identificador | Afirmación comprobada y localización | Resultado y límite | H2 previsto |
|---|---|---|---|
| F1 [UC Davis — Halitosis in Dogs](https://healthtopics.vetmed.ucdavis.edu/health-topics/canine/halitosis-dogs) | Preguntas sobre piel húmeda, evaluación y causas: boca/biofilms, dientes fracturados, inflamación, masas, cuerpos extraños y posibles fuentes extraorales. John Gardiner, 11-04-2019. | Verificada; divulgación, sin precisión diagnóstica ni clasificación por olor. | 2, 3, 4, 6 |
| F2 [Merck — Periodontal Disease in Small Animals](https://www.merckvetmanual.com/digestive-system/dentistry-in-small-animals/periodontal-disease-in-small-animals) | Etiology/Pathogenesis y Plaque: biofilm y respuesta inflamatoria; Clinical Findings: halitosis y signos gingivales; Diagnosis: sondaje/radiografía y límites del examen despierto. Brenda L. Mulherin; febrero 2024/abril 2025. | Verificada; profesional y multiespecie, no maniobra doméstica ni gravedad deducida del sarro. | 3, 6 |
| F3 [PDSA — Bad breath in dogs](https://www.pdsa.org.uk/pet-help-and-advice/pet-health-hub/symptoms/bad-breath-in-dogs) | Overview, Causes y When to contact: consultar también en mayores; especial atención a dolor, rechazo de comida o enfermedad; dieta puede cambiar olor. Publicado agosto 2024. | Verificada; el contrato excluye correctamente usar sus descripciones de olor como diagnóstico. | 1, 2, 8 |
| F4 [Merck — Disorders of the Mouth in Dogs](https://www.merckvetmanual.com/dog-owners/digestive-disorders-of-dogs/disorders-of-the-mouth-in-dogs) | Oral Inflammatory…/Lip Disorders/Inflammation of the Tongue: olor, saliva, sangre, dolor, resistencia y cuerpos extraños; Oral Tumors: biopsia para determinar tipo. Alexander M. Reiter; mayo 2018/junio 2026. | Verificada; el brief excluye trasladar antisépticos, cremas y extracción al domicilio. | 3, 5, 7 |
| F5 [Cornell — Dental disease and home dental care](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/dental-disease-and-home-dental-care) | Signs enumera dificultad de comer, sangre, hinchazón, babeo y secreción; Treatment explica examen completo y radiografías anestesiado y reanudación indicada de cuidados. Identifica a Brian Collins. | Verificada; sin fecha editorial visible; no convertir toda halitosis en indicación automática de anestesia. | 5, 6, 7 |
| F6 [Merck — When to See a Veterinarian](https://www.merckvetmanual.com/multimedia/table/when-to-see-a-veterinarian) | Tabla: dificultad respiratoria, atragantamiento, sangrado intenso, letargo extremo, problemas de marcha y dolor intenso/constante requieren atención inmediata; otros cambios justifican consulta pronta. | Verificada; tabla general, no protocolo validado de halitosis. Adaptación «llamar hoy» es prudente y el brief evita usar 24 h como permiso de espera. | 1 |
| F7 [PDSA — Chronic kidney disease in dogs](https://www.pdsa.org.uk/pet-help-and-advice/pet-health-hub/conditions/chronic-kidney-disease-in-dogs) | Symptoms/Diagnosis: sed/orina, ingesta/peso, vómitos, energía, aliento y úlceras en algunos casos; sangre/orina, presión e imagen según evaluación. Publicado mayo 2023. | Verificada; signos inespecíficos y fases iniciales pueden ser silenciosas. | 4 |
| F8 [Merck — Disorders of the Pancreas in Dogs](https://www.merckvetmanual.com/dog-owners/hormonal-disorders-of-dogs/disorders-of-the-pancreas-in-dogs) | Diabetes Mellitus: sed/orina, apetito/peso; diagnóstico de glucosa; cetoacidosis es urgencia con debilidad, menor apetito y dificultad respiratoria. David Bruyette; junio 2018/mayo 2026. | Verificada; no instrucciones de insulina ni diagnóstico por olor. | 4 |
| F9 [AAHA — Patient assessment, evaluation, and documentation](https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/history-and-physical-examination/) | History and physical examination: historia sistémica y oral, dieta/masticación/cuidados; explorar todos los sistemas y decidir pruebas; enfermedades previas antes de anestesia. Publicado 06-05-2019. | Verificada; el registro propuesto se declara adaptación editorial, no instrumento validado. | 5, 6 |
| F10 [AAHA — 2023 Senior Care Guidelines](https://www.aaha.org/wp-content/uploads/2022/12/2023-aaha-senior-care-guidelines-for-dogs-and-cats.pdf), DOI `10.5326/JAAHA-MS-7343` | Portada confirma título, Dhaliwal y coautores/DOI; pp. impresas 4–6: edad no contraindica sola, valoración individual y odontología; pp. 13–14: objetivos/QOL y decisiones compartidas. DOI contrastado también mediante búsqueda bibliográfica. | Verificada; guía con consenso/experiencia y evidencia, no promesa de seguridad ni validación de la calculadora del sitio. | 6, 8 |
| F11 [FDA — Paws Off! Xylitol is Toxic to Dogs](https://www.fda.gov/animal-veterinary/animal-health-literacy/paws-xylitol-toxic-dogs) | Lista de productos incluye dentífricos/enjuagues y pide llamada inmediata ante posible ingestión. | Verificada; no fecha editorial atribuida ni dosis/umbrales ni teléfonos extranjeros universales. | 7 |
| F12 [Illinois — Don’t Wait Until It’s Too Late: Oral Tumors in Dogs and Cats](https://vetmed.illinois.edu/pet-health-columns/oral-tumors-in-dogs-and-cats/) | 28-02-2025; Risk Factors and Signs/Catch Changes Early: sangre en juguetes/agua, bultos/llagas nuevas y evaluación. Información atribuida a Joanna Schmit; firma final de Julia Bellefontaine. | Verificada; divulgación, no prueba diagnóstica del olor. El brief omite adecuadamente sus afirmaciones de pigmentación y olor intenso. | 3 |

Cobertura inversa: los nueve H2 tienen fuentes y una decisión específica. Todas las fuentes figuran en al menos un «Sustentado en» y en la tabla del contrato. El único hueco confirmado es el detalle definido en el hallazgo P1, no la ausencia de sustento de todo el H2 4.

## Comprobaciones mecánicas y editoriales

| Control | Comprobación real |
|---|---|
| Metadatos | Python `len()`: SEO **55**; descripción **148**. Coinciden con el brief. |
| Presupuesto | Suma Python de tabla completa: **200 + 650 + 450 + 900 + 800 + 650 + 800 + 600 + 400 + 550 = 6.000**. Una primera extracción mía omitió la introducción por espacios en la celda; corregida la extracción, no existe discrepancia de presupuesto. |
| Utilidad y diferenciación | Leído artículo dental real: rutina, cepillado y limpieza. El nuevo brief excluye tutorial/productos/profilaxis y prioriza causa, observación, llamada, evaluación y seguimiento. H2 3 explica la causa dental sin rehacer la guía preventiva. |
| Procedencia | Guía sin caso explícita; sujeto visual ilustrativo sin historia. Sin credenciales ni revisión veterinaria falsas. |
| Frontmatter | Campos admitidos por `src/content.config.ts`; enum correcto; status informativo y gate fuera de contenido servible documentados. |
| Firma | `ArticleByline.astro` y `[slug].astro` actuales generan autoría/fechas/IA: es correcto evitar duplicar la firma histórica de la plantilla. |
| Enlaces | Existen pilar, dos MDX y herramienta; inventario marca dental y chequeo `[x]` publicados (líneas 222–223). Rutas canónicas y contexto apropiados. Sin prueba de despliegue nuevo. |
| Componentes | Tres tipos narrativos de AlertBox más caja bibliográfica independiente; FAQ de siete preguntas; nuevo componente marcado planificado. |
| Voz | Remite a guía vigente y exige medición de tono/densidad. No prescribe historia personal ni salvedades repetidas. |
| Inventario | Tema marcado `[~] En Briefing`, no publicado. |

## Recursos prometidos y viabilidad

| Recurso | Ruta/ubicación | Prueba exigida por contrato | Estado en esta revisión |
|---|---|---|---|
| R1 referencia/hero | `public/images/blog/mal-aliento-perros-viejos/labrador-senior-observacion-v1.webp` | Generar e inspeccionar primero; 1200/800/400, anatomía, edad y decodificación | Planificado; gate correcto |
| R2 escena de comida | Misma carpeta, `labrador-senior-registro-comida-v1.webp`; H2 5 | Derivación de R1 y observación sin provocar dolor | Planificado; viable |
| R3 conversación | Misma carpeta, `labrador-senior-consulta-v1.webp`; H2 6 | Continuidad y escena ilustrativa sin falsa revisión clínica | Planificado; viable |
| R4 prioridad | `HalitosisRecursos.astro`, `prioridad`; H2 1 | Texto/acción/anclas, no solo color; móvil ≤900 px | Planificado; viable |
| R5 proceso | Mismo componente, `proceso`; H2 3 | Biofilm/zona/detalle cambian; controles, pausa, final, teclado, reduced-motion, noJS/impresión | Planificado; esquema conceptual sin deformación del perro |
| R6 tabla | `TablaApilable` en MDX; H2 7 | Cuatro filas, frases breves y `data-label`; tarjetas móviles | Planificado; viable con componente existente |
| R7 registro | `HalitosisRecursos.astro`, `registro`; H2 5 | Ocho datos, plegado inicial, campos accesibles, impresión de valores, sin envío/puntuación | Planificado; gate correcto |

Los tres prompts repiten de forma explícita la ficha del mismo labrador chocolate senior. Tres escenas, infografía, proceso, tabla y registro cubren funciones distintas; no son una cuota ornamental. La auditoría del brief no afirma archivos generados ni pruebas de navegador ya realizadas. Esos requisitos siguen pendientes para el artículo integrado.

## Efecto cascada

No hay MDX nuevo escrito; el hallazgo puede cerrarse antes de propagarse. El detalle no es una cita bibliográfica falsa compartida con otros briefs y no requiere corregir el artículo dental ni el primer artículo del plan. El expediente de investigación debe mantenerse coherente si el autor amplía las fuentes. La siguiente revisión es **ronda 2 del mismo brief**, no una auditoría nueva.

## Lo que sí funciona

Mantener la prioridad de consulta antes de causas, la exclusión del diccionario olor→diagnóstico, el registro editorial sin puntuación y la separación frente a la guía de cepillado. Mantener las doce fuentes verificadas y sus límites, la ficha senior continua y la producción de recursos como condición de cierre. El contrato distingue el texto útil de bibliografía/sintaxis y exige conteos reales por H2.

## Qué corregir, en orden

1. Resolver únicamente el hueco de definición del H2 4 mediante retirada del detalle o incorporación verificada de respaldo específico con trazabilidad completa.
2. Mantener el objetivo de 6.000 palabras y la diferenciación; no ampliar el tema a tratamiento digestivo para justificar una nueva cita.
3. Devolver el brief corregido, con su hash, a ronda 2. Redactar solo tras dictamen APTO.

No se han editado el brief, el inventario ni otros archivos de producción. No se han fusionado ni desplegado cambios.
