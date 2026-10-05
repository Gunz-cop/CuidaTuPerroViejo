import { createHash } from 'node:crypto';
import { execFile as execFileCallback } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { isAbsolute, join, relative, sep } from 'node:path';

const execFile = promisify(execFileCallback);

export function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function stableAscii(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

export async function sourceState(cwd = process.cwd()) {
  let sourceCommit;
  let status;
  try {
    ({ stdout: sourceCommit } = await execFile('git', ['rev-parse', '--verify', 'HEAD^{commit}'], { cwd }));
    ({ stdout: status } = await execFile('git', ['status', '--porcelain=v1', '--untracked-files=all'], { cwd }));
  } catch (error) {
    throw new Error(`No se pudo inspeccionar el estado real de Git: ${error.message}`, { cause: error });
  }
  sourceCommit = sourceCommit.trim();
  if (!/^[0-9a-f]{40}$/.test(sourceCommit)) throw new Error('No se pudo resolver sourceCommit Git completo.');
  return { sourceCommit, dirtySource: status.length > 0 };
}

export async function exclusiveDir(path) {
  await mkdir(path, { recursive: false });
}

export async function exclusiveFile(path, bytes) {
  await writeFile(path, bytes, { flag: 'wx' });
}

export function jsonBytes(value) {
  return Buffer.from(JSON.stringify(value, null, 2) + '\n', 'utf8');
}

export async function saveJson(path, value) {
  await exclusiveFile(path, jsonBytes(value));
}

export async function manifestFor(root, sourceCommit, recordedAt) {
  const files = [];
  async function walk(dir) {
    for (const entry of (await readdir(dir, { withFileTypes: true })).sort((a, b) => stableAscii(a.name, b.name))) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.isFile() && entry.name !== 'manifest.json') {
        const bytes = await readFile(full);
        const path = relative(root, full).split(sep).join('/');
        if (path.startsWith('../') || isAbsolute(path)) throw new Error('Path inseguro en manifest.');
        files.push({ path, sha256: sha256(bytes), bytes: bytes.length });
      }
    }
  }
  await walk(root);
  files.sort((a, b) => stableAscii(a.path, b.path));
  return { schemaVersion: 'agent-readiness-evidence/1', sourceCommit, recordedAt, files };
}
