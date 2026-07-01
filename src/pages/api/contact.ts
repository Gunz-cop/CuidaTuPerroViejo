import type { APIRoute } from 'astro';
import { sendContactEmail } from '../../lib/contact/email';
import { hashIp, isValidEmail } from '../../lib/contact/security';
import { scoreContact } from '../../lib/contact/scoring';
import { insertContactMessage } from '../../lib/contact/storage';
import type { ContactInput, ContactMessageRecord } from '../../lib/contact/types';

export const prerender = false;

const jsonOk = () =>
  new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });

function getEnv(locals: unknown): Record<string, any> {
  return ((locals as any).runtime?.env || {}) as Record<string, any>;
}

function readField(formData: FormData, field: string): string {
  return formData.get(field)?.toString().trim() || '';
}

function isTechnicallyValid(input: ContactInput): boolean {
  return Boolean(
    input.name &&
      input.email &&
      input.subject &&
      input.message &&
      isValidEmail(input.email) &&
      input.message.length >= 20 &&
      input.message.length <= 4000 &&
      input.subject.length <= 200 &&
      input.name.length <= 120,
  );
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  if (!token || !secret) return false;

  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip !== 'unknown') body.append('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });

  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

async function buildIpHash(ip: string, salt?: string): Promise<string | null> {
  if (ip === 'unknown') return null;
  if (!salt) throw new Error('CONTACT_IP_HASH_SALT is not configured');
  return hashIp(ip, salt);
}

async function maybeStoreHoneypotSubmission(db: any, input: ContactInput, request: Request, ipHash: string | null) {
  if (!db || !input.name || !input.email || !input.subject || !input.message) return;

  await insertContactMessage(db, {
    ...input,
    status: 'rejected',
    spamScore: 100,
    hamScore: 0,
    finalScore: 100,
    reasons: ['honeypot'],
    ipHash,
    userAgent: request.headers.get('user-agent') || 'unknown',
    createdAt: new Date().toISOString(),
  });
}

export const POST: APIRoute = async ({ request, locals }) => {
  const env = getEnv(locals);
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const db = env.CONTACT_DB;

  try {
    const formData = await request.formData();
    const input: ContactInput = {
      name: readField(formData, 'name'),
      email: readField(formData, 'email'),
      subject: readField(formData, 'subject'),
      message: readField(formData, 'message'),
      startedAt: readField(formData, 'startedAt'),
    };
    const website = readField(formData, 'website');
    const turnstileToken = readField(formData, 'cf-turnstile-response');
    const ipHash = await buildIpHash(ip, env.CONTACT_IP_HASH_SALT);

    if (website) {
      await maybeStoreHoneypotSubmission(db, input, request, ipHash);
      return jsonOk();
    }

    if (!isTechnicallyValid(input)) return jsonOk();

    const turnstileOk = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
    if (!turnstileOk) return jsonOk();

    const score = scoreContact(input);
    const record: ContactMessageRecord = {
      ...input,
      status: score.status,
      spamScore: score.spamScore,
      hamScore: score.hamScore,
      finalScore: score.finalScore,
      reasons: score.reasons,
      ipHash,
      userAgent: request.headers.get('user-agent') || 'unknown',
      createdAt: new Date().toISOString(),
    };

    await insertContactMessage(db, record);

    if (score.status === 'allowed') {
      await sendContactEmail({
        emailBinding: env.EMAIL,
        destinationEmail: env.CONTACT_DESTINATION_EMAIL,
        message: input,
      });
    }

    return jsonOk();
  } catch (error) {
    console.error('Contact endpoint failed:', error);
    return jsonOk();
  }
};
