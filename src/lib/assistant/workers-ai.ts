/**
 * Motor principal del asistente sobre Cloudflare Workers AI.
 *
 * Dos pasos, en vez de dejar que el modelo llame herramientas:
 *   1. Selección: una llamada corta elige qué guías del catálogo leer.
 *   2. Respuesta: el modelo recibe el texto completo de esas guías y responde
 *      en streaming.
 * Así el resultado no depende de lo bien que cada modelo abierto implemente las
 * llamadas a herramientas, y cambiar de modelo es cambiar una variable.
 */
import type { GuideEntry, Knowledge } from './knowledge';
import { buildRouterPrompt, buildSystemPrompt } from './prompt';
import type { AssistantUsage, ChatTurn, EngineAnswer, EngineEvents } from './types';

export const DEFAULT_WORKERS_AI_MODEL = '@cf/deepseek-ai/deepseek-v4.1-flash-1017';
export const DEFAULT_WORKERS_AI_EFFORT = 'low';

const EFFORT_LEVELS = ['none', 'low', 'high', 'max'] as const;
export type WorkersAiEffort = (typeof EFFORT_LEVELS)[number];

export const parseWorkersAiEffort = (value: string | undefined): WorkersAiEffort => (
  EFFORT_LEVELS.includes(value as WorkersAiEffort) ? (value as WorkersAiEffort) : DEFAULT_WORKERS_AI_EFFORT
);

const MAX_SELECTED_GUIDES = 2;
/** Incluye el razonamiento del modelo, que también consume tokens de salida. */
const MAX_ANSWER_TOKENS = 6_000;
const MAX_ROUTER_TOKENS = 1_500;

/** La parte del binding `AI` que se usa aquí; permite sustituirlo en las pruebas. */
export type AiRunner = {
  run: (model: string, inputs: Record<string, unknown>, options?: Record<string, unknown>) => Promise<unknown>;
};

export type WorkersAiRequest = {
  ai: AiRunner;
  model: string;
  effort: WorkersAiEffort;
  knowledge: Knowledge;
  readGuide: (guide: GuideEntry) => Promise<string>;
  question: string;
  history: ChatTurn[];
  /** Agrupa las llamadas de una conversación para aprovechar la caché de prefijo. */
  sessionId?: string;
  events?: EngineEvents;
  signal?: AbortSignal;
};

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

type Completion = {
  response?: unknown;
  choices?: Array<{
    message?: { content?: unknown };
    delta?: { content?: unknown };
    finish_reason?: unknown;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    prompt_tokens_details?: { cached_tokens?: number } | null;
  } | null;
};

const addUsage = (total: AssistantUsage, usage: Completion['usage']) => {
  if (!usage) return;
  total.inputTokens += usage.prompt_tokens ?? 0;
  total.outputTokens += usage.completion_tokens ?? 0;
  total.cacheReadTokens += usage.prompt_tokens_details?.cached_tokens ?? 0;
};

/**
 * No todos los modelos del catálogo aceptan `reasoning_effort`. Si la llamada
 * falla con él, se repite una vez sin el parámetro antes de darla por perdida.
 */
const run = async (
  request: WorkersAiRequest,
  inputs: Record<string, unknown>,
  effort: WorkersAiEffort,
): Promise<unknown> => {
  const options = request.sessionId ? { extraHeaders: { 'x-session-affinity': request.sessionId } } : undefined;
  try {
    return await request.ai.run(request.model, { ...inputs, reasoning_effort: effort }, options);
  } catch (error) {
    if (request.signal?.aborted) throw error;
    return request.ai.run(request.model, inputs, options);
  }
};

/** Texto de una respuesta sin streaming, sea cual sea el formato del modelo. */
const completionText = (result: unknown): string => {
  if (typeof result === 'string') return result;
  const completion = (result ?? {}) as Completion;
  const content = completion.choices?.[0]?.message?.content ?? completion.response;
  return typeof content === 'string' ? content : '';
};

/** Algunos modelos escriben su razonamiento en el propio texto, entre <think>. */
const THINK_OPEN = '<think>';
const withoutThinking = (text: string, final: boolean): string => {
  let visible = text.replace(/<think>[\s\S]*?<\/think>\s*/gu, '');
  const open = visible.indexOf(THINK_OPEN);
  if (open !== -1) visible = visible.slice(0, open);
  if (final) return visible;
  // Mientras llega el texto, no mostrar un "<thi" que puede acabar siendo la etiqueta.
  for (let length = Math.min(THINK_OPEN.length - 1, visible.length); length > 0; length -= 1) {
    if (visible.endsWith(THINK_OPEN.slice(0, length))) return visible.slice(0, -length);
  }
  return visible;
};

