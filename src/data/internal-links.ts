export const PILAR_NAMES: Record<string, string> = {
  'herramientas': 'Herramientas para perros senior',
  'salud-perros-mayores': 'Salud de perros mayores',
  'alimentacion-perros-senior': 'Alimentación de perros senior',
  'movilidad-dolor-perros-mayores': 'Movilidad y dolor en perros mayores',
  'salud-mental-emocional-perros': 'Salud mental y emocional',
  'higiene-hogar-perros-senior': 'Higiene y hogar para perros senior',
  'cuidados-paliativos-perros': 'Cuidados paliativos para perros mayores',
};

/**
 * Puentes editoriales: solo se mantienen aquí los destinos que tienen una
 * relación útil para el lector. Los enlaces del mismo pilar se calculan con
 * la fecha de publicación y se limitan en SiloNavigation.astro.
 */
export const CROSS_PILLAR_LINKS: Record<string, string[]> = {
  'agresividad-tardia-perros-mayores-dolor': [
    'disfuncion-cognitiva-canina',
    'chequeo-geriatrico-canino',
  ],
  'ansiedad-separacion-perros-senior': [
    'disfuncion-cognitiva-canina',
    'prevencion-caidas-perro-mayor',
  ],
  'cama-ortopedica-perros-mayores-displasia-artrosis': [
    'ulceras-presion-perros',
    'prevencion-caidas-perro-mayor',
  ],
  'chequeo-geriatrico-canino': [
    'vacunas-desparasitacion-perros-senior',
    'sindrome-cushing-perros-mayores',
  ],
  'comida-casera-perros-mayores': [
    'insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion',
    'mi-perro-viejo-defeca-mucho-poliquezia',
  ],
  'como-dar-medicacion-perro': [
    'chequeo-geriatrico-canino',
    'ulceras-presion-perros',
  ],
  'disfuncion-cognitiva-canina': [
    'agresividad-tardia-perros-mayores-dolor',
    'ansiedad-separacion-perros-senior',
  ],
  'incontinencia-fecal-perros-senior': [
    'incontinencia-urinaria-perros-mayores',
    'ulceras-presion-perros',
  ],
  'incontinencia-urinaria-perros-mayores': [
    'incontinencia-fecal-perros-senior',
    'ulceras-presion-perros',
  ],
  'insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion': [
    'comida-casera-perros-mayores',
    'mi-perro-viejo-defeca-mucho-poliquezia',
  ],
  'mi-perro-viejo-defeca-mucho-poliquezia': [
    'insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion',
    'incontinencia-fecal-perros-senior',
  ],
  'prevencion-caidas-perro-mayor': [
    'cama-ortopedica-perros-mayores-displasia-artrosis',
    'ulceras-presion-perros',
  ],
  'salud-dental-perros-mayores': [
    'chequeo-geriatrico-canino',
    'como-dar-medicacion-perro',
  ],
  'sindrome-cushing-perros-mayores': [
    'chequeo-geriatrico-canino',
    'insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion',
  ],
  'ulceras-presion-perros': [
    'cama-ortopedica-perros-mayores-displasia-artrosis',
    'incontinencia-urinaria-perros-mayores',
  ],
  'vacunas-desparasitacion-perros-senior': [
    'chequeo-geriatrico-canino',
    'sindrome-cushing-perros-mayores',
  ],
};

export const TOOL_LINKS: Record<string, { href: string; label: string; description: string }> = {
  'cama-ortopedica-perros-mayores-displasia-artrosis': {
    href: '/herramientas/selector-movilidad-perros-mayores',
    label: 'Selector de ayudas de movilidad para perros mayores',
    description: 'Compara qué apoyo puede encajar mejor según la movilidad de tu perro.',
  },
  'prevencion-caidas-perro-mayor': {
    href: '/herramientas/selector-movilidad-perros-mayores',
    label: 'Selector de ayudas de movilidad para perros mayores',
    description: 'Encuentra una ayuda práctica para reducir tropiezos y facilitar los desplazamientos.',
  },
  'ulceras-presion-perros': {
    href: '/herramientas/calculadora-calidad-vida-perros',
    label: 'Calculadora HHHHHMM de calidad de vida',
    description: 'Valora de forma orientativa el bienestar diario junto con tu veterinario.',
  },
  'como-dar-medicacion-perro': {
    href: '/herramientas/calculadora-calidad-vida-perros',
    label: 'Calculadora HHHHHMM de calidad de vida',
    description: 'Registra cómo está tu perro y observa la evolución de sus días buenos y malos.',
  },
};
