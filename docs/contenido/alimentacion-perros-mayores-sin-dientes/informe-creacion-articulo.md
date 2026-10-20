# Creación del artículo y los recursos

Creación: 2026-10-19. Cierre de comprobaciones propias: 2026-10-20. Rol: creación, sin corrección posterior a auditoría ni veredicto independiente. Alcance: un artículo sobre alimentación de perros mayores sin dientes, su componente didáctico y tres ilustraciones. No se ha leído el plan adjunto ausente, fusionado la rama ni desplegado.

El brief recibió APTO independiente R2 y, tras resolver una incompatibilidad técnica del estado del catálogo, APTO R3. La versión científica permaneció igual. Referencia final: `briefings/briefing-alimentacion-perros-mayores-sin-dientes.md`, SHA-256 `fb110f500fc009ac86263bd8ca817e361f3f073be6413ae3c5e57d92ec5af0fa`.

## Resultado y decisiones de implementación

- Artículo: `src/content/blog/alimentacion-perros-mayores-sin-dientes.mdx`.
- Componente: `src/components/article/AlimentacionSinDientesVisual.astro`, variantes `decision`, `comparacion`, `secuencia`, `registro`.
- No hay caso ni testimonio. El beagle es un sujeto ilustrativo generado con IA y declarado visiblemente en hero y figuras; no acredita ausencia dental ni respuesta clínica.
- Se conserva la autoría central real de `ArticleByline`; no se duplica la firma antigua del corpus en el cuerpo. Así lo documenta el brief aprobado, frente a la referencia histórica de la skill.
- Dos figuras HTML semánticas con `data-reader-atomic`, dimensiones, `srcSet`, `sizes` y pie visible, en lugar de Markdown simple: permiten servir variantes reales y evitar anuncios entre imagen y explicación. La proyección Markdown conserva imágenes y pies. No se duplica la hero.
- La tabla comparativa tiene `caption`, encabezados de fila/columna, foco visible y `tabindex=0`. Su lectura horizontal funciona con teclado; se conserva la comparación planificada en el brief. La variante adicional no añade una pregunta ni afirmación nuevas.
- El registro conserva etiquetas HTML, entradas opcionales y texto para copiar sus campos en una libreta. Este último texto evita que el proyector, que omite los controles y sus etiquetas, deje una promesa de registro sin contenido equivalente. No hay envío, cuenta, persistencia ni PDF anunciado como descarga.
- El botón de impresión prepara una copia de una página con los valores actuales, invoca la impresión del navegador y limpia esa copia al terminar. La impresión normal del artículo conserva los tres pasos completos, con JavaScript y sin él.
- `status: Publicado` es la etiqueta técnica que exige el catálogo de proyección. No acredita publicación real. La rama y el inventario continúan pendientes de publicación, según autorización expresa de no desplegar. El build con `Borrador` falló en el catálogo, no por un error de MDX; el expediente conserva esa incidencia.

## Verificación del contrato textual

Método: cuerpo tras el segundo delimitador del frontmatter, sin imports, separado por espacios. Incluye encabezados, atributos y JSX según contrato; el texto del componente requiere revisión aparte y no se usa para inflar este conteo. Archivo de resultados: `metricas-creacion.json`.

| Bloque | Palabras reales | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 159 | 150 | +6,0 % |
| Antes de cambiar el plato | 338 | 350 | −3,4 % |
| Qué comida elegir | 343 | 400 | −14,2 % |
| Cómo adaptar la textura | 413 | 400 | +3,2 % |
| Preparación y sobras | 260 | 250 | +4,0 % |
| Cómo saber si ayuda | 318 | 300 | +6,0 % |
| Conclusión, bibliografía y FAQ | 400 | 350 | +14,3 % |
| **Total** | **2.231** | **2.200** | **+1,4 %** |

Densidad de prosa: media 37,6 palabras, mediana 39; 0 % de los 42 párrafos medidos supera 50 palabras. Las seis FAQ están al final. Hay tres alertas clínicas planificadas y un cuarto cuadro de fuentes, según el contrato corregido. Los tres enlaces contextuales requeridos existen. No se inventó un segundo spoke.

