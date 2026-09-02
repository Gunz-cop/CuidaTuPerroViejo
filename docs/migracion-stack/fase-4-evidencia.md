# F4 — evidencia del ajuste de compatibilidad

**Base:** `origin/migracion/astro-7@f9f2052`  
**Rama:** `codex/f4-astro7`  
**Fecha:** 2026-09-03

## Markup preexistente corregido

`src/components/CanineAiAssistant.astro` conservaba, después del cierre
legítimo del formulario de envío, tres cierres huérfanos:

```astro
</svg>
</button>
</form>
```

Eran markup preexistente que el compilador de Astro 6 toleraba y que Astro 7
rechaza con `Closing tag '</svg>' has no matching opening tag`. Se eliminaron
únicamente esos tres cierres sobrantes. No se modificaron el SVG, el botón ni
el `</form>` legítimos del formulario.

## Alcance

El ajuste no toca contenido MDX, CI, tests, specs protegidas, redirects,
headers, enlaces internos ni `src/layouts/BaseLayout.astro`. No incluye cambios
visuales ni de arquitectura.

## Estado de verificación

`npm ci` con Node 24 y npm 10, `astro check`, `npm test` y los tipos del Worker
se ejecutan como parte de esta corrección. El build y los checks remotos quedan
registrados con su resultado real en el PR; este documento no declara F4
aprobada.

La verificación visual de Safari 16.4–17 no forma parte de este ajuste y no se
declara realizada.
