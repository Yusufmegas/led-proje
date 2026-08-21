import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { cityLinks, faqLink, productLinks, serviceLinks, solutionLinks } from "@/lib/navigation";
import { site } from "@/lib/site";

const Column = ({ title, links }: { title: string; links: { href: string; label: string }[] }) => <div><h2>{title}</h2>{links.map((x) => <Link key={x.label} href={x.href}>{x.label}</Link>)}</div>;
const MobileColumn = ({ title, links }: { title: string; links: { href: string; label: string }[] }) => <details><summary>{title}</summary><div>{links.map((x) => <Link key={x.label} href={x.href}>{x.label}</Link>)}</div></details>;
export function Footer() {
  return <footer className="site-footer"><div className="container footer-grid"><div className="footer-about"><BrandMark /><p>Profesyonel LED ekran sistemleri için keşif, projelendirme, entegrasyon, montaj ve teknik servis.</p><a href={site.phoneHref}>{site.phoneDisplay}</a><p>{site.serviceArea}</p><a href={site.mapsUrl} target="_blank" rel="noreferrer">Google Maps’te yol tarifi alın</a></div><Column title="LED Ekranlar" links={productLinks} /><Column title="Çözümler" links={solutionLinks} /><Column title="Hizmetler" links={serviceLinks} /><Column title="Şehirler" links={cityLinks} /><Column title="Teknik Bilgi" links={[{ href: "/teknik-bilgi", label: "Teknik Bilgi Merkezi" }, faqLink, { href: "/led-ekran-fiyatlari", label: "Fiyat Rehberi" }, { href: "/led-ekran-metrekare-fiyati", label: "Alan Hesaplama" }]} /><Column title="Kurumsal" links={[{ href: "/hakkimizda", label: "Hakkımızda" }, { href: "/projeler", label: "Projeler" }, { href: "/iletisim", label: "İletişim" }]} /></div>
    <div className="container footer-mobile-nav"><MobileColumn title="LED Ekranlar" links={productLinks}/><MobileColumn title="Çözümler" links={solutionLinks}/><MobileColumn title="Hizmetler" links={serviceLinks}/><MobileColumn title="Şehirler" links={cityLinks}/><MobileColumn title="Teknik Bilgi" links={[{href:"/teknik-bilgi",label:"Teknik Bilgi Merkezi"},{href:"/led-ekran-fiyatlari",label:"Fiyat Rehberi"},{href:"/led-ekran-metrekare-fiyati",label:"Alan Hesaplama"}]}/><MobileColumn title="Kurumsal" links={[{href:"/hakkimizda",label:"Hakkımızda"},{href:"/projeler",label:"Projeler"},{href:"/iletisim",label:"İletişim"}]}/></div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} LEDProje</span><div><Link href="/kvkk">KVKK</Link><Link href="/gizlilik-politikasi">Gizlilik</Link><Link href="/cerez-politikasi">Çerezler</Link></div></div>
  </footer>;
}
