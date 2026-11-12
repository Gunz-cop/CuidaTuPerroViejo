# Recuperación histórica diaria · Procedimiento para auditar

**PREPARADO, NO EJECUTADO.** No autoriza ninguna operación en producción.
Requiere auditoría independiente y autorización específica del propietario que
identifique rango, Worker/deployment y ventana operativa. Aprobar o fusionar el PR
del archivo ordinario no autoriza esta recuperación ni habilitar su secret.

## Entrada y aislamiento

Se invoca `recoverDays()` en el **Worker activo**, mediante POST HTTPS a
`https://cuidatuperroviejo.com/api/admin/audience/recover-days`.
No es una llamada a `scheduled`, un schedule temporal, una ejecución SQL manual
ni un programa que duplique el archivador. La ruta solo llama la función común
publicada en main. No requiere volver a publicar código para cada lote.

Está cerrada por defecto: exige las credenciales administrativas existentes y
el secret separado `AUDIENCE_RECOVERY_TOKEN`, además de confirmación literal y
motivo. El cron nunca lee ese secret ni llama a la ruta o a `recoverDays()`.
No hay botón en la interfaz. No enviar tokens por chat ni escribirlos en el repo,
argumentos de procesos o historial del shell.

## Antes de autorizar la ejecución

1. Auditar este procedimiento y el PR definitivo, incluidas sus comprobaciones.
2. Resolver con el propietario la evidencia pendiente de latencia descrita en
   [archivo-diario.md](archivo-diario.md). No confundir prueba de coherencia
   puntual con confirmación de estabilización a +48 h.
3. Registrar un rango concreto de días de Costa Rica, extremos incluidos. Leer
   settings en vivo (`notOlderThan`, `maxDuration`, `maxPageSize`) y la cobertura
   D1: cada día cortado por retención queda fuera, cada día que no ha cumplido
   +48 h queda pendiente. No solicitar «todo lo disponible» sin rango revisado.
4. Preparar un manifiesto de peticiones de hasta siete días, con motivo real,
   fechas y orden de ejecución. Las funciones reducen lotes según límites.
5. Obtener autorización específica por escrito para ese manifiesto y ventana.
   Parar si el código activo difiere del commit auditado o cambia el rango.

## Preflight de producción, solo tras esa autorización

- Confirmar cuenta, Worker `cuidatuperroviejo`, D1 `cuidatuperroviejo-contact`,
  CONTACT_DB, CF_ANALYTICS_ACCOUNT_ID/SITE_TAG y presencia del token de lectura.
  No volcar valores de secrets.
- Confirmar main desplegado, SHA y versión/deployment, único cron `0 8 * * *`,
  migraciones 0005/0006 registradas, tablas y triggers presentes. Lecturas simples
  por separado. No modificar los schedules.
- Guardar snapshots privados de audience_days, audience_months, d1_migrations y
  sqlite_schema fuera del repo. Las tablas vivas de otras funciones pueden crecer:
  no exigir igualdad de recuentos como condición del tráfico normal.
- Comprobar que la ruta está deshabilitada con Basic válido y sin secret: 503.
- El propietario habilita temporalmente `AUDIENCE_RECOVERY_TOKEN` con un valor
  aleatorio exclusivo de esta operación, mediante el mecanismo de secrets que
  apruebe. `wrangler secret put` publica una versión; hacerlo forma parte de la
  autorización operativa, NO del merge. Si se usa el panel, evitar «Add variable
  and deploy» sin revisar la versión: puede publicar una preview de otra rama.
  Verificar antes y después que el código activo sigue siendo el main auditado.
  Guardar el mismo token solo en el entorno privado del operador.

## Invocar cada petición autorizada

Preparar el entorno privado del cliente con `CONTACT_ADMIN_USER`,
`CONTACT_ADMIN_PASSWORD`, `AUDIENCE_RECOVERY_TOKEN`. No reutilizar el token de
Analytics como autorización de recuperación. No activar trazas HTTP que impriman
cabeceras. Crear fuera del repo un JSON privado `recovery-request.json` con:

