# Auditoría del artículo — Leishmaniosis en perros mayores (R1 de 3)

- **Fecha:** 2026-10-24 · **Ronda:** R1 de máximo 3 · **Rol:** auditor externo; no se corrigió ningún archivo.
- **Material auditado:** `docs/contenido/leishmaniosis-perros-mayores/articulo-borrador.mdx` (rama `codex/leishmaniosis-articulo-revision`, worktree de solo lectura).
- **SHA-256 del MDX:** `ebe2107047bc262c60a49896b397a6471f51269f5b7d82959396238368db7406` (coincide con el que declara el redactor).
- **Contrato:** `briefings/briefing-leishmaniosis-perros-mayores.md` (APTO en R2), §6, §9 y §11.
- **Alcance de la validación:** local (copia del worktree en el scratchpad, con el MDX colocado en `src/content/blog/`). No hay validación pública ni despliegue.

## Veredicto

**Publicable con reservas (solo el texto).** No hay P0: ningún dato inventado, ningún no negociable del §9.6 ablandado y ninguna instrucción del brief filtrada. Lo que impide integrarlo y publicarlo es que los recursos que contrata el §11 no existen (tres imágenes, recorte senior, animación, infografía de calendario) y que el texto lleva unas 363 palabras de relleno administrativo repetido, que hay que sustituir por utilidad y no solo borrar.

El veredicto cubre lo mecánico y lo verificable a mano que sí se pudo comprobar. Queda sin cubrir lo que figura en «Qué quedó sin abrir».

## Resumen de métricas

| Control | Resultado propio | Declarado por el redactor | Lectura |
|---|---|---|---|
| Palabras visibles (sin bibliografía ni frontmatter; con H2/H3, tablas, avisos y FAQ) | **4.275** | 4.198 | Mi método cuenta títulos de avisos y `caption` de tablas. La diferencia (+77, 1,8 %) no cambia nada: ambos están dentro de 3.868–5.232. |
| Total del script `metricas.mjs` | 4.711 | — | Incluye la bibliografía (unas 300 palabras), que el contrato excluye. No sirve como cifra de contrato. |
| Párrafos de prosa | 80; media 38,6; mediana 39; 1 de 80 con más de 50 palabras (máx. 69); frase media 15,8 palabras | media 38,7 / mediana 39 / 1,3 % | Coincide. |
| H3 | 22 en 6 H2; media ≈ 190 palabras | — | Cumple 150–200 de media. Tres superan 200 (ver P2-7). |
| `tono.py` | 0 muletillas, 0,0/1.000 (3.737 palabras medidas) | 0 | Coincide. Pero ver P1-2 sobre muletillas que el script no detecta. |
| SEO / meta | 54 / 158 caracteres (contados con `len()`) | 54 / 158 | Coincide. |
| Componentes | 3 `AlertBox` (info, danger, warning); 7 FAQ; 2 `TablaApilable` con `label`; `data-label` en las 33 celdas | igual | Coincide. |
| Build | `astro build` completa y genera la página; proyección Markdown generada | «no se ejecutó build» | Era cierto en su sesión. Yo lo ejecuté y compila. |

**Distribución por H2 (mi conteo frente al target del brief, tolerancia ±15 %)**

| Sección | Real | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 236 | 250 | −5,6 % |
| H2-1 Qué es y por qué un perro mayor… | 571 | 650 | −12,2 % |
| H2-2 Qué mirar en casa | 670 | 700 | −4,3 % |
| H2-3 Pruebas | 772 | 800 | −3,5 % |
| H2-4 Estadios y tratamiento | 627 | 700 | −10,4 % |
| H2-5 Protegerlo de los flebotomos | 882 | 900 | −2,0 % |
| Cierre y FAQ | 517 | 550 | −6,0 % |
| **Total** | **4.275** | **4.550** | **−6,0 %** |

Todas las secciones están dentro de tolerancia. Aun así, los dos H2 más cortos (H2-1 y H2-4) son los que más lastre de relleno cargan (P1-1).

**Detalles de la ejecución del script del repo:** `metricas.mjs` devuelve «NO APTO (3 bloqueantes)», pero los tres son de formato del script: no interpreta la tabla de targets de este brief, no encuentra el cuadro de fuentes en forma de `AlertBox` (el artículo usa `div data-editorial-bibliography`, igual que `golpe-de-calor-perros-mayores.mdx`) y no interpreta la tabla de trazabilidad. No son defectos del artículo. El script tampoco ve los enlaces internos como defecto: los cinco están presentes.

## Hallazgos

### P0

