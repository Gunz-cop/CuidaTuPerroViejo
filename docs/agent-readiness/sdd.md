# Método SDD y contrato de traspaso

SDD se usa aquí como **desarrollo dirigido por especificaciones**. Cada fase se concreta antes de implementarse. Este documento define el método; no reemplaza las specs de fase que todavía no existen.

## Estados

`planificada → especificada → lista → implementando → en verificación → aceptada → publicada`.

El estado vive en el encabezado de la spec de fase, con commit/evidencia. El índice enlaza esas specs; no replica sus estados en varias tablas. Un fallo de aceptación devuelve la fase al ejecutor con un informe. Una contradicción o contrato incompleto vuelve al coordinador para corregir la spec.

## Contenido obligatorio de una spec

1. **Problema y resultado observable:** recorrido antes/después y control que mejora.
2. **Base:** SHA exacto, rama destino, decisiones arquitectónicas aplicables y prerequisites verificadas.
3. **Alcance:** comportamiento que se entrega y fronteras; archivos que posee la sesión, archivos compartidos y propietario de integración.
4. **Contratos:** rutas, métodos, inputs/outputs, schemas, errores, headers, auth, versión y límites. Ejemplos válidos e inválidos completos.
5. **Invariantes:** URLs, fuentes, fechas, reglas editoriales, privacidad, caché y compatibilidad que deben mantenerse.
6. **Implementación esperada:** decisiones ya resueltas y alternativas permitidas; ninguna API o dependencia clave queda «a criterio del ejecutor» sin acotar.
7. **Aceptación:** checklist de resultados y cómo obtener evidencia; marcar checks locales, de preview y de producción. El pass del escáner no sustituye una llamada funcional.
8. **Validación apropiada:** pruebas contractuales/riesgos concretos, comandos de CI, pruebas de integración y limitaciones del entorno.
9. **Entrega y reversión:** PR/commits, orden de integración, promoción y rollback ejecutable.
10. **Bloqueos:** qué impide empezar/terminar y a quién corresponde resolverlo.

## Reglas para el ejecutor

Leer `AGENTS.md`, estos documentos, su spec y las instrucciones de las rutas afectadas. Trabajar en rama propia con la base fijada. No extender alcance a Assistant V2, migración de stack, redacción de artículos, SDI/indexación o refactor global.

Cuando sea necesario modificar un archivo fuera de ownership o tomar una decisión no definida, presentar el motivo y propuesta al coordinador. No compensar el hueco con cambios de arquitectura propios. Los cambios de shared files se integran secuencialmente.

No ejecutar `npm run sdi:run` ni mutar APIs con efectos para verificar lectura pública. Build explícito mediante `npx --no-install astro build` tras instalación del lockfile. Las verificaciones de fase que afecten al runtime deben probar en workerd y en una URL de preview; `astro dev` o inspección de fuente no bastan para afirmar cómo sirve assets Cloudflare.

## Reglas para el verificador

Usar el commit entregado y la misma base fijada por la spec. Verificar criterios y propiedad del diff. Producir resultados separados: verificado, diferencia aceptable con motivo, no verificado y fallo. No corregir el producto durante la verificación; devolver fallos al ejecutor y problemas de contrato al coordinador.

Una prueba con nombre de User-Agent no demuestra identidad ni acceso desde la infraestructura de un proveedor. Una card JSON no demuestra un servidor MCP. Una puntuación de home no demuestra integridad de todos los artículos. Estos límites deben aparecer en el informe cuando corresponda.

## Plantilla de lanzamiento

```text
Rol: implementador de la fase F<N> del programa agent-readiness.
Repo: Gunz-cop/CuidaTuPerroViejo.
Lee AGENTS.md y docs/agent-readiness/README.md.
Spec: docs/agent-readiness/fases/<archivo>.md.
Base exacta: <SHA>; rama destino: <rama>; rama de trabajo: <rama propia>.
Comprueba que la spec está lista y sus dependencias aceptadas.
Implementa solo su alcance y respeta ownership.
Entrega un PR con criterios/evidencia, commit y rollback.
Reporta huecos de spec al coordinador; no inventes contratos.
La promoción a main se realiza por separado porque despliega producción.
```

La plantilla es intencionalmente incompleta hasta que exista la spec de fase. No lanzar otra sesión con solo el título de una fase o una lista de tecnologías.

## Primera spec pendiente

F0 convertirá la línea base actual en un proceso reproducible y encargará las pruebas exploratorias mínimas de routing/build/caché. El coordinador revisará sus resultados y cerrará contratos de F1/F2. Se concretan las specs conforme se elimina incertidumbre, sin escribir una spec detallada de OAuth/A2A antes de saber si esas funciones se necesitan.
