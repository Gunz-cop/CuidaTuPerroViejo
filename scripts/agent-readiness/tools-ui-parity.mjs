#!/usr/bin/env node
// C4A-04 — paridad UI↔API en navegador real. Completa la UI de cada herramienta
// mediante clics y compara el texto visible campo a campo con la respuesta de la
// API del mismo despliegue. No requiere WebMCP. No es un test de CI: necesita un
// navegador y una URL servida (workerd local o preview).
//
// Uso: node scripts/agent-readiness/tools-ui-parity.mjs --chrome <bin> --base-url <url> --out <json> [--commit <sha>] [--api-url <url>]
// --api-url permite comparar la UI de otro despliegue (p. ej. la base legada) con la API.
import { writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { launchChrome, openPage } from './cdp.mjs';

const KEYS = ['hurt', 'hunger', 'hydration', 'hygiene', 'happiness', 'mobility', 'moreGoodDays'];
const QUALITY_PAGE = '/herramientas/calculadora-calidad-vida-perros';
const MOBILITY_PAGE = '/herramientas/selector-movilidad-perros-mayores';
const SITE = 'https://cuidatuperroviejo.com';
const squash = (value) => value.replace(/\s+/gu, ' ').trim();

// Vectores fijos: extremos, fronteras 34/35/36/49/50/51 (D33), combinaciones mixtas y 20 con semilla fija.
function qualityVectors() {
  const fixed = [
    [0, 0, 0, 0, 0, 0, 0], [10, 10, 10, 10, 10, 10, 10], [4, 5, 5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5], [6, 5, 5, 5, 5, 5, 5],
    [10, 10, 10, 10, 9, 0, 0], [10, 10, 10, 10, 10, 0, 0], [10, 10, 10, 10, 10, 1, 0], [0, 0, 0, 0, 0, 0, 10], [10, 0, 10, 0, 10, 0, 10],
  ];
  let seed = 4242;
  const random = () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  for (let i = 0; i < 20; i += 1) fixed.push(KEYS.map(() => Math.floor(random() * 11)));
  return fixed;
}

const QUALITY_UI = (values) => `(async () => {
  const values = ${JSON.stringify(values)};
  document.getElementById('qol-start').click();
  for (const value of values) {
    const chip = [...document.querySelectorAll('#qol-q-chips button')].find((b) => b.textContent === String(value));
    chip.click();
  }
  const text = (el) => el ? el.textContent : null;
  const cta = document.getElementById('qol-cta-pilar');
  const anchor = cta.querySelector('a');
  return {
    resultVisible: !document.getElementById('qol-result').classList.contains('off'),
    score: text(document.getElementById('qol-result-score')),
    interpretation: text(document.getElementById('qol-interpretation')),
    message: text(document.getElementById('qol-human-msg')),
    recommendation: text(document.getElementById('qol-recommendation')),
    breakdown: [...document.querySelectorAll('#qol-breakdown > div')].map((row) => [...row.children].map((c) => c.textContent)),
    guideVisible: getComputedStyle(cta).display !== 'none',
    guideLabel: anchor.textContent, guideHref: anchor.href,
    notices: [text(document.querySelector('#qol-result-box > p.font-light')), text(document.querySelector('#qol-result > .qol-anti-guilt'))],
  };
})()`;

const MOBILITY_UI = (levelIndex, handlingIndex) => `(async () => {
  document.getElementById('m5start').click();
  document.querySelectorAll('#m5oo1 > button')[${levelIndex}].click();
  document.querySelectorAll('#m5oo2 > button')[${handlingIndex}].click();
  const text = (id) => document.getElementById(id).textContent;
  const alert = document.getElementById('m5alert');
  const squash = (v) => v.replace(/\\s+/gu, ' ').trim();
  // alertItemText de contratos F4A §1.2 sobre el DOM visible.
  const item = (li) => {
    const span = [...li.children].find((c) => c.tagName === 'SPAN');
    const rest = [...li.childNodes].filter((n) => n !== span && n.nodeName !== 'A').map((n) => n.textContent).join('');
    const a = li.querySelector(':scope > a');
    return { text: squash(span.textContent) + ' ' + squash(rest), link: a ? { label: squash(a.textContent), url: a.href } : null };
  };
  const s3 = document.getElementById('m5s3');
  const guide = s3.querySelector('a[href="/movilidad-dolor-perros-mayores"]');
  const paragraphs = [...s3.children].filter((c) => c.tagName === 'P');
  return {
    resultVisible: !s3.classList.contains('off'),
    icon: text('m5rico'), badge: text('m5rbadge'), title: text('m5rtit'), description: text('m5rdesc'),
    plan: [...document.querySelectorAll('#m5prods > div')].map((card) => { const body = card.children[1]; return { name: body.children[0].textContent, why: body.children[1].textContent, links: body.querySelectorAll('a').length }; }),
    alertVisible: !alert.classList.contains('off'),
    alert: { title: squash(alert.children[0].textContent), items: [...alert.querySelectorAll(':scope > ul > li')].map(item) },
    guide: { label: squash(guide.textContent), url: guide.href },
    notice: squash(paragraphs[paragraphs.length - 1].textContent),
  };
})()`;

const absolute = (href, base) => SITE + new URL(href, base).pathname;

function compareQuality(ui, api, base) {
  const problems = [];
  const expect = (name, actual, wanted) => { if (JSON.stringify(actual) !== JSON.stringify(wanted)) problems.push({ field: name, ui: actual, api: wanted }); };
  expect('resultVisible', ui.resultVisible, true);
  expect('score', ui.score, String(api.score));
  expect('interpretation', squash(ui.interpretation), api.interpretation);
  expect('message', squash(ui.message), api.message);
  expect('recommendation', squash(ui.recommendation), api.recommendation);
  expect('breakdown', ui.breakdown.map(([label, value]) => [squash(label), value]), api.breakdown.map((row, i) => [`${['❤️', '🍖', '💧', '✨', '🐕', '🐾', '☀️'][i]} ${row.label}`, `${row.value}/${row.max}`]));
  expect('guideVisible', ui.guideVisible, api.guide !== null);
  if (api.guide) { expect('guideLabel', squash(ui.guideLabel), api.guide.label); expect('guideUrl', absolute(ui.guideHref, base), api.guide.url); }
  expect('notices', ui.notices.map(squash), api.notices);
  return problems;
}

function compareMobility(ui, api, base) {
  const problems = [];
  const expect = (name, actual, wanted) => { if (JSON.stringify(actual) !== JSON.stringify(wanted)) problems.push({ field: name, ui: actual, api: wanted }); };
  expect('resultVisible', ui.resultVisible, true);
  for (const field of ['icon', 'badge', 'title', 'description']) expect(field, ui[field], api[field]);
  expect('plan', ui.plan.map(({ name, why }) => ({ name, why })), api.plan);
  expect('affiliateLinksShown', ui.plan.reduce((n, p) => n + p.links, 0), 0);
  expect('alertVisible', ui.alertVisible, api.palliativeAlert !== null);
  if (api.palliativeAlert) expect('palliativeAlert', { title: ui.alert.title, items: ui.alert.items.map((i) => ({ text: i.text, link: i.link && { label: i.link.label, url: absolute(i.link.url, base) } })) }, api.palliativeAlert);
  expect('guide', { label: ui.guide.label, url: absolute(ui.guide.url, base) }, api.guide);
  expect('notice', [ui.notice], api.notices);
  return problems;
}

async function main() {
  const { values } = parseArgs({ options: { chrome: { type: 'string' }, 'base-url': { type: 'string' }, out: { type: 'string' }, commit: { type: 'string' }, 'api-url': { type: 'string' } } });
  if (!values.chrome || !values['base-url'] || !values.out) { process.stderr.write('Uso: tools-ui-parity.mjs --chrome <bin> --base-url <url> --out <json> [--commit <sha>]\n'); return 3; }
  const base = values['base-url'].replace(/\/$/u, '');
  const apiBase = (values['api-url'] ?? base).replace(/\/$/u, '');
  const browser = await launchChrome(values.chrome);
  const cases = [];
  try {
    const { product } = await browser.send('Browser.getVersion');
    const page = await openPage(browser, { allowOrigin: new URL(base).origin });
    for (const vector of qualityVectors()) {
      await page.goto(base + QUALITY_PAGE);
      const ui = await page.evaluate(QUALITY_UI(vector));
      const query = KEYS.map((key, i) => `${key}=${vector[i]}`).join('&');
      const response = await fetch(`${apiBase}/api/agent/v1/tools/calidad-vida?${query}`);
      const api = await response.json();
      cases.push({ tool: 'calidad-vida', input: vector, status: response.status, score: api.score, band: api.band, problems: response.status === 200 ? compareQuality(ui, api, base) : [{ field: 'status', api: response.status }] });
    }
    const levels = ['light', 'moderate', 'severe'];
    const handling = ['calm', 'stressed'];
    for (let l = 0; l < levels.length; l += 1) for (let h = 0; h < handling.length; h += 1) {
      await page.goto(base + MOBILITY_PAGE);
      const ui = await page.evaluate(MOBILITY_UI(l, h));
      const response = await fetch(`${apiBase}/api/agent/v1/tools/movilidad?level=${levels[l]}&handling=${handling[h]}`);
      const api = await response.json();
      cases.push({ tool: 'movilidad', input: { level: levels[l], handling: handling[h] }, status: response.status, resultKey: api.resultKey, problems: response.status === 200 ? compareMobility(ui, api, base) : [{ field: 'status', api: response.status }] });
    }
    const pass = cases.every((entry) => entry.problems.length === 0);
    const report = { schemaVersion: 'f4a-ui-parity/1', criterion: 'C4A-04', commit: values.commit ?? null, baseUrl: base, apiUrl: apiBase, browser: product, cases: cases.length, failures: cases.filter((c) => c.problems.length).length, pass, results: cases };
    await writeFile(values.out, `${JSON.stringify(report, null, 2)}\n`);
    process.stdout.write(`${pass ? 'PASS' : 'FAIL'}: ${cases.length} casos UI↔API (${report.failures} con diferencias) en ${product}.\n`);
    return pass ? 0 : 2;
  } finally { await browser.close(); }
}

process.exitCode = await main();
