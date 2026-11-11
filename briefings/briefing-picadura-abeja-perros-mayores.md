# 📋 BRIEF DE CONTENIDOS TÉCNICO: Picadura de abeja en perros mayores: qué hacer en casa y cuándo ir al veterinario

**Sitio:** cuidatuperroviejo.com | **Pilar:** Salud de Perros Mayores | **Tipo:** Artículo spoke (Astro/MDX) | **Versión:** v4, 2026-11-12 (corrige las auditorías R1, R2 y R3; `docs/contenido/picadura-abeja-perros-mayores/auditoria-brief-r1.md`)

**Origen del encargo:** el propietario vivió la picadura de Dakota la noche del 2026-11-11, la documentó con fotos durante la noche y la mañana siguiente, y pidió el briefing el 2026-11-12. Expediente con relato, fotos y vídeo: `docs/experiencias/dakota-picadura-abeja-2026-11-11/`.

**Estado:** **APTO CON RESERVAS en R4/5** (auditoría independiente sobre `ab81a4b`, `docs/contenido/picadura-abeja-perros-mayores/auditoria-brief-r4.md`). Las tres reservas P2 (R4-1 a R4-3) se aplicaron después como ajustes literales sin cambio de contenido. Listo para redactar.

> [!NOTE]
> **Estado:** texto redactado en `src/content/blog/picadura-abeja-perros-mayores.mdx` el 2026-11-12 (solo texto, 4.229 palabras; imágenes pendientes con marcadores `{/* IMAGEN … */}`). Auditoría del artículo: R2/5 PUBLICABLE CON RESERVAS (texto), reservas aplicadas (`docs/contenido/picadura-abeja-perros-mayores/auditoria-articulo-r2.md`). Pendiente: imágenes y gates de §11. No fusionar en `main` antes.

---

## 1. DATOS, METADATOS Y FRONTMATTER MDX

| Campo | Valor |
|---|---|
| **Título H1** | Picadura de abeja en perros mayores: qué hacer en casa y cuándo ir al veterinario |
| **Título SEO (seoTitle)** | Picadura de abeja en perros: qué hacer y cuándo ir (50 caracteres, contados con `len()`) |
| **Keyword Principal** | picadura de abeja en perros |
| **Keywords Secundarias** | a mi perro le picó una abeja · perro picado por abeja en la pata · cómo sacar el aguijón a un perro · reacción alérgica picadura perro · qué darle a mi perro por una picadura de abeja (se responde «nada sin llamar al veterinario»; nunca con pauta) |
| **Slug** | `picadura-abeja-perros-mayores` |
| **Meta descripción** | A mi perro le picó una abeja: qué hacer, qué no darle y qué señales vigilar. Lo que vivimos con Dakota, nuestra beagle senior, y cuándo ir a urgencias. (151 caracteres, contados con `len()`) |
| **Ruta Relativa** | `/salud-perros-mayores/picadura-abeja-perros-mayores` |
| **Pilar** | Salud de Perros Mayores |
| **Ruta Pilar** | `/salud-perros-mayores` |
| **Intención Principal** | Urgente/resolutiva — al perro le acaba de picar una abeja y el cuidador necesita saber qué hacer ahora y si debe correr al veterinario. |
| **Intención Secundaria** | Informacional — entender qué es normal en las horas siguientes, qué medicamentos no dar por su cuenta y por qué la siguiente picadura merece un plan. |
| **Objetivo Global** | 4.450 palabras (rango 3.780–5.120); justificado abajo, no es requisito de AdSense |
| **Fecha brief** | 2026-11-12 |

**Justificación del volumen:** el tema tiene una respuesta urgente corta (primeros 10 minutos) y cinco decisiones distintas que hoy no cubre ningún artículo del sitio: distinguir reacción local de anafilaxia, buscar el aguijón en una pata, qué medicación no improvisar, cómo vigilar las horas siguientes y qué plan tener para la próxima picadura. Con 4.450 palabras se cubren sin relleno. El criterio de 5.000–6.000 palabras sigue pendiente de decisión del propietario (ver `TODO.md`, «Volumen de las skills»). Si el propietario lo pide, se amplía dentro de los mismos H2 y sin fuentes ni afirmaciones nuevas, como se hizo en procesionaria v2.

**Variante de idioma:** español neutro (guía de voz, regla 1). No es de la serie España: el caso ocurrió en casa del propietario y el producto usado es mexicano.

### Bloque de Frontmatter MDX

```yaml
---
title: "Picadura de abeja en perros mayores: qué hacer en casa y cuándo ir al veterinario"
seoTitle: "Picadura de abeja en perros: qué hacer y cuándo ir"
metaDescription: "A mi perro le picó una abeja: qué hacer, qué no darle y qué señales vigilar. Lo que vivimos con Dakota, nuestra beagle senior, y cuándo ir a urgencias."
pilar: "salud-perros-mayores"
keywordPrincipal: "picadura de abeja en perros"
heroImage: "/images/blog/picadura-abeja-perros-mayores/beagle-senior-pata-almohadilla-revision.webp"
heroImageAlt: "Ilustración de una beagle tricolor senior tumbada en su cama ortopédica mientras su cuidador le revisa con suavidad la almohadilla de una pata delantera."
status: "Publicado"
datePublished: "AAAA-MM-DD"
---
```

`pilar` comprobado en `src/content.config.ts` (enum `salud-perros-mayores`). La fecha se pone al guardar el `.mdx`. La firma de Gonzalo y la declaración de IA las monta el layout: no duplicarlas. Si al final la portada es una fotografía real de Dakota (decisión del propietario, ver §8), cambiar el `heroImageAlt` para que diga «Fotografía de Dakota…» y añadir `heroImageCaption` con la fecha.

---

## 2. PROCEDENCIA DEL MATERIAL Y VALOR PROPIO

**Tipo:** EXPERIENCIA_APORTADA (a), con fotografías y vídeo del propietario.

**Procedencia:** relato del propietario dictado por voz durante la noche del 2026-11-11 y la mañana del 2026-11-12, en esta misma sesión. Expediente: `docs/experiencias/dakota-picadura-abeja-2026-11-11/README.md`, con 13 fotos (`foto-01` a `foto-13`), la foto del blíster del analgésico (`blister-analgesico.jpg`) y un vídeo de 18 s (`video-01.mov`).

**Relato depurado (limpieza de transcripción, Fase 1.4):** se quitaron muletillas («¿verdad?», «pues», «este») y se ordenaron los hechos. No se añadió ningún dato. Las correcciones de dictado fueron «Cox-11 / Cox-II» y «Quirón / Corión», que el blíster resuelve como **COX-II 1 mg, Kirón México**.

> Dakota, nuestra beagle nacida en 2014, dormía en su cama ortopédica cuando una abeja le picó en una pata. Se despertó moviendo la pata y vimos caer la abeja al suelo; ya se iba a morir, pero igual la matamos. Le revisamos la pata y no encontramos hinchazón ni aguijón; no sabíamos si le había picado por encima o en las almohadillas. Le dimos una tableta de un antiinflamatorio veterinario con meloxicam que teníamos en casa. Después solo se lamía las patas.
>
> Más tarde vimos por dónde le había picado: una de las almohadillas estaba roja, sin aguijón a la vista. Seguía lamiéndose, pero vino a buscarnos para que la acariciáramos. Con caricias en el pecho y la panza se quedaba tranquila y hasta se ponía panza arriba; en cuanto dejábamos de acariciarla, volvía a lamerse la pata. Aprovechaba para lamérsela incluso mientras le acariciábamos el pecho.
>
> A las 10:02 de la noche ya había dejado de lamerse y se quedó dormida a nuestros pies, en el suelo y no en su cama, quizá por el calor. Roncaba.
>
> A la mañana siguiente, a las 10:37, estaba normal: la pata sin hinchazón, caminando por toda la casa, salió afuera, ladró un rato y vino a pedirnos comida. Estuvo tranquila incluso con Rookie, el gatito, al que normalmente tolera poco.

**Hechos documentados y límites:**

