# Auditoría independiente de implementación — bug70 R2/5

**PASS.** Lista cerrada sin bloqueantes. B01 y B02 de R1 quedan corregidos y reproducidos independientemente. Este veredicto permite publicar la reparación y preparar su admisión; no acepta producción ni autoriza ejecutar otra tanda.

## Fuente congelada y alcance

- Snapshot local: `8f3ecaa3eba86130fb66ff46cfc46a2c4dc1a19a`.
- Árbol: `7285ab0e375826e0dea8452eceaa5ed95fb2f69d`.
- Padre R1: `cdfe7f160a13e57768129daee2eb8ec702be28b7`; checkout limpio antes y después del cotejo.
- Target de producto distinto del helper: `d2bd342050811d41ee212730cb11fe07783994bd`.
- Norma ratificada: `f2-produccion-integridad-exterior.md`, SHA256 `759e8e4dfa260d8f6b94002a383e6abb354eb7bb9dd80a29175b9a0ef19d568e`; SDD PASS2/2 permanece intacta.

Segunda revisión de implementación bug70, máximo cinco totales. Se inspeccionaron los nueve paths modificados, todos dentro de `docs/agent-readiness/evidencia/f2/b/bug70-html-exterior/`, y se cotejó el paquete completo de 76 archivos. No cambian producto, norma, artefactos de origen ni plan. El contador formal B histórico permanece PASS R1/5 y los informes anteriores conservan sus bytes.

## Cierre de los bloqueantes

| Hallazgo R1 | Evidencia independiente R2 | Resultado |
|---|---|---|
| B01: alternancias aceptaban un cambio de entidad E entre A y A+I si el ETag coincidía o estaba ausente | El helper compara el SHA de E decodificada con el baseline GET del mismo contexto ruta/formato/codificación y mantiene un estado separado para alternancias. Ocho casos de cambio en ambas direcciones, desde baseline y entre alternancias, con ETag estable o ausente, producen STOP. Cuatro casos de entidad estable pasan. También pasan los controles negativos del estado independiente y del ETag. | PASS |
| B02: expectedExterior describía A+I incluso cuando la respuesta aceptada era A | Para ambas formas, expectedExteriorBytes/hash describen E concreta. Los campos observados siguen describiendo E real. La forma A registra ausencia de inserción; A+I registra 367 bytes, fingerprint fijo y posición real. | PASS |

No se constató un nuevo bloqueante ni un hueco esencial de norma, datos o entorno.

## Verificación y criterios

Una única suite independiente R2, offline: `PYTHONDONTWRITEBYTECODE=1 python suite.py`. Terminó con exit0 y **41/41 PASS**, cero errores, fallos u omisiones: 38 regresiones congeladas del autor y tres métodos independientes con los subcasos anteriores. No se volvió a ejecutar la suite.

La simulación utiliza el executor real del helper y sustituye exclusivamente el transporte: 1284 IDs únicos, 1274 respuestas sintéticas capturadas y 10 N/A, sin STOP. Los recursos delegados del transporte provienen del dist completo existente del target d2bd. El comparador A está vinculado separadamente al archivo privado sellado de 58 artefactos; no toma autoridad de bytes del transporte simulado. Esta simulación no acredita respuestas públicas nuevas.

El cotejo de integridad se ejecutó con `PYTHONDONTWRITEBYTECODE=1 python bug70-implementacion-auditoria-r2.py`, exit0. Verificó HEAD/árbol/padre/checkout limpio, scope de nueve cambios, SHA del helper ensamblado, norma, plan, recibos y cierre del índice público: 75 referencias más el propio índice, todos los bytes y hashes concordantes, UTF8, máximo 24524 bytes por miembro. El plan y sus 43 chunks no cambiaron respecto de R1; conserva 1284 IDs, orden, dependencias y presupuesto.

| Gate | Resultado de esta revisión |
|---|---|
| C70-01 | PASS: norma y ratificación heredadas; STOP histórico conservado |
| C70-02 | PASS: congelación y cotejo de los 58 artefactos reutilizados de R1, sin nuevo build |
| C70-03 | PASS: fingerprint y prueba privada de inserción constantes; loader comprobado en la nueva suite |
| C70-04 | PASS: helper, negativos, regresiones y plan finito |
| C70-05 | PASS R2/5: corrección independiente y separación honesta entre originales privados, proyecciones públicas y fixtures sintéticos |
| C70-06 | PENDIENTE: publicación/admisión raíz e identidades y autorización de la nueva tanda; no es un FAIL de esta corrección |

## Procedencia, límites y sellado

Se reutiliza explícitamente la verificación independiente R1 de originales A/I, paridad del delta permitido y captura STOP. Sus manifiestos permanecen constantes y fueron cotejados por digest; no se repitió un sellado completo de raws ni una compilación. La nueva suite carga y valida los bytes de A/I mediante el helper efectivo. Se verificaron otra vez el diff, paquete R2, fuentes efectivas y los nuevos resultados propios. El replay del primer STOP sigue siendo offline: no convierte aquel HTTP fallido en PASS.

Cero HTTP nuevo, builds, Workerd, evaluador, mutaciones de producto, GitHub o main. El plan sigue `ownerAuthorized=false` y EXEC bloqueado. La producción continúa sin aceptación de P01/P02/P03 hasta sus gates posteriores; no se extrapola este resultado a una nueva captura o deployment. Los originales privados se retienen separadamente; el paquete público contiene sus proyecciones declaradas, no raws/configs/traces completos ni identificadores de analítica.

Digests SHA256 esenciales:

- Helper ensamblado: `3a373712f988fd1b65116ecc2285bc0200a6e0583b753a62f8b82860e8b78670`.
- Índice público R2: `45c3f54a431d38e2eda8b1cd58bac0dc25b04de264e7fb036ad36fc0a5057c40`.
- Plan inalterado: `555348b6a876c7f846aba31dc9a306e1a96fbb4f87d2bc372249815c99ce2046`.
- Log de suite independiente: `779ac69873e75b839ce44e28666f28d7222840d7fe5a086703d50eaa68c61494`.
- Informe R1 intacto: `fd0f3db3837fc2df18ce1306d4658124a91e337443fe8ce6f72aacf8a39d68f1`.
- Comprobante independiente R2: `5e58c8c42fc6a1569e72d47db92c142f9fd16030bcdbafb80196a948cb0fc94d`.

Los comandos, fuentes y recibos de ejecución propios se conservaron antes del sellado; el comprobante referencia sus digests y distingue los cotejos nuevos de la evidencia heredada. Quedan tres revisiones disponibles dentro del máximo de implementación bug70; no se activa otra revisión mediante este cierre.
