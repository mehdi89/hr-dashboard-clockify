import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Configure webpack to handle CSV file imports
  webpack: (config) => {
    config.module.rules.push({
      test: /\.csv$/,
      use: "raw-loader",
    });
    return config;
  },
  // Environment variables that should be available to the client
  env: {
    APP_ENV: process.env.NODE_ENV || "development",
  },
  // ESLint configuration for build
  eslint: {
    // Don't run ESLint during production builds for better performance
    ignoreDuringBuilds: true,
  },
  // TypeScript configuration
  typescript: {
    // Don't stop the build if there are TypeScript errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
