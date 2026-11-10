import Anthropic from '@anthropic-ai/sdk';
import type { GuideEntry, Knowledge } from './knowledge';
import { READ_GUIDE_TOOL_DESCRIPTION, READ_GUIDE_TOOL_NAME, buildSystemPrompt } from './prompt';
import type { ChatTurn } from './types';

export const DEFAULT_ASSISTANT_MODEL = 'claude-sonnet-5-5';
export const DEFAULT_ASSISTANT_EFFORT = 'low';

const EFFORT_LEVELS = ['low', 'medium', 'high'] as const;
export type AssistantEffort = (typeof EFFORT_LEVELS)[number];

export const parseEffort = (value: string | undefined): AssistantEffort => (
  EFFORT_LEVELS.includes(value as AssistantEffort) ? (value as AssistantEffort) : DEFAULT_ASSISTANT_EFFORT
);

/** El razonamiento del modelo también cuenta contra este límite. */
const MAX_OUTPUT_TOKENS = 8_000;
const MAX_GUIDE_READS = 3;
const MAX_STEPS = 4;
const REQUEST_TIMEOUT_MS = 90_000;
const FALLBACK_BETA = 'server-side-fallback-2026-07-01';

export class AssistantRefusalError extends Error {
  constructor() {
    super('El modelo declinó responder la consulta.');
    this.name = 'AssistantRefusalError';
  }
}

export type AssistantUsage = {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
};

export type ClaudeAnswer = {
  answer: string;
  guidesRead: string[];
  model: string;
  usage: AssistantUsage;
  truncated: boolean;
};

export type ClaudeEvents = {
  /** El modelo va a consultar una guía del sitio. */
  onReading?: (guide: GuideEntry) => void;
  onText?: (delta: string) => void;
  /** El texto emitido hasta ahora era un comentario previo a una lectura: descartarlo. */
  onReset?: () => void;
};

export type ClaudeRequest = {
  apiKey: string;
  baseURL?: string;
  model: string;
  effort: AssistantEffort;
  knowledge: Knowledge;
  readGuide: (guide: GuideEntry) => Promise<string>;
  question: string;
  history: ChatTurn[];
  events?: ClaudeEvents;
  signal?: AbortSignal;
};

const guideIdFrom = (input: unknown): string | null => {
  if (typeof input !== 'object' || input === null) return null;
  const id = (input as { id?: unknown }).id;
  return typeof id === 'string' ? id : null;
};

export const answerWithClaude = async (request: ClaudeRequest): Promise<ClaudeAnswer> => {
  const { knowledge, events } = request;
  const client = new Anthropic({
    apiKey: request.apiKey,
    baseURL: request.baseURL || undefined,
    maxRetries: 1,
    timeout: REQUEST_TIMEOUT_MS,
  });

  // `system` y `tools` no cambian entre consultas mientras no cambie el
  // contenido publicado, así que todo el prefijo es cacheable.
  const system: Anthropic.Beta.BetaTextBlockParam[] = [
    { type: 'text', text: buildSystemPrompt(knowledge.guides), cache_control: { type: 'ephemeral' } },
  ];
  const tools: Anthropic.Beta.BetaTool[] = [
    {
      name: READ_GUIDE_TOOL_NAME,
      description: READ_GUIDE_TOOL_DESCRIPTION,
      strict: true,
      input_schema: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            enum: knowledge.guides.map((guide) => guide.id),
            description: 'Identificador del documento, tal como aparece en el catálogo.',
          },
        },
        required: ['id'],
        additionalProperties: false,
      },
    },
  ];
  const messages: Anthropic.Beta.BetaMessageParam[] = [
    ...request.history.map((turn): Anthropic.Beta.BetaMessageParam => ({ role: turn.role, content: turn.content })),
    { role: 'user', content: request.question },
  ];

  // El fallback de servidor reintenta en otro modelo cuando un clasificador de
  // seguridad declina por error. Solo se pide en el modelo que lo admite.
  const fallback = request.model === DEFAULT_ASSISTANT_MODEL
    ? { betas: [FALLBACK_BETA], fallbacks: 'default' as const }
    : {};

  const usage: AssistantUsage = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 };
  const guidesRead: string[] = [];
  let servedModel = request.model;

  for (let step = 0; step < MAX_STEPS; step += 1) {
    const stream = client.beta.messages.stream({
      model: request.model,
      max_tokens: MAX_OUTPUT_TOKENS,
      system,
      tools,
      messages,
      thinking: { type: 'adaptive' },
      output_config: { effort: request.effort },
      ...fallback,
    }, { signal: request.signal });

    let streamedText = false;
    stream.on('text', (delta) => {
      streamedText = true;
      events?.onText?.(delta);
    });

    const message = await stream.finalMessage();
    servedModel = message.model;
    usage.inputTokens += message.usage.input_tokens;
    usage.outputTokens += message.usage.output_tokens;
    usage.cacheReadTokens += message.usage.cache_read_input_tokens ?? 0;
    usage.cacheWriteTokens += message.usage.cache_creation_input_tokens ?? 0;

    if (message.stop_reason === 'refusal') throw new AssistantRefusalError();

    const toolUses = message.content.filter(
      (block): block is Anthropic.Beta.BetaToolUseBlock => block.type === 'tool_use',
    );

    if (message.stop_reason !== 'tool_use' || toolUses.length === 0) {
      const answer = message.content
        .filter((block): block is Anthropic.Beta.BetaTextBlock => block.type === 'text')
        .map((block) => block.text)
        .join('')
        .trim();
      if (!answer) throw new Error(`El modelo no devolvió texto (stop_reason: ${message.stop_reason}).`);
      return { answer, guidesRead, model: servedModel, usage, truncated: message.stop_reason === 'max_tokens' };
    }

    if (streamedText) events?.onReset?.();

    // Se devuelve el turno completo, bloques de razonamiento incluidos y sin
    // tocar: el modelo los necesita para continuar tras leer la guía.
    messages.push({ role: 'assistant', content: message.content });

    const results = await Promise.all(toolUses.map(async (toolUse): Promise<Anthropic.Beta.BetaToolResultBlockParam> => {
      const guide = toolUse.name === READ_GUIDE_TOOL_NAME
        ? knowledge.byId.get(guideIdFrom(toolUse.input) ?? '')
        : undefined;
      if (!guide) {
        return {
          type: 'tool_result',
          tool_use_id: toolUse.id,
          is_error: true,
          content: `Documento no encontrado. Usa ${READ_GUIDE_TOOL_NAME} con un id del catálogo.`,
        };
      }
      if (guidesRead.length >= MAX_GUIDE_READS && !guidesRead.includes(guide.id)) {
        return {
          type: 'tool_result',
          tool_use_id: toolUse.id,
          is_error: true,
          content: 'Ya se alcanzó el máximo de lecturas para esta consulta. Responde con lo que tienes.',
        };
      }
      if (!guidesRead.includes(guide.id)) guidesRead.push(guide.id);
      events?.onReading?.(guide);
      try {
        return { type: 'tool_result', tool_use_id: toolUse.id, content: await request.readGuide(guide) };
      } catch {
        return {
          type: 'tool_result',
          tool_use_id: toolUse.id,
          is_error: true,
          content: 'No se pudo cargar este documento. Responde con tu conocimiento y, si procede, enlázalo igualmente.',
        };
      }
    }));

    messages.push({ role: 'user', content: results });
  }

  throw new Error('El modelo no llegó a una respuesta en el número de pasos permitido.');
};
