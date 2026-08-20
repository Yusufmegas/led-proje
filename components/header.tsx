import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { MobileNav } from "@/components/mobile-nav";
import { productLinks, serviceLinks, solutionGroups } from "@/lib/navigation";
import { site } from "@/lib/site";

function Menu({ label, links }: { label: string; links: { href: string; label: string }[] }) {
  return <div className="nav-group"><button type="button">{label}<span aria-hidden="true">⌄</span></button><div className="mega-panel">{links.map((x) => <Link key={x.href} href={x.href}>{x.label}<span>→</span></Link>)}</div></div>;
}

function SolutionsMenu() {
  return <div className="nav-group nav-group-wide"><button type="button">Çözümler<span aria-hidden="true">⌄</span></button><div className="mega-panel mega-panel-groups">{solutionGroups.map((group) => <section key={group.title}><h2>{group.title}</h2>{group.links.map((item) => <Link key={item.href} href={item.href}>{item.label}<span>→</span></Link>)}</section>)}</div></div>;
}

export function Header() {
  return <header className="site-header">
    <div className="utility"><div className="container"><span>{site.serviceArea}</span><a href={site.phoneHref}>{site.phoneDisplay}</a></div></div>
    <div className="container header-row">
      <BrandMark />
      <nav className="desktop-nav" aria-label="Ana navigasyon">
        <Menu label="LED Ekranlar" links={productLinks} />
        <SolutionsMenu />
        <Menu label="Hizmetler" links={serviceLinks} />
        <Link href="/projeler">Projeler</Link><Link href="/teknik-bilgi">Teknik Bilgi</Link><Link href="/hakkimizda">Hakkımızda</Link>
      </nav>
      <Link className="button button-small header-cta" href="/iletisim#teklif">Teklif Al</Link>
      <MobileNav />
    </div>
  </header>;
}
