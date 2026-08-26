import Image from "next/image";
import Link from "next/link";
import { ProjectShowcase } from "@/components/project-showcase";
import { QuoteCta } from "@/components/quote-cta";
import type { SeoPage } from "@/lib/types";
import { altOf } from "@/lib/images";
import { getProjectShowcaseData, getReferenceShowcaseData } from "@/lib/sector-projects";
import { integrationPanelImage, productUses } from "@/lib/showcase";
import { assetPath } from "@/lib/site";

const technicalTopics = [
  ["LED ekran nasıl çalışır?", "Modüller, kabinetler, güç birimleri ve kontrol bileşenleri görüntüyü tek yüzeyde oluşturur."],
  ["LED modül ve kabinet", "Modül görüntü yüzeyini; kabinet ise mekanik yerleşim, güç ve veri dağıtımını taşır."],
  ["Piksel aralığı", "Komşu pikseller arasındaki mesafe, izleme uzaklığı ve hedeflenen detayla birlikte değerlendirilir."],
  ["Çözünürlük ve ölçü", "Fiziksel ölçü ile piksel aralığı toplam çözünürlüğü ve kontrol kapasitesini belirler."],
  ["Parlaklık ve ortam ışığı", "Gerekli parlaklık, iç veya dış mekân koşullarına ve ekranın yönüne göre değişir."],
  ["Yenileme hızı", "Kamera çekimi ve hareketli içerik gereksinimleri ürünün doğrulanmış teknik verileriyle değerlendirilir."],
  ["Gri ölçeği ve renk", "Renk geçişleri; sürüş, işleme ve kalibrasyon zincirinin birlikte çalışmasına bağlıdır."],
  ["İç ve dış mekân", "Dış mekânda çevresel koruma, parlaklık ve bakım erişimi farklı bir sistem yaklaşımı gerektirir."],
  ["IP koruma sınıfları", "IP kodu muhafazanın katı cisim ve su girişine karşı koruma derecesini ifade eder; uygunluk ürün belgesiyle doğrulanır."],
  ["Kontrol sistemi", "Gönderici işleme birimi ve alıcı kartlar görüntü verisini kabinetlere dağıtır."],
  ["Görüntü işlemci", "Kaynak seçimi, ölçekleme ve ekran yerleşimi yayın senaryosuna göre yapılandırılır."],
  ["Güç ve veri altyapısı", "Hat dağılımı, koruma ve bağlantı topolojisi proje ölçüsü ve saha koşullarıyla planlanır."],
  ["Yedeklilik", "Sinyal ve güç sürekliliği gereksinimi, projenin operasyon önceliğine göre belirlenir."],
  ["Kalibrasyon", "Modüller arasındaki parlaklık ve renk farkları uygun ölçüm ve ayar süreciyle dengelenir."],
  ["Ön ve arka bakım", "Servis erişim yönü, mimari yerleşim ve bakım alanına göre ürün seçiminde ele alınır."],
  ["İçerik oranı", "İçerik çözünürlüğü ve en-boy oranı, ekranın gerçek piksel yapısıyla eşleştirilir."],
  ["Montaj ve test", "Mekanik hizalama, bağlantılar, görüntü ayarı ve saha testleri devreye alma öncesinde tamamlanır."],
  ["Bakım ve teknik servis", "Arıza kaynağı modül, güç, veri, kontrol ve bağlantı katmanları birlikte incelenerek belirlenir."],
] as const;

// /projeler sektör kartları. İkonlar scripts/build-sector-icons.mjs ile üretilir ve
// dekoratiftir (alt=""): kartın erişilebilir adını h3 içindeki bağlantı taşır, ikona
// ayrıca alt verilmesi ekran okuyucuda bağlantı adını gereksiz uzatırdı.
const projectSectors = [
  ["Mağaza ve Perakende", "/magaza-led-ekran", "magaza.svg", "Vitrin, reyon arası ve kasa önü LED ekran çözümleri."],
  ["AVM ve Ortak Alanlar", "/avm-led-ekran", "bina.svg", "Atriyum, giriş ve ortak alan büyük yüzey LED ekranlar."],
  ["Bina Cephesi", "/dis-cephe-led-ekran", "dis-cephe.svg", "Mimari entegreli dış cephe ve reklam yüzeyi LED ekranlar."],
  ["Totem ve Dikey Ekran", "/totem-led-ekran", "totem.svg", "Açık alan ve iç mekân totem LED ekran sistemleri."],
  ["Spor Alanı ve Arena", "/led-ekranlar", "spor.svg", "Skor ekranı, tribün şeridi ve arena LED yüzey sistemleri."],
  ["Otel ve Kurumsal", "/ic-mekan-led-ekran", "bina.svg", "Lobi, toplantı salonu ve konferans alanı LED ekran çözümleri."],
] as const;

// Numaralandırma .process sınıfının CSS counter'ıyla yapılır, işaretlemede yoktur.
const projectProcess = [
  ["Teknik Keşif", "Kurulum alanı, ekran boyutu ve teknik gereksinimler yerinde belirlenir."],
  ["Projelendirme", "Ekran tipi, piksel aralığı ve montaj sistemi projeye özel tasarlanır."],
  ["Üretim", "Kabinet, elektronik ve yazılım bileşenleri kendi tesisimizde üretilir."],
  ["Montaj ve Devreye Alma", "Saha ekibimiz kurulum, kablo ve kontrol sistemini devreye alır."],
  ["Teknik Servis", "Uzaktan izleme ve yerinde müdahale ile 2 yıl garanti kapsamında destek sağlanır."],
] as const;

