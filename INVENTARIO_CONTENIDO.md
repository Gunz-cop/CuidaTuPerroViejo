# Inventario de Contenido y Pilares SEO
**Cuida Tu Perro Viejo**

Este documento es un registro maestro de los pilares de contenido, las herramientas interactivas y los artículos publicados y sugeridos del sitio web `cuidatuperroviejo.com`. Sirve para coordinar la estrategia editorial y mapear de forma precisa las URLs reales para mantener el posicionamiento SEO.

---

## 📌 Los 7 Pilares Oficiales del Sitio

El sitio se organiza en torno a 7 pilares estructurados:
1. **Herramientas Interactivas e IA** (`herramientas`): Aplicaciones prácticas, tests clínicos y asistencia interactiva.
2. **Salud de Perros Mayores** (`salud-perros-mayores`): Patologías de la vejez, prevención médica y control veterinario.
3. **Alimentación de Perros Senior** (`alimentacion-perros-senior`): Nutrición natural, dietas específicas y suplementación geriátrica.
4. **Movilidad y Dolor** (`movilidad-dolor-perros-mayores`): Artrosis, soporte articular, adaptaciones en casa y control de dolor.
5. **Salud Mental y Emocional** (`salud-mental-emocional-perros`): Deterioro cognitivo, cambios conductuales y enriquecimiento mental.
6. **Higiene y Hogar** (`higiene-hogar-perros-senior`): Incontinencia urinaria/fecal, aseo seguro y control de entorno.
7. **Cuidados Paliativos y Eutanasia** (`cuidados-paliativos-perros`): Calidad de vida terminal, control de dolor y toma de decisiones compasivas.

---

## 📂 Ecosistema de Apps e Interacciones (Pilar 1: Hub de Apps)

Las herramientas interactivas funcionan como un hub estratégico que atrae tráfico con alta retención y valor de marca:

| Herramienta / App | Ruta Física en Código | URL Real en Producción (Astro) | Estado |
| :--- | :--- | :--- | :--- |
| **Hub de Herramientas (Pilar)** | `src/content/pilares/herramientas.mdx` | `/herramientas` | **Publicado** |
| **Calculadora de Calidad de Vida (HHHHHMM)** | `src/pages/herramientas/calculadora-calidad-vida-perros.astro` | `/herramientas/calculadora-calidad-vida-perros` | **Publicado** |
| **Selector de Movilidad y Soporte** | `src/pages/herramientas/selector-movilidad-perros-mayores.astro` | `/herramientas/selector-movilidad-perros-mayores` | **Publicado** |
| **Asistente de IA Cuida tu perro viejo** | `src/pages/asistente-ia.astro` | `/asistente-ia` | **Publicado** |

---

## 📝 Inventario de Artículos Publicados (10 Artículos Activos)

A continuación se listan los artículos de blog ya implementados en el código de Astro, clasificados por su pilar correspondiente con su ruta física y sus URLs reales de redireccionamiento SEO.

### Pilar 2: Salud de Perros Mayores
- **Chequeo geriátrico canino: cuándo hacerlo y qué pruebas incluye**
  - **Archivo físico:** `src/content/blog/chequeo-geriatrico-canino.mdx`
  - **URL real:** `/salud-perros-mayores/chequeo-geriatrico-canino`
  - **URL de origen (Blogger):** `https://cuidatuperroviejo.com/2025/10/revision-veterinaria-perros-mayores.html`
- **Salud dental en perros mayores: prevención y cuidados en casa**
  - **Archivo físico:** `src/content/blog/salud-dental-perros-mayores.mdx`
  - **URL real:** `/salud-perros-mayores/salud-dental-perros-mayores`
  - **URL de origen (Blogger):** `https://cuidatuperroviejo.com/2025/10/salud-dental-perros-mayores.html`
- **Vacunas y desparasitación en perros senior: ¿siguen siendo necesarias?**
  - **Archivo físico:** `src/content/blog/vacunas-desparasitacion-perros-senior.mdx`
  - **URL real:** `/salud-perros-mayores/vacunas-desparasitacion-perros-senior`
  - **URL de origen (Blogger):** `https://cuidatuperroviejo.com/2025/10/vacunas-desparasitacion-perros-senior.html`
