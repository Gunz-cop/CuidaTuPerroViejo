# Auditoría independiente SDD F5 — #109 — R1/2

**Dictamen: FAIL R1/2. Dos bloqueantes del contrato impiden ratificar esta entrega.** No se acredita implementación ni se autoriza aplicar cambios.

Snapshot revisado: **`f46919321e68d23ccb307e78fb4c7d8c9ad019ee`**, tree **`33ed24d1b7cddc6f7cd2eeda6bb6adc9680d254e`**. Padre confirmado: `37505f5425d09a49ced88aaceca4c26d31cd5579`.

Auditor independiente fijo: `/root/auditor_f5`, Sol/high según configuración comunicada. Primera revisión formal; las comprobaciones anteriores no consumieron revisiones.

Identidad de los archivos canónicos comprobada:

| Archivo | Bytes | SHA-256 |
|---|---:|---|
| `sdd.md` | 16625 | `49c402a3ada2fc29ad39623ce8ae7069ce8497fd90bd37141fb3632d26ee6dd2` |
| `patch.json` | 3424 | `36ef48e1470cba8a7fa8cc2d06432ebf70366fec416b02372090fe66ac1a2c5d` |

**B1 — La SDD remite a dos payloads con precondiciones incompatibles.**

La cabecera identifica `patch.json` como patch completo, pero [sdd.md, línea 42](https://github.com/Gunz-cop/CuidaTuPerroViejo/blob/f46919321e68d23ccb307e78fb4c7d8c9ad019ee/docs/agent-readiness/dns/f5/sdd.md#L42) declara que el payload completo está en `patch-propuesto.json`.

Ese segundo archivo existe en el snapshot: exige `preserveDnssecStatus: disabled` y no contiene la activación ni el rollback DNSSEC. El nuevo `patch.json` sí los contiene. No queda establecida expresamente la subordinación del payload antiguo; seguir la referencia de ejecución puede detener el trabajo por una precondición histórica incompatible con el cambio autorizado.

Para cerrar este bloqueante, el contrato debe identificar un único payload normativo vigente y declarar el anterior histórico, sin alterar sus originales.

**B2 — V02 permite acreditar autenticación mediante AD sin exigir un transporte confiable.**

[sdd.md, línea 88](https://github.com/Gunz-cop/CuidaTuPerroViejo/blob/f46919321e68d23ccb307e78fb4c7d8c9ad019ee/docs/agent-readiness/dns/f5/sdd.md#L88) exige `AD=true` en Cloudflare y Google, pero no fija transporte autenticado hacia esos resolvers ni validación criptográfica local desde una raíz de confianza. «DNSKEY/RRSIG verificables» tampoco define cuál de esos métodos acredita la validación.

Una consulta UDP a la dirección de un resolver puede conservar nombre, respuestas, TTL, timestamps y AD, cumpliendo el oráculo escrito sin acreditar autenticidad de esa respuesta. La [referencia fijada por la propia SDD](https://github.com/dns-aid/dns-aid-core/blob/c4944f511e85cc58ed606ca186371c33d35478fe/src/dns_aid/core/catalog_pointer.py#L90) limita expresamente la confianza en AD a un resolver validador alcanzado por un camino seguro.

Para cerrar este bloqueante, V02 debe exigir DoH/DoT con autenticación TLS verificada hacia ambos resolvers, o una alternativa explícita de validación criptográfica local. Debe definir también las opciones y respuestas que constituyen PASS; AD recibido por DNS sin autenticar no puede sustituirlo. Esto no obliga a resolver ahora la dependencia del runner.

No detecté otros bloqueantes en el alcance revisado:

- La autorización archivada resuelve la prohibición anterior de DNSSEC.
- El payload SVCB coincide con la estructura documentada por Cloudflare; la referencia fijada respalda `_index` → TargetName → `/.well-known/ai-catalog.json`.
- Los presupuestos suman **32 llamadas de control plane y 36 consultas DNS**.
- La retirada DNSSEC por etapas concuerda con los [estados documentados por Cloudflare](https://developers.cloudflare.com/dns/dnssec/dnssec-states/): conservar firma mientras pueda quedar DS, y no borrar claves con TTL desconocido.
- Configuración, Browser Rendering, propagación, validación pública y resultado del evaluador mantienen alcances separados.

Método: lectura del snapshot, fuentes y artefactos existentes; comprobación de identidad e integridad. Sin modificaciones, consultas DNS, tráfico al producto, SDK, scans ni llamadas de mutación Cloudflare. No se repitieron matrices F4.

**Contador final: SDD 1/2, FAIL. Queda un único ciclo correctivo y R2/2; una segunda FAIL exige STOP. Implementación: 0/5.**
