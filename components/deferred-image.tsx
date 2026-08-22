"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

/**
 * Fold altındaki kart görselleri `loading="lazy"` olmalarına rağmen ilk boyamayla
 * birlikte iniyordu: tarayıcı yavaş bağlantılarda ~3000px'lik bir ön-yükleme eşiği
 * uyguluyor ve viewport'un hemen altındaki kartlar bu eşiğe giriyor. Sonuç, LCP
 * görseliyle bant genişliği yarışı (ana sayfada ~190 KB).
 *
 * Bu sarmalayıcı görseli `load` sonrası boş zamana kadar DOM'a hiç sokmaz.
 * `fetchPriority="low"` bu senaryoda ölçülebilir bir kazanç vermedi (tarayıcı zaten
 * düşük öncelik atıyor); indirmeyi tamamen ertelemek gerekiyor.
 *
 * Kapsam sınırlı tutulur: yalnız <img> ertelenir. Başlık, açıklama ve bağlantılar
 * sunucuda render edilmeye devam eder, dolayısıyla içerik ve iç bağlantı yapısı
 * statik HTML'de aynen durur. Kapsayıcılarda (.v4-product-image, .v5-application-grid
 * > a > div) `aspect-ratio` ve arka plan rengi tanımlı olduğu için yer önceden
 * ayrılmıştır: görsel sonradan gelse de CLS oluşmaz.
 */
export function DeferredImage(props: ImageProps) {
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

  if (!ready) return null;
  // jsx-a11y spread'in içini göremiyor; `alt` zaten ImageProps'ta zorunlu olduğu için
  // eksik bırakılması derleme hatası verir.
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} />;
}
