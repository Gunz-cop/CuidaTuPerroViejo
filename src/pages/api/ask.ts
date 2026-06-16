import type { APIRoute } from 'astro';

export const prerender = false; // Indica a Astro que esta ruta se ejecute dinámicamente en el servidor (Cloudflare Worker)

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Cuerpo de petición inválido. Debe ser JSON.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { question } = body;

    if (!question || typeof question !== 'string' || question.trim().length < 3) {
      return new Response(
        JSON.stringify({ error: 'La pregunta debe tener al menos 3 caracteres.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (question.length > 500) {
      return new Response(
        JSON.stringify({ error: 'La pregunta no debe exceder los 500 caracteres.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const trimmedQuestion = question.trim();

    // 1. Obtener el binding de Cloudflare Workers AI
    const cfEnv = (locals as any).runtime?.env || {};
    const ai = cfEnv.AI;
    let aiResponse = null;
    let caughtError: string | null = null;

    // 2. Si el binding de IA está disponible, intentar ejecutar el modelo
    if (ai) {
      try {
        const systemPrompt = `Eres un veterinario y asistente experto en el cuidado de perros senior (ancianos), empático, científico y muy claro. 
Tus respuestas deben estar redactadas en español de manera cálida pero profesional. 
Usa viñetas o listas si es apropiado para que la información sea fácil de leer en la burbuja de chat de un teléfono móvil. 
Orienta al usuario basándote en los pilares del cuidado senior: nutrición adaptada, ejercicio de bajo impacto, salud mental (disfunción cognitiva canina), higiene adaptada, manejo del dolor de articulaciones (artrosis) y cuidados paliativos.

IMPORTANTE: Si la consulta del usuario se relaciona de manera directa con alguno de los siguientes temas, debes incluir obligatoriamente el enlace markdown correspondiente dentro de tu explicación de forma natural y fluida (ejemplo: "...te sugerimos consultar nuestra [guía sobre alimentación casera](/alimentacion-perros-senior/comida-casera-perros-mayores)..."). No inventes otros enlaces que no estén en esta lista:
- Dolor articular, artrosis o camas ortopédicas: [guía de camas ortopédicas](/movilidad-dolor-perros-mayores/cama-ortopedica-perros-mayores-displasia-artrosis)
- Prevención de caídas, resbalones o adaptaciones del hogar: [guía de prevención de caídas](/movilidad-dolor-perros-mayores/prevencion-caidas-perro-mayor)
- Recetas de comida o alimentación casera: [guía de comida casera](/alimentacion-perros-senior/comida-casera-perros-mayores)
- Desorientación, demencia senil o Alzheimer en perros: [guía de disfunción cognitiva](/salud-mental-emocional-perros/disfuncion-cognitiva-canina)
- Dar pastillas, jarabes o medicación difícil: [guía para dar medicación](/cuidados-paliativos-perros/como-dar-medicacion-perro)
- Úlceras, llagas o escaras por estar acostado: [guía de úlceras por presión](/cuidados-paliativos-perros/ulceras-presion-perros)
- Cuándo llevar al veterinario o chequeo de salud general: [guía de chequeo geriátrico](/salud-perros-mayores/chequeo-geriatrico-canino)
- Dientes, encías o sarro: [guía de salud dental](/salud-perros-mayores/salud-dental-perros-mayores)
- Calendario de vacunación o parásitos: [guía de vacunas y desparasitación](/salud-perros-mayores/vacunas-desparasitacion-perros-senior)

IMPORTANTE: Al final de tu respuesta, añade siempre un párrafo corto de advertencia en cursiva que recuerde que tus consejos son informativos y de bienestar, y que deben consultar con su veterinario de confianza de forma inmediata ante cualquier síntoma de gravedad o dolor agudo.`;

        aiResponse = await ai.run('@cf/meta/llama-3.2-3b-instruct', {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: trimmedQuestion }
          ]
        });
      } catch (aiError: any) {
        caughtError = aiError.message || String(aiError);
        console.warn('SDI AI: Falló la ejecución del modelo AI (usaremos fallback local):', caughtError);
      }
    }

    const diagnostics = {
      hasLocals: typeof locals !== 'undefined',
      hasRuntime: typeof (locals as any)?.runtime !== 'undefined',
      envKeys: Object.keys(cfEnv),
      hasAi: typeof ai !== 'undefined',
      aiError: caughtError
    };

    // 3. Si obtuvimos respuesta exitosa de la IA, retornarla
    if (aiResponse && aiResponse.response) {
      return new Response(
        JSON.stringify({ 
          answer: aiResponse.response
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. Fallback de simulación en desarrollo local (cuando el binding no está activo o falla)
    console.log('SDI AI: Utilizando respuesta simulada de contingencia.');
    
    let simulatedAnswer = `¡Hola! He recibido tu consulta sobre: "${trimmedQuestion}".

Como no pudimos conectar con el servidor de IA de producción (o estás en desarrollo local), aquí tienes una respuesta con enlaces del portal:
- **Dolor articular:** Si notas rigidez al caminar, revisa nuestra [guía de prevención de caídas](/movilidad-dolor-perros-mayores/prevencion-caidas-perro-mayor) o bríndale una [cama ortopédica para perros mayores](/movilidad-dolor-perros-mayores/cama-ortopedica-perros-mayores-displasia-artrosis).
- **Alimentación:** Si tienes dudas de nutrición, lee nuestra [guía de comida casera para perros mayores](/alimentacion-perros-senior/comida-casera-perros-mayores).
- **Desorientación:** Para la demencia senil, consulta la [guía de disfunción cognitiva](/salud-mental-emocional-perros/disfuncion-cognitiva-canina).

*Nota: Esta respuesta ha sido generada por el fallback local con enlaces del sitio.*`;

    const lowerQ = trimmedQuestion.toLowerCase();
    if (lowerQ.includes('dolor') || lowerQ.includes('artrosis') || lowerQ.includes('caminar') || lowerQ.includes('pata') || lowerQ.includes('levantar')) {
      simulatedAnswer = `Detectamos que preguntas sobre **dolor o movilidad** en tu perro mayor. 

Aquí tienes algunos consejos clave:
1. **Suplementos:** Considera consultar con tu veterinario el uso de condroprotectores y ácidos grasos Omega-3 para reducir la inflamación articular.
2. **Adaptaciones en el hogar:** Consulta nuestra [guía de prevención de caídas](/movilidad-dolor-perros-mayores/prevencion-caidas-perro-mayor) para evitar resbalones y colócale una [cama ortopédica para artrosis](/movilidad-dolor-perros-mayores/cama-ortopedica-perros-mayores-displasia-artrosis) para aliviar la presión de sus articulaciones.
3. **Paseos:** Estructura paseos cortos, planos y frecuentes.

*Nota del asistente: Respuesta con enlaces simulada localmente.*`;
    } else if (lowerQ.includes('comer') || lowerQ.includes('aliment') || lowerQ.includes('comida') || lowerQ.includes('pienso') || lowerQ.includes('nutric')) {
      simulatedAnswer = `Detectamos que preguntas sobre la **alimentación o nutrición** de tu perro mayor. 

Puntos clave a tener en cuenta:
1. **Proteínas digestibles:** Los perros senior sanos necesitan proteínas de alta calidad para evitar la pérdida de masa muscular. Conoce recetas saludables en nuestra [guía de comida casera para perros senior](/alimentacion-perros-senior/comida-casera-perros-mayores).
2. **Control de peso:** El metabolismo disminuye. Ajusta las porciones para evitar el sobrepeso, que ejerce una presión dañina sobre sus articulaciones.
3. **Caldos y humedad:** Si le cuesta masticar, humedece su comida con caldo de huesos tibio.

*Nota del asistente: Respuesta con enlaces simulada localmente.*`;
    }

    return new Response(
      JSON.stringify({ 
        answer: simulatedAnswer
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('SDI AI POST Error:', error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error al procesar tu consulta de IA.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
