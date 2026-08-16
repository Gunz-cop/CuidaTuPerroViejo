# Análisis del Corpus Real (11 artículos) y Estructura Definitiva

Este documento reemplaza un intento anterior que solo anotaba 3 artículos — ese enfoque llevó a una conclusión **incorrecta** (decía que la línea de autoría era un caso aislado; en realidad aparece en 8 de 11 artículos). Esta versión revisa los 11 artículos publicados en `src/content/blog/` y define, elemento por elemento, qué adoptar como estándar, qué evitar, y por qué — con evidencia, no con una muestra parcial.

> **Nota:** este análisis define la estructura para **artículos nuevos**. Los 11 artículos existentes no se modifican aquí — eso es trabajo de curación para más adelante, una vez que la estructura definitiva esté validada.

---

## Tabla comparativa completa

| Artículo | H2 | TOC manual (`<details>`) | JSON-LD manual | Botón "volver arriba" | Byline Autoría/Actualizado | Cuadro de Fuentes | AlertBox (n.º) | FAQ |
|---|---|---|---|---|---|---|---|---|
| `cama-ortopedica-perros-mayores-displasia-artrosis.mdx` | 5 | No | **Sí** | Sí | No | Sí | 3 | Sí |
| `chequeo-geriatrico-canino.mdx` | 6 | No | No | No | Sí | No | 0 | No |
| `comida-casera-perros-mayores.mdx` | 5 | Sí | No | No | Sí | Sí | 5 | No |
| `como-dar-medicacion-perro.mdx` | 8 | Sí | No | No | Sí | No | 1 | Sí |
| `disfuncion-cognitiva-canina.mdx` | 8 | Sí | No | No | Sí | Sí | **19** | Sí |
| `incontinencia-urinaria-perros-mayores.mdx` | 8 | Sí | No | No | Sí | No | 1 | No |
| `mi-perro-viejo-defeca-mucho-poliquezia.mdx` | 6 | No | No | No | Sí | No | 1 | Sí |
| `prevencion-caidas-perro-mayor.mdx` | 5 | Sí | No | Sí | No | Sí | 5 | Sí |
| `salud-dental-perros-mayores.mdx` | 8 | No | No | No | No | No | 2 | No |
| `ulceras-presion-perros.mdx` | 8 | No | No | No | Sí | No | 1 | No |
| `vacunas-desparasitacion-perros-senior.mdx` | 8 | No | No | No | Sí | No | 0 | No |
| **Total con el patrón** | — | **5/11** | **1/11** | **2/11** | **8/11** | **4/11** | — | **5/11** |

---

## Veredicto por elemento (qué es estándar definitivo para artículos nuevos)

### ✅ Adoptar: byline `Autoría` / `Actualizado`

Aparece en **8 de 11** artículos (mayoría real, no un caso suelto como se afirmó antes) y coincide con una práctica recomendada de E-E-A-T: mostrar autoría y fecha de actualización visibles al lector, justo debajo del primer párrafo. Se estandariza como elemento requerido para artículos nuevos.

**Problema real detectado:** el texto está escrito de 5 formas distintas entre los 8 artículos que lo tienen (`Equipo Cuida a tu Perro Viejo`, `Equipo Cuida tu Perro Viejo`, `Equipo Cuida Tu Perro Viejo`, `Equipo Cuida a tu Perro Mayor`, `Equipo de Cuida tu perro viejo`), y "Actualizado" vs "Última actualización". El texto definitivo debe coincidir exactamente con el nombre que ya usa el JSON-LD real en `[slug].astro:76` (`'name': 'Equipo Cuida a tu Perro Viejo'`), para no introducir una sexta variante:

```mdx
**Autoría:** Equipo Cuida a tu Perro Viejo · **Actualizado:** {{fecha en español, ej. "20 de julio de 2026"}}
```

Va inmediatamente después del primer párrafo de introducción (antes de cualquier otro contenido).

