# Relevo: fase 2 del escritorio administrativo

## Estado y autorización

- Repositorio: `Gunz-cop/CuidaTuPerroViejo`. Trabajar en la nube, sin depender del equipo local del propietario.
- Fase 1 aprobada y cerrada por el propietario el 2026-11-12, PR #168.
- Investigación y auditoría APTO del PR #169 fusionadas con autorización del propietario. Merge `946cbaf5e76ac5f323e3c6508acdc8245f2a6642`; despliegue Cloudflare correcto con el 100 % del tráfico. Portada pública 200 y `/admin` 401 con Basic Auth y `private, no-store`, comprobados antes de preparar esta rama.
- El propietario autorizó **empezar la fase 2 en `feature/admin-audiencia`** y desea continuar su implementación en otra sesión.
- Decisión de producto registrada por Claude en `TODO.md`: **alternativa A con referidos**. Audiencia RUM, sin el bloque técnico de bots HTTP ni cambios de mitigación.
- Codex implementa; Claude Code audita por separado; el propietario autoriza el merge. La autorización de merge de #169 **no autoriza fusionar la implementación de fase 2**.
- Esta rama empieza con documentación de relevo y TODO; aún no implementa llamadas de audiencia en el Worker ni configura secretos.

## Lectura inicial

Leer `AGENTS.md`, `TODO.md`, `docs/admin/investigacion-trafico-humano.md`, `docs/admin/auditoria-investigacion-fase-2.md`, `docs/admin/web-analytics-propuesta.md` y `docs/admin/escritorio.md`.

La migración Astro 4 → 7 está completada: consultar `docs/migracion-stack/README.md`, no asumir migración pendiente. Revisar `src/pages/admin/index.astro`, `src/lib/admin/access.ts`, `src/lib/admin/overview.ts`, el middleware y el routing público antes de implementar. Mantener los paneles secundarios.

## Producto aprobado

- «Páginas vistas» y «Visitas» RUM en 7/30 días con `bot: 0`; sin llamarlas personas o lectores únicos.
- Tendencia diaria, top 10 de páginas, top 10 de países y **referidos**, según la decisión del propietario.
- Días en `America/Costa_Rica`: límites locales convertidos a UTC, agrupación horaria y reagrupación en servidor.
- Nombres sugeridos por la auditoría: subtítulo «sin bots detectados · estimación»; muestreo explícito si `sampleInterval > 1`.
- Visitantes únicos: «No disponible en esta fuente».
- El escritorio debe facilitar ver actividad, contenidos consultados y procedencia sin navegar por múltiples páginas. No convertir popularidad en una recomendación editorial automática sin evidencia.
- Para referidos, comprobar `refererHost` y su semántica con consultas reales antes de implementar. Separar origen directo/sin referer de dominios externos; no inventar atribución ni personas.
- Definir y rotular con precisión las ventanas (día en curso o días cerrados) y cualquier comparación. Las ventanas de la investigación son históricas, no fechas para fijar en producción.

## Acceso, caché y errores

- La zona tiene plan web Free Website; el propietario confirma Workers Paid. Son productos distintos.
- El acceso del conector usado para investigar no equivale a un secreto utilizable por el Worker. No asumir que el token ya está configurado.
- No crear tokens ni solicitar valores secretos por chat. Según la auditoría, el propietario crea el token dedicado `Account Analytics: Read` y lo configura como secret del Worker; documentar nombre y pasos concretos con el código listo para revisar.
- IDs de cuenta/sitio solo en configuración del servidor; obtenerlos mediante el acceso conectado existente cuando corresponda. No copiar valores sensibles al documento ni al cliente.
- Autenticar antes de consultar o entregar datos, reutilizando `requireAdmin`. No añadir API pública de estadísticas ni exponer secretos.
- Reutilizar KV existente, prefijo propio, TTL 15 minutos. Último dato fechado hasta 24 h si la API falla; después «No disponible». No convertir fallos en ceros.
- Sin token/bindings, mostrar estado explícito y mantener el resto del escritorio operativo. Eso permite preparar y probar el PR antes de la configuración final por el propietario.

## Evidencia y límites que hay que conservar

- RUM tiene `count`, `sum.visits`, `dimensions.bot`, `datetimeHour`, `requestPath`, `countryName` y `refererHost`; las consultas reproducibles están en la investigación.
- `bot: 0` excluye bots clasificados, no garantiza humanidad. No está publicada la señal exacta del bit en las fuentes consultadas.
- El propietario reportó valores visibles iguales en el panel con y sin Exclude Bots en una ventana de dos semanas. Esto cierra su contraste práctico reportado; no prueba que los algoritmos sean idénticos ni que la igualdad se deba al muestreo.
- La auditoría destaca retención RUM sin muestrear durante 7 días y agregación posterior. Verificar la FAQ actual y `sampleInterval`; la tendencia de 30 días debe tratarse como estimación. No rellenar horas ausentes de una muestra como prueba de ausencia real de tráfico.
- No mostrar cifras absolutas de audiencia en documentos, pruebas, capturas publicadas ni PR: usar fixtures claramente identificadas o proporciones. En el panel privado sí se mostrarán los datos reales autorizados.
- Bot Score fue denegado en esta zona. Las categorías HTTP verificadas pertenecen a otro universo: no restarlas de RUM ni incluirlas en esta fase.

## Validación y entrega de implementación

- Priorizar consultas agregadas acotadas y separar consulta, transformación y presentación. Sin dependencias ni migraciones D1 nuevas salvo necesidad demostrada y autorización aplicable.
- No modificar package.json, astro.config.mjs, wrangler.jsonc, tsconfig.json ni estilos globales sin leer restricciones y justificar el cambio.
- Probar ventanas de Costa Rica, filtro bot, ranking/referidos, muestreo, caché, dato previo fechado, ausencia de token/bindings, errores HTTP/GraphQL y protección administrativa. Fixtures, no cifras privadas.
- Ejecutar `npx astro build`, pruebas relevantes y checks del repositorio; comprobar móvil y escritorio, claro/oscuro, teclado y ausencia de overflow. No inventar verificaciones.
- Actualizar TODO, abrir PR desde `feature/admin-audiencia`, entregar evidencia a Claude y esperar autorización del propietario antes del merge.
