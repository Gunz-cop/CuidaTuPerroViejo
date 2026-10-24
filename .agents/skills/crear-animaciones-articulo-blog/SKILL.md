---
name: Crear Recursos Visuales y Animaciones de Artículo - Cuida Tu Perro Viejo
description: Crea o mejora imágenes coherentes de perros senior, infografías y animaciones didácticas en Astro/MDX. Usa un sujeto de referencia, recortes realistas y secuencias relacionadas con el texto; valida anatomía, edad visible, accesibilidad, móvil, modo oscuro y caché. Úsala cuando el usuario pida imágenes, infografías, animaciones o mejorar los recursos visuales de un artículo.
---

# Recursos visuales y animaciones para artículos

El estándar de referencia es la revisión visual aprobada por el usuario para el artículo de baño el 15 de octubre de 2026: **un perro senior reconocible y bien representado, con escenas didácticas que expliquen acciones concretas**. Consulta [el ejemplo implementado](references/patron-bano-senior.md) antes de empezar.

## 1. Define el objetivo y el sujeto

Lee y aplica la [dirección visual editorial](../references/direccion-visual-editorial.md), fijada por el propietario el 2026-10-24. Cada escena requiere una ficha de ambiente, materiales, luz, encuadre, gesto y coherencia espacial. El acabado detallado de casa/enfriamiento de golpe de calor es referencia para los próximos artículos; ni su país ni su raza se generalizan. La portada v1 de ese artículo fue rechazada por direcciones de marcha contradictorias: una imagen bonita con acción incoherente debe corregirse antes de entregarse.

- Lee el brief y los párrafos junto a los que aparecerá cada recurso. Define qué debe entender el lector, qué cambia durante la secuencia y qué acción puede realizar. Respeta el número de imágenes, infografías y animaciones acordado; no añadas recursos solo para llenar una cuota.
- Si el caso publicado identifica un perro y el brief requiere conservar su raza, respétala. Si no identifica raza, sigue la elección visual del usuario o el sujeto ilustrativo acordado. **El dogo argentino pertenece al ejemplo, no es la raza predeterminada de todo el sitio.**
- Fija una ficha visual: raza, tamaño, edad ilustrativa, pelaje, marcas, orejas, rasgos faciales y proporciones. Mantén esa identidad en hero, escenas de cuerpo y animaciones. Si el usuario aporta una referencia, úsala.
- Diferencia el sujeto ilustrativo del paciente real. No inventes historia, nombre, diagnóstico o desenlace para justificar las imágenes; no presentes una imagen generada como fotografía clínica.

## 2. El perro debe parecer senior

Escribir «senior» en el prompt no garantiza un resultado de edad avanzada. Revisa la imagen antes de aceptarla.

- Busca una combinación creíble de expresión envejecida, pliegues naturales, textura del pelo, postura y tono muscular acordes con ese perro. En un perro blanco, las canas no bastan como indicador de edad.
- Evita un perro atlético de exposición cuando el contexto exige movilidad reducida. Conserva anatomía correcta y una presentación digna; no exageres debilidad, deformidad o sufrimiento para hacerlo parecer viejo.
- **No conviertas cataratas, ceguera, heridas o enfermedad en requisitos de envejecimiento.** Los rasgos del sujeto de referencia son particulares; no todos los perros senior deben tener ojos velados.
- Revisa cara, orejas, patas y apoyos a tamaño grande y a escala móvil. Una cara convincente no compensa extremidades mal construidas.

## 3. Genera una referencia y deriva las escenas

1. Usa la herramienta de generación/edición de imágenes disponible para crear o corregir una primera escena. Inspecciónala antes de generar el resto.
2. Usa esa imagen como referencia de las escenas siguientes. Repite los rasgos distintivos y pide conservar la identidad. No generes cada perro por separado con un prompt genérico.
3. Cuando una animación necesite un perro, genera un **recorte realista con fondo transparente** del mismo sujeto, con pose, orientación, encuadre y extremidades visibles adecuados al concepto. Comprueba transparencia real y bordes limpios.
4. Evita dibujar un perro protagonista mediante elipses y trazos simplificados si el resultado pierde anatomía o aspecto senior. Puedes combinar el recorte realista con SVG para superficies, herramientas, llamadas y zonas destacadas.
5. Si el usuario pide otro estilo, respétalo y conserva los mismos criterios de anatomía, edad y coherencia. El recorte fotorealista es un patrón disponible, no una imposición sobre una preferencia explícita.

Si la herramienta no está disponible, conserva los prompts y declara qué recurso queda pendiente. No entregues una silueta improvisada como si alcanzara el estándar visual aprobado.

### Esqueleto de prompt para continuidad

```text
Usa exactamente el mismo perro de la imagen de referencia: [ficha visual].
Debe apreciarse su edad avanzada mediante [rasgos naturales del sujeto].
Nueva escena: [acción concreta, postura y apoyo seguro].
Mantén identidad, proporciones, orejas y marcas. [Plano, luz, fondo y estilo].
Ilustración editorial; no representa una fotografía del paciente publicado.
```

Para el recorte, añade fondo transparente, cuerpo completo, orientación y margen suficiente sin cortar patas, cola ni orejas. No uses un recorte con collar, manos u otros objetos si impedirán explicar la acción posterior.

## 4. Diseña una secuencia que enseñe

