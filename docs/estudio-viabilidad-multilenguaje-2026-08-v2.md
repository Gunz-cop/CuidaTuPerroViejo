# Estudio de viabilidad (v2): multilenguaje, variante de español y futuro del sitio

**cuidatuperroviejo.com** · Versión 2, tras contraste con el análisis integrado de Sol (`docs/estudio-viabilidad-multilenguaje-sol-2026-08.md`)
Datos: Google Search Console, 19/05/2026 – 18/08/2026 (92 días) · Bing según el informe de Sol · Código del repositorio verificado a fecha de esta versión.

> Esta v2 sustituye a la v1 (`estudio-viabilidad-multilenguaje-2026-08.md`, que se conserva como historial). Incorpora las correcciones de Sol que he podido verificar contra los datos y el código, mantiene las posiciones donde la evidencia lo respalda, y reconcilia el diagnóstico técnico de URLs con referencias exactas a archivo y línea.

---

## Resumen ejecutivo

| Pregunta | Veredicto (sin cambios de rumbo respecto a v1; cambian los matices) |
| :--- | :--- |
| ¿Versión multilenguaje (inglés u otro idioma)? | **No ahora.** Piloto EN de la calculadora HHHHHMM **condicionado**: solo tras consolidar URLs, confianza clínica y medición (no de inmediato, como sugería la v1). |
| ¿Pasar los textos a español de España? | **No.** Español internacional con tuteo. Contenido específico para España solo cuando cambie algo material (productos, normativa, servicios). |
| ¿Tiene potencial el sitio? | **Sí, alto: 8/10.** Y mejor de lo que decía la v1: los clics crecieron +161,7% entre los primeros y últimos 28 días — el sitio está en expansión, no estancado. |
| ¿Reforzar los pilares (texto, imágenes, vídeo)? | **Sí.** Orden: confianza clínica + texto/estructura → imágenes originales → piloto de vídeo de 4 piezas medible (no descarte total como en v1). |

**El reframe que adopto de Sol:** el objetivo no es "un blog más grande", sino ser el recurso en español más útil para cuidar un perro mayor — guías conectadas, herramientas con recurrencia y contenido clínico verificable. Esa posición es más defendible frente a competidores y respuestas generativas que cualquier expansión temprana de idiomas.

---

## 1. Qué corrige esta v2 tras el contraste con Sol

He verificado cada corrección contra los archivos originales antes de aceptarla:

| Tema | v1 decía | v2 (verificado) |
| :--- | :--- | :--- |
| Clics | "Los clics siguen planos (10–20/día)" | **Incorrecto.** Primeros 28 días: 201 clics / 10.659 impresiones; últimos 28: 526 / 24.204. **+161,7% clics, +127,1% impresiones.** El crecimiento sí está alcanzando a los clics (CTR 1,89% → 2,17%). |
| Dispositivos | "96% móvil + tablet" | **Incorrecto.** Móvil 962 + tablet 19 = **82,4% de los clics**. Mobile-first sigue siendo la prioridad, pero escritorio es ~18% de los clics (con peor posición media: 10,5) y no debe degradarse. |
| AI Overviews | "27% de la visibilidad" | **Matizado.** Las 13.805 impresiones IA equivalen al 26,8% de las impresiones web, pero pueden solaparse o ser subconjunto: son señal de **citabilidad**, no cuota de tráfico ni clics atribuibles. Dato nuevo relevante: crecieron de 3.142 a 6.028 entre los primeros y últimos 28 días. |
| Contenido nuevo | "Impresiones ×2 sin apenas contenido nuevo" | **Matizado.** Varios artículos se publicaron el 15–17 de agosto y solo tienen 1–3 días dentro de la exportación: no son evaluables ni deben reescribirse por rendimiento todavía. |
| Consultas | Se usaron como si fueran el universo completo | **Matizado.** El informe de consultas solo atribuye ~96 de los 1.190 clics (anonimización de Google): sirve para orientar temas, no para medir demanda absoluta. Aplica también a la lectura "0 demanda en inglés": es señal débil, no prueba de ausencia. |
| Bing | No analizado | Según Sol: 59 clics / 2.638 impresiones en el periodo, en descenso en los últimos 28 días. No cambia la estrategia; refuerza la revisión de canonicals/sitemap/IndexNow. Señal secundaria. |

