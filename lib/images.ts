import { productCategories } from "@/lib/products";
import { applications, heroSlideImages, integrationPanelImage, productFamilies, productUses } from "@/lib/showcase";

/**
 * Görsel alt metinlerinin tek kaynağı.
 *
 * Aynı dosya birden çok bileşende kullanılıyor (örn. facade-led hero karuselinde,
 * ürün ailesi kartında, uygulama kartında ve dört sayfanın hero'sunda). Metin her
 * kullanım yerinde ayrı yazıldığında aynı görsel farklı — ve bir kısmı yanlış —
 * anlatılıyordu. Kayıt src üzerinden tutulur; altOf() tanımsız bir kaynakta hata
 * fırlatır, dolayısıyla boş veya eksik alt metni build'i düşürür.
 *
 * Metinler görselin gerçekte ne gösterdiğini anlatır: kullanım alanı + ortam
 * (iç/dış mekân) + ürün tipi. Anahtar kelime tekrarı yapılmaz; "LED ekran" ifadesi
 * cümlede doğal olarak bir kez geçer.
 */
const imageAlts: Record<string, string> = {
  // Uygulama fotoğrafları
  "/images/visual-v3/retail-led.webp": "Mağaza satış alanında duvara gömülü geniş formatlı iç mekân LED ekran",
  "/images/visual-v3/mall-led.webp": "AVM atriyumunda tavandan asılı dikey panellerden oluşan iç mekân LED ekran kümesi",
  "/images/visual-v3/facade-led.webp": "Bina cephesini boydan boya kaplayan şeffaf dış mekân LED ekran uygulaması",
  "/images/visual-v3/auditorium-led.webp": "Konferans salonunda sahne arkasını kaplayan geniş kavisli iç mekân LED ekran duvarı",
  "/images/visual-v3/poster-led.webp": "Otel lobisinde ayaklı gövdeyle konumlandırılmış dikey poster LED ekran",
  "/images/visual-v3/curved-led.webp": "Showroom lobisinde kavisli duvara uyarlanmış esnek iç mekân LED ekran yüzeyi",
  "/images/visual-v3/totem-led.webp": "Ofis kampüsü meydanında bağımsız duran dikey dış mekân LED totem ekran",
  "/images/visual-v3/service-led.webp": "Teknisyenin açık LED ekran kabinetinde güç kaynağı ve alıcı kart bağlantılarını kontrol etmesi",
  "/images/visual-v8/arena-led.webp": "Spor arenasında sahaya asılı dört yüzlü skor küpü ve tribün şeridi LED ekran",
  "/images/visual-v8/hotel-led.webp": "Otel lobisinde resepsiyon bankosunun arkasını kaplayan geniş iç mekân LED ekran duvarı",
  "/images/visual-v8/plaza-led.webp": "Kent meydanında çelik taşıyıcı üzerinde yükseltilmiş büyük dış mekân LED ekran",
  "/images/visual-v8/stage-led.webp": "Açık hava konser sahnesinde arka fon ve yan kuleleri oluşturan LED ekran sistemi",
  // Yalnız geliştirme ortamındaki proje vitrini yer tutucularında kullanılır.
  "/images/visual-v5/mall-led-wall.webp": "AVM ortak alanında mimariye uyarlanmış geniş iç mekân LED ekran yüzeyi",
  "/images/visual-v7/arena-led.webp": "Spor arenasında tribün görüşüne göre planlanmış iç mekân LED ekran yerleşimi",
  "/images/visual-v7/stage-led.webp": "Sahne arkasını kaplayan geniş iç mekân LED ekran görüntü yüzeyi",
  // Standart rozetleri. Bunlar fotoğraf değil, scripts/build-certification-badges.mjs
  // ile çizilen işaretlerdir; alt metni rozetin temsil ettiği belgeyi adlandırır.
  "/images/standards/ce.svg": "CE uygunluk işareti",
  "/images/standards/iso9001.svg": "ISO 9001:2015 belgesi",
  "/images/standards/tse.svg": "TSE belgesi",
  "/images/standards/rohs.svg": "RoHS uygunluk",
  "/images/standards/emc.svg": "EMC uygunluk",
  "/images/standards/ip65.svg": "IP65 koruma sınıfı",
};

export function altOf(src: string): string {
  const alt = imageAlts[src];
  if (!alt) throw new Error(`lib/images.ts: "${src}" için alt metni tanımlı değil.`);
  return alt;
}

/**
 * Sayfa hero görselleri.
 *
 * UYARI: hero kullanan 18 sayfa 9 görseli paylaşıyor. Kalan tekrarlar: service ×5
 * (montaj + bakım + teknik servis + kontrol + fiyatlandırma), facade ×4 (dış cephe +
 * keşif + P5 + P10), auditorium ×2 (iç mekân + metrekare fiyatı), mall ×2 (AVM +
 * ürün merkezi). Bunlar asset yetersizliğinden kaynaklanır; gerçek proje fotoğrafları
 * eklendiğinde her sayfa kendi görseline ayrılmalıdır.
 */
