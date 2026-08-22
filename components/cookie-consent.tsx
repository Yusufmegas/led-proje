"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { getBannerServerSnapshot, getBannerSnapshot, subscribeConsent, writeConsent, type ConsentValue } from "@/lib/consent";

export function CookieConsent() {
  const open = useSyncExternalStore(subscribeConsent, getBannerSnapshot, getBannerServerSnapshot);
  const ref = useRef<HTMLDivElement>(null);

  // Bandın yüksekliği metin sarmasına göre değişir (masaüstünde tek, dar ekranda iki
  // satır). Yüzen WhatsApp hapını sabit bir değerle değil, ölçülen yükseklikle
  // yukarı ittiğimiz için hiçbir genişlikte çakışma olmaz.
  useEffect(() => {
    document.body.classList.toggle("consent-open", open);
    const el = ref.current;
    if (!open || !el) {
      document.body.style.removeProperty("--consent-h");
      return () => document.body.classList.remove("consent-open");
    }
    const sync = () => document.body.style.setProperty("--consent-h", `${Math.ceil(el.getBoundingClientRect().height)}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => { ro.disconnect(); document.body.classList.remove("consent-open"); document.body.style.removeProperty("--consent-h"); };
  }, [open]);

  const decide = useCallback((value: ConsentValue) => {
    // Consent Mode v2 güncellemesi çerezden ÖNCE kuyruğa girer: onay verildiğinde
    // AnalyticsLoader gtag.js'i hemen enjekte eder ve kütüphane yüklendiğinde
    // kuyruktaki son durum zaten doğru olur. Onay geri alındığında ise kütüphane
    // çoktan yüklüyse ölçümleme bu çağrıyla kapanır.
    window.gtag?.("consent", "update", { analytics_storage: value });
    writeConsent(value);
  }, []);

  if (!open) return null;

  return (
    <div className="cookie-consent" ref={ref} role="region" aria-labelledby="cookie-consent-text">
      <p id="cookie-consent-text">
        Sitemizde deneyiminizi iyileştirmek ve trafiği analiz etmek için çerezler kullanıyoruz.{" "}
        <Link className="text-link" href="/cerez-politikasi">Çerez Politikası</Link>
      </p>
      <div className="cookie-consent-actions">
        <button className="button button-small" type="button" onClick={() => decide("granted")}>Kabul Et</button>
        <button className="button button-small button-outline" type="button" onClick={() => decide("denied")}>Reddet</button>
      </div>
    </div>
  );
}
