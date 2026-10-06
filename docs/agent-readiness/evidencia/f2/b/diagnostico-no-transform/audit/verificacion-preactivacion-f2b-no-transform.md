# Verificación concreta preactivación — experimento F2B no-transform

**PASS metodológico por lectura: sin bloqueantes confirmados en las versiones finales.** No es auditoría formal B ni aprobación de B05. A fecha 2026-10-06, las nuevas capturas siguen 0/8 según coordinación; la serie anterior permanece cerrada 8/8. Bug #60/STOP, B0/5 y SDD PASS2/2 se conservan.

## Fuentes verificadas

El source local `dd3073c7e0fbc9c5e3e3edc73c4cea658fa983c2` tiene tree `ac053a942e9aada3c5571a3d55dbc9ecd5084318`. `git diff` contra la base `a7c942bd5a2c551e020ed226265d00e4d22e82dd` confirma un único archivo: `src/worker.ts`. Su delta añade observación de Content-Encoding ASSETS/wrapper y `no-transform` exclusivamente al Cache-Control exterior de la home, conservando los demás directivos. No escribe el ETag real; runtime/config/lock y contenido no cambian. El punto wrapper se observa antes de construir la Response exterior instrumentada.

Coordinación acredita equivalencia pública `69a50652f62cec62d5355056a54eab0722b676a5`, PR #62/receipt `6026971114`, preview tratamiento fijo `https://6b2c9502-cuidatuperroviejo.g1721m.workers.dev/`, checks `112542694606`/`112542812635` success. No se consultaron remotos por el auditor. Control conservado: `b87616f72d4ff3446f005f87761bfd65d9f43b62`, receipt `6022505218`, preview `https://5c55fc8d-cuidatuperroviejo.g1721m.workers.dev/`.

Se leyeron completos y verificaron sus SHA-256:

| Archivo local | SHA-256 |
| --- | --- |
| `/tmp/f2b-no-transform-diagnostic.workflow.yml` | `b4269398ba5493c4b90fc891c9d329e0cc4b07dc880ed587fb27060216f6b24e` |
| `/tmp/f2b-no-transform-diagnostic-active.workflow.yml` | `7961c8d67c3392aa17b999318caa998206dc8b154d9929fbaca7f7fb94ec02fe` |

El diff entre ambos cambia sólo `job.if`: false inicial frente a event push/ref exacta `refs/heads/spike/f2b-no-transform`/run_attempt1. Son las versiones finales; la versión inicial `1e2c…` queda superada.

## Control de ejecución y evidencia

Push filtra rama literal y único path `.github/workflows/f2b-no-transform-diagnostic.yml`. La secuencia aprobada exige publicar false y comprobar skipped, activar una única vez, deshabilitar después del job y comprobar skipped antes de documentos. La condición activa no impide por sí sola nuevas ediciones de ese YAML; el presupuesto depende también de respetar esta secuencia y no relanzar jobs. No hubo activación por el auditor.

Hay exactamente ocho llamadas explícitas posibles: HEAD/GET HTML/Markdown de control y tratamiento, sólo home. Curl usa UA histórico `ctpv-f2b-etag-spike/1.0`, identity, retry0, sin follow y límites de tiempo. Proxy configurado aborta sin capturas; fallo curl/status200 detiene las llamadas posteriores. En ambos casos se guardan resumen/manifiestos y el step termina exit1. Los cuerpos GET se conservan y comparan con los hashes esperados; un mismatch queda registrado y no autoriza conclusión positiva. `capture_transport=pass` representa transporte, no aceptación funcional.

Permisos vacíos, sin checkout/deps/secrets explícitos ni otros endpoints. La excepción autorizada upload-artifact está fijada a `ea165f8d65b6e75b540449e92b4886f43607fa02`, always, retention1, sin overwrite; incluye raws, cuerpos, provenance, resumen y manifiestos SHA/tamaño incluso tras fallo parcial. Coordinación debe recuperar el artifact y sus identificadores antes de caducar.

## Límites y siguiente hito

No se ejecutaron HTTP, builds, pruebas ni scripts del workflow. Se usaron lectura de archivos, hashes y diff/Git show. La evaluación offline posterior debe verificar raws/artifact, fuente de cada preview, bytes contra build/índice, ETag nativo y encoding/cache/seguridad. El control anterior no registra encoding interno en sus headers diagnósticos: esa ausencia de instrumentación no demuestra ausencia del encoding nativo.

Un resultado positivo sería asociación con el tratamiento en estas muestras, sin identificar componente causal ni rendimiento bajo otros encodings; no acredita corpus completo o If-None-Match/304 y nunca B05 aquí. Las propuestas de producto requieren decisión arquitectónica posterior. El dictamen metodológico previo `c4cf738a32eebd5ee398a24d5333a943c2da66cde48798ef0d896c6df0ca17ae` y los tres informes históricos permanecen intactos. Lista cerrada de esta revisión: sin bloqueantes adicionales.
