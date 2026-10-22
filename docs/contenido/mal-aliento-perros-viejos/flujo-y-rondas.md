# Flujo y separación de roles

Encargo: segundo artículo del plan del PR #122. Fecha de inicio: 2026-10-22.
Base: `main`; rama: `contenido/mal-aliento-perros-viejos`.

- Autor del brief y del texto: agente `autor_brief`.
- Auditor del brief: agente `auditor_brief`, sin permisos editoriales sobre el documento.
- Producción e integración visual: coordinación y productor de componentes separados de los auditores.
- Comprobación técnica de navegador: agente `qa_navegador`; sus pruebas no sustituyen la auditoría editorial.
- Auditor del artículo: agente `auditor_articulo`, que no creó ni corrigió texto o recursos.

Máximo tres rondas por documento. Los informes conservarán número, hash y alcance; una revisión textual provisional y su cierre integrado pertenecen al mismo contador del artículo. Un tercer NO APTO detiene el documento.

| Documento | Rondas consumidas al iniciar | Gate |
|---|---:|---|
| Brief | 0 | No redactar hasta APTO independiente |
| Artículo y recursos | 0 | No declarar APTO final sin recursos y pruebas completas |

El historial definitivo son los informes `auditoria-brief-rN.md` y `auditoria-articulo-rN.md`; esta tabla inicial no es un veredicto.

El trabajo se entrega mediante PR. No se fusiona, no se despliega y el inventario no se marca como publicado. No se incorporan informes, exportaciones ni métricas de Search Console.

## Cierre de contadores

| Documento | Ronda | Dictamen y alcance |
|---|---:|---|
| Brief | [1](auditoria-brief-r1.md) | NO APTO; retirar distinción digestiva no respaldada en el contrato. |
| Brief | [2](auditoria-brief-r2.md) | APTO; habilitó la redacción. |
| Artículo y recursos | [1](auditoria-articulo-r1.md) | NO APTO provisional; corrigió el autor, sin auditoría del corrector. Detectó además dos fallos originados en el contrato. |
| Brief | [3](auditoria-brief-r3.md) | APTO final; dolor intenso **o** constante y estado compatible con el catálogo. Tres rondas consumidas, sin cuarta. |
| Artículo y recursos | [2](auditoria-articulo-r2.md) | APTO con avisos preexistentes; conjunto integrado, recursos y pruebas completos. Dos rondas consumidas, sin reinicio. |

QA técnica conservó sus intentos y repeticiones; no se presentan como nuevas auditorías editoriales. El metadato menor del manifiesto señalado por R2 se corrigió a «ronda 3» sin alterar el contrato ni los hashes de producto auditados. No quedan bloqueantes locales nuevos. Los avisos compartidos y el desacuerdo del script editorial estricto están explicados en el informe final y en [validación](validacion.md).
