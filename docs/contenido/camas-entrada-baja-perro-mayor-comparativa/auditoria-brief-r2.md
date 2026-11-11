# Auditoría del brief — camas de entrada baja (ronda 2 de 3)

- **Documento:** `briefings/briefing-camas-entrada-baja-perro-mayor-comparativa.md`, commit `d794063`.
- **Fecha:** 11/11/2026. **Rol:** auditor externo (`auditar-briefing-contenido` + `generar-briefing-afiliados`). Solo se ha creado este archivo.
- **Contrastado con:** auditoría r1, `generar-briefing-afiliados` y su plantilla (versión de `d794063`), `docs/seo/afiliacion-aliexpress.md`, `docs/afiliacion/prospectos-afiliados.md`, `src/content.config.ts`, la guía de camas publicada, `prevencion-caidas-perro-mayor.mdx`, `AlertBox.astro` e `INVENTARIO_CONTENIDO.md`.

## Veredicto

**Aprobado con cambios.** Los 16 hallazgos de r1 están resueltos. Queda un fallo nuevo de P1: el frontmatter y la skill usan el campo `pillar`, pero el schema es `z.strictObject` con el campo `pilar`. Un MDX copiado del brief no compila. La corrección es de una línea en el brief y otra en la skill y su plantilla, y no hace falta otra ronda de auditoría completa.

**Esto no autoriza todavía la redacción.** Los bloqueos de §12 siguen abiertos y el propio brief los declara: las fichas B y C están vacías, falta la superficie y la entrada de la variante A, el precio habitual MX, el coste total ES y la decisión sobre la ficha piloto.

## Estado de los hallazgos de r1

| r1 | Estado | Comprobación |
| --- | --- | --- |
| P0-1 umbrales sin fuente | Resuelto | §4 no tiene cifras salvo la medida del perro. La frase introductoria coincide con la FAQ de la guía («No se establece una cifra clínica universal», línea 106) |
| P0-2 «10–25 cm» | Resuelto | «unos 10–13 cm por eje (10,2–12,7)». Lo recalculé: 10,7 / 10,2 / 12,7 / 10,9 / 11,4 / 11,2 |
| P0-3 fila asignada a 71 cm | Resuelto | El título y el diagrama están separados. «Ninguna cifra del diagrama se asigna a la de 71 cm» es coherente con la guía de afiliación (línea 55) |
| P1-4 frontmatter / título | Resuelto en lo pedido | `seoTitle` mide 51, `metaDescription` 159 y el H1 80 (medidos con `len()`). **Pero ver el hallazgo nuevo N1** |
| P1-5 presupuesto | Resuelto | 80+150+250+850+180+120+120+150+80 = 1 980; máximos = 2 480. Coincide con §1 |
| P1-6 precio promocional | Resuelto | MX habitual `pendiente`; la oferta queda fuera de la tabla. ES con aranceles `pendiente`. Bloqueo 4 añadido |
| P1-7 F4 y marco legal | Resuelto | Todas dan HTTP 200 el 11/11, y comprobé el contenido (ver tabla de fuentes) |
| P1-8 componentes | Resuelto | Info, warning y danger existen en `AlertBox.astro` (`type?: 'info' \| 'warning' \| 'danger'`). La FAQ tiene 4 preguntas y existe `FAQ.astro` |
| P1-9 prompt I-1 | Resuelto | 8 bloques, 5 rasgos senior, línea de rechazo móvil, aceptación y alt por pieza. Recuento de razas en `heroImageAlt` (10 casos): cocker 4, beagle 3, labrador 2, golden 1, dogo 1, mestizo/a 2. Coincide con el brief |
| P1-10 voz y tono | Resuelto | La cabecera y §12 remiten a la guía y a `tono.py` |
| P1-11 procedencia | Resuelto | El texto de §2 coincide con la línea 85 de la guía. Ya no aparece «~12–15 kg» |
| P1-12 `Sustentado en` | Resuelto | Lo llevan todas las secciones. F5 y F6 son trazables |
| P2-13 ficha C | Resuelto | Se presenta como contraste explícito y se documenta la regla de sustitución |
| P2-14 anclas | Resuelto | «Cama y zona de descanso» (l. 66) y «Tracción: comprueba el conjunto, no solo el material» (l. 33) existen |
| P2-15 inventario | Resuelto | `INVENTARIO_CONTENIDO.md:262`, `[~] … (En Briefing — afiliados)` |
| P2-16 «Para quién» A | Resuelto | `pendiente`, como criterio propio |
| Skill y listado | Resuelto, salvo N1 | La skill añade las reglas 9 y 10 y la sección «Lo que sigue vigente», con la ley ES precisa. El listado marca los tickets como estimación sin captura, deja la horquilla de comisión `pendiente`, registra el dato observado y amplía el prospecto 1 de pequeño-mediano a grande |

## Hallazgos nuevos

### P1

