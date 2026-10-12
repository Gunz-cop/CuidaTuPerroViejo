// Selector de ayudas de movilidad (contratos F4A §1.2). Opciones y tabla de
// resultados copiadas sin cambios del script de la página en la base eff4ce1:
// la clave es código de nivel + código de manejo. Las URLs de afiliado viven en
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
    description: 'Tu perro necesita tracción segura en el suelo. Los calcetines de silicona son el primer paso; las botas de caucho dan soporte lateral extra.',
    plan: [
      { name: 'Calcetines antideslizantes de silicona', why: 'Agarre inmediato en parquet. Fáciles de poner, se lavan a diario.' },
      { name: 'Botas de caucho con suela estructurada', why: 'Cubren el tobillo. Ideales cuando las patas se abren lateralmente.' },
    ],
  },
  LB: {
    icon: '✅',
    badge: 'Nivel Ligero – Mejor sin accesorios en patas',
    title: 'Alfombras antideslizantes por toda la casa',
    description: 'Como no tolera cosas en las patas, la solución es el entorno. Cubrir sus rutas elimina el riesgo sin ningún estrés para él.',
    plan: [
      { name: 'Alfombras de yoga (antideslizantes)', why: 'Bajan el riesgo de caída sin que el perro note nada. Una por corredor.' },
      { name: 'Runners para pasillos', why: 'Cubren tramos largos. Se pueden cortar a medida y no se deslizan.' },
    ],
  },
  MA: {
    icon: '✅',
    badge: 'Nivel Moderado – Tolera arnés',
    title: 'Arnés de soporte trasero + rampa de acceso',
    description: 'Necesita apoyo activo para caminar y acceder a superficies elevadas. El arnés te permite guiarle sin dañar su espalda ni la tuya.',
    plan: [
      { name: 'Arnés de soporte trasero con asa dorsal', why: 'Sostiene las caderas al caminar. Te protege la espalda a ti también.' },
      { name: 'Rampa plegable para coches y sofás', why: 'Elimina el salto. Superficie antideslizante, inclinación gradual.' },
      { name: 'Escaleras adaptadas (espuma + funda lavable)', why: 'Para espacios reducidos. Más compactas que la rampa.' },
    ],
  },
  MB: {
    icon: '✅',
    badge: 'Nivel Moderado – Prefiere manipulación mínima',
    title: 'Rampa de acceso + alfombras de ruta',
    description: 'Como se estresa con el contacto, priorizamos soluciones de entorno. La rampa le da autonomía; las alfombras crean un camino seguro sin tocarlo.',
    plan: [
      { name: 'Rampa plegable con superficie antideslizante', why: 'Se adapta a coches y muebles. Él sube y baja solo cuando esté listo.' },
      { name: 'Alfombras runner para rutas habituales', why: 'Traza su camino seguro sin que necesite llevar nada encima.' },
      { name: 'Cama ortopédica de memory foam', why: 'Reduce el esfuerzo de levantarse. Bordes firmes como punto de apoyo.' },
    ],
  },
  SA: {
    icon: '❤️',
    badge: 'Nivel Severo – Cuidado paliativo',
    title: 'Silla de ruedas canina + cama ortopédica + soporte de cadera',
    description: 'Tu perro necesita apoyo total. La silla de ruedas le devuelve movilidad; la cama ortopédica previene úlceras de decúbito. Revisa la alerta paliativa arriba.',
    plan: [
      { name: 'Silla de ruedas canina trasera (a medida)', why: 'Le permite moverse solo. Fundamental para su calidad de vida y estado mental.' },
      { name: 'Cama de memory foam ortopédico (bordes altos)', why: 'Distribuye el peso, previene llagas. Los bordes firmes ayudan a incorporarse.' },
      { name: 'Soporte de cadera / faja lumbar canina', why: 'Para los momentos en que le ayudas a caminar sin silla.' },
      { name: 'Pañales caninos + empapadores absorbentes', why: 'Para la higiene cuando ya no controla esfínteres.' },
    ],
  },
  SB: {
    icon: '❤️',
    badge: 'Nivel Severo – Cuidado paliativo',
    title: 'Silla de ruedas + cama ortopédica + entorno adaptado',
    description: 'Como se estresa con el contacto, lo prioritario es darle el máximo de autonomía posible con ayudas de entorno. Revisa la alerta paliativa arriba.',
    plan: [
      { name: 'Silla de ruedas canina trasera (a medida)', why: 'Le permite moverse sin depender de tu ayuda. Reduce su ansiedad.' },
      { name: 'Cama de memory foam ortopédico', why: 'Previene úlceras. Elige una con cubierta de felpa suave: menos fricción.' },
      { name: 'Pañales caninos desechables + empapadores', why: 'Para la higiene. Cámbialos cada vez que estén mojados para evitar dermatitis.' },
    ],
  },
} as const satisfies Record<ResultKey, MobilityResultText>;


/** Contenido estático de #m5alert (visible sólo en nivel severo), según alertItemText de contratos §1.2. */
export const PALLIATIVE_ALERT = {
  title: '⚠️ Cuidado paliativo importante',
  items: [
    { text: '⚠️ Para la higiene: considera pañales caninos y empapadores absorbentes bajo su zona de descanso. Cámbialos con frecuencia para evitar dermatitis.', link: null },
    { text: '⚠️ Cambia su posición cada 4 horas si no puede moverse solo, para prevenir úlceras de decúbito.', link: { label: 'Cómo hacerlo sin causarle dolor →', url: `${SITE}/cuidados-paliativos-perros/ulceras-presion-perros` } },
    { text: '⚠️ Evalúa si hay dolor controlado con nuestra', link: { label: 'Calculadora HHHHHMM →', url: `${SITE}/herramientas/calculadora-calidad-vida-perros` } },
  ],
} as const;

export const MOBILITY_GUIDE: Guide = { label: '📖 Leer la guía completa de movilidad y dolor →', url: `${SITE}/movilidad-dolor-perros-mayores` };
export const MOBILITY_NOTICES = ['Esta recomendación es una guía de apoyo. Ante dudas, consulta siempre a tu veterinario.'] as const;

export const MOBILITY_TOOL: ToolInfo = {
  toolId: 'movilidad',
  documentId: 'tool--movilidad',
  name: 'Selector de Ayudas de Movilidad para Perros Mayores',
  canonicalUrl: `${SITE}/herramientas/selector-movilidad-perros-mayores`,
  softwareVersion: '1.0',
  lastReviewed: '2026-05-14',
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
