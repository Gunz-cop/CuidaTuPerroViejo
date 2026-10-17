# Registro de referencias y afirmaciones

Comprobación: 2026-10-17. Distinguir identidad, contenido y accesibilidad. La captura HTTP directa se conserva en evidencias/fuentes-http.json.

| Referencia retirada | Sustitución | Afirmación y localización comprobada | Resultado |
|---|---|---|---|
| AAHA antigua ruta senior | https://www.aaha.org/resources/2023-aaha-senior-care-guidelines-for-dogs-and-cats/ | Título, institución y resumen: atención sistemática y adaptada de pacientes mayores sanos y enfermos. Recurso de portada, no respaldo de edades fijas. | Lector web: texto completo. HTTP directo desde el entorno:403. Navegador remoto Cloudflare: documento real, título/H1 y navigation.responseStatus=200; resumen leído. Bloqueo directo conservado como limitación del método, no fuente falsa. |
| AAHA antigua ruta «2021» canina | https://www.aaha.org/resources/life-stage-canine-2019/canine-life-stage-definitions/ | Tabla1, Senior: último25% de esperanza de vida estimada; siguientes párrafos: variación gradual, tamaño/raza y juicio clínico, no edades uniformes. Año real2019;2021 de otra guía no se atribuye a esta. | Lector web: tabla y párrafos leídos. HTTP directo:403. Navegador remoto: título/H1 correctos y navigation.responseStatus=200. No se equipara la tabla propia por tamaño a una recomendación literal de AAHA. |
| MSD ruta Aging and Cognitive Dysfunction 404 | https://www.merckvetmanual.com/dog-owners/behavior-of-dogs/behavior-problems-in-dogs | «Other Canine Behavior Problems», párrafo sobre disfunción cognitiva: cambios en interacción, hábitos de eliminación, orientación y sueño. Respalda reconocer cambios y consultar, no diagnosticar por edad ni prometer prevención. | HTTP200, documento real y texto comprobados mediante lector web. Merck es la denominación del manual en esta ruta; etiqueta de enlace ajustada. |
| NCSU Quality-of-Life-Scale.pdf | https://www.speakingforspot.com/PDF/VillalobosDVM_QualityOfLifeScale.pdf | Alice Villalobos, «Quality of Life Scale Helps Make Final Call», cuatro páginas. Página1: siete áreas HHHHHMM,1–10, valoración individual; HURT: control del dolor y respiración. No se le atribuye corte50 ni validez de nuestra web. | HTTP200 application/pdf, bytesPDF reales, descarga y pdftotext de cuatro páginas. SHA256:9389c0416b15d72e0713875e17ccf859ac4b875326311af81b6d75e3200e1fbd. El lector web no pudo abrir este PDF; la descarga directa sí permitió verificarlo. |

El enlace NCSU se sustituye por el escrito atribuible a Villalobos, no por un PDF cualquiera cuyo enlace abra. La adaptación de DoveLewis también se examinó: usa1–9 y sus propias indicaciones por área, por lo que no se empleó para atribuirle nuestra escala0–10 ni un corte global35. Su diferencia quedó detectada antes de cerrar el cambio.

## Adaptación HHHHHMM del sitio

Se conservan los siete criterios y la suma, pero no se aplican los antiguos cortes35/50. Son decisiones propias: extensión hasta0 (el texto primario leído usa1–10), total mostrado0–70, preguntas simplificadas en español, interfaz paso a paso y aviso separado para cualquier cero. No se afirma validación clínica de ese aviso ni que la ausencia de ceros implique normalidad. La suma nunca determina eutanasia, dolor ausente o tratamiento eficaz.

El artículo de Testoni y colaboradores (2023), «Validation of the HHHHHMM Scale in the Italian Context: Assessing Pets' Quality of Life and Qualitatively Exploring Owners' Grief», PMC10044252 / PMID36978590 / DOI10.3390/ani13061049, se conserva identificado como estudio de una versión italiana. No se utiliza para validar las reglas de nuestra adaptación. Se retiraron de esta bibliografía tres enlaces suplementarios que no respaldaban una afirmación concreta comprobada en esta corrección; no se declaran falsos por no haberlos verificado.

## Edad

Se conserva el modelo existente: `seniorAge(size)` aplica75% a las medias por tamaño de Montoya2023, DOI10.3389/fvets.2023.1082102, y redondea a medio año. Portada y FAQ de la calculadora generan ahora el mismo texto desde `seniorFrameworkText()`; sus umbrales10/9,5/8,5/7 no son edades universales publicadas por AAHA. No se recalcula pronóstico ni se infiere salud de una etapa.

La casilla «Fórmula de Wang» solo evalúa16×ln(edad)+31 (Wang2020, DOI10.1016/j.cels.2020.06.006). Se explica que no se toma muestra ni se analiza el ADN individual. No se cambian los resultados del modelo ni las decisiones visuales autorizadas del propietario. La verificación científica histórica del modelo se conserva; esta revisión unifica presentación y límites, no vuelve a validar todas las estimaciones poblacionales.