| Hecho | Fuente en el expediente | Límite |
|---|---|---|
| Picadura en una pata, mientras dormía en su cama ortopédica, en Costa Rica | Relato; país, decisión D3 del propietario | No se vio la picadura; se dedujo por la abeja en el suelo y la pata. |
| Almohadilla enrojecida, sin aguijón visible | Relato, segunda revisión | No se sabe si el aguijón quedó dentro. |
| Una tableta de COX-II 1 mg (meloxicam), Kirón México, registro Q-0790-005 | Relato + `blister-analgesico.jpg` | Recetado por su veterinario para episodios de dolor; sus veterinarios saben que lo tiene en casa y le preguntan por él (D1). |
| Peso 20–23 kg, con sobrepeso | Relato | Estimación del propietario, no pesada en báscula ese día. |
| Hora de las primeras fotos: 9:02 p. m. | Reloj visible en `foto-01` | La hora exacta de la picadura no consta. |
| Dormida y roncando a las 10:02 p. m. | Relato | — |
| Normal a las 10:37 a. m. del 2026-11-12, sin veterinario | Relato + `foto-11` a `foto-13` + vídeo | No hubo exploración veterinaria. |

**Decisiones del propietario (resueltas el 2026-11-12):**

- **D1 — Origen del meloxicam: recetado.** Sus veterinarios se lo han recetado a Luna y a Dakota en varias consultas por dolor: verrugas o bultos que se reventaban, la vez que Dakota se mordió la pata arrancándose una verruga y su episodio de displasia de cadera, cuando no se podía mover. Los veterinarios le preguntan si lo tiene en casa y según el propietario, le indicaron que ante un dolor puntual puede darles una tableta, por pocos días, y que si el dolor es mucho, vayan a consulta. El propietario lo guarda para emergencias (caída, golpe o herida) y renueva el blíster antes de que caduque. **Cómo se cuenta:** «el antiinflamatorio que su veterinario ya le había recetado para episodios de dolor y que sabe que tenemos en casa». **No se publican** la cantidad de días que mencionó el propietario («menos de 5, 3 como máximo»), la potencia, el número de tabletas como pauta ni la marca: son indicaciones individuales para sus perras, no una pauta para el lector.
- **D2 — Fotos reales: autorizadas** («las que ocupes»), con los recortes de §8.
- **D3 — País: Costa Rica**, se puede decir. Úsalo en la Introducción o en H2-3 una vez, y en H2-2 para dar contexto a las abejas africanizadas, que son las de la región, sin inventar datos locales (no hay fuente costarricense en §3). El español sigue siendo neutro.

**Texto original de las decisiones antes de resolverlas:**

- **D1 — Origen del meloxicam.** ¿Se lo había recetado un veterinario a Dakota (por ejemplo, para la artrosis) o era un medicamento que había en casa? Cambia cómo se cuenta: «el antiinflamatorio que su veterinario ya le había recetado» o «un antiinflamatorio que teníamos en casa, cosa que no volveríamos a hacer sin llamar antes». En ningún caso se publican dosis, mg/kg ni la potencia como pauta para el lector (política editorial y calidad editorial §4). La marca comercial tampoco se nombra en el artículo.
- **D2 — Fotos reales.** ¿Autoriza publicar fotos de Dakota recortadas para que no se vea el interior de la casa ni a personas? Selección propuesta en §8.
- **D3 — País.** ¿Se puede decir en qué país ocurrió? Hoy el brief no lo dice y el artículo tampoco debe hacerlo sin autorización.

**Declaración para el lector:** al abrir la Introducción, una línea en cursiva: *«Lo que contamos aquí lo vivimos con Dakota, nuestra beagle senior nacida en 2014, la noche del 11 de noviembre de 2026. Es una experiencia doméstica, no un caso clínico: no la vio un veterinario. Las ilustraciones son generadas con IA; las fotografías de Dakota se identifican como tales en su pie.»*

**Pregunta del lector y respuesta práctica:** «A mi perro le acaba de picar una abeja: ¿qué hago, qué le doy y cuándo me preocupo?». Respuesta: saca el aguijón rápido y como puedas, frío local, vigila 30 minutos sin dejarlo solo, ve a urgencias ante cualquier señal sistémica, no le des medicación humana, y apunta lo que pasó porque la próxima picadura puede ser peor.

**Aportación propia** (lo que no ofrecen las páginas genéricas sobre picaduras):

1. **Cronología real de una reacción local en una perra senior**, con fotos con hora: qué se ve a la hora, a las tres horas y a la mañana siguiente. Sirve como referencia de «esto es lo normal».
2. **Qué se sabe de la siguiente picadura, sin exagerar:** en el estudio de Zúrich, de los 24 perros alérgicos cuya primera reacción solo afectó a la piel de forma generalizada (ronchas, enrojecimiento o hinchazón por el cuerpo), 10 tuvieron una reacción sistémica grave al volver a ser picados (Chapman et al., 2024). El estudio **no incluye reacciones solo locales** como la de Dakota, y para ellas no hay dato canino. Con eso se arma una **ficha para la próxima picadura**, justificada por su utilidad: si un día la reacción es distinta, el veterinario tendrá el registro de la anterior.
3. **Buscar el aguijón en una pata**, el segundo sitio de picadura más frecuente en ese estudio (28 %). Es justo donde le picó a Dakota.
4. **Medicación honesta:** contamos lo que hicimos y explicamos por qué un antiinflamatorio no se improvisa en un perro mayor, con la guía de la FDA.

**Diferencia con artículos del sitio:** procesionaria trata una toxina de contacto y su urgencia; golpe de calor, una urgencia ambiental. Ninguno cubre picaduras de himenópteros ni anafilaxia. Sin canibalización (comprobado en `INVENTARIO_CONTENIDO.md` el 2026-11-12: no hay ningún artículo ni entrada de catálogo sobre picaduras, abejas, avispas o alergias).

**Hilo narrativo:** Dakota es el hilo principal y es quien cierra el artículo. Luna sale solo de fondo en alguna foto. Rookie, el gato, aparece en el cierre como señal de vuelta a la normalidad. No hay otro desenlace que repartir.

**Arco:**
- **Apertura (Introducción):** Dakota despertando de golpe en su cama, moviendo la pata, y la abeja en el suelo.
- **Desarrollo (H2-3):** la búsqueda del aguijón, la almohadilla roja, las lamidas y las caricias, hora a hora.
- **Cierre (H2-6):** la mañana siguiente, pidiendo comida con Rookie al lado; y el límite: no la vio un veterinario y la próxima picadura puede ser distinta.

---

## 3. FUENTES CIENTÍFICAS DE AUTORIDAD (SOURCE-FIRST)

> [!IMPORTANT]
> Las seis fuentes se comprobaron el 2026-11-12. Para las de PubMed, identificador y resumen se leyeron con NCBI E-utilities (`efetch`), no de memoria. El estudio de Zúrich se leyó a texto completo en Europe PMC (PMC11591281). La página del Manual Merck y la de la FDA se abrieron y se citaron frases literales. Se descartó una séptima candidata, Quantz et al. 2009 (edema de vesícula biliar en la anafilaxia canina), porque no se pudo confirmar su PMID ni su autoría.

