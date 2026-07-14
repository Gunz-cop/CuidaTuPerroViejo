// Stage 6.5 only: configuration for the read-only SDI adoption shadow.
export default {
  siteId: "cuida-tu-perro-viejo",
  siteUrl: "https://cuidatuperroviejo.com",
  source: {
    distDir: "./dist",
    sitemapPath: "./dist/sitemap-0.xml",
    fallbackToHtmlScan: true,
  },
  normalization: {
    trailingSlash: "never",
  },
  statePath: "./.sdi/state.json",
  legacyStatePath: "./lib/discovery/state/sdi-state.json",
  reportPath: "./.sdi/last-run.json",
};
