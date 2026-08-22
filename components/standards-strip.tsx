import Image from "next/image";
import { assetPath } from "@/lib/site";
import { standards } from "@/lib/standards";

/**
 * Ana sayfa logo şeridi. `unoptimized` zorunlu: lib/cloudflare-loader.ts her kaynağı
 * /cdn-cgi/image/... yoluna çevirir, Cloudflare Image Transformations ise SVG girdiyi
 * dönüştürmez. width/height explicit verildiği için CLS oluşmaz.
 */
export function StandardsStrip() {
  return (
    <section className="standards-strip" aria-labelledby="standards-strip-title">
      <div className="container">
        <h2 id="standards-strip-title">Standartlar ve Belgeler</h2>
        <ul>
          {standards.map((standard) => (
            <li key={standard.id}>
              {standard.logoUrl && (
                <Image src={assetPath(standard.logoUrl)} alt={`${standard.name} — ${standard.description}`} width={160} height={96} unoptimized />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
