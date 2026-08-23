import type { MetadataRoute } from "next";
import { imagesForSlug } from "@/lib/images";
import { allPages } from "@/lib/pages";
import { productCategories } from "@/lib/products";
import { absoluteAssetUrl, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Her kayda, sayfada gerçekten render edilen görseller `images` alanıyla eklenir;
 * Next bunları sitemap.xml'de `xmlns:image` ad alanı ve `<image:image><image:loc>`
 * olarak basar. Google Görseller yalnız `image:loc` okur — caption/title alanları
 * 2022'de kullanımdan kaldırıldı, bu yüzden alt metni sayfadaki `<img>` üzerinden
 * eşleşir; statik HTML'de alt metinlerinin bulunması bu yüzden önemlidir.
 * Görselsiz sayfalarda (şehir sayfaları, SSS, iletişim) alan hiç basılmaz.
 */
function entry(slug: string, rest: Omit<SitemapEntry, "url" | "images">): SitemapEntry {
  const images = imagesForSlug(slug).map(absoluteAssetUrl);
  return { url: absoluteUrl(slug ? `/${slug}` : "/"), ...rest, ...(images.length > 0 ? { images } : {}) };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    entry("", { lastModified: now, changeFrequency: "weekly", priority: 1 }),
    ...allPages.filter((page) => page.index).map((page) => entry(page.slug, {
      lastModified: now,
      changeFrequency: page.kind === "city" ? "monthly" : "weekly",
      priority: page.kind === "city" ? 0.7 : 0.8,
    })),
    entry("urunler", { lastModified: now, changeFrequency: "weekly", priority: 0.9 }),
    ...productCategories.map((category) => entry(`urunler/${category.slug}`, { lastModified: now, changeFrequency: "weekly", priority: 0.8 })),
    entry("sik-sorulan-sorular", { lastModified: now, changeFrequency: "monthly", priority: 0.7 }),
    entry("iletisim", { lastModified: now, changeFrequency: "monthly", priority: 0.8 }),
  ];
}
