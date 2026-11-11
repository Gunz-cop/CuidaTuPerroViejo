# Auditoría independiente de la skill de fichas afiliadas — r2

Fecha: 10 de noviembre de 2026.

**Veredicto: APTO para incorporar/publicar la skill en este proyecto.** No se identificaron defectos bloqueantes ni hallazgos priorizados que requieran una corrección previa. Este veredicto evalúa las instrucciones; no acredita la elegibilidad actual de un producto, los derechos del video ni la preparación del piloto para producción.

## Identificación y método

- Archivo auditado: `.agents/skills/crear-ficha-afiliada/SKILL.md`.
- SHA-256: `C18511E99B87B83FA2BD802DC3D0BB53AF74A6181C37F156CD5DA5A4A6D35C8D`.
- Checkout: `C:/Users/grcx1/.codex/worktrees/piloto-afiliacion/CuidaTuPerroViejo`.
- Revisión independiente a partir del encargo, el archivo y sus referencias del checkout. No se consultaron conversaciones anteriores ni informes de auditoría previos.
- Criterio auxiliar: `C:/Users/grcx1/.codex/skills/.system/skill-creator/SKILL.md`, especialmente conservación del alcance, especificidad proporcional, referencias accesibles y pruebas de comportamiento.

Se inspeccionaron las instrucciones, la guía comercial, el componente de referencia, su integración MDX, las políticas locales y los contratos de proyección y del selector de movilidad. Además se ejecutó una prueba sintética del proyector en memoria, sin modificar archivos ni enviar tráfico a ningún comercio.

## Hallazgos priorizados

**Ninguno que impida aplicar correctamente la skill desde una sesión nueva.** Las observaciones siguientes explican por qué no se consideran defectos preferencias de diseño o dependencias que el propio flujo ya hace explícitas.

| Área y ubicación | Evaluación |
| --- | --- |
| Descubrimiento y alcance, líneas 2–3 y 10–14 | El nombre y la descripción identifican una tarea concreta dentro de artículos del sitio. Las rutas se resuelven desde el checkout. El panel y las guías completas quedan fuera del encargo ordinario. No necesita ser una skill portátil para otros proyectos. |
| Requisitos visuales, líneas 18–24, 38 y 42–52 | Un único CTA directo y el aviso debajo son decisiones documentadas del propietario. La paleta y los tiempos de animación se presentan como referencia local, con verificación y margen de adaptación. No se exige extraer prematuramente un componente genérico ni se prometen mejoras de conversión. |
| Evidencia comercial, líneas 28–32 y 44 | Se exige distinguir vendedor, variante, país, destino y enlace oficial. La guía enlazada aporta ficha de relevo, comprobación de elegibilidad, condiciones por mercado, fechas y retirada. Las discrepancias de medidas del piloto se conservan como limitación y no se convierten en medidas verificadas ni beneficios clínicos. |
| Medios, líneas 32–34 | Se distingue el permiso del dueño de los derechos del titular, se conserva procedencia y se exige revisar la licencia ante una duda concreta. La guía declara expresamente la autorización específica del video como pendiente; una sesión nueva puede localizar ese pendiente sin historial conversacional. |
| Marcado, línea 40 | El enlace afiliado conserva `sponsored` con independencia de la pestaña; si abre otra pestaña, se especifica el atributo completo. El componente de referencia cumple la instrucción. No se exige un esquema comercial nuevo ni se altera el `BlogPosting` del artículo. |
| Privacidad, líneas 56–62 | Se separan finalidad comercial, información en políticas y consentimiento exigible. No se afirma que un aviso baste como consentimiento, ni que un enlace directo esté universalmente exento. Una revisión debe justificar cualquier cambio con el requisito concreto. La medición propia sigue siendo otro encargo. |
| Integración, líneas 66–72 | Se exige comprobar enlace, teclado, táctil, temas, movimiento reducido, carga del video y exclusión Markdown. La combinación exacta `aside` + `data-affiliate-placement` coincide con el proyector. La entrega no equivale a autorización para publicar. |

## Escenarios contrastados

