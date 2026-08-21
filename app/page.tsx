import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationGrid } from "@/components/application-grid";
import { HeroSlider } from "@/components/hero-slider";
import { ProductFamilyGrid } from "@/components/product-family-grid";
import { SectorProjects } from "@/components/sector-projects";
import { SystemInventory } from "@/components/system-inventory";

export const metadata: Metadata = {
  title: "Profesyonel LED Ekran Sistemleri",
  description: "Türkiye genelinde profesyonel LED ekran projelendirme, sistem entegrasyonu, kendi teknik ekibimizle montaj, devreye alma ve teknik servis.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <>
    <section className="v4-hero"><div className="container v4-hero-grid">
      <div className="v4-hero-copy"><span className="eyebrow">Profesyonel LED ekran sistemleri</span><h1>LED Ekran Sistemlerini Baştan Sona Projelendiriyoruz.</h1><p className="lead">İşletmeler ve kurumsal alanlar için Türkiye genelinde LED ekran projelendirme, sistem entegrasyonu, montaj ve devreye alma.</p><div className="button-row"><Link className="button" href="/iletisim#teklif">Projenize Özel Teklif Al</Link><Link className="hero-secondary" href="/led-ekranlar">LED Ekranları İnceleyin →</Link></div></div>
      <HeroSlider />
    </div></section>
    <section className="v4-proof"><div className="container">{["Türkiye geneli proje", "Sistem entegrasyonu", "Montaj ve devreye alma", "Teknik servis"].map((item, index) => <div key={item}><span>0{index + 1}</span><b>{item}</b></div>)}</div></section>
    <section className="section v4-products"><div className="container"><div className="section-heading"><div><span className="eyebrow">LED ekran ürün aileleri</span><h2>Ürünü ve kullanım bağlamını ilk bakışta görün.</h2></div><p>Seçim; izleme mesafesi, ortam, yerleşim ve işletme ihtiyacına göre projelendirilir.</p></div><ProductFamilyGrid /></div></section>
    <section className="section v4-applications" id="uygulama-alanlari"><div className="container"><div className="section-heading"><div><span className="eyebrow">Uygulama alanları</span><h2>LED ekran çözümlerini kullanım alanınıza göre keşfedin.</h2></div><p>İç mekândan bina cephesine, farklı işletme ve iletişim ihtiyaçları için proje yaklaşımı.</p></div><ApplicationGrid /></div></section>
    <section className="section section-alt"><div className="container">
      <div className="section-heading"><div><span className="eyebrow">Referans projeler</span><h2>Sahada devreye aldığımız LED ekran uygulamaları</h2></div><p>Yayın izni alınmış gerçek projelerden bir seçki; her uygulama kendi saha koşullarına göre projelendirildi.</p></div>
      <SectorProjects title="" />
    </div></section>
    <section className="section section-alt v4-system"><div className="container"><div className="section-heading"><div><span className="eyebrow">Sistem bileşenleri</span><h2>LED ekranı oluşturan temel bileşenler</h2></div><p>LED modül, kabinet, güç, veri ve kontrol bileşenleri projeye göre tek sistem olarak yapılandırılır.</p></div><SystemInventory /><p className="system-link"><Link className="text-link" href="/teknik-bilgi">Teknik bilgi merkezini inceleyin →</Link></p></div></section>
    <section className="section v4-closing" id="teklif"><div className="container"><div><span className="eyebrow">Teknik kapsamı netleştirin</span><h2>Projeniz için teknik ön değerlendirme alın.</h2><p>Şehir, kullanım alanı ve ortam bilgisiyle projenizin teknik kapsamını birlikte değerlendirelim.</p></div><div className="button-row"><Link className="button" href="/iletisim#teklif">Projenize Özel Teklif Al</Link><Link className="text-link" href="/led-ekran-fiyatlari">Fiyatlandırma yaklaşımını inceleyin →</Link></div></div></section>
  </>;
}
