import Link from "next/link";
import { DeferredImage } from "@/components/deferred-image";
import { assetPath } from "@/lib/site";

const applications = [
  { title: "Mağaza ve perakende", text: "Vitrin ve satış alanlarında kampanya görünürlüğünü güçlendiren ekran yerleşimleri.", href: "/magaza-led-ekran", image: "/images/visual-v3/retail-led.webp", alt: "Mağaza satış alanındaki geniş LED ekran yüzeyi" },
  { title: "AVM ortak alanları", text: "Geniş dolaşım alanlarında uzaktan fark edilen mimari ekran çözümleri.", href: "/avm-led-ekran", image: "/images/visual-v3/mall-led.webp", alt: "Alışveriş merkezi ortak alanındaki büyük LED ekran yüzeyi" },
  { title: "Showroom", text: "Ürün ve marka sunumunu mekânın odağına taşıyan geniş görüntü yüzeyleri.", href: "/magaza-led-ekran", image: "/images/visual-v3/poster-led.webp", alt: "Showroom girişindeki dikey poster LED ekran" },
  { title: "Kurumsal ofis ve lobi", text: "Karşılama ve kurumsal iletişim için mimariye uyarlanan LED ekranlar.", href: "/ic-mekan-led-ekran", image: "/images/visual-v3/curved-led.webp", alt: "Kurumsal alandaki kavisli LED ekran" },
  { title: "Toplantı ve konferans salonları", text: "Sunumların salon genelinde net izlenmesini sağlayan kesintisiz görüntü yüzeyi.", href: "/ic-mekan-led-ekran", image: "/images/visual-v3/auditorium-led.webp", alt: "Konferans salonundaki geniş LED video duvarı" },
  { title: "Otel ve etkinlik alanları", text: "Karşılama, yönlendirme ve program iletişimi için projeye özel ekran yerleşimi.", href: "/ic-mekan-led-ekran", image: "/images/visual-v8/hotel-led.webp", alt: "Otel lobisinde resepsiyon arkasına yerleştirilmiş geniş LED ekran duvarı" },
  // Tanınabilir üçüncü taraf tesis görseli yerine visual-v8 arena karesi kullanılır;
  // auditorium-led ile paylaşılan kare de böylece ayrıştı.
  { title: "Spor salonu ve arena", text: "Tribün görüşüne göre planlanan skor ve yayın ekranları.", href: "/led-ekranlar", image: "/images/visual-v8/arena-led.webp", alt: "Spor arenasında sahanın üzerine asılmış dört yüzlü skor ekranı ve tribün çevresindeki şerit LED ekran" },
  { title: "Sahne ve organizasyon", text: "Sahne akışını destekleyen geniş ve etkili görüntü yüzeyleri.", href: "/ic-mekan-led-ekran", image: "/images/visual-v8/stage-led.webp", alt: "Açık hava konser sahnesinde kule ekranlarla birleşen geniş LED görüntü yüzeyi" },
  { title: "Bina cephesi", text: "Cephe, taşıyıcı yapı ve bakım erişimi birlikte projelendirilen dış mekân ekranları.", href: "/dis-cephe-led-ekran", image: "/images/visual-v3/facade-led.webp", alt: "Bina cephesine uygulanmış büyük LED ekran" },
  { title: "Açık alan ve meydan", text: "Gün ışığı ve izleme mesafesine göre planlanan dış mekân görünürlüğü.", href: "/dis-mekan-led-ekran", image: "/images/visual-v8/plaza-led.webp", alt: "Kent meydanında çelik ayaklar üzerinde duran büyük dış mekân LED ekran" },
  { title: "Totem ve giriş alanları", text: "Bağımsız konumda dikey iletişim sağlayan LED totem çözümleri.", href: "/totem-led-ekran", image: "/images/visual-v3/totem-led.webp", alt: "Giriş alanında konumlandırılmış dikey LED totem" },
  { title: "Kontrol merkezi ve izleme odası", text: "Birden fazla veri kaynağını tek görüntü yüzeyinde izlemeye uygun sistem yaklaşımı.", href: "/led-ekran-kontrol-sistemleri", image: "/images/visual-v3/service-led.webp", alt: "Kontrol ve izleme altyapısının teknik bileşenleri" },
] as const;

export function ApplicationGrid() {
  return <div className="v5-application-grid">{applications.map((item) => <Link href={item.href} key={item.title}>
    <div><DeferredImage src={assetPath(item.image)} alt={item.alt} fill loading="lazy" fetchPriority="low" sizes="(max-width: 640px) 92vw, (max-width: 1100px) 34vw, (max-width: 1400px) 22vw, 300px" /></div><span><h3>{item.title}</h3><p>{item.text}</p><b>Çözümü inceleyin →</b></span>
  </Link>)}</div>;
}
