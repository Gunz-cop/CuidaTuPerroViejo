# Auditoría independiente SDD F4A — revisión 2/2 (última)

| Campo | Valor |
|---|---|
| Intento | **2 de 2** (última; no hay tercera revisión) |
| Commit auditado | `7eceeca162d97d8ab5ae11ce7726c05d123a9ef2` (`git fetch` + checkout exacto; HEAD verificado; `git ls-remote`: `refs/heads/agent-ready/f4a-sdd` = este SHA) |
| Tree auditado | `6f3002b980eff6ae50aef990a6f1ddb66bbec8ae` (verificado) |
| Snapshot R1 / diff | `7cab1946f81ec9cf2c1c826ae58741403c975433` → `7eceeca` (1 commit, 8 archivos, todos `docs/agent-readiness/**`; nada fuera de `docs/agent-readiness/**` desde la base `eff4ce1`) |
| Base / main | `eff4ce13a1f4b996f3d9b523799012bc668da318` sin cambios; `main` remoto = `aad2a6624c24d7425c5ad5329b82c77a8a86b619` (no avanzó) |
| Sesión auditora | `session_011k5uFc2VrmGa3CVCgb2eSm` (la misma de R1), creada por `session_01WrWNMhCy51TqDSjjHwBTVS`; distinta del autor |
| Modelo configurado / servido | `claude-opus-5-5` / `claude-opus-5-5` (verificado en R1 con `get_session`; sin fallback desde entonces), esfuerzo `high` |
| Fecha | 2026-10-12 (UTC) |
| Alcance | Cierre de B1–B3 y bloqueantes nuevos introducidos por la corrección, incluidos los anexos `ejemplo-*-200.json` y `webmcp-input-schemas.json`. Sólo bloqueantes. Sin commits, push ni despliegue |

## Verificación del cierre de R1

| R1 | Estado | Evidencia |
|---|---|---|
| **B1** alerta paliativa | **Resuelto** | Contratos §1.2 fija `alertItemText(li)` = `collapse(span.textContent) + " " + collapse(resto sin <span>/<a>)`, y la misma regla rige el test contra el HTML construido y C4A-04. La apliqué con parse5 al `dist/client/herramientas/selector-movilidad-perros-mayores.html` de la base: el objeto resultante (título, 3 `item.text`, labels y URLs absolutas) es **idéntico** al literal JSON de §1.2 y al `palliativeAlert` de `ejemplo-movilidad-200.json` |
| **B2** `title` no expuesto por CDP | **Resuelto** | C4A-08 y P4A-02 verifican `title` con `Runtime.evaluate` de `document.modelContext.getTools()` en el mismo frame. Lo reproduje en Chrome for Testing 155.0.8059.39 + `WebMCPTesting`: `getTools()` devuelve los cuatro títulos del contrato y `toolsAdded` no trae `title`. El README de referencias quedó aclarado |
| **B3** forma de las salidas 200 | **Resuelto** | §2 fija `input` como objeto con keys API (valores API en movilidad), `criterion` = key API y el orden de `ToolInfo`, y añade dos cuerpos 200 completos normativos |

**Anexos de cuerpo 200 contra el código legado** (oráculo propio `r2-oracle.mjs`, sha256 `d6c0cbb3…0ad3`). Evalúa en `vm` los literales del `<script is:inline>` de la base (`CRITERIA`, `MAX`, `OPT1`, `OPT2`, `RES`, `SHOW_AFFILIATE_LINKS`) y extrae con regex del fuente los textos de franja, el `href` del CTA, los avisos y el JSON-LD. Serializados con `JSON.stringify(v,null,2)+'\n'`, `ejemplo-calidad-vida-200.json` (todo 5) y `ejemplo-movilidad-200.json` (`severe/stressed`) son **byte-idénticos**. También reproduce las franjas en 0/34/35/49/50/70. Los anexos no inventan nombres, entradas, fórmulas, textos ni métodos clínicos.

**`webmcp-input-schemas.json` contra la base.** El patrón de `read_guide` es literalmente el regex de ID F3 (`runtime.ts`); `kind`, `limit` 1..20, `offset` 0..98 y `corpus` coinciden con F3; las descripciones de los siete criterios reproducen `lo`/`hi` de `CRITERIA`, y las de movilidad, `sub`/`tx` de `OPT1`/`OPT2`. Contenido correcto; ver B4 para su efecto en el instrumento de verificación.

Las demás modificaciones no introducen contradicciones. Son: `info.description` literal, que conserva la frase marcador con su espacio inicial; essence MIME; `movilidad-afiliados.ts`, que C4A-02 puede seguir comparando como unión con `RES` legado; `cdp.mjs` y `tools-ui-parity.mjs` en el ownership de F4A-1 y fuera de los globs de test; C4A-12 «atribuible» con terceros bloqueados; y CI por globs.

El informe R1 archivado (`evidencia/f4a/auditoria/sdd-r1.md`, sha256 `94a8c82a…d45e`), una vez convertidas las entidades HTML (`&lt;`/`&gt;`), es **idéntico** a mi original (`9ef4b3d7…0624`).

## Bloqueantes

