# Auditoría del brief: picadura de abeja en perros mayores (R4/5)

- **Alcance:** `briefings/briefing-picadura-abeja-perros-mayores.md` (brief v4) completo. Primero se comprobaron los hallazgos de R3 (R3-1, R3-2 y R3-3) con el diff `dcd22e7..ab81a4b`. Después se revisó todo el brief desde cero. Se buscó con grep cualquier signo atribuido a una fuente que no lo contiene (diarrea, colapso, desmayo, debilidad, temblor, letargo, vómitos) y cualquier frase que contradiga el expediente. Contrastado con `docs/experiencias/dakota-picadura-abeja-2026-11-11/README.md`, `INVENTARIO_CONTENIDO.md`, `src/content.config.ts`, el `pilar`/`status` de los `.mdx` enlazados, `src/pages/herramientas/`, `direccion-visual-editorial.md`, `calidad-editorial-adsense.md`, `guia-voz-tono.md` y `src/pages/politica-editorial.astro`. Skill aplicada: `auditar-briefing-contenido`.
- **Fecha:** 2026-11-12
- **Versión auditada:** `ab81a4b` (último commit que toca el brief)
- **Ronda:** R4/5 (el propietario autorizó hasta cinco rondas)
- **Auditor:** sesión independiente; no generó ni corrigió el brief y no lo corrige.

## Veredicto

**APTO CON RESERVAS.** Los tres hallazgos de R3 están resueltos, y el grep no encuentra ningún signo atribuido a una fuente que no lo contenga. Las seis fuentes se volvieron a verificar y dicen lo que el brief les atribuye. Quedan tres P2 menores, todos en la parte interna del brief (tabla de hechos, D1 y nota de §3). El redactor debe respetarlos como reservas. No hay ningún P0 ni P1.

## Hallazgos de R3: estado

| # | Sev. R3 | Hallazgo | ¿Resuelto? | Evidencia en v4 |
|---|---|---|---|---|
| R3-1 | P1 | §3 F3 atribuía la diarrea y el colapso a Fitzgerald y a Merck como señales de alarma | **Sí** | La línea 130 dice ahora: «Las señales de alarma se apoyan en la tabla 2 de Chapman et al. 2024 (ver H2-2); la diarrea no se añade». Lo comprobé: la tabla 2 de PMC11591281 contiene «collapse» en el grado 3 y no contiene «diarrh». En todo el brief, «diarrea» solo aparece en tres sitios: en la nota que la excluye (líneas 130, 139 y 255) y en la lista de efectos de los AINE de la FDA (líneas 153 y 290), donde la FDA sí dice «Diarrhea». No queda ninguna atribución de signos a Fitzgerald. |
| R3-2 | P2 | La frase «Cómo se cuenta» de D1 decía «nos indicó tener en casa» | **Sí** | Ahora dice «…para episodios de dolor y que sabe que tenemos en casa». Es coherente con el README («Los veterinarios le preguntan si lo tiene en casa»). Queda un resto en la tabla de hechos: ver R4-1. |
| R3-3 | P2 | §11 ponía las ilustraciones en «Portada, H2-1 y H2-2» | **Sí** | §11 dice ahora «Portada y H2-1 (dos)», y coincide con §8 (Imagen 2 e Imagen 3 en H2-1). |

## Hallazgos nuevos

### P0 / P1

Ninguno.

### P2 (reservas que el redactor debe respetar)

**R4-1. La tabla de hechos de §2 conserva «tenerlo en casa fue indicación veterinaria».** Es otro resto del mismo error de N3 y R3-2, en otra sección.
- *Ubicación:* §2, tabla «Hechos documentados y límites», fila del meloxicam (línea 75), columna «Límite».
- *Evidencia:* el README dice: «Los veterinarios le preguntan si lo tiene en casa y le indicaron darles una tableta como máximo ante un dolor puntual». Los veterinarios saben que el medicamento está en casa y dieron una indicación de uso. No consta que le indicaran tenerlo en casa. La frase «Cómo se cuenta» y H2-4 ya están bien.
- *Instrucción:* sustituir por «Recetado por su veterinario para episodios de dolor; sus veterinarios saben que lo tiene en casa y le indicaron una tableta ante un dolor puntual (D1)». *Reserva para el redactor:* no escribir que el veterinario le indicó tener el medicamento en casa. Usar la formulación de «Cómo se cuenta» y de H2-4.

