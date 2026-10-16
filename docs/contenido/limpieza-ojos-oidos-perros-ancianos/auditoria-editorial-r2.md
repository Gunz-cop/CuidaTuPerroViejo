# Auditoría editorial independiente — ronda 2 de 3

Fecha: 2026-10-16. Revisor independiente del redactor/corrector. No se modifica producto, skills, brief ni inventario.

Artículo: `src/content/blog/limpieza-ojos-oidos-perros-ancianos.mdx`.
SHA-256 auditado: `f14718fdbe36b83cbf1c7121189c57a7541659fcdce250f974ca134546d5e41b`.

Se leyeron AGENTS.md, las cuatro skills de brief/redacción/auditoría, la referencia compartida `calidad-editorial-adsense.md`, la política editorial, el contrato y el artículo completo. El brief ya tiene dos rondas aprobadas: no se reabre; no se identificó un nuevo fallo factual heredado. Esta es la ronda 2 del artículo, posterior a la auditoría textual previa, no un reinicio.

## Veredicto

**No publicable todavía:** seis fuentes se enlazan únicamente en la bibliografía final, incumpliendo la trazabilidad junto a las afirmaciones exigida por la política editorial y la referencia actualizada.

No encontré identificadores falsos, casos clínicos inventados, recomendaciones de dosis ni recursos anunciados ausentes. El defecto bloqueante es localizado y corregible sin reescribir ni ampliar el contenido. Después de corregirlo corresponde una única ronda 3 sobre la versión final, sin superar el máximo.

## Hallazgos

### P1 — Enlaces científicos separados de las afirmaciones

En la versión auditada, solo Fefer tiene enlace en desarrollo (apertura). Cornell KCS (línea 98), Nascimento (116), VCA (146), Cornell oídos (196/268), Merck (212/291) y Moog (281) están atribuidos por nombre, pero sus enlaces solo aparecen en el cuadro final (364–369).

La presencia nominal satisface el buscador mecánico, pero el lector debe buscar al final qué documento corresponde a cada afirmación; hay además dos documentos distintos de Cornell. `src/pages/politica-editorial.astro` declara: «Los enlazamos directamente donde sostienen una afirmación concreta». La referencia compartida exige que la bibliografía complemente esas citas.

**Corrección precisa:** enlazar la atribución a cada documento en el párrafo que desarrolla su afirmación dentro de su H2, conservando la bibliografía. Enlazar también Fefer donde se explica BAER y donde se desglosan los resultados; Cornell oído y Merck deben ser accesibles junto a sus recomendaciones en ambos H2 asignados. No añadir referencias decorativas ni variar cifras para acompañar el enlace.

### P2 — Reiteraciones de manejo que pueden abreviarse sin perder seguridad

La introducción (760 palabras) dedica varios párrafos a distinguir observar/limpiar/consultar. Las instrucciones sobre llevar producto, pedir pauta escrita y comunicar dificultad se repiten en líneas 108–112, 170–176 y 242–252. Las precauciones esenciales junto a la maniobra sí aportan seguridad y deben conservarse.

La aportación práctica existe: decisiones distintas para ojo/oído, retirada exterior, toma de muestras antes de limpiar, secuencia ótica, límites del tímpano, frecuencia individual y registro para consulta. No se rechaza por longitud. Una futura edición puede compactar la organización doméstica repetida y adelantar una síntesis de decisiones. No añadir palabras para rellenar targets; cualquier ajuste del contrato debe documentarse. Este P2 no exige ampliar alcance antes de publicar.

### Observaciones sobre las skills inspeccionadas

Durante la inspección inicial quedaban frases activas que seguían exigiendo arco de historia real/cierre propio y una cuota de seis fuentes pese al nuevo estándar, además de «protagonista real» en el checklist visual. Se comunicaron al responsable, que las está corrigiendo de forma separada. No constituyen un fallo científico del brief aprobado ni justifican inventar un paciente para este artículo. Verificar su versión final antes del commit; este informe no certifica ediciones posteriores a su lectura.

## Registro de fuentes y afirmaciones

Comprobación independiente realizada el 2026-10-16. Se abrió el contenido de seis páginas directamente y se recuperó Fefer completo por una alternativa oficial. Las citas breves siguientes identifican pasajes; no sustituyen los enlaces finales que faltan en el artículo.