- **Mi perro viejo defeca mucho: causas de la poliquezia y tránsito intestinal**
  - **Archivo físico:** `src/content/blog/mi-perro-viejo-defeca-mucho-poliquezia.mdx`
  - **URL real:** `/salud-perros-mayores/mi-perro-viejo-defeca-mucho-poliquezia`
  - **URL de origen:** *Nuevo artículo de la versión Astro (sin URL legacy)*

### Pilar 3: Alimentación de Perros Senior
- **Comida casera para perros mayores: recetas y pautas de nutrición**
  - **Archivo físico:** `src/content/blog/comida-casera-perros-mayores.mdx`
  - **URL real:** `/alimentacion-perros-senior/comida-casera-perros-mayores`
  - **URL de origen (Blogger):** `https://cuidatuperroviejo.com/2026/05/comida-casera-perros-mayores.html`

### Pilar 4: Movilidad y Dolor en Perros Mayores
- **Cama ortopédica para perros mayores con displasia o artrosis: qué buscar y qué evitar**
  - **Archivo físico:** `src/content/blog/cama-ortopedica-perros-mayores-displasia-artrosis.mdx`
  - **URL real:** `/movilidad-dolor-perros-mayores/cama-ortopedica-perros-mayores-displasia-artrosis`
  - **URL de origen:** *Nuevo artículo de la versión Astro (sin URL legacy)*
- **Prevención de caídas en casa: tracción y layout para tu perro mayor**
  - **Archivo físico:** `src/content/blog/prevencion-caidas-perro-mayor.mdx`
  - **URL real:** `/movilidad-dolor-perros-mayores/prevencion-caidas-perro-mayor`
  - **URL de origen:** *Nuevo artículo de la versión Astro (sin URL legacy)*

### Pilar 5: Salud Mental y Emocional
- **Demencia senil en perros: señales de Disfunción Cognitiva (CCD) y qué hacer**
  - **Archivo físico:** `src/content/blog/disfuncion-cognitiva-canina.mdx`
  - **URL real:** `/salud-mental-emocional-perros/disfuncion-cognitiva-canina`
  - **URL de origen (Blogger):** `https://cuidatuperroviejo.com/2026/05/disfuncion-cognitiva-perros-mayores.html`

### Pilar 6: Higiene y Hogar para Perros Senior
- **Incontinencia urinaria en perros mayores: causas y soluciones**
  - **Archivo físico:** `src/content/blog/incontinencia-urinaria-perros-mayores.mdx`
  - **URL real:** `/higiene-hogar-perros-senior/incontinencia-urinaria-perros-mayores`
  - **URL de origen (Blogger):** `https://cuidatuperroviejo.com/2026/06/incontinencia-urinaria-perros-mayores.html`

### Pilar 7: Cuidados Paliativos y Eutanasia
- **Cómo dar medicación a un perro que no quiere: trucos y técnicas**
  - **Archivo físico:** `src/content/blog/como-dar-medicacion-perro.mdx`
  - **URL real:** `/cuidados-paliativos-perros/como-dar-medicacion-perro`
  - **URL de origen (Blogger):** `https://cuidatuperroviejo.com/2025/11/como-dar-medicacion-perro.html`
- **Úlceras por presión en perros con movilidad reducida: prevención y cura**
  - **Archivo físico:** `src/content/blog/ulceras-presion-perros.mdx`
  - **URL real:** `/cuidados-paliativos-perros/ulceras-presion-perros`
  - **URL de origen (Blogger):** `https://cuidatuperroviejo.com/2025/11/ulceras-presion-perros.html`

---

## 📋 Catálogo de Artículos por Redactar (Expansión Editorial)

Para alcanzar el objetivo de **mínimo 10 artículos por cada pilar de texto**, se proponen los siguientes contenidos futuros basados en búsquedas reales:

