# F4A — Corrección documental tras SDD R1 FAIL

Único ciclo de corrección permitido. Informe: [sdd-r1.md](auditoria/sdd-r1.md) (copia del mensaje recibido de la sesión auditora; el transporte entregó `<`/`>` como entidades HTML y se conservan tal cual). Snapshot auditado `7cab1946f81ec9cf2c1c826ae58741403c975433`.

| Bloqueante | Corrección |
|---|---|
| B1 alerta paliativa vs HTML construido | Contratos §1.2: regla `alertItemText` exacta (icono del `<span>` + espacio + resto sin `<span>`/`<a>`, colapsado), coherente con el literal y con el HTML de la base (verificado: no hay espacio literal tras `</span>`). C4A-04 usa la misma regla contra el DOM |
| B2 `title` no expuesto por CDP | SDD C4A-08 y P4A-02: `name/description/inputSchema/annotations.readOnly` vía `WebMCP.toolsAdded`; `title` vía `Runtime.evaluate` de `document.modelContext.getTools()` en el mismo frame. Referencias aclaradas |
| B3 forma de `input` y `breakdown.criterion` | Contratos §2: `input` objeto con keys API (ambas herramientas, valores API en movilidad), `criterion` = key API, orden de ToolInfo; anexos con cuerpos 200 completos generados desde los literales legados |

Observaciones incorporadas porque eliminan ambigüedad sin cambiar el diseño: texto literal de `info.description` con frase marcador (obs. 1); `inputSchema` literales en [anexo](contratos/webmcp-input-schemas.json) (obs. 2); essence MIME (obs. 3); harness C4A-04 y cliente CDP nombrados en ownership F4A-1, fuera de globs de test (obs. 4); C4A-12 «atribuible» con terceros bloqueados (obs. 5); URLs de afiliado en módulo separado no importado por WebMCP/API (obs. 6); CI por globs existentes (obs. 7); alcance de comparación del dominio completo (obs. 8). Obs. 9 sin cambio (ya reconocida). Obs. 10 (`docs/migracion-stack/README.md` desactualizado) queda para el coordinador antes de la promoción; F4A no toca config.
