# Bug70: integrity of the canonical HTML exterior

**State: READY_FOR_INDEPENDENT_AUDIT_NOT_ACCEPTED.** The proposed plan is inactive and blocked. No new public request, build, Workerd run, Wrangler command, or product edit was performed for this package.

## Scope

This package addresses the exact HTML response mismatch recorded by the closed production STOP. It binds the expected canonical HTML bytes to the independent d2bd build artifacts, then validates the observed decoded entity `E` against only these forms:

- `E = A`, where `A` is the exact build file for that canonical route.
- `E = A[:p] + I + A[p:]`, where `I` is the fixed 367-byte authorized insertion and `p` is immediately before the only literal `</body>` in `A`.

The fragment bytes remain private. The public plan and test receipts publish its byte count and SHA-256 only. The validator keeps the actual wire and decoded body sizes and hashes from the response; `htmlExteriorCheck` is an additional comparison record, not a replacement value.

The independent artifact manifest covers 58 exact build outputs: 28 HTML assets, 28 Markdown assets, the content index, and the CSS file. It is bound to source `d2bd342050811d41ee212730cb11fe07783994bd` and tree `666f95273609ca67da8a508390c3acf9a141f8ca`. The full source inputs, recipe, compiled Wrangler configuration, insertion bytes, and matching 58-file manifest are retained privately for audit.

## Plan

The proposed plan keeps 1,284 unique request IDs, the original 43 chunks, request ordering, dependencies, and group budgets. Its only request-path changes are the GET and HEAD for `/_astro/BaseLayout.DiuOmqqC.css`. It updates HTML artifact hashes for the current build and preserves all Markdown expectations byte-for-byte from the accepted bug69 plan. See [plan-change-summary.json](plan-change-summary.json).

The published plan has `ownerAuthorized: false`, `executionBlocked: true`, and no authorization receipt. The runner refuses `--execute` before creating an output directory while this gate remains inactive.

R2 addresses the two implementation blockers from review R1: alternation responses now preserve the real decoded entity against the same route/representation/coding baseline as well as preserving the existing ETag checks, and `expectedExteriorBytes`/`expectedExteriorSha256` describe the selected `A` or `A+I` form. See [review-fix-summary.json](review-fix-summary.json) for the bounded change and regression cases.

## Offline evidence

The source suite ran 38 tests successfully. It includes a transport-mocked pass through the actual `run_one` and `validate_response` functions for all 1,284 IDs, codec cases, STOP preservation, and an HTML Accept-selected row with no planned body hash. That row still rejects a body outside `A` and `A+I`. Regressions also prove that conditional 200 responses and alternations preserve the actual decoded entity within the same context, even when the response has no ETag, and that both exterior alternatives report their own expected byte count and hash.

The suite also replays the already-retained failed production GET through the new validator without transport. Its 127,017-byte decoded body matches `A+I` for the independent d2bd article asset. This is a local replay of the old STOP capture; it does not change the STOP result or claim a new production acceptance.

The complete synthetic protocol receipt and original STOP response remain in the private audit bundle. The public [offline-test-summary.json](offline-test-summary.json) reports only curated counts and hashes.

## Provenance and limits

The public artifact manifest and plan chunks are UTF-8 files no larger than 24 KiB each. The CSS fixture is split into UTF-8-safe parts and is labeled as local build bytes, not an HTTP response. The gzip Markdown fixture is base64 transport data. The private bundle preserves the original build inputs and full historical capture; this package does not publish response traces, request URLs, credentials, cookies, beacon content, full compiled configuration, or operational N/A ID lists.

Runner lineage: accepted bug69 helper, copied into this ownership folder and changed only for bug70’s independent build-asset binding, exact exterior comparison, current CSS path, and inactive execution gate. It does not change product code, configuration, dependencies, stack, SDD, or runtime behavior.
