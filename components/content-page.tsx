import Image from "next/image";
import Link from "next/link";
import { AreaCalculator } from "@/components/area-calculator";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentEnhancements } from "@/components/content-enhancements";
import { ProductFamilyGrid } from "@/components/product-family-grid";
import { SectorProjects } from "@/components/sector-projects";
import { TechnicalSpecs } from "@/components/technical-specs";
import type { SeoPage } from "@/lib/types";
import { assetPath, site } from "@/lib/site";

function naturalTurkish(value: string) {
  return value
    .replaceAll("Pixel pitch", "Piksel aralığı")
    .replaceAll("pixel pitch", "piksel aralığı")
    .replaceAll("Pitch", "Piksel aralığı")
    .replaceAll("pitch", "piksel aralığı")
    .replaceAll("Outdoor LED", "Dış mekân LED")
    .replaceAll("receiver/data", "alıcı kart ve veri")
    .replaceAll("controller/receiver", "kontrol sistemi ve alıcı kart")
    .replaceAll("controller/sender", "kontrol sistemi")
    .replaceAll("Sender/controller", "Kontrol sistemi")
    .replaceAll("Sender, receiver ve controller", "Gönderici, alıcı kart ve kontrol sistemi")
    .replaceAll("receiver kart", "alıcı kart")
    .replaceAll("Data hattı", "Veri hattı")
    .replaceAll("data hattı", "veri hattı")
    .replaceAll("enerji/data", "enerji ve veri")
    .replaceAll("elektrik/data", "elektrik ve veri")
    .replaceAll("güç/data", "güç ve veri")
    .replaceAll("data dağıtımı", "veri dağıtımı")
    .replaceAll("data topolojisi", "veri topolojisi")
    .replaceAll("mapping", "modül eşleme")
    .replaceAll("Konfigürasyon", "Yapılandırma")
    .replaceAll("konfigürasyon", "yapılandırma")
    .replaceAll("lokasyon", "konum");
}

// Sayfa hero görselleri. SeoPage tipinde görsel alanı olmadığı için eşleme burada tutulur.
// Kaynak: LEDProje'nin kendi saha çekimlerinden çıkarılan kareler (public/images/projects).
// Markası okunan dört proje burada değil, lib/sector-projects.ts içinde referans olarak yayınlanır.
// Her sayfa kendi görselini kullanır — tekrar yoktur.
const heroImages: Record<string, string> = {
  // Ürün ve çözüm sayfaları
  "led-ekranlar": "/images/projects/ic_4.webp",
  "ic-mekan-led-ekran": "/images/projects/ic_1.webp",
  "dis-mekan-led-ekran": "/images/projects/dis_1.webp",
  "dis-cephe-led-ekran": "/images/projects/dis_2.webp",
  "magaza-led-ekran": "/images/projects/ic_2.webp",
  "avm-led-ekran": "/images/projects/ic_3.webp",
  "poster-led-ekran": "/images/projects/ic_6.webp",
  "esnek-led-ekran": "/images/projects/ic_11.webp",
  "totem-led-ekran": "/images/projects/ic_5.webp",
  "led-ekran-kontrol-sistemleri": "/images/projects/ic_7.webp",
  // Hizmet sayfaları
  "led-ekran-kesif-projelendirme": "/images/projects/dis_7.webp",
  "led-ekran-montaji": "/images/projects/dis_4.webp",
  "led-ekran-bakim-onarim": "/images/projects/dis_6.webp",
  "led-ekran-teknik-servis": "/images/projects/dis_5.webp",
  // Piksel aralığı sayfaları
  "p2-5-led-ekran": "/images/projects/ic_9.webp",
  "p3-led-ekran": "/images/projects/ic_10.webp",
  "p4-led-ekran": "/images/projects/dis_3.webp",
  "p5-led-ekran": "/images/projects/dis_8.webp",
  "p10-led-ekran": "/images/projects/dis_9.webp",
};

