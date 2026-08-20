# Estudio de viabilidad: multilenguaje, variante de español y futuro del sitio

**cuidatuperroviejo.com** · Datos: Google Search Console, últimos 3 meses (19/05/2026 – 18/08/2026, exportado el 20/08/2026)

---

## Resumen ejecutivo

| Pregunta | Veredicto |
| :--- | :--- |
| ¿Versión multilenguaje (inglés u otro idioma)? | **No ahora.** Única excepción de bajo coste: versión EN de la calculadora HHHHHMM. |
| ¿Pasar los textos a español de España? | **No.** El 50% del tráfico es de Latinoamérica; el español neutro actual es la variante correcta. |
| ¿Tiene potencial el sitio? | **Sí, alto en su nicho.** Impresiones ×2 en 3 meses con solo ~16 artículos, y ~27% de la visibilidad ya viene de funciones de IA generativa. |
| ¿Reforzar los pilares (texto, imágenes, vídeo)? | **Sí, en este orden: texto → imágenes → vídeo.** Los pilares reciben miles de impresiones con CTR bajo: es la mejora más barata disponible. |

---

## 1. Datos base (últimos 3 meses)

- **~1.190 clics** y **~51.500 impresiones**; posición media 7–8, CTR ~2,3%.
- **Tendencia:** las impresiones diarias pasaron de ~450 (mayo) a ~1.000 (agosto). Los clics se mantienen planos (10–20/día): Google muestra el sitio cada vez más, pero el CTR no acompaña todavía.
- **Dispositivos:** 96% móvil + tablet. Cualquier decisión de diseño/UX debe ser mobile-first.
- **Geografía (clics):** España 536 (45%) · México 166 · Argentina 103 · Chile 92 · Colombia 88 · Perú 29 · resto LATAM ~120 · EE.UU. 34 (mayoritariamente búsquedas en español) · Europa no-ES ~15.
- **Funciones de IA generativa (AI Overviews):** ~13.900 impresiones en 3 meses, ≈27% de la visibilidad total. Las páginas más citadas: cuidados paliativos, incontinencia urinaria, comida casera y la calculadora HHHHHMM.
- **Contenido ganador:** la calculadora de calidad de vida HHHHHMM es la página nº 1 en clics (197 + 63 en su URL duplicada) con CTR ~10,5%, muy por encima de la media del sitio. Le siguen comida casera (133), cuidados paliativos (76) e incontinencia urinaria (40).
- **Backlinks:** petmetric.vet enlaza a la escala HHHHHMM desde 8 versiones idiomáticas (en, de, fr, it, pt, pl, ca, es). Es el único activo del sitio con demanda internacional demostrada. El resto de enlaces (mediatize.info, blogspot de prueba) son de bajo valor.

### ⚠️ Hallazgo técnico colateral: canibalización de URLs

En el informe de páginas, casi cada contenido aparece **3–4 veces**: con `.html`, sin extensión, con `/` final, y con las rutas antiguas de Blogger (`www.cuidatuperroviejo.com/p/...` y `/2025/10/...`). Ejemplo: la calculadora suma 197 + 63 clics repartidos entre dos URLs; comida casera, 133 + 16.

Esto divide la autoridad de cada página entre variantes y explica parte del CTR/posición mediocres. **Es la corrección de mayor retorno inmediato del sitio:** canonical único por página, redirecciones 301 desde todas las variantes (incluidas las heredadas de Blogger) y sitemap solo con las URLs canónicas.

---

## 2. ¿Versión multilenguaje? — No ahora

**Argumentos en contra (dominantes):**

