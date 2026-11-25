# Ubersuggest

El propietario tiene **Ubersuggest Lifetime Enterprise** desde el 2026-11-25. Se usa a través del conector MCP de Ubersuggest en las sesiones de agentes.

## Límites del plan (consultados el 2026-11-25 con `user_limits`)

| Recurso | Límite |
| --- | --- |
| Informes diarios | 900 |
| Proyectos | 15 (uno en uso: cuidatuperroviejo.com) |
| Palabras clave monitorizadas por proyecto | 300 (cuenta: 4.500) |
| Competidores por proyecto | 15 |
| Actualizaciones mensuales de métricas (refresh de SERP, 2 créditos cada una) | 700 |
| Marcas de AI Search Visibility | 1, con 10 consultas |
| Palabras del redactor con IA | 10.000/mes |
| Frecuencia de seguimiento de posiciones | semanal |

Sirve para otros sitios del propietario (Camino al Mil, entre otros): hay 14 proyectos libres.

## Reglas de uso

- **Ubersuggest estima y Search Console mide.** Un volumen o un tráfico de Ubersuggest no sustituye a la exportación de Search Console filtrada por URL. La caída del −98,6 % que Ubersuggest estimó entre julio y agosto de 2026 no aparece en Search Console.
- **Mercados:** usa `location_suggest` para obtener el `locId`. España es 2724 y México 2484. El público es hispanohablante, así que no hay que mirar solo España.
- **`refresh` de SERP gasta créditos.** Solo se usa cuando `updated_at` es demasiado antiguo para la decisión que hay que tomar.
- **Guarda los resultados** que justifiquen un cambio en `docs/seo/investigacion/`, con fecha y mercado.

## Pendiente

- [ ] Crear una skill de investigación con Ubersuggest, replicable en otros repos (ver `TODO.md`).
