# Adsterra: dónde estaba y qué código se conserva

Respaldo histórico exacto de `main` **9d05e9b95bb39679826134810ca864d3952bf15e**, preparado2026-10-18. **No se ha retirado ni restaurado publicidad con este documento.** Ninguna copia vive en `public/` ni se importa en Astro. No se inventan nuevos códigos.

## Mapa de ubicación

| Archivo | Qué hacía / colocación |
|---|---|
| `src/components/ads/AdBanner300x250.astro` | Banner300×250 con clave10df…; template con configuración y script reales. |
| `src/components/ads/AdSlotLoader.astro` | Activa `.ad-slot[data-ad-pending="true"]` al entrar en viewport (margen200px); clona el template y elimina placeholder si contiene código. Esta carga diferida **no solicita consentimiento**. |
| `src/components/PostReader.astro` | Duplica en HTML el banner300×250 tras el segundo párrafo editorial y añade320×50 a mitad del texto, si hay separación suficiente. El cálculo evita los rangos de recursos atómicos. |
| `src/pages/[pilar]/[slug].astro` | Importa/inserta sticky y loader al final; conserva un comentario sobre el native pausado. |
| `src/pages/[pilar].astro` | Dos instancias del300×250, en las secciones de esa plantilla, y un loader final. |
| `src/pages/herramientas/calculadora-edad-perro.astro` |300×250 dentro del contenedor `mx-auto max-w-3xl px-5 pb-12 sm:px-6`, y loader final. |
| `src/pages/herramientas/calculadora-calidad-vida-perros.astro` |300×250 y loader. No forma parte de la lógica de puntuación. |
| `src/pages/herramientas/selector-movilidad-perros-mayores.astro` |300×250 y loader. Restaurar solo esas referencias: no tocar `MobilityTool`, sus imágenes ni API/MCP1.1. |
| `src/components/ads/AdStickyMobile320x50.astro` | Espacio fijo50px móvil/tableta `md:hidden`; su template solo tiene el comentario `ADSTERRA_STICKY_320x50`. **Sin código de proveedor** en esta base. |
| `src/components/ads/AdNativeBanner.astro` | Template solo con comentario; pausado por anuncios de citas fuera de marca. **Sin código de proveedor** en esta base. |
| Privacidad y cookies | Identifican Adsterra y enlazan su política. Restaurar únicamente si vuelve a ser proveedor activo, adaptando el texto y el consentimiento reales. |

Las líneas exactas de esta base y hashes están en [adsterra-inventario.json](adsterra-inventario.json). Las rutas completas de cada snapshot se obtienen en su campo `snapshot`; terminan en `.astro.txt` para conservar la fuente sin convertirla en componente ejecutable.

## Los dos códigos existentes

### 300×250: componente y copia en PostReader

Configuración original del componente:

```astro
<script is:inline>
  atOptions = {
    'key' : '10df6b95565e4b70f014e77906b6218c',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script is:inline src="https://www.highperformanceformat.com/10df6b95565e4b70f014e77906b6218c/invoke.js"></script>
```

El contenedor/template completo está en [snapshot del componente](adsterra-respaldo/src/components/ads/AdBanner300x250.astro.txt). El bloque `AD_300x250_HTML` de [PostReader](adsterra-respaldo/src/components/PostReader.astro.txt) contiene la misma clave y dimensiones dentro de su cadena HTML. No basta con recuperar el componente si también se quieren banners dentro del cuerpo de los artículos.

### 320×50: banner intermedio de PostReader

Código contenido en la cadena `AD_320x50_MID_HTML`:

```astro
<script is:inline>atOptions = {'key' : '77fb25612074d9660a62a330b778e5ad','format' : 'iframe','height' : 50,'width' : 320,'params' : {}};</script>
<script is:inline src="https://www.highperformanceformat.com/77fb25612074d9660a62a330b778e5ad/invoke.js"></script>
```

Ese código corresponde al banner **intermedio**, no demuestra que sea válido para una zona sticky. No copiarlo a otro formato para rellenar un hueco. El sticky y native solo se reactivarán si el propietario decide usarlos y obtiene códigos vigentes de esas zonas; no hay un script perdido que pueda reconstruirse con certeza en esta base.

Son identificadores publicitarios públicos ya presentes en el sitio, no credenciales de acceso. Hay que comprobar en Adsterra que las zonas sigan vigentes y sean las del sitio antes de volver a servirlas.

## Cómo retirar y, si se decide, recuperar sin perder mejoras

La retirada preparada es [retirada-propuesta.patch](retirada-propuesta.patch). Primero revisar su diff y la propuesta de consentimiento; todavía no está aplicada.

```sh
# Desde la raíz, comprobar antes de aplicar el cambio acordado:
git apply --check docs/publicidad/2026-10-18/retirada-propuesta.patch

# Tras decidir la entrega, aplicar en una rama de trabajo:
git apply docs/publicidad/2026-10-18/retirada-propuesta.patch

# Si posteriormente se decide recuperar, comprobar el parche inverso:
git apply --reverse --check docs/publicidad/2026-10-18/retirada-propuesta.patch
```

El inverso es una ayuda de recuperación, no una orden para publicar. Solo si sigue aplicando y su diff conserva los cambios nuevos puede usarse `git apply --reverse` en una rama. También revertiría los dos párrafos legales provisionales: deben revisarse contra los servicios actuales, nunca publicarse a ciegas. Si no aplica, usar los bloques de las snapshots y reinsertar únicamente anuncios/imports/loader; **no sobrescribir páginas completas** de movilidad, calculadoras o artículos desde el respaldo.

Los ficheros originales también se pueden consultar sin modificar el checkout:

```sh
git show 9d05e9b95bb39679826134810ca864d3952bf15e:src/components/ads/AdBanner300x250.astro
git show 9d05e9b95bb39679826134810ca864d3952bf15e:src/components/PostReader.astro
git show '9d05e9b95bb39679826134810ca864d3952bf15e:src/pages/herramientas/selector-movilidad-perros-mayores.astro'
```

## Condiciones de una recuperación posterior

- La decisión de volver a Adsterra no se ejecuta automáticamente por un rechazo de Google.
- Los bloques originales cargan al desplazarse: no incorporan una autorización de publicidad. La recuperación debe integrar los proveedores y requisitos efectivos con una solución de consentimiento adecuada. No asumir que Google CMP cubre automáticamente toda la cadena de Adsterra.
- Confirmar zonas, categorías bloqueadas y contenido de anuncios. El native pausado por citas sigue pausado salvo decisión nueva y comprobación del proveedor.
- No se restaura el main antiguo, golden antiguo, oráculo borrado ni fuentes/avisos de movilidad1.0. Regenerar fixtures que cambien por HTML y pasar todos los controles definidos por el propietario.
- Actualizar privacidad/cookies y verificar consentimiento/carga en móvil y escritorio en preview y producción; no solicitar AdSense como parte de la restauración.
