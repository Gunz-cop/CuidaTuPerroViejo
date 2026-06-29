import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const imageDir = path.join(publicDir, 'images');
const srcDir = path.join(rootDir, 'src');
const minSavingsRatio = 0.05;
const defaultQuality = 78;
const responsiveWidths = [400, 800, 1200];
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const args = new Set(process.argv.slice(2));
const shouldApply = args.has('--apply');
const shouldDeleteOriginals = args.has('--delete-originals');
const shouldGenerateResponsive = args.has('--responsive');

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeFileWithRetry(filePath, buffer) {
  const tempPath = `${filePath}.tmp-${process.pid}`;
  let lastError;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      await fs.writeFile(tempPath, buffer);
      await fs.rm(filePath, { force: true });
      await fs.rename(tempPath, filePath);
      return;
    } catch (error) {
      lastError = error;
      await fs.rm(tempPath, { force: true }).catch(() => {});
      await wait(150 * (attempt + 1));
    }
  }

  throw lastError;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(entryPath));
      continue;
    }
    files.push(entryPath);
  }

  return files;
}

function isGeneratedVariant(filePath) {
  return /-\d{3,4}\.webp$/i.test(path.basename(filePath));
}

function toPublicPath(filePath) {
  return `/${path.relative(publicDir, filePath).replace(/\\/g, '/')}`;
}

function toWebpPath(filePath) {
  return filePath.replace(/\.(jpe?g|png|webp)$/i, '.webp');
}

async function writeIfSmaller(outputPath, buffer, originalSize) {
  const newSize = buffer.byteLength;
  const savingRatio = (originalSize - newSize) / originalSize;

  if (newSize >= originalSize || savingRatio < minSavingsRatio) {
    return { written: false, newSize, savingRatio };
  }

  if (shouldApply) {
    await writeFileWithRetry(outputPath, buffer);
  }

  return { written: true, newSize, savingRatio };
}

async function optimizeFavicon() {
  const faviconPath = path.join(publicDir, 'favicon.png');
  if (!await pathExists(faviconPath)) return null;

  const original = await fs.stat(faviconPath);
  const buffer = await sharp(faviconPath)
    .resize(96, 96, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();

  const result = await writeIfSmaller(faviconPath, buffer, original.size);
  return {
    kind: 'favicon',
    file: toPublicPath(faviconPath),
    originalSize: original.size,
    newSize: result.newSize,
    changed: result.written,
  };
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!supportedExtensions.has(ext) || isGeneratedVariant(filePath)) return null;

  const original = await fs.stat(filePath);
  const webpPath = toWebpPath(filePath);
  const publicPath = toPublicPath(filePath);
  const nextPublicPath = toPublicPath(webpPath);

  const image = sharp(filePath, { animated: false }).rotate();
  const metadata = await image.metadata();
  const buffer = await image
    .webp({ quality: defaultQuality, effort: 6, smartSubsample: true })
    .toBuffer();

  const result = await writeIfSmaller(webpPath, buffer, original.size);
  if (!result.written) {
    return {
      kind: 'skipped',
      file: publicPath,
      originalSize: original.size,
      newSize: result.newSize,
      width: metadata.width,
      height: metadata.height,
    };
  }

  return {
    kind: ext === '.webp' ? 'optimized' : 'converted',
    file: publicPath,
    nextFile: nextPublicPath,
    sourcePath: filePath,
    outputPath: webpPath,
    originalSize: original.size,
    newSize: result.newSize,
    width: metadata.width,
    height: metadata.height,
  };
}

async function generateResponsiveVariants(result) {
  if (!result || !result.outputPath || !result.width || result.width < 700) return [];

  const variants = [];
  for (const width of responsiveWidths) {
    if (width >= result.width) continue;

    const parsed = path.parse(result.outputPath);
    const outputPath = path.join(parsed.dir, `${parsed.name}-${width}.webp`);
    const buffer = await sharp(result.outputPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: defaultQuality, effort: 6, smartSubsample: true })
      .toBuffer();

    if (shouldApply) {
      await fs.writeFile(outputPath, buffer);
    }

    variants.push({
      file: toPublicPath(outputPath),
      size: buffer.byteLength,
      width,
    });
  }

  return variants;
}

