"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/site";

const slides = [
  { src: "/images/visual-v3/facade-led.webp", alt: "Bina cephesine bütünleşik büyük dış mekân LED ekran" },
  { src: "/images/visual-v3/auditorium-led.webp", alt: "Kurumsal sunum alanındaki geniş iç mekân LED video duvarı" },
  { src: "/images/visual-v3/mall-led.webp", alt: "AVM ortak alanında mimariye uyarlanan LED ekran" },
  { src: "/images/visual-v3/retail-led.webp", alt: "Mağaza içinde geniş formatlı LED ekran yüzeyi" },
  { src: "/images/visual-v3/totem-led.webp", alt: "Açık alanda bağımsız dikey LED totem" },
] as const;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Slaytlar üst üste konumlandığı için tarayıcı, `loading="lazy"` olsalar bile
  // 2-5. görselleri "görünür alanda" sayıp ilk boyamayla birlikte indiriyordu:
  // ~420 KB, doğrudan LCP görseliyle bant genişliği yarışında. Bu yüzden ilk kare
  // dışındaki slaytlar `load` sonrası boş zamana kadar DOM'a hiç girmez. İlk kare
  // zaten 6 sn boyunca ekranda kaldığından görünen davranış değişmez.
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
      {(index === 0 || deferredReady) && <Image src={assetPath(slide.src)} alt={index === active ? slide.alt : ""} fill priority={index === 0} fetchPriority={index === 0 ? "high" : "auto"} loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 900px) 96vw, (max-width: 1300px) 40vw, 470px" />}
    </div>)}</div>
    <div className="hero-slider-controls"><button type="button" onClick={() => move(-1)} aria-label="Önceki görsel">←</button><div>{slides.map((slide, index) => <button type="button" className={index === active ? "is-active" : ""} aria-label={`${index + 1}. görseli göster`} aria-current={index === active ? "true" : undefined} onClick={() => { interacted.current = true; setDeferredReady(true); setActive(index); }} key={slide.src} />)}</div><button type="button" onClick={() => move(1)} aria-label="Sonraki görsel">→</button></div>
  </div>;
}
