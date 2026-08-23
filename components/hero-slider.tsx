"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { altOf } from "@/lib/images";
import { heroSlideImages } from "@/lib/showcase";
import { assetPath } from "@/lib/site";

const slides = heroSlideImages.map((src) => ({ src, alt: altOf(src) }));

// Ertelenen slaytlarda `src` yerine kullanılan 1×1 saydam GIF. next/image `data:`
// kaynaklarını otomatik `unoptimized` sayar: srcset üretilmez, ağ isteği çıkmaz.
const TRANSPARENT_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Slaytlar üst üste konumlandığı için tarayıcı, `loading="lazy"` olsalar bile
  // 2-5. görselleri "görünür alanda" sayıp ilk boyamayla birlikte indiriyordu:
  // ~420 KB, doğrudan LCP görseliyle bant genişliği yarışında. Bu yüzden ilk kare
  // dışındaki slaytların KAYNAĞI `load` sonrası boş zamana kadar verilmez; `<img>`
  // etiketleri alt metinleriyle birlikte sunucuda basılır (statik HTML'de beşinin de
  // alt metni bulunur). İlk kare zaten 6 sn ekranda kaldığından görünen davranış
  // değişmez. Pasif slaytlar alt metinlerini taşısa da sarmalayıcıları
  // `aria-hidden` olduğu için ekran okuyucu yalnız aktif slaytı seslendirir.
  const [deferredReady, setDeferredReady] = useState(false);
  const interacted = useRef(false);
  const move = useCallback((direction: number) => {
    interacted.current = true;
    setDeferredReady(true);
    setActive((current) => (current + direction + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    let idleHandle = 0;
    let timerHandle = 0;
    const mount = () => setDeferredReady(true);
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") idleHandle = window.requestIdleCallback(mount, { timeout: 3000 });
      else timerHandle = window.setTimeout(mount, 1200);
    };
    // `load` sonrasını beklemek şart: requestIdleCallback ana thread boşalınca
    // tetiklenir ve LCP görseli hâlâ inerken erkenden çalışabilir.
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleHandle) window.cancelIdleCallback?.(idleHandle);
      if (timerHandle) window.clearTimeout(timerHandle);
    };
  }, []);

  useEffect(() => {
    if (paused || interacted.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => { setDeferredReady(true); setActive((current) => (current + 1) % slides.length); }, 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return <div className="hero-slider" aria-roledescription="carousel" aria-label="LED ekran kullanım alanları" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
    <div className="hero-slider-track">{slides.map((slide, index) => <div className={`hero-slide ${index === active ? "is-active" : ""}`} aria-hidden={index !== active} key={slide.src}>
      <Image src={index === 0 || deferredReady ? assetPath(slide.src) : TRANSPARENT_PIXEL} alt={slide.alt} fill priority={index === 0} fetchPriority={index === 0 ? "high" : "auto"} loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 900px) 96vw, (max-width: 1300px) 40vw, 470px" />
    </div>)}</div>
    <div className="hero-slider-controls"><button type="button" onClick={() => move(-1)} aria-label="Önceki görsel">←</button><div>{slides.map((slide, index) => <button type="button" className={index === active ? "is-active" : ""} aria-label={`${index + 1}. görseli göster`} aria-current={index === active ? "true" : undefined} onClick={() => { interacted.current = true; setDeferredReady(true); setActive(index); }} key={slide.src} />)}</div><button type="button" onClick={() => move(1)} aria-label="Sonraki görsel">→</button></div>
  </div>;
}