### ❌ Evitar: TOC manual (`<details>` con lista de anclas)

**5 de 11** lo tienen, pero la frecuencia no lo valida: es deuda técnica confirmada contra el código fuente (`PostReader.astro` ya genera la tabla de contenidos automáticamente escaneando H2/H3 — ver [reglas_astro_mdx.md § 3](file:///c:/Users/grcx1/OneDrive/Documentos/Proyectos/CuidaTuPerroViejo/.agents/skills/redactar-articulo-blog/references/reglas_astro_mdx.md)). Repetirlo en artículos nuevos produce una tabla de contenidos duplicada. Que casi la mitad del corpus lo tenga solo confirma que es un patrón heredado de antes de la automatización, pendiente de curar — no una convención a mantener.

### ❌ Evitar: JSON-LD manual pegado en el cuerpo

Solo **1 de 11** (`cama-ortopedica...mdx:405+`) — un verdadero caso aislado. Genera un schema `Article`/`BlogPosting` potencialmente conflictivo con el que `[slug].astro` ya inyecta desde el frontmatter.

### ❌ Evitar: botón "Volver arriba"

**2 de 11**. No aporta nada que el layout no resuelva ya (scroll nativo, navegación del sitio); es ruido visual heredado.

### ✅ Ya definido como obligatorio: cuadro de Fuentes científicas

**4 de 11** lo tienen (el patrón exacto quedó definido y verificado como obligatorio para artículos nuevos en la sección de Fase 3 de `SKILL.md`, tras confirmarlo en vivo contra `prevencion-caidas-perro-mayor` y `cama-ortopedica...`).

### ⚠️ Usar con criterio, no copiar literal: densidad de `AlertBox`

El brief exige 3 tipos distribuidos (`info` en intro, `danger` en síntomas, `warning` en tratamiento) — eso sigue siendo el estándar. `disfuncion-cognitiva-canina.mdx` es un outlier real: **19 AlertBox**, casi todos genéricos (`info`/"Nota práctica" o `warning`/"Aviso importante") insertados cada 150-300 palabras. Es un patrón a **evitar**, no a imitar: cuando cada párrafo tiene su propia caja, la caja deja de señalar "esto es importante" y se vuelve ruido visual. Usa `AlertBox` para los momentos que de verdad lo ameritan (los 3 obligatorios del brief, y como mucho 1-2 adicionales genuinamente críticos), no como maquetación decorativa recurrente.

### ✅ Ya definido: FAQ

**5 de 11** lo tienen — refleja que la mayoría de estos artículos se escribieron antes del flujo brief → redacción actual. El brief ya lo exige como obligatorio (Sección 6) para artículos nuevos; eso no cambia con este análisis.

---

## Resumen para artículos nuevos (además de lo ya definido en `SKILL.md`)

Con este análisis, la estructura de apertura de un artículo nuevo queda así (actualiza lo que ya decía `SKILL.md` Fase 3, punto 1):

1. Párrafo 1 — gancho de la historia real.
2. **Byline estandarizado:** `**Autoría:** Equipo Cuida a tu Perro Viejo · **Actualizado:** {{fecha}}`.
3. Párrafo 2 en adelante — sin repetir la hero image (ver `reglas_astro_mdx.md § 2`), sin TOC manual (`§ 3`).
4. `AlertBox type="info"` de acompañamiento (el primero de los 3 obligatorios).

## Pendiente para más adelante (fuera de alcance de esta skill hoy)

Los 11 artículos existentes **no se tocan** en este análisis. Cuando se quiera curarlos contra esta estructura definitiva (quitar TOC manual, JSON-LD duplicado, botón "volver arriba"; estandarizar el texto del byline; añadir cuadro de Fuentes donde falte), eso es trabajo de una skill de curación separada — análoga al "Modo 2: Curador de HTML" del Gem antiguo, pero adaptada a Astro/MDX. No está construida todavía.
