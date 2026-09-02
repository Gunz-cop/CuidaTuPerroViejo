import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import {
  externalLinks,
  secureExternalLinksIntegration,
} from './scripts/satteri-external-links.mjs';

import cloudflare from "@astrojs/cloudflare";

const PILLAR_PATHS = new Set([
  '/alimentacion-perros-senior',
  '/cuidados-paliativos-perros',
  '/higiene-hogar-perros-senior',
  '/movilidad-dolor-perros-mayores',
  '/salud-mental-emocional-perros',
  '/salud-perros-mayores',
]);
const PILLAR_SLUGS = new Set([...PILLAR_PATHS].map((path) => path.slice(1)));
const NON_PUBLIC_SITEMAP_PREFIXES = ['/admin/'];
// Páginas reales pero sin intención de búsqueda propia: se sirven con noindex
// y se excluyen del sitemap para que sólo contenga URLs canónicas indexables.
const NON_CANONICAL_SITEMAP_PATHS = new Set(['/gracias']);

function getSitemapMetadata(pathname) {
  const segments = pathname.split('/').filter(Boolean);

  if (pathname === '/') {
    return { changefreq: 'weekly', priority: 1.0 };
  }

  if (PILLAR_PATHS.has(pathname)) {
    return { changefreq: 'weekly', priority: 0.8 };
  }

  if (segments.length === 2 && PILLAR_SLUGS.has(segments[0])) {
    return { changefreq: 'monthly', priority: 0.6 };
  }

  return { changefreq: 'monthly', priority: 0.5 };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://cuidatuperroviejo.com',
  trailingSlash: 'never',
  build: {
    format: 'file'
  },
  integrations: [
    mdx(),
    secureExternalLinksIntegration(),
    sitemap({
      filter(page) {
        const { pathname } = new URL(page);
        if (NON_CANONICAL_SITEMAP_PATHS.has(pathname)) return false;
        return !NON_PUBLIC_SITEMAP_PREFIXES.some((prefix) => pathname.startsWith(prefix));
      },
      serialize(item) {
        const { pathname } = new URL(item.url);
        return {
          ...item,
          ...getSitemapMetadata(pathname),
        };
      },
    }),
  ],
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] })
  },
  output: 'static',
  adapter: cloudflare({
    imageService: 'passthrough',
    remoteBindings: false
  }),
  vite: {
    plugins: [tailwindcss()]
  }
});