1. **Fitzgerald KT, Flood AA. «Hymenoptera stings». *Clin Tech Small Anim Pract*. 2006;21(4):194-204.** PMID [17265905](https://pubmed.ncbi.nlm.nih.gov/17265905/), DOI 10.1053/j.ctsap.2006.10.002. Comprobado 2026-11-12 (resumen).
   - *Datos clave (resumen):* las abejas pierden el aguijón con arpón al picar, mientras que avispas y avispones pueden picar varias veces. Hay cuatro tipos de reacción: local, regional, anafilaxia sistémica y, con menos frecuencia, hipersensibilidad tardía. En una picadura de abeja o avispa lo típico es eritema, edema y dolor en el sitio. Los signos anafilácticos graves «suelen aparecer en los 10 minutos siguientes a la picadura». La anafilaxia no depende de la dosis ni del número de picaduras. La dosis letal estimada en envenenamiento masivo es de ≈20 picaduras/kg en la mayoría de los mamíferos. Las picaduras sin complicación se tratan de forma conservadora (antihistamínicos, frío o compresas frescas, lidocaína o corticoide tópicos) y la mayoría se resuelven en unas horas sin tratamiento. Todos los animales picados deben vigilarse de cerca.
   - *H2:* H2-1, H2-2. *Límites:* es una revisión narrativa de 2006 y solo se leyó el resumen. Los tratamientos que cita son de uso veterinario: no se convierten en pautas para el lector.

2. **Visscher PK, Vetter RS, Camazine S. «Removing bee stings». *Lancet*. 1996;348(9023):301-2.** PMID [8709689](https://pubmed.ncbi.nlm.nih.gov/8709689/), DOI 10.1016/s0140-6736(96)01367-0. Comprobado 2026-11-12 (resumen).
   - *Dato clave (resumen, «Findings»):* el tamaño del habón, y con él la cantidad de veneno, aumentó a medida que se tardaba en quitar el aguijón, «incluso en pocos segundos». No hubo diferencia entre rasparlo o pellizcarlo a los 2 s. Interpretación de los autores: hay que insistir en quitarlo rápido, sin preocuparse por el método.
   - *H2:* H2-1. *Límites:* es un estudio en personas, con muy pocos voluntarios. Se usa solo para la mecánica del aguijón de abeja, que es la misma sea cual sea el animal picado. No se extrapolan resultados clínicos a perros.

3. **Shmuel DL, Cortes Y. «Anaphylaxis in dogs and cats». *J Vet Emerg Crit Care*. 2013;23(4):377-94.** PMID [23855441](https://pubmed.ncbi.nlm.nih.gov/23855441/), DOI 10.1111/vec.12066. Comprobado 2026-11-12 (resumen).
   - *Datos clave (resumen):* la anafilaxia es una reacción de hipersensibilidad tipo I, sistémica y con frecuencia mortal. Puede desencadenarla, entre otros, el veneno de insectos. El diagnóstico es clínico, por reconocimiento de un patrón de signos. La adrenalina (epinefrina) es el fármaco de elección; fluidos, antihistamínicos H1/H2, corticoides y broncodilatadores son coadyuvantes y «no sustituyen a la adrenalina».
   - *Datos sin verificar en el texto completo:* que en el perro los órganos más afectados sean el hígado y el tubo digestivo procede de resúmenes secundarios, no del resumen leído. **El redactor no lo afirma como dato de esta fuente** salvo que se lea el texto completo. Las señales de alarma se apoyan en la tabla 2 de Chapman et al. 2024 (ver H2-2); la diarrea no se añade.
   - *H2:* H2-2, H2-4. *Límites:* es una revisión clínica para veterinarios. Sirve para explicar por qué un antihistamínico casero no resuelve una anafilaxia, no para indicar ningún tratamiento.

4. **Chapman E, West EA, Kosnik M, Fischer NM, Favrot C, Beeler L, Rostaher A. «Natural History and Risk Factors of Hymenoptera Venom Allergy in Dogs». *Animals (Basel)*. 2024;14(22):3220.** PMID 39595273, PMCID [PMC11591281](https://pmc.ncbi.nlm.nih.gov/articles/PMC11591281/), DOI [10.3390/ani14223220](https://doi.org/10.3390/ani14223220). Texto completo leído en Europe PMC, 2026-11-12. La URL de MDPI devolvió 403, que es un bloqueo de acceso y no una referencia falsa.
   - *Datos clave (localización):*
     - Estudio retrospectivo de 178 perros picados por himenópteros y atendidos en el Hospital Veterinario de la Facultad Vetsuisse de Zúrich entre 2018 y 2022 (resumen).
     - Sitio de picadura documentado en 163 perros: cara 39 %, **pata 28 %**, boca 21 % (Resultados, 3.1).
     - Factores asociados a reacciones sistémicas graves en el análisis multivariable: picadura en la boca (OR 2,62), menos de 2 años (OR 2,11), menos de 10 kg (OR 2,06), raza pura (OR 2,43) y **enfermedades concurrentes en el momento de la picadura (OR 4,48; IC 95 % 1,28–15,71)** (Resultados, 3.3).
     - Historia natural en los 43 perros con picaduras posteriores (Resultados, 3.2): de los 24 con reacción leve la primera vez, 14 (58 %) volvieron a tener una reacción leve y **10 (42 %) tuvieron una reacción sistémica grave (SSR, grados 2–3)**. **Atención: en este estudio «leve» es el grado 1 de anafilaxia de la tabla 2 («Skin: generalized erythema, urticaria and/or angioedema»), en perros diagnosticados de alergia al veneno; no es una reacción local en el sitio de la picadura.**
     - Tabla 2 (grados de anafilaxia): grado 1, piel (eritema generalizado, urticaria, angioedema); grado 2, digestivo o respiratorio («dyspnea, stridor, wheeze, nausea, vomiting and/or abdominal pain»; la diarrea no figura); grado 3, cardiovascular o neurológico (palidez, cianosis, colapso, pérdida de consciencia). Es el sustento de los signos de la AlertBox `danger` de H2-2. De los 19 con reacción moderada o grave, 12 (63 %) la repitieron igual o peor.
     - La mediana de edad fue 1,7 años (rango 0,2–14,7). En personas, la mayor edad aumenta el riesgo (Discusión).
   - *H2:* H2-2 (signos, tabla 2), H2-3 (pata), H2-5 (próxima picadura, enfermedades concurrentes, edad). *Límites:* es una población hospitalaria de referencia, con sesgo hacia los casos graves. El seguimiento de picaduras posteriores es de solo 43 perros. La población es joven, así que **no hay dato canino de que la edad avanzada aumente el riesgo**: el redactor solo puede decir que en personas sí ocurre y que en perros no se ha estudiado bien. Las enfermedades concurrentes son una asociación, no una causa demostrada.

5. **Nagy AL. «Wasp, Bee, and Ant Stings to Animals». *Merck Veterinary Manual* (versión profesional), revisión completa de abril de 2026; revisado por Brutlag A.** [URL](https://www.merckvetmanual.com/toxicology/bites-and-stings-from-spiders-scorpions-and-insects/wasp-bee-and-ant-stings-to-animals). Leída el 2026-11-12.
   - *Datos clave (sección):*
     - «Clinical Signs of Wasp and Bee Stings»: el veneno causa dolor e hinchazón locales en minutos. El aguijón de la abeja melífera puede quedar clavado y formar un absceso. Las reacciones locales se resuelven rápido («within minutes») salvo que haya una reacción grave.
     - «Treatment of Wasp and Bee Stings»: retirar el aguijón si es posible, control del dolor, compresa fresca y antihistamínicos según necesidad. En anafilaxia grave, «more aggressive treatment» (fluidos intravenosos, corticoides, adrenalina, antihistamínicos).
     - Abejas africanizadas: pueden producir decenas o cientos de picaduras. Signos de envenenamiento masivo: parálisis facial, ataxia, convulsiones, orina o heces con sangre. Requiere soporte intensivo.
   - *H2:* H2-1, H2-2, H2-3, H2-4. *Límites:* es un manual profesional. Que mencione antihistamínicos no autoriza a dar uno sin indicación veterinaria: el redactor lo explica en H2-4.

6. **U.S. Food and Drug Administration (FDA), Center for Veterinary Medicine. «Get the Facts about Pain Relievers for Pets».** «Content current as of: 09/29/2022». [URL](https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-about-pain-relievers-pets). Leída el 2026-11-12.
   - *Datos clave (sección):*
     - «Over-the-Counter NSAIDs for People»: «los perros no son personas pequeñas»; un AINE humano puede no ser seguro en perros.
     - «What Should You Do?»: no dar ningún medicamento sin hablar con el veterinario. Vigilar vómitos, diarrea, heces negras o con sangre, menos apetito, menos actividad y color amarillo en ojos o encías.
     - «Side Effects»: úlceras y perforaciones digestivas, fallo renal y fallo hepático.
     - «Side Effects in the Digestive Tract»: no dar dos AINE juntos ni un AINE con un corticoide como la prednisona.
     - «Monitor Dogs on Long-Term NSAIDs»: análisis de hígado y riñón antes de un tratamiento largo y después de forma periódica.
   - *H2:* H2-4. *Límites:* es una guía estadounidense. Los análisis se refieren al uso prolongado; para una toma puntual el redactor no inventa un requisito de análisis, solo explica por qué en un perro mayor conviene llamar antes.

**Lagunas documentadas:**
- No hay estudios sobre cómo evolucionan las picaduras en perros senior en concreto. El artículo lo dice y no rellena el hueco.
- No hay evidencia canina sobre qué remedio casero es mejor (bicarbonato, vinagre, etc.). No se recomienda ninguno.
- No se encontró un estudio canino que compare métodos para sacar el aguijón. Se usa Visscher por la mecánica del aguijón, declarando que es un estudio en personas.

---

## 4. REQUISITOS TÉCNICOS DE ASTRO Y MDX

* **Importaciones obligatorias**, en la primera línea del cuerpo:
  ```mdx
  import AlertBox from '../../components/AlertBox.astro';
  import FAQ from '../../components/FAQ.astro';
  ```
* Sin `#` H1 en el cuerpo. Párrafos de 3 líneas como máximo en el móvil. Un H3 cada 150–200 palabras.
* **Imágenes anti-CLS:** `<img src="/images/blog/picadura-abeja-perros-mayores/{{nombre}}.webp" alt="…" width="1200" height="675" loading="lazy" decoding="async" />`. Las fotos reales verticales de Dakota usan `width="1200" height="1600"` o un recorte 4:3 (`1200×900`); declarar las dimensiones reales del archivo final.
* **TOC, JSON-LD, breadcrumbs y widget de valoración:** los monta el layout; no añadirlos.
* **Voz:** [guía de voz y tono](../.agents/skills/references/guia-voz-tono.md); medir con `python3 .agents/skills/references/scripts/tono.py src/content/blog/picadura-abeja-perros-mayores.mdx`, con un objetivo de ≤ 3 muletillas por cada 1000 palabras. La experiencia de Dakota va en primera persona del plural («nos asustamos», «le dimos»).

---

## 5. ENLAZADO INTERNO OBLIGATORIO (INTERLINKING)

Rutas comprobadas el 2026-11-12 en `INVENTARIO_CONTENIDO.md` y en el `pilar`/`status` de cada `.mdx`. Antes de tocar enlaces, revisar `src/data/internal-links.ts` y la skill `enlazado-interno-sitio`.

| Tipo | Texto ancla | URL | Dónde | Estado |
|---|---|---|---|---|
| **Pilar** | salud de los perros mayores | `/salud-perros-mayores` | Introducción | ✅ Publicado |
| **Spoke 1** | qué hacer si tu perro toca una procesionaria | `/salud-perros-mayores/procesionaria-pino-perros` | H2-2 (otras urgencias por contacto) | ✅ Publicado |
| **Spoke 2** | golpe de calor en perros mayores | `/salud-perros-mayores/golpe-de-calor-perros-mayores` | H2-1 (no dejarlo solo al sol o en el coche mientras lo vigilas) o H2-2 | ✅ Publicado |
| **Spoke 3** | chequeo geriátrico | `/salud-perros-mayores/chequeo-geriatrico-canino` | H2-4 (análisis antes de un antiinflamatorio) | ✅ Publicado |
| **Puente** | su cama ortopédica | `/movilidad-dolor-perros-mayores/cama-ortopedica-perros-mayores-displasia-artrosis` | Introducción (dónde dormía Dakota) | ✅ Publicado |
| **Puente** | cómo darle una pastilla a tu perro | `/cuidados-paliativos-perros/como-dar-medicacion-perro` | H2-4 (si el veterinario pauta algo) | ✅ Publicado |
| **Calculadora** | calculadora de calidad de vida | `/herramientas/calculadora-calidad-vida-perros` | H2-5 (perros mayores con varias enfermedades) | ✅ Publicado |

---

## 6. ESTRUCTURA DETALLADA Y PRESUPUESTO DE PALABRAS

> **Target total: 4.450 palabras** (350 + 650 + 700 + 600 + 650 + 600 + 350 + 550). Desviación máxima de ±15 % por sección.

### INTRODUCCIÓN — Target: ~350 palabras

**Objetivo:** dar la respuesta urgente en las primeras líneas y abrir la historia de Dakota.

* **Línea de procedencia en cursiva** (§2, «Declaración para el lector»).
* **Párrafo 1 — Respuesta inmediata:** antes de la historia, tres acciones en una frase o una lista corta: quita el aguijón ya, frío en la zona y vigílalo sin dejarlo solo. Remitir a la lista de alarma de H2-2.
* **Párrafo 2 — Apertura del arco:** Dakota dormía en su [cama ortopédica](/movilidad-dolor-perros-mayores/cama-ortopedica-perros-mayores-displasia-artrosis), se despierta moviendo la pata y ven caer la abeja. Contar el susto sin dramatizar. Solo hechos del relato.
* **Párrafo 3 — Qué encontrará el lector:** qué es normal, qué es urgencia, qué no darle y el plan para la próxima vez. Enlazar al pilar de [salud de los perros mayores](/salud-perros-mayores).
* **AlertBox info:**
  ```mdx
  <AlertBox type="info" title="Si estás leyendo esto con tu perro al lado">
    [Borrador para el redactor: respirar; la mayoría de las picaduras se quedan en hinchazón y dolor locales y pasan en horas (Fitzgerald y Flood); quédate con él la próxima media hora y ten a mano el teléfono del veterinario o de urgencias.]
  </AlertBox>
  ```

---

### H2-1 — Qué hacer en los primeros 10 minutos — Target: ~650 palabras
* *Sustentado en:* Visscher et al. 1996 (rapidez frente a método); Fitzgerald y Flood 2006 (aguijón con arpón de la abeja, frente a avispas que pican varias veces; ventana de 10 minutos); Manual Merck (retirar el aguijón, compresa fresca).
* *Objetivo:* una secuencia que se pueda seguir con el perro delante.

* `### Saca el aguijón cuanto antes, como puedas`
  * El aguijón de abeja queda clavado con su saco de veneno y sigue inyectando. Cuanto antes se quita, menos veneno entra, aunque sea cuestión de segundos (Visscher). Raspar o pellizcar da igual; lo que importa es la rapidez. Desmontar el mito de «nunca con pinzas» sin dramatizar.
  * Declarar en una frase que el estudio se hizo en personas y que lo que se aplica es la mecánica del aguijón.
  * Si fue una avispa, no hay aguijón que buscar y puede picar más de una vez (Fitzgerald).
* `### Cómo buscarlo en el pelo y entre los dedos`
  * Buena luz, separar el pelo, puntito negro. En la pata: entre los dedos y alrededor de cada almohadilla. Conectar con H2-3, donde está lo de Dakota.
  * Si no lo encuentras, no hurgues ni aprietes la zona.
* `### Frío local y calma`
  * Compresa fresca o paño húmedo frío unos minutos, con una tela entre el hielo y la piel (Merck; Fitzgerald recoge el frío en el manejo conservador).
  * Que no corra ni se agite. Si estás en la calle, sombra y agua; enlazar a [golpe de calor](/salud-perros-mayores/golpe-de-calor-perros-mayores) solo si encaja (perro mayor esperando al sol).
* `### Los 10 minutos que importan`
  * Fitzgerald: los signos graves suelen empezar en los primeros 10 minutos. Instrucción concreta: mira la cara, las encías y cómo respira, y no lo dejes solo al menos 30 minutos. Esa media hora es un margen prudente del artículo, no una cifra de la fuente; redactarlo así.
* **Lista resumen** (para que se lea en el móvil): 1) aguijón fuera, 2) frío, 3) calma, 4) vigilar la cara, las encías y la respiración, 5) teléfono a mano.

