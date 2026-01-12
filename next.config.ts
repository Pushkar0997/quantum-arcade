import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Firebase Hosting (free tier friendly)
  output: "export",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Empty turbopack config to silence the warning
  // while also providing webpack fallbacks for the quantum-circuit library
  turbopack: {},
  webpack: (config, { isServer }) => {
    // Fix for quantum-circuit library which uses antlr4 that tries to import 'fs'
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
      };
    }
    return config;
  },
};

export default nextConfig;
