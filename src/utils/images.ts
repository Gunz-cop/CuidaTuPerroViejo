import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

interface ImageMetadata {
  src: string;
  width?: number;
  height?: number;
  srcset?: string;
  sizes?: string;
}

// Simple in-memory cache to avoid reading the same image multiple times during build
const metadataCache = new Map<string, ImageMetadata>();

export async function getImageMetadata(src: string): Promise<ImageMetadata> {
  if (!src || !src.startsWith('/')) {
    return { src };
  }

  if (metadataCache.has(src)) {
    return metadataCache.get(src)!;
  }

  const publicPath = path.join(process.cwd(), 'public', src);
  if (!fs.existsSync(publicPath)) {
    return { src };
  }

  try {
    const metadata = await sharp(publicPath).metadata();
    const result: ImageMetadata = {
      src,
      width: metadata.width,
      height: metadata.height,
    };

    // Find responsive variants if they exist
    const ext = path.extname(src);
    const baseWithoutExt = src.slice(0, -ext.length);
    const widths = [400, 800, 1200];
    const foundVariants: string[] = [];

    for (const w of widths) {
      // If the original image width is smaller than or equal to the variant width, skip it
      if (metadata.width && metadata.width <= w) {
        continue;
      }
      
      const variantRelPath = `${baseWithoutExt}-${w}${ext}`;
      const variantAbsPath = path.join(process.cwd(), 'public', variantRelPath);
      if (fs.existsSync(variantAbsPath)) {
        foundVariants.push(`${variantRelPath} ${w}w`);
      }
    }

    if (foundVariants.length > 0) {
      // Append the original image as the largest width
      if (metadata.width) {
        foundVariants.push(`${src} ${metadata.width}w`);
      }
      result.srcset = foundVariants.join(', ');
      result.sizes = '(max-width: 768px) 100vw, 800px';
    }

    metadataCache.set(src, result);
    return result;
  } catch (error) {
    console.error(`Error reading image metadata for ${src}:`, error);
    return { src };
  }
}
