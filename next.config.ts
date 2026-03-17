import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverActions: {},
  },
};

export default nextConfig;