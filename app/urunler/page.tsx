import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCategoryGrid } from "@/components/product-category-grid";
import { controlSystems, warranty } from "@/lib/products";

export const metadata: Metadata = {
  title: "LED Ekran Ürünleri ve Teknik Özellikleri",
  description: "Kendi imalatımızdan iç mekân, dış mekân, poster, esnek ve çift taraflı/totem LED ekran ürünleri. P1.53–P10 piksel aralığı, piksel yoğunluğu, parlaklık ve koruma sınıfı tabloları.",
  alternates: { canonical: "/urunler" },
};

export default function ProductsPage() {
  return <>
    <header className="page-hero page-hero-text-only"><div className="container page-hero-grid"><div>
      <Breadcrumbs current="Ürünler" slug="urunler" />
      <span className="eyebrow">Kendi imalatımız</span>
      <h1>LED Ekran Ürünleri</h1>
      <p className="lead">Beş ürün ailesini piksel aralığı, piksel yoğunluğu, parlaklık ve koruma sınıfı üzerinden karşılaştırın. Her kategori sayfasında kaynak teknik künyenin tamamı yer alır.</p>
      <div className="button-row"><Link className="button" href="/iletisim#teklif">Üreticiden Teklif Alın</Link><a className="button button-outline" href="#kategoriler">Kategorileri İnceleyin</a></div>
    </div></div></header>

    <div className="section"><div className="container">
      <ProductCategoryGrid />

      <section className="product-shared" id="kontrol-sistemleri">
        <h2>Kontrol Sistemleri</h2>
        <p>Tüm ürün ailelerinde ortak kullanılan gönderici, alıcı kart ve yazılım yapısı.</p>
        <dl className="product-spec-list">{controlSystems.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
      </section>

      <section className="product-shared">
        <h2>Garanti ve Destek</h2>
        <p>{warranty}</p>
        <div className="button-row"><Link className="button" href="/iletisim#teklif">Projeniz İçin Teklif Alın</Link></div>
      </section>
    </div></div>
  </>;
}
