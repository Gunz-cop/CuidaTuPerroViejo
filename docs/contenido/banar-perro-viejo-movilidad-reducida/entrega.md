# Artículo de baño y movilidad reducida — entrega local

15 de octubre de 2026. Brief corregido y revisado en dos iteraciones de ajustes; el informe distingue autoverificación de auditoría externa independiente. Artículo redactado, recursos integrados e inventario actualizado. Sin commit, push ni publicación.

## Verificación editorial

| Bloque | Palabras reales | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 809 | 800 | +1,1 % |
| Antes de abrir el grifo | 1017 | 1000 | +1,7 % |
| El gruñido y el dolor | 1064 | 1100 | −3,3 % |
| Técnica paso a paso | 1188 | 1200 | −1,0 % |
| Alternativas al baño | 769 | 800 | −3,9 % |
| Cierre de la serie clínica | 682 | 700 | −2,6 % |
| Conclusión, fuentes y FAQ | 663 | 700 | −5,3 % |

Total: 6192 palabras editoriales. Siete FAQ. Todas las secciones dentro del ±15 % previsto. Densidad de prosa: media 40,9 / mediana 41 / 0 % de párrafos de más de 50 palabras; máximo 48. El conteo excluye frontmatter, imports, atributos y código de componentes; conserva preguntas y respuestas FAQ, fuentes y pies. No incluye etiquetas, controles ni copia reutilizable de las infografías/animaciones. El script `medir-articulo.py` permite reproducirlo desde la raíz del repo. El conteo del DOM con las FAQ inicialmente cerradas fue 6305 palabras y no sustituye el conteo editorial.

Seis fuentes citadas en el cuerpo de sus H2 asignados y en el cuadro de cierre. Sin citas sin URL por resolver. El resumen institucional de Camps es el límite de acceso a esa serie: no se atribuyen pacientes individuales, edades, razas o desenlaces no documentados.

## Recursos

- Tres ilustraciones generadas del mismo dogo argentino blanco de orejas naturales, nariz negra, ojos marrones y mancha sobre ojo izquierdo. Dos escenas derivadas de la primera imagen de referencia. Ninguna representa a un paciente de la serie.
- Nueve WebP: tres escenas a 1200, 800 y 400 px. Originales PNG preservados en `/workspace/generated_images/`. Cada imagen principal pesa entre 110 y 124 KiB.
- Dos infografías HTML/SVG originales con etiquetas legibles en móvil: elección de modalidad y ruta del aseo. No son fotografías ni algoritmos diagnósticos.
- Tres animaciones SVG distintas: pausa y retirada de contacto, preparación progresiva del espacio y aseo localizado por zonas. Controles de avance/retroceso, reproducción, pausa y repetición. Sin arranque automático ni bucle indefinido.

## Verificación técnica

- `npx astro build`: correcto, incluida la proyección Markdown y API de contenido del repo (30 documentos).
- `npx astro check`: 0 errores, 0 advertencias; 58 hints del proyecto.
- `git diff --check`: correcto.
- Chromium/Playwright: tres secuencias operativas con teclado, avanzar/retroceder y reproducir/pausar; avance temporizado comprobado. Sin errores JavaScript.
- Pantalla 375×812: ancho de documento 375 px, sin desbordamiento horizontal.
- Movimiento reducido: reproducción deshabilitada; recorrido manual disponible sin transiciones.
- Sin JavaScript: doce pasos visibles y controles ocultos.
- Tres imágenes cargadas y decodificadas, incluida la hero. Los siete enlaces internos contextuales corresponden a rutas generadas en el build.

La validación detectó y resolvió dos problemas: el proyector Markdown no admitía la etiqueta de elemento personalizado (sustituida por HTML estándar) y un título FAQ demasiado largo desbordaba en móvil (abreviado). No se modificaron layouts, estilos globales ni configuración del stack.

## Archivos principales

- `briefings/briefing-banar-perro-viejo-movilidad-reducida.md`
- `src/content/blog/banar-perro-viejo-movilidad-reducida.mdx`
- `src/components/article/BanoAnimation.astro`
- `src/components/article/BanoInfographic.astro`
- `public/images/blog/banar-perro-viejo-movilidad-reducida/`

El informe previo identifica cuatro briefs relacionados que reutilizan Lee. Permanecen fuera de esta corrección y deben comprobarse antes de sus propias redacciones. No se trabajaron los temas de Reserva Personal.