Ninguno. Comprobado uno a uno el §9.6 (ver tabla más abajo) y busqué fuga de contrato (segunda persona al redactor, «el brief», «fuente N», corchetes): no hay.

### P1

**P1-1. Relleno administrativo repetido en cinco H2 (363 palabras, 9 párrafos).**
Ubicación (líneas del MDX): 64 y 66 (todo el H3 «Qué llevar a la primera conversación»), 107 y 109 (revisión de cinco puntos), 161 y 163 (pruebas), 207 y 209 (revisiones), 215 (otras enfermedades).
Evidencia: la misma idea («lleva los informes / anota fechas / conserva copia / pregunta qué falta / sal de consulta con una fecha») aparece al menos 14 veces con distinto envoltorio. Ejemplos: línea 66 «Lleva también la lista de enfermedades conocidas y medicamentos actuales»; 159 «Lleva los informes completos»; 163 «Conserva una copia de cada informe»; 207 «Lleva una hoja sencilla con las tomas indicadas»; 215 «Lleva los tratamientos y suplementos anotados». Sin esos nueve párrafos el texto queda en ≈3.912 palabras por mi método (3.835 por el del redactor, es decir, por debajo del mínimo 3.868): el volumen se sostiene en parte con esto.
Por qué es un problema real: `calidad-editorial-adsense.md` §1 pide que cada H2 aporte una decisión distinta y que el porcentaje de distribución no justifique relleno; el §9.1 del brief repite «sin relleno». El H3 de la línea 62 está fuera de lugar en un H2 cuyo objetivo es «de qué enfermedad se habla y por qué la edad cambia lo que se ve».

**P1-2. La columna «Qué no te dice» de la tabla de pruebas no dice lo que promete, y 4 de 5 celdas usan un eufemismo que `tono.py` no detecta.**
Ubicación: líneas 144-148 (tabla de pruebas). El mismo giro «deja(n) pendiente/abierta» aparece también en 50, 105 y 249.
Evidencia (celdas literales): «Deja pendiente valorar los órganos afectados.» · «Su resultado aislado deja pendiente confirmar o estudiar el caso.» · «Encontrarlo deja pendiente establecer la afectación clínica.» · «Las alteraciones necesitan pruebas para aclarar su causa.» Son negaciones disfrazadas («no confirma», «no resuelve») y abstractas: un lector no sabe qué limitación concreta tiene cada prueba. Las fuentes dan limitaciones concretas que el artículo ya cita en prosa: tests rápidos no recomendados con cuadro clínico compatible (S1, Figura 1) y no detectan bien la infección subclínica (S3); una PCR positiva confirma infección, no enfermedad (S2); niveles bajos de anticuerpos exigen más pruebas (S2); en subclínicos los anticuerpos pueden tardar en aparecer (S3).
Por qué es un problema real: el recurso contratado (§11, «Prueba / Para qué sirve / Qué no te dice») es la aportación propia del H2-3; con celdas vagas no cumple su utilidad y, además, esquiva la guía de voz (regla 2, afirmativo primero).

**P1-3. Gate de recursos del §11 abierto: nada de lo contratado como recurso visual existe.**
Ubicación: frontmatter (sin `heroImage`/`heroImageAlt`) y cuerpo (sin imágenes, sin animación, sin infografía).
Evidencia: ver tabla «Recursos» más abajo. El redactor lo declara con exactitud y el texto no promete ni referencia ninguno (búsqueda de «animación, infografía, imagen, ilustración, vídeo, descarga, gráfico, figura, calendario visual»: 0 menciones que apunten a un recurso inexistente; los resultados de «foto» y «figura» son consejos al lector).
Por qué es un problema real: el §9.7 declara bloqueantes los recursos visuales y el §11 los define como gate de publicación. No es un fallo del redactor (retiró `heroImage` como manda el §11), pero el artículo no cumple el contrato completo hasta producirlos o hasta que el propietario retire el contrato visual.

### P2

**P2-1. Cabré se cita con «siete u ocho años»; el artículo de Cabré dice «mayores de 8 años».** Línea 56. Cabré 2021, Introducción: «a second peak observed in dogs older than 8 years» (citando otro trabajo). El «desde los siete años» es de Miranda (línea 54). Separar: Miranda, desde los siete; Cabré, tras los ocho (y «mayores» = más de 8 en su estadística, ya bien citado en la línea 58).