1. **No hay demanda medida.** El tráfico actual en inglés u otros idiomas es ~0. Las impresiones fuera del mundo hispanohablante son residuales (Reino Unido 70 impresiones/0 clics; Alemania 127/3, probablemente hispanohablantes residentes).
2. **El mercado EN está saturado.** "Senior dog care" lo dominan AKC, PetMD, Rover y portales veterinarios con autoridad de dominio inalcanzable a corto plazo. En español, en cambio, el nicho "perro mayor/senior" tiene poca competencia especializada — que es exactamente donde el sitio está ganando.
3. **Coste de mantenimiento ×2 con ~16 artículos.** Cada corrección, actualización clínica o artículo nuevo se duplicaría. Con el catálogo aún pequeño, cada hora invertida en traducir rinde menos que la misma hora invertida en un artículo nuevo en español (ver consultas en posición 15–60 sin explotar, §4).
4. **Sin infraestructura i18n.** Astro la soporta bien, pero hoy no hay rutas por locale, ni hreflang, ni layout preparado. Es un proyecto técnico completo, no un ajuste.

**La excepción que sí merece la pena — versión EN de la calculadora HHHHHMM:**

- Ya recibe backlinks desde 8 idiomas (petmetric.vet) y consultas en inglés ("alice villalobos quality of life scale").
- Es una herramienta, no un artículo: traducirla es un coste único, sin mantenimiento editorial continuo.
- Serviría de experimento controlado: si `/en/tools/quality-of-life-calculator` capta tráfico orgánico EN en 3–6 meses, ese dato (y no una intuición) justificaría ampliar. Requiere hreflang recíproco entre ambas versiones.

**Otras lenguas (pt, fr, de):** descartadas por ahora. Brasil aporta 2 clics/132 impresiones; no hay señal.

---

## 3. ¿Español de España? — No: el neutro actual es la variante correcta

- **La mayoría del tráfico no es español.** España aporta el 45% de los clics; LATAM + EE.UU. hispanohablante, ~52%. Adoptar léxico peninsular y "vosotros" optimizaría para la minoría alienando a la mayoría.
- **El texto actual ya está bien resuelto:** tuteo ("tu perro"), sin voseo, sin vosotros, sin localismos marcados. Es español neutro de facto — la elección estándar de los medios panhispánicos precisamente por esto.
- **Google no separa es-ES de es-MX a nivel de ranking** de forma que justifique versiones regionales; fragmentar en es-ES/es-419 con hreflang duplicaría contenido casi idéntico (riesgo de duplicación, coste ×2) sin volumen que lo respalde.

**Recomendación operativa:** mantener `lang="es"` genérico y añadir a las skills de redacción (`.agents/skills/redactar-articulo-blog/`) una norma explícita de "español neutro panhispánico": tuteo, evitar léxico marcado (ordenador/computadora → alternar o usar genéricos, pienso → mencionar también "croquetas/alimento seco", que aparece en las consultas de México). Las consultas confirman ambos vocabularios: "pienso perros senior" (ES) y "croquetas para perros viejos" (LATAM, 62 impresiones) — el contenido puede cubrir ambos términos en el mismo artículo, que es más barato y más eficaz que dos variantes.

---

## 4. Potencial y futuro del sitio — Alto, con tres palancas claras

**Señales positivas en los datos:**

- Impresiones duplicadas en 3 meses sin apenas contenido nuevo: Google está ampliando las consultas para las que considera relevante el sitio.
- ~27% de visibilidad vía AI Overviews: el contenido ya es material de cita para IA. En un futuro de búsqueda dominado por respuestas generativas, ser fuente citada en un nicho concreto es una posición defendible.
- El nicho tiene intención emocional fuerte (paliativos, calidad de vida, eutanasia) donde el usuario busca profundidad y confianza, no la respuesta rápida de un agregador — el tipo de consulta que sigue generando clic incluso con AI Overviews.
- La calculadora HHHHHMM demuestra el modelo: herramienta + artículo clínico = CTR 10% y backlinks espontáneos.

**Palancas, por orden de retorno:**

