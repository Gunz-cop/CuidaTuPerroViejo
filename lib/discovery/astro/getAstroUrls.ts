import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';
import type { UrlState } from '../core/types';

/**
 * Known Limitation V0:
 * Hashes are calculated from the compiled HTML file.
 * Non-functional changes introduced by the build pipeline (such as dynamic build IDs or script hashes)
 * may trigger false positive change detections even when the core article content remains identical.
 */


export async function getAstroUrls(distDir: string, siteUrl: string): Promise<UrlState[]> {
  const sitemapPath = path.join(distDir, 'sitemap-0.xml');
  let sitemapContent = '';
  try {
    sitemapContent = await fs.readFile(sitemapPath, 'utf-8');
  } catch (error: any) {
    console.log(`SDI: sitemap-0.xml not found at ${sitemapPath}. Falling back to folder scan...`);
    return scanDistDirForHtmlFiles(distDir, siteUrl);
  }

  const urls: string[] = [];
  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }

  const urlStates: UrlState[] = [];
  for (const url of urls) {
    const urlState = await getUrlStateForUrl(url, siteUrl, distDir);
    if (urlState) {
      urlStates.push(urlState);
    }
  }

  return urlStates;
}

async function getUrlStateForUrl(url: string, siteUrl: string, distDir: string): Promise<UrlState | null> {
  try {
    if (!url.startsWith(siteUrl)) {
      return null;
    }

    const relativePath = url.substring(siteUrl.length);
    let htmlFilePath = '';

    if (relativePath === '' || relativePath === '/') {
      htmlFilePath = path.join(distDir, 'index.html');
    } else {
      const pathWithIndex = path.join(distDir, relativePath, 'index.html');
      const pathWithHtml = path.join(distDir, `${relativePath}.html`);

      try {
        await fs.access(pathWithIndex);
        htmlFilePath = pathWithIndex;
      } catch {
        try {
          await fs.access(pathWithHtml);
          htmlFilePath = pathWithHtml;
        } catch {
          // If no local file matches (e.g. dynamic route), fallback to dynamic placeholder
          const hash = crypto.createHash('sha256').update(url).digest('hex');
          return {
            url,
            hash,
            lastmod: new Date().toISOString()
          };
        }
      }
    }

    const content = await fs.readFile(htmlFilePath);
    const hash = crypto.createHash('sha256').update(content).digest('hex');
    const stats = await fs.stat(htmlFilePath);
    const lastmod = stats.mtime.toISOString();

    return {
      url,
      hash,
      lastmod
    };
  } catch (error: any) {
    console.error(`SDI: Error processing URL ${url}:`, error.message);
    return null;
  }
}

async function scanDistDirForHtmlFiles(distDir: string, siteUrl: string): Promise<UrlState[]> {
  const urlStates: UrlState[] = [];

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== '_astro' && entry.name !== '_worker.js' && !entry.name.startsWith('.')) {
          await walk(fullPath);
        }
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        if (entry.name === '404.html') continue;

        let relativePath = path.relative(distDir, fullPath).replace(/\\/g, '/');
        if (relativePath === 'index.html') {
          relativePath = '';
        } else if (relativePath.endsWith('/index.html')) {
          relativePath = relativePath.substring(0, relativePath.length - 11);
        } else if (relativePath.endsWith('.html')) {
          relativePath = relativePath.substring(0, relativePath.length - 5);
        }

        const url = `${siteUrl}/${relativePath}`.replace(/\/+$/, '');
        const content = await fs.readFile(fullPath);
        const hash = crypto.createHash('sha256').update(content).digest('hex');
        const stats = await fs.stat(fullPath);
        const lastmod = stats.mtime.toISOString();

        urlStates.push({
          url,
          hash,
          lastmod
        });
      }
    }
  }

  await walk(distDir);
  return urlStates;
}
