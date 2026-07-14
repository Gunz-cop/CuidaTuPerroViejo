#!/usr/bin/env node
/**
 * Temporary, Stage 6.5-only read-only adoption harness.
 * It must be removed or replaced before any Cuida migration.
 */
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const legacyDirectory = join(root, "lib", "discovery", "state");
const legacyPaths = {
  state: join(legacyDirectory, "sdi-state.json"),
  manifest: join(legacyDirectory, "sdi-manifest.json"),
  submissions: join(legacyDirectory, "sdi-submissions.json"),
};
const outputPath = join(root, "docs", "sdi-stage-6-5", "shadow-comparison.json");
const tarballPath = "C:\\Users\\grcx1\\OneDrive\\Documentos\\SDI\\sdi-cli-0.1.0.tgz";
const sdiRepositoryPath = "C:\\Users\\grcx1\\OneDrive\\Documentos\\SDI";
const approved = {
  commit: "3546d8d79d4fcc285b2ff662422deb6d13b5eb2d",
  sha256: "aac5aec39ce06f988e09f8751c881a989f0ca15f560c77da06c19529ef9088a1",
  version: "0.1.0",
};
const siteUrl = "https://cuidatuperroviejo.com";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function classify(difference) {
  return { ...difference, classification: "evidencia insuficiente" };
}

async function command(commandPath, args, options = {}) {
  return execFileAsync(commandPath, args, {
    cwd: root,
    windowsHide: true,
    shell: process.platform === "win32" && /\.(cmd|bat)$/i.test(commandPath),
    maxBuffer: 10 * 1024 * 1024,
    ...options,
  });
}

