# Auditoría independiente de implementación — bug71 R1/5

**PASS.** Lista cerrada sin bloqueantes. El plan utiliza los tres assets nativos independientes del target d2bd y mantiene el comparador estricto. Este PASS permite publicación y admisión posteriores; no acepta producción ni ejecuta otra matriz.

## Fuente y alcance

Snapshot local `bb29585eb8470ba74b449ceb06e3e8cc856be25f`, árbol `17452c3119b4595a5e8c77245330772d3e6d45e4`, padre `df6e74cedf072bc0f65736070384e16fcfafd896`; checkout limpio. Los80 archivos añadidos pertenecen exclusivamente a `docs/agent-readiness/evidencia/f2/b/bug71-native-baseline/`.

Norma ratificada PASS R1/2: `f2-produccion-baseline-nativo.md`, SHA256 `d2ec353d6ce54a82d9798f24f35bdc747aa34c21a0193c180eb1642b072bd2ee`; ratificación pública `ed0bbf193bb92d89f27c7f816ec76d5f7eb33596`. Target de producto distinto del helper: `d2bd342050811d41ee212730cb11fe07783994bd`. Esta revisión es bug71 R1/5; correctivo70 PASS R2/5, SDD70 PASS2/2 y cierre formal B histórico permanecen intactos.

## Comprobaciones independientes

Se cotejó exhaustivamente el inventario privado contra el plan70 de referencia, sus43 chunks/1284 IDs y los archivos del dist exacto ya existente. Coinciden orden, métodos, headers, expectativas, dependencias y aliases de representación, incluyendo `expectedBodySha256` de suplemento y hashes de alternancias. Las235 filas con digest son123 assets actuales,103 HEAD vacíos,6 literales400/406 de la fuente runtime auditada y sólo3 expectativas nativas históricas. Las1049 restantes se clasifican explícitamente:1024 condicionales derivados,19 selecciones Accept sin hash fijo,1 contacto dinámico,4 unknown y1 redirect. **Cero desfase estático adicional.** El cotejo no inventa hashes para respuestas dinámicas o condicionales.

Los58 artefactos canónicos coinciden con su manifiesto inmutable. El suplemento de3 nativos conserva bytes actuales e históricos independientemente: cada archivo actual coincide con el dist d2bd y se obtiene del archivo antiguo únicamente por sustitución del nombre CSS. Son61 assets únicos bajo manifiestos de funciones distintas; el suplemento no sustituye el manifiesto58 ni añade un loader al helper. Cookies/privacidad siguen siendo evidencia de build, sin captura pública atribuida.

El diff real del plan cambia únicamente `expected.bodySha256` de GET `/gracias`, `/politica-de-cookies` y `/politica-de-privacidad`; descriptor SHA/bytes de chunk038 y metadata de estado/procedencia del suplemento/gate. Las otras42 partes son byteexactas; filas, IDs, orden, rutas, métodos, headers, dependencias y presupuesto1284 permanecen. Runner, sus tres fragmentos, manifiesto58 y las fuentes de las38 regresiones heredadas son byteidénticos al70 aceptado.

Una ejecución focal independiente offline: `PYTHONDONTWRITEBYTECODE=1 python focales.py`, exit0, **4/4 métodos PASS y40 casos**. Comprueba3 entidades actuales aceptadas y12 entidades incorrectas rechazadas (antiguas, byte adicional, byte alterado y A+I),6 MIME válidos/12 inválidos,3 HEAD vacíos/3 no vacíos y1 replay del `/gracias` retenido. El replay no emite transporte ni convierte el STOP histórico en una captura nueva. La excepción canónica A/A+I continúa sin aplicarse a estos nativos.

El cotejo de integridad `PYTHONDONTWRITEBYTECODE=1 python integridad.py`, exit0, verificó el snapshot, scope, digests y listado positivo completo:79 payloads más índice, todos UTF8, máximo24524bytes y SHA/tamaños concordantes. No se introdujeron rutas privadas absolutas, fragmento de analítica ni su tracking. Los originales privados y recibos completos permanecen separados de sus proyecciones públicas.