**P2-2. Fuenlabrada: se omite el dato que el brief pedía conservar («baja prevalencia canina»).** Líneas 44-46. Alten 2016 dice: brote humano desde 2009, «nearly 600 cases mainly recorded in Fuenlabrada», «in contrast to a low prevalence of CanL», con lagomorfos como reservorio inusual. El texto afirma «Hay transmisión documentada» y «existe transmisión en ese entorno» apoyándose en capturas de insectos, sin decir que la prevalencia canina era baja ni que lo documentado es un brote humano. El brief (§6 H2-1) pedía marcar «no es un dato canino». Corregir con una frase que diga que es un foco atípico con baja prevalencia canina.

**P2-3. «Enfoque integrado» de LeishVet, presentado como recomendación vigente.** Línea 265. LeishVet 2011: «The future for CanL control should be an integrated approach… with an effective canine vaccine…». Es una aspiración condicionada a una vacuna eficaz, en un texto de 2011. La segunda frase («Plantea ambas cuestiones en la misma consulta…») es consejo del redactor sin fuente. Atribuir con fecha («en 2011 planteaba…») o quitar.

**P2-4. «La selección depende del estadio, la función renal y las demás enfermedades.»** Línea 195. La guía AEMPS liga el tratamiento al estadio (Tabla 1) y manda seguir IRIS en los estadios III-IV; «las demás enfermedades» no figura. Retirar el último elemento o atribuirlo al criterio del veterinario.

**P2-5. Subclínicos: se omite que la guía admite inmunomoduladores a criterio del veterinario.** Líneas 129 y FAQ 3. La frase «no necesita tratamiento específico» es exacta; la guía añade «aunque son susceptibles de recibir tratamientos inmunomoduladores… a criterio del clínico». Un tutor al que su veterinario le proponga uno puede sentir contradicción. Añadir una cláusula sin nombrar fármacos ni pautas («tu veterinario puede valorar medidas de apoyo»).

**P2-6. Salvedades por delante del dato.** Ejemplos: línea 239, «las horas de mayor actividad observadas en un estudio no se convierten en una franja universal de seguridad»; línea 249, «Sus resultados describen aquellas observaciones y dejan pendiente valorar otras zonas»; línea 257, «Sus resultados describen ese contexto, no una eficacia individual ni un calendario nacional». Son legítimas por contenido, pero cierran párrafos con la negación y la repiten. Versión afirmativa de la 257: «Es un dato de una clínica de Ourense: sirve para plantear la pregunta, no para fijar tu calendario».

**P2-7. H3 por encima de 200 palabras.** «Las señales que describen las guías» (293, incluye la tabla de unas 110), «La revisión de cinco puntos» (227, incluye la lista) y «¿Cuándo empiezo y cuándo termino?» (208, incluye la lista de tres posturas). Pesan por componentes, no por prosa; solo conviene vigilarlo si se amplía.

**P2-8. Firma de IA y portada genéricas sin imágenes.** La proyección Markdown y el HTML muestran «Ilustraciones generadas con IA» (byline global) en un artículo sin ilustraciones, y `og:image` cae a `/images/home/perro-senior-hero-cama-ortopedica.webp`. Se resuelve al producir los recursos; hasta entonces es incoherente.

**P2-9. Bibliografía irregular.** Solo LeishVet lleva DOI (línea 273); Miranda y Cabré lo llevan en la URL pero no en el texto. Sin fecha de comprobación de las fuentes en el expediente del redactor (el brief la daba el 2026-10-24).

**P2-10. «La información consultada no ofrece…» / «Las fuentes consultadas no ofrecen…».** Líneas 263 y FAQ 5. Es voz del proceso, no de la guía; el contenido (laguna 2 del brief) es correcto. Reformular atribuyendo: «Ni la guía de la AEMPS, ni LeishVet ni ESCCAP dan resultados de vacunación por edad».

## Verificación de las diez fuentes (fuente → afirmación → localización → comprobación)

Abrí cada fuente yo mismo el 2026-10-24. S1 por PDF binario guardado con `WebFetch` y `pdftotext`; S2, S3, S6 por texto extraído; S5 por la copia de acceso abierto de la UAB; S7 por texto completo de Europe PMC (PMC mostró reCAPTCHA); S8 y S9 por HTML y PDF; S10 solo la página.

