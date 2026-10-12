import { launchChrome, openPage } from '../../../../../scripts/agent-readiness/cdp.mjs';
for (const args of [[], ['--disable-field-trial-config'], ['--disable-field-trial-config', '--enable-features=WebMCPTesting']]) {
  const b = await launchChrome(process.argv[2], args);
  const p = await openPage(b);
  await p.goto(process.argv[3]);
  await new Promise((r) => setTimeout(r, 800));
  const r = await p.evaluate("(async () => ({ api: typeof document.modelContext, tools: document.modelContext ? (await document.modelContext.getTools()).map(t => t.name) : null }))()");
  console.log(JSON.stringify(args), JSON.stringify(r));
  await b.close();
}