## Resultados heredados y límites de procedencia

No se repitió una suite amplia ni el mock1284. Se reutiliza el PASS independiente70 R2 de las38 fuentes heredadas ahora cotejadas byteexactas. Se leyó el recibo archivado del mock71:1284 IDs,1274 respuestas sintéticas+10 N/A, cero STOP/HTTP/Workerd, plan final identificado por digest. Su fuente de test es la heredada; no se presenta como evidencia exterior real.

Los recibos del autor distinguen una primera suite41/41 anterior al refuerzo de negativos nativos; una ejecución intermedia38 PASS/3 errores del fixture por omitir Link/seguridad; y runs finales focales1/1 y3/3. **No existe stdout unittest persistido** que el auditor pueda verificar por archivo/hash: esos conteos se conservan como resultados reportados en recibos e historial. No se afirma una única suite final41/41 con todas las versiones finales. La verificación independiente focal presente, la identidad de fuentes heredadas y sus resultados independientes anteriores sustentan el veredicto sin reconstruir logs.

El freeze actual apunta correctamente al manifiesto privado final SHA1867bb… y al recibo8bbce…. Las referencias5236…/28cc… de ese recibo son iteraciones históricas previas a los links; sus blobs no se conservaron y no se recalcularon. La aclaración read-only declara este límite. Para los bytes actuales se usa el manifiesto final congelado y su cotejo directo, no aquellos hashes intermedios ni una supuesta cadena circular de autoridad.

## Gates y decisión

| Gate | Resultado |
|---|---|
| C71-01 | PASS: SDD ratificada y STOP históricos íntegros |
| C71-02 | PASS: suplemento3 independiente y58 inputs preservados |
| C71-03 | PASS: inventario exhaustivo, ningún desfase fuera de los3 autorizados |
| C71-04 | PASS: delta mínimo, helper byteexacto, focales negativos y recibo mock revisado |
| C71-05 | PASS R1/5 sobre snapshot local fijo; publicación equivalente corresponde al siguiente gate raíz |
| C71-06 | PENDIENTE: publicación/admisión y autorización registradas sobre la entrega concreta; no bloquea este correctivo |

Plan `ownerAuthorized=false`, `executionBlocked=true`, autorización y candidate receipt nulos. Cero HTTP nuevo, builds, Workerd, evaluador, suite amplia/mock repetidos o cambios de producto/evidencia del auditor. La admisión posterior debe conservar las identidades de helper y producto separadas. Este informe no autoriza retries de matrices selladas, main, deploy ni ampliación de norma. Producción sigue sin aceptación P01/P02/P03.

Digests SHA256 esenciales:

- Helper ensamblado: `3a373712f988fd1b65116ecc2285bc0200a6e0583b753a62f8b82860e8b78670`.
- Índice público: `7a21082c89310e64c2d47610b797b024e8cc1351922aabbe5f5a560e6aef2c0c`.
- Plan71: `f6cb74d431d92ed562d13ed8fd6444177194ff4ff8073cdaaa430efc5b814a32`.
- Inventario: `c5574240d4ca4e400d66fc732a2006855c74614bb57e18104459b473f46180f0`.
- Recibo mock: `c41f45bdb302ad451471b10d6872c3836e284ef54c05d9c7b74c05feb26717f6`.
- Log focal independiente: `7c82ba5bb55f59f93eeb132711a44fe306645bf103d3b6c90220990b1c5edfa8`.
- Comprobante independiente: `1bfb7ebc03aac4f5efcb78a702cb05e5ee7f4fd3d891e61e1145a202dcd50b61`.

Quedan cuatro revisiones disponibles dentro del máximo propio bug71. No se abre un nuevo intento mediante este cierre.