---

### H2-2 — Reacción normal o urgencia: las señales que no esperan — Target: ~700 palabras
* *Sustentado en:* Fitzgerald y Flood 2006 (cuatro tipos de reacción; la anafilaxia no depende del número de picaduras; ≈20 picaduras/kg en envenenamiento masivo); Shmuel y Cortes 2013 (anafilaxia como diagnóstico clínico; adrenalina como tratamiento de elección); Chapman et al. 2024, tabla 2 (signos por grado de anafilaxia); Manual Merck (abejas africanizadas, signos de envenenamiento masivo).
* *Objetivo:* que el lector distinga en casa lo que puede vigilar de lo que exige salir ya.

* `### Lo esperable: dolor, hinchazón y lamidas en la zona`
  * Enrojecimiento, hinchazón y dolor en el sitio; lamerse; levantar la pata. Suele ceder en minutos u horas: Merck habla de minutos y Fitzgerald de unas horas; decir «de minutos a unas horas» y citar las dos. Una reacción «regional» puede hinchar más allá del sitio, por ejemplo toda la pata o media cara: hay que consultar el mismo día.
* `### Anafilaxia: qué es y por qué no se trata en casa`
  * Reacción alérgica de todo el cuerpo, que puede ser mortal. Su tratamiento es la adrenalina, que pone el veterinario, y los antihistamínicos no la sustituyen (Shmuel y Cortes). No depende de cuántas picaduras: una sola basta (Fitzgerald).
  * No afirmar qué órganos se afectan en el perro como dato de Shmuel (ver límite en §3).
* `### Cuando son muchas picaduras`
  * Enjambres y abejas africanizadas: decenas o cientos de picaduras. Envenenamiento con convulsiones, tambaleo, parálisis facial y orina o heces con sangre (Merck). Siempre es urgencia, aunque parezca estar bien. Mencionar la dosis letal de ≈20/kg como dato de Fitzgerald, sin convertirla en un umbral para quedarse en casa.
  * Enlazar a [procesionaria](/salud-perros-mayores/procesionaria-pino-perros) como otra urgencia por contacto en paseos.
