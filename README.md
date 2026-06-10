# CuidaTuPerroViejo

Sitio estático en Astro para guías, recursos y herramientas interactivas sobre el cuidado de perros senior.

## Comandos

```bash
npm install
npm run dev      # Servidor de desarrollo local
npm run build    # Compila el sitio (y ejecuta automáticamente la indexación)
npm run preview  # Previsualiza la build de forma local
npm run sdi:run  # Ejecuta el script de indexación (Search Discovery) manualmente
```

## Indexación y Descubrimiento (SDI)

El script de indexación local (`lib/discovery/run.ts`) está automatizado para ejecutarse en el ciclo de vida de Node.js después de cada compilación mediante el script **`postbuild`** de `package.json`.

- **Indexación automática**: Cada vez que se compila el proyecto (`npm run build` o `npm run deploy`), se ejecuta `npx tsx lib/discovery/run.ts`.
- **Destinos**: Envía automáticamente las URLs nuevas o modificadas a **Google Indexing API** y a **IndexNow**.
- **Configuración**: Lee las claves API y de servicio directamente desde el archivo `.env` local (`INDEXNOW_KEY`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`).
- **Logs de envío**: Puedes monitorear los resultados y envíos consultando el archivo de estado generado en `lib/discovery/state/sdi-submissions.json`.
