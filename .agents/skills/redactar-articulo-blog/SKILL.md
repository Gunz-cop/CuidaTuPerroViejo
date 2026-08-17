---
name: Redactar Artículo de Blog - Cuida Tu Perro Viejo
description: Convierte un briefing de contenidos (generado por la skill generar-briefing-contenido) en el artículo final .mdx listo para publicar en el blog Astro de cuidatuperroviejo.com, respetando la arquitectura real del sitio.
---

# Habilidad: Redactor de Artículos de Contenido (Astro/MDX)

Esta habilidad es la continuación natural de **`generar-briefing-contenido`**: toma un brief ya validado y lo convierte en el artículo `.mdx` final que se guarda en `src/content/blog/`. Sustituye por completo el flujo antiguo de Blogger/Gemini ("Redactor Skyscraper" en HTML crudo con JSON-LD manual, TOC manual y `cluster_cards`), que quedó obsoleto cuando el sitio migró a Astro: hoy el layout automatiza casi todo lo que ese flujo generaba a mano, y redactarlo manualmente ahora produce contenido duplicado o roto.

---

## 📂 Recursos de la Habilidad

*   [SKILL.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/redactar-articulo-blog/SKILL.md): este archivo, flujo de ejecución y reglas.
*   [reglas_astro_mdx.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/redactar-articulo-blog/references/reglas_astro_mdx.md): qué automatiza el layout (y por tanto qué NO debe escribirse a mano), extraído directamente del código fuente de los componentes.
*   [plantilla_articulo.mdx](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/redactar-articulo-blog/resources/plantilla_articulo.mdx): esqueleto de artículo limpio para copiar y rellenar.
*   [analisis_corpus.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/redactar-articulo-blog/examples/analisis_corpus.md): barrido completo de los 11 artículos publicados con una tabla comparativa y el veredicto definitivo por elemento (qué adoptar, qué evitar y por qué, con evidencia del corpus completo, no de una muestra).
*   Skill hermana: [generar-briefing-contenido](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/generar-briefing-contenido/SKILL.md) — produce el input de esta skill.
*   [config.ts](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/src/content/config.ts): schema **estricto** (`.strict()`) del frontmatter. Cualquier campo no listado ahí rompe el build.
*   [INVENTARIO_CONTENIDO.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/INVENTARIO_CONTENIDO.md): estado real de artículos publicados, para revalidar interlinking.

---

## 🧭 Flujo de Ejecución

### Fase 1: Recepción y Revalidación del Brief

1.  **Entrada:** una ruta a `/briefings/briefing-{{slug}}.md` (generado por `generar-briefing-contenido`) o el contenido de un brief pegado en el chat. Si el usuario no tiene un brief estructurado, ofrece generarlo primero con esa skill, o pide manualmente los datos mínimos: título, keyword, slug, pilar, historia real, fuentes, estructura H2/H3 y enlazado interno.
    *   **Si trabajas con datos recopilados a mano (sin la numeración de secciones del brief formal):** las Fases 3 a 5 de esta skill citan "Sección 3", "Sección 5" y "Sección 9" del brief — en ese caso, léelas como su equivalente conceptual (la lista de fuentes que te dieron, el enlazado interno acordado, los criterios de cierre reunidos), no busques literalmente esos números. La validación de contenido (Fase 4) se aplica igual, tenga o no el input esa numeración.
2.  **El brief pudo quedar desactualizado.** Antes de escribir, revalida contra el estado actual del repo:
    *   Confirma que `pilar` sigue siendo un valor válido del enum en `config.ts`.
    *   Relee `INVENTARIO_CONTENIDO.md` y confirma que los spokes de interlinking del brief siguen marcados como publicados (pudo cambiar desde que se generó el brief).
    *   Confirma que el slug no colisiona ya con un archivo existente en `src/content/blog/`.
3.  Sea brief formal o datos recopilados a mano, si falta la lista de fuentes con su H2 asignado (Sección 3) o los criterios de cierre — volumen de palabras, componentes obligatorios, arco narrativo (Sección 9) —, no improvises esos datos: pídeselos al usuario, o si es un brief formal, ofrece regenerarlo con la skill hermana antes de continuar.

### Fase 2: Arquitectura Técnica Real (Reglas Invariables)