* **AlertBox danger** (lista cerrada, en lenguaje de cuidador):
  ```mdx
  <AlertBox type="danger" title="Ve a urgencias ya si notas cualquiera de estas señales">
    [Borrador: hinchazón de la cara, el hocico o la garganta; ronchas por el cuerpo; respiración difícil o ruidosa; vómitos o dolor de barriga tras la picadura; desmayo o encías pálidas; picadura dentro de la boca; muchas picaduras; tambaleo o convulsiones. Llama mientras vas.]
  </AlertBox>
  ```
  * Fuentes de cada signo: ronchas, hinchazón de cara y garganta, respiración difícil o ruidosa, vómitos o dolor abdominal, encías pálidas, colapso o desmayo (Chapman et al. 2024, tabla 2, grados de anafilaxia; la diarrea no está en esa tabla y no se añade a la lista); picadura en la boca (Chapman, análisis de riesgo, H2-5); muchas picaduras, tambaleo y convulsiones (Merck). Shmuel y Cortes sostiene el diagnóstico clínico y la adrenalina, no la lista de signos. El redactor no añade signos que no estén en estas fuentes.

---

### H2-3 — La pata de Dakota: lo que vimos hora a hora — Target: ~600 palabras
* *Sustentado en:* experiencia aportada (§2); Chapman et al. 2024 (la pata es el 28 % de los sitios de picadura documentados); Manual Merck (aguijón que se queda clavado y puede formar absceso).
* *Objetivo:* **desarrollo del arco.** Mostrar una reacción local real con hora y fotos, y lo que hay que revisar los días siguientes.

* `### La primera revisión: nada a la vista`
  * Le miramos la pata y no encontramos hinchazón ni aguijón. No sabíamos si había sido por encima o en la almohadilla. Dato de Chapman: la pata es uno de los sitios más frecuentes.
  * Foto real: `foto-05` (§8).
* `### La almohadilla roja y las lamidas`
  * La segunda revisión: la almohadilla roja, sin aguijón visible. Las lamidas mientras le acariciábamos el pecho («una sinvergüenza», palabra del propietario; se puede usar con cariño). Foto `foto-10`.
  * Explicar por qué una almohadilla molesta tanto, sin cifras ni anatomía no respaldadas: el redactor no añade datos de inervación que no estén en las fuentes. Basta con lo observado: «le dolía y se lo decía a su manera».
* `### 10:02 p. m.: dormida y roncando`
  * Una hora después de las primeras fotos dejó de lamerse y se durmió en el suelo fresco. **No atribuir la mejoría al meloxicam como causa**: es una observación doméstica. Redactarlo como «no sabemos si fue el antiinflamatorio, el frío del suelo o que la reacción iba bajando sola».
* `### Qué revisar en los días siguientes`
  * Un aguijón que se queda dentro puede infectarse y formar un absceso (Merck): bulto que crece, calor, pus o dolor que va a más a los 2 o 3 días → veterinario.

---

### H2-4 — Antiinflamatorios y antihistamínicos: qué no improvisar — Target: ~650 palabras
* *Sustentado en:* FDA (AINE humanos, efectos secundarios, no combinar con corticoides, análisis en tratamientos largos); Manual Merck (los antihistamínicos aparecen en el tratamiento veterinario); Shmuel y Cortes (los antihistamínicos no sustituyen a la adrenalina).
* *Objetivo:* contar con honestidad lo que hicimos y dar al lector un criterio seguro. Sin dosis.

* `### Lo que hicimos nosotros, y lo que haríamos distinto`
  * Decisión D1 resuelta: Dakota tomó una tableta del antiinflamatorio veterinario (meloxicam) que su veterinario ya le había recetado por otros episodios de dolor, entre ellos su displasia de cadera, y que, según el propietario, sus veterinarios saben que tiene en casa (le preguntan si lo tiene) para dar una tableta ante un dolor puntual. Contarlo sin marca, miligramos, mg/kg ni días de tratamiento.
  * El mensaje para el lector: lo hicimos así porque su veterinario ya conocía a Dakota y nos había dado esa indicación; no sabemos si la tableta influyó. Si tu perro no tiene una indicación así, llama antes de darle nada, aunque tengas el mismo medicamento en casa. Pide a tu veterinario un plan para emergencias como el nuestro.
  * Mencionar que Dakota pesa 20–23 kg y tiene sobrepeso solo si ayuda a explicar por qué la dosis la decide el veterinario. Nunca como cálculo.
* `### Por qué un analgésico de persona puede hacer daño`
  * FDA: «los perros no son personas pequeñas». Ibuprofeno, naproxeno, paracetamol y aspirina no se dan sin indicación.
  * Riesgos de los AINE: estómago e intestino (úlceras), riñón e hígado. En un perro mayor importan más; enlazar al [chequeo geriátrico](/salud-perros-mayores/chequeo-geriatrico-canino) para los análisis.
* `### ¿Y un antihistamínico?`
  * El veterinario puede indicarlo (Merck), pero la dosis y el producto los decide él: algunas presentaciones humanas llevan otros principios activos. Shmuel y Cortes: en una anafilaxia no sustituye a la adrenalina, así que no sirve para quedarse en casa si hay señales de alarma. **No nombrar marcas ni dosis.** No afirmar que algunas pastillas humanas contienen xilitol u otros compuestos salvo que se añada una fuente verificada; si no, limitarse a «algunas pastillas combinan otros principios activos».
* `### Señales de que la medicación le está sentando mal`
  * Lista FDA: vómitos, diarrea, heces negras o con sangre, menos apetito, menos actividad, color amarillo en ojos o encías. Con cualquiera, parar y llamar.
  * Si el veterinario pauta algo y tu perro no se toma las pastillas, enlazar a [cómo darle una pastilla a tu perro](/cuidados-paliativos-perros/como-dar-medicacion-perro).
* **AlertBox warning:**
  ```mdx
  <AlertBox type="warning" title="Antes de darle cualquier medicamento">
    [Borrador: si tu veterinario no te dio una indicación previa para tu perro, llámalo antes de darle un medicamento que tengas en casa; nunca le des analgésicos de persona; no juntes dos antiinflamatorios ni un antiinflamatorio con cortisona; si toma medicación crónica o tiene enfermedad renal, hepática o digestiva, díselo al veterinario por teléfono.]
  </AlertBox>
  ```

---

### H2-5 — Por qué la próxima picadura importa más — Target: ~600 palabras
* *Sustentado en:* Chapman et al. 2024 (historia natural; factores de riesgo, incluidas las enfermedades concurrentes; edad en personas frente a perros).
* *Objetivo:* la aportación propia del artículo, convertir lo vivido en un plan.

* `### Lo que encontró el estudio de Zúrich`
  * 178 perros alérgicos al veneno atendidos en un hospital de referencia. De los 24 cuya primera reacción solo afectó a la piel de forma generalizada (ronchas, enrojecimiento o hinchazón por el cuerpo) y que volvieron a ser picados, 10 tuvieron una reacción sistémica grave. Decir el número absoluto, que «leve» en el estudio ya es una reacción de todo el cuerpo y el límite: hospital de referencia, seguimiento de solo 43 perros.
  * Mensaje: si tu perro tuvo alguna vez ronchas o hinchazón por el cuerpo tras una picadura, la siguiente puede ser peor y conviene hablarlo con el veterinario antes de que ocurra. Si fue solo en el sitio, como la de Dakota, el estudio no lo incluye y en perros no hay datos. Sin alarmismo en ninguno de los dos casos.
* `### Perros mayores con otras enfermedades`
  * Las enfermedades concurrentes se asociaron a reacciones más graves (OR 4,48): explicarlo como «los perros que ya tenían otra enfermedad tuvieron más reacciones graves», aclarando que es una asociación. La edad avanzada aumenta el riesgo en personas, pero en perros no se ha estudiado bien porque la mayoría de los perros del estudio eran jóvenes. No afirmar más.
  * Picadura en la boca, perros pequeños: mencionarlo brevemente para el lector con otros perros. Dakota pesa más de 10 kg y le picó en la pata, sin convertirlo en garantía.
  * Para un perro mayor con varias enfermedades, enlazar a la [calculadora de calidad de vida](/herramientas/calculadora-calidad-vida-perros) como herramienta para llevar un registro de su estado general antes de la consulta, sin presentarla como relacionada con la alergia.