1. **Higiene técnica (semanas):** canonicals + 301 de todas las variantes de URL (§1). Es la única acción que mejora todas las páginas a la vez.
2. **Contenido contra demanda ya medida (meses):** hay consultas con cientos de impresiones donde el sitio ranquea en posición 15–60 (sin clics): "alimentación natural para perros mayores" (209 impr., pos. 23), "comida natural para perros senior" (179, pos. 18), "síndrome de Cushing esperanza de vida" (86, pos. 29), "incontinencia urinaria en perros" (69, pos. 36), "croquetas para perros viejos" (62, pos. 49). Reforzar/crear artículos contra estas consultas es tráfico casi garantizado: Google ya muestra el sitio, solo hay que subir 10–20 puestos.
3. **Herramientas como foso competitivo (trimestres):** la hoja de ruta ya definida en `INVENTARIO_CONTENIDO.md` (test CCDR, calculadora de porciones, escala de dolor, registro de medicación → ficha clínica del perro) es exactamente lo que los datos validan. Un artículo se copia o se resume en un AI Overview; una herramienta con histórico por perro genera visitas recurrentes y es infungible.

**Riesgo principal:** que las impresiones sigan creciendo sin clics (patrón visible en julio–agosto). Mitigación: titles/meta descriptions orientados a CTR en las páginas con más impresiones, y la corrección de canonicals.

---

## 5. ¿Reforzar los pilares? — Sí: texto primero, imágenes después, vídeo no todavía

Los datos del propio informe lo justifican: las páginas pilar reciben mucha visibilidad con poco clic.

| Pilar (URL principal + variantes) | Impresiones | Clics | CTR | Posición |
| :--- | ---: | ---: | ---: | ---: |
| Alimentación perros senior | ~6.500 | ~120 | ~1,8% | 10–14 |
| Salud mental y emocional | ~6.500 | ~92 | ~1,4% | 7 |
| Cuidados paliativos | ~4.400 | ~101 | ~2,3% | 5–6 |
| Movilidad y dolor | ~4.200 | ~60 | ~1,4% | 6–7 |
| Higiene y hogar | ~1.800 | ~30 | ~1,7% | 5–6 |

1. **Texto (ahora):** convertir cada pilar en una guía hub real — respuesta directa arriba (los AI Overviews citan pilares: salud mental 713 impresiones IA, alimentación 650), tabla de contenidos, resumen por subtema con enlace al artículo, FAQ contra las consultas medidas. Title y meta description reescritos para CTR. Coste bajo, afecta a las 5 páginas con más impresiones del sitio.
2. **Imágenes (después):** imágenes propias y útiles (infografías: escala HHHHHMM visual, tabla de raciones, posturas de dolor) — no stock. Diferencian en resultados de imagen y son citables/embebibles (fuente de backlinks, como demuestra petmetric.vet con la escala). Coste medio.
3. **Vídeo (posponer):** nada en las consultas ni en las funciones de búsqueda indica demanda de vídeo. Coste de producción alto y mantenimiento de otro canal. Reconsiderar cuando los pilares estén reforzados y haya volumen (p. ej. demostraciones físicas: masaje articular, dar medicación, mover un perro con movilidad reducida — los únicos temas del catálogo donde el vídeo aporta algo que el texto no puede).

---

## 6. Plan de acción priorizado

| # | Acción | Horizonte | Retorno esperado |
| :-: | :--- | :--- | :--- |
| 1 | Canonicals + 301 de variantes de URL y rutas Blogger | Semanas | Consolida autoridad en todas las páginas; mejora posición/CTR global |
| 2 | Reforzar los 5 pilares (texto, estructura hub, titles/metas) | Semanas | +CTR en las 5 páginas con más impresiones |
| 3 | Artículos contra consultas en posición 15–60 (alimentación natural, Cushing+alimentación, croquetas/pienso senior) | Meses | Tráfico casi garantizado: Google ya muestra el sitio |
| 4 | Infografías propias en pilares y artículos top | Meses | Diferenciación, backlinks, resultados de imagen |
| 5 | Versión EN de la calculadora HHHHHMM (experimento controlado, con hreflang) | 1 trimestre | Dato real sobre demanda internacional antes de invertir más |
| 6 | Hoja de ruta de herramientas → ficha clínica (según INVENTARIO_CONTENIDO.md) | Trimestres | Foso competitivo, tráfico recurrente, inmune a AI Overviews |
| — | Traducción del blog · reescritura a es-ES · vídeo | Descartado por ahora | Reevaluar con datos del experimento #5 y pilares reforzados |
