import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Plugin hast para conservar la política de seguridad de los enlaces externos
 * al pasar de rehype a Sätteri en Astro 7.
 *
 * El plugin solo modifica enlaces HTTP(S) que salen del dominio del sitio.
 * Los enlaces relativos y los absolutos del propio dominio siguen siendo
 * internos y no reciben target ni rel.
 */

const SITE_HOSTNAMES = new Set(['cuidatuperroviejo.com', 'www.cuidatuperroviejo.com']);

export function isExternalHttpHref(href) {
  if (typeof href !== 'string') return false;

  try {
    const url = new URL(href, 'https://cuidatuperroviejo.com');
    return (url.protocol === 'http:' || url.protocol === 'https:')
      && !SITE_HOSTNAMES.has(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

export const externalLinks = {
  name: 'cuidatuperroviejo-external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      if (!isExternalHttpHref(node.properties?.href)) return;

      ctx.setProperty(node, 'target', '_blank');
      ctx.setProperty(node, 'rel', ['noopener', 'noreferrer']);
    },
  },
};

function secureAnchorTag(tag) {
  const href = tag.match(/\bhref\s*=\s*["'](https?:\/\/[^"']+)["']/i)?.[1];
  if (!isExternalHttpHref(href)) return tag;

  let secured = tag;
  const relMatch = secured.match(/\brel\s*=\s*(["'])([^"']*)\1/i);
  const relTokens = new Set((relMatch?.[2] ?? '').split(/\s+/).filter(Boolean));
  relTokens.add('noopener');
  relTokens.add('noreferrer');
  const relValue = [...relTokens].join(' ');

  if (relMatch) {
    secured = secured.replace(relMatch[0], `rel="${relValue}"`);
  } else {
    secured = secured.replace(/^<a\b/i, '<a rel="noopener noreferrer"');
  }

  if (!/\btarget\s*=\s*["']_blank["']/i.test(secured)) {
    secured = secured.replace(/^<a\b/i, '<a target="_blank"');
  }

  return secured;
}

export function secureRenderedHtml(html) {
  return html.replace(/<a\b[^>]*>/gi, secureAnchorTag);
}

async function findHtmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findHtmlFiles(path));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(path);
    }
  }
  return files;
}

/**
 * Astro/Sätteri no recibe los anchors escritos como HTML crudo en MDX ni los
 * anchors escritos directamente en páginas Astro. Esta integración aplica la
 * misma regla al HTML final sin modificar el contenido fuente protegido.
 */
export function secureExternalLinksIntegration() {
  return {
    name: 'cuidatuperroviejo-secure-external-links',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const files = await findHtmlFiles(fileURLToPath(dir));
        await Promise.all(files.map(async (file) => {
          const html = await readFile(file, 'utf8');
          const secured = secureRenderedHtml(html);
          if (secured !== html) await writeFile(file, secured);
        }));
      },
    },
  };
}

export default externalLinks;
