"use client";

import { useState } from "react";

const filters = [
  { id: "all", label: "Tümü" },
  { id: "ic", label: "İç mekân" },
  { id: "dis", label: "Dış mekân" },
] as const;

/**
 * Yalnız filtre durumunu istemcide tutar; kartların kendisi `children` olarak
 * sunucuda render edilir ve statik HTML'de eksiksiz kalır. Gizleme işi CSS'e
 * bırakıldığı için filtre, içeriği veya iç bağlantıları aramadan saklamaz.
 */
export function ProductFilter({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<string>("all");
  return (
    <div className="product-filter" data-active={active}>
      <div className="product-filter-controls" role="group" aria-label="Ürünleri kullanım ortamına göre filtrele">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={active === filter.id}
            onClick={() => setActive(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