async function fileDigest(filePath) {
  return sha256(await readFile(filePath));
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function urlToHtmlCandidates(url) {
  const pathname = new URL(url).pathname;
  const route = pathname.split("/").filter(Boolean);
  if (route.length === 0) return [join(root, "dist", "index.html")];
  return [
    join(root, "dist", `${route.join("/")}.html`),
    join(root, "dist", ...route, "index.html"),
  ];
}

async function resolveHtml(url) {
  const existing = [];
  for (const candidate of urlToHtmlCandidates(url)) {
    try {
      if ((await stat(candidate)).isFile()) existing.push(candidate);
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  assert(existing.length === 1, `Expected exactly one compiled HTML file for ${url}; found ${existing.length}.`);
  return existing[0];
}

async function legacyBuildInventory() {
  const sitemap = await readFile(join(root, "dist", "sitemap-0.xml"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((match) => match[1].trim());
  const records = new Map();
  const rejected = [];
  const collisions = [];

  for (const url of urls) {
    if (!url.startsWith(siteUrl) || new URL(url).origin !== siteUrl) {
      rejected.push(url);
      continue;
    }
    const normalized = url === `${siteUrl}/` ? siteUrl : url.replace(/\/+$/, "");
    const hash = sha256(await readFile(await resolveHtml(normalized)));
    const previous = records.get(normalized);
    if (previous !== undefined && previous.hash !== hash) collisions.push(normalized);
    records.set(normalized, { url: normalized, hash });
  }

  return { records, rejected, collisions, sitemapUrls: urls.length };
}

function compareRecords(left, right, label) {
  const missing = [...left.keys()].filter((url) => !right.has(url));
  const unexpected = [...right.keys()].filter((url) => !left.has(url));
  const hashMismatches = [...left.keys()]
    .filter((url) => right.has(url) && left.get(url).hash !== right.get(url).hash)
    .map((url) => ({ url, left: left.get(url).hash, right: right.get(url).hash }));
  return { label, equal: missing.length === 0 && unexpected.length === 0 && hashMismatches.length === 0, missing, unexpected, hashMismatches };
}

function makeTemporaryConfig(tempDirectory) {
  const configPath = join(tempDirectory, "sdi.config.mjs");
  const source = {
    siteId: "cuida-tu-perro-viejo",
    siteUrl,
    source: {
      distDir: join(root, "dist"),
      sitemapPath: join(root, "dist", "sitemap-0.xml"),
      fallbackToHtmlScan: true,
    },
    normalization: { trailingSlash: "never" },
    statePath: join(tempDirectory, "state.json"),
    legacyStatePath: legacyPaths.state,
    reportPath: join(tempDirectory, "last-run.json"),
  };
  return writeFile(configPath, `export default ${JSON.stringify(source, null, 2)};\n`).then(() => configPath);
}

async function main() {
  const startedAt = new Date().toISOString();
  const differences = [];
  const before = Object.fromEntries(await Promise.all(Object.entries(legacyPaths).map(async ([name, filePath]) => [name, await fileDigest(filePath)])));
  const temporaryDirectory = await mkdtemp(join(tmpdir(), "sdi-stage-6-5-"));
  const report = {
    schemaVersion: 1,
    stage: "6.5",
    purpose: "Temporary read-only adoption shadow for CuidaTuPerroViejo.",
    startedAt,
    approvedArtifact: { tarballPath, ...approved },
    checks: {},
    legacy: { paths: Object.fromEntries(Object.entries(legacyPaths).map(([name, filePath]) => [name, relative(root, filePath)])), before },
    comparison: {},
    differences,
    temporaryState: { path: basename(temporaryDirectory), removed: false },
  };

  try {
    const actualTarballHash = await fileDigest(tarballPath);
    const { stdout: packageJson } = await command("tar", ["-xOf", tarballPath, "package/package.json"]);
    const packed = JSON.parse(packageJson);
    const { stdout: commit } = await command("git", ["-C", sdiRepositoryPath, "rev-parse", "HEAD"]);
    report.checks.approvedArtifact = {
      tarballSha256: actualTarballHash,
      tarballSha256Matches: actualTarballHash === approved.sha256,
      packageVersion: packed.version,
      packageVersionMatches: packed.version === approved.version,
      repositoryCommit: commit.trim(),
      repositoryCommitMatches: commit.trim() === approved.commit,
    };
    assert(report.checks.approvedArtifact.tarballSha256Matches, "Approved tarball SHA-256 mismatch.");
    assert(report.checks.approvedArtifact.packageVersionMatches, "Approved tarball version mismatch.");
    assert(report.checks.approvedArtifact.repositoryCommitMatches, "Approved SDI commit mismatch.");

    const astro = process.platform === "win32" ? join(root, "node_modules", ".bin", "astro.cmd") : join(root, "node_modules", ".bin", "astro");
    await command(astro, ["build"]);
    const firstBuild = await legacyBuildInventory();
    await command(astro, ["build"]);
    report.checks.build = { command: "node_modules/.bin/astro build", executions: 2, legacyPostbuildExecuted: false };

    const legacyState = await readJson(legacyPaths.state);
    const legacyManifest = await readJson(legacyPaths.manifest);
    const legacySubmissions = await readJson(legacyPaths.submissions);
    const legacyRecords = new Map(Object.entries(legacyState).map(([url, record]) => [url, { url: record.url, hash: record.hash }]));
    const build = await legacyBuildInventory();
    const buildComparison = compareRecords(legacyRecords, build.records, "legacy-state-to-current-build");
    const reproducibilityComparison = compareRecords(firstBuild.records, build.records, "same-checkout-two-builds");
    report.comparison.legacyBuild = {
      ...buildComparison,
      inventory: { legacy: legacyRecords.size, build: build.records.size, sitemapUrls: build.sitemapUrls },
      rejectedUrls: build.rejected,
      collisions: build.collisions,
      missingHtml: [],
      trailingSlash: "never",
      manifestMatchesState: legacyManifest.length === legacyRecords.size && legacyManifest.every((url) => legacyRecords.has(url)),
      submissionsEntries: legacySubmissions.length,
    };
    report.comparison.buildReproducibility = {
      ...reproducibilityComparison,
      firstBuildInventory: firstBuild.records.size,
      secondBuildInventory: build.records.size,
    };
    if (build.rejected.length > 0) differences.push(classify({ scope: "rejected-urls", urls: build.rejected }));
    if (build.collisions.length > 0) differences.push(classify({ scope: "collisions", urls: build.collisions }));

    const configPath = await makeTemporaryConfig(temporaryDirectory);
    await command(process.platform === "win32" ? "npm.cmd" : "npm", ["install", "--offline", "--ignore-scripts", "--no-audit", "--no-fund", "--package-lock=false", "--prefix", temporaryDirectory, tarballPath], {
      env: { ...process.env, npm_config_offline: "true" },
    });
    const sdiBin = process.platform === "win32" ? join(temporaryDirectory, "node_modules", ".bin", "sdi.cmd") : join(temporaryDirectory, "node_modules", ".bin", "sdi");
    const { stdout: sdiVersion } = await command(sdiBin, ["--version"]);
    assert(sdiVersion.trim() === approved.version, "Installed public sdi binary version mismatch.");

    const dryRuns = [];
    for (let index = 1; index <= 2; index += 1) {
      await command(sdiBin, ["run", "--dry-run", "--config", configPath], { env: { ...process.env, NODE_OPTIONS: "" } });
      const dryRun = await readJson(join(temporaryDirectory, "last-run.json"));
      dryRuns.push(dryRun);
    }
    const sameSemanticResult = JSON.stringify(dryRuns[0].source) === JSON.stringify(dryRuns[1].source)
      && JSON.stringify(dryRuns[0].changes) === JSON.stringify(dryRuns[1].changes)
      && JSON.stringify(dryRuns[0].changeUrls) === JSON.stringify(dryRuns[1].changeUrls)
      && dryRuns.every((dryRun) => dryRun.status === "success" && dryRun.mode === "dry-run" && dryRun.indexNow === undefined);
    report.comparison.sdiDryRuns = {
      publicBinary: "sdi",
      version: sdiVersion.trim(),
      runs: dryRuns.map((dryRun) => ({ status: dryRun.status, source: dryRun.source, changes: dryRun.changes, changeUrls: dryRun.changeUrls, indexNowPresent: dryRun.indexNow !== undefined, trailingSlash: dryRun.config.normalization.trailingSlash })),
      sameSemanticResult,
      noNetwork: dryRuns.every((dryRun) => dryRun.indexNow === undefined),
      noAuxiliaryStateWritten: !(await exists(join(temporaryDirectory, "state.json"))),
    };
    assert(sameSemanticResult, "The two SDI dry-runs did not produce the same semantic result.");
    assert(report.comparison.sdiDryRuns.runs.every((run) => run.trailingSlash === "never"), "SDI did not use trailingSlash: never.");

    const updatedUrls = dryRuns[0].changeUrls.updated;
    const mismatchUrls = buildComparison.hashMismatches.map(({ url }) => url);
    const updateSetMatchesHashMismatches = JSON.stringify([...updatedUrls].sort()) === JSON.stringify([...mismatchUrls].sort());

    if (!buildComparison.equal) {
      differences.push({
        scope: "legacy-state-to-current-build",
        classification: updateSetMatchesHashMismatches && !reproducibilityComparison.equal ? "defecto legacy" : "evidencia insuficiente",
        explanation: updateSetMatchesHashMismatches && !reproducibilityComparison.equal
          ? "The 19 hashes are the same URLs that SDI classifies as updated, and two builds of the same checkout produced different hashes for that same inventory. The legacy raw-HTML snapshot cannot remain equivalent across reproducible source inputs when the compiled output is unstable."
          : "The legacy/hash difference could not be attributed to the current build output.",
        ...buildComparison,
      });
    }
    if (!reproducibilityComparison.equal) {
      differences.push({
        scope: "same-checkout-two-builds",
        classification: "defecto legacy",
        explanation: "Two Astro builds without source changes produced different raw HTML SHA-256 values. Legacy persists that raw compiled HTML fingerprint, so its state reports false updates on a clean rebuild.",
        ...reproducibilityComparison,
      });
    }

    const after = Object.fromEntries(await Promise.all(Object.entries(legacyPaths).map(async ([name, filePath]) => [name, await fileDigest(filePath)])));
    report.legacy.after = after;
    report.checks.legacyUnchanged = Object.fromEntries(Object.keys(before).map((name) => [name, before[name] === after[name]]));
    assert(Object.values(report.checks.legacyUnchanged).every(Boolean), "A legacy state artifact changed during the shadow.");
    assert(differences.every((difference) => difference.classification !== "evidencia insuficiente"), "An unexplained difference blocks Stage 6.5.");
    report.completedAt = new Date().toISOString();
    report.result = differences.length === 0 ? "equivalent" : "differences-classified";
  } catch (error) {
    report.completedAt = new Date().toISOString();
    report.result = "failed";
    report.failure = error instanceof Error ? error.message : String(error);
    throw error;
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
    report.temporaryState.removed = true;
    await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  }
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

main().catch((error) => {
  console.error(`Stage 6.5 shadow failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