### El diagnóstico de URLs, reconciliado (aquí la v1 tenía parte de razón)

Sol reframea mi "canibalización activa" como "problema de migración y atribución que debe auditarse, porque las redirecciones comprobadas funcionan". Verificado en código, **ambos teníamos media verdad**:

- **Sol tiene razón en lo histórico:** las rutas de Blogger (`/p/...`, `/2025/...`, `/2026/...`) están cubiertas por 22 reglas 301 en `public/_redirects`. Esa parte de las métricas fragmentadas es herencia de la migración, no duplicación vigente.
- **La v1 tenía razón en lo vigente, y ahora con causa exacta:** `astro.config.mjs` compila con `build.format: 'file'` (cada página existe como `pagina.html`), y el canonical de `src/layouts/BaseLayout.astro:22-23` normaliza la barra final pero **no elimina `.html`**. Resultado: `/pagina.html` y `/pagina` se sirven ambas, cada una con canonical auto-referente distinto. Es duplicación **viva** — y explica por qué Search Console reporta impresiones recientes en ambas variantes (la calculadora: 197 clics en `.html` + 63 sin extensión).
- **Corrección concreta (pequeña):** normalizar `.html` en el cálculo del canonical de `BaseLayout.astro` + regla de redirección 301 de `.html` → sin extensión (o viceversa, pero una sola forma), y sitemap solo con la forma canónica. Sigue siendo la acción técnica de mayor retorno del sitio, ahora con un diagnóstico preciso en vez de una intuición.

### Lo que adopto de Sol sin reservas

Su **prioridad cero de confianza**, que la v1 no vio y es probablemente su mejor aporte. Verificado en el código:

- Citas atribuidas a "Dra. Verónica Gaitán, veterinaria geriatra canina" y "Dra. Laura Benítez, especialista en comportamiento animal (UCM)" en `src/content/pilares/salud-mental-emocional-perros.mdx:61,119` — si no existe fuente inequívoca, hay que verificarlas o retirarlas.
- "Elaborada por veterinarios y especialistas" en `src/content/pilares/cuidados-paliativos-perros.mdx:19` — sustituir por autoría/revisión real e identificable.
- `dateModified` se regenera en **cada build** (`src/pages/[pilar]/[slug].astro:47`, `src/pages/[pilar].astro:31`): el schema comunica actualizaciones que no ocurrieron. Debe salir del frontmatter/fecha real.

En un tema YMYL de salud animal, esto va **antes** que cualquier contenido nuevo, idioma o formato: protege al lector y al posicionamiento a la vez.

---

## 2. Multilenguaje: no ahora — y el piloto EN, condicionado

La conclusión de la v1 se mantiene, endurecida por Sol en el "cuándo":

- Demanda EN medida: 6 consultas visibles, 22 impresiones, 1 clic (con la salvedad de la anonimización: señal débil, no prueba absoluta). Portugués: 2 consultas, 6 impresiones, 0 clics. Francés/alemán: nada accionable.
- El mercado EN de "senior dog care" está dominado por portales con autoridad inalcanzable a corto plazo; entrar sin un activo diferencial sería competir con artículos genéricos desde cero.
- No hay infraestructura i18n (rutas por idioma, hreflang, locale social `es_ES` fijo), y el coste real no es técnico sino editorial: mantener traducciones clínicamente correctas en paralelo.

**Piloto EN de la calculadora HHHHHMM — sí, pero en orden** (corrijo la v1, que lo dejaba lanzable de inmediato):

