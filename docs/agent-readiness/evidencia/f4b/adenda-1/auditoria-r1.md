# F4B — auditoría independiente de adenda normativa 1, A1-R1/2

Fecha: 2026-10-13. **Dictamen: PASS de fondo/coherencia de la adenda acotada, sin bloqueantes.** El PASS permite archivar el informe y ratificar/congelar la adenda. **No acepta la implementación ni su evidencia, no cierra retrospectivamente bugs95/98 y no inicia R2/5 de implementación.** La aplicación efectiva de las cláusulas nuevas requiere ratificación y verificación posterior.

## Identidad, autorización e historial

| Dato | Valor |
|---|---|
| Revisión | **A1-R1/2**, primera del presupuesto exclusivo de esta adenda |
| Auditor independiente | Misma sesión/agente `/root/f4b_auditor`, configuración explícita **gpt-6.1-sol / high**, distinto del autor/corrector Sol/high |
| Snapshot auditado | `6dcbfa50ae3fd6ac080e4725eea9466cb63e3d0d` |
| Tree comprobado | `189faed48d73007db3d218ae82855bfaae5acaef` |
| Worktree auditor | `/workspace/ctpv-f4b-auditoria`, **DETACHED**, limpio |
| Base normativa SDD | `d5b57df26d6242572a29901f8dfb94468b95da6a` |
| Ratificación SDD / base de desarrollo | `8669d9d6dd4b03685500d67a9332786ad474ff6b` |
| Fuente SDD ratificada preservada | SHA-256 `8ccf7da5d77ef89e0e8ff82183e589e56ee9552485c3f6e2ebe01b72b4d9ed63` |
| Producto previamente auditado | `e6897f38fa3c80913d66ab7b044929b003a0abb5`, tree `ff2466e4132077a7348b9e7e324fcad5f97a67ee` |
| Base técnica F4A | `cb8e10f1ead55ef0dafc666672cd3003252afc59` |
| Documentación final F4A confirmada por el propietario | `a42a18522b7cf4143aff56d11d4632dc3c1050da` |

El propietario autorizó expresamente esta adenda para bugs95/98 y un máximo de **dos revisiones exclusivas** con el mismo auditor: primera revisión y un único ciclo correctivo si fuera FAIL; segundo FAIL→STOP. La continuación solicitada tras una interrupción técnica mantiene esta misma A1-R1/2; no contó como dictamen ni creó una revisión adicional.

Historial intacto: SDD R1FAIL/R2FAIL/STOP, excepción explícita y R3 adicionalPASS; implementación issue90 **R1/5FAIL** con I-B1–I-B4. El presupuesto de adenda es distinto; no renumera, reinicia ni amplía ninguno de los contadores previos. La eventual implementación posterior conserva como siguiente revisión **R2/5 del mismo auditor**, con máximo5 por issue y quintaFAIL→STOP.

## Alcance y verificaciones

Se leyó íntegramente `docs/agent-readiness/evidencia/f4b/adenda-1/adenda-normativa.md`, su manifest y las primarias relevantes, junto con las cláusulas originales sustituidas y la admisión/estado del STOP. Se revisó la coherencia de las dos sustituciones y de su ownership mínimo. No se inició una nueva auditoría global de SDD ni de implementación.

Comprobaciones en lectura:

- SHA/tree del snapshot comprobados. Desde productoe6897f3 hasta esta entrega, todos los cambios son documentación/evidencia; **no cambió código de producto después del STOP**.
- SDD ratificada conserva su hash y no se editó. Las sustituciones viven en el documento nuevo, con alcance y precedencia expresos.
- Sourceguard de `src/pages/contacto.astro` coincide: SHA-256 `d8b0712f96d2e5556e527e3d024561a8b15e0ab5344bdb2d59a038a98f0ee672`. No se alteraron contacto, Date.now(), antispam, recursos ni headers.
- Los **siete originales** del manifest coinciden en bytes y SHA-256. Las versiones móvil y fijada del schema son byteidénticas. El200 de la URLmoderna utilities/ping es una redirección al changelog; se preserva URLfinal y no se interpreta como soporte de ping.
- Los cuerpos reales anteriores de contacto contienen exactamente una ocurrencia del prefijoP y el sufijo literalS previstos; sus valores1791909512198 y1791909513074 tienen13bytesASCII. Esta lectura confirma que la excepción especificada corresponde al caso diagnosticado; **no ejecuta ni acepta todavía el checker nuevo**.

