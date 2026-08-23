"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

/**
 * Fold altındaki kart görselleri `loading="lazy"` olmalarına rağmen ilk boyamayla
 * birlikte iniyordu: tarayıcı yavaş bağlantılarda ~3000px'lik bir ön-yükleme eşiği
 * uyguluyor ve viewport'un hemen altındaki kartlar bu eşiğe giriyor. Sonuç, LCP
 * görseliyle bant genişliği yarışı (ana sayfada ~190 KB).
 *
 * Bu sarmalayıcı görselin İNDİRİLMESİNİ `load` sonrası boş zamana kadar erteler.
 *
 * Önceki sürüm bunu `<img>` etiketini hiç render etmeyerek yapıyordu; alt metinleri
 * de statik HTML'e düşmüyordu (ana sayfada 29 görselin yalnız 7'sinin alt metni
 * vardı). Artık `<img>` sunucuda alt metni, boyut ve `sizes` bilgisiyle birlikte
 * basılır; ertelenen tek şey `src`/`srcset`. Bunun için görsel hazır olana kadar
 * kaynak olarak 1×1 saydam GIF verilir — next/image `data:` ile başlayan kaynakları
 * otomatik `unoptimized` sayar, yani srcset üretmez ve ağ isteği çıkarmaz. Hazır
 * olunca React yalnız `src`/`srcset` niteliklerini günceller; alt metni hiç değişmez.
 *
 * `<noscript>` kopyası gerçek dosya yolunu alt metniyle eşleşmiş halde statik HTML'de
 * tutar (Google Görseller ham HTML'i de tarar) ve JavaScript kapalıyken kartların
 * görselsiz kalmasını önler. JavaScript açık tarayıcılar noscript içeriğini indirmez.
 * React noscript çocuklarını hidrasyonda metin olarak gördüğü için içerik
 * dangerouslySetInnerHTML ile basılır.
 *
 * Kapsayıcılarda (.v4-product-image, .v5-application-grid > a > div) `aspect-ratio`
 * ve arka plan rengi tanımlı olduğu için yer önceden ayrılmıştır: CLS oluşmaz.
 */
const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function DeferredImage({ src, alt, ...rest }: ImageProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleHandle = 0;
    let timerHandle = 0;
    const mount = () => setReady(true);
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") idleHandle = window.requestIdleCallback(mount, { timeout: 3000 });
      else timerHandle = window.setTimeout(mount, 1200);
    };
    // `load` beklenmeli: requestIdleCallback ana thread boşalınca tetiklenir ve
    // LCP görseli hâlâ inerken erkenden çalışabilir.
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleHandle) window.cancelIdleCallback?.(idleHandle);
      if (timerHandle) window.clearTimeout(timerHandle);
    };
  }, []);

  const noscriptImage = typeof src === "string"
    ? `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}" loading="lazy" decoding="async" style="position:absolute;inset:0;width:100%;height:100%">`
    : "";

  return (
    <>
      <Image {...rest} src={ready ? src : TRANSPARENT_PIXEL} alt={alt} />
      {noscriptImage && <noscript dangerouslySetInnerHTML={{ __html: noscriptImage }} />}
    </>
  );
}
