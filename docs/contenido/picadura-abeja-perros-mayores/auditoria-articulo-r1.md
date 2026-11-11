# Auditoría del artículo — Picadura de abeja en perros mayores (R1/5)

- **Alcance:** `src/content/blog/picadura-abeja-perros-mayores.mdx` (entrega solo texto; imágenes pendientes como marcadores `{/* IMAGEN … */}`) contra `briefings/briefing-picadura-abeja-perros-mayores.md` (v4) y el expediente `docs/experiencias/dakota-picadura-abeja-2026-11-11/`.
- **Fecha:** 2026-11-12 · **Versión auditada:** `f53dc02` · **Ronda:** R1 de 5 (límite autorizado por el propietario).
- **Rol:** auditor independiente; no se editó el artículo ni el brief.
- **Validación:** solo local (métricas, build, fuentes). Nada verificado en producción.

## Veredicto

**NO PUBLICABLE (texto)** — el texto añade a la experiencia de Dakota hechos y decisiones que no constan en el expediente ni en el brief §2 (una «nota» que les permitió actuar, un seguimiento de días con resultado «por ahora, nada» y lo que «harían distinto»); lo mecánico y las fuentes están bien.

Plano mecánico: cumple (volumen, densidad, fuentes en su H2, componentes, enlaces, build). Plano manual: fuentes verificadas una a una (ver tabla), fotos del expediente contrastadas; el bloqueo es de procedencia narrativa.

## Métricas

Total cuerpo: **4.398 palabras** (contrato 3.780–5.120) ✔. `tono.py`: 3.905 palabras medidas, 1 muletilla, **0,3/1000** ✔. Densidad (awk de Fase 4): media 34, mediana 34, >50 palabras 7 % ✔. H3: 31, ~142 palabras/H3 (spec 150–200, ligeramente por debajo, sin efecto).

| Sección | Real | Target | Desv. |
|---|---|---|---|
| Introducción | 318 | 350 | −9 % |
| H2-1 Primeros 10 minutos | 653 | 650 | 0 % |
| H2-2 Reacción normal o urgencia | 656 | 700 | −6 % |
| H2-3 La pata de Dakota | 603 | 600 | +1 % |
| H2-4 Antiinflamatorios y antihistamínicos | 612 | 650 | −6 % |
| H2-5 Próxima picadura | 551 | 600 | −8 % |
| H2-6 A la mañana siguiente | 333 | 350 | −5 % |
| Conclusión + fuentes + FAQ | 621 | 550 | +13 % |

Componentes: AlertBox `info` (intro), `danger` (H2-2), `warning` (H2-4) + cuadro de fuentes ✔; FAQ 7 en `<FAQ>` ✔; ficha copiable en H2-5 ✔; calculadora en H2-5 ✔. Enlaces internos: los 7 presentes y resuelven a `.mdx` existentes con el pilar correcto (status explícito o por defecto `Publicado`) y a `src/pages/herramientas/calculadora-calidad-vida-perros.astro`; las páginas están en `dist/client/` ✔. Frontmatter: campos válidos en el `z.strictObject` (`heroImageCaption` existe en el schema), seoTitle 50 y metaDescription 151 car. ✔. `npx astro build`: **exit 0** ✔.

Marcadores de imagen vs §8: foto-02 (intro, opcional), `beagle-senior-retirar-aguijon-abeja-tarjeta` (H2-1), `beagle-senior-compresa-fria-vigilancia` (final H2-1), foto-05 y foto-10 (H2-3), foto-12 (H2-6) ✔ coinciden. La portada no tiene marcador (ver P1-3).

Límites clínicos (§9.5): sin dosis, mg, mg/kg, días ni marca ✔ (la tableta única consta en §2/README); no atribuye la mejoría al meloxicam (L188, L202, L303) ✔; FAQ del aguijón tragado sin afirmar inocuidad (L328) ✔; edad: riesgo solo en personas, en perros «no se ha estudiado bien» (L263) ✔.

## Hallazgos

### P0 — bloquean

**P0-1. Nota inventada que «permitió actuar».** L216: «Apunta las respuestas en el celular, junto al nombre del medicamento. Esa nota es la que nos permitió actuar con Dakota sin improvisar.» Ni el README ni el brief (§2, D1) mencionan ninguna nota escrita: D1 dice que los veterinarios dieron una indicación verbal. Es un hecho narrativo inventado presentado como experiencia. **Instrucción:** borrar la segunda frase; la recomendación de apuntar puede quedarse en segunda persona sin atribuirla a la experiencia.