* `### Tu ficha para la próxima picadura` (recurso del artículo)
  * Lista para copiar: fecha y hora, insecto si se vio, sitio, qué se vio y a qué hora, qué se le dio, cuándo volvió a la normalidad, y fotos con hora. Es lo que hicimos con Dakota.
  * Llevarla al próximo chequeo y preguntar al veterinario si conviene tener un plan de urgencia. Mencionar la inmunoterapia con veneno solo como algo que existe para perros con reacciones sistémicas y que decide el veterinario o el dermatólogo (Chapman la recomienda para esos perros); sin prometer resultados.

---

### H2-6 — A la mañana siguiente — Target: ~350 palabras
* *Sustentado en:* experiencia aportada (§2).
* *Objetivo:* **cierre del arco** como sección propia, no como frase suelta.

* 10:37 a. m. del 12 de noviembre: la pata sin hinchazón, caminando por toda la casa, salió afuera, ladró y vino a pedir comida. Foto `foto-12` con Rookie (§8).
* Rookie como detalle de normalidad: a Dakota normalmente le cuesta tolerarlo y esa mañana estuvo tranquila. Sin interpretarlo clínicamente.
* El límite, dicho con calma: no la vio un veterinario; fue una reacción local que pasó sola o con ayuda, y no sabemos cuál. Seguimos revisando la almohadilla y apuntamos la picadura en su ficha (enlazar mentalmente con H2-5).

---

### CONCLUSIÓN Y PREGUNTAS FRECUENTES — Target: ~550 palabras
* *Cierre (≈120 palabras):* tres ideas: rapidez con el aguijón, ojos en la cara y la respiración durante la primera media hora, y ninguna medicación sin llamar.
* **FAQ (7 preguntas):** borrador de datos estructurados; el redactor ajusta las respuestas a las fuentes de cada H2.
  ```mdx
  <FAQ items={[
    { question: '¿Cuánto tarda en bajar la hinchazón de una picadura de abeja en un perro?', answer: 'Una reacción local suele mejorar en minutos u horas (Manual Merck; Fitzgerald y Flood). Si crece, se extiende o sigue igual al día siguiente, consulta.' },
    { question: '¿Es malo que mi perro se trague el aguijón al lamerse?', answer: '[Respuesta prudente: no hay fuente que lo estudie; el riesgo práctico es el aguijón que queda en la piel (Merck, absceso). No afirmar inocuidad como dato.]' },
    { question: '¿Puedo darle a mi perro un antihistamínico de los que tomo yo?', answer: 'Solo si te lo indica tu veterinario, que decide el producto y la dosis. En una reacción grave no sustituye a la adrenalina (Shmuel y Cortes).' },
    { question: '¿Puedo darle ibuprofeno o paracetamol para el dolor?', answer: 'No. Los analgésicos de persona pueden dañar el estómago, el riñón o el hígado de tu perro (FDA).' },
    { question: '¿Qué hago si le picó dentro de la boca?', answer: 'Ve al veterinario: en el estudio de Zúrich, las picaduras en la boca se asociaron a reacciones más graves.' },
    { question: '¿Si esta vez fue leve, la próxima también lo será?', answer: 'Depende de qué fue leve. Si tuvo ronchas o hinchazón por el cuerpo, la siguiente puede ser peor: 10 de 24 perros así tuvieron una reacción grave al volver a ser picados (Chapman et al.). Si fue solo en el sitio de la picadura, no hay datos en perros; apunta lo que pasó y coméntalo con tu veterinario.' },
    { question: '¿Bicarbonato, vinagre o barro sirven para la picadura?', answer: 'No hay estudios en perros que los respalden. Lo que sí está recomendado es retirar el aguijón y aplicar frío (Merck).' }
  ]} />
  ```
  * La respuesta de la FAQ 2 (tragar el aguijón) es la pregunta que se hizo el propietario. Al no haber fuente, el redactor responde con prudencia y no la presenta como dato. La afirmación que se le dio al propietario en conversación («lo pasa sin problema») **no se publica** sin fuente.

---

## 7. POTENCIAL DE AFILIADOS / CONVERSIÓN

* Sin enlaces de afiliado en este artículo: es un tema de urgencia y un producto en medio de la lectura resta confianza. La guía de afiliación (`docs/seo/afiliacion-aliexpress.md`) empieza por el artículo de camas, no por este.
* La conversión es interna: ficha para la próxima picadura, chequeo geriátrico y calculadora.

---

## 8. GUÍA VISUAL

**Plan:** una portada ilustrada, dos ilustraciones didácticas y hasta cuatro fotografías reales de Dakota, autorizadas por el propietario (D2). Flujo: [crear-animaciones-articulo-blog](../.agents/skills/crear-animaciones-articulo-blog/SKILL.md) y [dirección visual editorial](../.agents/skills/references/direccion-visual-editorial.md). No se planifican animaciones: el artículo se entiende con imágenes estáticas y el propietario no las ha pedido.

> [!IMPORTANT]
> **Razas recientes** (registro de `direccion-visual-editorial.md`, comprobado el 2026-11-12): procesionaria, perro de aguas español; miedo a la pólvora, mestizo criollo canela, y en sus testimonios Luna y Dakota, beagles en fotografía real; petardos, bodeguero andaluz; leishmaniosis, mestizo pastor-mastín; golpe de calor, podenco. Además, la portada de `como-dar-medicacion-perro`, enlace puente de este artículo, también es beagle.
> **Raza elegida: beagle**, repetida respecto de la serie de alimentación sin dientes, poliquezia, olfato y uñas. **Motivo documentado:** el caso publicado es de Dakota, que es beagle, y el artículo lleva sus fotos reales. Una ilustración de otra raza junto a las fotos de Dakota confundiría al lector. Las ilustraciones representan a una beagle senior **ilustrativa, inspirada en el tipo de Dakota**, y no se presentan como Dakota.

> [!IMPORTANT]
> **Sujeto fijo en los 3 prompts:** `beagle hembra senior ilustrativa, tricolor (manto negro en el lomo, cabeza y orejas canela muy aclaradas, pecho, patas y punta de la cola blancos), complexión robusta con algo de sobrepeso, unos 20 kg`.

### Fotografías reales (autorizadas por el propietario, D2)

| Archivo de origen | Uso | Recorte obligatorio | Pie (borrador) |
|---|---|---|---|
| `foto-05.jpg` | H2-3, primera revisión | Solo la perra y la cama: fuera la consola, la tele y los muebles | *Fotografía: Dakota en su cama la noche de la picadura, 11 de noviembre de 2026.* |
| `foto-10.jpg` | H2-3, la almohadilla y las lamidas | Fuera el brazo y el suelo, o conservar solo la mano si el propietario lo prefiere | *Fotografía: Dakota lamiéndose la pata mientras le acariciábamos el pecho.* |
| `foto-12.jpg` | H2-6, la mañana siguiente | Fuera la transportadora, el escritorio, el sofá, la alfombra y los objetos personales | *Fotografía: a la mañana siguiente, pidiendo comida con Rookie al lado.* |
| `foto-02.jpg` (opcional) | Introducción | Cara y cama | *Fotografía: Dakota relamiéndose después de la picadura.* |

Comprobar en cada foto final: ninguna persona identificable, ningún documento, pantalla ni dato de la vivienda; exportar en `.webp`; alt fiel («Fotografía de Dakota, beagle tricolor senior, …»). Las fotos tienen poca luz: corregir solo exposición y balance, sin retoque que cambie lo que se ve. El vídeo (`video-01.mov`) no se publica: es solo evidencia.

### Ficha y prompts de ilustración

**Requisito senior en cada prompt (los 5 rasgos):** cabeza y orejas canela muy aclaradas y apagadas, con el hocico, las cejas y los párpados blanquecinos; ojos algo hundidos, con párpados ligeramente caídos y mirada serena, sin velo; lomo ancho y algo hundido, con la línea dorsal suavizada y menos masa en los cuartos traseros, aunque con algo de sobrepeso; postura tranquila de perra mayor, con la cabeza a la altura del lomo o más baja; sin cojera, heridas, hinchazón exagerada ni sufrimiento.

#### Imagen 1 — Portada (resolutiva)

