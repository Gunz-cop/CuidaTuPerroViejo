# F2 — corrección de aceptación de producción, bug #70

Estado: **PROPUESTA R2, sin ratificar ni autorizar una nueva tanda**. R1 fue FAIL por conservar la URL CSS antigua; ésta es la única corrección y segunda revisión definitiva. La producción continúa STOP. Esta SDD se audita por fondo/coherencia, sólo bloqueantes: primera revisión y un único ciclo de corrección; FAIL2 implica STOP con el dueño. No modifica el informe histórico de F2B ni sus contadores.

## 1. Problema y decisión propuesta

El commit autorizado `d2bd342050811d41ee212730cb11fe07783994bd`, tree `666f95273609ca67da8a508390c3acf9a141f8ca`, está en main y Workers de producción113957381725 terminó SUCCESS. P01 se detuvo en su primera GET HTML: HTTP200, pero el hash no coincidió. La captura demuestra una respuesta correcta en transporte, no aceptación de producción ni caída del sitio. P02 no se alcanzó y P03 no comenzó.

El diagnóstico independiente separa dos problemas:

1. El plan utilizó artefactos históricos de6b. El build exacto de d2bd genera `BaseLayout.DiuOmqqC.css`,138212bytes, SHA256 `9695668496f97178890833317569b4758f5ef6fb1f3e2caeb80e9a7c1aec3ff9`, frente al CSS anterior138037bytes. La única regla añadida es `.ordinal`; Tailwind escanea documentación que contiene ese token. Cambian28 HTML por la URL del CSS y el índice por sus hashes; los28 Markdown conservan sus bytes. El diff de código vacío no acredita igualdad de artefactos.
2. Frente al build exacto d2bd, la respuesta exterior contiene únicamente una inserción de367bytes: un script de analítica referido a `static.cloudflareinsights.com` y un LF. El diagnóstico no identifica qué ajuste remoto lo inserta ni demuestra su presencia en otras rutas.

Para este blog se propone **preservar la analítica existente**, fijar expectativas del build final real y permitir exclusivamente esa inserción exacta en HTML documental. La aceptación comprueba todos los bytes del documento mediante construcción exacta; no aplica tolerancia general de HTML, regex de scripts, reserialización DOM ni normalización editorial. No se cambia el sitio, su Worker, CSS, dependencias ni configuración de Cloudflare.

## 2. Autoridad, precedencia y alcance

Esta sucesora, sólo después de PASS y ratificación del coordinador, reemplaza para el target d2bd:

- La extrapolación de equivalencia de artefactos por cambios únicamente documentales en B01/cierre. Se conserva la base F2A y el código/runtime auditados, pero la autoridad de bytes para producción es el build exacto final d2bd descrito en §3. Se admite exclusivamente el delta CSS/documentos ya diagnosticado, no nuevos cambios editoriales o de producto.
- El requisito de igualdad exterior HTML200 de B03/P01/P02, únicamente con la alternativa constructiva de §4. El asset de origen y el índice mantienen su significado y hashes exactos.

El resto de `f2b-contrato-sucesor.md`, `f2-lectura-markdown.md` y `f2-contratos.md` se hereda sin cambios: corpus, DOM/proyección, esquema, límites, Accept, validators, seguridad, errores, routing, caché, compresión, delegaciones, F1, P03 y rollback. Ante necesidad fuera de esta sustitución, bug y STOP. No se reescribe ningún FAIL anterior como PASS.

La fuente del helper y la fuente desplegada son identidades separadas. La publicación del helper/SDD/evidencia en una rama documental no autoriza push a main ni cambia el target d2bd. Si main o el deployment cambian, STOP: esta admisión deja de ser aplicable. No asumir que el build de la rama documental es el asset de producción.

## 3. Congelación del build real

Se reutiliza la única compilación diagnóstica exitosa de d2bd; no se repite por conveniencia. Conservar privadamente los57 artefactos indexados y el CSS como bytes originales, junto con hashes/tamaños/paths, SHA/tree de fuente, lockfile, versiones efectivas, comando/exit y configuración compilada. El índice debe pasar los checks existentes y todos sus hashes HTML/Markdown deben coincidir con esos archivos. No editar dist ni reconstruir artefactos ausentes.