### Pilar 2: Salud de Perros Mayores (13 artículos totales propuestos)
*Estado: 4 publicados, 9 por redactar*
- [x] *Chequeo geriátrico canino* (Publicado)
- [x] *Salud dental en perros mayores* (Publicado)
- [x] *Vacunas y desparasitación* (Publicado)
- [x] *Mi perro viejo defeca mucho más de lo normal* (Publicado)
- [ ] *Síndrome de Cushing en perros mayores: disfunción de las glándulas adrenales, síntomas y diagnóstico* **[Urgente - Cushing / Adrenales]**
- [ ] *Pérdida de peso extrema en la vejez canina: ¿qué es la Insuficiencia Pancreática Exocrina (IPE) y el síndrome de malabsorción?* **[Urgente - Pérdida peso]**
- [ ] *Mal aliento (halitosis) en perros viejos: causas subyacentes y soluciones reales* (Búsqueda GSC)
- [ ] *Limpieza bucal y anestesia en perros ancianos: balanceando riesgos y beneficios de la profilaxis* (Búsqueda GSC)
- [ ] *Convulsiones y ataques epilépticos en la vejez: causas, riesgos y cómo actuar en una crisis* (Búsqueda GSC)
- [ ] *Insuficiencia Renal Crónica (IRC) en perros senior: síntomas silenciosos y diagnóstico temprano*
- [ ] *Enfermedad cardíaca canina: cómo identificar y cuidar a un perro viejo con soplo o tos cardíaca*
- [ ] *Diabetes canina en la tercera edad: control de glucosa, síntomas y tratamiento*
- [ ] *Cáncer y tumores geriátricos: señales de advertencia física que no debes pasar por alto*

### Pilar 3: Alimentación de Perros Senior (10 artículos totales propuestos)
*Estado: 1 publicado, 9 por redactar*
- [x] *Comida casera para perros mayores* (Publicado)
- [ ] *Cómo alimentar a un perro senior sin dientes: recetas blandas y papillas caseras* (Búsqueda GSC)
- [ ] *Dieta BARF para perros senior: pros, contras y cómo adaptarla de forma segura* (Búsqueda GSC)
- [ ] *Pienso senior con condroprotectores: qué buscar en las etiquetas nutricionales* (Búsqueda GSC)
- [ ] *Cómo abrir el apetito de un perro viejo que se niega a comer* (Búsqueda GSC)
- [ ] *La transición de alimento adulto a senior: cuándo y cómo hacer el cambio* (Búsqueda GSC)
- [ ] *Dieta para perros senior con sobrepeso: pautas efectivas para perder peso* (Búsqueda GSC)
- [ ] *Snacks y premios saludables para perros ancianos: opciones bajas en calorías y fáciles de masticar* (Búsqueda GSC)
- [ ] *Alimentación natural comercial vs. Pienso clásico senior: guía comparativa de costos y beneficios*
- [ ] *Nutrición geriátrica para perros con insuficiencia hepática o pancreática*

### Pilar 4: Movilidad y Dolor en Perros Mayores (10 artículos totales propuestos)
*Estado: 2 publicados, 8 por redactar*
- [x] *Cama ortopédica para perros mayores con displasia o artrosis* (Publicado)
- [x] *Prevención de caídas en casa: tracción y layout* (Publicado)
- [ ] *A mi perro viejo le fallan las patas traseras: causas físicas y qué hacer* (Búsqueda GSC)
- [ ] *Masajes y estiramientos caseros para perros con artrosis y rigidez articular* (Búsqueda GSC)
- [ ] *Mi perro mayor no se puede levantar: guía paso a paso de ayuda de emergencia* (Búsqueda GSC)
- [ ] *Fisioterapia e hidroterapia canina: terapias modernas para mejorar la movilidad*
- [ ] *Suplementos naturales y antiinflamatorios seguros para el dolor crónico articular* (Búsqueda GSC)
- [ ] *Arneses de soporte y sillas de ruedas para perros senior: guía de selección y uso*
- [ ] *Ejercicios terapéuticos de bajo impacto para prevenir la atrofia muscular geriátrica*
- [ ] *Cómo saber si tu perro siente dolor: escala visual de dolor articular y óseo*

