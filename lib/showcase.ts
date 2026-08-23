/**
 * Ana sayfa ve ürün merkezi vitrinlerinin veri kaynağı.
 *
 * Bu diziler daha önce ilgili bileşenlerin içinde duruyordu. app/sitemap.ts görsel
 * uzantısını (`<image:image>`) üretmek için aynı listelere ihtiyaç duyuyor; bileşen
 * dosyasından import etmek sitemap'e istemci bileşeni bağımlılığı taşıyacağı için
 * veri buraya alındı. Alt metinler burada tutulmaz — tek kaynakları lib/images.ts.
 */

/** Ana sayfa hero karuseli. İlk kare LCP görselidir; sırası performansı etkiler. */
export const heroSlideImages = [
  "/images/visual-v3/facade-led.webp",
  "/images/visual-v3/auditorium-led.webp",
  "/images/visual-v3/mall-led.webp",
  "/images/visual-v3/retail-led.webp",
  "/images/visual-v3/totem-led.webp",
] as const;

export type ShowcaseItem = { title: string; text: string; href: string; image: string };

export const productFamilies: readonly ShowcaseItem[] = [
  { title: "İç Mekân LED Ekran", text: "Yakın izleme ve kontrollü ortam", href: "/ic-mekan-led-ekran", image: "/images/visual-v3/retail-led.webp" },
  { title: "Dış Mekân LED Ekran", text: "Yüksek parlaklık ve çevresel koruma", href: "/dis-mekan-led-ekran", image: "/images/visual-v3/facade-led.webp" },
  { title: "Poster LED Ekran", text: "Dikey ve taşınabilir dijital iletişim", href: "/poster-led-ekran", image: "/images/visual-v3/poster-led.webp" },
  { title: "Esnek LED Ekran", text: "Kavisli ve özel geometrili yüzeyler", href: "/esnek-led-ekran", image: "/images/visual-v3/curved-led.webp" },
  { title: "Totem LED Ekran", text: "Bağımsız dış mekân görünürlüğü", href: "/totem-led-ekran", image: "/images/visual-v3/totem-led.webp" },
  { title: "Kontrol Sistemleri", text: "Görüntü, veri ve yayın yönetimi", href: "/led-ekran-kontrol-sistemleri", image: "/images/visual-v3/service-led.webp" },
];

export const applications: readonly ShowcaseItem[] = [
  { title: "Mağaza ve perakende", text: "Vitrin ve satış alanlarında kampanya görünürlüğünü güçlendiren ekran yerleşimleri.", href: "/magaza-led-ekran", image: "/images/visual-v3/retail-led.webp" },
  { title: "AVM ortak alanları", text: "Geniş dolaşım alanlarında uzaktan fark edilen mimari ekran çözümleri.", href: "/avm-led-ekran", image: "/images/visual-v3/mall-led.webp" },
  { title: "Showroom", text: "Ürün ve marka sunumunu mekânın odağına taşıyan geniş görüntü yüzeyleri.", href: "/magaza-led-ekran", image: "/images/visual-v3/poster-led.webp" },
  { title: "Kurumsal ofis ve lobi", text: "Karşılama ve kurumsal iletişim için mimariye uyarlanan LED ekranlar.", href: "/ic-mekan-led-ekran", image: "/images/visual-v3/curved-led.webp" },
  { title: "Toplantı ve konferans salonları", text: "Sunumların salon genelinde net izlenmesini sağlayan kesintisiz görüntü yüzeyi.", href: "/ic-mekan-led-ekran", image: "/images/visual-v3/auditorium-led.webp" },
  { title: "Otel ve etkinlik alanları", text: "Karşılama, yönlendirme ve program iletişimi için projeye özel ekran yerleşimi.", href: "/ic-mekan-led-ekran", image: "/images/visual-v8/hotel-led.webp" },
  // Tanınabilir üçüncü taraf tesis görseli yerine visual-v8 arena karesi kullanılır;
  // auditorium-led ile paylaşılan kare de böylece ayrıştı.
  { title: "Spor salonu ve arena", text: "Tribün görüşüne göre planlanan skor ve yayın ekranları.", href: "/led-ekranlar", image: "/images/visual-v8/arena-led.webp" },
  { title: "Sahne ve organizasyon", text: "Sahne akışını destekleyen geniş ve etkili görüntü yüzeyleri.", href: "/ic-mekan-led-ekran", image: "/images/visual-v8/stage-led.webp" },
  { title: "Bina cephesi", text: "Cephe, taşıyıcı yapı ve bakım erişimi birlikte projelendirilen dış mekân ekranları.", href: "/dis-cephe-led-ekran", image: "/images/visual-v3/facade-led.webp" },
  { title: "Açık alan ve meydan", text: "Gün ışığı ve izleme mesafesine göre planlanan dış mekân görünürlüğü.", href: "/dis-mekan-led-ekran", image: "/images/visual-v8/plaza-led.webp" },
  { title: "Totem ve giriş alanları", text: "Bağımsız konumda dikey iletişim sağlayan LED totem çözümleri.", href: "/totem-led-ekran", image: "/images/visual-v3/totem-led.webp" },
  { title: "Kontrol merkezi ve izleme odası", text: "Birden fazla veri kaynağını tek görüntü yüzeyinde izlemeye uygun sistem yaklaşımı.", href: "/led-ekran-kontrol-sistemleri", image: "/images/visual-v3/service-led.webp" },
];

/**
 * ContentEnhancements'ta "ürün seçimi" modülünü ve onunla gelen entegrasyon görselini
 * tetikleyen sayfalar. Sitemap görsel listesi de bu anahtarları okur.
 */
export const productUses: Record<string, string[]> = {
  "led-ekranlar": ["Kurumsal sunum", "Perakende iletişimi", "Mimari görünürlük"],
  "ic-mekan-led-ekran": ["Mağaza ve showroom", "Ofis ve lobi", "Toplantı salonu"],
  "dis-mekan-led-ekran": ["Bina cephesi", "Açık alan", "Giriş ve yönlendirme"],
  "poster-led-ekran": ["Vitrin", "Fuaye", "Dikey kampanya iletişimi"],
  "esnek-led-ekran": ["Kavisli yüzey", "Kolon çevresi", "Özel geometriler"],
  "totem-led-ekran": ["Giriş alanı", "Açık alan", "Bağımsız dikey yüzey"],
  "led-ekran-kontrol-sistemleri": ["Canlı görüntü", "Planlı yayın", "Çoklu kaynak yönetimi"],
};

/** ContentEnhancements'taki entegrasyon panelinin görseli. */
export const integrationPanelImage = "/images/visual-v3/service-led.webp";
