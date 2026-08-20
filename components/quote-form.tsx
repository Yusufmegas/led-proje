"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site";

export function QuoteForm() {
  const [started, setStarted] = useState(false);
  const start = () => {
    if (!started) {
      setStarted(true);
      trackEvent("lead_form_start");
    }
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Merhaba LEDProje,",
      `${data.get("city")} için ${data.get("environment")} LED ekran projem var.`,
      `Kullanım alanı: ${data.get("use")}.`,
      `İletişim: ${data.get("name")} - ${data.get("phone")}.`,
      data.get("message") ? `Not: ${data.get("message")}` : "",
      "Teklif almak istiyorum.",
    ].filter(Boolean).join("\n");
    trackEvent("lead_form_submit", { channel: "whatsapp" });
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  return <form className="form-shell" onSubmit={submit} onFocus={start}>
    <div className="form-grid">
      <div className="field"><label htmlFor="name">Ad soyad</label><input id="name" name="name" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="phone">Telefon</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="05__ ___ __ __" pattern="[0-9+() ]{10,18}" required /></div>
      <div className="field"><label htmlFor="city">Şehir</label><input id="city" name="city" autoComplete="address-level1" required /></div>
      <div className="field"><label htmlFor="use">Proje / kullanım alanı</label><input id="use" name="use" placeholder="Mağaza, cephe, toplantı salonu..." required /></div>
      <div className="field field-wide"><label htmlFor="environment">Kullanım ortamı</label><select id="environment" name="environment" required defaultValue=""><option value="" disabled>Seçin</option><option>İç mekân</option><option>Dış mekân</option><option>Henüz net değil</option></select></div>
      <div className="field field-wide"><label htmlFor="message">Kısa proje notu <span>(isteğe bağlı)</span></label><textarea id="message" name="message" rows={3} /></div>
      <div className="field-wide"><button className="button" type="submit">WhatsApp’tan Teklif İsteyin</button></div>
    </div>
  </form>;
}