- **N1. El frontmatter usa `pillar`, pero el schema define `pilar`.** `src/content.config.ts` usa `z.strictObject({ … pilar: z.enum([...]) … })`. Con `pillar`, el build fallaría por dos motivos: la clave no está permitida y falta `pilar`, que es obligatorio. El error está en el bloque YAML de §1 y en la skill y su plantilla («Lo que sigue vigente», viñeta de frontmatter, y §1 de la plantilla), así que se propagará a los briefs de rampas y carritos. La nota «el redactor comprueba los nombres exactos» no compensa que el contrato dé un nombre equivocado.
  - De paso, el bloque omite `keywordPrincipal` y `status`, que usa la guía publicada (son opcionales o tienen valor por defecto). Además, `datePublished: pendiente` va sin comillas y `heroImage: "pendiente (I-1)"` es una cadena que validaría como ruta. Hay que marcar ambos como marcadores que no pueden llegar al MDX.

### P2

- **N2. §10 dice «bloque completo en §7 del artículo».** El artículo no tiene §7; el bloque completo es la sección 8 de la estructura («Cómo elegimos y cómo ganamos dinero»). Hay que cambiar la referencia.
- **N3. Raza de I-1.** «Mestizo/a» ya aparece 2 veces en `heroImageAlt`, igual que labrador. La elección está justificada por el tamaño y la silueta, así que se acepta. Solo hay que añadir al bloque de raza que el mestizo ya se usó dos veces y que se diferencia por el tipo pastor y el pelo fuego y negro.
- **N4. F1 y F2 siguen sin leerse en texto completo** (AAHA devuelve 403, como en r1). Ya no condicionan el veredicto, porque el brief solo les atribuye afirmaciones cualitativas («adaptar el entorno», «superficie acolchada como medida de soporte») que la guía publicada ya sostiene con la misma cita. El redactor no debe atribuirles nada más.

## Verificación de fuentes

| Fuente | Identificador | Resultado | Atribución en el brief |
| --- | --- | --- | --- |
| F1 AAHA 2023 Senior, Pain Management | URL profunda | Existe (r1). Texto con 403 | Cualitativa, correcta |
| F2 AAHA 2022 Nonpharmacologic Modalities | URL profunda | Existe (r1). Texto con 403 | Cualitativa, correcta |
| F3 Guía de afiliación (diagrama) | Documento interno, l. 55 | Verificada, cifras recalculadas | Correcta (10,2–12,7 cm; sin asignar fila) |
| F4 CE Influencer legal hub | `influencer-legal-hub_en` | HTTP 200. Es la misma URL que cita la guía (l. 69) | Correcta |
| F5 Guía de camas | MDX publicado | Verificada: H2 citados, l. 85, FAQ l. 106 | Correcta |
| F6 Capturas 10/11/2026 | Guía de afiliación, l. 57–58 | Coinciden: MX$774.61 oferta, 23–26 nov, Aguascalientes; 53,39 € IVA incl., 15 dic–6 ene, A Baña, aranceles al pagar | Correcta |
| TRLGDCU | BOE-A-2007-20555 | HTTP 200; el título es el RDL 1/2007 | Correcta |
| Ley General de Publicidad | BOE-A-1988-26156 | HTTP 200; el título es la Ley 34/1988 | Correcta |
| LSSI art. 20 | BOE-A-2002-13758 | HTTP 200; art. 20.1: comunicaciones comerciales «claramente identificables» | Correcta |
| LFPC art. 32 | `diputados.gob.mx/LeyesBiblio/pdf/LFPC.pdf` | HTTP 200; art. 32: publicidad «veraz, comprobable, clara…» | Correcta |
| Ficha A | `es.aliexpress.com/item/1005009119696851.html` | HTTP 200 | Datos `pendiente` donde corresponde |

## Instrucciones (para otra sesión)

1. **Brief §1:** cambia `pillar` por `pilar` en el YAML. Añade `keywordPrincipal: "cama perro mayor entrada baja"` y `status`. Pon comillas a los marcadores y anota que `heroImage` y `datePublished` no pueden llegar al MDX con el texto «pendiente».
2. **Skill `generar-briefing-afiliados` y plantilla:** sustituye `pillar` por `pilar` en las dos menciones y añade `keywordPrincipal`.
3. **§10:** cambia «bloque completo en §7 del artículo» por «bloque final “Cómo elegimos y cómo ganamos dinero” (sección 8 de la estructura)».
4. **§8:** en la nota de raza, añade que «mestizo/a» ya aparece 2 veces y cómo se diferencia.
5. No hace falta una ronda r3 completa por estos cambios: basta con que el redactor compruebe el N1 contra `src/content.config.ts`. La redacción sigue condicionada a cerrar los 4 bloqueos de §12. Cuando entren los datos de las fichas B y C, conviene que quien los aporte no sea quien audite la tabla resultante.

Ronda 2 de un máximo de 3.
