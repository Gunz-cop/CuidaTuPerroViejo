# Auditoría del artículo — Picadura de abeja en perros mayores (R2/5)

- **Alcance:** `src/content/blog/picadura-abeja-perros-mayores.mdx` (entrega solo texto; imágenes y portada pendientes, declaradas con marcadores `{/* … */}`) contra `briefings/briefing-picadura-abeja-perros-mayores.md` y el expediente `docs/experiencias/dakota-picadura-abeja-2026-11-11/` (README + fotos). Se verifica el informe R1 y se reaudita el artículo completo.
- **Fecha:** 2026-11-12 · **Versión auditada:** `3200322` · **Ronda:** R2 de 5 (límite autorizado por el propietario).
- **Rol:** auditor independiente; no se editó el artículo ni el brief.
- **Validación:** solo local (métricas, `tono.py`, build, fuentes descargadas). Nada verificado en producción.

## Veredicto

**PUBLICABLE CON RESERVAS (texto)** — los tres P0 y los tres P1 de R1 están resueltos; quedan solo matices P2 de procedencia narrativa. La publicación sigue sujeta al gate ya declarado: no fusionar en `main` hasta producir la portada y las imágenes (marcador `PORTADA PENDIENTE`, L17).

## R1 → R2

| Hallazgo R1 | Estado | Evidencia en `3200322` |
|---|---|---|
| P0-1 nota inventada que «permitió actuar» | ✔ Resuelto | L218: «Nosotros teníamos esa indicación de sus veterinarios, y por eso esa noche no tuvimos que improvisar.» Se apoya en D1 (indicación previa); ya no hay nota inventada. |
| P0-2 H3 «haríamos igual / distinto» | ✔ Resuelto | Sustituido por «Lo que nos dejaron las fotos» (L297–301): solo hechos; «no la anotamos» se limita a lo que falta en el expediente (hora de la picadura). |
| P0-3 seguimiento «Por ahora, nada» | ✔ Resuelto | L305 en futuro («En los días siguientes toca mirar…»), sin resultado. |
| P1-1 adornos (quejidos, «Luna duerme», duda) | ✔ Resuelto | L162 «Luna está en la cama de al lado»; L178 «se quedaba quieta y la levantaba»; desaparecen «sin quejidos» y la duda de L25. |
| P1-2 temporalidad de la reacción tardía | ✔ Resuelto | L121: «describen también una reacción tardía, menos frecuente», sin decir cuándo aparece. |
| P1-3 portada sin declarar | ✔ Resuelto | L17 marcador `PORTADA PENDIENTE` con gate de no fusionar en `main`. `metricas.mjs` sigue marcando FALTA del hero: es el pendiente declarado, no defecto. |
| P2-1 «crecía con cada segundo» | ✔ Resuelto | L47 «crecía cuanto más se tardaba, incluso por unos pocos segundos». |
| P2-2 «la mitad» <2 años | ✔ Resuelto | L265 «más de la mitad» (tabla 3: 100/178 = 56 %). |

## Hallazgos nuevos

No hay P0 ni P1.

### P2

**P2-1. Las fotos no prueban las 10:02 ni las 10:37.** L299: «Las fotos … tienen hora. Gracias a ellas sabemos que … a las 10:02 ya dormía en el suelo y que a las 10:37 del día siguiente pedía comida.» El README solo registra reloj visible a las 9:02 en las fotos de la noche; las 10:02 y las 10:37 vienen del relato del dueño, y el expediente no lista ninguna foto de las 10:02. Los hechos están respaldados; lo que sobra es atribuirlos a las fotos. **Instrucción:** «Gracias a las fotos sabemos que a las 9:02 … y por lo que apuntamos esa noche, que a las 10:02 …», o quitar «Gracias a ellas».

**P2-2. Tres matices interpretativos menores.** L180 «rosada, *como siempre*» (el README/foto-09 solo dan «sin ronchas»); L182 «Le dolía y nos lo decía a su manera»; L295 «Para nosotros fue la señal de que la noche había quedado atrás». No añaden hechos clínicos y son defendibles como lectura del dueño, pero no constan en el expediente. **Instrucción:** quitar «como siempre»; los otros dos, confirmar con el propietario o suavizar («parecía molestarle»).

## Métricas

Total cuerpo (`metricas.mjs`): **4.396 palabras** (contrato 3.780–5.120) ✔. `tono.py`: 3.903 palabras medidas, 1 muletilla, **0,3/1000** ✔. Densidad (awk Fase 4): media 34, mediana 34, >50 palabras 9 % ✔ (`metricas.mjs`: media 37, máx. 72, 11 %). H3: 31, ~142 palabras/H3 (ligeramente por debajo de 150–200; sin efecto).