El archivo sellado incluye el índice real26284bytes/SHA256 `7c4f0130841f7c009d01cf37bb2c3acf5e1e59ebdc2cb7e14bb6b5a6d3a88273`,28 HTML,28 Markdown y el stylesheet. La comparación independiente registra los29/57 cambios y CSS:28 HTML sólo por la URL del stylesheet; índice sólo por los28 hashes HTML; Markdown byteexactos; CSS sólo la utilidad `.ordinal`. Cualquier delta adicional es bloqueante. Recibos privados completos y proyección pública explícita con hashes, sin configuración completa/IDs/trazas.

El plan obtiene las expectativas del índice/archivos congelados d2bd, nunca de la respuesta fallida. Difiere del anterior sólo en los valores de artefactos afectados, la procedencia/gates del nuevo plan, la regla exterior explícita y los dos paths CSS siguientes: en GET y HEAD de `resource-stylesheet` (chunk038), sustituir `/_astro/BaseLayout.gPuLvWrC.css` por `/_astro/BaseLayout.DiuOmqqC.css`, junto con las expectativas del stylesheet real. Esta sustitución conserva los IDs de ambas filas; no añade recursos ni solicitudes. Todas las demás rutas, métodos, headers solicitados, dependencias,43 chunks y1284 IDs anticipados permanecen. No importar ETags/capturas/N/A de otra tanda.

Para entregas futuras, después de cualquier cambio de fuente —incluida documentación— se exige identidad real del build final antes de heredarlo como baseline. Un nuevo cierre documental no implica otro deploy en esta reparación. Delimitar fuentes Tailwind puede plantearse posteriormente como mejora propia; no se modifica global.css ni se renombra metadata para ocultar este fallo.

## 4. Única transformación HTML exterior permitida

Sean A los bytes del asset HTML congelado y E la entidad exterior después de decodificar correctamente Content-Encoding. Para un GET200 de una representación HTML canónica del corpus, se aceptan sólo dos construcciones:

1. **Sin inserción:** E es exactamente A.
2. **Con inserción:** A contiene una única secuencia literal `</body>`; p es su posición. E es exactamente `A[:p] + I + A[p:]`, donde I es el único fragmento privado congelado siguiente.

I tiene367bytes y SHA256 **`2be9ce292ff29562f5d0f9a13c9adf1077e5e6c4d787e4568c5bd5f0eed7a09b`**. Contiene el nodo script completo y LF final, inmediatamente antes de `</body>`. El auditor inspecciona el fragmento privado y acredita que es sólo el script observado, sin código inline ni otro nodo, con atributos `type`, `src`, `integrity`, `data-cf-beacon`, `crossorigin`, host `static.cloudflareinsights.com`. No publicar valores de tracking ni el fragmento completo. El hash de367bytes del diff histórico `b4c59d…` NO es esta identidad: aquel span de alineación comparte delimitadores `<` con ambos documentos; no sustituir uno por otro.

El plan declara antes de ejecutar longitud/digest/placement y su recibo independiente. El helper verifica que el archivo privado I coincide con ellos y con esta SDD. No permite reemplazar ese fingerprint mediante CLI, aprender una variante de una respuesta nueva, leer el fragmento de la respuesta en curso, aceptar por hostname/tamaño, ni ampliar una allowlist. El fragmento no se obtiene de red durante la ejecución.

La comparación es constructiva, byte a byte o con hash de la construcción completa previamente formada desde A e I; también se exige el tamaño exacto. La selección de alternativa depende de E y no se presupone presencia uniforme del fragmento entre diferentes rutas o codificaciones. Debe registrar cada respuesta por separado. Una captura de una ruta no prueba otras. Esta admisión individual no exime la estabilidad heredada: los GET200 condicionales/suplementarios conservan igualdad de la entidad exterior E real con el baseline capturado en esta nueva tanda para el mismo contexto ruta/formato/codificación, y las alternancias mantienen sus checks vigentes. Cambiar entre A y A+I dentro de una comparación que exige estabilidad es FAIL aunque cada entidad pase individualmente. No sustituir ese check por igualdad del asset A ni borrar la diferencia. A vacío, corrupto, distinto del índice o con cierre body ambiguo impide utilizar la alternativa con inserción.