| # | Fuente (H2 donde se cita por nombre) | Afirmación del artículo | Localización en la fuente | Resultado |
|---|---|---|---|---|
| S1 | AEMPS/MAPA 2026 (Intro, H2-2, H2-3, H2-4). Portada: logos de Ministerio de Agricultura y AEMPS/Sanidad; «Autor: PRAN» | Infección ≠ enfermedad; subclínico no necesita tratamiento específico; análisis y orina rutinarios; descartar otras causas; tests rápidos no recomendados con cuadro compatible; periodicidad «anual o bianual en función del nivel de riesgo»; cuatro estadios; pronóstico bueno → reservado → desfavorable; comorbilidades (diabetes, hipotiroidismo, tumores); dos fármacos con efecto distinto; vigilancia con orina y ecografía; estadio I: vigilancia o tratamiento | p. 4, Fig. 1, p. 5, Tabla 1 y notas, p. 7 | **Confirmado.** Atribución a MAPA respaldada por el logo de portada. Reserva: P2-4 («demás enfermedades») y P2-5 (inmunomoduladores). Estadio II: «Bueno – reservado» (coincide con lo que dice el redactor). |
| S2 | LeishVet 2011 (H2-2, H2-3, H2-4, H2-5) | Enfermedad renal puede ser única manifestación y ERC es causa principal de mortalidad; título alto con signos compatibles es concluyente; controles cada 3-6 meses en seropositivos sanos; cribado «al menos cada 12 meses» si el tutor lo desea; mejoría en el primer mes; tratados pueden seguir infectados y ser infecciosos, en menor grado; revisión tras el primer mes y cada 3-4 meses el primer año; serología no antes de los 6 meses; dentro de casa del anochecer al amanecer; collares y spot-on | Clinical signs; Diagnosis (seguimiento); Treatment/Prognosis; Table 6; Prevention | **Confirmado.** Matiz: el texto dice «vast majority» mejoran en el primer mes; el artículo escribe «muchos» (prudente, correcto). Reserva: P2-3 (enfoque integrado). |
| S3 | ESCCAP 2012 (H2-1, H2-3, H2-5) | Perros, principal reservorio; mayoría de inmunocompetentes protegidos; serología tardía; tests rápidos limitados en subclínicos; collares/pipetas/aerosoles estrategia más prometedora; casa del anochecer al amanecer y mosquiteras; abril–octubre/noviembre y variación por año y región; vacuna registrada para animales no infectados | Texto extraído, secciones de diagnóstico, control y salud pública | **Confirmado.** El artículo no traslada pautas ni prevalencias. Aviso: la vacuna que describe ESCCAP (2012) no es necesariamente la del EPAR de S10; el artículo las pone juntas sin afirmar que sean la misma, lo cual es correcto. |
| S4 | Miranda et al. 2008 (H2-1) | Dos picos; el segundo desde los siete años; serie de Barcelona | Resumen (Europe PMC): 390 perros; pico principal 2–4 años, secundario ≥7 años | **Confirmado** solo por resumen (verificación parcial declarada en el brief). El artículo no cita sexo, razas ni cifras. |
| S5 | Cabré et al. 2021 (H2-1, H2-2, H2-4) | Tres centros de Cataluña; 25 mayores de ocho años; más alteraciones sistémicas/renales y menos de piel en mayores que en jóvenes; hipótesis inmunitaria; no comparó la respuesta al tratamiento | Resumen, Métodos, Resultados; Introducción | **Confirmado**, con P2-1 («siete u ocho»). Autores y DOI coinciden (Cabré, Planellas, Ordeix, Solano-Gallego; Vet Rec 2021; Europe PMC). |
| S6 | Alten et al. 2016 (H2-1, H2-5) | Fuenlabrada entre los puntos; riesgo potencial mayor de junio a octubre; sin riesgo aparente de diciembre a marzo; exposición entre mayo y octubre; actividad nocturna; un único punto español | Resumen y Resultados | **Confirmado** («June–October, 97 % relative vector density»; «early May to late October for more than 99 % of values»; «11 pm and 2 am»). El artículo no cita las horas, correcto. Reserva: P2-2. |
| S7 | Olmeda et al. 2024 (H2-1, H2-5) | Veinte años; clínica de O Barco de Valdeorras; «área de alto riesgo»; más prevención ↔ menos casos nuevos; retrospectivo, una clínica, patrocinio de Elanco | Resumen, Resultados, Discusión, Acknowledgements | **Confirmado** (rs −0,56 y −0,52, 21,65 %, patrocinio). El artículo no cita ninguna cifra; usa «coincidían», no «redujo». |
| S8 | OCV vía Europa Press 2024 (H2-5) | Evitar paseos nocturnos y usar mosquiteras; proteger todo el año; fuente secundaria | Nota del 31 de mayo de 2024 | **Confirmado.** El artículo no usa la cifra de «385.000 perros» que sí trae la nota. Atribución a «nota de 2024» y a fuente secundaria correcta. |
| S9 | AEMPS/CIMAVet, spot-on con permetrina (H2-5) | Duraciones distintas por parásito; ninguna protege al 100 %; muy tóxica para gatos; lavado con champú o jabón; evitar que laman | 3.2, 3.3, 3.4, precauciones | **Confirmado** («repelente dos semanas e insecticida una frente a flebotomos»; «No usar en gatos…»; «lave al gato con champú o jabón y consulte con un veterinario inmediatamente»). Sin marca en el cuerpo. |
| S10 | EMA, vacuna (H2-5) | Existe una vacuna autorizada en la UE | Página EPAR | **Confirmado** («This medicine is authorised for use in the European Union», vacuna recombinante). Solo la página; no se abrió la ficha técnica, y el artículo no afirma nada más. |

