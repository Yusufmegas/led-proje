import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Profesyonel LED Ekran Sistemleri | LEDProje", template: "%s | LEDProje" },
  description: "Profesyonel LED ekran sistemlerinde projelendirme, sistem entegrasyonu, montaj, devreye alma ve teknik servis.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "tr_TR", siteName: site.name, title: "Profesyonel LED Ekran Sistemleri | LEDProje", description: "Türkiye genelinde anahtar teslim profesyonel LED ekran sistemleri.", url: site.url },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07111f", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusiness = { "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, url: site.url, telephone: site.phoneInternational, areaServed: { "@type": "Country", name: "Türkiye" } };
  return <html lang="tr"><body><a className="skip-link" href="#main">İçeriğe geç</a><Header /><main id="main">{children}</main><Footer /><WhatsappFab /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }} /></body></html>;
}
