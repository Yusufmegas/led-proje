"use client";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site";
export function AreaCalculator() {
  const [width, setWidth] = useState(""); const [height, setHeight] = useState(""); const [area, setArea] = useState<number | null>(null);
  const calculate = () => { const result = Number(width.replace(",", ".")) * Number(height.replace(",", ".")); if (result > 0 && Number.isFinite(result)) { setArea(Number(result.toFixed(2))); trackEvent("area_calculator_complete", { area: Number(result.toFixed(2)) }); } };
  const message = area ? `Merhaba LEDProje, yaklaşık ${width} × ${height} m (${area} m²) LED ekran projem için teklif almak istiyorum.` : "Merhaba LEDProje, LED ekran projem için teklif almak istiyorum.";
  return <div className="calculator-shell"><div className="calculator"><div className="field"><label htmlFor="calc-width">En (metre)</label><input id="calc-width" inputMode="decimal" placeholder="Örn. 6" value={width} onChange={(e) => setWidth(e.target.value)} /></div><div className="field"><label htmlFor="calc-height">Boy (metre)</label><input id="calc-height" inputMode="decimal" placeholder="Örn. 3" value={height} onChange={(e) => setHeight(e.target.value)} /></div><button className="button" type="button" onClick={calculate}>Alanı Hesapla</button></div>{area !== null && <div className="calculator-output" aria-live="polite"><span>Hesaplanan ekran alanı</span><strong>{area.toLocaleString("tr-TR")} m²</strong><p>Bu değer yalnız ekran alanını gösterir.</p><small>Net proje fiyatını öğrenmek için kullanım ortamı ve teknik detayları paylaşın.</small><a className="button" href={whatsappUrl(message)} target="_blank" rel="noreferrer">{area.toLocaleString("tr-TR")} m² Projem İçin Teklif Al</a></div>}</div>;
}
