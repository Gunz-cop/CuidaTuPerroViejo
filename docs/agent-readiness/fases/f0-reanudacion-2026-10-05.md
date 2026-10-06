# Reanudación de F0 tras el bug #45

Decisión del coordinador, 2026-10-05. El propietario autorizó la corrección separada de la home y, después del PASS, continuar F0. Este registro modifica exclusivamente las precondiciones de arranque de §2 y el destino del PR; no acepta la implementación ni cambia los contratos, ownership o C01–C12.

## Resolución de la base

El build de la base inicial de F0 (`6a1a317fe4d27154bff2a29ce12e2cdd74987315`) emitía canonical `/index` para la home, mientras el sitemap declaraba `/`. La sesión se detuvo y abrió [bug #45](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/45), ligado a [F0 #43](https://github.com/Gunz-cop/CuidaTuPerroViejo/issues/43). No se mapeó la ruta en el inventario ni se redujeron los 28 documentos esperados.

Una sesión separada de Luna 6 con razonamiento bajo corrigió únicamente `src/layouts/BaseLayout.astro`. Commit local `58134c68c4f4042d432b75543a5a60e11662884a`; publicación equivalente `307ebffb73dd4f68d64f4ccda851e15a876a0455`, sobre `b1887a8eab8178442a191eae52d61b4315a37003`, en [PR #46](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/46). Ambos árboles son `bdbcbd872ce720499bf52a68cd5aca6134c109aa`.

La auditoría independiente del fix pasó en intento 1/5: 34 HTML; canonical y `og:url` de home en `https://cuidatuperroviejo.com/`; metadatos de otras 33 páginas y sitemap conservados; índices anidados sin cambios. CI y Workers Builds del SHA publicado: success. La repetición local del auditor falló por EPERM y su solicitud ampliada quedó pendiente, interrumpida por el coordinador; no se presenta como otro build local exitoso ni prueba de producción. El PASS y sus límites están registrados en #45/#46.

## Arranque autorizado solo después de publicación y PASS

1. El coordinador publica esta revisión de documentos sobre el fix, fija su SHA completo en #43 y enlaza la auditoría independiente de reanudación. La rama destino es `docs/f0-reanudacion-canonical`. El implementador no selecciona el último HEAD ni usa solo el commit del fix con la SDD antigua.
2. Conservar el trabajo previo de la misma sesión de Luna 6 alto y la evidencia del bloqueo; no reset/stash/borrar untracked. F0 permanente y spike deben partir de la nueva base exacta. El coordinador autoriza un avance fast-forward si la base anterior es ancestro y Git no sobrescribe trabajo local. Si no es seguro, detenerse para acordar una transferencia aislada; no resolver conflictos inventando contratos.
3. Comprobar la lista de producto, diffs y hashes de §2: solo H1 y canonical autorizados. F0 no posee ni vuelve a modificar esos archivos. Los contratos `f0-contratos.md`, la arquitectura y las mediciones originales deben conservar sus bytes respecto al padre publicado `307ebff…`.
4. Ejecutar build explícito desde la nueva base y volver a inventariar con un output nuevo. El resultado debe conservar `/` como home y justificar 28 documentos frente a catálogo/sitemap. El diagnóstico provisional anterior no cuenta como aceptación. Ante nuevo error de base, detenerse y registrar bug; no ocultarlo ni continuar el spike.
5. Una vez despejada esa comprobación, continuar T0.1–T0.4/P1–P4 y todos C01–C12. Evidencia final desde tooling comprometido y checkout limpio; outputs fuera del repo y luego commit separado de evidencia. No atribuir el commit fuente al despliegue: `deploymentCommit=null` sin prueba independiente.

El coordinador puede cerrar #45 como dependencia de desarrollo resuelta al fijar la base aprobada; el cierre no afirma que producción haya cambiado. #43 permanece abierto hasta aceptación de F0. No hay merge ni deploy implícitos.

## Contadores y límites

La auditoría SDD original terminó en r2 PASS; esta revisión registra una resolución nueva autorizada y no reabre ni reinicia aquellos ciclos. El fix #45 consumió 1/5 auditorías y pasó. La verificación de esta reanudación es una revisión de precondiciones de SDD/base, no una auditoría de implementación F0: esta conserva 0/5 hasta entregar un SHA de tooling completo. Siguen vigentes máximo cinco auditorías por issue, bug y STOP ante bloqueo, y prohibición de sexto intento.

No se publican nuevas capacidades, no se cambian reglas de publicación ni se flexibiliza la paridad editorial. F1/F2 siguen pendientes del cierre arquitectónico de F0. La política continúa `search=yes, ai-input=yes, ai-train=no`.
