/**
 * Cálculo orientativo de la edad de un perro en años humanos según su tamaño.
 * Es la misma fórmula que usaba la calculadora de la portada; vive aquí para
 * que la web y, más adelante, el MCP compartan exactamente el mismo resultado.
 */

export type DogSize = 'small' | 'medium' | 'large' | 'giant';
export type LifeStage = 'puppy' | 'adult' | 'mature' | 'senior' | 'geriatric';

interface SizeProfile {
  label: string;
  weight: string;
  firstYear: number;
  secondYear: number;
  yearlyRate: number;
  /** Edad aproximada a la que empieza la etapa senior. */
  seniorFrom: number;
  /** Esperanza de vida orientativa, en años. */
  lifeExpectancy: number;
}

export const SIZE_PROFILES: Record<DogSize, SizeProfile> = {
  small: { label: 'Pequeño', weight: 'Menos de 10 kg', firstYear: 15, secondYear: 24, yearlyRate: 4, seniorFrom: 8, lifeExpectancy: 14 },
  medium: { label: 'Mediano', weight: '10–25 kg', firstYear: 15, secondYear: 24, yearlyRate: 5, seniorFrom: 7, lifeExpectancy: 13 },
  large: { label: 'Grande', weight: '25–40 kg', firstYear: 15, secondYear: 24, yearlyRate: 6, seniorFrom: 6, lifeExpectancy: 11 },
  giant: { label: 'Gigante', weight: 'Más de 40 kg', firstYear: 12, secondYear: 22, yearlyRate: 8, seniorFrom: 5, lifeExpectancy: 9 },
};

export const STAGE_LABELS: Record<LifeStage, string> = {
  puppy: 'Cachorro',
  adult: 'Adulto',
  mature: 'Maduro',
  senior: 'Senior',
  geriatric: 'Senior avanzado',
};

export interface DogAgeResult {
  dogYears: number;
  humanYears: number;
  stage: LifeStage;
  /** Fracción de la esperanza de vida orientativa ya vivida (0–1, puede superar 1). */
  lifeFraction: number;
  /** Años hasta la etapa senior (negativo si ya lo es). */
  yearsToSenior: number;
  profile: SizeProfile;
}

export function dogAge(size: DogSize, years: number, months = 0): DogAgeResult {
  const profile = SIZE_PROFILES[size];
  const age = Math.max(0, years + months / 12);

  let human: number;
  if (age <= 1) human = profile.firstYear * age;
  else if (age <= 2) human = profile.firstYear + (profile.secondYear - profile.firstYear) * (age - 1);
  else human = profile.secondYear + (age - 2) * profile.yearlyRate;

  let stage: LifeStage;
  if (age < 1) stage = 'puppy';
  else if (age < profile.seniorFrom - 2) stage = 'adult';
  else if (age < profile.seniorFrom) stage = 'mature';
  else if (age < profile.lifeExpectancy * 0.9) stage = 'senior';
  else stage = 'geriatric';

  return {
    dogYears: age,
    humanYears: Math.round(human),
    stage,
    lifeFraction: age / profile.lifeExpectancy,
    yearsToSenior: profile.seniorFrom - age,
    profile,
  };
}
