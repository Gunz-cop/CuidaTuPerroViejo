import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { sendContactEmail } from '../../../../lib/contact/email';
import { hasValidBasicAuth, unauthorizedResponse } from '../../../../lib/contact/security';
import type { ContactInput, ContactStatus } from '../../../../lib/contact/types';

export const prerender = false;

function isContactStatus(value: string): value is ContactStatus {
  return value === 'allowed' || value === 'quarantine' || value === 'rejected';
}

export const POST: APIRoute = async ({ request, params, redirect }) => {
  if (!hasValidBasicAuth(request, env.CONTACT_ADMIN_USER, env.CONTACT_ADMIN_PASSWORD)) {
    return unauthorizedResponse();
  }

  const id = Number(params.id);
  const formData = await request.formData();
  const nextStatus = formData.get('status')?.toString() || '';
  const shouldNotify = formData.get('notify')?.toString() === 'true';

  if (!Number.isInteger(id) || id <= 0 || !isContactStatus(nextStatus) || !env.CONTACT_DB) {
    return new Response('Bad request', { status: 400 });
  }

  await env.CONTACT_DB.prepare('UPDATE contact_messages SET status = ? WHERE id = ?').bind(nextStatus, id).run();

  if (nextStatus === 'allowed' && shouldNotify) {
    const result = await env.CONTACT_DB
      .prepare('SELECT name, email, subject, message FROM contact_messages WHERE id = ?')
      .bind(id)
      .first<ContactInput>();

    if (result) {
      await sendContactEmail({
        emailBinding: env.EMAIL,
        destinationEmail: env.CONTACT_DESTINATION_EMAIL,
        message: result,
      });
    }
  }

  return redirect(`/admin/contact-messages?status=${nextStatus}`, 303);
};
