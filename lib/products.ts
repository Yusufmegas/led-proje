import type { SpecRow } from "@/lib/types";

/**
 * Ürün kategorileri ve teknik künyeleri. Tüm değerler teknik bilgi dosyasındaki
 * tablolardan birebir alınmıştır; dosyada bulunmayan hiçbir alan tahminle
 * doldurulmamıştır.
 *
 * VERİ MODELİ: kaynak tablolar iki katmanlı. Parlaklık, tazeleme, koruma sınıfı,
 * modül/kabin ve kontrol bilgisi kategori düzeyinde ("Ortak Özellikler") verilir;
 * piksel aralığı, piksel yapısı, piksel yoğunluğu ve ideal izleme mesafesi ise her
 * pitch satırında ayrı ayrı bulunur. Bu yüzden kategori alanları `ProductCategory`,
 * satır alanları `ProductVariant` içinde tutulur.
 *
 * EKSİK ALANLAR: Poster tablosunda piksel yoğunluğu ve ideal izleme mesafesi yerine
 * "Tipik Ölçü" sütunu vardır; Esnek ve Çift Taraflı/Totem için kaynakta satır bazlı
 * tablo yoktur, yalnız pitch seçenekleri verilmiştir. Bu alanlar `undefined` bırakılır
 * ve render eden bileşenler boş alanı hiç basmaz.
 */

export type ProductVariant = {
  pixelPitch: string;
  pixelStructure?: string;
  pixelDensity?: string;
  viewingDistance?: string;
  typicalSize?: string;
  usage?: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
  shortName: string;
  category: "İç mekân" | "Dış mekân";
  description: string;
  /** Kart üzerinde gösterilen pitch aralığı özeti. */
  pitchRange: string;
  /** Kartta gösterilen 3 öne çıkan özellik. */
  highlights: [string, string, string];
  brightness?: string;
  refreshRate?: string;
  protection?: string;
  variants: ProductVariant[];
  /** Kaynak tablodaki değişken sütun başlığı (Poster'da "Tipik Ölçü"). */
  variantColumn: "density" | "size";
  /** Satır tablosu eksikse nedenini/yönlendirmeyi açıklar. */
  variantNote?: string;
  commonSpecs: SpecRow[];
  useCases: string[];
  control?: string;
  image: string;
  /** Aynı konuyu uygulama tarafından ele alan mevcut çözüm sayfası. */
  relatedPage: { href: string; label: string };
};

const WARRANTY = "2 yıl garanti · uzaktan teknik destek · yedek modül/kablo · imalat atölyesinde onarım";

