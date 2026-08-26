const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

// GitHub Pages project-path deploy'unda (örn. /led-proje) next.config.ts basePath uygular.
// next/link ve _next asset'leri prefix'i otomatik alır; ancak `images.unoptimized: true`
// olduğu için next/image loader devre dışıdır ve public/ altındaki src'lere basePath
// EKLENMEZ. Bu yüzden public/ kökünden servis edilen her varlık assetPath() ile sarılmalıdır.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function assetPath(path: string) {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}

// Önizleme (github.io) dağıtımını taramaya kapatmak için kullanılır; canonical domain
// ledproje.com.tr yayına alındığında duplicate content sinyali oluşmasını engeller.
export const isNoindexDeployment = process.env.NEXT_PUBLIC_NOINDEX === "true";

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
  address: {
    street: "Demirciler Sitesi 1. Cd. No:1",
    district: "Seyitnizam",
    postalCode: "34015",
    locality: "Zeytinburnu",
    region: "İstanbul",
  },
  addressShort: "Demirciler Sitesi 1. Cd. No:1, Zeytinburnu / İstanbul",
  addressFull: "Demirciler Sitesi 1. Cd. No:1, Seyitnizam, 34015 Zeytinburnu / İstanbul",
  openingDays: "Pazartesi – Pazar",
  opensAt: "08:30",
  closesAt: "18:00",
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
// absoluteUrl() sayfa URL'leri içindir ve trailingSlash uyumu için sona slash ekler;
// bir dosya yolunda bu dosya adını bozar (/images/x.webp/). Sitemap görsel uzantısı
// mutlak varlık URL'lerini bu yüzden ayrı üretir.
//
// assetPath() BURADA UYGULANMAZ: GitHub Pages önizlemesinde NEXT_PUBLIC_SITE_URL
// zaten basePath'i içerir (https://…/led-proje), dolayısıyla bir kez daha eklemek
// yolu /led-proje/led-proje/… haline getirir. absoluteUrl() de aynı nedenle ham
// yolu ekler.
export function absoluteAssetUrl(path: string) {
  const base = site.url.replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

// WhatsApp butonları düz bir "merhaba" mesajıyla açıldığı için gelen her görüşmede
// ölçü, ortam ve zaman bilgisi tek tek sorulmak zorunda kalıyordu. Tüm butonlar artık
// aynı ön doldurulmuş brief şablonunu açar: call site'ın bildiği alanlar (şehir, ölçü,
// form yanıtları) parantezli placeholder'ın yerine geçer, kalanını müşteri doldurur.
export type WhatsappInquiry = {
  city?: string;        // 📍 satırında ortamın önüne eklenir
  usage?: string;       // 📍 Kullanım yeri
  size?: string;        // 📐 Ekran boyutu
  application?: string; // 🏢 Uygulama tipi
  timing?: string;      // 📅 Proje zamanı
  phone?: string;       // 📞 Telefon
  name?: string;        // 📞 satırında numaranın ardına parantezle eklenir
  notes?: string;       // Ek notlar
};

export function whatsappMessage(inquiry: WhatsappInquiry = {}) {
  const usage = [inquiry.city, inquiry.usage || "(İç mekan / Dış mekan)"].filter(Boolean).join(" · ");
  const phone = [inquiry.phone, inquiry.name && `(${inquiry.name})`].filter(Boolean).join(" ");
  const lines = [
    "Merhaba, LEDProje hakkında bilgi almak istiyorum.",
    "",
    `📍 Kullanım yeri: ${usage}`,
    `📐 Ekran boyutu: ${inquiry.size || "(En × Boy metre veya tahmini alan)"}`,
    `🏢 Uygulama tipi: ${inquiry.application || "(Mağaza / AVM / Bina cephesi / Totem / Diğer)"}`,
    `📅 Proje zamanı: ${inquiry.timing || "(Acil / 1-3 ay / Planlama aşamasında)"}`,
  ];
  // Telefon ve Ek notlar yalnız değerleri varsa yazılır: boş bırakılan satırlar
  // müşteriye doldurulacak alan gibi görünüp mesajı gereksiz uzatıyordu.
  if (phone) lines.push(`📞 Telefon: ${phone}`);
  if (inquiry.notes) lines.push("", `Ek notlar: ${inquiry.notes}`);
  return lines.join("\n");
}

// Metin ?text= içinde taşındığı için satır sonları ve emoji encodeURIComponent ile
// kaçırılmalıdır; ham gönderildiğinde WhatsApp şablonu tek satıra düşürür.
export function whatsappUrl(inquiry: WhatsappInquiry = {}) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(whatsappMessage(inquiry))}`;
}
