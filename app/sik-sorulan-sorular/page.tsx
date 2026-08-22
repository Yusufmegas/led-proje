import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description: "LED ekran seçimi, piksel aralığı, fiyatlandırma, projelendirme, montaj, içerik yönetimi ve teknik servis hakkında sık sorulan sorular.",
  alternates: { canonical: "/sik-sorulan-sorular" },
};

const categories = [
  { id: "secim", title: "LED ekran seçimi", items: [
    ["LED ekran seçimine nereden başlanır?", "Önce kullanım amacı, iç veya dış mekân koşulları, ekran ölçüsü, en yakın izleme mesafesi ve içerik türü belirlenir. Ürün ailesi bu bilgiler birlikte değerlendirilerek seçilir."],
    ["Her proje için aynı LED ekran kullanılabilir mi?", "Hayır. Ortam ışığı, izleme mesafesi, yerleşim, çalışma düzeni ve bakım erişimi değiştikçe ekran ve sistem gereksinimleri de değişir."],
    ["Ekran ölçüsü nasıl belirlenir?", "Montaj yüzeyi, görüş alanı, içerik oranı ve izleyicinin konumu birlikte değerlendirilir. Nihai ölçü, modül ve kabinet geometrisine uygun biçimde projelendirilir."],
    ["Hangi ürün nereye uygun?", "İç mekân ekranlar mağaza, showroom, toplantı ve konferans salonları ile lobiler için; dış mekân ekranlar bina cephesi, totem ve meydanlar için; poster LED giriş ve vitrin noktaları için; esnek ekranlar ise kavisli yüzeyler için uygundur."],
  ] },
  { id: "piksel-araligi", title: "Piksel aralığı ve izleme mesafesi", items: [
    ["Piksel aralığı (pixel pitch) nedir?", "İki LED (piksel) merkezi arasındaki milimetre cinsinden mesafedir. Değer küçüldükçe aynı alandaki piksel yoğunluğu ve çözünürlük artar, ekran daha yakından net izlenir; değer büyüdükçe daha uzak izleme mesafesi ve daha ekonomik bir çözüm elde edilir."],
    ["En küçük piksel aralığı her zaman en iyi seçim midir?", "Hayır. İzleme mesafesi, ekran boyutu, içerik detayı ve proje bütçesi birlikte değerlendirilmelidir. Gereğinden sık piksel yapısı her projede ek fayda sağlamaz."],
    ["İzleme mesafesi neden önemlidir?", "İzleyicinin ekrana en çok yaklaşacağı nokta, görüntü bütünlüğü için gereken piksel aralığını belirleyen temel girdilerden biridir."],
    ["İzleme mesafesi nasıl seçilir?", "Genel kural olarak ideal minimum izleme mesafesi yaklaşık piksel aralığı değeri kadar metredir; örneğin P4 için 4 m ve üzeri. Seçim, kalabalığın ekrana ne kadar yaklaşacağına göre yapılır."],
  ] },
  { id: "ortam", title: "İç mekân ve dış mekân farkları", items: [
    ["İç mekân ve dış mekân LED ekran arasındaki temel fark nedir?", "Dış mekân ekranlar çok daha parlaktır (≥ 5.500 nit) ve suya ile toza karşı korumalıdır (ön IP65). İç mekân ekranlar daha düşük parlaklıkta (≈ 750 nit) ve daha yüksek çözünürlüklüdür. Dış mekânda çevresel koruma ve yüksek ortam ışığında görünürlük, iç mekânda ise yakın izleme ve mimari uyum belirleyicidir."],
    ["Vitrin için iç mekân ekran yeterli olur mu?", "Doğrudan güneş ışığı, cam yansıması, ekranın konumu ve çalışma koşulları görülmeden karar verilmemelidir. Uygun ürün ailesi teknik değerlendirmeyle belirlenir."],
    ["Dış mekân ekranında yalnız parlaklık mı önemlidir?", "Hayır. Kabinet yapısı, çevresel koruma, taşıyıcı sistem, enerji altyapısı, erişim ve bakım planı da projenin parçasıdır."],
  ] },
  { id: "fiyat", title: "Ölçü ve fiyatlandırma", items: [
    ["LED ekran fiyatı nasıl belirlenir?", "Fiyat; ekran ölçüsü, piksel aralığı, iç veya dış mekân kullanımı ve montaj kapsamına göre belirlenir. Kabinet, kontrol sistemi, güç ve veri altyapısı, mekanik uygulama, erişim ve lojistik de birlikte değerlendirilir. Ölçü ve ihtiyacınızı teklif formundan iletmeniz yeterlidir."],
    ["Neden sabit metrekare fiyatı verilmiyor?", "Aynı alandaki iki ekran farklı piksel yoğunluğuna, kabinet yapısına, kontrol kapasitesine ve montaj koşullarına sahip olabilir. Bu nedenle alan tek başına proje bedelini göstermez."],
    ["Ekran alanı nasıl hesaplanır?", "Metre cinsinden en ve boy çarpılarak m² değeri bulunur. Bu sonuç fiziksel alanı gösterir; tek başına fiyat değildir."],
  ] },
  { id: "sistem", title: "Kabinet, kontrol ve güç sistemi", items: [
    ["Kabinet nedir?", "LED modülleri, güç ve alıcı kart gibi bileşenleri düzenli bir yapıda bir araya getiren taşıyıcı birimdir. Kabinet düzeni ekran ölçüsüne ve uygulama biçimine göre planlanır."],
    ["Kontrol sistemi ne işe yarar?", "Görüntü kaynağını ekranın çözünürlüğüne ve yayın senaryosuna uygun biçimde işler, veriyi alıcı kartlar üzerinden modüllere dağıtır."],
    ["Alıcı kart nedir?", "Kontrol sisteminden gelen görüntü verisini kabinet içindeki LED modüllere ileten sistem bileşenidir. Kart dağılımı ekranın çözünürlüğüne göre hesaplanır."],
    ["Güç ve veri altyapısı neden projeye dâhildir?", "Ekranın kararlı çalışması için enerji dağıtımı, koruma düzeni, kablo güzergâhları ve veri bağlantıları ekran sistemiyle birlikte boyutlandırılmalıdır."],
  ] },
  { id: "proje", title: "Keşif, projelendirme ve montaj", items: [
    ["Keşif öncesinde hangi bilgiler gerekir?", "Yaklaşık en ve boy, kullanım ortamı, en yakın izleme mesafesi, şehir, montaj yüzeyi görselleri ve içerik amacı teknik ön değerlendirmeyi başlatmak için yararlıdır."],
    ["Saha keşfi her proje için gerekli midir?", "Gereksinim; ölçü, mevcut altyapı, erişim, taşıyıcı yüzey ve uygulama karmaşıklığına göre teknik ön değerlendirme sonrasında belirlenir."],
    ["Projelendirme kapsamında neler değerlendirilir?", "Ekran geometrisi, ürün ailesi, kabinet yerleşimi, güç ve veri dağıtımı, kontrol yapısı, mekanik uygulama, montaj erişimi ve devreye alma adımları birlikte ele alınır."],
    ["Montaj ve devreye alma süreci neleri içerir?", "Proje kapsamına göre mekanik montaj, kabinet ve modül yerleşimi, bağlantılar, hizalama, kontrol sistemi ayarları, görüntü kontrolleri ve işlev testleri yürütülür."],
    ["Montaj ve kurulum size mi ait?", "Talebe göre keşif, imalat, yerinde montaj ve devreye alma LEDProje tarafından yapılır. Taşıyıcı karkas ile elektrik ve veri hattı gibi kapsam maddeleri teklifte açıkça belirtilir."],
  ] },
  { id: "icerik", title: "İçerik yönetimi", items: [
    ["LED ekranda hangi içerikler gösterilebilir?", "Sistemin çözünürlüğüne ve yayın yapısına uygun görsel, video, metin ve canlı kaynaklar kullanılabilir. İçerik biçimi kullanım amacıyla birlikte planlanır."],
    ["İçerikler uzaktan yönetilebilir mi?", "Uygun bağlantı, güvenlik ve kontrol altyapısı bulunduğunda uzaktan yönetim değerlendirilebilir. Yöntem, projenin yayın senaryosuna göre belirlenir."],
    ["İçerik ölçüsü neden ekran çözünürlüğüyle eşleşmelidir?", "Doğru tuval ve oran, görüntünün kırpılmadan ve gereksiz ölçeklenmeden gösterilmesini sağlar. İçerik şablonları devreye alma sırasında tanımlanan çözünürlüğe göre hazırlanmalıdır."],
    ["Ekrana içerik nasıl gönderilir ve nasıl kontrol edilir?", "Ekranlar Colorlight kontrol sistemi ve PlayerMaster / LEDVISION yazılımıyla yönetilir. Görüntü, HDMI kaynağından (bilgisayar veya medya oynatıcı) beslenebilir; uygun altyapı bulunduğunda içerik ve parlaklık uzaktan bulut üzerinden de yönetilebilir."],
  ] },
  { id: "servis", title: "Bakım ve teknik servis", items: [
    ["LED ekran bakımı neden önemlidir?", "Bağlantıların, güç dağıtımının, modüllerin, havalandırmanın ve kontrol ayarlarının düzenli değerlendirilmesi sistemin çalışma bütünlüğünü korumaya yardımcı olur."],
    ["Arıza durumunda hangi bilgiler paylaşılmalıdır?", "Ekranın konumu, sistem bilgisi, sorunun ne zaman başladığı, görünen belirti ve mümkünse fotoğraf veya video teknik ön değerlendirmeyi hızlandırır."],
    ["Teknik servis uzaktan verilebilir mi?", "Sorunun niteliği ve sistem erişimi uygunsa uzaktan ön değerlendirme yapılabilir. Saha müdahalesi gereksinimi inceleme sonucunda belirlenir."],
    ["Garanti ve teknik destek nasıl sağlanıyor?", "Ürünlerde 2 yıl garanti sunulur. Yazılımsal sorunlar uzaktan çözülür; donanım arızaları kendi imalat atölyemizde onarılır, modül ve kablo yedeği sağlanır."],
  ] },
  { id: "teklif", title: "Türkiye geneli süreç ve teklif", items: [
    ["LEDProje Türkiye geneline hizmet veriyor mu?", "Evet. Satış, projelendirme, montaj, devreye alma ve teknik servis ihtiyaçları proje kapsamına göre Türkiye genelinde planlanır."],
    ["Başka şehirlerde fiziksel şubeniz var mı?", "Sitede İstanbul dışındaki şehirler için fiziksel şube veya servis noktası iddiası bulunmaz. Hizmet planı proje ve saha bilgilerine göre oluşturulur."],
    ["Teklif almak için hangi bilgiler paylaşılmalıdır?", "Şehir, kullanım alanı, iç veya dış mekân bilgisi, yaklaşık ölçü, izleme mesafesi, montaj yüzeyi ve içerik amacı paylaşılmalıdır. Eksik ayrıntılar teknik görüşmede netleştirilir."],
  ] },
] as const;

