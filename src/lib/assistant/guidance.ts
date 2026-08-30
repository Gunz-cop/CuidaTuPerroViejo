import { normalizeText } from './retrieval';

export const getEmergencyAnswer = (question: string): string | null => {
  const normalizedQuestion = normalizeText(question);
  const biteSignal = normalizedQuestion.includes('mordi') || normalizedQuestion.includes('muerd');
  const humanTarget = [
    'me mordio', 'me ha mordido', 'me mordio', 'mordio a mi', 'mordio a alguien',
    'mordio a una persona', 'mordio a mi hijo', 'mordio a mi hija', 'mordio al nino',
    'mordio a la nina', 'mordida de mi perro',
  ].some((signal) => normalizedQuestion.includes(signal));

  if (biteSignal && humanTarget) {
    return 'Lava y enjuaga la herida de inmediato con abundante agua y jabón durante 15 minutos. Si rompió la piel, busca valoración sanitaria humana hoy para revisar la lesión y decidir sobre tétanos y riesgo de rabia; que el perro parezca sano no permite descartarlo por cuenta propia. Si el sangrado no se detiene, la herida es profunda o está en cara, cuello o manos, acude a urgencias. Separa al perro con calma y solicita también una evaluación veterinaria de la causa de la mordedura; no lo castigues.';
  }

  const lifeThreateningSignal = [
    'no puede respirar', 'le cuesta respirar', 'respira con dificultad', 'se ahoga',
    'encias azules', 'convulsiona', 'convulsionando', 'se desplomo', 'se desmayo',
    'esta inconsciente', 'sangrado abundante', 'no para de sangrar',
  ].some((signal) => normalizedQuestion.includes(signal));

  if (lifeThreateningSignal) {
    return 'Lo que describes puede ser una emergencia vital. Acude ahora a un servicio veterinario de urgencias y, si es posible, avisa mientras vas. Mantén a tu perro tranquilo, con el cuello libre y sin forzarlo a caminar, comer o beber. No le introduzcas objetos en la boca durante una convulsión y no le des medicación humana. Si sangra, aplica presión suave y continua con una tela limpia durante el traslado, sin retrasar la salida.';
  }

  const difficultyUrinating = [
    'le cuesta orinar', 'dificultad para orinar', 'intenta orinar', 'hace fuerza para orinar',
  ].some((signal) => normalizedQuestion.includes(signal));
  const littleOrNoUrine = [
    'solo salen gotas', 'salen pocas gotas', 'no sale orina', 'no puede orinar', 'no logra orinar',
  ].some((signal) => normalizedQuestion.includes(signal));

  if (difficultyUrinating && littleOrNoUrine) {
    return 'Hacer esfuerzo para orinar y expulsar solo gotas o nada puede indicar una obstrucción urinaria y requiere atención veterinaria urgente hoy. No le presiones el abdomen, no intentes vaciarle la vejiga y no le des medicación humana. Mantenlo tranquilo y llévalo a una clínica; si no sale nada de orina, tiene el abdomen doloroso, vomita, está muy débil o se desploma, acude a urgencias de inmediato.';
  }

  const mobilityEmergency = [
    'se arrastra', 'arrastra las patas', 'no mueve las patas', 'no puede caminar',
    'no se puede levantar', 'paralizado', 'paralizada',
  ].some((signal) => normalizedQuestion.includes(signal));

  if (mobilityEmergency) {
    return 'Que un perro se arrastre o deje de caminar después de una caída puede indicar una lesión seria y necesita valoración veterinaria urgente hoy. No lo obligues a levantarse ni a caminar. Mantenlo quieto sobre una superficie firme y acolchada; si debes moverlo, sostén el cuerpo completo evitando doblar la espalda. No le des analgésicos humanos. Si pierde el control de la orina, muestra dolor intenso, respira con dificultad o empeora, acude a un servicio veterinario de urgencias de inmediato.';
  }

  const vomiting = ['vomita', 'vomitando', 'vomito', 'vmitando', 'arcadas']
    .some((signal) => normalizedQuestion.includes(signal));
  const ateGarbage = [
    'comio basura', 'comer basura', 'comiendo basura', 'comio desperdicios',
    'comida podrida', 'del basurero', 'de la basura',
  ].some((signal) => normalizedQuestion.includes(signal));

  if (vomiting && ateGarbage) {
    return 'Vomitar después de comer basura requiere contactar hoy mismo a un veterinario, porque pudo ingerir algo tóxico o un objeto que cause una obstrucción. No intentes provocarle más vómito, no le des medicación humana ni remedios caseros y no lo fuerces a comer o beber. Si puedes, anota qué pudo ingerir, cuánto y hace cuánto tiempo, y conserva una foto o el envase. Acude a urgencias de inmediato si vomita repetidamente, tiene arcadas sin expulsar nada, abdomen hinchado, sangre, debilidad, dificultad para respirar o colapso.';
  }

  return null;
};

export const getUrinaryClarificationAnswer = (question: string): string | null => {
  const normalizedQuestion = normalizeText(question);
  const ambiguousUrinaryLanguage = [
    'se orina', 'se hace pis', 'pierde orina', 'escape de orina', 'gotea orina',
    'orina mucho', 'orina constantemente', 'orina frecuentemente', 'moja la cama',
  ].some((signal) => normalizedQuestion.includes(signal));

  if (!ambiguousUrinaryLanguage) return null;

  return 'Lo que describes puede significar pérdidas involuntarias o que orina más veces o en mayor cantidad. Observa si deja gotas o moja la cama mientras duerme o descansa, o si adopta la postura para orinar y además bebe más. No le restrinjas el agua y mantén su piel limpia y seca. Pide una revisión veterinaria pronto para distinguir la causa. Si hace esfuerzo y sale poca o ninguna orina, tiene dolor o sangre, necesita atención veterinaria urgente.';
};

export const getArticleContingencyAnswer = () => (
  'Lo que describes coincide con temas que ya tratamos en nuestras guías. Mientras las revisas, anota cuándo aparece el cambio, cuánto dura y si afecta al apetito, el sueño, la movilidad o la eliminación. Evita forzar movimientos dolorosos y no le des medicación humana. Si el cambio apareció de repente, empeora o tu perro deja de comer, beber, caminar con normalidad o descansar, contacta a su veterinario.'
);
