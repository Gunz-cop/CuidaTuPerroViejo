# Cierre de SDD F2

2026-10-06, coordinador de arquitectura. **SDD aprobada PASS 2/2; F2 aún no implementada ni publicada.**

[R1](auditoria/auditoria-sdd-f2-r1.md) FAIL exclusivamente B01 orden de hooks y B02 principal JSON-LD home. Un único ciclo corrigió ambas: [R2](auditoria/auditoria-sdd-f2-r2.md) PASS, cero bloqueantes, misma sesión independiente. No quedan revisiones de SDD en este encargo; no se reiniciaron contadores. Máximo5 revisiones por cada issue de implementación, contador distinto y todavía0.

| Identidad | Valor |
|---|---|
| Producto F1 publicado/base | `28bd92ecd424ff11b31e13e4a2ba499cb196a870` |
| SDD R1 local / pública | `77bd611d2d0f816bd8eb3f86b22a90456be0a257` / `9d17168e244dba849540c97fda0a6457973fcd35` |
| Tree R1 | `c6d414bf7101ce77877e38b75e6d58bdd8b48b14` |
| SDD R2 local / pública | `0a5390dbfa96b05b05cc4ad7df635fca5976f869` / `b9355ea55e718017954a6f9ca0ef3f75f431f605` |
| Tree R2 verificado por auditor | `a2203cae0f7a0f5fe95d7dd8edd3d845ff4a29f2` |
| SHA256 informe R1 | `ae4ed576de9b3377c2de3257d95b709106623eb7c807cfe5df6dc17e95aa3f56` |
| SHA256 informe R2 | `6508d5d03fccfa4c587d252fb6804435943483a86d017eec3e998d72c964b46e` |
| CI / Workers R2 público | `112102335157` success / `112102538170` success |

[PR54](https://github.com/Gunz-cop/CuidaTuPerroViejo/pull/54) documental draft. El commit posterior de cierre solo añade informes/ratificación y modifica el encabezado de estado; contratos y resto de spec permanecen idénticos a R2. El issue A fija ese SHA público completo como base, con tree comprobado; no necesita un SHA autorreferente dentro de este archivo. B se crea bloqueado, sin base ejecutable hasta A aceptada.

Ratificación: D06–D10 concretan F2 sin alterar contratos históricos F0/F1; adapter primero, proyección después de sitemap/F1; ASSETS Request para documentos, no-store exterior y cache interna de assets, corpus derivado hasta98. Se reservan shared files en serie. Programador Luna6high, auditor distinto y reglas STOP/bug de SDD vigentes. Sin merge/deploy F2 autorizado, nuevos scans ni cambios de contenido editorial.
