# Diagnóstico

## Medición del sitio publicado

Se llamó a `POST https://isitagentready.com/api/scan` con la URL `https://cuidatuperroviejo.com`. Se guardaron tres respuestas originales:

| Solicitud | Fecha UTC del escáner | Pass / fail puntuables | Puntuación calculada | Nivel |
|---|---|---:|---:|---:|
| Content Site, 7 IDs explícitos | 2026-10-01 00:59:38 | 3 / 4 | 43/100 | 1/5 |
| All Checks, 20 IDs de la interfaz explícitos | 2026-10-01 01:01:26 | 3 / 12 | 20/100 | 1/5 |
| API sin `enabledChecks` | 2026-10-01 00:58:00 | 3 / 13 | 19/100 | 1/5 |

La API devuelve el nivel; la interfaz calcula la puntuación. La fórmula observada en su JavaScript es `Math.round(pass / (pass + fail) * 100)`, excluyendo neutrales y comercio si `isCommerce=false`. La puntuación de estas tablas se calculó sobre las respuestas guardadas usando esa fórmula. No es una captura visual de la interfaz.

**Hay una diferencia real entre el POST sin opciones y la interfaz:** esta desmarca A2A y AP2 por defecto. El POST sin opciones evalúa A2A y añade un fallo. Comparar un 19 con un futuro 20 usando otra selección no demuestra mejora. Se congela la selección explícita de la interfaz para el objetivo general.

## Matriz de controles

| Control | Resultado en All Checks de la interfaz | Tratamiento propuesto |
|---|---|---|
| robotsTxt | pass | Mantener; F1 explicita política |
| sitemap | pass | Mantener y auditar URLs de destino |
| linkHeaders | fail | F1, enlaces HTTP a recursos existentes |
| dnsAid | fail | F5, registros reales y resolución pública |
| markdownNegotiation | fail | F2, representación Markdown de la misma URL |
| robotsTxtAiRules | pass | Mantener acceso a búsqueda y lectura |
| contentSignals | fail | F1, preferencia del propietario |
| webBotAuth | neutral | Informativo; no aporta puntos actualmente |
| apiCatalog | fail | F3, catálogo y API pública documentada |
| oauthDiscovery | fail | F6, solo con autorización real |
| oauthProtectedResource | fail | F6, solo para recurso protegido real |
| authMd | fail | F6, solo con flujo de registro/acceso real |
| mcpServerCard | fail | F4, servidor funcional y card verificable |
| agentSkills | fail | F3, skills públicas específicas del sitio |
| webMcp | fail | F4, herramientas registradas al cargar la home |
| ard | fail | F3/F4, manifest de capacidades publicadas |
| a2aAgentCard | neutral, excluido | F6 investiga necesidad para nivel 5 |
| x402, mpp, ucp, acp | neutral, sin comercio | Fuera del alcance actual |
| ap2 | neutral, sin comercio y excluido | Fuera del alcance actual |

No se publicarán cards, metadata de auth o manifests que apunten a endpoints inexistentes. La presencia de un fichero puede aprobar un control estructural sin probar que la capacidad funciona; la aceptación interna exige ambas cosas.

## Inspección del repositorio

Base inspeccionada: `cdb0adece5d629f6b2473be7ea6e30c0b372ef1c`, obtenida de la rama por defecto `main`.

- `package.json`: Astro `^7.2.10`, adaptador Cloudflare `^14.2.6`, MDX `^7.0.8`; Node `>=22.12`.
- `astro.config.mjs`: `output: 'static'`, `build.format: 'file'`, `trailingSlash: 'never'`, sitio `https://cuidatuperroviejo.com`, sitemap generado.
- `wrangler.jsonc`: entrypoint del adaptador; `assets.run_worker_first` solo incluye `/api/*` y `/admin/*`.
- `src/middleware.ts`: caché de páginas GET con Cache API; una negociación futura necesita separación explícita por representación. El middleware no intercepta necesariamente los assets que se sirven primero.
- `public/_headers`: cabeceras de seguridad y caché de imágenes/assets, sin Link de descubrimiento.
- `src/content.config.ts`: 16 artículos MDX y 7 pilares MDX en el árbol actual. El inventario final debe partir de rutas publicadas, no de este conteo de ficheros.
- `src/pages/[pilar]/[slug].astro`: HTML estático, BlogPosting, fuentes editoriales, autoría de organización, fechas de frontmatter y breadcrumbs.
- MDX contiene componentes como AlertBox y FAQ, incluidas preguntas/respuestas pasadas como props. Quitar JSX con regex puede perder advertencias y respuestas completas.
- `/api/assistant-catalog.json`: catálogo público precompilado para el asistente actual. Es material reutilizable para routing; sus extractos de 4.000 caracteres no sustituyen una lectura íntegra y citable de una guía.
- `/api/ask`: generación con Workers AI, rate limit y fallback. API con coste y riesgos de respuestas; no es equivalente a una API de lectura determinista.
- Dos herramientas interactivas: calidad de vida y selector de movilidad. Sus reglas están dentro de las páginas; exponerlas a agentes requerirá compartir la lógica y verificar paridad.
- `.github/workflows/ci.yml`: instalación, tipos, tests, build, coherencia de specs, tipos Worker y empaquetado. No se ejecutó esta cadena en esta sesión de documentación.

## Comprobación HTTP directa

El 2026-10-01 se solicitaron la home, el artículo sobre Cushing, la calculadora, robots, sitemap y catálogo. Todos respondieron 200. `/llms.txt` respondió 404. La home y el artículo con `Accept: text/markdown` respondieron 200 **con `Content-Type: text/html`**.

Las peticiones de la home con `User-Agent: ChatGPT-User` y `Claude-User` respondieron 200. Esto solo verifica esos dos nombres desde este origen de red y ese momento; no prueba acceso desde redes reales de proveedores, reglas WAF globales ni identidad de los bots.

## Límites y documentación existente

No se accedió al dashboard de Cloudflare ni a credenciales de la zona. No se conocen el plan contratado, el estado de Markdown for Agents, reglas WAF, DNSSEC o los cambios de configuración no versionados. No se ejecutaron mutaciones de producto, formularios, llamadas a `/api/ask` ni despliegues.

El README de migración sigue mostrando fases pendientes, pero `docs/migracion-stack/postmortem-astro-4-a-7.md` documenta promoción a producción y el código ya utiliza Astro 7. Este programa parte del estado actual y respeta las decisiones de URL, autoría y fechas; no reabre la migración.

Assistant V2 está documentado como Foundation completada y posee sus propios contratos y territorios. Este programa no activa V2 ni modifica sus umbrales, modelo o corpus editorial. Cualquier integración futura deberá coordinarse con ese programa.

Se encontró una réplica externa del evaluador (`safa0/isitagentready`), cuyo algoritmo inferido difiere de la guía actual del servicio. **No se usa como autoridad.** La línea base viene del evaluador publicado y las referencias técnicas de documentación primaria.
