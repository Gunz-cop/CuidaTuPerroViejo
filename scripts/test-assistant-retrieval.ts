import assert from 'node:assert/strict';
import { parseGeneratedAnswer } from '../src/lib/assistant/generation';
import { getEmergencyAnswer, getUrinaryClarificationAnswer } from '../src/lib/assistant/guidance';
import { findFallbackRecommendations } from '../src/lib/assistant/retrieval';
import type { ArticleCandidate } from '../src/lib/assistant/types';

const candidate = (slug: string, title: string, description: string): ArticleCandidate => ({
  slug,
  title,
  description,
  href: `/tema/${slug}`,
  pillar: 'Prueba',
  keyword: title,
  routingText: `${title}. ${description}`,
});

const catalog = [
  candidate('agresividad', 'Agresividad tardía en perros mayores', 'Gruñe o muerde de repente por dolor o deterioro cognitivo.'),
  candidate('separacion', 'Ansiedad por separación', 'Llora o ladra cuando se queda solo.'),
  candidate('incontinencia', 'Incontinencia urinaria', 'Pérdidas involuntarias de orina mientras descansa.'),
  candidate('dental', 'Salud dental en perros mayores', 'Prevención de sarro, mal aliento y enfermedad periodontal.'),
];

const parsed = parseGeneratedAnswer(
  { response: { answer: 'Respuesta prudente.', recommended_slug: 'agresividad' } },
  new Set(catalog.map((article) => article.slug)),
);
assert.deepEqual(parsed, { answer: 'Respuesta prudente.', recommendedSlug: 'agresividad' });

const parsedString = parseGeneratedAnswer(
  { response: JSON.stringify({ answer: 'Otra respuesta.', recommended_slug: 'none' }) },
  new Set(catalog.map((article) => article.slug)),
);
assert.deepEqual(parsedString, { answer: 'Otra respuesta.', recommendedSlug: null });
assert.equal(parseGeneratedAnswer({ response: { answer: '', recommended_slug: 'none' } }, new Set()), null);

assert.equal(
  findFallbackRecommendations('Necesito información de salud dental', catalog)[0]?.title,
  'Salud dental en perros mayores',
);
assert.deepEqual(findFallbackRecommendations('Mi perro tose por las noches', catalog), []);

assert.match(getEmergencyAnswer('Mi perro me mordió pero no tiene rabia') ?? '', /15 minutos/);
assert.match(getEmergencyAnswer('Mi perro me mordió pero no tiene rabia') ?? '', /sanitaria humana/);
assert.match(getEmergencyAnswer('Le cuesta orinar y solo salen gotas') ?? '', /urgente/);
assert.match(getEmergencyAnswer('Mi perro no puede respirar') ?? '', /emergencia vital/);
assert.equal(getEmergencyAnswer('Mi perro mordió su juguete'), null);

const urinaryClarification = getUrinaryClarificationAnswer('Mi perra se orina constantemente');
assert.match(urinaryClarification ?? '', /pérdidas involuntarias/);
assert.equal(getUrinaryClarificationAnswer('Mi perro tose por las noches'), null);

console.log(JSON.stringify({ event: 'assistant_unit_tests_passed', cases: 14 }));