**P0-2. Decisiones del propietario no documentadas.** L295–299, H3 «Lo que haríamos igual y lo que haríamos distinto»: «Buscaríamos el aguijón con linterna desde el primer minuto…» y «apuntaríamos la hora exacta». El expediente no recoge ninguna valoración del propietario sobre qué haría distinto; el brief H2-6 no planifica este H3 (el de H2-4 se refería a llamar antes de medicar). Atribuirle al propietario juicios que no dijo es invención. **Instrucción:** eliminar el H3 o reducirlo a hechos documentados (no se anotó la hora de la picadura; solo consta la de las primeras fotos, 9:02) sin «haríamos»; o pedir al propietario que lo confirme y registrarlo en el README antes de usarlo.

**P0-3. Seguimiento y resultado posteriores sin procedencia.** L303: «Seguimos mirando su almohadilla unos días más… Por ahora, nada.» El expediente termina el 2026-11-12 a las 10:37 (mismo día del `datePublished`); no hay revisión de días posteriores ni resultado. El brief autoriza «seguimos revisando la almohadilla», no un resultado. **Instrucción:** dejar «Seguiremos revisando su almohadilla unos días, buscando… (Merck)» y quitar «Por ahora, nada», salvo que el propietario lo aporte y se añada al README.

### P1

**P1-1. Adornos narrativos no presentes en el expediente.** L176 «No se quejó ni la retiró, y eso también nos tranquilizó» y L180 «sin quejidos» (README solo: «se queda quieta y la levanta»); L25 «nosotros nos quedamos con la duda de qué vigilar»; L160 «Luna duerme» y «Nada en su postura hacía pensar en una urgencia». Las fotos confirman otros detalles (almohadillas oscuras en foto-09/10, vientre rosado sin ronchas en foto-09, cabeza sobre las patas en foto-01 a las 9:02, mirada a cámara en foto-11), pero estos estados emocionales y la ausencia de quejidos no constan. **Instrucción:** reducir a lo del README («se quedaba quieta y la levantaba»; «Luna en la cama de al lado») o confirmarlo con el propietario.

**P1-2. Reacción tardía con temporalidad no respaldada.** L119: «aparece después de que la picadura parecía resuelta». Fitzgerald y Flood (resumen, único texto leído según el brief) solo dice «less commonly, delayed-type hypersensitivity». El consejo de seguir mirando al día siguiente es razonable, pero no se atribuye la descripción. **Instrucción:** «Fitzgerald y Flood mencionan también, con menos frecuencia, reacciones tardías. Por eso…» sin describir cuándo aparecen.

**P1-3. Portada sin declaración de pendiente.** El frontmatter apunta `heroImage` a `beagle-senior-pata-almohadilla-revision.webp`, que no existe (métricas: FALTA), sin marcador `{/* IMAGEN HERO … */}` en el `.mdx`; `status: "Publicado"` con el build en verde haría que, al fusionar, la portada salga rota. El brief (nota de estado, §11) sí la declara pendiente. **Instrucción:** añadir un marcador `{/* IMAGEN HERO: ilustración beagle-senior-pata-almohadilla-revision.webp. Pendiente de producción. */}` y mantener el gate de no fusionar en `main` hasta que exista.

### P2

**P2-1.** L45 «La reacción crecía con cada segundo de espera»: Visscher dice «increased… even within a few seconds». Cambiar a «crecía cuanto más se tardaba, incluso en pocos segundos».
**P2-2.** L263 «la mitad de los perros tenía menos de dos años»: tabla 3 da 56 % (100/178) de 0–2 años y mediana 1,7. Correcto como aproximación; «más de la mitad» sería exacto.

## Tabla de fuentes