Las rutasHTML nativas fuera del corpus, errores, redirects, Markdown negociado/explicito, índice, CSS y demás recursos conservan todas sus reglas anteriores: no reciben esta excepción. HEAD y304 siguen sin cuerpo. En las alternancias y GET200 condicionales/comprimidas HTML canónicas se aplica la misma regla sobre la entidad decodificada. No ejecuta JavaScript ni descarga el beacon. Cualquier script cambiado/duplicado/reubicado o byte extra implica STOP, igual que contenido cruzado/obsoleto. La ausencia del fragmento no es N/A: E debe ser A.

## 5. Evidencia y compatibilidad HTTP

Conservar siempre request, respuesta original, wire/decoded bytes/hash, headers/status/timestamps y manifiesto crudo. `decodedSha256` y `decodedBytes` siguen describiendo E real; no reemplazarlos por los de A. Añadir en cada HTML200 elegible una comprobación separada: alternativa `asset-exact` o `asset-plus-exact-insertion`, asset path/hash/bytes, fragment length/hash/placement o ausencia, expectedExteriorHash/bytes y resultado. En la segunda alternativa, registrar posición real. El manifiesto identifica source desplegada d2bd y source/versión del helper por separado.

Índice `htmlSha256` continúa describiendo A generado en build; no E transformado en dominio. No alterar el schema v1 ni publicar hashes falsamente atribuidos al HTML exterior. En cada registro se indica esta distinción.

La excepción no cambia ETag nativo: Markdown obligatorio, HTML opcional; coherencia GET/HEAD y condicionales con tokens capturados en esta misma tanda/codificación. No sintetizar tokens ni comparar ETag con hash del índice. `private,no-store`, Vary Accept/Accept-Encoding aplicables, seguridad/LinkF1, ausencia de cookies/headers prohibidos y separación de representaciones continúan íntegros. No añadir no-transform, recomprimir ni modificar Content-Encoding para evitar esta validación. Si plataforma transforma validators de manera incoherente, es fallo real y STOP.

## 6. Implementación, propiedad y checks

Programador: la misma sesión Luna6 con razonamiento alto; auditor independiente: el mismo verificador de implementación. Coordinador escribe SDD/plan arquitectónico y publica resultados, no código de producto/helper. Issue70 lleva contador de código propio0/5, máximo cinco revisiones totales; FAIL5 o hueco esencial de SDD/base/datos/entorno produce bug y STOP, sin sexta revisión ni reinicio. La aceptación formal B histórica R1/5 y todos los bugs anteriores permanecen intactos.

Propiedad exclusiva de la reparación: `docs/agent-readiness/evidencia/f2/b/bug70-html-exterior/` para una copia explícita del helper aceptado bug69, sus pruebas/fixtures offline, manifiestos del build, proyecciones y plan nuevo; `.../bug70-html-exterior-auditoria/` para reportes del coordinador/auditor. No sobrescribir runner/planes/resultados anteriores. Esta SDD vive en `docs/agent-readiness/fases/f2-produccion-integridad-exterior.md`. Datos originales privados permanecen fuera de Git, con referencia sellada/proyección declarada.

Cambios permitidos en helper: admisión real de los artefactos congelados d2bd, comparación exterior de §4 y evidencia separada de §5. El comportamiento previo de cualquier otra fila permanece. El archivo privado del fragmento se admite por referencia sellada y no forma parte de fixtures públicos. Prohibidos cambios a runtime/tests de producto, estilos, layout, configuración, dependencias, CI, editorial, endpoints o plataforma. Si un check de CI exige un acceso no disponible, documentar el bloqueo sin inventar éxito.

