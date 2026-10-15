/**
 * Cálculo orientativo de la edad de un perro en años humanos según su tamaño.
 * Vive aquí para que la web y, más adelante, el MCP compartan el mismo resultado.
 *
 * Método (documentado también en /herramientas/calculadora-edad-perro#metodo):
 * - Esperanza de vida al nacer por tamaño: Montoya et al. 2023, Front Vet Sci,
 *   doi:10.3389/fvets.2023.1082102 (Banfield, EE. UU.).
 * - Etapas de vida: AAHA 2019 Canine Life Stage Guidelines (Creevy et al.),
 *   doi:10.5326/JAAHA-MS-6999. Senior = último 25 % de la esperanza de vida.
 * - Equivalencia humana: primeros dos años = 15 y 24 años humanos; desde ahí,
 *   cada tamaño avanza a un ritmo calibrado para que su esperanza de vida
 *   equivalga a HUMAN_LIFESPAN años humanos.
 * - Comparativa epigenética: Wang et al. 2020, Cell Systems,
 *   doi:10.1016/j.cels.2020.06.006 (16·ln(edad) + 31, calibrada en labradores).
 */

export type DogSize = 'small' | 'medium' | 'large' | 'giant';
export type LifeStage = 'puppy' | 'young' | 'mature' | 'senior' | 'longevous';

/** Vida humana larga de referencia a la que se equipara la esperanza de vida del perro. */
export const HUMAN_LIFESPAN = 80;

interface SizeProfile {
  label: string;
  weight: string;
  /** Esperanza de vida al nacer en años (Montoya et al. 2023). */
  lifeExpectancy: number;
}

export const SIZE_PROFILES: Record<DogSize, SizeProfile> = {
  // Montoya 2023: toy 13,36 y small 13,53 años → 13,5 para menos de 11 kg.
  small: { label: 'Pequeño', weight: 'Menos de 11 kg', lifeExpectancy: 13.5 },
  medium: { label: 'Mediano', weight: '11–25 kg', lifeExpectancy: 12.7 },
  large: { label: 'Grande', weight: '26–44 kg', lifeExpectancy: 11.5 },
  giant: { label: 'Gigante', weight: '45 kg o más', lifeExpectancy: 9.5 },
};

export const STAGE_LABELS: Record<LifeStage, string> = {
  puppy: 'Cachorro',
  young: 'Adulto joven',
  mature: 'Adulto maduro',
  senior: 'Senior',
  longevous: 'Senior longevo',
};

/** AAHA 2019: cachorro hasta 6–9 meses; adulto joven hasta 3–4 años. */
const PUPPY_UNTIL = 0.75;
const YOUNG_UNTIL = 3.5;
/** AAHA 2019: la etapa senior empieza en el último 25 % de la esperanza de vida. */
const SENIOR_FRACTION = 0.75;

export interface DogAgeResult {
  dogYears: number;
  humanYears: number;
  stage: LifeStage;
  /** Edad aproximada (años) a la que empieza la etapa senior para su tamaño. */
  seniorFrom: number;
  /** Años hasta la etapa senior (negativo si ya lo es). */
  yearsToSenior: number;
  /** Posición en la línea de vida (0–1). */
  lifePosition: number;
  /** Equivalencia epigenética de Wang et al. 2020 (solo desde 1 año). */
  epigeneticYears: number | null;
  profile: SizeProfile;
}

export function seniorAge(size: DogSize): number {
  return Math.round(SIZE_PROFILES[size].lifeExpectancy * SENIOR_FRACTION * 2) / 2;
}

export function dogAge(size: DogSize, years: number, months = 0): DogAgeResult {
  const profile = SIZE_PROFILES[size];
  const age = Math.max(0, years + months / 12);
  const yearlyRate = (HUMAN_LIFESPAN - 24) / (profile.lifeExpectancy - 2);

  let human: number;
  if (age <= 1) human = 15 * age;
  else if (age <= 2) human = 15 + 9 * (age - 1);
  else human = 24 + (age - 2) * yearlyRate;

  const seniorFrom = seniorAge(size);
  let stage: LifeStage;
  if (age < PUPPY_UNTIL) stage = 'puppy';
  else if (age < YOUNG_UNTIL) stage = 'young';
  else if (age < seniorFrom) stage = 'mature';
  else if (age < profile.lifeExpectancy) stage = 'senior';
  else stage = 'longevous';

  return {
    dogYears: age,
    humanYears: Math.round(human),
    stage,
    seniorFrom,
    yearsToSenior: seniorFrom - age,
    lifePosition: Math.min(age / profile.lifeExpectancy, 1),
    epigeneticYears: age >= 1 ? Math.round(16 * Math.log(age) + 31) : null,
    profile,
  };
}
