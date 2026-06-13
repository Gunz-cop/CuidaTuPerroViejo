# Instrucciones de Despliegue - CuidaTuPerroViejo

Este proyecto cuenta con una canalización de integración y despliegue continuo (CI/CD) automatizada a través de GitHub y Cloudflare. 

## Proceso de Despliegue en Producción

Para subir cambios al ambiente de producción, **no** se debe desplegar directamente desde la máquina local usando Wrangler. En su lugar, el flujo de trabajo es el siguiente:

1. **Subir los cambios a GitHub:**
   Cualquier cambio confirmado en la rama principal (`main`) de GitHub iniciará de forma automática el proceso de construcción y despliegue.

2. **Compilación y Despliegue Automático:**
   Cloudflare Pages está conectado al repositorio de GitHub. Al detectar nuevos commits en la rama `main`:
   - Descarga la última versión del código.
   - Instala las dependencias y ejecuta la compilación (`npm run build`).
   - Publica los archivos compilados en el entorno de producción de forma automática.

---

## Comandos Git para Actualizar el Sitio

Para confirmar tus cambios locales y subirlos a GitHub (lo cual disparará el despliegue automático), ejecuta los siguientes comandos en tu terminal:

```bash
# 1. Agregar todos los archivos modificados
git add .

# 2. Confirmar los cambios con un mensaje descriptivo
git commit -m "Ajuste de build.format a 'file' para resolver problemas de indexación de trailing slash"

# 3. Subir los cambios a la rama principal en GitHub
git push origin main
```

Una vez ejecutado el `git push`, puedes monitorear el progreso del despliegue directamente desde el panel de control de **Cloudflare Pages**.
