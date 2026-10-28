# Instrucciones de Despliegue - CuidaTuPerroViejo

Este proyecto cuenta con una canalización de integración y despliegue continuo (CI/CD) automatizada a través de GitHub y Cloudflare. 

## Proceso de Despliegue en Producción

Para subir cambios al ambiente de producción, **no** se debe desplegar directamente desde la máquina local usando Wrangler. En su lugar, el flujo de trabajo es el siguiente:

1. **Subir los cambios a GitHub en una rama y abrir un PR:**
   Los cambios no se suben directamente a `main`. Van en una rama propia, con un PR contra `main` que fusiona el propietario tras la auditoría que exige [AGENTS.md](AGENTS.md#cambios-en-main). Al fusionarse en `main` se inicia de forma automática el proceso de construcción y despliegue.

2. **Compilación y Despliegue Automático:**
   Cloudflare Workers Builds está conectado al repositorio de GitHub. Al detectar nuevos commits en la rama `main`:
   - Descarga la última versión del código.
   - Instala las dependencias y ejecuta la compilación (`npm run build`).
   - Publica los archivos compilados en el entorno de producción de forma automática.

---

## Comandos Git para Actualizar el Sitio

Para confirmar tus cambios locales y subirlos a GitHub en una rama propia, ejecuta los siguientes comandos en tu terminal:

```bash
# 1. Crear una rama para el cambio
git switch -c <rama>

# 2. Agregar los archivos modificados
git add <archivos>

# 3. Confirmar los cambios con un mensaje descriptivo
git commit -m "Descripción del cambio"

# 4. Subir la rama a GitHub
git push -u origin <rama>
```

Después, abre un PR contra `main`. Lo fusiona el propietario tras la auditoría que exige [AGENTS.md](AGENTS.md#cambios-en-main). Una vez fusionado, puedes monitorear el progreso del despliegue directamente desde el panel de control de **Cloudflare Workers Builds**.
