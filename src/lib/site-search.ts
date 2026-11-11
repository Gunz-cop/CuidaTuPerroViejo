/**
 * Lógica pura del buscador del sitio. La interfaz vive en
 * `src/components/SiteSearch.astro` y el índice lo genera Pagefind dentro del
 * build (`scripts/pagefind-integration.mjs`). Aquí no hay DOM: todo lo que
 * decide qué se muestra está en funciones que se prueban en `tests/`.
 */

/** Forma (parcial) de lo que devuelve `result.data()` en Pagefind. */
export interface PagefindSubResult {
  title?: string;
  url: string;
  excerpt: string;
}

export interface PagefindResultData {
  url: string;
  excerpt: string;
  meta?: Record<string, string | undefined>;
  sub_results?: PagefindSubResult[];
}

export interface ExcerptPart {
  text: string;
  mark: boolean;
}

export interface SearchSection {
  url: string;
  title: string;
  excerpt: ExcerptPart[];
}

export interface SearchItem {
  url: string;
  title: string;
  /** Guía, Tema o Herramienta. */
  tipo: string;
  /** Pilar al que pertenece; vacío en los propios pilares. */
  seccion: string;
  image: string;
  excerpt: ExcerptPart[];
  sections: SearchSection[];
}

export const MAX_QUERY_LENGTH = 80;
export const MIN_QUERY_LENGTH = 2;
export const PAGE_SIZE = 6;
export const MAX_SECTIONS = 2;

/** Clave de sessionStorage con la que el buscador le pasa la consulta al asistente. */
export const ASSISTANT_PREFILL_KEY = 'ctpv-assistant-prefill';

/** Espacios colapsados y longitud acotada. No toca tildes: el índice las normaliza. */
export const normalizeQuery = (raw: string): string =>
  raw.replace(/\s+/g, ' ').trim().slice(0, MAX_QUERY_LENGTH);

export const isSearchable = (query: string): boolean => query.length >= MIN_QUERY_LENGTH;

/** Palabras que están en casi todas las páginas y solo añaden ruido a la consulta. */
const STOPWORDS = new Set([
  'a', 'al', 'con', 'de', 'del', 'el', 'en', 'es', 'la', 'las', 'le', 'lo', 'los', 'me', 'mi', 'mis',
  'o', 'para', 'por', 'que', 'se', 'su', 'sus', 'un', 'una', 'y',
]);

/**
 * Singular aproximado de una palabra. El índice no lematiza (ver
 * `scripts/pagefind-integration.mjs`) pero busca por prefijo: con «cama» se
 * encuentran «cama» y «camas», con «camas» solo «camas». Basta, por tanto, con
 * quitar la marca de plural a lo que escribe el visitante.
 *
 * No toca «-is» ni «-us» (artrosis, dosis, virus), que no son plurales.
 */
export const singularize = (word: string): string => {
  if (word.length < 4) return word;
  // collares → collar, articulaciones → articulacion, edades → edad
  if (word.length >= 6 && /[rlndj]es$/i.test(word)) return word.slice(0, -2);
  // camas → cama, perros → perro, dientes → diente
  if (/[aeoáéó]s$/i.test(word)) return word.slice(0, -1);
  return word;
};

/**
 * Consulta que se envía al índice: sin palabras vacías y en singular. Una
 * frase entre comillas se respeta tal cual (búsqueda exacta de Pagefind).
 */
export const toIndexQuery = (query: string): string => {
  if (query.includes('"')) return query;
  const words = query.split(' ').filter(Boolean);
  const meaningful = words.filter((word) => !STOPWORDS.has(word.toLowerCase()));
  return (meaningful.length > 0 ? meaningful : words).map(singularize).join(' ');
};

/**
 * El build genera `pagina.html` (`build.format: 'file'`) y Pagefind indexa esa
 * ruta, pero la URL canónica del sitio no lleva extensión ni barra final.
 */
export const cleanResultUrl = (url: string): string => {
  const hashAt = url.indexOf('#');
  const path = hashAt === -1 ? url : url.slice(0, hashAt);
  const hash = hashAt === -1 ? '' : url.slice(hashAt);
  const clean = path.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/(.)\/$/, '$1');
  return `${clean || '/'}${hash}`;
};

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x27;': "'",
  '&nbsp;': ' ',
};

const decodeEntities = (text: string): string =>
  text.replace(/&(?:amp|lt|gt|quot|nbsp|#39|#x27);/g, (entity) => ENTITIES[entity] ?? entity);

/**
 * Pagefind entrega el fragmento como HTML escapado con `<mark>` alrededor de
 * las coincidencias. Se convierte en partes de texto plano para pintarlo con
 * `textContent`: ningún contenido del índice llega al DOM como HTML.
 */
export const excerptParts = (excerpt: string): ExcerptPart[] => {
  const parts: ExcerptPart[] = [];
  const pattern = /<mark>([\s\S]*?)<\/mark>/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  const push = (raw: string, mark: boolean) => {
    const text = decodeEntities(raw.replace(/<[^>]*>/g, ''));
    if (text) parts.push({ text, mark });
  };
  while ((match = pattern.exec(excerpt)) !== null) {
    push(excerpt.slice(cursor, match.index), false);
    push(match[1] ?? '', true);
    cursor = match.index + match[0].length;
  }
  push(excerpt.slice(cursor), false);
  return parts;
};

/** Título sin la coletilla de marca que algunos `<h1>` o `<title>` arrastran. */
const cleanTitle = (title: string): string => title.replace(/\s+/g, ' ').trim();

export const toSearchItem = (data: PagefindResultData): SearchItem => {
  const url = cleanResultUrl(data.url);
  const title = cleanTitle(data.meta?.title ?? '') || url;
  const sections = (data.sub_results ?? [])
    .map((sub) => ({ url: cleanResultUrl(sub.url), title: cleanTitle(sub.title ?? ''), excerpt: excerptParts(sub.excerpt) }))
    // El primer sub-resultado suele ser la propia página (sin ancla): ya está arriba.
    .filter((sub) => sub.url.includes('#') && sub.title !== '' && sub.title !== title)
    .slice(0, MAX_SECTIONS);
  return {
    url,
    title,
    tipo: data.meta?.tipo ?? 'Guía',
    seccion: data.meta?.seccion ?? '',
    image: data.meta?.image ?? '',
    excerpt: excerptParts(data.excerpt),
    sections,
  };
};

/** Mensaje para lectores de pantalla y para la cabecera de resultados. */
export const resultSummary = (count: number, query: string): string => {
  if (count === 0) return `Sin resultados para «${query}»`;
  return `${count} ${count === 1 ? 'resultado' : 'resultados'} para «${query}»`;
};

/** Índice siguiente al moverse con flechas; da la vuelta en los extremos. */
export const stepIndex = (current: number, delta: 1 | -1, length: number): number => {
  if (length === 0) return -1;
  if (current === -1) return delta === 1 ? 0 : length - 1;
  return (current + delta + length) % length;
};
