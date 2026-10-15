# Patrón aprobado: dogo senior, baño y aseo localizado

El usuario rechazó la primera silueta SVG y las fotos que parecían de un perro joven. Aprobó expresamente la revisión con un recorte realista del dogo envejecido y pidió conservar el método en las skills.

## Implementación real

- [Animación por pasos](../../../../src/components/article/BanoAnimation.astro): variantes `pausa`, `espacio` y `zonas` con el mismo recurso transparente, cambios de herramientas/zonas y texto por paso.
- [Infografías](../../../../src/components/article/BanoInfographic.astro): elección de modalidad y preparación del recorrido.
- [Artículo integrado](../../../../src/content/blog/banar-perro-viejo-movilidad-reducida.mdx).
- [Especificación visual del brief](../../../../briefings/briefing-banar-perro-viejo-movilidad-reducida.md).
- [Informe de revisión](../../../../docs/contenido/banar-perro-viejo-movilidad-reducida/revision-visual.md).
- [Resultado de navegador](../../../../docs/contenido/banar-perro-viejo-movilidad-reducida/revision-visual-navegador.json).
- [Captura móvil en modo oscuro](../../../../docs/contenido/banar-perro-viejo-movilidad-reducida/vista-movil.png).
- [Captura de escritorio](../../../../docs/contenido/banar-perro-viejo-movilidad-reducida/vista-animacion.png).

Estos enlaces se resuelven desde esta carpeta de referencias hasta la raíz del repositorio.

## Recursos finales

Carpeta: `public/images/blog/banar-perro-viejo-movilidad-reducida/`.

| Función | Archivo |
|---|---|
| Referencia editorial/hero | `bano-dogo-argentino-senior-antideslizante-v2.webp` |
| Aseo localizado | `aseo-por-zonas-perro-mayor-tumbado-v2.webp` |
| Secado | `secado-toalla-perro-senior-tranquilo-v2.webp` |
| Recorte transparente | `dogo-argentino-senior-perfil.webp` |

Las tres escenas editoriales tienen variantes `-800` y `-400`. El recorte es 1200×675 con canal alfa. Para reutilizarlo como referencia en una nueva edición, inspeccionar el archivo antes de llamar a la herramienta de imágenes. No asumir que las rutas temporales de una sesión siguen disponibles.

## Qué hace que funcione

1. Se corrige y valida primero un perro de referencia; las escenas y el recorte se derivan de él.
2. La edad es visible en varios rasgos naturales. En este sujeto hay pliegues, expresión anciana y menor tono muscular; no se universalizan sus rasgos oculares a todos los seniors.
3. La foto recortada conserva anatomía; SVG/CSS mueve los elementos explicativos alrededor del perro. No se presenta como vídeo o movimiento corporal generado.
4. En `pausa` desaparece el flujo, se retira el icono de contacto y se destaca el espacio; en `espacio` se prepara progresivamente el entorno; en `zonas` cambia el foco corporal y el paño.
5. Los títulos de tarjetas claras tienen color local: el tema oscuro del artículo no los vuelve verde pálido sobre blanco.
6. La revisión documentó contraste mínimo 8,18:1 en títulos/destacados, móvil sin desbordamiento y doce pasos disponibles sin JavaScript. Son resultados de esa versión, no garantías de cualquier copia futura.

## Cómo adaptarlo

Reutilizar el patrón de secuencia y controles; generar el sujeto del nuevo artículo cuando sea distinto. Recolocar marcadores y herramientas según la anatomía y el encuadre reales. Conservar únicamente acciones respaldadas por el texto del nuevo brief. No copiar el dogo, el tema del baño o un porcentaje de contraste como requisito universal.
