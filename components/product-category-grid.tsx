import Image from "next/image";
import Link from "next/link";
import { ProductFilter } from "@/components/product-filter";
import { altOf } from "@/lib/images";
import { productCategories } from "@/lib/products";
import { assetPath } from "@/lib/site";

export function ProductCategoryGrid() {
  return (
    <section id="kategoriler" aria-labelledby="product-categories-title">
      <h2 id="product-categories-title">Ürün Aileleri</h2>
      <ProductFilter>
        <div className="product-category-grid">
          {productCategories.map((item, index) => (
            <article key={item.slug} data-environment={item.category === "İç mekân" ? "ic" : "dis"}>
              <Link href={`/urunler/${item.slug}`}>
                <div className="product-category-image">
                  <Image
                    src={assetPath(item.image)}
                    alt={altOf(item.image)}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 380px"
                  />
                </div>
                <div className="product-category-copy">
                  <span className="product-category-env">{item.category}</span>
                  <h3>{item.shortName}</h3>
                  <p className="product-category-pitch">{item.pitchRange}</p>
                  <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                  <b>İncele →</b>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </ProductFilter>
    </section>
  );
}
