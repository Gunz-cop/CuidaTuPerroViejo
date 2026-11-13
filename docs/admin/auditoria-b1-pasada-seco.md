# Auditoría independiente · B1, pasada en seco del archivo diario

- **Auditor:** Claude Code. No corrige ni propone código.
- **Objeto:** [PR #178](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/178), `docs/admin/b1-pasada-seco.md`, de Codex.
- **Fecha:** 2026-11-12.
- **Veredicto:** **APTO.** La evidencia responde lo que pedía B1. **Con los datos actuales no hace falta cambiar el criterio de igualdad estricta.**

## Contra el encargo

| Requisito | Resultado |
|---|---|
| Solo lectura: sin `writeDays`, sin la ruta HTTP, sin secret, sin D1 ni KV | Cumple. El adaptador solo capturó y reprodujo respuestas, sin bindings. |
| Misma lógica que el código auditado | Cumple. Importa `fetchDays()` y `queryHours()` reales. El hash del archivo coincide con `main` y su código no difiere de `1f0805d`. La única ampliación fue pedir `sampleInterval` por hora para el informe, sin cambiar filtros, ventanas ni validaciones. |
| Todo el rango recuperable, incluidos los días recientes | Cumple: 184 días locales (del 12 de mayo al 11 de noviembre), 183 consultados y 1 fuera de retención. |
| Por día: estado, muestreo diario y por hora, diferencias relativas, coma flotante y modo de consulta | Cumple. La tabla diaria está completa y las sumas se comprobaron también de forma independiente con IEEE-754. |
| Sin cifras absolutas en el repositorio y sin propuesta de criterio | Cumple |
| Cuota de GraphQL | 184 peticiones en unos 5 minutos, con separación mínima de 1,1 s. Está dentro de la cuota (unas 300 cada 5 minutos). |

## Interpretación

1. **El riesgo de B1 no se materializa en los datos actuales.** Hay 170 días con datos, **ninguno con diferencias**, incluidos 162 muestreados (`sampleInterval` entre 1 y 15) y 9 con señales horarias mezcladas. Tampoco hay casos de coma flotante. El riesgo teórico era razonable, pero los datos no lo confirman. La igualdad estricta puede mantenerse, sabiendo que este resultado describe esta pasada y no garantiza consultas futuras.
2. **Confirma el aviso del propietario sobre el muestreo reciente:** el 3 de noviembre, dentro de la ventana ordinaria, vino con `sampleInterval = 10`. El archivo ordinario lo trata bien: lo guardaría como «estimado».
3. **Los 13 días vacíos** (del 13 al 21 de mayo, y algunos de junio) **no pueden distinguirse** entre «sin visitas» y «la muestra conservada por RUM no contiene eventos de ese día». En días de poco tráfico con un muestreo de alrededor del 10 % es plausible lo segundo. El código actúa correctamente: no los guarda y se mostrarán como «Sin datos», nunca como 0. Hay que tenerlo en cuenta al leer mayo y junio en el explorador.
4. **Alcance de la evidencia:** los días se consultaron **sueltos**. En la recuperación real, `recoverDays()` empieza por lotes de 7 días y los divide si el lote no cuadra; al final, cada día problemático se consulta suelto, igual que en esta pasada. El peor caso por petición HTTP es de unas 13 consultas, dentro del presupuesto de 32.

## El 403 (error 1010)

Es compatible con la **comprobación de la firma del navegador** de Cloudflare frente a un cliente `urllib` con su agente predeterminado. No es un fallo de la aplicación: desde otro entorno, `/` responde 200 y `/admin` responde 401. **Consecuencia práctica para la recuperación:** el operador que llame a la ruta debe usar un cliente que no active ese bloqueo, sin desactivar ninguna protección de Cloudflare. Hay que indicarlo en el procedimiento.

## Recomendación al propietario

- **No cambiar el criterio de igualdad.** B1 queda resuelto con evidencia.
- La recuperación histórica puede autorizarse cuando el procedimiento incorpore:
  - **O2:** la lista de control por tramos de 7 días;
  - **O3:** verificar la versión publicada al crear y al borrar `AUDIENCE_RECOVERY_TOKEN`;
  - el cliente HTTP adecuado (punto anterior);
  - la expectativa de unos 13 días «vacíos», que **no son fallos de la operación**.
- O1 (aviso de presupuesto agotado) sigue pendiente y no bloquea.
- **Urgencia:** cada día se pierde un día del principio del histórico diario recuperable.
