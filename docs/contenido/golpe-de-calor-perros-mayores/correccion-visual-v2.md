# Corrección de portada y dirección visual futura

24 de octubre de 2026. Petición del propietario tras la primera entrega.

## Observación y corrección

La portada v1 mostraba al perro hacia la cámara y a la cuidadora de espaldas, creando la impresión de marcha en sentidos opuestos. El propietario rechazó esa composición y destacó la belleza y el detalle de las escenas de casa y enfriamiento. Se reconoce ese fallo de revisión y se utiliza como contraejemplo en las instrucciones futuras.

Se editó la imagen con la herramienta de imágenes, usando v1 como referencia de identidad, calle, materiales y luz. En v2 ambos avanzan hacia la cámara: frente y pasos de la cuidadora visibles, perro a su lado y correa floja continua entre mano y collar. Se inspeccionó la anatomía y la lectura de la acción. Es una comprobación del autor; la aceptación de esta versión por el propietario sigue sin constar.

Original nuevo: `originales/podenco-senior-paseo-amanecer-v2.png`. Archivos de uso: `public/images/blog/golpe-de-calor-perros-mayores/podenco-senior-paseo-amanecer-v2.webp` y variantes `-800` y `-400`. Se conservan v1 y sus originales como historial; ninguna referencia activa del artículo usa v1.

Actualizados el frontmatter del artículo y de su copia de entrega, el brief, la vista previa y la documentación. El cuerpo editorial conserva su redacción y extensión. La adenda visual del brief mantiene las fuentes y el contrato científico auditados en R2.

## Persistencia para siguientes artículos

La preferencia se desarrolla en `.agents/skills/references/direccion-visual-editorial.md`, enlazada desde `AGENTS.md` y las skills de brief, redacción y producción visual. También se añadió una ficha por imagen en la plantilla de briefs y se registró la tarea en `TODO.md`.

La ficha exige función, contexto del público, materiales y detalles relevantes, acción y relaciones espaciales, cámara, luz, texturas, exclusiones concretas y aceptación sobre la imagen real. Se conserva la calidad de ambientación, sin imponer España, el podenco, una decoración o una luz a los demás temas. Se revisan expresamente dirección de marcha, miradas, manos, apoyos, herramientas y correa. Una imagen atractiva con acción incoherente debe corregirse.

Los comentarios sobre casa y enfriamiento documentan una preferencia estética del propietario, sin afirmar una aprobación general de todas las imágenes o una revisión retrospectiva de todos los artículos anteriores.

## Verificación

- `npx astro build`: correcto, incluyendo proyección Markdown; `build-v2.log`.
- Enlaces locales de la nueva referencia compartida y sus puntos de adopción: comprobados.
- Imagen v2 con variantes reales; comprobación del navegador a 390 y 1366 px en `portada-v2-navegador.json`, capturas `portada-v2-390.png` y `portada-v2-1366.png`.
- Las pruebas anteriores de tablas, FAQ y modos de color se conservan identificadas como evidencia de la primera entrega; las nuevas capturas verifican específicamente la sustitución de la portada.
- `git diff --check`: correcto. Sin commit, push ni despliegue.