async function rewriteReferences(conversions) {
  const replacements = conversions
    .filter((item) => item.kind === 'converted' && item.file !== item.nextFile)
    .map((item) => [item.file, item.nextFile]);

  if (replacements.length === 0) return [];

  const files = (await walk(srcDir)).filter((file) => /\.(astro|mdx|ts|js|json)$/i.test(file));
  const changed = [];

  for (const file of files) {
    let content = await fs.readFile(file, 'utf8');
    let nextContent = content;

    for (const [from, to] of replacements) {
      nextContent = nextContent.split(from).join(to);
      nextContent = nextContent.split(`https://cuidatuperroviejo.com${from}`).join(`https://cuidatuperroviejo.com${to}`);
    }

    if (nextContent !== content) {
      if (shouldApply) {
        await fs.writeFile(file, nextContent);
      }
      changed.push(path.relative(rootDir, file).replace(/\\/g, '/'));
    }
  }

  return changed;
}

async function deleteConvertedOriginals(conversions) {
  if (!shouldApply || !shouldDeleteOriginals) return [];

  const removed = [];
  for (const item of conversions) {
    if (item.kind !== 'converted') continue;
    if (item.sourcePath === item.outputPath) continue;
    await fs.rm(item.sourcePath);
    removed.push(item.file);
  }

  return removed;
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function summarize(results, favicon, changedRefs, removedOriginals, variants) {
  const changed = results.filter((item) => item?.kind === 'optimized' || item?.kind === 'converted');
  const originalTotal = changed.reduce((sum, item) => sum + item.originalSize, 0);
  const newTotal = changed.reduce((sum, item) => sum + item.newSize, 0);

  console.log(shouldApply ? 'Applied image optimization.' : 'Dry run. Pass --apply to write changes.');
  console.log(`Optimized or converted: ${changed.length}`);
  console.log(`Estimated image savings: ${formatBytes(originalTotal - newTotal)} (${formatBytes(originalTotal)} -> ${formatBytes(newTotal)})`);

  if (favicon) {
    console.log(`Favicon: ${favicon.changed ? 'optimized' : 'unchanged'} (${formatBytes(favicon.originalSize)} -> ${formatBytes(favicon.newSize)})`);
  }

  if (changed.length > 0) {
    console.log('\nLargest wins:');
    changed
      .sort((a, b) => (b.originalSize - b.newSize) - (a.originalSize - a.newSize))
      .slice(0, 12)
      .forEach((item) => {
        const name = item.kind === 'converted' ? `${item.file} -> ${item.nextFile}` : item.file;
        console.log(`- ${name}: ${formatBytes(item.originalSize)} -> ${formatBytes(item.newSize)}`);
      });
  }

  if (shouldGenerateResponsive) {
    console.log(`\nResponsive variants generated: ${variants.length}`);
  }

  if (changedRefs.length > 0) {
    console.log(`\nReference files updated: ${changedRefs.length}`);
    changedRefs.forEach((file) => console.log(`- ${file}`));
  }

  if (removedOriginals.length > 0) {
    console.log(`\nConverted originals removed: ${removedOriginals.length}`);
    removedOriginals.forEach((file) => console.log(`- ${file}`));
  }
}

if (!await pathExists(imageDir)) {
  console.error(`Image directory not found: ${imageDir}`);
  process.exit(1);
}

const imageFiles = (await walk(imageDir)).sort((a, b) => {
  const aExt = path.extname(a).toLowerCase();
  const bExt = path.extname(b).toLowerCase();
  if (aExt === '.webp' && bExt !== '.webp') return 1;
  if (aExt !== '.webp' && bExt === '.webp') return -1;
  return a.localeCompare(b);
});
const results = [];
const variants = [];
const processedOutputs = new Set();

for (const file of imageFiles) {
  try {
    const outputPath = toWebpPath(file);
    if (processedOutputs.has(outputPath)) continue;
    processedOutputs.add(outputPath);

    const result = await optimizeImage(file);
    if (!result) continue;
    results.push(result);

    if (shouldGenerateResponsive && (result.kind === 'optimized' || result.kind === 'converted')) {
      variants.push(...await generateResponsiveVariants(result));
    }
  } catch (error) {
    console.warn(`Warning: Failed to process image ${file}:`, error.message);
  }
}

const favicon = await optimizeFavicon();
const changedRefs = await rewriteReferences(results);
const removedOriginals = await deleteConvertedOriginals(results);

summarize(results, favicon, changedRefs, removedOriginals, variants);
