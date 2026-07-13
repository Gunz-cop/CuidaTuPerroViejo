# Referencia Técnica: Componentes Astro en MDX

Esta documentación detalla los componentes interactivos y de maquetación autorizados en el blog de **Cuida Tu Perro Viejo**. El redactor debe importar estos componentes al principio del cuerpo MDX (justo debajo del frontmatter) y usarlos con las siguientes propiedades.

---

## 1. AlertBox.astro

Componente utilizado para resaltar notas importantes, advertencias de salud o consejos veterinarios prácticos.

### Propiedades (Props)
*   `type`: (Opcional) Define el estilo y color de la caja. Valores soportados:
    *   `info`: (Por defecto) Fondo azul-verde suave, borde de marca. Para aclaraciones o explicaciones empáticas.
    *   `warning`: Fondo ámbar suave. Para consejos de seguridad o advertencias de administración.
    *   `danger`: Fondo rojo suave. Para advertencias críticas de salud o situaciones de emergencia.
*   `title`: (Opcional) Título destacado en negrita y mayúsculas en la parte superior del cuadro.

### Sintaxis en MDX
```mdx
import AlertBox from '../../components/AlertBox.astro';

<AlertBox type="info" title="Nota de Empatía">
  Aquí va el texto explicativo. Puedes usar **negritas** y [enlaces](/ruta) de forma normal dentro de la caja.
</AlertBox>
```

---

## 2. FAQ.astro

Componente unificado de Preguntas Frecuentes. Genera un listado de acordeones colapsables en formato mobile-first. Debe ubicarse estrictamente en la sección final del artículo.

### Propiedades (Props)
*   `title`: (Opcional) El título de la sección de preguntas frecuentes (por defecto es "Preguntas frecuentes").
*   `items`: (Obligatorio) Un array de objetos, donde cada objeto contiene:
    *   `question`: La pregunta en formato texto simple.
    *   `answer`: La respuesta en formato texto (soporta etiquetas HTML básicas como `<strong>` o `<a>`).

### Sintaxis en MDX
```mdx
import FAQ from '../../components/FAQ.astro';

<FAQ items={[
  {
    question: '¿El síndrome de Cushing duele?',
    answer: 'No provoca dolor directo en las fases iniciales, pero la debilidad muscular y el aumento de tamaño de los órganos internos pueden causar incomodidad constante.'
  },
  {
    question: '¿Qué es el Trilostano?',
    answer: 'Es el medicamento de elección (conocido comercialmente como Vetoryl) que ayuda a regular la producción de cortisol en las glándulas adrenales.'
  }
]} />
```

---

## 3. Comportamientos Automáticos del Layout

> [!NOTE]
> Para evitar redundancia y optimizar el rendimiento, el redactor debe conocer los componentes manejados automáticamente por el layout de la página:
*   **Tabla de Contenidos (TOC):** Es generada dinámicamente en tiempo de ejecución por `PostReader.astro`. No se debe añadir ningún código de TOC en el cuerpo del MDX. El layout analiza las etiquetas `H2` y `H3` y monta el índice interactivo tanto para escritorio como para móviles.
*   **Datos Estructurados (JSON-LD):** La página `[slug].astro` inyecta automáticamente en el `<head>` los esquemas `BlogPosting` y `BreadcrumbList` usando los metadatos declarados en el frontmatter del archivo `.mdx`. El redactor no debe inyectar manualmente código `<script type="application/ld+json">` en el archivo.
*   **Breadcrumbs:** Los enlaces de navegación (Inicio > Categoría > Artículo) son inyectados automáticamente al inicio de la página por el componente `Breadcrumbs.astro`.
*   **Feedback Widget:** El formulario de valoración del post se inserta automáticamente en la parte inferior de la página.
