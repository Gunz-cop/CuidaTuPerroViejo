/**
 * Base de conocimiento del asistente.
 *
 * No hay un índice propio: se reutiliza la proyección `agent-content/v1` que el
 * build ya genera para agentes externos (un Markdown limpio por página y un
 * índice con título, descripción y ruta canónica). Así el asistente responde
 * con exactamente el mismo contenido que está publicado.
 */
import { loadAgentIndex, type AgentDocument } from '../agent-content/runtime';
import type { Recommendation } from './types';

export type GuideKind = 'article' | 'tool' | 'pillar';

export type GuideEntry = Recommendation & {
  /** Identificador estable que el modelo usa para pedir la lectura. */
  id: string;
  kind: GuideKind;
  markdownPath: string;
  markdownBytes: number;
};

export type Knowledge = {
  guides: GuideEntry[];
  byId: Map<string, GuideEntry>;
  byHref: Map<string, GuideEntry>;
  /** Todas las rutas canónicas del sitio, sean recomendables o no. */
  sitePaths: Set<string>;
};

const PILLAR_LABELS: Record<string, string> = {
  'alimentacion-perros-senior': 'Alimentación',
  'cuidados-paliativos-perros': 'Cuidados',
  'higiene-hogar-perros-senior': 'Higiene y hogar',
  'movilidad-dolor-perros-mayores': 'Movilidad y dolor',
  'salud-mental-emocional-perros': 'Mente y comportamiento',
  'salud-perros-mayores': 'Salud',
  herramientas: 'Herramienta',
};

const MAX_GUIDE_CHARS = 60_000;

const guideKind = (document: Pick<AgentDocument, 'kind' | 'canonicalPath'>): GuideKind | null => {
  if (document.kind === 'article') return 'article';
  if (document.kind === 'tool') return 'tool';
  // La calculadora de edad se proyecta como página editorial, pero para el
  // lector es una herramienta más.
  if (document.kind === 'editorial' && document.canonicalPath.startsWith('/herramientas/')) return 'tool';
  if (document.kind === 'pillar') return 'pillar';
  return null;
};

type IndexDocument = Pick<
  AgentDocument,
  'documentId' | 'kind' | 'title' | 'description' | 'canonicalPath' | 'markdownPath' | 'markdownBytes'
>;

export const buildKnowledge = (documents: IndexDocument[]): Knowledge => {
  const guides: GuideEntry[] = [];
  for (const document of documents) {
    const kind = guideKind(document);
    if (!kind) continue;
    const firstSegment = document.canonicalPath.split('/').filter(Boolean)[0] ?? '';
    guides.push({
      id: document.documentId,
      kind,
      title: document.title,
      description: document.description,
      href: document.canonicalPath,
      pillar: kind === 'tool' ? 'Herramienta' : kind === 'pillar' ? 'Sección' : PILLAR_LABELS[firstSegment] ?? 'Guía',
      markdownPath: document.markdownPath,
      markdownBytes: document.markdownBytes,
    });
  }
  return {
    guides,
    byId: new Map(guides.map((guide) => [guide.id, guide])),
    byHref: new Map(guides.map((guide) => [guide.href, guide])),
    sitePaths: new Set(documents.map((document) => document.canonicalPath)),
  };
};

const knowledgeCache = new WeakMap<Fetcher, Promise<Knowledge>>();

export const loadKnowledge = (assets: Fetcher, requestUrl: string): Promise<Knowledge> => {
  const cached = knowledgeCache.get(assets);
  if (cached) return cached;
  const pending = loadAgentIndex(assets, requestUrl).then(({ index }) => buildKnowledge(index.documents));
  knowledgeCache.set(assets, pending);
  void pending.catch(() => {
    if (knowledgeCache.get(assets) === pending) knowledgeCache.delete(assets);
  });
  return pending;
};

/**
 * Quita de la proyección lo que solo gasta tokens: la cabecera de metadatos,
 * las imágenes y los destinos absolutos de los enlaces. El texto, los
 * encabezados, las listas y las tablas se conservan tal cual.
 */
export const cleanGuideMarkdown = (markdown: string): string => {
  const cleaned = markdown
    .replace(/^> (URL canónica|Idioma|Publicación|Modificación editorial):.*$/gmu, '')
    .replace(/^!\[[^\]]*\]\(<?[^)]*>?\)\s*$/gmu, '')
    .replace(/!\[[^\]]*\]\(<?[^)]*>?\)/gu, '')
    .replace(/\[([^\]]+)\]\(<https:\/\/cuidatuperroviejo\.com(\/[^>]*)?>\)/gu, (_match, label: string, path?: string) => `[${label}](${path || '/'})`)
    .replace(/\[([^\]]+)\]\(<(?:https?:)[^>]*>\)/gu, '$1')
    .replace(/\n{3,}/gu, '\n\n')
    .trim();
  return cleaned.length > MAX_GUIDE_CHARS
    ? `${cleaned.slice(0, MAX_GUIDE_CHARS)}\n\n[La guía continúa; el resto se ha omitido por extensión.]`
    : cleaned;
};

export const readGuide = async (assets: Fetcher, requestUrl: string, guide: GuideEntry): Promise<string> => {
  const response = await assets.fetch(new Request(new URL(guide.markdownPath, requestUrl), { method: 'GET', redirect: 'manual' }));
  if (response.status !== 200) {
    await response.body?.cancel();
    throw new Error(`La guía ${guide.id} respondió con HTTP ${response.status}.`);
  }
  return cleanGuideMarkdown(await response.text());
};
