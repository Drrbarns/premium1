import { MOCK_SERVICES } from "@/lib/mock";
import { MOCK_INSIGHTS } from "@/lib/pageContent";

const BASE = process.env.APP_BASE_URL || "https://premium1logistics.com";

const staticPages = [
  "",
  "/about",
  "/services",
  "/how-we-operate",
  "/coverage",
  "/track",
  "/testimonials",
  "/insights",
  "/careers",
  "/contact",
  "/quote",
  "/quote/thanks",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap() {
  const serviceUrls = MOCK_SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const insightUrls = MOCK_INSIGHTS.map((p) => ({
    url: `${BASE}/insights/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const main = staticPages.map((path) => {
    const freq = path === "" ? ("weekly" as const) : ("monthly" as const);
    return {
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: freq,
      priority: path === "" ? 1 : path === "/quote" || path === "/contact" ? 0.95 : 0.8,
    };
  });

  return [...main, ...serviceUrls, ...insightUrls];
}