## Fuente, uso y límites de la síntesis

Identidades, localizadores y comprobación documental detallada se conservan en el brief y las auditorías independientes de ese documento. Durante creación se consultaron esos registros y los pasajes descargados, no se añadieron referencias de memoria.

| Fuente | Uso nominal en el artículo | Límite conservado |
|---|---|---|
| WSAVA, Guidelines on Selecting Pet Foods | H2 «Qué comida elegir» | Completo/complementario, adecuación individual y energía; no marca ni dieta senior universal |
| WSAVA, Nutritional Assessment Guidelines | H2 «Qué comida elegir», «Cómo adaptar» y «Cómo saber si ayuda» | Evaluación, receta profesional y seguimiento; no proporciones ni calorías objetivo |
| WSAVA, Guías Dentales | H2 «Antes de cambiar el plato» | Signos posibles de dolor; no diagnóstico por falta de dientes o apariencia |
| VCA, Megaesophagus | H2 «Antes de cambiar» y «Cómo adaptar» | Riesgo de consistencia líquida en ese contexto; no equipara ausencia dental a megaesófago ni enseña postura terapéutica |
| VCA, Post-Operative Instructions in Dogs | H2 «Antes de cambiar el plato» | Instrucciones individuales de cirugía general; no pauta dental, porciones o días de dieta blanda |
| FDA, Tips for Safe Handling of Pet Food and Treats | H2 «Preparación, sobras y limpieza» | Higiene y refrigeración/desecho; no vida útil universal para papillas |

Matriz, comparación, secuencia y registro son síntesis editoriales con esos límites. No hay dosis, suplementos añadidos, recetas completas improvisadas, jeringa, apertura forzada de boca ni promesas de recuperación, absorción o seguridad universal.

## Recursos entregados

| Recurso / pregunta | Ubicación | Archivo real | Entrega y prueba |
|---|---|---|---|
| Hero: contexto de una comida blanda | Cabecera | `beagle-senior-comida-blanda-v1.webp` y variantes 400/800 | Referencia inspeccionada, mismo senior; decodificación local y pie IA |
| Escena: preparación de presentación | H2 «Cómo adaptar» | `preparar-textura-comida-perro-v1.webp` y variantes | Derivada de referencia inspeccionada; `srcSet` y dimensiones reales |
| Escena: toma voluntaria | H2 «Cómo saber si ayuda» | `observar-comida-perro-senior-v1.webp` y variantes | Mismo perro, cuatro apoyos; alt describe libreta y perro, sin cuidador ausente |
| Matriz: qué situación hay que distinguir | H2 inicial | Variante `decision` | Tres decisiones con texto HTML y señales visibles, sin diagnóstico |
| Comparación: qué revisar de cada presentación | H2 nutricional | Variante `comparacion` | Tabla accesible, teclado y contraste |
| Secuencia: preparación → adaptación → observación | H2 textura | Variante `secuencia` | Tres pasos, controles manuales y reproducción opcional finita, sin autoplay |
| Registro: qué llevar a consulta | H2 seguimiento | Variante `registro` | Campos editables, alternativa para libreta, impresión navegador sin envío |

Las nueve WebP están en `public/images/blog/alimentacion-perros-mayores-sin-dientes/`; originales y método en `originales/` y `produccion-visual.md`. El helper de hero anuncia 400/1200 y no 800: la variante 800 de hero se conserva pero no se presenta como seleccionada. Las escenas de cuerpo sí anuncian 400/800/1200 explícitos.

## Evidencia propia y limitaciones

Script reproducible: `verificar-creacion.py`. Resultados de navegador: `verificacion-creacion.json`. Capturas y PDF: `capturas-creacion/`. Hashes de artículo, componente, HTML y proyección: `version-creacion.json`. No son auditorías independientes.

Las capturas `*-pagina.png` conservan la página normal, incluidas navegación y botón del asistente. Solo para las capturas de detalle de los recursos se separaron temporalmente del DOM la navegación sticky y ese botón, y después se restauraron; así no tapan títulos o señales. Esas capturas no demuestran ausencia de overlays en la página normal.