Sin builds, instalaciones, pruebas de producto, clienteMCP, llamadas remotas, cambios de código/SDD, main, push, PR/issues externos, scanners, puntuaciones, agentes o sesiones adicionales. No se implementó el checker ni se corrigió al autor. Informe externo fuera del repo; worktree propio limpio.

## Fuentes primarias determinantes

| Fuente archivada | Autoridad/resultado | Bytes / SHA-256 |
|---|---|---|
| `referencias/changes.txt` | Changelog oficial2026-07-28, **Major changes5: Remove ping**, logging/setLevel y notifications/roots/list_changed |11892 / `203d3c9974e1a0e22308a4f0ae55e6ff7f1ad4150de64411b8c8e03003589aae` |
| `referencias/ping.txt` | Consulta moderna utilities/ping: URLfinal changelog, cuerpo idéntico a changes; no página que exija ping |11892 / mismo hash203d3c… |
| `referencias/schema-fixed.txt` | Repositorio oficial specification, commit fijo `3778656b2e0ba6725035e816fe3085374cbaa736`, schema2026-07-28: ClientRequest no contiene PingRequest |98426 / `742750af0bb8c716e7030c4977c992b55d1adc4407e9e66997db5846baedc2cd` |
| `referencias/legacy-ping.txt` | Documento oficial2025-11-25: ping válido requiere respuesta vacía result{} |1791 / `2702be9d7f427a1fcfd120ee8c1f7e26554b690a5d29492a9e259afade53ba15` |

Manifest conserva URLs iniciales/finales, status200, fechaUTC de consulta2026-10-13 y digests de todas las fuentes. Basic/schemaactual/llmsindex restantes también se cotejaron con el manifest. El registry del SDK2.3.1 inspeccionado y la reproducción de implementaciónR1 coinciden: pinglegacy funciona; pingmoderno queda fuera del registry2026 y produce404/-32601. No hay fuente primaria fijada que contradiga la retirada en esta revisión.

## A1 — métodos modernos, bug98 / I-B4

**PASS.** La sustitución es exacta: elimina únicamente ping de la allowlistmoderna; conserva server/discover, tools/list y tools/call. Legacy mantiene initialize, tools/list, tools/call, ping y ambas notificaciones literalmente. SDK2.3.1, versiones, transporte, sesiones y contratos de tools permanecen.

La adenda fija una expectativa ejecutable coherente con las primarias: pingmoderno con envelope/headers/versión/id válidos devuelve HTTP404, JSON-RPC2.0 con id recibido, error-32601 `Method not found.`, sin data/resultado. Conserva la precedencia de validaciones para entradas inválidas. Exige rechazarlo antes del dispatch mediante la allowlist, sin handleralternativo ni éxito/protocolo propio. Pinglegacyválido sigue HTTP200/result{} con framing nativo del SDK.

La contradicción normativa de I-B4 queda resuelta **al ratificar esta sustitución**, usando el comportamiento de la revisión2026 real, sin afirmar que ping siga exigido ni cambiar SDK para lograrlo. Esto no demuestra todavía que el código final retire ping de la allowlist y pase sus pruebas nuevas, ni cierra automáticamente el bug98 o C03/C07 de implementación.

## A2 — identidad restringida de contacto, bug95 / I-B3

**PASS.** La adenda reemplaza explícitamente el requisito absoluto del timestamp de contacto por un criterio nuevo aprobado para un caso concreto; no disfraza como PASS el antiguo80/81FAIL ni pretende igualdad byteexacta del81.ºartifact. Su forma es siempre **«80 byteexactos + contacto con equivalencia restringida»** y C12 requiere ambos componentes y los demás gates.

Las restricciones permiten ejecutar y falsar el criterio sin interpretaciones amplias:

