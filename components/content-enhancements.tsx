import Image from "next/image";
import Link from "next/link";
import { ProjectShowcase } from "@/components/project-showcase";
import type { SeoPage } from "@/lib/types";
import { getProjectShowcaseData, getReferenceShowcaseData } from "@/lib/sector-projects";
import { assetPath } from "@/lib/site";

const productUses: Record<string, string[]> = {
  "led-ekranlar": ["Kurumsal sunum", "Perakende iletişimi", "Mimari görünürlük"],
  "ic-mekan-led-ekran": ["Mağaza ve showroom", "Ofis ve lobi", "Toplantı salonu"],
  "dis-mekan-led-ekran": ["Bina cephesi", "Açık alan", "Giriş ve yönlendirme"],
  "poster-led-ekran": ["Vitrin", "Fuaye", "Dikey kampanya iletişimi"],
  "esnek-led-ekran": ["Kavisli yüzey", "Kolon çevresi", "Özel geometriler"],
  "totem-led-ekran": ["Giriş alanı", "Açık alan", "Bağımsız dikey yüzey"],
  "led-ekran-kontrol-sistemleri": ["Canlı görüntü", "Planlı yayın", "Çoklu kaynak yönetimi"],
};

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

export function ContentEnhancements({ page }: { page: SeoPage }) {
  if (page.slug === "projeler") return <ProjectShowcase projects={getProjectShowcaseData()} references={getReferenceShowcaseData()} />;
  if (page.slug === "teknik-bilgi") return <section className="knowledge-center" aria-labelledby="knowledge-title"><div className="module-heading"><span className="eyebrow">Teknik bilgi merkezi</span><h2 id="knowledge-title">Doğru sistem kararını oluşturan konular</h2><p>Değerler ürün, üretici dokümanı ve proje koşullarına göre doğrulanır; aşağıdaki başlıklar karar çerçevesini açıklar.</p></div><nav className="knowledge-nav" aria-label="Teknik bilgi konuları">{technicalTopics.map(([title], i) => <a key={title} href={`#teknik-${i + 1}`}>{title}</a>)}</nav><div className="knowledge-grid">{technicalTopics.map(([title, text], i) => <article id={`teknik-${i + 1}`} key={title}><span>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="module-actions"><Link className="text-link" href="/led-ekranlar">Ürün ailelerini inceleyin →</Link><Link className="text-link" href="/p2-5-led-ekran">P2.5 rehberi →</Link><Link className="text-link" href="/p4-led-ekran">P4 rehberi →</Link><Link className="text-link" href="/p5-led-ekran">P5 rehberi →</Link><Link className="text-link" href="/p10-led-ekran">P10 rehberi →</Link><Link className="text-link" href="/led-ekran-kesif-projelendirme">Keşif sürecini inceleyin →</Link></div></section>;
  if (page.slug === "led-ekran-kesif-projelendirme") {
    const steps = ["İhtiyaç ve kullanım alanı", "İzleme mesafesi ve piksel aralığı", "Ölçü ve yerleşim", "Taşıyıcı yüzey", "Güç ve veri altyapısı", "İçerik kaynağı", "Ortam koşulları", "Teknik proje çıktıları"];
    return <section className="discovery-module"><div className="module-heading"><span className="eyebrow">Proje kararları</span><h2>Keşiften uygulanabilir sistem kapsamına</h2><p>Ön değerlendirme; ekran yüzeyini, taşıyıcı yapıyı, kontrolü ve montaj koşullarını aynı proje dosyasında toplar.</p></div><div className="decision-grid">{steps.map((step, i) => <article key={step}><span>{String(i + 1).padStart(2, "0")}</span><h3>{step}</h3><p>{i === 7 ? "Doğrulanmış ölçü, yerleşim, sistem kapsamı ve uygulama notları teklif sürecine aktarılır." : "Saha bilgisi ve kullanım ihtiyacı üzerinden seçenekler karşılaştırılır; kesin değerler doğrulama sonrasında belirlenir."}</p></article>)}</div><div className="measurement-diagram" role="img" aria-label="LED ekran ölçüsü, izleme mesafesi ve montaj yüzeyi ilişkisini gösteren şema"><div>Ekran yüzeyi</div><span>İzleme mesafesi</span><div>İzleyici alanı</div></div><Link className="button" href="/iletisim#teklif">Projenize Özel Teklif Al</Link></section>;
  }
  const uses = productUses[page.slug];
  if (!uses) return null;
  return <section className="product-decision"><div className="module-heading"><span className="eyebrow">Ürün seçimi</span><h2>Projenize uygun sistemi belirleyin</h2><p>Ürün ailesi; ortam, izleme mesafesi, ekran ölçüsü, içerik ve bakım erişimi birlikte değerlendirilerek seçilir.</p></div><div className="use-grid">{uses.map((use, i) => <article key={use}><span>0{i + 1}</span><h3>{use}</h3><p>Görüntü yüzeyi ve sistem bileşenleri kullanım koşuluna göre projelendirilir.</p></article>)}</div><div className="integration-panel"><div><h3>Montaj ve sistem entegrasyonu</h3><p>Kabinet, güç, alıcı kart ve veri bağlantıları; kontrol sistemi, mekanik montaj ve devreye alma adımlarıyla tek kapsamda ele alınır.</p></div><Image src={assetPath("/images/visual-v3/service-led.webp")} alt="LED ekran kabinetinin arka yüzündeki güç ve veri bileşenleri" width={760} height={500} loading="lazy" sizes="(max-width: 800px) 100vw, 42vw" /></div></section>;
}
