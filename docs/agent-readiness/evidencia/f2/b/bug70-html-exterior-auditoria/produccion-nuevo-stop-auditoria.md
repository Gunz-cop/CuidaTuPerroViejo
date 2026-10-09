# Bug70 — verificación independiente del nuevo STOP

**Cierre coherente; STOP confirmado.** Sin bloqueantes adicionales de honestidad/procedencia del cierre. La producción no está aceptada. El PASS de implementación bug70 R2/5 permanece intacto: esta comprobación offline no abre R3 de código ni una nueva auditoría normativa.

## Evidencia y clasificación

El request `delegation:delegation-discovery-gracias-get` llegó a HTTP200 con curl exit0. Sus originales contienen una entidad de28587bytes, SHA256 `04cb60c83b95256580acaeb0e6256566809371ff4fdfd97ec5f55c28fc0e720a`, idéntica byte a byte a `gracias.html` del dist existente del target d2bd. La expectativa `19364633e69d1bd5c1853d2a33c64afde02bb912e36bcf01cc9d9cf41b68e0ef` corresponde al archivo histórico de6b. Entre ambos archivos sólo cambia `BaseLayout.gPuLvWrC.css` por `BaseLayout.DiuOmqqC.css`. No se necesita tolerar o normalizar el body para demostrar esa diferencia.

Se cotejaron también los builds existentes de `/politica-de-cookies` y `/politica-de-privacidad`: las dos expectativas conservan sus respectivos hashes antiguos y el único delta es la misma URL CSS. **Estas dos rutas no fueron solicitadas** en la nueva matriz; el inventario sólo acredita sus archivos de build, no respuestas exteriores.

La SDD ratificada bug70 (§§2–4), SHA256 `759e8e4dfa260d8f6b94002a383e6abb354eb7bb9dd80a29175b9a0ef19d568e`, corrigió la autoridad de bytes de los58 artefactos congelados y las dos rutas CSS. Los HTML nativos fuera del corpus conservaron sus expectativas estrictas. `/gracias` no pertenece a los28 HTML canónicos; la excepción A/A+I tampoco le aplica. El helper auditado rechazó correctamente el body frente a la expectativa vigente. La evidencia identifica un **hueco de baseline/alcance contractual**, que exige bug y STOP con decisión del propietario; no demuestra caída del sitio, defecto del transporte ni habilita una reparación de código R3 o ampliación unilateral de la norma.

## Conteos y conservación

| Estado | Conteo confirmado |
|---|---:|
| IDs completados | 1129 |
| HTTP validados incluidos en esos IDs | 849 |
| N/A incluidos en esos IDs | 280 |
| HTTP fallido, fuera de los completados | 1 |
| HTTP reales totales | 850 |
| IDs nunca intentados | 154 |
| IDs previstos | 1284 |

Los1129 registros del summary son el prefijo exacto del plan; la lista restante de STOP tiene155 IDs, incluido el request fallido, y154 nunca intentados. Hay850 directorios de captura. No se ejecutó el resto de la matriz. El cierre declara0scans; P03 sigue sin comenzar.

El sello contiene6802 archivos/48418407bytes. Se cotejaron todos sus paths y tamaños; se verificaron los digests de summary, STOP y los ocho originales de la captura fallida. Los demás hashes del sello raíz se conservan como recibo completo: no se afirma un segundo rehash independiente de todos los raws.

El primer STOP histórico y el informe/comprobante R2 mantienen sus digests originales. No se reinterpretan fallos anteriores como PASS ni se acumulan sus contadores con esta tanda nueva.

## Identidades y límites

Target de producto: `d2bd342050811d41ee212730cb11fe07783994bd`. Payload correctivo publicado: `f93957d4b1fcba70e7ebed0bc5db28aa26484500`, árbol R2 `7285ab0e375826e0dea8452eceaa5ed95fb2f69d`; aceptación raíz: `a1e0e922132293da5d308b2860c2a09d059e7975`. Los recibos de admisión/autorización separan helper y deployment. Se comprobó independientemente el helper efectivo ensamblado, SHA256 `3a373712f988fd1b65116ecc2285bc0200a6e0583b753a62f8b82860e8b78670`, y que el plan activo conserva las43 partes/1284 solicitudes: sólo cambia metadata autorizada de admisión. Las identidades de publicación Git se toman del recibo del coordinador; sus objetos no están presentes en el checkout auditor y no se descargaron para esta comprobación.

Sólo lectura y cotejo offline; cero HTTP, suites, builds, Workerd o mutaciones del auditor. Los originales privados permanecen separados de este resumen. No autoriza retries, nueva tanda, deploy, rollback, cambios de main, helper o norma. La SDD PASS2/2 y los históricos permanecen intactos.

Digests SHA256 del cierre:

- Diagnóstico: `4ba258266bc0b98c5af50c466128910a2b423c54405532e052a277eb536da826`.
- Sello: `d150eb6a688639a4f86d05426ca4603974e5c16540e77e3a702940fc22192319`.
- Inventario nativo: `05209d67e3facfa88efc2dd5f1a788dde1a978fe1776849e8304d6d8192e13e4`.
- Comprobante independiente: `8c58dafc052fd78142ae6e88810188ed6f1a40b3698aae7b9bfdbabd6e95c56c`.
