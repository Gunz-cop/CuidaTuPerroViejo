# Aceptación técnica de F2B — PASS R1/5

La auditoría independiente del issue #56 aprobó los diez criterios B01–B10 en su primera ronda, sin bloqueantes. [Informe original íntegro](informe.md) y [comprobante público proyectado](comprobante-publico.json). La fuente auditada es `8fd348ad8cd55b91ec35ccd7ed6b978f4f1f138a`, árbol `7c61b875c41f12939ba25e756d28266ab85c82ab`, equivalente al commit local `9f47a26d473fcf6b9a97a0a52ad3d56286cf38b8`.

La [entrega completa](../cierre-formal-f2b-6b/formal-closure.md) conserva los 222 archivos congelados para la revisión, su índice, procedencia y límites. Sus estados «pendiente/B0» registran el momento de entrega anterior a la auditoría; este cierre documenta el resultado posterior y no reescribe esos originales.

La matriz de 1.284 IDs pertenece exactamente a `6b0d3d5abd0c175d2acae56ab7892edaf18cc157`: 964 respuestas HTTP verificadas, 320 N/A con baselines que las justifican, cero fallos y cero pendientes. El nuevo commit auditado sólo agregó documentación, con producto byteidéntico; no se repitieron solicitudes al preview documental ni se atribuyeron capturas históricas a una fuente nueva. Los 7.714 archivos originales sellados conservan 57.749.939 bytes y están disponibles privadamente para auditoría. La proyección pública incluye una observación por cada ID.

La revisión cotejó 8.726 referencias, 57 artefactos y CSS idénticos, 313 respuestas locales históricas y ocho B07 R2 completos vinculados a sus insumos originales conservados. Las pruebas de producto (42/42) corresponden al código inalterado y sus checks actuales. CI113917520119 y Workers113917815021 del HEAD8fd pasaron; CI tiene 23 pasos exitosos, incluidos routing y Wrangler dry-run compilado. La configuración efectiva tiene 30 rutas exactas. Estos checks pertenecen al árbol auditado; la publicación posterior de este informe/cierre exige verificar los checks del HEAD documental final antes de proponer main.

F2A mantiene su aceptación independiente R3/5 (#55), código `644cd3d8ace36ac69fee4938a115d22c158e5e63` y cierre `c0a7280378c009fcd3ed8fbb60b10c54f048c718`. La promoción será conjunta F2A+B, con todos sus cierres preservados, nunca A sola. Se excluyen las ramas experimentales y sus ancestros privados.

## Promoción y verificación pendiente

La aceptación técnica permite preparar una propuesta concreta de promoción; **main y el despliegue aún requieren autorización específica del propietario**, según [F2 §8](../../../../fases/f2-lectura-markdown.md). Main despliega a producción. Antes de solicitarla: fijar el commit público final, comprobar sus CI/Workers y preview oficial, revalidar que main conserve la base F1 `28bd92ecd424ff11b31e13e4a2ba499cb196a870` y presentar el cambio conjunto y rollback. Si hay un cambio concurrente de main, detener la promoción y evaluar su integración; no sobrescribirlo.

Tras una promoción autorizada, P01/P02 verifican en producción lectura, representación, condicionales, alternancias y preservación de F1. P03 permite exactamente un scan de contenido y uno completo desde la UI del evaluador. Cualquier anomalía detiene su tanda y abre bug; no repetir para convertir un fallo en verde. No se declara aquí aceptación de producción, WAF/CDN, performance, score ni P01–P03.

Rollback previo a main: cerrar/revertir sólo la rama de trabajo. Si se despliega, preparar una reversión conjunta B→A contra el main realmente publicado, restaurando entrypoint/config/routing/generación/headers/checks de la base F1, sin artefactos o referencias F2 huérfanos y preservando las políticas F1. La reversión de producción requiere revisión y autorización de despliegue; no restaurar un spike, bindings antiguos, redirects o fechas alteradas.

## Integridad y privacidad

El informe se publica byte por byte. El comprobante público es una proyección explícita; el original y sus siete artefactos de verificación permanecen privados. No se publican trazas, cookies/credenciales, configuraciones completas ni el índice operativo privado011. Sus omisiones no impidieron la auditoría de originales.

Contadores preservados: #65 R3/5, #67 R1/5, #68 R2/5, #69 R1/5 y formal B R1/5, todos PASS por su propio alcance. Las tandas históricas STOP permanecen cerradas e íntegras; ninguna se completó, reintentó o reinterpretó como PASS. La publicación de este cierre sólo añade metadatos e informes; no modifica producto, norma, ejecutor o capturas.
