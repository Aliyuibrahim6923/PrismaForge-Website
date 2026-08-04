import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Three.js ships ES modules that benefit from tree-shaken barrel imports.
  experimental: {
    optimizePackageImports: ["three", "@react-three/drei", "motion", "gsap"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // Add remote CMS domains here when the content layer is wired to a CMS.
    remotePatterns: [],
  },

  // Security + performance headers. Long-cache immutable static assets.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
