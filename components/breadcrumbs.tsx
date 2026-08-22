import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import type { LinkItem } from "@/lib/types";

/**
 * Sayfa yolu ve BreadcrumbList şeması tek yerden üretilir; sayfalar ayrıca
 * BreadcrumbList basmamalıdır (aynı sayfada iki şema çakışır).
 * `trail`, Ana Sayfa ile mevcut sayfa arasındaki ara seviyeleri taşır.
 */
export function Breadcrumbs({ current, slug, trail = [] }: { current: string; slug: string; trail?: LinkItem[] }) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
    ...trail.map((step, index) => ({ "@type": "ListItem", position: index + 2, name: step.label, item: absoluteUrl(step.href) })),
    { "@type": "ListItem", position: trail.length + 2, name: current, item: absoluteUrl(`/${slug}`) },
  ];
  const data = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
  return <>
    <nav className="breadcrumbs" aria-label="Sayfa yolu">
      <Link href="/">Ana Sayfa</Link>
      {trail.map((step) => <span key={step.href} className="breadcrumb-step"><span aria-hidden="true">/</span><Link href={step.href}>{step.label}</Link></span>)}
      <span aria-hidden="true">/</span><span aria-current="page">{current}</span>
    </nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  </>;
}