> [!IMPORTANT]
> Estas reglas vienen de leer directamente `PostReader.astro`, `[slug].astro`, `AlertBox.astro`, `FAQ.astro` y `SiloNavigation.astro` — no de las instrucciones antiguas de Blogger. Ver el detalle y el porqué de cada una en [reglas_astro_mdx.md](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/redactar-articulo-blog/references/reglas_astro_mdx.md).

**Nunca escribas en el `.mdx` (el layout ya lo genera):**
*   Un `# H1` — el `title` del frontmatter ya se renderiza como H1 en `[slug].astro`.
*   La `heroImage` otra vez como `<figure>`/`![]()` en el cuerpo — el header ya la muestra; si la duplicas, una regla CSS del layout la oculta en silencio (queda un hueco visual raro).
*   Tabla de contenidos manual (`<details>` con lista de anclas `#seccion`) — `PostReader.astro` la construye solo escaneando los `H2`/`H3` reales.
*   `<script type="application/ld+json">` — `[slug].astro` inyecta `BlogPosting` + `BreadcrumbList` usando el frontmatter.
*   Un bloque de "artículos relacionados"/`cluster_cards` al final — `SiloNavigation.astro` ya renderiza automáticamente las tarjetas de otros posts del mismo pilar tras el artículo.
*   Botón "volver arriba" o CSS `<style>` inline.

**Siempre haz esto:**
*   Importa los componentes justo debajo del frontmatter:
    ```mdx
    import AlertBox from '../../components/AlertBox.astro';
    import FAQ from '../../components/FAQ.astro';
    ```
*   Empieza el cuerpo directo con el primer párrafo (sin encabezado).
*   Justo después del primer párrafo, agrega el byline estandarizado (patrón mayoritario del corpus real — 8 de 11 artículos — con el nombre normalizado al que ya usa el schema real de `[slug].astro`):
    ```mdx
    **Autoría:** Equipo Cuida a tu Perro Viejo · **Actualizado:** {{fecha en español, ej. "20 de julio de 2026"}}
    ```
    **Sincroniza `datePublished` del frontmatter con esta misma fecha si es un artículo nuevo.** El brief trae `datePublished` con la fecha en que se generó el brief, que puede ser días antes de la redacción real (confirmado en producción: brief del día 14, artículo redactado y guardado el 16, `datePublished` se dejó en 14 mientras el byline decía 16 — desincronizados). Actualiza `datePublished` a la fecha real de guardado antes de escribir el archivo. **Excepción:** si el brief es una reescritura de un artículo ya publicado, `datePublished` se mantiene en la fecha original (ver brief) para no perder la señal de antigüedad SEO — ahí sí es correcto que difiera de `Actualizado`.
*   Usa enlaces internos **contextuales dentro de los párrafos** (`[texto ancla](/pilar/slug)`) hacia el pilar y los spokes que define el brief — esta es la sustitución real del antiguo `cluster_cards`, y sigue siendo trabajo manual porque el layout no lo hace por ti.
*   Imágenes de cuerpo en sintaxis Markdown simple, seguidas de una línea en cursiva con el pie de foto (patrón real usado en todo el blog):
    ```mdx
    ![Alt descriptivo SEO](/images/blog/{{slug}}/{{archivo}}.webp)
    *Pie de foto que aporta contexto o dato adicional.*
    ```
    Los nombres de archivo, alt y captions salen de la Sección 8 del brief (prompts de imagen). **La skill no genera ni descarga los binarios** — avisa al usuario que debe colocar esos `.webp` en `public/images/blog/{{slug}}/` antes de publicar.

### Fase 3: Redacción por Bloques

La redacción de un artículo de 6.000+ palabras de un tirón degrada la calidad y la conexión narrativa. Redacta por bloques, en este orden:

