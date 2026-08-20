import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
export function Breadcrumbs({ current, slug }: { current: string; slug: string }) {
  const data = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") }, { "@type": "ListItem", position: 2, name: current, item: absoluteUrl(`/${slug}`) }] };
  return <><nav className="breadcrumbs" aria-label="Sayfa yolu"><Link href="/">Ana Sayfa</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span></nav><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} /></>;
}
