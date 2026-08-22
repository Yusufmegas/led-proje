import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { controlSystems, productCategories, productCategoryMap, warranty } from "@/lib/products";
import { absoluteUrl, assetPath, isNoindexDeployment, site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return productCategories.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = productCategoryMap.get(slug);
  if (!item) return {};
  const title = `${item.shortName} Teknik Özellikleri`;
  const description = `${item.shortName} teknik künyesi: ${item.pitchRange} piksel aralığı, ${item.highlights[0].toLocaleLowerCase("tr-TR")}, modül ve kabin yapısı, kontrol sistemi ve garanti kapsamı.`;
  return {
    title,
    description,
    alternates: { canonical: `/urunler/${slug}` },
    robots: isNoindexDeployment ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { title: `${title} | ${site.name}`, description, url: absoluteUrl(`/urunler/${slug}`), type: "website" },
  };
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = productCategoryMap.get(slug);
  if (!item) notFound();

  const showSize = item.variantColumn === "size";
  const hasDensity = item.variants.some((v) => v.pixelDensity);
  const hasDistance = item.variants.some((v) => v.viewingDistance);
  const hasStructure = item.variants.some((v) => v.pixelStructure);
  const hasUsage = item.variants.some((v) => v.usage);

  return <>
    <header className="page-hero"><div className="container page-hero-grid">
      <div>
        <Breadcrumbs current={item.shortName} slug={`urunler/${slug}`} trail={[{ href: "/urunler", label: "Ürünler" }]} />
        <span className="eyebrow">{item.category} · kendi imalatımız</span>
        <h1>{item.name}</h1>
        <p className="lead">{item.description}</p>
        <div className="button-row"><Link className="button" href="/iletisim#teklif">Teklif Al</Link><a className="button button-outline" href={site.phoneHref}>{site.phoneDisplay}</a></div>
      </div>
      <div className="page-hero-image"><Image src={assetPath(item.image)} alt={item.imageAlt} fill priority fetchPriority="high" sizes="(max-width: 1080px) 96vw, (max-width: 1300px) 40vw, 470px" /></div>
    </div></header>

    <div className="section"><div className="container product-detail">
      <section>
        <h2>Teknik Künye</h2>
        <p>Değerler kaynak teknik dokümandan alınmıştır. Nihai ürün ve proje uygunluğu teklif öncesinde doğrulanır.</p>
        <div className="spec-wrap"><table className="spec-table">
          <thead><tr>
            <th scope="col">Piksel aralığı</th>
            {hasStructure && <th scope="col">Piksel yapısı</th>}
            {showSize ? <th scope="col">Tipik ölçü</th> : <>
              {hasDensity && <th scope="col">Piksel yoğunluğu</th>}
              {hasDistance && <th scope="col">İdeal izleme</th>}
            </>}
            {hasUsage && <th scope="col">Kullanım</th>}
          </tr></thead>
          <tbody>{item.variants.map((variant) => <tr key={variant.pixelPitch}>
            <th scope="row">{variant.pixelPitch}</th>
            {hasStructure && <td>{variant.pixelStructure ?? "—"}</td>}
            {showSize ? <td>{variant.typicalSize ?? "—"}</td> : <>
              {hasDensity && <td>{variant.pixelDensity ?? "—"}</td>}
              {hasDistance && <td>{variant.viewingDistance ?? "—"}</td>}
            </>}
            {hasUsage && <td>{variant.usage ?? "—"}</td>}
          </tr>)}</tbody>
        </table></div>
        {item.variantNote && <p className="product-note">{item.variantNote}{item.category === "Dış mekân" && slug !== "dis-mekan" && <> <Link className="text-link" href="/urunler/dis-mekan">Dış mekân tablosunu inceleyin →</Link></>}</p>}
      </section>

      <section>
        <h2>Ortak Teknik Özellikler</h2>
        <dl className="product-spec-list">{item.commonSpecs.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
      </section>

      <section>
        <h2>Kullanım Alanları</h2>
        <ul className="product-usecases">{item.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}</ul>
        <p><Link className="text-link" href={item.relatedPage.href}>{item.relatedPage.label} →</Link></p>
      </section>

      <section>
        <h2>Kontrol Sistemi</h2>
        {item.control && <p>{item.control}</p>}
        <dl className="product-spec-list">{controlSystems.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
      </section>

      <section>
        <h2>Garanti</h2>
        <p>{warranty}</p>
      </section>

      <section className="product-cta">
        <h2>Bu ürün ailesi için teklif alın</h2>
        <p>Ölçü, kullanım ortamı ve izleme mesafesini paylaşın; üretici olarak teknik kapsamı birlikte netleştirelim.</p>
        <div className="button-row"><Link className="button" href="/iletisim#teklif">Teklif Al</Link><Link className="text-link" href="/urunler">Tüm ürün ailelerine dön →</Link></div>
      </section>
    </div></div>
  </>;
}