export const productCategories: ProductCategory[] = [
  {
    slug: "ic-mekan",
    name: "İç Mekân (Indoor) LED Ekran",
    shortName: "İç Mekân LED Ekran",
    category: "İç mekân",
    description: "Mağaza, showroom, toplantı/konferans salonu, otel lobisi, stüdyo gibi kapalı alanlar için yüksek çözünürlüklü, düşük parlaklıklı ekranlar.",
    pitchRange: "P1.53 – P4",
    highlights: ["Parlaklık ≥ 750 nit", "Tazeleme 3840 Hz (ops. 6000 Hz)", "Görüş açısı 160°/160°"],
    brightness: "≥ 750 nit",
    refreshRate: "3840 Hz (ops. 6000 Hz)",
    variantColumn: "density",
    variants: [
      { pixelPitch: "P1.53", pixelStructure: "GOB / SMD1415", pixelDensity: "≈ 427.000 px/m²", viewingDistance: "1,5 m ve üzeri", usage: "Yakın izleme, stüdyo, VIP" },
      { pixelPitch: "P1.86", pixelStructure: "SMD1415", pixelDensity: "≈ 289.000 px/m²", viewingDistance: "1,9 m ve üzeri", usage: "Toplantı, showroom, lobi" },
      { pixelPitch: "P2.5", pixelStructure: "SMD1415", pixelDensity: "160.000 px/m²", viewingDistance: "2,5 m ve üzeri", usage: "Mağaza, showroom, salon" },
      { pixelPitch: "P3", pixelStructure: "SMD1415", pixelDensity: "≈ 111.000 px/m²", viewingDistance: "3 m ve üzeri", usage: "Geniş salon, sahne arkası" },
      { pixelPitch: "P4", pixelStructure: "SMD1921", pixelDensity: "62.500 px/m²", viewingDistance: "4 m ve üzeri", usage: "Büyük iç mekân alanları" },
    ],
    commonSpecs: [
      { label: "Ortak özellikler", value: "Parlaklık ≥ 750 nit · Tazeleme 3840 Hz (ops. 6000 Hz) · Gri skala 16 bit · Görüş açısı 160°/160°" },
      { label: "LED / Sürücü", value: "Nationstar / Kinglight LED · Chipone / Macroblock sürücü IC" },
      { label: "Modül / Kabin", value: "320 × 160 mm modül · alüminyum kabin · ön veya arka bakım · ömür ≈ 100.000 saat" },
      { label: "Kontrol", value: "Colorlight gönderici + alıcı kart · PlayerMaster yazılımı · HDMI / senkron / uzaktan yönetim" },
      { label: "Garanti", value: WARRANTY },
    ],
    useCases: ["Mağaza", "Showroom", "Toplantı ve konferans salonu", "Otel lobisi", "Stüdyo"],
    control: "Colorlight gönderici + alıcı kart · PlayerMaster yazılımı · HDMI / senkron / uzaktan yönetim",
    image: "/images/visual-v8/hotel-led.webp",
    relatedPage: { href: "/ic-mekan-led-ekran", label: "İç mekân LED ekran çözümleri" },
  },
  {
    slug: "dis-mekan",
    name: "Dış Mekân (Outdoor) LED Ekran",
    shortName: "Dış Mekân LED Ekran",
    category: "Dış mekân",
    description: "Bina cephesi, totem, meydan, cadde, saha kenarı gibi açık alanlar için yüksek parlaklıklı, su/toz korumalı (IP65) ekranlar.",
    pitchRange: "P2.5 – P10",
    highlights: ["Parlaklık ≥ 5.500–6.500 nit", "Ön IP65 / arka IP54 koruma", "Çalışma -20°C ~ +60°C"],
    brightness: "≥ 5.500–6.500 nit",
    refreshRate: "3840 Hz",
    protection: "Ön IP65 / arka IP54",
    variantColumn: "density",
    variants: [
      { pixelPitch: "P2.5", pixelStructure: "SMD1415", pixelDensity: "160.000 px/m²", viewingDistance: "2,5 m ve üzeri", usage: "Yakın dış mekân, vitrin" },
      { pixelPitch: "P3", pixelStructure: "SMD1415", pixelDensity: "≈ 111.000 px/m²", viewingDistance: "3 m ve üzeri", usage: "Cephe, mağaza dışı" },
      { pixelPitch: "P4", pixelStructure: "SMD1921", pixelDensity: "62.500 px/m²", viewingDistance: "4 m ve üzeri", usage: "Cephe, totem, tabela" },
      { pixelPitch: "P5", pixelStructure: "SMD1921", pixelDensity: "40.000 px/m²", viewingDistance: "5 m ve üzeri", usage: "Totem, meydan, cadde" },
      { pixelPitch: "P10", pixelStructure: "SMD", pixelDensity: "10.000 px/m²", viewingDistance: "10 m ve üzeri", usage: "Otoyol, uzak mesafe" },
    ],
    commonSpecs: [
      { label: "Ortak özellikler", value: "Parlaklık ≥ 5.500–6.500 nit · Tazeleme 3840 Hz · Koruma ön IP65 / arka IP54 · Çalışma -20°C ~ +60°C" },
      { label: "LED / Sürücü", value: "Nationstar / Kinglight (altın tel) · Chipone / Macroblock sürücü IC" },
      { label: "Modül / Kabin", value: "320 × 160 mm modül · CNC sac / alüminyum kabin · ön bakım · ömür ≈ 100.000 saat" },
      { label: "Kontrol", value: "Colorlight gönderici + alıcı kart · senkron / asenkron · uzaktan (bulut) yönetim (4G/Wi-Fi ops.)" },
      { label: "Garanti", value: WARRANTY },
    ],
    useCases: ["Bina cephesi", "Totem", "Meydan", "Cadde", "Saha kenarı"],
    control: "Colorlight gönderici + alıcı kart · senkron / asenkron · uzaktan (bulut) yönetim (4G/Wi-Fi ops.)",
    image: "/images/visual-v3/facade-led.webp",
    relatedPage: { href: "/dis-mekan-led-ekran", label: "Dış mekân LED ekran çözümleri" },
  },
  {
    slug: "poster-led",
    name: "Poster LED Ekran",
    shortName: "Poster LED Ekran",
    category: "İç mekân",
    description: "Mağaza, AVM, otel ve showroom girişleri için dikey, ince kasalı, tak-çalıştır dijital poster ekranlar. Ayaklı veya duvar tipi.",
    pitchRange: "P1.86 – P3",
    highlights: ["İç mekân · Parlaklık ≥ 750 nit", "İnce alüminyum poster kasa", "Ayaklı veya duvar montajı"],
    brightness: "≥ 750 nit",
    variantColumn: "size",
    variants: [
      { pixelPitch: "P1.86", pixelStructure: "SMD1415", typicalSize: "64 × 192 cm (dikey)", usage: "Yakın izleme, VIP giriş" },
      { pixelPitch: "P2.5", pixelStructure: "SMD1415", typicalSize: "80 × 160 / 64 × 192 cm", usage: "Mağaza / AVM girişi" },
      { pixelPitch: "P3", pixelStructure: "SMD1415", typicalSize: "standart dikey", usage: "Genel tanıtım" },
    ],
    commonSpecs: [
      { label: "Özellikler", value: "İç mekân · Parlaklık ≥ 750 nit · ince alüminyum poster kasa · ayaklı/duvar montajı" },
      { label: "Kontrol", value: "Dahili oynatıcı / asenkron kart · USB veya HDMI ile içerik · uzaktan yönetim (ops.)" },
      { label: "Avantaj", value: "Tak-çalıştır, taşınabilir, dekoratif ince kasa, hızlı kurulum" },
      { label: "Garanti", value: WARRANTY },
    ],
    useCases: ["Mağaza girişi", "AVM girişi", "Otel", "Showroom"],
    control: "Dahili oynatıcı / asenkron kart · USB veya HDMI ile içerik · uzaktan yönetim (ops.)",
    image: "/images/visual-v3/poster-led.webp",
    relatedPage: { href: "/poster-led-ekran", label: "Poster LED ekran çözümleri" },
  },
  {
    slug: "esnek-led",
    name: "Esnek (Flexible) LED Ekran",
    shortName: "Esnek LED Ekran",
    category: "İç mekân",
    description: "Kavisli, silindirik veya dalgalı yüzeyler için esnek PCB tabanlı modüller. Sütun kaplama, kavisli duvar, dekoratif uygulamalar.",
    pitchRange: "P1.86 · P2.5",
    highlights: ["Esnek PCB tabanlı modül", "Kavisli / eğimli montaj", "Mıknatıslı montaj (ops.)"],
    variantColumn: "density",
    variantNote: "Kaynak teknik dosyada esnek ürün ailesi için satır bazlı piksel yoğunluğu ve izleme mesafesi tablosu bulunmamaktadır; yalnız piksel seçenekleri tanımlıdır.",
    variants: [
      { pixelPitch: "P1.86", pixelStructure: "esnek/düz veya GOB-esnek" },
      { pixelPitch: "P2.5", pixelStructure: "esnek/düz veya GOB-esnek" },
    ],
    commonSpecs: [
      { label: "Piksel seçenekleri", value: "P1.86 · P2.5 (iç mekân, esnek/düz veya GOB-esnek)" },
      { label: "Özellikler", value: "Esnek PCB · kavisli/eğimli montaj · kavisli taşıyıcı kasa (mıknatıslı montaj ops.)" },
      { label: "Kullanım", value: "Sütun/kolon kaplama, kavisli duvar, mağaza vitrini, dekoratif alanlar" },
      { label: "Garanti", value: WARRANTY },
    ],
    useCases: ["Sütun ve kolon kaplama", "Kavisli duvar", "Mağaza vitrini", "Dekoratif alanlar"],
    image: "/images/visual-v3/curved-led.webp",
    relatedPage: { href: "/esnek-led-ekran", label: "Esnek LED ekran çözümleri" },
  },
  {
    slug: "cift-tarafli-totem",
    name: "Çift Taraflı / Totem LED Ekran",
    shortName: "Çift Taraflı / Totem",
    category: "Dış mekân",
    description: "İki yüzlü, sırt sırta panel yapısıyla direk veya totem üzerine monte edilen dış mekân ekranları. İki yüz bağımsız ya da senkron çalışabilir.",
    pitchRange: "P3 · P4 · P5",
    highlights: ["İki yüzlü sırt sırta panel", "Bağımsız veya senkron içerik", "Direk / totem üzerine montaj"],
    variantColumn: "density",
    variantNote: "Kaynak teknik dosyada bu ürün ailesi için piksel seçenekleri dış mekân P3 / P4 / P5 olarak tanımlanır; satır bazlı yoğunluk ve izleme mesafesi değerleri dış mekân tablosunda yer alır.",
    variants: [
      { pixelPitch: "P3" },
      { pixelPitch: "P4" },
      { pixelPitch: "P5" },
    ],
    commonSpecs: [
      { label: "Yapı", value: "İki yüzlü (çift taraflı) — sırt sırta panel; direk/totem üzerine montaj" },
      { label: "Çalışma", value: "İki yüz bağımsız (farklı içerik) veya senkron (aynı içerik)" },
      { label: "Piksel", value: "Dış mekân P3 / P4 / P5 (yer ve mesafeye göre)" },
      { label: "Kullanım", value: "Cadde/AVM totem tabela, yön/ilan panosu, istasyon" },
      { label: "Garanti", value: WARRANTY },
    ],
    useCases: ["Cadde totem tabela", "AVM totem", "Yön ve ilan panosu", "İstasyon"],
    image: "/images/visual-v3/totem-led.webp",
    relatedPage: { href: "/totem-led-ekran", label: "Totem LED ekran çözümleri" },
  },
];

/** Tüm kategorilerde ortak olan kontrol sistemi bilgisi. */
export const controlSystems: SpecRow[] = [
  { label: "Kontrol kartları", value: "Colorlight A35 / A60 / A200 / A500 gönderici · E120 alıcı · X-serisi processor" },
  { label: "Colorlight A500", value: "1U cihaz · 3× HDMI girişi (ön panelden seçmeli) · 8× RJ45 çıkış · Wi-Fi · senkron/asenkron" },
  { label: "Görüntü / Yazılım", value: "HDMI kaynak · PlayerMaster / LEDVISION · uzaktan (bulut) içerik ve parlaklık yönetimi" },
];

export const warranty = WARRANTY;

export const productCategoryMap = new Map(productCategories.map((item) => [item.slug, item]));