### Pilar 5: Salud Mental y Emocional (10 artículos totales propuestos)
*Estado: 1 publicado, 9 por redactar*
- [x] *Demencia senil en perros: señales de Disfunción Cognitiva (CCD)* (Publicado)
- [ ] *Ansiedad por separación y apego en perros senior: causas y pautas de alivio* (Búsqueda GSC)
- [ ] *El síndrome del ocaso (sundowning) en perros: por qué empeoran al atardecer* (Búsqueda GSC)
- [ ] *Trastornos del sueño en perros ancianos: por qué tu perro se despierta de noche y llora* (Búsqueda GSC)
- [ ] *¿Es normal que mi perro viejo duerma tanto? Diferencias entre cansancio y letargo* (Búsqueda GSC)
- [ ] *Juegos de olfato y estimulación cognitiva para frenar el Alzheimer canino*
- [ ] *Pérdida de sentidos (ceguera y sordera) en perros mayores: cómo adaptar tu comunicación*
- [ ] *Depresión en perros ancianos: cómo identificarla y devolverles el entusiasmo*
- [ ] *La importancia de una rutina diaria rígida para perros con disfunción cognitiva*
- [ ] *Feromonas, fitoterapia y terapias naturales para calmar la ansiedad geriátrica*

### Pilar 6: Higiene y Hogar para Perros Senior (10 artículos totales propuestos)
*Estado: 1 publicado, 9 por redactar*
- [x] *Incontinencia urinaria en perros mayores: causas y soluciones* (Publicado)
- [ ] *Incontinencia fecal en perros senior: manejo de higiene, alimentación y consejos de limpieza*
- [ ] *Cómo bañar y asear a un perro viejo con problemas de movilidad sin causarle dolor*
- [ ] *Verrugas, bultos y quistes cutáneos en la vejez: guía visual de dermatología geriátrica* (Búsqueda GSC)
- [ ] *Cuidado de la piel y el pelo del perro senior: sequedad, descamación y callos de apoyo*
- [ ] *Limpieza segura de ojos y oídos en perros ancianos con secreciones frecuentes*
- [ ] *Productos de higiene indispensables: empapadores, pañales y limpiadores enzimáticos*
- [ ] *Corte de uñas y cuidado de almohadillas en perros que ya no desgastan por caminar*
- [ ] *Eliminación de olores a orina y accidentes de perros ancianos en el hogar*
- [ ] *Prevención y tratamiento de callosidades (higromas) en codos y articulaciones de perros senior*

### Pilar 7: Cuidados Paliativos y Eutanasia (10 artículos totales propuestos)
*Estado: 2 publicados, 8 por redactar*
- [x] *Cómo dar medicación a un perro que no quiere* (Publicado)
- [x] *Úlceras por presión en perros con movilidad reducida* (Publicado)
- [ ] *Escala HHHHHMM explicada paso a paso para evaluar la calidad de vida de tu perro* **[Urgente - Escala de Vida]**
- [ ] *La decisión de la Eutanasia: cómo saber si es el momento y cómo prepararse emocionalmente* **[Eutanasia - Enfoque Principal]**
- [ ] *Eutanasia en casa frente a clínica veterinaria: diferencias, pros y contras del proceso* **[Eutanasia - Proceso]**
- [ ] *Sedación terminal en perros: ¿cuándo se aplica y cómo alivia el sufrimiento?* **[Eutanasia - Paliativos]**
- [ ] *Duelo por la pérdida de un perro: estrategias psicológicas para afrontar la partida del compañero* **[Eutanasia - Post-partida]**
- [ ] *El papel de la medicina veterinaria compasiva a domicilio en la etapa final* (Búsqueda GSC)
- [ ] *Alimentación asistida con papillas y jeringa para perros en fase terminal* (Búsqueda GSC)
- [ ] *Manejo de la disnea y soporte respiratorio en el hogar (oxigenoterapia geriátrica)*