1. Consolidar canonicals/redirecciones de las URLs españolas (§1).
2. Resolver las señales de autoría y revisión clínica (prioridad cero).
3. Añadir a la herramienta funciones diferenciales (historial, PDF propio, exportación para el veterinario).
4. Solo entonces crear `/en/tools/quality-of-life-calculator/` con traducción humana revisada y hreflang recíproco.
5. Evaluar 3–6 meses: impresiones, clics no de marca, uso real, enlaces. Ampliar a un pequeño clúster EN (calidad de vida + paliativos) únicamente si el piloto tracciona.

Condiciones de activación adicionales (de Sol, razonables): tráfico español estable o creciente ≥3 meses y un perfil de enlaces menos estrecho (hoy: 21 páginas enlazantes pero solo ~4 dominios; objetivo 10–15 dominios relevantes).

---

## 3. ¿Español de España? No — español internacional, con una adición

Sin cambios de fondo respecto a la v1: España aporta el 45% de los clics pero la suma no española es mayor; los textos ya usan tuteo sin vosotros ni voseo; fragmentar en es-ES/es-419 duplicaría revisiones sin intención de búsqueda distinta.

Matiz de Sol que incorporo: el léxico actual tiene inclinación peninsular ("pienso", "coche") — la norma editorial debe cubrir sinónimos regionales de forma natural ("pienso o alimento seco", "croquetas") sin amontonarlos como keywords. Y dos adiciones selectivas:

- **Páginas específicas para España solo cuando cambie algo material:** disponibilidad de productos, seguros, normativa, directorios — no duplicados regionales del blog.
- **EE.UU. hispano como oportunidad secundaria a investigar:** 2.937 impresiones con CTR 1,16% sugiere margen de mejor adaptación dentro del español, no otro idioma.

Acción concreta: fijar la norma de "español internacional" por escrito en la skill de redacción (`.agents/skills/redactar-articulo-blog/`).

---

## 4. Potencial del sitio: 8/10, en expansión temprana

El diagnóstico mejora respecto a la v1: no hay brecha de "impresiones que crecen sin clics" — clics e impresiones crecen a la par (+161,7% / +127,1%). El sitio está en fase temprana de expansión orgánica que hay que **consolidar antes de dispersar recursos**.

Lo que ya valida el modelo (páginas agrupadas por variantes):

| Página o grupo | Clics | Impresiones | CTR |
| :--- | ---: | ---: | ---: |
| Calculadora HHHHHMM | 260 | 2.492 | 10,4% |
| Pilar de alimentación | 156 | 8.600 | 1,8% |
| Comida casera perros mayores | 149 | 7.226 | 2,1% |
| Cuidados paliativos | 132 | 6.747 | 2,0% |
| Salud mental y emocional | 100 | 7.281 | 1,4% |
| Movilidad y dolor | 71 | 4.611 | 1,5% |

Dos tesis confirmadas por la distribución: **alimentación es la brecha editorial más clara** (~25% de los clics de página con inventario mínimo) y **las herramientas son la mejor prueba de producto** (~23% de los clics; la calculadora quintuplica el CTR medio del sitio).

Palancas, por orden:

1. **Higiene técnica + confianza (prioridad cero):** canonical `.html`, 301 de una etapa, sitemap limpio, autoría real, `dateModified` veraz.
2. **Consultas en posición 15–60 con impresiones** (tráfico casi garantizado; orientativo por la anonimización): alimentación natural senior (209 impr., pos. 23), comida natural senior (179, pos. 18), Cushing esperanza de vida/alimentación (~144, pos. 29–58), incontinencia urinaria (69, pos. 36), croquetas/comida perros viejos (~200, pos. 32–49).
3. **Herramientas → ficha clínica** (hoja de ruta ya definida en `INVENTARIO_CONTENIDO.md`): un artículo se resume en un AI Overview; una herramienta con histórico por perro genera recurrencia y no se puede copiar. Es el foso del proyecto y reduce la dependencia de búsqueda.

Riesgos (de Sol, suscritos): autoridad clínica insuficientemente demostrada, perfil de enlaces estrecho (~4 dominios), dependencia de búsqueda, y no juzgar los artículos de agosto con 1–3 días de datos.

---

## 5. Pilares: reforzar — confianza y texto primero, imágenes después, vídeo como piloto

