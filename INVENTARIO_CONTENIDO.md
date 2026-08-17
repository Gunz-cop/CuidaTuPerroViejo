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

### 🎯 Próximas Herramientas (Priorizadas)

Siguiendo el patrón "artículo clínico → herramienta interactiva que aplica ese contenido". Orden de prioridad definido el 2026-07-22:

1. **Test de Disfunción Cognitiva Canina (escala CCDR)** — Pilar 5. Cuestionario con puntaje basado en la escala clínica validada (Canine Cognitive Dysfunction Rating). Se apoya en el artículo ya publicado *Demencia senil en perros: señales de Disfunción Cognitiva (CCD)*. Primer candidato para probar histórico de resultados guardados por perro/fecha (visión de base de datos a futuro).
2. **Calculadora de porciones/calorías para perro senior con necesidades especiales** — Pilar 3 (actualmente sin ninguna herramienta). Entrada: peso actual, peso objetivo, condición (perder/mantener/ganar), condición especial (IPE, Cushing). Se apoya en los artículos pendientes de dieta con sobrepeso, transición senior, IPE y el nuevo tema de huevo/multi-perro.
3. **Escala visual de dolor articular y óseo** — Pilar 4. Cuestionario con puntaje, complemento directo del Selector de Movilidad ya publicado. Se apoya en el artículo pendiente *Cómo saber si tu perro siente dolor*.
4. **Recordatorio y registro de medicación** — cruza Pilar 2/7. Registro de fármaco, dosis y última toma. Se apoya en el artículo ya publicado *Cómo dar medicación a un perro que no quiere*. Precursor directo de la ficha clínica (base de datos) descrita en la visión de producto a futuro.

> **Visión de producto a futuro (2026-07-22):** convertir estas herramientas en una ficha clínica del perro con base de datos: histórico de escalas (HHHHHMM, CCDR, dolor) guardado por fecha, registro de medicación, notas de visitas veterinarias en palabras del usuario, y posible acceso de solo lectura para el veterinario. Las herramientas #1 y #4 de esta lista son los primeros candidatos para validar ese modelo de datos (perro + registro con fecha) antes de construir el sistema completo (cuentas de usuario, invitación a veterinario, etc.).

---

## 📝 Inventario de Artículos Publicados (13 Artículos Activos)

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
- **Mi perro viejo defeca mucho: causas reales de la poliquezia y cómo solucionarla**
  - **Archivo físico:** `src/content/blog/mi-perro-viejo-defeca-mucho-poliquezia.mdx`
  - **URL real:** `/salud-perros-mayores/mi-perro-viejo-defeca-mucho-poliquezia`
  - **URL de origen:** *Nuevo artículo de la versión Astro (sin URL legacy)*
  - **Última reescritura:** 2026-07-20 (6.095 palabras — ver `briefings/briefing-mi-perro-viejo-defeca-mucho-poliquezia.md`)
- **Insuficiencia Pancreática Exocrina (IPE) y síndrome de malabsorción en perros mayores**
  - **Archivo físico:** `src/content/blog/insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion.mdx`
  - **URL real:** `/salud-perros-mayores/insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion`
  - **URL de origen:** *Nuevo artículo de la versión Astro (sin URL legacy)*
  - **Última reescritura:** 2026-07-21 (5.694 palabras — ver `briefings/briefing-ipe-perdida-peso-perros-mayores.md`)
- **Síndrome de Cushing en perros mayores: causas, síntomas y tratamiento**
  - **Archivo físico:** `src/content/blog/sindrome-cushing-perros-mayores.mdx`
  - **URL real:** `/salud-perros-mayores/sindrome-cushing-perros-mayores`
  - **URL de origen:** *Nuevo artículo de la versión Astro (sin URL legacy)*
  - **Última reescritura:** 2026-07-21 (ver `briefings/briefing-sindrome-cushing-perros-mayores-v2.md`)

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

