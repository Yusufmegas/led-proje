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
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: LeadEvent, details: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({ event, ...details });
}