**R4-2. D1 amplía la indicación veterinaria con «o sigue».**
- *Ubicación:* §2, D1 (línea 83): «y que si el dolor es fuerte o sigue, vayan a consulta».
- *Evidencia:* el README dice «consultar si el dolor es mucho». La persistencia del dolor no figura. No se publica tal cual, porque D1 excluye la pauta, pero es un hecho del expediente ligeramente alterado.
- *Instrucción:* «y que si el dolor es mucho, vayan a consulta». *Reserva:* el redactor no atribuye al veterinario de Dakota ninguna indicación sobre dolor persistente. El consejo general para el lector («si crece, se extiende o sigue igual al día siguiente, consulta», FAQ 1) es del artículo, no del veterinario de Dakota.

**R4-3. La nota de §3 habla de «una sexta candidata» descartada, pero se conservan seis fuentes.**
- *Ubicación:* §3, bloque `[!IMPORTANT]` (línea 118): «Las seis fuentes se comprobaron… Se descartó una sexta candidata, Quantz et al. 2009».
- *Evidencia:* §3 lista seis fuentes (1–6), así que la descartada sería la séptima.
- *Instrucción:* «Se descartó una séptima candidata». *Reserva:* Quantz et al. 2009 no se cita en ninguna parte del artículo.

## Revisión completa desde cero

- **Metadatos:** `seoTitle` tiene **50** caracteres y `metaDescription` **151**, contados con `len()` (`python3 -I`). Coinciden con el YAML y con §1. `pilar: "salud-perros-mayores"` está en el enum de `src/content.config.ts` (línea 18). El slug, la ruta y los nombres de los `.webp` no llevan ñ, tildes ni espacios.
- **Presupuesto:** 350 + 650 + 700 + 600 + 650 + 600 + 350 + 550 = **4.450**. El rango del contrato (3.780–5.120) coincide con ±15 %, y la justificación se apoya en la utilidad.
- **Enlaces (7):** `procesionaria-pino-perros` (`salud-perros-mayores`, Publicado); `golpe-de-calor-perros-mayores` y `chequeo-geriatrico-canino` (`salud-perros-mayores`, status por defecto Publicado); `cama-ortopedica-perros-mayores-displasia-artrosis` (`movilidad-dolor-perros-mayores`, Publicado); `como-dar-medicacion-perro` (`cuidados-paliativos-perros`, Publicado). Todos coinciden con la URL del brief y figuran como publicados en el inventario. `src/pages/herramientas/calculadora-calidad-vida-perros.astro` existe.
- **Canibalización:** el inventario solo tiene esta entrada sobre picaduras, en `[~]` En Briefing (línea 243).
- **Experiencia frente al README:** el relato depurado, la tabla de hechos y el arco coinciden con el expediente: cama ortopédica, abeja en el suelo, una sola tableta, almohadilla roja sin aguijón, lamidas con caricias, dormida en el suelo a las 10:02 p. m., normal a las 10:37 a. m. con Rookie y sin veterinario. Las fotos de §8 corresponden a lo que describe el README (`foto-05`, `foto-10`, `foto-12`, `foto-02`). Aparte de R4-1 y R4-2, no hay ninguna frase que contradiga el expediente.
- **Grep de signos:** «colapso», «desmayo» y «encías pálidas» solo se atribuyen a la tabla 2 de Chapman («pallor… collapse, loss of consciousness»). «Tambaleo», «convulsiones» y «orina o heces con sangre» solo a Merck (envenenamiento masivo: «ataxia, seizures… hematuria and hematochezia»). Los «vómitos» de la AlertBox, a Chapman, grado 2. No aparecen «debilidad», «letargo» ni «temblor».
- **Límites clínicos:** no hay dosis, potencia, días ni marca en lo que se publica. No se atribuye la mejoría al meloxicam. No se afirma que tragarse el aguijón sea inocuo. La edad como factor de riesgo solo se presenta en personas. La media hora de vigilancia se declara como margen del artículo. Todo esto es coherente con la política editorial.
- **Componentes y arco:** AlertBox `info` (Introducción), `danger` (H2-2) y `warning` (H2-4); FAQ con 7 preguntas; ficha copiable en H2-5. El arco abre en la Introducción, se desarrolla en H2-3 y se cierra en H2-6 como sección propia. Dakota es el hilo principal. Las secciones dan instrucciones, no prosa terminada.
- **Visual:** los tres prompts nombran la misma beagle senior ilustrativa con los cinco rasgos y acaban en «Rechazar si a tamaño móvil parece un adulto joven». Las acciones son coherentes (la tarjeta raspa en paralelo y el paño va sin hielo directo). El entorno es latinoamericano. La repetición de raza está justificada por las fotos reales de Dakota. Las fotos llevan recorte y pie «Fotografía». No se planifican recortes ni animaciones, y eso está declarado.
- **Voz:** remite a la guía de voz y tono y a `tono.py`, y pide primera persona del plural.