**Leyenda de estado:**
- `[ ]` **Pendiente** — sin brief ni artículo.
- `[~]` **En Briefing** — el brief ya existe en `/briefings/briefing-{{slug}}.md`, el artículo `.mdx` todavía no. Lo marca la skill `generar-briefing-contenido` al guardar el brief.
- `[x]` **Publicado** — el `.mdx` ya está en `src/content/blog/`. Lo marca la skill `redactar-articulo-blog` al guardar el artículo.

### Pilar 2: Salud de Perros Mayores (15 artículos totales propuestos)
*Estado: 6 publicados, 9 por redactar*
- [x] *Chequeo geriátrico canino* (Publicado)
- [x] *Salud dental en perros mayores* (Publicado)
- [x] *Vacunas y desparasitación* (Publicado)
- [x] *Mi perro viejo defeca mucho: causas reales de la poliquezia y cómo solucionarla* (Publicado — reescrito 2026-07-20)
- [x] *Síndrome de Cushing en perros mayores: causas, síntomas y tratamiento* (Publicado — 2026-07-21) **[Urgente - Cushing / Adrenales]**
- [x] *Pérdida de peso extrema en la vejez canina: ¿qué es la Insuficiencia Pancreática Exocrina (IPE) y el síndrome de malabsorción?* (Publicado) **[Urgente - Pérdida peso]**
- [ ] *Glándulas adrenales agrandadas en la ecografía de tu perro senior: qué significa la hiperplasia bilateral y cuándo apunta a Cushing hipofisario* (Complementario al artículo de Cushing — caso propio: Luna, ambas adrenales del mismo tamaño y agrandadas) **[Nuevo - Adrenales]**
- [ ] *Mi perro mayor pierde peso y los análisis salen normales: qué pruebas faltan y cuándo pedir una segunda opinión* (Enfoque en el proceso diagnóstico frustrante, distinto del artículo de IPE que ya tiene causa confirmada — caso propio: Luna, más de un año sin diagnóstico) **[Nuevo - Pérdida de peso sin dx]**
- [ ] *Mal aliento (halitosis) en perros viejos: causas subyacentes y soluciones reales* (Búsqueda GSC)
- [ ] *Limpieza bucal y anestesia en perros ancianos: balanceando riesgos y beneficios de la profilaxis* (Búsqueda GSC)
- [ ] *Convulsiones y ataques epilépticos en la vejez: causas, riesgos y cómo actuar en una crisis* (Búsqueda GSC)
- [ ] *Insuficiencia Renal Crónica (IRC) en perros senior: síntomas silenciosos y diagnóstico temprano*
- [ ] *Enfermedad cardíaca canina: cómo identificar y cuidar a un perro viejo con soplo o tos cardíaca*
- [ ] *Diabetes canina en la tercera edad: control de glucosa, síntomas y tratamiento*
- [ ] *Cáncer y tumores geriátricos: señales de advertencia física que no debes pasar por alto*

### Pilar 3: Alimentación de Perros Senior (11 artículos totales propuestos)
*Estado: 1 publicado, 10 por redactar*
- [x] *Comida casera para perros mayores* (Publicado)
- [ ] *Yema o clara de huevo para perros senior: cómo alimentar a dos perros con necesidades opuestas (uno debe subir y otro bajar de peso) en la misma casa* (Título tentativo, pendiente de ajustar — caso propio: Luna con yema para engordar, Dakota con clara para adelgazar) **[Nuevo - Huevo / multi-perro]**
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

