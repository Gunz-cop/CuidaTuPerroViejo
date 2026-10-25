# Entrega de redacción — 24 de octubre de 2026

> **Seguimiento del 25 de octubre:** este informe conserva la entrega textual previa. Los recursos ya están producidos e integrados en la rama de revisión; el estado actual, el nuevo hash y las pruebas están en [visuales/entrega-visuales.md](visuales/entrega-visuales.md). El texto aprobado R2 se conserva en `visuales/texto-aprobado-r2.mdx`. Pendiente revisión visual independiente; no publicado.

Texto: `articulo-borrador.mdx`. Rama de referencia consultada mediante GitHub: `claude/senior-dog-requirement-leishmaniosis-brief` de `Gunz-cop/CuidaTuPerroViejo`. Entrega para revisión en la rama `codex/leishmaniosis-articulo-revision`, creada desde la anterior. El propietario solicitó subir el borrador para revisarlo. Se incluyen el MDX, una versión Markdown de lectura y este informe; no se abre PR ni se despliega.

## Alcance y estado

Texto corregido a partir de la auditoría independiente R1 del artículo, cuyo veredicto sobre la versión anterior fue «Publicable con reservas (solo el texto)». Incluye las cinco decisiones clínicas del brief, dos tablas, tres avisos y siete FAQ. Mantiene las diez fuentes con usos concretos en el cuerpo. Los cambios y las limitaciones están en `correcciones-articulo-r1.md`; esta entrega no emite auditoría ni veredicto R2.

El archivo está fuera de `src/content/blog/` por el gate de completitud de `.agents/skills/redactar-articulo-blog/SKILL.md`, fase 5.2: «no escribas ahí un artículo que la Fase 4 no aprobó». Siguen pendientes recursos y pruebas de integración. `status: Borrador` no impediría la publicación desde esa carpeta. Los imports son los de la ubicación final prevista en `src/content/blog/`; este archivo documental no es una entrada compilable en su ubicación actual.

Se omitieron `heroImage`, `heroImageAlt`, imágenes de cuerpo e imports de recursos inexistentes. La revisión de cinco puntos está disponible como lista escrita; el calendario, como comparación atribuida de las tres fuentes. No se anuncia una animación ni infografía como disponible. El encargo visual completo del brief sigue pendiente y no se presenta como entregado.

No se modificaron los estados del brief ni del inventario: el artículo todavía no está aprobado para incorporarlo a la colección pública.

## Verificación de extensión

Conteo por espacios con `python3 -I docs/contenido/leishmaniosis-perros-mayores/medir-texto.py`: sin frontmatter, imports, etiquetas HTML, destinos de enlaces ni bibliografía. Incluye H2/H3, títulos de avisos, captions y celdas de tablas, preguntas y respuestas del FAQ. Total: **4.367 palabras**, dentro de 3.868–5.232. El método ahora recupera expresamente los títulos visibles de `AlertBox`, que el conteo inicial de 4.198 omitía al retirar las etiquetas. El auditor contó 4.275 en aquella versión con su propio método; no se atribuye ese método al script nuevo.

| Sección | Palabras reales | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 240 | 250 | −4,0 % |
| Qué es y por qué un perro mayor merece atención especial | 579 | 650 | −10,9 % |
| Qué mirar en casa: señales y cuándo llamar | 663 | 700 | −5,3 % |
| Pruebas: infectado no es lo mismo que enfermo | 740 | 800 | −7,5 % |
| Estadios, tratamiento y seguimiento con los riñones en el centro | 650 | 700 | −7,1 % |
| Protegerlo de los flebotomos: medidas, calendario y gatos en casa | 974 | 900 | +8,2 % |
| Cierre y FAQ | 521 | 550 | −5,3 % |

Densidad de párrafo, método de la fase 4: media 39,1 / mediana 39 / párrafos >50 palabras 1,2 %. Ningún H3 supera 200 palabras con el contador adjunto. `tono.py`: 0 muletillas, 0,0 por 1.000 palabras (3.879 palabras medidas por ese script, que excluye FAQ y avisos de seguridad). SEO: 54 caracteres; meta: 158. Tres `AlertBox` (info, danger, warning), dos `TablaApilable`, siete preguntas FAQ. `data-label` en las 33 celdas.

El brief exige exactamente tres avisos; la bibliografía se presenta en un `div data-editorial-bibliography`, en lugar del cuarto aviso recomendado por la plantilla general. Prevalece el contrato específico del brief. No hay H1 manual, TOC duplicado, JSON-LD ni imágenes inexistentes.

## Trazabilidad

