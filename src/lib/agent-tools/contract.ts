// Contrato común de las dos herramientas (contratos F4A §1–§2). Sin DOM, red ni
// dependencias: lo importan la UI, el Worker, WebMCP, tests y scripts de Node.

export const SITE = 'https://cuidatuperroviejo.com';
export const SCHEMA_VERSION = 'agent-api/1';

export interface ToolInfo {
  toolId: 'calidad-vida' | 'movilidad';
  documentId: 'tool--calidad-vida' | 'tool--movilidad';
  name: string;
  canonicalUrl: string;
  softwareVersion: string;
  lastReviewed: string;
}

export interface Guide {
  label: string;
  url: string;
}

/** Entrada que no cumple el contrato; API → 400 y WebMCP → INVALID_REQUEST. */
export class ToolInputError extends Error {
  constructor() {
    super('INVALID_REQUEST');
    this.name = 'ToolInputError';
  }
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/** Exige exactamente las keys indicadas: ninguna falta y ninguna sobra. */
export function requireExactKeys(value: unknown, keys: readonly string[]): Record<string, unknown> {
  if (!isPlainObject(value)) throw new ToolInputError();
  const own = Object.keys(value);
  if (own.length !== keys.length || !keys.every((key) => Object.hasOwn(value, key))) throw new ToolInputError();
  return value;
}

export function requireInteger(value: unknown, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < min || value > max) throw new ToolInputError();
  return value;
}

export function requireEnum<T extends string>(value: unknown, allowed: readonly T[]): T {
  if (typeof value !== 'string' || !(allowed as readonly string[]).includes(value)) throw new ToolInputError();
  return value as T;
}

const DECIMAL = /^(?:0|[1-9][0-9]*)$/u;

/** Convierte un valor de query decimal ASCII (sin signo ni ceros a la izquierda) en entero. */
export function parseDecimal(value: string): number {
  if (!DECIMAL.test(value) || value.length > 3) throw new ToolInputError();
  return Number(value);
}
