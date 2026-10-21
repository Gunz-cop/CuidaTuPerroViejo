# Prompt: revisión de tono de los artículos

Copia esto en una sesión nueva:

---

Quiero alinear el tono de los artículos del blog con la guía de voz del sitio.

1. Lee `AGENTS.md`, `.agents/skills/references/guia-voz-tono.md` y `.agents/skills/references/calidad-editorial-adsense.md`.
2. Mide todo el blog con `python3 .agents/skills/references/scripts/tono.py` y ordena por muletillas/1000. Umbral: ≤ 3.
3. Trabaja **un artículo por PR**, empezando por los de más tráfico: `comida-casera-perros-mayores`, `incontinencia-urinaria-perros-mayores`, `ulceras-presion-perros`, y luego los que superen el umbral (cama ortopédica, prevención de caídas, poliquezia, incontinencia fecal, Cushing, disfunción cognitiva, insuficiencia pancreática, limpieza de ojos y oídos, salud dental).
4. Reescribe en afirmativo: de tú, primero qué hacer, una salvedad por H3 como máximo, advertencias de seguridad concentradas en `AlertBox`. **No cambies afirmaciones clínicas, fuentes, enlaces ni datos**: solo la voz. No inventes casos; si un artículo tendría una experiencia propia (Luna, Dakota), deja una nota en `TODO.md` para pedirme el material.
5. Entrega por artículo: valor de `tono.py` antes/después, `npx astro build` OK, y 2–3 ejemplos de frases antes/después.
6. Después, en **otra sesión**, audita cada artículo con `.agents/skills/auditar-articulo-blog/SKILL.md` (quien corrige no audita).
7. No subas evidencias, capturas ni PDFs a `main`. `main` publica en producción: abre PR y espera mi visto bueno para fusionar.
8. Actualiza `TODO.md` marcando lo hecho.
