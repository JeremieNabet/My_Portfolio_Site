import type { NextConfig } from "next";

const pages = ["", "about", "bmky-app"];
const locales = ["fr", "us", "he"];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    const legacy = [];
    for (const locale of locales) {
      legacy.push({ source: `/${locale}/index.html`, destination: `/${locale}`, permanent: true });
      for (const page of pages.filter(Boolean)) {
        legacy.push({ source: `/${locale}/${page}.html`, destination: `/${locale}/${page}`, permanent: true });
      }
    }
    for (const page of pages.filter(Boolean)) {
      legacy.push({ source: `/${page}.html`, destination: `/fr/${page}`, permanent: true });
    }
    legacy.push(
      { source: "/index.html", destination: "/fr", permanent: true },
      { source: "/index-en.html", destination: "/us", permanent: true },
      { source: "/index-he.html", destination: "/he", permanent: true },
    );
    return legacy;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
