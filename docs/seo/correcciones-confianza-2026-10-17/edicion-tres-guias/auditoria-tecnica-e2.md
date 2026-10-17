# Auditoría independiente E2: impresión de baño

Fecha2026-10-17. E2 de un máximo de3, limitada al delta técnico de `BanoAnimation.astro`; el auditor no corrigió producto. No reabre la auditoría clínica histórica R3 ni los contenidos aprobados editorialmente en E1. La compuerta técnica E1 no pasó: el primer oráculo omitía baño y, una vez corregido el selector, se detectó que no se imprimían todos sus pasos.

## Veredicto

**Aprobado el delta técnico E2 en local:** los tres apoyos muestran un paso por vez en pantalla con JavaScript, imprimen los cuatro y mantienen todos disponibles sin JavaScript.

Versión final de BanoAnimation SHA256 `eb91ae81c1982268e32f672b3094bf29d95a517cce0ddea2792fd3b5323cab12`. Frente a E1 `e5e0a9c38cc3f88c5060807bec266e14e3e346fc04eb3c2a380d066a36a163c6`, cambia únicamente el estado de paneles de `hidden` a `data-active`, con selectores correspondientes de pantalla e impresión. No cambia texto, imágenes, señales para parar, fuentes, control de reproducción o movimiento reducido. Los hashes de los tres MDX y OjosOidosVisual coinciden con E1.

## Hallazgos y comprobación

Sin P0/P1 nuevos. La actualización evita que la regla global de elementos `[hidden]` impida recuperar los pasos en impresión. El HTML inicial no añade `data-active=false` a ningún paso: sin JavaScript permanecen visibles todos. Con JavaScript, `display:none` excluye los pasos inactivos también del árbol accesible; en impresión `display:flex!important` los recupera. Los controles mantienen `hidden` inicial y se ocultan al imprimir.

Ejecuté de forma independiente el script conservado en `evidencias/verificar-impresion-e2-auditor.py`, sobre el build local final mediante Chromium a390px y con terceros bloqueados. Registro: `evidencias/impresion-e2-auditor.json`.

| Modo | Variantes | Pantalla inicial | Navegación | Impresión | Retorno a pantalla |
|---|---|---|---|---|---|
| JavaScript | espacio,pausa,zonas |1de4 visible por variante|Siguiente muestra paso2 y conserva1visible|4de4 visibles,controles ocultos|1de4 visible|
| Sin JavaScript | espacio,pausa,zonas |4de4 visibles por variante|No requiere controles|4de4 visibles,controles ocultos|4de4 visibles|

Resultado:6casos correctos,12pasos imprimibles y12pasos disponibles sin JavaScript. No sustituye las pruebas restantes del coordinador ni acredita preview/producción. El primer intento del auditor no pudo abrir socket bajo la restricción local; se repitió con permiso de red del entorno y finalizó correctamente, sin cambiar producto.

## Lo que debe conservarse

Mantener dataset de estado visual separado de `hidden` global para pasos que deban imprimirse, fallback HTML con todos los pasos, controles manuales y parada/reduced motion originales. El parche no altera el contenido clínico ni exige nueva lectura de fuentes.

## Pendiente externo a este delta

Cerrar matriz final completa del coordinador y revisar preview. Fusión a main, publicación en producción y solicitud AdSense siguen fuera de esta autorización. Configuración publicitaria definitiva pendiente.
