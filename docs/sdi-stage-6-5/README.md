# SDI — Etapa 6.5: shadow de adopción en CuidaTuPerroViejo

## Estado

**Cerrada y aprobada tras la investigación 6.5.1.** Esta etapa fue evidencia
read-only: en el estado auditado entonces, CuidaTuPerroViejo no migraba a SDI,
no modificaba su `postbuild` legacy y no realizaba llamadas a IndexNow ni
Google. Ese hook se eliminó posteriormente durante la migración a Astro 7.

## Adopción posterior — 18-ago-2026

La etapa histórica de shadow permanece cerrada y no se reescribe. Después de
esa validación, el proyecto instaló `sdi-cli@0.1.0` desde npm y añadió el
workflow manual `.github/workflows/sdi-baseline.yml` para crear la primera
línea base real en GitHub Actions.

La configuración actual está en `sdi.config.mjs` y ya no importa el estado
legacy: el baseline nuevo se guarda en `.sdi/state.json`. El workflow construye
Astro con el binario directo, persiste `.sdi` mediante la caché de Actions y
conserva un artefacto de evidencia durante 30 días.

Esto todavía no es una migración live. `sdi:run` y los destinos legacy siguen
intactos; la línea base no envía notificaciones. El hook npm `postbuild` que
existía durante la investigación fue eliminado posteriormente y ya no forma
parte del flujo actual.

## Conclusión de la investigación 6.5.1

Las 19 diferencias de SHA-256 no proceden de SDI, state, comparador ni
normalización. Ocurren en las 8 rutas de pilar y los 11 posts generados por:

- `src/pages/[pilar].astro`
- `src/pages/[pilar]/[slug].astro`

Ambos generan el campo JSON-LD `dateModified` con
`new Date().toISOString()` durante el build. Por ello, dos builds del mismo
commit producen timestamps y HTML distintos en esas 19 páginas.

No se requieren cambios en SDI ni un ADR. Corregir la generación de
`dateModified` queda explícitamente fuera de la Etapa 6.5: será una mejora
independiente de CuidaTuPerroViejo.

## Artefacto aprobado

| Campo | Valor |
| --- | --- |
| Commit SDI | `3546d8d79d4fcc285b2ff662422deb6d13b5eb2d` |
| Versión | `0.1.0` |
| Tarball | `C:\Users\grcx1\OneDrive\Documentos\SDI\sdi-cli-0.1.0.tgz` |
| SHA-256 | `aac5aec39ce06f988e09f8751c881a989f0ca15f560c77da06c19529ef9088a1` |

## Ejecución

Desde la raíz del checkout limpio de Cuida:

```powershell
node scripts/sdi-shadow-compare.mjs
```

El harness construye Astro dos veces con su binario directo, sin ejecutar hooks
npm de build, e identifica inestabilidad del HTML compilado.
Instala exclusivamente el tarball aprobado dentro de un directorio temporal
con npm offline, invoca solo el binario público `sdi`, hace dos
`run --dry-run` y elimina ese directorio incluso ante fallo.

Compara el sitemap/HTML compilado contra `sdi-state.json`, valida que el
manifest coincide con el inventario, verifica los hashes de los tres artefactos
legacy antes/después y escribe la evidencia en
`shadow-comparison.json`. Cualquier diferencia se clasifica explícitamente;
una diferencia sin clasificación bloquea la etapa.

`sdi.config.mjs` declara `trailingSlash: "never"`, consistente con Astro.
No ejecutar `sdi run` live, `baseline`, deploy, IndexNow ni Google como parte
de esta etapa.
