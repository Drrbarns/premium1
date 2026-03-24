const BASE = process.env.APP_BASE_URL || "https://premium1logistics.com";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
