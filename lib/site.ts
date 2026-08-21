const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

export const site = {
  name: "LEDProje",
  url: configuredSiteUrl ?? "https://ledproje.com.tr",
  domain: configuredSiteUrl ?? "https://ledproje.com.tr",
  phoneDisplay: "0501 580 01 01",
  phoneHref: "tel:+905015800101",
  phoneInternational: "+905015800101",
  whatsappNumber: "905015800101",
  location: "İstanbul",
  serviceArea: "İstanbul · Türkiye geneli proje hizmeti",
  mapsUrl: "https://maps.app.goo.gl/dKe4WDH9pGhuh9se7",
  description: "Türkiye genelinde profesyonel LED ekran sistemleri için projelendirme, sistem entegrasyonu, montaj, devreye alma ve teknik servis.",
} as const;
// next.config.ts `trailingSlash: true` kullandığı için canonical, sitemap ve JSON-LD
// URL'lerinin tamamı sondaki slash ile üretilmelidir; aksi halde sitemap URL'leri
// işaret ettikleri sayfanın canonical'ından farklı olur.
export function absoluteUrl(path = "/") {
  const base = site.url.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const [pathname, ...rest] = normalizedPath.split("#");
  const withSlash = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return rest.length ? `${base}${withSlash}#${rest.join("#")}` : `${base}${withSlash}`;
}
export function whatsappUrl(message: string) { return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`; }