| Fuente | Identidad comprobada | Afirmación del artículo (línea) | Localización | Resultado |
|---|---|---|---|---|
| Fitzgerald KT, Flood AA. Clin Tech Small Anim Pract 2006;21(4):194-204 | PMID 17265905, efetch ✔ | Aguijón con arpón; avispas varias veces (L43, L61); 10 min (L77); 4 tipos de reacción (L101); no depende del nº (L109); ≈20/kg (L127); frío (L71); se resuelven en horas (L36, L99) | Resumen | ✔ todas; L119 temporalidad no consta (P1-2) |
| Visscher PK, Vetter RS, Camazine S. Lancet 1996;348:301-2 | PMID 8709689 ✔ | Rapidez > método; raspar = pellizcar (L45–47) | Findings / Interpretation | ✔ (matiz P2-1) |
| Shmuel DL, Cortes Y. JVECC 2013;23(4):377-94 | PMID 23855441 ✔ | Diagnóstico clínico, adrenalina de elección, coadyuvantes no la sustituyen (L105–107, L230, FAQ 3) | Diagnosis / Therapy | ✔ ; no afirma órganos (respeta §3) |
| Chapman E et al. Animals 2024;14(22):3220 | PMC11591281 texto completo (Europe PMC) ✔ | 178 perros alérgicos, Zúrich 2018–2022 (L249); 43 re-picados (L249); 10/24 grado 1 → SSR (L251, FAQ 6); 14/43 <2 meses, 17 entre 2–12 meses, >mitad en paseo 58 % (L253); tabla 2 grados (L113, AlertBox); pata 28 %, cara 39 % (L156); comorbilidad OR 4,48, <10 kg, raza pura, boca (L261, L265); edad en personas (L263); inmunoterapia recomendada (L281) | Simple summary, 3.1, 3.2, 3.3, tablas 2, 3 y 5, Discusión | ✔ todas |
| Nagy AL, Merck Veterinary Manual, rev. abr 2026 (Brutlag) | URL abierta ✔, autoría y fecha ✔ | Dolor/hinchazón en minutos, se resuelve rápido (L99); compresa fresca (L71); absceso (L192, FAQ 2); antihistamínicos según necesidad (L228); africanizadas, ataxia, convulsiones, parálisis facial, hematuria/hematoquecia (L125) | Clinical Signs / Treatment | ✔ todas |
| FDA CVM, «Get the Facts about Pain Relievers for Pets», 09/29/2022 | URL abierta ✔ | «Dogs are Not Small People» (L220); úlceras, riñón, hígado (L222); no dos AINE ni AINE + prednisona (L222); análisis en tratamiento largo (L224); signos de efectos adversos (L234); paracetamol (L220) | Over-the-Counter NSAIDs; Side Effects; What Should You Do; Acetaminophen | ✔ todas |

Todas las fuentes se nombran dentro de su H2 asignado (§9.2), no solo en el cuadro de cierre.

## Recursos prometidos

| Recurso | Ruta | Prueba | Resultado |
|---|---|---|---|
| Ficha para la próxima picadura | H2-5, lista en el cuerpo | Lectura | ✔ sin promesa de descarga |
| 7 enlaces internos | §5 | Build + `dist/client` | ✔ |
| 3 ilustraciones + 3–4 fotos | `public/images/blog/picadura-abeja-perros-mayores/` | — | Pendiente (gate de §11; portada sin marcador, P1-3) |

## Lo que sí funciona

- El H2-4 cuenta el meloxicam con honestidad y sin pauta: sin mg, días ni marca, «No sabemos si la tableta influyó» (L202), y la lista de preguntas al veterinario (L208–214) convierte la experiencia en algo útil. No tocar.
- H2-5 traslada bien el matiz de Chapman: «leve» ya es reacción generalizada y las locales no están estudiadas (L251, L257). No ablandar.
- La FAQ del aguijón tragado (L328) resiste la tentación de tranquilizar sin fuente.
- La edad (L263) se limita a personas, como exige §9.5.
- Densidad y distribución impecables; tono 0,3/1000.

## Qué corregir, en orden

1. P0-1, P0-2, P0-3: quitar o reducir a hechos del README; si el propietario confirma lo que «haría distinto» o el seguimiento, primero registrarlo en `docs/experiencias/dakota-picadura-abeja-2026-11-11/README.md` y en el brief §2.
2. P1-1 y P1-2: recortar adornos y la temporalidad de la reacción tardía.
3. P1-3: marcador de portada pendiente.
4. P2 cuando se toque el archivo. Tras los recortes, comprobar que H2-6 sigue ≥ 298 palabras (−15 %); si no, ampliar solo con hechos del expediente (p. ej., foto-11/13 y el vídeo), nunca con interpretación.

**Prompt para la sesión correctora:** «Corrige `src/content/blog/picadura-abeja-perros-mayores.mdx` según `docs/contenido/picadura-abeja-perros-mayores/auditoria-articulo-r1.md`: elimina la frase de L216 sobre la nota; elimina o reduce a hechos el H3 de L295–299; en L303 cambia a futuro y quita "Por ahora, nada"; en L176/L180/L25/L160 deja solo lo que consta en el README del expediente; reescribe L119 sin temporalidad; añade marcador de portada pendiente; aplica P2-1. No añadas hechos que no estén en el README ni en el brief §2. Mide de nuevo con metricas.mjs, tono.py y `npx astro build`.»