export const selectGuides = async (request: WorkersAiRequest, usage: AssistantUsage): Promise<GuideEntry[]> => {
  const { knowledge } = request;
  const previous = request.history
    .filter((turn) => turn.role === 'user')
    .slice(-2)
    .map((turn) => `- ${turn.content}`)
    .join('\n');
  const messages: ChatMessage[] = [
    { role: 'system', content: buildRouterPrompt(knowledge.guides) },
    {
      role: 'user',
      content: `${previous ? `<mensajes_anteriores>\n${previous}\n</mensajes_anteriores>\n\n` : ''}<consulta>\n${request.question}\n</consulta>`,
    },
  ];

  const result = await run(request, { messages, max_tokens: MAX_ROUTER_TOKENS, temperature: 0 }, 'none');
  addUsage(usage, ((result ?? {}) as Completion).usage);
  const text = withoutThinking(completionText(result), true);

  // Se buscan los id del catálogo dentro del texto, en orden de aparición: no
  // importa si el modelo los devuelve en líneas, en JSON o con comentarios.
  return knowledge.guides
    .map((guide) => ({ guide, position: text.search(new RegExp(`(^|[^a-z0-9-])${guide.id}($|[^a-z0-9-])`, 'u')) }))
    .filter(({ position }) => position !== -1)
    .sort((left, right) => left.position - right.position)
    .slice(0, MAX_SELECTED_GUIDES)
    .map(({ guide }) => guide);
};

const guidesBlock = (guides: Array<{ guide: GuideEntry; text: string }>): string => (
  guides.length === 0
    ? '<guias_del_sitio>\nNinguna guía del sitio cubre directamente esta consulta.\n</guias_del_sitio>'
    : `<guias_del_sitio>\n${guides.map(({ guide, text }) => `<guia ruta="${guide.href}" titulo="${guide.title.replace(/"/gu, "'")}">\n${text}\n</guia>`).join('\n\n')}\n</guias_del_sitio>`
);

/** Lee la respuesta en streaming (SSE) y devuelve el texto completo. */
const readStream = async (
  stream: ReadableStream<Uint8Array>,
  usage: AssistantUsage,
  request: WorkersAiRequest,
): Promise<{ text: string; truncated: boolean }> => {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let raw = '';
  let emitted = 0;
  let truncated = false;

  const consume = (line: string) => {
    if (!line.startsWith('data:')) return;
    const data = line.slice(5).trim();
    if (!data || data === '[DONE]') return;
    let chunk: Completion;
    try {
      chunk = JSON.parse(data) as Completion;
    } catch {
      return;
    }
    if (chunk.usage) addUsage(usage, chunk.usage);
    const choice = chunk.choices?.[0];
    if (choice?.finish_reason === 'length') truncated = true;
    const delta = choice?.delta?.content ?? chunk.response;
    if (typeof delta !== 'string' || !delta) return;
    raw += delta;
    const visible = withoutThinking(raw, false);
    if (visible.length > emitted) {
      request.events?.onText?.(visible.slice(emitted));
      emitted = visible.length;
    }
  };

  try {
    for (;;) {
      if (request.signal?.aborted) throw new Error('Consulta cancelada.');
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      lines.forEach((line) => consume(line.trim()));
    }
    consume(buffer.trim());
  } finally {
    reader.releaseLock();
  }

  const text = withoutThinking(raw, true);
  if (text.length > emitted) request.events?.onText?.(text.slice(emitted));
  return { text, truncated };
};

export const answerWithWorkersAi = async (request: WorkersAiRequest): Promise<EngineAnswer> => {
  const { knowledge, events } = request;
  const usage: AssistantUsage = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 };

  // Si la selección falla, se responde sin guías: peor que con ellas, pero
  // mejor que no responder.
  let selected: GuideEntry[] = [];
  try {
    selected = await selectGuides(request, usage);
  } catch (error) {
    if (request.signal?.aborted) throw error;
    console.error(JSON.stringify({ event: 'assistant_guide_selection_failed', error: error instanceof Error ? error.message : String(error) }));
  }

  const guides: Array<{ guide: GuideEntry; text: string }> = [];
  for (const guide of selected) {
    events?.onReading?.(guide);
    try {
      guides.push({ guide, text: await request.readGuide(guide) });
    } catch {
      // Una guía que no carga no impide responder con el resto.
    }
  }

  const messages: ChatMessage[] = [
    { role: 'system', content: buildSystemPrompt(knowledge.guides, 'provided') },
    ...request.history.map((turn): ChatMessage => ({ role: turn.role, content: turn.content })),
    { role: 'user', content: `${guidesBlock(guides)}\n\n<consulta>\n${request.question}\n</consulta>` },
  ];

  const result = await run(request, { messages, stream: true, max_tokens: MAX_ANSWER_TOKENS, temperature: 0.3 }, request.effort);

  let answer: string;
  let truncated = false;
  if (result instanceof ReadableStream) {
    ({ text: answer, truncated } = await readStream(result as ReadableStream<Uint8Array>, usage, request));
  } else {
    addUsage(usage, ((result ?? {}) as Completion).usage);
    answer = withoutThinking(completionText(result), true);
    if (answer) events?.onText?.(answer);
  }

  answer = answer.trim();
  if (!answer) throw new Error('Workers AI no devolvió texto.');
  return { answer, guidesRead: guides.map(({ guide }) => guide.id), model: request.model, usage, truncated };
};
