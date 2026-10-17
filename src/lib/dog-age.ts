/**
 * Cálculo orientativo de la edad de un perro en años humanos según su tamaño.
 * Vive aquí para que la web y, más adelante, el MCP compartan el mismo resultado.
 *
 * Método (documentado también en /herramientas/calculadora-edad-perro#metodo):
 * - Esperanza de vida al nacer por tamaño: Montoya et al. 2023, Front Vet Sci,
 *   doi:10.3389/fvets.2023.1082102 (Banfield, EE. UU.). Toy (13,36) y small
 *   (13,53) se agrupan en "pequeño" con 13,5 años.
 * - Etapas de vida: AAHA 2019 Canine Life Stage Guidelines (Creevy et al.),
 *   doi:10.5326/JAAHA-MS-6999. Senior = último 25 % de la esperanza de vida;
 *   la edad en años sale de aplicar esa regla a las cifras de Montoya.
 * - Equivalencia humana: AJUSTE PROPIO, no dato de un estudio. Primeros dos
 *   años = 15 y 24 años humanos (convención por la maduración rápida); desde
 *   ahí, cada tamaño avanza a un ritmo calibrado para que su esperanza de vida
 *   equivalga a HUMAN_LIFESPAN años humanos. Por encima de esa esperanza el
 *   ritmo se amortigua y se acerca a HUMAN_MAX sin superarlo.
 * - Comparativa epigenética: Wang et al. 2020, Cell Systems,
 *   doi:10.1016/j.cels.2020.06.006 (16·ln(edad) + 31, calibrada en 104
 *   labradores de 0,1 a 16 años; fuera de ese rango no se muestra).
 */

export type DogSize = 'small' | 'medium' | 'large' | 'giant';
export type LifeStage = 'puppy' | 'young' | 'mature' | 'senior' | 'longevous';

/** Vida humana larga de referencia a la que se equipara la esperanza de vida del perro (ajuste propio). */
export const HUMAN_LIFESPAN = 80;
/** Techo asintótico de la equivalencia humana para perros que superan su esperanza de vida (ajuste propio). */
export const HUMAN_MAX = 100;

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

export const STAGE_ORDER: LifeStage[] = ['puppy', 'young', 'mature', 'senior', 'longevous'];

export const STAGE_LABELS: Record<LifeStage, string> = {
  puppy: 'Cachorro',
  young: 'Adulto joven',
  mature: 'Adulto maduro',
  senior: 'Senior',
  longevous: 'Senior longevo',
};

/** Etiquetas cortas para la línea de etapas. */
export const SHORT_STAGE_LABELS: Record<LifeStage, string> = {
  puppy: 'Cachorro',
  young: 'Joven',
  mature: 'Maduro',
  senior: 'Senior',
  longevous: 'Longevo',
};

/** AAHA 2019: cachorro hasta 6–9 meses; adulto joven hasta 3–4 años. */
const PUPPY_UNTIL = 0.75;
const YOUNG_UNTIL = 3.5;
/** AAHA 2019: la etapa senior empieza en el último 25 % de la esperanza de vida. */
const SENIOR_FRACTION = 0.75;
/** Rango de edades con el que se calibró la fórmula de Wang et al. 2020. */
const EPIGENETIC_MIN = 1;
const EPIGENETIC_MAX = 16;
/** Años tras la esperanza de vida que ocupa el tramo "longevo" en la línea de etapas. */
const LONGEVOUS_SPAN = 4;

export interface DogAgeResult {
  dogYears: number;
  humanYears: number;
  stage: LifeStage;
  /** Edad aproximada (años) a la que empieza la etapa senior para su tamaño. */
  seniorFrom: number;
  /** Años hasta la etapa senior (negativo si ya lo es). */
  yearsToSenior: number;
  /**
   * Posición (0–1) en la línea de 5 etapas de igual ancho: cada etapa ocupa
   * un quinto y el marcador avanza dentro de la suya. No representa la
   * fracción de vida vivida.
   */
  stagePosition: number;
  /** Equivalencia epigenética de Wang et al. 2020 (solo entre 1 y 16 años, su rango de calibración). */
  epigeneticYears: number | null;
  profile: SizeProfile;
}

export function seniorAge(size: DogSize): number {
  return Math.round(SIZE_PROFILES[size].lifeExpectancy * SENIOR_FRACTION * 2) / 2;
}

/** Redondea a medio año, para textos como "en 1,5 años". */
export function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

function humanYears(age: number, lifeExpectancy: number): number {
  if (age <= 1) return 15 * age;
  if (age <= 2) return 15 + 9 * (age - 1);
  const rate = (HUMAN_LIFESPAN - 24) / (lifeExpectancy - 2);
  if (age <= lifeExpectancy) return 24 + (age - 2) * rate;
  // Por encima de la esperanza de vida: misma pendiente al empezar, pero se
  // aproxima a HUMAN_MAX sin superarlo; redondeado puede mostrar 100 (no hay personas de 150 años).
  const room = HUMAN_MAX - HUMAN_LIFESPAN;
  return HUMAN_LIFESPAN + room * (1 - Math.exp(-((age - lifeExpectancy) * rate) / room));
}

