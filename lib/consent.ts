/**
 * Çerez onayı React dışında (document.cookie) yaşayan bir durumdur. Hem çerez bandı
 * hem de GA4 yükleyicisi aynı kararı okumak zorunda olduğu için abonelik mantığı
 * burada tek noktada toplanır.
 *
 * Statik export'ta sunucu anlık görüntüsü herkese aynı HTML'i ürettiğinden her zaman
 * "karar yok" döner; gerçek karar yalnız istemcide okunur. Bu yaklaşım hem hydration
 * uyuşmazlığını hem de effect içinde setState çağrısını önler.
 */

const COOKIE_NAME = "ledproje_consent";
const ONE_YEAR = 60 * 60 * 24 * 365;

export type ConsentValue = "granted" | "denied";

/** Onayın geri alınabilmesi için footer'daki "Çerez tercihleri" bağlantısı bu olayı yayar. */
export const CONSENT_REOPEN_EVENT = "ledproje:consent-reopen";

const listeners = new Set<() => void>();
let reopened = false;
// Karar bu oturumda bandın üzerinden mi verildi? GA4 yükleyicisi "hemen yükle" ile
// "sayfa boşalınca yükle" arasında bu bilgiyle seçim yapar.
let decidedThisSession = false;

const emit = () => listeners.forEach((listener) => listener());

export function subscribeConsent(onChange: () => void) {
  listeners.add(onChange);
  const reopen = () => { reopened = true; emit(); };
  window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
  return () => { listeners.delete(onChange); window.removeEventListener(CONSENT_REOPEN_EVENT, reopen); };
}

export function readConsent(): ConsentValue | null {
  const raw = document.cookie.match(/(?:^|;\s*)ledproje_consent=([^;]*)/)?.[1];
  return raw === "granted" || raw === "denied" ? raw : null;
}

export function writeConsent(value: ConsentValue) {
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
  decidedThisSession = true;
  reopened = false;
  emit();
}

export const wasDecidedThisSession = () => decidedThisSession;

/** Bant açık mı? (karar verilmemişse ya da kullanıcı yeniden açtıysa) */
export const getBannerSnapshot = () => reopened || readConsent() === null;
export const getBannerServerSnapshot = () => false;

/** GA4 yükleyicisi için sunucu anlık görüntüsü: statik HTML'de asla onay yoktur. */
export const getConsentServerSnapshot = (): ConsentValue | null => null;
