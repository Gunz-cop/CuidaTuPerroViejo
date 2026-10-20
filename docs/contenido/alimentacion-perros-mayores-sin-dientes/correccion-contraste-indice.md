# Corrección de contraste del índice del artículo

Fecha: 2026-10-19. Rol: corrección técnica, sin veredicto independiente. Trabajo de creación/QA previo a auditoría R1 del artículo completo; no modifica ni reabre el brief cerrado en R3.

Archivo: `src/components/PostReader.astro:72`, encabezado desktop «Contenido del artículo».

Cambio único en producto: `text-brand-primary/80` → `text-brand-primary` en ese `h4`. Se retira la transparencia del color de texto para resolver el contraste insuficiente sin cambiar tamaño, estructura ni estilos globales. Leídos el contexto del componente y `docs/migracion-stack/README.md` antes de editar.

Evidencia anterior: `/tmp/feeding-qa-final.log`, línea 5, hallazgo `color-contrast` de impacto serious para selector `.text-brand-primary\/80`: contraste **4:1**, primer plano `#698170` sobre `#faf9f4`, texto bold de **12 px**, mínimo exigido **4,5:1**. La evidencia identifica el encabezado del índice; no corresponde a `ArticleByline`.

- SHA256 componente antes: `ba11941f07fe4dc8db6c16473e94b86463e240f22e3725e66eeae87a1e0abbbb`.
- SHA256 componente después: `5ff31e567aec7ca2cda748e9b394f9a46628f968e9f38d2fd0f4ca344870a7cd`.

Se confirmó coincidencia exacta y única del encabezado antes del reemplazo. No se ejecutaron build/check ni pruebas espejo; la medición real de contraste final y el rebuild corresponden al responsable de QA. Este registro no afirma todavía un ratio posterior ni APTO. No se tocaron MDX, componente visual específico, brief, dependencias ni CSS global. Sin commit, push, fusión ni despliegue.
