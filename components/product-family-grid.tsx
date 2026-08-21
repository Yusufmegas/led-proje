import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/site";

const productFamilies = [
  { title: "İç Mekân LED Ekran", text: "Yakın izleme ve kontrollü ortam", href: "/ic-mekan-led-ekran", image: "/images/visual-v3/retail-led.webp", alt: "İç mekânda kullanılan geniş LED ekran yüzeyi" },
  { title: "Dış Mekân LED Ekran", text: "Yüksek parlaklık ve çevresel koruma", href: "/dis-mekan-led-ekran", image: "/images/visual-v3/facade-led.webp", alt: "Bina cephesine yerleştirilmiş dış mekân LED ekran" },
  { title: "Poster LED Ekran", text: "Dikey ve taşınabilir dijital iletişim", href: "/poster-led-ekran", image: "/images/visual-v3/poster-led.webp", alt: "Dikey gövdeli poster LED ekran" },
  { title: "Esnek LED Ekran", text: "Kavisli ve özel geometrili yüzeyler", href: "/esnek-led-ekran", image: "/images/visual-v3/curved-led.webp", alt: "Kavisli yüzeye uyarlanan esnek LED ekran" },
  { title: "Totem LED Ekran", text: "Bağımsız dış mekân görünürlüğü", href: "/totem-led-ekran", image: "/images/visual-v3/totem-led.webp", alt: "Bağımsız dikey dış mekân LED totem" },
  { title: "Kontrol Sistemleri", text: "Görüntü, veri ve yayın yönetimi", href: "/led-ekran-kontrol-sistemleri", image: "/images/visual-v3/service-led.webp", alt: "LED ekran kabinetinin arka yüzündeki teknik bileşenler" },
] as const;

export function ProductFamilyGrid() {
  return <div className="v4-product-grid">{productFamilies.map((item) => <Link className="v4-product-card" href={item.href} key={item.href}>
    <div className="v4-product-image"><Image src={assetPath(item.image)} alt={item.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" /></div>
    <div className="v4-product-copy"><h3>{item.title}</h3><p>{item.text}</p><span>Ürünü inceleyin <b aria-hidden="true">→</b></span></div>
  </Link>)}</div>;
}
