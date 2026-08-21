# Revisión de la implementación de la Fase 0

**Revisor:** sesión de estrategia (Claude) · **Revisado:** informe de la sesión ejecutora sobre la Fase 0 de `estudio-viabilidad-multilenguaje-2026-08-v2.md` · Agosto 2026

**Alcance de esta revisión:** los cambios del ejecutor no estaban commiteados al revisarse, y esta sesión no tiene acceso de red al dominio en producción. La revisión se basa en el informe del ejecutor, el estado commiteado del repo (el "antes") y razonamiento. Todo lo no verificable desde aquí queda marcado como **[verificar]** para el ejecutor.

---

## Veredicto

**Bien ejecutado en lo que aborda — se aprueba commitear tal cual está. Pero falta el punto nº 1 de la Fase 0 (la duplicación `.html`) y hay un hueco en el JSON-LD.** Ambos caben como segundo commit en la misma rama.

---

## Aprobado sin cambios

| Elemento | Comentario |
| :--- | :--- |
| `dateModified` opcional con fallback a `datePublished` | Exactamente el diseño correcto: sin dato, se declara publicación, no se inventa actualización. |
| Escalar las 3 fechas contradictorias en vez de decidir | Comportamiento correcto del ejecutor. Criterio para desbloquear (abajo). |
| Retirada de citas no verificables y "elaborada por veterinarios" | Correcto. Ver [verificar] nº 3. |
| `ArticleByline.astro` + eliminación de las 18 líneas manuales | Correcto: una fuente de verdad para la autoría. El bug de zona horaria (local vs UTC) es un buen hallazgo colateral. |
| Página de política editorial honesta ("no somos veterinarios en ejercicio") | Correcto y valiente: la honestidad es la única autoridad sostenible aquí. |
| Redirección `legacyUrl` que faltaba + `scripts/audit-seo.mjs` | El script repetible es más de lo pedido y es justo la herramienta de esta fase. |
| `/gracias` noindex y fuera del sitemap | Correcto. Ver [verificar] nº 4. |
| Ajustes de Cloudflare identificados como fuera del repo | Correcto. Matices abajo. |

**Criterio para las 3 fechas contradictorias** (`como-dar-medicacion-perro`, `disfuncion-cognitiva-canina`, `ulceras-presion-perros`): una "revisión" anterior a la publicación solo puede ser plantilla heredada, no un hecho. Eliminar la línea de revisión del cuerpo y **omitir** `dateModified` (fallback a publicación) hasta que exista una revisión real con fecha real. No hay que adivinar cuál fecha es "la buena": ninguna lo es.

**Matiz sobre los 307:** el redirect de barra final e `/index.html` con 307/308 es comportamiento integrado de Cloudflare Pages y no es configurable; además Google trata los 30x como señales de canonicalización equivalentes desde hace años. **No perseguir esto.** El "Always Use HTTPS" sí es acción real del panel y debe activarse.

---

## Hueco crítico: la duplicación `.html` no aparece en el informe

Era el punto nº 1 de la Fase 0 (v2, §1) y el informe no dice qué pasa hoy con `/pagina.html`. El diagnóstico de la v2 sigue en pie sobre el estado commiteado:

- `astro.config.mjs` compila con `build.format: 'file'` → cada página existe físicamente como `.html`.
- El canonical de `src/layouts/BaseLayout.astro:22-23` normaliza la barra final pero **no elimina `.html`** → `/pagina.html` se sirve con canonical auto-referente a `.html`, y `/pagina` con canonical limpio. Dos canonicals para el mismo contenido, y GSC muestra impresiones recientes en ambas variantes (la calculadora: 197 + 63 clics).

**Instrucciones:**

1. **[verificar]** `curl -sI https://cuidatuperroviejo.com/cuidados-paliativos-perros.html` — si responde `200` (esperado), la duplicación está viva. Si Cloudflare ya la redirige (301/308 a la limpia), documentarlo en el audit y saltar al paso 4.
2. Normalizar también `.html` en el canonical de `BaseLayout.astro:22`: además de `replace(/\/$/, '')`, aplicar `replace(/\.html$/, '')`. Esto corrige de una vez canonical y `og:url` (usan la misma variable).
3. Añadir a `public/_redirects` reglas 301 de `.html` → limpia con placeholders por nivel de ruta (`/:a.html /:a 301` y `/:a/:b.html /:a/:b 301`), **colocadas después** de las reglas legacy existentes (`/p/*.html`, `/2025/*`, `/2026/*`) y comprobando que no las capturan antes de tiempo — las reglas de `_redirects` se evalúan en orden y las legacy deben ganar.
4. Añadir el caso al `audit:seo`: para cada URL canónica, la variante `.html` debe devolver 301 (o el canonical correcto), nunca 200 con canonical propio.

---

## Hueco 2: el JSON-LD sigue declarando la autoridad que el texto acaba de retirar

En el estado commiteado, `src/pages/[pilar]/[slug].astro` declara:

