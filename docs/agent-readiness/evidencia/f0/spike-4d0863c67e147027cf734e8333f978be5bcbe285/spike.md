# F0 isolated spike: P1–P4

This is an exploratory result, not the permanent site runtime and not acceptance of F0. It is tied to base `4dced4155788af926ef7b4e3d2d7e8259e1978be` and spike commit `4d0863c67e147027cf734e8333f978be5bcbe285` on `agent-ready/f0-spike`. The working tree is clean. `spike.patch` contains the complete, self-contained diff against the base; the generated outputs and preview report are in `evidence/`.

The installed versions are Astro 7.2.10, `@astrojs/cloudflare` 14.2.6, Wrangler 4.128.0, Node 24.19, and parse5 7.3.0 already present transitively in the lockfile. No package files or dependencies changed. The adapter’s installed `dist/utils/handler.js` exports `handle(request, env, context)`; its declaration exports the corresponding typed `handle`. The source `src/worker.ts` uses that public handler. Astro’s build compiles that custom entrypoint into `dist/server/entry.mjs` (`//#region src/worker.ts`, default export `worker_entry_default`). The generated `dist/server/wrangler.json` is the effective Wrangler configuration for local preview: `main: "entry.mjs"`, assets under `../client`, and worker-first patterns from the source config. Running Wrangler directly against the source `wrangler.jsonc` bypasses Astro’s Vite aliases; use the generated config after the explicit Astro build.

The source Wrangler configuration contains only the Assets binding, no remote resource bindings, and sets the adapter option `remoteBindings: false`. Astro’s generated config adds its default `SESSION` KV binding, with no namespace ID. Wrangler types generated from that effective config show only `SESSION: KVNamespace` and `ASSETS: Fetcher`; there is no AI, contact, D1, email, or rate-limit binding. Preview ran with Wrangler’s explicit `--local` mode, which disables remote bindings. It did not use Cloudflare credentials, call the evaluator, call `/api/ask`, submit forms, deploy, or invoke write APIs. The one API path requested was the static `/api/assistant-catalog.json` catalogue.

## P1 — Worker entry and delegation

The source config sets `main: "src/worker.ts"` and `assets.run_worker_first` to `/`, the exact Cushing page, `/api/*`, and `/admin/*`. The local diagnostic header `X-F0-Worker-Path: worker-first` is attached only when the request host is loopback. HTML delegates to the adapter handler and the two Markdown samples are fetched from static Assets paths. In the final preview, the home and Cushing HTML and Markdown each returned 200 with the expected MIME and `Vary: Accept`; the static assistant catalogue returned 200 `application/json` (76,467 bytes). The effective configuration, including the generated local `SESSION` binding, is preserved in `evidence/effective-wrangler.json`.

## P2 — Build output hook

The local Astro integration listens to `astro:build:done`, reads the rendered files from Astro’s resolved `build.client` directory (`dist/client/` in this build), and writes exactly two Markdown samples and an index under `agent-content/v1/`. It also records a parity manifest for the seven selected HTML pages. It does not use a postbuild script and does not notify any indexing service.

The successful explicit `npx --no-install astro build` from the final clean spike SHA exited 0 and generated both samples from rendered HTML. A negative run from `f9b72539c3c55242f0526ffdb2160a28815a651e`, with `F0_FAIL_GENERATOR=1`, exited 1 from `astro:build:done` with `F0_GENERATOR_FAILURE`; no indexing hook ran. The generator and build configuration did not change after that negative run. Wrangler dry-run packaged 329 assets including the generated Markdown and index. The dry-run was on the prior spike code SHA `f9b72539c3c55242f0526ffdb2160a28815a651e`; the later validator-only change left the build hook, generated assets, and binding config unchanged. It was a dry-run only, not an upload.

## P3 — Negotiation, validators, and cache layers

The preview verification ran 40 checks. It exercised missing Accept, `*/*`, explicit HTML and Markdown, q weights, q=0 with wildcards, specificity, tie-to-HTML, unsupported media, invalid q, GET/HEAD, both HTML↔Markdown alternation orders repeated, same-representation validators, crossed validators in both directions, missing route, legacy redirect, fake Authorization, visitor queries, Cushing HTML/Markdown, and the static assistant catalogue. Both variants have different body hashes, MIME values, and ETags. Same-representation conditionals returned 304 without a body; crossed validators returned 200 with the requested representation. HEAD returned 200 with no body. The missing route stayed 404 and the legacy path stayed 301 with its original Location.

