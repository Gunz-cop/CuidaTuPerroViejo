# Auditoría del brief — camas de entrada baja (ronda 1 de 3)

- **Documento:** `briefings/briefing-camas-entrada-baja-perro-mayor-comparativa.md`, commit `3b98c7d`, sha256 `636308ff55abb342d7ac5416c9e8c09413ce6094151e34183268dab8c7b97d92`.
- **Fecha:** 11/11/2026. **Rol:** auditor externo (`auditar-briefing-contenido` + `generar-briefing-afiliados`). No se ha modificado ningún otro archivo.
- **Normas aplicadas:** `generar-briefing-contenido`, `generar-briefing-afiliados` y su plantilla, `docs/seo/afiliacion-aliexpress.md`, `docs/afiliacion/prospectos-afiliados.md`, `direccion-visual-editorial.md`, `calidad-editorial-adsense.md`, `INVENTARIO_CONTENIDO.md`, `src/content.config.ts` y la guía publicada de camas.

## Veredicto

**No válido para redacción.** La §4 fija umbrales numéricos (≤ 8 cm de entrada, núcleo ≥ 7 cm, +15–20 cm de margen, bordes de 10–25 cm) y los atribuye a F1, F2 y F3. Ninguna de esas fuentes los contiene, y la guía publicada niega expresamente que existan «un grosor por peso» o «una densidad mínima». A esto se suman los bloqueos de datos que el propio brief ya reconoce: las fichas B y C están vacías y la discrepancia de la ficha A sigue sin resolver.

Hay una limitación. AAHA devuelve 403 tanto a WebFetch como a curl. Su existencia y su tema los confirmé por búsqueda y por la cita idéntica en la guía publicada, pero no pude leer el texto completo de las dos páginas AAHA (ver la tabla de fuentes).

## Hallazgos

### P0

1. **§4, criterios «Altura de entrada», «Núcleo» y «Superficie útil»: umbrales atribuidos a fuentes que no los contienen.**
   - «≤ 8 cm … (F1)», «Bloque ≥ 7 cm … que no toque suelo con el codo (F2)» y «+15–20 cm».
   - Las guías AAHA hablan de modificar el entorno y de usar cama acolchada/soft bedding, sin cifras. La búsqueda sobre la página de modalidades no farmacológicas devuelve recomendaciones cualitativas (cage pads, soft bedding, nonslip rugs) y ninguna cota.
   - La guía publicada, en «Qué respalda la orientación veterinaria», dice: «Lo que no hacen es fijar una densidad mínima de espuma, un grosor por peso…». Además, en su FAQ: «No se establece una cifra clínica universal».
   - Consecuencia: el brief contradice la línea editorial del sitio y la política de no inventar pautas. Si se redacta así, el artículo comercial afirmaría lo que la guía informativa desmiente.
2. **§4, «Los bordes comen 10–25 cm (ejemplo F3)». La cifra no está en F3.**
   - Calculado con el diagrama de la guía de afiliación: 76,2−65,5 = 10,7; 50,8−40,6 = 10,2; 88,9−76,2 = 12,7; 55,9−45,0 = 10,9; 91,4−80,0 = 11,4; 68,6−57,4 = 11,2.
   - El rango real va de **10,2 a 12,7 cm**. Los «25 cm» son una invención presentada como ejemplo real.
3. **§6 ficha A, «Variante analizada»: asigna al título 71 × 58 × 16 la superficie del diagrama 65,5 × 40,6 cm.**
   - Esa superficie pertenece a la fila del diagrama de **76,2 × 50,8 × 19,1 cm** exteriores.
   - La guía de afiliación (§ «Diagrama de tallas») dice: «Ninguna fila corresponde de forma inequívoca a una de las cuatro variantes».
   - El brief escribe «discrepancia sin resolver», pero en la misma celda ya establece la correspondencia. Ese dato se propagaría a la tabla §5, a I-3 y al «No para».

### P1

4. **Falta el frontmatter y la `metaDescription`; el título SEO excede el límite.**
   - No hay bloque YAML (`title`, `seoTitle`, `metaDescription`, `heroImage*`, `datePublished`), y la plantilla de afiliados no lo pide, aunque la skill base sí. `metaDescription` no existe.
   - El «Título SEO» mide **76** caracteres (máx. 55, contado con `len()`). El H1 mide 88.
   - El pilar `movilidad-dolor-perros-mayores` sí existe en el enum: puede quitarse el «(confirmar enum)».
