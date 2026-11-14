# Ejecución del proceso interno — cierre

Fecha: 2026-11-14. Encargo del propietario: primero procesos internos; demanda y páginas después. Implementado en PR #181, dependiente del PR de investigación/plan #180. Sin merge ni despliegue.

## Resultado

Seis unidades implementadas y auditadas de forma independiente, seguidas de integración final APTO R2. La unión final contiene 23 archivos de proceso y herramientas internas. Los snapshots por archivo identifican lo aprobado; no se atribuye la aprobación de un hash viejo a la versión nueva.

| Unidad | Alcance | Cierre | Historial |
| --- | --- | --- | --- |
| U01 | Contrato 2.0, generador/plantilla de brief, calidad y AGENTS | APTO R2 | R1 restauró como hallazgo el criterio explícito de calidad de fuentes; R2 lo verificó y recuperó YAML de entrega |
| U02 | Auditora de brief, formato y taxonomía | APTO R2 | R1 detectó cierre narrativo separado y cuotas antiguas; R2 verificó sincronización |
| U03 | Redacción, plantilla y referencias técnicas/visuales | APTO R1 | Schema/pipeline/firma actuales, recorrido y controles conservados |
| U04 | Auditora de artículo, formatos, parser/CLI, tests y fixtures | APTO R5 | R1 cabecera inválida que caía a legado; R2 aprobado inicialmente; I01 de integración reabrió R3; R3 interpretación parcial; R4 ambigüedad; R5 cierre con desambiguación explícita |
| U05 | Creación de herramientas según tipo | APTO R1 | Cálculos, registros y orientación; datos, evidencia, accesibilidad y recursos |
| U06 | Auditoría de herramientas según tipo | APTO R1 | Simetría con U05 y decisiones del propietario preservadas |
| U07 | Integración del flujo, no una unidad que reinicie los contadores | APTO R2 | R1 I01 detectó fallo fuente→sección; R2 comprobó cierre tras U04 R5 |

Hay 14 rondas independientes documentadas, no cinco ceremoniales después de aprobar. Correcciones conservan contador. U04 agotó su quinta ronda y aprobó: no se abre una sexta de oficio. Si aparece un fallo nuevo en esa unidad se detiene para decisión del propietario. La siguiente unidad de alcance diferente comienza R1. Los auditores escribieron informes; no corrigieron los objetos evaluados.

## Evidencias

- [Informe independiente de integración](auditoria-flujo-editorial.md), [R1](auditorias/U07-R1.md), [R2](auditorias/U07-R2.md) y snapshots correspondientes.
- Cada unidad conserva R1 y sus rondas posteriores en `auditorias/`, con hashes, hallazgos e instrucciones.
- Suite final: 41/41 tests del parser/CLI, con contratos legado/2.0, ceros, campos ausentes/duplicados/malformados, versión desconocida, fuentes y recursos faltantes, títulos desconocidos/ambiguos y H2-n para desambiguar.
- Comando: `node --test --experimental-test-isolation=none .agents/skills/auditar-articulo-blog/scripts/metricas.test.mjs`. Esta máquina restringe creación de procesos Node hijos; el aislamiento desactivado permite ejecutar y contar los casos reales. No se presenta el subtest único del runner por defecto como 41 pruebas.
- Línea base antes de U04: 5 tests, 3 pasaban y 2 fallaban por depender de un artículo de producción cambiado y un brief anterior. Se aislaron fixtures sintéticos fuera de producción; no se editó un artículo para hacer pasar tests.
- Auditor de integración: 23 hashes, 41 tests, cuatro reproducciones independientes, 73 enlaces relativos comprobados contra árbol Git y diffcheck limpio.

## Alcance y siguiente paso

Se cambian instrucciones, plantillas, referencias, el auditor automático y sus pruebas. No se modifican `src/content/blog/`, pilares, herramientas publicadas, datos de usuario, configuración de stack o producción. No se ejecutó build de producto: no hubo cambios a ese producto; se ejecutaron las pruebas pertinentes del código interno y revisión documental independiente.

[Objetos](objetos.csv) registra base histórica y nuevos soportes/evidencias, distinguiendo fuentes del proceso, documentación y futuras piezas del piloto. `verificado` no significa `publicado`.

Siguiente: aportar/estudiar Search Console (F2), fijar línea base, seleccionar necesidades y encargar las primeras aplicaciones/pilotos con este contrato. No se redactan ni publican artículos en esta entrega.
