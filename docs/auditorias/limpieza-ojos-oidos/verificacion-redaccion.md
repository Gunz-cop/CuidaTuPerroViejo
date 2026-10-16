# Verificación de la redacción

Fecha: 2026-10-15. Entrega de texto; sin publicación, commit ni push.

Artículo: `borradores/limpieza-ojos-oidos-perros-ancianos.mdx`. Copia idéntica a la revisada por el auditor independiente.

## Volumen y distribución

Conteo con el script oficial: cuerpo después del segundo delimitador de frontmatter, sin imports. Total **6.142 palabras**; rango pactado **5.440–7.360**. Los títulos H2 cuentan en el total y no en cada bloque individual.

| Sección | Palabras reales | Target | Desviación |
|---|---:|---:|---:|
| Introducción | 760 | 800 | −5 % |
| Ojos: observación y enfermedad | 1.069 | 1.200 | −11 % |
| Higiene exterior de ojos | 765 | 800 | −4 % |
| Oídos: más que retirar cera | 1.100 | 1.200 | −8 % |
| Limpieza de oídos indicada | 867 | 900 | −4 % |
| Cierre de la cohorte | 654 | 700 | −7 % |
| Conclusión, fuentes y FAQ | 874 | 800 | +9 % |

Densidad medida por script: **media 38 / mediana 39 / 1 % de párrafos de más de 50 palabras**. El primer párrafo narrativo es la excepción larga prevista.

## Comprobaciones realizadas

- 7 fuentes contrastadas por el auditor y utilizadas dentro de los H2 asignados, además del cuadro final. Se conserva la limitación documental de Moog; no se afirman resultados ni eficacia universal.
- Los 5 enlaces internos obligatorios están presentes. Se excluye el artículo sensorial aún no publicado.
- 3 AlertBox narrativos (info/danger/warning) más el cuadro de fuentes; FAQ de 7 preguntas con estructura JavaScript evaluada en Node.
- Frontmatter con campos/tipos admitidos por el schema local, seoTitle43 y metaDescription136 caracteres, fecha y byline coherentes, sin H1 ni hero duplicados.
- El parser del script no reconoce el nuevo formato del rango ni de la tabla de fuentes del brief: esas dos comprobaciones se realizaron explícitamente en la auditoría independiente, sin modificar el script ni forzar su aprobación.

## Límites de publicación

El texto está aprobado. El informe formal mantiene **No publicable** por tres imágenes ausentes. No se hizo build del sitio ni se afirma compilación MDX: el workspace contiene una copia parcial de los archivos y no tiene instaladas las dependencias del proyecto.

Tres recursos pendientes, contando portada:

1. `/images/blog/limpieza-ojos-oidos-perros-ancianos/limpieza-ojos-cocker-senior.webp` — portada.
2. `/images/blog/limpieza-ojos-oidos-perros-ancianos/masaje-base-oreja-limpiador-otico.webp` — cuerpo.
3. `/images/blog/limpieza-ojos-oidos-perros-ancianos/revision-semanal-oidos-perro-senior.webp` — cuerpo.

Al producirlos: mantener el cocker senior ilustrativo, representar limpieza sobre la piel exterior sin contacto corneal, revisar anatomía/alt/caption y dimensiones. Después integrar en `src/content/blog/`, comprobar build y renderizado. El estado del repositorio remoto no ha cambiado.

Auditoría independiente: `articulo-iteracion-1.md`. Métricas sin editar: `metricas-texto.txt`.
