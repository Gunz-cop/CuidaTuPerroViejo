import { getAstroUrls } from './astro/getAstroUrls';
import { FileStateAdapter } from './core/fileStateAdapter';
import { GoogleIndexingAdapter } from './astro/googleAdapter';
import { IndexNowAdapter } from './astro/indexNowAdapter';
import { runDiscovery } from './core/engine';
import type { DestinationAdapter } from './core/types';
import * as path from 'path';
import * as fs from 'fs/promises';

async function main() {
  console.log('SDI: Starting Search Discovery V0 execution...');

  // Load local .env file if it exists
  try {
    const dotenvContent = await fs.readFile(path.join(process.cwd(), '.env'), 'utf-8');
    for (const line of dotenvContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const index = trimmed.indexOf('=');
      if (index === -1) continue;
      const key = trimmed.substring(0, index).trim();
      let val = trimmed.substring(index + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    }
    console.log('SDI: Loaded local .env file successfully.');
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      console.warn('SDI: Failed to load local .env file:', error.message);
    }
  }

  const siteUrl = process.env.SDI_SITE_URL || 'https://cuidatuperroviejo.com';
  const distDir = process.env.SDI_DIST_DIR || 'dist';
  
  const statePath = process.env.SDI_STATE_PATH || path.join(process.cwd(), 'lib/discovery/state/sdi-state.json');
  const manifestPath = process.env.SDI_MANIFEST_PATH || path.join(process.cwd(), 'lib/discovery/state/sdi-manifest.json');
  const logPath = process.env.SDI_LOG_PATH || path.join(process.cwd(), 'lib/discovery/state/sdi-submissions.json');

  // Load URL list from build output
  const currentUrls = await getAstroUrls(distDir, siteUrl);
  console.log(`SDI: Found ${currentUrls.length} total URLs in build output.`);

  if (currentUrls.length === 0) {
    console.log('SDI: No URLs detected, skipping indexing submission.');
    return;
  }

  // Setup State Adapter
  const stateAdapter = new FileStateAdapter(statePath);

  // Setup Destination Adapters
  const destinations: DestinationAdapter[] = [];

  // 1. Setup IndexNow Adapter
  const indexNowKey = process.env.INDEXNOW_KEY;
  const indexNowHost = process.env.INDEXNOW_HOST || 'cuidatuperroviejo.com';
  if (indexNowKey) {
    destinations.push(new IndexNowAdapter(indexNowHost, indexNowKey));
    console.log('SDI: IndexNow destination adapter enabled.');
  } else {
    console.warn('SDI: INDEXNOW_KEY env var missing. IndexNow destination disabled.');
  }

  // 2. Setup Google Indexing Adapter (Experimental)
  const googleEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const googleKey = process.env.GOOGLE_PRIVATE_KEY;
  if (googleEmail && googleKey) {
    destinations.push(new GoogleIndexingAdapter(googleEmail, googleKey));
    console.log('SDI: Google Indexing destination adapter enabled.');
  } else {
    console.warn('SDI: GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY env vars missing. Google Indexing disabled.');
  }

  if (destinations.length === 0) {
    console.log('SDI: No destination adapters configured. Running in dry-run mode (change tracking only).');
  }

  // Load manifest
  let previousUrls: string[] = [];
  try {
    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    previousUrls = JSON.parse(manifestContent);
  } catch (e: any) {
    if (e.code !== 'ENOENT') {
      console.error('SDI: Failed to read manifest file:', e);
    }
  }

  // Run the core engine
  const newManifestUrls = await runDiscovery(currentUrls, previousUrls, stateAdapter, destinations, {
    siteUrl,
    logPath
  });

  // Save manifest
  try {
    await fs.mkdir(path.dirname(manifestPath), { recursive: true });
    await fs.writeFile(manifestPath, JSON.stringify(newManifestUrls, null, 2), 'utf-8');
  } catch (error) {
    console.error('SDI: Failed to write manifest file:', error);
  }

  console.log('SDI: Search Discovery execution completed.');
}

main().catch(err => {
  console.error('SDI: Runner critical failure:', err);
  process.exitCode = 0; // Ensure pipeline does not fail
});

