import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import {
  AFFILIATE_PLACEMENTS,
  UNKNOWN_COUNTRY,
  classifyEnvironment,
  countryFromRequest,
  countryName,
  findPlacement,
  isSameOrigin,
  normalizeCountry,
  recordAffiliateClick,
} from '../src/lib/affiliate/clicks';

test('solo acepta ubicaciones registradas', () => {
  assert.equal(findPlacement('cama-guia-01')?.provider, 'aliexpress');
  assert.equal(findPlacement('cama-guia-99'), null);
  assert.equal(findPlacement('CAMA-GUIA-01'), null);
  assert.equal(findPlacement("cama-guia-01' OR 1=1"), null);
  assert.equal(findPlacement(42), null);
  assert.equal(findPlacement('x'.repeat(65)), null);
});

test('cada ubicación registrada existe en el HTML con un único CTA afiliado directo', () => {
  const component = readFileSync(new URL('../src/components/CamaAfiliada.astro', import.meta.url), 'utf8');
  for (const placement of AFFILIATE_PLACEMENTS.filter((item) => item.id === 'cama-guia-01')) {
    assert.match(component, new RegExp(`data-affiliate-placement="${placement.id}"`));
  }
  const links = component.match(/<a\b[^>]*>/g) ?? [];
  assert.equal(links.length, 1);
  assert.match(links[0], /href="https:\/\/s\.click\.aliexpress\.com\//);
  assert.match(links[0], /rel="sponsored noopener noreferrer"/);
  assert.doesNotMatch(links[0], /onclick|\/api\//);
});

test('normaliza el país de Cloudflare y conserva «sin determinar»', () => {
  assert.equal(normalizeCountry('mx'), 'MX');
  assert.equal(normalizeCountry(' es '), 'ES');
  assert.equal(normalizeCountry('T1'), 'T1');
  assert.equal(normalizeCountry('XX'), UNKNOWN_COUNTRY);
  assert.equal(normalizeCountry(''), UNKNOWN_COUNTRY);
  assert.equal(normalizeCountry('ESP'), UNKNOWN_COUNTRY);
  assert.equal(normalizeCountry(undefined), UNKNOWN_COUNTRY);
  assert.equal(countryName(UNKNOWN_COUNTRY), 'Sin determinar');
  assert.equal(countryName('MX'), 'México');
});

test('toma el país de request.cf y, si falta, de la cabecera', () => {
  const withCf = Object.assign(new Request('https://cuidatuperroviejo.com/api/affiliate-click'), { cf: { country: 'ES' } });
  assert.equal(countryFromRequest(withCf), 'ES');
  const withHeader = new Request('https://cuidatuperroviejo.com/api/affiliate-click', { headers: { 'cf-ipcountry': 'MX' } });
  assert.equal(countryFromRequest(withHeader), 'MX');
  assert.equal(countryFromRequest(new Request('https://cuidatuperroviejo.com/')), UNKNOWN_COUNTRY);
});

test('separa el sitio público de pruebas y vistas previas', () => {
  assert.equal(classifyEnvironment('https://cuidatuperroviejo.com/api/affiliate-click'), 'produccion');
  assert.equal(classifyEnvironment('https://www.cuidatuperroviejo.com/api/affiliate-click'), 'produccion');
  assert.equal(classifyEnvironment('https://abc123-cuidatuperroviejo.gonzalo.workers.dev/api/affiliate-click'), 'prueba');
  assert.equal(classifyEnvironment('http://localhost:4321/api/affiliate-click'), 'prueba');
  assert.equal(classifyEnvironment('no es una url'), 'prueba');
});

test('solo acepta eventos enviados desde el mismo sitio', () => {
  const url = 'https://cuidatuperroviejo.com/api/affiliate-click';
  assert.equal(isSameOrigin(new Request(url, { headers: { origin: 'https://cuidatuperroviejo.com' } })), true);
  assert.equal(isSameOrigin(new Request(url, { headers: { origin: 'https://otro.example' } })), false);
  assert.equal(isSameOrigin(new Request(url, { headers: { referer: 'https://cuidatuperroviejo.com/movilidad/cama' } })), true);
  assert.equal(isSameOrigin(new Request(url, { headers: { referer: 'https://otro.example/x' } })), false);
  assert.equal(isSameOrigin(new Request(url)), false);
});

test('registra un agregado por día, ficha, país y entorno sin datos del lector', async () => {
  const calls: { sql: string; values: unknown[] }[] = [];
  const db = {
    prepare(sql: string) {
      return {
        bind(...values: unknown[]) {
          return { run: async () => { calls.push({ sql, values }); return {}; } };
        },
      };
    },
  } as unknown as D1Database;

  const placement = findPlacement('cama-guia-01');
  assert.ok(placement);
  await recordAffiliateClick(db, { day: '2026-11-11', placement, country: 'MX', environment: 'produccion' });

  assert.equal(calls.length, 1);
  assert.match(calls[0].sql, /ON CONFLICT \(day, placement, country, environment\)/);
  assert.match(calls[0].sql, /clicks = clicks \+ 1/);
  assert.deepEqual(calls[0].values, ['2026-11-11', 'cama-guia-01', 'aliexpress', placement.page, 'MX', 'produccion']);

  await recordAffiliateClick(undefined, { day: '2026-11-11', placement, country: 'MX', environment: 'produccion' });
  assert.equal(calls.length, 1);
});
