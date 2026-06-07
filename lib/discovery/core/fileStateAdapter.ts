import * as fs from 'fs/promises';
import * as path from 'path';
import type { UrlState, StateAdapter } from './types';

export class FileStateAdapter implements StateAdapter {
  private filePath: string;
  private cache: Record<string, UrlState> = {};
  private isLoaded = false;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  private async load() {
    if (this.isLoaded) return;
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      this.cache = JSON.parse(content);
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        console.error('SDI: Error loading state file:', error);
      }
      this.cache = {};
    }
    this.isLoaded = true;
  }

  private async save() {
    try {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      await fs.writeFile(this.filePath, JSON.stringify(this.cache, null, 2), 'utf-8');
    } catch (error) {
      console.error('SDI: Error saving state file:', error);
    }
  }

  async get(key: string): Promise<UrlState | null> {
    await this.load();
    return this.cache[key] || null;
  }

  async set(key: string, state: UrlState): Promise<void> {
    await this.load();
    this.cache[key] = state;
    await this.save();
  }

  async delete(key: string): Promise<void> {
    await this.load();
    if (this.cache[key]) {
      delete this.cache[key];
      await this.save();
    }
  }
}
