import Link from "next/link";
import { DeferredImage } from "@/components/deferred-image";
import { altOf } from "@/lib/images";
import { productFamilies } from "@/lib/showcase";
import { assetPath } from "@/lib/site";

export function ProductFamilyGrid() {
  return <div className="v4-product-grid">{productFamilies.map((item) => <Link className="v4-product-card" href={item.href} key={item.href}>
    <div className="v4-product-image"><DeferredImage src={assetPath(item.image)} alt={altOf(item.image)} fill loading="lazy" fetchPriority="low" sizes="(max-width: 640px) 92vw, (max-width: 900px) 48vw, (max-width: 1400px) 33vw, 400px" /></div>
    <div className="v4-product-copy"><h3>{item.title}</h3><p>{item.text}</p><span>Ürünü inceleyin <b aria-hidden="true">→</b></span></div>
  </Link>)}</div>;
}
