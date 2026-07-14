# SDI — Etapa 6.5: shadow de adopción en CuidaTuPerroViejo

## Estado

Esta etapa es evidencia read-only. CuidaTuPerroViejo no migra a SDI, no cambia
su postbuild legacy y no realiza llamadas a IndexNow ni Google.

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

El harness construye Astro dos veces con su binario directo, por lo que no ejecuta el
`postbuild` legacy, y distingue cambios reales de inestabilidad del HTML compilado. Instala exclusivamente el tarball aprobado dentro de un
directorio temporal con npm offline, invoca solo el binario público `sdi`, hace
dos `run --dry-run` y elimina ese directorio incluso ante fallo.

Compara el sitemap/HTML compilado contra `sdi-state.json`, valida que el
manifest coincide con el inventario, verifica los hashes de los tres artefactos
legacy antes/después y escribe la evidencia en
`shadow-comparison.json`. Cualquier diferencia se clasifica explícitamente;
una diferencia sin clasificación bloquea la etapa.

`sdi.config.mjs` declara `trailingSlash: "never"`, consistente con Astro.
No ejecutar `sdi run` live, `baseline`, deploy, IndexNow ni Google como parte
de esta etapa.
