/**
 * @type {import('next').NextConfig}
 */

const devPort = process.env.WAILS_DEV_PORT;
const nextConfig = {
  output: "export",

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  distDir: "dist",
  compress: false,
  assetPrefix: devPort ? `http://localhost:${devPort}` : undefined,

  async headers() {
    if (!devPort) return [];
    return [
      {
        source: "/_next/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

module.exports = nextConfig;