Hay además una comprobación de identificadores: DOI de Miranda resuelve a Elsevier (200); DOI de Cabré devuelve 403 en Wiley pero Europe PMC lo resuelve al título, autores y año correctos; EMA 200. Ninguna autoría o año inventados.

## Seguridad clínica del §9.6, ítem por ítem

| Ítem | Resultado |
|---|---|
| Sin dosis, duraciones ni pautas de fármacos; sin marcas | **Cumple.** Los únicos intervalos son de seguimiento (primer mes, 3-6 meses, 12 meses, seis meses), que el brief autoriza. «Elanco Animal Health» es el patrocinador declarado, no un producto. «Letifend» y «Piretrón» no aparecen en el texto; «letifend» aparece solo en la URL del enlace a la EMA. |
| Sin cifras de creatinina, UPC, título ni prevalencia | **Cumple.** «Veinte años» y «25 perros» son tamaños de estudio. |
| «Pueden seguir infectados» | **Cumple** (línea 197 y FAQ 1), con «aunque menos que antes». No hay «suelen» ni «a menudo». |
| «Anual o bianual» literal, sin glosar | **Cumple** (línea 167 y FAQ 4). |
| Calendario: tres posturas atribuidas, sin afirmar «todo el año» como regla | **Cumple** (líneas 245-251 y FAQ 7). La OCV aparece como «recomienda», con fuente secundaria, y la decisión se deja a la clínica. |
| Vacuna: solo existencia y no infectados | **Cumple** (líneas 261-265, FAQ 5). Sin edad, pauta ni eficacia. |
| Gatos y permetrina | **Cumple** (AlertBox `warning`, líneas 269-275 y FAQ 6). |
| Umbral de urgencia como criterio editorial | **Cumple** (línea 119). |
| Cataluña/Barcelona/Ourense no presentados como España general | **Cumple.** Cada dato lleva su lugar (líneas 44-58, 189, 257). |
| Sin lista de razas de riesgo | **Cumple.** Ninguna raza aparece en el texto. |
| Tratamiento «actúa contra» el parásito, sin prometer eliminación | **Cumple** (línea 195). La FAQ 1 dice «se puede controlar». |
| Ningún positivo como diagnóstico de enfermedad; infección y enfermedad definidas al abrir | **Cumple** (párrafo 1). |

## Componentes, enlaces y frontmatter

- **Frontmatter:** `z.strictObject`: solo `title`, `seoTitle`, `metaDescription` (158 ≤ 160), `pilar` (`salud-perros-mayores`, válido), `keywordPrincipal`, `datePublished`. Sin `status` (default), sin `legacyUrl`/`dateModified`. Idéntico al del brief salvo `heroImage`/`heroImageAlt`, que se retiran por la regla del §11.
- **Imports:** `AlertBox`, `FAQ`, `TablaApilable` con rutas `../../components/...` válidas desde `src/content/blog/`. Desde su ubicación actual en `docs/` no compilan, como declara el redactor. En mi copia, con el MDX en `src/content/blog/`, compila.
- **`TablaApilable`:** prop requerida `label: string` presente en ambas; `<table>` con `caption`, `thead` con `scope="col"` y `data-label` en las 33 celdas.
- **`AlertBox`:** tipos válidos (`info`, `danger`, `warning`).
- **FAQ:** 7 preguntas, las del brief; cerradas por defecto (`<details>` sin `open`).
- **Enlaces internos:** `/salud-perros-mayores`, `/salud-perros-mayores/chequeo-geriatrico-canino`, `.../vacunas-desparasitacion-perros-senior`, `.../sindrome-cushing-perros-mayores` y `/herramientas/calculadora-calidad-vida-perros` existen en `src/content/blog` y `src/pages/herramientas`. Un enlace por destino.
- **Proyección Markdown:** generada (`article--leishmaniosis-perros-mayores.md`, 32.551 bytes). Tablas, lista numerada, FAQ y bibliografía se proyectan. Los `AlertBox` salen como `###` con su título; el de gatos queda tras el H3 «Si convivís con un gato», dos títulos seguidos (efecto del componente, no del texto).
- **Build:** primera ejecución falló en el hook `agent-readiness-discovery` solo porque mi copia no era un repo git; con `git init` en la copia, `astro build` termina con exit 0 y genera 36 documentos.

