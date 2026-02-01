import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://testarqio-001-site1.anytempurl.com/:path*",
      },
    ];
  },
};

export default nextConfig;
