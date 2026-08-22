"use client";

import { useEffect, useSyncExternalStore } from "react";
import { GA4_MEASUREMENT_ID } from "@/lib/analytics";
import { getConsentServerSnapshot, readConsent, subscribeConsent, wasDecidedThisSession } from "@/lib/consent";

const GA4_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;

let injected = false;

/**
 * gtag.js kütüphanesi ~162 KiB'dir ve çalışırken ana thread'i bloke eder; ilk boyamayla
 * yarıştığında LCP'yi doğrudan geciktirir. Bu yüzden kütüphane sayfa açılışında HİÇ
 * yüklenmez, yalnız analitik onayı varken enjekte edilir.
 *
 * Enjeksiyon next/script yerine elle yapılır: `strategy="afterInteractive"` aynı URL için
 * hem <link rel="preload"> hem de hydration'da eklenen <script> üretiyordu ve bu ikisi
 * her zaman tek isteğe indirgenmiyordu (sahada iki ayrı gtag/js indirmesi gözlendi).
 * Tek bir <script> elemanı bu çift indirme yüzeyini tamamen ortadan kaldırır.
 */
function injectGa4() {
  if (injected) return;
  injected = true;
  const script = document.createElement("script");
  script.src = GA4_SRC;
  script.async = true;
  document.head.appendChild(script);
}

export function AnalyticsLoader() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, getConsentServerSnapshot);

  useEffect(() => {
    if (consent !== "granted" || injected) return;

    // Karar bu oturumda banttan verildiyse kullanıcı zaten etkileşimde ve LCP çoktan
    // ölçülmüştür; beklemeden yükle. Önceki ziyaretten onay taşıyan kullanıcıda ise
    // ilk boyama yarışına hiç girmemek için sayfa boşalana kadar bekle.
    if (wasDecidedThisSession()) { injectGa4(); return; }

    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(injectGa4, { timeout: 5000 });
      return () => window.cancelIdleCallback?.(handle);
    }
    // Safari <17 requestIdleCallback bilmez; load sonrası sabit gecikme yeterli.
    const timer = window.setTimeout(injectGa4, 2000);
    return () => window.clearTimeout(timer);
  }, [consent]);

  return null;
}