```json
"author": { "@type": "Person", "name": "Equipo Cuida a tu Perro Viejo",
            "jobTitle": "Especialistas en bienestar y cuidado canino" }
```

Dos problemas: un "equipo" no es `Person`, y ese `jobTitle` es exactamente la afirmación de autoridad no verificable que la Fase 0 acaba de quitar del texto visible. Sería incoherente sanear el cuerpo y dejar el claim en el dato estructurado que Google lee primero.

**Instrucciones:** cambiar a `"author": { "@type": "Organization", "name": "Cuida tu Perro Viejo", "url": <siteURL> }` (o alinear con lo que declare el nuevo `ArticleByline`), sin `jobTitle`, y enlazar la política editorial (p. ej. `publisher.publishingPrinciples: <siteURL>/politica-editorial`). Revisar el mismo bloque en `[pilar].astro` y en la home si declaran autor.

---

## [verificar] — pendientes de comprobación del ejecutor

1. `curl` del hueco crítico (arriba).
2. Que el sitemap solo emite URLs limpias (sin `.html`).
3. Que al retirar las dos citas el texto circundante quedó coherente — idealmente sustituidas por una afirmación con fuente institucional (AAHA/WSAVA/estudio), no solo borradas dejando un hueco argumental.
4. Que `/gracias` está excluida del sitemap además del `noindex` (mecanismo `NON_PUBLIC_SITEMAP_PREFIXES` de `astro.config.mjs` o equivalente).
5. Tras el deploy: re-ejecutar `audit:seo` contra producción y reenviar el sitemap en Search Console.

---

## Cuadro de mando (pregunta abierta del ejecutor)

**Recomendación: Looker Studio con el conector nativo de Search Console.** Separa tipo de búsqueda (Web / Imagen / Vídeo) de serie, se actualiza solo, y no mete ni una línea de código ni un export periódico en el repo. A este tamaño, la medición no debe convertirse en un proyecto: una fuente de datos, un dashboard, cero mantenimiento. Los exports manuales de GSC quedan para análisis puntuales como los de esta serie de informes.

---

## Proceso

- Commitear ya lo hecho (primer commit), y los huecos 1–2 como segundo commit en la misma rama: diffs legibles, revisión fácil.
- Los dos ajustes del panel de Cloudflare (HTTPS forzado; el 307 se ignora) no bloquean nada.
- Con esto, la Fase 0 queda completa **incluyendo su pieza más importante**, y desbloquea tanto la Fase 1 (pilares) como la solicitud de AdSense del plan de monetización.

---

## Cierre de revisión (segunda ronda)

El ejecutor respondió con verificaciones contra producción y contra el parser real de Cloudflare — el estándar correcto. Estado final:

| Punto | Resolución |
| :--- | :--- |
| Duplicación `.html` | **El revisor se corrige.** No hay duplicación viva: Workers Assets (`wrangler.jsonc` sin `html_handling` explícito → default `auto-trailing-slash`) emite 307 de `.html` a la URL limpia, verificado en 4 variantes. Las impresiones dobles de GSC son indexación heredada que decaerá — vigilar en GSC, no actuar. La normalización del canonical se aplicó igualmente, y fue la decisión correcta: el canonical no debe depender de que el borde redirija. |
| Reglas `_redirects` para `.html` (paso 3 de la revisión) | **Instrucción del revisor no implementable, retirada.** Los placeholders de `_redirects` solo casan segmentos completos; el ejecutor lo probó contra el parser real (23/25 y 23/24 reglas aceptadas) en vez de obedecer. Comportamiento correcto: la evidencia gana a la instrucción. |
| 307 en `audit:seo` | Rebajados a nota informativa — coherente con esta revisión ("no perseguir"). Aprobado: el script vuelve a servir como gate. |
| JSON-LD | Corregido a `Organization` + `publishingPrinciples`, y el ejecutor encontró el mismo patrón (`Person` + `jobTitle`) en `acerca-de.astro`, fuera del alcance señalado. Aprobado. |
| Citas retiradas | Despersonalizadas pero **sin fuente institucional que las sustituya**. Deuda reconocida y registrada: **tarea de Fase 1** — respaldar los dos pasajes del pilar de salud mental con fuente (AAHA/WSAVA/estudio). |
| `/gracias`, sitemap sin `.html` | Verificados en build. Aprobado. |

**Nota de proceso:** los dos commits viven en `codex/assistant-v2-editorial`, cuya historia es el refactor del asistente IA. Mezclar ahí la Fase 0 hará ilegible cualquier PR. Recomendación no bloqueante: moverlos a una rama propia (cherry-pick sobre `main`) antes de pushear.

### Veredicto final: Fase 0 APROBADA

Pendientes fuera del repo (panel/usuario): activar *Always Use HTTPS* en Cloudflare · desplegar · `npm run audit:seo` post-deploy · reenviar sitemap en GSC · montar el Looker Studio con el conector nativo de GSC.