1. **Cambiar el color de la ficha existente.** La sesión identifica el componente vigente, conserva enlace y aviso, puede adaptar el diseño y verifica los estilos calculados. La skill no exige reiniciar una investigación comercial completa, construir el panel o introducir un selector previo al comercio.
2. **Incorporar otra cama anunciada como ortopédica.** La etiqueta comercial no basta para afirmar resultados clínicos. La guía obliga a registrar producto, variante, mercado y elegibilidad; si faltan comprobaciones, su encargo de relevo permite entregar el avance con campos pendientes. No hay base para heredar automáticamente la aprobación de la cama piloto.
3. **Crear una ficha sin foto autorizada.** La guía permite una ficha de texto con contexto y CTA. La instrucción de que el medio muestre el producto exacto no obliga a inventar fotografías ni a reutilizar recursos de otra tienda.
4. **El dueño aporta un video del vendedor.** Hay que conservar procedencia y distinguir las autorizaciones. En el piloto existe una duda concreta documentada sobre derechos; la aprobación estética no la resuelve. No se atribuye el video a una prueba doméstica propia.
5. **Preparar una comparativa entre tiendas.** La excepción explícita de la línea 24 permite un enlace por destino comercial. La preferencia de CTA único no se interpreta como prohibición de la comparativa solicitada ni como obligación de añadir una alternativa sin comisión.
6. **Solicitar medición por país.** La línea 62 identifica otro encargo y dirige al pendiente del panel. El atributo de ubicación permite identificar la ficha, pero no se presenta como contador ni como prueba de atribución del proveedor.
7. **Copiar solo el atributo a un `div`.** El contrato sería incorrecto. La skill lo evita al exigir el `aside` completo y la comprobación de la salida generada.

Los escenarios son recorridos razonados contra instrucciones y artefactos; no son ejecuciones de una sesión redactora con modificaciones reales.

## Prueba del contrato de proyección

Se invocó `projectDocument` de `scripts/agent-readiness/projection-dom.mjs` con un artículo sintético válido y tres variantes del contenedor comercial:

| Contenedor | Conserva contenido editorial | Enlace comercial en Markdown |
| --- | --- | --- |
| `aside` con `data-affiliate-placement` | Sí | Excluido |
| `div` con `data-affiliate-placement` | Sí | Presente |
| `aside` sin el atributo | Sí | Presente |

La prueba confirma un requisito funcional, no una preferencia de estilo. La condición está implementada en `projection-dom.mjs:173`. Se comprobó también que `MobilityTool.astro:256` mantiene `SHOW_AFFILIATE_LINKS = false` y que `tools-ui-parity.mjs:107` espera cero enlaces comerciales. No se activaron enlaces legados.

## Recomendaciones y límites

No se recomienda ampliar la skill con un flujo universal de consentimiento, una auditoría legal automática, una abstracción genérica obligatoria ni un enlace alternativo sin comisión: no hay un fallo demostrado que justifique esos requisitos.

Al utilizarla, deben resolverse o comunicarse los pendientes materiales del producto y del medio según el encargo. En especial, la publicación de la skill no cambia el estado de la autorización específica para republicar el video del piloto, de las medidas por variante ni de la validación comercial documentada.

El validador `quick_validate.py` pasó con el resultado `Skill is valid!`, ejecutado mediante `uv` y el intérprete `C:/Users/grcx1/AppData/Local/Programs/Python/Python310/python.exe` con PyYAML. Se revisaron también manualmente el frontmatter, el nombre y la descripción. El intento inicial con `python` en PATH falló por el alias de Windows; se resolvió usando ese intérprete disponible. No se ejecutó build, auditoría visual en navegador ni pruebas sobre el programa de afiliados, porque no se modificó la implementación y el objeto revisado son las instrucciones. Tampoco se verificaron el portal privado, las capturas originales, el destino comercial vivo, la titularidad de medios ni la configuración pública efectiva de consentimiento.

No se emite una conclusión jurídica ni se afirman obligaciones externas nuevas. Las referencias externas mencionadas por la guía no se utilizan como hechos nuevamente verificados en esta auditoría. No hubo commit, push ni despliegue.

## Referencias del checkout

- `.agents/skills/crear-ficha-afiliada/SKILL.md`, líneas 1–72.
- `AGENTS.md`, apartados de migración, afiliación y pendientes del dueño.
- `docs/seo/afiliacion-aliexpress.md`, registro del candidato, implementación, investigación y mantenimiento.
- `src/components/CamaAfiliada.astro`.
- `src/content/blog/cama-ortopedica-perros-mayores-displasia-artrosis.mdx`, importación e instancia del componente.
- `scripts/agent-readiness/projection-dom.mjs:173`.
- `scripts/agent-readiness/tools-ui-parity.mjs:107`.
- `src/components/tools/MobilityTool.astro:256`.
- `src/pages/politica-editorial.astro`, `src/pages/politica-de-privacidad.astro` y `src/pages/politica-de-cookies.astro`.
- `C:/Users/grcx1/.codex/skills/.system/skill-creator/SKILL.md`.

