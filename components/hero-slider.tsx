"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const interacted = useRef(false);
  const move = useCallback((direction: number) => {
    interacted.current = true;
    setActive((current) => (current + direction + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused || interacted.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return <div className="hero-slider" aria-roledescription="carousel" aria-label="LED ekran kullanım alanları" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
    <div className="hero-slider-track">{slides.map((slide, index) => <div className={`hero-slide ${index === active ? "is-active" : ""}`} aria-hidden={index !== active} key={slide.src}>
      <Image src={slide.src} alt={index === active ? slide.alt : ""} fill priority={index === 0} loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 900px) 100vw, 44vw" />
    </div>)}</div>
    <div className="hero-slider-controls"><button type="button" onClick={() => move(-1)} aria-label="Önceki görsel">←</button><div>{slides.map((slide, index) => <button type="button" className={index === active ? "is-active" : ""} aria-label={`${index + 1}. görseli göster`} aria-current={index === active ? "true" : undefined} onClick={() => { interacted.current = true; setActive(index); }} key={slide.src} />)}</div><button type="button" onClick={() => move(1)} aria-label="Sonraki görsel">→</button></div>
  </div>;
}