## Español de España, voz y procedencia

- Tuteo y vosotros («si convivís», «pasáis», «vuestra zona», «os turnáis», «utilizad»). 0 usted, ustedes, voseo o americanismos detectados. Vocabulario peninsular («mosquiteras», «terraza», «pipeta», «analítica», «colegio veterinario provincial»).
- Fuentes españolas presentes: AEMPS y MAPA, Valdeorras, Cataluña, OCV. Formato numérico español.
- Guía sin caso declarada en el párrafo 4 de la apertura. Sin Luna ni Dakota, sin paciente, sin recuperación inventada, sin credenciales veterinarias.
- Autoría «Equipo Cuida a tu Perro Viejo», la misma línea que el resto del sitio; sin credencial inventada.
- Voz: empatía breve al abrir H2 difíciles (líneas 113 y 193). Las salvedades por delante del dato son P2-6.

## Recursos prometidos y pendientes

El texto no anuncia ni referencia ningún recurso inexistente. Estado frente al §11:

| Recurso | Ruta prevista | Prueba pedida por el brief | Resultado |
|---|---|---|---|
| Tabla de señales | MDX, `TablaApilable` | 390 px sin desbordamiento | **Creada.** Estructura y `data-label` verificados; el comportamiento a 390 px no se midió (ver «sin abrir»). |
| Tabla de pruebas | MDX, `TablaApilable` | 390 px; sin cifras de corte | **Creada**, sin cifras. Contenido de la tercera columna: P1-2. |
| Imagen 1 hero, imagen 2 anochecer, imagen 3 análisis de sangre | `public/images/blog/leishmaniosis-perros-mayores/` | Revisión imagen por imagen a 390 px; senior rasgo por rasgo | **Pendiente de producir.** Ni la carpeta existe. |
| Recorte transparente del mestizo | `mestizo-senior-recorte-perfil.webp` | Alfa real; sobre `#ffffff` y `#1a1a1a` a 390 px; rasgo por rasgo | **Pendiente de producir.** |
| Animación «Revisión de cinco puntos» | `src/components/article/` | Sin autoplay, controles ≥ 44 px, teclado, `prefers-reduced-motion`, alternativa sin JS/impresión, ≤ ~900 px en móvil, claro/oscuro | **Pendiente de producir.** La lista numerada del H3 ya contiene la información. |
| Infografía «Calendario de riesgo» | componente SVG/HTML, sin perro | Texto por fila, apilada en móvil, atribuciones visibles | **Pendiente de producir.** Las tres posturas constan en texto atribuido. |
| Enlaces externos oficiales | URLs de §3 | Abrir cada uno | **Abiertos hoy**: AEMPS, ESCCAP, CIMAVet, OCV, EMA, LeishVet, Alten, Valdeorras (Europe PMC) y los dos DOI responden o resuelven; el DOI de Cabré da 403 en Wiley y se resolvió por Europe PMC. |

Regla que sigue vigente al producirlos: **el requisito senior de cinco rasgos** (`direccion-visual-editorial.md`): canas en hocico, cejas y párpados; ojos algo hundidos con párpados caídos; línea dorsal ligeramente hundida con menos masa en hombros y cuartos traseros; postura natural de perro mayor; ninguna enfermedad inventada. Se inspecciona imagen por imagen, y cada recorte y fotograma, a ~390 px y sobre fondo claro y oscuro. Sujeto fijo: mestizo de tipo pastor-mastín, hembra de 12-13 años, atigrado oscuro con pecho y calcetines blancos; collar gris liso sin marca. Cuando existan, el texto debe remitir a la animación y a la infografía en los H3 que el brief indica, y entonces la firma «Ilustraciones generadas con IA» dejará de ser incoherente (P2-8).

## Informe del redactor: qué es cierto y qué no

