// Registro WebMCP de herramientas de sólo lectura (contratos F4A §5).
// API imperativa del Draft CG Report WebMCP (2026-10-09): document.modelContext,
// con fallback a navigator.modelContext sólo si existe de forma nativa. Sin API
// no hace nada: ni polyfill, ni peticiones, ni errores visibles.
import { evaluateQualityOfLife } from '../lib/agent-tools/calidad-vida.ts';
import { recommendMobilityAids } from '../lib/agent-tools/movilidad.ts';
import { calculateDogAge } from '../lib/agent-tools/edad.ts';
import { ToolInputError, isPlainObject } from '../lib/agent-tools/contract.ts';

type Input = Record<string, unknown>;
interface ExecuteOptions { signal?: AbortSignal }
interface ModelContextLike {
  registerTool(tool: Record<string, unknown>, options: { signal: AbortSignal }): unknown;
}

const INVALID_REQUEST = Object.freeze({ schemaVersion: 'agent-api/1', error: { code: 'INVALID_REQUEST', message: 'Invalid request.' } });
const ID = /^(home|(?:pillar|article|page)--[a-z0-9]+(?:-[a-z0-9]+)*|tool--(?:calidad-vida|movilidad))$/u;
const CORPUS = /^[a-f0-9]{64}$/u;
const KINDS = ['home', 'pillar', 'article', 'tool', 'editorial'];
const API_STATUSES = new Set([200, 400, 404, 409, 503]);

// inputSchema exactos: anexo evidencia/f4a/contratos/webmcp-input-schemas.json
// (cadenas ASCII por la restricción B4 de Chrome 155; ver D32).
export const INPUT_SCHEMAS = {
  "search_guides": {
    "type": "object",
    "properties": {
      "q": {
        "type": "string",
        "description": "Palabras completas a buscar. Tras normalizar (NFC y trim): 1..200 codepoints, maximo 800 bytes UTF-8 y 1..12 palabras de hasta 64 codepoints."
      },
      "kind": {
        "type": "string",
        "enum": [
          "home",
          "pillar",
          "article",
          "tool",
          "editorial"
        ],
        "description": "Filtra por tipo de documento."
      },
      "limit": {
        "type": "integer",
        "minimum": 1,
        "maximum": 20,
        "description": "Resultados por pagina (por defecto 20)."
      },
      "offset": {
        "type": "integer",
        "minimum": 0,
        "maximum": 98,
        "description": "Desplazamiento (por defecto 0)."
      },
      "corpus": {
        "type": "string",
        "pattern": "^[a-f0-9]{64}$",
        "description": "corpusSha256 devuelto por una llamada anterior."
      }
    },
    "required": [
      "q"
    ],
    "additionalProperties": false
  },
  "read_guide": {
    "type": "object",
    "properties": {
      "documentId": {
        "type": "string",
        "pattern": "^(home|(?:pillar|article|page)--[a-z0-9]+(?:-[a-z0-9]+)*|tool--(?:calidad-vida|movilidad))$",
        "maxLength": 160,
        "description": "documentId devuelto por search_guides o el catalogo."
      },
      "corpus": {
        "type": "string",
        "pattern": "^[a-f0-9]{64}$",
        "description": "corpusSha256 devuelto por una llamada anterior."
      }
    },
    "required": [
      "documentId"
    ],
    "additionalProperties": false
  },
  "evaluate_quality_of_life": {
    "type": "object",
    "properties": {
      "hurt": {
        "type": "integer",
        "minimum": 0,
        "maximum": 10,
        "description": "Dolor: 0 = mucho dolor, 10 = sin dolor."
      },
      "hunger": {
        "type": "integer",
        "minimum": 0,
        "maximum": 10,
        "description": "Apetito: 0 = no come nada, 10 = come con ganas."
      },
      "hydration": {
        "type": "integer",
        "minimum": 0,
        "maximum": 10,
        "description": "Hidratacion: 0 = deshidratado, 10 = bien hidratado."
      },
      "hygiene": {
        "type": "integer",
        "minimum": 0,
        "maximum": 10,
        "description": "Higiene: 0 = sucio/llagas, 10 = limpio."
      },
      "happiness": {
        "type": "integer",
        "minimum": 0,
        "maximum": 10,
        "description": "Felicidad: 0 = deprimido, 10 = feliz."
      },
      "mobility": {
        "type": "integer",
        "minimum": 0,
        "maximum": 10,
        "description": "Movilidad: 0 = inmovil, 10 = camina solo."
      },
      "moreGoodDays": {
        "type": "integer",
        "minimum": 0,
        "maximum": 10,
        "description": "Balance de dias buenos: 0 = lucha constante, 10 = plenitud."
      }
    },
    "required": [
      "hurt",
      "hunger",
      "hydration",
      "hygiene",
      "happiness",
      "mobility",
      "moreGoodDays"
    ],
    "additionalProperties": false
  },
  "recommend_mobility_aids": {
    "type": "object",
    "properties": {
      "level": {
        "type": "string",
        "enum": [
          "light",
          "moderate",
          "severe"
        ],
        "description": "light: camina pero resbala o tiene miedo al suelo; moderate: se fatiga rapido, debilidad trasera o le cuestan las escaleras; severe: ya no puede levantarse solo o perdio el uso de las patas traseras."
      },
      "handling": {
        "type": "string",
        "enum": [
          "calm",
          "stressed"
        ],
        "description": "calm: se deja manipular con calma; stressed: se estresa o reacciona mal cuando le tocan."
      }
    },
    "required": [
      "level",
      "handling"
    ],
    "additionalProperties": false
  },
  "calculate_dog_age": {
    "type": "object",
    "properties": {
      "size": {
        "type": "string",
        "enum": [
          "small",
          "medium",
          "large",
          "giant"
        ],
        "description": "Tamano adulto por peso: small = menos de 11 kg; medium = 11-25 kg; large = 26-44 kg; giant = 45 kg o mas."
      },
      "years": {
        "type": "integer",
        "minimum": 0,
        "maximum": 25,
        "description": "Anos cumplidos del perro (entero 0..25)."
      },
      "months": {
        "type": "integer",
        "minimum": 0,
        "maximum": 11,
        "description": "Meses adicionales (0..11, opcional). Solo cuentan por debajo de 2 anos; con 0 anos y 0 meses se usa 1 mes, igual que la calculadora."
      },
      "name": {
        "type": "string",
        "maxLength": 20,
        "description": "Nombre del perro (opcional, hasta 20 caracteres) para personalizar el mensaje."
      }
    },
    "required": [
      "size",
      "years"
    ],
    "additionalProperties": false
  }
} as const;