- Prepara un pequeño guion: estado inicial → acción → cambio visible → siguiente decisión. Cada paso debe conectar con el párrafo del artículo y tener texto que pueda leerse sin movimiento.
- Prioriza cambios comprensibles: retirar contacto, cerrar el agua, disponer una superficie o recorrer zonas externas. Una flecha que rebota o un objeto que pulsa, sin explicar un proceso, no basta.
- El perro de un recorte es una imagen estática. **Anima herramientas, zonas y pasos sin afirmar que has generado movimiento corporal o vídeo del animal.** Si se necesita movimiento corporal, requiere recursos o fotogramas adecuados; no deformes patas o cara para simularlo.
- No hagas que una animación prometa recuperación, ausencia de dolor o un resultado clínico. Distingue esquema de una actuación doméstica de procedimiento veterinario y no enseñes maniobras inseguras.
- Elige el formato por la función: imagen para una escena, infografía para comparar o resumir, animación para explicar un cambio. Una infografía debe tener texto legible en móvil y no depender del color para comunicar categorías.

## 5. Implementación en este repositorio

- Usa componentes Astro en `src/components/article/` y enlázalos desde el MDX. Puedes partir de `BanoAnimation.astro` y `BanoInfographic.astro`, adaptando sujeto, coordenadas, guion y recursos. No dupliques un componente completo si basta una configuración; no refactorices otros artículos sin necesidad.
- Mantén CSS acotado al componente. Comprueba los estilos de `.content-body` en `BaseLayout.astro`: sus colores de títulos y `strong` pueden alterar una tarjeta clara en modo oscuro. Declara colores locales de texto y fondo y verifica el resultado calculado, no solo las variables.
- Usa HTML estándar para los contenedores. El proyector Markdown del sitio rechaza etiquetas desconocidas: el primer intento con `<bano-sequence>` rompió el build. El patrón válido usa `div` con atributos `data-*` e inicialización de script.
- Da `title`/`desc` al SVG y texto alternativo al recurso cuando corresponda; evita duplicar toda la explicación para lectores de pantalla. Usa identificadores únicos por instancia.
- No cargues una librería de animación pesada para un recorrido de cuatro pasos que puede resolverse con CSS y JavaScript locales.

### Controles y accesibilidad

- Sin reproducción al cargar. Botones de anterior/siguiente, reproducir/pausar y repetir; foco visible, controles utilizables con teclado y objetivos táctiles de al menos 44 px.
- Reproducción finita; detener temporizadores al ocultar la página y al desmontar/navegar. No dejar múltiples inicializaciones sobre un mismo componente.
- Respetar `prefers-reduced-motion`: quitar animaciones/transiciones y permitir consultar cada paso manualmente. Si la reproducción depende del movimiento, deshabilitarla con una explicación visible.
- Sin JavaScript, conservar todos los pasos como texto y ocultar controles que no funcionen. Mantener una alternativa útil para impresión.
- Un estado pausado debe dejar de avanzar y detener el movimiento relevante. No anunciar automáticamente cada transición de reproducción con una región viva ruidosa.

## 6. Archivos, optimización y caché

- Guarda recursos finales en `public/images/blog/{{slug}}/`. Optimiza imágenes editoriales a WebP y crea variantes acordes con el `srcset` real del sitio; el ejemplo usa 1200/800/400 px. Conserva el canal alfa en recortes transparentes y no estires proporciones.
- Incluye hero, imágenes de cuerpo y recursos externos usados por SVG en la comprobación de archivos. Una URL válida no garantiza que el navegador haya decodificado la imagen.
- Inspecciona `_headers` antes de reemplazar una imagen publicada. Si hay caché larga, utiliza un nombre nuevo o versión en el nombre y actualiza referencias/variantes. Evita que el lector siga viendo el recurso viejo.
- Conserva los originales generados si están disponibles; no borres material de referencia del usuario. En el informe, registra rutas reales y qué recurso se usó como referencia.

## 7. Verificación antes de entregar

- [ ] Ficha visual y prompt completos según la dirección visual compartida; escenario propio del tema y público, sin vivienda estadounidense por defecto.
- [ ] Dirección de marcha y miradas coherentes; manos, herramientas y correa con contactos y recorridos posibles. El gesto se entiende a tamaño móvil sin explicación adicional.

- [ ] Inspección visual de la referencia y todas las escenas: mismo perro, edad senior evidente, anatomía y apoyos correctos, transparencia limpia.
- [ ] Capturas de las animaciones en escritorio y móvil, en modo claro y oscuro. Muestra al usuario una vista concreta del resultado.
- [ ] Cumple [apoyos visuales cómodos en móvil y escritorio](../references/apoyos-visuales-responsive.md): cada recurso ≤ ~900 px de alto en móvil, controles junto al dibujo, notas y formularios largos plegados, tablas apilables. Anota las alturas medidas.
- [ ] Sin desbordamiento a 375–390 px. Títulos, destacados y explicaciones legibles; contraste mínimo de texto normal 4,5:1.
- [ ] Controles, teclado, pausa, repetición y avance temporizado comprobados en navegador, sin errores JavaScript.
- [ ] Movimiento reducido y alternativa sin JavaScript comprobados.
- [ ] Hero, imágenes de cuerpo y recorte decodificados; rutas de versiones y tamaños existentes.
- [ ] `npx astro build` correcto, incluida la proyección Markdown; `npx astro check` sin errores nuevos. Si solo se documenta un método y no cambia código, validar enlaces y formato sin repetir el build.
- [ ] Diferenciar generación local, push y despliegue real. Publicar únicamente dentro de la autorización del usuario.

Registra resultados y capturas en `docs/contenido/{{slug}}/`. No declares «aprobado visualmente por el usuario» hasta que realmente lo haya visto y aprobado.
