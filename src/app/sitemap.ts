import type { MetadataRoute } from "next";
import { alternates, locales, pageUrl } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/bmky-app"];
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: pageUrl(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: alternates(locale, path).languages },
    })),
  );
}
