# Auditoría independiente · Escritorio `/admin`, fase 1

- **Auditor:** Claude Code. No participó en el desarrollo y no corrige nada en este informe.
- **Desarrollo:** Codex, [PR #168](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/168), rama `feature/admin-escritorio`, commits `141ce93` y `609dbd0`.
- **Fecha:** 2026-11-11.
- **Veredicto:** **APTO con observaciones menores.** Nada bloquea la fusión. Quedan pendientes la prueba en un iPhone físico y la autorización del propietario.

## Contra el plan acordado

| Punto del encargo | Resultado |
|---|---|
| Rama propia, PR, sin merge | Cumple |
| Reutilizar el acceso de los otros paneles | Cumple. `requireAdmin` copia la misma autenticación básica y el mismo `ADMIN_LIMIT` de `asistente.astro`. |
| Datos reales de D1, sin inventar | Cumple. Las tres consultas coinciden con las migraciones `0001`, `0003` y `0004`. |
| «No disponible» por fuente | Cumple. Los errores se aíslan por tarjeta y no muestran detalles de SQL. |
| Rigor en los nombres | Cumple y mejora el encargo: dice «cuarentena» en vez de «pendientes», porque ese estado no existe, y «consultas» en vez de «personas». |
| Sin bots ni errores en la v1 | Cumple |
| Fase 2 solo investigada | Cumple. La tarjeta de audiencia no muestra cifras. |
| No tocar la configuración sin justificarlo | Cumple. `trailingSlash: 'never'` hace que `/admin` no entre en `/admin/*`, así que añadir esa ruta exacta en `wrangler.jsonc`, el middleware, el runtime y el sitemap es necesario. |
| Evidencia: build, tests y capturas en claro y oscuro | Cumple. Falta Safari en un dispositivo físico, y Codex lo declara. |

## Verificaciones propias

- Los nombres de columnas y los valores (`status = 'quarantine'`, `environment = 'produccion'`, `day`) existen en el esquema y en `src/lib/affiliate`.
- El enlace `?status=quarantine` funciona en `contact-messages.astro`.
- Las cabeceras `private, no-store` y `noindex` también se aplican a la respuesta 401.
- El tope de documentos baja de 98 a 97 para no pasar las 100 reglas de `run_worker_first`. Hoy hay unos 40 documentos, así que el margen sobra.

## Observaciones menores (no bloquean)

1. **Lógica de acceso repetida.** `src/lib/admin/access.ts` repite el bloque que siguen teniendo `asistente.astro`, `monetizacion.astro` y `contact-messages.astro`. Más adelante, conviene que esos paneles usen `requireAdmin` para que la seguridad viva en un solo sitio. Debe hacerse en un PR aparte.
2. **Días en UTC.** Para Costa Rica, el día cambia a las 18:00 hora local. El pie de página lo explica. Si confunde, valorar usar la hora local en la fase 2.
3. **Archivos de evidencia en `docs/admin/`.** `ci-local-results.json`, `preview-results.json` y `scripts/admin/verify-preview.py` sirven ahora, pero envejecen. Valorar si deben quedarse en el repo o solo en el PR.
4. **Diseño fuera del layout del sitio.** El escritorio tiene su propio CSS, como los demás paneles. Es coherente con ellos. Solo se anota por si más adelante se unifica el estilo de admin.
5. **Paréntesis de sobra** en `src/middleware.ts:51`. Es cosmético.

## Para la fase 2

- Antes de integrar, acordar con el propietario las métricas exactas y sus nombres: «visitas» y «páginas vistas» de Cloudflare no son personas.
- Usar un token de solo lectura guardado como secret, y nunca exponerlo al navegador.
- Guardar la respuesta en caché y mostrar «No disponible» si GraphQL falla, con el mismo patrón `Summary<T>`.