### B4 (nuevo, introducido por la corrección) — C4A-08 exige `inputSchema` vía `WebMCP.toolsAdded` con igualdad profunda al anexo, y Chrome 155 no entrega `inputSchema` por CDP para los cuatro schemas del anexo

- **Ubicación:** `fases/f4a-herramientas-webmcp.md` §6.1 C4A-08 («`WebMCP.toolsAdded` … entrega exactamente las cuatro tools con `name`, `description`, `inputSchema` (igualdad profunda con el anexo)…»); P4A-02 («mismo método que C4A-08»); `evidencia/f4a/contratos/webmcp-input-schemas.json`; contratos §5.2 («`inputSchema` … **exactamente** el objeto homónimo del anexo»).
- **Problema, reproducido en el navegador obligatorio** (Chrome for Testing 155.0.8059.39, zip sha256 `55672d1f…ea8ea`, `--enable-features=WebMCPTesting`):
  - En el evento `WebMCP.toolsAdded`, **el campo `inputSchema` se omite** cuando el schema contiene algún carácter del rango U+0080–U+00FF (á, é, í, ó, ú, ñ…).
  - Pasan bien: el mismo schema en ASCII (`"Hidratacion"`), un emoji (`"✅"`) y un `description` de la tool con acentos (`"Busca guías publicadas"`).
  - **Los cuatro schemas del anexo** tienen descripciones con esos caracteres («página», «catálogo», «Hidratación», «rápido», «perdió»…). Al registrarlos tal cual, `toolsAdded` llega con `inputSchema` **undefined en las cuatro tools**.
  - `getTools()` dentro de la página los devuelve con igualdad profunda exacta.
  - Mismo resultado con `WebMCP.enable` antes o después del registro, y tanto con Playwright `CDPSession` como con un cliente CDP por **WebSocket nativo de Node**, el mismo tipo que el harness de la SDD.
  - Pruebas y salidas, todas sha256:

    | Archivo | sha256 |
    |---|---|
    | `probe-schemas.mjs` | `a873b660…b77d` |
    | `probe-schemas.out.txt` | `4c225214…865b` |
    | `probe-schema-variants.mjs` | `b51f6226…0163` |
    | `probe-schema-variants.out.txt` | `28dafa00…d5d5` |
    | `probe-nonascii.mjs` | `f5dece76…64dc` |
    | `probe-nonascii.out.txt` | `91a2cff2…703d` |
    | `probe-raw.mjs` | `28bcba32…e164` |
    | `probe-raw.out.txt` | `9134cae2…7ec6` |
- **Por qué impide ejecutar:**
  - Una implementación que cumpla exactamente contratos §5.2 suspende de forma determinista C4A-08 y P4A-02 por una limitación del instrumento, no del producto.
  - El ejecutor tendría que inventar una salida: cambiar las descripciones del anexo (prohibido: «exactamente»), verificar `inputSchema` por otra vía (contradice el método fijado) o declarar FAIL/STOP de un gate obligatorio.
  - La propia SDD dice que el ejecutor no elige.
  - Riesgo adicional, no verificado: si el canal interno del navegador hacia su agente comparte esta serialización, un agente real recibiría las tools sin schema.
- **Condición que lo resolvería** (cualquiera de las dos):
  - (a) Las descripciones (y cualquier string) de `webmcp-input-schemas.json` no contienen caracteres U+0080–U+00FF (por ejemplo, descripciones ASCII u omitidas), y la SDD registra esta restricción de Chrome 155.
  - (b) C4A-08/P4A-02 verifican `inputSchema` con igualdad profunda vía `getTools()` en la página (igual que `title`), y CDP sólo exige `name`/`description`/`annotations.readOnly`. En ese caso conviene registrar la omisión observada como riesgo de interoperabilidad.

## Observaciones no bloqueantes

1. La descripción de `q` en `search_guides` dice «1..200 caracteres». F3 cuenta codepoints tras NFC/trim y además exige ≤800 bytes y tokens de ≤64 codepoints. Es sólo informativa (la API valida), pero conviene alinearla.
2. Los anexos de cuerpos 200 y de schemas no están referenciados por `decisiones.md`; la trazabilidad pasa por `correccion-r1.md` y contratos §2/§5.2, lo cual basta.

## Limitaciones

- Sondeos en `http://localhost` con páginas mínimas, no en el sitio construido ni en preview/producción. No ejecuté workerd, la suite de CI ni scans.
- No investigué la causa interna en Chromium de la omisión de `inputSchema` (parece la ruta de cadenas Latin-1/8 bits) ni si afecta al canal del agente del navegador.
- Los literales legados se evaluaron en `vm` cortando cada script antes de su sección `/* ── Estado ── */` (sin DOM). Los textos de franja y el JSON-LD se extrajeron con regex del fuente de la base.

## Dictamen

**FAIL** — B1, B2 y B3 de R1 quedan resueltos, pero la corrección introdujo **B4**: C4A-08/P4A-02 no pueden pasar con el anexo de `inputSchema` tal como está en el navegador de referencia. Es la segunda y última revisión: según §8 de la SDD, «segunda FAIL → STOP».
