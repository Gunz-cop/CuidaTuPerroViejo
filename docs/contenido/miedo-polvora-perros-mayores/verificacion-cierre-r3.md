# Verificación independiente del cierre de R3 — LA-01

- Fecha: 2026-11-08.
- Versión comprobada: `58571f30515ecd39e28d2e21aca181f4ce72269a`.
- Archivo: `src/content/blog/miedo-polvora-perros-mayores.mdx`.
- SHA-256: `395246068f24366e49924e079f713a5746386ea7ebe51a099f18513c371f6d25`.
- Alcance: cierre puntual de las reservas de `auditoria-articulo-r3.md`; **no es una R4**.

## Resultado

**Ambas reservas están cerradas. La entrega textual queda validada dentro del alcance de R3.**

| Reserva | Comprobación propia | Resultado |
|---|---|---|
| P2-1, contexto de la casi mordida de Dakota | Se leyó el diff y el pasaje resultante. Se retiró «No fue con pólvora», preservando el hecho documentado y su función al distinguir compañía de sujeción. | Cerrada por retirada del contexto no confirmado. No hace falta que el propietario reconstruya el momento para validar esta versión. |
| P2-2, exclusividad de la Ley 2224 | La frase actual describe directamente la pedagogía sobre animales exigida a los municipios, sin afirmar que ninguna otra norma leída los mencione. | Cerrada. Se mantiene la distinción entre pedagogía y prohibición general. |

También se comprobaron los tres retoques de pulido declarados: se eliminó el «Por eso» repetido, se unió la identificación de Gonzalo a la apertura y se dividió el párrafo de la reunión. El diff del MDX no contiene cambios adicionales fuera de ese cierre. No se modificó el artículo durante la verificación.

Recuento independiente con el mismo verificador de R1–R3: **5.531 palabras**, coincidente con `cierre-reservas-r3.md`. `tono.py`: **0 muletillas/1.000**. Comparación de ocho palabras en texto visible con España: ninguna coincidencia bajo el método documentado. Estas mediciones no prueban funcionamiento visual ni resultados SEO.

Evidencia: `auditoria-articulo-r3-evidencias/cierre-verificado.json`.

## Alcance pendiente

Se mantiene la validación de integración narrativa de R3. No se necesita otra reescritura de fondo. La publicación completa sigue pendiente de imágenes, identificación de las beagles si se usa la fotografía, demás compromisos del expediente, revisión en móvil/accesibilidad y comprobación técnica final. El build que declara la sesión correctora no se ha repetido en esta verificación. No se fusionó ni desplegó en producción.
