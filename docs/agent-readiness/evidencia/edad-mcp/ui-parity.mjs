#!/usr/bin/env node
// Paridad UI ↔ MCP remoto de calculate_dog_age: completa la calculadora real
// en Chromium y compara lo visible con structuredContent del MCP del mismo origen.
// Uso: NODE_PATH=<playwright> node ui-parity.mjs <base-url> <chromium> <salida.json>
import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
const { chromium } = createRequire(import.meta.url)('playwright');
const [base, executablePath, out] = process.argv.slice(2);
const cases = [
  { size: 'medium', years: 0, months: 1 },
  { size: 'small', years: 11, name: 'Luna' },
  { size: 'medium', years: 12, name: 'Dakota' },
  { size: 'giant', years: 10 },
  { size: 'large', years: 1, months: 6 },
];
async function mcp(args) {
  const body = { jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'calculate_dog_age', arguments: args, _meta: { 'io.modelcontextprotocol/protocolVersion': '2026-07-28', 'io.modelcontextprotocol/clientCapabilities': {} } } };
  const r = await fetch(`${base}/api/mcp`, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'MCP-Protocol-Version': '2026-07-28', 'Mcp-Method': 'tools/call', 'Mcp-Name': 'calculate_dog_age' } });
  const text = await r.text(); const data = text.split('\n').find((l) => l.startsWith('data:'));
  return JSON.parse(data ? data.slice(5) : text).result.structuredContent;
}
const browser = await chromium.launch({ executablePath });
const results = [];
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.goto(`${base}/herramientas/calculadora-edad-perro`);
  for (const input of cases) {
    await page.locator(`input[name="size"][value="${input.size}"]`).check({ force: true });
    await page.fill('#dat-name', input.name ?? '');
    await page.$eval('#dat-years', (el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, input.years);
    if (input.years < 2) await page.selectOption('#dat-months', String(input.months ?? 0));
    await page.waitForTimeout(800);
    const ui = await page.evaluate(() => ({
      human: Number(getComputedStyle(document.querySelector('.dat')).getPropertyValue('--num')),
      stage: document.querySelector('.dat').dataset.stage,
      stageLabel: document.getElementById('dat-stage').textContent,
      advice: document.getElementById('dat-advice').textContent,
      epi: document.getElementById('dat-epi').textContent,
      guide: document.getElementById('dat-guide').getAttribute('href'),
      guideLabel: document.getElementById('dat-guide').textContent,
      sr: document.getElementById('dat-sr').textContent,
    }));
    const tool = await mcp(input);
    const expected = {
      human: tool.human_years, stage: tool.stage.id, stageLabel: tool.stage.label, advice: tool.message.slice(tool.message.indexOf('. ') + 2),
      epi: tool.epigenetic_years === null ? 'Fuera de rango' : `${tool.epigenetic_years} años`,
      guide: new URL(tool.recommended_action.url).pathname, guideLabel: tool.recommended_action.label,
      sr: `${input.name ?? 'Tu perro'} tiene el equivalente a ${tool.human_years} años humanos. Etapa: ${tool.stage.label}.`,
    };
    const ok = JSON.stringify(ui) === JSON.stringify(expected);
    results.push({ input, ok, ui, ...(ok ? {} : { expected }) });
  }
} finally { await browser.close(); }
const pass = results.every((r) => r.ok);
await writeFile(out, `${JSON.stringify({ schemaVersion: 'edad-mcp-ui-parity/1', baseUrl: base, browser: executablePath, pass, results }, null, 2)}\n`);
process.stdout.write(`${pass ? 'PASS' : 'FAIL'}: ${results.filter((r) => r.ok).length}/${results.length}\n`);
process.exit(pass ? 0 : 2);
