import { getCollection, type CollectionEntry } from 'astro:content';
import type { ArticleCandidate } from './types';

const PILLAR_LABELS: Record<string, string> = {
  'alimentacion-perros-senior': 'Alimentación',
  'cuidados-paliativos-perros': 'Cuidados',
  'higiene-hogar-perros-senior': 'Higiene y hogar',
  'movilidad-dolor-perros-mayores': 'Movilidad y dolor',
  'salud-mental-emocional-perros': 'Mente y comportamiento',
  'salud-perros-mayores': 'Salud',
};

const toRoutingExcerpt = (body: string) => body
  .replace(/^import\s.+$/gm, ' ')
  .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/<[^>]+>/g, ' ')
  .replace(/[#*_>|`~]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 4_000);

export const getArticleCatalog = async (): Promise<ArticleCandidate[]> => {
  const articles = await getCollection('blog', ({ data }: CollectionEntry<'blog'>) => data.status === undefined || data.status === 'Publicado');

  return articles.map((article: CollectionEntry<'blog'>) => {
    const keyword = article.data.keywordPrincipal ?? '';
    const excerpt = toRoutingExcerpt(article.body ?? '');
    return {
      slug: article.id,
      title: article.data.title,
      description: article.data.metaDescription,
      href: `/${article.data.pilar}/${article.id}`,
      pillar: PILLAR_LABELS[article.data.pilar] ?? 'Guía',
      keyword,
      routingText: [article.data.title, article.data.metaDescription, keyword, excerpt].join('. '),
    };
  });
};
