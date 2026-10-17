import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export function mobileImageFor(src: string | undefined): string | undefined {
  if (!src) return undefined;
  const thumbnail = `${src.replace(/\.webp$/i, '')}-400.webp`;
  return existsSync(resolve('public', `.${thumbnail}`)) ? thumbnail : undefined;
}

/** Used by prerendered Astro templates: advertise only thumbnails present at build time. */
export function buildSrcset(src: string | undefined): string {
  if (!src) return '';

  const thumbnail = mobileImageFor(src);
  return thumbnail
    ? `${thumbnail} 400w, ${src} 1200w`
    : `${src} 1200w`;
}
