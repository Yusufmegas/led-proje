export type LeadEvent =
  | "quote_cta_click"
  | "whatsapp_click"
  | "phone_click"
  | "lead_form_start"
  | "lead_form_submit"
  | "area_calculator_complete"
  | "city_page_quote_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4 (gtag.js) olayları `gtag('event', ad, parametreler)` çağrısıyla bekler.
 * `dataLayer.push({ event: ... })` biçimi GTM konvansiyonudur; gtag.js kuruluyken
 * bu push diziye eklenir ama GA4 tarafından olay olarak İŞLENMEZ. Bu yüzden önce
 * gtag denenir, GTM'e geçilirse diye dataLayer yedeği korunur.
 */
export function trackEvent(event: LeadEvent, details: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", event, details);
    return;
  }
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...details });
}
