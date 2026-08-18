// SDI CLI configuration. The legacy runner remains separate until live migration.
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
  reportPath: "./.sdi/last-run.json",
};