| Fuente e identidad comprobada | Afirmación del artículo / ubicación | Pasaje comprobado y alcance | Resultado |
|---|---|---|---|
| Fefer G, Khan MZ, Panek WK, Case B, Gruen ME, Olby NJ. 2022. *Relationship between hearing, cognitive function, and quality of life in aging companion dogs*. J Vet Intern Med 36:1708–1718. DOI `10.1111/jvim.16510`; PMID `35932193`; PMCID `PMC9511086`. | Apertura; H2-3, BAER y ausencia de causa conductiva visible; H2-5, 19/12/5 y grupo estadístico de ocho. | Texto completo, §3.2: «Nineteen dogs had wave V at 50 dB, 12 at 70 dB, and 5 at 90 dB»; añade dos no probados a90 y uno sin ondas a90 para el grupo estadístico. Exploración sin causa conductiva evidente; al ingreso ninguno tenía otitis externa que requiriese tratamiento auricular tópico. Comparación entre participantes, no seguimiento ni ensayo de higiene. | Compatible. La frase «se excluyó otitis externa que requiriera tratamiento» resume ausencia al ingreso; no extrapolar a exclusión de toda enfermedad ótica. No se inventa evolución ni eficacia de limpieza. |
| Cornell University, Riney Canine Health Center; Aly Cohen. *How to Clean Your Dog’s Ears*. Sin año afirmado en artículo. | H2-3: no bastoncillos y signos; H2-4: aplicación/masaje/sacudida, parar ante dolor, alcohol/peróxido, frecuencia; apoyo H2-5. | Apartados de técnica, tipo y frecuencia: masaje suave, sacudir, retirada accesible, «stop and consult with your veterinarian» ante dolor. Oído sano necesita limpieza si hay suciedad/restos; exceso puede irritar. La página también menciona después de baño/natación: el artículo no prohíbe esa indicación. | Compatible y más prudente que una pauta universal. |
| Merck Veterinary Manual. Sarah Hoff; revisión Joyce Carnevale. *Otitis Externa in Animals*. Revisión integral septiembre2025; actualizado abril2026. | H2-3: otoscopia/citología, muestras antes de limpiar; H2-4: seguridad del tímpano y ototoxicidad. | Diagnóstico por historia, otoscopia y citología. «Samples ... should be taken before any cleaning is done». Verificar integridad timpánica antes de agentes tópicos; riesgo ototóxico mayor si no está íntegro. | Compatible. No dice que una limpieza invalide siempre todas las muestras; el artículo tampoco. No convierte cabeza inclinada en diagnóstico. |
| Moog F y colaboradores. 2022. *Clinical and Microbiological Performances and Effects on Lipid and Cytokine Production of a Ceruminolytic Ear Cleaner in Canine Erythemato-Ceruminous Otitis Externa*. Vet Sci 9(4):185. DOI `10.3390/vetsci9040185`; PMID `35448682`; PMCID `PMC9031221`. | H2-4, «Lo que permite afirmar el estudio de un limpiador». | Identidad y resumen PubMed abiertos. Estudia una formulación ceruminolítica en otitis externa eritemato-ceruminosa, con variables clínicas/microbiológicas y lípidos/citoquinas. No se necesitó texto íntegro para comprobar este objeto. | Verificación limitada al resumen, coherente con el límite documentado del brief. Artículo no atribuye cifras, magnitud de eficacia ni seguridad universal. |
| Cornell University, Riney Canine Health Center. *Keratoconjunctivitis sicca (KCS) in dogs*. Sin año afirmado. | H2-1: déficit acuoso, causa inmunomediada, signos, Schirmer un minuto, fluoresceína; apoyo H2-2. | Apartados Cause y Diagnosis: inflamación inmunomediada más frecuente; STT mide producción acuosa durante un minuto; fluoresceína revela daño corneal. | Compatible; sin prevalencias, umbrales ni diagnóstico por legañas. |
| Nascimento FF y colaboradores. 2023. *Comparison of strip meniscometry and Schirmer tear test results and tear film breakup time between healthy dogs and dogs with dry eye disease*. Arq Bras Oftalmol 86(4):314–321. DOI `10.5935/0004-2749.20230057`; PMID `35544927`. | H2-1, «Otras pruebas, otras preguntas». | Resumen abierto: compara las tres pruebas en156 ojos de78 perros; conclusión: meniscometría podría complementar Schirmer. Año2023 corresponde al volumen publicado, aunque la identificación PubMed sea de2022. | Compatible. No importa cifras ni umbrales al uso doméstico. |
| VCA Animal Hospitals/LifeLearn. *Keratoconjunctivitis Sicca (KCS) or Dry Eye in Dogs*. Referencia clínica, no ensayo. | H2-2: paño limpio húmedo templado y demostración de manejo. | Apartado de tratamiento: «Gently cleaning ... with a warm, wet washcloth» y demostración veterinaria del cuidado/medicación. | Compatible. Se acota a cuidado indicado, sin convertirlo en obligación para todo senior ni atribuirle una técnica clínica no descrita. |

URLs abiertas: las siete URLs profundas de la bibliografía, con dos aclaraciones: Wiley respondió403 y Fefer se contrastó íntegramente mediante `https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9511086/fullTextXML`; Moog se contrastó mediante `https://pubmed.ncbi.nlm.nih.gov/35448682/` según la limitación ya declarada. Nascimento se leyó en PubMed; no se afirma haber abierto su texto íntegro.

