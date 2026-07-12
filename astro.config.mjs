import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

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
    tailwind(),
    mdx(),
    sitemap({
      filter(page) {
        const { pathname } = new URL(page);
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
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer']
        }
      ]
    ]
  },
  output: "hybrid",
  adapter: cloudflare({
    imageService: 'passthrough'
  })
});