La primera verificación de recursos pasó sobre el HTML generado antes de resolver la etiqueta técnica del catálogo. `equivalencia-build.json` demuestra igualdad exacta de ese HTML y sus nueve WebP después de cambiar solo `status`. Después se hicieron mejoras propias de accesibilidad/proyección, que tienen nuevos hashes y requieren sus pruebas finales; aquella equivalencia no se extiende a esas mejoras.

La suite completa propia del 19 de octubre, tras integrar tabla accesible y arreglo del índice, dejó los siguientes resultados en `verificacion-creacion.json`:

- Móvil 390 y escritorio 1366 px, claro y oscuro: axe sobre el `article` completo sin infracciones WCAG 2 A/AA y 2.1 AA detectadas; imágenes decodificadas y tamaños realmente seleccionados registrados. Sin errores JavaScript.
- Reflujo a 375 y 320 px sin desbordamiento de la página. La tabla enfocada por teclado se desplazó 40 px con ArrowRight y mantuvo foco visible.
- Sin autoplay; anterior/siguiente por teclado, controles de al menos 44 × 44 px, pausa estable durante siete segundos sin animaciones activas, reproducción finita al comprobar a veinte segundos y repetición funcional.
- Preferencia de movimiento reducido con navegación manual y transición de 0 s; todos los pasos sin JavaScript y sin controles inertes visibles. Impresión normal del artículo con los tres pasos, tanto con JavaScript como sin él.
- Evento `visibilitychange` simulado con estado oculto: pausa. Evento de navegación Astro: limpieza del temporizador comprobada durante siete segundos. Dos inicializaciones `astro:page-load` no duplicaron los manejadores. Son comprobaciones de eventos simulados, no una afirmación de haber probado todos los navegadores o un desmontaje arbitrario externo a Astro.
- Los enlaces internos reales devolvieron HTML 200 local y se comprobaron las anclas. El contraste mínimo de los textos/controles medidos en los componentes fue 5,40:1 (incluye controles deshabilitados). El encabezado del índice corregido por el rol separado pasó a 6,32:1 en claro y 10,91:1 en oscuro (`contraste-indice-final.json`).

Después de esa suite se cambió únicamente la API de inserción de la copia imprimible a `appendChild`, para resolver el conflicto de tipos DOM/Worker, y la tipografía/espaciado de esa copia al imprimir. El contenido clínico, el DOM de pantalla y la lógica de secuencia no cambiaron. Se hizo un build completo nuevo el 20 de octubre: 33 documentos proyectados, artefactos de API y sitemap completados. Registro real: `verificacion/build-creacion-final.log`. No se repitieron controles de secuencia que permanecieron idénticos.

La comprobación focal final del 20 de octubre se conserva en `verificar-impresion-final.py` y `impresion-final.json`: botón de impresión real, evento `beforeprint`, copia insertada con `appendChild`, limpieza `afterprint`, valores exactos conservados y cero errores JavaScript. Tanto una toma de ejemplo como todos los campos llenos hasta sus límites (ocho entradas de 160 caracteres y notas de 350) produjeron **una sola página A4**, con cuerpo y etiquetas de **10 pt**, título de 15 pt y sin recortar campos. Se inspeccionó el PDF rasterizado para confirmar legibilidad y presencia del aviso final. Evidencia: `registro-relleno.pdf`, `registro-maximo.pdf` y sus PNG de impresión; son archivos de prueba del expediente, no descargas anunciadas al lector.

`version-creacion.json` identifica los hashes finales. El archivo `version-creacion-previa-cierre.json` conserva el registro previo, sin atribuir al código final una ejecución de la suite anterior. Las capturas de pantalla del 19 se conservan como tales; las nuevas impresiones corresponden al build final del 20. El coordinador está realizando sus verificaciones técnicas sobre esa misma versión final; sus resultados deben atribuirse a su informe, no a este rol.

Producto estable entregado para la **primera auditoría independiente del artículo completo**. No hay recursos pendientes de creación. Esto no emite APTO independiente ni autoriza publicación, fusión o despliegue.
