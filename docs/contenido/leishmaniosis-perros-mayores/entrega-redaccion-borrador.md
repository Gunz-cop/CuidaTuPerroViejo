# Entrega de redacción — 24 de octubre de 2026

Texto: `articulo-borrador.mdx`. Rama de referencia consultada mediante GitHub: `claude/senior-dog-requirement-leishmaniosis-brief` de `Gunz-cop/CuidaTuPerroViejo`. Entrega para revisión en la rama `codex/leishmaniosis-articulo-revision`, creada desde la anterior. El propietario solicitó subir el borrador para revisarlo. Se incluyen el MDX, una versión Markdown de lectura y este informe; no se abre PR ni se despliega.

## Alcance y estado

Redacción editorial completa basada en el brief APTO en R2, sin paciente ni experiencia inventados. Incluye las cinco decisiones clínicas del brief, dos tablas, tres avisos y siete FAQ. Mantiene las diez fuentes con usos concretos en el cuerpo.

El archivo está fuera de `src/content/blog/` por el gate de completitud de `.agents/skills/redactar-articulo-blog/SKILL.md`, fase 5.2: «no escribas ahí un artículo que la Fase 4 no aprobó». Siguen pendientes recursos y pruebas de integración. `status: Borrador` no impediría la publicación desde esa carpeta. Los imports son los de la ubicación final prevista en `src/content/blog/`; este archivo documental no es una entrada compilable en su ubicación actual.

Se omitieron `heroImage`, `heroImageAlt`, imágenes de cuerpo e imports de recursos inexistentes. La revisión de cinco puntos está disponible como lista escrita; el calendario, como comparación atribuida de las tres fuentes. No se anuncia una animación ni infografía como disponible. El encargo visual completo del brief sigue pendiente y no se presenta como entregado.

No se modificaron los estados del brief ni del inventario: el artículo todavía no está aprobado para incorporarlo a la colección pública.

## Verificación de extensión

Conteo de texto editorial visible por espacios: sin frontmatter, imports, etiquetas HTML, destinos de enlaces ni bibliografía; incluye encabezados, tablas, avisos y texto de preguntas/respuestas del FAQ. Total: **4.198 palabras**, dentro de 3.868–5.232. Método reproducido sobre el archivo guardado, no estimación. El conteo bruto de MDX no corresponde a palabras visibles porque incluye sintaxis y props.

| Sección | Palabras reales | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 231 | 250 | −7,6 % |
| Qué es y por qué un perro mayor merece atención especial | 564 | 650 | −13,2 % |
| Qué mirar en casa: señales y cuándo llamar | 641 | 700 | −8,4 % |
| Pruebas: infectado no es lo mismo que enfermo | 757 | 800 | −5,4 % |
| Estadios, tratamiento y seguimiento con los riñones en el centro | 621 | 700 | −11,3 % |
| Protegerlo de los flebotomos: medidas, calendario y gatos en casa | 872 | 900 | −3,1 % |
| Cierre y FAQ | 512 | 550 | −6,9 % |

Densidad de párrafo, método de la fase 4: media 38,7 / mediana 39 / párrafos >50 palabras 1,3 %. `tono.py`: 0 muletillas, 0,0 por 1.000 palabras; ese script excluye FAQ y avisos de seguridad y por eso devuelve otro volumen. SEO: 54 caracteres; meta: 158. Tres `AlertBox` (info, danger, warning), dos `TablaApilable`, siete preguntas FAQ. `data-label` en todas las celdas.

El brief exige exactamente tres avisos; la bibliografía se presenta en un `div data-editorial-bibliography`, en lugar del cuarto aviso recomendado por la plantilla general. Prevalece el contrato específico del brief. No hay H1 manual, TOC duplicado, JSON-LD ni imágenes inexistentes.

## Trazabilidad

| Fuente del brief | Uso concreto en la redacción |
|---|---|
| S1 AEMPS/MAPA 2026 | Apertura; señales; infección frente a enfermedad; pruebas; estadios y tratamiento sin pautas. |
| S2 LeishVet 2011 | Señales renales; alcance de pruebas; seguimiento; control sin promesa de curación; prevención integrada. |
| S3 ESCCAP 2012 | Ciclo y zoonosis; limitaciones de pruebas; medidas preventivas; temporada; vacuna para no infectados. |
| S4 Miranda 2008 | Segundo pico de casos clínicos desde siete años, atribuido a la serie de Barcelona y limitado al resumen. |
| S5 Cabré 2021 | Patrón renal y sistémico en mayores de la serie catalana; tamaño limitado y ausencia de datos terapéuticos. |
| S6 Alten 2016 | Fuenlabrada como punto español; observación estacional de 2011–2013; sin extrapolación nacional. |
| S7 Olmeda 2024 | Valdeorras y asociación entre prevención y casos, sin causalidad; una clínica y patrocinio declarados. |
| S8 OCV vía Europa Press 2024 | Recomendación anual atribuida a nota secundaria, diferenciada del estudio y de ESCCAP. |
| S9 AEMPS/CIMAVet | Diferentes indicaciones por parásito, límites de protección y toxicidad para gatos. |
| S10 EMA | Existencia de vacuna autorizada; sin edad, pauta ni eficacia. |

No hay dosis, duración de tratamientos, marcas de productos en el texto, cifras de creatinina/UPC/títulos ni prevalencia. «Anual o bianual» permanece literal, sin glosa. Se usa «pueden seguir infectados». El umbral de urgencia se identifica como criterio editorial.

## Comprobaciones y límites de esta sesión

- Se consultaron las instrucciones editoriales, el schema actual y los componentes reales mediante GitHub. El slug nuevo devolvió 404; los tres artículos enlazados y la página de la calculadora existen en la rama indicada. El inventario conserva los destinos y el tema en `[~]`.
- Se abrieron de nuevo el PDF oficial AEMPS/MAPA, la ficha CIMAVet, ESCCAP y la nota OCV/Europa Press. El PDF oficial confirma la distinción clínica y los estadios; se precisó que el pronóstico moderado va de bueno a reservado.
- PMC devolvió una comprobación de navegador para LeishVet y Valdeorras; EMA devolvió 429. En esos casos se conserva la evidencia documental del brief/R1/R2, sin afirmar una nueva lectura íntegra. Miranda sigue limitado al resumen y EMA a la existencia del producto, como en el brief.
- La clonación falló porque el proxy de red del entorno no aceptó la conexión. Se recuperaron los archivos necesarios mediante el conector GitHub. La carpeta local contiene esos archivos de referencia y la redacción, no un clon completo del proyecto.
- No se ejecutó build, proyección Markdown ni navegador: falta el checkout completo con sus dependencias. No se ha comprobado apariencia móvil, modo oscuro ni interacción de componentes en el sitio. No se emitió auditoría independiente del artículo ni se reutilizó el APTO del brief como aprobación del texto.

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

SHA-256 del MDX: `ebe2107047bc262c60a49896b397a6471f51269f5b7d82959396238368db7406`.