function invalid(): never { throw new ToolInputError(); }

function normalizeInput(raw: unknown): Input {
  // Algunos builds del origin trial entregan la entrada como string JSON.
  let value = raw;
  if (typeof value === 'string') { try { value = JSON.parse(value); } catch { invalid(); } }
  if (!isPlainObject(value)) invalid();
  return value;
}

function onlyKeys(input: Input, allowed: string[], required: string[]): void {
  if (Object.keys(input).some((key) => !allowed.includes(key)) || required.some((key) => !Object.hasOwn(input, key))) invalid();
}

const integerIn = (value: unknown, min: number, max: number) => typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max;

function searchPath(input: Input): string {
  onlyKeys(input, ['q', 'kind', 'limit', 'offset', 'corpus'], ['q']);
  if (typeof input.q !== 'string') invalid();
  if (input.kind !== undefined && (typeof input.kind !== 'string' || !KINDS.includes(input.kind))) invalid();
  if (input.limit !== undefined && !integerIn(input.limit, 1, 20)) invalid();
  if (input.offset !== undefined && !integerIn(input.offset, 0, 98)) invalid();
  if (input.corpus !== undefined && (typeof input.corpus !== 'string' || !CORPUS.test(input.corpus))) invalid();
  const params = new URLSearchParams();
  for (const key of ['q', 'kind', 'limit', 'offset', 'corpus']) if (input[key] !== undefined) params.append(key, String(input[key]));
  return `/api/agent/v1/search?${params.toString()}`;
}

function readPath(input: Input): string {
  onlyKeys(input, ['documentId', 'corpus'], ['documentId']);
  if (typeof input.documentId !== 'string' || input.documentId.length > 160 || !ID.test(input.documentId)) invalid();
  if (input.corpus !== undefined && (typeof input.corpus !== 'string' || !CORPUS.test(input.corpus))) invalid();
  const query = input.corpus === undefined ? '' : `?${new URLSearchParams({ corpus: input.corpus as string }).toString()}`;
  return `/api/agent/v1/documents/${input.documentId}${query}`;
}

function abortReason(signal: AbortSignal): unknown {
  return signal.reason ?? new DOMException('The operation was aborted.', 'AbortError');
}

