// Solo presentación: los códigos originales permanecen en Cloudflare, KV y D1.
const regions = new Intl.DisplayNames(['es'], { type: 'region', fallback: 'none' });

export function countryName(code: string): string {
  if (code === '') return 'Sin país';
  const region = code.toUpperCase();
  // ZZ es el marcador de región desconocida de CLDR, no un país.
  if (region === 'ZZ') return code;
  try {
    return regions.of(region) ?? code;
  } catch {
    return code;
  }
}
