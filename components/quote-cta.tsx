import Link from "next/link";
import { whatsappUrl } from "@/lib/site";
export function QuoteCta({ title = "Projenizin teknik kapsamını birlikte netleştirelim.", city }: { title?: string; city?: string }) {
  return <div className="cta-band"><div><span className="eyebrow light">Teknik ön değerlendirme</span><h2>{title}</h2><p>Ölçü, kullanım alanı ve şehrinizi paylaşın; doğru sistem kapsamını oluşturalım.</p></div><div className="button-row"><Link className="button" href="/iletisim#teklif">Teklif Al</Link><a className="button button-secondary" href={whatsappUrl({ city })} target="_blank" rel="noreferrer">WhatsApp</a></div></div>;
}
