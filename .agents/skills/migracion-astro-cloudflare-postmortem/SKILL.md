---
name: migracion-astro-cloudflare-postmortem
description: Reconstruye y verifica, con evidencia de git y gh (no de memoria ni de lo que diga una spec), qué pasó realmente en una migración de fases de este repo — cronología, topología de merges, paralelismo real entre ramas, y qué está en producción de verdad. Usa esta skill cuando el usuario pida un postmortem, una auditoría posterior a una migración de stack, o "qué es lo que hay realmente en main" tras varias fases con ramas de integración; o cuando el estado observado (un worktree, un checkout local) contradiga lo que dice una spec o AGENTS.md. NO es para ejecutar una fase de migración (usa `upgrade-astro-cloudflare` para eso) ni para redactar contenido de blog.
---

# Postmortem de una migración por fases en este repo

Esta skill es específica de `CuidaTuPerroViejo` y de su patrón de migración
con specs en `docs/migracion-stack/` y rama de integración. El **método** de
qué rompe en cada salto de Astro vive en la skill compartida
`upgrade-astro-cloudflare` (`~/.claude/skills/`); esta skill no lo duplica.

## Cuándo usarla

- El usuario pide un postmortem, un informe retrospectivo, o "qué pasó
  realmente" en una migración con varias fases y ramas.
- Un worktree o checkout local muestra un `HEAD` de `main` que no coincide con
  lo que dice la documentación o con lo que otra sesión reportó.
- Hace falta escribir contenido derivado (LinkedIn, microblogging, resumen
  ejecutivo) que cite commits y PRs reales, no un resumen de memoria.

## Regla de oro

**Nunca reportes el estado de una rama sin `git fetch` primero.** Un worktree
puede estar fusionado desde hace semanas; su copia local de `main` no se
actualiza sola. Un "worktree desactualizado" y una "contradicción real en el
proceso" se ven idénticos hasta que se corre `git fetch` y se compara contra
`origin/<rama>`.

## Orden de lectura de fuentes primarias

En este orden, no salteando pasos:

1. `AGENTS.md` (raíz) — reglas operativas vigentes, incluida la de qué rama
   despliega a producción.
2. `docs/migracion-stack/README.md` — spec de producto: fases, orden,
   dependencias, decisiones cerradas con motivo. **Manda sobre las specs de
   fase individuales.**
3. `docs/migracion-stack/fase-*.md` (specs) y `fase-*-evidencia.md`
   (evidencia de ejecución) — en ese orden, spec antes que evidencia, para
   poder comparar lo prometido contra lo hecho.
4. `git log --oneline --graph --all` sobre las ramas y tags relevantes.
5. `gh pr list --state all --json number,title,headRefName,baseRefName,state,mergedAt,url`
   y `gh pr view <n> --json body,files,mergeCommit,commits` para cada PR
   citado en las specs o encontrado en el log.
6. Tags de release (`git show <tag>`, `gh release view <tag>` si existe).
7. El estado final desplegado — ver "Verificar qué hay realmente en
   producción" más abajo.
8. La skill `upgrade-astro-cloudflare` (`~/.claude/skills/upgrade-astro-cloudflare/SKILL.md`
   y sus `references/`) para no reinventar ni contradecir el método
   compartido.

## Checklist operativo

### 1. Establecer el estado real de las ramas

```bash
git fetch origin --quiet
git log --oneline --graph --all -60          # forma visual de la topología
git rev-parse origin/main origin/migracion/astro-7   # o las ramas relevantes
git merge-base origin/main origin/<rama-integracion>
git merge-base --is-ancestor origin/<rama-integracion> origin/main && echo YES || echo NO
```

Si el resultado no coincide con lo que dice una spec o lo que reportó otra
sesión: **primero sospecha de un `fetch` faltante**, después de un error de
proceso.

### 2. Distinguir un fast-forward de un merge real

`gh pr view <n> --json mergeCommit` da un SHA, pero no dice si es un commit de
merge con dos padres o el resultado de un fast-forward/rebase-merge:

```bash
git log -1 --format='%H%n%P%n%s' <sha-del-mergeCommit>
```

Un solo padre = fast-forward o rebase-merge (no hay commit de merge real, la
rama base simplemente avanzó). Dos padres = merge real; usa
`git log -1 --format='%P'` para identificar cuál padre es cuál rama con
`git merge-base --is-ancestor` sobre cada uno.

### 3. Verificar dependencias entre fases con `--find-renames`

Cuando compares el diff de una fase contra su rama base para chequear
propiedad de archivos (spec: "Archivos que posee" vs. `PROTEGIDOS`), usa
siempre `--find-renames` (o `-M`, activado por default en versiones
recientes de git pero no asumas): un archivo protegido movido y no editado en
contenido puede pasar desapercibido como "nuevo archivo" sin detección de
renombrados, y contarse como si no violara ningún criterio de propiedad
cuando en realidad sí tocó un archivo protegido.

```bash
git diff --find-renames --name-status origin/<rama-base>...<rama-fase>
```

Compara la salida contra la lista de "Archivos que posee" de la spec de esa
fase, no contra tu memoria del PR.

