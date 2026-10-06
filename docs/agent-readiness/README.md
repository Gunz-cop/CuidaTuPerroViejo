# Cuida tu Perro Viejo: arquitectura para agentes

Fecha: 2026-10-01. Base técnica: `main@cdb0adece5d629f6b2473be7ea6e30c0b372ef1c`.
Estado de cada fase: consultar su SDD y el issue de lanzamiento con el informe de auditoría. F0 se inició y se detuvo por un defecto de canonical; su reanudación se rige por la nueva base auditada y fijada en el issue #43. Ninguna fase ha sido aceptada.

El objetivo es maximizar la puntuación verificable de [isitagentready.com](https://isitagentready.com) y que un agente pueda descubrir el sitio, leer una guía con sus fuentes y advertencias, citarla y utilizar las herramientas existentes.

Esta sesión es responsable de arquitectura, planificación, especificaciones y revisión. Otras sesiones implementan. La base contiene documentación, evidencia y dos correcciones autorizadas: H2 → H1 del título principal del selector de movilidad y canonical/og:url de la home a `/`. La segunda resuelve el bug #45 mediante una sesión separada de Luna 6 con razonamiento bajo y auditoría independiente PASS (intento 1/5). No publica capacidades del programa.

## Documentos y autoridad

1. [Diagnóstico y medición](diagnostico.md): hechos observados y límites de la evidencia.
2. [Arquitectura objetivo](arquitectura.md): decisiones, contratos conceptuales y decisiones pendientes.
3. [Plan por fases](plan.md): entregables, dependencias, ownership, aceptación y reversión.
4. [Método SDD y traspaso](sdd.md): cómo convertir cada fase en una especificación ejecutable.
5. [Evidencia](evidencia/README.md): respuestas originales, solicitudes y referencias.
6. [SDD F0](fases/f0-medicion-y-contratos.md), [contratos F0](fases/f0-contratos.md) y [prompts de sesiones](fases/f0-prompts.md): primer encargo ejecutable.

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

Tras PASS de auditoría de esta revisión de reanudación y publicación de la base exacta en el issue, reanudar la misma sesión F0 de **Luna 6, razonamiento alto**, usando su [prompt](fases/f0-prompts.md) y el [registro de reanudación](fases/f0-reanudacion-2026-10-05.md). Entrega tooling, evidencia y un spike aislado; una sesión distinta verifica sus doce criterios. El coordinador ratifica las decisiones técnicas y concreta F1/F2 sobre esos resultados. Las fases siguientes conservan alcance de planificación.

Los implementadores parten de una rama de trabajo. `main` despliega producción al recibir cambios: documentación, H1 y corrección del canonical se entregan en PR apilados y no se fusionan automáticamente.