1.  **Bloque de apertura:** frontmatter completo (solo campos del schema de `config.ts`) + imports + introducción (~800 palabras con el gancho de la historia real, el byline `Autoría`/`Actualizado` tras el primer párrafo, y `AlertBox type="info"` de acompañamiento, según lo planeado en el brief). El párrafo de gancho narrativo puede ser más largo que la regla de "3 líneas" de los bloques de desarrollo (punto 3 más abajo) — en el corpus real, el párrafo de apertura suele rondar 100-200+ palabras porque busca un efecto inmersivo, no de lectura rápida en móvil.
2.  **Punto de control ligero:** muestra este bloque de apertura al usuario y pregunta si el tono/voz es el esperado antes de continuar con el resto. Pregunta también si prefiere que sigas todo seguido o que revisen el desarrollo H2 por H2 — respeta lo que elija.
3.  **Bloques de desarrollo:** un H2 del brief a la vez (o todos seguidos si el usuario lo pidió), respetando:
    *   El target de palabras de esa sección (±15%). **Aviso anti-scope-creep:** si mientras investigas o redactas sientes que el tema merece un H2 o H3 adicional que no está en la Sección 6 del brief (por ejemplo, "por qué falla el tratamiento" o "complicaciones"), no lo agregues por tu cuenta — es la causa más común de exceder el presupuesto total de palabras (verificado: un artículo real llegó a 8.993 palabras, 38% sobre el target, por agregar exactamente una sección así). Anota la idea y pliégala dentro de un H2 ya existente como subsección corta, o pregúntale al usuario si la quiere antes de expandir el artículo.
    *   El `AlertBox` planeado para esa sección (`danger` en síntomas/diagnóstico, `warning` en tratamiento/manejo), citando la fuente asignada por su nombre real.
    *   El momento del arco narrativo que le toca a la historia real (desarrollo en un H2 intermedio, cierre en el último H2 antes de la conclusión — sección propia, no una frase suelta).
    *   **Protege el presupuesto del H2 de cierre narrativo:** no lo escribas primero fuera de orden (pierde continuidad con los detalles concretos que se establecen en los H2 prácticos anteriores, a los que normalmente hace referencia). En su lugar, al llegar al penúltimo H2 práctico, revisa el total acumulado contra la suma de targets hasta ese punto (Sección 6) **en ambas direcciones**: si ya vas por encima, recorta ese H2 práctico ahí mismo; si vas por debajo —aunque ningún H2 individual se haya quedado corto por sí solo, el déficit puede repartirse entre varios sin que ninguno destaque a simple vista— complétalo antes de seguir, no dejes que la suma de varios recortes pequeños llegue silenciosa hasta el cierre. En los dos casos, la meta es llegar al H2 de cierre con el presupuesto ya corregido, no descubrir el desvío al contar al final en Fase 4, cuando ya toca retrofit en vez de corrección sobre la marcha. El cierre es el caso clínico real del artículo, el activo E-E-A-T que un blog genérico no tiene; las secciones de manejo práctico son las más fáciles de ajustar (recortando o completando) sin perder lo diferencial.
    *   Los enlaces internos contextuales que correspondan a esa sección según la Sección 5 del brief. Si el brief marcó un spoke como `Pendiente` (por no haber aún 2 artículos publicados en ese pilar), no inventes un enlace para rellenarlo — omítelo tal como lo indicó el brief, y enlaza solo el pilar y la calculadora si aplican.
    *   **Formato mobile-first (requisito del brief, Sección 4 — el brief solo lo planea, esta skill es quien lo ejecuta):** párrafos de máximo ~3 líneas en pantalla móvil (aprox. 30-40 palabras; más que eso y el párrafo se percibe como un bloque denso en el celular), y un `H3` nuevo cada 150-200 palabras dentro de cada `H2` para airear la lectura. Si un bloque de desarrollo se está escribiendo en párrafos largos o sin subtítulos por 300+ palabras seguidas, corta ahí mismo — no lo dejes para una revisión posterior.
