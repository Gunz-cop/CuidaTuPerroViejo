# Checklist para convertir F4B en contrato ejecutable

**Todos los checks siguientes están pendientes.** La preparación documental no los satisface por anticipado. Orden obligatorio: F4A aceptada → incorporar su cierre/contratos → resolver huecos → auditoría formal → congelado final. No autoriza programación al completar sólo una sección.

## 1. Admitir F4A real

- [ ] Obtener cierre aceptado con SHA/tree completos, SDD/contratos ratificados, auditoría independiente, estado técnico/publicación y links permanentes (D01).
- [ ] Fijar base real F4B y rama/destino draft propios después de comprobar ancestry e integración aceptada; no usar la base F3 de investigación como base de cálculo futura.
- [ ] Incorporar inventario/nombres/versions/registro, módulos/exports/firmas, inputs/outputs/defaults/normalización y errores reales (D02–D04/D06/D08).
- [ ] Incorporar metodología/unidades/umbrales/redondeos/avisos y fixtures UI/API/WebMCP, min/max/invalid/frontera (D05).
- [ ] Incorporar cancelación/límites/privacidad/runtime, máximos reales de entrada/salida y evidencia build/preview/rollback (D06/D07/D10).
- [ ] Cotejar diff F4A y cerrar ownership compartido en serie (D09). Ningún archivo F4A sigue asignado a dos sesiones a la vez.
- [ ] Revisar todas las marcas PENDIENTE F4A del paquete; resolverlas con evidencia, conservar historial y listar cualquier remanente bloqueante.

## 2. Resolver fuentes y arquitectura

- [ ] Resolver G02 con autoridad vigente de Server Card, estado/versionado/schema exactos y decisión explícita si se adopta un draft; no inferir aceptación por SEP Final.
- [ ] Reconsultar protocolo/SDK/Cloudflare/card/ARD vigentes; guardar versiones/fechas/originales/digests y divergencias. No actualizar contratos ratificados históricos por arrastre.
- [ ] Fijar SDK/imports/validador/library schemas y lockfile exactos; comprobar compatibilidad de peers si se elige alternativa Cloudflare; ninguna dependencia «latest».
- [ ] Resolver G03 mediante evidencia autorizada de bundle/startup/workerd y presupuesto, o encargo previo explícito posterior a F4A; no llamar «compatible» a una lectura de README.
- [ ] Elegir definitivamente reutilización de búsqueda/lectura: funciones aceptadas F4A o handler F3 interno fijo; fijar signatures/bindings y diferencias HTTP→JSON sin duplicar algoritmo.
- [ ] Resolver G04: cancelación modern/legacy, signal disponible, trabajo residual y aislamiento; registrar qué garantía es obligatoria. Sin map global por requestId ni auth/sesiones por suposición.

## 3. Completar anexos normativos

- [ ] Fijar endpoint único/métodos/no aliases, card URI/MIME/schema/identidad, versiones admitidas y registro/entries/descriptions/generación exactas a partir de los contratos aceptados.
- [ ] Fijar negociación moderna/legacy, `server/discover`, initialize/initialized, ping/notificaciones y métodos no ofrecidos; headers/metadata/paridad de versiones y política de errores.
- [ ] Fijar nombres tool/orden/descriptions/annotations y schemas autocontenidos de arguments/output, cerrados en dominio y con semántica de normalización/errores. No reducir lectura íntegra para caber.
- [ ] Adjuntar ejemplos **completos** válidos/invalidos para cada operación y revisión, incluyendo corpus cambiado, schema inválido, unknown tool, malformed JSON/batch, errores y resultados máximos; todos derivan de fixtures reales.
- [ ] Fijar status/headers/body/error code/mensajes sanitizados y precedencia exactos, diferenciando transport/protocol/isError. No reflejar inputs ni exceptions del SDK.
- [ ] Fijar caps inclusivos y comportamiento +1: body streaming, metadata/profundidad, ID, salida completa/envelope/SSE, list/card, deadline y trabajo/cálculos. Probar expansión por escaping/duplicación.
- [ ] Fijar Origin/Host por entorno y clientes permitidos, OPTIONS/CORS/errores/cache/security, política de cookies/credentials y métricas sin datos de usuario.
- [ ] Fijar rate limiter con binding/namespace reales independientes, periodo/key/recovery/Retry-After y comportamiento ante fallo; declarar local/eventual. Cuota global estricta requiere decisión separada.
- [ ] Fijar dispatch/config/routing real sobre F4A, preservando rutas/headers/cache F1–F3 y comportamiento UI/WebMCP; no run_worker_first global sin decisión.

## 4. Verificación, operación y entrega

- [ ] Fijar clientes/versiones/camino moderno y legacy con evidencia wire; seleccionar cliente legacy explícito, no inferirlo de fallback automático.
- [ ] Convertir C4B-01–14 en criterios cerrados con comandos/scripts/paths de tests/evidencia reales, oracle F4A/F3, invocación CI efectiva y preview/receipt del SHA final.
- [ ] Fijar plan/cuotas compartidas reales, CPU cold/warm/pico, memoria/bundle, presupuesto/alertas y responsable de desactivación. Distinguir ejemplo tarifario de factura/presupuesto aprobado.
- [ ] Fijar diff/commits/orden de integración y rollback concreto: retirar MCP/discovery coherentemente, preservar API/UI/WebMCP F4A y F3; TTL/purga si procede, nuevo receipt y verificación exterior.
- [ ] Fijar P4B-01–03, autorización separada y baseline real posterior a F4A; scores futuros siguen hipótesis hasta medición comparable.
- [ ] Registrar limitaciones/originales sanitizados/proyecciones y política de bug/STOP si faltan contrato, receipt, entorno o evidence esencial.

## 5. Auditoría formal y congelado final

- [ ] Crear snapshot documental fijo **tras incorporar el cierre y contratos reales F4A**, con tree/diff/manifest y lista de cambios. No cambiar fuentes/base durante auditoría sin nuevo snapshot.
- [ ] Auditor independiente del autor verifica sólo bloqueantes, dependencias, coherencia, fuentes, contracts, límites, ownership, criterios, operación y rollback. Informe/contador/SHA y resultado separados.
- [ ] Corregir sólo lo señalado por el proceso aplicable; PASS formal registrado no sustituye ratificación técnica ni autorización de despliegue.
- [ ] Coordinador ratifica paquete final y fija SHA/tree/base de lanzamiento y deltas documentales respecto al snapshot auditado. **Éste es el congelado final; no existe hoy.**
- [ ] Cada issue posterior recibe datos de admisión completos y contratos congelados; sin huecos esenciales. Abrir/encargar implementación sólo con autorización aplicable y después de F4A.

Hasta completar estos gates, etiqueta obligatoria: **borrador no ratificado/no ejecutable**. Ante un hueco esencial, conservar evidencia y detener la parte dependiente; no reemplazar contratos faltantes con suposiciones ni borrar F4A→F4B.
