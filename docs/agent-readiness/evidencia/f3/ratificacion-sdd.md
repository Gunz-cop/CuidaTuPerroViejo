# Ratificación técnica de la SDD F3

Fecha: 2026-10-11. Autoridad: coordinador arquitectónico, sesión GPT-6.1 Sol con razonamiento alto, distinta del auditor independiente. **Acepto y ratifico técnicamente la SDD F3 sobre el snapshot normativo identificado abajo**, a partir del dictamen final **PASS R2/2, cero bloqueantes** del mismo auditor independiente GPT-6.1 Sol/high de R1 y R2. El objetivo de construir y auditar esta SDD queda completado; F3 todavía no está implementada ni publicada.

Este cierre es la autoridad vigente sobre el estado documental. Los encabezados de propuesta y de corrección pendiente del paquete auditado se conservan congelados como estado de sus respectivos snapshots; no se reescriben contratos, fuentes o informes para registrar el cierre.

## Identidades y presupuesto de revisión

| Identidad | Valor |
|---|---|
| Snapshot normativo ratificado, R2 | `6dbaf2c97d81dd6433dd7d1f75e0a8d8943bea92` |
| Tree normativo ratificado | `ae19b2be649711aa5ebeb405eb8e3eebd09c1ef2` |
| Archivo del informe final R2 | `b949b973baa556a125130f3257847e001a5d45ce` |
| Tree con informe final archivado | `e91304b0c74de3d76f06d7cfe71e0ee6a233dc61` |
| Base documental original | `67dacfec405935567f71b403cd80a56f5aebe952` |
| Tree base documental original | `d024a161e85b32c1cc783e1db9886c7ffa1e6d76` |
| Snapshot de R1 | `e8498091d8e285dc41576fc00228541efc1bd65b` |
| Tree de R1 | `0c97d664d831da29deade1b538a49c462bcd7903` |
| Archivo previo de informe R1 | `fbebb78f6788af1a4e97e2e6ac679e060ceb6af5` |
| Rama documental | `agent-ready/f3-sdd` |
| Producto F2 desplegado de referencia | `d2bd342050811d41ee212730cb11fe07783994bd` |

Dos revisiones totales por el **mismo auditor independiente**: [R1 FAIL](auditoria/sdd-r1.md) y [R2 final PASS](auditoria/sdd-r2.md), con un único ciclo de corrección limitado a su lista cerrada. R2 cierra B3-SDD-01 (longitud de q tras NFC/trim, coherente con OpenAPI GET/HEAD) y B3-SDD-02 (ownership C de expectativas Link en la prueba compartida de negociación). No queda bloqueante pendiente ni se abre un tercer intento de SDD.

| Informe preservado | SHA256 |
|---|---|
| R1 | `6de72f50760407c85ae6fd851c18d57b15f2058743ac418c4cd082a10950f21d` |
| R2 | `32c9e99fb2a0a2022d702e2a3ba7369a78484be0f553ff50e044b56b6bcee15b` |

El dictamen R2 se leyó íntegramente antes de ratificar. Los hashes de ambos informes y el tree del snapshot normativo fueron comprobados en lectura. Entre el snapshot R2 y el commit de archivo `b949b973baa556a125130f3257847e001a5d45ce` sólo se añadió `auditoria/sdd-r2.md`; el paquete normativo y las fuentes permanecen idénticos. Esta ratificación no repite la auditoría ni transforma comprobaciones documentales en evidencia de runtime.

## Contenido, ownership e invariantes aceptados

Se ratifica el paquete completo: [SDD](../../fases/f3-api-y-descubrimiento.md), [contratos](../../fases/f3-contratos.md), [traspaso](../../fases/f3-traspaso.md), [anexos concretos](contratos/README.md), [decisiones](decisiones.md), [fuentes y manifiestos](referencias/README.md) y [único ciclo de corrección](correccion-r1.md), tal como existen en el snapshot normativo indicado.

Acepto la fuente única de datos de proyección F2 íntegra, catálogo/búsqueda/lectura públicos por ID, búsqueda léxica determinista, lectura completa con metadata y enlaces originales, límites y errores, guard de corpus, OpenAPI, RFC9727, skills y ARD actual con compatibilidad anterior explícita. No se amplía el alcance a autenticación, comercio, cálculos invocables, WebMCP/MCP, A2A, DNS, generación clínica o Assistant V2; no se promete nivel5 ni resultado de puntuación nuevo.