export function dogAge(size: DogSize, years: number, months = 0): DogAgeResult {
  const profile = SIZE_PROFILES[size];
  const age = Math.max(0, years + months / 12);
  const seniorFrom = seniorAge(size);

  const bounds: [number, number][] = [
    [0, PUPPY_UNTIL],
    [PUPPY_UNTIL, YOUNG_UNTIL],
    [YOUNG_UNTIL, seniorFrom],
    [seniorFrom, profile.lifeExpectancy],
    [profile.lifeExpectancy, profile.lifeExpectancy + LONGEVOUS_SPAN],
  ];
  const index = age >= profile.lifeExpectancy ? 4 : bounds.findIndex(([, end]) => age < end);
  const [start, end] = bounds[index];
  const within = Math.min(Math.max((age - start) / (end - start), 0), 1);
  // Dentro de su quinto, sin pegarse a los bordes.
  const stagePosition = (index + 0.1 + within * 0.8) / 5;

  return {
    dogYears: age,
    humanYears: Math.round(humanYears(age, profile.lifeExpectancy)),
    stage: STAGE_ORDER[index],
    seniorFrom,
    yearsToSenior: seniorFrom - age,
    stagePosition,
    epigeneticYears: age >= EPIGENETIC_MIN && age <= EPIGENETIC_MAX ? Math.round(16 * Math.log(age) + 31) : null,
    profile,
  };
}

/**
 * Edad efectiva tal como la usa la calculadora: con 0 años cuenta al menos
 * 1 mes (evita el estado "0 meses") y desde los 2 años se ignoran los meses.
 */
export function effectiveAge(years: number, months = 0): { years: number; months: number } {
  if (years >= 2) return { years, months: 0 };
  return { years, months: years === 0 && months === 0 ? 1 : months };
}

/** Mensaje de la calculadora para cada etapa (web, MCP y WebMCP). */
export const STAGE_ADVICE: Record<LifeStage, string> = {
  puppy: 'Etapa de crecimiento rápido: socialización, vacunas y una base de hábitos que le servirán toda la vida.',
  young: 'Plena forma. Es el mejor momento para cuidar su peso y su boca: es la mejor inversión para su vejez.',
  mature: 'Adulto maduro. Una revisión completa ahora te da valores de referencia para comparar cuando llegue a senior.',
  senior: 'Ya es senior. Es normal que duerma más y más profundo; consulta si le cuesta mucho despertar o el cambio es brusco. Revisiones más frecuentes y pequeños ajustes en casa ayudan a que disfrute esta etapa.',
  longevous: '¡Un perro longevo! Ya superó la edad media de su tamaño, y eso habla muy bien de sus cuidados. Dormir mucho es parte de esta etapa: una cama cómoda y rutinas tranquilas le ayudan a descansar.',
};

/** Guía que la calculadora recomienda para cada etapa: [ruta, texto del botón]. */
export const STAGE_GUIDES: Record<LifeStage, readonly [string, string]> = {
  puppy: ['/salud-perros-mayores', 'Ver cómo prepararlo para el futuro →'],
  young: ['/alimentacion-perros-senior', 'Ver alimentación y peso →'],
  mature: ['/salud-perros-mayores', 'Ver plan preventivo senior →'],
  senior: ['/movilidad-dolor-perros-mayores', 'Ver cuidados de movilidad →'],
  longevous: ['/movilidad-dolor-perros-mayores', 'Ver cómo darle más confort →'],
};

/** Fuentes de la sección #metodo de la calculadora. */
export const AGE_SOURCES = [
  { id: 'aaha', text: 'Creevy KE, Grady J, Little SE, et al. 2019 AAHA Canine Life Stage Guidelines. J Am Anim Hosp Assoc. 2019;55(6):267-290.', doi: '10.5326/JAAHA-MS-6999', use: 'Definición de las etapas de vida y del inicio de la etapa senior (último 25 % de la esperanza de vida).' },
  { id: 'montoya', text: 'Montoya M, Morrison JA, Arrignon F, et al. Life expectancy tables for dogs and cats derived from clinical data. Front Vet Sci. 2023;10:1082102.', doi: '10.3389/fvets.2023.1082102', use: 'Esperanza de vida al nacer por tamaño, con datos clínicos de más de 1.000 hospitales Banfield en EE. UU.' },
  { id: 'mcmillan', text: 'McMillan KM, Bielby J, Williams CL, et al. Longevity of companion dog breeds: those at risk from early death. Sci Rep. 2024;14:531.', doi: '10.1038/s41598-023-50458-w', use: 'Confirma en 584.734 perros del Reino Unido que el tamaño y la forma del hocico influyen en la longevidad (mediana: 12,5 años).' },
  { id: 'kraus', text: 'Kraus C, Pavard S, Promislow DEL. The size–life span trade-off decomposed: why large dogs die young. Am Nat. 2013;181(4):492-505.', doi: '10.1086/669665', use: 'Explica por qué los perros grandes envejecen a un ritmo más rápido: la base del ajuste por tamaño.' },
  { id: 'wang', text: 'Wang T, Ma J, Hogan AN, et al. Quantitative translation of dog-to-human aging by conserved remodeling of the DNA methylome. Cell Syst. 2020;11(2):176-185.e6.', doi: '10.1016/j.cels.2020.06.006', use: 'Fórmula epigenética (16 × ln(edad) + 31) que mostramos como comparación en «Fórmula de Wang».' },
] as const;

/** Marco común de portada y calculadora; edades derivadas, no cortes clínicos individuales. */
export function seniorFrameworkText(): string {
  const age = (size: DogSize) => String(seniorAge(size)).replace('.', ',');
  return `Usamos como marco la definición de AAHA: el último 25 % de la esperanza de vida estimada. Aplicada a las medias por tamaño del estudio de Montoya (2023), nuestra calculadora sitúa el inicio aproximadamente en ${age('small')} años para pequeños, ${age('medium')} para medianos, ${age('large')} para grandes y ${age('giant')} para gigantes. Son referencias poblacionales redondeadas a medio año, no edades universales ni una predicción individual. La raza, la salud y la valoración veterinaria pueden cambiar el seguimiento; no esperes a esas edades para consultar por cambios.`;
}
