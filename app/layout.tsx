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
  title: { default: "Profesyonel LED Ekran Sistemleri | LEDProje", template: "%s | LEDProje" },
  description: "Profesyonel LED ekran sistemlerinde projelendirme, sistem entegrasyonu, montaj, devreye alma ve teknik servis.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "tr_TR", siteName: site.name, title: "Profesyonel LED Ekran Sistemleri | LEDProje", description: "Türkiye genelinde anahtar teslim profesyonel LED ekran sistemleri.", url: absoluteUrl("/"), images: [ogImage] },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
  // Önizleme dağıtımında tüm sayfalar taramaya kapatılır.
  ...(isNoindexDeployment && { robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } } }),
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07111f", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusiness = { "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, url: site.url, telephone: site.phoneInternational, areaServed: { "@type": "Country", name: "Türkiye" } };
  return <html lang="tr"><body>
    <script id="ga4-consent-bootstrap" dangerouslySetInnerHTML={{ __html: consentBootstrap }} />
    <a className="skip-link" href="#main">İçeriğe geç</a><Header /><main id="main">{children}</main><Footer /><WhatsappFab /><CookieConsent /><AnalyticsLoader /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }} />
  </body></html>;
}
