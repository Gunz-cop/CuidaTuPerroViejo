// Calculadora de edad expuesta a agentes (calculate_dog_age). Adaptador fino:
// cifras, fórmulas, mensajes, guías y fuentes salen de src/lib/dog-age.ts, la
// misma lógica que usan la página, la portada, WebMCP y el MCP remoto.
// Sin datos de cuenta atrás: ni años restantes ni fracción de vida vivida.
import { AGE_SOURCES, HUMAN_LIFESPAN, SIZE_PROFILES, STAGE_ADVICE, STAGE_GUIDES, STAGE_LABELS, dogAge, effectiveAge, roundToHalf, seniorAge, type DogSize, type LifeStage } from '../dog-age.ts';
import { SCHEMA_VERSION, SITE, ToolInputError, isPlainObject, requireEnum, requireInteger, type Guide } from './contract.ts';

export const AGE_SIZES = ['small', 'medium', 'large', 'giant'] as const satisfies readonly DogSize[];
export const AGE_KEYS = ['size', 'years', 'months', 'name'] as const;
export const MAX_YEARS = 25;
/** Igual que el maxlength del campo de nombre de la página. */
export const MAX_NAME = 20;
const AGENT_SOURCE_IDS = ['montoya', 'aaha', 'wang'] as const;

export const AGE_TOOL = {
  name: 'Calculadora de edad de perro en años humanos',
  // La página sigue proyectándose como documento editorial (page--…): no se promueve a tool--.
  documentId: 'page--calculadora-edad-perro',
  url: `${SITE}/herramientas/calculadora-edad-perro`,
  method_url: `${SITE}/herramientas/calculadora-edad-perro#metodo`,
} as const;

/** Aviso de la página (.dat__note) sin el enlace al método. */
export const AGE_NOTICE = 'Estimación basada en estudios veterinarios. No sustituye una valoración veterinaria.';
export const HUMAN_EQUIVALENCE_NOTE = `La equivalencia en años humanos es un ajuste propio de Cuida tu Perro Viejo, no un dato de un estudio: los dos primeros años equivalen a 15 y 24 años humanos y después cada tamaño avanza a un ritmo calibrado para que su esperanza de vida equivalga a ${HUMAN_LIFESPAN} años humanos.`;

export interface DogAgeInput { size: DogSize; years: number; months: number; name: string | null }

export interface DogAgeToolResult {
  schemaVersion: typeof SCHEMA_VERSION;
  tool: typeof AGE_TOOL;
  input: DogAgeInput;
  size: { id: DogSize; label: string; weight: string };
  human_years: number;
  stage: { id: LifeStage; label: string };
  senior_from_years: number;
  /** Sólo mientras aún no es senior, redondeado a medio año; null si ya lo es. */
  years_to_senior: number | null;
  life_expectancy_years: number;
  epigenetic_years: number | null;
  message: string;
  recommended_action: Guide;
  notices: string[];
  human_equivalence_note: string;
  sources: Array<{ id: string; citation: string; doi: string; url: string }>;
}

/** Valida la entrada estructurada (WebMCP/MCP): size y years obligatorios; months y name opcionales; sin keys extra. */
export function parseDogAgeInput(value: unknown): DogAgeInput {
  if (!isPlainObject(value)) throw new ToolInputError();
  if (Object.keys(value).some((key) => !(AGE_KEYS as readonly string[]).includes(key))) throw new ToolInputError();
  if (!Object.hasOwn(value, 'size') || !Object.hasOwn(value, 'years')) throw new ToolInputError();
  const size = requireEnum(value.size, AGE_SIZES);
  const years = requireInteger(value.years, 0, MAX_YEARS);
  const months = value.months === undefined ? 0 : requireInteger(value.months, 0, 11);
  let name: string | null = null;
  if (value.name !== undefined) {
    if (typeof value.name !== 'string' || !value.name.isWellFormed()) throw new ToolInputError();
    if ([...value.name].length > MAX_NAME) throw new ToolInputError();
    const trimmed = value.name.trim();
    name = trimmed === '' ? null : trimmed;
  }
  return { size, ...effectiveAge(years, months), name };
}

export function calculateDogAge(value: unknown): DogAgeToolResult {
  const input = parseDogAgeInput(value);
  const result = dogAge(input.size, input.years, input.months);
  const profile = SIZE_PROFILES[input.size];
  const [guidePath, guideLabel] = STAGE_GUIDES[result.stage];
  const subject = input.name ?? 'Tu perro';
  return {
    schemaVersion: SCHEMA_VERSION,
    tool: { ...AGE_TOOL },
    input,
    size: { id: input.size, label: profile.label, weight: profile.weight },
    human_years: result.humanYears,
    stage: { id: result.stage, label: STAGE_LABELS[result.stage] },
    senior_from_years: seniorAge(input.size),
    years_to_senior: result.yearsToSenior > 0 ? roundToHalf(result.yearsToSenior) : null,
    life_expectancy_years: profile.lifeExpectancy,
    epigenetic_years: result.epigeneticYears,
    message: `${subject} tiene el equivalente a ${result.humanYears} años humanos. ${STAGE_ADVICE[result.stage]}`,
    recommended_action: { label: guideLabel, url: SITE + guidePath },
    notices: [AGE_NOTICE],
    human_equivalence_note: HUMAN_EQUIVALENCE_NOTE,
    sources: AGENT_SOURCE_IDS.map((id) => {
      const source = AGE_SOURCES.find((entry) => entry.id === id)!;
      return { id, citation: source.text, doi: source.doi, url: `https://doi.org/${source.doi}` };
    }),
  };
}