The adapter handler serves these prerendered HTML routes from Assets before Astro middleware runs. Accordingly, `X-Edge-Cache` was absent on every tested response: this is not a Cache API HIT or MISS demonstration. The existing middleware cache code in the spike uses a synthetic internal HTML key that drops visitor query parameters. Markdown uses its separate static asset path and does not enter that middleware cache. The preview confirms representation isolation and query-stable static bodies, but does not exercise a hot Cache API entry for these static routes. CDN cache behavior is unverified locally and requires a separate F2 preview against Cloudflare’s edge. No HIT was fabricated.

The first final-code preview attempt reused port 8787 while an earlier Wrangler child still held it; the resulting 404 came from the wrong listener and was discarded. The corrected preview ran on `127.0.0.1:8791`. An earlier validator check found the adapter’s `matchStaticAsset()` passes a URL string to `ASSETS.fetch()` and therefore drops `If-None-Match`. The spike now evaluates each response’s own ETag after delegation; final preview proved same-representation 304 and cross-representation 200 in both directions. Both observations are retained in `evidence/run-summary.json`.

## P4 — DOM selection

The parity manifest extracts the H1 separately from the selected content root, which preserves pillar and article titles that sit outside `main`. It retains AlertBox `aside` content and closed `<details>` FAQ question/answer text, and records external links with their original hrefs, including query strings and DOI/PMID URLs. It excludes `nav`, scripts, styles, iframes, ad slots, feedback widgets, mobile navigation, and table-of-contents asides. The seven fixture SHA-256 values, selectors, warning counts, FAQ counts, external-link counts, and sentinel outcomes are in `evidence/parity-manifest.json`; external-link counts are not a semantic classification of every link as a citation.

| Page | Selector proposal | H1 location | Sentinels |
|---|---|---|---|
| `/` | `#main-content` | inside selected root | H1 and visible editorial sections |
| `/salud-perros-mayores` | `.health-main` plus separate `.health-hero h1` | outside main | H1, rendered warning and FAQ text |
| `/herramientas` | first `main` plus separate first H1 | outside main | H1 and rendered tool explanations |
| Cushing article | `main article` | in article header | `Señales de Alarma Médica Inmediata`; `Seguridad de Medicación y Riesgo de Crisis Addisoniana` |
| Fecal incontinence | `main article` | in article header | `Señales de alarma`; `Seguridad de manejo y medicación` |
| Quality of life calculator | `main` | inside main | H1, FAQ and sources |
| Mobility selector | `main` | inside main | corrected H1, FAQ and sources |

The emitted `.md` bodies are compact text samples for routing and packaging proof, not the final Markdown projection. F2 must choose the production serializer and exact link/list/table/FAQ formatting from the DOM evidence.

## Reproduction

Run from a clean checkout of the exact spike commit with its existing `node_modules`; all output paths must be new.

```bash
F0_FAIL_GENERATOR=1 ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f0-config npm_config_cache=/tmp/ctpv-f0-npm-cache npx --no-install astro build
F0_SOURCE_COMMIT=4d0863c67e147027cf734e8333f978be5bcbe285 ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f0-config npm_config_cache=/tmp/ctpv-f0-npm-cache npx --no-install astro build
ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f0-config npm_config_cache=/tmp/ctpv-f0-npm-cache npx --no-install wrangler types /tmp/ctpv-f0-spike-compiled-types.d.ts --config dist/server/wrangler.json --strict-vars=false --include-runtime=true
ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f0-config npm_config_cache=/tmp/ctpv-f0-npm-cache npx --no-install wrangler deploy --dry-run --config dist/server/wrangler.json --outdir /tmp/ctpv-f0-spike-dry-run
ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/ctpv-f0-config npm_config_cache=/tmp/ctpv-f0-npm-cache npx --no-install wrangler dev --local --config dist/server/wrangler.json --ip 127.0.0.1 --port 8791 --persist-to /tmp/ctpv-f0-spike-state --show-interactive-dev-session=false
node scripts/f0-spike/verify-preview.mjs --origin http://127.0.0.1:8791 --out /tmp/ctpv-f0-spike-preview.json
```

The first build is intentionally expected to exit 1; run the successful build after it. Start preview only after the successful build; run the verifier while Wrangler is serving. The generated config exposes `SESSION` only to local preview. The CDN is outside this test boundary. Astro’s current custom Worker guidance documents `main: ./src/worker.ts` and the `@astrojs/cloudflare/handler` export: [Astro Cloudflare adapter guide](https://docs.astro.build/en/guides/integrations-guide/cloudflare/#changed-custom-entrypoint-api). The installed 14.2.6 export and types were checked directly; no adapter or Astro upgrade was made.
