# Cuida tu Perro Viejo: arquitectura para agentes

Fecha: 2026-10-01. Base técnica: `main@cdb0adece5d629f6b2473be7ea6e30c0b372ef1c`.
Estado: **plan propuesto; implementación no iniciada**.

El objetivo es maximizar la puntuación verificable de [isitagentready.com](https://isitagentready.com) y que un agente pueda descubrir el sitio, leer una guía con sus fuentes y advertencias, citarla y utilizar las herramientas existentes.

Esta sesión es responsable de arquitectura, planificación, especificaciones y revisión. Otras sesiones implementan. Este cambio contiene documentación y evidencia; no cambia el sitio.

## Documentos y autoridad

1. [Diagnóstico y medición](diagnostico.md): hechos observados y límites de la evidencia.
2. [Arquitectura objetivo](arquitectura.md): decisiones, contratos conceptuales y decisiones pendientes.
3. [Plan por fases](plan.md): entregables, dependencias, ownership, aceptación y reversión.
4. [Método SDD y traspaso](sdd.md): cómo convertir cada fase en una especificación ejecutable.
5. [Evidencia](evidencia/README.md): respuestas originales, solicitudes y referencias.

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

Concretar la spec de F0: medición reproducible, inventario público y compuerta de evidencia. Después, concretar F1. Las fases siguientes tienen alcance de planificación; todavía no autorizan a un ejecutor a improvisar contratos o arquitectura.

Los implementadores parten de una rama de trabajo. `main` despliega producción al recibir cambios: este plan se entrega en PR de documentación y no se fusiona automáticamente.
