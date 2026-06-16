import type { APIRoute } from 'astro';

export const prerender = false; // Indica a Astro que esta ruta se ejecute dinámicamente en el servidor (Cloudflare Worker)

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const subject = formData.get('subject')?.toString().trim();
    const message = formData.get('message')?.toString().trim();
    const gotcha = formData.get('_gotcha')?.toString();

    // 1. Protección básica contra spam (Campo Honeypot)
    if (gotcha) {
      console.warn('SDI Contact: Intento de spam detectado por honeypot.');
      return redirect('/gracias', 303);
    }

    // 2. Validación de campos obligatorios
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos (nombre, email, asunto, mensaje) son obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Obtener variables de entorno (desde Cloudflare Workers locals.runtime.env o process.env local)
    const cfEnv = (locals as any).runtime?.env || {};
    const resendApiKey = cfEnv.RESEND_API_KEY || process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    const destEmail = cfEnv.CONTACT_DESTINATION_EMAIL || process.env.CONTACT_DESTINATION_EMAIL || import.meta.env.CONTACT_DESTINATION_EMAIL;

    // 4. Guardar copia de seguridad en Cloudflare KV (si está vinculado)
    const contactKv = cfEnv.CONTACT_KV;
    if (contactKv) {
      const timestamp = new Date().toISOString();
      const randomId = Math.random().toString(36).substring(2, 11);
      const submissionKey = `contacto:${timestamp}:${randomId}`;
      const submissionData = JSON.stringify({
        timestamp,
        name,
        email,
        subject,
        message,
        ip: request.headers.get('cf-connecting-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      });
      await contactKv.put(submissionKey, submissionData);
      console.log(`SDI Contact: Mensaje guardado en KV con la clave ${submissionKey}`);
    } else {
      console.warn('SDI Contact: No se encontró la vinculación CONTACT_KV. Saltando guardado en BD.');
    }

    // 5. Enviar correo de notificación mediante Cloudflare Email Sending nativo
    const emailBinding = cfEnv.EMAIL;
    if (emailBinding && destEmail) {
      try {
        await emailBinding.send({
          to: destEmail,
          from: 'contacto@cuidatuperroviejo.com',
          subject: `Contacto: ${subject}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #efeee9; border-radius: 12px; background-color: #faf9f4;">
              <h2 style="color: #45634f; margin-bottom: 20px;">Nuevo mensaje de contacto</h2>
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Asunto:</strong> ${subject}</p>
              <hr style="border: 0; border-top: 1px solid #e3e3de; margin: 20px 0;" />
              <p><strong>Mensaje:</strong></p>
              <p style="white-space: pre-wrap; background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e9e8e3;">${message}</p>
            </div>
          `
        });
        console.log('SDI Contact: Notificación de correo enviada con éxito (Cloudflare Email Sending).');
      } catch (sendError: any) {
        console.error('SDI Contact: Fallo al enviar email de forma nativa:', sendError.message);
      }
    } else {
      console.warn('SDI Contact: Vinculación EMAIL o CONTACT_DESTINATION_EMAIL no configurada. Saltando envío de correo.');
    }

    // 6. Redirección final de éxito (HTTP 303 See Other)
    return redirect('/gracias', 303);
  } catch (error) {
    console.error('SDI Contact: Error crítico procesando contacto:', error);
    // Redirigir de todos modos para no dejar la página en blanco, o mostrar un error JSON
    return new Response(
      JSON.stringify({ error: 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
