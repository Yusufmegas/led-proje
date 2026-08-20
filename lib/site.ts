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
export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? `${site.url}/` : `${site.url}${normalizedPath}`;
}
export function whatsappUrl(message: string) { return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`; }