5. **El presupuesto de palabras no cuadra.**
   - Suma exacta de los rangos de §7: entradilla 80–120, H2-1 150–200, H2-2 250–300, H2-3 900–1 100, H2-4 180–220, H2-5 120–160, H2-6 120–160 y bloque final 80–120 dan **1 880–2 380**.
   - El contrato de §1 dice **1 600–2 100**. El mínimo de las secciones ya supera en 280 palabras el mínimo del contrato.
6. **Ficha A: el precio que se compara es el promocional.**
   - §6 usa «MX$774.61 oferta comprador nuevo» como precio MX. La propia §4 dice «Las ofertas de comprador nuevo distorsionan».
   - La guía de afiliación («Decisión editorial») excluye del bloque «el precio promocional». Para MX falta el precio de comprador habitual y para ES el coste total con aranceles. Hoy la fila A de la tabla mezcla un precio de oferta (MX) con uno sin aranceles (ES).
7. **F4 trae una URL distinta de la que dice copiar.**
   - El brief cita `…/enforcement-consumer-protection/sweeps_en` «tomada de la guía de afiliación». La guía cita `…/influencer-legal-hub_en`.
   - Comprobado: la página *sweeps* es un histórico de barridos 2007–2025 y no menciona la afiliación. La de *influencer legal hub* dice expresamente que el affiliate marketing «must be disclosed».
   - Además, F4 solo se usa en §10, sin H2, y falta el marco que exige la skill de afiliados (España: TRLGDCU / Ley General de Publicidad / LSSI art. 20; México: LFPC/PROFECO). §10 no los menciona.
8. **Componentes estructurales sin decisión documentada.** La skill de afiliados dice «todo lo de esa skill sigue vigente», pero el brief no planifica AlertBox (`info`/`danger`/`warning`) ni FAQ, y tampoco justifica la excepción. Como mínimo hace falta un `danger` en H2-6 («si empeora la rigidez…» merece la señal de urgencia que ya usa la guía) y una FAQ comercial (talla, devolución, aranceles), o bien una exclusión explícita y razonada.
9. **§8: no hay prompts de imagen ni requisito senior.**
   - I-1 (portada generada) se queda en una línea sin prompt.
   - Faltan los ocho bloques de la dirección visual, los cinco rasgos del requisito senior verificable, la línea «Rechazar si a tamaño móvil parece un adulto joven» y la ficha de aceptación.
   - No hay lista de razas recientes. Beagle aparece en 3 `heroImageAlt` y en la guía dental. Si la portada es un beagle genérico, se repite raza sin motivo documentado y además puede confundirse con Luna/Dakota. Falta también el `alt` de cada pieza, que la plantilla de afiliados pide.
10. **No hay referencia a la guía de voz y tono** (`guia-voz-tono.md`) ni medición con `tono.py`.
11. **§2, procedencia: incompleta y con un dato no trazado.**
    - Luna (2015) y Dakota (2014), beagles, sí están verificados en `miedo-polvora-perros-mayores.mdx` y en dos briefs. El peso de «~12–15 kg» no aparece en el repo.
    - El brief omite la experiencia ya publicada en «Lo que vivimos con Luna y Dakota»: camas compradas por la palabra «ortopédica», «más grandes que ellas», sin tocar el suelo, en perfecto estado tras más de un año. Ese es el material real para H2-2, y no hay que pedirlo de nuevo.
12. **H2-4 (180–220) y H2-6 (120–160) no llevan `Sustentado en:`.** H2-4 hace afirmaciones de comercio transfronterizo (aranceles en ES, devoluciones) que deben salir de la ficha capturada o de una fuente con fecha.

### P2

