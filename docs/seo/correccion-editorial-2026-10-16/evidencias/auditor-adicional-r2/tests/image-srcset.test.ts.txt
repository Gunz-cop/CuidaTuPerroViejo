import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildSrcset, mobileImageFor } from '../src/utils/image';

test('every responsive candidate advertised for article heroes exists', async () => {
  const { readdirSync, readFileSync } = await import('node:fs');
  for (const file of readdirSync('src/content/blog').filter((name) => name.endsWith('.mdx'))) {
    const source = readFileSync(resolve('src/content/blog', file), 'utf8');
    const hero = source.match(/^heroImage: "([^"]+)"/m)?.[1];
    const mobile = mobileImageFor(hero);
    if (mobile) assert.ok(existsSync(resolve('public', `.${mobile}`)), `${file}: missing mobile picture source`);
    for (const candidate of buildSrcset(hero).split(',').filter(Boolean)) {
      const path = candidate.trim().split(/\s+/)[0];
      assert.ok(existsSync(resolve('public', `.${path}`)), `${file}: missing ${path}`);
    }
  }
});
