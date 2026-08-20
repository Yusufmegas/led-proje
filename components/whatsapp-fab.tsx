"use client";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site";
export function WhatsappFab() { return <div className="conversion-bar"><a className="whatsapp-fab" href={whatsappUrl("Merhaba LEDProje, LED ekran projem hakkında görüşmek istiyorum.")} target="_blank" rel="noreferrer" onClick={() => trackEvent("whatsapp_click", { placement: "floating" })}><span aria-hidden="true">WA</span><b>WhatsApp</b></a><Link className="conversion-quote" href="/iletisim#teklif">Teklif Al</Link></div>; }
