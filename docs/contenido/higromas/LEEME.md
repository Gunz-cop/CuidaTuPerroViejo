# Entrega — Higromas en San Bernardo

Artículo completo, recursos integrados y auditados. Fecha: 2026-10-15.

## Archivos de contenido

- Artículo: `src/content/blog/callosidades-higromas-codos-perros-senior.mdx`.
- Brief actualizado: `briefings/briefing-callosidades-higromas-codos-perros-senior.md`.
- Cuatro WebP: `public/images/blog/callosidades-higromas-codos-perros-senior/` (hero, dos interiores, infografía).
- Tres animaciones: `src/components/article/HigromaAnimation.astro` (presion, acolchado, seguimiento).
- Auditoría independiente: `docs/contenido/higromas/auditoria-articulo-r1.md`.

## Comprobaciones finales

- `npx --no-install astro build`: terminó 0; catálogo y proyección Markdown correctos, 29 documentos. Se ejecutó sin postbuild ni despliegue.
- `npm run check`: 0 errores, 0 warnings; 58 hints existentes del repositorio.
- Navegador Chromium: 10/10 comprobaciones aprobadas. Cuatro imágenes decodificadas, un H1, tres variantes únicas sin autoplay, reproducción/pausa, movimiento reducido, sin JavaScript, 375 y 1280 px sin desbordamiento, cero excepciones JS.
- Vista autónoma: cuatro imágenes incorporadas, tres animaciones operativas, 375 px sin desbordamiento y cero excepciones. No depende de cargar módulos, imágenes o fuentes externos.
- `git diff --check`: sin incidencias.

### Tabla de verificación

Palabras MDX visibles; excluye bibliografía, código, atributos, alt y frontmatter. FAQ extraído a texto. Las 259 palabras adicionales renderizadas por cajas, controles y esquemas se incluyen en el conteo DOM final.

| Sección | Palabras MDX | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 609 | 600 | +1,5 % |
| Callo, higroma y otros bultos | 1.079 | 1.100 | −1,9 % |
| Presión repetida y dos codos | 838 | 900 | −6,9 % |
| Preparar el descanso | 961 | 1.000 | −3,9 % |
| Tratamiento según lesión | 1.259 | 1.300 | −3,2 % |
| Qué ocurrió en el caso | 627 | 600 | +4,5 % |
| Conclusión y FAQ | 841 | 800 | +5,1 % |
| Total MDX | 6.214 | 6.300 | −1,4 % |
| Total DOM con recursos | 6.473 | 6.000–6.500 | Dentro del rango |

Densidad: media 30,97 / mediana 37 / 0 % de párrafos >50 palabras. La distribución cumple ±15 % por sección. La versión autónoma contiene el mismo cuerpo y recursos, con la navegación externa dirigida al sitio público.

## Decisiones de integración

- San Bernardo en todas las imágenes; el caso publicado conserva su edad real de un año y sus resultados. Las imágenes representan un perro mayor y están identificadas como ilustraciones, no fotografías clínicas.
- Solo se acortó el título del FAQ a «Dudas frecuentes» para que el encabezado compartido no desborde en móvil; se mantienen las siete preguntas y respuestas.
- Se usó un div semántico con atributos data para que los esquemas sean compatibles con la proyección Markdown existente, sin modificar sus reglas. La descripción y las fuentes quedan accesibles en texto.
- El frontmatter usa `Publicado` para que ruta, catálogo y build sean coherentes. Esto NO acredita despliegue: todos los cambios siguen locales y sin commit/push.
- Se actualizaron el brief y el inventario local para registrar la redacción y dejar pendiente la publicación remota.

## Revisar la entrega

`articulo-higromas-san-bernardo.html` es una vista autónoma con los cuatro WebP incorporados y controles de las tres animaciones. Incluida en el ZIP. Los PNG originales de las imágenes generadas se conservan en `/workspace/generated_images`; el sitio usa las versiones WebP optimizadas.

No se hizo commit, push ni publicación. El ZIP contiene solo el contenido nuevo/corregido, sus recursos y evidencia; debe aplicarse sobre el repositorio base correspondiente.
