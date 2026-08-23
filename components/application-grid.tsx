import Link from "next/link";
import { DeferredImage } from "@/components/deferred-image";
import { altOf } from "@/lib/images";
import { applications } from "@/lib/showcase";
import { assetPath } from "@/lib/site";

export function ApplicationGrid() {
  return <div className="v5-application-grid">{applications.map((item) => <Link href={item.href} key={item.title}>
    <div><DeferredImage src={assetPath(item.image)} alt={altOf(item.image)} fill loading="lazy" fetchPriority="low" sizes="(max-width: 640px) 92vw, (max-width: 1100px) 34vw, (max-width: 1400px) 22vw, 300px" /></div><span><h3>{item.title}</h3><p>{item.text}</p><b>Çözümü inceleyin →</b></span>
  </Link>)}</div>;
}
