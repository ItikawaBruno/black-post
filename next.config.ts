import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow builds to succeed even when ESLint finds issues in generated files.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
