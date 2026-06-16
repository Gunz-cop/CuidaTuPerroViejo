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
IMPORTANTE: Al final de tu respuesta, añade siempre un párrafo corto de advertencia en cursiva que recuerde que tus consejos son informativos y de bienestar, y que deben consultar con su veterinario de confianza de forma inmediata ante cualquier síntoma de gravedad o dolor agudo.`;

        aiResponse = await ai.run('@cf/meta/llama-3-8b-instruct', {
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
          answer: aiResponse.response,
          diagnostics
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. Fallback de simulación en desarrollo local (cuando el binding no está activo o falla)
    console.log('SDI AI: Utilizando respuesta simulada de contingencia.');
    
    let simulatedAnswer = `¡Hola! He recibido tu consulta sobre: "${trimmedQuestion}".

En el entorno de producción de Cloudflare Pages, aquí respondería la Inteligencia Artificial de Cloudflare utilizando el modelo LLaMA 3 para asistirte en tiempo real.

Como estamos en desarrollo local, aquí tienes unas pautas generales de nuestro portal:
- **Articulaciones y Dolor:** Evita que tu perro senior suba o baje escalones o muebles altos. Proporciona una cama ortopédica y mantén paseos cortos de bajo impacto sobre superficies no resbaladizas.
- **Alimentación:** Asegura una dieta con alta digestibilidad de proteínas y controla las calorías para evitar el sobrepeso.
- **Salud Mental:** Los juegos de olfato y mantener rutinas predecibles ayudan a mitigar los efectos del Síndrome de Disfunción Cognitiva (SDC).

*Nota: Esta respuesta ha sido generada por el fallback local. En producción, la IA de Cloudflare responderá de forma personalizada a tu consulta.*`;

    const lowerQ = trimmedQuestion.toLowerCase();
    if (lowerQ.includes('dolor') || lowerQ.includes('artrosis') || lowerQ.includes('caminar') || lowerQ.includes('pata') || lowerQ.includes('levantar')) {
      simulatedAnswer = `Detectamos que preguntas sobre **dolor o movilidad** en tu perro mayor. 

Aquí tienes algunos consejos clave:
1. **Suplementos:** Considera consultar con tu veterinario el uso de condroprotectores (glucosamina, condroitina) y ácidos grasos Omega-3 (aceite de salmón) para reducir la inflamación articular.
2. **Adaptaciones en el hogar:** Coloca alfombras antideslizantes por las zonas donde camine habitualmente para evitar caídas y dale una cama ortopédica viscoelástica para aliviar la presión.
3. **Paseos:** Estructura paseos cortos, planos y frecuentes (ej. 3 paseos de 10 minutos al día en lugar de uno largo de 30 minutos).

*Nota del asistente: Esta respuesta es simulada en desarrollo local. En producción, se generará mediante la IA de Cloudflare.*`;
    } else if (lowerQ.includes('comer') || lowerQ.includes('aliment') || lowerQ.includes('comida') || lowerQ.includes('pienso') || lowerQ.includes('nutric')) {
      simulatedAnswer = `Detectamos que preguntas sobre la **alimentación o nutrición** de tu perro mayor. 

Puntos clave a tener en cuenta:
1. **Proteínas digestibles:** Los perros senior sanos necesitan proteínas de alta calidad (pollo, pavo, pescado) para evitar la pérdida de masa muscular (sarcopenia).
2. **Control de peso:** El metabolismo disminuye y el perro se mueve menos. Ajusta las porciones para evitar el sobrepeso, que ejerce una presión dañina sobre sus articulaciones.
3. **Caldos y humedad:** Si le cuesta masticar o tiene menos apetito, humedece su comida con caldo de huesos tibio (sin sal ni cebolla) o utiliza alimentos húmedos de calidad.

*Nota del asistente: Esta respuesta es simulada en desarrollo local. En producción, se generará mediante la IA de Cloudflare.*`;
    }

    return new Response(
      JSON.stringify({ 
        answer: simulatedAnswer,
        diagnostics
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