export function ContentPage({ page }: { page: SeoPage }) {
  const isOutdoor = page.slug.includes("dis-") || ["p5-led-ekran", "p10-led-ekran", "totem-led-ekran"].includes(page.slug);
  // Eşlenmemiş sayfalar (şehir, kurumsal, fiyat) görselsiz kalır; dış mekân bağlamı olanlar
  // için stok cephe görseli yedek olarak kullanılır.
  const imageForSlug = () => heroImages[page.slug] ?? (isOutdoor ? "/images/visual-v3/facade-led.webp" : undefined);
  const heroImage = imageForSlug();
  const isPitch = /^p\d/.test(page.slug);
  return <>
    <header className={`page-hero page-hero-${page.kind} ${heroImage ? "" : "page-hero-text-only"}`}><div className="container page-hero-grid"><div><Breadcrumbs current={page.h1} slug={page.slug} /><span className="eyebrow">{page.eyebrow}</span>{isPitch && <span className="pitch-watermark" aria-hidden="true">{page.slug.split("-")[0].toUpperCase()}</span>}<h1>{page.h1}</h1><p className="lead">{page.intro}</p><div className="button-row"><Link className="button" href="/iletisim#teklif">Projenize Özel Teklif Al</Link><a className="button button-outline" href={site.phoneHref}>{site.phoneDisplay}</a></div></div>{heroImage && <div className="page-hero-image"><Image src={assetPath(heroImage)} alt={`${page.h1} çözümünü kullanım ortamında gösteren LED ekran`} fill priority fetchPriority="high" sizes="(max-width: 900px) 100vw, 42vw" /></div>}</div><div className="container page-proof-strip"><div><b>01</b><span>Teknik keşif</span></div><div><b>02</b><span>Sistem entegrasyonu</span></div><div><b>03</b><span>Montaj ve devreye alma</span></div><div><b>04</b><span>Teknik servis</span></div></div></header>
    <div className="section"><div className="container page-layout"><article className="prose">
      {page.slug === "led-ekranlar" && <section><h2>LED Ekran Ürün Aileleri</h2><p>Ürün gruplarını kullanım ortamı ve fiziksel yapı üzerinden karşılaştırın; ayrıntılar için ilgili sayfaya geçin.</p><ProductFamilyGrid /></section>}
      {page.slug === "led-ekran-metrekare-fiyati" && <section><h2>LED Ekran Alan Hesaplama Aracı</h2><p>Metre cinsinden en ve boy ölçünüzü girin. Araç yalnız ekran alanını hesaplar; fiyat üretmez.</p><AreaCalculator /></section>}
      {page.specs && <section><h2>Doğrulanmış Teknik Veriler</h2><p>Değerler kaynak teknik dokümandan alınmıştır. Nihai ürün ve proje uygunluğu teklif öncesinde doğrulanır.</p><TechnicalSpecs rows={page.specs} /></section>}
      <ContentEnhancements page={page} />
      {page.slug !== "teknik-bilgi" && <div className="content-story">{page.sections.map((section, index) => <section className={`story-block story-${index % 3}`} key={section.title}><span className="story-number">0{index + 1}</span>{section.eyebrow && <span className="eyebrow">{naturalTurkish(section.eyebrow)}</span>}<h2>{naturalTurkish(section.title)}</h2><p>{naturalTurkish(section.body)}</p>{section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{naturalTurkish(item)}</li>)}</ul>}{section.links && <div className="button-row">{section.links.map((item) => <Link className="text-link" key={item.href} href={item.href}>{item.label} →</Link>)}</div>}</section>)}</div>}
      {page.faqs.length > 0 && <section className="faq-list" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Sık Sorulan Sorular</h2>
        <dl>{page.faqs.map((faq) => <div key={faq.question}><dt>{naturalTurkish(faq.question)}</dt><dd>{naturalTurkish(faq.answer)}</dd></div>)}</dl>
      </section>}
      <p className="faq-center-link"><Link className="text-link" href="/sik-sorulan-sorular">LED ekran projeleri hakkında sık sorulan soruları inceleyin →</Link></p>
      <SectorProjects sector={page.slug} />
      {page.related.length > 0 && <section className="module-heading" aria-labelledby="related-heading">
        <h2 id="related-heading">İlgili Konular</h2>
        <nav className="module-actions" aria-label="İlgili içerikler">{page.related.map((item) => <Link className="text-link" key={`${item.href}-${item.label}`} href={item.href}>{item.label} →</Link>)}</nav>
      </section>}
    </article><aside className="sidebar"><span className="eyebrow light">Proje dosyanızı açın</span><h2>Ölçü ve kullanım alanıyla başlayın.</h2><p>Sabit fiyat yerine projenizin teknik kapsamını oluşturalım.</p><Link className="button" href="/iletisim#teklif">Teklif Al</Link><a className="button button-secondary" href={site.phoneHref}>Telefonla Görüşün</a></aside></div></div>
  </>;
}
