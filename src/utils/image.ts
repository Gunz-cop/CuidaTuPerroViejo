export function buildSrcset(src: string | undefined): string {
  if (!src) return '';

  const base = src.replace(/\.webp$/i, '');
  return `${base}-400.webp 400w, ${src} 1200w`;
}
