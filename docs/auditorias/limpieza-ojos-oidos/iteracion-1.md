# Auditoría independiente del brief — iteración 1 de 3

Fecha: 2026-10-15. Archivo auditado: `briefings/briefing-limpieza-ojos-oidos-perros-ancianos.md`. Rol: evaluación; no se modifica el brief. Normativa: AGENTS.md y skills locales de generación/auditoría.

## Veredicto

**No válido para redacción**: atribuye a las fuentes datos y conclusiones que no sostienen.

La comprobación documental sigue incompleta para el texto íntegro de VIN/WSAVA y del ensayo PMC9031221: se intentó abrir ambos y sus alternativas; las búsquedas confirman identidad, pero los servidores devuelven errores/captcha. Esto no es prueba de invención ni motivo único del rechazo: los errores abajo se verificaron en fuentes abiertas.

## Hallazgos

### P0 — Afirmaciones atribuidas que la fuente no contiene

1. **Secciones 2 y 3, Fuente 1; Sección 6, H2-3 línea 185 y H2-5 líneas 218-221.** El brief dice que ocho perros oían/necesitaban 90 dB. En Fefer, resultados 3.2: solo cinco mostraron respuesta a 90; el grupo estadístico de ocho también incluye dos no probados a 90 y uno sin respuesta a 90. Además, métodos/resultados excluyen otitis externa que requiriera tratamiento y no encontraron causa conductiva visible. El diseño es transversal, no ensayo de higiene ni seguimiento de pérdida auditiva. No respalda «limpiar bien […] evita perder más» ni prevención de deterioro cognitivo. **Corrección:** distinguir respuesta de grupo estadístico, conservar asociación con cognición sin causalidad y retirar la promesa preventiva. No convertir categorías BAER en trayectoria longitudinal individual.

2. **Sección 3, Fuente 5; Sección 6, H2-1 líneas 139, 141, 143; H2-2 completo; FAQ 2.** Cornell actual (actualizado 2025-12-02, abierto completo) sí describe causa inmunomediada y signos, pero no dice «infradiagnosticada y a menudo sin tratar», no da el umbral ≥15 mm/min y no enseña la técnica de gasa/suero/dirección/recorte. Tampoco diagnostica ojo seco porque reaparezca secreción. **Corrección:** retirar esas atribuciones; «secreción que reaparece requiere evaluación y tiene varias causas». Obtener fuente específica para técnica y para cualquier umbral mantenido, o eliminar ese número. La atribución errónea no se soluciona manteniendo Cornell solo en la bibliografía.

### P1 — Contrato clínico y editorial que propagará errores

3. **Sección 6, introducción AlertBox línea 126; H2-4 frecuencia; H2-5 línea 223; imagen 3 caption línea 278.** Se normaliza limpiar ojos y oídos cada mañana y se promete detectar «la mayoría/casi todos» los problemas antes de dolor sin evidencia. Merck limita su pauta diaria→semanal al mantenimiento de otitis crónica/recurrente; no es calendario universal. **Corrección:** separar observación de limpieza, frecuencia individual según indicación veterinaria, suprimir porcentajes implícitos de detección y promesas de prevención.

4. **Sección 6, H2-2 y H2-4, técnica; Sección 3, Fuente 2 y Sección 9.** Faltan límites claros para técnica doméstica (solo paciente evaluado y producto/pauta indicados); se prescribe llenar el conducto con un producto veterinario genérico. La regla «destruyes la muestra» es absoluta: el consejo correcto puede mantenerse como evitar limpieza antes de tomar muestras salvo indicación profesional, sin afirmar que toda muestra posterior queda destruida. VIN es una ponencia de congreso, no automáticamente una guía institucional vigente. **Corrección:** verificar texto/autor de VIN o sustituir por fuente abierta; atribuir muestreo previo a Merck, que sí lo contiene. Retirar intervalo universal de 2-3 semanas si no se verifica. Añadir fuente práctica para la técnica concreta y para higiene periocular, o reducir instrucciones a lo respaldado.

5. **Sección 5, contingencia y Sección 10, enlace mutuo a ceguera/sordera.** El inventario actual ya marca publicada la incontinencia fecal; no procede «solo un publicado». El tema de ceguera/sordera está en briefing, por lo que el enlace mutuo solo puede quedar como futuro y nunca obligatorio en artículo actual. **Corrección:** añadir segundo spoke `/higiene-hogar-perros-senior/incontinencia-fecal-perros-senior`, validar URL contra repositorio y declarar el enlace sensorial pendiente. Callosidades y baño no se consideran publicados solo por existir código.

6. **Sección 6, H2-5 y AlertBox.** El H2-5 científico carece de línea `Sustentado en`; los tres AlertBox contienen párrafos terminados, aunque la norma solo exceptúa tipo/título y borrador FAQ. **Corrección:** asignar fuentes por nombre al último H2 y convertir cuerpos de AlertBox en instrucciones. Mantener 3 tipos y ubicación.

### P2 — Preparación de entrega

7. **Sección 1 frontmatter y Sección 8.** `datePublished: 2026-08-14` no es fecha real de publicación de un artículo aún inexistente; los tres nombres visuales terminan `.jpg` mientras hero/contrato técnico usan `.webp`. **Corrección:** dejar instrucción de fecha real al redactar, sin antedatar; unificar nombres finales y distinguir explícitamente cocker ilustrativo de sujetos del estudio. Retirar «raza de mayor predisposición» si no se aporta comparación que lo pruebe.

## Verificación de fuentes