| Sección | Real | Target §6 | Desv. |
|---|---|---|---|
| Introducción | 340 | 350 | −3 % |
| H2-1 Primeros 10 minutos | 657 | 650 | +1 % |
| H2-2 Reacción normal o urgencia | 650 | 700 | −7 % |
| H2-3 La pata de Dakota | 574 | 600 | −4 % |
| H2-4 Antiinflamatorios y antihistamínicos | 616 | 650 | −5 % |
| H2-5 Próxima picadura | 553 | 600 | −8 % |
| H2-6 A la mañana siguiente | 334 | 350 | −5 % |
| Conclusión + fuentes + FAQ | 621 | 550 | +13 % |

Todas dentro de ±15 %.

Componentes: AlertBox `info` (intro), `danger` (H2-2), `warning` (H2-4) + cuadro de fuentes ✔; FAQ 7 en `<FAQ>` ✔; ficha copiable (H2-5) ✔. Enlaces internos: 7/7 presentes (pilar, 3 spokes, 2 puentes, calculadora) ✔. Frontmatter válido en el schema estricto; metaDescription 151 car.; `status: Publicado`, `datePublished: 2026-11-12` ✔. `npx astro build`: **exit 0** ✔.

Límites clínicos: sin dosis, mg, días ni marca (solo «una tableta … con meloxicam», L202) ✔; sin causalidad del meloxicam (L190, L204, L305) ✔; FAQ del aguijón tragado sin afirmar inocuidad (L330) ✔; edad: riesgo solo en personas, en perros «no se ha estudiado bien» (L265) ✔.

Procedencia narrativa (contrastada con README, D1–D3 y foto-01, 04, 09, 10, 11, 12): cama ortopédica, abeja cae y la matan, revisión sin aguijón, lamidas, segunda revisión con almohadilla roja, caricias y panza arriba, «sinvergüenza», 10:02 dormida en el suelo fresco y roncando, 10:37 normal, Rookie y su tolerancia habitual, peso >10 kg, Costa Rica, 2014, indicación veterinaria previa del meloxicam ✔. Solo los matices de P2-1 y P2-2.

## Tabla de fuentes

| Fuente | Identidad comprobada | Afirmaciones (línea) | Localización | Resultado |
|---|---|---|---|---|
| Fitzgerald KT, Flood AA. Clin Tech Small Anim Pract 2006;21(4):194-204 | PMID 17265905 (efetch) ✔ | Aguijón con arpón, avispas varias veces (L45, L63); frío (L73); graves en 10 min (L79); 4 tipos, regional (L103); no dependen del nº (L111); tardía menos frecuente (L121); ≈20/kg (L129); se resuelven en horas (L38, L101) | Resumen | ✔ |
| Visscher PK, Vetter RS, Camazine S. Lancet 1996;348:301-2 | PMID 8709689 ✔ | Reacción crece con el tiempo, incluso segundos; raspar = pellizcar (L47) | Findings | ✔ |
| Shmuel DL, Cortes Y. JVECC 2013;23(4):377-94 | PMID 23855441 ✔ | Diagnóstico clínico; adrenalina de elección; coadyuvantes no la sustituyen (L107–109, L232, FAQ 3) | Diagnosis / Therapy | ✔ |
| Chapman E et al. Animals 2024;14(22):3220 | PMC11591281 texto completo (Europe PMC) ✔ | Grados de tabla 2 (L115); cara 39 %, pata 28 % (46/163), boca 21 % (L158); 178 perros, Zúrich 2018–2022, 43 re-picados (L251); 10/24 leves → SSR (L253, FAQ 6); 14 <2 meses, 17 de 2–12 meses, paseo 58 % (L255); comorbilidad OR 4,48 (L263); edad en personas, 56 % 0–2 años con mediana 1,7 (L265); <10 kg, raza pura, boca (L267, FAQ 5); inmunoterapia (L283) | Simple summary, 3.1–3.3, tablas 2–5, Discusión | ✔ |
| Nagy AL, Merck Veterinary Manual, Full Review abr 2026 (rev. Brutlag) | URL abierta ✔ | Compresa fresca (L73, FAQ 7); dolor/hinchazón en minutos, local se resuelve rápido (L101, FAQ 1); africanizadas: ataxia, convulsiones, parálisis facial, hematuria/hematoquecia (L127); absceso (L194, L305, FAQ 2); antihistamínicos según necesidad (L230) | Clinical Signs / Treatment | ✔ |
| FDA CVM, «Get the Facts about Pain Relievers for Pets», 09/29/2022 | URL abierta ✔ | «Dogs are Not Small People», paracetamol (L222); úlceras, riñón, hígado; no dos AINE ni AINE + prednisona (L224); análisis en tratamiento largo (L226); signos de efecto adverso (L236) | OTC NSAIDs; Side Effects; Long-Term; What Should You Do | ✔ |

Cada fuente aparece nombrada dentro de su H2 asignado, no solo en el cuadro final.

## Qué corregir (opcional, cuando se toque el archivo)

1. P2-1: desligar las 10:02/10:37 de «gracias a las fotos».
2. P2-2: quitar «como siempre»; confirmar o suavizar L182 y L295.
3. Gate independiente del texto: producir portada e imágenes antes de fusionar en `main`.
