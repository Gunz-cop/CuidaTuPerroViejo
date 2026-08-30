import assert from 'node:assert/strict';

type ExpectedCase = {
  question: string;
  expectedSlug: string | null;
  expectedSource?: string;
};

const baseUrl = process.env.ASSISTANT_BASE_URL ?? 'http://127.0.0.1:4321';
const cases: ExpectedCase[] = [
  { question: 'Mi perro me mordió pero no tiene rabia ni nada de eso', expectedSlug: 'agresividad-tardia-perros-mayores-dolor', expectedSource: 'emergency' },
  { question: 'Mi perro mayor empezó a gruñirme de repente cuando lo toco', expectedSlug: 'agresividad-tardia-perros-mayores-dolor' },
  { question: 'Nunca mordía y ahora intenta morder cuando lo levanto', expectedSlug: 'agresividad-tardia-perros-mayores-dolor' },
  { question: 'Mi Luna de 11 años ladra desesperada cuando salgo de casa', expectedSlug: 'ansiedad-separacion-perros-senior' },
  { question: 'Llora cuando se queda solo', expectedSlug: 'ansiedad-separacion-perros-senior' },
  { question: 'Se desorienta por la noche y se queda mirando la pared', expectedSlug: 'disfuncion-cognitiva-canina' },
  { question: 'Mi perra se orina constantemente', expectedSlug: 'incontinencia-urinaria-perros-mayores', expectedSource: 'clarification' },
  { question: 'Moja la cama mientras duerme y no parece darse cuenta', expectedSlug: 'incontinencia-urinaria-perros-mayores', expectedSource: 'clarification' },
  { question: 'Bebe muchísima agua, hace mucho pis y tiene la barriga caída', expectedSlug: 'sindrome-cushing-perros-mayores' },
  { question: 'Caga muchas veces al día desde hace una semana', expectedSlug: 'mi-perro-viejo-defeca-mucho-poliquezia' },
  { question: 'Se hace caca dormido sin enterarse', expectedSlug: 'incontinencia-fecal-perros-senior' },
  { question: 'Tiene mucho sarro y un aliento terrible', expectedSlug: 'salud-dental-perros-mayores' },
  { question: 'Se resbaló en el piso y ahora le da miedo caminar', expectedSlug: 'prevencion-caidas-perro-mayor' },
  { question: 'Se cayó y ahora arrastra las patas', expectedSlug: 'prevencion-caidas-perro-mayor', expectedSource: 'emergency' },
  { question: 'Escupe la pastilla cada vez que intento dársela', expectedSlug: 'como-dar-medicacion-perro' },
  { question: 'Tiene una llaga por pasar mucho tiempo acostado', expectedSlug: 'ulceras-presion-perros' },
  { question: 'Mi perro tose por las noches', expectedSlug: null },
  { question: 'Tiembla cuando oye la licuadora', expectedSlug: null },
  { question: 'Se rasca mucho una oreja', expectedSlug: null },
  { question: 'Vomita después de comer basura', expectedSlug: null, expectedSource: 'emergency' },
  { question: 'Ha adelgazado aunque come muchísimo y hace heces voluminosas', expectedSlug: 'insuficiencia-pancreatica-exocrina-perros-mayores-malabsorcion' },
  { question: 'Qué vacunas necesita mi perro ahora que tiene 12 años', expectedSlug: 'vacunas-desparasitacion-perros-senior' },
  { question: 'Cada cuánto debería hacerle análisis y una revisión geriátrica', expectedSlug: 'chequeo-geriatrico-canino' },
  { question: 'Qué comida casera segura puedo prepararle a mi perro mayor', expectedSlug: 'comida-casera-perros-mayores' },
  { question: 'Necesito elegir una cama para su artrosis y rigidez', expectedSlug: 'cama-ortopedica-perros-mayores-displasia-artrosis' },
  { question: 'Le apareció un bulto en el cuello', expectedSlug: null },
  { question: 'Tiene un ojo rojo y lagrimea', expectedSlug: null },
  { question: 'Tiene diarrea desde ayer', expectedSlug: null },
  { question: 'Vomita espuma amarilla por la mañana', expectedSlug: null },
  { question: 'Mi perro no puede respirar bien', expectedSlug: null, expectedSource: 'emergency' },
];

const failures: Array<Record<string, unknown>> = [];
for (let index = 0; index < cases.length; index += 4) {
  const batch = cases.slice(index, index + 4);
  const results = await Promise.all(batch.map(async (testCase) => {
    const response = await fetch(`${baseUrl}/api/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: testCase.question }),
    });
    assert.equal(response.status, 200, `${testCase.question}: HTTP ${response.status}`);
    const result = await response.json() as {
      source: string;
      recommendations: Array<{ href: string }>;
    };
    return { testCase, result };
  }));

  for (const { testCase, result } of results) {
    const actualSlug = result.recommendations[0]?.href.split('/').at(-1) ?? null;
    if (actualSlug !== testCase.expectedSlug || (testCase.expectedSource && result.source !== testCase.expectedSource)) {
      failures.push({
        question: testCase.question,
        expectedSlug: testCase.expectedSlug,
        actualSlug,
        expectedSource: testCase.expectedSource,
        actualSource: result.source,
      });
    }
  }
}

assert.deepEqual(failures, []);
console.log(JSON.stringify({ event: 'assistant_live_tests_passed', cases: cases.length, baseUrl }));
