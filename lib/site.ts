export const site = {
  name: "LEDProje",
  url: "https://ledproje.com.tr",
  domain: "https://ledproje.com.tr",
  phoneDisplay: "0501 580 01 01",
  phoneHref: "tel:+905015800101",
  phoneInternational: "+905015800101",
  whatsappNumber: "905015800101",
  location: "İstanbul",
  serviceArea: "İstanbul · Türkiye geneli proje hizmeti",
  mapsUrl: "https://maps.app.goo.gl/dKe4WDH9pGhuh9se7",
  description: "Türkiye genelinde profesyonel LED ekran sistemleri için projelendirme, sistem entegrasyonu, montaj, devreye alma ve teknik servis.",
} as const;
export function absoluteUrl(path = "/") { return new URL(path, site.url).toString(); }
export function whatsappUrl(message: string) { return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`; }