```json
{
  "from": "AAAA-MM-DD",
  "to": "AAAA-MM-DD",
  "reason": "Referencia concreta de autorización y motivo",
  "confirm": "RECOVER_AUDIENCE_DAYS"
}
```

Sustituir fechas y motivo por los del manifiesto autorizado (máximo siete días).
El siguiente cliente está **preparado, no ejecutado**. Ejecutarlo desde el
directorio privado que contiene ese JSON, nunca como parte del build o del cron:

```python
import os, json, base64, urllib.request
from pathlib import Path
body = Path('recovery-request.json').read_bytes()
credentials = (os.environ['CONTACT_ADMIN_USER'] + ':' +
               os.environ['CONTACT_ADMIN_PASSWORD']).encode()
request = urllib.request.Request(
    'https://cuidatuperroviejo.com/api/admin/audience/recover-days',
    data=body, method='POST', headers={
        'Authorization': 'Basic ' + base64.b64encode(credentials).decode(),
        'Content-Type': 'application/json',
        'X-Audience-Recovery-Token': os.environ['AUDIENCE_RECOVERY_TOKEN'],
    })
with urllib.request.urlopen(request, timeout=480) as response:
    result = json.load(response)
Path('recovery-response.json').write_text(json.dumps(result, indent=2))
```

Mantener una sola petición en curso y conservar cada respuesta con nombre
propio antes de pasar a la siguiente. Una respuesta HTTP 200 NO implica cobertura
completa: examinar cada estado y `requests`. Registrar identificador de operación
y correlacionar `audience_days_recovery_started/finished` en Workers Logs.
Los logs y respuestas no contienen totales; son evidencia de rango/cobertura.

## Interrupciones, límites y verificación

- Ante timeout del cliente o pérdida de conexión, no asumir rollback total ni
  cancelación del Worker: leer D1 y logs antes de reintentar el mismo rango.
- Un batch D1 es transaccional. Lotes previos completos quedan guardados; un lote
  que no llegó a commit no deja filas parciales. ON CONFLICT conserva toda fila
  anterior, incluidos fetched_at y sample_interval.
- Cada llamada tiene hasta 32 peticiones de datos +1 settings. Al agotarlas,
  quedan días `pendiente`. Reducir el siguiente rango a esos días dentro de la
  misma autorización; no ampliar fechas automáticamente.
- `fallido`: no se guardó el día. Un agregado vacío jamás es cero. Investigar
  incoherencia o truncamiento; no omitir comprobaciones ni ajustar sumas.
  Reintentar solo dentro del rango/ventana autorizados.
- `fuera de retención`: no recuperable como día completo por este mecanismo.
  No reconstruirlo desde meses ni rellenar ceros. Registrar la pérdida.
- Comparar filas preexistentes de audience_days y todas las de audience_months
  con snapshots: igualdad de campos; solo se permiten inserciones diarias nuevas.
  Si el cron ordinario coincide, distinguir sus días recientes de los del
  manifiesto con fetched_at, logs y ventanas; no pausar ni modificar el cron.
- Comprobar sin duplicados día/versión, límites UTC, fuente/filtro/versionado,
  sample_interval real y estimated coherente, fetched_at y ausencia de recálculo.
  Comparar muestras elegidas con GraphQL solo lectura, admitiendo que una nueva
  consulta adaptativa puede indicar muestreo o cifras distintas: investigar,
  nunca sobrescribir silenciosamente el archivo.
- Reconciliar cada fecha del manifiesto con un estado final. Guardar el informe
  saneado en el repo solo tras retirar cifras privadas y credenciales.

## Cierre de la ventana

Retirar `AUDIENCE_RECOVERY_TOKEN` con el mecanismo de secrets autorizado y volver
a verificar el código/deployment activo. `wrangler secret delete` también puede
publicar: no tratarlo como un paso inocuo de configuración. Confirmar 503 con
Basic válido, cron diario intacto, filas mensuales sin cambios y ausencia de
peticiones en curso. Destruir el token del entorno del operador. No hacer nuevas
recuperaciones por haber quedado el procedimiento preparado: requieren su
propia autorización específica.