const heroImages: Record<string, string> = {
  "poster-led-ekran": "/images/visual-v3/poster-led.webp",
  "esnek-led-ekran": "/images/visual-v3/curved-led.webp",
  "totem-led-ekran": "/images/visual-v3/totem-led.webp",
  "avm-led-ekran": "/images/visual-v3/mall-led.webp",
  // retail-led yalnız mağaza sayfasına ayrıldı; iç mekân sayfası kurumsal salon
  // görseline geçti (hem çakışma gider hem semantik olarak daha doğru).
  "magaza-led-ekran": "/images/visual-v3/retail-led.webp",
  "ic-mekan-led-ekran": "/images/visual-v3/auditorium-led.webp",
  "led-ekranlar": "/images/visual-v3/mall-led.webp",
  // Dış mekân ile dış cephe aynı görseli paylaşıyordu; ayrıştırıldı.
  "dis-cephe-led-ekran": "/images/visual-v3/facade-led.webp",
  // Dış mekân ürün sayfasında iç mekân kavisli duvar görseli kullanılmaz. visual-v8 meydan
  // görseli cepheden ayrıştırır: dış cephe = bina yüzeyi, dış mekân = serbest duran ekran.
  "dis-mekan-led-ekran": "/images/visual-v8/plaza-led.webp",
  // Hizmet sayfalarında hiç görsel yoktu.
  // Dört teknik/hizmet sayfası aynı tekniker görselini paylaşır: 8 stok görselle
  // tekrar kaçınılmaz olduğu için tekrarlar rastgele değil tematik olarak gruplandı.
  "led-ekran-kesif-projelendirme": "/images/visual-v3/facade-led.webp",
  "led-ekran-montaji": "/images/visual-v3/service-led.webp",
  "led-ekran-bakim-onarim": "/images/visual-v3/service-led.webp",
  "led-ekran-teknik-servis": "/images/visual-v3/service-led.webp",
  // Fiyat sayfalarında daha önce hiç görsel yoktu; Google Görseller'de "led ekran
  // fiyatı" aramaları için bu iki sayfa görselsiz kalıyordu. Alt metinleri fiyat
  // bağlamını anlatır ama hiçbir rakam veya fiyat iddiası içermez.
  "led-ekran-fiyatlari": "/images/visual-v3/service-led.webp",
  "led-ekran-metrekare-fiyati": "/images/visual-v3/auditorium-led.webp",
};

/**
 * Hero görselinin alt metnini sayfa bağlamına göre değiştiren sayfalar. Kayıtta
 * olmayan sayfalar altOf() ile görselin kendi tarifini kullanır.
 */
const heroImageAlts: Record<string, string> = {
  "led-ekran-fiyatlari": "Proje kapsamına göre değişen LED ekran maliyet kalemlerini oluşturan kabinet ve kontrol bileşenleri",
  "led-ekran-metrekare-fiyati": "LED ekran metrekare fiyatını etkileyen ekran ölçüsü ve piksel aralığı ilişkisi",
};

export function heroImageFor(slug: string): { src: string; alt: string } | undefined {
  const mapped = heroImages[slug];
  const isOutdoor = slug.includes("dis-") || ["p5-led-ekran", "p10-led-ekran", "totem-led-ekran"].includes(slug);
  const src = mapped ?? (slug.includes("kontrol") ? "/images/visual-v3/service-led.webp" : isOutdoor ? "/images/visual-v3/facade-led.webp" : undefined);
  if (!src) return undefined;
  return { src, alt: heroImageAlts[slug] ?? altOf(src) };
}

/**
 * Sayfada gerçekten render edilen görseller — app/sitemap.ts görsel uzantısı bunu
 * kullanır. SVG rozetleri dışarıda bırakılır: Google Görseller SVG'yi indekslemez.
 */
export function imagesForSlug(slug: string): string[] {
  const collected: string[] = [];
  if (slug === "") {
    collected.push(...heroSlideImages, ...productFamilies.map((item) => item.image), ...applications.map((item) => item.image));
  } else if (slug === "urunler") {
    collected.push(...productCategories.map((item) => item.image));
  } else if (slug.startsWith("urunler/")) {
    const category = productCategories.find((item) => item.slug === slug.slice("urunler/".length));
    if (category) collected.push(category.image);
  } else {
    const hero = heroImageFor(slug);
    if (hero) collected.push(hero.src);
    if (slug === "led-ekranlar") collected.push(...productFamilies.map((item) => item.image));
    if (productUses[slug]) collected.push(integrationPanelImage);
  }
  return [...new Set(collected)].filter((src) => !src.endsWith(".svg"));
}