| Fuente del brief | Uso concreto en la redacción |
|---|---|
| S1 AEMPS/MAPA 2026 | Apertura; señales; infección frente a enfermedad; pruebas; estadios y tratamiento sin pautas. |
| S2 LeishVet 2011 | Evolución subclínica; señales renales; limitaciones concretas de pruebas; seguimiento y anticuerpos; control sin promesa de curación; reducción de refugios; propuesta de prevención integrada fechada y condicionada. |
| S3 ESCCAP 2012 | Ciclo y zoonosis; limitaciones de pruebas; materia orgánica y mosquiteras; temporada; vacuna para no infectados. |
| S4 Miranda 2008 | Segundo pico de casos clínicos desde siete años, atribuido a la serie de Barcelona y limitado al resumen. |
| S5 Cabré 2021 | Patrón renal y sistémico en mayores de la serie catalana; tamaño limitado y ausencia de datos terapéuticos. |
| S6 Alten 2016 | Fuenlabrada como punto español; observación estacional de 2011–2013; sin extrapolación nacional. |
| S7 Olmeda 2024 | Valdeorras y asociación entre prevención y casos, sin causalidad; una clínica y patrocinio declarados. |
| S8 OCV vía Europa Press 2024 | Recomendación anual atribuida a nota secundaria, diferenciada del estudio y de ESCCAP. |
| S9 AEMPS/CIMAVet | Diferentes indicaciones por parásito, baños y duración de protección, límites de protección y toxicidad para gatos. |
| S10 EMA | Existencia de vacuna autorizada; sin edad, pauta ni eficacia. |

No hay dosis, duración de tratamientos, marcas de productos en el texto, cifras de creatinina/UPC/títulos ni prevalencia. «Anual o bianual» permanece literal, sin glosa. Se usa «pueden seguir infectados». El umbral de urgencia se identifica como criterio editorial.

## Comprobaciones y límites, por sesión

- Se consultaron las instrucciones editoriales, el schema actual y los componentes reales mediante GitHub. El slug nuevo devolvió 404; los tres artículos enlazados y la página de la calculadora existen en la rama indicada. El inventario conserva los destinos y el tema en `[~]`.
- Se abrieron de nuevo el PDF oficial AEMPS/MAPA, la ficha CIMAVet, ESCCAP y la nota OCV/Europa Press. El PDF oficial confirma la distinción clínica y los estadios; se precisó que el pronóstico moderado va de bueno a reservado.
- En la redacción inicial, la herramienta devolvió una comprobación de navegador para LeishVet y Valdeorras, y EMA devolvió 429. Eso describía aquella sesión, no una imposibilidad permanente de acceso. El auditor R1 abrió LeishVet y Valdeorras (esta última por Europe PMC). En esta corrección se abrió LeishVet con la herramienta web y se revisaron sus apartados dirigidos; Miranda sigue limitado al resumen y EMA a la página del producto.
- La clonación falló porque el proxy de red del entorno no aceptó la conexión. Se recuperaron los archivos necesarios mediante el conector GitHub. La carpeta local contiene esos archivos de referencia y la redacción, no un clon completo del proyecto.
- En la sesión inicial no se ejecutaron build, proyección Markdown ni navegador. El auditor R1 sí compiló y proyectó el MDX anterior (`ebe21070…7406`) en una copia con el archivo en `src/content/blog/`.
- En esta corrección volvió a fallar la clonación por conexión al proxy. `npx --offline astro --version` devolvió `ENOTCACHED`; Astro y el compilador MDX no están instalados. **No se repitió el build ni la proyección sobre el MDX corregido.** El resultado R1 no acredita esta versión. Tampoco hay comprobación en navegador a 390/1366 px, modo oscuro o teclado.
- Fecha de comprobación de fuentes de esta corrección: **24 de octubre de 2026**. Se reabrieron AEMPS/MAPA (tabla 1 y notas, inmunomoduladores y vigilancia de efectos adversos), LeishVet (Distribution and epidemiology, tabla 3, tabla 6, Prevention), ESCCAP (pp. 9 y 16) y CIMAVet (3.5, baños). El informe `correcciones-articulo-r1.md` detalla los pasajes. El resto conserva la comprobación independiente R1; no se presenta como una nueva lectura de las diez fuentes.

## Recursos del brief

| Recurso | Pregunta / ubicación | Estado y evidencia |
|---|---|---|
| Tabla de señales | Qué veo y qué hago / síntomas | Escrita en MDX; revisión estructural; móvil pendiente. |
| Tabla de pruebas | Qué aporta cada prueba / diagnóstico | Escrita en MDX; revisión estructural; móvil pendiente. |
| Tres imágenes, incluida portada | Collar, hogar nocturno y analítica | No generadas ni referenciadas como existentes. |
| Recorte senior transparente | Base de revisión de cinco puntos | No producido; exige los cinco rasgos y revisión a 390 px sobre claro y oscuro. |
| Animación de cinco puntos | Cómo observar / síntomas | No producida; la lista textual ya contiene la información esencial. |
| Calendario visual sin perro | Cuándo proteger / prevención | No producido; las tres posturas constan en texto atribuido. |

Pendiente antes de integrar/publicar: producir los recursos contratados con el mestizo pastor-mastín atigrado oscuro del brief, inspeccionar edad y anatomía a 390 px, implementar y probar recursos accesibles, completar build y proyección Markdown, resolver accesos a fuentes si hace falta y encargar auditoría independiente del artículo. No modificar `main` ni desplegar como parte de esta entrega.

SHA-256 del MDX corregido: `fb0c77099efe30c3d6b3b677807dcca0e982427b61098bfbad7adfd3f2e63a2b`. Versión anterior auditada en R1: `ebe2107047bc262c60a49896b397a6471f51269f5b7d82959396238368db7406`.