async function callApi(path: string, signal: AbortSignal | undefined): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(path, { method: 'GET', signal, credentials: 'omit', cache: 'no-store', redirect: 'error', headers: { Accept: 'application/json' } });
  } catch (error) {
    if (signal?.aborted) throw abortReason(signal);
    throw new Error('CONTENT_UNAVAILABLE');
  }
  const essence = (response.headers.get('Content-Type') ?? '').split(';')[0]!.trim().toLowerCase();
  if (!API_STATUSES.has(response.status) || essence !== 'application/json') throw new Error('CONTENT_UNAVAILABLE');
  try { return await response.json(); }
  catch {
    if (signal?.aborted) throw abortReason(signal);
    throw new Error('CONTENT_UNAVAILABLE');
  }
}

function tool(run: (input: Input, signal: AbortSignal | undefined) => unknown | Promise<unknown>) {
  return async (raw: unknown, options?: ExecuteOptions): Promise<unknown> => {
    const signal = options?.signal;
    if (signal?.aborted) throw abortReason(signal);
    let result: unknown;
    try { result = await run(normalizeInput(raw), signal); }
    catch (error) {
      if (error instanceof ToolInputError) return INVALID_REQUEST;
      throw error;
    }
    if (signal?.aborted) throw abortReason(signal);
    return result;
  };
}

export const TOOLS = [
  {
    name: 'search_guides',
    title: 'Buscar guías',
    description: 'Busca guías publicadas de Cuida tu Perro Viejo por palabras completas y devuelve documentos con su puntuación léxica. No genera consejo veterinario.',
    execute: tool((input, signal) => callApi(searchPath(input), signal)),
  },
  {
    name: 'read_guide',
    title: 'Leer guía completa',
    description: 'Lee el contenido íntegro en Markdown de una guía por su documentId, con metadata, URL canónica y enlaces originales.',
    execute: tool((input, signal) => callApi(readPath(input), signal)),
  },
  {
    name: 'evaluate_quality_of_life',
    title: 'Calculadora HHHHHMM',
    description: 'Calcula la escala HHHHHMM de calidad de vida (siete criterios de 0 a 10) igual que la calculadora del sitio. Es orientativa, no un diagnóstico ni una decisión.',
    execute: tool((input) => evaluateQualityOfLife(input)),
  },
  {
    name: 'recommend_mobility_aids',
    title: 'Selector de movilidad',
    description: 'Recomienda ayudas de movilidad según el nivel de movilidad y la tolerancia a la manipulación, igual que el selector del sitio. Orientativo; consulta al veterinario.',
    execute: tool((input) => recommendMobilityAids(input)),
  },
  {
    name: 'calculate_dog_age',
    title: 'Calculadora de edad',
    description: 'Calcula la edad equivalente en años humanos de un perro según su tamaño y edad, igual que la calculadora del sitio: etapa de vida (AAHA 2019), edad de inicio senior, esperanza de vida media por tamaño (Montoya 2023), comparación epigenética (Wang 2020), un mensaje para su etapa y la guía recomendada. Úsala cuando alguien pregunte cuántos años humanos tiene su perro, si ya es senior o en qué etapa está. Orientativa; no sustituye una valoración veterinaria.',
    execute: tool((input) => calculateDogAge(input)),
  },
] as const;

export function findModelContext(scope: { document?: unknown; navigator?: unknown }): ModelContextLike | null {
  for (const owner of [scope.document, scope.navigator]) {
    const candidate = (owner as { modelContext?: unknown } | undefined)?.modelContext;
    if (typeof candidate === 'object' && candidate !== null && typeof (candidate as ModelContextLike).registerTool === 'function') return candidate as ModelContextLike;
  }
  return null;
}

export async function registerAgentTools(context: ModelContextLike): Promise<boolean> {
  const controller = new AbortController();
  try {
    for (const entry of TOOLS) {
      await Promise.resolve(context.registerTool({
        name: entry.name,
        title: entry.title,
        description: entry.description,
        inputSchema: INPUT_SCHEMAS[entry.name as keyof typeof INPUT_SCHEMAS],
        execute: entry.execute,
        annotations: { readOnlyHint: true },
      }, { signal: controller.signal }));
    }
    return true;
  } catch {
    // Nunca un conjunto parcial: si una falla, se desregistran todas.
    controller.abort();
    return false;
  }
}

// Registro al cargar la página. Sin API nativa no hace nada.
const context = typeof document === 'undefined' ? null : findModelContext({ document, navigator });
if (context) void registerAgentTools(context);