### 4. Reconstruir la cronología con fechas de merge, no de commit

```bash
gh pr list --state all --limit 100 --json number,title,headRefName,baseRefName,state,mergedAt,url
```

`mergedAt` es la fecha que importa para una cronología de producto: la fecha
de un commit puede ser de cuando se escribió, no de cuando se integró.

### 5. Verificar issues de deuda de seguimiento citados

```bash
gh issue view <n> --json title,body,state
```

Un issue cerrado y citado en un PR (`Fixes #N` en la descripción) es
evidencia de cierre; confirma también que el commit que lo cierra existe en
la rama que dice cerrarlo (`git log --oneline <rama> | grep <sha-corto>`).

### 6. Verificar qué hay realmente en producción

No asumas que "`main` despliega a producción" (aunque `AGENTS.md` lo diga)
sin buscar **una verificación concreta contra el proveedor**, no solo contra
el repo:

- Busca en el historial de commits y PRs si alguna sesión anterior verificó
  el build command real contra el dashboard de Cloudflare Workers Builds
  (ejemplo en este repo: PR #36, que confirmó el build command exacto y que
  un hook se ejecutaba duplicado, algo invisible leyendo solo `package.json`).
- Si no hay esa verificación, o es antigua, decláralo **No verificado** en el
  informe — no lo redondees a "sí, está en producción" solo porque
  `AGENTS.md` lo afirme como regla.
- Un side effect de build (hooks npm, llamadas a APIs externas de indexación,
  etc.) nunca se confirma solo leyendo el código: se confirma contra el log o
  el dashboard del proveedor.

### 7. Separación de roles al escribir el postmortem

Igual que en la migración misma (`README.md` de la spec: "Quien migra no
verifica"), quien escribe el postmortem **no debería ser quien ejecutó las
fases**: pierde la capacidad de reportar sus propios defectos con la misma
honestidad que los ajenos. Si esta sesión participó en ejecutar alguna fase,
dilo explícitamente al principio del postmortem.

### 8. Manejo de specs contradictorias o imposibles

Si una spec de fase o el README de la migración se contradice con el estado
real observado en git/gh:

1. No lo "arregles" en el postmortem silenciosamente.
2. No asumas que la spec tiene razón porque es la fuente "oficial".
3. Repórtalo como una sección explícita del postmortem, con ambas versiones
   citadas (spec dice X, `git`/`gh` muestran Y) y la evidencia de cada lado.
4. Si la resolución requiere tocar la spec (por ejemplo, un README que sigue
   describiendo "fases pendientes" cuando ya se fusionaron todas), regístralo
   como **deuda de seguimiento** con un issue o una recomendación explícita
   de sesión aparte — no lo edites tú mismo si la tarea que te encargaron es
   solo el postmortem y las specs están fuera de tu alcance permitido.

### 9. Política de verificación visual (fallback)

Las migraciones de este tipo casi nunca tienen regresión visual automatizada
estable disponible. Al reportar:

- Cita la limitación exacta que encontró cada fase (bloqueo de red del
  navegador, imposibilidad de desactivar animaciones, control de
  determinismo no-cero, navegador/versión no cubierto) — están documentadas
  en cada `fase-*-evidencia.md` de este repo bajo "No verificado".
- Nunca sustituyas una comparación visual que falló por una inspección de
  HTML o una afirmación sin captura. Si la fase-evidencia ya dice "no se
  sustituye esta prueba por inspección visual integrada, HTML o métricas
  inventadas", el postmortem hereda esa misma honestidad, no la relaja.

### 10. Comprobaciones de efectos secundarios en producción

Antes de cerrar el postmortem, repasa si alguna fase tocó algo con efecto
fuera del repo (APIs de indexación, cron jobs, hooks de build, dashboards de
proveedor) y si esa verificación quedó documentada contra el sistema real, no
solo contra el código:

```bash
grep -rn "postbuild\|IndexNow\|Indexing API\|sdi:run" package.json AGENTS.md docs/ 2>/dev/null
```

### 11. Formato de evidencia y de informe

Cada afirmación del postmortem lleva una de estas etiquetas, sin excepción:

- **Verificado** — SHA, PR, línea de archivo o comando ejecutado que lo
  sostiene.
- **Diferencia aceptada** — la spec decía X, la realidad es Y, y se explica
  por qué está bien.
- **No verificado** — no se pudo confirmar; se dice qué haría falta para
  confirmarlo.
- **Deuda de seguimiento** — hueco conocido, con el issue que lo rastrea si
  existe.

### 12. Condiciones de parada / escalación

Detente y repórtalo al usuario en vez de improvisar cuando:

- Una spec y el estado real de git/gh se contradicen y la resolución no es
  obvia a partir de fechas de merge y topología (§8).
- Hace falta tocar un archivo fuera del alcance permitido (specs protegidas,
  código de producto, configuración de despliegue) para que el postmortem
  "cierre bien". El postmortem documenta, no corrige la spec.
- No hay forma de confirmar qué está desplegado en producción sin acceso a un
  sistema fuera del repo (dashboard de Cloudflare, logs de build). Repórtalo
  como **No verificado**, no como asunción.
