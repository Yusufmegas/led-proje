import Image from "next/image";
import { altOf } from "@/lib/images";
import { assetPath } from "@/lib/site";
import { standards } from "@/lib/standards";

/**
 * /hakkimizda detay bölümü. Belge numarası yalnız `certificateNo` doluysa basılır;
 * boş bırakılan maddeler için satır hiç render edilmez.
 * `unoptimized` gerekçesi için bkz. components/standards-strip.tsx
 */
export function StandardsGrid() {
  return (
    <section className="standards-grid-section" aria-labelledby="standards-grid-title">
      <h2 id="standards-grid-title">Standartlar ve Belgeler</h2>
      <p>Ürünlerimiz ve üretim süreçlerimiz aşağıdaki standartlara uygunluk kapsamında belgelendirilmiştir.</p>
      <div className="standards-grid">
        {standards.map((standard) => (
          <article key={standard.id}>
            {standard.logoUrl && (
              <Image src={assetPath(standard.logoUrl)} alt={altOf(standard.logoUrl)} width={160} height={96} unoptimized />
            )}
            <h3>{standard.name}</h3>
            <p>{standard.description}</p>
            {standard.certificateNo && <span>Belge No: {standard.certificateNo}</span>}
          </article>
        ))}
      </div>
    </section>
  );
}
