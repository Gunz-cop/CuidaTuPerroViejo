# Bug71: native HTML build baselines

**State: READY_FOR_INDEPENDENT_AUDIT_NOT_ACCEPTED.** The proposed plan remains inactive and blocked. No product code, helper code, build, Workerd run, or new HTTP request was performed for this package.

## Scope

An exhaustive offline comparison of all 1,284 planned expectations found three static native HTML GET digests that referred to the previous accepted build. The d2bd build changes the linked CSS filename from `BaseLayout.gPuLvWrC.css` to `BaseLayout.DiuOmqqC.css`; replacing that one literal in each previous page reproduces the current page bytes exactly. No other static digest differs.

The plan changes only `expected.bodySha256` for `/gracias`, `/politica-de-cookies`, and `/politica-de-privacidad`, plus the descriptor for chunk 038 and plan delivery metadata. The three new values match the already completed d2bd build. All 1,284 IDs, routes, methods, headers, ordering, dependencies, groups, budgets, and the other 42 chunks are preserved.

Only `/gracias` was previously requested and its retained production capture is replayed offline against the updated expectation. The cookie and privacy pages were not requested; their current bytes come from the exact build and do not represent HTTP captures.

## Verification

The private exhaustive inventory compared all static digests with the existing 58-file build manifest and audited runtime error literals. It found no other static mismatch. Focused tests verify the three current and historical files, reject stale or altered bytes, and replay the retained `/gracias` STOP without transport. Existing bug70 regressions and a 1,284-ID transport-mocked plan simulation are also rerun with explicitly synthetic fixtures.

The helper source and its three fragments are byte-exact copies of the accepted bug70 R2 runner. No helper modification was needed. The 58-file build manifest is unchanged. See [plan-change-summary.json](plan-change-summary.json), [native-html-baseline-manifest.json](native-html-baseline-manifest.json), and [test-results/offline-test-summary.json](test-results/offline-test-summary.json).

## Gate and provenance

The plan has `ownerAuthorized: false`, `executionBlocked: true`, and no authorization receipt. The public files are a curated projection; full build assets and the prior raw `/gracias` capture remain in the private audit bundle. The package omits full response traces, raw operational indexes, credentials, cookies, and compiled private configuration.
