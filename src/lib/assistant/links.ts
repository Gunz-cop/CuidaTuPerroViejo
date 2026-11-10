import type { Knowledge } from './knowledge';
import type { Recommendation } from './types';

const SITE_ORIGIN = 'https://cuidatuperroviejo.com';
const MARKDOWN_LINK = /\[([^\]\n]+)\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/gu;
const MAX_RECOMMENDATIONS = 4;

/** Devuelve la ruta canónica del sitio a la que apunta el enlace, o null. */
export const toSitePath = (target: string): string | null => {
  let path = target.trim();
  if (path.startsWith(SITE_ORIGIN)) path = path.slice(SITE_ORIGIN.length) || '/';
  if (!path.startsWith('/') || path.startsWith('//')) return null;
  path = path.split(/[?#]/u)[0] ?? '';
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path || '/';
};

export type CheckedAnswer = {
  answer: string;
  recommendations: Recommendation[];
};

/**
 * El modelo enlaza las guías dentro del texto. Aquí se comprueba cada enlace
 * contra el contenido realmente publicado: lo que no exista en el sitio se
 * deja como texto plano, y de los enlaces válidos salen las tarjetas.
 */
export const checkAnswerLinks = (answer: string, knowledge: Knowledge): CheckedAnswer => {
  const recommended = new Map<string, Recommendation>();

  const checked = answer.replace(MARKDOWN_LINK, (_match, label: string, target: string) => {
    const path = toSitePath(target);
    if (!path || !knowledge.sitePaths.has(path)) return label;
    const guide = knowledge.byHref.get(path);
    if (guide && guide.kind !== 'pillar' && !recommended.has(path) && recommended.size < MAX_RECOMMENDATIONS) {
      recommended.set(path, {
        title: guide.title,
        description: guide.description,
        href: guide.href,
        pillar: guide.pillar,
      });
    }
    return `[${label}](${path})`;
  });

  return { answer: checked.trim(), recommendations: [...recommended.values()] };
};