- Selección reproducible desde el manifest completo330assets mediante reglas explícitas; conservar los81paths observados únicos, incluido contacto, sin omisiones/subconjunto favorable. MappingHTML definido. Si cambia cardinalidad/roles en buildfinal, STOP y decisión antes de afirmar80/81.
- Receiptreal con SHAfinal/build/versión y URL inmutable; archivar manifest, inventario, cuerpos HTTP200 completos, bytes/hash originales y headers/time. No aliasmutable, query ni hashes remotos inventados.
- Sourceguard de contacto exacto y sin cambio a fuente/antispam/recursos/headers. La excepción no autoriza fijar o simular Date.now().
- En **cada** cuerpo, exactamente unP literal `<input type="hidden" name="startedAt" value="`, valorV de13bytes con patrónASCII `^[1-9][0-9]{12}$` y sufijoS literal `" data-started-at>`. Un tag/atributo extra o distinto, ausencia/duplicación, signo/exponente/entidad/Unicode/whitespace no satisface la forma.
- Igualdad byte a byte del **prefijo completo hasta V** y del **sufijo completo desde el final de V**. Sólo V puede diferir. No parsear/reserializarHTML, normalizar whitespace/Unicode/números ni usar un hash de documento normalizado como sustituto. Conservar offsets/longitudes y valores originales.
- HTTPno200, sourceguard/body/receipt ausentes o diferencia de cualquier otro byte→FAIL/STOP del gate. Ninguna excepción de contacto compensa un fallo de los80 deterministas.

Las pruebas obligatorias enumeran fixture real con timestamp distinto y hashes distintos, identidad exacta válida y negativos de formato/unicidad/tag/diferencia exterior. La verificación final real exige ambos cuerpos originales y81artifacts presentes con receiptSHA y80comparaciones completas; mocks no la sustituyen.

El algoritmo especificado no permite una equivalencia general de HTML ni esconder otra diferencia. Resuelve el bloqueo normativo de comparabilidad de I-B3 **tras ratificación**, manteniendo en FAILhistórico el checker anterior. No constituye prueba ejecutada de un nuevo C12 ni acepta los80assets de una futura entrega sin volver a obtener su evidenciafinal.

## Ownership, ratificación y criterios restantes

**PASS de acotación.** La adenda admite exclusivamente `scripts/agent-readiness/mcp-evidence.mjs` para selección/manifest/comparador y `tests/agent-readiness/f4b-identity.test.mjs`, después de PASS/ratificación. El resto de ownership original/admisióndiscovery91 se conserva. No introduce modificaciones a contacto, SDDhistórica, SDK/deps/config/CI, proyección/routing o dominioF4A.

La confirmación del propietario sobre productoF4Acb8e10f y documentaciónfinala42a185 figura separada y verificable; resuelve la recepción de bases antes pendiente. Sus puntuaciones86/67 pertenecen aF4A, **no** son mediciónF4B. Sigue siendo obligatorio cotejar el diff de integración y los gates afectados; no hay merge/promoción/scanner autorizado por esta adenda.

Continúan **sin aceptación**:

- I-B1/C05: corregir paginación del catálogo y demostrar todos28IDs reales con hash/bytes/paridad/corpus; evidenciaanterior20 no se convierte en28.
- I-B2/C09: corregir deadline de output/backpressure, impedir éxito tardío y recuperar slots preservando residualF3; reproducciónnegativa anterior se conserva.
- C08: completar fronteras/negativos de caps según la implementación final, sin inventar resultados.
- CPU/heap de ejecuciónexitosa pertinente: perfil local fallido no prueba éxito ni viabilidadFree/coste/CPUproducción.
- C03/C07 con la nueva allowlist y C12 con el checkerconstructivo, receipt y artifacts del SHAfinal: todavía requieren implementación y evidencia reales.
- C13/aceptación global de implementación y gates de integración/publicación: todavía pendientes. El rollbacklocal8/8 previo no acepta los fallos restantes ni autoriza promoción.

## Disposición y contador

**A1-R1/2 PASS, cero bloqueantes de la adenda acotada.** La revisión interrumpida y continuada es una sola A1-R1; no hubo A1-R2 ni un dictamen técnico ficticio durante la interrupción. Los contadores e informes históricos permanecen intactos.

Coordinación puede archivar literalmente el informe, ratificar en documento nuevo y fijar SHA/tree normativos de la adenda. Sólo después corresponde aplicar sus cambios autorizados y corregir los fallos restantes dentro del mismo encargo, antes de presentar **R2/5 de implementación al mismo auditor**. No se otorga PASS de implementación, cierreautomático de bugs95/98, main, producción ni puntuaciones mediante este dictamen.

Informe íntegro externo: `/workspace/f4b-adenda1-auditoria-r1.md`.