| Decisión | Contenido |
|---|---|
| Función y sección | Portada y heroImage: enseñar el gesto central del artículo, revisar la almohadilla con calma. |
| Público y entorno | Sala doméstica latinoamericana sin país concreto: piso de baldosa de barro rojizo, cama ortopédica rectangular de espuma con funda de borrego beige y ribete gris oscuro, sofá gris al fondo desenfocado y luz de lámpara de pie. |
| Materiales | Baldosa con juntas visibles, borrego de la funda, pelaje corto y denso, paño de algodón húmedo doblado junto a la cama. |
| Sujeto | Beagle senior ilustrativa de la ficha. |
| Acción | Perra tumbada de lado sobre la cama, relajada, con una pata delantera ofrecida. El cuidador, arrodillado en el suelo junto a la cama, sostiene la pata por el carpo con una mano y con el pulgar de la otra separa con suavidad el pelo entre los dedos para mirar la almohadilla. Ni pinzas ni objetos punzantes. La perra lo mira tranquila y no tira. |
| Cámara y luz | Plano medio a la altura de la cama, ligeramente picado. Luz cálida de lámpara desde la izquierda con sombras suaves coherentes. Profundidad de campo media: pata, manos y cara de la perra nítidas; fondo suave. |
| Exclusiones y aceptación | Rechazar: dedos de más o fusionados, pata con articulación imposible, almohadillas mal colocadas, hinchazón exagerada, abeja visible o caricaturizada, aguijón gigante, perra asustada, cama de catálogo o casa estadounidense. Aceptación a 390 px: se entiende «le revisa la almohadilla»; canas sí/no, ojos sí/no, lomo sí/no, postura sí/no, sin enfermedad sí/no. |

* **Archivo:** `beagle-senior-pata-almohadilla-revision.webp`
* **Prompt:**
  ```text
  Imagen editorial para un artículo sobre picadura de abeja en perros mayores; debe permitir entender que el cuidador revisa con calma la almohadilla de una pata buscando el aguijón.
  Sujeto: beagle hembra senior ilustrativa, tricolor (manto negro en el lomo, cabeza y orejas canela muy aclaradas, pecho, patas y punta de la cola blancos), complexión robusta con algo de sobrepeso, unos 20 kg. Edad visible: hocico, cejas y párpados blanquecinos y el canela de la cabeza aclarado y apagado; ojos algo hundidos con párpados ligeramente caídos y mirada serena, sin velo; lomo ancho y algo hundido, con la línea dorsal suavizada y menos masa en los cuartos traseros; postura tranquila de perra mayor, con la cabeza apoyada a la altura del lomo; sin cojera, heridas, hinchazón exagerada ni sufrimiento.
  Entorno: sala doméstica latinoamericana sencilla, piso de baldosa de barro rojizo con juntas visibles, cama ortopédica rectangular de espuma con funda de borrego beige y ribete gris oscuro apoyada en el suelo, sofá gris desenfocado al fondo y un paño de algodón húmedo doblado junto a la cama.
  Acción: la perra tumbada de lado sobre la cama, relajada, ofrece una pata delantera; el cuidador, arrodillado en el suelo junto a la cama y de cara a ella, sostiene la pata por el carpo con la mano izquierda y con el pulgar derecho separa con suavidad el pelo entre los dedos para mirar una almohadilla ligeramente enrojecida; sin pinzas ni objetos punzantes; la perra mira al cuidador tranquila.
  Cámara a la altura de la cama, ligeramente picada, plano medio con margen alrededor de la pata y las manos; luz cálida de lámpara de pie desde la izquierda, sombras suaves coherentes; texturas de borrego, pelaje corto y denso y baldosa; profundidad de campo media, con pata, manos y cara nítidas.
  Acabado documental natural, composición cuidada, sin estética de foto de catálogo.
  Evitar: dedos de más o fusionados, articulaciones imposibles, almohadillas mal situadas, hinchazón exagerada, abeja visible o caricaturizada, aguijón gigante, gesto de dolor dramático, casa suburbana estadounidense, marcas visibles.
  Ilustración generada; no representa un paciente ni acredita un resultado clínico.
  Rechazar si a tamaño móvil parece un adulto joven.
  ```
* **Caption:** *Ilustración: busca entre los dedos y alrededor de cada almohadilla con buena luz; el aguijón de abeja es un puntito oscuro.*

#### Imagen 2 — Retirar el aguijón (educativa, H2-1)

| Decisión | Contenido |
|---|---|
| Función y sección | H2-1, «Saca el aguijón cuanto antes»: enseñar el gesto de retirarlo raspando de lado con una tarjeta. |
| Entorno | Primer plano sobre la misma funda de borrego y la baldosa. |
| Materiales | Tarjeta plástica lisa sin logotipos, pelaje blanco del dorso de la pata, aguijón pequeño y oscuro con el saco de veneno diminuto adherido. |
| Sujeto | Misma beagle; la pata en primer plano y, detrás, desenfocados pero legibles, la cabeza apoyada y parte del lomo y la cadera, para comprobar los cinco rasgos de edad. |
| Acción | Una mano sujeta la pata por el carpo y la otra desliza el canto de la tarjeta en paralelo a la piel, desde un lado del aguijón. La tarjeta toca el pelo, no se clava. |
| Cámara y luz | Plano detalle amplio (no macro extremo) a 45°, con la cabeza y el lomo dentro del encuadre; luz natural difusa de ventana desde arriba a la derecha, profundidad de campo corta centrada en el aguijón y el canto de la tarjeta. |
| Exclusiones y aceptación | Rechazar: aguijón desproporcionado, tarjeta con marca o con números, sangre, piel lacerada, pinzas, manos con 6 dedos, pata deformada. Aceptación: a 390 px se distinguen el aguijón y la dirección del raspado; además, canas sí/no, ojos sí/no, lomo sí/no, postura sí/no, sin enfermedad sí/no, comprobados en la cabeza y el lomo desenfocados del fondo. |

* **Archivo:** `beagle-senior-retirar-aguijon-abeja-tarjeta.webp`
* **Prompt:**
  ```text
  Imagen editorial para la sección «Saca el aguijón cuanto antes» de un artículo sobre picadura de abeja en perros mayores; debe permitir entender cómo se retira un aguijón raspando de lado con una tarjeta.
  Sujeto: la misma beagle hembra senior ilustrativa, tricolor (manto negro en el lomo, cabeza y orejas canela muy aclaradas, pecho, patas y punta de la cola blancos), complexión robusta con algo de sobrepeso, unos 20 kg; en primer plano el dorso blanco de una pata delantera y, detrás y desenfocados pero legibles, la cabeza apoyada y parte del lomo y la cadera. Edad visible: hocico, cejas y párpados blanquecinos y el canela aclarado y apagado; ojo visible algo hundido, con el párpado ligeramente caído y la mirada serena; lomo ancho y algo hundido, con la línea dorsal suavizada y menos masa en los cuartos traseros, visibles en el fondo; postura tumbada y tranquila de perra mayor; sin heridas, sangre, hinchazón exagerada ni sufrimiento.
  Entorno: funda de borrego beige de una cama ortopédica sobre baldosa de barro rojizo.
  Acción: una mano adulta sujeta la pata por el carpo con firmeza suave; la otra desliza el canto de una tarjeta plástica lisa, sin logotipos ni números, en paralelo a la piel, empujando de lado un aguijón pequeño y oscuro con un diminuto saco de veneno adherido; la tarjeta toca el pelo sin clavarse.
  Cámara en plano detalle amplio a 45 grados, con la cabeza y parte del lomo dentro del encuadre; luz natural difusa de ventana desde arriba a la derecha; profundidad de campo corta centrada en el aguijón y el canto de la tarjeta; texturas de pelo blanco corto y borrego.
  Acabado documental natural, sin estética de catálogo.
  Evitar: aguijón desproporcionado o caricaturizado, pinzas, sangre, piel lacerada, manos con dedos de más, pata deformada, tarjeta de crédito con marca.
  Ilustración generada; no representa un paciente ni acredita un resultado clínico.
  Rechazar si a tamaño móvil parece un adulto joven.
  ```
* **Caption:** *Ilustración: raspar o pellizcar da igual; lo que reduce el veneno es quitarlo rápido.*

#### Imagen 3 — Frío local y vigilancia (resolutiva, H2-1, al final de «Los 10 minutos que importan»)