La política confirmada permanece **search=yes, ai-input=yes, ai-train=no**. F2 es una dependencia aceptada, auditada sin bloqueantes y publicada conforme a su [cierre archivado](../f2/b/bug71-native-baseline-auditoria/produccion-cierre/resultado.md):86 contenido,40 general,nivel4 general; bugs70/71 cerrados. No se repiten pruebas, scans ni matrices F2 para esta ratificación. No se presenta un nivel5 parcial como resultado general.

Ownership y orden quedan fijados en **A→B→C**, sin solapamiento de archivos compartidos. C puede adaptar `tests/agent-readiness/negotiation.test.ts` exclusivamente en sus expectativas Link al conjunto F3, incluido F1; se preservan restantes verificaciones de negociación, cuerpos, headers, validadores y ejecución CI. El coordinador mantiene la propiedad de integración. Cualquier cambio esencial fuera de esa frontera requiere STOP de SDD, sin decisiones unilaterales del implementador.

## Release documental y traspaso F3A

El **release documental de admisión** será el commit de cierre que publique el coordinador raíz incorporando esta ratificación sobre `b949b973baa556a125130f3257847e001a5d45ce`. Su SHA/tree completos aún no existen durante esta escritura: el coordinador raíz los fija al crear ese commit y los consigna en el recibo de publicación y en el futuro encargo F3A, junto con enlaces permanentes al paquete y a este cierre. No se sustituye ese dato por HEAD móvil, snapshot normativo sin cierre o SHA inventado.

El delta autorizado para ese release respecto al archivo de R2 es **únicamente este documento de ratificación**. Si aparecen otros cambios, no se presume que estén cubiertos por este PASS: se detiene la admisión hasta resolver su procedencia y autoridad, sin reescribir el contrato auditado. Un diff documental tampoco prueba identidad de HTML/CSS: los builds futuros se vinculan al SHA final real y a su recibo, conforme a la evidencia histórica de F2.

Con PASS y esta ratificación, el material de [encargo F3A](../../fases/f3-traspaso.md) queda habilitado para traspaso una vez fijado/publicado el release exacto. El coordinador raíz puede concretar ese primer encargo según la partición auditada, sin otra ratificación técnica del propietario. Antes de lanzarlo, fija base SHA/tree, rama `agent-ready/f3-a`, destino draft `agent-ready/f3-sdd`, ownership y criterios del contrato, identidad del auditor independiente y evidencia de admisión. Esta sesión no crea issues ni inicia programación.

F3A ejecutará generación/contratos en sesión **Luna6/high**; su auditor de implementación será **Sol/high**, distinto del autor/corrector, fijo para ese issue y con máximo **cinco revisiones totales**, incluida la primera. El mismo régimen corresponde a B/C. Quinta FAIL→bug/STOP, sin sexta revisión, corrección posterior o reinicio del contador. Sólo bloqueantes abren ciclos; observaciones opcionales se registran.

**B no es lanzable hasta cierre aceptado de A con SHA/tree fijos; C no es lanzable hasta cierre aceptado de B con SHA/tree fijos.** Sus bases no se anticipan como release SDD o main. Un hueco esencial de contrato, base, dependencia, datos o entorno produce bug de SDD y STOP del trabajo dependiente; no se rellena para concluir el issue. Se conserva el mecanismo de reporte y publicación pendiente si GitHub no está disponible, definido por la SDD.

## Límites de esta aceptación

La ratificación técnica **no autoriza merge, deploy o cambios a main**. La promoción exige una entrega concreta aceptada, autorización específica del propietario y los gates separados de implementación/preview/producción definidos por el contrato. Tampoco certifica endpoints funcionales, digests HTTP, acceso de proveedores o scores nuevos. Se mantienen las limitaciones de evidencia del dictamen, incluida la ausencia de compilación integral Ajv2020 en el checkout de auditoría sin dependencias instaladas.

No falta nueva evidencia esencial para el cierre documental: el PASS final y sus identidades están archivados, y el release SHA/tree futuro tiene responsable y momento de fijación explícitos. La inexistencia actual de ese commit impide publicar un encargo ejecutable con base ficticia, pero no impide ratificar el snapshot auditado.

Fin de escrituras del coordinador arquitectónico: sólo `docs/agent-readiness/evidencia/f3/ratificacion-sdd.md`. Contratos, informes y fuentes intactos; sin commit de este autor, issues, implementación, build, pruebas F2, scans, deploy o main. El coordinador raíz fija y publica el release documental siguiente.