"Reforzar" no es añadir palabras: es convertir cada pilar en un centro de decisión y navegación. Orden temático (de Sol, coherente con los datos): **alimentación → calidad de vida/paliativos → salud mental → movilidad y dolor → higiene/dental**.

Contenido de un pilar reforzado: respuesta inicial útil, mapa de señales de alarma, índice legible en móvil, secciones por intención (no por longitud), enlaces a satélites y herramientas, recurso descargable original, fuentes primarias vinculadas a afirmaciones concretas, revisión profesional identificable, FAQ de consultas reales, y title/description que prometan con precisión.

1. **Texto + estructura + confianza (ahora):** las 5 páginas con más impresiones del sitio tienen CTR 1,4–2,3%; es la mejora más barata. Cambios de titles/metas graduales, no masivos y simultáneos.
2. **Imágenes originales y funcionales (después):** diagramas de postura y señales de dolor, escalas visuales, checklists imprimibles, infografías embebibles con marca — citables por clínicas (petmetric.vet demuestra el mecanismo). Nada de volumen decorativo generado por IA. Nota honesta: las exportaciones son del tipo Web, así que el potencial de Google Imágenes aún no es medible con estos datos.
3. **Vídeo (corrijo la v1: piloto pequeño, no descarte):** 4 piezas donde el movimiento aporta lo que el texto no puede — ayudar a levantarse sin tirar de las patas, colocar un arnés de soporte, adaptar suelos, registrar HHHHHMM a diario. Incrustadas en páginas ya relevantes, con transcripción, medidas 8–12 semanas; si no mejoran comprensión o uso, se detiene el formato.

---

## 6. Hoja de ruta integrada

| Fase | Horizonte | Acciones |
| :--- | :--- | :--- |
| **0 · Confianza y medición** | 0–4 semanas | Canonical sin `.html` (`BaseLayout.astro:22-23`) + 301 de una etapa + sitemap limpio · verificar o retirar atribuciones profesionales no respaldadas · autoría, revisión veterinaria y política editorial visibles · `dateModified` real, no por build · separar en la medición Web / Imágenes / IA. |
| **1 · Consolidación en español** | 1–3 meses | Reforzar los 5 pilares · clúster de alimentación + satélites contra consultas medidas · titles/metas de páginas con impresiones altas y CTR bajo (gradual) · HHHHHMM con historial, PDF y exportación veterinaria · 3–5 recursos visuales citables · buscar enlaces de clínicas, asociaciones y profesionales (objetivo: 10–15 dominios). |
| **2 · Producto y formatos** | 3–6 meses | Segunda herramienta validada (test CCDR) · piloto de 4 vídeos · medir recurrencia y uso de herramientas, no solo sesiones · piezas específicas España / EE.UU. hispano solo si Search Console confirma intención diferenciada. |
| **3 · Piloto EN condicionado** | >6 meses | `/en/` de la calculadora HHHHHMM con hreflang, solo si se cumplen las condiciones del §2. Ampliar a clúster EN únicamente con tracción demostrada. |
| **Descartado por ahora** | — | Traducción del blog completo · reescritura a es-ES · canal de vídeo a escala · pt/fr/de. Reevaluar con los datos del piloto. |

### Indicadores para decidir sin intuiciones (de Sol, adoptada)

Consolidación: variantes indexadas y saltos de redirección ↓. Pilares: CTR y posición por consulta. Confianza: % de contenido clínico con autor/revisor/fecha real. Herramientas: finalización, retorno a 7/30 días, exportaciones. Vídeo: retención e interacción posterior. Inglés: consultas EN no de marca, uso de herramienta y enlaces propios.

---

## Limitaciones

Las de Sol aplican también a esta v2: consultas anonimizadas (~96 de 1.190 clics atribuidos), impresiones IA sin clics atribuibles, 92 días de datos con artículos de 1–3 días de vida, archivos de enlaces muestrales, y sin exportaciones de Imágenes/Vídeo/eventos. La exportación de Bing la cito según el informe de Sol; no dispuse del archivo original.