4.  **Bloque de cierre:** conclusión breve + cuadro de fuentes + `<FAQ items={[...]} />` con las preguntas del brief.
    *   **Cuadro de fuentes (obligatorio, no opcional):** justo antes del FAQ, agrupa **todas** las fuentes del brief en un único `<AlertBox type="info" title="Fuentes científicas y de autoridad">` — es el patrón real verificado en los artículos ya publicados (`prevencion-caidas-perro-mayor.mdx`, `cama-ortopedica-perros-mayores-displasia-artrosis.mdx`), y le da al lector una forma concreta de verificar que el contenido no es paja. Formato de cada línea:
        ```mdx
        <AlertBox type="info" title="Fuentes científicas y de autoridad">
        Este artículo se basa en evidencia publicada por organizaciones veterinarias internacionales y revistas indexadas:

        - **{{Institución o autor}}**: [{{Título real del documento o guía}}]({{URL profunda}}) ({{descripción breve de una línea}}).

        **Nota de responsabilidad:** Las recomendaciones aquí presentadas son de carácter meramente educativo e informativo. Siempre debes consultar con un médico veterinario ante cualquier cambio en el comportamiento, la marcha o la salud general de tu compañero mayor.
        </AlertBox>
        ```
        El texto ancla es siempre el **título real del documento citado** (p. ej. "Global Pain Management Guidelines"), nunca un texto genérico ("leer más", "aquí") ni la URL en crudo — el ancla descriptiva es lo que aporta autoridad y verificabilidad real ante el lector.
    *   **Fuentes marcadas `[URL no verificada]` en el brief:** inclúyelas igual dentro de este cuadro, citadas por nombre en texto plano y sin enlace — nunca inventes una URL para completarlas, y nunca pegues el marcador `[URL no verificada]` tal cual en el artículo publicado. Lleva la cuenta de cuáles quedaron así para reportarlas al usuario en el resumen de entrega (Fase 5).
    *   No agregues `target="_blank"` ni `rel="noopener"` a mano en ningún enlace externo del artículo (aquí o en cualquier otra sección): `rehype-external-links` (configurado en `astro.config.mjs`) ya se lo añade automáticamente a todos en el build.

### Fase 4: Validación contra el Contrato de Entrega

> [!IMPORTANT]
> **Los dos fallos que más se repiten en la práctica real:** de tres artículos redactados de forma independiente (por distintos agentes, en distintas sesiones), los **tres** fallaron en el conteo de palabras (por exceso o por defecto) y **dos de tres** tuvieron al menos una fuente citada únicamente en el cuadro de cierre, sin desarrollarla nunca en su H2 asignado. No son riesgos teóricos — son el patrón de fallo más probable. Verifícalos primero, con método explícito, no a ojo:
> - **Palabras:** `wc -w` sobre el cuerpo real (método exacto abajo).
> - **Fuente por H2:** localiza el nombre del autor/institución con una búsqueda de texto (`grep` o equivalente) y confirma que al menos una aparición cae **dentro del rango de líneas de su H2 asignado** — no en la introducción, no en otro H2, y no solo en el cuadro final de "Fuentes científicas y de autoridad". Si una fuente solo aparece ahí, **no cuenta como citada**, sin importar que esté listada.
> - **Distribución por H2, no solo el total:** el conteo global puede cumplir el rango del brief aunque un H2 concreto esté muy por debajo de su propio target de la Sección 6 (visto en producción: un H2 al 45% de su target — 314 de 700 palabras — mientras otro se pasaba el suyo en +57% — 1.572 de 1.000 —, ambos "compensándose" en el total). Cuenta cada H2 por separado contra su target individual (±15%), no solo la suma. Presta atención especial al **H2 de cierre narrativo** (el último antes de Conclusión): es el activo E-E-A-T diferencial del sitio — el manejo doméstico lo tiene cualquier blog, el caso clínico resuelto no — y es el que más fácil se queda corto si el presupuesto ya se gastó en las secciones prácticas anteriores.

Antes de dar el artículo por terminado, recorre la Sección 9 del brief contra el `.mdx` real (no contra lo planeado):
*   Cuenta las palabras reales del cuerpo (excluyendo frontmatter e imports) con un conteo real, no una estimación a ojo: aísla el texto que va después del segundo `---` y de las líneas `import`, y cuenta con una herramienta (p. ej. `wc -w` sobre ese fragmento, o el archivo ya guardado en disco). Si cae por debajo del mínimo, complétalo — no lo marques como listo "porque cubre los temas". Si se pasa por encima del máximo con tolerancia (±15% sobre el target de la Sección 6), no lo entregues así "porque el contenido es bueno" — recórtalo (ver Fase 3, aviso anti-scope-creep) antes de darlo por terminado.
*   **Repite el conteo H2 por H2**, no solo el total: cada `## ` hasta el siguiente `## ` es un H2; compara sus palabras reales contra su target individual de la Sección 6 del brief (±15%) — un total correcto puede esconder un H2 muy por debajo compensado por otro muy por encima. Si el H2 de cierre narrativo (el último antes de Conclusión) queda por debajo de su target mientras otro H2 lo supera, no lo dejes así: recorta el H2 sobrante y desarrolla más el cierre, porque ese es el que sostiene el caso clínico real del artículo.
    *   **Deja constancia por escrito, no solo en tu razonamiento interno:** una regla de verificación que no produce un artefacto visible se puede dar por "cumplida" sin haberla corrido de verdad (confirmado en producción: la regla de conteo por H2 existía en esta misma skill y el redactor igual reportó solo el total). Construye la tabla H2 / palabras reales / target / desviación (ver formato exacto en Fase 5) mientras haces este conteo — no la reconstruyas de memoria al final.
