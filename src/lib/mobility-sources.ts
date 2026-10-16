// Fuentes de la página del selector de movilidad. Verificadas una a una contra
// Crossref y el texto del artículo el 2026-10-16. La tabla de decisión del
// selector (nivel × manejo) vive en agent-tools/movilidad.ts y es criterio
// editorial alineado con estas guías, no una tabla publicada en ellas.
//
// - COAST 2023 (doi:10.3389/fvets.2023.1137888): modificaciones del entorno
//   (suelo antideslizante, camas, rampas) desde el estadio 2; dispositivos de
//   movilidad (arneses tipo eslinga, carros/sillas) en el estadio 4.
// - AAHA 2023 (doi:10.5326/JAAHA-MS-7343): rampas, alfombras y suelos con buena
//   tracción, y mucho acolchado para perros senior.
// - WSAVA 2022 (doi:10.1111/jsap.13566): reconocer y tratar el dolor crónico.
// - Freeman 2012 (doi:10.1111/j.1939-1676.2011.00838.x): sarcopenia.

export interface MobilitySource { id: string; text: string; doi: string; use: string }

export const MOBILITY_SOURCES: readonly MobilitySource[] = [
  {
    id: 'coast',
    text: 'Cachon T, Frykman O, Innes JF, et al. COAST Development Group\'s international consensus guidelines for the treatment of canine osteoarthritis. Front Vet Sci. 2023;10:1137888.',
    doi: '10.3389/fvets.2023.1137888',
    use: 'Orden de las ayudas: primero el entorno (suelo antideslizante, camas, rampas) y, en los casos más avanzados, eslingas y carros de ruedas.',
  },
  {
    id: 'aaha',
    text: 'Dhaliwal R, Boynton E, Carrera-Justiz S, et al. 2023 AAHA Senior Care Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2023;59(1):1-21.',
    doi: '10.5326/JAAHA-MS-7343',
    use: 'Rampas, alfombras y suelos con buena tracción, y descanso acolchado para perros senior.',
  },
  {
    id: 'wsava',
    text: 'Monteiro BP, Lascelles BDX, Murrell J, et al. 2022 WSAVA guidelines for the recognition, assessment and treatment of pain. J Small Anim Pract. 2023;64(4):177-254.',
    doi: '10.1111/jsap.13566',
    use: 'Por qué una ayuda de movilidad no sustituye el control del dolor crónico.',
  },
  {
    id: 'freeman',
    text: 'Freeman LM. Cachexia and sarcopenia: emerging syndromes of importance in dogs and cats. J Vet Intern Med. 2012;26(1):3-17.',
    doi: '10.1111/j.1939-1676.2011.00838.x',
    use: 'Qué es la sarcopenia: pérdida progresiva de masa y fuerza muscular con la edad.',
  },
];