## Verificación de fuentes (R4, desde cero)

Descargas en el scratchpad de la sesión (`audit4/`). Los PMID se leyeron con efetch, Chapman a texto completo en Europe PMC, y las páginas de Merck y la FDA con curl (HTTP 200).

| # | Fuente | Identificador | Identidad | Dato atribuido | Resultado |
|---|---|---|---|---|---|
| 1 | Fitzgerald y Flood 2006, *Clin Tech Small Anim Pract* 21(4):194-204 | PMID 17265905 · DOI 10.1053/j.ctsap.2006.10.002 | Correcta | Eritema, edema y dolor; anafilaxia «within 10 minutes»; no depende de la dosis; ≈20/kg; manejo conservador; «resolve in a few hours»; «closely monitored» | **Verificada.** Sin «diarrh», «collapse» ni «weakness», y el brief ya no se los atribuye |
| 2 | Visscher, Vetter y Camazine 1996, *Lancet* 348(9023):301-2 | PMID 8709689 · DOI 10.1016/s0140-6736(96)01367-0 | Correcta | Habón mayor con el retraso, «even within a few seconds»; sin diferencia entre raspar y pellizcar a los 2 s | **Verificada** |
| 3 | Shmuel y Cortes 2013, *J Vet Emerg Crit Care* 23(4):377-94 | PMID 23855441 · DOI 10.1111/vec.12066 | Correcta | Tipo I; veneno de insectos; adrenalina de elección; coadyuvantes que «do not substitute for epinephrine» | **Verificada** (resumen). Ya no se le atribuyen signos |
| 4 | Chapman et al. 2024, *Animals* 14(22):3220 | PMID 39595273 · PMC11591281 · DOI 10.3390/ani14223220 | Correcta (7 autores en orden) | 178 perros; pata 46 (28 %); boca OR 2,62; OR 2,11 / 2,06 / 2,43 / 4,48 (IC 1,28–15,71); 24 leves → 14 (58 %) / 10 (42 %); 12 de 19 (63 %); tabla 2 (grado 2 «dyspnea, stridor, wheeze, nausea, vomiting and/or abdominal pain»; grado 3 «cyanosis, pallor… collapse, loss of consciousness»); mediana de 1,7 años (0,2–14,7); inmunoterapia | **Verificada** |
| 5 | Nagy, *Merck Veterinary Manual*, «Full Review: Apr 2026», revisión por pares de Brutlag | URL profunda (HTTP 200) | Correcta | Dolor e hinchazón en minutos; aguijón y absceso; «resolve quickly, within minutes»; aguijón fuera, «cool compress», antihistamínicos; «more aggressive treatment»; africanizadas: «hundreds» de picaduras, parálisis facial, ataxia, convulsiones, hematuria y hematoquecia | **Verificada** |
| 6 | FDA CVM, «Get the Facts about Pain Relievers for Pets», «Content current as of: 09/29/2022» | URL profunda (HTTP 200) | Correcta | «Dogs are Not Small People»; vómitos, diarrea, heces negras o con sangre, menos apetito y actividad, amarillo en ojos o encías; úlceras, perforaciones, fallo renal y hepático; no dos AINE ni AINE con prednisona; análisis de hígado y riñón en tratamientos largos; «don't give any medication… until you talk to your veterinarian» | **Verificada** |

Trazabilidad fuente → H2: las seis fuentes tienen un H2 que desarrolla su dato (§9.2). Ningún H2 científico queda sin «Sustentado en», y no hay fuentes decorativas. Ninguna fuente está mal asignada, así que no hay efecto cascada que comprobar en otros briefs.

## Qué corregir

Las tres correcciones son opcionales antes de redactar, porque son P2. Si no se hacen, el redactor respeta las reservas de arriba:

1. **R4-1:** fila del meloxicam en la tabla de §2.
2. **R4-2:** «si el dolor es fuerte o sigue» → «si el dolor es mucho», en D1.
3. **R4-3:** «sexta candidata» → «séptima candidata», en §3.

El brief puede pasar a redacción. No hace falta R5 salvo que la corrección toque algo más que estas tres líneas.
