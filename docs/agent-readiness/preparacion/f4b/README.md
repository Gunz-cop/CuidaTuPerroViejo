# Preparación F4B — MCP remoto

**Estado: borrador preliminar, no ratificado y no ejecutable. Fecha: 2026-10-12.** Esta entrega prepara arquitectura mientras otra sesión implementa F4A. No autoriza programación, issues ejecutables, publicación ni promoción. Se mantiene **F3 → F4A aceptada → contratos F4B incorporados → auditoría formal → congelado/ratificación → implementación F4B**.

## Paquete

1. [Referencias primarias](referencias.md): versiones observadas, fecha, autoridad, divergencias y originales consultados.
2. [Diseño preliminar](diseno-preliminar.md): opción recomendada, alternativas, protocolo, reutilización, seguridad, límites, costes y mantenimiento.
3. [Dependencias y huecos](dependencias-f4a.md): admisión real de F4A y partes detenidas.
4. [Borrador SDD](sdd-borrador.md): criterios verificables, validación futura, evidencia y reversión.
5. [Ownership e issues propuestos](ownership-e-issues.md): integración secuencial; no encargos lanzables.
6. [Checklist de congelado](checklist-congelado.md): condiciones para convertir este borrador en contrato ejecutable después de F4A.

## Base y autoridad

| Identidad observada | Valor |
|---|---|
| Repositorio | `Gunz-cop/CuidaTuPerroViejo` |
| Sitio | `https://cuidatuperroviejo.com` |
| Producto F3 publicado/aceptado | `aad2a6624c24d7425c5ad5329b82c77a8a86b619` |
| Cierre documental F3 y base de este worktree | `eff4ce13a1f4b996f3d9b523799012bc668da318` |
| Tree documental observado | `d46f6baf5e4a6eb0bcbc001882488e5944c52513` |
| Rama local propia | `preparacion/f4b-mcp-remoto` |
| Worktree propio | `/workspace/ctpv-f4b-preparacion` |
| Resultado F3 aceptado | 86 contenido / 60 general, nivel 4 general |
| Base de implementación F4B | **PENDIENTE de cierre y contratos reales F4A** |

Leídos [AGENTS.md](../../../../AGENTS.md), [README del programa](../../README.md), [plan](../../plan.md), [arquitectura](../../arquitectura.md), [método SDD](../../sdd.md), [contratos F3](../../fases/f3-contratos.md), [SDD F3](../../fases/f3-api-y-descubrimiento.md), [traspaso F3](../../fases/f3-traspaso.md), anexos F3 y [ratificación de publicación](../../evidencia/f3/publicacion/cierre/cierre-arquitectonico.md). Inspeccionados en lectura el entrypoint, configuración, registro de capacidades y runtime F3.

La ratificación F3 y el estado actualizado del plan acreditan F3 aceptada. Los párrafos históricos de arquitectura/traspaso que aún dicen «propuesta» no revocan ese cierre ni ratifican F4. No se modificaron para preparar esta entrega.

En la copia obtenida no existe SDD F4A ni rama remota F4A visible; no se accedió al worktree de la otra sesión. Esa observación describe esta captura, **no** ausencia global ni estado de su trabajo. Los contratos y cierre F4A permanecen pendientes. No se hará seguimiento continuo.

## Qué queda preparado

Recomendación preliminar: SDK oficial TypeScript v2, handler web estándar dentro del Worker existente, Streamable HTTP sin sesiones persistentes, soporte moderno `2026-07-28` y compatibilidad objetivo `2025-11-25`. El flujo moderno usa metadatos por petición y `server/discover`; el segundo permite verificar `initialize → notifications/initialized → tools/list → tools/call`. Versiones publicadas consultadas: server/client `2.3.1`, Inspector `2.10.1`. Esto es investigación, no lockfile ni conformidad probada en workerd.

Están definidos los riesgos y las pruebas futuras de paridad, lectura íntegra, errores, límites del envelope, abuso, aislamiento, descubrimiento, coste y rollback. Los nombres MCP, schemas de cálculo, funciones compartidas, rutas finales, budgets definitivos y bases futuras **no se han inventado**.

## Qué permanece detenido

- **Dependiente de F4A:** contrato ejecutable de las herramientas, paridad de cálculos, elección final del punto de reutilización, ownership compartido y base de lanzamiento.
- **Hueco esencial de fuentes Server Card:** SEP-2127 aparece Final, pero el repositorio al que remite declara Experimental y descubrimiento draft. Se conserva evidencia; no se congela schema/ruta/descriptor de producto ni se declara extensión ratificada. Véase G02 en [dependencias](dependencias-f4a.md).
- **Validación pendiente:** cancelación legacy sin correlación de sesiones, compatibilidad real del SDK con esta configuración Workers, presupuesto/plataforma y cliente/evaluador final.

La revisión propia sólo comprueba integridad documental, enlaces locales y ownership. No es auditoría formal ni PASS F4B. No se ejecutaron builds, pruebas del producto, escáneres, instalaciones, deploys, pushes, PRs ni mutaciones externas. La clonación creó una copia de trabajo; los cambios versionables de autoría quedan exclusivamente bajo esta carpeta.
