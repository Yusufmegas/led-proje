import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationGrid } from "@/components/application-grid";
import { HeroSlider } from "@/components/hero-slider";
import { ProductFamilyGrid } from "@/components/product-family-grid";
import { SectorProjects } from "@/components/sector-projects";
import { StandardsStrip } from "@/components/standards-strip";
import { SystemInventory } from "@/components/system-inventory";

export const metadata: Metadata = {
  // `absolute`, layout'taki "%s | LED Ekran Üreticisi — LEDProje" şablonunu atlar:
  // ana sayfa başlığı zaten üretici ifadesini ve marka adını kendi içinde taşıyor.
  title: { absolute: "LED Ekran Üreticisi Türkiye | İç & Dış Mekân LED Ekran — LEDProje" },
  description: "Türkiye'nin LED ekran üreticisi LEDProje: iç mekân, dış mekân, poster, esnek ve totem LED ekran imalatı. P1.53–P10, IP65, Colorlight kontrol sistemleri. Üreticiden teklif alın.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <>
    <section className="v4-hero"><div className="container v4-hero-grid">
      <div className="v4-hero-copy"><span className="eyebrow">2021&apos;den bu yana üretim</span><h1>Türkiye&apos;nin LED Ekran Üreticisi</h1><p className="lead">İç mekân, dış mekân, poster, esnek ve totem LED ekran sistemlerini kendi imalatımızla üretiyor, projelendiriyor, kuruyor ve devreye alıyoruz.</p><div className="button-row"><Link className="button" href="/iletisim#teklif">Projenize Özel Teklif Al</Link><Link className="hero-secondary" href="/led-ekranlar">LED Ekranları İnceleyin →</Link></div></div>
      <HeroSlider />
    </div></section>
    <section className="proof-metrics" aria-label="Rakamlarla LEDProje"><div className="container">{[["50+", "Tamamlanmış Proje"], ["5+", "Yıllık Üretim Deneyimi"], ["60+", "Hizmet Verilen Şehir"]].map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}</div></section>
    <section className="section v4-products"><div className="container"><div className="section-heading"><div><span className="eyebrow">LED ekran ürün aileleri</span><h2>Ürünü ve kullanım bağlamını ilk bakışta görün.</h2></div><p>Seçim; izleme mesafesi, ortam, yerleşim ve işletme ihtiyacına göre projelendirilir.</p></div><ProductFamilyGrid /></div></section>
    <section className="section v4-applications" id="uygulama-alanlari"><div className="container"><div className="section-heading"><div><span className="eyebrow">Uygulama alanları</span><h2>LED ekran çözümlerini kullanım alanınıza göre keşfedin.</h2></div><p>İç mekândan bina cephesine, farklı işletme ve iletişim ihtiyaçları için proje yaklaşımı.</p></div><ApplicationGrid /></div></section>
    <SectorProjects />
    <section className="section section-alt v4-system"><div className="container"><div className="section-heading"><div><span className="eyebrow">Sistem bileşenleri</span><h2>LED ekranı oluşturan temel bileşenler</h2></div><p>LED modül, kabinet, güç, veri ve kontrol bileşenleri projeye göre tek sistem olarak yapılandırılır.</p></div><SystemInventory /><p className="system-link"><Link className="text-link" href="/teknik-bilgi">Teknik bilgi merkezini inceleyin →</Link></p></div></section>
    <StandardsStrip />
    <section className="section v4-closing" id="teklif"><div className="container"><div><span className="eyebrow">Teknik kapsamı netleştirin</span><h2>Projeniz için teknik ön değerlendirme alın.</h2><p>Şehir, kullanım alanı ve ortam bilgisiyle projenizin teknik kapsamını birlikte değerlendirelim.</p></div><div className="button-row"><Link className="button" href="/iletisim#teklif">Projenize Özel Teklif Al</Link><Link className="text-link" href="/led-ekran-fiyatlari">Fiyatlandırma yaklaşımını inceleyin →</Link></div></div></section>
  </>;
}
