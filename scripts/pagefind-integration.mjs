// Índice de búsqueda del sitio (Pagefind), generado dentro de `astro build`.
//
// Va como integración y no como script npm `postbuild`: ese hook se eliminó a
// propósito (ver AGENTS.md) y el CI compila con `npx astro build`, así que lo
// que no ocurra dentro del build no ocurre.
//
// Solo se indexan las páginas que marcan su contenido con `data-pagefind-body`
// (artículos, pilares y herramientas). El resto del sitio —políticas, contacto,
// admin, confirmaciones— queda fuera del buscador sin lista de exclusión.
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { readdir, rm } from 'node:fs/promises';

/** Pagefind cuenta las páginas HTML que recorre. Por debajo de esto el build está roto. */
const MIN_INDEXED_PAGES = 20;

/**
 * `zxx` («sin contenido lingüístico») desactiva el lematizador de Pagefind a
 * propósito. El de español reduce «cama» a «cam», y como Pagefind busca por
 * prefijo, «camas» acababa resaltando «cambiar» y «cambios» en las 36 páginas.
 * Sin lematizador el índice guarda las palabras tal cual (sí normaliza tildes)
 * y el plural se resuelve en el navegador: ver `toIndexQuery` en
 * `src/lib/site-search.ts`.
 */
const INDEX_LANGUAGE = 'zxx';

export function pagefindIntegration() {
  let config;
  return {
    name: 'site-search-pagefind',
    hooks: {
      'astro:config:done': ({ config: resolvedConfig }) => { config = resolvedConfig; },
      'astro:build:done': async ({ logger }) => {
        if (!config?.build?.client) throw new Error('No se resolvió config.build.client para generar el índice de búsqueda.');
        const assetRoot = fileURLToPath(config.build.client);
        const pagefind = await import('pagefind');
        try {
          const { index, errors: createErrors } = await pagefind.createIndex({ forceLanguage: INDEX_LANGUAGE });
          if (!index || createErrors.length > 0) throw new Error(`Pagefind no pudo crear el índice: ${createErrors.join('; ')}`);

          const { page_count: pageCount, errors: indexErrors } = await index.addDirectory({ path: assetRoot });
          if (indexErrors.length > 0) throw new Error(`Pagefind falló al indexar: ${indexErrors.join('; ')}`);
          if (pageCount < MIN_INDEXED_PAGES) {
            throw new Error(`Pagefind solo recorrió ${pageCount} páginas (mínimo ${MIN_INDEXED_PAGES}).`);
          }

          const { errors: writeErrors } = await index.writeFiles({ outputPath: join(assetRoot, 'pagefind') });
          if (writeErrors.length > 0) throw new Error(`Pagefind no pudo escribir el índice: ${writeErrors.join('; ')}`);
          // El sitio trae su propia interfaz (SiteSearch.astro): las de Pagefind sobran.
          const unused = (await readdir(join(assetRoot, 'pagefind'))).filter((name) => /^pagefind-(ui|modular-ui|component-ui|highlight)\./.test(name));
          await Promise.all(unused.map((name) => rm(join(assetRoot, 'pagefind', name))));
          logger.info(`Índice de búsqueda generado: ${pageCount} páginas.`);
        } finally {
          await pagefind.close();
        }
      },
    },
  };
}
