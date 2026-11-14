# Corrección P2 de antiparasitarios — 2026-10-28

**Rol: corrección, no auditoría.** Este expediente describe lo que se cambió y cómo comprobarlo. No es un veredicto: falta la auditoría delta independiente sobre el nuevo hash, como exige el informe de origen.

- **Archivo:** `src/content/blog/leishmaniosis-perros-mayores.mdx`
- **Base:** `main` en `b868aa7`. SHA-256 de partida verificado: `871ff7fadc0fa352e9e2cd809fd8dd6c5b0b2fe8ee2310d50cb54ac743788d18`.
- **SHA-256 resultante:** `7d67b72bb25c17ce323591dc3b2c08cb8599d4083ad5b8ea1c1440509e6a33cb`.
- **Informe de origen:** `docs/contenido/leishmaniosis-perros-mayores/auditoria-correccion-antiparasitarios-r1.md` (rama `claude/auditoria-leishmaniosis-b868aa7`, PR #153).
- **Alcance:** solo LEI-A-104, LEI-A-105 y LEI-A-108. Los opcionales LEI-A-106 y LEI-A-109 y el diferido LEI-A-107 no se tocan.
- **Fuente:** [RCM 1326 ESP, collar con deltametrina](https://cimavet.aemps.es/cimavet/pdfs/es/ft/1326%20ESP/1326_ESP_ft.pdf), descargado el 2026-10-28 en una carpeta aislada y extraído con `pdftotext`.

## Volumen

Medido con `node .agents/skills/auditar-articulo-blog/scripts/metricas.mjs leishmaniosis-perros-mayores`. Cada ID se midió aplicado en solitario sobre `b868aa7`.

| Estado | Total | Δ |
|---|---|---|
| `b868aa7` | 5.211 | — |
| Solo LEI-A-104 | 5.212 | +1 |
| Solo LEI-A-105 | 5.231 | +20 |
| Solo LEI-A-108 | 5.208 | −3 |
| Los tres | **5.229** | +18 |

El máximo del contrato es 5.232. Queda a 3 palabras. El informe estimaba +11 para LEI-A-105, pero la frase sustituida tiene 6 palabras y la nueva 26. Como el total sigue dentro del contrato, no hizo falta compensar.

## LEI-A-104 — título del aviso de gatos (l. 314)

- **Antes:** `<AlertBox type="warning" title="Permetrina: precaución especial con los gatos">`
- **Después:** `<AlertBox type="warning" title="Antiparasitarios para perros: precaución con los gatos">`
- **Fuente y localización:** el cuerpo del aviso ya trata la permetrina (RCM 3212 §3.5) y el collar con deltametrina (RCM 1326 §3.3: «No usar en gatos»). El título no añade datos, solo deja de anunciar un único principio activo.
- **Palabras:** 5.211 → 5.212 (+1).
- **Criterio de cierre:** `grep -n 'title="Antiparasitarios para perros' <mdx>` devuelve la l. 314. Resultado: `314:<AlertBox type="warning" title="Antiparasitarios para perros: precaución con los gatos">`.

## LEI-A-105 — alergia a la deltametrina (l. 257)

- **Antes:** «Sigue también sus precauciones de contacto.»
- **Después:** «Si alguien de casa tiene alergia conocida a la deltametrina, la ficha indica evitar el contacto con el collar y con el perro que lo lleva.»
- **Fuente y localización:** RCM 1326 §3.5: «Las personas con hipersensibilidad conocida a la deltametrina deben evitar todo contacto con el medicamento veterinario y el perro tratado.»
- **Contraste con la ficha:** la frase nueva no dice más que la ficha. «Alergia» es la glosa que da la propia ficha en la frase anterior («reacciones de hipersensibilidad (alergia)»). «El collar» es el medicamento veterinario y «el perro que lo lleva» es el perro tratado. Omite «todo» y limita el sujeto a «alguien de casa», así que es algo menos amplia que la ficha, no más. Se aplica tal como la redactó el informe.
- **Palabras:** 5.211 → 5.231 (+20).
- **Criterio de cierre:** `grep -c "alergia conocida a la deltametrina"` = 1 en el H2 de prevención. Resultado: 1 coincidencia en el MDX, en la l. 257, dentro de «Protegerlo de los flebotomos».

## LEI-A-108 — organismos acuáticos (l. 259)

- **Antes:** «Protege también a los peces y otros organismos acuáticos.»
- **Después:** «Protege también a los organismos acuáticos.»
- **Fuente y localización:** RCM 3212 §3.5: «La permetrina puede tener efectos adversos en los organismos acuáticos». RCM 1326 §3.5 menciona «peces y otros organismos acuáticos». La frase introduce el párrafo del spot-on, así que la versión general vale para las dos fichas.
- **Palabras:** 5.211 → 5.208 (−3).
- **Criterio de cierre:** la frase de la l. 259 no contiene «peces». Resultado: `259:Protege también a los organismos acuáticos. La ficha del spot-on citado…`.

## Copias sincronizadas

- `docs/contenido/leishmaniosis-perros-mayores/articulo-borrador.mdx`: idéntica byte a byte al MDX publicado (`cmp` sin diferencias).
- `docs/contenido/leishmaniosis-perros-mayores/articulo-lectura.md`: las mismas tres sustituciones. El título del aviso aparece ahí como encabezado `### Antiparasitarios para perros: precaución con los gatos`.

## Comprobaciones de autor (no son un veredicto)

- `python3 .agents/skills/references/scripts/tono.py`: 0 muletillas, 0,0/1000.
- `npx astro build`: termina sin errores. La página HTML y la proyección Markdown (`agent-content/v1/documents/article--leishmaniosis-perros-mayores.md`) contienen el título nuevo y la frase de la alergia. Ninguna contiene «peces y otros».
- Sin marcas comerciales, dosis ni pautas. Tú/vosotros sin cambios. Ninguna otra línea modificada.

## Pendiente

Auditoría delta R2 independiente sobre el SHA-256 `7d67b72b…6a33cb`.
