/**
 * Textos explicativos de los siete criterios HHHHHMM.
 *
 * `text` es la explicación que la página muestra en «¿Qué significan los
 * criterios?». `help` es la misma pregunta observable, sin la valoración, y
 * acompaña a cada paso de la herramienta para que quien responde sepa en qué
 * fijarse antes de puntuar. Los extremos 0/10 y las preguntas cortas siguen en
 * `agent-tools/calidad-vida.ts`, que comparten la web, la API y el PDF.
 */
import type { QualityKey } from './agent-tools/calidad-vida.ts';

export interface CriterionDetail {
  title: string;
  help: string;
  text: string;
}

export const CRITERION_DETAILS: Record<QualityKey, CriterionDetail> = {
  hurt: {
    title: 'Hurt (Dolor)',
    help: '¿Tiene un control adecuado del dolor y puede respirar con facilidad?',
    text: '¿Tiene un control adecuado del dolor y puede respirar con facilidad? El dolor no controlado es el principal factor de sufrimiento.',
  },
  hunger: {
    title: 'Hunger (Hambre)',
    help: '¿Come suficiente por su cuenta o necesita asistencia o sonda?',
    text: '¿Come suficiente por su cuenta o necesita asistencia/sonda? La falta de apetito sostenida compromete la energía del perro.',
  },
  hydration: {
    title: 'Hydration (Hidratación)',
    help: '¿Bebe suficiente o muestra cambios que deban valorarse en consulta?',
    text: '¿Bebe suficiente o muestra cambios que deban valorarse en consulta? La necesidad de fluidoterapia la determina el veterinario.',
  },
  hygiene: {
    title: 'Hygiene (Higiene)',
    help: '¿Se le puede mantener limpio y cepillado? ¿Tiene llagas por decúbito?',
    text: '¿Se le puede mantener limpio y cepillado? ¿Tiene llagas por decúbito? La incontinencia o falta de aseo afecta su dignidad y salud cutánea.',
  },
  happiness: {
    title: 'Happiness (Felicidad)',
    help: '¿Muestra alegría, interés en la familia, responde a caricias o juguetes?',
    text: '¿Muestra alegría, interés en la familia, responde a caricias o juguetes? ¿Sigue experimentando pequeños placeres?',
  },
  mobility: {
    title: 'Mobility (Movilidad)',
    help: '¿Puede levantarse y caminar solo, o necesita ayuda o carrito?',
    text: '¿Puede levantarse y caminar solo, o necesita ayuda/carrito? ¿Tiene deseos de moverse a pesar de sus limitaciones físicas?',
  },
  moreGoodDays: {
    title: 'More Good Days (Más días buenos)',
    help: 'Compara los días buenos con los días malos, en los que domina el dolor o la inactividad.',
    text: 'Cuando hay más días malos que días buenos (donde domina el dolor o la inactividad), el balance indica que su bienestar general está muy comprometido.',
  },
};
