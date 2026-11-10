import { isInteractionId } from './metrics';
import type { AssistantSurface, ChatTurn } from './types';

export const MAX_QUESTION_LENGTH = 500;
export const MAX_REQUEST_BYTES = 48_000;
const MAX_HISTORY_TURNS = 8;
const MAX_ASSISTANT_TURN_CHARS = 6_000;

export type AssistantRequest = {
  question: string;
  history: ChatTurn[];
  stream: boolean;
  surface: AssistantSurface;
  conversationId: string | null;
};

export type RequestError = { error: string; status: number };

/**
 * El historial llega del navegador, así que se trata como dato no fiable:
 * se recorta, se limita y se obliga a alternar usuario/asistente. Un historial
 * mal formado se descarta en vez de rechazar la consulta.
 */
export const parseHistory = (value: unknown): ChatTurn[] => {
  if (!Array.isArray(value)) return [];
  const turns: ChatTurn[] = [];
  for (const item of value) {
    if (typeof item !== 'object' || item === null) return [];
    const { role, content } = item as { role?: unknown; content?: unknown };
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return [];
    const text = content.trim().slice(0, role === 'user' ? MAX_QUESTION_LENGTH : MAX_ASSISTANT_TURN_CHARS);
    if (!text) return [];
    turns.push({ role, content: text });
  }
  let recent = turns.slice(-MAX_HISTORY_TURNS);
  while (recent.length > 0 && recent[0]!.role !== 'user') recent = recent.slice(1);
  for (let index = 0; index < recent.length; index += 1) {
    if (recent[index]!.role !== (index % 2 === 0 ? 'user' : 'assistant')) return [];
  }
  // Debe terminar en una respuesta del asistente: la consulta nueva va aparte.
  return recent.length % 2 === 0 ? recent : [];
};

export const parseAssistantRequest = (body: unknown): AssistantRequest | RequestError => {
  if (typeof body !== 'object' || body === null) {
    return { error: 'La consulta debe enviarse en formato JSON.', status: 400 };
  }
  const { question, history, stream, surface, conversationId } = body as Record<string, unknown>;

  if (typeof question !== 'string' || question.trim().length < 3) {
    return { error: 'Cuéntanos un poco más para poder orientarte.', status: 400 };
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return { error: `La consulta no puede superar los ${MAX_QUESTION_LENGTH} caracteres.`, status: 400 };
  }

  return {
    question: question.trim(),
    history: parseHistory(history),
    stream: stream === true,
    surface: surface === 'widget' || surface === 'page' ? surface : 'api',
    conversationId: isInteractionId(conversationId) ? conversationId : null,
  };
};
