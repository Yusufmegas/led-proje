import type { MetadataRoute } from "next";
import { allPages } from "@/lib/pages";
import { absoluteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const now = new Date(); return [{ url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 }, ...allPages.filter((p) => p.index).map((p) => ({ url: absoluteUrl(`/${p.slug}`), lastModified: now, changeFrequency: p.kind === "city" ? "monthly" as const : "weekly" as const, priority: p.kind === "city" ? .7 : .8 })), { url: absoluteUrl("/sik-sorulan-sorular"), lastModified: now, changeFrequency: "monthly", priority: .7 }, { url: absoluteUrl("/iletisim"), lastModified: now, changeFrequency: "monthly", priority: .8 }]; }
