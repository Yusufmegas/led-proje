import type { MetadataRoute } from "next";
import { isNoindexDeployment, site } from "@/lib/site";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  // Önizleme (github.io) dağıtımı tamamen taramaya kapatılır; sitemap de yayınlanmaz.
  if (isNoindexDeployment) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/_next/", "/api/"] }, sitemap: `${site.url}/sitemap.xml`, host: site.url };
}