export function ContentEnhancements({ page }: { page: SeoPage }) {
  if (page.slug === "projeler") return <>
    <section className="module-heading" aria-labelledby="sectors-title">
      <h2 id="sectors-title">Çözüm Ürettiğimiz Sektörler</h2>
      <p>180+ tamamlanan projemizde yer alan sektörler ve uygulama alanları.</p>
    </section>
    <div className="use-grid">{projectSectors.map(([title, href, icon, text]) => <article key={title}>
      <Image src={assetPath(`/images/sectors/${icon}`)} alt="" width={48} height={48} loading="lazy" unoptimized />
      <h3><Link className="text-link" href={href}>{title}</Link></h3>
      <p>{text}</p>
    </article>)}</div>
    <section className="module-heading" aria-labelledby="process-title">
      <h2 id="process-title">Projelerinizde Nasıl Çalışıyoruz?</h2>
    </section>
    <div className="process">{projectProcess.map(([title, text]) => <div key={title}><b>{title}</b><span>{text}</span></div>)}</div>
    <ProjectShowcase projects={getProjectShowcaseData()} references={getReferenceShowcaseData()} />
    <QuoteCta title="Referans Proje Görmek İster Misiniz?" description="180+ tamamlanmış projemize ait görsel ve teknik detayları görüşme sırasında paylaşıyoruz. Projenizi birlikte değerlendirelim." />
  </>;
  if (page.slug === "teknik-bilgi") return <section className="knowledge-center" aria-labelledby="knowledge-title"><div className="module-heading"><span className="eyebrow">Teknik bilgi merkezi</span><h2 id="knowledge-title">Doğru sistem kararını oluşturan konular</h2><p>Değerler ürün, üretici dokümanı ve proje koşullarına göre doğrulanır; aşağıdaki başlıklar karar çerçevesini açıklar.</p></div><nav className="knowledge-nav" aria-label="Teknik bilgi konuları">{technicalTopics.map(([title], i) => <a key={title} href={`#teknik-${i + 1}`}>{title}</a>)}</nav><div className="knowledge-grid">{technicalTopics.map(([title, text], i) => <article id={`teknik-${i + 1}`} key={title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="module-actions"><Link className="text-link" href="/led-ekranlar">Ürün ailelerini inceleyin →</Link><Link className="text-link" href="/p2-5-led-ekran">P2.5 rehberi →</Link><Link className="text-link" href="/p4-led-ekran">P4 rehberi →</Link><Link className="text-link" href="/p5-led-ekran">P5 rehberi →</Link><Link className="text-link" href="/p10-led-ekran">P10 rehberi →</Link><Link className="text-link" href="/led-ekran-kesif-projelendirme">Keşif sürecini inceleyin →</Link></div></section>;
  if (page.slug === "led-ekran-kesif-projelendirme") {
    const steps = ["İhtiyaç ve kullanım alanı", "İzleme mesafesi ve piksel aralığı", "Ölçü ve yerleşim", "Taşıyıcı yüzey", "Güç ve veri altyapısı", "İçerik kaynağı", "Ortam koşulları", "Teknik proje çıktıları"];
    return <section className="discovery-module"><div className="module-heading"><span className="eyebrow">Proje kararları</span><h2>Keşiften uygulanabilir sistem kapsamına</h2><p>Ön değerlendirme; ekran yüzeyini, taşıyıcı yapıyı, kontrolü ve montaj koşullarını aynı proje dosyasında toplar.</p></div><div className="decision-grid">{steps.map((step, i) => <article key={step}><span>{String(i + 1).padStart(2, "0")}</span><h3>{step}</h3><p>{i === 7 ? "Doğrulanmış ölçü, yerleşim, sistem kapsamı ve uygulama notları teklif sürecine aktarılır." : "Saha bilgisi ve kullanım ihtiyacı üzerinden seçenekler karşılaştırılır; kesin değerler doğrulama sonrasında belirlenir."}</p></article>)}</div><div className="measurement-diagram" role="img" aria-label="LED ekran ölçüsü, izleme mesafesi ve montaj yüzeyi ilişkisini gösteren şema"><div>Ekran yüzeyi</div><span>İzleme mesafesi</span><div>İzleyici alanı</div></div><Link className="button" href="/iletisim#teklif">Projenize Özel Teklif Al</Link></section>;
  }
  const uses = productUses[page.slug];
  if (!uses) return null;
  return <section className="product-decision"><div className="module-heading"><span className="eyebrow">Ürün seçimi</span><h2>Projenize uygun sistemi belirleyin</h2><p>Ürün ailesi; ortam, izleme mesafesi, ekran ölçüsü, içerik ve bakım erişimi birlikte değerlendirilerek seçilir.</p></div><div className="use-grid">{uses.map((use, i) => <article key={use}><span>0{i + 1}</span><h3>{use}</h3><p>Görüntü yüzeyi ve sistem bileşenleri kullanım koşuluna göre projelendirilir.</p></article>)}</div><div className="integration-panel"><div><h3>Montaj ve sistem entegrasyonu</h3><p>Kabinet, güç, alıcı kart ve veri bağlantıları; kontrol sistemi, mekanik montaj ve devreye alma adımlarıyla tek kapsamda ele alınır.</p></div><Image src={assetPath(integrationPanelImage)} alt={altOf(integrationPanelImage)} width={760} height={500} loading="lazy" sizes="(max-width: 800px) 100vw, 42vw" /></div></section>;
}