Pruebas offline necesarias: E=A; construcción exacta autorizada; payload cambiado/un byte extra/scriptduplicado/posición incorrecta/assetincorrecto; Markdown/recurso/error que incluya el fragmento; HEAD/304 con body; gzip/br decodificados antes de comparar; fragmento ausente/malformado/hashincorrecto; fuente/artefactos/manifiesto inconsistentes; copia del plan con identidad errónea. Usar fixtures sintéticos públicos claramente rotulados con fingerprint de test separado; nunca aceptables en EXEC real. El fingerprint de producción es fijo y no sustituible en ejecución. Cubrir el fixture real existente sólo offline/private, conservando FAIL original y sin convertirlo en recepción válida de una tanda nueva. Reutilizar regresiones significativas del helper69 y un mock del plan completo con contadores reales/sintéticos explícitos. No repetir tests de producto/build/Workerd ya aceptados sin un fallo nuevo que lo justifique.

## 7. Gates de reparación y reanudación

| Gate | Evidencia necesaria |
|---|---|
| C70-01 | SDD PASS en máximo2 revisiones y ratificación fija; histórico STOP íntegro |
| C70-02 | Inventario/sello de58 artefactos d2bd y paridad exacta del delta permitido; fuente/lock/config comprobables |
| C70-03 | Inserción privada367bytes/digest/placement revisada de forma independiente; ningún trackingID publicado |
| C70-04 | Helper, pruebas negativas y regresiones PASS; plan1284IDs/43chunks sin ampliación de tráfico ni importación de tokens |
| C70-05 | Auditoría de corrección PASS en máximo5 revisiones sobre snapshot fijo; paquete público/privado honestamente diferenciados |
| C70-06 | Main/deployment aún d2bd, CI y Workers de ese target exitosos; source helper separada; admisión y autorización de la nueva tanda registradas |

La nueva tanda no es continuación ni reinterpretación de la interrumpida. Arquitectura entrega primero helper/plan concretos y auditados; la autorización previa del único plan consumido no se presenta como permiso de retries. Antes de ejecutar se registra autorización del dueño para el nuevo plan finito y las identidades exactas admitidas. No requiere nuevo deploy: target es d2bd ya publicado. Si se necesitara otro deploy o modificación de zona, STOP y decisión concreta aparte.

La nueva matriz completa permite un máximo1284 GET/HEAD del dominio canónico, con reglas heredadas de N/A/compresión/alternancias y STOP en primera anomalía. No calibraciones, URLs adicionales, redirects seguidos, APIs/admin/Assistant, mutaciones ni retries. La tanda original permanece **1HTTP fallido,0validados,1283nointentados**; los contadores nuevos se publican aparte. Evaluador continúa0scans hasta P01/P02PASS.

Después del PASS real de P01/P02, P03 conserva exactamente un scan content y uno all-ui con herramienta existente, perfiles/fórmula congelados y comparación F1. Caída real del evaluador produce STOP global; no repetir ni simular puntuaciones. No introducir API/auth/commerce para elevar el nivel de un blog ni prometer nivel5.

## 8. Evidencia histórica mínima

- Diagnóstico independiente offline SHA256 `a92f066918e842ebb86113187db95f24e0a598849359da169e68f84d4990ee89`; comprobante privado `65e3fd4cdb560ea71aab340abeffe308fadfe64f9f32a1a903f151d430ade705`.
- Diagnóstico del único build exacto SHA256 `b4462dee74c2c15406f631bdf0544cb394acdb66315e0162bffe2c17e65eb711`.
- Sello STOP producción de9 archivos SHA256 `ff5e435871dc0adbdc892ac8c1517b1af20d245e0f8dfc3b674cc94143fb75b0`.
- Informe formal F2B conservado SHA256 `3bc17d25c71e6cefe58e99a720cf3945c05355ec2b9d2246edbbcd6568db60e5`. Su extrapolación docs→identidad de artefactos queda limitada por este diagnóstico, sin alterar sus bytes ni atribuir preview a producción.

Content Signals conserva `search=yes, ai-input=yes, ai-train=no`. Publicación excluye credenciales/cookies/trazas/config completa/identificadores del beacon/índice operativo011. No se ejecuta rollback automáticamente.
