// Selector de ayudas de movilidad (contratos F4A §1.2). Las opciones son las
// de la base eff4ce1; la tabla de resultados y el aviso de nivel severo se
// revisaron en la versión 1.1 (2026-10-17) contra las fuentes de
// src/lib/mobility-sources.ts. La clave es código de nivel + código de manejo. Las URLs de afiliado viven en
// movilidad-afiliados.ts y no forman parte de este dato.
import { SCHEMA_VERSION, SITE, requireEnum, requireExactKeys, type Guide, type ToolInfo } from './contract.ts';

export const MOBILITY_KEYS = ['level', 'handling'] as const;
export const LEVELS = [
  { value: 'light', code: 'L', icon: '\uD83D\uDC3E', title: 'Nivel Ligero', subtitle: 'Camina pero resbala o tiene miedo al suelo' },
  { value: 'moderate', code: 'M', icon: '\uD83D\uDEB6', title: 'Nivel Moderado', subtitle: 'Se fatiga r\u00e1pido, debilidad trasera o le cuestan las escaleras' },
  { value: 'severe', code: 'S', icon: '\uD83D\uDECC', title: 'Nivel Severo', subtitle: 'Ya no puede levantarse solo o perdi\u00f3 el uso de las patas traseras' },
] as const;
export const HANDLING = [
  { value: 'calm', code: 'A', icon: '\uD83D\uDE0C', title: 'Se deja manipular con calma', subtitle: 'Tolera que le toquen las patas y el cuerpo' },
  { value: 'stressed', code: 'B', icon: '\uD83D\uDE2C', title: 'Se estresa o reacciona mal', subtitle: 'Intenta morder, huye o gru\u00f1e cuando le tocan' },
] as const;

export type MobilityLevel = (typeof LEVELS)[number]['value'];
export type MobilityHandling = (typeof HANDLING)[number]['value'];
export type LevelCode = (typeof LEVELS)[number]['code'];
export type HandlingCode = (typeof HANDLING)[number]['code'];
export type ResultKey = `${LevelCode}${HandlingCode}`;
export interface MobilityInput { level: MobilityLevel; handling: MobilityHandling }
interface MobilityResultText { icon: string; badge: string; title: string; description: string; plan: ReadonlyArray<{ name: string; why: string }> }

