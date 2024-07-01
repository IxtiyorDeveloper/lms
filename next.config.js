const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

dotenvLoad();

const withNextEnv = nextEnv({});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  ignoreDuringBuilds: true,
  ignoreBuildErrors: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // swcMinify: true,
  generateEtags: false,
  headers: [
    {
      source: "/:all*(js|svg|svg+xml|jpg|png|webp)",
      locale: false,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=9999999999, must-revalidate",
        },
      ],
    },
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = withNextEnv(nextConfig);
