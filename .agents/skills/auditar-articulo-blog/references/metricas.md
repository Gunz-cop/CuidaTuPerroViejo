# Qué comprueba metricas.mjs

El script es un control mecánico del artículo y su brief, no una aprobación editorial ni clínica. Ejecutar `node .agents/skills/auditar-articulo-blog/scripts/metricas.mjs <slug> --strict`. Los contratos se buscan en `briefings/briefing-<slug>.md`; si se usa adenda con otro nombre, registrar y preparar el contrato consolidado de esa versión en esa ruta antes de ejecutar. No medir contra un brief antiguo por conveniencia.

## Contrato y compatibilidad

Sin cabecera de versión conserva el control histórico de tres tipos de caja de cuerpo. Con `Contrato editorial: 2.0` requiere una declaración única válida `Componentes de cuerpo: info=0; danger=1; warning=0` y `FAQ: N preguntas.` (N entero ≥0). Cantidades de cuerpo entre 0 y 9; bibliografía aparte. Declaración ausente, duplicada, mal formada o versión no soportada bloquea: no se degrada a legado silenciosamente. Compara cantidades exactas, incluyendo cero; evalúa función/justificación a mano.

Secciones 1–11 y targets `### [H2 - Título] — Target: ~N palabras`; rango `intervalo MIN–MAX palabras` o formato antiguo Entre MIN y MAX palabras. Tabla de fuentes `# | Fuente | H2 asignado | ¿Citada?`, con número separado o integrado. Fichas de más de nueve fuentes admitidas. Sin rango, targets o fuentes interpretables, bloquea en lugar de declarar APTO sobre controles omitidos.

## Volumen y legibilidad

Cuenta cuerpo tras segundo `---`, sin imports ni separadores. Por sección compara real/target ±15%, además del total. Empareja por posición: verificar a mano si el título cambió y si hay omisión/reordenación; no tratar una reformulación como error automático. El texto dentro de componentes también requiere revisión aunque quede fuera del conteo.

Mide prosa, excluyendo títulos/listas/tablas/JSX/código; media 30–40 palabras sirve de referencia. El script conserva avisos/bloqueos por densidad elevada; la revisión decide cómo reorganizar sin cortar frases o citas ni rellenar. Lista fragmentos cortos para revisar deliberación. Cadencia H3 es señal de navegación, no licencia para insertar subtítulos decorativos.

## Fuentes y enlaces

Busca autor/título en H2 asignado, excluyendo bibliografía. Acepta destino por título completo normalizado o selectores completos H2-n/Intro/Introducción/cierre/Conclusión/FAQ; admite conectores y/o, punto y coma y calificador legado apoyo/con límites. Un título que coincide con varias secciones tras normalizar es ambiguo y bloquea; usar H2-n para desambiguar. H2-n es un identificador reservado, incluso si otra sección lleva un título numérico. Cualquier fragmento desconocido invalida la asignación: una frase que contenga «Introducción» o «H2-1» no es un selector. Si no interpreta el destino, bloquea aunque encuentre la cita en otra sección; nunca acepta cualquier aparición como respaldo de una asignación desconocida. Si hay autoría reconocible, prioriza esa aguja y el título completo frente a palabras débiles sueltas del título. Muestra agujas y avisa de débiles para revisar falsos positivos. No verifica autoría real ni si la fuente sostiene la afirmación: abrirla sigue siendo obligatorio. Cita solo al final no cumple la trazabilidad del contrato.

Compara enlaces declarados y referencias de imagen (`src`, `srcset`, Markdown, hero incluida), existencia, metadata y firma manual. Existencia de un archivo no verifica lo que contiene. Importaciones solo si se usa el componente. FAQ se cuenta y contrasta con el contrato; cero no se confunde con ausente. No comprueba por sí solo plegado, accesibilidad ni ausencia de riesgos clínicos.

## Resultado y pruebas

`NO APTO` indica bloqueantes mecánicos; `APTO CON AVISOS` o `APTO` solo ausencia de esos bloqueantes. Siempre quedan pendientes manuales de E01–E08, fuentes, imágenes y recursos. `status: Borrador` no protege de publicar.

Los tests usan fixtures sintéticos estables fuera del contenido de producción. Un cambio editorial del sitio no cambia el resultado esperado de una prueba del parser. Ningún fixture es fuente clínica ni artículo publicable. Casos: legado, versión 2.0, ceros, cantidades incumplidas, datos ausentes/duplicados/invalidos, versión desconocida y recursos faltantes.