export const RESULTS = {
  LA: {
    icon: '✅',
    badge: 'Nivel Ligero – Tolera accesorios',
    title: 'Calcetines y botas antideslizantes',
    description: 'Tu perro necesita tracción segura en el suelo. Cubre con alfombras sus rutas habituales y, como tolera accesorios, añade calcetines o botas antideslizantes. Ponlos solo para caminar y retíralos para descansar.',
    plan: [
      { name: 'Calcetines antideslizantes de silicona', why: 'Agarre inmediato en suelos lisos. Revisa que no le aprieten y quítaselos para dormir.' },
      { name: 'Botas de caucho con suela estructurada', why: 'Más firmes que el calcetín. Úsalas para paseos y salidas; deja que se acostumbre poco a poco.' },
    ],
  },
  LB: {
    icon: '✅',
    badge: 'Nivel Ligero – Mejor sin accesorios en patas',
    title: 'Alfombras antideslizantes por toda la casa',
    description: 'Como no tolera cosas en las patas, la solución es el entorno. Cubrir sus rutas reduce mucho el riesgo de resbalar sin ningún estrés para él.',
    plan: [
      { name: 'Alfombras de yoga (antideslizantes)', why: 'Agarre seguro sin que tenga que llevar nada puesto. Colócalas en los puntos donde gira o se levanta.' },
      { name: 'Runners para pasillos', why: 'Cubren tramos largos. Se pueden cortar a medida y no se deslizan.' },
    ],
  },
  MA: {
    icon: '✅',
    badge: 'Nivel Moderado – Tolera arnés',
    title: 'Arnés de soporte trasero + rampa de acceso',
    description: 'Necesita apoyo activo para caminar y para subir a superficies elevadas. El arnés te permite ayudarle sin forzar su espalda ni la tuya, y la rampa le ahorra el salto.',
    plan: [
      { name: 'Arnés de soporte trasero con asa dorsal', why: 'Sostiene las caderas al caminar y al levantarse. Úsalo en paseos y salidas, no todo el día, y revisa la piel de las ingles.' },
      { name: 'Rampa plegable para coches y sofás', why: 'Evita el salto al sofá o al coche. Busca superficie antideslizante e inclinación suave.' },
      { name: 'Escaleras adaptadas (espuma + funda lavable)', why: 'Para espacios reducidos. Más compactas que la rampa, pero exigen doblar las articulaciones: si le cuesta, mejor rampa.' },
    ],
  },
  MB: {
    icon: '✅',
    badge: 'Nivel Moderado – Prefiere manipulación mínima',
    title: 'Rampa de acceso + alfombras de ruta',
    description: 'Como se estresa con el contacto, priorizamos soluciones de entorno. La rampa le da autonomía; las alfombras crean un camino seguro sin tocarlo.',
    plan: [
      { name: 'Rampa plegable con superficie antideslizante', why: 'Se adapta a coches y muebles. Sube y baja a su ritmo, sin que tengas que cargarlo.' },
      { name: 'Alfombras runner para rutas habituales', why: 'Traza su camino seguro sin que necesite llevar nada encima.' },
      { name: 'Cama ortopédica de memory foam', why: 'Reparte mejor el peso al descansar. Los bordes firmes le sirven de apoyo para levantarse.' },
    ],
  },
  SA: {
    icon: '❤️',
    badge: 'Nivel Severo – Apoyo total',
    title: 'Silla de ruedas canina + cama ortopédica + soporte de cadera',
    description: 'Tu perro necesita apoyo total. Si conserva fuerza en las patas delanteras, una silla de ruedas puede devolverle el paseo; una cama acolchada y los cambios de postura protegen su piel. Revisa los cuidados diarios de arriba.',
    plan: [
      { name: 'Silla de ruedas canina trasera (a medida)', why: 'Le permite volver a moverse por su cuenta. Que la ajuste tu veterinario o un rehabilitador: las rozaduras son la complicación más frecuente.' },
      { name: 'Cama de memory foam ortopédico (bordes altos)', why: 'Reparte el peso y reduce la presión sobre caderas, hombros y costillas. Los bordes firmes ayudan a incorporarse.' },
      { name: 'Soporte de cadera / faja lumbar canina', why: 'Para los momentos en que le ayudas a caminar sin silla.' },
      { name: 'Pañales caninos + empapadores absorbentes', why: 'Para la higiene cuando ya no controla esfínteres.' },
    ],
  },
  SB: {
    icon: '❤️',
    badge: 'Nivel Severo – Apoyo total',
    title: 'Silla de ruedas + cama ortopédica + entorno adaptado',
    description: 'Como se estresa con el contacto, lo prioritario es darle la máxima autonomía posible con ayudas de entorno. Si conserva fuerza en las patas delanteras, la silla le permite moverse sin depender de tus manos. Revisa los cuidados diarios de arriba.',
    plan: [
      { name: 'Silla de ruedas canina trasera (a medida)', why: 'Le permite moverse sin depender de tu ayuda. Acostúmbralo en sesiones cortas y con premios; que la ajuste tu veterinario o un rehabilitador.' },
      { name: 'Cama de memory foam ortopédico', why: 'Reduce la presión al descansar. Elige una con cubierta suave y lavable: menos fricción.' },
      { name: 'Pañales caninos desechables + empapadores', why: 'Para la higiene. Cámbialos cada vez que estén mojados para evitar dermatitis.' },
    ],
  },
} as const satisfies Record<ResultKey, MobilityResultText>;


