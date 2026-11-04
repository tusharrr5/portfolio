import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: `npm run build` writes the whole site to /out.
  output: "export",
  trailingSlash: true,
  images: {
    // Static hosts have no image optimizer. Images are pre-resized to WebP
    // by `npm run images` (scripts/optimize-images.mjs) and this loader
    // points next/image's srcset at those files.
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
