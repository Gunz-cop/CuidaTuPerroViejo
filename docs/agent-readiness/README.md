# Cuida tu Perro Viejo: arquitectura para agentes

Fecha: 2026-10-01. Base técnica: `main@cdb0adece5d629f6b2473be7ea6e30c0b372ef1c`.
Estado: F0 aceptada técnicamente con auditoría independiente PASS 3/5 y [ratificación del coordinador](evidencia/f0/cierre-arquitectonico.md). F1 aceptada técnicamente con [auditoría de implementación PASS 1/5](evidencia/f1/auditoria/auditoria-f1-implementacion-r1.md), [cierre arquitectónico](evidencia/f1/cierre-arquitectonico.md) y SDD previamente aprobada PASS 2/2. Ninguna mejora de estas ramas se ha promovido a producción.

El objetivo es maximizar la puntuación verificable de [isitagentready.com](https://isitagentready.com) y que un agente pueda descubrir el sitio, leer una guía con sus fuentes y advertencias, citarla y utilizar las herramientas existentes.

Esta sesión es responsable de arquitectura, planificación, especificaciones y revisión. Otras sesiones implementan. La base contiene documentación, evidencia y dos correcciones autorizadas: H2 → H1 del título principal del selector de movilidad y canonical/og:url de la home a `/`. La segunda resuelve el bug #45 mediante una sesión separada de Luna 6 con razonamiento bajo y auditoría independiente PASS (intento 1/5). No publica capacidades del programa.

## Documentos y autoridad

1. [Diagnóstico y medición](diagnostico.md): hechos observados y límites de la evidencia.
2. [Arquitectura objetivo](arquitectura.md): decisiones, contratos conceptuales y decisiones pendientes.
3. [Plan por fases](plan.md): entregables, dependencias, ownership, aceptación y reversión.
4. [Método SDD y traspaso](sdd.md): cómo convertir cada fase en una especificación ejecutable.
5. [Evidencia](evidencia/README.md): respuestas originales, solicitudes y referencias.
6. [SDD F1](fases/f1-politica-y-descubrimiento.md): implementación aceptada; publicación pendiente.
7. [SDD F0](fases/f0-medicion-y-contratos.md), [contratos F0](fases/f0-contratos.md) y [prompts de sesiones](fases/f0-prompts.md): primer encargo ejecutable.

Este README fija el objetivo y el estado; arquitectura fija las decisiones; el plan fija el orden; una futura spec fija la ejecución de una fase. Una spec no puede contradecir estos documentos sin registrar la decisión que los modifica. La evidencia describe observaciones, no decisiones.

## Línea base y objetivos

| Medición | Línea base | Objetivo |
|---|---:|---|
| Content Site, sus 7 controles | 43/100, 3 pasan y 4 fallan | 100/100, con los mismos 7 controles |
| All Checks, selección de la interfaz | 20/100, 3 pasan y 12 fallan | 80/100 estimado tras capacidades públicas; estudiar 100/100 con autenticación real |
| Nivel de preparación | 1/5, Basic Web Presence | 4/5 como hito; explorar 5/5 con las condiciones vigentes del evaluador |

Las metas futuras son hipótesis de planificación, no resultados obtenidos. No se cambia el conjunto de controles para declarar una mejora. La puntuación y el nivel se reportan por separado.

El sitio tiene publicidad y enlaces a terceros, pero el escáner no detectó comercio. No se prevén pagos, checkout ni protocolos de comercio como parte de este programa.

## Decisión del propietario

Confirmada en esta conversación: `search=yes`, `ai-input=yes`, `ai-train=no`. La implementación deberá expresar esta preferencia en Content Signals y evitar reglas de bots que la contradigan. Un Content Signal declara una preferencia; no demuestra que terceros la respeten.

## Próximo paso

Solicitar autorización para promocionar la cadena de PR aceptada y verificar P01–P03 de F1. Preparar la SDD de F2 con sus contratos de paridad y preview pública; no lanzar implementación sin spec auditada y SHA fijo. Los programadores continúan siendo **Luna 6, razonamiento alto**, con auditoría independiente y máximo cinco revisiones por issue. F2–F6 conservan alcance de planificación.

Los implementadores parten de una rama de trabajo. `main` despliega producción al recibir cambios: documentación, H1 y corrección del canonical se entregan en PR apilados y no se fusionan automáticamente.