| Decisión | Contenido |
|---|---|
| Función y sección | H2-1, al final de «Los 10 minutos que importan»: enseñar el frío local y la vigilancia de la cara durante la primera media hora. |
| Entorno | La misma sala. Lámpara de pie y, al fondo, un teléfono móvil boca abajo en el suelo junto al cuidador (teléfono a mano). |
| Materiales | Paño de algodón húmedo y frío doblado sobre la pata (sin hielo directo), baldosa y cama. |
| Sujeto | Misma beagle, tumbada en posición de esfinge, con la pata envuelta por encima con el paño. |
| Acción | El cuidador, sentado en el suelo a un lado y de frente a la perra, sostiene el paño sobre la pata con una mano y con la otra le acaricia el pecho mientras le mira la cara. Perra tranquila y despierta. |
| Cámara y luz | Plano medio desde el lado, a la altura del suelo; luz de lámpara cálida y algo de luz fría de la ventana nocturna; profundidad de campo media. |
| Exclusiones y aceptación | Rechazar: cubitos de hielo sobre la piel, cara hinchada (la imagen enseña la vigilancia, no la anafilaxia), toalla enrollada que tape la cabeza, cualquier cable enchufado cerca del paño húmedo. Aceptación: se lee «frío y vigilancia»; los 5 rasgos a 390 px. |

* **Archivo:** `beagle-senior-compresa-fria-vigilancia.webp`
* **Prompt:**
  ```text
  Imagen editorial para un artículo sobre picadura de abeja en perros mayores; debe permitir entender que, tras retirar el aguijón, se aplica frío local y se vigila la cara de la perra durante la primera media hora.
  Sujeto: la misma beagle hembra senior ilustrativa, tricolor (manto negro en el lomo, cabeza y orejas canela muy aclaradas, pecho, patas y punta de la cola blancos), complexión robusta con algo de sobrepeso, unos 20 kg. Edad visible: hocico, cejas y párpados blanquecinos y el canela de la cabeza aclarado y apagado; ojos algo hundidos con párpados ligeramente caídos y mirada serena, sin velo; lomo ancho y algo hundido, con la línea dorsal suavizada y menos masa en los cuartos traseros; tumbada en posición de esfinge sobre su cama con la cabeza baja y relajada; cara sin hinchazón, sin heridas ni sufrimiento.
  Entorno: sala doméstica latinoamericana sencilla de noche, piso de baldosa de barro rojizo, cama ortopédica de espuma con funda de borrego beige, lámpara de pie encendida y un teléfono móvil boca abajo en el suelo junto al cuidador; ningún cable enchufado cerca del paño húmedo.
  Acción: el cuidador, sentado en el suelo junto a la cama y de frente a la perra, sostiene con una mano un paño de algodón húmedo y frío doblado sobre la pata delantera de ella, sin hielo directo, y con la otra mano le acaricia el pecho mientras le mira la cara; la perra, despierta y tranquila, lo mira.
  Cámara a la altura del suelo, plano medio lateral con margen alrededor de la perra y el cuidador; luz cálida de lámpara desde la derecha y un toque de luz fría de la ventana nocturna; sombras coherentes; profundidad de campo media.
  Acabado documental natural, composición cuidada, sin estética de catálogo.
  Evitar: cubitos de hielo sobre la piel, cara o hocico hinchados, toalla que tape la cabeza, cables o aparatos eléctricos junto al paño húmedo, gesto de pánico, marcas visibles.
  Ilustración generada; no representa un paciente ni acredita un resultado clínico.
  Rechazar si a tamaño móvil parece un adulto joven.
  ```
* **Caption:** *Ilustración: frío local y la mirada en su cara; los signos graves suelen empezar en los primeros 10 minutos.*

### Recortes transparentes y animaciones que necesitan al perro
* No aplica: ningún apoyo visual necesita un recorte ni animación.

Fila del registro de razas ya añadida en `direccion-visual-editorial.md`.

---

## 9. CONTRATO DE ENTREGA — NO NEGOCIABLES

**1. Volumen:** entre **3.780 y 5.120 palabras** contadas sobre el cuerpo del `.mdx` real (4.450 ± 15 %). Si no cumple, revisar omisiones útiles o proponer un ajuste justificado; nunca rellenar.

**2. Fuentes citadas por su nombre en el cuerpo:**

| # | Fuente | H2 asignado | ¿Citada? |
|---|---|---|---|
| 1 | Fitzgerald y Flood 2006 | H2-1, H2-2 | ☐ |
| 2 | Visscher, Vetter y Camazine 1996 | H2-1 | ☐ |
| 3 | Shmuel y Cortes 2013 | H2-2, H2-4 | ☐ |
| 4 | Chapman et al. 2024 (Zúrich) | H2-2 (tabla 2), H2-3, H2-5 | ☐ |
| 5 | Manual Veterinario Merck (Nagy, 2026) | H2-1, H2-2, H2-3, H2-4 | ☐ |
| 6 | FDA, «Get the Facts about Pain Relievers for Pets» | H2-4 | ☐ |

**3. Componentes:**
- [ ] 3 `AlertBox`: `info` (Introducción), `danger` (H2-2) y `warning` (H2-4).
- [ ] 1 `FAQ` con 7 preguntas.
- [ ] Calculadora enlazada en H2-5.
- [ ] Los 7 enlaces de la §5.
- [ ] La ficha para la próxima picadura en H2-5, como lista copiable.

**4. Arco documentado:**
- [ ] Apertura en la Introducción (Dakota despierta en su cama y la abeja en el suelo).
- [ ] Desarrollo en H2-3, hora a hora.
- [ ] Cierre en H2-6 como sección propia (mañana del 12 de noviembre con Rookie), con el límite de que no la vio un veterinario.

**5. Límites clínicos (bloqueantes):**
- [ ] Sin dosis, sin mg/kg, sin la potencia, sin días de tratamiento y sin marca comercial del meloxicam.
- [ ] Sin atribuir la mejoría de Dakota al meloxicam como causa.
- [ ] Sin afirmar que tragarse el aguijón es inocuo (no hay fuente).
- [ ] Sin afirmar un mayor riesgo por edad en perros: solo en personas, con el límite.
- [x] Las decisiones D1, D2 y D3 resueltas por el propietario (2026-11-12) y reflejadas en H2-4, §8 y la Introducción.

---

## 10. CHECKLIST DE VALIDACIÓN FINAL

**De este briefing (comprobado al generarlo; queda pendiente la auditoría independiente):**
- [x] Frontmatter con `pilar: "salud-perros-mayores"`, válido en `src/content.config.ts`.
- [x] `seoTitle` de 50 caracteres y `metaDescription` de 151 (contados con `len()`).
- [x] Seis fuentes con identificador o URL profunda comprobados el 2026-11-12. Una candidata descartada por no verificable.
- [x] Enlaces internos a artículos publicados (§5).
- [x] Sin canibalización.
- [x] Suma de targets: 4.450.
- [x] Trazabilidad: las 6 fuentes tienen un H2 que desarrolla su dato clave.
- [x] Transcripción depurada sin datos añadidos; las decisiones D1–D3 están resueltas y registradas también en el expediente.

**Del artículo `.mdx` final:** ver la plantilla (importaciones, sin H1, párrafos, H3, prompts con los 5 rasgos, recuento real, fuentes citadas, componentes y enlace a la calculadora) más el bloque 5 del contrato.

---

## 11. RECURSOS PROMETIDOS Y GATE EDITORIAL

| Recurso y utilidad | Ubicación | Ruta/destino | Estado y responsable | Prueba antes de publicar |
|---|---|---|---|---|
| Ficha para la próxima picadura (lista copiable en el propio texto) | H2-5 | En el cuerpo del `.mdx`; sin PDF | Planificado · redactor | Que se lea completa en el móvil; no prometer descarga |
| 3 ilustraciones | Portada y H2-1 (dos) | `public/images/blog/picadura-abeja-perros-mayores/` | Planificado · producción visual | Abrir cada `.webp`, comprobar los 5 rasgos a 390 px, alt fiel, modo oscuro |
| 3–4 fotografías reales de Dakota | Introducción, H2-3 y H2-6 | Misma carpeta, a partir de `docs/experiencias/…` | Autorizado (D2) · producción | Recorte sin personas ni datos de la vivienda; pie «Fotografía» |
| 7 enlaces internos y calculadora | Según §5 | Rutas de §5 | Planificado · redactor | `npx astro build` y abrir cada enlace en local |

- [ ] Extensión y cada H2 justificados por una respuesta distinta.
- [ ] Registro fuente → afirmación → localización completo (§3).
- [ ] Procedencia declarada; fotos reales identificadas como tales; ilustraciones sin presentarse como Dakota.
- [ ] Coherencia con `src/pages/politica-editorial.astro`; sin pauta farmacológica.
- [ ] Historial de auditoría numerado, máximo cinco rondas (límite autorizado por el propietario el 2026-11-12).
