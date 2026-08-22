// Sertifika ve standart rozetlerini üretir: public/images/certifications/*.svg
//
// NEDEN ÇİZİLİYOR, İNDİRİLMİYOR:
// ISO, sertifikalı kuruluşlar için bir "ISO 9001 logosu" YAYINLAMAZ; ISO'nun kendi
// logosu tescillidir ve belgeli firmalarca kullanılması açıkça yasaktır (belgelendirme
// kuruluşları kendi markalarını verir). TSE logosu tescilli bir markadır. RoHS ve EMC
// için resmi bir işaret yoktur. Bu yüzden altı rozet de tek bir tasarım dilinde,
// tipografik olarak üretilir; hiçbiri resmi bir uygunluk işaretini taklit etmez.
// Firmanın belgelendirme kuruluşundan aldığı gerçek marka görselleri varsa bu
// dosyalar birebir aynı viewBox ile değiştirilebilir.
//
// OPTİK HİZA: altı rozet de aynı viewBox ve aynı çerçeve geometrisini kullanır.
// Şeritte height:48px verildiğinde hepsi birebir aynı optik yükseklikte görünür.
//
// Çalıştırma: node scripts/build-certification-badges.mjs
import { mkdir, writeFile } from "node:fs/promises";

const OUT = "public/images/certifications";
const W = 160;
const H = 96;
const INK = "#0b1528";
const MUTED = "#56647a";
const LINE = "#dbe3ee";
const ORANGE = "#b35600";
const FONT = "Arial, Helvetica, sans-serif";

// [dosya, ana etiket, ana punto, alt etiket, erişilebilir ad]
const badges = [
  ["ce-logo.svg", "CE", 38, "", "CE uygunluk işareti"],
  ["iso-9001-logo.svg", "ISO 9001", 25, "2015", "ISO 9001:2015 kalite yönetim sistemi belgesi"],
  ["tse-logo.svg", "TSE", 36, "", "TSE Türk Standartları Enstitüsü uygunluk belgesi"],
  ["rohs-logo.svg", "RoHS", 32, "", "RoHS tehlikeli madde kısıtlamasına uygunluk"],
  ["emc-logo.svg", "EMC", 34, "", "EMC elektromanyetik uyumluluk"],
  ["ip65-badge.svg", "IP65", 32, "IP54", "IP65 ve IP54 toz ve su koruma sınıfı"],
];

const esc = (v) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function svg(label, size, sub, title) {
  // Alt etiket varsa ana etiket biraz yukarı kayar; çerçeve her rozette aynı kalır.
  const mainY = sub ? 48 : 56;
  const subLine = sub
    ? `\n  <text x="${W / 2}" y="70" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="700" letter-spacing="1.5" fill="${MUTED}">${esc(sub)}</text>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(title)}">
  <title>${esc(title)}</title>
  <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="9" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  <text x="${W / 2}" y="${mainY}" text-anchor="middle" font-family="${FONT}" font-size="${size}" font-weight="700" letter-spacing="0.5" fill="${INK}">${esc(label)}</text>${subLine}
  <rect x="${W / 2 - 20}" y="80" width="40" height="3" rx="1.5" fill="${ORANGE}"/>
</svg>
`;
}

await mkdir(OUT, { recursive: true });
for (const [file, label, size, sub, title] of badges) {
  const body = svg(label, size, sub, title);
  await writeFile(`${OUT}/${file}`, body, "utf8");
  console.log(`ok  ${OUT}/${file}  (${Buffer.byteLength(body)} B)`);
}