### Pilar 5: Salud Mental y Emocional (11 artículos totales propuestos)
*Estado: 1 publicado, 10 en briefing (tanda de briefings del 2026-08-14)*
- [x] *Demencia senil en perros: señales de Disfunción Cognitiva (CCD)* (Publicado)
- [x] *Ansiedad por separación en perros senior: por qué aparece de golpe a los 12 años* (Publicado)
- [~] *El síndrome del ocaso (sundowning) en perros: por qué empeoran al atardecer* (En Briefing — ver `briefings/briefing-sindrome-ocaso-sundowning-perros.md`)
- [~] *Trastornos del sueño en perros ancianos: por qué tu perro se despierta de noche y llora* (En Briefing — ver `briefings/briefing-trastornos-sueno-perros-ancianos-llora-noche.md`)
- [~] *¿Es normal que mi perro viejo duerma tanto? Diferencias entre cansancio y letargo* (En Briefing — ver `briefings/briefing-perro-viejo-duerme-mucho-letargo.md`)
- [~] *Juegos de olfato y estimulación cognitiva para frenar el Alzheimer canino* (En Briefing — ver `briefings/briefing-juegos-olfato-estimulacion-cognitiva-perros-mayores.md`)
- [~] *Pérdida de sentidos (ceguera y sordera) en perros mayores: cómo adaptar tu comunicación* (En Briefing — ver `briefings/briefing-ceguera-sordera-perros-mayores-comunicacion.md`)
- [~] *Depresión en perros ancianos: cómo identificarla y devolverles el entusiasmo* (En Briefing — ver `briefings/briefing-depresion-perros-ancianos.md`)
- [~] *La importancia de una rutina diaria rígida para perros con disfunción cognitiva* (En Briefing — ver `briefings/briefing-rutina-diaria-perros-disfuncion-cognitiva.md`)
- [~] *Feromonas, fitoterapia y terapias naturales para calmar la ansiedad geriátrica* (En Briefing — ver `briefings/briefing-feromonas-terapias-naturales-ansiedad-perros-mayores.md`)
- [x] *Agresividad de aparición tardía en perros mayores: cuándo es dolor y cuándo es deterioro cognitivo* (Publicado — 2026-08-15) **[Nuevo - Tema añadido 2026-08-14, no previsto en el catálogo original]**

### Pilar 6: Higiene y Hogar para Perros Senior (11 artículos totales propuestos)
*Estado: 1 publicado, 10 en briefing (tanda de briefings del 2026-08-14)*
- [x] *Incontinencia urinaria en perros mayores: causas y soluciones* (Publicado)
- [x] *Incontinencia fecal en perros senior: manejo de higiene, alimentación y consejos de limpieza* (Publicado)
- [~] *Cómo bañar y asear a un perro viejo con problemas de movilidad sin causarle dolor* (En Briefing — ver `briefings/briefing-banar-perro-viejo-movilidad-reducida.md`)
- [~] *Verrugas, bultos y quistes cutáneos en la vejez: guía visual de dermatología geriátrica* (En Briefing — ver `briefings/briefing-verrugas-bultos-quistes-perros-mayores.md`)
- [~] *Cuidado de la piel y el pelo del perro senior: sequedad, descamación y callos de apoyo* (En Briefing — ver `briefings/briefing-cuidado-piel-pelo-perro-senior.md`)
- [~] *Limpieza segura de ojos y oídos en perros ancianos con secreciones frecuentes* (En Briefing — ver `briefings/briefing-limpieza-ojos-oidos-perros-ancianos.md`)
- [~] *Productos de higiene indispensables: empapadores, pañales y limpiadores enzimáticos* (En Briefing — ver `briefings/briefing-empapadores-panales-limpiadores-enzimaticos-perros.md`)
- [~] *Corte de uñas y cuidado de almohadillas en perros que ya no desgastan por caminar* (En Briefing — ver `briefings/briefing-corte-unas-almohadillas-perros-mayores.md`)
- [~] *Eliminación de olores a orina y accidentes de perros ancianos en el hogar* (En Briefing — ver `briefings/briefing-eliminar-olor-orina-perro-casa.md`)
- [~] *Prevención y tratamiento de callosidades (higromas) en codos y articulaciones de perros senior* (En Briefing — ver `briefings/briefing-callosidades-higromas-codos-perros-senior.md`)
- [~] *Dermatitis por humedad en perros mayores incontinentes: cómo prevenir la quemadura por orina* (En Briefing — ver `briefings/briefing-dermatitis-humedad-quemadura-orina-perros.md`) **[Nuevo - Tema añadido 2026-08-14, no previsto en el catálogo original]**

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