| Afirmación del informe | Resultado |
|---|---|
| SHA-256 del MDX | **Cierta.** |
| 4.198 palabras, secciones y desviaciones | **Cierta en lo que importa.** Suma interna correcta (231+564+641+757+621+872+512). Mi método da 4.275. Ambas cifras están dentro del rango. |
| Media 38,7 / mediana 39 / 1,3 % de párrafos >50 | **Cierta.** |
| `tono.py` 0 muletillas | **Cierta**, con la salvedad de P1-2. |
| 54 / 158 caracteres | **Cierta.** |
| 3 AlertBox, 2 TablaApilable, 7 FAQ, `data-label` en todas las celdas | **Cierta.** |
| «Sin dosis, duración, marcas, cifras» y «anual o bianual» literal | **Cierta.** |
| Trazabilidad S1–S10 | **Cierta.** Las diez están citadas por nombre en su H2 (ver tabla). |
| «No se ejecutó build, proyección Markdown ni navegador» | **Cierta en su sesión.** Hoy el build y la proyección funcionan; el navegador sigue sin ejecutarse. |
| «PMC devolvió una comprobación de navegador para LeishVet y Valdeorras» | **Parcialmente inexacta hoy:** LeishVet y Alten se abrieron sin problema con un cliente HTTP normal; solo PMC11218365 mostró reCAPTCHA (Europe PMC sirvió el texto completo). No cambia ninguna afirmación del artículo, pero esas fuentes sí eran verificables. |
| Recursos omitidos, sin promesa | **Cierta** (ver tabla). |

No encontré ninguna afirmación del informe que contradiga el estado real del archivo.

## Lo que sí funciona (no tocar al corregir)

- **La distinción infección/enfermedad** de la apertura y del H3 «La diferencia que decide si hay tratamiento»: el valor propio del artículo. Intacta frente a la fuente.
- **El calendario honesto** (líneas 243-251 y FAQ 7): tres posturas con fecha y alcance, el estudio de campo con su límite (un punto español), la OCV como fuente secundaria, y la decisión a la clínica. No se ablandó pese a que el inventario titulaba «todo el año».
- **Los límites clínicos del H2-4:** cuatro estadios sin cifras, tratamiento descrito como «un medicamento que actúa contra el parásito y otro que frena su multiplicación», «pueden seguir infectados», «no la suspendas ni la alargues por tu cuenta». Es el pasaje donde más presión había para dar pautas y no se dio ninguna.
- **«Anual o bianual»** entre comillas y sin glosa, con el consejo de pedir a la clínica una fecha concreta.
- **El aviso de gatos y permetrina** (AlertBox `warning`, párrafos 273-275 y FAQ 6): preciso, fiel a la ficha y sin marca.
- **El tratamiento de las fuentes con límites:** Miranda por resumen y sin razas ni sexo; Cabré con «25 perros» y «asociación, no destino»; Valdeorras con patrocinio, retrospectivo y verbo «coincidían»; ninguna cifra de Cataluña u Ourense como nacional.
- **La tabla de señales** (líneas 80-93): columna «Qué puede significar» con causas alternativas y atribuida como ayuda editorial.
- **Voz y localización:** vosotros y vocabulario peninsular, empatía breve al abrir los H2 difíciles, cero muletillas del detector.
- **Estructura MDX:** imports, componentes, bibliografía en `div data-editorial-bibliography` y FAQ al final: compila y proyecta bien.

## Qué corregir, en orden

Quien corrija debe hacerlo en una sesión aparte y no auditar el resultado. Orden obligatorio: **primero sustituir el relleno (1), después revisar volumen (2)**, porque borrar sin sustituir deja el texto en el mínimo del rango.

1. **P1-1. Sustituir los nueve párrafos de relleno (líneas 64, 66, 107, 109, 161, 163, 207, 209, 215).** Dejar una sola vez, en un único lugar, el consejo de llevar informes y anotar fechas (propuesta: la revisión de cinco puntos o el cierre). Eliminar el H3 «Qué llevar a la primera conversación». Cubrir el hueco, si hace falta volumen, solo con contenido útil que ya está en las fuentes y no se usa: medidas ambientales de ESCCAP y LeishVet (retirar basura y materia orgánica, apilamientos de leña y piedras junto a la casa, mosquiteras en puertas y camas); la advertencia de la ficha de que un baño reduce la protección del producto; qué distingue seguimiento de cribado. Si tras ello el total queda bajo 3.868 palabras, proponer por escrito un ajuste del target con su razón, sin falsear el conteo (`calidad-editorial-adsense.md` §1).
2. **P1-2. Reescribir la columna «Qué no te dice»** (líneas 144-148) con limitaciones concretas de las fuentes (ver P1-2) y en afirmativo; retirar «deja pendiente» de las líneas 50, 105 y 249. Verificar de nuevo con `tono.py` y a mano.
3. **P1-3. Producir los recursos del §11**, con la skill `crear-animaciones-articulo-blog` y la `direccion-visual-editorial.md`, y auditarlos en una ronda aparte. Si el propietario decide publicar sin ellos, debe modificarse antes el contrato (§9.7 y §11) de forma explícita; no se pasa por alto.
4. **P2-1 a P2-5** en una sola pasada (cambios de una frase cada uno): separar Miranda y Cabré en la edad; añadir «foco atípico con baja prevalencia canina» a Fuenlabrada; datar y condicionar el enfoque integrado de LeishVet; ajustar «las demás enfermedades»; añadir la cláusula sobre inmunomoduladores sin nombrarlos.
5. **P2-6 a P2-10** cuando se toque el archivo: salvedades en afirmativo, DOI homogéneos en la bibliografía, reformulación de «la información consultada», revisar H3 si se amplía y comprobar la firma de IA al incorporar imágenes.

