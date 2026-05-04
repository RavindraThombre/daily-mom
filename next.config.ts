import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/mom",
  allowedDevOrigins: ["http://localhost:3000", "http://192.168.1.109:3000"],
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/",
          destination: "/mom",
          permanent: false,
          basePath: false,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