/** Contenido estático de #m5alert (visible sólo en nivel severo), según alertItemText de contratos §1.2. */
/** Contenido estático de #m5alert (visible sólo en nivel severo), según alertItemText de contratos §1.2. */
export const PALLIATIVE_ALERT = {
  title: '💛 Cuidados diarios si ya no se levanta solo',
  items: [
    { text: '🧻 Para la higiene: considera pañales caninos y empapadores absorbentes bajo su zona de descanso. Cámbialos con frecuencia para evitar dermatitis.', link: null },
    { text: '🔄 Cambia su postura cada 2 a 4 horas si no puede moverse solo, y más a menudo si es delgado o su cama es dura, para prevenir úlceras por presión.', link: { label: 'Cómo hacerlo sin causarle dolor →', url: `${SITE}/cuidados-paliativos-perros/ulceras-presion-perros` } },
    { text: '🩺 Pide a tu veterinario que valore si su dolor está bien controlado, y sigue su bienestar con nuestra', link: { label: 'Calculadora HHHHHMM →', url: `${SITE}/herramientas/calculadora-calidad-vida-perros` } },
  ],
} as const;

export const MOBILITY_GUIDE: Guide = { label: '📖 Leer la guía completa de movilidad y dolor →', url: `${SITE}/movilidad-dolor-perros-mayores` };
export const MOBILITY_NOTICES = ['Esta recomendación es una guía de apoyo. Ante dudas, consulta siempre a tu veterinario.'] as const;

export const MOBILITY_TOOL: ToolInfo = {
  toolId: 'movilidad',
  documentId: 'tool--movilidad',
  name: 'Selector de Ayudas de Movilidad para Perros Mayores',
  canonicalUrl: `${SITE}/herramientas/selector-movilidad-perros-mayores`,
  softwareVersion: '1.1',
  lastReviewed: '2026-10-17',
};

export function resultKey(level: LevelCode, handling: HandlingCode): ResultKey {
  return `${level}${handling}`;
}

export function parseMobilityInput(value: unknown): MobilityInput {
  const raw = requireExactKeys(value, MOBILITY_KEYS);
  return {
    level: requireEnum(raw.level, LEVELS.map((entry) => entry.value)),
    handling: requireEnum(raw.handling, HANDLING.map((entry) => entry.value)),
  };
}

type PalliativeAlert = { title: string; items: Array<{ text: string; link: Guide | null }> };

export interface MobilityResult {
  schemaVersion: typeof SCHEMA_VERSION;
  tool: ToolInfo;
  input: MobilityInput;
  resultKey: ResultKey;
  icon: string;
  badge: string;
  title: string;
  description: string;
  plan: Array<{ name: string; why: string }>;
  palliativeAlert: PalliativeAlert | null;
  guide: Guide;
  notices: string[];
}

export function recommendMobilityAids(value: unknown): MobilityResult {
  const input = parseMobilityInput(value);
  const level = LEVELS.find((entry) => entry.value === input.level)!;
  const handling = HANDLING.find((entry) => entry.value === input.handling)!;
  const key = resultKey(level.code, handling.code);
  const result = RESULTS[key];
  return {
    schemaVersion: SCHEMA_VERSION,
    tool: { ...MOBILITY_TOOL },
    input,
    resultKey: key,
    icon: result.icon,
    badge: result.badge,
    title: result.title,
    description: result.description,
    plan: result.plan.map((item) => ({ name: item.name, why: item.why })),
    palliativeAlert: level.code === 'S' ? {
      title: PALLIATIVE_ALERT.title,
      items: PALLIATIVE_ALERT.items.map((item) => ({ text: item.text, link: item.link === null ? null : { label: item.link.label, url: item.link.url } })),
    } : null,
    guide: { ...MOBILITY_GUIDE },
    notices: [...MOBILITY_NOTICES],
  };
}
