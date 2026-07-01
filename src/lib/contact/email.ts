import { escapeHtml } from './security';
import type { ContactInput } from './types';

interface SendContactEmailOptions {
  emailBinding: any;
  destinationEmail?: string;
  message: ContactInput;
}

export async function sendContactEmail({ emailBinding, destinationEmail, message }: SendContactEmailOptions) {
  if (!emailBinding || !destinationEmail) return;

  await emailBinding.send({
    to: destinationEmail,
    from: 'contacto@cuidatuperroviejo.com',
    subject: `Contacto: ${message.subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #efeee9; border-radius: 12px; background-color: #faf9f4;">
        <h2 style="color: #45634f; margin-bottom: 20px;">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(message.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(message.email)}</p>
        <p><strong>Asunto:</strong> ${escapeHtml(message.subject)}</p>
        <hr style="border: 0; border-top: 1px solid #e3e3de; margin: 20px 0;" />
        <p><strong>Mensaje:</strong></p>
        <p style="white-space: pre-wrap; background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e9e8e3;">${escapeHtml(message.message)}</p>
      </div>
    `,
  });
}
