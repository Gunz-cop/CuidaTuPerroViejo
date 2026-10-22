# Correcciones del autor al artículo

Autor/corrector: `/root/autor_brief`. Este documento registra trabajo de producción, no emite un dictamen independiente y no altera los informes del auditor.

## Después del artículo R1 — 2026-10-22

- Informe recibido: `auditoria-articulo-r1.md`, NO APTO provisional, ronda 1/3 del mismo artículo completo. La revisión integrada siguiente será ronda 2, no una ronda visual nueva.
- Documento auditado R1: `borrador-articulo.mdx`, SHA256 `b54e772218e4609c4bb50037a2e410e36a995dc4de865b3520648f5bca3b30b3`. **Se conserva idéntico como evidencia histórica**, incluida su etiqueta de estado defectuosa; no es el archivo final servible.
- El hallazgo de origen en el brief se corrigió y pasó la tercera y última auditoría del brief: `auditoria-brief-r3.md`, SHA256 `24e9a3003c54d91350918eb7891635b6767c0c81afa1179448dc1e737cb57f9f`. El autor leyó ese APTO antes de modificar el MDX final.

### P1: resumen del dolor

En `src/content/blog/mal-aliento-perros-viejos.mdx`, caja danger, se cambia «dolor intenso constante» por **«dolor intenso o constante»**, para mantener la indicación de F6 y del desarrollo. El productor corrige por separado el resumen visual de R4; este registro no afirma una prueba de navegador propia de esa corrección.

### P1: estado técnico incompatible con catálogo

Se omite `status` del frontmatter final conforme al contrato R3. El schema real aplica el default técnico necesario para que el catálogo/proyección incluya la entrada. El estado editorial no publicado sigue en inventario/expediente y la rama continúa sin despliegue. No se modifica `src/lib/assistant/catalog.ts` ni reglas globales.

El primer build fallido y sus errores pertenecen a la evidencia de coordinación; el autor no los presenta como ejecutados personalmente. La coordinación repetirá build/proyección sobre el artículo corregido.

### P2: recordatorios repetidos en observación

Se elimina de «Qué fotos o vídeos sí ayudan» la segunda propuesta de una nota común entre cuidadores y la reiteración de dejar datos desconocidos en blanco. «Un registro breve…» conserva la indicación de datos desconocidos y ahora especifica «libreta compartida». Permanecen ejemplos concretos, documentos útiles y seguridad de grabación. No se añade contenido para compensar el recorte.

### Versión corregida y controles

Archivo final: `src/content/blog/mal-aliento-perros-viejos.mdx`; SHA256 `6913314b0400dd6d071296c682a2d724775cdecb03008ff1b0b4839349634deb`.

Conteo reproducido con `contar-articulo.py` sobre ese archivo: **5.862 palabras útiles, 6.265 brutas**, cada bloque dentro de ±15%. El resultado se conserva en `metricas-autor-final.json`, separado de las métricas del borrador auditado R1. Tono: 0,4/1.000; párrafos >50 palabras: 0%; H3: ningún tramo >200 palabras.

No se modifican contenido científico, fuentes, estructura, enlaces o recursos contratados más allá de los cambios descritos. El brief APTO y el borrador histórico conservan sus hashes. No se cambia el inventario final, no se audita, no se hace commit/push ni se fusiona/despliega.
