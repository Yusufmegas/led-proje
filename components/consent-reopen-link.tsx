"use client";

import { CONSENT_REOPEN_EVENT } from "@/components/cookie-consent";

/**
 * KVKK kapsamında verilen rıza her zaman geri alınabilir olmalıdır; bu bağlantı
 * çerez bandını yeniden açarak kararın değiştirilmesini sağlar.
 */
export function ConsentReopenLink() {
  return (
    <button type="button" className="consent-reopen" onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))}>
      Çerez tercihleri
    </button>
  );
}
