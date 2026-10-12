# Auditoría independiente SDD F4A — ciclo 2, revisión 1/2

| Campo | Valor |
|---|---|
| Ciclo / intento | **Ciclo 2, intento 1 de 2** (presupuesto propio del ciclo 2 comunicado por el coordinador; los informes del ciclo 1 se conservan) |
| Commit auditado | `ccb159852bc202fdf86c2ffbb2122ea637c43908` (`git fetch` + checkout exacto; HEAD verificado; `git ls-remote`: `refs/heads/agent-ready/f4a-sdd` = este SHA) |
| Tree auditado | `f5d3d21183982eb9d246d7b4e9aead62717f4aa8` (verificado) |
| Diff contra R2 del ciclo 1 | `7eceeca` → `ccb1598`: 4 commits, 13 archivos, todos en `docs/agent-readiness/**`; nada fuera de `docs/agent-readiness/**` desde la base `eff4ce1`; árbol de trabajo limpio |
| Base / main | `eff4ce13a1f4b996f3d9b523799012bc668da318`; `main` remoto = `aad2a6624c24d7425c5ad5329b82c77a8a86b619` (no avanzó) |
| Sesión auditora | `session_011k5uFc2VrmGa3CVCgb2eSm` (mismo auditor que en el ciclo 1), creada por `session_01WrWNMhCy51TqDSjjHwBTVS`; distinta del autor |
| Modelo configurado / servido | `claude-opus-5-5` / `claude-opus-5-5` (verificado con `get_session`; sin fallback registrado en la sesión), esfuerzo `high` |
| Fecha | 2026-10-12 (UTC) |
| Alcance | Paquete SDD F4A completo en el snapshot: B4 y cualquier bloqueante nuevo o residual. Sólo bloqueantes. Sin commits, push, despliegues ni correcciones |

## Verificaciones

1. **B4 — resuelto.**
   - `webmcp-input-schemas.json` no contiene ningún byte fuera de U+0000–U+007F (`grep -P '[^\x00-\x7F]'` vacío).
   - Comparado con el anexo de `7eceeca`, la estructura es idéntica: mismas keys y orden, tipos, `enum`, `pattern`, `minimum`/`maximum`/`maxLength`, `required` y `additionalProperties`.
   - Las únicas diferencias son cadenas `description`: quitar las tildes (NFD sin marcas) reproduce exactamente las nuevas, salvo `q`, reescrita a propósito. Su nuevo texto coincide con F3 §2: 1..200 codepoints y ≤800 bytes tras NFC/trim, 1..12 tokens de ≤64 codepoints.
   - Contratos §5.2 hace normativa la regla ASCII de las cadenas de `inputSchema` y deja sin restricción `name`/`title`/`description` de las tools. C4A-08 añade el check offline ASCII y la igualdad de `inputSchema` también vía `getTools()`. D32 registra la decisión.
2. **Comprobación propia en el navegador de referencia.** Chrome for Testing 155.0.8059.39 (zip sha256 `55672d1f…ea8ea`) con `--enable-features=WebMCPTesting` y **cliente CDP por WebSocket nativo de Node**. Registré las cuatro tools con `title` y `description` **tomados literalmente de la tabla de contratos §5.2** (con tildes), el anexo nuevo como `inputSchema` y `annotations.readOnlyHint:true`.
   - Llegan 4 tools en `WebMCP.toolsAdded`.
   - En las cuatro, el `inputSchema` de CDP tiene **igualdad profunda** con el anexo, `description` coincide exactamente (con tildes) y `annotations.readOnly` es `true`.
   - `getTools()` en la página devuelve el `title` del contrato, el `inputSchema` con igualdad profunda y `readOnlyHint:true`.
   - CDP sigue sin `title`, como ya prevé C4A-08.
   - Script `c2-probe-raw.mjs` (sha256 `eadb6623…44cb`); salida `c2-probe-raw.out.txt` (sha256 `0503799f…7fb3`). C4A-08 y P4A-02 son ahora ejecutables con el método fijado.
3. **Comprobación del autor.** La salida `ciclo2/probe-schemas-ascii.out.txt` concuerda con mi resultado. `stop-sdd/probe-b4.out.txt` reproduce B4 con el anexo anterior.
4. **Sin regresiones en lo verificado en ciclo 1.**
   - Volví a ejecutar mi oráculo independiente (`r2-oracle.mjs`, sha256 `d6c0cbb3…0ad3`) contra los literales y el HTML construido de la base.
   - `ejemplo-calidad-vida-200.json` y `ejemplo-movilidad-200.json`, sin cambios en el diff, siguen **byte-idénticos**.
   - La regla `alertItemText` aplicada al HTML construido sigue reproduciendo exactamente el literal de §1.2.
   - El resto del paquete (SDD §1–§8, contratos §1–§6, anexo de skill, decisiones D21–D31 y referencias) no cambió respecto de lo auditado en R1/R2 del ciclo 1, salvo el estado de cabecera. Sigue sin bloqueantes: B1–B3 resueltos en R2 y B4 resuelto aquí.
5. **Registros.**
   - El informe R2 archivado (`evidencia/f4a/auditoria/sdd-r2.md`) tiene sha256 `bd0ba3c4c8f9cff60e27251d8b41d0f6a11c330ff70f4ff4971e7be2f52f474b`, idéntico a mi original.
   - Los enlaces relativos de `ciclo2/README.md` y `stop-sdd/README.md` resuelven.
   - La cabecera de la SDD declara el ciclo 2 como no ratificado y sin autorización de issues ni programación, lo cual es coherente.

## Bloqueantes

Ninguno.

## Observaciones no bloqueantes

1. La cabecera de la SDD y `plan.md` siguen citando «decisiones D21–D31», aunque `decisiones.md` ya incluye D32. La regla vinculante está en contratos §5.2, así que no impide ejecutar; conviene actualizar la referencia al ratificar.
2. B4 es una limitación de Chrome 155 observada empíricamente; no figura en la spec. Si una versión futura cambia ese comportamiento, la regla ASCII sigue siendo inocua. Conviene que la evidencia de F4A-2 vuelva a registrar el resultado de `toolsAdded` con la versión exacta del navegador.

## Limitaciones

- Sondeo en `http://localhost` con una página mínima que registra los datos del contrato; no en el sitio construido, workerd, preview ni producción. No ejecuté la suite de CI ni scans.
- No investigué la causa interna de B4 en Chromium ni si afecta al canal del agente del navegador. La regla ASCII evita ese caso para los schemas.
- La revisión del paquete completo se apoya en las verificaciones de fondo de R1/R2 del ciclo 1 sobre las partes que no cambiaron en este diff.

## Dictamen

**PASS** — sin bloqueantes en el snapshot `ccb159852bc202fdf86c2ffbb2122ea637c43908` (tree `f5d3d21183982eb9d246d7b4e9aead62717f4aa8`).
