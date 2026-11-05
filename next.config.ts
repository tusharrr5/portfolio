import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // Images are pre-resized to WebP by `npm run images`
    // (scripts/optimize-images.mjs) and this loader points next/image's
    // srcset at those files. Every page is still prerendered as static HTML;
    // only the admin login routes (/api/decap/*) run on the server.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