13. **Ficha C (catre, entrada ≤ 20 cm) entra en conflicto con el criterio de entrada ≤ 8 cm** en una página titulada «entrada baja». O se justifica el perfil fuera del título o se sustituye.
14. **§9:** la ancla entrante «Tracción» o «Descanso» no es exacta. Los H2 reales de prevención de caídas son «Tracción: comprueba el conjunto, no solo el material» y «Cama y zona de descanso». En cambio, los H2 de la guía citados en H2-5 y H2-6 («Cuándo reemplazar o adaptar la cama», «Qué observar después de un cambio») existen.
15. **Estado del inventario:** el artículo no figura en `INVENTARIO_CONTENIDO.md` como `[~] (En Briefing)`.
16. **§6 ficha A, «Para quién: perro pequeño-mediano que apoya la cabeza en el borde»** es un juicio editorial sin dato de soporte. Debe marcarse como criterio propio y derivarse de la superficie una vez confirmada.

## Verificación de fuentes

| Fuente | Identificador | Resultado | Lo que el brief le atribuye |
| --- | --- | --- | --- |
| F1 AAHA 2023 Senior, Pain Management | URL profunda | Existe (indexada; la cita la guía publicada). Texto no leído: 403 | «Adaptar el entorno» es plausible y coincide con la guía. **«≤ 8 cm» no corresponde (P0-1)** |
| F2 AAHA 2022, Nonpharmacologic Modalities | URL profunda (DOI del documento 10.5326/JAAHA-MS-7292) | Existe; la búsqueda devuelve bedding/cage pads sin cifras. Texto no leído: 403 | **«Bloque ≥ 7 cm / codo no toca suelo» no corresponde (P0-1)** |
| F3 Guía de afiliación (diagrama) | Documento interno | Verificada | **«10–25 cm» falso (10,2–12,7) y fila del diagrama mal asignada (P0-2, P0-3)** |
| F4 Comisión Europea | `sweeps_en` | Existe, pero el tema no corresponde. La URL correcta de la guía es `influencer-legal-hub_en` | P1-7 |
| Ficha A | `es.aliexpress.com/item/1005009119696851.html` | HTTP 200 (11/11). El precio y la entrega no son comprobables sin sesión por país; coinciden con la guía de afiliación | P1-6 |

Quedaron sin abrir en texto completo las dos páginas AAHA, por bloqueo 403. El veredicto no depende de ellas: aunque contuvieran cifras, la guía publicada del propio sitio afirma que no las hay.

## Afiliación: cumplimiento

Está bien resuelto: `rel="sponsored noopener noreferrer"`, aviso bajo el CTA y en la entradilla, nada de `Review`/`AggregateRating`, precios con fecha, «ortopédica» atribuida al vendedor, exclusiones respetadas (rampas y sillas fuera), un Tracking ID por ficha, criterio de retirada, video del vendedor bloqueado por derechos, fotos solo con derechos documentados, proyección Markdown sin bloques comerciales y rama distinta de `main`.

Falta el marco legal por país (P1-7) y documentar la elegibilidad de la ficha A para el canal: la guía la deja «pendiente de validación comercial».

## Canibalización

La separación informativa/comercial está justificada y la regla de enlaces es correcta. El riesgo real es otro: que §4 reintroduzca, con cifras, la explicación clínica que la guía evita a propósito (P0-1). Con la keyword «cama perro mayor entrada baja» no hay choque directo con «cama ortopédica perro mayor».

## Solidez de la skill y del listado

**Skill `generar-briefing-afiliados`:** el enfoque es bueno, pero tiene huecos que explican varios hallazgos.

- No exige frontmatter ni `metaDescription`, y su plantilla tampoco.
- No aclara si siguen vigentes los AlertBox y la FAQ.
- No pide prompts de imagen ni el requisito senior para las imágenes generadas.
- No prohíbe los umbrales numéricos sin fuente en «Criterios de compra», justo la sección donde nació el P0.
- No exige separar precio promocional y precio habitual.
- Nombra la ley española de forma imprecisa: debe citarse como TRLGDCU (RDL 1/2007), más la Ley General de Publicidad y el art. 20 de la LSSI.

**Listado de prospectos:** la priorización por ticket es razonable, pero tiene cifras sin traza.

- La horquilla de comisión «~3 %–9 % según categoría» no tiene fuente.
- Los tickets orientativos (50–120 € / MX$800–2 500, etc.) no tienen fecha ni captura. El único dato observado, 53,39 € / MX$774,61, cae por debajo del rango declarado para el prospecto 1.
- El prospecto 1 dice «perro mayor grande», pero la ficha piloto es una talla para perro pequeño-mediano.
- Todo esto debe marcarse como estimación o completarse con capturas fechadas.

