import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AnalyticsLoader } from "@/components/analytics-loader";
import { CookieConsent } from "@/components/cookie-consent";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { GA4_MEASUREMENT_ID } from "@/lib/analytics";
import { absoluteUrl, isNoindexDeployment, site } from "@/lib/site";

// 1200x630 statik PNG. `output: "export"` altında next/og ImageResponse çalışmadığı için
// görsel scripts/generate-og-image.mjs ile build dışında üretilir.
// URL, metadataBase'e göre çözülür; metadataBase zaten basePath'i içerdiği için
// burada assetPath() KULLANILMAZ (çift prefix'e yol açar). assetPath yalnız
// tarayıcının doğrudan istediği <img>/<video> kaynakları için gereklidir.
const ogImage = { url: "/og-image.png", width: 1200, height: 630, alt: `${site.name} — Profesyonel LED Ekran Sistemleri` };

// Consent Mode v2 bootstrap. Yalnız dataLayer kuyruğunu hazırlar: ağ isteği yoktur ve
// 162 KiB'lik gtag.js burada YÜKLENMEZ. Kütüphaneyi onay durumuna göre AnalyticsLoader
// enjekte eder. Varsayılanların kütüphaneden önce kuyruğa girmesi Consent Mode'un
// gereğidir, bu yüzden bu blok satır içi ve senkron kalır (çalışması <1 ms).
const consentBootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});
if (/(?:^|;\\s*)ledproje_consent=granted/.test(document.cookie)) {
  gtag('consent', 'update', { 'analytics_storage': 'granted' });
}
gtag('js', new Date());
gtag('config', '${GA4_MEASUREMENT_ID}');
`.trim();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "LED Ekran Üreticisi Türkiye | İç & Dış Mekân LED Ekran — LEDProje", template: "%s | LED Ekran Üreticisi — LEDProje" },
  description: "Türkiye'nin LED ekran üreticisi LEDProje: iç mekân, dış mekân, poster, esnek ve totem LED ekran imalatı, projelendirme, montaj ve teknik servis.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "tr_TR", siteName: site.name, title: "LED Ekran Üreticisi Türkiye — LEDProje", description: "İç mekân, dış mekân, poster, esnek ve totem LED ekran imalatı; projelendirme, montaj ve teknik servis.", url: absoluteUrl("/"), images: [ogImage] },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
  // Önizleme dağıtımında tüm sayfalar taramaya kapatılır.
  ...(isNoindexDeployment && { robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } } }),
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07111f", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // İki şema bir @graph içinde: LocalBusiness yerel/iletişim sinyalini, Organization ise
  // üretici kimliğini ve kuruluş yılını taşır. @id ile birbirlerine bağlanır.
  const orgId = `${site.url}#organization`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        url: site.url,
        logo: absoluteUrl("/og-image.png"),
        foundingDate: "2021",
        description: "İç mekân, dış mekân, poster, esnek ve totem LED ekran sistemleri üreten, projelendiren ve kuran LED ekran üreticisi.",
        areaServed: { "@type": "Country", name: "Türkiye" },
      },
      {
        "@type": "LocalBusiness",
        name: site.name,
        url: site.url,
        telephone: site.phoneInternational,
        parentOrganization: { "@id": orgId },
        areaServed: { "@type": "Country", name: "Türkiye" },
      },
    ],
  };
  return <html lang="tr"><body>
    <script id="ga4-consent-bootstrap" dangerouslySetInnerHTML={{ __html: consentBootstrap }} />
    <a className="skip-link" href="#main">İçeriğe geç</a><Header /><main id="main">{children}</main><Footer /><WhatsappFab /><CookieConsent /><AnalyticsLoader /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
  </body></html>;
}
