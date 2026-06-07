import type { UrlState, StateAdapter, DestinationAdapter, SubmissionResult } from './types';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface RunOptions {
  siteUrl: string;
  logPath: string;
}

export async function runDiscovery(
  currentUrls: UrlState[],
  previousUrls: string[],
  stateAdapter: StateAdapter,
  destinations: DestinationAdapter[],
  options: RunOptions
): Promise<string[]> {
  try {
    const newOrModified: UrlState[] = [];
    const deleted: string[] = [];

    const currentUrlsMap = new Map<string, UrlState>();
    for (const item of currentUrls) {
      currentUrlsMap.set(item.url, item);
    }

    // Find new or modified
    for (const current of currentUrls) {
      const previous = await stateAdapter.get(current.url);
      if (!previous) {
        newOrModified.push(current);
      } else if (previous.hash !== current.hash) {
        newOrModified.push(current);
      }
    }

    // Find deleted
    for (const prevUrl of previousUrls) {
      if (!currentUrlsMap.has(prevUrl)) {
        deleted.push(prevUrl);
      }
    }

    if (newOrModified.length === 0 && deleted.length === 0) {
      console.log('SDI: No changes detected.');
      return currentUrls.map(item => item.url);
    }

    console.log(`SDI: Detected ${newOrModified.length} new/modified and ${deleted.length} deleted URLs.`);

    const submittedEntries: Array<{
      url: string;
      published: string;
      submitted: string;
      destinations: string[];
      results: Record<string, { success: boolean; error?: string }>;
    }> = [];

    if (newOrModified.length > 0) {
      // Execute destinations in parallel (non-blocking)
      const results = await Promise.allSettled(
        destinations.map(async dest => {
          try {
            const res = await dest.submit(newOrModified);
            return { name: dest.name, result: res };
          } catch (e: any) {
            return {
              name: dest.name,
              result: {
                success: false,
                submittedCount: 0,
                errors: newOrModified.map(u => ({ url: u.url, error: e.message }))
              }
            };
          }
        })
      );

      const submissionResultsByDest: Record<string, SubmissionResult> = {};
      for (const res of results) {
        if (res.status === 'fulfilled') {
          submissionResultsByDest[res.value.name] = res.value.result;
        }
      }

      const todayStr = new Date().toISOString().split('T')[0];

      // Update state for successfully handled items and log results
      for (const item of newOrModified) {
        await stateAdapter.set(item.url, item);

        // Normalize URL to relative path (e.g. /articulo-x) for the log
        let relativePath = item.url;
        try {
          const parsed = new URL(item.url);
          relativePath = parsed.pathname;
        } catch {
          // fallback to full URL
        }

        const publishedDate = item.lastmod ? item.lastmod.split('T')[0] : todayStr;
        const resultsMap: Record<string, { success: boolean; error?: string }> = {};
        const activeDestinations: string[] = [];

        for (const dest of destinations) {
          activeDestinations.push(dest.name);
          const destRes = submissionResultsByDest[dest.name];
          if (destRes) {
            const errorForUrl = destRes.errors?.find(e => e.url === item.url);
            if (destRes.success && !errorForUrl) {
              resultsMap[dest.name] = { success: true };
            } else {
              resultsMap[dest.name] = {
                success: false,
                error: errorForUrl ? errorForUrl.error : 'Submission failed'
              };
            }
          } else {
            resultsMap[dest.name] = { success: false, error: 'Destination failed to execute' };
          }
        }

        submittedEntries.push({
          url: relativePath,
          published: publishedDate,
          submitted: todayStr,
          destinations: activeDestinations,
          results: resultsMap
        });
      }
    }

    // Process deletions in state
    for (const url of deleted) {
      await stateAdapter.delete(url);
    }

    // Write logs
    if (submittedEntries.length > 0) {
      await appendSubmissionLogs(options.logPath, submittedEntries);
    }

    return currentUrls.map(item => item.url);
  } catch (error: any) {
    console.error('SDI: Run failed silently (non-blocking):', error.message);
    return previousUrls;
  }
}

async function appendSubmissionLogs(logPath: string, newEntries: any[]) {
  try {
    await fs.mkdir(path.dirname(logPath), { recursive: true });
    let logs: any[] = [];
    try {
      const content = await fs.readFile(logPath, 'utf-8');
      logs = JSON.parse(content);
    } catch (e: any) {
      if (e.code !== 'ENOENT') {
        console.error('SDI: Failed to read existing log file:', e);
      }
    }
    logs.push(...newEntries);
    await fs.writeFile(logPath, JSON.stringify(logs, null, 2), 'utf-8');
  } catch (error) {
    console.error('SDI: Failed to write submission logs:', error);
  }
}
