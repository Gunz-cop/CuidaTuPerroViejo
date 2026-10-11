# Cuida tu Perro Viejo: arquitectura para agentes

Fecha del programa: 2026-10-01; estado actualizado 2026-10-09. Base histórica del diagnóstico: `main@cdb0adece5d629f6b2473be7ea6e30c0b372ef1c`. Producto F2 desplegado: `d2bd342050811d41ee212730cb11fe07783994bd`; cierre documental aceptado: `67dacfec405935567f71b403cd80a56f5aebe952`.
Estado: F0 aceptada técnicamente con auditoría independiente PASS 3/5 y [ratificación del coordinador](evidencia/f0/cierre-arquitectonico.md). F1 aceptada técnicamente con [auditoría de implementación PASS 1/5](evidencia/f1/auditoria/auditoria-f1-implementacion-r1.md), [cierre arquitectónico](evidencia/f1/cierre-arquitectonico.md) y SDD previamente aprobada PASS 2/2. F1 [publicada y verificada](evidencia/f1/promocion-2026-10-06/resultado.md) el 2026-10-06 tras autorización del propietario: 71/100 Content Site, 33/100 All Checks y nivel 2/5.

El objetivo es maximizar la puntuación verificable de [isitagentready.com](https://isitagentready.com) y que un agente pueda descubrir el sitio, leer una guía con sus fuentes y advertencias, citarla y utilizar las herramientas existentes.

Esta sesión es responsable de arquitectura, planificación, especificaciones y revisión. Otras sesiones implementan. La base contiene documentación, evidencia y dos correcciones autorizadas: H2 → H1 del título principal del selector de movilidad y canonical/og:url de la home a `/`. La segunda resuelve el bug #45 mediante una sesión separada de Luna 6 con razonamiento bajo y auditoría independiente PASS (intento 1/5). No publica capacidades del programa.

## Documentos y autoridad

1. [Diagnóstico y medición](diagnostico.md): hechos observados y límites de la evidencia.
2. [Arquitectura objetivo](arquitectura.md): decisiones, contratos conceptuales y decisiones pendientes.
3. [Plan por fases](plan.md): entregables, dependencias, ownership, aceptación y reversión.
4. [Método SDD y traspaso](sdd.md): cómo convertir cada fase en una especificación ejecutable.
5. [Evidencia](evidencia/README.md): respuestas originales, solicitudes y referencias.
6. [SDD F1](fases/f1-politica-y-descubrimiento.md): publicada y verificada.
7. [SDD F2](fases/f2-lectura-markdown.md) y [contratos F2](fases/f2-contratos.md): proyección y negociación en entregas consecutivas; estado y auditorías en su encabezado.
8. [SDD F3](fases/f3-api-y-descubrimiento.md), [contratos](fases/f3-contratos.md) y [traspaso](fases/f3-traspaso.md): especificada, pendiente de auditoría independiente y ratificación; todavía sin implementación.
9. [SDD F0](fases/f0-medicion-y-contratos.md), [contratos F0](fases/f0-contratos.md) y [prompts de sesiones](fases/f0-prompts.md): primer encargo ejecutable.

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

F2 completa está **aceptada, auditada sin bloqueantes y publicada**: [cierre de producción](evidencia/f2/b/bug71-native-baseline-auditoria/produccion-cierre/resultado.md), bugs70/71 cerrados. Resultado real comparable: **86/100 contenido, 40/100 general, nivel 4 general**; el nivel 5 del perfil parcial de contenido no es resultado general. No se repiten pruebas o scans F2 para preparar la siguiente fase.

F3 se concreta en [SDD](fases/f3-api-y-descubrimiento.md), [contratos y anexos](fases/f3-contratos.md), [partición de issues](fases/f3-traspaso.md) y [decisiones/fuentes](evidencia/f3/decisiones.md). Primero auditoría independiente Sol/high, máximo 2 revisiones totales mismo auditor y sólo bloqueantes; después ratificación técnica del coordinador sobre SHA fijo. No crear issues de implementación ni lanzar programadores antes de esos gates.

Las futuras entregas F3A→F3B→F3C son consecutivas, **Luna6/high**, con auditoría de implementación Sol/high independiente, máximo 5 revisiones por issue con mismo auditor; quinta FAIL→bug/STOP. F4–F6 conservan alcance de planificación. Una ratificación técnica no autoriza promoción: `main` despliega producción y cualquier integración/publicación requiere su autorización específica, con una entrega concreta revisable. La base documental no garantiza igualdad de bytes HTML/CSS: cada build futuro se vincula al SHA final real.
