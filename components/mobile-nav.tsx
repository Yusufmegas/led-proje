"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { faqLink, productLinks, serviceLinks, solutionGroups } from "@/lib/navigation";
import { site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", close);
    document.body.classList.add("nav-open");
    return () => { document.removeEventListener("keydown", close); document.body.classList.remove("nav-open"); };
  }, [open]);
  return (
    <div className="mobile-nav">
      <button ref={buttonRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
        <span /><span /><span /><span className="sr-only">Menüyü aç</span>
      </button>
      {open && <div className="mobile-panel" id="mobile-menu">
        <BrandMark />
        <button className="mobile-close" onClick={() => { setOpen(false); buttonRef.current?.focus(); }} aria-label="Menüyü kapat">×</button>
        <nav aria-label="Mobil navigasyon">
          <details><summary>LED Ekranlar</summary><div>{productLinks.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}</div></details>
          <details><summary>Çözümler</summary>{solutionGroups.map((group) => <div className="mobile-nav-subgroup" key={group.title}><span>{group.title}</span>{group.links.map((item) => <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}</div>)}</details>
          <details><summary>Hizmetler</summary><div>{serviceLinks.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}</div></details>
          <Link href="/projeler" onClick={() => setOpen(false)}>Projeler</Link>
          <Link href="/teknik-bilgi" onClick={() => setOpen(false)}>Teknik Bilgi</Link>
          <Link href={faqLink.href} onClick={() => setOpen(false)}>{faqLink.label}</Link>
          <Link href="/hakkimizda" onClick={() => setOpen(false)}>Hakkımızda</Link>
          <Link className="mobile-offer" href="/iletisim#teklif" onClick={() => setOpen(false)}>Teklif Al</Link>
          <a className="mobile-phone" href={site.phoneHref}>{site.phoneDisplay}</a>
        </nav>
      </div>}
    </div>
  );
}
