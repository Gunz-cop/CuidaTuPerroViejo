# Controles del autor — MDX final corregido para cierre integrado

Fecha: 2026-10-22. Autor/corrector: `/root/autor_brief`. **Control de producción; no auditoría independiente.**

- Contrato vigente APTO R3/3, SHA256 `24e9a3003c54d91350918eb7891635b6767c0c81afa1179448dc1e737cb57f9f`.
- Archivo final: `src/content/blog/mal-aliento-perros-viejos.mdx`.
- SHA256: `6913314b0400dd6d071296c682a2d724775cdecb03008ff1b0b4839349634deb`.
- Documento de cambios: `correcciones-articulo.md`. Borrador histórico R1 preservado; las métricas originales se conservan en `metricas-autor-texto.json`.
- Texto editorial útil: **5862 palabras**, −2,3% respecto al objetivo 6.000; excluye bibliografía, código, URLs y texto externo de componentes. El recorte útil indicado por el auditor no se compensó con relleno.
- Cuerpo MDX bruto sin frontmatter/imports: **6265 palabras**. No se utiliza como cifra de contenido útil.

## Tabla de verificación

| H2 / bloque | Palabras útiles reales | Target §6 | Desviación |
|---|---:|---:|---:|
| Introducción | 210 | 200 | +5.0% |
| Cuándo consultar por el mal aliento de tu perro | 641 | 650 | -1.4% |
| Qué puede decirte el olor y qué necesita una exploración | 437 | 450 | -2.9% |
| Causas en la boca, los dientes y los labios | 896 | 900 | -0.4% |
| Otras causas y los síntomas que ayudan a orientar la consulta | 785 | 800 | -1.9% |
| Qué observar y anotar antes de llamar | 580 | 650 | -10.8% |
| Cómo busca la causa el veterinario | 786 | 800 | -1.7% |
| Qué hacer mientras llega la consulta y qué evitar | 589 | 600 | -1.8% |
| Cómo valorar la evolución después de la consulta | 398 | 400 | -0.5% |
| Conclusión y preguntas frecuentes | 540 | 550 | -1.8% |

Todos los bloques dentro de ±15%. Densidad medida sobre 133 párrafos: media **37.2**, mediana **37**, **0.0%** por encima de 50, máximo50. Cadencia: **34 H3**, ningún tramo superior a 200 palabras, según desglose JSON.

Comandos ejecutados:

```bash
python3 docs/contenido/mal-aliento-perros-viejos/contar-articulo.py src/content/blog/mal-aliento-perros-viejos.mdx
python3 .agents/skills/references/scripts/tono.py src/content/blog/mal-aliento-perros-viejos.mdx
git diff --check
```

Tono vigente: **5.602 palabras en su recorte, 2 muletillas, 0,4/1.000**. El script usa exclusiones distintas y esa cifra no es el volumen útil completo. `git diff --check` sin incidencias.

## Cobertura preservada del contrato

| Control | Comprobación del autor |
|---|---|
| Metadatos | SEO 55 / meta 148 caracteres; enum salud-perros-mayores; fecha 22 de octubre de 2026; `status` omitido según contrato R3 |
| Caso y autoría | Guía sin caso declarada; sin pacientes/experiencias/credenciales inventados; firma e IA automatizadas por layout |
| Urgencias | Caja y desarrollo dicen dolor intenso **o** constante; prioridad por signos/estado, nunca diagnóstico por olor |
| Fuentes | Las doce URL y sus usos permanecen idénticos a R1, en sus H2 y cuadro bibliográfico; no nuevas definiciones o afirmaciones clínicas |
| F1/F2/F3 | UC Davis H2 olor/causas/evaluación; Merck periodontal causas/evaluación; PDSA halitosis consulta/olor/seguimiento |
| F4/F5/F6 | Merck mouth causas/observación/espera; Cornell dental observación/evaluación/espera; Merck cuándo consultar, primer H2 |
| F7/F8/F9 | PDSA renal y Merck pancreas en otras causas; AAHA assessment observación/evaluación |
| F10/F11/F12 | AAHA Senior evaluación/seguimiento; FDA en seguridad durante espera; Illinois en bultos/lesiones |
| Enlaces | Los cuatro destinos contextuales de pilar, dental, chequeo y calidad de vida siguen presentes |
| Cajas y FAQ | Tres cajas narrativas info/danger/warning más bibliográfica info; FAQ de 7 preguntas cerrado por componente |
| Diferenciación | Sin tutorial de cepillado/productos/profilaxis; causas, acompañantes, decisiones y consulta |
| Recursos | R1 en frontmatter; R2/R3 en figuras dimensiones/srcset/alt; R4 prioridad, R5 proceso, R7 registro importados; R6 TablaApilable, 4 filas y 3 columnas, con data-label y wrapper |

La trazabilidad detallada fuente→afirmación→H2 de producción está en `controles-autor-texto.md` y no se presenta como una nueva auditoría. La verificación independiente de fuentes e imágenes de R1 pertenece al auditor del artículo, con sus límites documentados.

## Pruebas integradas pendientes de coordinación y auditor

Este cierre del autor no sustituye build/check, proyección Markdown ni navegador. Raíz y QA comprobarán versión integrada, enlaces, decodificación/srcset, alturas a 375/390/1366 px en claro/oscuro, contraste/foco/teclado, animación/pausa/fin/repetición/reduced-motion/noJS/impresión y valores del registro. El productor es responsable de las correcciones de R4/R7 y de su expediente de producción. La auditoría del artículo continúa su contador único: siguiente ronda 2/3.

El artículo queda congelado para esas pruebas y su cierre independiente. No se ha modificado el brief APTO ni el inventario final. No se ha fusionado ni desplegado.
