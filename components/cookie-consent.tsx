"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

const COOKIE_NAME = "ledproje_consent";
const ONE_YEAR = 60 * 60 * 24 * 365;

/** Onayın geri alınabilmesi için footer'daki "Çerez tercihleri" bağlantısı bu olayı yayar. */
export const CONSENT_REOPEN_EVENT = "ledproje:consent-reopen";

function readConsent() {
  return document.cookie.match(/(?:^|;\s*)ledproje_consent=([^;]*)/)?.[1] ?? null;
}

// Çerez, React dışında yaşayan bir durum. Statik export'ta sunucu anlık görüntüsü
// her zaman "kapalı" döner; gerçek karar yalnız istemcide okunur. Bu yaklaşım
// hem hydration uyuşmazlığını hem effect içinde setState çağrısını önler.
const listeners = new Set<() => void>();
let reopened = false;
const emit = () => listeners.forEach((l) => l());

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const reopen = () => { reopened = true; emit(); };
  window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
  return () => { listeners.delete(onChange); window.removeEventListener(CONSENT_REOPEN_EVENT, reopen); };
}

const getSnapshot = () => reopened || readConsent() === null;
const getServerSnapshot = () => false;

export function CookieConsent() {
  const open = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
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

  const decide = useCallback((value: "granted" | "denied") => {
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
    // Consent Mode v2: GA4 varsayılanı 'denied'; ölçümleme yalnız onayla açılır.
    window.gtag?.("consent", "update", { analytics_storage: value });
    reopened = false;
    emit();
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
