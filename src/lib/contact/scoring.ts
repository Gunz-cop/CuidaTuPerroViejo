import type { ContactInput, ContactScore, ContactStatus } from './types';

const URL_RE = /\bhttps?:\/\/[^\s<>"']+|\bwww\.[^\s<>"']+|\b[a-z0-9-]+(?:\.[a-z0-9-]+)+\/[^\s<>"']*/gi;
const SHORTENER_RE = /\b(?:bit\.ly|tinyurl\.com|t\.co|goo\.gl|ow\.ly|is\.gd|buff\.ly|cutt\.ly|rebrand\.ly|shorturl\.at|lnkd\.in)\b/i;
const STRANGE_TLD_RE = /\.(?:xyz|top|click|cam|cfd|icu|quest|win|rest|buzz|monster|work|zip|mov)(?:\/|\b)/i;
const SPAM_KEYWORDS_RE = /\b(?:jackpot|casino|crypto|wealth|guarantee|prize|backlinks)\b/i;
const WEAK_FINANCIAL_RE = /\bloan\b/i;
const GENERIC_RE = /\b(?:hi|hello|i want to exchange ideas|nice site)\b/i;
const PET_RE = /\b(?:perro|perra|gato|gata|mascota|veterinario|veterinaria|estres|estrés|ansiedad|miedo|trauma|ladridos|jadeo|senior|vejez|viejo|croquetas|comportamiento|dolor)\b/i;
const SPANISH_CONSULT_RE = /\b(?:consulta|necesito|quisiera|tengo|mi perro|mi perra|ayuda|sintomas|síntomas|veterinario|veterinaria)\b/i;

function addReason(reasons: string[], reason: string) {
  if (!reasons.includes(reason)) reasons.push(reason);
}

function hasUppercaseSubject(subject: string): boolean {
  const letters = subject.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, '');
  const uppercaseLetters = letters.replace(/[^A-ZÁÉÍÓÚÜÑ]/g, '');
  return (letters.length >= 8 && uppercaseLetters.length / letters.length > 0.85) || /[A-ZÁÉÍÓÚÜÑ]{10,}/.test(subject);
}

function looksGibberish(value: string): boolean {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (normalized.length < 10) return false;
  const vowelCount = (normalized.match(/[aeiou]/g) || []).length;
  const consonantRuns = normalized.match(/[bcdfghjklmnpqrstvwxyz]{6,}/g);
  const digitRatio = (normalized.match(/\d/g) || []).length / normalized.length;
  return vowelCount / normalized.length < 0.18 || Boolean(consonantRuns) || digitRatio > 0.45;
}

function getSubmittedTooFast(startedAt?: string): boolean {
  if (!startedAt) return false;
  const startedMs = Number(startedAt);
  return Number.isFinite(startedMs) && Date.now() - startedMs < 3000;
}

export function scoreContact(input: ContactInput): ContactScore {
  let spamScore = 0;
  let hamScore = 0;
  const reasons: string[] = [];
  const text = `${input.subject}\n${input.message}`;
  const urls = text.match(URL_RE) || [];

  if (urls.length > 0) {
    spamScore += 25;
    addReason(reasons, 'contains_url');
  }

  if (urls.length >= 2) {
    spamScore += 30;
    addReason(reasons, 'multiple_urls');
  }

  if (SPAM_KEYWORDS_RE.test(text)) {
    spamScore += 45;
    addReason(reasons, 'commercial_spam_keywords');
  }

  if (WEAK_FINANCIAL_RE.test(text)) {
    spamScore += 10;
    addReason(reasons, 'weak_financial_keyword');
  }

  if (hasUppercaseSubject(input.subject)) {
    spamScore += 15;
    addReason(reasons, 'uppercase_subject');
  }

  if (input.message.trim().length < 20) {
    spamScore += 15;
    addReason(reasons, 'too_short');
  }

  if (looksGibberish(input.name) || looksGibberish(input.email.split('@')[0] || '')) {
    spamScore += 15;
    addReason(reasons, 'gibberish_identity');
  }

  if (SHORTENER_RE.test(text) || STRANGE_TLD_RE.test(text)) {
    spamScore += 20;
    addReason(reasons, 'suspicious_url');
  }

  if (GENERIC_RE.test(text)) {
    spamScore += 15;
    addReason(reasons, 'generic_message');
  }

  if (getSubmittedTooFast(input.startedAt)) {
    spamScore += 15;
    addReason(reasons, 'submitted_too_fast');
  }

  if (PET_RE.test(text)) {
    hamScore += 35;
    addReason(reasons, 'pet_related');
  }

  if (input.message.trim().length > 180 && urls.length === 0) {
    hamScore += 25;
    addReason(reasons, 'long_coherent_no_url');
  }

  if (PET_RE.test(text) && SPANISH_CONSULT_RE.test(text)) {
    hamScore += 15;
    addReason(reasons, 'spanish_pet_consultation');
  }

  const finalScore = spamScore - hamScore;
  let status: ContactStatus = 'allowed';
  if (finalScore >= 55) status = 'rejected';
  else if (finalScore >= 20) status = 'quarantine';

  return { status, spamScore, hamScore, finalScore, reasons };
}