Antes de integrar en `src/content/blog/`: `npx astro build` y revisar la proyección Markdown; medir cada recurso nuevo a 390 y 1366 px y registrar la altura (`apoyos-visuales-responsive.md`); pedir la R2 de esta auditoría sobre el MDX corregido, con su nuevo SHA-256.

### Prompt cerrado para la sesión de corrección

> Corrige `docs/contenido/leishmaniosis-perros-mayores/articulo-borrador.mdx` (SHA-256 `ebe2107047bc262c60a49896b397a6471f51269f5b7d82959396238368db7406`) a partir de `docs/contenido/leishmaniosis-perros-mayores/auditoria-articulo-r1.md` (R1). No audites tu propio resultado. Orden: (1) sustituir el relleno administrativo de las líneas 64, 66, 107, 109, 161, 163, 207, 209 y 215 (363 palabras), eliminando el H3 «Qué llevar a la primera conversación» y dejando el consejo de «lleva informes y anota fechas» una sola vez; si hace falta volumen, usa solo contenido de las fuentes ya citadas (medidas ambientales de ESCCAP y LeishVet, efecto de los baños sobre la protección según la ficha CIMAVet); si queda por debajo de 3.868 palabras, redacta una propuesta razonada de ajuste del target, no falsees el conteo; (2) reescribe la columna «Qué no te dice» de la tabla de pruebas con limitaciones concretas y en afirmativo, y elimina «deja pendiente/abierta» (líneas 50, 105, 144-146, 249); (3) aplica los P2-1 a P2-5 de una frase cada uno; (4) mantén intacto todo lo de «Lo que sí funciona». No añadas dosis, duraciones, marcas, cifras de creatinina, UPC, título o prevalencia, ni listas de razas. No referencies recursos que no existan. Al terminar, ejecuta `python3 -I .agents/skills/references/scripts/tono.py` sobre una copia, comprueba que compila con `npx astro build` en una copia con el MDX en `src/content/blog/` y entrega el nuevo SHA-256.

## Qué quedó sin abrir

- **Apariencia móvil y escritorio:** no se capturó el artículo a 390 y 1366 px ni se midieron alturas, ni modo oscuro, ni teclado en las tablas y la FAQ. La validación fue de estructura (HTML generado, `data-label`, `role="region"`, `<details>` cerrados) y de compilación.
- **Imágenes, recorte, animación e infografía:** no existen; no hubo nada que inspeccionar. La comprobación senior de cinco rasgos queda íntegra para cuando existan.
- **Ficha técnica de la vacuna (EMA):** solo la página EPAR; ni el PDF ni la ficha. El artículo no afirma nada más allá de la existencia.
- **Miranda 2008:** solo resumen (Europe PMC); el texto completo no se abrió, como declara el brief.
- **PDF de la AEMPS:** texto completo extraído; leí en detalle las pp. 3-7 y el extracto del anexo (Tabla 2 y notas); no leí la parte felina más que para descartar su uso.
- **ESCCAP y LeishVet:** comprobé cada afirmación del artículo con búsquedas dirigidas sobre el texto completo, no con lectura lineal.
- **Documentos del repo no releídos en esta ronda:** `src/pages/politica-editorial.astro`, `direccion-visual-editorial.md` y `apoyos-visuales-responsive.md` (los dos últimos solo por cita de AGENTS.md y de la skill; no aplican con cero recursos visuales).
- **Publicación real:** no se comprobó ninguna URL pública ni despliegue; el artículo no está en `src/content/blog/` del worktree.
- **Una sola ronda hecha (R1 de 3).** Esta auditoría no sustituye a la R2 sobre la versión corregida.