*   Confirma que cada una de las fuentes que el brief realmente documentó en la Sección 3 aparece citada **por su nombre dentro de su H2 asignado**, no solo en el cuadro de cierre. Si son menos de 6 porque el brief ya justificó esa limitación (tema nicho, poca literatura disponible), eso no es un fallo — no lo confundas con fuentes faltantes, y no aceptes que se hayan añadido fuentes débiles o inventadas solo para completar el número.
*   Confirma que existe el cuadro de cierre `<AlertBox type="info" title="Fuentes científicas y de autoridad">` con las fuentes de la Sección 3, cada una como enlace real con texto ancla descriptivo (el título del documento, no "leer más" ni la URL en crudo) — salvo las marcadas `[URL no verificada]`, que van citadas sin enlace.
*   Si alguna fuente estaba marcada `[URL no verificada]`, confirma que quedó citada por nombre sin enlace (ni placeholder literal ni URL inventada) y que está anotada para el resumen de entrega.
*   Confirma que los 3 tipos narrativos de `AlertBox` están presentes (`info` en intro, `danger`, `warning`), uno de cada, sin repetir tipo entre ellos — el cuadro de fuentes (también `info`, ver arriba) es un cuarto `AlertBox` aparte, obligatorio por separado, no cuenta como repetición.
*   Confirma que las imágenes de cuerpo planificadas en la Sección 8 del brief (aparte de la hero) están insertadas en el `.mdx` como placeholder `![alt](/images/blog/{{slug}}/{{archivo}}.webp)` con su alt y caption — el archivo `.webp` real todavía no existe en `public/` (eso se resuelve en Fase 5), pero el placeholder en el cuerpo sí es obligatorio ya en esta fase; no lo dejes pendiente ni lo omitas por no tener el binario.
*   Confirma que el `FAQ` tiene el número de preguntas pactado.
*   Confirma que los enlaces internos obligatorios (pilar, spokes, calculadora si aplica) están presentes como enlaces reales, no como texto plano — salvo los spokes que el brief marcó explícitamente como `Pendiente`, que no deben existir como enlace (si aparecen, es que se inventó uno).
*   Confirma el arco narrativo de 3 momentos de la historia real: apertura, desarrollo, cierre (cada uno como sección propia real, no una mención de paso).
*   Valida el frontmatter contra el `z.object(...).strict()` de `config.ts`: solo `title`, `seoTitle`, `metaDescription` (≤160 car.), `pilar`, `keywordPrincipal`, `heroImage`, `heroImageAlt`, `legacyUrl`, `status`, `datePublished` — ningún campo extra.
*   Confirma que el byline `**Autoría:** Equipo Cuida a tu Perro Viejo · **Actualizado:** {{fecha}}` está presente tras el primer párrafo, con el nombre escrito exactamente así (no una de las variantes que existen en el corpus histórico).
*   Revisa el formato mobile-first: ningún párrafo debería superar ~3 líneas en pantalla móvil (aprox. 30-40 palabras), y cada `H2` debería traer al menos un `H3` por cada 150-200 palabras de desarrollo. Si encuentras un párrafo largo o un tramo sin subtítulos, córtalo antes de entregar — no lo dejes pasar "porque el contenido está bien".
*   **Mide la densidad de párrafo, no la estimes a ojo** (regla existente, método nuevo — verificado que sin un comando exacto la regla no se aplica en la práctica). Corre esto sobre el `.mdx` real:
    ```bash
    awk '/^---$/{c++; next} c>=2' ARCHIVO.mdx \
      | grep -v "^import \|^#\|^!\[\|^\*\|^<\|^ \|^-\|^]" \
      | awk 'NF>5{print NF}' | sort -n \
      | awk '{a[NR]=$1; s+=$1} END{print "media:",int(s/NR); \
          print "mediana:",a[int(NR/2)]; c=0; \
          for(i=1;i<=NR;i++) if(a[i]>50) c++; \
          print ">50 palabras:",int(c*100/NR)"%"}'
    ```
    Referencia real: un artículo con media 30 / mediana 29 / 3% de párrafos >50 palabras se considera bien aireado; uno con media 56 / mediana 57 / 66% >50 está al doble de densidad de lo que pide el formato mobile-first, aunque el conteo total de palabras sea correcto.
    **Causalidad, no solo síntoma:** si el artículo va corto de palabras Y la densidad sale alta, el orden de la corrección importa — **primero divide los párrafos densos, después evalúa si sigue faltando volumen**. Ampliar párrafos ya densos "arregla" el conteo total y empeora exactamente lo que el formato mobile-first existe para evitar. Un artículo corto y aireado es más fácil de completar bien que uno denso al que solo le falta relleno.

