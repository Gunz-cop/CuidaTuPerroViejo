# Fuentes primarias de F3

Leídas el2026-10-09 por el autor de SDD, sin scans del sitio/evaluador ni llamadas con efectos. [Manifest](manifest.json) guarda URL solicitada/final, HTTP/MIME/fecha, SHA256 y bytes de **fuente original**, y por separado SHA256/bytes del **archivo publicado**. Texto RFC/README/JSON limpio es copia íntegra. HTML original completo está fuera del repo en `/workspace/f3-fuentes-originales/`, paths registrados por fuente; los `.txt` publicados son extractos de texto renderizado que omiten scripts/estilos/nav/header/footer y compactan líneas vacías, no copias completas del HTML ni evidencia de interfaces del producto.

| Fuente | Contenido normativo utilizado |
|---|---|
| [RFC9727](rfc9727.txt) | §§2–4: well-known sin sufijo, GET/HEAD, Link api-catalog, Linkset+JSON obligatorio y profile recomendado; A.1/A.2 item/service-desc |
| [RFC9264](rfc9264.txt) | §4.2: linkset array, context anchor, arrays de targets/href y metadata type/title |
| [Skills discovery](skills-readme.txt) | READMEv0.2.0: $schema opaco/no necesita resolver; índice/entryfields/naming/digest, frontmatter, HTTP GET/HEAD/MIME/CORS |
| [Skill format](skill-format.txt) | YAML name/description y Markdown instrucciones de una skill independiente |
| [OpenAPI](openapi31.txt) | OAS3.1.1, paths/operations/parameters/responses/headers, schemas Draft2020-12 y security[] |
| [AI Catalog modelo](air-spec.txt), [README](air-readme.txt) | specVersion1.0, host con displayName y optional identifier (dominio válido), entradas identifier/type/url XORdata, native MIMEapplication/ai-catalog+json; no inventar did:web |
| [ARD sitio](ard-spec.txt), [spec](ard-normative.txt) | v0.91/proposal/26-agosto-2026, §4entry+queryexamples; §5.1ard.json/relard actual, ai-catalog predecessor opcional; AppendixDschema |
| [ARD entry schema](ard-entry.schema.json) | Draft2020-12, `$defs/ArdEntry` y `ArdManifest`, fields esenciales/oneOfurl-data y extensiones abiertas |

El URI `https://schemas.agentskills.io/discovery/0.2.0/schema.json` respondió error de túnel proxy403; no se descargó ni se declara validado su contenido. El RFC primario archivado §Versioning dice **“The URI does not need to be resolvable”** y define en texto todos los campos/límites/HTTP. Por eso se fija schema local del subset exacto y URI opaco, sin inventar un schema remoto. Ese error no impide diseñar el contrato. Si una restricción esencial posterior aparece fuera de estas fuentes, STOP de SDD; no rellenarla en implementación.

Red: runtime cloud consultado, observaciones actuales, unrestricted/enforced, sin credenciales CLI; policyJSONexecutorunrestricted/vpnfalse. Lecturas HTTP por proxy/CA heredados, permiso network adicional específico, sin alteración de red ni impresión de secretos. Se aplicó skill [cloud-environment-runtime](skill://plugin_connector_1p_c5b7d5df5d7081918f2c4be5a633ed5d/cloud-environment-runtime/SKILL.md) para ese contexto. No se aplicó write-like-me a norma técnica del repo.
