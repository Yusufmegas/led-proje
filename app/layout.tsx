import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { absoluteUrl, site } from "@/lib/site";

// 1200x630 statik PNG. `output: "export"` altında next/og ImageResponse çalışmadığı için
// görsel scripts/generate-og-image.mjs ile build dışında üretilir.
const ogImage = { url: "/og-image.png", width: 1200, height: 630, alt: `${site.name} — Profesyonel LED Ekran Sistemleri` };

// Boş bırakıldığında GTM hiç yüklenmez ve lib/analytics.ts sessizce no-op kalır.
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Profesyonel LED Ekran Sistemleri | LEDProje", template: "%s | LEDProje" },
  description: "Profesyonel LED ekran sistemlerinde projelendirme, sistem entegrasyonu, montaj, devreye alma ve teknik servis.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "tr_TR", siteName: site.name, title: "Profesyonel LED Ekran Sistemleri | LEDProje", description: "Türkiye genelinde anahtar teslim profesyonel LED ekran sistemleri.", url: absoluteUrl("/"), images: [ogImage] },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07111f", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusiness = { "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, url: site.url, telephone: site.phoneInternational, areaServed: { "@type": "Country", name: "Türkiye" } };
  return <html lang="tr"><body>
    {/* Resmi GTM snippet'i satır içi kullanılıyor: @next/third-parties yalnız bu iş için
        ek bir dependency getirir ve dataLayer'ı hydration'dan önce tanımlama garantisi vermez. */}
    {/* eslint-disable-next-line @next/next/next-script-for-ga */}
    {gtmId && <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');` }} />}
    {gtmId && <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" /></noscript>}
    <a className="skip-link" href="#main">İçeriğe geç</a><Header /><main id="main">{children}</main><Footer /><WhatsappFab /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }} />
  </body></html>;
}