const faqs = categories.flatMap((category) => category.items.map(([question, answer]) => ({ question, answer })));

export default function FaqPage() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <>
    <header className="page-hero"><div className="container"><Breadcrumbs current="Sık Sorulan Sorular" slug="sik-sorulan-sorular" /><span className="eyebrow">Bilgi merkezi</span><h1>LED Ekran Sık Sorulan Sorular</h1><p className="lead">Ekran seçiminden montaj ve teknik servise kadar proje sürecinde en çok merak edilen konuları açık ve doğrulanabilir yanıtlarla bir araya getirdik.</p></div></header>
    <div className="section"><div className="container faq-page-layout"><aside className="faq-category-nav" aria-label="Soru kategorileri"><h2>Kategoriler</h2>{categories.map((category) => <a key={category.id} href={`#${category.id}`}>{category.title}</a>)}</aside><article className="faq-categories">{categories.map((category) => <section id={category.id} key={category.id}><h2>{category.title}</h2><div className="faq-list">{category.items.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>)}<div className="faq-final"><h2>Projenize özel bir sorunuz mu var?</h2><p>Ölçü, kullanım ortamı ve şehrinizi paylaşarak teknik ön değerlendirme başlatabilirsiniz.</p><Link className="button" href="/iletisim#teklif">Teklif Bilgilerini Paylaşın</Link></div></article></div></div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </>;
}