### Fase 5: Guardado del Artículo

1.  **Ruta de guardado:** `src/content/blog/{{slug}}.mdx` — a diferencia del brief (que vive en `/briefings/`, ignorado por Git), este archivo **sí se versiona**.
2.  **Gate de completitud — no escribas ahí un artículo que la Fase 4 no aprobó.** `src/content/blog/` no es una carpeta de borradores: `getStaticPaths()` en `[slug].astro` genera una ruta por cada entrada de la colección `blog` sin excepción, y el campo `status` del frontmatter (`z.string().default('Publicado')` en `config.ts`) **no se lee en ningún filtro de build** — es una etiqueta decorativa, no un mecanismo de bloqueo. Poner `status: "Borrador"` en un artículo incompleto **no impide que se compile a `dist/` y se sirva en el próximo deploy** (confirmado en producción: un artículo con déficit de palabras ya declarado por el propio redactor llegó a `dist/`). Si la Fase 4 encontró cualquier fallo sin resolver — déficit de palabras, fuente sin citar en su H2, componente faltante — **no guardes el archivo en `src/content/blog/` todavía**: muestra el avance en el chat o guárdalo en el scratchpad, y dile explícitamente al usuario qué falta y por qué no se guarda aún. El campo `status` del brief puede copiarse tal cual (`"Publicado"`) únicamente cuando el artículo ya pasó la Fase 4 completa — no antes, y no como sustituto de este gate.
3.  **Confirmación:** muestra el artículo completo (o al menos frontmatter + lista de H2 + conteo de palabras real, medido con el mismo método de la Fase 4, no estimado) **junto con la Tabla de Verificación** (formato exacto abajo) y pregunta antes de escribir el archivo.
4.  **Tabla de Verificación — inclúyela siempre en la entrega, no la reemplaces por un resumen en prosa:**
    ```
    | H2 | Palabras reales | Target (Sección 6) | Desviación |
    |---|---|---|---|
    | Introducción | {{n}} | ~{{target}} | {{%}} |
    | {{Título H2-1}} | {{n}} | ~{{target}} | {{%}} |
    | ... | | | |
    | {{H2 de cierre narrativo}} | {{n}} | ~{{target}} | {{%}} |
    | Conclusión | {{n}} | ~{{target}} | {{%}} |

    Densidad de párrafo: media {{n}} / mediana {{n}} / párrafos >50 palabras {{%}}
    ```
5.  **Colisión de nombres:** si ya existe `src/content/blog/{{slug}}.mdx`, no lo sobrescribas en silencio — pregunta si reemplazar, versionar el slug, o cancelar.
6.  **Recordatorios post-guardado:**
    *   Las imágenes referenciadas deben añadirse en `public/images/blog/{{slug}}/` antes de que carguen en producción — **cuenta la `heroImage` del frontmatter junto con las de cuerpo**, no solo estas últimas (confirmado en producción: el aviso decía "faltan 2" contando solo cuerpo, cuando el total real —hero incluida— era 3).
    *   Si quedaron fuentes citadas sin URL (marcadas `[URL no verificada]` en el brief), lístalas explícitamente para que el usuario las confirme o agregue el enlace antes de publicar.
    *   No hagas commit ni push a menos que el usuario lo pida explícitamente.