| Fuente | Identificador y enlace comprobado | Resultado |
|---|---|---|
| 1 Fefer et al. 2022 | [DOI 10.1111/jvim.16510](https://onlinelibrary.wiley.com/doi/10.1111/jvim.16510) | Texto completo abierto. Identidad válida; interpretación y grupo de ocho incorrectos en brief. Resultados 3.2 y métodos 2.4 permiten corregir. |
| 2 WSAVA 2011/VIN | [Documento 5124281](https://www.vin.com/apputil/content/defaultadv1.aspx?pId=11343&catId=34564&id=5124281) | Identidad/título/congreso confirmados por búsqueda; apertura original y variante fallan 502. Datos particulares no verificados íntegramente. No confundir ID VIN con PMID. |
| 3 Merck, Otitis Externa in Animals | [Página específica](https://www.merckvetmanual.com/ear-disorders/otitis-externa/otitis-externa-in-animals) | Abierta completa, revisión 2025/actualización 2026. Respalda toma previa de muestras, evaluación del tímpano, riesgo ótico y mantenimiento individualizado; no pauta universal en perros sanos. |
| 4 Moog et al., 2022 | [PMC9031221](https://pmc.ncbi.nlm.nih.gov/articles/PMC9031221/), [PubMed35448682](https://pubmed.ncbi.nlm.nih.gov/35448682/), DOI 10.3390/vetsci9040185 | Identidad y resumen confirmados mediante búsqueda indexada. Estudio prospectivo abierto de dos semanas en otitis eritemato-ceruminosa leve/moderada; no prueba universal para todos los limpiadores. Apertura PMC inicial devuelve ficha de 497 líneas pero siguientes dan captcha; MDPI429 y PubMed sin contenido útil. Conservar restricción sin cifras hasta acceso real. |
| 5 Cornell, KCS | [Riney Canine Health Center](https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/keratoconjunctivitis-sicca-kcs-dogs) | Abierta completa. Identidad válida; los datos concretos descritos en P0-2 faltan. |
| 6 Nascimento et al., 2023 | [PubMed35544927](https://pubmed.ncbi.nlm.nih.gov/35544927/), [PMC11826716](https://pmc.ncbi.nlm.nih.gov/articles/PMC11826716/), DOI 10.5935/0004-2749.20230057 | PMC bloqueado, PubMed abierto/resumen recuperado. Sí compara tres pruebas, 156 ojos/78 perros; meniscometría complementa, no sustituye el diagnóstico veterinario. |

### Fuentes adicionales útiles para corregir

- [VCA, secreción ocular/epífora](https://vcahospitals.com/know-your-pet/eye-discharge-or-epiphora-in-dogs): diagnóstico diferencial y cuidado exterior limpio/seco; no convertir color de secreción en diagnóstico.
- [VCA, manchas por lágrima](https://vcahospitals.com/resources/conditions-cat/eyes-ears-nose/no-need-to-cry-over-tear-staining): instrucciones prácticas perioculares después de descartar patología; recorte profesional como alternativa.
- [VCA, lavado ocular estéril](https://vcahospitals.com/know-your-pet/sterile-eye-wash): producto estéril bajo supervisión veterinaria. Son fuentes clínicas complementarias, no ensayos.
- [Nuttall 2023, revisión JAVMA](https://doi.org/10.2460/javma.23.01.0002): revisión específica que puede sustituir VIN si se abre/verifica y se reconstruye su trazabilidad; no añadir como relleno.

## Efecto cascada

No hay artículo de este slug según árbol remoto revisado por la sesión principal. Búsqueda local `rg` solo devuelve este brief porque los demás no están descargados: no equivale a ausencia remota de otros usos. Antes de cerrar la corrección, buscar Fefer/16510, Cornell, PMC9031221 y 5124281 en los demás briefs remotos; en especial el sensorial mencionado. El inventario ya marca este tema `[~]`, correcto. El error de atribución se propagaría al artículo si se redactara ahora.

## Lo que sí funciona

- `seoTitle` **43** y `metaDescription` **136** caracteres, contados con Python; cumplen límites.
- Targets suman **6.400**; rango 5.440–7.360 es ±15 % correcto.
- `pilar` válido en `src/content.config.ts` actual; campos admitidos por schema estricto. La ruta antigua de config es referencia desactualizada, no invalidez del enum.
- Hay tabla de seis fuentes con H2 asignados, 3 tipos AlertBox, 7 FAQ y cierre propio antes de conclusión.
- Los tres prompts mantienen cocker senior y especifican plano/luz/profundidad/entorno. Son ilustración, no caso real: no inventar experiencia ni raza de participantes.
- Prohibición de primera persona y aviso honesto de falta de cifras del ensayo son decisiones correctas.
- Incontinencia urinaria, chequeo geriátrico y calculadora aparecen como publicados en inventario. Diferenciación respecto del tema sensorial está declarada.

## Qué corregir, en orden

1. Corregir Fefer en todas sus apariciones y eliminar inferencia de prevención auditiva/cognitiva por higiene; conservar dato estadístico explicado y límites del diseño.
2. Corregir atribuciones Cornell y diagnóstico categórico; conseguir fuente específica de limpieza/diagnóstico, ajustar H2 y FAQ a contenido verificado.
3. Verificar/sustituir VIN y delimitar ensayo a producto/población estudiados, sin generalización. Mantener mínimo seis fuentes fuertes con uso real y añadir fuentes prácticas cuando proceda.
4. Unificar límites clínicos/frecuencia/urgencia en estructura, FAQ, captions y no negociables; preservar consejo de muestras previas sin «destrucción» absoluta.
5. Actualizar spokes, trazabilidad H2-5 y formato de AlertBox; ajustar fecha y extensiones visuales.
6. Segunda auditoría independiente sobre brief corregido. Máximo global autorizado: tres auditorías; no reiniciar contador por cambio de fuentes.