La consulta EuropePMC `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1111/jvim.16510&format=json` confirmó identidad y PMCID de Fefer. XML recuperado en `/tmp/auditoria-editorial-r2/fefer.xml` (129985bytes); conservarlo fuera del producto si se necesita repetir la comprobación. Un403 no se presenta como referencia falsa.

## Procedencia, utilidad y coherencia clínica

El material central es una cohorte publicada identificada en la apertura. No se añaden nombres de pacientes, consultas, tratamientos ni desenlaces individuales. El cocker se declara ilustración IA, no participante. Se diferencia asociación de causalidad y grupo estadístico de respuesta individual; es una mejora concreta respecto al error encontrado en el artículo antiguo de agresividad.

La síntesis sirve para decidir qué observar, qué retirar del exterior, cuándo no manipular, qué preguntar y qué señales requieren asistencia. No es solo una traducción del estudio de audición: incorpora manejo ocular/ótico con fuentes diferenciadas y límites aplicables. No se hizo una búsqueda de similitud de toda la web; no se certifica ausencia universal de coincidencias ni «originalidad» mediante detector.

No hay dosis ni diagnóstico por imagen/color. No se aconseja suspender medicamentos prescritos por cuenta propia. Dolor y cambios repentinos se sitúan junto a las maniobras. La calculadora se limita a observación general y se excluye expresamente como prueba sensorial o criterio para esperar ante signos agudos. Sin promesas de prevenir sordera/cognición o de descubrir todas las enfermedades.

## Recursos y pruebas

| Recurso anunciado | Ruta/destino | Prueba y resultado |
|---|---|---|
| Hero y dos ilustraciones de cuerpo | `public/images/blog/limpieza-ojos-oidos-perros-ancianos/` | Comprobación propia: nueve WebP decodificados con Pillow; principales1200×675, variantes800×450 y400×225. Alt y pies IA leídos en MDX. |
| Continuidad/anatomía, integración móvil y oscuro | `auditoria-visual.md`, `revision-navegador.json`, capturas adyacentes | Evidencia independiente previa del15 de octubre consultada; aprueba tres escenas e integración local. No se afirma haber repetido esa inspección visual o navegador en esta ronda. |
| FAQ de siete respuestas | Componente importado `FAQ` | Contenido completo leído; las siete respuestas existen. Funcionamiento de navegador consta en evidencia previa, no reejecutado aquí. |
| Pilar, dos artículos de higiene y chequeo | Cinco enlaces internos del contrato contando herramienta | Existen en el MDX y coinciden con inventario/crawl público previo. No se afirma un nuevo rastreo público desde esta ronda. |
| Calculadora de calidad de vida | `/herramientas/calculadora-calidad-vida-perros` | Enlace real existente y límites correctos. No se envían mensajes ni se ejecuta acción externa. Funcionamiento público consta en auditoría general previa. |
| PDFs, vídeos o plantillas descargables | Ninguno anunciado | No hay botón sin destino, ID Blogger, placeholder ni falsa promesa de descarga. La sugerencia de una nota breve no anuncia un archivo. |

## Métricas locales

Se ejecutó en esta ronda el script actualizado:6180 palabras, contrato5440–7360. Introducción760/800; H2-1 1069/1200; H2-2 765/800; H2-3 1100/1200; H2-4 886/900; H2-5 673/700; cierre874/800. Todas dentro de±15%. Densidad:133 párrafos, media38, mediana39, >50palabras1%;27 H3. El promedio229 palabras/H3 es orientativo; no demuestra densidad indebida en pantalla. El script mecánico devuelve APTO, pero no detecta que los enlaces científicos están únicamente al final.

El log antiguo `metricas-integradas.txt` aún muestra contrato `null–null` y omite tabla de fuentes por su antiguo parser: no usarlo como evidencia actual. Regenerar el artefacto final con el script corregido; no basta con copiar el antiguo APTO.

## Qué corregir, en orden

1. Añadir enlaces junto a afirmaciones conforme al P1, conservando todas las precauciones, cifras y límites comprobados.
2. Terminar la coherencia interna de las skills señalada, sin aplicar cuota ni arco artificial al artículo.
3. Regenerar métricas y validar build/check y recursos de la versión final. Cualquier cambio de fechas debe reflejar una revisión real y ser coherente entre frontmatter/byline; la fecha antigua no prueba actualización de hoy.
4. Encargar la ronda3 final con hash exacto. Si no pasa, detener publicación de este documento y comunicar el bloqueo. No abrir una cuarta ronda ni reiniciar su numeración.

El artículo no está certificado como desplegado por esta auditoría local. El estado Publicado del frontmatter no prueba publicación ni constituye un filtro. La aprobación editorial final tampoco garantiza aprobación de AdSense ni subsana los fallos del resto del sitio.