7.  **Marca el estado del brief y del inventario** (una vez el artículo esté guardado y aprobado):
    *   **En el brief** (`/briefings/briefing-{{slug}}.md`): agrega una línea de estado cerca del título, por ejemplo:
        ```
        > [!NOTE]
        > **Estado:** ✅ Redactado y guardado en `src/content/blog/{{slug}}.mdx` el {{fecha}}.
        ```
        No muevas ni borres el archivo del brief a otra carpeta — sigue siendo referencia útil (fuentes verificadas, plan de imágenes) para una futura reescritura, y moverlo rompería cualquier ruta que ya se haya compartido hacia él (en un prompt, en otra conversación, etc.).
    *   **En `INVENTARIO_CONTENIDO.md`:** actualiza la entrada del artículo — el título si cambió, y la casilla de su pilar a `[x] *Título* (Publicado)`. Si es una reescritura de un artículo que ya existía, dilo explícitamente: `(Publicado — reescrito {{fecha}})`, para que quede claro que no es contenido nuevo desde cero y para que futuros brief no lo canibalicen por error.
    *   No inventes un campo de estado más granular en el frontmatter (el schema de `config.ts` no lo soporta y `status` no filtra nada en el build de todas formas, ver punto 2 de esta fase): el gate real es *no escribir el archivo* hasta pasar la Fase 4, no una etiqueta dentro de un archivo ya escrito.

---

## 🎯 Validación Final (Checklist)

*   [ ] ¿El brief fue revalidado contra el `pilar` actual de `config.ts` y el estado real de `INVENTARIO_CONTENIDO.md`?
*   [ ] ¿El frontmatter usa exclusivamente campos del schema estricto, sin campos inventados?
*   [ ] ¿El cuerpo no incluye H1, hero image duplicada, TOC manual, JSON-LD manual, ni bloque de artículos relacionados?
*   [ ] ¿AlertBox y FAQ están importados y se usan con las props correctas (`type`, `title`, `items`)?
*   [ ] ¿Todas las imágenes de cuerpo de la Sección 8 del brief (no solo la hero) están insertadas como placeholder `![alt](path)` con alt y caption, aunque el `.webp` real todavía no exista?
*   [ ] ¿Los enlaces internos obligatorios del brief están presentes como enlaces reales dentro de los párrafos, y ningún spoke marcado `Pendiente` fue reemplazado por un enlace inventado?
*   [ ] ¿La historia real aparece en sus 3 momentos (apertura, desarrollo, cierre) como secciones propias?
*   [ ] ¿Las fuentes que el brief documentó (aunque sean menos de 6, si el brief ya justificó por qué) están citadas por nombre en los H2 a los que fueron asignadas?
*   [ ] ¿Existe el cuadro `<AlertBox type="info" title="Fuentes científicas y de autoridad">` de cierre, con enlaces reales y texto ancla descriptivo (no genérico, no URL en crudo)?
*   [ ] ¿Está el byline `Autoría`/`Actualizado` tras el primer párrafo, con el nombre estandarizado ("Equipo Cuida a tu Perro Viejo")?
*   [ ] ¿Los párrafos se mantienen en ~3 líneas de pantalla móvil (aprox. 30-40 palabras) y hay un `H3` cada 150-200 palabras dentro de cada `H2`? ¿Se midió la densidad real con el comando de Fase 4 (media/mediana/%>50), no a ojo?
*   [ ] ¿El conteo real de palabras del cuerpo está dentro del rango pactado en el brief, **y cada H2 individual está dentro de su propio target de la Sección 6** (no solo el total agregado), con el H2 de cierre narrativo especialmente protegido?
*   [ ] ¿Se construyó la Tabla de Verificación (H2/real/target/desviación + densidad) y se mostró junto con el artículo, en vez de resumir "está dentro de rango" sin desglose?
*   [ ] Si algo de lo anterior falló, ¿se evitó guardar el archivo en `src/content/blog/` (el gate de completitud, no el campo `status`, que no bloquea nada)?
*   [ ] ¿`datePublished` coincide con la fecha real de guardado (o se mantuvo la fecha original si es una reescritura declarada)?
*   [ ] ¿Se preguntó al usuario antes de guardar el `.mdx`, y se manejó correctamente cualquier colisión de slug?
*   [ ] ¿Se avisó sobre las imágenes pendientes de colocar en `public/images/blog/{{slug}}/`, **contando la hero además de las de cuerpo**?
*   [ ] ¿Se avisó sobre las fuentes citadas sin URL (`[URL no verificada]`), si las hubo?
*   [ ] ¿Se marcó el estado en el brief (redactado + fecha + ruta del `.mdx`) y se actualizó `INVENTARIO_CONTENIDO.md` (título, casilla, y si aplica, "reescrito {{fecha}}")?
