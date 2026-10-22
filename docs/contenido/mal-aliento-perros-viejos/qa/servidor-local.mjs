// Sirve exclusivamente los assets compilados para revisar el artículo localmente.
// No ejecuta despliegues ni sustituye las pruebas del Worker.
import http from 'node:http';
import path from 'node:path';
import { readFile, stat } from 'node:fs/promises';
const root = path.resolve('dist/client');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.woff2': 'font/woff2', '.xml': 'application/xml', '.wasm': 'application/wasm' };
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const base = path.resolve(root, `.${pathname}`);
    if (base !== root && !base.startsWith(`${root}${path.sep}`)) throw Error('outside');
    let file;
    for (const candidate of [base, `${base}.html`, path.join(base, 'index.html')]) {
      try { if ((await stat(candidate)).isFile()) { file = candidate; break; } } catch {}
    }
    if (!file) { response.writeHead(404); response.end('Not found'); return; }
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(await readFile(file));
  } catch { response.writeHead(400); response.end('Bad request'); }
}).listen(4321, '127.0.0.1', () => console.log('Revisión local del build: http://127.0.0.1:4321'));
