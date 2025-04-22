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
};

export default nextConfig;