## Efecto cascada

- No existe todavía un artículo redactado desde este brief.
- Los umbrales de §4 no deben migrar a la guía de camas ni a la ficha `cama-guia-01`. Conviene comprobar que `CamaAfiliada.astro` no muestra cifras de superficie atribuidas a la variante de 71 cm.
- La URL `sweeps_en` no aparece en otros briefs: solo en este.
- Los futuros briefs de rampas y carritos heredarán los huecos de la skill si no se corrige.

## Lo que sí funciona

- Hay honestidad en lo no probado: §2 declara que ningún modelo se usó y fija «según la ficha del vendedor». No hay que «completarlo».
- Las fichas B y C, enteras en `pendiente` en lugar de inventadas, y los bloqueos explícitos de §12.
- Separación criterio/ficha y precios por país con fecha de captura.
- I-2/I-3 tienen función de compra, I-4 no usa fotos sin derechos e I-5 es una foto real con pie aclaratorio.
- Alternativa sin compra (H2-5) y enlaces internos existentes y publicados: la guía de camas, prevención de caídas y el selector.

## Qué corregir, en orden (para otra sesión)

1. **§4:** elimina «≤ 8 cm», «≥ 7 cm», «+15–20 cm», «codo no toca suelo» y «10–25 cm». Sustitúyelos por criterios cualitativos coherentes con la guía publicada («entrada que pueda salvar sin saltar», «que no se hunda hasta una base dura», «espacio útil dentro de los bordes para su postura habitual»). Si se quiere una cifra, debe ser la medida del propio perro, no un umbral. Cita los bordes del diagrama como «unos 10–13 cm en las tres filas del diagrama del vendedor (F3)».
2. **§6 ficha A:** separa los datos del título (71 × 58 × 16) de los del diagrama (filas 76,2 × 50,8 × 19,1 → 65,5 × 40,6, etc.) y escribe que no se sabe a qué variante corresponde cada fila. En «Precio MX», añade el precio de comprador habitual o `pendiente`, y que la oferta no entra en la tabla. En «España», añade el coste con aranceles o `pendiente`.
3. **F4:** cambia la URL por `https://commission.europa.eu/topics/consumers/consumer-rights-and-complaints/influencer-legal-hub_en`. En §10, añade el marco ES (TRLGDCU, Ley 34/1988 General de Publicidad, LSSI art. 20) y MX (LFPC, art. 32 y PROFECO), con URL profunda verificada.
4. **§3/§7:** añade `Sustentado en:` a H2-4 (capturas de ficha con fecha) y a H2-6 (guía de camas, F1).
5. **§1:** añade un bloque YAML completo con `seoTitle` ≤ 55 y `metaDescription` ≤ 160, medidos con comando, y quita «(confirmar enum)».
6. **Presupuesto:** cuadra los rangos de §7 con el contrato. O sube el contrato a 1 900–2 300, o recorta H2-3 a 800–950.
7. **Componentes:** planifica los AlertBox `info` (entradilla: la cama no trata), `warning` (H2-3 o H2-4: talla/devolución) y `danger` (H2-6: empeoramiento) y una FAQ de 3–4 preguntas, o documenta la exclusión.
8. **§8:** escribe el prompt completo de I-1 según la dirección visual (8 bloques, 5 rasgos senior, línea de rechazo móvil, aceptación). Elige y justifica la raza frente a la lista de recientes (beagle ya aparece 3+ veces), aclara que no es Luna/Dakota y añade el `alt` de cada pieza.
9. **§2:** usa la experiencia publicada en «Lo que vivimos con Luna y Dakota» y quita «~12–15 kg» o pide el dato al propietario.
10. **§9:** corrige las anclas a «Tracción: comprueba el conjunto, no solo el material» y «Cama y zona de descanso». Decide el encaje de la ficha C.
11. Remite a `guia-voz-tono.md` y al uso de `tono.py`, y marca el artículo `[~] (En Briefing)` en el inventario.
12. **Skill y listado (PR aparte):** amplía la plantilla con frontmatter, componentes, prompts de imagen, la prohibición de umbrales sin fuente y la distinción precio promocional/habitual. Marca en el listado los tickets y comisiones como estimaciones sin captura.

Ronda 1 de un máximo de 3.
